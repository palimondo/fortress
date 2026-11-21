<!-- Climb batch 34b's gather record, run 2 of CLIMB-BATCH-34.md: rung C applied on main, its commit, the rows opened, rewritten and closed, the merged tree's tests, the demos and the specification's build, the points to report, the items for the curator and where each is in PLAN.md, and the rung's revival change for the skill writer. -->

# Climb batch 34b: the gather's record

Written at the gather stage of climb batch 34b (2026-11-21), the second of the two runs of `explorations/coordinator/CLIMB-BATCH-34.md`, after climb batch 34, which landed rungs T, P, L, G and F. Its one rung, C, builds the first program compiled and run against the interpreter's library under the gate: a second set of run-time classes for the one library, the carriers of its built-in types, the run time's prelude names, and its fourteen components compiled to jars in the onelibrary track, where `Hello` runs with the JVM's verifier on (rows 874 and 1062).

**Preconditions.** `git status --porcelain` printed nothing, and `a1c244be36` is an ancestor of `HEAD` (`git merge-base --is-ancestor`, exit 0). The batch's commits start after `dfcd36cbbf902dc5c2d8cd7f7470297a9c901239`, the `HEAD` the gather started from; the three commits between the base and it are boot notes, which touch only `explorations/coordinator/BOOT.md`. No earlier launch had worked this stage: `main` held no commit of the batch and `tmp/gather/` no file of it, so one launch worked it.

**Scratch.** The patch is `tmp/gather/rung-first-run-one-library.patch` in the main tree, `git diff a1c244be36c0c79f2f478b6e56a9769bd756fedb...wip/rung-first-run-one-library`. It was applied on `main` with `git apply --3way --index`, its record folded and its commit made. The branch is left as it was.

## The landed commits

| Rung | Slug | Branch head | Commit on `main` |
|---|---|---|---|
| C | `rung-first-run-one-library` | `91bb0a936b` | `f6469d96ec` |

Then `d9807a4077`, "Close the rows climb batch 34b fixed", and this record's commit.

## The rungs applied, in order

One rung, C, so no order was to choose: no rung lands only with another (`landsOnlyWith` is empty), and no file is shared with another rung of the batch.

## Conflicts

None. Every hunk applied cleanly (`git apply --3way --index`: 'Applied patch to ... cleanly.' for each of the 23 files that `main` held, and the 32 new files applied directly); `main`'s only change since the base, `explorations/coordinator/BOOT.md`, is a file the patch does not touch. The patch printed 'warning: 17 lines add whitespace errors.', from trailing spaces in the second set's Java sources as the branch holds them; nothing was changed for them. The applied files equal the branch's (`git diff wip/rung-first-run-one-library --stat -- <the applied paths>` printed nothing).

## The lines that another rung's hunks moved

None: one rung, and `main`'s commits since the base touch none of its files, so every `file:line` that the rung's files cite is as on its branch.

## The tests on the merged tree

The build and every run below are of the code of `f6469d96ec`, C's commit, on the main tree; the commits after it change no code.

- Built once after the rung (`ant compileAll`, 'BUILD SUCCESSFUL', 'Total time: 44 seconds'; '[javac] Compiling 12 source files to /home/user/fortress/ProjectFortress/build-one'; 'Caches /home/user/fortress/default_repository/caches started again, empty' and the same for `caches-one`). No compiled test of the prelude's tracks ran here, so no library order was run.
- The rung's tests, all in `one_library_tests/`, as the rung last ran them, in the onelibrary track: `ant testOneLibrary` (nproc 4, Intel Xeon at 2.10 GHz, JDK 25.0.4.1; the track's JVM at `FORTRESS_THREADS=4`, with the demos' walk runs beside it):

      [junit]  compile /home/user/fortress/ProjectFortress/one_library_tests/../../Library/FortressLibrary  OK (time = 134374ms)
      [junit]  run /home/user/fortress/ProjectFortress/one_library_tests/OneLibraryRunHello (1834ms) Passed
      [junit]  run /home/user/fortress/ProjectFortress/one_library_tests/OneLibraryCatchHelperRaises (1628ms) Passed
      [junit] Tests run: 40, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 270.819 sec
      BUILD SUCCESSFUL

  The fourteen compiles of `OneLibraryComponents.test` ran first and each printed 'OK'; the six run tests that are expected failures (`XXXOneLibraryRunVarargs`, `...ConditionalReduction`, `...Half`, `...GenericAsString`, `...StringEquality`, `...HelperRaiseSingleton`) each printed 'REACHED' and then 'Saw expected failure (Exit code != 0)', and the compiles of the two `XXXOneLibraryVarargs...Overloaded` 'Saw expected exception'; `OneLibraryUncaughtRaise` 'Passed'. The rung's last run, `ant testFast` on `f3439cf7ce`, had 32 tests in the track; the skeptic's seven `.test` files add eight, `OneLibraryUncaughtRaise.test` both a compile and a run.
