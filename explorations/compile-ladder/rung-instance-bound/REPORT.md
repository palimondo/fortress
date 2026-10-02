# Rung I (climb batch 8): the checker's inference, the paper's instance rule and the order of attempts

*The gather of climb batch 8 kept the provisional rows 559 and 560 at their numbers and made the skeptic's required correction 3 here: section 7's and section 10's sentences on row 559 name both routes to an instance at an intersection, and the regression.*

*Added at the merged-diff review of climb batch 8: line numbers here are those of the rung's branch, `wip/rung-instance-bound` (`7a405ceb5`), and so of `493b4076f` in every file the rung does not edit, `Library/` among them; rungs Q and M, applied after this rung, move those library lines on the landed tree (row 560 cites them at `493b4076f`). In `Specification/appendices/changes.tex` the gather's correction to the Effect puts the branch's lines after 1741 five later on the landed tree, and rung Q's new entry those after 2529 ninety later, so the sentence of "Passages not yet revised" on the reductions callout (`:2545-2548` here) is landed `:2635-2638`. The record files cite the landed lines.*

problem: `ProjectFortress/compiler_tests/XXXInferResultOnlyCoerced.fss:32` at `493b4076f` (`q(NOf(1))` binds a type parameter nothing fixes to `BottomType` and the run dies loading the instance) and `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:696` at `493b4076f` (the attempts tried with the expected type first, row 508)
spec: `Specification/basic/inference.tex:89-94` at `493b4076f` (a lone type parameter with no narrowest candidate takes the intersection of its upper bounds), with the open question at `:199-204` and the team's note at `:241-242`; `Specification/basic/conversions-coercions.tex:472-476` (section "Coercion Resolution": a declaration applicable without coercion is selected first)
precedent: `Specification/basic/inference.tex:89-94` at `493b4076f` (the bound's own words, which the new item extends) and `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala:524-550` at `493b4076f` (the solver's per-variable binding, whose join of lower bounds the new branch mirrors with the meet of upper bounds)
deviation: the bound is computed in a call-only mode of the solver and the type-schema comparisons keep `solve` (decision record D1), `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala:496`; the order keeps an attempt by subtyping with the context second, between the decision's two (D4), `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:703-708`; on the compiled path an unwritten bound is `Object` (row 412), not the chapter's `Any`, `Specification/basic/inference.tex:239-245`
historical: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala:486-540`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:287-371`, `:599-716`, `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:137-138`, `ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:946-1067`, `:1965-1969`, `Specification/basic/inference.tex:99-118`, `:219-256`, `Specification/appendices/changes.tex:1611-1745`, `:2545-2548`

Commits on `wip/rung-instance-bound`: `2290b30f9` the tests alone, failing on the base; `f97debd88` the checker edit, with `CoverageReturnInferred` split; `032c7cce0` the specification and the decision record; `e0ba93ae2` row 512's test promoted after the compiler-track run; `9853cdd0d` decision-record citations; `6a348e255` the home-3 test `XXXInferResultOnlyNoContext` and the decision record's D11. Nothing was inherited: the branch was cut fresh from `493b4076f`. The harness refused the write of this file; the gather writes it from this text.

## 1. What changed

