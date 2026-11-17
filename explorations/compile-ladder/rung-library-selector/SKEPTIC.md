# Skeptic's review of rung S of climb batch 33: the library selector

Judged head: `b2a6e45cc1` (code and tests `21e155ea9e`, report and record `b2a6e45cc1`). One launch of the skeptic worked this rung; one launch of the worker. REPORT.md and record.md were already on the branch (`b2a6e45cc1`), so the journal step wrote neither file and made no commit.

Verdict: **approved**. The change does what the section asks, test first, and changes nothing measured without the selection. One commit of corrections (`0ac06873fc`): the report's citations and lists, and three ledger entries for what the selection newly shows. No fix is contested. The count and distance tables in REPORT.md are those of the worker's head `21e155ea9e`; my commit changes only prose, so no stage and no suite ran after it.

## What I checked

1. **The stages.** Read from the worker's files: the count table equals `explorations/compile-ladder/climb-batch-31b/gate/checker-count.txt` (`diff` prints nothing; `#total 0`, `#locations 0`, `#crash none`), and
   `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-31b/gate/distance.txt <worker's distance table>` prints `DISTANCE SAME   0`.
   Both `nohup` calls (18:18:03 and 18:22:28) come after the worker's last change of code, its commit at 17:56:05; no Edit or write of code follows it in the transcript. The diff changes no Scala and nothing generated, so the count stage's timing of `compiler.md`, "The checker's time", does not apply, and I ran neither stage.
2. **Test first.** The tests were written at 17:48:56 (call `6f1puP`). The failing run through the harness on the base's code, 17:49:07 to 17:49:09 (call `XpA5fA`), before the first edit (17:49:49) and the first build (17:52:04):

       cd ProjectFortress && FORTRESS_LIBRARY=one old-fortress.sh /home/user/fortress-base37 <old-caches> junit one_library_tests/OneLibraryHalf.test one_library_tests/OneLibraryPrintBig.test one_library_tests/XXXOneLibraryRunHalf.test
       . compile .../one_library_tests/OneLibraryHalf .../OneLibraryHalf.fss:7:6:
           QQ is undefined.
       F. compile .../one_library_tests/OneLibraryPrintBig .../OneLibraryPrintBig.fss:5:21-22:
           Variable big is not defined.
       Tests run: 3,  Failures: 2,  Errors: 0

   The passing run is `ant testFast`, started 17:56:23 on `21e155ea9e`, its onelibrary track: `Tests run: 3, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 58.365 sec`, and `BUILD SUCCESSFUL`, `Total time: 14 minutes 31 seconds`. The XXX test was shown red on a deliberate fix ('Did not see expected failure') and restored (`diff` against the saved copy printed nothing).
3. **The diff, line by line.** `ProjectProperties.compiledPathUsesOneLibrary` (`ProjectFortress/src/com/sun/fortress/repository/ProjectProperties.java:290-291`) reads the property, then the variable, once; only `one` selects. `CACHES` (`:299-302`) takes `${REPOSITORY}/caches-one` under the selection unless `fortress.caches` or `FORTRESS_CACHES` names a folder; without the selection it is the base's expression. `WellKnownNames.compiledPathUsesOneLibrary` (`ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java:149-150`) aliases it; `Shell.useCompilerLibraries()` (`ProjectFortress/src/com/sun/fortress/Shell.java:377-388`) is probe Y's hunk without its `ByteCodeWriter` line (`explorations/compile-ladder/plan-31/probes/probe-y.patch:561-582`). The two scripts (`bin/fortress_classpath:25-31`, `bin/run_classpath:25-31`) match the Java default. In `build.xml`, `cacheOne` stands at the seven places of `cache0` and `cache1` (`:44-47`, `:367`, `:376`, `:531-534`, `:553-558`, `:565`, `:863`); `stampCache` (`build.xml:477-506`) creates the folder with the stamp where its parent holds `configuration`. The track (`:1146-1156`, `:1201-1223`, `:1262`, `:1275-1280`) follows `testLibrary`. The pin of `FORTRESS_LIBRARY` to an empty value does reach the forked JVM: Ant's `Execute.patchEnvironment` puts every `key=value` of the task's environment into the inherited map, an empty value included (`javap -c -p -cp /usr/share/ant/lib/ant.jar org.apache.tools.ant.taskdefs.Execute`, the loop at offsets 41 to 161 ending in `Map.put`).
   The worker's deviation from the section's "WellKnownNames reads FORTRESS_LIBRARY" (decision 1) keeps the rule: read once per JVM, the compiler's name probe Y's. Its reason holds: `compileCommon` compiles `unicode/` (`build.xml:995-1015`), and `OperatorStuffGenerator.java:14` imports `ProjectProperties`, so an import of `WellKnownNames` there would pull `nodes` into that closure.
