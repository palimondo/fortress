# Run C4: the synthesis of rounds two and three

C4 is a merge, not a new design. Phase 2 of the C series (`explorations/reviews/run-c2-vs-run-c3.md`, section H) listed what each of the two working programs should take from the other; C4 is those two lists applied to one tree, under the same check and the same goldens, so that the APL side quest has one target program. The decision and its reasons are in `explorations/microgpt-run-c-handover.md`.

## What was merged from where

| piece | taken from | why |
|---|---|---|
| the data side: `FlatData` with the float parser, the loaders, `loadParams(dir, name, count, total)` and the `Corpus` object (`tokens`, `positions`, `valid`, `size`, `length`, `token`) | C3, unchanged but for the header | the keys line of the step names the keys (`ids`, `tg`, `vm`, `pos`) as methods of one object where C2 spelled them as `gather`, `ravel`, `block` and `valid` over two globals; the loader reads the nine files straight into the flat vector, so the model has no load function |
| hyperparameters six to a line, untyped, separated by semicolons | neither: Pavol's suggestion after the merge | a top-level declaration takes its literal's type, and the semicolon separates declarations as it separates statements (`probes/semicolon`, gap row 175); C2's tuple bindings (row 152) were a trick for the same effect, C3's fourteen typed lines a habit |
| the layout table `matName`, `matShape`, `matCount`, `matOffset`, `nParams`, `view(p, i)` | C2 | `matShape` returns the pair, as Hsu's `SHP` holds pairs; C3's `matRows`/`matCols` is the same table split in two |
| `x DOT x` in `rmsn` and `rmsn_b` | C3 | `+/⍵*2` is the dot product; the generator `SUM[t <- x] t^2` is a loop in disguise |
| `SUM e` in `sm` | C3 | ledger row 102: `SUM v` parses as a prefix reduction; `BIG MAX` does not and stays a generator |
| varargs `flat` | C2 | ledger row 130; C3's nine typed parameters were a habit |
| one declaration per elementwise operator, generic in the index type `I` | C2 | ledger row 161: `opr +[\I\](a: Array[\RR64,I\], s: RR64)` serves every rank; C3 had a vector family and a matrix family |
| `transpose` as a function beside the postfix `^T` | C2 | a call's result cannot be followed by `^T` (rows 144, 158); `transpose(onehot(…)) dX` reads, `(onehot(…))^T` does not parse; `^T` stays in the model because an api cannot declare an exponent-shaped postfix operator (row 133) |
| `diag(v) m` for the loss gradient | C2 | `(vm÷nv)×⍤0 1` is a row scaling; a `Diag` object with its own juxtaposition never forms the matrix; C3's `rows(fn (w, r) => w r, vm / nv, …)` is a lambda for a product |
| `x1 wq^T` without parentheses | C2 | postfix binds tighter than juxtaposition; C3's `x1 (wq^T)` was a habit |
| the attention block as operators on rank-3 values: `heads`/`unheads` views, `^T` on every plane, the batched juxtaposition, `mask + t`, `rows` over planes | C2 | the target form for the APL round, where `⍤2` over per-head cells is the rank operator over plane views; C3's `cells` lift is faster (1.45× on the check) and is recorded as the alternative, not adopted |
| the check: C3's 36 checks plus C2's four single-document losses, 40 in all | both | one file, the same goldens in `explorations/run-c/goldens` |
| the tour generator `tour/mktour.py` that checks every snippet against the source | C2 | with its one fault fixed: the inlined SVGs' glyph ids are now prefixed per cell, so the text no longer garbles where two cells share an id (`reviews/run-c2-phase1.md`); the page it writes uses C3's layout (formula and Fortress side by side, Dyalog and note beneath, so the renders stay legible) and the renders take the theme's ink, since dvisvgm's paths carry no colour; C3's page was given the same theme-aware renders |

Dropped from C2's vocabulary because the corpus object made them unnecessary: `Block`/`block`, `Ravel`/`ravel`, the vector overload of `gather`, `valid`. Dropped from C3's: `zerosM`, `zipV`/`zipM`, the per-rank operator families, the scalar-result and the vector-matrix `rows` overloads, `cellOf`/`colsOf`/`nth2`/`cells`. Added after the merge, on Pavol's suggestion: the semicolon form of the hyperparameter lines, which neither round had.

## The components and the line budget

Code lines, blank and comment-only excluded, counted by the script of Phase 2 section C:

| | C2 | C3 | C4 |
|---|---|---|---|
| model | 82 | 91 | 71 |
| the step inside it | 24 | 22 | 20 |
| vocabulary | 163 | 109 | 141 |
| data | 101 | 101 | 101 |
| check | 87 | 84 | 85 |
| the three apis | 67 | 66 | 70 |
| total, components and check | 433 | 385 | 398 |

The model is 11 lines under C2's and 20 under C3's; Phase 2 forecast "about 75". The vocabulary is 22 lines under C2's and 32 over C3's: the rank-3 machinery (five view objects and two operators, 62 lines) is the price of the attention block as operators, paid on purpose. The step is 20 lines against the Dyalog's 16 (L13 to L28), the difference being the two local views `h` and `u`, the two-line strand of the nine views, and the closing tuple.

## The step, line for line

