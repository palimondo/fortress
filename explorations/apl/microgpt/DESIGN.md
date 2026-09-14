<!-- Written by the coordinating session on 2026-09-14 as closing step 1 of the APL side quest (explorations/microgpt-run-c-handover.md). The inventory it was written from is INVENTORY.md beside it. The target Fortress is Run C4 (explorations/run-c4/design.md, section "What C4 settles for the APL round"). -->

# The microGPT rung: design

The program is `explorations/apl/reference/hsu-flat/microgpt_concise.dyalog`, 25 code lines (L6–L30), unverified in Dyalog, derived line for line from the dzaima-verified `microgpt_flat.apl`. The target is C4: `explorations/run-c4/src/MicroGptFlat.fss` (the model, 71 code lines), with C4's vocabulary `FlatArrays` and data `FlatData` imported unchanged. The deliverable is `MicroGptApl.fss` here, a Fortress component whose APL text expands, through the base of rungs 1–6, into Fortress that reads as C4's model, and which passes C4's 40 checks against the same goldens at both pool sizes.

The rule for every line: keep the Dyalog text wherever the base already has the glyph rule, add a rule to the base only where the program needs one and rungs 1–6 did not, and write the line as host Fortress only where the construct is outside the sub-language by decision (characters, nested arrays, rank 4, system functions). Every departure from the Dyalog text is named below and goes into the report's correspondence table.

## The shape of the component

The expander produces an expression, never a declaration: `apl⦇ … ⦈` is an `Expr` (AplSyntax.fsi:44–45), and a binding inside it is a lambda parameter whose scope is the rest of the block (AplSyntax.fsi:70–76). So the Dyalog program's top-level statements (L6–L12, L29, L30) become Fortress top-level declarations, each with an APL block or a host expression as its body, and the two dfns `STEP` and `ADAM` become the two functions C4's check calls, `step` and `adam`, each with one APL block as its body. The api is C4's api (`run-c4/src/MicroGptFlat.fsi`) with the component name changed, so the check runs unchanged except for its import line.

Names inside a block resolve as free Fortress identifiers at the use site (gap row 70), so a host top-level binding, a host parameter and a host local are all readable from APL text under their own spelling, provided the spelling is in the grammar's closed name set. That is the whole interface between the two languages: host values enter a block by being in scope under an APL name, or through `⍎( … )`; a block's value leaves as the value of its last statement.

A word of two or more capitals is a Fortress operator and cannot be a name (row 78), so the program's capital names are re-spelled once, as rung 6 did for `Hd Vs`: `Ne Blk Nh Hd Vs Bos Eps Lr0 B1 B2 Epsa Mk Tokm Len`, and the dfn names `STEP ADAM` are the host functions `step adam`. Three further renamings avoid collisions with the base's existing name sets, which must stay disjoint (AplName, AplFnName, AplTName): the view function `v` becomes `vw` because `v` is an array name since rung 3, the gradient `g` becomes `gr` because `g` is a function name since rung 4, and every other name the program reads is added to the sets as one grammar line each. The count is about 60 array names, 30 strand names and 6 function names; the exact lists are in the worker section.

## Line by line

