<!-- A design review for the curator's decision, before the switch-over's work is planned, on which run-time class carries each built-in type of the interpreter's library on the compiled path (the rehearsal's walls W2, W12, W13 and W14), written 2026-11-13 by a Fable worker, reading only, with one compiled probe: nine ways from the language, the two libraries, the code generator and the run time, each shown on `ZZ32`, `Boolean`, `String` and `Float`, with what it changes, what it does for unboxed numbers, whether it can be undone, what the team's texts say by provenance, and what Scala, Kotlin, Swift and Julia do; the ways sorted, and a recommendation: the object's class carries the value and the trait stays an interface (walk's own way), with the merge of each number trait and its one object as a second step for the curator to rule on. -->

# Which class carries a built-in type on the compiled path: the ways

## The answer in short

- A carrier is the JVM class whose instances are the values of a built-in type at run time. Today `FZZ32`, a class written by hand in Java, carries the prelude's `ZZ32`.
- The two libraries declare a built-in type in two shapes. The prelude says `trait ZZ32`, and `FZZ32` is the trait's class. The interpreter's library says `trait ZZ32 comprises { Int }` with `value object Int extends ZZ32`, and `value object Boolean` with no trait at all.
- I found nine ways. Four give the type its class (A to D). Three are ruled out (E, F, G). Two are later layers for speed, not carriers (H, I).
- The four that count:
  - **A.** The trait's class is written by hand, and the objects leave the library. This is the prelude's way, whole.
  - **B.** The trait's class is written by hand, and an empty object stands below each trait. This is the rehearsal's hack.
  - **C.** The object's class carries the value. The trait stays a plain interface. The library's text does not change. This is walk's own way, brought to the compiled path.
  - **D.** One object per type: each number trait is merged with its one object, as `NN32`, `RR32`, `Boolean` and `Char` already are. Then C's machinery, with one name per type.
- The team's later word, the library as the team wrote it, and the peers do not point to one way. The library as written points to C. The peers point to D. The team's later code is A's shape, but its author called it a special case "for the time being", and its own plan for unboxing is written over objects and `comprises` clauses, which is C's and D's shape.
- I recommend C now, and D as a second step that the curator rules on apart. C changes no line of the library, keeps walk as it is, removes W13 and W14 by construction, and closes the hole of ledger row 866. It gives up the prelude's trick of one hand-written class per type with no change in the code generator: the code generator must learn that a native object has a payload.

## The words

- **Built-in type.** A type whose values the language's implementation makes, not a constructor call: the numbers, `Boolean`, `Char`, the flat string, and a few Java-backed values (a reader, a writer, an array's store).
- **Carrier.** The JVM class of a built-in type's values on the compiled path.
- **Payload.** The Java value inside a carrier: an `int` in `FZZ32`, a `double` in `FRR64`, a `java.lang.String` in `FJavaString`.
- **Box.** A carrier object on the heap. A number is unboxed where the compiled code holds the payload itself: a JVM `double` in a local, a field or an array.
- **Springboard.** The class `T$DefaultTraitMethods` that the code generator writes for a trait `T`. It holds the trait's method bodies. An object's class extends the springboard of the first trait that the object extends (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:888-909`).
- **Stub.** A Java source file that declares, empty, the classes that the code generator will write, so that hand-written Java can extend them before any Fortress is compiled: `ProjectFortress/src/fortress/CompilerBuiltin.java`.
- **Closed type.** A type that no program can extend: an object, or a trait whose `comprises` clause lists its only subtypes. An open type is a trait without such a clause.
- **Native component.** A component declared `native component`. The specification says that inside one "the syntax and semantics are implementation dependent" (`Specification/basic/components/source-code.tex:513-518`). The library's four are `FortressBuiltin`, `FlatString`, `Reflect` and `AnyType`.

## What stands today

### The prelude: a trait, and a class written by hand

    trait ZZ32 extends { Number, Equality[\ZZ32\], StandardTotalOrder[\ZZ32\] }
            excludes { ZZ64, RR32, RR64 }
        opr +(self, other:ZZ32): ZZ32 = jIntOverflowingAdd(self,other)
        ...
    end

(`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:662`.) Beside it, in Java:

    public final class FZZ32 extends fortress.CompilerBuiltin.ZZ32.DefaultTraitMethods
            implements fortress.CompilerBuiltin.ZZ32 {
        final int val;
        public int getValue() {return val;}
        public static FZZ32 make(int x) { return new FZZ32(x); }
        public RTTI getRTTI() { return RTTIc.ONLY; }
    }

(`ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FZZ32.java:14-43`.)

- The code generator writes the interface `fortress/CompilerBuiltin$ZZ32` and its springboard from the trait.
- `FZZ32` extends that springboard. So the Java build needs the stub file.
- A table says that the type `ZZ32` is written `FZZ32` in every descriptor: `compiler/NamingCzar.java:587-601`, and a copy for the run in `runtimeSystem/Naming.java:294-306`.
- The class of `Box[\ZZ32\]` is named with the carrier: `Box⟦com|sun|fortress|compiler|runtimeValues|FZZ32⟧` (`runtimeSystem/Instantiater.java:56`).
- Fifteen names are carried so: `Boolean`, `Character`, `ZZ`, `ZZ64`, `ZZ32`, `NN32`, `NN64`, `RR32`, `RR64`, `JavaString`, `JavaBufferedReader`, `JavaBufferedWriter`, `ZZ32Vector`, `StringVector` and `()`.

The prelude's trait is open. A program may write `object MyNum extends ZZ32`. The checker takes it, the compile exits 0, and the run dies: 'IncompatibleClassChangeError: class OpenZ$MyInt can not implement com.sun.fortress.compiler.runtimeValues.FZZ32, because it is not an interface'. Ledger row 866 holds this. I ran it again today (section "The probe").

### The interpreter's library: five shapes

1. **A trait with one native object below it.** Five types.

       trait ZZ32 extends { AnyIntegral, Integral[\ZZ32\], Index }
               excludes { ZZ64, ZZ, NN64, NN32 }
               comprises { Int }
           asFloat(self): RR64
           opr =(self, b:ZZ32):Boolean = builtinPrimitive("...simpleIntArith.intEQ")
           ...
       end

   (`Library/FortressLibrary.fss:775-777`.)

       value object Int extends ZZ32
           getter asString(): String = builtinPrimitive("...simpleIntArith.intToString")
           asFloat(self): RR64 = builtinPrimitive("...simpleIntArith.intToDouble")
       end

   (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:379-386`.) The five pairs: `ZZ32` and `Int`, `ZZ64` and `Long` (`:388`), `ZZ` and `BigNum` (`:544`), `NN64` and `UnsignedLong` (`:533`), `RR64` and `Float` (`:61`). The object holds little for four of them: `asString`, `asExprString`, `asFloat`. For `RR64` it holds everything: `Float` has 146 lines of arithmetic.