**The instance rule** (POSITIONS, "A type parameter the arguments do not fix takes its bound, never `Bottom`"). A type parameter that the arguments do not fix is instantiated at the intersection of its upper bounds, its declared bound under what the expected type requires; never `BottomType`, never the union of the arguments' types.
- `Formula.solveToBounds` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala:488-497`; its mode in `slv` at `:499-503`, `:524`, `:534-540`): a type inference variable whose lower bounds are all `BottomType` or mention inference variables takes `ta.meet` of its upper bounds free of inference variables; an empty meet (`BottomType`) is no solution; a variable the formula leaves unconstrained takes `Any` (`STypesUtil.topIvars`, `ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1965-1969`). A variable with a named lower bound is solved as before.
- The call inference uses it: `inferStaticParamsHelper` gains `toBounds` (`STypesUtil.scala:962-973`, `:1022-1023`), passed by `inferStaticParams` (`:946`: the attempt by subtyping, and the coercion oracle's generic coercions), `inferLiftedStaticParams` (`:1067`) and the coercion attempt (`Functionals.scala:371`). `TypeSchemaAnalyzer`'s existence questions and `addParamTypes` keep `solve` (decision record D1).
- The promotion of a lone parameter's union offers its upper bounds beside the named candidates (`Functionals.scala:349`, comment `:337`, doc `:287-291`), so unbounded `pick0(w, r)` is a `BoxT[\Any\]` and the union candidate goes (D3).

**The order of attempts** (POSITIONS, "The order of the checker's attempts at a call"; row 508). `typedApplication` (`Functionals.scala:703-716`, doc `:599-603`): with an expected type, by subtyping without it, kept when its result converts; then by subtyping with it; then with coercion and it; then with coercion without it. Without one, as before. When no attempt is kept, the fallback takes the same set as before (the attempts with the context, or for a call `f(x)` those without it). Why subtyping with the context stays second: D4.

**Row 541.** `TypeAnalyzer.pSubInner` (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:137-138`): an intersection is a lower bound of an inference variable as a whole, so `pass(choose(m))` takes `LeftResult ∩ RightResult`, not one conjunct by a set's iteration order (D5). It is this rung's only edit of the file, a solver declaration, not `staticParam` (rung O's).

**The specification**, in the S1 form (the decision record, section 1): `Specification/basic/inference.tex` gains the item on a type parameter nothing fixes (`:99-118`, with its callout); the list of what the chapter does not describe keeps a `nat` or `int` parameter and a reduction's element type in place of its old item (`:219-224`); the callout after it (`:239-256`) says what the checker and walk do and answers the third item of the team's draft note, which stays (`:265-275`). `Specification/appendices/changes.tex`, entry "The inference of a call's static arguments": Change (`:1611-1631`), Rationale (`:1662-1670`), Effect (`:1714-1745`); "Passages not yet revised" (`:2545-2548`): the sentence on the item and the box replaced by one on the reductions callout.

## 2. The tests: failing on the base, passing on the edit

All in `ProjectFortress/compiler_tests/`. The failing run, on `493b4076f` with the tests of `2290b30f9` placed (`tmp/rung-instance-bound/junit.sh`, a copy of `explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh` sourcing a copy of `env.sh` without its `rm` of `/tmp/fortress*rats`):

    ONE_JVM=1 junit.sh base ProjectFortress/compiler_tests InferResultOnlyCoercedLink.test InferResultOnlyCoerced.test ... InferBigOperatorUnwritten.test
    F. run ProjectFortress/compiler_tests/InferResultOnlyCoerced (294ms) java.lang.NoClassDefFoundError
    Caused by: java.lang.NoClassDefFoundError: java/lang/Object$RTTIc
    F. compile ProjectFortress/compiler_tests/InferResultOnlyOverloaded Type checker generated.:0:0:
    subtypeCompareTo(class com.sun.fortress.nodes.BottomType class com.sun.fortress.nodes.BottomType) is not implemented!
    Tests run: 29,  Failures: 25,  Errors: 0

| test | row | on the base |
|---|---|---|
| `InferResultOnlyCoerced` (+`Link`), promoted from `XXXInferResultOnlyCoerced` | 447 | link passes; run `NoClassDefFoundError: java/lang/Object$RTTIc` |
| `InferResultOnlyAny` (+`Link`), promoted from `XXXInferResultOnlyAny` | 505 | "Could not infer static argument T extends Any without context." for `eAny()`; "`[\T extends Object\](BoxO[\T\], BoxO[\T\])->String` is not applicable to an argument of type `(BoxO[\BottomType\], BoxO[\Object\])`" |
| `InferResultOnlyOverloaded`, new (the ledger's `UkTypeRange` and `SkTypeRangeWhich`) | 447 | compile "subtypeCompareTo(... BottomType ... BottomType) is not implemented!" |
| `InferLoneUnbounded`, promoted | 516 | "not applicable to an argument of type `(BoxT[\OR(ZZ64,RR64)\], BoxT[\Any\])`" |
| `InferUnionCoercedArg`, promoted | 515 | "`[\T extends Object\](T, T, ZZ64)->String` is not applicable to an argument of type (ZZ64, RR64, ZZ32)." |
| `InferUnionInstanceArg`, promoted | 518 | "`[\T extends Object\]BoxT[\T\]->String` is not applicable to an argument of type `BoxT[\OR(ZZ64,RR64)\]`." |
| `CoverageReturnInferred`, promoted | 541 | compile "Right-hand side has type LeftResult, but declared type is RightResult."; link, in the same JVM, "Right-hand side has type RightResult, but declared type is LeftResult." |
| `XXXInferLoneUnionClosedTrait`, rewritten to a refusal | 535 | the program compiles at the union: "Saw failure, but did not satisfy compile_err_contains", "Saw wrong failure" |
| `InferContextKeepsFit` (+`Link`), promoted | 508 | run "FAIL:  99 =/= 1" |
| `ExpectedTypeChoice` (+`Link`), promoted from `XXXExpectedTypeChoiceRungT` | 508 | run "FAIL: b: ZZ64 = O.k(z) runs the generic method k ..." |
| `ExpectedTypeFnChoice` (+`Link`), promoted from `XXXExpectedTypeFnChoiceRungT` | 508 | run "FAIL: b: ZZ64 = k(z) runs the generic k ..." |
| `InferBigOperatorUnwritten`, new | 425 | compile "BottomType->BottomType is not applicable to an argument of type ZZ32." |

The passing run, on `e0ba93ae2`'s clean build (every file above, row 512's promoted pair, and `InferLoneBound` and `InferNumeralTie` beside them):

    ONE_JVM=1 junit.sh final ProjectFortress/compiler_tests InferResultOnlyCoercedLink.test ... InferNumeralTie.test
    . compile ProjectFortress/compiler_tests/XXXInferLoneUnionClosedTrait ... - BoxT[\Fig\]->String is not applicable to an argument of type BoxT[\Any\].  Saw expected failure
    . run ProjectFortress/compiler_tests/CoverageReturnInferred (417ms) Exception in thread "main" java.lang.Error: Unable to read serialized data for Intersection??, ...  Saw expected failure (Exit code != 0)
    OK (37 tests)

and `XXXInferResultOnlyNoContext.test` alone on the same build: "Saw expected failure", "OK (1 test)".

Row 512's `XXXUnionOfThreeRungK` turned red in the compiler-track run (section 3), its run passing; it is promoted to `InferLoneBoundThree` (+`Link`) in `e0ba93ae2`. On the base its run is the expected failure the landed gate counts (row 512: `NoSuchMethodError: ... Union$RTTIc.factory(RTTI, RTTI, RTTI)`); on the edit `triK(OneK, TwoK, ThreeK)` is instantiated at the bound and passes (the run above).

The compiler corpus: `.test` files 492 to 495; the compiler track's cases 959 on the landed summary, 972 in the run below, 973 with `XXXInferResultOnlyNoContext` (decision record D6, D7).

## 3. The one whole-suite run, and the instances the expected type now fixes

The compiler and library tracks once, as `testFast`'s `fastTrack` runs them (`build.xml:930-958`: own empty caches, `fortress.junit.reset=false`, `FORTRESS_THREADS=1`, `-Xmx768m -Xss32m`), on `f97debd88` with a scratch instrumentation that writes, for every call with an expected type and no lambda argument, the old order's most specific candidate beside the new one when they differ (`tmp/rung-instance-bound/instrumentation.patch`, not committed; it changes no result):

    tmp/rung-instance-bound/tracks.sh  (junit.textui.TestRunner CompilerJUTest and LibraryJUTest, in parallel)
    == compiler
    Tests run: 972,  Failures: 1,  Errors: 0
    1) .../compiler_tests/XXXUnionOfThreeRungK ... AssertionFailedError: TestTest .../XXXUnionOfThreeRungK
    == library
    OK (86 tests)

