# Rung C: the compiled checker's defects after batch 8, and its crash rows traced

*The row numbers are the final ones the gather of climb batch 10 assigned; the rung wrote provisional 610 to 616, which are rows 620 to 626.*

problem: `ProjectFortress/compiler_tests/XXXInheritedAbstractMethodStaticParamSameName.fss:10` (row 563), `XXXInferDependentBound.fss:20` (row 593), `XXXVarargsNoTrailingArgument.fss:7` (row 604), `XXXFieldBesideInheritedGetter.fss:10` (row 605), all at `9c9e823d5`; `explorations/compile-ladder/climb-batch-9/gate/distance.txt:43-46` (the four crash rows)
spec: `Specification/basic/traits.tex:567-572` (section "Method Declarations"); `Specification/basic/inference.tex:77-104` (section "The Static Arguments of a Call"); `Specification/basic/functions.tex:174-180`, `:228-301` (sections "Function Declarations", "Function Applications"); `Specification/basic/overloading.tex:246-287` (section "Applicability for Functionals with Varargs and Keyword Parameters"); `Specification/basic/objects.tex:336-345` (section "Field Declarations"); `Specification/basic/traits.tex:235-248` (section "Trait Declarations"); `Specification/basic/declarations.tex:570-572` (section "Reach and Scope of Declarations")
precedent: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:184-202` (`ownStaticParamsApart`, at `9c9e823d5`); `OverloadingChecker.scala:595-602` (`withoutSelf`); `ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:206-241` (`makeDomainType`, at `9c9e823d5`); `ProjectFortress/src/com/sun/fortress/compiler/Types.java:47-49`, `:99-101` (`makeVarargsParamType`, at `9c9e823d5`); `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala:154-260` (`checkDeclComprises`, `isEligibleToExtend`, at `9c9e823d5`); `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:1141-1142` (the team's `signal` then `return expr` in a rule)
deviation: the abstract-method checker's domain is a schema over the method's own static parameters only, the declaring trait's lifted parameters left to the replacer (`AbstractMethodChecker.scala:120-143`); the varargs type is named in the library in use at each call, not once at class load (`Types.java:99-108`); under a library that declares no `ImmutableArray` every use of a varargs parameter is refused with a message, in the `VarRef` rule (`impls/Misc.scala:628-639`); the object expression's comprises check reads every closed trait above it, not only those it names (`TypeHierarchyChecker.scala:66-99`); the text keeps `HeapSequence` with a callout (`Specification/basic/functions.tex:183-195`)
historical: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/AbstractMethodChecker.scala`, `Formula.scala`, `OverloadingChecker.scala`, `TypeHierarchyChecker.scala`, `VarianceChecker.scala`, `CoercionOracle.scala`, `ExportChecker.scala`, `impls/Decls.scala`, `impls/Misc.scala`, `staticenv/STypeEnv.scala`; `ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala`; `ProjectFortress/src/com/sun/fortress/compiler/Types.java`; `ProjectFortress/src/com/sun/fortress/compiler/codegen/FnNameInfo.java`; `ProjectFortress/src/com/sun/fortress/nodes_util/NodeUtil.java`; `Specification/basic/functions.tex`; `Specification/appendices/changes.tex`

This is the report of the rung's first pass, with the repair round's corrections and its own work folded in. The harness refused this file's write in both passes ("Subagents should return findings as text, not write report files"). The repair round wrote it from the first pass's `reportText`, applying the judge's corrections (`explorations/compile-ladder/rung-checker-defects/JUDGE.md`, section 4, item 8). The gather writes it verbatim from the repair round's `reportText`.

## 1. What was inherited and how the work was set up

