<!-- Probe of 2026-10-31 for the curator's question on the natives' form (P-58), an Opus worker, its returned text word for word (the harness refused the worker's own write): on the compiled path a bound helper is called through a generated wrapper over the box classes (an `invokestatic` of the wrapper, which unboxes, calls the helper and boxes), C2 inlines the whole path when hot, escape analysis removes every temporary box, and what stays is one box per assignment to a mutable variable per iteration; the library's form and the prelude's give byte-identical code and allocate the same; phase 6 needs no change to the form; a small program only (`HelperCalls.fss`), in a worktree seeded from the batch 23 base build (`1f5c49b4f`), removed after, no timing taken. Commands: run.sh beside this file. -->

# How the compiled path calls a native helper

The question: since climb batch 23 a native binding of the one library may name a static helper of `nativeHelpers/` (P-58; F-298, F-299). Does that form bake in a cost that the JVM cannot remove later?

The answer, in short:

- The code generator does not call the helper. It calls a generated wrapper over the box classes, which unboxes the arguments, calls the helper and boxes the result (section 2).
- When the loop is hot, C2 inlines all of it: the wrapper, the helper, the box's `make` and its constructor chain, and for an operator the dispatcher, the interface call and the trait's body (section 3). The call itself costs nothing in steady state.
- What stays is boxing: one box for each value assigned to a mutable variable, each iteration. Escape analysis removes the other boxes, the temporaries, as long as the box's whole constructor chain inlines (section 4).
- The library's form compiles to the same bytecode as the prelude's own form, byte for byte, and allocates the same (section 5).
- Phase 6 needs no change to the form. The helper's own Java signature, `int intOverflowingAdd(int, int)`, is already the unboxed signature that decision B needs. What phase 6 changes is the calling convention around it (section 6).

## 1. The program and the commands

`HelperCalls.fss` reaches two helpers, `simpleIntArith.intOverflowingAdd` and `simpleDoubleArith.doubleAdd`, in three forms, each in a hot `while` loop of its own over 20,000,000 iterations, run 5 times:

| loop | form | body of the loop |
| --- | --- | --- |
| `loopLib`, `dloopLib` | the library's: `addLib(a, b) = builtinPrimitive("com.sun.fortress.nativeHelpers.simpleIntArith.intOverflowingAdd")` | `acc := addLib(acc, 3)` |
| `loopImp`, `dloopImp` | the prelude's: `import java ... {simpleIntArith.intOverflowingAdd => jAdd}` and `addImp(a, b) = jAdd(a, b)` | `acc := addImp(acc, 3)` |
| `loopPre`, `dloopPre` | the prelude's own binding, `ZZ32`'s and `RR64`'s `+` (`LibraryBuiltin/CompilerBuiltin.fss:674`, `:938`) | `acc := acc + 3` |
| `loopLib2`, `dloopLib2` | the library's, two calls nested | `acc := addLib(addLib(acc, 1), 2)` |
| `sameLoop` | the library's, in a functional method of a trait, `self` first | `if same(b, b) then k := k + 1 end` |

Each loop also counts `i := i + 1` and tests `i < n`, through the prelude's `ZZ32` operators. The `RR64` loops add a constant `h` held in an immutable local. The property `helper.loop` picks one loop, or `all`.

`run.sh <tree> <out>` runs everything below from a built tree, with a private caches folder `<out>/caches`. It writes the `javap -c` listings, `inline.txt` (every loop under `-XX:+UnlockDiagnosticVMOptions -XX:+PrintCompilation -XX:+PrintInlining`), `alloc.tsv` (bytes allocated per loop, from JFR) and `inline-lvl8.txt`. `fortress run` passes `JAVA_FLAGS` to the run's JVM (`bin/run:33-41`).

The machine: 4 CPUs, Intel Xeon at 2.10 GHz, OpenJDK 25.0.4.1, `FORTRESS_THREADS=1`, tiered compilation on, `MaxInlineLevel=15`, compact object headers off. Other agents' suites ran beside the probe, at a load of 20 to 25. So the probe takes no timing: the nanoseconds the program prints are not read. Allocated bytes and inlining decisions do not depend on the load.

## 2. What the code generator emits

### A top-level binding

`addLib` (the library's form) and `addImp` (the prelude's form) have the same body, down to the constant-pool entry (`javap -c -p HelperCalls`):

    public static ...FZZ32 addLib(...FZZ32, ...FZZ32);
         2: invokestatic  #51   // Method native/com/sun/fortress/nativeHelpers/simpleIntArith.intOverflowingAdd:(LFZZ32;LFZZ32;)LFZZ32;
    public static ...FZZ32 addImp(...FZZ32, ...FZZ32);
         2: invokestatic  #51   // Method native/com/sun/fortress/nativeHelpers/simpleIntArith.intOverflowingAdd:(LFZZ32;LFZZ32;)LFZZ32;

(Package prefixes cut here: `FZZ32` is `com/sun/fortress/compiler/runtimeValues/FZZ32`.) `daddLib` and `daddImp` are equal in the same way, at `#62`.

The target is a wrapper class, `native.com.sun.fortress.nativeHelpers.simpleIntArith`, in `nativewrapper_cache/`. Its method unboxes, calls the helper and boxes (`javap -c -p -cp <out>/caches/nativewrapper_cache native.com.sun.fortress.nativeHelpers.simpleIntArith`):

         1: invokevirtual #25   // Method FZZ32.getValue:()I
         5: invokevirtual #25   // Method FZZ32.getValue:()I
         8: invokestatic  #82   // Method com/sun/fortress/nativeHelpers/simpleIntArith.intOverflowingAdd:(II)I
        11: invokestatic  #47   // Method FZZ32.make:(I)LFZZ32;

So the answer to the brief's first question is "something else": an `invokestatic` of the wrapper with the boxes, and the wrapper does the unboxing and boxing. `FZZ32.make` and `FRR64.make` allocate a new box each time (`compiler/runtimeValues/FZZ32.java:22-24`, `FRR64.java:22`). `FBoolean.make` returns one of two cached objects (`FBoolean.java:24`).

The path in the code:

1. The rewrite turns the body into a call `builtinPrimitive_simpleIntArith_intOverflowingAdd(a, b)` and adds `import java com.sun.fortress.nativeHelpers.{simpleIntArith.intOverflowingAdd => builtinPrimitive_simpleIntArith_intOverflowingAdd}` to the component (`compiler/BuiltinPrimitiveRewriter.java:53-63`, `:111-121`). These are the nodes that a written `import java` and its call give.
2. `ForeignJava` reads the Java class and names each method with the tag `☕` (`repository/ForeignJava.java:514`, `:542`). It has `FortressTransformer` write the wrapper class (`:807`). `FortressMethodAdapter` writes each forwarding method: `getValue` on each argument, `invokestatic` of the helper, `make` on the result (`compiler/nativeInterface/FortressMethodAdapter.java:303-327`, the conversions at `:139-157`).
3. At the call, `CodeGen.forFunctionalRef` maps a `☕`-tagged name to the class `native/<package>/<Class>` (`compiler/codegen/CodeGen.java:3692`, `:3789-3790`; `compiler/NamingCzar.java:1818-1832`). `callStaticSingleOrOverloaded` emits the `invokestatic` with the boxed descriptor (`CodeGen.java:1470-1483`).

A helper that Java overloads gets one wrapper method per overload. The call names the one that the checker chose, by its boxed descriptor: `bazS` and `bazI` of `compiler_tests/NativeHelperBindingCompiled.fss` call `simpleOverload.baz:(LFJavaString;)LFJavaString;` and `baz:(LFZZ32;)LFJavaString;`. No dispatcher stands between them. None of the arithmetic helpers is overloaded.

### The prelude's operator

`acc + 3` on `ZZ32` passes through five frames before the helper (`javap -c -p` on `fortress.CompilerBuiltin` and `fortress.CompilerBuiltin$ZZ32$DefaultTraitMethods`):

1. `CompilerBuiltin."+"(FZZ32, FZZ32)`, the dispatcher: `invokeinterface CompilerBuiltin$ZZ32."+☞0":(LFZZ32;)LFZZ32;`
2. the springboard's instance method `+☞0(FZZ32)`, in `ZZ32$DefaultTraitMethods`, which `FZZ32` extends (`FZZ32.java:14`): `invokestatic "+☞0":(LFZZ32;LFZZ32;)LFZZ32;`
3. the trait's static body, `+☞0(FZZ32, FZZ32)`: `invokestatic native/com/sun/fortress/nativeHelpers/simpleIntArith.intOverflowingAdd:(LFZZ32;LFZZ32;)LFZZ32;`
4. the wrapper, as above;
5. the helper.

`i < n` takes the same route through a template instance of `CompilerAlgebra`'s `StandardTotalOrder` `<`, to `simpleIntArith.intLT`. A functional method of the program's own trait (`same(self, other: Shape)`) also takes this route: `HelperCalls.same` makes an `invokeinterface` to `Shape."same☞0"`, the springboard's instance method calls its static body, and the static body calls `native/.../equality.sEquiv` with `self` first.

The loop around these calls also boxes each integer literal at each iteration (`FIntLiteral.make(3)`, then `CompilerBuiltin.coerce_ZZ32`), reads and writes each mutable variable through `BaseTask.inATransaction()` and a `MutableFValue` cell, and pushes and pops `FVoid.make()` after each assignment.

## 3. What HotSpot inlines

In every C2 (tier 4) compile of the nine loops, every frame on the helper's path is inlined. This holds both in each loop's first OSR compile and in the compiles that follow its deoptimization. Each loop's first OSR compile was made not entrant by an uncommon trap at about the time the loop first ended, and was compiled again. `loopLib`'s full compile, from `inline.txt` (indentation cut):

    @ 142   HelperCalls::addLib (6 bytes)   inline (hot)
      @ 2   native.com.sun.fortress.nativeHelpers.simpleIntArith::intOverflowingAdd (15 bytes)   inline (hot)
        @ 1   com.sun.fortress.compiler.runtimeValues.FZZ32::getValue (5 bytes)   accessor
        @ 8   com.sun.fortress.nativeHelpers.simpleIntArith::intOverflowingAdd (22 bytes)   inline (hot)
        @ 11   com.sun.fortress.compiler.runtimeValues.FZZ32::make (9 bytes)   inline (hot)

and its `i + 1`:

    @ 205   fortress.CompilerBuiltin::+ (11 bytes)   inline (hot)
      @ 5   fortress.CompilerBuiltin$ZZ32$DefaultTraitMethods::+\u261e0 (9 bytes)   inline (hot)
        @ 5   fortress.CompilerBuiltin$ZZ32$DefaultTraitMethods::+\u261e0 (9 bytes)   inline (hot)
          @ 5   native.com.sun.fortress.nativeHelpers.simpleIntArith::intOverflowingAdd (15 bytes)   inline (hot)

Below each `make`, the constructor chain `FZZ32.<init>`, `ZZ32$DefaultTraitMethods.<init>`, `Number$...`, `Object$...`, `AnyType$Any$...`, `FValue.<init>` and `java.lang.Object.<init>` is inlined too. The interface call inlines with no type guard printed, since `FZZ32` is the only class that implements `ZZ32`.

C2 refuses three calls in these compiles:

- `BaseTask::transaction`, "unloaded signature classes", on the branch for an `atomic` block, which these loops never take;
- `FFloatLiteral::asRR64`, "low call site frequency", for the literal `0.5` before the loop;
- a `StringBuilder` method in `run`.

(Command: list each "failed to inline" line under a `HelperCalls::` compile of `inline.txt`.)

Tier 3, C1's profiling code, is different. There the helper is refused, "callee is too large" (`intOverflowingAdd`, 22 bytes, 22 times), and so is `FValue::<init>`, "inlining too deep" (24 times). C1 inlines only trivial methods beyond 5 frames (`C1InlineStackLimit=5`), and it stops at `C1MaxInlineLevel=9`. Tier-3 code runs only until C2 replaces it.

The depth: counted from the loop, the deepest frame inlined in these loops is at depth 12: the prelude's `+`, then `java.lang.Object.<init>` under the box of its result. For a top-level binding such as `addLib`, the box's `Object.<init>` is at depth 10. At the default `MaxInlineLevel=15`, frames inline down to depth 16 (section 4, last table).

## 4. Where the cost sits

The call costs nothing once C2 has compiled the loop, so what is left to read is allocation. Bytes per iteration are the bytes that the program's thread allocated (JFR's `jdk.ThreadAllocationStatistics`), less a run with no loop (46 MB), divided by 100,000,000 iterations (`alloc.tsv`):

