<!-- Report of climb batch 28's rung S, rung-system-natives: System's getEnvironment and getProperty onto stringOps, and args built in Fortress over two scalar helpers of a new class programArgs (review-queue item 355, option 1; row 895; Q3, option 1; P-170). -->

# Rung S: System's natives off systemOps, and args over two scalar helpers

- **problem:** against the one library the checker cannot read `System`: 'FortressBuiltin.StringVector is undefined.', 'File System.fss has 1 error.' (`explorations/compile-ladder/plan-28/PROBES.md:93-97`; F-321; row 895), and `args` reads a glue class with no compiled analogue (`Library/System.fss:29-35` at the base; F-32).
- **spec:** none. `grep -rln "getEnvironment\|getProperty\|programName" Specification/` prints only `Specification/appendices/changes.tex`, and `grep -rn "\bSystem\b" Specification/basic-lib Specification/basic Specification/library` prints no api `System`; the only `args` passages are the old `run(args)` parameter (`Specification/preliminaries/overview.tex:71-80`).
- **precedent:** `stringOps.lineSeparator`, the binding that climb batch 26's rung T moved off `systemOps` for the same refusal (`ProjectFortress/src/com/sun/fortress/nativeHelpers/stringOps.java:75-78`; `Library/FlatString.fss:25-26`); `systemOps.getArgs`, the team's helper over the compiled main's arguments (`ProjectFortress/src/com/sun/fortress/nativeHelpers/systemOps.java:24-26`); the library's immutable-array factory and `tabulate` (`Library/FortressLibrary.fss:2371-2372`, `:2576`); a private binding in a component (`Library/FlatString.fss:25-26`).
- **deviation:** `programArgs` holds no static of its own: `count` and `at` read `MainWrapper.cachedArgs` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/programArgs.java:9-17`), which the compiled main already sets (`ProjectFortress/src/com/sun/fortress/runtimeSystem/MainWrapper.java:67`) and walk's driver now sets (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/StringPrim.java:124`), so `MainWrapper.java` is not edited, against fork S3's letter (`explorations/coordinator/CLIMB-BATCH-28.md:440`); `count` answers 0 where no entry set the arguments (`programArgs.java:11`); `args` is fork S4's expression over two lines (`Library/System.fss:29-30`).
- **historical:** `Library/System.fss`, `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/StringPrim.java`, `ProjectFortress/src/com/sun/fortress/nativeHelpers/systemOps.java`, `ProjectFortress/src/com/sun/fortress/nativeHelpers/stringOps.java`, each present at the team's last commit `a874948ac` (`gh api "repos/palimondo/fortress/contents/<path>?ref=a874948ac"` answers a blob for each; `StringPrim.java`'s, `c3446329`, is the base's). Commit `ee14222d`'s message calls `stringOps.java` the revival's: it is the team's file, with helpers that the revival added.

## What changed and why

The first half, review-queue item 355's option 1 (`explorations/coordinator/review-queue.md:1263`):

- `stringOps` gains `getProperty(String, String): String` and `getEnvironment(String, String): String`, right after `lineSeparator`, each computing as `systemOps`' did (`stringOps.java:80-89`; `systemOps.java:20-27` at the base). `ProjectProperties` is named in full in the body, as `asExprString` names `Unprinter` (`stringOps.java:48-50`), so the edit is the two helpers only.
- `System`'s two strings name them (`Library/System.fss:39`, `:49`).
- `systemOps` loses `getEnvironment`; it keeps `getProperty` and `getArgs`, which the compiler's `CompilerSystem` imports (`Library/CompilerSystem.fss:13-14`), and the prelude is not changed before it is deleted (P-37; fork S1, `CLIMB-BATCH-28.md:438`).
- The compiled guard's two bindings name `stringOps` (`ProjectFortress/compiler_tests/NativeHelperFamilyStringCompiled.fss:16-17`).

The second half, Q3's option 1 (P-170):

