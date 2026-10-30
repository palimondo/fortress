<!-- The combined post-batch review of climb batch 23, the batch of coordinator/CLIMB-BATCH-23.md that opens phase 4 with the natives' mechanism (rungs C and W; run wf_a81f810e-eb0, base 3cd653815, 04:00 to 06:58 UTC on 2026-10-30, killed by VM restarts at 04:10:59 and 05:44:27 UTC and resumed each time with the same arguments; landed and pushed at df71bc585: rung C 98b04d371, rung W 640acb4a1, the closes 4548bfb63, the gather record 3f0347fb7, the merged-diff review's corrections d836122e2, the gate's tables df71bc585), owed at the landing, in the form of reviews/batch-22c-review.md, by a review worker reading only, against main at f2714393a (the boot note 960142697, the skill writer's c97a7143f, the orientation update 79f5c4ce1, and the record writer's b5103253a and f2714393a came after the landing). The run's folder holds eleven agents: the three launches that the restarts killed (rung W a1bb732d, rung C a8ea5a99, the gather ad86f423) and the eight that finished; each measure gives the run whole and the finished launches apart. The measures are batch-measures.py's on climb batches 20 (wf_4cf8e3cb-bf5), 21 (wf_225c8ddd-913), 21b (wf_db1dda0a-97d), 22 (wf_5e692c7a-778), 22c (wf_1a894dd6-45c) and this run, transcript-study/skill-load.py's on this run, and scratch scripts of this review's for per-agent times, briefing calls, builds, suites, stages, detached commands, refusals and writes split at a time, in /tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/rev23/. Its briefing script, brief2.py, gives climb batch 22c's figures exactly for that batch's workers, skeptics and judge. Tokens are writes only (input plus cache creation, one count per message id). The microGPT walk check is reported by its verdict only, at the curator's ruling of 2026-10-23. Besides reading, this review ran only those scripts, record.py check, ledger.py landing-check, facts-extract.sh, grep, diff and git, which write nothing in the tree. -->

# Climb batch 23: the natives' mechanism, the count and the distance with 21 bindings checked, the two restarts, the cost, the practice, the routing and the steps owed before the next batch

## What came up in this run

### 1. The count 0 and the distance 0, row by row against climb batch 22c's tables

**What the record expected** (`coordinator/CLIMB-BATCH-23.md:373-382`): the count 0, its table gaining one row, `com.sun.fortress.nativeHelpers 0`; the distance 0 over the fourteen, `#crash none`, `compare.sh` printing 'DISTANCE SAME 0' and no setting line; `testSystem` 685 plus W's five, 690; the compiler track 1,332 plus C's four, 1,336, and the misc track 439; `testSpecData` 130; the 42 atomic runs; the ladder with no move; the 52 demos at the gather; microGPT's quick pair at the commit stage. The gate ran on `3f0347fb7` and was green (the gate's result). The review's `d836122e2` came while it ran and touched only `explorations/`; `git diff --name-only 3f0347fb7 HEAD -- ProjectFortress Library build.xml` printed nothing (the gate's result), so no `# repair-ungated` line was owed.

**The count's table** (`climb-batch-23/gate/checker-count.txt` against `climb-batch-22c/gate/checker-count.txt`): `diff` prints only `14a15 > com.sun.fortress.nativeHelpers 0`. Every row is 0, `#total 0`, `#locations 0`, `#crash none`, `#shadow matches the tracked StaticChecker`. The table has 14 api rows.
- **The new row comes from rung C's rewrite reading rung W's strings.** Rung W's commit makes 19 of trait `ZZ32`'s bindings name helpers (`Library/FortressLibrary.fss:741-810`, `640acb4a1`). Rung C's `BuiltinPrimitiveRewriter.rewrite` gives the `FortressLibrary` component, for those strings, a synthetic `import java com.sun.fortress.nativeHelpers.{simpleIntArith.intEQ => builtinPrimitive_simpleIntArith_intEQ, …}`, one import per package (`ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java:53-62`, `:111-115`, `98b04d371`). The repository makes the foreign api of that package from the import collector's view of the file (`compiler/Parser.java:157-159`). The count stage checks the component with every api it imports and lists each one (`explorations/coordinator/tools/checker-count/run.sh`, its `#api` rows). The three helper classes of the 19 (`simpleIntArith`, `simpleLongArith`, `simpleUnsignedIntArith`) are in one package, so they make one row.
- Neither rung alone makes it. On rung C's tree no library string names a helper, and its table equals climb batch 22c's (`rung-natives-compiled/REPORT.md:122`). On rung W's tree nothing rewrites, and its table equals it too (`rung-natives-walk/REPORT.md:92`). The planner's run of both texts foresaw the row (`CLIMB-BATCH-23.md:233`, `:379`), and the gather's run on the merged tree first printed it (`climb-batch-23/RECORD.md:40`).
- No row rose. Nothing else is new.

**The distance's table** (`climb-batch-23/gate/distance.txt` against 22c's): `diff` prints only the `#seconds` row, 240 (`FortressLibrary` 174) against 238 (174), and the `#machine` row's load at start, 1.54 against 1.70. The first line, `#total 0`, every `#kind` 0, `#crash none` and `#shadow` are the same. `compare.sh` printed 'DISTANCE SAME   0' and no setting line (`summary.txt:121`). The table names no api, so the foreign api that the stage also checks (`CLIMB-BATCH-23.md:233`) shows nowhere in it.