The table gives the Dyalog line, how it is written in `MicroGptApl.fss`, what it expands to (C4's line in `MicroGptFlat.fss`), and whether the rule is direct (typed library entry, no frame push) or general (through `aplCall`, one frame push per cell). "host" means the line is host Fortress, and why.

| Dyalog | in MicroGptApl.fss | expands to / C4 line | rule |
|---|---|---|---|
| L6 `⎕IO←0` | nothing: the base counts from 0 | — | — |
| L6 `NE BLK NH HD VS BOS←16 16 4 4 27 26` | host: `(Ne, Blk, Nh, Hd, Vs, Bos) = (16.0, 16.0, 4.0, 4.0, 27.0, 26.0)` | the tuple binding, C4:17 | host: a top-level statement; the strand assignment is what the tuple binding expands to (rung 5), and top level has no rest to bind over |
| L6 `EPS LR0 B1 B2 EPSA←1E¯5 0.01 0.85 0.99 1E¯8` | host: `(Eps, Lr0, B1, B2, Epsa) = (10.0^(-5), 0.01, 0.85, 0.99, 10.0^(-8))` | C4:18 | host, as above; the numerals are Fortress literals (`1E¯5` has no literal form) |
| L7 `rmsn←{⍵÷(EPS+(+/⍵*2)÷≢⍵)*0.5}` | `rmsn = apl⦇ {⍵÷(Eps+(+/⍵*2)÷≢⍵)*0.5} ⦈` | a zero-parameter lambda over the frame stack; C4:27 | dfn (rung 4); the body's glyphs direct |
| L7 `sm←{e÷+/e←*⍵-⌈/⍵}` | `sm = apl⦇ {e←*⍵-⌈/⍵ ⋄ e÷+/e} ⦈` | C4:28 | dfn; the inline binding written as two statements (rung 4 adaptation 5) |
| L7 `MK←¯1E10×~(⍳BLK)∘.≥⍳BLK` | `Mk = apl⦇ (¯10*10)×~(⍳Blk)∘.≥⍳Blk ⦈` | C4:29 `mask` | direct (rung 6 Z7); `¯1E10` written as a power |
| L8 `rmsn_b←{r←(EPS+(+/⍵*2)÷≢⍵)*0.5 ⋄ y←⍵÷r ⋄ (⍺-y×(+/y×⍺)÷≢y)÷r}` | `rmsn_b = apl⦇ {r←(Eps+(+/⍵*2)÷≢⍵)*0.5 ⋄ y←⍵÷r ⋄ (⍺-y×(+/y×⍺)÷≢y)÷r} ⦈` | C4:30–33 | dfn, dyadic; glyphs direct |
| L8 `sm_b←{⍺×⍵-+/⍺×⍵}` | `sm_b = apl⦇ {⍺×⍵-+/⍺×⍵} ⦈` | C4:34 | dfn, dyadic |
| L9 `SHP←(VS NE)(BLK NE)…` `CNT←×/¨SHP` `OFF←+\0,¯1↓CNT` | host: C4's `matName matShape matCount matOffset nParams`, C4:37–44 verbatim | — | host: a vector of pairs is a nested array (rung 8, not built); C4's layout functions are its replacement |
| L10 `P←⊃,/,¨{(⍵⊃SHP)⍴⎕NREAD ⍵}¨⍳9 ⋄ M←V←P×0` | host, in `run()`: `loadParams` and `zeros`, C4:88–90 | — | host: `⎕NREAD` is a system function; the check loads through `loadParams` too |
| L11 `v←{(⍵⊃SHP)⍴P[(⍵⊃OFF)+⍳⍵⊃CNT]}` | host adapter inside `step`: `vw = fn (): Any => view(P, aplInt(aplOmega()))` | C4:45 `view(p, i)` | host: `⊃` on the nested `SHP`; the adapter has the dfn's calling shape (a zero-parameter lambda reading `⍵`) so that `vw¨⍳9` calls it |
| L12 `TOKM←↑{(BLK+1)↑BOS,(⎕A⍳⍵),BOS}¨docs ⋄ LEN←1+≢¨docs` | host: `corpus = loadCorpus(…)` (C4:48), then `Tokm = aplOfInt(corpus.tokm)`, `Len = aplOfInt(corpus.len)` | C4:48 | host: characters and `⎕A` are outside the sub-language; the corpus object is C4's replacement, and its integer arrays are converted once to the base's `RR64` arrays |
| L13 `b←⍵ ⋄ B←≢b ⋄ N←B×BLK` | `step(P, b)` is the host function; block opens `bb←⍎(aplOfInt(b)) ⋄ B←≢bb ⋄ N←B×Blk` | — | direct; the keys arrive as `ZZ32` (the check's type) and are converted once |
| L13 `R←TOKM[b;] ⋄ ids←,R[;⍳BLK] ⋄ tg←,R[;1+⍳BLK]` | `R←Tokm[bb;] ⋄ ids←,R[;⍳Blk] ⋄ tg←,R[;1+⍳Blk]` | C4:52 `corpus.tokens(b, 0)`, `corpus.tokens(b, 1)` | direct (rung 2 bracket indexing with vector indices, rung 3 ravel) |
| L13 `vm←,LEN[b]∘.>⍳BLK ⋄ nv←+/vm ⋄ pos←N⍴⍳BLK` | `vm←,Len[bb]∘.>⍳Blk ⋄ nv←+/vm ⋄ pos←N⍴⍳Blk` | C4:52 `corpus.valid(b)`, `SUM vm`, `corpus.positions(b)` | direct; `N⍴` with a name on the left is to be confirmed by the inventory (the reshape rules read the shape off numerals) |
| L14 `wte wpe lm wq wk wv wo f1 f2←v¨⍳9` | `wte wpe lm wq wk wv wo f1 f2←vw¨⍳9` | C4:53, the strand of nine views | new: a nine-name destructuring rule, and `¨` over a vector whose cells are matrices of unequal shape yields a tuple (below) |
| L15 `X←wte[ids;]+wpe[pos;] ⋄ Xp←rmsn⍤1⊢X ⋄ X1←rmsn⍤1⊢Xp` | as written | C4:57 `gather`, `rows(rmsn, x)` | direct indexing; `⍤1` general, one push per row |
| L16 `Q K Vv←X1∘(+.×⍉)¨wq wk wv` | `Q K Vv←{X1+.×⍉⍵}¨wq wk wv` | C4:58 `(x1 wq^T, …)` | the program's one tacit form (rung 7, skipped) rewritten as a dfn under `¨` over a strand (rung 5); `+.×` and `⍉` direct inside it |
| L16 `h←{0 2 1 3⍉(B,BLK,NH,HD)⍴⍵} ⋄ Qh Kh Vh←h¨Q K Vv` | host adapter `h = fn (): Any => heads(aplOmega(), aplInt(Blk), aplInt(Nh), aplInt(Hd))` before the block; `Qh Kh Vh←h¨Q K Vv` | C4:54, 58 `heads` | host: rank 4 is not in the base and C4's rank-3 views are the target form by decision; `¨` over a strand direct |
| L17 `A←sm⍤1⊢MK+⍤2⊢(Qh+.×⍤2⊢⍉⍤2⊢Kh)÷HD*0.5` | as written with `Mk Hd` | C4:59 `rows(sm, mask + (qh kh^T) / SQRT (1.0 headDim))` | `+.×⍤2` general with a direct product per plane pair (rung 6 Z2–Z4); `⍉⍤2` general per plane; `Mk+⍤2` general, matrix onto planes; `sm⍤1` general per row |
| L17 `Hc←(N,NE)⍴0 2 1 3⍉A+.×⍤2⊢Vh` | `Hc←u A+.×⍤2⊢Vh` with the adapter `u = fn (): Any => unheads(aplOmega(), aplInt(Nh))` | C4:59 `u(a vh)` | host adapter for the rank-4 transpose, as `h`; the Dyalog inlines `u` here and defines it on L24 |
| L18 | as written | C4:60 | direct: `+.×`, `⍉`, `0⌈`, `+` on matrices |
| L19 `Pr←sm⍤1⊢X4+.×⍉lm ⋄ loss←-(+/vm×⍟tg⌷⍤0 1⊢Pr)÷nv` | as written | C4:61 `pick`, `vm DOT log(…)` | `⌷⍤0 1` general per row (rung 6 Z9); the rest direct |
| L20 `dL←(vm÷nv)×⍤0 1⊢Pr-tg∘.=⍳VS ⋄ gLM←(⍉dL)+.×X4 ⋄ dX4←dL+.×lm` | as written with `Vs` | C4:63 `diag(vm / nv) (pr - onehot(tg, vocabSize))` | `×⍤0 1` general per row (Z8); `∘.=` direct (Z5) |
| L21 | as written | C4:64 | direct |
| L22 `dX2←dX4+dX3(rmsn_b⍤1)X2 ⋄ gWO←(⍉dX2)+.×Hc ⋄ dH←h dX2+.×wo` | as written | C4:65 `rows(rmsn_b, dX3, x2)`, `h(dX2 wo)` | dyadic `⍤1` general per row pair (rung 4); `h` the adapter |
| L23 `dVh←(⍉⍤2⊢A)+.×⍤2⊢dH ⋄ dS←(A(sm_b⍤1)dH+.×⍤2⊢⍉⍤2⊢Vh)÷HD*0.5` | as written | C4:66 `a^T dh`, `rows(sm_b, a, dh vh^T)` | dyadic `⍤1` with two rank-3 arguments: to be confirmed by the inventory; if the base pairs rows only across two matrices, one library overload is added |
| L24 `dQh←dS+.×⍤2⊢Kh ⋄ dKh←(⍉⍤2⊢dS)+.×⍤2⊢Qh ⋄ u←{…} ⋄ dQ dK dV←u¨dQh dKh dVh` | as written without the `u←` (the adapter is defined before the block) | C4:67 | general per plane; `¨` over a strand |
| L25 `gWQ gWK gWV←{(⍉⍵)+.×X1}¨dQ dK dV ⋄ dX1←(dQ+.×wq)+(dK+.×wk)+dV+.×wv` | as written | C4:68 | `¨` over a strand with a dfn (rung 5); direct inside |
| L26 | as written | C4:69 | as L22 |
| L27 `gWTE←(⍉ids∘.=⍳VS)+.×dX ⋄ gWPE←(⍉pos∘.=⍳BLK)+.×dX` | as written | C4:70 | direct (rung 6 Z6) |
| L28 `loss(⊃,/,¨gWTE gWPE gLM gWQ gWK gWV gWO gF1 gF2)` | `gr←⊃,/,¨gWTE gWPE gLM gWQ gWK gWV gWO gF1 gF2 ⋄ loss gr` | C4:71 `(loss, flat(…))` | new: `⊃,/,¨` over a strand as one direct rule (below); the strand of a name and a parenthesised expression has no rule, so the gradient is bound first and the result is a two-name strand, which is a tuple (rung 5) |
| L29 `ADAM←{(t lr g)←⍵ ⋄ M∘←… ⋄ V∘←… ⋄ P∘←…}` | `adam(P, M, V, gr, ti, lr) = do t = 1.0 ti; apl⦇ Mn←(B1×M)+(1-B1)×gr ⋄ Vn←(B2×V)+(1-B2)×gr*2 ⋄ Pn←P-lr×(Mn÷1-B1*t)÷Epsa+(Vn÷1-B2*t)*0.5 ⋄ Pn Mn Vn ⦈ end` | C4:75–81, the returned triple | direct; `∘←` (a write to an outer name) has no rule and C4 returns the new state, so the three modified assignments are three bindings and a three-name strand |
| L30 `losses←{l g←STEP(≢docs)|(⍵×BSZ)+⍳BSZ ⋄ ADAM(1+⍵)(LR0×1-⍵÷NSTEPS)g ⋄ l}¨⍳RUN` | host `run()` as C4:85–97; `learningRate(s) = do sf = 1.0 s; apl⦇ Lr0×1-sf÷Nsteps ⦈ end` | C4:82, 85–97 | host: the loop threads Adam's state, which the sub-language cannot write to an outer name; the schedule line is APL |

## What the base gains

Three additions, each a grammar rule with a library entry, in the style of rungs 5 and 6, plus the name lines:

1. Destructuring of nine names: `a b c d e f g h i ← e ⋄ rest` as `(fn (a, …, i) => rest)((e))`, the three-name rule (AplSyntax.fsi:117–125) copied at arity nine, above it. Rung 5's mechanism unchanged (row 80). No arity between four and eight is needed and none is added.
2. `¨` over a vector whose cells are arrays of unequal shape: today `aplEach(f, v: Vector)` assembles the cells into an array by the first cell's rank and refuses unequal shapes by contract (AplCore.fsi:637–652). It gains a case: when the cells are matrices and their shapes differ, the result is a tuple of the cells, for the arities the program uses (nine; two and three for symmetry with rung 5's tuples). The result type stays `Object`, as every general form's is (row 67), and the nine-name rule above binds it. This is rung 5's "a strand of arrays is a tuple" applied to a computed strand; the report records it as such.
3. `⊃,/,¨` over a strand: `⊃ , / , ¨ t:AplTuple` as one direct rule to `aplFlatten((t))`, with overloads on tuple arity two, three and nine in the library (ravel each, catenate all), and `AplTuple` extended with a nine-name alternative above its three-name one (AplSyntax.fsi:650–652). This is C4's varargs `flat` (row 130) under its APL spelling. The general reading, `¨` over the strand then `,/` then `⊃`, would build a nested vector, which the base does not have; the direct rule is the only reading.

Possible fourth and fifth, decided by the inventory: `N⍴⍳Blk` with a name as the shape (one grammar line if the reshape rules take numerals only), and `aplRankD1` over two rank-3 arguments for `A(sm_b⍤1)dH…` on L23 (one library overload pairing rows across planes, assembled as rung 4 assembles).

Names, one grammar line each in the closed sets. AplName gains: `Ne Blk Nh Bos Eps Lr0 B1 B2 Epsa Nsteps Mk Tokm Len bb B N R nv pos X Xp X1 Vh Hc X2 X3 M0 Mr X4 loss dL gLM dX4 gF2 dM0 gF1 dX3 dX2 gWO dH dS dQ dK dV gWQ gWK gWV dX1 dXp gWTE gWPE gr lr sf P M V Mn Vn Pn r wte wpe lm wo f1 f2` (`Hd Vs Pr ids tg vm dX A Q K Vv Qh Kh wq wk wv dQh dKh dVh t b e x y` exist). AplTName gains: `Qh Kh Vh dQ dK dV gWQ gWK gWV wte wpe lm wo f1 f2 gWTE gWPE gLM gWO gF1 gF2 loss gr Pn Mn Vn` (`Q K Vv wq wk wv dQh dKh dVh` exist). AplFnName gains: `rmsn sm rmsn_b sm_b vw` (`h u` exist). Two spellings need a probe before the lines are written: a name with a digit after a capital (`B1`, `Lr0`, `M0`, `X1`) and a name with an underscore (`rmsn_b`, `sm_b`); if either fails, the fallback spellings are `Bt1 Bt2` and `rmsnb smb`, recorded.

## What stays host, and why, in one list

- The two hyperparameter lines: top-level statements; the tuple binding is the expansion.
- The layout table and `v`: nested arrays; C4's `matShape` family and `view`.
- The parameter load and Adam's zeroed state: `⎕NREAD`; C4's `loadParams` and `zeros`.
- The corpus: characters and `⎕A`; C4's `loadCorpus`, converted once to the base's arrays.
- `h` and `u`: rank 4; C4's `heads` and `unheads` behind two adapters with the dfn calling shape.
- `∘←` and the training loop: writes to outer names; C4's returned triple and `run()`.
- Everything else, 19 of the 25 lines, is APL text over the base.

Two textual departures apply throughout: every statement inside a block ends in `⋄` even where the Dyalog relies on the line break, because a line break does not separate two statements when the next line can continue the one above (rows 52, 63, 68, 81), and the program's strand names are exactly the ones that continue a line; and the inline binding `e←` on L7 is two statements (rung 4).

## Cost, and what to measure

The rung reports price the general machinery at one frame push per cell: 3.5× a direct `+` on scalars and nothing measurable on 100-element vectors (rung 4), and 3.8× on a 16×16 `+.×` written as `{⍺+⍵}.{⍺×⍵}`, which pushes per element (row 85). This program has no per-element general form: every `aplCall` in it is per row (`⍤1`, `⍤0 1`: 16·B pushes per application), per plane (`⍤2`: 4·B), or per strand member (`¨`: 3 or 9). What it does pay that C4 does not is the assembly of every `⍤` result into a fresh array (`aplAsm1/2`, `Object`-typed) where C4 returns views, and the conversions at the block's entry. The expectation is therefore a cost near C4's, not a multiple of it; the report measures it the same way as C4 (the 40 checks at pool sizes 1 and 4; batch-1 and batch-4 step times) and puts it in C4's cost table as a fifth row.

## The check

`MicroGptAplCheck.fss` is `run-c4/src/MicroGptFlatCheck.fss` with its import changed to `MicroGptApl` and its paths adjusted; goldens `run-c/goldens` as before. Source path: this directory, then `apl/base`, then `run-c4/src` (for `FlatArrays` and `FlatData`), then the shipped libraries, as rung 6's header shows. Pass means 40 of 40 at pool size 1 and at 4 with identical values, as C4's.

## Worker deliverables, in order

1. Probes, in `probes/`, one directory each with the source and `.out`: (a) the two name spellings above; (b) `N⍴⍳Blk` with a name as the shape; (c) `¨` over `⍳9` with a function returning matrices of unequal shape, destructured into nine names; (d) `⊃,/,¨` over a nine-name strand; (e) `A(sm_b⍤1)dH` with two rank-3 arguments; (f) a host adapter in the dfn calling shape called from APL text (`h¨Q K Vv` with `h = fn (): Any => heads(…)`); (g) a block whose last statement is a two-name strand returned from a function declared with C4's tuple result type. Each probe is small and its output says what the base did.
2. The base additions, in `apl/base/`, each rule commented with its rung-7 origin as the earlier rungs' rules are; rungs 1–6 re-run and green after the change.
3. `MicroGptApl.fss` and `MicroGptApl.fsi` here, the check, `checks/threads1.txt` and `checks/threads4.txt` run under `Monitor` in the coordinator's thread (a worker's background run dies with the worker: run-c4/design.md, process section).
4. `REPORT.md`: the correspondence table with three columns (Dyalog line, APL-in-Fortress line, expanded Fortress or C4 line), the list of departures, the cost row, and the new gap rows in `apl/gaps.md` continuing from row 85.