- `args : ImmutableArray[\String,ZZ32\] = immutableArray[\String\](programArgCount()).tabulate(fn (i:ZZ32): String => programArg(i))` (`Library/System.fss:29-30`), over `private programArgCount(): ZZ32` on `programArgs.count` and `private programArg(i: ZZ32): String` on `programArgs.at` (`:32-33`). `getProgramArgsPrim`, the glue binding, and `getProgramArgs`, its converter, are deleted. `System.fsi` declares only `args` (`Library/System.fsi:28`) and does not change.
- `nativeHelpers/programArgs.java`, new: `public static int count()` and `public static String at(int i)` over `MainWrapper.cachedArgs` (`programArgs.java:9-17`).
- `StringPrim.GetProgramArgs.registerProgramArgs`, which walk's driver calls before every run (`interpreter/Driver.java:546`, `:564`), sets `MainWrapper.cachedArgs` from the list it already holds, one line (`StringPrim.java:124`). The compiled main sets it before the program's `main` runs (`MainWrapper.java:67`, unchanged).

The glue class `StringPrim.GetProgramArgs` stays whole: no binding names it now, and its `registerProgramArgs` is the driver's entry.

### The static, and the loader

Fork S3 put a static `String[]` in `programArgs`, set by both drivers. Built so, with `MainWrapper.java:67` setting `programArgs.args = subargs`, the compiled path did not see the arguments:

    $ cd tmp/rung-system-natives/probe && ../../../bin/fortress compile ProgramArgsProbe.fss && ../../../bin/fortress run ProgramArgsProbe a b
    count =  0
    rc=0

The instantiating class loader loads every class itself except those that `mustUseSystemLoader` leaves to its parent (`ProjectFortress/src/com/sun/fortress/runtimeSystem/InstantiatingClassloader.java:2897-2919`): `MainWrapper` is on that list (`:2907`) and no class of `nativeHelpers/` is, so the program's `programArgs` was the loader's own copy, and `MainWrapper`, loaded by the system loader, wrote the other copy's field. The team's own helper over the arguments, `systemOps.getArgs`, reads `MainWrapper.cachedArgs` for this reason (`systemOps.java:24-26`). With `programArgs` reading `MainWrapper.cachedArgs`, the same probe, on the final code `ee14222d`:

    count =  2
    at(0) =  a
    at(1) =  b
    rc=0

and with no argument, `count =  0`, rc 0. Under walk a helper class is the application loader's (`Class.forName`, `interpreter/glue/StaticNativeApp.java:175`), as are `StringPrim` and `MainWrapper`, so walk's write and read meet. A consequence: walk now initialises `MainWrapper`, and with it the instantiating loader's singleton (`MainWrapper.java:19`), in its main thread at `registerProgramArgs`; on the base it initialised neither, and it no longer initialises `systemOps` (`JAVA_FLAGS="... -Xlog:class+init=info" bin/fortress ProjectFortress/tests/SystemArgsWalk.fss`, then grep for the class names; the same on the old code):

    new: Initializing 'com/sun/fortress/runtimeSystem/MainWrapper' ... by thread "main"
    new: Initializing 'com/sun/fortress/runtimeSystem/InstantiatingClassloader' ... by thread "main"
    new: Initializing 'com/sun/fortress/nativeHelpers/programArgs'(no method) ... by thread "ForkJoinPool-1-worker-1"
    old: Initializing 'com/sun/fortress/nativeHelpers/systemOps'(no method) ... by thread "ForkJoinPool-1-worker-1"

The loader's constructor sets a system property and refuses a second loader (`InstantiatingClassloader.java:118-125`); one JVM still makes one, as a compile's JVM does. `ant testSystem` and `ant testQuick` pass on this code (below).

## The tests, the failing runs and the passing runs

The tests:

- `ProjectFortress/compiler_tests/NativeHelperFamilyStringCompiled.fss:16-17`, the compiled guard, retargeted onto `stringOps`.
- `ProjectFortress/compiler_tests/NativeHelperProgramArgsCompiled.fss` and `.test`, new: binds `programArgs.count` and `at` in its own declarations and asserts the count 0 for a run without arguments.
- `ProjectFortress/tests/SystemArgsWalk.fss`, new: prints `|args|` and each element, and asserts `|args|` is 0, as the harness passes no argument. A guard: it passes on the base and after.

