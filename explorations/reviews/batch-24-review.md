<!-- The combined post-batch review of climb batch 24, the batch of coordinator/CLIMB-BATCH-24.md that is phase 4's second batch of the natives (rungs F, K, Z, S, W, G and H; run wf_fe6a0ece-c70, base b0f6cd6b7, 11:10 to 16:11 UTC on 2026-10-31, 18 agents, no restart; landed and pushed at 25238e60c: rung F 5ecb7a841, rung K 71249bf55, rung Z 3308aad55, rung S ca1498628, rung W 9f65d60e2, rung G c324b841c, rung H b71495ca4, the closes 0fcc1cab6, the gather record 0ce8448a0, the merged-diff review's corrections 84ae87a27, the gate's tables 25238e60c), owed at the landing, in the form of reviews/batch-23-review.md, by a review worker reading only, against main at 453898c32 (the boot note b468b9d62 and the skill writer's first task 453898c32 came after the landing; 453898c32 is not pushed yet, origin/main is at b468b9d62). The measures are batch-measures.py's on climb batches 20 (wf_4cf8e3cb-bf5), 21 (wf_225c8ddd-913), 21b (wf_db1dda0a-97d), 22 (wf_5e692c7a-778), 22c (wf_1a894dd6-45c), 23 (wf_a81f810e-eb0) and this run, transcript-study/skill-load.py's on this run, and scratch scripts of this review's for per-agent times, briefing calls, builds, suites, stages, detached commands, refusals, compiled test steps and output tokens, in /tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/rev24/ (agents.py, brief2.py, calls.py, errs.py, runs.py, nohup.py and upto.py copied from climb batch 23's review's rev23/, and teststeps.py and tokens.py new). Tokens are writes only (input plus cache creation, one count per message id). The microGPT walk check is reported by its verdict only, at the curator's ruling of 2026-10-23. Besides reading, this review ran only those scripts, record.py check, ledger.py landing-check, facts-extract.sh, grep, diff and git, which write nothing in the tree. -->

# Climb batch 24: the natives' next families, 152 bindings moved with the count and the distance at 0, the cost, the practice, the routing and the steps owed before the next batch

## What came up in this run

### 1. The count 0 and the distance 0, row by row against climb batch 23's tables

**What the record expected** (`coordinator/CLIMB-BATCH-24.md:610-621`): the count 0, its 14 api rows as the comparand's, reading Z's 36, S's 2, K's 2 and H's 17 moved bindings in the main component; the distance 0 over the fourteen, `#crash none`, reading all 152 moved bindings, `compare.sh` printing 'DISTANCE SAME   0' and no setting line; `testSystem` about 713, "and any more that the rungs add"; the compiler track about 1,365, the library track 86, the other-compiler track 263 and the misc track 440; `testSpecData` 130; the 42 atomic runs unchanged; the ladder's 85 programs at `pass`; the 52 demos at the gather; microGPT's quick pair at the commit stage. The gate ran on `0ce8448a0` and was green (the gate's result in the run's journal). The review's `84ae87a27` came while it ran and touched only `explorations/`: `git diff --name-only 0ce8448a0 HEAD -- ProjectFortress Library build.xml` printed nothing (the gate's result), so no `# repair-ungated` line was owed.

**The count's table** (`climb-batch-24/gate/checker-count.txt` against `climb-batch-23/gate/checker-count.txt`): `diff` prints nothing. The table is climb batch 23's byte for byte: 14 api rows, all 0, `#total 0`, `#locations 0`, `#crash none`, `#shadow matches the tracked StaticChecker`.
- **No row is new and no row rose, so no row needs a rung edit to explain it.**
- The table stays one row long for the helpers, though the `FortressLibrary` component's helper strings went from 19 to 76 and from three helper classes to six (`simpleIntArith`, `simpleLongArith`, `simpleUnsignedIntArith`, then also `simpleArbitraryPrecisionArith`, `simpleUnsignedLongArith` and `simpleChar`; `git show <rev>:Library/FortressLibrary.fss | grep -o 'nativeHelpers\.[A-Za-z]*\.'` at `b0f6cd6b7` and at `25238e60c`). The rewrite makes one synthetic import per package (`ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java`, `alias`, which keys its map by package), and the count stage lists each api that the component imports. All six classes, and the transfer helpers that rung H's rewrite adds, are in `com.sun.fortress.nativeHelpers`, so they stay the one row `com.sun.fortress.nativeHelpers 0` that climb batch 23 added (`reviews/batch-23-review.md`, section 1).
- The 57 bindings that the count reads for the first time are K's two `CHOOSE`s, Z's 36, S's 2 (`NN64`'s `signed`, `Library/FortressLibrary.fss:986`, and the function `char`, `:4540`) and H's 17 of `NN64` (`:917-984`). The count reads them against their helpers: rung Z's control, `ZZ`'s `=` pointed at `simpleArbitraryPrecisionArith.add` for one run, gave '#total 1' and 'Function body has type ZZ, but declared return type is Boolean.' (`compile-ladder/rung-natives-integers/REPORT.md:127`).

**The distance's table** (`climb-batch-24/gate/distance.txt` against 23's): `diff` prints only the `#seconds` row, 198 (`FortressLibrary` 152) against 240 (174), and the `#machine` row's load at start, 1.84 against 1.54. `#total 0`, every `#kind` 0, `#crash none` and `#shadow` are the same. `compare.sh` printed 'DISTANCE SAME   0' and no setting line (`climb-batch-24/gate/summary.txt:119`). The stage read all 152 moved bindings; the 95 of them in `FortressBuiltin` (rung F's 30, six of S's 8 and H's 59 of `NN32` and `Char`) only it reads (P-39). The rungs' own controls show that it reads them: rung S's run with two strings pointed at wrong helpers gave '#total 2' (`rung-natives-small/SKEPTIC.md`, "What I checked", 1), and the planner's control on `Float`'s `<` gave '#total 1' (`CLIMB-BATCH-24.md`, "The planner's probes", "The control").

