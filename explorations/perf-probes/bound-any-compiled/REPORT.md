<!-- A probe of what the compiled path (checker, code generator, class loader, run time) does with a tuple, an arrow and () as a static argument under the compile command's bound Object and under the bound Any, with the CompilerSystem tests and the compiled test tracks run under the bound Any. -->

# The bound `Any` on the compiled path: tuple, arrow and `()` static arguments

Base: `e0ec620a9` (code equal to `main`), worktree `/home/user/fortress-boundany` seeded from `/home/user/fortress-base23`, now removed. Machine: `nproc` 4, Intel Xeon @ 2.10 GHz, OpenJDK 25.0.4.1; the shape programs ran at `FORTRESS_THREADS=1`, the JUnit runs at 4.

## The answer in short

- **Under the bound `Any`, the compiled path handles tuple and arrow static arguments.** Generic functions, generic objects, generic traits, dispatch to a generic arm, and `typecase` all compile, load and run in every shape, with a written argument and an inferred one. They behave exactly as the same programs with `extends Any` written do today: the class loader makes the same classes by name, and the program jars are the same under `javap -p -c -s`.
- **`()` as a static argument fails at run time under both settings** with `AbstractMethodError`, whenever a parameter has the type variable's type. This is row 339, and it does not depend on the bound.
- **Probing found a new defect that does not depend on the bound.** A generic dotted method whose single parameter has a tuple type dies at the call with `ClassCastException`. The tuple type can be written, as `(U, U)`, or come from a tuple static argument.
- **The checker's refusals under the bound `Object` are row 412.** Some programs pass the checker under that bound, and they are rows 470 and 691. In particular, `q = id((3, 4))` compiles under the compile command as it is, and silently runs `id(3)`.
- **The 23 `.test` files that cover the importers of `CompilerSystem` pass under both settings.** They give `OK (138 tests)` each time, with the same verdict lines.
- **The whole compiled tracks under the bound `Any`:**
  - compiler track: 1315 tests, 12 failures, in 10 tests;
  - library track: 86 tests, 0 failures;
  - othercompiler track: 263 tests, 0 failures.
- **Every one of the 10 red tests is a test-side cost, not a code defect.** One is the expected promotion, three are pinned diagnostics that print the bound, four wrote `where [\E extends Object\]` as a workaround, one test's premise rests on the bound `Object`, and one hits the compiler prelude's `||` at `Object`.

## Setting (ii): the smallest way to turn the pre-desugaring off

`fortress compile`, `link` and `build` call `Shell.useCompilerLibraries()` (`ProjectFortress/src/com/sun/fortress/Shell.java:404-449`). Its first line, `setExtendsObjectPreDesugaring(true)` (`Shell.java:372`), sets the switch. `PreDisambiguationDesugaringVisitor.forStaticParam` reads that switch (`ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreDisambiguationDesugaringVisitor.java:195-208`). It is the only reader (grep for `ExtendsObjectPreDesugaring`). With the switch off, a static parameter with an empty `extends` clause keeps it empty. Its bound is then `Any`.

The rewriting of trait, object and object-expression `extends` clauses to `Object` is not under the switch (`:107-129`, called at `:163-190`). So under both settings every declared trait and object still extends `Object`. Only tuples, arrows and `()` lie outside `Object`.

The smallest change is that one line, set to `false`. For the probe I made it a property that defaults to `true` (the patch is at the end). That way both settings ran on one build:

- setting (i): the variable is unset, and the code path is that of `main`;
- setting (ii): `FORTRESS_PROBE_BOUND_OBJECT=false`.

The two settings also used different caches folders:

- **Setting (ii)'s caches.** Setting (ii) compiles the compiler's library under it too: I ran the library order into a private caches folder with the variable set. All five compiles exited 0, in 7, 23, 11, 2 and 2 s.
- **Setting (i)'s caches.**
  - The first 36 shape programs ran on the seeded build before the patch, against a copy of the seeded caches.
  - The later programs ran on the patched build with the variable unset, against a library order run on that build.
  - The two setting-(i) `fortress.CompilerLibrary.jar` files are byte-identical: 0 of 246 entries differ.

