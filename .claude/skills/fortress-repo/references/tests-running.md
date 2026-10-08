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

- Neither suite compiles. On a stale build, a suite tests the previous code and gives no warning.
- Each JVM gets 768 MB, a 32 MB stack and `FORTRESS_THREADS=1`, whatever the shell exports.
- Each suite deletes `ProjectFortress/test-caches` when it starts, and each JVM keeps its caches in a folder under it. Temporary files go to `ProjectFortress/test-tmp/`.
- The results are in `ProjectFortress/TEST-RESULTS/fast-<track>/` and `system-<i>/`, as `TEST-<class>.txt`.

To run a suite:

- After you edit Java, Scala or a parser grammar (`parser/*.rats`), run `ant compileAll` in the same tree before you run a suite. Otherwise the suite tests the code from before your edit.
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
- Warning: both of these targets run `ant compileAll` first, which deletes the tree's caches.
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
- any behaviour above one thread, except the gate's atomic runs.

If your edit is in one of these, your own tests are its only check. Say so in your report.

## One test, or a few

Each way below, except `ant testOnly`, ends with the verdict of JUnit's text runner: `OK (n tests)`, or `FAILURES!!!` with the counts. Read the verdict there. The exit code is 0 whatever the verdict.

### Interpreter tests

Run interpreter tests (`ProjectFortress/tests/`) from the tree's root, after you set up the call:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/h1 \
        ProjectFortress/tests/X.fss [ProjectFortress/tests/X.test] [more files ...]

- It runs `SystemJUTest` with testSystem's JVM settings, on a folder that holds only the files that you name. It uses an empty private cache.
- It runs the classes in `ProjectFortress/build/`. If your tree has none, build it first (`worktrees.md` for a new worktree).
- Give it an absolute scratch directory that holds nothing else. The script deletes the directory when it starts and when it ends. A relative path fails with "tests does not exist", because the script changes to `ProjectFortress/` first.
- If a test has an `X.test` file (its keys for a refusal at load), name it beside its `X.fss`.
- It takes 15 to 25 s, mostly to analyse the library. Name several files in one call to run them in one JVM.
- It shows the output of passing tests too, and removes the Java stack frames.

To see the whole diagnostic, with its stack frames, run the program directly:

    cd ProjectFortress && ../bin/fortress tests/X.fss

The direct run and the harness use different heaps (`interpreter.md`, "Running a program").

### Compiled tests

Compiled tests are the `.test` files in `compiler_tests/`, `library_tests/` and `other_compiler_tests/`. They read the tree's `default_repository/caches`, so run the library order first (`build-and-caches.md`).

The script is `explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh`. `climb-batch-N` is the folder's real name, not a placeholder. Run your own tree's copy: it runs the tree that it is in.

Warning: the script runs `source` on its tree's env.sh, so each run deletes `/tmp/fortress*rats`. A live run that imports a DSL grammar and keeps its parser directory in `/tmp`, another agent's or yours, may then fail. If such a run may be live, use `fortress junit` (below) in place of the script.

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh <label> \
        ProjectFortress/compiler_tests X.test Y.test > <tree>/tmp/junit-<label>.txt 2>&1

- `<label>` is any word. It marks the run's lines in the output. The script writes to standard output only, so redirect it to your `tmp/`.
- With `ONE_JVM=1`, the whole list runs in one `fortress junit` run, in one JVM. The compile and link tests run before the run tests, as in the suite. Without `ONE_JVM=1`, each file gets its own JVM.
- It removes the named components' entries from the tree's `default_repository/caches` before and after the run.
- It removes the Java stack frames, and cuts each line at 240 characters.
- Its JVMs take env.sh's `JAVA_FLAGS`, so they keep their parser directories in `/tmp`.

To run the same list in one JVM without the script, and without its removal of cache entries:

    cd ProjectFortress && ../bin/fortress junit compiler_tests/X.test compiler_tests/Y.test

Run all the new files of one test folder together, in one JVM, as the suite does. A test that passes alone can fail beside others.

## One unit-test class, or one track

To run one unit-test class: `ant testOnly -DtestPattern=BitsJUTest`. It takes about 90 s, mostly for ant to scan `build/`. It uses the tree's own caches and the shell's `FORTRESS_THREADS`.

Warning: `ant testCompiler`, `ant testLibrary` and `ant testOtherCompiler` also exist, but each runs `ant compileAll` first, which deletes the tree's caches.

To run one track of testFast whole, run its class (`CompilerJUTest`, `LibraryJUTest` or `OtherCompilerJUTest`) as the `fastTrack` macro of `build.xml` does: in its own JVM, with a private cache. The compiler track takes about 7 minutes. For another track, replace `CompilerJUTest` and `track-compiler` below. Read the verdict in `$S/out.txt`:

    S=<tree>/tmp/track-compiler ; rm -rf $S ; mkdir -p $S/caches $S/tmp ; printf '\0\0\0\0' > $S/caches/global.map
    CP=$(bin/fortress_classpath | tail -1)
    cd ProjectFortress && FORTRESS_THREADS=1 FORTRESS_CACHES=$S/caches \
      java -Xmx768m -Xss32m -Djava.io.tmpdir=$S/tmp -Dfortress.caches=$S/caches -Dfortress.junit.reset=false \
           -Dfile.encoding=UTF-8 -cp "$CP" com.sun.fortress.tests.unit_tests.CompilerJUTest > $S/out.txt 2>&1
