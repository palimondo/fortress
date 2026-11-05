<!-- The combined post-batch review of climb batch 26, the batch of coordinator/CLIMB-BATCH-26.md that is phase 4's fourth batch, on a reduced scope (rungs W, S, L and T; run wf_d59166e9-114, base 4d27fbcc5571f0157b3dfda3977b63430c66d701, launched at 20:16:21 UTC on 2026-11-05 and finished at 22:42:12 UTC the same day, 12 agent transcripts, no restart, no resume, no judge, no repair round; landed and pushed at a12ab5c60: rung W c41c3d2b0, rung S 3eabf8435, rung L d96242f0a, rung T 93884be8d, the closes 9e8acf425, the gather record 4f4bba6d6, the merged-diff review's corrections 40d1deca5, the gate's tables a12ab5c60), owed at the landing by the coordinator skill's references/batch.md, "The landing", step 3, in the form of reviews/batch-25-review.md, by a review worker reading only, against main at 29fdf74e1 (the boot note, after the landing; nothing else changed since a12ab5c60). New in this review's form: the cost in three spans (section 3) and the routing list that the record-landing workflow reads (Part 4). The measures are batch-measures.py's on climb batches 24 (wf_fe6a0ece-c70), 25 (wf_3d220d41-726) and this run, with the rows of climb batches 20 to 23 taken from reviews/batch-25-review.md; transcript-study/skill-load.py's and spend.py's on this run; and scratch scripts in /tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/rev26/ (agents.py, calls.py, errs.py, gaps.py, nohup.py, runs.py, teststeps.py, tokens.py and upto.py copied unchanged from climb batch 25's review's rev25/; brief2.py copied with its file pattern widened to take sl1.txt, which leaves climb batch 25's figure at 265K; spans.py and prepgroups.py new, for the three spans: spans.py puts each transcript in the span where it last changed, spend.py's rule, and reads only the agents' meta labels and the headless sessions' cwd and branch, no content). Tokens are writes only (input plus cache creation, one count per message id). The microGPT walk check is reported by its verdict only, at the curator's ruling of 2026-10-23. Besides reading, this review ran only those scripts, record.py check, ledger.py check and landing-check, facts-extract.sh, grep, diff and git, which write nothing in the tree. A VM restart at 23:02 UTC stopped this review once, before it had written anything; it went on from its scratch. -->

# Climb batch 26: walk's half of row 804, the NaN sentences, local functions compiled and the string family, with the count and the distance at 0; a run of 2.55M after a preparation of 16.2M; the practice, the routing and the skill sentences owed before the next batch

## What came up in this run

### 1. The count 0 and the distance 0, row by row against climb batch 25's tables

**What the record expected** (`coordinator/CLIMB-BATCH-26.md`, section 5, "The gate, and what it should show"): the count 0, reported, its 14 api rows as the comparand's, with T's `match` and three pairs the first bindings of the one library to name `stringOps`, `simpleConcatenate`, `systemOps` and `simplePrintln`, so that a site there is T's to explain; the distance 0 over the fourteen, `#crash none`, 'DISTANCE SAME   0' and no setting line; `testSystem` about 751 and the compiler track about 1,431, "and any more that the rungs add"; the library track 86, the other-compiler track 263, the misc track 440; `testSpecData` 130; the 42 atomic runs unchanged; the ladder's 85 at `pass`; the 52 demos at the gather; microGPT's quick pair at the commit stage. The gate ran on `4f4bba6d6` and was green (the gate's result in the run's journal). The review's `40d1deca5` came while it ran and touched only `explorations/` (its `pathsOutsideExplorations` is empty; `git diff --name-only 4f4bba6d6 40d1deca5` lists FACTS, FACTS-history and PLAN), so no `# repair-ungated` line was owed.

**The count's table** (`climb-batch-26/gate/checker-count.txt` against `climb-batch-25/gate/checker-count.txt`): `diff` prints nothing. The table is climb batch 25's byte for byte: 14 api rows, all 0, `#total 0`, `#locations 0`, `#crash none`, `#shadow matches the tracked StaticChecker`.
- **No row is new and no row rose, so no row needs a rung edit to explain it.** The tables say so; nothing else does.
- The helpers stay one row. The `FortressLibrary` component's helper strings went from 101 to 105 and its helper classes from seven to nine, `stringOps` (`match`) and `simplePrintln` (the three prints) added by rung T (`git show <rev>:Library/FortressLibrary.fss | grep -o 'nativeHelpers\.[A-Za-z]*\.'` at `4d27fbcc5` and at `a12ab5c60`). The rewrite makes one synthetic import per package, so they stay the one row `com.sun.fortress.nativeHelpers 0` (`reviews/batch-24-review.md`, section 1).
- The count reads `stringOps` and `simplePrintln` against the interpreter's prelude for the first time, and finds nothing. It reads every method of a class that a binding names (F-321), so the line separator's helper, which rung T moved into `stringOps` at `8b6fca9b5` after its count run, is read only by the gate's run.

**The distance's table** (`climb-batch-26/gate/distance.txt` against 25's): `diff` prints only the `#seconds` row, 246 (`FortressLibrary` 182) against 271 (205), and the `#machine` row's load at start, 0.34 against 0.59. `#total 0`, every `#kind` 0, `#crash none` and `#shadow` are the same. `compare.sh` printed 'DISTANCE SAME   0' and no setting line (`climb-batch-26/gate/summary.txt`, `# distance`).
- The stage read 304 of the 306 helper strings: `FortressBuiltin`'s 187, `FortressLibrary`'s 105 and `FlatString`'s 12, the last read for the first time. `System`'s two, `getEnvironment` and `getProperty`, are read by neither stage (`git grep -h -o 'builtinPrimitive("com.sun.fortress.nativeHelpers' a12ab5c60 -- Library ProjectFortress/LibraryBuiltin | wc -l` prints 305, `natLineSeparator`'s string being on its own line at `Library/FlatString.fss:26`; the gather's count, `RECORD.md`, "Text mismatches").
- **One site came and went inside rung T, before the landing.** On `19e9dbda5`, with `natLineSeparator` naming `systemOps.lineSeparator`, the distance stage stopped `FlatString` at 'FortressBuiltin.StringVector is undefined.': the checker reads all of `systemOps`, whose `getArgs` answers an `FStringVector` (F-321; row 895). T moved the helper to `stringOps` (`8b6fca9b5`) and the stage gave 0 (`RECORD.md`, "Points to report", T).

