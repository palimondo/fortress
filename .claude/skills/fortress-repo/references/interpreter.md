# The interpreter (walk)

The code is in `ProjectFortress/src/com/sun/fortress/interpreter/`: `evaluator/` (the tree walker), `glue/` (the natives), `env/` and `rewrite/`. The library is `Library/` with `ProjectFortress/LibraryBuiltin/`. The tests are in `ProjectFortress/tests/`, and `testSystem` runs them.

## What walk does not do

- Walk has no type checker (`SKILL.md`, "The phases"), and no switch turns it on. Walk accepts programs that the specification forbids. Its only static checks are those at load (below).
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

At load, walk checks the overload sets and some `comprises` clauses. It refuses:

- two declarations of one name that its parameter-by-parameter check cannot order. It accepts them if a generic declaration beside a plain one is ordered by their declared domains, or if `comprises` clauses cover the overlap.
- two functional methods that break the Meet Rule for their providing type.
- an overloaded function whose one parameter has a type parameter written `T extends Any`.
- an extender that a `comprises` clause of the program's main component does not allow. Walk does not yet check the library's clauses, another component's clauses or an object expression's clauses.

So a library edit that adds an overload can stop every program at load. To test such a refusal, name it with `load_exception_contains` in a `Name.test` file beside the program (`tests-writing.md`).

## Running a program

    bin/fortress P.fss

- Walk searches for imports in the current directory first (`build-and-caches.md`, "Name resolution").
- If `JAVA_FLAGS` is not set, `bin/fortress` uses `-Xmx256m -Xss32m`. Your setup gives a 4 GB heap, and the test harness uses 768 MB. A test can pass at two of these heaps and die at the third. If you claim that a run fails near a memory limit, measure the claim at 256 MB: run with `JAVA_FLAGS="-Xmx256m -Xss32m -Djava.io.tmpdir=$PWD/tmp"`.
- Your setup sets `FORTRESS_THREADS`, the size of the pool, to 1 (`SKILL.md`, "Parallelism and mutable state"). If it is unset, the pool has half the CPUs.
- A small program takes about 8 s with cold caches, and about 4 s with warm caches.
- Do not take or record a timing of walk. Do not edit anything to make walk faster.
- To check a build, run `bin/fortress explorations/mandelbrot_canonical.fss`, which prints its picture, or `bin/fortress ProjectFortress/tests/BooleanOps.fss`, which prints nothing and exits 0. Do not use `explorations/claude_demo.fss` for this. It dies under walk at its `SUM`, which has no static argument written (ledger row 424). `ProjectFortress/hello.fss` runs only on the compiled path.

## The model program

MicroGPT runs only under walk, by hand, never in the gate. To check the model after a library change, run `explorations/coordinator/tools/mg-run.sh <work-dir> <label> [threads]`. It runs the quick pair at once, `MicroGptFlatQuick.fss` and `MicroGptAplQuick.fss`: two forward and backward passes each, against the reference values, in about 56 s for both. Each starts from an empty private cache.

- Add the word `full` only if your brief asks for it. It runs the full pair, `MicroGptFlatCheck.fss` and `MicroGptAplCheck.fss`, with 40 checks each and a 90-minute timeout.

- In auto mode, the automatic permission check refuses the script's `rm -rf` of its own work directories. If it does, do as `session.md`, "The automatic permission check", says.
- If you change a line of the model, put the change in your report as a diff.

## After an edit here

- Walk shares the parser and the early phases with the compiler. So an edit to the desugarers, the disambiguator or the switches of `Shell.java` can change both paths. But walk skips some desugarers, and after the early phases the paths share almost no code (`compiler.md`, "Which desugarings run on each path" and "What the two paths share").
- Run your own tests through `harness-one.sh`. `tests-running.md`, "When to run a whole suite", says whether you run the whole `testSystem`.
