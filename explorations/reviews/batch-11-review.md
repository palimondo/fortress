<!-- The combined post-batch review of climb batch 11 (run wf_88561d30-63b, base 83b1cae78, launched 23:42 UTC on 2026-10-08, landed at 04:06 UTC on 2026-10-09 at f9d3ec826: rungs E 27cb9e93b, W 369982d85, C 2d22d3a35, L b872d65a1, the closes b9e4a39fd, the gather record 95bac0a25, the review's corrections 79ce86fd1, the cold read 9928f59d8 and the gate's tables), the first run of the redesigned practice of coordinator/process-engineering/batch-redesign.md, in the form of reviews/batch-10-review.md, judging conformance, whether the practice held, the curator's question on the other path and the routing, written by a review worker reading only, against main at dcc6b4307, with the 14 transcripts and the journal read through bounded scripts in the session scratchpad (rev11/), the run's measures cited from tools/batch-measures.py as the brief gave them, nothing built, no Fortress program, suite or stage run, and tokens counted as writes only (input plus cache creation, one count per message id). -->

# Climb batch 11: conformance, the redesigned practice, and routing

## What came up in this run

### 1. The count 1 to 1 and the distance 253 to 207, by rung

**The count, 1 to 1.** `compile-ladder/climb-batch-11/gate/checker-count.txt`: `FortressLibrary 2` (row 582, `isLeftZero`), `#crash none`, the shadow matching. The gate prints `COUNT SAME 1, declared none`.

**The distance, 253 to 207 (−46).** Each rung's own tree, as its skeptic checked it against batch 10's tables, and the merged gate:
- Rung E: 253 to 235 on its tree, −18, all `OT`: item 36's sites but one, and row 627's six. The one left, `Library/String.fss:431`, is a `label` body, now row 642 (PLAN item 48).
- Rung L: 253 to 226 on its tree, −27: 28 range sites gone (row 599 14 of 15, row 600 11 of 18, row 601 3 of 3) and one BR site come (below). The 8 left are rows 654, 655 and 656, with one, two and five sites; 656 is item 49, and 655 sits beside item 50's row 657 (`rung-range-types/REPORT.md` section 3).
- Rung C: 253 to 253 on its tree: row 637's export site (`List.fss:12`, `X1` 4 to 3) gone, and the same BR site come.
- Rung W: nothing can move; the stages do not read walk (FACTS, "The checker-count and distance stages read only the compiler's phases").
- **The BR site, `Library/FortressLibrary.fss:130`, `BIG LEXICO(g)`**, +1 on C's tree, on L's tree and on the merged tree. C's report, its skeptic and the gather's points (`climb-batch-11/RECORD.md:167`) call it an error that Q4's refusals uncover. L's tree has no Q4 edit and shows the same site (`RECORD.md:151`, the note on row 488 that `ledger.py` refused). It is row 488's dependence on what the checker queried earlier, not a site behind a crash. Q4's three crash rows now read "Missing parameter type for i" at the same three declarations and uncovered nothing measurable.
- Arithmetic: −18 − 28 − 1 + 1 = −46. By kind, typecheck 201 to 156 and export 4 to 3; by class, `RG` 10 to 0, `OT` 100 to 67, `I1` 3 to 1, `GF` 2 to 1, `X1` 4 to 3, `BR` 3 to 4 (the stage's ranges are stale, row 577).
- **Against the record** (`CLIMB-BATCH-11.md` section 5, "The gate"): E 19, L up to 36, C 1, Q4 about +3, "near 200". The shortfall is row 642's site, L's 8 left under rows 654 to 656, and row 488's +1; Q4 added none.

The sites per million tokens fell (batch 9 225 for 6.88M, batch 10 87 for 6.26M, batch 11 46 for 5.03M). That measures what the records gave the batches, not the practice: of the 253, most waited on a decision (`CLIMB-BATCH-11.md` section 1), and this batch took the 56 the answers to Q2 and Q3 opened.

### 2. The cost, against the redesign's prediction and batches 8 to 10

**How it was counted.** The brief's figures from `tools/batch-measures.py`, and the same count from the 14 transcripts by my own script (`rev11/other.py`), which agrees to the token: 5,025,686 written, 620,340 in first calls. The span is 23:42 to 04:06 UTC, 4 h 25 min; all agents ran on Opus, two at a time.

| Role | Predicted (§5) | Measured | Difference | Batch 10 |
|---|---|---|---|---|
| Rung workers (4) | 2.11M | 1.99M | −0.12M | 2.13M |
| Skeptics (4) | 1.44M | 1.60M | +0.16M | 1.19M |
| Judge | 0.28M (1.75 rulings) | 0.14M (1) | −0.14M | 0.62M |
| Repair | 0.15M (0.75 rounds) | 0 | −0.15M | 0.62M |
| Second skeptic | 0 | 0 | | 0.51M |
| Gather | 0.48M | 0.49M | | 0.49M |
| Merged-diff review | 0.43M | 0.41M | | 0.43M |
| Gate | 0.11M | 0.12M | | 0.13M |
| Cold read | 0.08M | 0.15M | +0.07M | none |
| Commit | 0.13M | 0.14M | | 0.15M |
| **Total** | **5.21M (4.3M to 6.3M)** | **5.03M** | **−0.18M** | **6.26M** |

- With the rulings and repairs that happened (one ruling, no repair), the prediction is 4.93M; the run wrote 0.10M (2%) more. The skeptics (+0.16M) and the cold read (+0.07M) are the overruns; the workers are 0.12M under.
- The skeptics' own fixes cost about 0.28M by the writes inside their fix spans (W 93K, C 80K, E 72K, L 36K), near the 0.25M priced. The overrun is the skill's load (below) and the differentials.
- **The skill's load** was about 0.50M over the 14 agents by my attribution (the writes of the message that took in each `Skill` call and each read of a part): 37K to 50K per worker, 28K to 38K per skeptic. Section 2 priced it at about 0.2M. The workers, the skeptics and the gather read 9 to 16 parts each, most of them whole in their first minute; rung E read twelve in four `cat` calls at 00:23.
- **First calls** 620K (12.3%), 8 of 14 cold, against batch 10's 1.47M (23.4%): 0.85M saved, where section 2 priced 0.4M.
- **Refusal cycles** one rung, C's judge, 138K (2.7%), against 1.93M (25.0%), 1.40M (20.4%) and 1.75M (27.9%) in batches 8 to 10.
- **Batch 10 to batch 11 by role:** judges, repairs and second skeptics −1.61M; skeptics +0.41M; cold read +0.15M; workers −0.14M; the rest −0.04M: −1.23M (20%). Agents 21 to 14; time 5 h 33 min to 4 h 25 min.

Per agent, in order of start:

| Agent | Writes | First call | Turns | Minutes | UTC |
|---|---|---|---|---|---|
| Rung C | 544K | 57K | 267 | 75.4 | 23:42-00:57 |
| Rung W | 436K | 22K | 194 | 37.7 | 23:42-00:19 |
| Rung E | 435K | 21K | 205 | 58.2 | 00:22-01:21 |
| Rung L | 574K | 20K | 155 | 75.0 | 01:00-02:15 |
| Skeptic W | 415K | 62K | 136 | 26.1 | 01:23-01:49 |
| Skeptic C | 400K | 28K | 133 | 37.7 | 01:49-02:27 |
| Skeptic E | 403K | 26K | 172 | 39.5 | 02:18-02:58 |
| Skeptic L | 377K | 28K | 137 | 34.6 | 02:27-03:02 |
| Judge C | 138K | 53K | 27 | 3.4 | 02:58-03:01 |
| Gather | 486K | 72K | 204 | 32.9 | 03:02-03:35 |
| Gate | 116K | 53K | 42 | 22.7 | 03:35-03:58 |
| Review | 412K | 71K | 157 | 17.2 | 03:35-03:52 |
| Cold read | 154K | 47K | 43 | 7.1 | 03:53-04:00 |
| Commit | 135K | 61K | 54 | 5.5 | 04:00-04:06 |

The rungs ran in 38 to 75 minutes against the manifest's 90 to 120. With two slots, W's skeptic waited about an hour for one, behind rungs E, C and L, and C's judge 31 minutes behind two skeptics; the critical path was rung L, its skeptic, then the tail.

### 3. Builds, suites, and the skill's `run_bg` refused nine times

- **The tool's build figures mislead this run.** `batch-measures.py` counts a Bash call whose segment is `ant compileAll`, so it counts a refused call and misses `(nohup ant compileAll ...)`. Its "W 3+0, C 3+3, E 1+0, L 0+0; skeptic E 2+0, skeptic C 2+2, gate 2+0, gather 1+0" holds seven refused calls (W 1, C 1, E 1, skeptic C 1, skeptic E 1, gate 2) and misses four builds (C's first, E's two, the gate's one). Builds that ran, by my reading of the commands: rung W 2 (the first failed to compile, "reference to BottomType is ambiguous"), C 3 (three code states), E 2, L none of its own (its `ant testSystem` builds first), skeptic C 1, skeptic E 1, gather 1 (a merged tree seeded for the closing tests), gate 1: eleven, each on a new code state.
- **The skill's `run_bg` was refused at its every use**: nine calls in eight agents (rungs W, C, E and L, skeptics C and E, the gate twice, the commit), by Claude Code's built-in removal check, which cannot read the `bash -c "( $2 ) ..."` it builds (`references/session.md:31-33`; the commit agent's account in its result; W's `REPORT.md` section 12). Each agent then wrote a literal `nohup bash -c '...'`, which passed. The cost is a retry each, seconds; the defect is a skill sentence every agent follows first (Part 4).
- **Suites.** Each worker ran the suite `tests-running.md` names for its edit, once per code state: W `ant testSystem` and `ant testSpecData`; C `ant testQuick` on two code states and `ant testSystem` (a shared phase); E `ant testQuick`; L `ant testSystem`. The two skeptics that changed code ran theirs once after the last fix: C `ant testQuick` (7 min 48 s) and `ant testSystem` (2 min 26 s), E `ant testQuick` (9 min 57 s). No skeptic ran a stage.
- **Stages.** E, C and L ran the count and distance once each on their trees; W rightly none. No stage ran twice on one code state.

