<!-- Written by the coordinating session on 2026-09-15 after Pavol's decision to redo rung 4: strip the universal dfn mechanism (the frame stack), keep only the subset the microGPT program needs, and make the expansion strongly typed, so that the translation of the flat-style program is C4's Fortress function for function and costs what C4 costs at both pool sizes. Facts cite the ledger (explorations/fortress-gap-ledger.md) and the microGPT rung (../microgpt/). -->

# The focused base: the microGPT subset of APL over C4's vocabulary

## Why

The ladder's base (`../base/`) was built for the book: every APL function value is a zero-parameter lambda over one global frame stack, because a dfn's `⍵` cannot be a typed lambda parameter (a template-written binder is renamed by hygiene and never meets a name written by another rule, ledger row 204; and a nested lambda re-declaring a name is refused, row 245's probes u01–u03). That bought nested dfns, dops-in-waiting and glyphs as values, and it cost three things the microGPT program pays for and never uses: every general form is untyped (`() -> Any` in, `Object` out), the frame stack is unsafe under the language's parallel evaluation (row 265), and the general route had to be sequential `while` loops, which is the whole 1.49× at pool size 4 (`../microgpt/REPORT.md`, cost).

The program needs none of the universal mechanism. Its four vector functions are top-level; its two inline dfns are the book's own tacit spelling in the Dyalog source, `X1∘(+.×⍉)¨wq wk wv`, which the microGPT rung had to rewrite the other way; nothing nests. So the focused base drops dfn bodies from the subset and makes every rule a direct expansion to a typed entry. Where the universal base asked "what is this function value", the focused base asks "what host spelling does this glyph pattern have", and the answer is always in C4's vocabulary.

Pavol's goal, restated so the design is judged by it: the readable expression of the microGPT algorithm, with Iverson's notation for the data flow and Fortress's mathematical notation for the pieces. The translation cannot produce better Fortress than the entries it expands to, so the diamond, if there is one, is the pair: the 25-line Dyalog program and C4's vocabulary. This base makes the vocabulary the whole backend, one typed entry per glyph pattern, so that polishing the vocabulary polishes the expansion.

## The one principle

No function value crosses a rule boundary untyped. There is no `aplCall`, no frame stack, no `Any`-typed reads, no `Object` results. A function appears in APL text only as a name (`rmsn⍤1⊢X`, `h¨Q K Vv`), and the name resolves at the use site to a typed host declaration (row 270), so that `rows(rmsn, X)` picks its overload by the arrow type (row 171). A derived function built from glyphs (`X1∘(+.×⍉)`) is expanded by one rule that writes its whole body, so hygiene's renaming is consistent within it (probe y02, `../probes-4b/`). Rank stays in the type as before: an APL vector is a `Vector`, a matrix a `Matrix`, a rank-3 array an `Array3`; element types follow the host, integers `ZZ32` and reals `RR64`, so the corpus's keys are never converted.

## The component

`MicroGptApl.fss` here, the same api as C4's and as the microGPT rung's, so `../microgpt/MicroGptAplCheck.fss` runs unchanged with this directory first on the source path. Host declarations, C4's lines verbatim where the table says so: the two hyperparameter lines (C4:17–18, `ZZ32` and `RR64` as C4 has them), the four vector functions `rmsn sm rmsn_b sm_b` (C4:27–34, typed), `mask` as APL text, the layout functions and `view` (C4:37–45), the corpus (C4:48) with `Tokm = corpus.tokm` and `Len = corpus.len` as they are, `ZZ32` arrays, `step` with one APL block, `adam` with one, `learningRate` with one, `run()` (C4:85–97). The adapters `h u vw` become ordinary typed local functions as in C4:54–55 (`h(m: …) = heads(m, blockSize, nHead, headDim)`), because a name in APL text is a call of a typed host function now, not a push.

## Line by line

The Dyalog line, the APL text in the component, the expansion. Every expansion is C4's line; "glue" names an entry of `AplMg`, the small library beside the grammar for the glyph patterns C4's vocabulary does not spell (ravel, iota, column slice, outer comparison, cyclic reshape, power, sum and max reductions, flatten).

| Dyalog | APL text here | expansion |
|---|---|---|
| L6 hyperparameters | host, C4:17–18 | — |
| L7 `rmsn←{…}`, `sm←{…}` | host, C4:27–28 | — (a dfn body is out of scope; the function is Fortress) |
| L7 `MK←¯1E10×~(⍳BLK)∘.≥⍳BLK` | `mask = apl⦇ (-10*10)×~(⍳Blk)∘.≥⍳Blk ⦈` | `(-(10.0^10)) (outerGe(iota(Blk), iota(Blk)))` with `~` folded into `outerLt`, glue; C4:29 builds the same matrix by a fill |
| L8 `rmsn_b`, `sm_b` | host, C4:30–34 | — |
| L9–L11 layout, `v` | host, C4:37–45 | — |
| L12 corpus | host, C4:48; `Tokm`, `Len` the corpus's own `ZZ32` arrays | — |
| L13 `b←⍵ ⋄ B←≢b ⋄ N←B×BLK` | `B←≢b ⋄ N←B×Blk` | `\|b\|`, `B blockSize` |
| L13 `R←TOKM[b;] ⋄ ids←,R[;⍳BLK] ⋄ tg←,R[;1+⍳BLK]` | as written with `Blk` | `gather(Tokm, b)` (C4's `gather` is generic in the element type), `ravel(cols(R, iota(Blk)))`, `ravel(cols(R, 1 + iota(Blk)))`, glue; C4:52's `corpus.tokens(b, 0)` and `(b, 1)` compute the same vectors |
| L13 `vm←,LEN[b]∘.>⍳BLK ⋄ nv←+/vm ⋄ pos←N⍴⍳BLK` | as written | `ravel(outerGt(gather(Len, b), iota(Blk)))` (RR64 0/1), `SUM vm`, `cycle(N, iota(Blk))`, glue; C4:52 |
| L14 `wte wpe lm wq wk wv wo f1 f2←v¨⍳9` | `…←vw¨⍳9` | `(vw(0), vw(1), …, vw(8))`: the rule `n:AplFnName ¨ ⍳ 9` is direct, nine typed calls, a tuple; C4:53 |
| L15 `X←wte[ids;]+wpe[pos;] ⋄ Xp←rmsn⍤1⊢X ⋄ X1←rmsn⍤1⊢Xp` | as written | `gather(wte, ids) + gather(wpe, pos)`, `rows(rmsn, X)`, `rows(rmsn, Xp)`; C4:57 |
| L16 `Q K Vv←X1∘(+.×⍉)¨wq wk wv` | **as written, the Dyalog's own tacit spelling** | `(X1 transpose(wq), X1 transpose(wk), X1 transpose(wv))`: one rule for the pattern `l ∘ ( + . × ⍉ ) ¨ strand`; C4:58 |
| L16 `h←{…} ⋄ Qh Kh Vh←h¨Q K Vv` | `Qh Kh Vh←h¨Q K Vv`, `h` a typed host local | `(h(Q), h(K), h(Vv))`; C4:54, 58 |
| L17 `A←sm⍤1⊢MK+⍤2⊢(Qh+.×⍤2⊢⍉⍤2⊢Kh)÷HD*0.5` | as written with `Mk Hd` | `rows(sm, mask + (Qh transpose(Kh)) / SQRT(1.0 Hd))`: `+.×⍤2⊢` is the batched juxtaposition, `⍉⍤2⊢` is `transpose`, `m+⍤2⊢t` is C4's `opr +(Matrix, Array3)`, `x÷s` is `/`, `s*0.5` is `SQRT`; C4:59 |
| L17 `Hc←(N,NE)⍴0 2 1 3⍉A+.×⍤2⊢Vh` | `Hc←u A+.×⍤2⊢Vh` | `u(A Vh)`; C4:55, 59 |
| L18 | as written | C4:60: `Xp + Hc transpose(wo)`, `rows(rmsn, X2)`, `X3 transpose(f1)`, `0.0 MAX M0`, `X2 + Mr transpose(f2)` |
| L19 | as written | C4:61: `rows(sm, X4 transpose(lm))`, `-(vm DOT log(pick(Pr, tg))) / nv` (`⌷⍤0 1⊢` is `pick`, `+/` of a product is `DOT`, folded by one rule for `+/l×r`) |
| L20 | as written | C4:63: `diag(vm / nv) (Pr - onehot(tg, Vs))` (`×⍤0 1⊢` is `diag`, `∘.=⍳` is `onehot`), `transpose(dL) X4`, `dL lm` |
| L21 | as written | C4:64 |
| L22 `dX2←dX4+dX3(rmsn_b⍤1)X2 ⋄ gWO←(⍉dX2)+.×Hc ⋄ dH←h dX2+.×wo` | as written | `dX4 + rows(rmsn_b, dX3, X2)`, `transpose(dX2) Hc`, `h(dX2 wo)`; C4:65 |
| L23 | as written | C4:66: `transpose(A) dH`, `rows(sm_b, A, dH transpose(Vh)) / SQRT(1.0 Hd)` |
| L24 `… ⋄ u←{…} ⋄ dQ dK dV←u¨dQh dKh dVh` | as written without `u←` | C4:67 |
| L25 `gWQ gWK gWV←{(⍉⍵)+.×X1}¨dQ dK dV` | `gWQ gWK gWV←X1∘(+.×⍨⍉)¨dQ dK dV`, a tacit spelling (`X1 (+.×⍨⍉) w` is `(⍉w)+.×X1`) | `(transpose(dQ) X1, …)`, one rule for the pattern; C4:68 |
| L25 `dX1←(dQ+.×wq)+(dK+.×wk)+dV+.×wv` | as written | C4:68 |
| L26–L27 | as written | C4:69–70 |
| L28 `loss(⊃,/,¨gWTE … gF2)` | `gr←⊃,/,¨gWTE gWPE gLM gWQ gWK gWV gWO gF1 gF2 ⋄ loss gr` | `flat(gWTE, …, gF2)` (C4's varargs `flat`), then the tuple; C4:71 |
| L29 `ADAM` | `adam(p, m, v, gr, t, lr) = apl⦇ Mn←(B1×M)+(1-B1)×gr ⋄ … ⋄ Pn Mn Vn ⦈` with `t` converted once in host code | C4:77–80: `s×v` with a scalar left is the host's juxtaposition `B1 M`, `v*2` is `v × v`, `s*t` is `s^t`, `÷` is `/`, `+`, `-` as C4 |
| L30 loop | host, C4:82, 85–97 | — |

Two lines of the microGPT rung's text change: L16 goes back to the Dyalog's tacit spelling, and L25 takes a tacit spelling instead of a dfn. Everything else is the rung's text, minus the conversions, because keys are `ZZ32` throughout.

## What the grammar contains

- Statements and bindings as rung 2: `⋄`, the line-break rules, `n:Id ← e ⋄ rest` as `(fn n => rest)(e)`, the two-, three- and nine-name destructuring, the name strands as tuples. The closed name sets: array names (about 60), strand names (about 26), function names (`rmsn sm rmsn_b sm_b h u vw`).
- Arithmetic and comparison glyphs on scalars, vectors, matrices and rank 3 as direct host operators (`+ - × ÷ * ⌈ > ≥ ~ ⍟`), each rule choosing the host spelling: `×` between two arrays is C4's `opr ×`, between a scalar and an array the host's juxtaposition; `÷` is `/`; `*` with `0.5` is `SQRT`, otherwise `^`; `⍟` is `log`; `0⌈m` is `0.0 MAX m`; `m>0` is C4's `opr >`.
- The structural glyphs as glue: `⍳ ≢ , ⍉` (`transpose` from C4), bracket indexing `m[v;]` (`gather`) and `m[;v]` (`cols`), `n⍴v` with a name (`cycle`), `v[i]` with a vector index (`gather` on a vector).
- The operator patterns, each one rule to one typed entry: `f⍤1⊢x` and `x(f⍤1)y` to `rows`; `l+.×⍤2⊢r` to the batched juxtaposition; `⍉⍤2⊢t` to `transpose`; `m+⍤2⊢t` to `+`; `l×⍤0 1⊢m` to `diag(l) m`; `l⌷⍤0 1⊢m` to `pick(m, l)`; `l∘.=⍳n` to `onehot(l, n)`; `l∘.>r` and `l∘.≥r` to `outerGt`/`outerGe`; `+/v` to `SUM`, `⌈/v` to `BIG MAX`, `+/l×r` to `DOT`; `l+.×r` on two matrices to juxtaposition; `f¨strand` to a tuple of calls; `f¨⍳9` to nine calls; `l∘(+.×⍉)¨strand` and `l∘(+.×⍨⍉)¨strand` to tuples of products; `⊃,/,¨strand` to `flat`; `⊢` to its right operand.
- Nothing else. No `{ }`, no `⍺ ⍵ ∇`, no guards, no `¨` with a dfn, no general `f/`, `∘.f`, `f.g`, no `⍣`, no scans, no glyph as a value.

What this costs against the universal base: the grammar shrinks to the rules above (the base's is 899 lines, about half of it name lines, which stay); the library shrinks to the glue, since the vocabulary is C4's `FlatArrays` imported unchanged; the general machinery (frame stack, `aplCall`, `aplRank*`, `aplEach*`, `aplAsm*`, the glyph-value tables) is gone. The out-of-scope list is the whole of rungs 4 and 5's subject and half of 6's; rungs 1–6 stay as they are, on their own base, as the record of the ladder.

## Gates

`../microgpt/MicroGptAplCheck.fss` unchanged: 40 of 40 at pool sizes 1 and 4 with identical values; the cost measured against C4's re-run on the same host (`run-c4/checks/rerun-post-restart/`: 528 s and 263 s), with the expectation that both ratios are 1.0 within noise, since the expansion is C4's code; the expansion of the `step` block written out once by hand in the report's correspondence table and checked against C4:51–72 line for line. New gap rows only if the grammar meets something rungs 1–6 did not.

## Worker deliverables, in order

1. Probes (`../probes-4b/`, y01 and y02 are out already; add y03 for the tacit patterns `l∘(+.×⍉)¨a b c` and `l∘(+.×⍨⍉)¨a b c` as grammar rules expanding to tuples of products over `FlatArrays`, and y04 for the folded `+/l×r` to `DOT` beside the plain `+/` to `SUM`, checking that the longer rule wins by order).
2. `AplMgSyntax.fsi` and `AplMg.fss/.fsi` here, each rule commented with the Dyalog line it serves.
3. `MicroGptApl.fss/.fsi` here, the model run (five losses), the check smoke; the two full check runs stay with the coordinator under `Monitor`.
4. `REPORT.md`: the correspondence table with the expansion column filled in from the rules, the departures (the two tacit spellings), the cost row, the gap rows if any.
