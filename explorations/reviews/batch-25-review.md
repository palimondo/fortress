<!-- The combined post-batch review of climb batch 25, the batch of coordinator/CLIMB-BATCH-25.md that is phase 4's third batch of the natives, with three walls of the code generator (rungs D, P, A, R, U, N and C; run wf_3d220d41-726, base 97a416b18, 23:03 UTC on 2026-11-02 to 03:50 UTC on 2026-11-03, 20 agent transcripts for 18 roles, a VM restart at 01:42:54 UTC that killed two agents, the run resumed at 01:46 UTC with resumeFromRunId; landed and pushed at 11d2d8764: rung D 17b9f6b58, rung P 43f130022, rung A d2501afef, rung R 41830b90c, rung U f7a33b97b, rung N d85bac271, rung C 8833d89c5, the closes b1149e218, the gather record a0ec6bc13, the merged-diff review's corrections 20eab4036, the gate's tables 11d2d8764), owed at the landing, in the form of reviews/batch-24-review.md, by a review worker reading only, against main at 3c4db3cef (the boot note, after the landing). The measures are batch-measures.py's on climb batches 20 (wf_4cf8e3cb-bf5), 21 (wf_225c8ddd-913), 21b (wf_db1dda0a-97d), 22 (wf_5e692c7a-778), 22c (wf_1a894dd6-45c), 23 (wf_a81f810e-eb0), 24 (wf_fe6a0ece-c70) and this run, transcript-study/skill-load.py's and spend.py's on this run, and scratch scripts of this review's in /tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/rev25/ (agents.py, calls.py, errs.py, runs.py, nohup.py, teststeps.py and tokens.py copied unchanged from climb batch 24's review's rev24/; brief2.py copied with its file pattern widened to take briefing-1.txt; gaps.py new, for waits and cache refills). Tokens are writes only (input plus cache creation, one count per message id). The microGPT walk check is reported by its verdict only, at the curator's ruling of 2026-10-23. Besides reading, this review ran only those scripts, record.py check, ledger.py landing-check, facts-extract.sh, grep, diff and git, which write nothing in the tree. -->

# Climb batch 25: N3's first families and three code-generator walls, 115 bindings moved with the count and the distance at 0, the cost of a restart and of two long waits, the practice, the routing and the steps owed before the next batch

## What came up in this run

### 1. The count 0 and the distance 0, row by row against climb batch 24's tables

**What the record expected** (`coordinator/CLIMB-BATCH-25.md:591-602`): the count 0, its 14 api rows as the comparand's, reading D's `fromRawBits`, R's eight, U's one and N's 15 moved bindings in the main component; the distance 0 over the fourteen, `#crash none`, reading 288 bindings that name helpers, `compare.sh` printing 'DISTANCE SAME   0' and no setting line; `testSystem` about 735 and the compiler track about 1,402, "and any more that the rungs add"; the library track 86, the other-compiler track 263 and the misc track 440; `testSpecData` 130; the 42 atomic runs unchanged; the ladder's 85 programs at `pass`; the 52 demos at the gather; microGPT's quick pair at the commit stage, "the first landing at which `MOD` and `nanoTime` run through helpers". The gate ran on `a0ec6bc13` and was green (the gate's result in the run's journal). The review's `20eab4036` came while it ran and touched only `explorations/` (its `pathsOutsideExplorations` is empty; `git diff --name-only a0ec6bc13 20eab4036` lists FACTS, FACTS-history and PLAN), so no `# repair-ungated` line was owed.

