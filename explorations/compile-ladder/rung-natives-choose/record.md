# Rung K, rung-natives-choose: record lines for the gather

## Findings

1. **Trait `ZZ32`'s and trait `ZZ64`'s `CHOOSE` now name their helpers on both paths, and the helpers are exact and keep no shared state.**
   - Claim: `opr CHOOSE` names `com.sun.fortress.nativeHelpers.simpleIntArith.intOverflowingChoose` in trait `ZZ32` (`Library/FortressLibrary.fss:789`) and `com.sun.fortress.nativeHelpers.simpleLongArith.longOverflowingChoose` in trait `ZZ64` (`:882`). Each helper gives the binomial coefficient, 0 where `k < 0` or `k > n`, and `IntegerOverflow` exactly where the coefficient does not fit its type. Each slow-path call has its own scratch array.
   - Conditions: on the tree of `00e620a3f`. Walk calls the helpers through these bindings. The compiled path calls them through the prelude (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:741`, `:652`), and also, through the `ZZ64` helper, for `NN32` (`:806`, `simpleUnsignedIntArith.java:80-82`). It reaches the one library's bindings only after the switch-over.
   - Evidence: the fix is at `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:162-163` and `:210-213`, and `simpleLongArith.java:136-137` and `:183-186`. The tests pass on the fix and fail on the base:
     - `harness-one.sh` on the base: 'Wrapped exception java.lang.ArrayIndexOutOfBoundsException: Index 15 out of bounds for length 15', '... Index 32 out of bounds for length 32', 'Tests run: 5,  Failures: 2'. On the fix: 'OK (5 tests)'.
     - `junit.sh` on the base: 'Tests run: 7,  Failures: 3'. On the fix: 'OK (7 tests)'.
     - The tests: `tests/ChooseHelperWalk.fss`, `tests/ChooseHelperZZ64Walk.fss`, `compiler_tests/ChooseHelperCompiled`, `compiler_tests/ChooseHelperZZ64Compiled`, `compiler_tests/ChooseTableCompiledRungE`, and the guards `tests/ChooseZZ32Walk.fss` and `tests/ChooseZZ64Walk.fss`.
   - What it means: rows 521 and 855 close. The compiled path meets P-73 at `CHOOSE`. 23 of the one library's 449 live bindings name a helper on this rung's tree.

2. **The `ZZ64` helper is exact in one thread, and its safe-bound table is right. On the base, only its raise past the table was wrong.**
   - Claim: on 64,649,240 argument pairs, the base's `simpleLongArith.longOverflowingChoose` gave all 54,721,226 fitting coefficients exactly, and threw `ArrayIndexOutOfBoundsException` at 1,865,442 of the 9,928,014 overflows, the first at `68 CHOOSE 34`. The fixed helper equals the exact value, and walk's `Long$Choose` arithmetic (`Int.choose`), on every pair.
   - Its table `maxLongChooseSafeN` equals the largest safe `n` of the fast loop for `k` = 2 to 30. Its entries for `k` = 31 to 33, all 61, lie below `2k`, so those `k` take the slow path.
   - Conditions: one thread; a scratch Java probe in a bare JVM, where walk's `overflow()` shows as a `NullPointerException`. The pairs: every pair with `-3 ≤ n ≤ 1000`; `k` and `n-k` for `k` ≤ 40 up to `n` = 130,000, and for `k` ≤ 3 up to `n` = 3,900,000; the table's edges at `k` = 2 and 3; `MAX`, `MIN` and `2^62` against 14 values of `k`.
   - Evidence: base 'helper: {BAD-exception-on-overflow=1865442, ok-overflow=8062572, ok-value=54721226}'; fixed 'helper: {ok-overflow=9928014, ok-value=54721226}' and 'walk: {ok-overflow=9928014, ok-value=54721226}'. The table check is a Python probe against `math.comb` ('k= 2 team=3037000500 computed_safe=3037000500' ... 'k=30 team=61 computed_safe=61'). Detail: `explorations/compile-ladder/rung-natives-choose/REPORT.md`, section 5.
   - What it means: moving `ZZ64`'s `CHOOSE` onto its helper changes no value that walk gives.

3. **The `ZZ64` helper's race, measured in Fortress on both paths.** The probe measured it only in Java.
   - Claim: on the base, `n CHOOSE 2` for 20,000 values of `n` from 3037000501, in a parallel loop over the `ZZ64` helper bound by the program, failed in 3 of 3 walk runs and 3 of 3 compiled runs, with 9 to 21 wrong values a run. Two compiled runs ended in `java.lang.UnknownError`. After the fix, 0 failures in 3 runs on each path.
   - In Java, from a thread pool, the base gave 0 wrong values in 250,000 calls at 1 thread; 14 wrong values and 6 exceptions at 2 threads; 144 and 95 at 4 threads. The fix gave 0 and 0 at each count.
   - Conditions: `FORTRESS_THREADS=4` through `harness-one.sh` and `junit.sh`; scratch copies of `ChooseHelperZZ64Walk` and `ChooseHelperZZ64Compiled` holding only the loop.
   - Evidence: 'FAIL: a Long: 2305862669309426946 =/= a Long: 4611711385081683378; 3037008853 CHOOSE 2 in a parallel loop'; Java 'threads 4, calls 1000000, wrong values 144, exceptions 95'.
   - What it means: row 855's `ZZ64` half is measured on both paths, and its test is the loop of `ChooseHelperZZ64Compiled`, whose `ZZ64Walk` counterpart is `ChooseHelperZZ64Walk`.

4. **`NN32`'s compiled `CHOOSE` past the table, the third half of row 521, now raises `IntegerOverflow`.**
   - Claim: on the base, `unsigned(68) CHOOSE unsigned(34)` on the compiled path ends the run, 'Caused by: java.lang.ArrayIndexOutOfBoundsException: Index 32 out of bounds for length 32', after `34 CHOOSE 17` gave 2,333,606,220. On the fix it raises `IntegerOverflow`, and so does `1000 CHOOSE 40`.
   - Evidence: a scratch copy of `ChooseHelperZZ64Compiled.fss:72-75` through `old-fortress.sh ... junit` on the base build: 'Tests run: 2,  Failures: 1'. Through `junit.sh` on the fix: 'OK (2 tests)'. The gated assertions are `ChooseHelperZZ64Compiled.fss:72-75`.

5. **The stages and suites on this rung's tree.**
   - Count stage: '#total 0', '#locations 0', '#crash none', its table equal to climb batch 23's (`diff` prints nothing), 147 s at load 7.7.
   - Distance stage: 'DISTANCE SAME   0', '#crash none', '#seconds 213 FortressLibrary 161', no site.
   - `ant testQuick`: 'BUILD SUCCESSFUL', compiler 1343 (+5), library 86, othercompiler 263.
   - `ant testSystem`: 'BUILD SUCCESSFUL', 182 + 171 + 170 + 175 = 698 (+4).
   - Ladder subset `tests/chain0.fss`: 'pass', its output the baseline's.

## FACTS entry the rung earns

**`CHOOSE` on `ZZ32` and `ZZ64` names its helper on both paths, and the helper is exact, raises `IntegerOverflow` where the coefficient does not fit, and shares no state between calls.**
- Trait `ZZ32`'s and trait `ZZ64`'s `CHOOSE` name `simpleIntArith.intOverflowingChoose` and `simpleLongArith.longOverflowingChoose` (`Library/FortressLibrary.fss:789`, `:882`).
- Past their safe-bound tables, the helpers raise `IntegerOverflow`. Past the tables every coefficient overflows: from `34 CHOOSE 17` on `ZZ32`, and from `68 CHOOSE 34` on `ZZ64`.
- Each slow-path call has its own scratch array.
- `NN32`'s compiled `CHOOSE` calls the `ZZ64` helper. `NN32`'s one-library binding stays on its glue class.
- Swept against the exact value: 64,649,240 `ZZ64` pairs and the probe's 6,023,925 `ZZ32` pairs, equal to walk's glue arithmetic.
- Test: `tests/ChooseHelperWalk.fss`, `tests/ChooseHelperZZ64Walk.fss`, `compiler_tests/ChooseHelperCompiled`, `compiler_tests/ChooseHelperZZ64Compiled`, `compiler_tests/ChooseTableCompiledRungE`; guards `tests/ChooseZZ32Walk.fss` and `tests/ChooseZZ64Walk.fss`.
- Detail: `compile-ladder/rung-natives-choose/REPORT.md`, sections 1, 2 and 5.

## Changes to existing FACTS and POSITIONS entries

- **F-299** (`FACTS.md:134`): on this rung's tree, 23 of the 449 live bindings name a helper. Trait `ZZ32`'s and trait `ZZ64`'s `CHOOSE` are among them, not among those that "still name glue classes, `ZZ32`'s `CHOOSE` among them (row 521)". The gather sums the batch's counts.
- **F-32** (`FACTS.md:30`): "of its 449 live bindings, 428 name one" becomes 426 on this rung's tree. The gather sums the batch's counts.
- **F-132** (`FACTS.md:174`): its list of the compiled path's gaps loses "and `CHOOSE` past its helper's table dies with a Java exception (row 521)".
- **P-73** (`POSITIONS.md:80`): its clause "and at `CHOOSE` (row 521)" no longer holds. The decision stands. The rewording is for the curator or the record pass (forCurator).

## Ledger

- **Row 521: close.** Commit `00e620a3f`, test `ChooseTableCompiledRungE` (`ProjectFortress/compiler_tests/ChooseTableCompiledRungE.test` with `ChooseTableCompiledRungELink.test`, promoted from `XXXChooseTableCompiledRungE`, the row's reproducer). `NN32`'s half is asserted by `ChooseHelperZZ64Compiled`. The close must precede `ledger.py landing-check`, since the row names the renamed `XXX` file.
- **Row 855: close.** Commit `00e620a3f`, test `ChooseHelperCompiled`. Its `ZZ64` half is closed by `ChooseHelperZZ64Compiled`, with the walk loops `ChooseHelperWalk` and `ChooseHelperZZ64Walk`.
- No new rows. No notes on other rows.

## PLAN

- `PLAN.md:51`: "`ZZ32`'s `CHOOSE` with row 521's helper fix", among the families that wait, is done for `ZZ32` and `ZZ64`. `NN32`'s `CHOOSE` waits for H's rewrite and one string (fork 18).
- `PLAN.md:52`: `XXXChooseTableCompiledRungE` "is promoted when it passes". It is now promoted, as `ChooseTableCompiledRungE`.

## Specification

Made false, for the gather's one rewrite of the Effect (fork 7):
- `Specification/appendices/changes.tex:4466` ("Twenty-one ... nineteen of the trait ZZ32");
- `:4473` ("The other 428 still name a glue class");
- `:4474-4477` ("Among them is ZZ32's CHOOSE: its helper throws a Java ArrayIndexOutOfBoundsException ... (row 521 ...)").

No other sentence of `Specification/` is made false.

## Handover line

Climb batch 24, rung K, on `wip/rung-natives-choose` at `00e620a3f`: trait `ZZ32`'s and trait `ZZ64`'s `CHOOSE` name their helpers, which raise `IntegerOverflow` past their tables and keep a scratch array per call. Rows 521 and 855 close, with `XXXChooseTableCompiledRungE` promoted. Count 0, distance 0; `testQuick` and `testSystem` 'BUILD SUCCESSFUL'.

## Revival change

**The change.**
- The team's source: the team's natives for `ZZ32`'s, `ZZ64`'s and `NN32`'s `CHOOSE` on the compiled path, `simpleIntArith.intOverflowingChoose` and `simpleLongArith.longOverflowingChoose`, bound at `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:666`, `:604` and `:729` at `a874948ac`.
  - Where the folded `k` lies past their safe-bound tables, they indexed past the tables' ends and threw `java.lang.ArrayIndexOutOfBoundsException`, which no `catch` sees (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:209-211`, `simpleLongArith.java:191-194` at `a874948ac`). The first such pair is `34 CHOOSE 17` on `ZZ32` and `68 CHOOSE 34` on `ZZ64`.
  - Their slow paths kept their scratch array in one static field (`simpleIntArith.java:121`, `simpleLongArith.java:114` at `a874948ac`), so calls in parallel corrupted each other's results.