The failing run, on the base's code, before the edit was first built (`ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests NativeHelperFamilyStringCompiled.test NativeHelperProgramArgsCompiled.test`, 2026-11-08T05:29:51Z, tree 157323e5 with the tests applied):

    . link ProjectFortress/compiler_tests/NativeHelperFamilyStringCompiled ProjectFortress/compiler_tests/NativeHelperFamilyStringCompiled.fss:16:75-126:
        builtinPrimitive names no static helper: com.sun.fortress.nativeHelpers.stringOps.getProperty
    . link ProjectFortress/compiler_tests/NativeHelperProgramArgsCompiled ProjectFortress/compiler_tests/NativeHelperProgramArgsCompiled.fss:5:36-83:
        builtinPrimitive names no static helper: com.sun.fortress.nativeHelpers.programArgs.count
    Tests run: 4,  Failures: 4,  Errors: 0

The walk guard on the base (`explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-system-natives/h-base ProjectFortress/tests/SystemArgsWalk.fss`, 2026-11-08T05:30:08Z, tree 157323e5): `|args| = 0`, `OK (1 test)`.

The passing runs, on the final code `ee14222d`, after the last change of code:

- `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh final ProjectFortress/compiler_tests NativeHelperFamilyStringCompiled.test NativeHelperProgramArgsCompiled.test` (2026-11-08T05:42:53Z): `OK (4 tests)`.
- `explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-system-natives/h-final` over `SystemArgsWalk`, `NativeHelperStringRopeWalk` (which calls `getEnvironment` and `getProperty` at ropes and flat strings), the three tests that read `args` (`CovCollTest`, `ParamRef`, `setMakerTest0`) and the three that read `getProperty` (`FileConversion`, `LongStringTests`, `WordCountSmall`), cache empty (2026-11-08T05:43:10Z): `OK (8 tests)`.
- `ant testSystem` (BUILD SUCCESSFUL, Total time: 4 minutes 7 seconds): shards 192, 194, 192 and 201 tests, 779, no failure or error; climb batch 27's gate ran 778 (`compile-ladder/climb-batch-27/gate/summary.txt`), the one more is `SystemArgsWalk`.
- `ant testQuick` (BUILD SUCCESSFUL, Total time: 5 minutes 46 seconds): compiler 1449, library 86, othercompiler 263, no failure or error; the gate's compiler track ran 1447, the two more are `NativeHelperProgramArgsCompiled`'s link and run. The compiler track's tests that import `CompilerSystem` (`Compiled2.*`, `Compiled7`, `IntegrationStats`, `other_compiler_tests/Compiled2PreTest3`) keep their verdicts. No test's verdict changes in either suite.

## Programs run old against new

Old code through `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base28 $PWD/tmp/old-caches`, new code through the tree's `bin/fortress`, at `ee14222d`:

- `bin/fortress ProjectFortress/tests/SystemArgsWalk.fss a b`, old and new, the same after the tree's path is masked, rc 1 on both, as the assertion of no argument fails:

      |args| = 2
      args[0] = a
      args[1] = b
      FAIL: a ZZ32: 2 =/= a ZZ32: 0; |args| of a run without arguments

- `bin/fortress ProjectFortress/tests/SystemArgsWalk.fss`, old and new: `|args| = 0`, rc 0, the same.
- The demo `tennisRanking`, the one team demo that reads `args`, with its three files as the demo driver passes them (`explorations/compile-ladder/rung-team-demos/REPORT.md`, section 13): rc 0 on both, the same standard output, and the 52-line ranking it writes to its second argument identical (`diff` prints nothing). The file it writes into `ProjectFortress/demos/` was moved to `tmp/` after each run.
- The compiles of the six ladder files below, old and new: identical output.

## The checker over System