**The count's table** (`climb-batch-25/gate/checker-count.txt` against `climb-batch-24/gate/checker-count.txt`): `diff` prints nothing. The table is climb batch 24's byte for byte: 14 api rows, all 0, `#total 0`, `#locations 0`, `#crash none`, `#shadow matches the tracked StaticChecker`.
- **No row is new and no row rose, so no row needs a rung edit to explain it.**
- The table stays one row long for the helpers. The `FortressLibrary` component's helper strings went from 76 to 101 and its helper classes from six to seven, `simpleDoubleArith` added by rung D's `fromRawBits` (`git show <rev>:Library/FortressLibrary.fss | grep -o 'nativeHelpers\.[A-Za-z]*\.'` at `97a416b18` and at `11d2d8764`). The rewrite makes one synthetic import per package (`ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java`, `alias`), and rung P's new class `simpleFloatArith` is in the same package and named only in `FortressBuiltin`, so they stay the one row `com.sun.fortress.nativeHelpers 0` (`reviews/batch-24-review.md`, section 1).
- The 25 bindings that the count reads for the first time are D's `fromRawBits` (`Library/FortressLibrary.fss:4535`), R's eight (`:780-783`, `:873-876`, `:956-959`, `:1053-1056`), U's one (`:937`) and N's 15 (F-314's lines), as the record forecast. No rung ran a control of the count this time; climb batch 24's rung Z showed that it reads a moved binding against its helper ('#total 1' with `ZZ`'s `=` pointed at a wrong helper; `rung-natives-integers/REPORT.md:127`). This batch's two controls are of the distance, which reads all 288: rung P's, one string pointed at a wrong helper for one run, '#total 1' (`rung-natives-rr32/REPORT.md:78`), and the planner's, `Int`'s `asFloat` at `Float`, '#total 1' (`CLIMB-BATCH-25.md`, "The planner's probes", "The stages").

**The distance's table** (`climb-batch-25/gate/distance.txt` against 24's): `diff` prints only the `#seconds` row, 271 (`FortressLibrary` 205) against 198 (152), and the `#machine` row's load at start, 0.59 against 1.84. `#total 0`, every `#kind` 0, `#crash none` and `#shadow` are the same. `compare.sh` printed 'DISTANCE SAME   0' and no setting line (`climb-batch-25/gate/summary.txt:119`). The stage read all 288 bindings that name helpers (`git grep -h -o 'builtinPrimitive("com.sun.fortress.nativeHelpers' 11d2d8764 -- Library ProjectFortress/LibraryBuiltin | wc -l` prints 288); the 187 in `FortressBuiltin`, 90 of them this batch's, only it reads (P-39).

**The per-site list** (`compile-ladder/gate/distance-sites.tsv`): its header alone, as before (the commit stage's result).

**The summary's other rows** (`climb-batch-25/gate/summary.txt` against 24's):
- `CompilerJUTest` 1,379 to 1,417, +38. Counted by the rung commits on `main` (`teststeps.py`): D +2, P +2, A +2, R +2, U +15, N +2, C +13; the sum is 38. U's 15 are its guard, its two printing tests and the promoted negation test with their link tests, and its `XXX` tests for rows 865, 866 and 885 and for the rewrite's simple-name reading (row 886, with its skeptic's); C's 13 are its three run tests and the `XXX` tests and link tests of rows 888 to 891.
- `testSystem` 723 to 741, over shards of 183, 186, 188 and 184: 18 walk programs added, D 2, P 1, A 1, R 5 (seven added, the two `XXX` remainder tests promoted by rename), U 1, N 2, C 6 (`git diff --name-status` of each rung commit).
- The record's forecasts, about 735 and about 1,402, counted the planner's tests and said "and any more that the rungs add" (climb batch 24's finding on its forecasts, met by the wording). The rungs added 6 walk programs and 15 compiled steps beyond them: the reproducers of rows 880, 881, 887 and C's three walk guards of its `XXX` tests; U's and C's `XXX` tests.
- The library track 86, the other-compiler track 263, the misc track 440 and `testSpecData` 130, as before. The atomic runs: 42 of 42 `PASS`.
- `compileAll` 11 seconds: the gather had built the same code in the main tree, so the caches were kept and the library order was not run (the gate's result).

**The ladder** (`climb-batch-25/gate/ladder/`): 85 of 85 at `pass`, no move; `comparison.txt` and `microgpt-comparison.txt` are empty. Against 24's files, `ladder.tsv` with its `secs` column masked is the same, and `microgpt-phase.md` differs only in its seconds column. The eighteen microGPT components keep their phases, all `disambiguate`. The gate's comparison hid nothing.

### 2. The stages' times against climb batch 24's gate

- **The count stage: about 160 s.** By the file times of the gate's log, 158 s (the commit stage's result, which wrote it into F-240). By the gate's call times, about 160 s (launched at 03:44:48, its table read at 03:47:28). At 24's gate, 152 s and about 156 s. On the rungs' trees: D 157 s (started at a load of 11.5), P 152 s, A about 162 s, R 151 s, U 167 s, N 197 s beside its own distance stage (each rung's `REPORT.md`). No move beyond noise.
- **The distance stage: 271 s** (`FortressLibrary` 205 s) at a start load of 0.59, against 198 s (152 s) at 1.84. The gate started it 9 s before `testFast` (calls at 03:25:09 and 03:25:18), with no library order before them, so `testFast`'s four JVMs ran beside it to its end; at 24's gate it started 53 s before `testFast`. On the trees with fewer moved strings: D 224 s, P 204 s, A 219 s, R 207 s, U 212 s, N 253 s beside its count stage; the gather's run on the merged tree, 222 s (165 s) beside the demos (`RECORD.md`, "The tests on the merged tree"); the planner's on the six texts together, 170 s (126 s). One run each, so the rise is no measured difference; F-240 gives no cause, and the commit stage named it as unexplained (its result).
- **The suites:** `testFast` 8 min 27 s, against 6 min 34 s, with 38 more compiled steps and the distance stage beside it from its start; `testSystem` 3 min 46 s, against 3 min 46 s, with 18 more programs; `testSpecData` 1 min 5 s, against 1 min 13 s (`summary.txt:61-68`).
- **The machine line:** load 2.60, 5.52, 4.35, against 2.96, 5.61, 4.22. It still reads `FORTRESS_THREADS=1` (batch 11's finding 8).
- **The gate:** 23.5 minutes (03:24:32 to 03:48:04), against 24.1.
- **F-240** now gives climb batch 25's gate and its figures, written by the commit stage (`11d2d8764`).

### 3. The cost, by role, against the record and the batches before

From `batch-measures.py` on the eight runs, and this review's scripts on this run's folder. **The run wrote 6.03M over 20 agent transcripts for 18 roles, in 4 h 47 min** (23:03:49 to 03:50:42 UTC). Two agents were killed by the VM restart at 01:42:54 and ran again after the resume (finding 2); no agent was refused or retried. `spend.py` gives the same 6.03M over the 20 files; the writes with the output tokens are 7.62M (`tokens.py`). The boot note's "18 agents, about 2.4M tokens by the harness's count" (`coordinator/BOOT.md`, `3c4db3cef`) is another measure (finding 9).

| Role | B20 | B21 | B21b | B22 | B22c | B23 | B24 | B25 | B25 share |
|---|---|---|---|---|---|---|---|---|---|
| Rung workers | 848K (2) | 1.64M (4) | 1.34M (3) | 890K (3) | 1.51M (4) | 772K (2), and 476K killed | 2.41M (7) | 2.93M (7), and 219K killed | 52.2 % |
| Skeptics | 757K (2) | 1.52M (4) | 1.07M (3) | 958K (3) | 1.37M (4) | 740K (2) | 2.25M (7) | 1.15M (7), and 229K killed | 22.9 % |
| Judge on a rung | 0 | 0 | 0 | 0 | 146K | 0 | 0 | 0 | |
| Gather | 426K | 565K | 439K | 392K | 501K | 348K, and 289K killed | 466K | 1.07M, 708K of it two cache refills | 17.7 % |
| Merged-diff review | 362K | 381K | 412K | 335K | 376K | 322K | 366K | 238K | 4.0 % |
| Its judge and repair | 0 | 165K + 227K | 0 | 0 | 231K + 214K | 0 | 0 | 0 | |
| Gate | 117K | 127K | 122K | 127K | 132K | 135K | 126K | 99K | 1.6 % |
| Commit | 131K | 125K | 118K | 122K | 136K | 121K | 130K | 96K | 1.6 % |
| **Total** | **2.64M** | **4.75M** | **3.50M** | **2.82M** | **4.61M** | **3.20M** (2.44M finished) | **5.74M** | **6.03M** (5.58M finished) | |
| Agents, rungs | 8, 2 | 14, 4 | 10, 3 | 10, 3 | 15, 4 | 11 (8 finished), 2 | 18, 7 | 20 (18 finished), 7 | |
| Span | 2 h 10 | 4 h 26 | 3 h 40 | 2 h 35 | 4 h 37 | 2 h 57 | 5 h 01 | 4 h 47 | |
| Per rung, all roles | 1.32M | 1.19M | 1.17M | 0.94M | 1.15M | 1.60M (1.22M finished) | 0.82M | 0.86M (0.80M finished) | |

**Against the record:** "About 6.3M tokens written: from 5.7M if no fix is contested, to 7.7M with a judge and a repair round on two rungs or a restart", and "About 5 h 30 min, at two agents at a time" (`CLIMB-BATCH-25.md:65`). No fix was contested and no rung or review had a ruling or a repair; a restart came.
- **6.03M, 4 % under the estimate, inside its range.** Workers 3.15M (2.93M finished) against 2.85M; skeptics 1.38M (1.15M finished) against 2.3M; the fixed roles 1.50M against 1.15M.
- Three items that no estimate holds make 1.52M, a quarter of the writes: the gather's two cache refills (708K), rung U's one (361K; finding 7) and the two killed launches (448K). Without them the run wrote 4.51M.
- By rung, worker against the record's figure: D 376K against 0.4M; P 379K against 0.45M; A 203K, and 219K in its killed launch, against 0.3M; R 333K against 0.4M; U 835K against 0.5M, 474K without its refill; N 388K against 0.45M; C 412K against 0.35M. C went over by 62K, U only by its refill, A by its two launches.
- The skeptics wrote 128K to 210K each, mean 164K, half the record's 0.33M and of climb batch 24's mean, 321K; skeptic P's two launches 352K. They ran 34 to 61 messages, against 78 to 128 at 24, and made 7 fix commits against 18. Their brief was the same size (38.7K to 54.1K characters of first message, against 40.7K to 47.4K at 24).
- **The time:** 4 h 47 min against about 5 h 30 min, with about 3.5 minutes of outage (the last writes at 01:42:29, the resumed agents' first at 01:46:07). The workers took 332 minutes in all against the manifest's 500 (D 51 against 70, P 54 against 80, A 12 and 23 against 50, R 43 against 70, U 54 against 90, N 49 against 80, C 45 against 60; `CLIMB-BATCH-25.md`, section 5, "The manifest, rung by rung"), which order the scatter only.

**Against the batches before:**
- Per rung, all roles: 0.86M, 0.80M of finished launches, against 0.82M at 24 and 0.94M to 1.32M before.
- Workers and skeptics together per rung: 0.65M (0.58M finished), against 0.67M at 24, 0.76M at 23 (finished), 0.72M, 0.62M, 0.80M, 0.79M and 0.80M before. Five of the seven rungs wrote new Java helpers, where climb batch 24's mostly changed strings.
- The fixed roles: 1.50M, against 1.09M at 24, 0.93M at 23, 1.15M at 22c, 0.98M at 22, 1.09M, 1.20M and 1.04M before. Without the gather's two refills, 0.79M, the lowest of the eight.

**The order of the run.** The run kept two agents at a time. It ran the seven workers first, the scatter U, P, N, D, R, C, A by the manifest's expected minutes (90, 80, 80, 70, 70, 60, 50; the Fable review's "Notes for the coordinator"): U and P at 23:03, N and D at 23:57 and 23:58, R at 00:46, C at 00:49, A at 01:30. Skeptic P started at 01:34:14, after C's worker. The VM restart at 01:42:54 killed rung A 12 minutes in and skeptic P 8 minutes in. On the resume, at 01:46:07, rung A and skeptic U started, then the skeptics P, N, D, R, C and A as slots freed (the journal's `started` lines). So each skeptic started 10 minutes to 1 h 48 min after its worker's result: U's 1 h 48 min after, P's first launch 1 h 36 min, D's 1 h 20 min, N's 1 h 15 min, C's 45 minutes, R's 40 minutes, A's 10 minutes. The wait cost no tokens. The gather started 3 s after the last skeptic (02:31:44), the gate and the review 2 s after the gather (03:24:32), the commit 2 s after the gate.

**The briefing's use and cost** (the `coordinator` skill's `references/batch.md:45` asks the share at a landing):
- **16 of 16 briefed launches read it, the 14 briefed roles and the two killed launches, none in its first turn.** The workers' first briefing calls came at calls 11 to 18, 58 to 94 s after each agent's start, and rung A's second launch at call 17, 132 s, reading the files its first launch had saved; the skeptics' at calls 3 to 12, 15 to 62 s (`brief2.py`).
- Its results came to about 265K tokens, 4.4 % of writes, at 0.40 tokens a character plus 110 a call (52 calls): workers 168K (U 29.8K, P 22.4K, N 21.3K, D 22.0K, R 25.0K, C 20.7K, A 18.1K and 8.8K in its second launch), skeptics 97K (8.9K to 16.0K, P's 12.2K twice). The workers' figures are within 1K of the planner's `lists25.py` (the Fable review's notes: D 22.3K, P 21.9K, A 18.2K, R 25.4K, U 30.4K, N 21.3K, C 20.9K). Per launch about 16.5K.
- Rung P and others saved their briefing as `briefing-1.txt`, which the pattern of climb batch 24's `brief2.py` did not take: by that pattern this run gives 177K. With the widened pattern, climb batch 24's run gives 257K (4.5 %) where its review gave 239K (4.2 %), so the batches compare at 265K against 257K.
- No agent saved a briefing file in the session's scratchpad (climb batch 24's finding 8, built).

| Batch | Briefed agents | In the first turn | Run at all | At calls | Seconds after start | Its tokens (estimate) |
|---|---|---|---|---|---|---|
| 20 | 4 | 0 | 4 | 9 to 12 | 48 to 78 | 89K, 3.4 % |
| 21 | 9 | 0 | 9 | 8 to 15 | 24 to 97 | 193K, 4.1 % |
| 21b | 6 | 0 | 6 | 10 to 21 | 45 to 94 | about 111K, 3.2 % |
| 22 | 6 | 0 | 6 | 11 to 16 | 60 to 73 | about 117K, 4.2 % |
| 22c | 10 | 0 | 10 | 2 to 17 | 11 to 98 | about 186K, 4.0 % |
| 23 | 6 (4 finished) | 0 | 6 | 13 to 23 | 67 to 165 | about 172K, 5.4 % (finished 105K, 4.3 %) |
| 24 | 14 | 0 | 14 | 11 to 19 | 48 to 92 | about 239K, 4.2 % (257K, 4.5 %, by this review's pattern) |
| 25 | 16 (14 finished) | 0 | 16 | 3 to 18 | 15 to 132 | about 265K, 4.4 % |

**Other measures.**
- **First calls:** 832K (13.8 %), 8 cold: rung U, the run's first agent; skeptic P's first launch, its first skeptic; rung A's second launch and skeptic U, which started together at the resume (61.7K and 72.1K, against 21.5K to 28.4K for a warm start); the gather, the gate, the review and the commit. The other twelve started warm, with cache reads of 40K.
- **Cache refills: 3, 1.07M, 17.7 % of writes:** the gather's two, 354K each, after two waits of 600 s (finding 1), and rung U's, 361K, after a gap of 284 s (finding 7). `batch-measures.py` counts the gather's two, 708K: its threshold is a gap of 300 s. Climb batches 20 to 24 had none.
- **Refusal cycles:** 0.
- **The skill's load** (`skill-load.py`): 690K, 11.4 %: 165K of load text (2.7 %) and 525K over 237 part reads (8.7 %), against 16.3 % at 24 and 13.3 % at 23. All 20 agents loaded `fortress-repo`; each read 3 to 14 parts. `compiler.md` was read 30 times (80K), `tests-writing.md` 16 (51K), `build-and-caches.md` 19 (50K), `revival-changes.md` 9 (49K, against 20 reads at 24; finding 8).
- **Builds:** one for each rung's code state: D, P, R, U, N and C once each, A once in its first launch and not in its second, which kept the first's build; the gather built the merged tree once; the gate's build of the same code took 11 s. No skeptic built. No build ran twice on one code state. `batch-measures.py` shows rungs N and A at none, since its pattern does not take `nice -n 19 ant compileAll`; the detached commands show their builds (`nohup.py`).
- **Rows:** 13 opened (880 to 892); 8 closed (336, 848, 326, 860, 873, 820, 821, 823, in `b1149e218`); 8 rewritten (454, 529, 856, 865, 866, 650, 624, 880) and row 75 noted (`RECORD.md`, "Rows opened"). `ledger.py landing-check 97a416b18`: 'no finding'; `record.py check --base 97a416b18`: '0 failures' (this review's runs).
- **The disk:** 2.1G free at 01:2x UTC during the run, after which the coordinator removed four clean worktrees of other work (the boot note); 5.0G free at the gate's start (its result); 10G at 03:5x, after the commit stage removed the seven rung worktrees (the boot note).

Per agent, in order of start (UTC; ids are the transcripts' `agent-<id>.jsonl`; messages are distinct message ids):

| Agent | Id | Writes | First call | Messages | Minutes | UTC |
|---|---|---|---|---|---|---|
| Rung U | a24fa145 | 835K | 65K, cold | 191 | 54.2 | 23:03-23:57 |
| Rung P | adba9f1f | 379K | 22K | 154 | 54.0 | 23:03-23:57 |
| Rung N | af81a680 | 388K | 22K | 155 | 49.0 | 23:57-00:46 |
| Rung D | a72d4d26 | 376K | 22K | 131 | 51.3 | 23:58-00:49 |
| Rung R | ae0116e7 | 333K | 23K | 140 | 43.2 | 00:46-01:30 |
| Rung C | a1a321d1 | 412K | 22K | 203 | 44.9 | 00:49-01:34 |
| Rung A, killed | a98194d5 | 219K | 22K | 86 | 12.2 | 01:30-01:42 |
| Skeptic P, killed | aa510c44 | 229K | 68K, cold | 49 | 8.2 | 01:34-01:42 |
| Rung A | a5ef55e7 | 203K | 62K, cold | 73 | 22.8 | 01:46-02:08 |
| Skeptic U | a600103d | 210K | 72K, cold | 47 | 9.9 | 01:46-01:55 |
| Skeptic P | a329d42e | 123K | 27K | 34 | 5.9 | 01:56-02:01 |
| Skeptic N | aeafef09 | 153K | 28K | 52 | 8.1 | 02:01-02:10 |
| Skeptic D | a616fd0f | 182K | 27K | 48 | 10.0 | 02:09-02:18 |
| Skeptic R | ab215b5e | 176K | 28K | 56 | 9.1 | 02:10-02:19 |
| Skeptic C | a2731040 | 179K | 27K | 61 | 12.7 | 02:19-02:31 |
| Skeptic A | a20d7578 | 128K | 25K | 43 | 7.0 | 02:19-02:26 |
| Gather | a12f1d0b | 1.07M | 85K, cold | 211 | 52.8 | 02:31-03:24 |
| Gate | a2011284 | 99K | 57K, cold | 30 | 23.5 | 03:24-03:48 |
| Review | aa13272b | 238K | 68K, cold | 67 | 9.3 | 03:24-03:33 |
| Commit | a69af171 | 96K | 62K, cold | 19 | 2.6 | 03:48-03:50 |

I did not measure the preparation beside the run: the planner, its probes, the Fable review and the coordinator's launch and resume.

### 4. The tail

- **The gather** (1.07M, 52.8 minutes):
  - It composed the seven rung commits on `main` one patch at a time (`git apply --3way --index`) in the order D, P, A, R, U, N, C, the manifest's, which fork 1 gives and its rule confirmed (`RECORD.md`, "The order the rungs were applied in"). One conflict: `ProjectFortress/tests/FloatNextUpSignedZeroWalk.fss`, new in D and in P, both reproducers of one defect; resolved by hand from both sides, the rows NEW-D-1 and NEW-P-1 made one, 880 (`RECORD.md`, "Conflicts"; gather.1). The other patches applied without a conflict, and the later rungs' citations that an earlier hunk moved were re-anchored by symbol.
  - In the main tree it built the merged tree (02:50:09) and ran the library order; under the harness, the five remainder tests, the merged reproducer and C's three walk guards, 'OK (9 tests)'; the compiled tests of C and U in one JVM, 'OK (17 tests)'; the distance stage, '#total 0', 222 s, as row 873's check (finding 6); the 52 demos from about 02:52 to 03:23:13, 'demos: 52 run, 52 reached their end'; the specification once on the last text, 'BUILD SUCCESSFUL' twice, the warning count 0, its PDF kept as `tmp/gather/fortress-batch-25.pdf` (`RECORD.md:36-51`).
  - It opened rows 880 to 892, closed eight (`b1149e218`), rewrote eight, added F-310 to F-315 and rewrote F-24, F-32, F-34, F-125, F-268, F-298, F-299, F-303, F-305, F-306 and F-308 rung by rung (`RECORD.md`, "Each rung").
  - It rewrote the Effect of "A native binding that names a static helper" once, in rung N's commit: 288 of 449 (`Specification/appendices/changes.tex:4469-4488`), and corrected the batch record's line `CLIMB-BATCH-25.md:212` in R's commit.
  - It routed the rungs' items into PLAN (`PLAN.md:665-678`).
  - Misses: it waited twice for 600 s in the foreground on the demos, and the prompt cache lapsed both times (finding 1); it ran the distance stage that fork 13 gives the gate alone (finding 6); `ledger.py` refused five of its row writes for length (row 880's rewrite three times, row 529's note and its rewrite) and one batch of closes for a test path, each written again.
- **The merged-diff review** (238K, 9.3 minutes, beside the gate): **approved**, nothing blocking, nothing routed. Its corrections in `20eab4036`: F-306's 25 and 47, `ZZ64`'s 26 helper strings (an off-by-one already at the base); F-32's title, "most of the one library's native bindings", false at 161 of 449; F-118's sentence that the compiled path prints a large unsigned value wrongly, false since rung U; and `PLAN.md:52`'s rows 336 and 848 among the families that wait. It checked the 7 skeptic fix commits as applied (`fixesChecked`), and the counts by `git grep` (288; F-308's 93 of 94).
- **The gate** (99K, 23.5 minutes): green on `a0ec6bc13`, as section 1 gives.
- **The commit** (96K, 2.6 minutes): it landed the tables and the per-site list, ran the quick microGPT walk check, folded F-53's title and F-240's figures by `record.py set` (`record.py check --base 20eab4036`, 0 failures), and copied the gather's PDF to `Specification/fortress.pdf` since nothing under `Specification/` changed after the gather's head: it built nothing (climb batch 24's finding 4, built in `7abc5c21c`, held). It amended its own commit to add the `historical:` line for the PDF before the push (`261c99dfa` to `11d2d8764`), pushed `main` to the three refs on the first try, removed the seven rung worktrees and deleted their local `wip/` branches, and left the remote branches and `/home/user/fortress-base25`. It named F-240's distance rise as one the entry does not explain (its result).

### 5. The microGPT walk check

Its verdict lines (`climb-batch-25/gate/summary.txt:120`, `:122`): "VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS" for `MicroGptAplQuick` and for `MicroGptFlatQuick` (the commit stage's result, `microgptWalk`), each run ending `rc=0`. So 7 of 7 on both programs, the first landing at which `ZZ32`'s `MOD` and `nanoTime`, which both programs reach under walk, run through helpers (`CLIMB-BATCH-25.md:602`), with `Int`'s `asFloat` and `Float`'s `MAX` (`CLIMB-BATCH-25.md:74`). By the ruling of 2026-10-23 the seconds are not compared (`PLAN.md:9`).

### 6. The natives after phase 4's third batch

**What the batch built.** 115 bindings moved onto helpers: D 28 (`Float`'s 27 and the top-level `fromRawBits`), P 49, A 5, R 10, U 5, N 18. So 288 of the library's 449 live bindings name a helper (F-299), and 161 still name glue classes (F-32). `git grep` at `11d2d8764` prints 288: 101 in `Library/FortressLibrary.fss` and 187 in `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`. The batch wrote 105 new helpers: D 28 in `simpleDoubleArith`, P 46 in a new class, `simpleFloatArith`, for its 49 bindings, A 2, R 10, U 1, with 2 fixed, N 18. Of the 115, 108 are N3's, the first of its 158 to move (P 49, D 28, N 18, R 10, A 2, U 1; `CLIMB-BATCH-25.md`, section 4, "N3's 158"). Beside the moves:
- under walk, `REM` and `MOD` by zero raise `DivisionByZero` on `ZZ32`, `ZZ64`, `NN32`, `NN64` and `ZZ`, where the run ended (F-312; rows 336 and 848 closed), so `DIV`, `REM` and `MOD` by zero on the five types all raise it (F-24);
- on the compiled path, an `NN32` above 2^31 and an `NN64` above 2^63 print unsigned, and the `NN64` wraparound negation of `x` is `0 - x` (F-313; rows 326 and 860 closed); the compiled prelude's `NN64` printing and prefix `BOXMINUS` changed with the shared helpers (split 1);
- the rewrite gives `UnsignedLong`'s `self` the `NN64` transfer (F-313; row 873 closed);
- the five `asFloat`s of `Int`, `RR32`, `NN32`, `Long` and `BigNum`, and `UnsignedLong`'s, are declared at `RR64` (F-311);
- the code generator compiles a type that extends a generic trait at `Any`, a `try` with a `forbid` clause, and a function declared `test` (F-315; rows 820, 821 and 823 closed); under the planner's control its refusals over the fourteen fall from 50 in 14 kinds to 47 in 11 (F-34).

**Where the 449 stand.** The 161 on glue classes are those the record leaves out, each with its home (`CLIMB-BATCH-25.md`, section 4, "Left out, each with its home"): the string family, `FlatString`'s 13 methods, six top-level bindings over strings and `natLineSeparator`, after items 310 and 340; those over `AnyIntegral` or `Number`, the shifts and the powers among them, with `ZZ32`'s `big`, after items 331 and 332; `ZZ`'s `narrow` and `widen`, after the integer conversions (item 338; PLAN item 31); `Char`'s `asExprString`, after row 861; `IntLiteral`'s 29, with N5; `FloatLiteral`'s 3, which need a carrier of `self` in walk's loader; N4's 36 methods of the I/O objects; D2's 42 with no compiled analogue.

**What the zero rests on now.** The gate's 0 and 0 read the 288 against their helpers. For the 93 over `NN32`, `NN64`, `Char` and `UnsignedLong`, the checker reads a composition through the six transfers, which are identities, so the guards check that each names the unsigned helper (F-308; review-queue item 326, which the batch took at its default on his go of 22:0x UTC on 2026-11-02). U's guards assert values at and above 2^63 (`ProjectFortress/compiler_tests/NativeHelperFamilyUnsignedCompiled.fss:38-50`). The zero over the fourteen still rests on climb batch 22c's fork 8 reading of `var` (row 844; item 295, open), and the stages' reading of every glue string on climb batch 23's fork 3 (item 309, open).

**What stands between the library and the switch-over** (P-33; PLAN, phase 4): the 161 above; the code generator's 47 refusals in 11 kinds (F-34), the local functions first, on microGPT's path (row 304), and its wall at the helpers' wrappers over the whole of `FortressLibrary` and `FortressBuiltin` (row 874, with N5); `System`'s 2 errors by the switch-over (P-33); and the names batch.

## Part 1. Conformance

### Method

As in `reviews/batch-24-review.md`. For each rung I read its commit on `main` and its diff against the base, its `REPORT.md` and `SKEPTIC.md`, its section of the record (`CLIMB-BATCH-25.md:105-353`) with the forks 1 to 17 and the points for his sight (`:68-103`), the Fable review of the record (`coordinator/climb-batch-25-review.md`), the gather's `RECORD.md`, the run's journal results, and the code and the specification on `main`. Three standards, kept apart: the specification; the library's own way (P-27), and for compiler code the team's code beside it; and the decisions on record (P-58, P-37, P-38, P-33, P-39, P-70, P-73, P-29, P-30, P-79, P-103), with the facts the batch built or rewrote (F-24, F-32, F-34, F-118, F-125, F-240, F-268, F-298, F-299, F-303, F-305, F-306, F-308, F-310 to F-315) and the record's forks. Where the batch's own record and the tree disagree, the tree rules, and I say so.

### The verdicts

- **Rung D, `Float`'s 27 bit and rounding bindings and `fromRawBits`: in the spirit of P-58,** with split 2 (row 880).
- **Rung P, `RR32`'s 49 on a new class: in the spirit of P-58 and of the prelude's one helper class for each number type (fork 2),** with splits 2 and 6.
- **Rung A, the five `asFloat`s at `RR64`: in the spirit of P-58, of the specification's `asFloat` into `RR64` and of the team's 2008 trait.**
- **Rung R, `REM` and `MOD` by new helpers: in the spirit of P-58 and of the specification's rule for division by zero.**
- **Rung U, the unsigned helpers, the run time's printing and `UnsignedLong`'s transfer: in the spirit of P-58 and P-37,** with splits 1 and 7.
- **Rung N, the divisors and `nanoTime`: in the spirit of P-58, P-70 and P-73,** with split 5 (row 887).
- **Rung C, the code generator's three walls: in the spirit of P-33 and of the specification's `try` and tests chapters,** with splits 3 and 4.
- **No ruling.** All seven skeptics approved, with corrections and nothing contested; the review approved; no worker stopped.

### Where the text, the brief or the principles split

**1. Shared helpers repaired the prelude's values, where P-38's title says its defects are not repaired (rung U; fork 5).** P-38: "The compiler prelude's defects are not repaired: they go with it at the switch-over." (`POSITIONS.md:35`). Rung U fixed `simpleUnsignedLongArith.unsignedLongToString` and `unsignedLongWrappingNeg`, which the one library's bindings now name and the prelude binds too, so the prelude's `NN64` printing and its prefix `BOXMINUS` changed with them: 'BOXMINUS 1: 1' became 'BOXMINUS 1: 18446744073709551615' (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:825`, `:832`; `RECORD.md`, "Points to report", U; F-313). Fork 5 names the change (`CLIMB-BATCH-25.md:84`), and the record's "No question for the curator" says no fork bends a decision of his (`:72-74`); neither it nor the Fable review weighs P-38. The decision's body names the prelude's own text, its `Maybe` block, its `REM` guard and its reversed spellings, which stand; the helpers and the run-time classes `FNN32` and `FNN64` outlive the prelude, and the one library needs them right (P-58; P-37, "settles which files survive, not the designs inside them"). Climb batch 24's rung K did the same for the prelude's compiled `CHOOSE` (rows 521 and 855), read under P-37 (`reviews/batch-24-review.md`, rung K, standard 3). Default: as landed. So P-38's title is false in effect for rows 326's and 860's prelude halves, and for 521 and 855 before them; the decision stands for the prelude's text (finding 4).

**2. `nextUp` and `nextDown` at a signed zero (rungs D and P; row 880).** IEEE 754-2008's nextUp of `-0.0` is the smallest positive subnormal, as Java's `Math.nextUp` gives; the team's `DirectedRounding.nextUp`, which both glue classes and both rungs' helpers call, gives the successor in IEEE's totalOrder, `0.0` (`ProjectFortress/src/com/sun/fortress/numerics/DirectedRounding.java:111-127`, its `float` twin `:25-41`). The specification names no `nextUp`; its one word on the signed zeros, "-0 is considered to be smaller than +0", is said of `MIN` and `MAX` (`Specification/basic/operators/opr-overview.tex:252`; skeptic D, "Homes"). Row 880 is `CONTESTED`, and `ProjectFortress/tests/FloatNextUpSignedZeroWalk.fss` pins today's values. D.worker.1 with P.worker.2 (`PLAN.md:669`). Default: today's values.

**3. The `test` modifier on a method (rung C; its D6).** The specification's note gives `test` to a top-level function of type `() -> ()` (`Specification/basic/tests.tex:36-55`); the parser's method modifiers admit it (`ProjectFortress/src/com/sun/fortress/nodes_util/Modifiers.java:151-154`), and C added `Test` to the guard that both functions and methods pass (`CodeGen.java:2947-2949`), so `test mt()` on an object compiles and runs, 'O 7'. C.worker.1 and C.skeptic.2 (`PLAN.md:674`). Default: as landed, as the trait guard admits `test` for traits and objects (`Modifiers.java:146-149`).

**4. A `forbid` path that skips the `finally` clause (rung C; row 890).** The specification runs the `finally` clause whatever leaves the `try` (`Specification/basic/expressions/try.tex`, "Try Expressions"); the base's compiled `try` already skips it when an exception leaves the block, and C's new `forbid` path inherits that order (`CodeGen.java:2075-2085`; skeptic C, `6678a80d0`). C.skeptic.1 (`PLAN.md:675`). Default: as landed, recorded by the `XXXFinallyOnEscape` pair and not fixed for one abrupt path of three.

**5. `ZZ`'s `CHOOSE` out of range (rung N; row 887).** The specification's binomial coefficient is 0 where `k < 0` or `k > n` (`Specification/basic-lib/basic-integers.tex:611`); walk's glue class `BigNum` answered 1 there, and N's helper keeps it, by fork 7's rule that the helpers keep walk's values (`simpleArbitraryPrecisionArith.java:164-177`). The four fixed widths answer 0 since row 337 (F-125). N.worker.1 (`PLAN.md:673`), beside item 333's `CHOOSE` property. Default: as landed, pinned by `XXXChooseZZOutOfRangeWalk`.

**6. Spellings (rungs P and D).** The specification's upward-rounded addition has no ASCII name (`opr-overview.tex:216-218`), and the team binds two families, `PLUS_UP` to a NaN-free helper and `IEEE_PLUS_UP` to the IEEE one (`FortressBuiltin.fss:291`, `:311`); P keeps both (P.worker.1, `PLAN.md:671`). Under fork 2, D named its square-root roundings `doubleSqrtUp` and `doubleSqrtDown` after the glue classes, and P `floatSQRTUp` and `floatSQRTDown` after `floatSQRT` (`simpleDoubleArith.java:188`, `:208`; `simpleFloatArith.java:111`, `:131`); D.skeptic.1 (`PLAN.md:670`). Defaults: as landed.

**7. Item 326's cost reaches `UnsignedLong`, and two of the rewrite's limits stand (rung U; fork 6; rows 885 and 886).** U's one condition gives an argument declared `UnsignedLong` the `NN64` transfer (`BuiltinPrimitiveRewriter.java:189-190`), so the checker no longer checks that `UnsignedLong`'s three bindings name an unsigned helper, as for the 76 of climb batch 24 (F-308); U's guards assert values at and above 2^63, as fork 9 asks. The condition reads the declared type by its simple name, so a program's own `UnsignedLong` takes the transfer too, 'NN64->ZZ64 is not applicable …' (skeptic U, `6c3daa011`; row 886); a helper overloaded at one arity gets no transfer and stays refused (row 885, `CONTESTED`; U.worker.1, `PLAN.md:672`). Defaults: as landed.

### Rung D, `17b9f6b58`

**What landed.** `sample-D.patch`'s five helpers and strings and the other 23 in their form, without the sample's source comment naming the planner: 28 one-line helpers of `simpleDoubleArith` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java:136-246`), each calling the Java its glue class calls, the team's `DirectedRounding` for most; `Float`'s 27 strings (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:61-153`) and `fromRawBits` (`Library/FortressLibrary.fss:4535`). The walk guard `NativeHelperFamilyFloatBitsWalk` and the compiled guard `NativeHelperFamilyFloatBitsCompiled`, which skeptic D completed with 28 assertions each (`b7211ab2b`); `FloatNextUpSignedZeroWalk` for row 880. `Float`'s other five wait on item 331.

**Standard 1.** Split 2. The directed roundings, the inequality and the bit operations are the library's, not the text's; no walk value moved (458 printed results, `diff` empty; a mutant sweep, 26 of 26 caught).

**Standard 2.** Each helper is its glue class's computation, one line each. Team lines changed: 28 strings of `value object Float` and the top-level `fromRawBits`.

**Standard 3.** P-58; fork 9's guards, completed by the skeptic to the brief's value list. P-29: walk's directed roundings run through reflection now, and weigh nothing.

**Verdict: in the spirit,** with split 2.

### Rung P, `43f130022`

**What landed.** A new class, `simpleFloatArith` (`nativeHelpers/simpleFloatArith.java:1-194`), with 46 helpers over a Java `float` for `RR32`'s 49 bindings (`FortressBuiltin.fss:210-342`): `asString` and `asExprString` share `floatToString`, and `DOT`, `TIMES` and juxtaposition `floatMul` (F-310). The guards `NativeHelperFamilyRR32Walk` and `NativeHelperFamilyRR32Compiled`; its version of `FloatNextUpSignedZeroWalk`, merged with D's by the gather. The record's "49 new helpers" corrected to 46 (`CLIMB-BATCH-25.md:29`, `:147`, `:459`).

**Standard 1.** Split 2, and split 6's ASCII spellings.

**Standard 2.** One class for each number type, the prelude's convention (fork 2): `simpleDoubleArith` is named for `double`, and the prelude had no `RR32` class. Each helper computes as the glue class `RR32` does (539 printed results equal on both codes; skeptic P's own program, `diff` empty). Team lines changed: 49 strings of `value object RR32`.

**Standard 3.** P-58. The count and the distance 0, and a one-line control showing that the distance stage reads `RR32`'s bindings. Fork 12: `ant testSystem` and the compiled guard, since no prelude file imports the class.

**Verdict: in the spirit,** with splits 2 and 6.

### Rung A, `d2501afef`

**What landed.** `rung-A.patch`'s library text as written: the five headers `asFloat(self): Float` to `asFloat(self): RR64` and their strings (`FortressBuiltin.fss:241`, `:374`, `:383`, `:396`, `:570`); two new helpers, `simpleLongArith.longToDouble` and `simpleArbitraryPrecisionArith.toDouble`, before each class's addition helper (fork 2); the guards `NativeHelperFamilyAsFloatWalk` and `NativeHelperFamilyAsFloatCompiled`.

**Standard 1.** "a conversion into `RR64` … is explicit, written `asFloat(x)`" (`Specification/basic-lib/numbers.tex:47-49`). Under walk each `asFloat` still answers the same `Float` object at the same value (F-311).

**Standard 2.** The team's 2008 library declared `asFloat(self): RR64` on the numbers' trait (`git show a874948ac:Library/FortressLibrary.fss`, `:355`), the one library's api declares `abstract asFloat(self): RR64` on `Number` (`Library/FortressLibrary.fsi:290-291`), and the prelude answers `RR64` (`CompilerBuiltin.fss:745`, `:810`); the value objects' `Float` is walk's own object. Team lines changed: five headers and five strings in `FortressBuiltin` (fork 3, flagged for him first).

**Standard 3.** P-58; climb batch 23's fork 12, which named two ways, taken at the declared result `RR64`, since the checker reads no Java type as `Float` (fork 3). Its two launches: the first wrote the tests, saw them fail on the base and committed the change before the restart; the second took its commits and build and ran the suites and the stages (finding 2).

**Verdict: in the spirit.**

### Rung R, `41830b90c`

**What landed.** `rung-R.patch` with its five comments rewritten from provenance to what each helper computes: ten helpers that raise `DivisionByZero` at a zero divisor and give every other value the glue classes gave, `REM` by truncating and `MOD` by floor division, `MOD` equal to `REM` on the naturals; ten strings (`Library/FortressLibrary.fss:780-783`, `:873-876`, `:956-959`, `:1053-1056`; `FortressBuiltin.fss:440-443`). Five division tests, the two `XXX` remainder tests promoted; the guards. Skeptic R's `XXXDivRemDivModWalk` and row 881.

**Standard 1.** "For integer results, division by zero throws a DivisionByZero." (`opr-overview.tex:165`), now so for `REM` and `MOD` on the five types; rows 336 and 848 closed. `DIVREM` and `DIVMOD`, which the same section names (`opr-overview.tex:137-140`), are declared by neither library (row 881).

**Standard 2.** `Math.floorMod` and `Integer.remainderUnsigned` give `Int.mod`'s and `Unsigned.remainder`'s values on every pair (fork 4; 626 pairs equal on both codes). The raise is the form of climb batch 23's `ZZ32` `DIV`. Team lines changed: 10 strings.

**Standard 3.** P-58; fork 4 against the way not taken, a zero test in each glue class. The record's premise that the library writes `DIVREM` and `DIVMOD` in Fortress was false (`CLIMB-BATCH-25.md:212`, corrected in this commit).

**Verdict: in the spirit.**

### Rung U, `f7a33b97b`

**What landed.** `rung-U.patch` as written: `unsignedLongToString` by `Long.toUnsignedString`, `unsignedLongWrappingNeg` as `-a`, a new `unsignedLongToDouble` (`simpleUnsignedLongArith.java`); `FNN32`'s `toString` and `asString` and `FNN64`'s `toString` unsigned (`compiler/runtimeValues/FNN32.java:19-20`, `FNN64.java:20`); the rewrite's `UnsignedLong` condition (`BuiltinPrimitiveRewriter.java:189-190`); five strings and `UnsignedLong`'s `asFloat` header at `RR64` (`FortressBuiltin.fss:449`, `:479-483`; `Library/FortressLibrary.fss:937`). The tests of rows 326 and 860, the guards, and the owed steps the Fable review added: the rewrite's seven limits probed, five shown as rows 882 to 886, each with its test where one can show it; row 865's `XXX` compile test and row 866's `XXX` run pair.

**Standard 1.** An `NN32` or `NN64` is an integer of unsigned binary form (`Specification/basic-lib/basic-integers.tex:29-31`), so -1 names none; the wraparound subtraction gives the negation of `x` as `0 - x` (`opr-overview.tex`, "Addition and Subtraction Operators"). Rows 326 and 860 closed.

**Standard 2.** Walk prints and negates so (`interpreter/glue/prim/UnsignedLong.java:251-255`, `:365-369`), and the prelude masks its `NN32` getter (`CompilerBuiltin.fss:759`). Team lines changed: five strings and one header, the team's `unsignedLongToString` and `unsignedLongWrappingNeg`, `FNN32` and `FNN64`; `BuiltinPrimitiveRewriter` is the revival's.

**Standard 3.** P-58; P-37; item 326 at its default (fork 6), split 7; P-38, split 1. Row 866's run test checks `run_out_contains=REACHED`, where the brief asked `run_out_does_not_contain`, since the run dies after its first line (`XXXObjectExtendsZZ32Compiled.test:3`).

**Verdict: in the spirit,** with splits 1 and 7.

### Rung N, `d85bac271`

**What landed.** 18 new helpers at the ends of five classes and 18 strings (F-314): `GCD` and `LCM` on the five types, `partitionL` on the four fixed widths, `CHOOSE` on `NN64` and `ZZ`, `ZZ`'s `cmp`, and `nanoTime` at `ZZ64` as `simpleLongArith.longNanoTime`. The sample's signed Euclid replaced by one unsigned Euclid, since the sample gave -2 at `ZZ64`'s minimum `GCD` 6 where the glue gives 2 (`tests/NativeHelperFamilyDivisorsWalk.fss:112-113`). The guards and `XXXChooseZZOutOfRangeWalk` (row 887). The gather's one rewrite of the Appendix I Effect is in this commit.

**Standard 1.** P-70's examples asserted in the walk guard; split 5.

**Standard 2.** Each helper computes as its glue class does (8,840 printed results equal; skeptic N's 9,851 more, and 9,509 compiled against walk). No `CHOOSE` helper keeps state, so no parallel test (fork 7). Team lines changed: 18 strings.

**Standard 3.** P-58, P-70, P-73; fork 8. `nanoTime` reads the clock, the one helper of the batch that is not a function of its arguments.

**Verdict: in the spirit,** with split 5.

### Rung C, `8833d89c5`

**What landed.** Three changes of the team's `CodeGen` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`): `generateTypeReference`'s empty `AnyType` branch now emits `Any`'s singleton through the non-generic path (`:5845-5851`); `forTry` tests the `forbid` types after the catch clauses and throws a `ForbiddenException` chained to the exception, through a new `throwForbiddenException` (`:2019-2087`, `:2089-2122`); `Test` joins `fnDeclCompilableModifiers` (`:2947-2949`). `ExtendsGenericAtAnyCompiled`, `ForbidClauseCompiled` and `TestModifierCompiled` with their walk guards; the `XXX` tests of rows 888 and 889 (the worker's) and 890 and 891 (the skeptic's), with walk guards; row 892 with reproducer `none`.

**Standard 1.** The `forbid` clause: "a new ForbiddenException is created with the thrown exception as its argument and thrown", after the catch clauses (`try.tex:65-78`; `exceptions.tex:177-210`); the `test` modifier (`tests.tex:36-55`), split 3; the `finally` clause, split 4.

**Standard 2.** `throwForbiddenException` follows `forThrow`'s wrapping (`CodeGen.java:2006-2017`), the `AnyType` branch the `IntArg` branch's `continue` (skeptic C, "Precedent"). Walk does the same (`interpreter/evaluator/Evaluator.java:1401-1436`). Team lines changed: three methods of the team's `CodeGen`.

**Standard 3.** P-33, code-generator work beside the natives; the exit judgement's named code-generator rung (`reviews/phase3-exit/judgement.md`, section 5.2, item 6); fork 14. Under the planner's control, 50 refusals in 14 kinds became 47 in 11 (F-34). Its walk guards on the old code by the base build's own harness were refused by the permission check (C.worker.2, `PLAN.md:676`); it showed them on the base's build in its own tree before its edit.

**Verdict: in the spirit,** with splits 3 and 4.

### The decisions consequential for him, and the readings he has not confirmed

By the coordinator skill's sense of consequential (`CLIMB-BATCH-25.md:70`), the record found no fork consequential, and its Fable review agreed (`coordinator/climb-batch-25-review.md`, section 1). I found no fork that reverses a decision of his. One fork reads a decision anew without naming it:
- **Fork 5 and P-38** (split 1): shared helpers fixed for the one library repaired two of the prelude's values, where P-38's title says that the prelude's defects are not repaired. The record names the change and not P-38; climb batch 24's rung K made the same kind of change, read under P-37. Default: as landed. Reversible only by keeping a wrong helper for the prelude beside a right one for the one library.

The three forks the record puts first for him (`CLIMB-BATCH-25.md:42-46`) hold as written: fork 3, five of the team's headers at `RR64`; fork 6, item 326's cost reaching `UnsignedLong`'s three, met by U's guards; fork 5, the compiled run time's printing.

The results that stand on a reading he has not confirmed:
- **The gate's 0 and 0 for the 93 bindings over `NN32`, `NN64`, `Char` and `UnsignedLong`** stand on way 2b, whose check is a composition through identities (F-308; item 326, which the batch took at its default on his go). The guards, not the checker, show that each names the unsigned helper.
- **The stages' reading of the 161 glue strings** stands on climb batch 23's fork 3 reading of P-58's refusal (item 309, open), as before.
- **Phase 3's zero over the fourteen** still stands on climb batch 22c's fork 8 reading of `var` (row 844; item 295, open, needed before the switch-over).

### The record's questions and forks, against what landed

| Question or fork | Rung | Landed |
|---|---|---|
| No question for him | | None asked; the launch on his go of 22:0x UTC on 2026-11-02 |
| 1, seven rungs, none landing only with another; applied D, P, A, R, U, N, C | all | Built; one conflict, D's and P's reproducer of one file name, merged by hand (gather.1) |
| 2, each new helper in its type's class, `RR32`'s in `simpleFloatArith` | D, P, A, R, U, N | Built; P's 46 helpers for 49 bindings; two spellings of the square-root roundings (split 6) |
| 3, the five `asFloat`s at `RR64` | A, U | Built (`FortressBuiltin.fss:241`, `:374`, `:383`, `:396`, `:570`, and U's `:482`) |
| 4, R's helpers raise `DivisionByZero` and keep every other value | R | Built; rows 336 and 848 closed |
| 5, the two helpers and the run time's printing fixed | U | Built; the prelude's `NN64` printing and prefix `BOXMINUS` moved with them (split 1) |
| 6, the `NN64` transfer for `UnsignedLong`'s `self` | U | Built (`BuiltinPrimitiveRewriter.java:189-190`); row 873 closed; row 886 reaches a program's own `UnsignedLong` (split 7) |
| 7, N's helpers keep walk's values, P-70 and P-73 | N | Built; `ZZ`'s `CHOOSE` out of range keeps 1 (row 887; split 5) |
| 8, no new helper holds state | all | Kept; N's `CHOOSE` helpers keep none, so no parallel test |
| 9, two guards per family, values above the signed half over `NN32`, `NN64` and `UnsignedLong` | D, P, A, R, U, N | Built; D's completed by its skeptic (28 assertions each) |
| 10, the Effect the gather's, built once, the commit stage taking that build | gather, commit | Built; the commit stage copied the gather's PDF and built nothing |
| 11, the 52 demos at the gather | gather | 52 of 52 |
| 12, the suites once after the last change of code | D, P, A, R, U, N, C | Kept; A's `ant testQuick` ran again after the restart killed it two minutes in |
| 13, the stages once on each family rung's final tree; C and the gather none | D, P, A, R, U, N | Kept by the rungs, P's distance once more as a control; the gather ran the distance on the merged tree (finding 6) |
| 14, C takes rows 820, 821 and 823 | C | Built; the refusals 47 in 11 kinds (F-34) |
| 15, no speed pass | all | Kept |
| 16, no declared count, crash or ladder move | all | Kept; nothing moved |
| 17, the rows | all | Built; 13 opened (880 to 892), 8 closed |

### The global questions

- **Promised against landed.** All seven rungs, the 115 bindings as planned, rows 336, 848, 326, 860, 873, 820, 821 and 823 closed, the count and the distance 0 with every moved binding read. Beyond the plan: rows 880 to 892, of which the skeptics found four (881, 890, 891, 892) and widened a fifth (886), and the rewrite's seven limits probed (five rows), which the Fable review added to U.
- **The record's premises that failed:**
  - fork 1's rungs that "share files at different declarations": D and P each added `FloatNextUpSignedZeroWalk.fss` (gather.1);
  - "49 new helpers" for P (`CLIMB-BATCH-25.md:29`, `:147`, `:459`): 46 for the 49 bindings;
  - `sample-N.patch`'s signed Euclid, wrong at `ZZ64`'s minimum (worker N);
  - "`DIVREM` and `DIVMOD`, which the library writes in Fortress" (`:212` and R's brief): neither library declares them (skeptic R; row 881);
  - row 866's run key in U's brief (worker U);
  - fork 13's "the gather runs neither" stage: it ran the distance (finding 6);
  - the record's "none bends a decision of his" for fork 5 (split 1);
  - the gate's forecasts, about 735 and about 1,402, against 741 and 1,417, as their wording allowed;
  - the cost, about 6.3M and about 5 h 30 min, against 6.03M and 4 h 47 min.
- **Built twice: once, a reproducer.** D and P met one defect and each wrote its test under one name; the gather made the two files one and the two rows one, row 880 (`RECORD.md`, "Conflicts"). Each rung's own helpers and strings are at their own declarations (`RECORD.md`, "The order the rungs were applied in"; the review's summary, "Each of the seven shared code and library files equals the union of its rungs' hunks").
- **The library's way: yes for each.** Every family hunk replaces one string with one; each helper computes its glue class's value, measured old against new by the workers and the skeptics; the new class follows the prelude's one class for each number type.
- **Together.** On the merged tree U's transfer reaches none of R's or N's bindings, whose compiled guards declare `ZZ64` (the review's summary); the remainder tests, the merged reproducer and C's walk guards pass in one harness run ('OK (9 tests)'); C's and U's compiled tests in one JVM ('OK (17 tests)'); the 52 demos reach their end; the gate is green (`RECORD.md:36-51`).

### Findings

Ranked by what they cost or risk next, each with its home.

1. **The gather waited twice for ten minutes, and paid for its context twice: 708K, 11.7 % of the run's writes.** It started the 52 demos in the background at 02:52, then waited for them in the foreground with `until grep -q "^EXIT=" …; do sleep 10; done` from 03:01:24 to 03:11:24 and from 03:11:40 to 03:21:41, each call held to the Bash tool's 600 s limit (`calls.py`). The prompt cache lives five minutes for an agent, so each next call wrote its whole context again: 353,715 and 354,403 tokens, with cache reads of 0 (`gaps.py`). Without them the gather wrote 361K, under climb batch 24's 466K. Its first `sleep 60` had been refused by the harness, whose message points to `Monitor` with an until-loop (02:50:33); it loaded `Monitor`, started one at 03:11:36, and waited in the foreground beside it. The skill's rule is "In an agent, keep every wait under 270 s", with `wait_for` (`.claude/skills/fortress-repo/references/session.md:17-19`, "Long commands"); the gather read eleven parts of the skill and not `session.md` (`skill-load.py`), and its brief, 84K characters, names the demos once and no way to wait for them, where the gate's brief gives `wait_for` at its step 9 (`climb-batch-workflow.js:1437`). Climb batch 24's gather ran the same demos with no refill. Proposed (mine): the gather's brief says, where it starts the demos, the build and the specification build, to wait with `wait_for`, called again until it prints `EXIT=`, as the gate's does. Home: the script's gather brief, between batches.
2. **The VM restart killed two agents, 448K, 7.4 % of the run's writes, and the skeptic's work was done again.** At 01:42:54 rung A was 12 minutes in and skeptic P 8 minutes in; the boot note's "after the seven rungs' results and as the first skeptics started" has six results and one skeptic (`journal.jsonl`: rung A's `result` comes only from its second launch).
   - Rung A's second launch (203K) found its first launch's transcript in the run's folder and its head on the branch (`5ea480cb6`, the tests, 01:38:14; `76a900f19`, the change, 01:40:41), as the worker's brief says on a resume (`climb-batch-workflow.js:793`; climb batch 23's finding 2, built in `40302280c`). It kept the build and the base runs, and ran again only `ant testQuick`, which the restart had killed two minutes in, then `ant testSystem` and the stages. Its first launch's 219K was mostly kept work.
   - Skeptic P's second launch (123K) has no such line: the skeptic's brief tells a retry what an earlier attempt left (the manual, "An agent that comes back with nothing"), and a resume is not a retry. It wrote its programs again from the start (`SkRR32.fss` at 01:58:52); the first launch's 229K was lost.
   - The two agents that started at the resume began cold, 61.7K and 72.1K, against 21.5K to 28.4K for a warm start: about 85K more.
   - Climb batch 23's two restarts cost 0.76M, 23.9 %.

   Proposed (mine): the skeptic's brief gets the worker's resume line: on a resume, its files under `tmp/<slug>/skeptic/` and any commit after the worker's head are its earlier launch's, read with that launch's transcript, and it runs again only what they lack. Home: the script's skeptic brief, between batches; the boot note's line, by the coordinator.
3. **The items for him that the routing owes, and PLAN lacks.** The gather routed the rungs' items (`PLAN.md:669-678`); the review routed none. Missing, as at climb batches 22c, 23 and 24 (their findings 3, 1 and 1), until the routing runs:
   - the forks 1 to 17 at their defaults (`CLIMB-BATCH-25.md:80-96`), with the three the record puts first for him (`:44-46`) and fork 5's reading of P-38 (split 1) named in the entry;
   - the points for his sight (`:98-103`; `RECORD.md`, "Points to report"): the team lines changed, what walk and the compiled path now do differently, walk's `RR32` arithmetic, directed roundings and integer divisors through reflection;
   - the record's "After the landing" (`:608-610`): review-queue items for row 861's form and for item 331's finding on `ZZ32`'s `big`, item 331's 27 cut to 25 (rung A moved `Int`'s and `RR32`'s `asFloat`), and F-32's count of `IntLiteral`'s bindings (finding 5);
   - item 326, taken at its default on his go, to close (the boot note, "Next, for the coordinator, in order", 3).

   The review queue's head still names climb batch 25 "not yet planned" (`review-queue.md:8`, `:15`, `:33`). Home: the routing (Part 4).
4. **P-38's title is false in effect, his text** (split 1). "The compiler prelude's defects are not repaired" no longer holds for the prelude's `NN64` printing and prefix `BOXMINUS` (rows 326 and 860, through the helpers that rung U fixed) or its compiled `CHOOSE` (rows 521 and 855, rung K of climb batch 24). The decision stands for the prelude's own text. Default: none on record; his rule of 2026-10-31 that bringing the record in line with the implementation needs no approval (`review-queue.md:2093`, item 337's home) lets the record writer state it, for example "The compiler prelude's own text is not repaired: its defects go with it at the switch-over. A helper of `nativeHelpers/` that the one library binds is fixed for the one library, and the prelude's value moves with it.", and name it to him. Home: the record writer, by `record.py`, after the record-landing workflow.
5. **FACTS that the landing left stale or incomplete.**
   - F-32 (`FACTS.md:30`): "24 are `IntLiteral`'s five conversions … and 19 of its operators …, 4 among the 154 and 20 among the 158". The object holds 29 bindings, 4 of class A and 25 of class C (`FortressBuiltin.fss:486-563`; `plan-25/probes/n3-base.tsv`), as the record and its Fable review say (`CLIMB-BATCH-25.md:610`; `climb-batch-25-review.md`, section 1, "Notes for the coordinator"); `PLAN.md:57` repeats the 24.
   - F-240 (`FACTS.md:103`): the distance stage's rise from 198 s to 271 s at a lower start load has no cause in the entry (the commit stage's result; section 2 above), and its "Detail" list ends at climb batch 24's review.
   - F-315: it gives `test` on "a function declared `test`" and the `forbid` path's throw, not that the modifier now passes on a method too (split 3) or that the new path skips `finally` (row 890).

   Home: the record writer, by `record.py`.
6. **Code states measured again.**
   - The gather ran the distance stage on the merged tree, 02:52:20 to 02:56:09, 222 s, as row 873's check, where fork 13 says "the gather runs neither" (`CLIMB-BATCH-25.md:92`); the gate measured the same code at 03:25 (`a0ec6bc13`'s code is `8833d89c5`'s: `b1149e218` and `a0ec6bc13` touch only `explorations/`). Rung U's brief gives row 873's check as "the distance stage on your tree" (`climb-batch-workflow.js:240`), U's own run (212 s, '#total 0'); the gather read it as one of its own. It cost 3.8 minutes beside the demos, and no tokens to speak of.
   - Rung C ran the planner's code-generator probe on the base's `CodeGen` again, 01:20:00 to 01:24:15, in a copy seeded from the base build, for the like comparison its record gives, "against 50 in 14 kinds on its base in the same session" (F-34); the planner had measured that code state, 50 in 14 kinds (`CLIMB-BATCH-25.md`, "The code generator"). The probe counts refusals, which load does not move.

   Proposed (mine): the gather's brief says that a row whose test is a stage closes on the rung's run of it and the gate's. Home: the script's gather brief, between batches.
7. **A wait at the skill's own cap lost the cache once: 361K.** Rung U waited with `wait_for` 270 s (23:40:15 to 23:44:45), and its next call, 284 s after its last, wrote its context again, 360,537 tokens with a cache read of 40,101 (`gaps.py`). Five other waits of 282 s to 319 s between calls in this run kept the cache. So the cap leaves about 30 s for the call around the wait. No proposal of mine; the process study's to weigh, with a lower cap such as 240 s.

   **Correction of 2026-11-05.** The review's 284 s ran from the end of the model's thinking to the next request, and so hid the cause. The prompt cache's five minutes count from the start of the request that issued the wait. That request began at 23:39:28 UTC, right after the previous tool result. The model thought for about 45 s, and issued the wait call at 23:40:15. The wait ended at 23:44:46, after 271 s. The next request went out at 23:44:57, 11 s later, and lost the cache. From the request's start to the next request: 329 s. So the thinking before the wait call ate the margin. The same agent's earlier wait of 270 s kept the cache; the scout did not measure the thinking before that call. With the cap of 240 s that `session.md` now gives, this case would have come to about 299 s, a margin of about one second. The cap is before the curator (`/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/batch25/rung-u-cache-loss.md`).
8. **`revival-changes.md` was read by 9 of the 20 agents,** against 20 reads by 18 agents at climb batch 24 (`skill-load.py`): the seven workers, rung A in its killed launch only, and skeptics D and P, P in its killed launch only. The skill says "every task needs `revival-changes.md`, read whole before work" (`.claude/skills/fortress-repo/SKILL.md:203`). The skill's load fell to 11.4 % of writes, from 16.3 %. No proposal of mine; the process study's to weigh against what the readers met.
9. **Slips of the boot note** (`3c4db3cef`): "18 agents, about 2.4M tokens by the harness's count" is not the record's measure (6.03M of writes over 20 transcripts); "after the seven rungs' results and as the first skeptics started" has six (finding 2); "New rows 880 to 890" are 880 to 892; and it lists the seven rung worktrees "to remove after the review", which the commit stage removed (its result; `git worktree list` shows none of them). Climb batch 24's finding 11, met again. Home: the boot note.

## Part 2. Did the practice hold

### The skeptics' fixes

From the journal's results, each `SKEPTIC.md` and each branch's log (`git log 97a416b18..origin/wip/<slug>`): 7 fix commits, all corrections, none contested; no defect of a change fixed.

| Rung | Fix commits | Defects of the change | Test first, the skeptic's reading of the worker's transcript |
|---|---|---|---|
| D | `b7211ab2b` (28 assertions in each guard, the brief's value list for the directed roundings; the report's counts and a citation) | 0 | the walk guard green on the base at 00:09:01; the compiled guard red on the base at 00:11:27, 'Tests run: 2,  Failures: 2' ('… names no static helper: …simpleDoubleArith.doubleIsNaN'); the sample applied at 00:12:26, built at 00:13:03 |
| P | none | 0 | the walk guard green on the base at 23:15:18; the compiled guard red at 23:15:57, 'Tests run: 2,  Failures: 2'; the sample at 23:16:58, the class at 23:17:19, the build at 23:17:46 |
| A | `0be1ccdbd` (the report's four classes with static `toDouble`, which call `Unsigned.toDouble`) | 0 | in the first launch: the walk guard 'OK (1 test)' on the base at 01:37:37; the compiled guard red at 01:38:04, 'Tests run: 2,  Failures: 2'; the tests committed at 01:38:14; the build at 01:38:49; green at 01:40:03 |
| R | `1a9bc9707` (`DIVREM` and `DIVMOD` declared by neither library: `XXXDivRemDivModWalk` and row 881) | 0 | the walk tests red on the base at 00:56:34, 'Tests run: 6,  Failures: 5'; the compiled guard at 00:58:20, 'Tests run: 2,  Failures: 2'; the patch at 00:58:43, the build at 00:59:03 |
| U | `6c3daa011` (row 886 reaches a program's own `UnsignedLong`: `XXXNativeHelperOwnUnsignedLongCompiled`) | 0, row 886's `UnsignedLong` half a consequence of the change, recorded with its `XXX` test | the walk guard 'OK (1 test)' on the base at 23:11:21; `junit.sh base` 23:12:57 to 23:13:18, 'Tests run: 14,  Failures: 6'; the tests committed at 23:14:24, the change after |
| N | none | 0 | the compiled guard red on the base at 00:12:20 ('File NativeHelperFamilyDivisorsCompiled.fss has 1 error.'); the sample at 00:12:28, the helpers at 00:13:34 to 00:13:51, the build at 00:14:11; tests and change in one commit, which the record allows |
| C | `33cf2e541` (comment lines, `tests.tex` cited as a chapter, a provenance line), `6678a80d0` (rows 890 and 891, with their pairs and walk guards), `6555d011d` (row 892) | 0, row 890's `forbid` half a consequence of the change, recorded | the three tests red on the base's build at 00:57:09, 'Tests run: 6,  Failures: 6'; the first `CodeGen.java` edit at 01:00:21; the build at 01:05:30; green at 01:24:45, 'OK (9 tests)' |

- Every fix stays inside its rung's work. The review checked all 7 as applied (`fixesChecked`).
- Against the batches before: 24 made 18 with 0 defects, 23 4 with 0, 22c 14 with 1, 22 8 with 0, 21b 7 with 1, 21 13 with 1, batch 20 11 with 0.
- The skeptics found four of the thirteen new rows (881, 890, 891, 892) and widened a fifth (886). No fix this time is a worker's file written from the journal: every branch carried its own `REPORT.md` and `record.md` (`RECORD.md`, "Files written from the journal"; climb batch 24's finding 5, built).

### Workers, test first

From each skeptic's reading of its worker's transcript (the table above, and each `SKEPTIC.md`, its section 2): every worker saw its compiled guard or its walk tests fail on the base's code before its change was built, and its walk guard pass on the base by design. No miss of order. Rung A's order was read in its first launch's transcript, before the restart; rung C rewrote its `forbid` test after its first edit and saw it fail again on the base build at 01:04:53, before its build.

### The merged-diff review

- Approved: nothing blocking. Four corrections in `20eab4036`; nothing routed; 7 fixes checked as applied.
- It did not name: the items for him that PLAN lacks (finding 3), fork 5's reading of P-38 (finding 4), F-32's `IntLiteral` count, which the record listed for after the landing (finding 5), and the gather's distance run against fork 13 (finding 6). The gather's waits and the restart's cost lie outside its brief.
- Cost: 238K beside the gate, 9.3 minutes.

### Builds and runs, repeated or not

- **Builds:** one for each code state: D, P, R, U, N and C once each, A once in its first launch; the gather once on the merged tree; the gate's build of that code, 11 s. No skeptic built (`nohup.py`; `batch-measures.py`, which misses `nice -n 19 ant compileAll`).
- **Suites:** U, D, N and R `ant testQuick` and `ant testSystem` once on their final code; P `ant testSystem` and its compiled guard (fork 12); A `ant testQuick` in its first launch, killed by the restart two minutes in, then both suites in its second; C its own tests and 23 neighbouring `.test` files, 'OK (36 tests)'; no skeptic and not the gather. The gate ran `testFast`, `testSystem` and `testSpecData`.
- **The stages:** D, P, A, R, U and N once each on their final trees; P's distance once more, with one string pointed at a wrong helper and restored after, a control on a new code state; N its two stages beside each other; C none (fork 13); no skeptic, since no rung changed the checker's code; the gather the distance on the merged tree (finding 6); the gate once each.
- **The code generator's probe:** C twice in a seeded copy, on its edit and on the base's `CodeGen` (finding 6).
- **The demos:** the gather, 52 of 52 from the first.
- **The specification:** the gather once on its final text; the commit stage copied that PDF.
- **The ladder subset:** D, P, R, U, N and C on their own trees; A checked the baseline's ladder files for its names, none; no move.
- **Walk old against new:** each skeptic's own programs against the old code through `old-fortress.sh`; the workers' value programs, from D's 458 printed results to N's 8,840, `diff` empty but for the remainders by zero.
- **Taken from the record, not run again:** climb batch 24's tables as every rung's before; the planner's runs on the base; the base build `/home/user/fortress-base25` at `dc571c1f3`, whose code is the base's, as the old code.

### Refusals by the harness and the tools

- **No write refused.** Every worker and skeptic wrote its report through a heredoc (climb batch 24's finding 5, built in `7abc5c21c`).
- **Two `sleep 60` refused** by the harness, the gather's at 02:50:33 and rung P's at 23:37:52: 'Blocked: sleep 60 followed by: … To wait for a condition, use Monitor with an until-loop' (`errs.py`; finding 1).
- **One call refused by the automatic permission check:** rung C's run of its walk guards with the base build's own `harness-one.sh`, '[Modify Shared Resources]' (01:25:25; C.worker.2).
- **Rows refused for length:** the gather's row 880 three times (a row of 1,246 characters, then claims of 386 and 307 against 300) and row 529's note and rewrite (notes of 916 and 720 against 700); one `ledger.py close` batch for a test path; skeptic C's two drafts with a `?` in the number cell. Each was written again.
- **One run killed:** skeptic P's program, exit 137, at the restart (01:42:29).
- No refusal made a refusal cycle; none cost a cache refill.

### The commit stage's fold of FACTS

Its brief asks for the landed figures, numbers only, by `record.py set`. It changed F-53's title from climb batch 24's to 25's, kept its totals at 0, and wrote F-240's figures: the count stage about 160 s by the file times of the gate's log, the distance stage 271 s (`FortressLibrary` 205 s) at load 0.59 against 198 s (152 s) at 1.84. It found no sentence false and named the distance rise as unexplained (its result). `record.py check --base 20eab4036` printed 0 failures (its result).

### The practice's measures, batches 20 to 25

| Measure | B20 | B21 | B21b | B22 | B22c | B23 | B24 | B25 |
|---|---|---|---|---|---|---|---|---|
| Written | 2.64M | 4.75M | 3.50M | 2.82M | 4.61M | 3.20M (2.44M finished) | 5.74M | 6.03M (5.58M finished) |
| Rungs, agents | 2, 8 | 4, 14 | 3, 10 | 3, 10 | 4, 15 | 2, 11 (8 finished) | 7, 18 | 7, 20 (18 finished) |
| Launches killed by restarts | 0 | 0 | 0 | 0 | 0 | 3, 0.76M, 23.9 % | 0 | 2, 0.45M, 7.4 % |
| Per rung, all roles | 1.32M | 1.19M | 1.17M | 0.94M | 1.15M | 1.60M (1.22M finished) | 0.82M | 0.86M (0.80M finished) |
| First calls | 0.47M, 7 cold | 0.68M, 8 cold | 0.51M, 7 cold | 0.47M, 6 cold | 0.76M, 9 cold | 0.58M, 8 cold (0.43M, 6) | 0.75M, 7 cold | 0.83M, 8 cold |
| Cache refills | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 3, 1.07M, 17.7 % |
| Refusal cycles | 0 | 0 | 0 | 0 | 1 rung, 3.2 % | 0 | 0 | 0 |
| Rulings and repairs on the merged tree | 0 | 8.3 % | 0 | 0 | 9.7 % | 0 | 0 | 0 |
| Skeptic fix commits (defects) | 11 (0) | 13 (1) | 7 (1) | 8 (0) | 14 (1) | 4 (0) | 18 (0) | 7 (0) |
| Distance | 26 sites gone | 0 gone (full check 186) | 0 | 5 gone, to 0 | 0, over 14 under `compile` | 0, the 21 moved bindings checked | 0, 173 moved bindings checked | 0, 288 moved bindings checked |
| Count stage at the gate | 63 s | about 78 s | about 90 s | about 150 s | about 170 s | about 155 s | about 150 s | about 160 s |
| Distance stage at the gate | 161 s | 206 s | 235 s | 227 s | 238 s | 240 s | 198 s | 271 s |
| Skill's load | 9.8 % | 10.4 % | 11.3 % | 12.5 % | 13.6 % | 13.3 % (11.6 % finished) | 16.3 % | 11.4 % |
| Briefing, estimated | 3.4 % | 4.1 % | 3.2 % | 4.2 % | 4.0 % | 5.4 % (4.3 % finished) | 4.2 % (4.5 % by this review's pattern) | 4.4 % |
| microGPT quick pair, verdicts | 7 of 7 both | 7 of 7 both | 7 of 7 both | 7 of 7 both | 7 of 7 both | 7 of 7 both | 7 of 7 both | 7 of 7 both |

The rows of B20 to B24 are `reviews/batch-24-review.md`'s, and the cache refills `batch-measures.py`'s; `batch-measures.py` on the eight runs gives the same totals.

### Climb batch 24's findings, a batch later

1. The items for him that its routing owed: routed (review-queue items 326 to 343; PLAN, "Climb batch 24, listed for his review"); item 326 taken at its default on his go for this batch (the boot note). This batch's are owed again (finding 3).
2. Way 2b's cost: stated in item 326 and in its PLAN line (`PLAN.md:645`); this batch's guards over `NN32`, `NN64` and `UnsignedLong` assert values above the signed half (fork 9; split 7).
3. A rung's file list held back a test: built in the skeptic's brief (`7abc5c21c`); held: skeptics R, U and C wrote their `XXX` tests in the folders their kinds take, and rows 865 and 866 have `XXX` reproducers now (rung U).
4. Code states built or measured again: the gather's PDF taken by the commit stage, built (`7abc5c21c`) and held; a rung's suites on a replaced code state, not met; met in another form, the gather's distance and rung C's base probe (finding 6).
5. Workers' reports refused: built (reports by heredoc, `7abc5c21c`); no write refused. `RECORD.md:173` of climb batch 24 corrected (`08cc69e2d`).
6. FACTS and POSITIONS: F-34 measured again by this batch's planner and rung C (47 in 11 kinds); F-306's row, moot since rung R; F-240's sentence rewritten; P-73, P-151 and P-156 rewritten under his rule (`be3b07aac`; items 337 and 342). F-299, F-308 and F-298 are still past the record's 600 characters, among 205 entries that `record.py check` reports.
7. The plan's lines for its rows: lines for rows 862, 864, 868 to 870 and 872 are in PLAN; H's four, three of them moved by rung U.
8. Scratch in the shared scratchpad: built (`7abc5c21c`, "scratch under tmp/"); no agent of this run wrote there.
9. The skill's load: fell to 11.4 % (finding 8).
10. The rewrite's limits: one PLAN line gathered them (`PLAN.md:652`), and rung U probed the seven, five shown as rows 882 to 886. Built.
11. Slips of the boot note: met again (finding 9).

### Misses, by kind

Numbered on from `batch-24-review.md`'s 876.

Found inside the batch:
- **The planner's text wrong, caught before landing:**
  - 877, "49 new helpers" for P's 49 bindings, 46 (worker P; `CLIMB-BATCH-25.md:29`, `:147`, `:459`);
  - 878, `sample-N.patch`'s signed Euclid, -2 at `ZZ64`'s minimum `GCD` 6 (worker N);
  - 879, "`DIVREM` and `DIVMOD`, which the library writes in Fortress" (skeptic R, `1a9bc9707`; row 881; `CLIMB-BATCH-25.md:212`);
  - 880, row 866's run key in U's brief (worker U, `XXXObjectExtendsZZ32Compiled.test:3`).
- **A test that reached too little:**
  - 881, D's two guards without cells of the brief's value list (skeptic D, `b7211ab2b`).
- **A defect without its home:**
  - 882, row 886's `UnsignedLong` half (skeptic U, `6c3daa011`);
  - 883, rows 890 and 891 (skeptic C, `6678a80d0`);
  - 884, row 892 (skeptic C, `6555d011d`).
- **Text claiming more than the code or the evidence:**
  - 885, A's report on the static `toDouble` methods (skeptic A, `0be1ccdbd`);
  - 886, C's test comments, its `tests.tex` citation, a provenance line and its record's "by reading; not run" (skeptic C, `33cf2e541`, `6678a80d0`);
  - 887, D's report's counts and a citation (skeptic D, `b7211ab2b`);
  - 888, F-306's 25 and 47, an off-by-one already at the base (the review, `20eab4036`).
- **Sentences made false and not listed:**
  - 889, F-118 (U), F-32's title (N) and `PLAN.md:52`'s rows 336 and 848 (R) (the review, `20eab4036`).
- **The record's premises:**
  - 890, fork 1's shared files: one reproducer written by D and P under one name (the gather; gather.1);
  - 891, the gate's forecasts and the cost and time estimates (the gate; this review).
- **Process:**
  - 892, the two launches the VM restart killed, and skeptic P's work done again;
  - 893, the gather's two foreground waits of 600 s and their cache refills;
  - 894, rung U's refill after a wait at the skill's cap;
  - 895, the gather's distance run against fork 13, and rung C's probe of the base again;
  - 896, two `sleep 60` refused, and six row writes refused for length or a path;
  - 897, rung C's step refused by the permission check (C.worker.2);
  - 898, the disk at 2.1G free during the run (the boot note).

Found by this review: 899 to 907, findings 1 to 9 above.

**Against the earlier notes.**
- 22 found inside the batch (877 to 898), against 24's 21, 23's 26 and 22c's 35.
- None was a fault of a change that landed in a moved value: the planner's four faults were caught by the workers and a skeptic before landing, and the skeptics' fixes were corrections and new rows. Two consequences of a change are recorded as rows: a program's own `UnsignedLong` takes the library's transfer (row 886), and the new `forbid` path skips `finally` (row 890).
- The known costs: `nextUp` at a signed zero is contested (row 880); `ZZ`'s `CHOOSE` out of range answers 1 (row 887); an overloaded helper over the unsigned types stays refused (row 885); `DIVREM` and `DIVMOD` are not declared (row 881); a compiled nested `try` is matched outer first, a `finally` is skipped on an escaping exception, and a `try` with only `finally` fails verification (rows 888, 890, 891); the prelude's `NN64` printing and negation moved with the shared helpers (split 1).

## Part 3. Skill sentences the batch made false

For the skill writer. The gather lists four (gather.2, `PLAN.md:678`; `RECORD.md`, "Left for the coordinator and the skill writer"), and the batch writes no skill text. I read each sentence below on `main` at `3c4db3cef`.

**False, on the gather's list:**
1. **`fortress-repo/references/compiler.md:44`:** "It refuses a function or method with a modifier other than `getter`, `setter`, `io`, `private` and `abstract`, such as `override` (ledger row 650)." Since rung C the guard admits `test` too, on a function and a method (`CodeGen.java:2947-2949`; split 3). Proposed: "It refuses a function or method with a modifier other than `getter`, `setter`, `io`, `private`, `abstract` and `test`, such as `override` (ledger row 650)."
2. **`compiler.md:86`:** "`self` gets a transfer helper only in a method of `NN32`, `NN64` or `Char` itself." Since rung U an argument declared `UnsignedLong`, walk's object of `NN64`, takes the `NN64` argument transfer, `self` in its methods among them (`BuiltinPrimitiveRewriter.java:189-190`; F-313). And the rewrite reads the declared type by its simple name, so a program's own `Char` or `UnsignedLong` takes the library's transfer (row 886). Proposed: "`self` gets a transfer helper only in a method of `NN32`, `NN64` or `Char` itself, or of `UnsignedLong`, walk's object of `NN64`, which takes `NN64`'s. The rewrite reads the declared type by its simple name, so a program's own type named `Char` or `UnsignedLong` takes the same transfer (ledger row 886)."
3. **`interpreter.md:89`:** "Most bindings name one." 161 of 449 name a glue class (F-32). Proposed: "Of the library's bindings, fewer name one at each batch of the natives (FACTS F-32 counts them)."
4. **`library.md:56`:** "Most of the library's bindings still name glue classes." The same. Proposed: "Many of the library's bindings still name glue classes (FACTS F-32 counts them)."

**Incomplete, made so by the batch, not on the list:**
5. **`interpreter.md:124`:** "`DIV` by zero on `ZZ32`, `ZZ64`, `ZZ`, `NN32` and `NN64` raises `DivisionByZero` in this way." Since rung R, `REM` and `MOD` do too (F-312; F-24). Proposed: "`DIV`, `REM` and `MOD` by zero on `ZZ32`, `ZZ64`, `ZZ`, `NN32` and `NN64` raise `DivisionByZero` in this way."
6. **`compiler.md:36-46`,** "What the compiled path cannot compile yet": the code generator compiles a `try` now with a `forbid` clause too, and the batch measured four walls of a compiled `try` and an `extends` entry that a compiled test meets: a `try` nested in another is matched against the outer `catch` first (row 888); a `finally` clause does not run when an exception leaves the `try` block, the `forbid` path among them (row 890); a `try` with only a `finally` clause fails the JVM's verification (row 891); and a tuple static argument holding `Any` in an `extends` entry crashes the code generator (row 889). Proposed, after the list: "A compiled `try` has three defects: a nested `try` is matched against the outer `catch` first (ledger row 888), a `finally` clause does not run when an exception leaves the `try` block (row 890), and a `try` with only a `finally` clause fails the JVM's verification (row 891). An `extends` entry that gives a generic trait a tuple holding `Any` crashes the code generator (row 889). Copy the form of their `XXX` tests in `compiler_tests/`."
7. **`compiler.md:70-84`,** the natives' stops: the rewrite runs only after a compile in the same JVM, so `fortress parse` and `fortress api` alone do not rewrite a helper string (row 882). A worker who reads a parsed tree to check a binding meets it. Proposed, a line after `:83`: "The rewrite is switched on by the compile, so `fortress parse` and `fortress api` alone leave a helper string a call of `builtinPrimitive` (ledger row 882)."

**Sentences that hold, met by the batch:**
- `session.md:17-19`, the refusal of `sleep N` and "In an agent, keep every wait under 270 s": true, and not followed by the gather (finding 1); a wait at the cap lost the cache once (finding 7).
- `SKILL.md:203`, "every task needs `revival-changes.md`, read whole before work": read by 9 of 20 agents (finding 8).
- `compiler.md:165`, the count stage "about 150 seconds, more under load": 158 s at this gate.
- `gate.md:3`, "in about 25 minutes": 23.5 minutes.
- `compiler.md:86`'s check of the sign by a test at 2^63 and above: U's guards do so.
- `tests-writing.md:84`, home 2: the skeptics' `XXX` tests for rows 881, 886, 890 and 891.
- `coordinator/references/batch.md:45`: the share reported, 16 of 16. `:49`: no rung changed the checker's code, and no skeptic ran a stage. `:51`: P's file outside its list, `FloatNextUpSignedZeroWalk.fss`, landed and is on the review list through gather.1.

## Part 4. Routing

Checked against `main` at `3c4db3cef`: the gather's PLAN entries (in the rung commits and `a0ec6bc13`), the review's (`20eab4036`), the boot note (`3c4db3cef`) and the review queue. The manual's routing (`coordinator/climb-batch-workflow.md`, "After the landing: the coordinator's routing") runs after this review, by the boot note ("Next, for the coordinator, in order", 2 and 3), after the record-landing workflow's first live run.

**Step by step:**
1. The landing report: for after the record-landing workflow and the naming of the landed decisions (the boot note, "Next, for the coordinator, in order", 2 and 3).
2. The routing: not run yet. What it owes is below.
3. FACTS: the commit stage folded F-53 and F-240, the gather and the review the rest; owed: F-32's `IntLiteral` count, F-240's cause and detail, F-315 (finding 5), and P-38's title (finding 4). The record-landing workflow takes the landing's FACTS changes first (`coordinator/references/batch.md`, "The landing", step 4).
4. The skills: the writer's task with gather.2 and Part 3; the orientation update on the landing's changed entries, F-24, F-32, F-34, F-118, F-125, F-240, F-268, F-298, F-299, F-303, F-305, F-306, F-308 and F-310 to F-315 (`git diff 97a416b18 11d2d8764 -- explorations/coordinator/FACTS.md`; POSITIONS unchanged); a cold read, the writer's fixes and the push.
5. The next batch, after step 4.
6. This review.

### What the record listed for him, and PLAN lacks

- **The forks 1 to 17 and the points for his sight** (`CLIMB-BATCH-25.md:80-103`): no entry. Climb batch 24's routing wrote such entries (review-queue items 328 and 329). One entry each, default as landed; the forks' entry names the three the record puts first for him, fork 3's five headers at `RR64`, fork 6's transfer for `UnsignedLong` and fork 5's printing, with fork 5's reading of P-38 (split 1).
- **The record's "After the landing"** (`:608-610`): review-queue items for row 861's form (`Char`'s `asExprString`, contested) and for item 331's finding, that `ZZ32`'s `big` fits `simpleArbitraryPrecisionArith.makeZZfromZZ32` as a bare string; item 331's 27 cut to 25.
- **Item 326,** taken at its default with his go: to close, with its home.
- **The files outside the rungs' lists:** P's `FloatNextUpSignedZeroWalk.fss`, merged with D's (gather.1, `PLAN.md:677`). Covered.

### The items of the rungs, the gather and the review

- D.worker.1, D.skeptic.2, P.worker.2 and P.skeptic.1's second question (row 880), `PLAN.md:669`: default today's values. Sound.
- D.skeptic.1, `:670`: both spellings as landed. Sound; a naming question in the library's way.
- P.worker.1 and P.skeptic.1's first question, `:671`: the team's two families as they bind. Sound.
- U.worker.1 and U.skeptic.1 (row 885), `:672`: refused, as landed. Sound.
- N.worker.1 (row 887), `:673`: the glue's 1 kept. Sound; it sits beside item 333, the `CHOOSE` property at `m = n = −1`.
- C.worker.1 and C.skeptic.2 (D6), `:674`: the wider guard. Sound.
- C.skeptic.1 (row 890), `:675`: recorded, not fixed for one abrupt path of three. Sound.
- C.worker.2 and C.skeptic.3, `:676`: an allow rule for the base build's `harness-one.sh`; no default. Sound; a setting of his.
- gather.1 and gather.2, `:677-678`: told. gather.2's four sentences are Part 3's first four; Part 3 adds three.
- The review routed nothing.

### New rows

- 880: D.worker.1.
- 881, `DIVREM` and `DIVMOD` declared by neither library: no line. With the library's integer operators, a later family or N3's rest.
- 882, 883 and 884, the rewrite run only after a compile, a component parsed four times, a grammar's component not rewritten: no line. With the next rung that edits the rewrite, as `PLAN.md:652` gathered the limits before; that line is built and moves.
- 885: U.worker.1.
- 886, the simple-name reading: no line. With 882 to 884.
- 887: N.worker.1.
- 888, 889, 891 and 892, the compiled `try`'s two other defects, the tuple holding `Any`, a non-test's call of a test: no line. With the code generator's next rungs (`PLAN.md:60`).
- 890: C.skeptic.1.
- 874 and 875, filed by plan: no line. 874, the wrappers' wall, with N5; 875, `OneShot`'s `atomic`, with the code generator's kinds.
- Closed 336, 848, 326, 860, 873, 820, 821 and 823: their PLAN mentions move (below).

### Answered, stale or overlong in the record

- **PLAN's "Where we stand"** (`PLAN.md:9-13`): "Runs" ends at climb batch 24; the live thread gives 24's gate and its 173 bindings; "Landed" ends at climb batch 24; "Next" launches climb batch 25 after 24's steps. All want this landing: 115 bindings moved, 288 of 449 on helpers, the count and the distance 0, the code generator's three walls, and climb batch 26 next.
- **Phase 4's line for climb batch 25** (`:47`): "not yet planned". One line, with `11d2d8764` and this review.
- **Phase 4's natives line** (`:48-57`): its counts of 173 and 276 are now 288 and 161; N3's line now has 108 of its 158 moved; "the 24 `IntLiteral` bindings (4 of A, 20 of C)" at `:57` is 29, 4 and 25 (finding 5). These parts move word for word to `PLAN-history.md` under the landing's heading.
- **Phase 4's code-generator line** (`:60`): "refused 52 declarations of the library's twelve components … so the present count is unmeasured", and rows 820, 821 and 823 among the kinds left, and "it has not been measured over the fourteen": now 47 in 11 kinds over the fourteen (F-34), the three rows closed.
- **"Climb batch 24, listed for his review":** the rewrite's limits line (`:652`), review-routed.1 (`:653`) and review-routed.2 (`:654`) are built by rung U, and H.worker.1 (`:651`, item 343) is answered by U's probes; they move.
- **The review queue:** its head names climb batch 25 "not yet planned" (`review-queue.md:8`, `:15`, `:33`); it wants climb batch 26, and this batch's items with numbers (the boot note, "Waiting on him"); item 326 to close.
- **FACTS:** F-32's `IntLiteral` count, F-240, F-315 (finding 5). F-24, F-34, F-53, F-118, F-125, F-298, F-299, F-303, F-305, F-306, F-308 and F-310 to F-314 hold, read against the tree.
- **POSITIONS:** P-38's title (finding 4), his text. P-58, P-37, P-39, P-70 and P-73 hold.
- **The manual and the script:** the gather's brief on waits and on a stage as a row's test (findings 1 and 6); the skeptic's brief on a resume (finding 2).
- **The boot note:** four slips (finding 9).

### The steps due before the next batch

1. **This review committed,** with its INDEX line; then the record-landing workflow (the boot note, "Next, for the coordinator, in order", 2) and the routing above: PLAN's "Where we stand", phase 4's line for climb batch 25, the natives line, the code-generator line, the four built items of climb batch 24's list; lines for rows 874, 875, 881 to 884, 886, 888, 889, 891 and 892; review-queue entries for the forks with the three put first, the points, row 861's form and item 331's finding; item 326 closed; the review queue's head.
2. **FACTS and POSITIONS:** F-32's `IntLiteral` count, F-240, F-315 by `record.py`; P-38's title under his rule of 2026-10-31, named to him.
3. **The skills:** the writer's task with gather.2 and Part 3, the orientation update, a cold read, the writer's fixes and the push, before the next batch's planner is briefed (the manual's routing, steps 4 and 5).
4. **The script, between batches:** finding 1's waits in the gather's brief, finding 2's resume line in the skeptic's, finding 6's stage as a row's test.
5. **For him, with defaults:** the batch's items at `PLAN.md:669-678` as landed; the forks and points as landed; P-38's rewording, named.
6. **The next batch,** by the record's "After the landing" (`CLIMB-BATCH-25.md:610`): the string family after items 310 and 340; the rest of the 109 after items 331 and 332; `ZZ`'s conversions after the integer conversions' answer; `Char`'s `asExprString` after row 861's; the literals with N5; the next code-generator rung, the local functions after its probe (row 304).

## What I did not do

- I built nothing and ran no Fortress program, suite, stage or JVM. I changed no file of the tree but this review and its INDEX line, and committed only those two.
- I read the run's transcripts only through scripts: `batch-measures.py` on eight runs, `transcript-study/skill-load.py` and `spend.py` on this run, and scratch scripts in `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/rev25/`: `agents.py`, `calls.py`, `errs.py`, `runs.py`, `nohup.py`, `teststeps.py` and `tokens.py`, copied unchanged from climb batch 24's review's `rev24/`; `brief2.py`, copied with its file pattern widened to `(?:brief|briefing|slice)(?:-p|-|_)?\d+\.txt`, and run on climb batch 24's run too; and `gaps.py`, new, which lists each agent's gaps between messages and its large writes.
- I ran `record.py check --base 97a416b18` and `ledger.py landing-check 97a416b18` ('0 failures'; 'no finding'), `facts-extract.sh`, `grep`, `diff` and `git`, which write nothing.
- The stages' gate times come from the gate's call times and the commit stage's file times. I compared no walk timing, and no microGPT seconds.
- I did not read the coordinating session; what he was told comes from PLAN, the boot note and the record.

## For the curator

Climb batch 25 landed on 3 November and is pushed. It is the third batch of the natives, the library functions whose bodies are Java. It moved 115 more of them onto Java methods that both the interpreter and the compiler can call, so 288 of the library's 449 now do: the bit and rounding operations of the 64-bit floating-point type, all 49 of the 32-bit floating-point type, five conversions to floating point, the remainders, five over the unsigned types, and 18 integer divisors with the clock. Most of the Java methods are new, copied from the interpreter's own code. Under the interpreter, a remainder by zero now raises the library's DivisionByZero exception, as the specification says, where it used to end the program. Compiled programs now print large unsigned integers as unsigned numbers. The code generator now compiles three forms it refused: a type that extends a generic trait at Any, a try with a forbid clause, and a function declared test.

The gate, the full check of the merged tree, was green. The compiled checker still finds no error in the fourteen core components, now with all 288 moved functions checked against their Java methods. Both quick microGPT checks passed 7 of 7 under the interpreter. The run wrote 6.0 million tokens in 4 hours 47 minutes, against the plan's 6.3 million and 5 hours 30 minutes. A restart of the machine at 01:43 killed two agents, which cost 0.45 million, and the stage that merges the rungs waited twice for ten minutes at a time, which cost 0.7 million; both are fixable in the batch script.

No finding of this review asks you to change a decision. One of your decisions now reads wider than what has landed: P-38 says that the compiler prelude's defects are not repaired. This batch fixed two Java methods that both libraries share, for the one library's sake, and the old prelude's printing of large 64-bit unsigned values and its wrapping negation changed with them, as its binomial coefficient did in climb batch 24. The prelude's own text is unchanged. The decision stands; its sentence waits for its rewording, which your rule of 31 October lets the record writer make and name to you.

The batch's items for you are on your review list, each with a default that keeps what landed: whether the next value up from minus zero is zero or the smallest positive number; which ASCII operator is the specification's upward-rounded addition; the two spellings of the square-root roundings; a Java method with several overloads over the unsigned types, which the compiler still refuses; the unbounded integer's binomial coefficient out of range, which answers 1 where the specification gives 0; the test modifier on methods; a finally clause that compiled code skips when an exception escapes; and a permission rule for running the old build's own test tool. The coordinator's filing after the landing still owes you entries for the batch's seventeen small choices taken at their defaults, among them the three the planner put first for you (five of the team's declarations of the conversion to floating point changed from the interpreter's float object to RR64, the conversion helper given to the interpreter's unsigned 64-bit object, and the printing fix), and the team's code lines that the batch changed.
