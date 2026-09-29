<!-- The post-batch review of climb batch N's first run (rung I 8dc1a74d9, rung K 041682188, rung T f54ffac90, rung M 2770550c3; the merged-diff review's corrections bd200b4ce, the judge's ruling e3a1e87ef and its repair 47320a712, the second review's corrections 2589d53d5, the landing record 3fb0cd8c1, the coordinator's routing commit 6a196e355), the combined pass Pavol asked for on 2026-09-28 (POSITIONS, reviews after a batch), in the form of reviews/batch-7C-review.md and reviews/batch-6.5-review.md, with the four questions Pavol asked on 2026-09-29 about the gather's compaction, its context, the size of a run and the rules applied where their purpose did not hold. For the coordinator, who files what it finds in PLAN.md, and for Pavol, who reads the first section. Written 2026-09-29 from 09:50 UTC by an Opus review worker, reading only, on main at d3350baed; PLAN.md, POSITIONS.md, the ledger and Specification/ are as 6a196e355 left them. Nothing built, no Fortress program run, no stage measured; transcripts read only through bounded scripts, which are in batch-N-review/ with their outputs. -->

# Climb batch N's first run: conformance, process and routing

## For Pavol

- All four rungs are in the spirit of the designers and of your decisions. Rung I builds the inference rule in the compiled checker, rung K the same rule in walk, rung T writes it into the empty inference chapter in the usual form, and rung M gives each integer type its own `MIN`, `MAX` and `MINMAX` with the team's own bodies.
- One text now claims more than holds. The chapter and its Appendix I entry say the text states "the rule that the checker builds, and no more". Four gated rows (508, 515, 516, 518) show where the checker departs from it. The next rung that edits the chapter should list them, as batch 7C's rung X listed its checker's departures. That rung is batch 7b's rung S, and its file list lacks the chapter.
- Your four questions, in short:
  1. **The compaction cost little.** About 3 minutes and 70K tokens of re-orientation. Nothing the reviews, the judge or the gate caught traces to it. The one miss in the gather's later work that the review blocked on (row 325's owed tests) it had made the same way before the compaction.
  2. **Most of the gather's context was text it did not need.** At the compaction it held 785K. 280K was there before it did anything: 42K the harness's base and 238K its task text, of which 195K were the four rungs' reports, verdicts and records. Of its 504K of work, 88K was copying five of those texts out of its own prompt into files. About 280K of the 785K was not needed.
  3. **A narrower change is enough.** Hand the gather the rung texts through the run's journal instead of its prompt. Its peak would have been about 640K, below the 785K where it compacted, and it would have saved about 10 minutes. Fewer rungs per run costs a second tail, 0.8M to 1.8M tokens and 45 minutes to 1 h 40 min per extra run. A gather per rung costs 0.2M to 0.7M more tokens and saves reading; it pays at five rungs.
  4. **The two rules you named cost 78 minutes.** The batch sat unlanded from 08:14 to 09:45. Under the rules as they now stand it would have landed about 08:27. Routing the owed tests to batch 6.5b protects what the block protected. The gate rerun protected one thing: the seven new tests running together in the suites' JVMs, where the repair ran them one file per JVM; the next gate covers that. Five more rules had the same shape. The two largest: the first review's judge can only repair, drop a rung or stop, never land and route (54 minutes and 1M tokens here), and the second review still runs on the critical path though it can no longer hold the batch (17 minutes and 0.35M). The two script changes cover your two rules, not these.
- Routing: all 54 items for you have a line. Six new rows (506, 507, 511, 513, 515, 518), the record's section-1 defaults and the rungs' lists for you have none. Two items lack the default they could carry: item 33's `MAXNUM` half, which decision 2 and the specification's `ZZ` answer, and item 34, whose default runs against decision 1 and the landed chapter.
- Process, in tokens as the harness counts them: 26 agents, 9.2M, 10 h 49 min from the launch to the landing, inside the record's estimate of 20 to 27 agents and 6.8M to 9.7M. Every worker and skeptic read its briefing. The map reached all four rung workers; INDEX reached none.
- Nothing here needs a decision from you now.

## Pavol's four questions

### 1. Did the gather's compaction cost anything the review, the judge or the gate had to catch?

No.
- **When and how big.** The gather's context was compacted automatically at 06:34:37 UTC, from 785K to 9K, in 86 seconds (`agent-a368e1e3b5dc1fb4a.jsonl:974`, its `compactMetadata`). It was 56 minutes into its work, with rungs I, K and T committed and rung M's patch applied (`:975`, the summary, sections 3 and 8).
- **What it did after.** Rung M's corrections 2 to 4, row 517 and the notes on rows 325 and 442, M's folds, the re-anchoring of M's moved lines, the specification's rebuild, M's section of the record and the run's totals, M's commit, the tracked-path check and the return (`climb-batch-N/RECORD.md:193-242`). The summary carried every pending step, with the blame results and the line maps it needed (`:975`, sections 7 and 9).
- **What the checks caught in that work.** One line. The first review reordered the precedent line the gather had rewritten in M's report, so that it ends on a `file:line` (`bd200b4ce`). It fixed the same form in K's and T's worker-written lines in the same commit, so the slip is not the compaction's.
- **Row 325.** The review blocked on row 325's faces landing as notes without their owed tests. The gather filed M's face that way after the compaction (`RECORD.md:209`), and T's face the same way 12 minutes before it (`RECORD.md:170`). Same slip, both sides.
- **Item 33's `MAXNUM` half.** Written after the compaction with "No default is on record" (`PLAN.md:138`). Batch 6.5's gather made the same slip without a compaction (`batch-6.5-review.md`, item 88). So not traceable to it either.
- **What it cost.**
  - 86 seconds of compaction.
  - About 1.5 minutes and 70K tokens of re-orientation. The agent ran the coordinator's boot, because CLAUDE.md says the knowledge base is read after every compaction: the coordinator's README, the protocol and FACTS whole (`agent-a368e1e3b5dc1fb4a.jsonl:994`, `:1001`, `:1006-1009`, `:1017`; about 30K).
  - It then searched the coordinator's own session transcript for its task, since the compaction summary points there (`:975`, last paragraph; `:1035-1049`; about 16K). It found its task in its own transcript and copied it out (`:1052-1063`; about 20K).
  - Reading the coordinator's transcript is outside a gather's remit. It read nothing it used from there.
