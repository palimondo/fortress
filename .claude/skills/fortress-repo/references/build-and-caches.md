# Setting up, building, the caches, and what to rebuild

**tree**
: Checkout of the repository: the main checkout or a worktree. In a command, `<tree>` is the tree that you work in.

**library order**
: Five compiles that build the compiled path's library into the caches.

**DSL grammar**
: `grammar` declaration in an api, which adds syntax for a domain-specific language.

**parser directory**
: New `fortress<random>rats` folder of 5.8 MB, in which a program that imports a DSL grammar gets a Rats! parser generated when it runs. The run makes it in its JVM's temporary directory and never deletes it.

## Two layers of code

The repository holds two layers of code. Different tools build them, at different times, so "compile" means a different thing in each layer.

The implementation is the parser, walk, the compiled checker, the code generator and the run time. It is the Java and Scala under `ProjectFortress/src/`, with the parser grammars (`parser/*.rats`) and the syntax tree generated from `ProjectFortress/astgen/Fortress.ast`. `ant compileAll` builds it into `ProjectFortress/build/` ("Building", below). `ant compile` is another name for it.

The Fortress code is the library, the tests and the programs: the `.fss` and `.fsi` files. The `fortress` commands run the phases on it and keep the results in the caches:

- Walk runs the phases on each component that a run needs. It needs no compile.
- `fortress compile` writes a component's jar. It is for the compiled path's components only: the compiler's library, compiled tests and compiled programs.
- `fortress run` compiles no Fortress source.
- A command reuses an entry if no source that the entry depends on is newer than the entry: its own source, and the `.fsi` files of the apis that it imports, at any depth.

An edit makes stale what was built from it:

- Java or Scala: the classes in `ProjectFortress/build/`. Run `ant compileAll`. The cache entries that the edited code wrote are stale too, and no entry notices it: an entry is compared with its sources, never with the implementation. For example, after a change to a native helper's signature, its old wrapper stays in `nativewrapper_cache/`, and the run links the old signature. For this reason, the build deletes the caches when the implementation changes ("Building").
- A parser grammar: the generated parser, and every entry that it parsed. Run `ant compileAll`.
- A `.fss` or `.fsi` file of the library: the entries of that component, and after an `.fsi` edit, the entries of every component that imports the api. Walk analyses them again by itself. A component of the compiler's library needs a compile, or the library order ("After an edit of the library").
- A test or a program: its own entries. Walk and the harness analyse a walk test again by themselves. Compile a compiled test or program again, or let the harness do it.

## The caches

All the caches are gitignored. A caches folder also holds:

- `environment_cache/`: another cache of walk's.
- `nativewrapper_cache/`: the wrappers for the Java classes that an api imports with `import java`.
- `global.map`: the linker's saved state, an empty map in practice. If it is missing, the linker writes an empty one, also in a private caches folder.
- `implementation.stamp`: the stamp of the build that the caches belong to ("Building", below).

Only these runs read `default_repository/caches`: `fortress compile`, `fortress run`, `fortress junit` (and `junit.sh`), `ant testOnly`, and a direct walk run. These runs use private caches (`-Dfortress.caches` and `FORTRESS_CACHES`), and need neither the library order nor warm caches: `harness-one.sh`, the gate's ladder regression (`gate.md`) and both ant suites. `harness-one.sh` keeps its private cache beside its scratch folder between calls (`tests-running.md`).

## The library order

The first of its compiles, `LibraryBuiltin/AnyType`, holds the top type `Any`, which both libraries share. The other four are the compiler's own. All five take about 100 to 110 s after `ant compileAll`.

Run it only when the caches lack the library's jars, or hold stale ones:

- after a build that printed `Caches <tree>/default_repository/caches started again, empty`, and in a tree whose caches are empty;
- after an edit of a library `.fsi` that the section "After an edit of the library" names.

Otherwise the jars are in place, and a compiled test or program needs no library order. The five commands:

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

Start each Bash call that runs Fortress, `ant` or a project tool with these lines:

    cd <tree> && mkdir -p tmp
    export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH=/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH
    export FORTRESS_HOME=$PWD FORTRESS_THREADS=1 TMPDIR=$PWD/tmp JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$PWD/tmp"
    unset JAVA_TOOL_OPTIONS

- `bin/fortress` takes `FORTRESS_HOME` from the shell whenever it is set. If it names another tree, you run that tree's code. Check it with `echo $FORTRESS_HOME`.
- `JAVA_TOOL_OPTIONS` is unset, because the proxy's trust-store flags in it break ant's JVM forks.

