<!-- Climb batch 24, rung Z (rung-natives-integers): ZZ64's 20 and ZZ's 16 native bindings moved onto the nativeHelpers helpers that both paths call, so that their DIV by zero raises DivisionByZero under walk; the rung's tests, its runs, its decisions and its defects. -->

# Rung Z: the 64-bit and big integers, ZZ64's 20 and ZZ's 16 (P-58; row 336)

- problem: under walk, `ZZ64`'s and `ZZ`'s `DIV` by zero end the run with a Java `ArithmeticException` (row 336, `explorations/fortress-gap-ledger.md:507`), and their 36 bindings name glue classes, which the compiled path cannot call (F-32); the planner's runs: `explorations/coordinator/CLIMB-BATCH-24.md:401`
- spec: `Specification/basic/operators/opr-overview.tex:164-165`, "For integer results, division by zero throws a \TYP{DivisionByZero}."
- precedent: `ZZ32`'s `DIV` on `simpleIntArith.intOverflowingDiv`, `Library/FortressLibrary.fss:778-779`, with its tests `ProjectFortress/tests/ZZ32DivisionByZeroWalk.fss:1-20`, `ProjectFortress/tests/NativeHelperFamilyZZ32Walk.fss:1-51` and `ProjectFortress/compiler_tests/NativeHelperBindingCompiled.fss:1-44`
- deviation: the guards assert each result through its `asString` against a literal string, where `NativeHelperFamilyZZ32Walk.fss:17-48` compares with numerals (`ProjectFortress/tests/NativeHelperFamilyIntegersWalk.fss:25-121`); the guards assert `unsigned` only at values `NN64` holds, where `NativeHelperFamilyZZ32Walk.fss:45` asserts `unsigned(-1)` (`NativeHelperFamilyIntegersWalk.fss:76-77`); the compiled guard catches its exceptions through functions over closures, where `NativeHelperBindingCompiled.fss:33-37` writes the `try` inline (`ProjectFortress/compiler_tests/NativeHelperFamilyIntegersCompiled.fss:34-65`); no spelling departs from the specification's
- historical: `Library/FortressLibrary.fss:831-905`, `:1007-1076`

## What changed and why

P-58 has each native binding's string name a static helper of `nativeHelpers/`, step by step, checked by the compiled checker from the step that moves it; F-299 has walk load such a string beside its glue classes and raise a helper's `DivisionByZero` or `IntegerOverflow` as the library's own. This rung moves the next 36, in `Library/FortressLibrary.fss` only, one string per binding, the planner's `explorations/compile-ladder/plan-24/probes/rung-Z.patch` taken as it is (`git apply` on the base, 36 lines changed for 36):

- trait `ZZ64` (`:831-905`), 20: `=` and `<` on `simpleLongArith.longEQ` and `longLT`; the prefix `-` and `DOTMINUS` on `longOverflowingNeg` and `longWrappingNeg`; `+`, `DOTPLUS`, the infix `-` and `DOTMINUS` on `longOverflowingAdd`, `longWrappingAdd`, `longOverflowingSub` and `longWrappingSub`; `DOT`, `TIMES` and juxtaposition on `longOverflowingMul`, `DOTTIMES` on `longWrappingMul`; `DIV` on `longOverflowingDiv`; `BITAND`, `BITOR`, `BITXOR` and `BITNOT` on `longBitAnd`, `longBitOr`, `longBitXor` and `longBitNot`; `narrow` on `simpleIntArith.longWrappingToInt`; `unsigned` on `simpleUnsignedLongArith.makeNN64FromZZ64WithSpecialCompilerHackForNN64ResultType`; `big` on `simpleArbitraryPrecisionArith.makeZZfromZZ64`.
- trait `ZZ` (`:1007-1076`), 16, all of `simpleArbitraryPrecisionArith`: `=` on `eq`; the prefix `-` and `DOTMINUS` on `neg`; `+` and `DOTPLUS` on `add`; the infix `-` and `DOTMINUS` on `sub`; `DOT`, juxtaposition, `TIMES` and `DOTTIMES` on `mul`; `DIV` on `div`; `BITAND`, `BITOR`, `BITXOR` and `BITNOT` on `and`, `oor`, `xor` and `not`.