Proof that the variable reached each JVM:

- `XXXImplicitBoundAny` compiles and runs under (ii): `kind of a Seal at Any ->  Seal at Any`. Under (i) it is refused: `The static argument Any does not satisfy the corresponding bound Object.`
- In the JUnit runs, that test turns red under (ii), with `Saw wrong failure. compile`.

## The shapes by setting

Each shape was written twice: U has no `extends` clause, and A has `extends Any` written, as a control. W writes the static argument and I leaves it to inference. "AME" stands for `AbstractMethodError`, "CCE" for `ClassCastException`, and "refused" for a checker error. Every program that compiled also loaded its classes; a failure is named where it happened.

| shape | U under (i) | A under (i) | U and A under (ii) |
|---|---|---|---|
| `id` at a pair, W | compiles (row 470), runs `id pair:  3   4` | runs | both run, `id pair:  3   4` |
| `id` at a pair, I | refused at the binding below the call: 'Right-hand side has type IntLiteral, but left-hand side is a tuple of 2 variables.' The call took `id(3)` (row 691, below) | runs | both run |
| `id` at an arrow, W | compiles (row 470), runs `id arrow:  4` | runs | both run |
| `id` at an arrow, I | refused: '[\T extends Object\]T->T is not applicable to an argument of type ZZ32->ZZ32.' | runs | both run |
| `id` at `()`, W | compiles (row 470), dies AME (row 339) | dies AME | both die AME |
| `id` at `()`, I | refused: '... not applicable to an argument of type ().' | dies AME | both die AME |
| `Box` at a pair, W | refused: 'Ill-formed type: Box[\(ZZ32, ZZ32)\] The static argument (ZZ32, ZZ32) does not satisfy the corresponding bound Object.' | runs `box pair:  3   4`, `box type:  Box[\(ZZ32,ZZ32)\]` | both run, same output |
| `Box` at a pair, I | refused: 'Right-hand side has type IntLiteral, ...' (row 691) | runs, `box type:  Box[\(IntLiteral,IntLiteral)\]` | both run, same output |
| `Box` at an arrow, W and I | refused (ill-formed type; not applicable) | runs `box arrow:  4`, `Box[\ZZ32->ZZ32\]` | both run |
| `Box` at `()`, W and I | refused | dies AME | both die AME |
| trait `Holder` extended at a pair, an arrow, `()` | refused, 2 errors each: 'Ill-formed type: Holder[\(ZZ32, ZZ32)\]' and the like | all run: `trait pair:  3   4`, `trait arrow:  4`, `trait unit: done` | all run |
| `over[\T\](x: T)` beside `over(x: String)`, at a pair | refused at `over(p)`, line 11: '[\T extends Object\]T->String is not applicable to an argument of type (ZZ32, ZZ32).' Lines 10 (`over((3, 4))`) and 12 (written) pass | refused: 'A functional which takes a single parameter of a parametric type bound by Any cannot be overloaded.' | U runs: `over String:  String`, then `generic` for the literal pair, the pair variable and the written pair. A is refused as under (i) |
| the same overload, at an arrow and at `()` | refused, 2 errors | refused, as above | U: `over arrow:  generic`, then `over(())` dies AME. A refused |
| `typecase` on `Box[\(ZZ32,ZZ32)\]` against `Box[\ZZ32\]` | refused, 2 errors | runs `pair box is:  pair box`, `ZZ32 box is:  ZZ32 box`, `string is:  other` | both run, same output |
| generic dotted method `b.wrap[\U\](y: U)` at a pair, W and I | refused: W 'No such method Box[\ZZ32\].wrap.', I 'Right-hand side has type IntLiteral' | dies CCE (new defect) | both die CCE |
| the same method at an arrow, W and I | refused | runs `meth arrow:  4`, `Box[\ZZ32->ZZ32\]` | both run |

Two controls ran under setting (i) only:

