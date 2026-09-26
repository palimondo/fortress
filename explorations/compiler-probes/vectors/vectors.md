<!-- What the compiled path's two hand-written array classes, FZZ32Vector and FStringVector, are, how a program reaches them, their history, tests and what works today, written 2026-09-25 between 23:28 and 23:56 UTC by a delegated worker for Pavol's question "FZZ32Vector and FStringVector: What are these?"; read-only on the tree, probes compiled and run in private caches outside the repository on JDK 25. Probe programs, captures (out-*.txt) and scripts are under probes/: world.sh compiles the compiled path's prelude into a private cache, probe.sh <Name> compiles and runs one program; the type-argument check (rttic-alias.patch, a probe-only copy of FZZ32Vector with an RTTIc added, placed first on the run class path) and the native-array probes (nat-src/, compiled to a class directory on the run class path) were run by hand, and their outputs are out-VecGeneric.txt (without the alias), out-Nat.txt and out-VecGeneric-rttic.txt (with the alias; the worker's run was not captured, so the coordinator re-ran it from the same compiled program on 2026-09-26 at about 00:02 UTC and it printed [0 0]); strhist.sh is the history helper of section 5. -->

# FZZ32Vector and FStringVector

These are two small hand-written Java classes. Each holds the elements of one of the only two array-like types the compiled path has: a vector of 32-bit integers and a vector of strings. They are the run-time objects behind the Fortress types `ZZ32Vector` and `StringVector`, and those types exist only in the compiled path's own standard library. Christine Flood wrote both classes in August and September 2011. Guy Steele extended the integer one in October 2011.

## How to read this

- Every claim carries a tag:
  - [measured]: I ran it today (2026-09-25) on this tree, JDK 25, in a private cache outside the repository.
  - [read]: read from the code at HEAD `8528c4d5e`.
  - [git]: read from git objects.
  - [cited]: someone else measured it earlier and recorded it in the file named.
- Path prefixes:
  - `runtimeValues/` stands for `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/`.
  - `nativeHelpers/`, `compiler/`, `runtimeSystem/`, `repository/` and `tests/` sit beside it under `ProjectFortress/src/com/sun/fortress/`.
  - `LibraryBuiltin/` is `ProjectFortress/LibraryBuiltin/`.
- Terms used throughout:
  - The *compiled path* is `fortress compile` followed by `fortress run`. It turns Fortress source into JVM bytecode, which a second JVM then runs. The other path, `walk`, interprets the syntax tree and has a separate library.
  - The compiled path's *prelude* is the set of library components every program sees without an import: `AnyType`, `CompilerBuiltin` (in `LibraryBuiltin/`) and `CompilerLibrary` (in `Library/`). The walkthrough's glossary cites `compiler/WellKnownNames.java:113-137` for this. An *api* is a Fortress interface file (`.fsi`). A *component* is its implementation (`.fss`).
  - A Fortress *trait* is roughly a Kotlin interface with default method bodies. An *object* is a class. `ZZ32` is the 32-bit signed integer type and `RR64` the 64-bit float. White brackets `[\T\]` hold static (type) arguments. `lo # n` is the range of `n` integers starting at `lo`. `1:3` is the range 1 to 3, both ends included. Juxtaposition `i i` means multiplication.
  - Every compiled Fortress value is a JVM object. A `ZZ32` is an `FZZ32` object wrapping one `int` (`runtimeValues/FZZ32.java:14-24`). Such a wrapper is called *boxed*.
  - *RTTI* (run-time type information) is a per-type *descriptor* object that generated code uses for type tests and dispatch. By the loader's convention, the descriptor of a class `X` sits in a static field `ONLY` of a nested class `X$RTTIc` (`runtimeSystem/Naming.java:145`, `:1016`, `:1043-1051`).
  - For each trait, the compiler generates an abstract class to hold the trait's method bodies. That class is called `DefaultTraitMethods`, and a class implementing the trait extends it.
  - *Stamping*: a generic declaration is compiled once, as a template. The custom class loader (`runtimeSystem/InstantiatingClassloader.java`) makes each instance, for example `Cell⟦FZZ32Vector⟧`, by rewriting the template's bytes the first time that name is asked for. It renames. It does not change field representation (`explorations/coordinator/map/compile-path-walkthrough.md` §6).
  - A *native binding* on the compiled path is a line such as `import java com.sun.fortress.nativeHelpers.{simpleIntVector.getIndexedValue => jIntVectorGet, …}` in a Fortress file. It makes a static Java method callable as a Fortress function.
  - The *gate* is `ant testFast` plus `ant testSystem` with zero failures. A test is *gated* if the gate runs it.

## 1. The two classes

### FZZ32Vector (`runtimeValues/FZZ32Vector.java`, 83 lines)

- Declaration: `public final class FZZ32Vector extends fortress.CompilerBuiltin.ZZ32Vector.DefaultTraitMethods implements fortress.CompilerBuiltin.ZZ32Vector` (`:16-17`). Both supertypes are generated from the Fortress trait `ZZ32Vector` (section 3). [read]
- Fields (`:18-19`). None of them is final. [read]
  - `private int[] val` holds the elements, unboxed, in one flat Java array.
  - Four package-private ints give the shape: `lower_x`, `dim_x`, `lower_y` and `dim_y`.
- One class serves two ranks. The comment reads: "It's kind of a kludge, but one of these babies can pretend to be either 1-D or 2-D. The 2-D variety can also be indexed using 1-D indexing." (`:14-15`). `dim_y == 0` means one-dimensional. [read]
- Construction. [read]
  - The constructor is private (`:21-23`).
  - `make(l1, d1, l2, d2)` allocates `new int[d2 == 0 ? d1 : d1 * d2]` (`:25-27`).
  - `make(int[] v)` wraps a caller's array without copying it, as a 1-D vector starting at 0 (`:72-74`). Nothing in the tree calls it (grep).
