# Phase 2: Run C2 against Run C3

Two rounds of the same program under the same brief (`experiment/RUN_C2_BRIEF.md`): microGPT in native Fortress arrays with Hsu's flat data layout, rebuilt from round one (`explorations/run-c`, Run C) so that each line of the model reads beside its formula and its Dyalog line. C2 is the blinded Fable session's round, one context, no delegation, on its own branch, now merged into `explorations/run-c/`. C3 is the coordinating session's round with Opus workers for the survey, the probes, the render and the replication, in `explorations/run-c3/`. Both were written without reading the other. Phase 1 reviews: `run-c-phase1.md` (round one), `run-c2-phase1.md` (C2, by a worker); C3 has no separate Phase 1 review, its replication of its gap rows and its checks re-run stand in. Process records: `09-run-c.md`, `10-run-c2.md`, `11-run-c3.md`.

The standard both were judged by, in the brief's words: a Fortress line is judged against its formula first and its Dyalog line second, with the guided tour as the by-eye test; the same 36 checks at one and four threads; three components; a row lift built once; elementwise algebra as operators; no subscripts in the model; a line budget; a survey before design; alternatives tried before committing.

## A. Rendered pairs, side by side

Sixteen rows of the two tours paired by their Dyalog line, each panel the formula above the Fortify-rendered Fortress, in `run-c2-vs-run-c3-pairs/pairs.html` (`pairs.md` lists the matching and the line counts). The verdict per pair, read from the renders and the sources (`run-c/src/MicroGptFlat.fss`, `run-c3/src/MicroGptFlat.fss`):

| Dyalog line | C2 | C3 | closer to the formula |
|---|---|---|---|
| hyperparameters | three tuple bindings, `(nEmbd, blockSize, …) = (16, 16, …)` | fourteen typed declarations, one per constant | C2. A tuple binding is the strand assignment C3's design note says Fortress lacks. |
| `rmsn` | `x / SQRT (epsilon + (SUM[t <- x] t^2) / (|x|))` | `x / SQRT (epsRms + (x DOT x) / |x|)` | C3. `x DOT x` is the formula's $\|x\|^2$; the generator sum is the Dyalog's `+/⍵*2`. |
| `sm` | identical to the digit but for `SUM[t <- e] t` | `SUM e` | equal; C3's prefix sum is one symbol shorter. |
| `rmsn_b` | five lines, one statement per line | three lines | equal in content; a formatting choice. |
| the keys line | `toks = gather(corpusTokens, b); ids = ravel(block(toks, 0, 0, bsz, blockSize)); …` over three lines, the Dyalog's `R←TOKM[b;] ⋄ ids←,R[;⍳BLK]` primitive by primitive | `ids = corpus.tokens(b, 0); tg = corpus.tokens(b, 1); vm = corpus.valid(b); nv = SUM vm; pos = corpus.positions(b)` | C3. The formula names five keys; C3's line names them; C2's transliterates the Dyalog's ravel-of-a-block. |
| `v¨⍳9` | the nine `view(p, i)` spelled in the step | `views(p)` | C3, by one line. |
| `h←…` | `qh = h(q)`, a zero-copy rank-3 view | no line: the cells are views taken inside `heads` | equal; both move no data. |
| `A←sm⍤1⊢MK+⍤2⊢…` | `a = rows(sm, mask + (qh kh^T) / SQRT (1.0 headDim))` | `att = heads(fn (qc, kc) => rows(sm, (qc (kc^T)) / SQRT (1.0 headDim) + causalMask), q, k)` | C2. One line that is the formula with no lambda, because the batched product and the plane-wise `+` are operators on rank-3 values; C3's line carries the per-cell lambda. |
| `Hc←…` | `hc = u(a vh)` | `hc = heads(fn (ac, vc) => ac vc, att, v)` | C2. |
| loss | identical | identical | equal. |
| `dL←(vm÷nv)×⍤0 1⊢…` | `diag(vm / nv) (pr - onehot(tg, vocabSize))` | `rows(fn (w, r) => w r, vm / nv, pr - onehot(tg, vocabSize))` | C2. `diag(v) m` is the formula's $\mathrm{diag}(v)\,M$; C3's is the Dyalog's rank-0-1 lift with an eta-expanded `×`. |
| `dVh … dS←…` | `dVh = a^T dh; dS = rows(sm_b, a, dh vh^T) / SQRT (1.0 headDim)` | `dV = heads(fn (ac, dc) => (ac^T) dc, att, dH)` and a three-argument `heads` with a lambda | C2. |
| `dQh … u¨…` | `dQh = dS kh; dKh = dS^T qh; (dQ, dK, dV) = (u(dQh), u(dKh), u(dVh))` | `dQ = heads(fn (sc, kc) => sc kc, dS, k); dK = heads(fn (sc, qc) => (sc^T) qc, dS, q)` | C2 by reading, C3 by one fewer statement: the `u` line is C2's price for values, C3's cells land in the flat layout. |
| `gWTE … gWPE` | `gWTE = transpose(onehot(ids, vocabSize)) dX` | `yi = onehot(ids, vocabSize); …; gWTE = (yi^T) dX` | C2. A transpose function sidesteps the postfix-after-call error that C3 worked around by binding. |
| `loss(⊃,/,¨…)` | `flat(gWTE, …, gF2)` with a varargs `flat` | the same call with a nine-parameter `flat` | equal at the call; C2's declaration is one line, C3's five. |
| ADAM | three lines and a result line | two lines | equal in content. |