- a generic method with a written tuple parameter, `first[\U\](y: (U, U))`, dies with CCE; beside it, `second[\U\](y: U, z: U)` prints `3`;
- a plain method `same(y: T)` of `Box[\(ZZ32,ZZ32)\]` runs: `same pair:  5   6`. It also runs under (ii).

Row 691's drop under (i), shown by one more program:

    id[\T\](x: T): T = x
    run(): () = do  q = id((3, 4)); r: ZZ32 = q + 1; println("q + 1 = " r)  end

- Under (i), the compile command as it is, it compiles and prints `q + 1 =  4`. The run method's bytecode pushes `iconst_3` alone and calls the closure `id⟦fortress|CompilerBuiltin%IntLiteral⟧`, so the `4` is dropped.
- Under (ii) it is refused: '(ZZ32, ZZ32)->ZZ32 is not applicable to an argument of type ((IntLiteral, IntLiteral), IntLiteral).'

The bound `Object` makes the pair unbindable to `T`. The checker then reads the pair as two arguments to a one-parameter generic and drops the second, as row 691 records for `g(a, a, a, a)`.

## What the class loader makes

I took these from each run's expanded classes (`-Dfortress.bytecodes.expanded.directory`, `ProjectFortress/src/com/sun/fortress/runtimeSystem/InstantiatingClassloader.java:83`) and read them with `javap -p -s -c`. Below, `FZZ32` stands for `com|sun|fortress|compiler|runtimeValues|FZZ32`.

- **The template carries no bound.** `Box⟦⟧` is compiled with `LT;` in its field and method descriptors. Its translation data holds the kind and the name only: `... object 1 4 type 1 T 0`. The U and A jars are the same under `javap`, and so are the setting-(i) and setting-(ii) jars of one program.
- **`Box` at a pair** gives two classes:
  - `BoxPairWU$\=Box⟦Tuple⟦FZZ32,FZZ32⟧⟧`, made from the static type. Its field is `L\=Tuple⟦FZZ32,FZZ32⟧;`. It has two constructors, `(L\=Tuple⟦…⟧;)V` and `(LFZZ32;LFZZ32;)V`.
  - Its twin `Box⟦ConcreteTuple⟦FZZ32,FZZ32⟧⟧`, made from the RTTI. `RTHelpers.getRTTIclass` names the class from each argument RTTI's `className()` (`runtimeSystem/RTHelpers.java:18-43`). A tuple RTTI calls itself `ConcreteTuple⟦…⟧` (`compiler/runtimeValues/TupleRTTI.java:43-49`).
  - Both classes take one interned RTTI, `Box$RTTIc.factory(Tuple*2$RTTIc.factory(FZZ32, FZZ32))`, so `typecase` works.
- **`Box` at an arrow** gives `Box⟦Arrow⟦FZZ32,FZZ32⟧⟧`, with the field `L\=Arrow⟦FZZ32,FZZ32⟧;`, and the twin `Box⟦AbstractArrow⟦…⟧⟧` (`ArrowRTTI.java:60-66`).
- **`id` at a pair** gives the closure `IdPairWU⚙$\=id⟦Tuple⟦FZZ32,FZZ32⟧⟧✉$✚Arrow⟦T,T⟧ extends \=AbstractArrow⟦Tuple⟦…⟧,Tuple⟦…⟧⟧`. It has `apply(L\=Tuple⟦…⟧;)L\=Tuple⟦…⟧;` and a spread `apply(LFZZ32;LFZZ32;)…`, because the arrow class reads a tuple domain as that many parameters.
- **`id` at an arrow** gives the closure `id⟦Arrow⟦FZZ32,FZZ32⟧⟧`, whose method is `apply(L\=Arrow⟦…⟧;)L\=Arrow⟦…⟧;`.
- **The trait** gives `TraitPairU$\=Holder⟦Tuple⟦FZZ32,FZZ32⟧⟧`, `Holder⟦Arrow⟦…⟧⟧` and `Holder⟦☃⟧`, each with its `$DefaultTraitMethods`.
- **`()`** gives `Box⟦☃⟧` and `IdUnitWA⚙$id⟦☃⟧✉$✚Arrow⟦T,T⟧ extends AbstractArrow⟦☃,☃⟧`. That closure defines `apply(Lcom/sun/fortress/compiler/runtimeValues/FVoid;)LFVoid;`. The interface `Arrow⟦☃,☃⟧` declares `apply()LFVoid;`. Hence the AME of row 339.
- **The class lists are equal across the settings.** For each of 14 shape pairs, the A program under (i) and the U program under (ii) make the same classes by name, 6 to 32 each.

