# The compiled checker, the code generator and the run-time

The code is under `ProjectFortress/src/com/sun/fortress/`:

- `scala_src/typechecker/`: the type checker, in Scala.
- `compiler/`: the disambiguator, the desugarers, `phases/PhaseOrder.java`, overloading, `codegen/`, `NamingCzar` and `OverloadSet`.
- `runtimeSystem/`: `InstantiatingClassloader`, tasks and transactions.
- `compiler/runtimeValues/` and `nativeHelpers/`.

The compiler does not compile every construct yet. For some constructs, the code generator calls `sayWhat`, which throws a `CompilerError`. Such a call is a `sayWhat` wall.

## Running

    cd ProjectFortress
    # after any ant compileAll: the library order (build-and-caches.md)
    ../bin/fortress compile <path>/P.fss
    ../bin/fortress run P [args]

A small program compiles in about 5 s and runs in about 1 s.

The phases are parse, PREDISAMBIGUATEDESUGAR, DISAMBIGUATE, GRAMMAR, PRETYPECHECKDESUGAR, INTEGERLITERALFOLDING, TYPECHECK, DESUGAR, OVERLOADREWRITE and CODEGEN. The syntax tree is the only intermediate form. A switch of `Shell.java`, set for each command, decides which desugarings run; the phase list does not. The checker runs only on this path.

Before you edit, find where the fix belongs:

- `explorations/coordinator/map/spec-to-implementation.md` gives each feature's parser rule, checker class, interpreter site, code-generator site and prelude location.
- `explorations/coordinator/map/modules-and-phases.md` gives both pipelines, phase by phase.

## The `fortress` commands

`ProjectFortress/src/com/sun/fortress/Shell.java` dispatches `bin/fortress <command>`.

- Regular use: walk, `compile`, `run`, and `junit X.test` for one compiled test by hand (`tests-running.md`).
- To see what an early phase makes of a program, stop after that phase: `parse` (a syntax check), `disambiguate`, `grammar`, `desugar` or `typecheck`. `typecheck` checks against the compiler's own prelude, so it says nothing about an interpreter program.
- `unparse` prints the syntax tree back as Fortress source. Use it to see what a desugaring made.
- `link` links a compiled component (the `link` step of a compiled `.test` file). `api` writes a component's api. `test` runs a program's `test` declarations under walk.
- The command chooses the library. Walk and `test` call `Shell.useInterpreterLibraries()`. Every other command calls `useCompilerLibraries()`. Each call points `WellKnownNames` and `Types` to its prelude, and sets the desugaring switches.

## What the code generator does

- It makes every Fortress type a JVM reference type. For example, `RR64` becomes the run-time class `FRR64`. It emits no primitive `double` arithmetic.
- It gives each overloaded name one dispatch method. The method tests the argument types from the most specific declaration to the least specific.
- It compiles a generic declaration once, as a template. At the first load of each instantiation (`Box⟦RR64⟧`), `InstantiatingClassloader` makes the instantiation by rewriting the template's bytes with ASM.
- The emitted classfiles stay at version 1.6, because this rewriting keeps no stack-map frames. Do not raise the version.
- A size static argument is passed at run time as a descriptor from `RTTIsize.of`.
- The `value` modifier has no effect on the representation.

## The compiler's prelude, until the switch-over

The compiled path uses the compiler's own prelude: `LibraryBuiltin/CompilerBuiltin.fss`, `Library/CompilerLibrary.fss` and `Library/CompilerAlgebra.fss`. `Library/CompilerSystem.fss` is the compiled path's `System`.

- Do not add a declaration to the three prelude files: they are deleted at the switch-over. Their tests stay.
- The record does not yet say what happens to `CompilerSystem` at the switch-over.

Natives: write `import java com.sun.fortress.nativeHelpers.{...}` in the `.fss` file. It binds static Java methods over plain Java values.

- The wrapper generator wraps every method of a class that it is given, the private methods too. If a type has no Fortress counterpart, it fails the whole import. So give every method of a helper class a signature that maps to Fortress, also a private method.
- After you change a helper's signature, run the plain `ant compileAll`: with kept caches, the run links the old signature (`build-and-caches.md`).

## Testing an edit here

- For a quick loop on an edit of the checker or of the code generator, compile the edited class into a scratch directory, against the class path on the last line that `bin/fortress_classpath` prints. Put that directory first on the class path. This takes seconds, rebuilds nothing and changes nothing tracked.
- Give such a run its own caches (`-Dfortress.caches` and `FORTRESS_CACHES` under your `tmp/`), because nothing checks the caches against the compiler that wrote them. Then put the edit into the tree and build it for real.
- After a checker or code-generator edit, run your own tests through `junit.sh`. Whether you run a whole track: `tests-running.md`, "When to run a whole suite".
- If your change is near transactions, top-level mutable state or the class loader's first load, do the four-thread atomic runs (`gate.md`). Also run your own checks at `FORTRESS_THREADS=1` and `4`.

## Known shapes

- The compiled path bounds an unbounded type parameter by `Object` before disambiguation; walk does not. This rejects every generic that is instantiated at a tuple type. The specification uses the bound `Any`. The difference stays until the switch-over.
- An api and the component that implements it must have the same name. The linker looks for a component with the api's own name. If there is none, the link fails ("Could not find an implementation for API"), and the run dies with `NoClassDefFoundError`.
- A failed compile of a program leaves a 0-byte jar in `bytecode_cache/`.
