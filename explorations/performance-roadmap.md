<!-- Drafted by the coordinating session on 2026-09-08 at Pavol's request,
     after the microGPT arc, the two blinded runs and their reviews, the merged
     gap ledger, and the backend-options digest. A proposal for discussion, not
     an approved plan; nothing below is standing work until Pavol says so.
     Measured facts cite their reports; everything else is design reasoning. -->

# Performance roadmap: two routes from notation to speed

## Where we start (measured)

- The walk interpreter runs the whole language and is about a thousand times
  slower than Karpathy's pure-Python microGPT on the same workload
  (`explorations/blinded-fable/notes/`, `explorations/matrix-ad-probes/REPORT.md`).
- The bytecode compiler runs about a tenth of the language and is only 7-9x
  faster than the interpreter (`explorations/compiled-path-gaps.md`).
- Both paths execute the same object protocol: every `RR64` is a heap object
  (`FRR64`; the code generator emits no native double arithmetic), every call
  is symmetric multimethod dispatch on run-time types, generic classes are
  instantiated at load time, and `for`/`Σ` run as generator closures under the
  fork-join task runtime.
- The static type checker (Scala, `scala_src/typechecker/`) runs only on the
  compile path; `walk` leaves it switched off, so the interpreter runs untyped
  desugared trees and accepts spec-illegal programs
  (`explorations/libvector-report.md` §0).
- Fortress's `Σ` is defined to combine in generator order, which licenses the
  reassociation a vectorizer needs; the price is measured at the sixteenth
  digit (golden checks in all three microGPT runs).
- A bare accumulator in a parallel `for` silently loses updates at four
  threads; `atomic` or a reduction fixes it (`explorations/matrix-ad-probes/`).

## The thesis to test

Fortress's type system (symmetric multiple dispatch, reified generics, multiple
inheritance, modular static checking) has never run at a useful speed. Julia
runs three of the four by dropping modular static checking and specializing at
run time. Scala runs static resolution plus unboxing and specialization but
never had symmetric dispatch. Showing all four together at CPython speed or
better, on the JVM, would be new. The driver program is microGPT, gated by the
existing golden check (logits, loss, all gradients against the pinned Python).

## Phase 0: shared foundation (both routes need it)

0.1 **Type-checked interpreter.** Turn the static checker on for `walk`
    (`Shell.java`: `walk` sets the Scala checker off and the checking flag
    defaults false; there is no command-line switch for it today, so one must
    be added) and catalogue what breaks: the 2012 prelude has never been
    type-checked, and the interpreter has run spec-illegal programs without
    complaint. Expected outcomes: a list of prelude fixes, a list of checker
    gaps (the team's own `not_working_static_tests`, 43 files, is the starting
    catalogue), and a conforming interpreter. This is prerequisite work for
    both routes: the compiler route needs static types for every Scala
    technique below, and the Truffle route needs them for initial
    specializations and as the conformance gate.

0.2 **Benchmark harness.** microGPT forward, backward and one Adam step at the
    reference size, plus the two scalar benchmarks from the compiled-path
    report, timed on interpreter, compiler and CPython, recorded in the tree.
    Every later step reports against this table.

0.3 **Type-system stress map.** Which specified features were retracted or
    restricted between the frozen 1.0 spec and the later one, which have no
    implementation and no test, and which require run-time type information of
    generic instantiations to specialize. Sources: `Papers/Dispatch`,
    `Papers/RuntimeInstantiation`, `Papers/Welterweight`, the not-working test
    directories, `explorations/fortress-gap-ledger.md`. No backend rescues an
    unchecked ambiguity.

## Route A: the compiler, taking what Scala took

Keep the front end (parser, disambiguator, checker, desugarers). Modernize the
code generator and the compiler library. Each step is known technique; each
is gated by `ant testFast` plus the microGPT golden check.

A1 **Unbox by static type.** Map `RR64`/`ZZ32`/`Boolean` to JVM primitives
   wherever the checker's type is monomorphic; box only at generic boundaries.
   Scala's treatment of `Double`.
A2 **Specialized arrays.** `Array1[\RR64,…\]` backed by `double[]`, selected
   from the element type carried at run time. Scala's `Array[Double]` via
   class tags. Requires the compiler library to gain generic arrays at all
   (gap G2).
