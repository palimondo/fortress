# microgpt.apl

> The first port of Karpathy's [microgpt](https://gist.github.com/karpathy/8627fe009c40f57531cb18360106ce95) to an array language.
> Two Dyalog APL implementations: a token-by-token companion that mirrors
> the python source line for line, and a full-sequence array-native rewrite
> that processes every position at once. No autograd engine, no dependencies.
> Every gradient is explicit matrix math.

## The notation was ready

Iverson defined APL's primitives in the 1960s: inner product `+.×`, outer
product `∘.≥`, the rank operator `⍤`, transpose `⍉`, elementwise operations
that broadcast across whole arrays. By 1990 every symbol used in modern
attention existed in the language. The vocabulary to write self-attention
was sitting there for decades before anyone had a reason to want it.

Here is the attention mechanism in four lines of APL:

```apl
sm ← {e÷+/e←*⍵-⌈/⍵}                              ⍝ stable softmax
msk ← ¯1E10×~(⍳n)∘.≥⍳n                           ⍝ causal mask
Q K V ← X (+.×⍉)¨ wq wk wv                       ⍝ q, k, v projections
A ← (sm⍤1⊢msk+(Q+.×⍤2⊢⍉⍤2⊢K)÷D*0.5)+.×⍤2⊢V      ⍝ attention output
```

Line 1: softmax over the last axis, numerically stable via max subtraction.
Line 2: an outer-product of indices produces a lower-triangular boolean
mask, negated and scaled so that future positions get added `-1E10` before
the softmax and vanish to zero after it. Line 3: three linear projections
applied to the input matrix via each (`¨`), each one a single `+.×`.
Line 4: scaled dot-product attention across every head and every position
in one expression. `+.×⍤2` is matmul applied per rank-2 cell, which pairs
head `h`'s queries with head `h`'s keys without a loop. `sm⍤1` normalizes
each row independently.

A programmer reading APL in 1990 could have traced every symbol in this
block. They could have computed the shapes, followed the data flow, and
verified the math. They would not have known why anyone would want it.
The algorithm was derivable from the notation thirty years before the
problem it solves had a name.

## Status

- Forward pass: bit-for-bit parity with python (< 5e-16 across 19 cached intermediates)
- Backward pass: all nine weight gradients match python at 1.11e-16
- Finite-difference gradient check: worst relative error 7.79e-7
- 10-step training trajectory: per-step loss diff 1.33e-15, final weight diff 4.02e-16
- 1000-step training + sampled names run end-to-end

## Quick start