The planner's command (section 5, probe 3), with `-Djava.io.tmpdir` added, on the final code `ee14222d`:

    SCR=$PWD/tmp/sys-check; mkdir -p $SCR/classes $SCR/caches
    CP=$(bin/fortress_classpath | tail -1)
    javac -nowarn -cp "$CP" -d $SCR/classes explorations/coordinator/tools/checker-count/WorldFlip.java \
        explorations/coordinator/tools/checker-count/shadow-src/com/sun/fortress/compiler/StaticChecker.java
    java -Xmx4g -Xss64m -Djava.io.tmpdir=$PWD/tmp -Dfortress.caches=$SCR/caches -Dfortress.analyzer.overload.cache=false \
        -cp $SCR/classes:$CP WorldFlip -stop check Library/System.fss

Its last lines:

    @@PROBE checkApi System -> errors=0
    @@PROBE checkApi com.sun.fortress.nativeHelpers -> errors=0
    @@PROBE checkComponent System
    ### rc=0

No error line: the checker reads `System` whole, as control B. Its before is the record's, not run again: 'FortressBuiltin.StringVector is undefined.', 'File System.fss has 1 error.' (`plan-28/PROBES.md:93-97`); and the first half alone is control A's two errors, at `Library/System.fss:29` and `:35` (`PROBES.md:99-103`), not built apart here.

## The count stage and the distance stage

Both ran once on the final code, commit `ee14222d`, with nothing uncommitted (`git status --short` printed nothing), after its build; no code changed after either started.

- The count (`explorations/coordinator/tools/checker-count/run.sh tmp/rung-system-natives/checker-count-postedit.txt tmp/rung-system-natives/cc-post`): `#total 0`, `#locations 0`, `#crash none`, `#shadow matches the tracked StaticChecker`. `diff explorations/compile-ladder/climb-batch-27/gate/checker-count.txt tmp/rung-system-natives/checker-count-postedit.txt` prints nothing.
- The distance (`explorations/coordinator/tools/distance/run.sh tmp/rung-system-natives/distance-postedit.txt tmp/rung-system-natives/dist-post`, 149 s, `FortressLibrary 93`): `#total 0`, every kind 0, and the two crash rows of value object `Char` as the gate's, `#crash decl ObjectDecl FortressBuiltin.fss:661:1-773:2 IllegalArgumentException Comparison method violates its general contract!` and `#crash stage component FortressBuiltin leftover InterpreterBug`. `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-27/gate/distance.txt tmp/rung-system-natives/distance-postedit.txt` prints `DISTANCE SAME   0`; the two tables differ only in their `#seconds` and `#machine` rows. `tmp/rung-system-natives/dist-post/errors.tsv` holds only its header, as `explorations/compile-ladder/gate/distance-sites.tsv` does: no site came, went or moved.

Both stages read `stringOps` whole, through `FlatString`'s bindings, and neither reads `System` or `programArgs`.

## The ladder subset

No file's recorded first error in the baseline names what the change touched (`awk` over `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`'s first-error column for `stringOps`, `systemOps`, `CompilerSystem`, `StringVector`, `getProgramArgs`, `getEnvironment`, `getProperty`, `MainWrapper` and `args` finds only two unrelated rows, `NatReflectTest.fss` and `XXXvarargsObject.fss`), and no program of the pass list imports `System` or `CompilerSystem`. The subset ran is the six programs of `tests/` that import `System`, whose compile reads its api: `CovCollTest`, `ParamRef`, `setMakerTest0`, `FileConversion`, `LongStringTests` and `WordCountSmall`, with the drivers copied under `tmp/rung-system-natives/ladder/` (`gate.md`, "The ladder regression"). The gate's landed ladder does not run them; against the baseline each stays at `disambiguate`, as recorded; four first errors read as the baseline's, `ParamRef` and `setMakerTest0` now read 'DelegatedIndexed is undefined.' and `LongStringTests` 'ImmutableArray is undefined.' where the baseline read 'ImmutableArray' and 'Char'. The old code's compile of the six prints the same output as the new (`old-fortress.sh ... compile tests/<f>.fss`, `diff` after the tree's path is masked), so these moves predate the change.