- Element access (`:64-68`). [read]
  - In 1-D, `val[i - lower_x]`.
  - In 2-D, `val[(i - lower_x) * dim_y + (j - lower_y)]`, which is row-major.
  - A put is the same address with a store.
- Bounds. The class checks nothing itself. The only check is the JVM's own array bounds check.
  - A 2-D column index past the end of its row lands in the next row. [measured: in a 2×3 vector filled with `10 i + j`, `m[0,4]` returns `11`, the element at row 1, column 1. `m[4]` also returns `11`.]
  - An index past the whole array throws a Java `ArrayIndexOutOfBoundsException`, not a Fortress exception, and the program ends. [measured: `v[3]` on a 3-element vector gives "Index 3 out of bounds for length 3" and exit 1.] FACTS.md:38 records the same fact about the bounds check. [cited]
- Size queries (`:58-60`). `dim()` is `val.length`, the total element count. `rows()` is `dim_x`. `cols()` is `dim_y`, so it is 0 in 1-D. [read. Measured values are in section 2.]
- Rendering. [read]
  - `toString()` (`:29-56`) prints `[0 1 4]` in 1-D. In 2-D it prints a header `(2,3)`, then the rows. It iterates from 0, not from the lower bounds (section 7).
  - `asString()` returns an `FJavaString` of that text (`:62`).
- `getValue()` returns the raw `int[]` (`:70`). [read]
- RTTI. `getRTTI()` returns `RTTIv.ONLY` (`:76-77`). The nested class is named `RTTIv`, and it extends the generated `fortress.CompilerBuiltin.ZZ32Vector.RTTIc` (`:79-82`). Section 3 shows why the name `RTTIv`, rather than `RTTIc`, matters. [read]

### FStringVector (`runtimeValues/FStringVector.java`, 52 lines)

- It follows the same pattern, but holds strings and is 1-D only. [read]
  - Declaration: `extends fortress.CompilerBuiltin.StringVector.DefaultTraitMethods implements fortress.CompilerBuiltin.StringVector` (`:14-15`).
  - One field, `private String[] val` (`:16`). The elements are plain `java.lang.String`, not Fortress string objects.
- Construction. [read]
  - A public constructor wraps a caller's array without copying it (`:18`).
  - `make(int s)` allocates `new String[s]` (`:20-22`).
  - `make(String[])` also wraps (`:41-43`). Nothing in the tree calls it.
- Access. `getIndexedValue(i)` is `val[i]` and `putIndexedValue(i, x)` is `val[i] = x` (`:36-37`). There is no lower bound and no check beyond the JVM's. [read]
- `dim()` is `val.length` (`:32`). [read]
- An unset element is Java `null`. It reads back and prints as `null`, with no error. [measured: in `makeStringVector(2)`, reading `s[1]` and printing it gives `null`.]
- `toString()` puts a space after every element, including the last: `[a bc null ]` (`:24-30`). [measured]
- `asSring()` (`:34`) is misspelled. Nothing calls it (grep), and it overrides nothing, so rendering goes through the Fortress default (section 2). The typo came from the class it was copied from (section 5). [read]
- RTTI works as in the integer vector: a nested `RTTIv` extends the generated `StringVector.RTTIc` (`:45-51`). [read]

### What they inherit, at build time and at run time

- At build time, javac compiles these classes against hand-written stand-ins: the bootstrap stubs in `ProjectFortress/src/fortress/CompilerBuiltin.java`. There, `ZZ32Vector` and `StringVector` are empty interfaces extending `fortress.CompilerBuiltin.Object`. Each has an empty abstract `DefaultTraitMethods extends FValue` and an `RTTIc` (`:178-196`). [read]
- At run time, the real `fortress.CompilerBuiltin$ZZ32Vector$DefaultTraitMethods` comes from the compiled prelude jar `fortress.CompilerBuiltin.jar` in the bytecode cache. It holds the Fortress trait's method bodies and extends `fortress.CompilerBuiltin$Object$DefaultTraitMethods`. [measured: `javap` of the class compiled into a private cache.]
  - So `FZZ32Vector` has no Fortress methods of its own. `v[i]`, `fill`, `nrows` and the rest are all inherited from that generated class. [measured: every stack trace below passes through it.]
- `FValue` (`runtimeValues/FValue.java:14-27`) is the root class. It has `getRTTI()`, an `asString()` that returns a Fortress `String`, and a `toString()` defined as `asString().toString()`. [read]
- `FZZ32Vector.asString()` returns `FJavaString`, which is a subtype of the Fortress `String`. javac therefore adds a bridge method, and the Java method overrides the trait's getter. [measured: the stack trace of `println(v)` passes through `FZZ32Vector.asString(FZZ32Vector.java:16)`, the bridge on the class line, and then through `:62`.]
  - The trait's own body, `jIntVectorAsString(self)` (`LibraryBuiltin/CompilerBuiltin.fss:1116`), produces the same text by another route.

## 2. The Fortress types they represent

- Neither type is in the specification. A search of `Specification/` and `Specification-1.0-frozen/` finds no `ZZ32Vector` and no `StringVector`. [measured by grep]
- Neither type exists under `walk`. Both are declared only in the compiled prelude. [read; grep]
- The interpreter's `System` api types its `args` as `ImmutableArray[\String,ZZ32\]` instead (`Library/System.fsi:26`). [read]

### ZZ32Vector

