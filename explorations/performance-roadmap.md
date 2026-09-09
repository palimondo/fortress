<!-- Drafted by the coordinating session on 2026-09-08 at Pavol's request,
     after the microGPT arc, the two blinded runs and their reviews, the merged
     gap ledger, and the backend-options digest. A proposal for discussion, not
     an approved plan; nothing below is standing work until Pavol says so.
     Measured facts cite their reports; everything else is design reasoning. -->

# Performance roadmap: two routes from notation to speed

## Where we start (measured)

- The walk interpreter runs the whole language and is about a thousand times slower than Karpathy's pure-Python microGPT on the same workload (`explorations/blinded-fable/notes/`, `explorations/matrix-ad-probes/REPORT.md`).
- The bytecode compiler runs about a tenth of the language and is only 7-9x faster than the interpreter (`explorations/compiled-path-gaps.md`).
- Both paths execute the same object protocol: every `RR64` is a heap object (`FRR64`; the code generator emits no native double arithmetic), every call is symmetric multimethod dispatch on run-time types, generic classes are instantiated at load time, and `for`/`Σ` run as generator closures under the fork-join task runtime.
- The static type checker (Scala, `scala_src/typechecker/`) runs only on the compile path; `walk` leaves it switched off, so the interpreter runs untyped desugared trees and accepts spec-illegal programs (`explorations/libvector-report.md` §0).
- Fortress's `Σ` is defined to combine in generator order, which licenses the reassociation a vectorizer needs; the price is measured at the sixteenth digit (golden checks in all three microGPT runs).
- A bare accumulator in a parallel `for` silently loses updates at four threads; `atomic` or a reduction fixes it (`explorations/matrix-ad-probes/`).

## The thesis to test

Fortress's type system (symmetric multiple dispatch, reified generics, multiple inheritance, modular static checking) has never run at a useful speed. Julia runs three of the four by dropping modular static checking and specializing at run time. Scala runs static resolution plus unboxing and specialization but never had symmetric dispatch. Showing all four together at CPython speed or better, on the JVM, would be new. The driver program is microGPT, gated by the existing golden check (logits, loss, all gradients against the pinned Python).

**Driver program, refined.** Karpathy's scalar `Value` carries a mutable `grad`, so it is a reference object and stays a heap node under any scheme; unboxing helps it little. The matrix-level formulation probed in `explorations/matrix-ad-probes/` (plain `RR64` vectors and matrices, closures composed as the backward tape) is the one that becomes all-primitive under A1/A2 and is therefore the performance driver. The scalar tape can also be made fast by changing its data structure to parallel arrays (`data[]`, `grad[]`, child indices), which is how tape-based autodiff is written in C, and is what flattening a `value object` node into an array yields.

## Phase 0: shared foundation (both routes need it)