| loop | escape analysis on | escape analysis off | model, on | model, off |
| --- | --- | --- | --- | --- |
| `loopLib` | 32.49 | 112.00 | 32 | 112 |
| `loopImp` | 32.59 | 112.00 | 32 | 112 |
| `loopPre` | 32.50 | 112.00 | 32 | 112 |
| `loopLib2` | 32.76 | 168.00 | 32 | 168 |
| `dloopLib` | 40.41 | 80.00 | 40 | 80 |
| `dloopImp` | 40.95 | 80.00 | 40 | 80 |
| `dloopPre` | 40.43 | 80.00 | 40 | 80 |
| `dloopLib2` | 40.64 | 104.00 | 40 | 104 |
| `sameLoop` | 32.56 | 112.01 | 32 | 112 |

The model counts objects of 16 bytes (`FZZ32`), 24 bytes (`FRR64`) and 24 bytes (`FIntLiteral`), with 12-byte headers.

- With escape analysis off, the numbers fit the model to the byte: each literal's `FIntLiteral` and `FZZ32`, each helper's result, and nothing else. `FBoolean` and `FVoid` are cached.
- With escape analysis on, what stays is one box for each assignment to a mutable variable, each iteration: `acc` and `i`, or `k` and `i`. That is 2 × 16 bytes in the `ZZ32` loops, and 24 + 16 in the `RR64` loops. The rest, within 1 byte per iteration, is the warm-up before C2's code runs.
- Escape analysis removes every temporary box: the literals' boxes, the boxes passed into a wrapper, and in `loopLib2` and `dloopLib2` the inner call's result, which flows straight into the outer helper. Nesting two helpers costs no more than one.
- The prelude's operator (`loopPre`) and the library's binding (`loopLib`) allocate the same.

