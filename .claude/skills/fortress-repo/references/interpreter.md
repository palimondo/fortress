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

## Where a fix of walk belongs

Both paths run the same desugaring phases. Inside them, switches in `Shell.java` decide which desugarings run. Walk turns off these desugarings, which the compiled path runs:

- coercion;
- chained comparisons;
- compound and tuple assignment, and subscripts;
- case expressions, typecase and type ascription;
- the marking of a bodiless declaration as abstract.

Walk evaluates those nodes itself, in `interpreter/evaluator/Evaluator.java` (`forChainExpr`, `forAssignment`, `forCaseExpr`, `forTypecase`, `forAsExpr`). It converts by coercion at dispatch, in `OverloadedFunction.bestMatchWithCoercion`. So if walk is wrong on one of these nodes, fix the evaluator, not the desugarer.

An edit of a phase that both paths run, or of the desugaring switches, can change both paths. An edit under `interpreter/` changes walk only.

## What walk checks

Walk does not check static types (`SKILL.md`, "The phases"). The commands that stop after a phase, and `unparse`, use the compiler's prelude and the compiled path's desugaring switches (`compiler.md`, "The `fortress` commands"). So `fortress typecheck` does not check a walk program, and `desugar` or `unparse` does not print the tree that walk runs. That tree is the component's entry in `interpreter_cache/` (`SKILL.md`, "The caches").

At load, walk checks the overload sets, some `comprises` clauses, inherited abstract methods and `override` declarations. It refuses:

- two declarations of one name that its parameter-by-parameter check cannot order. It accepts them if their declared domains order a generic declaration and a plain one, or if `comprises` clauses cover the overlap.
- two functional methods that break the Meet Rule for Functional Methods (`Specification/advanced/overloading.tex`) in a type that provides both.
- an overloaded function with one parameter of type `T`, where `T extends Any` is written: `f[\T extends Any\](x: T)`.
- an extender that a `comprises` clause of the program's main component does not allow. Walk does not yet check the library's clauses, another component's clauses or an object expression's clauses.
- an object or object expression without static parameters that inherits an abstract method and provides no declaration with a body of its name at or below its parameter types.
- a declaration with the modifier `override`, in a trait, object or object expression, that overrides no declaration that its type's immediate supertraits provide. An `override` at an inherited declaration's own parameter types overrides nothing. At an instance of a generic trait above a declared object, equal parameter types count as overridden. Walk does not read all the bounds of the static parameters in two cases:
  - an object expression, which takes its static parameters from the function around it;
  - a generic trait or object that extends a type under a `where` clause.

  In these cases, walk does not refuse an `override` if the inherited declaration's parameter types mention a static parameter and differ from the `override`'s.

So a library edit can stop every program at load, if it does one of these:

- adds an overload;
- leaves an inherited abstract method without a body at or below its parameter types;
- adds an `override` that overrides nothing.

`tests-writing.md` says how a test names a refusal at load.

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
- To check a build, run `bin/fortress explorations/claude_demo.fss`. It prints `SUM[i <- 1#100] i = 5050` among its lines, and exits 0. `ProjectFortress/hello.fss` runs only on the compiled path.

## The model program

MicroGPT runs only under walk, by hand, never in the gate. Check the model when your brief asks for it: run your tree's `explorations/coordinator/tools/mg-run.sh <work-dir> <label> [threads]`. `<work-dir>` is a folder under your tree's `tmp/`, and `threads` sets `FORTRESS_THREADS`, 1 by default. The script runs the quick pair at once, `MicroGptFlatQuick.fss` and `MicroGptAplQuick.fss`: two forward and backward passes each, against the reference values, in about 56 s for both. Each starts from an empty private cache and writes `<work-dir>/<name>.txt`. Read its `VERDICT:` line and its last line, `rc=`.

- Add the word `full` only if your brief asks for it. It runs the full pair, `MicroGptFlatCheck.fss` and `MicroGptAplCheck.fss`, with 40 checks each and a 90-minute timeout.
- If you change a line of the model, put the change in your report as a diff.
