<!-- The post-batch review of climb batch 9 (run wf_f747fd3e-9e4, base fa14a190c, launched 21:38 UTC on 2026-10-02, stopped by a VM restart at 23:35 and resumed at 23:37, landed at about 03:21 UTC on 2026-10-03 at cec70988b: rung W 669b77d03, K 7ed2a8387, R 631fb867e, S 1e176516c, the merged-diff review's corrections ecd8fa04a, its judge 08865d40a and repair ba3651b94, ungated), the first batch run on the practice of POSITIONS "Test first, the test kept." and "Nothing is built or run twice on the same code.", the one combined pass of POSITIONS "One review after every batch." in the form of reviews/batch-8-review.md, measured against that review's section 4 as its before; written by a review worker reading only, against main at 314bd1513 (FACTS read again at 10c511702), the gate's landed tables as before and after, the 22 transcripts and the journal read through bounded scripts in the session scratchpad; nothing built, no Fortress program run, no gate stage run; tokens are writes only (cache writes plus new input, one count per message id). -->

# Climb batch 9: conformance, process and routing

## What came up in this run

### 1. The count 56 to 1 and the distance 565 to 340, by class and by rung edit

The landed per-site lists (`explorations/compile-ladder/gate/distance-sites.tsv` at `fa14a190c` and at `cec70988b`), read site by site. Each after-site's line was mapped back to the base through the diff of each library file, and both lists were classed with the stage's own `classify.py` at base lines, so that a moved line does not move a site between classes (row 577).

**The count, 56 to 1: all of it rung R's.**
- Before: the `RangeInternals` api 51 errors (`CAP` 32, `IN` 17, `map` 2) and the `FortressLibrary` api 5 (`IN` 3 on `FullRange`, `CompactFullRange` and `StridedFullRange`, `SQCAP` 1 on `Just`, `isLeftZero` 1). The table prints each api's errors twice: 102 and 10.
- Rung R's declarations on the meet cleared 53 of them (`compile-ladder/rung-range-meets/REPORT.md` section 1.1): `CAP` on `BoundedScalarRange` (`Library/RangeInternals.fsi:230`) and on the rank-2 and rank-3 bounded types; `IN` on `FullRange[\I\]` (`Library/FortressLibrary.fsi:2262`), `FullRange2D/3D`, `OpenRange2D/3D` and `ExtentRange2D/3D`; `SQCAP` on `Just` (`FortressLibrary.fsi:988`).
- Its new object `SimpleMappedSeqIndexed` (row 583, `Library/FortressLibrary.fss:4137-4153`) cleared the two `map` pairs.
- Left: `isLeftZero` in `LexicographicReduction` (`FortressLibrary.fsi:93` against `:1927`), row 582, Pavol's choice. `#crash none` unchanged.

**The distance, 565 to 340: 226 sites gone, 1 new, 17 still erring with a changed message.**
- By rung edit:
  - Rung R: 152 of the 188 sites its record gave it. The Meet Rule pairs 97 (class M1: `CAP` 64, `IN` 30, `SQCAP` 1, `map` 2) and 55 slips (OT 35, RG 7, NM 5, I4 3, D2 2, I1 1, I3 1, X1 1). Its own tree measured 565 to 416: the same 152 gone, and 3 big-operator sites new there by row 488's drift.
  - Rung S: 71 of its 84. SF 22 (`CatString`'s fields renamed `first` and `second`), NM 22, OT 10, CV 8, GF 6, I3 2, X1 1. Its own tree measured 565 to 495 with the repair.
  - Row 488's drift, no rung's edit: 3 big-operator sites gone (`FortressLibrary.fss:130`, `:1599`, `:3314`) and 1 new (`:3277`, now `:3278`, `BIG MIN`), the movement row 488 records for declarations no edit touched.
  - Rungs W and K: none, and none possible. Every path they edit is one the stages do not read (FACTS, "The checker-count and distance stages read only the compiler's phases").
  - Arithmetic: 565 − 152 − 71 − 3 + 1 = 340.
- By class, at base lines: M1 −97, OT −41, NM −30, SF −22, RG −8, CV −8, GF −6, I3 −3, I4 −3, D2 −2, X1 −2, BR −2, I1 −1. Four of the 17 changed sites changed class: R's `RangeInternals.fss:145` (RG to OT) and S's `FortressLibrary.fss:4139`, `:4140` and `String.fss:471` (NM to OT).
- **The stage's class table misfiles 3 sites again (row 577).** It prints I1 9 to 5 and OT 183 to 145; by site it is I1 9 to 8 and OT 183 to 142. Rung R's insertions moved three I1 errors out of `classify.py`'s fixed ranges: `FortressLibrary.fss:3965` to `:3967` (`ANYINTEGRAL_FL`), and row 601's `RangeInternals.fss:1425` and `:1433` to `:1510` and `:1518` (`ANYINTEGRAL_RI`). The same fixed ranges already put G1's 18 tuple-comparison sites (`FortressLibrary.fss:4431` on) in OT, so the table shows no G1 row at all.
- No kind, class or unit rose. The two moved crash rows are the same two declarations one line lower.

**What is left of the 340.**
- The arrays: V1 28, V2 32, Z1 11, 71 in all. The array questions after the switch-over (batch 8's Q4).
- The self-typed bodies, S1 28. A list of ways and a top-tier judgement first (batch 8's Q2).
- Row 560's 18 "Function body has type Object, but declared return type is ()" (`Writer.fss` 8, `FortressLibrary.fss` 6, `FortressBuiltin.fss` 3, `NativeArray.fss` 1), waiting on item 20 (Q1, not answered before the launch), and its 11 of item 36.
- Rung R's 36 under rows 599 to 601 (items 39 to 41) and rung S's 13 under rows 604 to 606 and row 585's note.
- `isLeftZero` 2 (row 582).
- The rest, about 160: `FortressLibrary`'s one-off slips and checker limits (G1 18, D1 12, BR 8, MB 7, F1 4, R3 and R4 4, the integer classes), and `List`'s 22.
- The four crash rows, unchanged.

### 2. Builds, suites, stages and log reads, by role, against batch 8's before

Counted from the 22 transcripts: every `ant compileAll`, whole-suite run and stage run launched, with its own time line, and the code state it ran on. Batch 8's before is `reviews/batch-8-review.md` section 4.

**Builds (`ant compileAll`): 16, one of them of code already built.**
- The coordinator's base build before the launch, `/home/user/fortress-base9` at `259d4c9e5`, whose sources are those of `fa14a190c`: 1, about 200 s by `coordinator/build-cache-exploration.md` section 5. The coordinator's session is not in the run's transcripts.
- Rung K: 6, from 21:52 to 22:44, 1 min 20 s to 1 min 58 s each. Each followed a new edit.
- Rung W: 7. Four by the worker the restart killed (23:19, 23:22, 23:25, 23:31), three by the resumed worker (23:52, 00:04, 00:08), 53 s to 1 min 35 s each. Each followed a new edit; the resumed worker rebuilt nothing its predecessor had built.
- Rungs R and S: 0. They edited only the library, which walk re-reads with no build.
- Every skeptic, judge, repair round and second skeptic: 0.
- The gather: 1, the merged tree in a seeded worktree, 47 s.
- The gate: 1, 57 s and the library order, about 3 minutes, on `1e176516c`. Its sources are byte for byte the gather's merged tree ("Main's code and tests are byte-identical to that tree", the gather's summary). This is the batch's one build of code already built, as in batch 8.
- About 20 minutes of compile by the Total-time lines, and the base build's few minutes before the launch. Batch 8: 35 builds, 22 of code already built, 28 minutes of compile and about 55 more of library rebuilds.

**Whole-suite runs: 5, none on a code state already run.**
- Rung K: its interpreter corpus once, two shards (246 and 243 tests), on `524852baf`.
- Rung W: the corpus twice, four shards (486 tests). At 23:57 on `b037c7426` it found six tests broken by giving a big operator's parameters their bound; at 00:11 on `0244b0ce4`, after decision D2, it was green. Each run was on its own code state, as the rule asks; the record's brief allowed one.
- The gate: `testFast` (10 min 35 s) and `testSystem` (4 min 3 s), once.
- Every other role ran single tests through `harness-one.sh` only.

**Stage runs (checker count and distance).**
- Full runs, each on a new code state: rung R once (the count 2 min 41 s, the distance 1,025 s, on `702e62058`); rung S once (2 min 47 s, 1,162 s); S's repair round once, on its repaired library (the distance 496 to 495); the gate once (1,212 s). W and K ran none.
- **Partial runs repeated measurement.** Two workers ran the stage's own driver on chosen components as a development check (rung R's `devcheck.sh`, rung S's `dev/devcheck.sh`) and then ran the full stage on the same code:
  - R: `RangeInternals.fss` (388 s) and `FortressLibrary.fss` (625 s), both on the code committed as `702e62058`, which the full stage then measured. R's skeptic caught it and the report now says so (`rung-range-meets/REPORT.md` section 4, correction 4).
  - S: four runs on `String`, `FlatString` and `Stream` (168 s, one cut by the restart, 213 s, about 200 s). The first three were on earlier edits; the fourth was on the code the full stage measured four minutes later.
  - Together about 20 minutes of the machine. R's two ran on its chain, and S's worker could not start until R finished (two agents at a time), so about 18 of those minutes were on the critical path.
- No skeptic ran a stage. R's and S's skeptics compared the worker's tables with `compare.sh`.

**Long log reads: none.** No agent read a whole build, suite or stage log. Every tool result over 12K characters was a briefing, a diff, a report or a record, or, in the two resumed workers, the extract of the killed worker's transcript (W four reads, about 130K characters; S one, 35K). The gate read nothing over 12K.

**The skeptics built nothing and checked out nothing.** Each ran its own programs in the rung's worktree for the new code and in the rung's private copy of the base for the old (`fortress-walkload-base`, `fortress-ranges-base`, `fortress-strings-base`, `fortress-walkinst-base`). Each copy was seeded by the rung's worker and reused by the rung's later roles. None ran in the base build. Three compiled their own programs on the compiled path (`fortress compile`), which the rule allows. Each read the worker's order of work in its transcript with `jq`, as check 3 now asks.

**Against batch 8's before, in one list.**
- Builds of code already built: 22 of 35 to 1 of 16.
- The gate: twice to once. The review's repair changed only `Specification/appendices/changes.tex`, recorded as `# repair-ungated` in `climb-batch-9/gate/summary.txt`.
- The second skeptics: from redoing the whole list (0.35M each, 15 to 20 minutes) to checking the repair only (0.19M and 0.20M, 8 and 10 minutes).
- A skeptic's stage re-run (846 s) to none; but the workers' partial runs above.
- The cache rewrite of 0.46M to none. The 270 s cap on `wait_for` held: the longest gap between two messages of one agent was 288 s, and no agent wrote more than 30K in any message after its first.
- About 0.5M and an hour of the critical path built or run twice, to a few thousand tokens written in polls and about 23 minutes of the machine (the gate's build and the partial stage runs), 18 of them on the critical path.

### 3. The two refusals

**Rung S: a real defect of the rung's own change.**
- The first pass replaced `range.lower` and `range.upper` with `range.left.get` and `range.right.get` in `FlatString.uncheckedSubstring` (`Library/FlatString.fss:64`) and in `SubString`. That drops a range's stride. On the base a strided slice of a string raised; on the head it answered wrong characters: `"abcdef"[0:4:2]` gave `"abcde"`, and `cs[18:24:2]` was a `SubString` of size 4 that printed `"aabcdef"`.
- The specification gives the set `{a, a+c, ...}` (`Specification/basic/expressions/ranges.tex`, section "Ranges"), and the rung's own precedents read the stride (`Library/List.fss:146-151`).
- The skeptic also found two defects with no home: `String`'s default `CASE_INSENSITIVE_CMP` is reached under walk through `SubString`'s fallback (`Library/String.fss:411`), which the report called unreachable; and `FlatString.rangeContains` finds only the first occurrence (row 607).
- The repair used List's device at `String`'s `opr[r0]`, repaired the comparison by the library's `ensures` clause and pinned `rangeContains`. Its second skeptic found the implicit `:b:c` completed from the right end (row 609).
- Cost: judge 0.22M, repair 0.25M, second skeptic 0.20M, 0.67M, and 55 minutes of the critical path (01:15 to 02:10). It kept a silently wrong value out of the library.

**Rung W: real findings, but none needed code.**
- The refusal named three departures from the decided instance rule with no home and no sentence in the boxes: a parameter with several bounds walk cannot meet stays at `BottomType` (row 591); decision D3 gives `ap[\T, A extends T\](Apple)` the arguments' type where the chapter and the compiled path give the bound (row 592); and row 587's pin asserted a `BottomType` instance the chapter forbids.
- The findings were right. The skeptic itself wrote "The repair needs no code change and no build", and the judge ruled "No code change, no build and no suite run".
- The repair wrote three walk expected failures, two compiled pairs (rows 593 and 594), and corrected the boxes, Appendix I and the decision record.
- That is the kind of work the gather did for the two approved rungs in the same batch: it opened rows 597, 598, 602 and 609 with their expected-failure tests, each run on the merged tree and on a stand-in that turns it red.
- Cost: judge 0.23M, repair 0.31M, second skeptic 0.19M, 0.73M. It added no critical-path time, because S's longer chain ran beside it.
- The script made it a refusal: "Refuse only for the change or the test: ... a sibling defect has no home, a decision on record was not followed" (`coordinator/climb-batch-workflow.js:1180` at `fa14a190c`). A departure the record reserves as a reversible stop already has its route, `stopsMet`, and a home owed with no code is a required correction the gather can make. As a required correction it would have cost, by this review's estimate, about 0.2M of the gather's time instead of 0.73M.

### 4. The seeding and the shared base build

- **Cost.** One base build, about 200 s, before the launch. Nine seeds by `coordinator/tools/seed-worktree.sh`: four rung worktrees and four private base copies at 2 to 6 s each, and the gather's merged tree at 37 s (19 s of it creating the worktree). About 5 minutes of the machine in all.
- **What it replaced.** In batch 8 each worker built the base before its first edit (216 to 425 s each), and skeptics, repair rounds and second skeptics rebuilt base and head; with the second gate, about 107 minutes of agent time and 0.23M written (`build-cache-exploration.md` section 4).
- **What it gave.** Rung R committed its first test 11 minutes after the launch and K 12 minutes. No skeptic waited on a build. Every role that needed the old code found it seeded in seconds.
- The seed held on code: the base build was made at `259d4c9e5`, and `git diff 259d4c9e5 fa14a190c -- ProjectFortress Library build.xml Specification` is empty.

### 5. The restart

- The VM restart at 23:35 killed the run with rungs W and S in flight, 34 and 27 minutes into their work. R's and K's results came back from the journal; W's and S's workers started again at 23:37 under their own keys.
- **What survived.** The worktrees, the branches and every commit. W had committed its tests (`4f4fc1ead`, 23:16) and its first edit (`2b734f9cb`, 23:34:08, 13 seconds before its last call), with four builds and its probes on disk. S had committed its test (23:27) and left its library edits in the worktree.
- **What it cost.**
  - The two resumed workers wrote 0.47M before their first new edit (W 0.28M to 23:48, S 0.19M to 23:47), re-reading their briefings, the diff, the code and the killed worker's transcript. The two killed workers had written 0.68M; their products were kept, their context was not.
  - About 13 minutes of the critical path: 3 minutes of downtime and about 10 of re-reading.
  - S's second development run, cut off. W's interpreter suite had not started.
  - No build was redone.
- **What the prefix lacked.** It tells a relaunched worker to read its branch and its `tmp/` and to verify, not redo, what is committed (`climb-batch-workflow.js:973`); both workers followed it. It does not name the predecessor's transcript. Both searched for it themselves, and W's search over every transcript ran past its 120 s timeout.

### 6. The review's blocking finding

- **The finding.** `Specification/appendices/changes.tex:1321`, the Effect of the entry "The traits that extend a closed trait", said "The interpreter does not check comprises clauses." Since rung K, walk checks at load the clauses of the program's main component (`ProjectFortress/src/com/sun/fortress/interpreter/Driver.java:227`). The review was right that an Effect must be true (POSITIONS, "Every change to the specification is recorded with its reason").
- **Who missed it.** K could not edit the specification, and its report named no sentence it made false. Its skeptic did not read Appendix I. The gather compared only W's text with K's code. The record knew the subject: its K section says the closure check "also covers row 22's program", and row 22 is "walk never checks a `comprises` clause".
- **What it cost.** The judge 0.19M (7 minutes) and the repair 0.20M (4 minutes). The gate did not run again: the script's path rule held, and batch 8's 24-minute second gate did not recur. The repair added 4 minutes to the critical path (the gate ended at 03:11, the repair at 03:15).
- **What the judge added.** The review's proposed sentence was itself wrong in two places: "as the compiled type checker reads them" does not hold (walk resolves names in each declaration's environment, the checker by simple name), and it left out rows 22 and 487. So a review that fixes such a sentence itself needs the same clause-by-clause check against the code that the repair made.
- **Half of batch 8's finding 6 is built.** The gate rule is in the script. The review's prompt still classes the specification among the paths it may not fix (`climb-batch-workflow.js:1635`), so a one-sentence text finding still goes through a judge and a repair.
- **The repair read every rung's briefing.** Its role runs the `checks` briefing of W, K, R and S before its ruling, about 85K bytes for W alone, to fix one sentence about K's code. That is most of its 0.20M.

### 7. Tokens, counting writes only

Per message id in each of the 22 transcripts: cache writes plus new input. Cache reads and output are not counted. The coordinator's session is not counted.

By stage:
- Rung workers, 6 transcripts: 2.69M. R 0.58M, K 0.55M, W 0.84M (0.36M killed, 0.48M resumed), S 0.73M (0.32M killed, 0.41M resumed).
- First skeptics, 4: 1.24M. R 0.37M, W 0.32M, K 0.28M, S 0.26M.
- Judges, 2: 0.45M. W 0.23M, S 0.22M.
- Repair rounds, 2: 0.56M. W 0.31M, S 0.25M.
- Second skeptics, 2: 0.40M. S 0.20M, W 0.19M.
- Gather: 0.47M. Gate: 0.13M.
- Merged-diff review 0.42M, its judge 0.19M, its repair 0.20M.
- Commit: 0.15M.
- Total: 6.88M over 22 agents, 5 h 44 min from launch to the last call.
- By chain: R 0.95M, K 0.83M, W 1.89M, S 1.66M, the tail after the rungs 1.56M.

Against batch 8 (7.72M, 21 agents, 7 h 37 min): workers 2.69M against 2.67M (about 2.2M without the restart); first skeptics 1.24M against 1.34M; two refusal chains 1.40M against 1.93M; the tail 1.56M against 1.78M. The record estimated 5M to 7M, 12 to 16 agents and 7 to 10 hours (`coordinator/CLIMB-BATCH-9.md`, "Cost").

**What the batch spent against what it changed.** 6.9M written and 5 h 44 min bought walk's half of the paper's instance rule (a parameter nothing fixes takes its declared bound, a lone parameter and a join of several supertypes take the bound, rows 516's walk half, 555 and 424's plain-bound half), `MatchFailure` from a typecase that matches nothing (row 558), generic functional methods of generic traits under walk (row 567), walk's load check of the main component's `comprises` clauses and of every generic-beside-plain shape (row 552, row 551 in part), a harness key that gates an expected refusal at load (rows 534, 544, 549, 22, 487, 597 and 598 now gated), the range types' meets and slips (rows 580, 583, 586 and 503) and the string components' slips with strided string slices answering the specification's set, 46 new test files (24 more interpreter tests, 6 more compiled), the count 56 to 1 and the distance 565 to 340, with no model line, team test line or checker source changed. It also cost 23 rows opened (587 to 609), three departures from the instance rule kept as reversible stops (two of them gated by a test), seven value changes under walk listed for Pavol (S's five, R's two), and one closure check narrower than the text. About 1.3M of the 6.9M (19 %) went where a cheaper route existed: the restart's re-reading, about 0.47M, which no practice caused; W's refusal for work the gather could have done, about 0.5M over the gather's cost; and the review's judge and repair for one sentence, about 0.3M over a careful fix by the review itself. Repeated builds and runs, which cost batch 8 about 0.5M, cost this batch a few thousand tokens and 23 minutes of the machine.

## Part 1. Conformance

### Method

As in `reviews/batch-8-review.md`: for each rung, `git show` first; then its `REPORT.md`, `SKEPTIC.md`, `JUDGE.md` and decision record; then the record's section for it (`coordinator/CLIMB-BATCH-9.md` sections 1 and 3); then the gather's `climb-batch-9/RECORD.md` and the journal's results; then the landed code on `main`. Three standards, kept apart: the specification (with the 2012 Types chapter where it speaks), the team's built intent, and the decisions on record (POSITIONS, PLAN). What the skeptics, judges, gather and review found is cited, not repeated. Claims marked "by reading" were not run.

### The verdicts

- **Rung W, walk's instances: in the spirit**, with three departures from the instance rule kept as reversible stops (D2, and D3 and several bounds, each gated), one change to which declaration runs (row 589), and two files outside its list, all on Pavol's list.
- **Rung K, walk's load check and the harness key: in the spirit**, with the closure check narrowed to the main component (row 551 stays open), on Pavol's list. It made one Appendix I sentence false, which the review repaired.
- **Rung R, the ranges: in the spirit.** Two devices settle forks in Pavol's stead (the rank-2 and rank-3 `cast`, item 39; row 583's object, the row 603 entry), both listed.
- **Rung S, the strings: in the spirit after its refusal.** Five walk values changed by repairs of named sites, listed. Item 20's drop was not built, since Q1 was not answered.

### Rung W, `669b77d03`

**What landed.**
- `EvaluatorBase.java`: `instanceOf` (`:156-191`) gives a parameter nothing fixes its declared bound, `Any` if none; `boundAtInstances` (`:217`) for a bound that mentions other parameters; a lone parameter's candidates are the arguments' types, their coercion targets and its bounds (`narrowest`, `:458-464`); `BoundingIntervals` (`:103-127`) puts the bound where a join has several minimal supertypes, only when walk instantiates.
- `Evaluator.java:1441-1442`: a typecase with no match throws `MatchFailure`, the case expression's own three lines (`:426-428`).
- `GenericFunctionalMethod.java` (`Own`, `OwnClosure`) and `FTraitOrObjectOrGeneric.java:121-122`: a generic functional method of a generic or plain trait runs.
- The inference chapter's two notes on walk and its Appendix I entry, in the S1 form; 10 interpreter and 6 compiled test files added, two expected failures promoted, two removed.

**Standard 1.** The decision's words are built for a plain bound: the bound, never `Bottom`, never the union, never a common supertype (`compile-ladder/rung-walk-instance/REPORT.md` section 2). The typecase follows `typecase.tex`, section "Typecase Expressions". Row 567's program is valid by `traits.tex` and runs. Where walk still departs, the boxes now say so and each case has a gated expected failure (rows 587, 588, 591, 592). The F-bounded half waits for P1, as the record said.

**Standard 2.** Every device is walk's own: the bounding map's upper end as the bound (`LatticeIntervalMapBase.meetPut`), a subclass of the bounding map used only by instantiation in place of a global edit to `TypeLatticeOps.join`, the dotted call's route for an own generic method (`GenericMethod.typeApply`). The global join edit was tried and replaced (`REPORT.md` section 4).

**Standard 3.**
- D2 keeps `BottomType` for a big operator's static parameters, because the library builds a comprehension at its elements' type and six tests broke under the bound. D3 keeps the arguments' type for a parameter bounded through another, because the library's `APPCOV` depends on it (`Library/CovariantCollection.fss:27`). D2 departs from "never `Bottom`" and D3 from "never the value's type alone"; both are the record's reversible stop "a parameter nothing fixes bound to anything but its declared bound", met and lifted, and on Pavol's list. Each keeps the library running rather than redesigning it.
- Row 589: where no declaration applies without coercion, the coercion pass now finds a generic at its bound (`either(Apple, Cherry)`). The stop "a change to which declaration walk chooses" was met and lifted. The decision "Conversions never change which declaration runs" is not crossed: no declaration applied before.
- Row 590: the one library declares `MatchFailure` checked against the text; the repair is a library edit outside W's files, gated.
- `FTraitOrObjectOrGeneric.java` and `compiler_tests/` are outside W's named files; K touched neither, so no rule-1 stop was met (PLAN entry).

**Verdict: in the spirit.** The rule is built where the library allows it, and each place it is not is gated and listed.

### Rung K, `7ed2a8387`

**What landed.**
- `FileTests.java`: the key, `load_exception_contains` and its siblings in a `Name.test` beside an interpreter test, judged by `generalTestFailed("load_", ...)` and a frame of `Driver.evalComponent` (`:470-515`, `:835-879`).
- `BuildEnvironments.java` (`checkComprisesClauses`, `:1052-1352`) called from `Driver.java:227`: the main component's closed traits' explicit extenders checked at load, by the 2012 reading.
- `OverloadedFunction.java`: the generic-beside-plain overlap read for every shape of static parameter (row 552).
- 20 test files added, 9 of them keys and 4 of them the gather's (rows 597 and 598); one expected failure promoted.

**Standard 1.** The closure check reads a clause as `traits.tex`, section "Trait Declarations", does since batch 7C, and `AnyIntegral`'s clause stays accepted. The overlap reading follows `overloading.tex`, section "Declarations with Static Parameters". The text reads every clause; the check reads the main component's only.

**Standard 2.** The key is the compiled harness's own format and evaluator (`StringMap.FromFileProps`, `generalTestFailed`), with the `.timing` file beside a test as precedent. The `XXX` reading is the reverse of the compiled one for a stated reason: an over-acceptance is what the walk rows need to gate (`REPORT.md` section 3). The closure check reads declarations, as the checker's `everyKnownSubtypeListed` does.

**Standard 3.**
- The scope narrowing (decision 6): reading every clause refuses at load every program importing `Reflect`, because of the library's own `object Reflect[\T\]() extends Type` (`Library/Reflect.fss:304`; row 595), and four team tests and two demos that extend `Number` or `Exception` (row 596). The record's stops forbid a library type or team test refused at load, so K narrowed rather than edit them. Row 551 stays open for the user's other components; the scope is on Pavol's list with the skeptic's third option.
- The key cannot pass an `XXX` file on another failure, as the record's stop asks; the stand-ins show it both ways.
- Two tests were written after their fixes were built (section "Test first" below), and the report says so.
- The Appendix I sentence: section 6.

**Verdict: in the spirit**, narrowed by the library's own state, which is listed.

### Rung R, `631fb867e`

**What landed.** Declarations on the meet for the 97 pairs, a new object at the meet for row 583, 55 slips repaired to what bodies and callers do, row 586's `UniformDistribution` through `range.forward().left`, four test files added and one promoted (`compile-ladder/rung-range-meets/REPORT.md` section 1).

**Standard 1.** Each device answers the Meet Rule for Functional Methods per providing type, as the text words it (`overloading.tex`, section "Meet Rule"). No device states an exclusion; none is false of a library type.

**Standard 2.** The devices are the library's: `CompactFullScalarRange`'s own `IN`, `Nothing`'s two `SQCAP`, `SimpleMappedIndexed` for a new object at a meet, `cast` as in `openRange`. Every `CAP`, `IN` and `SQCAP` value under walk is unchanged in the skeptic's 105 probes.

**Standard 3.**
- The rank-2 and rank-3 `CAP` meets' second bodies wrap `combine2D`/`combine3D` in a `cast`, because no library type is a bounded range of rank 2 or 3. The record's decision is the library's practice, and `cast` is in it, but the missing type is a design question; it is item 39, with rows 600 and 601 as items 40 and 41.
- Decision 1 read the stop "a slip whose repair changes a value walk prints" as not covering a run that stopped; runs that stopped now answer. Listed.
- `SimpleMappedSeqIndexed` is not a `MappedGenerator`, because the api does not export it, so a reversed mapped sequential range prints differently, elements unchanged (row 603). Listed with three options.
- Scalar ranges stay over `ZZ32` and the public traits generic (POSITIONS, "Scalar ranges are over `ZZ32` only").

**Verdict: in the spirit.**

### Rung S, `1e176516c`

**What landed.** `CatString`'s fields renamed `first` and `second`, so `left` and `right` are `String`'s getters again; range ends read through `left.get`, `right.get` and `extent.get`, with `String`'s `opr[r0]` reading a strided range element by element as List does; `get` declared on `String`; the string api's headers made the component's; `CASE_INSENSITIVE_CMP` by its `ensures` clause; six test files added, four of them compiled (rows 604 and 605).

**Standard 1.** Strided slices now give the set `ranges.tex` gives, for explicit strides and `a::c` and `::c`; the implicit `:b:c` follows the range library, as List and the arrays already do, against the text (row 609). The getters follow `traits.tex`, section "Abstract Field Declarations".

**Standard 2.** List's device for strided indexing, the library's own `ensures` clause for the comparison, `SubString`'s fields of other names as the precedent for `CatString`'s.

**Standard 3.**
- Five walk values changed by repairs of named sites (a `CatString`'s `left` and `right`, `EmptyString.get`, a `SubString`'s `writeOn`, strided slices, the default comparison), the record's reserved stop, met and lifted and listed.
- Ten sites left as the checker's varargs (row 604), a stop met and lifted.
- The `String` api gains `Concatenable`, `Balanceable` and `SubString`'s header, listed.
- Q1 was not answered before the launch, so the three `extends Object` bounds stand, and 18 refusals with them.

**Verdict: in the spirit**, made so by its refusal.

### The global questions

- **What "go" promised, against what landed** (`CLIMB-BATCH-9.md` section 1, "What 'go' commits you to"):
  - Rows 516, 555, 558 and 567 close and 424 half: held. Row 555's F-bounded form still fails, now with another message (a stop met and lifted).
  - Rows 551 and 552 close: 552 held; 551 holds for the main component only and stays open.
  - The harness can gate an expected refusal at load: held.
  - Rows 580, 583 and 586 close: held, and 503 with them.
  - No model line, team test line, checker or specification rule changes: held. No team test file changed; the four renamed tests are the revival's own expected failures. The specification text changed only where it describes walk (the two notes, two Appendix I entries).
- **Built twice.** No: W and K are walk's, R and S the library's, and the checker is untouched.
- **The library's way.** Yes in R and S, walk's own devices in W and K.
- **Under P1 and Q1.** Neither was answered before the launch, and neither part was built. P1 runs now (the boot note at `314bd1513`); item 20 waits.

### Findings

Ranked by what they cost or risk next. Each gives its home.

1. **A skeptic refuses for work the gather does on an approval.** W's refusal cost 0.73M for tests and text (section 3). Severity: about 0.5M per such refusal. Home: the script line, the skeptic's refusal grounds (`climb-batch-workflow.js:1180`): a sibling defect whose home needs no code is a required correction and a recommended row, and a departure the record reserves as a reversible stop is a `stopsMet` entry; the gather opens the row and its home-2 test, as it did for rows 597, 598, 602 and 609. Close to the parked workflow option (b) (PLAN, "Off the path, parked").
2. **A specification-text finding still takes the judge and repair route.** 0.39M for one sentence (section 6). Home: PLAN's line for batch 8's finding 6, which is half built; the review fixes such a sentence in its corrections commit with each clause checked against its code line, and the review's repair reads only the briefings of the rungs its instructions name.
3. **The record did not give K the sentence its change made false.** Severity: the batch's one blocking finding. Home: the manual's "Preparing a batch record": a rung that changes what an implementation does is briefed with the Appendix I Effects and the specification's notes on that implementation, and its report lists each one its change makes false for the gather.
4. **Partial stage runs repeat the stage on final code** (section 2). Severity: about 20 minutes of the machine, about 18 on the critical path. Home: the script's prefix, the rule on rebuilds and runs: a development run of the stage's driver on part of the library is not followed by the full stage on the same code; run the full stage once when the code is final.
5. **The class table misfiles again** (row 577; section 1). Severity: the next record is drafted class by class, and the table hides G1 and three I1 sites. Home: the tools line, `classify.py` by declaration, before the next record.
6. **No stage of the batch writes FACTS' landed figures.** At the landing, "The true distance to the switch-over" (`FACTS.md:56`) and its neighbours (`:66`, `:71`, `:78`) still said 565 and 56. The gather left them for the gate's figures, and the commit stage's role does not hold them. The coordinator's consolidation wrote 340 and 1 at `10c511702`, after the landing. Home: the commit stage's role, or the coordinator's landing step as written down.
7. **A resumed worker searches for its predecessor's transcript** (section 5). Severity: a few minutes per resumed worker. Home: the script's prefix, which can name the transcript from the journal's started key.
8. **Rows with no line in PLAN, and lines made stale.** Part 3.

## Part 2. Process measures

### What a batch commits

- The Fortress change: 8 Java files (7 of walk, 1 of the harness), 10 library files, 2 specification files and the rebuilt PDF, and 46 new test files (27 interpreter programs, 9 keys, 10 compiled files), 4 renamed and 3 removed.
- Beside it, in the batch's folders: 11 reports (four `REPORT.md`, four `SKEPTIC.md`, two `JUDGE.md`, W's decision record), the gather's `RECORD.md`, the review's `JUDGE-review.md` and `REPAIR-review.md`, the gate's tables and the per-site list.
- Four live records edited: FACTS, PLAN, the ledger and the handover.
- Nothing else: no capture, log or probe. New tests are named by topic; none carries a rung letter or a batch name.

### Test first, read from the transcripts

- **Rung R:** row 586's promoted test failing on the base and committed alone at 21:49:47; the other tests failing (3 of 4) and committed at 22:11:50; the edit committed at 22:24:31.
- **Rung K:** `GenericBesidePlainTwoBounds` failing on the base at 21:50:08, committed alone at 21:50:31; the key committed at 21:55:32; `ComprisesUnlistedExtender` failing on the key's commit at 21:56:16, committed at 21:56:41; the fixes from 22:17. `GenericBesidePlainOverlapShapes` and `ComprisesGenericChildUnlistedExtender` were written after their fixes were built and seen failing on the base copy before their fix commits; the report says so (the skeptic's correction 4).
- **Rung W:** six tests failing on the base at 23:15:43, committed alone at 23:16:11 (`4f4fc1ead`); the edit at 23:34:07. The assertions the edit commit added, and `InferUntypedLambdaResultWalk`, failed on the base only by probes; the report says so. After the restart, new tests were run at 23:51:34 and committed at 23:52:28, before the next edit commit at 23:55:04.
- **Rung S:** `StringPieces` committed alone at 23:27:25 before the first library edit at 23:28; the resumed worker saw it fail again on the base copy at 23:55:44.
- **The repair rounds:** S's tests failing at 01:30:57, committed alone at 01:31:19, the library edit at 01:31:57; W's tests failing at 01:32:55 and 01:33:29, committed at 01:34:59, the text after.
- The skeptics checked this in the transcripts and built nothing to repeat it, as POSITIONS asks.

### What the agents read

- **The briefing.** The four workers read theirs whole: W 53.4K tokens in six parts, K 33.8K, R 29.2K, S 28.2K, each within 0.1K of the record's prediction (`CLIMB-BATCH-9.md` section 7). The two resumed workers read theirs again. Skeptics, judges and repair rounds ran their `checks` slices (K 12.6K, R 13.9K, W 32.1K against 30.3K predicted). The second skeptics ran none; their brief is the repair. The review's repair ran all four (section 6).
- **The map.** Three direct calls: rung R once, the resumed S twice. The rest came through the briefings. No agent opened `INDEX.md`.
- **The batch record.** No agent read it whole.

### Misses, by kind

Numbered on from `batch-8-review.md`'s 232. "Found by" names the first to catch it.

Found inside the batch:
- **The change wrong.** 233, S's strided slices answering wrong characters; 234, S's default `CASE_INSENSITIVE_CMP` reached, the report calling it unreachable (both skeptic S). Repaired before landing.
- **A new rule's effect on a sibling path.** 235, the bound for big operators breaking six tests, D2 (worker W); 236, walk's choice for a call with no declaration applicable without coercion (row 589, worker W); 237, `MatchFailure` checked in the library (row 590, worker W); 238, the closure check over every component refusing `Reflect` and team tests (rows 595, 596, worker K); 239, row 583's device changing a printed string (row 603, skeptic R); 240, the implicit `:b:c` slice (row 609, second skeptic S); 241, D5's reach (second skeptic W).
- **A premise of the record or a decision that does not hold.** 242, "rows 551 and 552 close": 551 holds for the main component only (skeptic K); 243, the report's "the checker refuses row 22's program" on the compiled path, where the compiled prelude's `Number` is open (skeptic K); 244, three departures from the instance rule with no home (skeptic W); 245, W's judge's "No program has measured it" (second skeptic W).
- **The team's own code, found by the rungs' probes.** 246, `StridedFullRange3D` without shifts (row 602, skeptic R); 247, `FlatString.rangeContains` (row 607, skeptic S); 248, `ImmutableArray1`'s `opr[r]` (row 608, skeptic S); 249, the bounded ranges of rank 2 and 3, comparisons on `I`, `#0` (rows 599 to 601, worker R); 250, the compiled checker's varargs and a field beside an inherited getter (rows 604, 605, worker S); 251, the compiled checker's `depS` and a self-second generic functional method in codegen (rows 593, 594, skeptic W); 252, object expressions and the clause's other half (rows 597, 598, skeptic K).
- **Text or a record claiming more than the paths do.** 253, Appendix I's comprises Effect (the review); 254, W's boxes, Appendix I Rationale, D2's cost and FACTS list (skeptic W, second skeptic W); 255, R's "each on a code state of its own" (skeptic R); 256, S's report omitting value changes (skeptic S); 257, the FACTS line "Choosing a declaration is unchanged" (the review).
- **Test first.** 258, K's two tests written after their fixes were built (skeptic K); 259, W's assertions failing on the base only by probes (skeptic W).
- **Provenance and citations.** 260, S's provenance lines and getter citation (skeptic S); stale lines in FACTS and rows 424, 599, 600 and 609, and W's and R's `historical:` lines (the review).
- **Process.** 261, R's partial stage runs on final code (skeptic R); 262, the harness refusing report writes again (workers K and R); 263, the gather unable to amend K's and R's commits, its re-anchorings in S's commit (the gather).

Found by this review:
- 264, W's refusal for tests and text (section 3).
- 265, the specification-text route and the repair reading every briefing (section 6).
- 266, S's last partial run on the code the stage then measured (section 2).
- 267, the class table's three I1 sites and G1's 18 in OT (section 1).
- 268, the record not giving K its Appendix I sentence (section 6).
- 269, FACTS' distance and count left at batch 8's by the batch's own stages (finding 6).
- 270, the resumed workers' search for the transcript (section 5).
- 271, rows without a PLAN line and lines made stale (Part 3).

### Against the earlier notes

- **Found inside the batch** (233 to 263): 31 in 4 rungs, 7.75 a rung, against batch 8's 30 (7.5) and 7b's 19.
- **By kind:** a new rule on a sibling path 7, the team's own code 7, text or record 5, a premise 4, the change wrong 2, test first 2, process 3, provenance 1.
- **Who caught them:** first skeptics 18, workers 7, second skeptics 3, the review 2, the gather 1. Second skeptics confined to the repair still found three, each in the repair's own area.
- **Landed.** No wrong value. Known costs landed as rows and listed: rows 587, 588, 591 and 592 (walk's departures), D2, row 589, row 590, row 551's scope, R's decision 1 and row 603, S's five values and row 609.
- **Escaped every check in the batch:** 264 to 271, in the script, the record, the tools and the routing.
- **Severity.** Nothing touches a line of the model or blocks the switch-over. The worst for Pavol is row 551's scope, a check narrower than the text. The worst in the tree was 233, caught.

### Re-measuring what the record held

- No rung ran a stage on the unchanged base. R and S took batch 8's landed tables as their before; W and K ran no stage.
- Every whole-suite run was on a new code state.
- The repeats were the partial stage runs (section 2) and the gate's build of the gather's code.

### Measures the evidence supports, each with its cost

1. **The skeptic's refusal grounds narrowed to findings whose repair touches code.** Evidence: section 3. Cost: two sentences of the skeptic's role and the manual. Saves about 0.5M per refusal of W's kind.
2. **The review fixes a specification-text finding itself, clause by clause, and its repair reads only the named rungs' briefings.** Evidence: section 6. Cost: a sentence of the review's role and one of the repair's. Saves about 0.3M and a few minutes per such finding.
3. **A record gives each rung the Appendix I Effects and walk notes its change makes false.** Evidence: section 6. Cost: a grep per rung while the record is prepared.
4. **No partial stage run before a full one on the same code.** Evidence: section 2. Cost: one sentence of the prefix. Saves about 20 minutes of the machine.
5. **`classify.py` by declaration** (row 577). Evidence: section 1. Cost: a tool change, before the next record.
6. **The commit stage writes FACTS' landed count and distance.** Evidence: finding 6. Cost: one step.
7. **A resumed worker is told its predecessor's transcript.** Evidence: section 5. Cost: one line of the prefix, read from the journal.

## Part 3. Routing

Checked against `main` at `314bd1513`; `10c511702` since changed FACTS only.

**Items for Pavol.** The gather mapped 49 ids to 26 PLAN entries (the journal's `pavolItems`), none unrouted. I read each named entry in "Climb batch 9, listed for his review" (`PLAN.md:502-531`) and items 38 (its batch 9 sentence), 39, 40, 41 and 42 (`PLAN.md:221-231`); every one is there. W's twelve worker items sit at nine entries: W.worker.1 at row 592 (D3); .2 at row 591; .3 and .9 at the files outside W's list; .4 at row 587 (J1); .5 at D5's reach; .6 at row 555's F-bounded form; .7 at D2; .8 at row 589; .10 at the trace switch; .11 at row 590; .12 at the provisional rows. The review's review-routed.1 is in the D5 entry. Item 20 (Q1) is read again in batch 9's record and still waits. P1 has no PLAN line; it is in the boot note while it runs.

**Rows the batch opened, 587 to 609.**
- In PLAN's entries or items: 587, 588, 589, 590, 591, 592, 595, 596, 599, 600, 601, 603, 604, 606, 607, 609.
- Named only as the place of a test (the entries on files outside W's list and on S's compiled tests), with no line for their repair: 593, the compiled checker's `depS`, a later checker rung's (with 563 and 574); 594, a self-second generic functional method in codegen, phase 5's code generation (with 564 and 565); 605, the compiled checker's field beside an inherited getter, a checker rung's (with 604).
- No line in PLAN:
  - 597, an object expression against a `comprises` clause, on both paths: walk's half beside row 551's scope entry, the checker's half a later checker rung;
  - 598, a listed type that must extend each instantiation: beside row 551's scope entry;
  - 602, `StridedFullRange3D`'s missing shifts: the next library rung, with rows 599 to 601;
  - 608, `ImmutableArray1`'s `opr[r]` reading `r'.lower`: the arrays after the switch-over, with its caution to keep the stride.

**Lines the batch made stale.**
- Phase 3's batch 8 line still lists the walk rung's rows as future work (`PLAN.md:91-99`: rows 424, 516, 551, 544, 552, 555, 558, 567, 586 and the harness key, "Not built"). All but 424's F-bounded half, 551's other components and 544's repair landed in batch 9. Phase 3 has no line for batch 9 and none for the next batch.
- "From climb batch 8's review ..., not built" (`PLAN.md:303-307`): finding 5 is built (`wait_for` capped at 270, `climb-batch-workflow.js:888-890`); finding 8 is built (`c5d3bd401`, `fe8d8e540`); finding 6 is half built (the gate's path rule, not the review's own text fix).
- FACTS' 565 and 56 at the landing, written as 340 and 1 by the coordinator at `10c511702` (finding 6). The handover's first section, already stale at the base, as the review noted.

**Script, manual and tool items.** Measures 1, 2, 4, 6 and 7: the script line. Measure 3: the manual's "Preparing a batch record". Measure 5: the tools line, already PLAN's (`PLAN.md:379`, row 577). Only measure 2 (as finding 6 of batch 8) and measure 5 have a PLAN line today.

**The checker-count check.** Every new or risen row of `compile-ladder/climb-batch-9/gate/checker-count.txt` against batch 8's:
- No row is new: the same twelve apis.
- No row rose. `FortressLibrary` 10 to 2 and `RangeInternals` 102 to 0, all by rung R's declarations (section 1). `#total` 56 to 1, `#locations` 18 to 2, `#crash none` unchanged.
- The distance's units: none rose. `api RangeInternals` 51 to 0, `component RangeInternals` 112 to 20 and `api FortressLibrary` 5 to 1 by rung R; `component String` 69 to 8 and `FlatString` 6 to 1 by rung S; `component FortressLibrary` 276 to 264 by both, with row 488's drift.

## What I did not do

- I built nothing, ran no Fortress program and no gate stage, and edited no file but this one. I read the main tree's untracked outputs under `tmp/gate-batch-9/`, including the commit stage's two microGPT checks under walk on the landed tree, both 40 of 40, and touched nothing there.
- The site mapping uses a line diff of each library file; 17 sites matched by position with a changed message, and four of them changed class. The class figures at base lines rest on that mapping.
- The base build's time is the exploration's measure, not this batch's; the coordinator's session is outside the run's transcripts.
- The restart's cost counts the resumed workers' writes before their first new edit; some of that reading a fresh worker would also have done.
- I did not measure this review's own cost.

## For Pavol

- All four rungs follow your decisions and the specification; every departure is on your list, all but one gated by a test.
- The new practice worked:
  - builds 35 to 16; only 1 rebuilt code already built (22 before);
  - the gate ran once; no skeptic built or checked out code;
  - second skeptics checked only the repair: 0.2M each, not 0.35M;
  - no cache miss.
- Cost: 6.9M written, 22 agents, 5 h 44 min (batch 8: 7.7M, 7 h 37 min).
- About 1.3M more than a cheaper route would have cost:
  - the VM restart: about 0.5M for two workers to re-read; their commits and builds survived;
  - W's refusal: 0.7M for tests and text the gather could have written for about 0.2M;
  - one wrong specification sentence: 0.4M through a judge and a repair, about 0.1M if the review had fixed it.
- Two workers measured part of the library, then all of it, on the same code: 20 min of machine time.
- The refusals: S's was a real bug (strided string slices gave wrong characters); W's findings were real but needed no code.
- Count 56 to 1: rung R cleared all 55. The one left is `isLeftZero`, your choice.
- Distance 565 to 340: rung R 152, rung S 71, an old drift 2.
- Left: arrays 71, self-typed bodies 28, 18 errors waiting on your item 20, ranges 36 and strings 13 with rows, about 170 library one-offs.