The first pass: nothing inherited. The branch was cut fresh from `9c9e823d5` and seeded from `/home/user/fortress-base10` (`cec70988b`; `git log cec70988b..9c9e823d5 -- Library/ ProjectFortress/src/ ProjectFortress/LibraryBuiltin/` prints nothing, so the seeded build is the base's code). The base copy `/home/user/fortress-checkdefects-base` was seeded later for runs on the old code.

The first pass's commits: `4d8cc0c7a` the tests alone; `3d8d76292` the numeral-varargs test alone; `eb9161c30` the checker edit; `553a58f05` the lifted-parameter test and the text; `a60dde51f` the varargs export test alone; `4d19d17a1` the export-check edit. Then `730a8ccf1`, the first skeptic's refusal (`SKEPTIC.md`), and `8b1daf2f9`, the judge's ruling, repair (`JUDGE.md`).

The repair round inherited the branch at `8b1daf2f9`, with the build of `4d19d17a1`'s code in the worktree. `730a8ccf1` and `8b1daf2f9` change no code, and the build's class files date from 06:44, the last code commit from 06:48. The round re-ran nothing that the first pass's complete logs already hold. Its commits:
- `76dda233a`: the four tests alone (section 3).
- `d9434644f`: the edit (section 2, row 604).
- `08cd4b4d0`: the expected failures of the skeptic's other measured defects (section 9).
- `f300bf7e1`: the text and record.md.

## 2. Where each fix belongs, and what the tree already does

Every row is the compiled checker's (`scala_src/typechecker/`, `explorations/coordinator/map/README.md:116`); none is walk's or the library's.

- **Row 563.** The abstract-method checker builds each inherited method's domain as a schema over its static parameters, then runs the declaring trait's replacer over it (`AbstractMethodChecker.scala:95`, `:99` at `9c9e823d5`). The replacer puts the object's parameters into the schema, where a method parameter of the same name binds them.
  - Batch 8's rung O repaired the same capture in the overloading checker. It renames a method's own parameters (`getStaticParameters(f, false)`) apart from the checked type's before the replacer (`OverloadingChecker.scala:184-202`, called at `:144`, `:173`).
  - The abstract-method checker had a second capture that the overloading checker does not. For a functional method, `makeArrowWithoutSelfFromFunctional` lifts the declaring trait's parameters into the schema (`STypesUtil.scala:134-137`, `:123-127`). So `AdditiveGroup[\T\]`'s `+`, read against `AdditiveGroup[\Vector[\T,s0\]\]`, had the object's `T` bound by the lifted `T`.
  - One helper repairs both. The schema is over the method's own parameters, renamed apart where they clash with the object's, and the trait's parameters are left free for the replacer (`AbstractMethodChecker.scala:95`, `:99`, `:120-143`).
  - Rung O's helper, copied here, renames a clashing parameter and its own bound. It leaves alone a non-clashing parameter whose bound mentions the renamed one (`case None => p`, `AbstractMethodChecker.scala:141`, `OverloadingChecker.scala:200`). The first skeptic measured this (`SKEPTIC.md` section 5), and the judge ruled it recorded here, not repaired (JUDGE.md, J2): row 625, section 9.
- **Row 593.** The brief named the coercion attempt's candidates (`impls/Functionals.scala:296-402`) as the first place to look. They do offer `ZZ32` for `depS`, but the attempt with it fails in the solver.
  - `Formula.solveToBounds` gave a variable with no named lower bound the meet of its upper bounds, leaving out every bound that mentions an inference variable (`Formula.scala:537-538` at `9c9e823d5`, batch 8's rung I). So `U extends BoxU[\S\]` became `Any`, and the final check `Any <: BoxU[\ZZ32\]` failed.
  - Only the attempt that picks `S`'s bound `Number` survived, since `Number <: $S <: Number` unifies `S` before `U` is solved.
  - The solver now takes a bound-only variable's bounds at the solutions found for the other variables they mention, in dependency order. A bound that still mentions an unsolved variable, the variable itself among them, is left out as before (`Formula.scala:534-583`). An F-bounded parameter (`T extends StandardMin[\T\]`) and mutually dependent bounds are untouched.
- **Row 604.** The team's sites, all of them:
  - The domain. `makeArrowFromFunctional` mapped each parameter through `NodeUtil.getParamType`, which makes a varargs parameter a varargs tuple of its own. So `g(x: Any, y: Any, rest: Any...)` read `(Any, Any, (Any...))`, three plain elements (`STypesUtil.scala:161` at `9c9e823d5`; `NodeUtil.java:342-352` likewise).
    - The team's builder `makeDomainType` puts the varargs type in the tuple's varargs slot (`STypesUtil.scala:206-241`), and `TypeAnalyzer` reads such a tuple as its expansions (`types/TypeAnalyzerUtil.scala:62-72`, `types/TypeAnalyzer.scala:282-291`). Both builders now make that shape (`STypesUtil.scala:160-175`, `NodeUtil.java:342-358`).
    - The code generator's helper, which the checker calls for a dotted call, crashed on the same parameter: "TODO varargs", `OptionUnwrapException` (`compiler/codegen/FnNameInfo.java:152`, `:158`). It now takes `NodeUtil.getParamType` when a varargs parameter is present (`:147-149`).
    - One argument needing a coercion against a varargs domain (`h(1)` for `h(rest: ZZ32...)`) was refused, because `CoercionOracle.checkCoercion` had no case for a non-tuple against a tuple (`CoercionOracle.scala:169-179` at `9c9e823d5`). It now reads that case as subtyping does, against the domain's one-element expansion (`:178-180`).
  - The binding. `STypeEnv.extractNodeBindings` bound a varargs parameter to its element type (`staticenv/STypeEnv.scala:183-184` at `9c9e823d5`).
    - The team's checker names the type: `makeVarargsParamType`, `ImmutableArray[\T, ZZ32\]`, with no caller and the comment "Replace ImmutableArray with ImmutableHeapSequence when ImmutableHeapSequence is put into the libraries" (`Types.java:47-49`, `:99-101`).
    - Walk binds the parameter to the array that `__immutableFactory1` builds (`interpreter/evaluator/values/NonPrimitive.java:224-251`), an `ImmutableArray1[\T,0,n\]`, which extends `ImmutableArray[\T,ZZ32\]` (`Library/FortressLibrary.fsi:1548-1550`).
    - The binding now uses that type (`STypeEnv.scala:184-186`), named in the library in use when it is made (`Types.java:99-108`). That is how `Types.useCompilerLibraries` re-points `STRING` and the others, for the same reason (`Types.java:74-90`).
    - Every binder of a parameter list uses this binding: a declared function's body and its contract (`impls/Decls.scala:197-198`, `this.extend(statics, Some(params), wheres)` then `newChecker.check(c)`), and a function expression's body (`impls/Functionals.scala:1148`, `:1153`, `this.extend(params)`).
  - The use, under a library that lacks the type. The compiled library declares no `ImmutableArray`, so a reference to the parameter reaches the trait table with an undeclared name. The checker then throws "RuntimeException: Not in the trait table: CompilerLibrary.ImmutableArray" (`types/TypeAnalyzer.scala:725`).
    - The first pass refused the use only in a declared function's body, by scanning the body for the parameter's name (`impls/Decls.scala:51-63` and `:210-219` at `4d19d17a1`). The first skeptic measured the crash in a contract and in a function expression (`SKEPTIC.md` section 2), and the judge ruled that the refusal move to the use (JUDGE.md, J1).
    - The `VarRef` rule is the one place where a variable's type is read for an expression (`impls/Misc.scala:625-627`, `getTypeFromName`). The other callers, `Misc.scala:165` and `Functionals.scala:899`, read function names.
    - The rule now refuses a reference whose type is the varargs type of the library in use, when that library's trait table lacks the type; the name is compared by its text and its API's text. The message is "The varargs parameter rest is used, whose type ImmutableArray[\ZZ32,ZZ32\] the libraries do not declare.", and the rule returns the expression unchecked, the team's form (`impls/Misc.scala:628-639`; `impls/Functionals.scala:1141-1142`).
    - The declaration's guard and its helper are removed (`impls/Decls.scala` at `d9434644f`). Inside a `TryChecker` the signal is a failed try, not a crash (`STypeChecker.scala:566-575`, `:579-591`, `:598-607`).
  - The export check. `ExportChecker.equalParams` compared two parameters' declared types and answered `false` when neither had one, which is true of every varargs parameter (`ExportChecker.scala:654-657` at `9c9e823d5`). It now compares their varargs slots (`:654-659`).
- **Row 605.** The object declaration's checker bound the fields first and then the methods over them (`impls/Decls.scala:138-152` at `9c9e823d5`), so an inherited getter shadowed a field of its name. The object expression's checker did the same (`impls/Misc.scala:373-385`). Both now bind the fields over the methods (`impls/Decls.scala:148-154`, `impls/Misc.scala:381-386`).
- **Row 574.** `withoutSelf` is the per-provider meet's helper (`OverloadingChecker.scala:595-602`). The message now takes it at the self position for a functional method and keeps `makeDomainFromArrow(at, true)` for a dotted one (`:423-426`). The rules are untouched.
- **Row 597, the checker's half.** The clause check read only declared traits and objects (`TypeHierarchyChecker.scala:154-260` at `9c9e823d5`). An object expression is in no trait table, which is why the abstract-method checker's object-expression check is commented out (`AbstractMethodChecker.scala:125-141` at `9c9e823d5`).
  - The hierarchy check now walks a component's object expressions, with the static parameters of the declarations around each in scope.
  - It refuses an object expression that is a subtype of no listed type of a closed trait above it (`TypeHierarchyChecker.scala:62`, `:66-99`). Each clause is read at its instance by `TypeAnalyzer.comprisedTypes` (`types/TypeAnalyzer.scala:750-760`).
- **Crash 4, Stream's variance stage.** `VarianceChecker.verifyTraitDeclaration` unwrapped every method parameter's declared type (`VarianceChecker.scala:140` at `9c9e823d5`), and a varargs parameter has none. It now reads a varargs parameter's element type in the parameter's own position (`:140-142`).

Left as they are:
- Rows 572, 425 and 560's second part, as the brief says.
- The overloading checker's reading of a varargs parameter as a plain parameter of its element type (`STypesUtil.paramsToType`, `:1784-1810`, used at `OverloadingChecker.scala:680-704`), which belongs to its rules.
- The bound omission in `domainApart` and `ownStaticParamsApart` (row 625, JUDGE.md J2).

## 3. The tests, first, seen failing through the harness

Commit `4d8cc0c7a` holds the first pass's tests alone. The run on the base build, before any edit:

    ONE_JVM=1 bash explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests <the 16 .test files>

Its lines (`tmp/rung-checker-defects/junit/base.log`):

    . compile .../InheritedAbstractMethodStaticParamSameName
        has no concrete implementation in the object P in component InheritedAbstractMethodStaticParamSameName.
     FAIL
    F. run .../InferDependentBound (819ms) FAIL:  BoxU[Number] =/= BoxU[ZZ32]; a lone type parameter bounded by Number given a ZZ32 takes ZZ32, ...
    . typecheck .../VarargsNoTrailingArgument ...
        - (Any, Any, (Any...))->ZZ32 is not applicable to an argument of type (String, String).
     FAIL
    . compile .../FieldBesideInheritedGetter ...
        - (ZZ32, ZZ32)->ZZ32 is not applicable to an argument of type (()->ZZ32, ()->ZZ32).
     FAIL
    . typecheck .../VarargsArgumentCounts ...
        - (Any, Any, (Any...))->ZZ32 is not applicable to an argument of type (String, String).
    . typecheck .../VarargsMethodCall
     UNEXPECTED exception
    edu.rice.cs.plt.tuple.OptionUnwrapException
    . typecheck .../VarianceVarargsMethod
     UNEXPECTED exception
    edu.rice.cs.plt.tuple.OptionUnwrapException
    . compile .../XXXVarargsParamNotItsElement
     Did not satisfy compile_err_contains; expected
        Can't compile VarArgs yet
    . compile .../XXXFunctionalMethodDuplicateSelfSecond ...
        There are multiple declarations of pick with the same parameter type: (B)
     Saw failure, but did not satisfy compile_err_contains; expected
    . compile .../XXXObjectExpressionUnlistedExtender
     Did not satisfy compile_err_contains; expected
        emitDesc of type K failed
    . typecheck .../FieldBesideInheritedGetterObjectExpression ...
        - (ZZ32, ZZ32)->ZZ32 is not applicable to an argument of type (()->ZZ32, ()->ZZ32).
     FAIL
    Tests run: 20,  Failures: 15,  Errors: 0

The four home-2 tests passed there as expected failures (section 9), and so did the guard `ObjectExpressionListedExtender`. Three tests came later:

- `VarargsNumeralArguments` (`3d8d76292`, alone), on the build without the coercion edit: `- (ZZ32...)->ZZ32 is not applicable to an argument of type IntLiteral.` / ` FAIL`. On the base the same call fails the same way (probe `VaThree`, run in the worktree before any edit).
- `InheritedAbstractOperatorTraitParamSameName` (`553a58f05`) was found by a probe after the edit and committed after it, so it was shown failing in the base copy: `bash /home/user/fortress-checkdefects-base/explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh lifted-base ProjectFortress/compiler_tests InheritedAbstractOperatorTraitParamSameName.test`: `The inherited abstract method +(self:Ag[\T\],other:T):T from the trait Ag[\V[\T\]\]` / `has no concrete implementation in the object V ...` / ` FAIL`.
- `VarargsExportMethod` (`a60dde51f`, alone), before the export edit. On the build without that edit: `Unmatched declarations: { (TraitDecl Sink ..., due to different method print ...) }` / ` FAIL`. In the base copy: ` UNEXPECTED exception` / `edu.rice.cs.plt.tuple.OptionUnwrapException` (crash 4 comes first).

`XXXVarargsBodyIterates` came with the edit commit `eb9161c30`, keyed on a message that edit created, and it never ran on the base's code before the edit. On the base its program is refused for another reason, "No such method ZZ32.loop.", from the element type (as the skeptic's `SkVaCounts` shows), and its key does not name that message.

`XXXVarargsParamNotItsElement.test` was keyed on "but declared return type is String" in `4d8cc0c7a` and rekeyed after the edit. It fails on the base under either key: the base accepts the program and stops in code generation with "Can't compile VarArgs yet".

The repair round's tests are in `76dda233a`, alone:
- `XXXVarargsFunctionExpressionUse` and `XXXVarargsContractUse`, new.
- `XXXVarargsBodyIterates.test` and `XXXVarargsParamNotItsElement.test`, rekeyed to the refusal at the use.

Under walk, in the base copy, the two new programs print `6` and `2`. The run on the build of `4d19d17a1`'s code, before the edit (`tmp/rung-checker-defects/junit/repair-before.log`):

    ONE_JVM=1 bash explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh repair-before ProjectFortress/compiler_tests XXXVarargsFunctionExpressionUse.test XXXVarargsContractUse.test XXXVarargsBodyIterates.test XXXVarargsParamNotItsElement.test

    . compile ProjectFortress/compiler_tests/XXXVarargsFunctionExpressionUse
     Did not satisfy compile_err_contains; expected
    java.lang.RuntimeException: Not in the trait table: CompilerLibrary.ImmutableArray
    . compile ProjectFortress/compiler_tests/XXXVarargsContractUse
     Did not satisfy compile_err_contains; expected
    java.lang.RuntimeException: Not in the trait table: CompilerLibrary.ImmutableArray
    . compile ProjectFortress/compiler_tests/XXXVarargsBodyIterates ...
        The body uses the varargs parameter rest, whose type ImmutableArray[\ZZ32,ZZ32\] the libraries do not declare.
     Saw failure, but did not satisfy compile_err_contains; expected
    . compile ProjectFortress/compiler_tests/XXXVarargsParamNotItsElement ...
        The body uses the varargs parameter rest, whose type ImmutableArray[\String,ZZ32\] the libraries do not declare.
     Saw failure, but did not satisfy compile_err_contains; expected
    Tests run: 4,  Failures: 4,  Errors: 0

The two new tests were also run in the base copy, with the same command through the base copy's `junit.sh` (`repair-before-base.log`):
- `XXXVarargsFunctionExpressionUse`: `- Generator[\ZZ32\]->ZZ32 is not applicable to an argument of type ZZ32.` / ` Saw failure, but did not satisfy compile_err_contains; expected`.
- `XXXVarargsContractUse`: `- Generator[\ZZ32\]->Boolean is not applicable to an argument of type ZZ32.` and `- (ZZ32, (ZZ32...))->ZZ32 is not applicable to an argument of type (ZZ32, ZZ32, ZZ32).`, with the same verdict.
- `Tests run: 2,  Failures: 2,  Errors: 0`.

## 4. The repairs, against the text

- **Row 563.** traits.tex, section "Method Declarations": "any object inheriting an abstract method must define a body expression for the method" (`Specification/basic/traits.tex:567-572`). `InheritedAbstractMethodStaticParamSameName` (the method's own `R` against the object's `R`) and `InheritedAbstractOperatorTraitParamSameName` (the trait's lifted `T` against the object's `T`) compile and print `PASS`.
- **Row 593.** inference.tex, section "The Static Arguments of a Call":
  - A type parameter that is the whole type of parameters takes the narrowest candidate its bounds permit (`Specification/basic/inference.tex:77-91`).
  - One that nothing fixes takes the intersection of its upper bounds, its declared bound among them (`:99-104`), here `BoxU[\S\]` at `S`'s instance.
  - `InferDependentBound` prints `PASS`.
  - A chain, `dep2[\S extends Number, U extends BoxU[\S\], V extends BoxU[\U\]\](s: S)`, was refused on the base, "is not applicable to an argument of type ZZ32", and type checks now (probe `PDepChain`, `fortress typecheck` in the base copy and the worktree).
- **Row 604.**
  - Applicability. functions.tex, section "Function Applications": a parameter list with a varargs binding is applicable when the argument has at least as many plain types as plain bindings and the rest are each a subtype of the varargs type; the parameter is bound to a sequence of them (`Specification/basic/functions.tex:276-294`). overloading.tex, section "Applicability for Functionals with Varargs and Keyword Parameters", expands `f(x, y, z...)` from `f(x, y)` up (`Specification/basic/overloading.tex:246-287`).
  - These type check: `VarargsNoTrailingArgument`; `VarargsArgumentCounts` (none, one, three, five and six varargs arguments after two plain ones, and none, one and three for a varargs parameter alone); `VarargsNumeralArguments`; `VarargsMethodCall`; `VarargsExportMethod`.
  - The parameter's type. Section "Function Declarations" gives the parameter a sequence type (`functions.tex:174-180`); the type is the team's (POSITIONS, "The type group's late positions outweigh the early text").
  - Under the compiled library, which declares no `ImmutableArray`, every use of the parameter is refused with the type named:
    - in a declared body: `XXXVarargsBodyIterates`, the valid program that the specification's examples write, and `XXXVarargsParamNotItsElement`, an invalid one;
    - in a contract: `XXXVarargsContractUse`;
    - in a function expression: `XXXVarargsFunctionExpressionUse`.
  - The refusal's condition is the type the binding gives, so these four tests hold the binding, by reading. With `STypeEnv.scala:184-186` reverted, `rest` would be a `String` or a `ZZ32`, the refusal would not fire, and their keys, which name `ImmutableArray[\...,ZZ32\]`, would be unmet.
  - Under the one library, the distance shows the body typed as the sequence (section 8).
- **Row 605.** objects.tex, section "Field Declarations": "Within an object declaration or object expression, a field can be accessed by a 'naked' identifier reference ... such a reference does *not* invoke the getter or setter method of that name" (`Specification/basic/objects.tex:336-345`).
  - `FieldBesideInheritedGetter` prints `PASS` (`twice()` is 6), and `FieldBesideInheritedGetterObjectExpression` type checks.
  - Inside a trait, the text asks for the getter by field access (`Specification/basic/traits.tex:370-373`, `:493-499`). The probe `PTraitGetter` (`size + size` in a trait) is refused with "Variable size is not defined" on both trees and under walk, as the text says.
- **Row 574.** The text is silent on messages. `XXXFunctionalMethodDuplicateSelfSecond` now gets "There are multiple declarations of pick with the same parameter type: (N1)" in the trait and "(N1, B)" at the top level.
- **Row 597's checker half.** traits.tex, section "Trait Declarations": "A trait or object that explicitly extends T must be a subtype of a listed type", or, past a generic trait in between, "every trait or object that extends it is a subtype of a listed type" (`Specification/basic/traits.tex:235-248`).
  - `XXXObjectExpressionUnlistedExtender` is refused: "Invalid comprises clause: K has a comprises clause / but an object expression that extends it is not a subtype of a type it lists."
  - `ObjectExpressionListedExtender` type checks on both trees.
  - The 2012 reading lets a generic trait stand unlisted when every known extender is listed (`everyKnownSubtypeListed`, `TypeHierarchyChecker.scala:275-287` at `9c9e823d5`). Through such a trait, `object extends G[\String\] end` below `K comprises { L }` was accepted on the base and is refused now (probe `PObjExprGeneric`).
  - An object expression extending `L[\X\]` inside a generic function type checks on both (probe `PObjExprInGeneric`).

## 5. The crash rows, traced

The landed table's four crash rows (`explorations/compile-ladder/climb-batch-9/gate/distance.txt:43-46`):

1. `FnDecl FortressLibrary.fss:1285:1-1289:4 ... Type is not inferred.`
   - `__bigOperator`'s local function `body(i): L = r.lift((o.body)(i))` (`Library/FortressLibrary.fss:1287`) leaves its parameter's type out.
   - A reference to it asks `STypeEnv.getType` for its arrow (`staticenv/STypeEnv.scala:296`). `makeArrowFromFunctional` asks `NodeUtil.getParamType` for each parameter's type, which calls `bug`, "Type is not inferred" (`NodeUtil.java:339`).
   - The trace, from `fortress compile -debug stacktrace` on the probe `CrashLocalFn`: `NodeUtil.getParamType`, `STypesUtil.scala:161`, `STypeEnv.scala:296`, `STypeChecker.scala:312`, `Misc.scala:165`.
   - `XXXLocalFunctionUntypedParam` crashes the same way.
2. and 3. `TraitDecl FortressLibrary.fss:2474:1-2588:2` and `:2847:1-2960:2`, "TryChecker returned an untyped expr: FnExpr ... fn (i) => do r := r // " " row(i) end".
   - `Array2`'s and `Array3`'s `asString` declare local functions `row(i) = ...` and `plane(k) = ...` with neither parameter nor return type (`Library/FortressLibrary.fss:2483`, `:2866-2873`).
   - The return type's thunk checks the body (`Thunker.scala:136-170`). Binding the untyped parameter raises the team's "Missing parameter type for i" (`STypeEnv.scala:192-193`), and the thunk's `TryChecker` swallows it.
   - The function then has no type, so the call in the loop body's function expression is left untyped, and `TryChecker.tryCheckExpr` calls `bug` (`STypeChecker.scala:598-603`; the probe `CrashForLocal`'s trace, `Functionals.scala:512`).
   - `XXXLocalFunctionUntypedParamInLoop` crashes the same way.
