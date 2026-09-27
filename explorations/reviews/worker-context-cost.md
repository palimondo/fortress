<!-- What the batch workers spent gathering context by searching the tree themselves, how much of what they found the record already held, and what the planned record briefing (facts-extract.sh, read first by every agent) would cost against that. Measured 2026-09-27 from the transcripts of 78 rung, repair and skeptic agents of eight workflow runs (repair batch to batch 6), for Pavol's question before the lookup becomes every agent's first step. Measurement only: nothing was built or run. Scripts and captures in worker-context-cost/. -->

# What gathering context costs the workers, against a record briefing

## The answer

- **Gathering is a quarter of what a worker costs.** Across the 78 agents, 5,094 of 9,900 tool calls read the tree, the specification, the library, the tests or the records to learn something. Their results were 14.2 MB, 6.4M tokens, written into context once and then re-read from cache 682M times, which is 31% of all the agents' cache reads. Priced, that is 51.5M input-token equivalents (ITE, defined below) of the 217M the agents cost, 24%, or about $216 of $915 at list price: 660K ITE per agent on average, 1.72M per Opus 5.5 rung worker.
- **The cost is in the re-reading, and most of it is early.** A result stays in context and is paid again on every later turn, so what an agent reads before its first edit or probe costs most: those reads are 39% of the gathering calls and 69% of the gathering cost.
- **It also takes time.** The gathering calls themselves ran 2.0 h of tool time, and the turns that issued them took 11.3 h of model time, of 44.1 agent-hours: about 10 of every 34 minutes of a worker's wall clock.
- **FACTS, INDEX and the maps were a small part of it.** 65 of the 78 agents read them at least once (all 22 on Opus 5, 43 of 56 on Opus 5.5), 2.3 calls per agent, 10 KB, 38K ITE: 6% of the gathering cost. The agents grep the record for a line; they do not read it.
- **What the record already held was about a tenth of the gathering.** On eight agents read by hand against the record at their run's start: 9% of the gathering cost went to things FACTS, INDEX or the maps already stated (how the harness decides an `XXX` test, what `ant compileAll` does to the caches, how the shards count, what a prior rung found), and 9% to reading the record itself. The rest a briefing does not remove: 38% was primary text the agent had to read anyway (source to edit, tests to model, specification lines to cite), 22% was not on record (the rung's own question, new ground, the gap ledger, other rungs' reports), and 16% was the batch's decision record, which the prompt names and a briefing does not replace. The remaining 6% was the classifier's error.
- **The briefing costs more than it could save, except perhaps on rung workers.** The rung-O lookup plus `--common` prints 68,784 bytes, which is 29K tokens, not 20K (measured on these agents: 0.41 tokens per byte of tool output, plus about 110 per call). Read first, it is re-read on every turn: over the same 78 agents it would have cost 19.1M ITE (about $82), 9% of their whole cost and 37% of all their gathering. The gathering it could have removed is 4.9M ITE (the held part alone), 8.6M (with the agents' own record reads) or at most 15.9M (with the output of the turns that did that gathering). On the 27 rung workers the briefing, 9.6M, falls inside the range it could save (3.4M to 10.8M); on the 37 skeptics (6.8M against 0.9M to 3.8M) and the 14 repairs (2.7M against 0.6M to 1.3M) it is a cost in every case. Agent by agent in the sample it costs 0.9 to 5.3 times the most it could save, and breaks even only on long rungs whose topic the record already covered (batch 6's R, 0.9; batch 5's D, 1.0).
- **What that leaves out.** This prices context only. The lookup's stated purpose is that an agent works from the whole territory rather than a local view (Pavol, 2026-09-27), and what that is worth in wrong local decisions avoided is not measured here. Its net price, on these runs, is 3M to 14M ITE over 78 agents, 1.5% to 6.5% of what they cost; half of the briefing is the `--common` part, printed to every agent alike.

## Sources and method

- **Transcripts.** `/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows/`: `wf_aabc0cb2-d31` (repair batch), `wf_3b5a273c-a80` (batch 1), `wf_d1628adb-2ee` (batch 2) on Opus 5; `wf_776d7c2c-6c3` (3), `wf_207012c9-0ef` (3.5), `wf_f54d0e4b-63d` (4), `wf_88172730-ebe` (5), `wf_b262c534-337` (6) on Opus 5.5. The role is the `.meta.json` description.
- **Scope: all of them, no sampling for the measurements.** 78 agents: 27 rung workers (`rung:*`), 14 repair workers (`repair:*` in the Rung phase and batch 3.5's `resume:I`) and 37 skeptics (`skeptic:*`, `skeptic2:*`). By era: Opus 5 has 9 rungs, 2 repairs, 11 skeptics; Opus 5.5 has 18, 12, 26. The review's own repair (`repair:review`, `repair:gate`), judges, gathers, gates and commits are outside the question and left out.
- **A turn** is one API call: the records sharing one message id, with the usage of the last one. In 60% of the Opus 5.5 turns and 19% of the Opus 5 turns that last record has no `stop_reason`, and its `output_tokens` is a streaming snapshot (often 1 to 10); the true output is recovered from how much the context grew before the next turn.
- **Tokens of a result.** `calibrate.py` regresses each turn's context growth, on the turns whose usage is final, on the previous turn's output, the bytes of the tool results, their number, and the system reminders: growth = 0.95-0.99 x output + 0.41-0.42 x result bytes + 107-115 per result + 0.35-0.38 x reminder bytes, R² 0.97 and 0.99 (`calibration.json`). Output, thinking included, stays in context (its coefficient is 0.95-0.99). A result's tokens are 0.41 per byte plus about 110.
- **Cost of a result.** A result sits at a fixed place in the prefix from the turn after its call. On every later turn the part of it inside that turn's cache read is billed at the cache-read rate, the part inside the turn's cache write at 1.25 (the first turn that sees it, and every turn after the 5-minute cache expired), the part sent uncached at 1. The one compaction (batch 6, rung F) ends every earlier result. All writes in these runs were 5-minute writes.
- **ITE, input-token equivalents**: tokens times their price relative to fresh input. Cache write 1.25, cache read 0.1 on Opus 5 and 0.05 on Opus 5.5, output 5. Dollars at list price, $5 per M input on Opus 5 and $4 on Opus 5.5. The accounting closes: results and outputs are 81% of the agents' cost, the prompt prefix re-read each turn 18%, system reminders and rounding 1%.
- **Time.** A call's tool time is its result's timestamp minus its call's. A turn's model time runs from the last result before it to its last record, shared among the calls it issued.
- **The first edit or probe** is the first Edit or Write, the first shell write to a file outside the agent's scratch space (not `tmp/`, not a log, not build output), or the first run of a Fortress program or test. A baseline `ant compileAll` in the background, or a helper script written to `tmp/`, is neither.
- **The briefing's cost** is the same billing applied to a 29K-token block placed right after the prompt, over the agent's own turns and cache hits and misses. The four lookup calls add four turns (a few thousand ITE), left out.

### The classification rule, and the hand check

- **Rule** (`classify.py`). A call is *gathering* when it reads to learn from the territory: source, library, specification, tests, the project's records, or git history of any of them. It is *inspecting* when it reads the work itself: the agent's own outputs, logs, diff and commits, or the rung directory it works in (for a skeptic or a repair worker, the rung under review, whose report and probes are its brief). It is *doing* when it edits, writes, builds, runs a probe or a test, commits or reports; and *other* for waits, setup and bookkeeping.
- **Mechanics.** Almost every call is a shell command (9,541 of 9,900). Heredoc bodies are cut out (a heredoc into a file is a write), quoted text is masked, simple shell variables are expanded, the command is split into simple commands and each one's verb is read. Any write, edit, build, run or commit makes the call *doing*. Otherwise any reading verb (`grep`, `sed -n`, `cat`, `find`, `git log`, `git show`, a read-only Python snippet) makes it *gathering* if a path it reads lies in the territory or it names none (a bare `grep -r`), and *inspecting* if every path it reads is the agent's own work. A command after a single pipe is a filter and reads nothing. `git log` or `git show` over the agent's own branch range is inspecting, `git diff` always. A long output the harness saved to `tool-results/` and the agent read back belongs to the call that produced it. The agent's own rung directory is the slug in its structured report plus any `compile-ladder/` directory it writes into.
- **Hand check** on two agents, every call read: batch 1's rung M (Opus 5, 71 calls: 31 gathering, 16 inspecting, 24 doing) and batch 3's skeptic R (Opus 5.5, 80 calls: 55, 7, 18). I would classify 3 of M's 31 gathering calls otherwise (a look at the build's state, a re-count of its own ladder results, a `git diff --name-only` piped through a grep for forbidden paths), 5.4 KB and 4% of its gathering cost, and 4 of R's 55 (a `git show` of the rung's own commits, a look at the caches, two checks of its own report's citations), 2.9 KB and 3%. I found no call the script put elsewhere that was gathering. On the eight hand-labelled agents below the same error is 6% of the gathering cost (13% on batch 5's D, which compared an inherited attempt's staged files with the tree). **The gathering figures are therefore a few per cent high.**

## 1. What gathering cost

Per agent, means. ITE here is the result's own cost with its re-reads; the output of the turns that issued the calls (their thinking and the calls) is counted apart, in "turns' output".

| group | n | turns | calls | whole cost | gathering calls | bytes | tokens | cost | share | turns' output | before first edit, calls / cost |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Opus 5, rung | 9 | 105 | 124 | 2.90M | 64 | 167K | 77K | 782K | 27% | +21% | 46% / 74% |
| Opus 5, repair | 2 | 71 | 79 | 1.85M | 26 | 64K | 30K | 172K | 9% | +8% | 14% / 25% |
| Opus 5, skeptic | 11 | 58 | 71 | 1.53M | 36 | 91K | 42K | 214K | 14% | +19% | 45% / 66% |
| Opus 5.5, rung | 18 | 212 | 219 | 5.47M | 117 | 363K | 162K | 1.72M | 31% | +22% | 41% / 71% |
| Opus 5.5, repair | 12 | 103 | 108 | 2.03M | 46 | 104K | 48K | 232K | 11% | +13% | 24% / 41% |
| Opus 5.5, skeptic | 26 | 98 | 101 | 1.84M | 55 | 145K | 65K | 309K | 17% | +20% | 38% / 70% |
| Opus 5, all | 22 | 78 | 93 | 2.12M | 46 | 119K | 55K | 443K | 21% | +19% | 44% / 70% |
| Opus 5.5, all | 56 | 136 | 140 | 3.05M | 73 | 206K | 93K | 746K | 24% | +20% | 38% / 69% |
| all 78 | 78 | 120 | 127 | 2.78M | 65 | 182K | 82K | 660K | 24% | +20% | 39% / 69% |

- **Totals.** 5,094 gathering calls, 14.2 MB, 6.4M tokens written once, 682M tokens re-read from cache, 51.5M ITE: 9.7M on Opus 5 ($49) and 41.8M on Opus 5.5 ($167). The whole: 217M ITE ($915).
- **The other categories, per agent over all 78:** inspecting 25 calls, 98K bytes, 253K ITE; doing 36 calls, 32K bytes, 89K ITE (its cost is mostly output and wall time: 350 s of tool time against gathering's 90 s); other 1 call. The prompt prefix alone, re-read on every turn, is 496K ITE per agent.
- **Time per agent:** gathering calls 90 s of tool time and 522 s of model time, of 34 min wall; inspecting 353 s and 162 s; doing 350 s and 562 s.
- **Rungs carry it.** The 27 rung workers are 57% of the agents' cost (125M ITE) and 74% of the gathering cost (38.0M); the 37 skeptics 10.4M and the 14 repairs 3.1M.
- **Output of the gathering turns.** The turns that issued gathering calls produced output worth another 20% of the agents' cost, with its own re-reads. Some of it is the thinking the gathering fed, which a briefing would need too, so it is an upper bound on what could go with the calls.

What the gathering read, per agent means (a call naming several kinds is shared among them):

| read | Opus 5 calls / bytes / ITE | Opus 5.5 calls / bytes / ITE |
|---|---|---|
| source | 14.9 / 32K / 135K | 18.5 / 42K / 144K |
| library | 6.8 / 15K / 51K | 8.9 / 19K / 78K |
| specification | 4.6 / 9K / 33K | 13.8 / 32K / 101K |
| tests and harness | 8.2 / 18K / 67K | 6.7 / 14K / 43K |
| other records (ledger, reports, reviews, POSITIONS) | 6.6 / 19K / 56K | 13.3 / 52K / 198K |
| the batch's decision record | 1.0 / 14K / 56K | 2.7 / 28K / 110K |
| FACTS, INDEX, maps | 1.6 / 7K / 28K | 1.7 / 8K / 34K |
| git history | 2.3 / 4K / 12K | 5.5 / 9K / 26K |

## 2. FACTS, INDEX and the maps

Per agent, means; "pre" is the share of these calls made before the first edit or probe.

| group | agents that read them | calls | bytes | tokens | cost | tool / model time | pre | share of gathering cost |
|---|---|---|---|---|---|---|---|---|
| Opus 5, rung | 9 of 9 | 3.3 | 16K | 7K | 69K | 6 s / 19 s | 53% | 9% |
| Opus 5, repair | 2 of 2 | 1.5 | 4K | 2K | 10K | 2 s / 9 s | 0% | 6% |
| Opus 5, skeptic | 11 of 11 | 1.5 | 5K | 2K | 9K | 2 s / 13 s | 24% | 4% |
| Opus 5.5, rung | 18 of 18 | 4.7 | 25K | 11K | 115K | 6 s / 30 s | 55% | 7% |
| Opus 5.5, repair | 7 of 12 | 0.7 | 4K | 2K | 5K | 1 s / 4 s | 0% | 2% |
| Opus 5.5, skeptic | 18 of 26 | 1.4 | 3K | 1K | 5K | 2 s / 9 s | 11% | 2% |
| all 78 | 65 of 78 | 2.3 | 10K | 4K | 38K | 3 s / 15 s | 39% | 6% |

- The calls are greps for a line or a `sed -n` of a few lines of FACTS or a map, not reads.
- Agents whose gathering read a map at least once, batch by batch from the repair batch to batch 6: 100%, 90%, 83%, 68%, 43%, 55%, 29%, 25%. FACTS: 67%, 20%, 17%, 47%, 43%, 91%, 86%, 58%. INDEX: 17%, 30%, 50%, 5%, 14%, 0%, 0%, 0%. The maps gave way to FACTS from batch 4 on, and INDEX went out of use.
- The whole record at the runs' starts was 390 KB (repair batch) to 590 KB (batch 6): FACTS 61K-154K, INDEX 21K-83K, the maps 306K-356K.

## 3. Opus 5 against Opus 5.5

- **Opus 5.5 agents ran longer**: 136 turns against 78, 36 min against 28, and gathered more per agent (73 calls, 206K bytes, against 46 and 119K). Per turn it is the same: 0.54 gathering calls and 1.5 KB against 0.59 and 1.5 KB. The later batches' rungs were bigger (batch 4's N, batch 6's F at 658 turns), so the difference is the work more than the model.
- **The share of cost is close**: 24% against 21%. Opus 5.5's cache reads cost half as much relative to input, which offsets its longer runs; a gathered token costs 8.0 ITE over its life on both.
- **Opus 5.5 reads the specification and the records two to three and a half times as much** (spec 32K against 9K bytes per agent, other records 52K against 19K, the batch record 28K against 14K). The batch records and the gap ledger grew over the batches.
- **Opus 5.5's repairs and skeptics touch the record less**: 7 of 12 repairs and 18 of 26 skeptics against every Opus 5 agent, and at 5K ITE each against 9-10K. Its rungs touch it more: 4.7 calls against 3.3.

## 4. What the record already held: eight agents by hand

Chosen to cover both eras and all three roles, weighted to rung workers because they carry three quarters of the gathering: batch 1's rung M, skeptic N and repair N and batch 2's rung X (Opus 5); batch 3's skeptic R, batch 4's rung O, batch 5's rung D and batch 6's rung R (Opus 5.5). 491 gathering calls, 1.35 MB, 6.0M ITE, 73 min. For each call `sample.py` prints what the agent said it was looking for, the command, and which of its files and search words the record at the batch's base commit names (FACTS.md, INDEX.md and the maps by `git show`; bases `49ee5e91a`, `cb242a2d8`, `8590d7a9e`, `d610695c0`, `abdfbb2db`, `47437c65f`, `6030e4b36`, `e5414f5bf`). Each call was then labelled by hand against that record (`labels.py`, which states the labels in full):

- **B**, the batch's decision record, which the prompt says to read first;
- **K**, a read of FACTS, INDEX or a map;
- **H**, held: the record stated what the agent went to learn, and it did not need the primary text;
- **P**, primary text needed: source to edit, a test to model, specification or library lines to cite or check a claim against, whether or not the record pointed there;
- **N**, not on record: the rung's own question, new ground, or records the lookup does not print (gap-ledger rows, other rungs' reports and probes, POSITIONS, git history);
- **O**, not gathering after all (the classifier's error).

| agent | gathering calls | cost | B | K | H | P | N | O |
|---|---|---|---|---|---|---|---|---|
| Opus 5, batch 1 rung M | 31 | 220K | 20% | 13% | 0% | 22% | 40% | 4% |
| Opus 5, batch 1 skeptic N | 27 | 177K | 19% | 0% | 5% | 41% | 0% | 34% |
| Opus 5, batch 1 repair N | 24 | 148K | 0% | 3% | 18% | 53% | 1% | 25% |
| Opus 5, batch 2 rung X | 98 | 1.46M | 11% | 7% | 11% | 52% | 18% | 0% |
| Opus 5.5, batch 3 skeptic R | 55 | 227K | 25% | 0% | 12% | 37% | 23% | 3% |
| Opus 5.5, batch 4 rung O | 66 | 898K | 19% | 11% | 2% | 25% | 42% | 1% |
| Opus 5.5, batch 5 rung D | 102 | 1.85M | 17% | 13% | 7% | 26% | 25% | 13% |
| Opus 5.5, batch 6 rung R | 88 | 1.03M | 17% | 6% | 16% | 49% | 11% | 1% |
| **all eight, by cost** | 491 | 6.0M | 16% | 9% | 9% | 38% | 22% | 6% |
| all eight, by calls | | | 3% | 4% | 12% | 43% | 28% | 9% |

- **Held (H)** is mostly how the test harness works (`FileTests.java`'s `XXX` and `shouldFail` rules, the shards, the heaps, `bin/fortress`), which FACTS has held with line numbers since the repair batch and batch 2, and the results of earlier rungs that FACTS summarises. Batch 6's R read `FileTests.java` in eight calls (about 100K ITE) for rules FACTS lines 72-73 state; batch 2's X spent 40K ITE finding that `ant compileAll` wipes the cache, which FACTS line 79 already said.
- **Primary text (P)** is the bulk everywhere: the Scala checker R had to change, the codegen and linker X had to change, the natives O had to count, and every specification and library line a skeptic checks a report against. The record named every file the call read in about half of the sampled calls (262 of 491), but naming a file is not holding what the agent needed from it.
- **Not on record (N)** is largest where the rung's question was new: O's count of what relies on fixed-width wrapping (42%) was the rung's own work, and it became FACTS afterwards; batch 6's follow-up O list now carries it. D's 25% includes a new defect it found (the interpreter's overload order). The gap ledger's rows, read by seven of the eight, are N because the lookup does not print them.
- **The batch record (B)** cost 16% of the sampled gathering: D read four sections of `CLIMB-BATCH-5.md` early, 316K ITE over its 214 turns. The briefing would come on top of it.

## 5. The briefing's cost against its saving

The briefing is rung O's list plus `--common` from `facts-extract.sh` on `script-retry` at `21dcccfe2`: `--common` parts 1-2, 25,432 and 11,206 bytes; the list's parts 1-2, 26,168 and 5,978 bytes. 68,784 bytes, 29K tokens. `--common` is 53% of it and is the same for every agent.

| agent | briefing cost | held | held + record reads | with those turns' output | briefing / most it could save |
|---|---|---|---|---|---|
| Opus 5, batch 1 rung M | 205K | 1K | 30K | 59K | 3.4 |
| Opus 5, batch 1 skeptic N | 161K | 9K | 9K | 30K | 5.3 |
| Opus 5, batch 1 repair N | 185K | 27K | 32K | 64K | 2.9 |
| Opus 5, batch 2 rung X | 467K | 168K | 269K | 384K | 1.2 |
| Opus 5.5, batch 3 skeptic R | 145K | 27K | 27K | 117K | 1.2 |
| Opus 5.5, batch 4 rung O | 342K | 21K | 117K | 150K | 2.3 |
| Opus 5.5, batch 5 rung D | 651K | 129K | 361K | 628K | 1.0 |
| Opus 5.5, batch 6 rung R | 296K | 166K | 227K | 326K | 0.9 |
| all eight | 2.45M | 0.55M | 1.07M | 1.76M | 1.4 |

- **Per agent over all 78**, the briefing would have cost 245K ITE on average: 9% of the agent's cost, 37% of its gathering (b/g in `summary.txt`). By group: 350K on an Opus 5 rung and 358K on an Opus 5.5 rung (12% and 7% of their cost), 176-237K on skeptics and repairs (9-13%). A token read first is paid about 1.25 + 0.05 or 0.1 per later turn: 3 to 23 ITE per token here, against the 1 the "20K tokens" figure suggests.
- **Projected to the 78 agents** with the sample's shares (rungs held 9%, held and record reads 18%, with output 28%; skeptics 9%, 9%, up to 36%; the repair 18%, 22%, 43%): the briefing costs 19.1M ITE; the gathering it could have removed is 4.9M (held), 8.6M (held and record reads) or 15.9M (with the turns' output). Net, 3.2M to 14.2M ITE more, about $14 to $61 at list price over these eight runs. By role: on rungs the briefing (9.6M) falls inside the range it could save (3.4M to 10.8M); on skeptics (6.8M against 0.9M to 3.8M) and repairs (2.7M against 0.6M to 1.3M) it is a cost in every case.
- **Time is about even.** The held and record-read gathering took 34 to 148 s per sampled agent; four calls at the agents' pace of about 9 s per gathering call, plus reading 29K tokens, is roughly a minute.
- **Where it comes near paying:** long rung workers on a topic the record already covers, R and D above. Where it does not: skeptics and repairs, whose gathering is mostly checking a report against the primary text, and rungs on new ground (M, O).
- **The dominant term is the re-read, not the size.** Halving the briefing halves its cost; shortening the run does the same. `--common`, identical for every agent, is 15K tokens and about 130K ITE per agent of the 245K.

## Limits

- The token model is a fit (R² 0.97-0.99), not the API's own count per result; per-result figures carry that error, totals less so because the accounting closes.
- Prices are list prices relative to input as the API documents them for these tiers; the Opus 5.5 cache write price is derived from the standard 1.25.
- The classifier over-counts gathering by a few per cent (§ the hand check). The first-edit rule is mechanical; a rung that wrote a capture file early reads as having edited early.
- The eight-agent labels are one reader's judgement; the labels are in `labels.py` and each call is in `sample/*.txt` with the agent's own words, to be checked. H is a lower bound in one sense: a fact the record held but the agent never went looking for is not counted, and neither is any error the briefing would have prevented.
- The briefing's cost assumes the same turns. An agent that reads 29K tokens first might take fewer turns, or more.

## Files

- `worker-context-cost/agents.py` (the eight runs and the 78 agents), `parse.py` (turns, calls, results), `classify.py` (the rule), `calibrate.py` (the token fit, writes `calibration.json`), `measure.py` (writes `calls.csv`, one row per call, and `agents.csv`), `aggregate.py` (writes `summary.txt`, every table of §1-3 and a line per agent), `sample.py` (writes `sample/*.txt`, the eight agents' gathering calls against the record at their base), `labels.py` (the hand labels and their tally, writes `labels.txt`).
- Run in that order: `python3 calibrate.py && python3 measure.py && python3 aggregate.py && python3 sample.py && python3 labels.py`. `sample.py` needs the main repository at `/home/user/fortress` for `git show`; numpy for `calibrate.py`.
