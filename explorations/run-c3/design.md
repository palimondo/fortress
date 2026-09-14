# Run C3: design notes

microGPT in native Fortress arrays with the data laid out after Hsu, round three: the coordinating session's own attempt under the round-two brief (`experiment/RUN_C2_BRIEF.md`), as Run B2 was to Run B. Same program as round one (`explorations/run-c/`), same goldens, same 36 checks at one and four threads. This note records what was surveyed, what alternatives were tried and why one was taken, the line budget, and what the language gave and refused. The line-for-line correspondence with the Dyalog and the formulas is `tour.md` (`tour.html` rendered).

## What round three is

Round one met its brief with 283 lines of which 60 were the model; the rest was helpers with explicit subscripts, a float parser, and plumbing. The round-two brief's diagnosis, which this run accepts: the compute side was transliterated primitive by primitive, without a survey of the shipped algebra, without alternatives, and without a forcing function that made a Fortress line read beside its formula. Round three keeps round one's data side entirely (one flat vector with nine views, the corpus as one integer matrix, keys, one-hot scatter-adds, masks as arithmetic, a pure step, Adam over three vectors) and rebuilds the compute side on three things: a row lift built once, an elementwise algebra declared once, and a per-head cell lift over views.

This run is not blinded and does not claim to be: it was written by the session that designed the APL base, ran round one's integration and its review, and knows Runs B and B2. What it did not read is round two's tree, which lives on the Fable session's branch and was still being written; the comparison of the two rounds is Phase 2's job.

## The three components

| component | code lines | what it holds |
|---|---|---|
| `src/MicroGptFlat.fss` | 91 | hyperparameters (14), the layout table with `view`, `views`, `flat` and the transpose operator (16), the four row-level functions and the mask (8), the two `heads` wrappers (4), the corpus (1), `step` (22), `adam` (5), `learningRate` (1), `run` (10), header and imports (6) |
| `src/FlatArrays.fss` | 109 | constructors (5); `PView`, `Block`, `Row` views with their `reflect` wrappers (25); the elementwise algebra: 2 zips and 14 operators (17); the row lift in four overloads (24); the cell lift in two overloads plus its three readers (19); `gather`, `onehot`, `pick` (8); header (3) |
| `src/FlatData.fss` | 101 | the float parser (29), the line and number readers (27), the weight loader (9), the `Corpus` object and its loader (18), header (4) |
| `src/MicroGptFlatCheck.fss` | 84 | the 36 checks, the verdict line and the non-zero exit; imports the parsers instead of carrying its own |
| the three `.fsi` | 66 | |

Round one, counted the same way (blank and comment-only lines excluded, `(* … *)` stripped): `MicroGptFlat.fss` 273, `MicroGptFlatCheck.fss` 151. Round three: 385 lines of components and 84 of check, 469 in all against 424, with the check 67 lines shorter and the components 112 lines longer. The components are longer because the vocabulary is written once as a library with its api (36 lines of `.fsi` declare what the model uses) and because four overloads of the row lift and two of the cell lift exist where round one had four hand-written row functions and two loops.

The model against the brief's target of about 50 lines (twice the Dyalog's 25): 91, of which `step` is 22 lines for the Dyalog's `STEP` of 19, and `step` plus the row functions, Adam, the mask and the training loop are 45. The other 46 lines are declarations the Dyalog does in one line each or not at all, and each has a Fortress reason:

- 14 hyperparameters, one per line: a strand assignment has no Fortress form, and a typed top-level array literal is bound as a tuple (ledger row 142).
- `flat` is 5 lines with nine typed parameters: an array literal of matrices is pasting (gap row 160), and a type alias for `Array[\RR64,(ZZ32,ZZ32)\]` is specified but unimplemented (row 18).
- The two `heads` wrappers are 4 lines for the same reason: the arrow type of the cell function is spelled out in full twice.
- The transpose operator is in the model, not the vocabulary: an api cannot declare a postfix `^T` (gap row 156).
- `matName` is 3 lines the Dyalog leaves to `⎕NREAD ⍵`; `views` is 1 line the Dyalog writes as `v¨⍳9`.
- `run` is 10 lines for the Dyalog's one `losses←…¨⍳RUN`, because the state is three variables and each step prints.