The one failure is row 512's expected failure turning green, by the rule (the row's own note: "if the merged gate shows `XXXUnionOfThreeRungK.test` passing, the row closes there"); promoted (section 2). Every other compiled test kept its verdict, `InferLoneBound` and `InferNumeralTie` among them. The code is unchanged after that run (the later commits change tests, the specification and records), so it stands for the head. The solver's own unit tests, beside it on the clean build: `FormulaJUTest` OK (5 tests), `ConstraintJUTest` OK (4), `STypesUtilJUTest` OK (1).

The calls whose most specific candidate moved under the new order (row 508's cost), the instrumentation's whole log over both tracks:

| call | expected type | before (old order) | after |
|---|---|---|---|
| `compiler_tests/ExpectedTypeChoice.fss:15` `O.k(z)` | ZZ64 | `k(x: ZZ64)`, `z` converted | `k[\ZZ32\]`, the result converted |
| `compiler_tests/ExpectedTypeChoice.fss:17` `z OPLUS z` | ZZ64 | `OPLUS(ZZ64, ZZ32)`, `z` converted | `OPLUS[\ZZ32\]`, the result converted |
| `compiler_tests/ExpectedTypeFnChoice.fss:10` `k(z)` | ZZ64 | `k(x: ZZ64)` | `k[\ZZ32\]` |
| `compiler_tests/InferContextKeepsFit.fss:23` `k(NOf(1))` | V | `k(x: V)`, `NOf(1)` converted | `k[\NOf\]`, the result converted |
| `compiler_tests/InferCoercionShapes.fss:78` `c: ZZ64 = idt(3)` | ZZ64 | `idt[\ZZ64\]`, the numeral converted at the argument | `idt[\IntLiteral\]`, the result converted |

The first four are this rung's tests. The fifth is climb batch N's: its value (3) and verdict are unchanged; its message at `:79`, "a numeral converted at the argument under the expected type", describes the old instance. The new instance is the chapter's own example (`b: ZZ64 = id(3)` "instantiates `id` at the numeral's own type and coerces the result", section "The Static Arguments of a Call"). The file is not this rung's to edit; listed below. Calls with a lambda argument are outside the instrumentation (comparing the old order would type the lambda again).

## 4. Row 425: what the bound gives a big operator

`InferBigOperatorUnwritten` writes the row's shape on the compiler's own library, whose big operators are not generic (`Library/CompilerLibrary.fsi`, `BIG +`, `BIG MAX`): a test's own `opr BIG LAST[\T extends ZZ32\]()` with its own `__bigOperator` and `__generate` beside the library's, and `s: ZZ32 = BIG LAST[j <- lo#n] (3 j)` unwritten. On the base it is refused with the row's message (section 2); on the edit it runs and gives 9. The bound is not the element type, though: the same program with the bound `Number`, the one library's `SUM` shape, is refused on the edit:

    tmp/rung-instance-bound/probe.sh tmp/rung-instance-bound/probes/PbBigNumber.fss
    .../PbBigNumber.fss:31:15-39:
        Right-hand side has type Number, but declared type is ZZ32.
    File PbBigNumber.fss has 1 error.

while its line 29, `t: Number = BIG LAST[j <- lo#n] (3 j)`, is accepted. The desugared call is `__bigOperator(BIG LAST(), fn (r, u) => ...)` (`PreTypeCheckDesugaringVisitor.visitAccumulator`, `DesugarerUtil.visitGenerators`): the big operator is an argument, typed before the enclosing call and without an expected type, so its parameter takes its bound. The row's second half stands: the element type needs the desugaring to fix the big operator's static argument from the clauses or the expected type, as the specification's type-directed desugaring says (`Specification/advanced/parallelism-locality/defining-generators.tex:154-164`). The row gets a note; the chapter keeps the element type on its list.

## 5. Ladder subset, checker count and distance

The before is the last landed gate's tables, climb batch 7b's (`explorations/compile-ladder/climb-batch-7b/gate/checker-count.txt`, `distance.txt`, `ladder/ladder.tsv`) and `explorations/compile-ladder/gate/distance-sites.tsv`; `git log b0eb41516..493b4076f -- Library/ ProjectFortress/src/ ProjectFortress/LibraryBuiltin/` prints nothing, so the base did not change under them. Each stage ran once, on `e0ba93ae2`'s build.

- Ladder, the landed ladder's 85 files through a copy of `explorations/compile-ladder/repair-r1-atomic-static/run-subset.sh` (root and outputs under `tmp/rung-instance-bound/ladder/`): all 85 compile and run with exit 0 and no `fail` or exception in their output, as the landed table's 85 pass.

      LADDER_ROOT=tmp/rung-instance-bound/ladder/root bash tmp/rung-instance-bound/ladder/run-subset.sh
      === ladder done 2026-10-02T13:59:16+00:00, 85 files ===

- Checker count, identical to the landed table row for row: `#total 59`, `#crash none` (`explorations/coordinator/tools/checker-count/run.sh tmp/rung-instance-bound/stages/checker-count.txt ...`).

- Distance, 598 to 623:

      explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-7b/gate/distance.txt tmp/rung-instance-bound/stages/distance.txt
      DISTANCE UP   598 -> 623 (+25)
          class GB                      7 -> 0      (-7)  generators: a function argument inferred at BottomType (COMPOSE, map)
          class OT                    141 -> 170    (+29)  other body errors (one-off library slips and checker limits)
          class BR                     10 -> 12     (+2)   big operators: a reduction's body typed as the element ...
          class I1                     11 -> 12     (+1)   integers in generic code ...

  Units: FortressBuiltin 6 to 10, FortressLibrary 355 to 363, List 23 to 24, RangeInternals 73 to 75, String 67 to 68, Writer 1 to 9, NativeArray 0 to 1. Crashes unchanged. Site by site against `distance-sites.tsv` (11 gone, 36 came):
  - GB, 7 gone: the bound in place of `BottomType`. Four sites clear (`Library/FortressLibrary.fss:3509`, `:3513`, `:3540`, `:3562`); three stay errors under a new message: `:4137` and `:4143` (`BIG MIN`'s no-argument form, `[\T extends StandardMin[\T\]\]`: an F-bounded parameter that nothing fixes has no instance at its bound, "not applicable to an argument of type ()") and `Library/List.fss:150` (the nullary comprehension, `Object->...` where it read `BottomType->...`).
  - 18 came where `()` is expected against the bound `Object` that climb batch 7's rung B wrote on `builtinPrimitive` and `fail` (PLAN item 20), "Function body has type Object, but declared return type is ()": `Library/Writer.fss:34`, `:37`, `:40`, `:43`, `:56`, `:59`, `:62`, `:65`; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:703`, `:707`, `:710`; `ProjectFortress/LibraryBuiltin/NativeArray.fss:24`; `Library/FortressLibrary.fss:1710`, `:4238`, `:4343`, `:4344`, `:4346`, `:4347`. `Object` excludes `()`; with the bound unwritten, `Any`, the instance there is `()` (section 6, `PbNoCtx`'s `unitStop`).
  - 11 came where the checker passes no expected type to a result-only call: an `if` without `else` (`Library/FortressLibrary.fss:295`, `:300`, `:4303`; `Library/RangeInternals.fss:154` and the method invocation around it at `:155`), a `typecase` branch (`Library/FortressLibrary.fss:1039`, `:3906`, `Library/String.fss:426`), a block's last expression after a local declaration (`Library/FortressLibrary.fss:2022`, `Library/List.fss:453`), a loose juxtaposition (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:35`). Under the bound `Any` the same shapes are refused (section 6), so the question is whether those contexts carry an expected type: home 3 (section 7, row 560).
  - Row 488's family, not attributed: `Library/FortressLibrary.fss:3446` and `:3466` (the generic `BIG ||` and `BIG //` bodies) gone and the two `BIG ||` messages at `:306` and `:316` respelled; `:1557` (`BIG SQCAP`) and `:3271` (`BIG MAXNUM`) came, whose second-body errors come and go between landed tables (`climb-batch-7C/gate/distance-sites.tsv` and `climb-batch-N/gate/distance-sites.tsv` hold both bodies' errors). Net 0.

  Net: −4 where `BottomType` was bound, +29 new refusals of `fail` and `builtinPrimitive`: +25.

