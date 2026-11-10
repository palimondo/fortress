<!-- A rehearsal of the switch-over by brute force, 2026-11-10, by a Fable worker for the review of PLAN's phases 4 and 5: a scratch tree's compiled path switched onto the interpreter's library, the library's components compiled to bytecode with every wall hacked past, and programs run against them, with each wall in the order met, its ledger row or the lack of one, the hack that passed it and what a real repair needs; run in a worktree of the worker's own, `/home/user/fortress-switch`, seeded from the base build `/home/user/fortress-base32` (`832f7d0d91`) and removed after; nothing here lands, and the scratch tree's whole diff is `switch-rehearsal.patch` beside this report. -->

# The switch-over rehearsed by brute force

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

### W5. The declarations that the code generator refuses (rows 624, 81, 822, 812, 819, 315, 540, 875, 818)

Past W4, `FortressBuiltin` compiles whole. `FortressLibrary` stops at its first refused declaration ('Can't compile VarArgs yet', `Library/FortressLibrary.fss:307`). Section 3 counts them: 24 in 8 kinds, each kind in a row. Hack: the distance probe's tolerant code generator (`tools/distance/shadow-patch.py`'s edits of `CodeGen.java`) put into the scratch tree's `CodeGen`, so that a refused declaration is reported and left out and the jar is still written. That hack needed three repairs of its own, none of them a finding about the tree: a refused trait left its class writer in place of the component's, so the jar was never closed; a refused function left a half-written method, so each method is now kept apart until its class is written and one left open is written as a body that throws; and the wrapper generator writes its classes by another route, which had to flush the kept methods too.

Leaving a declaration out is enough only where nothing on a program's path needs it. Five refused declarations were on the path of a program that prints one line, and each needed a stub in the library's text (section 4).

### W6. One method written twice into a class (row 571's kind; 27 classes, 244 methods)

First load of the library:

    java.lang.ClassFormatError: Duplicate method name "MAX?0" with signature "(Lcom.sun.fortress.compiler.runtimeValues.FZZ32;)Lcom.sun.fortress.compiler.runtimeValues.FZZ32;" in class file fortress/FortressLibrary$ZZ32$DefaultTraitMethods

The code generator writes one name and descriptor twice into 24 classes of `FortressLibrary`'s jar (238 methods) and 3 of `RangeInternals`' (6 methods, `narrowToRange`). The compile reports nothing; each class fails when it loads. Row 571 holds one shape of it (an object that declares the meet of two inherited methods). The library's shape is wider: a trait that declares its own method at the instance of a generic supertrait's method, as `ZZ32`'s `<`, `MAX` and `CMP` beside `StandardPartialOrder[\ZZ32\]`'s and `StandardMinMax[\ZZ32\]`'s, gets a forwarder for each, under one name and descriptor. So the code generator does not see that the trait's own declaration overrides the inherited one.

The first hack, keep the first copy, ran `println` once and then, after an unrelated rebuild, sent it into a `StackOverflowError`: the copy kept for `ZZ32`'s `<` forwarded to `StandardPartialOrder`'s `<`, which calls `CMP`, which calls `<`. Which copy comes first is not stable from one compile to the next. The hack now prefers the copy that calls a static method of the class itself, the trait's own declaration: 98 of the 238 are swapped by that rule. A real repair: one rung at least, at the place where a trait's forwarders are gathered, with the override test at the instantiated signature; it first sorts the 244 by cause.

### W7. Missing casts that the JVM's verifier refuses (rows 307 and 695's kind; not counted)

    java.lang.VerifyError: Bad type on operand stack
      Location: fortress/FortressLibrary$QQ$DefaultTraitMethods.isFinite(Lfortress/FortressLibrary$QQ;)Lcom/sun/fortress/compiler/runtimeValues/FBoolean; @1: invokestatic
      Reason: Type 'fortress/FortressLibrary$QQ' (current frame, stack[0]) is not assignable to 'fortress/FortressLibrary$Ratio'

`getter isFinite(): Boolean = (denominator(self) =/= 0)` in `trait QQ comprises { Ratio }` (`Library/FortressLibrary.fss:570`): the checker lets `self` stand where the comprised object type `Ratio` is expected, and the code generator emits no cast. It is thrown from `FortressLibrary`'s static initializer, at the first numeral coercion into `QQ`, so it stops every program. In `QQ` alone 23 lines pass `self` to `numerator` or `denominator`. Rows 307 and 695 hold the kind for a program's own traits; no row names the library's `QQ`. Hack: every compiled run of this probe had the verifier switched off (`-XX:+UnlockDiagnosticVMOptions -XX:-BytecodeVerificationRemote`). So nothing below shows how many other methods the verifier refuses, and a count needs every emitted class loaded with the verifier on, which this probe did not build. A real repair: the cast where a value typed by a trait with a `comprises` clause meets a listed type (row 307's repair), one rung, and then the count.

### W8. `println` needs `WriteStream`, refused for its varargs methods (row 624)

    Caused by: java.lang.NoClassDefFoundError: Stream$WriteStream
        at Writer$stdOut.<clinit>(Library/Writer.fss:17)
        at fortress.FortressLibrary.println(Library/FortressLibrary.fss:4709)

`trait WriteStream` declares `print(args:Any...)` and `println(args:Any...)` (`Library/Stream.fss:70-71`), so the whole trait is refused ('OptionUnwrapException', row 624's trait form) and `stdOut` has no class. The library's own `println` does not call them. Hack: the two methods left out of `Stream.fss` and `Stream.fsi`. `FlatString`'s two calls of the varargs `assert` (`Library/FlatString.fss:63`, `:109`) were left out for the same reason. Row 624 is on every program's path: varargs must compile, or the library's text must change, before a line prints.

### W9. `Indexed` is refused for one `label` (row 81)

`trait Indexed`'s `indexOf` uses `label` and `exit` (`Library/FortressLibrary.fss:2188-2194`, the `label` at `:2189`), so the trait is refused, and every string and every array is an `Indexed`. Hack: `indexOf`'s body made `fail(…)`; `Generator2.generate2`'s `label` loop replaced by its last line, the naive implementation (`:4983-4995`); the four postfix range operators over pairs and triples (row 819) made `fail(…)`, since the refused functions otherwise left methods that the verifier's stack check refused even with verification off. Behind `Generator2`'s `label` stands a second wall, 'Can't compile VarArgs yet', and behind `List`'s duplicate closure class likewise: a declaration counted at its first wall can hold more.

### W10. A closure class written twice into the jar (row 315's kind) stops `=` on two `ZZ32` values

    Caused by: java.lang.NoClassDefFoundError: fortress/FortressLibrary$LexicographicOrder$RTTIi
        at ...FortressLibrary⚙$CMP⟦FZZ32⟧...the_function
        at ...StandardPartialOrder⟦FZZ32⟧$DefaultTraitMethods.=(Library/FortressLibrary.fss:232)
        at ...Indexed⟦FCharacter,FZZ32⟧$DefaultTraitMethods.isEmpty(Library/FortressLibrary.fss:2120)
        at fortress.FlatStringC$FlatString$DefaultTraitMethods.||(Library/FlatString.fss:126)

`trait LexicographicOrder` (`Library/FortressLibrary.fss:2216-2228`) is refused, 'java.util.zip.ZipException: duplicate entry: FortressLibrary$\=fn@2227\!12-52??.class', and the dispatch method of `CMP` names every overload's trait, so comparing two integers needs its class. Hack: the jar writer keeps the first copy of a class. `List` has the same failure (`Library/List.fss:128`).

### W11. The dispatch method of a generic overloaded function names its component without the package `fortress` (no row)

    Caused by: java.lang.NoClassDefFoundError: FortressLibrary
        at fortress.FortressLibrary⚙$seq⟦FZZ32⟧...the_function(Unknown Source)
        at Arr.run(Arr.fss:5)

`OverloadSet` builds the owner of a generic function's instance table and the name of its template class from `Naming.dotToSep(f.tagA.getText())`, the api's bare name, at four places (`ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:904`, `:1361`, `:1724`, `:1728`), where every other place asks `NamingCzar.javaPackageClassForApi`, which puts a default library's classes in the package `fortress`. The prelude has no generic overloaded function that a program reaches this way; the one library's `seq` is the first. Hack, which is also the repair: the four places call `javaPackageClassForApi`. One small rung with its test, which needs the switch to be seen.

### W12. A carried type has two names at run time, its trait's and its carrier's (no row)

    Caused by: java.lang.ClassCastException: class RangeInternals$CompactFullParScalarRange cannot be cast to class fortress.FortressLibrary$Generator⟦fortress|FortressLibrary%ZZ32⟧
        at ...FortressLibrary⚙$seq⟦FZZ32⟧...the_function

A trait's generated `RTTIc` holds the trait's own interface class (`CodeGen.java:5999`, `cnb.classDesc`), so a static argument read from a value's run-time type is named `fortress/FortressLibrary$ZZ32`, while the descriptors of compiled code name the same type by its carrier, `FZZ32`. The dispatch of the generic `seq` infers `E` from the range's `Generator[\ZZ32\]` and instantiates `Generator⟦FortressLibrary$ZZ32⟧`, which is not the `Generator⟦FZZ32⟧` that the range implements. The prelude has the same two names and never infers a static argument from a carried type's RTTI (its `GeneratorZZ32` is not generic). Hack: the generated `RTTIc` of a carried type holds the carrier class. Part of the carrier design of W2; with W13 and W14 it shows that the design reaches the code generator's naming, not only N5's tables.

### W13. The number objects below the number traits: `asFloat` has no body on a compiled `ZZ32` (no row)

    Caused by: java.lang.AbstractMethodError: Receiver class com.sun.fortress.compiler.runtimeValues.FZZ32 does not define or inherit an implementation of the resolved method 'abstract ...FRR64 asFloat?0()' of interface fortress.FortressLibrary$ZZ32.

`trait ZZ32` declares `asFloat(self): RR64` abstract and `value object Int extends ZZ32` gives its body (`FortressBuiltin.fss`); likewise `Long`, `UnsignedLong`, `BigNum` and, for the whole of `RR64`'s arithmetic, `Float` (146 lines, `FortressBuiltin.fss:61-206`). A carrier that is the trait's class has none of the object's bodies. Two hacks, one for each shape: `Float` made a trait with a carrier object, as W2's five, and `FRR64` put below it; for `ZZ32` and `ZZ64`, `asFloat`'s body copied into the trait. Putting `FZZ32` below a trait `Int` in the same way was tried and gave back W6's wrong forwarder. A real repair is the carrier design's answer for a trait with one comprised object.

### W14. A trait or object that extends a carried type gets the carrier class as its superinterface (no row)

    Exception in thread "main" java.lang.ClassCircularityError: com/sun/fortress/compiler/runtimeValues/FZZ

`NamingCzar.extendsClauseToInterfaces` (`NamingCzar.java:799-824`) names each parent by `jvmTypeDesc`, which answers a carried type's carrier class, so `Float extends RR64` became an interface that extends the class `FRR64`. In the prelude nothing extends a carried trait in Fortress source. Hack: a carried type in an `extends` clause is named by its own interface. This wall was met only because W13's hack made `Float` a trait below `RR64`; an object below a carried trait takes the same path. Part of the carrier design.

### W15. An array of rank 2: an abstract method over an index type that is a tuple has no implementation (row 832's kind)

    Caused by: java.lang.AbstractMethodError: Receiver class fortress.FortressLibrary$__DefaultMatrix⟦FRR64,3,4⟧ does not define or inherit an implementation of the resolved method 'abstract Tuple⟦FZZ32,FZZ32⟧ offset(Tuple⟦FZZ32,FZZ32⟧)' of interface fortress.FortressLibrary$ReadableArray⟦FRR64,Tuple⟦FZZ32,FZZ32⟧⟧
        at ...Array⟦FRR64,Tuple⟦FZZ32,FZZ32⟧⟧$DefaultTraitMethods._[_]:=(Library/FortressLibrary.fss:2369)

`Array[\E,I\]` declares `offset(i:I): I` (`Library/FortressLibrary.fss:2314`); `Array2` gives `offset(t1:(ZZ32,ZZ32)):(ZZ32,ZZ32)` (`:2847`). At `I = (ZZ32,ZZ32)` the abstract method takes one boxed tuple, and the body written at the tuple type was compiled with another descriptor, with no bridge between them. So `m[i,j] := x` and `m[i,j]` die on every rank-2 and rank-3 array, a `Matrix` among them. Row 832 holds the nearest shape (a generic dotted method whose single parameter has a tuple type from a tuple static argument). **No hack gets past it: it needs the code generator to emit the bridge, a rung's real work. The probe stops on this line here.**

### W16. The library's vector algebra: a generic method inherited from an api's trait has no body on the object (rows 495 and 732's kind)

    Caused by: java.lang.AbstractMethodError: Receiver class RangeInternals$CompactFullParScalarRange does not define or inherit an implementation of the resolved method 'abstract java.lang.Object map⟦…⟧(long, java.lang.String)' of interface fortress.FortressLibrary$Indexed⟦FZZ32,FZZ32⟧.
        at ...ReadableArray⟦FRR64,FZZ32⟧$DefaultTraitMethods.indexValuePairs(Library/FortressLibrary.fss:2288)
        at ...FortressLibrary$fn@2716...apply(Library/FortressLibrary.fss:2716)
        at ...__bigOperator...

`a DOT b` on two `Vector[\RR64,1000\]` values reaches `Indexed`'s generic method `map[\R\]` on a range object of `RangeInternals`, which has no implementation of it: the object inherits the generic method's body from a trait of another component's api. PLAN's phase 4 names this arm ("an object's inherited generic method … dies at the generic arm", from the generic-`distribute` probe) and phase 5 names rows 495 and 496. **No hack was tried: it is the code generator's generic dotted methods, a rung's real work.** Every `map`, `ivmap` and `DOT` of microGPT's vocabulary is on it.

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

## 4. How far each program got

The library order under the switch, each component compiled by name: `AnyType`, `FortressBuiltin` (14 s), `FortressLibrary` (73 to 79 s, 2,490 jar entries), `RangeInternals` (38 to 51 s), `NativeArray`, `FlatString`, `String`, `List`, `Stream`, `NatReflect`, `TypeProxy`, `Writer`, `CovariantCollection`, `OneShotFlag`: about 200 s, against 100 to 110 s for the prelude's five. With every hack in, 17 declarations are still left out of the jars: `assert`, `deny`, `simplestRationalBetween`, `__filter`, `__bigOperator2` and `Generator2` of `FortressLibrary`; `CatString`, `EmptyString`, `SubString`, `concatAndBalanceIfNecessary` and `stringifyChars` of `String`; `ArrayList`, `app`, `List` and `<|_|>` of `List`; `APPCOV`; `OneShot`.

`fortress link Hello.fss` under the switch exits 0 with no message in 4.6 s; linking met no wall. Row 320 (an api implemented by a component of another name) was not met: each of the fourteen components exports the api of its own name.

Each program below was also run under walk on the base build (`tools/old-fortress.sh /home/user/fortress-base32 …`), which printed the same lines as the compiled run where the compiled run ended.

| program | what it does | compiled against the one library |
|---|---|---|
| `Hello` | `println("Hello, one library")` | compiles with the switch alone; runs after W1 to W10: `Hello, one library` |
| `Arr` | `array1[\ZZ32,8\]()`, a `for` over `seq(0#8)` that writes `i i`, then `println("a[5] = " \|\| a[5].asString)` | compiles; runs after W11 and W12: `a[5] = 25` |
| `Dot` | two `Array1[\RR64,0,1000\]`, filled in a loop, then `s += a[i] b[i]` in a `seq` loop | compiles; runs after W13 and W14: `dot = 499500.0` |
| `DotLib` | the same on `Vector[\RR64,1000\]` with the library's `a DOT b` and `SUM[\RR64\][i <- 0#1000] a[i] b[i]` | compiles; dies at W16 |
| `MatVec` | `array2[\RR64,3,4\]()` written by `m[i,j] := …`, times a vector in two `seq` loops | compiles; dies at W15 at the first `m[i,j] :=` |
| `MatVecLib` | `Matrix[\RR64,3,4\]`, `Vector[\RR64,4\]`, `r = m v` | compiles; dies at W15 |
| microGPT's flat program and its quick check | `explorations/run-c4/src/` | stopped by the checker, below |

So a program with rank-1 arrays and its own loops compiles and runs against the interpreter's library. A matrix, the library's own vector algebra and microGPT do not.

### microGPT's flat program

`fortress compile` of the four components of `explorations/run-c4/src/`, copied, under the switch. Each count is a floor, since the checker stops a block at its first failing statement (row 474).

- `FlatArrays`: its api first fails 17 times, 16 of them 'Ill-formed type: Array[\RR64,I\] The static argument I does not satisfy the corresponding bound Index.' (PLAN item 61) and one `gather[\T extends Number …\]` whose `Matrix[\T,r,c\]` wants `MultiplicativeRing[\T\]`. With `I extends Index` written at the seven generics and `gather`'s bound widened, in the copy, the component has 7 errors: one 'Function body has type Array2[\RR64,0,s,0,s2\], but declared return type is Matrix[\RR64,s,s2\]' (`FlatArrays.fss:42`), five calls that pass an unsized `Array[\RR64,(ZZ32,ZZ32)\]` or `Array[\RR64,(ZZ32,ZZ32,ZZ32)\]` where `Matrix` or `Array3` is declared (`:131`, `:145`, `:151`, `:157`, `:163`), and 'Array[\RR64,(ZZ32, ZZ32)\] has no getter called sizes' (`:184`).
- `FlatData`: 1 error, in the library, not the program: 'the return type of File.FileReadStream->Generator[\Char\] @ Library/File.fsi:84:5-90:8 should be a subtype of the return type of FileSupport.ReadStream->Generator[\String\] @ Library/FileSupport.fsi:100:5-106:8'. PLAN's line on the components outside the distance holds `File` and `FileSupport`.
- `MicroGptFlat`: 8 errors: three `DOT` calls on two unsized `Array[\RR64,ZZ32\]` (`:27`, `:31`, `:34`), two calls of `gather`, one of `view`, one 'Function body has type ((), ()), but declared return type is (ZZ32, ZZ32)', and one ambiguous coercion.
- `MicroGptFlatQuick`: 1 error, `MicroGptFlatQuick.fss:40`, `1.0 corpus.token(d, j)`: 'Ambiguous coercion in call to operator juxtaposition: of the declarations applicable to an argument of type (RadixPointNumeral[\2,1,10,10\], ZZ32) only by coercion, none is more specific than every other: ((RR64 & {Float}), RR64)->RR64; (QQ, QQ)->QQ.'

17 errors in all, against F-58's 26 on an earlier library. The three `DOT` refusals that F-58 reads as cleared are still there, now for the unsized arrays themselves. Row 533's kind is back in another form: a numeral with a radix point times a `ZZ32` value is tied between `RR64` and `QQ`; under walk the line runs. The model's static types (decision D, P-87) are a rung's real work and the curator's decision, so the probe stops on this line here. Behind the checker stand W15 and W16, and the model's arrays sized at run time (`array[\RR64\](n)`, `NatReflect`; rows 307 and 867), which this probe did not reach.

## 5. One timing

One timing, on a shared machine with other sessions running (load average 3.7 to 4.8 during it), the verifier off for the compiled run, `FORTRESS_THREADS=1`, OpenJDK 25, nproc 4, Intel Xeon @ 2.30GHz. The program, `DotU`: `Dot`'s two arrays of 1,000 `RR64`, and the loop `s += a[i] b[i]` over them run 5,000 times, 5 million iterations; both runs print `total = 2.4975E9`.

    compiled against the one library   real 1.4 s    (fortress run, JVM start included)
    walk, base build                   real 39.8 s   (JVM start and walk's load of the library included)

`Hello` alone takes 0.6 s compiled and 3.8 s under walk, so about 0.8 s against 36 s for the loop, some 45 times. It is one pair of runs, not taken together, and no claim about microGPT: the loop reads rank-1 arrays through `get` with boxed numbers and uses none of the library's reductions.

## 6. The walls grouped, against PLAN's phase 4 and phase 5 lines

**(a) What the switch itself needs.**

| wall | PLAN names it? |
|---|---|
| the two lines of `Shell.useCompilerLibraries()` (section 1) | yes: "The names, the switch-over itself" |
| W1, the new library order of fourteen compiles, about 200 s | no line states it |
| W2, the carriers: tables, two converters, the stores' carriers, 13 run-time classes re-parented, three stub files, 99 raise strings | in part: N5 names the foreign-type table (15 names), the raise strings (as 55) and row 874, as one rung; it names `FlatString`'s carrier as unmeasured |
| W2, the five objects that a hand-written class must carry (`Boolean`, `Char`, `NN32`, `RR32`, `FlatString`), W13 (`Int`, `Long`, `Float`, `UnsignedLong`, `BigNum` below their traits), W12 (the RTTI's second name), W14 (the superinterface) | no: no line holds the carrier design for a type that is an object in the one library, or for a trait with one comprised object |
| W2, `FlatString`'s Java stub and package | no |
| W3, `TraitTable`'s search by the prelude's api names, which hides rows 940 and 942 | no: the plan holds rows 940 and 942 as the code generator's, not as something the switch uncovers for the whole of `FortressBuiltin` |
| W11, `OverloadSet`'s four bare api names | no |
| the other names that the prelude's world keeps in source and this probe did not need: `Linker.java:150`, `ParallelismAnalyzer.java:199-201`, `Inlining.java`, `TopLevelEnv.java:976`, `Functionals.scala:1697`, `KindEnv.scala:117`, `:132` | in part: N5's "source files that name the prelude" |

**(b) What the library's own compile needs.**

| wall | PLAN names it? |
|---|---|
| W4, `NN32`'s `zero` and `one` at `Number` | no |
| W5, 24 refused declarations in 8 kinds (section 3) | yes: the F-34 line, "phase 4's second zero", with rows 624, 818, 819, 822 and 875; rows 81 (`label`), 315 (the closure class) and 540 (the intersection) are not on that line, and 540 is on phase 5's |
| W6, 244 methods written twice, with the wrong forwarder behind them | no: row 571 is on phase 5's line of generic and functional methods, as a row of its own, not as 27 classes of the library |
| W7, the verifier's refusals, `QQ`'s first | in part: row 307 "waits until after the switch-over"; here it stops the library's static initializer |
| W8, W9, W10: rows 624, 81 and 315 on the path of `println` | the rows are named (624) or not (81, 315); no line says that a one-line program needs them |

**(c) What a program with arrays needs beyond that.**

| wall | PLAN names it? |
|---|---|
| rank-1 arrays with the program's own loops: nothing beyond (a) and (b) | |
| W15, a tuple index type: rank 2 and 3 | no: row 832 is on the F-34 line as a sibling, not as what every matrix needs |
| W16, the library's `DOT`, `map`, `ivmap` | yes: phase 4's line from the generic-`distribute` probe, and phase 5's rows 495 and 496 |
| run-time sizes (rows 307, 867) | yes, by row |

**(d) What microGPT needs beyond that.**

| wall | PLAN names it? |
|---|---|
| the helpers' `I extends Index` | yes: PLAN item 61 |
| the model's static types: 15 of the 17 checker errors | yes: decision D, P-87, F-58 |
| the numeral times a `ZZ32`, tied between `RR64` and `QQ` | in part: row 533 is named as not reproduced; it reproduces in this form |
| `File` against `FileSupport` | yes: the components outside the distance |
| `gather`'s bound | no; a helper's line, by reading |

What the plan's lines do not name, in one list: the carrier design beyond the table (objects, traits with one comprised object, the RTTI's name, the superinterface, the Java stubs); the team's search hack in `TraitTable` and what it hides; `OverloadSet`'s package; `NN32`'s two getters; the duplicate methods as a property of the library's own traits, with the wrong forwarder; the verifier's count over the emitted library, which nothing measures; that rows 624, 81 and 315 stand on the path of a one-line program; the tuple index type as the wall of every matrix; the new library order.

## The hacks

All in `switch-rehearsal.patch`, each marked `SWITCH HACK`. The patch is the scratch tree's whole diff against `832f7d0d91`: 47 files.

1. `Shell.useCompilerLibraries()`: the switch (section 1).
2. `NamingCzar`, `Naming`, `FortressMethodAdapter`: the carriers' tables, the converters for `String`, `Any` and the two stores (W2).
3. The run-time classes re-parented, the stubs `fortress/FortressLibrary.java`, `FortressBuiltin.java` and `FlatStringC.java`, the new `FJavaArrayStore` and `FJavaRR64ArrayStore`, the raise strings (W2).
4. `FortressBuiltin.fss` and `.fsi`, `FlatString.fss` and `.fsi`: `Boolean`, `Char`, `NN32`, `RR32`, `FlatString` and `Float` made traits, each with a carrier object; `NamingCzar.javaPackageClassForApi`: `FlatString`'s class named `fortress/FlatStringC` (W2, W13). Walk does not run on the scratch library.
5. `TraitTable.scala`: the team's search extended to the one library's two prelude apis (W3).
6. `FortressBuiltin.fss`: `NN32`'s `zero` and `one` at `NN32` (W4); also the library's repair.
7. `CodeGen`, `CodeGenClassWriter`, `CodeGenMethodVisitor`: refused declarations left out, a method left open written as a throw (W5); of a method written twice, the copy that calls the class's own static method is kept (W6). `ByteCodeWriter`: of a class written twice, the first is kept (W10).
8. The run: the verifier off (W7). Not in the patch; a flag of the run.
9. Library stubs: `FlatString.fss`, its two calls of the varargs `assert`; `Stream.fss` and `.fsi`, the varargs `print` and `println`; `FortressLibrary.fss`, `Indexed.indexOf`, `Generator2.generate2`, the four postfix range operators (W8, W9).
10. `OverloadSet.java`: four names through `javaPackageClassForApi` (W11); also the repair.
11. `CodeGen.java` and `Naming.carrierDesc`: a carried type's `RTTIc` holds its carrier class (W12). `NamingCzar.extendsClauseToInterfaces`: a carried parent is its own interface (W14).
12. `FortressLibrary.fss`: `asFloat`'s body copied into `ZZ32` and `ZZ64` (W13).

In rungs, by this probe's judgement and no more: the carrier design is a design question first and then about three rungs (W2, W12, W13, W14); `TraitTable` or rows 940 and 942, one; `OverloadSet`, one small; `NN32` with the checker's acceptance, one; the duplicate methods, one or two; row 307's cast and the verifier's count, one, and what the count finds is unknown; varargs (row 624), one or two, and it is on every program's path; `label` and `exit` (row 81), one; the closure class (row 315), one; the tuple index type (W15), one or two; the generic dotted methods (W16), the rungs that rows 495 and 496 already carry.

## For the ledger

- **`NN32`'s getters `zero` and `one` are declared at `Number`, wider than the inherited `I`, and the checker accepts them; the code generator then stops `FortressBuiltin`** with 'Likely bug in static analysis, apparently malformed overload set not rejected for FortressBuiltin..NN32.one():Number'. Paths: `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:429-430`; `Library/FortressLibrary.fss:682-683`; `ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:411`. Seen only on the compiled path against the one library; walk runs the two getters.
- **The code generator writes one method twice into 27 classes of the one library (244 methods), each a `ClassFormatError` at load**: section 2, W6. Row 571 is its nearest row.
- **`TraitTable.lookUpTypeCons` searches the prelude's apis by name for an unqualified type, which hides rows 940 and 942 for the prelude's types**: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TraitTable.scala:76-100`. Not a new defect; a fact for rows 940 and 942.
- **No compiled value carries `JavaArrayStore` or `JavaRR64ArrayStore`**: `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FortressArrayStore.java:21` is a plain Java class, and `FortressMethodAdapter.toImplFFFF` finds no converter. Part of row 874.
- **The dispatch method of a generic overloaded function of a default library's component names the component's class without the package `fortress`, so its first call dies with `NoClassDefFoundError: FortressLibrary`**: `ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:904`, `:1361`, `:1724`, `:1728`. Seen only under the switch (W11); by reading, the prelude's `CompilerLibrary` would fail alike if it declared a generic overloaded function that a program calls.
- **A trait that declares its own method at the instance of a generic supertrait's method gets two forwarders under one name and descriptor, and which is first varies from compile to compile**: W6. `Library/FortressLibrary.fss:803-812` (`ZZ32`'s `CMP`, `MIN`, `MAX`) beside `:224-292`.
- **A trait or object that extends a type that a hand-written class carries gets the carrier class as its superinterface (`ClassCircularityError` at load)**: `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:799-824` (W14). Seen only under the switch.
- **A static argument inferred at run time from a carried type's RTTI names the trait's interface, not the carrier class, so the instantiation is another class than the one compiled code names**: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:5999` (W12). Seen only under the switch.
- **An abstract method over a trait's index parameter, implemented below at a tuple type, has no implementation at the instantiated descriptor: every rank-2 and rank-3 array of the one library dies at `m[i,j]`**: `Library/FortressLibrary.fss:2314`, `:2847`, `:3267` (W15). Row 832 is its nearest row.
- **`trait QQ comprises { Ratio }` passes `self` where `Ratio` is expected on 23 lines, each a `VerifyError` when `QQ`'s class loads, from the library's static initializer**: `Library/FortressLibrary.fss:554-660` (W7). Rows 307 and 695 hold the kind.
- **Row 533's kind reproduces against the one library for a numeral with a radix point times a `ZZ32` value**: `explorations/run-c4/src/MicroGptFlatQuick.fss:40`, `1.0 corpus.token(d, j)`, 'Ambiguous coercion in call to operator juxtaposition … ((RR64 & {Float}), RR64)->RR64; (QQ, QQ)->QQ', with the scratch library's `Float` a trait; walk runs the line. Not run on an unhacked library, whose compile path does not exist; a check with the distance stage's driver would settle whether the hack's `Float` plays a part.
- **Rows 624, 81 and 315 stand on the path of every compiled program against the one library**: `Library/Stream.fss:70-71` and `Library/FlatString.fss:63`, `:109` (varargs); `Library/FortressLibrary.fss:2188-2194` (`label` in `Indexed`); `Library/FortressLibrary.fss:2216-2228` (the closure class in `LexicographicOrder`, which `CMP`'s dispatch names). A note for each row.

## For FACTS

- **The code generator over the one library, on `832f7d0d91`, with every helper string as landed: 24 refused declarations in 8 kinds, 749 emitted, by `compile-ladder/plan-25/probes/codegen.sh` on a tree with this probe's hacks 2, 5 and 6; on the tree unchanged, three components are refused whole at row 874.** It replaces F-34's 38 in 10, which was measured with the helper strings on glue classes. The count is by row: 624, 7 and 1; 81, 4; 822 and 812, 4; 819, 4; 315, 2; 540, 1; 875, 1. It does not see the 244 duplicate methods or the verifier's refusals. Detail: section 3.
- **A compiled program has run against the interpreter's library in a scratch tree: one that prints a line, one that builds and reads an `Array1`, and a dot product in the program's own loop; a rank-2 array, the library's `DOT` and microGPT have not.** What it took is this report's twelve hacks; no test holds it, since nothing landed. Detail: sections 2 and 4.
- **microGPT's flat program has 17 errors of its own under the checker against today's one library, with `I extends Index` written in its helpers** (FlatArrays 7, FlatData 1 from `File`, MicroGptFlat 8, MicroGptFlatQuick 1), each count a floor. It replaces F-58's 26 as the current measure. Detail: section 4.

## Commands

- The library under the switch, each component by name with the edited classes first on the class path: `java $JAVA_FLAGS -Dfile.encoding=UTF-8 -Dfortress.caches=<caches> -cp "<classes>:$(bin/fortress_classpath | tail -1)" com.sun.fortress.Shell compile <component>.fss`, after deleting the component's jar, since a compile of an unchanged source with a jar writes nothing.
- A compiled run with the verifier off: `java -XX:+UnlockDiagnosticVMOptions -XX:-BytecodeVerificationRemote -cp "<classes>:$(bin/run_classpath)" com.sun.fortress.runtimeSystem.MainWrapper <Program>`, with `FORTRESS_CACHES` naming the caches.
- The classes of a jar that declare one method twice: a 40-line reader of the class file's method table over `zipfile`, not kept.

## Questions for the curator

A decision not taken: **which run-time class carries each built-in type of the one library on the compiled path.** The sources: the prelude's design, a trait carried by a hand-written class (`CompilerBuiltin.fss`, the type group's, 2009 to 2012, one of the late positions on the compiled number tower); the one library's design, a trait with one comprised value object in a native component (`FortressLibrary.fss`, `FortressBuiltin.fss`), with five types that are objects alone. The ways: (i) the hand-written class is the trait's class and the objects below go, their bodies moving into the traits, which changes the library's text and walk's bindings; (ii) the objects become traits with carrier objects, this probe's hack, which changes the library's shape and breaks walk as it stands; (iii) the code generator lets a hand-written class be an object's class, which keeps the library's text and is new code-generator work. None keeps today's behaviour, since today nothing compiles against the library. P-37 says that the one library takes a design of the prelude's where it is the team's later decision.
