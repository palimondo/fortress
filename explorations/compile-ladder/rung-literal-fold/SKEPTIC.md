# Climb batch 29, rung F: the skeptic's verdict

Head judged: `b01f04bda3` (the worker's last commit). Head after: the commit of this file, after `c68437686d`, `5fdaeab699`, `5c68eb91ac` and `61abbd8d7f`. The branch carried the worker's `REPORT.md` and `record.md`, so no text was written from the run's journal.

Verdict: **approved**. The fold, its phase in walk's order, the typed-place constants and the once-per-site call do what the section, P-173, P-174, P-172 and forks F1 to F8 say, with one defect of the change, repaired here (the subnormal rounding), and two defects the change leaves or reaches, recorded here with `XXX` tests. No fix is contested.

## What I checked

1. **The stages.** The worker's tables, read: `tmp/rung-literal-fold/checker-count-postedit.txt` holds `#total 0`, `#locations 0`, `#crash none`, and `diff` against `explorations/compile-ladder/climb-batch-28/gate/checker-count.txt` prints nothing; `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-28/gate/distance.txt tmp/rung-literal-fold/distance-postedit.txt` prints `DISTANCE SAME   0`. Both stages were started in one call (`ELpTV2`, 03:24:27), after the worker's last change of code (the code of `8e4ca7b070`, committed 03:08:47; `f58c027526` and `1bf56ffa92` change tests only). The report's tables are those of the worker's head; my fix changes the code generator's rounding helpers and a unit test's comments, which neither stage reads, and I ran neither stage. No checker Scala is edited, so P-148's timing does not apply.
2. **Test first.** In the worker's transcript: walk `harness-one.sh` at 02:52:56 (`cNjqa6`) on the base's code, "UNEXPECTED exception / FortressException: IntegerOverflow / Tests run: 3,  Failures: 1"; the compiled `junit.sh base` at 02:53:15 (`3FseTS`), "CompilerError: Integer Literal folding: Need to do something for factorial of negative values", "Tests run: 9,  Failures: 5"; `ant testOnly -DtestPattern=NumeralFoldJUTest` at 02:53:31 (`j7ZvB2`), on the base's code with the test class added (its first edit of the visitor is `H1ZEsy`, 02:57:24); the first build of the edit is `oNk19a`, 03:02:00. The passing runs after the last change of code: `YFpAdo` 03:34:54 `OK (8 tests)`, `yA6mpb` 03:35:15 `OK (14 tests)`, `rHLyCS` 03:34:41 `Tests run: 9, Failures: 0, Errors: 0`. The lines the report quotes are those of the runs.
3. **The diff**, line by line, against the section, forks F1 to F8, P-173, P-174, P-172 and repair 3: the operators folded and left, the forms (fork F1), the `CHOOSE` repair and the operators left (fork F2), the phase order (fork F3), the concatenation (fork F4), the once-per-site call (fork F5), the typed-place constants (fork F8). The worker's deviations are argued in its decisions; I differ from none of them. CodeGen's hunks do not touch rung C's `:6336-6345`; `StrictEquivalenceRuleWalk.fss:26` and `sequivTest.fss:31` are edited in place, apart from rung N's `:32`, `:58` and `:94` and rung S's `:37-49`.
4. **Precedent.** The team's fold's result form, the code generator's static-field idioms and `ExprFactory.makeInfixOpExpr` are cited and followed as the report says. The lifted-coercion test by the name prefix `coerce_` follows `NodeUtil.isLiftedCoercion` (`ProjectFortress/src/com/sun/fortress/nodes_util/NodeUtil.java:1546-1550`). The worker's ledger search missed row 318 (below).
5. **The tests.** Each new test exercises its defect; messages cite files by section; each `.fss` has one comment line. `NumeralFoldJUTest.java` had a five-line class comment and two helper comments: cut to one line (`5c68eb91ac`).
6. **My programs**, under `tmp/rung-literal-fold/skeptic/`, below.
7. **Homes** for each defect, below.
8. **The ledger and sibling sites**: `ledger.py find` with "fold", "folding", "static expression", "roundings", "subnormal", "Math.pow", "CodeGen.forFloatLiteralExpr"; rows 318, 360, 361, 362, 387, 887, 348, 578 read.
9. **The report**: its five provenance lines opened with `sed -n` and true as written; the sentences made false; the suites' verdicts, commands and commit (`8e4ca7b070`, whose code is the head's); the points to report; record.md's findings, FACTS hand-over, rows and Revival change. Corrections in `61abbd8d7f`.
10. **Competing declarations**: no test, class or name the rung adds (the eight test names, `NumeralCoercionSite`, `numeralTarget`, `roundToDouble`, `roundToFloat`, `emitNumeralCoercionSites`, `emitFnApp`, `numeralCoercionSiteDesc`, `LIBRARY_APIS`, `numeral$coercion$`, `run_exits_nonzero`, `chooseZZ32`) has another declaration in `ProjectFortress/tests/`, the compiled test folders or `ProjectFortress/src/com/sun/fortress/`, nor among the files the batch's other five branches add.
11. **Failure modes**, below.

