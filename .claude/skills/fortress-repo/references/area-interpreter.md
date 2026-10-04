# The interpreter (walk)

Code: `ProjectFortress/src/com/sun/fortress/interpreter/`: `evaluator/` (the tree walker), `glue/` (the natives), `env/`, `rewrite/`. Library: `Library/` with `ProjectFortress/LibraryBuiltin/`. Tests: `ProjectFortress/tests/`, run by `testSystem`.

## Running a program

    bin/fortress P.fss              # the same as: bin/fortress walk P.fss

- The file name without `.fss` must equal the component name. Imports are searched in the current directory first (`build-and-caches.md`, "Name resolution").
- Heap: 256 MB unless `JAVA_FLAGS` is set (`env.sh` sets 4 GB; the test harness uses 768 MB). Measure a claim about a failure near a memory limit at 256 MB.
- `FORTRESS_THREADS` sizes the work-stealing pool (`env.sh` sets 1; unset, it is half the CPUs). A `for` loop is parallel unless every generator is `seq`; the elements of a tuple and the operands of an operator are evaluated in parallel.
- A small program takes about 8 s on cold caches and about 4 s warm. After an edit of a library source walk re-reads it on its next run: nothing to rebuild, nothing to wipe.
- A smoke test of a build: `bin/fortress explorations/mandelbrot_canonical.fss`, which prints its picture, or `bin/fortress ProjectFortress/tests/BooleanOps.fss`, which prints nothing and exits 0. `explorations/claude_demo.fss` dies under walk at its unwritten `SUM` until row 424's F-bounded half lands. `ProjectFortress/hello.fss` runs only on the compiled path.
- The model program, microGPT, runs only under walk, by hand, never in the gate. `explorations/coordinator/tools/mg-run.sh <work-dir> <label> [threads]` runs its two checks, `explorations/run-c4/src/MicroGptFlatCheck.fss` and `explorations/apl/mg/MicroGptAplCheck.fss`, at once, each from an empty private cache, with a 90-minute timeout each. In auto mode the session's automatic permission check refuses its `rm -rf` of its own work directories, and the way through is the curator's (the `remote-container` skill, the permission check). A change to a line of the model goes in your report as a diff.

## What walk does not do

- No static checking. The type-checking phase is a no-op under walk, and no switch turns it on. Every "type error" walk prints is a run-time dispatch failure, and walk accepts programs the specification forbids. `fortress typecheck` checks against the compiler's prelude, so it says nothing about an interpreter program.
- It chooses a coercion on the run-time value, where the specification and the compiled path choose it statically. This is an accepted limit until the switch-over.
- Its overload-ambiguity message names the two declarations in an order that varies from run to run (pinned to one core it is fixed for a given library, and a library edit can flip it). Never compare that order; the harness reads only that an `XXX` test fails.
- Its speed does not matter. Take no timing of the interpreter, record none, and edit nothing for speed.
- `import java` is the compiled path's way to bind natives. Under walk it is wired and unfinished, and no test uses it; walk's natives are the `builtinPrimitive` strings below.

## Natives

The library binds walk's natives by `builtinPrimitive("com.sun.fortress.interpreter.glue.prim.X")` strings in its `.fss` files; the classes are under `interpreter/glue/`. They take the evaluator's boxed values, so the compiled path cannot reuse them. A native can raise a Fortress exception that a Fortress `catch` sees, as `Int.overflow()` in `interpreter/glue/prim/Int.java` does:

    throw new FortressError((FObject) Driver.getFortressLibrary().getRootValue(name));

Every other Java exception a native throws is mapped as before; division by zero still ends the run.

## Checks at load

Walk checks the `comprises` clauses of the program's main component at load and refuses a program with an ineligible extender. The library's clauses, another component's and an object expression's are not checked yet. A test names such a refusal with `load_exception_contains` in a `Name.test` beside it (`tests-writing.md`).

## After an edit here

- Java under `interpreter/`: `ant compileAll` (`build-and-caches.md`). The library order is needed only before a compiled run.
- The suite your edit reaches is `testSystem`. Run your own tests through `harness-one.sh`; run the whole `testSystem` at most once, on your final code, and quote it.
- An edit only under `interpreter/evaluator/` and `interpreter/glue/` cannot move the checker count or the distance: do not run them (`checker-measurements.md`). The rest of `interpreter/` is not on that list.
- Walk shares the parser and the early phases with the compiler: an edit to the desugarers, the disambiguator or `Shell`'s switches can change both paths.
