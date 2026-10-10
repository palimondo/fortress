# Climb batch 13b: the checker-speed fix and fork 2's library half, landed outside a batch

Landed on `main` on 2026-10-10, outside a batch, at the curator's word, from the main tree with no batch running. An independent read of the fix was done alongside: the skeptic's review of `fix.patch` and of its report, `explorations/perf-probes/checker-speed/SKEPTIC.md` (`71c082724`), "Approved with fixes". Its fixes are of style and test coverage, none changing an answer (its findings 1 to 4), and none is applied here: the patch landed as it stands.

## What landed

| commit | what | from |
|---|---|---|
| `3c67d5204` | The checker-speed fix: a memo on `TraitTable` that shares the True or False subtype and exclusion answers whose computation read neither the kind environment nor the cycle history, behind `fortress.analyzer.ground.cache`, default on; tests `compiler_tests/XXXBoundCheckSameNameTwoScopes` and `OverloadTwoBoundsClosedFamily` (row 688) | `explorations/perf-probes/checker-speed/fix.patch` (`c5098915c`), applied with `git apply`; the code under `ProjectFortress/`, `Library/` and `build.xml` unchanged since `7c9fd1833`, its base |
| `749ec523e` | Fork 2's held library half (Q13.2's default, PLAN item 52): the array family under `T extends { Number, MultiplicativeRing[\T\] }`, the scalar block a bound per operator, `matrix(v)` writing `v.zero`; `tests/ArrayElementAlgebra.fss`'s `matrix(v)` assertions for `RR32`, `NN32` and `NN64` | the reverse of `816251130`'s diff on `Library/FortressLibrary.fss`, `.fsi` and `ProjectFortress/tests/ArrayElementAlgebra.fss`, applied with `git apply -R`: its changed lines are `d3d31b5b2`'s on those files, the test file equal to `d3d31b5b2`'s; none of `816251130`'s checker part |
| `d96bc7776` | The gate's tables, `gate/summary.txt`, `checker-count.txt`, `distance.txt` and `ladder/`, and the per-site list `explorations/compile-ladder/gate/distance-sites.tsv` | the gate below |

The records (the ledger, FACTS and PLAN) follow in the commit after this record's.

## Test first, by pointer

- **The speed.** Failing: with the library half and without the fix, the count stage's checker stays in `checkApi FortressLibrary` about 17 minutes, past the stage's 900 s limit (`compile-ladder/rung-array-bound/REPORT.md` section 7, two runs); on a pair taken in one session, the count stage 1,432 s without the fix and 371 s with it, the distance stage 4,551 s and 1,885 s, every answer identical (`perf-probes/checker-speed/REPORT.md` section 7). Passing: the count stage at this gate, 387 s (below).
- **The fix's two tests.** Their runs with and without the fix, and on a variant that shares every answer: `perf-probes/checker-speed/REPORT.md` section 8.
- **The bound's tests.** `ArrayElementAlgebra` failing on the base's library and passing with the half, and the half's walk tests: `compile-ladder/rung-array-bound/REPORT.md` section 2.
- **Here, once, on the built tree** (after `ant compileAll`, "BUILD SUCCESSFUL", "Total time: 41 seconds", the caches started again, and the library order, five compiles each `rc=0`, five jars):

      ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh land13b ProjectFortress/compiler_tests XXXBoundCheckSameNameTwoScopes.test OverloadTwoBoundsClosedFamily.test
      . compile ProjectFortress/compiler_tests/BoundCheckSameNameTwoScopes ProjectFortress/compiler_tests/BoundCheckSameNameTwoScopes.fss:12:26-31:
       Saw expected failure
      . run ProjectFortress/compiler_tests/OverloadTwoBoundsClosedFamily (1193ms) PASS
      OK (4 tests)

      explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/land13b-h1 ProjectFortress/tests/ArrayElementAlgebra.fss
      . interpret tmp/land13b-h1/tests/ArrayElementAlgebra
       OK (time = 20985ms)
      OK (1 test)

## The gate, against batch 13's

The full gate ran once, on the tree of `749ec523e`, as one background script from 05:42 to 06:20 UTC (the skill's `gate.md`; the workflow's gate and commit stages): nproc 4, Intel Xeon @ 2.10 GHz, OpenJDK 25.0.4.1, `FORTRESS_THREADS=1`. The distance stage ran beside the suites from the build on, as the workflow runs it.

| | batch 13 (`climb-batch-13/gate/`) | 13b (`climb-batch-13b/gate/`) |
|---|---|---|
| build | BUILD SUCCESSFUL | BUILD SUCCESSFUL |
| `testFast`: compiler, library, othercompiler | 1,114, 86, 263, no failure | 1,118, 86, 263, no failure (the two new tests, 1 and 3) |
| `testFast`: misc | 45 classes, no failure | the same 45 rows |
| `testSystem` | 580, no failure | 580, no failure |
| `testSpecData` | 130, no failure | 130, no failure |
| `gate_compare` | | no line |
| atomic runs, four threads | 42 PASS | 42 PASS |
| ladder regression | no line | no line |
| checker count | 1, `#crash none` | 1, the table identical; its one error `FortressLibrary.fss:1311:10: Missing parameter type for i`, `body(i)`; the stage 387 s against its 900 s limit |
| distance | 105 | 85: typecheck 94 to 72, well-formedness 6 to 8; V1 25 to 2, V2 16 to 17, OT 13 to 16, I3 3 to 2; component `FortressLibrary` 99 to 79; the two `decl` crash rows the same |
| distance's time | 1,429 s, `FortressLibrary` 819 s | 2,246 s, `FortressLibrary` 1,318 s |
| microGPT quick walk checks | 7 PASS of 7, twice | 7 PASS of 7, twice |

By site, `distance-sites.tsv` against batch 13's, keyed by location and message: 24 gone, the fork's 23 arithmetic and block sites (`Library/FortressLibrary.fss:2402-2410`, `:2710-2781`, `:4756-4766`) and row 437's `:2841` ('Function body has type OR(IntLiteral,T)'); 4 come: `:2406`, `scale`'s parent-trait result, 'Function body has type Array1[\T,0,s0\], but declared return type is Vector[\T,s0\]', which its arithmetic error hid; `:2490`, the norm's `squaredNorm(me)` refused as 'not applicable to an argument of type Vector[\T,k\]' (row 686); and at the factories `:2461` and `:2838` a second error each, 'does not satisfy the corresponding bound MultiplicativeRing[\T\]', beside the one for `Number` (row 685). The prototype's distance with the half was 85 (`perf-probes/checker-speed/REPORT.md` section 7).

Against the prototype's figures: the count, the stop at `:1311` and the distance are the same. The stages' times are higher than the prototype's idle pair: the count 387 s against 371 s, the distance 2,246 s and `FortressLibrary` 1,318 s against 1,885 s and 1,032 s, with the suites running beside it. A gate's distance is not a pair with the prototype's.

## Decisions taken here

- The gate's `ladder/` folder lands with the three tables, as the commit stage and `gate.md` give a landed gate's form.
- Row 688 closes with `OverloadTwoBoundsClosedFamily` as its test, since `ledger.py close` takes only a file under the test folders; its note names the count stage as the row's test, as rung M's memo had it (row 370).
- Row 437 closes with the library half, by `ArrayElementAlgebra`, since the landed library writes `v.zero` and its site is off the distance.
