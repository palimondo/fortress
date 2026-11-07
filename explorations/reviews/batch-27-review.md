<!-- The combined post-batch review of climb batch 27, the batch of coordinator/CLIMB-BATCH-27.md that is phase 4's fifth batch (ten rungs planned, N, I, F, C, W, S, A, E, G, T; run wf_72601264-7dd, base ed8652dc08ecac3d713d9cc1611a1141ec9e0775; the Workflow call at 06:34:48 UTC on 2026-11-07, its first agent's first record at 06:35:08, its commit stage's last commit a2f0b5cf2 at 11:56:53 the same day; 31 agent transcripts, one of them empty; no restart, no resume; a judge on rungs N, S and T, a repair launch on S, a judge and a repair round on the merged tree; eight rungs landed on the local main, F e4872ad93, N a97d60dc6, G 8caa399e8, E 598331c0d, I 0122a399a, A 5ae581c4a, C fc860b655, W c21780408, the closes bb00aef89, the gather record 0feb3bba7, the review's corrections ecccddeab, the judge's ruling b9635f0a7, the repair 4445d848b and 151cb4126, the gate's tables 29e52a3dc and the record's "Not pushed." a2f0b5cf2; S and T never started; the push held by the script on rung N; origin/main at 87e713bad), owed at the landing by the coordinator skill's references/batch.md, "The landing", step 3, in the form of reviews/batch-26-review.md, by a review worker reading only, against the local main at a2f0b5cf2 (nothing changed since). New in this review: the coordinator's added point on the distance's two crash rows (section 7, point 6). The measures are batch-measures.py's on this run (it reads 29 of the 30 transcripts with records: skeptic E's has no meta file), with the rows of climb batches 24 to 26 taken from reviews/batch-26-review.md; transcript-study/skill-load.py's and spend.py's; and scratch scripts in /tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/rev27/ (calls.py, errs.py, brief2.py, nohup.py, runs.py, upto.py, gaps.py, tokens.py and teststeps.py copied from rev26/, the first six given a label from the run's journal where a transcript has no meta file and made to skip a line that does not parse; agents27.py, spans27.py and prepgroups27.py are agents.py, spans.py and prepgroups.py with that fallback and this review's times and groups; labels.py, relay.py and disk.py new: relay.py reads each agent's first message and its calls that name the relayed sentence, disk.py each df line and each "no space" result). Tokens are writes only (input plus cache creation, one count per message id). The microGPT walk check is reported by its verdict only, at the curator's ruling of 2026-10-23. Besides reading, this review ran only those scripts, record.py check, ledger.py check and landing-check, facts-extract.sh, grep, diff, du, df and git, which write nothing in the tree. It ran no build, suite, stage or Fortress program. -->

# Climb batch 27: eight of ten rungs on a spent disk, `Number` opened and `SEQV` given its meaning, the demos at 52 again after a repair, and the distance at 0 with its first crash rows; a run of 5.17M after a preparation of 29.5M, 17.5M of it the ledger pass

## What came up in this run

### 1. The count 0, and the distance 0 with two crash rows, against climb batch 26's tables

**What the record expected** (`coordinator/CLIMB-BATCH-27.md`, section 6, "The gate, and what it should show"): the count and the distance 0 over the fourteen components, `#crash none`; the suites up by the rungs' tests; the 42 atomic runs; the ladder's 85; the 52 demos at the gather; microGPT's quick pair at the commit stage. The first gate (`a57d12d7`, 10:25 to 10:26) stopped at its disk check, 305M free after it deleted `ProjectFortress/test-tmp` and `test-caches`, under the 500M floor (the journal's result). The gate after the repair (`a7fd6fe2`) ran on `151cb4126` and was green (the journal's result).

**The count's table** (`climb-batch-27/gate/checker-count.txt` against `climb-batch-26/gate/checker-count.txt`): `diff` prints nothing. 14 api rows, all 0, `#total 0`, `#locations 0`, `#crash none`, the shadow matching. No row is new and no row rose, so no row needs a rung edit to explain it.

**The distance's table** (`climb-batch-27/gate/distance.txt`): `#total 0` and every `#kind` 0, but two crash rows where every gate from climb batch 20's to 26's read `#crash none` (`grep -n '^#crash' compile-ladder/climb-batch-2*/gate/distance.txt`):

    #crash	decl	ObjectDecl FortressBuiltin.fss:661:1-773:2	IllegalArgumentException	Comparison method violates its general contract!
    #crash	stage	component FortressBuiltin leftover	InterpreterBug	** bug! Result of typechecking still contains intermediate nodes. Component at FortressBuiltin.fss:12.1

`compare.sh` printed 'DISTANCE SAME   0', 'crash gone   none' and both rows as 'crash new' (`summary.txt`, `# distance`). Section 7, point 6, gives which rung, what the crash hides and why nothing turned red. `#seconds 144 FortressLibrary 90` against 246 (182). The per-site list (`compile-ladder/gate/distance-sites.tsv`): its header alone.

**The summary's other rows** (`climb-batch-27/gate/summary.txt` against 26's): `CompilerJUTest` 1,432 to 1,447; `testSystem` 756 to 778, over shards of 187, 197, 192 and 202; the library track 86, the other-compiler track 263, the misc track 440 and `testSpecData` 130, as before; the atomic runs 42 of 42 `PASS`; 'COUNT SAME   0, declared none'. The machine block reads the JDK's line and `FORTRESS_THREADS=1`, so climb batch 26's process finding 3 held (`# machine openjdk version "25.0.4.1"`).

**The ladder** (`climb-batch-27/gate/ladder/`): `comparison.txt` and `microgpt-comparison.txt` are empty; `microgpt-phase.md` differs from 26's in its fifth column only, every phase and first error the same (`diff`).

### 2. The stages' times against climb batch 26's gate

