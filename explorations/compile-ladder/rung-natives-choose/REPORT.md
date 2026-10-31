<!-- Climb batch 24, rung K (rung-natives-choose): CHOOSE on ZZ32 and ZZ64 raises IntegerOverflow past its helpers' safe-bound tables and keeps no scratch array shared between calls, and trait ZZ32's and trait ZZ64's CHOOSE name the two helpers on both paths (P-58, P-73; rows 521 and 855). -->

# Rung K: `CHOOSE` on `ZZ32` and `ZZ64`, both helpers fixed, both bindings moved

- problem: past its helper's safe-bound table, the compiled `CHOOSE` on `ZZ32`, `ZZ64` and `NN32` dies with a raw `ArrayIndexOutOfBoundsException` (row 521). Its two helpers share one static scratch array across parallel calls (row 855). Climb batch 23 measured `PowChooseLcmRungE` failing when `ZZ32`'s binding moved onto the unfixed helper: `explorations/fortress-gap-ledger.md:538`, `:548`; `explorations/coordinator/CLIMB-BATCH-23.md:43`
- spec: `Specification/basic-lib/basic-integers.tex:607-611` (section "Integers", opr `CHOOSE`: the binomial coefficient, 0 where n < 0 or n > m), with `Specification/basic/operators/opr-overview.tex:155` ("For integer results, overflow throws an IntegerOverflow") and `:258-260`
- precedent: the CHOOSE probe's patch of `simpleIntArith`, taken as written, and its form for `simpleLongArith`: `explorations/compile-ladder/plan-24/probes/choose.patch:76-107`. A helper raises as `simpleIntArith.intOverflowingAdd` does: `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:64`. A binding names its helper as climb batch 23's 19 `ZZ32` bindings do: `Library/FortressLibrary.fss:741-810`
- deviation: the `ZZ64` tests compare through a function typed at `ZZ64` (`chk`), where the probe's `ZZ32` tests pass two numerals to `assert`, so that walk compares two `ZZ64` values: `ProjectFortress/tests/ChooseHelperZZ64Walk.fss:17`
- deviation: `ChooseHelperZZ64Compiled` also asserts the compiled prelude's `NN32` `CHOOSE` past the table; that operator calls the `ZZ64` helper: `ProjectFortress/compiler_tests/ChooseHelperZZ64Compiled.fss:72-75`
- deviation: the promoted test's first line, a pointer to a report, is now a one-line statement of what it checks: `ProjectFortress/compiler_tests/ChooseTableCompiledRungE.fss:1`
- deviation: none in the Java beyond the patch's form, and the specification's spelling is kept: none
- historical: `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java`, `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleLongArith.java`, `Library/FortressLibrary.fss`: `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleLongArith.java:177`

The base is `b0f6cd6b7` on `main`. The worktree `/home/user/fortress-natives-choose` was seeded from the base build `/home/user/fortress-base23`. That build stands at `1f5c49b4f`, an ancestor of the base: `git diff --name-only 1f5c49b4f b0f6cd6b7` prints 43 paths, all under `explorations/`, so the build holds the base's code.

Machine: `nproc` 4, Intel Xeon Processor @ 2.10GHz (2100 MHz), OpenJDK 25.0.4.1. Another rung ran beside this one, with load from 0.6 to 7.9.

Commits:
- `a0a3bf443`: the tests and the promotion, before the fix.
- `00e620a3f`: the fix and the two strings.

## 1. What changed and why

`m CHOOSE n` is the binomial coefficient. On a fixed-size type, a result that does not fit throws `IntegerOverflow` (section 4; P-73 names `CHOOSE`). The compiled path's helpers, which walk now calls too, broke this rule in two ways (the CHOOSE probe, `plan-24/probes/choose.md`, sections 4.2 and 4.3).

**Past the safe-bound table, a raw Java exception.**
- Each helper first folds `k` to `min(k, n-k)`.
- For `n` above its Pascal table, it then indexes a safe-bound table: `maxIntChooseSafeN[k-2]`, 15 entries for `k` = 2 to 16, or `maxLongChooseSafeN[k-2]`, 32 entries for `k` = 2 to 33.
- Its guard against a large `k` tested `k > 33` (`ZZ32`) and `kk > 66` (`ZZ64`), which lie past the tables' ends.
- So a folded `k` from 17 to 33 on `ZZ32`, or from 34 to 66 on `ZZ64`, threw `ArrayIndexOutOfBoundsException`, which no `catch` sees.
- Every coefficient in that region overflows. The smallest is `34 CHOOSE 17` = 2,333,606,220 on `ZZ32`, and `68 CHOOSE 34` = 28,453,041,475,240,576,740 on `ZZ64`. At `n` = 67, a `k` of 34 folds to 33, which is inside the table.

