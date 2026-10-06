# Running tests

## The two suites

- `ant testFast` runs four tracks in parallel. Each track is a forked JVM with its own caches. It takes about 9 to 11 minutes and runs about 1,800 tests.
  - compiler: `CompilerJUTest` over `ProjectFortress/compiler_tests/` and `parser_tests/`.
  - library: `LibraryJUTest` over `library_tests/`.
  - othercompiler: `OtherCompilerJUTest` over `other_compiler_tests/`. It is the longest track, so it sets the total time.
  - misc: the unit `*JUTest` classes.
- `ant testSystem` runs `SystemJUTest` over `ProjectFortress/tests/`, the interpreter's test folder, in four shards. It takes about 3 to 4 minutes and runs about 500 tests.

The newest gate summary has the exact counts and times of the last landed run:

    git log -1 --name-only --format= -- 'explorations/compile-ladder/climb-batch-*/gate/summary.txt'

- Neither suite compiles. Before a suite, run `ant compileAll` on the code that you mean to test. On a stale build, a suite tests the previous code and gives no warning.
- Do not run both suites at once: both delete and reuse `ProjectFortress/test-caches`.
- The results are in `ProjectFortress/TEST-RESULTS/<track>/TEST-<class>.txt`.
- `BUILD SUCCESSFUL` means zero failures. "Tests expected to pass are failing!" gives the same verdict, so do not grep for it.
- Both suites set `FORTRESS_THREADS=1` inside `build.xml`, whatever the shell exports, and give each JVM 768 MB. They keep their temporary files in `ProjectFortress/test-tmp/`.
- The shards split one sorted list by index. A file added to `tests/` moves every later test to another shard. So compare only the sum of the four shards. If a suite's count fell, a `.test` file or a `tests=` line almost always went missing.

## Outside the gate

- `ant testSpecData` runs the specification's extracted examples (`SpecData/examples/basic`, `preliminaries`, `advanced`) under walk. It is not in the gate. Five of its examples fail today: reductions written without their element type.
- `ant testNotPassing` runs the interpreter programs of `ProjectFortress/not_passing_yet/`, which are expected to fail. It fails if one of them passes.
- Warning: both of these targets run `ant compileAll` first, which deletes the tree's caches.
- Nothing runs these folders: `not_working_compiler_tests/`, `not_working_library_tests/`, `not_working_static_tests/`, `obsolete_interpreter_tests/`, `long_term_not_working/`, `linker_tests/`, `compiler_regressions/`. Do not put a new test in one of them. A defect that fails today gets an `XXX` test in a gated test folder (`tests-writing.md`).

## One test, or a few

### Interpreter tests

Run interpreter tests (`ProjectFortress/tests/`) from the tree's root, after you set up the call:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/h1 \
        ProjectFortress/tests/X.fss [ProjectFortress/tests/X.test] [more files ...]

- It runs `SystemJUTest`, the class that the shards run, with testSystem's JVM settings. It uses an empty private cache, and a directory that holds only the files that you name.
- If a test has an `X.test` file (its keys for a refusal at load), name it beside its `X.fss`.
- It takes 15 to 25 s, mostly to analyse the library. Name several files in one call to run them in one JVM.

To see the real diagnostic that the harness hides, run the program directly:

    cd ProjectFortress && ../bin/fortress tests/X.fss

The direct run and the harness use different heaps (`interpreter.md`, "Running a program").

### Compiled tests

Compiled tests are the `.test` files in `compiler_tests/`, `library_tests/` and `other_compiler_tests/`. They read the tree's `default_repository/caches`, so run the library order first (`build-and-caches.md`).

The script is `explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh`. `climb-batch-N` is the folder's real name, not a placeholder.

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh <label> \
        ProjectFortress/compiler_tests X.test Y.test > <tree>/tmp/junit-<label>.txt 2>&1

- `<label>` is any word. It marks the run's lines in the output. The script writes to standard output only, so redirect it to your `tmp/`.
- With `ONE_JVM=1`, the whole list runs in one `fortress junit` run, in one JVM. The compile and link tests run before the run tests, as in the suite. Without `ONE_JVM=1`, each file gets its own JVM.
- It removes the named components' entries from the tree's `default_repository/caches` before and after the run.
- It runs the tree that it is in. Run your own tree's copy.
- Warning: it runs `source` on its tree's env.sh. So each run deletes `/tmp/fortress*rats`, and its JVMs take env.sh's `JAVA_FLAGS` and keep their parser directories in `/tmp` (`build-and-caches.md`, "Setting up each call").

If another run may be live, run the same list in one JVM without the script. This skips the script's cache clean-up:

    cd ProjectFortress && ../bin/fortress junit compiler_tests/X.test compiler_tests/Y.test

`fortress junit` exits 0 whatever the verdict. Read the last lines: `OK (n tests)`, or `FAILURES!!!` with the counts.

Run all the new files of one test folder together, in one JVM, as the suite does. A test that passes alone can fail beside others.

### One unit-test class, or one track

To run one unit-test class: `ant testOnly -DtestPattern=BitsJUTest`. It takes about 90 s, mostly for ant to scan `build/`. It uses the tree's own caches and the shell's `FORTRESS_THREADS`.

To run one track of testFast whole (`CompilerJUTest`, `LibraryJUTest` or `OtherCompilerJUTest`), use its own JVM and a private cache, as the `fastTrack` macro of `build.xml` does. The compiler track takes about 7 minutes. Read its verdict in the last lines of `$S/out.txt`, as for `fortress junit`:

    S=<tree>/tmp/track-compiler ; rm -rf $S ; mkdir -p $S/caches $S/tmp ; printf '\0\0\0\0' > $S/caches/global.map
    CP=$(bin/fortress_classpath | tail -1)
    cd ProjectFortress && FORTRESS_THREADS=1 FORTRESS_CACHES=$S/caches \
      java -Xmx768m -Xss32m -Djava.io.tmpdir=$S/tmp -Dfortress.caches=$S/caches -Dfile.encoding=UTF-8 \
           -cp "$CP" com.sun.fortress.tests.unit_tests.CompilerJUTest > $S/out.txt 2>&1

Warning: `ant testCompiler`, `ant testLibrary` and `ant testOtherCompiler` also exist, but each runs `ant compileAll` first, which deletes the tree's caches.

The harness reads these switches:

- `-Dtests=<dir>`: SystemJUTest's directory.
- `-Dfortress.suite.shard=i/n`, `-Dfortress.unittests.count=N`.
- `-Dfortress.unittests.seed=<value>`. Each run prints its seed as `FORTRESS_UNITTESTS_SEED=...`.
- `FORTRESS_JUNIT_VERBOSE=1` or `-Dfortress.junit.verbose=true`: show the output of passing tests too.

## When to run a whole suite

- The gate runs every suite once, on the tree that lands (`gate.md`). Your brief says whether you run the gate.
- If your edit changes the Java or Scala of the checker or of walk, you may run the suite that your edit reaches, whole, once for each code state, after your last edit:
  - for the checker, the compiler and library tracks;
  - for walk, `testSystem`.
- A code state is a commit. Only a commit that changes code starts a new code state.
- Quote the verdict lines, the command and the commit in your report.
- If the gate later runs on a tree that holds other changes too, that tree is another code state. Your run and the gate's run do not repeat each other.
- The rule names the checker and walk only. After a code-generator edit, run its own tests, and the four-thread atomic runs if the edit is near transactions (`compiler.md`). Leave its whole tracks to the gate.
- After every other change, run only its own tests, through the scripts above. Leave the rest to the gate. A change of tests, prose or records only needs no whole suite.