## Where the fix belongs, and the precedent search

The map's table of what moves with what (`explorations/coordinator/map/README.md:125`) and section B.12 (`map/modules-and-phases.md:441-462`) put a binding's helper in `nativeHelpers/`, read whole by the checker and the wrapper generator. `library.md`, "Designing a change": a native is a public static method of a class under `nativeHelpers/`, bound by `builtinPrimitive`. The precedent that repaired the same refusal moved `FlatString`'s line separator to `stringOps.lineSeparator`; of the strings of the one library that named `systemOps`, two remained, `Library/System.fss:41` and `:51` at the base, and this change moves both, so none remains (`grep -rn systemOps Library ProjectFortress/LibraryBuiltin` finds only `CompilerSystem.fss:13-14`'s `import java`). For the arguments, the team's precedent is `systemOps.getArgs` over `MainWrapper.cachedArgs` (`systemOps.java:24-26`), with `MainWrapper` delegated to the system loader (`InstantiatingClassloader.java:2907`). For an immutable array of a size known at run time the library writes `immutableArray[\T\](n)` (`Library/CovariantCollection.fss:89`, `Library/PureList.fss:133`) and fills it with `init` or `tabulate` (`Library/FortressLibrary.fss:2576`).

The ways the language and the library offer, and the choice, are in "Decisions".

## What the specification settles

Nothing: the specification declares no api `System` (the greps in the provenance lines). The decisions are item 355's option 1, P-37, P-58 and P-170.

## Names

`grep -rn` over `ProjectFortress/tests`, `ProjectFortress/*_tests`, `ProjectFortress/test_library`, `Library`, `ProjectFortress/LibraryBuiltin`, `ProjectFortress/demos` and `ProjectFortress/src/com/sun/fortress` finds `programArgCount` and `programArg` only in `Library/System.fss:32-33`; the class `programArgs` only in its file, `System.fss` and the new compiled test; `stringOps.getProperty` and `stringOps.getEnvironment` only in `System.fss` and the compiled guard; `argCount` and `argAt` only in the new compiled test; no other `SystemArgsWalk` or `NativeHelperProgramArgsCompiled`; and no use left of `getProgramArgsPrim` or `getProgramArgs`.

## Sentences made false

- `Specification/appendices/changes.tex:4625`, the natives entry's Effect: "341 of the 443 bindings of \library\ name a helper"; on this tree alone 343 of 444 (a counter over `Library/*.fss` and `ProjectFortress/LibraryBuiltin/*.fss`, the `Compiler` files left out and comments struck, which gives 341 of 443 and 102 at the base); and its list gains `System`'s two helpers of `args`, the number of arguments and the i-th argument. `:4655`: "The other 102 still name a glue class", 101 here. The gather writes the merged count (fork 5).
- F-321 (`explorations/coordinator/FACTS.md:147`): "`System`'s `getEnvironment` and `getProperty` name `systemOps`, and neither stage reads `System`, so they will stop wherever the checker reads it."; and its citation of `systemOps.getArgs` at `systemOps.java:29`, now `:24`.
- F-32 (`FACTS.md:30`): "102 of the one library's 443 live native bindings", and "it also needs `getProgramArgsPrim`, which `System` calls as it loads (P-170 replaces it)".
- Row 895's claim (`explorations/fortress-gap-ledger.md:932`), which closes; row 896's notes (`fortress-gap-ledger.md:784`), whose new line is in `record.md`: `System.fss:51` is now `:49`, the helper `stringOps.getProperty`, and `StaticNativeApp.java:252-257` is `:260-264` at the base.
- PLAN (`explorations/coordinator/PLAN.md:10`): "Neither stage reads `System`'s two helper strings, and against the interpreter's prelude the checker cannot read their class (F-321; row 895)", and its counts 341, 443 and 102; `:56`: "`getProgramArgsPrim` is the line on `CompilerSystem` below"; `:66`, `System`'s rung, now built; `:67`: "the one library's `args` reads `getProgramArgsPrim` (`Library/System.fss:28`, `:30`), a binding with no compiled analogue that `System` calls as it loads".
- No note on walk or the compiled path in `Specification/` names `System`, `systemOps` or `getProgramArgsPrim`.

