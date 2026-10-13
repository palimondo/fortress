<!-- The record test's second run, 2026-10-13, on the consolidation's pilot (F-51 to F-72 and P-37 to P-62 at 55f1a1352): one Opus reader in that copy, graded blind by Opus against the first run's old-entries answers. X is the first run's old entries, Y the pilot's; totals X 28, Y 29 of 30. -->

# Record test 2: grades

Graded blind to the copy. Each score uses `key.md`'s rubric: decision 0 to 2, sources 0 to 1. Where the first grading's section 5 shows the key wrong (`explorations/coordinator/process-engineering/record-test/grades.md`, slips 1 to 7), no answer was marked down for departing from the key at that point. Section 5 below lists further slips. I checked each claim beyond the key that a score rests on against `/home/user/fortress`: ledger rows with `facts-extract.sh 'ledger:N'`, files with `sed -n` or `grep`. The checks are named inline. Paths are under `explorations/` unless they start with `ProjectFortress/`, `Library/`, `Specification/` or `.claude/`.

"Lookups" counts the items on each answer's "Sources:" line, leaving out Y's opening "Were the given entries enough?" line, and names the ones that carry weight.

## 1. Scores by scenario

### 1. A rung that repairs row 665

| | decision | sources |
|---|---|---|
| X | 2 | 1 |
| Y | 2 | 1 |

- **X, decision 2.**
  - Promotes the two `XXXAbstractMethodUndefinedGeneric*Walk` tests and sees them red first.
  - Places the check at `Constructor.java:263`/`:431`, with `symbolicInstance` as the precedent.
  - Keeps `definedBelow` with `PairsRunRangesWalk`.
  - Finds row 667 fixed and row 668's `SeededRandomGenWithDistribution` (`Random.fss:171`, `:88`, `:99`), and repairs it test first as a point to report.
  - Names the importers of `Random` that would go red (checked by grep: `RandomTest`, `QuickCheckTest`, `ReflectiveQuickCheckTest`, `LibraryMeetDeclarations`, `UniformDistributionStridedRange`, `ReflectiveNumberTypes`).
  - One slip: it gives the override half as fixed at `8803d2f45`. That commit landed the non-generic checks; the generic override fix is `efd6bb2f2` (`git log` of `OverrideNothingGenericWalk.test`). The slip carries no weight.
  - It does not mention the record's hold of this half behind item 51 (see Y).
- **X, sources 1.** Rows 665 to 669, the code at file:line, `Random.fss`, `Pairs.fss`, PLAN R10. It cites the code in place of the rung report for the check's location, which is an equivalent primary source.
- **Y, decision 2.**
  - Covers everything X does, and also `FileTests.java:482-511`'s two verdicts (checked) and `XXXUniformDistributionRangeType` having no `.test` (checked).
  - Adds the record's order: PLAN:139 lists "Item 51, then row 665's abstract half once rows 668 and 669 are repaired", and `CLIMB-BATCH-13.md:51` says the half waits with item 51 (both checked). Y goes ahead under P-111 and names the hold for the curator. The key does not have this point.
- **Y, sources 1.**
- **Lookups.** X made 14: FACTS:145; rows 665-669, 628, 647, 649, 653; three walk Java files; four library files; the tests; PLAN:318-330; `tests-writing.md`. Y made 20: F-145, F-147, F-148; rows 665-670, 693, 444 and siblings; four Java files including `FileTests`; four library files; `rung-walk-override/REPORT.md`; PLAN, `CLIMB-BATCH-13.md`, `review-queue.md`; P-111, P-112; `changes.tex`; five skill parts.

### 2. A rung that repairs row 686

| | decision | sources |
|---|---|---|
| X | 2 | 1 |
| Y | 2 | 1 |