The base build `/home/user/fortress-base29` is at `8cde0b2c4f`, an ancestor of the base `b430f9f428` with no difference under `ProjectFortress/src`, `Library` or `ProjectFortress/LibraryBuiltin` (`git diff --stat 8cde0b2c4f b430f9f428 -- ...` prints nothing); its old code is the base's.

## My programs, old against new

Walk, `old-fortress.sh /home/user/fortress-base29 <tree>/tmp/old-caches P.fss` and the tree's `bin/fortress P.fss` with a private caches folder, at `FORTRESS_THREADS=1`:

`w/FoldEdges.fss`:

    old: 0.1 = 0.1000000000000000000001: true              new: ... false
    old: -9223372036854775808 kind ZZ                       new: -9223372036854775808 kind ZZ64
    old: FoldEdges.fss:36:14-16: IntegerOverflow (2^62 + 2^62)   new: 2^62 + 2^62 = 9223372036854775808 kind ZZ
    new: RHS expression type Long is not assignable to LHS type ZZ32   (a: ZZ32 = try 2147483647 + 1 catch e IntegerOverflow => -1 end)

and unchanged: `abs -5 = 5`, `chain 1 < 2 < 3: true, 1 < 3 < 2: false`, `(2/3)^(-1) = 3/2 kind QQ`, `2.0^(-1) = 0.5`, `(-2)^3 = -8, 0^0 = 1`, `1.5 2 = 3.0`, `7 DIV 2 = 3, (-7) REM 2 = -1, 7 MOD (-2) = -1`, `0 LCM 5 = 0, 12 GCD 18 = 6`, `3 MINMAX 5 = (3,5)`.

`w/ZeroZZ.fss` and the first two lines of `FoldEdges.fss`:

    old: big(5).zero = 0 kind ZZ                            new: big(5).zero = 0 kind ZZ32
    old: big(5).one LSHIFT 40 = 1099511627776 kind ZZ       new: big(5).one LSHIFT 40 = 0 kind ZZ32
    old: big(5).zero + 3000000000 kind ZZ                   new: big(5).zero + 3000000000 kind ZZ64

`w/Concat.fss`: old "Failed to find any matching overload, args = (12: ZZ32,34: ZZ32)", new `12 || 34 = 1234` (fork F4). `w/Typed.fss`: `y: RR32 = 0.5 + 0.25` refused on both, "RHS expression type Float is not assignable to LHS type RR32" and "... FloatLiteral ...", row 454.

Walk's library, old against new: the `interpreter_cache` dumps of the ten library components on the base build and on this tree, paths replaced, compared (`libdiff/`). The fold rewrites 25 lines of `FortressLibrary`, `FortressBuiltin`, `RangeInternals` and `FlatString`, each to a numeral of the same value, but `Library/FortressLibrary.fss:1093-1095`, `ZZ`'s `getter zero(): ZZ = 1934791870947204798109283471902037419 - 1934791870947204798109283471902037419`, whose body becomes `(IntLiteralExpr @1094:9~44 _intVal=0 _text="0")`; `Stream`'s differ only in generated names; `List`, `String`, `CovariantCollection`, `NativeArray` and `Writer` not at all.

Compiled, `old-fortress.sh ... compile P.fss && old-fortress.sh ... run P`, then the tree's:

`c/TypedConsts.fss`: unchanged `n: NN32 = 4294967295 prints  4294967295`, `m: NN64 = ... 18446744073709551615`, `b: ZZ ... 123456789012345678901234567890`, `f: RR32 = 0.1 prints  0.1`, `k: ZZ64 prints  -9223372036854775808`, `p: ZZ32 prints  -2147483648`; changed:

    old: t: RR64 = 0.1 - 0.3 prints  -0.19999999999999998     new: t: RR64 = 0.1 - 0.3 prints  -0.2
    old: tiny RR64 prints  0.0                                 new: tiny RR64 prints  4.940656458412465E-308   (a 324-digit numeral, 4.94...e-308)

`c/Wrap.fss` (`a: ZZ32 = 2147483647 + 1`): `java.lang.Error: Not in range for ZZ32: 2147483648` on both.