## The CompilerSystem tests, and the compiled tracks, under (ii) against (i)

27 components of `compiler_tests/` import `CompilerSystem`, and one more in `other_compiler_tests/` (grep `import CompilerSystem`; `library_tests/` has none). 25 of them have `.test` files: 23 files, with `Compiled7.test`, `Compiled90.test` and `AfterTypeChecking.test` covering several components each.

I ran them as one call of `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh <label> ProjectFortress/compiler_tests Compiled2.test XXX2h.test … AfterTypeChecking.test`, once per setting:

    (ii)  OK (138 tests)
    (i)   OK (138 tests)

Every verdict line is the same. The whole outputs differ only in timings and in the order of one line of `Compiled7`'s output at four threads. The three importers without a `.test` file give the same result under both settings when compiled directly:

- `Compiled220` runs and prints `3`;
- `Compiled250` is refused, 'Invalid overloading of f';
- `Compiled2PreTest3` dies on `args[0]` with no arguments.

The larger measurement was `ant testQuick` with `FORTRESS_PROBE_BOUND_OBJECT=false`. Ant's `junit` forks inherit the variable, and the red `XXXImplicitBoundAny` shows that they did:

    library        Tests run: 86, Failures: 0
    othercompiler  Tests run: 263, Failures: 0
    compiler       Tests run: 1315, Failures: 12, Errors: 0     BUILD FAILED

The counts equal the last gate's (`explorations/compile-ladder/climb-batch-22/gate/summary.txt`, 1315/86/263, all 0). That gate ran on code equal to the base's. The same 10 tests (12 JUnit failures) fail again under (ii) through `junit.sh`, and pass under (i) on the same build: `OK (12 tests)`. They fall into five groups:

| test | under (ii) | kind |
|---|---|---|
| `XXXImplicitBoundAny` | compiles: 'Saw wrong failure' | the promotion that row 412's fix owes |
| `XXX6bu`, `XXX6bv` (`Compiled6.bu`, `.bv`) | the same refusal, now printed `[\T\](T, T)->T` where `compile_err_equals` pins `[\T extends Object\]` | pinned text |
| `XXXInferCallArgumentControls` | the same 4 errors; the fourth now reads `BoxT[\Any\]` where the regex pins `BoxT[\Object\]` (the result-only parameter takes its bound, P-48) | pinned text |
| `OpenTypeChecker`, `ComprisesWhereFunctionalMethodChecker`, `ComprisesWhereOverrideChecker`, `XXXComprisesWhereFunctionalMethodBounds` | 'Invalid comprises clause: AnyBox has a comprises clause but its immediate subtype Box is not eligible to extend it.' | see below |
| `XXXOverrideGenericReturnTypeNotSubtype` | 1 error where it pins 2 | see below |
| `CoercionGenericFnCompiledRungC` (compile, link, run) | '(String, Object)->String is not applicable to an argument of type (String, T).' | see below |

The last three groups:

- **The four `comprises` tests** list `Box[\E\]` with `where [\E extends Object\]`, while `Box`'s own `E` is unbounded. Under (i), the pre-desugaring makes the two agree. Under (ii), `Box[\E\]` at an `E` outside `Object` is not covered.
  - Written `where [\E\]`, as the one library writes `AnyList comprises List[\E\] where [\E\]`, `OpenTypeChecker` passes the checker under (ii). Its compile then stops at the code generator's refusal of the trait's `where` clause (row 701), which is a typecheck test's normal end.
  - Under (i), that form is refused: 'The static argument E does not satisfy the corresponding bound Object.' So the tests wrote `Object` as a workaround for row 412.
