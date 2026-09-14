# Phase 1 — independent review of Run C (`explorations/run-c/`)

The standard is `experiment/RUN_C_BRIEF.md`: microGPT in native Fortress arrays
with the data laid out after Hsu, following
`explorations/apl/reference/hsu-flat/microgpt_concise.dyalog` line for line,
under nine fixed layout constraints, against
`experiment/run-c-goldens/goldens.json` at one and four threads. Method: re-run
the check at one thread and at four and compare every line with the committed
outputs; regenerate the text goldens from the JSON and diff; map each bullet of
the brief's standard onto a check line; read every layout constraint against the
source and the library it leans on; walk `design.md`'s line-for-line table
against both the Dyalog and the Fortress; read the sixteen gap rows against
their cited reproducers; scan the run's transcript for reads of the excluded
paths. Reviewer probes, commands and outputs:
`explorations/reviews/run-c-review-probes/` (uncommitted).

## Verdict

Run C meets its brief. The check is 36 lines, 36 PASS, 0 FAIL, and it
reproduces here byte for byte apart from six timing fields and the total —
at one thread (451 s against the committed 855 s) and again at four. All
eight golden text files under `run-c/goldens/` are exactly what
`extract_goldens.py` writes from `experiment/run-c-goldens/goldens.json`.
Every bullet of the standard of success maps onto check lines, with three
checks beyond what was asked. All nine layout constraints are met, the views
are genuinely zero-copy, and `step` holds no state. The program follows the
Dyalog line for line with one declared departure (Adam's association, taken
from numpy because the goldens come from numpy) and one undeclared one that
the brief itself required (BOS padding where the Dyalog's `↑` pads with zero);
neither shows in the numbers.

Three faults, none fatal. The loader claim in `design.md` — "the check's first
line measures the loaded vector against the goldens' `P0` and finds no
difference at all over the 4192 values" — is a comparison of the run's own
parser with itself: the weight files and `goldens/P0.txt` carry the same digit
strings and the check parses both with the same 29-line routine. Run against
Python's correctly rounded parse, that routine is 1 or 2 units in the last
place off on 699 of the 4192 values, worst 5.55e-17
(`run-c-review-probes/RvwParse.out`, the routine copied verbatim and run under
the interpreter). An earlier draft of `design.md` said exactly this and it was
replaced by the stronger sentence. Second, that 29-line parser exists twice,
identical but for its name, because `parseFloat` was not put in the `.fsi`.
Third, no probe in `run-c/probes/` has a saved output, so every quoted
diagnostic and every timing in `gaps.md` has to be re-earned by running.

## 1. Verification

**The re-run, one thread.** `MicroGptFlatCheck.fss` from `run-c/src/` at
`FORTRESS_THREADS=1`, JDK 25, `-Xmx4g -Xss64m`: exit 0, 36 lines, every one
PASS (`run-c-review-probes/recheck_threads1.txt`). No cold-cache overload
failure; the first run succeeded. Against the committed
`checks/threads1.txt` the only differences are six timing fields and the
total (`recheck_vs_shipped.diff`): with the `( … ms)` and `total … s` fields
normalised the two files are identical. So the committed log is the log this
program produces. Every measured value is reproduced to the last digit —
gradient 1.1102230246251565E-16, parameters after Adam 8.326672684688674E-17,
the five losses 4.440892098500626E-16 then 0.0 four times, batch 4 exactly
0.0 against both its golden and the token-weighted mean, worst finite
difference 3.1012873996302814E-10 (document 0) and 3.6822056515006807E-10
(batch of four). This machine is faster than the run's: 451 s against 855 s,
batch-1 steps 4.15–4.19 s against 7.7–7.9.

**The re-run, four threads.** Same component at `FORTRESS_THREADS=4`
(`recheck_threads4.txt`): 36 PASS, 0 FAIL, 226 s. Normalising the header line,
the six `( … ms)` fields and the total, all four files — `checks/threads1.txt`,
`checks/threads4.txt`, `recheck_threads1.txt`, `recheck_threads4.txt` — have
the same md5 (`cca23bd8f8436e00db305134ec078ce0`). Four independent runs at two
thread counts on two machines agree on every measured value to the last digit.

**The goldens.** `goldens/extract_goldens.py` run in a scratch directory
against `experiment/run-c-goldens/goldens.json` reproduces all eight files
byte for byte: `P0.txt`, `grad_step0.txt`, `P_after_adam.txt`,
`losses_batch1_5steps.txt`, `batch4.txt`, `fd_doc0.txt`, `fd_batch4.txt`,
`corpus_first16.txt` (`run-c-review-probes/goldens_regen_diff.txt`,
`regen_goldens/`). The values in the JSON are the brief's: losses
`3.365966947584851 … 3.2208830897506235`, batch-4 loss `3.28664155669517`
with lengths `7 8 7 5`, 4192 gradient and 4192 post-Adam values, zero count
464, eleven finite-difference indices `17 500 1000 1300 1500 1700 2000 2500
3000 4000 4191`, layout offsets `0 432 688 1120 1376 1632 1888 2144 3168`
totalling 4192. The text extraction is faithful and nothing was hand-edited.

**The standard of success, bullet by bullet.**

| brief's bullet | check lines |
|---|---|
| batch 1, five steps from the committed weights on documents 0..4, schedule length 1000, each loss within 1e-12 | `batch 1 step 1..5 loss …` (5 lines, tol `tolLoss = 1e-12`); documents 0..4 come from `b = keys(1, fn i => s)` at `MicroGptFlatCheck.fss:117`, the schedule from `learningRate(s) = lr0 (1 - (1.0 s)/1000)` |
| batch 4 on documents 0..3 from the initial weights, loss `3.28664155669517`, equal to the token-weighted mean, to 1e-12 | `batch 4 loss … vs golden …` and `batch 4 loss vs token-weighted mean …` (2 lines) |
| step 0 at batch 1: full flat gradient against 4192 goldens, and the vector after the first Adam step | `step 0 batch 1: max |gradient - golden| over 4192` and `… max |P after Adam - golden| over 4192` (2 lines) |
| finite differences at the eleven golden indices, central, eps 1e-6, to about 1e-8 | `fd doc 0 P[…]` ×11 plus `fd doc 0 worst` (12 lines); `fd batch 4 …` ×12 is beyond the bullet |
| one line per check with the measured difference and PASS or FAIL; outputs at 1 and 4 threads committed | `report` at `:95-96`; `checks/threads1.txt`, `checks/threads4.txt` |

Three checks are beyond the brief: the loader against `P0.txt`, the corpus rows
of documents 0..15, and the count of zero gradient entries. Two small gaps.
The brief says the weighted mean uses "the document lengths in the goldens";
the check reads them (`batch4.txt` carries loss, four single losses and four
lengths) and then weights by the program's own `docLength(d)` at
`MicroGptFlatCheck.fss:140`, leaving `b4[1..8]` — including the four golden
single-document losses — read and never compared. That is harmless here only
because the corpus check two lines earlier proves the lengths equal. And
`report` prints FAIL but nothing aggregates: a failing check would still end
with `total … s` and exit 0. `464` and `4192` are literals in the check rather
than reads of the goldens.

## 2. Constraint compliance

| constraint | met | where |
|---|---|---|
| one flat `RR64` vector of 4192, nine matrices in the given order, row-major, offsets as in `goldens.json` | yes | `matRows`/`matCols`/`matCount`/`matOffset`/`nParams`, `MicroGptFlat.fss:41-45`; `PView.get = base.get(off + i c + j)` is row-major; the offsets computed by `matOffset` are `0 432 688 1120 1376 1632 1888 2144 3168`, total 4192, matching `layout` |
| nine matrices as zero-copy views, made when needed, never stored | yes | `object PView … extends Matrix[\RR64,r,c\]` (`:48-54`): `get`, `put` and `init0` index `base` directly, no buffer; `view(p, i)` is called nine times inside `step` (`:247-249`) and bound to locals — no top-level or field holds a view. `replica` returns a fresh `array2`, which is what `map`/`ivmap` need to return a new matrix and is not a copy of the view |
| corpus one int matrix (docs × 17) plus lengths, built once, BOS-padded | yes | `loadCorpus` (`:220-232`) fills a 2000 × 17 `ZZ32` array with `bosId = 26` and overwrites positions `1 … |name|`, so a row is `BOS name BOS BOS…`; `len[d] = 1 + |name|`; bound once at top level (`:233`), i.e. at component load (gap row 152). `docs.txt` is 2000 lines, longest name 13, so 17 columns suffice |
| a batch is a row selection | yes, fused | `b: Array[\ZZ32,ZZ32\]` of document ids; `ids`, `tg`, `vm` read `corpusTokens[b[r DIV blockSize], …]` (`:242-244`). The Dyalog's `R←TOKM[b;]` is never materialised — the selection is folded into the key vectors. Same content, one array fewer |
| one pure `STEP` from batch keys to (loss, flat gradient); backward written under forward; no autograd, no `Value`, no activation cache | yes | `step(p, b): (RR64, Array[\RR64,ZZ32\])` (`:239-291`), 51 lines. Everything it writes (`att`, `hc`, `dQ`, `dK`, `dV`, `g`) is allocated inside; `p` is only read; the only outside reads are the immutable `corpusTokens`, `corpusLengths`, `causalMask`. No node object, no tape; `rmsnRowsB` recomputes `rr` and `y` from `x` rather than caching them, which is the honest price of the rule |
| masks arithmetic: causal additive, validity multiplied into loss and gradient | yes | `causalMask` is `-(10.0^10)` above the diagonal, `0.0` on and below (`:145-146`), added to the scaled scores (`:259`); `vm` is an `RR64` 0/1 vector multiplied into the loss (`:266`) and, as `vm / nv`, scaled into `dL` by `scaleRows` (`:269`); ReLU's backward is `hadamard(dX4 f2, positive(m0))` (`:271`) |
| scatter-adds as one-hot products from key vectors | yes | `ohIds = onehot(ids, vocabSize)`, `ohPos = onehot(pos, blockSize)`, then `assignInto(view(g, 0), (ohIds^T) dX)` and the same for `wpe` (`:287-289`) |
| Adam as whole-vector expressions over flat `P`, `M`, `V`, the only persistent state | yes | `adam` (`:294-301`) returns three fresh vectors from three expressions; the training loop's `p`, `m`, `v` are the only `var`s (`:308-310`, and `MicroGptFlatCheck.fss:112-114`) |
| rank 4 by loops-and-views or an `Array4`, choice recorded | yes | loops and `Block` views; `design.md` "The rank-4 decision" gives four reasons, the first of which (an `Array4` would need its own batched product, transpose and softmax written as loops anyway) is correct about the shipped library — `Array3` is the last rank and there is no batched product at any rank |

**Are the views really zero-copy?** Yes, through the whole path.
`PView.get/put/init0` and `Block.get/put/init0` do address arithmetic on
`base` and nothing else. `assignInto(dest, src)` is `dest.assign(fn (i,j) =>
src[i,j])`, and the library's `assign(f: I->E)` is
`for i <- zeroIndices() do put(i, f(toIndex(i))) end`
(`Library/FortressLibrary.fss:1993-1996`) — cell-by-cell `put` through the
view, no intermediate. `^T` is `m.t()`, which is
`TransposedMatrix(self)` (`:2559`), a wrapper whose `get` swaps indices
(`:2576`); the library's product reads its operands through `get(a,b)` and
`other.get(b,c)` (`:2506-2547`), so a transposed view never materialises. The
cost of the wrapper is visible and small: `run-c/probes/p05_mmtime.fss` times
`a DOT (f1.t())` at 1.68 s against 1.55 s for a direct product of the same
multiply-add count. The only copies in the step are the ones the Dyalog also
makes — the activations and the nine gradient products, each written once into
its view of `g`.

**Does `STEP` keep state?** No. But the signature does not tell the whole
story: `step(p, b)` also reads the component-level corpus, so the same `(p, b)`
against a different `docs.txt` gives a different answer. That is the Dyalog's
arrangement too (`TOKM` is global there), and it is what makes "a batch is a
row selection" cheap; it is worth knowing when reading the `.fsi`.

## 3. Fidelity to the Dyalog

I walked all 25 lines of `microgpt_concise.dyalog` against the source. The
forward is right: `rmsn` divides by `SQRT((Σx²)/d + EPS)` with the ε inside
(`:119`, and Fortress's `/` binds tighter than `+`, so the grouping matches);
`sm` subtracts the row max (`:133-136`); the double normalisation `X → Xp → X1`
is in the Dyalog and is reproduced, not an extra; the score scaling is
`÷HD*0.5` on both sides; the residual for `X2` is from `Xp`, not from `X1`, on
both sides. The backward matches term for term, including `rmsn_b`'s
`(dy - y·mean(y·dy))/r` and `sm_b`'s `p(dy - Σ p·dy)`, the ReLU gate `M0>0` as
a strict `>`, and the association of `dX1 = dQ wq + dK wk + dV wv`. The
learning rate `lr0 (1 - s/1000)` and the batch keys `(s·B + i) mod nDocs` are
the driver line's.

Flags:

- **Adam's association differs.** The Dyalog is
  `P-lr×(M÷1-B1*t)÷EPSA+(V÷1-B2*t)*0.5`, right to left
  `P - lr×(m̂ ÷ (EPSA + √v̂))`; the Fortress is
  `p - (lr (m' / (1 - beta1^tstep))) / ((SQRT …) + epsAdam)` (`:299`), that is
  `(lr·m̂)/(√v̂ + ε)`. `design.md` declares it — "in numpy's association" — in
  the table cell, though not in its "Departures from the Dyalog" list. It is
  the right choice: the goldens come from `microgpt_flat.py`, so matching numpy
  is matching the oracle. It does not matter numerically here: the parameters
  after the first Adam step agree with the golden to 8.3e-17.
- **The pad token differs from the Dyalog line.** `TOKM←↑{(BLK+1)↑BOS,(⎕A⍳⍵),BOS}¨docs`
  pads a short numeric vector with zero, i.e. with token `a`; the brief
  requires BOS in every unused slot and `loadCorpus` fills with `bosId` first.
  The brief is the authority and the verified dzaima reference is what the
  goldens came from, so the program is right and the Dyalog line is loose.
  It cannot matter numerically: the causal mask means a query at position
  `i < len` attends only to keys `j ≤ i < len`, and `vm` zeroes `dL` at the
  invalid rows, so nothing downstream of an invalid position reaches a valid
  one in either direction — which is the handover's "padding to 16 positions
  is invisible, as the causal mask predicts", here inherited rather than
  re-derived. `design.md` does not mention the difference.
- **The views are more than the Dyalog's.** `v←{(⍵⊃SHP)⍴P[…]}` copies; `PView`
  does not. That is a departure toward Hsu's tactic 8, and `design.md` says so.
- No extra normalisation anywhere, the mask value is `-1e10` on both sides,
  every scaling (`/nv`, `/d`, `/√HD`) matches, and `-(Σ vm·log p)/nv` has the
  minus outside on both sides.

One gap in the table itself: `design.md` calls the translation line for line
and tabulates nineteen rows, but the Dyalog's two definition lines (`rmsn`,
`sm`, `MK`, `rmsn_b`, `sm_b`) and the driver line `losses←…` have no row.
`MK` appears under the layout table and the four helpers appear only in the
prose list of what was built; a reader checking line for line has to find them.

## 4. Code quality against the run's own design

- **The 29-line duplicate.** `parseFloat` (`MicroGptFlat.fss:150-178`) and
  `parseNum` (`MicroGptFlatCheck.fss:17-45`) are the same 29 lines, identical
  after stripping whitespace except for the function name. `parseFloat` is not
  in `MicroGptFlat.fsi`, so the check had to carry its own; one more line in
  the `.fsi` would have removed the clone, and the `.fsi` already exports the
  loaders' neighbours (`loadParams`, `zeros`, `keys`). This is the largest
  avoidable item in the run, and it is also the reason the loader check is
  circular (§7).
- **The count-then-fill idiom three times.** `countLines`
  (`MicroGptFlat.fss:212-219`), `readLines` (`Check:80-91`) and `numbersOf`
  (`Check:47-72`) each scan twice, once to count and once to fill, in three
  hand-written shapes. `parseRow` (`MicroGptFlat.fss:180-195`) is a fourth
  variant of the same scan.
- **The `.fsi`.** Fifteen names; the check uses nine.
  `matName`, `matRows`, `matCols`, `matCount`, `matOffset` and `nDocs` are
  exported and never called across the boundary. That is defensible — Hsu's
  lesson 1 is that the offset and shape tables are visible code, and
  `design.md` claims exactly that — but it is a claim about the component's own
  text, not about its API, and the `.fsi` does not say so.
- **The library's `scale`.** `Matrix.scale(t)` and `Vector.scale(t)` exist
  (`FortressLibrary.fsi:1466, 1586`). The run's `opr /` for matrix-by-scalar
  (`:85-88`) and vector-by-scalar (`:90`) build a fresh array with an
  elementwise division instead. Division is not multiplication by a reciprocal,
  so this is a defensible choice — and at `/√4 = /2.0` it is provably the same
  — but `design.md` lists "scalar scaling" among what the library gave without
  saying why the division was written anyway.
- **What was genuinely built.** `hadamard` has no library counterpart —
  `pmul` exists on `Vector` and not on `Matrix`, and the run correctly uses
  `g.pmul(g)` in Adam where it does. `relu` and `positive` go through the
  library's `map`. `gather`, `onehot`, `scaleRows`, `rmsnRows`, `smRows` and
  their backwards have no counterparts. `DOT`, `TransposedMatrix`, `SUM` and
  `BIG MAX` are used, not rewritten. `design.md`'s given/built lists are
  accurate on every item I checked.
- **`assignInto`** is three lines wrapping one library call; used eleven times,
  so it earns itself.
- **Names.** `kk` and `vv` for K and V with no explanation, in a component
  where `k` and `v` are free; `pm` means "the probability matrix" in
  `smRowsB` and "p minus" in the check's finite differences. Elsewhere the
  naming follows the Dyalog closely and reads well.
- **Dead weight.** None found in the program: every operator, every helper and
  all nine `view(g, i)` writes are reached. `probes/p02_loaders.fss` is the one
  probe no gap row cites.
- **`run()` duplicates the check's training loop** (`:305-318` against
  `Check:116-129`); it is the deliverable demo, so this is cheap duplication,
  but it is duplication.

