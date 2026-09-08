<!-- Digest of a coordinator conversation on 2026-08-23 (session transcript,
     "What's that?" about Truffle through "How's Graal on vectorization?"),
     recovered on 2026-09-08 after it turned out never to have been committed.
     Claims about tool capabilities are as of the model's knowledge cutoff and
     were not verified against current releases; re-check before relying on
     any of them. -->

# Execution-backend options for a Fortress revival

Where the speed could come from, if the project ever wants it. Context that
frames every option: the 2012 code generator emits the language's object
protocol faithfully (boxed numbers, symmetric multimethod dispatch at every
call, generic classes instantiated at run time, loop bodies as closures under
the task runtime), which is why compiled Fortress is only 7-9x faster than the
tree-walking interpreter and roughly a thousand times slower than plain Java
on a scalar loop (`explorations/compiled-path-gaps.md`). The front end (Rats!
parser, ASTGen node classes, disambiguation, the Scala static checker) is
runtime-agnostic and survives any backend choice.

## 1. Truffle on GraalVM (ranked first)

GraalVM is an ordinary JDK whose C2 JIT is replaced by Graal through the JVMCI
interface; existing bytecode runs unchanged. Truffle is a Java framework on
top of it for implementing languages: write an AST interpreter (a class per
node kind, an `execute` method, specialization annotations for the types a
node has actually observed) and Truffle partially evaluates that interpreter
against each hot program, constant-folding away the interpreter loop, the
dispatch and the boxing, and hands the residue to Graal. Speculation failures
deoptimize back to the interpreter and re-specialize. TruffleRuby, GraalJS,
GraalPy, FastR and Espresso (Java on Truffle) are the reference points.

Fit for this repository: the evaluator layer is rebuilt as Truffle nodes;
parser, AST and static checker are reused; native functions map onto host
interop. The result still runs on a plain JDK (as an interpreter) and gets
specializing compilation when Graal is present. Expected wins: polymorphic
inline caches for multimethod dispatch, unboxed numerics through partial
escape analysis, generics specialized per instantiation. Cost: a serious port
of a large evaluator whose environment-threading style must be reshaped into
Truffle idioms, along a playbook with several public implementations.

Caveat: the JVM Vector API (explicit SIMD) is intrinsified most completely by
the stock C2 compiler; Graal's coverage has been partial. Within-core
vectorization is the one line where a non-JVM backend keeps a clean advantage.
Auto-vectorization is fragile on every JIT and should not be a design
assumption.

## 2. GraalVM Native Image (cheap, orthogonal)

Closed-world ahead-of-time compilation of the existing Java+Scala toolchain
into a standalone `fortress` binary with millisecond startup. It does not make
programs faster; it makes the tool start instantly and ship as one file.
Trades away dynamic class loading and some reflection, which the runtime
instantiation of generics relies on, so feasibility needs a probe.

## 3. LLVM in the style of Julia (third era, only if the JVM is outgrown)

LLVM is only a code generator; Julia, Swift and Rust each wrote the other half
themselves, and that other half is what the JVM gives Fortress for free:
garbage collector, work-stealing runtime, exceptions, dynamic loading, and the
STM behind `atomic`. Going native is a second implementation project. There is
also a design collision: ahead-of-time generics mean choosing between
monomorphization (Rust, whole-program) and uniform code with witness tables
(Swift, works across module boundaries). Fortress's component/API system is a
separate-compilation design, which pushes toward the Swift model and its
performance cliffs, unless a JIT stays in the loop and specializes at run
time, which is the Julia architecture. What it buys: ownership of object
layout (flattened arrays of user types without waiting for Valhalla), LLVM's
vectorizer and every SIMD ISA, cheap C/MPI/OpenMP interop, and cultural fit
with the HPC venue Fortress was pitched at. Chapel, the surviving HPCS
language, compiles natively.

## 4. MLIR as the missing middle (architecture, whichever backend)

MLIR's contribution is dialects: intermediate representations at the
language's own abstraction level, lowered progressively. A `BIG` operator over
a generator can stay an algebraic node subject to monoid-law rewrites, which
is what licenses splitting it for parallelism, and only become loops at the
end. That is the "compiler should see the algebra" story behind Fortress's
generator/reducer library; in 2012 there was nowhere to put it, so it lives
half-desugared in `FortressLibrary.fss`. Any serious new backend should have
this layer, whether or not literal MLIR is underneath.

## Lessons from the neighbours

- Julia solved the symmetric-dispatch-plus-parametric-types problem by
  dropping modular static checking and specializing per call at run time on
  LLVM. Fortress kept the static checking; that is the unexplored quadrant.
- Swift ships unspecialized generics with run-time type metadata and
  specializes hot paths in the optimizer: the model Fortress reached for on
  the JVM, done with a compiler that owns the whole pipeline.
- Mojo restates Fortress's one-language-for-productivity-and-performance
  thesis for the GPU era with the opposite front-end bet: wrap the incumbent
  syntax and hide an MLIR-native language behind it. Swift for TensorFlow is
  the cautionary tale of a research language living on a patron's strategy.
- Scala and Kotlin grew native and JavaScript backends without changing their
  front ends; their JVM backends live with erased generics plus explicit or
  optimizer-driven specialization.
- The JVM itself has moved toward what Fortress needed (Project Valhalla:
  value classes, specialized generics); the exact status per JDK release must
  be checked before it is relied on.

## Sequencing

The front end survives every option, so nothing done in the modernization
ladder forecloses any of them. A type-system map (which specified features
are implemented, restricted, retracted or untested; see the not-working test
directories under `ProjectFortress/` and the papers under `Papers/`) comes
before any backend, because no backend rescues an unchecked ambiguity.