## Points to report

1. **The helpers and their Java signatures; what `systemOps` keeps and why.** `stringOps.getProperty(String what, String ifMissing): String` (`stringOps.java:81-83`) and `stringOps.getEnvironment(String name, String ifMissing): String` (`:86-89`); `programArgs.count(): int` (`programArgs.java:9-12`) and `programArgs.at(int i): String` (`:15-17`). `systemOps` keeps `getProperty` and `getArgs` (`systemOps.java:20-26`), which `CompilerSystem` imports (`Library/CompilerSystem.fss:13-14`), unedited by P-37 and item 319.
2. **The compiled guard before and after through `junit.sh`:** before, 'builtinPrimitive names no static helper: com.sun.fortress.nativeHelpers.stringOps.getProperty' at `NativeHelperFamilyStringCompiled.fss:16:75-126`; after, `OK (4 tests)` with `NativeHelperProgramArgsCompiled` (section "The tests").
3. **The checker over `System`, before and after:** before, the record's 'FortressBuiltin.StringVector is undefined.', 'File System.fss has 1 error.'; after, no error line, `### rc=0`.
4. **With Q3:** `args` at `Library/System.fss:29-30`; the helpers `programArgs.count` and `at`; the one static is `MainWrapper.cachedArgs` (`MainWrapper.java:21`), filled by the compiled main (`MainWrapper.java:67`) and by walk's driver (`StringPrim.java:124`); under walk, `|args| = 0` without arguments and `|args| = 2`, `a`, `b` with two; compiled, the probe's `count =  2`, `a`, `b` and `count =  0`.
5. **The count table and the distance table on the final tree:** both equal to climb batch 27's gate's, the count 0 and the distance 0 with the same two crash rows; no site came.
6. **Tests whose verdict changes in `ant testSystem` or `ant testQuick`:** none; the counts rise by one and two, the new tests.
7. **Every sentence made false,** above, row 896's new line in `record.md`.
8. **A file edited beyond those named:** none. `MainWrapper.java`, which the section names, is not edited (the deviation). No edit of `CompilerSystem` or of `systemOps.getArgs`.

None of these holds the push: each is reversible and none acts against a decision on record. P-170's text, "they read one static that walk's driver and the compiled path's `MainWrapper` both fill" (`POSITIONS.md:76`), holds of `MainWrapper.cachedArgs`.

## Decisions

