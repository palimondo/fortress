# Setting up, building, the caches, and what to rebuild

## Setting up each call

Every Bash call starts a new shell (`session.md`). Start each call that runs Fortress, `ant` or a project tool with these lines. `<tree>` is the tree that you work in: the main tree or your worktree.

    cd <tree> && mkdir -p tmp
    export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH=/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH
    export FORTRESS_HOME=$PWD FORTRESS_THREADS=1 TMPDIR=$PWD/tmp JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$PWD/tmp"
    unset JAVA_TOOL_OPTIONS

These lines give the settings of `explorations/experiment/env.sh`:

- `JAVA_HOME` is JDK 25.
- `FORTRESS_HOME` is your tree. `bin/fortress` takes `FORTRESS_HOME` from the shell whenever it is set. If it names another tree, you run that tree's code. Check it with `echo $FORTRESS_HOME`.
- `FORTRESS_THREADS=1` gives one thread. `JAVA_FLAGS` gives a 4 GB heap and a 64 MB stack.
- `JAVA_TOOL_OPTIONS` is unset, because the proxy's trust-store flags in it break ant's JVM forks.

The lines differ from env.sh in two ways:

- The JVM's temporary directory is your tree's `tmp/`, which is gitignored. A batch brief asks the same of a rung worker, with two exports after `source env.sh`.
- They leave out env.sh's last line, `rm -rf /tmp/fortress*rats`.

Warning: do not source env.sh while any run may be live. In a batch, or beside the coordinator, some run is always live. Every run that imports a grammar makes a 5.8 MB Rats! parser directory, `fortress<random>rats`, in its JVM's temporary directory, and never deletes it. Sourcing env.sh deletes all of these directories in `/tmp`, also the directory of a run that still uses it. That run, yours in the background or another agent's, may then fail.

With the lines above, your runs put their parser directories in `<tree>/tmp/`. Hundreds of these directories once filled the disk allowance and broke tool output. So:

- When no run of yours is live, remove yours: `rm -rf <tree>/tmp/fortress*rats`.
- Before a long run, check `df -h /`. How to read it: the `cloud-container` skill.

These runs set their own temporary directory, so they put nothing in `/tmp`: the two ant suites (`ProjectFortress/test-tmp/`), `harness-one.sh`, the distance stage and `mg-run.sh`. `junit.sh` sources env.sh itself and ignores your settings (`tests-running.md`).

## Building

Run `ant compileAll` from the tree's root. It is the only build: `ProjectFortress/build.xml` is a stub.

- It takes about 25 to 60 s on a built tree, and about 80 s on a new one.
- Its first step deletes `default_repository/caches`, at the tree's root, with `global.map` in it. All the caches are untracked and gitignored, and the linker writes `global.map` again on the next run. So restore nothing: `git status` shows nothing from the build.
- After it, run the library order (below) before the next compiled run. Walk, `harness-one.sh`, the checker measurements and the two ant suites need nothing more.
- If it fails, fix the error and run it again. The caches are already deleted, so clear nothing else. Then run the library order.
- The test targets do not compile. If `ProjectFortress/build` is stale, a suite tests the previous code and gives no warning.

### Keeping the caches through a build

The build's first step deletes the two folders that `build.xml` calls `cache0` (`default_repository/caches`) and `cache1` (`local_repository/caches`). To keep the caches, and so skip the library order (about 100 s), point both names at folders that do not exist:

    ant -Dcache0=/nonexistent -Dcache1=/nonexistent compileAll

Do this only if your edit changed code that no compile of the library runs, and nothing else:

- walk's evaluator and natives (`interpreter/evaluator/`, `interpreter/glue/`);
- the bodies of the run-time classes that compiled code calls (`runtimeSystem/`, `compiler/runtimeValues/`), with no signature changed;
- the test harness (`ProjectFortress/src/com/sun/fortress/tests/`).

After every other edit, run the plain `ant compileAll`. This includes an edit to:

- anything that the library's compile runs: the parser, the AST, the disambiguator, the checkers, the desugarers, the code generator with `NamingCzar` and `OverloadSet`, and walk's `interpreter/rewrite/`;
- `Shell.java`, whose switches decide which desugarings and checks run on each path;
- the signature of a run-time class or of a native helper (`nativeHelpers/`);
- any path that the first list does not name, for example `interpreter/env/`.

Nothing compares a kept cache entry with the rebuilt compiler. Fortress uses a stale entry with no warning until the caches are deleted. For example, if a native helper's signature changed, its old wrapper stays in `nativewrapper_cache/`, and the run links the old signature.

Toolchain traps and generated sources: `toolchain.md`.

## The caches

An api is a component's interface. The component's `.fsi` file declares it, and the component's `.fss` file implements it.

The caches are in `default_repository/caches/`. All of them are gitignored.

- `analyzed_cache/`, `*parsed_cache/`: the front end's analysis. The name of each entry is a hash of its source's absolute path, and the entry holds that path.
- `interpreter_cache/`, `environment_cache/`: walk's caches.
- `bytecode_cache/`: one jar for each compiled component. The library's jars have api-qualified names, for example `fortress.CompilerBuiltin.jar`.
- `nativewrapper_cache/`: the wrappers for `import java` natives.
- `global.map`: the linker's saved state, an empty map in practice. If it is missing, the linker writes an empty one (`linker/RepoState.java:366-385`), also in a private caches folder.

