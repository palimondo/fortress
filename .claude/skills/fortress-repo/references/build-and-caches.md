# Build, caches, and what to rebuild after an edit

## Every shell

    cd <tree>                                   # the main tree or your own worktree
    source explorations/experiment/env.sh

`env.sh` sets `JAVA_HOME` (JDK 25), `FORTRESS_HOME` (the tree the script sits in), `FORTRESS_THREADS=1` and `JAVA_FLAGS="-Xmx4g -Xss64m"`, unsets `JAVA_TOOL_OPTIONS` (the proxy's trust-store flags break ant's JVM forks), and deletes `/tmp/fortress*rats`. Source it once per shell, never in the middle of a run: another agent's live parser directories may be in `/tmp`. Every run that imports a grammar leaves a 5.8 MB Rats! parser directory, `fortress<random>rats`, in the JVM's temporary directory and never deletes it; hundreds of them once filled the disk allowance and broke tool output. Check `df -h /` before a long run (reading it, and the allowance: the `remote-container` skill). Check that `echo $FORTRESS_HOME` prints the tree you mean, because `bin/fortress` takes `FORTRESS_HOME` from the shell whenever it is set. When other agents share the machine, also keep your temporary files in your own tree:

    export TMPDIR=<tree>/tmp
    export JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=<tree>/tmp"

## Building

`ant compileAll`, from the tree's root, is the only build (`ProjectFortress/build.xml` is a stub).

- About 25 to 60 s on a built tree, about 80 s from nothing.
- Its first step deletes `default_repository/caches` whole, `global.map` with it. Like the rest of the caches that file is untracked and ignored, and the linker writes it afresh on the next run, so nothing is restored and `git status` shows nothing from the build.
- Before the next compiled run, the library order (below) must run again. Walk, `harness-one.sh`, the checker measurements and the two ant suites need nothing more.
- If it fails: fix the error and run it again. The caches are already gone, so there is nothing else to clear. Then run the library order.
- Neither test target compiles: a suite run on a stale `ProjectFortress/build` silently tests the previous code.

To keep the caches through a build, and so skip the library order (about 100 s), point that first step at folders that do not exist:

    ant -Dcache0=/nonexistent -Dcache1=/nonexistent compileAll

This is safe only after an edit that cannot change what the caches hold: walk's evaluator and natives (`interpreter/evaluator/`, `interpreter/glue/`), the bodies of the run-time classes compiled code calls (`runtimeSystem/`, `compiler/runtimeValues/`) with no signature changed, the test harness, `Shell`'s options. After an edit to anything the library's compile runs (the parser, the AST, the disambiguator, the checkers, the desugarers, the code generator with `NamingCzar` and `OverloadSet`, walk's `interpreter/rewrite/`), or to the signature of a run-time class or a native helper (`nativeHelpers/`), use the plain `ant compileAll`. Nothing checks a kept cache entry against the rebuilt compiler, so a stale one is used without warning until the caches are deleted: a native helper whose signature changed, for one, keeps its old wrapper in `nativewrapper_cache/`, and the run links the old signature.

Toolchain traps and generated sources: `toolchain.md`.

## The caches

`default_repository/caches/` (gitignored, all of it):

- `analyzed_cache/`, `*parsed_cache/`: front-end analysis, each entry named by a hash of its source's absolute path, with that path inside it.
- `interpreter_cache/`, `environment_cache/`: walk.
- `bytecode_cache/`: one jar per compiled component; library jars have api-qualified names (`fortress.CompilerBuiltin.jar`).
- `nativewrapper_cache/`: wrappers for `import java` natives.
- `global.map`: the linker's saved state, an empty map in practice; when it is missing the linker writes an empty one (`linker/RepoState.java:366-385`), in a private caches folder too.

An entry is used when it is not older than its source, and a changed api makes everything that imports it stale. Because entries are keyed by absolute path, a plain copy of another tree's caches does not work; seed instead (`worktrees.md`).

