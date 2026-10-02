# Rung O: the overloading checker's rule for functional methods, the capture, the memo and two crashes

*The gather of climb batch 8 corrected the provisional row numbers to the final ones, each two higher: 559 to 568 are rows 561 to 570. The second skeptic's recommended rows R1 to R4 are rows 571 to 574.*

problem: rows 556 and 557's expected failures at the base 493b4076f (`ProjectFortress/compiler_tests/XXXFunctionalMethodMeetPerProvider.fss:1`, `XXXGenericTraitExcludesKindEnv.fss:1`), the capture and the memo as the triage found them (`explorations/perf-probes/nat/triage.md:76`, `:24-27`), row 477's five crash rows, `explorations/compile-ladder/climb-batch-7b/gate/distance.txt:51-55`, and the first skeptic's two findings against the first pass, `explorations/compile-ladder/rung-overloading-checker/SKEPTIC.md:7`, `:33`
spec: the Meet Rule for Functional Methods, its covering case and its self position, `Specification/advanced/overloading.tex:469-523`; the Meet Rule for Dotted Methods, which compares the receiver by subtyping, `:417-446`; a function beside a functional method by the function rule, `:525-529`; what a trait inherits, compared without the self parameter, and "provides", `Specification/basic/traits.tex:518-529`; an excludes clause and its symmetry, `:223-233`; an object expression's type and what it provides, `Specification/basic/expressions/object.tex:35-37`, `:58-60`; a character literal's type, `Specification/basic/expressions/literals.tex:40`
precedent: the 2012 per-provider check and its reading of declarations with bodies only (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:282-320`, `:133` at 493b4076f), and the top-level set's convention, a component's own declarations with bodies and an imported api's every declaration (`:80-88`, `:121`, used for imports at `:227`, `:231`, `:244`); the receiver dropped from a dotted method's domain before the meet, `makeDomainFromArrow(a, true)` (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeSchemaAnalyzer.scala:67-72`); capture-avoiding renaming, `alphaRenameTypeSchema` (`ProjectFortress/src/com/sun/fortress/scala_src/useful/SNodeUtil.scala:192-204`); the world switch for `String` and `Exception`, `ProjectFortress/src/com/sun/fortress/compiler/Types.java:77-88` at 493b4076f
deviation: a renamed static parameter takes the first free name `R$1`, `R$2`, ... rather than `makeFreshName`'s global counter (`SNodeUtil.scala:344-356`), so that a message that still shows it reads the same in every run, `OverloadingChecker.scala:181-202`
deviation: the per-provider check reads abstract functional methods in an api, and in a component every one inherited from an api, which 2012's read nowhere (base `:133`); it drops one that a subtype's declaration with an equivalent domain implements, as `removeIdenticallyCoveredMethods` does for code generation (`STypesUtil.scala:1522-1545`), but on the instantiated arrows, `OverloadingChecker.scala:131-166`
deviation: for a functional method in a provider the meet is compared without the self parameter at its own position, where `makeDomainFromArrow(a, true)` drops the first element whatever it is; at self position 0 the two compute the same domains, `OverloadingChecker.scala:584-586`, `:594-602`
deviation: the specification names a character literal's type `Character` (`literals.tex:40`), the one library `Char` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:207`); the checker follows each world's library, `Types.java:79`, `:86`
historical: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala`, `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala`, `ProjectFortress/src/com/sun/fortress/compiler/Types.java:65`

Line numbers in `OverloadingChecker.scala` are at the branch's head unless a line says "at the base" (493b4076f).

## 1. What changed, in brief

Seven edits in three files of the 2012 tree, twenty-five JUnit cases in `ProjectFortress/compiler_tests/` with one api, and one interpreter test.

- **Row 556, the Meet Rule for Functional Methods.** At the top level, two functional methods whose self parameters are at one position are a valid overloading (`OverloadingChecker.scala:534`; `functionalMethodsAtOnePosition`, `:559-567`). The meet the rule asks of a type that provides both is left to the per-provider check, which stays and now reads:
  - in an api, every functional method;
  - in a component, every one with a body and every one the type inherits from an api (`toFunctionalMethodArrows`, `:131-157`; `declaredInUnit`, `:159-166`; the repair round's, after the first skeptic's finding 1);
  - in both, all but an abstract one that a subtype's declaration with an equivalent arrow implements (`:151-156`).

  The meet is compared without the self parameter at its own position, as the receiver of a dotted method is (`:584-586`; `withoutSelf`, `:594-602`; the repair round's, after finding 2). A function beside a functional method keeps today's check (row 545). Two functional methods at different self positions still need the Subtype or the Incompatibility Rule. An object expression is checked by no per-provider rule, as in 2012 (row 570, home 2).
- **The capture.** Before the replacer instantiates the declaring trait's static parameters, an inherited method's own static parameters are renamed apart where their names are static parameters of the trait or object being checked (`ownStaticParamsApart`, `:181-202`, called at `:144` and `:173`).
- **The memo.** `validOverloadingMemo` is keyed on everything `validOverloadingInner` reads (`:492-497`, the key at `:508-509`; the scope is set at `:339` and reset at `:373`):
  - the two arrows, as instantiated where the pair is checked, with their self positions;
  - the set of the other signatures there;
  - whether they are dotted methods;
  - the static parameters in scope.
- **Row 557.** The type an excludes clause names is read with its own static parameters in the kind environment when they are not in scope (`TypeAnalyzer.scala:438`; `withClauseParams`, `:760-774`).
- **Row 477.** The world switch re-points `Types.CHARACTER`: `Character` in the compiler's world, `Char` in the one library's (`Types.java:65`, `:79`, `:86`).

The first pass made the worktree fresh at 493b4076f, with nothing inherited. The repair round is section 16.

## 2. Where each fix belongs

Answered from `explorations/coordinator/map/modules-and-phases.md` section B.7 and the map README's row for `scala_src/typechecker/`. On the compile path the overloading rules are checked in one place, `OverloadingChecker.checkOverloading`, called from `StaticChecker.checkCompilationUnit` (`ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java:275`) once per compilation unit. Walk does not run it, so nothing of walk changes. The rule for functional methods, the reading of what a provider provides, the comparison of the meet, the capture and the memo are all in that class.

Row 557 is raised in `TypeAnalyzer.staticParam` (`TypeAnalyzer.scala:778-779`). The caller that reads a type outside its kind environment is the excludes-clause test of `pExcInner` (`:436-440`), reached from `OverloadingOracle.excludes` (`scala_src/overloading/OverloadingOracle.scala:322-327`) through `TypeSchemaAnalyzer.meetED`.

Row 477's name is made in `Types.java` and read once, at `scala_src/typechecker/impls/Misc.scala:464`.

## 3. Precedent search

- **Functional methods per provider.** The team checks them twice. The first check is in the top-level set with functions (`OverloadingChecker.scala:201` at the base). The second is in each trait or object, over what it provides (`:282-320` at the base). The second is the specification's rule in all but two points: `toFunctionalMethodArrows` kept only declarations with bodies (`:133` at the base), and `meetRule` compared the meet without the domain's first element (`:516` at the base, through `TypeSchemaAnalyzer.scala:67-72`).
  - The top-level set reads a component's own declarations with bodies (`getFunctionsFromCompilationUnit`, `:80-83`, through the filter at `:121`) and every declaration of an imported api (`getFunctions(index, f)`, `:85-88`, which passes `onlyConcrete = false`; used for imports at `:227`, `:231` and `:244`). The per-provider check now follows the same convention: in a component, declarations with bodies and every declaration inherited from an api (section 5). The first pass followed only the first half of it; that was the first skeptic's finding 1. Whether a trait is the unit's own is decided by comparing the trait table's `TypeConsIndex` with the unit's own by reference, as `TraitTable.typeCons` decides a local name against an api's (`scala_src/typechecker/TraitTable.scala:34-74`).
  - The team's own way to drop an abstract declaration that a subtype implements is `removeIdenticallyCoveredMethods` (`STypesUtil.scala:1522-1545`, used by code generation at `CodeGen.java:485`, `:955`, `:1096`). It compares the domains without self, under a replacer it does not apply to them, so I wrote the filter on the arrows the check already has.
  - The team's way to leave the receiver out of a meet is `makeDomainFromArrow(a, true)` (`TypeSchemaAnalyzer.scala:67-72`), which drops a domain's first element. In a dotted method's arrow, built as `(selfType, params...)` by `toMethodArrows` (`OverloadingChecker.scala:168-179`), that element is the receiver. In a functional method's arrow, the parameter list with self at its position (`:144-149`), it is self only at position 0. `withoutSelf` (`:594-602`) drops the element at the self position and builds the tuple as `makeDomainFromArrow` does, so at position 0 it gives the same domain. The team has two more ways of dropping self at its position, both from the declaration: `makeArrowFromFunctional(_, _, omitSelf = true, _)` (`scala_src/useful/STypesUtil.scala:157-168`) builds an arrow from a functional's parameters without self, and `paramTypeWithoutSelf` (`STypesUtil.scala:1764-1775`) gives its parameter type without self. The per-provider check compares arrows that `toFunctionalMethodArrows` has already instantiated at the provider, the inherited declaration's replacer applied and the method's own static parameters renamed apart (`OverloadingChecker.scala:142-147`); building from the declaration again would lose both, so `withoutSelf` drops the element from the instantiated arrow instead (added at the gather, the second skeptic's correction 4). One self-first site is left in the file, the message of "There are multiple declarations of f with the same parameter type" (`OverloadingChecker.scala:423`, `makeDomainFromArrow(at, isMethod)`), which for a functional method whose self is not first names the self type in place of the first parameter; row 574.
  - Object expressions: the team's `AbstractMethodChecker` walks them (`scala_src/typechecker/AbstractMethodChecker.scala:71-72`) but leaves their check off, "The typechecker needs for object expression types to have names" (`:135`), with the plan "to lift all object expressions to become top-level objects with generated names" (`:125`); the overloading checker never visits them (its per-provider loop, `OverloadingChecker.scala:331`). Followed: they stay unchecked per provider, and the gap the rung's relaxation opens is row 570 (section 5).
- **Capture-avoiding renaming.** Two shapes exist: `alphaRenameTypeSchema` and `alphaRenameHeader` (`SNodeUtil.scala:192-222`), which rename every static parameter of a schema to a fresh name. The oracle uses the first before comparing two schemas (`OverloadingOracle.scala:84-85`, `:166-167`; `TypeSchemaAnalyzer.scala:116-117`, `:167-168`, `:204-205`, `:235-236`, `:253-254`).
  - Both rename after instantiation, when the capture has already happened. The edit renames before, and only the clashing names, with `alphaRename` (`SNodeUtil.scala:239-266`) and `NF.makeStaticParam`, as `alphaRenameTypeSchema` does.
  - The same defect is elsewhere. Of the sites that apply an inherited method's replacer to its own arrow or domain:
    - two are in `OverloadingChecker` (fixed, both gated, section 6);
    - two are in `AbstractMethodChecker` (`scala_src/typechecker/AbstractMethodChecker.scala:95`, `:99`), not this rung's file (row 563 below);
    - one is in `STypesUtil.inheritedMethods` (`STypesUtil.scala:1374-1375`), rung I's file; the first skeptic's `SkCapCall` shows no capture at a call through it (`SKEPTIC.md:131-150`).
- **The world switch.** `Types.useCompilerLibraries` and `useFortressLibraries` re-point `STRING`, `JAVASTRING`, `EXCEPTION` and `CHECKED_EXCEPTION` (`Types.java:77-88` at the base). `CHARACTER` was the one name of `Types` whose simple name differs between the two worlds and that the switch left alone.
  - `Types.REGION` (`Types.java:70`) names `Region` in `fortressLibrary()`, which the compiler library does not declare (row 477's note). Reported here and left.
- **An excludes clause's reciprocal entry.** `IndexBuilder.checkTraitClauses` adds the excluding trait to the excluded one's clause at its own static parameters (`scala_src/typechecker/IndexBuilder.scala:246-262`). So `Str0`'s clause holds `Rg[\I\]`, with `Rg`'s `I`.
  - `excludesClause` (`TypeAnalyzer.scala:776-791`) is that clause's one reader.
  - `ExclusionOracle.excludes` (`scala_src/typechecker/ExclusionOracle.scala:197-215`) substitutes only the clause's own trait's parameters.
  - No precedent reads the reciprocal entry's parameters. The edit puts them in the kind environment where the clause is read.

## 4. What the specification settles

- **The Meet Rule for Functional Methods** (`Specification/advanced/overloading.tex:469-485`) applies to two functional methods "occurring in trait or object declarations or object expressions" where neither is more specific and they are not incompatible. They are valid when their self parameters are at one position and every trait or object that provides both also provides a declaration on their meet. Batch 7b's covering case (`:509-516`) accepts instead declarations below both that cover the meet.
  - The paragraph before it (`:450-467`) says why the function rule is "too restrictive" for functional methods: "any type that extends both can include a new declaration that disambiguates them".
  - Two functional methods at different self positions need the Subtype or the Incompatibility Rule (`:518-523`).
  - A function beside a functional method is judged by the Meet Rule for functions (`:525-529`). Row 545 says that rule does not settle a family mixing the two over closed traits; that check is unchanged.
- **"A trait declaration *provides* the method declarations that it declares or inherits"** (`Specification/basic/traits.tex:528-529`): abstract declarations and declarations inherited from an api included. A type that provides two functional methods without a declaration on their meet is an invalid overloading wherever the declarations come from (finding 1). An object expression's type extends the traits of its `extends` clause and provides a functional method only with a name a supertrait declares (`Specification/basic/expressions/object.tex:35-37`, `:58-60`), so an object expression that extends two traits each declaring the functional method, with no declaration of its own on the meet, is invalid too (row 570).
- **The self parameter has no role in the meet beyond `i = j`** (`overloading.tex:469-485`). The Meet Rule for Dotted Methods compares the receiver by subtyping, `R_0 <: P_0 ∩ Q_0`, and the other parameters by the meet (`:417-446`), and what a trait inherits is decided on parameter types "not including the type of the self parameter" (`traits.tex:520-527`). So a functional method's self parameter takes the receiver's role wherever it sits, and a type that declares its own declaration on the meet with self second is valid as it is with self first (finding 2).
- **An excludes clause is symmetric** (`traits.tex:223-233`). `Str0` excludes every instance of `Rg`, so its reciprocal entry's `I` stands for any argument, and row 557's program is valid (`Specification/advanced/overloading.tex:247-251`, the Incompatibility Rule).
- **A character literal has type `Character`** (`Specification/basic/expressions/literals.tex:40`); the one library declares the type as `Char` (`FortressBuiltin.fsi:207`). POSITIONS, "The library route.", makes the one library the library the compiler checks. The text's name against the library's is listed for Pavol (section 11).
- **The capture and the memo** are checker defects under any reading:
  - a method's own static parameter is bound by the method (`Specification/basic/traits.tex:520-529`, the inheritance of method declarations);
  - an overloading verdict is a property of the declarations and of the type that provides them, not of the order in which a checker visits types.
- **The text is silent** on whether a checker treats a component's own abstract declarations differently from its concrete ones. Section 5's decision is taken under that silence.

## 5. Row 556: the rule as built (two decisions)

The rule at the top level is a one-line test before the meet test (`:534`). The per-provider check then carries the rule's meet alone, so what it reads and how it compares the meet are the rule.

**What the per-provider check reads (a decision; the first skeptic's finding 1 and the judge's decision 1, `JUDGE.md:101-109`).** 2012's read declarations with bodies only, and an api has no other kind. Ways considered:
- **(1) Relax the top level and keep the per-provider check as it was.** In an api nothing would check a type that provides two abstract functional methods without a meet: the stop "the Meet Rule dropped for a type that provides both functional methods".
- **(2) Relax only pairs that both have bodies.** Every api pair keeps the function rule, and the checker stays stricter than the text wherever a declaration is abstract.
- **(3) Read every declaration everywhere, abstract included.** Closest to the letter of "provides". It also reads a component's own abstract re-declarations of its api's traits, so each per-provider site of an api would appear again in its component. The first pass called these pairs an object must implement anyway, where its own declaration is the meet; that premise does not hold (the second skeptic's finding B, `SKEPTIC.md` section 4, added at the gather): an object may implement an inherited abstract functional method by a concrete one inherited from another trait, which the compiled checkers accept with no meet (`SkAbsConc` runs `b` for a call typed by the abstract declaration's trait, on the base and the head; `scala_src/typechecker/AbstractMethodChecker.scala:90-103`), against `Specification/basic/traits.tex:571` ("any object inheriting an abstract method must define a body expression for the method") and the Meet Rule for Functional Methods; row 572. Any reading of abstract declarations also needs a filter: the first build that read them in an api with none refused the compiler library's own api, `StandardTotalOrder[\T\] comprises T`'s abstract `CMP` (`Library/CompilerAlgebra.fsi:21`) beside `ZZ32`'s (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:231`), because `allMethods` keeps an abstract declaration that a subtype implements (`../bin/fortress compile LibraryBuiltin/AnyType.fss` after `ant compileAll` on that build: "There are multiple declarations of CMP with the same parameter type: (ZZ32)", "File AnyType.fss has 2 errors.").
- **(4) Bodies only in a component, every declaration in an api.** The first pass's. It left a component's type that inherits two functional methods from an api checked by no rule: the first skeptic's `SkFmUse`, refused on the base, compiled and ran at `10d1e672b`, and `SkFmUse3` ran `Fa`'s declaration for a call through an `Fb`-typed variable (`SKEPTIC.md:7-31`). The first pass called (4) "read what the top-level set reads"; the top-level set in fact reads an imported api's declarations whole (`:85-88`).
- **(5), taken: the top-level set's convention whole.** In a component, declarations with bodies and every declaration whose trait or object is not declared in the unit (`declaredInUnit`, `:159-166`); in an api, every declaration; in both, the `implemented` filter (`:151-156`). It adds no check of a component's own abstract pairs, which neither check read before, and it closes finding 1 and the older two-api hole.