**A scratch array shared by parallel calls.** Each helper's slow path, `intSlowCautiousChoose` or `longSlowCautiousChoose`, wrote, divided and multiplied one static array. Calls that run at once, as the iterations of a Fortress loop do, corrupted each other. The results were wrong values, a false `IntegerOverflow`, or a raw `UnknownError`.

The edit, in `ProjectFortress/src/com/sun/fortress/nativeHelpers/`:
- `simpleIntArith.java`: the probe's patch as written. The guard is `k - 2 >= maxIntChooseSafeN.length` (`:212`). `intSlowCautiousChoose` allocates `int[] tempIntChooseArray = new int[k]` per call (`:162-163`), and the static field is gone.
- `simpleLongArith.java`: the same two changes, in the patch's form. The guard is `kk - 2 >= maxLongChooseSafeN.length` (`:185`). `longSlowCautiousChoose` allocates `long[] tempLongChooseArray = new long[k]` per call (`:136-137`), and the static field is gone. The array has at most 33 entries, because that path answers -1 for `n > 66` with `2k > 66`. The `(int)kk` cast below the guard now meets only `kk` ≤ 33.
- `Library/FortressLibrary.fss:789`: trait `ZZ32`'s `opr CHOOSE(self,b:ZZ32):ZZ32` names `com.sun.fortress.nativeHelpers.simpleIntArith.intOverflowingChoose` instead of `Int$Choose`.
- `Library/FortressLibrary.fss:882`: trait `ZZ64`'s `CHOOSE` names `com.sun.fortress.nativeHelpers.simpleLongArith.longOverflowingChoose` instead of `Long$Choose`.

Both helpers keep the team's algorithm, both tables and every public signature. `library_tests/IntegerChoose1.fss:13` still imports `intSlowCautiousChoose`, and its run passes (section 2).

`NN32`'s compiled `CHOOSE` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:806`) calls `simpleUnsignedIntArith.unsignedIntOverflowingChoose`, which calls `longOverflowingChoose` (`simpleUnsignedIntArith.java:80-82`). So it gains both fixes. Its binding in the one library (`FortressBuiltin.fss:448`) stays on `NN32$Choose`, as the brief says.

## 2. The tests, failing and passing

The order of work:
1. I wrote the tests and committed them (`a0a3bf443`).
2. Every failing run below ended before the edit was first built. `ant compileAll` started at 13:03:59 UTC; the last failing run, the Java sweep, ended at 13:03:45.
3. Then the fix, the build and the library order.
4. Then the passing runs.

The harness runs at `FORTRESS_THREADS=4`.

The tests, in `ProjectFortress/`:

The probe's three, from `choose.patch`:
- `tests/ChooseHelperWalk.fss`, and `compiler_tests/ChooseHelperCompiled.fss` with its `.test` (link, run, PASS). Each binds the `ZZ32` helper by its own declaration. Each checks 20 exact values and 12 overflows, and `n CHOOSE 2` for `n` from 46342 to 65536 in a parallel loop.
- The guard `tests/ChooseZZ32Walk.fss`: the same checks on the library's operator.

Their `ZZ64` counterparts, mine, in the same form:
- `tests/ChooseHelperZZ64Walk.fss`, and `compiler_tests/ChooseHelperZZ64Compiled.fss` with its `.test`. Each binds the `ZZ64` helper by its own declaration.
- 26 exact values. They cover the table, the fast loop, and the slow path on each side of the safe-bound entry at `k` = 2, 3, 4 and 10 (for example `3037000500 CHOOSE 2` is fast and `3037000501 CHOOSE 2` is slow). They also cover the largest fitting `n` at `k` = 2, 3, 4 and 17, `MAX`, `MIN` and the zero cases.
- 13 overflows: `67 CHOOSE 33`, `68 CHOOSE 34`, `1000 CHOOSE 40`, `MAX CHOOSE 50`, the first non-fitting `n` at `k` = 2, 3, 4 and 17, and others.
- `n CHOOSE 2` for 20,000 values of `n` from 3037000501, in a parallel loop that widens a `ZZ32` counter. This loop reaches `longSlowCautiousChoose`.
- The compiled test also asserts the prelude's `NN32` `CHOOSE`: `34 CHOOSE 17` = 2,333,606,220, and overflows at `68 CHOOSE 34` and `1000 CHOOSE 40`.
- The guard `tests/ChooseZZ64Walk.fss`: the same checks on the library's `ZZ64` operator.