Only `fortress compile`, `fortress run`, `fortress junit` (and `junit.sh`) and a direct walk run read `default_repository/caches`. `harness-one.sh`, the checker count, the distance stage, the ladder driver and both ant suites use private caches (`-Dfortress.caches` and `FORTRESS_CACHES`), so they need neither the library order nor a warm cache. A private cache directory outside `tmp/` is not gitignored.

## After an edit, what to rebuild

Walk re-reads an edited Fortress source on its next run. The compiled path notices an edit only when the edited component itself is compiled: compiling your own program never recompiles the library under it. Skip the step for your edit below and a body edit runs the old code with no warning; an api edit dies with `NoSuchMethodError`.

- The `.fss` of a compiler-library component (`LibraryBuiltin/AnyType`, `LibraryBuiltin/CompilerBuiltin`, `Library/CompilerLibrary`, `Library/CompilerAlgebra`, `Library/CompilerSystem`), and not its `.fsi`: `fortress compile` that component alone (CompilerBuiltin about 60 s, CompilerLibrary about 25 s, the others 2 to 16 s). Programs need no recompile.
- The `.fsi` of AnyType, CompilerBuiltin, CompilerLibrary or CompilerAlgebra, the roots every api depends on: all five in the library order, about 100 s. `CompilerSystem.fsi`: CompilerSystem alone.
- A file of the interpreter's library (`Library/FortressLibrary.fss` and the rest): nothing. Walk re-reads it on its next run, compiled programs do not link it yet, and the checker measurements read it from source.
- Java or Scala: `ant compileAll`, then the library order before the next compiled run. An edit that cannot change what the caches hold may keep them instead (Building, above).

So old code or a `NoSuchMethodError` after an edit means a step above was skipped: take it. Deleting the caches would clear it too, but only by redoing the library order and every analysis from cold, so it is never the fix. The caches go only with `ant compileAll` itself; anything else that looks like a stale cache has a cause to find before anything is deleted.

The library order, about 100 to 110 s after `ant compileAll` (AnyType 17, CompilerBuiltin 63, CompilerLibrary 27, CompilerAlgebra 2, CompilerSystem 2):

    cd ProjectFortress
    ../bin/fortress compile LibraryBuiltin/AnyType.fss
    ../bin/fortress compile LibraryBuiltin/CompilerBuiltin.fss
    ../bin/fortress compile ../Library/CompilerLibrary.fss
    ../bin/fortress compile ../Library/CompilerAlgebra.fss
    ../bin/fortress compile ../Library/CompilerSystem.fss

Symptoms:

- `NoSuchMethodError` (for example on `fortress.CompilerBuiltin.println` or `coerce_ZZ32`), or `NoClassDefFoundError: fortress/CompilerLibrary$GeneratorZZ32`: a component was not recompiled after an edit or after `ant compileAll`, and the run fell back to the frozen bootstrap stubs in `ProjectFortress/build/fortress/`. Recompile the component, or run the library order. "Unable to read serialized data ... relink" is likewise a stale cache, not a compiler bug: recompile in the library order.
- A `fortress compile` whose source has not changed writes nothing and exits 0.
- A library compile that failed or was killed wrote nothing, or only its jar. Programs keep linking the old jar, silently, until you fix the error and compile that component again.
- A library order that exits 0 can still leave the bytecode cache empty; running the same commands one at a time produced the jars.

## Name resolution

`fortress.source.path` searches `.` (the current directory) first, then `ProjectFortress/LibraryBuiltin`, `Library/` and `ProjectFortress/test_library`. The first `Foo.fsi` or `Foo.fss` found wins, so a file in the directory you run from shadows the library. A component's file name without `.fss` must equal its component name. An api name both libraries use breaks one of them, which is why the compiler's apis are `Compiler`-prefixed. The top-level `CompilerLibrary/` holds `.fsi`-only stubs, not `Library/CompilerLibrary.fss`; `lib/` holds Fortress sources, not jars. When paths misbehave, `repository/ProjectProperties.java` is what resolves `FORTRESS_HOME`, `BASEDIR` and the cache paths.

Deeper: `explorations/repo-internals.md` (architecture, cache anatomy); what each change reaches: `explorations/coordinator/map/README.md`, section 7.