Fortress uses an entry if the entry is not older than its source. A changed api makes every entry that imports it stale. Entries are keyed by absolute path, so a plain copy of another tree's caches does not work. Seed a tree instead (`worktrees.md`).

Only these runs read `default_repository/caches`: `fortress compile`, `fortress run`, `fortress junit` (and `junit.sh`), and a direct walk run. These runs use private caches (`-Dfortress.caches` and `FORTRESS_CACHES`), and need neither the library order nor warm caches: `harness-one.sh`, the checker count, the distance stage, the ladder driver and both ant suites. A private caches folder outside `tmp/` is not gitignored.

## After an edit, what to rebuild

Walk reads an edited Fortress source again on its next run. The compiled path sees an edit only when you compile the edited component itself. Compiling your own program never recompiles the library under it. If you skip the step for your edit:

- after an edit of a body, the run uses the old code and gives no warning;
- after an edit of an api, the run stops with `NoSuchMethodError`.

The compiled path builds five library components, in the library order (below). They are `LibraryBuiltin/AnyType`, the top type `Any`, which both libraries share, and the compiler's own `LibraryBuiltin/CompilerBuiltin`, `Library/CompilerLibrary`, `Library/CompilerAlgebra` and `Library/CompilerSystem`.

- If you edited the `.fss` of one of the five, and not its `.fsi`: run `fortress compile` on that component only. CompilerBuiltin takes about 60 s, CompilerLibrary about 25 s, the others 2 to 16 s. Programs need no recompile.
- If you edited the `.fsi` of AnyType, CompilerBuiltin, CompilerLibrary or CompilerAlgebra: run the whole library order, about 100 s. Every api depends on these four.
- If you edited `CompilerSystem.fsi`: compile CompilerSystem only.
- If you edited another file of the interpreter's library (`Library/FortressLibrary.fss` and the others): do nothing. Walk reads the file again on its next run, compiled programs do not link it yet, and the checker measurements read it from source.
- If you edited Java or Scala: run `ant compileAll`, then the library order before the next compiled run. After some edits you can keep the caches (above).

If you see old behaviour or a `NoSuchMethodError` after an edit, you skipped a step above. Do that step now. Do not delete the caches to fix it: that works only because it repeats the library order and every analysis from cold. Only `ant compileAll` deletes the caches. If something else looks like a stale cache, find its cause before you delete anything.

The library order takes about 100 to 110 s after `ant compileAll` (AnyType 17 s, CompilerBuiltin 63 s, CompilerLibrary 27 s, CompilerAlgebra 2 s, CompilerSystem 2 s):

    cd ProjectFortress
    ../bin/fortress compile LibraryBuiltin/AnyType.fss
    ../bin/fortress compile LibraryBuiltin/CompilerBuiltin.fss
    ../bin/fortress compile ../Library/CompilerLibrary.fss
    ../bin/fortress compile ../Library/CompilerAlgebra.fss
    ../bin/fortress compile ../Library/CompilerSystem.fss

Before the first compiled run, check that `default_repository/caches/bytecode_cache/` holds five jars: `fortress.AnyType.jar`, `fortress.CompilerBuiltin.jar`, `fortress.CompilerLibrary.jar`, `fortress.CompilerAlgebra.jar` and `CompilerSystem.jar`. Once, all five compiles exited 0 and the folder stayed empty. The same five commands, run again, made the jars. The cause is not known.

Symptoms:

- `NoSuchMethodError` (for example on `fortress.CompilerBuiltin.println` or `coerce_ZZ32`), or `NoClassDefFoundError: fortress/CompilerLibrary$GeneratorZZ32`: a component was not recompiled after an edit or after `ant compileAll`, and the run used the frozen bootstrap stubs in `ProjectFortress/build/fortress/`. Recompile the component, or run the library order.
- "Unable to read serialized data ... relink": a stale cache, not a compiler bug. Run the library order.
- A `fortress compile` of a source that did not change writes nothing and exits 0.
- A library compile that failed or was killed wrote nothing, or only its jar. Programs link the old jar with no warning until you fix the error and compile that component again.

## Name resolution

- `fortress.source.path` searches `.` (the current directory) first, then `ProjectFortress/LibraryBuiltin`, `Library/` and `ProjectFortress/test_library`. The first `Foo.fsi` or `Foo.fss` that it finds wins. So a file in the directory that you run from hides the library's file of the same name.
- A component's file name without `.fss` must be the component's name.
- If both libraries use one api name, one of them breaks. For this reason, the compiler's apis have the `Compiler` prefix.
- The top-level `CompilerLibrary/` holds `.fsi`-only stubs, not `Library/CompilerLibrary.fss`. `lib/` holds Fortress sources, not jars.
- If paths behave wrongly, read `repository/ProjectProperties.java`. It resolves `FORTRESS_HOME`, `BASEDIR` and the cache paths.

More detail: `explorations/repo-internals.md` (the architecture, the caches). What each change reaches: `explorations/coordinator/map/README.md`, section 7.
