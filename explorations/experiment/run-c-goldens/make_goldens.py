"""Driver that produces goldens.json from explorations/apl/reference/hsu-flat/microgpt_flat.py
without editing it. It execs the reference's definitions (everything above its self-test
section) with the config `check=5 steps=1000` (batch 1, fp64), then computes the goldens
from the reference's own `step`, and cross-checks the five losses against the unmodified
script run as a subprocess.

Usage (from a scratch directory; the reference downloads names.txt into the cwd as input.txt):
    python3 make_goldens.py <repo root> <output dir>
"""
import hashlib, json, os, subprocess, sys, platform
import numpy as np

root, out = os.path.abspath(sys.argv[1]), os.path.abspath(sys.argv[2])
REF = os.path.join(root, 'explorations/apl/reference/hsu-flat/microgpt_flat.py')
WDIR = os.path.join(root, 'explorations/apl/reference/dzaima/w')
DOCS = os.path.join(root, 'explorations/apl/reference/dzaima/docs.txt')
sha = lambda p: hashlib.sha256(open(p, 'rb').read()).hexdigest()

src = open(REF).read()
cut = src.index('# ----------------------------------------------------------------- self-test')
sys.argv = ['microgpt_flat.py', 'check=5', 'steps=1000']          # batch 1, fp64, schedule length 1000
ns = {'__name__': 'ref'}
exec(compile(src[:cut], REF, 'exec'), ns)

P0 = ns['P'].copy(); step = ns['step']; LEN = ns['LEN']; TOKM = ns['TOKM']; docs = ns['docs']
NAMES, SHP, CNT, OFF = ns['NAMES'], ns['SHP'], ns['CNT'], [int(o) for o in ns['OFF']]
B1, B2, EPSA, LR, NUM_STEPS, ND_TRAIN = ns['B1'], ns['B2'], ns['EPSA'], ns['LR'], ns['NUM_STEPS'], ns['ND_TRAIN']
assert ns['B_SZ'] == 1 and NUM_STEPS == 1000 and ns['DT'] is np.float64

# --- the initial parameter vector against the committed weight files
wfile = []
for n in NAMES:
    rows = [[float(x.replace('¯', '-')) for x in line.split()] for line in open(os.path.join(WDIR, n + '.txt'), encoding='utf-8')]
    wfile.extend(v for r in rows for v in r)
wfile = np.array(wfile)
assert wfile.shape == P0.shape, (wfile.shape, P0.shape)
weights_match = bool(np.array_equal(wfile, P0))
docs_file = [l.rstrip('\n') for l in open(DOCS, encoding='utf-8')]
docs_match = docs[:len(docs_file)] == docs_file

# --- step 0 at batch 1: loss, flat gradient, Adam update
def adam(P, M, V, G, s):
    lr = LR * (1 - s / NUM_STEPS); t = s + 1
    M = B1 * M + (1 - B1) * G; V = B2 * V + (1 - B2) * G * G
    P = P - lr * (M / (1 - B1 ** t)) / (np.sqrt(V / (1 - B2 ** t)) + EPSA)
    return P, M, V
loss0, G0 = step(P0, np.array([0]))
P1, _, _ = adam(P0, np.zeros_like(P0), np.zeros_like(P0), G0, 0)

# --- five steps at batch 1, schedule length 1000 (the reference's own loop, transcribed)
P, M, V = P0.copy(), np.zeros_like(P0), np.zeros_like(P0); losses = []; batches = []
for s in range(5):
    b = (s * 1 + np.arange(1)) % ND_TRAIN; batches.append([int(i) for i in b])
    l, G = step(P, b); losses.append(l)
    P, M, V = adam(P, M, V, G, s)
assert losses[0] == loss0

# cross-check: the unmodified script, run as a subprocess with the same config
run = subprocess.run([sys.executable, REF, 'check=5', 'steps=1000'], capture_output=True, text=True, check=True)
printed = [float(l.split('loss ')[1]) for l in run.stdout.splitlines() if l.startswith('step ')]
assert printed == losses, (printed, losses)

# --- batch 4: the first batch as the reference's training loop would form it, and its four documents
b4 = np.arange(4)
lb, gb = step(P0, b4)
ls = [step(P0, np.array([i]))[0] for i in b4]; ns_ = [int(LEN[i]) for i in b4]
lw = sum(l * n for l, n in zip(ls, ns_)) / sum(ns_)

