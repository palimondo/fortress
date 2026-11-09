# Climb batch 29: the repair after the merged-diff review

Written 2026-11-09 on `main` above `13005a5734`, the judge's ruling (`explorations/compile-ladder/climb-batch-29/JUDGE-review.md`). The repair carries out the ruling's seven steps in order, in `/home/user/fortress`, after the gate there had ended (no `ant` or `java` process left under the tree), each call set up as `.claude/skills/fortress-repo/references/build-and-caches.md` says. Only `Specification/` and this folder's `RECORD.md` and this file are edited. No test is added and no ledger row changes. Nothing was built but the specification; one compiled probe was run (below).

## What was done, by the ruling's steps

| step | done |
|---|---|
| 1 | `Specification/appendices/changes.tex`, `revival-numerals`' Effect: the ruling's block replaces the text from "the interpreter runs the operator of" through "(row~956).", after the kept opening "The implementations depart from the text in these further ways, each with its row of the revival's gap ledger:" (`:5191-5207` now). Rows 958, 960, 963 and 956 keep their clauses; the negative constant names the compiled path (row 961) and the interpreter (row 968); a size of 2^31 or more read as a value names the compiled path's error and the interpreter's `ZZ64` (row 962). The sentence at `:5146-5149` stands. |
| 2 | `Specification/basic/expressions/ranges.tex`, the `\revision{revival-inference}` box: the ruling's qualification added after "(\secref{revival-numerals})", before the closing ".}" (`:56-60` now). |
| 3 | `Specification/appendices/changes.tex`, `revival-inference`'s Rationale: ", the interpreter one whose size is below $2^{31}$ (row~962 of the revival's gap ledger)" added after "\EXP{\mathbb{Z}32} (\secref{revival-numerals})", and the sentence rewrapped to the file's width of 80 (`:2237-2241` now, one line more); the rest of the sentence is unchanged. |
| 4 | `grep -rn 'used as a value\|row~961' Specification --include=*.tex`, before and after the edits: besides the passages of steps 1 to 3, the hits are `changes.tex:2127`, `:5055`, `:5111`, `:5146`, `:5281` and `:5351`, and `trait-parameters.tex:106-112`. Each states a decision, what a section gains, the kept Effect sentence of step 1, or quoted original text, so none is qualified. `grep -rn 'row~962\|row~968\|negative numeral\|negative constant' Specification --include=*.tex` finds besides them only `literals.tex:215`, the rule itself. |
| 5 | Built once after the gate had ended, `( cd Specification/fortress && ./ant genSource && ./ant tex )`: '209:BUILD SUCCESSFUL', 'Total time: 44 seconds', '20859:BUILD SUCCESSFUL', '20861:EXIT=0'; the warning `grep -c` of `specification.md`, "Building it", over `fortress.log` printed 0; 'Output written on fortress.pdf (715 pages, 2479317 bytes).' Then `git clean -fXq -- Specification`. |
| 6 | Committed locally on `main` as `58860ed41c`, not pushed. |
| 7 | One item added to `RECORD.md`, "The tests on the merged tree", after the item on the specification's build, and committed locally with this file, not pushed. |

## Deviation from the ruling

- Step 6 commits "the three edited `.tex` files". Steps 1 to 3 edit two files, `Specification/appendices/changes.tex` (steps 1 and 3) and `Specification/basic/expressions/ranges.tex` (step 2): `git show --stat 58860ed41c` prints "2 files changed, 20 insertions(+), 13 deletions(-)". The commit holds both.

## The new sentences against the tree

- The compiled half of step 1's "so that a type without \EXP{-} takes it", which the Effect did not say before: a scratch program, `value object Bare(n: ZZ32)` with `coerce(lit: IntLiteral) = Bare(lit.asZZ32)` and no `-`, binding `b: Bare = -3` and `c: Bare = 5 - 8`, compiled and run on the merged build (`bin/fortress compile`, then `bin/fortress run`) printed 'bare  -3' and 'bare2  -3', 'EXIT=0'.
- Walk's halves rest on the review's probes at `1d50c6bbbf` ('t 1 -3' for `t: Tally = -3` and for `t: Tally = 5 - 8`, 'w 7' for `w: Written = -3`, 'big ZZ64 3000000000'), which the ruling cites. No code has changed since: `git diff --stat 1d50c6bbbf 13005a5734 -- ProjectFortress Library build.xml` prints nothing. The causes are in the code: `INTEGERLITERALFOLDING` in `interpreterPhaseOrder` (`ProjectFortress/src/com/sun/fortress/compiler/phases/PhaseOrder.java:130`), and walk's site taking the signed `x.getIntVal()` as the digit value while it counts the digits without the sign (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Numerals.java:160-179`).
- An `int` size of 2^31 or more never reaches a use as a value under walk: walk refuses it where it binds the size (F-140; `ProjectFortress/tests/XXXIntBeyondZZ32Walk.fss`, an expected failure). So the interpreter's `ZZ64` clause of steps 1 to 3 is about a `nat` size between 2^31 and 2^32-1, and the sentences hold as the ruling wrote them.
