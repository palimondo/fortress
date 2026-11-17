# Rung S of climb batch 33: the library selector

problem: the compiled path reads only the compiler's prelude, so a wall that only the one library shows has no test under the gate; probe Y's selector met them in scratch only: `explorations/compile-ladder/plan-33/PROBES.md:69-82`
spec: none: `grep -rln 'FORTRESS_LIBRARY\|fortress\.library\|caches-one' Specification Documentation` prints nothing, and no sentence names a selector or a caches folder: none
precedent: probe Y's hunks of `Shell.useCompilerLibraries()`, `WellKnownNames.compiledPathUsesOneLibrary` and `bin/fortress_classpath` (`explorations/compile-ladder/plan-31/probes/probe-y.patch:561-582`, `:670-688`, `:1160-1182`); the stamp's form for `cache0` and `cache1` and the testFast track's form (`fastTrack`, `testLibrary`, `LibraryJUTest`): `ProjectFortress/src/com/sun/fortress/tests/unit_tests/LibraryJUTest.java:28-42`
deviation: the selection is read once in `ProjectProperties`, and `WellKnownNames` takes it from there, not read in `WellKnownNames` as probe Y and the brief place it: `ProjectFortress/src/com/sun/fortress/repository/ProjectProperties.java:290`
deviation: `useCompilerLibraries()` sets no `ByteCodeWriter.keepFirstCopyOfAClass`, probe Y's hack 7, which this rung does not own: `ProjectFortress/src/com/sun/fortress/Shell.java:377`
deviation: the selection's caches folder is `${REPOSITORY}/caches-one` unless a property or the environment names one, whatever the configuration's `fortress.caches` line says; probe Y named it by hand: `ProjectFortress/src/com/sun/fortress/repository/ProjectProperties.java:299`
deviation: every testFast track pins `FORTRESS_LIBRARY`, empty for the prelude's four, as it pins `FORTRESS_THREADS`: `build.xml:1223`
deviation: `.gitignore` ignores the new folder, a file the brief does not name: `.gitignore:29`
historical: `ProjectFortress/src/com/sun/fortress/Shell.java`, `ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java`, `ProjectFortress/src/com/sun/fortress/repository/ProjectProperties.java`, `bin/fortress_classpath`, `bin/run_classpath` and `build.xml`, each in `a874948ac`: `git cat-file -e a874948ac:PATH` exits 0 for each of the six

One launch worked this rung. Commit `21e155ea9e` holds the code and the tests; every run below that is not marked "base" ran on it. The worktree was seeded by `seed-worktree.sh` (exit 0).

## What changed and why

**The selector** (fork S1). `ProjectProperties.compiledPathUsesOneLibrary` (`ProjectFortress/src/com/sun/fortress/repository/ProjectProperties.java:283-291`) is true where the property `fortress.library`, or else the environment variable `FORTRESS_LIBRARY`, is `one`, read once when the class loads, as probe Y read it (`probe-y.patch:683-684`). Any other value, or none, is the prelude. `WellKnownNames.compiledPathUsesOneLibrary` (`ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java:143-150`) gives it to the compiler. `Shell.useCompilerLibraries()` (`ProjectFortress/src/com/sun/fortress/Shell.java:373-388`) points `WellKnownNames` and `Types` at `FortressLibrary`, `FortressBuiltin` and `AnyType` where it is set, and at the prelude's names where not; the desugaring switches stay the compile command's. Nothing of the code generator follows it (`NamingCzar`, `CodeGen`, `runtimeValues/` unchanged).

The commands that follow it are those that call `useCompilerLibraries()` (`Shell.java:414-502`): `compile`, `link`, `build`, `api`, `compare`, `parse`, `unparse`, `disambiguate`, `desugar`, `grammar`, `typecheck`, `test-coercion`, `help` and the usage message, and `junit`, whose compiles and links go through `subMain`. `fortress run` follows it through the class path script's caches folder only (below). Walk, `test` and `typecheck-old` keep reading the interpreter's library; under the selection they keep their caches in the selection's folder too, since `ProjectProperties.CACHES` is one value for the JVM:

    FORTRESS_LIBRARY=one bin/fortress tests/BooleanOps.fss          (from ProjectFortress/)
    rc=0
    ls ../default_repository/caches-one/interpreter_cache | grep -c BooleanOps
    1