# --- finite differences on the flat vector, eps 1e-6 (the reference's self-test indices), at batch 1 (doc 0) and batch 4
IDX = [17, 500, 1000, 1300, 1500, 1700, 2000, 2500, 3000, 4000, 4191]
def fd(bsel, g):
    outl = []
    for i in IDX:
        Pp = P0.copy(); Pp[i] += 1e-6; Pm = P0.copy(); Pm[i] -= 1e-6
        v = (step(Pp, bsel, False)[0] - step(Pm, bsel, False)[0]) / 2e-6
        outl.append({'index': i, 'matrix': next(n for n, o, c in zip(NAMES, OFF, CNT) if o <= i < o + c),
                     'backprop': float(g[i]), 'finite_difference': float(v), 'abs_diff': abs(float(g[i]) - float(v))})
    return outl
fd1, fd4 = fd(np.array([0]), G0), fd(b4, gb)

uchars = ns['uchars']
gold = {
    'produced_by': 'explorations/experiment/run-c-goldens/make_goldens.py over explorations/apl/reference/hsu-flat/microgpt_flat.py (unmodified)',
    'reference_sha256': sha(REF),
    'names_txt': {'url': 'https://raw.githubusercontent.com/karpathy/makemore/988aa59/names.txt', 'sha256': sha('input.txt'), 'documents': len(docs)},
    'environment': {'python': platform.python_version(), 'numpy': np.__version__, 'dtype': 'float64'},
    'config': {'n_embd': ns['NE'], 'block_size': ns['BLK'], 'n_head': ns['NH'], 'head_dim': ns['HD'], 'vocab_size': ns['VS'], 'bos': ns['BOS'],
               'eps_rmsnorm': ns['EPS'], 'lr0': LR, 'beta1': B1, 'beta2': B2, 'eps_adam': EPSA,
               'schedule_length': NUM_STEPS, 'train_documents': int(ND_TRAIN), 'seed': ns['SEED']},
    'layout': {'names': NAMES, 'shapes': [list(s) for s in SHP], 'counts': CNT, 'offsets': OFF, 'total': int(ns['NP_']),
               'row_major': 'each matrix is stored row by row (numpy C order); wte is (vocab, n_embd)'},
    'vocabulary': {'chars': uchars, 'bos_id': ns['BOS'], 'note': 'char i of chars has id i; bos_id is the padding and boundary token'},
    'corpus': {'document_order': 'names.txt shuffled with random.seed(42) (Python 3 random.shuffle); the first 2000 are explorations/apl/reference/dzaima/docs.txt, which matched: ' + str(docs_match),
               'first_16_documents': docs[:16], 'first_16_lengths': [int(LEN[i]) for i in range(16)],
               'first_16_token_rows': [[int(t) for t in TOKM[i]] for i in range(16)],
               'row_shape': [int(x) for x in TOKM.shape], 'length_meaning': 'LEN = 1 + chars = number of (input, target) pairs in the row'},
    'initial_parameters': {'source': 'explorations/apl/reference/dzaima/w/<name>.txt in layout order, rows in file order, high minus (U+00AF) for negatives',
                           'file_sha256': {n: sha(os.path.join(WDIR, n + '.txt')) for n in NAMES},
                           'matches_reference_draw_exactly': weights_match, 'P0': [float(x) for x in P0]},
    'batch1_five_steps': {'batches': batches, 'losses': [float(l) for l in losses],
                          'printed_by_unmodified_script': run.stdout.strip().splitlines()},
    'batch1_step0': {'batch': [0], 'loss': float(loss0), 'valid_pairs': int(LEN[0]), 'gradient': [float(x) for x in G0],
                     'zero_gradient_entries': int((G0 == 0).sum()), 'parameters_after_adam': [float(x) for x in P1],
                     'adam_note': 'M = V = 0 before the step; lr = lr0 * (1 - 0/1000); bias correction with t = 1'},
    'batch4_first_batch': {'batch': [int(i) for i in b4], 'loss': float(lb), 'single_document_losses': [float(l) for l in ls],
                           'document_lengths': ns_, 'token_weighted_mean': float(lw), 'abs_diff': abs(float(lb) - float(lw)),
                           'zero_gradient_entries': int((gb == 0).sum())},
    'finite_differences': {'eps': 1e-6, 'method': 'central difference on the flat vector, loss only',
                           'batch1_doc0': fd1, 'batch4_first_batch': fd4,
                           'worst_abs_diff': max(x['abs_diff'] for x in fd1 + fd4)},
}
os.makedirs(out, exist_ok=True)
json.dump(gold, open(os.path.join(out, 'goldens.json'), 'w'), indent=1)
print('losses', losses); print('weights match', weights_match, 'docs match', docs_match)
print('batch4', lb, lw, abs(lb - lw)); print('fd worst', gold['finite_differences']['worst_abs_diff'])
print('zero grads step0', gold['batch1_step0']['zero_gradient_entries'], 'batch4', gold['batch4_first_batch']['zero_gradient_entries'])
