<!-- The fifth slice of FACTS's consolidation to what a decision needs, written 2026-10-13: the 23 entries of "Execution model" and the 18 of "The harness and the gate", what each became, the titles changed and their citations, the line references corrected, the sizes, the verbatim check's result, and the points for the checker. -->

# FACTS, fifth slice: Execution model and The harness and the gate

The base is `920654f12`. The slice was lines 7 to 29 (Execution model, 23 entries) and 97 to 114 (The harness and the gate, 18 entries) of `explorations/coordinator/FACTS.md`. It keeps the same lines: no entry was merged or moved. 32 entries were rewritten in place and 9 stand verbatim. One entry outside the slice, line 167, changed only in its citation of a retitled entry. Every earlier text is verbatim in `explorations/coordinator/FACTS-history.md`, under "Rewritten 2026-10-13, Execution model and The harness and the gate consolidated to what a decision needs", each after a comment line that says what became of it.

## What each entry became

Line, what it became, the main cut and where that detail lives. Every entry keeps its line.

Execution model:

1. 7, two execution paths: kept; `repo-internals.md:95-129` re-read to `:97-129`.
2. 8, the checker only on the compiled path: verbatim.
3. 9, `fortress typecheck`: kept with cuts. Cut: "not on the worklist ... worklist item 2", since the worklist is in `fortress-gap-ledger-history.md`; the decision cited instead, POSITIONS "The type checker on interpreter programs.". The site named (`Shell.java:453-458`).
4. 10, types lowered to reference types: kept. The removed `perf-probes/boxing/javap/` dropped for the report's section 4. The array sentence now cites the library's `get` and `put`, which `repo-internals.md:129` does not hold.
5. 11, boxing on array code: kept with cuts. Cut: the interpreter's profile on `krows`, in `perf-probes/kernels/REPORT.md` section 3, since interpreter performance decides nothing (POSITIONS); "the two defects the probe found are fixed", stated by lines 13 and 14; "wider than row 72", row 72 being a duplicate of row 305. The 0-byte jar cited to row 304.
6. 12, the scalar loop: new opening words. Cut: the pre-fix reading (156×, boxing 2%) and the shares of the pre-fix gap, in `perf-probes/boxing/REPORT.md` section 5 and row 302's history. Now states the loop after rows 302 and 303 and the two costs left, with `countedseqloop` located.
7. 13, `BaseTask.inATransaction()`: verbatim; `BaseTask.java:248` holds.
8. 14, `FFloatLiteral`: verbatim.
9. 15, the benchmark numbers on record: opening words kept (cited by `.claude/skills/cloud-container/references/sources.md:17`). The date cut; the reports that hold the numbers named.
10. 16, `compileAll` and the library jars: kept; the citation of retitled line 100 updated; `repo-internals.md:170-179` re-read to `:172-185`.
11. 17, the bytecode cache empty after the library order: verbatim.
12. 18, generic instantiations stamped at load: verbatim.
13. 19, implicit parallelism: kept. `operator-app.tex` named under `Specification/basic/expressions/`, since `basic/operators/` holds a file of that name too. "No explicit threading in any of our programs" restated as what `git grep` finds in `explorations/`: no `spawn`, no `also`.
14. 20, sizes: new opening words (the old ones were "The compile path's checker cannot check `nat` parameters at all ...: this no longer holds"). The specification's sentence located (`trait-parameters.tex:97`). The uncatchable mismatch is row 254's; the old text cited row 83, whose claim is another (below).
15. 21, the specification's `Nothing`: title kept. The removed probe directories dropped for `reviews/spec-refused-examples.md` E4 and `compile-ladder/rung-maybe/REPORT.md`; row 17 named; the library comment's sentence and "why both worlds must spell the empty case some other way" replaced by the specification's present text (`convenience.tex:58-73`) and POSITIONS "`Maybe`'s empty case".
16. 22, the exported function: title kept; row 320 named, with its workaround; lines re-read.
17. 23, comment spans: title kept; the removed probe and scripts dropped for the report's D1 and the scripts' `git show` path.
18. 24, a native's Fortress exception: title kept; row 347 fixed; "mapped as before" restated as what `FunctionClosure.java:191-196` does.
19. 25, the class loader's lock: title kept; the line named (`InstantiatingClassloader.java:180`), row 417 fixed, the gate's four-thread atomic runs named.
20. 26, walk's choice on declared domains: title kept; lines re-read.
21. 27, walk's load check: title kept; lines re-read, the shared `overlapCoveredBy` named; one test renamed, one reclassified (below); "Q4 = (1)" restated with row 159 and the report's decision.
22. 28, `Any` as a return type: verbatim.
23. 29, the `comprises` load check: title kept; the code's lines named; the gated tests brought to the tree (below).