A3 **Static overload resolution.** Where the checker decides the overload,
   emit a direct call; the JIT inlines it. Scala does this for every call.
A4 **Dynamic dispatch through `invokedynamic`.** For the calls the static
   types do not decide, an inline-cached call site over run-time type tags
   replaces the 2012 static dispatch tables. This is the one piece Scala never
   needed and the piece that ate the 2012 team; `invokedynamic` (JDK 7) and
   default methods on interfaces (JDK 8) arrived after their design was fixed.
A5 **Loop lowering.** Recognize a generator over a known range and a known
   monoid reduction, and emit a sequential counted loop; fork-join only above
   a size threshold, with the reduction's declared algebra licensing the
   split. Scala's closure inliner and Java's parallel-stream splitting are the
   worked examples. This is where bounds-check elimination and SIMD then come
   free from HotSpot.
A6 **Generic reductions in the compiler library** (gaps G1, G4, G3): `Σ`,
   `BIG MAX`, comprehensions, `exp`/`log`. About 4,000 lines of library over
   generic traits the builtin layer already declares.
A7 **Raise the emitted classfile version** once the load-time rewriting
   pipeline maintains stack-map frames.

Order: A6 and A2 unblock microGPT at all; A1, A3, A5 deliver the speed; A4
generalizes; A7 is hygiene.

## Route B: the interpreter on Truffle

Keep the same front end. Rebuild only the evaluator (`interpreter/evaluator/`)
as Truffle nodes: one class per AST node kind with specializations, built from
the type-checked, desugared tree. Truffle partially evaluates the interpreter
against each hot program and hands the residue to Graal, which emits machine
code; failed speculations deoptimize and re-specialize.

B1 **Node skeleton for the microGPT subset**: literals, variables, calls,
   object construction, field access, operator methods, `if`, `for` over
   ranges, reductions, closures.
B2 **Specializations**: `RR64` as `double`, `ZZ32` as `int`, inline caches on
   multimethod call sites keyed by run-time type tags, escape analysis to
   remove boxes.
B3 **Library on the same nodes**: the 2012 prelude runs through the new
   evaluator unchanged; native functions map onto host interop.
B4 **Parallel loops**: the generator protocol's fork-join under Truffle, with
   the same size-threshold policy as A5.
B5 **Whole-language coverage**, then retire the 2012 evaluator.

The static checker is not strictly required for Truffle, which specializes on
observed run-time types, but it makes first guesses right, keeps guards cheap,
and is the only way the interpreter becomes spec-conforming. Phase 0.1 is
therefore on the critical path for B as well.

Caveat carried from the backend notes: Truffle wants Graal; the JVM Vector API
is intrinsified most reliably by the stock C2 compiler. Within-core SIMD is
the one line where Route A on stock HotSpot may hold an advantage. To be
re-verified against current releases when reached.

## Both routes, or one?

Both is not too ambitious if Phase 0 is shared and the two routes are kept in
separate directories: A edits `compiler/codegen/` and the compiler library, B
adds a new evaluator package; neither touches the other's code. They share the
gate and the benchmark table, so the comparison is fair by construction. The
economics differ: Route A is incremental and every step is testable in
isolation, which suits delegated workers; Route B has a long silent period
before the first program runs end to end, and needs one worker with the whole
evaluator in view. Sequencing that respects both: start A1-A3 and A6 as
worker-sized steps immediately after Phase 0; start B1 in parallel as a
single long-running worker; hold a checkpoint when either route runs the
microGPT forward pass, and decide then whether to continue both.

## What would count as success

- microGPT forward+backward+Adam at reference size within 2x of pure CPython on
  one core, on either route, golden check green.
- The same program at least 2x faster on four cores than on one, from the
  language's own `for`/`Σ`, with no source changes.
- Every optimization justified by a static type or a declared algebra, never
  by suppressing the language's semantics (order-independent reductions,
  implicit parallelism, symmetric dispatch).
- A written account of which of Fortress's four type-system ingredients each
  route kept, restricted, or deferred, so the thesis is answered honestly
  whether or not the numbers are reached.