The promoted pair:
- `XXXChooseTableCompiledRungE.fss` and `.test` renamed with `git mv` to `ChooseTableCompiledRungE.fss` and `.test`.
- The component is renamed inside. The run test is now `link`, `run`, `run_out_contains=PASS`.
- `ChooseTableCompiledRungELink.test` is set to `tests=ChooseTableCompiledRungE`.

Walk, on the base's code (`harness-one.sh`, tree `b0f6cd6b7`, 12:52 UTC):

    $ explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-natives-choose/h-before ProjectFortress/tests/ChooseHelperWalk.fss ProjectFortress/tests/ChooseZZ32Walk.fss ProjectFortress/tests/ChooseHelperZZ64Walk.fss ProjectFortress/tests/ChooseZZ64Walk.fss ProjectFortress/tests/PowChooseLcmRungE.fss
    Wrapped exception java.lang.ArrayIndexOutOfBoundsException: Index 15 out of bounds for length 15
    Wrapped exception java.lang.ArrayIndexOutOfBoundsException: Index 32 out of bounds for length 32
    FAILURES!!!
    Tests run: 5,  Failures: 2,  Errors: 0

The two failures are `ChooseHelperWalk` and `ChooseHelperZZ64Walk`. The guards `ChooseZZ32Walk` and `ChooseZZ64Walk`, which run on the glue classes here, and `PowChooseLcmRungE` were 'OK'.

Compiled, on the base's code (`junit.sh`, 12:52 UTC):

    $ ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh before ProjectFortress/compiler_tests ChooseHelperCompiled.test ChooseHelperZZ64Compiled.test ChooseTableCompiledRungELink.test ChooseTableCompiledRungE.test
    . run ProjectFortress/compiler_tests/ChooseHelperCompiled (340ms) java.lang.ArrayIndexOutOfBoundsException
    F. run ProjectFortress/compiler_tests/ChooseHelperZZ64Compiled (290ms) java.lang.ArrayIndexOutOfBoundsException
    F. run ProjectFortress/compiler_tests/ChooseTableCompiledRungE (259ms) REACHED
    Caused by: java.lang.ArrayIndexOutOfBoundsException: Index 15 out of bounds for length 15
    Tests run: 7,  Failures: 3,  Errors: 0

