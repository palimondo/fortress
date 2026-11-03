<!-- Climb batch 25, rung R (rung-natives-remainders): REM and MOD on ZZ32, ZZ64, NN32, NN64 and ZZ moved onto ten new nativeHelpers helpers that raise DivisionByZero at a zero divisor, closing rows 336 and 848; the rung's tests, its runs, its decisions and its defects. -->

# Rung R: REM and MOD on the five integer types, by new helpers (P-58; rows 336 and 848)

- problem: under walk, `REM` and `MOD` by zero on `ZZ32` and `ZZ64` end the run with a Java `ArithmeticException` that no Fortress `catch` sees (row 336, `explorations/fortress-gap-ledger.md:513`), and the same on `NN32`, `NN64` and `ZZ` (row 848, `explorations/fortress-gap-ledger.md:553`); the planner's runs: `explorations/coordinator/CLIMB-BATCH-25.md:389`
- spec: `Specification/basic/operators/opr-overview.tex:165`, "For integer results, division by zero throws a \TYP{DivisionByZero}.", with `REM` the remainder of the truncating division and `MOD` of the floor division at `:130-133`
- precedent: `ZZ32`'s `DIV` on `simpleIntArith.intOverflowingDiv`, `Library/FortressLibrary.fss:778-779`, its helper `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:78-82`, with its tests `ProjectFortress/tests/ZZ32DivisionByZeroWalk.fss:1-20`, `ProjectFortress/tests/NativeHelperFamilyZZ32Walk.fss:1-51` and `ProjectFortress/compiler_tests/NativeHelperBindingCompiled.fss:1-44`
- deviation: the exception is the operators chapter's `DivisionByZero` (`Specification/basic/operators/opr-overview.tex:165`), not the integers listing's spelling `IntegerDivisionByZero` (`Specification/basic-lib/basic-integers.tex:246-250`, row 792, CONTESTED), as the precedent's `DIV` raises; each pair of helpers carries one comment line or two on what it computes, where the precedent's division helper has none (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:84-85`); none from the precedent's binding form
- historical: `Library/FortressLibrary.fss:780-783`, `:873-876`, `:956-959`, `:1053-1056`; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:440-443`; `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:84-94`, `simpleLongArith.java:84-94`, `simpleUnsignedIntArith.java:67-76`, `simpleUnsignedLongArith.java:80-89`, `simpleArbitraryPrecisionArith.java:47-58`

## What changed and why

Rows 336 and 848: under walk, the ten bindings of `REM` and `MOD` on the five integer types named glue classes that divide with no zero test (`interpreter/glue/prim/Int.java:130-134`, `:158-162`; `Long.java:144-148`, `:170-174`; `NN32.java:137-141`, `:164-169`; `UnsignedLong.java:138-142`, `:164-169`; `BigNum.java:164-168`, `:200-208`), so a zero divisor ended the run with a Java `ArithmeticException`, which walk makes a `ProgramError` that no `catch` takes (F-24). P-58 has each binding name a static helper of `nativeHelpers/`, which both paths call; a helper's raise of `fortress.CompilerBuiltin$DivisionByZero` reaches a Fortress `catch` as the library's `DivisionByZero` (F-24), as `DIV` on the same five types already does (F-306, F-308).

The change is the planner's `explorations/compile-ladder/plan-25/probes/rung-R.patch`, applied with `git apply`, its five source comments rewritten (decision 1):

- Ten helpers, each pair right after its class's overflowing division helper (fork 2), each raising `fortress.CompilerBuiltin$DivisionByZero` at a zero divisor and computing every other value as the glue class it replaces (fork 4):
  - `simpleIntArith.intRem` (`a % b`) and `intMod` (`Math.floorMod`), `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:84-94`;
  - `simpleLongArith.longRem` and `longMod`, the same at `long`, `simpleLongArith.java:84-94`;
  - `simpleUnsignedIntArith.unsignedIntRem` and `unsignedIntMod`, both `Integer.remainderUnsigned`, `simpleUnsignedIntArith.java:67-76`;
  - `simpleUnsignedLongArith.unsignedLongRem` and `unsignedLongMod`, both `Long.remainderUnsigned`, `simpleUnsignedLongArith.java:80-89`;
  - `simpleArbitraryPrecisionArith.rem` (`BigInteger.remainder`) and `mod` (`BigInteger.mod`, negated through the divisor's absolute value where the divisor is negative, as `BigNum$Mod`), `simpleArbitraryPrecisionArith.java:47-58`.
- Ten strings moved, each one line: trait `ZZ32`'s `REM` and `MOD` (`Library/FortressLibrary.fss:781`, `:783`) to `simpleIntArith.intRem` and `intMod`; trait `ZZ64`'s (`:874`, `:876`) to `simpleLongArith.longRem` and `longMod`; trait `NN64`'s (`:957`, `:959`) to `simpleUnsignedLongArith.unsignedLongRem` and `unsignedLongMod`, through the `NN64` transfers (F-308); trait `ZZ`'s (`:1054`, `:1056`) to `simpleArbitraryPrecisionArith.rem` and `mod`; value object `NN32`'s (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:441`, `:443`) to `simpleUnsignedIntArith.unsignedIntRem` and `unsignedIntMod`, through the `NN32` transfers.

Each helper's name is unique at its arity in its class (`grep -n -E 'public static' ProjectFortress/src/com/sun/fortress/nativeHelpers/simple*Arith.java`), so the rewrite adds its transfers for `NN32` and `NN64` (the `fortress-repo` skill's `references/compiler.md`, "Natives"). Every parameter and result is `int`, `long` or `BigInteger`, which the compiled prelude's wrapper generator maps, and the library order built the five jars after the edit ('compile LibraryBuiltin/CompilerBuiltin.fss rc=0', the five jars listed).

Not moved, as the brief has it: `GCD`, `LCM`, `CHOOSE` and `partitionL` (rung N); `IntLiteral`'s `DIV`, `REM` and `MOD` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:530-535`), which wait for N5 (P-76); `DIVREM` and `DIVMOD`, which the library writes in Fortress over `DIV`, `REM` and `MOD`. After the rung, 183 of the 449 live bindings name a helper and 266 a glue class (173 and 276 at climb batch 24's gate, F-299, F-32): two more each on `ZZ32`, `ZZ64`, `NN64`, `ZZ` and `NN32`.

