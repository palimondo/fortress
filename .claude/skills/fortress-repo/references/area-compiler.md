# The compiled checker, the code generator and the run-time

Code under `ProjectFortress/src/com/sun/fortress/`: `scala_src/typechecker/` (the type checker, in Scala), `compiler/` (the disambiguator, the desugarers, `phases/PhaseOrder.java`, overloading, `codegen/`, `NamingCzar`, `OverloadSet`), `runtimeSystem/` (`InstantiatingClassloader`, tasks, transactions), `compiler/runtimeValues/`, `nativeHelpers/`. The compiler is incomplete, not broken: some constructs still stop at a `sayWhat` wall.

## Running

    cd ProjectFortress
    # after any ant compileAll: the library order (build-and-caches.md)
    ../bin/fortress compile <path>/P.fss
    ../bin/fortress run P [args]

A small program compiles in about 5 s and runs in about 1 s. A program's compile never builds the library components it imports (`System`, `CompilerSystem`); the library order does.

The phases: parse, PREDISAMBIGUATEDESUGAR, DISAMBIGUATE, GRAMMAR, PRETYPECHECKDESUGAR, INTEGERLITERALFOLDING, TYPECHECK, DESUGAR, OVERLOADREWRITE, CODEGEN. The syntax tree is the only intermediate form. Which desugarings run is a `Shell` switch set per command, not the phase list. The checker runs only on this path.

Answer "where does this fix belong" before editing: `explorations/coordinator/map/spec-to-implementation.md` gives each feature's parser rule, checker class, interpreter site, code-generator site and prelude location; `explorations/coordinator/map/modules-and-phases.md` gives both pipelines phase by phase.

## The `fortress` commands

`bin/fortress <command>` is dispatched by `ProjectFortress/src/com/sun/fortress/Shell.java` (`:403-487`).

- In regular use: walk (`bin/fortress P.fss`, the same as `bin/fortress walk P.fss`), `compile` and `run`, and `junit X.test` for one compiled test by hand (`tests-running.md`).
- Stopping after a phase, to see what an early phase makes of a program: `parse` (a syntax check), `disambiguate`, `grammar`, `desugar` and `typecheck`. `typecheck` checks against the compiler's own prelude, so it says nothing about an interpreter program (below, "Known shapes").
- `unparse` prints the syntax tree back as Fortress source: the way to see what a desugaring produced.
- `link` links a compiled component (the `link` step of a compiled `.test` file); `api` writes a component's api; `test` runs a program's `test` declarations under walk.
- The command chooses the library: walk and `test` call `Shell.useInterpreterLibraries()`, every other command `useCompilerLibraries()` (`Shell.java:371-386`). Each re-points `WellKnownNames` and `Types` to its prelude and sets the desugaring switches; the compiler's sets the `extends Object` bound before disambiguation, which walk's does not.

## What the code generator does

- Every Fortress type becomes a JVM reference type (`RR64` becomes the run-time class `FRR64`; no primitive `double` arithmetic is emitted).
- Each overloaded name gets one dispatch method that tests argument types from the most specific declaration to the least.
- A generic declaration is compiled once as a template. `InstantiatingClassloader` stamps out each instantiation (`Box⟦RR64⟧`) at its first load by rewriting the template's bytes with ASM. Emitted classfiles stay at version 1.6: do not raise it.
- A size static argument travels at run time as a descriptor from `RTTIsize.of`.
- The `value` modifier has no meaning for the representation.

## The compiler's prelude, until the switch-over

The compiled path uses its own prelude: `LibraryBuiltin/CompilerBuiltin.fss`, `Library/CompilerLibrary.fss`, `Library/CompilerAlgebra.fss`, `Library/CompilerSystem.fss`, with `LibraryBuiltin/AnyType.fss`. Add no declaration to it: the interpreter's library becomes the one the compiler checks, and this prelude is deleted at the switch-over, its tests kept (`area-library.md`).

Natives: `import java com.sun.fortress.nativeHelpers.{...}` in the `.fss`, binding static Java methods over plain Java values. The wrapper generator wraps every method of a class it is given, private ones too, and fails the whole import on a type with no Fortress counterpart, so a helper needs a Fortress-mappable signature even when private. After changing a helper's signature, delete its stale class under `default_repository/caches/nativewrapper_cache/`.

## Testing an edit here

- After a Java or Scala edit: `ant compileAll`, then the library order before any compiled run.
- A quick loop for a checker or code-generator edit: compile the edited class against the build's class path into a scratch directory and put that directory first on the class path. It takes seconds, rebuilds nothing and changes nothing tracked; `explorations/coordinator/tools/checker-count/run.sh` is a working example (`javac` against `bin/fortress_classpath`, its output ahead of `ProjectFortress/build`). Give such a run its own caches (`-Dfortress.caches` and `FORTRESS_CACHES` under your `tmp/`): the caches are never checked against the compiler that wrote them. The edit then goes into the tree and is built for real.
- The suites your edit reaches are the compiler and library tracks: your own tests through `junit.sh`, and the whole tracks at most once, on your final code (`tests-running.md`).
- The checker count and the distance read every compiler phase: run each once on your final code. An edit to `compiler/StaticChecker.java`, or to a file the distance stage patches, breaks those tools' shadows (`checker-measurements.md`).
- A change near transactions, top-level mutable state or the class loader's first load: the four-thread atomic runs (`gate.md`), and your own checks at `FORTRESS_THREADS=1` and `4`.
- The `XXX` shapes for a code-generator wall, a refusal at compile time, or a crash at run time: `tests-writing.md`.

## Known shapes

- The compile path bounds an unbounded type parameter by `Object` before disambiguation, which rejects every generic instantiated at a tuple type. The specification and the measurements use the bound `Any`; the divergence lasts until the switch-over.
- An api and its implementing component must share a name: the linker falls back to the api's own name, and otherwise the link fails ("Could not find an implementation for API") and the run dies with `NoClassDefFoundError`.
- A failed compile of a program leaves a 0-byte jar in `bytecode_cache/`; a failed library compile writes nothing, or only its jar.
- `fortress typecheck` checks against the compiler's prelude, not the interpreter's.