The tour (`tour.md`, `tour.html`) sets every Dyalog line beside its formula and its Fortress. The lines that differ from C2's are the norms (`x DOT x`), the softmax (`SUM e`), the keys line (the corpus object), the loader (the driver's three lines) and the corpus binding; from C3's, everything from the strand of hyperparameters through the attention block.

## The check

`src/MicroGptFlatCheck.fss`, 40 checks against `explorations/run-c/goldens` at tolerances 1e-12 on losses and gradients and 1e-8 on finite differences: the loader against P0, the corpus against sixteen golden rows, five batch-1 Adam steps (losses, the step-0 gradient, the weights after Adam, the zero-gradient count), batch 4 (the loss, the four single-document losses, the token-weighted mean), and central finite differences at eleven golden indices for document 0 and for batch 4. Run at pool sizes 1 and 4 (`checks/threads1.txt`, `checks/threads4.txt`): 40 PASS, 0 FAIL, exit 0 in both; 873 s and 396 s; the two outputs differ only in the header's pool size and the timing fields (`diff` after stripping the `( … ms)` fields and the `total` line).

## Cost

| | C2, its own host | C2, this host (re-run by the review) | C3, this host | C4, this host |
|---|---|---|---|---|
| check, pool size 1 | 610 s | 941 s | 420 s | 873 s |
| check, pool size 4 | 247 s | 377 s | 248 s | 396 s |
| batch-1 step, pool size 1 | 5.4 s | 8.2 s | 3.7 s | 8.0 s |
| batch-4 step, pool size 1 | 19.0 s | 29.3 s | 13.5 s | 28.2 s |
| batch-1 step, pool size 4 | 2.0 s | 3.1 s | 1.6 s | 2.9 s |

C4 costs what C2 costs: on this host C2's re-run (`reviews/run-c2-review-probes/recheck_threads1.txt`, taken under the review's own probe load) and C4 agree to within 8 % on every figure, and the pieces C4 took from C3 (the corpus object, `x DOT x`, `SUM e`) are outside the hot path. C2's own 610 s came from the blinded session's host, which the Phase 1 review put at about 1.5× this one. That also corrects a figure in Phase 2: its "1.45×" for the rank-3 attention set C2's own-host 610 s against C3's this-host 420 s. On one host the rank-3 form costs 2.1× C3's cell lift (8.0 s against 3.7 s per batch-1 step, 873 s against 420 s), the price of the target form for the APL round, paid knowingly. The pool-size-4 figures were taken while nothing else ran; the pool-size-1 run overlapped with the tour work (screenshots and a page rebuild), so its 873 s is an upper bound.

## What the type annotations are for

Pavol asked whether the model's annotations are necessary, given that the interpreter infers types. The probe (`probes/types`, seven variants of the model with one category removed each) says: only the declared type of a mutable local is required (`p: Array[\RR64,ZZ32\] := …` in the driver; without it the `:=` is not a declaration and `var p = …` is refused, gap row 177). Return types, lambda annotations, the types on the `mask` and `corpus` bindings, the parameter types of the four vector functions handed to `rows` and of the local `h` and `u`, and even the parameter types of the api-declared functions in the component can all be removed at once and the five losses stay identical (rows 176, 178). The model keeps them by choice, not need: the api-declared signatures state the contract where the reader looks for it, and the vector functions' `Array[\RR64,ZZ32\]` says what a row is. The hyperparameters, which were the annoyance, carry none.

## What C4 settles for the APL round

The flat-style program `explorations/apl/reference/hsu-flat/microgpt_concise.dyalog` maps onto C4 as follows, and the program-specific APL design (`explorations/apl/microgpt/DESIGN.md`) starts from this table: `h` and `u` are `heads` and `unheads`; `+.×⍤2` is the batched juxtaposition; `⍉⍤2` is `^T` on an `Array3`; `MK+⍤2` is `mask + t`; `sm⍤1` and `rmsn⍤1` are `rows`; `×⍤0 1` is `diag`; `⌷⍤0 1` is `pick`; `∘.=` is `onehot`; `⊃,/,¨` is `flat`; `v¨⍳9` is the strand of `view(p, i)`; `TOKM[b;]`, `LEN[b]∘.>⍳BLK` and `N⍴⍳BLK` are the corpus object's methods; `⎕NREAD` is `loadParams`; `M∘←`, `V∘←`, `P∘←` are the returned triple of `adam`.

## Process

Written in the coordinating thread from the two sources in one pass; the merged model compiled and ran on the first attempt (five steps, the losses equal to the oracle's to fifteen digits). Two Opus workers were sent out: one rendered the tour and verified the HTML (the glyph-id check and a by-eye pass over a screenshot); the other was to run the check at both pool sizes, but its run died when the worker stopped to wait on it, six checks from the end, so the coordinating thread ran both checks itself, sequentially, under a monitor that outlives the shell's ten-minute limit. A third worker later gave C2's tour page C4's page section, after Pavol asked for it. No probes were needed for the merge: every mechanism in C4 was already proven in C2 or C3. Two probes followed Pavol's questions: `probes/semicolon` (a ten-second syntax check, run in the thread) and `probes/types` (a worker's seven variants of the model with one category of type annotation removed each). New gap rows: `gaps.md`.
