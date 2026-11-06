# Queue, c-run4's probe

## Row 547: which commit removed the order dependence?

The row is applied as `CONTESTED` (line in `final.rewrite`). Both runs at c124c6b65 refuse `SkFnBetween`, 'Invalid overloading of choose in trait M', alone and after `CoverageReturnGood.test` in one JVM (`runs.md`, row 547). The close that this supports needs the commit that removed the dependence, and naming it takes builds of earlier trees, which a probe does not make. Candidates since `ae4f8e38a` that touch the checker's memos (`git log ae4f8e38a..c124c6b65 -- .../TraitTable.scala .../TypeAnalyzer.scala`): `ee6bfcb8d` (formulas reduced once, memos) and `3c67d5204` (subtype and exclusion answers shared per trait table). Question for a worker: for each candidate X, build `X^` and `X` in a worktree and run the two `fortress junit` lists of `runs.md`; if `X^` accepts after `CoverageReturnGood` and `X` refuses, close 547 with X and test `none` (no gated test runs the pair in this order outside `XXXFunctionalMethodMeetBetweenTraits`); if every pair refuses, bisect over the earlier checker commits since `ae4f8e38a`; if no tree since the row shows the dependence, the close's commit is the curator's question, since the row said "No pin". Default: the applied `CONTESTED` line.

## Row 255: held, the check's correction of c34's line

c34's applied line says "with it case (b) of `w02_lib.fss` and `Rung6.fss` `Z13` pass, with `explorations/apl/base` on the source path"; this run's probe at c124c6b65 stops `w02_lib.fss` at load: the overloading of `BY` at `AplCore.fss:1209:1-1211:80` and the library's at `Library/FortressLibrary.fss:462:5-64` 'fails because their parameter lists have the same types' (`runs.md`, row 255). Held here only because `apply.py` would apply c34's line after this chunk's. Proposed: after c34's rewrite lands, rewrite 255 with this line (957 characters):

| 255 | a comparison of two SCALARS is the host's `Boolean`, not APL's 0/1, so a dfn operand like `{⍺<⍵}` under `¨` or `∘.` hands a `Boolean` to an assemble-by-cell and the scalar contract refuses it | NEGATIVE-VERIFIED | design limit (library) | silent | none | apl rung 6 | siblings: 218. `RR64`'s `opr <` (`Library/FortressLibrary.fsi:180`) returns `Boolean` and the APL base declares no `(RR64, RR64)` comparison, so only scalar against scalar is not 0/1. The first run of `explorations/apl/rung-6/w02_lib.fss` died with a `CallerViolation` from `aplAsmV`'s `requires { aplAllScalar(rs) }` (`explorations/apl/base/AplCore.fss:1698` at c124c6b65). Workaround, in place: `aplIsScalar` accepts a `Boolean` and `aplScalarOf` maps it to 1.0 / 0.0 (`AplCore.fss:1685-1688`); with it case (b) of `w02_lib.fss` and `Rung6.fss` `Z13` passed (`rung-6/PROBES.md`); at c124c6b65 `w02_lib.fss` stops at load (`AplCore.fss:1209`'s `BY`). full text: history, row 255 |

Default: c34's line as it applies.

## Finding for the curator, not a row of this run: the APL base no longer loads under walk

`explorations/apl/base/AplCore.fss` calls `fill` with a function at lines 52, 54, 77, 350, 1053, 1071 and 1213, a form that f3b62bc83 renamed `tabulate`; so every APL probe that imports `AplCore` stops at load at c124c6b65 ('Closure/Constructor for fill param 1 (v:RR64) got arg FnExpr', `runs.md`, row 221). With the rename in a scratch copy, `r13_generator.fss` stops next at `AplCore.fss:42` (`1.0 (\|\ v /\|)` with a `ZZ64`). And `explorations/apl/rung-6/w02_lib.fss` stops at load on `AplCore.fss:1209`'s `BY(a: RR64, b: RR64)`, which now collides with the library's `BY` on `RR64` (`Library/FortressLibrary.fss:462`). The rows whose reproducers are APL probes (221, 255, the c44 rows) cannot be measured until the base follows the library. Not opened as a row: that is a change of the record the landing or the curator makes. Default: no row.

## Finding: walk does not refuse a type that extends two instantiations of one generic trait

`RpFJoin` (row 555) declares `object Apple extends { Red, Round }` with `Red extends Cmp[\Red\]` and `Round extends Cmp[\Round\]`; walk at c124c6b65 loads it and fails only at the call. No open row of the ledger names two instantiations of one trait; the curator or a worker can place it. Default: no row.

## XXX tests that now pass

None found: no question of this run ran an `XXX` test.