## 6. Probes beside the tests

On the clean build (`tmp/rung-instance-bound/probe.sh`, compile and run, walk where it can):
- `PbCtx`: `u0(): () = stop("u")` for `stop[\T\](s: String): T` is refused on the compiled path, "Function body has type Object, but declared return type is ()": the unwritten bound there is `Object` (row 412), which excludes `()` (`Specification/basic/types-vals-vars.tex`, section "Special Types"), and the instance at `Object` does not convert. `c2(): ZZ32 = stop("a")` compiles and runs at `ZZ32`; `c3(): V = mk()` for `mk[\T extends N\](): T`, `V` excluding `N`, compiles: the meet is empty, the retry without the expected type gives `N`, whose result converts.
- `PbNoCtx`, the bound written `Any`: `unitStop(): () = stop("u")` compiles (the instance is `()`); `if c then stop("bad") end` is refused, "An 'if' clause without corresponding 'else' has type Any instead of type ()", and a `typecase` `else => stop(...)` branch, "Function body has type OR(Any,Boolean), but declared return type is Boolean"; walk runs both.
- `PbSingle`: `x: ZZ32 = try stop("a") catch ... end` is refused, "Right-hand side has type Object, but declared type is ZZ32": a `try` body is not a context the chapter gives an expected type.
- `PbAnyNoCtx`: `u = ea(z)` for `ea[\T extends Any\](x: ZZ32): BoxA[\T\]`, refused on the base "without context", compiles and runs at `Any` (2, as walk).
- `PbLambdaCtx`: `b: BoxT[\ZZ64\] = mk(fn x => x + 1)` for `mk[\U\](f: ZZ32 -> ZZ32): BoxT[\U\]` compiles and runs (2): only the attempt by subtyping with the context can fix `U` with a lambda argument (D4).