Install [Dyalog APL](https://www.dyalog.com/download-zone.htm) v20 or later
(64-bit Unicode, free for non-commercial use). Install Python 3 and numpy.

```bash
# Generate binary weight dumps that both APL implementations verify against
python export_weights.py
python export_training.py         # 10-step training reference (~30 seconds)

# Run the full test suite
./run_tests.sh all

# Train the model for 1000 steps and sample 20 names
dyalog +s -script train.apl
```

## Two implementations, two philosophies

| File | Role | Non-blank lines |
|---|---|---|
| `microgpt_kv.apln` | forward-only structural port of `microgpt.py`, kv cache, per-head attention loop via nested dfn + each | 86 |
| `microgpt.apln` | full-sequence array-native rewrite: forward, backward, adam, training, generation | 192 |

The kv version answers the question: can APL express microgpt's control
flow? A reader can trace python line N to APL line M. Token-by-token
processing, kv cache, per-head loop. The same shape as the python source.

The array-native version answers a different question: what does
microgpt look like expressed in APL's natural idiom? All positions
processed simultaneously via a causal mask. Multi-head attention via
the rank operator `⍤2` instead of a loop. No kv cache during training.

The kv version was built first because per-position slices map cleanly
onto python's per-position state, which makes layer-by-layer debugging
straightforward. Once that forward matched python at one ulp, the
array-native forward was written against the same reference dumps.

Python encodes an execution strategy: process one token at a time,
stash keys and values in a growing cache, iterate the heads. APL's
full-sequence form encodes the mathematics directly: Q @ K.T is an
inner product, causality is an outer product, heads are an axis.
Python describes how to compute attention. APL describes what it is.

## What APL removes

The array-native rewrite deletes whole categories of machinery that
exist in the python source for implementation reasons:

| python concept | array-native APL |
|---|---|
| `Value` class and scalar autograd engine | gone (explicit matrix gradients) |
| topological sort for backward | gone |
| kv cache, key and value accumulation | gone (causal mask, single pass) |
| per-position loop `for pos_id in range(n)` | gone (matrix indexing) |
| per-head loop `for h in range(n_head)` | gone (`⍤2` rank operator) |
| list accumulation and `.extend` | gone (reshape and transpose) |
| `.topo_sort`, `.children`, `.backward()` chain | gone (reverse matrix math) |

Line count is a shallow metric. The interesting measurement is which
concepts a reader must hold in memory. To follow microgpt.py the reader
needs: autograd, computation graphs, topological sort, kv caching,
nested lists, per-token dispatch. To follow microgpt.apln the reader
needs: matrix multiply, outer product, masking, the rank operator.
The second set is the mathematical description in the transformer paper.
The first set is implementation plumbing.

## The attention block, three ways

### python (microgpt.py)

```python
for h in range(n_head):
    hs = h * head_dim
    q_h = q[hs:hs+head_dim]
    k_h = [ki[hs:hs+head_dim] for ki in keys[li]]
    v_h = [vi[hs:hs+head_dim] for vi in values[li]]
    attn_logits = [sum(q_h[j] * k_h[t][j] for j in range(head_dim)) / head_dim**0.5
                   for t in range(len(k_h))]
    attn_weights = softmax(attn_logits)
    head_out = [sum(attn_weights[t] * v_h[t][j] for t in range(len(v_h)))
                for j in range(head_dim)]
    x_attn.extend(head_out)
```

Per-token scalar sum-and-multiply, nested lists of lists, one loop per head.

### kv APL (microgpt_kv.apln)

```apl
x_attn ← ∊{
    hs  ← ⍵ × HD
    q_h ← q[hs+⍳HD]
    K_h ← ↑{⍵[hs+⍳HD]}¨S.keys
    V_h ← ↑{⍵[hs+⍳HD]}¨S.values
    al  ← (K_h+.×q_h)÷HD*0.5
    aw  ← softmax al
    aw+.×V_h
}¨⍳NH
```

Same structure as python, but each scalar accumulation collapses into a
single `+.×` inner product. Seven lines per head.

### array-native APL (microgpt.apln)

```apl
Qh ← 1 0 2⍉(n,NH,HD)⍴Q
Kh ← 1 0 2⍉(n,NH,HD)⍴K
Vh ← 1 0 2⍉(n,NH,HD)⍴V
S  ← (MASK n)+⍤2⊢(Qh +.×⍤2⊢⍉⍤2⊢Kh)÷HD*0.5
A  ← softmax⍤1⊢S
H  ← A +.×⍤2⊢Vh
Hc ← ,⍤2⊢1 0 2⍉H
```

No per-head loop. No kv cache. Reshape and transpose split the heads,
`+.×⍤2` runs the matmul across every head simultaneously, the mask is
added once as an outer product, `softmax⍤1` normalizes per row across
all heads and positions. Seven lines processing the entire sequence.

## Verification pipeline

The python reference harness (`export_weights.py`) runs Karpathy's
canonical scalar-autograd forward alongside a numpy reimplementation with
explicit matrix gradients, asserts they agree to < 1e-14, and dumps every
weight, intermediate, gradient, and post-adam weight as `float64` binary.
APL loads those dumps through `⎕NREAD` with zero precision loss and
compares at each layer.

| test | what it checks | worst diff |
|---|---|---|
| `test_forward_kv` | kv forward vs python logits + loss | 2.22e-16 (1 ulp) |
| `test_forward` | array-native forward across 19 cached intermediates | 4.44e-16 (2 ulps) |
| `test_backward` | all nine weight gradients from BWD | 1.11e-16 (1 ulp) |
| `test_gradcheck` | BWD vs finite difference (independent of python) | 7.79e-7 relative |
| `test_training` | 10-step training trajectory + final weights | 1.33e-15 loss, 4.02e-16 weights |

Each test reports PASS/FAIL and exits with a status code so CI can wire
them up with `./run_tests.sh all`.

## Performance notes

At microgpt's 4,192-parameter scale, interpreted Dyalog on CPU beats GPU
execution. The gist comments include a benchmark where an RTX 5080 running
PyTorch loses to numpy running on the same machine; kernel launch overhead
dominates 16x16 matmuls. The array-native version targets larger scales
cleanly; nothing in the code depends on the small dimensions.

## See also

- [microgpt.py](https://gist.github.com/karpathy/8627fe009c40f57531cb18360106ce95) - original scalar autograd source
- [awesome-microgpts](https://github.com/rupeshs/awesome-microgpts) - catalog of ports in other languages (16+ and counting, zero in array languages before this one)
- [trap](https://github.com/BobMcDear/trap) - GPT-2 in Dyalog APL, the architectural reference for the backward pass in `microgpt.apln`
- [rust-matrixmicrogpt](https://github.com/mplekh/rust-matrixmicrogpt) - explicit-gradient rust port, same strategy in a different language

## License

MIT. See `LICENSE`.
