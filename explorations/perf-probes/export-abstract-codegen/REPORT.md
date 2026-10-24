<!-- This is the probe report on ledger row 816's third way: reading (1) of the export check kept, with the code generator closing the run-time failure, measured on the compiled path with the compiler's own prelude. Probe worker, 2026-10-24. Worktree `/home/user/fortress-probe816`, seeded from `/home/user/fortress-base22` (detached at `08c95c708`; `git diff --stat 08c95c708 4d131544b -- ProjectFortress/src ProjectFortress/astgen build.xml` is empty, so its compiler code is `main`'s). Nothing in the main tree changed and nothing was committed. The worktree is left in place: the shadow edit is uncommitted, the four test files are marked intent-to-add (`git add -N`, so that `git diff` shows them), the build is the shadow's and the caches hold the shadow's library order. Machine: nproc 4, Intel Xeon @ 2.10 GHz, openjdk 25.0.4.1. No timings are given. -->

# Row 816's third way: the export check's reading (1), with the code generator closing the failure

## In short

- **Row 816's program dies even when `O` defines `f`.** The client's call is `invokeinterface P816Api$T.f()`. The interface `P816Api$T` is the component's class, and it declares only the members of the component's trait, so JVM resolution fails before the receiver's class `O` is looked at.
- **The smallest change is in the code generator.** The component's trait interface also declares, abstract, every method that the exported api's trait of the same name declares and the component's trait does not. That is about 30 lines in `CodeGen.java`, and the patch is at the end.
  - The new compiled test `ExportAbstractMemberCall` failed through the harness on the base and passed with the shadow.
  - `ant testQuick`: compiler 1317, library 86, othercompiler 263, with no failures (the base's gate had 1315 / 86 / 263; the two extra tests are the new test's link and run).
  - The shadow adds no method to any class of the compiler's prelude.
- **The change closes 5 of the 9 failing shapes I measured.** These are: a plain method, a getter, a generic trait, a body from a sub-trait, and a body from a second trait in the `extends` list.
- **It leaves 4 shapes failing:**
  - `AbstractMethodError` when no object defines the member (row 816's own program, which the checker accepts);
  - `AbstractMethodError` when the component's trait declares the member at another header;
  - `AbstractMethodError` when the object narrows the return type, because no bridge method is emitted;
  - `NoSuchMethodError` for a functional method, because no static wrapper is emitted.
- **Walk needs nothing.** It finds the method on the object by name.
- **The library's 12 members:**
  - Any program can call all 12 through the trait's type.
  - 3 of them (`ActualReduction`'s `empty` and `join`, `AnyMaybe`'s `holds`) already resolve on the base, through a parent trait of the component that declares them at the same JVM descriptor.
  - The third way would close `String`'s 7 and `Range`'s `isEmpty`.
  - It would not close `ReadableArray`'s `opr[_:TrivialOpenRange]`: the objects narrow its return type, which is the bridge case above.

## 1. Row 816's program on the compiled path

**The programs.** They are the brief's: `tmp/p1/P816Api.fsi`, `P816Api.fss` and `P816.fss`. The api is `trait T abstract f(): ZZ32 end` with `mk(): T`. The component is `trait T end`, `object O extends T f(): ZZ32 = 3 end` and `mk(): T = O`. The client is `println(mk().f())`.

    cd tmp/p1 && ../../bin/fortress compile P816.fss; ../../bin/fortress link P816.fss; ../../bin/fortress run P816
    rc=0
    rc=0
    REACHED
    Caused by: java.lang.NoSuchMethodError: 'com.sun.fortress.compiler.runtimeValues.FZZ32 P816Api$T.f()'

So the run dies with `NoSuchMethodError` even though `O` defines `f`.

**The bytecode** (`javap -c -p` on the two jars that the compile wrote into the private caches folder):

- The client's call, `P816.run()`:

      9: invokestatic  #57    // Method P816Api.mk:()LP816Api$T;
      12: invokeinterface #63, 1  // InterfaceMethod P816Api$T.f:()Lcom/sun/fortress/compiler/runtimeValues/FZZ32;

- The component's interface declares no `f`:

      public interface P816Api$T extends fortress.CompilerBuiltin$Object {
        public static final com.sun.fortress.compiler.runtimeValues.RTTI RTTI;
        static {};
      }

- The object has it: `public final class P816Api$O extends P816Api$T$DefaultTraitMethods implements P816Api$T`, with `public FZZ32 f()` forwarding to `f♙()` (the plain name dispatches to the mangled one).
- The springboard `P816Api$T$DefaultTraitMethods` has only its constructor.
- `P816Api.mk()` returns `P816Api$O.ONLY`.

**Which owner the call names, and why.**

- The client's code generator emits a plain dotted call through `methodCall` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:6230-6236`).
- It picks `INVOKEINTERFACE` because the receiver's type constructor is a `TraitDecl` (`CodeGen.java:608-613`).
- It names the owner `NamingCzar.jvmTypeDesc(receiverType, ...)`, the static type `P816Api.T` → `P816Api$T` (`CodeGen.java:614-615`).
- The api has no classes of its own (section 2). `P816Api$T` is the component's interface, because a component has its api's name (compiler.md, "Traps"; ledger row 320).

**Why resolution fails.** Interface method resolution (JVMS §5.4.3.4) looks for `f:()FZZ32` in the named interface `P816Api$T`, then in `java.lang.Object`, then in the superinterfaces (`fortress.CompilerBuiltin$Object`). None declares it, so the result is `NoSuchMethodError`. Selection on the receiver's class (§5.4.6), which would find `O.f()`, comes only after resolution succeeds. That is why `O`'s definition does not help.

## 2. Where the code generator emits a trait's interface, and what it can read of the api

**The trait's classes.** `forTraitDecl` (`CodeGen.java:5011`) emits three classes for each trait:

- **The interface:** `cw.visit(..., ACC_PUBLIC | ACC_ABSTRACT | ACC_INTERFACE, cnb.className, ...)` at `:5085-5087`, then `dumpTraitMethodSigs(header.getDecls())` at `:5089`. That method (`:6799-6841`) writes two abstract methods for each `FnDecl` of the component's own trait: the plain name and the mangled one (`:6835`, `:6838`), or, for a generic method, its closure finder (`:6814-6821`).
- **The springboard `$DefaultTraitMethods`:** `:5113-5114`, filled by `newcg.dumpTraitDecls` and `dumpMethodChaining` at `:5136-5137`.
- **The top-level functional-method wrappers:** `:5157-5161`.

The RTTI interface is emitted at `:5282`. The erased-generics interface at `:4609` is switched off (`EMIT_ERASED_GENERICS = false`, `:208`).

**Objects.** `forObjectDecl` (`:4033`) gets its forwarding and bridge methods from `dumpOverloadedMethodChaining` (`:4388`) and `dumpMethodChaining` (`:4405`). The inherited methods come from `STypesUtil.properlyInheritedMethodsNotIdenticallyCovered(..., typeAnalyzer)` (`:1094-1095`). That type analyzer is built over the component's own `TraitTable(ci, apiEnv)` (`compiler/phases/CodeGenerationPhase.java:179`), so it sees the component's trait, not the api's.

**Apis are not compiled to classes.** `CodeGenerationPhase.execute` loops over the apis only to generate wrappers for foreign Java apis (`CodeGenerationPhase.java:77-92`). It runs `new CodeGen(...)` once per component (`:120-196`). The compile of `P816` wrote `P816.jar` and `P816Api.jar` (the component) into the caches, and no api jar.

**What the component's code generation can read of its api.** CodeGen receives `apiEnv`, the union of the repository's apis and this run's analyzed apis (`CodeGenerationPhase.java:75`, `:195`). It stores it (`CodeGen.java:542`) and already reads the exported apis' functions through `env.api(apiname)` (`:425-450`; the comment at `:417-422` says that use "looks like ... currently unused"). It also reads `env.apis()` at `:3795`, `:5999` and `:6567`.

The api's `ApiIndex.typeConses()` holds each trait's `TraitIndex`, whose `ast()` is the api's `TraitDecl` after the api's own desugaring (`compiler/phases/DesugarPhase.java:37`, `desugarApis`). So a getter arrives as a `FnDecl`: variant V4 below works through it.

## 3. The smallest change, its test, and the tracks

**The change** (patch at the end). `dumpTraitMethodSigs(decls)` keeps a set of the name and descriptor of each method it writes. It then calls a new `dumpExportedTraitMethodSigs` (worktree `CodeGen.java:6799-6824`). That method finds, for each api in `component.getExports()`, the trait of the same name in `env.api(apiname).typeConses()`. It writes that trait's `FnDecl`s, abstract, through the same code, skipping any name and descriptor already written and any non-`FnDecl`.

The other ways I considered:

- **The client naming another owner.** No class declares `f` but the objects, and the client knows only the api, so this would need `invokedynamic` or reflection.
- **Copying the api's members into the component's trait before the checker.** That is reading (2) by another route.

**The test, written first, failing through the harness on the base code.** It is four files in `ProjectFortress/compiler_tests/`: `ExportAbstractMemberCallApi.fsi`, `ExportAbstractMemberCallApi.fss`, `ExportAbstractMemberCall.fss` and `ExportAbstractMemberCall.test` (`link`, `run`, `run_out_contains=PASS`).

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh before ProjectFortress/compiler_tests ExportAbstractMemberCall.test
    . run ProjectFortress/compiler_tests/ExportAbstractMemberCall (243ms) REACHED
    Caused by: java.lang.NoSuchMethodError: 'com.sun.fortress.compiler.runtimeValues.FZZ32 ExportAbstractMemberCallApi$T.f()'
    Failed to satisfy run_out_contains; expected
    Tests run: 2,  Failures: 1,  Errors: 0

**The pass, after `ant compileAll`** (which printed `Caches .../default_repository/caches started again, empty`) **and the library order** (five compiles, rc 0 each, five jars):

    ONE_JVM=1 .../junit.sh after ProjectFortress/compiler_tests ExportAbstractMemberCall.test ExportAbstractMemberAbsent.test ExportAbstractMemberDefined.test
    . run ProjectFortress/compiler_tests/ExportAbstractMemberCall (274ms) REACHED
    PASS
    OK (4 tests)

With the shadow, the interface reads:

    public interface P816Api$T extends fortress.CompilerBuiltin$Object {
      public abstract FZZ32 f();
      public abstract FZZ32 f♙();

**The tracks the change can reach.** These are every compiled test: `ant testQuick`, run once after the last code edit.

    ant testQuick   →   BUILD SUCCESSFUL   (Caches .../default_repository/caches kept)
    fast-compiler       CompilerJUTest       Tests run: 1317, Failures: 0, Errors: 0
    fast-library        LibraryJUTest        Tests run: 86, Failures: 0, Errors: 0
    fast-othercompiler  OtherCompilerJUTest  Tests run: 263, Failures: 0, Errors: 0

The base is `explorations/compile-ladder/climb-batch-22/gate/summary.txt`: 1315, 86, 263. The +2 are the new test's link and run. The misc and system tracks do not run compiled code generation for Fortress programs, so I did not run them.

**The prelude is unchanged.** I compared the methods (name, descriptor, abstract flag) of every class in the five library jars, base build against shadow, with a class-file parser (Python) in the scratchpad. The differing lines: CompilerSystem 0/2 classes, AnyType 0/1, CompilerAlgebra 0/19, CompilerBuiltin 0/227, CompilerLibrary 0/213. So every api trait member of the prelude is already declared at the same JVM name and descriptor by its component's trait, and the shadow writes nothing there.

**Nine further shapes**, each with the base code (`old`) and the shadow (`new`). They are in `tmp/v2` … `tmp/v13`, run by `tmp/runv.sh` and `tmp/oldv.sh`, each with link rc 0 unless stated:

| shape | old | new |
|---|---|---|
| V2: row 816's own program, `O` leaves `f` out | NSME `V2Api$T.f()` | AME: "Receiver class V2Api$O does not define or inherit an implementation of the resolved method 'abstract ... f()' of interface V2Api$T" |
| V3: component's `T` declares `f(): String = "other header"` | NSME | AME |
| V4: `abstract getter g(): ZZ32`, object `getter g` | NSME `V4Api$T.g()` | prints 4 |
| V5: functional `abstract h(self): ZZ32`, object `h(self)` | NSME `V5Api.h(V5Api$T)` | the same NSME |
| V6: body from `trait U extends T` | NSME | prints 6 |
| V7: generic `trait G[\X\] abstract f(): X`, `object Gobj[\X\](x: X)` | NSME on the template's interface | prints 7 |
| V8: `abstract f(): T`, object `f(): O = O` (return type narrowed) | NSME `V8Api$T.f()` | AME on `'abstract V8Api$T f()'` |
| V9: body from the second trait, `object O extends {W, U}` | NSME | prints 9 |
| V10: reading (2)'s shape, the component's `T` declares `f(): T`, object `f(): O` | prints 10 | prints 10 |
| V11: generic `Q[\R,L\] extends P[\L\]`; the api's `Q` re-declares `abstract e(): L`; the component's `P` declares it, its `Q` does not | prints 11 | prints 11 |
| V12: the same with a getter `h(): Boolean` | prints 12 | prints 12 |
| V13: reading (2)'s shape, the component's `T` declares `f(): ZZ32` bodyless, `O` leaves it out (old code only) | refused: "The inherited abstract method f():ZZ32 from the trait V13Api.T has no concrete implementation in the object O in component V13Api." | — |

What the shapes show:

- **V8 against V10.** In V10 the object `O` has the bridge `public V10Api$T f()` beside `public V10Api$O f()`, because the component's trait declares `f`. In V8 the object has only `V8Api$O f()`, because the bridge comes from `dumpOverloadedMethodChaining` over the component's traits (`CodeGen.java:1094-1095`).
- **V5.** A functional method is called through the static wrapper `V5Api.h(V5Api$T)`, which `forTraitDecl` emits only for the component's own trait declarations (`:5157-5161`). Its overloads come from `ci.functions()` (`:455`).
- **V11 and V12.** Where a parent trait in the component declares the member at the same descriptor, resolution succeeds on the base through the superinterface.

## 4. Walk

Walk needs nothing for these programs. `DottedMethodApplication.make` looks the method name up in the receiver object's own environment, `self.getSelfEnv().getLeafValueNull(mname)` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/DottedMethodApplication.java:61-64`). No trait, api or component declaration is on that path.

Under the base build's walk (`tmp/walkv.sh`, through `old-fortress.sh` with a private caches folder):

- P816 prints 3, and V4 to V12 print 4 to 12.
- V2 stops at the call: "Cannot find definition for method f given receiver O" (`DottedMethodApplication.java:104`).
- V3 prints "other header": walk runs the component's `f(): String` where the api promises a `ZZ32`.
- V13 is refused at load: "Object O does not define an abstract method declared in type T".

## 5. The library's 12 members

I read `main`'s library, which holds the batch-22 landing. All 12 are public members of exported traits in `Library/FortressLibrary.fsi`, which every program imports, so any program outside the library can write the call through the trait's type. Once compiled, what it would do:

- **`String`'s seven** (api `FortressLibrary.fsi:2453` `depth`, `:2455` `isBalanced`, `:2459` `verify`, `:2480` `rangeContains`, `:2492` `splitWithOffsets`, `:2493` `split`, `:2496` `balanced`).
  - The component's `String` (`FortressLibrary.fss:4336-4430`) declares none of them, and none of its parents (`StandardTotalOrder`, `ZeroIndexed`, `DelegatedIndexed`) does.
  - The library calls them through the trait's type from other components. In `String.fss`: `first.depth` (`:77`, `CatString(first: String, ...)`), `first.rangeContains` (`:131`), `s.isBalanced` (`:252`), `s.balanced()` (`:268`), `baseString.depth`, `.isBalanced` and `.balanced()` (`:355`, `:360`, `:375`), `baseString.splitWithOffsets()` (`:381` and others), `str.rangeContains` (`:431`), `baseString.verify()` (`:442`). `FlatString.fss:109` and `:113` use `self.depth`.
  - On the base code: `NoSuchMethodError`.
  - Under the third way, the calls resolve. Every string object defines all seven at the api's descriptors:
    - `FlatString` (`FlatString.fss:42`, `48`, `52`, `108`, `117`, `151`, `152`);
    - `CatString` (`String.fss:79`, `128`, `135`, `168`, `169`, `171`, with `isBalanced` from `Balanceable` at `:42`, the V9 shape);
    - `EmptyString` (`:285`, `286`, `298`, `313`, `331-333`);
    - `SubString` (`:355`, `360`, `373`, `438`, `441`, `460`, `478`).
- **`Range`'s `isEmpty`** (api `:2195`).
  - The component's `Range` (`FortressLibrary.fss:4003-4016`) does not declare it, and neither do its parents `StandardPartialOrder` and `Contains` (`:1096`).
  - Callers through the trait's type: `FlatString.fss:63` and `:65` (`r1: Range⟦ZZ32⟧`), and `String.fss:131-132`, `154` and `157` (`r ∩ first.bounds`, a `Range⟦ZZ32⟧`).
  - On the base code: `NoSuchMethodError`. Under the third way: it resolves where each range object has `isEmpty()` at the `Boolean` descriptor. Range's sub-traits give it (`:4055`, `:4097`, `:4123`, `:4135`, and `FullRange` through `Indexed`, `:1973`). I did not check every object in `RangeInternals.fss` one by one.
- **`ReadableArray`'s `opr[_:TrivialOpenRange] : ReadableArray[\E,I\]`** (api `:1462`).
  - The component's `ReadableArray` (`FortressLibrary.fss:2137`) leaves it out. Its parent `Indexed` declares it with the return type `Indexed[\E,I\]` (`:2025`), a different JVM descriptor.
  - Its sub-traits and objects narrow the return type (`ImmutableArray` `:2208`, `Array` `:2241`, `ImmutableArray1` `:2402`, `Array1` `:2460`, `Array2` `:2696`, `Array3` `:3122`).
  - On the base code: `NoSuchMethodError`. Under the third way: `AbstractMethodError`, the V8 shape, until the objects get a bridge at `ReadableArray`'s descriptor.
  - I found no library caller through `ReadableArray`'s static type: `List.fss:194` subscripts an `Indexed`, `:203` an `ImmutableArray`, and `SkipList.fss` subscripts arrays. A program can still write `a[#]` with `a: ReadableArray[\E,I\]`.
- **`ActualReduction`'s `empty` and `join`** (api `:1897-1898`). The component's `ActualReduction` (`:3247`) leaves them out, but its parent `Reduction[\L\]` declares `empty(): L` and `join(a: L, b: L): L` (`:3230-3234`) at the same descriptor. That is the V11 shape, which resolves on the base already.
- **`AnyMaybe`'s `holds`** (api `:983`). The component's `AnyMaybe` (`:1612`) leaves it out, but its parent `AnyUniqueItem` declares `getter holds() : Boolean` (`:1697-1700`). That is the V12 shape, which resolves on the base already.

## Defects

- **Row 816 is wider than its notes say.** This is not a new row. The program dies identically when the object defines the member, and also for a getter, a generic trait, a body from a sub-trait or a second trait, a narrowed return type, and a functional method (`V5Api.h(V5Api$T)`). Walk returns the component's other-header value (V3, 'other header'). It is recorded by row 816 (CONTESTED, `design limit (specification)`), which needs a test of today's behaviour and a ledger row: way 3 of `tests-writing.md`, "How a defect is recorded".
- **Text for a note on row 816** (I write no ledger): "With `O` defining `f` the run dies the same way: the client's `invokeinterface P$T.f()` names the component's interface, which declares only the component's trait's members (`CodeGen.java:5089`, `:6799-6841`). A getter, a generic trait, a sub-trait's body, a narrowed return and a functional method die alike. A member inherited from a parent that declares it at the same header resolves. Walk runs every case where the object defines it, and returns the component's value at another header. Probe: `perf-probes/export-abstract-codegen/REPORT.md`."
- The shadow's residual failures (V2, V3, V8 `AbstractMethodError`; V5 `NoSuchMethodError`) are measurements of the third way, not defects of the tree.

## Decisions

- **I built the change on the component's interface, not on the client's call site.** The client can name no other owner that declares the member short of `invokedynamic` or reflection.
- **Members already written are skipped by JVM name and descriptor, and only for the api's members.** So the component's own emission is byte-for-byte unchanged, as the prelude comparison shows.
- **Fields and non-`FnDecl` members of the api's trait are skipped**, not refused.
- **I did not extend the shadow** to bridges (V8) or functional-method wrappers (V5). Each is a separate change, at `dumpOverloadedMethodChaining` (`CodeGen.java:1057-1400`) and at `forTraitDecl`'s wrapper pass together with the overload sets (`:455`, `:5157-5161`).
- No decision of the curator covers the third way. I acted on reading (1) as landed, per the brief.

## For FACTS

1. **The compiled call names the api trait's interface, and that interface declares only the component's trait's members.**
   - So, under reading (1), a call of an api-only abstract member through the trait's type dies with `NoSuchMethodError` even where every object defines it. That holds for plain, getter, generic, sub-trait and second-trait bodies, narrowed returns and functional methods.
   - A member that the component's trait inherits from a parent declaring it at the same descriptor resolves.
   - What it means: of the library's 12, nine would die once compiled (`String`'s 7, `Range`'s `isEmpty`, `ReadableArray`'s `opr[_:TrivialOpenRange]`), and three resolve (`empty`, `join`, `holds`).
   - Shown by: the `old` column of section 3's table, and the failing harness run of `ExportAbstractMemberCall` (section 3).
   - Detail: sections 1, 3 and 5.
2. **A code-generator change closes the dotted cases where the objects define the member at the api's descriptor, and only those.** The component's interface declares the exported api trait's missing methods, abstract.
   - What it means: it leaves `AbstractMethodError` for an object without the member (which the checker accepts), for another header, and for a narrowed return type; and `NoSuchMethodError` for a functional method.
   - With it, testQuick reads 1317 / 86 / 263 with no failures, and the prelude's classes are unchanged.
   - Shown by: the `new` column of section 3's table, `ExportAbstractMemberCall` passing, and the testQuick lines.
   - Detail: section 3.
3. **Walk resolves a dotted call on the object's own environment** (`DottedMethodApplication.java:61-64`), so walk is indifferent to the reading. It stops at the call where no object defines the member, and refuses at load an object that leaves out a member that the component's trait declares (V13).
   - Shown by: the walk lines of section 4.
   - Detail: section 4.

## Commands

- `tmp/runv.sh <old|new> <caches> v2 ...`: for each variant, `java ... com.sun.fortress.Shell link VN.fss` with a fresh copy of the tree's caches, and `bin/fortress run VN`. `new` puts `tmp/quick/classes`, the scratch-compiled CodeGen, first on the class path.
- `tmp/oldv.sh <caches> v11 ...`: the same through `old-fortress.sh` on the base build, for runs after my build replaced the worktree's classes.
- `tmp/walkv.sh dir:Name ...`: walk through `old-fortress.sh` with a private caches folder.
- `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/methods.py <jar>`: lists each class's methods (name, descriptor, abstract flag) from the class bytes. `javap` and `unzip` mangle the `⟦`/`♙` class names, so I could not use them for the jar comparison.
- `git add -N <new test files>; git diff`: makes the untracked test files show in the patch without committing.
- Two traps I hit, not commands:
  - An all-capitals name such as `OG` is an operator, so `OG[\ZZ32\](7)` is a syntax error.
  - A relative `FORTRESS_CACHES` path breaks once the driver `cd`s into a program's directory.

## The ways measured, what each changes in the tree, and what it costs in rungs

1. **Reading (1) as landed.**
   - Tree: nothing.
   - Rungs: 0.
   - Effect: all 9 failing shapes die with `NoSuchMethodError` (P816 and V2 to V9), and so would 9 of the library's 12 members once compiled. Row 816 stays open.
2. **Reading (1) with the code generator closing the failure (the third way).**
   - Tree: `CodeGen.java`, about 30 lines, plus a gated compiled test of four files.
   - Rungs: one code-generator rung, with no checker change. So the distance and the count stay at 0 by construction (not run through the count stage).
   - Effect: it closes 5 shapes, and in the library `String`'s 7 and `Range`'s `isEmpty`.
   - What it leaves:
     - `ReadableArray`'s subscript (V8), which needs a second code-generator rung for bridges;
     - functional methods (V5), which need a third, for wrappers and overload sets;
     - an object leaving the member out (V2), which the checker still accepts and which then fails at run time on both paths. Only a new static check, an export-check rung that object definitions cover the api's abstract members, would close it.
   - So the third way, completed, takes up to 4 rungs, of which only the first is measured.
3. **Reading (2), through the team's `ignoreAbstract`.**
   - Tree: the export check (`ExportChecker.scala:614-615`), and 12 bodyless declarations in `FortressLibrary.fss`.
   - Rungs: a checker rung, after which the distance and the count are 1 (the planner's measurement, `CLIMB-BATCH-22.md`, "Question 1's two readings"), then a library rung.
   - Measured here, on the base code: V10 (the existing code generator emits the bridge itself) and V13 (an object leaving the member out is refused by the checker and by walk at load).
   - Not measured: the 12 declarations themselves, and whether walk's load check then refuses a library object that lacks one of them. `String`'s four objects define all seven; I did not check every `Range` object one by one.

## Question for the curator (mine)

**Row 816: is the third way a candidate beside readings (1) and (2)?**

- Under it, the export check stays as landed, and the code generator makes the component's trait interface declare the api's abstract members.
- It closes the run-time failure only where the objects define the member at the api's own descriptor.
- `ReadableArray`'s subscript, functional methods, and an object that leaves the member out still fail at run time. Each needs a rung of its own, the last of them a checker rung.

**My default: no.** Take reading (2), as the record's option 2 states it. With bridges and a static check of the objects, the third way, completed, costs more rungs than reading (2) and gives the same guarantee. Reading (2) gets the bridges from the existing code generator (V10) and the check of the objects from the existing checker and walk (V13). The shadow and its test stay here as evidence, and are not landed.

## The shadow patch (`git diff` in `/home/user/fortress-probe816`)

The classes were built from this patch before I restored one trailing space on an unchanged line. The bytecode is the same.

```diff
diff --git a/ProjectFortress/compiler_tests/ExportAbstractMemberCall.fss b/ProjectFortress/compiler_tests/ExportAbstractMemberCall.fss
new file mode 100644
index 000000000..006492442
--- /dev/null
+++ b/ProjectFortress/compiler_tests/ExportAbstractMemberCall.fss
@@ -0,0 +1,12 @@
+(* A client calls, through the api's trait type, a method that the api declares abstract and that the exporting component's trait leaves out; the object's definition answers. *)
+component ExportAbstractMemberCall
+import ExportAbstractMemberCallApi.{...}
+export Executable
+
+run(): () = do
+    println("REACHED")
+    assert(mk().f(), 3, "mk().f() through the api's trait type")
+    println("PASS")
+end
+
+end
diff --git a/ProjectFortress/compiler_tests/ExportAbstractMemberCall.test b/ProjectFortress/compiler_tests/ExportAbstractMemberCall.test
new file mode 100644
index 000000000..4218c307a
--- /dev/null
+++ b/ProjectFortress/compiler_tests/ExportAbstractMemberCall.test
@@ -0,0 +1,4 @@
+tests=ExportAbstractMemberCall
+link
+run
+run_out_contains=PASS
diff --git a/ProjectFortress/compiler_tests/ExportAbstractMemberCallApi.fsi b/ProjectFortress/compiler_tests/ExportAbstractMemberCallApi.fsi
new file mode 100644
index 000000000..cff0503f3
--- /dev/null
+++ b/ProjectFortress/compiler_tests/ExportAbstractMemberCallApi.fsi
@@ -0,0 +1,10 @@
+(* The api of ExportAbstractMemberCallApi: a trait with an abstract method f, and a function that makes a value of it. *)
+api ExportAbstractMemberCallApi
+
+trait T
+    abstract f(): ZZ32
+end
+
+mk(): T
+
+end
diff --git a/ProjectFortress/compiler_tests/ExportAbstractMemberCallApi.fss b/ProjectFortress/compiler_tests/ExportAbstractMemberCallApi.fss
new file mode 100644
index 000000000..e3d0b059e
--- /dev/null
+++ b/ProjectFortress/compiler_tests/ExportAbstractMemberCallApi.fss
@@ -0,0 +1,14 @@
+(* A component whose trait leaves out the method f that its api declares abstract (apis.tex, section "Component and API Identity"); the object below the trait defines it. *)
+component ExportAbstractMemberCallApi
+export ExportAbstractMemberCallApi
+
+trait T
+end
+
+object O extends T
+    f(): ZZ32 = 3
+end
+
+mk(): T = O
+
+end
diff --git a/ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java b/ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java
index 17975e8e4..6739f182d 100644
--- a/ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java
+++ b/ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java
@@ -6797,11 +6797,40 @@ public class CodeGen extends NodeAbstractVisitor_void implements Opcodes {
      * @param decls
      */
     private void dumpTraitMethodSigs(List<Decl> decls) {
+        Set<String> emitted = new HashSet<String>();
+        dumpTraitMethodSigs(decls, emitted, false);
+        dumpExportedTraitMethodSigs(emitted);
+    }
+
+    /**
+     * An api's trait may declare a method abstract that the exporting
+     * component's trait leaves out (apis.tex, "Component and API Identity");
+     * a client compiled against the api names the method on this interface,
+     * so the interface declares it too, abstract, and the objects below the
+     * trait give its body.
+     */
+    private void dumpExportedTraitMethodSigs(Set<String> emitted) {
+        String traitText = ((Id) currentTraitObjectDecl.getHeader().getName()).getText();
+        for (APIName apiname : component.getExports()) {
+            ApiIndex ai = env.api(apiname);
+            if (ai == null) continue;
+            for (Map.Entry<Id, TypeConsIndex> e : ai.typeConses().entrySet()) {
+                if (!e.getKey().getText().equals(traitText)) continue;
+                if (!(e.getValue().ast() instanceof TraitDecl)) continue;
+                TraitDecl apiTrait = (TraitDecl) e.getValue().ast();
+                dumpTraitMethodSigs(apiTrait.getHeader().getDecls(), emitted, true);
+            }
+        }
+    }
+
+    private void dumpTraitMethodSigs(List<Decl> decls, Set<String> emitted, boolean fromApi) {
         debug("dumpSigs", decls);
         for (Decl d : decls) {
             debug("dumpSigs decl =", d);
-            if (!(d instanceof FnDecl))
+            if (!(d instanceof FnDecl)) {
+                if (fromApi) continue;
                 throw sayWhat(d);
+            }
 
             FnDecl f = (FnDecl) d;
             FnHeader h = f.getHeader();
@@ -6816,6 +6845,7 @@ public class CodeGen extends NodeAbstractVisitor_void implements Opcodes {
                 List<StaticParam> tsp = currentTraitObjectDecl.getHeader().getStaticParams();
 
                 String method_name = NamingCzar.genericMethodName(new FnNameInfo(f, tsp, thisApi()), selfIndex, thisApi());
+                if (!emitted.add(method_name + genericMethodClosureFinderSig) && fromApi) continue;
                 CodeGenMethodVisitor mv = cw.visitCGMethod(ACC_ABSTRACT + ACC_PUBLIC, method_name, genericMethodClosureFinderSig, null, null);
                 mv.visitMaxs(Naming.ignoredMaxsParameter, Naming.ignoredMaxsParameter);
                 mv.visitEnd();
@@ -6832,6 +6862,7 @@ public class CodeGen extends NodeAbstractVisitor_void implements Opcodes {
                 // it seems wrong to publicly mangle.
                 String mname = functionalMethod ? Naming.fmDottedName(
                         singleName(name), selfIndex) : singleName(name); 
+                if (!emitted.add(mname + desc) && fromApi) continue;
                 abstractMethod(desc, mname);
                 // provide both overloaded and single names in abstract decl.
                 mname = NamingCzar.mangleAwayFromOverload(mname);
```