28 helpers in all. Left on their glue classes, as the brief has them: `ZZ64`'s `REM`, `MOD`, `GCD`, `LCM`, `CHOOSE` (rung K), `LSHIFT`, `RSHIFT`, `^` and `partitionL` (`:873-899`); `ZZ`'s `cmp`, `REM`, `MOD`, `GCD`, `LCM`, `CHOOSE`, `LSHIFT`, `RSHIFT`, `shift`, `^`, `narrow` and `widen` (`:1020-1084`). None of the 36 is left on its glue class.

`longOverflowingDiv` raises `fortress.CompilerBuiltin$DivisionByZero` at a zero divisor (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleLongArith.java:78-82`), and so does `div` (`simpleArbitraryPrecisionArith.java:42-45`); walk's loader raises that as the library's `DivisionByZero` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java:186-192`). So `ZZ64`'s and `ZZ`'s `DIV` by zero now throw `DivisionByZero`, which a `catch` sees, as the specification says. The glue classes they replace divide with no zero test: `Long$Div` is `x / y` (`interpreter/glue/prim/Long.java:137-141`), `BigNum$Div` is `x.divide(y)` (`BigNum.java:158-162`). Every other value stays (below, "Each program run old against new").

One condition the move adds, measured not to bite: a helper over `BigInteger` takes each argument by `getBigInteger` (`StaticNativeApp.java:200`), which only a `BigNum` value answers (`interpreter/evaluator/values/FValue.java:57-58` throws for any other class), where `BigNum`'s glue converted any integer value itself (`toB`, `BigNum.java:41-52`: `FIntLiteral`, `FNN64` and anything with `getLong`). Walk converts a `ZZ32`, `ZZ64`, `NN32` or `NN64` operand of a `ZZ` operator by `ZZ`'s coercions before the call (`Library/FortressLibrary.fss:994-1001`), so every mixed call probed, in both orders, gave the old code's value (the probe `ValZmix`, below).

No file is edited beyond those named: `git diff --name-only b0f6cd6b7460389333cb7ad1b050b736f8f68e6e` lists `Library/FortressLibrary.fss`, the six test files and this rung's two record files.

The worktree was seeded with `seed-worktree.sh`, exit 0, from `/home/user/fortress-base23`, whose head is `1f5c49b4f`; the 43 files that differ between `1f5c49b4f` and the base `b0f6cd6b7` are all under `explorations/` (`git diff --name-only 1f5c49b4f b0f6cd6b7 | grep -v '^explorations/'` prints nothing), so the base build's code is the base's.

## The tests, failing and passing

Five tests, all new:

- `ProjectFortress/tests/ZZ64DivisionByZeroWalk.fss` and `ProjectFortress/tests/ZZDivisionByZeroWalk.fss`: a `DIV` by zero in a `try` that catches `DivisionByZero`, in the form of `ZZ32DivisionByZeroWalk`, and a `DIV` that divides.
- `ProjectFortress/tests/XXXZZ64RemainderByZeroWalk.fss`: `widen(8) REM widen(0)` in such a `try`, the specification's answer asserted; an expected failure on the base and on the text (fork 6).
- `ProjectFortress/tests/NativeHelperFamilyIntegersWalk.fss`, the walk guard: each of the 36 at ordinary values and at the bounds (87 assertions), each overflow raising `IntegerOverflow` (unary `-`, `+`, `-`, `DOT`, `TIMES`, juxtaposition, `DIV` of the minimum by -1), each wrapping operator's wrap, `narrow` past `ZZ32`'s range keeping the low 32 bits (`basic-integers.tex`, section "Integers"; P-72), `unsigned` and `big`, and `ZZ`'s operators past `ZZ64`'s range; no division by zero.
- `ProjectFortress/compiler_tests/NativeHelperFamilyIntegersCompiled.fss` with its `.test` (`link`, `run`, `run_out_contains=PASS`), the compiled guard: one top-level declaration per helper of the 28, over `ZZ64`, `ZZ`, `ZZ32` and `NN64` (the special name), the walk guard's values asserted, and `longOverflowingDiv` and `div` by zero raising `DivisionByZero`.

