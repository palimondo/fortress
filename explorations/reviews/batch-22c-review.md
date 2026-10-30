<!-- The combined post-batch review of climb batch 22c, the batch of coordinator/CLIMB-BATCH-22c.md that closes phase 3 (rungs O, L, B and A; run wf_1a894dd6-45c, base c3c22817c, 22:13 UTC on 2026-10-29 to 02:50 UTC on 2026-10-30, landed and pushed at b81d86b75: rung O bb3925156, rung L 96fcd051f, rung B 1bc0a9083, rung A cc47b637d, the closes 1fa64360e, the gather record a0c48211c, the merged-diff review's corrections f8bb64872, the judge's ruling 19f3bc397, the judge's repair 39f28f2f4, the gate's tables b81d86b75), owed at the landing, in the form of reviews/batch-22-review.md, by a review worker reading only, against main at ea220f03e (the orientation update bf63fcb31, the skill writer's 79e5202ad, the record writer's 5feeedd9f and effb41db6, and the quiz's ea220f03e came after the landing). The measures are batch-measures.py's on climb batches 20 (wf_4cf8e3cb-bf5), 21 (wf_225c8ddd-913), 21b (wf_db1dda0a-97d), 22 (wf_5e692c7a-778) and this run, transcript-study/skill-load.py's on this run, and scratch scripts of this review's for per-agent times, briefing calls, stage, suite and build runs, refusals and the objects' value parameters, in /tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/rev22c/. The briefing script reproduces batch 22's figures exactly (117K). Tokens are writes only (input plus cache creation, one count per message id). The microGPT walk check is reported by its verdict only, at the curator's ruling of 2026-10-23. Besides reading, this review ran only those scripts, record.py check, ledger.py landing-check, facts-extract.sh, grep and git, which write nothing in the tree. -->

# Climb batch 22c: conformance, the count and the distance over fourteen components, phase 3's end, the cost, the practice, the routing and the steps owed before climb batch 23

## What came up in this run

### 1. The count 0 and the distance 0, row by row against climb batch 22's tables

**What the record expected** (`coordinator/CLIMB-BATCH-22c.md:498-509`): the count 0, its table gaining `CovariantCollection 0`; the distance 0 over the fourteen under the setting `compile`, its first line reading `extendsObject=false`, `#crash none`; `testSystem` 683 plus L's walk guard; the compiler track 1,315 plus 8 cases (O 3, A 3, L 1, B 1), the library and other-compiler tracks 86 and 263; `testSpecData` 130; the 42 atomic runs; the ladder with no move, rung B's respelling of `tests/doubledOverloading.fss` included; the 52 demos at the gather; microGPT's quick pair at the commit stage. The gate ran on `a0c48211c` and was green (the gate's result). The review's `f8bb64872` came while it ran and touched only `explorations/`. The judge's repair `39f28f2f4` edited `Specification/appendices/changes.tex`, which no stage reads, and the summary records it in a `# repair-ungated` line (`climb-batch-22c/gate/summary.txt:127`).

**The count's table** (`climb-batch-22c/gate/checker-count.txt` against `climb-batch-22/gate/checker-count.txt`): `diff` prints only `2a3 > CovariantCollection 0`. Every row is 0, `#total 0`, `#locations 0`, `#crash none`, `#shadow matches the tracked StaticChecker`. The table has 13 api rows.
- **The new row is rung O's edit.** `Library/List.fsi:14`, `import CovariantCollection.{AnyCovColl}` (rung O's `hdrList`, `bb3925156`), brings `CovariantCollection`'s api into the apis that the `FortressLibrary` component imports, through its import of `List` (`Library/FortressLibrary.fss:13-22`). The count stage checks that component with every api it imports.
- Rung O's own run printed the same row ('2a3 > CovariantCollection 0', `rung-export-operators/REPORT.md` section 5.1). Its skeptic's sorted diff of base against head shows only `@@PROBE checkApi CovariantCollection -> errors=0` added (`rung-export-operators/SKEPTIC.md` section 1).
- Rung L, alone, made no such row: its count table equals the landed one, since only `List`'s component imports the two components (`rung-list-imports/REPORT.md` section 3). `OneShotFlag` has no row for the same reason: no api imports it.
- No row rose. Nothing is new besides that row.

