<!-- The synthesis of the post-mortem of 2026-09-29: the new batch practice, stated stage by stage; the four questions the post-mortem left open, each checked against his decisions (since settled: POSITIONS, "The new batch practice, and what he expects of it."); the token arithmetic; and the exact changes to the batch script, its manual and the protocol. Written by a Fable worker for the coordinator, from the two reviews (review-opus.md, review-fable.md), the two archaeologies, characterization.md's shares and measures-6.5b.md, and POSITIONS.md's entries of 2026-09-17 to 2026-09-29; nothing measured anew. Readers: the Opus worker that rewrites the script, the manual and the protocol tonight, and Pavol in the morning (section 6). -->

# Synthesis: the batch practice after the post-mortem of 2026-09-29

What this is judged by, in Pavol's words of 21:09 UTC: "showing me that you can be token efficient and not do bullshit jobs that you invented yourself." So the practice below spends tokens on the Fortress change and its test, and on little else. What he has decided is taken as decided (section 5); what he left to defaults is in section 2, each default checked against his decisions; the lines to change are in section 4.

The two reviews agree on the five decisions and differ on two things. Where scratch goes: Pavol settled it at 20:42 UTC, nowhere, not on any branch (POSITIONS 2026-09-29, what a batch commits); the Fable review's `record/` branches are not taken. Which review loops stay: section 2(b).

## 1. The new practice

Each stage: what it reads, what it produces, what it commits. What `main` holds is the same everywhere: the Fortress change (source, library, specification text, tests), its report, the ledger rows, the FACTS and plan lines, the handover line, and a script that is reusable. No captured output, log, raw output, probe program, copy of a script or test, list or dump is committed anywhere, on `main` or on a `wip/` branch. Scratch lives under `tmp/<slug>/` in the agent's worktree, which `.gitignore:64` (`/tmp/`) already ignores; the worker's transcript, which the backup keeps, is the record of how it got there.

### The rung worker