- The type is declared in the api `LibraryBuiltin/CompilerBuiltin.fsi:563-580` and implemented in `LibraryBuiltin/CompilerBuiltin.fss:1115-1148`. It has no static parameters, so it names no element type and no size. [read]
- `excludes { String, Number, Boolean, Character }` means no value can be both a `ZZ32Vector` and one of those types (`.fsi:563`). [read]
- Members (`.fsi:564-579`). [read]
  - Getters: `shape` (the pair `(nrows, ncols)`), `nrows`, `ncols` and `copy`.
  - `getValue(i)`, `getValue(i, j)`, `putValue(i, v)` and `putValue(i, j, v)`.
  - The subscript operators `v[i]` and `v[i, j]`, and their assignment forms `v[i] := x` and `v[i, j] := x`.
  - `|v|`, the size, which is the total element count.
  - `fill(x)`, and `fill(f)` with `f: ZZ32 -> ZZ32` applied to each index. `fill2(f)` applies `f` to each `(i, j)`. Each of the three returns the vector itself.
- Every member body is one call to a native helper, or a loop over such calls (`.fss:1116-1147`). The native bindings are at `.fss:305-311`. [read]
- Factories. [read]
  - `__makeZZ32Vector(l1, d1, l2, d2)` is in the builtin api (`.fsi:589`, `.fss:1150`).
  - `CompilerLibrary` has four easier ones (`Library/CompilerLibrary.fsi:243-246`, `.fss:587-595`): `makeZZ32Vector(n)`, `makeZZ32Vector(n, m)`, and two that take a `Range` and set the lower bounds from it.
- Library operators (`Library/CompilerLibrary.fsi:186-190`, `.fss:484-519`). [read]
  - They are `PREFIX_SUM v`, `v + k`, `v - k`, `v MIN k` and `v MAX k`. The scalar is on the right only.
  - Each one builds `x.copy` and loops over it.
  - `SUFFIX_SUM` is commented out (`.fss:491-496`).

Measured on a 5-element vector (probe `VecBasics`), a program can do the following:

- `makeZZ32Vector(5)` prints `[0 0 0 0 0]`. `|v|` is 5, `nrows` is 5 and `ncols` is 0.
- `v.fill(7)` gives `[7 7 7 7 7]`. `v.fill(fn (i) => i i)` gives `[0 1 4 9 16]`.
- After `v[2] := 42`, `v[2]` is 42.
- After `w = v.copy; w[0] := 99`, only `w` has changed.
- The operators give these results:
  - `v + 1` gives `[1 2 43 10 17]`.
  - `v - 1` gives `[-1 0 41 8 15]`.
  - `v MAX 5` gives `[5 5 42 9 16]`.
  - `v MIN 5` gives `[0 1 5 5 5]`.
  - `PREFIX_SUM v` gives `[0 1 43 52 68]`.
- `makeZZ32Vector(2, 3)` followed by `fill2(fn (i, j) => 10 i + j)` prints `(2,3)`, then the rows `0 1 2` and `10 11 12`.
  - `|m|` is 6, `nrows` is 2, `ncols` is 3 and `m[1,2]` is 12.
  - `m.shape` is `(2, 3)`.
- Writing `v.fill(7)` as a statement is a static error: "Non-last expression in a block has type ZZ32Vector, but it must have () type". The result must be bound, as in `v1 = v.fill(7)`.
- `3 - v`, with the scalar on the left, is a static error. [cited: `explorations/compile-ladder/rung-library-comments/probes/skeptic/SkVecScalarC.txt:15-32`]

### StringVector

- The type is declared at `LibraryBuiltin/CompilerBuiltin.fsi:582-587` and implemented at `.fss:1154-1159`. Its bindings are at `.fss:312-315`. It has no static parameters and no `excludes` clause. [read]
- Members: `getValue(i)`, `putValue(i, s)`, `s[i]` and `|s|`. [read]
  - There is no `s[i] := x`. Writing one is a static error: "No such method StringVector._[_]:=." [measured]
  - `putValue` first converts its argument to a Java string with `v.asJavaString` (`.fss:1156`).
- The factory is `makeStringVector(n)` (`.fsi:590`, `.fss:1152`). [read]
- Rendering goes through the prelude's default for any object. [measured by the gated test `DefaultRenderRungS`, and by my probe, which printed `[a bc null ]`.]
  - `StringVector` declares no `asString`, and its Java method is misspelled. So `asString` is the prelude's default, `jDefaultAsString(self)` (`LibraryBuiltin/CompilerBuiltin.fss:355`).
  - That native prints a value's own Java `toString` when its class has one (`nativeHelpers/stringOps.java:74-86`). Here that gives `[a b ]`.
- The type's one real use is `CompilerSystem.args : StringVector`, the command-line arguments (`Library/CompilerSystem.fsi:15`, `.fss:18`).
  - A program writes `import CompilerSystem.args` and can then use `|args|` and `args[i]`. [measured: run with the arguments `one "two words"`, `|args|` is 2, `args[1]` is `two words`, and `args` prints `[one two words ]`.]
  - The value comes from `systemOps.getArgs()`. That function wraps, without copying, the argument array that `MainWrapper` stored in a static field (`nativeHelpers/systemOps.java:24-26`, `runtimeSystem/MainWrapper.java:21, 67`). [read]

## 3. From source text to the Java class

This section follows `v[2] := 42; x = v[2]`, where `v: ZZ32Vector`.