The removal needs the whole constructor chain under `make` to inline. In `loopLib2`, with C2's depth limit lowered:

| `loopLib2`, escape analysis on | bytes per iteration |
| --- | --- |
| `MaxInlineLevel=15` (the default) | 32.76 |
| `MaxInlineLevel=9` | 33.19 |
| `MaxInlineLevel=8` | 96.24 |

At 8, C2 refuses `java.lang.Object::<init>` (10 times) and `AnyType$Any$DefaultTraitMethods::<init>` (twice), "inlining too deep" (`inline-lvl8.txt`). From then on, the temporaries whose chain passes depth 9 stay allocated: 96 = 168 less the three `FIntLiteral`s, whose chain is shorter. So a frame at depth d inlines when d ≤ `MaxInlineLevel` + 1.

So the cost sits in the boxing, not in the call. One box is allocated per value that a mutable variable holds across an iteration, and the transaction checks around each read and write of the variable come with it. This agrees with the earlier readings: boxing as the main representational cost (F-11), and boxing, the transaction check and a call per element as a loop's cost (F-40; `perf-probes/transactions/REPORT.md`). Once C2 has compiled the loop, no part of it is the native's call.

The headroom is not large. The prelude's operator reaches depth 12, against the 16 at which inlining stops. So an operator called from 4 more inlined frames, as in a library generic called from a closure, would keep its temporary boxes. By reading, the switch-over takes 2 of those 4 frames, if `FZZ32` extends the one library's `ZZ32` springboard as it extends the prelude's today (`FZZ32.java:14`). A trait's springboard class extends the springboard of the trait's first `extends` entry (`CodeGen.java:5072-5080`). The prelude's chain is `ZZ32`, `Number`, `Object`, `Any` (`CompilerBuiltin.fsi:210`). The one library's is `ZZ32`, `AnyIntegral`, `Number`, `AnyAdditiveGroup`, `Object`, `Any` (`Library/FortressLibrary.fss:730`, `:677`, `:380`, `:356`). That is two more constructors under each `make`. Nothing compiles against the one library yet, so this is not measured.