- **X, decision 2.**
  - Promotes `XXXInferCallerTwoBoundsClosedTrait`.
  - Takes `:2490` from the tsv's 15th line (checked).
  - Uses the landed tables as the before, with no re-run (P-110).
  - Makes the after one background run, read by `compare.sh` and a per-site diff keyed by location and message, with the variation named (row 488; BR, V2, O1).
  - Places the cause at `typedApplication`, not `boundsSubstitution`. Its "`:733-735` today; `:721` at `a1a75716a`" is right (checked: `errors.signal(errorFactory.makeApplicationError(...))` at `:733-734`).
  - Gives the 900 s limit, the 387 s and the 17 minutes, keeps the memo on, and gives the distance times of 2,246 s and 1,318 s.
  - It lacks the distance stage's own 5,400 s limit, which the scenario rubric lists. I did not lower the score for it: the first grading held that the limit changes no step for a stage run once in the background, and by the key's general definition of 1 it changes no step or number here. X's 13 to 24 minutes per rung comes from `climb-batch-workflow.js:734` (checked).
- **X, sources 1.**
- **Y, decision 2.**
  - Has the same points, plus the 5,400 s (`run.sh:120`, checked).
  - Notes that `STypesUtil` lies outside the brief's files (`scala_src/useful/STypesUtil.scala`, checked).
  - Notes that `:2490` is class OT (consistent with the tsv's `#class OT 16`).
- **Y, sources 1.**
- **Lookups.** X made 13: rows 686, 687, 689, 690, 684, 688; the tsv; `distance.txt`; 13b `RECORD.md`; the library lines; `TypeSchemaAnalyzer`, `Functionals`, `Formula`; the tests; PLAN; `batch-13-review.md`; POSITIONS:110; the workflow script; four rung reports. Y made 13: F-94, F-53, F-54, P-110; rows 686, 687, 689, 690, 488, 474; the tests; the library; the gate's tables; `classify.py` (run); `run.sh` and `compare.sh`; `checker-count/run.sh`; `rung-array-bound`; `checker-speed`; `climb-batch-workflow.md`; the Scala sources; skill parts.

### 3. Two refusals while a rung's tests are written

| | decision | sources |
|---|---|---|
| X | 2 | 1 |
| Y | 2 | 1 |

- **X, decision 2.**
  - Row 455, with `XXXInferContextDrops.fss:10` as the very line (checked).
  - Row 510, with `XXXInferExpectedTypeRungK.fss:22` and the control at `:20` (checked).
  - The retry decided and not built; row 510's repair the curator's.
  - Both lines respelled with the static argument, the row's workaround. Nothing opened, no new `XXX`.
- **X, sources 1.** Rows 455 and 510, both reproducers, and the POSITIONS retry entry by title.
- **Y, decision 2.**
  - The same, plus PLAN:466's default for row 510 ("walk as it is"; checked) and the typed binding as the equivalent compiled spelling.
  - Both readers flag row 510's "only the result mentions" wording, which is slip 5 of the first grading.
- **Y, sources 1.**
- **Lookups.** X made 4: rows 510 and 455 with two `ledger-find`s; the two reproducers; `InferCoercionRungK`. Y made 7: F-55, F-87, F-56; rows 455, 510, 412; the two reproducers; P-51 and PLAN:133-139; PLAN:466; skill parts.

### 4. The next batch's rung on the sized arrays

| | decision | sources |
|---|---|---|
| X | 1 | 1 |
| Y | 2 | 1 |

- **X, decision 1.**
  - Right before (landed tables, no re-run). Right after (`compare.sh`, then the per-site diff with lines mapped through `git diff -U0`).
  - The variation named for V2 (row 488; `rung-tabulate` § 5; `rung-exclusion-remainder` § 9).
  - The 17 sites listed by line: 14 parent-trait bodies and 3 branch joins. This matches slip 1 of the first grading.
  - "No ledger row names these sites" (`array-forks-now.md:58-59`, checked). The 900 s limit and the stage times.
  - A well-argued note for the curator: V2 is "none of the six" forks (`array-forks-now.md:7`, checked), so cut it into the `fill`/`tabulate` sites, the `map`/`ivmap` sites that need his choice, and the branch joins as a checker rule.
  - Missing: row 680's `Array3` crash, which makes V2's 17 a floor (two run-time-size calls hidden, `:2955`, `:2966`). The rubric's 1 names exactly this case.
- **X, sources 1.** `distance.txt`, the root-cause entry, `classify.py`, the varying-families reports and `array-forks-now.md`. It asserts no crash or time without a source.
- **Y, decision 2.**
  - The before names both `#crash decl` rows, with row 680 and the floor (`:2955`, `:2966`). The 17 sites are taken by running `classify.py -v`.
  - Matching sites by declaration and message, and the variation in the joins.
  - V1's, OT's and row 686's sites in the same declarations, kept apart from V2 (consistent with slip 1).
  - The 819 to 1,318 s cost of the two-trait bound (`13b/RECORD.md:49`, checked).
  - For the curator: the record's own "a list of ways first" (`CLIMB-BATCH-13.md:52`, PLAN:141, checked). Row 680 already a batch 14 candidate (PLAN:138, checked). A cut by cause, and a warning that the bodies collide with the self-typed rung.
- **Y, sources 1.**
- **Lookups.** X made 16: FACTS:54; `distance.txt`; the tsv; `classify.py`; `distance-triage.md`; four rung reports; 13b `RECORD.md`; the library `.fss` and `.fsi`; five `ledger-find`s and rows 683, 685; PLAN; POSITIONS:82-100, :110; `batch-13-review.md`; `array-forks-now.md`; `self-typed-bodies-judgement.md`; INDEX; the workflow script. Y made 13: F-53, F-94; F-54 and its history; `distance.txt`, `RECORD.md`; the tsv with `classify.py` run; `run.sh`, `compare.sh`; the library lines; rows 680, 685, 678, 679, 686; `distance-triage.md`; `CLIMB-BATCH-13.md:37`, `:43-56`; PLAN:133-141; `climb-batch-workflow.md`; P-110; `gate.md`.

### 5. Two objections from an outside reader

| | decision | sources |
|---|---|---|
| X | 2 | 1 |
| Y | 2 | 1 |

- **X, decision 2.**
  - Objection 1 is granted on the fact (p. 11:11) and refused on the consequence. The restriction was "recorded when we checked our decisions" (`popl-recheck.md`), so it is not new evidence.
  - The decision's reason: the type group's latest word.
  - Walk leaves the parameter open; the checker leaves a self-mentioning bound out of the meet; the library writes the static argument (P-78, checked at POSITIONS:78).
  - On objection 2, X calls the objection "wrong" where the key says the reader "is right about the proof's scope". The substance is the same: X quotes the revision box, "the type of such a call is not yet given" (`advanced/overloading.tex:704-708`, checked), which concedes the proof's ground scope and refutes "presented as proved".
  - Gives the checker's narrower condition and no library pair accepted.
  - Re-decide nothing; rows 543 and 551 and PLAN:326-327 for his review (checked). It names P1's matter but not the label, as in the first grading.
- **X, sources 1.**
- **Y, decision 2.**
  - The same verdicts, with Appendix I's own concession (`changes.tex:2354-2358`, quoted exactly, checked) and the boundary at `:84-87`, `:679-682`, `:704-708`.
  - Row 425 as the open corner (its three landed sites, as in slip 3). P1 way 11 for walk. Rows 543 and 551.
  - "Already on record" stands in for "not new evidence".
- **Y, sources 1.**
- **Lookups.** X made 9: `popl-recheck.md`; `inference.tex`, `overloading.tex`, `changes.tex`; `advanced/overloading.tex`; POSITIONS:78; FACTS:141, 143, 78; rows 425, 424, 593, 543, 551; `rung-return-type-rule` § 7; `Functionals.scala`; PLAN:318-330. Y made 11: P-48, F-166, P-60; `popl-recheck.md`; `array-judgements-popl-check.md`; `changes.tex`; `advanced/overloading.tex`; `inference.tex`; `FortressLibrary.fsi:1973-2031`; rows 593, 543, 551, 491, 425, 538; F-76; PLAN:107, 140, 565; a POSITIONS grep.

### 6. The process stopped in the gate

| | decision | sources |
|---|---|---|
| X | 2 | 1 |
| Y | 2 | 1 |

- **X, decision 2.**
  - Reads the journal first (`journal-text.py`), then `main`, then the processes, by `ps` and `/proc/<pid>/cwd`.
  - Diffs the script against the launched copy. Keeps the edit if it touches only the commit role, by the prefix rule. Checks the call order and wraps `agent()` only if needed.
  - Resumes in-session with the same arguments and the full hash. No rung, skeptic or gather runs again.
  - Sees that the resumed gate is attempt 1 and gets no takeover text (`callAgent`'s `retry = attempt > 1`, `climb-batch-workflow.js:1680`, checked). Its step 2 would therefore start a second distance stage, so X stops the survivors by pid and moves the gate's folders aside.
  - Handles the merged-diff review, which runs beside the gate (`:1952-1954`, checked) and which the key omits (section 5).
- **X, sources 1.** `agents.md` for the resume rules, and the workflow script itself for the gate's steps, an equivalent of `climb-batch-workflow.md`. No precedent cited, none needed.
- **Y, decision 2.**
  - The same procedure and the same finding on the surviving distance stage, with the cause: `run.sh:88` deletes the shared scratch (checked).
  - Stale `EXIT=` logs that would satisfy the new gate's waits; the `cp -a` nesting.
  - Wraps `agent()` because the rungs ran as parallel pipelines (`agents.md`: "a script that starts calls as others finish can issue them in another order").
  - The review handled conditionally; check-ins re-armed.
- **Y, sources 1.**
- **Lookups.** X made 4: the workflow script (header, `gateRole`, `callAgent` and the recover functions, the call order); `agents.md`; `session.md`. For the journal and the cache it judged the quoted entry enough. Y made 9: F-201, F-202, P-127; `climb-batch-workflow.md:67`, `:301`; the script; `journal-text.py`; `run.sh`; `resume-rule-archaeology.md`; 6.5b `RECORD.md`; `pending-script-edit.md`; `session.md`, `gate.md`.

### 7. What C4 still fails on after decision D

| | decision | sources |
|---|---|---|
| X | 2 | 1 |
| Y | 2 | 1 |

- **X, decision 2.**
  - The 14 at `6bc21c364` on 2026-09-29, and its parts: 3 `DOT`s on E3, the `adam` bridge, `numbersOf`, 5 powers, and 4 old items.
  - X names the fourth old item as `matShape`'s body. That is right and the key is wrong (section 5).
  - The powers by row 533's tie. "Yes" to the numeral question through the tie, which slip 4 allows.
  - The floor by row 474, with 18 and 7 and the planted errors.
  - The date, row 533's "not measured since", and row 477's crash now fixed.
  - One new measurement offered as his choice.
  - X marks F-58's headline "none of their errors is a numeral" for correction. That is a reading, not an error: main's F-58 now reads "none comes from a numeral's type".
  - X places the `adam` bridge's device at `cast`, not fork 3 (`array-fork3-judgement.md:72`, checked).
  - Weak point: its offered measurement names `rebase-2026-09-29/run.sh`, which was removed in `84aef6a4f` (checked). A worker would recover it from git, so the step still works.
- **X, sources 1.** `array-design-ways.md` § 1 and § 2, `decision-d-diff.md`, rows 533 and 474.
- **Y, decision 2.**
  - The same parts, the mechanism, the floor, the date and the offer.
  - Finds that the rebase folder is gone (`facts-slice-2.md:103`, checked) and plans its recovery from history.
  - Two slips that change no step: its "four old items" lists all six old names, including `Diag` and `view`, which the diff removed (`decision-d-diff.md` § 5). It reads the `adam` bridge as possibly cleared by fork 3's 4a, which `array-fork3-judgement.md:72` contradicts. It labels that reading "not measured".
- **Y, sources 1.**
- **Lookups.** X made 9: FACTS:58; `array-design-ways.md`; `decision-d-diff.md`; `numerics-plan-fable.md`; rows 533, 474, 477, 475, 175; `array-fork3-judgement.md`; PLAN:142; `microgpt-phase.md`; the tsv. Y made 8: F-58, F-35; rows 533, 474; `array-design-ways.md:1-98`; PLAN:338-350 and the phase 5 lines; an `ls` and `facts-slice-2.md:103`; `decision-d-diff.md`; INDEX:255.

### 8. A worker's finding on the coverage typing

| | decision | sources |
|---|---|---|
| X | 2 | 1 |
| Y | 2 | 1 |

- **X, decision 2.**
  - Row 543, deliberate, with the gated reproducer `XXXCoverageReturnGenericFamily`.
  - `groundFamily` (`Functionals.scala:701`, checked).
  - The specification upheld with its boundary (`:678-682`), the judge's D6 on his list, no row, no fix.
  - The test respelled ground; a report line.
  - Like the first grading's Y, X checks the shape: "`M` itself the closed trait" against an argument below two closed traits (`types-vals-vars.tex:611-612`, checked). That is a care.
  - Neither reader writes the key's decision-not-taken line, because row 543's scope is already on his list. I did not count that against either.
- **X, sources 1.**
- **Y, decision 2.**
  - The same, plus PLAN:525's rejected wider way (row 540; checked).
  - The gated key matching either binding, and the record's two accounts of the sort's head ("declaration order" at PLAN:525 against "varying between runs" in row 543's notes, both checked) noted as a record fix.
  - It adds row 559 to PLAN's reason for keeping the condition narrow, an extension that PLAN does not write.
- **Y, sources 1.**
- **Lookups.** X made 6: rows 543, 540, 559, 487, 551, 547; the reproducer; the coverage tests; `Functionals.scala`; `advanced/overloading.tex` and `types-vals-vars.tex`; FACTS:175. Y made 8: P-60; rows 543, 551, 540, 559; the reproducer; `overloading.tex`, `changes.tex`; `Functionals.scala`; PLAN:520-525; `rung-return-type-rule/JUDGE.md`; `exploring.md`.

### 9. Where the instance rule stands, path by path

| | decision | sources |
|---|---|---|
| X | 1 | 1 |
| Y | 1 | 1 |

- **X, decision 1.**
  - The four paths placed. The dispatcher at `OverloadSet.java:2048` with rows 538 and 496 for phase 5. Row 559 as the run time's (PLAN:564, checked).
  - Walk takes the bound (rows 424, 516, 555 and their tests). The open F-bounded type as his decision, D2 with no test (PLAN:607).
  - Rows 591, 612 and 587 as defects. The library back to the team's declarations; no `fail` or `builtinPrimitive` site.
  - No stale claim on row 516 or `MatchFailure`.
  - But X sorts row 592 among the defects. It is `deliberate (walk)`, decision D3 (row 592's class cell, checked). D5 is absent.
  - Its row 412 (the compile path's `Object` bound) is a valid extra departure (checked).
- **X, sources 1.** FACTS 78, 141, 143, 175, the rows it names, PLAN:607, the library files. It did not open rows 587, 589 or 592 but took them from F-141, as the first grading accepted.
- **Y, decision 1.**
  - The four paths placed. The dispatcher with `:1484` and `:2048`, row 538, and rows 559, 496 and 699 (checked) for phase 5.
  - Walk's decisions sorted right: the open type, D2, row 592 as D3 `deliberate (walk)`, and row 510 with its default.
  - The library unbounded, with row 425's three landed sites reported (slip 3). The specification's boxes. No stale claim.
  - But Y lists D5's test, `InferLoneBoundMentionsParamWalk`, as walk taking the bound. D5 keeps the narrowest named common supertype (`rung-walk-instance/decision-record.md:70`, checked).
  - Its defects are rows 591, 616, 555, 21 and 364 (all checked as walk rows). Rows 587, 589 and 612 are missing, although the inference box it cites names 589 (`inference.tex:220`) and 587 (`:328`).
  - So its "what is left" omits three pinned walk defects, among them row 589, whose repair is the curator's to decide.
- **Y, sources 1.** The rows of every departure it names, PLAN:607, the specification, the library files. It did not cite F-141 or F-175, but cited primary sources for what it claims.
- **Lookups.** X made 10: FACTS:78, 84, 141, 143, 175; 15 rows; test listings; `XXXInferLoneUnionClosedTrait`; `inference.tex`, `overloading.tex`; PLAN:163, 166, 318-330, 564, 607; `popl-recheck.md:65`; the library files; the tsv; `OverloadSet.java`, `Formula.scala`. Y made 9: P-48, P-46, P-49, P-59; F-78, F-56, F-84; 22 rows; test listings; `XXXGenericInstanceUnfixed`; `inference.tex`, `changes.tex`; PLAN:107, 132, 140, 209, 466, 565, 607 and the phase lines; the library files; the tsv and `CLIMB-BATCH-13.md`.

### 10. A rung on row 559, and the shorter way

| | decision | sources |
|---|---|---|
| X | 2 | 1 |
| Y | 2 | 1 |

- **X, decision 2.**
  - Half 1 traced to P-60 and half 2 to P-48, each with its reason, where it is written and how it is gated.
  - Each variant of half 2 refuted. Half 1 shown not to turn the first test green as written (slip 2).
  - (b) refused; (a) at the class loader, after `instantiateUnion` (`InstantiatingClassloader.java:1902`, `:277`, `:2335`, `:2368`, checked) and with route 3 named.
  - The fallback is a decision not taken, citing `records.md`, "At a point to report". PLAN:564's "the repair is the run time's" (checked).
  - Row 541 is not named. Under slip 2 that is not marked down.
- **X, sources 1.** Both POSITIONS entries, row 559, PLAN:166 and :564, the tests, the class loader.
- **Y, decision 2.**
  - The same. Row 540's "The typing stays" and PLAN:165's "not weakened to avoid the crash" (checked) as the record's earlier refusal of this trade.
  - `xlationForFunctionOrGeneric` at `:2507-2519` (checked).
  - A promotion plan at one thread and four. Row 447 as the base's `Bottom`.
- **Y, sources 1.** P-48, P-60, rows 559, 540, 543 and 541 (in the list), PLAN.
- **Lookups.** X made 8: the four test files and `CoverageReturnGood`; rows 559, 540, 543; PLAN:166, :564; `InstantiatingClassloader.java`; `Naming.java`, `NamingCzar.java`; the two chapters; `Functionals.scala`. Y made 10: F-78, F-76, P-48, P-60, P-112, F-166; rows 559, 540, 543, 541, 447, 408, 448; the tests; the class loader, `Naming`, `NamingCzar`; `Functionals.scala`; the specification; PLAN:525 and the phase 5 lines; `climb-batch-workflow.md:95-104`; `popl-recheck.md:16`; skill parts.

## 2. Where one answer scores lower

- **Scenario 4, X (1 against Y's 2).** X lacked the `Array3` crash that makes V2's 17 a floor: the second `#crash decl` row, `TraitDecl FortressLibrary.fss:2887:1-3000:2 ... TryChecker returned an untyped expr ... :2923` (row 680). It hides two calls with a size known only at run time (`:2955`, `:2966`; PLAN:138). This was X's own error with the fact in hand, under either text:
  - X read `climb-batch-13b/gate/distance.txt`, whose `#crash` line holds it (X cites the same file's `:19`).
  - The old FACTS 53 holds it ("`:2923`; row 680 ... hides its two calls with a size known only at run time", `FACTS-history.md:807`).
  - The by-root-cause entry that the scenario sends both readers to holds it in its consolidated text: "The sized arrays' count is a floor: a checker crash hides the rank-3 array trait's body (row 680)". This is F-54 today, and Y quotes it from its copy. X cites "`FACTS.md:54`: the root-cause entry".
- Equal scores with different misses (for the record, not a lower score):
  - **Scenario 9**, both 1. X misfiled row 592 (D3) as a defect and dropped D5, with F-141 in hand: F-141 names "(row 592, D3)" and D5 by name. Y dropped rows 587, 589 and 612 and misfiled D5's test. Y never opened F-141, which P-48 points to in either text, and passed over its own cited `inference.tex:220`, `:328`.
  - **Scenario 2.** X lacked the 5,400 s limit (in `tools/distance/run.sh:120`, in neither entry text); Y had it. No step changed.
  - **Scenario 1.** Only Y found the record's hold of row 665's abstract half behind item 51 (PLAN:139). The key does not ask for it.
- Scenarios 1, 2, 3, 5, 6, 7, 8, 9 and 10: equal scores.

## 3. Totals

| | decision | sources | total |
|---|---|---|---|
| X | 18 | 10 | 28 |
| Y | 19 | 10 | 29 |

By scenario (decision/sources):
- X: 2/1, 2/1, 2/1, 1/1, 2/1, 2/1, 2/1, 2/1, 1/1, 2/1.
- Y: 2/1, 2/1, 2/1, 2/1, 2/1, 2/1, 2/1, 2/1, 1/1, 2/1.

## 4. The entries, one by one

- **FACTS 145 (scenario 1).** Neither decided worse. Both found the check in `Constructor`, the stand-in precedent, `definedBelow` with `Pairs`, row 667 fixed and row 668's object, so the pointers were followed whichever text each had.
- **FACTS 94 and FACTS 53 (scenario 2).** Neither decided worse. Both reached row 686's `typedApplication`, the tsv's `:2490`, the 900 s with 387 s and 17 minutes, and the 2,246 s. Neither text holds the distance stage's 5,400 s; X lacked it, which changed no step.
- **FACTS 55 and FACTS 87 (scenario 3).** Neither decided worse. Both found rows 455 and 510, their reproducers and the POSITIONS retry entry.
- **FACTS 53 and FACTS 94 (scenario 4).** X decided worse: V2's 17 read without the `Array3` crash. The entry was not the cause. The fact sat in the old FACTS 53, in the consolidated by-root-cause entry the scenario names, and in `distance.txt`, all of which X had. The one fact that would have prevented it: "V2's 17 is a floor: the distance table's second `#crash` row, `TryChecker` at `Array3`'s `plane(k)` (`FortressLibrary.fss:2923`, row 680), hides the rank-3 trait's body, two calls with a run-time size among them (`:2955`, `:2966`)."
- **POSITIONS 48, FACTS 166, POSITIONS 60 (scenario 5).** Neither decided worse. Both reached `popl-recheck.md` for "known at the decision", both stated the specification's boundary and the checker's narrower condition (row 543), and neither reopened anything.
- **FACTS 201 (scenario 6).** Neither decided worse. Both reached `agents.md`'s prefix rule and the script's own call order and recovery functions, and both found what the key does not have: the review beside the gate, and the resumed gate's second distance stage.
- **FACTS 58 (scenario 7).** Neither decided worse. Both gave the 14's parts with row 533's tie, the floor by row 474, the date and the "not measured since". Both readers' copies carried the parts. If the old headline "none of their errors is a numeral" did anything, it only prompted X's proposed rewording, which main's current title already makes.
- **POSITIONS 60 (scenario 8).** Neither decided worse. Both reached row 543 with its reproducer, `groundFamily`, the judge's D6 and the specification's boundary.
- **POSITIONS 48, with FACTS 78, 141 and 175 in the copy (scenario 9).** Both decided worse on walk's sorting, and neither because of what POSITIONS 48 held: in both texts it routes to F-141, which sorts the departures.
  - X read F-141 and still filed row 592 as a defect and dropped D5.
  - Y did not open F-141, and lost rows 587, 589 and 612 and D5's place.
  - The one fact that would have prevented both: "walk's departures by decision are the open F-bounded parameter (F-143), D2 (no test), D3 (row 592, `deliberate (walk)`, `XXXInferThroughBoundWalk`) and D5 (`InferLoneBoundMentionsParamWalk`, the narrowest named common supertype); its defects are rows 587, 589, 591 and 612 (and 616), each with its `XXX` test."
  - Neither repeated the stale row 516 sentence or the false `MatchFailure` one.
- **FACTS 78 and FACTS 76 (scenario 10).** Neither decided worse. Both traced the two halves of (b) to POSITIONS 48 and 60 with their reasons, and both found the first test's two bindings as the stronger argument. Row 541's absence (X) is not scored (slip 2).

## 5. What I found wrong in the key

The first grading's seven slips stand and were applied: 1 (scenario 4's rows 678, 679 and 685 are not in V2), 2 (scenario 10's premise and its row 541 clause), 3 (scenario 9's "refuses nothing": row 425's three sites), 4 (scenario 7's "No"; the captures are not in the tree), 5 (row 510's wording), 6 (scenario 8's shape) and 7 (line slips). The new ones:

1. **Scenario 4, "For the curator": "several of V2's 17 are ... decided or undecided design questions (fork 3's run-time sizes, built at 4a; item 15's arithmetic in a size ...) and checker gaps (rows 680, 685, 686)".**
   - None of the 17 is a fork's. `reviews/array-forks-now.md:7` files the 14 parent-trait bodies and the 3 branch joins under "None of the six: 28", and `:52-59` repeats it.
   - Row 686's `:2490` is class OT, not V2 (tsv line 15; Y's `classify.py -v` run).
   - Only the sites row 680 hides are a fork 3 matter.
   - This extends slip 1. X's "V2 is none of the six array forks" is right.
2. **Scenario 4's fact table, "Row 680's crash hides `Array3` ... New FACTS 53/94: no", and its pointer analysis.**
   - The consolidation moved the floor into the by-root-cause entry, which the scenario names and the key lists as in both copies. Its text reads "The sized arrays' count is a floor: a checker crash hides the rank-3 array trait's body (row 680)" (F-54 on `main`). `FACTS-history.md`'s F-54 rewrite note says "Row 680's crash comes from F-53's old text".
   - So the floor was not lost under the new text.
3. **Scenario 7, "4 old small items (`Character.codePoint`, the varargs `SUM`, the varargs export, `view`'s arity among the old six)".**
   - `view` went with the diff. `reviews/decision-d-diff.md` § 5 says "all 15 of decision D are gone as such, and so are two of the small ones, `Diag`'s body and `view`", and "the other 7 are the old ones: 3 `fail`, `codePoint`, the varargs `SUM` and export, and `matShape`".
   - Less the 3 `fail` (gone by 2026-09-29), the four are `codePoint`, the varargs `SUM`, the varargs export and `matShape`'s `((), ())` body (itself row 474's). X has it right.
4. **Scenario 7, "1 the `adam` bridge (a size known only at run time, fork 3's shape)".**
   - The record conflicts. `reviews/array-fork3-judgement.md:72` says the library's `cast` "is decision D's `adam` bridge's device, not this fork's". `:140` says "decision D's bridges, which clear by the same rule when the model compiles in phase 5".
   - The key takes one side. X took `:72`, and Y took the other as an unmeasured reading. Neither was marked down.
5. **Scenario 6, the run's shape.**
   - The key leaves out the merged-diff review, which the script starts beside the gate. The gate's call is started and then the review is awaited (`coordinator/climb-batch-workflow.js:1950-1954`).
   - Whether the review's `result` is in the journal decides whether it runs again. A stopped review leaves uncommitted corrections in the same tree. Any change to the gate's prompt also makes the review run again.
   - So "a linear tail (gather, gate, commit)" should read gather, gate beside review, commit.
   - The resumed gate is attempt 1 and gets none of `recoverGate()`'s takeover text (`:1680`, `retry = attempt > 1`). Its step 2 therefore starts a second distance stage into the same scratch, which `run.sh:88` deletes, unless the survivor is stopped or has finished before the resume.
   - Both readers found all of this.
6. **Scenario 1, omission.**
   - The record holds row 665's abstract half behind item 51 and rows 668 and 669: PLAN:139, "Item 51, then row 665's abstract half once rows 668 and 669 are repaired"; `coordinator/CLIMB-BATCH-13.md:51`, `:323`, `:342`.
   - This bears on "which choices are yours". The key's "left to the curator" names Q1 but not that the record's order puts this rung after his answer. Y found it. Not a scoring matter.
7. **Line slips.** Scenario 2: `Functionals.scala:721` is row 686's line at `a1a75716a`; the refusal is at `:733-734` today. Scenario 10: the loader method is `xlationForFunctionOrGeneric` (`InstantiatingClassloader.java:2507-2519`), reached through `xlationForGeneric` (`:2485-2492`).