1. Names. The program sees `ZZ32Vector` and `makeZZ32Vector` through the prelude, without an import. [read]
2. Desugaring. Before type checking, `v[2]` becomes a call of a method on `v` named `_[_]`, and `v[2] := 42` becomes a call of one named `_[_]:=` (`compiler/desugarer/AssignmentAndSubscriptDesugarer.scala:75-80`). Guy Steele wrote this in October 2011 (section 5). [read]
   - The code generator's own subscript case, `CodeGen.forSubscriptExpr` (`compiler/codegen/CodeGen.java:4924-4982`), still has vector-specific code (`:4970-4981`, "Unknow Vector type").
   - Its first statement is `if (x == x) throw new Error("Should not be a subscriptExpr here in codegen!")` (`:4932`), so all of that code is dead.
3. The name mapping. `NamingCzar` (`compiler/NamingCzar.java`, about 2K lines) is the compiler's table of translations between Fortress names and JVM names.
   - Its *special table* maps a few builtin traits straight to hand-written classes, not to generated interfaces. The vector entries are `bl(fortLib, "ZZ32Vector", "FZZ32Vector")` and `bl(fortLib, "StringVector", "FStringVector")` (`:553-554`, in the table at `:538-555`). [read]
   - As a result, every slot whose Fortress type is `ZZ32Vector` (a local, field, parameter or result) has the JVM type `com/sun/fortress/compiler/runtimeValues/FZZ32Vector`. The lookups are at `:1443-1444` and `:1544`. [read]
   - The generated library methods confirm this: they are `getValue(FZZ32Vector, FZZ32)`, `\=_\{_\}(FZZ32Vector, FZZ32)` and so on, with `self` typed as the Java class. [measured, javap]
4. The call. The receiver's type is in the special table, so `CodeGen.methodCall` emits `invokevirtual` on `FZZ32Vector` rather than `invokeinterface` on the interface (`CodeGen.java:604-610`). The table's own comment says this is its only use (`NamingCzar.java:558-566`). [read]
   - The program's bytecode has `invokevirtual FZZ32Vector."\=_\{_\}"(FZZ32)FZZ32` for `v[2]`, and `…"\=_\{_\}\!="(FZZ32, FZZ32)FVoid` for the assignment. These JVM names are mangled spellings of `_[_]` and `_[_]:=`. [measured, javap]
5. The trait bodies. `CompilerBuiltin.fss` is compiled like any other Fortress component. [measured: listing and javap of `fortress.CompilerBuiltin.jar`]
   - The trait `ZZ32Vector` becomes an interface, `fortress.CompilerBuiltin$ZZ32Vector`.
   - Its bodies go into an abstract class, `…$DefaultTraitMethods`. Each body is a static method that takes `self`, plus an instance method that forwards to it.
   - Descriptor classes `…$RTTIc` and `…$RTTIi` are also generated.
   - `FZZ32Vector` extends the abstract class at run time.
6. The native bindings. The line `import java com.sun.fortress.nativeHelpers.{simpleIntVector.getIndexedValue => jIntVectorGet, …}` (`CompilerBuiltin.fss:305-311`) names seven static methods of `nativeHelpers/simpleIntVector.java` (40 lines). [read]
   - Each of them forwards to the class in one line. For example, `getIndexedValue(FZZ32Vector v, int i)` returns `v.getIndexedValue(i)` (`:17-39`).
   - `simpleStringVector.java` (27 lines) does the same for strings (`:18-25`).

   Two parts of the compiler turn such a line into something callable:
   - `repository/ForeignJava.java` reads the Java class with ASM and makes up a Fortress api for it. [read]
     - For each Java parameter type it asks `NamingCzar.fortressTypeForForeignJavaType` for a Fortress type.
     - A class that extends the Fortress top type `fortress.AnyType.Any` goes through a chain of `else if`s. There, `FZZ32Vector` becomes the trait `ZZ32Vector` and `FStringVector` becomes `StringVector` (`NamingCzar.java:329-349`, with the vectors at `:337-340` and the `Any` test at `:304-319`).
     - So from Fortress, the helper `getIndexedValue(FZZ32Vector, int): int` looks like `(ZZ32Vector, ZZ32) -> ZZ32`.
   - `compiler/nativeInterface/FortressMethodAdapter.java` writes a wrapper class, `native.com.sun.fortress.nativeHelpers.simpleIntVector`, into the cache directory `nativewrapper_cache`. The wrapper's methods take and return the compiled path's boxed values. [read]
     - For each parameter it looks up a converter. `FZZ32` has one: unbox with `getValue()` and box with `make` (`:139`).
     - A class that extends `Any` gets the empty converter and passes through as itself (`:250-270`, the pass-through at `:253-256`).
     - The wrapper's `getIndexedValue(FZZ32Vector, FZZ32)` calls `FZZ32.getValue()`, then the helper, then `FZZ32.make(int)`. [measured, javap of the wrappers]
     - The `StringVector` wrapper works the same way. It uses `FJavaString.make(String)` for results and `FJavaString.getValue()` for arguments. [measured, javap of the wrappers]
7. One element read, as it runs. The stack trace of an out-of-range read shows seven frames between the program's `run` and the array access. [measured]
   - The frames are, from the outside in:
     - the `_[_]` instance method and its static body (`CompilerBuiltin.fss:1125`);
     - the `getValue` pair (`:1121`);
     - the generated native wrapper;
     - `simpleIntVector.getIndexedValue` (`:20`);
     - `FZZ32Vector.getIndexedValue` (`:64`).
   - The index arrives as a boxed `FZZ32`, and the result leaves as a new `FZZ32`.
   - `array-design.md` counted the same chain as four calls and one allocation per element read. [cited: `explorations/coordinator/array-design.md:41`, probe 2 at `:195`]
   - I did not measure whether the JIT removes any of this.