Commits on `wip/rung-natives-remainders`: `d0aaf39e5`, the tests; `411436878`, the fix; then this report and `record.md`.

## The tests: failing on the base, passing after

The order, from this rung's transcript: the tests written at 00:54 UTC; the walk run on the base at 00:56:34 and the compiled run on the base at 00:58:20; the tests committed (`d0aaf39e5`); the patch applied and the comments rewritten; `ant compileAll` ('BUILD SUCCESSFUL', 'Caches … started again, empty'), the library order; the runs on the edit at 01:00:23 and 01:00:39.

**Walk, on the base** (the tree at `97a416b18` but for the new tests, before any edit of a library source or of Java), 00:56:34 UTC:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-natives-remainders/h-base ProjectFortress/tests/ZZ64RemainderByZeroWalk.fss ProjectFortress/tests/NN32RemainderByZeroWalk.fss ProjectFortress/tests/ZZ32RemainderByZeroWalk.fss ProjectFortress/tests/NN64RemainderByZeroWalk.fss ProjectFortress/tests/ZZRemainderByZeroWalk.fss ProjectFortress/tests/NativeHelperFamilyRemainderWalk.fss

    . interpret tmp/rung-natives-remainders/h-base/tests/ZZRemainderByZeroWalk
     UNEXPECTED exception
    Caused by: java.lang.ArithmeticException: BigInteger divide by zero
    . interpret tmp/rung-natives-remainders/h-base/tests/NativeHelperFamilyRemainderWalk
     OK (time = 698ms)
    Tests run: 6,  Failures: 5,  Errors: 0

