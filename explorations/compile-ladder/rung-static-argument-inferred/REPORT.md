<!-- Climb batch 32, rung C (rung-static-argument-inferred): the compiled checker fixes two static arguments that it left open, a big operator's in a reduction that does not write it (row 731) and a generic function's where the function is passed as a value (row 758). Base db352c1776; code head e5c519a425, branch head as committed. -->

# Rung C: the static argument of an unwritten reduction and of a generic function reference

- problem: the compiled checker refused every reduction with generators over `SUM`, `PROD`, `BIG MIN` or `BIG MAX` that leaves out its static argument, and crashed on a generic function passed as a value: `explorations/fortress-gap-ledger.md:213` (row 731), `:224` (row 758)
- spec: "a sum is desugared with the reduction for the type N of the expression", `Specification/basic/expressions/reductions.tex:28`; "the static arguments are statically inferred from the context of the function call", `Specification/basic/expressions/var-ref.tex:38-39`
- precedent: the argument retry, which types an argument again in a try checker and keeps a candidate whose type converts to the expected type: `retypedApplication`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:1075`
- deviation: the reduction's check runs before the call's attempts, not after them as the retry does, since `typedApplication` returns before the attempts when an argument has no type (`Functionals.scala:876`), and that function is not this rung's; the reduction's rule is also taken where the big operator has an instance at its bound and the call so instantiated is not accepted (a comprehension under a declared `List[\E\]`), which the section's words "whose bound gives no instance" do not cover: `Functionals.scala:680-689`
- historical: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala`, `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/CoercionOracle.scala`, `Specification/basic/expressions/reductions.tex`, `Specification/basic/inference.tex`, `Specification/appendices/changes.tex`: none

Both steps landed. Commits on `wip/rung-static-argument-inferred`, from the base `db352c1776`: `af09c51ab8` (both steps and their tests), `cc7c922a77` (the bound and the parameter count of the written argument), `50724c89a4` (the specification), `e5c519a425` (where the applied value is refused; the last change of code), `0fcef57106` (a walk expected-failure test), and the commit of this report.

## 1. What changed and why

### Step 1, row 731: the reduction

`SUM[j <- 0#i] f(j)` is desugared, before the checker, to `__bigOperator(BIG +(), fn (r, u) => __generate(0#i, r, fn j => u(f(j))))` (`ProjectFortress/src/com/sun/fortress/nodes_util/DesugarerUtil.java:138-197`). The checker types each argument alone first; `BIG +()` has no argument to fix `T extends AdditiveGroup[\T\]`, the bound gives no instance, the argument has no type, and the call was refused before any attempt.

`typedApplicationOfArg` (`Functionals.scala:790`) now asks `reductionApplication` (`:634`) first. It answers only for a call of `__bigOperator` whose argument is the pair of a big operator's call with no argument and no written static argument, and the clauses' function expression. The rule as built, in order:

1. Where the big operator typed alone has an instance (a plain bound, or no static parameter), the call is checked as it is written, in a try checker. If it is accepted and its type converts to the expected type, that result is the answer: nothing changes for a reduction that was accepted before. This includes the retry that gives a plain-bounded big operator the reduction's expected type (`compiler_tests/InferBigOperatorExpectedType`).
2. Else the static argument is written as the reduction's expected type, if the type meets the bounds of the big operator's one static parameter, and the call so written is checked. It is the answer if it is accepted and its type converts to the expected type. The elements are then converted to the expected type where they are passed to the unit function.
3. Else it is written as the type of the reduction's body, under the same two conditions. The body's type is read by `reductionBodyType` (`:700`): the clauses are checked at a `__bigOperator` candidate's parameter type with each of its static parameters at `Any`, and the type is that of the argument of the unit function, a numeral at its default.
4. Else nothing is accepted. Where the big operator has no instance alone, the call is then checked, for its refusal, with the body's type written, or else the expected type, where that type meets the bounds; otherwise as before.

A static argument is written only for a big operator whose declaration without arguments has exactly one static parameter, a type, and only a type that meets its bounds (`:656-679`). Both checks are the rule's own because the checker does not check a written static argument against its bound (row 470), and because a written list shorter than the parameters instantiates only the first: `BIG MIN_MAX[\(ZZ32,ZZ32)\]` then stopped the checker, 'U is not in the kind env' (measured on `af09c51ab8`, repaired in `cc7c922a77`).

