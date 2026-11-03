<!-- Climb batch 25, rung R (rung-natives-remainders): the skeptic's check of the worker's change, its programs, its one correction and its verdict. -->

# Rung R: the skeptic's verdict

Head judged: `bdd4b87f1`, the worker's. The branch already carried `REPORT.md` and `record.md`, so nothing was written from the run's journal. Verdict: **approved**, with one correction (`1a9bc9707`), no contested fix.

## What I checked

1. **The tables.** `tmp/rung-natives-remainders/checker-count-postedit.txt` reads '#total 0', '#locations 0', '#crash none'; with its `#seconds` and `#machine` rows left out, `diff` against `explorations/compile-ladder/climb-batch-24/gate/checker-count.txt` printed nothing. The stage started at 01:13:19 (`count-start.txt`) and wrote its table at 01:15:50, the report's 151 s. `distance-postedit.txt` reads '#total 0', '#crash none', '#seconds 207 FortressLibrary 151'. The report's tables are those of the worker's head; no checker code changed, so I ran no stage.
2. **Test first, from the transcript** (`agent-ae0116e7fc4476333.jsonl`): the tests were written by heredocs at 00:54-00:56; the walk run on the base's code at 00:56:34 (call `A5X1pq`), 'Tests run: 6,  Failures: 5,  Errors: 0'; the compiled run on the base at 00:58:20 (`tSauLe`), 'builtinPrimitive names no static helper: com.sun.fortress.nativeHelpers.simpleIntArith.intRem', 'Tests run: 2,  Failures: 2'; tests committed at 00:58:37; `git apply` of the patch at 00:58:43 (`FpMDbS`); the comments rewritten at 00:58:53 (`rcK6pY`); `ant compileAll` at 00:59:03, 'BUILD SUCCESSFUL'; the library order; the passing runs at 01:00:23 (`VWhCn8`) 'OK (6 tests)' and 01:00:39 '. run ProjectFortress/compiler_tests/NativeHelperFamilyRemainderCompiled (542ms) PASS', 'OK (2 tests)'. No code changed after. The order holds.
3. **The diff.** `git diff 97a416b18...bdd4b87f1` touches the seven named sources, the tests and the rung's folder only. The code is the planner's `rung-R.patch` line for line; only the five comments differ, now saying what the helpers compute. Against the glue classes: `Int$Rem` and `Long$Rem` are `x % y` (`interpreter/glue/prim/Int.java:130-134`, `Long.java:144-148`), as `intRem` and `longRem`; `Int.mod` (`Int.java:388-399`) is the floor remainder, as `Math.floorMod`; `NN32$Rem`, `$Mod`, `UnsignedLong$Rem` and `$Mod` are `Unsigned.remainder`, as `remainderUnsigned`; `BigNum$Rem` and `$Mod` (`BigNum.java:164-168`, `:200-208`) are the bodies of `rem` and `mod`. Each helper adds only the zero test, as the precedent `intOverflowingDiv` does (`simpleIntArith.java:78-82`).
4. **Precedent and siblings.** The precedent is `DIV` on the same five types (F-306, F-308). After the rung every native integer `DIV`, `REM` and `MOD` names a helper but `IntLiteral`'s three (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:530-535`), which P-76 holds back (`git grep` over `Library` and `LibraryBuiltin` for `glue.prim.*$(Rem|Mod|Div)` prints only those three). On the compiled path `REM` and `MOD` are the prelude's Fortress over `DIV` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:601-606`, `:686-691`), which already raise.
5. **The tests.** Each file has one comment line, is named by its topic, and cites `opr-overview.tex` and its section, no line. The walk guard's values I checked by hand at the bounds (2^64 - 1 `REM` 7 is 1, 2^32 - 1 `REM` 7 is 3, -10^20 `MOD` -7 is -2).
6. **My programs**, under `tmp/rung-natives-remainders/skeptic/`, below.
7. **Homes.** Rows 336 and 848: home 1, repaired, as the report says. The defect my programs measured, below: home 2.
8. **Ledger.** `ledger.py find remainder`, `find MOD`, `find DIVREM`: rows 336, 848 and 792 bear on the rung; 792 stays CONTESTED and the helpers raise the `DivisionByZero` both libraries declare.
9. **The report.** Its provenance lines opened with `sed -n`: `opr-overview.tex:165` is "For integer results, division by zero throws a \TYP{DivisionByZero}."; `basic-integers.tex:246-250` the listing's `throws IntegerDivisionByZero`; `ZZ32DivisionByZeroWalk.fss` 20 lines, `NativeHelperFamilyZZ32Walk.fss` 51, `NativeHelperBindingCompiled.fss` 44; `committing.md:15` the provenance rule; `NativeHelperFamilyNN64Compiled.fss:60`, `:67` the carried comparisons; the revival change's `git show a874948ac` lines are the team's `REM` and `MOD` bindings and `Int$Rem`, `BigNum$Rem`. The suites: `tmp/rung-natives-remainders/testSystem.txt` 'Tests run: 179', '179', '181', '188', each 'Failures: 0', 'BUILD SUCCESSFUL'; `testQuick.txt` '86', '263', '1381', 'Failures: 0', 'BUILD SUCCESSFUL', both on `411436878`'s code. The sentences made false are listed whole, and `record.md`'s counts agree with F-299 and F-308 as written (F-306's `ZZ64` 20 and F-299's 21 differ at the base, and the record raises each by two).
10. **Competing declarations.** `grep -rn -w` of the eight new helper names over `ProjectFortress/src`, `tests`, `compiler_tests` and the other test folders finds only their definitions and the compiled guard; `rem` and `mod` are new in `simpleArbitraryPrecisionArith`.
11. **The failure mode.** The rung turns a crash into a throw, not into a quiet value: an uncaught `5 MOD zero` now ends the run with the Fortress error 'DivisionByZero' at its source position, where the old code printed 'Exception in thread "main" java.lang.ArithmeticException'.

## My programs

Walk, the new code `bin/fortress P.fss` and the old code `old-fortress.sh /home/user/fortress-base25 $PWD/tmp/old-caches P.fss`:

- `SkRemWalk.fss`, 22 lines: literals, `ZZ32` and `ZZ64` minimum by -1, a divisor `-zero`, a `ZZ` built from a numeral (`sm: ZZ = 7`) by `big(0)` and `big(-3)`, a 30-digit `ZZ` by ±97, `NN32` and `NN64` maxima by 2^31 + 1 and 2^63 + 1, and the zero divisors. New code, rc=0, among its lines: 'ZZ32 -0 divisor REM DBZ', 'ZZ small MOD -3 -2', 'ZZ h MOD -97 -52', 'ZZ h MOD 97 45', 'NN64 max MOD (2^63+1) 9223372036854775806', 'NN64 max MOD 0 DBZ'; each nonzero value equals Python's floor and truncating remainders. Old code: ended at the first zero divisor, 'Caused by: java.lang.ArithmeticException: / by zero', 'at com.sun.fortress.interpreter.glue.prim.Int$Rem.f(Int.java:132)'.
- `SkRemWalkNZ.fss`, the same without the zero divisors, 17 lines: `diff nz.old.txt nz.new.txt` printed nothing.
- `SkRemWalk.fss` again at `FORTRESS_THREADS=4`: the same 22 lines. The helpers keep no state, so 1 and 4 threads are only a check.
- `SkRemUncaught.fss`: above, item 11.

Compiled, `bin/fortress compile` and `run` on each code: `SkRemCompiled.fss` printed the same seven lines on both, 'c 7 MOD -3 -2', 'c m REM -1 0', 'c 7 REM 0 DBZ', 'c 7 MOD 0 DBZ'; the compiled path's `REM` and `MOD` are the prelude's and the rung leaves them as they were.

## The finding and its correction

**`DIVREM` and `DIVMOD` are declared by neither library.** The report said "`DIVREM` and `DIVMOD`, which the library writes in Fortress over `DIV`, `REM` and `MOD`", as the batch record does (`explorations/coordinator/CLIMB-BATCH-25.md:212`). My first `SkRemWalk.fss` stopped at load on both codes:

    bin/fortress tmp/rung-natives-remainders/skeptic/SkRemWalk.fss
    .../SkRemWalk.fss:52:45-49:
        Operator DIVREM is not defined.
    .../SkRemWalk.fss:53:45-49:
        Operator DIVMOD is not defined.

`git grep -n -E 'DIVREM|DIVMOD' -- Library ProjectFortress/LibraryBuiltin` finds only `Library/incomplete/basic/Fortress.Number.fsi:130-131`, which no build reads, and `bin/fortress compile` gives the same refusal. The operators chapter specifies both: "\EXP{m \OPR{DIVREM} n} returns \EXP{(m \div n, m \OPR{REM} n)} while \EXP{m \OPR{DIVMOD} n} returns \EXP{(\left\lfloor {m \over n} \right\rfloor, m \OPR{MOD} n)}" (`Specification/basic/operators/opr-overview.tex`, "Multiplication, Division, Modulo, and Remainder Operators"). No ledger row held it. The specification settles it and the rung does not repair it, so home 2: a correction, not a defect of the change, which the brief puts out of its scope.

- The test: `ProjectFortress/tests/XXXDivRemDivModWalk.fss`, `-7 DIVREM 2` as (-3, -1), `-7 DIVMOD 2` as (-4, 1), and each by zero throwing `DivisionByZero`. Through the harness on the head, `explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-natives-remainders/skeptic/h-head ProjectFortress/tests/XXXDivRemDivModWalk.fss`: 'tree bdd4b87f1', 'OK Saw expected exception', 'OK (1 test)'. On the base, `FORTRESS_HOME=/home/user/fortress-base25 /home/user/fortress-base25/explorations/compile-ladder/rung-inference-walk/harness-one.sh .../h-base .../XXXDivRemDivModWalk.fss`: 'tree dc571c1f3', 'OK Saw expected exception', 'OK (1 test)'. Changed for one run with the two operators declared in the program, then restored: ' Missing expected failure', 'Tests run: 1,  Failures: 1,  Errors: 0'.
- The row: NEW-R-1 in `record.md`, "Ledger", for section "6. Integer arithmetic"; `ledger.py check --rows` found only its `?` number cell.
- The report's sentence corrected to name it.
- Commit `1a9bc9707`, "Skeptic's correction: DIVREM and DIVMOD, which neither library declares, recorded by an XXX test and a ledger row". Settled by the operators chapter's sentence above and by `tests-writing.md`, "How a defect is recorded", item 2. No code changed, so nothing was built and no suite ran; the gate runs the new file with walk's suite.

## Where I differ from the worker

Only in its decision 7's premise and its "Defects and their homes", "No other defect was measured": the worker measured none, and my program measured the one above. Every other decision I take as argued.

## Points to report

The worker's six, each as its report gives them, and one more: the test `ProjectFortress/tests/XXXDivRemDivModWalk.fss`, a new `XXX` test in a folder the section names, with row NEW-R-1. The batch record's "DIVREM and DIVMOD, which the library writes in Fortress" (`explorations/coordinator/CLIMB-BATCH-25.md:212`) is false; it is not this rung's file, so it is left for the gather.

## Verdict

Approved. The change does what the section asks and only that, its tests failed first on the base and pass after, and every value but the remainders by zero is the old code's.