## 5. The library's form against the prelude's

- **The source.** The rewrite gives the one library's `opr +(self,b:ZZ32):ZZ32 = builtinPrimitive("…intOverflowingAdd")` (`Library/FortressLibrary.fss:762-763`) the body `builtinPrimitive_simpleIntArith_intOverflowingAdd(self, b)`. The prelude's is `jIntOverflowingAdd(self,other)` (`CompilerBuiltin.fss:674`): the same call of an `import java` alias, with `self` first. The code generator has one path for both (section 2).
- **The bytecode.** `addLib` and `addImp` are the same, down to the constant-pool entry.
- **The inlining.** The same decisions for both forms.
- **The bytes.** The same: 112.00 bytes per iteration for both with escape analysis off, and 32.49 against 32.59 with it on.

So the natives' form adds no cost that the prelude's own form does not have.

The one library's 19 `ZZ32` bindings are functional methods of trait `ZZ32`, as the prelude's are. So after the switch-over they take the five-frame route of section 2, provided the switch-over maps the one library's number types onto the same box classes. Today the code generator's type tables name only the prelude's types (`NamingCzar.java:587-601`). In the one library's world the checker reads `int` as `FortressLibrary.ZZ32` (`NamingCzar.java:369-372`). The wrapper generator would find no conversion for that type, so it would refuse the helper class at "Can't generate header for method" (`FortressMethodAdapter.java:259-268`). It would not emit a dearer call. This is by reading only. These tables are the switch-over's names work, which `perf-probes/prelude/natives-shape.md` section 2, "The names", counts (the foreign-type table and the 21 run-time value classes).

