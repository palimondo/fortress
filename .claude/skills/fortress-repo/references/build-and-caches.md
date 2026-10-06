# Setting up, building, the caches, and what to rebuild

## Setting up each call

Start each Bash call that runs Fortress, `ant` or a project tool with these lines. `<tree>` is your tree, the tree that you work in: the main tree or your worktree.

    cd <tree> && mkdir -p tmp
    export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH=/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH
    export FORTRESS_HOME=$PWD FORTRESS_THREADS=1 TMPDIR=$PWD/tmp JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$PWD/tmp"
    unset JAVA_TOOL_OPTIONS

- `bin/fortress` takes `FORTRESS_HOME` from the shell whenever it is set. If it names another tree, you run that tree's code. Check it with `echo $FORTRESS_HOME`.
- `JAVA_TOOL_OPTIONS` is unset, because the proxy's trust-store flags in it break ant's JVM forks.

The lines give the settings of `explorations/experiment/env.sh`, with two differences:

- The JVM's temporary directory is your tree's `tmp/`, which is gitignored.
- They leave out env.sh's last line, `rm -rf /tmp/fortress*rats`.

If your brief tells you to run `source env.sh` and then export `TMPDIR` and `JAVA_FLAGS` for your tree's `tmp/`, the lines above give the same settings without the deletion.

Warning: `source env.sh` can break a live run. Every run that imports a grammar makes a 5.8 MB Rats! parser directory, `fortress<random>rats`, in its JVM's temporary directory, and never deletes it. `source env.sh` deletes all of these directories in `/tmp`, also the directory of a run that still uses it. That run, yours in the background or another agent's, may then fail. If other agents work on the machine, assume that a run is live.

With the lines above, your runs put their parser directories in `<tree>/tmp/`. Hundreds of them once filled the disk allowance. So:

- When no run of yours is live, remove yours: `rm -rf <tree>/tmp/fortress*rats`.
- Before a long run, check `df -h /`. How to read it: the `cloud-container` skill.

The two ant suites, `harness-one.sh` and `mg-run.sh` set their own temporary directory, so they put nothing in `/tmp`.

## Building

Run `ant compileAll` from the tree's root. It is the only build: `ProjectFortress/build.xml` is a stub.

- It takes about 25 to 60 s on a built tree, and about 80 s on a new one.
- Its first step deletes `default_repository/caches` at the tree's root, `global.map` included. Restore nothing: the caches are gitignored, and the linker writes `global.map` again on the next run.
- After it, run the library order (below) before the next compiled run. Walk, `harness-one.sh` and the two ant suites need nothing more.
- If it fails, fix the error and run it again. The caches are already deleted, so clear nothing else. Then run the library order.

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

## The caches

An api is a component's interface. The component's `.fsi` file declares it, and its `.fss` file implements it.

The caches are in `default_repository/caches/`. All of them are gitignored.

- `analyzed_cache/`, `*parsed_cache/`: the front end's analysis. The name of each entry is a hash of its source's absolute path, and the entry holds that path.
- `interpreter_cache/`, `environment_cache/`: walk's caches.
- `bytecode_cache/`: one jar for each compiled component. The library's jars have api-qualified names, for example `fortress.CompilerBuiltin.jar`.
- `nativewrapper_cache/`: the wrappers for `import java` natives.
- `global.map`: the linker's saved state, an empty map in practice. If it is missing, the linker writes an empty one, also in a private caches folder.

Fortress uses an entry if the entry is not older than its source. A changed api makes every entry that imports it stale.

Only these runs read `default_repository/caches`: `fortress compile`, `fortress run`, `fortress junit` (and `junit.sh`), and a direct walk run. These runs use private caches (`-Dfortress.caches` and `FORTRESS_CACHES`), and need neither the library order nor warm caches: `harness-one.sh`, the ladder driver and both ant suites.

## After an edit, what to rebuild

Walk reads an edited Fortress source again on its next run. The compiled path sees an edit only when you compile the edited component itself. Compiling your own program never recompiles the library under it. If you skip the step for your edit:

- after an edit of a body, the run uses the old code and gives no warning;
- after an edit of an api, the run stops with `NoSuchMethodError`.

The compiled path builds five library components, in the library order (below). The first, `LibraryBuiltin/AnyType`, holds the top type `Any`, which both libraries share. The other four are the compiler's own.

- If you edited the `.fss` of one of the five, and not its `.fsi`: run `fortress compile` on that component only. Programs need no recompile.
- If you edited the `.fsi` of AnyType, CompilerBuiltin, CompilerLibrary or CompilerAlgebra: run the whole library order. Every api depends on these four.
- If you edited `CompilerSystem.fsi`: compile CompilerSystem only.
- If you edited another file of the interpreter's library (`Library/FortressLibrary.fss` and the others): do nothing. Walk reads the file again on its next run, and compiled programs do not link it yet.
- If you edited Java or Scala: run `ant compileAll`, then the library order before the next compiled run. After some edits you can keep the caches (above).

If you see old behaviour or a `NoSuchMethodError` after an edit, you skipped a step above. Do that step now. Do not delete the caches to fix it: that works only because it repeats the library order and every analysis from cold. Only `ant compileAll` deletes the caches. If something else looks like a stale cache, find its cause before you delete anything.

The library order takes about 100 to 110 s after `ant compileAll`:

    cd ProjectFortress
    ../bin/fortress compile LibraryBuiltin/AnyType.fss            # 17 s
    ../bin/fortress compile LibraryBuiltin/CompilerBuiltin.fss    # 63 s
    ../bin/fortress compile ../Library/CompilerLibrary.fss        # 27 s
    ../bin/fortress compile ../Library/CompilerAlgebra.fss        # 2 s
    ../bin/fortress compile ../Library/CompilerSystem.fss         # 2 s

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
