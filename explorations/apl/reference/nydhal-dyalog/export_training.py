"""
Runs 10 training steps of Karpathy's microgpt.py and dumps per-step losses
and post-training weights. Used by test_training.apl to verify that the
APL training loop matches the python reference trajectory.

Runs the canonical scalar-autograd Value graph (not the numpy reimpl) so
the reference is unambiguously Karpathy's code. ~30 seconds runtime.

Usage:
    python export_training.py
"""

import os
import shutil
import json
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
os.chdir(HERE)
WEIGHTS_DIR = "weights"
NSTEPS = 10

if not os.path.exists("input.txt"):
    shutil.copyfile("names.txt", "input.txt")

# Exec microgpt.py up to the training loop to populate state
with open("microgpt.py") as f:
    src = f.read()
cut = src.index("for step in range(num_steps):")
pre_training = src[:cut]

ns = {"__name__": "__main__"}
exec(pre_training, ns)

state_dict = ns["state_dict"]
params = ns["params"]
docs = ns["docs"]
uchars = ns["uchars"]
BOS = ns["BOS"]
vocab_size = ns["vocab_size"]
block_size = ns["block_size"]
n_layer = ns["n_layer"]
learning_rate = ns["learning_rate"]
beta1 = ns["beta1"]
beta2 = ns["beta2"]
eps_adam = ns["eps_adam"]
num_steps_full = ns["num_steps"]
m_buf = ns["m"]
v_buf = ns["v"]
gpt = ns["gpt"]
softmax = ns["softmax"]

print(f"running {NSTEPS} canonical training steps (this is slow, ~30s)...")

losses = []
step_docs = []

for step in range(NSTEPS):
    doc = docs[step % len(docs)]
    tokens = [BOS] + [uchars.index(ch) for ch in doc] + [BOS]
    n = min(block_size, len(tokens) - 1)

    keys, values = [[] for _ in range(n_layer)], [[] for _ in range(n_layer)]
    losses_t = []
    for pos_id in range(n):
        tid = tokens[pos_id]
        tgt = tokens[pos_id + 1]
        logits = gpt(tid, pos_id, keys, values)
        probs = softmax(logits)
        loss_t = -probs[tgt].log()
        losses_t.append(loss_t)
    loss = (1 / n) * sum(losses_t)
    loss.backward()

    lr_t = learning_rate * (1 - step / num_steps_full)
    for i, p in enumerate(params):
        m_buf[i] = beta1 * m_buf[i] + (1 - beta1) * p.grad
        v_buf[i] = beta2 * v_buf[i] + (1 - beta2) * p.grad ** 2
        m_hat = m_buf[i] / (1 - beta1 ** (step + 1))
        v_hat = v_buf[i] / (1 - beta2 ** (step + 1))
        p.data -= lr_t * m_hat / (v_hat ** 0.5 + eps_adam)
        p.grad = 0

    losses.append(loss.data)
    step_docs.append({"doc": doc, "tokens": tokens, "n": n})
    print(f"  step {step+1:2d}  doc {doc!r:18s}  loss {loss.data:.10f}")

# Dump losses as float64 binary
np.array(losses, dtype=np.float64).tofile(f"{WEIGHTS_DIR}/losses_10.bin")

# Dump post-training weights
def values_to_numpy(mat):
    return np.array([[v.data for v in row] for row in mat], dtype=np.float64)

for name, mat in state_dict.items():
    short = name.replace("layer0.", "")
    values_to_numpy(mat).tofile(f"{WEIGHTS_DIR}/{short}_trained10.bin")

# Manifest for the training trajectory
with open(f"{WEIGHTS_DIR}/train10_manifest.json", "w") as f:
    json.dump(
        {
            "nsteps": NSTEPS,
            "losses": losses,
            "step_docs": step_docs,
            "hyperparams": {
                "lr": learning_rate,
                "beta1": beta1,
                "beta2": beta2,
                "eps_adam": eps_adam,
                "num_steps_full": num_steps_full,
            },
        },
        f,
        indent=2,
    )

print(f"\ndumped {NSTEPS} losses, post-training weights, and train10_manifest.json")