## 6. What phase 6 would change, and what it would not

Nothing in the form:

- The binding's string names a static method over Java primitives. Its descriptor, `(II)I` or `(DD)D`, is the unboxed calling convention that decision B (PLAN, phase 6, "Unboxed arithmetic chosen by static type") needs.
- Where the code generator holds both operands unboxed, it can emit `invokestatic com/sun/fortress/nativeHelpers/simpleIntArith.intOverflowingAdd:(II)I` itself, and skip the wrapper. The wrapper stays for call sites that hold boxes, such as generic code and dispatch.
- The body of a binding is exactly one call of the helper with the parameters in order, `self` first. So the code generator can read the helper's name off the declaration without analysis, once the checker has resolved `a + b` at `ZZ32` and `ZZ32` to that declaration.

What phase 6 does change sits around the helper, not in it:

- **Where values live.** A mutable variable's `MutableFValue` cell holds an `Any`, and a box is allocated for each assignment. The same holds for fields, array elements (P-17, P-84) and the boxed parameters and results of every compiled method.
- **The operator's route.** The dispatcher, the interface call, the springboard and the static body are free once inlined, but they spend 4 to 5 of the 16 frames of inline depth. Each box spends 7 to 9 more in its constructor chain (section 4). Primitive values in primitive locals spend none.

The team took the same view. Its bytecode optimizer, `compiler/asmbytecodeoptimizer/`, was started as the "first step to multiple optimizations (coercion removal, inlining, unboxing)" (`b54ba0abb`). It inlines the prelude's static and springboard methods and the native wrappers into the caller, down to the helpers (`Inlining.java:307-312`, and the cases for boxed and unboxed natives in `IterateOverInsns`). It was then to find the box and unbox pairs; its unboxing pass is commented out (`ByteCodeOptimizer.java:142`). It runs only from `bin/BytecodeOptimize:35`, in no phase (`coordinator/map/modules-and-phases.md`, the rows for `asmbytecodeoptimizer/`). It reads the prelude's jars by name, so it binds to the prelude. Its design treats a native as a static helper that unboxing exposes, which is P-58's form.

