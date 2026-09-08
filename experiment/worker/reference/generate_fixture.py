#!/usr/bin/env python3
"""Generate a tiny deterministic golden fixture from pinned microgpt semantics."""
import json
import math
from pathlib import Path

D, NHEAD, NLAYER, VOCAB, CONTEXT = 4, 2, 1, 3, 3
HEAD_DIM = D // NHEAD
TOKENS = [2, 0, 1, 2]


class Value:
    __slots__ = ("data", "grad", "_children", "_local_grads")
    def __init__(self, data, children=(), local_grads=()):
        self.data = data
        self.grad = 0.0
        self._children = children
        self._local_grads = local_grads
    def __add__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        return Value(self.data + other.data, (self, other), (1, 1))
    def __mul__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        return Value(self.data * other.data, (self, other), (other.data, self.data))
    def __pow__(self, other):
        return Value(self.data**other, (self,), (other * self.data**(other-1),))
    def log(self): return Value(math.log(self.data), (self,), (1/self.data,))
    def exp(self): return Value(math.exp(self.data), (self,), (math.exp(self.data),))
    def relu(self): return Value(max(0, self.data), (self,), (float(self.data > 0),))
    def __neg__(self): return self * -1
    def __radd__(self, other): return self + other
    def __sub__(self, other): return self + (-other)
    def __rsub__(self, other): return other + (-self)
    def __rmul__(self, other): return self * other
    def __truediv__(self, other): return self * other**-1
    def __rtruediv__(self, other): return other * self**-1
    def backward(self):
        topo, visited = [], set()
        def build(v):
            if v not in visited:
                visited.add(v)
                for child in v._children: build(child)
                topo.append(v)
        build(self)
        self.grad = 1
        for v in reversed(topo):
            for child, local_grad in zip(v._children, v._local_grads):
                child.grad += local_grad * v.grad


def make_state():
    index = 0
    def matrix(nout, nin):
        nonlocal index
        ans = []
        for _ in range(nout):
            row = []
            for _ in range(nin):
                row.append(Value(((index % 29) - 14) / 100.0))
                index += 1
            ans.append(row)
        return ans
    state = {
        "wte": matrix(VOCAB, D), "wpe": matrix(CONTEXT, D),
        "lm_head": matrix(VOCAB, D),
    }
    for li in range(NLAYER):
        state[f"layer{li}.attn_wq"] = matrix(D, D)
        state[f"layer{li}.attn_wk"] = matrix(D, D)
        state[f"layer{li}.attn_wv"] = matrix(D, D)
        state[f"layer{li}.attn_wo"] = matrix(D, D)
        state[f"layer{li}.mlp_fc1"] = matrix(4 * D, D)
        state[f"layer{li}.mlp_fc2"] = matrix(D, 4 * D)
    params = [p for mat in state.values() for row in mat for p in row]
    return state, params


def linear(x, w): return [sum((wi*xi for wi, xi in zip(row, x)), Value(0)) for row in w]
def softmax(logits):
    maximum = max(v.data for v in logits)
    exps = [(v-maximum).exp() for v in logits]
    total = sum(exps)
    return [e/total for e in exps]
def rmsnorm(x):
    ms = sum(xi*xi for xi in x) / len(x)
    scale = (ms + 1e-5) ** -0.5
    return [xi*scale for xi in x]


