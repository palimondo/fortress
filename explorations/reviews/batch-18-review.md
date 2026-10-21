<!-- The combined post-batch review of climb batch 18 (run wf_f345f475-9ae, base db8fecd22, 00:46 to 04:42 UTC on 2026-10-18, landed at e51759f57: rungs X 372b9bf6a, K 396e4ed8d, W 5262a2412, the closes 2b7badde8, the gather record 632f73d60, the review's corrections 7d6c65881, the judge's ruling on the merged-diff review 53ee5dc29 and its repair 5b11849c6), owed at the landing and skipped, written on 2026-10-19 as item 1 of D.2 of `coordinator/postmortem-2026-10-19-haiku/fable-judgement.md`, in the form of reviews/batch-16-review.md, by a review worker reading only, against main at 1b1cc94d8 (the landing's routing 9332e8ec0 to 33459f054, and the coordinator's record fixes of 22:23 to 22:40 UTC on 2026-10-19, which touch no item of batch 18; nothing under .claude/ changed since 0707ac9ac). The measures are batch-measures.py's and spend.py's on batches 14 to 18 and transcript-study/skill-load.py's on 17 and 18; the per-site list was compared at 65c0cc463 and e51759f57 with git diff. Tokens are writes only (input plus cache creation, one count per message id). -->

# Climb batch 18: conformance, the count, the cost, the practice, and routing

## What came up in this run

### 1. The count 30 and the distance 34, row by row