## 7. For the report

- **Defects.** None found. The refusal of the wrapper generator under the one library's types (section 5) is by reading, and belongs to the switch-over's names work, which `natives-shape.md` section 2 counts.
- **Decisions.**
  - No timing, since the machine was shared at a load of 20 to 25. Allocated bytes from JFR stand in for it, as the cost that the inlining leaves; they do not depend on the load. No decision of the curator covers it.
  - The program and the script are committed beside the report, as the brief asks, though the skill keeps probe programs as scratch (`e77bbed46`).
  - The harness refused the worker's write of this report, so its text was returned word for word. Its INDEX line was returned with it, not added, since `check-index.sh` fails on a line whose file is missing.
  - Each loop's bytes are the thread's total less a run with no loop. JFR's sampled allocation events were not used, since their attribution by loop was noisy in a first run.
- **For FACTS.**
  1. **The fact.** A native binding on the compiled path, written as `builtinPrimitive("pkg.Class.method")` or as an `import java` alias call, compiles to an `invokestatic` of the generated wrapper `native.<pkg>.<Class>.<method>` over the box classes. The wrapper unboxes with `getValue`, calls the helper and boxes with `make`. The two forms give byte-identical bodies.
     - *For the work:* the natives' form adds no cost of its own.
     - *Shown by:* `javap -c -p` on `HelperCalls.jar` and on the wrapper class (sections 2 and 5).
  2. **The fact.** When the loop is hot, C2 inlines the whole path of a bound helper: the wrapper, the helper, `make` and the box's constructor chain, and for an operator the dispatcher, the interface call and the springboard. Only C1's tier-3 code refuses the helper and the constructor chain's deep frames.
     - *For the work:* the call of a native is free in steady state.
     - *Shown by:* `inline.txt` of `run.sh` (section 3).
  3. **The fact.** In such a loop, one box stays per assignment to a mutable variable per iteration: 16 bytes for `ZZ32`, 24 for `RR64`. Escape analysis removes every temporary box, the result of one helper passed into another among them. With escape analysis off, the loops allocate exactly the model's 112, 168, 80 and 104 bytes per iteration. The removal needs the box's whole constructor chain inlined: `loopLib2` goes from 33 to 96 bytes per iteration at `MaxInlineLevel=8`.
     - *For the work:* phase 6's cost is the representation of variables, fields and arrays, not the natives.
     - *Shown by:* `alloc.tsv` of `run.sh` (section 4).
  4. **The fact.** The deepest frame inlined in these loops is at depth 12, the prelude's `+` down to `Object.<init>`. C2 inlines down to depth 16 at JDK 25's default. By reading, the one library's `ZZ32` springboard chain is two classes longer.
     - *For the work:* a temporary box of an operator called from more than 4, or after the switch-over 2, further inlined frames is no longer removed. To check when microGPT first compiles.
     - *Shown by:* `inline.txt` and `inline-lvl8.txt` (sections 3 and 4).
- **Commands** that the skill does not give:
  - `JAVA_FLAGS="… -XX:+UnlockDiagnosticVMOptions -XX:+PrintCompilation -XX:+PrintInlining" bin/fortress run P`: `bin/run` passes `JAVA_FLAGS` to the run's JVM.
  - `-XX:StartFlightRecording=filename=X.jfr,settings=profile`, then `jfr print --json --events jdk.ThreadAllocationStatistics X.jfr`, for the bytes that a run's threads allocated.
  - `javap -c -p -cp <caches>/nativewrapper_cache native.com.sun.fortress.nativeHelpers.<Class>`, for a wrapper.
- **Questions for the curator.** None.