- **`XXXOverrideGenericReturnTypeNotSubtype`** has `override f(x: Any): ZZ32` beside the inherited `f[\T\](x: T): T`.
  - Under (i), `T`'s domain is `Object`, which is strictly narrower than `Any`. So the declaration overrides, and its return type is refused.
  - Under (ii), the two domains are equal, so nothing is overridden. The rule then wants a refusal of an `override` that overrides nothing, which the checker never gives (row 653).
  - The test's premise rests on the bound `Object`.
- **`CoercionGenericFnCompiledRungC`'s** `"…" || y` has `y: T` unbounded. The compiler prelude's String `||` takes `Object` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:38`). The one library has `opr ||(a:String, b:Any)` (`Library/FortressLibrary.fsi:2528`). This is a prelude limit that lasts until the switch-over.

Library jars under (ii) against (i), on the same build:

- `AnyType`, `CompilerBuiltin` (278 entries), `CompilerAlgebra` and `CompilerSystem` are byte-identical.
- 6 of `CompilerLibrary`'s 246 entries differ: `FilteredRange`, `GeneratorZZ32$DefaultTraitMethods`, `SeqGenZZ32`, `SeqGeneratorZZ32$DefaultTraitMethods`, `CompilerLibrary.class` and `Just`'s `nest` closure.
  - The dispatch tests the `ReductionString` and `ReductionZZ32` arms of `generate`, `seqgenerate` and `__generate` in the other order.
  - In `nest`, the run-time inference code orders the operands of `runtimeSupertypeOf` differently and keeps another RTTI. That code reads the bound (`ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:1500-1524`).
- Each setting is deterministic: two library orders under (ii) gave the same bytes, and so did (i) seeded and rebuilt.
- No test showed the difference.

## What the code shows for each failure, and its row

- **`()` (row 339).** The template's `apply(LT;)` becomes `apply(LFVoid;)`. The arrow interface instantiated at `Arrow⟦☃,R⟧` reads the slot `☃` as an empty domain. That is the void cases at `InstantiatingClassloader.java:604-605`, `:1009-1010`, `:1116` and `:1229`.
  - `NamingCzar` writes `☃` both for a parameterless arrow (`ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:1155-1170`) and for the tuple type `()` (`:1259-1260`). So one parameter of type `()` and no parameter share one spelling.
  - For a tuple domain, the class loader adds the spread `apply`. For `()`, it adds no nullary bridge.
  - The `javap` above confirms the row's "unverified reading". This is independent of the bound: A under (i) fails alike.
- **A generic dotted method with a single tuple-typed parameter: new, no row.**
  - `CodeGen.receiverPrependedDomainType` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:6250-6263`) builds the domain of the closure that the call casts to. Where the method's domain is a tuple type, it prepends the receiver to the tuple's elements. It cannot tell a single parameter of tuple type from several parameters. The team's comment there reads: 'I think we start to have a problem here in the future, when generics can be parametrized by tuples.'
  - So `b.wrap[\(ZZ32,ZZ32)\]((2, 3))` casts to the three-place `AbstractArrow⟦Tuple⟦Box⟦FZZ32⟧,FZZ32,FZZ32⟧,…⟧` (`emitFindGenericMethodClosure`, `:6316-6355`) and calls a three-argument `apply`.
  - The class loader makes the closure from the template `Arrow⟦Tuple⟦☝,U⟧,Box⟦U⟧⟧`, at `U := Tuple⟦FZZ32,FZZ32⟧`. That is a two-place arrow whose second place is a pair.
  - First stack lines:

        java.lang.ClassCastException: class MethPairWU⚙$\=Box☝wrap⟦…⟧✉$\=✚Arrow⟦Tuple⟦☝,U⟧,MethPairWU%Box⟦U⟧⟧ cannot be cast to class \=Arrow⟦Tuple⟦java|lang|Object,java|lang|Object,java|lang|Object⟧,java|lang|Object⟧
          at \=AbstractArrow⟦Tuple⟦MethPairWU%Box⟦FZZ32⟧,FZZ32,FZZ32⟧,MethPairWU%Box⟦Tuple⟦FZZ32,FZZ32⟧⟧⟧.castTo(Unknown Source)
          at MethPairWU.run(MethPairWU.fss:11)

  - The same program with `extends Any` written dies alike under (i). So does `first[\U\](y: (U, U))` called as `b.first[\ZZ32\]((2, 3))`, which needs no tuple static argument.
  - Walk runs both: `one tuple parameter: 2`, `meth pair: 2 3`.
  - A plain method of a tuple-instantiated object (`same(y: T)`) and a top-level generic function at a pair run.
  - The one library's exposure looks small by a rough grep. Of 162 one-line, indented generic declarations in `Library/*.fsi`, none has a single parameter, besides `self`, whose type is a bare type variable or a tuple.