The lines give the settings of `explorations/experiment/env.sh`, with two differences:

- The JVM's temporary directory is your tree's `tmp/`, which is gitignored.
- They leave out env.sh's removal of old parser directories in `/tmp`. That removal spares the directory of a live run.

If your brief tells you to run `source env.sh` and then to point `TMPDIR` and `JAVA_FLAGS` at `tmp/`, use the lines above. They do the same.

The library and microGPT import no DSL grammar, and of the gated tests only `ProjectFortress/syntax_abstraction_tests/ForUse.fss` does. The APL experiments under `explorations/apl/` do, and so do the ungated tests in that folder.

With the lines above, your runs that import a DSL grammar put their parser directories in `<tree>/tmp/`. Hundreds of them once filled the disk allowance. So:

- When no run of yours is live, remove yours: `rm -rf <tree>/tmp/fortress*rats`.
- Before a long run, check `df -h /`. How to read it: the `cloud-container` skill.

## Building

Run `ant compileAll` from the tree's root. It is the only build: `ProjectFortress/build.xml` is a stub.

- It makes the parser and the syntax tree again only if their sources changed.
- javac compiles only the changed Java files and the files that depend on them. scalac runs only if its inputs changed, and then compiles every Scala file.
- It decides by a stamp whether it deletes the caches. `ProjectFortress/build/implementation.stamp` is a hash of the built implementation, and each caches folder holds the stamp of the build that filled it. At its end, the build keeps `default_repository/caches` if its stamp equals the new one, and empties it if not. It does not touch a private caches folder. It prints `Caches <folder> kept` or `Caches <folder> started again, empty`. The comment "The caches and the implementation" in `build.xml` gives the rule.
- `ant cleanCache` deletes the caches, whatever their stamp.
- With nothing changed, it takes about 4 s. After an edit, it takes about 25 to 60 s on an idle machine, scalac about 19 s of it, and about 50 to 80 s on a new or cleaned tree. While other agents build, it takes up to about 140 s.
- After a build that started the caches again, yours or a test target's, run the library order before the next compiled run. So each edit of Java or Scala costs about 2 to 3 minutes before a compiled run: the build, then the library order.
- If it fails, fix the error and run the same command again. Clear nothing by hand.

## After an edit of the library

The compiled path sees an edit of its library only when you compile the edited component itself. Compiling your own program never recompiles the library under it.

- If you edited the `.fss` of one of the five library components, and not its `.fsi`: run `fortress compile` on that component only. Programs need no recompile.
- If you edited the `.fsi` of AnyType, CompilerBuiltin, CompilerLibrary or CompilerAlgebra: run the whole library order. Every api depends on these four.
- If you edited `CompilerSystem.fsi`: compile CompilerSystem only.
- If you edited any other file of `Library/` or `ProjectFortress/LibraryBuiltin/`: it is walk's library. Do nothing: walk reads it again, and compiled programs do not link it yet.

## Symptoms of a skipped step

If you skip the step for your edit, the run shows it:

- After an edit of a body, the run uses the old code and gives no warning.
- After an edit of an api, the run stops with `NoSuchMethodError` or `NoClassDefFoundError` on a library member. Examples: `fortress.CompilerBuiltin.println`, `coerce_ZZ32`, `fortress/CompilerLibrary$GeneratorZZ32`. The run found no library jar and used the bootstrap stubs: old class files of the compiler's library that the build compiles from `ProjectFortress/src/fortress/` into `ProjectFortress/build/fortress/`.

If you see either, do the step now: recompile the component, or run the library order. Do not delete the caches to fix it. A deletion works only because it repeats the library order and every analysis from cold. If something else looks like a stale cache, find its cause before you delete anything.

Two messages look like a skipped step, but usually show a defect:

- A `NoSuchMethodError` on a method of your own program, often with a mangled name such as `\=tag?1??Arrow...`, is a defect of the compiled path. Record it (`tests-writing.md`).
- "Unable to read serialized data for X, recommend you delete the Fortress bytecode cache and relink" is usually a defect of the code generator. Search the gap ledger for the message. Run the library order only if X is a member of a `Compiler*` or `AnyType` component. Keep the caches, whatever the message advises.

Two more facts help you read a run:

- A `fortress compile` of a source that did not change, and whose jar exists, writes nothing and exits 0.
- A library compile that failed or was killed wrote nothing, or only its jar. Programs link the old jar with no warning until you fix the error and compile that component again.
