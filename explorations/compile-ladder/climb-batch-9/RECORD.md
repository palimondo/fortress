# Climb batch 9: the gather's record

Written at the gather stage of climb batch 9 (2026-10-03), the run of `explorations/coordinator/CLIMB-BATCH-9.md` (rungs W, K, R and S), on `main` from the base `fa14a190c`. `main` was at `55a0471bc` when the gather began, three coordinator commits above the base (`795dba855`, `c30b9613b`, `55a0471bc`, boot notes), all under `explorations/`; none touches a rung's file. All four rungs were approved, and each landed as one commit composed from its branch's net change; no branch is a parent of anything on `main`.

**Preconditions.** `git status --porcelain` was empty, and `fa14a190c` is an ancestor of `HEAD`.

**Scratch.** The gather's patches, scripts and the folding helpers are in its scratchpad, not in the tree. To run the tests it added, the gather built one merged tree outside the main tree: a detached worktree at `55a0471bc` (`/home/user/fortress-gather9`), seeded from the batch's base build with `seed-worktree.sh`, the four patches applied by `git apply --3way --index` in the order below (no conflict, every path blob for blob the branch's but the two shared library files, which hold R's lines and S's), and `ant compileAll` (47 s), `default_repository/caches/global.map` restored after it. Each test the gather added was run there through `explorations/compile-ladder/rung-inference-walk/harness-one.sh`, and each expected failure also on a stand-in, a local fix or a rewritten program, that turns it red. No suite, stage or compiled run was made.

## The order the rungs were applied in

W, then K, then R, then S. The files two or more rungs edit are `Library/FortressLibrary.fsi` and `Library/FortressLibrary.fss`, R's and S's, with each rung's lowest edited line at the base:
- `Library/FortressLibrary.fsi`: R at 987 (Just's `SQCAP`, inserted), S at 2406.
- `Library/FortressLibrary.fss`: R at 1505 (inserted), S at 4149.

So R goes before S in both files; every hunk of S lies below every hunk of R, so S moves no line R's records cite (checked by content: `SimpleMappedSeqIndexed` at `Library/FortressLibrary.fss:4137-4153` and `.fsi:2396` before and after S). W and K share no edited file with any rung (`ProjectFortress/tests/` and `compiler_tests/` on distinct files), so the key does not order them; they went first in manifest order, which is also the order the final row numbers are assigned in.

Where a later rung moved lines an earlier rung's folded records cite:
- K's hunks in `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java` move two lines W's row 589 and its `PLAN.md` entry cite: `bestMatchInternal`'s unification, `:1181` at the base, is `:1266`, and `instanceHolding`'s, `:1296`, is `:1381`.
- R's insertion at `FortressLibrary.fsi:987` and `.fss:1505` moves `MatchFailure`'s declarations, which W's row 590 and its `PLAN.md` entry cite: `.fsi:1164` is `:1165`, `.fss:1714` is `:1715`.
- R's insertions move every line of S's region in the two shared files, by 17 in the api and 26 in the component: S's folded lines (row 606, items 42 and 38, and S's entries) are re-anchored by content, `String`'s `left` and `right` at `.fss:4165-4166` and `.fsi:2419-2420`, its `CASE_INSENSITIVE_CMP` at `.fss:4179-4180`, its `opr[r0]` at `.fss:4196-4203`, `uncheckedSubstring` at `.fsi:2440-2444`.
- **A departure from the procedure.** The first two re-anchorings belong in K's and R's commits, and the gather tried to amend them in; the permission system refused rewriting those commits, so both are made in S's commit instead, which is the last. The gather restored `main` to R's commit by a fast-forward and rewrote nothing. Each rung's `REPORT.md`, `SKEPTIC.md` and `JUDGE.md` cite its own tree.

## Final row numbers

From 587, the first free row, in manifest order W, K, R, S, each rung's own provisional rows first and then the rows the gather opened from its skeptics' recommendations. The rows are in numeric order after row 586 in section 10 of the ledger.
- W: its provisional 587 to 594 keep their numbers; the specification's citations of rows 587, 588, 589, 591 and 592 (`Specification/basic/inference.tex`) stand.
- K: its provisional 587 and 588 are 595 and 596; the gather's rows from its skeptic are 597 and 598.
- R: its provisional 587, 588 and 589 are 599, 600 and 601; the gather's rows are 602 and 603.
- S: its provisional 587, 588, 589 and 590 are 604, 605, 606 and 607; the gather's rows are 608 and 609.

Each renumbered rung's `REPORT.md`, `SKEPTIC.md` and `JUDGE.md` carry the final numbers, with one italic note line under the title saying so. No test cites a provisional number.

## Rung W (`rung-walk-instance`)

**Inherited from the branch.** Fifteen commits, `4f4fc1ead` (the tests alone) to `6d4598617` (the second judgement): the first pass (`2b734f9cb` to `8f5ac2199`), the first skeptic's refusal (`bfb9eaa59`), the judge's ruling (`27c3b59bc`), the repair round (`211610c19` to `5ff5ebf73`). The branch carries `REPORT.md`, `record.md`, `SKEPTIC.md` (both rounds), `JUDGE.md` and `decision-record.md`.

**Applied.** No conflict; every path matches the branch.

**Written from the journal.** None; all three files are the branch's. `record.md` was folded and is not landed.

**Corrections.** The first five, the first judgement's and the judge's, were made by the repair round and confirmed by the second judgement (`SKEPTIC.md` section 1, "The corrections of my first judgement"), each checked in the file it names:
1. The first box states D5's exception (`Specification/basic/inference.tex`, the box after the example of `op`).
2. Appendix I's Rationale no longer says "two kinds".
3. D2's Cost says the case is unmeasured and why (`decision-record.md`, D2).
4. `REPORT.md` section 1 gives the qualification of the test-first order (`2b734f9cb`'s assertions and the pin file, failing on the base only by probes).
5. Both boxes and the Effect name the several-bounds case and D3.

The second judgement's two, made at the gather:
6. The Rationale of Appendix I's entry "The inference of a call's static arguments" names four kinds of departure by decision, the fourth D5 with its reason: a lone type parameter whose bound mentions a static parameter, itself or another, keeps the arguments' narrowest named common supertype rather than its bound, since the interpreter cannot evaluate such a bound before the instances are known, which leaves the self-bounded case undecided (`Specification/appendices/changes.tex`); `decision-record.md` section 1.3's Rationale says the same, four kinds.
7. The FACTS entry's list of what stays at `BottomType` names row 588, a type parameter an argument bounds only from above.

**Recommended rows.**
- Several declared bounds whose meet is no named type: refused as a new row, since the repair round opened it, row 591, with `XXXInferSeveralBoundsWalk.fss`.
- A type parameter that only another parameter's bound mentions: refused as a new row, since the repair round opened it, row 592 (decision D3), with `XXXInferThroughBoundWalk.fss`.
- The compiled checker's `depS`: refused as a new row, since the repair round opened it, row 593, with its pair in `compiler_tests/`.
- Compiled codegen, a generic functional method with self second: refused as a new row, since the repair round opened it, row 594, with its pair.
- The note to row 565 (`SkFnMeth`): appended in the skeptic's words.

**Folded.** One FACTS entry under "Landed semantics", and the correction record.md asks to the entry "Under `walk`, a generic call's static arguments are inferred with coercion ...". Ledger: rows 516, 555, 558 and 567 FIXED, row 424's plain-bound half; notes on 424, 516, 555, 558, 567, 553 and 565; rows 587 to 594. The handover paragraph. `PLAN.md`: a new section "Climb batch 9, listed for his review" under "Off the path, parked", eleven entries.

**Items for Pavol.** W.worker.1, W.skeptic.2, W.judge.1: the row 592 (D3) entry. W.worker.2, W.skeptic.1, W.judge.2: the row 591 entry. W.worker.5, W.judge.5, W.skeptic2.1: the D5 entry. W.worker.6: the row 555 F-bounded entry, with the second skeptic's stop. W.worker.7: the D2 entry, with the stop "a parameter nothing fixes bound to anything but its declared bound". W.worker.8: the row 589 entry, with the stop "a change to which declaration walk chooses". W.worker.4, W.judge.4, W.skeptic2.2: the row 587 (J1) entry. W.worker.3, W.judge.3, W.worker.9, W.judge.7: the entry on files outside W's list (J2 and `FTraitOrObjectOrGeneric.java`; K's diff touches neither, so no stop was met). W.worker.10, W.skeptic.3, W.judge.6: the trace switch entry. W.worker.11: the row 590 entry. W.worker.12: the provisional rows entry.

## Rung K (`rung-walk-load-check`)

**Inherited from the branch.** Ten commits, `bc4ca0888` (the promoted test alone) to `018bed432` (the skeptic's judgement). The branch carries `SKEPTIC.md` only; the skeptic approved with four required corrections, and there was no repair round.

**Applied.** No conflict; every path matches the branch.

**Written from the journal.** `REPORT.md` and `record.md` (`journal-text.py`, `reportText` and `recordText` of `rung:K resume:K repair:K`); `SKEPTIC.md` is the branch's. `record.md` was folded and is not landed.

**Corrections** (the skeptic's four, all made at the gather, each marked in `REPORT.md`):
1. Row 551 stays open: its status reads the main component's clauses fixed, and its note quotes `SkNonMain551` (row 551's program inside another component of the program prints `f(S)` under walk at `6e192f7f3`, while the compiled checker refuses its component) and `SkCrossUnlisted`; the object expression `SkObjExpr551` is row 597. Decision 6's sentence now says the main component only, that row 551's scope is any component, and that the third scope the skeptic names was not considered. The FACTS entry and its amendment say "row 551 for the main component's clauses".
2. Section 5's sentence and section 7's row 22 bullet say that the compiled run of row 22's program prints `Value`, rc=0, the compiled prelude's `Number` being open (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:510`), and that the checker refuses it over the one library only (`Library/FortressLibrary.fss:360-361`); row 22's note says the same.
3. Section 3 and decision 3 say that a failure while the top-level variables are initialized counts as a refusal at load (`Driver.java:244`; the skeptic's `SkKeyTopInit`, ' OK Saw expected refusal at load'); the FACTS entry says it too.
4. Steps 5 and 7 of section 2 say that `GenericBesidePlainOverlapShapes` and `ComprisesGenericChildUnlistedExtender` were written after their fixes were built, and that the first version of the latter was refused on the base for its unrelated `f(x: A)` / `f(x: B)` pair and rewritten.

**Recommended rows.**
- Walk's closure check reading only the main component's clauses, row 551's program in another component: refused as a new row, since row 551 stays open for it (correction 1) and carries the skeptic's probes; no file of `tests/` can hold a program of two components.
- Object expressions against a `comprises` clause, on both paths: opened, row 597, home 2 under walk with the rung's key: `ProjectFortress/tests/XXXComprisesObjectExpressionUnlisted.fss` and `.test` (`load_exception_contains=Invalid comprises clause`). On the merged tree: 'f(S)' / ' Saw expected failure: loaded and ran, not refused at load', 'OK (2 tests)' with the next; on a stand-in with a named `object Z extends { S, T }`: ' Refused at load as its keys name', red.
- The clause's other half, a listed type extending each instantiation: opened, row 598, home 2: `ProjectFortress/tests/XXXComprisesListedTypeExtendsEachInstance.fss` and `.test`. On the merged tree: 'int' / ' Saw expected failure: loaded and ran, not refused at load'; on a stand-in adding an unlisted `object Odd extends Expr[\ZZ32\]`: 'Invalid comprises clause: Expr has a comprises clause but its immediate subtype Odd is not eligible to extend it', ' Refused at load as its keys name', 'Tests run: 2,  Failures: 2' over the two stand-ins.

**Folded.** One FACTS entry under "Execution model", after the entry it amends ("Walk's load check reads a generic declaration beside a plain one on declared domains ..."), whose gated list and last sentence follow the record. Ledger: row 552 FIXED, row 551 for the main component; notes on 551, 552, 534, 544, 549, 22 and 487; rows 595 to 598 (595 and 596 with the path of K's report in their test column, and 596 with the skeptic's point on `extendNumber`). The handover paragraph. `PLAN.md`: three entries.

**Items for Pavol.** K.worker.1, K.skeptic.1: the scope entry. K.skeptic.2: the `Number` entry. K met no reserved stop.

## Rung R (`rung-range-meets`)

**Inherited from the branch.** Four commits, `f10b6dbc4` (row 586's promoted test alone) to `426ce443e` (the skeptic's judgement): the tests (`0ea0c916b`) and the edit (`702e62058`). The branch carries `SKEPTIC.md` only; approved with four required corrections, no repair round.

**Applied.** No conflict; every path matches the branch.

**Written from the journal.** `REPORT.md` and `record.md` (`reportText` and `recordText` of `rung:R resume:R repair:R`); `SKEPTIC.md` is the branch's. `record.md` was folded and is not landed.

**Corrections** (the skeptic's four, all at the gather):
1. `ProjectFortress/tests/XXXStridedRange3DShiftWalk.fss`, asserting `StridedFullRange3D(-1,-1,-1, 3,3,3, 2,2,2)` for `shiftLeft((1,1,1))` and `StridedFullRange3D(1,1,1, 5,5,5, 2,2,2)` for `shiftRight`, its messages citing `objects.tex`, section "Object Declarations". On the merged tree: "InterpreterBug: ... XXXStridedRange3DShiftWalk.fss:8:12-36:" / " OK Saw expected exception"; with `StridedFullRange2D`'s two bodies given a third component in `StridedFullRange3D`, a local fix reverted after the run: "Expected failure or exception, saw none" / "Tests run: 1,  Failures: 1". Row 602.
2. `ProjectFortress/tests/RangeTupleShiftWalk.fss`: one comment line saying what it checks (naming row 503); the six messages say what each shift answers, without "row 503:" or an api line. On the merged tree it prints 'REACHED', 'PASS', 'OK'.
3. `REPORT.md` section 1.3 and decision 4 say that `SimpleMappedSeqIndexed` does not carry `MappedGenerator`'s `reverse`, `reduce`, `g` and `f`, and that `seq(0:6:2).map(f).reverse.asString` changes from `mapped(7,5,3,1)` to `SimpleReversedIndexed(mapped(seq(1,3,5,7)))`, elements and order unchanged; a new section 10 lists the rung's stops, this one among them, since the journal's text had no stops section (the worker's were in its structured result).
4. `REPORT.md` section 4 says that `dev1` and `dev2` ran on one code state, the edit committed as `702e62058`, on which the distance stage then ran again. The journal's text has no decision 8, which the correction also names; the report says so.

**Recommended rows.**
- `StridedFullRange3D`'s missing shifts: opened, row 602, home 2 (correction 1).
- `SimpleMappedSeqIndexed`'s `reverse`: opened, row 603, home 3: two assertions added to `ProjectFortress/tests/RangeDeclarations.fss` pin `seq(0#4).map(f).reverse.asString` as `SimpleReversedIndexed(mapped(seq(0,2,4,6)))` and its elements as 6, 4, 2, 0 (on the merged tree 'OK (1 test)').

**Folded.** One FACTS entry under "The checker and the one library". Ledger: rows 503, 580, 583 and 586 FIXED; notes on 580, 583, 586, 503, 569, 577 and 488; rows 599 to 603. The handover paragraph. `PLAN.md`: a new group "Before the switch-over, raised by climb batch 9" under "Pavol's answers" with items 39, 40 and 41, and three entries.

**Items for Pavol.** R.skeptic.2: item 39. R.skeptic.4: item 40. R.skeptic.3: item 41. R.worker.1: the decision 1 stop entry. R.skeptic.1: the row 603 entry.

## Rung S (`rung-string-slips`)

**Inherited from the branch.** Fourteen commits, `9261317e9` (the test alone) to `ddccf1866` (the second judgement): the first pass (`632fc9d53` to `3f829ce88`), the first skeptic's refusal (`d41a7ff15`), the judge's ruling (`ec6b2141c`, `52ea5b5cd`), the repair round (`77a2cb2ea` to `57ffd8486`). The branch carries `REPORT.md`, `record.md`, `SKEPTIC.md` (both rounds) and `JUDGE.md`.

**Applied.** No conflict; every path matches the branch but `Library/FortressLibrary.fsi` and `.fss`, which carry R's declarations above S's; the landed library files are byte-equal to the merged tree's (`cmp`).

**Written from the journal.** None; all three files are the branch's. `record.md` was folded and is not landed.

**Corrections.** The first six, the first judgement's and the judge's, were made by the repair round and confirmed by the second judgement (`SKEPTIC.md` section 1, F1 to F6): strided slices by List's device with seven `StringPieces` assertions shown failing at `52ea5b5cd` ('FAIL: J5/0:abcde =/= J3/0:ace'); `CASE_INSENSITIVE_CMP` repaired by its contract with two assertions; `rangeContains` pinned (row 607); the getter citation to traits.tex, section "Abstract Field Declarations"; the provenance lines as the judge split the finding; the five value changes listed in section 6 and stopsMet. The second judgement's one, made at the gather:
7. `REPORT.md` section 6 and section 12's strided-slice bullet, and the handover paragraph, say that the claim holds for explicit strided ranges and the implicit `a::c` and `::c`, while for the implicit `:b:c` String answers the range library's completion from the right end (`"abcdef"[:3:2]` is `bd`, through `RightScalarRange`, `Library/RangeInternals.fss:655-690`), as List and the arrays do, not ranges.tex's `l:b:c`; they name row 609.

**Recommended rows.**
- `String`'s default `CASE_INSENSITIVE_CMP`, "if the repair round leaves it": refused, since the repair round repaired it by the library's contract, with two assertions in `StringPieces.fss`.
- `FlatString.rangeContains`, "if the repair round leaves it": refused as a new row, since the repair round pinned it and opened it, row 607.
- `ImmutableArray1`'s `opr[r]` reading `r'.lower`: opened, row 608, a site of the landed distance list (`explorations/compile-ladder/gate/distance-sites.tsv:355`) whose row carries the repair's caution, to keep the stride, which the first pass's String reads dropped.
- The implicit `:b:c` completed from the right end: opened, row 609, home 2: `ProjectFortress/tests/XXXSubscriptImplicitStridedRange.fss`, asserting an array's, a list's and a string's `[:3:2]` by ranges.tex, section "Ranges". On the merged tree: 'FAIL: a Int: 11 =/= a Int: 10; ranges.tex, section "Ranges": ...' / ' OK Saw expected exception'; on a stand-in subscripting with `0:3:2`: 'Expected failure or exception, saw none', red.

**Folded.** One FACTS entry under "The checker and the one library", with the `:b:c` qualifier. Ledger: a note on row 585; rows 604 to 609 (row 607's `||` and row 609's list brackets escaped for the table). The handover paragraph, with correction 7. `PLAN.md`: item 42 in the batch 9 group, a sentence appended to item 38, and eight entries. And the re-anchorings of W's rows 589 and 590 and their `PLAN.md` entries described under "The order".

**Items for Pavol.** S.worker.1, S.skeptic.2, S.judge.1, S.skeptic2.1: the five-values stop entry, with row 609. S.worker.2, S.judge.2: the `CASE_INSENSITIVE_CMP` entry. S.worker.3, S.judge.3: the row 607 entry. S.worker.4, S.judge.4: the `uncheckedSubstring` entry. S.worker.5: the varargs stop entry (row 604). S.worker.6: item 42. S.worker.7: item 38 (appended). S.worker.8, S.skeptic.1, S.judge.5: the `String` api entry. S.worker.9: the `compiler_tests/` entry.

## The gather's own points

None. No rung of this batch has its specification text checked against another rung's landed code by the batch intro; the gather read W's two boxes and Appendix I entry against K's load-check code and found no sentence on walk's load check, and read the overloading chapter's dispatch callout against W's rule, which still holds there, a parameter that is a parameter's whole type taking the argument's type.

## The test corpora after the batch

`ProjectFortress/tests/` holds 503 `.fss` files against 479 at the base (27 added, 3 removed, four renamed), so `testSystem`'s sum rises; nine `.test` key files sit beside them and are skipped by the harness. `ProjectFortress/compiler_tests/` holds 522 `.test` files against 516.

## Not done here

- `Specification/fortress.pdf` is not rebuilt; the commit stage rebuilds it once on the landed tree.
- FACTS "The true distance to the switch-over" is not given the landed figure, which needs the gate.
- The `<short hash>` placeholders wait for the commit stage: in the ledger and in the four handover paragraphs, none in FACTS or this record.

## The gate

**The gate, run in full on the tree at `1e176516c`** (2026-10-03, the workflow's gate stage): green. The review's `ecd8fa04a` and `08865d40a`, committed while it ran, touch `explorations/` alone; the review's repair `ba3651b94` touches `Specification/appendices/changes.tex`, which no gate stage reads, so the gate was not run again and its tables are of the tree before it (`gate/summary.txt`, its `# repair-ungated` line). The gate's summary line: GREEN; `compileAll` `BUILD SUCCESSFUL` in 57 s; `testFast` 48 suites, 1,782 tests (the compiler track 1,004 to 1,010), 0 failures, 0 errors, in 10 min 35 s; `testSystem` four shards, 128 + 125 + 127 + 124 = 504 tests (480 at batch 8), 0 failures, in 4 min 3 s; 42 of 42 four-thread `atomic` runs `PASS`; the ladder unmoved (85 files at `pass`, the eighteen microGPT components at `disambiguate`); `COUNT DOWN 56 -> 1, declared none`, the one error left the `isLeftZero` pair of `LexicographicReduction`; `DISTANCE DOWN 565 -> 340 (-225)`, reported, its two moved crash rows the same two declarations one line lower. The outputs are in `climb-batch-9/gate/` and the per-site list at `explorations/compile-ladder/gate/distance-sites.tsv`; the hash placeholders "Not done here" names are filled in the landing commit (W `669b77d03`, K `7ed2a8387`, R `631fb867e`, S `1e176516c`).