- **Under (i) only (rows 412, 470 and 691).**
  - The refusals in the table are row 412.
  - The written static arguments that pass are row 470: a top-level call's written static argument is not checked against its bound.
  - The drop of the pair's second element is row 691. The bound `Object` reaches it, and the bound `Any` does not (above).
- **The single-parameter overload rule.** `OverloadingChecker.checkBoundAny` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:469-472`, `:524-533`) refuses only an `extends Any` that is written, and so does walk (`interpreter/evaluator/values/OverloadedFunction.java:666-684`). An empty clause is exempt, as the specification says (F-174). Under (ii), `over[\T\](x: T)` beside `over(x: String)` is therefore valid and runs. This is no cost.

## How the compiled run time represents these types, and what ties them to `java.lang.Object`

- **`Any` on the JVM is the interface `fortress.AnyType$Any`** (`NamingCzar.java:138-140`). The following implement it:
  - every value class, through `FValue` (`compiler/runtimeValues/FValue.java:14`);
  - every tuple interface `AnyTuple⟦n⟧` (`InstantiatingClassloader.java:1676-1700`);
  - the erased arrow interfaces (`:990`).
- **A tuple at run time:**
  - the value is a `ConcreteTuple⟦…⟧` class, which extends `AnyConcreteTuple⟦n⟧` and implements `Tuple⟦…⟧`, below `AnyTuple⟦n⟧`;
  - `Tuple⟦…⟧` has typed getters `e1…eN`, and `AnyTuple⟦n⟧` has untyped `o1…oN` getters returning `java.lang.Object`;
  - its RTTI is `Tuple*n$RTTIc.factory(elements)`, which is covariant (`TupleRTTI.java:26-40`).
  - No tuple is a `fortress.CompilerBuiltin$Object`.
- **An arrow at run time:**
  - a closure extends `AbstractArrow⟦…⟧` and implements `Arrow⟦…⟧`, which extends the erased `Arrow⟦java|lang|Object,…⟧`, whose `apply` is `(Ljava/lang/Object;…)Ljava/lang/Object;`;
  - its RTTI is `Arrow*n$RTTIc.factory`, contravariant in the domain (`ArrowRTTI.java:41-57`).
  - An arrow class whose parameters contain `java/lang/Object` gets a `JavaRTTI(Object.class)` (`InstantiatingClassloader.java:1546-1552`; `runtimeSystem/InitializedStaticField.java:68-92`). Its `runtimeSupertypeOf` is always false (`compiler/runtimeValues/JavaRTTI.java:12`).
- **`()`** is `FVoid`, an `FValue` (`compiler/runtimeValues/FVoid.java`), with `VoidRTTI`. In class names it is `☃`, and in descriptors it is `Lcom/sun/fortress/compiler/runtimeValues/FVoid;`.
- **`Bottom`** erases to `java/lang/Object` (`NamingCzar.java:1297-1306`).
- **The code generator ties an empty `extends` clause to `Object`.** `FnNameInfo.boundsFor` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/FnNameInfo.java:168-182`) erases such a parameter to the Fortress trait `Object` when it names a generic method (`NamingCzar.genericMethodName`, `:799-806`). Under (ii) the call reads `wrap☝✖Arrow⟦fortress|CompilerBuiltin%Object,…⟧`.
  - The name is only a name: the declaration and the call compute it the same way.
  - A written `extends Any` gives another name. An api and its users compiled under different settings would therefore still agree.
