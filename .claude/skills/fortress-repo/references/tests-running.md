# Running tests

**track**
: One of the four JVMs of `ant testFast`. Each track has its own caches folder, so that the four JVMs do not overwrite each other's compiled files.

**shard**
: One of the four JVMs of `ant testSystem`. Shard i of n takes every n-th file of the sorted list, from index i.

**code state**
: Code at one commit. Only a commit that changes code makes a new code state.

## The two suites

`ant testFast` runs about 1,800 tests in four tracks at once, in about 9 to 11 minutes:

- compiler: `CompilerJUTest` over `ProjectFortress/compiler_tests/` and `parser_tests/`.
- library: `LibraryJUTest` over `library_tests/`.
- othercompiler: `OtherCompilerJUTest` over `other_compiler_tests/`. It is the longest track, so it sets the total time.
- misc: the unit `*JUTest` classes.

`ant testSystem` runs `SystemJUTest` over `ProjectFortress/tests/`, the interpreter's test folder. It runs about 500 tests in four shards, in about 3 to 4 minutes.

The newest gate summary has the exact counts and times of the last landed run:

    git log -1 --name-only --format= -- 'explorations/compile-ladder/climb-batch-*/gate/summary.txt'

The two suites work in the same way:

- Each suite runs `ant compileAll` first, about 4 s if nothing changed, so it never tests stale classes. Each analyses or compiles the Fortress code that it tests, in private caches.
- Each JVM gets 768 MB, a 32 MB stack and `FORTRESS_THREADS=4`, whatever the shell exports. The run steps of the compiled tests get `JAVA_FLAGS=-Xmx4g -Xss64m`, also whatever the shell exports.
- Each suite deletes `ProjectFortress/test-caches` when it starts, and each JVM keeps its caches in a folder under it. Temporary files go to `ProjectFortress/test-tmp/`.
- The results are in `ProjectFortress/TEST-RESULTS/fast-<track>/` and `system-<i>/`, as `TEST-<class>.txt`.

To run a suite:

- Run one suite at a time in a tree, because each suite deletes the `test-caches` that the other uses.
- Read the verdict in the last line: `BUILD SUCCESSFUL` means zero failures, and `BUILD FAILED` means at least one.
- To compare test counts, compare the sum of the four shards. A file added to `tests/` moves every later file to another shard.
- If a suite's count fell, a `.test` file or a `tests=` line almost always went missing.

## The switches that the harness reads

Put a `-D` switch on the `java` line of a run by hand (below). On the `ant` line, it does not reach the suites' JVMs.

- `-Dtests=<dir>`: the folder that `SystemJUTest` runs, in place of `tests/`.
- `-Dfortress.suite.shard=i/n`: run shard i of n only.
- `-Dfortress.unittests.count=N`: run N files at most.
- `-Dfortress.unittests.seed=<value>`: the order of the files. Each run prints its seed as `FORTRESS_UNITTESTS_SEED=...`.
- `FORTRESS_JUNIT_VERBOSE=1` for `SystemJUTest`, `-Dfortress.junit.verbose=true` for the compiled classes: show the output of passing tests too.
- `-Dfortress.junit.reset=false`: `CompilerJUTest` and `LibraryJUTest` keep their caches folder. Without it, they empty it when they start.

## Outside the gate

- `ant testSpecData` runs the specification's extracted examples (`SpecData/examples/basic`, `preliminaries`, `advanced`) under walk. Five of its examples fail today: reductions written without their element type.
- `ant testNotPassing` runs the interpreter programs of `ProjectFortress/not_passing_yet/`, which are expected to fail. It fails if one of them passes.
- Nothing runs these folders: `not_working_compiler_tests/`, `not_working_library_tests/`, `not_working_static_tests/`, `obsolete_interpreter_tests/`, `long_term_not_working/`, `linker_tests/`, `compiler_regressions/`. Put every new test in a gated test folder. A test of a defect that fails today is an `XXX` test there (`tests-writing.md`).

## When to run a whole suite

- The gate runs every suite once, on the tree that lands (`gate.md`). Your brief says whether you run the gate.
- If your edit changes the Java or Scala of the checker or of walk, you may run whole the tests that it reaches. Run them at most once for each code state: after your last edit of code, on the commit that holds it.
  - For the checker, run the compiler and library tracks (below).
  - For walk, run `ant testSystem`. It is the same as its four shards run by hand.