- What the tree now does:
  - The helpers raise `IntegerOverflow` wherever the folded `k` is past the table, and every coefficient there overflows.
  - Each call has its own array.
  - Walk's `ZZ32` and `ZZ64` `CHOOSE` call the same two helpers, in place of walk's glue classes, with the same values.
  - Tests: `compiler_tests/ChooseHelperCompiled`, `compiler_tests/ChooseHelperZZ64Compiled`, `compiler_tests/ChooseTableCompiledRungE`, `tests/ChooseHelperWalk.fss`, `tests/ChooseHelperZZ64Walk.fss`, `tests/ChooseZZ32Walk.fss` and `tests/ChooseZZ64Walk.fss`.
- The reason:
  - `Specification/basic/operators/opr-overview.tex:155`: "For integer results, overflow throws an IntegerOverflow."
  - `Specification/basic-lib/basic-integers.tex:609-611`: `CHOOSE` "computes the binomial coefficient".
  - Measured: the team's helper ends `34 CHOOSE 17` with 'Index 15 out of bounds for length 15'. At four threads, `n CHOOSE 2` in a parallel loop gave wrong coefficients, as 'a Long: 2305862669309426946 =/= a Long: 4611711385081683378; 3037008853 CHOOSE 2 in a parallel loop', and raw `java.lang.UnknownError: THIS SHOULDN'T HAPPEN in longSlowCautiousChoose`.

**Provenance.**
- P-73, fixed-width arithmetic raises `IntegerOverflow`, `CHOOSE` included.
- P-58, each binding names a static helper.
- Rows 521 and 855.
- The CHOOSE probe (`explorations/compile-ladder/plan-24/probes/choose.md`) and its patch.
- Climb batch 24, rung K, at its fork 2's default (both helpers in a rung of their own).