2. **A native object alone.** `value object Boolean` (`FortressBuiltin.fss:554`), `value object Char` (`:590`), `value object NN32` (`:427`), `value object RR32` (`:212`), and `object FlatString` (`Library/FlatString.fss:34`). No trait stands above.
3. **`String`.** A trait (`Library/FortressLibrary.fss:4511`) with four objects: the native `FlatString`, and the plain `CatString`, `EmptyString` and `SubString` (`Library/String.fss:75`, `:282`, `:353`).
4. **A trait with a plain object.** `trait QQ comprises { Ratio }` and `value object Ratio(num: ZZ, den: ZZ)` (`FortressLibrary.fss:554-557`, `:648`). `Ratio` is ordinary Fortress. It needs no carrier in any way.
5. **A Java-backed trait with a private native object.** `JavaBufferedWriter`, `JavaBufferedReader`, `JavaArrayStore`, `JavaRR64ArrayStore` (`FortressLibrary.fss:1987`, `:1998`, `:2442`, `:2448`), each with a private object in `FortressBuiltin` (`:55`, `:58`, `:720`, `:725`). The revival made these (P-164, P-169, F-330, F-333).

Under walk, a native object's values come from a Java class of the object's own name. `BuildNativeEnvironment.nativeConstructor` builds the class name from the component's line `private package="com.sun.fortress.interpreter.glue.prim"` and the object's name (`interpreter/evaluator/BuildNativeEnvironment.java:42-57`; `FortressBuiltin.fss:15-16`). So walk's rule is: **in a native component, a class written by hand is the object's class.** `glue/prim/Int.java` is `Int`'s, and its values are `FInt` objects.

Walk already treats `Int` and `ZZ32` as one type where it matters. It reads a value of `Int` at `ZZ32` where it infers a static argument, so `Cell(3)` is a `Cell[\ZZ32\]`, and it prints `ZZ32` (F-344, F-328).

## What the rehearsal met

The rehearsal of 2026-11-10 switched a scratch tree's compiled path onto the interpreter's library (`explorations/compile-ladder/plan-31/probes/switch-rehearsal.md`). Four of its walls are this design.

- **W2.** The wrappers of the helper classes cannot name a class for `FortressLibrary$String` or `FortressLibrary$ZZ32`. Behind that: thirteen hand-written classes extend the prelude's springboards by name; five carried types are objects, and a hand-written class cannot extend an object; the stores have no Fortress value; `FlatString`'s classes cannot be stubbed in Java.
- **W12.** A carried type has two names at run time. The trait's `RTTIc` holds the trait's interface. The descriptors hold the carrier. A static argument read from a value named the first; the classes were made under the second.
- **W13.** `asFloat` has no body on a compiled `ZZ32`: the trait declares it, the object `Int` defines it, and the carrier was the trait's class.
- **W14.** `Float extends RR64` became an interface that extends the class `FRR64`: the code generator names a carried type by its carrier in an `extends` clause too.

The rehearsal's hack for W2 turned the five objects into traits with `comprises { XCarrier }` and an empty object. That broke walk in the scratch tree. Its hack for W13 copied `asFloat` into `ZZ32` and `ZZ64`, and made `Float` a trait.

All four walls come from one mismatch: the prelude's way puts the class on the trait, and the interpreter's library puts the values on the object.

## The ways

Each way is shown on `ZZ32` first, then on `Boolean` (an object alone), `String`, and `Float` (a number below a number trait). The costs are by reading, not built. A rung is one unit of the record's work, with its tests.

### Way A. The trait's class is written by hand, and the objects leave the library

This is the prelude's way, carried over whole.

**On `ZZ32`.** The library's text changes:

    trait ZZ32 extends { AnyIntegral, Integral[\ZZ32\], Index }
            excludes { ZZ64, ZZ, NN64, NN32, ... }
        asFloat(self): RR64 = builtinPrimitive("...simpleIntArith.intToDouble")
        getter asString(): String = builtinPrimitive("...simpleIntArith.intToString")
        ...
    end

`Int` is deleted, and its three bodies move into the trait. In Java:

    public final class FZZ32 extends fortress.FortressLibrary.ZZ32.DefaultTraitMethods
            implements fortress.FortressLibrary.ZZ32 { final int val; ... }

**On `Boolean`.** `value object Boolean` becomes `trait Boolean`, with `FBoolean` as today. The same for `Char`, `NN32`, `RR32` and `FlatString`.

**On `String`.** `String` stays a trait with its three plain objects. `FlatString` becomes a trait that `FJavaString` carries. This is the prelude's `trait JavaString extends String`.

**On `Float`.** `Float`'s 146 lines move into `trait RR64`, over the bodies that `RR64` has today. `FRR64` carries `RR64`.

**The rule that blocks it.** A trait is open. An object excludes every type that it does not extend; a trait excludes only what its `excludes` clause lists. When the rehearsal made the five objects traits, the apis failed the overloading check with 15 errors, such as 'Invalid overloading of || in trait FlatString: (FlatString, Char)->String and (String, Number)->String' (its W2). The prelude gets around this by writing an `excludes` list on every built-in trait by hand: `trait NN64 ... excludes { ZZ32, ZZ64, RR32, RR64, NN32, ZZ }` (`CompilerBuiltin.fss:818`). Steele called this "quadratic blow-up" in 2016 (`research/extracts/SteeleJuliaCon2016-extract.md:356-365`). And the lists do not close the type: row 866.

