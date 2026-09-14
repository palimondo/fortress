# Phase 1 — independent review of Run C2 (`explorations/run-c/`, round two)

The standard is `experiment/RUN_C2_BRIEF.md`: the same program as round one,
split into three components, with the compute side rewritten so that each line
of the model reads as its formula first and as its
`explorations/apl/reference/hsu-flat/microgpt_concise.dyalog` line second — a
row lift built once, elementwise algebra as operators, no subscripts in the
model, a reported line budget, a guided tour, alternatives tried before
committing, and every check still passing at one and four threads with an
aggregate verdict and a non-zero exit on FAIL. Method: re-run the check at one
thread and at four and compare every line with the committed outputs; test the
exit behaviour with a deliberately failing tolerance in a copy of the check;
count the code lines and the subscripts myself by the brief's rule; read the
three components against the survey they claim to be built on and against
`Library/FortressLibrary.fss`; walk the model line by line against the Dyalog
and against `tour.md`; run gap reproducers and check the spec citations;
extract every tool input from the run's transcript and search it for the
excluded paths; render `tour.html` in headless Chromium and judge the by-eye
test. Reviewer probes, commands and outputs:
`explorations/reviews/run-c2-review-probes/` (uncommitted).

## Verdict

Run C2 meets its brief, and meets the part of it that round one missed. The
model is 82 code lines with **zero** subscripts; `rmsn`, `sm`, `rmsn_b` and
`sm_b` are written once on a vector and lifted by one `rows`; the attention
block is `a = rows(sm, mask + (qh kh^T) / SQRT (1.0 headDim))`, one line
against the Dyalog's one line; the check is 40 lines, 40 PASS, 0 FAIL, and
reproduces here at both thread counts to the last digit. The check now
aggregates and exits 1 on a FAIL — verified by running a failing copy. The
tour's 28 rows cover all 25 Dyalog lines, every Fortress snippet in it occurs
verbatim in the source, and `tour.html` is self-contained. Round one's two
largest faults are fixed: the 29-line duplicate parser is gone (the check
imports `FlatData`), and the batch-4 weighted mean is now weighted by the
goldens' own lengths with the four golden single-document losses compared.

Three faults, none fatal, and all of the same family as round one's — a
measurement quoted where the tree holds a different one.

1. **The cost claim is contradicted by the run's own four check outputs.**
   `gaps.md` row 165 and `design.md`'s "Numerics and cost" say the step is
   "about 1.1×" round one's. On the run's own host, round one's check took
   855 s at one thread and 353 s at four; round two's took 610 s and 247 s,
   for the same work — round two is **1.40× faster**, not 1.1× slower. The
   1.1× is an extrapolation from an isolated attention-block probe; the
   whole-program numbers in `checks/` say the opposite and are not reconciled.
2. **Row 165's cited outputs do not exist, and the ones that do disagree with
   it.** The row cites "outputs `.threads1.out`/`.threads4.out`"; no such file
   is in `probes/`. The committed `q03_heads.out` and `q03e_heads_rowsb.out`
   record 26.0 s and 28.8 s where the row quotes 12.6 s, and a ratio of 1.78
   where the row quotes 1.4. Three of the five probes the row cites
   (`q03b`, `q03c`, `q03d`) have no output at all.
3. **`README.md`'s "every probe's output is committed" is false**: 6 of round
   two's 25 `q*` probes and all 22 of round one's `p*`/`g*` probes have none.

## 1. Verification

**The re-run, one thread.** `MicroGptFlatCheck.fss` from `run-c/src/` at
`FORTRESS_THREADS=1`, JDK 25, `-Xmx4g -Xss64m`
(`run-c2-review-probes/recheck_threads1.txt`): 43 lines, 40 checks, every one
PASS, 0 FAIL, exit 0. Against the committed `checks/round2_threads1.txt` the
only differences are the six `( … ms)` fields and the `total … s` line
(`raw_diff_1.txt`); normalised, the two files are identical
(`recheck_vs_shipped_1.diff`, empty). 941 s here against the committed 610 s:
my runs shared the machine with the reviewer's own probes and the failing-copy
run, so no timing comparison is drawn from them — the run's own four outputs
are used for that instead (below).

**The re-run, four threads.** Same component at `FORTRESS_THREADS=4`
(`recheck_threads4.txt`): 40 PASS, 0 FAIL, exit 0, 377 s. Normalising the header, the
six timing fields and the total, all four files — `checks/round2_threads1.txt`,
`checks/round2_threads4.txt`, and both re-runs — have the same md5,
`b37c5476f1a5d0542ed50f494af2ebab`. Four runs at two thread counts on two hosts agree on every measured
value to the last digit.