The harness and the gate:

24. 97, the ladder-regression baseline: verbatim.
25. 98, `run_out_WIcontains`: kept; "the batch script's first revision added it" cut; "as `_WImatches` does" corrected (below).
26. 99, the thread pin: title kept; "as CI and Pavol's machine would make it, ran at another count" cut; `JAVA_FLAGS` quoted as `build.xml:1168-1169` reads; the 8 of 12 runs left to row 640.
27. 100, `compileAll` and the caches: retitled. Cut: the check of the commit that untracked `global.map`, the line `clean-ladder`'s `.gitignore` carries (now `.gitignore:25`), and "20 s when it deleted them", the build before the change; all in `build-efficiency.md` sections 2, 3 and 5.
28. 101, `harness-one.sh` and `env.sh`: title kept; the scripts' paths named and the cache's rule read from the script; the timings rounded, their machine and ranges in `build-efficiency.md` section 1.
29. 102, `XXX*.fss` in the interpreter corpus: title kept. "`tests/` holds no `.test` file" no longer held; "read at a gather" cut; the gate's call cited (`SystemJUTest.java:42`) instead of `FileTests.main`; the compiled corpora's two-file shape cut, stated by line 103.
30. 103, the compiled corpora's `XXX` mechanism: title kept; the report's section named; `:658-660` moved in from line 102.
31. 104, a thrown `CompilerError`: title kept; the removed `climb-batch-2/repair/` replaced by `climb-batch-2/REPAIR-review.md` section 2; "First used by" restated as an example.
32. 105, `testSystem`'s shards: title kept; lines re-read; the removed `shard-membership.sh` dropped.
33. 106, two constraints of the test and native machinery: retitled; the removed probe directory replaced by the report's two sections.
34. 107, three heaps: title kept; the `LSHIFT` example and its repair cut, in `compile-ladder/rung-int-semantics-walk/REPORT.md` sections 3 and 4.4; lines re-read.
35. 108, the ambiguity message's order: title kept; the removed `count-run.sh:20` replaced by the flags it set (`JUDGE.md` section 5); lines re-read.
36. 109, the ladder's lost file: verbatim; `CompilerLibrary.fsi:180-181` holds.
37. 110, an `XXX` compile test reported as a wrong failure: title kept; the removed capture replaced by the report's section 6.
38. 111, the count and distance stages: title kept; "That is by reading, and four runs on an interpreter-only edit agree with it." cut; `STAGE_BLIND` located; the skeptic's check corrected (below).
39. 112, specification citations by section: title kept. Cut: the strip's counts, method and gate, in `PLAN.md:402` and commit `dc0eee2fe`'s message; the `basic-integers.tex` and `ranges.tex` granularity and the 18 citations in exploration programs outside the corpora, which only the history holds now and no decision rests on. The rule for a renamed section added from `PLAN.md:402`.
40. 113, `FORTRESS_CACHES` for another build's classes: verbatim; `FileTests.java:541-571` holds.
41. 114, `ant testSpecData`: retitled, opening words kept. Cut: the command's output line (the gate's row holds it) and "about 90 s", replaced by the last landed gate's time.

## The titles changed

| Line | Old title | New title |
|---|---|---|
| 100 | **`ant compileAll` deletes a tracked file** — a title that no longer holds | **`ant compileAll` deletes the caches folder, the linker's untracked `global.map` with it, when the implementation changed, and keeps it otherwise** |
| 106 | **Two constraints of the test and native machinery, measured by rung S** | **Two constraints of the test and native machinery: the native-wrapper generator wraps every method of an imported class, and a link or compile exception of an `XXX` component passes whatever its `.test` file is called** |
| 114 | **`ant testSpecData` runs 130 of the specification's 133 extracted examples under walk, outside the gate, and 5 are red, all of one cause** does not hold | **`ant testSpecData` runs 130 of the specification's 133 extracted examples under walk, as a gate step, and all 130 pass** |

