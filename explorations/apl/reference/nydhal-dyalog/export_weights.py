"""
Reference harness for microgpt.apl.

Runs Karpathy's microgpt.py with seed 42 up to (but not including) the training
loop, extracts the initialized weights, runs a numpy reimplementation with
identical weights on the first document's tokens, asserts bit-equivalence
against the canonical scalar-autograd forward pass, then dumps every weight
matrix, forward intermediate, gradient, and post-Adam weight as float64
binary into weights/ for the APL port to verify against layer-by-layer.

Usage:
    cd microgpt.apl
    python export_weights.py
"""

import os
import shutil
import json
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
os.chdir(HERE)
WEIGHTS_DIR = "weights"
NAMES_TXT = "names.txt"
INPUT_TXT = "input.txt"
SELF_CHECK_TOL = 1e-12

# microgpt.py expects input.txt in cwd; copy names.txt to satisfy it
if not os.path.exists(INPUT_TXT):
    shutil.copyfile(NAMES_TXT, INPUT_TXT)

# ---------------------------------------------------------------------------
# Step 1: exec microgpt.py up to the training loop so state_dict is populated
# but no training occurs
# ---------------------------------------------------------------------------
with open("microgpt.py") as f:
    src = f.read()

split_marker = "for step in range(num_steps):"
cut = src.index(split_marker)
pre_training = src[:cut]

ns = {"__name__": "__main__"}
exec(pre_training, ns)

state_dict = ns["state_dict"]
params = ns["params"]
docs = ns["docs"]
uchars = ns["uchars"]
BOS = ns["BOS"]
vocab_size = ns["vocab_size"]
n_layer = ns["n_layer"]
n_embd = ns["n_embd"]
block_size = ns["block_size"]
n_head = ns["n_head"]
head_dim = ns["head_dim"]
learning_rate = ns["learning_rate"]
beta1 = ns["beta1"]
beta2 = ns["beta2"]
eps_adam = ns["eps_adam"]
num_steps = ns["num_steps"]
m_buf = ns["m"]
v_buf = ns["v"]
gpt = ns["gpt"]
softmax_val = ns["softmax"]
Value = ns["Value"]

print(f"num docs: {len(docs)}  vocab: {vocab_size}  params: {len(params)}")

# ---------------------------------------------------------------------------
# Step 2: convert canonical Value weight matrices to numpy
# ---------------------------------------------------------------------------
def values_to_numpy(mat):
    return np.array([[v.data for v in row] for row in mat], dtype=np.float64)

W = {name: values_to_numpy(mat) for name, mat in state_dict.items()}


def short_name(name):
    return name.replace("layer0.", "")


for name, arr in W.items():
    print(f"  W[{name}]  shape {arr.shape}")

# ---------------------------------------------------------------------------
# Step 3: numpy reimplementation (full-sequence matrix math)
# Mirrors microgpt.py's forward exactly: weights are stored (out, in), so
# X @ W.T is the batched linear. RMSNorm is applied THREE times per forward:
# once after the embedding sum, once pre-attention, once pre-MLP.
# ---------------------------------------------------------------------------
def rmsnorm_np(x):
    # match Python: sum-divide rather than .mean() to avoid pairwise/naive diff
    ms = (x * x).sum(axis=-1, keepdims=True) / x.shape[-1]
    scale = (ms + 1e-5) ** -0.5
    return x * scale


def softmax_np(x):
    m = x.max(axis=-1, keepdims=True)
    e = np.exp(x - m)
    return e / e.sum(axis=-1, keepdims=True)


