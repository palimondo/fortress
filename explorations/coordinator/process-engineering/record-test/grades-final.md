<!-- The record test's third run, 2026-10-13, on the finished consolidation (FACTS and POSITIONS at ab933086b, 361K to 200.6K characters): one Opus reader in that copy, graded blind by Opus against the first run's old-entries answers. X is the finished record, Y the first run's old entries; totals X 30, Y 28 of 30. -->

# Record test 3: grades

I graded blind to the copy. I did not open `arms.txt`, `brief-reader-f.md`, `questions-f.md` or `answers-f.md`.

Each score uses `key.md`'s rubric: decision 0 to 2, sources 0 to 1. I applied the fourteen slips of the two earlier gradings:
- section 5 of `explorations/coordinator/process-engineering/record-test/grades.md`, slips 1 to 7;
- section 5 of `grades-pilot.md` in the same folder, slips 1 to 7.

Where a slip shows the key wrong, no answer was marked down for departing from it. In particular, following the pilot, I did not score the absence of row 541 in scenario 10 (first grading's slip 2).

I checked every claim beyond the key that a score rests on against `/home/user/fortress`: ledger rows with `facts-extract.sh 'ledger:N'`, files with `sed -n` or `grep`. The checks are named inline. Paths are under `explorations/` unless they start with `ProjectFortress/`, `Library/`, `Specification/` or `.claude/`.

"Lookups" counts the items on each answer's "Sources:" line and names the ones that carry weight.

## 1. Scores by scenario

### 1. A rung that repairs row 665

| | decision | sources |
|---|---|---|
| X | 2 | 1 |
| Y | 2 | 1 |

- **X, decision 2.**
  - Promotes both `XXXAbstractMethodUndefinedGeneric*Walk` tests and sees them red first.
  - Places the gap at `Constructor.java:263`, where `declared` is false for a `GenericTypeInstance`, and `checkForDef` (`:425-431`). Puts the new check at the declaration through `symbolicInstance` (`BuildEnvironments.java:1058`), beside `checkGenericOverrides` (`:592`, `:895-897`; `ComponentWrapper.java:186`). All checked.
  - Keeps `definedBelow`, so row 666 and `PairsRunRangesWalk` are untouched.
  - Names row 668's `SeededRandomGenWithDistribution` (`Random.fss:171`, `:88`, `:99`; checked against row 668) and repairs it test first as a point to report, after the trait's contract and the object's own forwarding shape.
  - Finds row 667 fixed.
  - Lists the seven tests that import `Random` or `QuickCheck`. Checked by grep: exactly those seven.
  - Names the record's order, "Item 51, then row 665's abstract half once rows 668 and 669 are repaired" (PLAN:139, checked), and argues why the rung can go ahead without crossing item 51. That is the pilot's slip 6, beyond the key.
  - Its step 0, a logging build run over `testSystem` before the test, follows the batch 12 precedent (`rung-walk-load-checks/REPORT.md` § 13 and § 4, checked). It measures the new check's reach, not the base, so it is not the key's "suite run to check the base".
  - The `boundsUnread` guard comes from row 693 (checked).
- **X, sources 1.** The rung report, row 665 and rows 666 to 670 and 693, the batch 13 override report, `Random.fss`, `Pairs.fss`, the code lines, PLAN, `CLIMB-BATCH-13.md` and the review queue.
- **Y, decision 2.**
  - Promotes the same two tests.
  - Places the gap at the same code lines (`Constructor.java:263`, `:431`; `BuildEnvironments.java:591-592`; `ComponentWrapper.java:183-187`; `symbolicInstance` `:1058-1081`). Derives that a check made at an instance could never fire for these programs.
  - Keeps `definedBelow` (`Constructor.java:468-486`) with `PairsRunRangesWalk`.
  - Row 667 fixed. Row 668's object repaired test first, with `reseed` returning `self`.
  - Row 669 left to the allowance, to be decided by a run.
  - R10's demos. The curator's choices listed.
  - One wrong citation, not load-bearing: the `override` half was fixed by `efd6bb2f2`, not `8803d2f45` (as the first grading found for the same sentence).
- **Y, sources 1.** Row 665's notes for what the fix meets; rows 666 to 669; the code; the library files; PLAN:318-330. Y cites the code itself rather than the rung report, which is an equivalent source for the place.
- **Lookups.**
  - X made 17. The rung report whole; the override report; rows 647, 649, 653, 665 to 670 and 693; `Constructor.java`, `BuildEnvironments.java` and `ComponentWrapper.java`; `Random.fss`, `Pairs.fss`, `QuickCheck.fss` and a `simpleJoin` grep; the model's views; PLAN, `CLIMB-BATCH-13.md` and the review queue; the workflow script and the stage drivers; `changes.tex`; seven skill parts.
  - Y made 14. FACTS:145; rows 665 to 669, 628, 647, 649 and 653; the tests listing and four test pairs; the three Java files; `Random.fss`, `QuickCheck.fss`, `IntMap.fss` and `Pairs.fss`; import greps; PLAN:318-330; `tests-writing.md`.

### 2. A rung that repairs row 686

| | decision | sources |
|---|---|---|
| X | 2 | 1 |
| Y | 2 | 1 |

- **X, decision 2.**
  - Promotes `XXXInferCallerTwoBoundsClosedTrait`. Adds a `nat`-sized twin of the library's shape, a sound extra.
  - The site is `:2490`, tsv line 15 (checked), class OT (pilot slip 1).
  - The before is 13b's `distance.txt` (85; `#unit component FortressLibrary 79`; two `#crash decl` rows; all checked), `checker-count.txt` and the per-site list, never re-run (P-110).
  - The after runs once, detached. It is read by `compare.sh` and then by a per-site diff keyed by location and message (row 577).
  - What counts as a change: line 15 gone; an unmasked next error; a new crash. Row 488's 2-to-4 variation does not count.
  - The cause is at `typedApplication` as row 686 places it, "not traced", and not `boundsSubstitution`.
  - Must not break: rung V's bound list, row 688's memo and its exactness test.
  - Limits: `timeout -k 10 900` (`checker-count/run.sh:69`, checked), 387 s and the 17 minutes without the memo; the distance's 2,246 s.
  - Missing, as in every earlier grading: the distance stage's own 5,400 s limit (`tools/distance/run.sh:120`, checked). It changes no step, since the stage runs once in the background.
- **X, sources 1.** Rows 686 to 690 and 488, the rung report, `distance.txt` and the tsv, `run.sh`, `classify.py`, the checker-count driver and the workflow script.
- **Y, decision 2.**
  - The same test and the same site, with the tsv line quoted.
  - The before is the landed tables, with rung M's `git log` check of the base.
  - The after: once under `nohup`, then `compare.sh`, then a per-site comparison.
  - Three bins for a new row: unmasked, caused, variation.
  - The cause is at `typedApplication` (`Functionals.scala:733-735` today, checked; `:721` at `a1a75716a`, pilot slip 7), not `boundsSubstitution`.
  - The memo is kept on. Costs: 13 to 24 minutes in a rung's tree (`climb-batch-workflow.js:734`, checked), 2,246 s at 13b, 900 s against 387 s (`climb-batch-13b/RECORD.md:47`, checked).
  - Missing: the 5,400 s limit, as X.
- **Y, sources 1.** Rows 684 and 686 to 690; the tsv; `distance.txt` and `RECORD.md`; the Scala files; `batch-13-review.md`; POSITIONS:110; the workflow script; four rung reports.
- **Lookups.**
  - X made 10. FACTS and POSITIONS (11 entries); rows 488 and 686 to 690; `FortressLibrary.fss:2478-2496`; the test and its siblings; the rung report (§§ 1, 4, 7, 9); `distance.txt` and the tsv; `run.sh`, `classify.py` and the count driver; the workflow script; the Scala files by grep; four skill parts.
  - Y made 13. Rows 684 and 686 to 690; the tsv; `distance.txt` and `RECORD.md:33-60`; the library; `TypeSchemaAnalyzer.scala`, `Functionals.scala` and `Formula.scala`; five tests; PLAN:122-130; `batch-13-review.md`; POSITIONS:110; the workflow script; four rung reports and a skeptic.

### 3. Two refusals while a rung's tests are written

| | decision | sources |
|---|---|---|
| X | 2 | 1 |
| Y | 2 | 1 |

- **X, decision 2.**
  - Row 455 for the compiled line. `XXXInferContextDrops.fss:10` is the same `b07` (checked). Its retry is P-51, decided and not built.
  - Row 510 for the walk line, gated by `XXXInferExpectedTypeRungK.fss:20-22` (checked).
  - The static argument written in both twins. No row opened, no `XXX` test added, nothing asked.
  - It cites the curator's word on row 510, beyond the key: "His word of 09-29 14:07: walk is not touched until the switch-over gives it types" (`review-queue.md:952`, checked; home PLAN:463).
  - Running the two lines once on the old code is a new run, not a re-run of a recorded result, as the first grading judged the same step.
- **X, sources 1.** Rows 455 and 510 (and 412), P-51, the two test files, `review-queue.md:952`, PLAN:466.
- **Y, decision 2.**
  - The same rows, found by `ledger-find` on the message. The pins are cited at their lines (`:10`; `:20` and `:22`, checked).
  - The retry decided and not built. Row 510's repair "the curator's".
  - The static argument in both twins, with a typed-argument fallback. Nothing opened. The report lines are right.
  - The wording note on row 510 (first grading's slip 5).
- **Y, sources 1.** Rows 455 and 510; two `ledger-find` queries; the two test files and `InferCoercionRungK.fss`. The POSITIONS retry entry is cited inline by its title.
- **Lookups.**
  - X made 6. FACTS and POSITIONS (F-52, F-55, F-56, F-87, P-50, P-51, P-74); rows 412, 455 and 510; the two pins; `review-queue.md:952` and PLAN:466; `tests-writing.md`.
  - Y made 3. Rows 455 and 510 with two finds; the two pins and `InferCoercionRungK.fss`. It says the entries were enough for the mechanism.

### 4. The next batch's rung on the sized arrays

| | decision | sources |
|---|---|---|
| X | 2 | 1 |
| Y | 1 | 1 |

- **X, decision 2.**
  - The before: 13b's `distance.txt` (85, V2 17), the count (1) and the per-site list, never re-run (P-110).
  - The 17 sites by line and list line: 14 parent-trait bodies (tsv 40 to 53) and 3 joins (62, 63, 68). These are exactly the first grading's slip 1 and V2's rule (`classify.py:372-377`, checked).
  - The test: the distance stage, the walk tests that use `Vector` and `Matrix`, and the microGPT walk check, with no model line changed (P-87).
  - The after: once, by `compare.sh`, then by a per-site diff keyed by location and message (row 577). "Read sites, not the class." Row 488's 2-to-4 variation at untouched sites. Crash rows are findings. The count's 900 s against 387 s.
  - The corner, as the worker needs it:
    - two causes, and the library's own way for `fill` and `tabulate` (`FortressLibrary.fsi:1575-1576`, checked);
    - `map[\R\]` and `ivmap[\R\]` cannot answer `Vector[\R\]`;
    - checker rule or `cast` for the 3 joins (`array-forks-now.md:52-59`, checked);
    - **the floor**: the `Array3` crash (`#crash decl TraitDecl FortressLibrary.fss:2887-3000`, row 680; F-54), and that clearing it unhides more;
    - the two-trait bound and rows 686 to 690;
    - rows 678, 679 and 685 are not V2 (first grading's slip 1).
  - For the curator: two problems in two areas; the 3 joins are his; the array design waits for the switch-over (P-85); a pairing hazard with row 680; the cost, about 37 minutes and a 500 s margin.
  - Its suggestion that the worker take a default for `map`/`ivmap` sits beside the record's "Three groups need a list of ways first" (`array-forks-now.md:163`, checked). X quotes that line and offers the choice as "one ask", so it is not a decision taken over him.
  - The rubric's "variation named for V2" is met only in general: X names row 488 but not V2 among the families that vary. Its untouched-sites rule still reads them right, since row 488 is about "declarations it does not touch" (row 488, checked).
  - Missing: the 5,400 s limit, as in scenario 2.
- **X, sources 1.**
  - F-53, F-54, F-90, F-94 and `FACTS-history.md:813`.
  - `distance.txt` (its `#class`, `#crash` and `#seconds` rows) and the tsv; `classify.py`.
  - `array-forks-now.md`, `CLIMB-BATCH-13.md` and `batch-13-review.md`.
  - The library lines; POSITIONS and PLAN; the script and the drivers.
- **Y, decision 1.**
  - Right before (the landed tables, named by commit, no re-run). The same 17 sites by line and by what each calls.
  - The after: once, by `compare.sh` and site by site, with lines mapped through `git diff -U0`.
  - V2 named among the varying families (`rung-exclusion-remainder/REPORT.md` § 9). "Repeated runs of one setup are identical site for site" (row 488, "One build's runs agree site for site", checked).
  - The stale label, no row for the 17, the library's way for `fill` and `tabulate`, `map`/`ivmap` undecided, the 3 joins beside row 683, the times and the 900 s.
  - A sharp note to the curator: three questions, 5 sites buildable now, none of the six forks.
  - What it lacks: the `Array3` crash that makes V2's 17 a floor (row 680; `distance.txt:29`; F-54's "The sized arrays' count is a floor ..."). Y cites both `distance.txt` and `FACTS.md:54` and carries neither crash row into the brief. This is the same answer and the same miss as the first grading's Y.
- **Y, sources 1.** F-54; `distance.txt`; the tsv; `classify.py`; `distance-triage.md`; four rung reports and a skeptic; `RECORD.md`; the library; ledger finds and rows 683 and 685; PLAN; POSITIONS; `batch-13-review.md`; `array-forks-now.md`.
- **Lookups.**
  - X made 14. The coordinator skill; FACTS 53, 54, 90, 94 and the history; `distance.txt`; the tsv; `classify.py`; `FortressLibrary.fss`/`.fsi`; `array-forks-now.md`; `CLIMB-BATCH-13.md`; `batch-13-review.md`; POSITIONS (P-84, P-85, P-87, P-89, P-110); PLAN:122-140; the workflow script; `run.sh` and the count driver; the model's views.
  - Y made 16. FACTS:54; `distance.txt`; the tsv; `classify.py`; `distance-triage.md`; four rung reports and a skeptic; `RECORD.md`; the library and api; five `ledger-find` queries and rows 683 and 685; PLAN; POSITIONS; `batch-13-review.md`; `array-forks-now.md`; `self-typed-bodies-judgement.md`; INDEX; the script.

### 5. Two objections from an outside reader

| | decision | sources |
|---|---|---|
| X | 2 | 1 |
| Y | 2 | 1 |

- **X, decision 2.**
  - Both objections are right on the fact and wrong on the consequence.
  - Paragraph one:
    - the paper bars a method type parameter in an upper bound (p. 11:11);
    - Appendix I states that limit (`changes.tex:1840` and `:2354`, checked);
    - the reason for the decision is the designers' latest word, not the theorem;
    - where `Generator[\T\]` fixes `T` the rule is never solved;
    - walk leaves an unfixed F-bounded parameter open, and the checker gives it no instance (row 425).
  - Paragraph two:
    - the addendum covers ground declarations, `G[\ZZ32\]` included;
    - the specification states the boundary, and the checker is narrower;
    - the checker refuses generic families in the closed-trait case outright (row 546, "refuses the Meet Rule's closed-trait case for a family with static parameters", checked).
  - Nothing to re-decide. Objection 1 is "the caution the POPL recheck already gave you", which is known evidence. Objection 2 is review item 58 (`review-queue.md:384-386`, checked; row 543).
  - P1's matter is named by PLAN:107; row 551 is not named.
- **X, sources 1.** The recheck, the addendum, `changes.tex`, rows 425, 543, 546 and 551, the review queue, PLAN:107, rung C's decision record (§ 6, "The 2019 proof and what rests on the 2011 rules", checked at `:67-69`).
- **Y, decision 2.**
  - The first objection is right on the paper and wrong on the library. The checker leaves an F-bound out of the meet (row 593), walk leaves it open, and the library writes the static argument.
  - The second is "wrong" in the sense that the text claims no proof for generic families, and Y quotes the revision box. The checker is narrower. No library pair is accepted by coverage.
  - Not new evidence. Nothing to re-decide. Open items: rows 543 and 551 and PLAN:326-327.
  - One wrong claim, not load-bearing (the first grading's finding on the same text): "The specification's dispatch callout does not say that the paper's theorem excludes F-bounded method type parameters". Appendix I says it (`changes.tex:2354`), so its optional item 1 is moot.
- **Y, sources 1.** The recheck; the specification (5 ranges); POSITIONS:78; FACTS 78, 141 and 143; rows 424, 425, 543, 551 and 593; rung C's report § 7; `Functionals.scala`; PLAN:318-330.
- **Lookups.**
  - X made 9. The coordinator skill; P-48, P-60, F-76, F-143 and F-166; the recheck whole; the addendum; `changes.tex` (2 ranges); rows 425, 543, 546 and 551; the review queue; PLAN:107; rung C's decision record. It did not open the extract.
  - Y made 9. The recheck (4 ranges); `inference.tex`, `basic/overloading.tex` and `changes.tex` by grep; `advanced/overloading.tex:670-715`; POSITIONS:78; FACTS 78, 141 and 143; rows 424, 425, 543, 551 and 593; rung C's report § 7; `Functionals.scala`; PLAN:318-330.

### 6. The process stopped in the gate

| | decision | sources |
|---|---|---|
| X | 2 | 1 |
| Y | 2 | 1 |

- **X, decision 2.**
  - The disk first:
    - the kind of stop (F-202, checked);
    - the journal's `launched`, `started` and `result` lines;
    - whether the review beside the gate returned (`climb-batch-workflow.js:1952-1954`, checked; pilot slip 5);
    - `main`'s log, status and stash;
    - surviving processes by `ps` and `/proc/<pid>/cwd`;
    - the gate's logs (`LOG_DIR`, `:597`, checked);
    - `df`.
  - The script edit is kept if it sits only in `commitRole` (`:1576`, checked). If it sits in a shared constant, X resumes from the launched copy with the sentence spliced in. The call order is checked against the journal, with an `agent()` wrapper if needed.
  - Survivors are killed by pid and the gate folder is moved aside. A killed review's edits are stashed (the 6.5b precedent).
  - Then `resumeFromRunId` with the launch arguments byte for byte, and a watch for a second `started`.
  - Runs again: the gate, the review only if it had no result, then the commit. Not done: relaunch, a new session, a short hash, a changed gate prompt (it precedes the review), a hand-run gate.
  - The leftovers:
    - the second distance stage that `run.sh:88-90` would wipe;
    - a live suite under `rm -rf TEST-RESULTS`;
    - **step 3's ladder copies**: `cp -a default_repository/caches` into an existing `ladder-caches` would nest, which the key's "overwritten" misses (section 5, item 1);
    - cut-off logs.
  - One slip outside the rubric: "Make the git-check hook a no-op again". Only the curator can do that, in manual mode (`.claude/skills/coordinator/SKILL.md:203`; `cloud-container/references/hooks.md:29`). It does not touch the run's recovery.
- **X, sources 1.** F-201 and F-202; `agents.md:55-90`; `session.md`; the workflow script and its document; `run.sh:80-90`; `gate.md`; `climb-batch-6.5b/RECORD.md:7`; `workflow-scenarios.js`.
- **Y, decision 2.**
  - The same disk-first order.
  - The script diff, with the sentence required to sit in the commit role only, not in `MAIN_TREE_ROLE`, `head()` or `BATCH_INTRO`; the call-order wrapper.
  - The review handled both ways:
    - Its result is cached: keep the gate's prompt, stop the survivors by pid, move the folders aside.
    - It is not cached: give the gate the script's own takeover text, which only a retry gets (`recoverGate`).
  - The resumed first attempt's second distance stage is named (pilot slip 5).
  - Resume in this session. Watch the journal. The leftovers and the not-done list are right.
- **Y, sources 1.** The workflow script (4 ranges), `agents.md:40-100`, `session.md:22-60`. The script stands for `climb-batch-workflow.md` as the source of the gate's steps.
- **Lookups.**
  - X made 10. F-201 and F-202; the coordinator skill and `delegating.md`; `agents.md`; `session.md`; the workflow script (7 places); the workflow document; `run.sh:80-90`; `gate.md`; the 6.5b record; `workflow-scenarios.js`.
  - Y made 3. The workflow script (4 ranges); `agents.md:40-100`; `session.md:22-60`. It says the entry was enough for the journal's form and the resume cache.

### 7. What C4 still fails on after decision D

| | decision | sources |
|---|---|---|
| X | 2 | 1 |
| Y | 2 | 1 |

- **X, decision 2.**
  - 14, a floor, measured on 2026-09-29 at `6bc21c364` (`array-design-ways.md:13`, `:31`, `:54`, checked).
  - The parts:
    - 5 powers, row 533's tie, refused since rung I (`8dc1a74d9`), "a product of our conversion rules, not of a numeral's type";
    - 3 `DOT`s on E3's dead sizes;
    - the `adam` bridge as fork 3's. The record is two-handed here; pilot slip 4, not scored.
    - `numbersOf`;
    - four old items, named "such as" without the wrong `view`.
  - Behind the 14: row 474's tuple bindings, the split copy's 18, powers that end their blocks, and 7 on the fuller copy with the second bridge and row 475. All checked at `array-design-ways.md:57`. Its "arrays at least 6 of the 18" is a fair reading of that line.
  - Dated: batch 8's `IntLiteral` and row 533's "not measured since"; 13b's bound (`749ec523e`, PLAN:136, checked); the distance then 627 (`:31`, checked).
  - It found that `reviews/decision-d-diff/` is not in the tree, as the first grading noted.
  - One new measurement is offered as his choice, and D1 can be taken on its form now.
  - Missing from the key's answer, not its rubric: the two planted errors.
- **X, sources 1.** Rows 474 and 533; `array-design-ways.md:1-97`; `decision-d-diff.md`; F-35, P-40 and P-87; a `find` for the captures; PLAN and INDEX; `distance.txt` and the tsv.
- **Y, decision 2.**
  - The same 14, with the `DOT`s' functions; the bridge's device as `cast` (`array-fork3-judgement.md:72`); the powers by row 533, "none is a numeral missing a conversion".
  - The counts' move from 24 to 26 and from 12 to 14.
  - The right four small items, `matShape` among them (pilot slip 3).
  - The floor: row 474; 18; 14; 7; the planted errors; the `Character` crashes of 09-27, since fixed (row 477).
  - The date and row 533's caveat; one new measurement offered as his; C4 on the compiler's own prelude as a separate matter.
  - It calls F-58's headline contradicted by its body and says it "should be corrected", but takes no step on it. The first grading judged the same.
- **Y, sources 1.** F-58; `array-design-ways.md` §§ 1-2; `decision-d-diff.md` §§ 5-6; `numerics-plan-fable.md` § 3.6; rows 175, 474, 475, 477 and 533; `array-fork3-judgement.md`; PLAN; `microgpt-phase.md`; the tsv. It also cites `measure/d.own.txt`, which is not in the tree; the note that names it is the real source.
- **Lookups.**
  - X made 9. The coordinator skill; F-35 and F-58; rows 474 and 533; P-40 and P-87; `array-design-ways.md:1-97`; `decision-d-diff.md`; a `find` for the patch and captures; INDEX and PLAN:130-144; `distance.txt` and the tsv.
  - Y made 9. FACTS:58 and a grep; `array-design-ways.md`; `decision-d-diff.md:180-215`; `numerics-plan-fable.md`; rows 175, 474, 475, 477 and 533; `array-fork3-judgement.md`; PLAN; `microgpt-phase.md`; the tsv.

### 8. A worker's finding on the coverage typing

| | decision | sources |
|---|---|---|
| X | 2 | 1 |
| Y | 2 | 1 |

- **X, decision 2.**
  - Row 543, `deliberate (checker)`, its pin the worker's shape.
  - `groundFamily` at `Functionals.scala:701` (checked).
  - The specification is right: Appendix I lists the departure, "it types such a call by the intersection only in a family none of whose declarations has static parameters ... (row 543)" (`changes.tex:2811-2814`, checked).
  - The judge's D6 (`JUDGE.md:59`, checked), on his list as item 58.
  - No row, no change to the condition. The test is respelled, and no type is asserted where the head varies. One report line.
  - Nothing new for the curator.
  - The decision-not-taken line on widening is replaced by "item 58 already holds it", which the first grading accepted.
- **X, sources 1.** Rows 543, 546 and 551; rung C's decision record § 4 and `JUDGE.md`; `changes.tex:2800-2822`; the review queue; `Functionals.scala:700-712`.
- **Y, decision 2.**
  - Row 543 with its pin. The specification's boundary is quoted from `advanced/overloading.tex:678-682` and its box. D6 is on his list.
  - No row, no change. The test is respelled. One report line.
  - The literal-shape check (declarations on `L` and `R` themselves) is the first grading's slip 6; it does not change the decision.
- **Y, sources 1.** Rows 487, 540, 543, 547, 551 and 559; the pin and the coverage tests; `Functionals.scala`; the two specification passages; FACTS:175.
- **Lookups.**
  - X made 7. The coordinator skill; P-60 and F-76; rows 543, 546 and 551; the decision record and `JUDGE.md`; `changes.tex`; the review queue; `Functionals.scala`.
  - Y made 6. Rows 487, 540, 543, 547, 551 and 559; the pin; three coverage tests and the listing; `Functionals.scala`; `advanced/overloading.tex` and `types-vals-vars.tex`; FACTS:175.

### 9. Where the instance rule stands, path by path

| | decision | sources |
|---|---|---|
| X | 2 | 1 |
| Y | 1 | 1 |

- **X, decision 2.**
  - **The checker** is in force (F-78, `InferResultOnly*`, `InferContextKeepsFit`). Its departures:
    - row 455, decided (P-51) and not built;
    - row 425's big-operator forms (accepted by the first grading's slip 3);
    - row 442 on the compiler's prelude (`XXXInferPromoteNN32`, "Closes at the switch-over"; checked);
    - row 559, the run time's, on phase 5's list.
  - Under row 455, X files `XXXInferLoneUnionClosedTrait`. Its program is `k(pk0(Tri, Sq))`, a call written as another call's argument (checked), so that filing is right too (section 5, item 3).
  - **The dispatcher** is not in force: `OverloadSet.java:2048`; rows 538 and 496 with their three tests; phase 5. The aside on row 537 cites P-46, whose subject is something else. It is not load-bearing.
  - **Walk** is in force for the plain case.
    - Row 510 is "by your word of 09-29" (`review-queue.md:952`, checked).
    - By his decision: the open F-bounded parameter (P1, way 11; F-143; `UnwrittenReductionWalk`), with item 19 and row 663.
    - By the rung's decisions: D2 (rows 645 and 662 "with it", as PLAN:140 files them), D3 (row 592, `XXXInferThroughBoundWalk`) and D5.
    - As defects, with tests: rows 587, 589, 591 and 616.
  - **The specification** states the rule, with its callouts and with Appendix I's reasons. The cases it does not yet describe are at `inference.tex:263-279`.
  - **The library** is back to the team's declarations. F-70 and F-84 are checked, and so are the six `extends Any` at `FortressLibrary.fsi:24-52`. What the rule still refuses: `BIG MIN` at `:4236` and `:4242`, row 425 (first grading's slip 3).
  - No stale claim: nothing on row 516's expected failures, and nothing on `MatchFailure`.
  - The flaw: row 612 is written under D5, "(with row 612; `XXXInferAboveBoundMentionsParamWalk`)", and D5's own test (`tests/InferLoneBoundMentionsParamWalk.fss`, checked) is not named.
    - Row 612's class is `implementation gap (walk)` (checked), so it is a defect.
    - The record itself files it "beside D5's reach", "listed for his review", "Default: the landed departure" (PLAN:605, :140, :647, checked). X's grouping copies that.
    - Every departure is placed with its row and its test. So I count this as a blur within a sorting that is otherwise right, not as the rubric's "sorting missing". It is the closest call in this grading.
- **X, sources 1.**
  - FACTS 78, 141 and 175 and the other entries.
  - Rows 424, 425, 442, 455, 496, 510, 538, 541 and 559. Rows 587, 589, 591, 592, 612 and 616 are named with their tests in the text, through F-141 and PLAN:600-612; they are not on the row list. The first grading accepted the same.
  - PLAN:600-612 for D2, D5 and row 612.
  - The library files.
- **Y, decision 1.**
  - **The checker** is in force, with row 535 read as the rule's own answer. Its departures are sorted: rows 425 and 455 as defects, row 593's omission of an F-bound from the meet, row 412.
  - **The dispatcher** is not in force: `:2048`, rows 538 and 496, phase 5 (PLAN:163); row 559 the run time's (PLAN:564).
  - **The specification**, with its two listed departures from the paper.
  - **The library** back, with nothing refused at `fail` or `builtinPrimitive`. No stale claim.
  - What it lacks is the decision-or-defect sort that the curator asked for:
    - row 592 is filed under "Defects, pinned", though its class is `deliberate (walk)` (checked) and FACTS 141 names it D3;
    - D5 is not mentioned at all.
  - Smaller slips: rows 558 and 567 counted as the rule's walk rows. The scenario 5 claim, that the text is silent on the F-bound exclusion, is repeated.
  - The first grading gave the same answer the same score.
- **Y, sources 1.** FACTS 78, 84, 141, 143 and 175; fifteen rows; test listings; the specification; PLAN (5 places); the recheck; the library files; the tsv; `OverloadSet.java` and `Formula.scala`.
- **Lookups.**
  - X made 11. The coordinator skill; P-46, P-48, P-49 and P-79, with F-56, F-70, F-78, F-84, F-141, F-143, F-166, F-173 and F-175; rows 424, 425, 442, 455, 496, 510, 538, 541 and 559; PLAN:107 and :600-612; the review queue; `inference.tex` (3 ranges); `changes.tex`; the recheck; the library greps; the tsv; the result-bounds report.
  - Y made 10. FACTS 78, 84, 141, 143 and 175; fifteen rows; test listings; `XXXInferLoneUnionClosedTrait`; `inference.tex` and `overloading.tex`; PLAN (5 places); `popl-recheck.md:65`; the library files; the tsv; `OverloadSet.java` and `Formula.scala`.

### 10. A rung on row 559, and the shorter way

| | decision | sources |
|---|---|---|
| X | 2 | 1 |
| Y | 2 | 1 |

- **X, decision 2.**
  - **The first half** of (b) reverses P-60. It is written in POSITIONS, in Appendix I (`changes.tex:2805-2810`, checked) and in F-76. Why it was taken: the addendum, and the head of the sort, which follows declaration order and flips between compile and link (rung C's decision record § 4). It survives only as row 543's scope.
  - **The second half** reverses P-48. It is written in `inference.tex:99-118`, Appendix I and F-78. Why it was taken: the POPL 2019 rule. `A` alone drops the expected type, `B` alone breaks the bound, and the base's `BottomType` (`killIvars`) is forbidden and once failed JVM verification (row 447, checked).
  - (b) is not a repair: it changes the rules the tests test.
  - **Way (a)**, after the union's precedent (`InstantiatingClassloader.java:276-277`, `:1902`, `:2336`; `Naming.java:848-850`, `:1193`; `MethodInstantiater.java:111`; `NamingCzar.java:1295-1328`; all checked). The loader has no `Intersection` case and fails at `:2519`.
  - Tests first. Route 3 checked.
  - **The fallback**: stop, keep the `XXX` tests, land nothing that does not stand alone, and report as a decision not taken with both ways.
  - Neither row 541 (not scored, slip 2) nor the first test's two bindings (slip 2's stronger argument) is used.
- **X, sources 1.** P-48, P-60, F-76 and F-78; rows 408, 540, 541, 543 and 559 (559 places the repair: "The run time has no class for an intersection type", checked); the test files; the run time's files; the specification; rung C's decision record § 4; the recheck § 1.8.
- **Y, decision 2.**
  - Both halves are traced to their decisions by title. Why each was taken: for the first, the addendum's three points, with the row 492 fallback declined; for the second, the paper and his trust in the later work.
  - The first test's two bindings show that (b)'s first half cannot pass it as written (slip 2). Each variant of the second half fails.
  - The record places the repair in the run time (PLAN:564). (a) is taken after `instantiateUnion`'s form, with the name already made.
  - The fallback is a decision not taken. (b) goes only on his explicit word.
  - Row 541 is not named (not scored). Walk is not mentioned.
- **Y, sources 1.** The test files; rows 540, 543 and 559; PLAN:166 and :564; the run time's files; the two specification chapters; `Functionals.scala`; POSITIONS 48 and 60 by title.
- **Lookups.**
  - X made 10. The entries with P-48, P-60 and F-173; rows 408, 540, 541, 543 and 559; five test files; `InstantiatingClassloader.java` (4 ranges), `MethodInstantiater.java` and `Naming.java`; `NamingCzar.java`; `changes.tex` and `inference.tex`; the decision record § 4; the recheck § 1.8; three skill parts; the workflow script.
  - Y made 8. Six test files; rows 540, 543 and 559; PLAN:166 and :564; `InstantiatingClassloader.java` (4 ranges); `Naming.java` and `NamingCzar.java`; the two specification chapters; `Functionals.scala`; the entries and POSITIONS 48.

## 2. Where one answer scores lower

- **Scenario 4, Y (1 against X's 2).**
  - What Y lacked: the `Array3` crash that makes V2's 17 a floor. It is the second `#crash decl` row of `climb-batch-13b/gate/distance.txt` (line 29), "TraitDecl FortressLibrary.fss:2887:1-3000:2 ... TryChecker returned an untyped expr ... :2923" (row 680). It hides the rank-3 trait's body, two calls with a run-time size among them (`:2955`, `:2966`; PLAN:138).
  - The cause: Y's own error, with the fact in hand. Y cites `distance.txt` (for `:19`) and `FACTS.md:54`. On `main`, F-54 reads "The sized arrays' count is a floor: a checker crash hides the rank-3 array trait's body (row 680)", and the pilot found the same entry text in both copies (pilot slip 2). Under the old text, FACTS 53 held it too.
- **Scenario 9, Y (1 against X's 2).**
  - What Y lacked: the curator's question "decision of mine or a defect" answered for walk.
    - Row 592 is filed as a defect, but its ledger class is `deliberate (walk)`, decision D3.
    - Decision D5 is left out (a lone parameter whose bound mentions a static parameter keeps the arguments' narrowest named common supertype; `tests/InferLoneBoundMentionsParamWalk.fss`; PLAN:604).
  - The cause: Y's own error, with the fact in hand. Y cites `FACTS.md:141`, which names D3 and D5 in either text (the key's fact table). Row 592's class is one `ledger:592` away; Y read rows 591 and 612 beside it but not 592.
  - X's own blur in the same scenario (row 612 filed beside D5) has a different cause: it follows the record's PLAN:605. It did not lower X's score; the call is noted under scenario 9.
- Equal scores with different misses (for the record, not a lower score):
  - **Scenario 3.** Only X found the curator's word on row 510 (`review-queue.md:952`).
  - **Scenario 6.** Only X found that step 3's ladder copies nest on a second `cp -a`. Only Y gave the gate the script's own takeover text in the branch where the review had not returned. X added a hook step that only the curator can take.
  - **Scenario 7.** X named three of the four small items ("such as"). Only Y gave the planted errors and `matShape`.
  - **Scenario 10.** Only Y showed that (b)'s first half fails the first test as written. Only X gave the head of the sort's flip between compile and link.

## 3. Totals

| | decision | sources | total |
|---|---|---|---|
| X | 20 | 10 | 30 |
| Y | 18 | 10 | 28 |

By scenario (decision/sources):
- X: 2/1, 2/1, 2/1, 2/1, 2/1, 2/1, 2/1, 2/1, 2/1, 2/1.
- Y: 2/1, 2/1, 2/1, 1/1, 2/1, 2/1, 2/1, 2/1, 1/1, 2/1.

Lookups, counted from the "Sources:" lines:
- X: 17, 10, 6, 14, 9, 10, 9, 7, 11, 10 (103).
- Y: 14, 13, 3, 16, 9, 3, 9, 6, 10, 8 (91).

## 4. The entries, one by one

- **FACTS 145 (scenario 1).** Neither decided worse. Both found the check's place in `Constructor`, the stand-in precedent, `definedBelow` with `Pairs`, row 667 fixed and row 668's object. X also found PLAN:139's order.
- **FACTS 94 (scenarios 2 and 4).** Neither decided worse because of it.
  - Scenario 2: both reached the bound's cost (900 s, 387 s, 17 minutes) and rows 686 to 690.
  - Scenario 4: both told the worker that the two-trait bound sits under any new declaration.
  - Neither entry text holds the distance stage's 5,400 s limit, which neither reader gave. It changed no step.
- **FACTS 53 (scenarios 2 and 4).** Scenario 2: neither decided worse. Scenario 4: Y decided worse (the floor missing), but not because of this entry: the fact was in F-54 and in `distance.txt`, both of which Y cited. If Y's FACTS 53 was the text without the crash row, the one fact that would have prevented the miss is: "V2's 17 is a floor: the distance table's second `#crash` row, `TryChecker` at `Array3`'s `plane(k)` (`FortressLibrary.fss:2923`, row 680), hides the rank-3 trait's body, two calls with a run-time size among them (`:2955`, `:2966`)."
- **FACTS 55 and FACTS 87 (scenario 3).** Neither decided worse. Both found rows 455 and 510, their pins at the same lines, and P-51's retry as decided and not built.
- **POSITIONS 48 (scenario 5).** Neither decided worse. Both gave the decision's reason as the type group's later word, not the theorem.
- **FACTS 166 (scenario 5).** Neither decided worse. Both reached `popl-recheck.md` for "known at the decision".
- **POSITIONS 60 (scenarios 5 and 8).** Neither decided worse. Both stated the specification's boundary against the checker's narrower `groundFamily` (row 543), and both reached the addendum or the specification for it.
- **FACTS 201 (scenario 6).** Neither decided worse. Both reached `agents.md`'s prefix rule and the script's own call order, the review beside the gate and the resumed gate's second distance stage.
- **FACTS 58 (scenario 7).** Neither decided worse. Both gave the 14's parts with row 533's tie, the floor by row 474 with the diagnostic counts, the date and row 533's "not measured since". Y's call to correct the headline came from reading it against the body, not from a missing fact.
- **POSITIONS 48 (scenario 9, with FACTS 78, 141 and 175 in the copy).** Y decided worse on walk's sorting, and not because of what POSITIONS 48 held: in either text it routes to F-141, which Y cited and which names D3 and D5. X's blur of row 612 came from PLAN:605, not from the entry. The one fact that would have prevented both: "Walk's departures by decision are the open F-bounded parameter (F-143), D2 (no test), D3 (row 592, `deliberate (walk)`, `XXXInferThroughBoundWalk`) and D5 (`InferLoneBoundMentionsParamWalk`). Its defects are rows 587, 589, 591, 612 and 616, each with its `XXX` test; 612 and 591's from-above form are also listed for his review, with the landed departure as the default." Neither reader repeated the stale row 516 sentence or the false `MatchFailure` one.
- **FACTS 78 and FACTS 76 (scenario 10).** Neither decided worse. Both traced the two halves of (b) to POSITIONS 48 and 60 with their reasons, both took (a) at the class loader, and both made the fallback a decision not taken.

## 5. What I found wrong in the key

The fourteen earlier slips stand and were applied: the first grading's 1 to 7 and the pilot's 1 to 7. These are new.

1. **Scenario 6, "its own leftovers under `tmp/gate-batch-14/` ... are overwritten".**
   - Not for step 3's ladder copies. The gate's step 3 reads "mkdir -p LOG_DIR/ladder/root, then cp -a default_repository/caches to LOG_DIR/ladder/root/ladder-caches and to LOG_DIR/ladder/root/pristine" (`coordinator/climb-batch-workflow.js`, `gateRole`, the line after `:1314`).
   - `cp -a SRC DIR`, with `DIR` already present from the stopped gate, copies into `DIR/caches`. The ladder regression would then read the stopped gate's copies.
   - Moving the gate's folder aside before the resume, which both readers do, avoids it. X named it.
2. **Scenario 3, "Its repair is open and 'whether and when is the curator's' (row 510's notes), with no decision in POSITIONS".**
   - True of POSITIONS. But the review queue holds his word on it, as a struck item: "Walk carrying the expected type into a generic call (rows 510, 21, 364). His word of 09-29 14:07: walk is not touched until the switch-over gives it types. Home: PLAN:463" (`coordinator/review-queue.md:952`).
   - So the question is answered for now, not open. X cited it. It changes no score, since neither reader asks.
3. **Scenario 9, `XXXInferLoneUnionClosedTrait` as "the refusal ... (row 535, a static error passing as expected)" among the rule's own tests.**
   - Its program is `k(pk0(Tri, Sq))`, with `k(b: BoxT[\Fig\])` (`compiler_tests/XXXInferLoneUnionClosedTrait.fss`): a call written as another call's argument.
   - Its refusal at `BoxT[\Any\]` is therefore also row 455's context. P-51's retry against `k`'s parameter type would give `T = Fig`.
   - X filing it under row 455 is not an error.
4. **Scenario 9, the clean split "defects (587, 589, 591, 612)" against "decisions (the open type, D2, D3, D5)".**
   - The record files row 612 "beside D5's reach", "listed for his review", "Default: the landed departure" (PLAN:605; also :140, "rows 612 and 616 on D5's and row 591's entries", and :647). Its ledger class is `implementation gap (walk)`.
   - PLAN:140 likewise puts rows 645 and 662 "on D2's entry", while both rows' notes tie them to the open F-bounded parameter (row 424's fix).
   - A grader should allow an answer that reports 612 as a defect listed with D5 for his review. The key's split does not.