`c/Sites.fss`, a numeral at a program's type in a top-level function, an object's method, a closure, a generic function at two instances, a generic object's method at two instances, a trait's default method, a top-level variable, an argument and a `FloatLiteral` coercion: old `start`, `coerce  1`, `coerce  1`, `FAIL:  top-level function site`; new, at `FORTRESS_THREADS=1` and three times at 4, `start`, `values  1   2   3   4   5   6   7   8   0.5`, `PASS`, exit 0, every coercion printed once before `start`. `c/InitOrder.fss` (a coercion that reads a top-level variable): new `coerce  1`, `start`, `first().v =  101`. `c/GenSite.fss` (`site(): Gen[\String\] = 3`): old and new `coerce  3`, `coerce  3`, `one site, two evaluations SEQV:  false`.

The rounding helpers, a Java probe against `BigDecimal` (`round/SubnormalProbe.java`, `round/RoundAll.java`, compiled against the tree's classes):

    worker's head:  RR64 (2.5 + 2^-60) ulps: roundToDouble 9.9E-324 (2.0 ulps), BigDecimal 1.5E-323 (3.0 ulps)
                    RR32 (2.5 + 2^-60) ulps: roundToFloat 2.8E-45 (2.0 ulps), BigDecimal 4.2E-45 (3.0 ulps)
                    random subnormal-range decimals: 200000, double mismatches 1155, float mismatches 0
                    random decimals 400000 x3: double mismatches 1268, float mismatches 1335; ties 0
    the fix:        RR64 (2.5 + 2^-60) ulps: roundToDouble 1.5E-323 (3.0 ulps), BigDecimal 1.5E-323 (3.0 ulps)
                    random subnormal-range decimals: 200000, double mismatches 0, float mismatches 0
                    random decimals 400000 x3: double mismatches 0, float mismatches 0; ties 0

The diff adds static fields and moves the component class's static initializer; `Sites.fss` and `TypedConsts.fss` ran at `FORTRESS_THREADS=1` and `=4` on the fix with the same output and exit 0.

## The fix

**A numeral below the least normal value rounded twice into `RR64` and `RR32`** (`c68437686d`, a defect of the change). The rung's `roundToDouble` and `roundToFloat` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:4247-4271` at `b01f04bda3`) rounded the quotient to 53 (or 24) bits by `BigInteger.doubleValue` (`floatValue`) and scaled it by `Math.scalb`, which rounds again where the result is subnormal. Settled by P-172 (`explorations/coordinator/POSITIONS.md:103`): "into `RR64` or `RR32` a numeral rounds once, to the type's nearest value, on both paths". The helpers now find the unit in the last place of the result, the least subnormal's at the least (`ulpExponent`), round the quotient there to nearest even from a guard and a sticky bit (`roundedSignificand`), and scale exactly (`CodeGen.java:4247-4285`). The ways: this; `BigDecimal.doubleValue` of the decimal, which reaches only radix-ten numerals and not a folded `p.0 / d`; `Double.valueOf` of the text, likewise. Test: `FloatNumeralOneRounding.fss` gains an `RR32` numeral and an `RR64` numeral just above the midpoint of two subnormal values, the `RR32` value read by its raw bits through `simpleFloatArith.floatRawBits` (the prelude's `RR32` has no `=`, row 528: my first form of the assertion died with "java.lang.AbstractMethodError: Receiver class com.sun.fortress.compiler.runtimeValues.FRR32 does not define or inherit an implementation of the resolved method 'abstract ... =?0").

On the worker's head, before the edit, `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh head ProjectFortress/compiler_tests FloatNumeralOneRoundingLink.test FloatNumeralOneRounding.test` (06:27:02, the `RR64` assertion first) and `... head3 ...` (06:28:03, the final order):

    . run ProjectFortress/compiler_tests/FloatNumeralOneRounding (289ms) FAIL:  a numeral just above the midpoint of two subnormal RR64 values rounds once, up
    Tests run: 3,  Failures: 1,  Errors: 0
    . run ProjectFortress/compiler_tests/FloatNumeralOneRounding (335ms) FAIL:  2 =/= 3; a numeral just above the midpoint of two subnormal RR32 values rounds once, up
    Tests run: 3,  Failures: 1,  Errors: 0

After the fix, built by `ant compileAll` and the library order (06:30:41 to 06:31:53, "BUILD SUCCESSFUL", five jars), `ONE_JVM=1 ... junit.sh fix ProjectFortress/compiler_tests FloatNumeralOneRoundingLink.test FloatNumeralOneRounding.test LiteralFoldCompiled.test NumeralCoercionOnceCompiled.test NumeralCoercionRaisesCompiled.test NumeralDivByZeroCompiledLink.test XXXNumeralDivByZeroCompiled.test NumeralCoercionGenericTypeCompiledLink.test XXXNumeralCoercionGenericTypeCompiled.test Print17.test` (06:32:07):

    . run ProjectFortress/compiler_tests/FloatNumeralOneRounding (318ms) PASS
    OK (16 tests)

and `ant testOnly -DtestPattern=NumeralFoldJUTest` (06:33:40): `[junit] Tests run: 9, Failures: 0, Errors: 0, Skipped: 0`. The fix is the code generator's, not the checker's, walk's or a shared phase's, so it needs no whole suite (`tests-running.md`, "When to run a whole suite"); the gate runs every suite on the merged tree.

## Corrections

- **Two `XXX` tests** (`5fdaeab699`), each a defect I measured, home 2:
  - `compiler_tests/XXXNumeralCoercionGenericTypeCompiled.test` with `NumeralCoercionGenericTypeCompiledLink.test`: a numeral at a program's own generic type is one object per site (P-174); the rung's once-per-site call takes only a coercion without static arguments into a type without them (`CodeGen.java:7189-7204`, `numeralCoercionSiteDesc`), so `site(): Gen[\String\] = 3` calls the coercion at each evaluation. row 957 in record.md. Seen through the harness on the fix: "REACHED / FAIL:  two evaluations of one site are one object / Saw expected failure (Exit code != 0)"; with `Gen`'s static parameter removed for one run, then restored (`junit.sh xxxred ...`): "REACHED / PASS / Did not see expected failure / Tests run: 2,  Failures: 1".
  - `tests/XXXZZOneGetterWalk.fss`: under walk `ZZ`'s `zero` and `one` answer `ZZ` values (P-173: a numeral converts into the type its place fixes); the fold makes their bodies the numeral `0`, which walk returns unconverted (row 387). `harness-one.sh` on the fix (06:32:37): "FAIL: ZZ's zero is a ZZ / OK Saw expected exception"; with `big(0)` and `big(1)` in place of the getters for one run, then restored: "FAILURES!!! / Tests run: 1,  Failures: 1"; on the old code (`FORTRESS_HOME=/home/user/fortress-base29 .../harness-one.sh`, 06:33:12) as written: "FAILURES!!! / Tests run: 1,  Failures: 1", so the base answers `ZZ`: the regression is the fold's.
- **`NumeralFoldJUTest.java`'s comments** cut to one line (`5c68eb91ac`); its run above.
- **record.md and REPORT.md** (`61abbd8d7f`): NEW-F-1 is row 318's defect, whose stubs `CompilerBuiltin.fss:896-928` it names, and row 318's reproducer was `none`: record.md gives row 318's whole new line with `XXXNumeralDivByZeroCompiled.test` as its reproducer in place of a new row; row 387's whole new line (the library case), and row 957, each linted by `python3 explorations/coordinator/tools/ledger.py check --rows tmp/rung-literal-fold/skeptic/rows.txt` ("only the number rule fails", for row 957); findings 9 and 10, a question for the curator; the report's account of the rounding helpers and its 200,000-decimal probe, which lay in the normal range; the walk answers the fold changes in walk's library and two more; the homes of the defects I measured; two sentences of the skill made false (`SKILL.md:77` with its phase list, `references/interpreter.md:25`); the CodeGen citations my fix moved.

## Where I differ from the worker

None of its decisions. Its account of its own ledger search ("No baseline error names the fold"; the rows it wrote) missed row 318, which holds NEW-F-1's defect; and its probe of the rounding helpers sampled only the normal range.

## Failure modes

Loud failures that become values, each by the decided design: `2147483647 + 1`, `2^40` and `65536 DOT 65536` under walk, from `IntegerOverflow` to the `ZZ64` value (P-173); `3 CHOOSE 5` compiled, from a `CompilerError` to 0 (row 954, the specification's zero rule); `12 || 34` under walk, from a failed dispatch to `1234` (fork F4). A loud failure that changes its form: under walk `a: ZZ32 = 2147483647 + 1` stops with "RHS expression type Long is not assignable to LHS type ZZ32", which no `catch IntegerOverflow` takes, where it raised `IntegerOverflow` (P-173 refuses it statically; rung C's checker and rung N's walk). A program's coercion that raises now fails the component class's load instead of the site's evaluation (fork F5). One quiet change of value, not by design: under walk `big(5).one LSHIFT 40` is `0` where it was `1099511627776` (row 387, `XXXZZOneGetterWalk`); rung N's contested fix `953d050966`, a numeral at a declared return type converted there, repairs it on the merged tree if it is kept.