def forward_np(ids):
    n = len(ids)
    tok_emb = W["wte"][ids]                   # (n, d)
    pos_emb = W["wpe"][:n]                    # (n, d)
    X_emb = tok_emb + pos_emb                 # embedding sum
    X_prime = rmsnorm_np(X_emb)               # RMSNorm #1 (primes residual)

    # ---- attention block ----
    x_res1 = X_prime                          # residual stream
    X1 = rmsnorm_np(X_prime)                  # RMSNorm #2 (pre-attn)
    Q = X1 @ W["layer0.attn_wq"].T            # (n, d)
    K = X1 @ W["layer0.attn_wk"].T
    V = X1 @ W["layer0.attn_wv"].T

    Qh = Q.reshape(n, n_head, head_dim).transpose(1, 0, 2)  # (H, n, HD)
    Kh = K.reshape(n, n_head, head_dim).transpose(1, 0, 2)
    Vh = V.reshape(n, n_head, head_dim).transpose(1, 0, 2)

    scores_raw = Qh @ Kh.transpose(0, 2, 1) / (head_dim ** 0.5)  # (H, n, n)
    mask = -1e10 * (1.0 - np.tri(n, dtype=np.float64))           # (n, n)
    scores = scores_raw + mask
    attn = softmax_np(scores)                                    # (H, n, n)
    head_out = attn @ Vh                                         # (H, n, HD)
    head_concat = head_out.transpose(1, 0, 2).reshape(n, n_embd) # (n, d)
    attn_proj = head_concat @ W["layer0.attn_wo"].T              # (n, d)
    X2 = x_res1 + attn_proj                                      # residual add

    # ---- MLP block ----
    x_res2 = X2
    X3 = rmsnorm_np(X2)                                          # RMSNorm #3
    mlp_fc1_out = X3 @ W["layer0.mlp_fc1"].T                     # (n, 4d)
    X_relu = np.maximum(0.0, mlp_fc1_out)
    mlp_fc2_out = X_relu @ W["layer0.mlp_fc2"].T                 # (n, d)
    X4 = x_res2 + mlp_fc2_out

    logits = X4 @ W["lm_head"].T                                 # (n, vocab)

    return {
        "X_emb": X_emb, "X_prime": X_prime,
        "X1": X1, "Q": Q, "K": K, "V": V,
        "Qh": Qh, "Kh": Kh, "Vh": Vh,
        "scores_raw": scores_raw, "scores": scores, "attn": attn,
        "head_out": head_out, "head_concat": head_concat,
        "attn_proj": attn_proj, "X2": X2,
        "X3": X3, "mlp_fc1_out": mlp_fc1_out, "X_relu": X_relu,
        "mlp_fc2_out": mlp_fc2_out, "X4": X4, "logits": logits,
    }

# ---------------------------------------------------------------------------
# Step 4: first training doc → tokens, numpy forward, canonical forward
# ---------------------------------------------------------------------------
first_doc = docs[0]
first_doc_tokens = [BOS] + [uchars.index(ch) for ch in first_doc] + [BOS]
n = min(block_size, len(first_doc_tokens) - 1)
input_tokens = first_doc_tokens[:n]
target_tokens = first_doc_tokens[1:n + 1]
ids = np.array(input_tokens, dtype=np.int64)
targets = np.array(target_tokens, dtype=np.int64)

print(f"\nfirst doc: {first_doc!r}")
print(f"tokens: {first_doc_tokens}  (n={n})")

fwd = forward_np(ids)
logits_np = fwd["logits"]
probs_np = softmax_np(logits_np)
loss_per_pos = -np.log(probs_np[np.arange(n), targets])
loss_np = float(loss_per_pos.mean())

# Canonical forward via the Value class, mirroring microgpt.py's training loop
keys_c = [[] for _ in range(n_layer)]
values_c = [[] for _ in range(n_layer)]
losses_c = []
last_logits_c = None
for pos in range(n):
    tid = input_tokens[pos]
    tgt = target_tokens[pos]
    logits_c = gpt(tid, pos, keys_c, values_c)
    last_logits_c = logits_c
    probs_c = softmax_val(logits_c)
    loss_t = -probs_c[tgt].log()
    losses_c.append(loss_t)
loss_c_val = (1 / n) * sum(losses_c)
loss_c = loss_c_val.data
last_logits_c_np = np.array([v.data for v in last_logits_c], dtype=np.float64)

# ---------------------------------------------------------------------------
# Step 5: assert numpy ≡ canonical
# ---------------------------------------------------------------------------
loss_diff = abs(loss_np - loss_c)
logit_diff = float(np.max(np.abs(logits_np[-1] - last_logits_c_np)))
print(f"\nnumpy loss:     {loss_np:.18f}")
print(f"canonical loss: {loss_c:.18f}")
print(f"loss diff:      {loss_diff:.2e}  (target < {SELF_CHECK_TOL})")
print(f"last-logit diff:{logit_diff:.2e}")