**As the record read them.** The record expected the distance 34 and the count 30 "by reading", rung X's one site, and declared neither (`coordinator/CLIMB-BATCH-18.md:24`, P-39). The gate read `COUNT DOWN   31 -> 30, declared none` and `DISTANCE DOWN   35 -> 34 (-1)` (`compile-ladder/climb-batch-18/gate/summary.txt:118`, `:125`), on both of its runs: on `632f73d60` before the review's repair, and on `5b11849c6` after it (the run's result, `result.gate` and `result.gateAfterReview`).

**Each moved row of the gate's tables, tied to a rung edit:**
- `checker-count.txt`: `#total 31` to `30` and `#locations 30` to `29`. Every api row stays 0, and `#crash none` (`gate/checker-count.txt:1-18`). The one error gone is `Library/FortressLibrary.fss:2063`, `LexicographicOrder`'s `a CMP b`: rung X bounded the element, `E extends StandardTotalOrder[\E\]` (`Library/FortressLibrary.fss:2058`, `.fsi:1344`), and put `List`'s entry under that condition (`Library/List.fss:106-107`, `List.fsi:67-68`), in `372b9bf6a`.
- `distance.txt`: `kind typecheck 32 -> 31`, `class G1 1 -> 0`, `unit component FortressLibrary 33 -> 32` (`summary.txt:125-128`). The same site, the same edit.
- No row moved by rung K: its own trees read '#total 31' and 'DISTANCE SAME 35', and its skeptic's tables equal the worker's (`compile-ladder/climb-batch-18/RECORD.md:191`). Rung W changes only walk's evaluator, tests and the specification, which neither stage reads (`compile-ladder/rung-walk-trait-method-bounds/SKEPTIC.md` section 1, item 1).

**The per-site list** (`compile-ladder/gate/distance-sites.tsv`, `65c0cc463` against `e51759f57`):
- **Gone:** `FortressLibrary.fss:2063`, 'Could not check call to operator CMP ...' (rung X).
- **Came:** none.
- **Moved, the same message:** six sites one line up, `:4394` and `:4395` to `:4393` and `:4394`, `:4369` to `:4368`, `:4375` to `:4374`, `:4541` to `:4540`, `:4557` to `:4556`; ten line references inside the export site's message at `FortressLibrary.fss:12` (`:3787` to `:3786` and nine more). Rung X removed the team's comment "a hack to avoid the error of overloaded methods" at `:3231` (call 8), one line.
- **Moved, the same message:** `List.fss:140` to `:146`. Rung X split `List`'s `extends` line (+1, `:106-107`) and added the element-wise `=` (+5, `:124-128`).

So every moved row is rung X's, and only one error left. The 34 by class: the arrays 17 (class V2), the export errors 3, the other body errors 9, the big operators 2, names the api lacks 2, a filter 1 (`gate/distance.txt:12-17`).

### 2. The stages' times against batch 17's gate

**The figures.**
- The count stage: about 70 s at the first gate (03:42:58 to 03:44:08 UTC) and about 68 s at the second (the run's result). At batch 17's gate it took 76.0 s, 'real 1m16.011s', started at 18:16:43 UTC on 2026-10-17 at load 1.35, 3.38, 3.26 (that gate's transcript).
- The distance stage: 173 s, `FortressLibrary` 122 s, at both gates (the first gate's result; `gate/distance.txt:22-23`, the second's, started at load 0.12). At batch 17's gate, 180 s, `FortressLibrary` 126 s, at load 1.53 (`climb-batch-17/gate/distance.txt:23-24`). Every one of these runs ran beside `testFast`, as the gate runs it.
- The suites: `testFast` 5 min 15 s against 5 min 54 s, `testSystem` 2 min 46 s against 3 min 0 s, `testSpecData` 55 s against 59 s, with more tests (`summary.txt:61-68` in both).

**How far load explains them: all of it.** The batch's code did not change the checker's time.
- The base build, which is batch 17's landed code, took 65.9 s and 66.3 s in the two skeptics' runs (`nice -n 19`, load 0.68 and 0.16 at start, each alone: `rung-checker-where-checks/SKEPTIC.md` section 1; `rung-checker-conditional-extension/SKEPTIC.md` section 1).
- The same base took 75.1 s and 76.4 s in the two workers' runs. Those two ran at once: K launched its base at 00:49:41 and X at 00:49:48 UTC (each worker's transcript).
- The changed code: X's head 67.1 s and K's head 70.7 s, in the skeptics' pairs; the merged code 67.8 s and 68.9 s in the repair's pair, load 0.04 and 0.72, "nothing else running beside either" (`climb-batch-18/REPAIR-review.md`, "The checker's time").
- So the merged tree runs within 2 to 3 s of its base when both run alone. Batch 17's 76 s matches the base's runs that had a second count stage beside them. In batch 17 the same kind of runs took 71 s to 93 s (`reviews/batch-17-review.md`, section 1's table). The difference is load, the neighbour JVMs, and the machine's speed on the day, which differs between sessions (the `cloud-container` skill).
- The distance stage's 7 s (4 %) is one site fewer and the noise of a run beside `testFast`; the two gates' runs, before and after the repair, gave the same 173 s.

**The timed runs overlapped.** Rung X's and rung K's base runs ran at once. X's pass ran at load 8.96, beside K's `testQuick`, and K's change at load 5.66, beside X's (`RECORD.md:179`, `:192`; the transcripts). The curator dropped batch 16's proposed lock for timed runs at 10:28 UTC on 2026-10-17 ("It is basically a smoke test", `coordinator/PLAN-history.md:830-834`), and the skill says so ("A small difference, or one within the noise from run to run, is not a finding", `.claude/skills/fortress-repo/references/compiler.md:135`). So the overlap breaks no rule, and no conclusion of the batch rests on these times; only the skeptics' and the repair's lone runs give the code's time.

### 3. The cost, by role, against the record and batches 14 to 17

`batch-measures.py` and `spend.py` on the five runs. Batch 18 wrote **5.13M over 14 agents**, in 3 h 56 min (00:46 to 04:42 UTC).

| Role | B14 | B15 | B16 | B17 | B18 | B18 share |
|---|---|---|---|---|---|---|
| Rung workers | 1.99M (5) | 1.81M (4) | 2.49M (6) | 2.42M (5) | 1.65M (3) | 32.2% |
| Skeptics | 1.71M (5) | 1.49M (4) | 1.61M (4) | 2.20M (5) | 1.31M (3) | 25.6% |
| Judge, on a rung | 0 | 0 | 170K | 0 | 157K (X) | 3.1% |
| Gather | 460K | 469K | 569K | 587K | 538K | 10.5% |
| Merged-diff review | 399K | 408K | 390K | 426K | 390K | 7.6% |
| Its judge and repair | 0 | 0 | 229K + 269K | 275K + 314K | 238K + 377K | 12.0% |
| Gate | 131K | 130K | 135K | 138K | 156K + 154K (two runs) | 6.1% |
| Commit | 128K | 133K | 152K | 159K | 151K | 2.9% |
| **Total** | **4.82M** | **4.44M** | **6.01M** | **6.52M** | **5.13M** | |
| Agents, rungs | 14, 5 | 12, 4 | 17, 4 | 16, 5 | 14, 3 | |
| Span | 4 h 43 | 5 h 03 | 8 h 31 | 5 h 28 | 3 h 56 | |
| Per rung, all roles | 0.96M | 1.11M | 1.50M | 1.30M | 1.71M | |

**Against the record**, about 4.0M (3.6M with no contested fix, 4.7M with a judge and a repair round; a red gate about 0.5M more) and about 5 hours (`CLIMB-BATCH-18.md:47-50`). The run wrote 1.13M over the middle figure and 0.43M over the top one:
- **The rulings, the repair and the second gate, 0.93M**: X's judge 157K, the review's judge 238K, its repair 377K, the gate run again 154K. The record's top figure allowed about 0.7M for one judge and one repair.
- **Workers, +0.15M** over 1.5M: X 603K against 0.55M, K 573K against 0.55M, W 474K against 0.40M. W took the probe's patch as it was, but rekeyed six tests, added four, and renamed one more branch of messages than its brief named (`rung-walk-trait-method-bounds/REPORT.md` section 10, decision 5).
- **Skeptics, on estimate**: 1.31M against 1.3M (X 488K, K 464K, W 362K).
- **The fixed roles, +0.04M**: gather, review, first gate and commit 1.24M against 1.2M.
- **The time**: 3 h 56 min against about 5 hours, at two agents at once. The tail from the review's judge to the second gate's end took 51 minutes (03:46 to 04:37).

**Against batch 17** (6.52M for five rungs): per rung 1.71M against 1.30M. Without the rulings, the repairs and the second gate, batch 18 wrote 4.20M, 1.40M a rung, and batch 17 5.93M, 1.19M a rung. Per rung, workers and skeptics together: 0.99M, against 0.92M (B17), 1.03M (B16, with its restart), 0.83M (B15) and 0.74M (B14).

**Other measures.**
- **First calls**: 726K (14.2 %), 10 cold, against batch 17's 772K (11.8 %), 9 cold. Cold: rung X, skeptic K, X's judge, and the seven tail agents.
- **Cache refills**: 0, as in batches 14 to 17.
- **Refusal cycles**: one rung, X's judge, 157K (3.1 %).
- **The skill's load** (`skill-load.py`): 483K, 9.4 % (109K of load text and 374K over 126 part reads), against batch 17's 618K, 9.5 % (128K and 490K over 172).
- **Distance sites gone**: 1. **Rows**: 8 closed (634, 748, 749, 750, 753, 771, 765, 766), 9 opened (773 to 781).

Per agent, in order of start (UTC; ids are the transcripts' `agent-<id>.jsonl`):

| Agent | Id | Writes | First call | Messages | Minutes | UTC |
|---|---|---|---|---|---|---|
| Rung X | a08fe346 | 603K | 62K | 214 | 57.7 | 00:46-01:44 |
| Rung K | a0de00ba | 573K | 23K | 207 | 54.9 | 00:46-01:41 |
| Rung W | aa84f5c4 | 474K | 23K | 172 | 42.0 | 01:41-02:23 |
| Skeptic K | ab035fb2 | 464K | 68K | 118 | 34.6 | 01:44-02:18 |
| Skeptic X | afc5cd22 | 488K | 30K | 150 | 37.7 | 02:18-02:56 |
| Skeptic W | aff96b6b | 362K | 28K | 109 | 25.6 | 02:23-02:49 |
| Judge X | a7ce3ea9 | 157K | 58K | 24 | 4.3 | 02:56-03:00 |
| Gather | a3737fb7 | 538K | 73K | 155 | 24.0 | 03:00-03:24 |
| Gate | ae1e6556 | 156K | 55K | 50 | 20.6 | 03:24-03:45 |
| Review | a1bb8938 | 390K | 70K | 110 | 21.0 | 03:24-03:46 |
| Judge, review | aef261f1 | 238K | 62K | 40 | 11.7 | 03:46-03:57 |
| Repair, review | a2164ade | 377K | 60K | 117 | 21.5 | 03:57-04:19 |
| Gate, after the repair | a9f5d097 | 154K | 55K | 45 | 17.8 | 04:19-04:37 |
| Commit | aaa01924 | 151K | 60K | 41 | 5.8 | 04:37-04:42 |

**Beside the run** (`spend.py` on the session's agents): the row 766 probe 245K (19:24 to 19:59 UTC on 2026-10-17), the planner 482K (20:01 to 20:33), the preparation worker 253K (00:25 to 00:46 on 2026-10-18) and the Fable review of the record 314K (00:26 to 00:41): 1.29M. The landing's routing wrote 399K (04:44 to 05:05). This review, the skill writer and the cold reads come after.

### 4. The tail

- **The gather** (538K, 24 minutes) applied X, K and W in that order, by the new order rule (`ac74e11c4`); no rung declared `landsOnlyWith`, and no patch conflicted (`RECORD.md:20-31`). On the merged tree: 61 walk programs, 'OK (61 tests)', and 33 compiled `.test` files, 'OK (34 tests)' (`:35-43`). Its interaction checks found the rungs agree: X's conditional extension lets K's trait-type check accept `SkExtendsAccept`, and row 773 holds beside K's dotted-call check (`:45-47`). It opened rows 773 to 780, closed eight, and folded F-255 to F-257. Eleven of the records' ledger notes were refused (`:140-155`). Rows 779 and 780 went in twice, and the ledger was restored before any commit (`:55`).
- **The merged-diff review** (390K, 21 minutes): one blocking finding in rung X's code, the header checked under every condition, and four record corrections in `7d6c65881` (Part 2).
- **The gate** (156K, 21 minutes), green on `632f73d60`:
  - `testFast` 2,054 tests in 54 suites, the compiler track 1,251 to 1,266;
  - `testSystem` 649 to 656 (162, 168, 162, 164); `testSpecData` 130; the library track 86, the other-compiler track 263;
  - 42 of 42 atomic runs PASS; no ladder or microGPT phase moved;
  - its `# machine` line still reads `FORTRESS_THREADS=1` (`summary.txt:75`), batch 11's finding 8.
- **The review's judge and repair** (238K and 377K, 33 minutes): Part 2. The repair changed `TypeWellFormedChecker.scala`, a path the gate reads, so the whole gate ran again.
- **The gate again** (154K, 18 minutes), green on `5b11849c6`: the compiler track 1,270, the other tables as before (`summary.txt`, the landed copy).
- **The commit** (151K, 6 minutes): the gate's tables landed, F-53 rewritten, the specification's PDF built and committed, the quick microGPT walk check run (below), and the push.

### 5. The microGPT walk check

- **Its lines**: `summary.txt:129-132`: "VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS", "rc=0 secs=44"; "VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS", "rc=0 secs=38". The first pair is `MicroGptAplQuick` and the second `MicroGptFlatQuick`: the commit stage's call at 04:39:36 UTC printed each file's name beside its lines. The summary's lines name no program.
- **Against batch 17**: 47 s and 40 s (`climb-batch-17/gate/summary.txt:137-140`). Both pairs ran the two programs at once from empty caches, with no timed run beside them, at load 0.38 (batch 18, 04:37:31 UTC) and 0.15 (batch 17), by the runs' own headers, which are not committed.
- **Reading**: 3 s and 2 s faster, one run each, not a pair. Nothing in the batch is on microGPT's path by reading: rung W's change reads a declaration's environment for a trait's generic method, and rung X's library change moves no walk value (`RECORD.md:181`). Both programs stay inside P-30's minute, which the first program went past at batch 16 (65 s).

## Part 1. Conformance

### Method

As in `reviews/batch-16-review.md`: each rung's commit, its `REPORT.md` and `SKEPTIC.md`, and for X its `JUDGE.md`; its section of the record, with `coordinator/climb-batch-18-review.md`; the gather's `RECORD.md`, `JUDGE-review.md` and `REPAIR-review.md`; the run's result; and the code on main. Three standards, kept apart:
- the specification;
- the team's built intent and the library's own way;
- the decisions on record: P-151, P-45, P-46, P-48, P-74, P-148, P-152 where it bears, the record's two questions at their defaults, and its calls 1 to 9 (`CLIMB-BATCH-18.md:54-71`).

### The verdicts

- **Rung X, conditional extension in the checker: in the spirit, with two choices where the text and the principles split** (below). P-151's last form is built in the checker, with its member half still open (row 773).
- **Rung K, the `where` conditions where they apply: in the spirit.** Five rows closed; one case left unread with no row.
- **Rung W, a trait's generic method's bounds and the rule's name: in the spirit.** P-46, P-48 and P-74 now hold for a trait's generic dotted method.
- **Two rulings, both upheld**: X's skeptic's contested fix, and the merged-diff review's blocking finding. No rung was refused, and none stopped.

### The two choices where the text and the principles split

**1. Rung X's question 2: a list of partially ordered elements has no order on the checker.**
- What landed: `LexicographicOrder`'s element is bounded by `StandardTotalOrder`, and `List` and `PureList`'s `List` extend it under that condition, one entry. On the checker a list of `RR64`, `QQ` or `Range` values has no `<` and no `CMP` (Appendix I, "Conditional extension", `Specification/appendices/changes.tex:216-228`).
- The text it departs from: a lexicographic order "may be partial or total depending on whether the ordering of the elements is partial or total" (`Specification/advanced-lib/algebraic-constraints.tex:519-522`); lists are compared "when ... their elements support these same comparison operators" (`Specification/basic/operators/opr-overview.tex:293-295`), which is now false on the checker for floats. The record's brief said that sentence holds after the change. X's skeptic found it false and named it in the Effect (`cfed7411b`).
- How the principles split (the Fable judgement, part 2, entries 25 and 29): the team's earlier word is the text above; its later word, the incomplete advanced library, bounds the element of both lexicographic traits by a total order (`Library/incomplete/advanced/Fortress.PartialTotalOrders.fss:117-140`); the live library gave every list an order, and walk still does (row 774). The peers split too: Rust orders a vector partially over `PartialOrd`; Haskell and Scala order a sequence only over a total order; Swift gives arrays none.
- It builds on item 43 (the tuple comparisons' way 1b, his answer pending; `PLAN.md:154`), which the record did not name.
- **Was he told?** In part. The ask of 20:34 UTC on 2026-10-17 (22:34 his time) said "A partially ordered type such as `RR64` gets no order under conditional extension, with one `StandardTotalOrder` entry. That is the default, so you need not decide it", with no word that it departs from the text and none of item 43 (the session's transcript, line 36541; post-mortem part 2, entry 25). His reply at 00:26 UTC on 2026-10-18, "If Fable reviewed it, go for 18" (transcript line 36591), approved the launch with that default inside it. The Fable review of the record called the default right, reading it only through the record (`climb-batch-18-review.md`, section 1, question 2; part 2, entry 27). The landing report of 04:44 UTC did not name it. It is on no review list and in no review-queue item (Part 4).

**2. Judge-review.1: an object's value parameters fall under a conditional extension's condition.**
- What landed: the repair checks an object's value parameters with every condition, with the members (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala:225-229`, `:235`). So a parameter typed only under the condition is accepted, and the object can be made where the condition fails: row 773's hole, made at construction.
- The text: a non-transient value parameter is a field (`Specification/basic/objects.tex:271-272`), and P-151 puts the members under the condition; but the constructor's arrow holds at every instance (`objects.tex:204-206`). Nothing on record settles it (`JUDGE-review.md`, section 6).
- The principles: the team's text points both ways; the peers P-151 names (Swift, Rust, Haskell) put a type's fields outside any conditional conformance, so they point to the header (Fable judgement, part 2, entry 29, whose default is the header, built in the rung that scopes the members).
- **Was he told?** In part. The landing report of 04:44 UTC on 2026-10-18 (06:44 his time) said: "the batch took the default. They are checked with the members, so an object can be made where its condition fails ... it is yours to overrule". It did not say that nothing on record settles it or name the other way. It is on the review list with "Default, taken" (`PLAN.md:481`; review-queue item 177), and P-151's status in POSITIONS now reads "its default taken: with the members" (Part 4).

### Rung X, `372b9bf6a`

**What landed.**
- In the checker: `parents` leaves out an `extends` entry whose `where` clause holds trait constraints only, `conditionalParents` gives it with its conditions at the type's static arguments, and the subtype case of a trait type reads it as a formula beside rung A's reading (`scala_src/types/TypeAnalyzer.scala:290-315`, `:926-969`); `KindEnv.withExtendsConditions` (`scala_src/typechecker/staticenv/KindEnv.scala:179-203`); `Decls`' and `TypeWellFormedChecker`'s trait and object cases, as the skeptic's fix and the repair left them.
- In the library: `LexicographicOrder`'s bound, `List`'s and `PureList`'s entries, `ZeroIndexed[\E\]` written outside the condition, an element-wise `opr =` on `List`, and the comment at `:3231` removed (`RECORD.md:183`).
- In the specification: a revision box in "Where Clauses" (`Specification/basic/trait-parameters.tex:368-391`) and Appendix I's "Conditional extension" (`changes.tex:156-254`).
- Tests: `CondExtendChecker`, `CondExtendInheritedMember`, `XXXCondExtendRefuseChecker`, `XXXCondExtendUnconditionalEntryChecker`, the repair's four, and `XXXConditionalExtensionTypeTestWalk`.

**Standard 1.** The meaning of an `extends` entry's `where` clause was stated nowhere; the grammar only (`Specification-1.0-frozen/basic/traits.tex:83`). The box states it by P-151. Its departures, each stated in the Effect: question 2 (above); members callable where the condition fails (row 773); walk and the compiled run time read the extension at every instance (row 774); the code generator refuses a declaration's own `where` clause (row 701). The front matter's "where clauses and conditional extension" as not supported stays true (`Specification/fortress/preamble.tex:95`).

**Standard 2.** The team meant the checker to read such clauses ("TODO: Extend to handle non-empty where clauses.", `TypeHierarchyChecker.scala:89` at `a874948ac`). The bound follows the team's advanced library. The element-wise `=` copies `LexicographicOrder`'s own body (`FortressLibrary.fss:2067-2069`). The team's sketch of conditional subtyping writes entries under boolean constraints and `where`-clause variables (`Specification-1.0-frozen/appendices/internal-document.tex:483-512`); the rung reads trait constraints only (call 7), and names the sketch in the Effect.

**Standard 3.**
- **P-151**: "is that type only where the condition holds" is built in the subtype relation; "its members are checked under the condition" is built, with row 773's hole, since a member so checked is not scoped to the condition (call 4). The curator's reading of 12:35 UTC on 2026-10-16, "the condition holds inside the declaration while its members and overrides are checked", is built as: the entry itself, the value parameters and the members under the condition; the header and the other entries without it (the skeptic's `bd18b6a47` and the repair).
- **P-151's "add nothing it did not"**: one declaration added, the element-wise `=` on `List` (call 6, the tuple-comparisons judgement's way 3). It keeps a list of pairs' `=` on the checker, which `NumberOrderListDeclarations.fss:48` uses. `PureList`'s `List` did not get it (X.worker.4).
- **Calls 4 to 8**: built as the table below gives.
- **P-148**: base 76.4 s, change 72.4 s, pass 76.5 s; the second pass is a fast path, since the profile showed 0.50 % (`REPORT.md` section 13, decision 4); the skeptic's pair 66.3 s and 67.1 s; tables and masked outputs equal (`RECORD.md:179`).

**Verdict: in the spirit.** Question 2 and judge-review.1 are his.

### Rung K, `396e4ed8d`

**What landed.**
- Row 748: a dotted call's candidate whose `where` clause constrains its trait's or object's parameter is not applicable where the receiver's argument breaks it (`scala_src/typechecker/impls/Functionals.scala:973-1029`).
- Row 749: a `where` clause's own variables are static parameters of the arrow, inferred at the call (`scala_src/useful/STypesUtil.scala:195-221`), and the solver fixes once a size that only the bounds name (`Formula.scala:649-656`, a file beyond the five named, reported).
- Row 750: a trait's or object's own constraint is checked where its type is used (`TypeWellFormedChecker.scala:259-289`).
- Rows 753 and 771: a `comprises` clause's type variable is bounded by its binding and the clause's constraints, at its opening and in the extender check (`TypeHierarchyChecker.scala:318-333`; `TypeAnalyzer.scala:870-875`, `:903-924` with the skeptic's `deabd50f6`).
- Appendix I's "The traits that extend a closed trait", revised (`changes.tex:1585-1600`), and the gather's clause on row 778 (`:1617-1620`).

**Standard 1.** The rows follow "Where Clauses" (`trait-parameters.tex`), the where calculus's invocation rule and witnesses (`Specification/appendices/calculi/where/static.tex:241-257`, `:287-324`, `:399-410`) and "Trait Declarations" for the extender (`Specification/basic/traits.tex`). One departure is left unread without a word: a constraint whose bound names the method's own static parameters or a `where`-clause variable, at a dotted call or at a type's use, is accepted as on the base (`REPORT.md` section 9, decision 4; `SKEPTIC.md`, "The failure-mode question"). It has F-256's sentence and PLAN's line on `where` clauses, and no ledger row. Row 776's placement is the specification's silence; rows 777 and 778 are walk's.

**Standard 2.** The precedents: the fold that already checks a constraint on the declaration's own parameter (`STypesUtil.scala:189-204` at the base), `Functionals.scala:974-978`, `TypeHierarchyChecker.scala:420-421` and `atArgs`. The team's TODO on iterating the solver to a fixed point was respected: one solve, not a loop (decision 6).

**Standard 3.**
- **P-151**, "a method's `where` condition bounds its static parameters", with the coordinator's call on the peers' way (a method's condition on its trait's parameter checked at its calls): built.
- **Call 3**: K took rows 748, 749, 750, 753 and 771, row 753 first.
- **Call 9**: the team's walk test `ProjectFortress/tests/GenericFnWithExcludes.fss:44`, `g(O, P)` with `P` a `Y[\2\]`, is refused by the checker as the text says, and walk runs it as the test expects (`RECORD.md:193`). It follows the text, against the team's own test, which only walk runs. It is in the record's calls, and on no review list.
- **The guard**: no declaration of either library refused; `SumReduction`'s two conditions are reached by no dotted call with a `SumReduction` receiver (`RECORD.md:190`).
- **P-148**: base 75.1 s, change 77.0 s (load 5.66), no pass, since the profile showed no sample in the added code; the skeptic's pair 65.9 s and 70.7 s (`RECORD.md:192`).

**Verdict: in the spirit.** The unread case needs its row.

### Rung W, `5262a2412`

**What landed.**
- Way A, the probe's patch as it was: walk reads a trait's generic method's bounds and coercion targets in the trait's method environment (`interpreter/evaluator/EvaluatorBase.java:491`, `:567`, `:646`, `:651`; `values/GenericMethod.java:106`), and `inferByUnification` keeps the team's read (`EvaluatorBase.java:886`).
- The refusal of a pair read on its declared domains names its rule: "fails the Return Type Rule", "fails the Meet Rule", and the team's "fails because their parameter lists have the same types" (`values/OverloadedFunction.java:817-839`; F-257).
- Two tests promoted, six rekeyed, four new; walk's box in `inference.tex` and Appendix I's "The inference of a call's static arguments" edited (`changes.tex:2268-2270`, `:2278-2288`); the gather's clause on rows 779 and 780 (`:2810-2815`).

**Standard 1.** `inference.tex:81-106`'s narrowest type and its rule that inference never instantiates at `BottomType` hold now for a trait's method; the rules are named as `overloading.tex:531-564` names them. Departures, recorded: rows 779 and 780; the old message for a pair not read on its declared domains (a varargs pair, lengths that differ; `RECORD.md:202`).

**Standard 2.** The team kept the two environments apart ("not yet, it changes overloading semantics", `GenericMethod.java:92`). Way A leaves `getEvalEnv` alone (decision 2), so the separation stands. No team line changed (`git blame db8fecd22`; `RECORD.md:204`).

**Standard 3.** P-46, P-48 and P-74: `Maker.wrap(z, w)` gives `Box[\ZZ64\]` with the `ZZ32` converted, `Maker.make()` gives `Empty[\Number\]`, the same as the object's method and the compiled path (`RECORD.md:200`). P-45: the message no longer names the rule P-45 removed. Item 60's default, way A, and calls 1 and 2 are built. One reach beyond the brief: a generic-beside-plain pair that the parameter check read as "more ... but ... less specific" now gets the rule's name too (decision 5, reported).

**Verdict: in the spirit.**

### P-152, where it bears

No rung touched rows 740 and 741. Rung W's message now calls row 740's pair "fails the Meet Rule" (its note refused, gather.1). The record put P-152's probe after the batch, the third deferral of a probe that needs no go and no answer (Fable judgement, section C, 4). It is now item 2 of D.2.

### The record's questions and calls, against what landed

| Question or call | Rung | Landed |
|---|---|---|
| Q1, item 60: way A | W | Built as the patch; rows 766 and 765 closed |
| Q2: one entry under `StandardTotalOrder` | X | Built; a list of partially ordered elements has no order on the checker; stated in Appendix I |
| 1, way A's two lines as the probe left them | W | Built; `inferByUnification` unchanged |
| 2, the message names the rule | W | Built, and for one branch more (decision 5) |
| 3, conditional extension apart from the four rows, row 753 with K | X, K | Built |
| 4, members checked under the condition, not scoped | X | Built; row 773 |
| 5, walk's half waits | X | Built; row 774, `XXXConditionalExtensionTypeTestWalk` |
| 6, an element-wise `=` on `List` | X | Built on `List`; not on `PureList` (X.worker.4) |
| 7, only a clause of constraints alone is conditional | X | Built, by one predicate (decision 3) |
| 8, the team's comment at `:3232` removed | X | Built (`:3231` on the base) |
| 9, row 749 refuses the team's walk test's `g(O, P)` | K | Built; walk still runs it |

### The global questions

- **Promised against landed.** Closed: X 634; K 748, 749, 750, 753, 771; W 766, 765. Opened: 773 to 780, and 781 by the repair. Count 30, distance 34, as read.
- **The record's premises that failed:**
  - "`opr-overview.tex:293-295` ... holds for the checker after your change" (`CLIMB-BATCH-18.md:160`): false for lists of floats;
  - the brief's "check the declaration with them holding" (`:126`): read whole, it is the defect that the skeptic and the review found in two steps;
  - the cost, about 4.0M: 5.13M;
  - the ruling's contract test, keyed from the base: the base accepts it (row 781).
- **Built twice: no.** The review's check 1.
- **The library's way:** yes for each, with the precedents above.
- **Together:** X and K share `TypeAnalyzer.scala` and `TypeWellFormedChecker.scala` in different declarations, as planned, and meet in K's trait-type check reading X's analyzer. That is the cross-rung face of the blocking finding; the repair gives K's check the header's analyzer, and K's code is unchanged (`JUDGE-review.md` section 4).

### Findings

Ranked by what they cost or risk next, each with its home.

1. **Question 2 is his and is on no list.** It departs from the text and the principles split, he was told it was not his, and no entry or queue item holds it. Row 774, walk's half, still stands in PLAN's item 17 as a batch 19 candidate (`PLAN.md:57`), which would carry the default into walk's values under the standing go (Fable judgement, section C, 1). Home: an entry under "Climb batch 18, listed for his review" and a queue item, with item 43 beside it; row 774's line in item 17 marked held until he answers.
2. **POSITIONS records a default he did not give.** P-151's status says "where an object's value parameters fall under the condition (judge-review.1 of climb batch 18, its default taken: with the members)" (`POSITIONS.md:65`). POSITIONS holds his decisions; the Fable judgement's default is the other way. Home: P-151's "Still to build" names the open question without a default, through `record.py`; item 177 keeps the landed state.
3. **The record's calls 1 to 9 and its "Points the batch lists for you, not questions" have no entry** (`CLIMB-BATCH-18.md:59-79`). This is batch 16's finding 4 again. Home: one entry, "Calls and points of climb batch 18, for his sight", default as landed.
4. **The header defect was seen by reading and passed on.** X's judge noted that the `excludes` and `comprises` clauses were checked under every condition, and neither ruled nor measured it (X.judge.2). It surfaced at the review and cost the review's judge, the repair and a second gate: 0.77M and 51 minutes. Home: the manual, "Judge". Proposed (mine): a judge that finds by reading a defect of the contested fix's own shape, in the rung's own declarations, orders it into a repair round of the rung, test first, before the gather.
5. **K's unread case has no ledger row**: a constraint whose bound names the method's own static parameters or a `where`-clause variable is accepted without a word (decision 4). Home: a row by `ledger.py`, home 3 if no test can hold it.
6. **The skill writer's pass and the cold reads have not run for this batch** (Part 3); batch 17's writer ran before its review, and two of that review's points still stand false in the skill.
7. **Two defaults cannot be carried out.** gather.1 and gather.3 say "Default: the coordinator's hand edit ... it cannot be carried out, since `ledger.py` is the ledger's only writer" (`PLAN.md:490`, `:492`). Review-queue item 165 is in its sixth batch. Proposed (mine): `ledger.py` gains a command that rewrites an open row's claim, with the old claim kept in the history file, as `close --claim` does for a close.
8. **The second gate ran walk's suites again on code that walk runs unchanged.** The repair changed one Scala file of the checker; by the manual's rule the whole gate runs again (`climb-batch-workflow.md:197`). Walk switches the checker off (`fortress-repo` skill, "The phases"), and `testSystem` and `testSpecData` run under walk alone (`SpecDataJUTest.java`, `interpreterPhaseOrder` with the compiled desugaring off), so neither could move; about 4 of the gate's 18 minutes. Proposed (mine): after a repair of the checker alone, the gate runs `testFast`, the atomic runs, the ladder and the two stages.
9. **Item 43's line still gives row 634 as its home** (`PLAN.md:154`), and row 634 is closed; rung X's bound rests on item 43's way. Home: item 43's line, with question 2's entry.
10. **X.skeptic.2, row 775, has no default** (`PLAN.md:487`). Proposed (mine): the row stays open as a candidate of a later checker rung, where item 17 already lists it.
11. **The microGPT lines name no program** (section 5). Proposed (mine): the commit stage's `sed` writes each file's name into its line.

## Part 2. Did the practice hold

### The skeptics' fixes

From the run's result (`result.rungs[].verdict.fixes`), each `SKEPTIC.md`, and the review's `fixesChecked`: 16 fixes in 11 commits, 3 of them defects.

| Rung | Fix commits | Defects | Contested | Test first |
|---|---|---|---|---|
| X | `37f5f8c84` (the report from the journal), `24bafdd04`, `05c6be2e1`, `bd18b6a47`, `cfed7411b`, `2474a30bb` | 2 | `bd18b6a47`, upheld | `CondExtendInheritedMember` red on the worker's head, 'E is not in the kind env [][]', 'Tests run: 2, Failures: 2', then 'OK (19 tests)'; `XXXCondExtendUnconditionalEntryChecker` 'Saw wrong failure', then 'OK (20 tests)' |
| K | `deabd50f6`, `ae1aecdcd` | 1 | none | `OpenTypeWhereSelfBoundChecker` red on the head and on the base, then green (`SKEPTIC.md` F1) |
| W | `b03b77e8b` (the report and record from the journal), `eb5a6a73d`, `f3c031c47` | 0, one new row | none | `XXXGenericTraitFunctionalMethodsNestedWalk` green, then red with the defect removed, then restored (`SKEPTIC.md` section 4) |

- Every fix is sound and stays inside its rung.
- Against the batches before: batch 17 made 18 fix commits with 1 defect (its journal), batch 16 11 with 3, batch 15 17 with 1, batch 14 19 with 2.

### Workers, test first

Each worker's tests failed through the harness on the base's code before its first edit of source, as its skeptic read the transcript:
- **X**: the two compiled tests red at 00:51:25 UTC, 'Tests run: 2, Failures: 2'; the walk test red at 00:51:34 and 00:51:54; first edit 00:55:28 (`rung-checker-conditional-extension/SKEPTIC.md` section 1).
- **K**: 'Tests run: 25, Failures: 6' at 00:59:25 to 00:59:29; first edit 01:00:41; one test added after the change, run red on the old code at 01:12:05 (`rung-checker-where-checks/SKEPTIC.md` section 2).
- **W**: 'Tests run: 10, Failures: 10' at 01:47:50 to 01:48:05; the patch applied at 01:49:25 (`rung-walk-trait-method-bounds/SKEPTIC.md` section 1).

No miss of order, as in batches 11 to 17. One test was too weak: `XXXCondExtendRefuseChecker` was keyed on the count only (`05c6be2e1`).

### The rulings

- **X's judge** (157K, 4 minutes) upheld `bd18b6a47`: a conditional entry's condition holds in that entry and the members, not in the other entries, by P-151, the curator's reading and `trait-parameters.tex:371-374` (`rung-checker-conditional-extension/JUDGE.md` section 2). It saw by reading that the `excludes` and `comprises` clauses had the same shape, and left it unruled (X.judge.2; finding 4).
- **The review's judge** (238K, 12 minutes) upheld the blocking finding, and added `Decls`' check of an object's contract to the repair (`JUDGE-review.md` section 1). It left where the value parameters fall to him (section 6).

### The merged-diff review's blocking finding, and the repair

- **The finding.** After `bd18b6a47`, `TypeWellFormedChecker`'s trait and object cases still checked the static parameters, the declaration's own `where` clause, its `throws` clause and contract, and its `excludes` and `comprises` clauses with every condition holding. The review ran three programs that the base refuses, 'Ill-formed type: W[\E\] ... does not satisfy the corresponding bound Shows.', and that main accepted (`JUDGE-review.md` section 2). K's own-constraint check reads the same analyzer.
- **The repair** (377K, 22 minutes), test first: five expected failures red on main, 'Tests run: 5, Failures: 5'; after the edit, four green and the contract's still red (`REPAIR-review.md` section 1).
- **Its one deviation, and why it was right.** The ruling keyed the contract test from the base, which "refuses each for the reason the text gives". The base accepts it: the disambiguator drops every trait's and object's `throws` clause and contract (`compiler/disambiguator/TypeDisambiguator.java:112-113`, `:137-138`), as the team's own lines did, so neither path checks or evaluates them. The repair committed no red test and no edit that no program can observe, and filed row 781 (`REPAIR-review.md` section 2). The ruling's premise was not checked against a run.
- **The gate ran again**, as the manual asks after a code repair; it measured the merged tree green (section 4).
- **The cost**: the review's judge, the repair and the second gate, 0.77M and 51 minutes (03:46 to 04:37 UTC, the second gate's 18 among them).

### The briefing in each agent's first turn

| Batch | Briefed agents | In the first turn | Run at all | At calls | Seconds after start |
|---|---|---|---|---|---|
| 14 | 10 | 0 | 10 | 9 to 11 | |
| 15 | 8 | 0 | 8 | 9 to 12 | |
| 16 | 12 | 0 | 12 | 3 to 50 | |
| 17 | 11 | 0 | 11 | 10 to 23 | 30 to 105 |
| 18 | 8 | 0 | 8 | 3 to 25 | 17 to 85 |

- Batch 17's eleven: the five workers, the five skeptics and the review's repair. Batch 18's eight: the three workers, the three skeptics, X's judge (call 3) and the review's repair. The figures for 14 to 16 are their reviews'; those for 17 and 18 are from the transcripts, by a script that finds each agent's first `facts-extract.sh` call with the brief's keys.
- Every first turn is one call, the skill's load, which the brief puts first. Before the briefing, batch 18's workers read the skill's parts, 13 of them in rung X's case (calls 2 to 15), and wrote task lists; so the call numbers rose, while the time stayed about a minute.
- **For the figure `batch.md:45` asks**, the share in the first turn is 0 % in both batches, as in every batch since 13, by the brief's order; the share that ran it at the start of their work, 17 to 105 seconds after they started, is 100 %. Proposed (mine): `batch.md:45` measures the second share, since the first is 0 by design.

### Builds and runs, repeated or not

- **Builds** (`batch-measures.py`): workers X 2, K 1, W 2; skeptics X 3, K 2; the gather 1; the gates 1 each, the second from kept caches in 2 s; the repair 1, with the library order.
- **Suites**: X ran `testQuick` twice (change and pass, as `compiler.md` step 4 asks), `testSystem` and `testSpecData` once; K `testQuick` once; W `testSystem` and `testSpecData` once; the skeptics X and K `testQuick` once each after their fixes; the repair `testQuick` once.
- **Count stages**: X 3 timed and K 2, each with a profile beside them; each checker skeptic 2 (the reviewer's exception); the repair 2, with a profile; each gate 1.
- **Re-measured without a code change:**
  - the repair's `base` count ran on `main`'s build, the code the first gate had just timed (67.8 s against about 70 s);
  - the second gate's count and distance ran on the code of the repair's `change` count, whose tables had already shown no change;
  - the second gate's `testSystem` and `testSpecData` ran on code that walk runs unchanged (finding 8).

  The last two follow the manual's rule. The first is the P-148 steps' `base`, which could have cited the gate.
- **Re-measured by design:** the gather's 61 walk programs and 33 compiled tests, 31 of which rung X had run, are its closing tests.

### Refusals by the harness and the tools

- **All three workers' writes of `REPORT.md` were refused**, as the script expects; the skeptics wrote each from the journal (W's `record.md` too).
- **One `sleep` call was blocked**: rung X.
- **Eight `Edit` calls were refused for a file not read**: X 1, K 2, W 3; skeptics X 1, K 1.
- **One structured result was refused by its schema**: skeptic K, a fix kind outside the allowed words.
- **No agent read `sources.md`** (batch 17: rung W, twice). No refusal cost a cache refill.

### The practice's measures, batches 14 to 18

| Measure | B14 | B15 | B16 | B17 | B18 |
|---|---|---|---|---|---|
| Written | 4.82M | 4.44M | 6.01M | 6.52M | 5.13M |
| Rungs, agents | 5, 14 | 4, 12 | 4, 17 | 5, 16 | 3, 14 |
| Per rung, all roles | 0.96M | 1.11M | 1.50M | 1.30M | 1.71M |
| First calls | 0.60M, 6 cold | 0.55M, 6 cold | 0.76M, 9 cold | 0.77M, 9 cold | 0.73M, 10 cold |
| Refusal cycles | 0 | 0 | 2.8% | 0 | 3.1% |
| Rulings and repairs on the merged tree | 0 | 0 | 8.3% | 9.0% | 12.0% |
| Skeptic fix commits (defects) | 19 (2) | 17 (1) | 11 (3) | 18 (1) | 11 (3) |
| Distance, sites gone net | 31 | 5 | 0 | 14 | 1 |
| Count stage at the gate | | 569 s, to its crash | 82 s | 76 s | 70 s, 68 s |
| Distance stage at the gate | 1,714 s | 2,087 s | 217 s | 180 s | 173 s |
| Skill's load | 10.3% | 9.8% | 9.6% | 9.5% | 9.4% |

### Batch 17's findings, a batch later

1. **Row 766**: repaired by rung W (`5262a2412`); review-queue item 173 settled.
2. **The gather's order**: the rule fixed before this batch (`ac74e11c4`) and applied here; item 174 now says he has not answered it (`c34bfb465`).
3. **Walk's message**: built by rung W.
4. **Row 759 in the specification**: still named nowhere (`grep row~759 Specification/` prints nothing); a text fix waiting in item 17's list.
5. **P-45's "Built"**: narrowed; its "Not built" now names F-26, row 539, rows 779 and 780, and rows 740 and 741.
6. **P-151's `AnyList`**: review-queue item 188 (`c34bfb465`), P-151's sentence waiting on his yes.
7. **Minor**: the comment at `:3232` removed by rung X; `ownGeneric`'s comment still stands (gather.2, item 186); `XXXExpectedTypeFixRungT.fss` line 1 still a record pointer (`PLAN.md:182`).

### Misses, by kind

Numbered on from `batch-16-review.md`'s 525; batch 17's review numbered none.

Found inside the batch:
- **The change wrong:**
  - 526, X's conditional parents crashed the code generator's analyzer on a program the base compiles (`24bafdd04`, skeptic X);
  - 527, X checked the whole `extends` clause under every condition (`bd18b6a47`, skeptic X, upheld);
  - 528, X checked the header under every condition (X's judge by reading; the review by runs; the repair `5b11849c6`);
  - 529, K's opened bound kept the unopened name of a bound that names the variable, and crashed the checker where the base refused the call; the binding form had failed so since batch 17's rung A (`deabd50f6`, skeptic K).
- **A test that does not cover its edit:** 530, `XXXCondExtendRefuseChecker` keyed on the count only (`05c6be2e1`, skeptic X).
- **Text claiming more than the code does:**
  - 531, the record's "holds for the checker" of `opr-overview.tex:293-295`, and X's report's "none" (`cfed7411b`, skeptic X);
  - 532, X's report, sections 1 and 10 (skeptic X);
  - 533, K's report on `openWhereSizes`, and a precedent's line (`ae1aecdcd`, skeptic K);
  - 534, W's record: row 779's claim, rows 713 and 539 left out, F-253's text, a citation (`eb5a6a73d`, `f3c031c47`, skeptic W);
  - 535, the gather's copy of X's revival change, F-256's count sentence, row 773's note, two citations (`7d6c65881`, the review);
  - 536, the review's judge's premise that the base refuses the contract test (the repair; row 781).
- **A new rule's effect elsewhere:**
  - 537, W's rule names reach a generic-beside-plain pair the brief did not name (worker W, reported);
  - 538, K's trait-type check under X's analyzer, the cross-rung face of 528 (the review).
- **The team's code, found by the rungs:** 539, rows 775 (skeptic X), 776 and 777 (K), 778 (skeptic K), 779 (W), 780 (skeptic W), 781 (the repair).
- **Form:** 540, two skeptics' first commits carry the session's footer, not the skill's (X `37f5f8c84`, W `b03b77e8b`; their own notes).
- **Process:**
  - 541, three report writes refused (by design);
  - 542, eleven ledger notes refused, and two rows added twice before a restore (the gather).

Found by this review: 543 to 553, findings 1 to 11 above.

**Against the earlier notes.** 17 found inside the batch (526 to 542), 5.7 a rung, against batch 16's 4.3. The skeptics found three of the four defects; the review found the fourth, which X's judge had seen by reading. No test-first miss. Landed: no wrong value is known. The known costs are rows 773 and 774, the unread case of finding 5, and the false sentences.

## Part 3. Skill sentences the batch made false

For the skill writer, with the record's revival-change material (`compile-ladder/climb-batch-18/RECORD.md`, "Revival changes, for the skill writer", `:238-295`, and its correction paragraph at `:250`). Every line below is of `.claude/skills/fortress-repo/`, under `references/` but for `SKILL.md`; no commit has changed the skills since `0707ac9ac`.

**Made false by batch 18:**
1. **`revival-changes.md:148`**, its last sentence (rung W): "A generic method that a trait declares is still instantiated without coercion and without its bound (ledger row 766)." Walk now reads such a method's bounds and coercion targets in the trait's method environment (F-253; `TraitGenericMethodInference`).
2. **`revival-changes.md:189-192`** (rung K): "Four cases are not built yet:" with row 748 (`:190`), row 749, "it refuses every call" (`:191`), and row 750 (`:192`). All three are built; only `:193`, row 470, stands. The case K left unread goes in their place: a constraint whose bound names the method's own static parameters or a `where`-clause variable, at a dotted call or at a type's use (F-256), with walk's row 777 beside it.
3. **`revival-changes.md:217`** (rung K): "the argument takes the listed type at a type of its own, bounded as the binding is". It is now bounded by the binding and by the clause's constraints on the variable, and a bound that names the variable names it opened (F-256; row 771, `deabd50f6`).
4. **`revival-changes.md:220`** (rung K): "the checker and walk read the extenders at every type of a bounded variable (ledger rows 753 and 754)". The checker's half is fixed (row 753); walk's, row 754, stands; row 778 is a new walk departure of the same clause.
5. **`compiler.md:39`** (rung X and the repair): "It also refuses a function, object or trait declaration with a `where` clause or a contract (`requires`, `ensures`, `invariant`)." The code generator compiles a declaration whose `extends` entry carries a `where` clause (X.worker.5; F-181; `CondExtendInheritedMember`, 'run ... PASS'), and it never sees a trait's or an object's contract, which the disambiguator drops (row 781; `object V(x: ZZ32) requires { x > 0 }` compiles, and its run prints `made`, `REPAIR-review.md` section 2). The contract half was false before the batch; the repair measured it.
6. **`revival-changes.md:222`** (rung X): "the code generator does not compile a trait with a `where` clause (ledger row 701)". True of a trait's own clause, as `AnyList`'s is; false of a trait whose `extends` entry carries one. "with a `where` clause of its own" makes it true.

**Not false, but now incomplete:**
- **`revival-changes.md:46`** (rung W): "In four cases, walk or the checker departs from these rules". Rows 779 and 780 are two more, for generic functional methods. The resolution may name the rules' messages (F-257).
- **Conditional extension** has no sentence in the skill. X's revival change is the material, as the review's correction paragraph amends it. `interpreter.md:45` ("a generic trait or object that extends a type under a `where` clause") stays true, since walk reads the extension at every instance (row 774).
- **`compiler.md:125`**, "about 1.5 minutes": the stage took 66 s to 77 s in this batch and 76 s at batch 17's gate. The batch did not change it; the writer may round it.

**Checked and not false:** `SKILL.md:126` (some cases still take `Bottom` under walk); `revival-changes.md:139-142`; `:228` (the tuples' `StandardPartialOrder` bound, which rung X did not touch); `:321` (the comment X removed is quoted as the original); `tests-writing.md:44`; for rung W, no file outside `OverloadedFunction.java` held the old message (`rung-walk-trait-method-bounds/SKEPTIC.md` section 1, item 10).

**Batch 17's review, against the writer's commit `0707ac9ac`.** That review named no sentence of a skill: its brief did not ask for them (post-mortem part 2, entry 13), and its findings cite FACTS, POSITIONS, the specification and the code. Its points that bear on a skill sentence:
- **Finding 1, row 766**: `revival-changes.md:148` names it. Fixed by `0707ac9ac`; false again since rung W (item 1 above).
- **Finding 4, row 759**: `revival-changes.md:50` names it. Fixed by `0707ac9ac`.
- **Finding 5, P-45's "Built" claims more than rung G built**: `revival-changes.md:46`, "walk reads every pair of generic declarations on the declared domains, each over its own instances", and `interpreter.md:38`, "It reads every pair of generic declarations on their declared domains, each over its own instances". **Not fixed**: `0707ac9ac` wrote both. Walk reads pairs of functions so; a functional method of a generic trait or object is still compared on the instance a call makes (F-26; F-252's limits), as P-45's "Not built" now says.
- **Section 1, rung W, "The declared-domain comparison is partial: it applies only where exactly one domain lies inside the other"**: `revival-changes.md:148`, "It chooses such a method against the set's other methods on its declared domain". **Not fixed**: only where exactly one of the two declared domains lies inside the other (F-26, F-253).
- **Finding 3, walk's message**: no sentence claimed it current; `0707ac9ac` moved it to the original (`:45`). Nothing false; rung W built the message.
- **Finding 6, P-151's `AnyList`**: `revival-changes.md:217`, "`AnyList`'s `addLeft` and `addRight` are written with `||`", true as built.
- **Section 4's library and checker changes** (the generic `distribute`, `embiggen`, a constraint as a bound, rows 737, 738 and 739): `:97`, `:189`, `:322`, `:328`, `:336` state them as built.

Outside the skills: row 701's claim (X.worker.5) and row 539's claim (gather.3), which no command can rewrite while the rows are open.

## Part 4. Routing

Checked against main at `1b1cc94d8`: the landing's routing commits `9332e8ec0` (FACTS), `4c607e9dc` (POSITIONS), `0156a74d2` (PLAN) and `33459f054` (the review queue), and the coordinator's record fixes of 22:23 to 22:40 UTC on 2026-10-19, which touch no item of this batch.

### The 18 items of `forCurator`

All 18 are in PLAN under "Climb batch 18, listed for his review", as 14 entries (`PLAN.md:479-492`), each with a review-queue item:
- **X.skeptic.1 and X.judge.1** (the other entries): item 175, default as ruled. Sound.
- **X.judge.2 and review.1** (the header): item 176, default as repaired. Sound.
- **judge-review.1** (the value parameters): item 177, "Default, taken". Sound on the list; P-151 should not carry the default (finding 2).
- **X.worker.2** (members scoped): item 178, a PLAN line in item 17. Sound.
- **X.worker.1 with X.skeptic.3** (row 773's test pair): item 179. Sound.
- **X.worker.3** (a compile after a typecheck): item 180, row 757. Sound.
- **X.worker.4** (`PureList`'s `=`): item 181. Sound.
- **X.worker.5** (row 701's claim): item 182; F-181 rewritten by `9332e8ec0` says what is measured. The claim stays false.
- **X.skeptic.2** (row 775): item 183, "No default on record, so none is taken". **Missing: a default** (finding 10).
- **X.skeptic.3**: spread over the four entries above. Sound.
- **K.worker.1** (a memo for P-148's pass): item 184, default no memo. Sound.
- **W.worker.1 and W.skeptic.1** (`XXXGenericBesidePlainReturnRule`): item 185. Sound.
- **gather.1** (eleven notes): item 165. **Its default cannot be carried out** (finding 7). Two of the notes carry facts that no other home holds: row 470's (a call that writes its static arguments clears the `where`-clause variables, so their constraints go unchecked, `RECORD.md:143`) and row 701's compile stop (`:144`).
- **gather.2** (`ownGeneric`'s comment): item 186. Sound.
- **gather.3** (row 539's claim): item 187. **Its default cannot be carried out** (finding 7).

### New rows

- **773 to 781**: each in PLAN's item 17 (`PLAN.md:57-59`): 773 and 774 as the record's items for batch 19, 775, 776 and 781 among the checker's rows, 777 to 780 among walk's. **Missing: row 774 marked held** until question 2 is answered (finding 1).
- **The eight closed rows**: settled by F-255 (634), F-256 (748, 749, 750, 753, 771) and F-253 (765, 766).
- **No row**: K's unread constraint case (finding 5).

### What the record listed for him, and PLAN lacks

- **Question 2** (`CLIMB-BATCH-18.md:57`): no entry and no queue item (finding 1).
- **Question 1, item 60**: settled at its default by rung W; PLAN-history and item 173. Sound.
- **The coordinator's calls 1 to 9** (`:59-71`) and **the points for his sight** (`:73-79`): no entry (finding 3). Call 4 is covered by X.worker.2's entry, call 5 by item 17's line on row 774, and call 6's gap by X.worker.4's; calls 1, 2, 3, 7, 8 and 9 and the points have none. Call 9, the checker refusing the team's walk test's call, is the one a reader would want to see.
- **Item 43** (`PLAN.md:154`): its line still names row 634 as open (finding 9).

### Answered, stale or overlong in the record

- **P-151** (`POSITIONS.md:65`): "its default taken: with the members" (finding 2); and "the rest of `AnyList` moves into `List`", now item 188.
- **F-255, F-256 and F-257** are 2,728, 2,002 and 1,790 characters, past the record's 600 (`record.py check` at the commit stage). Home: the coordinator's consolidation.
- **The record's "After the landing"** (`CLIMB-BATCH-18.md:368-370`) asked for the skill writer's task and this review; neither ran in the window (post-mortem part 2, entry 32). PLAN's "Next" (`PLAN.md:13`) names both.

## What I did not do

- I built nothing and ran no Fortress program, suite or stage. I changed no file but this one, and committed nothing.
- I read the transcripts through `batch-measures.py`, `spend.py` and `skill-load.py`, and through four small read-only scripts of mine in the session's scratchpad: each agent's start, end and first call; the call that ran its briefing; its build, suite and stage launches; and its refused calls. The named scripts give none of these, and batch 16's review counted them the same way. I read three of the coordinator's messages with the post-mortem's `show.py` (transcript lines 36541, 36968 and 37045), for what he was told.
- The microGPT runs' loads come from their headers, which are not committed; I cite no file under `tmp/`.
- I did not judge the new specification passages beyond the skeptics', the review's, the judge's and the repair's checks.
- The INDEX line for this review is the coordinator's.

## For Pavol

In the order they need you, each with its default:

1. **A list of floats, rationals or ranges has no `<` on the checker since rung X (question 2), against the specification's sentence that lists compare where their elements do.** Item 43's tuple bound is beside it. Default: as landed; walk's half (row 774) waits for your answer.
2. **An object's value parameters are checked as if a conditional extension's condition held, so the object can be made where the condition fails (judge-review.1).** Default, the Fable judgement's: check them with the header, in the rung that scopes the members; as landed until then.
3. **A member of a conditional extension stays callable where the condition fails (row 773).** Default: scope members to the condition in a later batch.
4. **A conditional entry's condition holds in that entry and the members only, not in the other entries or the header (items 175 and 176).** Default: as ruled and repaired.
5. **The coordinator's nine calls and the batch's points, for your sight**, among them the checker now refusing the call `g(O, P)` that the team's walk test runs (call 9), and team lines changed in `LexicographicOrder`, `List` and `PureList`. Default: as landed.

Information:
- The count is 30 and the distance 34, as read; one site left, and every moved site is rung X's.
- The count stage takes about 68 s and the distance stage 173 s. Load and the machine explain the change from 76 s and 180 s; the batch's code did not.
- The batch wrote 5.13M over 14 agents in 3 h 56 min, against the record's 4.0M and 5 hours. Two rulings, a repair and a second gate cost 0.93M of it. Preparation cost 1.29M more.
- microGPT's quick walk check passed 7 of 7 in both programs, in 44 s and 38 s.
- The skill writer's pass for this batch has not run, so the skill still holds six sentences that this batch made false, and three that two of batch 17's review's points show false.