**What it changes.**

- The library's text: five objects deleted, five objects made traits, about 180 lines moved, an `excludes` list on each of ten traits. The `comprises` clauses of the five number traits go.
- Walk: its values need an object type. `FInt` is made by `Int`'s constructor class. With no object, walk's native constructors, its carriers of `self` (`interpreter/glue/StaticNativeApp.java`) and the reading of F-344 are rebuilt for traits. This is the largest part.
- The code generator: nothing new for the carriers. The tables are renamed.
- The run-time classes: thirteen classes re-parented, three stub files, as the rehearsal did.
- The loader: no change.
- The tests: `tests/LanguageTypeInstancesWalk` and each test that names `Int`, `Float` or the others as a type. The checker's count and the distance must reach 0 again after the `excludes` lists.

**Speed later.** It hinders. An unboxed `RR64` needs the compiler to know that a value of static type `RR64` is exactly one class. An open trait does not say so, so the code generator would have to treat the fifteen names as special for ever, against the checker's own view. Dispatch on a built-in type tests one final class, as today.

**Undo.** Costly. The library's and walk's text are rewritten. Going back means writing the objects again.

**The team's texts.** For: the prelude's source and the run time are this way, built alike for all its types from 2009 to 2012. Against: its author called it a special case for the time being; the reasons that made the prelude's types traits are gone; the specification calls a primitive a value object. The section "What the team's texts say" gives each with its date.

### Way B. The trait's class is written by hand, and an empty object stands below each trait

This is the rehearsal's hack, made a design.

**On `ZZ32`.**

    trait ZZ32 ... comprises { Int }
        asFloat(self): RR64 = builtinPrimitive("...intToDouble")   (* moved up from Int *)
        ...
    end
    value object Int extends ZZ32 end                              (* empty *)

`FZZ32` extends `ZZ32`'s springboard, as in way A. The empty object keeps the trait closed for the checker.

**On `Boolean`.** `trait Boolean comprises { BooleanCarrier }` with `object BooleanCarrier extends Boolean end`, and `FBoolean` on the trait.

**On `String`.** `trait FlatString extends String comprises { FlatStringCarrier }`, and `FJavaString` on the trait.

**On `Float`.** `trait RR64 comprises { Float }` takes `Float`'s 146 lines; `Float` is left empty.

**What blocks it.** The object is a declaration with no values on the compiled path, and with all the values under walk. The rehearsal says that its hack "breaks walk in the scratch tree, which binds these objects' natives". W12 stays: the type still has two names.

**What it changes.** The library's text as in way A, plus five new empty objects. Walk: its natives move from the objects to the traits, or the two paths read two texts, which P-37 forbids. The code generator, the run-time classes and the loader as in way A.

**Speed later.** The trait is closed, so it leaves unboxing open. But the code generator must still know that the trait's class is `FZZ32` and not the listed object's.

**Undo.** As way A.

**The team's texts.** None shows a trait with an empty comprised object. It is in no text.

### Way C. The object's class carries the value, and the trait stays an interface

This is walk's way, brought to the compiled path. The library's text does not change.

**On `ZZ32`.** The declarations stay as they are today. The code generator compiles them as it compiles any trait and object, with one addition for a native object:

    interface fortress/FortressLibrary$ZZ32                      (from trait ZZ32)
    final class fortress/FortressBuiltin$Int implements ...$ZZ32 (from value object Int)
        final int val;
        static Int make(int)        int getValue()