4. `stage component Stream variance OptionUnwrapException`.
   - `WriteStream`'s `print(args:Any...)` (`Library/Stream.fss:70`) has a varargs parameter, whose declared type `VarianceChecker.scala:140` unwrapped (the probe `CrashVariance2`'s trace: `VarianceChecker.scala:140`, `:110`, `:60`).
   - Repaired; `VarianceVarargsMethod` type checks.
   - Nothing behind it was unmasked: Stream's variance stage reports no error.

The first three have one cause, a local function's omitted parameter type.
- The first skeptic measured a third form of it. A local function with neither parameter nor result typed, `sq(n) = n n` called on a `ZZ32`, stops the checker with "** bug! Result of typechecking still contains intermediate nodes." on the base and the head, where walk prints `49` (`XXXLocalFunctionUntypedParamAndReturn`).
- The text lets a function's parameter type be left out (`Specification/basic/functions.tex:97-103`, and `:576-591` for local functions) and leaves its inference "not yet described" (`Specification/basic/inference.tex:21-25`; `Specification/basic/components/type-inference.tex:13-45`).
- Row 405 records that the compiled path already refuses an untyped value parameter of a top-level function or a method, "Missing parameter type for x" (`STypeEnv.scala:192-193`), and classes the text as silent (`explorations/fortress-gap-ledger.md:416`).
- Their repair is the inference of a local function's omitted types, a checker project. They are home 2, with a row each (record.md, rows 620 to 622), on the ground of decision 9.

