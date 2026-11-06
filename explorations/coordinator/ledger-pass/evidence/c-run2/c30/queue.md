# c30 queue (base c124c6b65)

1. **Does walk still refuse an array argument at `T[n]` with a `nat` parameter (gap-ledger row 23)?** The row's only run predates the walk changes to unification (`FType.java`, touched by 153887360 and 369982d85), and its probe is gone. No prober ran it in the ledger pass c-run2. The question, its program (`RvwNatArray.fss` from `e879b6a44^`), the command and the line each outcome gives are in `tmp/ledger-pass/c-run2/c30/questions.md`, "Row 23".
   - Landed: the row's present line, held.
   - The other way: measure it under walk, then rewrite (gap stands, pinned at `FType.java:576`), close (fixed) or rewrite to the new message.
   - Its cost: one walk run of a ten-line program.
   - Home: `tmp/ledger-pass/c-run2/c30/questions.md`, `assessment.md` and `check.md`, "Row 23"; FACTS F-20
   - Needed by: the ledger pass's measurement run.
   - Present line: 
     | 23 | `T[n]` with a `nat` parameter does not unify with a runtime-built array; a literal size does | NEGATIVE-VERIFIED | implementation gap (walk) | `basic/trait-parameters.tex`, "Nat and Int Parameters" | none | blinded | `Cannot unify __DefaultVector[\RR64,3\] with ArrayType`. Probe `explorations/fable-review-probes/RvwNatArray.fss`, in the parent of `e879b6a44`. |

2. **Is a cycle of coercions still accepted, on each path (gap-ledger row 393)?** The row's run is from climb batch 4; the checker's coercion code changed in many later batches, though a grep of `scala_src/typechecker/` at c124c6b65 finds no cycle check. No prober ran it in c-run2. The row's sentence "no test can gate it" is wrong whatever the outcome: an `XXX` compile test with `compile_err_contains` gates a missing refusal. Question, program (`SkCycle.fss` from `ab067d9b6^`), commands and outcomes: `tmp/ledger-pass/c-run2/c30/questions.md`, "Row 393".
   - Landed: the row's present line, held.
   - The other way: measure on both paths, then rewrite (with the owed `XXX` compile test), close, or rewrite to the other refusal.
   - Its cost: one compile and run, one walk run.
   - Home: `tmp/ledger-pass/c-run2/c30/questions.md`, `assessment.md` and `check.md`, "Row 393"
   - Needed by: the ledger pass's measurement run.
   - Present line: 
     | 393 | a cycle of coercion declarations is accepted on both paths: with `P` declaring `coerce(x: Q)` and `Q` declaring `coerce(x: P)`, `fp(QOf(1))` and `fq(POf(2))` print 1 and 2, compiled and under walk | NEGATIVE-VERIFIED | implementation gap (checker) | `basic/conversions-coercions.tex`, "Restrictions on Coercion Declarations" | none | climb batch 4 rung C's skeptic | The specification rejects such cycles statically. The compiled checker, beside its coercion-overloading checks, does not check the extends-plus-coerce graph for cycles; walk has no checker. The answer is a static error, so no test can gate it. Walk refused the program before rung C only because it had no coercion. Probe `explorations/compile-ladder/rung-interp-coercion/probes/skeptic/SkCycle.fss`, no longer in the tree. full text: history, row 393 |