- **What it saved.** After the compaction its 107 calls read 53K to 270K each, 19M in all. Before it, 201 calls read 557K each on average, 112M.

### 2. What filled the gather's context before it compacted

At 785K (`batch-N-review/gather-composition.txt`):
- **Before its first action, 280K** (its first call's context, 279K).
  - 42K the harness's base: system prompt, tools, CLAUDE.md, environment.
  - 238K its task text, 561K characters.
    - 82K the four rungs' reports (`reportText`), for REPORT.md, which the harness refuses to let a subagent write (`agent-a0dac57dfcc43e139.jsonl:860`, and the same for K, T and M).
    - 76K the skeptics' verdicts, both rounds (`skepticText`, `firstSkepticText`), though all four branches carried SKEPTIC.md (`RECORD.md:26`, `:80`, `:132`, `:195`).
    - 36K the rungs' records (`recordText`), though three branches carried record.md; only M's was missing.
    - 15K the corrections, rows and file lists; 18K the shared prefix and the gather's role; 13K the 49 items for you and the return.
- **Its work, 504K over 200 calls.** 186K tool results, 174K its own output, 145K its reasoning and per-call overhead. By kind, each with its share of reasoning (`gather-context.txt`):
  - **Its own text, 204K.**
    - 88K copying five texts out of its own prompt into scratch files, to write REPORT.md and M's record.md byte for byte (`agent-a368e1e3b5dc1fb4a.jsonl:153`, `:383`, `:662`, `:913`, `:916`). This also took about 10 minutes of generation, 05:42 to 06:30.
    - 116K edits, scripts, staging and commits: the folds into FACTS, the ledger, PLAN and the handover, and the batch record, 71 calls.
  - **File reads, 194K, 77 calls.**
    - 69K the rungs' records and probes, 29 calls, mostly the files whose text its prompt already held.
    - 24K PLAN.md.
    - 22K batch 6.5's gather record, read for the form (`:74`, `:79`).
    - 19K the batch record.
    - 10K FACTS; 8K the specification; 7K source and library; 7K the workflow manual; 6K the handover; 6K tests; 3K the ledger; 14K other and its own files.
  - **Test runs on the merged tree, 44K, 18 calls.** T's owed tests placed and shown red on stand-ins, the check of T's chapter against rung I, SkK17, M's new test.
  - **Git, 54K.** Diffs and shows 25K, logs, status and stats 29K.
  - **Builds, 10K.** `ant compileAll` and the library rebuild, logged to files and read by their last lines.
- **What it did not need to do.**
  - Carry the rung texts in its prompt and copy five of them out: about 280K of context and 10 minutes. The reports can come from the run's journal, which keeps every agent's structured result (`journal.jsonl`: `repair:I`'s result line holds I's report, 82K characters), by one extraction command per file. The gather did exactly that after its compaction, from its own transcript (`:1052-1059`).
  - Read the same texts twice: the skeptics' and records' texts in its prompt and the same files on disk.
  - Read batch 6.5's record for the form of its own: 22K, a form the role could state.
  - After the compaction, the coordinator's boot and the search of the coordinator's transcript: about 45K.
  - Run through the harness the tests the gate runs anyway: K's walk tests and M's compiled pair (`merged-tests/walk-K-IK.txt`, `junit-M-IKT.txt`). A few thousand tokens and minutes.
- **What it did well.** No full log entered its context. Builds went to files and were read by `tail`, and test output was cut to 240 characters a line (`merged-tests/junit.sh:15`). It re-measured nothing a rung had measured on the same tree: its runs of the skeptics' programs were on the merged tree, which carries rung I's checker.

### 3. Fewer rungs, a split gather, or a narrower change?

The narrower change is enough for a run of four rungs. Priced against this run, in two units: tokens as the harness counts them (each agent's context at its last turn, summed) and the tokens read across all of an agent's turns (each call re-reads its whole context from the cache).

- **As run.** The gather: 75 minutes, a peak of 785K, 270K at its last turn, 131M read, one compaction (`batch-N-review/run_agents.tsv`). The gather alone read 15% of the run's 856M.
- **The narrower change.**
  - What: the gather's prompt names each missing file and the command that writes it from the journal, and carries no report, verdict or record text. One sentence in the prefix says that after a compaction a worker's task is in its own transcript, and the coordinator's boot and transcript are not its to read.
  - Its context: it starts at about 70K instead of 280K. It grew 95K in its setup and 93K to 154K per rung without the copies. So its peak would be about 640K, below the 785K where it compacted.
  - Reading: about 100M instead of 131M.
  - Time: about 62 minutes, 13 fewer: no copying, no compaction, no re-orientation.
  - Cost: a paragraph of the gather's role and a line of the prefix.
- **A gather per rung, four in sequence.**
  - Each starts at about 70K, repeats a shorter setup of about 60K, and adds its rung's 93K to 154K: peaks of 220K to 280K.
  - About 1.0M at the harness's count, 0.2M to 0.7M more than the one gather's 270K or 785K.
  - About 55M read, 75M fewer.
  - About the same wall time: three more setups, about 12 minutes, against the 10 minutes of copying saved.
  - Risks: four agents keep the row numbering, the record's form and the PLAN routing consistent between them, and the check of T against I needs I's commit first, which the sequence gives.
  - Worth it when a run carries five rungs or more, or when 70K + 95K + about 115K per rung passes about 650K.
- **Fewer rungs per run, say two runs of two.**
  - Each run pays its own tail. In this run: the gate 137K, the review 443K and the commit 253K; with a blocked review, the judge 249K, its repair 387K and the second review 348K as well.
  - So each extra run costs 0.8M to 1.8M tokens and 58M to 120M read, and 45 minutes to 1 h 40 min of the queue. Its gathers would each read about 35M instead of the one gather's 131M.
  - It costs more than the compaction did, and the compaction caused no miss.

### 4. Rules applied where their purpose did not hold

POSITIONS 2026-09-29 (`POSITIONS.md:137`, `:138`) asks what each rule cost against what it protected.

**The timeline.**
- 07:20: the first gate green (the gate agent's last line, `run_agents.tsv`).
- 07:20 to 08:14: the first review's judge, its repair and the second review (`run_agents.tsv`).
- 08:14: the second review still blocks on rows 447 and 505; the run returns unlanded. You are asked at 08:16 (coordinator transcript `fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl:44527`).
- 08:40 to 08:42: "let's land this ... and do some repairs afterwards" (`:44579`). The script change `12d5525d5` at 08:44. The run is resumed at 08:46, and, by the script as it then stood, the gate starts again.
- 08:47 to 08:52: "can't we just like fix that one, verify that one in isolation" (`:44674`), then "Land on the first gate" (`:44772`). The second gate is stopped at 08:52 (`RECORD.md:257`).
- 08:49 and 08:53: the session's permission check refuses twice to put the first gate's outputs back (`:44765`, `:44791`). The coordinator plans the full gate for 09:40, after the platform's 09:31 stop (`:44808`).
- 09:23: you switch to manual approval (`:45298`). 09:27: the commit stage launches (`:45361`). 09:31: the platform's stop kills it (`:45493`). 09:32: resumed. 09:45: landed.

**The second review's block on owed tests after its repair.**
- Cost: 32 minutes from the return to the resume, one decision of yours, and the coordinator's 27 turns in that window, which read 16M tokens at 570K to 640K of context each.
- What it protected: two owed test pairs for programs that compile and then die in the JVM (rows 447 and 505). Routing them to batch 6.5b's rung E protects the same thing (`CLIMB-BATCH-6.5.md:26`), and that is what `12d5525d5` now does.

**The full gate rerun after a repair of tests and records only.**
- Cost as the rule stood: a second gate, about 28 minutes and 0.14M tokens, the first gate's figures. Run from 08:46, the batch would have landed about 09:27, before the platform's stop.
- Cost as it went, once the rule was dropped by hand in mid-run: 59 minutes from 08:46 to the landing. That includes 6 minutes of the stopped gate (81K), two permission refusals, waiting for the platform's stop, a commit stage killed by it (166K), and 88 coordinator turns reading 35M tokens, among them its own compaction.
- What it protected: the seven new tests running together in the suites' JVMs under the gate's seed. The repair ran each in its own JVM (`merged-tests/junit.sh:13-17`; `merged-tests/repair-junit-placed.txt`, six runs). A test that passes alone can fail under the gate's seed; batch 6.5 met exactly that (`batch-6.5-review.md`, item 78). The next gate, batch 6.5b's, runs them together, one batch later.
- Together: the batch sat unlanded 91 minutes. Under both rules as they now stand it would have gone from the second review to the commit stage and landed about 08:27 (the commit stage took 13 minutes). So the two rules cost about 78 minutes, and the queue behind N waited on N's landed tree; batch 6.5b launched at 09:52 (`:45866`).

**Other rules of this run with the same shape.**
1. **The first review's judge can only repair, drop or stop** (`climb-batch-workflow.js:1647` at `6a196e355`, the judge's `decision`; `:2762-2763`).
   - Here the judge upheld both findings and ruled a repair of tests and records only (`JUDGE-review.md`, opening; section 3).
   - Cost: 54 minutes on the critical path after a green gate, and about 1.0M tokens (judge 249K, repair 387K, second review 348K).
   - What it produced: six tests, row 518 and its test, record fixes. All of it could have landed one batch later, as rows 447 and 505 did.
   - Smallest change: a fourth decision, `land`, for a merged-diff review's judge when every finding it upholds needs tests and records only. The ruling then goes to the next batch's first rung and is listed for you, as the second review's findings now go.
2. **The second review now runs on the critical path though it can no longer hold the batch** (`climb-batch-workflow.js:2768-2782` at `6a196e355`).
   - Cost: 17 minutes and 0.35M tokens per blocked batch. Here it found rows 447 and 505 and fixed four record slips.
   - Smallest change: after a repair of tests and records only, run it beside the commit stage, or let the post-batch review take its checks.
3. **The gather reports a text mismatch the decisions do not settle "to the review as blocking"** (`CLIMB-BATCH-N.md:1544`; the generator `plan-n/manifest/genn.py:247`; the same rule in 7, 7R and 7C).
   - Your rule on stops says such a mismatch is reversible, lands and is listed (`POSITIONS.md:120`). The judge wrote its reversal in one line (`JUDGE-review.md` section 5).
   - Cost: half of the first review's block (row 516).
   - Smallest change: the gather files it as a reserved stop met, with its home-2 tests, listed for you.
4. **Rung K was asked for a checker count after its edit**, though the record says the stage reads neither the interpreter nor the tests (`CLIMB-BATCH-N.md:210`). It ran twice, after the first pass and after the repair (`rung-inference-walk/REPORT.md:243-245`).
   - Cost: a few minutes of machine each time.
   - Smallest change: a rung that edits nothing a stage reads declares the stage unchanged and does not run it, as the record already does for K's distance stage.
5. **CLAUDE.md's rule to read the knowledge base after every compaction**, which is the coordinator's, applied by the gather (question 1). Cost: about 45K and 1.5 minutes. Smallest change: the prefix line of question 3.

**Whether `12d5525d5` and `9caac07da` cover this.**
- `12d5525d5` covers the second review's block.
- `9caac07da` covers the gate rerun, except the suite-shaped run: its repair still runs each test in its own JVM (`climb-batch-workflow.js`, `repairTestsStep`). Batch 6.5's review asked for a suite-shaped run as its measure 1 (`batch-6.5-review.md:299-301`), and PLAN.md has no line for it.
- Neither covers items 1 to 5 above.

## Part 1. Conformance

### Method

The method of `reviews/batch-7C-review.md`: for each rung, `git show`, then its `REPORT.md`, `record.md`, `SKEPTIC.md`, `JUDGE.md` (and T's `decision-record.md`), the batch record `coordinator/CLIMB-BATCH-N.md`, the gather's `climb-batch-N/RECORD.md`, `JUDGE-review.md` and `REPAIR-review.md`; then the landed code and text on `main`; then the specification and the team's code. Three standards kept apart: the specification (`Specification/`, with the 2012 Types chapter where it speaks), the team's built intent, and your decisions (POSITIONS 2026-09-27, the numerics plans, decision 3, `POSITIONS.md:129`; 2026-09-28, the two decisions of the conversion judgement, `:134`; answer 8; item 25).

The batch's own checks were many: first skeptics refused I, K and T; three judges and three repair rounds; second skeptics approved with eight corrections; the gather's check of T's chapter against rung I; two merged-diff reviews, a judge and a repair. This review cites what they found and does not repeat it.

### The verdicts

- **Rung I, the checker: in the spirit.** It builds decision 1, answer 8's promotion and decision 3's kept expected type, with the devices the checker already has: the overloading oracle's comparison on declared domains and a coercion lookup beside `getCoercionsTo` (`rung-inference-checker/REPORT.md` section 3.3, decisions 5 and 8). Its departures are gated: row 508, where the expected type lets a converted declaration win, a reserved stop you can reverse (item 34); rows 515 and 516, found by the gather's check of T against it, and 518, found by the review's repair; and the shadow's two limits, rows 506 and 507.
- **Rung K, walk: in the spirit.** The same rule at dispatch, the team's reset idiom for its cache (`Init.java:44`), the one permitted edit to `bestMatchInternal` reported whole. Walk has no union type (`JUDGE-review.md` section 1.3), so its lone parameter takes a named supertype where the chapter takes the union (row 516, review.1).
- **Rung T, the specification: in the spirit, with one claim too many.** The S1 form, the Working Draft's note kept, the choice before the instantiation, the numeral rule once, item 25 in the ranges section. Its first callout and its Appendix I rationale say the text is the checker's rule and no more; finding 1.
- **Rung M, the library: in the spirit.** Decision 2 exactly: the team's `StandardTotalOrder` bodies at each integer type (`Library/FortressLibrary.fss:285-288`), as `QQ` and the compiler library declare them. `MAXNUM` and `MINNUM` are left, gated as row 517 and asked as item 33.

### The global questions

- **Later phases.**
  - Batch N's second run, rung Q: item 33 comes before it (`PLAN.md:136-138`). Rung Q meets `z CMP 0` and `b MAXNUM 1` once numerals switch. Probe Q runs now.
  - Batch 7b: rung W edits `OverloadedFunction.java`, where rung K changed `bestMatchInternal` (`OverloadedFunction.java:879-929`); its record re-reads its lines on the base at launch (`CLIMB-BATCH-7.md:152`). Rung S revises the overloading chapters and the implicit bound that the inference chapter's first callout describes as not yet revised (`Specification/basic/inference.tex:38-49`), but S's files do not include the inference chapter (`CLIMB-BATCH-7.md:426`). Finding 1.
  - The switch-over: the count stays 75 and the distance moved 626 to 627, one class's variation (`RECORD.md:252-253`). Rung I unmasked nothing in the library.
  - Phase 5: row 507, an untyped function argument refused by the coercion attempt, is row 401's shape with a lambda. MicroGPT's `heads` is accepted on a probe (`CLIMB-BATCH-N.md:53`); whether any microGPT call passes an untyped lambda to a generic is not measured.
- **Built twice.** By design, the rule is built on both paths and stated once. The two builds differ in the lone parameter's candidates: a written bound on the checker, every supertype under walk, the union in the text (row 516; `PLAN.md:273`).
- **The library's way.** M: the team's bodies. I: the oracle's comparison and the coercion oracle's own shape. K: `Init.initializeEverything`, after its skeptic. T: the S1 form.
- **What reached you.** The landing message gave what landed, the gate, the repair's tests and the routing of rows 447 and 505 (coordinator transcript `:45720`). It did not give the rungs' lists for you (Part 3).

### Findings

1. **The chapter says it states no more than the checker builds; four gated rows say otherwise.** Severity: a named batch (7b).
   - The first callout: the rule was "built into the compiled type checker with this text" (`Specification/basic/inference.tex:30-31`). Appendix I's rationale: "the chapter states the rule that the checker builds, and no more" (`Specification/appendices/changes.tex:1607-1609`). The Effect names no departure (`:1636-1649`).
   - The checker departs in four gated rows: 508, the expected type changes which declaration runs (`XXXInferContextKeepsFit`, `XXXExpectedTypeFnChoiceRungT`); 515, a lone parameter beside a coerced argument refused (`XXXInferUnionCoercedArg`); 516, a written bound in place of the union (`XXXInferLoneBoundUnion`); 518, an instance at a union refused as an argument (`XXXInferUnionInstanceArg`). Ledger `:519`, `:526`, `:527`, `:529`.
   - Batch 7C's rung X listed its checker's departures in its Effect (rows 487, 489, 490; `batch-7C-review.md:70`). Your requirement of 2026-09-24 asks that no discrepancy between the text and the implementation stay unrecorded (`POSITIONS.md:63`).
   - The judge left one text point, walk's supertype, "for the next rung that edits the chapter" (`PLAN.md:273`).
   - Home: batch 7b's record adds `Specification/basic/inference.tex` to rung S's files. S revises the sentences the first callout calls not yet revised (`:38-49`), rewords the callout and the rationale, and lists rows 508, 515, 516 and 518 in the Effect, with walk's text point. The default is the text as landed until then.
2. **Item 34's default is against decision 1 and the landed chapter.** Severity: before the switch-over, as filed; the default is to write now.
   - The item is a real meeting of two decisions: decision 3 keeps the expected type at `f(x)` with a retry without it, and decision 1 says a conversion never changes which declaration runs when one fits.
   - The landed chapter already composes the two. The declaration is chosen as the coercion chapter says, and a coercion "never changes which declaration is chosen when one is applicable to the call without it" (`inference.tex:60-69`). The expected type then fixes the chosen declaration's instance, with the retry without it (`:118-126`).
   - The item says "No default beyond the landed order" (`PLAN.md:180`): the checker's order, which the chapter contradicts.
   - Home: item 34 with the chapter's order as its default, the alternative the item names (subtyping without the context, kept when its head's result converts, before coercion with the context) as its build, and its cost stated: re-measuring the calls whose instance the context fixes.
3. **Item 33's second half has no default, though decision 2 and the specification give one.** Severity: before batch N's second run.
   - Decision 2 is "each integer type declares its own `MIN`, `MAX` and `MINMAX`, as `QQ`, `RR64`, the compiler library and the specification's `ZZ` do" (`POSITIONS.md:134`). The specification's `ZZ` declares `MAXNUM` and `MINNUM` beside them (`Specification/basic-lib/basic-integers.tex:263-266`).
   - The item says "No default is on record for these" (`PLAN.md:138`), where the section asks each item to carry one (`:107`). This is batch 6.5's item 88 again.
   - Home: default, decision 2's device, ten declarations, in rung Q, which meets `b MAXNUM 1` first.
4. **Six rows the batch opened have no line.** Routing; Part 3.
5. **Two PLAN lines describe the past.** Severity: a record fix.
   - Batch N's line still reads "It waits for his answers to items 20, 24, 25, 28 and 29; batch 6.5's first run takes the slot meanwhile" (`PLAN.md:66`). The first run landed at `3fb0cd8c1`; the second, rung Q, waits for probe Q and item 33. Batches 7, 7R and 7C each say "landed" in their lines (`:63-65`).
   - "Row 488's probe, before batch N" is still work that can start now (`PLAN.md:201`). It ran on 2026-09-28: the clause cache is not the cause (`reviews/row-488-probe.md`, "The answer").

## Part 2. Process measures

### Method

- The run is `wf_4ba3c084-2b3`. Its directory holds 26 transcripts: four rung workers, four first skeptics, three judges, three repair rounds, three second skeptics, the gather, the gate, the review, the review's judge and repair, the second review, the second gate stopped at 08:52, and two commit stages, the first killed by the platform's 09:31 stop (`run_agents.tsv`).
- `process-review-6b-7-7R/measure.py` ran unchanged on these agents, through copies of `batch-7C-review/`'s scripts with the run ID changed. The like-for-like group is the four rung workers, the three repair rounds and the seven skeptics: 14 agents. Batches 6b to 7R and 7C are read from their notes' committed `agents.csv`.
- The unit is tokens as the harness counts them: each agent's context at its last turn, summed. The gather compacted, so its count is 270K at its last turn; its 785K before the compaction is given beside it.
- Misses are numbered on from `batch-6.5-review.md`'s 95. "In the briefing" means printed by that agent's own briefing keys (`batch-N-review/briefkeys.txt`).

### What the agents read

From `batch-N-review/summary.txt`.
- **The briefing.** All 14 ran it; 13 as their first call, the second skeptic of I at its fifth. Each read every part the tool announced; the repair round of I read its third part in two slices.
- **The planner's sizes held.** Predicted I 103K, K 69K, T 58K, M 25K (`CLIMB-BATCH-N.md:490`); actual 105K, 70K, 50K and 26K. The `checks` slices: predicted 30K, 22K, 18K and 7K; actual 26K to 36K for I, 19K for K, 16K to 24K for T, 7K for M.
- **The map.** All four rung workers had map keys, and three of them also opened a map file. Of the seven skeptics, two opened one (T's two); none had a key. Of the repair rounds, one (T's). Workers and skeptics together, 6 of 11, against 2 of 4 in 6.5 and 3 of 4 in 7C.
- **INDEX.** 0 of 14. No briefing carried an `index:` key, and no worker or skeptic opened it. The review's repair opened it once.

### What reading cost

Means per agent.
- **Rung workers, 4.** Context 564K at the end. Briefing 63K (11%), searching 148K (26%). Against 422K, 10% and 28% in 7C, and 497K, 11% and 29% in 6b to 7R.
- **Repair rounds, 3.** 425K; briefing 23K (5%), searching 45K (11%).
- **Skeptics, 7.** 368K; briefing 21K (6%), searching 61K (17%). Against 369K, 3% and 23% in 7C.
- **Per turn**, the 14 made 0.43 searching calls and read 613 tokens, against 0.55 and 750 in 7C. 38% of their searching calls came before the first edit or probe, against 43% in 7C.
- **Briefing against searching.** 32% of the workers' and skeptics' searching calls opened a file their briefing had printed from (225 of 702; 329K of 1.02M tokens; `overlap.txt`), against 28% in 7C and 30% in 6.5. A proxy by file name.
- **The run.** 26 agents, 9.2M (9.7M with the gather's peak), 856M read across all turns. 9 h 18 min from the launch at 22:56 to the second review's end, 10 h 49 min to the landing. The rung workers took 47 to 151 minutes, and rung I's repair round 92.
- **Against the record's estimate**: 20 to 27 agents, 6.8M to 9.7M tokens, 7 to 10 hours (`CLIMB-BATCH-N.md:60`). Inside it, but for the 91 minutes unlanded.

### Misses, by kind

Kind, who caught it, whether it was in the briefing, and whether it landed.
- **Rung I:**
  - 96. Σ′ was not ranked whole: a generic declaration reached only by coercion was not compared with the plain ones. *Decision 1's rule, in the briefing* (the judgement's section 1). First skeptic; repaired.
  - 97. The numeral tie chose only among the tied declarations, so `pickn(3000000000)` beside `pickn(ZZ64)` was refused. *Q1's default as the judgement words it, in the briefing* (its section 4). First skeptic; repaired.
  - 98. A test asserted `ZZ,ZZ` green for `ZZ32` with `NN32` on the prelude, where answer 8 and the specification give `ZZ64`. *A decision, in the briefing.* First skeptic; repaired as `XXXInferPromoteNN32`.
  - 99. The fallback reported a call the rule accepts as not applicable. *Other: a design slip.* First skeptic; repaired.
  - 100. The shadow's two limits, the lambda argument and the 64-combination cap, had no gated test. *The owed-test rule, in the prefix.* First skeptic; rows 506 and 507, gated.
  - 101. Record lines claiming more than was built (rows 391 and 455, FACTS, stale line numbers). *Other.* First skeptic; corrected.
  - 102. Under an expected type, a declaration reached by coercion wins over a generic that fits (row 508), a reserved stop the rung did not list. *Decision 1, in the briefing.* Second skeptic. Landed as a reversible stop, gated, item 34.
  - 103. Two programs that now compile and die in the JVM (rows 447 and 505) were left home 3 by the rung, its first skeptic (`rung-inference-checker/SKEPTIC.md:339`), its judge (`JUDGE.md:138`), its second skeptic, the gather, the first review and the review's judge, although that judge's own standard for row 325, "no reading gives ... a clean compile, then a run-time `java.lang.Error`" (`JUDGE-review.md` section 2.2), settles them. *The owed-test rule, in the prefix.* Second review. Landed without tests; routed to 6.5b's rung E.
- **Rung K:**
  - 104. The coercion cache outlived a run. *The team's own device, `Init.initializeEverything`'s resets; not in the briefing.* First skeptic; repaired.
  - 105. Row 388's container shape was not asserted. *The ledger row, in the briefing (`ledger:388`).* First skeptic; repaired.
  - 106. The varargs shape had no home. *The owed-test rule.* First skeptic; row 511, gated.
  - 107. The rule's reach to user coercions was not stated. *A decision inside the rung, not reported.* First skeptic; stated, parked.
  - 108. Row 389's closure was wider than the fix: a coercion with its own static parameter is still refused. *The specification elsewhere (`conversions-coercions.tex:209-211`); not in the briefing.* Second skeptic; row 513, gated at the gather.
  - 109. A claim that the varargs binding stores values unconverted, false as measured. *Other: a claim by reading.* Second skeptic; corrected.
- **Rung T:**
  - 110. The chapter stated the rule for `bool` parameters, which neither path infers: the stop the rung's own section reserves. *The record, in hand.* First skeptic; narrowed.
  - 111. A callout wrong about the checker's refusal under `Any`. *Other: a claim by reading.* First skeptic; corrected.
  - 112. Appendix I's provenance of the numeral default. *Provenance.* First skeptic; corrected.
  - 113. The list of expected-type contexts missed two the checker has. *The checker's own code; not in the briefing.* First skeptic; corrected.
  - 114. No statement that a declaration fitting without coercion is chosen whatever the expected type. *Decision 1, in the briefing.* First skeptic; statement 12 added.
  - 115. The third callout's scope. *Other.* Second skeptic; corrected at the gather.
  - 116. Decision 4 rejected the bound as a candidate on two premises about rung I's code that the merged tree does not bear out (`JUDGE-review.md` section 1.3). *Another rung's code, by reading; not in the briefing.* The gather's check; the judge. The text stands; both paths gated (row 516).
- **Rung M:**
  - 117. `MAXNUM` and `MINNUM` left tied under walk. *A sibling site; not in the briefing.* Skeptic; row 517, gated at the gather, item 33.
  - 118. The precedents' provenance: `TotalComparison`'s three are the revival's. *Provenance.* Skeptic; corrected with `git blame`.
  - 119. The deviation line misstated the specification's `ZZ`. *The specification elsewhere.* Skeptic; corrected.
- **The gather:**
  - 120. It filed row 516 as home 3, "the decisions do not settle" it (`RECORD.md:155`). Decision 1's "narrowest ..., its bounds permitting" settles it for the union (`JUDGE-review.md` section 1.2). *A decision's words.* The review; the judge. Tests added before the push.
  - 121. It filed row 325's faces measured by M's and T's skeptics as notes without their owed tests, before and after its compaction (`RECORD.md:170`, `:209`). *The owed-test rule, in its prompt.* The review; the judge. Repaired before the push.
  - 122. Record slips: rung T's FACTS entry ended with the gather's instruction to itself; half of T.worker.10 missing from its parked line; rows 506 and 507 swapped in rung I's FACTS entry. *Other.* The two reviews; fixed.
- **The repair of the review:**
  - 123. It found that the judge's premise for `XXXInferLoneBoundUnion` held only in part and opened row 518 with its test (`REPAIR-review.md`, deviation 4). *A premise not measured by the judge.* Caught by the repair itself; landed gated.
  - 124. Its commit lacked the `historical:` line, and the record's row list lacked row 518. *Other.* Second review; recorded.
- **The batch record:**
  - 125. It worded T's rule and I's device as "the narrowest of its arguments' types and its bound" (`CLIMB-BATCH-N.md:245`, `:113`), the shadow's device, which decision 1's words do not give (`JUDGE-review.md` section 1.2). *A decision's words, planner-side.* The judge.
  - 126. It asked rung K for a count stage its edit cannot move (`CLIMB-BATCH-N.md:210`). *Other: a re-measure asked.* Not caught; ran.
- **Found by this review:**
  - 127. The chapter's claim to state no more than the checker builds (finding 1). *The record contradicted, between batches.*
  - 128. Rung S's files lack the chapter whose callout names S's revision (finding 1). *Between batches.*
  - 129. Items 33 and 34 without the defaults the record gives (findings 2 and 3). *Routing.*
  - 130. Six rows, the section-1 defaults and the rungs' lists for you without a line (Part 3). *Routing.*
  - 131. Two stale PLAN lines (finding 5). *Record.*
  - 132. Batch 6.5's review's measures 1, 2, 4 and 5 without a line (Part 3). *Routing.*
  - 133. The gather ran the coordinator's boot after its compaction and read the coordinator's transcript (question 1). *A rule outside its reader.*

### Against the earlier notes

- **Found inside the batch, like for like** (the earlier notes' kinds, without the "other" items 99, 101, 109, 111, 115, 122, 123, 124 and 126): 22 in 4 rungs, 5.5 a rung. Against 7 a rung in 6.5 (5.5 distinct), 3.5 in 7C and 2.8 in 6b to 7R.
  - A decision or ruling not used: 12 (96, 97, 98, 100, 102, 103, 106, 110, 114, 120, 121, 125). Five of them misread decision 1 (96, 102, 114, 120, 125); four are the owed-test argument (100, 103, 106, 121).
  - The team's or the checker's own code: 3 (104, 113, 116).
  - The specification elsewhere: 2 (108, 119). Provenance: 2 (112, 118).
  - Sibling sites: 1 (117). The ledger not read: 1 (105). A decision inside a rung not reported: 1 (107).
- **In the agent's own briefing: 7 of 22** (96, 97, 98, 102, 105, 110, 114), against 3 of 14 in 6.5 and 3 of 7 in 7C. Four more were in the prefix every agent reads (100, 103, 106, 121).
- **Who caught them.** The first skeptics 15, the second skeptics 2, the gather's check 1, the first review and its judge 3, the second review 1. The skeptics caught every rung-level miss but two: 116, which needed the merged tree, and 103, which every check before the second review passed.
- **The owed-test argument, a fifth batch running** (6b, 7R, 7C, 6.5, N). The rule sentence has been in the prefix since `f5d7b8feb`. Here it recurred in the rung (100, 106), the first skeptic and judge of I (103) and the gather (121). The misses that lasted longest were programs that compile cleanly and then fail at load or run (rows 447, 505 and row 325's `MAX` face), where the agents read the specification as silent. The judge's own sentence settles that class (measure 6 below).
- **Landed: 5** (102 and 117 by design and listed; 103 routed; 116 and 120, the text standing and both paths gated). The rest were corrected before the push.
- **Escaped every check in the batch: 7** (127 to 133), all between batches, in routing or in the rules, as in the earlier notes.
- **Severity.** Nothing touches a line of the model or blocks the switch-over. The worst are 127, a specification that claims an agreement four gated rows deny, and 103, two JVM crashes without tests until 6.5b.

### Re-measuring what the record held

- **No rung re-ran a stage on its unchanged base.** Every count and distance run was on an edited tree: rung I at 23:51 and its repair at 03:41, rung M at 01:57 and 02:01, rung K at 23:19 and its repair at 04:03 (the agents' transcripts). Your rule of 2026-09-28, 14:18 UTC, held (`POSITIONS.md:126`).
- **Rung K's count runs** measured a stage the record says K cannot move (item 126). A few minutes each.
- **The gather** ran on the merged tree tests the gate runs anyway (question 2). It did not re-run a skeptic's program on the tree the skeptic ran it on.
- **The second gate** began again with `compileAll`, the library, the count and the distance at 08:46, and was stopped at 08:52 (question 4).

### Measures the evidence supports, each with its cost

1. **The gather takes the rung texts from the run's journal, not its prompt, and copies none of them.** Evidence: question 2. Saves about 280K of its peak, 10 minutes and 30M read per four-rung run. Cost: a paragraph of the gather's role and one extraction command per missing file.
2. **One prefix sentence for a worker after a compaction**: its task is in its own transcript; the coordinator's boot and transcript are not its to read. Evidence: question 1. Saves about 70K and 2 minutes per compaction.
3. **A `land` decision for the merged-diff review's judge**, when every finding it upholds needs tests and records only; the ruling goes to the next batch's first rung and is listed for you. Evidence: question 4, item 1. Saves up to 54 minutes and 1.0M tokens on the critical path per blocked batch; the tests land a batch later.
4. **The second review runs beside the commit stage** after a repair of tests and records only, or the post-batch review takes its checks. Saves 17 minutes on the critical path.
5. **The gather files a reversible text mismatch as a reserved stop met, listed, not as blocking** (`CLIMB-BATCH-N.md:1544`). One sentence in the generator.
6. **One sentence in the three homes**: a program that compiles cleanly and then fails JVM verification, linkage or a range check at run time is settled by the specification under every reading, so it is home 2. It is the judge's own sentence (`JUDGE-review.md` section 2.2), and it would have caught 103 and 121. Cost: one sentence.
7. **The repair's new compiled tests run together in one JVM**, the one protection the gate rerun gave (batch 6.5's measure 1). A few minutes per repair.

## Part 3. Routing

Each item with its home on `main` at `6a196e355`, the coordinator's routing commit; PLAN.md is unchanged since.

**Rows the batch opened, 504 to 518** (ledger `:515-529`).
- 504, the union instance where the promotion names a type: fixed by rung I (`8dc1a74d9`), named in `PLAN.md:266`. Closed.
- 505, the solver's two behaviours: batch 6.5b's rung E, with row 447 (`PLAN.md:57`; `CLIMB-BATCH-6.5.md:26`). Has a home.
- 506, the 64-combination cap, and 507, the untyped lambda argument: gated, **no line**.
- 508: item 34 (`PLAN.md:180`). Has a home; its default is finding 2.
- 509, the instance split: `PLAN.md:245`, `:271`. 510, walk's expected type: `:269`. 512, the compiled union of three types: `:268`. 514, the strided range: `:276`. 516: `:273`. 517: item 33 (`:138`). Have homes.
- 511, walk's varargs and tuple positions: gated, **no line**.
- 513, a coercion with its own static parameter under walk: gated, **no line**.
- 515, a lone parameter beside a coerced argument refused: gated, **no line**. The judge's paired edit for row 516 closes it (`JUDGE-review.md` section 1.4).
- 518, an instance at a union refused as an argument: gated, **no line**.
- Home for the six: one parked line, "Climb batch N's gated inference gaps", naming each row with its test and the file its repair edits (`Functionals.scala` for 506, 507, 515 and 518, beside row 516's; `EvaluatorBase.java` for 511; `Coercions.java` for 513), off the path until the distance stage or microGPT meets one, the default being as landed. Row 507 is row 401's shape with a lambda, the one to measure first in phase 5.

**Defaults of the record's section 1** (`CLIMB-BATCH-N.md:20-48`, "What you decided on 2026-09-28" and "Read from the record, not asked"; "What the batch leaves out", `:58`).
- The judgement's defaults: `PLAN.md:245`. Q1's default as built: `:261`. The implicit bound: batch 7b's rung S (`:73`). Filed.
- The rest has **no line**: `ZZ32` with `NN32` giving `ZZ64` (built by I and K), rows 425 and 447 left open, I's ambiguity check keeping today's typing for an unconverted tie, the two runs, rows 437, 432 and 387 for run 2, `FloatLiteral` unchanged, batch 6.5's question 1 retired by run 2. Batches 7R, 7C and 6.5 each have one parked line for these (`PLAN.md:243`, `:246`, `:260`).
- Home: one parked line, "Climb batch N's first run's section-1 defaults", saying which were taken in run 1 and which wait for run 2, all as landed.

**Items for you.** 54 in the run (`n-run1-forpavol.json`, the coordinator's scratch). The 53 the agents routed are each in the PLAN.md entry they named (`batch-N-review/routing-items.txt`). The 54th, the second review's block, is in batch 6.5b's line (`PLAN.md:57`), by `6a196e355`. Filed. Findings 2 and 3 concern two of their defaults.

**The rungs' lists for you** (`CLIMB-BATCH-N.md:168`, `:223`, `:265`, `:314`: I's changed messages, attempts' order and refused calls by site; K's changed outputs and the edit to `bestMatchInternal`; T's chapter as a `pdftotext` diff with the entry; M's fifteen declarations as a diff). **No line**, and the landing message did not carry them (coordinator transcript `:45720`). This is batch 7C's miss 72 and 6.5's 93 again; the 7C review's measure 4, a parked line saying whether a list was sent, is still unbuilt (`PLAN.md:205`). Home: one parked line, "on file, not sent", with the four paths, or one rendered page.

**Re-asks.**
- Item 33's second half asks what decision 2 and the specification's `ZZ` answer, except the batch (finding 3).
- Item 34 asks a real question, where decisions 1 and 3 meet; it is not answered by POSITIONS or by an INDEX note (the conversion judgement, `INDEX.md:239`, does not treat the expected type). Its default is finding 2.
- No other item batch N added re-asks a decision or an INDEX note.

**Between batches.**
- Batch 6.5's review's measures 1 (suite-shaped test runs), 2 (a review's before-launch item timed to land), 4 (a reason line naming what to check) and 5 (a probe in its own worktree) have **no line**; PLAN.md's script line carries the 7C review's measures only (`PLAN.md:202-207`). Measure 1 is the protection the gate rerun gave (question 4). Home: the script-change line.
- Finding 1's text point belongs in batch 7b's record, rung S. Batch 6.5b launched at 09:52 and N's second run comes next, so this review's findings are addressed to N's second run (item 33) and to 7b.

## What I did not do

- I built nothing, ran no Fortress program and no gate stage, and edited no source, test, ledger, plan or record file.
- I did not measure whether a microGPT call meets row 507, or whether the six unlined rows reach the library; each is by reading.
- I did not hand-label the agents' searching. The overlap figure is a proxy by file name.
- The split of the gather's context by kind rests on the harness's per-call context counts; each step's growth is divided between its tool results and its own output at 0.40 tokens a character, the rate the large steps show, and the rest is its reasoning and per-call overhead (`classify_gather.py`).
- The prices of the three options in question 3 are arithmetic from this run's measured per-rung growth, not measured runs.
- I read the transcripts only through the scripts below and bounded greps. I did not measure this review's own cost.

## Files

`batch-N-review/`:
- `agents.py`, `measure.py`, `briefkeys.py`, `overlap.py`: `batch-7C-review/`'s scripts with the run set to `wf_4ba3c084-2b3`. `measure.py` writes `agents.csv` (committed, without the tier column) and `calls.csv` (not committed, 0.8 MB), which `overlap.py` reads.
- `aggregate_n.py` → `summary.txt`: Part 2's reading figures beside 7C's and 6b-7R's committed `agents.csv`.
- `briefkeys.txt`, `overlap.txt`: the keys each agent's briefing ran, and searching into briefed files.
- `run_agents.py` → `run_agents.tsv`: every agent's start, end, calls, context at its last turn and at its peak, and tokens read across its turns.
- `gather_calls.py` → `gather_calls.tsv` (and the intermediates `gather_calls.json`, `gather_steps.json` and `gather_kinds.json`, not committed): every tool call of the gather with its transcript line, time and sizes. `gather_steps.py` and `classify_gather.py` → `gather-context.txt`: the gather's context growth by kind, before and after its compaction. `gather_composition.py` → `gather-composition.txt`: question 2's figures.
- `routing_items.py` → `routing-items.txt`: each item for you against the PLAN.md entry that holds it.

Run from the directory, in this order, with `PYTHONDONTWRITEBYTECODE=1`: `python3 measure.py; python3 aggregate_n.py > summary.txt; python3 briefkeys.py > briefkeys.txt; python3 overlap.py > overlap.txt; python3 run_agents.py; python3 gather_calls.py; python3 gather_steps.py; python3 classify_gather.py > gather-context.txt; python3 gather_composition.py > gather-composition.txt; python3 routing_items.py > routing-items.txt`. `routing_items.py` reads the coordinator's scratch list of the 54 items.
