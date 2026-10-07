# The interpreter (walk)

The code is in `ProjectFortress/src/com/sun/fortress/interpreter/`: `evaluator/` (the tree walker), `glue/` (the natives), `env/` and `rewrite/`. The library is `Library/` with `ProjectFortress/LibraryBuiltin/`. The tests are in `ProjectFortress/tests/`, and `testSystem` runs them.

## What walk does not do

- Walk does no static checking. Its type-checking phase does nothing, and no switch turns it on. So every "type error" that walk prints is a dispatch failure at run time, and walk accepts programs that the specification forbids.
- `fortress typecheck` checks against the compiler's prelude, so it says nothing about an interpreter program.
- Walk chooses a coercion by the value at run time. The specification and the compiled path choose it statically. This is an accepted limit until the switch-over.
- Walk's overload-ambiguity message names its two declarations in an order that varies from run to run. On one core the order is fixed for a given library, but a library edit can change it. Never compare or pin this order. The harness reads only that an `XXX` test fails.
- `import java` is how the compiled path binds natives. Under walk, it is wired but unfinished, and no test uses it. Walk's natives are the `builtinPrimitive` strings (below).

## Natives

The library binds walk's natives by `builtinPrimitive("com.sun.fortress.interpreter.glue.prim.X")` strings in its `.fss` files. The classes are under `interpreter/glue/`. They take the evaluator's boxed values, so the compiled path cannot use them.

A native can raise a Fortress exception that a Fortress `catch` sees. `Int.overflow()` in `interpreter/glue/prim/Int.java` does it like this:

    throw new FortressError((FObject) Driver.getFortressLibrary().getRootValue(name));

Walk wraps every other Java exception that a native throws in a `ProgramError`, so division by zero still ends the run.

## Checks at load

At load, walk checks the `comprises` clauses of the program's main component. It refuses a program with an extender that a clause does not allow. It does not yet check the library's clauses, another component's clauses or an object expression's clauses. To test such a refusal, name it with `load_exception_contains` in a `Name.test` file beside the program (`tests-writing.md`).

## Running a program

    bin/fortress P.fss

- Walk searches for imports in the current directory first (`build-and-caches.md`, "Name resolution").
- If `JAVA_FLAGS` is not set, `bin/fortress` uses `-Xmx256m -Xss32m`. Your setup gives a 4 GB heap, and the test harness uses 768 MB. A test can pass at two of these heaps and die at the third. If you claim that a run fails near a memory limit, measure the claim at 256 MB: run with `JAVA_FLAGS="-Xmx256m -Xss32m -Djava.io.tmpdir=$PWD/tmp"`.
- `FORTRESS_THREADS` sets the size of the work-stealing pool. Your setup sets 1. If it is unset, the pool has half the CPUs. A `for` loop is parallel unless every generator is `seq`. Walk evaluates the elements of a tuple and the operands of an operator in parallel.
- A small program takes about 8 s with cold caches, and about 4 s with warm caches.
- Do not take or record a timing of walk. Do not edit anything to make walk faster.
- To check a build, run `bin/fortress explorations/mandelbrot_canonical.fss`, which prints its picture, or `bin/fortress ProjectFortress/tests/BooleanOps.fss`, which prints nothing and exits 0. Do not use `explorations/claude_demo.fss` for this. It dies under walk at its `SUM`, which has no static argument written (ledger row 424). `ProjectFortress/hello.fss` runs only on the compiled path.

## The model program

MicroGPT runs only under walk, by hand, never in the gate. `explorations/coordinator/tools/mg-run.sh <work-dir> <label> [threads]` runs its two checks at once: `explorations/run-c4/src/MicroGptFlatCheck.fss` and `explorations/apl/mg/MicroGptAplCheck.fss`. Each check starts from an empty private cache and has a 90-minute timeout.

- In auto mode, the automatic permission check refuses the script's `rm -rf` of its own work directories. If it does, do as `session.md`, "The automatic permission check", says.
- If you change a line of the model, put the change in your report as a diff.

## After an edit here

- Walk shares the parser and the early phases with the compiler. So an edit to the desugarers, the disambiguator or the switches of `Shell.java` can change both paths.
- Run your own tests through `harness-one.sh`. `tests-running.md`, "When to run a whole suite", says whether you run the whole `testSystem`.
