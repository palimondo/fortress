"""Derive goldens from the pinned reference (explorations/run-b2/reference/microgpt.py, not committed).

Executes the pinned source verbatim up to its training loop (dataset, tokenizer, autograd,
parameters, model, Adam buffers), then runs NUM_STEPS steps of a loop that is arithmetically the
reference's own (same expressions, same order) while recording tokens, logits, per-position losses,
the loss, the learning rate, every parameter gradient and every parameter after the Adam update.
Then NUM_SAMPLES inference samples with the uniform draws consumed by random.choices recorded, so
that a replay in another language can reproduce the same tokens.
Output: explorations/run-b2/checks/goldens_{NUM_STEPS}steps.json
"""
import hashlib, json, os, random, sys

HERE = os.path.dirname(os.path.abspath(__file__))
REF = os.path.join(HERE, '..', 'reference')
SRC = os.path.join(REF, 'microgpt.py')
NUM_STEPS = int(sys.argv[1]) if len(sys.argv) > 1 else 2
NUM_SAMPLES = 3

src = open(SRC).read()
sha = hashlib.sha256(src.encode()).hexdigest()
cut = src.index('# Repeat in sequence')
os.chdir(REF)                      # the reference fetches input.txt into the cwd
g = {'__name__': 'microgpt_ref'}
exec(compile(src[:cut], SRC, 'exec'), g)
Value, softmax, gpt = g['Value'], g['softmax'], g['gpt']
state_dict, params, docs, uchars = g['state_dict'], g['params'], g['docs'], g['uchars']
BOS, block_size, n_layer, vocab_size = g['BOS'], g['block_size'], g['n_layer'], g['vocab_size']
learning_rate, beta1, beta2, eps_adam = g['learning_rate'], g['beta1'], g['beta2'], g['eps_adam']
m, v = g['m'], g['v']
num_steps = 1000                   # the reference's schedule length, kept for the lr decay

def mat(M): return [[p.data for p in row] for row in M]
def gmat(M): return [[p.grad for p in row] for row in M]

out = {'source_sha256': sha,
       'config': {'n_layer': n_layer, 'n_embd': g['n_embd'], 'block_size': block_size,
                  'n_head': g['n_head'], 'vocab_size': vocab_size, 'BOS': BOS, 'uchars': ''.join(uchars),
                  'num_steps_schedule': num_steps, 'learning_rate': learning_rate,
                  'beta1': beta1, 'beta2': beta2, 'eps_adam': eps_adam},
       'init': {k: mat(M) for k, M in state_dict.items()},
       'docs': docs[:NUM_STEPS], 'docs_head': docs[:64], 'steps': []}

for step in range(NUM_STEPS):
    doc = docs[step % len(docs)]
    tokens = [BOS] + [uchars.index(ch) for ch in doc] + [BOS]
    n = min(block_size, len(tokens) - 1)
    keys, values = [[] for _ in range(n_layer)], [[] for _ in range(n_layer)]
    losses, logits_rec = [], []
    for pos_id in range(n):
        token_id, target_id = tokens[pos_id], tokens[pos_id + 1]
        logits = gpt(token_id, pos_id, keys, values)
        logits_rec.append([l.data for l in logits])
        probs = softmax(logits)
        loss_t = -probs[target_id].log()
        losses.append(loss_t)
    loss = (1 / n) * sum(losses)
    loss.backward()
    rec = {'doc': doc, 'tokens': tokens, 'n': n, 'logits': logits_rec,
           'losses': [l.data for l in losses], 'loss': loss.data,
           'grads': {k: gmat(M) for k, M in state_dict.items()}}
    lr_t = learning_rate * (1 - step / num_steps)
    for i, p in enumerate(params):
        m[i] = beta1 * m[i] + (1 - beta1) * p.grad
        v[i] = beta2 * v[i] + (1 - beta2) * p.grad ** 2
        m_hat = m[i] / (1 - beta1 ** (step + 1))
        v_hat = v[i] / (1 - beta2 ** (step + 1))
        p.data -= lr_t * m_hat / (v_hat ** 0.5 + eps_adam)
        p.grad = 0
    rec['lr'] = lr_t
    rec['after'] = {k: mat(M) for k, M in state_dict.items()}
    out['steps'].append(rec)
    print(f"step {step+1} | loss {loss.data:.6f}")

# inference with the uniform draws recorded: random.choices calls self.random() once per draw
temperature = 0.5
draws = []
_inst = random._inst
_orig = _inst.random
def _rec():
    u = _orig(); draws.append(u); return u
_inst.random = _rec
samples = []
for sample_idx in range(NUM_SAMPLES):
    keys, values = [[] for _ in range(n_layer)], [[] for _ in range(n_layer)]
    token_id = BOS
    sample, steps_rec = [], []
    for pos_id in range(block_size):
        logits = gpt(token_id, pos_id, keys, values)
        probs = softmax([l / temperature for l in logits])
        before = len(draws)
        token_id = random.choices(range(vocab_size), weights=[p.data for p in probs])[0]
        steps_rec.append({'probs': [p.data for p in probs], 'draws': draws[before:], 'token': token_id})
        if token_id == BOS:
            break
        sample.append(uchars[token_id])
    samples.append({'text': ''.join(sample), 'steps': steps_rec})
    print(f"sample {sample_idx+1}: {''.join(sample)}")
out['inference'] = {'temperature': temperature, 'samples': samples}

dest = os.path.join(HERE, '..', 'checks', f'goldens_{NUM_STEPS}steps.json')
json.dump(out, open(dest, 'w'))
print('wrote', os.path.relpath(dest, os.path.join(HERE, '..')), 'sha256 of source', sha)