- Reads: its briefing (step 1, the mission briefing of 2026-09-27, unchanged: the POSITIONS entries, ledger rows, rulings and library precedents its tail names, printed by `facts-extract.sh`), its rung's section of the batch record as its tail carries it, and the Fortress tree. It does not read the whole batch record.
- Does, in this order. Writes the test first: the ledger row's reproduction as a clean minimal test of the core problem, not the probe's shape ("think about it what's the core problem and capture that", POSITIONS 2026-09-17 as extended 2026-09-29), named for what it checks, into the corpus the rung belongs to. Runs it through the harness on the unchanged tree and sees it fail. Commits the test alone on its `wip/` branch, first commit. Makes the edit, as small as the test needs. Rebuilds. Runs the test again and sees it pass. Commits. Runs the ladder subset for the files its names were blocking, after the edit only (the before is the last landed gate's ladder stage, or the baseline's recorded output for a file the gate does not run). A `testIsStage` rung runs the count stage after its edit (20 s) and starts the distance stage in the background at the edit, reading it at the end of its steps; the before is the last landed gate's tables (POSITIONS 2026-09-28). Greps both corpora and `src/` for competing declarations. Gives every defect it measures one of the three homes. Writes `REPORT.md` and `record.md`. Commits and pushes as it goes (POSITIONS 2026-09-26).
- Produces: `REPORT.md` (what changed and why; the failing run's two to five lines quoted with the command; the passing run's line; the precedent; the specification passages; the provenance block's five lines; the differentials in a sentence each; the three homes; the section for Pavol), `record.md` (the FACTS line, the ledger note, the handover line, as finished prose), and its scratch under `tmp/<slug>/`.
- Commits, on its branch: the test, the edit, `REPORT.md`, `record.md`. Nothing under `probes/`; no capture; no copy of a tool.
- Does not: run the corpus comparison, the microGPT checks, a ladder before, a build log capture, a machine line, the tracked-path check, or `ant testFast`/`testSystem` (the gate is once per batch, POSITIONS 2026-09-17).

### The skeptic

- Reads: the `checks` slice of the briefing, the diff in the worker's worktree, `REPORT.md` and `record.md` there, and the scratch under `tmp/<slug>/` where the report quotes it. The worker's transcript is on disk if a run cannot settle a question (Pavol, 20:42 UTC).
- Does: the checks as now (the provenance block, the diff against the specification, the precedent, the test, the competing-declaration grep, the record fragment, the three homes, the count table for a stage rung, the ledger and sibling sites, the decisions on record), with check 3 changed: it checks out the worker's test-only commit, or puts the test on the base alone, runs it through the harness and sees it fail; then runs it at the branch's head and sees it pass. Its own differential programs, as now, under `tmp/<slug>/skeptic/`, walk against the compiled path, at one and four threads for a `writesState` rung.
- Refuses only for the change or the test: the change is wrong or larger than its test needs; the test does not test the defect or cannot be seen failing on the base; a sibling defect has no home; a decision on record was not followed. A citation off by a line, a wording, a missing cross-reference is a required correction, not a refusal (Pavol, 2026-09-22: "if we gave it the evidence that we gathered, it should not reject").
- Produces and commits, on the rung's branch: `SKEPTIC.md`. No probes, no captures.

### The refusal cycle

- As now: one refusal, one judge ruling (Opus; a second ruling on the same rung on Fable, POSITIONS 2026-09-26), one repair round in the same worktree, one second skeptic. The judge reads, rules, runs nothing. The repair commits as the worker does. `JUDGE.md` and the second `SKEPTIC.md` round land; nothing else.

### The gather

- Reads: the branches' diffs, the rungs' `REPORT.md`, `record.md`, `SKEPTIC.md`, `JUDGE.md` from the tree, and the journal for texts the branch does not carry (the manual's item 3 of 2026-09-29).
- Does: applies each branch's net change to `main` in lowest-edited-line order; folds `record.md` into `FACTS.md`, the ledger and the handover; re-anchors `file:line` citations another rung's hunk shifted; closes required corrections; opens or refuses recommended rows; files items for Pavol in `PLAN.md`; writes `RECORD.md` once.
- Commits, one commit per rung: the source and tests, `REPORT.md`, `SKEPTIC.md`, `JUDGE.md` and `decision-record.md` if any, the three record files, and `PLAN.md` when it wrote to it. `record.md` is folded, not landed. Nothing else under the rung's folder. No tracked-path check afterwards: there is nothing to track.

### The gate

- Runs, unchanged: `compileAll`, the library rebuild, `testFast`, `testSystem`, the summary and its comparison, the four-thread `atomic` runs, the ladder regression over the 85 files and the eighteen microGPT components compiled only, the checker count, the distance stage. It is Pavol's permanent check (POSITIONS 2026-09-17), and the ladder stage is the one golden-output comparison on the compiled path.
- Its context is small: its prompt is the shared prefix without the batch-record read (section 4) and its own steps. It polls its long runs with `wait_for` at 270 s (section 3).
- Produces under `tmp/gate-batch-<N>/`: the logs, never committed; `summary.txt`, `checker-count.txt`, `distance.txt`, `ladder/`, `errors.tsv`.

### The merged-diff review and its repair

- One review, beside the gate, as the redesign of 2026-09-24 has it. Reads the merged diff and the folded record; never builds. Its checks as now less the tracked-path check (8) and the count-table check (9), which moves to the post-batch review so that the review does not wait on the gate's table.
- A blocking finding that touches source, library, checker, interpreter or specification: one judge (Opus), one repair, and the gate runs again on the repaired tree. A finding settled by tests and records only: no judge, no repair; the review lists it, it goes to the next batch and is listed for Pavol (his rule of 2026-09-29 on not stopping for petty reasons, made the default instead of a judge's fourth option).
- No second review inside the batch. The post-batch review is the second look.

### The commit

- Fills the hashes; adds the gate's `summary.txt`, `checker-count.txt`, `distance.txt`, `ladder/` to the batch's `gate/` folder, and the per-site list to one fixed path overwritten at each landing; rebuilds the specification PDF once when the batch changed `Specification/` and adds it, with no build log; checks footers; pushes `main` and the container branch; removes the worktrees, their `tmp/` with them; starts the two microGPT programs under walk in the background on the landed tree and does not wait (the separate non-gating stage of POSITIONS 2026-09-19); the coordinator reads the result file at the landing report or the post-batch review.
- The push is held on a stop that is met and not lifted, as now (POSITIONS 2026-09-26).

### The landing report

One message from the coordinator, the same text as the first section of `RECORD.md`, written once. Lists, numbers as K or M: each rung in one line (what Fortress now does that it did not, by which decision; lines of code, specification and tests; tests added, plain and `XXX`, and promoted); the gate in one line (green, the suites' counts, the checker count and the distance with their moves); what it bought toward the goal; what it cost (the harness figure from the run's journal, agents, hours, against the record's estimate); what it committed, as two numbers, Fortress files and record files; every item for his word, one line each, the rungs' "What comes back to Pavol" lists among them, or "none".

### The combined post-batch review

- As decided 2026-09-28: one Opus reviewer after every landing, reading only, before the next batch launches; the conformance review, the process measures and the routing check in one pass. It gains the merged-diff review's count-table check (each moved count row tied to a rung edit) and one paragraph, what the batch spent against what it changed.
- Reads: the landed tree, the reports, the gate's tables, and the transcripts where a question needs them.
- Commits: its review file only. Its measuring scripts are one shared tool under `coordinator/tools/`, not copied into each review's folder.

## 2. The four remaining questions

Each recommendation is the default from tonight and is listed for Pavol's review (section 6). Each is checked against the entries of POSITIONS named in the coordinator's brief: 2026-09-17 (test first, extended 2026-09-29), 2026-09-18, 2026-09-24, 2026-09-26, 2026-09-27, 2026-09-28 and the four of 2026-09-29.

### (a) The corpus-wide output comparison, run three times per rung

Default: removed as a standing rule. No rung runs the interpreter corpus to compare outputs. A value that matters is asserted in the rung's own test (`assert` in the interpreter corpus, `run_out_equals` in the compiled corpora), the suite's own mechanisms, which PLAN wrote down on 2026-09-17 without his yes ("Golden output where a value matters … Applied per test", `PLAN.md`; `archaeology.md` § 6). The reserved stop "an interpreter output a rung cannot account for" goes with it; the stop that remains is a test whose verdict changed other than the rung's own, which the gate sees.

Why: it grew from two one-off counts he agreed to into a standing three-run rule nobody put to him (archaeology § 5). In the rung reports the Opus review read it found no defect the suite missed; batch 4's eleven changed outputs all went from exit 0 to exit 1 and the gate would have caught them. Its cost was 27.2M of cache writes after waits over the batches, about half of 6.5b's new tokens, two to four hours of JVM time per batch, the box at load 8 to 36, one rung killing another's runner (row 532). The 18 tests that vary from run to run are all the team's own and pass or fail correctly (measures-6.5b.md). His words at 18:52 UTC: "If, if you need this like we if it's some like if it's necessary what you are saying, then we need to redesign how the test suite for Fortress is working. … why would you have to run it multiple times at the beginning to establish some kind of baseline? Like, what is the purpose of a test suit that you just cannot run it and get a green? If everything that's encoded in it is, is okay and it turns red if it's not, why would you have to compare some values that it outputs? Those values must be part of the test."

The one-time measurements his decisions name are kept, without a standing rule:

- Row 379 (2026-09-24), the count of interpreter tests whose output changes under walk's overflow check: taken, batch 4's rung O, landed. Nothing further.
- Row 330 (2026-09-29, R1), `floor` and `ceiling` on the float types, a library rung after the switch-over "with the count of interpreter tests whose output changes measured first": kept as one count for that rung.
- The numeral switch (2026-09-27, a numeral's type; 2026-09-29, option 3): Q-walk lands "with the changed interpreter outputs measured first": kept as one count for that rung.
- Rung Q's `IntLiteral` warning (2026-09-29, R8): "the rung measures where arithmetic lands under walk on the two microGPT programs and the interpreter tests before it lands: one measurement inside the rung": kept as that one measurement, in Q-lib.

How a named one-time count is taken: the batch record asks for it by name, quoting the decision that asks (protocol principle 5, the one new thing it is for). One edit pass over `ProjectFortress/tests/` compared against one base pass, masked as batch 5's Q2 masks (Java line numbers, identity hashes, moved library positions), the 18 unstable tests listed in one file under `coordinator/tools/` rather than found by a second base run. The base pass runs once for the batch, started in the background on the batch's base before the launch, never inside a rung and never twice; the edit pass is started by the worker in the background after its edit and read at the end of its steps, polled at 270 s. The runner and the comparison (`count-run.sh` and `compare-normalised.py`, rung F's, copied rung to rung since) move under `coordinator/tools/` when the first such rung is briefed, not tonight; none of the three rungs above is in batch 7b.

What catches an interpreter output that changes while its test still passes: the test, where the value matters; the skeptic's own differential programs on the constructs the rung touches (required as now); the gate's verdicts; the post-batch review's conformance reading. Nothing else, by design: his position is that the values that matter are part of the test and the suite's verdict is the check, so no standing net is offered, beside the suite or inside it (POSITIONS, "The suite's verdict is the check.").

Against his decisions: reverses none. 2026-09-24 (row 379) was taken once and is done; 2026-09-26 (rung C's and rung D's stops) narrowed what the stop meant and are kept as narrowings of the verdict stop; 2026-09-27 (reversible stops do not block) still governs the stops that remain; 2026-09-29 (R1, R8, the numeral switch) name one-time counts, kept above. His approval of batch 7's record (2026-09-27, "This is approved") was of its rungs and questions, and his go of 21:09 has 7b's record rewritten to the practice.

### (b) The review loops inside a batch

Default: the skeptic per rung stays, with its one refusal, judge, repair and second skeptic; the merged-diff review stays, once, beside the gate; its judge and repair run only for a finding that touches code, and the gate runs again after such a repair; a finding settled by tests and records goes to the next batch and is listed for him, without a judge; the second in-batch review is removed; the gate judge only for a red the repair did not answer (built 2026-09-29); the combined post-batch review stays and takes the count-table check.

Why: the review loop is 14.7% of all new tokens (25.8M) and 37% of batch N's; in the last four batches it stopped on owed tests, on the same red line the gate showed, and once on a defect of the Fortress change (7C's misstated sentence, row 490). Its judge-repair-second-review chain has twice held a green batch on tests-and-records findings (N, 6.5b), which his rule of 2026-09-29 already lets land. The second review sat alone on the critical path in N (17 minutes, 0.35M) and adds 3.0% over the batches. The skeptic is the best value per token on file: 10 of 14 misses in 6.5b, 11.4% of the spend.

Against his decisions: reverses none. 2026-09-24 ("Yes to both": the review's judge rules while the gate runs on) keeps the review beside the gate and its judge for a code finding; 2026-09-26 (a second ruling on the same rung or tree is Fable's) still applies where a second ruling happens (a red gate's judge after a review judge); 2026-09-28 (the combined review after every batch) is kept and grows by one check; 2026-09-29 (a review still blocking after its repair does not hold a green batch; the same weighing applies to the other rules) is what makes the routing the default.

What waits for him: the Opus review's option 1, removing the merged-diff review altogether and moving all its checks to the post-batch review, would reverse the "Yes to both" of 2026-09-24. It is not taken. It is listed for him in section 6 as the further step, with its saving (about 6.7% of the batches' new tokens, the review itself) and its cost (a conformance defect of the merged tree is pushed and repaired one batch later). Meanwhile the review runs once, beside the gate, as above.

### (c) Test names and assertion messages

Default, for every test written from tonight: named by topic, as the team's tests are, with no rung letter and no batch name; the path suffixes `Walk`, `Compiled`, `Checker`, `Link` stay where they say what a test exercises; no pointer line to a report; at most one comment line, saying what the program checks, which may name the ledger row it reproduces ("Those are like our bug reports", 20:53 UTC) and nothing else from the process record; an assertion message says what is checked and the expected answer in plain words; a specification rule is named by chapter or section, never by a `.tex` line; no ledger row, POSITIONS entry, FACTS title or PLAN item in a message; the ledger row and the report go in the commit message. The three homes are unchanged.

Existing tests: not renamed. The 220 files carrying `Rung<X>` find nothing `git log --diff-filter=A` does not, but renaming them costs a worker session (about 0.5M by the Fable review's estimate), changes component names the interpreter requires to match file names, touches `.test` lists, the ledger's citations of test names (about 100 lines) and batch 7b's record (eight names), for no standing saving. The `.tex` line numbers in existing messages do cost every specification rung a re-anchoring commit (582 of 663 test lines edited after landing only renumbered a citation; script `:893` and the gather's re-anchoring of test files). One commit after batch 7b lands replaces them with the section or the rule's name, gated once, about 0.3M; the re-anchoring rule for tests is then dropped. Not before 7b: its rungs edit tests, and a parallel pass over 200 files would conflict at the gather.

Against his decisions: reverses none. 2026-09-17 and 2026-09-19 say what a test is and where it lives, not how it is named; 2026-09-27 ("Make this neutral … I don't want to see my name in there multiple times") is served by keeping POSITIONS out of messages; protocol principle 1 already puts provenance in commit messages and reports, not source comments. The pointer line and the citation-in-message rule were the script's own (`:1184`, `:1192`, 2026-09-19), never put to him.

### (d) The cleaning's scope

Default, the boot note's rule: keep every file a live record cites, `CLIMB-BATCH-*.md` included; the reports (`REPORT.md`, `SKEPTIC.md`, `JUDGE*.md`, `RECORD.md`, `REPAIR*.md`, `NOTE*.md`, decision records); the gate's tables (`climb-batch-*/gate/`, `gate-baseline/`) and baselines (`baseline-2026-09-19/` whole, since the ladder stage reads its `raw/`); every tool used more than once, where it stands (`repair-r1-atomic-static/run-subset.sh` and `subset.txt`, `climb-batch-N/merged-tests/junit.sh`, `rung-inference-walk/harness-one.sh`, the baseline's `classify.py`, `report.py`, `microgpt-phase.*`, and every path the script, the manual and `coordinator/tools/` name). Remove the rest under `explorations/compile-ladder/` rung, batch and plan folders, and the script copies under `explorations/reviews/batch-*-review/` whose review files stay: probes, captures, build logs, raw outputs, per-file ladder outputs, citation and distance dumps, copies of tools and of tests, `df` captures, machine lines as files. About 7K of the 8,923 files by the Opus review's count. Live records are `FACTS.md`, the ledger, `PLAN.md`, `POSITIONS.md`, `INDEX.md`, the handover, `CLAUDE.md`, the protocol, the script, its manual and the `CLIMB-BATCH-*.md` records; a file only a report cites is removed, and the report's citation is read from history.

How: one Opus worker, reading only the greps; the keep list built from them and checked with `git ls-files --error-unmatch`; the removal by explicit `git rm` of files, never a directory; `git diff --cached --stat` read before the one commit. History keeps everything: no rewrite, no branch, no tag. One line in this post-mortem's `README.md` names the commit and says a removed file is read with `git show <commit>^:<path>`; the coordinator's FACTS line at the landing points at it. No gate is run for the cleaning alone: the next gate, batch 7b's, runs on `main` after it lands and is the proof. Outside `explorations/compile-ladder/` and the review script folders nothing is touched: the exploration era's probes are what he asked to keep (2026-08-19, 2026-09-09).

Renaming existing tests does not belong in it, for the reasons in (c). Part B, his cleaner pass of 2026-09-20 with the process record on its own branch and a rewritten `main`, waits as before: a force-push, done from his machine, after one batch has run clean under the new rules.

Against his decisions: reverses none. 2026-09-29 (scratch on no branch under a record name; history keeps everything) is followed by removing from the tree and naming the commit; 2026-09-20 (an index, not a copy; `main` to hold the Fortress changes) is served in part now and whole at part B; 2026-09-18 (the `wip/` branches) unchanged; the 2026-09-26 milestone commits unchanged.

## 3. Token efficiency, by arithmetic on the figures on file

The figures: 19 runs, 175.7M new tokens (29.7M output, 146.0M cache writes), 6.88B cache reads; by family, rung workers 48.9% (about 86M), review loop 14.7% (25.8M), refusal cycle 12.9% (22.7M), first skeptics 11.4% (20.0M), gather 6.1% (10.7M), gate 4.2% (7.4M), commit 1.7% (3.0M) (characterization, "Across all batches"). The cache holds an agent's context for five minutes; an agent that waits longer on one tool call writes its whole context to cache again at its next call, 350K to 650K each time for a rung worker. 65.5M of the 146.0M cache writes, 44.9%, followed such a wait; for rung workers 53.1M of their 75.6M. What they waited on (review-opus § 1.2, M1): corpus comparison passes 27.2M; count and distance stages 6.9M, of which 4.4M the merged-diff review polling for the gate's table; ladder subsets 5.3M; the microGPT checks under walk 5.0M; builds and test runs 2.4M; specification builds 0.3M; other 18.5M.

What each change saves, on those figures:

- The corpus comparison out of every rung: at least 27.2M over the batches, 15% of all new tokens; in 6.5b 8.83M of 17.15M cache writes, about half of the run; rung V's 106 waiting minutes of 181, rung E's 47 of 161. The output tokens spent running, comparing and listing are on top and not separated on file.
- The microGPT checks once per batch, in the background, in no rung: 5.0M.
- The ladder subset after the edit only: about half of 5.3M, 2.6M, and the 29 minutes 6.5b spent on a "before" the landed gate already held.
- The review's count-table check moved to the post-batch review: 4.4M of polling waits.
- The second in-batch review removed: 3.0% of new tokens, 5.3M; batch N's 0.35M and 17 minutes on the critical path.
- The judge and repair not run for a tests-and-records finding: part of `judge:review` and `repair:review`, 5.0% together, 8.8M; batch N's 1.0M and 54 minutes were such a case, 6.5b's 0.8M another.
- A skeptic that refuses only for the change or the test: an unmeasured share of the refusal cycle's 22.7M; the one case on file, E's chain in 6.5b for seven wrong citations of 181, cost 1.61M and 112 minutes.
- Sum of the sure items: about 44M of 175.7M, a quarter of every token the batches spent; on 6.5b about 9.6M of 17.8M, a little over half.
- The cache writes after waits fall from 65.5M to the "other" 18.5M plus what remains of builds and test runs, and with 270 s polling (below) those remaining waits no longer expire the cache either.

How agents avoid long waits:

- The three long runs leave the rung worker: no corpus pass, no microGPT check, no ladder before. What remains in a rung is `compileAll` (about 80 s), the library rebuild (25 to 125 s), one harness run of one test (minutes), a ladder subset of a few files, the count stage (20 s), and for a stage rung the distance stage (13 to 24 min), started in the background at the edit and read when the report is written.
- The whole suite runs only in the gate, whose context is small: its prompt loses the batch-record read (below) and holds the prefix and its own steps, so a rewrite after a wait costs tens of K, not hundreds.
- `wait_for`'s default bound drops from 480 s to 270 s. A poll then returns inside the cache's five minutes and the next call reads the cache instead of writing it; a read costs about a tenth of a write. The tool's 10-minute ceiling is not the constraint any more; the cache is.
- The merged-diff review does not wait on the gate; the commit stage does not wait on the microGPT run; the post-batch review runs nothing long.
- A named one-time count (section 2(a)) is run in the background and polled.

The script's and the record's size:

- The batch record, `CLIMB-BATCH-7.md`, 488 KB, about 120K tokens, costs tokens per agent by one route: the shared prefix's first paragraph tells every agent to "Read explorations/coordinator/CLIMB-BATCH-<n>.md in your worktree first: it is the decision record this brief executes" (script `:1097`). An agent that obeys writes about 120K to cache at that call and reads them back on every call after; twenty agents, about 2.4M written and read back for the batch, for a text whose part each rung needs is already in its tail ("carried below word for word"). The record's section 7 is the manifest block, a copy of section 3's tails, most of the file's second half. What shrinks it: the prefix's sentence goes (section 4); a rung agent reads its tail and its briefing, and the record's sections 1 and 2 only where its tail points there; the manifest block leaves the record (it is generated by `plan-7b/manifest/gen7b.py` and spliced into the script at the launch; section 7 says so and holds no copy); the measurement paragraphs (the comparison, the microGPT checks, the machine line, the ladder before) are struck from every tail.
- The script, 380 KB, costs no tokens per rung agent: agents receive `PREFIX + role + tail` (the prefix is 22 KB, about 5K tokens; a tail 30 to 40 KB), not the file. Its size costs whoever reads it: the coordinator by `grep`, the script-rewrite worker whole (about 95K tokens a read), the post-batch reviewer in parts. 171 KB of it is batch 6.5's manifest embedded in the file. What shrinks it: the manifest in its own file per batch, spliced at launch, the script holding roles and stages only; the removed stage (`review2`) and paths; the removed rules (the capture and `.txt` rules, the tracked-path check and its loop, the probes list, the per-rung table captures, the ladder before).

Around the runs the record keeps 23.5M over the session (records drafted, their Fable reviews, amendments, FACTS consolidations, post-batch reviews, routings, script changes, landing-record workers; review-opus § 1.2, M2). This synthesis changes three of them: the landing record is written once (the landing-record workers, 1.0M); the post-batch review's scripts are one tool (part of 2.8M); the record's manifest block is not drafted or reviewed twice (part of 5.2M and 4.2M). The rest stands as decided (2026-09-27, FACTS consolidated before each batch; 2026-09-28, the review after every batch).

## 4. The changes, exact enough to implement

Anchors are quoted from the files as they stand at `8c1158937`; script line numbers match the two reviews' (`:1151`, `:1188`, `:1200`, `:1206`, `:1281`, `:1330`, `:1370`, `:1651`, `:894`, `:2806`). Where a review's section 5 item gives the replacement, it is cited and not restated. "Removed" means the sentence or step goes and the numbering closes up.

### The script, `explorations/coordinator/climb-batch-workflow.js`

Shared prefix (every agent):

1. `:1097`, "Read " + BATCH_RECORD + " in your worktree first: it is the decision record this brief executes, and it names all the rungs and why they were chosen." → "Your brief carries your rung's section of " + BATCH_RECORD + " word for word and your briefing prints the decisions it rests on; read the record's sections 1 and 2 only where your tail points you there, and never the whole file."
2. `:1138` and `:1142`, `wait_for`'s "[max-seconds, default 480]" and `${2:-480}` → 270; `:1147`, "The default bound is 480 s so that one wait_for call stays inside the tool's 10-minute ceiling; ant testFast is longer than that, so call wait_for again until it prints the BUILD line." → "The default bound is 270 s so that each call returns inside the prompt cache's five minutes: a longer wait makes your next call write your whole context to cache again, which was half of all the tokens the batches wrote. Call wait_for again until it prints the BUILD line."
3. `:1151`, "A capture you intend to commit is named .txt. Never .out and never .log: …" → review-opus § 5 item 5's text, without its last sentence on `wait_for` (item 2 above carries it): scratch under `tmp/SLUG/` in the worktree, never committed on any branch, read there by the skeptic and the judge.
4. `:1184`, home 1, "The assert message string carries the citation - the ledger row number or the specification line - and nothing else does: no provenance comment in the source (see "What you write" below)." → "The assert message says what is checked and the expected answer in plain words. A specification rule is named by chapter or section, never by a .tex line; no ledger row, POSITIONS entry, FACTS title or PLAN item in a message. The ledger row goes in the commit message and may go in the file's one comment line."
5. `:1188`, home 3 → review-opus § 5 item 7's text (a plain gated test that pins today's behaviour, or a ledger row quoting the two to five output lines and the command where no program can observe it).
6. `:1192`, register, "A test file carries at most ONE comment line, pointing at its REPORT.md - not a provenance essay (…)." → "A test file is named by its topic, as the team's tests are, with no rung letter or batch name, and carries at most ONE comment line saying what the program checks, which may name the ledger row it reproduces and nothing else from the record (…)." Keep the `AtomicTopLevelVar.fss:13-42` example.
7. `:1198`, `REPORT.md`'s line: "the recorded failure and the recorded pass" → "the failing run's two to five lines quoted with its command, and the passing run's line"; "every citation as file:line" stays; "every differential you ran" → "each differential you ran, in a sentence".
8. `:1200`, "- probes/ - your probe programs and their captured outputs, every capture named .txt." → removed; after the list: "Nothing else under explorations/: your scratch is under tmp/SLUG/ in your worktree, which .gitignore ignores, and it is never committed."
9. `:1206` to `:1215`, the section "## Every path you cite is tracked - check it before you report" with its loop and "Either commit it or say in your report why the citation stands without it." → review-opus § 5 item 10's section "## What you cite".
10. `:1219`, "after the failing test is written and its failure captured; after the edit and the recorded pass; after REPORT.md and record.md" → "after the failing test is written and seen failing, in a commit that holds the test alone, so that your skeptic can run it on the base; after the edit and the pass; after REPORT.md and record.md".
11. `:894`, "and every list a rung hands Pavol is also a capture under probes/; the gather composes the file from them, as in batches 3.5, 4 and 5." → "and every list a rung hands Pavol is a section of its REPORT.md, which the landing report carries to him." (review-fable § 5, the script, `:894`.)

Rung worker (`rungRole`):

12. `:1265`, "From explorations/coordinator/PLAN.md, and this is the part Pavol called load-bearing:" → "From explorations/coordinator/PLAN.md and Pavol's rule of 2026-09-17: the test first, seen failing, then the fix, the test staying in the corpus:". The attribution was false (archaeology-testing § 6 item 2).
13. `:1269` to `:1274`, the `testIsStage` steps 2 and 3: "So FIRST, before any edit, read the header of explorations/coordinator/tools/checker-count/run.sh and run it in your worktree" and "That table IS your recorded failure: it goes under probes/ as a committed .txt and its #total is the number your record.md says the batch starts from." and "3. After the edit, run the same stage again and capture it as checker-count-postedit.txt beside the first" → "2. Your rung declares testIsStage: its failing-then-passing test is the gate's checker-count stage. Its before is the last landed gate's table and per-site list (POSITIONS.md, 2026-09-28: a rung does not re-run the stage on an unchanged base); read them, and do not run the stage before your edit. 3. After the edit, run the stage once in your worktree, to tmp/SLUG/checker-count-postedit.txt, and start the distance stage in the background at once, reading its table when your report is written; put the diff of each pair of tables in REPORT.md and say what moved and why, api by api. Commit no table: the gate's tables on the merged tree are the record." The rest of step 3 (the manifest's `expectedCheckerCount`, `expectedCheckerCrash`) stays.
14. `:1276`, step 2, "2. Write the failing test FIRST, into …" gains, after its first sentence: "The test is the ledger row's reproduction written as a clean minimal program of the core problem, not the shape the probe met it in; name it by its topic."
15. `:1281`, step 3 → review-opus § 5 item 12's text (run it through the harness before the edit, see it fail, commit the test alone, quote the failing lines).
16. `:1285`, step 6, "6. Run the test again and capture the pass." → "6. Run the test again through the harness and see it pass; quote its verdict line in REPORT.md."
17. `:1287`, step 8 → review-opus § 5 item 14's text (the ladder subset after the edit only; the driver run where it is with `LADDER_ROOT` under `tmp/SLUG/`, never copied).
18. `:1291`, "12. The tracked-path check of the shared prefix, last, after your final commit." → removed.
19. `:1296`, "(a passage reported without choosing, an output the comparison does not account for)" → "(a passage reported without choosing, a test whose verdict changed other than the rung's own)".
20. `:2353`, the recovery text "A recorded failure counts only if it was captured before the edit existed. If the earlier attempt made the edit and captured no failure, set the edit aside (git stash …" → "Test first still holds: the test is seen failing on the base before the edit. If the earlier attempt made the edit and no test-only commit precedes it, set the edit aside (git stash …" with the rest of the sentence as it stands.

Skeptic (`skepticRole`):

21. `:1305`, the function's brief: after "This is the worker's own account. Treat it as a claim to be checked, not as evidence." the worker's structured result is passed without its `reportText` and `recordText` fields (the files are in the worktree; the texts are in the journal): `JSON.stringify(Object.assign({}, workerReport, { reportText: undefined, recordText: undefined }), null, 2)`.
22. `:1329`, check 3 for a stage rung: "Find both captures under explorations/compile-ladder/<slug>/probes/, check that the pre-edit one is what the tree printed before the edit," → "The before is the last landed gate's table; the after is tmp/<slug>/checker-count-postedit.txt in the worktree; check that the report's diff is the diff of those two,". The rest ("RUN THE STAGE YOURSELF …") stays.
23. `:1330`, check 3 → review-opus § 5 item 15's text (check out the test-only commit or put the test on the base alone, run it through the harness, see it fail; run it on the edit, see it pass; a test it cannot see fail on the base is refused).
24. `:1337`, check 9, "home 3 (deferred, specification silent) must be a committed .txt capture and a ledger row," → review-opus § 5 item 16's text.
25. `:1339` to `:1341`, check 10: "explorations/compile-ladder/' + rung.slug + '/probes/checker-count-postedit.txt, committed on ' + rung.branch" → "tmp/' + rung.slug + '/checker-count-postedit.txt in the worktree"; "and the report says which table, if any, it committed" → "and the report says which table, if any, it wrote under tmp/".
26. After check 12, a new sentence → review-opus § 5 item 17's text (refuse only for the change or the test; a citation off by a line, a wording, a missing cross-reference is a required correction).
27. `:1370`, "Write your findings to … SKEPTIC.md in that worktree, and your probes under explorations/compile-ladder/' + rung.slug + '/probes/skeptic/, every capture named .txt. Run the tracked-path check of the shared prefix over SKEPTIC.md before you report." → "Write your findings to … SKEPTIC.md in that worktree, and your own programs and their outputs under tmp/' + rung.slug + '/skeptic/, which is never committed; quote in SKEPTIC.md the lines of theirs a finding rests on, with the command. Commit SKEPTIC.md alone." The rest of the paragraph stays.

Gather (`gatherRole`):

28. `:1651`, step 6 → review-opus § 5 item 20's parenthesis ("REPORT.md, SKEPTIC.md and JUDGE.md if any; record.md is folded, not landed; nothing else under the rung's folder"), and `decision-record.md` added for a specification rung. The rest of the step stays.
29. `:1657` to `:1661`, "## After the last commit: every cited path is tracked" with its loop → removed.

Merged-diff review (`reviewRole`) and the stages after the gather:

30. `:1731`, check 7, "or a committed .txt probe with a ledger row" → "or a test pinning today's behaviour with a ledger row, or a ledger row quoting the output where no program can observe it".
31. `:1732`, check 8, "Every path any of the landed records cites is tracked (git ls-files --error-unmatch)." → removed.
32. `:1733`, check 9, the checker count with its wait ("Wait for that row in calls of at most eight minutes …") → removed from this role; its text goes, as a check, into the post-batch review's brief (the coordinator's, `reviews/batch-*-review.md`'s brief), which reads the landed `checker-count.txt`.
33. `:1734`, check 10, "an output a comparison does not account for" → "a test whose verdict changed other than by a rung's own intent".
34. `REVIEW_SCHEMA`: `blocking` splits into `blockingCode` (findings whose repair touches a path outside `explorations/` that is not a test file) and `routed` (findings settled by tests and records only, each with the step the next batch owes). `:2654` to `:2712`: the judge runs only when `blockingCode` is non-empty (`judge:review`, `repair:review`, then `gateIsStale`/`repairRerun` as now); `routed` takes the path of today's `land` ruling (`report.reviewRouted`, `mergedItems` numbered `review-routed`) with no judge call. The `land` decision of `REVIEW_JUDGE_SCHEMA` stays for a judge that finds a `blockingCode` finding settled by tests and records after all.
35. `:2792` to `:2830`, the second review: `secondReview`, `commitLocal`, `review2` and `commit:push` → removed. After a repair on the merged tree the flow is the one without a second review: `pushHeldBy(approved, review)` and one `commit` stage, as at `:2784` to `:2789`, whose `if (!secondReview)` guard goes. The comment block at `:2792` goes with it. `mergedRepairRole`'s text that names the second review, if any, loses the sentence.
36. `commitRole`, `:2121` onward: the `part` argument and its `'local'` and `'push'` branches → removed with item 35; one commit stage as before 2026-09-29's item 2.

Commit (`commitRole`):

37. `:2152`, step 1: "copy ' + LOG_DIR + '/distance/errors.tsv to ' + GATE_DIR + '/distance-sites.tsv and add it too" → "copy ' + LOG_DIR + '/distance/errors.tsv to explorations/compile-ladder/gate/distance-sites.tsv, one fixed path overwritten at each landing, and add it too". The rung tails and the gate's comparison read that path from batch 7b's landing on; 7b's own rungs still read `climb-batch-6.5b/gate/distance-sites.tsv`, the last landed one (item 63).
38. `:2152`, step 1, add at its end: "When any landed commit changed a file under Specification/, run ant tex once and add Specification/fortress.pdf to this commit; its log stays under ' + LOG_DIR + '/ and is not committed."
39. `:2184`, step 4, "then git worktree remove <worktree> and git branch -D <branch>" → "then git worktree remove --force <worktree> (its tmp/ goes with it; the transcripts hold what it held) and git branch -D <branch>". Before it, one new step: "Start the two microGPT programs under walk on the landed tree in the background, to ' + LOG_DIR + '/microgpt-walk.txt, and do not wait for them: the coordinator reads the file at the landing report or the post-batch review (Pavol, 2026-09-19: a separate non-gating stage)." The two checks are `MicroGptFlatCheck` and `MicroGptAplCheck`, run by rung F's `mg-run.sh` (`rung-rr32-sibling/REPORT.md` section 12; about 80 minutes each, its section 14). `mg-run.sh` moves under `coordinator/tools/` as a reusable script, in the rewrite, before the cleaning removes the rung folders' copies.
40. Step 4's `RECORD.md`: the gather writes it once; the commit stage touches it only for the hashes and the gate's summary line and the "Not pushed." paragraph when the push is held; no other stage rewrites it.

Recovery and resume texts: every sentence that names a capture, `probes/`, `.txt`, the recorded failure as a file, the tracked-path check, or the second review is rewritten or removed in the same way (`grep -n 'capture\|probes/\|\.txt\|recorded failure\|tracked\|review2\|second review'` over the script lists them).

### The manual, `explorations/coordinator/climb-batch-workflow.md`

41. Line 21, "Preparing a batch record", add review-opus § 5 item 28's paragraph (a record asks a rung for no corpus comparison, no ladder before, no microGPT check, no build log; a measurement only where a test or a decision needs it; a count of programs a change reaches is the planner's probe) and one sentence: "A one-time count of changed interpreter outputs is asked for only where a decision of Pavol's names it for that rung (rows 330 and the numeral switch's Q-walk, rung Q's measurement), one edit pass against one base pass the coordinator starts before the launch; the record's section 7 holds no copy of the manifest, which `plan-<n>/manifest/` generates."
42. Line 25, "a committed capture is `.txt`, never `.out` or `.log` (`.gitignore:42,46`, item h)" → review-opus § 5 item 23's text; and its last sentence, "The register paragraph limits a test file to one comment line pointing at its `REPORT.md` (item e, `protocol.md`, principle 1)." → "The register paragraph names a test by its topic and limits it to one comment line saying what it checks, with no pointer to a record (post-mortem 2026-09-29, section 2(c))."
43. Line 33, home 3 → review-opus § 5 item 24's text.
44. Line 37, the tracked-path check → review-opus § 5 item 25's text.
45. Lines 41 to 43, "Rung worker": add "Since the post-mortem of 2026-09-29 the worker's first commit on its branch is the test alone, seen failing through the harness; its scratch is under the worktree's `tmp/<slug>/` and is never committed; the ladder subset runs after the edit only; no rung runs a corpus comparison or a microGPT check; `wait_for` polls at 270 s."
46. Lines 51 to 57, "Skeptic": "Check 9 is the three homes — the skeptic runs the test itself to see a home-1 assertion pass." gains "Check 3 is the failure seen by the skeptic itself: the test run on the worker's test-only commit and at the branch's head."; the paragraph on check 10's "committed post-edit table" → "the post-edit table under the worktree's `tmp/<slug>/`"; add "The skeptic refuses only for the change or the test; a citation, a wording or a cross-reference is a required correction (post-mortem 2026-09-29)."
47. Line 71, "Review beside the gate": the sentence "A blocking finding goes to the judge, who orders a repair, after which the gate runs again only as … or, when every finding it upholds is settled by tests and records only, rules land (below)." → "A blocking finding that touches source, library, checker, interpreter or specification goes to the judge, who orders a repair, after which the gate runs again; a finding settled by tests and records only is routed by the review itself to the next batch and listed for Pavol, with no judge (post-mortem 2026-09-29, section 2(b)). Check 9, the checker count, is the post-batch review's since the same date, so the review does not wait on the gate's table."
48. Line 93, "Step 2 of the order of work then asks for the stage's table captured before the edit and step 3 for the table after it" → "The before is the last landed gate's table (POSITIONS 2026-09-28); step 3 of the order of work runs the stage once after the edit, to the worktree's `tmp/`, and the skeptic re-runs it"; the rest of the paragraph follows.
49. Line 113, "Commit": add "Since the post-mortem of 2026-09-29 the per-site list lands at one fixed path, `explorations/compile-ladder/gate/distance-sites.tsv`, overwritten at each landing; the specification PDF is built once per batch when its text changed, with no log committed; the worktrees' `tmp/` go with them; the two microGPT programs are started under walk in the background on the landed tree and not awaited."
50. Line 115, rung D's stop → review-opus § 5 item 27's text.
51. Lines 117 to 119, "A review that still blocks after its repair (2026-09-29)": the section's second sentence onward → "Since the post-mortem of 2026-09-29 there is no second review inside a batch: the post-batch review is the second look, and a finding the repair left is its item for the next batch."
52. Lines 127 to 142, "Rules weighed": item 1's `land` ruling and item 2's second review beside the commit are superseded; one sentence at the head of the section says so and points to this file.
53. A new section, "What a batch commits (2026-09-29)": section 1's opening paragraph, in the manual's words, with POSITIONS 2026-09-29 (what a batch commits) as its source.

### The protocol, `explorations/protocol.md`

54. Lines 39 to 44, the worker-commits rule → review-opus § 5 item 1's text.
55. Lines 47 to 48, "Every edit under the original tree is test first, the test seen failing before the fix, and is flagged at commit." → "Every edit under the original tree is test first: the test is the first commit on the worker's branch, seen failing through the harness before the fix and again by the skeptic's own run on the base, and the edit is flagged at commit. Nothing is committed to show it but the test and the report's quoted lines; the worker's transcript is the record of its order of work."
56. Lines 73 to 75, principle 2's timing sentence: keep, and add review-opus § 5 item 3's sentence (no timing of the interpreter is taken or recorded, POSITIONS 2026-09-19).
57. Lines 144 to 158, "What keeps going wrong", after "a rule is weighed by what it costs against what it protects.": add review-opus § 5 item 4's sentence.

### `explorations/coordinator/PLAN.md`

58. Line 386, "Changed since: in a batch each rung lands as one commit composed at the gather from its branch's net change" → review-opus § 5 item 30's addition ("and that net change is the edit, the test and the reports; the worker's scratch never enters the branch").
59. Line 398, after "Not adopted: rewriting the harness on lit and FileCheck, inline diagnostic annotations. Cost without gain on the path." → review-opus § 5 item 29's paragraph.

### The false attribution

`grep -rn "load-bearing" explorations/coordinator/` finds it in three places; the other hits use the word in its own sense and stay.

60. `climb-batch-workflow.js:1265`: item 12 above.
61. `repair-batch-workflow.js:146`, the same sentence → the same replacement (the file is unused since batch 4 but the line is false as it stands).
62. `batched-climb-plan.md:164`, "This is the part of Pavol's order of 2026-09-17 that is load-bearing (`POSITIONS.md`), together with the rule that the check is permanent" → "Pavol's order of 2026-09-17 is the test written first and seen failing, and the check permanent (`POSITIONS.md`); the recorded failure in the report is this plan's own addition, not his (post-mortem 2026-09-29, `archaeology-testing.md` § 4)."

### Batch 7b's record, `explorations/coordinator/CLIMB-BATCH-7.md`, at its re-anchoring

63. In every rung's section and the manifest the generator writes from it: the paragraphs "**The comparison.** …" (lines 307, 347, 382, 412, 444, and their copies in section 7), the "before" of every ladder subset, "the two microGPT checks", "the machine line" and "pass caches deleted once captured" → struck. "**Stops.** A changed output or exit code that is not a call whose chosen declaration changed …" (line 317 and its kin) → "A test whose verdict changes other than by this rung's intent." "**What comes back to Pavol.**" loses "The changed outputs with their causes" and "the two microGPT checks' result". Every "captured", "probes/", ".txt" and "committed" that names a rung's scratch → the `tmp/<slug>/` form. The rungs that read a "before" from `climb-batch-6.5b/gate/distance-sites.tsv` read `compile-ladder/gate/distance-sites.tsv` once the commit stage writes it there (item 37); for this run the last landed path stands.
64. Section 7 → the sentence "The manifest is generated by `explorations/compile-ladder/plan-7b/manifest/gen7b.py` from sections 3 and 6 and spliced into the script at the launch; it is not copied here." Section 8 re-read against the rewritten script.

### `explorations/coordinator/POSITIONS.md`, for the coordinator

65. The 2026-09-28 entry's "The gate commits its per-site list, so that the 'before' is complete." gains "at one fixed path, overwritten per landing (post-mortem 2026-09-29)". A dated entry for what he decides on section 6 in the morning, in his words.

### Not changed tonight

The gate's steps and snippets; the briefing and `facts-extract.sh`; the three homes' first two; `STAGE_BLIND`; the judge tiers; `landsOnlyWith` and `pushHeldBy`; the repair's one-JVM test runs; the post-batch review's brief beyond the two additions; the runner and comparison for a one-time count (moved under `coordinator/tools/` when the first rung that needs one is briefed); the strip of `.tex` line numbers from existing tests (after 7b lands, section 2(c)).

## 5. What stays, and the decision that keeps it

- The gate whole, once per batch on the merged tree, red only on the suites, the atomic runs and the ladder; the checker count and the distance reported and never red: POSITIONS 2026-09-17 (a permanent check in the gate; per-batch is in line with the rule), 2026-09-26 (answer 11: the checker count in every gate, reported and never red).
- Test first, the test seen failing before the fix, staying in the corpus; the three homes: POSITIONS 2026-09-17 as extended 2026-09-29; 2026-09-19 (home 2's `XXX` tests). The check is now a run by the skeptic and the transcript, not a file.
- The mission briefing as step 1 of every rung, in neutral words, and no required questions about the worker's search: POSITIONS 2026-09-27 (the three questions refused).
- Workers committing their own files as they go, on their own `wip/` branches, which are not deleted: POSITIONS 2026-09-18, 2026-09-26, 2026-09-29.
- The skeptic per rung with one refusal round, a judge, a repair and a second skeptic; a judge's first ruling on Opus, a second on Fable: POSITIONS 2026-09-24, 2026-09-26.
- The merged-diff review beside the gate, its judge ruling while the gate runs on; the gate writing under `tmp/` until the commit stage: POSITIONS 2026-09-24.
- A review that blocks after its repair does not hold a green batch; a repair of tests and records only does not rerun the gate: POSITIONS 2026-09-29.
- Reversible stops land and are listed for his review; an output difference the untouched tree already shows is a ledger row, not a stop: POSITIONS 2026-09-27, 2026-09-26 (rung D).
- Rungs do not re-run measurements the landed gate took; the gate commits its per-site list: POSITIONS 2026-09-28.
- The combined post-batch review after every batch, one Opus reviewer: POSITIONS 2026-09-28.
- The Fable rule for design judgements, and the top-tier review of each batch record: POSITIONS 2026-09-29, 2026-09-27.
- FACTS consolidated before each batch: POSITIONS 2026-09-27.
- The reports (`REPORT.md`, `SKEPTIC.md`, `JUDGE.md`, `RECORD.md`), the ledger rows, the FACTS and plan lines, the handover line, a reusable script: POSITIONS 2026-09-29 (what a batch commits; "Reports, okay. We need those").
- The exploration era's probes and records under `explorations/`: his words of 2026-08-19 and 2026-09-09.
- Costs in tokens, never dollars; no model identifiers, tiers only: POSITIONS 2026-09-27, 2026-09-19.

## 6. For Pavol

What changes in how a batch runs, from batch 7b on.

- A batch commits only the change to Fortress, its tests, the reports, the ledger rows, the FACTS and plan lines, and any script that is reusable. No captured outputs, logs, probes or copies, on `main` or on any branch. Scratch stays in the worker's own folder and is thrown away with the worktree. The transcripts are the record of how a worker got there.
- Test first is shown by a run, not a file. The worker's first commit is the test alone, a clean minimal program of the ledger row's problem, seen failing. The skeptic runs it on the old code and sees it fail, then on the new code and sees it pass.
- No rung runs the whole test corpus to compare printed outputs, and no rung runs the microGPT programs under the interpreter. The microGPT run happens once per batch, after the landing, in the background.
- The skeptic refuses only for a wrong change or a wrong test. A wrong citation is a correction, not a refusal.
- One review of the merged batch, beside the gate. If it finds a defect in the code, one judge, one repair, and the gate runs again. If it finds only missing tests or record slips, they go to the next batch and onto your list. No second review inside the batch. The review after the batch stays.
- Agents no longer wait more than four and a half minutes on one call. A longer wait made an agent write its whole memory again, which was half of all the tokens the batches wrote.
- The batch record is no longer read whole by every agent, about 120K tokens each; each reads its own section.
- You get one landing message per batch: what each rung did, the gate, what it bought, what it cost, and every item for your word.

What it saves, by arithmetic on the record: about a quarter of every token the batches have spent, and about half of batch 6.5b's; the sure items are 27M for the output comparison, 5M for the microGPT checks, 5M for the second review, 4M for the review's waiting, 3M for the ladder "before".

The four defaults, in force from tonight unless you say otherwise.

1. The output comparison is gone. A value that matters is asserted in the test. The one-time counts your decisions name (row 330, the numeral switch, rung Q) are kept as single counts, one edit pass against one base pass. The suite's verdict is the check, as you said at 18:52 UTC.
2. The reviews inside a batch: the skeptic per rung stays; one merged review beside the gate stays; its judge and repair only for a code defect; no second review. Going further, dropping the merged review and giving all its checks to the review after the batch, would reverse your yes of 2026-09-24 to a review beside the gate, so it waits for you. It would save about 7% more; the cost is that a wrong sentence in the specification could be pushed and fixed one batch later.
3. New tests are named by topic, as the team's were, with no rung letter, no pointer to a report, and messages in plain words with no spec line numbers or plan references. Existing tests are not renamed. After 7b lands, one gated commit replaces the spec line numbers in existing messages with section names, about 0.3M, so that specification rungs stop re-numbering them.
4. The cleaning removes about 7K of the 8.9K files under the ladder folder and the review folders' script copies, keeping the reports, the gate's tables and baselines, the tools, and every file the ledger, FACTS, the plan, the batch records and the other live records cite. History keeps everything; one line says how to read a removed file. No branch, no tag, no rewrite. Your history split with the record on its own branch waits, as before, for your machine.

Nothing else waits for you. The script rewrite, its review and batch 7b run tonight on this.