Where the declared type and the body's type differ: if the body converts to the declared type, the reduction runs at the declared type; if not, the checker answers with the body's instance, "Right-hand side has type RR64, but declared type is ZZ32." (`e: ZZ32 = SUM[j <- 0#3] fl(j)` for `fl(j: ZZ32): RR64`, the distance stage's driver on `e5c519a425`'s reduction code). Walk gives the same program `4.294967296E9` at a local variable declared `RR64` over `ZZ32` elements of 2^30, as the compiled test gives the declared type there.

### Step 2, row 758: the reference to a generic function

The functional reference's arm (`Functionals.scala:1695`) now asks `instantiatedReference` (`:746`). The rule as built:

- The arrow type comes from the reference's expected type: the declared type of a variable or field, an assigned variable's type, a declared return type, and, for an argument, the parameter type of each candidate in the retry: `retypable` (`:1128`) now counts an argument that is a reference whose type carries static parameters, so the retry types it again with the parameter type. All of these were run (section 5).
- The static arguments are inferred with the constraint that the instance is a subtype of the arrow type (`inferStaticParamsHelper`, solved without the bounds' fallback). A parameter that the arrow type's domain bounds from below takes that type; a `nat` parameter takes the size.
- A parameter that the solution leaves at `BottomType` or at an inference variable is open: the reference is refused, "A reference to the generic function pick takes its static arguments from the arrow type that receives it, and ZZ32->ZZ32 does not fix B." A parameter that only the return type mentions is open too. As an argument the same reference is refused by the enclosing call's own message, since the retry's try checker takes the signal as a failure: "ZZ32->ZZ32->ZZ32 is not applicable to an argument of type A->ZZ32."
- A name with several declarations is not instantiated. Where a declaration without static parameters fits the arrow type, the call is accepted as before; else it is refused, "... is not applicable to an argument of type AND(Pair[\T\]->ZZ32,Box[\T\]->ZZ32)." (row NEW-C-3).
- A reference with no expected type keeps the function's type with its static parameters. Applied through an untyped variable it is refused where the call would have no place for the static arguments (`:805-811`), in place of the Java error "No place to put inferred static args in application.: Not yet implemented". Never applied, it still stops the well-formedness pass (row NEW-C-4).

Two supports outside `Functionals.scala`. In `TypeAnalyzer.pSubInner` an arrow type that carries static parameters which the kind environment does not bind is a subtype of no arrow type (`scala_src/types/TypeAnalyzer.scala:323`, `carriesOwnStaticParams` at `:1079`): this is where 'F is not in the kind env' was raised. In `CoercionOracle.checkCoercion` such a type coerces to nothing (`scala_src/typechecker/CoercionOracle.scala:292-293`): the coercion's own comparison of the domains raised the same error at a typed binding.

## 2. The failing runs and the passing run

Each failing run is the harness on the base's code, `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base33 <tree>/tmp/old-caches junit <the .test files>`, before the first build of the edit.

Row 731, 2026-11-15 23:32:55 UTC, `InferBigOperatorSelfBound.test`:

    . compile .../compiler_tests/InferBigOperatorSelfBound .../InferBigOperatorSelfBound.fss:31:25-53:
        Could not check call to operator BIG LAST
        - [\T extends CompilerAlgebra.Equality[\T\]\]()->Red[\T\] is not applicable to an argument of type ().
    File InferBigOperatorSelfBound.fss has 4 errors.
    Tests run: 3,  Failures: 3,  Errors: 0

Row 758, 23:35:20 UTC, `GenericFunctionAsValueCompiled.test` and the two refusals under their first names; the refusals again under their final names at 23:52:48 UTC:

    . compile .../compiler_tests/GenericFunctionAsValueCompiled .../GenericFunctionAsValueCompiled.fss:13:7-21:
    T is not in the kind env [][][]
    A is not in the kind env [][][]
     Saw failure, but did not satisfy compile_err_contains; expected
    java.lang.Error: No place to put inferred static args in application.: Not yet implemented
    Tests run: 2,  Failures: 2,  Errors: 0

The passing run, after the last change of code (`e5c519a425`, built), 2026-11-16 00:19:41 UTC: `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh c6 ProjectFortress/compiler_tests InferBigOperatorSelfBound.test InferBigOperatorExpectedType.test InferBigOperatorUnwritten.test GenericFunctionAsValueCompiled.test XXXGenericFunctionAsValueOpenCompiled.test XXXGenericFunctionAsValueUntypedCompiled.test XXXNatUnknownSizeFnValue.test`:

    OK (15 tests)

The two refusals are `.test` files with the `XXX` prefix over plain-named components, the folder's form for a refusal that is right (`compiler_tests/XXXNumeralWhereRefusedCompiled.test`). The first was shown red through the harness with its program made valid for one run (`pick[\ZZ32, ZZ32\]` written): "Saw wrong failure. compile", `Tests run: 1,  Failures: 1`.

The whole compiled suite, `ant testFast`, once on `e5c519a425`: `BUILD SUCCESSFUL`, `Total time: 12 minutes 7 seconds` (load about 8 to 13 from the batch's other rungs); `CompilerJUTest` `Tests run: 1577, Failures: 0, Errors: 0`. An earlier run on `cc7c922a77` had one failure, section 6.

## 3. Where the fix belongs, and the precedent search

The gap is in the checker's inference of a call's static arguments, `Functionals.scala`, as the section says. Ways the checker offers for row 731, and the one taken:

- Taken: write the static argument on the big operator's call inside the checker, and check the call so written. It reuses the path of a reduction that writes its argument, so the code generator sees the form it compiles today.
- A joint inference of the big operator's and `__bigOperator`'s static parameters in one constraint. It would also serve a big operator with several parameters (row NEW-C-1). Not taken: the solver takes one arrow type, the two declarations' parameter names can clash, and the body's type is not available to a constraint, since the clauses are a function expression that is checked only once its parameter type has no inference variable (`Functionals.scala:207-220`).
- The retry, reached with an argument that has no type. Not taken: the return is in `typedApplication` (`:876`), which is rung N's.
- Directing the desugaring by type. Not taken: the desugaring runs before the checker (`compiler/desugarer/PreDisambiguationDesugaringVisitor.java:464-468`).
- A change of the library's bounds. Not taken: fork C2.

For row 758: taken, the instantiation in the reference's arm with the retry carrying the parameter type. Not taken: binding the function's static parameters in the kind environment while its type is compared, which the section words; built first and withdrawn, because the constraint it returns is reduced by the caller's analyzer, where the parameter is unbound again: `app(same, "x")` for `app[\A, B\](f: A -> B, x: A)` stopped with 'T is not in the kind env' in `Formula.reduce`. Not taken: treating the reference as an unchecked argument, as a function expression is, in `checkApplicable` and its two callees, which are rung N's.

Precedent: the try checker, `STypeCheckerFactory.makeTryChecker(this)`. On the base the file has two sites, `inferFnExprParams` (`:565`) and `retypedApplication` (`:1085`); the rung adds two (`:648`, `:705`).

## 4. What the specification settles

- The reduction is for the type of its expression (`reductions.tex:28`); fork C1 reads that type as the expected type first, then the body's. The text says nothing on which place gives an expected type that walk does not read; the box now names the places where the paths differ.
- A reference to a generic function takes its static arguments from its context (`var-ref.tex:38-39`). The text does not say what the context is where the reference is not called, nor what holds without one; the new paragraph of `inference.tex` says both, as built.

## 5. Old against new

Compiled, the prelude, on the base (`old-fortress.sh`) and on the tree:

| program | base | tree |
|---|---|---|
| `compiler_tests/InferBigOperatorSelfBound` | 4 errors, "is not applicable to an argument of type ()" | runs, PASS |
| `compiler_tests/GenericFunctionAsValueCompiled` | 'T is not in the kind env [][][]' | runs, PASS |
| `g: ZZ32 -> ZZ32 = pick`, `pick[\A, B\](x: A)` | 'A is not in the kind env [][][]' | "... does not fix B." |
| `useOne(pick)` | 'A is not in the kind env [][][]' | "ZZ32->ZZ32->ZZ32 is not applicable to an argument of type A->ZZ32." |
| `g = count; g(Box[\ZZ32\](z))` | Java error, "No place to put inferred static args" | "The applicand is the value of a generic function that no arrow type received ..." |
| `g = count`, never applied | 'F is not in the kind env [][][]' | the same (row NEW-C-4) |
| `g = count; useOne(g)` | 'F is not in the kind env [][][]' | "... is not applicable to an argument of type Box[\F\]->ZZ32." |
| `useOne(len)`, two generic declarations of `len` | 'T is not in the kind env [][][]' | "... not applicable to an argument of type AND(Pair[\T\]->ZZ32,Box[\T\]->ZZ32)." |
| `useStr(count)`, `count(s: String)` beside the generic `count` | 'F is not in the kind env [][][]' | accepted for `useStr`; `useOne(count)` in the same program refused as the row above |
| `s: String = app(same, "x")`, `app[\A, B\](f: A -> B, x: A): B` | 'T is not in the kind env [][][]' | runs, prints `x` |
| `g: String -> ZZ32 = count` | (not run) | "Right-hand side has type Box[\F\]->ZZ32, but declared type is String->ZZ32." |
| `useOne(count[\ZZ32\])`, `useSized(half[\6\])`, written | run, 1 and 3 | (the same path) |
| `half[\nat n\]` at `Sized[\6\] -> ZZ32`, unwritten | "... is not applicable to an argument of type Sz[\n\]->ZZ32." | runs, 3 |
| a typed assignment, a declared return type, a constructor's argument and a field of arrow type, each receiving `count` | (not run) | run, each prints 1 |

Against the one library, the distance stage's driver on one program, `java ... -cp <shadow-classes>:<classes>:<classpath> DistanceMulti -order check -setting any FILE`, the checker's classes the base build's or the tree's:

| program | base | tree (`cc7c922a77`; `e5c519a425` changes nothing a reduction reaches) |
|---|---|---|
| The library's three sites unwritten: `BIG MIN` at `Library/FortressLibrary.fss:4580` and `:4586`, the comprehension at `Library/List.fss:151`; targets `Library/FortressLibrary.fss Library/List.fss` | 3 errors: "Could not check call to operator BIG MIN ... is not applicable to an argument of type ()." twice, and "Function body has type OR(List.List[\Any\],List.List[\E\]), but declared return type is List.List[\E\]." | 0 errors, `### all seconds=85 rc=0` |
| `explorations/run-c4/src/MicroGptFlat.fss:43` as `SUM[j <- 0#i] matCount(j)`, a scratch copy of the folder | 43 errors, one of them at `:43:28-52`, "Could not check call to operator BIG +" | 42 errors, the other 42 the same lines |
| a `SUM` of `ZZ32` elements declared `RR64` as a field, a getter's and a method's return, a top-level variable, a function's return, a local variable, an assignment and a call's argument; `q = SUM...`; `BIG MAX`; `BIG MIN` declared `ZZ32`; `PROD` declared `ZZ64`; `l: List[\ZZ32\] = <\| 2 k \| k <- 0#3 \|>` | each refused, "is not applicable to an argument of type ()"; the comprehension "Right-hand side has type List.List[\Any\], but declared type is List.List[\ZZ32\]." | all accepted |
| `e: ZZ32 = SUM[j <- 0#3] fl(j)`, `fl: RR64` | "is not applicable to an argument of type ()" | "Right-hand side has type RR64, but declared type is ZZ32." |
| `s: String = SUM[j <- 0#3] fl(j)` | (not run) | "Right-hand side has type RR64, but declared type is String." |
| `w = SUM[j <- 0#3] "a"` | (not run) | "Could not check call to operator BIG + ... is not applicable to an argument of type ()." |
| `mm = BIG MIN_MAX[j <- 0#3] pr(j)` | "Could not check call to operator BIG MIN_MAX ... is not applicable to an argument of type ()." | the same (row NEW-C-1) |
| `l2 = <\| 2 k \| k <- 0#3 \|>`, no declared type | `List[\Any\]` | `List[\Any\]`: accepted as written, unchanged |

The library was edited in the worktree for the first row's two runs and restored by `git checkout`; no library line is committed (fork C2). The team demos were not probed.

### The places where the paths give a reduction another type

The compiled values are those of a prelude program with the test's `BIG LAST`, which records the run-time type of its elements; walk's are of `SUM[j <- 0#4] huge(j)` declared `RR64`, `huge(j: ZZ32): ZZ32 = 1073741824`, where a sum in `ZZ32` overflows.

| the reduction's place | compiled, declared `ZZ64` over `ZZ32` | walk, declared `RR64` over `ZZ32` |
|---|---|---|
| a local variable | `ZZ64` | `4.294967296E9` |
| a top-level or local function's return type | `ZZ64` | `4.294967296E9` |
| a method's return type | `ZZ64` | `IntegerOverflow` |
| a getter's return type | `ZZ64` | `IntegerOverflow` |
| a field | `ZZ64` | `IntegerOverflow` |
| an assignment | `ZZ64` | `IntegerOverflow` |
| a top-level variable | the declared type: the right side is checked with it (`scala_src/typechecker/impls/Decls.scala:260`), and the one-library probe above is accepted; the run did not show it (row NEW-C-5) | `IntegerOverflow`, at load |
| a call's argument | `ZZ32`: the call is accepted with the argument typed alone, so it is not typed again (P-51) | `IntegerOverflow`: the same instance as compiled |

So the paths differ at four places and at the top-level variable, and agree at a call's argument, where the section expected a difference. `tests/XXXReductionDeclaredTypeMethodWalk` records the method's case (row NEW-C-2). Walk is not changed.

## 6. Existing tests

- `compiler_tests/XXXNatUnknownSizeFnValue` (`f = ee; f(z)` for `ee[\nat n\](x: ZZ32)` beside `ee(x: Any)`) went red on `cc7c922a77`, "Saw wrong failure": the applied-value refusal, then made before the call's check, replaced its pinned message. `e5c519a425` makes the refusal after the call's check, only where the chosen candidate would reach the Java error; the test is green again, its message as on the base. It was the one failure of the first `ant testFast` (`Tests run: 1577, Failures: 1`).
- `compiler_tests/InferBigOperatorExpectedType` and `InferBigOperatorUnwritten`, the guards: green, unchanged.
- No test's verdict, output or pinned message differs between the base and the head.

## 7. The stages and the checker's time

The count stage, `explorations/coordinator/tools/checker-count/run.sh`, on `nproc=4`, Intel Xeon 2.10 GHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1`:

| run | code | seconds | table |
|---|---|---|---|
| base | the base build, `84f1c37190` | 83.2 | `#total 0`, `#locations 0`, `#crash none` |
| change | `cc7c922a77` | 76.2 | equal to base's (`diff` prints nothing) |
| the stage's one run on the final tree | `0fcef57106` (code of `e5c519a425`) | 91.1, load at start about 9 | equal to climb batch 30's gate table and to change's |

The `run.txt` of change and of the final run equal the base's after each tree's path is replaced by one word (`diff` prints nothing, 33 lines each). The loads of the first two runs were not recorded; the batch's other rungs ran throughout.

The second pass. A JFR profile of the count stage's checker on `cc7c922a77` (`-XX:StartFlightRecording=settings=profile`, 4,515 execution samples): the top frames are the tree walker's, `Walker.walkCases7` 350, `walkCases4` 171, `walkCases2` 161, `walkCases5` 152, `BoxesRunTime.equals2` 152, `ASTGenHelper.scalaify` 138; of the new members, `instantiatedReference` is on the stack of 2 samples and `reductionApplication`, `reductionBodyType` and `carriesOwnStaticParams` of none. The profile shows no gain to take in the new code, so the pass changed nothing; `e5c519a425` is a correction, not the pass, and the final run above is its count.

The distance stage on `0fcef57106`: `explorations/coordinator/tools/distance/compare.sh <climb batch 30's table> <this table>` prints `DISTANCE SAME   0`; `#total 0`, `#crash none`, `#seconds 137 FortressLibrary 89` (128 and 83 at the gate), load at start 9.70. No site moved: the stage's `errors.tsv` holds its header alone.

The ladder subset: the three files whose recorded first error names a big operator's call, `tests/restTest.fss`, `restTest2.fss` and `restTest2a.fss`, which the gate does not run. After the edit each is at `typecheck`, the baseline's phase, with the first error that the base's code gives too, "The varargs parameter x is used, whose type ImmutableArray[\ZZ32,ZZ32\] the libraries do not declare." No move.

The specification builds: `./ant genSource` and `./ant tex` both `BUILD SUCCESSFUL`; the count of unresolved references, multiply defined labels and undefined control sequences in `fortress.log` is 0.

Not run: `ant testSystem` and the demos (the edit is the checker's alone); the gate.

## 8. The specification

Changed, each before and after:

- `Specification/basic/expressions/reductions.tex:30-31`, in the box `revival-reductions`. Before: "Neither implementation directs it by the type N of the expression yet." After: "Neither implementation desugars a reduction by the type N of the expression yet: each instantiates the big operator that the reduction names."
- `reductions.tex:44-79`. Before: "takes the bound of the big operator's static parameter, which is not the element type, or, where the reduction's type at that bound does not fit the reduction's expected type, that expected type ...: a bound such as Number gives the reduction that type where it has no expected type, and a bound that mentions the static parameter itself gives no instance that applies, so that the reduction is refused (row 425). Until the compiled type checker directs the desugaring by type, a reduction with a generator clause list whose element type no argument fixes writes its static argument in a program that both implementations are to run, as the team's own tests do, as in ...". After: the bound where the reduction so instantiated is accepted and fits; otherwise the expected type, then the body's type; where the two implementations instantiate alike and where they differ (rows NEW-C-2, NEW-C-1); the argument is written where they would differ.
- `Specification/basic/inference.tex:224-260`: a new paragraph, "A reference to a generic function", with its box.
- `inference.tex:437-447` (a sentence the section does not name, in the same file). Before: "and it refuses the reduction where the big operator has no instance at its bound, as one whose bound mentions its own static parameter has none (row 425 of the revival's gap ledger)." After: it instantiates the big operator by the expected type, otherwise by the body's type; "until 15 November 2026 it refused such a reduction (row 425 ...)".
- `Specification/appendices/changes.tex`, entry `revival-reductions`: a revision sentence in the Change (`:1210-1229`); the reasoning and the way back in the Rationale (`:1286-1309`); the Effect's last sentence, "The compiled type checker still refuses that form (row 425)", replaced by what is accepted since, with rows NEW-C-2 and NEW-C-1 (`:1340-1354`).
- `changes.tex`, entry `revival-expected-contexts`: a fourth revision in the Change (`:2522-2529`), its Rationale and way back (`:2612-2631`), its report's path, and in the Effect the reduction's sentence (`:2669-2672`) and the reference's (`:2693-2704`).

Sentences that the change makes false and that the rung did not edit: none found in `Specification/` (grep for "compiled type checker" beside "reduction", "big operator" and "generic function", and for rows 425, 731 and 758). The front matter's paragraph on the revision (`Specification/fortress/preamble.tex`) says nothing of either.

The rows `NEW-C-1` to `NEW-C-4` are cited in the two chapters and the appendix by their placeholders, for the gather to number.

## 9. Points to report reached

1. The rule as built for the reduction: section 1; where the declared type and the body differ, and walk: sections 1 and 5.
2. Each place where the rule gives a reduction another type than walk: the table of section 5; a call's argument does not differ.
3. The rule as built for the function reference, an open parameter, an overloaded name: section 1.
4. The reproducers failing on the base and passing after; the library's three sites and the model's line 43: sections 2 and 5.
5. Every existing test whose verdict, output or pinned message changed: none at the head; section 6.
6. The count and distance tables, their commit and seconds, P-148's runs: section 7.
7. Each sentence of the specification changed; none made false beyond them: section 8.
8. Step 2 landed; row 758 closes.
9. A file edited beyond those named: `scala_src/typechecker/CoercionOracle.scala:292-293`, one arm; in `inference.tex`, the sentence at `:437-447`; `ProjectFortress/tests/XXXReductionDeclaredTypeMethodWalk.fss`, a walk test for row NEW-C-2.
10. The rule reaches further than the section's words: a reduction whose big operator has an instance at its bound and is not accepted so, as a comprehension under a declared `List[\E\]` (the "deviation" line).

None is a step that cannot be undone or that acts against a decision on record. No model line, no library line and no team test is changed, and no call that was accepted on the base invokes another declaration: a reduction accepted as written returns that result (`Functionals.scala:681`), and a reference is instantiated only where the name has one declaration, which was a crash or a refusal before.

## 10. Decisions

1. The static argument is written on the big operator's call and the call checked again, in `typedApplicationOfArg`. Ways not taken and why: section 3.
2. The body's type is read by checking the clauses at a candidate's parameter type with its static parameters at `Any`. Not taken: `BottomType` for the reduction and the unit function's result, which could make several `__generate` declarations apply at once; reading the generators' element types from the syntax, which repeats `__generate`'s overloading. Limit: a program's own `__generate` whose static parameter has a bound that `Any` does not meet gives no body type; the test's `__generate` is unbounded for that reason.
3. The expected type is tried before the body's type (fork C1), and only a type that meets the big operator's bound is tried. Evidence: `w: ZZ64 = BIG LAST[...] (3 j)` runs at `ZZ64` in the test.
4. The rule also serves a big operator with an instance at its bound where the call is not accepted so. Not taken: the section's narrower condition, which leaves row 731's comprehension refused and `Library/List.fss:151` needing its argument. No decision on record covers it; reading acted on: fork C1's sentence, "by the reduction's declared type where it has one that fits the bound, and else by the type of its body". A question for the curator.
5. An accepted try result is returned as the call's result, not checked again. Not taken: checking the written form again outside the try checker, which doubles the work at each level of nesting. Precedent: `retypedApplication` returns its try result (`:1117-1120`).
6. An arrow type that carries unbound static parameters is a subtype of no arrow type, and coerces to nothing. Not taken: binding them for the comparison (section 3).
7. A static parameter is open where the solution without the bounds' fallback leaves it at `BottomType`, so one that only the return type mentions is refused. Not taken: the bound or the range's type (P-48's rule for a call), since nothing later can choose a function value's instance. A question for the curator.
8. The untyped binding is refused where its value is applied, in `typedApplicationOfArg`, and only where the chosen candidate would reach the Java error. Not taken: a refusal at the reference, which the arm cannot tell from an applicand or a first-pass argument; a refusal at the binding, which is in `impls/Decls.scala`, rung D's. A question for the curator.
9. A name with several declarations is left as it was. Not taken: choosing the one declaration that instantiates, since the reference holds one list of static arguments and the code generator has no case for an overloaded function as a value (row 448).
10. The refusals are tested as `XXX`-named `.test` files over plain-named components, the folder's form (`XXXNumeralWhereRefusedCompiled.test`). Not taken: a plain `.test` with `compile_err_contains`, which the harness reports red on any failed compile.

## 11. Defects and their homes

| defect | home | where |
|---|---|---|
| row 731, the refusal of an unwritten reduction | 1 | `compiler_tests/InferBigOperatorSelfBound` |
| row 758, the crash on a generic function as a value | 1 | `compiler_tests/GenericFunctionAsValueCompiled`, `XXXGenericFunctionAsValueOpenCompiled`, `XXXGenericFunctionAsValueUntypedCompiled` |
| the Java error on an applied untyped binding | 1 | `XXXGenericFunctionAsValueUntypedCompiled` |
| a big operator with two static parameters, unwritten, still refused | 3, row only: the specification's box now states it; no prelude declaration reaches it | row NEW-C-1 |
| walk does not read a method's return type, a field, a top-level variable or an assignment for a reduction | 2 | `tests/XXXReductionDeclaredTypeMethodWalk`, row NEW-C-2 |
| a reference to an overloaded name with a generic declaration, refused | 3, row only: the refusal is today's answer and the code generator's wall stands behind it | row NEW-C-3 |
| an untyped binding of a generic function, never applied, stops the checker | 3, row only: a crash; the repair is in rung D's file | row NEW-C-4 |
| compiled: an initialiser's assignment to a top-level mutable variable is not seen before the initialised variable's first read | 3, row only: bounded, the cause not read; a test that asserts it passes when the variable is read first | row NEW-C-5 |

## 12. Commands worked out

- The distance stage's driver on one program: build the shadows as `explorations/coordinator/tools/distance/run.sh` does (`shadow-patch.py`, `add-patch.py`, `javac` of the seven shadow sources and of `DistanceMulti.java`), then `java -Xmx4g -Xss64m -Djava.io.tmpdir=<scratch> -Dfortress.caches=<scratch> -Dprobe.tolerant=true -Dprobe.all=true -Dfortress.analyzer.overload.cache=false -cp <shadow-classes>:<classes>:<classpath without the bytecode cache> DistanceMulti -order check -setting any FILE`, from the tree's root, or from the program's folder where it imports an api beside it. With the base build's classpath and `FORTRESS_HOME` the worktree, it is the base's checker on the worktree's sources. About 20 to 40 s a program.
- The count stage's checker under JFR: the stage's own `java` line (`run.sh:95-97`) with `-XX:StartFlightRecording=filename=F,settings=profile` and the classes of an earlier run's scratch; `jfr print --events jdk.ExecutionSample --stack-depth 64 F`.