**The per-site list** (`compile-ladder/gate/distance-sites.tsv`): its header alone, as before (the commit stage's result).

**The summary's other rows** (`climb-batch-24/gate/summary.txt` against 23's):
- `CompilerJUTest` 1,338 to 1,379, +41. Each `compile`, `link` or `run` line of a `.test` file is one test. Counted by the rung commits on `main` (`teststeps.py`): F +4, K +5 (`XXXChooseTableCompiledRungE.test` deleted, `ChooseTableCompiledRungE.test` added), Z +2, S +2, W 0, G +18 (`XXXWhereBoundChecker.test` renamed to `XXXFunctionContractCodeGeneration.test`), H +10. The sum is 41.
- `testSystem` 694 to 723, over shards of 176, 185, 181 and 181: 29 walk programs added, F 2, K 4, Z 4, S 3, W 6, G 3, H 7, with W's promotion a rename (`git diff --name-status` of each rung commit; `RECORD.md:301`).
- The record's forecasts, about 713 and about 1,365, again counted the planner's tests only (climb batch 23's miss 825). The gather's own count, 723, was exact (`RECORD.md:301`).
- The library track 86, the other-compiler track 263, the misc track 440 and `testSpecData` 130, as before. The atomic runs: 42 of 42 `PASS`.
- `compileAll` 1 minute 2 seconds: the batch changed Java, the caches started again empty, and the gate ran the library order, five jars (the gate's result).

**The ladder** (`climb-batch-24/gate/ladder/`): 85 of 85 at `pass`, no move; `comparison.txt` and `microgpt-comparison.txt` are empty. Against 23's files, `ladder.tsv` with its `secs` column masked is the same (`diff` prints nothing), and `microgpt-phase.md` differs only in its seconds column. The eighteen microGPT components keep their phases, all `disambiguate`. The gate's comparison hid nothing.

### 2. The stages' times against climb batch 23's gate

- **The count stage: about 150 s.** By the file times of the gate's log, 152 s, from `javac.txt` at 16:01:12 to `run.txt` at 16:03:44 UTC (the commit stage's result, which wrote it into F-240). By the gate's call times, about 156 s (launched at 16:01:12, its table read at 16:03:48). At 23's gate, about 155 s by call times. On the rungs' trees: F 129 s, K 147 s, Z 132 s at a load of 0.60, H 132 s, S 181 s at a load of 10.73 (each rung's `REPORT.md`, "The stages"). No move beyond noise.
- **The distance stage:** 198 s (`FortressLibrary` 152 s) at load 1.84, against 240 s (174 s) at 1.54. The gate starts it beside the library order and `testFast`, by design (`coordinator/climb-batch-workflow.md`, "Gate", step 2), and it did so here (calls at 15:42:31 and 15:43:24). One run each, so the drop is no measured difference; F-240 offers no cause for it (the commit stage's result). On the rungs' trees: F 202 s at load 8.39, K 213 s, Z 173 s, S 194 s, H 170 s at 1.22.
- **The suites:** `testFast` 6 min 34 s, against 6 min 50 s; `testSystem` 3 min 46 s, against 3 min 33 s, with 29 more programs; `testSpecData` 1 min 13 s, against 1 min 11 s (`summary.txt:61-68`).
- **The machine line:** load 2.96, 5.61, 4.22, against 2.93, 5.61, 4.25. It still reads `FORTRESS_THREADS=1` (batch 11's finding 8).
- **The gate:** 24.1 minutes (15:40:45 to 16:04:49), against 24.8.
- **F-240** now gives climb batch 24's gate and its figures, written by the commit stage (`25238e60c`). Climb batch 22's finding 4 is built (`40302280c`).

### 3. The cost, by role, against the record and the batches before

From `batch-measures.py` on the seven runs, and this review's scripts on this run's folder. **The run wrote 5.74M over 18 agents, in 5 h 01 min** (11:10:31 to 16:11:49 UTC). No agent was killed and none ran twice. The boot note's "about 6.2M written by the harness's count" (`coordinator/BOOT.md`, `b468b9d62`) is another measure: by this review's count the writes are 5.74M, and the writes with the output tokens 7.76M (`tokens.py`).

| Role | B20 | B21 | B21b | B22 | B22c | B23 | B24 | B24 share |
|---|---|---|---|---|---|---|---|---|
| Rung workers | 848K (2) | 1.64M (4) | 1.34M (3) | 890K (3) | 1.51M (4) | 772K (2), and 476K killed | 2.41M (7) | 41.9 % |
| Skeptics | 757K (2) | 1.52M (4) | 1.07M (3) | 958K (3) | 1.37M (4) | 740K (2) | 2.25M (7) | 39.1 % |
| Judge on a rung | 0 | 0 | 0 | 0 | 146K | 0 | 0 | |
| Gather | 426K | 565K | 439K | 392K | 501K | 348K, and 289K killed | 466K | 8.1 % |
| Merged-diff review | 362K | 381K | 412K | 335K | 376K | 322K | 366K | 6.4 % |
| Its judge and repair | 0 | 165K + 227K | 0 | 0 | 231K + 214K | 0 | 0 | |
| Gate | 117K | 127K | 122K | 127K | 132K | 135K | 126K | 2.2 % |
| Commit | 131K | 125K | 118K | 122K | 136K | 121K | 130K | 2.3 % |
| **Total** | **2.64M** | **4.75M** | **3.50M** | **2.82M** | **4.61M** | **3.20M** (2.44M finished) | **5.74M** | |
| Agents, rungs | 8, 2 | 14, 4 | 10, 3 | 10, 3 | 15, 4 | 11 (8 finished), 2 | 18, 7 | |
| Span | 2 h 10 | 4 h 26 | 3 h 40 | 2 h 35 | 4 h 37 | 2 h 57 | 5 h 01 | |
| Per rung, all roles | 1.32M | 1.19M | 1.17M | 0.94M | 1.15M | 1.60M (1.22M finished) | 0.82M | |

**Against the record:** "About 6.7M tokens written: from 5.9M if no fix is contested, to 8.2M with a judge and a repair round on two rungs or a restart", and "About 6 h, at two agents at a time" (`CLIMB-BATCH-24.md:69`). No fix was contested, no rung or review had a ruling or a repair, and no restart came.
- **5.74M, 14 % under the estimate and 3 % under its floor.** Workers 2.41M against 2.9M; skeptics 2.25M against 2.45M; the fixed roles 1.09M against 1.3M.
- By rung, worker and skeptic against the record's figures (the worker's, and 0.35M a skeptic): F 375K and 318K against 0.45M and 0.35M; K 318K and 310K against 0.35M; Z 372K and 362K against 0.45M; S 241K and 227K against 0.3M; W 292K and 321K against 0.45M; G 301K and 342K against 0.4M; H 510K and 368K against 0.5M. Only H's worker (510K) and skeptics Z and H (362K, 368K) went over their figures. The skeptics' mean, 321K, held the record's measured 0.32M to 0.38M.
- **The time:** 5 h 01 min against about 6 h. The workers took 292 minutes in all against the manifest's 490 (F 63 against 70, Z 31 against 80, S 29 against 50, K 51 against 60, W 42 against 70, G 28 against 70, H 48 against 90; `CLIMB-BATCH-24.md`, section 5, "The manifest, rung by rung"), which order the scatter only.

**Against the batches before:**
- Per rung, all roles: 0.82M, the lowest of the seven runs (0.94M to 1.32M before; 1.22M at 23's finished launches).
- Workers and skeptics together per rung: 0.67M, against 0.76M at 23 (finished), 0.72M, 0.62M, 0.80M, 0.79M and 0.80M before. Two rungs changed library text only (Z and S), and rung F library text with one line of Java.
- The fixed roles: 1.09M, against 0.93M at 23, 1.15M at 22c, 0.98M at 22, 1.09M, 1.20M and 1.04M before. The gather composed seven rungs, its most.

**The order of the run.** The run kept two agents at a time. It ran the seven workers first, the two longest first (H and Z at 11:10, by the manifest's expected minutes), then the seven skeptics in the order their workers ended (the journal's `started` lines). So each skeptic started 50 minutes to 1 h 54 min after its worker's result: Z's at 13:35:12 for a worker done at 11:41:34, H's 1 h 40 min after, F's and W's 1 h 16 and 1 h 17, G's 1 h 14, S's 1 h 10, K's 50 minutes. The wait cost no tokens: each skeptic is a new agent. The gather started 2 s after the last skeptic (15:04:17), and the gate and the review 3 s after the gather (15:40:45).

**The briefing's use and cost** (the `coordinator` skill's `references/batch.md:45` asks the share at a landing):
- **14 of 14 briefed agents read it, none in its first turn.** Their first briefing calls came at calls 11 to 19, 48 to 92 s after each agent's start: the workers at calls 12 to 15, 63 to 85 s; the skeptics at calls 11 to 19, 48 to 92 s (`brief2.py`).
- Its results came to about 239K tokens, 4.2 % of writes, at 0.40 tokens a character plus 110 a call (39 calls): workers 157K (F 15.1K, Z 26.6K, S 17.7K, K 32.1K, W 19.0K, G 16.9K, H 29.6K), skeptics 82K (7.4K to 21.2K). Per briefed agent about 17.1K, against 28.6K at 23 (two rungs of Java with their patches as keys) and 18.6K at 22c.
- Rungs W and Z and skeptics W and Z saved their briefing files in the session's scratchpad, not in their own trees (finding 8).

| Batch | Briefed agents | In the first turn | Run at all | At calls | Seconds after start | Its tokens (estimate) |
|---|---|---|---|---|---|---|
| 20 | 4 | 0 | 4 | 9 to 12 | 48 to 78 | 89K, 3.4 % |
| 21 | 9 | 0 | 9 | 8 to 15 | 24 to 97 | 193K, 4.1 % |
| 21b | 6 | 0 | 6 | 10 to 21 | 45 to 94 | about 111K, 3.2 % |
| 22 | 6 | 0 | 6 | 11 to 16 | 60 to 73 | about 117K, 4.2 % |
| 22c | 10 | 0 | 10 | 2 to 17 | 11 to 98 | about 186K, 4.0 % |
| 23 | 6 (4 finished) | 0 | 6 | 13 to 23 | 67 to 165 | about 172K, 5.4 % (finished 105K, 4.3 %) |
| 24 | 14 | 0 | 14 | 11 to 19 | 48 to 92 | about 239K, 4.2 % |

**Other measures.**
- **First calls:** 750K (13.1 %), 7 cold: rungs H and Z, skeptic Z, the gather, the gate, the review and the commit. The other eleven started warm, with cache reads of 40K.
- **Cache refills:** 0. **Refusal cycles:** 0.
- **The skill's load** (`skill-load.py`): 935K, 16.3 %: 148K of load text (2.6 %) and 787K over 254 part reads (13.7 %), against 13.3 % at 23 and 13.6 % at 22c. All 18 agents loaded `fortress-repo`; each read 4 to 15 parts. `revival-changes.md` was read 20 times (126K), `compiler.md` 20 (87K), `interpreter.md` 23 (65K). The gather also read the `cloud-container` skill's disk part (15:06, at 2.8G free).
- **Builds:** one for each rung's code state: F 1, K 1, G 1, H 1, W 2 (two code states, `aa52279ea` and `d1228e1f0`), Z and S none (library text, walk analyses it again by itself); the gather built the merged tree once; the gate built `main` once (`batch-measures.py`; `runs.py`). No build ran twice on one code state.
- **Rows:** 11 opened (862 to 872); 3 closed (521, 847, 855); 10 rewritten (336, 856, 857, 846, 701, 307, 812, 677, 848, 860), and 867 and 868 again by the gather for their placeholders (`RECORD.md`, "Rows opened", "Ledger notes"). `ledger.py landing-check b0f6cd6b7`: 'no finding'; `record.py check --base b0f6cd6b7`: '0 failures' (this review's runs).
- **The disk:** 1.8G free at 12:4x UTC during the run, by the boot note, after which the coordinator deleted old scratch; 2.5G to 2.8G free through the gather, the gate and the commit stage (their `df -h /` calls), and 6.9G once the commit stage removed the seven rung worktrees (its result). Seven worktrees of about 206 MB each, the base build and the stages' folders filled the allowance near to its end (`CLIMB-BATCH-24.md`, "Before the launch", step 6).

Per agent, in order of start (UTC; ids are the transcripts' `agent-<id>.jsonl`; messages are distinct message ids):

| Agent | Id | Writes | First call | Messages | Minutes | UTC |
|---|---|---|---|---|---|---|
| Rung H | a9bf180e | 510K | 64K, cold | 176 | 47.7 | 11:10-11:58 |
| Rung Z | a1689546 | 372K | 62K, cold | 118 | 31.0 | 11:10-11:41 |
| Rung F | ac1a7090 | 375K | 22K | 174 | 62.7 | 11:41-12:44 |
| Rung W | a9d4518c | 292K | 21K | 121 | 42.3 | 11:58-12:40 |
| Rung G | a570941d | 301K | 21K | 148 | 28.4 | 12:40-13:09 |
| Rung K | a03efbd5 | 318K | 22K | 133 | 50.8 | 12:44-13:35 |
| Rung S | a199b757 | 241K | 21K | 106 | 29.3 | 13:09-13:38 |
| Skeptic Z | a729545a | 362K | 67K, cold | 96 | 22.6 | 13:35-13:57 |
| Skeptic H | a79aa78b | 368K | 29K | 110 | 22.1 | 13:38-14:00 |
| Skeptic W | a1856e17 | 321K | 27K | 128 | 24.9 | 13:57-14:22 |
| Skeptic F | a0d8e621 | 318K | 28K | 114 | 24.7 | 14:00-14:25 |
| Skeptic G | aea10fd8 | 342K | 26K | 118 | 30.3 | 14:22-14:53 |
| Skeptic K | af5a4660 | 310K | 27K | 101 | 23.1 | 14:25-14:48 |
| Skeptic S | a8c78621 | 227K | 26K | 78 | 15.7 | 14:48-15:04 |
| Gather | a2744b1e | 466K | 86K, cold | 191 | 36.4 | 15:04-15:40 |
| Gate | acd250e6 | 126K | 57K, cold | 36 | 24.1 | 15:40-16:04 |
| Review | a12de1e4 | 366K | 77K, cold | 115 | 19.9 | 15:40-16:00 |
| Commit | ab90f67b | 130K | 66K, cold | 42 | 7.0 | 16:04-16:11 |

I did not measure the preparation beside the run: the planner, the two probes, the Fable review and the coordinator's launch.

### 4. The tail

- **The gather** (466K, 36.4 minutes):
  - It composed the seven rung commits on `main` one patch at a time (`git apply --3way --index`) in the order F, K, Z, S, W, G, H, as fork 1 gives it (`RECORD.md:24-33`). Rung H's two hunks that hold S's changed lines as context went in through `--3way`, both rungs' strings in place. No conflict, and nothing was re-anchored.
  - It seeded `/home/user/fortress-gather24` from the base build, applied the seven patches, built it and ran the library order. Under `nice -n 19`: the batch's walk tests with climb batch 23's in one JVM, 'OK (38 tests)'; the compiled tests in one JVM, 'OK (51 tests)'; the 52 demos, 'demos: 52 run, 52 reached their end', 15:10:30 to 15:38:38; the specification beside the demos, 'BUILD SUCCESSFUL' twice, the warning count 0 (`RECORD.md:35-50`). It ran no stage and no suite, by fork 10: climb batch 23's finding 4 for the stages is built.
  - It opened rows 862 to 872, closed 521, 847 and 855 (`0fcc1cab6`), rewrote ten rows, added F-303 to F-308 and rewrote F-24, F-32, F-34, F-132, F-181, F-270, F-281, F-298 and F-299, the last two rung by rung to each commit's tree (`RECORD.md:89`).
  - It rewrote the Effect of "A native binding that names a static helper" once on the merged tree, with rows 864 and 865 among its departures, and corrected the three Effects that rung G made false (`Specification/appendices/changes.tex:255-259`, `:1674-1676`, `:4271-4274`, `:4469-4521`; `RECORD.md:153-156`, `:167`). It corrected the batch record's line `CLIMB-BATCH-24.md:431` in place.
  - It routed the rungs' items into PLAN (`PLAN.md:145`, `:648-658`).
  - Misses: its record names three branches whose worker's files the skeptic wrote from the journal; there were four (finding 5). Its specification build was built again by the commit stage (finding 4).
- **The merged-diff review** (366K, 19.9 minutes, beside the gate): **approved**, nothing blocking. Its corrections in `84ae87a27`: F-298's two citations of `BuiltinPrimitiveRewriter.java`, moved by rung H's hunk; F-303's list of `Float`'s 32 glue bindings, which named 26; F-305's two citations, swapped; a comma in F-24; and review-routed.1 to .3, the tests owed for rows 865, 866 and 871 (`PLAN.md:659-661`). It checked 17 skeptic commits as applied (`fixesChecked`), and named PLAN's stale first section as a note, not a finding.
- **The gate** (126K, 24.1 minutes): green on `0ce8448a0`, as section 1 gives.
- **The commit** (130K, 7.0 minutes): it landed the tables and the per-site list, ran the quick microGPT walk check, folded F-53's title and F-240's figures by `record.py set`, built `Specification/fortress.pdf` again (691 pages, the warning count 0), and pushed `main` to the three refs on the first try. It named F-240's sentence on climb batches 22 to 23 as out of date and left it. It removed the seven rung worktrees and deleted their local `wip/` branches, kept the gather's tree, and left the remote branches (its result).

### 5. The microGPT walk check

Its verdict lines (`climb-batch-24/gate/summary.txt:120`, `:122`): "VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS" for `MicroGptAplQuick` and for `MicroGptFlatQuick` (the commit stage's result, `microgptWalk`), each run ending `rc=0`. So 7 of 7 on both programs, the first landing at which walk's float arithmetic runs through helpers (`CLIMB-BATCH-24.md:621`). By the ruling of 2026-10-23 the seconds are not compared (`PLAN.md:9`).

### 6. The natives after phase 4's second batch

**What the batch built.** 152 bindings moved onto helpers: F 30, K 2, Z 36, S 8, H 76. So 173 of the library's 449 live bindings name a helper (F-299), and 276 still name glue classes (F-32). `git grep -h -o 'builtinPrimitive("com.sun.fortress.nativeHelpers' 25238e60c -- Library ProjectFortress/LibraryBuiltin | wc -l` prints 173: 76 in `Library/FortressLibrary.fss` and 97 in `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`. By type: trait `ZZ32` 20, trait `ZZ64` 21, trait `ZZ` 16, trait `NN64` 18, value object `NN32` 21, `Char` 40, `Float` 30, `Int`, `Long` and `BigNum` 2 each, the function `char` 1 (`RECORD.md:89`). Beside the moves:
- under walk, `DIV` by zero on `ZZ64`, `ZZ`, `NN32` and `NN64` raises `DivisionByZero`, as on `ZZ32` since climb batch 23 (F-24); `REM` and `MOD` by zero still end the run (rows 336, 848);
- walk's loader carries a declared `Float` in a Java `double` (F-303), and is told the type that declares a method, so it refuses at load a helper bound in a method of a type that no Java type carries (F-299; row 847 closed);
- the compiled `CHOOSE` helpers raise `IntegerOverflow` past their tables and keep no shared scratch array (F-305; rows 521, 855 closed);
- the compiled path's rewrite composes a binding over `NN32`, `NN64` or `Char` with the six transfer helpers (F-308; the hard-set probe's way 2b);
- the code generator compiles a declaration whose own header carries a `where` clause (F-181; row 701's `where` half).

**Where the 449 stand.** The probe's classes at `a1f8c4b8b` (F-32): A 154 and B 59, 213 that an existing helper computes; C 158 that need a new helper; D1 36 methods of the I/O objects; D2 42 with no compiled analogue. Of the 213, 104 fit as a bare string and 109 do not.
- Of the 104, 97 now name helpers. The 7 left: `printlnWithThread` and `getProperty`, declared over `String` (Question 1; item 310; row 846), and `FlatString`'s 5 (fork 17), which wait on item 63, the walk loader's name reading of `FlatString` as a method's declaring type (`PLAN.md:145`).
- Of the 109, H moved 76. Six of the 82 over `NN32`, `NN64` and `Char` stay: `NN32`'s `asFloat` (climb batch 23's fork 12), `NN32`'s `CHOOSE` (one string, now that K and H have landed), `UnsignedLong`'s `asString` and `asExprString` (row 326), `NN64`'s prefix `DOTMINUS` (row 860), `Char`'s `asExprString` (row 861). The other 27 of the 109 wait for the hard-set probe's Q2 and Q3 (`plan-24/probes/hard-set.md:113-114`), `IntLiteral`'s 4 for N5.
- So the 276 on glue classes are the 40 of A and B above, C's 158, D1's 36 and D2's 42.

**What the zero rests on now.** The gate's 0 and 0 read the 173 against their helpers. For the 76 of rung H, the checker reads a composition through the six transfers, which are identities, so it no longer checks that a binding over `NN32`, `NN64` or `Char` names the unsigned helper; the guards check that (F-308; split 1 below). The zero over the fourteen still rests on climb batch 22c's fork 8 reading of `var` (row 844, review-queue item 295, open), and the stages' reading of every glue string on climb batch 23's fork 3 (item 309, open). Climb batch 23's forks 2 and 5, the rewrite in the stages and the stand-in reading of a helper's Java types, are his since his "all defaults" of 08:21 UTC on 2026-10-31 (item 308, `review-queue.md:1986`).

**What stands between the library and the switch-over** (P-33; PLAN, phase 4): the 40 of A and B, with their obstacles above; N3's 158, `REM` and `MOD` by zero among them (rows 336, 848), `IntLiteral`'s 20 with N5; N4's 36 I/O methods; N5 on the switch-over day; D2's 42, `NativeArray` with the array decision; the code generator's refusals over the library (F-34, 52 measured at climb batch 22, four of them the header `where` clauses that rung G removed; finding 6), with row 701's contract half and row 867; `System`'s 2 errors by the switch-over (P-33); and the names batch.

## Part 1. Conformance

### Method

As in `reviews/batch-23-review.md`. For each rung I read its commit on `main` and its diff against the base, its `REPORT.md` and `SKEPTIC.md`, its section of the record (`CLIMB-BATCH-24.md:132-375`) with Questions 1 and 2, forks 1 to 18 and the points for his sight (`:39-130`), the gather's `RECORD.md`, the run's journal results, and the code and the specification on `main`. Three standards, kept apart: the specification; the library's own way (P-27), and for compiler and walk code the team's code beside it; and the decisions on record (P-58, P-73, P-151, P-156, P-33, P-37, P-29, P-30, P-39, P-68, P-72, P-79, P-96, P-103), with the facts the batch built or rewrote (F-24, F-32, F-34, F-132, F-181, F-240, F-270, F-281, F-298, F-299, F-303 to F-308) and the record's forks. Where the batch's own record and the tree disagree, the tree rules, and I say so.

### The verdicts

- **Rung F, `Float`'s 30: in the spirit of P-58,** with split 6 (row 863).
- **Rung K, `CHOOSE` on `ZZ32` and `ZZ64`: in the spirit of P-73 and the specification,** which settle the fix; P-73's clause on `CHOOSE` is now false (K.worker.1).
- **Rung Z, `ZZ64`'s 20 and `ZZ`'s 16: in the spirit of P-58 and of the specification's rule for division by zero.**
- **Rung S, the small rest: in the spirit of P-58,** at Question 1's default (split 7).
- **Rung W, walk's check of `self`: in the spirit of P-58's walk half,** with split 4.
- **Rung G, row 701's `where` half: in the spirit of P-151,** with splits 2 and 3, and P-151's and P-156's sentences false (split 8).
- **Rung H, the hard set's way 2b: in the spirit of P-58 and of the team's composition,** with split 1, which Question 2's text did not weigh.
- **No ruling.** All seven skeptics approved, with corrections and nothing contested; the review approved; no worker stopped.

### Where the text, the brief or the principles split

**1. Way 2b checks a composition, and the transfers are identities (rung H; Question 2).** P-58: "from the step that moves a binding, the compiled checker checks it against the helper's Java signature" (`POSITIONS.md:55`). For H's 76, the checker reads the helper's call wrapped in the transfers, each of which returns its argument (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleUnsignedIntArith.java:230-231`). So the composition passes whatever the helper computes. Skeptic H's program shows it: a binding over `NN32` named to the signed `simpleIntArith.intLT` is refused on the old code ("(ZZ32, ZZ32)->Boolean is not applicable to an argument of type (NN32, NN32)"), and compiles and answers `true` for 2^31 < 1 on the new code; "So a loud static error becomes a quiet value" (`compile-ladder/rung-natives-hard/SKEPTIC.md:112-134`). Walk answers the same (F-299). For the 76, the walk and compiled guards check that each names the unsigned helper, and they do (F-308). For a later binding over these types, only its guard will. The record's Question 2 weighs the four ways by the team's word and the library's form (`CLIMB-BATCH-24.md:90-100`), and the probe by the same and by distance runs (`plan-24/probes/hard-set.md`, sections 4 to 7); neither names this cost. Question 2 was taken at the probe's default under his half-hour rule, "On his review list" (`:92`). Default: as landed. No entry holds it yet (finding 2).

**2. A compile-time refusal became a run-time crash (rung G; row 867; G.skeptic.1).** On the base, the code generator refused a function or method whose own `where` clause introduces a `where`-clause variable, 'Don't know how to compile this kind of FnDecl.'. With the guard's condition gone, it compiles and links, and its compiled call dies with `NoClassDefFoundError` (`ProjectFortress/compiler_tests/XXXWhereVariableCallCompiled.fss:16-21`). The skeptic asks whether to keep refusing that form until the template carries the variable (`PLAN.md:656`). Default: as landed, the deferred `XXX` run pair. A loud failure stays loud, but moves from the compile to the run.

**3. The code generator compiles every header `where` clause, beyond P-151's three forms (rung G; fork 12).** P-151: "Only the `where`-clause forms that the team wrote down are built: conditional extension, a function's or a method's condition, and `AnyList`'s `comprises` clause" (`POSITIONS.md:63`). G dropped the condition at all three guards, so an object's or a trait's own `where` clause on its own static parameters compiles too (`CodeGen.java:4103-4111`, `:5022-5027`; `compiler_tests/WhereBoundObjectCompiled.fss`). The checker already reads an object's own constraint (`.claude/skills/fortress-repo/references/compiler.md:103`), and the code generator emits nothing for any clause, so no new form gets semantics; G's decision 3 says so (`compile-ladder/rung-codegen-where/REPORT.md`, "9. Decisions", 3). Fork 12's default, not consequential by the record (`CLIMB-BATCH-24.md:117`). A reading of P-151's "built" at the code generator, routine, on the forks' item.

**4. Walk reads a method's declaring type by its name (rung W).** The loader takes `self`'s carrier from the declaring type's name, for fifteen types whose names no program can give its own types, and gives `FlatString` and `JavaString` no carrier, since a program can name its types so (`ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java:81-95`). W improved the planner's text there: on the patch's build, a program's own `object FlatString` with a helper bound to `nativeStrlen` answered 10 (`rung-natives-self/REPORT.md:27`). The cost is item 63: a library binding of a `FlatString` method that names a helper would stop every program at load (`PLAN.md:145`; skeptic W, "For the curator"). Two departures stay, each with its home: a dotted method of a generic trait or object is refused only where an instance's method is made (row 864), and a program's object that extends a carried trait against its `comprises` clause still reaches the helper (row 551; F-299). No default on record for item 63.

**5. The comment's "rewrites the body", and a local function (row 865).** The revised comment says "The compiler, before type checking, rewrites the body into a call of the helper" (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:19`). The rewrite reaches a component's declarations and its traits' and objects' members only (`BuiltinPrimitiveRewriter.java:54-86`), so a helper string in a local function or an object expression's method stops 'Variable builtinPrimitive is not defined.', where walk answers (row 865). The gather named it among the Effect's departures (`changes.tex`, the Effect of "A native binding that names a static helper"). The manual's rule 4 asks the departing path "a gated XXX test asserting the text's rule" (`coordinator/climb-batch-workflow.md`, "Rules weighed by what they cost against what they protect", 4); the row has reproducer `none`, its test owed as review-routed.1 (`PLAN.md:659`). Climb batch 23's row 849 met the same rule (its finding 8). No library binding sits in either form.

**6. A floating-point division by zero: NaN or infinity (rung F; row 863).** "For floating-point results, division by zero produces a NaN value according to the rules of IEEE 754." (`Specification/basic/operators/opr-overview.tex:167-168`). IEEE 754 gives an infinity for a nonzero dividend; both paths do, and the team's `infinity : RR64 = 1.0 / 0.0` (`Library/Constants.fss:17`) and `tests/realArith.fss:78` rely on it. The row is `CONTESTED`, and no guard asserts a nonzero value divided by zero. F.worker.1 (`PLAN.md:652`). Default: the row as it is.

**7. Question 1: his scope's two sentences split on two bindings (rung S).** His scope named the small rest's "top level 3" and left out "the bindings over `String`"; two of the three are declared over `String` (`CLIMB-BATCH-24.md:76-88`). The coordinator answered at the default: the two stay on their glue class, his exclusion standing until item 310 is asked again. Built: `Library/FortressLibrary.fss:4632` and `Library/System.fss:45` still name `StringPrim`.

**8. Four sentences of POSITIONS are false, his text.** P-73's "and at `CHOOSE` (row 521)" (`POSITIONS.md:80`; K.worker.1, `PLAN.md:653`); P-151's "Row 701: the code generator's half." (`:63`); and two clauses of P-156 (`:67`): "after the switch-over the code generator's refusal of a method with a `where` clause stops it too, as it stops `SumReduction`'s two `distribute`s (row 701)", and, in its Why, "and the code generator refuses a `where` clause in a declaration's header". gather.1 names the first two of P-151 and P-156 and not the Why clause (`PLAN.md:657`; `RECORD.md:296`). The decisions stand. Default: none on record; his rule of 2026-10-31 that bringing the record in line with the implementation needs no approval (the boot note, "Next, for the coordinator", 2) lets the record writer write them and name them to him.

### Rung F, `5ecb7a841`

**What landed.** `rung-F.patch` as written: one line of walk's loader, `javaFor`, carrying `Float` in a Java `double` (`StaticNativeApp.java:51`), and `Float`'s 30 strings naming `simpleDoubleArith`'s helpers (`FortressBuiltin.fss:55-193`); 32 of `Float`'s bindings stay on glue classes, which no helper fits (F-303). The walk guard `NativeHelperFamilyFloatWalk` and the compiled guard `NativeHelperFamilyFloatCompiled`, which skeptic F completed to 224 and 207 assertions (`fc709e881`, `0f44ee9e8`); `NativeHelperFloatCarriedWalk`; the `XXXFloatNumeralOneRounding` run pair for row 862.

**Standard 1.** Split 6. And "thus incurring at most one floating-point rounding error" (`Specification/basic/expressions/literals.tex`, "Literals"): the compiled path rounds a numeral with a radix point two or three times, on the old code too (row 862, home 2; F-304).

**Standard 2.** Each helper computes what its glue class computed, by the same Java expression (`interpreter/glue/prim/Float.java` against `nativeHelpers/simpleDoubleArith.java:16-134`; skeptic F, "What was checked", 3). `javaFor` is walk's one table of carriers. Team lines changed: 30 strings of the team's `value object Float`.

**Standard 3.** P-58. P-68: `truncate` and `round` move at `ZZ64`, as P-68 says they answer today (fork 11). The guards leave out rows 672 and 330 and row 863, as fork 5 asks. P-29: walk's float arithmetic runs through reflection now, and weighs nothing; P-30's check passed by its verdict.

**Verdict: in the spirit,** with split 6.

### Rung K, `71249bf55`

**What landed.** The CHOOSE probe's patch for `simpleIntArith`, byte for byte (`plan-24/probes/choose.patch:76-107`), and the same two changes in `simpleLongArith`: a guard past the safe-bound table that raises `IntegerOverflow`, and a scratch array per call in place of a static field (`nativeHelpers/simpleIntArith.java:162-163`, `:210-213`; `simpleLongArith.java:136-137`, `:183-186`). The two strings (`Library/FortressLibrary.fss:789`, `:882`). The probe's tests and their `ZZ64` counterparts, and `XXXChooseTableCompiledRungE` promoted to `ChooseTableCompiledRungE`. Rows 521 and 855 closed (`0fcc1cab6`).

**Standard 1.** The coefficient (`Specification/basic-lib/basic-integers.tex`, "Integers", opr `CHOOSE`) and "For integer results, overflow throws an IntegerOverflow." (`opr-overview.tex`, "Multiplication, Division, Modulo, and Remainder Operators"). Past the table every coefficient overflows, so the guard is exact (skeptic K, section 3).

**Standard 2.** The raise is `Utility.makeFortressException("fortress.CompilerBuiltin$IntegerOverflow")`, as `intOverflowingAdd` raises (`simpleIntArith.java:64`). No other static state is in `nativeHelpers/` but a constant (skeptic K, section 4). Team lines changed: two lines in each of the team's two helpers.

**Standard 3.** P-73: walk's values stay; on the compiled path P-73's clause on `CHOOSE` is false (split 8). P-37: no declaration is added to the compiler's prelude, but the prelude's compiled `CHOOSE` now raises and keeps no shared state on `ZZ32`, `ZZ64` and, through the `ZZ64` helper, `NN32`: a design inside a shared file, which P-37 does not govern. Fork 9: `ant testQuick` and `ant testSystem` once on the final code.

**Verdict: in the spirit.**

### Rung Z, `3308aad55`

**What landed.** `rung-Z.patch` as written: `ZZ64`'s 20 and `ZZ`'s 16 strings, naming 28 helpers (`Library/FortressLibrary.fss:831-905`, `:1007-1076`). `ZZ64DivisionByZeroWalk`, `ZZDivisionByZeroWalk`, the guards `NativeHelperFamilyIntegersWalk` and `NativeHelperFamilyIntegersCompiled`, and `XXXZZ64RemainderByZeroWalk`, row 336's reproducer.

**Standard 1.** "For integer results, division by zero throws a DivisionByZero." (`opr-overview.tex:164-165`): now so under walk for `ZZ64` and `ZZ`. `REM` and `MOD` by zero still end the run (rows 336, 848), each now with its `XXX` test (climb batch 23's finding 7, built).

**Standard 2.** The form of climb batch 23's `ZZ32` `DIV` (`FortressLibrary.fss:778-779`). `ZZ64`'s four wrapping bindings name the wrapping helpers, which the prelude binds under its `BOX` spellings (row 348; skeptic Z's correction, `e4f1e168b`). A `ZZ` helper takes only a `BigNum` value, and walk's coercions convert another integer operand first (F-306; skeptic Z, "What was checked", 3). Team lines changed: 36 strings of the team's `trait ZZ64` and `trait ZZ`.

**Standard 3.** P-58; P-73's wrapping operators. Z.worker.1, `unsigned` of a negative value, unspecified (`PLAN.md:654`).

**Verdict: in the spirit.**

### Rung S, `ca1498628`

**What landed.** `rung-S.patch` as written: 8 strings (`FortressBuiltin.fss:380`, `:382`, `:470`, `:567`, `:569`, `:617`; `FortressLibrary.fss:986`, `:4540`), the four over `NN32`, `NN64` and `Char` naming the special names that the checker reads at those types (`compiler/NamingCzar.java:373-384`). The guards, and `SignedAboveSignedRangeWalk` and `CharCodePointOutOfRangeWalk`, which pin today's values for rows 856 and 857.

**Standard 1.** The specification names `narrow` and the shifts only (`basic-integers.tex`, "Integers"); `signed` above the signed range and `char` outside the code points are home 3, a test of today's behaviour and a row, as the skill gives it.

**Standard 2.** Each helper computes the glue class's value (skeptic S). The two libraries disagree on `char` out of range: the prelude's `makeCharacter` raises `IntegerOverflow` (`CompilerBuiltin.fss:1058-1062`), the one library keeps the value, and so does a compiled binding of the same helper (S.worker.1, `PLAN.md:655`). Team lines changed: 8 strings.

**Standard 3.** P-58; Question 1's default (split 7).

**Verdict: in the spirit,** with split 7.

### Rung W, `9f65d60e2`

**What landed.** `rung-W.patch` with two changes: under a declaring type an overload must take `self` first (`StaticNativeApp.java:147`, `:154`), and `FlatString` and `JavaString` carry no `self` (`:88`). `MethodClosure` passes its `definer` and `FunctionalMethod` its self type, through two new constructors of `FunctionClosure` (`interpreter/evaluator/values/FunctionClosure.java:61-71`) and a three-argument `NativeApp.checkAndLoadNative` (`interpreter/glue/NativeApp.java:168-207`), to `StaticNativeApp.find` (`:107-160`) and the new `javaForSelf` (`:81-95`). `XXXNativeHelperUncarriedSelfWalk` promoted to `NativeHelperUncarriedSelfWalk`; six new tests; row 847 closed; row 864 filed by the worker, rows 865 and 866 by the skeptic.

**Standard 1.** The printed comment's "%self% first" (`FortressBuiltin.fsi:14-29`) is now true of `self`'s type too (fork 7, `CLIMB-BATCH-24.md:112`). Row 864 departs from the refusal at load.

**Standard 2.** The refusal is walk's `bug` at the declaration, as for a glue class that walk cannot find. Team lines changed: the constructors of the team's `MethodClosure` and `FunctionalMethod`, two constructors added to `FunctionClosure`, and `NativeApp.checkAndLoadNative`; `StaticNativeApp` is the revival's. The reading by name is split 4.

**Standard 3.** P-58's walk half; row 847, which the record settles. Fork 9 asks the suites once after the last change of code; W ran them twice (finding 4).

**Verdict: in the spirit,** with split 4.

### Rung G, `c324b841c`

**What landed.** The three `header.getWhereClause().isNone() &&` conditions deleted from the guards of `forFnDecl`, `forObjectDecl` and `forTraitDecl`, the contract conditions kept (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2966-2972`, `:4103-4111`, `:5022-5027`). `XXXWhereBoundChecker` promoted to `WhereBoundFunctionCompiled`; `WhereBoundMethodCompiled`, `WhereBoundObjectCompiled`, `WhereBoundTraitMethodCompiled`, `ComprisesWhereFunctionalMethodCompiled`; `XXXNatOpenRun` as a run pair for row 307's `VerifyError`; `XXXFunctionContractCodeGeneration` as row 701's new reproducer. The skeptic's `XXX` tests for rows 867 to 870, and row 871.

**Standard 1.** P-151's forms, read in the specification's `where` clauses; rows 307 and 867 settled by "Nat and Int Parameters" (`Specification/basic/trait-parameters.tex`). The three Appendix I Effects that named the refusal now state the merged code (`changes.tex:255-259`, `:1674-1676`, `:4271-4274`).

**Standard 2.** The team's own comment at the trait guard is the precedent: "Presence of excludes or comprises clauses should not affect code generation once type checking is complete." (`CodeGen.java:5023-5024`; at `a874948ac` too). G deleted where the team commented its retired conditions out (G's decision 1, on the revival's practice in `4d419c9e8`). Team lines changed: three conditions of the team's `CodeGen`.

**Standard 3.** P-151's code-generator half of row 701 for the `where` clause; splits 2, 3 and 8. P-156's `BoundedRange.atMost` and the two `distribute`s no longer stop at that refusal (`changes.tex:4271-4274`).

**Verdict: in the spirit,** with splits 2, 3 and 8.

### Rung H, `b71495ca4`

**What landed.** `rung-H.patch` with three changes of wording, none of behaviour (skeptic H, "What I checked", 3): the rewrite reads each position's declared type, `self` by its non-generic owner, and puts the matching transfer around an argument or around the call where the helper's `int` or `long` is read otherwise (`BuiltinPrimitiveRewriter.java:113-157`, `:176-206`); the 76 strings (`FortressBuiltin.fss:391-466`, `:612-722`; `FortressLibrary.fss:917-984`); six of the 82 left on glue classes (fork 18). The walk and compiled guards of `NN32`, `NN64` and `Char`; `NativeHelperTransferCompiled`, over all 71 helpers and the six transfers; `NN32DivisionByZeroWalk` and `NN64DivisionByZeroWalk`; `XXXNN32RemainderByZeroWalk` (row 848); the `XXXNN64WrappingNegationHelperCompiled` pair (row 860); `CharAsStringSupplementaryWalk` (row 872).

**Standard 1.** `DIV` by zero on `NN32` and `NN64` raises `DivisionByZero` under walk (`opr-overview.tex:164-165`). The specification gives `Char` no `asString`, so row 872 is home 3 (H's decision 6).

**Standard 2.** The team's composition through six transfers, the 2011 form (Steele, `c2c769094`, as the probe gives it, `CLIMB-BATCH-24.md:98`), as the prelude composes its own operations by hand (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:768`). The library keeps one bare body per binding (P-58). Team lines changed: 76 strings of the team's `value object NN32`, `value object Char` and `trait NN64`; `BuiltinPrimitiveRewriter` is the revival's.

**Standard 3.** Question 2's way 2b; split 1. P-37: no prelude declaration. H's limits read from the code, not measured: a helper overloaded at its arity gets no transfer; `self` in a generic owner gets none; a declared type is read by its simple name, so a program's own trait named `NN32` would be composed as the library's (`rung-natives-hard/REPORT.md:154-159`). F-308 holds the first two; the third has no home but the report (finding 10).

**Verdict: in the spirit,** with split 1.

### The decisions consequential for him, and the readings he has not confirmed

By the coordinator skill's sense of consequential (`CLIMB-BATCH-24.md:74`; `review-queue.md`, its header), the batch took these, each at its default:
- **Question 2, the hard set's way 2b** (split 1). Taken by his standing word of 08:2x UTC on 2026-10-31 when he gave no answer within half an hour (`CLIMB-BATCH-24.md:92`). It chooses among ways the record did not settle, and the check of 76 bindings now rests on their guards. Default: as landed. Reversible: undo `BuiltinPrimitiveRewriter.java` and the 76 strings.
- **Question 1, the two top-level bindings over `String`** (split 7). Answered at its default by the coordinator from his scope; his exclusion stands with item 310. Default: as landed.
- **G.skeptic.1, a refusal turned into a crash at run time** (split 2). A choice among ways the record does not settle. Default: as landed.
- **Item 63, walk's reading of a method's declaring type by its name** (split 4). Needed before `FlatString`'s five bindings move; no default on record.
- **F.worker.1, NaN or infinity** (split 6). The specification against IEEE 754 and the team's own code. Default: the row `CONTESTED`.
- **S.worker.1, `char` out of range**, where the two libraries disagree; and **Z.worker.1, `unsigned` of a negative value**, beside item 31 and row 502's question for `widen` (`PLAN.md:654-655`). Defaults: today's values.

The results that stand on a reading he has not confirmed:
- **The gate's 0 and 0 for the 76 of rung H** stand on way 2b, whose check is a composition through identities (split 1). The guards, not the checker, show that each names the unsigned helper.
- **The stages' reading of the 276 glue strings** stands on climb batch 23's fork 3 reading of P-58's refusal (item 309, open), as before.
- **Phase 3's zero over the fourteen** still stands on climb batch 22c's fork 8 reading of `var` (row 844; item 295, open, needed before the switch-over).
- **The code generator's reach to every header `where` clause** stands on fork 12 (split 3).
- The readings under the zero with climb batch 23's moved bindings, its forks 2 and 5, are his now (item 308, his "all defaults" of 08:21 UTC on 2026-10-31).

### The record's questions and forks, against what landed

| Question or fork | Rung | Landed |
|---|---|---|
| Question 1, the two bindings over `String` | S | Default; both on `StringPrim` (split 7) |
| Question 2, the hard set's way | H | Way 2b at the probe's default; 76 moved (split 1) |
| 1, seven rungs, none landing only with another; applied F, K, Z, S, W, G, H | all | Built; H's two hunks through `--3way`, clean |
| 2, `CHOOSE` on both widths in a rung of its own | K | Built; rows 521 and 855 closed |
| 3, walk's carry of `Float`, one line of `javaFor` | F | Built (`StaticNativeApp.java:51`) |
| 4, the declaring type told to the loader, `javaForSelf` | W | Built, with the self-first rule and no carrier for `FlatString` and `JavaString` (split 4) |
| 5, two guards per family | F, Z, S, K, H | Built; F's completed by its skeptic (224 and 207 assertions) |
| 6, the divisions by zero and the `XXX` tests for rows 336 and 848 | Z, H | Built; both rows' reproducers set |
| 7, the Effect rewritten by the gather, the specification built once and reused | gather | The Effect rewritten once; the PDF built again by the commit stage (finding 4) |
| 8, the 52 demos at the gather | gather | 52 of 52 |
| 9, the suites once after the last change of code | F, K, W, H | Kept but for W, which ran both suites twice (finding 4); G ran a subset of 35 `.test` files besides its own |
| 10, the stages once on each final tree; W, G and the gather none | F, Z, S, K, H | Kept; Z's count and S's distance once more each as a control on a misfit string, restored after |
| 11, `truncate` and `round` at `ZZ64` | F | Built |
| 12, row 701's `where` half only | G | Built; the object's and trait's guards too (split 3) |
| 13, G's tests | G | Built, with three tests beyond the list and the skeptic's four `XXX` tests (`RECORD.md:267`) |
| 14, no speed pass | all | Kept |
| 15, no declared count, crash or ladder move | all | Kept; nothing moved |
| 16, the rows | all | Built; G also rewrote rows 307 (a whole line), 812 and 677 |
| 17, `FlatString`'s 5 left out | S | Kept |
| 18, H moves 76 of the 82 | H | Built; six left with their rows |

### The global questions

- **Promised against landed.** All seven rungs, the 152 bindings as planned, rows 521, 847 and 855 closed and 336, 701 and 848 narrowed, the count and the distance 0 with every moved binding read. Beyond the plan: rows 862 to 872, of which the skeptics found seven (865 to 871).
- **The record's premises that failed:**
  - "for the next rung that edits the natives' rewrite; no rung of this batch does." (`CLIMB-BATCH-24.md:431` before the gather's correction): rung H edits it (H.worker.1);
  - fork 7's "the commit stage takes that build if no later commit changes `Specification/`" (`:112`): the script's commit stage builds the PDF whenever a landed commit changed `Specification/` (`coordinator/climb-batch-workflow.js:1620`), and the gather kept none (finding 4);
  - the gate's forecasts, about 713 and about 1,365, against 723 and 1,379;
  - the cost, about 6.7M and about 6 h, against 5.74M and 5 h 01 min;
  - Question 2's ways weighed without the identity cost (split 1).
- **Built twice: no.** The rungs share three library files and one Java file, and no declaration (`RECORD.md:24-33`).
- **The library's way: yes for each.** Every family hunk replaces one string with one; each helper computes its glue class's value, measured old against new by the workers and the skeptics.
- **Together.** On the merged tree W's check of `self` meets every moved binding, and the batch's walk tests with climb batch 23's pass in one JVM ('OK (38 tests)'); H's transfers meet S's and K's strings, and the compiled guards of all families pass together ('OK (51 tests)'); the 52 demos reach their end; the gate is green (`RECORD.md:35-53`).

### Findings

Ranked by what they cost or risk next, each with its home.

1. **The items for him that the routing owes, and PLAN lacks.** The gather routed the rungs' items (`PLAN.md:145`, `:652-658`) and the review its three tests (`:659-661`). Missing, as at climb batches 22c and 23 (their findings 3 and 1):
   - Question 2, taken at the probe's default and "On his review list" (`CLIMB-BATCH-24.md:92`), with split 1's cost;
   - Question 1, answered at its default from his scope (`:78`), one line pointing to item 310;
   - the forks 1 to 18 at their defaults (`:102-123`), fork 12's reach (split 3) among them;
   - the points for his sight (`:125-130`; `RECORD.md`, "Points to report"): the team lines changed, what walk and the compiled path now do differently, walk's float arithmetic through reflection;
   - the files outside the rungs' lists: G's worker's three tests and G's skeptic's four `XXX` tests (`RECORD.md:267`; the `coordinator` skill's `references/batch.md:51`);
   - the hard-set probe's Q2 and Q3, which the record gives "each a review-queue item for the routing after the landing" (`CLIMB-BATCH-24.md:425`; `plan-24/probes/hard-set.md:113-114`), and the CHOOSE probe's question on the specification's `CHOOSE` property at `m = n = −1` (`plan-24/probes/choose.md`, section 9; `CLIMB-BATCH-24.md:428`);
   - from the natives' shared-state audit, whether the compiled `drandom` must be deterministic and whether to build the systematic check (the boot note, "Waiting on him").

   The review queue holds none of them, and its head still names climb batch 24 "not yet planned" (`review-queue.md:8`, `:15`). The merged-diff review did not name them. Home: the routing.
2. **Way 2b's cost is not before him** (split 1). Question 2's text and the probe weigh the ways without it; skeptic H found it, and F-308 states it. It bears on every later binding over `NN32`, `NN64` or `Char`, whose guard alone will check the helper's sign. Proposed (mine): the review-queue item for Question 2 states it, with the way to keep the checker's check, a transfer that is not an identity, as the other side. Home: the routing; the skill (Part 3, item 3).
3. **A rung's file list held back a test that the skill asks.** Rows 865 and 866 have reproducer `none` because "This rung's files do not give it `compiler_tests/`" (skeptic W, `rung-natives-self/SKEPTIC.md:119-120`), and row 871 has none too. The skill's home 2 asks a gated `XXX` test "in the change that measured the defect", a program that the checker accepts and that fails linkage at run time among them (`.claude/skills/fortress-repo/references/tests-writing.md:84`). The coordinator skill lets a file outside a rung's section land, the file going on the review list (`references/batch.md:51`). Skeptic G wrote its four `XXX` tests outside its section's files (`RECORD.md:267`); skeptic W did not. The review routed the three tests to unnamed later batches (`PLAN.md:659-661`). Proposed (mine): the skeptic's brief says that a home-2 test outside the section's files is written in the rung and lands, its file on the review list. Home: the script's skeptic brief and the manual, between batches.
4. **Code states built or measured again.**
   - Rung W ran `ant testSystem` (4 min 12 s) and `ant testSpecData` (1 min 23 s) on `aa52279ea`'s code at 12:13:05 and 12:17:36, then changed its code at 12:24:14 and ran both again at 12:26:15 and 12:31:26 (its transcript, `runs.py` and `nohup.py`): about 5.6 minutes on a code state that its later change replaced, against fork 9's "once, after its last change of code" (`CLIMB-BATCH-24.md:114`). The change came from tests written after the first run (skeptic W, "What I checked", 2). Climb batch 23's rung C did the same.
   - The specification was built twice on one text: by the gather at 15:27:22 (54 s and 49 s), which then removed its build (`git clean -fXq -- Specification`, `RECORD.md:49`), and by the commit stage at 16:07:26 (49 s and 54 s), though no commit after `b71495ca4` (15:29:51) changed `Specification/` (`git log b0f6cd6b7..25238e60c -- Specification/appendices/changes.tex` lists `b71495ca4` and `c324b841c`). About 1.7 minutes. Fork 7's reuse is not in the script (climb batch 23's finding 4, met a third time, its stage half built).

   Proposed (mine): the gather keeps `Specification/fortress/fortress.pdf` when it builds, and the commit stage copies it when no later commit changed `Specification/`. Home: the script's gather and commit roles, between batches.
5. **The harness refused four workers' reports, and the record counts three.** The harness refused the `Write` of `REPORT.md` by rungs W (12:36:49), F (12:39:14), K (13:30:22) and S (13:35:48): 'Subagents should return findings as text, not write report files.' (`errs.py`). Rungs Z, G and H wrote theirs through a Bash heredoc and were not refused. The skeptics wrote the four from the run's journal: `06d32297f` (F), `755ea104f` (K), `3163eb21a` (S; `rung-natives-small/SKEPTIC.md:8`) and `cd562a9a0` (W). The gather's record says "On three branches ... F (`06d32297f`), K (`755ea104f`) and W (`cd562a9a0`)" (`RECORD.md:173`), and the review checked those three; the tree has four, so the tree rules. At climb batch 22c all four workers were refused, at 23 none. Proposed (mine): the worker's brief writes `REPORT.md` and `record.md` through a Bash heredoc. Home: the script's worker brief; the gather record's line, by the record writer.
6. **FACTS and POSITIONS the landing left false or stale.**
   - F-34 (`FACTS.md:31`): "Under the switch-over's setting the code generator refuses 52 declarations ... at 52 declarations at least". Four of the 52 were header `where` clauses at their first wall, two methods of `FortressLibrary`, `AnyList` and `NatParam` (`perf-probes/codegen-distance/REPORT.md:152-153`, `:211`), which rung G removed. The entry names rung G's change but keeps the count; the present count is unmeasured, and "at least" no longer holds.
   - F-306 (`FACTS.md:136`): "`REM` and `MOD` still name glue classes and end the run at a zero divisor (row 336)". For `ZZ` that is row 848 (row 336 holds `ZZ32` and `ZZ64`; row 848 holds `NN32`, `NN64` and `ZZ`).
   - F-240 (`FACTS.md:103`): "From climb batch 22's gate to climb batch 23's it stayed between about 150 s and 170 s": out of date, as the commit stage named.
   - F-299 at 2,789 characters, F-308 at 2,330 and F-298 at 2,156, past the record's 600 (`record.py check`).
   - POSITIONS: P-73, P-151 and P-156's two clauses (split 8), his text.

   Home: the record writer, by `record.py`; POSITIONS by his rule of 2026-10-31.
7. **The plan's lines that the batch's rows and its left-out bindings need.** Rows 862, 864, 868, 869, 870 and 872 have no PLAN line, nor do H's four left on glue classes with rows 326, 860 and 861, and `NN32`'s `CHOOSE`, one string now; the record puts H's six under "The families that wait on a known obstacle" (`CLIMB-BATCH-24.md:426`). Home: the routing (Part 4).
8. **Scratch in the session's shared scratchpad.** Eight of the 18 agents wrote files there: rungs W and Z and skeptics W and Z their briefing files, skeptics F and G code copies, the review and the commit stage scratch. Skeptics Z and W used one name, `slice1.txt`, at 13:36 and 13:59, one after the other; two skeptics ran at once all afternoon, so one name in one window could hand an agent another's briefing. Climb batch 22c's finding 8, met again in part. Proposed (mine): the briefs put every scratch file under the agent's own `tmp/`. Home: the script's briefs.
9. **The skill's load rose to 16.3 %** of writes, from 13.3 % at 23: 787K of part reads over 254 calls, 52K an agent. No proposal of mine; the process study's to weigh.
10. **The rewrite's limits read from the code pass on again.** Rung H edited the rewrite and did not take rung C's limits, since its section did not name them (H.worker.1, `PLAN.md:658`); it added three limits of its own, read and not measured (`rung-natives-hard/REPORT.md:154-159`), the simple-name reading with no home but the report; skeptic W measured another, row 865. Proposed (mine): one PLAN line for the next rewrite rung that gathers rung C's limits, review-routed.1 of climb batch 23, H's three and row 865. Home: the routing, beside H.worker.1.
11. **Two slips of the boot note** (`b468b9d62`): "about 6.2M written by the harness's count" is not the record's measure (5.74M of writes); and "`fortress-gather24` and the seven rung worktrees (to remove after the review)": the commit stage removed the seven (its result), and `git worktree list` shows only `fortress-gather24` of the batch's trees. Home: the boot note.

## Part 2. Did the practice hold

### The skeptics' fixes

From the journal's results, each `SKEPTIC.md` and each branch's log (`git log b0f6cd6b7..origin/wip/<slug>`): 18 fix commits, all corrections, none contested; no defect of a change fixed.

| Rung | Fix commits | Defects of the change | Test first, the skeptic's reading of the worker's transcript |
|---|---|---|---|
| F | `06d32297f` (the worker's files from the journal), `fc709e881` and `0f44ee9e8` (the guards, 78 walk and 67 compiled assertions at the values the section asks), `fc1fbb742` (the report's claims of the guards) | 0 | red on the base at 11:48:44, 'Tests run: 2,  Failures: 2' ('no Java type carries the declared type of parameter a.'); the patch at 11:59:44, built at 12:00:15; green at 12:30:47 |
| K | `755ea104f` (the worker's files), `17929b443` (one comment line in six tests), `603a98bd6` (a patch citation) | 0 | red at 12:52:00 to 12:52:46, 'Tests run: 5,  Failures: 2' and 'Tests run: 7,  Failures: 3'; the race by scratch copies, 3 of 3 on each path; the first code edit at 13:00:49; green at 13:05:24 |
| Z | `e4f1e168b` (the record on the prelude's `BOX` spellings) | 0 | red at 11:18:46 to 11:18:58, 'Tests run: 4,  Failures: 2'; the patch at 11:22:16; green at 11:34:04 |
| S | `3163eb21a` (the worker's files), `b8f67a725` (rows 856 and 857, a `tmp/` citation) | 0 | no failing run, by design: every test guards a value that the move keeps, and the distance control, '#total 2', shows the move |
| W | `cd562a9a0` (the worker's files), `383ce4e40` (citations, row 846 as a rewrite, F-299's row-551 sentence), `44abf09e8` (row 865), `b0c050f2c` (row 866) | 0 | red on the base at 12:06:00, 'Tests run: 5,  Failures: 3'; the patch at 12:06:37, built at 12:07:03; the later tests red on the old code and on the first build before the second edit (12:23:36, 12:23:49); green at 12:25:44, 'OK (15 tests)' |
| G | `4efc2097d` (four `XXX` tests, rows 867 to 870), `de6c58978` (the record's breadth, F-270, the rows), `24911dd6e` (row 871's second face) | 0 fixed; row 867 a consequence of the change, deferred with its `XXX` pair | red on the base at 12:46:01, 'Tests run: 10,  Failures: 9', and the object at 12:47:21; the edit at 12:47:41; the trait-method test written after the fix and red on the old code; green at 12:55:56, 'OK (18 tests)' |
| H | `4af5d05bc` (the FACTS hand-over: only `self` in a generic owner goes without a transfer; the failure mode; F-24) | 0 | red on the base at 11:21:12, 'Tests run: 6,  Failures: 2', and compiled at 11:25:32, 'File NativeHelperTransferCompiled.fss has 71 errors.'; the patch at 11:26:46, built at 11:27:34; green at 11:29:41 and 11:30:14 |

- Every fix stays inside its rung's work. The review checked 17 of the 18 as applied (`fixesChecked`); it did not list `3163eb21a`, the worker's text written from the journal (finding 5).
- Against the batches before: 23 made 4 with 0 defects, 22c 14 with 1, 22 8 with 0, 21b 7 with 1, 21 13 with 1, batch 20 11 with 0.
- Four of the 18 are the worker's own files written from the journal, and five more add rows that the skeptics' programs measured (865 to 871): the skeptics found seven of the eleven new rows.

### Workers, test first

From each skeptic's reading of its worker's transcript (the table above, and each `SKEPTIC.md`, its section on the order): every worker saw its tests fail on the base's code before its edit, or, for S, saw its guards pass by design and showed the move by the stage's control. No miss of order. Rung W wrote three tests after its first build (the generic one at 12:10:13, the `FlatString` and `JavaString` ones before 12:23:36), saw them fail on the old code, the last two on that build too, and only then made its second edit; rung G wrote one test after its fix and saw it fail through the base build's harness, which the skill allows for a tree that already holds the fix (`tests-writing.md`, "The order", step 2, as skeptic G cites it).

### The merged-diff review

- Approved: nothing blocking. Five corrections in `84ae87a27` and three tests routed (review-routed.1 to .3); 17 fixes checked as applied.
- It did not name: the items for him that PLAN lacks (finding 1), the identity cost of Question 2 (finding 2; it listed the point as reached, not as an item), the test held back by a rung's file list (finding 3; it routed the tests), W's suites run twice and the specification built twice (finding 4), the fourth journal commit (finding 5), F-34's count, F-306's row and P-156's second clause (finding 6), and the rows without a PLAN line (finding 7).
- Cost: 366K beside the gate, 19.9 minutes.

### Builds and runs, repeated or not

- **Builds:** one for each code state: F, K, G and H once each, W twice on two code states, Z and S none; the gather once on the merged tree; the gate once on `main`, the gather's code. No skeptic built (`runs.py`; `batch-measures.py`).
- **Suites:** H and K `ant testQuick` and `ant testSystem` once on their final code; F `ant testSystem` and `ant testSpecData` once; W both twice, the first pair on a replaced code state (finding 4); Z, S and G their own tests through the harness, G also a subset of 35 compiled `.test` files, 'OK (55 tests)'; no skeptic and not the gather. The gate ran `testFast`, `testSystem` and `testSpecData`.
- **The stages:** F, K, Z, S and H once each on their final trees; Z's count and S's distance once more each, with one or two strings pointed at a wrong helper and restored after: a control on a new code state, which shows that the stage reads the moved bindings; no skeptic, since no rung changed the checker's code; not the gather (fork 10); the gate once.
- **The demos:** the gather, 52 of 52 from the first.
- **The specification:** the gather once on its final text, the commit stage once on that same text (finding 4).
- **The ladder subset:** each family rung ran the five ladder files whose first error names `builtinPrimitive` on its own tree; no move.
- **Walk old against new:** each skeptic's own programs against the old code through `old-fortress.sh`, at one and four threads (each `SKEPTIC.md`, its differential); the workers' value programs, from 47 lines (S) to 2,933 (H), `diff` empty but for the divisions by zero.
- **Taken from the record, not run again:** climb batch 23's tables as every rung's before; the planner's runs on the base; the base build `/home/user/fortress-base23` at `1f5c49b4f`, whose code is the base's, as the old code.

### Refusals by the harness and the tools

- **Four workers' writes of `REPORT.md` refused** by the harness, F, K, S and W (finding 5). No other write was refused, and no call was refused for a file not read first.
- **One `StructuredOutput` refused** as JSON that did not parse (skeptic K, 14:47:44), sent again.
- **One row refused for length:** rung G's draft of row 812, its notes cell at 717 of 700 characters (`ledger.py check`, 13:03:52); G gave the row a whole new line. Rows 846 and 307 went in by rewrites, where a note would have passed the limits (`RECORD.md`, "Ledger notes").
- No refusal cost a cache refill, and none made a refusal cycle.

### The commit stage's fold of FACTS

Its brief asks for the landed figures, numbers only, by `record.py set` (`climb-batch-workflow.js:1620`). It changed F-53's title from climb batch 23's to 24's, kept its totals at 0, and wrote F-240's two figures: the count stage about 150 s by the file times of the gate's log, the distance stage 198 s (`FortressLibrary` 152 s) at load 1.84 against 240 s (174 s) at 1.54. It named F-240's sentence on climb batches 22 to 23 as out of date (its result). Climb batch 22's finding 4, that the commit stage write F-240, is built (`40302280c`, 2026-10-30). `record.py check --base 84ae87a27` printed 0 failures (its result).

### The practice's measures, batches 20 to 24

| Measure | B20 | B21 | B21b | B22 | B22c | B23 | B24 |
|---|---|---|---|---|---|---|---|
| Written | 2.64M | 4.75M | 3.50M | 2.82M | 4.61M | 3.20M (2.44M finished) | 5.74M |
| Rungs, agents | 2, 8 | 4, 14 | 3, 10 | 3, 10 | 4, 15 | 2, 11 (8 finished) | 7, 18 |
| Launches killed by restarts | 0 | 0 | 0 | 0 | 0 | 3, 0.76M, 23.9 % | 0 |
| Per rung, all roles | 1.32M | 1.19M | 1.17M | 0.94M | 1.15M | 1.60M (1.22M finished) | 0.82M |
| First calls | 0.47M, 7 cold | 0.68M, 8 cold | 0.51M, 7 cold | 0.47M, 6 cold | 0.76M, 9 cold | 0.58M, 8 cold (0.43M, 6) | 0.75M, 7 cold |
| Refusal cycles | 0 | 0 | 0 | 0 | 1 rung, 3.2 % | 0 | 0 |
| Rulings and repairs on the merged tree | 0 | 8.3 % | 0 | 0 | 9.7 % | 0 | 0 |
| Skeptic fix commits (defects) | 11 (0) | 13 (1) | 7 (1) | 8 (0) | 14 (1) | 4 (0) | 18 (0) |
| Distance | 26 sites gone | 0 gone (full check 186) | 0 | 5 gone, to 0 | 0, over 14 under `compile` | 0, the 21 moved bindings checked | 0, 173 moved bindings checked |
| Count stage at the gate | 63 s | about 78 s | about 90 s | about 150 s | about 170 s | about 155 s | about 150 s |
| Distance stage at the gate | 161 s | 206 s | 235 s | 227 s | 238 s | 240 s | 198 s |
| Skill's load | 9.8 % | 10.4 % | 11.3 % | 12.5 % | 13.6 % | 13.3 % (11.6 % finished) | 16.3 % |
| Briefing, estimated | 3.4 % | 4.1 % | 3.2 % | 4.2 % | 4.0 % | 5.4 % (4.3 % finished) | 4.2 % |
| microGPT quick pair, verdicts | 7 of 7 both | 7 of 7 both | 7 of 7 both | 7 of 7 both | 7 of 7 both | 7 of 7 both | 7 of 7 both |

The rows of B20 to B23 are `reviews/batch-23-review.md`'s; `batch-measures.py` on the seven runs gives the same totals.

### Climb batch 23's findings, a batch later

1. The items for him that its routing owed: routed (review-queue items 306 to 317; PLAN, "Climb batch 23, listed for his review"); 306, 307 and 308 answered by his "all defaults" of 08:21 UTC on 2026-10-31 (`review-queue.md:1984-1986`). This batch's are missing again (finding 1).
2. A resumed agent told nothing of its earlier launch: built in the script (`40302280c`, "a resumed rung worker is told its earlier launch's head"; `climb-batch-workflow.js:782`); no restart came, so it was not met.
3. F-240 false at a fifth landing, P-39 and `batch.md:56`: F-240 is now written by the commit stage (Part 2, its fold); P-39 now says "Until the switch-over lands, every batch's gate also measures the distance" (`POSITIONS.md:36`); `.claude/skills/coordinator/references/batch.md:56` is still false (Part 3), his yes on wording owed.
4. Code states measured again: the gather ran no stage (fork 10), built; the specification built twice, met again; a rung's suites on a replaced code state, met again in rung W (finding 4).
5. Rung C's other limits: one PLAN line (`PLAN.md:642`); rung H edited the rewrite and passed them on (H.worker.1), and row 865 adds one (finding 10).
6. The plan's lines for rows 845, 847 and 848 and N1's sub-item for the 109: routed; row 847 is now closed, row 848 narrowed, and 76 of the 109 moved.
7. Row 848's reproducer `none`: the skill now puts a crashing, text-settled defect under home 2 (`tests-writing.md:84`), and rows 336 and 848 have `XXX` reproducers (Z, H). Met again in another form for rows 865, 866 and 871 (finding 3).
8. The manual's rule 4 for row 849's case: unchanged (`climb-batch-workflow.md`, "Rules weighed ...", 4); met again for row 865 (split 5).
9. Two record slips: row 845's "found by" now names rung C's skeptic; the row 560 pointers in `CLIMB-BATCH-23.md` are still there (6 lines by `grep -c 'row 560'`), owed by the boot note ("Next, for the coordinator", 2).

### Misses, by kind

Numbered on from `batch-23-review.md`'s 844.

Found inside the batch:
- **The planner's text wrong, caught before landing:**
  - 845, `rung-W.patch` let a program's own `FlatString` or `JavaString` carry `self`, 'answered 10' (worker W; `NativeHelperUncarriedSelfFlatStringWalk`, `...JavaStringWalk`);
  - 846, `rung-W.patch` took an overload without `self` first under a declaring type (worker W, `StaticNativeApp.java:147`, `:154`).
- **A test that reached too little:**
  - 847, `Float`'s two guards without the values the section asks (skeptic F, `fc709e881`, `0f44ee9e8`).
- **A defect without its home:**
  - 848, rows 865 and 866 (skeptic W, `44abf09e8`, `b0c050f2c`);
  - 849, rows 867 to 871 (skeptic G, `4efc2097d`, `de6c58978`, `24911dd6e`);
  - 850, H's failure mode, the identities, not in the record's FACTS hand-over (skeptic H, `4af5d05bc`).
- **Text claiming more than the code or the evidence:**
  - 851, F's report on its guards (skeptic F, `fc1fbb742`);
  - 852, Z's record, "those the compiler's prelude binds for the same operations" (skeptic Z, `e4f1e168b`);
  - 853, G's record, every header `where` clause "compiles and runs" (skeptic G, `de6c58978`);
  - 854, H's record, no transfer in a generic owner (skeptic H, `4af5d05bc`);
  - 855, S's rows 856 and 857 and a `tmp/` citation (skeptic S, `b8f67a725`);
  - 856, K's and W's citations (skeptics K and W, `603a98bd6`, `383ce4e40`);
  - 857, F-298's moved citations, F-303's 26 of 32, F-305's swapped citations, F-24's comma (the review, `84ae87a27`).
- **Sentences made false and not listed:**
  - 858, F-270 in G's record (skeptic G) and F-24 in H's (skeptic H).
- **The record's premises:**
  - 859, the record's line that no rung of the batch edits the rewrite (`CLIMB-BATCH-24.md:431`; worker H, the gather's correction);
  - 860, the gate's forecasts and the cost and time estimates (the gate; this review).
- **Process:**
  - 861, four workers' `REPORT.md` writes refused by the harness;
  - 862, rung W's suites on a replaced code state;
  - 863, the specification built twice on one text;
  - 864, the disk at 1.8G free during the run (the boot note);
  - 865, rows 865, 866 and 871 left at reproducer `none`, two of them for a rung's file list.

Found by this review: 866 to 876, findings 1 to 11 above.

**Against the earlier notes.**
- 21 found inside the batch (845 to 865), against 23's 26 and 22c's 35.
- None was a fault of a change that landed. The planner's two faults were caught by worker W before its tests went green; the skeptics' fixes were corrections and new rows. The batch landed with no known wrong value in a moved binding.
- The known costs: the check of the 76 now rests on their guards (split 1); a compiled call through a `where`-clause variable links and dies (row 867); walk's other divisions by zero still end the run (rows 336, 848); a helper string in a local function or an object expression is not rewritten (row 865); a program's extender of `ZZ32` compiles and dies at class load (row 866); `FlatString`'s bindings wait on item 63.

## Part 3. Skill sentences the batch made false

For the skill writer. The record lists its sentences in `RECORD.md:300`: `interpreter.md:92-94` and `:100` (F), `:103` and the refusals above it (W), the sentence on `ZZ32`'s `DIV` by zero (Z, H), `compiler.md:85` (H), `compiler.md:44`, `:103`, `:110` and `revival-changes.md:67` (G), and `sources.md:931` and `:941` (W). The writer's first task changed all of them but `revival-changes.md:67` in `453898c32` (16:22:09 UTC on 2026-10-31; local, not pushed, `origin/main` at `b468b9d62`); its brief left `revival-changes.md` to the orientation update (the boot note, "Running"). I read each sentence below on `main` at `453898c32`, the head when I read it.

**Fixed by the writer, checked at the head:**
- `fortress-repo/references/interpreter.md:94`: `Float` in `double`, true (`StaticNativeApp.java:51`).
- `interpreter.md:97-107`: the carriers of `self`, the refusal 'no Java type carries Holder, the type of self.', and the overload with `self`'s Java type first; "Walk does not check `self`" is gone. True of `StaticNativeApp.java:81-160`.
- `interpreter.md:118`: "`DIV` by zero on `ZZ32`, `ZZ64`, `ZZ`, `NN32` and `NN64` raises `DivisionByZero` in this way." True (F-24).
- `compiler.md:44`, `:103`, `:110`: the code generator compiles a declaration's own `where` clause and emits nothing for it; row 867's call dies. True of `CodeGen.java:2966-2972`, `:4103-4111`, `:5022-5027`.
- `compiler.md:85`: the transfers and the overloaded helper. True, but see item 5.
- `sources.md`: the moved lines, the renamed test, and a section "Climb batch 24's landing, 2026-10-31".

**False:**
1. **`fortress-repo/references/revival-changes.md:67`:** "The code generator refuses a declaration with a `where` clause of its own (row 701)." Since rung G it compiles one and emits nothing for the clause (`CodeGen.java:2966-2972`, `:4103-4111`, `:5022-5027`); row 701 holds contracts only (F-181). On the record's list; the orientation update's admission names it too (`compile-ladder/climb-batch-24/orientation/admission.md:20`, not yet committed). Proposed: "The code generator compiles a declaration with a `where` clause of its own and emits nothing for the clause; a compiled call of a function or method whose own clause introduces a `where`-clause variable links and dies (row 867)."
2. **`coordinator/references/batch.md:56`:** "The gate reports the checker count in every batch, and the distance in phase 3." False since climb batch 23: P-39 now says "Until the switch-over lands, every batch's gate also measures the distance" (`POSITIONS.md:36`), and this phase 4 gate ran it. Proposed, as climb batch 23's review gave it: "The gate reports the checker count in every batch, and the distance in every batch until the switch-over lands." The coordinator skill is edited only with his yes on its wording (the boot note, "Still open, smaller").

**Made misleading, not on the record's list:**
3. **`revival-changes.md:71`:** "Such a call runs compiled only after the switch-over." Read by the part's own rule for a switch-over limit ("The limit ends when the compiled path moves onto the interpreter's library", `:7`), it says that the switch-over is the only wall in front of `reflect`. Since rung G the trait compiles, and a compiled call that opens its value to the size fails the JVM's verification (row 307; F-270; `compiler_tests/XXXNatOpenRun`), a wall that the switch-over does not end. Before rung G, `:67` covered the case. The orientation's admission found it (`orientation/admission.md:21`). Proposed: "Such a call runs compiled only after the switch-over, and then only once row 307 is fixed: a compiled call that opens the value to its size fails the JVM's verification."

**Incomplete, made so by the batch:**
4. **`compiler.md:70-75`,** the compile's stops: nothing on row 865, which rung W's skeptic measured. The rewrite reaches a component's declarations and its traits' and objects' members only (`BuiltinPrimitiveRewriter.java:54-86`), so a helper string in a local function or an object expression's method stays a call of `builtinPrimitive` and stops 'Variable builtinPrimitive is not defined.' Proposed, a fourth stop: "If the declaration is a local function or a method of an object expression: the same message (ledger row 865)."
5. **`compiler.md:85`,** the transfers: it says where the rewrite adds a transfer, not what the check then reads. The transfers are identities, so the checker accepts a binding over `NN32`, `NN64` or `Char` whatever helper it names, a signed one included, and only a test shows that a binding names the unsigned helper (F-308; `rung-natives-hard/SKEPTIC.md:112-134`). And in a generic trait or object, `self` gets no transfer (F-308; `BuiltinPrimitiveRewriter.java:91`). Proposed, after the paragraph: "The transfer helpers return their argument, so the checker reads the composition and no longer checks that the helper is the unsigned one: a binding over `NN32` that names `simpleIntArith.intLT` compiles. Assert each moved binding's values in a guard on both paths. In a generic trait or object, `self` gets no transfer."
6. **`interpreter.md:102-107`,** the refusals at load: two departures that the batch measured are missing. A dotted method of a generic trait or object is refused only where an instance's method is made, so a program that makes no instance loads (row 864); and a program's object that extends a carried trait against its `comprises` clause still reaches the helper with a value that no Java type carries (row 551; F-299). Proposed, after the list: "Walk refuses a binding in a dotted method of a generic trait or object only where it makes an instance's method (ledger row 864). It reads the declaring type, not the value's, so a program's object that extends `ZZ32` reaches a helper of `ZZ32` with a value that no Java type carries (ledger row 551)."
7. **`interpreter.md:97-100`,** the carriers of `self`: `FlatString` and `JavaString` carry none, so a library binding in a method of `FlatString` that names a helper stops every program at load, 'no Java type carries FlatString, the type of self.' (skeptic W, "For the curator"; item 63). The next string family meets it. Proposed, after the list: "So a library binding in a method of `FlatString` cannot name a helper yet (PLAN item 63)."

**Sentences that hold, met by the batch:**
- `interpreter.md:89`, "Most bindings name one" (a glue class): 276 of 449.
- `library.md:56`: "Write a glue class ... only where no Java type carries a declared type" and "Most of the library's bindings still name glue classes": true, and climb batch 23's item 8 is built.
- `tests-writing.md:84`, home 2, with a crash and a run-time linkage failure under it: the rule that rows 865 and 866 needed (finding 3).
- `compiler.md:164`, the count stage "about 150 seconds, more under load": 152 s at this gate.
- `gate.md:3`, "in about 25 minutes": 24.1 minutes.
- `SKILL.md:62`, both paths' tests for a helper that a library string names: rung K ran both paths' suites.
- `coordinator/references/batch.md:49`: no rung changed the checker's code, and no skeptic ran a stage.
- `coordinator/references/batch.md:51`: a file outside a rung's section lands and goes on the review list; held for rung G, not used by rung W's skeptic (finding 3).

## Part 4. Routing

Checked against `main` at `453898c32`: the gather's PLAN entries (in the rung commits), the review's (`84ae87a27`), the boot note (`b468b9d62`), the skill writer's first task (`453898c32`) and the review queue. The manual's routing (`coordinator/climb-batch-workflow.md`, "After the landing: the coordinator's routing") runs after this review, by the boot note ("Running").

**Step by step:**
1. The landing report: for after the landing's steps (the boot note, "Next, for the coordinator", 1).
2. The routing: not run yet. What it owes is below.
3. FACTS: the commit stage folded F-53 and F-240; F-34, F-306 and F-240's one sentence are owed (finding 6).
4. The skills: the writer's first task is done, not pushed (`453898c32`); Part 3 is its second task; the orientation update (`wf_dee119dd-d4e`, its folder untracked) gives `revival-changes.md`'s sections; then a cold read, the writer's fixes and the push.
5. The next batch, after step 4.
6. This review.

### What the record listed for him, and PLAN lacks

- **Question 2, the hard set's way:** taken at the probe's default under his half-hour rule; the record says "On his review list" (`CLIMB-BATCH-24.md:92`), and the boot note waits on it ("Waiting on him"). No PLAN line, no review-queue item. One entry, consequential, default as landed, with split 1's cost (findings 1 and 2).
- **Question 1:** answered at its default from his scope (`:78`). One line, pointing to item 310, which holds his exclusion of the bindings over `String`.
- **The forks 1 to 18 and the points for his sight** (`:102-130`): no entry. Climb batch 23's routing wrote such entries (review-queue items 315 and 316; `PLAN.md:644-645`). One entry each, default as landed; fork 12's reach (split 3) and fork 7's reuse that the script lacks (finding 4) named in the forks' entry.
- **The files outside the rungs' lists:** rung G's worker's `WhereBoundObjectCompiled.fss`, `WhereBoundTraitMethodCompiled.fss` and `XXXFunctionContractCodeGeneration.fss`, and its skeptic's `XXXWhereVariableCallCompiled.fss`, `XXXWhereVariableMethodWalk.fss`, `XXXWhereVariableObjectWalk.fss` and `XXXGenericMethodTraitWhereWalk.fss` (`RECORD.md:267`). One line, routine, default as landed. Climb batch 23's precedent is item 317.
- **The hard-set probe's Q2 and Q3** (`plan-24/probes/hard-set.md:113-114`): the record gives each as "a review-queue item for the routing after the landing" (`CLIMB-BATCH-24.md:425`). Q2, the way for the 27 of the 109 that no way of this batch reaches; Q3, whether P-58's bare form admits a converting declaration. No default on record for either.
- **The CHOOSE probe's question** on the specification's `CHOOSE` property, false at `m = n = −1` (`plan-24/probes/choose.md`, section 9; `CLIMB-BATCH-24.md:428`): a defect of the text, a `CONTESTED` row if he wants it recorded.
- **From the natives' shared-state audit** (`723cb707c`): the compiled `drandom`'s determinism (default: record and do nothing) and the systematic check (the boot note, "Waiting on him"). The boot note plans review-queue items for them.

### The items of the rungs, the gather and the review

- Item 63, W.worker.1 and W.skeptic.1, `PLAN.md:145`: no default. Sound; it is needed before `FlatString`'s five move, and the skill should say so (Part 3, item 7).
- F.worker.1 and F.skeptic.1 (row 863), `:652`: default the row `CONTESTED`. Sound.
- K.worker.1 and K.skeptic.1, `:653`: told, P-73's clause. Sound.
- Z.worker.1 and Z.skeptic.1, `:654`: default today's values. Sound; it sits beside item 31 and row 856's question, keep the low bits or raise.
- S.worker.1 and S.skeptic.1 (row 857), `:655`: default today's behaviour. Sound.
- G.skeptic.1 (row 867), `:656`: default as landed. Sound.
- gather.1, `:657`: told, two sentences. It should name P-156's second clause too (split 8).
- H.worker.1 and H.skeptic.1, `:658`: default, the next rung that edits the rewrite. Sound; H's three limits and row 865 belong beside it (finding 10).
- review-routed.1 to .3, `:659-661`: tests owed for rows 865, 866 and 871. Sound; finding 3 is their cause.

### New rows

- 862, the compiled path's radix-point numeral rounded more than once (code generator): no line. With the code generator's rungs of phase 4.
- 863: F.worker.1.
- 864, walk's refusal of a generic type's dotted method only at its instance: no line. With item 63, a walk rung of the natives.
- 865: review-routed.1; with rung C's limits (finding 10).
- 866: review-routed.2.
- 867: G.skeptic.1.
- 868, 869 and 870, walk's defects of a `where`-clause variable and of a generic dotted method's `where` clause: no line. A walk rung of P-151's forms, beside row 774's walk rung.
- 871: review-routed.3.
- 872, `Char`'s `asString` past U+FFFF on both paths: no line. With the string family.
- Rewritten 336 and 848, `REM` and `MOD` by zero: N3's new helpers, as the natives line has it; now with their `XXX` reproducers.
- Rewritten 860, and 326 and 861: H's four bindings left on glue classes wait on them (fork 18); no line names them. With `NN32`'s `CHOOSE`, one string now, in "The families that wait on a known obstacle".
- Rewritten 701: its contract half, the code generator's rungs; 307, 812 and 677: unchanged homes.

### Answered, stale or overlong in the record

- **PLAN's "Where we stand"** (`PLAN.md:9-13`): "Runs" ends at climb batch 23; the live thread gives 23's gate, its 21 bindings and F-240's old figures; "Landed" ends at climb batch 23; "Next" launches climb batch 24 after 23's skill steps. All want this landing: 152 bindings moved, 173 of 449 on helpers, the count and the distance 0, and climb batch 25 next.
- **Phase 4's line for climb batch 24** (`:46`): "not yet planned". One line, with `25238e60c` and this review.
- **Phase 4's natives line** (`:47-57`): its "Since climb batch 23, 21 bindings name helpers and 428 still name glue classes" is now 173 and 276; N1 and N2's "The 83 left" is now 7; the 109's "Asked, with no default on record: which way each takes" is answered for 76 by Question 2, with the rest under the probe's Q2 and Q3; "The families that wait on a known obstacle" holds `ZZ32`'s `CHOOSE`, `ZZ64`'s and `ZZ`'s `DIV`, row 848's `DIV` half and row 847, all built, and lacks H's six (finding 7). These parts move word for word to `PLAN-history.md` under the landing's heading.
- **Phase 4's line on the compiled defects** (`:52`): "`CHOOSE` past its helper's safe-bound table raises `IntegerOverflow` (row 521)" and `XXXChooseTableCompiledRungE` "promoted when it passes": built (rung K).
- **Phase 4's code-generator line** (`:59`): "a header `where` clause (row 701)" among the kinds of the 52, which rung G removed; and **the row 701 line** (`:60`): the `where` half built, the contract half left. The gather left both to the coordinator (`RECORD.md:297`).
- **"Climb batch 23, listed for his review"**: the entry for the post-batch review's finding 7 (rows 336 and 848's reproducers, `PLAN.md:643`) is built by rungs Z and H, and moves.
- **The review queue:** its head names climb batch 24 "not yet planned" (`review-queue.md:8`, `:15`); it wants climb batch 25, and this batch's items (finding 1).
- **FACTS:** F-34, F-306 and F-240's sentence (finding 6). F-24, F-32, F-53, F-111, F-132, F-180, F-181, F-270, F-281, F-298, F-299 and F-303 to F-308 hold, read against the tree; F-299, F-308 and F-298 are past the record's 600 characters, as `record.py check` reports.
- **POSITIONS:** P-73, P-151 and P-156's two clauses (split 8), his text. P-58, P-39, P-33 and P-37 hold.
- **The manual:** rule 4 (climb batch 23's finding 8, met again with row 865); the script's commit stage and fork 7 (finding 4); the skeptic's brief on a test outside the section's files (finding 3); the worker's brief on writing its report (finding 5). Its stage times, "about 5 minutes" for the count and "about half an hour" for the distance (`climb-batch-workflow.md`, "The checker count, and a rung whose test is that stage"), were stale before this batch: 150 s and 198 s here.
- **The batch's own record:** `RECORD.md:173` counts three journal commits where the branches hold four (finding 5).
- **The map's B.12:** its `NativeApp.java:194-201` and `:164-223` are now `:200-207` and `:164-229` (`RECORD.md:299`).
- **The boot note:** two slips (finding 11).

### The steps due before the next batch

1. **This review committed,** with its INDEX line; then the routing above: PLAN's "Where we stand", phase 4's line for climb batch 24, the natives line, the compiled-defects line, the code-generator and row 701 lines, the climb batch 23 entry that is built, lines for rows 862, 864, 868 to 870 and 872 and for H's six, a line for the rewrite's limits beside H.worker.1, and review-queue items for Question 2 with its cost, Question 1, the forks, the points, the files outside the lists, the probes' Q2, Q3 and `CHOOSE` property, and the audit's two; the review queue's head.
2. **FACTS and POSITIONS:** F-34, F-306 and F-240's sentence by `record.py`; P-73, P-151 and P-156's two clauses under his rule of 2026-10-31, each named to him; `RECORD.md:173`'s count.
3. **The skills:** the writer's second task with Part 3, `revival-changes.md:67` and `:71` with the orientation's sections, a cold read of the writer's changes, the writer's fixes, and the push of `453898c32` and after, before the next batch's planner is briefed (the manual's routing, steps 4 and 5); `batch.md:56` with his yes on its wording.
4. **The script and the manual, between batches:** finding 3's skeptic brief, finding 4's specification build, finding 5's report by heredoc, finding 8's scratch under `tmp/`; and climb batch 23's finding 8, rule 4's case.
5. **For him, with defaults:** Question 2 (as landed, its cost stated); Question 1 (as landed, with item 310); the forks and points (as landed); item 63 (no default); F.worker.1 (the row `CONTESTED`); G.skeptic.1 (as landed); S.worker.1 and Z.worker.1 (today's values); the probes' Q2 and Q3 (no default); the `CHOOSE` property; `drandom` and the systematic check; gather.1 and K.worker.1 (his text); and the items the zero still rests on, 295 and 309.
6. **The next batch,** by the record's "After the landing" (`CLIMB-BATCH-24.md:629`): `NN32`'s `CHOOSE`, one string now; H's four as rows 326, 860 and 861 are fixed; the string family after items 310 and 63, `FlatString`'s five and the two top-level bindings; the rest of the 109 after Q2 and Q3; beside them N3's `REM` and `MOD` helpers (rows 336, 848) and the integer conversions after his answer (the boot note, "Waiting on him"). A family rung over `NN32`, `NN64` or `Char` needs its guards to check the helper's sign (split 1).

## What I did not do

- I built nothing and ran no Fortress program, suite, stage or JVM. I changed no file of the tree but this review, and committed nothing.
- I read the run's transcripts only through scripts: `batch-measures.py` on seven runs and `transcript-study/skill-load.py` on this run, and scratch scripts in `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/rev24/`: `agents.py`, `brief2.py`, `calls.py`, `errs.py`, `runs.py`, `nohup.py` and `upto.py`, copied unchanged from climb batch 23's review's `rev23/`, and two new ones, `teststeps.py` (the steps of the compiled `.test` files at each rung commit, by `git show`) and `tokens.py` (writes, output tokens and cache reads of a run).
- I ran `record.py check --base b0f6cd6b7` and `ledger.py landing-check b0f6cd6b7` ('0 failures'; 'no finding'), `facts-extract.sh`, `grep`, `diff` and `git`, which write nothing.
- I read the orientation update's untracked `admission.md` for Part 3, and cite it as not committed.
- The stages' gate times come from the gate's call times and the commit stage's file times. I compared no walk timing, and no microGPT seconds.
- I did not read the coordinating session; what he was told comes from PLAN, the boot note and the record. The INDEX line for this review is the coordinator's.

## For the curator

Climb batch 24 landed on 31 October and is pushed. It is the second batch of the natives, the library functions whose bodies are Java. It moved 152 more of them onto Java methods that both the interpreter and the compiler can call, so 173 of the library's 449 now do: the floating-point type's 30, the 64-bit and the unbounded integers' 36, the two binomial coefficients, eight small ones, and 76 over the unsigned integers and the character type. Under the interpreter, an integer division by zero on the 64-bit, unbounded and unsigned types now raises the library's DivisionByZero exception, as the specification says; the remainders by zero still end the program. The compiled binomial coefficients now raise IntegerOverflow where they used to crash, and no longer give wrong answers when called in parallel. The interpreter now refuses, when a program loads, a Java method bound in a method of the program's own type. The code generator now compiles a declaration whose own header has a where clause.

The gate, the full check of the merged tree, was green. The compiled checker still finds no error in the fourteen core components, now with all 173 moved functions checked against their Java methods. Both quick microGPT checks passed 7 of 7 under the interpreter. The run wrote 5.7 million tokens in 5 hours, under the plan's 6.7 million and 6 hours, with no restart.

Please look first at the batch's second question, taken at the probe's default under your half-hour rule. For the 76 functions over the unsigned types and the character type, the compiler wraps each Java call in the team's six conversion helpers. These helpers return their argument unchanged. So the checker now accepts such a function whatever Java method it names: a function over unsigned integers that names the signed comparison compiles and gives a wrong answer. The batch's tests show that each of the 76 names the right method, but for later functions of these types only their tests will. The batch's record did not weigh this; the batch's own checker of rung H found it. The default is as landed.

One question must be answered before the five functions of the library's flat string type move: the interpreter now finds the Java form of a method's type by the type's name, and a program may give its own type the name FlatString, so the batch gives that type none. Should the interpreter identify the type by its declaration instead? There is no default.

The other items wait on nothing, and each keeps what landed by default. The specification says that a floating-point division by zero gives NaN, where both paths and the team's own code give an infinity. A compiled call through a where-clause variable, which the code generator used to refuse, now compiles and fails when it runs. The unsigned conversion of a negative integer, and the character of a number outside the code points, are not specified; the two libraries disagree on the second. The coordinator's filing after the landing still owes you entries for the batch's two questions, its eighteen small choices taken at their defaults, the probes' two questions on the remaining functions, and the team's code lines that the batch changed. Four sentences of your decisions are now false: on the compiled binomial coefficient, and three on the code generator's refusal of a where clause. Each decision stands; the sentences wait for their rewording.