4. **The precedent.** Probe Y's hunks, `cache0`'s seven sites, and `testLibrary`/`LibraryJUTest` (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/LibraryJUTest.java:28-42`) are the library's ways; the rung invents no device where one exists.
5. **The tests.** Each file holds one comment line and is named by its topic; `OneLibraryPrintBig` names `big`, which only the one library declares (`Library/FortressLibrary.fsi:569`). The XXX run test shares the plain compile test's component, as the section asks ("the same program with its run step"), so a compile failure stays red in the plain test.
6. **My differential** (programs below, each in a scratch folder, the new code with a private `FORTRESS_CACHES`, the old code through `old-fortress.sh`). The rung writes no Fortress state; the reserved point's program has an `atomic` write to a field, run at `FORTRESS_THREADS=1` and `=4`.
7. **The homes.** Row 1062 is home 2 (`XXXOneLibraryRunHalf.test`) with a row; row 1061 a note. My programs measured two more facts and one defect; their homes are in `record.md`, "Ledger" (below).
8. **The ledger and sibling sites.** `ledger.py find --cites` over the six edited files, and finds on selector, caches folder, one library, `useCompilerLibraries`, `FORTRESS_CACHES`: rows 69 and 288 bear on the rung (below). The other readers of the caches folder in `bin/` were two of fourteen in the report (corrected).
9. **The report.** Its five provenance lines opened: the historical line cited `build.xml:47`, the new `cacheOne` property, as evidence that six files are in `a874948ac` (corrected to `git cat-file -e a874948ac:PATH`, exit 0 for each); `.gitignore` is not in `a874948ac` and is rightly not listed. Two citations of files under `tmp/` were replaced. The whole suites ran once on the code head `21e155ea9e`: `ant testFast` `BUILD SUCCESSFUL`, `ant testSystem` `BUILD SUCCESSFUL`; the tracks' counts, summed from the worker's saved results, are 1,694, 86, 263, 471, 3, and 871 for the four shards, the last gate's (`explorations/compile-ladder/climb-batch-31b/gate/summary.txt`) plus the new track's 3. The record's Revival change cites `Shell.java:371-377` and `ProjectProperties.java:283` at `a874948ac`, which say what it states.
10. **Competing declarations.** `git grep` over `ProjectFortress`, `bin`, `build.xml` and `Library` for each new name (`compiledPathUsesOneLibrary`, `OneLibraryJUTest`, `OneLibraryHalf`, `OneLibraryPrintBig`, `XXXOneLibraryRunHalf`, `testOneLibrary`, `cacheOne`, `caches-one`, `one_library_tests`, `onelibrary`, `FORTRESS_LIBRARY`, `fortress.library`) finds only the rung's own lines.
11. **The failure mode.** No loud failure becomes quiet. Two quiet paths are new, both by the worker's decisions: a value other than `one` (decision 2: `FORTRESS_LIBRARY=One` gives `caches`) selects the prelude without a message, so a mistyped selector compiles a program that both libraries accept against the prelude; and `-Dfortress.library=one` in `JAVA_FLAGS` selects the library in the compile's JVM while the scripts take `caches` (the worker's question for the curator), which then fails loudly at the run ('Could not load P').

## My programs and their output

`SkPrelude` (the reserved point: a compiled-path command without the selection):

    object Cell(var v: ZZ32) end
    sq(x: ZZ32): ZZ32 = x x
    run(): () = do
      c = Cell(0)
      for i <- 0#20 do atomic do c.v := c.v + sq(i) end end
      assert(c.v, 2470, "sum of squares"); println(c.v); println("PASS")
    end

| run | old code | new code |
|---|---|---|
| `compile SkPrelude.fss`, then `run SkPrelude` at `FORTRESS_THREADS=1` | `2470`, `PASS`, rc=0 | `2470`, `PASS`, rc=0 |
| the same run at `FORTRESS_THREADS=4` | `2470`, `PASS`, rc=0 | `2470`, `PASS`, rc=0 |
| walk, `FORTRESS_THREADS=4` | `2470`, `PASS`, rc=0 | `2470`, `PASS`, rc=0 |

`SkOnlyPrelude` (`g(v: ZZ32Vector): ZZ32 = 0`, `run(): () = println("prelude only")`), and `SkOneIndex` (`f(i: Index): ZZ32 = 1`, `run()` prints `REACHED`, then `f(3)`):

| command | old code | new code |
|---|---|---|
| `compile SkOnlyPrelude.fss`, `run SkOnlyPrelude` | `prelude only`, rc=0 | `prelude only`, rc=0 |
| `typecheck SkOneIndex.fss` | 'Index is undefined.', rc=255 | 'Index is undefined.', rc=255 |
| `FORTRESS_LIBRARY=one ... compile SkOnlyPrelude.fss` | compiles, runs, `prelude only` | 'ZZ32Vector is undefined.', rc=255 |
| `FORTRESS_LIBRARY=one ... compile SkOneIndex.fss` | 'Index is undefined.', rc=255 | rc=0 |
| `FORTRESS_LIBRARY=one ... run SkOneIndex` | (no jar) | 'NoClassDefFoundError: fortress/FortressLibrary$String', rc=1 |
| `FORTRESS_LIBRARY=one ... typecheck SkOneIndex.fss` | 'Index is undefined.', rc=255 | rc=0 |
| `FORTRESS_LIBRARY=one`, walk of `SkOneIndex.fss` | `REACHED`, `1`, rc=0 | `REACHED`, `1`, rc=0 |
| `JAVA_FLAGS="... -Dfortress.library=one" ... compile SkOneIndex.fss` | | rc=0 |

So without the selection every command does what the base did, at one thread and four; under it the compile and `typecheck` follow the one library, the run dies as row 1062 says, and walk is unchanged.

Grammars, for row 288 (the old code ignores the variable; the new code under the selection with a private caches folder):

| program | old code | new code, no selection | new code, `FORTRESS_LIBRARY=one` |
|---|---|---|---|
| `import FortressSyntax.{Expression}`, `run(): () = println("PASS")` | 'File SkGrammarImport.fss has 1799 errors.' | 1799 errors | rc=0 |
| an api with `grammar Twice extends {Expression}`, `Expr \|:= twice e:Expr => <[ e + e ]>`, imported | 1799 errors | | rc=0 |
| an api with `Expr \|:= over i:Id <- e:Expr do b:Expr end => <[ ((e).loop(fn i => b)) ]>`, imported | 1799 errors | 1799 errors | 'IllegalArgumentException: Parameter 'apiName' to the IdOrOpOrAnonymousName constructor was null', rc=1 |
| `ProjectFortress/syntax_abstraction_tests/ForUse.fss` | 'File ForUse.fss has 1804 errors.' | | the same exception, rc=1 |

Under walk the third program prints `PASS`, rc=0. The exception's stack runs `SId$.apply` ← `TypeWellFormedChecker.check` (`TypeWellFormedChecker.scala:75`) ← `StaticChecker.checkApis` (`StaticChecker.java:126`) ← `TypeCheckPhase.execute`.

## Findings and the corrections (`0ac06873fc`)

All are corrections of the report and the record, settled by the brief's "Citing" ("never cite a file under tmp/") and by `tests-writing.md`, "How a defect is recorded"; none edits the original tree.

1. **The historical line's citation** (`REPORT.md:11`) was `build.xml:47`, the rung's own new property, which shows nothing of `a874948ac`; now the check that shows it, `git cat-file -e a874948ac:PATH`, exit 0 for the six files.
2. **Two citations of files under `tmp/`** (`REPORT.md:61`, the first build's time from a log's birth; `:165`, the distance stage's error file): replaced by the transcript's `nohup` call and by the comparison's output.
3. **The readers of the caches folder in `bin/` that do not follow the selection** (`REPORT.md:93`, `:188`; `record.md`, line 2) were `bin/runOpt` and `bin/BytecodeOptimizeCompilerTests`. They are fourteen: also `bin/BytecodeOptimizeEverything.sh:17` (called with `runOpt` from `FileTests.java:1127-1134` when `fortress.unittests.noopt` is false), `bin/runOptCollect:32`, `bin/debugOpt:28`, and the nine scripts of `bin/comp/` (`fcompile`, `fcomponents`, `fconstrain`, `fextract`, `finfo`, `flink`, `fremove`, `frun`, `fupgrade`, each at `:19`, `FHOME=$FORTRESS_HOME/default_repository/caches/bytecode_cache`). None runs in a suite.
4. **The skill's statements made out of date** (`REPORT.md`, "Sentences of the specification made false"; `record.md`, line 8) lacked two: `tests-writing.md`, "Where a test goes, and how it passes", and `tests-running.md`, "Compiled tests", list the compiled test folders without `one_library_tests/`.
5. **Row 69** says `fortress typecheck` checks against `CompilerLibrary.fsi`. Under the selection it reads the one library (the `SkOneIndex` lines above). A note in `record.md`, "Ledger" (`ledger.py note 69 TEXT --check`: fits).
6. **Row 288** says a program that imports a grammar cannot be compiled. Under the selection `import FortressSyntax.{Expression}` compiles, and a plain grammar too. Its notes have 37 characters left, so the note in `record.md` points to row 1063; a longer one needs a rewrite of the row.
7. **Row 1063, a defect my programs measured:** under the selection, a grammar api whose template binds an `Id` gap as a function's parameter crashes the compiled checker on the api (the table above). It is a wall that only the one library shows, of the kind P-33 meets one rung at a time; not this rung's to repair. Home 3, the row only: the specification says nothing of grammars (`Specification/advanced/domain-specific-languages.tex`, chapter "Support for Domain-Specific Languages", is a note that it will include the mechanism; row 288 cites it `silent`), and no gated test passes while the checker crashes (a plain compile test fails on an exception, 'UNEXPECTED exception': `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:368-369`). The row, with the commands and the message in its notes, is in `record.md`, "Ledger" (`ledger.py check --rows`: only the number rule fails).

## Where I differ from the worker's account

- **Decision 8, the track's class without the selection.** `testFast`'s misc track leaves `OneLibraryJUTest` out (`build.xml:1262`), but the team's sweeps `testUntil` (`build.xml:1285-1320`) and `testCruiseControl` (`:1358-1397`, which `testNightly` runs) include `**/*JUTest.class` without the selection, so each now reports one failure, 'one_library_tests runs only where FORTRESS_LIBRARY=one selects the one library'. No suite of the gate and no tool of the record runs them. I made no change: excluding the class there would drop the track from those sweeps silently, and nothing on record chooses between the two; it is listed for the curator.
- **The specification.** I read `Specification/appendices/changes.tex:4608-4609` ("The compiled path still compiles programs against its own library, which declares no Index, until it is switched over to the interpreter's.") against `SkOneIndex`: under the selection a program that names `Index` compiles, but it cannot run, and the default is the prelude. I agree with the report that the sentence stays true of the compiled path, which is not switched over; none is made false.

## The points to report

The worker's five stand as listed in `REPORT.md`, "Points to report", with the corrections above to point 2. The reserved point, a change of what a compiled-path command does without the selection, is not reached: `SkPrelude`, `SkOnlyPrelude` and `typecheck` of `SkOneIndex` give the base's output on the new code, at one thread and four.
