<!-- A rehearsal of the switch-over by brute force, 2026-11-10, by a Fable worker for the review of PLAN's phases 4 and 5: a scratch tree's compiled path switched onto the interpreter's library, the library's components compiled to bytecode with every wall hacked past, and programs run against them, with each wall in the order met, its ledger row or the lack of one, the hack that passed it and what a real repair needs; run in a worktree of the worker's own, `/home/user/fortress-switch`, seeded from the base build `/home/user/fortress-base32` (`832f7d0d91`) and removed after; nothing here lands, and the scratch tree's whole diff is `switch-rehearsal.patch` beside this report. -->

# The switch-over rehearsed by brute force

**Status of this file: a first version, written while the probe runs. Sections marked "(open)" are not reached yet.**

The question: what stands between today's tree (`832f7d0d91`) and a program that compiles to bytecode and runs against the interpreter's library (P-37, P-33)? The method: switch a scratch tree's compiled path onto that library by the smallest change, then push, hacking past each wall, and record the walls in the order met. A hack is marked as one in the patch (`SWITCH HACK`), and the patch is not a design.

Machine: nproc 4, Intel Xeon Processor @ 2.30GHz, OpenJDK 25, `FORTRESS_THREADS=1`. Other sessions share the machine.

How the runs were made: the edited Java and Scala classes compiled into a scratch folder put first on the class path (the `fortress-repo` skill's `compiler.md`, "Testing an edit here"), with a private caches folder that started empty; one `ant compileAll` after the run-time classes changed.

## 1. The switch itself

The two worlds are chosen in one place for each command: `Shell.useCompilerLibraries()` and `Shell.useInterpreterLibraries()` (`ProjectFortress/src/com/sun/fortress/Shell.java:373-388`), which point `WellKnownNames` and `Types` at a prelude and set the desugaring switches. The smallest change that switches the compiled path is two lines of `useCompilerLibraries()`:

    -        WellKnownNames.useCompilerLibraries();
    -        Types.useCompilerLibraries();
    +        WellKnownNames.useFortressLibraries();
    +        Types.useFortressLibraries();

The desugaring switches stay the compile command's. With that alone, `fortress compile Hello.fss` (one `println` of a string) passes every phase, the checker and the code generator among them, in 16 s, and writes `Hello.jar`. The program's own compile needs nothing else. Everything below is what its run needs: the library as bytecode.

## 2. The walls, in the order met

Each wall has: what fails, its kind and count, the ledger row that holds it or "no row", the hack, and what a real repair needs.

### W1. No jar of the library exists (the run)

`fortress run Hello`:

    Exception in thread "main" java.lang.NoClassDefFoundError: fortress/FortressLibrary$String
    Caused by: java.io.IOException: Resource not found : fortress/FortressLibrary$String.class

Nothing compiles the library's components for a program: each must be compiled by name, as the library order does for the prelude today. Not a defect; the switch-over's library order is fourteen compiles (section 4) in place of five. No row; the plan's names line does not state the new library order.

### W2. The wrappers of the helper classes (row 874)

`fortress compile LibraryBuiltin/FortressBuiltin.fss`:

    java.lang.RuntimeException: Can't generate header for method floatToString with jvm desc =Ljava/lang/String; stripped = FortressLibrary$String

Row 874 holds it, as PLAN's N5 says. It is not one table but the question of which run-time class carries each of the one library's built-in types on the compiled path. The record does not hold that design; PLAN names only `FlatString`'s carrier as unmeasured. What the hack had to decide (all of it `SWITCH HACK`):

- `NamingCzar`'s table of types that a hand-written class carries, and `Naming`'s copy of it for the run: `FortressLibrary`'s `ZZ32`, `ZZ64`, `RR64`, `NN64`, `ZZ`, `JavaBufferedReader`, `JavaBufferedWriter` to `FZZ32`, `FZZ64`, `FRR64`, `FNN64`, `FZZ`, `FJavaBufferedReader`, `FJavaBufferedWriter`; `FortressBuiltin`'s `Boolean`, `RR32`, `NN32`, `Char` to `FBoolean`, `FRR32`, `FNN32`, `FCharacter`; `FlatString`'s `FlatString` to `FJavaString`.
- The wrapper generator's converters (`FortressMethodAdapter`): a helper's Java `String` is read as the trait `String`, which no class carries (a `CatString` is a `String` too), so the wrapper takes the trait's interface and casts to `FJavaString`; a new converter. A helper's Java `Object` at `Any` had no converter either ('stripped = AnyType$Any', met at `arrayOps.get`); a second new converter.
- The array stores (met as its own failure, 'Can't generate header for method make with jvm desc =Lcom/sun/fortress/compiler/runtimeValues/FortressArrayStore; stripped = FortressLibrary$JavaArrayStore'): `FortressArrayStore` and `FortressRR64ArrayStore` are plain Java classes outside the Fortress hierarchy, so `JavaArrayStore` and `JavaRR64ArrayStore` have no compiled value. Two new run-time classes, `FJavaArrayStore` and `FJavaRR64ArrayStore`, each a store in a field. F-333 says the stores are built; they are, but nothing carries one as a Fortress value on the compiled path.
- The run-time classes extend the prelude's generated classes by name in their Java source (`FZZ32 extends fortress.CompilerBuiltin.ZZ32.DefaultTraitMethods`), against bootstrap stubs in `ProjectFortress/src/fortress/CompilerBuiltin.java`. Thirteen classes re-parented onto the one library's traits, with new stubs `fortress/FortressLibrary.java`, `FortressBuiltin.java` and `FlatStringC.java`; `FValue.asString` and `Utility.makeFortressException` name the one library's `String`; the helpers' 99 raise strings name `fortress.FortressLibrary$…` (30 `DivisionByZero`, 55 `IntegerOverflow`, 11 `IOFailure`, 2 `FileNotFoundException`, 1 `FailCalled`).
- Five of the carried types are objects in the one library, where the prelude has traits: `value object Boolean`, `RR32`, `NN32`, `Char` (`FortressBuiltin.fss`) and `object FlatString` (`FlatString.fss`). A hand-written class can extend a trait's generated `DefaultTraitMethods`, whose methods take `self` as a parameter and cast it; an object's class is final and its methods read `this`. The hack makes the five traits in the scratch library, each with `comprises { XCarrier }` and an empty object `XCarrier`, so that the checker keeps the exclusions that an object has (without the clause the apis fail the overloading check: 15 errors, such as 'Invalid overloading of || in trait FlatString: (FlatString, Char)->String and (String, Number)->String'). This breaks walk in the scratch tree, which binds these objects' natives.
- `FlatString`'s classes cannot be stubbed in Java under the component's name, since Java source allows no class `FlatString` nested in a class `FlatString`, and they are outside the package `fortress`, where a Java class of a named package cannot reach them. The hack names the component's class `fortress/FlatStringC`.

A real repair is a design first (the carriers: which class is a `ZZ32`, given `trait ZZ32 comprises { Int }` with `value object Int` in `FortressBuiltin`; what a `String` is at a helper; whether the five objects stay objects, with the code generator taught to let a hand-written class be an object's class), then about three rungs: the tables with the converters and the stores' carriers; the run-time classes with their stubs and the raise strings; the object carriers. PLAN sizes N5 as one rung inside the names batch.

### W3. 'Not in the trait table' (row 942), and the team's search hack

Past W2, `FortressBuiltin`:

    Exception in thread "main" java.lang.RuntimeException: Not in the trait table: RR64
    RR64 @ Library/FortressLibrary.fsi:291:7-9
        at ...TypeAnalyzer.typeCons(TypeAnalyzer.scala:884)
        at ...OverloadingOracle.lteq(OverloadingOracle.scala:71)
        at ...OverloadSet.fLessSpecThanG(OverloadSet.java:532)
        at ...CodeGen.generateTopLevelOverloads(CodeGen.java:7695)
        at ...CodeGen.forObjectDeclPrePass(CodeGen.java:4895)

Row 942's stack. It stops the whole component, not one declaration. `TraitTable.lookUpTypeCons` (`scala_src/typechecker/TraitTable.scala:76-100`) holds "A terrible search hack to try to get around the apiName bug. GLS 5/25/12": an unqualified name that the component does not declare is searched in the apis named `CompilerBuiltin`, `CompilerLibrary`, `CompilerAlgebra` and `GeneratorLibrary`. So in the prelude's world the team's hack hides rows 940 and 942 for the prelude's types, and the switch removes that cover. The hack here: the same search over `FortressLibrary` and `FortressBuiltin`. With it `FortressBuiltin` passes, and F-34's kind "Not in the trait table" does not occur in the measurement of section 3. A real repair is rows 940 and 942's root (the method index entries that lack their api), one rung; or the names batch extends the team's search and says so. No PLAN line names `TraitTable.scala`'s three prelude names.

### W4. `NN32`'s `zero` and `one` return `Number` (no row)

    Likely bug in static analysis, apparently malformed overload set not rejected for
    FortressBuiltin..NN32.one():Number
    # FortressBuiltin..(Integral[\NN32\] & {NN32}).one():NN32

`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:429-430` declare `getter zero(): Number` and `getter one(): Number` in `NN32`, which inherits `getter zero(): I` and `one(): I` at `I = NN32` (`Library/FortressLibrary.fss:682-683`). The getter's return type is wider than the inherited one's; the checker passes it (the distance is 0), and the code generator stops the component. Hack: `NN32` in both lines, which is also the library's repair. Two defects: the library's text, and the checker's acceptance of a getter that widens an inherited return type. See "For the ledger".

### W5. The declarations that the code generator refuses

Past W4, `FortressBuiltin` compiles whole (92 classes). `FortressLibrary` stops at its first refused declaration ('Can't compile VarArgs yet', `Library/FortressLibrary.fss:307`). Section 3 counts them. Hack: the distance probe's tolerant code generator (`tools/distance/shadow-patch.py`'s edits of `CodeGen.java`) put into the scratch tree's `CodeGen`, so that a refused declaration is reported and left out and the jar is still written; two repairs of that hack were needed (a refused trait left its class writer in place of the component's, so the jar was never closed; a refused function left a method without code, closed now with a throw).

### W6. One method written twice into a class (row 571's kind; 27 classes)

First load of the library:

    java.lang.ClassFormatError: Duplicate method name "MAX?0" with signature "(Lcom.sun.fortress.compiler.runtimeValues.FZZ32;)Lcom.sun.fortress.compiler.runtimeValues.FZZ32;" in class file fortress/FortressLibrary$ZZ32$DefaultTraitMethods

The code generator writes one name and descriptor twice into 24 classes of `FortressLibrary`'s jar (238 methods) and 3 of `RangeInternals`' (6 methods, `narrowToRange`). The compile reports nothing; each class fails when it loads. Row 571 holds one shape of it (an object that declares the meet of two inherited methods); the library's shapes are wider, `ZZ32`'s own `MAX` beside the ones it inherits among them. Hack: the class writer keeps the first copy. A real repair: one rung at least, which first sorts the 244 by cause.

## 3. The code generator over the library today, against F-34

`explorations/compile-ladder/plan-25/probes/codegen.sh`, the probe of F-34, run twice on the scratch tree.

On the seeded tree, unchanged: `FortressLibrary`, `FortressBuiltin` and `FlatString` are refused whole at the wrappers (row 874), and the other eleven components give 11 refused declarations in 6 kinds, 185 emitted.

With W2's tables, W3's search and W4's two lines, so with every helper string as landed (F-34 put the strings back on glue classes to get past row 874): **24 refused declarations in 8 kinds, 749 emitted, no component failure**, against F-34's 38 in 10.

    refused declarations 24 | emitted (OK lines) 749 | component failures 0
      FortressLibrary 12, List 4, String 4, CovariantCollection 1, Stream 1, OneShotFlag 1, FlatString 1
      7  Can't compile VarArgs yet  [String 3, FortressLibrary 2, List 1, FlatString 1]
      4  Can't compile Label  [FortressLibrary 3, String 1]
      4  <X> is not in the kind env  [List 2, FortressLibrary 1, CovariantCollection 1]
      4  Error trying to close method scope  [FortressLibrary 4]
      2  java.util.zip.ZipException: duplicate entry: <closure class>  [FortressLibrary 1, List 1]
      1  ClassCastException: IntersectionType to NamedType  [FortressLibrary 1]
      1  OptionUnwrapException at edu.rice.cs.plt.tuple.Null.unwrap:58  [Stream 1]
      1  Can't compile AtomicExpr  [OneShotFlag 1]

| kind | sites | row |
|---|---|---|
| varargs | `assert` and `deny` (`FortressLibrary.fss:307`, `:325`), `<|_|>` (`List.fss:177`), `CatString`, `EmptyString`, `stringifyChars` (`String.fss:75`, `:282`, `:337`), `FlatString` (its two calls of the varargs `assert`) | 624 |
| `label` | `simplestRationalBetween` (`FortressLibrary.fss:507`), `Indexed` (`:2117`), `Generator2` (`:4977`), `SubString` (`String.fss:353`) | 81 |
| kind env | `__bigOperator2` (`FortressLibrary.fss:1571`), `ArrayList` (`List.fss:252`), `app` (`List.fss:93`), `APPCOV` (`CovariantCollection.fss:30`) | 822, 812 |
| close method scope | the four range operators over pairs and triples (`FortressLibrary.fss:4369`, `:4370`, `:4412`, `:4413`) | 819 |
| duplicate closure class | `LexicographicOrder` (`FortressLibrary.fss:2216`), `List` (`List.fss:106`) | 315 by its text; not checked that the cause is the same |
| intersection | `__filter` (`FortressLibrary.fss:1404`) | 540 |
| varargs in a trait | `WriteStream` (`Stream.fss:33`) | 624 |
| `atomic` expression | `OneShot` (`OneShotFlag.fss:15`) | 875 |

The probe counts a declaration at its first wall and skips the dispatch methods (`-Dprobe.skipOverloads=true`). Two differences from that count in the real compile: with `SubString` past its `label`, `String.fss` shows row 818's 'Can't compile a dispatched call whose arguments are not all type assumptions' at `concatAndBalanceIfNecessary` (`String.fss:61`); and the real compile does generate `FortressLibrary`'s dispatch methods, in about 70 s for the component, with no refusal.

What the count cannot see: W6's 244 duplicate methods, and whatever the JVM's verifier refuses, since the probe runs no emitted class (F-34 says so).

## 4. Linking, loading, running (open)

## 5. Timing (open)

## 6. The walls grouped, against PLAN's phase 4 and phase 5 lines (open)

## The hacks

All in `switch-rehearsal.patch`, each marked `SWITCH HACK`:

1. `Shell.useCompilerLibraries()`: the switch (section 1).
2. `NamingCzar`, `Naming`, `FortressMethodAdapter`: the carriers' tables, two converters (W2).
3. The run-time classes re-parented, three stub files, two new store carriers, the raise strings (W2).
4. `FortressBuiltin.fss`, `.fsi`, `FlatString.fss`, `.fsi`: five objects made traits with a carrier object; `NamingCzar.javaPackageClassForApi`: `FlatString`'s class named `fortress/FlatStringC` (W2).
5. `TraitTable.scala`: the team's search extended to the one library's two prelude apis (W3).
6. `FortressBuiltin.fss:429-430`: `NN32`'s `zero` and `one` at `NN32` (W4).
7. `CodeGen`, `CodeGenClassWriter`, `CodeGenMethodVisitor`: refused declarations left out, open methods closed with a throw (W5); a method written twice keeps its first copy (W6).
8. `FlatString.fss`: its two calls of the varargs `assert` left out (row 624).

## For the ledger

- **`NN32`'s getters `zero` and `one` are declared at `Number`, wider than the inherited `I`, and the checker accepts them; the code generator then stops `FortressBuiltin`** with 'Likely bug in static analysis, apparently malformed overload set not rejected for FortressBuiltin..NN32.one():Number'. Paths: `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:429-430`; `Library/FortressLibrary.fss:682-683`; `ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:411`. Seen only on the compiled path against the one library; walk runs the two getters.
- **The code generator writes one method twice into 27 classes of the one library (244 methods), each a `ClassFormatError` at load**: section 2, W6. Row 571 is its nearest row.
- **`TraitTable.lookUpTypeCons` searches the prelude's apis by name for an unqualified type, which hides rows 940 and 942 for the prelude's types**: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TraitTable.scala:76-100`. Not a new defect; a fact for rows 940 and 942.
- **No compiled value carries `JavaArrayStore` or `JavaRR64ArrayStore`**: `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FortressArrayStore.java:21` is a plain Java class, and `FortressMethodAdapter.toImplFFFF` finds no converter. Part of row 874.
