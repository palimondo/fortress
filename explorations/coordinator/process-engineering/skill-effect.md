<!-- Did the rewrite of the fortress-repo skill (landed 2026-10-08, with the batch workflow's redesign, six minutes before climb batch 11 began) change the quality of the batch workers' work or its token efficiency: climb batches 8 to 10 against 11 to 13 by the method of the earlier transcript studies (labor, checking-roles-cost, context-study, testing-practices, run again from their recovered scripts and shown to give the same figures), plus the new measure of which skill each agent loads and which parts it reads, and the reviews' quality figures set side by side; written 2026-10-09 to close the process-engineering study; read-only, no agent re-run, nothing built. -->

# The rewritten skill and climb batches 11 to 13: what moved, what did not, and what the skill can be credited with

Written 2026-10-09 and 10-10 for the coordinating session and the curator. Read-only: no build, no test, no Fortress program, no agent was run. Beside the note: the recovered scripts in `tools/transcript-study/` (its `README.md` says where each came from); the runs are scratch under `tmp/skill-effect/`, not committed.

## 1. The answer

- **There is no batch with the old skill.** The `fortress-repo` skill was first committed on 2026-10-04 at 10:34 UTC (`70736a81d`). Batches 8, 9 and 10 ran on 2026-10-02 and 2026-10-03, so they ran with no skill: 64 agents, none loaded one or read a file under `.claude/skills/` (section 3). Their procedures were a 39K to 47K character prefix at the head of every brief. The rewrite landed in the commits `24af7743b` (22:54 UTC on 2026-10-08) to `cae2a0ad5` (23:36); batch 11 began at 23:42. So the question is answered against "no skill, and the procedures in the brief", and the skill arrived with a new workflow (the skeptic fixes, no second skeptic, a judge only on a contested fix, briefs a third to a ninth of the old size).
- **Tokens written fell 15%, and the skill did not cause it.** The mean of a batch fell from 6.95M (8 to 10) to 5.89M (11 to 13); with the agents that restarts killed left out (batch 9's two rung workers, batch 13's two skeptic runs), from 6.73M to 5.69M. The refusal chain is the reason: second skeptics, repairs and most judges are gone (25%, 20%, 28% of the batch, then 2.7%, 5.4%, 6.3%).
- **What the skill costs is now measured.** Every one of the 51 agents of batches 11 to 13 loaded it with the `Skill` tool. That text is 8.0K tokens, and an agent then read 2 to 14 of its parts: 4K to 39K tokens by role, 36K for a rung worker. Together this is 0.47M, 0.58M and 0.65M a batch, 9.2%, 10.7% and 9.0% of the tokens written, and about 12% of the input-token equivalents (4.0M, 4.4M, 5.4M ITE). The redesign had priced it at about 0.2M and, for a rung worker, a net 5K less. It came to a net 19K more (first call 14K shorter, briefing 11K shorter, the skill 44K).
- **The briefs it relieved fell by about as much as the skill reads.** First calls fell from 1.44M a batch (mean of 8 to 10) to 0.74M. First call and skill together: 1.44M to 1.31M in tokens written (-9%), and 8.7M to 10.1M ITE (+17%). The first call fell by more than the skill replaced, because most of what left the briefs was not procedure (the worker's and the skeptic's reports that a judge's brief used to carry, the stops, the restores).
- **What the skill demonstrably changed is how agents learn to run things.** Calls that read a harness, suite, `env.sh` or probe source to learn how it runs fell from 254 to 60; shell scripts the agents wrote to run suites, `env` set-ups and probes fell from 41 to 13 (stage scripts 72 to 41 and stage-driver reading 113 to 75 fell least: the checker count's and the distance's usage is in no part of the skill, by the curator's decision of 2026-10-06; the ladder regression is, in `gate.md`); two traps the skill names ("a command over 120 s moves to the background", "`harness-one.sh` deletes a relative scratch directory") went from 28 events to 2. A rung worker's whole run fell 11% (535K to 477K, pooled over 14 workers in each period; 28K of it thinking, 11K one refill). Its reading beyond the brief, the writes before its first edit and the thinking share of a batch did not move; the share of reading that several agents repeat and the checking roles' share of a batch moved up.
- **Quality did not fall, and cannot be credited.** Every rung of all six batches was "in the spirit" in the reviews. Test-first misses, by the reviews' count: 0, 2 and 1 in batches 8 to 10, none in 11 to 13. No wrong value landed in any. The review found a blocking text in batches 8 and 9 (0.53M and 0.39M) and in none after. Each of these moved together with the new workflow, which also put the test-first check into the skeptic's brief. The six batches cannot separate the two (section 7).

## 2. The same method

The earlier studies' scripts were in a scratch folder that is gone. They are recovered from the transcripts of the workers that wrote the notes (`tools/transcript-study/README.md`): labor.md by `a65c4632fd664fceb`, checking-roles-cost.md by `aa122ba984c79739f`, context-study.md by `a291b83dd2cbf44d4`, testing-practices.md by `af6381052a41159c8`. The fifth, harness-cache-cost.md, was written by `a73f6b1aaa732ba74`, whose transcript is in neither the live folder nor the backup; its scripts are not recovered and its figures are not reproduced.

They were shown to be the same scripts two ways. The text of five of them was found printed in a later author's transcript and matched. And each author's own calls were run again, in order and as written, and each output compared with the stored one: 313 of 353 outputs are equal, and the 40 that differ are explained (a repository or a record that has changed, the last digit of a float, Python 3.13's traceback marks, a stub the harness made of an output over 30K characters, the tool's own "Exit code" line, and four calls that edit a note's prose); `tools/transcript-study/README.md` lists them. The headline figures of the notes, reproduced by the recovered scripts on batches 8 to 10:

- **labor.md** (batches 8 and 9): 43 agents, 14,604,200 written (7.72M and 6.88M). The fixed start 2,841K, 19.5%; thinking 3,922K, 26.9%; tool results 5,900K, 40.4%; the calls' own text 1,468K, 10.1%; refills 479K, 3.3%. Checking roles 6.26M, 42.9%; rung workers 36.7%; the refusal cycle 3.34M (3,337K here is 22.8%; the note rounds it to 22.9%). The fixed part by role 8, 19, 31, 33, 23, 17, 59, 19, 35, 35, 50%. A rung worker's reading beyond its brief 54.4K, 10% of its writes (skeptic 22.8K, 7%). Writes before the first edit 32% to 67% for the eight that finished, the killed S at 89%. What several agents read alike, 1,394K of 4,729K, 29%.
- **checking-roles-cost.md** (batch 10): checking roles 2,325K, 37.1% of 6,262K (skeptics 1,192K, judges 623K, second skeptics 510K), 33.0% and 30.2% in batches 8 and 9; per agent 232K, of which the brief 54.0K (23%) and thinking 56.1K (24%). The refusal chains 1,749K, 27.9% (also `batch-measures.py`: 1.75M).
- **testing-practices.md** (batches 8 to 10): 119.5M ITE (46.4M, 36.0M, 37.1M); 27 of 42 working agents wrote a shell script of their own; the practices by call, from which the note's 3M (2.8%) was summed by hand.
- **context-study.md** (batch 10's four rung workers): writes to the first fix edit 282K, 356K, 334K, 390K; the four workers 23.51M ITE; the three knowledge classes 0.93M ITE, 4.0%. These come from the author's hand labels of calls (`verdict.py`, `summarize.py`), so the run proves the arithmetic and the classes, not the labelling.

## 3. The skill, as the agents met it

`tools/transcript-study/skill-load.py`, new for this note, reads each agent for its `Skill` calls, the text the harness injects for them, and every call that names a file under `.claude/skills/`. Results, from the run directories:

- **Batches 8, 9 and 10:** 64 agents, no `Skill` call, no read of `.claude/skills/`, no brief that names the skill.
- **Batches 11, 12, 13:** 14, 17 and 20 agents, all loaded `fortress-repo` (the brief names it, the first calls are `Skill`), none loaded another skill.

| | Batch 11 | Batch 12 | Batch 13 |
|---|---|---|---|
| Load text (tokens, 8.0K each) | 106K | 130K | 153K |
| Parts read: calls, tokens | 203, 359K | 245, 453K | 248, 494K |
| Together, of the tokens written | 465K, 9.2% | 583K, 10.7% | 647K, 9.0% |
| Together, in ITE | 4.02M | 4.35M | 5.39M |
| Of the batch's ITE | 11.5% | 12.9% | 11.9% |

By role, over the three batches, the load text is 8.0K and the parts read are: rung worker 36.4K (14 agents), skeptic 27.4K (16), gather 38.7K (3), review 25.7K (3), cold reader 25.7K (3), gate 12.3K (3), commit 8.3K (3), judge 4.3K (6). The load and the parts are 9% to 10% of a rung worker's or a skeptic's writes, 21% of the cold reader's, 16% of the gate's.

The parts read most, calls over the three batches: `revival-changes.md` 138 (the cold reader 12, 17 and 20 times in the three batches, the gather 11, 12 and 8), `build-and-caches.md` 49, `tests-running.md` and `tests-writing.md` about 45 each, `committing.md` 53, `records.md` 41, `session.md` 41, `worktrees.md` 36. A rung worker read 11 to 13 parts: the standing set (build, session, worktrees, committing, records, gate, tests-writing, tests-running) and one or two for the area.

Against the price. The redesign (`batch-redesign.md`, section 5) put the skill at `SKILL.md` plus six to eight parts, about 33K tokens for a rung worker, and a net of 5K less than batch 10, and the whole load at about 0.2M a batch. Measured: 44.4K for a rung worker, against a first call 14K shorter and a briefing slice 11K shorter (pooled over 14 workers in each period): a net 19K more; the whole 0.47M to 0.65M. The prefix of batch 10's briefs was 47.1K characters, 20K tokens; `checking-roles-cost.md` found 22K characters of it, 9.5K tokens, overlapping procedures the skill holds. The skill costs two to three times the procedure text it displaced (9.5K tokens an agent, 0.2M a batch), and adds what the briefs never held (`revival-changes.md` is the most-read part).

The skill itself changed during the three batches: `7b3226bb2` after batch 11 (six sentences false, `run_bg` refused nine times), `38def33a9` after 12, `6c021c983` after 13. The reviews count the sentences each batch left false or missing: 6, 1 and 4.

## 4. Before and after, by mechanism

Batches 8, 9, 10 on the left, 11, 12, 13 on the right. Written is input plus cache creation, one count per message id; ITE is `testing-practices.md`'s (cache write 1.25, cache read 0.05 for each later turn, fresh input 1, output 5).

| Mechanism | B8 | B9 | B10 | B11 | B12 | B13 |
|---|---|---|---|---|---|---|
| Written (M) | 7.72 | 6.88 | 6.26 | 5.03 | 5.43 | 7.22 |
| Written without restart-killed agents (M) | 7.72 | 6.21 | 6.26 | 5.03 | 5.43 | 6.61 |
| Agents, rungs | 21, 4 | 22, 4 | 21, 4 | 14, 4 | 17, 5 | 20, 5 |
| Per rung, all roles (M) | 1.93 | 1.72 | 1.57 | 1.26 | 1.09 | 1.44 |
| ITE of the batch (M) | 46.4 | 36.0 | 37.1 | 34.9 | 33.6 | 45.4 |
| First calls (M, % of written) | 1.44, 18.7% | 1.40, 20.3% | 1.47, 23.4% | 0.62, 12.3% | 0.72, 13.2% | 0.89, 12.3% |
| First calls started cold | 12 | 12 | 10 | 8 | 8 | 10 |
| Brief, tokens: rung / skeptic / judge | 30K / 44K / 63K | 31K / 46K / 49K | 35K / 51K / 61K | 13K / 19K / 9K | 15K / 20K / 10K | 15K / 20K / 12K |
| Skill: load and parts (M written) | 0 | 0 | 0 | 0.47 | 0.58 | 0.65 |
| First calls plus skill (M written) | 1.44 | 1.40 | 1.47 | 1.09 | 1.30 | 1.54 |
| First calls plus skill (M ITE) | 9.7 | 7.9 | 8.5 | 8.9 | 9.4 | 12.1 |
| The facts-extract briefing read (K, %) | 429, 5.6% | 459, 6.7% | 344, 5.5% | 214, 4.3% | 234, 4.3% | 257, 3.6% |
| Reports and transcripts of the chain read (%) | 4.4 | 7.1 | 5.7 | 7.5 | 8.3 | 7.0 |
| Own thinking and narration (% of written) | 26.8 | 26.9 | 25.2 | 27.0 | 27.7 | 29.9 |
| Cache refills (K) | 466 | 13 | 4 | 4 | 4 | 312 |
| Builds by workers (library orders) | 13 (10) | 13 (0) | 10 (1) | 7 (3) | 5 (1) | 2 (4) |

Reading, one line each:

- **The start.** The brief is where the saving is: a rung worker's fell 17K to 20K tokens, a skeptic's 25K to 31K, a judge's 38K to 54K (the judge no longer carries the worker's report and the skeptic's verdict whole). The harness's own start (system prompt, tools, attachments) did not change: 11K to 19K written for a rung worker or a skeptic in every batch. Cold starts fell from 12, 12, 10 to 8, 8, 10 because there are fewer agents.
- **Reading the record.** The briefing slice (`facts-extract`) fell from 5.9% to 4.1% of the batch (means), and the record documents read directly stayed at 4.6%, 4.3%, 4.5% against 5.0%, 5.2%, 3.6%. The reports and the transcripts of the chain rose from 5.7% to 7.5% because the skeptic now reads the worker's report from the branch instead of receiving it in the brief. The two moves are the redesign's.
- **The rung worker moved a little.** A rung worker's writes are 667K, 448K, 532K a worker in batches 8 to 10 and 497K, 410K, 528K in 11 to 13 (batch 9's mean includes the killed attempts); pooled over the 14 workers of each period, 535K and 477K. The class means that fell most are thinking (-28K), the start (-14K), the briefing slice (-11K), one refill (-11K: batch 8's 466K against batch 13's 312K, over 14 workers) and the reads of the ledger, the specification, the source and the library (-18K); the one that rose is the skill's (+44K). The difference is inside the spread between batches. Thinking, over all roles, is 25% to 27% of a batch in 8 to 10 and 27% to 30% in 11 to 13, because the skeptic now thinks more. Before its first edit a rung worker has written a median 52% of its total (twelve finished workers, range 22% to 69%) in 8 to 10, and 46% (fourteen, range 24% to 66%) in 11 to 13. Its reading beyond the brief is 63.5K, 12% of its writes (batches 8 to 10), and 56.3K, 12% (11 to 13); a skeptic's 24.1K, 8% and 31.9K, 9%. Of the files a rung worker read that its brief did not name, 77% and 82% were named in its briefing or on record.
- **What several agents read alike did not fall.** The share of all reading that an earlier agent of the batch had already been given is 29%, 30%, 21% in batches 8, 9, 10 and 30%, 30%, 33% in 11, 12, 13. For rung workers it rose from 4% to 7% (14% in batch 9, where the resumed workers re-read their killed predecessors) to 17%, 18% and 18%, and the skill's parts are the cause: every agent reads the same text, and the prompt cache does not serve it (only a whole identical prompt is read from the cache; FACTS, "The Workflow harness runs two agents at once on this box"). The skill is shared reading by design.
- **How agents learn to run things fell, where the skill covers it.** By the recovered `practices.py`, over all agents, calls in batches 8 to 10 against 11 to 13: reading a suite, build or test source (`build.xml`, `FileTests.java`, `*JUTest.java`) 128 to 36; reading `harness-one.sh` or `junit.sh` 45 to 8; reading `env.sh` 31 to 5; reading `Shell.java` or `bin/fortress` for a probe 50 to 11; reading a stage driver 113 to 75. Shell scripts written to run something: suite 7 to 0, `env` 14 to 1, probe 20 to 12, stage 72 to 41. Traps: "a command over 120 s moved to the background" 22 to 2; `harness-one.sh` relative scratch directory 6 to 0; `sleep` before another command 18 to 8; the automatic permission check refusing a call 13 to 9 (all nine in batch 11, the skill's `run_bg`, fixed after it). By `cost.py`, the reading to learn (`learn-by-reading`) is 590K, 488K, 670K ITE (1.5% of the three batches' 119.5M) and 192K, 170K, 173K ITE (0.5% of 112.6M). Per working agent (13, 15, 14 against 8, 10, 12) the reads of suite, harness and env sources are 4.9 calls and 1.6. The `-debug stacktrace` flag, which `context-study.md` found in no part of the skill, is named in three parts now, and batch 13's workers used it 13 times.
- **The checking chain is the redesign's.** Checking roles (skeptics, judges and, before, second skeptics) wrote 33.0%, 30.2%, 37.1% of the batch in 8 to 10 and 34.5%, 36.1%, 42.2% in 11 to 13. A skeptic now writes 399K, 333K, 371K against 334K, 309K, 298K, and the second skeptic (0.70M, 0.40M, 0.51M), the repair round (0.72M, 0.56M, 0.62M) and most of the judges (0.52M, 0.45M, 0.62M against 0.14M, 0.30M, 0.46M) are gone. Refusal cycles: 25.0%, 20.4%, 27.9% of the batch against 2.7%, 5.4%, 6.3%.

The skill's own account is short. It displaced procedures from the briefs (about 9.5K tokens an agent by `checking-roles-cost.md`'s measure, 0.2M a batch), it taught the agents to stop re-reading how to run a suite, and it costs two to three times what it displaced to read.

## 5. Quality, side by side

Taken from the reviews (`reviews/batch-8-review.md` to `batch-13-review.md`, Part 2 and the conformance part). Read only; none of it is re-judged. The two periods report different things in places, and the table says so.

| | B8 | B9 | B10 | B11 | B12 | B13 |
|---|---|---|---|---|---|---|
| Rungs: verdict | 4 in the spirit (O made so by a refusal) | 4 in the spirit (S after its refusal) | 4 in the spirit (C and N made so by a refusal) | 4 in the spirit (1 made so by the skeptic's fixes) | 5 in the spirit (1 by a fix; W with two readings departing from the chapter's letter) | 5 in the spirit (V for what landed; N and W each with an edit outside the section) |
| Skeptic fixes (kinds) | none: the skeptic refused or approved, and a correction was left to the gather | none | none | 19: 16 corrections, 3 defects of the change (2 settled, 1 contested) | 15: 13 corrections, 2 defects (both contested) | 23: 19 corrections, 4 defects (3 contested by clause (c), 1 on its merits) |
| Refusals (rungs) | 2: Q and O, both a defect of the change | 2: S a defect (strided slice gave wrong characters), W three departures with no home and no code | 3: N a defect (a test helper passing silently), C a defect (checker crash), G a missing assertion, no code | 0 | 0 | 0 |
| Rulings | 2 judges (Q, O), both a repair | 2 judges (S, W), both a repair; W's needed no code | 3 judges (N, C, G), all a repair; every second skeptic approved; G's needed no code | 1 (C), upheld | 2 (W, C), upheld | 3 (N, G, W), upheld; one correction inside W's ruling is wrong (row 407's line) |
| Cost of the second round (M, % of batch) | 1.93, 25.0% | 1.40, 20.4% | 1.75, 27.9% | 0.14, 2.7% | 0.30, 5.4% | 0.46, 6.3% |
| Found inside the batch | 30 (7.5 a rung) | 31 (7.75) | 39 (9.75) | 39 (9.75) | 30 (6) | 45 (9) |
| of which by | first skeptics 15, second skeptics 6, workers 8, judge 1 | first skeptics 18, workers 7, second skeptics 3, review 2, gather 1 | skeptics 24, workers 12, review 2, judge 1 | workers 19, skeptics 16, gather, review, cold read, commit 1 each | workers 14, skeptics 10, gather 3, review, cold read, commit 1 each | workers 23, skeptics 16, gather, review, cold read, commit 1 each, process 2 |
| of which "the change wrong" | 4 | 2 | 2 | 3 | 2 | 4 |
| of which "a new rule's effect elsewhere" | 6 | 7 | 7 | 5 | 6 | 5 |
| of which "a premise of the record that does not hold" | 5 | 4 | 4 | 3 | 2 | 5 |
| of which "text or a record claiming more than the paths do" | 6 | 5 | 4 | 6 | 7 | 4 |
| of which "provenance and citations" | 2 | 1 | 1 | 1 | 0 | 0 (in the text class) |
| of which "the team's own code" (rows opened) | 7 | 7 | 16 | 18 | 11 | 24 |
| Found by the review, after every role (escaped the batch) | 9 | 8 | 6 | 7 | 6 | 9 |
| Blocking finding of the review | yes: Q's Effect on `=`, 0.53M, a second gate | yes: K's sentence, 0.39M | none | none | none | none |
| Wrong value landed | none | none | none | none | none | none |
| Test first: workers | Q, O, M yes; I wrote its edit before it read the failure | R, S yes; K two tests after their fixes; W assertions failing on the base only by probes | W, G, N yes; C two tests after their fixes | all four | all five | all five |
| Test first: misses by kind | 0 (and I, above) | 2 | 1 | 0 | 0 | 0 |
| The library's way (conformance part) | M and Q yes; O and I the tree's own devices | R, S the library's devices | G and N yes; W and C the team's own devices | L yes; W, C, E the team's own devices | S, G, R yes, each with precedent lines; R's 16 new api declarations and S's removed `put` not put to the curator | O, G, N yes; of the record's three extensions one reached him (G's `|self|`), two did not (O's `LEXICO`, G's pairs object) |

How to read it.

- **The skeptic's work changed shape; it did not stop finding things.** Before, the first skeptic refused (7 times in 12 rungs: five defects of the change and two with no code, one missing home and one missing assertion) and the rest of the cycle repaired. After, the skeptic fixed: 57 fixes in 14 rungs, 9 of them defects of the change (3, 2, 4), the rest corrections. Five defects in 12 rungs, then nine in 14. The review of batch 12 puts it so: "13 corrections against 16", two defects against three.
- **What the later roles still catch is record, not code.** Found by the review: 9, 8, 6, then 7, 6, 9. Batch 11's review says nothing in code slipped; the gate was green on its first run in all three.
- **Test first is the one count that improved.** The rule is in the briefs of both periods; the redesign added the skeptic's check ("a skeptic's added test seen failing on the base") and the skill names the rule (`tests-writing.md`). Two things changed on it at once, and the reviews do not separate them.
- **Misses of the record do not fall.** Premises of the record that did not hold: 5, 4, 4, 3, 2, 5. Text or a record claiming more than the paths do: 6, 5, 4, 6, 7, 4. The library's way held for every rung that edits the library in all six batches; the places where the library rule says the curator judges did not always reach him as items: in batch 12 R's 16 new api declarations and S's removed `put` (finding 394), in batch 13 two of the record's three extensions (445); batch 11's L put its widened types to him.

## 6. Confounds

- **The redesign landed with the rewrite.** The same hour brought the skeptic that fixes, no second skeptic, a judge only on a contested fix, lean briefs, the journal-written reports, the numbering of ledger rows by the gather, the cold reader, `batch-measures.py`. Every figure in section 4 that depends on the number of roles, on what a brief carries or on what a skeptic does is the redesign's first, and the skill's only where it is said.
- **The skill was not in the "before".** There is no batch with the old skill to compare with the new one. What is measured is "no skill" against the rewritten one.
- **The batches' work differs.** Batches 8 to 10 repaired walk's Meet Rule, instance rule, load checks, the compiled checker's defects and the library's slips; batches 11 to 13 the checker's expected type, the ranges, walk's load checks and, in 13, size arithmetic, the orders and the generators. The distance fell 565 to 340 to 253 in 8 to 10 and 253 to 207 to 153 to 105 in 11 to 13. Batch 12 had five rungs (1.09M a rung); batch 13 had five, with rung N "at about one and a half rungs since it builds two judgements' rungs in one" (`CLIMB-BATCH-13.md`), so its per-rung figure is 1.31M if N counts as one and a half, and 1.20M without the stopped skeptic runs as well.
- **Restarts re-ran agents.** In batch 9 a VM restart killed rung workers W and S (359K and 318K written, 0.68M, 9.8% of the batch), which were resumed from their transcripts. In batch 13 the VM restart stopped two skeptic runs (O 316K, W 291K, 0.61M, 8.4%); skeptic O's second run built on the first's commits. The adjusted totals are in section 4. Batch 13's rung V also refilled its cache once, 309K, after a 600 s foreground stage, against the skill's 270 s rule; batch 8 had one refill of 466K.
- **The skill changed between batches.** Three batches ran on three states of it. The `Skill` load text is 8.0K in all.
- **Small counts.** The reviews count what happened in six batches, four or five rungs each. The differences in section 5 are one or two events.
- **Costs are not the same across the notes.** Tokens written (the study's measure) fell 15% and ITE (which weighs the cache reads of long contexts) fell 5%, 39.8M to 38.0M. Both are given.
- **Not done.** Context-study's fact-by-fact verdicts (which of a worker's findings the record already held) are hand labels and were not repeated for 13 more workers; the batch-10 figure (15 whole, 15 in part, 13 not of 43 facts; 0.93M ITE, 4.0%) has no counterpart for batches 11 to 13. The briefs of 11 to 13 have another form than 8 to 10's, so the judge-brief echo scripts (`echo.py`, `echo2.py`) were not run on them. harness-cache-cost.md has no recovered script.

## 7. What can be attributed to the skill, and what cannot

Can be:

- **Its cost.** 8.0K tokens of load and 2 to 14 parts, 0.47M to 0.65M a batch, 9% to 11% of the tokens written and about 12% of the ITE, read by every agent; the price the redesign put on it was low by two to three times.
- **The retreat of one kind of relearning.** Where the skill has a part for a practice (suites and the harness, `env.sh`, the 120 s default, the relative scratch directory, hand-written suite and env scripts), the calls that learned it again fell by 70% to 100%. Where it has none by the curator's decision (the checker count and the distance), they fell by a third. That contrast is the nearest thing to an experiment these batches hold, and it points the same way twice.
- **Shared reading.** The repeated reading of rung workers (4% to 14% before, 17% to 18% after) is the skill's parts read by each.
- **A way for what a batch learned to reach the next.** The gather folds each rung's entry into `revival-changes.md`, and the cold reader rereads it (12, 17 and 20 reads in the three batches); the next batch's workers meet the entries through the skill. That the entries carry, and prevent a miss, is a quality question these batches do not answer.

Cannot be:

- **The fall in tokens written** (15%), the first-call fall, the refusal chain: the redesign's, and the skill is in the first call's trade only as the carrier of what left the briefs.
- **The rung worker's 11% (58K).** Its thinking fell 28K and its start and briefing 25K, against the skill's 44K. The leaner briefs are the redesign's; thinking depends on the rung, and the batches' work differs.
- **The quality figures.** Test first, the count of defects, the verdicts and the blocking findings changed in the same hour and by the same agent brief. No batch ran the skill with the old workflow, or the new workflow without the skill.
- **The misses of the record and of the library's own way.** They did not fall, with the skill in hand.

A clean test is small. In one batch, give two rungs of one kind (two library slips, or two checker rungs) the same lean brief, one with the skill and one with the old prefix in its place, and read the same figures: the first call, the reading to learn, the test-first check, the misses. It adds about a rung's tokens to a batch, needs the old prefix (it is in git) and is the curator's to ask for.

## 8. What the study leaves

- `tools/transcript-study/` is the study's reusable process: for each later post-batch review, `batch-measures.py` and `skill-load.py` on the new run, `run-study.py` for labor, testing-practices and checking-roles over it and the batches before it. The form of section 4 is the table to repeat; adding batch N needs its run id and base commit in `run-study.py`.
- Three things in the skill's cost deserve a look before the next batch: `revival-changes.md` is read 138 times in three batches and is the largest part read; the rung worker's standing set of eight parts is read by every worker whatever the area; and the cold reader and the gate spend 16% to 21% of their writes on the skill. These are for the skill writer, not decisions here.