- **Java interoperability.** The native-wrapper mapping types a Java `java.lang.Object` as Fortress `Any` (`NamingCzar.java:447`), and `Lfortress/AnyType$Any;` as `Any` (`:333-336`). A native that is declared over `Object` or `Any` therefore already takes tuples, arrows and `()` by type. No run was made through a native with such a value.

## What the switch to `Any` would cost, in rungs (my reading)

- **One small rung for the switch itself.** It needs:
  - `Shell.java:372` set to `false` (walk already runs with it off, `Shell.java:380`);
  - the promotion of `XXXImplicitBoundAny` (row 412);
  - three pinned diagnostics rewritten;
  - the four `comprises` tests' `where [\E extends Object\]` written `where [\E\]`;
  - `XXXOverrideGenericReturnTypeNotSubtype`'s premise rewritten (row 653 surfaces);
  - `CoercionGenericFnCompiledRungC` given `T extends Object` until the switch-over, or left red until then.

  These touch 10 test files and no production code beyond the line. The 23 `CompilerSystem` tests need nothing.
- **No cost found for tuple or arrow static arguments in the shapes asked for.** They run under (ii) exactly as they run today with `extends Any` written.
- **Two run-time rungs that the bound does not cause, but that more programs reach once static parameters take tuples and `()`:**
  - row 339 (`()`);
  - the new tuple-domain defect of generic dotted methods.

  Each is one code-generator or class-loader rung. Neither shows in the compiled tracks.
- **The library's dispatch code changes in 6 classes**, deterministically, with no test showing it.

## What I could not measure

- **The one library on the compiled path.** The switch-over is not done. So its own instantiations at tuples, such as arrays indexed by `(ZZ32,ZZ32)`, did not run compiled; the shapes stand in.
- **The rest of the gate under (ii).** The misc track, `testSystem`, `testSpecData`, the ladder regression, the atomic runs and the demos were not run. By code reading, walk is unaffected: `useInterpreterLibraries` already turns the switch off.
- **The count stage.** F-289's 685 was not rerun.
- **Shapes left out:**
  - generic functional methods (with `self`) and inherited generic methods, at tuple arguments;
  - tuples of three or more elements, nested tuples, and arrows with tuple domains;
  - varargs and keywords, which the code generator refuses (`NamingCzar.java:1262-1265`);
  - a native receiving a tuple.
- **Thread counts.** The shapes ran at one thread only.

## Defects

1. New (codegen), compiled path only; walk runs it. A generic dotted method whose single parameter's type is a tuple, written or from a tuple static argument, dies at the call with `ClassCastException` in `castTo`. Reproducer: `object Box[\T\](x: T) first[\U\](y: (U, U)): U = do (a, c) = y; a end end` with `Box[\ZZ32\](1).first[\ZZ32\]((2, 3))`. Cause: `CodeGen.java:6250-6263` (above). This needs a new row in "12. The compiled path".
2. Row 339, confirmed by `javap`. The closure defines `apply(LFVoid;)`, and the interface `Arrow⟦☃,☃⟧` wants `apply()`. It occurs under both settings, and a dispatched generic arm reaches it too (`over(())`). The row's "unverified reading" can drop "unverified".
3. Row 691, reached by row 412: under the compile command as it is, `q = id((3, 4))` for `id[\T\](x: T)` compiles and runs `id(3)`, printing `q + 1 =  4`. This is a note for row 691 or row 412.
4. Row 470 is seen as `id[\(ZZ32,ZZ32)\]` and `id[\ZZ32 -> ZZ32\]`, which compile and run under the bound `Object`.

## Decisions

- **The patch form.** I made the patch a property defaulting to `true` rather than a hard `false`, so that the two settings ran on one build. The alternative was a hard `false`, with the old code run through `old-fortress.sh` for setting (i). With the variable unset, the code path is the compile command's own.
- **Setting (ii) includes the compiler's library compiled under (ii).** The alternative was programs under (ii) against a library analysed under (i). That would mix the bounds of the apis that the programs read.
- **Setting (i) of the 27 is taken from the gate.** The brief and the skill take the tree as passing. I ran it once more on the same build only as a control for the private caches folder, and it gave the same `OK (138 tests)`.
- No decision of the curator covers these choices.