## 7. What the specification settles, by row, and each defect's home

- 447, 505: the chapter's new item. Home 1: `InferResultOnlyCoerced`, `InferResultOnlyOverloaded`, `InferResultOnlyAny`.
- 515, 516 (compiled half), 518: the lone-parameter item (the bound). Home 1: `InferUnionCoercedArg`, `InferLoneUnbounded`, `InferUnionInstanceArg`. Walk's half of 516 stays (the walk rung, row 424).
- 535: the same item; the call is a static error. Home 1: `XXXInferLoneUnionClosedTrait`, a compile test that must fail with the message, passing as expected.
- 512: the bound in place of a union of three. Home 1: `InferLoneBoundThree`.
- 541: the lone-parameter rule for one argument (its own type, the intersection). Home 1 for the checker: `CoverageReturnInferred.test` (compile, link).
- 508: `Specification/basic/conversions-coercions.tex`, section "Coercion Resolution", and the chapter's "Choice". Home 1: `InferContextKeepsFit`, `ExpectedTypeChoice`, `ExpectedTypeFnChoice`. The new order reaches the operator and the method invocation (both go through `typedApplication`, `Functionals.scala:924`, `:1110`), so both rung-T tests are promoted.
- 425: the bound is built (`InferBigOperatorUnwritten`, home 1); the element type stays open (section 4).
- New row 559 (provisional): a generic declaration instantiated at an intersection type dies before any output, "Unable to read serialized data for Intersection??", `Resource not found : Intersection??.xlation` (`ProjectFortress/src/com/sun/fortress/runtimeSystem/InstantiatingClassloader.java:2519`, from `MainWrapper.main`). Valid under every reading: home 2, `XXXCoverageReturnInferred.test` (`run_out_does_not_contain=REACHED`, `REACHED` printed first, `run_err_contains=Intersection`). This rung's first `XXX` run test, shown through the harness: placed, "Saw expected failure (Exit code != 0)" (section 2); on a stand-in under `tmp/` whose `y = choose(m)` runs, the harness fails it:

      ONE_JVM=1 junit.sh inter-standin tmp/rung-instance-bound/standin CoverageReturnInferred.test XXXCoverageReturnInferred.test
      . run tmp/rung-instance-bound/standin/CoverageReturnInferred (683ms) REACHED
      Failed to satisfy run_out_does_not_contain; expected
      Tests run: 3,  Failures: 1,  Errors: 0

  The rule gives an instance at an intersection by two routes, and programs of both shapes that the base compiled and ran now die loading it: a regression of this rung, which the skeptic found (`SKEPTIC.md` sections 4 and 5). Route 1 is row 541's repair: an argument whose static type is an intersection fixes a bare type parameter at the whole intersection. `SkInterRan` (`idy[\X\](x: X): X` applied to `choose(m)`) printed `idy: BothResult` on the base, at one conjunct, and at the head dies before any output, through `xlationForGeneric` from `MainWrapper.main`. Route 2 is the instance rule itself: a parameter nothing fixes whose declared bound and expected type are traits that neither extend nor exclude each other takes their meet. `SkMeetTraits` (`mk[\T extends A\](): T = cast[\T\](Both)`, `g(): B = mk()`) printed `g: Both` on the base, at `BottomType`, and at the head prints `REACHED` and dies at the call, through `instantiateAbstractArrow`. The skeptic's runs, `bin/fortress compile` then `bin/fortress run` on the base build and the head build:

      bin/fortress run SkInterRan      (head; the base printed "idy: BothResult")
      Exception in thread "main" java.lang.Error: Unable to read serialized data for Intersection??, ...
      bin/fortress run SkMeetTraits    (head; the base printed "g: Both")
      REACHED
      java.lang.Error: java.lang.Error: Unable to read serialized data for Intersection??, ...

  Route 2's home 2, added at the gather: `ProjectFortress/compiler_tests/InferBoundMeetsExpectedTrait.fss` with `InferBoundMeetsExpectedTraitLink.test` (link) and `XXXInferBoundMeetsExpectedTrait.test` (run, `run_out_contains=REACHED`, `run_err_contains=Intersection`), seen through the harness on the batch's merged tree, "Saw expected failure (Exit code != 0)", and failing on a stand-in whose bound is the expected trait, "Failed to satisfy run_err_contains" (`compile-ladder/climb-batch-8/RECORD.md`, rung I). Walk prints `REACHED` and `PASS` for it.

  The repair is the run time's: a class for an intersection type, as row 448's second face needs for an intersection of arrows.