Before and after, with the first skeptic's programs (`bash tmp/rung-overloading-checker/repair/probes.sh repair` for the repair, compile then run):

| program | base 493b4076f | first pass 10d1e672b | repair 0a3350fa2 |
|---|---|---|---|
| `SkFmUse` (one api, `object Z extends { Fa, Fb }`, no meet) | refused "Invalid overloading of pick in API SkFmApi" | compiles, runs `a` | refused "Invalid overloading of pick in trait Z" |
| `SkFmUse2` (`Fa` and `Fb` in two apis) | compiles, runs `a` | compiles, runs `a` | refused "Invalid overloading of pick in trait Z" |
| `SkFmUse3` (calls through `Fa`- and `Fb`-typed variables) | refused in the api | compiles, runs `a   a` | refused "Invalid overloading of pick in trait Z" |

So, restated for the repaired check: every pair of functional methods the base checked is checked now in each trait or object declaration that provides both, wherever the two declarations come from; a component's own abstract declarations stay unread by both checks, as on the base, and are listed for Pavol (section 11). One exception remains, found in the repair round: an object expression. The per-provider loop visits the unit's declared traits and objects only (`:331`), as 2012's did for dotted methods too, and the base's function rule at the top level was what refused a pair that only an object expression provides. Since the top level accepts it, the checker passes `XXXFunctionalMethodMeetObjectExpression` (traits `A` and `B` each declaring `pick(self)`, `object extends { A, B } end` in `run`), and code generation stops on the object expression, "CompilerError: emitDesc of type AND(A,B) failed" (row 375, which no compiled object expression gets past). The base refused it, "Invalid overloading of pick in component XXXFunctionalMethodMeetObjectExpression". Loud on both trees, so no program runs with the ambiguity today; home 2, row 570, a stop of this run met (section 12). The compiler library builds, and the compiler and library tracks pass (section 16).