## For FACTS

1. **The compiled path's run time handles tuple and arrow static arguments under the bound `Any`.**
   - The fact: with the pre-desugaring off, generic functions, objects, traits, dispatch to a generic arm and `typecase` at a pair or an arrow compile and run. They make the same classes and the same program bytecode as with `extends Any` written.
   - What it means: the switch to the bound `Any` costs the compiled path no run-time work for these shapes.
   - Shown by: the table above (command under "Commands"; no gated test).
   - Detail: "The shapes by setting" and "What the class loader makes".
2. **Under the bound `Any`, the compiled tracks give 12 failures in 10 tests of `CompilerJUTest`, and none in the library and othercompiler tracks. The 23 `CompilerSystem` `.test` files pass.**
   - What it means: the switch is one rung of test repair.
   - Numbers: 12 = 1 promotion, 3 pinned texts, 4 `comprises` workarounds, 1 premise (row 653), and 3 for one prelude limit (row 412's sibling, the prelude's `||` at `Object`).
   - Shown by: `FORTRESS_PROBE_BOUND_OBJECT=false ant testQuick` with the patch.
   - Detail: "The CompilerSystem tests, and the compiled tracks".
3. **`()` as a static argument fails at run time on the compiled path whatever the bound (row 339).** Detail: "What the code shows".

## Commands worked out

- **The setting switch.** The patch below, then `ant compileAll`. Then run the library order into a private folder with `FORTRESS_PROBE_BOUND_OBJECT=false FORTRESS_CACHES=<abs folder>`, the five `bin/fortress compile` lines of `build-and-caches.md`. `FORTRESS_CACHES` must be absolute: a relative one is read from `ProjectFortress/`, and the run then falls back to the bootstrap stubs with `NoSuchMethodError … coerce_ZZ32`.
- **The instantiated classes of a run.** `JAVA_FLAGS="… -Dfortress.bytecodes.expanded.directory=<dir>" bin/fortress run P` writes `<dir>/expanded.jar`, also when the run dies (`MainWrapper.java:66-71`). The entry names hold backslashes, so read them with Python's `zipfile` rather than `unzip`, writing each class to a plain file name for `javap -p -s -c`.
- **Both settings of the 27.** `FORTRESS_PROBE_BOUND_OBJECT=false FORTRESS_CACHES=<abs folder> ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh any ProjectFortress/compiler_tests <the 23 .test files>`, and the same without the variable, with the setting-(i) folder.

## Questions for the curator

- **When does the bound `Any` reach `fortress compile`?** Alternatives:
  - now, as its own rung, with the 10 test edits above;
  - at the switch-over, with the one library.

  Evidence: this report's track run. No decision covers it. P-42 says that the switch-over ends the departure, and F-289 says that the zero needs it.
- **What happens to `CoercionGenericFnCompiledRungC` if the bound changes before the switch-over?** Alternatives:
  - write `T extends Object` in the test;
  - make it an `XXX` test that names the prelude's `||`;
  - keep the bound `Object` until the switch-over.

## The probe-only patch (not landed)

```diff
--- a/ProjectFortress/src/com/sun/fortress/Shell.java
+++ b/ProjectFortress/src/com/sun/fortress/Shell.java
@@ -369,7 +369,7 @@ public final class Shell {
     }
 
     public static void useCompilerLibraries() {
-	setExtendsObjectPreDesugaring(true);
+	setExtendsObjectPreDesugaring(ProjectProperties.getBoolean("fortress.probe.bound.object", true)); // PROBE ONLY: FORTRESS_PROBE_BOUND_OBJECT=false gives the bound Any
 	setAssignmentPreDesugaring(false);
 	setAssignmentDesugaring(true);
         WellKnownNames.useCompilerLibraries();
```

The landing form would be `setExtendsObjectPreDesugaring(false);` on that line.