| measurement | committed (run's host) | this re-run |
|---|---|---|
| loader max \|P − P0\| over 4192 | 0.0 | 0.0 |
| corpus rows 0..15 | 0.0 | 0.0 |
| step 0 max \|gradient − golden\| over 4192 | 1.1102230246251565E-16 | same |
| step 0 max \|P after Adam − golden\| | 8.326672684688674E-17 | same |
| zero gradient entries − 464 | 0.0 | 0.0 |
| batch 1 losses, steps 1..5 | 4.440892098500626E-16, then 0.0 ×4 | same |
| batch 4 loss vs golden | 0.0 | 0.0 |
| batch 4 single-document losses 0..3 | 4.44E-16, 0.0, 4.44E-16, 0.0 | same |
| batch 4 vs goldens'-length-weighted mean | 0.0 | 0.0 |
| fd doc 0 worst | 3.1012873996302814E-10 | same |
| fd batch 4 worst | 3.6822056515006807E-10 | same |
| verdict line | `verdict: 40 PASS, 0 FAIL` | same |
| total, one thread | 610 s | 941 s (this host, under my own concurrent probe load) |
| total, four threads | 247 s | 377 s (same caveat) |

**The aggregate verdict and the exit status.** The check counts in `report`
(`MicroGptFlatCheck.fss:20-24`), prints `verdict: N PASS, M FAIL` (`:97`) and
calls `fail` when `failures > 0` (`:98`). Tested, not assumed: a copy of the
check under `run-c2-review-probes/failcheck/` — the same `report`, verdict and
`fail` lines verbatim, reduced to the two cheap loader checks, with the corpus
line's tolerance set to `-1.0` so it must fail — prints

```
loader: max |P - P0| over 4192 (same parser on both sides): diff 0.0 PASS
corpus: … [tolerance deliberately -1.0]: diff 0.0 FAIL
verdict: 1 PASS, 1 FAIL
FAIL: MicroGptFlat checks: 1 FAIL
```

and exits **1** (`failcheck/fail_exit.txt`). This is what round one lacked and
what the brief asked for; gap row 164 states it correctly.

**Timing, against round one, on the run's own host.** Both rounds' checks do
the same work (round one also ran the four single-document steps,
`e412c81b7:…/MicroGptFlatCheck.fss:135-141`; round two reports four more lines
of it).

| | round one | round two | ratio |
|---|---|---|---|
| check total, 1 thread | 855 s | 610 s | 0.71× |
| check total, 4 threads | 353 s | 247 s | 0.70× |
| batch-1 step, 1 thread (after warm-up) | 7.73–7.93 s | 5.40–5.45 s | 0.69× |
| batch-1 step, 4 threads | 2.64–3.01 s | 1.98–2.06 s | 0.71× |
| batch-4 step, 1 thread | 26.6 s | 19.0 s | 0.72× |
| first (warm-up) step, 1 thread | 14.1 s | 10.2 s | 0.72× |

Round two is faster than round one on every one of these, by a consistent
~1.4×. See §5 row 165 and §8.

## 2. Constraint compliance

| brief's goal | met | where |
|---|---|---|
| 1. three components with the stated contents | yes | `MicroGptFlat.fss` holds the hyperparameters (`:15-17`), the layout table (`:36-48`), the four vector functions (`:25-33`), `step` (`:56-81`), `adam` (`:84-90`), the loop (`:94-106`) and nothing else but the two `^T` declarations; `FlatArrays.fss` holds views, elementwise algebra, the row lift, `gather`, `onehot`, the transposes; `FlatData.fss` holds the parser, the tokenizer, the readers and the corpus. Each has its `.fsi`. The check imports all three (`MicroGptFlatCheck.fss:8-10`). Nothing outside `explorations/run-c/` is touched |
| 2. one row lift, built once; `rmsn`, `sm`, `rmsn_b`, `sm_b` at vector level with no subscripts; every `⍤1` line one Fortress line | yes | `rows` in four overloads (monadic/dyadic × matrix/rank-3), `FlatArrays.fss:161-184`, over `RowView`/`Row3View` (`:77-90`). The four functions are `MicroGptFlat.fss:25-33`, no subscript in any. The Dyalog's nine `⍤1` sites are nine single `rows(…)` calls (`:66` ×2, `:68`, `:69`, `:70`, `:74`, `:75`, `:78` ×2) |
| 3. elementwise algebra as `opr` with scalar extension; comparisons as 0/1 arrays; library operators preferred | yes | thirteen declarations, `FlatArrays.fss:22-35`, each generic in the index type `I`, so one declaration serves `Vector`, `Matrix` and `Array3`; `(dX4 f2) × (m0 > 0.0)` is one line (`MicroGptFlat.fss:73`) and `hadamard`/`scaleRows`/`positive` are gone. `DOT`, the library products, `t()` (behind `transpose`), `+`/`-` between equal-shaped arrays and scalar-by-array juxtaposition are used, not rewritten. Round one's hand-written `/` survives as `opr /(Array, RR64)` and is now argued for: `scale` multiplies, the spec promises `/` (opr-overview.tex:143-147) and it is not shipped |
| 4. no subscripts in the model | yes, **0** | my own count, by the brief's rule: every `[` in `MicroGptFlat.fss` is a static-argument list (`[\…\]`, 36 of them) or a generator clause (`SUM[t <- x]`, `BIG MAX[t <- z]`, `SUM[j <- 0#i]`, 5 of them). No `[i]`, no `[i,j]`, and none needed in the layout table or the head loops, because the layout is functions of the index and the head loops are gone. `design.md` reports 0 with the same rule |
| 5. line budget before and after | yes, and exact | my own count (blank and comment-only lines excluded, a trailing comment counted): model 82, vocabulary 163, loaders 101, check 87, total 433; round one 273 + 151 = 424. Identical to `design.md`'s table to the line. (The brief's own "283" for round one is 10 higher than this rule gives.) The model is 82 against the target of 50, with nine named reasons, each traceable. One decomposition inside it is wrong: `design.md` says "the step is 30 … and the rest 52"; the step (`:56-81`) is 24 code lines and the rest 58. The Dyalog side of that sentence, 16 and 9, is right |
| 6. the tour with three columns | yes | `tour.md` and `tour.html`: 28 rows for the Dyalog's 25 lines (L7 and L8 split into their five dfns), each with formula in TeX, the Dyalog line, the Fortress line(s) as Fortify SVG with the ASCII beneath, and a note. See §7 |
| the survey table with line numbers | yes | `design.md` "The shipped array algebra, surveyed before design": 16 rows with line numbers, plus an "Absent" table of 11 rows. Spot-checked against `Library/FortressLibrary.fss`: `Vector` 2189, `scale` 2197, `pmul` 2198, `dot` 2200, `DOT` 2261, `Matrix` 2497, `scale` 2505, `mul` 2506, `t()` 2559, matrix products 2621-2653, `map`/`ivmap` 2135/2137 — all correct |
| the alternatives, two forms each, with probes, renders and a recorded rejection | yes | row lift: three forms in `probes/q02_rowlift.fss` (+ `q02b`–`q02d`), (b) shipped, (a)/(c) rejected on cost, the APL base's rank-by-result form rejected on gap row 157. Elementwise: operators (`q01_algebra.fss`) against a wrapper (`q01b_wrapper.fss`), wrapper rejected. Attention: rank-3 views (`q03_heads.fss` and four variants) against round one's block loops, rank-3 shipped despite being dearer on the block. Renders in `probes/render/` (`r01_lines.png`, `r02_names.png`, `r05_forms.png`). Each rejection is in `design.md` with its reason |
| the two outputs under the required names | yes | `checks/round2_threads1.txt`, `checks/round2_threads4.txt`; round one's `threads1.txt`/`threads4.txt` kept |
| reading restricted to the allowed list | yes, with one procedural violation | §6 |