### 4. The tail: gather, review, gate, cold read, commit

- **The gather** (0.49M, 33 min) applied E, W, C, L by the lowest edited line in shared files, with no conflict; numbered rows 642 to 659 in that order; closed 17 rows and marked 622 a duplicate, each closing test run on a merged tree seeded from the base build (`OK (16 tests)`, `OK (48 tests)`); folded five revival-change entries; routed 24 items. It could not write 16 notes, row 473's reproducer or row 638's close, for `ledger.py`'s limits (gather.1).
- **The merged-diff review** (0.41M, 17 min) found no blocking code, read every skeptic's fix in its maker's transcript (its `fixesChecked`), fixed two FACTS entries and two sentences of the part (`79ce86fd1`), and added review.1 and review-routed.1.
- **The gate** ran once, green: `testFast` 1,850, `testSystem` 526 (516 and W's and L's ten files), `testSpecData` 130, 42 of 42 `atomic` runs, the ladder unmoved. Its summary now ends with the `# machine` lines; they record `FORTRESS_THREADS=1`, the shell's setting, while the suites ran at four threads pinned in `build.xml:1167`, `:1412`.
- **The cold read** (0.15M, 7 min) raised 18 flags on the part's five new entries, fixed 16 in place (`9928f59d8`) and returned three (coldread.1 to .3).
- **The commit** (0.14M) ran the quick microGPT walk check after its `run_bg` was refused: both programs `ALL PASS`, 52 s and 44 s; batch 10's own check, owed by its review, ran by hand before this batch (`c36fa141e`, 40 of 40). It built the PDF, wrote FACTS' figures, pushed to the three branches, removed the worktrees, and listed four FACTS sentences the landing made false (Part 4).

## Part 1. Conformance

### Method

As in `reviews/batch-10-review.md`: for each rung, `git show` first; then its `REPORT.md` and `SKEPTIC.md`, and C's `JUDGE.md` and `decision-record.md`; then the record's section for it (`coordinator/CLIMB-BATCH-11.md` sections 2 and 3); then the gather's `climb-batch-11/RECORD.md` and the journal's results; then the landed code. Three standards, kept apart: the specification, the team's built intent, and the decisions on record (POSITIONS, PLAN). The skeptics' and the review's findings are cited, not repeated.

### The verdicts