**How the meet is compared (a decision; finding 2 and the judge's decision 2, `JUDGE.md:110`).** `meetRule` asked `oa.isMeet(ha, fa, ga, isMethod)` (`:516` at the base), and with `isMethod = true` `makeDomainFromArrow` drops the domain's first element (`TypeSchemaAnalyzer.scala:67-72`): the receiver for a dotted method, self for a functional method only when self is first. So a type that declares its own declaration on the meet with self second was refused: the first skeptic's `SkSelfAtOne` and `SkInAtOne`, "Invalid overloading of pick in trait C" though `C` declares it (`SKEPTIC.md:33-64`). The defect is older than the rung; the base refused both in trait `C` too. Ways considered:
- **(a), taken: compare self as the receiver is, wherever it sits.** For a functional method in a provider, `isMeet` is asked of the three arrows without the element at the self position (`:584-586`, `withoutSelf` at `:594-602`); the self parameter is compared by subtyping, which `oa.lteq(ha, fa)` and `oa.lteq(ha, ga)` already do on the full domains (`:582-583`). At self position 0 this computes what the base computes.
- **(b) Drop from `allMethods` the declarations a type's own declaration keeps it from inheriting** (`traits.tex:520-527`). It needs a transitive inheritance computation in `STypesUtil.scala`, rung I's file. Not taken.
- **(c) Leave it.** Row 556's rule would hold at self position 0 only, and no declaration on the meet could clear a per-provider site whose self is second.

`coverageRule`, `coversOverlap`, `satisfiesReturnTypeRule`, `satisfiesPositionalRule` and `returnTypeCheck` are untouched.

**The rule's evidence in the corpus.**
- `FunctionalMethodMeetPerProvider` (row 556's program, self first) runs; `FunctionalMethodMeetSelfSecond` (finding 2's two programs, `pick` and `opr IN` with self second) runs.
- `FunctionalMethodMeetInheritedFromApi` (an object extending two api traits with its own declaration on the meet) runs; `XXXFunctionalMethodMeetInheritedFromApi` (the same without it) is refused "in trait Z".
- The per-provider check still refuses a provider that lacks the meet:
  - `XXXComprisesMeetFunctionalMethodUncovered`: refused in `V`;
  - `XXXFunctionalMethodMeetBetweenTraits`: refused in `M`, and `XXXFunctionalMethodMeetJoinOfClosedTraits`: refused in `Join` (section 7);
  - `XXXFunctionalMethodMeetSelfSecondNoMeet`: refused in `D`, self second.
- Self parameters at different positions are still refused: `f(self, x: ZZ32)` in `A` beside `f(x: ZZ32, self)` in `B` gives "Invalid overloading of f in component TwoPositions" (`bin/fortress compile TwoPositions.fss` on the first pass's edit).
- Batch 7b's coverage tests keep their verdicts: `CoverageReturnGood`, `CoverageReturnGoodReversed`, `ComprisesMeetFunctionalMethod`, `ComprisesMeetCompiled`, `ComprisesBetweenTwoClosed`, `CoverageReturnExpected`, and the refusals `XXXCoverageReturnBad`, `XXXComprisesMeetNoCover`, `XXXComprisesMeetUncovered`, `XXXComprisesMeetUnexcluded` and `XXXComprisesMeetFunctionalMethodUncovered`. So does row 543's `XXXCoverageReturnGenericFamily`. The first pass ran each of the family's 28 `.test` files separately through the harness; every one was "OK" but row 546's. The repair round's tracks (section 16) ran them all again, green.

**Row 546's verdict changed** (a stop of this run, section 12).
- Its program, `XXXComprisesMeetGenericTrait.fss`, is the closed-trait family over `S[\X\]`, `T[\X\]` and `V[\X\]`, written with functional methods.
- Under the Meet Rule for Functional Methods it is valid without the coverage check: the one type that provides both `S`'s and `T`'s `tag`, `V[\X\]`, provides its own.
- The checker now accepts it. The compiled run then dies: "ClassCastException: class ComprisesMeetGenericTraitProbe$Vo cannot be cast to class ComprisesMeetGenericTraitProbe$\=V?fortress\|CompilerBuiltin\%ZZ32?" (`bin/fortress run` of a copy under another name). Walk prints "tag(s) = 3" and "PASS".
- Its `.test` became a run test, `run_out_does_not_contain=PASS`, beside a new link test, `ComprisesMeetGenericTraitLink.test`. The program is unchanged, and its comment still states the specification's answer.
- Row 546's subject, the coverage check's refusal of a family with static parameters, is unchanged for functions. It now has its own expected failure, `XXXComprisesMeetGenericFunctions`: the same family as top-level functions, "Invalid overloading of tag in component ComprisesMeetGenericFns" on the edit.
- The run-time failure is row 566 below.

## 6. The capture

`toFunctionalMethodArrows` and `toMethodArrows` built an inherited method's arrow with its own static parameters, and then applied the declaring trait's replacer (`:136-139`, `:148-151` at the base). `Gen[\E\].gen[\R\](f: E -> R)`, inherited by `Pair[\R\] extends Cond[\Pair[\R\]\]`, became `[\R\](Gen[\Pair[\R\]\], Pair[\R\]->R)->R`: the trait's `R` is bound by the method's. The dotted branch, before the edit (`junit.sh base ... InheritedMethodStaticParamSameName.test`):

```
    Invalid overloading of gen in trait Pair:
     [\G extends Object\](Cond[\Pair[\R\]\], Pair[\R\]->G)->G @ ProjectFortress/compiler_tests/InheritedMethodStaticParamSameName.fss:9:5-10:1
 and [\R extends Object\](Gen[\Pair[\R\]\], Pair[\R\]->R)->R @ ProjectFortress/compiler_tests/InheritedMethodStaticParamSameName.fss:6:5-7:1
Tests run: 3,  Failures: 3,  Errors: 0
```

The functional-method branch, before the edit, on the base build with the repair round's tests (`bash explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests ... InheritedFunctionalMethodStaticParamSameName.test`, ProjectFortress/src at 493b4076f):

```
    Invalid overloading of gen in trait Pair:
     [\G extends Object\](Pair[\R\], Pair[\R\], Pair[\R\]->G)->G @ ProjectFortress/compiler_tests/InheritedFunctionalMethodStaticParamSameName.fss:8:3-59
 and [\R extends Object\](Gen[\Pair[\R\]\], Pair[\R\], Pair[\R\]->R)->R @ ProjectFortress/compiler_tests/InheritedFunctionalMethodStaticParamSameName.fss:5:3-43
Tests run: 1,  Failures: 1,  Errors: 0
```

`InheritedFunctionalMethodStaticParamSameName` is a `typecheck` test (`FileTests.java:1044-1046`, as `compiler_tests/VarianceTest.test` is), so it asserts the checker's verdict without reaching code generation, where the program stops on row 565's defect at the head as its renamed copy does on both trees (`SKEPTIC.md:131-150`).

The fix gives the same verdicts as the triage's renamed copy in both branches. The dotted copy (`CapDottedRenamed.fss`, `Gen`'s `R` spelled `Q`) compiles and prints `ok` on the base; the test's program compiles and prints `PASS` on the edit. The functional-method copy `SkCapFmGenRenamed` passes the checker on the base and the head, as `SkCapFmGen` now does.

On the library the fix clears 22 distance sites, not the 19 the record read:
- `generate` 7, `map` 9 and `ivmap` 3 in the reduction pairs;
- `cross` 3 in `SimpleMappedSeqGenerator`, `SimpleNestedSeqGenerator` and `SimplePairSeqGenerator`. Their `[\F\](SequentialGenerator[\F\], Generator[\F\])` is `SequentialGenerator.cross[\F\]` (`Library/FortressLibrary.fss:1319`), captured by those traits' own `F`.

Section 4 of the record gives "the generators that declare `cross` and `nest`" to rung M; their `cross` sites are this capture (section 11).

The same capture is in the abstract-method checker, which this rung may not edit. `object P[\R\](x: R) extends Pair[\R\]`, implementing `gen[\G\](f: Pair[\R\] -> G): G`, is refused: "The inherited abstract method gen[\R extends Object\](f:E->R):R from the trait Gen[\Pair[\R\]\] has no concrete implementation in the object P" (`bin/fortress compile CapAbstract.fss` on the edit). The landed per-site list holds the library's case (`abstract-method generate`, `FortressLibrary.fss:3024`, `NoReductionPair`). Walk prints `PASS` on the test's program. Home 2: `XXXInheritedAbstractMethodStaticParamSameName`, row 563.

## 7. The memo (a decision)

The memo answered "valid" for a pair of declarations (base key `:452`) whatever arrows, other declarations and kind environment the pair was checked under. The top-level check runs first in every unit. So a pair the top level accepts is reused in every trait that provides it, whenever the two lists happen to order the pair alike.

Measured on the base:
- The first pass's `MemoBetween2.fss`, a trait `M extends { S, T } comprises { V }` between two closed traits whose `choose` the listed type `V` covers, with `T` declared before `S`: `bin/fortress compile` printed no error, twice, with the memo on, and "Invalid overloading of choose in trait M" with `-Dfortress.analyzer.overload.cache=false`. With `S` declared first, it is refused both ways.
- On the library, the count stage on the base gave "has 57 errors." with the memo on and "has 59 errors." with it off: the two capture sites in `NoReductionPair` and `PossibleReductionPair` were hidden. The runs took 126.9 s and 124.2 s.
- Through the harness on the base, the memo's hit shows: `XXXFunctionalMethodMeetJoinOfClosedTraits`, the first skeptic's `XXXSkBetween` (`SKEPTIC.md:96-124`) with its component renamed, `Left comprises { Mid, Both }`, `Right comprises { Both, Other }`, `Mid extends Left excludes Other`, `Join extends { Left, Right } comprises { Both }` and `Both extends Join` declaring its own `side`, fails with no error printed, so its compile was clean and the memo hid the refusal (`FileTests.java:383-398`):

```
########## [base] fortress junit XXXFunctionalMethodMeetJoinOfClosedTraits.test
. compile ProjectFortress/compiler_tests/XXXFunctionalMethodMeetJoinOfClosedTraits 
 Saw failure, but did not satisfy compile_err_contains; expected
Invalid overloading of side in trait Join
Tests run: 1,  Failures: 1,  Errors: 0
```

(`bash explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests <the six .test files>`, ProjectFortress/src at 493b4076f, the tests of `35c7f177d`.) The first skeptic's copy failed three runs of three on `573381500`. The hit depends on hash-set order, which depends on the JVM's history, so the gate's whole-suite JVM may differ on the base; on the head the verdict no longer depends on the order.

Ways considered:
- (a) Delete the memo and its switch.
- (b) Key it on the pair and the trait or object it is checked in. That never hits, since a context checks each pair once.
- (c) Key it on everything the answer reads. Taken.

(c) keeps the team's switch meaningful, and keeps the reuse it was written for: a pair inherited unchanged by many types without static parameters. A hit is the same computation. The memo's measured benefit was nil (above), so (a) would have cost nothing either; (c) keeps the gate's flag meaning what it says.

**The evidence.**
- `XXXFunctionalMethodMeetJoinOfClosedTraits` fails on the base and passes at the head ("Saw expected failure", section 16).
- `XXXFunctionalMethodMeetBetweenTraits`, the first pass's program of the same shape, is the head's guard: on the base it passes in the harness's JVM, so it does not show the defect, but on the edit it is refused in all four declaration orders of its probe, with the memo on and off, and after `CoverageReturnGood.test` in one JVM in both orders (`ONE_JVM=1 junit.sh row547 ... CoverageReturnGood.test XXXFunctionalMethodMeetBetweenTraits.test`: "Saw expected failure", "OK (4 tests)").
- The count stage after the first pass's edit gave 89 with the memo on and off, with identical output once sorted and stripped of timings (`run-memo-on.sh`, a copy of `explorations/coordinator/tools/checker-count/run.sh` with `OVERLOAD_CACHE=true`). The repair round's edit does not touch the memo.
- **Row 547.** The one-JVM run is row 547's shape: climb batch 7b's gather saw `SkFnBetween` accepted after `CoverageReturnGood` in one JVM. Row 547 is not this rung's and is not claimed: the memo is made per compilation unit (`StaticChecker.java:275`). The measurement is for the gather (section 11).

## 8. Row 557 and row 477

**Row 557.** The crashing pair is the top-level `IN(n: Numeric0, s: Str0)` against `R1`'s `IN(n: ZZ32, self)`:
- `OverloadingOracle.excludes` normalizes the meet `Str0 & R1`.
- `pExcInner`'s excludes-clause test reads `Str0`'s clause, which holds `Rg[\I\]` (the reciprocal entry of section 3).
- `pSub(R1, Rg[\I\])` then compares `ZZ32` with `I` in an environment without `I`.

The stack was read through a temporary catch, since removed: `TypeAnalyzer.scala:219` `staticParam` from `pSubInner`, `:258` `cmp`, `:268`, `:438` `cEC`, `:470`, `:476`, `normConjunct`, `TypeSchemaAnalyzer.meetED`, `OverloadingOracle.excludes`.

Variants on the base: no excludes clause, or `excludes { Numeric0 }`, compile; `excludes { Str0 }` crashes.

The caller now extends the environment with the named trait's own parameters that are not in scope. Read as rigid variables, `R1 <: Rg[\I\]` is false, and the exclusion is found the other way round, through `R1`'s inherited clause, which the symmetric check also reads (`:439`). Reading them as rigid variables can only miss an exclusion, never invent one.

After the crash, the program's verdict is today's check of the mixed family:
- the function and `R1`'s method exclude each other, since `R1` excludes `Str0`;
- `Rg`'s abstract method is not in a component's top-level set.

It compiles and runs: `3 IN R1` is true and `Five IN Word` false, as walk prints. A bounded two-parameter variant, inside an environment that is not empty (`trait Rk[\T extends Numeric0, I\] excludes { Str0 }`), compiles and prints `PASS` (`KindEnv2.fss`); the first skeptic's `SkKindEnvSub` agrees with walk.

**Row 477, the ways the tree offers.**
1. The world switch, as for `String` and `Exception`: `CHARACTER` not final, set in both `use...Libraries` methods; three lines. Taken.
2. A per-world name in `WellKnownNames`, read where the literal is typed (`Misc.scala:464`), a file this rung may not edit.
3. Rename the one library's `Char` to `Character`, or declare `Character` in it: a library edit, a stop.
4. Rename the compiler builtin's `Character`: an edit of the compiler's prelude, against "The library route.".

The shadow's measured fix was (1) (FACTS, "Crashes reach zero in the shadow"). `Shell.useCompilerLibraries` switches `WellKnownNames` before `Types` (`ProjectFortress/src/com/sun/fortress/Shell.java:375-376`, `:384-385`), so `fortressBuiltin()` already names the world's library when the name is made.

On the distance (section 10) the five crash rows are gone, and the bodies they hid add 6 errors:
- `assert` on two strings in `String.fss:325`, `:327`, `:329` and `:331`;
- `ZZ32->ZZ32` applied to an `RR64` in `FortressLibrary.fss:4309` and `:4325`, the bodies of `strToInt` and `strToFloat`.

`FortressBuiltin.fss:37-52` and `:585-697` add none. These errors are unmasked, not caused; none of them names `Char`.

## 9. The tests, failing on the base and passing on the edit

**The first pass's three.** Committed alone at `573381500` and run through the harness on the base before any edit (`bash explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests FunctionalMethodMeetPerProvider.test GenericTraitExcludesKindEnv.test InheritedMethodStaticParamSameName.test`, tree 493b4076f with the tests):

```
    Invalid overloading of toSeq in component FunctionalMethodMeetPerProvider:
     AsFilt->String @ ProjectFortress/compiler_tests/FunctionalMethodMeetPerProvider.fss:9:5-32
Tests run: 3,  Failures: 3,  Errors: 0
I is not in the kind env [][][]
Tests run: 3,  Failures: 3,  Errors: 0
```

The capture's lines are quoted in section 6. On the first pass's edit (`junit.sh head ...` with the same three files, tree `fff55e16b`):

```
. run ProjectFortress/compiler_tests/FunctionalMethodMeetPerProvider (393ms) PASS
. run ProjectFortress/compiler_tests/GenericTraitExcludesKindEnv (429ms) PASS
. run ProjectFortress/compiler_tests/InheritedMethodStaticParamSameName (703ms) PASS
```

each "OK (3 tests)". The two promoted files are `git mv`s of rows 556's and 557's expected failures, made into run tests that assert the answer and print `PASS`.

**The repair round's six and their api**, committed alone at `35c7f177d`, each seen failing before the edit that repairs it (section 16 quotes the runs):

| test | what it holds | pre-repair head (`ba76e68ce`, code of `bf759afcb`) | base (src at 493b4076f) | repair (`0a3350fa2`) |
|---|---|---|---|---|
| `XXXFunctionalMethodMeetInheritedFromApi` (+ `FunctionalMethodPairApi.fsi`/`.fss`) | finding 1: refused "in trait Z" | fails: clean compile, "did not satisfy compile_err_contains" | fails: refused "in API FunctionalMethodPairApi" | "Saw expected failure" |
| `FunctionalMethodMeetInheritedFromApi` | finding 1's positive control | PASS | fails: the api refused | PASS |
| `FunctionalMethodMeetSelfSecond` | finding 2: `pick` and `IN`, self second, meet declared | fails: "Invalid overloading of pick in trait C", "... of IN in trait C" | fails: refused at both levels | PASS |
| `XXXFunctionalMethodMeetSelfSecondNoMeet` | finding 2's guard: no meet, self second | "Saw expected failure" | "Saw expected failure" | "Saw expected failure" |
| `XXXFunctionalMethodMeetJoinOfClosedTraits` | the memo | "Saw expected failure" | fails: clean compile | "Saw expected failure" |
| `InheritedFunctionalMethodStaticParamSameName` | the capture's functional-method branch (`typecheck`) | OK | fails: "Invalid overloading of gen in trait Pair" | OK |

**One expected failure added after the edit**, `XXXFunctionalMethodMeetObjectExpression` (row 570, home 2; `compile`, `compile_exception_contains=emitDesc of type AND(A,B) failed`), committed at `8d5652367`: on the repair "OK Saw expected exception", "OK (1 test)"; on the base, where the checker refuses the program first, red: "Invalid overloading of pick in component XXXFunctionalMethodMeetObjectExpression", "Saw failure, but did not satisfy compile_exception_contains", "Tests run: 1,  Failures: 1" (`bash tmp/rung-overloading-checker/repair/oe-base.sh`, the base built and then the head rebuilt). It goes red the day the checker refuses the program or code generation passes it.

The expected failures the first pass added (section 13) were run through the harness on its edit (`junit.sh xxx ...`):
- each gave "Saw expected failure" and "OK (1 test)", and each link test "OK (1 test)";
- `XXXGenericTraitFunctionalMethodOverride` uses `compile_exception_contains`, since the harness reads the code generator's `ZipException` on its exception channel ("OK Saw expected exception");
- the first of them, `XXXInheritedAbstractMethodStaticParamSameName`, went red on a deliberate local fix, the object's parameter renamed `T` (`junit.sh xxx-localfix ...`: "Saw failure, but did not satisfy compile_err_contains", "Tests run: 1,  Failures: 1,  Errors: 0"); the file was restored.

The walk test `ProjectFortress/tests/XXXGenericTraitGenericFunctionalMethodWalk.fss` was run with `bash explorations/compile-ladder/rung-inference-walk/harness-one.sh <scratch> ProjectFortress/tests/XXXGenericTraitGenericFunctionalMethodWalk.fss`: "OK Saw expected exception", "OK (1 test)". On a deliberate local fix, the method's own static parameter dropped, it went red: "Missing expected failure", "Tests run: 1,  Failures: 1,  Errors: 0". The file was restored. It sits in `ProjectFortress/tests/`, which section 4 of the record gives to rungs Q and M; it is a new, distinct file, which moves the `testSystem` shards (the shared prefix), and a decision of the first pass's on the three-homes rule.

## 10. The ladder, the checker count and the distance

**The ladder subset.** `explorations/compile-ladder/repair-r1-atomic-static/run-subset.sh` was copied into `tmp/rung-overloading-checker/ladder/` with its own root, and run once after each code state. The subset:
- the 17 of the gate's 85 passing files that declare a functional method, an excludes clause or a character literal. They compile and run, with outputs byte-identical to the baseline's recorded outputs (`explorations/compile-ladder/baseline-2026-09-19/raw/tests/`);
- the three files whose recorded first error is about overloading (`XXXGenericOverload`, `XXXGenericOverload2`, `wrongOverload`). They end as recorded: "FAIL: should have failed in generic overloading of f", "Unable to read serialized data for XXXGenericOverload2...", "Not in the trait table: CompilerLibrary.Array2".

On the repair (`LADDER_ROOT=tmp/rung-overloading-checker/ladder/root bash tmp/rung-overloading-checker/ladder/run-subset.sh`, code of `0a3350fa2`): the return codes are those of the first pass, the 17 run outputs are byte-identical to the baseline's, and every compile and run output is byte-identical to the first pass's. No file's first error names a name of this rung, which adds none to the library.

**Before:** climb batch 7b's tables (`explorations/compile-ladder/climb-batch-7b/gate/checker-count.txt`, `distance.txt`) and the per-site list `explorations/compile-ladder/gate/distance-sites.tsv`, all landed at `b0eb41516`. `git log b0eb41516..493b4076f -- Library/ ProjectFortress/src/ ProjectFortress/LibraryBuiltin/` prints nothing, so the stages were not run on the base. Each stage was run once after each of the two code states.

**The checker count** (`explorations/coordinator/tools/checker-count/run.sh`, memo off), each error counted twice by api:

| api | before (7b) | first pass | repair |
|---|---|---|---|
| `FortressLibrary` | 106 | 54 | 54 |
| `RangeInternals` | 12 | 120 | 108 |
| `String` | 0 | 6 | 6 |
| `FortressBuiltin` | 0 | 4 | 4 |
| `FlatString` | 0 | 2 | 2 |
| **total** | **59** | **89** | **83** |

`#crash none`, `#shadow matches the tracked StaticChecker` in both. From the first pass to the repair the count loses six per-provider `IN` errors in `RangeInternals`, those of the "cleared" list below, and gains none. With the memo on, the first pass gave 89, the same output.

**The distance** (`explorations/coordinator/tools/distance/run.sh`, setting `any`, 938 s on the repair): 598 to 568 on the first pass, 607 on the repair; `#shadow every shadow edit matched the tracked sources`.

| row | before (7b) | first pass | repair |
|---|---|---|---|
| total | 598 | 568 | 607 |
| overloading | 123 | 87 | 125 |
| return type | 29 | 30 | 30 |
| typecheck | 386 | 391 | 392 |
| class L1, the static-parameter sentence's families | 20 | 0 | 0 |
| class M1, the Meet Rule | 103 | 87 | 125 |
| class R3, other declared-type slips | 27 | 28 | 28 |
| class BR, big operators' bodies | 10 | 9 | 10 |
| class OT, other body errors | 141 | 147 | 147 |
| api FortressLibrary | 53 | 24 | 24 |
| api RangeInternals | 6 | 60 | 54 |
| api String, FlatString, FortressBuiltin | 0, 0, 0 | 3, 1, 1 | 3, 1, 1 |
| component FortressLibrary | 355 | 292 | 293 |
| component RangeInternals | 73 | 72 | 114 |
| component String | 67 | 71 | 73 |

**Site by site against the before** (the landed per-site list against the repair's `errors.tsv`, keyed on kind, unit, location and message): 103 sites gone, 112 new.
- **Gone by the rule for functional methods, 78**, every one a top-level pair of two functional methods (20 of them class L1, 58 class M1): `FORWARD_CMP` 38 (api 19, component 19), `IN` 29 (component `FortressLibrary` 20, api 7, `RangeInternals` api and component 1 each), `seq` 10 (component 7, api 3), `SQCAP` 1 (api).
- **Gone by the capture, 22, class M1:** `generate` 7, `map` 9 and `ivmap` 3 in `NoReductionPair`, `PossibleReductionPair`, `SomeReductionPair` and `ReductionPair`; `cross` 3 (section 6).
- **New by the per-provider check in the apis, 58, class M1:** pairs a type of the api provides together, without a declaration on their meet, that no check had read:
  - `RangeInternals`, 49: `CAP` 32 (`BoundedRange`'s `opr CAP(self, other: Range[\I\])`, `Library/FortressLibrary.fsi:2178`, beside `ScalarRange`'s, `Library/RangeInternals.fsi:46`, or `Range2D`'s and `Range3D`'s two each, in the range types below them), and `IN` 17 (`Generator`'s `opr IN(x: E, self)`, `FortressLibrary.fsi:781`, `OpenRange`'s, `:2153`, or `ExtentRange`'s, `:2170`, beside `Range`'s, `:2132`, or `Range2D`'s and `Range3D`'s, `RangeInternals.fsi:65`, `:96`). Seven of the `IN` sites are found in the component too (below).
  - `FortressLibrary`, 5: `IN` in `FullRange`, `CompactFullRange` and `StridedFullRange` (`Generator`'s beside `Range`'s); `String`'s juxtaposition pair in `String`; `SQCAP` in `Just`, P2's "`SQCAP` on `Just`", moved from the api's top level to its provider.
  - `String`, 3, and `FlatString`, 1: `String`'s juxtaposition pair, `opr juxtaposition(a: Any, self)` at `FortressLibrary.fsi:2419` beside `opr juxtaposition(self, b: Any)` at `:2421`, in `CatString`, `EmptyString`, `SubString` and `FlatString`; found in the component too. Its self parameters are at different positions, so no declaration on the meet repairs it (`overloading.tex:518-523`); it is rung M's "String's own juxtaposition pair".
- **New by the per-provider check in the components, 44, class M1** (the repair's reading of api-inherited declarations; section 11's list for Pavol): 42 in `RangeInternals` and 2 in `String`, listed below with each type and pair.
- **New in class R3, 1:** `unsigned`'s slip (`FortressLibrary.fsi:466` against `:556`). It was already a site at the api's top level, and is now also found in its provider `ZZ32`, under the unit `api FortressBuiltin+api FortressLibrary+component FortressBuiltin`. Record section 4 gives `unsigned` to rung Q.
- **New, unmasked by the `Character` fix, 6, class OT:** section 8.
- **Moved within class BR, 3 gone and 3 new**, at sites no edit of this rung touches: `FortressLibrary.fss:1572`, `:3234` and `:3371` gone, `:130`, `:1557` and `:3271` new, and `BIG ||` at `:306` and `:316` respelled. This is the variation of the BR family that FACTS records ("The true distance to the switch-over": BR, V2 and O1 move between setups, and under edits that touch none of their declarations); the first pass's run and the repair's differ in it too. Not attributed.
- **Crash rows:** the five `Character` rows are gone (`distance.txt:51-55` of the before). The other four are unchanged: `FortressLibrary.fss:1247`, `:2430`, `:2803`, and `Stream`'s variance stage.
- No "There are multiple declarations of ... with the same parameter type" error appears in either run.

**Against the first pass** (568 to 607): 22 sites gone, 61 new.
- **Cleared by the meet compared without self, 6:** `IN`, `Generator`'s beside `Range`'s, in `CompactFullScalarRange`, `CompactFullParScalarRange`, `CompactFullSeqScalarRange`, `StridedFullScalarRange`, `StridedFullParScalarRange` and `StridedFullSeqScalarRange`. `CompactFullScalarRange` and `StridedFullScalarRange` declare their own `opr IN(n: ZZ32, self)` (`Library/RangeInternals.fsi:400`, `:475`), which the others inherit: the meet, with self second. Valid by the text; the first pass refused them by finding 2.
- **Relabelled, 12 gone and 12 new, the same site now also found in the component:** `IN` 7 (`FullScalarRange`, `CompactFullRange2D`, `CompactFullRange3D`, `FullRange2D`, `FullRange3D`, `StridedFullRange2D`, `StridedFullRange3D`; the unit `api RangeInternals` becomes `api RangeInternals+component RangeInternals`), juxtaposition 4 (`CatString`, `EmptyString`, `SubString` in `String`, and `FlatString`), and `unsigned`'s return type 1.
- **New in the components, 44:** below.
- **BR, 4 gone and 5 new:** the variation above.

**The new per-provider sites in components, with each type and pair.** In every case both declarations are provided by the type, neither parameter type is below the other, they are not incompatible, their self parameters are at one position but for `String`'s pair, and the type provides no declaration on their meet.
- `RangeInternals`, `CAP` (written `INTERSECTION` in the component), 32:
  - `BoundedRange[\ZZ32\]`'s `opr CAP(self, other: Range[\I\])` (`FortressLibrary.fsi:2178`) beside `ScalarRange`'s `opr INTERSECTION(self, other: Range[\ZZ32\])` (`Library/RangeInternals.fss:149`), in `BoundedScalarRange`, `ScalarRangeWithLeft`, `LeftScalarRange`, `ScalarRangeWithRight`, `RightScalarRange`, `FullScalarRange`, `CompactFullScalarRange`, `CompactFullParScalarRange`, `CompactFullSeqScalarRange`, `StridedFullScalarRange`, `StridedFullParScalarRange` and `StridedFullSeqScalarRange`, 12. `BoundedScalarRange` declares `opr INTERSECTION(self, other: ScalarRange)` (`RangeInternals.fss:491`), whose other parameter is narrower than the meet's `Range[\ZZ32\]`; the others declare none.
  - `BoundedRange`'s beside `Range2D`'s two, `other: Range[\(ZZ32,ZZ32)\]` and `other: Range2D` (`RangeInternals.fss:180`, `:182`), in `CompactFullRange2D`, `FullRange2D`, `LeftRange2D`, `RightRange2D` and `StridedFullRange2D`, 10; and beside `Range3D`'s two (`:239`, `:241`) in the five 3D types, 10. None declares `INTERSECTION`.
- `RangeInternals`, `IN`, 10:
  - `Generator`'s `opr IN(x: E, self)` (`FortressLibrary.fsi:781`) beside `Range2D`'s `opr IN(n:(ZZ32,ZZ32), self)` (`RangeInternals.fss:185`) in `CompactFullRange2D`, `FullRange2D` and `StridedFullRange2D`, and beside `Range3D`'s (`:245`) in the three 3D types, 6;
  - `OpenRange`'s (`FortressLibrary.fsi:2153`) and `ExtentRange`'s (`:2170`) beside `Range2D`'s or `Range3D`'s in `OpenRange2D`, `OpenRange3D`, `ExtentRange2D` and `ExtentRange3D`, 4.
  - None of these types declares `IN`; `Range2D`'s own is not below `Generator`'s, whose self type `Range2D` does not extend.
- `String`, juxtaposition, 2: `String`'s pair (`FortressLibrary.fsi:2419`, `:2421`) in `Concatenable` and `Balanceable` (`Library/String.fss:33`, `:41`), self parameters at different positions.

These 42 `RangeInternals` sites are the component's copies of 42 of the api's: the same type and the same pair, with the component's own declaration of `ScalarRange`, `Range2D` or `Range3D` in place of the api's. The component declares those three traits with bodies, so the top-level set's convention reads them, and the type in the component provides both declarations as the type in the api does.

**The per-provider `IN` sites with self second.** Of the first skeptic's 26 (`SKEPTIC.md:33-64`), the meet compared without self clears 6 (above) and keeps 20: 17 in `api RangeInternals` (7 of them found in the component too) and 3 in `api FortressLibrary`. The components add 10. In each kept site the type declares no `IN` of its own, so each is a pair a declaration on the meet now clears, of rung M's kind.

## 11. Points for Pavol

- **Row 556's rule as built** (section 5). The top level accepts two functional methods at one self position; the per-provider check reads, in an api, every functional method and, in a component, every one with a body and every one inherited from an api, and it compares the meet without the self parameter wherever it sits. Against climb batch 7b's distance: 78 top-level sites and 22 captured sites go; 58 per-provider sites appear in the apis and 44 in the components (section 10 names each type and pair). By family: `CAP` 64 (32 api, 32 component, all `RangeInternals`), `IN` 30 (20 api, of them 7 found in the component too, and 10 component only), `String`'s juxtaposition 7, `SQCAP` 1. The `CAP` and `IN` pairs each want a declaration on the meet in the type that provides both, of rung M's kind, or a decision on what the library's range types provide; `String`'s juxtaposition pair has its self parameters at different positions and needs the Subtype or the Incompatibility Rule instead (rung M's).
- **A component's own abstract declarations** (the judge's decision 1, `JUDGE.md:101-109`). In a component the per-provider check reads declarations with bodies and every declaration inherited from an api, the top-level set's own convention (`OverloadingChecker.scala:80-88`). It leaves a component's own abstract declarations unread, as 2012 did, although the text's "provides" includes them (`Specification/basic/traits.tex:528-529`). Alternatives: read every declaration, which would show each api's per-provider sites again in the component that implements it; read bodies only, the first pass's, under which `SkFmUse` compiled and ran `Fa`'s declaration for an `Fb`-typed call. The decision's premise, that a component's own abstract pairs are pairs an object must implement anyway, where its own declaration is the meet, does not hold (the second skeptic's finding B, added at the gather): an object may implement an inherited abstract functional method by a concrete one inherited from another trait, which the compiled checkers accept with no meet (`SkAbsConc`, base and head; `scala_src/typechecker/AbstractMethodChecker.scala:90-103`), against `Specification/basic/traits.tex:571` and the Meet Rule, so such a pair is read by no check and runs (row 572). The ways: read a component's own abstract functional methods per provider, as the dotted check reads abstract dotted methods (`OverloadingChecker.scala:169-171`), at the cost above; make the abstract-method checker require the object's own declaration where the concrete one it inherits is another trait's; or leave it, with row 572.
- **The self parameter in the per-provider meet** (the judge's decision 2, `JUDGE.md:110`). Compared as the dotted rule's receiver is (`Specification/advanced/overloading.tex:417-446`; `traits.tex:520-527`), wherever it sits; until now it was compared correctly only when self was first (`TypeSchemaAnalyzer.scala:67-72`, through `OverloadingChecker.scala:516` at the base). It clears six of the library's per-provider `IN` sites and makes the other twenty clearable by a declaration on the meet. The alternative, computing in `allMethods` what a type does not inherit, needs rung I's `STypesUtil.scala`.
- **Object expressions** (row 570, home 2; a stop of this run met). The per-provider check never visits an object expression (`OverloadingChecker.scala:331`), so a pair of functional methods that only an object expression provides together, refused by the base's top-level function rule, now passes the checker; code generation stops on every object expression first (row 375), so no compiled program runs with the ambiguity today. The team's plan, lifting object expressions into named top-level objects (`AbstractMethodChecker.scala:125`, `:135`; `Shell.getObjExprDesugaring()`, row 375), would bring them under the per-provider check. `XXXFunctionalMethodMeetObjectExpression` goes red when either moves.
- **Row 546.** Its functional-method program is now accepted by the Meet Rule for Functional Methods and dies at run time (row 566). Its expected failure became a run test. The coverage of a generic family stays refused for functions, in `XXXComprisesMeetGenericFunctions`. The record asked that row 546's expected failure keep its verdict.
- **Row 547.** After the memo was rekeyed, the between-traits refusal holds after `CoverageReturnGood` in one JVM, in both orders. The memo, whose hits depended on hash-set order, is the candidate for the state the row saw carried. Not claimed.
- **`cross`.** The `cross` sites in the three sequential generators that section 4 gives rung M are the capture this rung fixes.
- **`Character` and `Char`.** The text calls a character literal's type `Character` (`literals.tex:40`); the one library calls it `Char` (`FortressBuiltin.fsi:207`). The checker follows the library.
- **`Types.REGION`** names a type of one world only (row 477's note). Left.

## 12. Stops

- **Met: "A compiled test whose verdict changes other than by this rung's intent"**, read with the section's list of what must keep its verdict, which names the expected failures of rows 543 and 546. `XXXComprisesMeetGenericTrait`'s verdict changed under the rule for functional methods. That is the rung's intent, but it goes against the record's expectation for row 546 (section 5). Reversible; finished as described.
- **Met at `10d1e672b` and repaired at `0a3350fa2`: "The Meet Rule dropped for a type that provides both functional methods", a component's type inheriting both from an api.** The first pass's per-provider check read no declaration a component's type inherits from an api, so `SkFmUse`, refused on the base, compiled and ran (`SKEPTIC.md:7-31`). The repair reads them (section 5): `SkFmUse`, `SkFmUse2` and `SkFmUse3` are refused "in trait Z", and `XXXFunctionalMethodMeetInheritedFromApi` holds it. Listed as met, since a pushed commit of the branch met it.
- **Met, and not repaired: "The Meet Rule dropped for a type that provides both functional methods", an object expression.** `XXXFunctionalMethodMeetObjectExpression` was refused at the top level on the base and passes the checker since `10d1e672b` (section 5); home 2, row 570. Reversible (POSITIONS, "Reversible stops do not hold a batch."); listed for Pavol.
- **Not met:**
  - no change to answer 9's positional or return-type rule (`satisfiesReturnTypeRule`, `satisfiesPositionalRule` and `returnTypeCheck` untouched), or to batch 7b's coverage check (`coverageRule` and `coversOverlap` untouched); the top level now runs `returnTypeCheck` on pairs of functional methods it accepts, which is answer 9's rule applied to more pairs, not changed;
  - a function beside a functional method keeps today's check (the first skeptic's `SkMixedTop` is refused the same on the base, the first pass and the repair);
  - no library edit;
  - no file that section 4 names as rung I's: in `TypeAnalyzer.scala` this rung edits `pExcInner` and adds a private `withClauseParams`, not a solver declaration.

## 13. Defects measured, and their homes

- **Row 556,** the function rule applied to functional methods: home 1, `ProjectFortress/compiler_tests/FunctionalMethodMeetPerProvider.fss` (self first) and `FunctionalMethodMeetSelfSecond.fss` (self second).
- **A component's type that inherits two functional methods from apis checked by no rule** (row 568, provisional; the first skeptic's finding 1; widened by the first pass, older than it in its two-api form): repaired, home 1: `XXXFunctionalMethodMeetInheritedFromApi.fss`, refused "in trait Z", with the positive control `FunctionalMethodMeetInheritedFromApi.fss` and the api `FunctionalMethodPairApi.fsi`/`.fss`.
- **The per-provider meet compared without the domain's first element, wrong when self is not first** (row 569, provisional; finding 2; older than the rung): repaired, home 1: `FunctionalMethodMeetSelfSecond.fss`, with the guard `XXXFunctionalMethodMeetSelfSecondNoMeet.fss`.
- **An object expression checked per provider by no rule** (row 570, provisional; found in the repair round; opened by the rung's top-level relaxation): home 2, `XXXFunctionalMethodMeetObjectExpression.fss`, keyed on today's code-generation stop (row 375). Not repaired: the checker has no name for an object expression's type, as the team records, and the specification's answer is a refusal no compiled program can reach past row 375.
- **Row 557,** the kind environment under a generic excludes clause: home 1, `GenericTraitExcludesKindEnv.fss`.
- **The capture in the overloading checker** (row 561, provisional): home 1, `InheritedMethodStaticParamSameName.fss` (the dotted branch) and `InheritedFunctionalMethodStaticParamSameName.fss` (the functional-method branch, a `typecheck` test).
- **The memo answering across contexts** (row 562, provisional): home 1, `XXXFunctionalMethodMeetJoinOfClosedTraits.fss`, which fails on the base through the harness (section 7) and passes on the edit; `XXXFunctionalMethodMeetBetweenTraits.fss` guards the head.
- **Row 477:** repaired. No program compiles against the one library, so its home is the distance stage's crash rows: five gone.
- **The capture in the abstract-method checker** (row 563, provisional): home 2, `XXXInheritedAbstractMethodStaticParamSameName.fss`, `compile_err_contains=has no concrete implementation`.
- **A generic functional method of a trait with static parameters, called on an object** (row 564, provisional): it compiles and dies at run time, `NoSuchFieldError: Class GfmA?$\=gen?fortress\|CompilerBuiltin\%String??... does not have member field ...`. Home 2: `XXXGenericTraitGenericFunctionalMethod.fss`, with `GenericTraitGenericFunctionalMethodLink.test` and an `XXX` run test, `run_out_contains=REACHED`.
- **Such a method overridden in a generic subtrait** (row 565, provisional): the code generator writes one wrapper class twice, `java.util.zip.ZipException: duplicate entry: ...$gen...`. Home 2: `XXXGenericTraitFunctionalMethodOverride.fss`, `compile_exception_contains=duplicate entry`.
- **Row 546's functional-method program at run time** (row 566, provisional): `ClassCastException` in the dispatch among `S`'s, `T`'s and `V`'s `tag`. Home 2: `XXXComprisesMeetGenericTrait.test` (run), with `ComprisesMeetGenericTraitLink.test`.
- **The coverage check's refusal of a closed family with static parameters written as functions** (row 546's subject): home 2, `XXXComprisesMeetGenericFunctions.fss`.
- **A valid meet with self not first dies at class load** (row 571, the second skeptic's finding A, reached since this rung: the base refused the program): an object declaring the meet of two inherited functional methods whose self parameter is second of three, narrower than each in a different parameter, gives "ClassFormatError: Duplicate method name \"pick?1\"". Home 2, added at the gather beside rows 564 to 566: `XXXFunctionalMethodMeetNarrowedSelfNotFirst.fss` with `FunctionalMethodMeetNarrowedSelfNotFirstLink.test` (link) and `XXXFunctionalMethodMeetNarrowedSelfNotFirst.test` (run, `run_out_does_not_contain=REACHED`).
- **A functional method with self last, overloaded in an object, casts an argument to the wrong type** (row 573, the second skeptic's finding C, older than this rung): `ClassCastException` on the call whose one applicable declaration is `C0`. Home 2, added at the gather: `XXXFunctionalMethodOverloadSelfLast.fss` with `FunctionalMethodOverloadSelfLastLink.test` (link) and `XXXFunctionalMethodOverloadSelfLast.test` (run, `run_out_contains=REACHED`).
- **An object that inherits an abstract and a concrete functional method of one name from two traits, declaring none, runs the concrete one** (row 572, the second skeptic's finding B, older than this rung): the row alone, as row 487's, since no `XXX` compile test can hold an over-acceptance.
- **The duplicate-declaration message names the self type for a functional method whose self is not first** (row 574, older than this rung): the specification is silent on messages, so the row alone, quoting the two lines.
- **Walk on a generic functional method of a trait with static parameters,** "Missing type R" (row 567, provisional): home 2, `ProjectFortress/tests/XXXGenericTraitGenericFunctionalMethodWalk.fss`. The override form fails the same way, "Missing type G".
- **The per-provider pairs of the one library** (58 in the apis, 44 in the components): library defects by the text, held by the distance stage like every library error; listed for Pavol.
- **The compiler library's `assert` has no (Boolean, Boolean, String) overload**, met while writing `FunctionalMethodMeetSelfSecond` (section 16): a gap of the bootstrap library that the switch-over deletes; the one library's `assert` takes `(Any, Any, (Any...))`. No home: no declaration goes into the prelude (POSITIONS, "The library route.").

## 14. Names grepped

The rung adds no library name.
- Its test components and api (`FunctionalMethodMeetPerProvider`, `GenericTraitExcludesKindEnv`, `InheritedMethodStaticParamSameName`, `XXXInheritedAbstractMethodStaticParamSameName`, `XXXComprisesMeetGenericFunctions`, `XXXGenericTraitGenericFunctionalMethod`, `XXXGenericTraitFunctionalMethodOverride`, `XXXFunctionalMethodMeetBetweenTraits`, `XXXGenericTraitGenericFunctionalMethodWalk`, and the repair round's `FunctionalMethodPairApi`, `XXXFunctionalMethodMeetInheritedFromApi`, `FunctionalMethodMeetInheritedFromApi`, `FunctionalMethodMeetSelfSecond`, `XXXFunctionalMethodMeetSelfSecondNoMeet`, `XXXFunctionalMethodMeetJoinOfClosedTraits`, `InheritedFunctionalMethodStaticParamSameName`, `XXXFunctionalMethodMeetObjectExpression`) are each declared once across `ProjectFortress/tests/` and every `*_tests/` directory, the api once as an api and once as its component.
- The Scala names it adds (`ownStaticParamsApart`, `functionalMethodsAtOnePosition`, `staticParamsInScope`, `declaredInUnit`, `withoutSelf`, `withClauseParams`) occur only in the two files that define them, over the whole of `ProjectFortress/src/com/sun/fortress/`.

## 15. The harness

The harness refused the Write of this file in the first pass and again in the repair round ("Subagents should return findings as text, not write report files"), so this report is carried in the structured result for the gather. `record.md` was written and is on the branch (`027efdeb3`).

## 16. The repair round

**Inherited.** The branch carried the first pass's commits (`573381500` the tests alone, `bf759afcb` the edit, `fff55e16b` and `10d1e672b` the expected failures), the first skeptic's `SKEPTIC.md` (`aaeaed9a2`) and the judge's `JUDGE.md` (`ba76e68ce`). The build held `bf759afcb`'s code: `git diff bf759afcb HEAD -- ProjectFortress/src` was empty, the skeptic's `rebuild-head2.log` was the newest build log and ended in `EXIT=0`, and `OverloadingChecker.class` was newer than its `rebuild-base2.log`. The first pass's runs whose code did not change were read, not repeated: its harness runs of section 9 and its count with the memo on. What the repair's edit can move was run again: the rung's tests, the tracks, the ladder subset, the count and the distance.

**The tests first.** The six tests and the api (section 9) were written by the judge's instructions, each named by its topic, with one comment line, and with assert messages that cite `overloading.tex`, section "Meet Rule". One deviation: `FunctionalMethodMeetSelfSecond`'s first draft asserted `assert(3 IN C, true, "...")`, which the compiler library cannot check ("Could not check call to function assert ... (Boolean, Boolean, String)": its `assert` has no Boolean-comparing overload with a message); the assertion compares `if 3 IN C then "in" else "out" end` with `"in"` instead, and `IN` stays in the test (the judge's fallback for dropping `IN` applied only to a failure of `IN` itself).

On the pre-repair head (`bash explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh prerepair ProjectFortress/compiler_tests <the six>`, `ba76e68ce`, code of `bf759afcb`):

```
########## [prerepair] fortress junit XXXFunctionalMethodMeetInheritedFromApi.test
 Saw failure, but did not satisfy compile_err_contains; expected
Invalid overloading of pick in trait Z
Tests run: 1,  Failures: 1,  Errors: 0
########## [prerepair] fortress junit FunctionalMethodMeetSelfSecond.test
    Invalid overloading of pick in trait C:
    Invalid overloading of IN in trait C:
Tests run: 3,  Failures: 3,  Errors: 0
```

and `FunctionalMethodMeetInheritedFromApi` "OK (3 tests)", `XXXFunctionalMethodMeetSelfSecondNoMeet` and `XXXFunctionalMethodMeetJoinOfClosedTraits` "Saw expected failure", `InheritedFunctionalMethodStaticParamSameName` "OK (1 test)".

On the base (`git checkout 493b4076f -- ProjectFortress/src`, `ant compileAll`, `global.map` restored, the library-order rebuild, each library compile `rc=0`; then `junit.sh base ...` with the six): `XXXFunctionalMethodMeetJoinOfClosedTraits` and `InheritedFunctionalMethodStaticParamSameName` fail as quoted in sections 7 and 6; `XXXFunctionalMethodMeetInheritedFromApi` fails ("Invalid overloading of pick in API FunctionalMethodPairApi", "did not satisfy compile_err_contains"); `FunctionalMethodMeetInheritedFromApi` and `FunctionalMethodMeetSelfSecond` fail ("Tests run: 3,  Failures: 3"), refused in the api and at both levels; `XXXFunctionalMethodMeetSelfSecondNoMeet` "Saw expected failure". The source was restored with `git checkout HEAD -- ProjectFortress/src`, and the tests were committed alone at `35c7f177d`.

**The edit**, `0a3350fa2`, in `OverloadingChecker.scala` only: `toFunctionalMethodArrows`'s filter reads `!declaredInUnit(tt)` beside a body (`:139-141`, `declaredInUnit` at `:159-166`, the comment at `:131-134`), and `meetRule` asks `isMeet` of the arrows without the self parameter for a functional method in a provider (`:584-586`, `withoutSelf` at `:594-602`). `ant compileAll` "BUILD SUCCESSFUL", `global.map` restored, and the five library compiles each `rc=0` with no error, so neither of the judge's fallbacks was taken.

On the repair (`junit.sh repair ProjectFortress/compiler_tests <the six> FunctionalMethodMeetPerProvider.test GenericTraitExcludesKindEnv.test InheritedMethodStaticParamSameName.test XXXFunctionalMethodMeetBetweenTraits.test ComprisesMeetGenericTraitLink.test XXXComprisesMeetGenericTrait.test XXXComprisesMeetFunctionalMethodUncovered.test`, code of `0a3350fa2`):

```
########## [repair] fortress junit XXXFunctionalMethodMeetInheritedFromApi.test
    Invalid overloading of pick in trait Z:
 Saw expected failure
. run ProjectFortress/compiler_tests/FunctionalMethodMeetInheritedFromApi (440ms) PASS
. run ProjectFortress/compiler_tests/FunctionalMethodMeetSelfSecond (438ms) PASS
. typecheck ProjectFortress/compiler_tests/InheritedFunctionalMethodStaticParamSameName  OK (time = 2105ms)
```

`XXXFunctionalMethodMeetSelfSecondNoMeet`, `XXXFunctionalMethodMeetJoinOfClosedTraits`, `XXXFunctionalMethodMeetBetweenTraits` and `XXXComprisesMeetFunctionalMethodUncovered` "Saw expected failure"; `FunctionalMethodMeetPerProvider`, `GenericTraitExcludesKindEnv` and `InheritedMethodStaticParamSameName` "PASS", "OK (3 tests)"; `ComprisesMeetGenericTraitLink` "OK (1 test)" and `XXXComprisesMeetGenericTrait` "Saw expected failure (Exit code != 0)". Every one of the thirteen runs ended "OK".

**The tracks, once, on `0a3350fa2`** (`bash tmp/rung-overloading-checker/tracks/run.sh` after wiping its caches: each track in its own JVM with a private cache tree, `java -cp <classpath> junit.textui.TestRunner com.sun.fortress.tests.unit_tests.CompilerJUTest`, and the same for `LibraryJUTest`): "OK (983 tests)" and "OK (86 tests)". The first pass's were 973 and 86 on `fff55e16b`; climb batch 7b's gate had 959 and 86 (`explorations/compile-ladder/climb-batch-7b/gate/summary.txt:2-3`). The 24 new compiler cases are this rung's: 14 of the first pass's, 10 of the repair's. `XXXFunctionalMethodMeetObjectExpression`, the 25th, was added after the tracks with no code change and run by itself (section 9).

**The probes** (`bash tmp/rung-overloading-checker/repair/probes.sh repair`, compile then run, the first skeptic's programs): `SkFmUse2`, `SkFmUse` and `SkFmUse3` refused "Invalid overloading of pick in trait Z"; `SkSelfAtOne` and `SkSelfAtZero` run `C`, `A`; `SkInAtOne` runs `true`; `SkNoMeetSelfAtOne` and `SkNoMeetTwoParams` refused "Invalid overloading of pick in trait D"; `SkMixedTop` refused "Invalid overloading of tag in component SkMixedTop", as on the base; `SkUnrelatedOnly` runs `A B`. My own probes of object expressions on the repair: `OeTwo` (no meet), `OeTwoMeet` (the object expression declares its own `pick`) and `OeTwoDotted` (dotted methods) all pass the checker and stop in code generation, "emitDesc of type AND(A,B) failed"; walk prints `A`, `Z` and `A`. On the base `OeTwo` is refused "Invalid overloading of pick in component OeTwo".

**The ladder, the count and the distance**, once each on `0a3350fa2`: section 10.

**The citation the first skeptic questioned.** "`OverloadingChecker.scala:201` at the base" stands: at 493b4076f line 201 is `checkFunctionOverloading(kindAndName, f, set, globalOracle)` and line 200 the comment above it (`JUDGE.md:76`).