**The per-site list** (`compile-ladder/gate/distance-sites.tsv`): its header alone, as before (the commit stage's result).

**The summary's other rows** (`climb-batch-26/gate/summary.txt` against 25's):
- `CompilerJUTest` 1,417 to 1,432, +15. By the rung commits (`teststeps.py`): L +13 (its five run tests, a link and a run each, and its three `XXX` compile tests), T +2 (its compiled guard); W and S 0. S's NaN asserts joined two existing tests.
- `testSystem` 741 to 756, over shards of 184, 193, 183 and 196: 15 walk programs added, W 6 (its library-shape test and its guard, the promotion a rename, and its skeptic's four), S 1, L 5 (its walk guards), T 3 (the rope test, the carried-`self` test and its skeptic's glue guard) (`git show --name-status` of each rung commit).
- The forecasts, about 751 and about 1,431, counted the planner's tests and said "and any more that the rungs add": W's skeptic's four and T's skeptic's one walk programs, and L's third `XXX` test, of `atomic`, are the rest.
- The library track 86, the other-compiler track 263, the misc track 440 and `testSpecData` 130, as before. The atomic runs: 42 of 42 `PASS`.
- `compileAll` 5 seconds: the gather had built the same code in the main tree, so the caches were kept and the library order was not run (the gate's result).

**The ladder** (`climb-batch-26/gate/ladder/`): 85 of 85 at `pass`, no move; `comparison.txt` and `microgpt-comparison.txt` are empty. Against 25's files, `ladder.tsv` with its `secs` column masked is the same.
- **One change the comparison does not read.** In `microgpt-phase.md`, three rows change their first error from 'ImmutableArray is undefined.' to 'DelegatedIndexed is undefined.', their phase unchanged at `disambiguate`: `MicroGptFlat.fss`, `MicroGptFlatCheck.fss` and `MicroGptAplCheck.fss`. Each imports `System`, and rung T gave `Library/System.fsi` its first import, `import FlatString.{FlatString}`, whose api names `DelegatedIndexed`, a type the compiler's prelude lacks (`Library/FlatString.fsi:16`; `git diff 4d27fbcc5 a12ab5c60 -- 'Library/*.fsi'`, whose one new import is that one). Traced by reading, not run. `mg_phases` compares phases only, so the gate printed nothing; climb batches 19 and 22c met the same kind of move (`reviews/batch-22c-review.md`, section 1). It goes with the switch-over.

### 2. The stages' times against climb batch 25's gate

- **The count stage: about 180 s.** By the file times of the gate's log, 178 s (the commit stage's figure in F-240); by the gate's call times, 181 s (launched at 22:35:03, done at 22:38:04), beside the ladder subset (22:34:41 to 22:39:09). At 25's gate, 158 s and about 160 s. On rung T's tree, 152 s. One run each: no measured difference.
- **The distance stage: 246 s** (`FortressLibrary` 182 s) at a start load of 0.34, against 271 s (205 s) at 0.59. The gate started it 12 s before `testFast` (calls at 22:19:27 and 22:19:39), as at 25's gate (9 s), so `testFast`'s four JVMs ran beside it again. The fall is no measured difference either.
- **The suites:** `testFast` 7 min 57 s, against 8 min 27 s, with 15 more compiled steps; `testSystem` 3 min 50 s, against 3 min 46 s, with 15 more programs; `testSpecData` 1 min 6 s, against 1 min 5 s.
- **The machine block** (`summary.txt`, `# machine`): load 2.40, 5.31, 4.18, against 2.60, 5.52, 4.35. Its JDK line now reads 'Picked up JAVA_TOOL_OPTIONS: …', with the local proxy's port, and its thread line 'FORTRESS_THREADS=unset', where 25's read the JDK version and `FORTRESS_THREADS=1` (process finding 3).
- **The gate:** 20.8 minutes (22:19:01 to 22:39:50), against 23.5.
- **F-240** now gives climb batch 26's figures, written by the commit stage (`a12ab5c60`). Its next sentence, "That rise has no measured cause", now follows a fall; the commit stage named it for the routing (its result).

### 3. The cost, by role, against the record and the batches before, and in three spans

From `batch-measures.py` on the three runs, and this review's scripts on this run's folder. **The run wrote 2.55M over 12 agent transcripts for 12 roles, in 2 h 27 min** (20:16:49 to 22:43:25 UTC). No agent was refused, retried or killed. `tokens.py` gives the same 2.55M; the writes with the output tokens are 3.16M. The harness's 2.77M, which the coordinator's brief quotes, is neither: another measure, as climb batch 25's "about 2.4M" was (its review, finding 9).

| Role | B20 | B21 | B21b | B22 | B22c | B23 | B24 | B25 | B26 | B26 share |
|---|---|---|---|---|---|---|---|---|---|---|
| Rung workers | 848K (2) | 1.64M (4) | 1.34M (3) | 890K (3) | 1.51M (4) | 772K (2), and 476K killed | 2.41M (7) | 2.93M (7), and 219K killed | 990K (4) | 38.8 % |
| Skeptics | 757K (2) | 1.52M (4) | 1.07M (3) | 958K (3) | 1.37M (4) | 740K (2) | 2.25M (7) | 1.15M (7), and 229K killed | 707K (4) | 27.7 % |
| Judge on a rung | 0 | 0 | 0 | 0 | 146K | 0 | 0 | 0 | 0 | |
| Gather | 426K | 565K | 439K | 392K | 501K | 348K, and 289K killed | 466K | 1.07M, 708K of it two cache refills | 333K | 13.1 % |
| Merged-diff review | 362K | 381K | 412K | 335K | 376K | 322K | 366K | 238K | 204K | 8.0 % |
| Its judge and repair | 0 | 165K + 227K | 0 | 0 | 231K + 214K | 0 | 0 | 0 | 0 | |
| Gate | 117K | 127K | 122K | 127K | 132K | 135K | 126K | 99K | 204K, 94K of it a cache refill | 8.0 % |
| Commit | 131K | 125K | 118K | 122K | 136K | 121K | 130K | 96K | 113K | 4.4 % |
| **Total** | **2.64M** | **4.75M** | **3.50M** | **2.82M** | **4.61M** | **3.20M** (2.44M finished) | **5.74M** | **6.03M** (5.58M finished) | **2.55M** | |
| Agents, rungs | 8, 2 | 14, 4 | 10, 3 | 10, 3 | 15, 4 | 11 (8 finished), 2 | 18, 7 | 20 (18 finished), 7 | 12, 4 | |
| Span | 2 h 10 | 4 h 26 | 3 h 40 | 2 h 35 | 4 h 37 | 2 h 57 | 5 h 01 | 4 h 47 | 2 h 27 | |
| Per rung, all roles | 1.32M | 1.19M | 1.17M | 0.94M | 1.15M | 1.60M (1.22M finished) | 0.82M | 0.86M (0.80M finished) | 0.64M | |

**Against the record:** "About 3.6M tokens written: from 3.1M if no fix is contested, to 4.7M with a judge and a repair round on one rung or a restart", and "About 4 h 15 min, at two agents at a time" (`CLIMB-BATCH-26.md`, section 1, "Cost"). No fix was contested, and no restart came.
- **2.55M, 29 % under the estimate and under its low end.** Workers 990K against about 1.9M; skeptics 707K against about 0.7M; the fixed roles 854K against about 1.0M.
- By rung, worker against the record's figure: W 210K against 0.45M; S 186K against 0.3M; L 314K against 0.65M; T 279K against 0.5M. Every worker wrote half or less of its figure.
- The skeptics wrote 107K to 218K each, mean 177K, against the record's 0.18M each: W 218K, L 195K, T 188K, S 107K. They ran 31 to 74 messages and made 2 fix commits.
- **The time:** 2 h 27 min against about 4 h 15 min. The workers took 109 minutes in all against the manifest's 285 (W 18 against 70, S 13 against 45, L 31 against 90, T 47 against 80; `CLIMB-BATCH-26.md`, section 5, "The manifest, rung by rung"), which order the scatter only.
- One item that no estimate holds: the gate's cache refill, 94K (process finding 2).

**Against the batches before:**
- Per rung, all roles: 0.64M, the lowest of the nine runs; 0.86M at 25 and 0.82M at 24.
- Workers and skeptics together per rung: 0.42M, against 0.65M at 25 and 0.67M at 24. Three of the four rungs changed Java (W walk's load check, L the code generator, T the loader and three helper classes); S changed the specification and guards.
- The fixed roles: 0.85M, against 1.50M at 25 (0.79M without its gather's two refills) and 1.09M at 24. With four rungs the fixed roles are a third of the run.

**The order of the run.** Two agents at a time, the workers first in the scatter's order L, T, W, S by the manifest's expected minutes (90, 80, 70, 45): L and T at 20:16, W at 20:48 when L returned, S at 21:03 when T returned. Then the skeptics as slots freed: L's at 21:06, T's at 21:14, W's at 21:16, S's at 21:26 (the journal's `started` lines). So each skeptic started 10 to 18 minutes after its worker's result: L's 18, T's 11, W's 10, S's 10. The gather started 2 s after the last skeptic (21:32:00), the gate and the review 2 s after the gather (22:18:57), the commit 2 s after the gate.

**The cost in three spans, each on its own** (the `coordinator` skill's `references/batch.md`, "The landing", step 3). Each span is `spend.py <start> <folders>` less `spend.py <end> <folders>`, over the same folders: the session's agents (`…/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/`), each workflow folder that changed since climb batch 25's landing (`workflows/wf_3d220d41-726/`, `wf_c21ad72e-68c/`, `wf_437ba8aa-fe9/`, `wf_e824e246-be0/`, `wf_d59166e9-114/`), and the headless sessions' folder (`/root/.claude/projects/-home-user-fortress/`, the coordinating session's own transcript left out by `spend.py`). A transcript counts in the span where it last changed.

| Span | From | To | Written | Transcripts |
|---|---|---|---|---|
| The landing work of climb batch 25 | `11d2d8764`, 2026-11-03 03:49:44 | `cf63661a4`, 05:48:07 | 1.75M | 10 |
| The skill update, run by hand that day | `cf63661a4`, 05:48:07 | `f11ad4602`'s push, 06:01:37 | 0.09M by the rule, about 0.20M in all | 1 |
| The preparation of climb batch 26 | 05:48:07 on 11-03 | `4d27fbcc5`, 2026-11-05 20:16:21 | 16.26M (16.17M from 06:01:37) | 70 |
| The run | `4d27fbcc5`, 20:16:21 | `a12ab5c60`, 22:42:12 | 2.44M | 11 |

`spend.py` printed 20.77M from 03:49:44, 19.32M from 05:06:32, 19.02M from 05:48:07, 18.93M from 06:01:37, 2.76M from 20:16:21 and 0.32M from 22:42:12 (each total holds this review's own transcript, which last changed after every end, so the differences leave it out).

- **The landing work of climb batch 25, 1.75M.** Climb batch 25's commit agent, 96K: its transcript last changed at 03:50:44, a minute after its last commit, so by the rule it counts here, not in its run. The post-batch review, 566K. The record-landing workflow (`wf_c21ad72e-68c`), 785K: sort 215K, write 66K, check 217K, cold read 93K, fix 66K, judge 128K; it ended at 05:04:43 with its branch ready (`34c0275da`, 05:06:32), so 1.45M of the span falls before 05:06:32. Then, to 05:48:07, 0.30M: the batch script's fixes from that review (175K, `888712bb6`) and the orientation update's admission agent (`wf_437ba8aa-fe9`, 125K). The coordinator's landing of the branch by hand (`9342ddbb2`, `784104683`, 05:42:51) is in its own transcript, which `spend.py` leaves out.
- **The skill update by hand, about 0.20M.** By the rule, 0.09M: the cold read (94K). The skill writer's headless session (`487bf11d`, `tools/skill-writer.sh`, its tasks at 05:49 and 05:59 in `tmp/skill-writer/`) was resumed once more at 06:28 for the coordinator skill, so its 125K counts in the preparation; by its messages' times 106K of it falls before 06:01:37. The next review, whose workflow includes the skill update, compares with about 0.20M.
- **The preparation, 16.26M over two and a half days.** By the transcripts' labels and the commits of `git log 11d2d8764..4d27fbcc5` (188 commits), from 06:01:37 (`prepgroups.py`):
  - **Climb batch 26 itself, 3.88M:** the planner 1.82M (`4259eeba1`, `9d58052a9`), the Fable review of the record 0.84M (`81602c01d`, `2892fe7ac`), the manifest generator 0.43M (`f75a77c82`, `515ea5798`), the strings' design review 0.42M (`bdf99a63b`) and its Fable judge 0.11M, his two decisions recorded 0.16M (`258905f57`), the base build 0.09M. Four resumes after long gaps rewrote 1.42M of it (process finding 1).
  - The drafts page and the coordinator skill's rule changes, with their cold reads, 2.49M (17 transcripts; the drafts page's agent 1.35M, 11-03 19:07 to 11-05 12:30).
  - The revival page, 2.44M (10; its rebuild 1.24M; `713b16f3f`, `e7c27de39`).
  - The review queue's cleanup and its record items, with the boot note's trim, 1.73M (6; `bd06be5b8`, 312 open items to 65; `bdb244edb`, `f2251f937`).
  - The other pages, 1.15M (10: the `fortress-repo` page, the learning page, the pages' inventory `ae376fd7d`, the publish probe).
  - The two design reviews and their probes, 1.13M: the NaN comparison 0.49M (`efa45eade`), `Number`'s closure 0.46M (`0fea3898e`), the NaN check's two cost probes 0.18M (`7b729c2fd`, `a3252d568`).
  - The skill writer's two other headless sessions and its 06:28 task, 1.08M.
  - PLAN's third consolidation, 0.91M (`0c2855796`, `40826f355`); the record-landing workflow's changes, 0.57M (`a1d0d63c6`, `6edff99a7`); the archaeology and the timeline, 0.57M (`b82cebb99`); the cache and push probes and the correction of climb batch 25's finding 7, 0.23M.
- **The run, 2.44M.** The run's 12 transcripts but its commit agent, whose transcript last changed at 22:43:25, 73 s after `a12ab5c60`; its 113K counts after the run, in the next landing span, as climb batch 25's did in the first span. No other transcript changed in the span.

So the preparation wrote 6.6 times what the run wrote, and the batch's own preparation, 3.88M, 1.5 times. The run's span holds only the run.

**The briefing's use and cost** (the `coordinator` skill's `references/batch.md` asks the share at a landing):
- **8 of 8 briefed launches read it, the four workers and the four skeptics, none in its first turn.** The workers' first briefing calls came at calls 9 to 13, 41 to 89 s after each agent's start; the skeptics' at calls 5 to 8, 21 to 41 s (`brief2.py`).
- Its results came to about 133K tokens, 5.2 % of writes, at 0.40 tokens a character plus 110 a call: workers 92K (T 30.6K, W 27.4K, L 23.6K, S 10.4K), skeptics 40.6K (W 12.9K, T 12.6K, L 10.4K, S 4.7K). The workers' figures are within 1K of the record's (W about 27.5K, L 23.4K, T 29.7K; "The briefings, rung by rung"), but for S: it read its first part whole, 23.6K characters, and its parts 2 and 3, which one call printed together, only by `grep` and a few lines, after the tool saved the 32.9K result to a file (process finding 4). Per launch about 16.6K.
- Skeptic L saved its briefing as `sl1.txt`, which climb batch 25's pattern did not take; with the widened pattern climb batch 25's run gives the same 265K.

| Batch | Briefed agents | In the first turn | Run at all | At calls | Seconds after start | Its tokens (estimate) |
|---|---|---|---|---|---|---|
| 20 | 4 | 0 | 4 | 9 to 12 | 48 to 78 | 89K, 3.4 % |
| 21 | 9 | 0 | 9 | 8 to 15 | 24 to 97 | 193K, 4.1 % |
| 21b | 6 | 0 | 6 | 10 to 21 | 45 to 94 | about 111K, 3.2 % |
| 22 | 6 | 0 | 6 | 11 to 16 | 60 to 73 | about 117K, 4.2 % |
| 22c | 10 | 0 | 10 | 2 to 17 | 11 to 98 | about 186K, 4.0 % |
| 23 | 6 (4 finished) | 0 | 6 | 13 to 23 | 67 to 165 | about 172K, 5.4 % (finished 105K, 4.3 %) |
| 24 | 14 | 0 | 14 | 11 to 19 | 48 to 92 | about 239K, 4.2 % (257K, 4.5 %, by 25's pattern) |
| 25 | 16 (14 finished) | 0 | 16 | 3 to 18 | 15 to 132 | about 265K, 4.4 % |
| 26 | 8 | 0 | 8 | 5 to 13 | 21 to 89 | about 133K, 5.2 % |

**Other measures.**
- **First calls:** 615K (24.1 %), 6 cold: rung L, the run's first agent; skeptic L, its first skeptic; the gather, the gate, the review and the commit. Rung T started 4 s after L and read L's 52.8K prefix. With four rungs the six cold starts weigh more: 13.8 % at 25.
- **Cache refills: 1, 94K, 3.7 % of writes:** the gate's, after two waits stacked in one turn (process finding 2). The gather's six waits of 238 s to 255 s between calls each kept the cache (`gaps.py`); climb batch 25's finding 1, built in `888712bb6`, held.
- **Refusal cycles:** 0.
- **The skill's load** (`skill-load.py`): 354K, 13.9 %: 100K of load text (3.9 %) and 254K over 149 part reads (10.0 %), against 11.4 % at 25 and 16.3 % at 24. All 12 agents loaded `fortress-repo`. `revival-changes.md` was read 20 times (69K) by 10 agents, all but the gate and the commit, whose tasks the skill's scope leaves out since `59cc13881` (`SKILL.md:203`): climb batch 25's finding 8, built and held.
- **Builds:** one for each code state. Rung T four: its strings moved before the loader's change, the loader's change, the last step's refusal, and the line separator moved to `stringOps`. Rung L two: its edit and the fix after its first run (the last code edit at 20:28:50, its rebuild at 20:28:58; skeptic L's reading). Rung W one; rung S none. The gather built the merged tree once, with the library order; the gate's build of the same code took 5 s. No skeptic built. No build ran twice on one code state (`runs.py`; `batch-measures.py`).
- **Rows:** 3 opened (893 to 895); 2 closed (804 and 672, in `9e8acf425`); 7 rewritten (440, 304, 497, 76, 846, 872, 368; `RECORD.md`, "Rows opened"). `ledger.py landing-check 4d27fbcc5571f0157b3dfda3977b63430c66d701`: 'no finding'; `ledger.py check`: '894 rows, 0 fail the template'; `record.py check --base 4d27fbcc5`: '0 failures', with 211 FACTS entries over 600 characters reported (205 at 25's review); F-299 is now 3,263 characters, F-252 4,262 and the new F-318 2,033 (this review's runs).
- **The disk:** 4.9G free at the gate's start (its `df`), against 5.0G at 25's.

Per agent, in order of start (UTC; ids are the transcripts' `agent-<id>.jsonl`; messages are distinct message ids):

| Agent | Id | Writes | First call | Messages | Minutes | UTC |
|---|---|---|---|---|---|---|
| Rung L | a2a34ef8 | 314K | 76K, cold | 110 | 31.3 | 20:16-20:48 |
| Rung T | a200a90e | 279K | 25K | 115 | 46.6 | 20:16-21:03 |
| Rung W | a744b492 | 210K | 23K | 73 | 18.3 | 20:48-21:06 |
| Rung S | ac1ed45b | 186K | 22K | 73 | 13.1 | 21:03-21:16 |
| Skeptic L | aeb22109 | 195K | 80K, cold | 39 | 7.9 | 21:06-21:14 |
| Skeptic T | abeb59c0 | 188K | 31K | 61 | 12.3 | 21:14-21:26 |
| Skeptic W | aa3c0e70 | 218K | 27K | 74 | 15.3 | 21:16-21:31 |
| Skeptic S | af048065 | 107K | 26K | 31 | 4.3 | 21:26-21:31 |
| Gather | a6119bcb | 333K | 82K, cold | 140 | 46.9 | 21:32-22:18 |
| Gate | aae19774 | 204K | 70K, cold | 27 | 20.9 | 22:18-22:39 |
| Review | a8f41111 | 204K | 79K, cold | 46 | 6.7 | 22:18-22:25 |
| Commit | ab63625b | 113K | 75K, cold | 22 | 3.6 | 22:39-22:43 |

### 4. The tail

- **The gather** (333K, 46.9 minutes):
  - It applied the four rung patches on `main` one at a time (`git apply --3way --index`) in the manifest's order W, S, L, T (fork 1). No conflict; no two rungs' net changes share a file (`RECORD.md`, "The order the rungs were applied in"). Its own edits of `changes.tex`, FACTS, the ledger and PLAN landed in the rung commits, and row 497's citation of `generateTaskCompute`, which L's 228 lines moved, was re-anchored by symbol.
  - In the main tree it built the merged tree (40 s) and ran the library order; under the harness, the batch's 20 walk tests with the five `.test` files, 'OK (20 tests)'; in one JVM, the 11 compiled tests of L, S and T, 'OK (19 tests)'; the 52 demos from 21:46:16 to about 22:17, 'demos: 52 run, 52 reached their end'; the specification once on the last text, 'BUILD SUCCESSFUL' twice, the warning count 0, its PDF kept as `tmp/gather/fortress-batch-26.pdf` (`RECORD.md`, "The tests on the merged tree"). It ran neither stage, as fork 13 and climb batch 25's finding 6 give.
  - It opened rows 893 to 895, closed two (`9e8acf425`), rewrote seven, added F-318 to F-321 and corrected F-277, F-252, F-34, F-181, F-299, F-32 and F-307 rung by rung; it rewrote three Effects of Appendix I (P-157's entry, P-146's, the native-binding entry: 306 of 449).
  - It routed the rungs' items into PLAN: eight under "Climb batch 26, listed for his review" and one, row 895, as item 64 under "Pavol's answers" (`PLAN.md:148`, `:645-652`).
  - Misses: its first harness call left out the five `.test` files, so the four refusal tests and the `XXX` test ran as plain programs, 'Tests run: 20,  Failures: 5', and it ran them again with the files (`RECORD.md`, the note under the harness run); `ledger.py` refused row 497's rewrite for length (1,231 characters against 1,200), and the notes of rows 497, 76, 872 and 368 went in as rewrites since the notes cells were full.
- **The merged-diff review** (204K, 6.7 minutes, beside the gate): **approved**, nothing blocking, nothing routed. Its corrections in `40d1deca5`: F-299's list "The 288 by type" to 306; `PLAN.md:45`, the climb batch 26 line "not yet planned"; gather.2's missing P-159 point. It checked the 2 skeptic fix commits as applied (`fixesChecked`) and the rows' citations at its head.
- **The gate** (204K, 20.9 minutes): green on `4f4bba6d6`, as section 1 gives. It stacked its waits (process finding 2) and named the machine block's proxy line in its result (process finding 3).
- **The commit** (113K, 3.6 minutes): it landed the tables, ran the quick microGPT walk check, folded F-53's title and F-240's figures by `record.py set` (`record.py check --base 40d1deca5`, 0 failures), and copied the gather's PDF to `Specification/fortress.pdf`, since nothing under `Specification/` changed after the gather's head; it built nothing. It amended its own commit to add the `historical:` line for the PDF before the push, as climb batch 25's commit stage did (process finding 5). It pushed `main` to the three refs on the first try, removed the four rung worktrees and their local `wip/` branches, and left the remote branches and `/home/user/fortress-base26`. It named F-240's "That rise" sentence as now false (its result).

### 5. The microGPT walk check

Its verdict lines (`climb-batch-26/gate/summary.txt`, `# microgpt-walk`): "VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS" for `MicroGptAplQuick` and for `MicroGptFlatQuick` (the commit stage's result, `microgptWalk`), each run ending `rc=0`. So 7 of 7 on both programs, the first landing at which the check programs' `getProperty`, called with two literals, reaches the new native over `FlatString` and `systemOps.getProperty` (`CLIMB-BATCH-26.md`, section 5, "The gate, and what it should show"), and at which walk's load check reads row 804's pairs on their declared domains. By the ruling of 2026-10-23 the seconds are not compared (`PLAN.md:9`).

### 6. The natives and the code generator after phase 4's fourth batch

**What the batch built.**
- **18 bindings moved onto helpers, the string family's 18 of 20** (rung T): 11 of `FlatString`'s 13 methods and `natLineSeparator` (`Library/FlatString.fss:25-101`), `match` and the three thread prints (`Library/FortressLibrary.fss:4615`, `:4628-4644`), and `getEnvironment` and `getProperty` (`Library/System.fss:41-56`). Seven name six existing helpers (`nativeStrlen` twice, `compareTo`, `charAt`, `indexOf`, `nativeConcatenate`, `getProperty`), eleven name new ones: seven in `stringOps`, three in `simplePrintln`, one in `systemOps`. Four helper classes are named by the one library for the first time: `stringOps`, `simpleConcatenate`, `simplePrintln`, `systemOps`. So 306 of the library's 449 live bindings name a helper (F-299) and 143 a glue class (F-32).
- The five natives over `String` are now natives over `FlatString` beside overloads over `String` that flatten in a `typecase` with a `fail` arm; walk's loader carries the library's `FlatString` as `self`, told by its declaring component, and refuses a helper parameter declared `String` (F-299). So the five read a rope's characters, where they read its type's name (row 846, narrowed).
- **Walk's load check reads a program's generic operators between an array and a number beside a self-typed additive group's own on their declared domains** (rung W; F-318): row 804 closed, P-160's first step built. With `Number`'s clause removed in a scratch copy, the four measured programs loaded (W's report, section 4).
- **The specification's overview says that a comparison at a NaN or at 0/0 answers `false`** and that the rational infinities are ordered (rung S; F-319): row 672 closed, P-159 carried out.
- **The code generator compiles local functions** (rung L; F-320): under the switch-over's setting its refusals over the fourteen fall from 47 in 11 kinds to 38 in 10 on L's tree, and all nine declarations that stopped at 'Can't compile LetFn' emit, `__bigOperator` among them (F-34). Two ladder files outside the gate's 85 moved up: `tests/funny.fss` to `pass` and `tests/simplify1.fss` to `run`, which prints FAIL by row 76 (L's report).

**Where the 449 stand.** The 143 on glue classes, each with its home (`CLIMB-BATCH-26.md`, section 1, "Where the natives stand"): the string family's two, `FlatString`'s `=` and `flatConcat` at a `Char`, with item 331; the 28 that no bare string reaches, items 331 and 332; `ZZ`'s `narrow` and `widen`, after the integer conversions; `Char`'s `asExprString`, item 354; the literals' 32 with N5; the I/O objects' 36 (N4), after a design review of their carrier and their Java type; D2's 42.

**What the zero rests on now.** The gate's 0 and 0 read 304 of the 306 helper strings against their helpers; `System`'s two are read by neither stage, and against the interpreter's prelude the checker cannot read their class at all (F-321; row 895; PLAN item 64). The stages accept a helper parameter declared `String`, which walk now refuses (fork 21; `NamingCzar.java:488`). The zero over the fourteen still rests on climb batch 22c's fork 8 reading of `var` (row 844; review-queue item 295, open). F-34's 38 refusals were measured on rung L's tree, before T's three overloads over `String` joined `FortressLibrary`; the merged tree's code generator count is not measured.

**What stands between the library and the switch-over** (P-33; PLAN, phase 4): the 143 above; the code generator's 38 refusals in 10 kinds and row 304's three forms; its wall at the helpers' wrappers (row 874, with N5); `System`'s two natives on `systemOps` (row 895) and its errors by the switch-over (P-33); the names batch. P-160's second step, the library's half of `Number`'s opening, is the next batch's (`CLIMB-BATCH-26.md`, "After the landing").

## Part 1. Conformance

### Method

As in `reviews/batch-25-review.md`. For each rung I read its commit on `main` and its diff against the base, its `REPORT.md` and `SKEPTIC.md` where they bear, its section of the record (`CLIMB-BATCH-26.md`, section 3) with Question 1, the forks 1 to 23 and the points for his sight (section 2), the gather's `RECORD.md`, the run's journal results, and the code and the specification on `main`. Three standards, kept apart: the specification; the library's own way (P-27), and for compiler and interpreter code the team's code beside it; and the decisions on record (P-160, P-157, P-152, P-146 for W; P-159, P-95, P-96 for S; P-58, P-33 and Question 1 for L and T), with the defaults the record states for items 310 and 340 (the Fable judge's default inside the strings review's recommendation, option (b) with (c), and the judge's three refinements: forks 19, 21 and item 332 not needed) and the facts the batch built or rewrote (F-318 to F-321; F-277, F-252, F-34, F-181, F-299, F-32, F-307). I check what landed against those defaults as the record states them. Where the batch's own record and the tree disagree, the tree rules, and I say so.

### The verdicts

- **Rung W, walk's half of row 804: in the spirit of P-160's first step, P-157 and P-152,** with splits 1 to 3.
- **Rung S, the overview's comparison sentences: in the spirit of P-159, P-95 and P-96,** with split 9.
- **Rung L, local functions compiled: in the spirit of Question 1 at its default (a) and of forks 8 and 9,** with split 8.
- **Rung T, the string family: in the spirit of items 310 and 340 at the Fable judge's default, with the judge's three refinements,** with splits 4 to 7.
- **No ruling.** All four skeptics approved, with two corrections and nothing contested; the review approved; no worker stopped.

### Where the text, the brief or the principles split

**1. Walk's reading of `self` rests on P-146's extender rule, which walk does not apply (rung W; row 893).** P-157 reads a self-typed trait's `self` as `C[\X\] & X` in the exclusion test, "the fact that P-146's extender rule guarantees" (`POSITIONS.md:68`); P-146 gives the rule to the checker and says "walk is unchanged" (`POSITIONS.md:59`). W built the reading in walk's load check (`OverloadedFunction.java`, `selfTypeParameter`, `:845-867`; `domainsExcludeTogether`, `:1081-1092`), so walk now loads an object that extends a self-typed trait at a type it is not a subtype of, a static error by `Specification/basic/traits.tex:306-312`, and a call that the trait's operator and a generic array operator both fit runs one of them (`tests/XXXSelfTypeExtenderOtherTypeWalk.fss`; row 893; F-318). Skeptic W found it; the record's forks did not weigh it. W.skeptic.2 (`PLAN.md:646`). Default: P-146's "walk is unchanged", the gap gated (finding A below).

**2. The checker refuses a pair that walk now loads (rung W; row 894, `CONTESTED`).** The checker's `checkFancyRule` refuses a top-level generic function more specific than a functional method of its name (`scala_src/typechecker/OverloadingChecker.scala:413-424`), where `Specification/advanced/overloading.tex:525-529` applies only the Meet Rule for functions to such a pair; walk loads it (`tests/GenericInsideTraitMethodWalk.fss`). W.skeptic.1 (`PLAN.md:645`). No default on record.

**3. W reads less than the checker does (rung W).** A trait self-typed through another self-typed trait, P-146's second form, and a functional method with static parameters of its own keep the team's refusal (F-318; W's decisions 3 and 4). Since W's reading runs only where the team's check refuses, it cannot refuse a pair that walk loaded before (fork 3); `ant testSystem` moved no verdict, rows 713, 779, 780 and 786 to 788 among them. F-318 holds the limit; no row does. Default: as landed.

**4. Fork 22's class for the line separator, and row 895 (rung T).** Fork 22 put the line separator and `getEnvironment` in `systemOps`. Against the interpreter's prelude the checker reads every method of a class that a binding names, and `systemOps.getArgs` answers an `FStringVector`, which it maps to a `FortressBuiltin.StringVector` that the interpreter's prelude does not declare (F-321). T's first distance run stopped `FlatString` there; T moved the line separator into `stringOps` (`8b6fca9b5`). `System`'s `getEnvironment` and `getProperty` still name `systemOps`, as fork 22 gave them, so two bindings landed that stop their component wherever the checker reads `System`, at the switch-over at the latest (row 895). T.worker.1 and T.skeptic.1, PLAN item 64. No default on record.

**5. Fork 21, taken: walk and the checker read a helper's `String` parameter differently (rung T).** Walk refuses at load a helper parameter declared `String` (`StaticNativeApp.java:70`, `javaForParameter`; `:178`); the checker's walk-world table reads a helper's Java `String` as the Fortress `String` (`compiler/NamingCzar.java:488`), so the stages accept a binding that walk refuses. The record named the divergence for the switch-over's design (fork 21, the Fable judge's note); T.worker.2 (`PLAN.md:649`). Default: as landed, the step taken.

**6. Row 846's narrowed claim leaves out a latent half (rung T; by reading).** The loader still carries a `self` declared `String`: `javaForSelf(FType)` reads any type but `FlatString` by its name, and `javaForSelf("String")` answers `javaFor("String")`, a Java `String` (`StaticNativeApp.java:103-112`, `:51-62`), unboxed by `v.getString()` (`:282`), which a rope answers with its type's name (`interpreter/evaluator/values/FObject.java:33-35`). So a helper bound in a method of the library's trait `String` would receive a rope's type name as `self`. No binding of the library is in such a method today (`Library/FortressLibrary.fss:4341`, the trait, binds no helper), and the base's row 846 and the skill's `interpreter.md:116` named "as `self` in a method of `String`"; the narrowed row ("a native that a program binds over `String` to a glue class") and F-299's departures drop that half. A correction for the row's notes and for the skill writer's new `:116`, not a decision.

**7. Values that move under walk (rung T).** `javaIndexOf` past U+FFFF now finds the character's code point, so in `"a" || char(128512).asString || "b"` it answers -1 where the glue answered 1, the compiled path's answer (fork 22 planned it; row 872 noted). `getProperty` at an `EmptyString` name now raises `java.lang.IllegalArgumentException: key can't be empty`, as a flat `""` name did on the base and does now; on the base the `EmptyString` name was read as the key `EmptyString` and answered its default (T's report, "Values that move"). A Java exception that no `catch` sees, at a call whose specification is silent: no row holds it (finding C).

**8. Rung L's team lines and its group (rung L).** The record lists among L's team lines "the block guard of `forFnDecl`" ("Points the batch lists for him"); L left the guard unchanged, since its case never calls `forFnDecl` for a local function (L's decision 4; `CodeGen.java:3025`, `!inABlock; // no local functions`), and it changed one line of the team's `for_RewriteFnApp` (`:6797`), which the list does not name. Fork 9's "a reference that is never assigned after" is built as each closure's sibling fields, not final, set once right after the group is made and read only after (`forLetFn`, `:3627-3636`); the decision gives why: a final field can be set only in the constructor, before a later sibling exists. L also gave `atomic` an `XXX` test, which fork 8 named without one. Default: as landed; the record's list is the correction (finding B).

**9. Rung S's text (rung S).** The callout names walk's departure for `<=` and `>=` at 0/0 against itself (row 440), not `=` and `CMP`, which are not among the sentence's four operators; `CMP` is named for floats only, as fork 5 gives it (S's decisions 2 and 4). The team's later restart, `Documentation/Specification/Prose/Language/Operators/operator-overview.tick:274-278`, still says both comparisons raise (S.worker.1, `PLAN.md:647`). Defaults: as landed.

### Rung W, `c41c3d2b0`

**What landed.** In `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java`: `validOnDeclaredDomains` (`:772-779`) reads an own generic function beside a functional method of a generic trait that declares no static parameters of its own, through new `traitMethod` (`:814-817`) and `traitMethodPairValid` (`:826-833`), which reads the pair as `genericPairValid` reads two own generics; new `selfTypeParameter` (`:845-867`) finds a trait self-typed directly; `domainsExcludeTogether` (`:1081-1092`) reads such a trait's `self` as its two members, each checked by `excludesAtMeet`, which is unchanged, since walk has no intersection type (`EvalType.java:407-411`); `Apart.of` (`:1433-1435`) renames over `getStaticParams()`. Row 804's `XXX` test promoted to `ExclusionVectorScalarWalk`; `ExclusionArrayScalarLibraryShapeWalk`; the guard `ExclusionVectorScalarOverlapWalk`, refused before and after, its message now 'fails the Meet Rule', and refused by the compiled checker too; the skeptic's four tests (`171655095`). The scratch measure with `Number`'s clause removed: 'BooleanOps rc=0', 'ArrayScalarExtension rc=0', 'ArrayOperatorsBesideLibrary rc=0', 'extendNumber rc=0', the clause restored (no commit of the batch touches `Library/FortressLibrary.fss:381`).

**Standard 1.** The specification reads exclusion of declarations with static parameters by existential reduction (`Specification/advanced/overloading.tex`, "Declarations with Static Parameters"); the extender rule, `traits.tex:306-312`, which walk does not check (split 1).

**Standard 2.** The reading extends the revival's own declared-domain reading (`8f7e183d4`; F-252, F-258), not the team's parameter-by-parameter check, whose messages stay for the other pairs (fork 2). Team lines changed: none.

**Standard 3.** P-160's first step; P-157; P-152; forks 2 to 4 and 12; `ant testSystem` once, 743 tests, no verdict moved. P-146: split 1.

**Verdict: in the spirit,** with splits 1, 2 and 3.

### Rung S, `3eabf8435`

**What landed.** The two sentences of "Comparisons Operators" revised, with a `revival-nan-comparison` callout (`Specification/basic/operators/opr-overview.tex:283-300`); the Appendix I entry "A comparison at a NaN or at the rational indefinite" (`Specification/appendices/changes.tex:4563`), with the original from `Specification-1.0-frozen/basic/operators/opr-overview.tex:274-278`, row 440's departure in its Effect, and option (b) as the way back; the decision record `compile-ladder/rung-spec-nan-comparison/decision-record.md`; the walk guard `ComparisonAtNaNWalk` at `RR64`, `RR32` and `QQ`; twelve NaN asserts in each of `NativeHelperFamilyFloatCompiled` and `NativeHelperFamilyRR32Compiled`; `TupleOrderBounds.fss:19`'s message. The preamble checked and unchanged.

**Standard 1.** The rationals chapter's reading, 0/0 `false` "for compatibility with floating-point arithmetic" and the infinities ordered (`Specification/basic-lib/numbers.tex:372-378`).

**Standard 2.** Both of the team's implementations answer `false` and `Unordered` and raise neither error (`Library/FortressLibrary.fsi:1184`, `:1187` declare them). Team lines changed: the overview's two sentences, the original kept.

**Standard 3.** P-159; P-95 and P-96, the revision form; forks 5 to 7; the guards seen passing on the base and one value made wrong in a scratch copy seen failing (S's `recordedFailure`).

**Verdict: in the spirit,** with split 9.

### Rung L, `d96242f0a`

**What landed.** 228 lines added to the team's `CodeGen` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`), none removed: `forLetFn` (`:3580-3642`) refuses row 304's three forms with their own messages and varargs with row 624's, binds each local function of the block to a local of its arrow type (`localFunctionArrowType`), makes each closure by `localFunctionClosure` (`:3666-3729`) as `forFnExpr` makes a function expression's, then sets each closure's sibling fields; `LocalFunctionSiblingVar` and `LocalFunctionSelfVar` (`:3733-3773`), a function reaching itself as `this`; `localFunctionOrNull` and `localFunctionNames` (`:3831-3842`); `forFnRef` (`:3845-3852`) and `for_RewriteFnApp` (`:6797`) take a local function's closure. Five compiled run tests and their walk guards; `XXXLocalFunctionGenericCompiled`, `XXXLocalFunctionOverloadedCompiled`, `XXXLocalFunctionAtomicCompiled`. The measure: 'refused declarations 38 | emitted (OK lines) 703 | component failures 0', 'kinds 10', all nine at '@@CG OK'.

**Standard 1.** Local functions may be overloaded and mutually recursive within their scope (`Specification/basic/functions.tex`, "Local Function Declarations"): the group recursive and mutually recursive, called and passed as a value; the generic, the overloaded and the `atomic` forms refused, each with its `XXX` test (row 304).

**Standard 2.** The team's own closure machinery, `forFnExpr`, `getFreeVars` and `constructWithFreeVars`, and walk's binding of the group as closures in one environment (`interpreter/evaluator/BuildLetEnvironments.java:55-81`). Team lines changed: none removed; `for_RewriteFnApp` one line; `forFnDecl`'s guard unchanged (split 8).

**Standard 3.** Question 1 at its default (a); forks 8 to 10 and 12; its own tests in one JVM, 'OK (53 tests)' with 19 guards, the tracks left to the gate; the measure once, on its final tree. Row 497 not met.

**Verdict: in the spirit,** with split 8.

### Rung T, `93884be8d`

**What landed.** Walk's loader (`ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java`): `javaForParameter` (`:64-72`) refuses a parameter declared `String`; `javaForSelf(FType)` (`:122`) and `declaringComponent` (`:136`) carry the library's `FlatString` as `self`, told by the component `FlatString` at its top level; `find` takes the declaring type (`:163`); `NativeApp.java:201` passes it. It differs from the probe's `shadow.patch` by `javaForParameter` and the comment. The 18 strings and eleven helpers (section 6); the five pairs, with both overloads in the apis (`Library/FortressLibrary.fsi`, `Library/System.fsi`) and `System`'s import of `FlatString`. Tests: `NativeHelperStringRopeWalk`, failing on the base at the rope's type name and passing after; `NativeHelperCarriedSelfFlatStringWalk`, passing on the glue, stopping at load with the strings moved before the loader's change, passing after; `NativeHelperNonFlatStringWalk` now a refusal test; `NativeHelperBindingWalk`'s three bindings over `FlatString`; `NativeHelperUncarriedSelfFlatStringWalk` retargeted; the compiled guard `NativeHelperFamilyStringCompiled` over `JavaString`; the skeptic's glue guard `NativeGlueNonFlatStringWalk` (`4eebb9a45`). `ant testSystem` 743, 0 failures, only `NativeHelperNonFlatStringWalk` changing kind.

**Standard 1.** The specification is silent on the natives' strings (row 846's spec cell, "silent").

**Standard 2.** The team's own pair, a native over a narrow type beside an overload that converts (`Library/Writer.fss:33-35`, `Library/File.fss:20-22`, `ProjectFortress/LibraryBuiltin/CompilerSystem.fss:20`), in the library's `typecase` spelling (`Library/FlatString.fss:137-140`); each helper computes as its glue class does, old against new under walk, but the two values of split 7 (skeptic T). Team lines changed: 18 strings of the team's bindings, five declarations made pairs, and the team's `find` signature; the loader's new methods are the revival's.

**Standard 3.** Items 310 and 340 at the Fable judge's default, option (b) with (c): the pairs (fork 19, with the judge's refinement 1, the `typecase` with a hard stop), the declaring component (fork 20, item 340's default), the last step taken (fork 21, refinement 2), each native public and bare (refinement 3, item 332 not needed); fork 18, `=` and `flatConcat` at a `Char` left with item 331 (`Library/FlatString.fss:71`, `:97`); fork 22 but the line separator's class (split 4); fork 13, both stages once, the count on `19e9dbda5`, before the line separator's move into `stringOps`, the distance on its final tree (process finding 8).

**Verdict: in the spirit,** with splits 4 to 7.

### The decisions consequential for him, and the readings he has not confirmed

By the coordinator skill's sense of consequential (`CLIMB-BATCH-26.md`, section 2), the record put one question to him, Question 1, which the Fable review judged reversible by one rung and let run at its default; it landed at (a). Items 310 and 340 landed at the Fable judge's default, since he did not answer within the 30 minutes of his rule of 18:56; the record lists the sub-choices for him. I found what landed to match both defaults as the record states them, but for the line separator's class (split 4), which row 895 forced.

One reading bears on a decision of his without the record having weighed it:
- **P-146's "walk is unchanged" and P-157's ground** (split 1): walk now reads `self` as `C[\X\] & X`, the reading that P-157 grounds on the extender rule, and does not apply the rule. Finding A gives the options.

The results that stand on a reading he has not confirmed:
- **The gate's 0 and 0** read 304 of the 306 helper strings; `System`'s two stand outside both stages and cannot be read by the checker against the interpreter's prelude (row 895; item 64, no default).
- **The stages accept a `String` parameter that walk refuses** (fork 21, on his review list).
- **Phase 3's zero over the fourteen** still stands on climb batch 22c's fork 8 reading of `var` (row 844; item 295, open).

### The record's question and forks, against what landed

| Question or fork | Rung | Landed |
|---|---|---|
| Question 1, (a) a closure class of its own or (b) a lifted static method; default (a) | L | (a) built, as `forFnExpr` makes a closure |
| 1, four rungs in the order W, S, L, T, none landing only with another, no shared file | all | Built; no conflict, no shared file |
| 2, W's declared-domain reading, not the team's check | W | Built (`traitMethodPairValid`); `excludesAtMeet` unchanged, the intersection read at the call site |
| 3, W's reach row 804's shape; rows 713, 779, 780, 786 to 788 keep their verdicts | W | Kept; split 3 |
| 4, W's measure of P-160's second step once, never committed | W | Four programs rc=0; the clause restored |
| 5, S's text in the overview's words, one callout and one entry | S | Built; split 9 |
| 6, S's tests guards, row 672 closing on the walk one | S | Built; closed in `9e8acf425` |
| 7, the specification built by S and by the gather; the commit stage takes the gather's PDF | S, gather, commit | Built; the commit stage built nothing |
| 8, L's scope: no own static parameters, one declaration of each name | L | Kept; three forms refused with `XXX` tests, `atomic` among them |
| 9, L's group without a mutable cell | L | Built: `this` and sibling fields set once (split 8) |
| 10, L's measure once on its tree | L | 38 in 10 kinds |
| 11, the rows | all | 804 and 672 closed, 304 and 846 narrowed, 440 rewritten; 893 to 895 new |
| 12, the suites once after the last change of code | W, S, L, T | Kept: W and T `ant testSystem`, L its tests in one JVM, S its guards |
| 13, only T runs the two stages, once each | T | The count once, one code change before its final tree; the distance on two code states (process finding 8) |
| 14, no speed pass | all | Kept |
| 15, no declared count, crash or ladder move | all | Kept; L moved two ladder files outside the 85 |
| 16, the 52 demos at the gather | gather | 52 of 52 |
| 17, no helper with state | T | Kept: eleven static helpers, no static field |
| 18, `FlatString`'s `=` and `flatConcat` at a `Char` left with item 331 | T | Kept |
| 19, the pairs as a `typecase` with a hard stop, both overloads in the api | T | Built |
| 20, the loader reads `FlatString`'s `self` by its declaring component | T | Built (`javaForSelf(FType)`) |
| 21, the loader refuses a helper parameter declared `String`, the step that can be left out | T | Taken; split 5 |
| 22, existing helpers where they compute as the glue, new ones in the class of their kind, `javaSubstr` on a new one | T | Built; the line separator in `stringOps`, not `systemOps` (split 4); `javaIndexOf` moves past U+FFFF (split 7) |
| 23, T's tests | T | Built; the skeptic added row 846's glue guard |

### The global questions

- **Promised against landed.** All four rungs, as planned: row 804's walk half, P-159's text, local functions compiled, the string family's 18; rows 804 and 672 closed, 304 and 846 narrowed; the count and the distance 0 with 304 of 306 helper strings read. Beyond the plan: rows 893 and 894 (W's skeptic), row 895 and F-321 (T), the line separator's move, and two ladder files moved up (L).
- **The record's premises that failed:**
  - fork 22's `systemOps` for the line separator and for `System`'s two (split 4);
  - "the block guard of `forFnDecl`" among L's team lines (split 8);
  - S's brief's note to row 440, which did not fit its notes cell, 676 of 700 characters (S.worker.2, `PLAN.md:648`);
  - row 846's narrowed claim, without the latent `self` half (split 6);
  - the gate's forecasts, about 751 and about 1,431, against 756 and 1,432, as their wording allowed;
  - the cost, about 3.6M and about 4 h 15 min, against 2.55M and 2 h 27 min.
- **Built twice: nothing.** No two rungs touched one file or one declaration (`RECORD.md`, "The order the rungs were applied in").
- **The library's way: yes for each.** W extends the revival's own reading; L reuses the team's closure machinery; T follows the team's own pairs and the library's `typecase` spelling, each helper computing its glue class's value.
- **Together.** W's reading reaches only pairs of an own generic and a functional method of a generic trait; T's pairs are plain functions, so W's code never meets them (the review's summary). On the merged tree the 20 walk tests and the 19 compiled steps pass, and the 52 demos reach their end; the gate is green.

### Findings

Sorted by what each needs.

**A finding that would change a decision of his, with options:**

A. **Walk's reading of `self` without the rule that grounds it** (split 1; row 893; W.skeptic.2, `PLAN.md:646`). P-157 reads `self` as `C[\X\] & X` because P-146's extender rule guarantees it; P-146 says walk is unchanged; P-160's first step has now built the reading in walk. So walk loads an extender that breaks the rule, and a call that two declarations fit runs one of them (`tests/XXXSelfTypeExtenderOtherTypeWalk.fss`).
   - (a) As landed: walk unchanged, row 893 open and gated. The checker refuses such a program, and walk runs programs that the checker refuses until it runs the checker (P-12). Cost: none now; the row stays until P-12's step.
   - (b) Walk's load check applies P-146's extender rule: one walk rung, beside P-160's second step, which edits the same library traits. Cost: a load-time check of each extender of a self-typed trait; P-146's "walk is unchanged" reworded.

   Default, the record's: (a). Either can be undone.

**Corrections, reasons in the record that the landing made false:**

B. The record's "Team lines changed" for L names "the block guard of `forFnDecl`", which L left unchanged, and leaves out `for_RewriteFnApp`'s one line (split 8). Home: the routing's entry for the points for his sight.

C. Row 846's narrowed claim and F-299's departures leave out the latent `self` half: a helper bound in a method of the trait `String` would receive a rope's type name (split 6, by reading). Home: row 846's notes by `ledger.py note`; F-299's sentence on the carriers; the skill writer's `interpreter.md:116`. Beside it, `getProperty` at an empty name raises Java's `IllegalArgumentException`, which no `catch` sees, on the base for `""` and now for `EmptyString` (split 7): a defect without a row. Home: a new row through `ledger.py add`, by the record-landing workflow or the next batch's gather.

D. Fork 22's placement of the line separator, and of `System`'s two, in `systemOps` (split 4): the landing kept the first out by `stringOps`, and the second stands as row 895. Home: PLAN item 64, where T's three ways are; no default on record. Proposed (mine): the two helpers move to `stringOps`, as the line separator did, a rung of two strings and two helpers; the cheapest of the three and reversible.

E. F-240's "That rise has no measured cause" now follows a fall, 271 s to 246 s (the commit stage's item). Home: the record writer, by `record.py`.

F. P-159's "Both sentences are to be revised" (`POSITIONS.md:90`): they are revised (`3eabf8435`). His text. Home: the record writer under his rule of 2026-10-31, named to him.

**Corrections of an entry's ground that change no decision, for the entries' histories:**
- F-34's 38 refusals in 10 kinds were measured on rung L's tree; the merged tree adds T's three overloads over `String` to `FortressLibrary`, plain Fortress code, unmeasured by the code generator.
- Rung T's report gives the count stage as run "on its final tree"; it ran on `19e9dbda5`, before `8b6fca9b5` put the line separator into `stringOps`, a class the count reads through `match`. The gate's count on the merged tree is 0.
- F-299 is now 3,263 characters, F-252 4,262 and F-318 2,033, against the record's 600; each briefing that names them reads them whole.

**Confirmations:**
- The count's table equals climb batch 25's byte for byte; no row is new or risen.
- The distance's table differs only in its `#seconds` and `#machine` rows: 246 s (182 s) at 0.34 against 271 s (205 s) at 0.59.
- microGPT's quick pair: 7 of 7 for both programs.
- The 52 demos reached their end at the gather.
- `ledger.py landing-check` and `record.py check`: no finding, 0 failures.

## Part 2. Did the practice hold

### The skeptics' fixes

From the journal's results, each `SKEPTIC.md` and each rung's branch: 2 fix commits, both corrections, none contested; no defect of a change fixed.

| Rung | Fix commits | Defects of the change | Test first, from the worker's run and the skeptic's reading of its transcript |
|---|---|---|---|
| W | `171655095` (tests of the Return Type Rule branches, `GenericBesideTraitMethodInsideWalk` and `GenericInsideTraitMethodReturnRuleWalk`; rows 893 and 894 with `XXXSelfTypeExtenderOtherTypeWalk` and `GenericInsideTraitMethodWalk`; `interpreter.md:43` and F-252's title as made false) | 0; row 893 a consequence of the change, recorded with its `XXX` test | the three tests on the base's code at 20:51:55, 'Tests run: 3,  Failures: 2', the guard 'OK Saw expected refusal at load'; the first code edit at 20:54:45; 'OK (3 tests)' at 20:55:43 |
| S | none | 0 | guards: 'OK (3 tests)' on the base at 21:06:17; a scratch copy with one wrong value red, 'Tests run: 1,  Failures: 1' |
| L | none | 0 | 'Tests run: 10,  Failures: 10' on the base at 20:21:04 ('Can't compile LetFn'); the edit's first build at 20:26:11; the three extended files again on the old code at 20:31:54; 'OK (53 tests)' at the end |
| T | `4eebb9a45` (row 846's narrowed claim given its guard, `NativeGlueNonFlatStringWalk`; the rope test's inner comment line; F-307 and `PLAN.md:49` as made false) | 0 | the rope test red on the base at 20:22:48 ('FAIL: J1/0:? =/= …; getEnvironment at a rope name'), `NativeHelperNonFlatStringWalk` 'Missing expected refusal at load' at 20:24:21, the compiled guard red at 20:25:16; the tests committed at 20:26:28 (`15d81c1c1`), the change at 20:33:51 (`19e9dbda5`); the carried-`self` test stopped at load at 20:28:10 with the strings moved before the loader's change; 'OK (6 tests)' at 20:50:46 |

- Both fixes stay inside their rung's work. The review checked both as applied (`fixesChecked`).
- Against the batches before: 25 made 7 with 0 defects, 24 18 with 0, 23 4 with 0, 22c 14 with 1, 22 8 with 0, 21b 7 with 1, 21 13 with 1, batch 20 11 with 0.
- The skeptics found two of the three new rows (893, 894) and gave the narrowed row 846 its test. Skeptic L found no defect in its own programs at 1 and 4 threads, walk against the compiled path; skeptic S checked every citation; skeptic T compared the 18 moved bindings old against new under walk. No fix is a worker's file written from the journal: every branch carried its own `REPORT.md` and `record.md`.

### Workers, test first

Every worker saw its tests fail on the base's code, or its guards pass, before its change was built (the table above). No miss of order. S's tests are guards of a text edit, which has no failing test (P-102; fork 6); it showed that they can fail.

### The merged-diff review

- Approved: nothing blocking. Three corrections in `40d1deca5`; nothing routed; 2 fixes checked as applied; the rows' new citations read at its head.
- It did not name: the items for him that PLAN lacks (Question 1, items 310 and 340 as landed, the forks, the points; Part 4); W's reading against P-146 beyond the skeptic's item (finding A); the latent `self` half of row 846 (finding C); L's team-lines list (finding B); the microGPT first-error move (section 1), which only the gate's files show.
- Cost: 204K beside the gate, 6.7 minutes.

### Builds and runs, repeated or not

- **Builds:** one for each code state (section 3); the gather once on the merged tree; the gate's build of that code, 5 s. No skeptic built.
- **Suites:** W and T `ant testSystem` once each on their final code, 743 tests; L its own tests and 19 guards in one JVM, 'OK (53 tests)', the tracks left to the gate (fork 12); S its guards through the harness and `junit.sh`; no skeptic and not the gather. The gate ran `testFast`, `testSystem` and `testSpecData`.
- **The stages:** T only, as fork 13 gives: the count once, on `19e9dbda5`; the distance on `19e9dbda5`, where row 895's site came, and on its final tree, 0 (process finding 8); no skeptic, since no rung changed the checker's code; the gather none; the gate once each.
- **The code generator's probe:** L once on its final tree (fork 10); no run on the base again, as climb batch 25's rung C had made (its finding 6).
- **The demos:** the gather, 52 of 52 from the first.
- **The specification:** S once in its tree, the gather once on the last text; the commit stage copied that PDF.
- **Walk old against new:** each skeptic's own programs against the old code through `old-fortress.sh` on `/home/user/fortress-base26`; T's 18 bindings' values, W's differential over new walk, old walk and old compiled, L's programs at 1 and 4 threads.
- **Taken from the record, not run again:** climb batch 25's tables as every rung's before; the planner's runs on the base (the code generator's 47 in 11 kinds, the comparisons under walk); the base build `/home/user/fortress-base26` at `a3252d568`, whose code is the base's.

### Refusals by the harness and the tools

- **No write refused, no `sleep` refused, no call refused by the permission check** (`errs.py`).
- **Rows refused for length:** row 497's rewrite once (1,231 characters against 1,200); the notes of rows 440, 497, 76, 872 and 368 went in as rewrites, their cells full (process finding 6).
- **One `git rm --cached` of the gather refused** ('staged content different from both the file and the HEAD', 21:36:56), done again.
- No refusal made a refusal cycle; none cost a cache refill.

### The commit stage's fold of FACTS

Its brief asks for the landed figures, numbers only, by `record.py set`. It changed F-53's title from climb batch 25's to 26's, kept its totals at 0, and wrote F-240's figures: the count stage about 180 s by the file times of the gate's log (178 s), the distance stage 246 s (`FortressLibrary` 182 s) at load 0.34 against 271 s (205 s) at 0.59. It named F-240's "That rise has no measured cause" and the entry's 150 s to 170 s band, which no longer describes the latest gate, for the routing, and changed no other word (its result). `record.py check --base 40d1deca5` printed 0 failures (its result).

### The practice's measures, batches 20 to 26

| Measure | B20 | B21 | B21b | B22 | B22c | B23 | B24 | B25 | B26 |
|---|---|---|---|---|---|---|---|---|---|
| Written | 2.64M | 4.75M | 3.50M | 2.82M | 4.61M | 3.20M (2.44M finished) | 5.74M | 6.03M (5.58M finished) | 2.55M |
| Rungs, agents | 2, 8 | 4, 14 | 3, 10 | 3, 10 | 4, 15 | 2, 11 (8 finished) | 7, 18 | 7, 20 (18 finished) | 4, 12 |
| Launches killed by restarts | 0 | 0 | 0 | 0 | 0 | 3, 0.76M, 23.9 % | 0 | 2, 0.45M, 7.4 % | 0 |
| Per rung, all roles | 1.32M | 1.19M | 1.17M | 0.94M | 1.15M | 1.60M (1.22M finished) | 0.82M | 0.86M (0.80M finished) | 0.64M |
| First calls | 0.47M, 7 cold | 0.68M, 8 cold | 0.51M, 7 cold | 0.47M, 6 cold | 0.76M, 9 cold | 0.58M, 8 cold (0.43M, 6) | 0.75M, 7 cold | 0.83M, 8 cold | 0.62M, 6 cold |
| Cache refills | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 3, 1.07M, 17.7 % | 1, 94K, 3.7 % |
| Refusal cycles | 0 | 0 | 0 | 0 | 1 rung, 3.2 % | 0 | 0 | 0 | 0 |
| Rulings and repairs on the merged tree | 0 | 8.3 % | 0 | 0 | 9.7 % | 0 | 0 | 0 | 0 |
| Skeptic fix commits (defects) | 11 (0) | 13 (1) | 7 (1) | 8 (0) | 14 (1) | 4 (0) | 18 (0) | 7 (0) | 2 (0) |
| Distance | 26 sites gone | 0 gone (full check 186) | 0 | 5 gone, to 0 | 0, over 14 under `compile` | 0, the 21 moved bindings checked | 0, 173 moved bindings checked | 0, 288 moved bindings checked | 0, 304 of 306 checked |
| Count stage at the gate | 63 s | about 78 s | about 90 s | about 150 s | about 170 s | about 155 s | about 150 s | about 160 s | about 180 s |
| Distance stage at the gate | 161 s | 206 s | 235 s | 227 s | 238 s | 240 s | 198 s | 271 s | 246 s |
| Skill's load | 9.8 % | 10.4 % | 11.3 % | 12.5 % | 13.6 % | 13.3 % (11.6 % finished) | 16.3 % | 11.4 % | 13.9 % |
| Briefing, estimated | 3.4 % | 4.1 % | 3.2 % | 4.2 % | 4.0 % | 5.4 % (4.3 % finished) | 4.2 % (4.5 % by 25's pattern) | 4.4 % | 5.2 % |
| microGPT quick pair, verdicts | 7 of 7 both | 7 of 7 both | 7 of 7 both | 7 of 7 both | 7 of 7 both | 7 of 7 both | 7 of 7 both | 7 of 7 both | 7 of 7 both |

The rows of B20 to B25 are `reviews/batch-25-review.md`'s; `batch-measures.py` on the runs of 24, 25 and 26 gives the same totals.

### Climb batch 25's findings, a batch later

1. The gather's two foreground waits of 600 s: built in the script (`888712bb6`, the gather waits with `wait_for`); held: six waits of 238 s to 255 s between calls, the cache kept.
2. A skeptic's resume: built (`888712bb6`); not met, since no restart came.
3. The items for him that its routing owed: routed by the record-landing workflow (`784104683`). This batch's are owed again in part (Part 4).
4. P-38's title: reworded, "The compiler prelude's own text is not repaired" (`POSITIONS.md:35`).
5. F-32's `IntLiteral` count, F-240's cause, F-315: rewritten (`9342ddbb2`).
6. Code states measured again: the gather runs no stage for a row (`888712bb6`); held: the gather ran neither stage, and L ran no probe of the base.
7. The wait cap: 240 s (`59cc13881`), kept at his word of 17:30 on 11-05 (`coordinator/HELD.md`); met in another form, waits stacked in one turn (process finding 2).
8. `revival-changes.md`: its scope stated (`59cc13881`); held: read by the 10 of 12 agents whose task needs it.
9. Slips of the boot note: the launch's note gave the planner's 751K and the Fable review's 368K, figures of their first passes; by the launch their transcripts had written 1.82M and 0.84M (process finding 1). Minor.

### Process findings

Numbered for the coordinator, who improves the batch script from them between batches.

1. **The preparation's resumes rewrote 1.42M, more than half the run's writes.** The planner, resumed to add rung T after the strings review, its Fable judge and the curator's 30 minutes, wrote 749,464 tokens in one message at 19:33:44 after a gap of 1,267 s, with a cache read of 0: 41 % of its 1.82M. The Fable review, resumed for the Fable check of T, wrote 368,392 at 20:04:46 after 2,005 s: 44 % of its 838K. The manifest generator wrote 112,972 at 20:04:35 after 2,568 s and 185,126 at 20:14:04 after 444 s (`gaps.py`). Each resume wrote its whole context again; the planner's context was about 750K. The curator ruled out an hour-long cache for agents (17:30 on 11-05, `coordinator/HELD.md`). Proposed (mine): where an agent past about 300K of context would be resumed after a gap of five minutes or more, a fresh agent briefed with the record's sections that it needs takes the step instead; or the design review that a rung waits on runs before the planner starts. Home: the `coordinator` skill's `references/batch.md` and the manual's "Preparing a batch record".
2. **The gate stacked its waits in one turn, and lost the cache once: 94K.** At 22:19:44 it issued two `wait_for` calls on `testFast` in one message; they ran one after the other, the first to its 240 s cap ('still running after 240s'), the second 230 s more, so its next request came 481 s after its last and wrote 94,252 tokens with a cache read of 0. At 22:28:01 it issued five on `testSystem` in one message; they returned together after 219 s, and the gate's result names the four extra polls. The cap of `.claude/skills/fortress-repo/references/session.md` is per call; several waits in one turn pass it. Proposed (mine): `session.md` and the gate's brief say one wait call in a message. Home: the skill writer, and the script's gate brief.
3. **The gate's machine block holds the proxy's line in place of the JDK's.** `gate_summary` ran `compile-ladder/rung-flat-tower/machine.sh` in a call without the gate's exports and its `unset JAVA_TOOL_OPTIONS`, so `java -version 2>&1 | head -1` printed 'Picked up JAVA_TOOL_OPTIONS: …', with the local proxy's port, and `FORTRESS_THREADS=unset`; both are committed in `climb-batch-26/gate/summary.txt`. Proposed (mine): `machine.sh` drops a line that opens 'Picked up' before its `head -1`. Home: the tool, between batches.
4. **Results saved to a file for size, and a briefing read in part.** 17 tool results of 10 agents passed the tool's output limit and were saved to a file under a 2K preview, most of them several skill parts in one `cat`; each took one more call to read. Rung S printed its briefing's parts 2 and 3 in one call, 32.9K, and read them only by `grep` and a few `sed` lines, so it read about 10K of its briefing's 23.5K, the planner's probes and the forks in part. Proposed (mine): the worker's and skeptic's briefs say to read each part of a briefing in its own call, as W, L and T did. Home: the script's briefs.
5. **The commit stage amended its own commit for the PDF's `historical:` line, as at climb batch 25.** Proposed (mine): the commit brief says that the copied `Specification/fortress.pdf` takes the line. Home: the script's commit brief.
6. **Row writes refused for length again.** Row 497's rewrite, and the notes of rows 440, 497, 76, 872 and 368, whose cells were full, went in as rewrites; S's brief asked a note to row 440, whose cell held 676 of 700 characters. Proposed (mine): the planner reads a row's room (`ledger.py show N`) before it briefs a note, and briefs a rewrite where a note cannot fit. Home: the planner's brief.
7. **The gather ran its 20 walk tests twice,** the first call without the five `.test` files. About a minute; no proposal.
8. **Rung T's count ran one code change before its final tree.** It ran on `19e9dbda5`; `8b6fca9b5` then put the line separator into `stringOps`, which the count reads through `match`, and its report says "on its final tree". The gate's count closed it at 0. No proposal beyond the skeptic's reading of the stage's start against the last code commit.

### Misses, by kind

Numbered on from `batch-25-review.md`'s 907.

Found inside the batch:
- **The planner's text wrong, caught before landing:**
  - 908, fork 22's `systemOps` for the line separator (T's first distance run; `8b6fca9b5`);
  - 909, S's brief's note to row 440, which did not fit (S.worker.2).
- **A test that reached too little:**
  - 910, W's Return Type Rule branches without a gated test (skeptic W, `171655095`);
  - 911, row 846's narrowed claim without its test (skeptic T, `4eebb9a45`).
- **A defect without its home:**
  - 912, rows 893 and 894 (skeptic W, `171655095`);
  - 913, row 895 (worker T).
- **Sentences made false and not listed:**
  - 914, `interpreter.md:43` and F-252's title (skeptic W);
  - 915, F-307 and `PLAN.md:49` (skeptic T);
  - 916, F-299's "The 288 by type", `PLAN.md:45` and gather.2's P-159 point (the review, `40d1deca5`);
  - 917, F-240's "That rise" sentence (the commit stage).
- **The record's premises:**
  - 918, the gate's forecasts, and the cost and time estimates (the gate; this review).
- **Process:**
  - 919, the gate's stacked waits and its refill;
  - 920, the gate's machine block;
  - 921, the commit stage's amend for the PDF's line;
  - 922, the row writes refused for length;
  - 923, the gather's twice-run walk tests;
  - 924, T's count before its last code change.

Found by this review: 925, L's team lines (finding B); 926, row 846's latent `self` half, and 927, `getProperty`'s raise without a row (finding C); 928, the microGPT first-error move (section 1); 929, F-34 measured on L's tree; 930, the preparation's resumes (process finding 1); 931, the briefing read in part (process finding 4); 932, the cause of the gate's refill (process finding 2). Finding A's row is the skeptic's (912); its weight on P-146 is this review's.

**Against the earlier notes.**
- 17 found inside the batch (908 to 924), against 25's 22, 24's 21 and 23's 26, for four rungs against seven.
- None was a fault of a change that landed in a moved value but the two that the record planned or the worker reported: `javaIndexOf` past U+FFFF, and `getProperty` at an `EmptyString` name (split 7). Two consequences of a change are recorded as rows: walk loads an extender against P-146's rule and runs one of two fitting declarations (row 893), and the checker refuses a pair that walk now loads (row 894).

## Part 3. For the skill writer

The sentences of the `fortress-repo` skill that the batch made false, from `RECORD.md`'s gather.1 (`PLAN.md:651`), each with the entry or row that now grounds the true sentence; the batch wrote no skill text (`git diff --name-only 4d27fbcc5 a12ab5c60 -- .claude/` prints nothing). I read each on `main` at `29fdf74e1`. The proposed wording is mine; the writer keeps the skill's form.

**False, on the gather's list:**
1. **`references/interpreter.md:43`:** "a pair that is neither two generic declarations nor a generic one beside a plain one;" (among the pairs for which walk keeps the team's check). Walk now reads on their declared domains an own generic function beside a functional method of a generic trait that declares no static parameters of its own. Ground: F-318; F-252's title. Proposed: "a pair that is neither two generic declarations, nor a generic one beside a plain one, nor an own generic function beside a functional method of a generic trait that has no static parameters of its own;".
2. **`interpreter.md:53`:** "Where a program's own component declares both, it refuses a generic operator between an array of a number type and a number … (ledger row 804)." Walk loads the pair and runs the declaration that each call's arguments select (row 804 closed). Ground: F-318; rows 893 and 894. Proposed, in place of the bullet: "It reads the `self` of a trait self-typed directly as `C[\X\] & X` in its exclusion test, as the checker does (F-318), but applies no extender rule of P-146: it loads an object that extends a self-typed trait at a type that it is not a subtype of, and a call that the trait's operator and another declaration both fit then runs one of them (ledger row 893). A trait self-typed through another self-typed trait, and a method with static parameters of its own, keep the team's check. The checker refuses a generic function more specific than such a method, which walk loads (ledger row 894)."
3. **`interpreter.md:95`:** "`String`, `FlatString` and `JavaString` in `String`;" (the carriers of a declared type). A parameter declared `String` is now refused at load; a result declared `String` is carried. Ground: F-299; `StaticNativeApp.java:70`; `tests/NativeHelperNonFlatStringWalk.test`. Proposed: "`FlatString` and `JavaString` in `String`, and `String` as a result type only; `ZZ` in `BigInteger`; `()` in `void`."
4. **`interpreter.md:99`:** "a type of the list above, except `FlatString`, `JavaString` and `()`, in the same Java type;" (the carriers of `self`). The library's own `FlatString` now carries `self` in `String`. Ground: F-299 (`javaForSelf(FType)`, `declaringComponent`). Proposed: "a type of the list above, except `JavaString` and `()`, in the same Java type, and the library's own `FlatString`, told by the component `FlatString` that declares it, in `String`;".
5. **`interpreter.md:102`:** "A program can give its own type the name `FlatString` or `JavaString`, so these names carry no `self`. So a binding in a method of the library's `FlatString` cannot name a helper yet: every program would stop at load." Eleven of `FlatString`'s methods name helpers. Ground: F-299; rows 877 and 878, which stay. Proposed: "A program can give its own type the name `FlatString` or `JavaString`, so walk reads these names by their declaration: a program's own type of either name carries no `self`, and a parameter declared at a program's own `FlatString` is still carried by its name (ledger row 877)."
6. **`interpreter.md:107`:** "The result type, or a parameter type other than `self`'s, is not in the first list: 'no Java type carries the declared'." A parameter declared `String` is refused with the same words. Ground: F-299; `StaticNativeApp.java:178`. Proposed: "The result type is not in the first list, or a parameter type other than `self`'s is not in it or is `String`: 'no Java type carries the declared'."
7. **`interpreter.md:116`:** "A native declared over `String`, glue class or helper alike, receives the wrong text for a `CatString`, as a parameter or as `self` in a method of `String` … If a string that reaches such a native can come from `||`, pass it as `s.asFlatString` …". The library's natives over strings are natives over `FlatString` beside overloads over `String` that flatten; a helper parameter declared `String` is refused. Ground: row 846 as narrowed; F-299; F-307; and finding C here: a `self` declared `String` is still carried by `getString()` (`StaticNativeApp.java:103-112`, `:282`). Proposed: "A glue binding over `String` receives the wrong text for a `CatString`: the name of the type, not its characters (ledger row 846). So would a helper bound in a method of the trait `String`, as `self`: no binding of the library is one. Bind a native over `FlatString`, and beside it an overload over `String` that flattens, as `printlnWithThread(a: String) = typecase a.asFlatString of f: FlatString => printlnWithThread(f) …`, the library's form (`Library/FortressLibrary.fss:4628-4644`)."
8. **`references/revival-changes.md:43`:** "… Walk loads the library's pairs, but refuses such a pair where a program's own component declares both (row 804)." Ground: F-318; row 893. Proposed: "Walk reads such a pair so too, in the library and in a program's own component, where the trait is self-typed directly and the method has no static parameters of its own (F-318). It applies no extender rule, so it loads an object that extends a self-typed trait at a type that it is not a subtype of, and a call that both declarations fit then runs one of them (row 893)."
9. **`references/compiler.md:41`:** "a local function declaration, and an object expression;" (constructs with no case). Ground: F-320; row 304 as narrowed. Proposed: "an object expression;", and after the list: "It compiles a local function as a closure, recursive and mutually recursive within its block, except one with static parameters of its own, two of one name in a block, and one with the `atomic` modifier (ledger row 304); copy the form of their `XXX` tests in `compiler_tests/`."

**Incomplete, made so by the batch, not on the list:**
10. **`compiler.md:90`:** "The wrapper generator wraps every method of a class that it is given … So give every method of a helper class a signature that maps to Fortress, also a private method." Against the interpreter's prelude the checker reads every method of a class that a binding names, and a type that maps only to the compiler's prelude stops the component: `systemOps.getArgs`'s `FStringVector` to `FortressBuiltin.StringVector` (F-321; row 895). Proposed, after it: "A signature maps to Fortress only in the world that checks the binding: against the interpreter's prelude, a method of `systemOps` stops every component whose binding names that class, 'FortressBuiltin.StringVector is undefined.' (ledger row 895)."

**Sentences that hold, met by the batch:**
- `session.md:19` and `:34`, "In an agent, keep every wait under 240 s" and "Run `wait_for` until it returns 0, each time in a new Bash call": true, and passed by a turn of two stacked calls (process finding 2). A rule of one wait call in a message would be a new rule, for the writer to list, not to make (`coordinator` skill, `references/batch.md`, "The landing", step 4).
- `SKILL.md:203`, the scope of `revival-changes.md`: read by the 10 agents it names.
- `compiler.md`, "The checker's time", the count stage about 150 seconds, more under load: about 180 s at this gate.
- `gate.md:3`, "in about 25 minutes": 20.8 minutes.
- `tests-writing.md:85`, home 3: skeptic T's guard of today's glue behaviour for row 846.

## Part 4. Routing

Checked against `main` at `29fdf74e1`: the gather's PLAN entries (in the rung commits and `4f4bba6d6`), the review's (`40d1deca5`), the boot note (`29fdf74e1`), the review queue and the ledger. The manual's routing (`coordinator/climb-batch-workflow.md`, "After the landing: the coordinator's routing") runs after this review, through the record-landing workflow (`coordinator` skill, `references/batch.md`, "The landing", step 4), which reads the list below.

**Step by step:**
1. The landing report: for after the record-landing workflow, when he is back (the boot note).
2. The routing: not run yet; what it owes is the list below.
3. FACTS: the commit stage folded F-53 and F-240, the gather and the review the rest; owed: F-240's "That rise" sentence, F-299's and row 846's latent `self` half, and the two notes of the preparation (below).
4. The skills: the record-landing workflow's skill update, with Part 3 and gather.1; the orientation update on the landing's changed entries, F-318 to F-321 and F-277, F-252, F-34, F-181, F-299, F-32, F-307, F-53, F-240 (`git diff 4d27fbcc5 a12ab5c60 -- explorations/coordinator/FACTS.md`; POSITIONS unchanged).
5. The next batch, after step 4.
6. This review.

### The list for the record-landing workflow, one line each with its home

**Rows the batch filed or rewrote, open:**
- Row 893 (new; walk loads an extender against P-146's rule): PLAN, "Climb batch 26, listed for his review", W.skeptic.2 (`PLAN.md:646`); default P-146's "walk is unchanged"; finding A's options.
- Row 894 (new, `CONTESTED`; the checker's `checkFancyRule`): `PLAN.md:645`, W.skeptic.1; no default on record.
- Row 895 (new; `systemOps` unreadable against the interpreter's prelude): PLAN item 64 under "Pavol's answers", "Before the switch-over's checker reads `System`" (`PLAN.md:148`); no default on record; proposed (mine): the two helpers move to `stringOps` (finding D).
- Row 440 (rewritten; walk's 0/0 against itself, `<=` and `>=` now named): `PLAN.md:648`, S.worker.2, told; its fix has no PLAN line: a line with the next rung of `QQ`'s comparisons.
- Row 304 (rewritten; three forms of local function refused): no PLAN line; with the code generator's later rungs, beside F-34's kinds (`PLAN.md:60`), since neither the library nor microGPT declares them.
- Row 497 (rewritten, its citation re-anchored; an `also` arm's slot 0): its home unchanged, the code generator's rungs (`PLAN.md:60`); not met by L.
- Row 76 (rewritten; the prelude's string juxtaposition, now shown by `tests/simplify1.fss`): goes with the prelude at the switch-over (P-38); no new line.
- Row 846 (narrowed to a program's glue binding over `String`): no line; its notes owe the latent `self` half (finding C).
- Row 872 (rewritten; `Char`'s `asString` past U+FFFF, `javaIndexOf`'s move noted): its line in phase 4's natives list (`PLAN.md`, "The families that wait on a known obstacle").
- Row 368 (rewritten; the wrapper generator and a method with no Fortress type): no PLAN line; with N5 beside row 874 (`PLAN.md`, the N5 line), since the names work gives the helpers' types their Fortress names.
- New row owed: `getProperty` at an empty name raises Java's `IllegalArgumentException` (finding C): `ledger.py add`, then a line with N4 or `System`'s rung.

**Rows closed:**
- Row 804, by `c41c3d2b0`: its PLAN mention, X.skeptic.3 of climb batch 21 (`PLAN.md:529`), built; to `PLAN-history.md`.
- Row 672, by `3eabf8435`, settled by P-159: its PLAN mention, the climb batch 13 entry (`PLAN.md:392`), answered; to `PLAN-history.md`.

**Record defaults the batch took, each to a review-queue entry as climb batch 24's routing wrote them:**
- Question 1 at (a), a local function compiled as a closure class of its own, judged by the Fable review reversible by one rung: not in PLAN; a review-queue entry and a line under "Climb batch 26, listed for his review", default as landed.
- Items 310 and 340 at the Fable judge's default, option (b) with (c), with its three refinements: the queue's items 310 and 340 (`review-queue.md:22-23`) still read as open asks with their old defaults; rewritten as landed at the judge's default and on his review list; PLAN items 62 and 63 (`PLAN.md:140`, `:144`) built, to history.
- The sub-choices inside items 310 and 340: fork 19 (item 332 and the pair) at `PLAN.md:650` and fork 21 (the `String` parameter refused) at `PLAN.md:649`, both present; fork 18 (`FlatString`'s `=` and `flatConcat` at a `Char` left with item 331) and fork 22 (`javaSubstr` on a new helper that raises; the line separator in `stringOps`, split 4) not in PLAN: one line each, default as landed.
- Forks 1 to 17 and 20 and 23 at their defaults: one review-queue entry, default as landed, naming fork 9's sibling fields (split 8).
- Climb batch 24's Question 1, the two bindings over `String` left on glue until the string family (`PLAN.md:609`): built by rung T; to history.

**Items for the curator:**
- The eight under "Climb batch 26, listed for his review" (`PLAN.md:645-652`) and item 64 under "Pavol's answers" (`PLAN.md:148`), nine in all, as `RECORD.md`, "Items for the curator", gives them: eight in the new group and one under "Pavol's answers".
- Missing from PLAN: Question 1 at (a), and items 310 and 340 at the judge's default (above); the points for his sight (`CLIMB-BATCH-26.md`, section 2, "Points the batch lists for him"), with finding B's correction of L's team lines and the values that moved (split 7); the microGPT first-error move (section 1), told, default as landed; finding A's options on row 893.
- The review queue's head: "Before the ledger's repair … the last of the record's work before climb batch 26" and "Climb batch 26 and the natives' batches: 8" (`review-queue.md:8-9`, `:17`, `:21`) want this landing.

**PLAN lines the batch built or made stale:**
- gather.2 (`PLAN.md:652`): the maps' sentences, `coordinator/map/compile-path-walkthrough.md:469`, `:475-476` and `coordinator/map/spec-to-implementation.md:201`, which say the code generator refuses every local function; items 62 and 63; the climb batch 13 entry on row 672; P-159's sentence. Each to its fix, then the entry to history.
- "Where we stand" (`PLAN.md:9-12`): "Runs" ends at climb batch 25; "The live thread" gives climb batch 25's gate as the last landed; "Landed" ends at climb batch 25; "Next" names climb batch 26 as next. All want this landing: 306 of 449 on helpers, the count and the distance 0, local functions compiled, P-160's first step built.
- Phase 4's line for climb batch 26 (`PLAN.md:45`): "gathered on `main` at `4f4bba6d6` with its gate to run": one line, landed at `a12ab5c60`, with this review.
- Phase 4's natives line (`PLAN.md:46-57`): its counts give 306 and 143 and its N1 and N2 line the string family's move, as the gather wrote; the moved text, items 310 and 340's wait, to history.
- Phase 4's code-generator line (`PLAN.md:60`): its 38 in 10 kinds are rung L's tree's (F-34); stands, with the merged tree unmeasured.
- Phase 4's close (`PLAN.md:79`): "Its first three batches, climb batches 23 to 25, landed": four.
- No PLAN line holds P-160's second step, the next batch's (`CLIMB-BATCH-26.md`, "After the landing"): a line in phase 4 or under the next batch.

**POSITIONS:**
- P-159 says the overview's two sentences "are to be revised" (`POSITIONS.md:90`): now revised (`3eabf8435`). His text; the record writer under his rule of 2026-10-31, named to him.
- P-146's "walk is unchanged": stands; finding A is his to weigh.

**Two notes owed to the record from the batch's preparation, which no entry holds:**
- (i) The Fable judge's note: the compiled checker's walk-world table reads a helper's Java `String` parameter as the Fortress `String` (`compiler/NamingCzar.java:488`), while walk now refuses such a parameter at load, a divergence for the switch-over's design (`CLIMB-BATCH-26.md`, section 2, forks 20 and 21; `reviews/string-natives-2026-11-05.md`). PLAN holds it as T.worker.2's item (`PLAN.md:649`); home: a FACTS entry beside F-298 and F-299, and the names batch's line in PLAN (phase 4, "The names").
- (ii) The planner's note: the carrier of the one library's `FlatString` on the compiled path has no entry in the record; T's compiled guard binds the helpers over `JavaString` (fork 23). Home: a line under N5 in PLAN's natives list, and a FACTS entry once it is measured.

**The skill sentences:** Part 3's ten, for the skill writer, through the record-landing workflow's skill update.

**The manual and the script:** process findings 2 to 6, between batches; process finding 1 in the `coordinator` skill's preparation.

### The steps due before the next batch

1. **This review committed,** with its INDEX line; then the record-landing workflow (`tools/record-landing/README.md`; the boot note, `args: { batch: '26', base: '4d27fbcc5', landing: 'a12ab5c60' }`), which routes the list above, lands, pushes and runs the orientation update and the skill update.
2. **FACTS and the ledger:** F-240's sentence; row 846's notes and F-299's carriers; the new row for `getProperty`'s raise; the two notes of the preparation.
3. **For him, with defaults:** finding A's options; Question 1 and items 310 and 340 as landed; item 64, with finding D's proposal; P-159's sentence, named.
4. **The script, between batches:** process findings 2 to 6.
5. **The next batch,** by the record's "After the landing": P-160's second step, which W unblocks; the natives' families after his answers to items 331, 332 and 354 and the integer conversions; N4 after a design review of its carrier and its Java type; the literals with N5; the next code-generator rungs, `asif` (row 818) and the 2-D and 3-D ranges (row 733).

## What I did not do

- I built nothing and ran no Fortress program, suite, stage or JVM. I changed no file of the tree but this review and its INDEX line, and committed only those two.
- I read the run's transcripts only through scripts: `batch-measures.py` on three runs, `transcript-study/skill-load.py` and `spend.py` on this run and the three spans, and the scratch scripts named in the header. For the preparation I read only the transcripts' labels and metadata, not their contents.
- I ran `record.py check --base 4d27fbcc5`, `ledger.py check` and `ledger.py landing-check 4d27fbcc5571f0157b3dfda3977b63430c66d701` ('0 failures'; '0 fail the template'; 'no finding'), `facts-extract.sh`, `grep`, `diff` and `git`, which write nothing.
- Splits 6 and 8's code readings and section 1's trace of the microGPT first error are by reading, not run.
- I did not read the coordinating session; what he was told comes from PLAN, the boot note and the record.

## For the curator

Climb batch 26 landed on 5 November and is pushed. It made four changes. The interpreter now accepts a program's own operators between an array and a number beside a vector's own operator, as the compiler's type checker already did; this is the first of the two steps of your decision on opening `Number`. The specification's overview of operators now says that a comparison with a NaN, or with the rational 0/0, answers false, as your decision on NaN comparisons asked. The compiler now compiles functions declared inside a block, which nine library functions needed, the sum operator's among them. And 18 more of the library's built-in functions, the string functions, now call Java methods that both the interpreter and the compiler can call, so 306 of the 449 do.

The full check of the merged tree was green, the compiler's type checker still finds no error in the library, and both quick microGPT checks passed 7 of 7. The run wrote 2.6 million tokens in under two and a half hours, against the plan's 3.6 million and four and a quarter hours. The two and a half days of work before the run wrote 16.3 million, 3.9 million of them for this batch's planning and reviews; about 1.4 million of that went on agents resumed after long waits, which had to reread their whole context.

One finding touches a decision of yours. Your decision on self-typed traits gave the compiler's type checker a rule that a type must be what it claims to be, and left the interpreter unchanged. The interpreter now reads such traits the way that rule allows, without checking the rule, so it accepts a wrongly declared type and then picks one of two matching functions. The default keeps the interpreter as it is, since the compiler refuses such a program; the other way adds the check to the interpreter.

The batch's choices taken without you are on your review list, each with a default that keeps what landed: the compiled local functions as their own objects, and the string functions' design at the reviewer's default. One question has no default: two system functions now call a Java class that the type checker cannot read with the interpreter's library, so they will fail when the checker first reads them; I suggest moving them to the Java class that the other string functions use.