- **Rung E, the checker's expected type and row 627: in the spirit.** The four contexts follow the text, the `label` body is put to the curator (item 48), and the one regression it exposes is rung C's row 651, listed.
- **Rung W, walk's open F-bounded parameter, rows 614 and 618: in the spirit.** Way 11 as the curator answered Q1, the specification's examples green and in the gate, no demo edited; the open type's quiet values are way 11's and listed.
- **Rung C, the checker's overloading and export defects: in the spirit, made so by its skeptic's two fixes.** Its contested fix was rightly upheld.
- **Rung L, the range types: in the spirit.** Items 39 to 41 at way (a) as answered; the value changes item 41 allows are listed, and the team types it widened are put to the curator.

### Rung E, `27cb9e93b`

**What landed.** The compiled checker passes the expected type into a clause of an `if` without `else` (`impls/Misc.scala`), a block's last expression after local declarations (`checkLetBody`, `impls/Decls.scala:51-58`), a loose juxtaposition (`impls/Operators.scala`) and a `typecase` clause; `instantiateMethodApart` (`STypesUtil.scala:1811-1857` on `main`) renames an inherited method's clashing own static parameters before substitution (row 627). The inference chapter's two lists and an Appendix I entry of E's own. The skeptic's `2579d7e5b` decides a loose juxtaposition's multifix reading without the expected type.

**Standard 1.** `if.tex:67-68`, `blocks.tex:54-57`, `var-ref.tex:35-40`, `typecase.tex:110-111`, the text the record cites for each; `trait-parameters.tex:21-24` for row 627; `chained-multifix.tex:45-47` for the skeptic's fix. The `label` body is left with a refusal pinned (`XXXInferResultOnlyLabelBody`) and put as item 48, since `label.tex` gives its type as a union of exits as well as of the body.

**Standard 2.** Rung I's `expected` at the tight juxtaposition and the `if` with `else` (`Misc.scala:526-530`); row 561's `ownStaticParamsApart` for the renaming. The block is repaired in `checkLetBody`, not in the block case the record named, which already passed the type; the deviation is in the report's provenance line, and `Decls.scala` is on no other rung's list.

**Standard 3.**
- Q2 yes to both parts (POSITIONS, "The order of the work after batch 10."): built, the `typecase` branch by the union rule, conditional where a clause is not a call (the skeptic's `efae72793`).
- "Revival change: none", with a sound reason: the change makes the checker do what the team's text says; the revised lists are the revival's own text. The script then listed it as an unfolded entry (Part 4).
- Normative text beyond the two lists by a margin ("or by loose juxtaposition", "the body of a `label` expression"): a point listed.
- A program the base accepted only through row 627's capture now meets rung C's row 651 crash (`XXXMethodStaticArgsBoundNamesOtherSameName`): a point listed (E.skeptic.1). The skeptic left the repair to row 651 rather than turn rung C's test red, as "no rung builds on another" asks.

**Verdict: in the spirit.**

### Rung W, `369982d85`

**What landed.** Way 11 of P1 (`EvaluatorBase.instanceOf`, `:184-194`; `BottomType.OPEN`; the subtype fallback; four value checks admit every value at `OPEN`): an F-bounded parameter nothing fixes is left open. Row 614: `Constructor.overriddenInTraits` drops a declaration a trait's own `override` overrides. Row 618: an object expression without static parameters is checked under the Meet Rule where its type is finished (`BuildEnvironments.java:993-997`). The inference box, the reductions note and two Appendix I entries amended in the S1 form. Rows 645 and 646 opened by the worker, 647 to 649 by the skeptic; row 473's open half given its test.

**Standard 1.** `reductions.tex` desugars by the element type `N`, which walk cannot know; the open parameter gives the same values wherever elements exist, and the empty case is row 645, pinned. `traits.tex`, "Method Declarations", for row 614, read per type as row 615's landed reading. `overloading.tex`, "Meet Rule", names object expressions for row 618; the generic ones are row 647.

**Standard 2.** The probe's `P1-open.patch` re-read on the base, its helper inlined; batch 10's `FunctionalMethodMeets.providedBy` for the override; the one place an object expression's type is finished.

**Standard 3.**
- Q1 yes, way 11: built, within the judgement's default (instantiation only, any generic function; D2's plain bounds left at `Bottom`, not covered by the yes).
- "The specification's examples join the gate at zero red.": 130 of 130, and `testSpecData` ran in the gate.
- "The team demos ... Let's not touch them": the 18 demos and the smoke test run once, none edited; 14 and the smoke test run to the end, four stop later at answer 8's mixed-type lines (`REPORT.md` section 4).
- The failure-mode question: four loud failures become quiet values at `OPEN` (`asif`, a typed local, a `typecase` clause, dispatch to an open-typed overload over a concrete one). They are way 11's (the judgement: "`cast[\OPEN\](v)` returns `v`"), and the dispatch change, a point the worker missed, is listed (W.skeptic.3).
- No library, checker or harness edit.

**Verdict: in the spirit.**

### Rung C, `2d22d3a35`

**What landed.** What a type provides read by the traits chapter (`providedMethods`, `providedAndOverridden` in `STypesUtil.scala`), so that the team's `disp0` and a widening `override` type check (row 610); the per-provider cover without self (617); the dotted `Any` restriction (619); bounds renamed with their parameters (625); a private abstract member out of the export check (637); an undeclared type in a `typecase` arm reported by the disambiguator (626), in the arm's body too after the skeptic's `15a4be724`; a widening override's return type checked, at every instance after the skeptic's `79cf821d9`; under Q4 the refusal "Missing parameter type for" where a local function is bound (`STypeEnv.scala:69-77`), with a `\revision` box and an Appendix I entry; row 463's two tests. Rows 650 to 653 opened.

**Standard 1.** `traits.tex:521-529`, `:585-595` and `:590-591`; `overloading.tex`, "Meet Rule"; `typecase.tex:66-109` and `declarations.tex:416-418` for the arm's body; `type-inference.tex` for Q4, departing in the S1 form as row 405 already did at top level.

**Standard 2.** Walk's batch-10 `providedBy` for the reading, the team's `alphaRenameTypeSchema`, the top-level refusal of row 405; `OverloadingOracle.satisfiesReturnTypeRule` and `subtypeUA` for the return type at every instance.

**Standard 3.**
- Q4 yes, way 1: built.
- "The library route.": nothing in the prelude; row 463 kept as tests.
- **A premise of the record that does not hold:** it asked `disp0`'s program to compile and print `f PASS`; the code generator refuses the modifier `override` (`CodeGen.java:2897-2899`), so the test is a `typecheck` test and the wall is row 650, put to the curator (C.worker.1).
- The worker's head turned two programs the base refused into acceptances of ill-typed overrides; the skeptic's settled fix restored the refusals at every instance.
- Points listed: two compiled tests red on the first code state and repaired before landing; the re-declared abstract method now refused where the base ran the hidden body (pinned by the skeptic); the shared disambiguator now refusing at load under walk (C.judge.1); row 615's question answered the same way on both paths (C.skeptic.1).