Subscripts in the model: none. The two `[` in the file are the generator brackets of `SUM[j <- 0#i]` and `BIG MAX[t <- z] t`. The subscripts live in the vocabulary (`gather`, `onehot`, `pick`, the views, the zips) and in the corpus object's three key functions.

## The library and the specification first

`survey.md` (a worker's, 531 lines, 34 runnable checks in `probes/survey/`) is the inventory the vocabulary was built against. What it settled, with line numbers in `Library/FortressLibrary.fss`:

- Given and used unchanged: `+`, `-`, unary `-` on vectors (2192–2196) and matrices (2500–2504); scalar multiplication by juxtaposition in both orders (2267–2277, 2644–2654); `DOT` and juxtaposition as the vector dot product and the matrix products (2261–2277, 2621–2654); `t()` as a view (2559); `map`, `fill`, `assign`, `copy`, `sizes`, `|v|` as the element count; `SUM` and `BIG MAX` over any array as a generator (3041, 3118), `SUM v` in prefix form but not `BIG MAX v` (row 102).
- Absent, and declared once in `FlatArrays` in the library's own form (top-level `opr` with `nat` parameters, the result built by `map` or a `fill`): the elementwise product `×`, any `/` on arrays, `+` and `-` with a scalar, elementwise `SQRT`, `exp`, `log`, `MAX` against a scalar, and `>` returning a 0/1 matrix. Fourteen operators, 17 lines with the two zips.
- Absent and written as functions: a row view that is a `Vector` (the library's `m[i,:]` is a `Row` over `Array1` without the algebra, rows 54, 55), gather by keys, one-hot, pick, stacking rows, and the two lifts.
- Rules that mattered: an `opr` for a trait one does not own must be top-level (`advanced/operator-definitions.tex`); `Vector`/`Matrix` are not `Number`s, so the new operators never overlap the library's (`basic/overloading.tex`); juxtaposition binds tighter than a loose `/`, so Adam's update parses as the formula without parentheses (`basic/operators/precedence.tex:181-184`); a comparison chains, so `a > s > t` is never written.

## Alternatives before committing

Each of the three places was tried in two or three forms by a worker on a probe of a few lines, with outputs, timings at one and four threads, and Fortify renders in `probes/` (`lift_*`, `alg_*`, `att_*`, each with a `REPORT.md`). Checksums agree across every form and thread count.

**The row lift.** Three forms, all spelling the call `rows(rmsn, x)`: (A) stack-by-first-result through an `Array[\Any\]`, the APL base's way; (B) a generator of `Row` views consumed by a list comprehension and stacked; (C) a parallel `for` over the rows writing each result through a `Row` view of a preallocated matrix, its width from the first row's result. Ten repetitions of `rows(rmsn, m)` and `rows(sm, m)` on 64 × 16, in ms:

| form | one thread | four threads | declaration lines |
|---|---|---|---|
| A | 525 / 1127 | 710 / 1790 | 8 |
| B | 473 / 856 | 295 / 622 | 2 + 8 helpers |
| C | 488 / 869 | 208 / 433 | 8 |

Taken: C. It is the fastest at four threads, allocates exactly the result, and depends on nothing beyond the `Row` view. Rejected: A, because in this program every row function's result rank is known, so the `Any` round trip costs without buying the rank inference the APL base needed; B, the closest to APL notation at the declaration and 1.6× faster than A at four threads, because it needs a `List`, a `stack` and a generator of views for what C does with one loop, and the call site reads the same. Array comprehensions are dead (row 50); list comprehensions work. C computes the first row twice to learn the width; at 64 rows that is 1.6 %.

**The elementwise algebra.** (A) operators declared on the shipped `Vector`/`Matrix` families with scalar extension; (B) a thin wrapper object of one's own carrying the algebra. Both run the five formulas (Adam, softmax, rmsnorm, ReLU and its backward, the residual line). A: 43 declaration lines, no wrap anywhere, Adam over 4192 × 100 in 41.3 s. B: 70 lines, a `.a` unwrap in the softmax's generators and a wrap at every construction site, the library's product and `.t()` reachable only through hoisted helpers, 51.9 s. Taken: A. The values never stop being the library's arrays, so everything the library gives keeps working. Twenty-four operator overloads and four function overloads coexist with the library's number operators without one ambiguity (gap row 168).

**The attention block.** (A) round one's two `for d, h` loops over block views with `assignInto`; (B) a `cells` lift over a uniform layout, zero copy: every per-head array is a matrix of N rows whose columns hold the heads side by side, cell (d, h) is a block view, and `cells(f, a, b)` applies `f` to the cells of its arguments and lays the results out the same way; (C) per-head cells as values in a rank-3 array with `heads`/`unheads` copies, the Dyalog's own `h` and `u`. Forward and backward at B = 2, ten repetitions:

| form | block lines | helper lines | copied | one thread | four threads |
|---|---|---|---|---|---|
| A | 17 | 0 | nothing | 12 994 ms | 5 361 ms |
| B | 6 | 14 | nothing | 13 889 ms | 6 319 ms |
| C | 7 | 34 | 4096 floats of relayout per step | 15 664 ms | 7 746 ms |

Taken: B. Six lines, one per Dyalog line, no index arithmetic in the model, and not one float more copied than A; it costs 7 % at one thread. Rejected: A, seventeen lines of index arithmetic in the middle of the program; C, the same six lines wrapped in `heads`/`unheads`, twenty more helper lines, the relayout, and 21 %. Within B: results collected into an `Array[\Any\]` by a parallel `for` and assembled by one `mat` fill, which beat writing through block views into a preallocated matrix (that form must evaluate cell (0, 0) twice); untyped lambdas for the forward cells; a three-argument `cells` so that `dS` is one line.

## The step, line for line

`tour.md`, thirty-one rows. Departures from the Dyalog, and why:

- `⍉` on a weight is the postfix `^T`, the library's transpose view; `+.×` is juxtaposition. A call cannot be followed by a postfix operator even in parentheses (gap row 161), so the two one-hots of the scatter-adds are bound first.
- `⍤1` is `rows(f, m)`, `f⍤1` dyadic is `rows(f, a, b)`, `×⍤0 1` is `rows(fn (w, r) => w r, v, m)`; an operator cannot be passed as a value (gap row 159).
- `h`, `⍤2`, `0 2 1 3⍉` and `u` are `heads(f, a, b)`: a lift over block views, so `Qh Kh Vh` and the re-headed gradients never exist as values.
- `tg⌷⍤0 1⊢Pr` is `pick(pr, tg)`; `tg∘.=⍳VS` is `onehot`; `⊃,/,¨` is `flat`, nine writes through views of a fresh vector.
- `M∘←`, `V∘←`, `P∘←` return a triple instead of assigning; the training loop's tuple assignment is the only state.

## Numerics

The weights are parsed by the same routine as round one (mantissa digits accumulated in an `RR64`, divided by an exact power of ten; the review of round one measured it at one ulp off Python's parse on 696 of 4192 values, well inside every tolerance). The reductions are the library's parallel `SUM`, the products the library's. One thread (`checks/threads1.txt`):

| check | measured | bound |
|---|---|---|
| loader, max over 4192, and the corpus rows 0..15 | 0, 0 | exact |
| batch 1, five losses | 4.4e-16, 0, 0, 0, 0 | 1e-12 |
| step 0 gradient, max over 4192 | 1.1e-16 | 1e-12 |
| parameters after the first Adam step, max over 4192 | 8.3e-17 | 1e-12 |
| zero gradient entries | 464, as recorded | exact |
| batch 4 loss vs golden, and vs the token-weighted mean of the four single losses | 0, 0 | 1e-12 |
| finite differences, document 0, worst of eleven | 3.1e-10 | 1e-8 |
| finite differences, batch of four, worst of eleven | 3.68e-10 | 1e-8 |

The measured values are the same as round one's to the digit: the same library products and reductions in the same order, so the same rounding. 36 of 36 PASS, verdict line printed, exit status 0.

Four threads (`checks/threads4.txt`): every measured value identical to the one-thread run.

## Cost

One thread: 3.7 s per batch-1 step after the first (7.0 s, which pays the interpreter's warm-up), 13.5 s per batch-4 step, 420 s for the whole check of 55 steps. Round one: 7.8 to 8 s, 26.6 s, 855 s. Four threads: 1.6 s per batch-1 step after the first (15 s: the four-thread warm-up is longer), 5.6 s per batch-4 step, 248 s for the check, every measured value identical to the one-thread run; round one 2.6 to 3.0 s and 353 s. The speed-up over round one at one thread comes from the row lift and the elementwise operators doing one pass per operation where round one's helpers did several (a `vec` of row norms and then a `mat`, twice per `rmsnRowsB`), and from `cells` building each per-head result once. No speed work was done beyond choosing between the probed forms.

## What the language gave, what had to be built

Given, used unchanged: everything in the survey's first list; runtime-sized arrays dispatching to `nat`-generic declarations (rows 150, 151); a six-line object extending `Vector` or `Matrix` as a zero-copy view with the whole algebra (row 55); `assign` from another array value through a view's `put` (gap row 166); overloading on the arrow type of a typed function argument (gap row 167); untyped lambda parameters; a nine-tuple binding; an object with methods across an api, and top-level mutable counters (gap row 169); `fail` as a non-zero exit (gap row 170); parallel `for` over rows and over cells with the same results at four threads (gap row 171).

Built, all user-level: fourteen elementwise operators and two zips; three view objects; the row lift in four overloads and the cell lift in two; `gather`, `onehot`, `pick`; the float parser and the readers (unchanged from round one, moved to `FlatData` and shared with the check); the `Corpus` object.

Refused, each a gap row with a reproducer in `probes/`: a postfix operator in an api (156); a `nat`-generic function as a value (157); overload resolution on the arrow type of an untyped lambda (158); an operator as a value (159); an array literal of matrices (160); a postfix operator after a parenthesised call (161); static parameters after value parameters of an ordinary function (162); a top-level value named like a `nat` parameter (163) and an api parameter named like an api function (164); a slice assignment into a row (165); integer division yielding a rational (172).

## Process

Delegated to Opus workers, each bounded and reported back with files in the tree: the library and specification survey; the three alternatives probes with their renders and timings; the rendering of `tour.html`; the replication of every gap row's reproducer against the row's text (`probes/REPLICATION.md`). Written in this thread: the design, the three components and their apis, the check, the tour, the gap rows, this note. Worker code taken into the components: the `Row` view and the operator declarations as verified in the probes, the `cells` lift in its generic form, all re-read against this note before the first run.

The five process rules of `explorations/navigation-retrospective.md`, applied: every negative claim in `gaps.md` came from a worker set the goal of achieving the thing (the lift worker tried four spellings of an operator as a value and three of a call followed by `^T`); the survey is the mechanism inventory, made before the design; the gap rows carry POSITIVE-VERIFIED and NEGATIVE-VERIFIED marks and cite the spec or the library line; a second worker replicated every reproducer blind to this note; and the line budget was priced from the object, a draft of the model written before the probes and forecast at about 85 lines, landing at 91 (the two `heads` wrappers and the `^T` line were not in the forecast).

Two mistakes this run made and what they cost: naming parameters after functions of the same component or its imports (`rows`, `block`, `blk`) cost three compile rounds before the rule of row 92 was recognised in its api form (gap row 164); and the first draft of the check named a local `rows`, one more round. The model's first run after the smoke test passed all five losses at the first attempt.