0.1 **Type-checked interpreter.** Turn the static checker on for `walk` (`Shell.java`: `walk` sets the Scala checker off and the checking flag defaults false; there is no command-line switch for it today, so one must be added) and catalogue what breaks: the 2012 prelude has never been type-checked, and the interpreter has run spec-illegal programs without complaint. Expected outcomes: a list of prelude fixes, a list of checker gaps (the team's own `not_working_static_tests`, 43 files, is the starting catalogue), and a conforming interpreter. This is prerequisite work for both routes: the compiler route needs static types for every Scala technique below, and the Truffle route needs them for initial specializations and as the conformance gate.

0.2 **Benchmark harness.** microGPT forward, backward and one Adam step at the reference size, plus the two scalar benchmarks from the compiled-path report, timed on interpreter, compiler and CPython, recorded in the tree. Every later step reports against this table.

0.3 **Type-system stress map.** Which specified features were retracted or restricted between the frozen 1.0 spec and the later one, which have no implementation and no test, and which require run-time type information of generic instantiations to specialize. Sources: `Papers/Dispatch`, `Papers/RuntimeInstantiation`, `Papers/Welterweight`, the not-working test directories, `explorations/fortress-gap-ledger.md`. No backend rescues an unchecked ambiguity. Record separately every `comprises` clause in the prelude: each is closed-world information the 2012 compiler never used for dispatch.

0.4 **Value audit of the library.** The specification distinguishes value objects (immutable fields, no identity, compared by contents; keyword `value`) from reference objects, and the built-in numbers are declared value objects (`value object Float extends RR64`, `Int`, `Boolean`, …). The 2012 code generator gives the modifier no representation meaning. Counted on 2026-09-08: 30 `value object` and 5 `value trait` declarations against 543 `object` and 313 `trait` declarations in `Library/` and `LibraryBuiltin/`, while only six library files declare a `var` field, and the collections are persistent structures (`Map`/`Set` as immutable balanced trees, `PureList` as a finger tree, `List` as an immutable array list with a hand-rolled uniqueness flag for in-place extension). The library is value-semantic in behaviour and reference-typed in declaration. The audit marks every object whose fields are all immutable and whose identity is never observed as `value` (respecting the rule that a value trait's subtypes must be value too), which costs nothing today and supplies the licence A1 and A2 need to unbox, split into fields, and lay out in structure-of-arrays form. Fortress has no ownership, reference counting or uniqueness types; sharing is free because the structures do not mutate, and the rare mutable structure is guarded by `atomic` over the runtime's transactional memory.

## Route A: the compiler, taking what Scala took

Keep the front end (parser, disambiguator, checker, desugarers). Modernize the code generator and the compiler library. Each step is known technique; each is gated by `ant testFast` plus the microGPT golden check.

A1 **Unbox by static type.** Map `RR64`/`ZZ32`/`Boolean` to JVM primitives wherever the checker's type is monomorphic; box only at generic boundaries. Scala's treatment of `Double`. Generalized by 0.4: any `value object` whose fields are primitives is flattened into its fields, in locals as separate slots, in fields of enclosing objects as separate fields, and in arrays as one primitive array per field (structure of arrays), which needs nothing from the VM and is licensed by the absence of identity. A flattened value must be re-boxed at a boundary typed by an unknown `T` or at a call the static types do not decide, so A3 and `comprises` sealing keep the boundaries off the hot path. Single-field value objects, which include every number type, follow the Kotlin/Scala value-class scheme (erasure in monomorphic positions, boxing at generic ones, name mangling to keep the two signatures apart); Fortress's existing mangling in `Naming.java` is extended rather than replaced. No JVM language does compiler-driven structure of arrays; Apache Arrow, Spark's columnar format and ND4J do it by hand as libraries, and ISPC, Jai and Julia's StructArrays do it with compiler cooperation elsewhere.

A2 **Specialized arrays.** `Array1[\RR64,…\]` backed by `double[]`, selected from the element type carried at run time. Scala's `Array[Double]` via class tags. Requires the compiler library to gain generic arrays at all (gap G2).

A3 **Static overload resolution.** Where the checker decides the overload, emit a direct call; the JIT inlines it. Scala does this for every call.

A4 **Dynamic dispatch through `invokedynamic`.** For the calls the static types do not decide, an inline-cached call site over run-time type tags replaces the 2012 generated type-test chains. Behind the call site, one generic run-time dispatcher per operator, on the pattern of Clojure's `MultiFn` (a method table, a best-match search over the subtype relation, a cache keyed by the tuple of argument types, invalidated when a component links in new overloads), with the match relation upgraded to Fortress's type lattice and the call-time ambiguity check dropped because the checker excludes ambiguity statically. This is the one piece Scala never needed and the piece that ate the 2012 team; `invokedynamic` (JDK 7) and default methods on interfaces (JDK 8) arrived after their design was fixed. Where a trait is sealed by `comprises`, the overload set is closed and the dispatcher can be compiled to a direct call or a fixed decision tree (Dylan's sealing, Vortex's class hierarchy analysis).

A5 **Loop lowering.** Recognize a generator over a known range and a known monoid reduction, and emit a sequential counted loop; fork-join only above a size threshold, with the reduction's declared algebra licensing the split. Scala's closure inliner and Java's parallel-stream splitting are the worked examples. This is where bounds-check elimination and SIMD then come free from HotSpot.

A6 **Generic reductions in the compiler library** (gaps G1, G4, G3): `Σ`, `BIG MAX`, comprehensions, `exp`/`log`. About 4,000 lines of library over generic traits the builtin layer already declares.

A7 **Raise the emitted classfile version** once the load-time rewriting pipeline maintains stack-map frames.

Order: A6 and A2 unblock microGPT at all; A1, A3, A5 deliver the speed; A4 generalizes; A7 is hygiene.

## Route B: the interpreter on Truffle

Keep the same front end. Rebuild only the evaluator (`interpreter/evaluator/`) as Truffle nodes: one class per AST node kind with specializations, built from the type-checked, desugared tree. Truffle partially evaluates the interpreter against each hot program and hands the residue to Graal, which emits machine code; failed speculations deoptimize and re-specialize.

B1 **Node skeleton for the microGPT subset**: literals, variables, calls, object construction, field access, operator methods, `if`, `for` over ranges, reductions, closures.

B2 **Specializations**: `RR64` as `double`, `ZZ32` as `int`, inline caches on multimethod call sites keyed by run-time type tags, escape analysis to remove boxes.

B3 **Library on the same nodes**: the 2012 prelude runs through the new evaluator unchanged; native functions map onto host interop.

B4 **Parallel loops**: the generator protocol's fork-join under Truffle, with the same size-threshold policy as A5.

B5 **Whole-language coverage**, then retire the 2012 evaluator.

The static checker is not strictly required for Truffle, which specializes on observed run-time types, but it makes first guesses right, keeps guards cheap, and is the only way the interpreter becomes spec-conforming. Phase 0.1 is therefore on the critical path for B as well.

Caveat carried from the backend notes: Truffle wants Graal; the JVM Vector API is intrinsified most reliably by the stock C2 compiler. Within-core SIMD is the one line where Route A on stock HotSpot may hold an advantage. To be re-verified against current releases when reached.

## Reference implementations, by step

Each technique in the routes has a worked example to read before implementing. None of the code should be copied; Clojure in particular is under the Eclipse Public License and this tree is BSD.

- **A1, unboxing by static type.** Scala's treatment of `Double`: object in the language, primitive in the bytecode wherever the static type is known, boxed only at generic boundaries. SBCL shows the same from declared types inside a dynamic language.

- **A2, specialized arrays and reified generics.** Scala's `Array[Double]` chosen through a class tag. The .NET runtime is the existence proof that a JIT VM can hold reified generics with value-type instantiations specialized and reference-type instantiations shared, since 2005; Project Valhalla is the JVM's version of the same and its status must be checked per release. Kotlin's inline functions with reified type parameters are the cheap trick for small generic helpers. Rust monomorphization is the whole-program alternative; Swift's witness tables (type metadata plus per-trait implementation tables passed at run time, one compiled copy of generic code, hot paths specialized by the optimizer) are the separate-compilation alternative that fits the component/API design, and Fortress's run-time type objects in `compiler/runtimeValues/` are half of one already. Zig's compile-time evaluation of types as values is the model for `nat` parameters and size-indexed arrays.

- **A3, static overload resolution.** Every statically typed JVM language; the checker already computes the answer.

- **A4, dynamic multimethod dispatch.** Clojure's `clojure.lang.MultiFn` for the dispatcher shape; C#'s `dynamic` on the Dynamic Language Runtime for call-site binders with polymorphic inline caches (built 2008 to 2010, the same design as `invokedynamic`); Julia's per-call-signature method cache for the specialize-once-per-type-tuple discipline; Chambers's Cecil/Vortex work for class hierarchy analysis and compiled dispatch trees; Dylan's sealing for turning closed overload sets into static calls, which Fortress's `comprises` already expresses.

- **A5, loop lowering.** Scala's `for` desugars to `foreach`/`map`/`flatMap` with a closure per body, exactly as Fortress desugars to `generate`; Scala pays for it with HotSpot inlining of monomorphic closure sites, the Scala 2.12 optimizer's closure inliner, Scala 3 `inline`, and specialized function types. Scala's parallel collections and Java's parallel streams are the cautionary examples for the fork-join side: split only above a size threshold, sequential loop inside each chunk. Fortress adds what neither has, the reduction's declared algebra licensing the split.

- **Route B.** TruffleRuby, GraalPy and Espresso as the reference interpreters; PyPy's meta-tracing as the one genuine sibling of the derive-the-JIT approach.

## Corrections recorded on the way

- The runtime-instantiation notes under `Papers/RuntimeInstantiation` are about when a generic function's type parameters may be instantiated at run time under the return-type rule, a soundness question; they are not an optimization plan. Boxing and unspecialized generics were not on the 2012 team's worklist at all.

- The emitted classfiles stay at version 1.6 because the load-time rewriting pipeline drops stack-map frames and the JVM's bytecode verifier may fall back to type inference only at that version; execution is unaffected. The verifier checks JVM types, never Fortress types, which do not survive into the classfile.

- Fortress is a small language in surface (loops, numbers, arrays and big operators are library) and a large one in kernel (the type rules that make library extension checkable). The cost of the small surface is that the compiler no longer knows what a loop is; A5 is the repair.

## Both routes, or one?

Both is not too ambitious if Phase 0 is shared and the two routes are kept in separate directories: A edits `compiler/codegen/` and the compiler library, B adds a new evaluator package; neither touches the other's code. They share the gate and the benchmark table, so the comparison is fair by construction. The economics differ: Route A is incremental and every step is testable in isolation, which suits delegated workers; Route B has a long silent period before the first program runs end to end, and needs one worker with the whole evaluator in view. Sequencing that respects both: start A1-A3 and A6 as worker-sized steps immediately after Phase 0; start B1 in parallel as a single long-running worker; hold a checkpoint when either route runs the microGPT forward pass, and decide then whether to continue both.

## What would count as success

- microGPT forward+backward+Adam at reference size within 2x of pure CPython on one core, on either route, golden check green.
- The same program at least 2x faster on four cores than on one, from the language's own `for`/`Σ`, with no source changes.
- Every optimization justified by a static type or a declared algebra, never by suppressing the language's semantics (order-independent reductions, implicit parallelism, symmetric dispatch).
- A written account of which of Fortress's four type-system ingredients each route kept, restricted, or deferred, so the thesis is answered honestly whether or not the numbers are reached.

