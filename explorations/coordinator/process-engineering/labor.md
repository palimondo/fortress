<!-- Where the tokens of a climb batch go, role by role, measured from the transcripts of climb batches 8 and 9 (runs wf_603242ca-111 and wf_f747fd3e-9e4, 43 agents, 14.60M tokens written) for Pavol's question of 2026-10-03: inside each role, what does the agent spend its tokens on, is all of it justified (he accepts checking and re-checking as the price of quality and asks whether that is all), whether the workers still explore on their own although they have a knowledge base and a briefing, and what several agents read alike that could be done once. Measurement only: no agent was re-run, no thinking text was read (the stored thinking blocks are empty; their size is inferred), nothing was built. Tokens are writes only (cache writes plus new input, one count per message id), as in reviews/batch-8-review.md and batch-9-review.md. The scripts and extracts are in session fe616d40's scratchpad, labor/, not committed. -->

# What a climb batch's agents spend their tokens on, by role

Measured 2026-10-03 from batch 8 (21 agents, 7.72M, run `wf_603242ca-111`) and batch 9 (22 agents, 6.88M, run `wf_f747fd3e-9e4`). The totals agree with the two reviews' stage tables. Earlier measures this one adds to: `reviews/worker-context-cost.md` (gathering about a quarter of workers' cost, weighted by re-reads), `coordinator/skeptic-scope-judgement.md` (a skeptic's spend by check), `coordinator/postmortem-2026-09-29/characterization.md` (spend by stage), and the cost sections of `reviews/batch-8-review.md` and `batch-9-review.md`.

## The answers

Words used here. A **turn** is one call to the model. A call's **writes** are the tokens the cache had to store for it: what the agent's context grew by since the turn before (the model's own words, the tool results, the harness's one-line reminders), plus a full refill if the cache had expired. A **chain** is one rung's worker, skeptic, judge, repair and second skeptic. The **brief** is the first user message. The **briefing** is the record lookup (`facts-extract.sh`) the agents run in their first calls.

**1. The fixed part is 19.5% of everything, 2.84M.**

- Every agent starts with 69K to 108K tokens before it does anything (the first call's whole context; it wrote less of it where the cache already held the system prompt).
- The system prompt and tool schemas are about 36K. They are identical in all 43 agents. 19 first calls read them from a cache another agent had warmed (35.4K to 36.7K read). 24 first calls wrote them afresh: 0.87M.
- The harness's attachments (skill list, CLAUDE.md, deferred-tool names, environment) are about 6K, written by all 43: 0.26M.
- The brief is 27K to 56K, 1.70M in all (11.7%). By role: rung 29K, skeptic 44K, second skeptic 51K, judge 56K, repair 50K, gather 42K, gate 28K, merged-diff review 41K, the review's judge 28K, the review's repair 27K, commit 34K.
- The first 39.1K characters of every brief in batch 8 (42.6K in batch 9) are one shared prefix, the same in every agent of the batch. That is 16K to 18K tokens by the fit of first-call size on brief length (R2 0.99), or 11K at 3.6 characters a token. The rest of the brief is the role's text, the rung's tail (13K to 22K characters; it lists 28 to 37 briefing entries for a worker, 5 to 10 for a skeptic or judge, counted by their `positions:`, `spec:` and similar keys) or the worker's and skeptic's reports (the judge's brief carries them whole: 53K and 21K characters in batch 9's W).
- As a share of the agent's own writes the fixed part is: rung 8%, skeptic 19%, second skeptic 31%, judge 33%, repair 23%, gather 17%, review 19%, commit 50%, gate 59%, the review's judge 35% and repair 35%.
- Of the 2.84M, the identical-in-all-agents part (system and tools written afresh, attachments, shared prefix) is about 0.91M in batch 8 (11.8% of the batch) and 0.97M in batch 9 (14.0%). With 3.6 characters a token for the prefix: 0.79M and 0.83M.

**2. The later calls: 11.76M, 80.5%.**

- The agents' own thinking and narration, written back as input on the next turn: 3.92M, 26.9%. It is the largest single class. 4,644 turns, 845 tokens each on average (about 30 of them are the harness's reminder). Check: on the 26 turns whose output count is final, the inferred size matches the output count (median ratio 0.88).
- Tool results: 5.90M, 40.4%. The text of the calls themselves (commands, heredocs, edits, report files): 1.47M, 10.1%.
- One cache refill: 0.48M, 3.3%. 0.46M of it is rung M's single wait of 280 s in batch 8. Batch 9 had 13K.
- By what the calls were for, as a share of all writes:
  - the record and the specification 12.5% (the briefing 6.1%, the other record documents 4.5%, the specification 1.9%);
  - reports, records and transcripts of the chain's earlier agents 5.6%;
  - source, library and tests 7.8%;
  - search (grep, find, ls, git log) 4.9%;
  - git diff and show 5.1%;
  - edits to product and tests 1.7%, probes and scratch scripts 1.8%, report files and record edits 2.8%;
  - build, test and stage runs, probe runs and waits 4.3%, reading their output 2.6%;
  - git commit, push and the rest 0.9%, other 0.4%.
- Roles whose job is to check or judge (skeptic, second skeptic, judge, merged-diff review, the review's judge, gate) hold 6.26M, 42.9% of the writes. Rung workers hold 36.7%. The refusal cycle (judge, repair, second skeptic) is 3.34M, 22.9%, because both batches had two refusals.

**3. Do they still explore on their own? A little, and mostly by searching.**

- A rung worker's territory reading beyond what its brief names is 54K of its 536K (10%): 31K of searches that name no file, and 24K of reads of other files. The same for a skeptic is 23K of 321K (7%).
- Of the files a rung worker read that its brief did not name, 74% by tokens were named in the briefing it had read, in FACTS or INDEX, or in the maps. 26% (5.5K a worker) were on record nowhere, and some of those are the worker's own new test files read back.
- The briefs name most of what is read: 53% of a rung worker's territory-reading tokens go to files its brief names, 62% of a skeptic's. The rest is searching.
- No agent opened `INDEX.md`. FACTS, POSITIONS, INDEX and the maps are read directly for 1.6K a rung (FACTS 0.9K, POSITIONS 0.1K, maps 0.6K). The record reaches the agents through the briefing, 6.1% of all writes.
- Before its first edit to a test or product file a rung worker has written 32% to 67% of its total (median 48% of the eight that finished): the first call, the briefing, the first reads and its probes. Batch 9's killed S was at 89%.
- Other roles, beyond the brief, K and share of their writes: second skeptic 13K (5%), judge 12K (5%), repair 17K (5%), gather 26K (5%), gate 8K (7%), review 10K (2%), the review's judge 27K (13%, the workflow script it read to see what the review may fix), the review's repair 9K (4%), commit 11K (7%). Almost all of it is search.

**4. What several agents read alike: 29% of all reading.**

- Of 4.73M tokens read (record, specification, source, library, tests, reports, diffs, searches), 1.39M were lines an earlier agent of the same batch had already been given.
- The followers in a chain (skeptic, judge, repair, second skeptic) read 1.77M, of which 750K (42%) the chain's earlier agents had read: the briefing slice 190K, git diff 142K, source 88K, reports 76K, specification 63K, library 60K, record documents 56K.
- The tail agents (gather, gate, review, the review's judge and repair, commit) read 1.28M, of which 398K (31%) earlier agents had read: git diff 122K, briefing 84K, reports 80K, specification 36K.
- What a brief carries is almost never read again: 1% to 4% of an agent's read tokens are text its own brief already held.
- The detail is in "Shared and repeated reading" below.

**5. Re-reads within one agent are small: 4.4%.**

- 249K of the 5.63M result tokens are lines the same agent had already been given, plus 31K read back from its own writes. Per role 1% to 7%. Re-runs of tests, probes and polls repeat 12% to 14% of their output, which is natural.
- The one clear case: the read-back of `SKEPTIC.md` in batch 8 (two first skeptics and one second skeptic, 8K to 10K each; none in batch 9).
- A file read in two or more calls is common (75% of file-read tokens), but that is a large file read in ranges, not the same text twice.

**Is checking and re-checking all of it?** No. In the sense of tokens written:

- 19.5% is the fixed part and 3.3% the one refill. Neither is checking.
- 26.9% is the agents' own thinking, in checking roles and building roles alike. Whether it was needed is not something this measure can say.
- 43% of the writes are in roles whose job is to check or judge, but inside them the same four things dominate: the fixed part (19% to 59%), thinking (12% to 32%), reading (the diff, specification, source, ledger) and the agent's probes.
- The part that is plainly not the job: identical text written again by each agent (about 0.9M a batch), a chain's followers re-reading the briefing and the diff (about 0.17M a batch), the review loop for one sentence (0.4M a batch, both batches), and in batch 8 the refill.

Against the earlier measures:

- Reading to learn or to verify (the record, specification, code, reports, diffs, searches) is 36% of all writes and 35% of a rung worker's (186K of 536K). `reviews/worker-context-cost.md` found a quarter of cost for rungs, skeptics and repairs, weighted by how often each result is re-read from the cache. This measure counts what is written, so the fixed part and the agents' own thinking, which that one left out of "gathering", show as the two largest classes.
- By stage, `characterization.md` had rung workers at 48.7% of output plus cache writes over 15 batches and the refusal cycle at 12.9%. In these two batches rung workers are 36.7% and the refusal cycle 22.9%, because both batches refused two rungs.
- The skeptic's totals and the opening quarter match `coordinator/skeptic-scope-judgement.md`. The reviews' stage tables match to the thousand.

## Method

- **Source.** The 43 agent transcripts under `/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows/<run>/`, labelled by `journal.jsonl`. They include the two rung workers batch 9 lost to the VM restart (W and S, first attempts) and their resumed attempts.
- **Writes** per turn are `cache_creation_input_tokens` plus `input_tokens`, one count per message id. They sum to the reviews' totals (7.72M, 6.88M).
- **Attribution.** For a turn, new content is the context size minus the previous turn's. It is the previous turn's output, its tool results and the reminders. A refill is the part of a turn's writes above that. A result is estimated at 0.40 tokens per character plus 110 per result (a fit on 55 clean turns gave 0.41 per character, R2 0.98; the earlier measure had 0.41 per byte and about 110 per call). A call's own text is 0.40 per character. What is left of the new content is the model's thinking and narration. Tool results are charged to the call that issued them.
- **Classes.** Each Bash command was split into simple commands and classed by its verb and the paths it names, in this order: build, test and stage runs, probe runs, waits, commit, writes (heredoc, redirect, `sed -i`, a Python writer), other git, then reads (by the kind of path: briefing, FACTS, POSITIONS, PLAN, ledger, INDEX and maps, batch record, specification, the chain's reports, source, library, tests, logs). A grep or find with no file operand is a search. A command that does several things is classed by the first of these it does. Of 36 calls over 1.5K tokens picked at random and checked by eye, 32 were in the right class; the four doubtful ones were a transcript query classed as search, two reads of harness scripts classed as output, and a script run classed as a library read. Treat class shares as good to a few points.
- **Beyond the brief.** A file read is "named in the brief" when its name or stem appears in the agent's first message; "in the briefing" when it appears in the briefing text the agent read; "on record" when it appears in FACTS or INDEX (or the maps) at the batch's base commit (`493b4076f`, `fa14a190c`). The test is lenient: a stem of six letters or more matches as a word.
- **Shared reading.** Lines of 25 characters or more in a result are matched with lines in earlier agents' results of the same batch (agents ordered by start time; the four rungs of a batch start together, so their mutual overlap is small by construction), and with the agent's own earlier results and calls for re-reads.
- **Not done.** Whether an agent's thinking or a brief's content was needed. Only whether it was written, repeated or re-read.

## Per role

Writes in K per agent. "n" is the number of transcripts. Percentages are of that role's writes. The matrix of every role is in the appendix; per agent below the roles.

### Rung worker (n=10, 536K, 185 turns, 190 calls)

Eight attempts that finished (I, Q, O, M, R, K and the resumed W and S) and the two killed ones in batch 9.

Where it goes:

- Thinking and narration 170K (32%).
- First call 43K (8%). The context it starts with is 72K; eight of ten started on a warm system cache.
- The briefing 45K (8%): I read 7 parts for 79K, Q 53K, O 37K, M 43K; batch 9's R, K, W, S 32K, 35K, 54K, 30K.
- Code: library 30K, source 32K, tests 3K, together 66K (12%).
- Search 31K (6%).
- Runs, builds and waits 31K (6%), reading their output 19K (3%).
- Record documents 12K, specification 9K, reports and transcripts 13K, git diff 10K (2% each).
- Edits to product and tests 20K (4%), probes and scratch 7K, report files 10K (2%), git 4K.
- Cache refill 46K (9%): rung M, 461K.

Top reads by file, tokens over the ten:

- the briefing 447K (all ten);
- `FortressLibrary.fss` 87K and `FortressLibrary.fsi` 63K (all ten);
- the killed predecessor's transcript 79K (the two resumed workers);
- `distance-sites.tsv` 51K (7);
- `RangeInternals.fss` 46K (6);
- `OverloadedFunction.java` 43K (4);
- `OverloadingChecker.scala` 42K (3);
- the ledger 40K (9).

Beyond the brief: 54K (10%), see answer 3.

Shared and repeated: 12% of what a rung worker reads had been read by an earlier agent (the four rungs start together, so this is mostly the last-started ones); 4% of its results repeat its own earlier results.

Where agents differ:

- M refilled its whole context once (461K) after a `wait_for` of 280 s; no other agent of the batch wrote more than 60K in any turn after its first (the batch 8 review).
- Batch 9's two resumed workers wrote 0.47M before their first new edit (W 0.28M, S 0.19M, the batch 9 review's figure). W read the predecessor's transcript for 67K and the briefing again (54K); S 17K and 30K.
- R and K read the most code (110K, 102K); the resumed W and S the least (39K each), having read it before they were killed.
- First edit comes at 32% of writes for O, 36% for M, 39% for K, 45% for Q, 51% for I, 54% for R, 58% and 67% for the resumed W and S.

What is the job's own: the briefing (the project's decision that workers start from the map), the reading of the code and specification to be changed, the edits, builds and probes. Nothing here is checking. What is not the job's own: M's refill, and the resumed workers' re-reading.

### Skeptic (n=8, first skeptics, 321K, 108 turns)

Where it goes:

- Thinking and narration 103K (32%).
- First call 59K (19%): 84K and 87K for I and R (cold cache), 49K to 53K for the other six.
- Reading the change: git diff 23K (7%), source, library and tests 24K (8%), specification 5K.
- Reports, records and the worker's transcript 17K (5%): the worker's transcript is read for the test-first rule (86K over the six skeptics that read it, 14K each).
- The briefing slice 19K (6%), ledger and other record 12K (4%), search 18K (6%).
- Its own probes, writing and running: 4K + 11K (5%). Reading logs and results 9K (3%). Report files 8K (2%). Build, stage runs and waits 5K.

Top reads: the briefing 152K (all eight); the ledger 55K (all eight); the worker's transcripts 86K (six); git diff 52K; `FortressLibrary.fss` 38K; `CLIMB-BATCH-8.md` 31K (the four of batch 8); `SKEPTIC.md` handled after it was written, 28K (skeptics I, Q and O of batch 8); `RangeInternals.fss` 26K; `FileTests.java` 22K.

Beyond the brief: 23K (7%). Shared: 36% of what a skeptic reads had been read by its worker (briefing 56%, specification 80%, source 56%, git diff 41%). Re-reads: 5%.

Between the batches (four skeptics each, mean writes 334K then 309K): the batch record reads fell from 7.6K to 1.7K, the `SKEPTIC.md` read-back from 4.7K to nothing, and builds, stage runs and waits from 9.2K to 1.8K.

By check, `coordinator/skeptic-scope-judgement.md` has the split of a batch 8 skeptic (about three quarters the job in Pavol's words). This section agrees with its totals (302K to 355K each, a quarter paid before the first call) and adds the class view above.

### Second skeptic (n=4, 273K)

- First call 84K (31%), thinking 65K (24%).
- Reports and records of the chain 25K (9%): over the four: `REPORT.md` 31K, `record.md` 26K, `JUDGE.md` 22K, `SKEPTIC.md` 21K.
- Git diff 20K (7%), specification 7K, code 14K, search 11K, probes 5K + 8K, output 5K.
- It is the role that changed most. Batch 8's two cost 349K and 345K; batch 9's, with the brief narrowed to the repair, 193K and 202K: 0.30M less for two refusals, against 0.24M estimated in the skeptic judgement. The briefing it reads fell from 14K to nothing.
- Still, 43% of a batch 9 second skeptic's writes are its first call (85K). Of what it reads, 54% had been read by an earlier agent of the chain.

### Judge (n=4, 242K, 50 turns)

- First call 81K (33%): the largest brief of any role, 56K tokens, because it carries the worker's structured report (whole) and the skeptic's verdict (whole). Batch 8: 105K and 72K written; batch 9: 89K and 57K.
- Thinking 69K (29%), the briefing slice 18K (7%), diff 11K, search 11K, source 9K, library 6K, specification 7K, the batch record 6K, the ruling `JUDGE.md` 8K.
- 62% of what a judge reads had been read by an earlier agent of its chain: git diff 90%, briefing 73%, source 76%, specification 66%.
- Almost none of its reading repeats its brief (1%): the brief carries the reports, the judge reads the diff and the sources.

### Repair (n=4, 320K, 94 turns)

- First call 74K (23%): the brief is the worker's role text again (29K characters) plus the repair round (61K characters in batch 8's Q).
- Thinking 65K (20%).
- Reports of the chain 30K (9%): `JUDGE.md` 39K over the four, the worker's report 27K, `SKEPTIC.md` 15K, `record.md` 12K.
- Writing: report files 26K (8%), probes and scratch 11K, edits to product and tests 8K.
- Briefing 14K, specification 9K, code 21K, search 15K, runs and waits 15K, output 15K.
- Batch 9's W refilled 9K once.
- 43% of what a repair reads had been read earlier by its chain; its briefing slice was 100% a repeat.

### Gather (n=2, 497K, 200 turns)

- Thinking 108K (22%), first call 84K (17%).
- Reports and records of the four rungs 74K (15%): `REPORT.md` 50K, `SKEPTIC.md` 43K, `record.md` 20K over the two gathers.
- The record: PLAN 30K a gather (60K over the two), FACTS 12K, handover 13K, ledger 2K: 58K (12%).
- Git diff 36K (7%), search 19K, library and tests 13K, specification 7K.
- Writing: fold scripts 33K, report files 27K, git 16K, edits 2K.
- Beyond the brief 26K (5%). 25% of its reading had been read by earlier agents.

### Gate (n=3, 121K)

- The fixed part is 59% (71K), thinking 15K (12%), the rest runs (8K), reading summaries and logs (5K), scratch (7K).
- Batch 8 ran it twice with the same brief (119K, 117K), batch 9 once (126K).

### Merged-diff review (n=2, 436K, 126 turns)

- Thinking 106K (24%), first call 83K (19%).
- Git diff 87K (20%): the whole merged diff.
- Reports and records 62K (14%); record documents 53K (12%): ledger 23K, handover 14K, PLAN 11K; specification 9K.
- Batch 8's review read back a persisted tool output for 25K.
- 31% of what it reads had been read by an earlier agent: reports 39%, git diff 41%, specification 59%.

### The review's judge (n=2, 199K) and repair (n=2, 203K)

- Judge: first call 71K (35%); record documents and the workflow script 33K (17%), the script `climb-batch-workflow.js` being 33K over the two (it read it to see which paths the review may fix); specification 11K (6%); reports 13K, diff 11K; thinking 33K (17%).
- Repair: first call 70K (35%), and the briefing 62K (31%): it ran the `checks` briefing of all four rungs to fix one sentence (46K in batch 8, 73K in batch 9, 65% of it lines already read by the others); runs of probes 16K; thinking 14K.
- Together 0.41M (batch 8) and 0.39M (batch 9), each for one sentence of `changes.tex`.

### Commit (n=2, 153K)

- First call 77K (50%), thinking 19K (13%), record documents 18K (FACTS 7K, handover 8K), diff 11K, search 10K, git 6K.

## Shared and repeated reading

What was read by several agents of a batch, with tokens (lines of 25 characters or more matched across agents; the first reader's copy is not counted as repeated):

- **The briefing.** 833K read by 32 agents, 341K (41%) lines an earlier agent had already read. In a refused chain the follower slices are the same text: batch 8's Q slice (8.0K) was read by the skeptic, judge, repair and second skeptic (32K); O's (16.6K to 17.9K) by the same four (68K). In batch 9 the followers' slices were 65% to 98% lines of the worker's own briefing (R 94%, K 91%, W 89%, S 65%), and the skeptic, judge and repair of S each read 9.3K of the same text. Repeats within a chain: 69K (batch 8), 121K (batch 9).
- **Git diff and show.** 685K read, 284K repeated (41%): judge 90%, the review's judge 80%, review 41%, gather 47%, skeptic 41%.
- **Specification.** 257K, 117K repeated (45%). `changes.tex` 75K by 17 agents, `inference.tex` 40K by 13, `conversions-coercions.tex` 30K by 7.
- **Source, library, tests.** 1.04M read, 284K repeated (27%). `OverloadingChecker.scala` 92K by 10 agents (56K repeated), `EvaluatorBase.java` 71K by 6 (26K), `FortressLibrary.fsi` 67K by 21 (28K), `FortressLibrary.fss` 80K by 22 (18K), `OverloadedFunction.java` 60K by 9 (24K), `RangeInternals.fss` 66K by 7 (13K), `FileTests.java` 49K by 13 (15K).
- **The chain's reports.** `SKEPTIC.md` 144K by 18 agents (68K repeated), `REPORT.md` 141K by 14 (17K), `JUDGE.md` 62K by 9 (21K), `record.md` 57K by 8 (18K), `decision-record.md` 47K by 8 (14K). These are handovers already; the followers also read the primary text.
- **The record.** The ledger 163K by 31 agents (12K repeated, mostly different rows), PLAN 103K by 8 (the gather, the review, the review's repair), FACTS 55K by 9 (gather 11 reads, commit 8), `CLIMB-BATCH-8.md` 81K by 14 (49K repeated; batch 9's `CLIMB-BATCH-9.md` 30K by 7).
- **The fixed start.** System prompt and tools 36K, attachments 6K, shared prefix 16K to 18K: identical in all 43 first calls; see answer 1.
- **What the brief already carried.** 1% to 4% of read tokens in every role. The briefs carry the reports as structured results; the agents read the files and the primary text, not the same lines.

What of it could be done once:

- The fixed start, by the harness's cache (lever 1).
- The chain's briefing slice, computed once as the part not already in the worker's (lever 5).
- The review and the gather read the same reports and diffs (lever 7), but the review exists to check the gather.
- The followers' reading of the specification, source and diff is the checking itself. The lines are repeated, but an agent that does not look at them cannot check them. The 750K the followers read twice is the ceiling for that reading, not a saving.

## Levers

Savings are per batch, in tokens written, from the two batches. They overlap: lever 1 and lever 6 pull the same text in opposite directions. No recommendation.

1. **Put the identical start where the cache can share it.**
   - Saves: with the five-minute cache as it is, a cache break after the shared block would let the 9 to 10 agents a batch that already hit the system cache also hit the attachments and the shared prefix: 0.15M to 0.24M a batch (2% to 3%). With a longer life (one hour) or a keep-warm call, every first call after the first would read all of it: 0.74M to 0.91M a batch (10% to 13%), after one write of about 60K.
   - Evidence: 19 of 43 first calls read exactly 35.4K to 36.7K from cache, the system prompt and tools, and nothing after it, though 39K to 43K characters of prefix and the attachments were identical in every agent of the batch. Agents launched together or close behind another (the rungs, the first skeptics, part of the refusal chains) hit; the 24 that started with a cold cache (the first of each wave, all the tail agents) missed.
   - Cost or risk: it needs a harness feature (a cache break after a shared block, a longer life, or the shared text in the system prompt). I could not tell from the transcripts whether the workflow tool offers one. The shared block would have to come before anything per agent (the environment attachment, the rung). A one-hour write is priced higher per token than a five-minute write, so the saving in money is smaller than in tokens.
2. **Several reads in one turn.**
   - Saves: agents issue 1.03 calls a turn. 2,513 of the 4,644 turns (54%) are a read turn right after another read turn, and they carry 2.38M of the 3.92M thinking tokens (946 each, 1.19M a batch). If a quarter to a third were merged into the turn before, and a merged turn lost its separate thinking: 0.30M to 0.40M a batch (4% to 5%). Not counted: each turn avoided also avoids reading the whole context from the cache.
   - Evidence: the counts above; the shared prefix says nothing about issuing calls together.
   - Cost or risk: some reads depend on the one before (a grep, then a `sed` at the hit). An agent may over-fetch, which adds tokens. The saving assumes the thinking really goes; that is untested.
3. **The review fixes a text-only finding itself.**
   - Saves: 0.3M to 0.35M when it recurs. It recurred in both batches: the review's judge and repair wrote 0.41M and 0.39M for one sentence of `changes.tex` (batch 8 review section 5, batch 9 review section 6). My estimate for the review's own fix is 0.05M.
   - Evidence: the two reviews; 71K and 70K of each pair is the fixed part, and the repair's briefing reads 62K.
   - Cost or risk: in batch 9 the judge found two errors in the review's proposed sentence. A review that fixes alone has to do that clause-by-clause check itself, or a wrong sentence lands in the specification. The batch 8 review already listed this as its measure 6; the batch 9 review notes the review's prompt still lists the specification among the paths it may not fix (`climb-batch-workflow.js:1635`).
   - A narrower form: the review's repair runs the briefing slice for the finding's rung only. Saves 0.03M to 0.06M a batch (46K and 73K read, about 15K needed). Cost: it loses the cross-rung context for a finding that spans rungs.
4. **The gate runs as a script, with an agent only on failure.**
   - Saves: 0.12M (batch 9, one gate) to 0.24M (batch 8, two gates).
   - Evidence: 59% of a gate's writes are the fixed part (71K), 12% thinking, the rest runs and reading summaries. Both gates of batch 8 had the same brief.
   - Cost or risk: a script must print the landed tables and apply the pass rule. A flaky stage or a failure needs a model. The agent currently decides when a rerun is owed.
5. **Followers read the part of the briefing the worker had not.**
   - Saves: 0.07M to 0.12M a batch (69K in batch 8, 121K in batch 9).
   - Evidence: skeptic, judge, repair and second skeptic of one rung read the same slice; in batch 9 it was 65% to 98% lines of the worker's own briefing.
   - Cost or risk: the skeptic's slice exists for an independent check against the record; if it is mostly the worker's, that check is small. A tool change to diff the slice against the worker's list.
6. **Cut the shared prefix by role.**
   - Saves: 0.03M to 0.06M a batch. The worker sections (the three homes 4.8K characters, four rules 3.5K, what you write 3.1K, the briefing and the map 2.6K, 3.9K more of register, cite, commit and push, an existing branch and compaction, and in batch 9 4.5K about edits and the old code) are 18K to 22K characters, 4.5K to 9K tokens, in the prefix of the gate, commit, gather, review, the review's judge and repair: six or seven agents a batch.
   - Evidence: the prefix's section sizes in the two batches' briefs.
   - Cost or risk: several prefixes to keep in step; a role may need a rule that was cut. It works against lever 1, which wants one identical block.
7. **The gather leaves the review a digest.**
   - Saves: at most 0.07M a batch: the review re-reads 68K of lines earlier agents had read (reports 21K, git diff 34K), commit 6K.
   - Evidence: the repeated shares above (reports 39%, git diff 41%).
   - Cost or risk: the review exists to check the gather's fold; a digest from the gather weakens that. The high-risk lever.
8. **Anchors in the brief for the searches.**
   - Saves: up to 0.36M a batch is all of search (4.9%); the part that is locating a line in a file the record names is not separable in this data. If a fifth: 0.07M.
   - Evidence: a rung worker's searches are 26% of its territory reading, and 74% of the files it read beyond the brief were named in the briefing or the record, so the exploring happens inside known files.
   - Cost or risk: file and line ranges to add to each tail; stale after the first edit.

Already pulled between batch 8 and 9, visible in these numbers:

- The wait cap: the refill fell from 0.46M to 13K.
- The second skeptic narrowed to the repair: 0.69M to 0.40M for two.
- The skeptic's `SKEPTIC.md` read-back and the batch record reads: 4.7K and 7.6K to nothing and 1.7K a first skeptic.
- Seeded base builds: builds, stage runs and waits of a first skeptic 9.2K to 1.8K; of a rung worker 22K to 16K.

## Limits

- Class shares are estimates: a result's size is 0.40 tokens a character, the thinking is the remainder, and each command is classed by its verbs (about one call in ten is mixed).
- The first-call split between the system prompt, attachments and brief rests on a fit across the 43 first calls (42.5K fixed plus 0.42 tokens a character of brief, residual up to 3K). The brief's own density varies from 0.16 to 0.5 tokens a character by section, so the shared prefix is 11K to 18K tokens.
- "Named in the brief" is lenient (stems match); "not on record" includes the worker's own test files read back.
- The ordering behind "read by an earlier agent" is start time. The four rungs of a batch run together, so their overlap is understated. A line match misses a paragraph reflowed between two documents.
- The share of the thinking that was needed, and of the briefs' content that was used, is not measured. Only what was written, repeated and re-read.
- The killed batch 9 workers are in the rung averages (10 transcripts, not 8).

## Files

Session `fe616d40` scratchpad, `labor/`: `parse.py` (transcripts to turns, calls, results), `cls.py` and `cls2.py` (the command classifier), `acct.py` (writes per turn and per call), `tab1.py`, `gen_matrix.py`, `gen_agents.py` (the role matrix and the per-agent table), `topfiles.py` (top reads), `explore.py` (beyond the brief), `shared.py`, `reread.py`, `inbrief3.py` (shared reading, re-reads and brief overlap). Run `python3 parse.py && python3 acct.py` first.

## Appendix: the role matrix and every agent

Role matrix, K tokens written per agent:

| class | rung | skeptic | 2nd skeptic | judge | repair | gather | gate | review | rev. judge | rev. repair | commit |
|---|---|---|---|---|---|---|---|---|---|---|---|
| first call | 43 | 59 | 84 | 81 | 74 | 84 | 71 | 83 | 71 | 70 | 77 |
| own thinking and narration | 170 | 103 | 65 | 69 | 65 | 108 | 15 | 106 | 33 | 14 | 19 |
| briefing | 45 | 19 | 7 | 18 | 14 | 0 | 0 | 0 | 6 | 62 | 0 |
| record documents | 12 | 12 | 11 | 10 | 3 | 58 | 2 | 53 | 33 | 8 | 18 |
| specification | 9 | 5 | 7 | 7 | 9 | 7 | 0 | 9 | 11 | 3 | 1 |
| chain reports and transcripts | 13 | 17 | 25 | 6 | 30 | 74 | 4 | 62 | 13 | 4 | 0 |
| source, library, tests | 66 | 24 | 14 | 18 | 21 | 13 | 0 | 9 | 8 | 8 | 0 |
| search | 31 | 18 | 11 | 11 | 15 | 19 | 6 | 8 | 7 | 8 | 10 |
| git diff, show | 10 | 23 | 20 | 11 | 5 | 36 | 3 | 87 | 11 | 4 | 11 |
| edit product, tests | 20 | 0 | 1 | 0 | 8 | 2 | 0 | 0 | 0 | 0 | 0 |
| probes, scratch | 7 | 4 | 5 | 0 | 11 | 33 | 7 | 1 | 0 | 1 | 5 |
| report files, record edits | 10 | 8 | 5 | 8 | 26 | 27 | 0 | 3 | 5 | 4 | 2 |
| build, runs, waits | 31 | 16 | 13 | 0 | 15 | 9 | 8 | 0 | 0 | 16 | 3 |
| reading output | 19 | 9 | 5 | 1 | 15 | 6 | 5 | 0 | 0 | 0 | 0 |
| git commit, push | 4 | 1 | 2 | 2 | 6 | 16 | 0 | 1 | 1 | 1 | 6 |
| cache refill | 46 | 0 | 0 | 0 | 2 | 0 | 0 | 0 | 0 | 0 | 0 |
| other | 1 | 1 | 0 | 0 | 1 | 4 | 0 | 15 | 0 | 0 | 1 |
| **writes** | **536** | **321** | **273** | **242** | **320** | **497** | **121** | **436** | **199** | **203** | **153** |
| agents | 10 | 8 | 4 | 4 | 4 | 2 | 3 | 2 | 2 | 2 | 2 |

Every agent, K tokens written (b is the batch; `think` is thinking and narration; `record` the record documents; `reports` the chain's reports and transcripts; `code` source, library and tests; `edit` product and tests; `scratch` probes and scratch scripts; `report` report files and record edits; `run` builds, runs and waits):

```
b agent            writes turns   first   think briefing  record    spec reports    code  search    diff    edit scratch  report     run  output     git  refill   other
8 rung:I               558   225      72     165      79      11      10       9      59      27       7      28       2      17      36      29       6       0       0
8 rung:Q               633   300      36     221      53      24      32      18      58      43      14      25      29       9      40      22       6       1       5
8 rung:O               521   220      34     201      37      14       7       0      73      38       5      22       9      15      27      31       5       0       1
8 rung:M               955   210      33     178      43      15       4       8      75      32       8       3      11      11      44      25       3     461       0
8 skeptic:I            355    94      84      95      39      16       0      10      21      16      33       0       3      10      17       9       1       0       0
8 skeptic:Q            339   141      51     124       9      23      14      16      11      20      26       0       4       9      23       8       1       0       0
8 skeptic:O            302   102      52      95      19      13       1      10      25      17      20       0       6      10      22      10       1       0       1
8 skeptic:M            340   144      49     129      15      13       5       6      25      29      16       0       9       0      15      22       0       0       6
8 judge:Q              306    63     105      98       9      13      16       1      17      14      16       0       0      15       0       2       0       0       0
8 judge:O              213    45      72      61      20       4       1       0      27      10      10       0       1       6       0       1       0       0       0
8 repair:Q             364   113      98      86      10       7      10      31      21      15       6       7      12      27      19      13       3       0       0
8 repair:O             356   112      60      80      19       3       2      26      37      19       6       7      14      34      19      15      15       0       4
8 skeptic2:Q           349   105      99      97       9      24       8      28      13      10      24       0       0      10      19       3       4       0       0
8 skeptic2:O           345   104      67      96      19       9       8      11      32      16      29       2      19       1      22      12       1       0       1
8 gather               526   207      88     119       0      46       7      71      18      20      45       3      40      28      10      13      12       0       7
8 gate                 119    37      70      15       0       0       0       5       0       5       3       0       7       0       6       7       0       0       0
8 review               451   131      85     117       0      57       3      58       7       8      84       0       2       1       0       0       1       0      27
8 judge:review         207    52      72      41       2      33       9      17      10       6      10       0       0       5       0       0       2       0       0
8 repair:review        204    37      70      15      48      15       2       6       6       3       2       0       1       3      32       0       1       0       0
8 gate:after-review    117    38      70      14       0       0       0       7       0       7       2       0       7       0       7       4       0       0       0
8 commit               159    60      76      22       0      18       0       1       0      11      14       0       4       3       3       0       6       0       1
9 rung:R               578   152      72     219      32       8       4       3     110      15       4      27      10      11      29      26       2       0       6
9 rung:K               545   200      36     211      35       3       6       0     102      36      10      27       5      13      50       5       5       0       0
9 rung:W (killed)      359   125      38     106      54      11       1       5      58      22      11      26       0       0      25       0       3       0       0
9 rung:S (killed)      318   117      34     112      30       6       5       5      45      29       0      11       2       0      10      27       1       0       0
9 rung:W (resumed)     477   140      38     134      54      15       8      67      39      30      19      20       0      18      21       7       6       0       1
9 rung:S (resumed)     412   160      34     150      30       7      10      17      39      34      25      11       0      11      26      14       3       0       0
9 skeptic:R            371   101      87     122      14       7       4      12      47      11      24       3       5       9      11      14       1       0       0
9 skeptic:K            282    84      53      84      13       7       5      32      25      14      25       0       2       8      10       3       1       0       0
9 skeptic:W            324   103      51      94      32      13       2      35      21      19      26       0       1       9      22       1       1       0       0
9 skeptic:S            258    92      49      80      11       6       8      13      19      22      17       0       6       6      12       9       1       0       0
9 judge:S              220    38      89      61      10      11       4       7      14       5      14       0       0       0       0       0       6       0       0
9 judge:W              228    53      57      58      32      13       5      15      14      14       7       0       0      13       0       0       1       0       0
9 repair:S             247    67      84      36      11       0       3      14      16       5       3       4       0      23      13      31       2       0       2
9 repair:W             312    85      55      60      14       1      22      48      11      19       6      13      17      21       8       2       5       9       0
9 skeptic2:W           193    38      85      32       0       2       8      27       2       7      18       0       0       4       4       4       1       0       0
9 skeptic2:S           202    48      85      34       0       7       2      34       8       9       8       1       0       4       7       2       1       0       0
9 gather               468   192      81      97       0      70       8      77       9      18      27       1      27      25       9       0      19       0       0
9 gate                 126    46      72      16       0       7       0       0       0       7       3       0       6       0      11       5       0       0       0
9 review               422   120      81      94       0      48      15      65      12       9      89       0       0       5       0       0       1       0       3
9 judge:review         192    55      69      26       9      32      13       9       5       9      13       0       0       5       1       0       1       0       0
9 repair:review        201    40      70      14      76       1       4       3      10      12       6       0       0       5       0       0       1       0       0
9 commit               147    48      77      17       0      17       1       0       0       9       8       0       6       1       4       0       6       0       1
```