On the base's code, before the library was edited, 11:18:47 to 11:18:58 UTC:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-natives-integers/h-base ProjectFortress/tests/ZZ64DivisionByZeroWalk.fss ProjectFortress/tests/ZZDivisionByZeroWalk.fss ProjectFortress/tests/XXXZZ64RemainderByZeroWalk.fss ProjectFortress/tests/NativeHelperFamilyIntegersWalk.fss

    Caused by: java.lang.ArithmeticException: BigInteger divide by zero
    F. interpret tmp/rung-natives-integers/h-base/tests/NativeHelperFamilyIntegersWalk
     OK (time = 705ms)
    Caused by: java.lang.ArithmeticException: / by zero
    Tests run: 4,  Failures: 2,  Errors: 0

The two failures are `ZZDivisionByZeroWalk` and `ZZ64DivisionByZeroWalk`; `XXXZZ64RemainderByZeroWalk` printed 'OK Saw expected exception'.

The `XXX` test shown red on a deliberate fix, on the base, 11:19:11 to 11:19:20 UTC: `fn () => widen(8) REM widen(0)` replaced by `fn () => throw DivisionByZero` for one run, then restored (`git diff` of the file empty after):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-natives-integers/h-xxx ProjectFortress/tests/XXXZZ64RemainderByZeroWalk.fss

     Missing expected failure
    1) tmp/rung-natives-integers/h-xxx/tests/XXXZZ64RemainderByZeroWalk(com.sun.fortress.tests.unit_tests.FileTests$InterpreterTest)junit.framework.AssertionFailedError: Expected failure or exception, saw none.
    Tests run: 1,  Failures: 1,  Errors: 0

The compiled guard on the base, 11:20:32 UTC:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests NativeHelperFamilyIntegersCompiled.test

    . link ProjectFortress/compiler_tests/NativeHelperFamilyIntegersCompiled  OK (time = 4684ms)
    . run ProjectFortress/compiler_tests/NativeHelperFamilyIntegersCompiled (474ms) PASS
    OK (2 tests)

Its assertions are live: with one expected string set off by one for a run, then restored, the run printed 'FAIL:  104885277489412658 =/= 104885277489412659; ZZ DIV beyond ZZ64' and 'Tests run: 2,  Failures: 1'.