## 5. Gap rows 140–155

Sixteen rows, each cited to a file that exists. I read every reproducer and ran
two. The spec citations I checked are right:
`concrete-syntax.tex:916-919` really is
`AssignLeft ::= SubscriptExpr | FieldSelection | QualifiedName` (row 143),
`:721-731` really is `opr ValParam (Op | ExponentOp | ^) StaticParams?` beside
the prefix production (row 149), `:162-164` really is `Exports ::= Export+`
(row 151), `conditionalops.tex:13-27` really specifies the `:` forms
(row 145), `for.tex:28-32` really is the parallel-by-default sentence
(row 155).

Ran: **140** — `strToFloat "1.5" = 1.5`, `strToFloat "-1.5" = -28.5`, and
`0.07696138795865093` dies with `Overflow of ZZ32 100000000000000000` at
`FortressLibrary.fss:4196` (`run-c-review-probes/g140_strtofloat.out`).
Exactly as claimed. **141** — `pieces of "a b  c".split(): 0`
(`g141_split.out`). Exactly as claimed.

Read, and supported as written: 142 (four probes, the failing top-level forms
and the working function-body form), 143, 144, 145, 146, 148, 149, 151, 153,
154.

Four qualifications, none of which changes a status:

- **Row 147** has two halves. The first, a parameter named `t` inside an object
  extending `Matrix`, is `g147_param_t.fss`. The second — "likewise a local
  named `big` in a top-level function collides with the functional method `big`
  of `ZZ`" — is cited to "`p03_zz64.fss` (its first version, `big`)". The
  shipped `p03_zz64.fss` has no `big`; the first version is not in the tree, so
  that half of the row has no reproducer a reader can run.