The five failures are `ZZRemainderByZeroWalk`, `ZZ64RemainderByZeroWalk`, `ZZ32RemainderByZeroWalk`, `NN64RemainderByZeroWalk` and `NN32RemainderByZeroWalk`, each 'UNEXPECTED exception', 'java.lang.ArithmeticException' ('/ by zero' for the four fixed widths); the walk guard passes on the base, as a guard should.

Each test's first assertion is `REM` by zero, which ends the run on the base before its `MOD` line runs. So `MOD` by zero was run on the old code alone, five probe programs `ZeroModZZ32` to `ZeroModZZ`, one `MOD` by zero each in a `try` catching `DivisionByZero` (below, "Programs run old against new"): each ended its run on the old code.

**Walk, on the edit**, 01:00:23 UTC, the same call into `h-new`, after the build and the library order, the code of `411436878`:

    . interpret tmp/rung-natives-remainders/h-new/tests/NN32RemainderByZeroWalk
     OK (time = 12996ms)
    OK (6 tests)

**Compiled, on the base**, 00:58:20 UTC:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests NativeHelperFamilyRemainderCompiled.test

    . link ProjectFortress/compiler_tests/NativeHelperFamilyRemainderCompiled ProjectFortress/compiler_tests/NativeHelperFamilyRemainderCompiled.fss:5:49-100:
        builtinPrimitive names no static helper: com.sun.fortress.nativeHelpers.simpleIntArith.intRem
    File NativeHelperFamilyRemainderCompiled.fss has 1 error.
    Tests run: 2,  Failures: 2,  Errors: 0

**Compiled, on the edit**, 01:00:39 UTC, the same call labelled `new`:

    . link ProjectFortress/compiler_tests/NativeHelperFamilyRemainderCompiled  OK (time = 7916ms)
    . run ProjectFortress/compiler_tests/NativeHelperFamilyRemainderCompiled (542ms) PASS
    OK (2 tests)

The tests, each with one comment line and the section of the specification its messages cite:

- `ProjectFortress/tests/ZZ64RemainderByZeroWalk.fss`, promoted from `XXXZZ64RemainderByZeroWalk.fss` (row 336's) by `git mv` and its `component` line: its `widen(8) REM widen(0)` kept, `widen(8) MOD widen(0)` added, and `-8 REM 3` and `-8 MOD 3` asserted at -2 and 1.
- `ProjectFortress/tests/NN32RemainderByZeroWalk.fss`, promoted from `XXXNN32RemainderByZeroWalk.fss` (row 848's): its `unsigned(7) REM unsigned(0)` kept, `MOD` added, `7 REM 2` and `7 MOD 2` asserted at 1.
- `ProjectFortress/tests/ZZ32RemainderByZeroWalk.fss`, `NN64RemainderByZeroWalk.fss` and `ZZRemainderByZeroWalk.fss`, new in their form: `REM` and `MOD` by zero in a `try` catching `DivisionByZero`, and one value of each at a negative dividend or at 7 and 2.
- `ProjectFortress/tests/NativeHelperFamilyRemainderWalk.fss`, the walk guard: 118 assertions, `REM` and `MOD` on each type at the four pairs of signs, at zero remainders and a zero dividend, and at the bounds: `ZZ32`'s and `ZZ64`'s minimum `REM` and `MOD` -1 (0), maximum by minimum and minimum by maximum, minimum by 3; `NN32` at 2^31 and 2^32 - 1, `NN64` at 2^63 and 2^64 - 1, at divisors where a signed reading gives another value (2^31 `REM` 7 is 2, signed -2; 2^64 - 1 `REM` 10 is 5, signed -1); `ZZ` at 10^20, -10^20 and a 21-digit value, as dividend and as divisor. No division by zero: the five tests above hold it.
- `ProjectFortress/compiler_tests/NativeHelperFamilyRemainderCompiled.fss` and `.test` (`link`, `run`, `run_out_contains=PASS`), the compiled guard: one top-level declaration per helper of the ten, at `ZZ32`, `ZZ64` and `ZZ`, an `NN32` carried in a `ZZ32` and an `NN64` in a `ZZ64` as `NativeHelperFamilyNN32Compiled` and `NativeHelperFamilyNN64Compiled` carry them, 107 assertions of the same values and each division by zero raising `DivisionByZero`; three helpers beside the ten, `longOverflowingSub`, `makeZZfromZZ64` and `simpleArbitraryPrecisionArith.neg`, to make its values. Its `NN64` values above 2^63 are compared as their `ZZ64` carriers, not printed, since `unsignedLongToString` prints them signed until rung U's fix (row 326).

No test of the team's changed: the two promoted files are the revival's.

## Where the fix belongs, and the precedent

The place: walk's natives are the library's `builtinPrimitive` bindings, and the integer traits' operators live in `Library/FortressLibrary.fss` and `NN32`'s in `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss` (`explorations/coordinator/map/modules-and-phases.md:84`, `:206`; `explorations/coordinator/map/spec-to-implementation.md:157`); the helpers live in `nativeHelpers/`, one class per number type (`modules-and-phases.md:39`; fork 2). P-58 decides the form: the binding keeps `builtinPrimitive("…")` and its string names the helper.

The ways the language and the library offer for a remainder that raises at a zero divisor:

1. A new helper per binding, bound by the binding's string (P-58): both paths call it, and its raise reaches walk's `catch` (F-24). Taken.
2. A zero test in each glue class, throwing `Int.divisionByZero()` (`interpreter/glue/prim/Int.java:263-266`), row 336's other fix: walk only; the bindings stay on glue classes, which the compiled path cannot call (F-32).
3. `REM` and `MOD` written in Fortress over `DIV`, as the compiled prelude writes them (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:601-606`, `:686-691`): no longer a native binding, against P-58's bare form, and a change of the team's declarations.
4. A Fortress wrapper around a private binding that tests the divisor and throws: the same objection, and two declarations where the library has one.

The precedent repaired the same defect for `DIV`: `ZZ32`'s in climb batch 23 (`Library/FortressLibrary.fss:778-779`), `ZZ64`'s, `ZZ`'s, `NN32`'s and `NN64`'s in climb batch 24 (`:871-872`, `:1051-1052`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:438-439`, `Library/FortressLibrary.fss:954-955`). Its file, `Library/FortressLibrary.fss`, holds 12 integer divisions bound natively, `DIV`, `REM` and `MOD` on `ZZ32`, `ZZ64`, `NN64` and `ZZ` (`:778-783`, `:871-876`, `:954-959`, `:1051-1056`): the four `DIV`s named helpers at the base, and this rung moves the other eight, so all 12 now do. `FortressBuiltin.fss` holds six more: `NN32`'s three (`:438-443`), whose `DIV` named a helper and whose `REM` and `MOD` this rung moves, and `IntLiteral`'s three (`:530-535`), whose glue classes have no zero test either (`interpreter/glue/prim/IntLiteral.java:139-149`, `:178-186`) and which no walk program reaches while a numeral is an `Int` (F-32; P-76; row 578), left for N5.

## What the specification settles

"The operator \OPR{REM} gives the remainder from such a truncating division: \EXP{m \OPR{REM} n = m - n (m \div n)}. The operator \OPR{MOD} gives the remainder from a floor division" (`Specification/basic/operators/opr-overview.tex:130-133`), and "For integer results, division by zero throws a \TYP{DivisionByZero}." (`:165`). Every value the helpers compute was checked against these two definitions, `REM` with the truncating quotient and `MOD` with the floor quotient, for the 626 printed pairs (below): 0 differ. On `NN32` and `NN64` the two coincide, as the glue classes say ("MOD and REM are the same for natural numbers.", `interpreter/glue/prim/NN32.java:166`, `UnsignedLong.java:166`). The integers listing spells the exception `IntegerDivisionByZero` (`Specification/basic-lib/basic-integers.tex:246-250`), which neither library declares; row 792 holds that question, CONTESTED, and the helpers raise the `DivisionByZero` that both libraries declare and the operators chapter names.

## Programs run old against new

Scratch programs under the rung's `tmp/`, not committed, each run on the old code through `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base25 $PWD/tmp/rung-natives-remainders/old-caches P.fss` and on the edit through `bin/fortress P.fss`:

- `ValRem.fss`, written by a script: one `println` per pair of `REM` and `MOD` on each type at chosen values, the bounds among them: `ZZ32` 14 values, `ZZ64` 12, `NN32` 10 (2^31 - 1, 2^31, 2^31 + 1, 2^32 - 1 among them), `NN64` 10 (2^63 - 1, 2^63, 2^63 + 1, 2^64 - 1), `ZZ` 12 (±2^64, ±10^20, ±123456789012345678901, 2^63 - 1); every pair with a nonzero divisor, 626 lines. `diff ValRem.old.txt ValRem.new.txt` printed nothing; the check against the specification's definitions, '626 lines, 0 differ from the definitions', on both outputs. Among the lines, the same on both codes: 'ZZ32 -2147483648 -1 REM 0 MOD 0', 'ZZ64 -7 3 REM -1 MOD 2', 'NN64 18446744073709551615 9223372036854775808 REM 9223372036854775807 MOD 9223372036854775807', 'ZZ -100000000000000000000 -7 REM -2 MOD -2'.
- `ZeroModZZ32.fss`, `ZeroModZZ64.fss`, `ZeroModNN32.fss`, `ZeroModNN64.fss`, `ZeroModZZ.fss`: `MOD` by zero in a `try` catching `DivisionByZero`. The old code, each: 'Exception in thread "main" java.lang.ArithmeticException', rc=1. The edit, each: 'ZZ32 MOD by zero: DivisionByZero' (and the same for the other four), rc=0.

So no walk value moves but the remainders by zero.

## The suites

After the last change of code, once each, on `411436878`'s code (fork 12):

- `ant testSystem`: 'BUILD SUCCESSFUL', 'Total time: 3 minutes 55 seconds'; the shards 'Tests run: 181, Failures: 0', '179, Failures: 0', '188, Failures: 0', '179, Failures: 0', 727 tests, climb batch 24's 723 and this rung's four new files (the two promoted are renames).
- `ant testQuick`: 'BUILD SUCCESSFUL', 'Total time: 6 minutes 20 seconds'; the library track 'Tests run: 86, Failures: 0', the other-compiler track 'Tests run: 263, Failures: 0', the compiler track 'Tests run: 1381, Failures: 0', climb batch 24's 1379 and this rung's link and run. `IntegralOpsRungN` (library track) green.

No test changed its verdict. The two promoted tests were green as `XXX` expected failures on the base and are green under their plain names after.

## The stages

My edit changes paths outside the exempt folders (`Library/`, `ProjectFortress/LibraryBuiltin/`, `nativeHelpers/`), so both stages ran once each, on the final code, into the rung's `tmp/`. Machine: nproc 4, Intel Xeon Processor @ 2.10 GHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1`, under `nice -n 19` beside the batch.

The count, started 01:13:19 UTC, load at start 2.05, its table written at 01:15:50, 151 s:

    explorations/coordinator/tools/checker-count/run.sh tmp/rung-natives-remainders/checker-count-postedit.txt tmp/rung-natives-remainders/cc-post

    #total	0
    #locations	0
    #crash	none

`diff explorations/compile-ladder/climb-batch-24/gate/checker-count.txt tmp/rung-natives-remainders/checker-count-postedit.txt` printed nothing: the 14 api rows, the total, the locations and the crash line equal climb batch 24's.

The distance, started 01:16:27 UTC:

    explorations/coordinator/tools/distance/run.sh tmp/rung-natives-remainders/distance-postedit.txt tmp/rung-natives-remainders/dist-post

    #total	0
    #crash	none
    #seconds	207	FortressLibrary 151

`explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-24/gate/distance.txt tmp/rung-natives-remainders/distance-postedit.txt` printed 'DISTANCE SAME   0'. The table equals climb batch 24's but for its `#seconds` and `#machine` rows. The stage's list of error sites, its `errors.tsv`, held its header only ('1' from `wc -l`), as `explorations/compile-ladder/gate/distance-sites.tsv` does: no site moved, none came.

So the checker reads the ten moved bindings against their helpers, eight of them in `FortressLibrary` (both stages) and `NN32`'s two in `FortressBuiltin` (the distance stage only), and finds no error. No checker code changed, so no speed pass (fork 15).

## The ladder subset

No file's recorded first error in the baseline names what this rung touched (`awk` over `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`'s first-error column for the helper classes, `REM`, `MOD` and `DivisionByZero` printed nothing). The subset taken instead: the 12 ladder programs whose source uses `REM` or `MOD` (`ArrayListQuick`, `CovariantTest`, `IntMapTest`, `LongStringTests`, `PureListQuick`, `QuickCheckTest`, `UnsignedTest`, `chain0`, `intPrim`, `longPrim`, `simpleBig`, `simpleSum`) and the five whose first error is at a `builtinPrimitive` binding (`XXXarityTestFn`, `XXXfailTestFn`, `XXXnoclassNativeFn`, `nativeTestFn`, `testPrim`), all in `ProjectFortress/tests/`; with the eighteen microGPT components. The drivers copied under `tmp/rung-natives-remainders/ladder/` as the skill's `references/gate.md`, "The ladder regression", step 1 says, and run after the edit only: `bash run-subset.sh`, `python3 classify.py`, `bash microgpt-phase.sh`, `python3 microgpt-phase.py`.

- `chain0.fss`, the one of the 17 in the gate's pass list: 'pass', as in climb batch 24's `explorations/compile-ladder/climb-batch-24/gate/ladder/ladder.tsv`.
- The other 16, which the gate does not run, against the baseline's `ladder.tsv`: each at its recorded phase, 'disambiguate'. Seven name another first missing name than the baseline of 2026-09-19 records, each a name of walk's library that the compiler's prelude lacks: `ArrayListQuick`, `CovariantTest`, `simpleBig` 'ImmutableArray is undefined.' for 'LexicographicOrder is undefined.'; `IntMapTest` 'ImmutableArray' for 'Comprehension'; `LongStringTests` 'ImmutableArray' for 'Char'; `UnsignedTest` 'Variable partitionL is not defined.' for 'Variable unsigned is not defined.'; `longPrim` 'Operator ? is not defined.' for 'Variable widen is not defined.'. This rung changes no name the disambiguator resolves in the compiler's prelude (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss` and its imports are unchanged), so these are not its moves; no landed record of these 16 is newer than the baseline.
- The eighteen microGPT components: every phase equal to climb batch 24's `microgpt-phase.md`; only the seconds column differs.

No DOWN, MISSING or STDOUT.

## Sentences made false

The specification (the gather rewrites the Appendix I Effect once, fork 10):

- `Specification/appendices/changes.tex:4469`, "173 of the 449 bindings of \library\ name a helper:" and its list to `:4481`, which names no `REM` or `MOD`, "eighteen bindings of the trait \EXP{\mathbb{N}64}" and "twenty-one of \EXP{\mathbb{N}32}": after this rung alone, 183, `REM` and `MOD` of the five types added, twenty of `NN64` and twenty-three of `NN32`.
- `Specification/appendices/changes.tex:4482`, "The other 276 still name a glue class, which the compiled code cannot call.": 266.
- `Specification/appendices/changes.tex:4494-4498`, "\OPR{REM} and \OPR{MOD}, which still name glue classes, end the run with a Java exception at a divisor of zero, on \EXP{\mathbb{Z}32} and \EXP{\mathbb{Z}64} (row~336 of the revival's gap ledger) and on \EXP{\mathbb{N}32}, \EXP{\mathbb{N}64} and \EXP{\mathbb{Z}} (row~848 of the revival's gap ledger).": they now throw a `DivisionByZero`.

The specification's "For integer results, division by zero throws a \TYP{DivisionByZero}." (`Specification/basic/operators/opr-overview.tex:165`) becomes true under walk for `REM` and `MOD` on the five types. The team's note at the head of that chapter, "The operators in this section are not tested nor run by the interpreter yet." (`Specification/basic/operators/opr-overview.tex:14`), was already false of `DIV`, `REM` and `MOD` before this rung, which only adds tests; this rung does not make it false.

The record (the gather folds `record.md`):

- Row 336's claim, `explorations/fortress-gap-ledger.md:513`, and row 848's, `:553`: closed by this rung.
- F-24 (`explorations/coordinator/FACTS.md:18`): "Any other Java exception of a native becomes a `ProgramError`, which no `catch` takes, so a division by zero elsewhere ends the run (rows 336, 848)."
- F-306 (`explorations/coordinator/FACTS.md:136`): "trait `ZZ64`'s 20 and trait `ZZ`'s 16 native bindings name helpers" and "`REM` and `MOD` still name glue classes and end the run at a zero divisor (row 336 for `ZZ64`, row 848 for `ZZ`)".
- F-308 (`explorations/coordinator/FACTS.md:138`): "`NN32`'s 20, `NN64`'s 17 and `Char`'s 39 bindings name their helpers", "each of the 76", "Under walk the 76 keep the glue classes' values, but `NN32`'s and `NN64`'s `DIV` by zero throws `DivisionByZero`".
- F-32 (`explorations/coordinator/FACTS.md:30`): "of its 449 live bindings, 276 name one" and "F-299 holds the 173 that name one".
- F-299 (`explorations/coordinator/FACTS.md:134`): "173 of the one library's 449 live bindings name one", its counts by type, "the other 276 name glue classes".
- Line citations that the ten helpers' insertion moves, after this rung alone (rungs U and N edit the same classes, so the merged tree's numbers differ): row 856's `simpleUnsignedIntArith.java:231` (now `:242`) and `simpleUnsignedLongArith.java:228` (now `:239`); row 860's `simpleUnsignedIntArith.java:101-103` (now `:112-114`) and `simpleUnsignedLongArith.java:106-108` (now `:117-119`); F-305's `simpleIntArith.java:162-163` and `:210-213` (now `:174-175`, `:222-225`) and `simpleLongArith.java:136-137` and `:183-186` (now `:148-149`, `:195-198`); `explorations/coordinator/CLIMB-BATCH-25.md:84`'s `simpleUnsignedIntArith.java:101-103`; the skill's `references/sources.md:978`, `simpleUnsignedIntArith.java:230-231` and `simpleUnsignedLongArith.java:227-228` (now `:241-242`, `:238-239`). Rows 350, 441, 523, 524 and 525 cite these classes' lines at a named commit, which stay true.

## Points to report

- **rung-R.patch taken, its five comments rewritten.** The code and the ten strings are the planner's; each pair's comment named the walk glue classes it replaces, provenance that the skill puts in commit messages and reports (`.claude/skills/fortress-repo/references/committing.md:15`), and now says what the helpers compute (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:84-85`, `simpleLongArith.java:84-85`, `simpleUnsignedIntArith.java:67`, `simpleUnsignedLongArith.java:80`, `simpleArbitraryPrecisionArith.java:47-48`). Each binding moved: `ZZ32`'s `REM` and `MOD` (`Library/FortressLibrary.fss:780-783`), `ZZ64`'s (`:873-876`), `NN64`'s (`:956-959`), `ZZ`'s (`:1053-1056`), `NN32`'s (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:440-443`).
- **The division tests and the promoted ones, before and after; the two guards on the base and on the text**: above, "The tests: failing on the base, passing after".
- **The tables**: the count '#total 0', equal to climb batch 24's, 151 s; the distance '#total 0', 'DISTANCE SAME   0', 207 s; no site came.
- **Walk values beyond the remainders by zero**: none moved, 626 pairs; no test's verdict changed in `ant testQuick` or `ant testSystem`.
- **Sentences made false**: above.
- **Files beyond those named**: none. The paths changed: the seven named source files, `ProjectFortress/tests/` (the two renames and four new files) and `ProjectFortress/compiler_tests/` (two new files), and this folder.

## Decisions

1. **rung-R.patch with its comments rewritten**, over the patch as it stands, whose comments name the glue classes ("as walk's Int$Rem and Int$Mod compute them"), against `committing.md:15`; and over no comment, as the precedent's division helpers have none (`simpleIntArith.java:78-82`), since the sign of `MOD` and the sameness of the natural numbers' two are not visible in one Java call. Every line of code is the planner's.
2. **New helpers that raise, over a zero test in each glue class** (fork 4; row 336's notes name both): P-58 has the bindings name helpers; the zero test leaves them on classes the compiled path cannot call (F-32).
3. **`MOD` on `NN32` and `NN64` as its own helper with `REM`'s body**, over binding `MOD`'s string to the `Rem` helper: one helper per operation, as the glue classes have one class per operation (`interpreter/glue/prim/NN32.java:137-141`, `:164-169`) and as the brief names the ten; the body is one line.
4. **Each division test asserts one value of `REM` and one of `MOD` beside the zero divisors**, as the `DIV` tests assert one (`ProjectFortress/tests/ZZ32DivisionByZeroWalk.fss:17`), over zero divisors only; and asserts, over printing as the planner's probes did.
5. **`MOD` by zero on the base shown by five probe programs on the old code**, since each test's `REM` line ends the run first; over five more tests with `MOD` first, which would duplicate the five.
6. **The compiled guard compares `NN64` values above 2^63 as their `ZZ64` carriers**, as `ProjectFortress/compiler_tests/NativeHelperFamilyNN64Compiled.fss:60` and `:67` do, over printing them through `unsignedLongToString`, which prints them signed until rung U's fix (row 326).
7. **The ladder subset of 17 by use**, over the empty subset the first-error rule gives: the programs that use `REM` or `MOD`, and those whose first error is at a `builtinPrimitive` binding, the form this rung edits.
8. **`DivisionByZero`, the operators chapter's name**, over the listing's `IntegerDivisionByZero`, which neither library declares (row 792, CONTESTED; the brief names `DivisionByZero`).

## Defects and their homes

- **Row 336**, `REM` and `MOD` by zero on `ZZ32` and `ZZ64` end walk's run: home 1, repaired; `ZZ64RemainderByZeroWalk` (promoted) and `ZZ32RemainderByZeroWalk`.
- **Row 848**, the same on `NN32`, `NN64` and `ZZ`: home 1, repaired; `NN32RemainderByZeroWalk` (promoted), `NN64RemainderByZeroWalk` and `ZZRemainderByZeroWalk`.

No other defect was measured, so this rung adds no row and no `XXX` test. `IntLiteral`'s three division glue classes without a zero test are not measured: no walk program reaches them while a numeral is an `Int` (F-32).

## For FACTS

In `record.md`, "For FACTS": the new entry, and the sentences of F-24, F-306, F-308, F-32 and F-299 to rewrite.

## Commands worked out

- The value probe: `python3 -I gen.py` writes `ValRem.fss` (one `println` per pair, each `a.asString || " " || …`), and `python3 -I check.py ValRem.old.txt` checks each line against `REM`'s and `MOD`'s definitions; both in `tmp/rung-natives-remainders/probes/`, not committed.
- The comparison of a ladder subset whose files the gate does not run: the subset's rows of `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv` against the run's `ladder.tsv`, by corpus, file, phase and first error, through `awk` and `diff`.