A further crash on row 604's path, a dotted call of a varargs method (`FnNameInfo.java:152`), is repaired with row 604 and asserted by `VarargsMethodCall`.

The repair round also ran a probe of its own, which the judge asked for (JUDGE.md, section 4, item 4). It is a varargs function with no declared return type whose body iterates its parameter, called in a `for` loop's body (`VaNoRetLoop`), and the same call outside a loop (`VaNoRetPlain`), under `fortress typecheck`:

    head VaNoRetLoop:   ** bug! TryChecker returned an untyped expr: FnExpr at .../VaNoRetLoop.fss:12.9
                        fn (i) => do println(tally(z, i)) end
    base VaNoRetLoop:   ** bug! TryChecker returned an untyped expr: FnExpr at .../VaNoRetLoop.fss:12.9
    head VaNoRetPlain:  The varargs parameter rest is used, whose type ImmutableArray[\ZZ32,ZZ32\] the libraries do not declare.
    base VaNoRetPlain:  No such method ZZ32.loop.

Both trees stop the same way in the loop, by row 621's mechanism:
- The return type's thunk fails on the body: on the head at the refusal, on the base at the element type.
- The thunk's `TryChecker` swallows the failure, and the loop body's function is left untyped.

Its two lines go into row 621's text. Walk prints `3 4 5` and `4`.