8. The class loader. At run time the custom loader, `runtimeSystem/InstantiatingClassloader.java`, loads nearly every class itself. For a name with no generic markers, such as `com.sun.fortress.compiler.runtimeValues.FZZ32Vector`, it reads the bytes and defines them unchanged (`:199-210`, `:286-289`). No stamping happens for the vectors themselves, because they are not generic. [read]
9. Stamping does touch the vectors when one is used as a type argument.
   - Take `object Cell[\T\](x: T) end` and `Cell[\ZZ32Vector\](makeZZ32Vector(2))`. The program compiles, then dies at run time with `NoClassDefFoundError: com/sun/fortress/compiler/runtimeValues/FZZ32Vector$RTTIc`. The error is raised in the static initializer of the stamped function class for `Cell`'s constructor. [measured]
   - `Cell[\StringVector\]` fails the same way, with `FStringVector$RTTIc`. [measured]
   - The cause, from the code: the stamped code asks for the descriptor by appending `$RTTIc` to the class name (`runtimeSystem/MethodInstantiater.java:134-138`, `Naming.java:1043-1051`), but the vectors' nested class is named `RTTIv`. [read]
   - I ran a probe-only check. I compiled a copy of `FZZ32Vector.java` with one extra nested class, `RTTIc`, whose `ONLY` field returns `RTTIv.ONLY`, into a scratch directory (`probes/rttic-alias.patch`), and put that directory first on the run class path. The same compiled program then ran and printed `[0 0]`. [measured; nothing in the tree was changed]
   - So for this program, the missing class name is the whole failure.
   - FACTS.md:38 and `explorations/perf-probes/nat/size-cost.md:77` recorded the `ZZ32Vector` case earlier, without a cause. [cited] No row of `explorations/fortress-gap-ledger.md` names it. [measured by grep]
10. Raw Java arrays in a native helper's signature. `NamingCzar` also maps the Java type `int[]` (descriptor `[I`) to `ZZ32Vector`, and it has a clause for `"[String"` (`:381-384`). [read] Neither works:
    - Take a helper `static int sum(int[] a)` bound by `import java`. The program type-checks and compiles, and `jSum(makeZZ32Vector(3))` is accepted. But the generated wrapper class is empty, and the run fails with `NoSuchMethodError: … native.vecprobe.IntArr.sum(FZZ32Vector)`. [measured]
      - The wrapper generator silently skips every method whose descriptor has an array parameter (`FortressMethodAdapter.java:220-222`).
      - The test is `SignatureParser.unsayable` (`compiler/nativeInterface/SignatureParser.java:45-55`), commented "We can't represent bytes, shorts or arrays yet".
    - A helper that takes `String[]` fails at compile time with "Reference to API [Ljava.lang cannot be resolved". [measured] The real descriptor is `[Ljava/lang/String;`, which the `"[String"` clause never matches. [read]
    - Two stale entries point at a class named `FVector`, which no longer exists: the converter table has an entry for it (`FortressMethodAdapter.java:156`), and the run-time name table maps `$Vector` to it (`runtimeSystem/Naming.java:303`). `FVector` was renamed `FZZ32Vector` in September 2011 (section 5). [read]
11. The bytecode optimizer is an optional later pass that the test harness runs as an extra step (`tests/unit_tests/FileTests.java:1006-1015`). [read; not run]
    - It treats any method named `make` on a special-table class as boxing, and any method named `getValue` as unboxing (`compiler/asmbytecodeoptimizer/MethodInsn.java:71-85`).
    - That includes `FZZ32Vector`. There, `getValue()` returns the whole `int[]`, while the inherited `getValue(i)` returns one element.

## 4. What has the same shape, what does not, and why

What has the same shape [read]:

- Seventeen classes in `runtimeValues/` extend a generated `DefaultTraitMethods`: `FBoolean`, `FCharacter`, `FFloatLiteral`, `FIntLiteral`, `FJavaBufferedReader`, `FJavaBufferedWriter`, `FJavaString`, `FNN32`, `FNN64`, `FRR32`, `FRR64`, `FString`, `FStringVector`, `FZZ`, `FZZ32`, `FZZ32Vector` and `FZZ64` (grep). Each one is the hand-written run-time class of one builtin trait.
- Fourteen of those traits, plus void, are in `NamingCzar`'s special table (`:538-555`), so their Fortress type is lowered straight to the class. `IntLiteral`, `FloatLiteral` and `String` are not in the table.
- Each class has a nested descriptor class with a static `ONLY` field.

How the vectors differ [read]:

- Contents.
  - The scalars wrap one final value. For example, `FZZ32` wraps a `final int` (`FZZ32.java:16`).
  - The two vectors are the only classes that hold a Java array, and the only ones whose contents change after construction.
  - `FJavaBufferedReader` and `FJavaBufferedWriter` wrap a Java stream object.
- Native wrappers.
  - The scalars have converters in `FortressMethodAdapter.java:139-155`, so the wrapper unboxes them to `int`, `double` and so on.
  - The vectors have no converter. A helper receives the vector object itself (step 6 of section 3).
- Descriptor names.
  - Thirteen classes name their nested descriptor `RTTIc`, which is the name the loader asks for.
  - The vectors use `RTTIv`. The buffered reader and writer use `RTTIjbr` and `RTTIjbw` (`FJavaBufferedReader.java:33`). I did not run the reader or writer as type arguments.
- Foreign mapping.
  - The scalars map from Java primitive types through a table (`NamingCzar.java:436-459`).
  - The vectors map from their own classes through the `else if` chain (`:337-340`).

What does not exist on the compiled path:

- There is no vector of `RR64`, `ZZ64` or any other element type, and no generic array. `Array`, `Vector`, `Matrix` and `array[\T\]` are undefined there. [cited: ledger rows 72 and 305, `explorations/fortress-gap-ledger.md:303`, `:317`]
- The interpreter's library works differently. [read]
  - Its arrays are generic Fortress types that carry sizes, such as `Array1[\T, nat b0, nat s0\]` (`Library/FortressLibrary.fss:2099`) and `__DefaultVector[\T, nat s0\]` (`:2210`).
  - They sit over one generic native store, `PrimitiveArray[\T, nat s0\]`. Its `get` and `put` are interpreter natives (`LibraryBuiltin/NativeArray.fss:18-26`).
- The interpreter's library has the same prefix sum on `Array[\ZZ32,ZZ32\]`. It sits under the comment "Some random stuff related to arrays and the MCKPE benchmark" (`Library/FortressLibrary.fss:4489-4503`; Steele, `fc1937ae0`). The compiled block in `CompilerLibrary.fss:484-519` has the same shape for `ZZ32Vector`, and it came eight days after the interpreter's version. [read; git]

Why, as far as the tree and the commit messages say [git]:

- Flood's first commit message is "Simple Integer 1 dimensional arrays." (`f4973a717`).
- `StringVector` was made for the program arguments.
  - Before `24717d4ad`, `CompilerSystem.args` was an object with native hooks. Its comment read: "Right now this is a massive hack, to make the native wrapper use array-like *notation* without actually supporting native-side arrays per se. This should be remedied as soon as is practical."
  - That commit replaced it with `args : StringVector`. Its message says: "Updated CompilerSystem.args to use them".
- The 2-D support and the lower bounds came from two applications.
  - Statistics examples taken from R. The message of `cdda863b8` says: "Made them start at 1 instead of zero for compatibility with R examples. Start of SimpleKCoefficient test."
  - A knapsack benchmark. The message of `d535963cb` says: "supports knapsack code".
  - Neither program is in the tree now. Flood removed the R-derived `ProcFreqFinal_tests` directory in `7caf58ad9` (2011-11-10). No knapsack program exists (grep).
- No commit message and no comment says why the type is monomorphic, why there is no `RR64` vector, or why the team wrote a Java class instead of a generic Fortress object.
  - The revival's own finding is that stamping renames and cannot give one instantiation a `double[]` field (walkthrough §6; `explorations/coordinator/array-design.md:69`).
  - That is an analysis made in 2026, not a reason the team gave.

## 5. History

How the history was read [method]:

- `git log --all --full-history -- <path>` lists every commit that touches a path. It also lists each of the 146 parentless snapshot roots left by the Mercurial-to-git conversion. A root has no parent, so it has no diff.
- I kept the commits that have a parent and diffed each against it, with rename detection. That is how `FVector.java` → `FZZ32Vector.java` shows up.
- Some changes are hidden behind a cut link. To find those, I scanned the file's content at every listed commit in date order and noted where a line first appears. The helper script is `probes/strhist.sh`.
- Authors are named the way `research/authorship.md` resolves them. `chmf` is Christine H. Flood.

The commits:

- `f4973a717`, 2011-08-16, Christine Flood: "Simple Integer 1 dimensional arrays."
  - It is a root snapshot, so its diff cannot be shown.
  - It is the first commit containing `FVector.java`, a 1-D `int[]` wrapper that already has the misspelled `asSring` and the nested `RTTIv`.
  - It is also the first to contain `trait Vector` and `makeVector` in `CompilerBuiltin`, the `[I` → vector mapping in `NamingCzar`, the `FVector` converter in `FortressMethodAdapter`, and the `$Vector` entry in the run-time `Naming`.
  - No earlier commit contains `FVector.java`. I checked across all refs back to 2011-07-01.
  - `49cf82e71` (David Chase, 2011-08-17, "Merged; made Makefile more robust") is the first commit with a surviving parent that adds the file. Its message says it is a merge, but only one parent survives.
- `24717d4ad`, 2011-09-07, Flood: "Added ZZ32Vector and StringVector. Updated CompilerSystem.args to use them. Removed obsolete stubs." 46 files.
  - Renames `FVector` to `FZZ32Vector` (72% similar), and adds `FStringVector` as a copy, typo included.
  - Adds `simpleStringVector`, the two traits, both entries in `NamingCzar`'s special table and foreign chain, the `"[String"` clause, and the vector code in `CodeGen.forSubscriptExpr`.
  - Sets `args : StringVector = makeStringVector(0)`. `systemHelper.registerArgs` then overwrote that value by reflection on a final static field ("probably bad juju", `nativeHelpers/systemHelper.java:20-21`).
  - Deletes 31 old stub files.
- `85c4b8a47`, 2011-09-07, Flood: "Remove an errant print statement. Added two dimensional ZZ32 arrays."
  - Adds `dim_x`, `dim_y` and 2-D access. The index was computed as `i*dim_x + j`, but the row stride should be `dim_y`.
  - Adds `VectorTest3.fss`.
- `cdda863b8`, 2011-09-21, Flood: "Changed ZZ32 vectors to have nrows/ncols methods. Made them start at 1 instead of zero for compatibility with R examples. Start of SimpleKCoefficient test."
  - The 1-based indexing was done in the helper, as `i-1`, with the comment "We need indices to start at 1 for our ProcFreqFinalTests, so do the updates here for now."
- `fc1937ae0` and `05b0ceaa8`, 2011-10-04, Guy Steele: "Completely redid assignment and subscripting desugaring; they now occur after disambiguation but before type checking."
  - Adds `AssignmentAndSubscriptDesugarer.scala`.
  - Fixes `asSring` to `asString`, but only in `FZZ32Vector`.
  - `fc1937ae0` also adds the interpreter's `PREFIX_SUM` and `SUFFIX_SUM` on `Array[\ZZ32,ZZ32\]`, under the MCKPE comment.