- New row 560 (provisional): the one library's result-only `fail` and `builtinPrimitive` refused where the bound gives no instance (section 5). Where `()` is expected against the written `Object` (18 sites), the chapter settles it against the library's bound, whose repair is a library edit (PLAN item 20); no compiled program can load the one library, so the row alone holds it, with the sites. Where no expected type reaches the call (11 sites), the chapter does not describe those contexts: home 3, `XXXInferResultOnlyNoContext` (an `if` clause without `else` made of a call bounded by `Any`, refused) pins today's behaviour.

## 8. Precedent search

- The bound's words: the chapter's lone-parameter item since climb batch 7b (`Specification/basic/inference.tex:89-94` at the base), which the new item extends; Appendix I's dispatch entry, the same rule of the paper.
- The solver: one per-variable binding site (`Formula.scala:524-550` at the base: the join of lower bounds and the team's ancestor heuristic); the new branch is its dual where no lower bound exists. The one other `BOTTOM` site, the heuristic's trial map (`Formula.scala:538` at the base), binds nothing and is left (D1). Callers of the solver: six (`inferStaticParamsHelper` from `inferStaticParams`, `inferLiftedStaticParams`, `checkApplicableWithCoercion` and two `TypeSchemaAnalyzer` sites; `addParamTypes` through `solve`); the three call-inference sites take the new mode.
- The order: batch N's attempts list (`Functionals.scala:696-707` at the base) and its doc, kept in shape; the same alternative was built and measured by climb batch N's shadow (`explorations/reviews/inference-rule-shadow.md`).
- Row 541: `pSubInner`'s inference-variable cases come after the intersection and union cases (`TypeAnalyzer.scala:139-167` at the base); the union-on-the-right case (row 518's mechanism) is left, since inference no longer produces a union instance for a lone parameter.

