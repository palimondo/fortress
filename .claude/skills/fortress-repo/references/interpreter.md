# The interpreter (walk)

Walk's code is in `interpreter/`:

- `evaluator/`: the tree walker.
- `env/`: the environments, which map names to values, and the wrappers that load components and apis.
- `rewrite/`: walk's own rewrite of the tree.
- `glue/`: the natives.

## How walk evaluates a program

After the phases (`SKILL.md`, "The phases"), walk rewrites each component in `interpreter/rewrite/`: it gives each reference to a name the lexical depth of its declaration. The evaluator looks up the name by that depth. The compiled path has no such rewrite.

At a call of a generic function, walk infers the static arguments from the run-time types of the arguments (`interpreter/evaluator/EvaluatorBase.java`, `inferAndInstantiateGenericFunction`). Each static parameter gets an interval, from a lower to an upper bound, in a `LatticeIntervalMap` (`useful/`). A type in the domain of an arrow type, such as `T` in `T -> ZZ32`, is contravariant. So its bounds go into the dual map, `LatticeIntervalMapDual`: the same table, with the order reversed. `MakeInferenceSpecific` then makes the inferences more specific, in practice only in the dual map.

Walk chooses a coercion by the value at run time. The specification and the compiled path choose it statically. This is an accepted limit until the switch-over.

## What walk checks

Walk does not check static types (`SKILL.md`, "The phases"). No command checks them for a walk program: `fortress typecheck` checks against the compiler's prelude.

At load, walk checks the overload sets and some `comprises` clauses. It refuses:

- two declarations of one name that its parameter-by-parameter check cannot order. It accepts them if their declared domains order a generic declaration and a plain one, or if `comprises` clauses cover the overlap.
- two functional methods that break the Meet Rule for Functional Methods (`Specification/advanced/overloading.tex`) in a type that provides both.
- an overloaded function with one parameter of type `T`, where `T extends Any` is written: `f[\T extends Any\](x: T)`.
- an extender that a `comprises` clause of the program's main component does not allow. Walk does not yet check the library's clauses, another component's clauses or an object expression's clauses.

So a library edit that adds an overload can stop every program at load. `tests-writing.md` says how a test names a refusal at load.

Walk's overload-ambiguity message names its two declarations in an order that varies from run to run. On one core, the order is fixed for a given library, but a library edit can change it. Do not pin or compare this order. The harness reads only that an `XXX` test fails.

## Natives

The library binds each of walk's natives by a string in its `.fss` files: `builtinPrimitive("com.sun.fortress.interpreter.glue.prim.X")`. The classes are in `interpreter/glue/prim/`. They take the evaluator's boxed values, so the compiled path cannot use them. `import java`, the compiled path's way to bind natives, is wired under walk but unfinished, and no test uses it.

To raise a Fortress exception that a Fortress `catch` sees, a native throws a `FortressError` that holds the exception's object. `Int.overflow()` in `Int.java` there makes one, and its callers throw it:

    FObject f = (FObject) Driver.getFortressLibrary().getRootValue(WellKnownNames.integerOverflowException);
    return new FortressError(f);

A `catch` sees no other Java exception, so any other exception from a native ends the run, a division by zero too.

## Running a program

    bin/fortress P.fss

- If the run stops on an error, it prints the error and the Fortress stack under `Context:`. The hint below them names `-debug interpreter`, which shows nothing more. To see the Java stack too, run `bin/fortress -debug stacktrace P.fss`.
- Walk searches for imports in the current directory first (`build-and-caches.md`, "Name resolution").
- If `JAVA_FLAGS` is not set, `bin/fortress` uses `-Xmx256m -Xss32m`. Your setup gives a 4 GB heap, and the test harness uses 768 MB. A test can pass at two of these heaps and die at the third. If you claim that a run fails near a memory limit, measure the claim at 256 MB: run with `JAVA_FLAGS="-Xmx256m -Xss32m -Djava.io.tmpdir=$PWD/tmp"`.
- Your setup sets `FORTRESS_THREADS`, the size of the pool, to 1 (`SKILL.md`, "Parallelism and mutable state"). If it is unset, the pool has half the CPUs.
- A small program takes about 8 s with cold caches, and about 4 s with warm caches.
- Do not take or record a timing of walk. Do not edit anything to make walk faster.
- To check a build, run `bin/fortress explorations/mandelbrot_canonical.fss`, which prints its picture, or `bin/fortress ProjectFortress/tests/BooleanOps.fss`, which prints nothing and exits 0. Do not use `explorations/claude_demo.fss`: it dies under walk (ledger row 424). `ProjectFortress/hello.fss` runs only on the compiled path.

## The model program

MicroGPT runs only under walk, by hand, never in the gate. To check the model after a library change, run `explorations/coordinator/tools/mg-run.sh <work-dir> <label> [threads]`. It runs the quick pair at once, `MicroGptFlatQuick.fss` and `MicroGptAplQuick.fss`: two forward and backward passes each, against the reference values, in about 56 s for both. Each starts from an empty private cache and writes `<work-dir>/<name>.txt`. Read its `VERDICT:` line and its last line, `rc=`.

- Add the word `full` only if your brief asks for it. It runs the full pair, `MicroGptFlatCheck.fss` and `MicroGptAplCheck.fss`, with 40 checks each and a 90-minute timeout.
- If you change a line of the model, put the change in your report as a diff.

## After an edit here

An edit of a phase that both paths run, or of the desugaring switches in `Shell.java`, can change both paths. Walk turns some desugarings off: `compiler.md`, "Which desugarings run on each path", lists them. An edit under `interpreter/` changes walk only. `compiler.md`, "What the two paths share", says what to report then.