On the text, after the patch (committed as `083d2e3b4`, the same code), 11:22:24 UTC: the same `harness-one.sh` call, 'OK (4 tests)', `XXXZZ64RemainderByZeroWalk` 'OK Saw expected exception'; the compiled guard 11:24:42 UTC, 'OK (2 tests)'. The last runs, after the last change of code (the count stage's control, below, edited one string and restored it), on `083d2e3b4` with a clean tree, 11:34:05 and 11:34:21 UTC:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-natives-integers/h-final ProjectFortress/tests/ZZ64DivisionByZeroWalk.fss ProjectFortress/tests/ZZDivisionByZeroWalk.fss ProjectFortress/tests/XXXZZ64RemainderByZeroWalk.fss ProjectFortress/tests/NativeHelperFamilyIntegersWalk.fss
    OK (4 tests)

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh final ProjectFortress/compiler_tests NativeHelperFamilyIntegersCompiled.test
    OK (2 tests)

No whole suite runs: the rung edits library text only (fork 9; the `fortress-repo` skill's `tests-running.md`, "When to run a whole suite"). The compiled tracks cannot move: no compiled test reads `Library/FortressLibrary.fss`.

## Where the fix belongs, and the precedent

The place: walk's natives are the library's `builtinPrimitive` bindings (`explorations/coordinator/map/spec-to-implementation.md` and `modules-and-phases.md` give the library, `Library/FortressLibrary.fss`, as the home of the integer traits' operators; P-58 decides the binding's form). The ways the language and the library offer for a division that raises:

1. The binding's string names the helper that the compiler's prelude binds for the same operation (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:539`, `:600`): the library's own form, P-58's way, and the precedent's. Taken.
2. A zero test in the glue class throwing `Int.divisionByZero()` (`interpreter/glue/prim/Int.java:263-266`), row 336's other fix: walk only, and the binding still names a glue class that the compiled path cannot call (F-32). Not taken.
3. A Fortress body in the library, as `if b = 0 then throw DivisionByZero else ... end` around the native: a second declaration per operator, and the body is no longer exactly `builtinPrimitive("...")`, which P-58 keeps as the binding's form. Not taken.

The precedent repaired the same defect for `ZZ32`'s `DIV` (`Library/FortressLibrary.fss:778-779`, climb batch 23's rung W). Its file holds 12 integer divisions bound natively, `DIV`, `REM` and `MOD` on `ZZ32`, `ZZ64`, `NN64` and `ZZ` (`:778-783`, `:871-876`, `:954-959`, `:1051-1056`): at the base one names a helper, `ZZ32`'s `DIV`; this rung moves two, `ZZ64`'s and `ZZ`'s `DIV`; `NN64`'s `DIV` is rung H's; the other eight, every `REM` and `MOD`, have no helper in `nativeHelpers/` (`grep -n -i 'rem\|mod' simpleLongArith.java simpleIntArith.java` names only the shift helpers), so they stay on their glue classes, and row 336 keeps the four on `ZZ32` and `ZZ64`, row 848 the rest. `FortressBuiltin.fss` holds six more (`NN32`'s at `:438-443`, rung H's; `IntLiteral`'s at `:530-535`, F-32's 24 that cannot move yet).

## What the specification settles

"For integer results, division by zero throws a \TYP{DivisionByZero}." (`Specification/basic/operators/opr-overview.tex:164-165`), which the five tests cite by file and section. It becomes true under walk for `ZZ64`'s and `ZZ`'s `DIV`, and stays false for every `REM` and `MOD` (rows 336, 848). The integer chapter's listing names `IntegerDivisionByZero` on `ZZ`'s `DIV` (`Specification/basic-lib/basic-integers.tex:246`), an exception neither library declares; row 792 holds that conflict, `CONTESTED`, and the tests take the operators chapter's name, as both libraries and the precedent do. `narrow` keeps the low 32 bits and raises nothing (`basic-integers.tex:38-44`; P-72), asserted. The specification is silent on `unsigned` of a negative value (`basic-integers.tex:35-36` names every other conversion only as explicit), so neither guard asserts one (decision 4).

## Each program run old against new

The old code is the base build's, through `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base23 <tree>/tmp/rung-natives-integers/old-caches P.fss`; the new is `bin/fortress P.fss` in this tree on the text. Both programs are scratch, under the rung's `tmp/`, not kept.

- `ValZpairs`, written by a script: every one of the 36 under walk, the binary ones at every pair of eight `ZZ64` values (the minimum and one above it, -12, -1, 0, 7, the maximum and one below it) and of seven `ZZ` values (±1934791870947204798109283471902037419, -1, 0, 7, `ZZ64`'s maximum, 2^64), `DIV` by zero left out, the unary ones and `narrow`, `unsigned` and `big` at each, each result printed and each `IntegerOverflow` or `DivisionByZero` caught: 1,587 lines on each code, 140 of them an `IntegerOverflow`; `diff pold.txt pnew.txt` prints nothing.
- `ValZmix`, 84 calls: the operators of `ZZ` and `ZZ64` with a numeral, a `ZZ64`, an `NN32` or an `NN64` on either side; `|x|`, `CMP`, `MAX`, `>=` and `/` (which call the moved `<`, `-`, `DIV`); `unsigned` of -1 and of the minimum; `narrow` at the bounds; numerals past `ZZ64`; `SUM[\ZZ64\]`, `PROD[\ZZ\]`; `ZZ`'s `zero` and `one`; the glue-bound `^`, `GCD`, `LCM` and `MOD` beside them: 84 lines on each code, `diff` prints nothing. The old code printed, among them, 'b3 + u5 = 8', 'unsigned(m1) = 18446744073709551615', '|mn| raises IntegerOverflow', 'big(6)/big(4) = 3/2'.

So no value moves under walk beyond the two divisions by zero, which the two division tests show.

## The stages

My edit changes `Library/FortressLibrary.fss`, outside the paths that cannot move a stage, so both ran once on the final code (`083d2e3b4`), each under `nice -n 19`, in the background. Their before is climb batch 23's landed tables (`explorations/compile-ladder/climb-batch-23/gate/`), 0 and 0.

The count, from 11:25:08 UTC to 11:27:20 UTC, 132 s (nproc 4, Intel Xeon Processor @ 2.10GHz, 2100 MHz, load 0.60 at start, openjdk 25.0.4.1, `FORTRESS_THREADS=1`):

    explorations/coordinator/tools/checker-count/run.sh tmp/rung-natives-integers/checker-count-postedit.txt tmp/rung-natives-integers/cc-post

    FortressLibrary	0
    com.sun.fortress.nativeHelpers	0
    #total	0
    #locations	0
    #crash	none

`diff explorations/compile-ladder/climb-batch-23/gate/checker-count.txt tmp/rung-natives-integers/checker-count-postedit.txt` prints nothing: the same 14 api rows, every one 0. The checker-count tables' diff is therefore empty. No checker code changed, so no speed pass (fork 14).

The distance, 11:29:09 UTC, '#seconds 173 FortressLibrary 131' at load 3.42 (another agent's work beside it):

    explorations/coordinator/tools/distance/run.sh tmp/rung-natives-integers/distance-postedit.txt tmp/rung-natives-integers/dist-post
    #total	0
    #crash	none

    explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-23/gate/distance.txt tmp/rung-natives-integers/distance-postedit.txt
    DISTANCE SAME   0

Its table differs from climb batch 23's only in the `#seconds` and `#machine` rows. `tmp/rung-natives-integers/dist-post/errors.tsv` holds only its header line, as the per-site list `explorations/compile-ladder/gate/distance-sites.tsv` does: no site came and none went.

A control, to show that the count reads the moved bindings against their helpers: `ZZ`'s `=` (`Library/FortressLibrary.fss:1008`) set to name `simpleArbitraryPrecisionArith.add` for one run of the count stage, 11:32:31 UTC, then restored (`git status --short` empty after): '#total 1', '#locations 1', and in its full output 'FortressLibrary.fss:1008:9-91:' 'Function body has type ZZ, but declared return type is Boolean.' So the checker reads a moved `ZZ` binding through the helper's Java signature, `BigInteger` read as `ZZ`.

## The ladder subset

The seven files whose recorded first error in the baseline's `ladder.tsv` (`explorations/compile-ladder/baseline-2026-09-19/`) names a member or a type whose bindings the rung touched: `BigNum.fss`, `NumberPrintTest.fss` and `RationalTest.fss` ('Variable big is not defined.'), `UnsignedTest.fss` and `fib13.fss` ('Variable unsigned is not defined.'), `UnnamedParam.fss` and `litCoercion.fss` (a declared or found type `ZZ64`). None is in climb batch 23's landed `ladder.tsv`, and the baseline's `raw/` keeps no output for them, so the comparison is with the baseline's `ladder.tsv`. The drivers copied under `tmp/rung-natives-integers/ladder/` as `gate.md`, "The ladder regression", says, its caches seeded from the tree's own `default_repository/caches`, run after the edit only:

    bash tmp/rung-natives-integers/ladder/run-subset.sh && python3 tmp/rung-natives-integers/ladder/classify.py

Four files have the baseline's phase and first error: `BigNum.fss`, `NumberPrintTest.fss`, `RationalTest.fss` and `litCoercion.fss`. Three differ from the baseline of 2026-09-19: `UnnamedParam.fss` (typecheck, 'Could not check call to function println'), `UnsignedTest.fss` (disambiguate, 'Variable partitionL is not defined.') and `fib13.fss` (typecheck, 'Could not check call to operator SQRT'). Each of the three compiled on the old code, `old-fortress.sh /home/user/fortress-base23 <tree>/tmp/rung-natives-integers/old-caches compile tests/X.fss`, gives the same first error and the same output, the paths and the `Operation took` line masked. So they moved between the baseline and this base, not by this rung: the ladder compiles against the compiler's prelude, which the rung does not touch. No ladder move is this rung's.

## Sentences made false

- `Specification/appendices/changes.tex:4466-4473`, the Appendix I entry "A native binding that names a static helper", its Effect: "Twenty-one of the 449 bindings of \library\ name a helper: nineteen of the trait \EXP{\mathbb{Z}32}, ..." and "The other 428 still name a glue class, which the compiled code cannot call." With this rung alone, 57 name a helper and 392 a glue class.
- `Specification/appendices/changes.tex:4483-4486`, the same Effect: "\EXP{\mathbb{Z}32}'s \OPR{REM} and \OPR{MOD}, the three on \EXP{\mathbb{Z}64}, and \EXP{\div} on \EXP{\mathbb{Z}}, which still name glue classes, end the run with a Java exception at a divisor of zero (row~336 ...)": `ZZ64`'s `DIV` and `ZZ`'s `DIV` now throw `DivisionByZero`; `ZZ32`'s `REM` and `MOD` and `ZZ64`'s `REM` and `MOD` still end the run. The gather rewrites the Effect (fork 7).
- Row 336's claim, "`DIV`, `REM` and `MOD` by zero on `ZZ64`, and `DIV` by zero on `ZZ` end the run": rewritten in `record.md`.
- F-32's counts, "of its 449 live bindings, 428 name one" (a glue class), and F-299's "21 of the one library's 449 live bindings name one" (a helper) with its list of the 21: with this rung, 392 and 57.
- F-24's "so `ZZ32`'s `DIV` by zero raises `DivisionByZero`" stays true but is incomplete: `ZZ64`'s and `ZZ`'s `DIV` too, with their tests.

`opr-overview.tex:164-165` becomes true for `ZZ64`'s and `ZZ`'s `DIV`. No `\revision` or `\note{}` box of the specification speaks of walk's integer division by zero (`grep -rn -i 'by zero' Specification/ --include=*.tex` names only the listings, the operators chapter and the Appendix I entry). The `fortress-repo` skill's `references/interpreter.md`, "Natives", "`ZZ32`'s `DIV` by zero raises `DivisionByZero` in this way.", stays true and could name `ZZ64` and `ZZ` (the record's "Revival change").

## Points to report

- rung-Z.patch taken as it is, every binding moved, none of the 36 left on its glue class: "What changed and why"; `git apply explorations/compile-ladder/plan-24/probes/rung-Z.patch`, `git diff --stat` '1 file changed, 36 insertions(+), 36 deletions(-)'; `Library/FortressLibrary.fss:831-905`, `:1007-1076`.
- The division tests and the `XXX` test, before and after, through the harness, and the two guards on the base and on the text: "The tests, failing and passing".
- The distance table and the count table on the final tree, no site, the count's 132 s: "The stages".
- Walk values that move beyond the two divisions by zero: none, by 1,587 and 84 values compared: "Each program run old against new".
- Row 336's rewritten line and its reproducer `XXXZZ64RemainderByZeroWalk`: `record.md`, "Rows".
- Every sentence made false: "Sentences made false".
- A file edited beyond those named: none.

## Decisions

1. **rung-Z.patch as it is.** Chosen: the planner's 36 strings unchanged; the helpers are those the compiler's prelude binds for the same operations (`CompilerBuiltin.fss:517-545`, `:578-629`), each one's Java semantics read against its glue class's (`Long.java:112-258`, `:373-395`, `BigNum.java:134-264`: the same overflow tests and the same wraps), and the planner's and this rung's value probes print the same on both codes. Not taken: moving `ZZ64`'s `REM` and `MOD` too, which have no helper and would put new Java into a rung of library text (the brief's "Not yours"); `ZZ64`'s `CHOOSE`, rung K's.
2. **The division tests in the precedent's form.** Chosen: `ZZ32DivisionByZeroWalk`'s shape, a `DIV` by zero inside a closure called in a `try` that catches `DivisionByZero`, with one ordinary `DIV` beside it (fork 6). Not taken: catching `Exception`, which would pass on a wrong exception; a `.test` key on the run's output.
3. **The guards assert through `asString`.** Chosen: each `ZZ64` and `ZZ` result compared as its string with a literal, so that no assertion rests on the moved `=` it tests, or on a numeral's coercion into `ZZ64` or `ZZ` at the comparison; `=` and `<` are asserted by their own Boolean results. Not taken: the `ZZ32` guard's form, `assert(x, numeral, msg)`, which there compares two `ZZ32` values natively.
4. **No `unsigned` of a negative value.** Chosen: `unsigned` asserted at 7 and at `ZZ64`'s maximum, values `NN64` holds; the brief's fork 5 rules out a value "that the specification leaves open", and the specification names no rule for it (`basic-integers.tex:35-44`; row 856's notes: "keep the low bits or raise is row 502's question"). `unsigned(-1)` and `unsigned` of the minimum were compared old against new in `ValZmix` and agree. Not taken: the `ZZ32` guard's `unsigned(m)` at -1 (`NativeHelperFamilyZZ32Walk.fss:45`). The question stays with the curator (forCurator).
5. **The `XXX` test's deliberate fix.** Chosen: on the base, the remainder by zero replaced for one run by `throw DivisionByZero`, the defect gone, then restored. Not taken: a remainder helper bound for one run, since none exists; `REM` swapped for `DIV` on the text, which would make the fix depend on the rung's own change.
6. **The compiled guard's form.** Chosen: 28 top-level declarations, one per helper, the walk guard's values, its overflows and divisions by zero caught in three functions over closures, each with a mutable flag; it compiled and ran as written. Not taken: a declaration per binding (36), which repeats `mul` four times and `neg`, `add` and `sub` twice; the inline `try` of `NativeHelperBindingCompiled.fss`, 13 times.
7. **The ladder subset.** Chosen: the seven files whose baseline first error names `big`, `unsigned` or `ZZ64`; the three that differ from the baseline compiled on the old code too. Not taken: an empty subset, on the reading that the ladder compiles against the compiler's prelude, which the rung does not touch; the gate's whole 85.
8. **The ladder's caches.** Chosen: the driver's `root/ladder-caches` and `root/pristine` copied from the tree's own `default_repository/caches`, which hold the library order's five jars, as the gate's step 3 copies them. Not taken: the driver's own library build, about 145 s, which builds the same jars.
9. **One control of the count.** Chosen: one run of the count stage with `ZZ`'s `=` naming the wrong helper, to show that 0 means the moved bindings are read, as climb batch 23 showed for `ZZ32`'s `<` and the planner for `Float`'s `<`; then the walk tests and the compiled guard run again on the restored code. Not taken: no control, since none had read a `ZZ` binding through `BigInteger`.
10. **The brief's "red" for the `XXX` test read as the defect showing.** The brief has `XXXZZ64RemainderByZeroWalk` "red through the harness on the base and on your text alike"; the harness reports it green ('OK Saw expected exception', a JUnit pass) on both, which is the defect showing; it is red only on the deliberate fix. Read so; no other reading fits fork 6.

## Defects, each with its home

- `ZZ64`'s `DIV` by zero ends the run under walk (row 336): home 1, repaired; `ProjectFortress/tests/ZZ64DivisionByZeroWalk.fss`.
- `ZZ`'s `DIV` by zero ends the run under walk (row 336): home 1, repaired; `ProjectFortress/tests/ZZDivisionByZeroWalk.fss`.
- `ZZ64`'s `REM` by zero ends the run under walk, 'java.lang.ArithmeticException', on the base and on the text (row 336, which keeps `REM` and `MOD` on `ZZ32` and `ZZ64`): home 2, deferred, the specification settles it (`opr-overview.tex:164-165`); `ProjectFortress/tests/XXXZZ64RemainderByZeroWalk.fss`, row 336's reproducer.

No other defect was measured. The listing's `IntegerDivisionByZero` is row 792's, open as `CONTESTED`; nothing here measures it.

## For FACTS

`record.md`, "For FACTS", holds the entry and the changes to F-24, F-32 and F-299.

## Commands worked out

- `python3 explorations/coordinator/tools/ledger.py check --rows tmp/rung-natives-integers/row336.txt`: lints a row line against the template without writing the ledger; 'ledger.py check: tmp/rung-natives-integers/row336.txt, 1 rows, 0 fail the template'.
- The ladder subset's caches seeded from the tree's own: `cp -a default_repository/caches $D/root/ladder-caches && cp -a $D/root/ladder-caches $D/root/pristine`, before `run-subset.sh`, which then skips its library build.