The three links passed. With only the `ZZ32` helper fixed, `ChooseTableCompiledRungE` still fails at its `ZZ64` assertion, 'Index 32 out of bounds for length 32' (the probe's measurement, `choose.md` section 7.4). This rung fixes both.

The race by itself, on the base's code. The full tests stop at their first overflow past the table, before their loops. So, as the probe did for `ZZ32`, I made scratch copies of the two `ZZ64` helper tests holding only the parallel loop, and ran each three times through the same harness:

    walk run 1/2/3:     Tests run: 1,  Failures: 1   (13, 20 and 13 loop assertions failed)
        FAIL: a Long: 2305862669309426946 =/= a Long: 4611711385081683378; 3037008853 CHOOSE 2 in a parallel loop
    compiled run 1/2/3: Tests run: 2,  Failures: 1   (15, 21 and 9 loop assertions failed; runs 2 and 3 end in java.lang.UnknownError)
        FAIL:  n CHOOSE 2 in a parallel loop

The probe measured the `ZZ32` race the same way, on the same `simpleIntArith` text: before the fix, walk failed 3 of 3 and compiled 2 of 3; after it, none failed (`choose.md` section 6).

After the fix: `ant compileAll` printed 'Caches ... started again, empty', then the library order made the five jars. This is the last code state.

    $ explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-natives-choose/h-after ProjectFortress/tests/ChooseHelperWalk.fss ProjectFortress/tests/ChooseZZ32Walk.fss ProjectFortress/tests/ChooseHelperZZ64Walk.fss ProjectFortress/tests/ChooseZZ64Walk.fss ProjectFortress/tests/PowChooseLcmRungE.fss
    OK (5 tests)

    $ ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh after ProjectFortress/compiler_tests ChooseHelperCompiled.test ChooseHelperZZ64Compiled.test ChooseTableCompiledRungELink.test ChooseTableCompiledRungE.test
    . run ProjectFortress/compiler_tests/ChooseHelperCompiled (875ms) PASS
    . run ProjectFortress/compiler_tests/ChooseHelperZZ64Compiled (659ms) PASS
    . run ProjectFortress/compiler_tests/ChooseTableCompiledRungE (323ms) REACHED
    OK (7 tests)

    $ ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh lib ProjectFortress/library_tests Integer.test
    . run ProjectFortress/library_tests/IntegerChoose1 (527ms) PASS
    . run ProjectFortress/library_tests/IntegerChoose2 (687ms) PASS
    OK (27 tests)

    race copies after the fix: walk run 1/2/3: OK (1 test); compiled run 1/2/3: OK (2 tests); 0 loop failures

The whole suites on the final tree (section 7) passed these files again, in their own JVMs.

## 3. Where the fix belongs, and the precedent search

**The place.** The defects are in the two helpers under `nativeHelpers/`, which both paths run. Walk calls them through `StaticNativeApp` from this rung on. The compiled path calls them through the prelude's `import java` (`CompilerBuiltin.fss:44`, `:171`) and through the one library's rewrite (`compiler.md`, "Natives"). A fix in walk's glue classes, or in the prelude, would leave one path wrong. The maps have no row for `CHOOSE` (`facts-extract.sh 'map:spec-to-implementation.md#Feature by feature@CHOOSE'` prints 'NOT FOUND'). `modules-and-phases.md`, section B.12, names `StaticNativeApp` as the loader of a helper string.

**The precedent.** The CHOOSE probe's patch repaired both defects in `simpleIntArith` (`plan-24/probes/choose.patch:76-107`). All of `nativeHelpers/*.java` holds six static arrays (`grep -n 'static[^(]*\[\]' *.java`):
- two scratch arrays: `simpleIntArith.java:121` and `simpleLongArith.java:105`, at the base;
- two Pascal tables, written only by the static initialisers;
- two constant safe-bound tables.

So the precedent's defect has one other site of each kind, both in `simpleLongArith`: the scratch array at `:105` and the bound at `:182-183`. This rung fixes both. No other helper keeps a scratch array.

**Earlier work here.**
- The `CHOOSE` code of both helpers is the team's: `git diff a874948ac` of the two files touches only other methods (the revival's `ce0c7f453` changed `simpleLongArith`'s shifts).
- Climb batch 23 kept `CHOOSE` on its glue class until this fix (`CLIMB-BATCH-23.md:43`, `:112`, its fork 12).
- Walk's glue, `Int.choose` (`Int.java:360-386`), which `Long$Choose` also calls (`Long.java:164-167`), is the revival's exact version (rows 337 and 520, closed).

**The ways the language and the library offer, and the choice.**
- The binding: the bare-string `builtinPrimitive` that names the helper (P-58). It is the only form on record.
- The helper's bound: (a) a guard where the table ends, the probe's form, taken; (b) walk's algorithm in the helper, 64-bit products with a `gcd` and a range check (`Int.java:360-386`); (c) a bounds check at the index.
- The scratch array: (a) one per call, the probe's form, taken; (b) a `ThreadLocal` array; (c) a `synchronized` slow path.

Section 9 gives the reasons.

## 4. What the specification settles

- `Specification/basic-lib/basic-integers.tex:607-611`, section "Integers", opr `CHOOSE`: "it computes the binomial coefficient m CHOOSE n = m!/(n! (m-n)!). If n<0 or n>m, the result is 0."
- `Specification/basic/operators/opr-overview.tex:155`, subsection "Multiplication, Division, Modulo, and Remainder Operators": "For integer results, overflow throws an IntegerOverflow."
- The same file, `:258-260`, subsection "GCD, LCM, and CHOOSE Operators": `CHOOSE` "computes binomial coefficients".
- P-73: the rule covers "every operation whose result can leave its type, `^`, `CHOOSE` and `LCM` included". On the compiled path the rule holds as the specification's, and the compiled path departed from it "at `CHOOSE` (row 521)".
- The specification says nothing of parallel calls. A value that depends on another call is not the coefficient. Loops run in parallel by default (`Specification/basic/expressions/for.tex`, "For Loops").

So the record settles the fix (the probe's section 8), and no word of the curator is needed. The probe's question on the property at `m = n = -1` is not this rung's.

## 5. Old against new

**The `ZZ64` helper against the exact value and against walk's `Long$Choose`.** A scratch Java probe, compiled against `bin/fortress_classpath`, calls `simpleLongArith.longOverflowingChoose` and walk's `Int.choose`, the body of `Long$Choose`. Its pairs:
- every pair with `-3 ≤ n ≤ 1000`;
- for `n` up to 130,000, every `k` and `n - k` with `k` from -3 to 40;
- for `n` up to 3,900,000, the same with `k` up to 3, since only `k` ≤ 3 fits there;
- the edges of the safe-bound table at `k` = 2 and 3;
- `MAX`, `MAX-1`, `MIN`, `MIN+1` and `2^62`, against 14 values of `k`.

In a bare JVM, walk's `overflow()` shows as a `NullPointerException`, which the probe reads as the raise.

    $ java -cp <classes built on the base>:$CP LongChooseSweep sweep 3900000
    calls 64649240 for -3 <= n <= 3900000 ...
    helper: {BAD-exception-on-overflow=1865442, ok-overflow=8062572, ok-value=54721226}
      helper first BAD: 68 CHOOSE 34 -> java.lang.ArrayIndexOutOfBoundsException:Index 32 out of bounds for length 32
    walk:   {ok-overflow=9928014, ok-value=54721226}
    $ java -cp <classes built on the fix>:$CP LongChooseSweep sweep 3900000
    helper: {ok-overflow=9928014, ok-value=54721226}
    walk:   {ok-overflow=9928014, ok-value=54721226}

So in one thread, the base's helper gave every fitting coefficient exactly, and raised the raw exception at 1,865,442 overflows. The fixed helper matches the exact value and walk pair for pair. Moving `ZZ64`'s binding changes no value that walk gives on these pairs.

**The `ZZ64` helper's safe-bound table**, checked against exact arithmetic by a Python scratch probe (`math.comb` against the fast loop's intermediate products):
- For every `k` from 2 to 30, the largest safe `n` is the team's entry ('k= 2 team=3037000500 computed_safe=3037000500', ..., 'k=30 team=61 computed_safe=61').
- For `k` = 31 to 33, no `n ≥ 2k` is safe. Their entries, 61, lie below `2k`, so every `n` there takes the slow path.

The probe checked the `ZZ32` table the same way (`choose.md` section 4.1).

**The `ZZ64` race in Java.** The probe calls the slow path at `k` = 2 from `n` = 3037000501 and at `k` = 3 from `n` = 2642247, from a thread pool (`LongChooseSweep race T 10`):

    base:  threads 1, calls 250000, wrong values 0, exceptions 0
           threads 2, calls 500000, wrong values 14, exceptions 6, first 3037001981 CHOOSE 2 -> java.lang.UnknownError: THIS SHOULDN'T HAPPEN in longSlowCautiousChoose
           threads 4, calls 1000000, wrong values 144, exceptions 95
    fixed: threads 1/2/4: wrong values 0, exceptions 0

**The compiled `NN32` `CHOOSE`, by itself.** A scratch copy of `ChooseHelperZZ64Compiled`'s three `NN32` lines, printing `REACHED` after the first:
- On the old code (`explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base23 $PWD/tmp/rung-natives-choose/old-caches junit .../ChooseNN32Probe.test`): '. run ... ChooseNN32Probe (841ms) REACHED', 'Caused by: java.lang.ArrayIndexOutOfBoundsException: Index 32 out of bounds for length 32', 'Tests run: 2,  Failures: 1'.
- On the fix (`junit.sh nn32`): 'OK (2 tests)'.

**The `ZZ32` side.** The probe swept `simpleIntArith.intOverflowingChoose`, with this rung's text, against the exact value and `Int$Choose` on 6,023,925 pairs. After the fix they were equal pair for pair. It also ran 1,593,120 calls from four threads with no wrong value (`choose.md` sections 7.1 and 7.3). The source of `simpleIntArith` here is the patch's, unchanged.

## 6. The stages

**The count stage**, on the final tree after its last build, 13:22 to 13:25 UTC. The load was 7.7 at the start, with another rung's runs beside it.
- Command: `explorations/coordinator/tools/checker-count/run.sh tmp/rung-natives-choose/checker-count-postedit.txt tmp/rung-natives-choose/cc-post`, 'real 2m27.019s'.
- Against climb batch 23's landed `explorations/compile-ladder/climb-batch-23/gate/checker-count.txt`: `diff` prints nothing, rc 0.
- Its rows: '#total 0', '#locations 0', '#crash none', and `com.sun.fortress.nativeHelpers 0` among its 14 api rows.

So the checker reads the two moved bindings against their helpers' signatures (`int`, `int` to `int`; `long`, `long` to `long`) and finds no error, as the planner's run with all 83 moved found. This rung changes no checker code, so there is no speed pass. The count stage took 147 s.

**The distance stage**, on the final tree, 13:27 to 13:31 UTC, load 2.2 at the start.
- Command: `explorations/coordinator/tools/distance/run.sh tmp/rung-natives-choose/distance-postedit.txt tmp/rung-natives-choose/dist-post`.
- `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-23/gate/distance.txt <this table>` prints 'DISTANCE SAME   0'.
- Its rows: '#total 0', every '#kind' 0, '#crash none', '#seconds 213 FortressLibrary 161'. Without the '#seconds' and '#machine' rows, the two tables are equal (`diff` prints nothing).
- The landed per-site list `explorations/compile-ladder/gate/distance-sites.tsv` holds only its header, and so does this run's per-site list.

So no site moved and none came. Both stages stand at 0, as climb batch 23 landed them and as the planner measured.

## 7. Suites

Both ran on the final tree, the code of `00e620a3f`, after its last build, once each (fork 9):

    $ ant testQuick                       (13:11 to 13:17 UTC)
    [echo] Caches /home/user/fortress-natives-choose/default_repository/caches kept
    [junit] Tests run: 86, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 106.791 sec
    [junit] Tests run: 263, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 156.254 sec
    [junit] Tests run: 1343, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 320.252 sec
    BUILD SUCCESSFUL

    $ ant testSystem                      (13:17 to 13:22 UTC)
    [junit] Tests run: 182, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 271.321 sec
    [junit] Tests run: 171, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 278.443 sec
    [junit] Tests run: 170, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 281.939 sec
    [junit] Tests run: 175, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 284.88 sec
    BUILD SUCCESSFUL

Against climb batch 23's gate summary (`explorations/compile-ladder/climb-batch-23/gate/summary.txt`):
- library 86 and othercompiler 263: unchanged;
- compiler 1343 against 1338, +5: a link and a run each for `ChooseHelperCompiled` and `ChooseHelperZZ64Compiled`, and the `link` added to the promoted run file;
- `testSystem` 698 against 694, +4: the four new walk tests.

One verdict changes: `XXXChooseTableCompiledRungE`'s expected failure becomes `ChooseTableCompiledRungE`'s pass. Every other test keeps its verdict, `PowChooseLcmRungE` among them. `ant testSpecData` is the gate's.

**The ladder subset** (gate.md, "The ladder regression"; the drivers copied under the rung's scratch folder). No baseline file's recorded first error names what this rung touched. So the subset is the one pass-list program that calls `CHOOSE`, `tests/chain0.fss`, which reaches the `ZZ32` helper through the prelude. Its result is 'tests	chain0.fss		pass	4'; climb batch 23's `ladder.tsv` has 'pass	3'. Its run output equals the baseline's `raw/tests/chain0.fss.run` after the `Operation took` mask. No microGPT component calls `CHOOSE` (a grep of `explorations/run-c4/src` and `explorations/apl/mg` finds 0 files), so the microGPT phase was not run.

**The team demos.** None ran here: fork 8 gives all 52 to the gather. The 17 that call `CHOOSE` (`BirdCount1m` to `2d`) call it on `ZZ32` (`ProjectFortress/demos/BirdCount1z.fss:81-82`, where `cov` is a `ZZ32`). The probe ran them on this rung's `ZZ32` text and binding: 'demos: 17 run, 17 reached their end' (`choose.md` section 7.5).

## 8. Sentences made false

The specification's. The gather rewrites the Appendix I Effect once (fork 7):
- `Specification/appendices/changes.tex:4466`: "Twenty-one of the 449 bindings of \library\ name a helper: nineteen of the trait ZZ32, its operators ...". This rung adds trait `ZZ32`'s and trait `ZZ64`'s `CHOOSE`.
- `Specification/appendices/changes.tex:4473`: "The other 428 still name a glue class, which the compiled code cannot call."
- `Specification/appendices/changes.tex:4474-4477`: "Among them is ZZ32's CHOOSE: its helper throws a Java ArrayIndexOutOfBoundsException, which no catch sees, where the binomial coefficient is past the helper's table, instead of an IntegerOverflow (row 521 of the revival's gap ledger)."

No other sentence of `Specification/` names the helpers, their table, or rows 521 and 855 (`grep -rn '521\|855\|ArrayIndexOutOfBounds\|safe-bound' Specification/ --include=*.tex`). The `CHOOSE` entry and the operator overview were true of walk, and now become true of the compiled path.

The record's, for the gather:
- row 521's claim (`explorations/fortress-gap-ledger.md:538`) and row 855's (`:548`): both close;
- F-299 (`explorations/coordinator/FACTS.md:134`): "21 of the one library's 449 live bindings name one" and "the other 428 still name glue classes, `ZZ32`'s `CHOOSE` among them (row 521)";
- F-32 (`FACTS.md:30`): "of its 449 live bindings, 428 name one";
- F-132 (`FACTS.md:174`): "and `CHOOSE` past its helper's table dies with a Java exception (row 521)";
- P-73 (`explorations/coordinator/POSITIONS.md:80`): "and the compiled path departs from it at `^` (rows 523 to 525) and at `CHOOSE` (row 521)". Its `CHOOSE` clause is false;
- PLAN (`explorations/coordinator/PLAN.md:51`): "`ZZ32`'s `CHOOSE` with row 521's helper fix", among the families that wait;
- PLAN `:52`: `XXXChooseTableCompiledRungE` "is promoted when it passes". It now is.

## 9. Decisions

**The probe's patch for `ZZ32`, taken as written.**
- I found no reason to improve its text. Its guard is exact: `34 CHOOSE 17` is the least coefficient past the table. Its sweep matched the exact value on 6,023,925 pairs (`choose.md` section 7.1).
- Way not taken: replacing the helper's body with walk's `gcd` algorithm (`Int.java:360-386`). That would give one algorithm on both paths, but it drops the team's table and fast loop and changes more than the defects need.
- No decision of the curator covers the choice, and the brief allows either.

**`simpleLongArith` fixed in the patch's form**: the guard `kk - 2 >= maxLongChooseSafeN.length` and a per-call `new long[k]`. Ways not taken:
- the guard written as `kk > 33`, which hides the tie to the table;
- a bounds check at the index, which tests later than needed;
- a `ThreadLocal` scratch array or a `synchronized` slow path, which keep shared state or serialise parallel calls, where an array of at most 33 longs per call costs nothing that matters;
- walk's algorithm, as above.

Evidence: the table checked against exact arithmetic, and the sweep equal to the exact value (section 5).

**The `ZZ64` tests' form.**
- The probe's form, with `chk(got: ZZ64, want: ZZ64, what: String)`, so that walk compares two `ZZ64` values. The expected values are numerals that the call converts.
- Ways not taken: `assert` of the helper's result directly against a numeral, which leaves walk's dispatch to compare a `ZZ64` with a `ZZ32` numeral; `.asString` comparisons, as `PowChooseLcmRungE` makes, which would test the printing too.
- The loop counts a `ZZ32` index and widens it, since ranges are over `ZZ32` only (`library.md`, "The curator's decisions on the library"). It runs 20,000 iterations at `k` = 2, about the size of the probe's `ZZ32` loop. The race showed in 6 of 6 base runs (section 2).

**The `NN32` assertions in `ChooseHelperZZ64Compiled`.**
- Row 521 names `NN32` too, and `NN32`'s compiled `CHOOSE` reaches the `ZZ64` helper, so the row's tests should cover it.
- Ways not taken: no `NN32` assertion, which would close row 521's `NN32` half with no test; a test file of its own; an assertion added to the promoted test, which would change it beyond its promotion.
- Walk's `NN32` `CHOOSE` stays on its glue class (the brief), so the walk counterpart has no `NN32` lines.

**The promoted test's comment line.**
- Its first line pointed to a report. `tests-writing.md`, "Names, comments, citations", asks for one line that says what the test checks, with no pointer to a record. So the promotion rewrote that line, and the assertions are unchanged.
- Way not taken: keeping the pointer.

**The ladder subset**: `tests/chain0.fss`, the one pass-list program that calls `CHOOSE`.
- Way not taken: an empty subset. The letter of the rule ("each file whose recorded first error ... names something that your change touched") gives one, since no recorded first error names `CHOOSE`.

**No demo run.**
- Fork 8 gives the 52 to the gather. The 17 that call `CHOOSE` call it on `ZZ32`, which the probe measured with this text.
- Way not taken: running the 17 here, a repeat of the probe's run on the same `ZZ32` code.

## 10. Defects and their homes

- **Row 521**, all three halves (`ZZ32`, `ZZ64`, and `NN32` through the `ZZ64` helper): home 1, repaired. Its assertions are the overflows past the tables in `ChooseHelperWalk`, `ChooseHelperCompiled`, `ChooseHelperZZ64Walk`, `ChooseHelperZZ64Compiled` (with `NN32`'s) and the promoted `ChooseTableCompiledRungE`. The gather closes it with `00e620a3f`, its test `ChooseTableCompiledRungE`.
- **Row 855**, both halves, and `NN32`'s compiled path through the `ZZ64` helper: home 1, repaired. Its assertions are the parallel loops of the four helper tests and of the two guards. The gather closes it with `00e620a3f`, its test `ChooseHelperCompiled`, and the `ZZ64` half by `ChooseHelperZZ64Compiled`.
- No new defect. The `ZZ64` table's last three entries lie below `2k` (section 5), which makes the fast loop unreachable there. That is correct, not a defect.

## 11. Points to report

- The probe's patch was taken as written for `ZZ32`. `simpleLongArith` was fixed by the same two changes, in the patch's form (sections 1 and 9).
- The probe's tests, the `ZZ64` tests and the promoted pair, before and after, and the two guards on the base and on the text: section 2.
- The count table and the distance table on the final tree: both 0, and no site came (section 6). The count stage took 147 s.
- `ant testQuick` and `ant testSystem`: both 'BUILD SUCCESSFUL'. The one verdict that changes is the promoted pair's (section 7).
- Values that move beyond `CHOOSE` past the table:
  - under walk, none (the `ZZ64` sweep of 64,649,240 pairs; the probe's `ZZ32` sweep);
  - on the compiled path, parallel calls of the slow paths now give the coefficient on `ZZ32`, `ZZ64` and `NN32`, where they gave wrong values, false overflows or `UnknownError`;
  - `NN32`'s `CHOOSE` past the table now raises `IntegerOverflow` (section 5).
- Every sentence made false: section 8.
- A file edited beyond those named: none. The edited sources are the two helpers, at their `CHOOSE` methods and scratch arrays only, and `FortressLibrary.fss`, at its two `CHOOSE` strings only. The tests are in `tests/` and `compiler_tests/`.

## 12. For FACTS

- **The fact:** trait `ZZ32`'s and trait `ZZ64`'s `CHOOSE` name `simpleIntArith.intOverflowingChoose` and `simpleLongArith.longOverflowingChoose` on both paths. Each helper gives the exact coefficient, 0 where `k < 0` or `k > n`, and `IntegerOverflow` exactly where the coefficient does not fit, and shares no state between calls. `NN32`'s compiled `CHOOSE` calls the `ZZ64` helper.
- **What it means for the work:** 23 of the one library's 449 live bindings name a helper on this rung's tree. `NN32`'s `CHOOSE` can move once the rewrite reads `NN32` (fork 18). The compiled path no longer departs from P-73 at `CHOOSE`.
- **The numbers:** the `ZZ64` sweep, 64,649,240 pairs, 54,721,226 fitting and 9,928,014 overflowing, where the base's helper raised the raw exception at 1,865,442 of the overflows; and the probe's `ZZ32` sweep, 6,023,925 pairs.
- **The test:** `tests/ChooseHelperWalk.fss`, `tests/ChooseHelperZZ64Walk.fss`, `compiler_tests/ChooseHelperCompiled`, `compiler_tests/ChooseHelperZZ64Compiled` and `compiler_tests/ChooseTableCompiledRungE`, with the guards `tests/ChooseZZ32Walk.fss` and `tests/ChooseZZ64Walk.fss`.
- **Detail:** this report, sections 1, 2 and 5.

## 13. Commands worked out

- **The race part of a test by itself:** a scratch copy holding only its loop, run three times each through `harness-one.sh` and `junit.sh` from a folder under the tree's `tmp/`, as the probe did.
- **A Java sweep and race of a helper against the exact value:** a scratch class compiled with `javac -cp "$(bin/fortress_classpath | tail -1)"` and run with `java -cp classes:$CP`. Compile it into separate class folders before and after the build, so that each run reads one code state.

## 14. Questions for the curator

None of this rung's own. P-73's text names row 521 as a departure of the compiled path, and this rung removes that departure (section 8). Its rewording belongs to the curator or the record pass (forCurator).