- No walk test: the rung adds or changes none under `ProjectFortress/tests/`, so no `harness-one.sh` call ran.
- The 52 team demos: the demo driver of `compile-ladder/rung-team-demos/REPORT.md`, "Commands worked out", run on the merged build from the main tree's root, `bash <driver> <scratch>`, from 00:06 to 00:38 UTC: 'demos: 52 run, 52 reached their end', 'EXIT=0'. Rung C edits the classes under `nativeHelpers/` that the interpreter's library's `builtinPrimitive` strings name (their raise strings), so the demos are its to reach; the brief gives them to the gather, and they were run once, after the last edit of code. The `tennisRanking` demo's output file `ProjectFortress/demos/tennis051707`, which the driver names as its `outFile`, was removed after the run.
- The specification, built once on `main`'s text after the last edit under `Specification/` (C's commit `f6469d96ec`; the gather edits nothing there), `( cd Specification/fortress && ./ant genSource && ./ant tex )`: '211:BUILD SUCCESSFUL', '21502:BUILD SUCCESSFUL', '21504:EXIT=0'; the skill's warning `grep -c` over `fortress.log` printed 0; 'Output written on fortress.pdf (727 pages, 2534294 bytes)'. `pdftotext` shows the two sentences as the skeptic left them: 'A program compiled against the Fortress standard libraries can run, as one that prints a', 'line of text does, but the class of the array of a varargs call's arguments does not load, since its template class', and 'the Fortress standard libraries can run, as one that prints a line of text does, but not one that calls a declaration'. The PDF is copied to `tmp/gather/fortress-batch-34b.pdf` in the main tree, and the build's files are removed (`git clean -fXq -- Specification`).
- microGPT: no line changes (`git diff --stat a1c244be36 HEAD -- explorations/run-c4/src explorations/apl/mg` prints nothing); its quick checks are the commit stage's to run on the merged tree.
- The count stage and the distance stage ran on C's own code, `f3439cf7ce` ("Points to report", below); the gate's tables on the merged tree are their check. The suites, the atomic runs and `ant testSpecData` run in the gate.

## Rows opened