- Quote the verdict lines, the command and that commit in your report.
- If the gate later runs on a tree that holds other changes too, that tree is another code state. Your run and the gate's run do not repeat each other.
- After a code-generator edit, run your own tests, and the four-thread atomic runs if `compiler.md` asks for them. Leave the whole tracks to the gate.
- After every other change, run only your own tests, through the scripts below. Leave the rest to the gate. This includes an edit of the library. A change of tests, prose or records only needs no whole suite.

The suites do not check these:

- the bytecode optimizer, which nothing in the compiler calls;
- syntax abstraction: no gated test declares a DSL grammar (`build-and-caches.md`);
- the linker's aliasing of apis;
- `fortress unparse`;
- the round trip of the `.tfi` and `.tfs` caches;
- a behaviour above one thread that one run of each suite at four threads does not hit.

If your edit is in one of these, your own tests are its only check. Say so in your report.

## One test, or a few

Each way below, except `ant testOnly`, ends with the verdict of JUnit's text runner: `OK (n tests)`, or `FAILURES!!!` with the counts. Read the verdict there. The exit code is 0 whatever the verdict.

### Interpreter tests

Run interpreter tests (`ProjectFortress/tests/`) from the tree's root, after you set up the call:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/h1 \
        ProjectFortress/tests/X.fss [ProjectFortress/tests/X.test] [more files ...]

- It runs `SystemJUTest` with testSystem's JVM settings, at `FORTRESS_THREADS=4`, on a folder that holds only the files that you name.
- It keeps its cache in the folder `<scratch-dir>.cache`. It starts from that cache while the build and the library sources are those that filled it. Otherwise, or with `COLD_CACHE=1`, it starts empty. Its first line says `cache filled` or `cache empty`.
- It runs the classes in `ProjectFortress/build/` and builds nothing. After you edit Java, Scala or a parser grammar, run `ant compileAll` first. If your tree has no build, build it first (`worktrees.md` for a new worktree).
- Give it a scratch directory that holds nothing else. The script deletes the directory when it starts and when it ends.
- If a test has an `X.test` file (its keys for a refusal at load), name it beside its `X.fss`.
- It takes 15 to 25 s with an empty cache, mostly to analyse the library, and about 4 s with a filled one. Name several files in one call to run them in one JVM.
- It shows the output of passing tests too, and removes the Java stack frames.

To see the whole diagnostic, with its stack frames, run the program directly:

    cd ProjectFortress && ../bin/fortress tests/X.fss

The direct run and the harness use different heaps (`interpreter.md`, "Running a program").

### Compiled tests

Compiled tests are the `.test` files in `compiler_tests/`, `library_tests/` and `other_compiler_tests/`. They link with the library's jars in the tree's `default_repository/caches`. If a build started the caches again, or the tree's caches are empty, run the library order first (`build-and-caches.md`).

The script is `explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh`. `climb-batch-N` is the folder's real name, not a placeholder. Run your own tree's copy: it runs the tree that it is in.

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh <label> \
        ProjectFortress/compiler_tests X.test Y.test > <tree>/tmp/junit-<label>.txt 2>&1

- `<label>` is any word. It marks the run's lines in the output. The script writes to standard output only, so redirect it to your `tmp/`.
- With `ONE_JVM=1`, the whole list runs in one `fortress junit` run, in one JVM. The compile and link tests run before the run tests, as in the suite. Without `ONE_JVM=1`, each file gets its own JVM.
- It removes the named components' entries from the tree's `default_repository/caches` before and after the run.
- It removes the Java stack frames, and cuts each line at 240 characters.
- Its JVMs keep their temporary files in the tree's `tmp/`, and run at `FORTRESS_THREADS=4`.

To run the same list in one JVM without the script, and without its removal of cache entries:

    cd ProjectFortress && ../bin/fortress junit compiler_tests/X.test compiler_tests/Y.test

Run all the new files of one test folder together, in one JVM, as the suite does. A test that passes alone can fail beside others.

## One unit-test class, or one track

To run one unit-test class: `ant testOnly -DtestPattern=BitsJUTest`. It builds first, about 4 s if nothing changed. It uses the tree's own caches and the shell's `FORTRESS_THREADS`.

To run tracks of testFast whole, run their target. Each target builds first, then runs its tracks as testFast does, with the same JVMs and private caches:

- `ant testCompiler`: the compiler and othercompiler tracks. The compiler track takes about 9 minutes.
- `ant testOtherCompiler`: the othercompiler track.
- `ant testLibrary`: the library track.
- `ant testQuick`: the three tracks.