## 6. The text

The specification settles every row but 574, on which it is silent (it says nothing of messages), and the crashes' repair (the inference of omitted types, not yet described). The edits are in the S1 form (POSITIONS, "The S1 form"; "Every change to the specification is recorded with its reason"):

- `Specification/basic/functions.tex:183-195`: a box after the sentence that gives a varargs parameter the type `HeapSequence[\T\]`. The box says:
  - no library declares that type, nor the immutable sequence the team's draft note agreed on;
  - both implementations give the parameter `ImmutableArray[\T, ZZ32\]`;
  - the compiled library declares no such type, so there the checker refuses every use of a varargs parameter, in a body, a contract or a function expression, naming the type;
  - code generation does not yet compile one.

  The normative sentence stays. The repair round changed "refuses a body that uses a varargs parameter" to the wording above (JUDGE.md, section 4, item 7), because the first pass's sentence was false for a contract and a function expression.
- `Specification/appendices/changes.tex:2711-2775`: a new entry, "The type of a varargs parameter", `\seclabel{revival-varargs}`. It gives its reason (the decision of 23 September 2026 that the implementers' later word outweighs unfinished text), its effect, the original text (`Specification-1.0-frozen/basic/functions.tex:178-180`) and route C. Its Effect's sentence on the compiled library got the same correction (`:2759-2761`).
- `Specification/appendices/changes.tex:1317-1327`: the entry "The traits that extend a closed trait". Its Effect said "The compiled type checker enforces the requirement on a trait with static parameters over the declarations it sees". It now says "over the declarations and object expressions it sees", and adds a sentence on the object-expression check and on row 597. The interpreter's sentences stay.

Stale elsewhere, not normative, for the gather:
- `explorations/coordinator/map/spec-to-implementation.md:212` and `:446` say the compile path's varargs handling is unread.
- FACTS, "The compiled checker instantiates a type parameter that nothing at a call fixes ...", describes `solveToBounds` without the instantiation of bounds at other variables' solutions (record.md).

The inference chapter's and Appendix I's sentences on the compiled checker stay true: row 593 was a departure the chapter's list did not name, and it is now gone.

## 7. The runs on the edit

- **The rung's 22 `.test` files on `d9434644f`'s code**: `ONE_JVM=1 bash explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh repair-edit ProjectFortress/compiler_tests <the 20 .test files of the first pass> XXXVarargsFunctionExpressionUse.test XXXVarargsContractUse.test` (`tmp/rung-checker-defects/junit/repair-edit.log`): `OK (28 tests)`.
  - Among them: `XXXVarargsFunctionExpressionUse.fss:12:43-45: The varargs parameter rest is used, whose type ImmutableArray[\ZZ32,ZZ32\] the libraries do not declare.` / ` Saw expected failure`.
  - The same at `XXXVarargsContractUse.fss:8:25-27` and `XXXVarargsBodyIterates.fss:7:14-16`, and, with `[\String,ZZ32\]`, at `XXXVarargsParamNotItsElement.fss:5:30-32`.
  - The first pass's run of its 20 files on `4d19d17a1` was `OK (26 tests)`.
- **The four home-2 tests of the repair round** (section 9) on `d9434644f`'s code: `ONE_JVM=1 bash .../junit.sh repair-home2 ProjectFortress/compiler_tests XXXInheritedAbstractMethodBoundSameName.test XXXVarargsMethodCodeGeneration.test XXXLocalFunctionUntypedParamAndReturn.test XXXTypecaseUndeclaredType.test`, `OK (4 tests)`:
  - ` Saw expected failure`;
  - ` OK Saw expected exception` (`edu.rice.cs.plt.tuple.OptionUnwrapException`);
  - ` Saw expected failure` (`** bug! Result of typechecking still contains intermediate nodes.`);
  - ` OK Saw expected exception` (`java.lang.RuntimeException: Not in the trait table: ImmutableArray`).

  In the base copy, through its `junit.sh` (`repair-home2-base.log`): the same four verdicts, `OK (4 tests)`.
- **The skeptic's varargs probes** under `fortress typecheck` on the edit (`tmp/rung-checker-defects/skeptic/run.sh head tc P`). Each gives an error and no exception:
  - `SkVaFnExpr2`: `SkVaFnExpr2.fss:6:40-42: The varargs parameter rest is used, whose type ImmutableArray[\ZZ32,ZZ32\] the libraries do not declare.`
  - The same message for `SkVaFnExpr3` at `:7:20-22`, `SkVaFnExpr4` at `:11:43-45`, `SkVaContract` at `:5:16-23`, `SkVaContract2` at `:6:19-21`, `SkVaCounts` at `:6:14-16` and `SkVaLocal` at `:7:18-20`.
  - `SkVaMethodBody`: `:7:18: The varargs parameter xs is used, whose type ImmutableArray[\ZZ32,ZZ32\] the libraries do not declare.`
  - `SkVaObject`: `:4:12-23: Varargs parameters of objects are not allowed.` (the team's refusal, before any use).
  - `SkVaFnExpr` and `SkVaUnused`, which do not use the parameter, type check. `SkVaShadow` gets `Variable rest is already declared.` and `SkVaEnsures` gets `Variable 'outcome' not found.`, as on the base.
- **An expected failure shown going red** on a stand-in that removes its defect (the first pass): `XXXLocalFunctionUntypedParam` with `body(i: ZZ32)`, in `tmp/rung-checker-defects/standin/`, through `junit.sh`: ` Did not satisfy compile_err_contains; expected` / `Type is not inferred` / `Can't compile LetFn ...` (row 304's wall), red.
- **The compiler and library tracks**, run as `testFast`'s `fastTrack` runs them (own empty caches, `fortress.junit.reset=false`, `FORTRESS_THREADS=1`, `-Xmx768m -Xss32m`). This is the repair round's one whole-suite run, on `08cd4b4d0` (the code of `d9434644f`), with `bash tmp/rung-checker-defects/tracks3/run.sh` (the first pass's runner with its output directory moved to `tracks3/`): `OK (1037 tests)` (`Time: 512.449`) and `OK (86 tests)` (`Time: 312.248`).
  - The first pass ran them on `eb9161c30` (`OK (1027 tests)` and `OK (86 tests)`) and on `4d19d17a1` (`OK (1031 tests)` and `OK (86 tests)`).
  - The landed gate had 1010 and 86 (`explorations/compile-ladder/climb-batch-9/gate/summary.txt:2-3`); the 27 new compiler cases are this rung's.
- **The unit tests of the edited utilities**, one class each (first pass): `FormulaJUTest` `OK (5 tests)`, `STypesUtilJUTest` `OK (1 test)`, `OverloadingJUTest` `OK (1 test)`, `TypeAnalyzerJUTest` `OK (4 tests)`, `TypeSchemaAnalyzerJUTest` `OK (4 tests)`.
- **The ladder subset** (first pass): the ten ladder files with getters or generic objects (`tests/AliasedGetterTest`, `deepHierarchy`, `fmTest2`, `fmTest3`, `ifGetter`, `nestedInst`, `BuiltinBound`, `GS1`, `fmTest5`, `genericTest5`). No ladder file has a varargs parameter, an object expression or a comprises clause. They ran through a copy of `explorations/compile-ladder/repair-r1-atomic-static/run-subset.sh` in `tmp/rung-checker-defects/ladder2/`: all ten `crc=0 rrc=0` on `4d19d17a1` (and on `eb9161c30`), as at the last landed gate, where all 85 pass (`explorations/compile-ladder/climb-batch-9/gate/ladder/ladder.tsv`).
- **Competing names.** The repair round adds no declaration to the source tree. Each of its six test components' names occurs once in `ProjectFortress/` (by `find`), and `seqName` is local to the `VarRef` rule.

Process note: the first pass ran the tracks, the checker count and the distance each twice, on `eb9161c30` and on `4d19d17a1`. These were two code states, so no code ran twice, but the prefix asks for one run of each after the last edit; the export edit of `4d19d17a1` came after the first runs.

## 8. The checker count and the distance

Before: the landed tables (`explorations/compile-ladder/climb-batch-9/gate/checker-count.txt`, `distance.txt`) and `explorations/compile-ladder/gate/distance-sites.tsv`. Nothing under `Library/`, `ProjectFortress/src/` or `ProjectFortress/LibraryBuiltin/` changed between `cec70988b` and the base.

After: both stages on `4d19d17a1` (`explorations/coordinator/tools/checker-count/run.sh`, `explorations/coordinator/tools/distance/run.sh`, into `tmp/rung-checker-defects/count2/`, `distance2/`). An earlier distance run on `eb9161c30`, before the export edit, gave 327; it differed from the final only at the two export sites.

The repair round ran neither stage again, nor the ladder subset, as the judge ruled (JUDGE.md, J1 and section 4, item 6). The tables of `4d19d17a1` therefore stand for `d9434644f`, for these reasons:
- The round's edit moves the refusal from a declared body to the `VarRef` rule. The refusal's condition, that the library in use lacks `ImmutableArray`, is false under the one library, which declares it (`Library/FortressLibrary.fsi:1548-1550`).
- Both stages read the one library: the count's `WorldFlip.java` calls `Shell.useInterpreterLibraries()` (`explorations/coordinator/tools/checker-count/run.sh:24`).
- The first pass's distance output on `4d19d17a1` holds no message of the old guard: `grep -rl "the libraries do not declare" tmp/rung-checker-defects/distance2/ tmp/rung-checker-defects/count2/` prints nothing. So neither stage saw the guard fire, and the moved refusal cannot fire where the old one did not.
- The compiled library declares no varargs parameter (`Library/CompilerLibrary.fss:91` is a comment).
- No ladder file has a varargs parameter: a grep of the 85 files for a type followed by `...` finds only two comments, `tests/XXXgenericMethod1.fss:23` and `tests/XXXgenericMethod2.fss:22`.

The tables:
- **The count**: total 1, `#crash none`, unchanged. Its one error is the overloading of `isLeftZero`, not this rung's.
- **The distance**: `DISTANCE DOWN 340 -> 326 (-14)` (`compare.sh`).
  - By stage: abstract-method 12 to 8, typecheck 280 to 271, export 8 to 7.
  - By class: D1 12 to 8, X1 8 to 7, CV 2 to 0, OT 145 to 137, BR 8 to 9.
  - By unit: String 8 to 1, Stream 3 to 0, List 22 to 21, FortressLibrary 264 to 261.
  - Crash rows 4 to 3: `stage component Stream variance` is gone.

By repair:

- **Row 563, 4 sites**: `NoReductionPair`'s `generate` (`Library/FortressLibrary.fss:3068`, the method's own `R`), and the `+` of `__DefaultVector`, `__DefaultMatrix` and `TransposedMatrix` (`:2389`, `:2748`, `:2756`, the trait's lifted `T`).
- **Row 604, 13 sites**:
  - `assert` with no varargs argument (`Library/String.fss:330`, `:332`, `:334`, `:336`);
  - `deny` and `assert` with five and six (`:435`, `:436`, `:476`);
  - `writes(args, ...)` in `print` and `println` (`Library/Stream.fss:70`, `:71`, the CV pair);
  - `BIG ||` over `failMsg` in `assert` and `deny` (`Library/FortressLibrary.fss:306`, `:316`); their other halves, `Any has no getter called asDebugString`, stay;
  - `<|[\E\] xs: E... |> = list(xs)` (`Library/List.fss:176`);
  - Stream's export (`Stream.fss:12`).

  The `FortressLibrary` export error (`:12`) stays but no longer names `assert` and `deny`.
- **Rows 593, 605, 574 and 597**: no site of the library moves. The library no longer meets row 605, and no library object expression extends a closed trait.
- **Crash 4**: the row is gone; nothing was unmasked.
- **Respelled, the same sites**: `BIG MIN`'s two calls (`:4219`, `:4225`) now list its one-argument declaration's inferred return type as `T`, where it was `BigReduction[\T,AnyMaybe\]`.
- **The BR family moved by seven sites.** Gone: `Library/FortressLibrary.fss:3278`, `:3308`. New: `:130`, `:1600`, `:1615`, `:3415`, `:3490`, each "Function body has type X, but declared return type is BigReduction[...]" or "Comprehension[...]" in a big operator's one-argument body.
  - Each new message is on file in earlier landed per-site lists (`explorations/compile-ladder/climb-batch-6.5/gate/distance-sites.tsv`, `climb-batch-6.5b`, `climb-batch-7C`, `climb-batch-N`).
  - No edit of this rung touches those declarations. This is row 488's varying family, mechanism unknown, and the moves are not attributed to this rung.

## 9. Every defect measured, and its home

| defect | home | where |
|---|---|---|
| row 563, the method's own parameter captured | 1 | `InheritedAbstractMethodStaticParamSameName` |
| row 563's mechanism through the declaring trait's lifted parameter | 1 | `InheritedAbstractOperatorTraitParamSameName` |
| row 563's sibling, a non-clashing parameter's bound left naming the renamed one, at both renaming sites | 2 | `XXXInheritedAbstractMethodBoundSameName`, row 625 |
| row 593, a lone parameter at its bound beside a dependent bound | 1 | `InferDependentBound` with `InferDependentBoundLink` |
| row 604, none or many varargs arguments refused | 1 | `VarargsNoTrailingArgument`, `VarargsArgumentCounts` |
| row 604, one argument needing a coercion refused | 1 | `VarargsNumeralArguments` |
| row 604, a dotted varargs call crashed the checker | 1 | `VarargsMethodCall` |
| row 604, the export check never matched a varargs parameter | 1 | `VarargsExportMethod` |
| row 604, the parameter bound as its element | 1 | `XXXVarargsParamNotItsElement`, `XXXVarargsBodyIterates` (the refusal's condition is the binding's type, so their keys hold the binding, by reading) |
| row 604, a use of the parameter crashing the checker under the compiled library, in a contract or a function expression (the first skeptic's ground) | 1 | `XXXVarargsContractUse`, `XXXVarargsFunctionExpressionUse` |
| row 604, the compiled library declares no varargs type | 2 | `XXXVarargsBodyIterates`, row 604's note |
| varargs code generation, "Can't compile VarArgs yet" | 2 | `XXXVarargsCodeGeneration`, row 624 |
| varargs code generation of a trait method, `OptionUnwrapException` at `NamingCzar.java:899` | 2 | `XXXVarargsMethodCodeGeneration`, row 624's method case |
| row 605, in an object declaration and an object expression | 1 | `FieldBesideInheritedGetter`, `FieldBesideInheritedGetterObjectExpression` |
| row 574, the message | 1 | `XXXFunctionalMethodDuplicateSelfSecond` |
| row 597's checker half | 1 | `XXXObjectExpressionUnlistedExtender`, guard `ObjectExpressionListedExtender` |
| crash 1, an untyped local function parameter | 2 | `XXXLocalFunctionUntypedParam`, row 620 |
| the same cause's third form, neither parameter nor result typed | 2 | `XXXLocalFunctionUntypedParamAndReturn`, row 620 |
| crashes 2 and 3, the same through a loop body | 2 | `XXXLocalFunctionUntypedParamInLoop`, rows 621 and 622 |
| crash 4, the variance stage on a varargs parameter | 1 | `VarianceVarargsMethod`, row 623 opened and closed |
| a typecase arm naming a type the library in use does not declare, with static arguments, crashes the checker | 2 | `XXXTypecaseUndeclaredType`, row 626 |

Why each defect is home 2:
- Row 625's program is valid by traits.tex, section "Method Declarations", and its overloading half lies in a file this rung may edit only for row 574's message (JUDGE.md, J2).
- A varargs function or method is valid by functions.tex, sections "Function Declarations" and "Function Applications", and code generation is not this rung's.
- A local function's omitted types are allowed by functions.tex, and their inference is not described (decision 9).
- A typecase arm naming a type not in scope is a static error by declarations.tex, section "Reach and Scope of Declarations" ("it is a static error for a reference to a name to occur where it is not in scope", `Specification/basic/declarations.tex:570-572`). So the answer is an error with a message, not the crash. Its repair lies in the disambiguator (`compiler/disambiguator/TypeDisambiguator.java:376-380`), outside this rung's checker files.

Not a defect, by reading: a bare undeclared name in a typecase arm (`typecase x of Nonesuch => ...`). Both paths read it alike, as a name bound to the value, of type `Any`. The disambiguator rewrites such an arm to a binding (`TypeDisambiguator.java:234-238`), the checker accepts it, and walk takes the arm and prints `nonesuch` (probe `TcNonesuch`, base and head). This follows the pattern-matching proposal by which the section's own note says the text is to be revised ("This section should be revised according to the changes in the pattern matching proposal", `Specification/basic/expressions/typecase.tex:15`). Row 626 quotes it as the context of its crash.

## 10. Decisions

1. **Row 563's renaming also covers the declaring trait's lifted parameters.**
   - Candidates:
     - rename only the method's own parameters and keep the lifted ones in the schema; this leaves the `+` capture at three distance sites;
     - rename the lifted ones apart too; the replacer could then no longer instantiate them;
     - a schema over the method's own parameters, the trait's left free for the replacer (taken).
   - Evidence: rung O's helper takes the method's own parameters (`OverloadingChecker.scala:186`). The probe `PLiftedCapture` is refused in the base copy and accepted on the edit, and three `+` sites cleared.
2. **Row 593 in the solver.**
   - Candidates:
     - add or reorder candidates in `checkApplicableWithCoercion`, the brief's first place, which already offers `ZZ32`;
     - `BottomType` for a bound-only variable, which batch 8's rule refuses;
     - its bounds at the other variables' solutions (taken), the chapter's "its declared bound" at the instances of the parameters it mentions.
   - A self-mentioning bound is unchanged, so the F-bounded case that rung W's P1 answer covers is not touched.
3. **The varargs type is named in the library in use at each call.**
   - Candidates:
     - the team's static `IMMUTABLE_HEAP_SEQ_NAME`, fixed when `Types` loads;
     - a name made at each call (taken).
   - This follows how `Types.useCompilerLibraries` re-points `STRING` and the others, so that a JVM that switches libraries (the count stage's `WorldFlip`) names the right one.
4. **Under the compiled library, every use of a varargs parameter is refused with a message, at the use.** The first pass refused it only in a declared body, which left a contract and a function expression to crash (`SKEPTIC.md` section 2). The judge decided the place (JUDGE.md, J1), and the repair round built it.
   - Candidates:
     - the crash;
     - keeping the element type where the library lacks the type: a silent over-acceptance, since `k(rest: String...): String = rest` type checks;
     - declaring `ImmutableArray` in the compiled library, ruled out by POSITIONS, "The library route.";
     - a guard at each binding site, extending the declaration's guard to its contract and copying it into the function-expression rule. This counts the sites by hand, misses any site not counted (such as a keyword default after a varargs binding), and keeps two copies of one rule;
     - a refusal at the binding, in `STypeEnv.extractNodeBindings`. This refuses every varargs declaration under the compiled library, even one whose body never uses the parameter, which turns the rung's call tests red; and the environment has no trait table;
     - a refusal in the `VarRef` rule, the one place a variable's type is read (taken).
   - The taken option covers every binding site by construction, uses the team's form of a refusal in a rule, and makes the refusal tests depend on the binding.
   - No runnable program changes, because code generation refuses every varargs function (row 624). `XXXVarargsBodyIterates` goes red at the switch-over.
5. **One argument against a varargs domain is coerced as subtyping reads it.**
   - Candidates:
     - `zipWithDomain`'s single-argument pairing, which every call uses;
     - a case in `CoercionOracle.checkCoercion` (taken), local to a varargs domain.
6. **The variance stage reads a varargs parameter's element type at the parameter's polarity.**
   - Candidates:
     - skip varargs parameters, so no check at all;
     - `ImmutableArray[\T, ZZ32\]` at the parameter's polarity. An invariant `T` there refuses a covariant and a contravariant parameter alike, stricter than for a plain parameter;
     - the element type at the parameter's polarity (taken). The arguments are passed in argument position, and the body only reads an immutable sequence of them.
   - No text states variance's rules. The later Types chapter defines a covariant parameter (`Documentation/Specification/Prose/Language/types.tick:323-338`), not where one may occur. So the test asserts acceptance only.
7. **Row 605 is repaired in object expressions too**, since the passage names both and the object expression's checker had the same order.
8. **Row 597's check reads every closed trait above the object expression.**
   - Candidates:
     - the traits it names only, which is row 597's shape. This leaves an object expression below an unlisted generic trait that `everyKnownSubtypeListed` passes (probe `PObjExprGeneric`);
     - every closed trait above it (taken).
   - The text's two cases for an extender together demand this of an object expression, which has no clause and no static parameters of its own.
9. **Crashes 1 to 3, and the third form, are not repaired.**
   - Candidates:
     - infer a local function's omitted parameter and result types. That is the repair, a checker project that the text leaves undescribed (`Specification/basic/inference.tex:21-25`);
     - give the team's "Missing parameter type for i" in place of the crash. The compiled path already gives this refusal to an untyped parameter of a top-level function or a method (row 405, `explorations/fortress-gap-ledger.md:416`, `STypeEnv.scala:192-193`);
     - expected failures with rows (taken).
   - The ground is the record's stop "A crash repaired by catching it without the error the text gives" (`explorations/coordinator/CLIMB-BATCH-10.md:166`). The text allows the program and gives no error for it, and row 405 classes it as silent. So the team's refusal in place of the crash would be that stop.
   - Row 405 weighs the other way, since the same refusal stands for every other untyped parameter of the compiled path. Whether the local form should get that refusal until the inference is described is put to Pavol (section 12).
   - The record prescribes tracing and testing the crashes, not repairing them (`CLIMB-BATCH-10.md:153`, `:172`).
10. **Files beyond the section's list.**
    - The section names `AbstractMethodChecker.scala`, `OverloadingChecker.scala`, `impls/Functionals.scala`, `TypeHierarchyChecker.scala`, `Types.java`, `NodeUtil.java`, "another typechecker file" and a crash's file.
    - The defects also sat in:
      - `Formula.scala` (row 593);
      - `staticenv/STypeEnv.scala`, `useful/STypesUtil.scala`, `CoercionOracle.scala`, `ExportChecker.scala` and `impls/Misc.scala` (row 604);
      - `impls/Decls.scala` and `impls/Misc.scala` (row 605);
      - `VarianceChecker.scala` and `compiler/codegen/FnNameInfo.java`, named by the traces.
    - Each edit is where its defect sits, and none is another rung's file. `impls/Functionals.scala` is not edited.
    - The judge read none of these as a stop (`CLIMB-BATCH-10.md:158`, `:166`).
11. **Varargs tests are `typecheck` tests**, because code generation refuses every varargs function. That wall has its own expected failures, one for a function and one for a trait method.
12. **`XXXVarargsParamNotItsElement` was rekeyed twice**: after the first pass's edit, to the declaration's refusal, and in the repair round, to the refusal at the use. It fails on the base under each key.
13. **The repair round's home-2 keys.**
    - `XXXVarargsMethodCodeGeneration` is keyed `compile_exception_contains=OptionUnwrapException`, the most specific text the failing compile prints; the stream holds `ex.toString()`, which carries no message. On the base the checker's dotted-call crash throws the same exception. `VarargsMethodCall`, which type checks the same shape, is what tells the two apart.
    - `XXXTypecaseUndeclaredType` names `ImmutableArray[\ZZ32, ZZ32\]` as the judge wrote it, the type the first skeptic's probe met. The arm `Nonesuch[\ZZ32\]`, a type no library declares, crashes the same way and is quoted in row 626.

## 11. Stops

None of the section's stops is met:
- No compiled test's verdict changed other than the rung's own: the tracks pass whole on each of three code states.
- The overloading rules, answer 9's rules, the coverage check and the Meet Rule are untouched. `OverloadingChecker.scala` changes only the message. The solver change is on the `toBounds` path, which the overloading oracle does not take (`types/TypeSchemaAnalyzer.scala:141`, `:194`).
- Every refusal added is the text's or, under a library that cannot type the use, within row 604. Every acceptance added is the text's.
- No crash is caught. The refusal of a varargs use is checked before the trait table is asked, and the crash it pre-empts was caused by this rung's own binding under the compiled library.
- No library or walk file is edited.
- Of `Specification/appendices/changes.tex`, only this rung's two entries are edited.

## 12. For Pavol

- Under the compiled library, which declares no `ImmutableArray`, the checker refuses every use of a varargs parameter, naming the type: in a body, a contract or a function expression.
  - That refuses programs the text allows (functions.tex, section "Function Declarations").
  - It is held within row 604, because declaring the type in the compiled prelude is ruled out (POSITIONS, "The library route.") and keeping the element type over-accepts (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala:628-639`; `Specification/basic/functions.tex:183-195`).
- Where the text is silent on a library that lacks the type it names, the judge decided to put that refusal at the variable's use (the `VarRef` rule) rather than at each binding site or at the binding (`explorations/compile-ladder/rung-checker-defects/JUDGE.md`, J1).
  - Per-site guards miss uncounted sites, such as a contract, a function expression or a keyword default.
  - A refusal at the binding refuses every unused varargs parameter and breaks the rung's call tests.
  - The choice also makes the refusal tests depend on the binding.
- The judge decided not to repair row 563's dependent-bound sibling in this rung (JUDGE.md, J2).
  - The abstract-method checker's `domainApart` (`AbstractMethodChecker.scala:141`) and rung O's `ownStaticParamsApart` (`OverloadingChecker.scala:200`) both leave a bound that mentions a renamed parameter.
  - Repairing only the first changes no verdict, and the second lies in a file the record limits to row 574's message (`CLIMB-BATCH-10.md:158`).
  - The defect is home 2 (`XXXInheritedAbstractMethodBoundSameName`), with row 625 for a checker rung that may edit the overloading checker.
- Crashes 1 to 3 and the third form (a local function's untyped parameter, and its untyped result) are kept as expected failures.
  - The open question: should the local form get the compiled path's top-level refusal "Missing parameter type for x" (row 405, `explorations/fortress-gap-ledger.md:416`) until the inference of omitted parameter types is described (`Specification/basic/inference.tex:21-25`)?
  - Three library declarations hide their errors behind the crash (`Library/FortressLibrary.fss:1287`, `:2483`, `:2866-2873`).
  - The first skeptic's claim that this blocks microGPT is not supported (JUDGE.md, section 2). Row 176 (`fortress-gap-ledger.md:148`) records untyped probe variants beside a typed source, and `explorations/microgpt.fss` and `microgpt2.fss` declare no untyped parameter.
- Row 597's checker half reads every closed trait above an object expression, through the traits it extends as well as those it names. That is one step beyond the row's shape (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala:66-99`; decision 8). The judge upheld it under traits.tex, section "Trait Declarations".
- The varargs parameter's type: the text keeps `HeapSequence[\T\]` with a box, and both implementations give `ImmutableArray[\T, ZZ32\]` (decisions 3 and 4; `Specification/basic/functions.tex:183-195`).
- The rung's files beyond the section's list (decision 10).
- The distance's BR family moved by seven sites under the rung's tree, by row 488's unknown mechanism (section 8).

## 13. What comes back

- The repairs as built (sections 2 and 4).
- The distance by class, with what each repair cleared (section 8).
- The crash rows and their causes (section 5).