- The carrier is `Int`'s class. It has `asFloat`'s body, because `Int` declares it. So W13 does not arise.
- `Int extends ZZ32` names the interface, as every `extends` clause does. Nothing extends a carrier, because nothing extends an object. So W14 does not arise.
- A table gives each native object its payload: `Int` an `int`, `Float` a `double`, `FlatString` a `java.lang.String`, `BigNum` a `BigInteger`. This is the table of `NamingCzar` today, keyed by the object.
- One rule answers W12: a value of a native object is read at its trait where a static argument is formed, and the stamped class is named by the carrier. Walk has this rule (F-344). The checker already lets a value of `trait T comprises { O }` stand where `O` is expected (the rehearsal's W7).
- A value of static type `ZZ32` is exactly an `Int`, because the trait says `comprises { Int }`. So a descriptor for `ZZ32` may name `Int`'s class, as a descriptor names `FZZ32` today. The cast that row 307 asks for is the same knowledge.

**On `Boolean`.** `value object Boolean` compiles to its own class, with a `boolean` payload. Its methods written in Fortress (`cond`, `generate`, `=`) are the object's methods. No trait, no second name.

**On `String`.** `String` is an interface. `FlatString`'s class holds a `java.lang.String`. `CatString`, `EmptyString` and `SubString` are plain classes. A helper's Java `String` result becomes a `FlatString` value. The wrapper generator reads a helper's Java `String` parameter as the trait `String` (`NamingCzar.java:484`), so the wrapper casts it to `FlatString`'s class: the rehearsal's new converter. The cast is safe because the library's bindings pass a `FlatString` there: walk refuses a helper parameter declared `String` other than `self` (the skill's `references/interpreter.md`, "Natives"). The table could read such a parameter as `FlatString` instead. This is the same in every way.

**On `Float`.** `Float`'s class holds a `double` and has its 146 lines as its own methods. `RR64` is an interface. A call `x + y` on two `RR64` values dispatches to `Float`'s `+`, as under walk.

**Where the class comes from: three forms.** This choice is inside way C.

1. Written by hand, extending the object's generated springboard, as `FZZ32` extends the trait's today. It needs the stub files, and `FlatString` cannot be stubbed in Java (the rehearsal's W2: Java allows no class `FlatString` nested in a class `FlatString`).
2. Written by the code generator, over a small payload class written by hand: `abstract class FZZ32 extends FValue { final int val; getValue() }`, and the generated `Int extends FZZ32`. No stub is needed, because the hand-written class extends nothing generated. The run time's Java keeps a name to test, as `nativeHelpers/equalityRule.java:38` tests `instanceof FZZ32`. The object then takes its traits' default methods by forwarding methods, which the code generator already writes for every trait after the first (`CodeGen.java:888-909`).
3. Written whole by the code generator, with the payload as a hidden field. The run time's Java then reaches the payload through a small interface.

Form 2 looks best to me: no stubs, and the box's chain of constructors is three classes, `Int`, `FZZ32`, `FValue`. Today's chain through the one library's springboards is six, which leaves a margin of two frames before HotSpot stops removing temporary boxes (F-302). Not measured.

**What blocks it.** The code generator compiles an object without value parameters as a singleton, one instance. A native object has many values. The specification leaves a native component's meaning to the implementation, and walk uses that freedom in the same place. So the block is in the code generator only, and it gets around it as walk does: by the component's `native` mark and a table.

**What it changes.**

- The library's text: nothing. (`NN32`'s `zero` and `one`, the rehearsal's W4, are a defect apart.)
- Walk: nothing.
- The code generator: a native object gets a payload, `make` and `getValue`, and many instances; the tables are keyed by the object; a trait with one comprised native object is named by that object's class in descriptors; the wrapper generator's converters read the same table. About three rungs, the rehearsal's own estimate for W2's repair, with W12's rule among them.
- The run-time classes: the thirteen become payload classes (form 2) or are re-parented (form 1). `equalityRule`, `FValue.asString`, `Utility` and `FException` name the new classes. The helpers' 99 raise strings change in every way.
- The loader: the run's copy of the table (`Naming.java`), and one canonical name for a stamp.
- The tests: the compiled tests stay. New tests: `typecase x of Int`, `Box(3)` as a `Box[\ZZ32\]` compiled, a program's `object MyNum extends ZZ32` refused by the checker (row 866's test promoted).

**Speed later.** It helps.

- The type is closed in the language itself. So "a value of static type `RR64` is a `double`" is sound, and the code generator can choose unboxed arithmetic by static type (PLAN's phase 6, decision B; P-17).
- In a field: a field declared `RR64` in a plain object can become a `double` field. A field of type `T` in `Box[\T\]` needs the loader to stamp a different class (F-18); the canonical name of W12's rule is what it would key on.
- In an array: the store is already a `double[]` (`JavaRR64ArrayStore`, F-333; P-84). The carrier decides only which box `get` returns until phase 6.
- Across a call: a function `f(x: RR64): RR64` can take the descriptor `(D)D`, because no other class can arrive.
- Dispatch on a built-in type tests one final class, as today. With the closed type, the test can be dropped where the static type is the trait.
- The team's bytecode optimizer finds a box by the methods `make` and `getValue` on a carried type (`compiler/asmbytecodeoptimizer/MethodInsn.java:71-85`). Way C keeps both names.

**Undo.** Cheap. The library and walk are untouched. Going to way D later is additive. Going to way A later costs what way A costs today.

**The team's texts.** For: the interpreter's library as written; walk's native components; the specification's value objects and its `trait Boolean ... comprises { ... }`; Chase's unboxing plan of 2009, whose cases are objects and `comprises`. Against: the prelude and its run time put the class on the trait.

### Way D. One object per type: each number trait merged with its one object

This is the library's own way for `NN32`, `RR32`, `Boolean` and `Char`, applied to the five number traits. It is way C plus one change of the library's text.

**On `ZZ32`.**

    value object ZZ32 extends { AnyIntegral, Integral[\ZZ32\], Index }
        coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) = v.asZZ32
        asFloat(self): RR64 = builtinPrimitive("...simpleIntArith.intToDouble")
        opr =(self, b:ZZ32):Boolean = builtinPrimitive("...simpleIntArith.intEQ")
        ...
    end

`Int` is gone. The `excludes` and `comprises` clauses go too: an object excludes every type that it does not extend. The class:

    final class ZZ32 { final int val; ... }     (one declaration, one class, one name)

**On `Boolean`.** Nothing changes: it is already this shape. The same for `Char`, `NN32`, `RR32`.

**On `String`.** Nothing changes: `String` has four objects, so it stays a trait, as in way C.

**On `Float`.** `value object RR64` takes `Float`'s 146 lines. About 50 bodies of `trait RR64` go: `opr +(self,b:RR64):RR64 = asFloat(self) + asFloat(b)` and its like (`FortressLibrary.fss:408-504`; 57 lines of the trait hold `asFloat(self)`). They served when `RR64` had four subtypes. Today every `RR64` is a `Float`, so `Float`'s own `+` is always the more specific one, and by the dispatch rule these bodies never run. By reading; no test shows it.

**Why the split is there.** It was made for two reasons, and both are gone.

- Maessen split `ZZ32` on 2008-07-15 so that `IntLiteral` could be a subtype of `ZZ32` (`fca589bbb0`: "ZZ32 is now a trait, with subtypes Int and IntLiteral"). The numerals have their own types now (P-173, P-174), and `IntLiteral` left the library.
- The other traits had subtypes by nesting: `trait ZZ64 ... comprises { Long, ZZ32 }` at the team's last commit. The tower is flat now (P-43).

So each of the five traits has exactly one object, and the split serves nothing that the record names.

**What blocks it.** Under walk, an object with native values must be in a native component. `FortressLibrary` is not one. So the five move into `FortressBuiltin`, beside `NN32` and `RR32`, or walk learns one more place. The names `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong` go: by a grep of whole words, the library names them on 4, 4, 41, 4 and 4 lines, almost all in their own declarations. A few tests name one as a type, among them `tests/NumberPrintTest.fss:31-35`, `tests/NativeHelperFloatCarriedWalk.fss:5-6` and `compiler_tests/XXXNativeHelperOwnUnsignedLongCompiled.fss:8`. No model line does.

**What it changes.**

- The library's text: five objects deleted, five traits made objects and moved, about 600 lines moved, about 50 dead bodies deleted.
- Walk: five constructor classes renamed; the reading of F-344 and the ilk names of F-328 become needless for the numbers and stay for the strings.
- The code generator: as way C, without the rule for a trait with one comprised object, and without W12's rule for the numbers.
- The run-time classes and the loader: as way C.
- The tests: `tests/LanguageTypeInstancesWalk` and `tests/FlatTowerRungF` change where they name the objects. The checker's count and the distance are run again. I did not run them: this is the first probe to make before the way is chosen.

**Speed later.** As way C, and a little more: one declaration per operator instead of two, so the dispatch method of `+` has one arm less for each number type, and the static type is the class with no rule in between.

**Undo.** The merge is mechanical each way, but it changes text that the team wrote. From C, it can be taken at any time. From D back to C, the objects are written again.

**The team's texts.** For: `NN32` (Steele, 2008), `RR32` (Ryu, 2008), `Boolean` and `Char` are this shape in the library; the prelude's first number types were objects (Flood, 2009-03-03); the library's own complaint about `Float` against `RR64` (below); every peer. Against: the specification's api style shows a built-in type as a trait with hidden comprised types; the split is the team's text, though its reasons are gone.

### Way E. The payload written in the library's text

    value object Int(v: JavaInt32) extends ZZ32
        asFloat(self): RR64 = intToDouble(self.v)
    end

The object is plain Fortress, and its one field has a Java-backed type. The code generator writes the class as for any object. The library does this for `Ratio(num: ZZ, den: ZZ)`, for the I/O objects over `JavaBufferedWriter` (P-164) and for the arrays over `JavaArrayStore` (F-333).

**What blocks it.** It does not end. `JavaInt32` is itself a built-in type that needs a carrier, by one of the other ways. The language has no type for a Java `int`: the specification lists a foreign-function interface among the things to do (`Specification/appendices/future.tex:706-710`; P-58), and the prelude's `import java` reads a Java `int` back as `ZZ32` itself (`NamingCzar.java:439-440`). So way E adds a second box around the first. That hinders speed until fields are unboxed.

It is the right way for a type made of other types, and the library already uses it there. It is not a way for the numbers.

### Way F. The JDK's own classes as carriers

`ZZ32` is `java.lang.Integer`, `String` is `java.lang.String`, as Kotlin does for a boxed `Int`.

**What blocks it.** Every Fortress value implements the interface `fortress/AnyType$Any` and answers `getRTTI()` (`compiler/runtimeValues/FValue.java:14-19`). A JDK class cannot implement an interface of ours. The team wraps instead: 'because we know these types are already loaded and not eligible for ASM-wrapping' (`NamingCzar.java:416-418`). To get around it, `Any` would be erased to `java.lang.Object` and the type of a value found from its class. The team's paper names that erasure only for union types (`Papers/Implementation/TypeMapping.tex:177`). It would change dispatch, RTTI and every descriptor. Ruled out by cost.

### Way G. The prelude's built-in types kept as a compiled-only component

The compiled path keeps a small `CompilerBuiltin` with the carried traits, and the one library's `ZZ32` is an alias of it.

**What blocks it.** P-37 deletes the prelude's three files. A `type` alias stops its component on both paths (row 18). And walk would read another text than the compiled path. Ruled out.

### Way H. No class: a JVM primitive, chosen by static type

A local of type `RR64` is a JVM `double`; `f(x: RR64): RR64` is `(D)D`; the box is made only where the value meets `Any`, a trait above it or a type parameter. Scala and Kotlin do this.

This is not a carrier. It is the layer that P-17 requires and that PLAN's phase 6 names as decision B. A box class is still needed, and ways A to D say which. The team planned this layer: Chase's `Unbox.java` (below), and the six names of `NamingCzar.java:262-281`, of which the third is "I, the signature encoding of Java int". It needs the type closed: ways C and D give that by the language, way B by its empty object, way A not at all.

### Way I. Classes specialised by the loader

`Box⟦RR64⟧` gets a `double` field, where today the loader only renames `T` to `FRR64` (F-18). The loader's stub for it is empty: '// Here will go all the magic expando-stuff.' (`runtimeSystem/InstantiatingClassloader.java:168-172`). C# does this.

Also a later layer, not a carrier: way A4 of the array decision (P-85). It keys on the name of the static argument in a stamp, so it needs W12 answered, which every way must do.

## What the team's texts say, by provenance

The dates are git's. The conversion of the history cut parent links, so a specification file's first commit is often Ryu's reorganisation of autumn 2009, not its writing (`research/authorship.md`, the caveats).

**The interpreter's library, 2007 to 2008: the team's earlier word on the shape.**

- `object Boolean`: Maessen, 2007-01-04 (`72ae6881b1`). `object Char`: Allen, 2007-11-06 (`54a128283d`). Both made `value` by Maessen, 2008-09-14 (`8a6c6aa9aa`).
- `object Float extends RR64`, `object Long extends ZZ64`: Maessen, 2008-04-15 (`900bff59b6`): "Moves all numeric types across to the new native types story."
- `value object RR32`: Ryu, 2008-07-09 (`9a842ffca9`). `BigNum`: Flood with Steele, 2008-07-10 (`e704c736f0`). `value object NN32`, `UnsignedLong`: Steele, 2008-07-21 (`dc41d50003`).
- `ZZ32` split into a trait with `Int` and `IntLiteral`: Maessen, 2008-07-15 (`fca589bbb0`). His message names the cost, which is W12: "when you stuff the results into a polymorphically-typed container (such as Maybe or List) the type variable will invariably be dynamically instantiated with Int, rather than ZZ32 as you'd expect."
- The same cost, written into the library in 2010 (`e40544c318`): "`List[\Float\]` is not type-compatible to `List[\RR64\]` and we will get the unification error" (`Library/ReflectiveQuickCheck.fss:234-236`).

Maessen wrote most of the library and of walk's glue (`research/authorship.md`, "Who wrote what").

**The specification, the Working Draft of February 2011: earlier, and the language's word.**

- A primitive is a value object: "An object declaration with the modifier value declares a value object that is called in many languages a primitive value" (`Specification/basic/objects.tex:370-371`). Booleans, floats and "integers of every precision" are value objects, and "an implementation may freely copy value objects" (`:40-46`).
- An api shows a built-in type as a trait whose comprised types are hidden: `trait Boolean ... comprises { ... }` (`Specification/basic-lib/booleans.tex:18-37`); the three dots are allowed only in an api (`Specification/basic/traits.tex:161-162`).
- A native component's meaning is the implementation's (`Specification/basic/components/source-code.tex:513-518`).

This is the shape of the interpreter's library: a trait in the api, value objects below, in a native component. It speaks for way C. It does not say whether a trait has one object or several.

**Chase's plan for unboxing, 2009-03-11 (`ecd4c41e05`): the compiler's author, eight days after the prelude's first number types.**

    Cases for unboxing:
    1) primitive.  ZZ{8,16,32,64}, RR{32,64}, Boolean
    2) singleton (non-generic) object.
    3) unboxed fields
    4) comprises unboxed