Two habits separate the renders more than any mechanism. C2 writes `x1 wq^T` and `dL^T x4`; C3 writes `x1 (wq^T)` and `(dL^T) x4`, round one's parentheses carried forward although the postfix binds tighter than juxtaposition and the parentheses are noise in the picture. C3 writes several statements on one line where the Dyalog has one line; C2 does so less and its tour has 28 rows to C3's 31 because C3 gives every helper dfn its own row.

The by-eye verdict of the pairs, before the machinery is weighed: C2 reads closer to the formula on the attention block, the loss gradient and the scatter-adds, which is the compute side the brief was about; C3 reads closer on the data side (the keys, the views, the norms). [PAIRS: the rendering worker's own reading, and the Phase 1 review's judgement of C2's tour by eye, go here.]

## B. Correctness anchoring

| | C2 | C3 |
|---|---|---|
| checks | 40 (round one's 36, plus the four golden single-document losses) | 36 |
| one thread | 40 PASS, 610 s | 36 PASS, 420 s |
| four threads | 40 PASS, 247 s, identical values | 36 PASS, 248 s, identical values |
| measured differences | round one's to the digit | round one's to the digit |
| verdict line and non-zero exit | yes, `fail` after the verdict | yes, the same |
| re-run by a reviewer | [REVIEW] | by the coordinator, both counts; the gap rows by a separate worker |

Both are correct by the same standard and by the same digits; the products and the reductions are the library's in both, so the rounding is round one's. C2 added the check the round-one review asked for and weighted the batch-4 mean by the goldens' own lengths.

## C. Lines

Code lines, blank and comment-only excluded, counted by one script over both trees:

| | round one | C2 | C3 |
|---|---|---|---|
| model | 273 | 82 | 91 |
| the step inside it | — | 24 | 22 |
| vocabulary | — | 163 | 109 |
| data | — | 101 | 101 |
| check | 151 | 87 | 84 |
| the three apis | 34 | 67 | 66 |
| total, components and check | 424 | 433 | 385 |

C2's model is nine lines shorter, all of it in the hyperparameters (three tuple bindings against fourteen lines) and the `flat`; C2's step is two lines longer because it spells the nine views and the corpus keys in the step. C3's vocabulary is 54 lines shorter: three view objects against C2's ten, a cell lift over block views against a rank-3 algebra (batched product, plane transpose, plane-wise sum, heads and unheads views, a row lift over planes). C2's algebra is 13 declarations generic in the index type where C3 has 14 per-rank declarations of the same operators; the per-rank spelling is what lets C3 declare the rank-0-1 `rows` overload that C2 could not (its gap row 159), which C2 did not need because it had `diag`.

Neither reaches the brief's target of about 50 lines for the model, and both name the same causes: `^T` cannot be exported from an api; `matName` is the price of a loader; `adam` and `run` carry a real signature and real state. C3's list adds one cause that is not a Fortress limit: the fourteen hyperparameter lines, which C2 shows a tuple binding removes (C2's gap row 163; C3's design note cites ledger row 142 for an array literal, which is the wrong mechanism).

## D. The vocabulary designs

Same skeleton, different middle. Both keep round one's `PView` and `Block` and the six-line row view; both write the four vector functions once over runtime-sized arrays and lift them; both wrap nothing.

C2 makes the per-head cells values: `HeadsView` presents a (docs·positions × heads·dim) matrix as docs·heads planes of positions × dim without a copy, `UnheadsView` the inverse, `PlaneView` a plane as a `Matrix`, `Transposed3` every plane transposed, an `opr juxtaposition` on two `Array3`s as the batched product, an `opr +` of a matrix onto every plane, and the row lift overloaded over a rank-3 array. The reward is the attention block as six operator lines with no loop, no lambda and no copy. The price is ten view objects and the rank-3 algebra (about 60 lines), and a step 1.45× slower than C3's on the check (610 s against 420 s at one thread; 5.4 s against 3.7 s per batch-1 step), which C2 measured itself against round one's loops and accepted.

C3 keeps the per-head cells as block views and adds one lift, `cells(f, a, b, rowsPerCell, nCells)`, which applies a cell function to the (document, head) cells of its arguments and lays the results out in the same flat layout. The reward is 14 lines for the whole attention mechanism, nothing copied, and the fastest form measured. The price is the lambda in every attention line: the cell function has to be written out because an operator is not a value.

The two are the same decision seen from two sides: C2 lifted the operators to rank 3 so the model's lines stay operator lines; C3 lifted the model's lines over cells so the vocabulary stays at rank 2. On the brief's own test, the formula, C2's attention lines win; on the brief's cost note, four threads and copies, C3's win; on line count, C3's vocabulary wins.

## E. Machinery rulings

Where one round ruled a thing impossible or expensive and the other did it:

| ruling | by | what the other round shows |
|---|---|---|
| a strand assignment has no Fortress form; hyperparameters one per line (design.md) | C3 | C2 binds them as tuples in three lines (gap row 163). C3's ruling was wrong; it cited the array-literal row and never tried a tuple. |
| an array literal of matrices is pasting, so `flat` takes nine typed parameters (gap row 160) | C3 | C2 declares `flat(ms: Array[\RR64,(ZZ32,ZZ32)\]...)`, a varargs (gap row 161), one line. C3's ruling is true and its conclusion was not: varargs was never tried. |
| one declaration per operator per rank (14 operators, per AplCore) | C3 | C2's `opr +[\I\](a: Array[\RR64,I\], s: RR64)` serves every rank (gap row 162), 13 declarations. C3 never tried the index-generic form. |
| a `(Vector, Matrix)` row-scaling `×` beside the generic `×` is rejected (gap row 159) | C2 | true for the index-generic form; C3's per-rank family declares the rank-0-1 lift without conflict. Neither needs it: `diag(v) m` is the formula. |
| `Any` in a `nat`-generic signature is an interpreter bug, so no rank-by-result lift (gap row 157) | C2 | C3 did not try rank-by-result either; its `cells` keeps an `Array[\Any\]` of results and reads them through a `nat`-generic reader, which works. Both agree the program does not need it. |
| a postfix `^T` cannot be declared in an api (row 133) | both | agreed; C3 found the parser rule and that a plain postfix is accepted (`!`), so only exponent operators fail. |
| a call cannot be followed by `^T`, parenthesised or not (C2 158, C3 161) | both | agreed; C2 sidesteps it with a `transpose` function, C3 binds the value first. C2's is the better line. |
| the rank-3 form costs 1.4× on the attention block (C2 gap row 165) | C2 | C3's cells form costs 7 % over round one's loops on the same block (`att_REPORT.md`); the check confirms the gap at whole-program scale. |
| parentheses around a postfix in a product, `x1 (wq^T)` | C3 (a habit, not a ruling) | C2 writes `x1 wq^T`; the spec's precedence makes them the same. |

Three of C3's rulings were wrong or incomplete, all on the side of "Fortress cannot": the strand, the varargs, the index-generic operator. None of C2's rulings is contradicted by C3. That is the familiarity gradient of `navigation-retrospective.md` again, in the coordinating session that wrote the retrospective: the falsification gate was applied to the claims that came from probes and not to the ones that came from habit.

## F. Process and the brief

| | C2 | C3 |
|---|---|---|
| who | the blinded Fable session, one context, no delegation | the coordinating session with six Opus workers |
| wall clock | 60 min (54 from the go-ahead) | 56.5 min |
| output tokens, main thread | 939k (per transcript record, the basis of every earlier record) | 280k on the same basis; 133k per message (`11-run-c3.md` states both: the per-record sum double-counts messages split across records, and round one's 618k is 136k per message) |
| worker tokens | none | 170k output, 30M context, six workers |
| Fortress runs | about 42 | 22 by the coordinator, plus the workers' probes |
| blinding | one `git log -8` in turn 1 before the brief, disclosed; nothing else | not blinded, by design; C2's tree not read until it ended |
| the survey | a table in `design.md` with line numbers, 15 families | a worker's 531-line survey with 34 runnable checks, summarised in `design.md` |
| alternatives | three lift forms, two algebra forms, two attention forms with four variants, timed at one and four threads | three, two, three forms, timed at one and four threads, rendered, each with a report |
| gap rows | 11 (156–166) | 17 (156–172), replicated by a second worker with nine corrections |
| the tour | 28 rows, generator `tour/mktour.py` checks every snippet against the source | 31 rows, rendered by a worker; cells prefixed against glyph-id collisions |

What the delegation bought and cost (`11-run-c3.md`, delegation table): six workers, 11 to 19 minutes each, whose intervals cover 43 of the 56.5 minutes; the coordinator's own output was 133k tokens per message against C2's single context, and the workers' 170k on top. The critical path ran through the workers: the vocabulary component was written only after the first two probe reports and changed for the third, and the closing commits followed the render report by 25 seconds; the model, the data component and the check were drafted in the first twelve minutes while all four early workers ran. The main-thread cost per message is the same as round one's (133k against 136k) for a program that met the round-two brief where round one did not; the price is the worker budget, about 1.3 times the coordinator's own output.

Both followed the brief's process. C2's tour generator, which verifies that every rendered snippet is in the source, is a mechanism C3 does not have; C3's replication of its gap rows by a second reader is one C2 does not have.

## G. Against the field

The five runs of the microGPT-in-Fortress series that produced a checked program, in order:

| run | who | form | lines (program) | checks | wall | output tokens (main + workers) |
|---|---|---|---|---|---|---|
| blinded Fable (`06`) | Fable, blinded | scalar autodiff, sequence-level | — | 52 | 1 h 35 | 1.5M |
| B (`07`) | Fable, blinded | matrix-level autodiff | 396 | — | 1 h 31 | 1.8M + 36k |
| B2 (`08`) | coordinator + 5 workers | matrix-level autodiff, canonical | about 200 | 2 golden steps | 60 min | 770k + 110k |
| C (`09`) | Fable, blinded | native arrays, Hsu layout, explicit backward | 273 + 151 | 36 | 51 min | 618k |
| C2 (`10`) | Fable, blinded | three components, rank-3 views | 433 | 40 | 60 min | 939k |
| C3 (`11`) | coordinator + 6 workers | three components, cell lift | 385 | 36 | 56 min | 280k + 170k |

The pattern of B against B2 repeats with C2 against C3, and with the same shape: the coordinator's round is shorter in lines and cheaper in main-thread tokens, and its worker budget buys measured alternatives and replicated claims; the blinded round is more inventive on the language side (B's carriers, C2's index-generic operators, varargs, tuple-bound constants, rank-3 views), because it has no habits from the earlier rounds to carry. In both pairs the blinded round found mechanisms the coordinator ruled out. The difference from the B pair: C2 and C3 are much closer in quality than B and B2 were, because the C2 brief's forcing functions (the survey, the alternatives, the tour) did the work the B2 method did by hand.

## H. Adopt lists

Into C3's program, from C2, if a round four were run: tuple-bound hyperparameters (−11 lines); varargs `flat` (−4); index-generic operator declarations (−1, and one family instead of two); `x1 wq^T` without parentheses; a `transpose` function beside the postfix so that a call's result can be transposed in place; `diag(v) m` for the loss gradient; the tour generator that checks snippets against the source. With these the model is about 75 lines and the vocabulary about 100.

Into C2's program, from C3: the cell lift over block views for the attention block if the 1.45× matters (it halves the vocabulary's rank-3 machinery); the corpus object so that the keys line names the keys; `x DOT x` in the norms; the survey as a separate file with its runnable checks; a replication pass over the gap rows; the parser cause in row 133.

Into the APL side quest, from both: the flat-style microGPT in the APL sub-language needs rank 3 with `⍤2`, which C2's vocabulary now has as operators on `Array3` (the batched `+.×⍤2`, `⍉⍤2`, `+⍤2`, `sm⍤1` over planes) and C3's has as the cell lift; the program-specific APL design should be written against C2's rank-3 operators, which are the closer match to the glyphs.

## I. Overall judgement

[Filled after the Phase 1 review of C2 and the C3 record land.]