- `d535963cb`, 2011-10-12, Steele: "Updates to ZZ32Vector and compiler libraries; supports knapsack code; may have a lurking Heisenbug in the typechecker wrt println, but it passed the tests, so ..." 18 files.
  - Replaces the 1-based hack with general lower bounds, `lower_x` and `lower_y`, and a single 4-argument `make`.
  - Fixes the 2-D stride, rewrites `toString`, and adds the "kludge" comment.
  - On the Fortress side it adds `excludes`, `shape`, `nrows` and `ncols` as getters, `copy`, `fill`, `fill2`, the `:=` subscript operators, `asString` and `__makeZZ32Vector`.
  - Also adds the four `makeZZ32Vector` factories, two of them over ranges, and the block of `PREFIX_SUM`, `+`, `-`, `MIN` and `MAX`.
  - Updates `XXX3u.test`, `XXX6at.test` and `XXX6bi.test`, whose expected overload lists now include `(ZZ32Vector, ZZ32)->ZZ32Vector`.
- `2eb54ef20`, 2011-11-17, author field Guy Steele, message "Committing Guy's changes so I can pull them". It is a root snapshot.
  - It is the first commit in which both vectors' `asString`/`asSring` return `FJavaString` instead of `FString`.
  - It is also the first in which `CodeGen.forSubscriptExpr` begins with the `if (x == x) throw` guard.
  - The commit that actually made these changes sits behind a cut link.
  - `FJavaString.java` arrived the same day: `3404a756d` (Steele, "missing file") and `8d670cd19` (David Chase, "Added file, gosh darn it").
- `8414723ac`, 2012-06-08, David Chase: "Got testpairs working … Also updated RTTI definition for most of the primitive types."
  - Makes each `RTTIv` extend the generated trait descriptor, `ZZ32Vector.RTTIc` or `StringVector.RTTIc`, instead of the bare `RTTI`. The same commit makes that change for nine other value classes.
  - It is the last change to either Java file. The date-ordered scan shows no later change.
- `6b5517af6`, 2012-06-14, Chase: "Rearranged arg passing to simplify life for bytecode optimizer."
  - Adds `systemOps.getArgs`, `MainWrapper.cachedArgs` and `args : StringVector = jGetArgs()`.
  - Comments out the reflective path.
