# Rung R: record lines for the gather

Finished prose, ready to paste. Nothing here was written into the coordinator's files. Line numbers are today's, on the base `d610695c0`. Every cited line also names its symbol, for re-anchoring: rungs L and C edit `Library/FortressLibrary.fss` and `.fsi`, but only below the lines cited here.

## FACTS.md

One bullet, under "The compile-path ladder baseline", after the last rung entry:

- **`round` on a float sends an exact half to the even integer on both paths as of rung R of climb batch 3** (2026-09-22, `compile-ladder/rung-round-half-even/REPORT.md`). The interpreter's two float natives, `Float$Round` and `RR32$Round`, are now `(long) Math.rint(…)` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Float.java:384`, `RR32.java:326`), the call the compiled path's `simpleDoubleArith.doubleRound` has made since rung F (`nativeHelpers/simpleDoubleArith.java:132-134`). A float literal reaches `Float$Round` through `trait Number`'s `round` body (`Library/FortressLibrary.fss:422`), so those two natives are every float `round` in `walk`. `walk` now answers `round(2.5) = 2`, `round(-3.5) = -4`, `round(0.5) = 0` and `round(-1.5) = -2` on `RR64`, and the same plus `round(4.5) = 4` on `RR32`, gated by `ProjectFortress/tests/RoundHalfEvenRungR.fss` (21 assertions). Its compiled twin prints the same eleven `RR64` lines as `walk` (`compile-ladder/rung-round-half-even/probes/RoundHalfEvenCompiledProbe.txt` against `RoundHalfEvenWalkProbe-after.txt`). At NaN (0), at ±∞ and beyond 2^63 (saturated to `±(2^63-1)`/`-2^63`) nothing changed on either path. `testSystem` has 385 tests; the new file is shard 3's.

## Ledger note

Append to the notes of **row 329**; no new row:

> **Fixed \<short hash\> (rung R of climb batch 3, 2026-09-22, `compile-ladder/rung-round-half-even/REPORT.md`).** `Math.round(x)` → `(long) Math.rint(x)` in `Float$Round` (`Float.java:384`), and the same token in `RR32$Round` (`RR32.java:326`). `RR32$Round` is the second float native of the same 2008 commit `e67394471`, and this row's text did not name it. Gated by `ProjectFortress/tests/RoundHalfEvenRungR.fss` (RR64 literal and `Float` operands, and RR32). It is red before the edit (`probes/failure-before-edit.txt`: `a Long: 3 =/= a Int: 2`) and green after (`probes/pass-after-edit.txt`, and `OK (1 test)` under `SystemJUTest` in `probes/harness-after-edit.txt`). `walk` and the compiled path now print the same eleven `RR64` values, ties and edges (`probes/RoundHalfEvenWalkProbe-after.txt` against `probes/RoundHalfEvenCompiledProbe.txt`). Some line numbers in this row have moved:
> - the rational body (`trait QQ`'s `round`) is at `Library/FortressLibrary.fss:592`, not `:589`;
> - `trait Number`'s `round` is at `:422`, not `:419`;
> - `trait QQ` is at `Library/FortressLibrary.fsi:373`, not `:370`;
> - the compiled pin (`round 2.5 = 2`) is at `ProjectFortress/library_tests/RR64FunctionsRungF.fss:87-90`, not `:98-101`.

## Handover state line

For "Where the work stands":

> Rung R (`rung-round-half-even`) landed: `round` on a float sends an exact half to the even integer on both paths. `Float$Round` and `RR32$Round` are `(long) Math.rint`, gated by `tests/RoundHalfEvenRungR.fss`, and ledger row 329 is closed. `testSystem` is 385 tests. Row 330, the ℤ return type, stays open by Pavol's instruction.

## For the coordinator, not for the record

- **Two worktrees were missing.** When this rung started, neither `/home/user/fortress-round` nor the branch `wip/rung-round-half-even` existed, locally or on `origin`. `/home/user/fortress-comments` (rung C) was missing too. This rung created its own from `d610695c0` with the recipe in `explorations/coordinator/remote-container.md:102-110` and pushed the branch (REPORT.md, "What I inherited"). The commit stage's worktree removal will find it in the usual place.
- **A new file for the next full-corpus ladder.** On the compiled path `tests/RoundHalfEvenRungR.fss` stops at typecheck with 28 errors: 21 for the missing `assert(Any, Any, String)` and 7 for `narrow` on `RR64` (`probes/RoundHalfEvenRungR-compiled.txt`). It is a new row in a future full-corpus baseline, not a move, and it is not in the gate's 85.
