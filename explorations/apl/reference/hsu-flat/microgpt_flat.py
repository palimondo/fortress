"""
microgpt_flat.py — the Hsu data layout (see rungs/apl/microgpt_flat.apl) in numpy, with NO autograd:
the backward pass is written out, mirroring the APL line for line.

  P      one flat float vector (4192); the nine matrices are views (reshape of a slice, no copies)
  TOKM   corpus as one int matrix (docs × 17), BOS-padded; LEN per doc; a batch is a row selection
  step   pure: (P, batch keys) -> (loss, G) with G flat, same layout as P
  Adam   three whole-vector expressions
  batch  rows are (doc,pos) pairs; one matmul for every linear op; attention batched over (B, H, T, T)
  VALID  Boolean mask over (doc,pos), multiplied into the loss

Usage: python microgpt_flat.py batch=32 steps=2000 dtype=fp32 seed=1 data_seed=0 eval_every=250
       python microgpt_flat.py check=5 steps=1000          # batch 1, fp64: compare with the scalar oracle
       python microgpt_flat.py selftest=1                  # batched == token-weighted mean of per-doc; finite differences on P
"""
import os, sys, math, random, time
import numpy as np

args = dict(a.split('=', 1) for a in sys.argv[1:])
B_SZ = int(args.get('batch', 1)); NUM_STEPS = int(args.get('steps', 1000)); N_VAL = int(args.get('val', 300))
CHECK = int(args.get('check', 0)); SELFTEST = int(args.get('selftest', 0)); EVAL_EVERY = int(args.get('eval_every', 0))
SEED = int(args.get('seed', 42)); DATA_SEED = int(args.get('data_seed', SEED)); LR = float(args.get('lr', 0.01))
DT = np.float32 if args.get('dtype', 'fp64') == 'fp32' else np.float64

NE, BLK, NH, HD, EPS = 16, 16, 4, 4, 1e-5
B1, B2, EPSA = 0.85, 0.99, 1e-8

# ----------------------------------------------------------------- corpus: one int matrix, built once
if not os.path.exists('input.txt'):
    import urllib.request
    urllib.request.urlretrieve('https://raw.githubusercontent.com/karpathy/makemore/988aa59/names.txt', 'input.txt')
docs = [l.strip() for l in open('input.txt') if l.strip()]
random.seed(DATA_SEED); random.shuffle(docs)
if SEED != DATA_SEED: random.seed(SEED)
uchars = sorted(set(''.join(docs))); BOS = len(uchars); VS = BOS + 1
enc = {c: i for i, c in enumerate(uchars)}
TOKM = np.full((len(docs), BLK + 1), BOS, dtype=np.int64)
for i, d in enumerate(docs): TOKM[i, 1:1 + len(d)] = [enc[c] for c in d]
LEN = np.array([1 + len(d) for d in docs])                     # (input,target) pairs per doc
ND_TRAIN = len(docs) - N_VAL; VAL = np.arange(ND_TRAIN, len(docs))

# ----------------------------------------------------------------- parameters: one flat vector, views
NAMES = ['wte', 'wpe', 'lm_head', 'attn_wq', 'attn_wk', 'attn_wv', 'attn_wo', 'mlp_fc1', 'mlp_fc2']
SHP = [(VS, NE), (BLK, NE), (VS, NE), (NE, NE), (NE, NE), (NE, NE), (NE, NE), (4 * NE, NE), (NE, 4 * NE)]
CNT = [r * c for r, c in SHP]; OFF = np.cumsum([0] + CNT[:-1]); NP_ = sum(CNT)
P = np.empty(NP_, dtype=DT)
for o, n in zip(OFF, CNT): P[o:o + n] = [random.gauss(0, 0.08) for _ in range(n)]   # same draw order as microgpt.py
views = lambda v: [v[o:o + n].reshape(s) for o, n, s in zip(OFF, CNT, SHP)]
EYE_V = np.eye(VS, dtype=DT); EYE_T = np.eye(BLK, dtype=DT)
MASK = np.triu(np.full((BLK, BLK), -1e10, dtype=DT), k=1)
print(f"flat numpy {DT.__name__} | params {NP_} | corpus {TOKM.shape} | batch {B_SZ}")

def rmsnorm(x): return x / np.sqrt((x * x).mean(-1, keepdims=True) + EPS)
def rmsnorm_b(dy, x):
    r = np.sqrt((x * x).mean(-1, keepdims=True) + EPS); y = x / r
    return (dy - y * (y * dy).mean(-1, keepdims=True)) / r
def softmax(z):
    e = np.exp(z - z.max(-1, keepdims=True)); return e / e.sum(-1, keepdims=True)
def softmax_b(p, dy): return p * (dy - (p * dy).sum(-1, keepdims=True))