**Is the row lift really one operation?** Yes — four overloads of one name with
one body shape (allocate the result, parallel `for` over the rows, write each
through a row view). What makes it possible is `RowView`, six lines extending
`Vector[\RR64,c\]` (`FlatArrays.fss:77-82`), the same trick as round one's
`PView` applied one rank down; the library's `Row` (`FortressLibrary.fss:2484`)
extends `Array1`, not `Vector`, and so carries no algebra.

**Is anything copied that the Dyalog does not copy?** No. `heads`/`unheads`
(`FlatArrays.fss:103-128`) are index-arithmetic views where the Dyalog's
`(B,BLK,NH,HD)⍴` and `0 2 1 3⍉` copy; the plane transpose is a view; the
batched product and the lifts allocate their results, as the Dyalog does. I
checked the index arithmetic of both against the Dyalog by hand: `heads` maps
plane `d·nh + h`, row `i`, column `j` to `base[d·BLK + i, h·HD + j]`, which is
`0 2 1 3⍉(B,BLK,NH,HD)⍴`; `unheads` is its exact inverse.

## 3. Fidelity to the Dyalog

I walked all 25 lines against the source and against `tour.md`. The forward and
the backward match term for term: the ε inside the root in `rmsn` and
`rmsn_b`; the row max subtracted in `sm`; the double normalisation `X → Xp →
X1`; the residual for `X2` taken from `Xp`; `÷HD*0.5` on both sides of the
scores and of `dS`; `rmsn_b`'s `(dy − y·mean(y·dy))/r`; `sm_b`'s
`p(dy − Σ p·dy)`; the strict `M0>0` gate; the mask value `-1e10` with
`j > i` for `~(⍳BLK)∘.≥⍳BLK`; `-(Σ vm·log p)/nv` with the minus outside.
Every one of the 28 Fortress snippets in `tour.md` occurs verbatim in
`MicroGptFlat.fss` (checked mechanically, `run-c2-review-probes/` script in
this file's §7).

Departures, and whether they are recorded:

| # | departure | recorded |
|---|---|---|
| 1 | Adam's association is numpy's, `(α m̂)/(√v̂ + ε)`, not the Dyalog's `α (m̂/(ε + √v̂))` | yes — `tour.md` row 27's note, and round one's `design.md`. Right choice: the goldens are numpy's |
| 2 | the corpus pads with BOS where `↑` pads with 0 | yes — `tour.md` row 10's note, with the reason it cannot matter. Round one's `design.md` did not say this; round two's tour does |
| 3 | `pos` is `r MOD blockSize`, not a cyclic reshape `N⍴⍳BLK` | yes — `tour.md` row 11 |
| 4 | the per-head cells are a rank-3 array of `B·NH` planes where the Dyalog has a rank-4 array `(B,NH,BLK,HD)` | partly — `tour.md` row 14 and `design.md` call it "a rank-3 view", so the shape is stated, but neither says in so many words that the Dyalog's leading two axes are fused. The `⍤2` operations only see the trailing two axes, so nothing computed differs |
| 5 | `dX1 = dQ wq + dK wk + dV wv` groups left, `((a+b)+c)`; the Dyalog's `(dQ+.×wq)+(dK+.×wk)+dV+.×wv` groups right | no. Below every tolerance here (the gradient agrees with the numpy golden to 1.1e-16), and numpy's own grouping is the left one, so the program is right and the Dyalog line is the odd one; it is still an undeclared difference in an arithmetic order, in the one place the Dyalog parenthesises explicitly |
| 6 | the views are more than the Dyalog's (`v←{…⍴P[…]}` copies; `viewAt` does not) | yes — `tour.md` row 9, `design.md` |
| 7 | the reductions are the library's parallel `SUM`/`BIG MAX` where round one and the Dyalog wrote index sums | yes — `design.md` "Numerics and cost" |
| 8 | `gWTE`/`gWPE` spell the transpose `transpose(onehot(…))` and not `^T` | yes — `tour.md` row 25, gap rows 144/158 |

Nothing else differs. The tour's note column is accurate on every row I
checked; the one row whose note is silent where it should not be is row 21
(§7).

## 4. Code quality against the run's own design

- **Round one's two largest items are fixed.** The 29-line parser exists once,
  in `FlatData.fss:13-41`, declared in `FlatData.fsi:6` and reached by both the
  model and the check; the check carries no copy of it. The batch-4 lemma is
  now weighted by `b4[5 + d]`, the goldens' own lengths, and the four golden
  single-document losses `b4[1 + d]` are compared rather than read and dropped
  (`MicroGptFlatCheck.fss:68-74`). Both were §4/§7 findings last time.
- **The count-then-fill idiom is down from four shapes to two**, `numbersOf`
  (`FlatData.fss:44-69`) and `readLines` (`:72-83`); `countLines` and `parseRow`
  are gone.
- **No dead code in the vocabulary.** Every object and every function in
  `FlatArrays.fss` is reached: `vec` by `pick`, `row`/`row3` by the lifts,
  `plane` by the batched product, the four `…N` wrappers by the `reflect`
  idiom. Three of the thirteen elementwise declarations are never applied by
  the model (`+(RR64, Array)`, `-(RR64, Array)`, `MAX(Array, RR64)`); they
  complete the symmetry of a vocabulary and cost a line each.
- **What is genuinely built versus wrapped.** Wrapped: `DOT` (2261),
  `t()` behind `transpose` (2559), the matrix and vector products (2621-2653,
  2261-2276), `+`/`-` on equal-shaped `Vector`s and `Matrix`es (2192-2194,
  2500-2502), `scale` — reached through the juxtaposition operators, so
  `beta1 m` and `lr (…)` are the library's (2274, 2651). Built: everything in
  the "Absent" table, and I could not find a shipped counterpart for any of it.
  One inaccuracy in the survey: the `Vector` row says "`pmul` is the
  elementwise product `×` wraps" — it is not; `opr ×` is
  `a.ivmap(fn (i, e) => e b[i])` (`FlatArrays.fss:26`), because `pmul` exists
  only on `Vector` (2198) and the declaration has to serve three ranks.
  `pmul` is not called anywhere in `run-c/src`.
- **The `.fsi` files.** `FlatArrays.fsi` declares 44 members; four of them
  (`vec`, `row`, `row3`, `plane`) are used only inside the component. `FlatData.fsi`
  declares six; `parseFloat` is used only inside. `MicroGptFlat.fsi` declares
  twelve and the check uses six; `matName`, `matShape`, `matCount`,
  `matOffset`, `view` and `nDocs` cross no boundary — the same observation as
  round one's §4, unchanged, and still defensible as "the layout table is
  visible code" but still not said in the `.fsi`.
- **Duplication that remains.** `run()` (`MicroGptFlat.fss:94-106`) is again the
  check's training loop (`MicroGptFlatCheck.fss:44-61`) in miniature; it is the
  deliverable demo, so this is cheap. The four `rows` overloads share one body
  shape four times, and the ten view objects share the
  `get`/`put`/`init0`/`replica` shape ten times; both are the library's own
  idiom and there is no way in this language to abstract either.
- **Names.** Round one's `kk`/`vv` are gone — the heads are `q, k, v`,
  `qh, kh, vh`, which is the Dyalog's naming. `h` and `u` are one-letter local
  functions, as in the Dyalog (`h←{…}`, `u←{…}`). `pm`/`pp` in the check's
  finite differences still read as "p minus"/"p plus" and are fine here because
  the round-one collision with the probability matrix is gone with `smRowsB`.
  `m'`, `v'`, `p'` in `adam` follow the formula. No complaint.
- **The check still carries two literals** where the goldens hold the values:
  `464` (`:58`) and `4192` (`:35, 55, 56`). Round one's review said so; it is
  unchanged.
- **The check no longer carries a parser** — the one thing §4 asked for last
  time.

## 5. The gap rows

Eleven rows, 156–166, each cited to a file that exists. I ran four reproducers
and checked five spec citations.

| row | claim | status |
|---|---|---|
| 156 | a `nat`-generic function is not a value; three diagnostics | read; the three diagnostics appear verbatim in the committed outputs — the unification error in `q02c2` (`Any`) and `q02c5` (arrow), "has no type information" in `q02c4`, and the NPE at `GenericFunctionOrConstructor.applyInnerPossiblyGeneric:52` in `q02b`. **confirmed (by the committed outputs)** |
| 157 | `Any` in a `nat`-generic signature is `InterpreterBug: Missing visitor … AnyType`; the overload symptom differs | read, `q02c3_genericplain_any.out` and `q02d_rankbyresult.out` carry the message. **confirmed (by the committed outputs)** |
| 158 | a parenthesised call followed by `^T` is still the row-144 error | read, cited to `q04a_varargs` (5) and `q04f_callsuper` (3), both with outputs. **confirmed (by the committed outputs)** |
| 159 | two generic `opr` declarations of one operator are rejected unless a parameter pair excludes | **re-run here**: `rvw_q05_genericpair.out` reproduces the message word for word — "have parameters with generic type, at least one pair of parameters must have excluding types". Spec citation `basic/overloading.tex:100-105` is right ("it is an error for their static parameters to differ"). **confirmed** |
| 160 | the prefix `SUM v` works on a library vector, unlike the prefix `BIG MAX` of row 102 | **re-run here**: `rvw_q04b_prefixsum.out` prints `6.0` for both forms. Spec citation `reductions.tex:82-91` is right (`Σ g ≡ Σ[x ← g] x`). **confirmed** |
| 161 | a varargs function over runtime-typed matrices takes nine matrices of five shapes | read, `q04a_varargs.out` shows it. **confirmed (by the committed output)** |
| 162 | one `opr` generic in the index type serves all three ranks | read, `q01_algebra.out`; and the whole vocabulary is the demonstration. **confirmed** |
| 163 | a top-level tuple binding of literals binds every name | read, `q04d_toplevel.out`. **confirmed (by the committed output)** |
| 164 | `fail(msg)` exits 1 | **re-run here**, independently, through the check itself: `failcheck/fail_exit.txt`, `EXIT=1` after `FAIL: …` and the `FailCalled` context. **confirmed** |
| 165 | the rank-3 attention costs 1.4× at one thread and 1.6× at four; the step is "about 1.1×" round one's; the check 610/247 against "round one's 855 and 353 on the slower host" | **corrected**, see below |
| 166 | an API cannot declare a postfix operator | **re-run here**: `api2/out.txt`, `Post.fsi:4:1: Syntax Error`, bare. **confirmed** |

Spec citations checked and correct: `reductions.tex:82-91` (160),
`overloading.tex:100-105` (159), `types-vals-vars.tex:121-122` and `:136`
(157, 156), `operator-app.tex:29-32` (158, the `Primary ExponentOp`
production).

**Row 165 is the one row to correct.**

| | row 165 / `design.md` says | the tree says |
|---|---|---|
| the probe outputs | "outputs `.threads1.out`/`.threads4.out`" | no file of either name exists in `probes/`; there are plain `.out` files for `q03_heads` and `q03e_heads_rowsb` only |
| the attention block, 3 reps, 1 thread, model shape | "(A) 12.6 s against (B) 9.3 s" (row 165) | `q03_heads.out`: (A) 26030 ms, (B) 14613 ms; `q03e_heads_rowsb.out`: (A) 28794 ms, (B) 14711 ms — both headed `threads 1`, both at `docs 4 pos 16 heads 4 dim 4, 3 reps` |
| the ratio (A)/(B) | 1.4× at one thread | 1.78× (`q03_heads.out`), 1.96× (`q03e_heads_rowsb.out`) |
| which lift form is cheaper | "(b) is the cheapest … 12.6 s against 13.6 s at one thread" — `q03e` (form b) under `q03` (form a), the reason (b) is shipped (`design.md`) | the two outputs order the other way: `q03e` 28794 ms against `q03` 26030 ms. The shipped choice may still be right; the committed evidence does not show it |
| the four-thread figures | 4.9 s against 3.1 s | no four-thread output is committed |
| `q03b`, `q03c`, `q03d` ("no faster") | cited as reproducers | no output committed for any of the three |
| the whole step | "about 1.1× round one's" | round two's check is 0.71× round one's at one thread and 0.70× at four, on the same host, for the same work (§1). Every step timing in `checks/round2_threads1.txt` is below the corresponding one in `checks/threads1.txt` |

The measurement the row reports may well be right about the attention block in
isolation — the two `.out` files do show (A) dearer than (B), which is the
row's qualitative point, and both were plainly taken under a different load
than the quoted numbers. But the row's own citations do not support its
figures, and its conclusion about the whole program is contradicted by the four
check outputs in the same commit. The honest reading of those four files is
that round two is the faster program, which is a better result than the one
claimed.

**Probe outputs, again.** Round one shipped 22 probes and zero outputs; the
review said so; round two ships outputs for 19 of its 25 new probes, for the
`api2` probe, and for none of round one's. `README.md:62-63` says "every
probe's output is committed", which is not true of
`q03b_heads_fill`, `q03c_heads_copy`, `q03d_heads_copyfill`, `q04c_gather`,
`q04g_juxtsuper`, `q05b_listofmats`, or of any `p*`/`g*` file. Three of the six
are the ones row 165 leans on.

## 6. Blinding

The run's transcript is `origin/transcripts-blinded:projects/-home-user-fortress/84609af7-….jsonl`,
794 records, **116 tool calls** (101 Bash, 6 Read, 6 task-list calls, 2 ToolSearch, 1 Monitor).
Every tool input is extracted to
`run-c2-review-probes/transcript_tool_inputs.txt`.

**No excluded path was opened.** A case-insensitive search of all 116 inputs
for `run-b`, `run-b2`, `blinded-fable`, `astra`, `notation-collab`,
`process-record`, `microgpt-run-b-handover`, `microgpt-port`,
`compiled-path-gaps` and `transcript` returns three hits, all three inside the
heredoc of the commit that writes `design.md`'s own Blinding disclosure — the
run quoting the names it did not follow. No read, no `ls`, no `grep` of any of
them. Of the paths under `explorations/` that appear in tool inputs, the whole
set is: `run-c/` (68), `apl/` (23), `fortress-gap-ledger.md` (10),
`reviews/run-c-phase1.md` (1, allowed this round), `protocol.md` (1).

**Four `git log` calls, contrary to the brief.** The brief says "no `git log`,
`show` or `diff` of history".

| # | turn | command | when | what came back |
|---|---|---|---|---|
| 1 | 38 | `git pull origin … \| tail -15 && echo ---LOG--- && git log --oneline -8` | call 2, before the brief was read at call 3 | eight subjects of this branch, one of them from the excluded `process-records/` family |
| 2 | 699 | `… && git log --oneline -1 && git push …` | after its own first commit | its own commit |
| 3 | 756 | `… && git log --oneline -1 && git push …` | after its own second commit | its own commit |
| 4 | 780 | `… && git log --oneline -3 && git push …` | after its own third commit | its own three commits |

No `git show`, `git diff`, `git blame`, `git rev-list` or checkout anywhere.
Calls 2–4 look back only at commits the run had just made, so the leak is nil;
call 1 is the one with content, and the run discloses it in `design.md`'s
Blinding section, names the one excluded subject line it saw, and says nothing
in it was used — which the rest of the transcript bears out. `design.md` does
not mention calls 2–4. The disclosure is otherwise accurate: `AplCore.fss`/`.fsi`
were read and not imported (calls 18, 19, 23, 30), the ledger was read with
`sed -n` only, and `explorations/reviews/run-c-phase1.md` was read once
(call 17), as this brief allows.

## 7. The tour by eye

Rendered in headless Chromium at 1300 px and again at 3× and 4× device scale
(`run-c2-review-probes/tour_1.png`, `tour_rows1_6.png`, `tour_rows7_11.png`,
`tour_mid.png`, `z_row21.png`).

**Self-contained:** yes. The only absolute URLs in the 6171-line file are
`http://www.w3.org/2000/svg` and `http://www.w3.org/1999/xlink`, 56 of each —
the namespaces of the 56 inlined SVGs (28 formulas + 28 Fortress). There is no
`src=` or `href=` attribute of any kind, no font link, no script.

**Completeness:** all 28 rows of `tour.md` are present in `tour.html`, and the
28 rows cover the Dyalog's L6–L30 with L7 and L8 expanded into their five
dfns. Every Fortress snippet in `tour.md` is verbatim source: I split each row's
Fortress cell on `<br>`, stripped the backticks and matched against
`src/MicroGptFlat.fss` — 28 rows, 0 mismatches. The trailing "Lines with no
Dyalog counterpart" list is honest (the two `^T` declarations, `corpus()`,
`nDocs()`, `run()`'s prints).

**The by-eye test, row by row.** For 21 of the 28 rows the Fortress line reads
beside its formula and its Dyalog without effort — most convincingly the whole
backward pass, rows 18–26, where e.g. row 20's
`dX₂ = dX₄ + rows(rmsn_b, dX₃, x₂)` sits beside
`dX2←dX4+dX3(rmsn_b⍤1)X2` and beside
`dX_2 = dX_4 + \mathrm{rmsn}_b(dX_3, X_2)` and the three are the same
sentence; and row 15, the attention line the brief named as the judge, where
`a = rows(sm, mask + (qh kh^T) / SQRT (1.0 headDim))` is one line against
`A←sm⍤1⊢MK+⍤2⊢(Qh+.×⍤2⊢⍉⍤2⊢Kh)÷HD*0.5`. Seven rows do not pass, and the
reasons are three:

| row | why it does not read |
|---|---|
| 21 (L23) | **rendering fault, unremarked.** `/ SQRT (1.0 headDim)` is set as `= ᵖ⁄(1.0 headDim)` with an overline: the `/` prints as `=` and the radical sign as a `p`. The rendered line is not the formula it stands beside, and this is the one row whose note column is empty |
| 27 (L29) | **rendering fault, unremarked.** Adam. Each primed name is set as a superscript zero (`m'` → `m⁰`) and the following `=` as `/`, so the three lines render as `m⁰/ β₁m + (1−β₁)g` and `p⁰/ p − (lr(m⁰(1−β₁ᵗ))) = (√v⁰(1−β₂ᵗ) + ε_A)` — the update reads as an equation and the inner division is gone. This is the row whose note is specifically about the association of the divisions |
| 28 (L30) | same fault: `=` for `/` and `/` for `=` throughout, and the lambda's `=>` vanishes |
| 25 (L27) | **rendering fault.** `transpose(onehot(ids, vocabSize))` is set as `transpose_onehot(ids, vocabSize)` — the nesting, which is the whole content of the note, is lost |
| 15 (L17) | partial: the attention line reads, but `SQRT (1.0 headDim)` again loses its radical, so `÷HD*0.5` has no visible counterpart |
| 1, 7, 8 (L6, L9, L10) | **scale.** These rows' Fortress is five to seven lines long, and the SVG is fitted to the column width, so the Fortify setting is printed smaller than the grey ASCII underneath it and is read only by squinting. The comparison in these rows is done on the ASCII |

None of the seven is a missing row or a hidden formula: no row hides its
formula behind a helper call, which was the risk the brief named, and rows 2–6
show `rmsn`, `sm`, `rmsn_b`, `sm_b` open at vector level exactly as the dfns.
The faults are all in the Fortify → LaTeX → SVG path, which the brief
anticipated — "if a line does not render, say so in the note and show the
ASCII". The ASCII is shown in every row, which is the more important half; the
note is where four of these rows are silent.

The Dyalog column is 100 px wide and wraps mid-token (`EPS LR0 B1 B2 E` /
`PSA←1E¯5`), and `⎕` renders as an empty box in rows 1 and 7 (`⎕IO`,
`⎕NREAD`). Cosmetic, but it is the column the Fortress is supposed to be read
against.

## 8. What a reader of the design note cannot tell

- **That round two is the faster program.** "Numerics and cost" compares its
  own 5.4–5.8 s step against "round one's 4.15 s on the reviewer's host of the
  same speed" and invokes a 1.8× host factor, then reports "610 s at one
  thread and 247 s at four against round one's 855 and 353 **on the slower
  host**". Round one's 855 s output is in the same directory and nothing
  establishes that its host was slower; read straight, the four files say
  round two is 1.4× faster at both thread counts. The design note's own
  conclusion — "the step is about 1.1× round one's" — is the one number in it
  that its evidence contradicts.
- **That the 5.8 s has no witness.** `checks/round2_threads1.txt` records
  10174, 5406, 5445, 5397, 5414 ms. The range "5.4–5.8" has no upper end in
  the tree.
- **That three of the attention alternatives were never saved.** The
  "Alternatives" section reports `q03b` slower, `q03c` the same, `q03d`
  slower; none of the three has an output.
- **That `×` does not wrap `pmul`.** The survey says it does; the code uses
  `ivmap`, necessarily, because the declaration is generic in the index type.
  A reader taking the survey at its word would expect the library's kernel
  under the model's elementwise product.
- **That the head planes fuse the Dyalog's leading two axes.** Stated as
  "a rank-3 view", never as the rank-4-to-rank-3 change it is against the
  Dyalog's `(B,BLK,NH,HD)`.
- **That `dX1`'s three-term sum groups the other way from the Dyalog's.**
- **That the loader's circularity survives.** The check's first line is
  honestly labelled now — "(same parser on both sides)" — which is the right
  fix and is better than round one's sentence; but `design.md`'s round-two
  section does not carry the ulp figure the review established, and a reader of
  round two alone still cannot tell how good the parse is. (It is in the
  "After the review" section, two screens up.)
- **That four `.fsi` names and six model names cross no boundary.**

## 9. Closing

Run C2 met its brief. The compute side is now Fortress rather than APL
vocabulary with Fortress loops inside: four vector functions written once with
no subscript and lifted by one operation; thirteen elementwise operators that
one declaration each serves three ranks with; an attention block that is six
lines in one-to-one correspondence with the Dyalog's four and contains no loop;
a model of 82 lines with zero subscripts, and every one of the 40 checks still
passing to the last digit at one thread and at four. The strongest single thing
in it is the row lift over a six-line `Vector` view, because it is what turns
`rmsn⍤1` from a paragraph into `rows(rmsn, x)` and it cost 24 lines to build;
the second is the discipline of the tour, whose every snippet is verbatim
source and whose 28 rows are a claim a reader can check by eye in ten minutes.

The weakest point is the cost story: gap row 165 and the design note's cost
paragraph state a 1.1× slowdown that the four check outputs in the same commit
refute — round two is 1.4× faster — while the probe outputs the row cites
either do not exist under the names given or record numbers twice those quoted.
The second weakest is the tour's silence where Fortify fails: four rows,
including both Adam lines, render as mathematics that is not what the source
says, and the brief's instruction for exactly that case ("say so in the note")
is the one instruction of the six that was not followed.
