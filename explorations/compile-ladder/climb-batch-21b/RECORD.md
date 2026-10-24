# Climb batch 21b: the gather's record

Written at the gather stage of climb batch 21b (2026-10-23), the second run of `explorations/coordinator/CLIMB-BATCH-21.md` (rungs C, E and D), on `main` from the base `aa5c67d481ea9982f3af3a6a53685bc86801f454`. `main` was at the base when the gather began, and no other commit came to it while the gather worked. Every rung was approved by its skeptic, with no contested fix, no judge and no repair round. Nothing was merged: each branch stays as it is, `wip/rung-symbolic-check` at `35e225ce8`, `wip/rung-export-align` at `3f7008d16`, `wip/rung-team-demos` at `8cd8ef6b7`.

**Preconditions.** `git status --porcelain` printed nothing, and `aa5c67d48` is an ancestor of `HEAD` (`git merge-base --is-ancestor`, exit 0). `ledger.py landing-check aa5c67d481ea9982f3af3a6a53685bc86801f454` on the base printed "aa5c67d48..HEAD: no finding"; `record.py check --base aa5c67d48` "0 failures".

**Scratch.** The patches are `tmp/gather/<slug>.patch` in the main tree, each `git diff aa5c67d48...<branch>`. The rung commits were composed on `main` itself, each patch applied with `git apply --3way --index`, its record folded and its commit made before the next patch was applied, so no rung's staged change sat in the index while another rung's record was folded. For the closing tests a tree was seeded outside the main tree from the batch's base build, `explorations/coordinator/tools/seed-worktree.sh /home/user/fortress-base21b /home/user/fortress-gather21b - aa5c67d481ea9982f3af3a6a53685bc86801f454` ("seeded from /home/user/fortress-base21b (24919e97d) in 3 s"; the base build's code is the base's). Nothing was built or run in the main tree or in the base build. In the gather tree the three patches were applied together, in the order below, with `git apply --3way --index` (no conflict), and built: `ant compileAll` ("Caches /home/user/fortress-gather21b/default_repository/caches started again, empty", "BUILD SUCCESSFUL", "Total time: 26 seconds"), then the library order (five compiles, each `rc=0`, five jars in `default_repository/caches/bytecode_cache/`). The code and tests the closing tests ran on are `main`'s: the gather tree's index, written as a tree (`git write-tree`, `7b6a35220`), against `main` after the three rung commits, `git diff --stat 7b6a35220 5e60e356a -- Library ProjectFortress Specification build.xml bin`, prints nothing.

## The landed commits

| Order | Rung | Branch | Commit on `main` |
|---|---|---|---|
| 1 | C, `rung-symbolic-check` | `wip/rung-symbolic-check` at `35e225ce8` | `108ab82d6` |
| 2 | E, `rung-export-align` | `wip/rung-export-align` at `3f7008d16` | `031c38bbc` |
| 3 | D, `rung-team-demos` | `wip/rung-team-demos` at `8cd8ef6b7` | `5e60e356a` |
| | the rows' closes | | `5ef2e93f3` |

## The order the rungs were applied in

C, E, D: the manifest's order. No rung declares `landsOnlyWith`, so the first rule orders nothing. No two rungs share a file: `comm -12` of the sorted lists `git diff --name-only aa5c67d48...<branch>`, taken pairwise and all together (`sort | uniq -d`), prints nothing. So the second rule orders nothing either, and the rungs keep the manifest's order, as the batch record has it ("Run 2's rungs share no file", `explorations/coordinator/CLIMB-BATCH-21.md:454`). Each patch applied with `git apply --3way --index` and no conflict, each file cleanly or after git's fallback to direct application, on the trial tree and when composed. The order moves no line of a file a rung edits: no other rung edits it, so each rung's own lines are `main`'s.

**Lines moved** (the merged-diff review's correction of the sentence above as the gather wrote it, "No hunk of one rung moves a line that another rung's record cites"). A rung's files also cite lines of files that another rung edits, and those lines move on `main`. As in climb batch 21 (`compile-ladder/climb-batch-21/RECORD.md`, "Lines moved"), the folded record cites `main`'s lines, and the rung files (`REPORT.md`, `SKEPTIC.md`) cite their own rung's tree and are not re-anchored in place. The moves on `main`:
- Rung C's prelude hunk takes the top-level `=` and its blank line out of `Library/CompilerLibrary.fss` (`:314-315` at `aa5c67d48`), so rung D's `z DIV 2` lines are two higher: `Library/CompilerLibrary.fss:364`, `:378`, `:388`, `:396` (`rung-team-demos/REPORT.md` section 5; `SKEPTIC.md` section 1, items 4 and 9) are `:362`, `:376`, `:386`, `:394`.
- Rung C's Effect sentence in Appendix I's "Overloading with static parameters" is two lines longer (`Specification/appendices/changes.tex:2918-2923`), so rung E's `changes.tex:3232` (`rung-export-align/REPORT.md` section 9; `SKEPTIC.md` section 1, "The specification") is `:3234`; `:1698` stands.
- Rung E's api text moves rung D's api lines: `Number`'s `asFloat` `Library/FortressLibrary.fsi:289` is `:290`, `Integral`'s `DIV` `:461` is `:462`, both now written `abstract`, and `nanoTime` `:2546` is `:2569` (`rung-team-demos/REPORT.md` section 5; `SKEPTIC.md` section 1, item 9).
- Rung E's api text also moves the api lines of three FACTS entries that no report listed, re-anchored by the review: F-44's `:121-123` and `:961` are `:122-124` and `:979`, F-58's `:283` and `:365-366` are `:284` and `:366-367`, and F-276's `:2507-2528` are `:2530-2551`.
- One citation of the revival changes below, checked and not a move: rung E's quotation of the matching rule stands at `Specification/basic/components/apis.tex:252-256`, as its record gives it; `:250-251` hold the sentence before it, "A component must include, for every \apiN\ $A$ it exports, matching definitions for all the declarations in $A$."

## The tests on the merged tree

From `/home/user/fortress-gather21b`, the three patches on `aa5c67d48`, whose code and tests are `main`'s:
- `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh merged21b ProjectFortress/compiler_tests` with every `.test` file of `compiler_tests/` that rungs C and E add or change (C's eleven, E's eight) and C's two range guards, `RangeEqRungJLink.test` and `XXXRangeEqRungJ.test`, 21 files:
  `# junit.sh merged21b 2026-10-23T22:41:15Z; nproc 4; Intel(R) Xeon(R) Processor @ 2.10GHz; 2100.000 MHz; load at start 0.04 0.31 0.56; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; ...`
  `. typecheck ProjectFortress/compiler_tests/ComprisesWhereFunctionalMethodChecker  OK (time = 1808ms)`; `. compile ProjectFortress/compiler_tests/XXXSymbolicOperatorOverloadUnrelated ...` / ` Saw expected failure`; `. run ProjectFortress/compiler_tests/ExportComprisesEllipsisAbstract (345ms) PASS`; `. run ProjectFortress/compiler_tests/XXXFunctionalMethodComprisedObject (266ms) REACHED` / `Saw expected failure (Exit code != 0)`
  `OK (25 tests)`
- `explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/gather/h1 ProjectFortress/tests/Generator22DRects.fss`:
  `# harness-one 2026-10-23T22:42:01Z; tree aa5c67d48; nproc=4; load 0.32 0.37 0.57; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache empty`
  `. interpret tmp/gather/h1/tests/Generator22DRects` / `PASS` / ` OK (time = 10877ms)`
  `OK (1 test)`
- `bash tmp/gather/run-demos.sh tmp/gather/demos`, rung D's demo driver as its `REPORT.md` section 13 gives it, from 22:45:26 to 23:14:06 UTC, under `nice -n 19`, `FORTRESS_THREADS=1`, nproc 4:
  `demos: 52 run, 52 reached their end`
  Among them, each a closed row's: `BiCGSTAB` and `BiCGSTAB2`, 'elapsed time … ns ( … s)' (791); `BirdCount1z`, `BirdCount2a` 'Merged Events:' and `npbft` '  Checksum 1 : 570.4182371381474+385.43365014877793i' (670); `HeapShakedown`, its tables (449); `mg`, 'L2 Norm is 0.0' (464); `DemoGenerator22D` (468); `trips`, its trips (710's demo under walk). So rung C's checker and rung E's api, which walk reads, move no demo.