- `6bec1b004`, 2026 (the revival's rung S): adds the gated test `compiler_tests/DefaultRenderRungS` with its `StringVector` assertion.

## 6. Tests

How the harness picks tests [read]:

- In `compiler_tests/` and `other_compiler_tests/`, only a `.test` property file creates a test. A bare `.fss` file is never compiled or run (`tests/unit_tests/FileTests.java:934-990`).
- A `.test` file whose name starts with `XXX` expects a failure (`:932`).
- The last landed gate summary is `explorations/compile-ladder/climb-batch-3.5/gate/summary.txt`: CompilerJUTest 678 tests, OtherCompilerJUTest 263, 0 failures.

Gated tests that run one of the classes [read. Results are from the last suite output on this container, `ProjectFortress/TEST-RESULTS/fast-compiler/TEST-com.sun.fortress.tests.unit_tests.CompilerJUTest.txt`, dated 2026-09-24.]:

- `compiler_tests/Compiled2.test` runs `println("Hello, " || args[0] || "!")` with the argument `Grunt, snort.` and expects `Hello, Grunt, snort.!`. It exercises `FStringVector` through `CompilerSystem.args`. Passed (line 717).
- `compiler_tests/Compiled4.test` runs `println(strToInt(args[0])!)` with the argument `5` and expects `120`. Passed (line 710).
- `compiler_tests/Compiled7.test` reads `|args|` and falls back to defaults when it is 0. It runs with no arguments. Passed (line 598).
- `compiler_tests/DefaultRenderRungS.test` calls `makeStringVector(2)` and `putValue` twice, then asserts that `v.asString` is `[a b ]` (`DefaultRenderRungS.fss:38-41`). Passed (line 656).

Gated tests that only name the type:

- `compiler_tests/XXX3u.test`, `XXX6at.test` and `XXX6bi.test` expect a compile failure. Each program adds two strings, or a string and a literal.
  - The expected error text lists every `+` overload, including `(ZZ32Vector, ZZ32)->ZZ32Vector` (`XXX3u.test:22`, `XXX6at.test:24`, `XXX6bi.test:22`).
  - So they pin that operator's presence in the checker's candidate list. They never create a vector.
  - All three reported "Saw expected failure" (lines 164, 30 and 241).

No gated test creates, indexes or prints a `ZZ32Vector` at run time. [read]

Ungated:

- `other_compiler_tests/VectorTest2.fss` calls `makeZZ32Vector(10)`, `putValue(0,10)` and `getValue(0)`, then `println(z[0])`. It has no `.test` file. I ran it in a private cache, and it prints `10`. [measured]
- `other_compiler_tests/VectorTest3.fss` calls `makeZZ32Vector(5,7)` and `putValue(3,5,69)`, then `println(z[3,5])`. It has no `.test` file. It prints `69`. [measured]
- `other_compiler_tests/VectorTest.fss` uses the names `Vector` and `makeVector`, from before September 2011. They no longer exist. [read]
- Revival probes that touch the types:
  - `explorations/compile-ladder/rung-library-comments/probes/skeptic/SkVecScalarC.fss` and `SkVecScalarRevC.fss` (operators with the scalar on the left);
  - `explorations/perf-probes/nat/size-cost/VecCtorControl.fss` (a vector passed through a generic constructor);
  - probe 2 of `explorations/coordinator/array-design.md` (element traffic).

## 7. What works and what does not, today

What works [measured; everything ran in a private cache on JDK 25]:

- Integer vectors:
  - creating 1-D and 2-D vectors;
  - `fill`, `fill` with a function, and `fill2`;
  - reading and writing elements in both ranks;
  - `|v|`, `nrows`, `ncols` and `shape`;
  - `copy` of a 1-D vector;
  - `v + k`, `v - k`, `v MIN k`, `v MAX k` and `PREFIX_SUM v`;
  - printing, and string concatenation.
- String vectors: creating one, `putValue`, `getValue`, `s[i]`, `|s|` and printing.
- `CompilerSystem.args` with zero or more arguments, including an argument that contains a space.

What does not work [measured unless marked]:

- An out-of-range index throws a Java `ArrayIndexOutOfBoundsException`, not a Fortress exception.
  - The prelude does define a Fortress `IndexOutOfBounds` (`Library/CompilerLibrary.fsi:92`), but the vectors never throw it. [read]
  - I did not test whether a Fortress `try` can catch the Java exception.
- In 2-D, a column index past the end of its row reads an element of another row, with no error. `m[0,4]` is `m[1,1]`.
- `copy` of a 2-D vector returns a 1-D vector of `nrows` elements. From a 2×3 vector it returns size 2 with `ncols` 0. The source says as much: "Handles only 1D case" (`LibraryBuiltin/CompilerBuiltin.fss:1120`).
  - `+`, `-`, `MIN`, `MAX` and `PREFIX_SUM` all start from `copy`, so on a 2-D vector they give the same truncated 1-D result. [read, not run]
- Vectors built from a range, whose lower bound is not 0, only partly work.
  - `makeZZ32Vector(1:3)` supports `v[1]` and `v[3]`.
  - But `println(v)` fails in `toString` with "Index -1 out of bounds for length 3".
  - `v.fill(0)` fails the same way, in `putIndexedValue`.
  - The cause: `toString`, `fill`, `fill2`, `copy` and the operators all iterate from 0, while element access subtracts the lower bound. [read: `FZZ32Vector.java:34`, `:46-47`; `CompilerBuiltin.fss:1131`, `:1137`, `:1143`; `CompilerLibrary.fss:486`, `:499`]
- `3 - v`, with the scalar on the left, is a static error. [cited, SkVecScalarC.txt]
- `s[i] := x` on a `StringVector` is a static error. `putValue` is the way to write.
- A vector cannot be a generic's type argument. The run fails at load with `NoClassDefFoundError: …FZZ32Vector$RTTIc` or `…FStringVector$RTTIc` (section 3, step 9).
- A native helper cannot take `int[]` or `String[]` in its signature (section 3, step 10).
- `fill` and `fill2` cannot be written as statements. That is a static error unless the result is bound.

Read from the code, not run:

- There is no `for x <- v`, because neither trait is a generator. Neither declares `generate`, and neither extends a generator trait (`CompilerBuiltin.fsi:563-587`).
- There is no equality on vectors, no vector-vector arithmetic, and no `SUFFIX_SUM` (it is commented out, `CompilerLibrary.fss:491-496`).
- `makeZZ32Vector(n)` with a negative `n` reaches `new int[n]` unchecked (`FZZ32Vector.java:26`). `d1 * d2` is not checked for overflow.

## 8. Relation to unboxed numeric arrays on the compiled path

These are facts about the code. This section proposes no design.

- `FZZ32Vector` is the only numeric store on the compiled path. Its storage is unboxed: one `int[]` (`FZZ32Vector.java:18`). [read]
- Its traffic is boxed. [measured]
  - Each read receives an `FZZ32` index and returns a new `FZZ32`.
  - Each write receives two boxed values and returns the void value.
  - Seven frames lie between the program and the array. One of them is a generated wrapper that unboxes and reboxes (section 3, step 7).
- Arithmetic on the elements is done on `FZZ32` objects. The code generator emits no primitive arithmetic for Fortress numbers (walkthrough §5). [cited]
- The only check per access is the JVM's array bounds check (FACTS.md:38). [cited, and measured above]
- The type carries no element type and no size. It is one monomorphic class. [read]
  - A new element type means a new trait, a new Java class and new table entries.
  - `explorations/coordinator/array-design.md:67` counts these as "the team's own five wiring sites". [cited]
- A vector cannot be a type argument today, because of its descriptor class name (section 3, step 9). [measured]
  - So it cannot sit inside a generic Fortress object as a field of type `T`.
  - `perf-probes/nat/size-cost/SizedSum.fss:11-15` works around this by building its own vector inside the object. [cited]
- Natives cannot take a raw `int[]` or `double[]` today, because the wrapper generator skips array descriptors (section 3, step 10). [measured]
  - A helper can take the vector object and reach its array through `getValue()`. Every existing helper works this way (`simpleIntVector.java`). [read]
- There is no `double` counterpart. `RR64` is boxed as `FRR64`, which wraps one `double` (`runtimeValues/FRR64.java`). The wrapper table converts it to a `double` at a native boundary (`FortressMethodAdapter.java:144`). [read]
- On 2026-09-19 Pavol decided that the `RR64` store is an unboxed `double[]` (`explorations/coordinator/POSITIONS.md:41`).
  - `array-design.md` names `FZZ32Vector` as the precedent for such a store (`:67-69`, `:83`, `:163`).
  - It also records an unprobed step there: a hand-written non-generic class sitting under a generic trait (`:83`).
  - One of today's runs adds a related measured fact. The hand-written vector's descriptor class name is what stops it from being used as a type argument.