**The caches folder** (fork S2). `ProjectProperties.CACHES` (`ProjectProperties.java:293-302`) is the folder that the property `fortress.caches` or `FORTRESS_CACHES` names; else, under the selection, `${REPOSITORY}/caches-one`; else, as before, the configuration's `${FORTRESS_REPOSITORY}/caches`. `bin/fortress_classpath:25-31` and `bin/run_classpath:25-31` take the same default from `FORTRESS_LIBRARY`. `build.xml` gives the folder the stamp of `cache0` and `cache1`: the property `cacheOne` (`build.xml:44-47`), `cleanCache` (`:367`, `:376`), `checkCaches` (`:531-534`, `:553-558`, `:565`) and the end of `compileAll` (`:863`). `.gitignore:28-29` ignores the folder; without it every build would leave an untracked folder, and a base build whose `git status --porcelain` prints a line cannot seed a worktree (`.claude/skills/fortress-repo/references/worktrees.md`, "Finding or building a base build").

    bin/fortress expand CACHES                                   /home/user/fortress-library-selector/default_repository/caches
    FORTRESS_LIBRARY=one bin/fortress expand CACHES              /home/user/fortress-library-selector/default_repository/caches-one
    JAVA_FLAGS="... -Dfortress.library=one" bin/fortress expand CACHES   .../default_repository/caches-one
    FORTRESS_LIBRARY=one FORTRESS_CACHES=/tmp/x bin/fortress expand CACHES   /tmp/x
    FORTRESS_LIBRARY=One bin/fortress expand CACHES              .../default_repository/caches

The stamp, on the edit's first build, an unchanged build, and `ant cleanCache`:

    ant compileAll          [echo] Caches .../default_repository/caches started again, empty
                            [echo] Caches .../default_repository/caches-one started again, empty
    ant compileAll          [echo] Caches .../default_repository/caches kept
    (unchanged)             [echo] Caches .../default_repository/caches-one kept
    ant cleanCache          [delete] Deleting directory .../default_repository/caches-one
                            [echo] Caches .../default_repository/caches-one started again, empty

After `cleanCache`, `default_repository/caches-one/implementation.stamp` equals `ProjectFortress/build/implementation.stamp` (`diff` printed nothing).

**The track** (fork S4). `ProjectFortress/one_library_tests/` holds the track's `.test` files. `OneLibraryJUTest` (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/OneLibraryJUTest.java`) runs them as `LibraryJUTest` runs `library_tests`; without the selection it is one failing test that names it:

    java ... junit.textui.TestRunner com.sun.fortress.tests.unit_tests.OneLibraryJUTest      (no FORTRESS_LIBRARY)
    1) oneLibrarySelected(...OneLibraryJUTest$1)junit.framework.AssertionFailedError: one_library_tests runs only where FORTRESS_LIBRARY=one selects the one library, as ant testOneLibrary does
    Tests run: 1,  Failures: 1,  Errors: 0