**Verdict: in the spirit, made so by its skeptic's two fixes.**

### Rung L, `b872d65a1`

**What landed.** `BoundedRange2D` and `BoundedRange3D` as the rank's meets, the six `CAP` meets without their casts (item 39); the comparisons moved to the `ZZ32` kinds and declared abstract in the generic traits (item 40); `#(0,n)` and `#(0,n,m)` empty in order, the extents and prefix `#` declared `RangeWithExtent` (item 41); `s.indices` at three sites and a sibling `s.generator` (row 633); `ForbiddenException(CallerViolation)` at five library sites and two revival witnesses (row 638). Rows 654 to 659 opened.

**Standard 1.** The specification describes no range of rank 2 (`ranges.tex`, "Ranges"); the getter rule (`traits.tex`, "Method Declarations") and `throw.tex` for the slips. The skeptic's assertions follow `ranges.tex` ("compared as if they were sets of integers") and the team's narrowing contract (`FortressLibrary.fss:3826-3832`).

**Standard 2.** `BoundedScalarRange` for the meets; the rank-1 kinds' own declarations; rung N's throw. Deviations in the provenance line: the two meets in each new trait have `fail` bodies (decision 1, so that no `range1` is inherited twice), the eager `SYMMETRIC_PARTIAL` (decision 8).

**Standard 3.**
- Q3 at way (a) for 39 to 41: built, with item 41's value change, its before and after listed with the values the skeptic added.
- "Scalar ranges are over `ZZ32` only": the comparisons live at the `ZZ32` kinds, the public traits generic.
- "The library's own practice is the standard": declared types widened to what the bodies answer. `truncL` and `truncR` lose the team's `RangeWithLeft`/`RangeWithRight` for `BoundedRange` (L.worker.4), a team api type changed, not removed: listed for the curator.
- E's two sites left alone, as the record asked (row 654 is `narrowToRange`'s sibling, left for that reason).
- Rows 658 and 659 are rows without a test, as `tests-writing.md`'s third home allows where walk stops.

**Verdict: in the spirit.**

### The global questions

- **What "go" promised, against what landed** (`CLIMB-BATCH-11.md` sections 1 and 5):
  - W: row 424's F-bounded half, 614, 618 closed; one new row (645) with its expected failure; `testSpecData` in the gate: held. Row 646 is a second new row the judgement did not foresee (its reading of a `Set[\ZZ32\]` binding under way 11 did not hold, W.worker.2).
  - C: rows 610, 617, 619, 625, 626, 637 and, under Q4, 620 to 622 closed; row 463's two tests: held, 622 as 621's duplicate.
  - E: row 560's second part and row 627 closed: held, with one site moved to row 642.
  - L: rows 599 to 601 and 633 closed: held; row 638 fixed in the tree and left open in the ledger (gather.1).
  - No model line and no team test line changed: held. The specification changed in the named passages, plus E's two listed sentences.
- **Built twice.** No. W is walk's; C and E edit the checker at different declarations (`STypesUtil.scala`: C's `providedMethods` at `:1622-1695`, E's `instantiateMethodApart` at `:1811-1857`); L the library alone. The review re-applied each patch and found no shared declaration.
- **The library's way.** Yes in L; the team's own devices in W, C and E.
- **What they do together.** E's renaming meets C's row 651; C's disambiguator reaches walk; E's and L's range sites, measured together, sum on the merged tree (section 1).

### Findings

Ranked by what they cost or risk next. Each gives its home.