assert loss_diff < SELF_CHECK_TOL, (
    f"canonical != numpy reimpl on loss: {loss_diff:.2e}"
)
assert logit_diff < SELF_CHECK_TOL, (
    f"canonical != numpy reimpl on logits: {logit_diff:.2e}"
)
print("self-check passed")

# ---------------------------------------------------------------------------
# Step 6: dump weights, intermediates, loss
# ---------------------------------------------------------------------------
os.makedirs(WEIGHTS_DIR, exist_ok=True)

for name, arr in W.items():
    fname = short_name(name)
    np.ascontiguousarray(arr, dtype=np.float64).tofile(f"{WEIGHTS_DIR}/{fname}.bin")

for name, arr in fwd.items():
    np.ascontiguousarray(arr, dtype=np.float64).tofile(f"{WEIGHTS_DIR}/{name}.bin")

np.ascontiguousarray(probs_np, dtype=np.float64).tofile(f"{WEIGHTS_DIR}/probs.bin")
np.array([loss_np], dtype=np.float64).tofile(f"{WEIGHTS_DIR}/loss.bin")

# ---------------------------------------------------------------------------
# Step 7: canonical backward, dump gradients
# ---------------------------------------------------------------------------
loss_c_val.backward()
grads = {name: np.array([[v.grad for v in row] for row in mat], dtype=np.float64)
         for name, mat in state_dict.items()}
for name, g in grads.items():
    np.ascontiguousarray(g, dtype=np.float64).tofile(
        f"{WEIGHTS_DIR}/grad_{short_name(name)}.bin"
    )

# ---------------------------------------------------------------------------
# Step 8: one Adam step, dump post-step weights
# ---------------------------------------------------------------------------
step = 0
lr_t = learning_rate * (1 - step / num_steps)
for i, p in enumerate(params):
    m_buf[i] = beta1 * m_buf[i] + (1 - beta1) * p.grad
    v_buf[i] = beta2 * v_buf[i] + (1 - beta2) * p.grad ** 2
    m_hat = m_buf[i] / (1 - beta1 ** (step + 1))
    v_hat = v_buf[i] / (1 - beta2 ** (step + 1))
    p.data -= lr_t * m_hat / (v_hat ** 0.5 + eps_adam)
    p.grad = 0

W_adam1 = {name: values_to_numpy(mat) for name, mat in state_dict.items()}
for name, arr in W_adam1.items():
    np.ascontiguousarray(arr, dtype=np.float64).tofile(
        f"{WEIGHTS_DIR}/{short_name(name)}_adam1.bin"
    )

# ---------------------------------------------------------------------------
# Step 9: manifest
# ---------------------------------------------------------------------------
def shape_of(arr):
    return list(np.asarray(arr).shape)

manifest = {
    "hyperparams": {
        "n_layer": n_layer,
        "n_embd": n_embd,
        "block_size": block_size,
        "n_head": n_head,
        "head_dim": head_dim,
        "vocab_size": vocab_size,
        "lr": learning_rate,
        "beta1": beta1,
        "beta2": beta2,
        "eps_adam": eps_adam,
        "num_steps": num_steps,
    },
    "uchars": "".join(uchars),
    "BOS": BOS,
    "first_doc": first_doc,
    "first_doc_tokens": first_doc_tokens,
    "input_tokens": input_tokens,
    "target_tokens": target_tokens,
    "n": n,
    "shapes": {
        **{short_name(name): shape_of(arr) for name, arr in W.items()},
        **{name: shape_of(arr) for name, arr in fwd.items()},
        "probs": shape_of(probs_np),
        "loss": [1],
    },
    "self_check_tolerance": SELF_CHECK_TOL,
    "loss_np": loss_np,
    "loss_canonical": loss_c,
    "loss_diff": loss_diff,
}
with open(f"{WEIGHTS_DIR}/manifest.json", "w") as f:
    json.dump(manifest, f, indent=2)

print(
    f"\nwrote {len(W)} weights + {len(fwd) + 2} intermediates + "
    f"{len(grads)} gradients + {len(W_adam1)} post-adam weights"
)
print(f"manifest: {WEIGHTS_DIR}/manifest.json")
