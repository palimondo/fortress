<!-- The text of the teaching page "Arrays in Fortress", written on 2026-11-17 by delegated Opus workers of the coordinating session for Pavol, the curator, at his questions on arrays after climb batch 33 was planned. Part 1, the language and the interpreter: how an array is written and typed, which part is syntax and which library, how the nat sizes ride in the type, where the elements live; every program ran under walk in a scratch worktree seeded from the base build at c3b16ef2d1 and removed after. Part 2, the compiled path, added at his word that his questions were mainly how arrays will run compiled: which classes the code generator writes for the library's arrays, how the class loader makes an instance's class, what a[i] and a[i] := v compile to layer by layer in real bytecode, where the boxes are made and where the JIT removes them, each way on file to an unboxed store and to unboxed arithmetic in terms of those classes, the walls between main and a compiled array program, and the transaction checks; its compiled code came from a second scratch worktree seeded from the same base build, with probe Y's selector and the rehearsal's marked hacks, nothing of it on main, removed after. No timing was taken. -->

*Fortress revival · a teaching page · 17 November 2026*

# Arrays in Fortress

You asked how arrays work, and mainly how they'll run on the compiled path. Part 1 teaches the language and the interpreter, from small programs run under walk. Part 2 follows two of those programs into JVM bytecode, compiled against the one library, and from that bytecode to the design: where the boxes are, what each way to unbox would change, and what stands before a compiled array program runs on `main`. Each program on the page ran today, and its output is shown as it printed.

## 1. The short answers

**The language and the interpreter**

- **Half language, half library.** The literal `[1 2 3]` and the shorthand `ZZ32[3]` are the language’s. The types behind them, `Array1`, `Vector` and `Matrix`, are the library’s.
- **The sizes ride in the type on both paths.** Walk checks them as a line runs. The compiled checker checks them before the compile.
- **Every element today is boxed**, a number wrapped in a heap object. The bare-double store that “nothing chooses” is the team’s immutable `RR64` array: no factory returns it.

**The compiled path**

- **The compiler makes the library’s arrays as it makes any library code.** Each generic trait and object becomes one template class. The class loader makes the class of each instance, such as `__DefaultVector⟦FRR64,1000⟧`, the first time a program uses it, with the sizes in its name. Where a body reads a size, the loader writes in the number.
- **`a[i] := v` is 11 calls deep.** The subscript operator, a bounds check against the size, the vector, the primitive array, the store’s trait, a generated wrapper, a Java helper, and the Java store, which asks whether a transaction is open. A read adds a cast.
- **Each element is an `FRR64` box in an `Object[]`.** Once a loop is hot, the JIT can remove a temporary box, where it inlines the whole chain down to it. It can’t remove an element’s box, or the box assigned to a mutable variable each iteration.
- **Five ways on file give a number array an unboxed store, and three say where the arithmetic runs on bare doubles.** Only the class loader’s way, the team’s direction, changes no library line, and nothing of it exists: the team left an empty stub in the loader and an unused plan.
- **The first array program to run** is the smallest of the switch-over rehearsal, a trial in a throwaway tree. The switch-over moves the compiled path, the compile to JVM bytecode, onto the one library, the interpreter’s library. The program makes an array of 8 `ZZ32` with the library’s factory, writes `i i` into each element, and prints `a[5] = 25`. After the second run of climb batch 33, the next launch, it compiles against the one library on `main`. It runs in the batch after, once that library compiles whole to bytecode. In this page’s scratch tree, with hacks, it ran, and so did the dot program (section 6).
- **You need to do nothing now.** An array is library code: Fortress traits and objects over a store, the object that holds the elements. The open array decisions are about speed and the model’s own types, not about running.
- **The rehearsal’s loop was about 100 times slower than Java.** Boxing explains 6 to 7 of that. The rest has no measured share.
- **Boxed numbers now change no array decision.** A bare-double store alone buys nothing while each read still makes a box.

**References**

1. The program, its compile and its run: [CLIMB-BATCH-33.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/CLIMB-BATCH-33.md), section 2, “R. A method found by its interface”, “The measures” and “For the batch after, in this order”, item 4. The compiled path: sections 6 to 12, from a scratch tree with hacks. The rest: the sections below.

## Part 1. The language and the interpreter

## 2. An array, written and typed

Start from the specification’s example, with a few lines added. `typecase` takes the first arm whose type matches the value as it runs, like Swift’s `switch` with `case is T`.

```
A: ZZ32[3,3] = [1 2 3; 4 5 6; 7 8 9]
println("A[1,0] = " A[1,0])
println("|A| = " |A|)
v: RR64[3] = [1.0 2.0 3.0]
println("v DOT v = " (v DOT v))
typecase v of
  Vector[\RR64,3\] => println("v is a Vector[\\RR64,3\\]")
  else => println("v is no vector")
end
s: String[2] = ["ab" "cd"]
typecase s of
  AnyVector => println("s is a vector")
  Array1[\String,0,2\] => println("s is an Array1[\\String,0,2\\], no vector")
  else => println("s is something else")
end
```

*Under walk, it printed:*

```
A[1,0] = 4
|A| = 9
v DOT v = 14.0
v is a Vector[\RR64,3\]
s is an Array1[\String,0,2\], no vector
```

- Spaces separate the elements of a row. A semicolon or a new line separates rows, and two semicolons separate the planes of a 3-dimensional array.
- `ZZ32[3,3]` is the specification’s shorthand for `Array2[\ZZ32, 0, 3, 0, 3\]`: for each dimension, a lowest index, 0, and a size, 3. That’s the notation on the number type that you saw.
- `A[1,0]` is row 1, column 0, counted from 0.
- One literal syntax gave a matrix, a `Vector` and a plain `Array1`. The specification lets the context decide. The library’s factory decides, by testing the element type against the eight number types.
- The overview’s `RR^3`, a vector of 3, isn’t built. Walk reads it as a type of its own. Today `v: RR64^3 = [1.0 2.0 3.0]` bound, and the `println(v)` after it stopped: “Couldn’t figure out Matrix [\RR64\]^(3) <: Object”.

**References**