**The per-site list** (`compile-ladder/gate/distance-sites.tsv`): its header alone, as before (the commit stage's result).

**The summary's other rows** (`climb-batch-23/gate/summary.txt` against 22c's):
- `CompilerJUTest` 1,332 to 1,338: rung C's five cases (`NativeHelperBindingCompiled`, a link and a run, `XXXNativeHelperMisfitCompiled`, `XXXNativeHelperMisspeltCompiled` and the worker's guard `XXXNativeHelperOutsidePackageCompiled`) and the gather's `XXXNativeHelperVarargsCompiled`.
- `NamingCzarJUTest` 2 to 3: skeptic C's `testForeignOneLibrary` (`6243147f4`), so the misc track 439 to 440.
- `testSystem` 685 to 694, over shards of 181, 169, 174 and 170: rung W's eight new files (`NativeHelperBindingWalk`, `NativeHelperRaiseWalk`, `NativeHelperMisspeltWalk`, `ZZ32DivisionByZeroWalk`, the guard `NativeHelperFamilyZZ32Walk`, `NativeHelperMisfitWalk`, `NativeHelperUncarriedWalk`, `NativeHelperNonFlatStringWalk`) and skeptic W's `XXXNativeHelperUncarriedSelfWalk`.
- The record's forecasts, 690, 1,336 and 439, counted only the planner's tests.
- The library track 86, the other-compiler track 263 and `testSpecData` 130, as before. The atomic runs: 42 of 42 `PASS`.
- `compileAll` 44 s: the batch changed Java, the caches started again empty, and the gate ran the library order (the gate's result).

**The ladder** (`climb-batch-23/gate/ladder/`): 85 of 85 at `pass`, no move; `comparison.txt` and `microgpt-comparison.txt` are empty. Against 22c's files, `ladder.tsv` and `microgpt-phase.md` differ only in their seconds columns: with that column masked, `diff` prints nothing. So no first error moved, and the gate's comparison hid nothing this time (against climb batch 22c's three APL rows, `reviews/batch-22c-review.md`, section 1). The eighteen microGPT components keep their phases, all `disambiguate`.

### 2. The stages' times against climb batch 22c's gate

- **The count stage: about 155 s.** By the gate's call times it was launched at 06:47:01 UTC and its table read at 06:49:40, polled every 5 s. At 22c's gate, about 170 s by the same method. The batch moved neither beyond noise. Rung C's tree took 155 s at a load of 4.05; rung W's 161 s at 7.6; the gather's merged tree 130 s (each rung's `REPORT.md`, "The checker count and the distance"; `RECORD.md:40`). Rung C reads, without measuring it, that a component whose text names a helper is parsed whole four times for one analysis (`rung-natives-compiled/REPORT.md:172`); on the merged tree `FortressLibrary.fss` is one, and no run shows the cost.
- **The distance stage:** 240 s (`FortressLibrary` 174 s) at load 1.54, against 238 s (174 s) at 1.70. On the same code the gather's run took 179 s (130 s) at 1.31 (`RECORD.md:41`).
- **The suites:** `testFast` 6 min 50 s, against 6 min 48 s; `testSystem` 3 min 33 s, against 3 min 31 s; `testSpecData` 1 min 11 s, against 1 min 9 s (`summary.txt:61-68`).
- **The machine line:** load 2.93, 5.61, 4.25, against 2.98, 5.69, 4.29. It still reads `FORTRESS_THREADS=1` (batch 11's finding 8).
- **The gate:** 24.8 minutes (06:26:16 to 06:51:04), against 25.4.
- **F-240** still gives climb batch 22c's gate as the last, and its figures: false since this landing (finding 3).

### 3. The cost, by role, against the record and the batches before

From `batch-measures.py` on the six runs, and this review's scripts on this run's folder. **The run wrote 3.20M over 11 agents, in 2 h 57 min** (04:00:48 to 06:57:49 UTC). **The three launches that the restarts killed wrote 0.76M of it (23.9 %); the eight that finished wrote 2.44M.**

| Role | B20 | B21 | B21b | B22 | B22c | B23 | B23 share |
|---|---|---|---|---|---|---|---|
| Rung workers | 848K (2) | 1.64M (4) | 1.34M (3) | 890K (3) | 1.51M (4) | 772K (2), and 476K in the two killed launches | 24.1 %, 14.9 % |
| Skeptics | 757K (2) | 1.52M (4) | 1.07M (3) | 958K (3) | 1.37M (4) | 740K (2) | 23.1 % |
| Judge on a rung | 0 | 0 | 0 | 0 | 146K | 0 | |
| Gather | 426K | 565K | 439K | 392K | 501K | 348K, and 289K in the killed launch | 10.9 %, 9.0 % |
| Merged-diff review | 362K | 381K | 412K | 335K | 376K | 322K | 10.1 % |
| Its judge and repair | 0 | 165K + 227K | 0 | 0 | 231K + 214K | 0 | |
| Gate | 117K | 127K | 122K | 127K | 132K | 135K | 4.2 % |
| Commit | 131K | 125K | 118K | 122K | 136K | 121K | 3.8 % |
| **Total** | **2.64M** | **4.75M** | **3.50M** | **2.82M** | **4.61M** | **3.20M** (2.44M finished) | |
| Agents, rungs | 8, 2 | 14, 4 | 10, 3 | 10, 3 | 15, 4 | 11 (8 finished), 2 | |
| Span | 2 h 10 | 4 h 26 | 3 h 40 | 2 h 35 | 4 h 37 | 2 h 57 | |
| Per rung, all roles | 1.32M | 1.19M | 1.17M | 0.94M | 1.15M | 1.60M (1.22M finished) | |

**Against the record:** about 2.4M, "from 2.1M if no fix is contested and the review blocks nothing, to 3.2M with a judge and a repair round on a rung and on the review", and about 2 h 40 min, the demos in the gather's time (`CLIMB-BATCH-23.md:58`). No fix was contested and the review blocked nothing.
- **The finished launches: 2.44M, on the estimate.** Workers 0.77M against 0.8M (W 424K against 0.45M, C 349K against 0.35M); skeptics 0.74M against 0.6M (W 411K, C 329K); the fixed roles 0.93M against 1.0M.
- **With the killed launches: 3.20M, at the top of the range.** The restarts took the room the record kept for judges and repair rounds.
- **The time:** 2 h 57 min, 17 minutes over. About 30 minutes went to the restarts: the first launches of the rungs ran 9.9 minutes and the run stood 3.8 minutes before their second launches; the first gather ran 12.5 minutes and the run stood 3.9 minutes. Without them, about 2 h 27 min.
- The rungs took 49 and 47 minutes in their second launches, against the manifest's 100 and 120 (`CLIMB-BATCH-23.md:310`, `:329`), which order the scatter only.

**Against the batches before:**
- Per rung, all roles: 1.22M by the finished launches, against 1.15M at 22c and 0.94M to 1.32M before. With the killed launches, 1.60M.
- Workers and skeptics together per rung, finished: 0.76M, against 0.72M, 0.62M, 0.80M, 0.79M and 0.80M. Both rungs were Java with whole suites to run.
- The fixed roles, finished: 0.93M, against 1.15M (beside 0.59M of rulings and repair) at 22c, 0.98M at 22, 1.09M, 1.20M and 1.04M before.

**What the restarts cost and what survived them.** The journal holds two `started` lines for each rung worker and for the gather, under one key each, and one `result` each, from the second launch. A resume runs an unfinished agent from its start, on its worktree's leftovers (`.claude/skills/coordinator/references/delegating.md:57`).
- **Rung W.** The first launch had seeded the worktree, pushed the branch, seen the patch's five tests fail on the base's code (04:03:47, 'Tests run: 5, Failures: 4') and its two own tests (04:07:36, 'Tests run: 2, Failures: 2'), committed all seven (`9e93b85e0`, `db80ea79b`), applied the patch's code, improved the loader and started a build that the restart cut (`rung-natives-walk/REPORT.md:13`). The second launch found and read its predecessor's transcript (calls 9 to 22, 04:15:12 to 04:16:51), wrote an extract of it to the session's scratchpad as `prev.txt`, kept the commits and the edit, read the briefing again, and ran the seven tests on the base build again (04:19:08, 'Tests run: 7, Failures: 6'), by its decision 10 (`REPORT.md:148`).
- **Rung C.** The first launch had seeded the worktree, read the briefing, its first part saved as `tmp/rung-natives-compiled/briefing1.txt`, applied the tests and seen them fail on the base's code (04:06:54, 'Tests run: 4, Failures: 4'), then applied the patch's code. The second launch found the worktree ('already has a build; left as it is'), wrote an extract of the first transcript as `prevC.txt` in the session's scratchpad, read the first launch's `briefing1.txt` back and the other parts again, and cited the first failing run, which it did not run again (`rung-natives-compiled/REPORT.md:44-52`).
- **The gather.** The first launch composed rung C's commit (`98b04d371`, 05:43:35) and ran the merged tree's first five tests by one detached script from 05:35:39, the two stages among them, before the restart. Its demo run and its fold of rung W's record were cut. The coordinator stashed rung W's staged files and the ledger edits, as `delegating.md:61` says. The second launch checked `98b04d371` against the branch, reused the five results, applied rung W's patch and folded its record again from the start, and ran the demos again from the first (`RECORD.md:9`, `:30`, `:42`).
- Before its first briefing call, each second rung launch wrote about 17K more than its first launch had (W 144K against 127K; C 110K against 93K): the reading of the earlier transcript. So the restarts' cost is nearly the three killed launches' 0.76M, and about 30 minutes.

**The briefing's use and cost** (the `coordinator` skill's `references/batch.md:45` asks the share at a landing):
- **6 of 6 briefed launches read it, none in its first turn.** The briefed launches are the two killed rung launches, the two finished ones and the two skeptics. Their first briefing calls came at calls 13 to 23, 67 to 165 s after each launch's start: rung W 13 at 67 s and 23 at 165 s, rung C 15 at 78 s and 19 at 123 s, skeptic W 13 at 99 s, skeptic C 16 at 73 s. The second launches came to it later, after reading their predecessors' transcripts.
- Its results came to about 172K tokens, 5.4 % of writes, at 0.40 tokens a character plus 110 a call (31 calls, 420K characters). That counts each `--part` call and each briefing file read back:
  - workers: the killed launches W 37.2K and C 29.6K; the finished ones W 37.0K and C 23.0K. The planner's estimates were 36K and 30K (`CLIMB-BATCH-23.md:368-369`): close. Rung C's second launch read its first launch's part 1 back whole, part 2 by its headings and the patch itself, and parts 3 and 4 whole;
  - skeptics: W 22.7K, C 22.0K, each slice holding its rung's patch;
  - the finished launches alone: about 105K, 4.3 % of their 2.44M. Per briefed launch about 28.6K, against 18.6K at 22c: two rungs of Java with their patches as briefing keys.
- The batch's agents saved their briefing files inside their own worktrees (`tmp/`, `tmp/rung-natives-*/`), where at 22c they wrote them to the session's scratchpad (`reviews/batch-22c-review.md`, finding 8).

| Batch | Briefed agents | In the first turn | Run at all | At calls | Seconds after start | Its tokens (estimate) |
|---|---|---|---|---|---|---|
| 20 | 4 | 0 | 4 | 9 to 12 | 48 to 78 | 89K, 3.4 % |
| 21 | 9 | 0 | 9 | 8 to 15 | 24 to 97 | 193K, 4.1 % |
| 21b | 6 | 0 | 6 | 10 to 21 | 45 to 94 | about 111K, 3.2 % |
| 22 | 6 | 0 | 6 | 11 to 16 | 60 to 73 | about 117K, 4.2 % |
| 22c | 10 | 0 | 10 | 2 to 17 | 11 to 98 | about 186K, 4.0 % |
| 23 | 6 (4 finished) | 0 | 6 | 13 to 23 | 67 to 165 | about 172K, 5.4 % (finished 105K, 4.3 %) |

**Other measures.**
- **First calls:** 582K (18.2 %), 8 cold; the finished launches 430K (17.6 %), 6 cold. Rung C's two launches and skeptic C started warm (cache reads of 40K and 41K).
- **Cache refills:** 0. **Refusal cycles:** 0.
- **The skill's load** (`skill-load.py`): 426K, 13.3 %: 92K of load text (2.9 %) and 334K over 143 part reads (10.4 %), against 13.6 % at 22c. The killed launches' share is 143K; the finished launches' 283K is 11.6 % of theirs. `revival-changes.md`, `build-and-caches.md` and `interpreter.md` were read 12 times each. Rung W's second launch and the second gather also loaded the `cloud-container` skill, for the restart.
- **Builds:** rung W's first launch built once and was cut in a second; rung W's second launch built four times, three of them its improved loader's one code state (finding 4); rung C's second launch built two code states; skeptic C's `ant testOnly` built its unit test; the gather built the merged tree; the gate built `main`, the gather's code (finding 4). `batch-measures.py` counts five for rung W's second launch: one is its report, written by a heredoc that names `ant compileAll`.
- **Rows:** 5 opened (845 to 849); 2 closed (309, 796); 2 rewritten (336, 521), and 846 and 847 again by the review. Row 521's note, past the length limit, went in by a rewrite (`RECORD.md:116`). `ledger.py landing-check 3cd653815`: 'no finding'; `record.py check`: '0 failures' (this review's runs).

