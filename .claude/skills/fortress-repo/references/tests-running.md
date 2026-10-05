# Running tests

## The two suites

- `ant testFast`: four tracks in parallel, each a forked JVM with its own caches. compiler: `CompilerJUTest` over `ProjectFortress/compiler_tests/` and `parser_tests/`. library: `LibraryJUTest` over `library_tests/`. othercompiler: `OtherCompilerJUTest` over `other_compiler_tests/`, the longest track, which sets the wall clock. misc: the unit `*JUTest` classes. About 9 to 11 minutes, about 1,800 tests.
- `ant testSystem`: `SystemJUTest` over `ProjectFortress/tests/`, the interpreter's corpus, in four shards. About 3 to 4 minutes, about 500 tests.
- The exact counts and times of the last landed run are in the newest gate summary:

      git log -1 --name-only --format= -- 'explorations/compile-ladder/climb-batch-*/gate/summary.txt'

- Run them after `ant compileAll` on the code you mean: neither compiles. Never run both at once, since both delete and reuse `ProjectFortress/test-caches`. Results land in `ProjectFortress/TEST-RESULTS/<track>/TEST-<class>.txt`.
- `BUILD SUCCESSFUL` means zero failures. "Tests expected to pass are failing!" is the same verdict, so do not grep for it separately.
- Both pin `FORTRESS_THREADS=1` inside `build.xml`, whatever the calling shell exports, and give each JVM 768 MB.
- The shards split one sorted list by index, so a file added to `tests/` moves every later test to another shard: compare only the sum of the four. A suite whose count fell almost always means a `.test` file or a `tests=` line went missing.
- Start them in the background and poll, never through `tail` (the `claude-session` skill, long commands).

## Outside the gate

- `ant testSpecData` runs the specification's extracted examples (`SpecData/examples/basic`, `preliminaries`, `advanced`) under walk. It is not in the gate yet: it joins it once its five red examples, reductions written without their element type, pass.
- `ant testNotPassing` runs the interpreter programs of `ProjectFortress/not_passing_yet/`, expected to fail, and fails when one passes.
- Run by nothing: `not_working_compiler_tests/`, `not_working_library_tests/`, `not_working_static_tests/`, `obsolete_interpreter_tests/`, `long_term_not_working/`, `linker_tests/`, `compiler_regressions/`. A new test never goes into a parked folder: a defect that fails today is an `XXX` test in a gated corpus (`tests-writing.md`).

## One test, or a few

Interpreter tests (`ProjectFortress/tests/`), from the tree's root with `env.sh` sourced:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/h1 \
        ProjectFortress/tests/X.fss [ProjectFortress/tests/X.test] [more files ...]

It runs `SystemJUTest`, the class the shards run, with testSystem's JVM settings and an empty private cache, over a directory holding only the files you name. Name a test's `X.test` (its keys for a refusal at load) beside its `X.fss`. 15 to 25 s, most of it analysing the library. Several files go in one call, one JVM.

For the real diagnostic the harness hides:

    cd ProjectFortress && ../bin/fortress tests/X.fss

`bin/fortress` gives its JVM 256 MB unless `JAVA_FLAGS` is set (`env.sh` sets 4 GB; the harness uses 768 MB), and a test can pass at two of these heaps and die at the third.

Compiled tests (`.test` files in `compiler_tests/`, `library_tests/`, `other_compiler_tests/`), after the library order (`build-and-caches.md`):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh <label> \
        ProjectFortress/compiler_tests X.test Y.test

It runs `fortress junit` once over the list, compile and link tests before run tests, and removes the named components' cache entries before and after. It sources the `env.sh` of the tree it sits in, so run your own tree's copy. Without `ONE_JVM=1` each file gets its own JVM. By hand, one file:

    cd ProjectFortress && ../bin/fortress junit compiler_tests/X.test

Run all the new files of one corpus together, in one JVM, as the suite does: a test that passes alone can fail beside others.

One unit-test class: `ant testOnly -DtestPattern=BitsJUTest`, about 90 s, most of it ant scanning `build/`. It uses the tree's own caches and the shell's `FORTRESS_THREADS`.

One track of testFast, whole (`CompilerJUTest`, `LibraryJUTest` or `OtherCompilerJUTest`), in its own JVM with a private cache, as `harness-one.sh` runs `SystemJUTest` and the `fastTrack` macro of `build.xml` runs the tracks; about 7 minutes for the compiler track:

    S=<tree>/tmp/track-compiler ; rm -rf $S ; mkdir -p $S/caches $S/tmp ; printf '\0\0\0\0' > $S/caches/global.map
    CP=$(bin/fortress_classpath | tail -1)
    cd ProjectFortress && FORTRESS_THREADS=1 FORTRESS_CACHES=$S/caches \
      java -Xmx768m -Xss32m -Djava.io.tmpdir=$S/tmp -Dfortress.caches=$S/caches -Dfile.encoding=UTF-8 \
           -cp "$CP" com.sun.fortress.tests.unit_tests.CompilerJUTest > $S/out.txt 2>&1

The verdict is the last lines: `OK (n tests)`, or `FAILURES!!!` with the counts. `ant testCompiler`, `ant testLibrary` and `ant testOtherCompiler` exist too, but each first runs `ant compileAll`, which deletes the tree's caches.

Switches the harness reads: `-Dtests=<dir>` (SystemJUTest's directory), `-Dfortress.suite.shard=i/n`, `-Dfortress.unittests.count=N`, `-Dfortress.unittests.seed=<value>` (each run prints its seed as `FORTRESS_UNITTESTS_SEED=...`), and `FORTRESS_JUNIT_VERBOSE=1` or `-Dfortress.junit.verbose=true` to see the output of passing tests.

## When a whole suite runs

- The gate (`gate.md`) runs everything once, on a clean build of the tree that lands on `main`.
- An edit to the checker's or walk's Java or Scala may run the suite it reaches, whole, once per code state, after its last edit: the compiler and library tracks for the checker, `testSystem` for walk. Quote the verdict lines, the command and the commit. Nobody runs it again on that commit.
- Every other change runs only its own tests, through the scripts above, and leaves the rest to the gate. A change of tests, prose or records alone runs no whole suite.
- A tree already gated is gated again only when code it reads changed (`gate.md`).
