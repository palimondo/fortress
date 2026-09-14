# microgpt in APL

`microgpt.apl` is Karpathy's microgpt as arrays: forward pass, hand-derived backward pass, Adam, training loop and sampling, in ~110 lines of APL. It follows the structure of Nydhal's Dyalog port (github.com/Nydhal/microgpt.apl, MIT) but is rewritten for **dzaima/APL**, an open-source interpreter, which lacks the rank operator `⍤`, matrix inner product `+.×`, `A[i;j]` indexing, padding `↑`, and single-line guards. Each gap is filled with the older idiom, and the older idiom is the more readable one for learning.

## Verified

- Forward loss on the first document: `3.36596694758485` = the scalar oracle's `3.3659669475848504` (15 printed digits).
- Five training steps from the seed-42 weights on the oracle's document order: all five losses match the oracle to 15 digits.
- Finite-difference check on the second document (repeated letter, 8 positions): `wte` rows for a repeated letter and for BOS, `wpe` row 7, agree with backprop to 1e-10.
- 1000 steps in ~13 s on one vCPU; last-50 mean loss 2.32; samples at temperature 0.5 look like names.

A differential-test failure found a confounder on the way: with `nsteps.txt = 5`, the learning rate decayed to zero over 5 steps while the oracle's schedule ran over 1000, so steps 1–2 matched and step 3 did not. `nsteps.txt` now holds two numbers: steps to run, schedule length.

## Run

```
# interpreter (Java 21+; the build needs a JDK)
git clone --depth 1 https://github.com/dzaima/APL.git && cd APL && ./build && cd ..
# weights and document order from Python, same seed as microgpt.py
python3 export_weights.py
# train + sample   (nsteps.txt: "<steps to run> <schedule length>", e.g. "5 1000" to check against the oracle, "1000 1000" to train)
export LANG=C.UTF-8 LC_ALL=C.UTF-8
java -Dfile.encoding=UTF-8 -Dstdout.encoding=UTF-8 -jar APL/APL.jar -f microgpt.apl
```

Oracle losses for `5 1000`: `3.3659669475848504 3.4242727838717717 3.177802125458052 3.066355684224198 3.220883089750623`.

## Reading it

| microgpt.py | microgpt_np2.py (fuse=1) | microgpt.apl |
|---|---|---|
| `wte[token_id]` per position | `wte[inp]` | `W.wte gather ids` |
| `linear(x, w)` = `[sum(wi*xi ...) for wo in w]` | `x @ w.T` | `X mm ⍉w` |
| loop over positions with a KV cache | causal mask, all positions at once | `mask n` added to scores |
| `for h in range(n_head): q[hs:hs+head_dim]` | reshape to (B,H,T,d) | `Qh←{Q cols (⍵×HD)+⍳HD}¨⍳NH` — a list of head matrices |
| per-head matmul | batched matmul | `Qh {…}¨ Kh` — `¨` pairs the two lists |
| `softmax` per row | `softmax` over last axis | `↑sm¨↓S` — split rows, apply, stack (this is what `sm⍤1` abbreviates) |
| `x_attn.extend(head_out)` | transpose + reshape | `hcat H` |
| `x = [a+b for ...]` residual | `x + xr` | `Xp + …` |
| autograd builds a graph | autograd builds a graph | none: each backward line mirrors its forward line |

The backward pass is the forward pass read bottom-up. Every `Y←X mm ⍉Wt` becomes two lines: `G.Wt←(⍉dY) mm X` (gradient for the weight) and `dX←dY mm Wt` (gradient passed down). A residual add `X2←Xp+…` becomes `dXp←dX2+…`: addition's backward copies the gradient to both branches. ReLU's backward is `dM0←dMr×M0>0`. Softmax and rmsnorm have one-line backward dfns. The one-hot matrix `ids∘.=⍳VS` does two jobs: pick the target probabilities in the loss, and scatter-add row gradients into `wte`.

## dzaima/APL dialect notes (vs Dyalog)

- `f⍤1` → `{↑f¨↓⍵}`; `+.×⍤2` over heads → keep heads as a list, use `¨`.
- `A+.×B` (matrix) → `mm←{↑(↓⍺)∘.{+/⍺×⍵}↓⍉⍵}` — literally "each row of A dotted with each column of B".
- `A[i;j]` → `↑(↓A)[i]` for rows, `⍉↑(↓⍉A)[j]` for columns; element `j⊃i⊃↓A`.
- `(m,n)↑A` does not pad → catenate a zero block: `A⍪((m-≢A),n)⍴0`.
- Guards: `A:←B` returns; `A:B` executes B and continues (Dyalog's `A:B` returns).
- Namespaces: `⎕NS ⍬`; `'key'(NS⌸)value` to set by name; `'key'⊃NS` to get.
- A dfn local cannot share a name with a global function (`tokens←⍵` failed to parse while a function `tokens` existed).
- Numbers print with 15 significant digits.