- The checker's driver over `trips.fss`, as rung D's `REPORT.md` section 13 gives it (the shadows made from the tracked sources by `shadow-patch.py` and `add-patch.py`, which matched; then `DistanceMulti -order check -setting any ProjectFortress/demos/trips.fss`), 23:14:36 to 23:15:37 UTC:
  `driver rc=0`
  `@@SC STAGE	component trips	acyclic	errors=0`
  `@@SC STAGE	component trips	typecheck	errors=18`
  `@@TC COMPONENT	trips	errors=54`
  the rung's after-run, with rung C's checker beside it: no self-type error (row 710), and row 817's refusals as filed, 'Cannot assign to immutable variable: approx' at `trips.fss:76`, the three 'Missing parameter type for' functions, the `TryChecker` bug at `:280-298` and the overloading stage's `OptionUnwrapException`.
- Each closing test passed there: `XXXSymbolicOperatorOverloadUnrelated` (584), `XXXNoDuplicatesRuleSelfPositionsOperator` (726), `ComprisesWhereOverrideChecker` (775), `ComprisesWhereFunctionalMethodChecker` with `XXXComprisesWhereFunctionalMethodBounds` (809), `OperatorPrefixInfixImport` (810; the library order above is the prelude's half), `ImportExceptOverload` with `ImportExceptByName` (811), `XXXExportMemberName` (800), `XXXExportFieldName` with `ExportVarFieldMatchesField` (801), `ExportComprisesEllipsisAbstract` (802), `Generator22DRects` (468); the demo runs for 791, 670, 449 and 464, and the driver's run over `trips.fss` for 710 (above).

**The interaction check.** The rungs share no file. C and E both change the compiled checker, in different files and phases: C the overloading check (`OverloadingChecker.scala`) and the analyzer's reading of a self type (`TypeAnalyzer.scala`, `TypeSchemaAnalyzer.scala`), E the export check (`ExportChecker.scala`), which still reads `isDeclaredName` and not C's `isCheckedName` (row 782 stays latent, as both skeptics found). C changes the compiler's prelude in `Library/CompilerLibrary.fsi` and `.fss`, E in `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss`; the library order compiled both together. E changes walk's api, `Library/FortressLibrary.fsi`, which the demos import; the demo run above is on that api. D changes only demos, walk's `Library/Generator22D.fss` and a walk test. Each rung's compiled tests pass together in one JVM on the merged tree. No suite, count or distance stage was run by the gather: the gate measures the merged tree. The gate's compiler track should count 1,315: the landed 1,293 (`explorations/compile-ladder/climb-batch-21/gate/summary.txt:2`), rung C's 13 new cases (its testQuick's 1,303 less 1,293, and the three it added after: `XXXFunctionalMethodMeetOperatorChecker`, `XXXImportExplicitHidesOnDemand`, `XXXImportExceptOperator`; C's skeptic's 1,306 counts C alone) and rung E's 9 (its skeptic's testQuick, 1,302).

## Rows opened

Numbered by `ledger.py add` in the order the rungs were applied, each rung's rows in the order of their placeholders, each in the section its record names or its class fits, as its record wrote it (each passed the template as written). Each placeholder was replaced by its number in the rung's `REPORT.md` and `SKEPTIC.md` (as "row N"), in the rows' own sibling lists, and in the FACTS entries, PLAN entries, handover lines and revival changes below, before the rung's commit; no test and no specification text cited one.

| Row | Placeholder | Rung | Section | Status | Claim, in short |
|---|---|---|---|---|---|
| 809 | NEW-C-1 | C | 2 | closed in `5ef2e93f3` | the compiled checker crashes on a functional method of a trait whose `comprises` clause lists a type at a type `where`-clause variable, read outside the trait ('E is not in the kind env') |
| 810 | NEW-C-2 | C | 5 | closed in `5ef2e93f3` | the overloading check reads an api's declarations of an operator once for each name of the api with the operator's text, so an api with a prefix and an infix `-` makes each `-` a duplicate of itself |
| 811 | NEW-C-3 | C | 5 | closed in `5ef2e93f3` | the overloading check ignores an on-demand import's `except` clause |
| 812 | NEW-C-4 | C (its skeptic) | 12 | open, `NEGATIVE-VERIFIED`, no gated test (a crash) | the code generator crashes, before its refusal of a `where` clause (row 701), on a generic trait that defines a member of a trait listing a type at a `where`-clause variable in its `comprises` clause |
| 813 | NEW-C-5 | C (its skeptic) | 5 | open, `XXXImportExplicitHidesOnDemand` | the compiled path reads a name imported by name from one api also on demand from another |
| 814 | NEW-C-6 | C (its skeptic) | 5 | open, `XXXImportExceptOperator` | an `except` clause that lists an infix operator leaves it imported, on both paths |
| 815 | NEW-E-1 | E | 3 | open, `XXXFunctionalMethodComprisedObject` | compiled, a functional method of a trait that comprises an object, called on a value whose static type is the object, dies at run time with `NoSuchMethodError` |
| 816 | NEW-E-2 | E (its skeptic) | 3 | open, `CONTESTED`, `ExportAbstractMemberAbsent` | the export check accepts a component whose trait leaves out a member its api declares `abstract`, or declares it at another header, and a client's call of it dies with `NoSuchMethodError` |
| 817 | NEW-D-1 | D | 3 | open, `NEGATIVE-BOUNDED`, reproducer `ProjectFortress/demos/trips.fss` | past row 710, the compiled checker's driver still refuses the team demo `trips.fss`, which walk runs: 18 typecheck errors |

## Rows closed

Each by `ledger.py close N --commit <the rung's commit on main> --test <the test>`, after its test passed on the merged tree as the rung last ran it, in `5ef2e93f3`:
- Rung C, `108ab82d6`: 584 (`XXXSymbolicOperatorOverloadUnrelated`, with the stages beside it, as the rung measured them: distance 5, count 3, '#crash none'); 726 (`XXXNoDuplicatesRuleSelfPositionsOperator`, its key respelled to the checker's refusal); 775 (`ComprisesWhereOverrideChecker`); 809 (`ComprisesWhereFunctionalMethodChecker`, the bounds path by `XXXComprisesWhereFunctionalMethodBounds`); 810 (`OperatorPrefixInfixImport`, with the prelude's library order); 811 (`ImportExceptOverload`, with `ImportExceptByName`).
- Rung E, `031c38bbc`: 800 (`XXXExportMemberName`); 801 (`XXXExportFieldName`, the close's note naming its repair's own guard, `ExportVarFieldMatchesField`, the skeptic's fix `13cf0b5ec` on the branch); 802 (`ExportComprisesEllipsisAbstract`).
- Rung D, `5e60e356a`: 468 (`Generator22DRects`); 791, 670, 449 and 464 (`none`, their notes the demo runs, the rung's and the merged tree's); 710 (`none`, its note the driver's run over `trips.fss`, 'acyclic errors=0', and row 817).

Row 611 is not closed: its checker half is repaired by rung C (`XXXFunctionalMethodMeetOperatorChecker`), and its line, rewritten in `108ab82d6` from rung C's record, states walk's half, which stays open (fork 17). Row 481 stays open, rewritten in the same commit: a compiled range's `=` is now `Equality`'s identity, so `r = r` is `true`, and `(1:3) = (1#3)` is still `false` (`XXXRangeEqRungJ`).

## Each rung

### C (`rung-symbolic-check`), landed first as `108ab82d6`

**From the branch.** `REPORT.md` and `SKEPTIC.md` land; `record.md` was folded and does not. The skeptic's `172e1d35a` wrote the worker's `REPORT.md` and `record.md` from the run's journal; no repair round, and the gather wrote no file from the journal.

**Skeptic's fixes**, all corrections in `208c1aca0`, none contested, no ruling:
- Test (2)'s program still does not compile on the head: it stops in the code generator, 'SkTest2Copy.fss:11:33: E is not in the kind env [][]', from `TypeAnalyzer.lteq` in `STypesUtil.removeIdenticallyCoveredMethods` (`ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1587`), called by `CodeGen.<init>` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:485`), with row 701's 'Can't compile TraitDecl' behind it; recorded as row 812, its departure named in the Revival change.
- A name imported by name from one api is still read on demand from another (`SkExplicitImport`, refused on old and new code, 'There are multiple declarations of pick with the same parameter type: SkApiA.P'; walk runs it, 3): row 813 with the gated `XXXImportExplicitHidesOnDemand`.
- An `except` clause that lists an infix operator leaves it imported, on both paths ('got 1' compiled and under walk; a component's own `-` then stops the code generator, 'apparently malformed overload set not rejected'): row 814 with the gated `XXXImportExceptOperator` and its api.
- A wrong citation: `Specification/advanced/overloading.tex:125-130` for "operator declarations must satisfy the overloading rules"; the passage is `Specification/basic/operators/intro.tex:23-25`.
- `REPORT.md` section 8 missed four sentences (F-80's title and its "Unchecked" sentence, F-81's skip sentence, F-223's "It checks no symbolic operator" sentence, P-155's "Today ..." sentence), and the record's FACTS hand-over three of them.

**Folded.** F-281 ("The compiled checker checks the overloading of every operator, symbolic ones included; ...") at the end of "The checker and the one library", its record's text with rows 812 to 814 named. Rows 809 to 814 added; rows 611 and 481 rewritten with the record's lines (1,127 and 924 characters); rows 584, 726, 775, 809, 810 and 811 closed. C.skeptic.1 in `PLAN.md`.

**Corrections.** The skeptic's three `leftForGather` items:
- F-80, F-81 and F-223 rewritten by `record.py` in `108ab82d6`: F-80's title loses "unless their name is a symbol" and its "Unchecked" sentence its symbolic operators, the checker now checking every operator (F-281); F-81's skip sentence becomes the check of every operator, gated for the symbolic operators by the distance stage; F-223's "It checks no symbolic operator (row 584); such a pair passes it and stops the code generator (row 726)" becomes the checker's refusal, 'There are multiple declarations of || with the same parameter type: (S)', and its "departure" test the symbolic operator's case. Beside them F-245, whose title loses "the checker as built skips these operators (row 584)" and whose body now says that the distance stage is the full check, the full-check stage's shadow no longer matching the tree (the skeptic's finding 7).
- Rows 812, 813 and 814 added, as above.
- The gate's compiler track: the skeptic's 1,306 is rung C's alone; with rung E's 9 cases, 1,315 (above, "The interaction check").

`REPORT.md` section 8's one sentence of the specification, Appendix I's Effect in "Overloading with static parameters" (`Specification/appendices/changes.tex:2918-2923`), the rung corrected itself (`fe33191f7`), and the gather's reading agrees with it against the code (`OverloadingChecker.scala:766-773`; walk's `checkedName`, `OverloadedFunction.java:1990-1994`). Beyond the report's list, the gather's grep of FACTS for the skip found five more entries made false, each rewritten in `108ab82d6`: F-50's "its overloading check never reads a pair of symbolic operators such as `+` (P-155, row 584)" (removed); F-82's "which the checker skips as operators whose names are symbols (row 584), have no meet in the ranges" (now: need none since the index bound, F-278); F-142's "as the compiled checker skips them" (now: though the compiled checker checks them); and F-276's and F-278's tests, "the full-check stage, `perf-probes/symbolic-operators-2/run-shadow.sh ...`", whose shadow no longer matches the tree (now: the distance stage, which checks every operator). Left as they stand: P-155's "Today ..." sentence, a decision's text (C.skeptic.1), and walk's source comment `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:1894-1895`, "The names checked are those the compiled checker checks (OverloadingChecker.isDeclaredName)", which no test reaches and which the rung lists for the next edit of that file; the batch edits no walk code.

### E (`rung-export-align`), landed second as `031c38bbc`

**From the branch.** `REPORT.md` and `SKEPTIC.md` land; `record.md` was folded and does not. The skeptic's `9c37973f6` wrote the worker's `REPORT.md` and `record.md` from the run's journal, the harness having refused the worker's write; no repair round.

**Skeptic's fixes**, one defect and two corrections, none contested, no ruling:
- `9c37973f6` (correction): `REPORT.md` and `record.md` written from the journal with `journal-text.py`.
- `13cf0b5ec` (defect, settled): at `18179f051` the check compared all of a field's modifiers, so it refused a component's `var x: ZZ32 := 1` for an api's `x: ZZ32` ('different field x'), which the base accepted, while it accepted `x: ZZ32 := 1`; the parser puts `var` into the modifiers (`NoNewlineHeader.rats:264`) and `:=` only into the mutable flag (`Variable.rats:92`). `equalLValue` now leaves `Modifiers.Var` out of both sides (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:846`); test `ExportVarFieldMatchesField`.
- `616956284` (correction): `REPORT.md:88` cited the base's `ExportChecker.scala:623` (the head's `:632`); `REPORT.md:19` gives row 801's citation at `18179f051` and after the fix; the record's finding 1, FACTS entry and Revival change say "modifiers other than `var`"; findings 7 and 8 and row 816 added.

**Folded.** F-282 ("The compiled export check matches an api's members by name and header and reads `abstract`, and the `FortressLibrary` export error names 15 traits and objects.") at the end of "The checker and the one library", with a sentence on row 816 added. Rows 815 and 816 added. Row 770's note, which `ledger.py note` refused at the row's length (1,321 characters with it), written by a rewrite that cut the row's notes to what holds now (1,195 characters), row 815 among its siblings. Row 782: no note, as the record and its skeptic found by reading. Rows 800, 801 and 802 closed. E.skeptic.1, E.worker.1 and E.skeptic.2 in `PLAN.md`.

**Corrections.** The skeptic's two `leftForGather` items: rows 815 and 816 added; rows 800, 801 and 802 closed, `ExportVarFieldMatchesField` named in row 801's close as its repair's guard. `REPORT.md` section 9 lists no sentence of the specification made false, and the gather's reading agrees: Appendix I has no entry on the export check, and `Specification/basic/components/apis.tex:250-257` and `source-code.tex:381-385` state what the check now does; Part IV renders the api (`Specification/library/default-libraries.tex:27`). Its record sentences: rows 800 to 802's claims, closed; F-63's `Library/FortressLibrary.fsi:915` and `:398`, now `:933` and `:399`, and F-35's `:1225`, now `:1243`, rewritten in `031c38bbc`. Beyond its list, the gather's grep found F-83's "among its differences, its `extends` clause differs, and the component lacks members that the api lists", which `String`'s entry no longer names (rung S of the first run took out its `extends` clause difference, this rung its missing members): now its `size` method and its `excludes` clause, rewritten in `031c38bbc`. The export probe's '43 entries' and '115 differences' (`explorations/perf-probes/export-check-full/REPORT.md:7`, `:21-23`) are its measurement on its base, and stay. The open ledger rows that cite `Library/FortressLibrary.fsi` below line 102 without a commit now point a line or more below their target, as climb batch 21's review.1 found for that batch (`PLAN.md`, "Climb batch 21, listed for his review"); the gather re-anchored none.

### D (`rung-team-demos`), landed third as `5e60e356a`

**From the branch.** `REPORT.md` and `SKEPTIC.md` land; `record.md` was folded and does not. The skeptic's `3c35f4416` wrote the worker's `REPORT.md` and `record.md` from the run's journal byte for byte, the harness having refused the worker's write; no repair round.

**Skeptic's fixes**, two corrections, none contested, no ruling:
- `3c35f4416`: `REPORT.md` and `record.md` written from the journal with `journal-text.py` (both exit 0).
- `18755d351`: `REPORT.md:5` cited the probe's base run as its `:60-96`, whose section 2 is `:60-90`; `REPORT.md:168` said 17 demos call `nanoTime()`, where `grep -l` prints 16 (two of the 42 calls, `trips.fss:238-239`, inside a comment); `REPORT.md:279`'s driver text had a four-field summary line where the script that ran writes five; row 817's notes gave file:line without their commit (now "at 3cd33d0b0", sibling 621 added); the Revival change stated the team tree's `rects` stop without saying it is by reading.

**Folded.** F-283 ("All 52 programs of the team's `DemoTests` reach their end under walk.") at the end of "The harness and the gate", with row 817 named, and F-284 ("Under walk, `Generator22D`'s `rects` gives every contiguous rectangle of an `Array2` once.") at the end of "The library's arrays and algebra". Row 817 added. Rows 468, 791, 670, 449, 464 and 710 closed, the last five with `--test none` and the record's notes, row 817's number put in row 710's. D.worker.1 and D.skeptic.1 in `PLAN.md`.

**Corrections.** No `leftForGather` item. `REPORT.md` section 9 lists no sentence of the specification made false, and the gather's reading agrees. Beyond it, the gather's grep found two FACTS sentences the rung makes false, each rewritten in `5e60e356a`: F-225's "The rule refuses, rightly, two team declarations, each an open row: the demo `trips.fss`'s `generator` (row 710) and `PureList`'s `List` (row 355)" (now `PureList`'s `List` alone, `trips.fss`'s `generator` extending `StandardTotalOrder[\generator\]` since its repair), and F-158's "A demo still passes a function to `fill` (row 464)" (removed). P-79's list of "the demos known to fail today" (rows 670, 710 and 791) is the curator's text, which the batch record leaves to the coordinator after run 2 (below, "FACTS and POSITIONS left for the coordinator").

### Text mismatches

None. Only rung C edits the specification, its Appendix I Effect on the overloading check, which neither E's code (the export check) nor D's (demos and walk's `Generator22D`) touches; the gather's reading of the Effect against the merged code agrees (above). No record entry of one rung is made false by another's code.

## Files written from the journal

None by the gather: every branch carried its `REPORT.md`, `record.md` and `SKEPTIC.md`, no `SKEPTIC.md` was only the word "committed", and no rung had a repair round. On the branches, each skeptic wrote what the harness had refused its worker from the journal with `journal-text.py`: C `172e1d35a`, E `9c37973f6`, D `3c35f4416` (`REPORT.md` and `record.md` each).

## The rungs that did not land

None: every rung of the batch was approved.

## Ledger notes

Every note a record asked for is written: row 770's (E) by rewrite, its notes cut to fit; rows 611 and 481 (C) by the records' own rewrite lines. The batch record's note for row 782 (E) was not asked for by the rung, its measurement not moving by reading (`compile-ladder/rung-export-align/REPORT.md` section 8). No note was refused and left out.

## Handover lines

Each rung's handover line, as its record gives it, with the rows' numbers put in. The hashes in them are the branches'; each rung's commit on `main` is in the table above.

**C.**

Climb batch 21b rung C (rung-symbolic-check), branch `wip/rung-symbolic-check` at `ed4782762`:
- the compiled checker checks every symbolic operator (P-155, row 584);
- the `AnyList` crash (row 809, row 775), the double count (row 810) and the ignored `except` (row 811) are repaired;
- the prelude's range `=` is now `Equality`'s identity;
- distance 5, count 3, '#crash none';
- testQuick 1303/86/263 green; the ladder and the microGPT phases are unchanged;
- count stage: base 120 s, change 107 s, pass 94 s, with the same results.

**E.**

Rung E (climb batch 21b) is on `wip/rung-export-align` at `18179f051`: the export check follows `apis.tex` (rows 800 to 802 and 4i), `FortressLibrary.fsi` carries the 4h text with its follow-on and `Array2`'s subscripts, the export error has 15 entries at distance 5, one prelude line (`CompilerBuiltin.fss:1170`) and row 815 filed with its expected failure.

**D.**

Rung D is in on its branch at `3cd33d0b0`. With the demos probe's patch, row 710's line and the new `GenomeUtil2d.fsi`, all 52 team demos of `DemoTests` reach their end under walk on the first run's landed tree. `Generator22D`'s `rects` halves by `DIV`, with its walk test `Generator22DRects`. Rows 791, 670, 449, 464, 468 and 710 close. The checker's other refusals of `trips.fss` are row 817, open, with the curator's question on item 247's reach. Neither stage ran, no suite ran, and the ladder subset is empty.

## Points to report

None holds the push: every point below is reversible, and the gather took no step that cannot be undone or that acts against a decision on record. Where the worker and the skeptic listed one point twice, it is listed once, with both measurements where they differ. Lines are on the rung's tree, which are `main`'s (no two rungs share a file).

Rung C:
- The probe's shadow, taken as it is, without its catch wrappers: `isCheckedName` in the three loops, `isDeclaredName` unchanged for the export check (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:270`, `:396`, `:405`, `:766-773`).
- Where the crash lay, and whether its path ran through the first run's exclusion arrows: in `TypeAnalyzer.removeSelf`'s reading of a `where`-clause comprises trait's self type outside the trait, at the overloading check and at a call, with a second path through rung X's `withBounds`; not through X's exclusion arrows, since `FunctionalMethod.selfFromBound` is false for a trait with a `comprises` clause (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:579`, `:604-622`; `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeSchemaAnalyzer.scala:470-471`; `ProjectFortress/src/com/sun/fortress/compiler/index/FunctionalMethod.java:48-54`; `ProjectFortress/compiler_tests/XXXComprisesWhereFunctionalMethodBounds.fss:7-12`).
- The prelude's repair (fork 15): `GeneratorZZ32`'s header in api and component gains `extends Equality[\GeneratorZZ32\]` and excludes `Number`, `Character` and `String`; the always-false `opr =(left:GeneratorZZ32, right:GeneratorZZ32)` removed from both; a compiled `r = r` is now `true`; `HasRank` (`Library/CompilerLibrary.fsi:266-274`) is the library's own precedent (`Library/CompilerLibrary.fsi:111`, removed `:129`; `Library/CompilerLibrary.fss:301`, removed `:314`).
- Each compiled test whose verdict changes (fork 16): row 726's `XXXNoDuplicatesRuleSelfPositionsOperator`, before green on the code generator's 'Likely bug in static analysis', after green on the checker's 'There are multiple declarations of || with the same parameter type: (S)', its key respelled; no other verdict of the three tracks moved, and every expected-failure test carries an error or exception key (`ProjectFortress/compiler_tests/XXXNoDuplicatesRuleSelfPositionsOperator.test:3`; `ant testQuick` 'Tests run: 1303, Failures: 0, Errors: 0').
- The stock tables before and after, and the three units' `||` checks: count 3 to 3 (diff silent), distance 5 to 5 ('DISTANCE SAME   5'), the five rows equal, the export error's 43 entries to 43; against the base's full check 'landed 191 now 5', none come; no crash line; the three units' `||` checks find nothing (`explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-21/gate/distance.txt <the rung's distance table>` printed 'DISTANCE SAME   5').
- The count stage's seconds: the worker's base 120.2 s (load 6.88), change 107.5 s (6.77), pass 94.3 s (1.83), and a later pair, base 84.4 s (0.24) and pass 96.8 s (0.85); the skeptic's base 78.1 s and head 98.3 s ('real 1m18.097s', 'real 1m38.309s'); base, change and pass tables equal, and `run.txt` equal with tree paths masked.
- The new rows and their tests: rows 809 (`ComprisesWhereFunctionalMethodChecker`, `XXXComprisesWhereFunctionalMethodBounds`), 810 (`OperatorPrefixInfixImport`) and 811 (`ImportExceptOverload`, `ImportExceptByName`), all closed; the skeptic's rows 812 (row only, a code-generator crash), 813 (`XXXImportExplicitHidesOnDemand`) and 814 (`XXXImportExceptOperator`), all open (`ProjectFortress/compiler_tests/ComprisesWhereFunctionalMethodChecker.test:1`, `OperatorPrefixInfixImport.test:1`, `ImportExceptOverload.test:1`).
- Every sentence made false: the `changes.tex` Effect sentence (corrected by the rung), F-245's title clause, F-80's title and its "Unchecked" sentence, F-81's skip sentence, F-223's "It checks no symbolic operator" sentence and its departure test, P-155's "Today ..." sentence, rows 584, 726, 611 and 481, and walk's source comment; each corrected or closed by the gather but P-155's (C.skeptic.1) and the comment (above, rung C's corrections) (`Specification/appendices/changes.tex:2918-2923`; `explorations/coordinator/POSITIONS.md:66`; `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:1894-1895`).
- A ladder file or microGPT component whose phase or first error changes: none; the 85 gate rows have equal phase and first error; three UP against the baseline (`NatReflectTest`, `genericTest1`, `genericTest2`) predate the rung, the same on the old code; the eighteen microGPT phases equal ('UP tests/NatReflectTest.fss codegen -> link' from `ladder_compare` against `explorations/compile-ladder/baseline-2026-09-19`; the `mg_phases` diff silent).
- A file edited beyond those named: `TypeSchemaAnalyzer.scala` (the crash's second path, rung X's `withBounds`), and the tests' helper apis in `compiler_tests/`, among them the skeptic's `ImportExceptOperatorApi`; no edit of the interpreter's library or of walk (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeSchemaAnalyzer.scala:470-471`; `ProjectFortress/compiler_tests/ImportExceptOperatorApi.fsi:1`).
- A defect fixed beyond the brief's list: the overloading check ignored an on-demand import's `except` clause (row 811), repaired in `importsOnDemand` (`OverloadingChecker.scala:248-255`).

Rung E:
- `run2-api.patch` and the check's edits, taken as they are: the api's `+` and `-` lines equal the patch's (`git diff aa5c67d48 18179f051 -- Library/FortressLibrary.fsi` against `explorations/compile-ladder/plan-21/probes/run2-api.patch`, diff silent); the check's four edits as named, with the field's name in its message (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:597-613`, `:761`, `:775-803`), and the skeptic's `:846`, where `13cf0b5ec` leaves `var` out of the field's modifiers.
- The export error's entries before and after: 'landed 5 now 5' and 'landed 43 entries, now 15', 34 entries `GONE` and 6 `COME` (29 traits gone; `TotalComparison` come, its `=` hidden before by row 800; five entries narrowed: `ActualReduction`, `Array2`, `Condition`, `RR64`, `String`); no site comes in any component (`compare-sites.py explorations/compile-ladder/gate/distance-sites.tsv <the rung's errors.tsv>`; the tables of `18179f051`, which the skeptic's fix can only accept more of, and none of the 15 entries names a field).
- The count stage's seconds: the worker's base 111.8 s (load 2.01) and change 95.6 s (load 3.48); the skeptic's base 76.5 s and change 76.6 s ('real 1m16.523s', 'real 1m16.566s'); no pass edit, so no pass run; tables equal ('#total 3', '#crash none') and `run.txt` equal after masking (38 lines); the stage never reaches the export check (0 export messages in either `run.txt`).
- The declarations that join or change in the api, and so Part IV: 57 written `abstract` (`Library/FortressLibrary.fsi:195` to `:2706`), 3 joined (`:103`, `:1361`, `:2232`), 6 changed (`:164`, `:1257-1261`, `:1360`, `:1930`), `asDebugStriing` removed, 19 follow-on lines (`:581`, `:640`, `:658-659`, `:682-694`, `:2237-2238`), `Array2`'s 2 subscripts (`:1730-1731`); Part IV renders the api (`Specification/library/default-libraries.tex:27`).
- Each compiled test whose verdict changes: no existing test's; nine new cases, the worker's eight and `ExportVarFieldMatchesField` (`ant testQuick` on `13cf0b5ec`'s code: compiler 'Tests run: 1302, Failures: 0, Errors: 0').
- Every sentence made false: none in `Specification/` (`changes.tex:1698` and `:3234`, `:3232` on rung E's tree, speak of `comprises` clauses; the components chapter's `\note` boxes, `apis.tex:15`, `:235`, `basic.tex:148`, say nothing of the check); in the record, rows 800 to 802's claims (closed), the export probe's present-tense counts (`explorations/perf-probes/export-check-full/REPORT.md:7`, `:21-23`, left as its measurement), and F-63's and F-35's line citations (re-anchored).
- A file edited beyond those named, or any edit of the component's bodies: `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:1170`, the compiler's prelude, `consume(): () throws IOException`, as its api (`CompilerBuiltin.fsi:600`) and its siblings (`:1168-1169`) write it; no declaration added; `Library/FortressLibrary.fss` unchanged.

Rung D:
- Each demo's line before and after, and whether each reaches its end within the limit: all 52 reach their end within 600 s on `3cd33d0b0`; the 22 that stopped on the probe's base run now reach it, and the 30 that reached it still do (`explorations/compile-ladder/rung-team-demos/REPORT.md:71-122`, its section 3; the driver's 'demos: 52 run, 52 reached their end'; before, `explorations/perf-probes/team-demos/REPORT.md:60-90`); and on the merged tree (above).
- Each repair that departs from the probe's: none; the diff is the probe's patch applied on `aa5c67d48`, plus row 710's line and the test (`git diff <aa5c67d48 + git apply --cached demos-repairs.patch> 3cd33d0b0 --stat` prints only `ProjectFortress/demos/trips.fss | 2 +-` and `ProjectFortress/tests/Generator22DRects.fss | 18 +`).
- `GenomeUtil2d.fsi`, a new file in the team's folder: the team's `GenomeUtil2c.fsi` with its api line renamed, the team's copyright header kept (`ProjectFortress/demos/GenomeUtil2d.fsi:13`; `diff GenomeUtil2c.fsi GenomeUtil2d.fsi` prints only '13c13 < api GenomeUtil2c --- > api GenomeUtil2d').
- Row 710's repair, and the checker's driver on `trips.fss` before and after: 'acyclic errors=1' with row 710's message before, 'acyclic errors=0' after; 'typecheck errors=18' both; 'trips errors' 57 to 54 (`ProjectFortress/demos/trips.fss:96`; `explorations/compile-ladder/rung-team-demos/REPORT.md:124-155`, its section 4); and on the merged tree (above).
- Any demo that the batch's first run broke, and its repair: none ('demos: 52 run, 52 reached their end' on `3cd33d0b0`, after `c53063bbd`; `REPORT.md:122`).
- A file edited beyond those named: none; `git diff --name-only aa5c67d48 3cd33d0b0` lists the 22 demo files of the patch, `ProjectFortress/demos/GenomeUtil2d.fsi`, `Library/Generator22D.fss` and `ProjectFortress/tests/Generator22DRects.fss`.
- Team lines changed (the batch record's list of points): 22 team demos and `Generator22D`'s `rectsImpl` (`Library/Generator22D.fss:144`, `:145`, `:150`; `explorations/coordinator/CLIMB-BATCH-21.md:185`).
- What walk does differently (the batch record's list): the demos run, and `Generator22D`'s `rects` gives its rectangles where it stopped (`explorations/coordinator/CLIMB-BATCH-21.md:186`; `ProjectFortress/tests/Generator22DRects.fss`, 'OK (1 test)').

The gather reached none of its own beyond those above and the corrections it made under each rung.

## Items for the curator, and where each is in `PLAN.md`

None asks for an answer before work on the path can go on: each has a default acted on or none needed, and each is reversible. So every entry is under "Off the path, parked", in the new subsection "Climb batch 21b, listed for his review" (`explorations/coordinator/PLAN.md:558`), one entry for each point, opening with the ids it holds:
- C.skeptic.1: "C.skeptic.1 of climb batch 21b's rung C: P-155's second sentence, ..." (`PLAN.md:562`): rewrite it to say that the check is done, or keep it as the decision's history? No default on record; the gather left the decision's text as it stands.
- E.skeptic.1: "E.skeptic.1 of climb batch 21b's rung E: 4i and the run-time call (row 816, `CONTESTED`). ..." (`PLAN.md:563`). Default: fork 20's reading stays, recorded by row 816.
- E.worker.1 and E.skeptic.2, one point: "E.worker.1 and E.skeptic.2 of climb batch 21b's rung E, one point: by reading, not measured, ..." (`PLAN.md:564`): whether a probe measures a getter or setter satisfying an api's field and a set of methods satisfying an api's method. Default: none; they stay as read, with no row.
- D.worker.1 and D.skeptic.1, one point: "D.worker.1 and D.skeptic.1 of climb batch 21b's rung D, one point: after row 710's repair ..." (`PLAN.md:565`): is the checker's acceptance of `trips.fss` owed now under review-queue item 247's default, or does it wait with row 731's demo half? Default, acted on: it waits, filed as row 817.

No item went unrouted, and the gather adds none of its own.

## FACTS and POSITIONS left for the coordinator

- F-281, F-282 and F-283 are past the record's 600 characters (`record.py check` reports the sizes), as the records wrote them, F-281 and F-282 with a sentence the gather added (rows 812 to 814; row 816).
- P-155's "Today its overloading check reads an operator only if its name is a word of capitals ..." (`explorations/coordinator/POSITIONS.md:66`), false since rung C: the curator's text, his question C.skeptic.1; left as it stands.
- P-79's "So the demos known to fail today are to be respelled where the way is known: the five demos that walk refuses at load ... (row 670 ...); `trips.fss`, which walk runs but the compiled checker refuses ... (row 710); the timing line of `BiCGSTAB.fss` and `BiCGSTAB2.fss` ... (row 791); and the reductions ... (row 731)" (`explorations/coordinator/POSITIONS.md:85`): rows 670, 710 and 791 are closed by rung D, and `trips.fss` is still refused for other reasons (row 817); the batch record leaves P-155's and P-79's lines to the coordinator after run 2 (`explorations/coordinator/CLIMB-BATCH-21.md`, section 5, "After the landing").
- PLAN's phase 3, item 19, still describes run 2 as being prepared; the coordinator keeps that line.
- The skill's sentences made false, which the batch does not write: none that the three reports list. By the gather's reading, `.claude/skills/fortress-repo/references/revival-changes.md`, which says nothing of the symbolic-operator skip, stays true; the skill writer adds the three changes below.

`python3 explorations/coordinator/tools/ledger.py landing-check aa5c67d481ea9982f3af3a6a53685bc86801f454` after the closes: "ledger.py landing-check: aa5c67d48..HEAD: no finding". `python3 explorations/coordinator/tools/record.py check --base aa5c67d481ea9982f3af3a6a53685bc86801f454`: "FACTS.md 217 entries, POSITIONS.md 83 entries; 0 failures; reported: size 2".

## Revival changes, for the skill writer

Each landed rung's "Revival change" section, both its parts word for word, in the order the rungs landed, with the rows' numbers in place of the placeholders and its headings set one level down. No line it cites moved on `main`: no two rungs share a file, so each rung's lines are `main`'s. Skill sentences made false: none that the three reports list, and the gather found none (above, "FACTS and POSITIONS left for the coordinator"); the skill's part on revival changes gains these three changes.

### C (`rung-symbolic-check`, `108ab82d6`)

**The change.**
- **Every operator is checked.** The team's compiled checker checked overloading only for identifiers and for operators named by a word of capitals: its loops filtered by `isDeclaredName`, which admits an operator only where `NodeUtil.validOp` holds (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:169`, `:314` at `a874948ac`). So `+`, `||`, the subscripts and the other symbolic operators went unchecked, and the code generator met invalid sets of them as "Likely bug in static analysis, apparently malformed overload set not rejected" (`ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:410-411`).
  - Now: the checker applies the overloading rules to every operator (`OverloadingChecker.scala:766-773`). Tests: `ProjectFortress/compiler_tests/XXXSymbolicOperatorOverloadUnrelated` ('Invalid overloading of + in component ...'), `XXXNoDuplicatesRuleSelfPositionsOperator` ('There are multiple declarations of ||'), `XXXFunctionalMethodMeetOperatorChecker` ('Invalid overloading of || in object Vo').
  - Reason: the specification applies its rules to every functional declaration and to operators, which "may have overloaded declarations of the same fixity" as functions may (`Specification/advanced/overloading.tex:98-101`; `Specification/basic/operators/intro.tex:23-25`). The team's proposed-features appendix calls the library's two subscript operators "not really a valid overloading" (`Specification/appendices/future.tex:186-207`). The code generator's own message names the static analysis as at fault.
  - Walk's Meet Rule check still reads only the team's names (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:1990-1994`).
- **An api is read once, and its except clause is read.** The team's checker read an api's declarations once for each of its names whose text was the operator's, so twice for an api with a prefix and an infix `-`. It also never applied an import's `except` clause: `excepts.contains((m:IdOrOp) => ...)` asks a list of names whether it holds a function value (`OverloadingChecker.scala:190-196`, `:224-230`, `:262-268` at `a874948ac`).
  - Now: each api is read once, and an excepted name is not read (`OverloadingChecker.scala:248-256`). Tests: `OperatorPrefixInfixImport`, `ImportExceptOverload`, `ImportExceptByName`.
  - Departures: the code generator's overload set still holds an operator that an `except` clause lists, which both paths still import (row 814), and an on-demand api's declarations of a name that the component imports by name, which the check still reads (row 813).
  - Reason: a name is imported on demand only if it is "neither listed in the except clause nor explicitly imported", and the overloading rules apply to the declarations "declared or imported" (`Specification/basic/components/source-code.tex:248-258`). On the team's code the two except tests are refused, 'There are multiple declarations of pick with the same parameter type'. With every operator checked, the team's code refuses the compiler's prelude itself, 'There are multiple declarations of - with the same parameter type: (ZZ, ZZ)', each declaration against itself.
- **A self type is read as its trait outside the trait.** The team's analyzer read a trait's self type, the trait met with the types its `comprises` clause lists, with those types as written (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:473-481` at `a874948ac`). For a clause that lists a type at a `where`-clause variable, the variable is unbound outside the trait.
  - Now: outside the trait such a self type is read as the trait type alone; inside, as before (`TypeAnalyzer.scala:604-622`). Tests: `ComprisesWhereFunctionalMethodChecker`, `XXXComprisesWhereFunctionalMethodBounds`, `ComprisesWhereOverrideChecker`.
  - Departures: such a program compiles on neither code. Its compile now stops in the code generator: a crash, 'E is not in the kind env', where a generic trait defines the trait's member (row 812), and otherwise row 701's refusal of the trait's `where` clause, 'Can't compile TraitDecl'.
  - Reason: on the earlier code such a program stops the checker, 'E is not in the kind env', at the overloading check, at a call and in the exclusion test. The trait comprises its listed types at every value of the variable, so the trait type holds the same values.
- **A compiled range's `=` is identity.** The team's compiler prelude declared `opr =(left:GeneratorZZ32, right:GeneratorZZ32): Boolean = false` (`Library/CompilerLibrary.fss:281` at `a874948ac`).
  - Now: `GeneratorZZ32` extends `Equality[\GeneratorZZ32\]`, whose `=` is identity, and the top-level `=` is gone (`Library/CompilerLibrary.fsi:111`, `.fss:301`). A compiled `r = r` is `true`, while `(1:3) = (1#3)` stays `false`. Tests: `RangeEqRungJLink` (a range's `=` resolves) and `XXXRangeEqRungJ` (`(1:3) = (1#3)` still `false`, row 481); `r = r` is measured, not gated (rung C's `SKEPTIC.md`, section 2, `SkRangeEq`; the merged-diff review's review-routed.1).
  - Reason: with every operator checked, the prelude's `=` has no meet with `RR64`'s, `Character`'s, `String`'s and `Equality`'s, and its api is refused, 'Invalid overloading of = in API CompilerLibrary'. Taking the `=` out alone leaves ranges with no `=`, '(ZZ32, ZZ32)->Boolean is not applicable to an argument of type (Range, Range).'

**Provenance.**
- P-155 (the compiled checker checks the overloads of symbolic operators before the switch-over), with the record's defaults: fork 13 (`isDeclaredName` kept for the export check), fork 14 (the double count, once per api), fork 15 (the prelude's `=`), fork 16 (compiled tests the check refuses), fork 17 (walk's check left) and fork 18 (row 726 closed by the check).
- The except clause and the self-type reading are the rung's own repairs of defects found on the way (row 811, row 809), with row 775 cleared.
- P-148 for the speed pass.
- Climb batch 21b, rung C (`explorations/coordinator/CLIMB-BATCH-21.md`, section 3, "C").

### E (`rung-export-align`, `031c38bbc`)

**The change.**

- The team's export check (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala` at `a874948ac`) matched a trait's or object's member with any component member of the same header whatever its name (`:600`, the header's name bound to `_`), compared a field by its type alone (`:815`, two statements where one was meant), compared a component's abstract member with the api's with the arguments the wrong way round (`:751`), and asked a matching member for every api member, those written `abstract` included (`:767` and `equalMember`). The tree now matches members by name and header, fields by name, modifiers other than `var` and type, compares the component's abstract members with the api's first, and asks nothing of an api member written `abstract`: tests `XXXExportMemberName`, `XXXExportFieldName`, `ExportVarFieldMatchesField`, `ExportComprisesEllipsisAbstract`, `ExportAbstractMemberDefined`, `ExportAbstractMemberAbsent`. The reason: `Specification/basic/components/apis.tex:252-256`, "A matching definition of a declaration $d$ is a definition $d'$ with the same name as $d$ that includes definitions for all declarations other than the methods or fields declared abstract in $d$. The header and type of $d'$ must be the same as the header and type of $d$."
- The team's interpreter-library api (`Library/FortressLibrary.fsi` at `a874948ac`) declared without `abstract` members that its component leaves without a body, lacked three bodyless members of the component, declared `EqualTo`'s `opr <(self, other:LessThan)` (line 156) where the component defines it at `GreaterThan`, `ReductionPair[\R,L\] extends SomeReductionPair[\R\]` (line 1749) where the component extends `SomeReductionPair[\L\]`, `Range`'s misspelt `asDebugStriing()` (line 2068) that nothing defines, and `Indexed1` to `Indexed3` without the component's `extends HasRank`. The tree's api writes these as the component has them, with the members that the `abstract` lines need (`ZZ32`'s, `ZZ64`'s and `ZZ`'s, `OpenRange`'s) and `Array2`'s column and row subscripts: shown by the distance stage's export error, 43 entries to 15, and by the walk tests and the model's quick checks, unchanged. The reason: the compiled checker refused the api against its own component (the export error of the stage), and the library's own practice states in the api what the component defines.
- The team's compiler prelude declared `JavaBufferedReader`'s `consume` `throws IOException` in its api (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:600`) and without it in its component (`CompilerBuiltin.fss`, line 1076 at `a874948ac`). The tree's component declares it, as its siblings do: every compiled test compiles the prelude. The reason: the check, comparing names, refused the prelude, 'due to different method consume @ .../CompilerBuiltin.fsi:600:3-601:1'.

**Provenance.** Rows 800, 801 and 802 and the export probe's 4h and 4i (`explorations/perf-probes/export-check-full/REPORT.md`); the batch record's forks 19, 20 and 22 at their defaults, question 2's answer for `BoundedRange`'s `atMost` (P-156), P-27; climb batch 21b, rung E.

### D (`rung-team-demos`, `5e60e356a`)

#### The change

The team's `rectsImpl` counted an array's row and column ranges with `/` (`Library/Generator22D.fss:144-145`, `:150` at a874948ac). In the team's library too, two `ZZ32`s divide to a rational: `ZZ32` extended `ZZ`, whose `opr /(self,other:ZZ):QQ` (`Library/FortressLibrary.fsi:533-534` at a874948ac). So, by reading, `rects` stopped under walk at `array[\Generator[\E\]\](ss0, ss1)` in the team's tree too.

The tree halves with `DIV` (`Library/Generator22D.fss:144`, `:145`, `:150`), and `rects` gives each contiguous rectangle of an `Array2` once. Test: `Generator22DRects`.

Reason: "When the operator / is used to divide one integer by another, the result is rational. The operator ÷ performs truncating integer division" (`Specification/basic/operators/opr-overview.tex:125-128`). The measured failure was 'Failed to find any matching overload, args = (Ratio,Ratio)' at `Library/Generator22D.fss:146`, through the harness on the base.

#### Provenance

Row 468, and its stated fix. P-79, the team demos kept running, whose `DemoGenerator22D` needs `rects`. P-27, the library's own practice (`n DIV 2`, `Library/FortressLibrary.fss:4389`). The batch record's fork 23, taken at its default. Climb batch 21b, run 2, rung D.
