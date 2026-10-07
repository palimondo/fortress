<!-- What the skeptics, second skeptics and judges of climb batch 10 spent their tokens on (21 transcripts of run wf_d5ec6194-bcc, counted by the method of labor.md), how that differs from the rung worker, which of it the fortress-repo skill as it stood at 90472e877 covers or would reduce, and how much went to the three refusals and their repairs; a read-only scout note of 2026-10-07 for the coordinating session. -->

# What the checking roles spend, and what the fortress-repo skill would change

Written 2026-10-07 for the coordinating session, which reports to the curator. Read-only: nothing was built, no test or Fortress program was run, and no file but this note was edited.

The question: what do the skeptic and the judge spend their tokens on, how does that differ from the rung worker, and would the `fortress-repo` skill as it stands help them spend less?

What it rests on:

- Already measured, cited and not measured again: `labor.md` (batches 8 and 9, 43 transcripts), `skeptic-scope-judgement.md` (one batch 8 skeptic by check), `reviews/batch-10-review.md` (batch 10's cost by role, 6.26M, 21 agents), `design-pricing.md` (the role table), `worker-decisions-archaeology.md` section A (the batch script names no skill) and `characterization.md` (spend by stage).
- New: batch 10's 21 transcripts under `/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows/wf_d5ec6194-bcc/`, counted again by labor.md's scripts (copied, with the run added). The totals agree with the review to the thousand: 6,262,269 written.
- The skill was read as it stood at `90472e877` (`git show 90472e877:.claude/skills/fortress-repo/...`), not from the working tree, which a writer is editing. Line numbers below are that version's. "The old skill" means it.
- All 21 agents ran on the Opus tier (`design-pricing.md`, its opening paragraph).

## Words used

- **Writes**: for one call to the model, the tokens the cache had to store for it, which is `cache_creation_input_tokens` plus `input_tokens`, counted once per message id. Cache reads and the agent's own final output are not counted, as in `labor.md`. The agent's last message (its verdict) is therefore not in any figure here; its size is given in characters where it matters.
- **Turn**: one call to the model.
- **First call**: the first turn. It writes the agent's whole start: the brief, and the system prompt and tool schemas (about 36K) if the cache did not already hold them. Four of the ten checking agents began cold (skeptic N, judge N, second skeptics N and G).
- **Brief**: the first user message. By a fit over the 21 first calls, first-call context = 41.7K + 0.425 tokens per character of brief (R2 0.995), so a brief's tokens are 0.425 times its characters. At 3.6 characters a token it would be a third less; I use the fit.
- **Shared prefix**: the first 47.1K characters of every brief of batch 10, identical in all 21 (it ends where each role's own heading, "# Your role", begins). It is about 20K tokens by the fit. It was 39.1K characters in batch 8 and 42.6K in batch 9.
- **Carried text**: text of earlier agents' results that the script pastes into a later agent's brief.
- **Checking roles**: here the three roles of the question. The **skeptic** is the first skeptic of a rung. The **second skeptic** rechecks a rung after its repair. The **judge** rules on a refusal and writes the repair's work order. `labor.md` also counted the merged-diff review and the gate as checking; I give that figure once.
- **Refusal chain**: the judge, the repair and the second skeptic of one refused rung.
- **Rework**: spend that exists only because a rung was refused: the refusal chain.
- **The rung worker**: the four rung workers of batch 10 (N, C, G, W), the roles the checking agents are compared with.

## The answers

1. **What the checking roles spend.**
   - They wrote 2,325K, 37.1% of the batch's 6,262K: first skeptics 1,192K (4 agents, mean 298K), judges 623K (3, mean 208K), second skeptics 510K (3, mean 170K). Batches 8 and 9 held 33.0% and 30.2% in the same three roles.
   - By kind, per agent on average: the first call 74K (32%; the brief alone 54K, 23%), thinking and narration 56K (24%), reading the change and its record 80K (34%), running programs 13K (5%), waiting and reading run output 4K (2%), writing 6K (2%).
   - A skeptic's job is probes (29K, 10%) and reading the diff, transcript and tree. A judge reads and rules: no program run, and its first file write (two of three wrote one) is at 93% to 96% of its total. A second skeptic is 48% first call.
2. **How it differs from the rung worker.**
   - A rung worker (mean 532K) writes 10% on its start, 32% on thinking, 38% reading the tree and the record, 11% building, running and waiting, 8% editing and writing.
   - The gap is largest in the brief. It is 7% of a rung worker, 17% of a skeptic, 29% of a judge, 30% of a second skeptic. In tokens the gap is largest in reading the original tree: 145K for a rung worker against 46K, 25K and 14K.
   - A judge's brief is 142K characters (61K tokens) against a rung worker's 81K (35K): 1.75 times. The 47.1K prefix is the same in both. What differs is that a judge's brief carries the worker's whole result and the skeptic's verdict (84K to 97K characters, 62% to 65% of the brief), where a rung worker's own part is 34K.
   - The judge's calls and ruling repeat 15% to 20% of the citations of the worker's report text and 48% to 63% of the skeptic's verdict. The worker's "sites left" and "stages" sections, the longest, are echoed least (8% to 21%).
3. **The old skill.**
   - It is a worker's manual. The checking roles' measured spend is mostly in what it does not cover: the brief, thinking, the carried reports, the worker's transcript. What it does cover (building, waiting, setting up a call) is almost absent from them: no builds, a skeptic spends 2.4 minutes in commands over a minute and a judge none, setup lines about 2K a skeptic, 9 tool errors in 609 calls.
   - It would reduce one thing in a checker's brief if the script were changed to let it: about 22K of the prefix's 47.1K characters (9.5K tokens, 95K over ten checkers, 4%) overlap procedures the skill holds. As it stands no brief names it.
   - Loading it costs a checker 2K to 3K tokens (`SKILL.md`) and 6K to 22K with the parts its own line 66 points to.
   - For the refusals: one cause (G's missing assertion) is covered by a rule it already holds, one (C's) partly, one (N's) not at all.
4. **The rework.** The three refusal chains wrote 1,749K, 27.9% of the batch: judges 623K, second skeptics 510K, repairs 616K. Judge and second skeptic alone are 1,133K, 48.7% of the checking roles' spend. Causes: N (0.61M) a wrong change that its worker had half seen; C (0.65M) a premise of the record that its worker met and then guarded only in part; G (0.49M) one missing assertion, where a required correction would have cost under 0.1M by the review's estimate.

## 1. Batch 10's checking roles, by labor.md's method

### The totals

- First skeptics: 4 agents, 1,192K, 19.0% of the batch, 370 turns.
- Judges: 3 agents, 623K, 9.9%, 123 turns.
- Second skeptics: 3 agents, 510K, 8.2%, 107 turns.
- Together 2,325K, 37.1%, against 2,549K (33.0%) in batch 8 and 2,079K (30.2%) in batch 9.
- With the merged-diff review (425K) and the gate (126K), `labor.md`'s definition of checking: 2,876K, 45.9%, against 42.9% over batches 8 and 9.
- Means per agent, batch 8, 9, 10: skeptic 334K, 309K, 298K; judge 259K, 224K, 208K; second skeptic 347K, 198K, 170K.
- Briefs, mean characters, batch 8, 9, 10: skeptic 104K, 108K, 120K; judge 149K, 114K, 142K; second skeptic 139K, 100K, 121K. The prefix alone grew from 39.1K to 42.6K to 47.1K.
- The first call is 741K of the 2,325K (31.9%): briefs 540K (23.2%) and the harness's own start 201K (8.6%), of which 144K is the four cold starts' 36K each. Batch 8's was 23%, batch 9's 27%.
- Thinking and narration (inferred, as in `labor.md`: the stored thinking blocks are empty) is 561K, 24.1%. Batch 8's was 31%, batch 9's 27%.

### Each agent

Writes, turns, minutes, first call, thinking:

- Skeptic N: 302K, 90 turns, 18.0 min, first call 93K (cold), thinking 80K; 9 differentials (its own programs run on old and new code); refused.
- Skeptic C: 318K, 111 turns, 24.8 min, first call 58K, thinking 90K; 21 differentials; refused.
- Skeptic W: 319K, 98 turns, 23.5 min, first call 52K, thinking 91K; 16 differentials; approved, with six required corrections.
- Skeptic G: 253K, 71 turns, 25.3 min, first call 56K, thinking 79K; 9 differentials; refused.
- Judge N: 222K, 39 turns, 8.7 min, first call 106K (cold), thinking 43K.
- Judge C: 234K, 49 turns, 13.5 min, first call 66K, thinking 64K.
- Judge G: 166K, 35 turns, 8.4 min, first call 65K, thinking 42K.
- Second skeptic N: 179K, 29 turns, 5.5 min, first call 101K (cold), thinking 25K.
- Second skeptic G: 163K, 37 turns, 4.1 min, first call 88K (cold), thinking 17K.
- Second skeptic C: 168K, 41 turns, 7.6 min, first call 55K, thinking 30K.

Every judge ruled "repair" (the refusal held). Every second skeptic approved (N and G with no required correction, C with two).

### Where a skeptic's writes go (mean 298K, 92 turns, 22.9 min)

- First call 65K (22%): the brief 51K, the harness's part 14K.
- Thinking and narration 85K (29%), 0.92K a turn.
- The briefing slice (the output of the brief's `facts-extract.sh` command) 18.5K (6%).
- The ledger 7.8K and the batch record 1.9K (3% together). With the slice, the record is 29K (10%).
- The worker's transcript 16.2K (5%): read with `jq` and `awk` for the order of work, to check that the test was seen failing first (12K to 20K a skeptic, 4 or 5 calls). This is the one "chain report" cost.
- The diff 15.9K (5%).
- The original tree 46K (16%): search with no file named 19.9K, source 9.9K, library 9.6K, specification 6.0K, tests about 1K.
- Its own probes 29K (10%): running 21K, writing 7K, a little analysis. Each skeptic runs 9 to 21 differentials. Probe runs are 13 to 39 calls a skeptic.
- Builds none, stage runs about 1K, waits none, reading run output 2.3K (1%).
- Writing its verdict: `SKEPTIC.md` 6K (three of four wrote it; skeptic N wrote no file and carried its text, 7.3K characters, in its result).
- It waits little: 6.8 of its 22.9 minutes are inside commands, 2.4 minutes in commands over a minute.
- Before its first probe it has written 36% to 50% of its total (C 36% at turn 8, N 43% at turn 10, G 44% at turn 13, W 50% at turn 27).

### Where a judge's writes go (mean 208K, 41 turns, 10.2 min)

- First call 79K (38%): the brief 61K, the harness's part 18.5K (judge N started cold).
- Thinking and narration 50K (24%), 1.21K a turn, the highest per turn of any role. A judge writes the repair's work order, which is design work.
- The record 32K (16%): the briefing slice 16K, the batch record 5.4K, the ledger 4.8K, FACTS 3.7K, POSITIONS 2.3K.
- The diff 11.5K (6%).
- The original tree 24.5K (12%): search 10.5K, source 6.1K, specification 3.7K, library 2.1K, tests 2.1K.
- The skeptic's and worker's files 4.6K (2%); its own verdict write 5.3K (3%).
- It runs no program (two harness runs in the three judges) and builds nothing. Its first file write (judges C and G) is at 96% and 93% of its total. Judge N wrote no file: its ruling says the harness's rule for subagents forbids report files, so the whole ruling went out as the result text.
- Its verdict: a ruling of 2.9K to 8.6K characters, a specification ruling, and 8 to 14 numbered instructions, each concrete enough that the repair worker does it without re-deriving the reasoning. The whole verdict is 14K characters for judges C and G and 23K for judge N.
- 0.4 of its 10.2 minutes are inside commands.

### Where a second skeptic's writes go (mean 170K, 36 turns, 5.7 min)

- First call 81K (48%): the brief 51K, the harness's part 30K (two of three started cold).
- Thinking 24K (14%).
- The chain's reports 25K (15%): the repair's report and record (read from files, up to 45K bytes in one read), `SKEPTIC.md`, `JUDGE.md`. The repair's transcript 8K more.
- The diff 7.8K (5%), the original tree 14K (8%), probes 3K (2%), reading run output 9.5K (6%).
- It found nothing new but two citations (batch 10 review, Part 2, "Against the earlier notes").

### What changed since batches 8 and 9

Visible in these numbers, and already pulled from the list of `skeptic-scope-judgement.md` section 5:

- The second skeptic narrowed to the repair: 349K and 345K (batch 8), 193K and 202K (batch 9), 179K, 163K and 168K (batch 10).
- A skeptic's builds, stage runs and waits: 9.2K, 1.8K, now about 1K. The distance stage is no longer re-run by a skeptic.
- The read-back of `SKEPTIC.md`: gone since batch 9.
- The batch record reads: 7.6K, 1.7K, now 1.9K.
- What is not pulled and grew: the brief (the prefix and the carried reports), and the skeptic's own probes, from 10K and 12K (batches 8 and 9) to 21K, which is the job.

### Reading that an earlier agent of the chain had done

By labor.md's line match, per agent: a skeptic reads 83K, of which 17K (21%) its worker had read. A judge reads 68K, 27K (40%). A second skeptic reads 39K, 10K (27%). A repair reads 60K, 25K (42%).

- Over the ten checkers it is 181K, 7.8% of their writes.
- A judge's briefing slice is 46K over three judges, 32K (70%) already read by the chain. A judge's `git diff` reads are 33K, 24K (73%) already read.
- No checking agent read FACTS, POSITIONS or INDEX whole. The only result over 30K bytes in the ten was one second skeptic's read of the repair's report (45K bytes).
- Files that the brief did not name are 3.3K (6%) of a skeptic's territory reading and 2.5K (6%) of a judge's. The rest of the exploring is searches with no file named: a skeptic's 20K (35% of its territory reading), a judge's 10.5K (26%), a second skeptic's 9.9K (57%). It is the same pattern `labor.md` found for rung workers.

## 2. What the checking roles do differently from the rung worker

### By kind of work

Per agent on average, K written and share of the agent's writes. Rung worker (4 agents, 532K, 222 turns, 79.8 min), skeptic (298K), judge (208K), second skeptic (170K):

- **The first call, the brief and the harness's start.** Rung 48K (9%) of which the brief 35K (7%). Skeptic 65K (22%), brief 51K (17%). Judge 79K (38%), brief 61K (29%). Second skeptic 81K (48%), brief 51K (30%).
- **Thinking and narration.** Rung 168K (32%), 0.76K a turn. Skeptic 85K (29%), 0.92K. Judge 50K (24%), 1.21K. Second skeptic 24K (14%), 0.67K.
- **Reading the record** (the briefing slice and the record documents). Rung 58K (11%). Skeptic 29K (10%). Judge 32K (16%). Second skeptic 3K (2%).
- **Reading earlier agents' reports and transcripts.** Rung 5K (1%). Skeptic 16.5K (6%). Judge 4.7K (2%). Second skeptic 25K (15%).
- **Reading the diff.** Rung 7K (1%). Skeptic 16K (5%). Judge 11.5K (6%). Second skeptic 8K (5%).
- **Reading the original tree** (specification, source, library, tests, search). Rung 145K (27%). Skeptic 46K (16%). Judge 24.5K (12%). Second skeptic 14K (8%).
- **Running programs** (builds, tests, stages, probes, writing probes). Rung 36K (7%). Skeptic 29K (10%). Judge 0. Second skeptic 3K (2%).
- **Waiting and reading run output.** Rung 21K (4%). Skeptic 2K (1%). Judge 0. Second skeptic 9.5K (6%). Minutes inside commands: rung 43.5 of 79.8 (54%), 35.9 of them in commands over a minute; skeptic 6.8 of 22.9; judge 0.4 of 10.2; second skeptic 0.9 of 5.7.
- **Writing** (reports, edits, commits). Rung 43K (8%): product edits 19K, reports 15K. Skeptic 8K (3%). Judge 6K (3%). Second skeptic 2K (1%).

### Where the gap is largest

- By share, the first call. A checking agent pays a third of itself (32%) before it does anything, a rung worker a tenth, because a checking agent's brief is bigger (51K to 61K tokens against 35K) while its own work is smaller (233K, 129K and 89K after the first call, against 483K).
- By tokens, reading the original tree and thinking. A rung worker reads 145K of source, library, specification and search and thinks 168K. A skeptic reads 46K and thinks 85K. The checking agents are shorter jobs, not leaner ones, on the part that is the same kind of work.
- By kind of work that a rung worker does not do: a skeptic's probes on old and new code (29K), the worker's transcript (16K), the diff (16K); a judge's record reading (32K, 16%); a second skeptic's reading of the chain's reports (25K).
- By kind that a rung worker does and they do not: building and waiting. The old skill's richest parts, `build-and-caches.md` (9.6K characters), `session.md` (4.2K) and `gate.md` (6.6K), are about this. A rung worker spends 56K on builds, test and stage runs, probes, waiting and reading their output (11%); a skeptic 31K (11%), nearly all probes; a judge none.

### The brief, and why a judge's is 1.75 times a rung worker's

Sizes, batch 10, mean characters and tokens by the fit: rung worker 81K (35K tokens); skeptic 120K (51K); judge 142K (61K); second skeptic 121K (51K); repair 121K (51K).

How the briefs are made:

- Every one starts with the 47.1K-character shared prefix. Most of it is worker procedure: the batch manifest 5.3K, the worktree and seed command 2.7K, "After an edit, and after a failed build" 3.0K, "The old code beside the new" 1.5K, "Long commands" 2.5K, the briefing and the map 2.6K, "Four rules every batch enforces" 3.5K, "the three homes" 4.8K, "What you write, and what you must not touch" 4.1K, commit and push 1.2K, "If your branch already carries commits" 3.8K, compaction 0.8K, register and citing 1.0K, and the intro 10.3K (the batch's standing rules for every role).
- A **rung worker**'s own part is "The order of work" 13.0K and "Your rung" 18.9K (N). The prefix is 58% of its brief.
- A **skeptic**'s own part is its role and checks (about 20K characters: the twelve checks 9.3K, "You build nothing", the transcript note, the differential, the failure-mode question, the verdict) and the carried worker's result: the structured fields 20.9K and `reportText` 31.9K (rung N). Carried text is 44K to 60K characters, 39% to 47% of the brief.
- A **judge**'s own part is its role 0.8K, "What to read" 2.6K and "How to rule" 1.2K. All the rest, 84K to 97K characters, is "What is already known": the worker's structured result (65K to 70K characters: `reportText` 32K to 37K, `recordText` 11K to 14K, the other fields 11K to 22K) and the skeptic's structured verdict (18K to 31K; `skepticText` is carried only for N, because skeptics C and G committed their `SKEPTIC.md` and the judge reads it from the branch).
- A **second skeptic**'s own part is about 8K. The rest is carried, 52K to 84K characters, 48% to 60% of the brief: its own first judgement (20K to 31K in N and C), the judge's ruling (17K to 25K) and the repair (25K to 28K).
- A **repair**'s brief is the rung worker's role text again (29K) and the repair round (36K to 58K).
- Carried text over the ten checkers is 677K characters, 288K tokens by the fit: 12.4% of their writes. The prefix over the ten is 200K tokens, 8.6%.

Why the worker's result is carried whole:

- The harness refuses a subagent's write of `REPORT.md`: "Subagents should return findings as text, not write report files." All four rung workers and all three repairs met it. So a worker's report exists only as its result text, and the script pastes it into each later brief. `explorations/coordinator/tools/journal-text.py` was written for the gather for this reason, and its header says the script used to paste every rung's texts whole into the gather's brief.
- A skeptic's `SKEPTIC.md` and a judge's `JUDGE.md` were written and committed in five of seven cases. Skeptic N and judge N wrote no file (judge N's ruling says the harness forbids subagents report files, and skeptic N carried its text in its result), which is why only N's judge brief holds `skepticText`.
- The brief of the judge tells it to read `REPORT.md` and `record.md` "in that worktree" (its "What to read", item 3). Every attempt by a worker or a repair to write `REPORT.md` was refused, so none was on a branch for a judge or a second skeptic to read; the four landed `REPORT.md` the review lists were written by the gather. `record.md` was written by rung W and by repairs C and G. The brief carries both texts whole instead.

What the judge uses of it. A proxy, not a proof. For each block of the brief I took its citations (file names with their line, backticked spans, long identifiers, row numbers) that the shared prefix does not hold, and counted how many appear again in the judge's own calls, narration and verdict. Thinking is not stored and reading the brief leaves no trace, so this is a lower bound on use.

- The skeptic's structured verdict: 48% to 57% echoed. Its `skepticText` (carried for N only): 63%.
- The worker's structured fields: 24% to 35%.
- The worker's `reportText`: 15% to 20%; `recordText`: 20% to 28%.
- By section of `reportText`: most echoed are "the test, first" (29% to 53%), "walk's values" (20% to 39%), "decisions" (20% to 39%), "every defect measured and its home" (24% to 44%), "the text this change makes false" (21% to 54%). Least echoed are "the sites left, each with its row" (8% to 15%) and "the stages" or "the count and the distance" (12% to 21%), which are 5K to 12K characters of each report.
- The ruling cites the worker's report by section where it weighs a decision (N: "REPORT section 4, item 5 and section 9"). It checks the skeptic's required corrections one by one against the tree. For N it verified all seven, (a) to (g), with greps and `sed` reads of the specification, the ledger and `FileTests.java` (its calls 16 to 24), not from the brief's text.
- The shared prefix: 19% to 27% of its citations appear. The judge's own role says "the rules above about never touching the main tree and never running the gate were written for the rung workers". What the judge does use of the prefix: "Rule 4", the specification and a silent specification (named in "How to rule"), and the three homes.
- Inside the carried text there is little duplication: 10% to 14% of the worker's other fields repeat `reportText`.

Weighted by size, the proxy puts the echoed share of the carried text at 28% to 31% for the three judges. The skeptic's findings carry most of it, with a handful of the worker's sections; the rest is the worker's defence in full, carried because the files are not there to read on demand.

## 3. The old skill, kind by kind

### What the skill is, and what loading it costs

- At `90472e877`: `SKILL.md` 7.9K characters, 13 parts under `references/` of 69.3K characters, and `sources.md` (61.5K, "do not load it for a task"). Its subject is a worker: build, caches, seeding, tests, the gate, commit, records (`SKILL.md:46-64`).
- It has no part for a skeptic or a judge, and I found no line that says how to check a rung's work.
- Its description tells an agent to load it "before even a small build, test, edit or measurement". A judge does none of these.
- Loading costs writes once. `SKILL.md` alone is 2.2K to 3.4K tokens (3.6 characters a token to the fit's 0.425). A skeptic that took the parts for running programs, reading and reporting (build-and-caches, worktrees, tests-running, records, compiler or interpreter, session, committing, in the way `SKILL.md:66-67` suggests) would write 50.8K characters, about 14K to 22K tokens. A judge that took records, specification and library would write 21.4K characters, 6K to 9K tokens.
- No batch 10 agent loaded it or read any part. The skill was created on 2026-10-04, the day after the batch (`worker-decisions-archaeology.md` section A1), and no transcript holds a `Skill` call or a read of its files.

### Kind by kind

For each kind of spend of sections 1 and 2: covered, would reduce, or not covered. Lines are those of the old skill.

- **The harness's start** (201K over ten checkers: system prompt, tools, attachments; 144K of it four cold starts). Not covered. No skill can reduce it. Loading a skill adds to it.
- **The shared prefix** (200K tokens over ten checkers, 8.6%). Not covered by the skill. But 22.5K of its 47.1K characters (2,740 + 2,966 + 1,492 + 2,540 + 1,494 + 1,110 + 4,099 + 223 + 1,231 + 3,799 + 777) overlap a worker's procedure which the skill holds: the worktree and seeding (`worktrees.md:23-40`), the build after an edit (`build-and-caches.md:77-110`), the old code beside the new (`worktrees.md:42-64`), long commands (`session.md:7-32`), the briefing and the map (`records.md:3-26`), what you write and must not touch (`records.md:50-58`), commit and push (`committing.md:13-41`). The skill would reduce a checker's brief only if the script dropped those sections for roles that do not build and pointed to the skill. That is the "cut the prefix by role" lever of `labor.md` (lever 6), not a property of the skill. The skill would then cost a checker its load. For a judge, whose role says these rules do not apply to it, nothing needs to be loaded in their place.
- **The role text and the carried reports** (12.4% carried; role text 52K over ten). Not covered. The skill has no checking role. The cost is the harness refusing `REPORT.md`, which no skill line can change.
- **Thinking and narration** (561K, 24%). Not covered, and not measurable here. If anything the old skill adds to it: it disagrees with the batch script and with the record in places a judge can meet. `SKILL.md:38` ("follow the later source, the specification included") against the script's rules 3 and 4 and the tails' "the specification stays the standard"; `records.md:66` ("a step that would reverse a decision on record: do not take it") against the script's reversible stops. `worker-decisions-archaeology.md` section D lists these (its disagreements 1 to 3). Judge N's ruling takes a decision "on a tension inside the record" about exactly the stop.
- **Reading the record** (22K an agent; skeptic 29K, judge 32K). Covered: `records.md:3-16` says to read the slice and "do not read the big files whole", and `records.md:39` and `SKILL.md:32` say to cite a measurement rather than take it again. The checkers already behave so. It would not reduce. What it does not say: skip the part of the slice the chain has already read (70% of a judge's). That is in the brief, not the skill.
- **Reading the chain's reports and the worker's transcript** (15K an agent; a skeptic's 16K). Not covered. The skill works against the cheap form of the check: `tests-writing.md:9` says "the test needs no commit of its own: the test and the fix can be in one commit". The batch's prefix says the worker commits the test alone and the skeptic reads the order in the worker's transcript. The skeptic reads the transcript with `jq` for 12K to 20K tokens. The skill's `tests-writing.md:11` (quote two to five lines of the failing run with its command in the report) gives the evidence, but the skeptic still checks it in the transcript. No part of the skill reduces this.
- **Reading the diff** (12K an agent). Not covered. `worktrees.md:21` tells how to find the commit a fix starts from (the brief's base, else `git merge-base`), which the diff command needs; no more.
- **Reading the original tree** (30K an agent, 13%). Partly covered, small effect. The skill says where code lives (`interpreter.md:3`, `compiler.md:3-8` and `:23-26`, `library.md:3-9`, `records.md:24` the maps) and may save some searches. A checker's searches (skeptic 20K, judge 10.5K, second skeptic 10K) are for sibling sites and precedents of the rung's change, which the skill cannot name in advance.
- **Running programs** (13K an agent, a skeptic's 29K). Covered as to how: `interpreter.md:5-13` and `compiler.md:12-19` (running), `tests-running.md:34-47` (the harness), `worktrees.md:42-64` (the old code beside the new), `build-and-caches.md:5-10` (the setup lines). It would not reduce tokens: the spend is the probe programs and their output; the setup lines are 2K a skeptic (44 of 369 calls carry them), and tool errors are 5 of 377 skeptic calls. It would reduce the machine's work for old-code runs: `old-fortress.sh` is 0.04 s and 36 MB (`worktrees.md:58`) against a seeded copy's 3 s and 206 MB (`worktrees.md:25`); two skeptics seeded a copy in batch 10.
- **Waiting and reading run output** (4K). Covered (`session.md:7-32`, polling under 270 s), with nothing to cut: no checker waited beyond 2.4 minutes of commands.
- **Writing the verdict** (6K, and the verdict itself, which is not counted). The form is covered (`records.md:68-77`, `SKILL.md:44`). It does not change the size.
- **Re-running what is held.** Covered (`SKILL.md:32`; `tests-running.md:95-103`). Followed: no skeptic ran a stage in batch 10 (the review's section 3).

The result in one line: the old skill covers the worker's loop; the checking roles' spend is the brief, thinking and reading, which it does not touch.

### What it would change for the refusals

See section 4. In short, one of the three causes is a rule the skill already holds and the prefix repeats; one the skill touches in part; one it does not reach. Its other effect on checking roles is indirect: a worker that loads it spends less on builds and waits, which are not checking spend.

### What the skill cannot reach (outside the question)

Sizes the numbers show, as ceilings, not as saved tokens:

- The carried text: 288K tokens, 12.4% of the checking roles' writes. A script that wrote the worker's report to the worktree (as `journal-text.py` does for the gather) and carried only the structured fields would let a judge read what it uses. By the echo proxy of section 2 the judge uses about 30% of it.
- The prefix cut by role: 200K tokens, 8.6%; the worker's loop sections alone about 95K.
- The skeptic's transcript read for test-first: 65K over four skeptics, 25K over three second skeptics (3.8% of the checking roles). A tool that prints the order of work (the `jq` the skeptics already write each time) would take most of it.
- The four cold starts: 144K (6.2%), `labor.md` lever 1.

## 4. The share that is rework

### The numbers

- The refusal chains: N 609K (judge 222K, repair 208K, second skeptic 179K), C 645K (234K, 244K, 168K), G 495K (166K, 165K, 163K). Together 1,749K, 27.9% of the batch's 6,262K (the review's 1.75M and 28%).
- Of the checking roles' 2,325K, the judges (623K) and the second skeptics (510K) exist only because of refusals: 1,133K, 48.7%.
- The first skeptics of the three refused rungs wrote 873K. That is not rework: they found the defects. Skeptic W, which approved, wrote 319K.
- On a refused rung the checking roles wrote 703K (N), 719K (C) and 583K (G) against 319K for the approved rung W. Judge and second skeptic are 57%, 56% and 57% of that.
- A chain cost 0.97M (batch 8, mean of two), 0.70M (batch 9), 0.58M (batch 10).
- Time: N's chain took 36 minutes, C's 53 (the last 11 after every other chain had ended), G's about 2 minutes of the critical path (batch 10 review, section 4).
- All three judges upheld the refusal and all three second skeptics approved the repair. The judges did not only confirm: each found the repair's place or precedent (N: the specification's `ensureApplicationFails`; C: the guard moves to the `VarRef` rule, "the one place a variable's type is read", `impls/Misc.scala:625-643`).

### The cause of each refusal

- **N, 0.61M. A wrong change. A better worker would have avoided it.** The first pass moved `shouldRaise`'s "nothing raised" signal to `throw ForbiddenException(TestFailure)` inside the `try` whose `catch` takes `Ex`. At `Ex` = `Exception`, `UncheckedException` or `ForbiddenException` the helper caught its own signal and returned normally: a test helper that should fail passed.
  - The worker's own report (section 4, item 5) rejected `throw TestFailure` alone because it "would pass vacuously when `Ex` is `TestFailure`". Its chosen form has the same flaw at the widest `Ex`. Its test did not call `shouldRaise` at that type argument.
  - The precedent it missed is in the specification: `ensureApplicationFails` (`Specification/basic/tests.tex`, "Other Test Constructs") decides after the `try`. Its `precedentSearch` field lists library precedents only.
  - A check a skill line could have made it do first: apply to your own choice every objection you gave against the alternative; test a helper that signals by exception at the widest type argument. The old skill has neither. `library.md:13-14` sends the worker to the library's way of writing the thing, not the specification's; `SKILL.md:37` and `:39` ("check every claim against a primary source") are the nearest.
- **C, 0.65M. A premise of the record that the worker met, then guarded only in part.** The record named the team's `ImmutableArray` for a varargs parameter and asked for a passing compiled test, without checking that the compiled library declares the type (the review, section 5a; "the record did not see it"). The worker met the wall on its first test run on the edit (about 05:55) and guarded only a declared function's body (`impls/Decls.scala:210-219`). The skeptic measured the contract and the function expression (a crash, "Not in the trait table: CompilerLibrary.ImmutableArray", where the base gave an error) against the record's "A crash is never the checker's answer", and the judge moved the guard to the one place all paths pass.
  - Avoidable by a better worker: in part. A worker that asks "where does a variable's type get read" finds `VarRef`. The skill points at the map for where a fix belongs (`compiler.md:23-26`, `records.md:24`), and the batch prefix has the same rule 1. The skill also makes the premise knowable: `compiler.md:49-52` says the compiled path uses the compiler's own prelude and no declaration may be added there, and `SKILL.md:15` that each path has its own library.
  - Avoidable by the record: one grep of the compiler's library per type the record names for the compiled path (review measure 3).
  - Not covered: no line says to enumerate every path a guard must cover before guarding one.
- **G, 0.49M. One missing assertion, no code defect.** The edit repaired six declarations that stopped walk on the base; the gated test asserted five. The sixth, `FilterGenerator2.theorems`, stopped with "Generic instantiation (size) mismatch" on the base and answered on the head. The skeptic found it by running the program on both. The repair added one assertion and corrected the report; no library line changed.
  - A check a skill line could have made the worker do first: yes, and the old skill holds the rule. `SKILL.md:30` ("assert every value that matters"), `tests-writing.md:71-72` ("your change repairs it: an assertion in your gated test") and the batch prefix's "three homes" all say each repaired defect has an assertion. What was missing is the step that finds the sixth: run the old and the new code over every site the edit touches and list each one whose behaviour changed (`worktrees.md:42-64` gives the tool). No line says so.
  - The script made it a refusal ("the test does not test it" is a refusal ground, `climb-batch-workflow.js:1268`). As a required correction the gather would have spent under 0.1M by the review's estimate: about 0.4M saved. This is the review's measure 2 (a rule of the script, not of the worker).

### What the causes say

- Of the 1,749K, N and C (1,254K, 72%) follow from defects in the change, one with a record premise beside it. G (495K, 28%) follows from a rule about what a missing assertion is.
- A skill line that prevents one refusal pays for itself many times over: a chain (0.49M to 0.65M) equals about 20 to 100 loads of the whole skill (6K to 22K tokens a load). The old skill has one such line in force (G's rule) and it did not prevent G's, because the worker had counted five.
- The lines that would have helped are not in it: test the widest type argument and apply your own objection to your choice (N); enumerate every path before guarding one (C); diff the behaviour of every site on old and new code (G).
- None of this is the checking roles' own spending. It is what the checking roles cost once a worker's defect reaches them.

## Method and limits

- Writes, classes, the turn-by-turn accounting and the classifier are `labor.md`'s, unchanged (copied scripts; the run added). Run on batches 8 and 9 again, the matrix reproduces `labor.md`'s skeptic, judge and second skeptic means (334K, 309K; 259K, 224K; 347K, 198K).
- A result's size is estimated at 0.40 tokens per character plus 110 per result. Thinking and narration is the remainder of what the context grew by, not read (the stored blocks are empty). Class shares are good to a few points.
- "The brief" and "the harness's start" split a first call by the fit (41.7K + 0.425 per character). A warm start writes about 5K of harness; a cold one 36K more.
- The echo measure is a proxy and a lower bound. It cannot see use that left no trace in a call or the verdict.
- Not measured: whether any thinking or any block of a brief was needed; what a judge would have done with a smaller brief; the cost of the checks one by one (batch 8's skeptic by check is in `skeptic-scope-judgement.md`, which batch 10 was not re-split to).
- The skill was read at `90472e877`, before the rewrite in progress. The rewritten skill may cover more.
- Counts of "tool errors" are the harness's `is_error` flag.

## Files

Scratch, not committed, in the coordinating session's scratchpad (session `fe616d40`), `chk10/`: `parse.py` (transcripts to turns, run added), `acct.py`, `cls.py`, `cls2.py`, `tab1.py` (labor.md's), `matrix10.py` (the role matrix), `kinds10.py` (the kinds of section 2), `briefs10.py`, `echo.py` and `echo2.py` (what the briefs' blocks are used for), `shared10.py` (repeated reading), `explore10.py` (beyond the brief), `trace.py` (one agent's calls in order). Run `python3 parse.py && python3 acct.py` first.