Per agent, in order of start (UTC; ids are the transcripts' `agent-<id>.jsonl`; messages are distinct message ids):

| Agent | Id | Writes | First call | Messages | Minutes | UTC |
|---|---|---|---|---|---|---|
| Rung W, first launch, killed | a1bb732d | 248K | 64K, cold | 69 | 9.9 | 04:00-04:10 |
| Rung C, first launch, killed | a8ea5a99 | 228K | 22K | 70 | 9.9 | 04:00-04:10 |
| Rung W | af24f980 | 424K | 62K, cold | 153 | 47.0 | 04:14-05:01 |
| Rung C | adad3a78 | 349K | 22K | 130 | 48.8 | 04:14-05:03 |
| Skeptic W | a2278f93 | 411K | 69K, cold | 126 | 30.2 | 05:01-05:31 |
| Skeptic C | a875c3e1 | 329K | 26K | 115 | 24.2 | 05:03-05:27 |
| Gather, first launch, killed | ad86f423 | 289K | 66K, cold | 74 | 12.5 | 05:31-05:44 |
| Gather | ac3da7cd | 348K | 65K, cold | 107 | 38.0 | 05:48-06:26 |
| Gate | a57c11ed | 135K | 58K, cold | 43 | 24.8 | 06:26-06:51 |
| Review | ade252e5 | 322K | 66K, cold | 93 | 17.7 | 06:26-06:43 |
| Commit | aca74f61 | 121K | 63K, cold | 41 | 6.6 | 06:51-06:57 |

Each skeptic started within 3 s of its worker's result, and the gather 2 s after skeptic W's. I did not measure the preparation beside the run: the planner's re-check on the new base and the coordinator's launch.

### 4. The tail

- **The gather** (348K, 38.0 minutes; its killed first launch 289K, 12.5 minutes):
  - It composed the two rung commits on `main` one patch at a time (`git apply --3way --index`), C then W, since W lands only with C; the rungs share no file (`comm -12` of the two name lists prints nothing), so nothing was re-anchored (`RECORD.md:21-26`). No conflict.
  - It seeded `/home/user/fortress-gather23` from the base build, applied both patches, built it and ran the library order. Under `nice -n 19`, one at a time: rung C's compiled tests in one JVM, 'OK (5 tests)', and 'OK (6 tests)' with its own varargs test; `NamingCzarJUTest`, 'Tests run: 3, Failures: 0'; rung W's walk tests in one JVM, 'OK (9 tests)'; the count stage, 0, 130 s, its table one row longer; the distance stage, 0, 179 s; the 52 demos, 'demos: 52 run, 52 reached their end', 05:53:32 to 06:24; the specification, 'BUILD SUCCESSFUL' twice, the warning count 0 (`RECORD.md:30-46`).
  - It opened rows 845 to 849, closed 309 and 796, rewrote 336 and 521, added F-298 and F-299 and rewrote F-24, F-32, F-111 and F-180. It corrected two sentences of the planner's record in place (`CLIMB-BATCH-23.md:89`, `:267`), the skeptics' `leftForGather` items.
  - It found the one interaction of text with code: rung W's revised comment has the compiler rewrite every body whose string names a helper, and rung C's rewrite leaves a declaration with a varargs parameter alone. It filed it as row 849 and gather.1, with a test and a sentence in the Appendix I entry's Effect (`RECORD.md:52`).
  - Misses: it ran both stages, which the gate ran again on the same code, though no row of this batch closes on a stage, and it built the specification that the commit stage built again (finding 4).
- **The merged-diff review** (322K, 17.7 minutes, beside the gate): **approved**, nothing blocking. Its corrections in `d836122e2`: row 847's claim named an object 'Holder' that no run measured, where the run was `object Ob`, 'Ob.len() = 2'; row 846's two citations of `Util.java` in reverse order; F-298's varargs clause without its source; a note under rung C's revival change, false of `main` on two clauses; and review-routed.1, the DSL grammar limit, for the next batch. It checked every skeptic's fix as applied (`fixesChecked`).
- **The gate** (135K, 24.8 minutes): green on `3f0347fb7`, as section 1 gives.
- **The commit** (121K, 6.6 minutes): it landed the tables and the per-site list, ran the quick microGPT walk check, rebuilt `Specification/fortress.pdf` (691 pages, the warning count 0), and pushed `main` to the three refs on the first try. It changed F-53's title to name climb batch 23 and named F-240 as false, leaving it. It removed both rung worktrees and kept the gather's, which is gone since.

### 5. The microGPT walk check

Its verdict lines (`summary.txt:122`, `:124`): "VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS" for `MicroGptAplQuick` and for `MicroGptFlatQuick` (the commit stage's result, `microgptWalk`), each run ending `rc=0`. So 7 of 7 on both programs, the first landing at which walk's `ZZ32` arithmetic runs through helpers (`CLIMB-BATCH-23.md:382`). By the ruling of 2026-10-23 the seconds are not compared (`PLAN.md:11`).

### 6. The natives after phase 4's first batch

**What the batch built.** P-58's mechanism on both paths. On every repository but walk's, a body `builtinPrimitive("com.sun.fortress.nativeHelpers.Class.method")` becomes at the parse a call of that public static method through a synthetic `import java`, `self` first for a method, so the checker checks the declaration against the method's Java signature (F-298). Walk loads such a string beside its glue classes, by the declared types, and raises a helper's compiled exception as the library's own (F-299). Of the library's 449 live bindings, 21 name helpers now: 19 of trait `ZZ32` and `Int`'s `asString` and `asExprString`; 428 still name glue classes (F-32 as rewritten in `b5103253a`).

**What the zero rests on now.** The gate's 0 and 0 read the 21 against their helpers for the first time. Three readings of the batch's planner hold that up, none confirmed by him:
- **Fork 5's stand-in reading** (`CLIMB-BATCH-23.md:105`): in walk's world, where the stages run, the checker reads a helper's Java types as the one library's, `int` as `FortressLibrary.ZZ32` (`compiler/NamingCzar.java:369-372`, `:464-505`). Without it, every moved binding is an error in the stages (the same fork). N5 removes the world test. Its side effect on walk's own written `import java` is C.skeptic.1 (`PLAN.md:632`); the reading itself has no entry.
- **Fork 2's switch** (`:102`): the rewrite runs in the gate's two stages, not only in the compile commands (`Shell.java:102-103`). P-58's "from the step that moves a binding" chose this key over the compiler's world, which would hide every moved binding from the stages until N5 (the same fork).
- **Fork 3's reading of P-58's "refuse a string that names no helper"** (`:103`): only a string under the helpers' package is refused; a glue string stays a call of `builtinPrimitive`, which the checker types at the declared return type and checks against no Java signature (F-298). Refusing glue strings would refuse all 428 of them before they move (the same fork). This is how the stages read every glue string before the batch too, so the zero rests on it no more than before.
- The zero over the fourteen still rests on climb batch 22c's fork 8 reading of `var` (row 844, review-queue item 295), unchanged.

**What stands between the library and the switch-over** (P-33; PLAN, phase 4):
- N1's next families. Of the 104 bindings that can name their helper as a bare string, 83 remain, `ZZ32`'s `CHOOSE` among them, which waits on row 521's helper fix. The 109 that cannot need a way first: `Char` 40, `NN32` 22 and `NN64` 20 read as `ZZ32` or `ZZ64` by the stand-in table (`CLIMB-BATCH-23.md:21`, `:247`, `:285`). Bindings over `String` wait on PLAN item 62 (row 846). The `asFloat`s answer `Float`.
- N2 to N4: the 61 with a helper nothing binds, the new helpers, the I/O objects; N5 on the switch-over day, with the 24 `IntLiteral` bindings (P-76; row 578).
- The code generator's 52 refusals (F-34), row 701, `System`'s 2 errors by the switch-over (P-33), and the names batch.

## Part 1. Conformance

### Method

As in `reviews/batch-22c-review.md`. For each rung I read its commit, its `REPORT.md` and `SKEPTIC.md` (and W's decision record), its section of the record (`CLIMB-BATCH-23.md:133-205`) with questions 1 and 2 and forks 1 to 20 (`:65-120`) and the points for his sight (`:122-127`), the gather's `RECORD.md`, the run's journal results, and the code and the specification on `main`. Three standards, kept apart: the specification; the library's own way (P-27), and for compiler and walk code the team's code beside it; and the decisions on record (P-58, P-33, P-37, P-12, P-29, P-30, P-39, P-79, P-95, P-96), with the facts the batch built or rewrote (F-24, F-32, F-53, F-111, F-180, F-298, F-299) and the record's forks.

### The verdicts

- **Rung C, the compiled half: in the spirit of P-58 and P-37.** At the parse, before the checker, a helper string becomes a synthetic `import java` and a call, and a misnamed one under the helpers' package is a static error, through the team's own `import java` machinery; the compiler's prelude gains nothing. Splits 1, 4 and 5 below.
- **Rung W, walk's half and the first family: in the spirit of P-58, of the specification's rule for division by zero, and of the revision form (P-96).** Walk loads a helper beside its glue classes; 21 bindings move by their strings only; `ZZ32`'s `DIV` by zero now raises `DivisionByZero`, as `opr-overview.tex:164-165` says; the printed comment is revised with its callout, its Appendix I entry and its decision record. Splits 2, 3 and 8.
- **No ruling.** Both skeptics approved with two corrections each and nothing contested; the review approved; no worker stopped.

### Where the text, the brief or the principles split

**1. A declaration with a varargs parameter (gather.1; row 849).**
- The revised comment says "The compiler, before type checking, rewrites the body into a call of the helper" (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:19`), as P-58 says the compiled path rewrites "each such body". Rung C's rewrite returns a declaration with a varargs parameter unchanged (`BuiltinPrimitiveRewriter.java:105`), as the record's text gave it (`CLIMB-BATCH-23.md:139`) and rung C's decision 6 kept (`rung-natives-compiled/REPORT.md:198`).
- In the compiler's world such a body stops, 'Variable builtinPrimitive is not defined.'; in the one library's world, where the stages run, it stays a call of `builtinPrimitive`, checked against no helper (row 849; skeptic C, `SKEPTIC.md:19`). No library binding with a varargs parameter names a helper: the three name glue classes (`Library/Reflect.fss:313`, `:319`, `:389`).
- The gather filed it as the manual's rule 4 asks, but with a test that pins today's message, not the text's rule, since no test of the text's answer can pass while the departure shows (`RECORD.md:52`; finding 8). Default: as landed. On the list (`PLAN.md:634`).

**2. A method's `self` of a type that no Java type carries (row 847).** The revised comment and fork 10 make a string that fits no overload an error at load. Walk reads a method's `self` only by the helper's Java type (`interpreter/glue/StaticNativeApp.java:119-121`), since its loader is not told the declaring type (fork 9; `FunctionClosure.java:47-66`). So a helper bound in a method of a program's own object loads, and its call passes the object as that Java type reads it: 'Ob.len() = 2' over a `String` helper, 'getInt not implemented for FOrdinaryObject' over an `int` one (`rung-natives-walk/SKEPTIC.md:77-78`). Every library binding's `self` is carried. Gated by `XXXNativeHelperUncarriedSelfWalk`, named in the Effect. A defect the batch's own text settles, deferred, with no PLAN line (finding 6).

**3. A native over `String` (row 846; PLAN item 62).** Walk's loader passes a non-flat string's type name, as the glue classes do: `slen(s)` gives 9 for a 52-character string (`StaticNativeApp.java:199`; `interpreter/glue/prim/Util.java:254`, `:286`). The comment says walk "carries each value at its declared type". Skeptic W notes the row could cite the comment once he answers which fix holds (`SKEPTIC.md:128`). The library's other natives over strings take `FlatString` (F-299), the library's own practice for the second way. Default: neither, until the family that moves such a binding.

**4. Fork 5's reading reaches walk's own written `import java` (row 845; C.skeptic.1).** The reading applies "whenever the world is walk's" (`CLIMB-BATCH-23.md:105`), and walk's repository hands a written `import java` to `ForeignJava` in that world (`repository/GraphRepository.java:957`). So such an import under walk now stops at F-180's gap 3, 'Non-top-level reference to imported …', where it stopped at gap 1. No suite, demo or library component writes one (`rung-natives-compiled/SKEPTIC.md:31-33`). The planner's "code that walk does not run" was false and is corrected (`CLIMB-BATCH-23.md:267`). Default: as landed (`PLAN.md:632`).

**5. P-58's refusal, read by fork 3.** P-58: the compiled path is "to refuse a string that names no helper". Fork 3 refuses only a string under `com.sun.fortress.nativeHelpers.`; every other string stays a call of `builtinPrimitive`, since refusing the glue strings would refuse all 428 before they move (`CLIMB-BATCH-23.md:103`). Rung C keyed the rewrite itself to the package too, for a crash on the planner's text ('IllegalArgumentException: Undefined API: java.lang', `rung-natives-compiled/REPORT.md:25-33`), so fork 3's description of the text no longer holds. A reading of his text taken at a default, and the one the stages' zero has always rested on (section 6). No entry puts it before him (finding 1).

**6. The distance stage in phase 4's gates (question 1).** P-39 measures the distance in "the gates of batches whose work drives the distance down", "Why: ... a batch pays for it only when the distance is the number that it tries to move" (`POSITIONS.md:36`); the coordinator skill says "the distance in phase 3" (`.claude/skills/coordinator/references/batch.md:56`). His go took option 1, the stage in every gate until the switch-over lands, since only the distance reads `FortressBuiltin`'s component, where 2 of the 21 sit (`CLIMB-BATCH-23.md:31-34`, `:73`). This gate ran it, 240 s. Consequential by the record's own word: it bends P-39, which still reads as before, and no POSITIONS line holds the answer.

**7. The first family inside the mechanism's batch (question 2).** PLAN split N0, the mechanism, from N1, the bound natives; his go took option 1, the family in rung W, so walk's method paths met the library's bindings in this batch (`CLIMB-BATCH-23.md:36-39`, `:89`). Consequential by the record's own word: it reads PLAN's split anew. Built.

**8. The comment's form against the team's.** The team's comment wraps at about 77 characters. The revision keeps its sixteen lines, so that the 354 citations of later lines of the api stay right, with two lines of 841 and 333 characters (`FortressBuiltin.fsi:19`, `:21`; rung W's decision 4, `REPORT.md:142`). The record's citations against the source's form; nothing on record settles it. A text choice inside decided ground, routine.

### Rung C, `98b04d371`

**What landed.** `rung-C.patch` with four changes (`rung-natives-compiled/REPORT.md:6-10`, `:23`): the rewrite keyed to the helpers' package (`BuiltinPrimitiveRewriter.java:95`); the varargs test before the alias is registered (`:105`); no record citations in the source comments (`:14-33`, `NamingCzar.java:464-468`); and a case of a functional method whose `self` is second (`compiler_tests/NativeHelperBindingCompiled.fss:9`). The hooks (`compiler/Parser.java:157-159`, `:329-330`), the switch (`Shell.java:102-103`), the reading (`NamingCzar.java:369-372`, `:464-505`), four tests, and the skeptic's `NamingCzarJUTest.testForeignOneLibrary` (`NamingCzarJUTest.java:40-72`).

**Standard 1.** The specification says nothing of `builtinPrimitive` or `import java` but the api comment it prints (`Specification/library/default-libraries.tex:37-39`) and "Native Components", whose syntax and semantics are "implementation dependent" (`Specification/basic/components/source-code.tex:513-518`). The comment's old text became false for a compiled program's helper string; rung W revised it. Appendix I's row 560 entry, on calls of `builtinPrimitive` in the glue strings, stays true (`changes.tex:2465-2476`).

**Standard 2.** The synthetic import is the parser's own node for a written `import java` (`parser/Compilation.rats:235-239`), the body shape walk's (`interpreter/glue/NativeApp.java:169-188`), and the reading a second table beside the prelude's, which stays (`NamingCzar.java:440-463`); natives-shape's patch of the table itself failed the team's `NamingCzarJUTest` (`CLIMB-BATCH-23.md:266`). No device was invented where the tree has one (skeptic C, `SKEPTIC.md:11-12`). Team lines changed: `Parser.importCollector` and `parseFileConvertExn`, `Shell.specificRepository`, `NamingCzar`'s three-argument form, and the team's `NamingCzarJUTest`, one method added, no line of theirs changed.

**Standard 3.** P-58's compiled half built, refusal by fork 3 (split 5). P-37: no declaration added to the compiler's prelude, its table untouched. Forks 2 to 5 built; fork 14, row 309 closed; fork 16, both stages once on the final tree (155 s, 205 s), each equal to climb batch 22c's tables; fork 17, no speed pass; fork 18, the expected errors as `XXX` compile tests. Limits read from the code, not measured: a component that imports a DSL grammar is not rewritten (review-routed.1); the switch is one static flag that the repository a JVM makes last sets (`Shell.java:103`); `fortress parse` and `fortress api` show no rewrite; a helper-naming component is parsed whole four times for one analysis (`REPORT.md:169-173`). Only the first has a home (finding 5).

**Verdict: in the spirit,** with splits 1, 4 and 5.

### Rung W, `640acb4a1`

**What landed.** `rung-W.patch` with one change of substance, a declared type that no Java type carries refused at load (`StaticNativeApp.java:97-111`), where the patch took it as a wildcard and gave 'loose(4000000000, 5) = true' (`rung-natives-walk/REPORT.md:25-34`). The hook (`NativeApp.java:194-201`); the 21 strings exactly as the patch writes them (`Library/FortressLibrary.fss:741-810`; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:371`, `:373`); the comment (`FortressBuiltin.fsi:14-29`) with its `\revision` callout; Appendix I's "A native binding that names a static helper" (`Specification/appendices/changes.tex:4423-4530`); the decision record; eight test files and the skeptic's `XXX` pair. In this commit on `main` the gather added row 849's test and its sentence in the Effect (`changes.tex:4499-4502`).

**Standard 1.** "For integer results, division by zero throws a DivisionByZero." (`Specification/basic/operators/opr-overview.tex:164-165`): now so for `ZZ32`'s `DIV` under walk (`ZZ32DivisionByZeroWalk`). The revision form (P-96) whole: the callout prints in the api's box ('Section I.1.44'); the entry quotes the original from the `.fsi`, since the frozen copy keeps none (`Specification-1.0-frozen/library/default-libraries.tex:39`), gives the reason, the decision of 10 October (P-58), the reversal and "The same under route C"; its Effect names rows 521, 336, 848, 846, 847 and 849. The front matter's paragraph stays true (`Specification/fortress/preamble.tex:54-64`).

**Standard 2.** The raise takes `Int.overflow()`'s form (`interpreter/glue/prim/Int.java:258-266`); the refusal at load is walk's `bug` at the declaration, as for a missing glue class (`NativeApp.java:210-211`); the bindings keep the library's form, only their strings change; `CHOOSE` and `Int`'s `asFloat` stay on their glue classes (fork 12). The one departure from the team's form is split 8. Team lines changed: 21 strings, the comment (its `glue.primitive` corrected to `glue.prim`, a package the tree has), and 8 lines of `NativeApp.checkAndLoadNative`.

**Standard 3.** P-58's walk half built, and question 2's family; P-29: the reflective call weighs nothing; P-79: the 52 demos at the gather; P-30: the quick pair at the commit stage, 7 of 7. Forks 6 to 15 built; fork 9's arity rule and fork 10's refusal leave split 2's case; fork 13, row 336 rewritten; fork 14, row 796 closed; fork 15, the comment revised. P-58's "Every binding still names a glue class." and its sentences on rows 796 and 309 are false (gather.2).

**Verdict: in the spirit,** with splits 2, 3 and 8.

### The decisions consequential for him, and the readings he has not confirmed

By the coordinator skill's sense of consequential (`CLIMB-BATCH-23.md:63`; `review-queue.md`, its header), the batch took these, each at its default:
- **Question 1, the distance stage in every gate of phase 4 until the switch-over** (split 6). Taken with his go of 22:36:37 UTC on 2026-10-29 ("And you need to run both batches."). It bends P-39. Default: as landed.
- **Question 2, the first family inside rung W** (split 7). Taken with the same go. It reads PLAN's N0 and N1 anew. Default: as landed.
- **gather.1, the varargs departure** (split 1): a choice among ways the record does not settle. Default: as landed, the text standing and the departure named.
- **PLAN item 62, natives over `String`** (split 3): it touches the library and walk's loader. Default: neither, until that family.

The results that stand on a reading he has not confirmed:
- **The gate's 0 and 0 with the 21 checked** stand on fork 5's stand-in reading and fork 2's switch (section 6), planner's defaults. Without fork 5, every moved binding is an error in the stages.
- **The stages' reading of every glue string** stands on fork 3's reading of P-58's refusal (split 5), as before the batch.
- **The 21 bindings' walk values** stand on forks 6 to 9: the overload chosen by the declared types, values carried at them, `self` first, a dotted method told by the helper's arity. The guard asserts them equal on the old and new code (`NativeHelperFamilyZZ32Walk`); row 847 shows where fork 9's rule lets a binding load that fork 10 means to refuse.
- **The revised comment** stands with its departures named (rows 846, 847 and 849).
- **Phase 3's zero over the fourteen** still stands on climb batch 22c's fork 8 reading of `var` (row 844; review-queue item 295).

### The record's questions and forks, against what landed

| Question or fork | Rung | Landed |
|---|---|---|
| Question 1, the distance stage in phase 4's gates | gate | Default with his go; the gate ran it (split 6) |
| Question 2, the first family in rung W | W | Default with his go; 21 moved (split 7) |
| 1, two rungs, W lands only with C | all | Built; applied C, then W |
| 2, the switch per repository | C | Built (`Shell.java:102-103`); the stages rewrite |
| 3, the refusal under the helpers' package | C | Built; the rewrite keyed to the package too (split 5) |
| 4, the import collector's hook for a file naming a helper | C | Built (`Parser.java:157-159`) |
| 5, the stand-in reading in walk's world | C | Built; it reaches walk's own `import java` (split 4, row 845) |
| 6, the overload by the declared types | W | Built |
| 7, values at the declared types | W | Built; an uncarried type refused at load (W's improvement) |
| 8, a functional method's `self` first | W | Built |
| 9, a dotted method told by the helper's arity | W | Built; split 2's case |
| 10, the refusal at load | W | Built, but for split 2 |
| 11, the raise translation | W | Built (`StaticNativeApp.java:182-191`) |
| 12, the family of 21, `CHOOSE` and `asFloat` out | W | Built |
| 13, row 336 rewritten | W | Rewritten; its siblings on `NN32`, `NN64` and `ZZ` are row 848 |
| 14, rows 796 and 309 closed | gather | Closed in `4548bfb63` |
| 15, the comment revised by W | W | Built, in the revision form (split 8) |
| 16, both stages once on each final tree | C, W | Run; equal to climb batch 22c's tables |
| 17, no speed pass | C, W | Kept |
| 18, expected errors as `XXX` compile tests | C, gather | Kept; the gather's pins today's message (split 1) |
| 19, the 52 demos at the gather | gather | 52 of 52 |
| 20, nothing declared | all | Kept; nothing came |

### The global questions

- **Promised against landed.** Both halves of P-58's mechanism and the first family; rows 309 and 796 closed and 336 rewritten, as planned; the count and the distance 0 with the 21 read through the rewrite, the count's new row as forecast. Beyond the plan: rows 845 to 849.
- **The record's premises that failed:**
  - "A user program cannot reach them, since a helper takes Java values and a program's `self` is an object of its own." (`CLIMB-BATCH-23.md:89` before the gather's correction): row 847;
  - "code that walk does not run" (`:267` before the correction): row 845;
  - fork 3's "The rewrite itself takes any string that names a public static method of a class that loads" (`:103`): the text crashed there, and rung C keyed the rewrite to the package;
  - "By the planner's runs no other value moves" (`:125`): true of the library's family; for a program's own helper binding a refusal at load becomes a quiet value (rows 846 and 847);
  - the gate's forecasts 690, 1,336 and 439, against 694, 1,338 and 440; the expected minutes, 100 and 120, against 49 and 47;
  - the record's citation of row 560 for how the checker reads a glue string (`:101`, `:144`, `:148`, `:187`; both rungs' reports): row 560 is closed and is about `fail`-like calls with no expected type. F-298 now cites the checker's own line (`b5103253a`); the batch's texts keep the old pointer.
- **Built twice: no.** The rungs share no file and no declaration (`RECORD.md:25`).
- **The library's way: yes for each,** with split 8.
- **Together.** On the merged tree the stages read W's 21 through C's rewrite: 0 and 0, the count's table one row longer; both rungs' tests pass in one JVM each; the 52 demos reach their end; the gate is green. The one interaction is split 1.

### Findings

Ranked by what they cost or risk next, each with its home.

1. **The items for him that the routing owes, and PLAN lacks.** The gather routed the items the rungs returned (`PLAN.md:147`, `:628-636`). Missing, as at climb batch 22c (its finding 3):
   - questions 1 and 2, which the record calls "on your review list" (`CLIMB-BATCH-23.md:32`, `:37`); no review-queue item holds them;
   - the forks 1 to 20 at their defaults (`:97-120`), fork 3's reading of P-58 (split 5) and fork 5's reading, which the zero now rests on (section 6), among them;
   - the points for his sight (`:122-127`; `RECORD.md`, "Points to report"): the team's lines changed, the skeptic's method in the team's `NamingCzarJUTest` among them (a file outside the rung's list goes on the review list, `.claude/skills/coordinator/references/batch.md:51`); walk's `ZZ32` `DIV` by zero now raising `DivisionByZero`; and the two quiet values a program's own helper binding can now give (rows 846 and 847).
   
   The review checked the gather's routing and did not name these. Home: the routing.
2. **A resumed agent is told nothing of its earlier launch.** A resume runs an unfinished agent from its start with its first brief (`delegating.md:57`). The script's head for an agent that comes back with nothing, which names what an earlier attempt may have left (`climb-batch-workflow.md`, "An agent that comes back with nothing"), does not reach it. So each of the three second launches found its predecessor's transcript on its own and read it (rung W calls 9 to 22, rung C calls 4 to 11, the gather calls 3 to 6 and 29 to 30), and each wrote extracts outside its tree: `prev.txt` and `prevC.txt` in the session's scratchpad, the first gather's copies of three reports there too, the second gather's `w-now.patch` there and `/tmp/claude-0/c.patch`. Rung W ran its base tests again (finding 4). The second gather redid rung W's apply and fold, since the coordinator stashed the first one's work, as `delegating.md:61` says: its first brief asks a clean tree. The boot note asks whether that rule or the script's `recoverGather`, which takes a dirty tree as its start, stands (`BOOT.md`, "For him in the morning"); `recoverGather` serves a retry inside a run, not a resume, so both hold, each in its case. Proposed (mine): a resume gives each unfinished agent the retry's head, naming its earlier launch's transcript and what it may have left, with any extract under the agent's own `tmp/`; the stash then stays a fallback. Home: the script and `delegating.md:57-61`, between batches; batch 20's finding 13 (`PLAN.md:179`), met in a fifth batch.
3. **F-240 left false at a fifth landing, and two texts made false by question 1.**
   - F-240 (`FACTS.md:101`): "about 170 s and its distance stage 238 s at the last landed gate, climb batch 22c's". Now about 155 s by the gate's call times, and 240 s (`FortressLibrary` 174 s) at load 1.54. The commit stage named it, as its brief says; climb batch 22's finding 4, to write F-240's figures at the commit stage, is not built.
   - P-39's last sentences (`POSITIONS.md:36`) no longer describe phase 4's gates, and no POSITIONS line holds question 1's answer. His text.
   - `.claude/skills/coordinator/references/batch.md:56` is false (Part 3). His yes on wording.

   Home: the routing, by `record.py`; P-39 and `batch.md:56` with his word.
4. **Code states built or measured again.**
   - The gather ran the count stage (130 s) and the distance stage (179 s) on the merged tree and built it; the gate ran both and built `main` on the same code (155 s, 240 s, 44 s and the library order). No row of this batch closes on a stage (fork 16), so nothing asked for the gather's runs. Climb batch 22's finding 7, met a third time (the boot note keeps it open). About 5 minutes of one core, a build and the library order.
   - The specification was built twice on one text: by the gather after its sentence and the rows' numbers (`RECORD.md:45`), then removed, and by the commit stage, after no commit had changed `Specification/` since (`640acb4a1` holds the gather's text; `d836122e2` touched only `explorations/`). About 1.6 minutes. Climb batch 22c's finding 5, met again with the gather in the repair's place.
   - Rung W's second launch ran the seven tests on the base's code that its first launch had run (its decision 10), and built its improved loader three times: at 04:18:35; at 04:24:00, after a one-run build of the patch's text to show its test red, which needs the restore; and at 04:34:32, when only the `.fsi` comment and Appendix I had changed since, which walk analyses again by itself (`.claude/skills/fortress-repo/references/build-and-caches.md:59`). The last build was not needed.
   - The demos ran again from the first after the second restart: forced.

   Proposed: the gather runs no stage where no row closes on one, as climb batch 22's finding 7 proposed; the commit stage cites the gather's specification build when no later commit changed `Specification/`. Home: the script's gather and commit roles and the manual, between batches.
5. **Rung C's other limits read from the code have no home.** The review routed the DSL grammar limit (review-routed.1). The switch is one static flag, set by whichever repository a JVM makes last (`Shell.java:103`), so in a JVM that makes both repositories the rewrite follows the one made last, not the one that parses; `fortress parse` and `fortress api` show no rewrite; and a helper-naming component is parsed whole four times for one analysis (`rung-natives-compiled/REPORT.md:171-173`). None is measured, and none is reached by a suite today. Proposed (mine): one PLAN line beside review-routed.1, for the next natives rung to probe a JVM that makes both repositories. Home: the routing.
6. **The plan's lines that the batch's rows and its left-out items need.** Rows 847 and 848 have no PLAN line, and row 845 only C.skeptic.1's; N1's sub-item for the 109 bindings that cannot move as bare strings, which the record asks (`CLIMB-BATCH-23.md:285`, `:390`), is not in phase 4; nor are `CHOOSE` with row 521's fix, `asFloat`'s header, row 336's rest with row 848, or the 31 errors of the model's imports with their homes (`:286-291`). Home: the routing (Part 4).
7. **Row 848's reproducer is `none` where the text settles it.** `opr-overview.tex:164-165` settles row 848, as it does row 336; the skill's home 2 asks a gated `XXX` test (`.claude/skills/fortress-repo/references/tests-writing.md:84`). Skeptic W took home 3's case "as when walk crashes on the program", following row 336 (`rung-natives-walk/SKEPTIC.md:102`), as rung A's brief allowed for row 841 at climb batch 22c (its finding 10). The rule puts that case under home 3 only. Home: the skill writer (Part 3); then rows 336 and 848.
8. **The manual's rule 4 does not cover row 849's case.** It asks the departing path "a gated XXX test asserting the text's rule" (`climb-batch-workflow.md`, "Rules weighed by what they cost against what they protect", item 4). The gather's test pins today's message, since on the compiled path's repository both the text's rule and the code end in a static error, and the departure shows only in the one library's world (`RECORD.md:52`). Its reason holds. Proposed (mine): the rule names that case, a test pinning today's behaviour with the row saying why. Home: the manual.
9. **Two record slips.** Row 845's "found by" names rung C, where its skeptic found it (`RECORD.md:60`; `rung-natives-compiled/SKEPTIC.md:31-33`). The batch's citations of row 560 (the global questions, above). Home: `ledger.py rewrite 845`; the record writer, as the boot note's step 2 plans for row 560.

## Part 2. Did the practice hold

### The skeptics' fixes

From the journal's results and each `SKEPTIC.md`: 4 fix commits, all corrections, none contested; no defect of the change fixed. Neither skeptic needed a journal commit: both branches carried the workers' `REPORT.md` and `record.md`, which the workers wrote themselves (`RECORD.md:80`, `:94`).

| Rung | Fix commits | Defects of the change | Test first |
|---|---|---|---|
| C | `6243147f4` (`NamingCzarJUTest.testForeignOneLibrary`, fork 5's reading), `6def10f87` (the record: walk's own `import java` stops at gap 3, row 845) | 0 | the test red on the base's classes ('ComparisonFailure: expected:<...Library...> but was:<...Builtin...>', 'Tests run: 3, Failures: 1'), green on the head ('Tests run: 3, Failures: 0') |
| W | `af7880964` (one comment line in a test), `a285a6ae5` (rows 847 and 848, an `XXX` test, F-24, finding 2's sentence narrowed, two sentences of the Effect) | 0 fixed; row 847 deferred with its `XXX` test | the `XXX` test red on the old code ('Refused at load, but did not satisfy load_exception_contains', 'Tests run: 1, Failures: 1'), green on the head (' Saw expected failure: loaded and ran, not refused at load', 'OK (1 test)'), and red for one run with its string misspelt |

- Every fix stays inside its rung's work, and the review checked each as applied (`fixesChecked`).
- Against the batches before: 22c made 14 with 1 defect, 22 made 8 with 0, 21b 7 with 1, 21 13 with 1, batch 20 11 with 0.
- Row 847 contradicts the rung's own revised comment and fork 10, so it is a gap in the change. Skeptic W left it unfixed, since the fix needs the declaring type passed through `FunctionClosure` and `MethodClosure`, files the section did not give it (`SKEPTIC.md:98`), and gated it. That follows the brief.

### Workers, test first

From the skeptics' reading of both launches' transcripts (each `SKEPTIC.md`, section 1 or 2):
- **C:** red on the base's code at 04:06:54, in the first launch ('Tests run: 4, Failures: 4'), the tests applied alone at 04:06:38, the code at 04:09:21 and first built by the second launch at 04:20:21; the guard red on the planner's text at 04:35:28 and green on the old code; the last change of code at 04:35:54, its build from 04:36:03; green at 04:38:30 ('OK (5 tests)'); both `XXX` tests red on a deliberate change ('Saw wrong failure', 'Tests run: 2, Failures: 2'). In the letter.
- **W:** red on the base's code at 04:03:47 ('Tests run: 5, Failures: 4') and 04:07:36 ('Tests run: 2, Failures: 2'), in the first launch, before the patch's code was applied at 04:07:50 and built at 04:08:08; red again on the base build at 04:19:08 in the second ('Tests run: 7, Failures: 6'); the last change of code at 04:22:37, rebuilt; the comment at 04:34:13; green at 04:34:39 ('OK (8 tests)'). The guard green on both codes. In the letter.

No miss of order. The restart cut neither rung between its red run and its edit.

### The merged-diff review

- Approved: nothing blocking. Six corrections in `d836122e2`, one finding routed (review-routed.1), every fix checked as applied.
- It did not name the questions, forks and points missing from PLAN, the rows without a PLAN line, or rung C's other limits read from the code (findings 1, 5 and 6).
- Cost: 322K beside the gate, 17.7 minutes.

### Builds and runs, repeated or not

- **Builds:** rung W's first launch once, its second build cut; rung W's second launch four times, three of them one code state (finding 4); rung C's second launch twice, on two code states, each with the library order; skeptic C once, for its unit test; the gather once on the merged tree; the gate once on `main`, the gather's code (finding 4).
- **Suites:** rung C ran `ant testQuick` and `ant testSystem` twice, the first pair on the code before its package key (`rung-natives-compiled/REPORT.md:108`), about 11 minutes on a code state its later change replaced, and `NamingCzarJUTest`, `ParserJUTest` and `ASTJUTest` on the final code; rung W ran `ant testSystem` and `ant testSpecData` once on its final code (P-124); skeptic C ran `NamingCzarJUTest` on its fix; no other skeptic and not the gather. The gate ran `testFast`, `testSystem` and `testSpecData`.
- **The stages:** each rung once on its final tree, the gather once on the merged tree, the gate once on the gather's code (finding 4); no skeptic, since no rung changed the checker's code.
- **The demos:** the gather's first launch, cut by the restart; its second, 52 of 52 from the first demo.
- **The specification:** rung W three times on changing text, skeptic W once after its Effect sentences, the gather once on its final text, the commit stage once on that same text (finding 4).
- **The ladder subset:** each rung ran the five ladder files whose first error names `builtinPrimitive` on its own tree; no move.
- **Walk old against new:** skeptic C's seven programs (`SKEPTIC.md:25-31`), skeptic W's family at its edge values at one and four threads, its parallel and raise programs, and eight sibling divisions (`SKEPTIC.md:57-80`), each against the old code through `old-fortress.sh`.
- **Taken from the record, not run again:** climb batch 22c's tables as every rung's before; the planner's runs on both bases; the base build `/home/user/fortress-base23` at `a1f8c4b8b` as the old code, its code the base's; rung C's first launch's failing run, cited by its second.

### Refusals by the harness and the tools

- **No worker's write of `REPORT.md` was refused,** where at 22c all four were; both workers wrote their files on the branch.
- **Two calls refused for a file not read first:** rung C's first launch's `Write` (04:09:59) and skeptic C's `Edit` (05:20:59); skeptic C's next `Edit` changed nothing (05:22:50).
- **One removal refused** by the built-in check (skeptic W, 05:05:22).
- **Skeptic W's check of the journal's texts exited 1** (05:02:58): `journal-text.py` wrote both files, and `cmp` stopped at a final newline that the branch's copies lack; the texts are the same (`SKEPTIC.md:7`).
- **No length refusal:** row 521's note, which `ledger.py note` would refuse, went in by a rewrite (`RECORD.md:116`).
- No refusal cost a cache refill.

### The commit stage's fold of FACTS

Its brief asks for the landed figures, numbers only. It kept F-53's totals at 0, changed F-53's title from "climb batch 22c's" to "climb batch 23's", left F-66, which holds no total, and named F-240's title and source as false (the commit stage's result). The manual and the script still name the entries by titles that do not exist, and still leave F-240's figures to the coordinator (climb batch 22's finding 4).

### The practice's measures, batches 20 to 23

| Measure | B20 | B21 | B21b | B22 | B22c | B23 |
|---|---|---|---|---|---|---|
| Written | 2.64M | 4.75M | 3.50M | 2.82M | 4.61M | 3.20M (2.44M finished) |
| Rungs, agents | 2, 8 | 4, 14 | 3, 10 | 3, 10 | 4, 15 | 2, 11 (8 finished) |
| Launches killed by restarts | 0 | 0 | 0 | 0 | 0 | 3, 0.76M, 23.9 % |
| Per rung, all roles | 1.32M | 1.19M | 1.17M | 0.94M | 1.15M | 1.60M (1.22M finished) |
| First calls | 0.47M, 7 cold | 0.68M, 8 cold | 0.51M, 7 cold | 0.47M, 6 cold | 0.76M, 9 cold | 0.58M, 8 cold (0.43M, 6) |
| Refusal cycles | 0 | 0 | 0 | 0 | 1 rung, 3.2 % | 0 |
| Rulings and repairs on the merged tree | 0 | 8.3 % | 0 | 0 | 9.7 % | 0 |
| Skeptic fix commits (defects) | 11 (0) | 13 (1) | 7 (1) | 8 (0) | 14 (1) | 4 (0) |
| Distance | 26 sites gone | 0 gone (full check 186) | 0 | 5 gone, to 0 | 0, over 14 under `compile` | 0, the 21 moved bindings checked |
| Count stage at the gate | 63 s | about 78 s | about 90 s | about 150 s | about 170 s | about 155 s |
| Distance stage at the gate | 161 s | 206 s | 235 s | 227 s | 238 s | 240 s |
| Skill's load | 9.8 % | 10.4 % | 11.3 % | 12.5 % | 13.6 % | 13.3 % (11.6 % finished) |
| Briefing, estimated | 3.4 % | 4.1 % | 3.2 % | 4.2 % | 4.0 % | 5.4 % (4.3 % finished) |
| microGPT quick pair, verdicts | 7 of 7 both | 7 of 7 both | 7 of 7 both | 7 of 7 both | 7 of 7 both | 7 of 7 both |

The rows of B20 to B22c are `reviews/batch-22c-review.md`'s; `batch-measures.py` counts each role once in those runs, so none had a killed launch.

### Climb batch 22c's findings, a batch later

1. Phase 3's zero on fork 8's reading of `var`: review-queue item 295, before the switch-over; his word is still owed (the boot note's morning list).
2. The gather's check that an Effect names every row opened against its passage: not added to the manual; met in practice, since the gather named rows 846 to 849 in the Effect (`RECORD.md:52`, `:103`) and the review found none missing.
3. Climb batch 22c's forks and points: routed as review-queue items 291 to 305 (`9e8159379`); this batch's are missing again (finding 1).
4. FACTS false at 22c's landing: F-294, F-282 and F-296 rewritten (`6985743ce`); F-240 rewritten and false again (finding 3).
5. Code states measured again: the gather's stages met a third time, the specification built twice again (finding 4); no checker rung, so no base timing.
6. The skill sentences beyond the record's list: the writer's second task, its cold read and its fixes are done (`d8026c1d8`, `03e3ac399`, `1fcd754af`).
7. The record left stale: routed (`9e8159379`, `702b62240`); stale again at this landing (Part 4).
8. Writes outside the worktrees: the briefing files are now in each agent's own tree; the resumed launches' extracts and the gathers' copies are not (finding 2).
9. Rung O's second copy of a rule: one line in phase 4 (`PLAN.md:84`).
10. Row 841's reproducer `none`: met again in row 848 (finding 7).
11. A skeptic's force push: no line in the skeptic's brief; no force push in this run.

### Misses, by kind

Numbered on from `batch-22c-review.md`'s 809.

Found inside the batch:
- **The planner's text wrong, caught before landing:**
  - 810, `rung-C.patch` crashed on a string outside the helpers' package in a file that names no helper, 'IllegalArgumentException: Undefined API: java.lang' (worker C; the guard `XXXNativeHelperOutsidePackageCompiled`);
  - 811, `rung-W.patch` took a declared type that no Java type carries as a wildcard, 'loose(4000000000, 5) = true' (worker W; `NativeHelperUncarriedWalk`);
  - 812, `rung-C.patch` registered an import alias for a varargs declaration it then left alone (worker C, its decision 1b).
- **A test that reached too little:**
  - 813, fork 5's reading had no test on rung C's tree (skeptic C, `6243147f4`).
- **A defect without its home:**
  - 814, walk's written `import java` moved from gap 1 to gap 3, row 845 (skeptic C, `6def10f87`);
  - 815, rows 847 and 848 (skeptic W, `a285a6ae5`);
  - 816, row 849, the text and the code apart (the gather).
- **Text claiming more than the code or the evidence:**
  - 817, rung C's record, "walk is unchanged" (skeptic C);
  - 818, rung W's record, "a helper never sees a value that its Java type cannot carry" (skeptic W);
  - 819, row 847's 'Holder', row 846's two citations, F-298's varargs clause without its source, and rung C's revival change false of `main` on two clauses (the review, `d836122e2`);
  - 820, a second comment line in a test (skeptic W, `af7880964`).
- **Sentences made false and not listed:**
  - 821, F-24 (skeptic W) and F-180's "five gaps stop it" (skeptic C).
- **The record's premises:**
  - 822, "A user program cannot reach them" and "code that walk does not run" (`CLIMB-BATCH-23.md:89`, `:267`; skeptics W and C, the gather's corrections);
  - 823, fork 3's description of the text (worker C);
  - 824, "no other value moves" (`:125`; worker W, skeptic W);
  - 825, the gate's forecasts and the expected minutes (the gate; this review);
  - 826, the citation of row 560 for how the checker reads a glue string (the boot note; the record writer, `b5103253a`, for F-298).
- **Process:**
  - 827, two VM restarts, three launches killed, 0.76M and about 30 minutes;
  - 828, the resumed launches' extracts of their predecessors' transcripts and the gathers' copies outside their trees;
  - 829, rung W's base tests run again on the code its first launch had run them on;
  - 830, rung W's build of an unchanged implementation at 04:34:32;
  - 831, the demos run again from the first after the restart;
  - 832, the gather's two stages and its build repeated by the gate;
  - 833, the specification built twice on one text;
  - 834, two calls refused for a file not read, one removal refused;
  - 835, F-240 left false at a fifth landing (named by the commit stage).

Found by this review: 836 to 844, findings 1 to 9 above.

**Against the earlier notes.**
- 26 found inside the batch (810 to 835), against 22c's 35.
- None was a fault of the change that landed. The two faults of the planner's text were caught by the workers before their tests went green; the skeptics' fixes were corrections. The batch landed with no known wrong value in the library's family.
- The known costs: a program's own helper binding can give a quiet wrong value where it was refused at load (rows 846 and 847); walk's other divisions by zero still end the run (rows 336 and 848); a varargs binding is checked against no helper (row 849); walk's written `import java` stops at gap 3 (row 845); and two limits read from the code, the DSL grammar parse and the static flag.

## Part 3. Skill sentences the batch made false

For the skill writer. The record lists three (`RECORD.md:169`): `interpreter.md:86` and `:93`, and `library.md:56`. The writer changed all three in `c97a7143f` (07:02:43 UTC on 2026-10-30), after the landing and before this review, with `compiler.md:19` and a new paragraph, `compiler.md:65-69`. The orientation update (`79f5c4ce1`) checked those and left notes 2 to 5 for the writer (`compile-ladder/climb-batch-23/orientation/admission.md`); items 5, 6 and 8 below are three of them. Lines below are of `.claude/skills/` at `c97a7143f`, which `main` at `f2714393a` holds.

**False:**
1. **`coordinator/references/batch.md:56`:** "The gate reports the checker count in every batch, and the distance in phase 3." Question 1, answered at its default with his go of 22:36:37 UTC on 2026-10-29, keeps the distance stage in every gate, report-only, until the switch-over lands (`CLIMB-BATCH-23.md:32-34`); this gate, phase 4's first, ran it. Proposed: "The gate reports the checker count in every batch, and the distance in every batch until the switch-over lands." The coordinator skill is edited only with his yes on its wording (the boot note).
2. **`fortress-repo/references/interpreter.md:89`** (the writer's new sentence): "If the method does not exist or fits no declared type, walk refuses the binding at load." Not for a method's `self` (row 847): walk reads `self` only by the helper's Java type (`interpreter/glue/StaticNativeApp.java:119-121`), so a helper string in a method of a type that no Java type carries loads where no overload fits, and its call passes the object as that Java type reads it, the type's name to a helper over `String` ('Ob.len() = 2', `tests/XXXNativeHelperUncarriedSelfWalk.fss`). Proposed, after it: "In a method of a type that no Java type carries, such as a program's own object, walk reads `self` only by the helper's Java type: the binding loads, and its call passes the object's type name or fails (ledger row 847)."

**Incomplete, made so by the batch:**
3. **`fortress-repo/references/interpreter.md:69-74`,** "So a library edit can stop every program at load, if it does one of these": since rung W, walk's loader refuses at load a helper string that names no method, fits no overload, or has a declared type that no Java type carries, as walk's `bug` at the declaration (`NativeApp.java:194-201`; `StaticNativeApp.java:87-128`; fork 10). By reading, not run here: walk makes a library binding's native when it loads the library, as it does for a glue class it cannot find ('Native class … not found.'), so such a binding in the library stops every program. The list already lacked a glue class that walk cannot find; N1's rungs, which move bindings by library text only, now meet the helpers' refusals. And `library.md:55` sends a worker there for "what walk refuses". Proposed, a fifth bullet: "names, in a `builtinPrimitive` string, a helper that walk's loader refuses (\"Natives\")".
4. **`fortress-repo/references/compiler.md:65-69`** (the writer's new paragraph): its three stops hold for a compile against the compiler's prelude. The gate's two stages run the rewrite in walk's world, where the paragraph is silent:
   - there a glue string and a varargs declaration are no stop: each stays a call of `builtinPrimitive`, typed at the declared return type and checked against no Java signature (F-298; row 849);
   - there the checker reads a helper's Java types as the one library's, `int` as `FortressLibrary.ZZ32`, `long` as `ZZ64`, `double` as `RR64`, `String` as `String`, `BigInteger` as `ZZ`, and `NN32`, `NN64` and `Char` only through the helpers with the special names (`compiler/NamingCzar.java:369-372`, `:464-505`). So a binding over `NN32`, `NN64` or `Char` whose helper takes a plain `int` or `long` is an error there: 82 of the 109 bindings that cannot move as bare strings (`CLIMB-BATCH-23.md:21`, `:247`);
   - the count stage reads only the `FortressLibrary` component's bindings; a moved binding of `FortressBuiltin` or another of the fourteen is checked only by the distance stage (the `asFloat` variant: the count 0, the distance 1; `CLIMB-BATCH-23.md:73`, `:235`);
   - by reading, a component that imports a DSL grammar is not rewritten (review-routed.1).

   Proposed: one paragraph after the stops, with these four facts, for the worker who moves a binding.
5. **`fortress-repo/SKILL.md:62`,** "If you edit a phase that both paths run, run your test on both paths", and **`references/tests-running.md:58`** and **`:68-71`**, which ask the demos and both suites for an edit of walk, the parser or a shared phase: since rung W, walk's `ZZ32` arithmetic runs `nativeHelpers/simpleIntArith.java` (`Library/FortressLibrary.fss:741-810`), so an edit of a helper that a library string names changes walk too. `compiler.md:19` now says that both paths run `nativeHelpers/`. The fixes of rows 521 and 523 to 525 are such edits. Proposed: add "or a helper of `nativeHelpers/` that a library string names" in each, with "run both" in `tests-running.md:71`'s list. The orientation's note 3.
6. **`fortress-repo/references/interpreter.md:86-91`,** "Natives": nothing on row 846. A native declared over `String`, helper or glue class alike, receives a non-flat string's type name in place of its characters (`StaticNativeApp.java:199`; `interpreter/glue/prim/Util.java:254`, `:286`). Its fix waits on his answer (PLAN item 62); the fact is a trap now for a worker who binds a native over `String`. Proposed: that sentence, citing row 846, and no fix. The orientation's note 4.
7. **`fortress-repo/references/interpreter.md:98`:** "If a helper throws a compiled exception class, ..., walk raises the library's exception of the same name in its place." True of a helper that a `builtinPrimitive` string names (`StaticNativeApp.java:182-191`); through a written `import java`, the line above it, walk ends the run with a `FortressImplementationError` (F-180). Proposed: "If a helper that a `builtinPrimitive` string names throws ...".

**Against a decision, not false:**
8. **`fortress-repo/references/library.md:56`** (the writer's new sentence): "A new native is an edit of Java too: a static helper under `nativeHelpers/`, which both paths run, or a glue class under `interpreter/glue/prim/`, which only walk runs". P-58: "Its string is to name a static Java method in `nativeHelpers/`"; a new glue class is one more binding the switch-over must move. Proposed: "A new native is a static helper under `nativeHelpers/`, which both paths run (P-58); write a glue class only where no Java type carries the declared types". The orientation's note 2.

**A rule the batch met that does not settle its case:**
9. **`fortress-repo/references/tests-writing.md:84-85`:** home 2, a defect the specification settles, asks a gated `XXX` test; the case "as when walk crashes on the program, write the ledger row only" stands under home 3, the silent specification. Row 848, which `opr-overview.tex:164-165` settles, took that case, as row 336 did and row 841 at climb batch 22c (finding 7). The writer settles which home a crashing, text-settled defect takes.

**Sentences that hold, met by the batch:**
- `fortress-repo/references/interpreter.md:91`, "A written `import java` is wired under walk but unfinished, and no test uses it": true; it now stops at F-180's gap 3 (row 845).
- `fortress-repo/references/compiler.md:68`, 'Variable builtinPrimitive is not defined.' for a glue string: true for a compile, as the orientation checked against row 849's measurement.
- `fortress-repo/references/compiler.md:148`, the count stage "about 150 seconds, more under load": about 155 s at this gate.
- `fortress-repo/SKILL.md:79`: true; 21 bindings now have one that the compiled checker reads, and no compiled program runs them yet.
- `fortress-repo/references/session.md:10`, a `nohup` command "survives a stop, but not a restart of the machine": the first gather's detached demo run did not survive.
- `cloud-container/SKILL.md:32`, "Running agents survive none of these": three launches.
- `coordinator/references/delegating.md:57` and `:61`, the resume and the stash: held (finding 2 for what they leave out).
- `coordinator/references/batch.md:43`, no stage measures again a code state another stage ran: true as a rule, broken in practice (finding 4).
- `coordinator/references/batch.md:49`: no rung changed the checker's code, and no skeptic ran a stage.

## Part 4. Routing

Checked against `main` at `f2714393a`: the gather's PLAN entries (`98b04d371`, `640acb4a1`), the review's (`d836122e2`), the boot note (`960142697`), the record writer's (`b5103253a`, `f2714393a`) and the review queue. The manual's routing (`coordinator/climb-batch-workflow.md`, "After the landing: the coordinator's routing") runs after this review, by the boot note ("Next", item 3).

**Step by step:**
1. The landing report: for the morning, with climb batch 22c's (the boot note).
2. The routing: not run yet. What it owes is below.
3. FACTS: F-32 and F-298 rewritten after the landing (`b5103253a`); F-240 still false (finding 3).
4. The skills: the writer's task on the record's list is done (`c97a7143f`); Part 3 is the second task; then a cold read, the fixes and the push.
5. The next batch, N1's, after step 4.
6. This review.

### What the record listed for him, and PLAN lacks

- **Questions 1 and 2:** answered at their defaults with his go; the record calls them "on your review list" (`CLIMB-BATCH-23.md:32`, `:37`), the review queue's head names them answered (`review-queue.md:15`), and no item or PLAN entry holds them. One entry each, consequential, default as landed (finding 1).
- **The forks 1 to 20 and the points for his sight:** no entry (finding 1). Climb batch 22c's routing wrote such entries (`PLAN.md:623-626`; review-queue items 291 to 305).
- **The skeptic's method in the team's `NamingCzarJUTest`,** a file outside rung C's list (`CLIMB-BATCH-23.md:157-158`): one line, routine, default as landed.

### The items of the rungs, the gather and the review

- Item 62, W.worker.1 with W.skeptic.1 (row 846), `PLAN.md:147`: default neither. Sound; the library's practice for its other string natives is evidence for the second way (split 3).
- C.skeptic.1 (row 845), `:632`: default as landed. Sound. It covers the reading's effect on walk's own `import java`, not the reading the zero rests on (section 6), which finding 1 adds.
- W.worker.2 with W.skeptic.2, `:633`: wording, routine. Sound.
- gather.1 (row 849), `:634`: default as landed. Sound; the manual's rule 4 lacks its case (finding 8).
- gather.2, `:635`: no default; his text. Sound. P-58's sentences on rows 796 and 309 belong to it too, as the entry says.
- review-routed.1, `:636`: a step for the next batch. Sound; rung C's other limits read from the code want a line beside it (finding 5).

### New rows

- 845: C.skeptic.1 only. Walk's written `import java` has no rung on the path; P-58 does not take that form.
- 846: item 62.
- 847: no line. Its fix, the declaring type told to walk's loader, is a walk rung's: one line in phase 4's natives line.
- 848: no line. With row 336's rest, in the integer families' rungs of N1 to N3.
- 849: gather.1.
- Rewritten 336 and 521: the natives line's `CHOOSE` and families want them by number.

### Answered, stale or overlong in the record

- **PLAN's "Where we stand"** (`:9-13`): "Runs" ends at climb batch 22c; the live thread gives 22c's gate and F-240's old figures; "Landed" ends at phase 3; "Next" launches climb batch 23 after 22c's skill steps. All want this landing: phase 4 opened, the 21 bindings checked, the count's new row, and N1's batch next.
- **Phase 4's first bullet** (`:67`): "It launches after climb batch 22c's skill steps". One line, with `df71bc585` and this review.
- **Phase 4's natives line** (`:68`): its count, 424 live bindings, is now 449 with 21 moved (F-32); "the compiled rewrite switched on by the compile command from N1" is now a switch per repository, the gate's stages included, from N0 (fork 2); N0 is built. It lacks N1's sub-item for the 109 bindings (`CLIMB-BATCH-23.md:285`, `:390`), `CHOOSE` with row 521's fix, `Int`'s `asFloat` with its header, row 336's rest with row 848, and the 31 errors of the model's imports with their homes (`:286-291`).
- **The review queue:** its head, "The next batch, climb batch 23, ... 0" and "Needed by the next batch, climb batch 23" (`review-queue.md:8`, `:15`), want the next batch, N1's; this batch's items are not in it yet.
- **FACTS:** F-240 (finding 3). F-53, F-111, F-180, F-24 and F-299 hold. F-298, F-299, F-180 and F-32 are past the record's 600 characters, as `record.py check` reports.
- **POSITIONS:** P-58's sentences (gather.2) and P-39's last sentences (finding 3), all his text. P-33, P-37 and P-12 hold; P-12's step is untouched.
- **The manual:** rule 4 (finding 8); the resume of an unfinished agent (finding 2).
- **The map's B.12:** rewritten (`f2714393a`).

### The steps due before the next batch

1. **This review committed;** then the routing above: PLAN's "Where we stand", phase 4's first bullet and its natives line, the lines for rows 845, 847 and 848 and for rung C's limits, the entries for questions 1 and 2, the forks and the points, and the review queue's head and items.
2. **FACTS:** F-240 at this gate (the count stage about 155 s by the gate's call times; the distance stage 240 s, `FortressLibrary` 174 s, at load 1.54), by `record.py`.
3. **The skills:** a task for the writer with Part 3, a cold read of its changes, the writer's fixes, and the push, before the next batch's planner is briefed (the manual's routing, steps 4 and 5); `batch.md:56` with his yes on its wording.
4. **The tools, between batches:** finding 2's head for a resumed agent; finding 4's gather stages and the commit stage's specification build; finding 8's rule; climb batch 22's finding 4 (the commit stage's fold of F-240), met again.
5. **For him, with defaults:** questions 1 and 2 (as landed); item 62 (neither, until the family that moves a binding over `String`); gather.1, C.skeptic.1 and W.worker.2 (as landed); gather.2 and P-39's last sentences (no default, his wording); and climb batch 22c's item 295 (as landed).
6. **The next batch,** N1's next families (`CLIMB-BATCH-23.md:390`): its planner sorts the 83 bare-string bindings left into families and the 109 into their ways, and meets row 846 for bindings over `String`, row 521 for `CHOOSE`, the stand-in table for `NN32`, `NN64` and `Char`, and the distance stage as the only stage that reads `FortressBuiltin`'s bindings (Part 3, item 4).

## What I did not do

- I built nothing and ran no Fortress program, suite, stage or JVM. I changed no file of the tree but this review, and committed it alone.
- I read the run's transcripts only through scripts: `batch-measures.py` on six runs and `transcript-study/skill-load.py` on this run, and scratch scripts of mine (`agents.py`, `brief.py`, `brief2.py`, `calls.py`, `errs.py`, `runs.py`, `nohup.py`, `upto.py`) in `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/rev23/`. `brief2.py` refines climb batch 22c's `brief.py`, which in this run counted a search that named a briefing file and the read of a patch as briefing calls and missed the files named `brief-p<n>.txt`; it gives 22c's figures exactly for that batch's workers, skeptics and judge.
- I ran `record.py check` and `ledger.py landing-check` ('0 failures'; 'no finding'), `facts-extract.sh`, `grep`, `diff` and `git`, which write nothing.
- The count stage's gate time comes from the gate's call times. I compared no walk timing.
- I did not read the coordinating session; what he was told comes from PLAN, the boot note and the record. The INDEX line for this review is the coordinator's.

## For the curator

Climb batch 23 landed on 30 October and is pushed. It is the first batch of phase 4, the switch-over, which moves the compiled path onto the interpreter's library. It builds your decision on native bindings, the library functions whose bodies are Java: such a body may now name a static Java method of the compiler's helper classes. The compiler reads that body as a call of the method and checks the function's declared types against the method's Java types. The interpreter loads the method beside its older Java classes, which only it can run. Twenty-one of the library's 449 native bindings now name such a method: nineteen operators of the 32-bit integer type and two conversions to a string. So under the interpreter, a 32-bit integer division by zero now raises the library's DivisionByZero exception, as the specification says, where it used to end the program.

The gate, the full check of the merged tree before it lands, was green. The compiled checker still finds no error in the fourteen core components of the interpreter's library, now with the 21 bindings checked against their Java methods. Both quick microGPT checks passed 7 of 7 under the interpreter.

Two restarts of the machine killed three agents mid-work, and the run resumed each time. The restarts cost about 0.76 million tokens and half an hour. The run wrote 3.2 million tokens in 2 hours 57 minutes; the agents that finished wrote 2.4 million, as the batch's plan estimated.

Please look first at two questions that the batch took at their defaults with your go of 22:36 UTC on 29 October. First, every gate keeps measuring all the checker's errors on the fourteen core components until the switch-over, though your decision on what the gate measures asks that only of batches that try to lower that number. Second, the interpreter's change also moved the first 21 bindings, where the plan had put them in a later batch. Both defaults are as landed. The checker's zero with the moved bindings also rests on a choice of the batch's planner that you have not confirmed: when the checker checks the interpreter's library, it reads a helper method's Java types as that library's own types, Java's int as the library's 32-bit integer. Its default is as landed.

One question must be answered before the bindings that take a string move. When a string was made by joining two long strings, the interpreter passes such a binding the name of the string's type instead of its characters. Should the interpreter flatten the string before the call, or should those bindings take the library's flat string type, as its other string bindings do? The default is neither, until that batch.

The other items wait on nothing, and each keeps what landed by default. The compiler does not check a binding whose function takes a variable number of arguments, though the revised library comment says that it checks every binding; the specification's appendix names this exception. The compiler's new reading of Java types also changes where the interpreter stops on a Java import that a program writes itself, which no library or test program does. A sentence of the library comment points to examples that are not there. The coordinator's filing after the landing still owes you entries for the twenty small choices that the batch's plan took at their defaults, and for the team's code lines that the batch changed; their default is as landed. Your decision on native bindings still says that every binding names one of the interpreter's older classes, which is now false; it stands until you reword it.
