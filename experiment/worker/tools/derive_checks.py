"""Derive deterministic check data from the pinned microgpt.py (not committed).

Runs the pinned source verbatim up to the optimizer section (seed, data, tokenizer,
Value, parameters, model), then an instrumented copy of the training loop for a
bounded number of steps and of the inference loop with the consumed uniform draws
recorded, so a Fortress implementation can be checked bit-for-bit modulo
floating-point summation order.
"""
import json, math, random, sys, hashlib

import os
HERE = os.path.dirname(os.path.abspath(__file__))
REF = os.path.join(HERE, '..', 'reference')
SRC = os.path.join(REF, 'microgpt.py')
os.chdir(REF)  # input.txt lives beside the pinned source
src = open(SRC).read()
sha = hashlib.sha256(src.encode()).hexdigest()
marker = "# Let there be Adam"
head = src[:src.index(marker)]
ns = {}
exec(compile(head, SRC, 'exec'), ns)

Value = ns['Value']; softmax = ns['softmax']; gpt = ns['gpt']
state_dict = ns['state_dict']; params = ns['params']; docs = ns['docs']
uchars = ns['uchars']; BOS = ns['BOS']; vocab_size = ns['vocab_size']
n_layer, n_embd, block_size, n_head = ns['n_layer'], ns['n_embd'], ns['block_size'], ns['n_head']

NUM_STEPS = int(sys.argv[1]) if len(sys.argv) > 1 else 2
NUM_SAMPLES = int(sys.argv[2]) if len(sys.argv) > 2 else 3

def mat(m): return [[v.data for v in row] for row in m]
out = {
  'source_sha256': sha,
  'config': dict(n_layer=n_layer, n_embd=n_embd, block_size=block_size, n_head=n_head,
                 vocab_size=vocab_size, BOS=BOS, uchars=''.join(uchars)),
  'docs': docs[:NUM_STEPS],
  'init': {k: mat(v) for k, v in state_dict.items()},
  'steps': [], 'inference': None,
}

# --- instrumented copy of the training loop (arithmetic identical to the pinned source)
learning_rate, beta1, beta2, eps_adam = 0.01, 0.85, 0.99, 1e-8
m = [0.0] * len(params)
v = [0.0] * len(params)
num_steps = 1000  # the pinned schedule; we only run NUM_STEPS of it
for step in range(NUM_STEPS):
    doc = docs[step % len(docs)]
    tokens = [BOS] + [uchars.index(ch) for ch in doc] + [BOS]
    n = min(block_size, len(tokens) - 1)
    keys, values = [[] for _ in range(n_layer)], [[] for _ in range(n_layer)]
    losses = []
    rec = {'doc': doc, 'tokens': tokens, 'n': n, 'positions': []}
    for pos_id in range(n):
        token_id, target_id = tokens[pos_id], tokens[pos_id + 1]
        logits = gpt(token_id, pos_id, keys, values)
        probs = softmax(logits)
        loss_t = -probs[target_id].log()
        losses.append(loss_t)
        rec['positions'].append({'token': token_id, 'target': target_id,
                                 'logits': [l.data for l in logits],
                                 'probs': [p.data for p in probs],
                                 'loss': loss_t.data})
    loss = (1 / n) * sum(losses)
    loss.backward()
    rec['loss'] = loss.data
    rec['grads'] = {k: [[p.grad for p in row] for row in mt] for k, mt in state_dict.items()}
    lr_t = learning_rate * (1 - step / num_steps)
    rec['lr_t'] = lr_t
    for i, p in enumerate(params):
        m[i] = beta1 * m[i] + (1 - beta1) * p.grad
        v[i] = beta2 * v[i] + (1 - beta2) * p.grad ** 2
        m_hat = m[i] / (1 - beta1 ** (step + 1))
        v_hat = v[i] / (1 - beta2 ** (step + 1))
        p.data -= lr_t * m_hat / (v_hat ** 0.5 + eps_adam)
        p.grad = 0
    rec['params_after'] = {k: mat(mt) for k, mt in state_dict.items()}
    out['steps'].append(rec)
    print(f"step {step+1} loss {loss.data:.6f} n={n} doc={doc}")

# --- instrumented inference: record the uniform draws random.choices consumes
temperature = 0.5
draws = []
_inst = random._inst  # random.choices is a bound method of this instance and calls self.random()
_orig_random = _inst.random
def _rec_random():
    u = _orig_random(); draws.append(u); return u
_inst.random = _rec_random
samples = []
for sample_idx in range(NUM_SAMPLES):
    keys, values = [[] for _ in range(n_layer)], [[] for _ in range(n_layer)]
    token_id = BOS
    sample = []
    steps_rec = []
    for pos_id in range(block_size):
        logits = gpt(token_id, pos_id, keys, values)
        probs = softmax([l / temperature for l in logits])
        before = len(draws)
        token_id = random.choices(range(vocab_size), weights=[p.data for p in probs])[0]
        steps_rec.append({'probs': [p.data for p in probs], 'draw': draws[before:], 'token': token_id})
        if token_id == BOS:
            break
        sample.append(uchars[token_id])
    samples.append({'text': ''.join(sample), 'steps': steps_rec})
    print(f"sample {sample_idx+1}: {''.join(sample)}")
out['inference'] = {'temperature': temperature, 'samples': samples}

dest = os.path.join(HERE, '..', 'checks', f'checks_{NUM_STEPS}steps.json')
json.dump(out, open(dest, 'w'))
print('wrote', dest, 'draws consumed:', len(draws))