Six rows, numbered by `ledger.py add` in the order of their placeholders, all in "12. The compiled path: constructs, crashes and the switch-over", as C's record named; each met the row template at its add. Each placeholder is replaced by its number in C's `REPORT.md`, `SKEPTIC.md`, the rows that cite it (row 1091's notes, and rows 1101, 1102 and 1103 among themselves) and the handover line below; no test file and no line of the specification named one. The manifest's `newRows` named three; rows 1101, 1102 and 1103 are the skeptic's (`4383f42f6a`, `f644941c3d`), in C's `record.md`.

| Row | Placeholder | Rung | Status | Claim |
|---|---|---|---|---|
| 1098 | NEW-C-1 | C | CONTESTED | on the compiled path a call of an api function that its component implements only by a declaration of wider parameter type dies, 'NoSuchMethodError', naming the api's declaration: `println(q)` for `q: QQ` names the one library's `println(a:Number)`, met by `println(a:Any)` |
| 1099 | NEW-C-2 | C | NEGATIVE-VERIFIED | against the one library the class of `FullScalarRange`'s default methods holds `narrowToRange` twice at one descriptor, a bridge for each parent declaring it at a wider return type, so it fails to load with the verifier on |
| 1100 | NEW-C-3 | C | NEGATIVE-BOUNDED | the dispatch method of the one library's `denominator(self)` takes `Ratio` as its parameter type when `FortressLibrary` compiles after other programs in one JVM, and `QQ`'s default methods fail verification in `isFinite` |
| 1101 | NEW-C-4 | C's skeptic | NEGATIVE-VERIFIED | against the one library a compiled generic body's `u.asString`, for `u` of a type parameter bounded by `ZZ32`, dies, 'NoSuchMethodError': the payload class answers `asString` only at the prelude's `String` |
| 1102 | NEW-C-5 | C's skeptic | NEGATIVE-BOUNDED | against the one library a compiled program's uncaught exception is reported with the run time's placeholder, 'FortressException: class fortress.FortressLibrary$IntegerOverflow with string Bogus value from FValue.asString()' |
| 1103 | NEW-C-6 | C's skeptic | NEGATIVE-VERIFIED | on the compiled path an exception object without value parameters that a helper raises is a second instance of the object, so a caught `IntegerOverflow` or the one library's `FileNotFoundException` is not `SEQV` the object; walk gives the object itself |

## Rows rewritten and noted

- Rows 994, 995 and 1091 (C), rewritten with the record's lines: row 994 names `=` and `<` of strings and `=` of booleans, with `XXXOneLibraryRunStringEquality.test` as its reproducer where it had none (the skeptic's `4383f42f6a`); row 995 holds the carried types other than objects over payload classes, the one library's seven with its `Boolean`, `Char` and `FlatString` having one name each; row 1091 is any trait's class of default methods that holds a method twice, `Vector`'s `-` and `ImmutableArray1`'s `copy`, with `XXXOneLibraryRunVarargs.test` as its reproducer. Its NEW-C-2 is row 1099.
- Row 1090 (C), the note on its compiled half that the record asks for, "compiled half: against the one library FlatString compiles whole, a payload object (one_library_tests/OneLibraryComponents.test)", was not written: the row is `FIXED`, and `ledger.py note` refuses it, 'row 1090 is FIXED: a closed row is not edited; its full text is in the history file'; `rewrite` refuses a closed row alike. F-396 states that `FlatString` compiles over a payload class under the selection, and the onelibrary track's run above shows its compile.
- Rows 1017 and 1079 (the gather), rewritten in `d9807a4077`: each said that no program runs under the selection (row 1062), which C makes false; row 1017 now says that a varargs call does not run there yet (row 1091), and row 1079 that `Arr` and `Dot` stop at rows 994 and 1091 against the one library (fork B2 of `CLIMB-BATCH-34.md`, `:395`). Row 1017's line is 1,194 characters.

## Rows closed

Two rows, in `d9807a4077`, each by C's commit on `main` and its test, which passes on the merged tree ("The tests on the merged tree", above); then `explorations/coordinator/tools/ledger.py landing-check a1c244be36c0c79f2f478b6e56a9769bd756fedb` printed 'ledger.py landing-check: a1c244be3..HEAD: no finding', before that commit and after it.

| Row | Rung | Commit | Test |
|---|---|---|---|
| 874 | C | `f6469d96ec` | `ProjectFortress/one_library_tests/OneLibraryComponents.test` |
| 1062 | C | `f6469d96ec` | `ProjectFortress/one_library_tests/OneLibraryRunHello.test` |

Each closes by C's commit on `main`, where the record named its branch's `f3439cf7ce`.

## FACTS entries

Written with `record.py`, in C's commit:

- F-396, added under "The checker and the one library", after its last entry: the one library compiles to jars and runs on the compiled path, over a second set of run-time classes; the record's "For FACTS" text, with rows 1098 to 1100 named and the second set's build and class path stated.
- F-381, F-388, F-390 and F-353, rewritten, the four that C's record names as made false: a program compiled under the selection can run (F-381, with `OneLibraryRunHello.test` among its tests); the second set's `LibraryNames` names the one library's seven, which the code generator writes over the same payload classes (F-388); a varargs call's indices agree and its run dies at row 1091 (F-390); `main` builds a second set by probe Y's mechanism (F-353).
- F-34 and F-352, rewritten by the gather, which C makes false too: F-34 said that the measure's script can take its count only on a patched tree, where on C's code the count without the patch, under the selection, gives the same 0 refused and 754 emitted, and the script's patch no longer applies whole (C's `REPORT.md`, "The stages"); F-352 said that a compiled program has run against the interpreter's library only in the scratch tree, and that the one library's seven are not compiled over the payload classes.

`record.py check`: 'FACTS.md 326 entries, POSITIONS.md 105 entries; 0 failures'. The landing check finds no entry that states a row's status otherwise.

## The rung: the skeptic's fixes and rulings, and the gather's corrections

### Rung C, `rung-first-run-one-library` (`f6469d96ec`)

Approved. The skeptic's commits on the branch, all corrections, no fix of the change's code:

- `4383f42f6a`, correction: three defects that the one library's first runs show had no home: the generic `u.asString` at `U extends ZZ32`, named by reading only, 'Not run, and no row added' (now `one_library_tests/OneLibraryGenericAsString.fss`, `.test` and `XXXOneLibraryRunGenericAsString.test`, row 1101); row 994's rewrite with reproducer none, though `=` and `<` of strings now show it (`OneLibraryStringEquality.fss`, `.test`, `XXXOneLibraryRunStringEquality.test`); the uncaught exception's placeholder report (`OneLibraryUncaughtRaise.fss` and `.test`, row 1102; `src-one/com/sun/fortress/compiler/runtimeValues/FException.java:27`, `:35`).
- `509181e9c3`, correction: `Specification/appendices/changes.tex:4052-4053` and `:6416-6417` on the worker's head claimed that a program compiled against the one library runs, though `println` of a number (row 1098) and `=` of strings (row 994) do not; now 'can run, as one that prints a line of text does'. `REPORT.md:8` cited `FValue.java:22` for `asString`, which is at `:27`.
- `f644941c3d`, correction: a caught exception object without value parameters that a helper raises is a second instance (`ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/Utility.java:49-51`, `:66-69`), not `SEQV` its object, with no home: now `OneLibraryHelperRaiseSingleton.fss`, `.test` and `XXXOneLibraryRunHelperRaiseSingleton.test`, row 1103.
- `91bb0a936b`: the skeptic's `SKEPTIC.md`.

No contested ruling, and no judge. The skeptic's `leftForGather` held nothing. The gather's corrections: the placeholders NEW-C-1 to NEW-C-6 made rows 1098 to 1103 (`REPORT.md`, `SKEPTIC.md`); F-34 and F-352 rewritten beside the four entries that the record names; rows 1017 and 1079 rewritten in the close commit; row 1090's note not written (above). No sentence of the specification was owed: the report's two sentences made false are both edited by the rung, and `grep -rn '~874\|~1062\|~995\|~1090\|does not run yet\|no program compiled against' Specification --include=*.tex` prints nothing.

## Files written from the journal

None. The branch carries its `REPORT.md` and `record.md` from the run's journal, each equal byte for byte to the text that `journal-text.py` writes (the skeptic's `cmp`, `SKEPTIC.md`, "Judged"), and the skeptic's `SKEPTIC.md`; the rung had no repair round, so no `textCommands` line was run. `SKEPTIC.md` is not only the word committed. `record.md` was folded and taken out of the index and the tree in C's commit.

## Not landed

None: the batch's one rung was approved and landed.

## Handover lines

The rung's own line, its placeholders replaced by their rows:

- Rung C landed the first program compiled and run against the one library: the second set of run-time classes (`src-one`, `build-one`), the carriers of the one library's built-in types, the fourteen components compiled first in the onelibrary track, and Hello's run with the verifier on; the run tests of varargs, the conditional reduction and the half stay expected failures at rows 1091, 1099 and 1098, with row 994 behind the first two.

## Points to report

