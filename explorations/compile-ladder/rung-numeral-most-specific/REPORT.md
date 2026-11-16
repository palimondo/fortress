# Rung N, `rung-numeral-most-specific`: a numeral at a call goes to the most specific declaration that takes it

- problem: under walk `u = 0` is `false` and `u =/= 0` `true` for a zero `u` of `NN32` (rows 973 and 966 of the gap ledger, with their kin 975 and 976); on the compiled path `k(5)` beside `k(x: Any)` and `k(x: NN32)` dies with `NoSuchMethodError` (row 390's numeral case) and `mul(1.0, f)` is refused as an ambiguous coercion (row 989). `explorations/reviews/numeral-equality-ways-2026-11-10.md:83-103`
- spec: `Specification/basic/conversions-coercions.tex:111-135`, section "Principles of Coercion", as this rung revises it; the choice among declarations reached by coercion, section "Coercion Resolution". `Specification/basic/conversions-coercions.tex:524`
- precedent: walk's own comparison of the declaration that fits a numeral with the one that its default fits, by strict subtyping of the two domains, in `bestMatchForNumerals`; the checker's tie rule for numerals, `numeralTie`. `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:2329-2336`
- deviation: none from the specification's spelling as revised; from the precedent, the comparison now runs between the declaration that fits the numeral at its default and those that the numeral's own coercion reaches, and `numeralTie` no longer asks that the tied declarations differ only at the numerals. `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:824`
- historical: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java`, `Library/FortressLibrary.fss`, `Library/FortressLibrary.fsi`, `Specification/basic/conversions-coercions.tex`, `Specification/appendices/changes.tex`. `Library/FortressLibrary.fss:100`

The branch is `wip/rung-numeral-most-specific`, cut from db352c1776, in the worktree `/home/user/fortress-numeral-most-specific`, seeded from `/home/user/fortress-base33` by `seed-worktree.sh` (exit 0). Its commits: `5466455249` (the rule on both paths, the library, the tests), `662ead960f` (the specification, the expected failure, test text), `8c1088c06c` (walk's dispatch cache), and the commits of these files.

The rung was worked by two launches. The first made the commits above and wrote this report and `record.md`, and was stopped before it committed the report. The second took over at `53588ec9b7`, changed no code, and ran on that tree: `ant compileAll` ('Caches ... kept', 'BUILD SUCCESSFUL'), then the rung's tests once more through the harness, at 2026-11-16T01:29Z: `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh n4 ProjectFortress/compiler_tests NumeralMostSpecificCompiled.test NumeralTieDefaultCompiled.test NumeralStaticDesignCompiled.test`, 6 tests with no failure; the same script on `CoercionAnyOverloadRungCLink.test XXXCoercionAnyOverloadRungC.test`, 'Saw expected failure (Exit code != 0)', 'OK (2 tests)'; and `harness-one.sh` on the four walk tests of section 2, 'OK (4 tests)'.

## 1. What changed and why

**The rule (P-46, P-49, P-173).** At a call, a numeral is applicable to a parameter that fixes no type, at its default, and to a parameter whose type declares a coercion from the numeral's type, by that coercion. Among the applicable declarations the most specific runs; where two are not ordered, the one that the default fits.

**The checker**, `scala_src/typechecker/impls/Functionals.scala`, in `typedApplicationOfChecked` only (`:807-848`, `:850`, `:944`), and `numeralTie` (`:884-928`):

- `numeralAttempt` (`:824-845`). Where the attempt by subtyping is kept and the call has a numeral argument, the most specific candidates of that attempt that need no coercion are its heads. Where a head has a numeral at a parameter whose type is not the numeral's default type, the attempt with coercion is taken with the same expected type, and of its candidates those are kept that need a coercion, only at numeral arguments (`onlyNumerals`, `:819-822`), and whose declared arrow lies strictly below every head's by subtyping of the declared domains (`coercions.moreSpecificDeclared`, `scala_src/typechecker/CoercionOracle.scala:85-88`). If there are such candidates and their result converts to the expected type, they are the call's candidates.
- `resolved` (`:850-942`) is the former tail of the function, from the candidates of an attempt to the call's candidates and type, as a local function. It is called quietly on the numeral candidates first; where they do not resolve to one declaration, it is called on the attempt that the function chose before, with its errors signalled as before (`:944`). So of two declarations not ordered, the one that the default fits stays.
- `numeralTie` (`:893`): the condition that the tied candidates differ only at numeral positions is gone; the call must have a numeral. The readings and the choice among the candidates that the readings fit are unchanged. This is fork N2: `mul(1.0, f)` and `1.0 s` resolve at the declaration that the float numeral's default, `RR64`, fits as it is.
- No signature changed. `retypedApplication`'s call (`:796-798`) stands where it was. Nothing in `checkApplicableWithInference` was touched; the rule needed no change there.

**Walk**, `interpreter/evaluator/values/OverloadedFunction.java`:

- `bestMatchForNumerals` (`:2325-2358`): after the declaration that fits the numeral as it is has been found (with the existing comparison against the one that the defaults alone fit), `belowByNumerals` is asked for a better one.
- `belowByNumerals` (`:2374-2428`): none is sought where each numeral sits at a parameter of its default type. Otherwise, of the overloads that take the arguments only by the numerals' own coercions (`Coercions.coercionFor`, which reads the coercion's `where` clause and the type's range), every other argument matching as it is, those whose domain is a strict subtype of the fitting declaration's domain; the one of them more specific than the others (`mostSpecificThroughOthers`), as a `CoercedCall` that converts the numerals and dispatches again; none where there is no single one.
- The dispatch cache (`:2252-2268`): a choice is not kept where it asked a type that is not one of the library's eight number types, and that declares a coercion from the numeral's type, for that coercion (`Numerals.ownCoercionFrom`, `interpreter/evaluator/values/Numerals.java:402-405`). The cache's key holds a numeral's default type, its own type and its range at the library's types (`Numerals.java:646-702`), not the answer of a program's `where` clause: `y = 300` after `y = 7` for `y: Byte` would otherwise run the cached conversion. `bestMatch` keeps its public signature (`:2279`); a private overload carries the flag.
- `Coercions.java` is unchanged. No public signature of `Numerals.java` or `Coercions.java` changed; `ownCoercionFrom` is new and package-private.

**The library** (fork N3): `Equality[\T\]` gains `opr =/=(self, other:T): Boolean = NOT (self = other)` (`Library/FortressLibrary.fss:102`, `Library/FortressLibrary.fsi:75`). The library's `=/=` over `Any` (`.fss:98`) and the own `=/=` of `QQ`, `RR32` and `Float` stay. The form is the one in which the library's order traits give an operator beside a catch-all: a functional method of the self-typed trait with a default body, as `StandardPartialOrder`'s `opr <(self, other:T)` (`Library/FortressLibrary.fss:231`), declared without `abstract` in the api (`Library/FortressLibrary.fsi:181`).

**The prelude** is unchanged (fork N1).

## 2. The failing runs and the passing runs

The tests were written first and run on the base's code through the harness before the edit was built (the build's log starts after both runs). After those runs the two `NumeralMostSpecific` tests gained the assertion on `width(1.5)`, the compiled one the case of a `ZZ32` typed `Any`, and all cite the section by its title; the assertions that failed are unchanged.

Compiled, on the base's code, at 2026-11-16T00:17:21Z:

    explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base33 $PWD/tmp/old-caches junit \
        $PWD/ProjectFortress/compiler_tests/NumeralMostSpecificCompiled.test $PWD/ProjectFortress/compiler_tests/NumeralTieDefaultCompiled.test

    Ambiguous coercion in call to function mul: of the declarations applicable to an argument of type (RadixPointNumeral[\2,1,10,10\], RR32) only by coercion, none is more specific than every other: (RR64, RR64)->String; (Q, Q)->String.
    F. run .../compiler_tests/NumeralMostSpecificCompiled (539ms) java.lang.NoSuchMethodError
    Caused by: java.lang.NoSuchMethodError: 'fortress.CompilerBuiltin$String NumeralMostSpecificCompiled.\=k{...}(fortress.AnyType$Any)'
    Tests run: 4,  Failures: 3,  Errors: 0

Walk, on the base's code, at 2026-11-16T00:18:48Z (the two promoted tests under their plain names, and the new one):

    FORTRESS_HOME=/home/user/fortress-base33 /home/user/fortress-base33/explorations/compile-ladder/rung-inference-walk/harness-one.sh \
        $PWD/tmp/old-harness $PWD/ProjectFortress/tests/NumeralEqualsNumberWalk.fss $PWD/ProjectFortress/tests/NotEqualNumeral.fss $PWD/ProjectFortress/tests/NumeralMostSpecificWalk.fss

    FAIL: opr-overview.tex, the sentence on e =/= e' ...: a zero NN32 = 0
    FAIL: J3/0:any =/= J4/0:nn32; conversions-coercions.tex, ...: the numeral's own conversion reaches the more specific declaration
    FAIL: u = 0 for an NN32 zero
    Tests run: 3,  Failures: 3,  Errors: 0

After the last change of code (the tree at `8c1088c06c`):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh n3 ProjectFortress/compiler_tests \
        NumeralMostSpecificCompiled.test NumeralTieDefaultCompiled.test NumeralStaticDesignCompiled.test
    OK (6 tests)

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/h1 ProjectFortress/tests/NumeralEqualsNumberWalk.fss \
        ProjectFortress/tests/NotEqualNumeral.fss ProjectFortress/tests/NumeralMostSpecificWalk.fss ProjectFortress/tests/XXXNumeralBesideAnyWalk.fss
    OK (4 tests)

The first expected-failure test of the rung, `tests/XXXNumeralBesideAnyWalk.fss`, through the same harness: as it is, 'OK Saw expected exception'; with its two expected answers set to walk's for one run, 'Missing expected failure' and 'Tests run: 1,  Failures: 1'; then restored.

## 3. Where the fix belongs, and the precedent search

- The checker's choice at a call is `typedApplicationOfChecked` (`Functionals.scala:712`), which every call form reaches through `typedApplication` or `checkApplication`: a function call, an operator, a method, a subscript and the `case` clause's `=` (`:1732-1744`). The rule is built there once. A declaration without static parameters is checked once with its coercions (`:736-739`), so the attempt by subtyping already held the numeral-coerced candidates of such declarations, ranked behind the ones that need no coercion (`scala_src/useful/STypesUtil.scala:1154-1156`); the attempt with coercion adds those of generic declarations.
- Walk's choice for a call with a numeral is `bestMatchForNumerals`, the one caller of which is `bestMatch` (`OverloadedFunction.java:2293`). The precedent in the same function is its comparison of the declaration that fits as it is with the one that the defaults alone fit, by strict subtyping of the domains (`:2329-2336`); `belowByNumerals` compares in the same way. Sites of that precedent in the file: one.
- The library: the order traits (`StandardPartialOrder`, `StandardTotalOrder`) give each operator as a functional method with a default body in the self-typed trait; `Equality` had only `=`. Sites: `Library/FortressLibrary.fss:223-236`.
- The record: `explorations/reviews/numeral-equality-ways-2026-11-10.md`, way B, names both functions; `explorations/reviews/batch-30-review.md`, Part 5, names the walk sites and the cache's keys.

## 4. What the specification settles

After this rung's edit, `conversions-coercions.tex:111-135` gives the rule and five examples. It settles what the decision's words leave open: the order between a declaration that fits the numeral at its default and one that the numeral's coercion reaches is that of `\secref{resolving-overloading}`, subtyping on the declared parameter types. Among declarations that are all reached by coercion, section "Coercion Resolution" stands as it was, with the tie rule of `inference.tex`, "A Numeral Whose Conversions Tie".

## 5. Points to report

**5.1 The rule as built, by declaration, and what each path does where two applicable declarations are not ordered.**

- Checker: `numeralAttempt`, `onlyNumerals`, `atDefaultType`, `declared`, `resolved`, all local to `typedApplicationOfChecked`; `numeralTie`. Not ordered between a fitting declaration and a numeral-reached one: the fitting one stays (`width(1.5)` is `rr64`, `gg(5, w)` is `zz32`, `x^2` keeps the `ZZ32` exponent). Not ordered among numeral-reached ones that all lie below the fitting one: `resolved` runs the coercion chapter's order and then `numeralTie`; if neither gives one, the fitting declaration stays. Not ordered among declarations reached only by coercion, none fitting: `numeralTie` picks the one that the numerals' defaults fit, without coercion first; if none or several, 'Ambiguous coercion', as before.
- Walk: `bestMatchForNumerals`, `belowByNumerals`, `atDefaultType`; the cache in `applyInnerPossiblyGeneric`; `Numerals.ownCoercionFrom`. Not ordered between the fitting declaration and a numeral-reached one: the fitting one stays. Several numeral-reached ones below it with no single most specific: the fitting one stays. None fitting: `bestMatchWithCoercion`, and on its tie the dispatch of the arguments with each numeral at its default, as before.

**5.2 The one library's overload sets in which a numeral now reaches another declaration than on the base.** The list was made by a reading of declaration headers in `Library/*.fsi`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi` and `NativeArray.fsi` by pattern, not by a parse: every name and arity where, at one position, one declaration has `Any`, `Object`, `Number`, `AnyIntegral`, `Index`, `Float`, an unbounded static parameter of its own or no type, and another has one of the eight number types. It finds these sets:

| set | the unfixed position | the number types beside it | does a numeral change its choice |
|---|---|---|---|
| `opr =`, two operands | `opr =(a:Any, b:Any)`, `Library/FortressLibrary.fsi:69` | all eight | yes: `u = 0`, `0 = u` for `NN32`, `NN64`, `RR32`; `h = 0.5` for `QQ` (`tests/NumeralEqualsNumberWalk.fss`) |
| `opr =/=`, two operands | `opr =/=(a:Any, b:Any)`, `Library/FortressLibrary.fsi:71` | `QQ`, `RR32`, and through `Equality` every type that extends it | yes: `u =/= 0` (`tests/NotEqualNumeral.fss`) |
| juxtaposition | `(a:Any, b:String)`, `(a:String, b:Any)`, `Library/FortressLibrary.fsi:2694`, `:2696` | the integer types, at `self` | no: no call fits both a string declaration and a number's |
| `opr LSHIFT`, `opr RSHIFT` | `(self, b:AnyIntegral)` on each integer type, `Library/FortressLibrary.fsi:561`, `:706` | `ZZ64`, on `NN64` and `ZZ64`, which declare no shift with a `ZZ32` count (`:560`, `:705`); `ZZ32` on the others | yes, on `NN64` and `ZZ64`: `w LSHIFT 3` runs the declaration with a `ZZ64` count, the numeral a `ZZ64`, where it ran the one over `AnyIntegral` with a `ZZ32`, which converts the count and calls the same declaration (`Library/FortressLibrary.fss:964`, `:1067`). A run of five shifts under walk prints the same values on the base's code and the rung's: 8, 8, -4, -4, -64 |
| `opr ^`, `shift` | `(self, b:AnyIntegral)` | `ZZ32`; `RR64` and `RR32` on the float types | no: `ZZ32` is the default's type, and `RR64` and `RR32` do not lie below `AnyIntegral` |
| `opr #`, `opr :`, one and two operands | a static parameter `T` or `I` | `ZZ32` only | no: `ZZ32` is the default's type |
| `deny`, three arguments | `Any`, `Library/FortressLibrary.fsi:255` | `ZZ32` only | no |
| `singleton`, two arguments | `Key`, `Library/Map.fsi:96` | `ZZ32` only | no |

For `w = 0`, `w: NN64`, the checker against the one library converts the numeral into `NN32`: `NN64` declares `=` with an `NN32` operand beside its own (`Library/FortressLibrary.fss:1009`), and among the declarations that the numeral's coercion reaches the coercion chapter's order ranks `(NN64, NN32)` before `(NN64, NN64)`, as it did before this rung wherever no declaration fitted. The answer is the same.

With `Equality`'s `=/=`, a call `z =/= 0` for `z: ZZ32` now runs `Equality`'s declaration, which fits the numeral at its default, in place of the one over `Any`; the answer is the same. This is the library edit's effect, not the numeral rule's.

**No model line changes its choice under walk.** `MicroGptFlat.fss`, `MicroGptApl.fss` and their quick checks write no `=/=`; the helper `FlatData.fss` writes it between characters and between `ZZ32` values (`explorations/run-c4/src/FlatData.fss:22`, `:53`, `:99`). The two model lines of row 989, `MicroGptFlat.fss:82` and `MicroGptFlatQuick.fss:40`, ran at `RR64` under walk before and do now; the checker against the one library now accepts them (5.4). microGPT's quick checks: `explorations/coordinator/tools/mg-run.sh <work-dir> final`, on the final code at `8c1088c06c`, one thread: `MicroGptFlatQuick`, 'VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS', `rc=0 secs=74`; `MicroGptAplQuick`, 'VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS', `rc=0 secs=81`.

**5.3 Every existing test whose verdict, output or pinned message changed.** Two, both promoted from expected failures: `tests/XXXNumeralEqualsNumberWalk.fss` to `tests/NumeralEqualsNumberWalk.fss` (its component line renamed; its comment names `QQ`; `h: QQ = 1/2` and the two assertions `h = 0.5` and `0.5 = h` added, PLAN's line on the test owed), and `tests/XXXNotEqualNumeral.fss` to `tests/NotEqualNumeral.fss` (its component line renamed). No other test changed: `ant testQuick` and `ant testSystem` pass with no other test edited. No line of a team test changed.

**5.4 `k(5)`, `mul(1.0, f)` and the two model lines, before and after.**

| | compiled, before | compiled, after | walk, before | walk, after |
|---|---|---|---|---|
| `k(5)`, `k(x: Any)` beside `k(x: NN32)` | the run dies, `NoSuchMethodError ... \=k{...}(fortress.AnyType$Any)` (section 2) | `nn32` | `any` ('FAIL: J3/0:any =/= J4/0:nn32', section 2) | `nn32` |
| `mul(1.0, f)`, row 989's program | 'Ambiguous coercion in call to function mul' (section 2) | `rr64` | `rr64` (row 989) | `rr64` |

Both after columns are assertions of `compiler_tests/NumeralMostSpecificCompiled`, `NumeralTieDefaultCompiled` and `tests/NumeralMostSpecificWalk`.

The model lines, by the distance stage's driver over `explorations/compile-ladder/plan-31/probes/model-closure/NumeralLine.fss`. Before: three refusals, each 'Ambiguous coercion in call to operator juxtaposition ... ((RR64 & {Float}), RR64)->RR64; (QQ, QQ)->QQ' (`explorations/compile-ladder/plan-31/probes/model-closure-check.md`, section 2; the probe was not run on the base again). After, on the tree at `5466455249`, whose checker is the final tree's:

    explorations/compile-ladder/plan-31/probes/model-closure/run.sh check <out> <dir> $PWD/Library/FortressLibrary.fss NumeralLine.fss
    @@TC COMPONENT	FortressLibrary	errors=0
    @@TC COMPONENT	NumeralLine	errors=0
    ### all seconds=99 rc=0

**5.5 Row 390: what closes and what stays.** The numeral case closes: `k(5)` prints `nn32` and `t3(3)` for `t3(a: Number)` beside `t3(a: ZZ64)` prints `t3 ZZ64` on both paths (a run of a program of three calls, compiled and under walk, on the rung's tree; `g1(5)` prints `g1 ZZ32` as before). The value's case stays (fork N4): `compiler_tests/XXXCoercionAnyOverloadRungC` is still an expected failure, 'REACHED' then `NoSuchMethodError`, in the run of section 6. The row's whole new line is in `record.md`.

**5.6 What walk answers for `a = 0`, `a: Any` holding an `NN32` zero, and what the checker answers.** Walk: `true`, and `a =/= 0` `false`, `0 = a` `true`: it has no static types and reads the value (a run under walk of a program of these three lines printed `true`, `true`, `false`). The checker: the numeral takes its default. Against the one library, in the checked tree that the distance stage's driver leaves, the numeral of `a = 0` is converted into `ZZ32`, where that of `u = 0` and `0 = u` is converted into `NN32`, of `f = 0` into `RR32`, of `h = 0.5` into `QQ`, of `y = 7` into `Byte`, and of `k(5)` into `NN32`; so by reading the compiled answer after the switch-over is `false`. On the prelude, `same(a, 0)` beside `same(a: Any, b: Any)` and `same(a: NN32, b: NN32)` prints `any` (`compiler_tests/NumeralMostSpecificCompiled`). Walk's departure is the new row and the expected failure `tests/XXXNumeralBesideAnyWalk.fss` (section 9).

**5.7 The count and distance tables, their commit, their seconds, and P-148's runs.**

- Count, on the final tree at `8c1088c06c`: `#total 0`, `#locations 0`, `#crash none`. `diff` with `explorations/compile-ladder/climb-batch-30/gate/checker-count.txt` prints nothing.
- Distance, on the final tree at `8c1088c06c`: `#total 0`, `#crash none`, `#seconds 181 FortressLibrary 123`, run beside the demo driver. `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-30/gate/distance.txt <table>` prints `DISTANCE SAME   0`. The run's `errors.tsv` holds its header line only, so no site moved against `explorations/compile-ladder/gate/distance-sites.tsv`. An earlier run on `5466455249`, before the walk-only commit `8c1088c06c`, gave the same table in 137 s.
- P-148. The commit of the change made correct: `5466455249`. `base`, from `/home/user/fortress-base33`: `real 1m56.161s`. `change`, from the rung's tree at `5466455249`: `real 1m16.666s`. Machine: nproc 4, Intel Xeon 2.10 GHz, 2100 MHz, OpenJDK 25.0.4.1, `FORTRESS_THREADS=1`; the base ran while this session's other work and other agents loaded the machine (load 10.8 a few minutes later), the change at load 1.78, so the pair shows no slowdown and measures no gain. Results the same: `diff` of the two tables prints nothing, and `diff` of the two `run.txt` files with each tree's path replaced by `TREE` prints nothing; the final tree's `run.txt` is equal to the base's too.
- The second pass. A JFR profile of the count stage on the change (`-XX:StartFlightRecording=settings=profile` added to a copy of the stage's driver): 4,982 execution samples; the top frames are the generated walker (`Walker.walkCases7$` 364, `walkCases4` 191, `walkCases5` 171), `ASTGenHelper.scalaify` 165, `List.prependedAll` 159; `typedApplicationOfChecked` is on the stack of 468 samples and `numeralAttempt` of 2. The profile shows no gain to take in the new code, so the pass changed nothing, and `change`'s results stand for `pass`'s. The new comparison runs only where the declaration that fits has a numeral at a parameter that is not of the numeral's default type, which is what keeps `i + 1` and `z = 0` out of it.

**5.8 Each sentence of the specification changed, before and after.** Three passages, each whole in `decision-record.md` beside this file: `Specification/basic/conversions-coercions.tex:111-135` with its callout `:137-154`; `Specification/appendices/changes.tex:5293-5313`, the clause of rows 966 and 973 in the Effect of `revival-numerals`, with one sentence added to that entry's Rationale at `:5121-5126`; `Specification/appendices/changes.tex:3817-3825`, the sentence on `=/=` in the Effect of `revival-numeral-type`. The specification builds: `./ant genSource` and `./ant tex` both end 'BUILD SUCCESSFUL', and the count of unresolved references, multiply defined labels and undefined control sequences in `fortress.log` is 0.

**5.9 A file edited beyond those named.** None in the tree's code. `Numerals.java` is on the list; `Coercions.java` was not edited. Under `explorations/`: this report, `record.md` and `decision-record.md`.

## 6. The whole suites

- `ant testQuick`, once, on the tree at `5466455249`: 'BUILD SUCCESSFUL', 'Total time: 7 minutes 55 seconds'; `CompilerJUTest` 1,573 tests, `LibraryJUTest` 86, `OtherCompilerJUTest` 263, no failure. The later commit `8c1088c06c` changes two files of walk (`OverloadedFunction.java`, `Numerals.java`) and nothing of the checker, so testQuick was not run again; the rung's own compiled tests were (section 2).
- `ant testSystem`, on the final code at `8c1088c06c`: 'BUILD SUCCESSFUL', 'Total time: 5 minutes 20 seconds'; 208 + 208 + 205 + 211 = 832 tests, no failure. (A first run at `5466455249` was green too, 831 tests in 8 minutes 29 seconds; the cache defect of section 9 is why it was slow.)
- The 52 team demos under walk are the gather's run on the merged tree. A run of this rung's own by a demo driver in its scratch, on the final code, was stopped with the launch that started it after 23 demos (`ArrayListLong` to `FeatherweightJava` in the folder's order, `BiCGSTAB` and the 20 `BirdCount` demos among them): each of the 23 reached its end with exit 0 and no 'fail' in its output. The other 29 were not run here.
- The ladder subset: the five files of the baseline whose recorded first error names a numeral or a coercion (`tests/NumeralTest.fss`, `XXXAsExpr.fss`, `XXXextendIntLiteral.fss`, `ho.fss`, `litCoercion.fss`), with the drivers copied under the rung's scratch, on the tree at `5466455249`. None is in the newest landed `ladder.tsv` (`explorations/compile-ladder/climb-batch-N/gate/ladder/ladder.tsv`), so they are compared with the baseline's `ladder.tsv`: each is at the baseline's phase (disambiguate, typecheck, typecheck, typecheck, typecheck); no DOWN, MISSING or STDOUT.

## 7. Each program run old against new

- The five tests of section 2, through the harness, on the base's code and on the rung's.
- `ProjectFortress/demos/BiCGSTAB.fss` under walk, to see that the cache repair of section 9 left no slowdown: the base's code, 'elapsed time 68655051662 ns', `real 1m16.4s`; the rung's final code, 'elapsed time 71916315707 ns', `real 1m29.5s`; the same 32 residuals. One run each, beside other agents' work: no finding.

## 8. Sentences of the specification made false, which this rung's section does not name

Each states the order of attempts without the numeral's exception. The gather corrects them.

- `Specification/basic/conversions-coercions.tex:526-529`: "For a given functional call, we first determine whether there exists a declaration that is applicable without coercion. If so, the most specific declaration is selected".
- `Specification/basic/conversions-coercions.tex:544-547`, the callout `revival-overloading`: "a coercion makes a call possible and never changes which declaration runs when one is applicable without it".
- `Specification/basic/conversions-coercions.tex:606-608`: "If Σ is not empty then we use the overloading resolution described in ... to determine which element of Σ is called."
- `Specification/basic/inference.tex:60-61`: "So a coercion is applied only to make a call possible: it never changes which declaration is chosen when one is applicable to the call without it."
- `Specification/basic/inference.tex:334-336`: "in the choice among declarations that are applicable to the call only with coercion and that the numeral would otherwise leave tied": the tie rule now holds also where the tied declarations differ at another argument (fork N2).
- `Specification/appendices/changes.tex:2124-2125` and `:2898-2899`, the Rationales of `revival-inference` and `revival-overloading`, which state the decision of 28 September 2026 with no word of the numeral's exception.
- `Specification/appendices/changes.tex:3801-3804`, the Effect of `revival-numeral-type`: "A numeral beside a value of an integer type is converted to that type where no declaration of the operator is applicable to the two without coercion".

Outside the specification: FACTS F-346 and the last sentence of F-349; the skill's `references/revival-changes.md`, "Under walk it is `false` (row 973)" (`record.md`).

## 9. Defects, each with its home

1. **Rows 973, 966, 975, 976, 989 and row 390's numeral case.** Home 1: repaired, each an assertion of a plain gated test (`record.md` gives the test of each row).
2. **Walk reads the rule on the value where the static type is `Any`.** For `a: Any` holding a zero `NN32`, walk answers `a = 0` `true` and runs `same(a: NN32, b: NN32)` for `same(a, 0)`, where the text gives the numeral its default. Home 2: the gated expected failure `ProjectFortress/tests/XXXNumeralBesideAnyWalk.fss`, with the new row 1016. It is P-59's limit, deferred to the step after the switch-over (P-12).
3. **A defect of this rung's own first commit, repaired in `8c1088c06c`.** The first commit left out of walk's dispatch cache every call whose choice met a numeral at a parameter of any type outside the library's eight number types, so a comparison with a numeral chose its declaration again at each call: the demo `BiCGSTAB` was still running after 170 s, its hot stack `bestMatchForNumerals` under `applyInnerPossiblyGeneric`. Home 1: repaired; no test pins a speed, the demo's time is in section 7.
4. **Row 390's value case** stays as it was, with its expected failure.

Not defects, measured: under walk a dotted method `m(x: Any)` beside `m(x: Byte)` answers `any`, `byte`, `any` for `O.m(300)`, `O.m(7)`, `O.m(300)`, as the top-level function does, though `OverloadedMethod.java` keeps its own cache, which this rung did not edit. Against the one library the checked tree shows no conversion at the numeral of a `case` clause (`case u of 0 => ...`): the `case` arm rewrites only the clause's operator (`Functionals.scala:1732-1744`), as before this rung; on the prelude the compiled clause matches (row 975's notes). No compiled program runs against the one library yet, so nothing more can be observed there.

## 10. Decisions

Each is within the decisions on record and the batch's forks; none is the curator's to take.

1. **"The most specific" between the declaration that fits the numeral at its default and one that the numeral's coercion reaches is read by subtyping of the declared parameter types.** Way not taken: the coercion chapter's relation, under which a type is more specific than one it coerces to. Evidence: under that relation `RR32` is more specific than `RR64`, so `f(1.5)` beside `f(x: RR32)` and `f(x: RR64)` would run the `RR32` declaration and `x^2.0`-like calls would move: a change of what the default chooses, which the rung's section reserves. Walk's existing comparison in the same function is by subtyping (`OverloadedFunction.java:2329-2336`). P-46's cases are all subtype cases (`Any`, `Number`). Among declarations all reached by coercion the chapter's relation stands, as before.
2. **A numeral-reached declaration counts only where every other argument fits as it is.** Way not taken: also where a value needs its coercion. Evidence: P-46, "for a value's coercion it is not taken".
3. **Where several numeral-reached declarations lie below the fitting one and none is the single most specific, the fitting one stays, with no error.** Way not taken: 'Ambiguous coercion'. Evidence: P-46 and P-173, "its default as the last resort"; the call was valid before.
4. **The checker makes the comparison only where a most specific fitting candidate has a numeral at a parameter that is not of the numeral's default type.** Way not taken: the attempt with coercion at every call with a numeral. Evidence: at the default's own type no declaration lies strictly below by a numeral's coercion; P-148; the profile of 5.7.
5. **Walk's cache leaves out a choice that asked a program's type for its numeral coercion; the key is unchanged.** Ways not taken: a key that holds the numeral's value, which makes one entry for each numeral of a program; a key that holds the answer of each `where` clause, which the key's form, a list of types, does not carry. Evidence: `Numerals.java:646-702`; the test's `y = 300` between two `y = 7`.
6. **A numeral that a program's coercion refuses by its `where` clause is not applicable to that declaration, so `y = 300` for `y: Byte` compares at the default and is `false`.** Way not taken: a refusal of the call. Evidence: the rule's words, "a parameter whose type declares a coercion from the numeral's type, by that coercion"; `Numerals.numeralCoercion` already answered none for such a numeral (`Numerals.java:419-433`). Asserted under walk only (`tests/NumeralMostSpecificWalk.fss`).
7. **`numeralTie` loses its condition and keeps its body** (fork N2). Way not taken: a second tie function for ties that differ elsewhere. Evidence: the body already ranks every candidate by whether the numerals' defaults fit it.
8. **The former tail of `typedApplicationOfChecked` became the local function `resolved`** so that the numeral candidates can be tried without signalling. Way not taken: a copy of the tail. The hunk indents nothing, to keep the diff and the merge with rung C small; the function's lines `:851-942` are therefore one level left of their braces.
9. **The specification states the rule in "Principles of Coercion" and in the entry `revival-numerals`; no new Appendix I entry.** Evidence: the passages changed are that entry's; `decision-record.md` holds the three passages.
10. **The `width(1.5)` case and `y = 300` are asserted in the tests** though the section's list of programs does not name them, since decisions 1 and 6 rest on them.

## 11. For FACTS

One fact, in `record.md`, with the two entries that it makes wrong (F-346, F-349's last sentence).

## 12. Commands worked out

- The checked tree of a component against the one library: a copy of `explorations/compile-ladder/plan-31/probes/model-closure/run.sh` without its last removal of `<out>/caches`, then the component's entry in `<out>/caches/analyzed_cache/`, in which each converted numeral is a `TraitCoercionInvocation` whose `_toType` names the type.
- A profile of the count stage: a copy of `explorations/coordinator/tools/checker-count/run.sh` with `-XX:StartFlightRecording=filename=<file>,settings=profile` after `java`, then `jfr print --events jdk.ExecutionSample --stack-depth 64 <file>`.

## 13. Questions for the curator

None that holds the rung. One reading is the rung's own and he may want to see it: decision 1, that a float numeral beside `f(x: RR32)` and `f(x: RR64)` still runs the `RR64` declaration.