- **The count stage: about 80 s** (`checker-count/javac.txt` at 11:52:42 to `run.txt` at 11:54:03, the commit stage's figure in F-240), against about 180 s at 26's gate.
- **The distance stage: 144 s** (`FortressLibrary` 90 s) at a start load of 0.28, against 246 s (182 s) at 0.34. The rungs' own runs on their trees took 153 s to 218 s, and rung E's 435 s ran beside its `ant testSystem` (their `distance-postedit.txt`).
- Both stages about halved. No run measured why. The batch emptied `Number` (N) and cut the `FortressBuiltin` component's check short at `Char` (section 7, point 6); neither is shown to be the cause.
- **The suites:** `testFast` 5 min 27 s against 7 min 57 s, with 15 more compiled steps; `testSystem` 2 min 54 s against 3 min 50 s, with 22 more programs; `testSpecData` 44 s against 1 min 6 s.
- **The gate after the repair:** 17.8 minutes (11:37:04 to 11:54:49), against 20.8.
- **F-240** now gives this gate's figures (the commit stage, `29e52a3dc`). The commit stage named two of its sentences false for the routing: "That fall has no measured cause: each gate ran the stage once, and at both gates the stage started about 10 s before `testFast`", and "From climb batch 22's gate to climb batch 26's it stayed between about 150 s and 180 s" (its result).

### 3. The cost, by role, against the record and the batches before, and in three spans

**The run wrote 5.17M over 30 agent transcripts for 31 launches, in 5 h 22 min** (06:35:08 to 11:57:11 UTC; `agents27.py`). `batch-measures.py` gives 4.99M over 29: it skips skeptic E's transcript, which has no meta file (181K), the disk being full when it started (section 7, point 2). One launch, rung N's skeptic, left an empty transcript; rung S's transcript holds no usage record. No agent was retried or killed.

| Role | B24 | B25 | B26 | B27 | B27 share |
|---|---|---|---|---|---|
| Rung workers | 2.41M (7) | 2.93M (7), and 219K killed | 990K (4) | 2.26M (10; 8 landed 2.21M, T 41K, S none recorded) | 43.6 % |
| Skeptics | 2.25M (7) | 1.15M (7), and 229K killed | 707K (4) | 1.33M (9; the 7 that checked 1.27M, S's and T's 53K; N's empty) | 25.6 % |
| Judges on a rung, and a repair launch | 0 | 0 | 0 | 231K (judges N 109K, S 22K, T 22K; repair S 78K) | 4.5 % |
| Gather | 466K | 1.07M | 333K | 390K | 7.5 % |
| Merged-diff review | 366K | 238K | 204K | 271K | 5.2 % |
| Its judge and repair | 0 | 0 | 0 | 120K + 248K | 7.1 % |
| Gate | 126K | 99K | 204K | 213K (98K the first, stopped at its disk check) | 4.1 % |
| Commit | 130K | 96K | 113K | 118K | 2.3 % |
| **Total** | **5.74M** | **6.03M** | **2.55M** | **5.17M** | |
| Rungs landed, agents | 7, 18 | 7, 20 | 4, 12 | 8 of 10, 30 and one empty | |
| Span | 5 h 01 | 4 h 47 | 2 h 27 | 5 h 22 | |
| Per landed rung, all roles | 0.82M | 0.86M | 0.64M | 0.65M | |

**Against the record:** "About 6.9M tokens written: from 5.7M if the workers write as climb batch 26's did, to 9.1M with a judge and a repair round on one rung, or a restart", and "About 7 hours 15 minutes, at two agents at a time" (`CLIMB-BATCH-27.md`, section 2, "Cost").
- **5.17M, 25 % under the estimate and under its low end, for eight rungs of ten.** The eight landed workers wrote 2.21M against the record's 3.45M for them: N 259K against 0.6M, I 338K against 0.4M, F 281K against 0.4M, C 221K against 0.3M, W 294K against 0.5M, A 234K against 0.3M, E 301K against 0.6M, G 286K against 0.35M.
- The seven skeptics that checked wrote 1.27M, the record's figure for them (E 0.25M and six at 0.17M): E 181K, F 200K, W 163K, G 225K, I 185K, A 162K, C 157K.
- The fixed roles wrote 0.99M against about 1.15M: the gather 390K against 0.6M, the review 271K against 0.3M, the gate 213K against 0.13M, the commit 118K against 0.12M.
- What no estimate holds: 0.60M of rulings and repairs, 0.23M of them on the full disk (the judges of N, S and T, the repair launch on S), and 0.37M on the merged tree (the review's judge and repair, section 4).
- **The time:** 5 h 22 min against about 7 h 15 min. The workers ran 257 minutes in all: E 31, N 24, F 25, W 35, I 49, G 29, C 39, A 25.

**The order of the run.** Two agents at a time, the workers in the order E, N, F, W, I, G, C, A, T, S: E and N at 06:35, F at 06:58 when N returned, W at 07:06, I at 07:23, G at 07:41, C at 08:11, A at 08:13, T at 08:37 and S at 08:38, each on the return of the one before. Then the skeptics, E's at 08:41 (and N's, whose transcript was made at 08:40 and stayed empty), F's 08:50, W's 08:56, G's 09:01, I's 09:05, A's 09:15, T's 09:21, S's 09:21, C's 09:24, the judges of N, T and S between, the repair launch on S at 09:26. The gather at 09:35, the gate and the review at 10:25, the review's judge at 10:35, its repair at 10:38, the gate again at 11:37, the commit at 11:54.

**The cost in three spans, each on its own** (the `coordinator` skill's `references/batch.md`, "The landing", step 3). Each span is `spend.py <start> <folders>` less `spend.py <end> <folders>`, over the same folders: the session's agents (`…/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/`), each workflow folder that changed after climb batch 26's commit stage's last commit (`wf_d59166e9-114`, `wf_513fd6a7-1ae`, `wf_deae5f0c-1d9`, `wf_ddb6159d-7ff`, `wf_727d9847-e38`, `wf_af67b86b-89c`, `wf_372cca35-338`, `wf_bb9edd49-b79`, `wf_935fa942-814`, `wf_72601264-7dd`), and the headless sessions' folder (`/root/.claude/projects/-home-user-fortress/`, the coordinating session's own transcript left out by `spend.py`). A transcript counts in the span where it last changed.

| Span | From | To | Written | Transcripts |
|---|---|---|---|---|
| The landing work of climb batch 26 | `a12ab5c60`, 2026-11-05 22:42:12 | the end of its record-landing run `wf_513fd6a7-1ae`, its push, journal last changed 2026-11-06 00:42:46 | **2.80M** | 29 |
| The preparation of climb batch 27 | 00:42:46 on 11-06 | the run's first agent, 2026-11-07 06:35:08 | **29.54M** | 285 |
| The run | 06:35:08 | `a2f0b5cf2`, 11:56:53 | **5.97M** | 36 |

`spend.py` printed 39.32M from 22:42:12, 36.52M from 00:42:46, 6.98M from 06:35:08 and 1.01M from 11:56:53 (each total holds this review's own transcript, which last changed after every end, so the differences leave it out). `wf_513fd6a7-1ae` is the record-landing run of climb batch 26 (launched 23:29:22 with `batch: '26'`); its last result is its push stage's, 'All three pushes succeeded (d7a03f34f..75798a609)'. Its revival-page stage was added after it ran (`b88d26f52`, 04:35 on 11-06), and the page was updated by hand at 04:28 (`0868faa51`), in the preparation.

- **The landing work of climb batch 26, 2.80M:** the record-landing run 1.85M over 24 agents (its sort 230K, check 227K, page 151K, judge 149K and 60K, admission 104K, the skill writer 66K and its cold read 57K, the quizzes, the rest under 90K each); the post-batch review 486K; the batch script's fixes from it 195K; two headless sessions of the skill writer 165K (their records' cwd and branch, `main`); climb batch 26's commit agent 113K, whose transcript last changed at 22:43:25, 73 s after its last commit, so by the rule it counts here. Against climb batch 25's 1.75M and its skill update by hand of about 0.20M, which this run now holds.
- **The preparation, 29.54M over 30 hours** (`prepgroups27.py` on `spans27.py`'s labels; `git log a12ab5c60..ed8652dc0`, 161 commits). **What cost most: the ledger pass, 17.48M, 59 % of the preparation and 3.5 times the run's own 5.05M.** Its four pilot runs `c-run1` to `c-run4` wrote 3.42M, 3.51M, 3.60M and 3.53M, about 50 agents each; its first run `p-run1` 0.89M and its reconcile 0.73M; its two designs (Fable 551K, Opus 240K), the design reconcile 398K, its review of churn and cost 175K, the blind audit 149K, its pilot page 160K and its queue items 142K (`a2a388df4`, `b13ca2a5f`, `55e38733f`, `e0c04fb23`, `46cacb6c0`, items 368 to 370). The rest:
  - **Climb batch 27 itself, about 5.2M:** the planner 505K and the planner of rungs A and E 546K; the generator 409K and its rerun for ten rungs 102K; three Fable reviews, 777K, 401K (rungs N and F rewritten) and 745K (rungs A, E, G, T); the rewrite of rungs N and F for P-165 562K and its POSITIONS entry 356K; the decisions recorded (the hard set 192K, the I/O objects 135K, the integer conversions 112K, `Char` 94K) and the rows filed from them (122K, 80K, 81K).
  - **The design reviews behind P-162 to P-168, 3.32M:** the hard set 549K, the I/O objects' carrier 501K, `Char`'s `asExprString` 434K, the integer conversions 428K, the carrier of `Any` 362K, strings under strict equivalence 230K, and the report on strings in Fortress 818K.
  - **The pages and the skill changes, with their cold reads and the skill writer, about 2.66M** (27 transcripts and the comments probe `wf_935fa942-814`, 70K; the skill writer's headless session `748b4ff6` 565K).
  - **The record's upkeep after climb batch 26, 0.51M**, and the review of the natives after this batch, for climb batch 28, 0.35M.
  - **Resumes after long gaps, again** (climb batch 26's process finding 1): about 0.83M. The strings report wrote 382,816 tokens in one message at 05:50:21 after a gap of 1,657 s, when the coordinator sent it one more row; the generator 193,209 at 18:33:28 after 22,199 s with a cache read of 0; the `asFloat` POSITIONS worker 134,122 after 4,993 s; the first Fable review 116,833 after 523 s (`gaps.py`).
- **The run's span, 5.97M:** the run's own 29 transcripts 5.05M (its commit agent, whose transcript last changed at 11:57:11, counts after the run), and 0.92M of the coordinator's own agents that ran beside it: the Fable judgement on the natives' binding 302K (10:58 to 11:21), two page workers launched at 06:34 (124K), the cold read of three coordinator-skill changes and the drafts page (260K, 07:22 to 07:38), the drafts page's item 31 (139K, 10:40), and two headless skill-writer tasks (91K, 07:20 and 10:39; section 7, point 5).

So the preparation wrote 5.8 times the run's own writes; the batch's own preparation, about 5.2M, about the same as the run.

**The briefing's use and cost:**
- **15 of 15 briefed launches that worked read it, the eight workers and the seven skeptics that checked, none in its first turn.** The workers' first briefing calls came at calls 5 to 16, 37 to 78 s after each agent's start; the skeptics' at calls 4 to 15, 16 to 71 s (`brief2.py`). Rungs S and T and their skeptics read none, having no worktree.
- Its results came to about 320K tokens, 6.2 % of writes, at 0.40 tokens a character plus 110 a call: workers 229K (N 44.1K, F 40.4K, C 33.6K, I 28.7K, A 21.9K, G 21.4K, W 19.7K, E 19.4K), skeptics 90K (A 17.5K, E 15.0K, G 13.7K, I 12.5K, C 10.9K, W 10.6K, F 10.1K). Every worker read each part in its own call (climb batch 26's process finding 4, held). Per launch about 21K. `brief2.py` also matched four calls of the review's repair, 21.1K, which are not a rung's briefing and are left out.

| Batch | Briefed agents | In the first turn | Run at all | At calls | Seconds after start | Its tokens (estimate) |
|---|---|---|---|---|---|---|
| 24 | 14 | 0 | 14 | 11 to 19 | 48 to 92 | about 239K, 4.2 % |
| 25 | 16 (14 finished) | 0 | 16 | 3 to 18 | 15 to 132 | about 265K, 4.4 % |
| 26 | 8 | 0 | 8 | 5 to 13 | 21 to 89 | about 133K, 5.2 % |
| 27 | 15 of 19 launched | 0 | 15 | 4 to 16 | 16 to 78 | about 320K, 6.2 % |

**Other measures.**
- **First calls:** 1.29M (25.8 % of 4.99M), 10 cold (`batch-measures.py`): rung E, the run's first agent; the judge of N, the repair launch on S, the gather, both gates, the review, its judge and its repair, the commit. Every skeptic read a warm prefix of about 52K. At climb batch 26, 0.62M and 6 cold.
- **Cache refills: 0** (`batch-measures.py`; climb batch 26's process finding 2, held: the waits of the gather, the gates and the repair each came in their own call, 'still running after 240s' at most once a call, `errs.py`).
- **Refusal cycles: 3 rungs, 231K (4.6 %), all from the full disk:** N, its judge 109K on its skeptic's refusal; S, its judge and a repair launch 100K; T, its judge 22K.
- **The skill's load** (`skill-load.py`, on 29 agents): 797K, 16.0 %: 193K of load text (3.9 %) and 604K over 246 part reads (12.1 %), against 13.9 % at 26. 22 agents loaded `fortress-repo`; the seven that did not are the launches on the full disk (rungs S, the skeptics of S and T, the judges of N, S and T, the repair on S). `revival-changes.md` was read 22 times (149K). The script counts one read of `committing.md` for the review's judge and for N's judge: each is a heredoc that names the file, not a read.
- **Builds and suites** (`runs.py`; the agents' commands): one build per code state, but for rung I, which built and ran both stages and its suites on two code states, the second after its last code change at 07:53:58 (both on record in its report); rung A's distance ran twice, the first dying 'No space left on device' at 08:32 (rc=99), and the second giving its table; rung A started `ant testSystem` twice, killing the first. The gather built the merged tree once; the repair built it once (10:41); the gate after the repair took 3 s to build and ran the library order, since the caches had started again at the repair's build. No skeptic ran a stage. Skeptic G built three times, for its defect fix (`dad6b664d`).
- **Rows:** 11 opened (918 to 928); 14 closed, 13 in `bb00aef89` (434, 897, 113, 909, 910, 911, 906, 907, 861, 898, 899, 903, 916) and 921 in `151cb4126`; 9 rewritten (596, 551, 818, 908, 441, 442, 321, 364, 898); notes on 872, 915, 901, 902, 919 (`RECORD.md`, "Rows opened"). `ledger.py landing-check ed8652dc08ecac3d713d9cc1611a1141ec9e0775`: 'ed8652dc0..HEAD: no finding'; `ledger.py check`: '927 rows, 0 fail the template'; `record.py check --base ed8652dc0`: '0 failures', with 220 FACTS entries over 600 characters reported (211 at 26's review).
- **The disk:** 5.5G free at the second gate's start (its `df` at 11:37:32), after 31M to 443M through the run (section 7, point 2).

Per agent, in order of start (UTC; ids are the transcripts' `agent-<id>.jsonl`; messages are distinct message ids):

| Agent | Id | Writes | First call | Messages | Minutes | UTC |
|---|---|---|---|---|---|---|
| Rung E | a8ef4745 | 301K | 81K, cold | 122 | 31.1 | 06:35-07:06 |
| Rung N | a3f19390 | 259K | 30K | 112 | 23.7 | 06:35-06:58 |
| Rung F | a94a978b | 281K | 27K | 106 | 25.0 | 06:58-07:23 |
| Rung W | a8fe5974 | 294K | 26K | 137 | 35.3 | 07:06-07:41 |
| Rung I | a3c3ea0a | 338K | 26K | 127 | 49.1 | 07:23-08:13 |
| Rung G | a454e43f | 286K | 25K | 129 | 29.4 | 07:41-08:11 |
| Rung C | a26fb27f | 221K | 25K | 112 | 39.1 | 08:11-08:50 |
| Rung A | a0a90d8c | 234K | 28K | 119 | 24.5 | 08:13-08:37 |
| Rung T | ada58ad2 | 41K | 24K | 10 | 1.1 | 08:37-08:38 |
| Rung S | a6edd7da | none recorded | | 0 | 0.0 | 08:38 |
| Skeptic N | a5356b50 | empty transcript | | | | 08:40 |
| Skeptic E | a5416b02 | 181K | 12K, its first records lost | 79 | 14.6 | 08:41-08:55 |
| Skeptic F | a035a657 | 200K | 31K | 62 | 10.8 | 08:50-09:01 |
| Skeptic W | a987f2df | 163K | 32K | 47 | 9.5 | 08:56-09:05 |
| Skeptic G | a95ff653 | 225K | 29K | 88 | 20.2 | 09:01-09:21 |
| Skeptic I | af30c5c3 | 185K | 30K | 56 | 10.2 | 09:05-09:15 |
| Skeptic A | a84b4ee7 | 162K | 31K | 50 | 9.6 | 09:15-09:25 |
| Skeptic T | a444490d | 26K | 24K | 2 | 0.6 | 09:21 |
| Skeptic S | a60f57c4 | 27K | 24K | 3 | 0.5 | 09:22 |
| Judge N | aaaf1cd7 | 109K | 76K, cold | 10 | 2.4 | 09:22-09:24 |
| Skeptic C | a4a51020 | 157K | 29K | 57 | 10.6 | 09:24-09:35 |
| Judge T | aa19e137 | 22K | 19K | 2 | 0.7 | 09:25-09:26 |
| Judge S | a13e05a4 | 22K | 19K | 3 | 0.6 | 09:26 |
| Repair S | a0bd1ce0 | 78K | 76K, cold | 2 | 0.5 | 09:26-09:27 |
| Gather | ab0b64cb | 390K | 108K, cold | 189 | 49.5 | 09:35-10:25 |
| Gate | a57d12d7 | 98K | 71K, cold | 10 | 0.9 | 10:25-10:26 |
| Review | aa44ab01 | 271K | 92K, cold | 77 | 10.7 | 10:25-10:35 |
| Judge of the review | ad0e1ce2 | 120K | 79K, cold | 15 | 2.9 | 10:35-10:38 |
| Repair of the review | a7c01ef3 | 248K | 76K, cold | 97 | 58.1 | 10:38-11:37 |
| Gate after the repair | a7fd6fe2 | 115K | 71K, cold | 34 | 17.8 | 11:37-11:54 |
| Commit | a11d2fdb | 118K | 80K, cold | 18 | 2.3 | 11:54-11:57 |

### 4. The tail

- **The gather** (390K, 49.5 minutes, 09:35 to 10:25):
  - It applied the eight patches on `main` in the order F, N, G, E, I, A, C, W, which breaks two of the manifest's orders that the shared files contradict, A after E and A before W (`RECORD.md`, "The rungs applied"; gather.1). No conflict.
  - On `c21780408` it built the merged tree and ran the library order; the 36 walk files and two `.test` files of the rungs, 'OK (34 tests)'; the nine compiled `.test` files in one JVM, 'OK (15 tests)'; row 925's `XXX` test, which it wrote, seen passing as an expected failure and failing with the literals changed; `ledger.py landing-check`, no finding; the specification once on the last text, its first build dead on the disk ('fflush() failed (No space left on device)', 1.2M free at 09:57:18), its second with the log sent to `/dev/null`, 'BUILD SUCCESSFUL' twice and 0 warnings; the 52 demos from 09:59 to 10:22, 'demos: 52 run, 51 reached their end', `turnersParaffins0` stopped at `Library/Map.fss:165` through rung N's overloaded `ZZ32` `=` and walk's row 921. It ran neither stage, as its brief gives.
  - It opened rows 918 to 928, closed 13, added F-323 to F-330, revised Appendix I's natives effect to 341 of 443 (`changes.tex:4625-4658`), and routed the items into PLAN (`PLAN.md:134-148`, `:679-696`). It left F-32, F-299, F-57, F-34, F-308, F-131, F-151, F-311, F-318 and F-321 to the routing (gather.3).
  - Its "Points to report" opens "None holds the push", while the stopped demo acted against P-79; the review held the push on it.
- **The merged-diff review** (271K, 10.7 minutes, beside the first gate): **not approved**, one blocking finding, `turnersParaffins0` against P-79, with three ways. Its corrections in `ecccddeab`: rows 916, 918, 919, 923 and 928 and F-327 and F-330 re-anchored; F-283 and PLAN's "Where we stand" stating 51 of 52; the relayed user request applied to the held list, `HELD.md:43` and `:132` (section 7, point 3).
- **The judge of the review** (120K, 2.9 minutes): **repair**, the review's way (b), row 921 fixed in walk by `Specification/basic/expressions/type-annotation.tex:42-53`, row 919 left open (`JUDGE-review.md`; judge.1). It committed its ruling as `b9635f0a7` (section 7, point 4).
- **The repair** (248K, 58.1 minutes): test first, 'Unexpected method value … given receiver (Leaf asif Named)', 'Tests run: 1,  Failures: 1' on `bd7efb95b` at 10:40:42; the fix in `DottedMethodApplication.java:96-97`, `:119-138`; 'OK (5 tests)' with the three `XXX` files still failing by their own messages; the demo driver twice, 51 of 52 at its first run (`Generator2Demo`, `IntegerOverflow` on a random draw, then three clean runs alone), 52 of 52 at its second, 11:11:45 to 11:33:44 (`REPAIR-review.md`, section 2). It ran no `ant testSystem`, leaving it to the gate.
- **The gate after the repair** (115K, 17.8 minutes): green on `151cb4126`, as section 1 gives; it named the two crash rows and called the distance "never red" (its result).
- **The commit** (118K, 2.3 minutes): the tables, the per-site list, F-53's title and F-240's figures by `record.py set` ('0 failures'), the gather's PDF copied as `Specification/fortress.pdf` with its `historical:` line in the message (no amend; climb batch 26's process finding 5, held), the quick microGPT walk check, and the "Not pushed." paragraph. It pushed nothing and kept every worktree. It named F-240's two sentences and F-54's `#crash none` as now false, and `b9635f0a7`'s footer (its result).

### 5. The microGPT walk check

Its verdict lines (`climb-batch-27/gate/summary.txt`, `# microgpt-walk`): "VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS" for `MicroGptAplQuick` and for `MicroGptFlatQuick`, each run ending `rc=0`. So 7 of 7 on both programs, the first landing with `Number` empty, `SEQV` by the specification's rule and the ilk printed by the trait. By the ruling of 2026-10-23 the seconds are not compared (`PLAN.md:9`).

### 6. The natives and the code generator after phase 4's fifth batch

- **The bindings.** By the gather's count, comments struck, 341 of the one library's 443 live bindings name a helper and 102 a glue class (`RECORD.md`, "The count of the bindings"): I +16, F +9 with one binding fewer, C +1, A +2 with one fewer, W +7 with four fewer. The batch's brief planned 341 of 438; W left `FileWriteStream`'s 5 on their glue (row 926). F-32 and F-299 still read 143 and 306 of 449 on the local `main` (`facts-extract.sh F-32 F-299`), for the routing.
- **`Number` opened** (N; F-324): no clause, no `asFloat`, no `=`; each number type declares `asFloat` and one `=` pair per coercion, 42 declarations (N's judge, by the diff); the norm at eight types; the reflective generator's fixed choice. P-160's second step and P-165, built.
- **`SEQV`** (E; F-326): the specification's rule in walk's value classes and in `equality.sEquiv`, the code generator's value mark, `Ratio`, `IntLiteral` and `FloatLiteral` value objects; P-168 and P-166, built.
- **The carrier of `Any`** (A; F-328): `ilkName` and `SEQV` on the compiled helpers, answered under walk by `NativeApp`'s table; `asString` as `self.ilkName`; walk prints `ZZ32` for `Int`. P-167, built.
- **The code generator compiles `asif`** at a receiver, at a call whose every dispatched argument is an assumption, and as a value (G; F-325), and refuses the partial call and two generic forms; row 818 narrowed. The code generator's count over the fourteen was not measured on the merged tree.
- **What the zero rests on now.** The count's 0 and the distance's 0, but the distance's check of `value object Char` crashed (section 7, point 6), so its zero does not hold that declaration's body, `Char`'s 41 helper bindings among it.

### 7. The points the coordinator asked for

**1. The hold.** The script held the push on rung N: `turnersParaffins0` stopped on the merged tree, 'demos: 52 run, 51 reached their end', against P-79 (`RECORD.md`, "Not pushed.").
- **Its ground does not stand on the repaired tree.** The repair's second driver run, 11:11:45 to 11:33:44, printed 'demos: 52 run, 52 reached their end'; its `summary.tsv` holds 52 `END` lines, `turnersParaffins0` 'END rc=0 clean' with its last line, `Generator2Demo` 'END rc=0 clean' (`tmp/repair-review/demos2/`). That run used the code built at 10:42:20 from the fix edited at 10:41:37 (`tmp/repair-review/build.txt`; the file's time), the file that `4445d848b` committed at 11:34:14. Past `4445d848b`, only `explorations/` and `Specification/fortress.pdf` changed (`git diff --name-only 4445d848b a2f0b5cf2`). The gate after the repair ran `ant testSystem` on `151cb4126`, 778 tests, 0 failures, with `AsIfOverloadedMethodWalk` among them. F-283 states the 52 again. So the curator can lift the hold on its ground.
- **Anything else in the local commits.** No ground of the record's: the gate is green, the landing check clean, every rung's change reversible, nothing pushed out of order (`origin/main` at `87e713bad`, an ancestor of `a2f0b5cf2`). Two points that he may weigh before the push, each with options in Part 1's findings: the distance's two new crash rows (point 6; finding A), and the footer of `b9635f0a7`, which breaks his decision on the footer (point 4; finding B). The rest goes with the routing after the push: F-32, F-299, F-53, F-54, F-281, F-288 and PLAN's "Where we stand" (Part 4).

**2. The disk.**
- **What filled the allowance** (about 37 GB, Used plus Avail; `cloud-container`, `references/machine.md`). The run grew the eight rung worktrees to 296M to 1.1G each, 5.2G in all, against the record's "about 206 MB each" (`CLIMB-BATCH-27.md`, section 6, "Before the launch", 5): about 480M of `ProjectFortress/test-caches` in each tree where `ant testQuick` passed (E, F, W), and 200M to 390M of `tmp/` in each (private caches, the stages' scratch, harness caches); the base build 275M (`du -sh` of each folder, now). Already standing when it started: the main tree's `tmp/`, 2.1G to 2.5G of earlier gates' and gathers' scratch; `/root/.cache`'s pip and uv caches, 3.5G; the git object store, 3.3G, 41 packs and 509 MiB of loose objects (`git count-objects -vH` at 10:48); `fortress-transcripts-blinded`, 3.7G; two test worktrees of the record tools, 354M; `/tmp/claude-0`, 1.5G; `/root/.claude`, 2.4G (the coordinator's `du` at 10:48 and the first gate's result).
- **When it ran out.** No `df` was taken at the launch; the coordinator's last before it read 5.3G free at 18:39 on 11-06 (`disk.py` on its transcript). The run's first `df` is rung I's, 416M at 08:08. Rung A's first distance run died at 08:32 ('No space left on device', 23M); rung T could not make its worktree at 08:38:04 ("cannot create directory … No space left on device"); every call of rung S failed at 08:38:56 ("Disk full … 0 MB free"); skeptic N's transcript, made at 08:40:03, stayed empty. From then to 10:45 the disk stayed between 31M and 443M free.
- **What it cost.**
  - Rungs S and T never started; N's skeptic never ran, and N landed on its judge's reading of the diff alone, "the merged tree's gate reruns the tests, the two stages and the demos" (the journal's result for `judge:N`); rung C ran neither stage, nor `ant testQuick` ('887 of 1,432 compiler-track cases failing'), nor the specification's build (C's report); skeptic A's distance run died at 09:16; the gather's first specification build died; the first gate stopped at its disk check.
  - About 0.42M of launches that could do nothing: rungs S and T and their skeptics, judges and repair launch 216K, N's judge 109K, the first gate 98K.
  - **The journal lost records.** Line 20 of `journal.jsonl` holds rung S's result cut short ("… and REPORT.md and ") with rung C's result run on after it, so it does not parse; no line holds the `started` records of the skeptics of N and E or the result of N's skeptic. So `journal-text.py` found 'no result of skeptic:N carries skepticText' (the gather, 09:38:35), and `rung-number-open/SKEPTIC.md` does not exist. A resume of the run from this journal would meet the broken line.
- **How the coordinator freed it**, between 10:45 and 10:52: the two test worktrees `record-test-p` and `record-test-q` (354M, to 633M free); the pip and uv caches (3.5G, to 4.1G free); `git repack -a -d`, 3.3G to 1.63 GiB in one pack (5.6G free at 10:52). The gate after the repair started at 5.5G free.
- **How the next batch can keep room.** The launch's check reads Avail against what this batch used, about 0.65G a rung (1.1G where `ant testQuick` runs) and about 1G for the gather and the gate, so about 8G for ten rungs, not the record's 206M a rung; a worker removes its `ProjectFortress/test-caches` once `ant testQuick` has passed and its stage scratch once its tables are written; before the launch, the main tree's old `tmp/gate-batch-*` and `tmp/gather/` scratch, the pip and uv caches and loose git objects are cleared, and `df -h /` is written to the boot note; the script checks Avail before it seeds each worktree, and leaves a rung unstarted under a floor, with a result that says so, rather than launch agents that cannot work (process finding 2).

**3. The relayed user request.**
- **How it reached the agents.** Every agent of the run but the two whose first records were lost opens with a harness message of its own (`relay.py`: 29 of 31 transcripts), before its computed task:

      [Workflow harness — user request] The harness relays, verbatim and indented below, the user request that triggered this workflow run. This relayed request is the only user voice in this task; … Where the computed task conflicts with this request, this request wins:
        "A session in this cloud container cannot delete a branch on GitHub" — not “this” but “a”, for fuck’s sake!!!

  That line is the curator's chat message of 06:31:55, sent while the coordinator's turn ran: the session queued it as a human turn and absorbed it into the running turn at 06:33:03 (`queue-operation` 'absorbed_mid_turn'; its attachment `humanTurn: true`, `origin: human`). The coordinator called `Workflow` in that same turn at 06:34:48. The harness relays the latest human message of the turn that calls `Workflow`, a mid-turn one included. A run launched in a turn whose latest input is an agent's notification relays nothing: climb batch 26's run (launched at 20:16:37 on 11-05 in a turn opened by a task notification) and its record-landing run (23:29:22) open with the computed task alone, while the ledger-pass runs of 11-06, launched in turns after his messages, carry a relayed request (the first message of each run's first transcript; the coordinating session's records before each call).
  - So the relay is the harness's, not the script's, and the coordinator cannot word it. It can only choose the turn in which it launches.
- **What it cost them.** 12 search calls in 9 agents for the quoted sentence, about 43K characters of results, about 18K tokens, 0.4 % of the run: rung N twice at 06:35, right after it loaded the skill and before it made its worktree; the skeptics of E, W and C; N's judge, 14.6K characters; the gather; the review three times, 15.7K; the repair; the commit. Eleven agents filed an item on it, which the gather put into one PLAN entry (`PLAN.md:693`): N.worker.1, N.skeptic.2, N.judge.3, W.worker.3, S.worker.2, S.judge.3, E.worker.1, E.skeptic.1, G.worker.2, G.skeptic.3, gather.4. They read it three ways: N's worker as "a cloud container, not this one"; N's skeptic and N's judge as already right ("The worker's 'a cloud container, not this one' misreads it", the judge's result); the review as "this" made "a", the curator's meaning. The review then edited the coordinator's held list on it (`ecccddeab`, `HELD.md:43`, `:132`), which during a batch the coordinator keeps in its scratchpad's `held-in-batch.md` (`coordinator`, `references/batch.md:78` before `bd7efb95b`), and the review's judge ruled on the reading. No agent changed its rung's work for it.

**4. Commit footers.** Of the 25 commits since the base, 24 end with `fortress-repo`'s two lines exactly; `b9635f0a7`, the judge's ruling, ends 'Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>' (a check of each message's last two lines). None names a model identifier. On the `wip/` branches, which reach `main` only as the gather's patches, rung I's four commits (`c17db57e0`, `e46dd6f40`, `baa3a18fb`, `3a8f0ea01`) and skeptic C's two (`bcaf61e27`, `2f864ab0b`) carry the same line, and are on `origin` with their branches.
- The line breaks `committing.md`'s "End every commit message with this footer, exactly, whatever footer Claude Code suggests", and his decision of 05:1x on 11-07, "the plain footer stays … no model name" (`HELD.md:32`).
- **The commit stage saw it** and named it in its result: "b9635f0a7 (the judge's ruling) ends 'Co-Authored-By: Claude Opus 5.5 …' instead of the skill's … That is a tier name, not an identifier. I did not rewrite it, since it is not the tip and not mine."
- **Why it did not stop it.** The stage's step 2 asks that each commit "ends with the skill's two footer lines, none holds a model identifier" (`climb-batch-workflow.js:2139`) and gives no action for a commit that fails, and its result has no field for it, so the script held nothing; the stage read the line against the skill's identifier rule (`committing.md`, "Name a model by its tier … Never write its model identifier"), which a tier name passes, not against "exactly" and his decision; and a rewrite of a commit below the tip is a rebase that no brief allows.
- **Why it was written.** The judge's brief says "commit it locally on main with the skill's footer" (`climb-batch-workflow.js:1515`) without the lines. The judge loaded the skill and read `revival-changes.md`, but not `committing.md` (its 15 calls), and wrote the line that the harness's attribution reminder gives.

**5. The coordinator's commits since the base,** not rung work and not judged as such: `16629cfa0` (06:27:31, `BOOT.md`), `1090f1ecf` (06:29:47) and `85ca6c272` (06:32:53, the branch-deletion refusal stated once, in `cloud-container`, `coordinator` and `fortress-repo`'s `committing.md`, with their `sources.md`), `ad55f5f00` (06:34:31, `BOOT.md`), all before the launch; `9cb72aca5` (07:21:35), `8937a5af0` (07:31:33) and `66bac4fd9` (07:32:16, the `coordinator` skill: what a batch takes, the main tree while a batch runs, the held file renamed); `87e713bad` (07:39:50, `BOOT.md` and `HELD.md`); `bd7efb95b` (10:39:49, `coordinator`'s `batch.md` and `sources.md`). The commit stage's seven `skillTouched` paths are all theirs; the batch wrote no skill text (`git show --name-only` of each).
- The rule then in force let the coordinator commit there until every rung had its `started` line, the last at 08:38:56, and then "From then until the batch's push, change nothing in the main tree" (`coordinator`, `references/batch.md:78` at `bd7efb95b^`). The commits to `87e713bad` kept it and were pushed. **`bd7efb95b` did not:** the skill writer's headless task (10:39:26 to 10:39:55) committed it in the main tree between the judge's ruling and the repair, and it stays unpushed, so the batch's push will carry it. It changed no path the batch reads. The new text keeps the same window, "From the gather's start until the batch's push, change nothing there".

**6. The distance's two crash rows** (the coordinator's added point).
- **The declaration** at `FortressBuiltin.fss:661-773` on the merged tree is `value object Char` (611 to 723 at the base). The stage's log (`tmp/gate-batch-27/distance/run.txt:762-768`) gives 'java.base/java.util.TimSort.mergeLo(TimSort.java:781)', `mergeAt`, `mergeForceCollapse`, `TimSort.sort`, `Arrays.sort` and 'scala.collection.SeqOps.sorted(Seq.scala:728)'; the probe keeps six frames, so the checker's caller is not printed. The checker sorts by a partial order in four places: a call's candidates by `moreSpecific` (`scala_src/typechecker/impls/Functionals.scala:728`, `:761`), coercion candidates (`CoercionOracle.scala:255`) and a trait's ancestors (`Formula.scala:609`). Java's TimSort merges, and so can raise this, only on 32 or more elements, so some call or coercion in `Char`'s body met 32 or more candidates. The second row follows from the first: the abandoned declaration leaves inference nodes, which the check at `compiler/StaticChecker.java:264` reports.
- **Which rung.** Not measured; by the tables and by reading:
  - No rung's own run shows it: N (06:51, `#total 2`), E, F, W, I and A all read `#crash none` on their trees (their `distance-postedit.txt`).
  - G ran neither stage, and needed none: its diff outside `explorations/` is `CodeGen.java` and tests, which the distance does not run.
  - C ran neither, for the disk, and is the only rung whose change lies inside the crashing declaration: `asExprString`'s binding moved from the glue class `Char$ToExprString` (`FortressBuiltin.fss:615` at the base), which the stage does not read as a helper, onto `simpleChar.charToExprString` (`:665`), with a new parser rule (`Literal.rats:460-466`).
  - No skeptic and not the gather ran a stage.
  - N gave `=` 13 more declarations in `FortressBuiltin` and 28 more in `FortressLibrary` (19 and 59, against 6 and 31 at the base; `grep -c` at each branch), and `Char`'s body calls `=` (`x = -1`, `self = 'X'`); with the same set on N's own tree the stage read no crash.
  - So the first measured tree is the merged one, and the cause is C's binding, or C's binding with another rung's lines; which, two runs would tell (finding A). A node's hash starts from its class's name (`fortress-repo`, `compiler.md`, "The checker's results"), so the order, and the crash, likely repeat on this tree; by reading only.
- **It hides errors from the zero.** The stage catches a crash per declaration and goes on (`tools/distance/shadow-patch.py:134`), so the later stages ran, 'errors=0' each, but the type check of `Char`'s declaration did not finish: an error in its 113 lines past the throw is not counted. C's moved binding, which P-58 has the checker check from the step that moves it, has so far no completed check against its helper.
- **Who saw it, and why nothing flagged it.** The gate saw both rows and named them, "The distance stage is never red … The Char crash is a sort-comparator exception, so it may be intermittent, which is why the curator may want to look at it", and returned green; the commit stage named F-54 false. Nothing could turn it red: the gate's step 9 has the distance "reported and never red, whatever it prints" (`climb-batch-workflow.js:1939`; P-39), while an undeclared crash is red only from the count (F-66), which checks the `FortressLibrary` component alone (F-53), so no stage that can be red reads the `FortressBuiltin` component. The gather runs no stage by its brief; the review ran beside the first gate, which stopped before its distance; and the script's hold reads only the rungs' points. The skill says that a rung that changes what the stages read runs them (`coordinator`, `references/batch.md`, "The checker count and the distance"); C could not.
- **F-53 and F-54 as the gather left them** (`0feb3bba7`): both named climb batch 26's gate and were true of it. The commit stage's fold (`29e52a3dc`) moved F-53's title to "At the last landed gate, climb batch 27's", so F-54's "That gate's `distance.txt` reads `#crash none`" is now false. F-53 holds what the table reads, 0 and 0, but not that the zero covers `Char`, and its "last landed" is not yet true while the push is held. F-281's title ("the distance and the count are 0, with no crash") and F-288's "the stage reads '#total 0', '#crash none'" are false now too. F-54's `#class` rows have been absent since climb batch 24's gate at least (`grep -c '^#class'`: 0 at 24 to 27), an older slip.
- **A reason to hold the push?** Not by the record: the distance only reports (P-39), and the crash is reversible. But once pushed, this table is the next batch's before: a rung that leaves the crash shows nothing, and a later crash in the same declaration does not show as new. So a row should hold it, before or with the push (finding A).

## Part 1. Conformance

### Method

As in `reviews/batch-26-review.md`. For each rung I read its commit on `main` and its diff against the base, its `REPORT.md` and `SKEPTIC.md` where they bear, the record's section for it (`CLIMB-BATCH-27.md`, sections 1 and 4) and its forks (section 3), the gather's `RECORD.md` with its "Revival changes, for the skill writer", the judges' and the repair's files, the run's journal results, and the code and the specification on `main`. Three standards, kept apart: the specification; the library's own way (P-27), and for compiler and interpreter code the team's code beside it; and the decisions on record, P-58, P-79, P-160 and P-162 to P-168 (`facts-extract.sh`), with the forks' defaults as the record states them and the facts the batch built (F-323 to F-330). Where the batch's own record and the tree disagree, the tree rules, and I say so. I ran nothing of the tree; what is "by reading" is marked.

### The verdicts

- **Rung F, the floats' natives (P-162, P-165): in the spirit,** with split 7.
- **Rung N, `Number` opened and emptied (P-160's second step, P-165): in the spirit,** with splits 2 and 3; checked by no skeptic.
- **Rung G, `asif` in the code generator (row 818): in the spirit,** with split 6.
- **Rung E, what `SEQV` means (P-168, P-166): in the spirit,** with split 5.
- **Rung I, the integers' shifts and powers (P-162, P-58): in the spirit,** with split 8.
- **Rung A, the carrier of `Any` (P-167): in the spirit,** with split 4.
- **Rung C, `Char`'s `asExprString` (P-163): in the spirit, its check by the stages not done,** with splits 9 and 10.
- **Rung W, N4's writer rung (P-164): in part:** `FileWriteStream` stays native, with split 1.
- **The repair after the merged-diff review (P-79): in the spirit,** with split 3.
- **Rulings:** the judge of N, "stands" on its skeptic's refusal for the disk; the judges of S ("repair", which could not run) and T ("stop"); the review's judge, "repair", way (b). Every skeptic that checked approved, with one defect fix (G) and corrections; nothing contested.

### Where the text, the brief or the principles split

**1. `FileWriteStream` stays on its glue (rung W; row 926).** P-164 has "the five I/O objects become plain Fortress objects", the writer side, "with `stdOut`", first; the record's rung W listed `FileWriteStream` among its objects (`CLIMB-BATCH-27.md`, rung W). Walk builds every object of a `native component` through a glue class of its name (`interpreter/env/CUWrapper.java:122`, `BuildNativeEnvironment.java:99-150`), so `FileWriteStream` cannot hold its Java writer in a field while `File` stays native; W left its 5 bindings and fork W5 to the reader rung, and the count landed at 341 of 443, not the brief's 341 of 438. W.worker.1 and W.skeptic.1, PLAN item 69. No default on record.

**2. N landed with no skeptic (rung N).** Its skeptic's transcript is empty and its result is in no journal line (section 7, point 2); its judge read the diff and let the rung stand, leaning on the merged tree's gate for "the tests, the two stages and the demos" (the judge's result). The demos then stopped on N's change (split 3), and the merged tree's distance crashed in another rung's declaration (split 10). N's own stages and suites ran: count 1 and distance 2 at F's two sites, 'OK (63 tests)' for `ReflectiveQuickCheckTest` (its report). N's reserved point, `CoercionOverloadRungC` refused after at the Meet Rule, was respelled (N.judge.2, `PLAN.md:683`). Default: as landed.

**3. `turnersParaffins0` and P-79 (rung N, the repair).** N's pairs of `=` made `ZZ32`'s `=` overloaded (`Library/FortressLibrary.fss:776-780`), and walk could not call an overloaded method on an assumed receiver (row 921), so the demo, which writes `0 asif ZZ32` (`ProjectFortress/demos/turnersParaffins0.fss:403-408`), stopped. The judge took P-79's "made to run again once the feature is built" over a respelling of a correct demo, and the repair built the feature in walk (`DottedMethodApplication.java:96-97`, `:119-138`) by the specification's reading of a type assumption (`type-annotation.tex:42-53`). Row 919 stays open: under walk the assumption outlives its call inside the varargs tuples of `Map.fsi:100`, since `NonPrimitive.java:117-126` strips only top-level arguments (judge.1, `PLAN.md:694`). Default: as landed.

**4. `match` over any `String` (rung A).** The coordinator's rider of 2026-11-07 added an overload of `match` over `String` (`Library/FortressLibrary.fss:4718-4722`), outside P-167's three natives, which closes row 916; in the library's `typecase` form of F-299. Default: as landed, on the record as the rider (`RECORD.md`, rung A's provenance).

**5. Strings as reference objects (rung E).** By P-168 two strings of one text built apart are not `SEQV`, so a value with no `=` of its own that holds a string, a tuple of four or more or a value object, is not `=` to an equal one built apart (E's revival change; row 923, the tuples of four or more). P-168 says so; the consequence is named and has its row. Default: as landed.

**6. The partial call and the generic forms (rung G).** A dispatched call with only some arguments under an assumption is refused, 'Can't compile a dispatched call whose arguments are not all type assumptions', and the generic method and the overloaded generic function under an assumption are refused with their own messages (skeptic G's defect fix `dad6b664d`); the specification reads them all. Items 71 and 72.

**7. Values that move under walk (rung F).** `printThreadInfo(3)` prints `3.0`; a `QQ`, `ZZ64`, `NN32`, `NN64` or `ZZ` argument of `random`, `atan2` or `Float`'s `^` at a non-integer exponent is refused at the call; `flatConcat` past U+FFFF keeps the low 16 bits (F's points). P-165 gives the first two ("the program writes the conversion"); the third is row 915's. Default: as landed.

**8. Ten helpers, and the narrow exponents (rung I).** I wrote ten new helpers, not the plan's nine, and gave `NN32`'s and `NN64`'s powers a `ZZ32` exponent, not the prelude's own type, so that a signed exponent reaches the helper's test of its sign (I.worker.1 and I.worker.2, `PLAN.md:684`, told). Every value of the walk guard is the glue's. Default: as landed.

**9. The parser's two new gaps (rung C; rows 924, 925).** A character past U+FFFF written as itself is refused, and eleven of the parser's own short names, as `'BETA'`, are refused as character literals (C.worker.1 and C.skeptic.2, `PLAN.md:685-686`). Default: as landed.

**10. C's binding without a completed check (rung C; by reading).** P-58 has the compiled checker check a moved binding from the step that moves it. C ran neither stage for the disk, and the gate's distance crashed in the declaration that holds C's binding (section 7, point 6). The binding's helper signature is the base's, `charToExprString(int)`, beside 40 bindings of `Char` already on `simpleChar` (`git show ed8652dc0:…/simpleChar.java`; the base's `FortressBuiltin.fss:611-723`), so its check is likely clean, but no run shows it. Finding A.

### The rungs, briefly

**Rung F, `e4872ad93`.** Ten bindings off glue onto eight new helpers and one existing, the four over `Number` declared at `RR64`, `Float`'s `^` at `Number` gone (`Library/FortressLibrary.fss:462`, `:471`, `:4639`, `:4740`; `FortressBuiltin.fss:180`), `FlatString`'s `=` and `flatConcat` at a `Char` on one-line helpers (`Library/FlatString.fss:70-71`, `:96-97`). Standard 1: silent on the natives. Standard 2: the team's 2008 move of the conversion into Fortress, at the prelude's narrow headers (`CompilerBuiltin.fss:981`, `:1629`). Standard 3: P-162's group 3 and its four, P-165's `RR64` headers; the tests seen failing first, 'Tests run: 2,  Failures: 2', then 'OK (6 tests)'; count and distance 0.

**Rung N, `a97d60dc6`.** `Number` declares nothing (`Library/FortressLibrary.fss:380-381`, `.fsi:288`); nine `asFloat` api lines; 21 coercions each a pair of `=`; the norm at eight types (`:2653-2660`); the reflective generator's fixed choice (`Library/ReflectiveQuickCheck.fss:33-42`); the specification's sentence and an Appendix I entry (`Specification/basic-lib/numbers.tex:46-54`; `changes.tex:2737-2800`). Standard 1: the specification gives `Number` no clause and grounds no `asFloat` on it (P-165's why). Standard 2: the team's compiler prelude's `Number`, with nothing in it (`CompilerBuiltin.fss:510-511`). Standard 3: P-160's second step and P-165 whole; split 2.

**Rung G, `8caa399e8`.** The code generator compiles a type assumption at a receiver (the assumed trait's static body), at a call whose every dispatched argument is an assumption, and as a value (`CodeGen.java:6407-6592` and the sites in N's points), the partial call and the generic forms refused. Standard 1: `type-annotation.tex`, "Type Assumption". Standard 2: the team's own `Compiled80.fss:15` waited on it, and the library writes 21 lines of `asif` (`grep -c ' asif ' Library/*.fss`). Standard 3: row 818 narrowed; forks G1 to G3; rows 919 to 922 file walk's departures with `XXX` tests.

**Rung E, `598331c0d`.** Walk's `seqv` in eleven value classes and `FTypeObject` by the rule, the compiled `equality.sEquiv` with the code generator's value mark (`CodeGen.java:4522-4529`), `Ratio`, `IntLiteral` and `FloatLiteral` declared `value`, the lists of `objects.tex:39-63` revised with entry `revival-object-kinds` (`changes.tex:3935-4017`). Standard 1: `objects.tex:433-454` read as written. Standard 2: the library's own `value` declarations. Standard 3: P-168 and P-166, the `CC64` test on both paths (`tests/ValueObjectCC64Walk.fss`, `compiler_tests/StrictEquivalenceRuleCompiled.fss`); rows 113 and 906 to 911 closed but 908, narrowed to the prelude.

**Rung I, `0122a399a`.** The 16 shifts and powers over `AnyIntegral` convert in Fortress and call public bare bindings at narrow headers on five existing and ten new helpers (`Library/FortressLibrary.fsi:537-543`, `:601-607`, `:670-676`, `:735-747`; `FortressBuiltin.fsi:172-178`). Standard 2: the prelude's narrow headers (`CompilerBuiltin.fss:736-737`, `:647-648`, `:744`, `:809`, `:878`). Standard 3: P-162 with P-58, P-69 and P-153; split 8.

**Rung A, `5ae581c4a`.** `ilkName` on `stringOps.typeName` and `SEQV` on `equality.sEquiv`, which walk's loader answers from its table (`NativeApp.java:41-53`, `:209-210`); `asString` as `self.ilkName` (`FortressBuiltin.fss:40`); the ilk printed by the trait, `ZZ32` for `Int`, also inside static arguments (`ObjectPrims.java:46-105`); 48 lines of two tests respelled. Standard 3: P-167 at options (c) and (e1); P-58's walk half bent for the two names, as P-167 says; split 4.

**Rung C, `fc860b655`.** `simpleChar.charToExprString` completed (`simpleChar.java:21-48`), walk's binding moved onto it (`FortressBuiltin.fss:665`), the parser's choices of hexadecimal digits longer first (`Literal.rats:460-466`), the list of character-literal forms revised with an Appendix I entry (`lexical-structure.tex:867-870`, `:882-887`). Standard 2: Steele's helper and parser rule, one commit (`c2c769094`). Standard 3: P-163 whole, row 861 closed `--settled`; splits 9 and 10.

**Rung W, `c21780408`.** `JavaBufferedWriter` and `FileNotFoundException` in `FortressLibrary` (`Library/FortressLibrary.fsi:1251-1271`), walk's carrier by name (`StaticNativeApp.java`), the checker's two table entries (`NamingCzar.java:490-491`), `stdOut`, `stdErr`, `Writer` and `BufferedWriter` as plain objects over `fileOps` helpers (`Library/FortressLibrary.fss:1878-1897`; `fileOps.java:86-94`). Standard 2: the team's later `BirdyLib` `FileReadStream`, an object over a Java-backed value in a field. Standard 3: P-164's writer side but `FileWriteStream` (split 1).

**The repair, `4445d848b` and `151cb4126`.** Walk's dotted call on an assumed receiver gathers the assumed trait's overloads into an `OverloadedMethod` and chooses among them at the assumed types; the `FObject` branch and the not-found error unchanged; no wrapper stripped. Test first ('Tests run: 1,  Failures: 1', then 'OK (5 tests)'); the demos 52 of 52. Standard 1: `type-annotation.tex:42-53`. Standard 3: P-79; split 3.

**The specification's revisions:** N's sentence on `asFloat` and its entry, E's lists and their entry, C's list and its entry, and the natives effect revised to the merged count by the gather (`changes.tex:4625-4658`), each in the revision form (P-95, P-96) with the original kept; built once on the last text, 'BUILD SUCCESSFUL' twice and no warning (`RECORD.md`, "The tests on the merged tree").

### The decisions consequential for him, and the readings he has not confirmed

The record put one question to him, Question 1, the scope, at its default (a), ten rungs; his go was given in advance, "pre-approved for launch after Fable review" (his message of 05:54 on 11-07). Eight landed; S and T did not run, for the disk, and item 68 asks what becomes of them. W moved fork W5 with `FileWriteStream` to the reader rung (split 1); I did not check each of the other forks' landings against its default one by one, and the rungs' reports and the gather's record name no other departure.

The results that stand on a reading he has not confirmed:
- **The distance's 0** does not cover `value object Char` (split 10; finding A).
- **N's landing** rests on its judge's reading of the diff, with no skeptic (split 2).
- **Row 919 open** after the repair: walk's assumption outlives its call (judge.1, told).

### The global questions

- **Promised against landed.** Eight of ten rungs: `Number` opened, `SEQV` by the rule, the carrier of `Any`, `asif` compiled, the integers' 16 and the floats' ten, `Char`'s text, the writer objects but `FileWriteStream`; 14 rows closed. Not landed: S (`System`'s two onto `stringOps`, row 895) and T (row 733). Beyond the plan: rows 918 to 928, the repair of row 921.
- **The record's premises that failed:** the disk's room (206M a worktree, section 7, point 2); `FileWriteStream` plain while `File` is native (split 1); "about 9 new helpers" (split 8); the manifest's order (gather.1); the cost and time; and the gather's "None holds the push".
- **Built twice: nothing.** Seven files are shared by two or more rungs, each rung at its own declarations (`RECORD.md`, "The rungs applied"); no conflict.
- **The library's way: yes for each,** with the team's own pairs, headers and forms as above.
- **Together.** N's pairs of `=` and walk's dotted dispatch on an assumption met in a team demo (split 3), which the gather's demos caught and the repair cured. Whether C's binding and another rung's lines meet in the checker's sort is the open question of split 10.

### Findings

Sorted by what each needs.

**Findings that would change a decision of his, with options:**

A. **The distance's two new crash rows, before the push, and P-39's report-only distance** (section 7, point 6; split 10). The zero does not cover `Char`'s declaration, the stage that could show a crash there can never be red, and a push makes this table the next batch's before.
   - (a) Push now. File a row with `ledger.py add`, "the compiled checker over the one library crashes in `Comparison method violates its general contract!` while it types `value object Char`", and correct F-53, F-54, F-281 and F-288 in the routing; the next batch's first rung that touches `FortressBuiltin` measures it. Cost: none now; the zero stands without `Char` for a batch.
   - (b) Before the push, run the distance stage twice, each about 3 to 4 minutes with its build (F-240): on rung C's head in its kept worktree, and again on the merged tree, so the row names its rung and whether it repeats; then (a). Cost: about 10 minutes of machine time and one stage's scratch.
   - (c) Hold the push until a rung fixes the crash. Cost: the eight rungs wait a batch.
   - And for later gates: (i) keep the distance report-only, as P-39 has it; or (ii) make a crash that no rung declared red in the distance as in the count (F-66), a change of P-39 and of the gate's step 9.

   Default, the record's: (a) with (i). Proposed (mine): (b), then (a); (ii) at the next change of the script, since the `FortressBuiltin` component is read by the distance alone. Each can be undone.

B. **`b9635f0a7`'s footer against his decision of 11-07** (`HELD.md:32`, "no model name"; section 7, point 4).
   - (a) Push as is, and record the slip with the batch. Cost: one commit on `origin` with "Claude Opus 5.5"; rung I's four and skeptic C's two are on `origin` already, on their `wip/` branches.
   - (b) Reword it before the push: rewrite the message of `b9635f0a7` and replay its five descendants without an interactive rebase (`git filter-branch --msg-filter` or `git rebase --exec` over `b9635f0a7^..main`). Cost: six new hashes (`b9635f0a7` and its five descendants, `bd7efb95b`, `4445d848b`, `151cb4126`, `29e52a3dc`, `a2f0b5cf2`), and every citation of them rewritten: `RECORD.md`, `REPAIR-review.md`, row 921's close in the ledger and its history, and `FACTS-history.md` (`grep -rl` over `explorations/`), with this review.

   Default: none on record for a slip found before a push. Proposed (mine): (a), with process finding 5 so that it does not recur.

**Corrections, reasons in the record that the landing made false:**

C. F-54's "That gate's `distance.txt` reads `#crash none`", F-281's title and F-288's "the stage reads '#total 0', '#crash none'"; F-53's "the last landed gate, climb batch 27's", true only after the push, and its zero, without `Char`'s body (section 7, point 6). Home: the record-landing workflow, by `record.py`.

D. F-32's 143 and F-299's 306 of 449, now 102 and 341 of 443 by the gather's count, with F-57, F-34, F-308, F-131, F-151, F-311, F-318 and F-321 (gather.3, `PLAN.md:696`). Home: the same.

E. PLAN's "Where we stand" against F-53: "The live thread" names climb batch 26's gate as the last landed and 306 of 449; "Landed" ends at climb batch 26; "Next" names the batch after 26 as not yet planned (`PLAN.md:9-12`). Home: the routing, after the push.

F. The record's disk estimate, "about 206 MB each" (`CLIMB-BATCH-27.md`, section 6, "Before the launch", 5): a worktree grew to 0.3G to 1.1G (section 7, point 2). Home: the manual's "Before the launch" and the next record.

G. `RECORD.md`'s "None holds the push", written before the review held it; the review's corrections and the repair did not change that sentence. Home: a note in the record, with the routing.

**Corrections of an entry's ground that change no decision, for the entries' histories:**
- F-240's two sentences that the commit stage named, and the count stage's fall to about 80 s, with no measured cause.
- The code generator's count over the fourteen (F-34) was not measured on the merged tree.
- `rung-number-open/SKEPTIC.md` does not exist: no journal line holds N's skeptic's text.

**Confirmations:**
- The count's table equals climb batch 26's byte for byte; the distance's `#total 0`, every `#kind` 0.
- microGPT's quick pair: 7 of 7 for both programs.
- The 52 demos reached their end on the repaired tree.
- `ledger.py landing-check` and `record.py check`: no finding, 0 failures.
- The suites: 1,447 compiled, 778 walk, 130 specification examples, 0 failures; 42 of 42 atomic runs.

## Part 2. Did the practice hold

### The skeptics' fixes

From the journal's results and each branch: 9 fix commits, one a defect, none contested.

| Rung | Fix commits | Defects of the change | Test first, from the record's points |
|---|---|---|---|
| F | `0cb8f625d` (the brackets' guards gain the infinities), `a3b932fc4` (row 897's three defects, row 915's site, the helper's lines) | 0 | 'Tests run: 2,  Failures: 2' ('names no static helper … doublePowFloat'), then 'OK (6 tests)' |
| N | none: its skeptic did not run | not checked | `NumberEqualityOwnTypeWalk` FAIL on the base, OK after; `ReflectiveQuickCheckTest` 'Stack overflow …' then 'OK (63 tests)' |
| G | `dad6b664d` (the assumption dropped where a call carries static arguments; the generic forms refused), `60c468612` (row 818's line, NEW-G-4) | 1 | 'Tests run: 5,  Failures: 4', then 'OK (5 tests)' |
| E | `623277683` (the Effect of `revival-object-kinds`) | 0 | 'Tests run: 4,  Failures: 3' and 'FAIL:  two ZZ32 3s', then 'OK (4 tests)' |
| I | `ac7dedc08` (record.md's finding 5) | 0 | 'FAILURES!!! Tests run: 2, Failures: 2', then 'OK (2 tests)' |
| A | `84135bf0e` (the test's citations, the report's lines) | 0 | 'Tests run: 3, Failures: 3', then 'OK (4 tests)' |
| C | `bcaf61e27` (four citations, F-308's counts, NEW-C-2) | 0 | "FAIL: J7/0:'\'05'' =/= J6/0:'0005'", 'Tests run: 2,  Failures: 2', then 'OK (3 tests)' |
| W | `1f34e66e3` (three corrections; NEW-W-3) | 0 | 'FileNotFoundException is undefined.', then 'OK (1 test)' |

- Against the batches before: 26 made 2 with 0 defects, 25 7 with 0, 24 18 with 0, 23 4 with 0, 22c 14 with 1.
- The skeptics found three of the eleven new rows (922, 925, 928) and G's defect. G's is the first defect of a change that a skeptic fixed since climb batch 22c.
- I read the order of test and fix from the record's points and the skeptics' verdicts, not from the transcripts' times.

### The merged-diff review

- **Not approved**, one blocking finding with three ways and `holdsPush` true, which the judge took; seven corrections in `ecccddeab`.
- It did not name: the distance's crash rows, which it could not see, the first gate having stopped before its distance; the footer of `b9635f0a7`, made after it ended; the stale F-32 and F-299, which gather.3 named; C's unrun stages, which `RECORD.md` named as left to the gate.
- It edited the coordinator's held list on the relayed request (section 7, point 3).
- Cost: 271K beside the first gate, 10.7 minutes.

### Builds and runs, repeated or not

- **Builds:** one per code state but rung I's two, each on record, and rung W's two builds 82 s apart (07:17:40 and 07:19:02), the second after an edit (`runs.py`). The repair built once; the second gate built in 3 s and ran the library order.
- **Suites:** every rung but C ran `ant testSystem` once on its final code; E, F, W and I ran `ant testQuick` (I twice, on its two code states); C's `ant testQuick` died on the disk and was left to the gate; no skeptic and not the gather ran a whole suite. The repair ran no `ant testSystem`, which the gate after it ran.
- **The stages:** N, E, F, W, I and A ran both, I on its two code states, A's distance twice (the first dead on the disk); G and C none; no skeptic; the gather none, by its brief; the second gate once each.
- **The demos:** the gather once, 51 of 52; the repair twice, 51 (a random stop of `Generator2Demo`) and 52.
- **The specification:** N, E and C in their trees where the disk let them (C not); the gather twice, the first dead on the disk; the commit stage copied the gather's PDF.
- **Walk old against new:** each skeptic's own programs against the base build `/home/user/fortress-base27`, as their verdicts give.

### Refusals by the harness and the tools

- **No permission refusal, no `sleep` refused** (`errs.py`: 29 error results, of which 10 are a `wait_for` cap of 240 s, one the disk, rung T's 'unable to write file', and the rest a test, a probe or a tool that failed as its caller expected, such as `ledger.py check` on a placeholder row; rung S's calls, all refused for the disk, are in records that do not parse).
- **Rows refused for length:** the repair's note to row 919, 'does not fit; with it the notes have -76 characters left of 700' (10:45:50); it went in shorter.
- **One structured result refused for its schema** (skeptic F's `fixes[1].kind`, 09:00:33), given again.
- **One `git rm --cached` of the gather refused** ('staged content different from both the file and the HEAD', 09:45:10), done again.

### The commit stage's fold of FACTS

It changed F-53's title from climb batch 26's to 27's, kept its totals at 0, and wrote F-240's figures, the count stage about 80 s and the distance stage 144 s (90 s) at load 0.28; `record.py check --base 151cb4126` printed 0 failures (its result). It named F-240's two sentences and F-54's `#crash none` as now false, for the routing, and changed no other word. Its title move is what made F-54 false (section 7, point 6).

### The practice's measures, batches 24 to 27

| Measure | B24 | B25 | B26 | B27 |
|---|---|---|---|---|
| Written | 5.74M | 6.03M (5.58M finished) | 2.55M | 5.17M |
| Rungs landed, agents | 7, 18 | 7, 20 (18 finished) | 4, 12 | 8 of 10, 30 and one empty |
| Launches lost to restarts or the disk | 0 | 2, 0.45M, 7.4 % | 0 | 8 launches on the full disk and the first gate, 0.42M, 8.2 % |
| Per landed rung, all roles | 0.82M | 0.86M (0.80M finished) | 0.64M | 0.65M |
| First calls | 0.75M, 7 cold | 0.83M, 8 cold | 0.62M, 6 cold | 1.29M, 10 cold |
| Cache refills | 0 | 3, 1.07M, 17.7 % | 1, 94K, 3.7 % | 0 |
| Refusal cycles | 0 | 0 | 0 | 3 rungs, 231K, 4.6 %, all the disk |
| Rulings and repairs on the merged tree | 0 | 0 | 0 | 368K, 7.1 % |
| Skeptic fix commits (defects) | 18 (0) | 7 (0) | 2 (0) | 9 (1) |
| Distance | 0, 173 moved bindings checked | 0, 288 checked | 0, 304 of 306 checked | 0, with two crash rows in `FortressBuiltin`; 341 helper bindings, `Char`'s declaration unchecked |
| Count stage at the gate | about 150 s | about 160 s | about 180 s | about 80 s |
| Distance stage at the gate | 198 s | 271 s | 246 s | 144 s |
| Skill's load | 16.3 % | 11.4 % | 13.9 % | 16.0 % |
| Briefing, estimated | 4.2 % | 4.4 % | 5.2 % | 6.2 % |
| microGPT quick pair, verdicts | 7 of 7 both | 7 of 7 both | 7 of 7 both | 7 of 7 both |

The rows of B24 to B26 are `reviews/batch-26-review.md`'s, which holds B20 to B23 too; B27's are this review's, `batch-measures.py`'s on 29 transcripts where a share is of 4.99M.

### Climb batch 26's findings, a batch later

1. The preparation's resumes after long gaps: met again, about 0.83M (section 3).
2. The gate's stacked waits and its refill: held; no refill, one wait a call.
3. The machine block's proxy line: held.
4. A briefing read in part: held; every worker read each part in its own call.
5. The commit stage's amend for the PDF's line: held; the line was in the message.
6. Row writes refused for length: met once (the repair's note to row 919).
7. The gather's walk tests run twice: held (its two runs of row 925's test are by design).
8. A count run before the last code change: held; rung I ran both stages again after its last change.

### Process findings

Numbered for the coordinator, who improves the batch script and the practice from them between batches.

1. **A chat message of the curator's became every agent's binding user request.** The harness relays the latest human message of the turn that calls `Workflow`, a mid-turn one included, as "the only user voice in this task … this request wins" (section 7, point 3). It cost little this time, about 18K tokens and eleven items, but it reached 29 agents, a judge ruled on it, and the review edited the coordinator's held list on it. A launch in a turn that an agent's notification or a check-in opens relays nothing (climb batch 26's). Proposed (mine): the coordinator calls `Workflow` only in a turn whose latest human message is the go itself, or else from a `send_later` check-in turn, which a mid-turn message cannot enter before the call; and the scripts' briefs name the relayed request as out of the batch's scope unless it names the batch. Home: the `coordinator` skill's `references/batch.md`, "The go"; the script's `MAIN_TREE_ROLE` and rung briefs.
2. **The disk ran out mid-run, and the script launched agents that could not work.** About 0.42M went on eight launches and a gate on a full disk, and the losses in section 7, point 2. Proposed (mine): the launch's check against about 0.65G a rung and 1G for the tail, with the standing scratch cleared first and `df -h /` in the boot note; each worker deletes its `test-caches` after `ant testQuick` and its stage scratch after its tables; the script reads Avail before it seeds a worktree and leaves a rung unstarted under a floor, with a result that says so. Home: the manual's "Before the launch"; the script; the `cloud-container` skill's `machine.md:14` (Part 3).
3. **The journal broke on the full disk.** One line holds two results, one cut short; three records are missing (section 7, point 2). A resume would meet the broken line, and `journal-text.py` and `batch-measures.py` each lost an agent. Proposed (mine): finding 2's floor prevents it; `batch-measures.py` takes a label from the journal, or from the transcript's own first message, where the meta file is missing, as this review's `labels.py` does. Home: the tools.
4. **A new crash in the distance turned nothing red, and nothing between rung C and the gate ran the stage** (section 7, point 6). Finding A holds the choice. For the coordinator: the gate's result names a new crash in a field that the script reads, so that the commit stage lists it among the points for his look before the push, whatever P-39 decides; and a rung that changes what the stages read and could not run them leaves them to its skeptic, not to the gate. Home: the script's gate and skeptic briefs.
5. **A judge wrote the harness's footer, and the commit stage could only report it.** The judge's brief says "the skill's footer" without its lines, the judge did not read `committing.md`, and the harness's attribution reminder names the tier; the commit stage's step 2 has no action and no result field for a footer that fails, and read the rule as the identifier rule (section 7, point 4). Rung I and skeptic C did the same on their branches. Proposed (mine): every brief that commits quotes the two footer lines; the commit stage returns `footerFails` (hash and line), which the script adds to the held points before the push, while a reword is still local. Home: the script.
6. **The merged-diff review edited the coordinator's held list.** Its corrections may touch `explorations/`, which holds `HELD.md` and `BOOT.md`, the coordinator's. Proposed (mine): the briefs of the batch's main-tree roles name `HELD.md`, `BOOT.md` and `held-in-batch.md` among the files no batch agent writes. Home: the script's `MAIN_TREE_ROLE`.
7. **The coordinator's skill writer committed in the main tree during the batch** (`bd7efb95b`, section 7, point 5). No harm this time; the rule stands. Proposed (mine): a skill task started while a batch runs commits to a branch or waits in the scratchpad until the push. Home: the `coordinator` skill's practice; no rule change.
8. **N landed with no skeptic.** Its judge ruled on the skeptic's refusal for the disk and let the rung stand on reading. Proposed (mine): a skeptic's refusal for the environment is retried once the floor of finding 2 holds, before a judge rules on it. Home: the script.
9. **The gather wrote "None holds the push" with a team demo stopped against P-79.** The review caught it. Proposed (mine): the gather's brief reads its demo driver's summary line against F-283 and, where it falls short, returns the point as `holdsPush`, as the review did. Home: the script's gather brief.

### Misses, by kind

Numbered on from `batch-26-review.md`'s 932.

Found inside the batch:
- **The planner's text wrong, caught before landing:**
  - 933, `FileWriteStream` plain while `File` stays native (rung W; row 926);
  - 934, the brief's 341 of 438, landed 341 of 443 (rung W);
  - 935, "about 9 new helpers", ten (I.worker.1);
  - 936, the manifest's order, which met a cycle with the shared files (gather.1).
- **A defect of a change, caught before landing:**
  - 937, G's assumption dropped where a call carries static arguments (skeptic G, `dad6b664d`);
  - 938, N's pairs of `=` with walk's row 921, which stopped `turnersParaffins0` (the gather's demos, the review, the repair `4445d848b`).
- **A test that reached too little:** 939, F's brackets' guards without the infinities (skeptic F, `0cb8f625d`).
- **A defect without its home:** 940, rows 922, 925 and 928 (the skeptics of G, C and W).
- **Sentences and citations made wrong and not listed:**
  - 941, the Effect of `revival-object-kinds` (skeptic E, `623277683`);
  - 942, citations of rungs F, A, C, I and W (`a3b932fc4`, `84135bf0e`, `bcaf61e27`, `ac7dedc08`, `1f34e66e3`);
  - 943, rung N's `revival-asfloat` effect on row 909, which rung E's code changed (the gather);
  - 944, five rows and two FACTS entries re-anchored to `main`'s lines (the review, `ecccddeab`).
- **The record's premises:** 945, the disk's room, 206M a worktree; 946, the cost and time estimates.
- **Process:**
  - 947, the full disk and its losses;
  - 948, the journal's broken line and lost records;
  - 949, the relayed request's eleven items and the review's edit of the held list;
  - 950, the footer of `b9635f0a7`, with rung I's and skeptic C's on their branches;
  - 951, the repair's note to row 919 refused for length;
  - 952, the gather's "None holds the push".

Found by this review: 953, the distance's crash rows, not flagged (section 7, point 6); 954, F-54, F-281 and F-288 made false, and F-53's "last landed" (finding C); 955, F-32 and F-299 stale on the local `main`, and PLAN's "Where we stand" against F-53 (findings D and E); 956, the commit stage's footer check, report-only and read as the identifier rule (process finding 5); 957, the relay's mechanism (process finding 1); 958, `bd7efb95b` in the batch's window (process finding 7); 959, `batch-measures.py` skipping a transcript with no meta file; 960, the preparation's resumes, 0.83M; 961, three skill sentences outside the gather's list (Part 3, 5 to 7).

**Against the earlier notes.** 20 found inside the batch (933 to 952), against 26's 17, for eight rungs against four. One fault of a change landed and was repaired inside the batch (938); one may stand in the landed tree, the crash that no run has tied to a rung (953).

## Part 3. For the skill writer

The sentences of the skills that the batch made false, from `RECORD.md`'s "Left for the coordinator and the skill writer" and the rungs' reports, each with the entry or row that now grounds the true sentence; the batch wrote no skill text (the seven `.claude/` paths since the base are the coordinator's, section 7, point 5). I read each on the local `main` at `a2f0b5cf2`. The proposed wording is mine; the writer keeps the skill's form.

**False, on the gather's list:**
1. **`fortress-repo`, `references/interpreter.md:93-96`,** "Walk carries each declared type of a helper's binding in one Java type:", whose list lacks the writer trait. Ground: F-330; P-164; rung W's report, line 120. Proposed, a new item: "`JavaBufferedWriter`, the library's trait, in `FortressBufferedWriter`, through a private native object below it;".
2. **`references/tests-writing.md:32`,** "Otherwise they compare by identity (ledger row 807).", false for a value object, which compares field by field. Ground: F-326; P-168. Proposed: "Otherwise they compare by `SEQV`: a value object field by field, any other object by identity (ledger row 807; P-168)."
3. **`references/compiler.md:62`,** "The `value` modifier has no effect on the representation.": the class now carries a mark interface, which `equality.sEquiv` reads. Ground: F-326; `CodeGen.java:4522-4529`. Proposed: "The `value` modifier gives the object's class a mark interface, which the compiled `SEQV` reads; its fields are unchanged."
4. **`references/compiler.md:36-44`, "What the compiled path cannot compile yet",** incomplete: the code generator now compiles a type assumption and refuses three of its forms. Ground: F-325; row 818 as narrowed. Proposed, after the local functions: "It compiles a type assumption `e asif T` at a dotted call's receiver, at a call whose every dispatched argument is an assumption, and as a value. It refuses a dispatched call with an assumption at only some of its arguments, 'Can't compile a dispatched call whose arguments are not all type assumptions', and a generic method or an overloaded generic function under an assumption, each with its `XXX` test (ledger row 818)."

**Incomplete, made so by the batch, not on the list:**
5. **`references/compiler.md:174`,** "The count stage takes `<out-file> <scratch>` and about 150 seconds, more under load.": about 80 s at this gate and about 180 s at the one before (F-240). Proposed: "about 80 to 180 seconds at the recent gates (F-240), more under load".
6. **`references/revival-changes.md:80`,** "but a generic instantiates at the class: `Box[\Int\]` is not `Box[\ZZ32\]` (row 364)": still true, but walk now prints the class by its trait, so the box prints `Box[\ZZ32\]` (P-167; F-328; row 364 as rewritten, "`Cell(3)` prints `Cell[\ZZ32\]` but is a `Cell[\Int\]`"). For the orientation update's section "Numbers", which also has no sentence yet for P-165's pairs of `=` or P-168's `SEQV`; F-324, F-326 and F-328 bring them to its update.
7. **`cloud-container`, `references/machine.md:14`,** "Temporary files that the work never deletes fill it. In this repository, they are mostly the parser's folders in `/tmp`.": this batch filled it with each worktree's `ProjectFortress/test-caches` (about 480M after `ant testQuick`) and `tmp/`, the main tree's `tmp/` of earlier gates, the pip and uv caches under `/root/.cache` and the git object store (section 7, point 2). For the coordinator's own skill writer, since the record-landing workflow's writer brings `fortress-repo` alone.

**A copy of the relayed sentence, for the writer:** `fortress-repo`, `references/sources.md:1072`, "since the harness refuses it from this container": 'a', not 'this', at his word of 06:31 (judge.2 of the review's judge; `PLAN.md:693`).

**Sentences that hold, met by the batch:**
- `committing.md`, "End every commit message with this footer, exactly": true, and broken by one commit (section 7, point 4).
- `session.md`'s wait cap of 240 s per call: held, one wait a call.
- `gate.md:3`, "in about 25 minutes": 17.8 minutes.
- `library.md:23`, "`ZZ64` converts into `RR64` only explicitly, by `asFloat`": true, since each number type keeps its `asFloat` (P-165).
- `SKILL.md`, "A wider type declares a `coerce` from each narrower one": true; N's pairs of `=` follow the coercions.

## Part 4. Routing

Checked against the local `main` at `a2f0b5cf2`: the gather's PLAN entries (`0feb3bba7`), the review's (`ecccddeab`), the repair's (`151cb4126`), the review queue and the ledger. The push is held, so by the `coordinator` skill's `references/batch.md`, "The landing", the routing and the record-landing workflow wait for the push; the hashes below are the local ones, which a reword (finding B) would change.

**Step by step** (the manual, "After the landing: the coordinator's routing"):
1. The landing report: after his look at findings A and B and the push.
2. The routing: not run; what it owes is the list below.
3. FACTS: the commit stage folded F-53 and F-240, the gather and the repair the rest; owed: findings C and D.
4. The skills: the record-landing workflow's skill update, with Part 3 and the gather's "Revival changes, for the skill writer" (eight sections, F to W); the orientation update on the entries the landing added or changed, F-323 to F-330, F-283, F-53 and F-240, and those that finding C and D change (`git diff ed8652dc0 a2f0b5cf2 -- explorations/coordinator/FACTS.md`; POSITIONS unchanged).
5. The next batch, after step 4.
6. This review: with the push.

### The list for the record-landing workflow, one line each with its home

**Rows the batch filed or rewrote, open:**
- Row 918 (N; the checker over the one library accepts a program trait's `+` beside the library's array operators): item 70 (`PLAN.md:146`).
- Row 919 (G, noted by the repair; walk's assumption outlives its call): judge.1 (`PLAN.md:694`), told; its fix has no line: with walk's other `asif` rows.
- Row 920 (G; walk cannot take apart a tuple under an assumption): no PLAN line; beside row 919.
- Row 922 (G's skeptic; walk stops at a generic method on an assumed receiver): no PLAN line; item 72 holds the code generator's generic forms only; a line beside it.
- Row 923 (E; a tuple of four or more compares by the fallback `SEQV`): no PLAN line; a line with the tuples' `=`, beside E.worker.2 (`PLAN.md:691`).
- Rows 924 and 925 (C; the parser's two gaps): C.worker.1 and C.skeptic.2 (`PLAN.md:685-686`).
- Row 926 (W; `FileWriteStream` native while `File` is): item 69 (`PLAN.md:142`).
- Row 927 (W; a `Char` past U+FFFF through a `Writer` keeps its low 16 bits): no PLAN line; with rows 872 and 915, the U+FFFF family (phase 4's natives line, "The families that wait on a known obstacle").
- Row 928 (W's skeptic; a program's object below `JavaBufferedWriter`): W.skeptic.4 (`PLAN.md:689`).
- Rewritten: 596 and 551 (N), 908 (E, narrowed to the prelude), with no PLAN line: 908 goes with the prelude at the switch-over (P-38), 596 and 551 with their own homes in the ledger; 818 (G): item 71; 441 and 442 (I): the integers' rung line, built (below); 321 and 364 (A): A.worker.2 (`PLAN.md:690`) and their lines at `PLAN.md:67`, `:258`, `:557`.
- **New row owed:** the distance's crash in `value object Char` (finding A), `ledger.py add`, with its tree and its two rows quoted.

**Rows closed** (434, 897, 113, 909, 910, 911, 906, 907, 861, 898, 899, 903 and 916 by `bb00aef89`; 921 by `151cb4126`): each PLAN mention, where it has one, to `PLAN-history.md` (row 921's in item 73, answered).

**Record defaults the batch took, each to a review-queue entry as climb batch 24's routing wrote them** (`review-queue.md` holds none of this batch's: `grep -n 'batch 27'` prints nothing):
- Question 1 at (a), ten rungs, at his advance go of 05:54 on 11-07; landed eight: with item 68.
- The forks of each rung at their defaults (`CLIMB-BATCH-27.md`, section 3, "Forks the batch takes, none consequential"): one entry per rung, default as landed; W5 moved with `FileWriteStream` (item 69).
- The coordinator's rider on `match` over `String`, which closed row 916: one line, default as landed.

**Items for the curator:**
- In PLAN: items 68 to 73 under "Pavol's answers" (`PLAN.md:134-148`), and the lines under "Climb batch 27, listed for his review" (`PLAN.md:679-696`), as `RECORD.md`, "Items for the curator", gives them; item 73 answered.
- Missing from PLAN: the record's "Points the batch lists for him" (`CLIMB-BATCH-27.md:597-603`: the team lines changed, what walk, the compiled path and the specification do differently); findings A and B of this review.
- The review queue's head wants this landing.

**PLAN lines the batch built or made stale:**
- "Where we stand" (`PLAN.md:9-12`): finding E.
- Phase 4 has no line for climb batch 27: one line, landed at the pushed head, with this review.
- Phase 4's lines that the batch built: P-160's second step; the curator's `CC64` stress test; the integers' rung; the floats' rung; `Char`'s rung; N4's writer rung, but `FileWriteStream`, which goes to the reader rung's line. Each to history.
- The natives line's counts (449, 143, 306) and its N1 and N2 line: 443, 102, 341.
- The code generator's line (F-34's 38 in 10 kinds): row 818 narrowed by G, the merged tree unmeasured.
- Item 64 (row 895, `System`'s two natives): stays, since rung S did not run.

**POSITIONS:**
- P-160, P-163, P-164, P-165 and P-168 state as to come what the batch built ("Then the clause is removed", "closes with `--settled` when this lands", "The writer side, with `stdOut`, moves before the reader side", "climb batch 27's rung chooses its form", "The rung's first test is a program with a `value object CC64`"). His text; the record writer under his rule of 2026-10-31, named to him. P-164's writer side stands open for `FileWriteStream` (row 926).
- P-39: finding A, (i) or (ii), is his.

**The skill sentences:** Part 3's seven and the copy at `sources.md:1072`, through the record-landing workflow's skill update; the `cloud-container` one by the coordinator's own writer.

**The manual and the script:** process findings 1 to 9, between batches.

### The steps due before the next batch

1. **His look at findings A and B, then the push** by the coordinator, by `fortress-repo`'s committing part, with this review's commit and its INDEX line, which this review does not write.
2. **The record-landing workflow** (`tools/record-landing/README.md`; `args: { batch: '27', base: 'ed8652dc0', landing: <the pushed head> }`), which routes the list above, lands, pushes and runs the orientation update and the skill update.
3. **FACTS and the ledger:** findings C and D; the crash's row.
4. **The script, between batches:** process findings 1 to 9, first the disk's (2) and the footer's (5).
5. **The next batch,** at his go of 10:4x on 11-07 for climb batch 28 after the landing chain (the coordinator's `batch27/held-in-batch.md`), with S and T as item 68 decides.

## What I did not do

- I built nothing and ran no Fortress program, suite, stage or JVM. I changed no file of the tree but this review, and committed only it.
- I read the run's transcripts through scripts (`batch-measures.py`, `skill-load.py`, `spend.py` on the three spans, and the scratch scripts of the header), the coordinating session's records around the launch and the clean-up, and the journal. For the preparation I read only the transcripts' labels and metadata, and the gaps of eight of them.
- I ran `record.py check --base ed8652dc0`, `ledger.py check` and `ledger.py landing-check ed8652dc08ecac3d713d9cc1611a1141ec9e0775` ('0 failures'; '0 fail the template'; 'no finding'), `facts-extract.sh`, `grep`, `diff`, `du`, `df` and `git`, which write nothing.
- Section 7, point 6's cause of the crash, splits 10's reading of C's binding and the crash's repeatability are by reading, not run. Which sort raised it, I could not tell from the six frames that the stage keeps.
- I did not write the review's INDEX line, which the coordinator owes with the push.

## For the curator

Climb batch 27 ran on 7 November and is committed but not pushed. Eight of its ten tasks landed. `Number` is now open and empty, so a program can declare its own number type, and two numbers of different types compare only where one converts into the other. Strict equivalence, `SEQV`, now follows the specification on both paths. The printed type of a value is its trait's name on both paths, `ZZ32` and not `Int`. The compiler now compiles type assumptions. And 35 more of the library's built-in functions now call Java methods that both paths can call, 341 of 443. The quick microGPT check passed 7 of 7 on both programs, all tests passed, and the compiler's type checker still finds no error in the library.

The script held the push because one change broke a team demo, against your rule that every demo keeps running. A repair in the interpreter fixed it, and all 52 demos run to their end again, so that reason no longer stands. Two things are for you before the push. First, the compiler's type checker now crashes, for the first time, while it checks the library's `Char` type. It still reports no error, but it never finished checking `Char`, and the stage that saw the crash is one that never fails a gate. The likely cause is the `Char` task, which could not run that check itself because the disk was full. Two short runs, about ten minutes, would show its cause before a ledger row records it; you could also push now with the row, or hold the push. Second, one commit, the judge's ruling, names "Claude Opus 5.5" in its footer, against your decision of that morning. Rewording it before the push changes six commit ids that the record cites; pushing it as it is costs one commit with that name.

The two tasks that did not land never started: the container's disk filled during the run. The rung worktrees grew to two to five times the planned size, on top of old scratch and caches. The coordinator freed 5 GB at 10:52, and the next batch needs a check of the free disk at launch and cleanup inside the run. Also, a chat message you sent at 06:31 reached every agent of the run as "the user request", because the run was launched in the same turn. It cost little, but agents spent effort on it and one edited the held list. Launching from a check-in turn avoids it.

The run wrote 5.2 million tokens in 5 h 22 min, against the plan's 6.9 million and 7 h 15 min for ten tasks. The work between the last batch's landing and this launch wrote 29.5 million tokens, 17.5 million of them for the ledger pass, the four pilot runs that rewrote the gap ledger's rows. The landing work of the last batch wrote 2.8 million.