1. **Six sentences of the skill are false since rung W** (Part 4, the table). The next batch's library rung on row 628 works on exactly the walk behaviour that `SKILL.md:126` and `library.md:25` misstate. Home: one skill-writer task before batch 12's record is drafted.
2. **The contested rule's third clause bought a ruling that changed nothing.** C's fix was contested only for reaching a point the worker's own edit had already reached (Part 2). Severity: 0.14M a time. Home: POSITIONS, "The judge's rulings.", and the skeptic's text (`climb-batch-workflow.js:805-806`), the curator's word.
3. **Eight new rows have no line in PLAN**, and five answered items still read as open (Part 4). Home: the coordinator's landing; the gather's step that maps items (batch 10's measure 5, its second half, unbuilt).
4. **The script listed a false item, delta-unfolded.1**, for E's "Revival change: none" (Part 4). Home: `climb-batch-workflow.js:1941`.
5. **The BR site is row 488's, not Q4's** (section 1). Home: the FACTS sentence on the distance's crash rows when the coordinator rewrites it, and row 488's refused note.
6. **The ledger tool has no route for four writes the batch needed** (gather.1, review.1): 16 notes refused for the 700-character cap, no reproducer command, no close without a test, no claim narrowed. Home: `ledger.py`, PLAN's gather.1 entry.
7. **`batch-measures.py` counts refused build calls and misses `nohup` forms** (section 3). Home: its `BUILD_SEG` and the result of the call.
8. **The gate's `# machine` line records the shell's `FORTRESS_THREADS=1`.** Home: `rung-flat-tower/machine.sh:9` or the gate's step.

## Part 2. Did the redesigned practice hold

### The skeptics' 19 fixes

Each read from the journal's `fixes` and the skeptic's transcript; "test first" by time and call. A correction's added test is seen failing on the base's code through the old code tool; a defect fix's test fails on the worker's head before the edit (the script's lines 805 and 806). An `XXX` test that pins a defect present on base and head is green on both by design; for it the skill's rule applies, the first such test shown red once with the defect removed (`tests-writing.md`, "Writing an `XXX` test").

| # | Fix | Kind | Sound, inside the rung | Test first |
|---|---|---|---|---|
| W1 | `637f593f5`, report and record from the journal | correction | yes | no test |
| W2 | `b999851e2`, NEW-W-2 is row 473's open half; W's own spec passages cite it | correction | yes, `records.md` "A new issue gets a new row" | no test |
| W3 | `3f5b15ec0`, row 647 and its `XXX` test; FACTS on `OPEN` at dispatch | correction | yes, decision 4's residue homed, not overturned | expected failure on the old code 01:37:54 (`FORTRESS_HOME=` base build, `tree 83b1cae78`) and the head 01:38:18; red with the defect removed 01:38:34 |
| W4 | `604b807a9`, 15 `typeMatch` sites, not 11 | correction | yes | no test |
| W5 | `b9d174959`, rows 648 and 649 and their `XXX` tests | correction | yes, defects its probes measured, 649 reached anew by row 614's repair | expected failures on the old code 01:45:49 and the head 01:46:00 |
| C1 | `ff153e41b`, report from the journal | correction | yes | no test |
| C2 | `79cf821d9`, return type at every instance | defect, settled | yes, `traits.tex:590-591`, C's own file | red on the head 02:06:58 and on the base 02:07:17; edit 02:07:46; build 02:09:04; green 02:11:34; `testQuick` and `testSystem` after |
| C3 | `15a4be724`, the clause body | defect, contested | yes, upheld | as C2: red 02:06:58, edit 02:07:55, green 02:11:34 |
| C4 | `9a5469a6c`, `XXXReabstractedMethodNotImplemented` | correction | yes, pins a verdict the rung changed | red on the base 02:07:17 ("Saw wrong failure. compile"), green on the head 02:06:58 |
| C5 | `9a5469a6c`, notes on 615, 572, 571, 626; row 653 | correction | yes | no test (row 653's is owed, review-routed.1) |
| C6 | `9a5469a6c`, `withoutSelf`'s citation | correction | yes | no test |
| E1 | `2579d7e5b`, multifix reading without the expected type | defect, settled | yes, `chained-multifix.tex:45-47` | red on the head 02:40:27; edit 02:41:07; build 02:41:15; green 02:44:03; `testQuick` after. Green on the base by design: the rung made the defect |
| E2 | `efae72793`, `XXXMethodStaticArgsBoundNamesOtherSameName` | correction | yes; repair left to row 651 | red on the base 02:40:37, green on the head 02:40:27 |
| E3 | `efae72793`, row 644 and its `XXX` test; the Effect | correction | yes, E's own entry | expected failure on the base 02:40:37; red with the defect removed 02:40:50 |
| E4 | `efae72793`, the `typecase` sentence made conditional | correction | yes, E's own sentence | text |
| E5 | `efae72793`, `trait-parameters.tex:21-24` | correction | yes | no test |
| L1 | `6eebab9dd`, report and record from the journal | correction | yes | no test |
| L2 | `facb1d250`, three assertions in `RangeDeclarations.fss` | correction | yes, item 41 and the narrowing contract | red on the old code in three copies 02:56:18 to 02:56:38, green on the head 02:56:47 |
| L3 | `354f7bd33`, report, FACTS amendment, notes on 601 and 611 | correction | yes | no test |

Every fix is sound and inside its rung, and every added test was written test first. All four journal writes were needed: the harness refused every worker's write of its report.

### The contested fix, and whether another should have been

- **C's `15a4be724` was contested by the letter of the rule and not by its substance.** The skeptic named one reason: the fix "reaches the rung's point 'A library or walk edit' in the same way the worker's own row 626 edit did" (`SKEPTIC.md` section 4). Section 2 of the redesign makes a fix contested when "it touches a path the section does not give the rung or reaches a point to report". The worker had not argued for letting a body's undeclared name through; it had not considered the body. Row 626's stated fix and `declarations.tex:416-418` settle it.
- **The judge's ruling is sound.** It rests on the text (a clause's body is an ordinary block; no passage scopes type names there), the team's code (the flag's one reader, the `else` arm already refused the name), row 626's own words, and the fix's reach (two lines moved, reversible, listed). It did not re-run the quoted outputs, as its brief asked, and said so. 138K, 3.4 minutes.
- **No uncontested fix should have been contested.** The nearest is E's `2579d7e5b`: the worker's decision 5 gave the expected type "both to the multifix attempt and to the infix fallback", and the fix changes what that does. The skeptic kept the type where the multifix applies and took it out of the choice whether it applies, arguing that the worker chose the form, not that consequence, with `chained-multifix.tex:45-47` settling it. I agree. The two cases show the rule's gap: a fix can be settled by a cited sentence and contested by a clause at once, and the rule does not say which wins. E's skeptic let the sentence win; C's let the clause win.
- E2 left a regression the rung exposed as a point to report, not a fix: right, since its repair is rung C's row 651 and would have turned C's own test red.

### The cuts: what slipped past the skeptics

With no second skeptic and no repair round, nothing in code slipped: the review found no blocking code and the gate was green on its first run. What the later roles caught was record:
- the review: FACTS' row-588 clause, false since batch 10 and carried by W's rewrite; FACTS' `testSpecData` title; two sentences of the part (`79ce86fd1`);
- the cold read: 16 wordings of the part fixed, three claims returned;
- the commit: four FACTS sentences the new figures made false, left for the coordinator (Part 4).

None of these is what batch 10's second skeptics checked, which was the repair alone. What slipped past every role is in this review's findings: the BR attribution, the eight unlined rows, the stale PLAN items, the false item delta-unfolded.1, and the skill's six sentences, of which the gather and the cold read named four.

### The redesign's decisions, as the run played them (sections 9 and 11)

- **1, the contested rule:** above. One ruling; the third clause is too wide.
- **2, no second skeptic:** held; the review's check 2 read the 19 fixes in their makers' transcripts (its `fixesChecked`).
- **3, the skeptic builds its fix and runs the suite it reaches:** two skeptics built once each and ran about 10 minutes of suites each; C's and E's skeptics wrote 400K and 403K, against W's 415K and L's 377K, which built nothing. The builds cost machine time, not tokens.
- **4, the skeptic commits the worker's report and record from the journal:** needed for all four rungs; held.
- **5, placeholders numbered by the gather:** held. Rows 642 to 659 in apply order, no collision; NEW-W-2 dropped by its skeptic; a cross-rung citation (E's skeptic citing C's NEW-C-2) and two placeholders in `changes.tex` resolved by the gather; no placeholder left where a row is cited (`git grep "NEW-[WCEL]-[0-9]"` finds only the mappings). The weak part is `ledger.py` (finding 6).
- **6, the gather folds the revival-change entries; the cold reader fixes wording:** five entries folded with their `sources.md` lines; the review fixed two claims, the cold reader sixteen wordings, three returned. The fold's blind spot: the gather writes only the part, so the sentences elsewhere in the skill that the same change made false stayed (gather.2, coldread.1). The cold read cost twice its price, 154K against 80K.
- **7, `.claude/` outside the code paths:** the review's and the cold read's commits reran nothing.
- **8, `testSpecData` joins with W:** ran in the gate, 130 of 130. `gate.md` does not yet name it (Part 4).
- **9, the microGPT check awaited, holding nothing:** held: both `ALL PASS`, written to `summary.txt`, nothing held. Its first try failed on `run_bg`.
- **10, points to report replace stops:** held. The review listed 15 points, none `holdsPush`; the batch never stopped.
- **11, leaner briefings:** first calls 0.85M under batch 10. I found no process slip a briefing's position would have prevented: every worker kept test first, one suite per code state and its points; each cited the decisions that shaped its fixes. The skill carried the process, at about 0.5M (section 2).
- **12 to 15:** `forCurator` used throughout; all Opus; default agent type; rows added in apply order.
- **The Fable review's fixes to the script:** the one suite per edit, held; no stage after a skeptic's fix, held; the old code for a correction's test, held, with the `XXX` wording gap above; the repair round's result and the placeholder grep were not exercised.

### Misses, by kind

Numbered on from `batch-10-review.md`'s 316. "Found by" names the first to catch it.

Found inside the batch:
- **The change wrong.** 317, C's widening override with static parameters on one side, unchecked (skeptic C); 318, E's multifix reading chosen by the expected type (skeptic E); 319, C's row 626 fix stopping short of the clause body (skeptic C).
- **A new rule's effect on a sibling path.** 320, C's provides reading turning two compiled tests red (worker C, its suite); 321, C's refusal of an object below a re-declared abstract method (skeptic C); 322, E's renaming meeting row 651 (skeptic E); 323, `OPEN` changing which declaration runs (skeptic W); 324, C's disambiguator reaching walk (worker C).
- **The team's own code, found by the rungs' probes.** 325 to 342, one for each of rows 642 to 659: 642 and 643 (worker E), 644 (skeptic E), 645 and 646 (worker W), 647 to 649 (skeptic W), 650 to 652 (worker C), 653 (skeptic C), 654 to 659 (worker L).
- **A premise of the record that does not hold.** 343, `disp0`'s compiled run, which the code generator stops (worker C, row 650); 344, the judgement's reading of a `Set[\ZZ32\]` binding under way 11 (worker W, row 646); 345, the block's fix area (worker E).
- **Text or a record claiming more than the paths do.** 346, E's `typecase` sentence (skeptic E); 347, W's new row for a defect row 473 holds, and its "none found" on dispatch (skeptic W); 348, L's list of changed values and FACTS:88 (skeptic L); 349, FACTS' row-588 clause and `testSpecData` title, two sentences of the part (the review); 350, sixteen wordings of the part (the cold read); 351, four FACTS sentences (the commit).
- **Provenance and citations.** 352, C's `withoutSelf`, E's `trait-parameters.tex`, L's precedent line, W's count (the skeptics).
- **Process.** 353, `run_bg` refused nine times (rung W first, then every agent that used it); 354, every worker's report write refused by the harness (the skeptics); 355, `ledger.py`'s four missing routes (the gather, then the review).

Found by this review:
- 356, six skill sentences false, two beyond gather.2's four (Part 4).
- 357, the BR site attributed to Q4 (section 1).
- 358, eight new rows without a PLAN line; five answered items read as open (Part 4).
- 359, delta-unfolded.1 false (Part 4).
- 360, the build measure counting refused calls (section 3).
- 361, the `# machine` thread line (section 4).
- 362, the contested rule's two clauses with no order (above).

**Against the earlier notes.** 39 found inside the batch (317 to 355), 9.75 a rung, as in batch 10. By whom: workers 19, skeptics 16, the gather, the review, the cold read and the commit one each; batch 10's were skeptics 24, workers 12. No test-first miss, against batch 10's two. Landed: no wrong value; the known costs are rows and listed points.

### Measures the evidence supports, each with its cost

1. **The contested rule's third clause narrowed:** a fix is contested for a point to report only when the worker's change did not already reach that point; a fix that a cited sentence settles is settled unless the worker's report cites a source for the behaviour it changes. Evidence: C's ruling. Saves about 0.14M a time. The curator's word (POSITIONS, "The judge's rulings.").
2. **One skill-writer task before batch 12's record:** the six sentences of Part 4, `session.md`'s `run_bg`, coldread.2 and .3. Evidence: Part 4, section 3.
3. **A PLAN line for every row a batch opens**, written by the gather beside the items it routes. Evidence: Part 4. One step of the gather.
4. **The script's unfolded-entry filter skips a "none"** (`climb-batch-workflow.js:1941`). One condition.
5. **The skeptic's test-first sentence names the `XXX` case** (`climb-batch-workflow.js:805`): an `XXX` test is seen as an expected failure on the base and red once with the defect removed. One clause.
6. **`batch-measures.py` counts only a build call that ran**, and reads `nohup` and `sh -c` forms. A tool change.
7. **`ledger.py` routes for a reproducer, a close without a test, a narrowed claim, and a note past the cap.** A tool change; the cap itself is the curator's (POSITIONS, "The gap ledger's form.").

## Part 3. The curator's question: the other path

The sentence: "If you fix either path, say in your report whether the other has the same defect." (`.claude/skills/fortress-repo/SKILL.md:56`). No report form asks the same: the worker's `REPORT.md` list (`climb-batch-workflow.js`, "What you write") has no such item. The skeptic's brief asks for both paths twice, in its own words: check 6, "programs ... run under walk and on the compiled path", and check 8, "every other site of the defect ... and on the other path" (`climb-batch-workflow.js:786`, `:794`).

**How I read motive.** The transcripts keep no reasoning: every `thinking` block is stored empty, and no agent's visible text quotes the sentence or speaks of "the other path". So I read what each agent ran or read on the other path, when, and what its brief or record asked at that point. Tokens are the writes of the message that took in each call's result.

| Agent (its path) | On the other path | Why, by its brief and record | Writes | Found what the record lacked |
|---|---|---|---|---|
| Rung W (walk) | nothing; its report's one line, "The compiled path: rows 425 and 570 stay as they are", is from the record | | 0 | no |
| Rung C (checker) | walk's `providedBy` read (3 calls, 23:43-23:44); Q4's local functions and a keyword parameter under walk (2 calls, 00:09-00:11); its own disambiguator edit under walk (1 call, 00:28); `ant testSystem` (2 calls) | the record names walk's reading as precedent; the Appendix I Effect states what walk does; its edit is in a shared phase, a point to report and the skill's suite rule | 12K | row 652, keyword parameters on neither path |
| Rung E (checker) | two of its new tests' programs under walk (01:07, 01:12) | the values its tests assert | 2K | no new defect; walk's `PASS` gave row 643's test, where the compiled run dies, its expected value |
| Rung L (library) | the checker's Scala read (9 calls) | its test is the stage, the checker on the library; not the other path in the sentence's sense | 31K | no |
| Skeptic W | four programs compiled and run on the old code | check 6 | 7K | no (rows 610, 375, 425 known) |
| Skeptic C | walk beside the compiled path in ten differential calls; `ant testSystem` for its fix | check 6; its fix in a shared phase | 25K for the calls whole, the walk share smaller | row 653's walk half; walk's stop on the re-declared abstract method (a note on row 572) |
| Skeptic E | the walk column of its differential, old code | check 6 | 3K | no (rows 29, 21, 76 known) |
| Skeptic L | one range loop compiled and run on the old and the new code | check 6 | 3K | no |

- **No agent went into the other path because of this sentence.** W, the one worker whose fix lies on one path only, never touched the compiled path and answered from the record. The workers' runs there each had a cause in their brief or record, and cost 14K beside L's own test. The skeptics' runs, about 38K, are their brief's check 6 and 8.
- **What it found came from one run of the agent's own program on the other path:** row 652 and row 653's walk half. None came from reading the other path's code.
- **So the sentence's useful part is narrow.** Where a fix is in a phase both paths run, its test belongs on both. Where an agent records a defect the record does not hold, running that one program on the other path tells which paths the row names. "Say whether the other has the same defect" for every fix asks for an answer an agent can give only by searching, which is the fishing the curator names; in this run nobody did it, but the sentence invites it.

**Wording that keeps the useful part**, for `SKILL.md:56`, in the skill's register:

> Walk and the compiled path share the parser and the phases below. After those, they share almost no code, so a fix on one path does not reach the other. If you edit a phase that both paths run, run your test on both paths. If you record a defect that the record does not hold, run its program on the other path too, if it runs there, and say in the ledger row which paths show it.

The second instruction belongs equally in `exploring.md`, where the curator reads it; the first is already half in `interpreter.md:30`. The skeptic's check 8 could drop "and on the other path" for a rung whose edit is on one path; check 6 found row 653's walk half and is worth its 3K to 25K.

## Part 4. Routing

Checked against `main` at `dcc6b4307`, whose PLAN and ledger are those of the landing.

### The script's 24 items

Each id against the PLAN entry the review's `curatorItems` names, by a script that finds the entry and its section (`rev11/`), then read:
- **"Pavol's answers", "Before the switch-over, raised by climb batch 11"** (`PLAN.md:261-267`): E.worker.1 as item 48, L.worker.1 as 49, L.worker.2 as 50. There.
- **"Climb batch 9, listed for his review"**, D2's entry (`:560`): W.worker.1 and W.skeptic.1, its two sentences added. There.
- **"Climb batch 10, listed for his review"**, row 615's entry (`:603`): C.skeptic.1, its sentence added. There.
- **"Climb batch 11, listed for his review"** (`:616-633`), 14 entries: E.skeptic.1 (`:620`); W.worker.3 and W.skeptic.2 (`:621`); W.skeptic.3 (`:622`); W.worker.2 (`:623`); C.worker.1 and C.skeptic.2 (`:624`); C.worker.2 (`:625`); C.judge.1 (`:626`); L.worker.3 to .6 (`:627-630`); gather.1 with L.worker.7 and review.1 appended (`:631`); gather.2 (`:632`); review-routed.1 (`:633`). There.

All 24 landed where they name.

### The four it did not route, and gather.2

- **delta-unfolded.1 is false, not a skill matter.** The gather reported E's entry as "none: E's record gives 'Revival change: none', so nothing to fold", `folded: false`; the script turns every unfolded entry into "was not folded: the part is not in the tree" (`climb-batch-workflow.js:1941-1942`). The part is in the tree, and E's "none" is right (Part 1). Home: the script's filter; nothing for the skill writer.
- **coldread.1** is gather.2's sentences: `SKILL.md:126` and `library.md:25` contradict the part's new entry; `interpreter.md:68` too.
- **coldread.2:** the older entry "A type parameter that a call does not fix" (`revival-changes.md:80`) points to the false `SKILL.md:126` and overstates walk's exception.
- **coldread.3:** "an object expression without static parameters" (`revival-changes.md:60`) leaves a reader searching, since an object expression writes none; walk's lifting gives it those of an enclosing generic declaration. True, but needs its gloss chosen.
- **gather.2** is routed into PLAN (`:632`) and is a skill matter.

### Every sentence of the skill that rungs W, C, E and L made false

All six come from rung W; C, E and L made none false outside the part their own entries wrote, which the review and the cold read already corrected. One writer task fixes them all:

| File:line | The sentence | What is true now |
|---|---|---|
| `.claude/skills/fortress-repo/SKILL.md:126` | "Under walk, one whose bound names the parameter itself, such as `SUM`'s, still gets the empty type `Bottom` (ledger row 424)." | Walk leaves such a parameter open: every value passes where walk checks a value against it, so `SUM[i <- 1#100] i` runs (row 424 fixed, `369982d85`; `revival-changes.md`, "A type parameter whose bound names itself, under walk"). Under walk a big operator's plain-bounded static parameters (D2) and a bound that names another static parameter (row 612) still get `Bottom`. |
| `.claude/skills/fortress-repo/references/library.md:25` | "Under walk, a call without it fails at its first element (ledger row 424)." | Under walk the call runs on its elements' types; an empty one gives `ZZ32`'s identity whatever its element type (row 645), and `BIG MINMAX` still stops (row 473). The checker still refuses it (row 425), so the instruction to write the element type stands. |
| `.claude/skills/fortress-repo/references/interpreter.md:68` | "Do not use `explorations/claude_demo.fss`: it dies under walk (ledger row 424)." | It runs to its last line, rc 0, "SUM[i <- 1#100] i = 5050" (`rung-walk-open-param/REPORT.md` section 4). The record returns the skill's walk example to it at the curator's word (`CLIMB-BATCH-11.md` section 3, W, "At the landing"). |
| `.claude/skills/fortress-repo/references/tests-running.md:54`, under "Outside the gate" (`:52`) | "Five of its examples fail today: reductions written without their element type." | All 130 pass, and `ant testSpecData` is a gate step from batch 11 on (POSITIONS, "The specification's examples join the gate at zero red."; the gate's row `specdata/SpecDataJUTest 130 0`). The bullet moves to `gate.md`. |
| `.claude/skills/fortress-repo/references/gate.md:3` and `:44` | "The gate runs the seven steps below" and "4. Run `ant testFast`, then `ant testSystem`." | The gate runs `ant testSpecData` after `ant testSystem`, all green required (the redesign's section 7, item 1). The summary's `#` lines (`:7`) now include `# machine` and the commit's `# microgpt-walk` lines, the script's changes rather than a rung's. |
| `.claude/skills/fortress-repo/references/revival-changes.md:80` | "Resolution: it takes its bound, except under walk, as `SKILL.md`, "Fortress as a language", says." | It takes its bound on both paths; under walk, a bound that names the parameter itself is left open (the next entry), and D2's and row 612's cases get `Bottom`. Its pointer now leads to the false `SKILL.md:126` (coldread.2). |

For the same task, not made false by a rung:
- `references/session.md:29-33`, "If a command can take more than a minute or two, start it with `run_bg`", and `:10`: the removal check refused every `run_bg` in this run (section 3); the literal `nohup bash -c '...'` form passed.
- `revival-changes.md:60`, coldread.3's gloss.
- `references/compiler.md:31-37`, the code generator's walls: the modifier `override` is one (row 650), true on the base too, missing from the list.
- `SKILL.md:56`, the other-path sentence (Part 3).

### Rows opened and closed

- **Opened, 642 to 659.** Each is a ledger row in its section, numbered by `ledger.py add`. Reproducers: 15 a test or the per-site list; 653 owed (review-routed.1); 658 and 659 rows alone, as `tests-writing.md`'s third home allows where walk stops.
  - With a PLAN line: 642 (item 48), 646, 650, 651, 653, 655 to 657 (items 49 and 50), 658, 659.
  - **No PLAN line:** 643, the code generator's `NoSuchMethodError` (phase 5's code-generation list, with rows 559, 564, 565, 594 and 624); 644, the repeated operator's expected type (the next checker rung, with row 455); 645, the empty unwritten reduction's identity (D2's entry, with row 425); 647, 648 and 649, walk's generic Meet Rule check, top-level object expression and abstract method (the next walk rung, with rows 611, 612 and 616); 652, keyword parameters on neither path (parked beside the `where`-clause line, a language feature not built); 654, `narrowToRange`'s `OpenRange` sibling (the next library rung, with items 49 and 50).
- **Closed, 17 and 622 as a duplicate.** Each cites a landed commit and a test that exists on `main` (each name checked with `git ls-files`). Row 638 is fixed in the tree and open in the ledger, its claim still saying "three revival tests" (gather.1).
- **Rows whose claim or note the batch made partly false:** 455, 611, 628, 638; notes on 615 and 405 (review.1, in gather.1's entry). Their home is that entry.

### Lines the batch made stale

- PLAN items 36, 39, 40, 41 and 47 (`PLAN.md:233`, `:241`, `:243`, `:245`, `:259`) still read as open questions, "No default on record"; the curator answered them on 2026-10-08 (POSITIONS, "The order of the work after batch 10.") and this batch built them.
- Phase 3's item 9, "Batch 11, its record ... not yet drafted" (`PLAN.md:113`), and its lines for row 424, "no batch named yet" (`:93`), P1 (`:107`), row 619 and row 638, "for the next ... rung" (`:110`, `:111`), all built now. The review named item 9 and the handover.
- FACTS, as the commit listed: `:44` "The checker crashes on an untyped local-function parameter"; `:56`, the crash rows and "the BR sites left are calls"; `:66` "the distance stage's 340"; `:144`, batch 10's figures (516, 1,043, 253). The `:56` rewrite should give the BR site to row 488, not to Q4.
- The record's own "After the landing" list (`CLIMB-BATCH-11.md` section 5): row 638's note and PLAN's "three revival tests"; row 560's note against item 36. Open.

**The checker-count check.** The table is batch 10's byte for byte (`diff` prints nothing): the same twelve apis, `#total 1`, `#locations 2`, `#crash none`. No unit of the distance rose: `List` 10 to 5, `RangeInternals` 20 to 2, `FortressBuiltin` 2 to 0, `FortressLibrary` 215 to 194, the others the same. One class rose, `BR` 3 to 4, row 488's site. The three crash rows changed kind, InterpreterBug to TypeError, at the same declarations.

## What I did not do

- I built nothing, ran no Fortress program, suite or stage, and did not run `batch-measures.py`; its figures are the brief's. My own count of writes agrees with it.
- The skeptics' and workers' reasoning is not in their transcripts (empty `thinking` blocks), so Part 3 reads motive from what was run, when, and what the brief asked. Its token figures attribute each call the writes of the message that took in its result; skeptic C's 25K covers whole calls that ran both paths.
- The skill's load (0.5M) is the same attribution and includes other results that shared those messages.
- I did not map the 207 sites one by one or class them at base lines, as batch 10's review did; section 1 rests on the rungs' and skeptics' per-site readings and the gate's tables.
- I did not judge the specification's new passages line by line beyond what the rungs, skeptics and the review checked.

## For Pavol

- All four rungs follow your decisions and the specification. C needed its skeptic's two fixes. The one contested fix was upheld; by its substance it needed no ruling.
- Cost: 5.03M written, 14 agents, 4 h 25 min (batch 10: 6.26M, 21 agents, 5 h 33 min; predicted 5.2M):
  - workers 1.99M, skeptics 1.60M;
  - one ruling 0.14M, no repair, no second skeptic;
  - gather 0.49M, review 0.41M, cold read 0.15M, gate and commit 0.25M.
- The practice held. Skeptics made 19 fixes, each sound, each test first; nothing in code slipped to the review or the gate. Refusal cycles fell from 28% to 3%, first calls from 23% to 12%.
- The skill, not the practice, is what needs work: six sentences false since rung W, and its `run_bg` refused every time an agent used it.
- Your question: no agent went into the other path because of that sentence. Rung W never touched it; the skeptics did, because their own brief asks. The useful part is one run of a new defect's program on the other path, which found row 652 and row 653's walk half; Part 3 gives the wording.
- Count stays 1 (`isLeftZero`). Distance 253 to 207: L 28, E 18, C 1, and one site that moves with the checker's query order (row 488).
- Before batch 12: the skill fix, and PLAN's answered items and eight new rows given their lines.
