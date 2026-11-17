# Rung T: a method whose one parameter is a tuple (climb batch 31b)

- problem: row 992, the planner's `PTupleIndex.fss` under the prelude: 'VerifyError … A2.get(FZZ32, FZZ32) … Type A2 is not assignable to FZZ32', the rehearsal's W15 on every `m[i,j]` of the one library's arrays of rank 2 and 3: explorations/compile-ladder/plan-31/PROBES.md:21
- spec: the method's parameter is bound to the value of the argument expression: Specification/basic/expressions/method-invocation.tex:57-58
- precedent: the class loader's flattened twin, a method beside one whose one generic parameter an instance makes a tuple, which takes the tuple's elements and calls it: ProjectFortress/src/com/sun/fortress/runtimeSystem/Instantiater.java:119-165; the object factory that counts a single tuple parameter's elements: ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:4824 (at the base); the unpacking of a tuple-typed argument: CodeGen.java:7385 (at the base, `evalArg`)
- deviation: the bridge goes the other way from the team's twin, from the boxed tuple to its elements, and the code generator writes it, not the class loader: ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:950-982
- deviation: a dotted call reads the declarations that the receiver's type holds to pass a tuple boxed, where the team's calls always pass its elements and lean on the twin, which an interface never gets: ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:7375-7407
- deviation: the twin's test of a tuple is narrowed from the prefix `LTuple` to a tuple type, `LTuple⟦`, substituted for a template parameter that was not one already: ProjectFortress/src/com/sun/fortress/runtimeSystem/Instantiater.java:124-128
- historical: ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java, ProjectFortress/src/com/sun/fortress/runtimeSystem/Instantiater.java, Specification/appendices/changes.tex (an Effect of the revival's section only): ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:793

## What changed and why

The code generator passes a parameter of a declared tuple type as the tuple's elements, one JVM parameter each, and the body makes the tuple again (`CodeGen.addParams`). A generic trait's method over a type parameter takes one value, so at an instance that makes the parameter a tuple its interface declares one boxed tuple. Nothing joined the two, and the forwarders counted Fortress parameters, not JVM parameters. Five repairs in `CodeGen.java` and one in the class loader:

1. The forwarders count the JVM parameters of their own signature: the object's method to its mangled body (`generateFunctionalBody`, :3154-3159) and the forwarders of inherited bodies (`generateForwardingFor`, :867-870). Before, a method of one pair parameter loaded self and one element, the VerifyError of rows 992 and 397.
2. `generateForwardingFor` computes a forwarded method's signature at its instance by its declared shape (`paramTypeAtInstance`, :901-924): a parameter whose declared type names a type parameter stays one JVM parameter when the instance makes it a tuple.
3. Where a body at the tuple type shadows a generic trait's method over a type parameter, the class gets a bridge from the interface's boxed method to the body (`dumpOverloadedMethodChaining`, :1537-1545; `joinsTupleElements`, :930-948; `tupleElementsBridge`, :950-982). The bridge unpacks as `evalArg` does and casts each element.
4. A dotted call passes its tuple argument boxed where every declaration that the receiver's type holds at that arity takes it so (`callTakesTupleBoxed`, :7375-7406, in `forMethodInvocation`, :7316-7322). A generic dotted method of one parameter is called with the receiver and the tuple as two values, as its closure is declared (`genericMethodTakesOneParameter`, :7354-7373; `receiverPrependedDomainType`, :7333-7351; the call, :7258-7261 and :7296-7299). Rows 992 (through the trait's type) and 832.
5. An operator applied to one tuple operand passes the tuple's elements, as a function call does (`forOpExpr`, :5651-5667). Row 819.
6. The class loader's twin is made only where a tuple type is substituted for a template parameter that was not a tuple already (`Instantiater.java:124-128`). Without it, the bridge of a generic object at a tuple type got a twin that duplicated the object's own method ('ClassFormatError: Duplicate method name "get" with signature "(…FZZ32;…FZZ32;)…FZZ32;"' on a probe of the library's shape, `G[\T, nat w\]`); with `Tuple⟦` in place of `Tuple`, the twin is no longer made for a class of a component whose name begins `Tuple`, row 840's cause.

## The convention as built

A compiled method's JVM parameters follow its declaration:

- one parameter of a declared tuple type: the tuple's elements, one JVM parameter each; the body makes the tuple again;
- one parameter whose declared type names a type parameter: one JVM parameter at every instance, the boxed tuple where the instance is a tuple, as the generic trait's interface declares it;
- several parameters: one JVM parameter each, a tuple among them boxed;
- a generic dotted method's closure: the receiver, then the declared parameters one each, so its one tuple parameter is boxed (`convertGenericMethodToClosureDecl`).

Where the instantiated signature and the body's differ, two bridges join them. The code generator writes, in the class that gives a body at the tuple type, a method of the interface's boxed signature that unpacks the tuple and calls the body virtually (`tupleElementsBridge`). The class loader writes, in an instantiated class, beside a method whose template's one parameter is a type parameter that the instance makes a tuple, a method of the elements that packs them and calls it (`Instantiater.visitMethod`). A dotted call chooses the boxed form by the declarations that the receiver's type holds (`callTakesTupleBoxed`); a call through an interface finds only the boxed form, so it must. A function or operator call passes the elements, as before.

## The failing run and the passing run

Failing, through the harness on the base's code, before the edit was first built (the tree at 647163a9c4 with the three tests added, the commit b0ce07b04f):

    $ ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests TupleIndexMethodCompiled.test GenericMethodTupleParameterCompiled.test PostfixOperatorTupleOperandCompiled.test
    # junit.sh base 2026-11-17T07:03:03Z; nproc 4; … tree 647163a9c4; tests from /home/user/fortress-tuple-parameter/ProjectFortress/compiler_tests
    ProjectFortress/compiler_tests/PostfixOperatorTupleOperandCompiled.fss:6:34: Error trying to close method scope.
    F. run ProjectFortress/compiler_tests/TupleIndexMethodCompiled (292ms) java.lang.VerifyError
        Type 'TupleIndexMethodCompiled$Arr2' (current frame, stack[0]) is not assignable to 'com/sun/fortress/compiler/runtimeValues/FZZ32'
    F. run ProjectFortress/compiler_tests/GenericMethodTupleParameterCompiled (446ms) java.lang.ClassCastException
    Tests run: 9,  Failures: 5,  Errors: 0

The cases added to `TupleIndexMethodCompiled` later, and the two promoted tests, were run in their final form on the old code (`old-fortress.sh … junit`, 07:24:45Z, 07:26:28Z, 07:40:22Z):

    $ old-fortress.sh /home/user/fortress-base36 …/tmp/old-caches-junit junit …/TupleIndexMethodCompiled.test …/GenericMethodTupleParameterCompiled.test …/PostfixOperatorTupleOperandCompiled.test …/TupleVarFieldCompiledLink.test …/TupleVarFieldCompiled.test
    F. run …/TupleIndexMethodCompiled (453ms) java.lang.VerifyError
    F. run …/TupleVarFieldCompiled (464ms) java.lang.VerifyError
    Tests run: 12,  Failures: 6,  Errors: 0
    $ old-fortress.sh /home/user/fortress-base36 …/tmp/old-caches-junit junit …/TupleNamedComponentGenericParamLink.test …/TupleNamedComponentGenericParam.test
    . run …/TupleNamedComponentGenericParam (310ms) java.lang.VerifyError
    Tests run: 3,  Failures: 1,  Errors: 0

Passing, the last runs after the last change of code (commit ee53014cf2's code, built):

    $ ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh e5 ProjectFortress/compiler_tests TupleIndexMethodCompiled.test GenericMethodTupleParameterCompiled.test PostfixOperatorTupleOperandCompiled.test TupleVarFieldCompiledLink.test TupleVarFieldCompiled.test TupleNamedComponentGenericParamLink.test TupleNamedComponentGenericParam.test
    OK (15 tests)
    $ ant testFast        # 07:41:04Z, on ee53014cf2
        [junit] Tests run: 1678, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 453.384 sec
    BUILD SUCCESSFUL

The four tracks: compiler 1678, library 86, othercompiler 263, misc 471, no failure. The compiler track has 11 more than the last landed gate's 1667 (`climb-batch-31/gate/summary.txt`): nine of the three new tests, one each of the two promotions. An earlier `ant testFast` on f91e6b9ee7, before step 6's narrowing to `Tuple⟦`, had one failure, `XXXTupleNamedComponentGenericParam` turned red (below).

## Where the fix belongs, and the precedent search

The checker accepts every program here and the code generator writes the classes, so the place is the code generator (`spec-to-implementation.md`, the rows for method declarations and tuple types: `CodeGen.forMethodInvocation`; `modules-and-phases.md`, B.11, for the class loader). Precedents:

- The team's twin in the class loader (`Instantiater.java:119-165`) is the same join in the other direction: an instantiated class whose method's one generic parameter became a tuple gets a method of the elements that packs them. It is made only in classes, never in an interface, so a call through a generic trait's type at a tuple instance cannot use it; hence the call site's choice in repair 4.
- The object factory counts a single tuple parameter's elements (`CodeGen.java:4824` at the base, 'if only a single parameter which is a tuple, signature will give them individually'). Of the sites in `CodeGen.java` that take a Fortress parameter count as a JVM count, eight: the two forwarders repaired here (base :803 with :867, and :3054); the factory, which already counts the elements; four of functional methods (base :3506, :3536, :3717, :4711), where self is among the parameters, so no one tuple parameter is spread; and one unused count in the trait's default method (base :2956).
- Row 397's notes named the same miscount at `generateForwardingFor` (c124c6b65), and its test turned red with repair 1.
- Rung M's forwarders (`generateForwardingFor`, rung M's line :873) are kept; repair 2 gives them the declared shape at an instance.
- Rung K's `castToTypeBelow` was tried and is not needed: the bridge casts each element to the instance's element type and the boxed call casts the tuple, and a `self` of a trait that comprises one object among a tuple's elements runs (`TupleIndexMethodCompiled`, `Q` and `R`; the probe `PSelfTuple`: old 'VerifyError: Bad type on operand stack', new `7`, `8`).

## What the specification settles

A dotted call binds the method's parameter to the value of the argument expression (`method-invocation.tex:57-58`), and a postfix operator is applied to its operand (`opr-overview.tex`, section "Postfix Operators"); each of the five tests' programs prints `PASS` under walk (`bin/fortress X.fss` on a copy of each, on the final tree). The cases of `object Two` that the skeptic added to `GenericMethodTupleParameterCompiled` stop that program under walk, 'Cannot find definition for method tk given receiver Two' (record.md, NEW-T-4). The specification says nothing of JVM parameters: the convention is the implementation's, fork T1's default.

## Programs run old against new

The old code is the base build (`old-fortress.sh`, or my tree before the edit); the new is the final build.

| program | old | new |
|---|---|---|
| `PTupleIndex.fss` (row 992's probe) | `java.lang.VerifyError` | `7` |
| row 832's program, `first[\U\](y: (U, U))` and `wrap[\(ZZ32,ZZ32)\]` | 'ClassCastException: class P832?$\=Box?first?… cannot be cast to class \=Arrow?Tuple?java\|lang\|Object,java\|lang\|Object,java\|lang\|Object?,java\|lang\|Object?' | `2`, `5` |
| row 819's probe, `opr (x:(ZZ32,ZZ32))! : ZZ32 = 3`, `opr (x:(ZZ32,ZZ32)): : ZZ32 = x!` | 'P819.fss:4:31: Error trying to close method scope.' | `3` |
| a plain object's and a trait's method of one pair parameter (`PTraitTup`) | 'VerifyError … PTraitTup$Q.g(…FZZ32;…FZZ32;)' | `12`, `34` |
| the call through the trait's type (`PTupleVia`) | 'VerifyError … PTupleVia$A2.get' | `7` |
| the generic trait at a pair second in an extends clause (`PSecond`) | 'VerifyError … PSecond$X.get' | `34`, `56`, `other` |
| the library's shape, `Grid[\T, nat w\]` and `G[\T, nat w\](v: T)`, and `Sel[\T\]` at `(T, ZZ32)` (`PGrid`) | 'VerifyError … PGrid$\=Grid?com\|sun\|…\|FZZ32,3?$DefaultTraitMethods.offset(…)' | `42`, `5`, `5`, `5`, `y`, `z` |
| a generic function at a pair (`PGenFnTup`, the twin's case, a control) | `5` | `5` |

## Sentences of the specification made false

One, changed here: `Specification/appendices/changes.tex:3330-3333`, the Effect of the entry on a type parameter's implicit bound.

- Before: "On the compiled path some such instances compile and then fail at run time: an instance at \TYP{()} where a parameter has the type parameter's type (row~339 of the revival's gap ledger), and a generic dotted method whose one parameter has a tuple type (row~832)."
- After: "On the compiled path one such instance compiles and then fails at run time: an instance at \TYP{()} where a parameter has the type parameter's type (row~339 of the revival's gap ledger)."
- After the skeptic's correction, since a generic operator over a type parameter applied to a pair now compiles and dies at the call (record.md, NEW-T-3): "On the compiled path some such instances compile and then fail at run time: an instance at \TYP{()} where a parameter has the type parameter's type (row~339 of the revival's gap ledger), and an instance at a tuple type of a generic operator whose one parameter has the type parameter's type."

No other sentence of `Specification/` names rows 992, 819, 397 or 840 (`grep -rn 'row~' Specification`).

## Existing tests that failed after the change

- `compiler_tests/XXXTupleVarFieldCompiledRungC.test` (row 397): its run printed `PASS`, so the expected failure was red. Cause: repair 1, the forwarder of the setter of a tuple-typed field counted one argument. Promoted to `TupleVarFieldCompiled.fss`, `.test` (link, run, `PASS`) and `TupleVarFieldCompiledLink.test`; `TupleVarCompiledRungCLink.test` keeps row 396's component only. Its record pointer and the row number in its messages were dropped.
- `compiler_tests/XXXTupleNamedComponentGenericParam.test` (row 840), in the first `ant testFast` on f91e6b9ee7: 'junit.framework.AssertionFailedError: TestTest …/TupleNamedComponentGenericParam'. Cause: repair 6. The twin was made where the instance's one parameter began `LTuple`, also for `TupleNamedComponentGenericParam$Box⟦FZZ32⟧`; the twin packed a `Tuple⟦FZZ32⟧` and passed it where the `Box` was expected. Narrowed to `LTuple⟦`, and promoted to `TupleNamedComponentGenericParam.test` (link, run, `PASS`); the program's `REACHED` line was dropped.

No line of a test the team wrote changed.

## The stages, the files, the shadow patch

The rung runs neither stage. STAGE_BLIND, the files edited: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`; `ProjectFortress/src/com/sun/fortress/runtimeSystem/Instantiater.java`, beyond the files the section named; `Specification/appendices/changes.tex`; the tests `ProjectFortress/compiler_tests/TupleIndexMethodCompiled.{fss,test}`, `GenericMethodTupleParameterCompiled.{fss,test}`, `PostfixOperatorTupleOperandCompiled.{fss,test}`, `TupleVarFieldCompiled.{fss,test}`, `TupleVarFieldCompiledLink.test`, `TupleNamedComponentGenericParam.{fss,test}`, `TupleVarCompiledRungCLink.test`. `compiler/NamingCzar.java` was named and is not edited.

    $ python3 explorations/coordinator/tools/distance/shadow-patch.py ProjectFortress/src/com/sun/fortress tmp/rung-tuple-parameter/shadow
    shadow sources written to tmp/rung-tuple-parameter/shadow
    shadow-EXIT=0

It ran on the final tree, ee53014cf2; `CodeGen.java` has not changed since f91e6b9ee7.

## The ladder subset

Empty. No file of the baseline's `raw/` has a first error in what the change touched: the baseline's 21 codegen, 6 link and 5 run first errors (`baseline-2026-09-19/ladder.tsv`) name tuple bindings, object expressions, labels, varargs, `LetFn` and others, none a forwarder, a tuple parameter's call or an operator on a tuple; and the ladder's programs that declare a method of one tuple parameter (`HeapTest`, `RangePrototype`, `XXXHashtable`, `oprTests`, `rightOverload`, `wrongOverload`, `GenTest4`, `GenTest5`, `HelperTest1` to `3`) stop at disambiguate or typecheck in the baseline. The newest landed `ladder.tsv` (`climb-batch-31/gate/ladder/`) holds the 85 gated programs, all `pass`; the gate runs them.

## Points to report

- The convention as built: above. Evidence: `CodeGen.java:901-982`, `:7333-7413`, `Instantiater.java:124-128`.
- Rows 992, 832 and 819: each reproducer fails on the landed tree and passes after (the table above; the tests' failing and passing runs).
- Existing tests that failed after the change: rows 397's and 840's expected failures, above, both promoted.
- The distance stage's shadow patch applies to the final `CodeGen.java`: exit 0.
- The specification's sentence changed: above, `changes.tex:3330-3333`.
- The files edited: above; `runtimeSystem/Instantiater.java` beyond those named.
- The reserved point, a change of a compiled method's JVM parameters where no tuple-typed parameter stands: reached by repair 6 only. An instantiated class of a component whose name begins `Tuple` no longer gets the twin, a method of the misread elements of a class that is no tuple (row 840; `TupleNamedComponentGenericParam`: old 'java.lang.VerifyError', new `PASS`). Everywhere else a descriptor changes only where a tuple stands at the instance. Repair 1 also changes how many values a forwarder loads, without changing its signature, for a method whose one parameter is `()`: it loads self alone, where before it read a parameter its signature does not have.

## Decisions

1. Fork T1 as written: a declared tuple parameter keeps its elements as JVM parameters, a type parameter at a tuple instance is one boxed JVM parameter, and bridges join them. Ways not taken: one boxed tuple everywhere, which changes every compiled method with a tuple parameter (T1's way not taken); elements everywhere, with the class loader adding to every instantiated interface an abstract method of the elements, which every class implementing it would then need, a larger change of the runtime. Evidence: the interface declares `abstract Tuple⟦FZZ32,FZZ32⟧ offset(Tuple⟦FZZ32,FZZ32⟧)` (`switch-rehearsal.md:147-152`), and the class loader adds the elements' form only in classes (`Instantiater.java:130`).
2. Row 832 is repaired at the call: the closure keeps its declared shape, the receiver and each declared parameter, and the call casts to that arrow. Way not taken: a closure of one tuple parameter that takes its elements, which changes every generic method closure of one tuple parameter and its arrow type and class name. Evidence: the closure's class is a two-place arrow, the call cast to three (row 832; the old run's `ClassCastException`).
3. The call site decides boxed or elements by the declarations that the receiver's type holds (`methodsNamed`), matched by element count. Way not taken: matching by `typeAnalyzer.equiv`, which crashed inside a generic trait's body: 'I is not in the kind env [][]' (`fortress compile -debug stacktrace`, at `TypeAnalyzer.staticParam`). The receiver's own static arguments are applied besides each declaration's replacer, since `STypesUtil.gatherMethods` composes a replacer only for the keys of the declaration's own (`StaticTypeReplacer(a, b)`): `Arr[\ZZ32,(ZZ32, ZZ32)\].get decl=I at=I str=()` before it.
4. The bridge is written where `dumpOverloadedMethodChaining` finds the body shadowing the super method, through `generateForwardingFor`'s narrowing path. Way not taken: `dumpMethodChaining`, which forwards only bodies, and the super method here is abstract.
5. An operator's one tuple operand goes through `evalArg`, as a function's argument does (`emitFnApp`), and only where the operand is a tuple expression or of a tuple type, so no other operator's bytecode changes. Way not taken: a boxed operand, which changes every operator of a tuple parameter.
6. The twin's test is narrowed in the class loader. Ways not taken: no bridge in a generic template, which leaves the library's generic arrays without an implementation of the interface's boxed method (W15 stays); a twin skipped where the class already holds its name and descriptor, which needs a scan of the class's methods before it is written.
7. `castToTypeBelow` is not used at the bridge: each element is cast with `generalizedCastTo`, and the test's `self` case runs.
8. The tests that my change turned red are promoted, not left: rows 397 and 840. Way not taken: leave them for another rung, which keeps two red tests.
9. The postfix test uses `!` and `!!`, not the row's `:`: under walk, `pr:` beside the one library's `opr (x:(ZZ32,ZZ32)):` ran the library's (`FAIL: LeftRange2D(1,2, 1,1) =/= a ZZ32: 12`), so the test would not pass under walk with `:`.
10. The test of the indexed assignment writes the library's form, `opr[x: ZZ32, y: ZZ32] := (e: ZZ32)` beside the one over `I`, and `M3[(3, 4, 5)] := 6`: both paths refuse `m[i, j] := v` where the only subscripted assignment takes one tuple-typed index (below, for the curator).

## Defects and their homes

- Row 992, the method over a tuple index type: home 1, `TupleIndexMethodCompiled`.
- Row 832, the generic dotted method of one tuple parameter: home 1, `GenericMethodTupleParameterCompiled`.
- Row 819, the postfix operator on a tuple operand: home 1, `PostfixOperatorTupleOperandCompiled`.
- Row 397, the setter of a tuple-typed field: home 1, `TupleVarFieldCompiled` (promoted).
- Row 840, a component named `Tuple…`: home 1, `TupleNamedComponentGenericParam` (promoted).
- The class loader's twin duplicating a bridge in a generic template: made by this change's bridge and repaired in it, home 1, `TupleIndexMethodCompiled` (`G`, `Sel`).
- A program's postfix `:` at the one library's parameter types is not reached under walk, where its `#` is: a fact for row 237, whose claim is a component-level operator at a library operator's parameter types; the note is in `record.md`.
- Found by the skeptic's programs (SKEPTIC.md):
  - row 832's claim at a name whose other generic declaration has three parameters, `Two.tk[\ZZ32\]((8, 9))`: home 1, the skeptic's fix f0c76ac804, `GenericMethodTupleParameterCompiled`;
  - an object's dotted method overloaded at a pair and at another type, a `VerifyError` in its dispatch method, on the base too: home 2, `compiler_tests/XXXOverloadedMethodTupleParameterCompiled.test`, row NEW-T-1;
  - an object whose one value parameter is a pair, a `ClassCastException` in its constructor, on the base too: home 2, `compiler_tests/XXXObjectTupleValueParameterCompiled.test`, row NEW-T-2;
  - a generic operator over a type parameter applied to a pair, a `NoSuchMethodError` at the call, where the base's compile stopped: home 2, `compiler_tests/XXXGenericOperatorTupleOperandCompiled.test`, row NEW-T-3;
  - under walk, two generic dotted methods of one name that differ in their number of parameters, 'Cannot find definition for method': home 2, `tests/XXXGenericMethodOverloadArity.fss`, row NEW-T-4.

## For FACTS

See `record.md`. The fact: a compiled method's JVM parameters follow its declaration, and two bridges join an instance's boxed tuple to a body's elements, one written by the code generator, one by the class loader. Test: `compiler_tests/TupleIndexMethodCompiled.test`. Detail: this report, "The convention as built".

## Commands

- The old code's compiled tests in one JVM: `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base36 <tree>/tmp/old-caches-junit junit <tree>/ProjectFortress/compiler_tests/X.test …`.
- The classes of a template, whose names hold `⟦`, read by `javap` only under `LANG=C.UTF-8` and from a copy with a plain name.

## Questions for the curator

- Whether `m[i, j] := v` should reach a subscripted assignment `opr[i: I] := (v: E)` at a pair index, as `m[i, j]` reaches `opr[i: I]`. Both paths read the assignment's arguments as one list, the value and then each subscript: walk, 'The number of parameters (2) does not match with the number of arguments (3)'; the checker, '(ZZ32, (ZZ32, ZZ32))->() is not applicable to an argument of type (NaturalNumeral[\1,10,7\], NaturalNumeral[\1,10,5\], NaturalNumeral[\1,10,6\])', on `Cells[5, 6] := 7` for `opr[t: (ZZ32, ZZ32)] := (e: ZZ32)`. P-156 says that `m[i, j]` passes its tuple as one index; the one library declares `opr[x:ZZ32,y:ZZ32]:=(v:T)` beside the form over `I` for this (`Library/FortressLibrary.fss:2860`, `:3286`); `Specification/advanced/subscripting.tex`, section "Subscripted Assignment Operator Method Declarations", does not say how the bracketed list meets one tuple-typed parameter. Decision not taken: none of the three is changed.