Every point that rung C reached, from the worker's and the skeptic's lists, each once, with the worker's evidence and then the skeptic's where it differs. Their lines are of the branch, which equal `main`'s at `f6469d96ec`. None holds the push: each is reversible (`holdsPush` false, `cannotBeUndone` false), and no step that cannot be undone or that acts against a decision on record was taken; the reading of fork C3, typed in the second set only, is a default of the batch that a later commit can take back. The reserved points that changed what a program does or accepts are on the review list in `PLAN.md` ("Items for the curator", below).

### Rung C

- The design as built: the second set of run-time classes and how the class path chooses it, the payload table's rows, the names that the second set's `LibraryNames` gives, the converters, the raise strings, and each place that names a prelude class at run. Worker and skeptic: `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:612-624`, `:637-675`, `:911`; `bin/fortress_classpath:27-39`; `build.xml:852-872`, `:1236-1251`; `ProjectFortress/src-one/com/sun/fortress/compiler/runtimeValues/LibraryNames.java`; `ProjectFortress/src/com/sun/fortress/compiler/nativeInterface/FortressMethodAdapter.java:77-109`, `:191-198`; `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/Utility.java:28-69`. The detail is C's `REPORT.md`, "The design as built (a point to report)".
- The fourteen compiles in the track: their form, their seconds, and how a run step finds the jars. Worker and skeptic: `ProjectFortress/one_library_tests/OneLibraryComponents.test:2-3`; `ProjectFortress/src/com/sun/fortress/tests/unit_tests/OneLibraryJUTest.java:44`; `ant testFast` on `f3439cf7ce`: 'compile ProjectFortress/one_library_tests/../../Library/FortressLibrary  OK (time = 158813ms)', 300 s for all fourteen. On the merged tree's `ant testOneLibrary`: 'OK (time = 134374ms)' for `FortressLibrary`.
- Hello's run test, failing on the base and passing after with the verifier on; the run tests of varargs, the conditional reduction and the half, each still failing with its wall and row. Worker and skeptic: `junit.sh basehello`: 'NoClassDefFoundError: fortress/FortressLibrary$String'; `ant testFast` on `f3439cf7ce`: 'run ProjectFortress/one_library_tests/OneLibraryRunHello (1433ms) Passed'; `XXXOneLibraryRunVarargs.test` (row 1091), `XXXOneLibraryRunConditionalReduction.test` (row 1099), `XXXOneLibraryRunHalf.test` (row 1098), each back to `XXX` by fork C6.
- The whole compiled tracks and walk's suite: every test that failed after the change, with its cause. Worker and skeptic: `ant testFast` on `1f8a67251d`: the compiler track's `Compiled17a`, 'NoSuchMethodError ... FZZ32.asString()', and the onelibrary track's 5 failures from a `VerifyError` (row 1100), both repaired in `f3439cf7ce`; on `f3439cf7ce` `ant testFast` 'BUILD SUCCESSFUL', 'Total time: 11 minutes 36 seconds', and `ant testSystem` 'BUILD SUCCESSFUL', 879 tests.
- The two stages' tables on the final tree against the comparand, and the planner's measure on a scratch copy of the final tree, with and without its patch. Worker and skeptic: the count table's `diff` against `explorations/compile-ladder/climb-batch-34/gate/checker-count.txt` prints nothing; `distance/compare.sh`: 'DISTANCE SAME   0'; `codegen.sh` under the selection on `f3439cf7ce`: 'refused declarations 0 | emitted (OK lines) 754 | component failures 0', both without the patch and with its one hunk that still applies (`TraitTable.scala`).
- Each sentence of the specification that the change makes false, before and after. Worker: `Specification/appendices/changes.tex:4052-4057` and `:6416-6420` (before `:4052-4054` and `:6413-6414`). Skeptic: `:4053-4057` and `:6417-6420`, corrected in `509181e9c3` to 'can run, as one that prints a line of text does'.
- A file edited beyond those named. Worker and skeptic: `.gitignore:11` (`/ProjectFortress/build-one/`); `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:1010-1037`; `OneLibraryJUTest.java:44`; `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/LibraryObjects.java` (new).
- Fork C3 is followed in the second set only: the first set's `FValue.asString` keeps the prelude's `String`. Worker: `ProjectFortress/src-one/com/sun/fortress/compiler/runtimeValues/FValue.java:22`; skeptic: `:27`, and `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FValue.java:21` as on `a1c244be36`; `ant testFast` on `1f8a67251d`, `Compiled17a`. It is the question of the second entry of `PLAN.md`'s group (below).
- Reserved, a model line: none (`git diff --stat a1c244be36 HEAD -- explorations/run-c4/src explorations/apl/mg` prints nothing).
- Reserved, a prelude test that changed its answer: none. Skeptic: `PreludeRaises`, `PreludeUncaught`, `PreludeUncaughtMessage` and `PreludeSingletonRaise`, compiled on the base (`old-fortress.sh` compile and run) and on the head, give the same lines, e.g. 'FortressException: class fortress.CompilerBuiltin$IntegerOverflow with string Integer overflow'; `ant testFast` on `f3439cf7ce` 'BUILD SUCCESSFUL'. Not filed.
- Reserved, a run test that runs and prints another line than walk: reached. Skeptic: `ProjectFortress/one_library_tests/OneLibraryUncaughtRaise.test:7` pins 'FortressException: class fortress.FortressLibrary$IntegerOverflow with string Bogus value from FValue.asString()' on standard error, where walk reports 'IntegerOverflow' with its context (`old-fortress.sh ... OneUncaught.fss`); its standard output 'REACHED' is walk's; row 1102. The gather adds the skeptic's other such test: `XXXOneLibraryRunHelperRaiseSingleton.test` runs and prints 'FAIL: the caught IntegerOverflow is the object IntegerOverflow' after 'REACHED' (`ant testOneLibrary` on the merged tree), where walk prints 'PASS' (`SKEPTIC.md:35`); row 1103. Both filed, C.reserved.1 and C.reserved.2. The other run tests that reach 'REACHED' and then die with a JVM error (rows 1091, 1099, 1098, 1101, 994) are walls with rows, not another printed line, and are not filed.