`fastTrack` takes a `library` attribute, empty by default, and sets `FORTRESS_LIBRARY` to it (`build.xml:1201-1207`, `:1223`); `ant testOneLibrary` (`build.xml:1146-1156`) runs the track alone with `library="one"` and private caches `ProjectFortress/test-caches/fast-onelibrary`, and `testFast` runs it as a fifth track in its parallel of four threads, so it starts when one of the four ends (`build.xml:1275-1280`); the misc track leaves the class out (`build.xml:1262`). The compile steps run in the JUnit JVM, which reads the variable; the run step is a `bin/fortress run` process that inherits it with `FORTRESS_CACHES` (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:542-566`). The gate's summary takes the track as a new row, `fast-onelibrary/OneLibraryJUTest`, since `gate_summary` reads every `fast-*` folder (`explorations/coordinator/tools/gate-functions.sh:33`), and `gate_compare` prints nothing for a suite the last summary lacks (`gate-functions.sh:46-58`).

The track's first tests:

- `OneLibraryHalf.fss` and `.test`: probe Y's `Half.fss`, `q: QQ = 1/2` and `println(q)`, with `println("REACHED")` first; it compiles.
- `OneLibraryPrintBig.fss` and `.test`: `run(): () = println(big(7))`. `big` is declared by the one library on each integer type (`Library/FortressLibrary.fsi:569`) and by no prelude file (row 349); it compiles.
- `XXXOneLibraryRunHalf.test`: `tests=OneLibraryHalf`, `run`, `run_out_does_not_contain=REACHED`. The run dies at the first library class before `run()` prints: the one library has no jars (new row 1062; rows 874, 624 and 315).

## The tests: the failing run on the base, the passing run

The failing run, through the harness, on the base's code under the selection, 17:49:07Z to 17:49:09Z; the edit was first built at 17:52:04Z (the `nohup` of `ant compileAll` in the worker's transcript):

    cd ProjectFortress && FORTRESS_LIBRARY=one explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base37 \
        tmp/rung-library-selector/old-caches junit one_library_tests/OneLibraryHalf.test \
        one_library_tests/OneLibraryPrintBig.test one_library_tests/XXXOneLibraryRunHalf.test
    . compile .../one_library_tests/OneLibraryHalf .../OneLibraryHalf.fss:7:6:
        QQ is undefined.
    F. compile .../one_library_tests/OneLibraryPrintBig .../OneLibraryPrintBig.fss:5:21-22:
        Variable big is not defined.
    Tests run: 3,  Failures: 2,  Errors: 0

The passing run, the last after the last change of code (`21e155ea9e`), the onelibrary track of `ant testFast` (`ProjectFortress/TEST-RESULTS/fast-onelibrary/TEST-com.sun.fortress.tests.unit_tests.OneLibraryJUTest.txt`):

    ant testFast
     compile .../one_library_tests/OneLibraryHalf  OK (time = 57854ms)
     compile .../one_library_tests/OneLibraryPrintBig  OK (time = 84ms)
     run .../one_library_tests/OneLibraryHalf (401ms) Exception in thread "main" java.lang.NoClassDefFoundError: fortress/FortressLibrary$String
    Tests run: 3, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 58.365 sec

`ant testOneLibrary` alone, earlier on the same code: `Tests run: 3, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 28.692 sec`, `BUILD SUCCESSFUL`, `Total time: 35 seconds`.

The XXX test, shown red on a deliberate fix: `OneLibraryHalf.fss`'s body changed for one run to `run(): () = ()`, which needs no library class, then restored (`diff` against the saved copy printed nothing):

    cd ProjectFortress && FORTRESS_LIBRARY=one FORTRESS_CACHES=tmp/rung-library-selector/xxx-caches \
        ../bin/fortress junit one_library_tests/OneLibraryHalf.test one_library_tests/XXXOneLibraryRunHalf.test
    . run one_library_tests/OneLibraryHalf (368ms) Did not see expected failure
    Tests run: 2,  Failures: 1,  Errors: 0

As it is, the same pair reports `Saw expected failure (Exit code != 0)` in both track runs above.

## Where the fix belongs, and the precedent

The place is the one that `explorations/coordinator/map/modules-and-phases.md`, B.13, names: the compiled path's library is chosen by `Shell.useCompilerLibraries()` alone, which repoints `WellKnownNames` and `Types`; the run's library is the jars on the class path that `bin/run_classpath` builds. The selector is probe Y's (F-353; `probe-y.md`, section 2), without the parts the batch gives to later rungs (S3, S5, S6) or that probe Y's section 3 marks as hacks of the code generator (7). The other sites of probe Y's two hunks: `useCompilerLibraries()` is the one place every compiled-path command passes (`Shell.java:414-502`); two flags call `WellKnownNames.useCompilerLibraries()` and `Types.useCompilerLibraries()` directly, `-compiler-lib` of `compilerPhases` and of `walk` (`Shell.java:871-874`, `:1118-1121`); they are an explicit choice of the prelude and stay. `Types.useTypeCheckerLibraries()` has no caller. In `build.xml`, `cache0` and `cache1` each stand at seven places (property, two of `cleanCache`, three of `checkCaches`, one of `compileAll`); `cacheOne` stands at the same seven. The caches folder's other readers in `bin/` are the optimizer's scripts, `bin/runOpt:32` and `bin/BytecodeOptimizeEverything.sh:17`, which the suites call only with `fortress.unittests.noopt` false (`default_repository/configuration`: true; `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:1127-1134`), `bin/BytecodeOptimizeCompilerTests:24-32`, `bin/runOptCollect:32` and `bin/debugOpt:28`, which name `default_repository/caches` by path, and the nine component tools of `bin/comp/` (`fcompile`, `fcomponents`, `fconstrain`, `fextract`, `finfo`, `flink`, `fremove`, `frun`, `fupgrade`, each at `:19`); none follows the selection.

The ways the tree offers, for each choice, are in "Decisions" below.

## What the specification settles

Nothing: the specification names neither a selector nor a caches folder (the grep of the spec line). P-33 and P-37 settle the order and that the prelude stays the default and gains nothing; this rung adds no declaration to any library file.

## Programs run old against new

- The three track tests, under the selection: old above (two refusals), new above (three green).
- Probe Arr (`explorations/compile-ladder/plan-33/probes/programs/Arr.fss`, copied to the scratch), new only, under the selection, for row 1061, whose before is the planner's (PROBES.md, section 6):

      FORTRESS_LIBRARY=one bin/fortress compile Arr.fss
      Exception in thread "main" java.lang.RuntimeException: Not in the trait table: Array1
      Array1 @ .../Library/FortressLibrary.fsi:1750:7-11
      rc=1

- Two ladder files whose phase or text moved against the 2026-09-19 baseline, old only, to place the move (below).

## Wrong pairings, and the run under the selection

No mark in a jar stops a wrong pairing (S3). Measured, from `ProjectFortress/`:

    FORTRESS_LIBRARY=one bin/fortress compile one_library_tests/OneLibraryHalf.fss    rc=0, 26.5 s; writes default_repository/caches-one/bytecode_cache/OneLibraryHalf.jar
    FORTRESS_LIBRARY=one bin/fortress run OneLibraryHalf
      Exception in thread "main" java.lang.NoClassDefFoundError: fortress/FortressLibrary$String
      Caused by: java.io.IOException: Resource not found : fortress/FortressLibrary$String.class      rc=1
    bin/fortress run OneLibraryHalf                       (no selection: the prelude's caches folder)
      Could not load OneLibraryHalf
      Caused by: java.io.IOException: Resource not found : OneLibraryHalf.class                         rc=1
    FORTRESS_LIBRARY=one bin/fortress run Integer1        (a prelude program, its jar in default_repository/caches)
      Could not load Integer1 ... Resource not found : Integer1.class                                   rc=1
    FORTRESS_CACHES=X bin/fortress compile library_tests/Integer1.fss; FORTRESS_LIBRARY=one FORTRESS_CACHES=X bin/fortress run Integer1
      PASS                                                                                              rc=0

So a program run against the other library's caches folder is not found ('Could not load P'); with one caches folder named for both, a prelude program runs under the selection as without it, since the run's class path differs only by the caches folder (no second set of classes, S5); and a one-library program dies at its first library class. The property `fortress.library` steers a JVM; the scripts read only the environment variable, so `-Dfortress.library=one` in `JAVA_FLAGS` gives the compile `caches-one` and the run's class path `caches` (the `expand` lines above): a run then finds no jar. Under the selection the compile of a program writes only its own jar; the one library has none (new row 1062).

## The whole suites

Once each, on `21e155ea9e`, after the last edit, at load 3 to 8 beside another rung's agent:

    ant testFast       BUILD SUCCESSFUL   Total time: 14 minutes 31 seconds
    ant testSystem     BUILD SUCCESSFUL   Total time: 6 minutes 42 seconds

| track | tests | failures | errors | last gate (`climb-batch-31b/gate/summary.txt`) |
|---|---|---|---|---|
| fast-compiler | 1,694 | 0 | 0 | 1,694 |
| fast-library | 86 | 0 | 0 | 86 |
| fast-othercompiler | 263 | 0 | 0 | 263 |
| fast-misc | 471 | 0 | 0 | 471 |
| fast-onelibrary | 3 | 0 | 0 | absent |
| system-0..3 | 871 | 0 | 0 | 871 |

No existing test failed.

## The stages

Both ran once on `21e155ea9e`, after the last edit, with `FORTRESS_LIBRARY` unset; no code changed after either started. Comparand: `explorations/compile-ladder/climb-batch-31b/gate/`.

    explorations/coordinator/tools/checker-count/run.sh tmp/rung-library-selector/checker-count-postedit.txt tmp/rung-library-selector/cc-post
    #total	0
    #locations	0
    #crash	none
    diff explorations/compile-ladder/climb-batch-31b/gate/checker-count.txt tmp/rung-library-selector/checker-count-postedit.txt     (prints nothing)

    explorations/coordinator/tools/distance/run.sh tmp/rung-library-selector/distance-postedit.txt tmp/rung-library-selector/dist-post
    #total	0
    #crash	none
    explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-31b/gate/distance.txt tmp/rung-library-selector/distance-postedit.txt
    DISTANCE SAME   0

The comparison names no site, and the per-site list `explorations/compile-ladder/gate/distance-sites.tsv` holds its header only: no site moved. The distance took 174 s (`#seconds 174 FortressLibrary 114`), the last gate's 150 s, at load 4.25 against 0.31. The edit changes no Scala of the checker, so the checker's timing of `compiler.md` was not taken.

## The ladder subset

The subset is each file whose recorded first error in the baseline's `ladder.tsv` names a prelude component (`CompilerLibrary` or `CompilerBuiltin`), the names that the selector repoints: 20 files, run after the edit only with the drivers copied under `tmp/rung-library-selector/ladder/` and no selection. None is in the newest landed `ladder.tsv` (`climb-batch-31b/gate/ladder/ladder.tsv`, the 85 of the pass list), so each is compared with `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`. 18 keep phase and first error. Two moved, and the base's code moves them the same way, so neither is this change's:

- `tests/XXXtypecaseTest.fss`: run → typecheck, 'The typecase clause, String, is unreachable.' On the old code: `old-fortress.sh /home/user/fortress-base37 ... compile tests/XXXtypecaseTest.fss` prints the same refusal, `rc=255`.
- `tests/XXXGenericOverload2.fss`: link, same error class; its text now names `com|sun|fortress|compiler|runtimeValues|FZZ32` where the baseline named `fortress|CompilerBuiltin%IntLiteral`. On the old code the compile exits 0 and the run dies with the same `Unable to read serialized data for XXXGenericOverload2...`.

## Sentences of the specification made false

None. Three sentences say that the compiled path compiles against its own library until the switch-over: `Specification/appendices/changes.tex:4608-4609`, `:5123-5124`, `:5384-5385`. They stay true: without the selection the compile command reads the prelude as before, and under it a program compiles against the one library but does not run, so the compiled path is not switched over.

Out of the specification, these statements of the record and the skill are now out of date; the gather corrects them:

- F-352, "on `main` the compile command selects the compiler's prelude alone", and F-353, "`main` has no selector and one set of classes" (`explorations/coordinator/FACTS.md:170-171`).
- `.claude/skills/fortress-repo/references/compiler.md`, "The `fortress` commands": "Every other command calls `useCompilerLibraries()`. Each call points `WellKnownNames` and `Types` to its prelude" (now: the one library's names under `FORTRESS_LIBRARY=one`).
- `.claude/skills/fortress-repo/references/build-and-caches.md`, "The caches" and "Building": the runs that read `default_repository/caches`, and the build's stamp over that folder (now also `default_repository/caches-one`).
- `.claude/skills/fortress-repo/references/tests-writing.md`, "Where a test goes, and how it passes": the compiled test folders are `library_tests/`, `parser_tests/`, `compiler_tests/` and `other_compiler_tests/` (now also `one_library_tests/`, the compiled path against the one library, under the selection); and `tests-running.md`, "Compiled tests": "Compiled tests are the `.test` files in `compiler_tests/`, `library_tests/` and `other_compiler_tests/`" (now also `one_library_tests/`, whose files run in one JVM by `FORTRESS_LIBRARY=one FORTRESS_CACHES=<folder> ../bin/fortress junit`, not by `junit.sh`, which cleans `default_repository/caches` by name).
- `.claude/skills/fortress-repo/references/tests-running.md`, "The two suites": `ant testFast` "runs about 2,100 tests in four tracks" (now a fifth, `onelibrary`, started when one of the four ends), and "One unit-test class, or one track" (now also `ant testOneLibrary`).

## Points to report

1. The selector as built: `FORTRESS_LIBRARY=one`, or `-Dfortress.library=one`, read once in `ProjectProperties.java:290-291`, given to the compiler at `WellKnownNames.java:149-150`, followed by `Shell.useCompilerLibraries()` (`Shell.java:377-388`) and so by every compiled-path command listed above, and by the run through the caches folder of `bin/run_classpath:25-31`. A wrong pairing fails at load with 'Could not load P' (the jar is in the other folder) or `NoClassDefFoundError: fortress/FortressLibrary$String` (a one-library program); the measurements are under "Wrong pairings".
2. The caches folder of the selection: `default_repository/caches-one` (`ProjectProperties.java:293-302`), the two scripts (`bin/fortress_classpath:25-31`, `bin/run_classpath:25-31`), the build's stamp and `ant cleanCache` (`build.xml:44-47`, `:367`, `:376`, `:531-534`, `:553-558`, `:565`, `:863`). The scripts that do not take the folder: the optimizer's (`bin/runOpt:32`, `bin/BytecodeOptimizeEverything.sh:17`, `bin/BytecodeOptimizeCompilerTests:24-32`, `bin/runOptCollect:32`, `bin/debugOpt:28`), the nine of `bin/comp/` (each at `:19`), and the tools under `explorations/` (`junit.sh` cleans `default_repository/caches` by name; `seed-worktree.sh` copies only that folder).
3. The track: `ProjectFortress/one_library_tests/`, `ant testOneLibrary` (`build.xml:1146-1156`), the fifth track of `testFast` (`build.xml:1275-1280`), private caches `ProjectFortress/test-caches/fast-onelibrary`, `FORTRESS_LIBRARY=one` pinned by `fastTrack`'s attribute (`build.xml:1207`, `:1223`); the gate reads it as the new suite `fast-onelibrary/OneLibraryJUTest` (`gate-functions.sh:33`). Each test fails on the base and passes after; the run's expected failure is `XXXOneLibraryRunHalf`.
4. Existing tests failing after the change: none (`ant testFast`, `ant testSystem`, the counts above).
5. The two stages' tables on the final tree: the count table equals the last gate's, and the distance is `DISTANCE SAME 0`.
6. Files beyond those named: `.gitignore:28-29`, and the track's JUnit class `ProjectFortress/src/com/sun/fortress/tests/unit_tests/OneLibraryJUTest.java`.

The reserved point, a change of what a compiled-path command does without the selection: none measured. Without the selection `useCompilerLibraries()` runs the same two calls (`Shell.java:385-386`), `CACHES` the same `get` (`ProjectProperties.java:302`), and the scripts the same line; the suites, the count, the distance and the ladder subset are as on the base. Two things change without the selection, neither in a command: every build now stamps or restarts `default_repository/caches-one` and prints one more `Caches` line, and loading `WellKnownNames` now initializes `ProjectProperties` (its repository lookup and its cache folders' creation), which every compiled-path command did anyway.

## Decisions

1. **Where the selection is read: in `ProjectProperties`, with `WellKnownNames.compiledPathUsesOneLibrary` taking it from there.** Ways not taken: the read in `WellKnownNames`, as probe Y and the brief place it, and a small class of its own. The evidence: `ProjectProperties.CACHES` must follow the selection, and an import of `WellKnownNames` into `ProjectProperties` puts the compiler's classes into the closure of `compileCommon`'s javac, which compiles `unicode/OperatorStuffGenerator.java` (`build.xml:995-1015`) before the syntax tree's generation, and which imports `ProjectProperties` (`ProjectFortress/src/com/sun/fortress/unicode/OperatorStuffGenerator.java:14`); `WellKnownNames` imports `nodes.Id`, `ObjectExpr` and `VarDecl` (`WellKnownNames.java:17-19`). A class of its own is a file the brief does not name. Read once either way; the compiler's name for it is probe Y's.
2. **Only `one` selects; any other value, or none, is the prelude**, as probe Y (`probe-y.patch:683-684`). Way not taken: refusing an unknown value, which would put a check in a static initializer. Shown: `FORTRESS_LIBRARY=One` gives `caches`.
3. **The property is read before the environment variable**, as probe Y and as `ProjectProperties`' own search does (system properties, then the environment: `ProjectProperties.java:123-126`); the scripts read only the variable (S1). Way not taken: the scripts parsing `JAVA_FLAGS` for the property. The consequence is under "Wrong pairings".
4. **The caches folder of the selection is `${REPOSITORY}/caches-one` unless a property or the environment names one** (S2, the brief). Ways not taken: the configuration's folder with `-one` added, which would follow an edited `fortress.caches` line but that the scripts, which never read the configuration, could not match; a folder named by hand, as probe Y.
5. **Every build stamps `caches-one` and starts it empty when absent or stale, as `cache0`.** Way not taken: stamping it only where it exists. Without its stamp, a folder that a run made would be deleted by the next build whatever its contents, since `checkCaches` keeps a folder only when its stamp equals the build's (`build.xml:553-558`, `:565`).
6. **The track is a JUnit class of its own, a fifth `fastTrack` in `testFast`'s parallel of four threads.** Ways not taken: a property that points `LibraryJUTest` at another folder (one class, two meanings); `threadcount="5"` (a fifth JVM beside the compiler track, which sets testFast's time); a track outside the gate (S4). The track adds about a minute after the misc track ends.
7. **Every fast track pins `FORTRESS_LIBRARY`, empty for the prelude's**, as `FORTRESS_THREADS` is pinned. Way not taken: inheriting it, where a shell that exports `FORTRESS_LIBRARY=one` would compile the 2,000 tests of the prelude against the one library. `systemShard` is not pinned: walk reads its library by command, and the shard names its caches folder.
8. **Without the selection, `OneLibraryJUTest` is one failing test that names the selection.** Ways not taken: running the folder against the prelude, where each test fails as on the base ('QQ is undefined.'); an empty suite, which `gate_compare` reads as `EMPTY`, red.
9. **The second test names `big`.** Ways not taken: `println()`, whose one-library declaration (`Library/FortressLibrary.fsi:2737`) the prelude has commented out (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:64`), a test whose difference is a call's arity; a type name such as `Char` or `Index`, which needs a binding beside the `println`.
10. **The XXX run test checks `run_out_does_not_contain=REACHED`, the program printing `REACHED` first in `run()`** (`tests-writing.md`, "Writing an XXX test"). Way not taken: `run_err_contains` with today's missing class, which a fix of the first wall alone would turn red.
11. **Row 1061 gets a note, not a test** (the brief: rung R of the next run writes it).

## Defects and their homes

- Row 1062, a program compiled under the selection does not run, since the one library has no jars: home 2, deferred, its answer settled (a program runs, `basic/programs.tex`, "Programs"); the gated `XXX` test `ProjectFortress/one_library_tests/XXXOneLibraryRunHalf.test`, and a new row that names it, since three rows (874, 624, 315) and F-352's second kind of walls stand behind it and none of them names the test.
- Row 1061, reproduced on `main` under the selection (Arr above): its existing row, a note in `record.md`; rung R of the next run writes its test.

## Commands worked out

- The base's harness under the selection: `cd ProjectFortress && FORTRESS_LIBRARY=one <tree>/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base37 <tree>/tmp/<scratch>/old-caches junit <tree>/ProjectFortress/one_library_tests/X.test ...`. The base ignores the variable, so the run shows what the compile command did before the selector.
- The caches folder a JVM takes: `[FORTRESS_LIBRARY=one] bin/fortress expand CACHES` prints `ProjectProperties.CACHES` (`Shell.java`'s `expand`, which reads a field of `ProjectProperties` by name).
- The track alone: `ant testOneLibrary`; its class without the selection, `java $JAVA_FLAGS -cp "$(bin/fortress_classpath | tail -1)" junit.textui.TestRunner com.sun.fortress.tests.unit_tests.OneLibraryJUTest`.
- A few track files in one JVM: `cd ProjectFortress && FORTRESS_LIBRARY=one FORTRESS_CACHES=<private folder> ../bin/fortress junit one_library_tests/X.test ...` (`junit.sh` cleans `default_repository/caches` by name, not the selection's folder).

## Questions for the curator

- **The property and the scripts.** `-Dfortress.library=one` selects the one library in a JVM, but `bin/fortress_classpath` and `bin/run_classpath` read only `FORTRESS_LIBRARY`, so a property passed in `JAVA_FLAGS` gives the compile `default_repository/caches-one` and the run's class path `default_repository/caches` (`ProjectFortress/src/com/sun/fortress/repository/ProjectProperties.java:290-291`, `bin/run_classpath:27-31`; the `expand` lines under "What changed and why"). Decision not taken: keep the property for a JVM started without the scripts (as built, fork S1), or drop it so that the variable is the one selector for both. Default as built: kept.