1. **The one static is `MainWrapper.cachedArgs`, which `programArgs.count` and `at` read and walk's driver now sets; `MainWrapper.java` is not edited.** Ways not taken: (a) a static of `programArgs` set by both drivers, fork S3's letter, measured not to reach the compiled program (`count =  0` with `a b`, "The static, and the loader"); (c) that static, with a line naming `com.sun.fortress.nativeHelpers.programArgs` in `mustUseSystemLoader` (`InstantiatingClassloader.java:2900-2917`): an edit of the class loader, beyond the section's files, near a class's first load, where `compiler.md` asks for the four-thread atomic runs; (d) `MainWrapper` writing the loader's copy by reflection, several lines over a class name. Evidence: the team's `systemOps.getArgs` over `cachedArgs` (`systemOps.java:24-26`) and the loader's list (`:2907`); P-170 (`POSITIONS.md:76`). The cost taken: walk initialises `MainWrapper` and the loader's singleton at each run.
2. **`count` answers 0 where `MainWrapper.cachedArgs` is null; `at` has no check.** Ways not taken: a Java exception from `count`, which would stop every program that imports `System` as it loads; walk's old `bug("No program args were registered ...")` (`StringPrim.java:149-150`), a glue call that a helper cannot make. Every walk entry registers the arguments (`Driver.java:546`, `:564`) and the compiled main sets them (`MainWrapper.java:67`), so a null means that no entry gave any; `at` is called only below the count.
3. **`ProjectProperties` named in full in `stringOps.getProperty`,** as `asExprString` names `Unprinter` (`stringOps.java:48-50`). Way not taken: an import line, as `systemOps` has (`systemOps.java:15`), an edit outside the two helpers.
4. **Each helper with one comment line naming its binding,** as `lineSeparator`'s (`stringOps.java:75`). Way not taken: no comment, as `systemOps`' helpers.
5. **`args` as fork S4 writes it, over two lines** (`System.fss:29-30`). Ways not taken: `immutableArray[\String\](n)` and a loop of `init` as `PureList` writes (`Library/PureList.fss:133-137`), two statements in a top-level variable's initialiser; a `replica` and `tabulate` as before, which needs an array to copy; `array1` or `tabulatedArray1`, which take a size as a static argument, not known before the run.
6. **The two bindings private, named `programArgCount` and `programArg`,** where `getProgramArgsPrim` stood (fork S4). Way not taken: public, though `System.fsi` declares neither, so neither is visible to an importer either way.
7. **`System.fss`'s `import NativeArray.{...}` kept** (`System.fss:13`), though its one use, `getProgramArgs`' `PrimImmutableArray`, is gone. Way not taken: deleting it, beyond the section's lines of `System.fss`; the checker reads `System` with it with no error.
8. **The glue class `StringPrim.GetProgramArgs` kept whole** but for the one line (`StringPrim.java:113-160`). Way not taken: deleting its `applyToArgs` and `grindProgramArgs`, which no binding names now, beyond the section's one line.
9. **The compiled test asserts the count 0 only, and the arguments are shown by hand.** No `.test` key passes arguments (`grep -rln "args=\|program_args\|run_args"` over the `.test` files prints nothing). Ways not taken: a compiled test that sets the arguments, which no helper can (a setter over `String[]` has no Fortress type, row 368).
10. **The ladder subset is the six programs that import `System`,** the strict rule giving none (section "The ladder subset"). Way not taken: no subset.
11. **The commit footer is the skill's** (`committing.md`), as the brief says, over the session's reminder.

## Defects and their homes

- **Row 895,** the checker's refusal of a binding over `systemOps`, at `System`: home 1, repaired; the checker over `System` reports no error. It closes with `--test none` and a note naming the two runs of the checker over `System` (fork S2): no gated test checks a component against the one library but the stages, which do not read `System`.
- **Row 896,** `getProperty` at an empty name: stays, home 3 already (a ledger row with no reproducer); run on this tree through `stringOps.getProperty`: `getProperty("", "?")` under `bin/fortress` printed 'Wrapped exception java.lang.IllegalArgumentException: key can't be empty', rc 1. Its new line is in `record.md`.
- **The loader's own copy of a helper class:** not a defect. The loader loads the program's classes itself by design (`InstantiatingClassloader.java:196-201`, its comment) and leaves to its parent the classes whose state the run time shares, `MainWrapper` among them; no source of the team says that a helper's static is shared with the main. It goes to FACTS (`record.md`).

## For FACTS

Two entries and a rewrite, in `record.md`: the loader and a helper's static; F-321's sentences on `System`; F-32's counts.

## Commands worked out

- The class-initialisation check: `JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$PWD/tmp -Xlog:class+init=info" bin/fortress P.fss`, then `grep "Initializing.*<class>"`, on the old code through `old-fortress.sh` with the same `JAVA_FLAGS`. It shows which helper and run-time classes a walk run initialises.
- The count of the bindings: a short script that strips `(* *)` and `(*)` comments from `Library/*.fss` and `ProjectFortress/LibraryBuiltin/*.fss`, leaves out the files named `Compiler*`, and counts the `builtinPrimitive("...")` strings that start `com.sun.fortress.nativeHelpers.` against the rest, at a commit (`git show`) or on the tree. At the base it gives 341, 102 and 443, F-299's and F-32's numbers.
- The team's last commit's files from this shallow clone: `gh api "repos/palimondo/fortress/contents/<path>?ref=a874948ac" --jq .sha`.