## Items for the curator, and where each is in `PLAN.md`

Each item went into `explorations/coordinator/PLAN.md` under "Off the path, parked", in the batch's group "Climb batch 34b, listed for his review" (`PLAN.md:924`), made after climb batch 34's group. None asks for an answer before work on the path can go on: the batch after's first programs, `Arr` and `Dot`, print strings through a number's own `asString` and call no api function that a wider declaration meets (`explorations/compile-ladder/plan-34/probes/programs/Arr.fss:7`, `Dot.fss:13`), and microGPT prints through `println` of a string (`explorations/run-c4/src/MicroGptFlat.fss:81`, `:90`). Several items on one point make one entry.

| Id | Section | Entry |
|---|---|---|
| C.worker.1 | Off the path, parked | `PLAN.md:928`, "C.worker.1 and C.skeptic.1 of climb batch 34b's rung C (row 1098, `CONTESTED`): which export rule holds?": no default on record; as landed, neither rule built |
| C.skeptic.1 | Off the path, parked | the same entry, `PLAN.md:928` |
| C.worker.2 | Off the path, parked | `PLAN.md:929`, "C.worker.2, C.skeptic.2 and C.skeptic.3 of climb batch 34b's rung C, with fork C3 (rows 1101 and 1102): how is `FValue.asString` typed in each set of run-time classes?": default kept, as landed |
| C.skeptic.2 | Off the path, parked | the same entry, `PLAN.md:929` |
| C.skeptic.3 | Off the path, parked | the same entry, `PLAN.md:929` |
| C.skeptic.4 | Off the path, parked | `PLAN.md:930`, "C.skeptic.4 of climb batch 34b's rung C (row 994): fork B2's premise, that only `Arr` and `Dot` meet row 994, does not hold ...": default in the batch after, item 1 of the record's list |
| C.reserved.1 | Off the path, parked | `PLAN.md:931`, "Rung C of climb batch 34b, its reserved points, each a run test against the one library that runs and prints another line than walk ...": the uncaught report's placeholder, as landed |
| C.reserved.2 | Off the path, parked | the same entry, `PLAN.md:931`: the caught exception that is not its object, as landed |