Every name added was grepped in `ProjectFortress/tests/`, every `*_tests/` directory, `Library/` and `src/com/sun/fortress/`: `solveToBounds` and `topIvars` occur only in their two files; the new components and `BIG LAST` only in their own test files.

## 9. Not done here, and why

- Walk: its erasure to `BottomType` (row 424) and its common supertype for an unbounded lone parameter (row 516's walk half) are the walk rung's.
- `Specification/basic/expressions/reductions.tex`'s callout still says the compiled checker takes `BottomType`; not this rung's file; recorded in "Passages not yet revised".
- `compiler_tests/InferCoercionShapes.fss:79`'s message describes the old instance (section 3); not this rung's file. The gather reworded it to the new instance, the skeptic's required correction 4.
- Rung B's written `extends Object` bounds (PLAN item 20): left; they now cause 18 refusals (section 5).
- The specification PDF: a scratch `pdflatex` of a copy stopped on generated example files the build makes first; the brace balance of both edited files equals the base's; the commit stage builds it.

## 10. For Pavol

- The rule as built (section 1) and the five moved instances (section 3); the order keeps subtyping with the context second (D4).
- 18 library sites refused where `()` is expected against rung B's written `Object` bounds, and 11 where no expected type reaches a result-only call (section 5; row 560).
- Row 425: the bound is built; the element type needs the desugaring (section 4).
- Row 559: the compiled run time does not load an instance at an intersection type, which the rule now produces by two routes, an argument whose static type is an intersection (row 541's repair) and a parameter nothing fixes whose declared bound meets an unrelated expected trait; programs of both shapes that ran on the base, at one conjunct or at `BottomType`, now die loading that instance (section 7).
- Row 512's test turned green and was promoted, though the record's section did not name it.