def gpt(state, token_id, pos_id, keys, values, trace=None):
    x = rmsnorm([t+p for t, p in zip(state["wte"][token_id], state["wpe"][pos_id])])
    for li in range(NLAYER):
        residual = x
        x = rmsnorm(x)
        q = linear(x, state[f"layer{li}.attn_wq"])
        k = linear(x, state[f"layer{li}.attn_wk"])
        v = linear(x, state[f"layer{li}.attn_wv"])
        keys[li].append(k); values[li].append(v)
        x_attn, weights_trace = [], []
        for h in range(NHEAD):
            hs = h * HEAD_DIM
            qh = q[hs:hs+HEAD_DIM]
            kh = [ki[hs:hs+HEAD_DIM] for ki in keys[li]]
            vh = [vi[hs:hs+HEAD_DIM] for vi in values[li]]
            scores = [sum(qh[j]*kh[t][j] for j in range(HEAD_DIM))/HEAD_DIM**0.5 for t in range(len(kh))]
            weights = softmax(scores)
            weights_trace.append([z.data for z in weights])
            x_attn.extend(sum(weights[t]*vh[t][j] for t in range(len(vh))) for j in range(HEAD_DIM))
        x = [a+b for a, b in zip(linear(x_attn, state[f"layer{li}.attn_wo"]), residual)]
        residual = x
        x = linear(rmsnorm(x), state[f"layer{li}.mlp_fc1"])
        x = linear([xi.relu() for xi in x], state[f"layer{li}.mlp_fc2"])
        x = [a+b for a, b in zip(x, residual)]
        if trace is not None: trace.append(weights_trace)
    return linear(x, state["lm_head"])


def flatten_named(state, attr="data"):
    return {name: [[getattr(x, attr) for x in row] for row in mat] for name, mat in state.items()}


def generate():
    state, params = make_state()
    initial = flatten_named(state)
    keys, values = [[]], [[]]
    logits_all, probs_all, attention, losses = [], [], [], []
    for pos, (token, target) in enumerate(zip(TOKENS, TOKENS[1:])):
        step_trace = []
        logits = gpt(state, token, pos, keys, values, step_trace)
        probs = softmax(logits)
        logits_all.append([x.data for x in logits]); probs_all.append([x.data for x in probs])
        attention.append(step_trace[0])
        losses.append(-probs[target].log())
    loss = sum(losses) / len(losses)
    loss.backward()
    gradients = flatten_named(state, "grad")
    # Exact source Adam constants, first step, num_steps=1 (therefore lr_t=0.01).
    beta1, beta2, eps, lr_t = 0.85, 0.99, 1e-8, 0.01
    for p in params:
        m = (1-beta1)*p.grad; v = (1-beta2)*p.grad**2
        mhat = m/(1-beta1); vhat = v/(1-beta2)
        p.data -= lr_t*mhat/(vhat**0.5+eps)
    updated = flatten_named(state)
    # Faithful categorical sampling with injected uniforms avoids Python RNG-state coupling.
    uniforms = [0.1, 0.5, 0.9]
    generated, gen_logits, gen_probs, token = [], [], [], 2
    keys, values = [[]], [[]]
    for pos in range(CONTEXT):
        logits = gpt(state, token, pos, keys, values)
        gen_logits.append([x.data for x in logits])
        probs = softmax([x / 0.5 for x in logits])
        gen_probs.append([x.data for x in probs])
        cumulative, token = 0.0, VOCAB - 1
        for i, prob in enumerate(probs):
            cumulative += prob.data
            if uniforms[pos] < cumulative:
                token = i
                break
        generated.append(token)
        if token == 2: break
    return {
        "metadata": {"d":D,"nhead":NHEAD,"nlayer":NLAYER,"vocab":VOCAB,"context":CONTEXT,
                     "tokens":TOKENS,"parameter_formula":"((global_index % 29) - 14) / 100",
                     "source_revision":"14fb038816c7aae0bb9342c2dbf1a51dd134a5ff"},
        "initial": initial, "training_logits": logits_all, "training_probabilities": probs_all,
        "attention_weights": attention, "loss": loss.data, "gradients": gradients,
        "updated": updated, "generation_uniforms": uniforms,
        "generation_logits": gen_logits, "generation_probabilities": gen_probs,
        "generated_tokens": generated,
    }


if __name__ == "__main__":
    out = generate()
    Path(__file__).with_name("fixture.json").write_text(json.dumps(out, indent=2, sort_keys=True)+"\n")
    print(json.dumps({"loss":out["loss"], "generated_tokens":out["generated_tokens"]}, indent=2))