### The gather's own points

None.

### Not put into `PLAN.md`

None.

## Left for the coordinator and the skill writer

- The skill's sentences that C makes false, as C's `REPORT.md`, "Sentences made false", lists them: `.claude/skills/fortress-repo/SKILL.md`, "How a program runs": "a program compiled so does not run yet"; `references/build-and-caches.md`, "The caches": "No compile writes the one library's jars yet, so a program compiled with the variable dies at its first library class: 'NoClassDefFoundError: fortress/FortressLibrary$String' (ledger row 1062)"; `references/tests-writing.md`, "Where a test goes": "Give a plain test there a `compile` command only: a program compiled so does not run yet (ledger row 1062)"; `references/compiler.md`, "What the compiled path cannot compile yet": "With `FORTRESS_LIBRARY=one`, it compiles a varargs parameter, though such a program does not run yet". The map's walkthrough says nothing of the second set. The batch writes no skill text.
- `PLAN.md`'s phase 4 lines that C makes false, for the coordinator's landing: "The code generator over the one library (F-34)" (`PLAN.md:70`), which says that `codegen-measure.sh` patches a scratch worktree first since the tree stops three components whole at row 874; "Varargs (row 624)" (`PLAN.md:71`), which says that its run test waits for the first program that runs on the one library; and the switch rehearsal's line, which names the carriers beyond N5's table as walls (`PLAN.md:72`).
- The planner's measure script, `explorations/compile-ladder/plan-31/probes/planner/codegen-measure.sh:16`: its patch no longer applies whole on C's code (`git apply --check` fails on `NamingCzar.java`, `FortressMethodAdapter.java` and `Naming.java`, C's `REPORT.md`, "The stages"), and under `set -eu` the script's `git apply --check ... && git apply ...` goes on without it; the count needs `FORTRESS_LIBRARY=one` now, as F-34's command says.
- Row 1090's note on its compiled half, which the tool refuses on a closed row ("Rows rewritten and noted", above).

## Revival changes, for the skill writer

The landed rung's "Revival change" section, word for word from its `record.md` (the change and its provenance); its lines are of the branch. The merged-diff review corrected one clause, on `FlatString`, which is no value object.

### Rung C, `rung-first-run-one-library`: the one library's carriers, a second set of run-time classes, and its fourteen components compiled to jars


**The change.** The team's compiled run time had one set of hand-written value classes, each extending a generated class of the compiler's prelude (`ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FBoolean.java:14-15`, `FJavaString.java:14-15`, `FJavaBufferedReader.java:16`), so the compiled path could run only programs compiled against that prelude; its helpers named the prelude's exception classes by their whole names, as `"fortress.CompilerBuiltin$IntegerOverflow"` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:64` at a1c244be36). The tree now builds a second set of these classes, under the same names, for the interpreter's library, and the class path chooses the set by the library that a compile reads; the interpreter's library's `Boolean`, `Char` and `FlatString` and its seven number types are compiled as objects whose classes extend payload classes that hold the JVM value, all of them value objects but `FlatString`, a reference object (`Library/FlatString.fss:32`); a helper names an exception by its simple name, which each set maps to its library's class. Tests: `ProjectFortress/one_library_tests/OneLibraryComponents.test`, `OneLibraryRunHello.test`, `OneLibraryCatchHelperRaises.test`. The reason: the compiler's code generator refused the interpreter's prelude whole at its helpers' wrappers, 'Can't generate header for method floatToString with jvm desc =Ljava/lang/String; stripped = FortressLibrary$String', and a program compiled against it died at its first library class, 'NoClassDefFoundError: fortress/FortressLibrary$String' (the two failing runs of the report); and one build must serve both libraries while the compiler's prelude stays.

**Provenance.** Rung C of climb batch 34b: forks C1 to C6 of `explorations/coordinator/CLIMB-BATCH-34.md`, "Forks the batch takes", with P-33, P-37, P-178, P-164 and P-169; fork C3's typing of `FValue.asString` taken in the second set only, on Compiled17a's failure (the report's decisions).
