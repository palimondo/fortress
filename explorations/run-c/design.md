# Run C: design notes

microGPT (Karpathy's 243-line, one-layer, four-head character model) in native
Fortress arrays, with the data laid out after Aaron Hsu's "Designing Your Data"
(Functional Conf 2025), following
`explorations/apl/reference/hsu-flat/microgpt_concise.dyalog` line for line.
Interpreter path only; nothing outside `explorations/run-c/` was changed.
The program is `src/MicroGptFlat.fss` with its API `src/MicroGptFlat.fsi`;
the standard of success is `src/MicroGptFlatCheck.fss`, whose outputs at one
and four threads are in `checks/`.

## The layout

| Hsu's tactic | Dyalog line | in the Fortress program |
|---|---|---|
| 2/8 aggregation, views | `P←⊃,/,¨…` / `v←{(⍵⊃SHP)⍴P[(⍵⊃OFF)+⍳⍵⊃CNT]}` | `p: Array[\RR64,ZZ32\]` of 4192 values; `view(p, i)` is a `PView`, a six-line object extending `Matrix[\RR64,r,c\]` whose `get`/`put` address `p[off + i c + j]`. Made in `step` when needed, never stored. |
| 3/5 inverted table, symbol table | `TOKM←↑{(BLK+1)↑BOS,(⎕A⍳⍵),BOS}¨docs ⋄ LEN←1+≢¨docs` | `corpusTokens: Array[\ZZ32,(ZZ32,ZZ32)\]` (2000 × 17, filled with 26 then the interned characters), `corpusLengths: Array[\ZZ32,ZZ32\]`; built once at component initialisation by `loadCorpus`. |
| 1 slicing | rows of every activation are (doc, pos) pairs | `x`, `xp`, `x1`, `q`, `kk`, `vv`, `hc`, `x2` … are (B·16 × 16) matrices; every linear map is one library matrix product. |
| 9 Boolean masks | `MK←¯1E10×~(⍳BLK)∘.≥⍳BLK`; `vm×⍟…`; `×M0>0` | `causalMask` is an additive 16 × 16 matrix; `vm` is an RR64 0/1 vector multiplied into the loss and, as `vm / nv`, scaled into `dL`; ReLU's backward is `hadamard(dX4 f2, positive(m0))`. |
| 10 keys | `wte[ids;]`, `(⍉ids∘.=⍳VS)+.×dX` | `ids`, `tg`, `pos` are `Array[\ZZ32,ZZ32\]` key vectors; `gather(wte, ids)` reads rows, `onehot(ids, vocabSize)^T DOT dX` is the scatter-add. |
| lesson 7 lifetimes | `STEP←{…}` pure | `step(p, b): (RR64, Array[\RR64,ZZ32\])`; no activation survives the call, no graph, no cache. |
| lesson 8 functional state | `ADAM` replaces `P M V` | `adam(p, m, v, g, t, lr)` returns three fresh vectors; the training loop's three variables are the only state. |
| lesson 1 data hiding is a myth | `SHP CNT OFF` | `matName`, `matRows`, `matCols`, `matCount`, `matOffset`, `nParams` are six visible one-line functions. |

The layout matches `experiment/run-c-goldens/goldens.json` `layout`: offsets
0, 432, 688, 1120, 1376, 1632, 1888, 2144, 3168; total 4192; each matrix
row-major.

## The step, line for line

| Dyalog | Fortress (`step`) |
|---|---|
| `R←TOKM[b;] ⋄ ids←,R[;⍳BLK] ⋄ tg←,R[;1+⍳BLK]` | `ids = keys(n, fn r => corpusTokens[b[r DIV blockSize], r MOD blockSize])`, `tg` likewise at `+1` |
| `vm←,LEN[b]∘.>⍳BLK ⋄ nv←+/vm ⋄ pos←N⍴⍳BLK` | `vm = vec(n, fn r => if (r MOD blockSize) < corpusLengths[…] then 1.0 else 0.0)`, `nv = SUM[r <- 0#n] vm[r]`, `pos = keys(n, fn r => r MOD blockSize)` |
| `wte wpe lm wq wk wv wo f1 f2←v¨⍳9` | nine `view(p, i)` |
| `X←wte[ids;]+wpe[pos;]` | `x = gather(wte, ids) + gather(wpe, pos)` |
| `Xp←rmsn⍤1⊢X ⋄ X1←rmsn⍤1⊢Xp` | `xp = rmsnRows(x); x1 = rmsnRows(xp)` |
| `Q K Vv←X1∘(+.×⍉)¨wq wk wv` | `q = x1 (wq^T); kk = x1 (wk^T); vv = x1 (wv^T)` |
| `h←{0 2 1 3⍉(B,BLK,NH,HD)⍴⍵} ⋄ Qh Kh Vh←h¨Q K Vv` | no data moves: `head(q, d, h)` is a `Block` view of rows `16d..`, columns `4h..` |
| `A←sm⍤1⊢MK+⍤2⊢(Qh+.×⍤2⊢⍉⍤2⊢Kh)÷HD*0.5` | `for d <- 0#bsz, h <- 0#nHead do … assignInto(ah, smRows((qh (kh^T)) / (SQRT (1.0 headDim)) + causalMask))` |
| `Hc←(N,NE)⍴0 2 1 3⍉A+.×⍤2⊢Vh` | `assignInto(head(hc, d, h), ah vh)` in the same loop |
| `X2←Xp+Hc+.×⍉wo ⋄ X3←rmsn⍤1⊢X2 ⋄ M0←X3+.×⍉f1 ⋄ Mr←0⌈M0 ⋄ X4←X2+Mr+.×⍉f2` | `x2 = xp + hc (wo^T)`, `x3 = rmsnRows(x2); m0 = x3 (f1^T); mr = relu(m0)`, `x4 = x2 + mr (f2^T)` |
| `Pr←sm⍤1⊢X4+.×⍉lm ⋄ loss←-(+/vm×⍟tg⌷⍤0 1⊢Pr)÷nv` | `pr = smRows(x4 (lm^T))`, `loss = -(SUM[r <- 0#n] vm[r] (log(pr[r, tg[r]]))) / nv` |
| `dL←(vm÷nv)×⍤0 1⊢Pr-tg∘.=⍳VS ⋄ gLM←(⍉dL)+.×X4 ⋄ dX4←dL+.×lm` | `dL = scaleRows(vm / nv, pr - onehot(tg, vocabSize))`, `assignInto(view(g, 2), (dL^T) x4); dX4 = dL lm` |
| `gF2←(⍉dX4)+.×Mr ⋄ dM0←(dX4+.×f2)×M0>0 ⋄ gF1←(⍉dM0)+.×X3 ⋄ dX3←dM0+.×f1` | `assignInto(view(g, 8), (dX4^T) mr); dM0 = hadamard(dX4 f2, positive(m0))`, `assignInto(view(g, 7), (dM0^T) x3); dX3 = dM0 f1` |
| `dX2←dX4+dX3(rmsn_b⍤1)X2 ⋄ gWO←(⍉dX2)+.×Hc ⋄ dH←h dX2+.×wo` | `dX2 = dX4 + rmsnRowsB(dX3, x2)`, `assignInto(view(g, 6), (dX2^T) hc); dH = dX2 wo` |
| `dVh←(⍉⍤2⊢A)+.×⍤2⊢dH ⋄ dS←(A(sm_b⍤1)dH+.×⍤2⊢⍉⍤2⊢Vh)÷HD*0.5` | in the second `for d, h` loop: `assignInto(head(dV, d, h), (ah^T) dh)`, `dS = smRowsB(ah, dh (vh^T)) / (SQRT (1.0 headDim))` |
| `dQh←dS+.×⍤2⊢Kh ⋄ dKh←(⍉⍤2⊢dS)+.×⍤2⊢Qh ⋄ u←… ⋄ dQ dK dV←u¨dQh dKh dVh` | `assignInto(head(dQ, d, h), dS kh)`, `assignInto(head(dK, d, h), (dS^T) qh)` — the `u` (unheads) is the write through the view |
| `gWQ gWK gWV←{(⍉⍵)+.×X1}¨dQ dK dV ⋄ dX1←(dQ+.×wq)+(dK+.×wk)+dV+.×wv` | three `assignInto(view(g, i), (dQ^T) x1)`, `dX1 = dQ wq + dK wk + dV wv` |
| `dXp←dX2+dX1(rmsn_b⍤1)Xp ⋄ dX←dXp(rmsn_b⍤1)X` | `dXp = dX2 + rmsnRowsB(dX1, xp); dX = rmsnRowsB(dXp, x)` |
| `gWTE←(⍉ids∘.=⍳VS)+.×dX ⋄ gWPE←(⍉pos∘.=⍳BLK)+.×dX` | `ohIds = onehot(ids, vocabSize); …; assignInto(view(g, 0), (ohIds^T) dX)`; same for `pos` with width 16 |
| `loss(⊃,/,¨gWTE gWPE gLM gWQ gWK gWV gWO gF1 gF2)` | `(loss, g)`: the nine gradient matrices were written into the views of `g`, which is the flat gradient in the layout of `p` |
| `ADAM` | `m' = beta1 m + (1 - beta1) g`; `v' = beta2 v + (1 - beta2) (g.pmul(g))`; `p' = p - (lr (m' / (1 - beta1^t))) / ((SQRT (v' / (1 - beta2^t))) + epsAdam)`, in numpy's association |

Departures from the Dyalog, and why:

- `⍉` on the weights is the postfix `^T` (`m.t()`, the library's zero-copy
  `TransposedMatrix`), and `+.×` is the library's juxtaposition product. A
  call result cannot be transposed in place (`onehot(ids, vocabSize)^T` is the
  static error of ledger row 4), so the two one-hots are bound first.
- `⍤2` and `0 2 1 3⍉` (per-head cells) are a loop over (document, head) with
  block views; see the rank-4 decision below.
- `⊃,/,¨` (ravel and catenate the gradients) is nine writes through views of
  the gradient vector: the layout is the same table that reads the weights.
- `tg⌷⍤0 1⊢Pr` is a subscript inside the loss sum; `tg∘.=⍳VS` is `onehot`.
- The Dyalog's `h` makes an array; here `head` and `headCell` make views, so
  `Qh Kh Vh` never exist as values.

## The rank-4 decision

Batch × heads × positions × head-dim is handled by looping over documents and
heads with `Matrix` views of the (doc·pos × 16) activations, not by an
`Array4` object. `Block[\br,bc,r,c\](base, r0, c0)` is six lines and gives
`head(q, d, h)`, a 16 × 4 `Matrix` over rows `16d..16d+15` and columns
`4h..4h+3` of `q`; writing through the same kind of view into `hc`, `dQ`,
`dK`, `dV` is the inverse permutation for free. The B·NH attention matrices
live in one (B·NH·16 × 16) matrix `att` whose cells are `headCell(att, d, h)`.

Reasons:

1. The shipped library stops at rank 3 and has no batched product: an
   `Array4` would need its own `+.×⍤2`, `⍉⍤2` and `sm⍤1` written as loops over
   the leading two axes anyway, so it would buy notation and not reuse.
2. The Dyalog's `0 2 1 3⍉` is a view in Hsu's sense (tactic 8); a block view
   is exactly that, and it moves no data in either direction.
3. Each (document, head) step is two 16 × 4 · 4 × 16 products and a softmax
   on a 16 × 16 matrix through the same `rmsnRows`/`smRows` functions the rest
   of the program uses; nothing is special-cased.
4. The loop is a plain parallel `for` over two generators; each iteration
   writes a disjoint block, so the four-thread run needs no atomics.

The cost is that the attention lines are five statements in a loop rather
than two array expressions.

## What the language gave, what had to be built

Given by the library, used unchanged: `array[\RR64\](n)` and `(r, c)`
runtime-sized arrays that dispatch as `Vector`/`Matrix`; the matrix product in
both spellings; `.t()`; `Matrix + -`; `Vector + - pmul` and scalar scaling;
`SUM` and `BIG MAX` with generator clauses; `exp`, `log`, `SQRT`, `MAX`;
`DIV`/`MOD`; the `reflect`/`N[\n\]` idiom that turns a run-time size into a
`nat`; `FileReadStream.readLine`; `Char.codePoint`; tuple binding and tuple
assignment; parallel `for` over two generators; a component that exports both
`Executable` and its own API.

Built in the component (all user-level): `PView` and `Block` (six lines
each) with their `reflect` wrappers; the postfix `^T`; elementwise `/`, `+`
and `SQRT` on vectors and `/` on a matrix by a scalar (Adam's expressions
and the score scaling); `gather`, `onehot`, `scaleRows`, `hadamard`, `relu`,
`positive`; `rmsnRows`, `rmsnRowsB`, `smRows`, `smRowsB` (row-wise maps: a
per-row vector then a `mat` fill); `assignInto`; a float parser (the
library's `strToFloat` overflows a 32-bit integer on a 17-digit mantissa and
mishandles a sign) and a whitespace tokenizer (`String.split()` is the rope's
structural subdivision, not a tokenizer); a two-pass line loader for the
corpus.

## Numerics

The weights are parsed by accumulating the mantissa's digits in an `RR64`
and dividing by an exact power of ten; the check's first line measures the
loaded vector against the goldens' `P0` and finds no difference at all over
the 4192 values, and the corpus rows for documents 0..15 match exactly.
The reductions are the library's parallel `SUM`, so summation order differs
from numpy's; the measured differences at one thread (`checks/threads1.txt`)
are:

| check | measured | bound |
|---|---|---|
| batch 1, five losses | 4.4e-16, 0, 0, 0, 0 | 1e-12 |
| step 0 gradient, max over 4192 | 1.1e-16 | 1e-12 |
| parameters after the first Adam step, max over 4192 | 8.3e-17 | 1e-12 |
| zero gradient entries | 464, as recorded | exact |
| batch 4 loss vs golden | 0 | 1e-12 |
| batch 4 loss vs token-weighted mean of the four single losses | 0 | 1e-12 |
| finite differences, document 0, worst of eleven | 3.1e-10 | 1e-8 |
| finite differences, batch of four, worst of eleven | 3.68e-10 (the reference's worst is the same value) | 1e-8 |

All arithmetic is `RR64`; care was needed that every value written into an
`RR64` array is a float (`1.0 headDim`, `1.0` and `0.0` in the masks), since
the walk path does not enforce a declared return type.

## Cost

One thread: 7.8 to 8 s per batch-1 step (forward and backward; 14 s for
the first, which pays the interpreter's warm-up), 26.6 s per batch-4 step;
the whole check, 55 steps in all, 855 s. Four threads: 2.6 to 3.0 s per
batch-1 step, 8.6 s per batch-4 step, 353 s for the check, with every
measured value identical to the one-thread run to the last digit. The
library's product
runs at roughly 24 µs per multiply-add (`probes/p05_mmtime.fss`), and a
hand-written loop is no faster, so the step time is the interpreter's
per-operation cost times the 190K (batch 1) to 750K (batch 4) multiply-adds
of the model. No speed work was done, as the brief asks.

## Blinding

Nothing on the brief's excluded list was opened, and no history was read.
Two things came close and are recorded: `CLAUDE.md` and the gap ledger name
excluded paths (`microgpt-port.md`, `compiled-path-gaps.md`, `run-b/probes/…`)
as citations, which were not followed; and `explorations/apl/README.md`
(rung 6's line in its table) mentions that the APL rungs had exercised "the
program's attention score" and the one-hot scatter-add — a sentence about
the APL work, not the prior Fortress ports. The Hsu handover's tactics
table and the two verified references were the design inputs, as the brief
lists.