Two untitled entries have new opening words, and no live file cited the old ones: line 12 ("The boxing probe's scalar-loop reading" became "With rows 302 and 303 fixed") and line 20 ("The compile path's checker cannot check `nat` parameters at all" became "Sizes, the `nat` and `int` static parameters"). Every other entry keeps its title or opening words.

## The citations

Each old title was searched with `git grep -F` on a distinctive part of it, across `explorations/` and `.claude/`.

Updated in live files:

- `explorations/coordinator/FACTS.md:16`, the bytecode-cache entry's citation of line 100's title.
- `explorations/coordinator/FACTS.md:167` (The specification and the repository's lineage), the citation of line 100's title, now quoted with an ellipsis. Its earlier text is in the history.
- `explorations/coordinator/map/README.md:128`, "`compileAll` deletes the tracked `default_repository/caches/global.map` (FACTS "`ant compileAll` deletes a tracked file")", now "deletes the caches, the untracked `default_repository/caches/global.map` with them, when the implementation changed (FACTS "`ant compileAll` deletes the caches folder ...")".
- `explorations/coordinator/tools/batch-measures.py:44`, a comment quoting the old title as an example of a quoted key; the new title's opening words now. The regular expression is unchanged.

Needed no change, since they quote only the opening words that the new titles keep: "Two constraints of the test and native machinery" at `map/README.md:125`; "`ant testSpecData` runs 130 of the specification's 133 extracted examples ..." at `POSITIONS.md:124` and `PLAN.md:433`.

Left as they are: batch records, reviews, reports and history files that cite the old titles (for example `compile-ladder/rung-default-rendering/record.md:8`); the old titles stay findable in `FACTS-history.md`.

`BOOT.md` cites none of the slice's titles. Under `.claude/skills/`, for the coordinator:

- `.claude/skills/fortress-repo/references/sources.md:46`, `:70`, `:287`, `:311` and `:312` cite "`ant compileAll` deletes a tracked file", the title changed.
- `sources.md:122` cites line 114 by its kept opening words, under the heading "Outside the gate", which no longer holds: `testSpecData` is a gate step.
- `sources.md:393` says that FACTS "A comment placed after a declaration ..." still names the removed scripts' old paths; it now names their `git show` path.
- `sources.md:155` cites `FileTests.java:455-480, :836-860` for the load-refusal key; those lines are now `:460-515` and `:841-863`.
- `sources.md:154`, `:167`, `:208` ("Two constraints of the test and native machinery"), `:113` and `:182` ("The gate's thread count is pinned ..."), `:152` (`XXX*.fss`), `:47` and `:58` (the bytecode cache), `:35` (the class loader, generic instantiations), `:155`, `:192` and `:196` (the load checks), `:191`, `:213`, `:225`, `:417`, `:116`, `:181`, `:114`, `:160`, `:237`, `:87`, `:140`, `:144`, `:153`, `:163`, `:193`, `:529`, and `.claude/skills/cloud-container/references/sources.md:17` cite titles or opening words that stand.

## The line references corrected

Every `file:line` in the slice was printed and read against the tree.

- Line 7: `repo-internals.md:95-129` to `:97-129`.
- Line 10: the removed capture directory `perf-probes/boxing/javap/` dropped; the array sentence's `repo-internals.md:129` does not mention `get`/`put`, now `Library/FortressLibrary.fsi:1417`, `:1468`.
- Line 16: `repo-internals.md:170-179` to `:172-185`, the library order's recipe.
- Line 19: `operator-app.tex:59` named under `Specification/basic/expressions/`.
- Line 20: the uncatchable mismatch cited to row 254, not row 83.
- Line 21: `Specification/basic-lib/convenience.tex:61-65` to `:58-73`; `CodeGen.java:4093` to `:4107`; the removed `reviews/spec-refused-examples/probes/` and `compile-ladder/rung-maybe/probes/` dropped.
- Line 22: `CodeGen.java:411-441`, `:1856`, `:6599-6606` to `:417-450`, `:1859`, `:6660-6666`.
- Line 23: the removed `compile-ladder/rung-library-comments/probes/SpanAbsorb.fss`, `.txt`, `parse-compare.sh` and `remap-lines.py` dropped; the scripts print from `ab067d9b6^`.
- Line 24: the wrap at `FunctionClosure.java:188-196` narrowed to `:191-196`, the two clauses that wrap.
- Line 26: `OverloadedFunction.java:1420-1427` to `:1570-1575` (the candidate kept) and `:1710-1717` (`moreSpecificDeclaration`); `instanceHolding` `:1376-1391` to `:1666-1681`; `convertedCall` `:1307-1324` to `:1597-1614`.
- Line 27: `OverloadedFunction.java:497-500` to `:507-510`; `validOnDeclaredDomains` `:693-722` to `:730-759`; `genericOverlapCovered` `:728-778` to `:773-815`; `intersectionPieces` `:917-976` to `:963-1013`; `overlapCovered` `:814-825` to `:851-862`; `overlapPieces` `:986-1030` to `:1023-1067`; `XXXComprisesMeetUncovered` is `tests/XXXComprisesMeetUncoveredWalk.fss` (renamed in `0ae526b31`; `compiler_tests/XXXComprisesMeetUncovered` is the checker's).
- Line 98: "as `_WImatches` does" was wrong: `_WIcontains` collapses whitespace in the output and the expected string (`FileTests.java:159-160`), `_WImatches` in the output only (`:185`).
- Line 99: `FortressExecutable.java:37-44` to `:37-45`; `build.xml:1168` to `:1168-1169`, the value now also setting `java.io.tmpdir`.
- Line 100: `RepoState.java:176` to `:174`; `ProjectProperties.java:303-313` to `:304-314`.
- Line 102: the suite's call cited at `SystemJUTest.java:42`, which the gate runs, rather than `FileTests.java:885`, which is `FileTests.main`.
- Line 104: the removed `compile-ladder/climb-batch-2/repair/` replaced by `REPAIR-review.md` section 2; `CodeGen.java:1551-1553` to `:1555-1558`.
- Line 105: `build.xml:1171-1211` to `:1395-1438`; the removed `shard-membership.sh` dropped.
- Line 106: the removed `compile-ladder/rung-default-rendering/probes/` replaced by the report's sections.
- Line 107: `build.xml:131`, `:1181`, `:1168` to `:132`, `:1405`, `:1168-1169`.
- Line 108: the removed `compile-ladder/rung-wrap-operators/count-run.sh:20` replaced by its flags; `Constructor.java:181-182`, `:325-328` to `:182-183`, `:348-349`.
- Line 110: the removed `compile-ladder/rung-unknown-size-arm/probes/pre-edit-tests.txt` replaced by the report's section 6.
- Line 111: the skeptic's check of the paths is its check 1 (`climb-batch-workflow.js:885`), not check 10, which is competing declarations (`:900`).
- Line 112: `climb-batch-workflow.md` no longer states the citation rule; `PLAN.md:402` does.
- Line 114: `SpecDataJUTest.java:30-38` to `:29-38`; `build.xml:988` to `:1210`; `:1139` to `:1361`; `climb-batch-workflow.md:214` to `:216`.

The rest hold: `repo-internals.md:127`, `:129`; `BaseTask.java:248`; `tuple-expr.tex:23-24`; the frozen `convenience.tex:49`; `objects.tex:84-86`; `Linker.java:72-76`; `overview.tex:33-35`; `Fortress.rats:145-157`; `Int.java:258-261`; `GenericFunctionOrMethod.java:57-68`; `FGenericFunction.java:49-51`; `MakeInferenceSpecific.java:72-75`; `build.xml:504`, `:357`, `:1167`, `:1412`; `GraphRepository.java:347`, `:404`, `:514`; `RepoState.java:366-385`; `env.sh:6`, `:8`; `bin/fortress:28-29`; `FType.java:88-101`; `FortressMethodAdapter.java:215-225`, `:250-258`; `Shell.java:904-915`, `:607-621`, `:1221`, `:55`, `:1086`; `WorldFlip.java:42`; `DistanceMulti.java:64`; `PhaseOrder.java:137-147`; `CompilerLibrary.fsi:180-181`; `IntLiteralArithRung7.fss:19`; and every `FileTests.java` line the entries cite besides those above.

## The ledger, the tests and the last landed gate

- Rows named where the old text described them without the number: row 17 (a where clause does not bind an extends clause's type variable, open) on line 21; row 320 (the api-name linking, open) on line 22; row 304 (the 0-byte jar is in its notes) on line 11; row 159 (walk refuses two generic declarations unless a pair excludes, open) on line 27; row 254 (a size mismatch at dispatch is a `ProgramError` no `catch` takes, open) on line 20.
- Row 83 is `CONTESTED`: a `nat`-generic function mis-unifying on its second instantiation through an api, with no reproducer. The old line 20 cited it for the uncatchable mismatch, which is row 254's. Line 20 keeps one sentence on row 83.
- Rows 534 and 544 are fixed; their files are now the refusals `OverloadSingleParamBoundAny` and `FunctionalMethodMeetInherited`, each with a `.test` file. Row 22 is a duplicate of row 551, whose file `XXXComprisesLibraryTraitUnlistedExtender` is. Line 29 lists them so.
- `XXXOverloadExistentialMeetWalk.fss` is the expected failure of row 539 (open): walk refuses a valid set, and the file goes red when walk accepts it. The old line 27 listed it among the refusals. `XXXGenericBesidePlainReturnRule.fss`, `XXXComprisesMeetUncoveredWalk.fss` and `XXXComprisesCoverReturnWrong.fss` are refusals: each must be refused at load.
- `compiler_tests/XXXExportVarRungXLinked.test` drives `link` with `link_err_contains`; it pins row 320's error and goes red once the link succeeds, so it is an expected failure, as line 22 says. `XXXTryAtomicCodegenRungB.test` (row 353, open) is the same kind.
- `ProjectFortress/tests/` holds 41 `.test` files now, all `load_exception_contains` keys beside programs that name a refusal at load. The old line 102 said it held none.
- The last landed gate is climb batch 13b's. Line 114 cites its `specdata/SpecDataJUTest` row (`summary.txt:50`, 130 tests, 0 failures) and its time (`:62`). No other entry in the slice names the last landed gate.

## Earlier slices' stale items in this slice

Slice 1 listed three titles in this slice that no longer held: its base lines 20, 106 and 120 (`49d78c8cd`), here lines 20, 100 and 114. All three are settled: line 20 has new opening words, lines 100 and 114 are retitled. Slices 2 to 4 list no stale item in this slice; slice 2's note that `FACTS.md:20` cites "The compiled type checker checks `nat` and `int` static parameters" still holds after the rewrite.

## The size

| | Characters | Bytes | Entries |
|---|---|---|---|
| Before, Execution model, lines 7 to 29 | 15,379 | 15,394 | 23 |
| After | 16,596 | 16,606 | 23 |
| Before, The harness and the gate, lines 97 to 114 | 16,975 | 16,979 | 18 |
| After | 15,902 | 15,902 | 18 |
| The slice before | 32,354 | 32,373 | 41 |
| The slice after | 32,498 | 32,508 | 41 |

Characters count each line with its newline. The whole of `FACTS.md` went from 268,198 bytes to 268,412.

## The script

`python3 explorations/coordinator/tools/check-verbatim.py 920654f12 explorations/coordinator/FACTS.md explorations/coordinator/FACTS-history.md`, exit 1:

```
entries in explorations/coordinator/FACTS.md at 920654f12: 200 (268198 bytes); now 268412 bytes
  verbatim in the file now:        167
  verbatim in the history file:    34
  in both (should be 0):           1 [140]
  in neither (should be 0):        0
moved to history (old line numbers): 7 9 10 11 12 15 16 19 20 21 22 23 24 25 26 27 29 98 99 100 101 102 103 104 105 106 107 108 110 111 112 114 140 167
```

The one entry "in both" is line 140, in Landed semantics, outside this slice, and the script reports it on the untouched base as well. Run on `FACTS.md` and `FACTS-history.md` as they stand at `920654f12`, it prints `verbatim in the history file: 1`, `in both (should be 0): 1 [140]` and exits 1. The script tests containment as a substring (`e in hist`). The fourth slice cut line 140's last sentence, on the last landed gate. What remained is a prefix of two older texts of the same entry in the history (`FACTS-history.md:2372` and `:2777`), each followed by that sentence. So line 140 counts as present in both files, though no whole entry of the history equals it. Matched as whole entries, the same comparison prints 167 in the file, 33 in the history, none in both and none in neither. The 33 entries this consolidation changed, 32 in the slice and line 167, are each in the history only, and the 9 it kept verbatim are in `FACTS.md` only.

## Points for the checker

1. **The script exits 1, against the brief.** It does so on the untouched base for line 140, which is outside this slice (above). I committed anyway, since nothing in the slice causes it and the brief does not let me edit line 140 or the history's earlier texts. The fix is in the tool: compare whole entries, for example with the sets of entries the script's `entries()` already parses (`set(e for _, e in entries(new))`), not substrings. I did not edit the tool, since the brief gives me only its citations to update. That decision is the coordinator's. Until the tool is fixed, every later consolidation from a base after `920654f12` gets the same exit 1.
2. **The slice grew by 144 characters**, as slice 3's did. The Execution model grew by 1,217 and The harness and the gate shrank by 1,073. The cuts are measurement narrative (line 112's strip counts, line 12's pre-fix reading, line 11's interpreter profile, line 107's example, line 111's runs), accounts of how a fact was found, and dates. The additions are those the brief asks for: rows named (17, 159, 254, 304, 320), code lines where the old text named only a method, and tests sorted into refusals, expected failures and passing tests. Further cuts were possible and not made: line 27's reading of a generic's parameters, line 29's list of gated tests, line 114's five examples and line 99's `TimingRungT`. Each states how a path behaves or which test gates it.
3. **No merge, no move.** Lines 13 and 14 (the two fixes) could join line 12 (the loop after them), and line 110 could join line 103 (both on the compiled corpora's `XXX` files). Each states a fact of its own, and lines 13, 14 and 110 are cited from `.claude/skills/` by their opening words, so I kept them apart. Lines 16 and 100 overlap (`compileAll` and the caches) but sit in two sections, and the brief keeps each entry in its section.
4. **Titles kept that mark a change or a comparison.** Line 26 "no longer decides", line 101 "no longer deletes", line 102's "IS", and line 22's "the repository's, not codegen's". Each still holds as a statement. Line 22's comparison rests on the cited report (`rung-export-var/REPORT.md`, "The name coincidence is the repository's assumption, not codegen's"), while row 320 classes the defect as `implementation gap (codegen)`; the checker may judge that the title needs the brief's rule on comparisons. Line 22's title is cited by `.claude/skills/fortress-repo/references/sources.md:213`.
5. **Line 16's "Nothing else clears `bytecode_cache/`"** stands as the old text and `build-efficiency.md` section 2 give it, with a qualification. That section also names `Shell.resetRepository`, which `CompilerJUTest`, `LibraryJUTest` and `NightlyCompilerJUTest` call when `fortress.junit.reset` is true. `fastTrack` sets it false (`build.xml:1164`; the comment at `:1133-1134`), so the sentence holds for the caches the tree's own commands use.
6. **Claims that rest on reading, not on a run in this task.** Line 12's "unaddressed" rests on `countedseqloop` at `CompilerLibrary.fss:373-381` and on no `DADD` or `DMUL` in `compiler/codegen/` (`grep`). Line 19's sentence on `spawn` and `also` rests on a `git grep -w` of `explorations/*.fss`. Line 29's "a failure while the top-level variables are initialized counts as a refusal at load" rests on `Driver.evalComponent` calling `initVars` (`Driver.java:247-249`) and `thrownAtLoad` looking for that frame (`FileTests.java:870-879`). Line 12's two timings are a pair from one session, and line 15 says that seconds do not compare across sessions.
7. **Sentences added from primary sources, read and not run.** Line 9's site (`Shell.java:453-458`). Line 10's `get` and `put` (`FortressLibrary.fsi:1417`, `:1468`). Line 20's specification sentence (`trait-parameters.tex:97`) and rows 254 and 83 from their rows. Line 21's specification text (`convenience.tex:58-73`) and row 17. Line 22's workaround from row 320's notes. Line 25's lock (`InstantiatingClassloader.java:180`). Line 27's `overlapCoveredBy`. Line 29's call sites. Line 101's cache rule (`harness-one.sh:7-13`). Line 112's rule for a renamed section (`PLAN.md:402`).
8. **The history's comment lines name commits as pointers.** Line 23 gives the removed scripts as `git show ab067d9b6^:...`, a commit inside a FACTS entry. It is the only place they can be read, and the line keeps it as a path, not as provenance. Another option was to drop the scripts' names and keep only the report's D1.
9. **Skill citations for the coordinator.** These are listed above. Five lines of `.claude/skills/fortress-repo/references/sources.md` cite the changed title of line 100. Three lines state things this slice found no longer true: `:122` "Outside the gate", `:393` the old script paths, and `:155` the drifted `FileTests.java` lines.
