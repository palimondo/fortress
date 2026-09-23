<!-- What climb batch 3 cost and how efficiently it used its tokens: run wf_776d7c2c-6c3, 2026-09-22 18:52 to 2026-09-23 01:31 UTC. Written 2026-09-23 by a worker for the coordinator, with the method of coordinator/iteration-cost.md and coordinator/repair-batch-review.md so that the numbers compare. Measurement only: no build or test was run. One line per paragraph. -->

# Climb batch 3: what it cost

## Sources

- [J] the run's journal, `journal.jsonl` in `/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows/wf_776d7c2c-6c3/`: one line per agent start and per result, with labels and result text.
- [K] the harness's summary of the run, `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/tasks/w17s4dbco.output`: for each agent `tokens`, `toolCalls`, `durationMs`, `startedAt`, `queuedAt` and `model`, plus the run's log lines and final result. It lives under `/tmp` and is not in the transcript backup.
- [U] the thirty agent transcripts in the same directory as [J], summed per agent over distinct request ids: `input_tokens`, `cache_creation_input_tokens`, `cache_read_input_tokens`, `output_tokens` and `message.model`; tool time is the gap between a `tool_use` and its `tool_result`. The parser and the per-agent CSV are in that session's scratchpad, `b3cost/` (`parse.py`, `agg.py`, `timeline.py`, `agents.csv`), and are not committed.
- [H] the baselines: `microgpt-run-c-handover.md` ("Climb batch 1 landed", "Climb batch 2 landed"), `FACTS-history.md:208` and `:238`, `repair-batch-review.md` §7-8, `iteration-cost.md` §A, and the batch's own estimate at `CLIMB-BATCH-3.md:27`.

What "tokens" means here. The harness's figure, 8,187,390, is the sum of each agent's context at its last request. [U] reproduces it as 8,186,772, which is 618 tokens (0.008%) short, the same reading `repair-batch-review.md` §7 gave the repair batch's figure. It measures how big the contexts got, not what the model processed. The tokens the model actually processed number 598,764,948 [U]: 587,064,515 cache reads, 8,935,278 cache writes, 8,400 fresh input and 2,756,755 output.

## 1. The totals against the earlier batches

- Repair batch: 11 agents, 2,600,293 tokens, 955 tool calls, 3 h 55 min, 2 rungs landed. Per rung: 1.30 M tokens, 478 calls, 118 min [H].
- Climb batch 1: 15 agents, 3,022,210 tokens, 1,110 calls, 3 h 11 min, 4 rungs. Per rung: 0.76 M tokens, 278 calls, 48 min [H].
- Climb batch 2: 17 agents, 3,748,433 tokens, 1,496 calls, 5 h 16 min, 3 rungs. Per rung: 1.25 M tokens, 499 calls, 105 min [H].
- Climb batch 3: 30 agents, 8,187,390 tokens, 3,019 calls, 6 h 39 min (18:52:41 to 01:31:23, 398.7 min). Five of its six rungs landed (P stopped). **Per rung landed: 1.64 M tokens, 604 calls, 80 min**; per rung attempted, 1.36 M tokens [K].
- The batch's own estimate was 28-32 agents, 6.5-7.5 M tokens and 8-10 hours (`CLIMB-BATCH-3.md:27`). The agent count landed inside that range, tokens came in 0.69 M (9%) above its top, and the wall clock came in 81 min below its bottom.
- The spans do not cover the same stretch. The earlier three run until the batch landed on `main`. Batch 3's run ended with `landed: false`, "review still blocking after one repair" [K], so the coordinator's closing work and its second gate fall outside the 6 h 39 min.

## 2. Where the tokens went

By role: harness tokens and their share, tool calls, and agent-minutes [K].

| role | agents | tokens | share | calls | agent-min |
|---|---|---|---|---|---|
| rungs | 6 | 2,125,005 | 26.0% | 1,005 | 265.6 |
| first skeptics | 5 | 1,342,596 | 16.4% | 574 | 128.2 |
| judges | 6 | 1,094,949 | 13.4% | 158 | 72.7 |
| rung repairs | 4 | 945,867 | 11.6% | 309 | 59.4 |
| second skeptics | 4 | 1,038,267 | 12.7% | 355 | 68.1 |
| gather | 1 | 528,877 | 6.5% | 220 | 35.8 |
| review, its repair, review2 | 3 | 993,228 | 12.1% | 349 | 53.8 |
| gate | 1 | 118,601 | 1.4% | 49 | 21.7 |

- The six rungs and their first skeptics, which are the work the batch exists for, took 42.4% of the tokens. The other 57.6% went to the judges, the repairs, the second skeptics, the gather, the review trio and the gate.
- The biggest single agent was the gather, at 528,877 tokens and 220 calls. The smallest was the gate, at 118,601.

By model [U]:

- The 24 agents that are not judges show one identifier in `message.model` on every request: the workers' tier. Their `.meta.json` asks for the alias the script passes to workers (`climb-batch-workflow.js:38`). [K] gives the same identifier with a context-window suffix that the transcripts do not carry.
- The six judges show a second identifier on every request: the session's tier. Their `.meta.json` names no model, so they inherit the session's, as the script intends (`climb-batch-workflow.js:22`, `:634`). The six are `judge:P:stop`, `judge:S`, `judge:M`, `judge:R`, `judge:C` and `judge:review`.
- **The judges together: 1,094,949 harness tokens (13.4%)**, 158 tool calls in 93 requests, and 72.7 agent-minutes. In processed terms that is 11,662,348 tokens (1.9% of the batch), of which 342,619 were output (12.4% of the batch's output). The session tier's budget paid for that 11.7 M, output included.
- No agent switched model during the run.

## 3. Input against output

- Across the whole batch the processed tokens were 98.0% cache reads, 1.5% cache writes, 0.001% fresh input and 0.46% output [U].
- Per role, as cache reads / cache writes / output, in percent [U]:
  - rungs 98.2 / 1.4 / 0.39
  - first skeptics 98.1 / 1.4 / 0.53
  - rung repairs 97.8 / 1.7 / 0.55
  - second skeptics 98.0 / 1.5 / 0.52
  - gather 99.1 / 0.7 / 0.23
  - review trio 98.5 / 1.2 / 0.32
  - gate 94.8 / 4.7 / 0.56
  - judges 87.4 / 9.6 / 2.94
- Fresh input stays under 0.02% for every role.
- The judges stand apart because they bundle several tool calls into one request: 158 calls in 93 requests, 1.7 per request. The workers made 2,861 calls in 2,802 requests, 1.02 per request. Fewer requests means the judges re-read their context fewer times.
- On its last request an agent carried 272,913 tokens of context on average. By role: gather 528,853, rungs 354,149, review trio 331,064, first skeptics 268,506, second skeptics 259,560, rung repairs 236,452, judges 182,443, gate 118,598 [U].
- Does the shared prefix cache across agents, as FACTS "The container" says? Yes, with one qualification. On their first request, 18 of the 30 agents read 33,901-34,221 tokens from cache. That is the system prompt and tools, and its size depends on the role: 34,221 for rungs and repairs, 34,053 for skeptics, 33,901 for judges. Each agent then wrote its own first message, 20,781-34,670 tokens [U].
- The qualification: the batch's shared prefix sits inside that first message. No agent ever read it from another agent's cache, so 30 agents wrote it 30 times.
- The 12 agents that read nothing from cache fall into two groups. Six were the first agent of their role: `rung:P`, `skeptic:L`, `judge:P:stop`, `gather`, `review` and `gate`. The other six started more than five minutes after the last request that used their role's prefix: `judge:S` (54 min after `judge:P:stop`), `repair:S`, `skeptic2:M`, `judge:review`, `repair:review`, and `review2` (36 min after `review`).
- Every cache write in the batch is the five-minute kind; there are no one-hour writes [U]. So agents that run one after another share the cache too, not only agents that run in parallel, provided the gap stays under five minutes.

## 4. The four refusal cycles

Each refusal cost a judge, a repair and a second skeptic. For each: what it was about [J], then tokens, agent-minutes, tool calls, and the time from the refusal to the second approval [K].

- **S, a rendering that overwrote two working ones.** The rung's new default printed `RR32` for an `RR32` holding 1.5, and `StringVector` where the base tree printed `[a b ]`. 799,352 tokens, 63.4 agent-min, 240 calls, 121.1 min.
- **R, a near-tie numeral without a home.** `round(2.50000000000000001)` gives 2 on both paths where the specification gives 3, and the rung moved walk's answers away from the specification without recording it. 615,531 tokens, 42.2 agent-min, 154 calls, 93.5 min.
- **C, a comment measured false.** Comment 2 said "a number or": that `Array3`'s exclusion lets an operator between a number and an `Array3` be declared. The skeptic's cold-cache probes showed the clause plays no part in that case. 659,281 tokens, 34.8 agent-min, 189 calls, 79.5 min.
- **M, a citation off by one line.** `REPORT.md:7` placed the capture's lambda at `TypeAnalyzer.scala:757`; it is at `:756`. The judge's instruction opened with "Textual only: no build, no stage run, no suite". 620,642 tokens, 32.4 agent-min, 182 calls, 88.5 min.
- **All four together: 2,694,806 tokens (32.9% of the batch), 172.8 agent-minutes (24.5%), 765 tool calls (25.3%).** They also pushed the gather's start from 22:26:17, when the last first skeptic finished, to 23:45:46: **79.5 minutes of wall, 20% of the span** [K].

Which were worth their cost:

- **S and R were worth their 1.41 M tokens.** S caught a regression in output that already worked on the compiled path, which the rung's own test never checked. R caught a divergence from the specification that the rung itself made worse. Its cycle produced a gated expected-failure test and row 360, and its second skeptic found two more defects (rows 361 and 362). A cheap check would not have caught either one; each needed a probe the rung had not thought to run.
- **C and M were not worth their 1.28 M tokens and 67.2 agent-minutes.** Both defects were real, and both were textual. In both, the skeptic's refusal already spelled out the exact fix: drop "a number or"; change `:757` to `:756`.
- The cheaper check already exists: an approval that carries required corrections, which the commit stage must close (`climb-batch-workflow.js:610`). It would have closed both for nothing. M could not use it, because the script's check 0 makes any mismatch in the provenance block a refusal (`climb-batch-workflow.js:582`).

## 5. The clock

- **Concurrency was 1.77×**: 705.3 agent-minutes in a 398.7-minute span. The repair batch managed 1.21× and the eight-rung climb 1.00× [H]. Two agents were running for 306.7 min, one for 91.9, and none for 0.1 [K].
- 33.7% of agent time (237.9 min) was spent inside tool calls and 66.3% in the model. For comparison: repair batch 32.2%, eight-rung climb 57.8% [H].
- The rungs were scattered in the order P, L, S, M, R, C, longest expected first (the run's first log line [K]). Actual walls: P 40.0 (stopped), L 51.2, S 66.5, M 55.7, R 20.0, C 32.2 min. The guess missed at the top: S, third in line, ran longest.
- Time spent in the queue [K]:
  - rungs: S 40.0 min, M 51.2, R 106.5, C 107.0
  - `skeptic:L` waited 87.9 min after its rung ended, behind rungs R and C, which had been queued at launch; the other first skeptics waited 35.9-53.2
  - `judge:P:stop` waited 86.6; the rung judges 11.4-38.4
  - repairs 9.3-17.8; second skeptics 9.9-19.5
- The waits come from having only two slots, not from the order. The 24 per-rung agents add up to 582.6 agent-minutes, which two perfectly packed slots would finish in 291.3 min. They actually ran from 18:52:41 to 23:45:45, 293.1 min, so no other order could have saved more than 1.8 minutes [K].
- The tail ran one step at a time: the gather alone (35.8 min), then the review (17.3) beside the gate (21.7), then `judge:review` (11.5), `repair:review` (20.2) and `review2` (16.2). **That is 105.6 minutes, 26.5% of the span, and for 88 of those minutes one slot sat idle** [K].
- The gate took 21.7 min of wall, 17.9 of them inside tools, 5.4% of the span, and ran once [K]:
  - `compileAll` 27 s
  - `testFast` 6 min 49 s (1,435 tests)
  - `testSystem` 2 min 42 s (389 tests)
  - 39 four-thread `atomic` runs
  - the 85-file ladder in 4 min 22 s
  - the checker-count stage
- The gate went red only at the checker-count stage, which read 103 against the manifest's declared 102. No test failed; the miss was in the expected number.

## 6. Efficiency observations

1. **Twice, the judges' tier paid for a ruling that did not need it.** The six judges spent 1,094,949 tokens, 342,619 of them output, on the session's tier. Two of them (M and C) ruled on textual refusals whose fix the skeptic had already written, at 356,587 tokens between them. A refusal whose required change is textual could go to a judge on the workers' tier, or skip the judge entirely.
2. **A second skeptic costs what a full rung review costs, whatever the refusal was about.** Second skeptics spent 1,038,267 tokens and 68.1 agent-minutes in all. For M and C, whose repairs changed one digit and two words, they spent 537,009 tokens and 30.3 minutes, and for M that included a fresh `ant compileAll` and a stage re-run [J]. A second check limited to the judge's instruction list would have cost a fraction of that. On M the full second pass did find something: a misstatement of the soundness invariant, raised as a required correction. But a first skeptic held to the right standard should find that the first time.
3. **Each agent's starting context is now about 61k tokens, not 45k, and it makes up 29% of all cache reads.** The 30 agents started at a mean of 60,604 tokens (range 55,004-70,971), 1,818,128 in all, 22.2% of the harness figure. Because that starting context is re-read on each of the 2,895 requests, it accounts for 172.0 M of the 587.1 M cache reads, **29.3%** [U]. FACTS's 45k figure dates from before the first message grew to 21-35k. Cutting 10k from that message would save about 29 M cache reads in a batch this size.
4. **The review's second pass ran without a second gate, and the batch still did not land.** `judge:review`, `repair:review` and `review2` cost 810,131 tokens, 248 calls and 48.0 minutes of one-at-a-time wall, 12% of the span. The repair added two test files to `ProjectFortress/tests/`, which by the judge's count takes `testSystem` from 389 to 391 [J]. No gate ran on that tree during the run. Then `review2` refused again, on two findings in the records, and the run ended without landing [K]. The second gate falls to the coordinator, after the script has finished.
5. **The one-at-a-time tail is now the critical path.** For 105.6 of the 398.7 minutes, only the gather or the review agents were working. The gather alone ran 35.8 minutes and was the biggest agent of the batch (528,877 tokens). The per-rung phase already fits within 1.8 minutes of what two slots allow, so the next saving has to come from the tail, not from the queue.