**The distance's table** (`climb-batch-22c/gate/distance.txt` against 22's):
- The first line: `setting compile`, 14 components, where 22's read `setting any`, 12. The setting is rung B's (`explorations/coordinator/tools/distance/run.sh:84`, `SETTING=${3:-compile}`, and `DistanceMulti.java:79-92`, which reads `Shell.java:372` at each run). The two components are rung L's (`run.sh:87-90`). `compare.sh` printed 'SETTING CHANGED was setting any, now setting compile: the counts below are not like for like' and 'DISTANCE SAME 0' (`summary.txt:121-122`).
- `#total 0`, every `#kind` 0, `#bound-Object 0` among them, `#crash none`, `#shadow every shadow edit matched the tracked sources`. No class or unit row, as at zero.
- `#seconds 238 FortressLibrary 174`, against 227 and 168, at a load at start of 1.70 against 0.35 (`distance.txt:13-14`).
- So the zero now holds under the compile command's own setting and over `List`'s two imports. Before the batch, the setting `compile` gave 685 errors over the twelve (F-289), and the two imports gave 13 errors and 2 crashes (the planner's run b14, `CLIMB-BATCH-22c.md:310`). No landed table counted either.

**The per-site list** (`compile-ladder/gate/distance-sites.tsv`): its header alone, as before (the commit stage's result).

**The summary's other rows** (`climb-batch-22c/gate/summary.txt` against 22's):
- `CompilerJUTest` 1,315 to 1,332: 17 more, counting each step of a `.test` file as one test, which every figure on record matches. O 5 (`XXXExportOperatorHeader` 1, `ExportOperatorMatch` 2, the skeptic's `XXXExportOperatorFunctionalMethod` and `XXXExportOperatorStaticParamName` 1 each); L 2 (`ExportVarObjectParameter`, `XXXObjectFieldWithoutType`); B 4 (`ImplicitBoundAny` a link and a run where its `XXX` form was one compile, `TupleNamedComponentGenericParamLink` and `XXXTupleNamedComponentGenericParam` 1 each, the skeptic's `XXXNoDuplicatesRuleUnboundedBesideAny` 1); A 6 (`XXXExportAbstractMemberOtherHeader` 1, `ExportAbstractMemberBodyless` 2, the skeptic's `ExportAbstractGetterField` 2 and `XXXExportFieldByGetter` 1; `XXXExportAbstractMemberAbsent` replaces `ExportAbstractMemberAbsent`). The record's forecast of 8 counted only the workers' planned cases.
- `testSystem` 683 to 685, over shards of 178, 165, 169 and 173: `CovariantCollectionArmsWalk` (L) and `XXXListMapPairFunctionWalk` (A's skeptic). The record forecast 684, without the skeptic's test.
- The library track 86, the other-compiler track 263 and `testSpecData` 130, as before. The atomic runs: 42 of 42 `PASS`.
- `compileAll` 43 s, against 3 s: the batch changed the checker's Scala and `Shell.java`, the caches started again empty, and the library order rebuilt the five jars (the gate's result).

**The ladder** (`climb-batch-22c/gate/ladder/`): 85 of 85 at `pass`, no move; `comparison.txt` and `microgpt-comparison.txt` are empty. `tests/doubledOverloading.fss` stays at `pass` by rung B's respelling (`doubledOverloading.fss:36-41`); as the team wrote it, the bound `Any` refuses it ('For a, the return type of ()->() ... should be a subtype of ...', `rung-bound-any/REPORT.md` section 5). The eighteen microGPT components keep their phases, all `disambiguate`.
- **One change the comparison does not read.** In `microgpt-phase.md`, three rows of the APL program change their first error from 'DelegatedIndexed is undefined.' to 'ImmutableArray is undefined.': `AplMgSyntax.fsi`, `AplMgSyntax.fss` and `MicroGptApl.fss` (`diff` of the two gates' files). `mg_phases` compares phases only, so the gate printed nothing.
- By reading, not run here: `AplMgSyntax.fsi:40` imports `FortressAst`, whose api imports `List` (`Library/FortressAst.fsi:5`), whose api now imports `CovariantCollection` first (`Library/List.fsi:14`, rung O). That api names `ImmutableArray` (`Library/CovariantCollection.fsi:19`, rung L's line), which the compiler's prelude lacks. This is the move that rung O measured in 20 ladder programs that import `List` (`rung-export-operators/REPORT.md` section 6). The flat program's rows do not change: they import no `List`.
- The `coordinator` skill asks that every difference a comparison hides go on the review list (`.claude/skills/coordinator/references/batch.md:61`). It is not there (finding 3).

### 2. The stages' times against climb batch 22's gate

- **The count stage: about 170 s.** By the gate's call times it was launched at 02:13:23 UTC and its table read at 02:16:14, polled every 5 s. At 22's gate, about 150 s by the same method.
  - The batch did not move it beyond noise. On the base's code, the six runs took 163 to 179 s: rungs O 163.0, L 179 and A 172; skeptics O 163, L 168 and A 163, at loads of 0.15 to 1.37 (each rung's `REPORT.md` and `SKEPTIC.md`, section 1 or 5).
  - On the heads: O 170.1 s, its pass 168.7 s; L 221 s at load 2.92 and 162 s by its skeptic; A 170 s and 169 s by its skeptic; B about 175 s at load 4.91. With the operators read, the export check's loop took 7.6 s of the stage before rung O's pass and 3.8 s after (`rung-export-operators/REPORT.md` section 5.2).
- **The distance stage:** 238 s (`FortressLibrary` 174 s) at load 1.70, against 227 s (168 s) at 0.35, now over two more components. The gather's run on the same code took 215 s (156 s) at load 1.70 (`climb-batch-22c/RECORD.md:54`).
- **The suites:** `testFast` 6 min 48 s, against 6 min 5 s; `testSystem` 3 min 31 s, against 3 min 16 s; `testSpecData` 1 min 9 s, against 1 min 6 s (`summary.txt:61-68`).
- **The machine line:** load 2.98, 5.69, 4.29, against 3.10, 5.79, 4.08. It still reads `FORTRESS_THREADS=1` (batch 11's finding 8).
- **The gate:** 25.4 minutes (01:52:05 to 02:17:29), against 21.2. The build's 40 s more, the library order that its emptied caches asked for, and the suites' minute account for most of it.
- **F-240** now gives climb batch 22's gate as the last, and its figures: false since this landing (finding 4).

### 3. The cost, by role, against the record and the batches before

From `batch-measures.py` on the five runs, and this review's scripts on this run's folder. **The run wrote 4.61M over 15 agents, in 4 h 37 min** (22:13:21 to 02:50:16 UTC). The boot note gives the harness's count, about 4.86M.

| Role | B20 | B21 | B21b | B22 | B22c | B22c share |
|---|---|---|---|---|---|---|
| Rung workers | 848K (2) | 1.64M (4) | 1.34M (3) | 890K (3) | 1.51M (4) | 32.7 % |
| Skeptics | 757K (2) | 1.52M (4) | 1.07M (3) | 958K (3) | 1.37M (4) | 29.7 % |
| Judge on a rung | 0 | 0 | 0 | 0 | 146K | 3.2 % |
| Gather | 426K | 565K | 439K | 392K | 501K | 10.8 % |
| Merged-diff review | 362K | 381K | 412K | 335K | 376K | 8.2 % |
| Its judge and repair | 0 | 165K + 227K | 0 | 0 | 231K + 214K | 9.7 % |
| Gate | 117K | 127K | 122K | 127K | 132K | 2.9 % |
| Commit | 131K | 125K | 118K | 122K | 136K | 2.9 % |
| **Total** | **2.64M** | **4.75M** | **3.50M** | **2.82M** | **4.61M** | |
| Agents, rungs | 8, 2 | 14, 4 | 10, 3 | 10, 3 | 15, 4 | |
| Span | 2 h 10 | 4 h 26 | 3 h 40 | 2 h 35 | 4 h 37 | |
| Per rung, all roles | 1.32M | 1.19M | 1.17M | 0.94M | 1.15M | |

**Against the record:** about 4.2M, "from 3.5M if no fix is contested and the review blocks nothing, to 5.2M with a judge and a repair round on one rung and on the review", and about 4 hours (`CLIMB-BATCH-22c.md:58-59`). One fix was contested and upheld with no repair round, and the review blocked once: 4.61M, 0.41M over the middle figure, inside the range, and 37 minutes over the time.
- **Workers, 0.09M under** the 1.6M: A 373K against 0.5M, O 355K against 0.4M, L 401K against 0.45M, and B 378K against 0.25M, B the one over. They took 52, 61, 62 and 49 minutes, against the manifest's 130, 110, 120 and 80 (`CLIMB-BATCH-22c.md:393`, `:414`, `:434`, `:454`), which order the scatter only.
- **Skeptics, 0.07M over** the 1.3M: A 394K, with a fix built and `ant testQuick` run on it; L 355K; B 324K; O 299K. Three ran the count stage on the base and the head, as the record planned.
- **The fixed roles, 0.15M under** the 1.3M: 1.15M (gather, review, gate and commit). The rulings and the repair wrote 591K beside them (12.8 %): the rung judge 146K, and the review's judge and repair 445K (9.7 %), against batch 21's 392K (8.3 %).

**Against the batches before:**
- Per rung, all roles: 1.15M, against 0.94M at 22 and 1.17M to 1.32M before it. Without the rulings and the repair, 1.00M.
- Workers and skeptics together per rung: 0.72M, against 0.62M, 0.80M, 0.79M and 0.80M. Three of the four rungs changed the checker and timed it (P-148); at 22 none did.
- The fixed roles: 1.15M, against 0.98M, 1.09M, 1.20M and 1.04M. The gather built the merged tree and ran both stages, as at 21 (finding 5).

**The briefing's use and cost** (the `coordinator` skill's `references/batch.md:45` asks the share at a landing):
- **10 of 10 briefed agents read it, none in its first turn.** The briefed agents are the four workers, the four skeptics, rung A's judge and the review's repair. Their first briefing calls came at calls 12 to 17 for the workers, 12 to 14 for the skeptics, 2 for the judge and 10 for the repair, 11 to 98 s after each agent's start.
- Its results came to about 186K tokens, 4.0 % of writes, at 0.40 tokens a character plus 110 a call (36 calls, 456K characters). That counts each `--part` call and each briefing file read back:
  - workers 88K: A 25.0K, O 23.0K, B 20.9K, L 19.6K. The planner's estimates were 25.1K, 21.2K, 21.0K and 19.7K (`coordinator/climb-batch-22c-review.md`, section 1, notes): close;
  - skeptics 49K: A 13.6K, O 13.2K, L 12.5K, B 10.0K;
  - rung A's judge 12.9K;
  - the review's repair 35.7K. It read all four rungs' slices, since its instructions cite a path of each rung's commit (`changes.tex`, rung L's `SKEPTIC.md`, rung O's `XXXExportOperatorHeader`, rung A's decision record), and the script's rule takes any such path (`coordinator/climb-batch-workflow.js:1337`). Only rung A's was needed.
- Per briefed agent about 18.6K, against 19.5K at 22.

| Batch | Briefed agents | In the first turn | Run at all | At calls | Seconds after start | Its tokens (estimate) |
|---|---|---|---|---|---|---|
| 20 | 4 | 0 | 4 | 9 to 12 | 48 to 78 | 89K, 3.4 % |
| 21 | 9 | 0 | 9 | 8 to 15 | 24 to 97 | 193K, 4.1 % |
| 21b | 6 | 0 | 6 | 10 to 21 | 45 to 94 | about 111K, 3.2 % |
| 22 | 6 | 0 | 6 | 11 to 16 | 60 to 73 | about 117K, 4.2 % |
| 22c | 10 | 0 | 10 | 2 to 17 | 11 to 98 | about 186K, 4.0 % |

**Other measures.**
- **First calls:** 760K (16.5 %), 9 cold, against 468K (16.6 %), 6 cold. Rungs L, O and B and the skeptics of L, B and O started warm (cache reads of 41K).
- **Cache refills:** 0. **Refusal cycles:** 1 rung, A, its judge 146K (3.2 %).
- **The skill's load** (`skill-load.py`): 629K, 13.6 %: 126K of load text (2.7 %) and 503K over 190 part reads (10.9 %), against 12.5 % at 22. `revival-changes.md` was read 14 times (80K), `compiler.md` 12 times (47K). Five calls read `sources.md`, which the skill keeps for its own upkeep: rung B, skeptic B twice, the gather and the review, each to list or check a sentence the batch made false.
- **Builds:** each rung built its tree, O twice (the change and its pass); skeptic A built its fix; the gather built the merged tree; the gate built `main`. Every build but the gate's was of new code (finding 5).
- **Rows:** 11 opened (834 to 844); 7 closed (782, 827, 828, 829, 412, 759 and 816); 11 rewritten (71, 96, 339, 470, 592, 603, 653, 691, 719, 825 and 832), and rows 834 and 835 again by the review. Every note asked for is in (`RECORD.md:170-172`): row 592's, refused for length, went in by a rewrite.

Per agent, in order of start (UTC; ids are the transcripts' `agent-<id>.jsonl`; messages are distinct message ids):

| Agent | Id | Writes | First call | Messages | Minutes | UTC |
|---|---|---|---|---|---|---|
| Rung A | a699d5b6 | 373K | 64K, cold | 177 | 51.6 | 22:13-23:05 |
| Rung L | ad4206ab | 401K | 22K | 202 | 61.5 | 22:13-23:15 |
| Rung O | ae963f97 | 355K | 22K | 185 | 61.1 | 23:05-00:06 |
| Rung B | a7ef990a | 378K | 22K | 177 | 48.5 | 23:15-00:03 |
| Skeptic A | a40a39f6 | 394K | 70K, cold | 136 | 38.6 | 00:03-00:42 |
| Skeptic L | ad58ef3a | 355K | 29K | 130 | 27.5 | 00:06-00:34 |
| Skeptic B | abf00c9a | 324K | 29K | 117 | 25.3 | 00:34-00:59 |
| Skeptic O | ac72fbb0 | 299K | 28K | 122 | 25.7 | 00:42-01:08 |
| Judge A | a3213c29 | 146K | 61K, cold | 27 | 5.0 | 00:59-01:04 |
| Gather | ae0de585 | 501K | 82K, cold | 211 | 44.2 | 01:08-01:52 |
| Gate | abdc379f | 132K | 58K, cold | 47 | 25.4 | 01:52-02:17 |
| Review | ad2e2a05 | 376K | 74K, cold | 139 | 26.6 | 01:52-02:19 |
| Judge of the review | aac64ebc | 231K | 67K, cold | 66 | 16.0 | 02:19-02:35 |
| Repair of the review | afe09f72 | 214K | 65K, cold | 51 | 8.2 | 02:35-02:43 |
| Commit | a0ad77eb | 136K | 65K, cold | 46 | 7.2 | 02:43-02:50 |

Rung A's judge started 17 minutes after skeptic A's verdict (00:42:00), when skeptic B freed a slot; the gather waited for skeptic O in any case, so the wait cost no time. I did not measure the preparation beside the run: the planner, the Fable review and the curator's three answers.

### 4. The tail

- **The gather** (501K, 44.2 minutes):
  - It composed the four rung commits on `main` one patch at a time (`git apply --3way --index`), each folded and committed before the next, in the order O, L, B, A, as the record foresaw: L before B by `run.sh`'s header, O before A by the manifest where two files order them both ways (`RECORD.md:19-33`). No conflict.
  - It seeded `/home/user/fortress-gather22c` from the base build, applied the four patches, built it and ran the library order. Its index tree `811d7f717` equals `main`'s code after `cc47b637d` but for two comment lines and `changes.tex` (`RECORD.md:7`). Under `nice -n 19`, one at a time, by one detached script: the 25 compiled `.test` files the rungs add or change, 'OK (31 tests)'; four walk tests, 'OK (4 tests)'; the distance stage, '#total 0', 215 s; the count stage, 0, 161 s (01:17:36 to 01:20:17); the 52 demos, 'demos: 52 run, 52 reached their end', 01:20:17 to 01:49:06; and one compile of `ListTest.fss` for row 71.
  - It opened rows 834 to 844 and closed seven. It added F-295, F-296 and F-297 and rewrote F-282, F-286, F-287, F-288, F-289, F-292, F-294, F-53 and others. It re-anchored by symbol the lines that earlier hunks moved, in rung A's commit (`RECORD.md:32-39`).
  - It found the one interaction of text with code, rung L's check against rung A's "same header", and filed it as row 844 and gather.1, with two sentences in the Appendix I entry's Effect.
  - Misses: it stopped at row 844 where rows 839 and 842, opened in the same composition against the same sentence, were owed in the Effect too (the judge's ruling, section 3; finding 2). It ran both stages, which the gate ran again on the same code (finding 5).
- **The merged-diff review** (376K, 26.6 minutes, beside the gate): **not approved**, one blocking finding: the Effect of rung A's entry named rows 841 and 844 and not rows 839 and 842. Its corrections in `f8bb64872`: rows 834 and 835's `source-code.tex` lines, row 71's notes, F-295's and PLAN's `shadow-patch.py` lines, F-292's tree, `sources.md:869` for the skill writer, and review.1, review-routed.1 and review-routed.2 in PLAN. It checked every skeptic's fix as applied.
- **The review's judge** (231K, 16.0 minutes): repair. It upheld the finding for rows 839 and 842 and extended it to row 834's half for a method that is not abstract, the sentence to go in only if a probe showed the refusal. Rows 834's top-level half and 835 are not owed in this entry, since it revises one sentence of the subsection (judge-review.2). Three more departures found by reading went to PLAN as judge-review.1 (`climb-batch-22c/JUDGE-review.md`, sections 1 to 4).
- **The repair** (214K, 8.2 minutes): `39f28f2f4`. The probe showed the method half ('due to different method m', 'Saw expected failure', 'OK (2 tests)'), so the Effect gained all three sentences (`Specification/appendices/changes.tex:4390-4409`). It corrected rung A's decision record (`rung-abstract-declared/decision-record.md:68`), built the specification clean and removed the build, and ran the two checks. The gate did not run again: no path it reads changed (`repairRerun`).
- **The gate** (132K, 25.4 minutes): green on `a0c48211c`, as section 1 gives.
- **The commit** (136K, 7.2 minutes): it landed the tables, the per-site list and the `# repair-ungated` line, ran the quick microGPT walk check, rebuilt `Specification/fortress.pdf` (689 pages), and pushed `main` to the three refs on the first try. It changed F-53's title to name climb batch 22c and named F-240's title as false, leaving it. It removed the four rung worktrees and kept the gather's.
- **The block's cost:** the judge and the repair, 445K, and 24 minutes on the critical path (02:18:44 to 02:43:02), after a green gate.

### 5. The microGPT walk check

Its verdict lines (`summary.txt:123`, `:125`): "VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS" for `MicroGptAplQuick` and for `MicroGptFlatQuick` (the commit stage's result, `microgptWalk`). So 7 of 7 on both programs.

### 6. Phase 3's end

**The exit as stated.** P-33: "Phase 3 ends when the compiled checker reports no error on the apis and components of the interpreter's library that the distance to the switch-over counts (F-53 defines the distance, says what it counts and holds its value)" (`POSITIONS.md:30`). F-53 now names the fourteen components (`FACTS.md:48`), and F-289 the setting `compile` (`FACTS.md:124`).

The gate's distance stage reads `#total 0`, every kind 0 and `#crash none`, over the fourteen, under the compile command's own setting, with every top-level operator read by the export check (P-155) and every api member counted (P-158). The count stage reads 0. **So the zero meets phase 3's exit as P-33 states it.** His framing of 26 October, 07:30 UTC, named this batch as phase 3's close (`conversations/02-phase3-exit-foundations.md`, sections 6 and 9), which the record's question 1 put with the default yes (`CLIMB-BATCH-22c.md:65-71`). Of the three readings that climb batch 22's zero rested on (`reviews/batch-22-review.md`, section 6), rung A removed the first (row 816) and rung O the third (row 782). Row 731's checker gap stays, for user programs and the demos, not the library (F-285).

**What the zero rests on now**, named so that the landing report states it beside phase 3's end:
- **Fork 8's reading of `var` (row 844; gather.1).** The export check compares an object's value parameter less `var` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:694`). The text asks a satisfying object declaration for "the same header" (`Specification/basic/components/source-code.tex:373-375`; `apis.tex:256`), and an object's header holds its parameters' modifiers (`objects.tex:104-109`). Under the text's reading, `OneShotFlag` has one export error, 'different parameters for object constructors' (the planner's run b14, `CLIMB-BATCH-22c.md:310`), and the api cannot write `var`, since the parser refuses it (row 838). **So the zero over the fourteen holds only under this reading.** Its default: as landed. Home: gather.1 (`PLAN.md:612`) and L.worker.1 (`:607`).
- **The check's stricter readings hide nothing.** Rows 834 (a narrower return refused), 835 (a functional method never satisfies), 836 (static parameters compared by name) and 842 (a getter does not satisfy a field), and judge-review.1's three by reading, each refuse more than the text. A zero under them is a zero under the text.
- **Row 839, the one other laxer reading,** compares no name of an object's value parameter. By this review's read of the 14 components' files (`objparams.py`), the 42 objects declared in both an api and its component have equal parameter names, so it hides nothing today. That is a read of the text, not a run.
- **The scope:** the fourteen. The library's other components are cleared as the need arises, `System` by the switch-over (P-33, his answer of 22:29 UTC on 2026-10-29, review-queue item 283).

**What stands between the library and the switch-over** is as climb batch 22's review gave it (section 6 there), with two changes: rows 816 and 782 are gone, and the compile command's bound is `Any`. The natives come first (P-33; climb batch 23, `coordinator/CLIMB-BATCH-23.md`), then the code generator's 52 refusals (F-34), row 701, and the names batch.

## Part 1. Conformance

### Method

As in `reviews/batch-22-review.md`. For each rung I read its commit, its `REPORT.md` and `SKEPTIC.md` (and A's `JUDGE.md` and decision record), its section of the record (`CLIMB-BATCH-22c.md:139-299`) with questions 1 to 4 and forks 1 to 18 (`:61-127`), the gather's `RECORD.md`, the run's journal results, the judge's ruling, and the code and the specification on `main`. Three standards, kept apart: the specification; the library's own way (P-27), and for checker code the team's code beside it; and the decisions on record (P-12, P-26, P-27, P-33, P-42, P-45, P-79, P-95, P-96, P-148, P-155, P-158), with the facts the batch built (F-53, F-282, F-287, F-288, F-289, F-294, F-296, F-297) and the record's forks.

### The verdicts

- **Rung O, the export check reads top-level operators: in the spirit of P-155 and the library's rule for headers.** The check admits every operator by the overloading check's `isCheckedName`, under its declared name only (`ExportChecker.scala:275`, `:597-606`). The 9 headers follow `library.md`'s rule. One split: the check asks the api's own header where the text accepts a narrower return (question 4, row 834).
- **Rung L, `List`'s two imports: in the spirit of P-27, F-264 and F-75.** `CovariantCollection` is cleared by its own devices; `OneShotFlag` by the check reading a parameter less `var`, as it reads a field. One split: the text's "same header" (gather.1, row 844).
- **Rung B, the bound `Any` for `fortress compile`: in the spirit of P-42 and the specification's text.** One line, the stage's setting read from it, the tests respelled to keep their values. It makes P-42's own last sentence false (gather.2).
- **Rung A, the abstract members declared: in the spirit of P-158, P-26 and the revision form, after the judge's repair.** The team's 2009 count restored, 12 bodyless declarations in the component's own form, the specification revised. Its Effect named too few departures until the repair.
- **The rulings.** Rung A's judge upheld the skeptic's contested fix, a field matching an api's abstract getter (`JUDGE.md`, section 1). The review's judge ruled a repair of the Effect, built in `39f28f2f4`. No rung was refused, and no worker stopped.

### Where the text, the brief or the principles split

**1. A component's `var` parameter against the text's "same header" (gather.1; rows 844 and 838).**
- **For the check as landed:** the team's own library writes `object OneShot( var canTryIt : Boolean )` against its api's `OneShot( canTryIt : Boolean )` (`Library/OneShotFlag.fss:15`, `.fsi:14`); the team's parser refuses `var` on an api object's parameter (`ProjectFortress/src/com/sun/fortress/parser_util/SyntaxChecker.java:154-157`); a field is matched less `var` already (`ExportChecker.scala:905`, F-282), and `var` without `settable` affects only implementations (`Specification/basic/traits.tex:759-761`).
- **Against it:** `source-code.tex:373-375` and `apis.tex:256` ask the same header, and `objects.tex:104-109` puts the modifiers in it. The api grammar admits `var` there (`apis.tex:87-88`), so the record's premise that "the api grammar's `ApiFldMod` has no `var`" (fork 8, `CLIMB-BATCH-22c.md:116`) holds for the syntax check, not the grammar (L.worker.1).
- **Who saw it:** rung L's skeptic (`rung-list-imports/SKEPTIC.md` section 9), the gather (row 844, the Effect's sentences), the review (it found the record complete).
- **The zero rests on it** (section 6). Its PLAN entry says "Default: as landed" without saying so (`PLAN.md:612`).

**2. A narrower return type (question 4; row 834).** The text accepts a component declaration whose return type is a subtype (`source-code.tex:356-361`, methods `:413-418`); the check asks the api's header, return type included (`existsMatching`, `ExportChecker.scala:431-437`, the team's), and a compiled call names the api's descriptor, so a narrower one dies (row 827's probe). Rung O carried the check's rule to operators; the judge's repair named its method half in Appendix I. The library's 9 lines satisfy both rules. Built at its default, the check's rule; on the list (`PLAN.md:605`).

**3. Rung A's Effect: what a one-sentence revision's "new text" is (judge-review.2).** The revision form asks the Effect to name "each departure: each way in which walk or the compiled path does not do what the new text says" (`.claude/skills/fortress-repo/references/specification.md:22`). The judge read the new text as the revised sentence with the rules for fields and methods it invokes, so rows 839, 842 and 834's method half are named, and rows 834's top-level half, 835, 768 and 769 are not (`JUDGE-review.md`, sections 2.2 and 2.3). A decision taken where nothing on record settles it; on the list (`PLAN.md:618`).

**4. A field for an abstract getter (A.skeptic.1, A.judge.1).** The skeptic's `eee518f60` lets an api's `abstract getter x(): ZZ32` be met by a component trait's field `x: ZZ32`, on `traits.tex:722-723` ("abstract field declarations that are implicit declarations of abstract getter methods"). Without it, the restored count refused a program the base compiled and ran. The other direction, an api field met by a component getter, stays refused (row 842), against `source-code.tex:407-411`. No library site depends on either (skeptic A's grep of the 71 `abstract getter` lines). On the list (`PLAN.md:609`).

**5. Walk's values moved only in where a failure is raised.**
- An open element type's `CastError` is now raised by `upward`'s new cast arm (`Library/CovariantCollection.fss:17`), where it was raised at `List`'s unwrap (`Library/List.fss:179`); row 825 rewritten by L's skeptic. PLAN's entry for row 825 still cites `List.fss:179` (`PLAN.md:594`).
- A user's `NonEmpty` object's `toArray` now fails in `iaf`'s new arm, 'FAIL: initArrayFrom: NonEmpty but not Singleton/Append', where dispatch failed at the trait's `|self|` (skeptic L's `SkCovUserNE`).
- A user object extending `AnyMaybe` without `holds` is refused at load as before, its message now naming `AnyMaybe` at `FortressLibrary.fss:1614` where it named `AnyUniqueItem` (skeptic A's `SkMaybeObject`).
- The record said "What walk does differently: nothing" (`CLIMB-BATCH-22c.md:135`). No decision covers these; each is the team's device or a message, and no gated test pins the old text.

**6. The compile command's new refusals until the switch-over (rung B).** Under the bound `Any`, a compiled generic that prints a value of an unbounded type parameter, or concatenates it onto a `String`, is refused, since the compiler's prelude declares `print`, `println` and `||` at `Object` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:37`, `:55`, `:61`; skeptic B's `SkPrintUnbounded`, rung B's `ConcatAny`). It is P-42's cost, named in Appendix I's Effect (`changes.tex:3101`ff.) and F-296, and `CoercionGenericFnCompiledRungC` writes `T extends Object` for it (fork 11). No entry puts it before him (finding 3).

**7. Rung O's pass restates a rule of the overloading check.** `uncoveredDeclarations` (`ExportChecker.scala:608-621`) repeats `coverOverloading`'s cover test (`OverloadingChecker.scala:843-867`) for declared functions only, since the brief left `OverloadingChecker.scala` untouched. Its answers are equal (the worker's audit, 144 of 144; the review). The rule now has two copies, and the abstract-function branch still calls the first (`ExportChecker.scala:251`). No line anywhere asks a later checker rung to fold them (finding 9).

### Rung O, `bb3925156`

**What landed.** `rung-O.patch` byte for byte (`git diff c3c22817c 5046b1619` equals it but for index lines), then the speed pass (`95f31de40`): `ExportChecker.scala:275`, `:278-282`, `:597-621`; `Library/FortressLibrary.fss:4169-4183` (the six `#` and `:`), `FortressLibrary.fsi:2128`, `:2135` (`BIG ||` and `BIG |||` generic), `Library/List.fsi:14`, `:116`; the tests `XXXExportOperatorHeader`, `ExportOperatorMatch` and the skeptic's two `XXX` tests.

**Standard 1.** "Export Statements" names no exception for operators (`source-code.tex:312-314`), so reading them is the text's rule. Question 4 is the split (above). Part IV renders the changed api lines (`Specification/library/default-libraries.tex:27`, `optional-libraries.tex:24`): `BIG ||` and `BIG |||` become generic and `List`'s comprehension type names `AnyCovColl`. No sentence states the old headers.

**Standard 2.**
- The component takes the api's `CompactFullRange` types where the api cannot name `RangeInternals`' (`library.md:38`'s case two; the precedent `getter bounds():CompactFullRange[\ZZ32\]`, `FortressLibrary.fss:2357`).
- The api takes the component's generic header, as the team's `BIG //` (`fsi:2142`).
- `List`'s api imports `AnyCovColl`, as every other collection api states it (`Set.fsi`, `Map.fsi`, `PureList.fsi`, `IntMap.fsi:13`, `PrefixSet.fsi:33`; skeptic O, section 3).
- In the checker: the admission is the overloading check's (F-281); the double key is filtered in the check (fork 5), the team's `IndexBuilder` TODO kept. The pass's second copy of a rule (split 7).
- Team lines changed: the export check's admission (2012); the six component headers; two api headers; `List.fsi`'s comprehension type, the team's own mismatch since `a874948ac`.

**Standard 3.** P-155, rewritten on 2026-10-29 at his answer to question 2 ("Of course, it's option one."; `POSITIONS-history.md:3236`), built for both checks. Question 4 at its default. Forks 5 and 6 built. P-148: base 163.0 s, change 170.1 s, pass 168.7 s; the operators' loop 7.6 s to 3.8 s; the skeptic's base 163 s and head 155 s.

**Verdict: in the spirit,** with splits 2 and 7.

### Rung L, `96fcd051f`

**What landed.** `rung-L.patch` as it is, `equalParams`' comment re-cited to `objects.tex` (`ExportChecker.scala:683-689`, the comparison at `:694`), `run.sh`'s header and list (`run.sh:3`, `:59-62`, `:87-90`, `:118-121`), `Library/CovariantCollection.fsi:19`, `:24`, `:31-33`, `:44-48` and `.fss:15-28`, `:53-55`, `:70-72`, `:87`, `:125`, `:135`, `table.py`'s api lines with their canned case, and the tests `ExportVarObjectParameter`, `XXXObjectFieldWithoutType` and `CovariantCollectionArmsWalk`.

**Standard 1.** The field rule lets a getter satisfy a field (`source-code.tex:407-411`), which a `var` parameter gives; the header rule is split 1. A field may leave out its type (`objects.tex:243-244`), so row 837, the checker's 'Must provide type for initializer', is home 2 with its `XXX` test.

**Standard 2.** The team's devices in the file: the failing arm (`upward`'s `NonEmpty` arm) for `iaf` and `aaf`; the cast (F-264, as `List.fss:179` uses it) for `upward`'s general arm and `Singleton`'s `dirtyIAF`; `fail[\()\]` with its static argument (`library.md`); the api stating the component's members and `abstract` on the bodyless ones (`library.md:43`). In the checker, `equalLValue`'s `remove(Modifiers.Var)` (`ExportChecker.scala:905`, the revival's `031c38bbc`). Team lines changed: `CovariantCollection.fsi` and `.fss`, unchanged since 2012, and `equalParams`.

**Standard 3.** F-288 built; forks 7 to 10 built; P-27; P-148: no gain, `equalParams` 1 of 12,981 samples; P-79: the 52 demos at the gather.

**Verdict: in the spirit,** with splits 1 and 5.

### Rung B, `1bc0a9083`

**What landed.** `Shell.java:372` reads `setExtendsObjectPreDesugaring(false)`, the planner's blob `1df7072b8`; `DistanceMulti -setting compile` reads that line at each run and stops if it is gone (`DistanceMulti.java:79-92`), and `run.sh`'s default is `compile` (`run.sh:84`); `XXXImplicitBoundAny` promoted to `ImplicitBoundAny`; nine compiled tests and the team's `doubledOverloading.fss` respelled; row 840's run-time pair; the skeptic's `NoDuplicatesRuleUnboundedBesideAny` with its `XXX` test. The specification: `trait-parameters.tex:62-64`, `inference.tex:38` and `:356-360`, and in Appendix I revival-inference's Change (`changes.tex:2010-2016`), revival-overloading's Effect (`:2914-2921`, the skeptic's), and revival-bound's Change and Effect (`:3069-3074`, `:3101-3111`).

**Standard 1.** "If a type parameter does not have an extends clause, it has an implicit "extends Any" clause" (`trait-parameters.tex:52-53`), and tuple types instantiate type parameters (`:67`). The flip ends the compiled path's departure. The No Duplicates Rule (`advanced/overloading.tex:548-549`) now refuses row 759's pair on both paths.

**Standard 2.** The precedent is the line beside it, `useInterpreterLibraries()` (`Shell.java:380`). The `comprises` tests take the library's `where [\E\]` form (`Library/List.fsi:58`). Team lines changed: Steele's 2012 `Shell.java:372`; the team's `XXX6bu.test:16` and `XXX6bv.test:16`, pinned diagnostics; `tests/doubledOverloading.fss:36-41`, `a[\E extends Object\]` and `b[\F extends Object\]`, which keep the test's subject, a doubled overloading table.

**Standard 3.** P-42 built; its last sentence, "The compiled path departs from it until the switch-over", is now false (gather.2). Forks 11 to 14 built. Rows 412 and 759 closed. P-45's "walk and the checker disagree on four kinds of pair (rows 759 and 786 to 788)" is now false (gather.2). P-95 and P-96: the boxes and entries say what the code does; the specification built clean. Not a checker rung (fork 14). The skeptic found that the switch reaches twelve commands, not the four the record names (`rung-bound-any/SKEPTIC.md` section 1): F-296 is incomplete (finding 4).

**Verdict: in the spirit,** with split 6.

### Rung A, `cc47b637d`

**What landed.** `rung-A.patch` as it is, its comment over `equalListMembers` citing the revised rule (`ExportChecker.scala:813-825`); the count of every api member (`:828`) and `equalAbstractMember` (`:860-872`) with the skeptic's field arm (`:864-870`); 12 bodyless declarations (`Library/FortressLibrary.fss:1614`, `:2177`, `:3250-3251`, `:4013`, `:4354`, `:4356`, `:4360`, `:4395-4398`); the tests `XXXExportAbstractMemberAbsent` (turned), `XXXExportAbstractMemberOtherHeader`, `ExportAbstractMemberBodyless` and the skeptic's `ExportAbstractGetterField`, `XXXExportFieldByGetter` and `XXXListMapPairFunctionWalk`; the specification's sentence and box (`Specification/basic/components/source-code.tex:381-399`) and its label (`:289`); Appendix I's "An abstract method of an exported trait" (`changes.tex:4320-4421`, with the repair's lines); the decision record.

**Standard 1.** The Working Draft asked no declaration of an abstract method (`Specification-1.0-frozen/basic/components/source-code.tex:380-385`); the revision asks one, at the header, with a body or without one. `apis.tex:252-256` asks no body and stays true. The front matter's paragraph (`Specification/fortress/preamble.tex:54-64`) stays true. The skeptic's arm rests on `traits.tex:722-723` (split 4).

**Standard 2.** The count is the team's 2009 comparison (`edb516dba`, Sukyoung Ryu) through the team's `ignoreAbstract`. The 12 lines take the form of the bodyless members beside them in the component and of the compiler's prelude, which writes 80 of its 85 abstract members without the modifier (`rung-abstract-declared/REPORT.md` section 10). The getters stand among the getters.

**Standard 3.** P-158, at his informed yes to question 3 (21:34 UTC on 2026-10-29), built; P-26, the team's later word, its ground. The revision form of P-96, whole after the repair. Forks 2 to 4 built. P-158's own sentence "The specification's export rule asks no declaration of an abstract member (F-294)" is now false (gather.2). P-12: walk's missing export check (row 841) has its home at P-12's step, as the record planned; its reproducer is `none` by the brief's leave, where the skill's rule for a deferred defect the text settles asks a gated `XXX` test (`.claude/skills/fortress-repo/references/tests-writing.md:84`; finding 10).

**Verdict: in the spirit,** after the repair, with splits 3 and 4.

### The record's questions and forks, against what landed

| Question or fork | Rung | Landed |
|---|---|---|
| Question 1, phase 3 closes with this batch | all | His framing of 2026-10-26 answered it; the exit is met (section 6) |
| Question 2, P-155 covers the export check | O | Answered option 1; built |
| Question 3, P-158 against the text | A | Answered option 1; built, the text revised |
| Question 4, a narrower return type | O | Default, the check's rule; row 834 `CONTESTED`; Appendix I names its method half |
| 1, one run, four rungs | all | Built; applied O, L, B, A |
| 2, P-158's letter, `ignoreAbstract` | A | Built; the skeptic's field arm added (split 4) |
| 3, the 12 bodyless, no `abstract` | A | Built |
| 4, `ExportAbstractMemberAbsent` turned | A | Built; row 816 closed by it |
| 5, the double key in the check | O | Built (`isDeclarationName`) |
| 6, the 9 headers by the library's rule | O | Built |
| 7, `CovariantCollection` by its own devices | L | Built; walk's failure sites move (split 5) |
| 8, `OneShot`'s parameter by the check | L | Built; the zero rests on it (split 1) |
| 9, a field with no type as a new row | L | Row 837 with its `XXX` test |
| 10, the stage reads every api's count | L | Built (F-295); `COMPONENT-CRASH` unread (L.worker.2) |
| 11, `CoercionGenericFnCompiledRungC` with `T extends Object` | B | Built |
| 12, `doubledOverloading.fss` respelled | B | Built; the ladder row stays `pass` |
| 13, the stage's setting read from `Shell.java` | B | Built; the gate's first line `extendsObject=false` |
| 14, no speed pass for B | B | Kept |
| 15, three speed passes | O, L, A | O's halved its loop; L's and A's found no gain |
| 16, the count stage keeps walk's setting | all | Kept |
| 17, nothing declared | all | Kept; nothing came |
| 18, the 52 demos at the gather | gather | 52 of 52 |

### The global questions

- **Promised against landed.** The distance 0 over the fourteen under the compile setting and the count 0, as planned. Rows planned to close, 782, 827, 412, 828, 829 and 816, closed, and 759 beside them. Planned rows opened: 834, 837 and 841. Beyond the plan: rows 835, 836, 838, 839, 840, 842, 843 and 844, and judge-review.1's three by reading.
- **The record's premises that failed:**
  - rung A's brief, "the compiled path has none once your check lands" (`CLIMB-BATCH-22c.md:155`): rows 839, 842 and 834's method half depart; rung A wrote the premise into its decision record and Effect (finding 2);
  - fork 8's grammar premise (split 1);
  - "What walk does differently: nothing" (`:135`; split 5);
  - the gate's forecasts 684 and 1,323 (`:501-502`), against 685 and 1,332: the skeptics' and the workers' unplanned tests;
  - the expected minutes, 110, 80, 120 and 130, against 61, 49, 62 and 52.
- **Built twice: no.** No two rungs change one declaration (`RECORD.md:64`; the review's cross-rung check).
- **The library's way: yes for each,** with the precedents above.
- **Together.** Three rungs edit `ExportChecker.scala` in different functions, A and O share `FortressLibrary.fss` in different declarations, L and B share `run.sh` in different lines. On the merged tree: the distance and the count 0; every test the rungs add or change passes; the 52 demos reach their end; the gate is green. The one interaction is split 1.

### Findings

Ranked by what they cost or risk next, each with its home.

1. **Phase 3's zero rests on one reading he has not confirmed, fork 8's `var`** (section 6; split 1). Its PLAN entry gives the default as landed, without saying that the zero over the fourteen holds only under it (`PLAN.md:612`). Proposed (mine): the landing report names it beside phase 3's end, with its default, as landed; the entry gains that sentence. Home: the routing; gather.1.
2. **The review's block began in the brief, and the gather's fold did not catch it.** Rung A's brief told it "the compiled path has none once your check lands" (`CLIMB-BATCH-22c.md:155`). Rung A wrote that into its decision record (`rung-abstract-declared/decision-record.md:68`, before the repair) and its Effect. Skeptic A gated row 842 but named no departure (`rung-abstract-declared/SKEPTIC.md` section 3). The gather added row 844's sentences and stopped (`RECORD.md:156`). The judge and the repair then cost 445K and 24 minutes after a green gate. This is the third batch in which an Appendix I Effect drew a review judge and a repair: the manual names batches 8 and 9, 0.53M and 0.39M (`coordinator/climb-batch-workflow.md:161`). Proposed (mine): a planner writes no "none" into a brief's Effect; the gather's "Corrections still owed" gains one check, that every row the batch opens against a passage which an Appendix I entry of the batch revises is named in that entry's Effect. Home: the manual, "Gather"; the planner's record form.
3. **The record's forks, its points for his sight, the team's test lines rewritten and a hidden difference have no entry on the review list.** For climb batch 22 the routing added the forks and the points (`PLAN.md:598-599`). For this batch `PLAN.md:601-618` holds the items of the rungs, the gather, the review and the judge only. Missing:
   - the record's forks 1 to 18, taken at their defaults (`CLIMB-BATCH-22c.md:105-127`), fork 13's change of the distance's setting among them;
   - its points for his sight (`:128-137`; `RECORD.md`, "Points to report"): the team's lines each rung changed; walk's moves (split 5); the checker's new refusals and acceptances, the compile command's print and concatenation limit among them (split 6);
   - the team's test lines rung B rewrote to keep their values, with their before and after, which `.claude/skills/coordinator/references/batch.md:61` asks: `XXX6bu.test:16`, `XXX6bv.test:16` and `tests/doubledOverloading.fss:36-41` (`rung-bound-any/REPORT.md` section 9);
   - the microGPT first-error change the gate's comparison hid (section 1), which the same line asks.

   Home: the routing.
4. **FACTS left false or incomplete at the landing:**
   - **F-240** (`FACTS.md:101`): "at the last landed gate, climb batch 22's", about 150 s and 227 s. Now about 170 s by the gate's call times and 238 s (`FortressLibrary` 174 s) at load 1.70. The commit stage named it, as its brief says; climb batch 22's finding 4, to write F-240's figures at the commit stage, is not built.
   - **F-294** (`:128`): "The compiled check departs from the rule's "same header" for an object's value parameter written `var` in the component only (row 844)". The Effect now names four compiled departures: rows 844, 839, 842 and 834's method half.
   - **F-282** (`:119`): "and an object's value parameter likewise, by its modifiers other than `var`". "Likewise" follows "a field by its name ...", but the check compares no parameter name (row 839).
   - **F-296** (`:129`): "so `compile`, `link`, `build` and `typecheck` read ...". Twelve commands call `useCompilerLibraries()` (`Shell.java:402-460`; skeptic B, section 1). Incomplete, not false.

   Home: the routing, by `record.py`.
5. **Code states measured again.**
   - The gather ran the distance stage (215 s) and the count stage (161 s) on the merged tree, and the gate ran both on the same code (238 s, about 170 s). The gather also built the merged tree, and the gate built `main`, whose code is the same but for two comment lines. Rows 827 and 828 close on the distance stage, and the manual's "After the rungs" asks a closing test to pass on the merged tree before the close commit, so the gather ran it. That is climb batch 22's finding 7, proposed (a row whose test is a stage closes in the commit stage on the gate's table; the gather runs no stage) and not built. About 6.3 minutes of one core, and a build.
   - The base's count stage ran six times on one code state: three workers (O, L and A, each P-148's base timing) and three skeptics (the allowed exception, `batch.md:49`). About 17 minutes of one core. The workers' three runs are not the skeptic's exception. Proposed (mine): with several checker rungs in a batch, the base build is timed once before the launch, under the load of nothing else, and each worker cites it and times only its tree; the skeptics' runs stay. Home: `compiler.md`, "The checker's time", and the manual's "Before the launch".
   - The specification was built twice on one text: the repair's step 7, then removed with `git clean`, and the commit stage's build on the same `Specification/` (`39f28f2f4` and `b81d86b75` hold the same text). About 1.5 minutes each. Proposed (mine): the repair keeps its PDF when its brief allows the commit stage to land it. Home: the manual, "Commit".
6. **Skill sentences made false or left incomplete beyond the record's list** (Part 3). The writer ran on the record's list at 03:02 UTC, before this review, so a second task is owed. Home: the skill writer.
7. **The record left stale by the landing** (Part 4): PLAN's "Where we stand", phase 3's item list and opening paragraph, phase 4's two lines on rows 816 and 782, the phase-3 candidates' lines on rows 759 and 782, phase 3's end entry, row 825's entry, the review queue's head and items 288 and 262, and the manual's "The distance stage". Home: the routing.
8. **Agents wrote outside their worktrees again.** Rungs L and O saved their briefings as `brief1.txt` to `brief3.txt` in the session's scratchpad, skeptic A its slice as `slice1.txt`, and the repair the four slices as `O1.txt`, `B1.txt`, `L1.txt` and `A1.txt`. The file names collide across agents; L and O used the same name an hour apart. This is batch 20's finding 13, met in a fourth batch (`PLAN.md:172`). And rung O's call `cd <tree> && export ... && nohup bash -c '...' &` sent the whole list, its `cd` too, to the background, so the call's next line made `tmp/rung-export-operators/audit/` in the main tree; the worker removed it 20 s later (its calls at 23:33:59 to 23:34:21 UTC). The skill shows the detached line after the setup lines (`.claude/skills/fortress-repo/references/session.md:24-26`) but does not say why they stay on lines of their own. Home: `PLAN.md:172`; the skill writer (Part 3).
9. **Rung O's speed pass is a second copy of a rule** (split 7). Proposed (mine): one line in phase 4's list, for the next rung that edits `OverloadingChecker.scala`: make the cover test reusable and have `uncoveredDeclarations` call it. Home: the routing.
10. **Row 841's reproducer is `none`.** The text settles it (the revised export rule), so the skill's rule asks a gated `XXX` test (`tests-writing.md:84`). Rung A's brief allowed `none`, and walk has no refusal to assert yet. The review routed row 839's owed test (review-routed.1) and not this one. Proposed (mine): row 841's notes say which test the walk rung at P-12's step writes. Home: row 841.
11. **A skeptic rewrote a pushed commit.** Skeptic O amended its own first commit for its footer and pushed it again with `--force-with-lease` (`rung-export-operators/SKEPTIC.md` section 7). Nothing came of it: the gather composes new commits on `main`, so a branch's footers never reach it. No rule covers a force push on a branch. Proposed (mine): the skeptic's brief says a branch's commit is never rewritten after it is pushed. Home: the script's skeptic brief, between batches.

## Part 2. Did the practice hold

### The skeptics' fixes

From the journal's results and each `SKEPTIC.md`: 14 fix commits, four of them a report and record from the journal; one defect of the change, contested and upheld.

| Rung | Fix commits | Defects of the change | Test first |
|---|---|---|---|
| O | `a39ea1e8e` (from the journal), `2f67e57aa` (one sentence of each file), `9756d5017` (rows 835 and 836, two `XXX` tests) | 0 | each `XXX` test red on the old code through the harness ('Saw wrong failure', 'Tests run: 2, Failures: 2'), green on the head ('OK (5 tests)'), and the first red with its defect removed for one run |
| L | `479f16405` (from the journal), `42890b433` (a test's citation), `f8dc80a2a` (row 825, row 839, two sentences of the text, F-288's clause, a team line), `9d18f3c2b` (the suites' commit) | 0 | comments and records; the corrected test green on the head ('OK (1 test)') |
| B | `8feb78b84` (from the journal), `1bd87dcf7` (row 759's test, two Effects), `e2df28a4b` (the record's row 691 and the made-false list) | 0 | red on the old code ('Saw failure, but did not satisfy compile_err_matches', 'Tests run: 1, Failures: 1'), green on the head ('OK (1 test)') |
| A | `4e054ec89` (from the journal), `40402a981` (Appendix I's macro and number), `31c01f44c` (rows 842 and 843, two `XXX` tests), `eee518f60` (the field arm, contested) | 1, upheld | red on the worker's head ('due to different method x', 'Tests run: 3, Failures: 2'), green on the fix ('OK (23 tests)' over the folder's 18 export tests), `ant testQuick` 1,321 with no failure |

- Every fix stays inside its rung's work, and the review checked each as applied (`fixesChecked`).
- Against the batches before: 22 made 8 with 0 defects, 21b 7 with 1, run 1 13 with 1, batch 20 11 with 0.
- Skeptic A gated row 842 and did not name it as a departure the Effect owed, against the revision form's "each departure" (the judge's ruling, section 3).

### Workers, test first

From the skeptics' reading of each worker's transcript (each `SKEPTIC.md`, section 1 or 2):
- **O:** red on the base's code at 23:11:45 ('Saw wrong failure', 'Tests run: 3, Failures: 1') before the first build at 23:13:06; green at 23:42:31 after the last change of code ('OK (3 tests)'); the `XXX` test red with a deliberate fix for one run. In the letter.
- **L:** `ExportVarObjectParameter` red at 22:24:08 on the base's code ('different parameters for object constructors'), the edit built at 22:29:02, green at 22:31:09; `table.py`'s canned case red at 22:20:10 ('FAILED (failures=2)'), green at 22:28:49; the walk guard green at 22:25:18 before the library's edit at 22:27:01; `XXXObjectFieldWithoutType` shown both ways. In the letter.
- **B:** the ten tests edited from 23:18:53 to 23:20:02, red on the base build at 23:20:21 ('Tests run: 13, Failures: 9'), `Shell.java` edited at 23:22:40, green at 23:25:57 ('OK (13 tests)'); row 840's pair shown both ways. In the letter.
- **A:** red at 22:17:36 ('Tests run: 5, Failures: 2'), the patch at 22:19:15, the build at 22:21:45, green at 22:23:27 ('OK (12 tests)'). In the letter.

No miss of order.

### The rulings and the repair

- **Rung A's judge** (146K, 5.0 minutes): `eee518f60` stands; nothing reverted. Read, not run.
- **The review's judge** (231K, 16.0 minutes): repair, with a probe first for row 834's method half, and judge-review.1 and judge-review.2 for him.
- **The repair** (214K, 8.2 minutes): as section 4 gives. It ran its probe in the main tree's `tmp/judge22c-probe/`, after the gate, as its instructions said.

### The merged-diff review

- Not approved: one blocking finding, upheld and extended by the judge. Six corrections in `f8bb64872`, two tests routed (review-routed.1 and .2), one item for him (review.1).
- It did not see row 834's method half (the judge's ruling, section 3), F-294's and F-282's sentences (finding 4), or the missing forks and points entries (finding 3).
- Cost: 376K beside the gate.

### Builds and runs, repeated or not

- **Builds:** each rung once on its change (O twice, the change and its pass); skeptic A once on its fix; the gather once on the merged tree; the gate once on `main`. The gather's and the gate's were of one code state (finding 5).
- **Suites:** each worker ran `ant testQuick`, `ant testSystem` and `ant testSpecData` once on its final code (P-124; B ran `testQuick` only, since it changed no library text). Skeptic A ran `ant testQuick` on its fix. No other skeptic and not the gather. The gate ran `testFast`, `testSystem` and `testSpecData`.
- **The stages:**
  - the count stage: each checker rung on the base and on its tree (O three times, with the pass), B once, each checker skeptic on the base and the head, the gather once, the gate once: 16 runs, six of them on the base's code (finding 5);
  - the distance stage: each worker once on its final tree, the gather once, the gate once on the gather's code (finding 5).
- **The demos:** the gather ran the 52 once on the merged tree (fork 18).
- **The specification:** rung B once, skeptic B once after its Effect, rung A on its tree and on a copy of the base's text (to show the skill's grep's 47 matches on unchanged text), the repair once, the commit stage once on the repair's text (finding 5).
- **Walk old against new:** skeptic O's `SkRangeWalk`, skeptic L's four programs at one and four threads, skeptic B's fourteen at four threads, skeptic A's `SkLibWalk` and `SkMaybeObject`, each against the old code through `old-fortress.sh`.
- **Taken from the record, not run again:** climb batch 22's tables as every rung's before; the planner's runs b14, a0, o0 and the four rungs' text together; the base build `/home/user/fortress-base23` at `e0ec620a9` as the old code, its code equal to the base's.

### Refusals by the harness and the tools

- **All four workers' writes of `REPORT.md` were refused,** as the script expects (A 22:59:25, B 23:56:05, L 23:07:27, O 00:00:35). Each rung's skeptic wrote the files from the journal onto the branch with `journal-text.py`. Skeptic L's first journal lines exited 1, its folder missing on the branch, as skeptic E's did in climb batch 22.
- **Six `Edit` calls were refused** for a file not read first: rung A once, L twice, O twice (O then applied the same edits with a script), skeptic A once.
- **One removal refused** by the built-in check (skeptic A, 00:29:44). **One `sleep` blocked** (skeptic L, 00:15:27); the next call waited with `wait_for`.
- **Two structured results refused by the schema** (skeptics A and L, a fix's `kind` outside `correction` and `defect`), each sent again at once.
- **Length refusals:** row 592's note (813 characters), written by a rewrite; skeptic B's row 691 line (739), cut and written. None left out.
- No refusal cost a cache refill.

### The commit stage's fold of FACTS

Its brief asks for the landed figures, numbers only. It kept F-53's two totals at 0, changed F-53's title from "climb batch 22's" to "climb batch 22c's", which it named as a word beyond the figures, and named F-240's title and source path as false (the commit stage's result). The manual and the script still name the entries by titles that do not exist, and still leave F-240's figures to the coordinator (climb batch 22's finding 4). F-294, F-282 and F-296 were left by the gather's fold (finding 4).

### The practice's measures, batches 20 to 22c

| Measure | B20 | B21 | B21b | B22 | B22c |
|---|---|---|---|---|---|
| Written | 2.64M | 4.75M | 3.50M | 2.82M | 4.61M |
| Rungs, agents | 2, 8 | 4, 14 | 3, 10 | 3, 10 | 4, 15 |
| Per rung, all roles | 1.32M | 1.19M | 1.17M | 0.94M | 1.15M |
| First calls | 0.47M, 7 cold | 0.68M, 8 cold | 0.51M, 7 cold | 0.47M, 6 cold | 0.76M, 9 cold |
| Refusal cycles | 0 | 0 | 0 | 0 | 1 rung, 3.2 % |
| Rulings and repairs on the merged tree | 0 | 8.3 % | 0 | 0 | 9.7 % |
| Skeptic fix commits (defects) | 11 (0) | 13 (1) | 7 (1) | 8 (0) | 14 (1) |
| Distance sites gone, net | 26 | 0 (full check 186) | 0 | 5, to 0 | 0, at 0, its scope 12 to 14 and its setting `any` to `compile` |
| Count stage at the gate | 63 s | about 78 s | about 90 s | about 150 s | about 170 s |
| Distance stage at the gate | 161 s | 206 s | 235 s | 227 s | 238 s |
| Skill's load | 9.8 % | 10.4 % | 11.3 % | 12.5 % | 13.6 % |
| Briefing, estimated | 3.4 % | 4.1 % | 3.2 % | 4.2 % | 4.0 % |
| microGPT quick pair, verdicts | 7 of 7 both | 7 of 7 both | 7 of 7 both | 7 of 7 both | 7 of 7 both |

### Climb batch 22's findings, a batch later

1. Phase 3's zero on question 1: answered by P-158 (his reversal of 25 October, his informed yes of 29 October) and built by rung A; row 816 closed.
2. The distance in phase 4's gates: climb batch 23's question 1, default yes (the boot note, "Next", item 3). Not yet decided.
3. The model's imports outside the distance: P-33 now says the other components are cleared as the need arises, `System` by the switch-over (his answer of 29 October). The probe is climb batch 23's planner's debt (the boot note).
4. FACTS left false at the landing: F-281, F-34, F-245 and F-61 were rewritten in the routing; F-240 was rewritten for climb batch 22 and is false again; the commit stage's instruction is not changed (finding 4).
5. The count stage's 150 s: `compiler.md:139` and F-240 say it; about 170 s now (section 2).
6. Rows 756 and 735: both notes written.
7. The merged tree's stages run twice: not built; met again (finding 5).
8. Phase 3's left candidates: moved to "Phase 3's candidates at its end" (`PLAN.md:224`); two of its lines are now stale (Part 4).
9. A walk premise from reading: met again, `CLIMB-BATCH-22c.md:135` (split 5).
10. The session's scratchpad: met again (finding 8).
11. The stale review-queue items: brought up to date in the routing; its head is stale again (Part 4).
12. The clients' verdicts point: the routing added climb batch 22's points (`PLAN.md:599`); this batch's are missing (finding 3).

### Misses, by kind

Numbered on from `batch-22-review.md`'s 763.

Found inside the batch:
- **The change wrong:**
  - 764, rung A's restored count refused a component trait's field that declares its api's abstract getter, a program the base compiled and ran (skeptic A, `eee518f60`, contested, upheld).
- **A test that reached too little:**
  - 765, rung B's tests did not reach row 759's pair, which the flip repairs (skeptic B, `1bd87dcf7`).
- **A defect without its home:**
  - 766, rows 835 and 836, the export check's functional methods and static parameter names (skeptic O);
  - 767, row 839, no parameter name compared (skeptic L);
  - 768, row 825's claim, made false by rung L and missing from its record (skeptic L);
  - 769, rows 842 and 843, a getter for a field, and walk's `List.map` on pairs (skeptic A);
  - 770, row 844, the text mismatch of rungs L and A (the gather);
  - 771, three departures by reading with no row (judge-review.1, the review's judge).
- **Text claiming more than the code or the evidence:**
  - 772, rung O's "admits exactly what `isDeclaredName` admitted" (skeptic O, `2f67e57aa`);
  - 773, rung L's test citation of a section that is a subsection, its F-288 clause "compiles after the switch-over", its revival change's team line, and its suites' commit unnamed (skeptic L);
  - 774, rung B's "row 691 is no longer reached through a tuple" (skeptic B, `e2df28a4b`);
  - 775, rung B's Effect naming the concatenation and not `print` and `println` (skeptic B, `1bd87dcf7`);
  - 776, rung A's `\library\` at a sentence's start (skeptic A, `40402a981`);
  - 777, rung A's Effect and decision record: no compiled departure, where three depart (the review, blocking; the judge's repair);
  - 778, rows 834 and 835's lines with no commit, row 71's notes, F-295's and PLAN's `shadow-patch.py` lines, F-292's tree (the review, `f8bb64872`);
  - 779, the export check's comment quoting the Working Draft's rule (the review, review.1, not corrected).
- **Sentences made false and not listed:**
  - 780, F-274, P-45, `compiler.md:80`, `sources.md:383` and the comment at `OverloadSet.java:1501` (skeptic B);
  - 781, `source-code.tex:372-379` and `apis.tex:256` for a `var` parameter (skeptic L);
  - 782, `sources.md:869` (the review).
- **The record's premises:**
  - 783, "the compiled path has none once your check lands" (`CLIMB-BATCH-22c.md:155`), behind 777;
  - 784, fork 8's grammar premise (worker L, L.worker.1);
  - 785, "What walk does differently: nothing" (skeptics L and A);
  - 786, the gate's forecasts and the expected minutes (the gate; this review).
- **The team's code, found by the rungs:** rows 835, 836, 839 and 842 (the team's export check), 837 (the team's `Thunker`), 838 (the team's syntax check), 840 (a component named `Tuple...`) and 843 (walk's inference through `List.map`); counted above.
- **Process:**
  - 787, four report writes refused (by design);
  - 788, skeptic L's journal lines run before its folder existed;
  - 789, six `Edit` calls, one removal, one `sleep` and two structured results refused;
  - 790, skeptic O's amended and force-pushed commit;
  - 791, rung O's backgrounded `cd` and its folder in the main tree's `tmp/`;
  - 792, the gather's two stages and its build repeated by the gate;
  - 793, the base's count stage run six times;
  - 794, the specification built twice on one text;
  - 795, the briefing files and the repair's slices in the session's scratchpad;
  - 796, the review's block, 445K and 24 minutes;
  - 797, F-240 left false at a fourth landing (named by the commit stage).
- **The review's own error:** 798, it missed row 834's method half (the judge).

Found by this review: 799 to 809, findings 1 to 11 above.

**Against the earlier notes.**
- 35 found inside the batch (764 to 798), against 22's 36.
- One was a fault of the change (764), caught by its skeptic and upheld by the judge. The others are homes, text claims, premises and process. The batch landed with no known wrong value.
- The known costs: the zero resting on fork 8's reading (finding 1); rows 834, 836, 838, 839, 842 and 844 open on the export check, and judge-review.1's three unprobed; the compile command's print and concatenation limit until the switch-over.

## Part 3. Skill sentences the batch made false

For the skill writer. The record lists seven (`RECORD.md:276`): `compiler.md:69`, `:74` and `:80`, `library.md:44`, `sources.md:383` and `:869`, and `specification.md`'s grep. The writer changed all seven in `79e5202ad` (03:02 UTC on 2026-10-30), after the landing and before this review. Lines below are of `.claude/skills/` at `79e5202ad`, which `main` at `ea220f03e` holds.

**The writer's change that is narrower than the batch's own check:**
- **`fortress-repo/references/specification.md:49`:** "`grep -c 'LaTeX Warning: Reference\|^! Undefined control sequence' Specification/fortress/fortress.log` must print 0." The old grep also caught "multiply defined"; the new one drops it. The judge's repair ran the three-part grep of climb batch 21's gather, `grep -c "LaTeX Warning: Reference\|LaTeX Warning: Label .* multiply defined\|^! Undefined control sequence"` (`climb-batch-21/RECORD.md:56`; `JUDGE-review.md`, section 4, step 7), and rung B, skeptic B and the commit stage counted the multiply defined labels too (`rung-bound-any/REPORT.md` section 8; `SKEPTIC.md` section 3; the commit stage's result). Rung A added a label (`\seclabel{export-statements}`, `source-code.tex:289`), the case a second label would break. Proposed: that three-part pattern.

**Left incomplete by the batch, each owed by its revival-change material (`RECORD.md:278-337`):**
- **`fortress-repo/references/compiler.md:67-71`, "Traps of the compiled path":** the writer cut the `Object`-bound trap and wrote nothing for the limit that replaces it. Until the switch-over, a compiled generic that prints a value of a type parameter declared without a bound, or concatenates it onto a `String`, is refused ('Object->() is not applicable to an argument of type T.', '(String, Object)->String is not applicable to an argument of type (String, T).'), since the compiler's prelude declares `print`, `println` and `||` at `Object` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:37`, `:55`, `:61`; F-296). Write `T extends Object` there, as `compiler_tests/CoercionGenericFnCompiledRungC.fss:20-21` does. The orientation's admission proposes the same (`climb-batch-22c/orientation/admission.md`, F-296's row).
- **`fortress-repo/references/library.md:38`:** "The parameters' names and a `where` clause do not count." For an object's value parameters the names are its fields' names: the check compares none (row 839), and a compiled client's `Np(3).a` dies with `NoSuchMethodError` where the component renames one (`rung-list-imports/SKEPTIC.md` section 6). And static parameters' names do count: the check refuses a renaming (row 836, `CONTESTED`). Proposed: "A function's parameters' names and a `where` clause do not count. An object's value parameters and every static parameter keep the api's names."
- **`fortress-repo/references/library.md:44`:** "It matches a field by its name, its type and its modifiers other than `var`." Since the batch it also matches an object's value parameter by its type and its modifiers other than `var` (rung L), and an api's abstract getter by a component field of its name and type that is neither `hidden` nor `private` (rung A's upheld fix, F-297); it does not match an api's field by a component's getter (row 842). The orientation's admission proposes the first two.
- **`fortress-repo/references/interpreter.md:32-80`, "What walk checks":** walk compares no component with the apis it exports, so a component that leaves out an api member, or declares it at another header, loads and runs under walk (row 841; the revival change of rung A, "Walk still runs a component that leaves one out"). A worker who edits a library api meets this only through the distance stage.

**A trap the batch met, not a false sentence:**
- **`fortress-repo/references/session.md:24-26`:** the detached form follows "the setup lines". Rung O joined them into one line, `cd <tree> && export ... && nohup bash -c '...' &`, which sends the whole list, its `cd` too, to the background; the call's next line then ran in the main tree and wrote its `tmp/` (finding 8). Proposed: one sentence, that the setup lines and the `nohup` line stay separate lines, since `A && nohup B &` runs `A` in the background too.

**Sentences that hold, met by the batch:**
- `fortress-repo/references/compiler.md:139`, the count stage "about 150 seconds, more under load": about 170 s at this gate, 163 to 179 s on the base at low load. It holds as "about"; F-240 holds the figure.
- `fortress-repo/references/gate.md:70`: the gate compares the microGPT components' phases, as it says; the first error that moved (section 1) is outside what it claims.
- `fortress-repo/SKILL.md:132`: "An unbounded type parameter is bounded by `Any`": now true on both paths.
- `fortress-repo/SKILL.md:79`, "The compiled checker already finds no error in the interpreter's library": true of the fourteen under the compile setting (F-53, F-289), not of the library's other components (F-290). That was so before this batch.

**The coordinator skill** (edited only with his yes on its wording, by the boot note):
- **`coordinator/references/batch.md:56`,** "The gate reports the checker count in every batch, and the distance in phase 3": phase 3 ends at this landing. Climb batch 23's question 1, default yes, keeps the distance in phase 4's gates; once he decides it, this sentence is false. For his yes, with that answer.
- **`coordinator/references/batch.md:34`,** "The batches of PLAN's phase 3 run on a standing go": phase 3's batches are done, and this one ran on his word (the record's header). Phase 4's go is in the boot note only. Not false.

## Part 4. Routing

Checked against `main` at `ea220f03e`: the gather's PLAN entries (`bb3925156` to `a0c48211c`), the review's (`f8bb64872`), the repair's (`39f28f2f4`), the boot note (`a67baf950`) and the review queue (`effb41db6`). The manual's routing (`coordinator/climb-batch-workflow.md:268-282`) runs after this review, by the boot note ("Next", item 4).

### What the record listed for him, and PLAN lacks

- **Question 1, phase 3's close:** answered by his framing of 26 October; PLAN holds climb batch 22's entry, "Is phase 3 done? Default ... done at this landing" (`PLAN.md:586`), open, its three readings now two closed and one open. To `PLAN-history.md` under this landing, with fork 8's reading named (finding 1).
- **Questions 2 and 3:** answered; their review-queue items 279 and 280 are in (a). Nothing owed in PLAN.
- **The record's forks 1 to 18 and its points for his sight:** no entry (finding 3). Climb batch 22's routing wrote one entry each (`PLAN.md:598-599`).
- **The team's test lines rung B rewrote, and the hidden first-error change:** no entry (finding 3).

### The items of the rungs, the gather, the review and the judges

- O.worker.1 with O.skeptic.1 (question 4, row 834), `PLAN.md:605`: default the check's rule. Sound; the Effect now names its method half, which the entry could say.
- O.skeptic.2 (row 836), `:606`: equal names. Sound.
- L.worker.1 with L.skeptic.1 (row 838), `:607`: no default on record; the refusal stands. Proposed (mine): default "the syntax check's refusal stands until the curator answers gather.1", since the two are one question.
- L.worker.2 with L.skeptic.2 (`COMPONENT-CRASH`), `:608`: the stage as landed. Sound.
- A.skeptic.1 with A.judge.1, A.judge.2 and A.judge.3, `:609-611`: as landed. Sound.
- gather.1 (row 844), `:612`: as landed; it lacks the sentence that the zero rests on it (finding 1).
- gather.2 (P-42, P-45, P-158), `:613`: no default; the boot note puts P-42 first for the morning. Sound.
- review.1, review-routed.1 and review-routed.2, `:614-616`: sound; the routed two are tests owed.
- judge-review.1 and judge-review.2, `:617-618`: sound.

### New rows

- 834 to 836 at `:605-606`; 837 with its `XXX` test, its home 2; 838 at `:607`; 839 at `:615`; 840 with its `XXX` pair; 841 with reproducer `none` (finding 10); 842 at `:609`; 843 with its `XXX` test; 844 at `:612`.
- Rewritten 825: PLAN's entry for it still cites `Library/List.fss:179` (`PLAN.md:594`), now `Library/CovariantCollection.fss:17`.

### Answered, stale or overlong in the record

- **PLAN's "Where we stand"** (`:9-13`): "Runs" ends at climb batch 22; the live thread gives 22's gate, "The zero rests on three readings" (rows 816, 731 and 782) and "The distance covers the twelve prelude components only"; "Landed" ends at 22, with phase 3's end "his call"; "Next" names phase 4's first batch as N0, where the boot note names climb batch 23. All want this landing: the distance 0 over the fourteen under the compile setting, the count 0, phase 3 closed, its one open reading, and climb batch 23 next.
- **Phase 3's item list** (`:40-60`): no line for this batch. One line, item 21, with `b81d86b75` and this review; then the phase closed.
- **Phase 3's opening paragraph** (`:39`): "0 at climb batch 22's gate", "resting on three readings ... whether it is done is his call". Stale.
- **Phase 4** (`:67`): "Row 816's repair ..., in the next batch": built by rung A. To history. And (`:68`) the names line's "row 782, the export check's skip of top-level symbolic names, on which phase 3's zero rests": closed by rung O. Drop it.
- **"Phase 3's candidates at its end"** (`:224-246`): its lead names P-45's row 759 and "Rows the names batch meets, 782 and 813 with 814"; `:228` ends "After it: row 782, ... latent while `isDeclaredName` stays"; `:236` lists rows 759 and 691 among item 18's candidates. Rows 759 and 782 are closed. Row 691 stays open, its line rewritten.
- **`PLAN.md:573`** (climb batch 21b's E.worker.1 with E.skeptic.2): its two departures by reading are now row 842 and judge-review.1's (a), and its `source-code.tex` lines moved (`:393-396` is `:407-410`, `:398-403` is `:412-417`), as is `:481`'s `:355-360` (now `:356-361`; `RECORD.md:39`). One line each, with pointers to the rows.
- **The review queue:**
  - its head: "The next batch, climb batch 22c, which closes phase 3: 0" and "Needed by the next batch, climb batch 22c": answered;
  - item 288 (`review-queue.md:662-668`), "P-155's second sentence has been false since climb batch 21b": the sentence it quotes, "Today its overloading check reads ...", is gone since P-155's rewrite at his answer to question 2 (`POSITIONS-history.md:3236`). To (a);
  - item 262 (`:820-826`), F-223's rewrite, "Needed by: before the checker rung on row 759": row 759 closed with rung B's flip, with no checker rung; both paths now refuse its pair. Its needed-by is never, or the item is answered.
- **FACTS:** F-240, F-294, F-282 and F-296 (finding 4). F-282, F-286, F-287, F-288, F-296 and F-297 are past the record's 600 characters, as `record.py check` reports.
- **POSITIONS:** P-42's last sentence, P-45's row 759 and P-158's sentence on the export rule are false (gather.2), all his text. P-155 is built for both checks and is true. P-33 is met and true. P-12 is untouched; row 841 waits at its step.
- **The manual:** "The distance stage" says the stage runs "over the twelve prelude components" (`climb-batch-workflow.md:234`); it runs over fourteen, under the compile command's setting.

### The steps due before climb batch 23

1. **This review committed;** then the routing above: PLAN's "Where we stand", phase 3's item 21 and its close, phase 4's two lines, the candidates' lines on rows 759 and 782, `:573`, `:586` and `:594`, the forks' and points' entries with the team's test lines and the hidden first-error change, gather.1's sentence, and the queue's head and items 288 and 262.
2. **FACTS:** F-240 at this gate (the count stage about 170 s by the gate's call times; the distance stage 238 s, `FortressLibrary` 174 s, at load 1.70), and F-294, F-282 and F-296 as finding 4 gives, by `record.py`.
3. **The skills:** a second task for the writer with Part 3 (the writer has done the record's list), a cold read of its changes, the writer's fixes, and the push, before climb batch 23's planner is briefed (the manual's routing, steps 4 and 5).
4. **The tools, between batches:** finding 2's gather check; finding 5's stages at the gather and base timing; climb batch 22's finding 4 (the commit stage's fold of F-240) and batch 20's finding 13 (the briefing's output file), each met again; finding 11's line in the skeptic's brief.
5. **For him, with defaults:** phase 3's end with fork 8's reading named (as landed); P-42, P-45 and P-158's sentences (gather.2, no default); question 4 and the batch's other items at their defaults. Below.
6. **Climb batch 23,** the natives' mechanism (P-33, P-58): its planner re-checks `CLIMB-BATCH-23.md` on the new base, whose checker, operators, `List` imports and compile bound changed, and pays climb batch 22's debts (the boot note, "Next", item 3). The gather's worktree `/home/user/fortress-gather22c` is removed after this review (item 5 there).

## What I did not do

- I built nothing and ran no Fortress program, suite, stage or JVM. I changed no file of the tree but this review, and committed it alone.
- I read the run's transcripts only through scripts: `batch-measures.py` on five runs and `transcript-study/skill-load.py` on this run, and scratch scripts of mine (`agents.py`, `brief.py`, `calls.py`, `runs.py`, `errs.py`) in `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/rev22c/`. The briefing script gives climb batch 22's figures exactly, which checks it.
- I read the library's text with `objparams.py`, in the same folder, to compare the value-parameter names of the 42 objects declared in both an api and its component of the fourteen. That is a read of the text, not a check by the compiler.
- I ran `record.py check` and `ledger.py landing-check` ('0 failures'; 'no finding'), `facts-extract.sh`, `grep` and `git`, which write nothing.
- The count stage's gate time comes from the gate's call times. I cite no file under `tmp/` as a source.
- I compared no walk timing. I did not read the coordinator's session; what he was told comes from PLAN, the boot note and the conversation note. The INDEX line for this review is the coordinator's.

## For the curator

Climb batch 22c landed on 30 October and is pushed. Its four changes are these. The export check is the compiled checker's comparison of an api, a component's interface file, with its component; it now reads every symbolic operator, and it asks a component to declare each member that its api marks `abstract`. The library gained the nine operator headers and twelve declarations that match, and the specification's export rule was revised to say so. The distance stage, the gate's count of the compiled checker's errors on the core of the interpreter's library, now checks fourteen components instead of twelve. `fortress compile` now bounds a type parameter written without a bound by `Any`, as the interpreter does.

The gate was green. The distance is 0, measured for the first time under `fortress compile`'s own setting, and the checker count is 0. Both quick microGPT checks passed 7 of 7 under the interpreter. By your decision on the phases and your framing of 26 October, phase 3 ends here.

Please look first at the one reading this zero rests on. The export check accepts a component's object parameter marked `var` where the api's parameter is plain, but the specification asks for the same header in both files. Under the specification's reading, the `OneShotFlag` component has one error, and the api cannot write `var`, because the parser refuses it. The default keeps the check as it is, with the conflict recorded in the gap ledger as an open question.

That item is one of fourteen that the batch listed for you in PLAN.md, each built at a default or needing none. The largest asks whether a component may return a narrower type than its api says; the default keeps the check's stricter rule, under which compiled calls stay alive. Three of your sentences in POSITIONS, the file of your decisions, are now false: the compiled bound in your decision on implicit bounds, one pair of overloads in your decision on overloading, and the reason in your decision on abstract members. They have no default, and each stands until you reword it.

The coordinator's filing after the landing still owes you entries for the eighteen small choices that the batch's planning record took at their defaults, and for three of the team's test lines that the change to the bound rewrote to keep their checked values. Their default is as landed.

The merged-diff review, which reads the combined change beside the gate, blocked once. The specification's appendix entry for the new export rule named too few of the compiled check's known departures from it. A judge ruled a repair that added three. That took about 445,000 tokens and 24 minutes after the gate was green. The run wrote 4.61 million tokens over 15 agents in 4 hours 37 minutes, against the record's estimate of 4.2 million tokens and 4 hours.
