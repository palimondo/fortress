# Setting up, building, the caches, and what to rebuild

A component is a unit of Fortress code, in a `.fss` file of its own name. An api is an interface, in a `.fsi` file of its own name. A component implements the apis that it exports, and uses the apis that it imports.

A DSL grammar is a `grammar` declaration in an api, which adds syntax for a domain-specific language. A program that imports one gets a Rats! parser generated when it runs: 5.8 MB in a new `fortress<random>rats` folder, its parser directory, in its JVM's temporary directory, never deleted. The library, microGPT and the gated tests import none; the APL experiments under `explorations/apl/` do, and so do the ungated tests in `ProjectFortress/syntax_abstraction_tests/`.

## The caches

The caches are in `default_repository/caches/`. All of them are gitignored.

- `analyzed_cache/`, `*parsed_cache/`: the front end's analysis. The name of each entry is a hash of its source's absolute path, and the entry holds that path.
- `interpreter_cache/`, `environment_cache/`: walk's caches.
- `bytecode_cache/`: one jar for each compiled component. Most of the library's jars have api-qualified names, for example `fortress.CompilerBuiltin.jar`.
- `nativewrapper_cache/`: the wrappers for the Java classes that an api imports with `import java`.
- `global.map`: the linker's saved state, an empty map in practice. If it is missing, the linker writes an empty one, also in a private caches folder.

Fortress uses an entry if the entry is not older than its source. A changed api makes every entry that imports it stale. Nothing compares a kept entry with the rebuilt compiler, so Fortress uses a stale entry with no warning until the caches are deleted. For example, if a native helper's signature changed, its old wrapper stays in `nativewrapper_cache/`, and the run links the old signature.

Only these runs read `default_repository/caches`: `fortress compile`, `fortress run`, `fortress junit` (and `junit.sh`), and a direct walk run. These runs use private caches (`-Dfortress.caches` and `FORTRESS_CACHES`), and need neither the library order nor warm caches: `harness-one.sh`, the gate's ladder regression (`gate.md`) and both ant suites.

## The library order

The library order is the five compiles that build the compiled path's library. The first, `LibraryBuiltin/AnyType`, holds the top type `Any`, which both libraries share. The other four are the compiler's own. It takes about 100 to 110 s after `ant compileAll`:

    cd ProjectFortress
    ../bin/fortress compile LibraryBuiltin/AnyType.fss            # 17 s
    ../bin/fortress compile LibraryBuiltin/CompilerBuiltin.fss    # 63 s
    ../bin/fortress compile ../Library/CompilerLibrary.fss        # 27 s
    ../bin/fortress compile ../Library/CompilerAlgebra.fss        # 2 s
    ../bin/fortress compile ../Library/CompilerSystem.fss         # 2 s

Before the first compiled run, check that `default_repository/caches/bytecode_cache/` holds five jars: `fortress.AnyType.jar`, `fortress.CompilerBuiltin.jar`, `fortress.CompilerLibrary.jar`, `fortress.CompilerAlgebra.jar` and `CompilerSystem.jar`, which has no prefix. Sometimes all five compiles exit 0 and a jar is missing. The cause is not known.

- If a jar is missing, run the five commands again. Once, this made the jars.
- If a jar is still missing, report it as a defect. Quote the commands, their exit codes and the folder's listing.
- Keep the caches in this case too. Once, emptying them made the jars, but a deletion hides the cause.

## Name resolution

- `fortress.source.path` searches `.` (the current directory) first, then `ProjectFortress/LibraryBuiltin`, `Library/` and `ProjectFortress/test_library`. The first `Foo.fsi` or `Foo.fss` that it finds wins. So a file in the directory that you run from hides the library's file of the same name.
- A component's file name without `.fss` must be the component's name.
- If both libraries use one api name, one of them breaks. For this reason, the compiler's apis have the `Compiler` prefix.
- The top-level `CompilerLibrary/` holds `.fsi`-only stubs, not `Library/CompilerLibrary.fss`. `lib/` holds Fortress sources, not jars.
- If paths behave wrongly, read `repository/ProjectProperties.java`. It resolves `FORTRESS_HOME`, `BASEDIR` and the cache paths.

## Setting up each call

Start each Bash call that runs Fortress, `ant` or a project tool with these lines. A tree is a checkout of the repository: the main checkout or a worktree. `<tree>` is the tree that you work in.

    cd <tree> && mkdir -p tmp
    export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH=/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH
    export FORTRESS_HOME=$PWD FORTRESS_THREADS=1 TMPDIR=$PWD/tmp JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$PWD/tmp"
    unset JAVA_TOOL_OPTIONS

- `bin/fortress` takes `FORTRESS_HOME` from the shell whenever it is set. If it names another tree, you run that tree's code. Check it with `echo $FORTRESS_HOME`.
- `JAVA_TOOL_OPTIONS` is unset, because the proxy's trust-store flags in it break ant's JVM forks.

The lines give the settings of `explorations/experiment/env.sh`, with two differences:

- The JVM's temporary directory is your tree's `tmp/`, which is gitignored.
- They leave out env.sh's last line, `rm -rf /tmp/fortress*rats`.

If your brief tells you to run `source env.sh` and then to point `TMPDIR` and `JAVA_FLAGS` at `tmp/`, use the lines above. They do the same without the deletion.

Warning: `source env.sh` can break a live run. It deletes every parser directory in `/tmp`, also the directory of a run that still uses it. That run, yours in the background or another agent's, may then fail. If other agents work on the machine, assume that a run is live.

With the lines above, your runs that import a DSL grammar put their parser directories in `<tree>/tmp/`. Hundreds of them once filled the disk allowance. So:

- When no run of yours is live, remove yours: `rm -rf <tree>/tmp/fortress*rats`.
- Before a long run, check `df -h /`. How to read it: the `cloud-container` skill.

## Building

Run `ant compileAll` from the tree's root. It is the only build: `ProjectFortress/build.xml` is a stub.

- On an idle machine, it takes about 25 to 60 s on a built tree, and about 80 s on a new one. While other agents build, it takes up to about 140 s.
- Its first step deletes `default_repository/caches` at the tree's root, `global.map` included. Restore nothing: the caches are gitignored, and the linker writes `global.map` again on the next run.
- After it, run the library order before the next compiled run. Walk, `harness-one.sh` and the two ant suites need nothing more.
- If it fails, fix the error and run it again. The caches are already deleted, so clear nothing else. Then run the library order.

### Keeping the caches through a build

The build's first step deletes the two folders that `build.xml` calls `cache0` (`default_repository/caches`) and `cache1` (`local_repository/caches`). To keep the caches, and so skip the library order, point both names at folders that do not exist:

    ant -Dcache0=/nonexistent -Dcache1=/nonexistent compileAll

Do this only if your edit changed code that no compile of the library runs, and nothing else:

- walk's evaluator and natives (`interpreter/evaluator/`, `interpreter/glue/`);
- the bodies of the run-time classes that compiled code calls (`runtimeSystem/`, `compiler/runtimeValues/`), with no signature changed;
- the test harness (`ProjectFortress/src/com/sun/fortress/tests/`).

After every other edit, run the plain `ant compileAll`. This includes an edit to:

- anything that the library's compile runs: the parser, the AST, the disambiguator, the checkers, the desugarers, the code generator with `NamingCzar` and `OverloadSet`;
- walk's `interpreter/rewrite/`, whose output walk keeps in `interpreter_cache/`;
- `Shell.java`, whose switches decide which desugarings and checks run on each path;
- the signature of a run-time class or of a native helper (`nativeHelpers/`);
- any path that the first list does not name, for example `interpreter/env/`.

## After an edit, what to rebuild

Walk reads an edited Fortress source again on its next run. The compiled path sees an edit only when you compile the edited component itself. Compiling your own program never recompiles the library under it.

- If you edited the `.fss` of one of the five library components, and not its `.fsi`: run `fortress compile` on that component only. Programs need no recompile.
- If you edited the `.fsi` of AnyType, CompilerBuiltin, CompilerLibrary or CompilerAlgebra: run the whole library order. Every api depends on these four.
- If you edited `CompilerSystem.fsi`: compile CompilerSystem only.
- If you edited another file of the interpreter's library (`Library/FortressLibrary.fss` and the others): do nothing. Walk reads the file again on its next run, and compiled programs do not link it yet.
- If you edited Java, Scala or a parser grammar (`parser/*.rats`): run `ant compileAll`, then the library order before the next compiled run. After some edits you can keep the caches (above).

## Symptoms of a skipped step

If you skip the step for your edit, the run shows it:

- After an edit of a body, the run uses the old code and gives no warning.
- After an edit of an api, the run stops with `NoSuchMethodError` or `NoClassDefFoundError` on a library member. Examples: `fortress.CompilerBuiltin.println`, `coerce_ZZ32`, `fortress/CompilerLibrary$GeneratorZZ32`. The run used the frozen bootstrap stubs in `ProjectFortress/build/fortress/`.

If you see either, do the step now: recompile the component, or run the library order. Do not delete the caches to fix it. A deletion works only because it repeats the library order and every analysis from cold. Only `ant compileAll` deletes the caches whole. If something else looks like a stale cache, find its cause before you delete anything.

Two messages look like a skipped step, but usually show a defect:

- A `NoSuchMethodError` on a method of your own program, often with a mangled name such as `\=tag?1??Arrow...`, is a defect of the compiled path. Record it (`tests-writing.md`).
- "Unable to read serialized data for X, recommend you delete the Fortress bytecode cache and relink" is usually a defect of the code generator. Search the gap ledger for the message. Run the library order only if X is a member of a `Compiler*` or `AnyType` component. Keep the caches, whatever the message advises.

Two more facts help you read a run:

- A `fortress compile` of a source that did not change, and whose jar exists, writes nothing and exits 0.
- A library compile that failed or was killed wrote nothing, or only its jar. Programs link the old jar with no warning until you fix the error and compile that component again.