1. The literal, its type and the shorthand: [aggregate.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/expressions/aggregate.tex#L117-L137), lines 117 to 137; the example, [Expr.Array.a.fss](https://github.com/palimondo/fortress/blob/main/SpecData/examples/basic/Expr.Array.a.fss).
2. The context decides, and `T^n`: [overview.tex](https://github.com/palimondo/fortress/blob/main/Specification/preliminaries/overview.tex#L735-L773), lines 735 to 773 and 934 to 938; [Overview.Expression.aggregate.a.fss](https://github.com/palimondo/fortress/blob/main/SpecData/examples/preliminaries/Overview.Expression.aggregate.a.fss), [Overview.Moving.fss](https://github.com/palimondo/fortress/blob/main/SpecData/examples/preliminaries/Overview.Moving.fss).
3. The factory’s test: [FortressLibrary.fss](https://github.com/palimondo/fortress/blob/main/Library/FortressLibrary.fss#L2842-L2856), lines 2842 to 2856; FACTS F-229.
4. `T^n` under walk: gap ledger row 24. The stopped `println` is today’s run, a shape that the row doesn’t name.
5. The run: `Literal.fss`, by `bin/fortress` in a worktree seeded from the base build at `c3b16ef2d1`, whose library equals `main`’s at `9f2ff9b04e`.

## 3. The syntax is the language’s, the types are the library’s

You took the array types for library types, and the literals for built-in syntax. Both are right. The language, its parser and walk, give:

- the literal, `[1 2 3; 4 5 6]`, and the shorthand `T[n, m]`;
- the subscript forms `a[i]`, `a[i, j]` and `a[i] := v`;
- static parameters, `[\T, nat n\]`, where `nat` marks a size that the type carries.

The library gives:

- `Array[\E, I\]`, with no size in its type. `I` is the index type: `ZZ32`, or a pair for rank 2.
- `Array1[\T, nat b0, nat s0\]`, `Array2` and `Array3`, with a lowest index and a size for each dimension.
- `Vector` and `Matrix`, for numbers only, with their arithmetic.
- the factories `array1[\T, n\]()`, `vector`, `matrix`, and `array[\T\](n)` for a size known only when the program runs.
- the subscript itself: `a[i]` calls the operator `opr[i:I]:E = get(offset(i))`, as Swift’s `a[i]` calls the type’s `subscript`.

They meet at two names that walk knows: `Array` plus the rank, and `__builtinFactory` plus the rank. For `[1 2 3]` at a declared type, walk calls `__builtinFactory1[\ZZ32, 0, 3\]()` and copies the elements in. A literal with no declared type isn’t built today.

`Array1` isn’t in a component that you import, as `List` is. It’s in `FortressLibrary`, which every program sees.

In your frames: Swift’s `[Double]` is shorthand for the standard library’s `Array<Double>`. `RR64[3]` is shorthand for the library’s `Array1[\RR64,0,3\]`, with the size in the type. Scala’s compiler makes `Array[Double]` a JVM `double[]`. Fortress has no such special case yet.

**References**

1. The types and factories: [FortressLibrary.fsi](https://github.com/palimondo/fortress/blob/main/Library/FortressLibrary.fsi#L1612-L1637), lines 1612 to 1637, 1704 to 1816, 1851, 1893 and 1960; the subscript: [FortressLibrary.fss](https://github.com/palimondo/fortress/blob/main/Library/FortressLibrary.fss#L2384), line 2384.
2. The two names: [WellKnownNames.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java#L30-L35), lines 30 to 35; [LHSEvaluator.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/LHSEvaluator.java#L119-L151), lines 119 to 151; the library’s word “enshrined”, [FortressLibrary.fsi](https://github.com/palimondo/fortress/blob/main/Library/FortressLibrary.fsi#L1787-L1793), lines 1787 to 1793.
3. A literal with no declared type: gap ledger row 49. `FortressLibrary` as the prelude: POSITIONS P-37.

## 4. How the sizes ride in the type

The library’s rank-1 array keeps no length field. It reads the size from its type:

```
trait ReadableArray1[\T, nat b0, nat s0\] ...
    opr |self| : ZZ32 = s0
    offset(i: ZZ32): ZZ32 = do
        r = i - b0
        if NOT (0 <= r < s0) then oops(1, b0, s0, i) end
        r
    end
```

A product names a shared size once, so the shapes must match. An n-by-m matrix times a vector of m gives a vector of n:

```
opr juxtaposition[\T extends { Number, MultiplicativeRing[\T\] }, nat n, nat m\]
    (me: Matrix[\T,n,m\], v: Vector[\T,m\]): Vector[\T,n\]
```

A program that uses the sizes, with a 2-by-2 matrix to show that order matters:

```
len[\nat n\](x: Vector[\RR64,n\]): ZZ32 = n

run(): () = do
  u: RR64[3] = [1.0 2.0 3.0]
  w: RR64[4] = [1.0 2.0 3.0 4.0]
  println("len(u) = " len(u) ", len(w) = " len(w))
  q: RR64[2,2] = [1.0 2.0; 3.0 4.0]
  x: RR64[2] = [1.0 1.0]
  println("q x = " (q x) ", x q = " (x q))
  m: RR64[2,3] = [1.0 0.0 2.0; 0.0 1.0 1.0]
  println("m u = " (m u))
  println("u + u = " (u + u))
  println("u + w = " (u + w))
end
```

*Under walk, it printed (the error shortened):*

```
len(u) = 3, len(w) = 4
q x = [0#2][ 3.0 7.0 ], x q = [0#2][ 4.0 6.0 ]
m u = [0#2][ 7.0 5.0 ]
u + u = [0#3][ 2.0 4.0 6.0 ]
Shapes.fss:16:23:
Failed to find any matching overload, args = (__DefaultVector[\RR64,3\],__DefaultVector[\RR64,4\]), ...
```

`[0#2]` means lowest index 0, 2 elements. `len` found `n` from its argument. No `+` takes a vector of 3 and a vector of 4.

- **Walk** keeps the sizes in each object’s type: `__DefaultVector[\RR64,3\]` is the library’s vector object at size 3. As it makes the object, walk binds each `nat` parameter to its number, so a body reads `s0` as a value. It finds a mismatch only when the line runs.
- **The compiled checker** refuses a mismatch before the compile. Two sizes are equal when written alike once numerals are computed: `2 3` equals `6`, but `m n` doesn’t equal `n m`.
- **The compiled run time** carries the sizes too: in the name of each instance’s class, as one descriptor object per size, and as a constant where a body reads one. Section 6 shows each in bytecode.

A size known only when the program runs comes through `reflect`:

```
make(n: ZZ32): Array[\RR64,ZZ32\] = array[\RR64\](n).fill(0.5)

x = make(2 + 1)
println("x = " x)
typecase x of
  Vector[\RR64,3\] => println("x is a Vector[\\RR64,3\\] when it runs")
  else => println("x has no size when it runs")
end
```

```
x = [0#3][ 0.5 0.5 0.5 ]
x is a Vector[\RR64,3\] when it runs
```

The declared type holds no size. Inside the factory, `reflect(n)` makes a value `N[\3\]` that carries the number, and a function that takes `N[\n\]` binds `n` to 3 for that call. The checker reads such a size as fixed for that one call. Compiled, such a call fails the JVM’s verification today, so it runs only under walk. microGPT’s flat program makes its arrays this way.

**References**

1. The size from the type: [FortressLibrary.fss](https://github.com/palimondo/fortress/blob/main/Library/FortressLibrary.fss#L2601-L2631), lines 2601 to 2631; the product: [FortressLibrary.fsi](https://github.com/palimondo/fortress/blob/main/Library/FortressLibrary.fsi#L1929-L1933), lines 1929 to 1933.
2. Walk: [EvalType.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java#L251-L262), lines 251 to 262; FACTS F-20.
3. The checker: FACTS F-67, gated by `compiler_tests/XXXNatMismatchChecker`, which refuses `dot(Mat[\2,3\](6), Mat[\4,5\](7))`; F-146; POSITIONS P-55 and P-40.
4. The run time: section 6.
5. A run-time size: [FortressLibrary.fss](https://github.com/palimondo/fortress/blob/main/Library/FortressLibrary.fss#L2490-L2499), lines 2490 to 2499; [NatReflect.fsi](https://github.com/palimondo/fortress/blob/main/ProjectFortress/LibraryBuiltin/NatReflect.fsi); FACTS F-270; gap ledger row 307; the model’s factories, [FlatArrays.fsi](https://github.com/palimondo/fortress/blob/main/explorations/run-c4/src/FlatArrays.fsi#L9-L12), lines 9 to 12.
6. The runs: `Shapes.fss` and `RunSize.fss`, as in section 2.

## 5. Where the elements live today

A `Vector[\RR64,3\]` from `array1` is three objects deep. The vector, `__DefaultVector`, holds a `PrimitiveArray`. That holds a store, a `JavaArrayStore`. The store holds the elements in Java. A 2-by-3 matrix holds one store of `s0 s1` cells, 6, row by row: a size can be a product.

- **Under walk**, the store is walk’s own `AtomicArray` of walk’s boxed values.
- **Compiled against the one library**, it’s the Java class `FortressArrayStore`, an `Object[]` of boxes such as `FRR64`. Inside `atomic`, each read and write of an element goes through the transaction. Section 7 follows one read and one write down to it.
- **Compiled against the prelude**, the compiler’s own small library, which `main` still uses by default, there’s no array type at all: “Array1 is undefined”.

**The store over a bare double array** is in `PrimImmutableRR64Array`, the team’s immutable `RR64` array in the one library’s `NativeArray`. Walk holds its elements in a `double[]`, and so does its compiled class, `FortressRR64ArrayStore`. It has `get` and `init`, no `put`. “Nothing chooses it” means this:

```
im = immutableArray1[\RR64,3\]()
typecase im of
  PrimImmutableRR64Array[\3\] => println("immutableArray1 chose the double[] store")
  PrimImmutableArray[\RR64,3\] => println("immutableArray1 chose the general store")
  else => println("immutableArray1 chose something else")
end
r = PrimImmutableRR64Array[\3\]()
r.init0(0, 1.5)
r.init0(1, 2.5)
r.init0(2, 0.25)
println("the double[] store, named by hand: r[0] + r[1] + r[2] = " (r[0] + r[1] + r[2]))
```

```
immutableArray1 chose the general store
the double[] store, named by hand: r[0] + r[1] + r[2] = 4.25
```

The store works, and the factory doesn’t pick it. How a factory picks each element type’s store is your first open question.

**The prelude’s native arrays are something else.** The prelude has `ZZ32Vector`, over a Java `int[]`, and `StringVector`, over a `String[]`. The team wrote both by hand in August 2011. They have no type parameters, no size in the type and no `RR64` version. A `for` loop can’t run over one, and neither can be a type argument. Each read returns a new boxed `ZZ32`: the storage is unboxed, the traffic boxed. They go with the prelude, which is deleted at the switch-over.

**References**

1. The objects: [FortressLibrary.fss](https://github.com/palimondo/fortress/blob/main/Library/FortressLibrary.fss#L2807-L2813), lines 2807 to 2813, 2527 to 2542 and 3202 to 3208; [NativeArray.fss](https://github.com/palimondo/fortress/blob/main/ProjectFortress/LibraryBuiltin/NativeArray.fss), lines 15 to 46.
2. The stores: FACTS F-333; POSITIONS P-169; [FortressArrayStore.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FortressArrayStore.java); [FortressRR64ArrayStore.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FortressRR64ArrayStore.java). The team’s: `NativeArray.fss` at `a874948ac`, line 43.
3. No array type on `main`: gap ledger row 305; [probe-y.md](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-31/probes/probe-y.md), section 1.
4. The prelude’s vectors: [CompilerBuiltin.fsi](https://github.com/palimondo/fortress/blob/main/ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#L529-L556), lines 529 to 556; [vectors.md](https://github.com/palimondo/fortress/blob/main/explorations/compiler-probes/vectors/vectors.md), sections 7 and 8; FACTS F-129, row 408; their deletion: POSITIONS P-37.

## Part 2. The compiled path

## 6. What the compiler makes of an array program

Every compile, run and listing in this part came from a scratch tree with hacks: a throwaway worktree, seeded from the base build at `c3b16ef2d1`, with probe Y’s selector and the rehearsal’s marked hacks put in, and removed after. Nothing of it is on `main`. On `main` today, no program compiles and runs against the one library (section 11).

The two programs are the rehearsal’s. `Arr` is the smallest:

```
component Arr
export Executable
run(): () = do
  a = array1[\ZZ32, 8\]()
  for i <- seq(0#8) do a[i] := i i end
  println("a[5] = " || a[5].asString)
end
end
```

`Dot` is the dot program of section 9: two `Array1[\RR64,0,1000\]`, filled in one loop, then `s += a[i] b[i]` in another.

*Compiled in the scratch tree, and run with the JVM’s verifier off, they printed:*

```
a[5] = 25
dot = 499500.0
```

In the listings, names are shortened: the box classes’ package, the escape marks in names, and the offsets are left out. `_[_]` and `_[_]:=` are the two subscript operators. A method ending in `♙` is a second entry point beside the first, which just calls it.

**The library’s classes.** The code generator writes one jar for each component. For each trait it writes a JVM interface, and a class of the trait’s bodies, the springboard, `T$DefaultTraitMethods`. A body there is a static method that takes the object first, and an object’s class gets small forwarders to it. For each object it writes a class. For a trait, object or function with static parameters, it writes a template instead: a class file with empty brackets in its file name, and beside it a `.xlation` file that lists the static parameters. `ReadableArray1⟦⟧`’s list says that `T` is a type and that `b0` and `s0` are sizes. `FortressLibrary`’s jar holds 1.6K classes and 0.9K lists. The array family, cut:

```
FortressLibrary$ReadableArray1⟦⟧        trait: interface template
FortressLibrary$ReadableArray1⟦⟧$DefaultTraitMethods
FortressLibrary$Array1⟦⟧, $Vector⟦⟧     and their springboards
FortressLibrary$__DefaultVector⟦⟧       object: class template
FortressLibrary⚙$array1⟦⟧…              generic function: template
FortressLibrary$JavaArrayStore          no static parameters: plain
NativeArray$PrimitiveArray⟦⟧            in NativeArray’s jar
```

**An instance’s class, made at first use.** No file is named `__DefaultVector⟦FRR64,1000⟧`. The first time `Dot` runs a line that names it, the JVM asks the Fortress class loader for it, and the loader:

1. sees the brackets in the name, and cuts off the stem;
2. reads the template and its list;
3. copies the template’s bytes with ASM, a Java library for class files, putting `FRR64` for `T` and `1000` for `s0` in every name, descriptor and constant;
4. defines the result as a class. It never writes it to disk.

C# makes a class per value type in this way; Java erases. A flag of the run saved the made classes for this page: 269 for `Dot`, 153 for `Arr`. `Dot` made `Array1⟦X,0,1000⟧` for all eight number types: `array1`’s `typecase` tests the element type against one arm after another, `RR64` last, and each test loads its arm’s classes. `Arr`, at `ZZ32`, the first arm, made only `Array1⟦FZZ32,0,8⟧`.

**The sizes, three ways.**

- **In the name.** `1000` is part of the class’s name, as Swift mangles a type into a symbol. Two sizes give two classes.
- **As a descriptor**, the object that stands for a static argument when a type is tested as the program runs. A size’s descriptor is one shared object per number. The template reads a placeholder; the instance builds the real one once, when its class starts:

```
// template PrimitiveArray⟦T,s0⟧, static {}
getstatic     PrimitiveArray⟦T,s0⟧$RTTIc.ONLY
// instance PrimitiveArray⟦FRR64,1000⟧, static {}
getstatic     FRR64$RTTIc.ONLY
ldc           "1000"
invokestatic  RTTIsize.of(String)RTTI
invokestatic  PrimitiveArray$RTTIc.factory(RTTI,RTTI)RTTI
```

- **As a value.** `PrimitiveArray` reads `s0` to make its store, `mem: JavaArrayStore = makeJavaArrayStore(s0)`. The template calls a placeholder, and the loader writes the number in, as a boxed `ZZ32`:

```
// template, the constructor
invokestatic  CONST.Nat⟦s0⟧()FZZ32
invokestatic  FortressLibrary.makeJavaArrayStore(FZZ32)FJavaArrayStore
// instance ⟦FRR64,1000⟧, the constructor
ldc           1000
invokestatic  FZZ32.make(I)FZZ32
invokestatic  FortressLibrary.makeJavaArrayStore(FZZ32)FJavaArrayStore
```

That’s your picture: sizes stamped into a class. Nothing uses the constant as an `int` yet. Each read of `s0` makes a new box, as the bounds check in section 7 shows.

**References**

1. The two programs: [switch-rehearsal.md](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-31/probes/switch-rehearsal.md), section 4; `Arr.fss` as in [plan-33/probes/programs](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-33/probes/programs/Arr.fss).
2. The classes a trait gets: [carriers-ways-2026-11-13.md](https://github.com/palimondo/fortress/blob/main/explorations/reviews/carriers-ways-2026-11-13.md), “The words”, springboard. The jar’s classes: `unzip -l` and `javap -c -p` in the scratch tree.
3. The loader: [InstantiatingClassloader.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/runtimeSystem/InstantiatingClassloader.java#L257-L404), lines 257 to 404, and the flag `fortress.bytecodes.expanded.directory` at lines 83 to 99; FACTS F-18; POSITIONS P-41.
4. The sizes: FACTS F-129; [RTTIsize.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/RTTIsize.java); [MethodInstantiater.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/runtimeSystem/MethodInstantiater.java#L225-L237), lines 225 to 237, and lines 154 to 161 for the descriptor; [CodeGen.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java#L6923-L6935), lines 6923 to 6935; no optimization reads a size: FACTS F-20 and F-40.
5. The scratch tree: section 11, “This page’s scratch tree”.

## 7. `a[i]` and `a[i] := v`, layer by layer

`Dot`’s loops compile to two closures: small classes whose `apply` method the range calls once for each index. The first loop’s body:

```
// Dot$fn@6.apply(FZZ32 i):   a[i] := asFloat(i);  b[i] := 1.0
invokestatic    FortressLibrary.asFloat(FZZ32)FRR64
invokeinterface Array1⟦FRR64,0,1000⟧._[_]:=(FRR64,FZZ32)FVoid
ldc2_w          1.0
invokestatic    FRR64.make(D)FRR64
invokeinterface Array1⟦FRR64,0,1000⟧._[_]:=(FRR64,FZZ32)FVoid
```

The program sees only the interface `Array1⟦FRR64,0,1000⟧`. Behind it is a `__DefaultVector⟦FRR64,1000⟧`, which `array1` chose. One write goes down eight layers:

1. **The vector’s forwarder.** `__DefaultVector` inherits `_[_]:=` from `Vector`’s springboard, which passes the call to the body that the trait `Array` declares:

   ```
   // Vector⟦FRR64,1000⟧$DefaultTraitMethods._[_]:=(FRR64 v, FZZ32 i)
   checkcast       Array⟦FRR64,FZZ32⟧
   invokestatic    Array⟦FRR64,FZZ32⟧$DefaultTraitMethods._[_]:=(…)FVoid
   ```

2. **The subscript operator**, `opr[i:I]:=(v:E):() = put(offset(i),v)`:

   ```
   invokeinterface Array⟦FRR64,FZZ32⟧.offset(FZZ32)FZZ32
   invokeinterface Array⟦FRR64,FZZ32⟧.put(FZZ32,FRR64)FVoid
   ```

3. **The bounds check**, `offset`: `r = i - b0`, then `0 <= r < s0`, with `b0` and `s0` written in. Five calls and four new boxes for each element:

   ```
   // ReadableArray1⟦FRR64,0,1000⟧$DefaultTraitMethods.offset
   ldc 0       ; invokestatic FZZ32.make(I)FZZ32      // b0
   invokestatic  FortressLibrary.-(FZZ32,FZZ32)FZZ32
   iconst_0    ; invokestatic FZZ32.make(I)FZZ32
   ldc 1000    ; invokestatic FZZ32.make(I)FZZ32      // s0
   invokestatic  FortressLibrary.<=(FZZ32,FZZ32)FBoolean
   invokestatic  FortressLibrary.<(FZZ32,FZZ32)FBoolean
   invokestatic  FortressLibrary.AND(FBoolean,FBoolean)FBoolean
   invokestatic  FortressLibrary.prefix NOT(FBoolean)FBoolean
   ```

4. **The vector object and the primitive array**, each `put(i, v) = mem.put(i, v)` over the object below it:

   ```
   // __DefaultVector⟦FRR64,1000⟧.put♙
   getfield        mem : PrimitiveArray⟦FRR64,1000⟧
   invokevirtual   PrimitiveArray⟦FRR64,1000⟧.put(FZZ32,FRR64)FVoid
   // PrimitiveArray⟦FRR64,1000⟧.put♙
   getfield        mem : FJavaArrayStore
   checkcast       AnyType$Any
   invokevirtual   FJavaArrayStore.put(FZZ32,Any)FVoid
   ```

   `FJavaArrayStore` is the rehearsal’s carrier: a hand-written class that holds the Java store in a field, so that a Fortress value can stand for it. `main` has none (section 11).

5. **The store’s trait.** `JavaArrayStore`’s `put` is bound with `builtinPrimitive` to a Java helper, so its springboard calls the generated wrapper:

   ```
   // JavaArrayStore$DefaultTraitMethods.put, static
   invokestatic    native.…nativeHelpers.arrayOps.put(FJavaArrayStore,FZZ32,Any)FVoid
   ```

6. **The wrapper**, a class that the compile writes into the caches, takes the boxes apart and calls the helper with Java values:

   ```
   // native.com.sun.fortress.nativeHelpers.arrayOps.put
   invokevirtual   FJavaArrayStore.getValue()FortressArrayStore
   invokevirtual   FZZ32.getValue()I
   invokestatic    nativeHelpers.arrayOps.put(FortressArrayStore,I,Object)V
   ```

7. **The helper**, `arrayOps.put`, one line of Java: `s.put(i, v)`.

8. **The Java store**, `FortressArrayStore.put`, checks the index, asks for a transaction, and writes:

   ```
   invokevirtual   checkIndex(I)V
   invokestatic    transaction()Transaction    // this task’s, or null
   ifnonnull       inside
   invokevirtual   VarHandle.setVolatile([Object;I,Object)V
   inside:
   invokevirtual   Transaction.TXWriteSlot([Object;I,Any)V
   ```

So one `a[i] := v` is 11 calls deep from the loop body, the bounds check’s own calls aside, and the index is checked twice, by Fortress and by Java.

**A read, `a[i]`,** takes the same road. Layer 2 is `opr[i:I]:E = get(offset(i))`. At the bottom, `get` makes a volatile read, or `TXReadSlot` inside `atomic`, and refuses an element that holds nothing. On the way up, the primitive array casts the element to `RR64` with the library’s `cast`, whose instance at `FRR64` the loader made, and the loop body casts it once more:

```
// PrimitiveArray⟦FRR64,1000⟧.get♙
getstatic       FortressLibrary⚙$cast⟦FRR64⟧.✉      // the function cast[\RR64\]
getfield        mem : FJavaArrayStore
invokevirtual   FJavaArrayStore.get(FZZ32)Any
invokeinterface Arrow⟦Any,FRR64⟧.apply(Any)FRR64    // instanceof FRR64, else throw
```

**What the transaction does at an element.** Inside `atomic`, a read goes to `TXReadSlot` and a write to `TXWriteSlot`, keyed by the array and the index. The transaction keeps its writes in a table, and records each read with the value it saw. At commit it takes one global lock, checks each value it read, and writes its table back; if a check fails, the block runs again. The `double[]` store takes no part (section 12).

**References**

1. The layers: `javap -c -p` of `Dot.jar`, of the classes that the run saved, of `FortressLibrary`’s and `NativeArray`’s jars, and of the wrapper in `nativewrapper_cache`, in the scratch tree.
2. The source of each layer: [FortressLibrary.fss](https://github.com/palimondo/fortress/blob/main/Library/FortressLibrary.fss#L2455-L2457), lines 2455 to 2457, `Array`’s `opr[]:=`; line 2384, `ReadableArray`’s `opr[]`; lines 2623 to 2628, `offset`; lines 2807 to 2813, `__DefaultVector`; lines 2527 to 2531, `JavaArrayStore`; [NativeArray.fss](https://github.com/palimondo/fortress/blob/main/ProjectFortress/LibraryBuiltin/NativeArray.fss#L15-L25), lines 15 to 25; [arrayOps.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/nativeHelpers/arrayOps.java); [FortressArrayStore.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FortressArrayStore.java#L35-L58), lines 35 to 58.
3. The wrapper: FACTS F-301; the carrier: [switch-rehearsal.md](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-31/probes/switch-rehearsal.md), W2.
4. The transaction: [Transaction.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java#L211-L297), lines 211 to 297; [parallelism-foundations-2026-11-08.md](https://github.com/palimondo/fortress/blob/main/explorations/reviews/parallelism-foundations-2026-11-08.md), sections 1.4 and 1.5.

## 8. Where the boxes are made, and where the JIT removes them

A boxed number is held in a heap object. On the compiled path an `RR64` is an object of the Java class `FRR64`, with one `double` field: Java’s `Double` against `double`. The code generator boxes every number, so `Dot`’s own code holds no `dadd` or `dmul`. The multiply `a[i] b[i]` is three calls down to one `dmul`, between two unboxes and a box:

```
// FortressLibrary.juxtaposition(FRR64,FRR64): the dispatch method
invokeinterface RR64.juxtaposition☞0(FRR64)FRR64
// RR64$DefaultTraitMethods.juxtaposition☞0, a builtinPrimitive body
invokestatic    native.…simpleDoubleArith.doubleMul(FRR64,FRR64)FRR64
// the wrapper
invokevirtual   FRR64.getValue()D                    // twice
invokestatic    simpleDoubleArith.doubleMul(DD)D     // dload_0; dload_2; dmul; dreturn
invokestatic    FRR64.make(D)FRR64
```

The second loop’s body, cut:

```
// Dot$fn@11.apply(FZZ32 i):   s += a[i] b[i]
invokestatic    BaseTask.inATransaction()Z           // reading s
invokevirtual   MutableFValue.getValue()Any
invokeinterface Array1⟦FRR64,0,1000⟧._[_](FZZ32)FRR64      // a[i]
invokeinterface Array1⟦FRR64,0,1000⟧._[_](FZZ32)FRR64      // b[i]
invokestatic    FortressLibrary.juxtaposition(FRR64,FRR64)FRR64
invokestatic    FortressLibrary.+(FRR64,FRR64)FRR64
invokestatic    BaseTask.inATransaction()Z           // writing s
invokevirtual   MutableFValue.setValue(Any)V
```

One iteration of that loop makes these boxes:

- in the range’s own loop, which keeps its index in a mutable cell too: the `1` of `i += 1`, and the new index, which the cell keeps;
- in each of `a[i]` and `b[i]`: none for the element, which the store holds already, but four in the bounds check;
- the product, from the wrapper;
- the sum, which `s`’s cell keeps.

That’s two boxes kept and ten dropped, each iteration. In the first loop, `asFloat(i)` and `1.0` each make a box that the array keeps: a literal is `FRR64.make` at every run.

**Where the JIT removes a box.** Once a loop is hot, C2, the JVM’s optimizing compiler, inlines the dispatch, the wrapper, the helper, `make` and the box’s constructors. Escape analysis then drops each box that nothing keeps, such as the product’s. It needs that whole chain inlined, and C2 stops at a depth of 16 by default. In the prelude’s measured loops, a box’s last constructor sat 10 to 12 calls below the loop. Here the bounds check’s `-` is already 6 calls below the range’s loop, and the one library’s springboards chain longer than the prelude’s. So by count, my reading, the bounds check’s boxes sit near or past the limit, and may stay. Not measured.

**Where it can’t.** An element’s box: the `Object[]` keeps it, so it escapes, 24 bytes an element plus its reference. The boxes of `s` and of the range’s index: each cell keeps its box, 24 and 16 bytes an iteration. And any box that crosses a call C2 doesn’t inline.

**What the boxes cost.** Java models of the compiled boxes, against `double[]`: a dot product over 4K elements, 6.3 times; a 16-by-16 matrix product, 6.5 times; the row lift, a function applied to each row, 2.6 times. An `Object[]` behind an interface, with a cast on each read, added only 1.6 to 9 %: the boxes cost, the generic container doesn’t. A `double[]` store alone buys nothing while each read still makes a box: a dot product over a `double[]` read through a boxing accessor ran at 8.9 times the bare loop, against 6.4 for boxed storage. So where the elements live and where the arithmetic runs unboxed are two decisions.

**“Boxed numbers now”** means this. Your decision makes each built-in number type one value object, an object without identity that no type can extend. In the batch’s second run, rung N makes the prelude’s seven number types so, and the code generator writes each one’s class over a small hand-written class that holds the bare value, a payload class: `FRR64` keeps its `double`, and the class of `RR64` extends it. The boxes stay the same boxes. What changes is that a value whose static type is `RR64` can only be that class, which unboxing by static type needs (section 10). For arrays that changes no decision. In your words: “All arrays must have the most efficient and performant implementation possible. Otherwise it will remain a research toy, not an HPC language.”

**References**

1. Boxing and its cost: FACTS F-11; [kernels/REPORT.md](https://github.com/palimondo/fortress/blob/main/explorations/perf-probes/kernels/REPORT.md), sections 2 and 4. The boxes of `Dot`: `javap -c -p` of `Dot.jar`, of `RangeInternals`’ `CompactFullSeqScalarRange.loop`, of `FortressLibrary`’s `juxtaposition` and `RR64`’s springboard, and of `simpleDoubleArith`’s wrapper, in the scratch tree; [FZZ32.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FZZ32.java#L32-L34), lines 32 to 34, a new box at each `make`.
2. What C2 removes and keeps: FACTS F-301 and F-302; the depths, by counting the frames of section 7; [helper-calls/REPORT.md](https://github.com/palimondo/fortress/blob/main/explorations/perf-probes/helper-calls/REPORT.md), sections 2 to 5.
3. A `double[]` store with boxed traffic: [array-design-review.md](https://github.com/palimondo/fortress/blob/main/explorations/reviews/array-design-review.md), “Serious 4”.
4. Value objects: POSITIONS P-178; the payload class, [carriers-ways-2026-11-13.md](https://github.com/palimondo/fortress/blob/main/explorations/reviews/carriers-ways-2026-11-13.md), “Way C”, form 2, and “Way D”; the rung: [CLIMB-BATCH-33.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/CLIMB-BATCH-33.md), “N. The prelude’s seven number types become value objects”; the phase: [PLAN.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/PLAN.md), “Phase 6. microGPT fast”.
5. Your words, 8 November: [POSITIONS-history.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/POSITIONS-history.md), P-84, the block of 2026-11-08 02:17Z.

## 9. What the rehearsal ran, and why its loop was slow

The switch-over rehearsal of 10 November worked in a scratch tree. Two lines pointed its compiled path at the one library, and twelve marked hacks passed the walls that a hack could pass. The library’s 14 components compiled to bytecode in about 200 s. Then the array program printed `a[5] = 25`, and the dot program printed `dot = 499500.0`. The library’s `DOT` and a matrix died at two walls, fixed since. microGPT’s flat program stopped at the checker, mostly on its arrays without sizes. Probe Y, a second trial on 13 November, ran the same programs in one build that serves either library by one setting. Run 1 of climb batch 33, landed on 17 November, put that setting on `main`: `FORTRESS_LIBRARY=one`.

The dot program, written again from the rehearsal’s description:

```
a: Array1[\RR64,0,1000\] = array1[\RR64,1000\]()
b: Array1[\RR64,0,1000\] = array1[\RR64,1000\]()
for i <- seq(0#1000) do
  a[i] := asFloat(i)
  b[i] := 1.0
end
var s: RR64 = 0.0
for i <- seq(0#1000) do s += a[i] b[i] end
println("dot = " || s.asString)
```

Under walk today, it and the array program printed the compiled runs’ lines.

The rehearsal timed that loop 5K times, 5M iterations: about 0.8 s compiled and 36 s under walk, without a one-line program’s time. Java over `double[]` takes 7.5 ms cold and 4.4 ms warm. So about 160 ns an iteration against about 1 ns. It’s one run each, in different sessions at different loads, with the JIT’s warm-up inside and the verifier off: an order of magnitude, no more.

Boxing explains 6 to 7 times, by the Java models. The rest has no measured share. The record’s four suspects, each now seen in the bytecode:

- the layers of each read and write, 11 calls, with four boxes in each bounds check;
- the range `seq(0#1000)`, which calls the loop’s closure each iteration;
- the check for a transaction at every read and write of a mutable variable, outside `atomic` too: six an iteration in `Dot`’s second loop, two for `s` and four for the range’s index; 64 % of an array loop in another probe;
- a new box for `s`, and one for the index, each iteration.

Read the number as a timing from a Swift debug build. It shows that the code runs and how far it is from the goal, not what it will cost. A profile to split the time is proposed, not run.

**References**

1. The rehearsal: [switch-rehearsal.md](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-31/probes/switch-rehearsal.md), sections 1, 4 and 5; FACTS F-352; the two walls: gap ledger rows 992 and 732, closed.
2. Probe Y: [probe-y.md](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-31/probes/probe-y.md), section 1; FACTS F-353; the setting: F-381, commit `c7ba100d14`.
3. The timing: FACTS F-358; [plan-review-2026-11-10.md](https://github.com/palimondo/fortress/blob/main/explorations/reviews/plan-review-2026-11-10.md), 7.3; [java-baseline/REPORT.md](https://github.com/palimondo/fortress/blob/main/explorations/java-baseline/REPORT.md), section 7, with the fill.
4. The transaction check: gap ledger row 641. The profile: [PLAN.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/PLAN.md), phase 6. The runs: `Arr.fss`, `Dot.fss`, under walk and in the scratch tree; no timing taken.

## 10. The ways to an unboxed store, and to unboxed arithmetic

Your decisions set the goal and leave the way open. Unboxed doubles, and arrays of them, are required: “If this should have been high performance language, it cannot be boxed.” Every number type’s array is to be stored in a Java array of its primitive type, `double[]` first, with the sizes kept in the types. Each number type is one value object, so that compiled code can hold a bare `int`, `long` or `double`. Decision A, how a number type’s array gets its unboxed store, and decision B, where the arithmetic runs unboxed, are open, with no default, for after the switch-over. Their preparation, such as this page, comes before.

**What every store way but A4 needs first.** The tree has a Java store over `double[]`, `FortressRR64ArrayStore`, with its helpers and its library trait. It lacks a `put`, since the team’s only `RR64` array is immutable; a carrier on the compiled path, which only the rehearsal’s hack has; and a mutable Fortress object written for `RR64` alone. With them, layers 5 to 8 of section 7 run over a `double[]`. The read’s wrapper already exists, for the immutable array, and the scratch tree compiled it:

```
// native.com.sun.fortress.nativeHelpers.arrayOps.getRR64
invokevirtual   FJavaRR64ArrayStore.getValue()FortressRR64ArrayStore
invokevirtual   FZZ32.getValue()I
invokestatic    nativeHelpers.arrayOps.getRR64(FortressRR64ArrayStore,I)D
invokestatic    FRR64.make(D)FRR64                  // a new box at each read
```

So the element lives bare, and each read makes a box at layer 6, which the JIT can drop if it inlines the reader. A write would unbox `v` with `getValue()` and store a `double`. Layers 1 to 4 stay as they are: their descriptors say `FRR64`.

**Decision A, the store:**

- **A1, the library’s own type test in the factories.** `array1`’s `typecase` already tests the element type to return a vector. Its `RR64` arm would return a vector object written for `RR64`, through the library’s `cast`: one more template, made as `__RR64Vector⟦1000⟧`, a size and no type in its name. `Dot`’s `invokeinterface Array1⟦FRR64,0,1000⟧` stays; the class behind it changes. The cost is one type test per array made, and, at the first array of each size, the classes of each arm tested, eight for `RR64` (section 6). A probe checked and ran this shape on both paths, in the prelude’s world. The team: Jan Maessen, 2008, of the immutable `RR64` array: “these should be used in preference to the boxed version”.
- **A2, a plain `RR64` factory beside the generic one, chosen by dispatch.** The code generator writes a dispatch method for the pair, as for any overload; the store classes are A1’s. It compiled and dispatched in a probe. Walk refuses the pair at load today.
- **A3, a factory name for each element type**, `rr64Vector[\s0\]()`. No test at all: the call makes `__RR64Vector⟦1000⟧` directly. The model must name it, and `vector[\RR64,s\]` stays boxed.
- **A4, the class loader makes an `RR64` instance’s class with a `double[]` field.** The team’s direction, and your lean: “I would try to pursue the team’s direction unless we have a clear reason not to go there.” No library line changes and nothing selects. Making `PrimitiveArray⟦FRR64,1000⟧`, the loader would write a class whose `mem` is a `double[]`, with `daload` and `dastore` in `get` and `put`. Today it only renames: a field of type `T` becomes `LFRR64;`, and `[D` is no class name. So A4 is new work in the loader and in the code generator, which must mark the templates that can be made so and give them the bodies that renaming can’t. Nothing of it exists and no probe has run. What the team left: the loader’s branch for it, `if (false) { // Here will go all the magic expando-stuff. }`, empty since 2009; and David Chase’s plan, `compiler/optimization/Unbox.java`, 250 lines that list what to unbox (a primitive such as `RR64` as a `D`, an object without fields, unboxed fields, a `comprises` of unboxable types) and that nothing calls. A4 also needs one name per number type at run time, where the record finds two today, the interface’s and the box class’s. Even with A4, a read through the `Array1⟦FRR64,0,1000⟧` interface returns an `FRR64`, unless decision B changes the descriptor.
- **A5, a special type**, an `RR64Vector` that the code generator lowers to a hand-written Java class, as it lowers `ZZ32Vector` to `FZZ32Vector` over `int[]`. No type parameter, no size in its type, not in the specification, and the model names it. It goes against the sizes in the types.

**Decision B, the arithmetic:**

- **B1, Java helpers over whole arrays.** `Vector`’s `dot` would bind a helper that loops over two `double[]` in Java: one call per whole operation, plain Java inside. It needs a store from decision A, and it helps only whole-array operations: microGPT’s views read their elements one `get` at a time, boxed, measured at 8.9 times the bare loop in the Java model.
- **B2, unboxing by static type in generated code.** Wherever the checker’s type is `RR64`, the code generator keeps a JVM `double`: `s` a `double`, `a[i] b[i]` a `dmul`, `f(x: RR64): RR64` a method of descriptor `(D)D`. It boxes only where the value meets `Any`, a trait above `RR64`, or a type parameter. In `Dot`, the loop’s own arithmetic becomes `dmul` and `dadd`, but the library’s generic code still sees `T`: the read through `Array1⟦FRR64,…⟧` still returns a box, unless A4, or a store object written for `RR64`, gives it a `D` descriptor. It needs the closed number types of your value-object decision, rung N’s payload classes, and a second set of descriptors, which the team named in a comment in `NamingCzar` and never built. It’s the team’s precedent, `Unbox.java`’s first case, and the largest code-generator work in the plan.
- **B3, both:** B2 for element access and arithmetic, and helpers only where a whole-array kernel beats the JIT, as a measured remainder.


**References**

1. Your decisions: POSITIONS P-17, P-84, P-85, P-178; your words of 19 September and 8 November: [POSITIONS-history.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/POSITIONS-history.md), P-84, the blocks of 2026-10-13 19:09Z and 2026-11-08 02:17Z; your lean, review-queue item 320.
2. Decision A’s ways: [array-design-ways.md](https://github.com/palimondo/fortress/blob/main/explorations/reviews/array-design-ways.md), section 3, with the probes `WayACast`, `WayACastSized` and `WayASpec`; Maessen, commit `353818213`.
3. Decision B’s ways: [array-design-review.md](https://github.com/palimondo/fortress/blob/main/explorations/reviews/array-design-review.md), section 3, B1 to B3, and “Serious 4”.
4. What the team left: [InstantiatingClassloader.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/runtimeSystem/InstantiatingClassloader.java#L163-L176), lines 163 to 176, first in `4179cee84`; [Unbox.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/optimization/Unbox.java#L21-L28), lines 21 to 28, first in `bce8b45ae`; the descriptors’ comment, [NamingCzar.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java#L262-L281), lines 262 to 281; FACTS F-18.
5. The store and its lacks: [FortressRR64ArrayStore.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FortressRR64ArrayStore.java); FACTS F-333; gap ledger rows 874 and 995. The wrapper: `javap -c -p` of `nativewrapper_cache`, in the scratch tree.
6. How a number type’s class holds a bare value: [carriers-ways-2026-11-13.md](https://github.com/palimondo/fortress/blob/main/explorations/reviews/carriers-ways-2026-11-13.md), “Way C”, “Way D”, “Way H” and “Way I”.

## 11. From `main` to an array program that runs compiled

A rung is one change, which one worker builds and a second checks. A run is one launch of a batch’s rungs. The gate is the full check before a run lands.

**Run 1 of climb batch 33, landed on 17 November.** `FORTRESS_LIBRARY=one` makes the compile command read the one library. A `println` program then compiles, and doesn’t run: the library has no bytecode yet. `Arr` still stops in the code generator: “Not in the trait table: Array1”, since a method entry names the trait without its interface file.

**Run 2, next, on your same go.** Rung R finds a trait’s methods by the interface file that declares it, so `Arr` compiles, and its jar names `Array1⟦FZZ32,0,8⟧` and `seq⟦FZZ32⟧`, as the scratch tree’s did. Other rungs compile varargs, which `println` uses, give two hidden functions on one line two class names, and make the prelude’s number types value objects. Five programs then compile against the one library. None runs: `fortress run Arr` dies at its first library class, “NoClassDefFoundError: fortress/FortressLibrary$String”.

**The batch after, wall by wall, in the classes of section 7:**

1. **The carriers.** A carrier is the Java class that holds a built-in type’s values. The wrapper for `arrayOps` can’t be written, since nothing carries `JavaArrayStore`: `FortressArrayStore` is a plain Java class, outside the Fortress types. Each built-in type needs its class for the one library: the two stores, `Boolean`, `Char`, the flat string, the reader, the writer, and the seven number types by rung N’s form. The wrapper also needs converters for a helper’s Java `String` and `Object`: `arrayOps.get` returns an `Object`, which must arrive as `Any`. And the run time’s 105 exception names still name the prelude.
2. **The declarations that the code generator refuses.** One refused declaration stops its component’s jar. After run 2, by the planner’s probe, 1 or 2 are left, `Generator2` and perhaps `CatString`, and `NN32`’s two getters, declared at `Number`, stop `FortressBuiltin`. Then the 14 compiles write the library’s jars, and `Hello` runs under the gate.
3. **The run tests** of varargs and of the class names.
4. **The walls only a running program shows**, in the order the rehearsal met them:
   - the dispatch method `FortressLibrary⚙$seq⟦FZZ32⟧` names its component without the package `fortress`, so the first `for` dies, “NoClassDefFoundError: FortressLibrary”;
   - `seq` takes its element type from the range’s descriptor, which names `ZZ32`’s interface, where compiled code names `FZZ32`, so it makes a `Generator⟦ZZ32⟧` that the range isn’t: “ClassCastException”;
   - the code generator writes one method twice into 27 of the library’s classes: “ClassFormatError: Duplicate method name”;
   - the JVM’s verifier refuses methods of the library itself, so every program dies as the library’s class loads: on the rehearsal’s base `QQ`’s, which wait for a cast that the code generator doesn’t emit yet; in this page’s scratch tree `simplestRationalBetween` first. The rehearsal, probe Y and this page ran with the verifier off.

   Then `Arr` and `Dot` become tests. Here the array program runs.
5. Smaller code-generator rows and the checker’s other gaps.
6. The matrix and the library’s `DOT` as tests, then what microGPT needs from the checker.

Then the switch-over ends: the compiled tests move, and the prelude is deleted. Next comes the phase in which microGPT compiles, with its static types and the array design, then the phase in which it runs fast.

**This page’s scratch tree.** It started from the base build at `c3b16ef2d1` and took probe Y’s patch, which holds the rehearsal’s hacks. 25 of its 28 files applied as they stand. Its three library files didn’t: they make `Float`, `RR32`, `NN32`, `Boolean` and `Char` traits with carrier objects, and `Float` is gone since your value-object decision. In their place, the tree made each of the nine built-in value objects, `ZZ32`, `ZZ64`, `ZZ`, `NN64`, `RR64`, `NN32`, `RR32`, `Boolean` and `Char`, a trait over one empty object, so that the hand-written box classes can extend their springboards. It typed `NN32`’s two getters `NN32`, and dropped `Float` from the carrier tables. Then:

- the build passed, and the one library’s 14 components compiled, each with exit 0;
- the tolerant code generator left 11 declarations out: `assert`, `deny`, `__filter`, `__bigOperator2` and `Generator2` of `FortressLibrary`; `List`, `app` and `<|_|>` of `List`; `concatAndBalanceIfNecessary` and `stringifyChars` of `String`; `APPCOV`;
- `Arr` and `Dot` compiled, and ran with the verifier off;
- with the verifier on, `Arr` dies as `FortressLibrary`’s class loads: “VerifyError: Bad local variable type”, in `simplestRationalBetween`, a function with `label` and `exit`, which the code generator compiles since the rehearsal. No ledger row names it.

No other wall stopped it.

**References**

1. [CLIMB-BATCH-33.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/CLIMB-BATCH-33.md), section 2: “Run 1, rung by rung”, “Run 2, rung by rung”, “The measures”, “What still stands before the first program runs on the one library”, “For the batch after, in this order”.
2. Gap ledger rows 1061, `Arr`’s stop; 1062, no run yet; 874, the carriers; 993, `NN32`’s getters; 994, the dispatch’s package; 995, the two names; 307, the cast; 624, varargs; 315, the class names; 81, `label`, closed. The phases: POSITIONS P-33.
3. The run’s walls: [switch-rehearsal.md](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-31/probes/switch-rehearsal.md), W2, W6, W7, W11 and W12; [probe-y.md](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-31/probes/probe-y.md), sections 3 and 4; [plan-33/PROBES.md](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-33/PROBES.md), sections 6 and 11.
4. The scratch tree: [probe-y.patch](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-31/probes/probe-y.patch), applied with its three library files left out and redone as above; the verifier’s refusal, `bin/fortress run Arr` without the rehearsal’s flags.

## 12. The transaction checks

Two checks run whether or not the code is inside `atomic`.

- **On a mutable variable.** `var s: RR64` lives in a cell, `MutableFValue`, a small object with one volatile field. Before each read and each write of the cell, the generated code calls `BaseTask.inATransaction()`, as section 8’s listing shows. Inside `atomic` the access goes to the transaction; outside, it’s a volatile read or write. The record measured about 1 to 2 ns a check, and 64 % of a loop over an array with mutable locals, seven checks an element.
- **On an element.** `FortressArrayStore.get` and `put` ask for the current transaction on every call (section 7). The `double[]` store takes no part in a transaction, so an `atomic` write into it isn’t tracked. How an unboxed store takes part is open: it stays outside, recorded as a departure; or a slot interface for `double`, compared by its bits, about 1 to 2 ns an element; or one check per whole-array operation.

The parallelism review explains the two transaction systems and what they cost. A separate review lays out the ways to cut these checks, `reviews/transaction-checks-ways-2026-11-17.md`, so this page leaves them to it.

**References**

1. [parallelism-foundations-2026-11-08.md](https://github.com/palimondo/fortress/blob/main/explorations/reviews/parallelism-foundations-2026-11-08.md), sections 1.4, 1.5, 3.3 and “Questions for the curator”, D1.
2. The check on a variable: gap ledger row 641; FACTS F-12; [MutableFValue.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/MutableFValue.java); [BaseTask.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/runtimeSystem/BaseTask.java#L255-L262), lines 255 to 262.
3. The check on an element: [FortressArrayStore.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FortressArrayStore.java#L35-L58), lines 35 to 58; [Transaction.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java#L211-L297), lines 211 to 297; POSITIONS P-169.

## Closing. Your decisions, and the reports to read

## 13. Your design questions

**Nothing waits on you now.** None of the batch’s forks is an array question. One choice for the batch after is on your review list: whether the compiler may skip a declaration that it refuses, so that programs run sooner, as the rehearsal did. The coordinator’s default is no.

**Decided by you:**

- Unboxed doubles, and arrays of them, are required.
- Each number type’s array is stored unboxed in a Java array of its primitive type, `double[]` first, each array with the most efficient store for its element type. Sizes stay in the types as `nat` parameters, checked. A first version with sizes only as fields was rejected.
- Sizes are checked; a size travels at run time as a descriptor; a size may hold arithmetic. Built, apart from open rows.
- The model’s text is the notation, and a change to a model line comes to you as a diff.
- `+`, `-` and `MAX` between an array and a number come from the library. The diagonal keeps its own product.
- The store sits in a field, its helpers run on both paths, and each number type is one value object.

**Built at a default, waiting for your answer:** the element bound of `Vector` and `Matrix`, a number that is a ring at its own type, one bound for the family or one per operation; and a size known only at run time, read as fixed for one call, by the team’s commented clause on `NatParam`.

**Open, with no default,** for the phase in which microGPT compiles:

- How the factory picks each element type’s store; whether the store also keeps the size as a field; whether a factory for a run-time size returns the unsized `Array[\E,I\]`.
- Decision A, how a number type’s array gets its unboxed store, A1 to A5 (section 10). A4, the class loader’s way, is on file as your lean to confirm.
- Decision B, where unboxed arithmetic happens, B1 to B3 (section 10).
- Decision D, the sizes in the model’s own types: a diff on file, 21 model lines out, 29 in.
- The element width, `RR64` or `RR32`; the default is `RR64`.

Your decision asks for the preparation before the switch-over. The coordinator reads that as plain explainers, such as this page, and that reading waits for your review.

**References**

1. The skipping mode: [CLIMB-BATCH-33.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/CLIMB-BATCH-33.md), “For the batch after”, last paragraph.
2. Decided: POSITIONS P-17, P-84, P-40, P-41, P-55, P-87, P-88, P-169 and P-178; built: FACTS F-67, F-129, F-146, F-333.
3. At a default: FACTS F-151 and F-270; [review-queue.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/review-queue.md), items 31 and 30.
4. Open: POSITIONS P-85; decision A’s ways, [array-design-ways.md](https://github.com/palimondo/fortress/blob/main/explorations/reviews/array-design-ways.md), section 3; your lean, review-queue item 320; decision B’s ways, [array-design-review.md](https://github.com/palimondo/fortress/blob/main/explorations/reviews/array-design-review.md), B1 to B3; D, [decision-d-diff.md](https://github.com/palimondo/fortress/blob/main/explorations/reviews/decision-d-diff.md); width, D and A, item 37; [PLAN.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/PLAN.md), phase 5, item 13.
5. The preparation: P-85’s last sentence; review-queue item 230.

## 14. The deeper reports

Each was checked today against the tree and the record.

- [The array design sketch](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/array-design.md), 19 September. **Out of date.** It planned arrays in the compiler’s prelude, which your decision to add nothing there replaced. Since then the checker checks sizes, the store moved into a field and the vector’s bound changed. Its account of stamping and its boxing numbers still hold.
- [The array questions, every way](https://github.com/palimondo/fortress/blob/main/explorations/reviews/array-design-ways.md), 29 September. **Partly out of date.** Its ways for the unboxed store and the model’s sizes are still the menu. Its questions on size arithmetic, run-time sizes and the bound have been built at defaults, its store account changed, and its probes’ folder is gone.
- [The array forks now](https://github.com/palimondo/fortress/blob/main/explorations/reviews/array-forks-now.md), 9 October. **Out of date.** It sorted 94 checker refusals by question. The count on the one library is now 0, and three of its questions are built.
- [The judgement on the vector’s bound](https://github.com/palimondo/fortress/blob/main/explorations/reviews/array-fork2-judgement.md), 9 October. **Out of date as a question:** its bound is built and its checker crash fixed. Its reasons hold, and your answer is open.
- [The judgement on run-time sizes](https://github.com/palimondo/fortress/blob/main/explorations/reviews/array-fork3-judgement.md), 9 October. **Out of date as a question:** its way is built in the checker. The compiled call still fails verification, and your answer is open.
- [The diff for the model’s sizes](https://github.com/palimondo/fortress/blob/main/explorations/reviews/decision-d-diff.md), 27 September. **Partly out of date.** It’s still the open decision’s diff, but its patch is only in git now, and its counts are of an older library. Of the items it lists as left, the checker’s opening of a run-time size is built, and 17 of the library’s unused sizes are gone, 9 not.
- [The prelude’s two vectors](https://github.com/palimondo/fortress/blob/main/explorations/compiler-probes/vectors/vectors.md), 25 September. **Partly out of date.** It holds for `ZZ32Vector` and `StringVector`, but its line numbers moved, and “there is no `double` counterpart” is no longer true: the one library’s `RR64` store has a compiled `double[]` class.
- [microGPT-shaped kernels](https://github.com/palimondo/fortress/blob/main/explorations/perf-probes/kernels/REPORT.md), 15 September. **Partly out of date.** Its boxing models are still the record’s numbers. Its plan for a prelude `RR64` array was replaced, and the two loop defects it found are gone.
- [The switch-over rehearsal](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-31/probes/switch-rehearsal.md), 10 November, and [probe Y](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-31/probes/probe-y.md), 13 November. **Current for their walls**, on a base before your value-object decision: their library hacks named `Float`, which is gone.

**References**

1. The sketch: POSITIONS P-37; FACTS F-67, F-333, F-151, F-18, F-11.
2. Built at defaults: P-55 and F-146; F-270; F-151; the crash, gap ledger row 684, closed. The count of 0: [CLIMB-BATCH-33.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/CLIMB-BATCH-33.md), “The measures”. The compiled call: row 307.
3. The diff: POSITIONS P-87, the patch in the parent of `84aef6a4f`; the unused sizes, P-40 and review-queue item 36; the run-time size, F-270.
4. The vectors: [CompilerBuiltin.fsi](https://github.com/palimondo/fortress/blob/main/ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#L529-L556), lines 529 to 556, cited there as 563 to 587; F-333.
5. The kernels: gap ledger row 302, closed, the eager debug message; POSITIONS P-174, no numeral at run time.
6. The rehearsal and probe Y: POSITIONS P-178; this page’s scratch tree, section 11.

Written on 17 November 2026 for the curator, from the record and the tree at `main` `9f2ff9b04e`. Part 1’s programs ran under walk in a scratch worktree seeded from the base build at `c3b16ef2d1`, removed after. Part 2’s compiled code came from a second scratch worktree seeded from the same base build, with probe Y’s selector and the rehearsal’s marked hacks, nothing of it on `main`, removed after. No timing was taken. The same text, as a note for the record: `arrays-primer.md`.