# ----------------------------------------------------------------- the step: keys -> (loss, flat gradient)
def step(P, b, need_grad=True):
    B = len(b); N = B * BLK
    R = TOKM[b]; ids = R[:, :BLK].ravel(); tg = R[:, 1:].ravel()
    vm = (np.arange(BLK)[None, :] < LEN[b][:, None]).ravel().astype(DT); nv = vm.sum()
    pos = np.tile(np.arange(BLK), B)
    wte, wpe, lm, wq, wk, wv, wo, f1, f2 = views(P)
    # forward, all (doc,pos) rows at once
    X = wte[ids] + wpe[pos]
    Xp = rmsnorm(X); X1 = rmsnorm(Xp)
    Q = X1 @ wq.T; K = X1 @ wk.T; V = X1 @ wv.T
    heads = lambda M: M.reshape(B, BLK, NH, HD).transpose(0, 2, 1, 3)          # (B, H, T, d)
    Qh, Kh, Vh = heads(Q), heads(K), heads(V)
    S = Qh @ Kh.transpose(0, 1, 3, 2) / math.sqrt(HD) + MASK
    A = softmax(S)
    Hc = (A @ Vh).transpose(0, 2, 1, 3).reshape(N, NE)
    X2 = Xp + Hc @ wo.T
    X3 = rmsnorm(X2); M0 = X3 @ f1.T; Mr = np.maximum(0, M0)
    X4 = X2 + Mr @ f2.T
    Pr = softmax(X4 @ lm.T)
    rows = np.arange(N)
    loss = -(vm * np.log(Pr[rows, tg])).sum() / nv
    if not need_grad: return float(loss), None
    # backward, one line per forward line, bottom-up
    G = np.empty(NP_, dtype=DT); gWTE, gWPE, gLM, gWQ, gWK, gWV, gWO, gF1, gF2 = views(G)
    dL = Pr.copy(); dL[rows, tg] -= 1; dL *= (vm / nv)[:, None]
    gLM[...] = dL.T @ X4; dX4 = dL @ lm
    gF2[...] = dX4.T @ Mr; dM0 = (dX4 @ f2) * (M0 > 0)
    gF1[...] = dM0.T @ X3; dX3 = dM0 @ f1
    dX2 = dX4 + rmsnorm_b(dX3, X2)
    gWO[...] = dX2.T @ Hc; dH = heads(dX2 @ wo)
    dVh = A.transpose(0, 1, 3, 2) @ dH
    dS = softmax_b(A, dH @ Vh.transpose(0, 1, 3, 2)) / math.sqrt(HD)
    dQh = dS @ Kh; dKh = dS.transpose(0, 1, 3, 2) @ Qh
    unheads = lambda M: M.transpose(0, 2, 1, 3).reshape(N, NE)
    dQ, dK, dV = unheads(dQh), unheads(dKh), unheads(dVh)
    gWQ[...] = dQ.T @ X1; gWK[...] = dK.T @ X1; gWV[...] = dV.T @ X1
    dX1 = dQ @ wq + dK @ wk + dV @ wv
    dXp = dX2 + rmsnorm_b(dX1, Xp); dX = rmsnorm_b(dXp, X)
    gWTE[...] = EYE_V[ids].T @ dX                                              # keys -> one-hot -> scatter-add
    gWPE[...] = EYE_T[pos].T @ dX
    return float(loss), G

def evaluate(P):
    total, count = 0.0, 0
    for i in range(0, len(VAL), 100):
        b = VAL[i:i + 100]; l, _ = step(P, b, need_grad=False); n = LEN[b].sum(); total += l * n; count += n
    return total / count

# ----------------------------------------------------------------- self-test
if SELFTEST:
    b = np.arange(4)
    lb, gb = step(P, b)
    ls = [step(P, np.array([i]))[0] for i in b]; gs = [step(P, np.array([i]))[1] for i in b]; ns = LEN[b]
    lw = sum(l * n for l, n in zip(ls, ns)) / ns.sum(); gw = sum(g * n for g, n in zip(gs, ns)) / ns.sum()
    print(f"batched loss {lb!r}  weighted mean {lw!r}  |Δ| {abs(lb - lw):.1e}   max|Δgrad| {np.abs(gb - gw).max():.1e}")
    eps = 1e-6; worst = 0.0
    for i in [17, 500, 1000, 1300, 1500, 1700, 2000, 2500, 3000, 4000, 4191]:
        Pp = P.copy(); Pp[i] += eps; Pm = P.copy(); Pm[i] -= eps
        fd = (step(Pp, b, False)[0] - step(Pm, b, False)[0]) / (2 * eps)
        worst = max(worst, abs(fd - gb[i])); print(f"  P[{i}] backprop {gb[i]:+.9f} fd {fd:+.9f} |Δ| {abs(fd - gb[i]):.1e}")
    print(f"worst |Δ| {worst:.1e};  zero-gradient params {(gb == 0).sum()} of {NP_}")
    sys.exit(0)

# ----------------------------------------------------------------- training: Adam as three vector expressions
M = np.zeros_like(P); Vv = np.zeros_like(P)
steps = CHECK or NUM_STEPS; curve = []; t_train = 0.0
for s in range(steps):
    b = (s * B_SZ + np.arange(B_SZ)) % ND_TRAIN
    t0 = time.perf_counter()
    loss, G = step(P, b)
    lr = LR * (1 - s / NUM_STEPS); t = s + 1
    M = B1 * M + (1 - B1) * G; Vv = B2 * Vv + (1 - B2) * G * G
    P = P - lr * (M / (1 - B1 ** t)) / (np.sqrt(Vv / (1 - B2 ** t)) + EPSA)
    t_train += time.perf_counter() - t0
    if CHECK: print(f"step {t} loss {loss!r}")
    elif EVAL_EVERY and t % EVAL_EVERY == 0: curve.append((t * B_SZ, evaluate(P)))
print(f"{steps} steps x {B_SZ}: {1000 * t_train / steps:.2f} ms/step, {steps * B_SZ / t_train:.0f} names/s")
if not CHECK:
    if curve: print("curve " + ' '.join(f"{n}:{v:.4f}" for n, v in curve))
    print(f"val loss {evaluate(P):.4f} nats/token over {N_VAL} held-out names after {steps * B_SZ} names seen")