- **Row 150** lists ten things a six-line `Matrix` view supports: "the library
  product in both spellings, `.t()`, `+`, `-`, scalar scaling, `map`, `ivmap`,
  `assign`, and writes". `p01_views.fss` exercises eight of them; `-` and
  `.assign` are not in it (`assign` through a `Block` is in
  `p06_idioms.fss` (d,g), which the row does not cite for this purpose). The
  claim is true of the program, which uses both, but the cited probe does not
  show them.
- **Row 152** ("top-level values are initialised at component load in
  declaration order") and **row 155** (the four-thread agreement) cite the
  program and the two check outputs rather than a standalone reproducer. The
  brief asks for "a runnable reproducer for each". Both are re-runnable — I
  reproduced 155 independently at both thread counts — but neither is minimal.
- **Row 155's inference** is wider than its evidence. The observation is right:
  the two outputs differ only in header and timings, which I confirmed with
  two fresh runs. The conclusion — "so the library's parallel `SUM` and product
  associate the same way at both thread counts" — is true, and true for a
  structural reason the row does not give: the library's product recurses
  through `partition` (`FortressLibrary.fss:2506-2547`) with the accumulating
  `j`-split done sequentially, so its summation order is fixed by the shapes
  and not by the thread count, and the range reductions split the same way. A
  reader could take the row as evidence that Fortress reductions are
  order-stable under parallelism in general, which ledger row 59 says they are
  not.

Nothing is overstated in the sense of being false. No row duplicates 1–139 as
far as I checked, and the rows that sharpen an existing one (4, 8, 19, 22, 45,
49, 51, 55, 59, 83, 92, 99, 104, 105, 139) cite it by number rather than
restating it, as the brief asks.

**Missing across the board: outputs.** `run-c/probes/` holds 22 `.fss` files
and zero `.out` files. Every quoted diagnostic in `gaps.md`, and all ten
timings in row 154, must be re-earned by running. That is more than a
bookkeeping point for row 154, whose figures are stated as "the second of two
repetitions; the first is up to 2× slower" — a measurement whose selection rule
is recorded but whose data is not.

## 6. Blinding

Searched every `tool_use` input in the run's transcript
(`…/tb/e565ca96-….jsonl`, 108 tool calls, 104 of them Bash, saved at
`run-c-review-probes/transcript_tool_inputs.txt`) for the excluded names.

**No excluded path was read.** Case-insensitive search for `run-b`,
`blinded-fable`, `astra`, `notation-collab`, `reviews`, `process-record`,
`microgpt-run-b-handover`, `microgpt-port`, `compiled-path-gaps` and
`transcript` returns nothing across all 108 inputs. One command,
`ls explorations/ | head -60`, would have listed those directory names without
opening any of them.

**Two `git log` calls, contrary to the brief.** The brief says "Do not use
`git log`, `git show`, `git diff` or any other look at history".

| # | command | when | what came back |
|---|---|---|---|
| 1 | `git status --short \| head -20 && git branch --show-current && git log --oneline -3` | 02:13:16, before the brief was read at 02:13:27 | three subjects: the Run C merge, a merge of `origin/main`, and "APL rungs 5 and 6 …" |
| 2 | `git pull origin … \| tail -5 && git log --oneline -3` | 02:13:21 | the two Run C setup commits and the Run C merge |

No `git show`, `git diff`, `git blame`, `git rev-list` or branch checkout
anywhere in the run. Nothing either call returned names a prior microGPT-in-
Fortress run; the leak is nil and the violation is procedural. Both calls
precede the brief in the transcript, which explains but does not cover them.

**Against `design.md`'s Blinding section.** It says "Nothing on the brief's
excluded list was opened, and no history was read." The first clause is
verified. The second is not true as written: history was read twice, at the
shallowest depth, before the brief. The two disclosures the section does make
— that `CLAUDE.md` and the ledger cite excluded paths which were not followed,
and that `explorations/apl/README.md` was consulted — both check out in the
transcript (`grep -n -i 'fortress |cd |source.path|run' explorations/apl/README.md`,
and the ledger reads are all `sed -n` on `fortress-gap-ledger.md`).

## 7. What a reader of the design note cannot tell

- **The loader check is circular.** `design.md` Numerics: "the check's first
  line measures the loaded vector against the goldens' `P0` and finds no
  difference at all over the 4192 values". The check parses
  `../../apl/reference/dzaima/w/*.txt` with `parseFloat` and
  `goldens/P0.txt` with `parseNum`, which are the same 29 lines; and the two
  files carry the *same digit strings* — 4191 of 4192 tokens are character-
  identical once `¯` is read as `-`, the one exception differing only in `E`
  against `e`. A difference of exactly 0.0 is therefore what the check must
  print whatever the parser does. Run against Python's correctly rounded
  parse, the routine is 1 ulp off on 696 values and 2 ulp off on 3, worst
  absolute 5.55e-17; four of those are confirmed under the interpreter with
  the routine copied verbatim (`run-c-review-probes/RvwParse.out`:
  `0.20683639988133196` loads as `0.206836399881332`,
  `¯0.22538753716769877` as `-0.2253875371676988`). The evidence that the
  weights are right is the downstream agreement — gradient 1.1e-16, losses
  4.4e-16 — which is strong, and an earlier draft of `design.md` said
  precisely "within one or two units in the last place of Python's correctly
  rounded parse". The published sentence is weaker evidence stated as stronger.
- **Row 154's timings are unrepeatable from the tree.** "roughly 24 µs per
  multiply-add (`probes/p05_mmtime.fss`)" is quoted in `design.md`'s Cost
  section; the probe exists, its output does not.
- **The batch-4 lemma is weighted by the program's own lengths**, not the
  goldens', and the four golden single-document losses are read and discarded
  (§1). `design.md`'s Numerics table calls the line "batch 4 loss vs
  token-weighted mean of the four single losses" without saying whose weights.
- **The step's hidden input.** `design.md` says `step` is pure and that no
  activation survives the call, both true; it does not say that `step` reads
  the component-level corpus, so the `.fsi` signature `step(p, b)` understates
  its inputs.
- **The cost of no cache is not priced.** "no activation cache" is stated as a
  virtue (Hsu's lesson 7) without noting that `rmsnRowsB` recomputes the row
  norms and the normalised rows three times per backward pass — the concrete
  price, and the one place where a reader might want the number.
- **The line-for-line table is missing five of the Dyalog's lines** (§3).
- **"No difference" and "the same value" both appear in the Numerics table**
  where the underlying comparisons differ in kind: the batch-4 zero is a real
  agreement with an independently computed golden, the loader zero is not.

## 8. Closing

What Run C got right that this tree did not have before: a `Matrix` that is a
view of a slice of a flat vector, at shapes known only at run time, that the
shipped library's product, transpose, arithmetic and `assign` all accept —
six lines, twice (`PView`, `Block`) — and a whole transformer step, forward
and backward, written on top of it with no graph, no cache and no mutable
state outside three vectors, verified against a numpy oracle at machine
epsilon across 4192 gradient entries and eleven finite differences, at two
thread counts, in one 855-second run that reproduces here to the last digit.
The rank-4 decision is argued from what the library actually stops at and not
from taste, and the sixteen gap rows are the first in this arc to come from a
program whose data layout was fixed in advance by someone else.

The faults are of one family: a measurement quoted where a stronger one was
available or already known. The loader line proves less than `design.md` says
it proves, and the draft that said the right thing was replaced. Row 154's
timings and every probe diagnostic have no saved output, so the gaps file
asserts what the tree cannot show. And the check ends with no verdict line and
exit 0 whatever it finds, which is the same shape of gap one level up: the
evidence is all there and all correct, and it is left to the reader to total it.