(`compiler/optimization/Unbox.java:21-27`.) Case 4 is a trait whose `comprises` clause lists unboxable types: "one choice, of several, provided that each of the comprised items is also unboxable" (`:160-163`). With one choice, the tag takes no bits. So in the team's own plan, `trait ZZ32 comprises { Int }` unboxes to `Int`'s 32 bits. The plan is written over objects and `comprises` clauses. It has no case for an open trait.

**The prelude and its run time, 2009 to 2012: the team's later code.**

- `object ZZ32 extends Number`, and `ZZ64`, `RR32`, `RR64`: Flood, 2009-03-03 (`b2880c05c2`). `FZZ32.java`: Flood, 2009-03-09 (`2f8744701d`). So the prelude's first number types were objects, in the interpreter's shape.
- They became traits on 2009-03-30, by Maessen (`76c267f987`), to nest them and to put the literals below: `trait ZZ32 extends ZZ64`, `object IntLiteral extends ZZ32`. The commit's message is about error messages; the reason is in the diff.
- Chase flattened them on 2009-08-31 (`6896886fbc`): `trait ZZ32 extends Number`. The traits stayed traits.
- The later types followed the pattern: `Char` (Naden, 2011-06-16, `7bc4e5e597`; renamed `Character` by Steele, `c2c769094c`), `JavaBufferedReader` and `JavaBufferedWriter` (Steele, 2011-07-12, `1238ab95e6`: "new primitive types"), `trait JavaString extends String` (Steele, 2011-11-17, `2eb54ef20a`; until then the prelude had one carried `trait String`, as `796b6d3da5` of 2011-11-14 still shows, so Steele split it into the interpreter's shape, a `String` above a flat leaf), `NN32` (Tristan, 2011-11-23, `25f7cf9132`), `ZZ` and `NN64` (Tristan, 2012-01-03, `b22c4ac561`).
- Chase's paper on the mapping, in the tree from 2012-05-21 (`4a839480fc`): "For the time being, some primitive types are treated as special cases" (`Papers/Implementation/TypeMapping.tex:91-92`), above the table of `FZZ32` and the others. The same paper gives the rule for every other type: a trait is an interface, an object is a final class (`:78-83`).
- The comment on the table's test: 'arguably that is a bug in how these are defined' (`compiler/NamingCzar.java:605-610`).
- Steele's talk of 2016 shows the built-in types as traits and names the `excludes` lists as the problem of that shape (`research/extracts/SteeleJuliaCon2016-extract.md:345-372`).

### Is the prelude's carrier the team's later decision, type by type (P-37)

P-37 says that the one library takes a design of the prelude's where it is the team's later decision. P-26 says what counts: code "where the team built it alike for all its types" counts, and code "that its author called a stub", or that works around a limit, does not.

The prelude's carrier has two parts, and they answer differently.

- **The class: a final class that holds one JVM primitive, with `make` and `getValue`.** Later, built alike for all the types, and kept by every way here. Yes, it is the team's later decision, and ways A to D all take it.
- **The class put on a trait, with no object.** Later in date for every type. But I read it as not a decision of the language, for four reasons: its author called it a special case "for the time being" (2012); the number traits became traits to nest and to hold the literals, and both reasons are gone from both libraries; the open trait lets a program break the run (row 866); and the team's own unboxing plan has no case for it. P-26 has a clause on each side here, so the reading is the curator's to rule.

By type:

- `ZZ32`, `ZZ64`, `RR32`, `RR64`: an object first (`b2880c05c2`, 2009-03-03), a trait from `76c267f987` (2009-03-30), flat from `6896886fbc` (2009-08-31). The interpreter's `Int`, `Long`, `Float` and `RR32` are of 2008. Later in date; the trait form came from nesting and literals. Not a later decision, in my reading.
- `Boolean`: a trait in the prelude from 2009-04-15 at the latest (`bfa396091b`, Flood). The interpreter's object is of 2007. The same reading.
- `Character`: a trait from `7bc4e5e597` (2011-06-16). The interpreter's `Char` is of 2007. The carrier: the same reading. The name `Character` is Steele's later word, 'as in Fortress spec 1.0 beta' (`c2c769094c`); it is outside this review.
- `String` and `JavaString`: the two libraries agree. `String` is a trait, and a flat leaf holds a Java string: the prelude's `JavaString`, the library's `FlatString`, which Maessen renamed from `JavaString` on 2009-01-05 (`5335ab745d`). The prelude came to this shape late, on 2011-11-17 (`2eb54ef20a`), so here the prelude's later decision is the interpreter's own shape. Nothing to take but the trait form of the leaf: the same reading.
- `NN32`, `NN64`, `ZZ`: traits by Tristan, 2011-11-23 and 2012-01-03, on the pattern. The interpreter's objects are of July 2008. The same reading.
- `JavaBufferedReader`, `JavaBufferedWriter`: Steele, 2011-07-12. Already taken: P-164 gave the one library the prelude's two traits by name and method. Under way C their carrier is the private object's class, not the trait's.
- `ZZ32Vector`, `StringVector`: Flood, 2011-09-07 (`24717d4adf`). The one library has arrays in their place (P-84, P-85). Nothing to take.
- `()`: `FVoid` on both sides. No question.

## The peers

Context only.

- **Scala.** `Int` is declared `final abstract class Int extends AnyVal`: one final type, no interface above it. The compiler maps it to a JVM `int` and boxes it to `java.lang.Integer` where it meets `Any` or a type parameter. A value class (`class Meter(val v: Double) extends AnyVal`) is a one-field wrapper that the compiler erases to its field.
- **Kotlin.** `Int` is a final class of the standard library with intrinsic members. It is a JVM `int` where it is not nullable and not a type argument, and a `java.lang.Integer` elsewhere. `@JvmInline value class` is the one-field wrapper.
- **Swift.** `struct Int { var _value: Builtin.Int64 }` in the standard library: a struct over a compiler's builtin type, with its operators written in the library over builtin operations, and protocols joined by extension. This is way E with a real bottom type, which Fortress lacks.
- **Julia.** `primitive type Int64 <: Signed 64 end`: a concrete, final leaf below abstract types (`Signed`, `Integer`, `Real`, `Number`). Only an abstract type can have subtypes. Arrays of such leaves are stored inline, and code is specialised for each concrete type.

All four make the built-in type itself one final, concrete type: way D's shape. Julia's abstract types above a final leaf are way C's and D's shape for `Number` and `AnyIntegral`. None has a second name for the same values. Scala and Kotlin show way H over it.

## The ways sorted

**Ruled out.**

- E, for the numbers: it does not end, since the payload's type needs a carrier too. It stays the library's way for `Ratio`, the I/O objects and the arrays.
- F: every value must implement `Any` and answer its RTTI, and a JDK class cannot.
- G: P-37 deletes the prelude, and row 18.
- B: it breaks walk or makes the two paths read two texts (P-37), and no text of the team shows it.

**Not carriers.** H and I are the layers of phase 6. They need a closed type and one canonical name. They are reasons among A to D, not alternatives to them.

**Standing: A, C, D.** Where the three grounds point:

- The team's later word. The prelude's code is A's shape. Its author's paper calls that shape a special case for the time being, and gives "an object is a final class" as the rule. The team's unboxing plan is C's and D's shape. So the later word splits: the later code says A, the later texts say C or D.
- The library as the team wrote it. C: it is the only way that changes none of its lines. Inside the library, `NN32`, `RR32`, `Boolean` and `Char` are D's shape, and the five split traits are C's.
- The peers. D.

They do not agree on one way. They agree on this much: the value's class belongs to a closed, final type. A is the only standing way that does not give that.

## Against the rehearsal's question and the plan review's section 7

I read the rehearsal's last section and section 7 of `explorations/reviews/plan-review-2026-11-10.md` only after the list above was written. Where the lists differ:

- **The rehearsal lists three ways.** Its (i) is my A, its (ii) my B, its (iii) my C in form 1, "the code generator lets a hand-written class be an object's class". It has no D, and none of E to I.
- **It calls (iii) new work without a precedent.** Walk has done it since 2007, and the specification's native components allow it. That changes its weight: C is the library's and walk's own design, not a third invention.
- **It gives the prelude's design as "one of the late positions on the compiled number tower".** The late position that the skill lists is the tower's flat shape (2009 and 2010), which P-43 took. The carrier's form is another matter, with its own history: an object first, a trait to nest, and a special case "for the time being" in 2012. So the rehearsal's sentence gives way A more weight than the sources do.
- **It does not ask whether the split of the five number traits still serves anything.** That is my way D and my third question.
- **It does not name the three forms of the class under C.** They matter for the plan review's section 7.
- **The plan review, 7.1: "One build serves one library", because the thirteen value classes extend the prelude's generated classes by name.** That holds for hand-written carriers that extend generated classes: ways A and B, and C in form 1. Under C in form 2 or 3, the hand-written part is a payload class that names no library, and the code generator writes the carrier. Then the one library's carriers can stand on `main` beside the prelude's thirteen, with no second set of re-parented classes and no stub files; the tables still follow the world. So the review's option A2 may cost less than its "2 or 3 rungs more for the second set", and its probe Y has a cheaper form to try first: one native object, `Int`, compiled over a payload class in a scratch tree. By reading; not built.
- **The plan review sizes the carriers as "a design first and then about three rungs".** I kept that figure for way C. For ways A and B it leaves out the library's and walk's rewriting.
- **Both hold that none keeps today's behaviour.** I agree for the compiled path, and add that C keeps walk's.

## Recommendation

Take way C now, in its form 2, and put way D to the curator as a second decision, after a probe. Way C compiles the library that the team wrote without changing a line of it, leaves walk alone, removes W13 and W14 by construction, answers W12 with the rule that walk already has (F-344), and closes row 866, because the checker reads the library's `comprises { Int }`. It gives the last phase what it needs for an unboxed `RR64` in a field, in an array and across a call: a type that the language itself closes. It can be undone at the cost of the code generator's table. What it gives up: the prelude's economy, where a hand-written class extends a trait's springboard and the code generator knows nothing; under C the code generator must learn that a native object has a payload and many values, about three rungs by reading, and the thirteen run-time classes change in any case. It also keeps two names for five number types, `ZZ32` and `Int`, with one rule on each path to hold them together. Way D removes that rule and about 50 dead bodies, and matches every peer, but it rewrites text of the team's whose reasons are gone and not whose authorship is; it should wait for one probe, the checker's count and walk's suites on a library with `ZZ32` and `RR64` merged, and for the curator's reading of P-26 on the split.

## The probe

One compiled program, under the prelude, on `/home/user/fortress` at `6468aa6ec7`, with a private copy of the caches. Machine: nproc 4, OpenJDK 25, `FORTRESS_THREADS=1`, load 0.2.

    object MyInt extends ZZ32
      getter asString(): String = "MyInt"
    end
    f(x: ZZ32): String = x.asString
    run(): () = do
      println(f(3))
      z: ZZ32 = MyInt
      println(f(z))
    end

    $ ../../bin/fortress compile OpenZ.fss      (exit 0, no message)
    $ ../../bin/fortress run OpenZ
    Exception in thread "main" java.lang.IncompatibleClassChangeError: class OpenZ$MyInt can not implement com.sun.fortress.compiler.runtimeValues.FZZ32, because it is not an interface

This is row 866, reproduced. It is W14's cause, reached by a program under the prelude.

## Report items

### Defects

None new. Row 866 reproduced (above). The rehearsal's W4, W12, W13 and W14 are its own findings; this review adds no row.

### Sentences of the specification made false

None. This review changes no text.

### Decisions

- I listed ways H and I as layers, not as carriers. The alternative was to rank them beside A to D. The evidence: a box class is needed wherever a value meets `Any` or a type parameter, in Scala and Kotlin too, and PLAN puts unboxed arithmetic in phase 6 (decision B).
- I ran the probe with a private copy of the caches (`-Dfortress.caches`), so that the shared caches stayed as they were while another probe ran. No decision of the curator covers it.
- I did not probe way D's merge. It needs a build of walk's Java, which this task may not make.

### Points to report: where the record or the rehearsal turned out wrong

1. **The rehearsal, W14, "no row".** Row 866 holds the same cause, a carried type's class named as a superinterface, for a program's object under the prelude. The rehearsal's sentence "In the prelude nothing extends a carried trait in Fortress source" is true of the prelude's own source and misses that a program can.
2. **The rehearsal, W2.** It presents the five objects as the one library's departure from the prelude's traits. The history runs the other way: the prelude's number types were objects first (`b2880c05c2`, 2009-03-03) and became traits to nest and to hold literals (`76c267f987`). And its question "whether the five objects stay objects, with the code generator taught to let a hand-written class be an object's class" names as new what walk has done since 2007 (`BuildNativeEnvironment.java:42-57`).
3. **The rehearsal, W12.** It says the prelude "never infers a static argument from a carried type's RTTI". The team met the same two names under walk in 2008 (`fca589bbb0`), and the revival's walk holds the rule that answers it (F-344). The rehearsal cites neither.
4. **F-18.** It says that the team's direction for unboxing "builds on this class per instantiation (the plan in `compiler/optimization/Unbox.java` ...)". `Unbox.java` says nothing of the loader or of instantiations. It plans the bits of a primitive, a singleton, a struct and a `comprises` clause. The loader's stub is a separate trace.
5. **The rehearsal's question** calls the prelude's carrier design "one of the late positions on the compiled number tower". The late position is the flat shape (the skill's `references/exploring.md`, "Weighing the sources"; P-43), not the carrier's form.
6. **The plan review, 7.1**, "One build serves one library": true of hand-written carriers that extend generated classes, not of carriers that the code generator writes over a payload class (way C, forms 2 and 3). By reading.
7. **PLAN's N5** holds the carriers as one rung of tables. The rehearsal already said that this is too small. This review adds that the size depends on the way: way C needs no library rung and no walk rung; ways A and B need both.

### For FACTS

1. The prelude's built-in number types were objects when first written (`b2880c05c2`, 2009-03-03, Flood), became traits on 2009-03-30 to nest and to hold the literal objects (`76c267f987`, Maessen), and stayed traits when the prelude was flattened (`6896886fbc`, 2009-08-31, Chase); the team's paper on the mapping calls their hand-written carriers special cases "for the time being" (`Papers/Implementation/TypeMapping.tex:91-92`). It means that the trait form of the prelude's carriers has no reason left in either library. Shown by `git log --full-history --reverse -S'object ZZ32' a874948ac -- ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss`. Detail: this report, "What the team's texts say, by provenance".
2. In the interpreter's library each of the five split number traits has exactly one object since the tower is flat and the numerals have their own types; the split was made for `IntLiteral` (`fca589bbb0`) and for nesting. About 50 bodies of `trait RR64` that go through `asFloat(self)` (`Library/FortressLibrary.fss:408-504`) can never run, since `Float`'s own are more specific for every value. It means that a merge (way D) deletes dead text, and that the compiled dispatch of an `RR64` operator has an arm that is never taken. Shown by reading; no test. Detail: this report, "Way D".
3. Under walk, a native component's object takes its values from a Java class of the object's name in the component's `package` (`interpreter/evaluator/BuildNativeEnvironment.java:42-57`). It means that "a hand-written class is the object's class" is walk's rule, not a new one. Detail: this report, "The interpreter's library: five shapes".

### Commands

- The first commit that holds a text, across the cut history: `git log --full-history --reverse --format='%h %ad %an %s' --date=short -S'TEXT' a874948ac -- PATH | head -1`. Without `head`, the conversion's snapshot roots print hundreds of unrelated commits.
- A compiled run that leaves the shared caches alone: `cp -a default_repository/caches tmp/X/caches`, then `export FORTRESS_CACHES=$PWD/tmp/X/caches JAVA_FLAGS="$JAVA_FLAGS -Dfortress.caches=$PWD/tmp/X/caches"` before `bin/fortress compile` and `bin/fortress run`.

### Questions for the curator

**1. Which run-time class carries each built-in type of the one library on the compiled path?** A decision not taken.

- The sources and their dates: the interpreter's library (2007 to 2008, Maessen, Ryu, Steele, Flood); the specification's value objects, api style and native components (the Working Draft of February 2011); Chase's unboxing plan (2009-03-11); the prelude and its run-time classes (2009 to 2012, Flood, Maessen, Chase, Steele, Naden, Tristan), which is the team's later code; Chase's paper on the mapping (2012), which calls those classes special cases for the time being. None is one of the type group's late positions that the skill lists: the late position on the compiled number tower is its flat shape, which P-43 took, not the form of its carriers. The later works checked: the POPL 2019 paper's extract and Steele's talks of 2015 and 2016 say nothing on carriers; the 2016 talk shows the built-in types as traits and names the cost of their `excludes` lists.
- The solutions: way A (the prelude's, whole: library and walk rewritten), way C (the object's class carries; the library and walk unchanged; the code generator learns the payload), way D (C, with each number trait merged into its one object).
- Which keeps the current behaviour: under walk, C. On the compiled path nothing does, since the prelude is deleted; A is nearest to the prelude's run time.

**2. Under P-26, is the prelude's trait form of a carried type a later decision of the team's, or code that serves only the implementation?** A decision not taken; it decides between A and the others. The evidence for each side is in "Is the prelude's carrier the team's later decision".

**3. If C: are the five number traits merged with their objects (way D)?** A decision not taken. It changes text that the team wrote, for reasons that are gone. The probe that it needs first: the checker's count, the distance and walk's suites on a library with the merge.
