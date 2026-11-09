<!-- The combined post-batch review of climb batch 29, the batch of coordinator/CLIMB-BATCH-29.md that is phase 4's seventh batch, the literals (six rungs planned and landed, N, C, F, G, S, T; run wf_110667e0-c4a, base b430f9f42800e98b0c9848edd654a78b0808dd15; the Workflow call at 01:23:22.6 UTC on 2026-11-09, its first agent's first record at 01:23:25.661, its commit stage's last commit 7daf51fe8a at 08:49:18 the same day; 21 agent transcripts, each with its meta file; no restart, no resume; two judges on rungs, N and T, both "stands"; the merged-diff review blocked, its judge ruled a repair of the text, and the repair landed; landed on main as F 955cad76df, N 3de571bac7, C 53a6074ed7, S e53480fc6e, G 12292add28, T 4978a9b16e, the gather's key repair 8d93b7d196, the closes a711ca76ba, the gather's record 1d50c6bbbf, the review's corrections 6a654baa13, the review's ruling 13005a5734, the repair 58860ed41c and e82f3ef175, and the gate's tables 7daf51fe8a; pushed by the commit stage to main and two refs), owed at the landing by the coordinator skill's references/batch.md, "The landing", step 3, in the form of reviews/batch-28-review.md, by a review worker reading only, against main at 7daf51fe8a (the coordinator's ec4fab25a2 after it changes only BOOT.md). The measures are batch-measures.py's and transcript-study/skill-load.py's on this run, spend.py's over the live folders, and scratch scripts in /tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/rev29/ (tx.py, runs.py, runs3.py, calls.py, spans29.py, written new; brief.py, parts.py and calls_mod.py, copied from rev28). Tokens are writes only (input plus cache creation, one count per message id). The microGPT walk check is reported by its verdict only, at the curator's ruling of 2026-10-23. Besides reading, this review ran only those scripts, record.py check, ledger.py show, check and landing-check, facts-extract.sh, grep, sed, diff, df and git, which write nothing in the tree. It ran no build, suite, stage or Fortress program. -->

# Climb batch 29: six of six rungs, the literals built on both paths, 24 glue bindings gone, the count and the distance still 0; a run of 7.54M, 11 % over its estimate, after a preparation span of 6.28M seen, two thirds of it his literals design, and a landing of climb batch 28 of 6.14M

## What came up in this run

### 1. The count 0, and the distance 0 with no crash, against climb batch 28's tables

**What the record expected** (`coordinator/CLIMB-BATCH-29.md`, section 6, "The gate, and what it should show"): `testSystem` about 795; the compiler track about 1,485; `testSpecData` 130; the atomic runs unchanged; no ladder move; the count 0, "a site is to be traced to one rung's edit"; the distance 0 over the fourteen with `#crash none`; the 52 demos at the gather; microGPT's quick pair 7 of 7. The gate (`a5cf765e`) ran once, on `1d50c6bbbf`, and was green. The four commits after it touch `explorations/` and two paths no gate stage reads (`changes.tex`, `ranges.tex`; `testSpecData` reads `SpecData/examples/`, `SpecDataJUTest.java:30-32`), so the gate holds for them (the result's `repairReviewRerun`, "rerun": false).

**The count's table** (`climb-batch-29/gate/checker-count.txt` against `climb-batch-28/gate/checker-count.txt`): `diff` prints nothing. 14 api rows, all 0, `#total 0`, `#locations 0`, `#crash none`, the shadow matching; 'COUNT SAME   0, declared none'. **No row is new and no row rose at the gate, so no row needs a rung edit to explain it** (`references/batch.md`, "The checker count and the distance").

**One row rose inside the batch, on rung N's tree, and N's own edit took it back.** N's first count, on `d541ae9682`, read '#total 2', '#locations 1', in `FortressLibrary` at `Library/FortressLibrary.fss:4839`. The cause is N's `RR32` coercion from `NaturalNumeral` (P-76): `10^k` for `k: ZZ32` then ties among `RR32`'s, `NN32`'s and `ZZ32`'s `^`, and the numeral tie rule does not apply, since the exponent's declared types differ. N typed `strToFloat`'s base `ZZ32` (`FortressLibrary.fss:4839-4840`, commit "strToFloat's powers of ten at a ZZ32 base", 02:32:44), and its final count on `e3adeedb64` read '#total 0' (N.worker.1, `PLAN.md:733`). The rungs' own tables: N, C, F and S read 0 and 'DISTANCE SAME   0' on their trees; G and T ran neither stage (`STAGE_BLIND`, by fork 3).

**The distance's table** (`climb-batch-29/gate/distance.txt`): `#total 0`, every `#kind` 0, `#crash none`, the shadow matching; 'DISTANCE SAME   0'. Only `#seconds` and `#machine` differ from climb batch 28's. The per-site list `compile-ladder/gate/distance-sites.tsv`: its header alone.

**The summary's other rows** (`diff` of the two `summary.txt`): `CompilerJUTest` 1,475 to 1,506; a new misc suite, `NumeralFoldJUTest` 9; `testFast` 2,274 to 2,314; `testSystem` 791 to 813, over shards of 203, 203, 201 and 206; `testSpecData` 130; 42 of 42 atomic runs `PASS`; no `COUNT DOWN`, no `SUITE GONE`. The record's estimates were low by the skeptics' tests: 813 against about 795, 1,506 against about 1,485.

**The ladder**: all 85 programs reach pass, all 18 microGPT components compile, `comparison.txt` and `microgpt-comparison.txt` empty (the gate's result).

### 2. The stages' times against climb batch 28's gate

The machine: nproc 4, Intel Xeon @ 2.10GHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1` (`distance.txt`, `#machine`).
- **The count stage: about 125 s** (`tmp/gate-batch-29/checker-count/javac.txt` at 08:18:35 to `checker-count.txt` at 08:20:40), against 99 s. It ran almost alone: the suites, the atomic runs and the ladder had ended at 08:17:47, and the review was reading.
- **The rise is the machine's, not the batch's.** In this run's session the base's code, which is climb batch 28's landed code, timed 108 s to 123 s: the planner's probe 1, 113 s and 108 s; the prototype, 122 s; skeptic C's base, 'real 2m3.233s'; skeptic N's base, 'real 1m55.003s'. The pairs in one session show no slowdown: N, base 115 s against change 123 s (its skeptic); C, base 123 s against head 110 s (its skeptic). Worker C's own 'real 2m12.521s' started at 02:00:10, one second after rung N's `ant testSystem` (02:00:09), so it ran under load. By P-148's smoke test, nothing slowed by several times.
- **The distance stage: 224 s (`FortressLibrary` 141 s) at a start load of 0.07**, against 205 s (135 s) at 3.42. It started at 07:57:24, 22 s before `testFast`, and beside the merged-diff review's first walk probe (08:00:44). So the start load understates the stage's load, as the commit stage noted, and the two figures do not compare (F-240's own caveat; process finding 5).
- **The suites:** `testFast` 8 min 42 s against 8 min 54 s, with 40 more tests; `testSystem` 4 min 20 s against 3 min 29 s, with 22 more; `testSpecData` 1 min 3 s against 48 s.
- **The gate:** 25.2 minutes (07:56:29 to 08:21:42), against 22.6.
- **F-240** now gives this gate's figures (the commit stage, `7daf51fe8a`).

### 3. The cost, by role, against the record and the batches before, and in three spans

**The run wrote 7.54M over 21 transcripts for 21 launches, in 7 h 27 min** (01:23:25 to 08:50:36 UTC; `tx.py`; `batch-measures.py` gives the same 7.54M). No agent was retried or killed. Two agents ran at a time.

By role (writes, then share):
- Rung workers (6): 3.03M, 40.2 %.
- Skeptics (6): 2.43M, 32.2 %.
- The judges of N and T: 314K, 4.2 %.
- The disk check: 63K, 0.8 %.
- Gather: 548K, 7.3 %.
- Merged-diff review: 467K, 6.2 %.
- The review's judge: 171K, 2.3 %; its repair: 244K, 3.2 %.
- Gate: 137K, 1.8 %.
- Commit: 131K, 1.7 %.
- Per landed rung, all roles: 1.26M.

Against the batches before (B26, B27, B28, B29):
- Rung workers: 990K (4); 2.26M (10); 2.77M (7); 3.03M (6).
- Skeptics: 707K (4); 1.33M (9); 2.50M (7); 2.43M (6).
- Judges and repairs on a rung: 0; 231K; 164K; 314K.
- Gather: 333K; 390K; 444K; 548K.
- Review: 204K; 271K; 401K; 467K. Its judge and repair: 0; 368K; 0; 415K.
- Gate: 204K; 213K; 149K; 137K. Commit: 113K; 118K; 158K; 131K.
- Total: 2.55M; 5.17M; 6.65M; 7.54M.
- Rungs landed, agents: 4, 12; 8 of 10, 30 and one empty; 7 of 7, 20; 6 of 6, 21.
- Span: 2 h 27; 5 h 22; 6 h 16; 7 h 27.
- Per landed rung: 0.64M; 0.65M; 0.95M; 1.26M.

**Against the record:** "About 6.8M tokens written, from 5.8M to 8.0M; about 6 hours 30 minutes at two agents at a time" (`CLIMB-BATCH-29.md`, section 2, "Cost").
- **7.54M, 11 % over the estimate, inside its range.**
- The workers wrote 3.03M against 3.0M: N 648K against 0.75M, C 575K against 0.6M, F 658K against 0.5M, G 362K against 0.4M, T 438K against 0.4M, S 354K against 0.3M.
- The skeptics wrote 2.43M against 2.3M: N 507K (0.5M), C 512K (0.45M), F 441K (0.4M), G 381K (0.35M), T 331K (0.3M), S 259K (0.28M); mean 405K, against 357K at climb batch 28.
- The fixed roles wrote 1.35M against 1.3M: the disk check 63K (0.06M), the gather 548K (0.5M), the review 467K (0.4M), the gate 137K (0.18M), the commit 131K (0.16M).
- **The judges and the repair wrote 729K against 0.3M**, the most of the overrun: two rung judges and a judge and a repair on the merged tree, where the record held one judge and one repair round.
- **The time:** 7 h 27 min against about 6 h 30 min. The workers ran 403 minutes in all against the record's 435: N 83.9 (110), C 68.3 (90), F 97.1 (75), G 37.8 (60), T 36.7 (60), S 79.4 (40). The judges and the merged-tree ruling and repair ran 32 minutes, one after the other (06:40 to 06:51, 08:25 to 08:44).

**The order of the run.** The disk check at 01:23:25. N and C at 01:23; F at 02:31 when C returned; G at 02:47 (N); T at 03:25 (G); S at 04:02 (T). The skeptics: C's at 04:09 (F returned), N's 05:06, G's 05:21, T's 05:54, F's 06:05, S's 06:20. N's and T's skeptics returned "contested"; their judges ran after the last skeptic, 06:40 to 06:45 and 06:44 to 06:51. The gather at 06:51:39, the gate and the review at 07:56:29, the review's judge at 08:25:32, the repair at 08:32:15, the commit at 08:44:54.

**The cost in three spans, each on its own** (the `coordinator` skill's `references/batch.md`, "The landing", step 3). Each span is `spend.py <start>` less `spend.py <end>`, over the same folders: the session's agents (`…/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/`), its three workflow folders (`wf_4690d700-6c9`, `wf_110667e0-c4a`, `wf_e14c1b80-a93`), the project folder of headless sessions (`/root/.claude/projects/-home-user-fortress/`) and the landing worktree's (`-home-user-fortress-landing-28`). `find` shows no other folder with a transcript changed since 08:46 on 11-08. The coordinating session's own transcript is left out, as `spend.py` does. A transcript counts in the span where it last changed.

`spend.py` printed 20.33M from 1794127584 (08:46:24 on 11-08), 14.18M from 1794138988 (11:56:28), 7.90M from 1794187405.661 (01:23:25.661 on 11-09, the first agent's first record; the Workflow call was at 01:23:22.6, and no transcript last changed between the two) and 0.49M from 1794214158 (08:49:18). The last holds the run's commit agent (131K, last changed 08:50:36) and this review's transcript, both after the run's end.

- **Span 1, the landing work of climb batch 28:** from `f56d6516c4` (08:46:24 on 11-08) to `48d7f1fb86` (11:56:28). The record-landing run `wf_4690d700-6c9` ended earlier: its journal last changed at 11:50:41, and its last agent, the revival-page stage, ended at 11:50:40 with 'exit': '2', "update.py stops: FACTS F-299, its glue classes: expected one match ..., found 0". So the span ends at the commit. **6.14M over 34 transcripts.**
- **Span 2, the preparation of climb batch 29:** from 11:56:28 on 11-08 to 01:23:25.661 on 11-09. **6.28M over 22 transcripts seen.**
- **Span 3, the run:** from 01:23:25.661 to `7daf51fe8a` (08:49:18). **7.41M over 20 transcripts**, the run's 21 less its commit agent.

- **Span 1, 6.14M:**
  - The record-landing run, 25 agents, 3.62M: sort 394K, check 369K, page 301K, admission 256K, judge 241K, judge 171K, quiz author 171K, skill cold read 160K, cold read 157K, preserve 132K, quiz readers 115K and 112K, cold read 98K, quiz grades 94K and 92K, and ten Sonnet agents of 64K to 84K each. Its four headless skill-writer sessions: two in `/home/user/fortress-landing-28`, 09:41 to 10:21, 731K; two on `main`, 10:41 to 11:05 (75K) and 11:22 to 11:36 (152K). Together 4.58M, against climb batch 27's 4.33M.
  - Climb batch 28's post-batch review, 549K.
  - The review of the foundations of parallelism, at his question of 10:41 (`1cf2375e09`): the Opus review 588K, the Fable brief writer 131K, the Sonnet scout 135K. Together 854K.
  - Climb batch 28's commit agent, 158K, which last changed at 08:47:43, 79 s after the span's start, so by the rule it counts here.
- **Span 2, 6.28M seen.** Each of its commits is the coordinator's or its agents', not the run's.
  - **Climb batch 28's landing tail, 144K:** the agent that finished the revival page after the record-landing's page stage stopped (11:54 to 11:57; its commit `48d7f1fb86` is the span's start).
  - **The literals asks of the morning, recorded, 445K:** P-171 (195K, `8f0bfb2f68`, 12:26 to 12:34) and P-172 (250K, `663b5f95ca`, 12:49 to 13:00). These are his literals work too, before the design session proper.
  - **His literals design session, 13:00 to 00:19, 3.61M over 15 agents** (Opus 2.90M, Fable 290K, Sonnet 424K):
    - the one-picture review 351K (`855d8c1c9b`), with the scout that recovered his words 116K;
    - the scout of the page's changes 39 to 45, 72K;
    - rows 943 to 945 and F-326, 131K (`9aa65eed0`, `2dac82be0`);
    - the de-mixing skill writer, headless `6e607825`, 113K (`6ec749a8e`, `71272d748`, `6d7a9b1ad`, `624b7a79e`), its cold read 64K and the page worker 271K;
    - the fork probe, 462K (`7314879755`, row 946);
    - the scout of the frozen specification, 75K; row 362's note, 41K (`7b372460f`);
    - the prototype of reading B, 703K (`ecf918d41`);
    - the scout of the team's words on the two names, 161K;
    - the Fable judgement of the design, 290K (`b0e6b89700`);
    - the record writer of P-173, P-174 and P-175, 455K (`69427e9422`, `1001bff8a3`);
    - the record writer of the rows, the PLAN line and the evidence, 305K (`f495e545b0` to `40680b856d`).
  - **The row writer for rows 954 and 955, 97K** (`2f4b3d7d01`, 00:51 to 00:56). Its rows come from the planner's probe 3, so it can also count with the preparation; the brief lists it with the design records.
  - **Climb batch 29's own preparation, 1.99M:** the planner 1.08M (`65c47187c6`, `56814c92a0`, `127f6509cf`), the Fable review 431K (`9900408dc9`, `fefd1ed44c`), the manifest generator 475K (`75451ee35c`, `75cfc26839`; the coordinator's `db667226f3`).
  - **Fable's share of span 2, seen: 1.76M.** The judgement 290K and the batch review 431K, and the coordinating session's own Fable writes, 1.04M (below). So the design work's Fable writes are 1.33M, the preparation's 431K.
- **Span 3, 7.41M:** the run's 20 transcripts that last changed by 08:49:18. No agent of the coordinator's ran beside the run.

So the landing of climb batch 28 wrote less than its run, and the preparation span wrote about as much as the landing, but less than a third of it was the batch's own preparation. The spans of climb batch 28's review were 6.41M, 3.11M seen and 8.01M.

**What the count could and could not see.**
- It saw every transcript of the live folders since 08:46 on 11-08, by its mtime. The container has run since the rebuild at 23:09 on 11-07, so no backup copy was needed.
- **The coordinating session's own writes**, which `spend.py` leaves out by design, from its transcript (`fe616d40-….jsonl`), by each message's time and model: span 1, 290K (Opus); span 2, 1.44M: Opus 171K from 11:57 to 13:01, Fable 1.04M from 13:23:00 to 23:33:50, Opus 236K from 23:35:46 to 01:23:22; span 3, 24K (the check-ins).
- Of the session's 1.04M on Fable, 544K are two writes of its whole context: 140K at the switch to Fable at 13:23:00, and 404K at 19:25:29, after a pause of 3 h 29 min in which the prompt cache lapsed.
- `spend.py` shows no model; the transcripts do. Every agent of the run ran on Opus (each meta file's "model": "opus").
- A transcript counts where it last changed, so three cross a boundary: climb batch 28's commit agent (span 1), the agent that made span 1's last commit (span 2), and the run's commit agent (after span 3).
- Reads from the cache are not counted.

**The briefing's use and cost:**
- **15 of 15 briefed agents read their briefing, 100 %: the six workers, the six skeptics, the judges of N and T, and the repair on the merged tree. None read it in its first turn.**
  - The first briefing call came at calls 4 to 20 and messages 4 to 18, 15 to 105 s after each agent's start (`brief.py`).
  - Workers: N call 20, 105 s; C 17, 92 s; S 18, 82 s; G 16, 65 s; T 12, 54 s; F 6, 37 s.
  - Skeptics: N 18, 86 s; C 14, 67 s; T 12, 47 s; F 6, 42 s; G 6, 35 s; S 6, 31 s. Judges: N 4, 24 s; T 4, 15 s. The repair: 11, 77 s.
  - The disk check, the gather, the review, its judge, the gate and the commit stage have no briefing by design.
- **Each agent read every part** (`parts.py`: every briefing ends 'end of part N of N, the last'). Rungs N and C saved part 1 to a file and read it. Skeptic N's, judge N's and the repair's briefings ended 'Exit code 1' with "1 not found": the key `code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#value object IntLiteral extends Number` names a line that rung N removed. Skeptic N then read the keys three at a time (calls 20 to 24) and the base's line from `fortress-base29`; the repair met two more such keys (process finding 3).
- **Its results came to about 0.27M tokens, 3.6 % of writes**, at 0.40 tokens a character plus 110 a call: workers 147K (T 38.5K, F 26.4K, N 26.3K, C 21.2K, G 21.0K, S 13.7K); skeptics about 75K (T 22.2K, N about 20K with its split calls, C 13.2K, G 8.0K, S 6.5K, F 4.4K); judges 31K; the repair 16.5K.
- Against the batches before (briefed, read, at calls, seconds, share):
  - B25: 16, 16, 3 to 18, 15 to 132, 4.4 %.
  - B26: 8, 8, 5 to 13, 21 to 89, 5.2 %.
  - B27: 15 of 19 launched, 15, 4 to 16, 16 to 78, 6.2 %.
  - B28: 15, 15, 3 to 21, 14 to 95, 3.1 %.
  - B29: 15, 15, 4 to 20, 15 to 105, about 3.6 %.

**Other measures.**
- **First calls:** 1.12M (14.9 %), 10 cold (`batch-measures.py`): the disk check, rung N, skeptic C (the first skeptic), judge N, the gather, the gate, the review, its judge, the repair and the commit. At climb batch 28, 0.98M and 8 cold.
- **Cache refills: 0** (climb batch 28: one, 204K).
- **Refusal cycles: 2 rungs, 314K (4.2 %):** N's skeptic contested its own defect fix `953d050966`, and T's skeptic its fix `1184add1d9`; both judges ruled "stands".
- **Rulings and repairs on the merged tree: 415K (5.5 %).**
- **The skill's load** (`skill-load.py`, 21 agents): 969K, 12.9 %. Load text 170K (2.3 %) and 799K over 242 part reads (10.6 %), against 16.5 % at climb batch 28. 20 agents loaded `fortress-repo`; the disk check did not.
  - `revival-changes.md` was read 28 times (197K), once by the gate, which `SKILL.md` exempts; the commit stage did not read it (climb batch 28's process finding 8, half held).
  - `compiler.md` is now 29,983 characters, under the tool's 30,000 (climb batch 28's process finding 7, taken up).
  - `sources.md`, which `SKILL.md` says not to load for a task, was read in 10 calls by rungs G and S, skeptics G, S and F and the review's judge (6K).
- **Builds** (`batch-measures.py`; `runs3.py`): one per code state. Rung N built seven times, each after an edit of code (01:52 to 02:14); C three; F twice and the library order twice, the second time at 03:27:50 because its suites had left the library jars incomplete (four of five in `bytecode_cache`, call 218); G, S one each; T none. Skeptics N and C built twice and F once, each after a fix of its own. The gather built twice, on F with N (07:00:17, for `ZZOneGetterWalk`) and on the merged tree (07:11:58). The gate's build took 2 s with the caches kept.
- **Rows:** 13 opened (956 to 968; 968 by the review). 21 closed in `a711ca76ba`: 862, 954, 955, 338 (F); 943, 944, 454, 443, 484, 361, 578 (N); 79, 946, 486, 325 (C); 945 (S); 364, 432, 721, 722, 20 (G). Two of them beyond the plan: 338 (gather.3) and 20 (gather.4). Rewritten: 318, 387, 360, 362, 506, 675, 390, 446, 328, and G's 510, 717, 774, 824, 846, 49, 96, 142, 272, 471, 527, 705, 156, 371 and 372. Noted: 923, 961, 962.
  - `ledger.py landing-check b430f9f42800e98b0c9848edd654a78b0808dd15`: 'b430f9f42..HEAD: no finding'.
  - `ledger.py check`: 'fortress-gap-ledger.md, 967 rows, 0 fail the template'.
  - `record.py check --base b430f9f428`: '0 failures', FACTS 278 entries, 237 of them over 600 characters (228 at climb batch 28's review).
- **The disk:** 21,359,124 KB available at the launch (the disk check, `df -P`), against the script's floor of 13G for six rungs; 15G at its lowest, at the gather (its `df -h`); 21,294,388 KB at this review, after the commit stage removed the six worktrees.

Per agent, in order of start (UTC; ids are the transcripts' `agent-<id>.jsonl`; messages are distinct message ids):
- Disk `a7746a53`: 63K; first call 61K, cold; 2 messages; 0.1 min; 01:23.
- Rung N `ab3f4567`: 648K; 79K, cold; 255; 83.9; 01:23 to 02:47.
- Rung C `a1046f42`: 575K; 25K; 232; 68.3; 01:23 to 02:31.
- Rung F `ac1fef4d`: 658K; 25K; 285; 97.1; 02:31 to 04:09.
- Rung G `a536a81b`: 362K; 23K; 158; 37.8; 02:47 to 03:25.
- Rung T `a06227b0`: 438K; 23K; 160; 36.7; 03:25 to 04:02.
- Rung S `a5acd0d6`: 354K; 23K; 204; 79.4; 04:02 to 05:21.
- Skeptic C `ae8fb9a7`: 512K; 86K, cold; 186; 57.5; 04:09 to 05:06.
- Skeptic N `aac494c7`: 507K; 37K; 194; 59.0; 05:06 to 06:05.
- Skeptic G `ae0b8eff`: 381K; 31K; 164; 32.5; 05:21 to 05:54.
- Skeptic T `a0d229ce`: 331K; 28K; 118; 26.7; 05:54 to 06:20.
- Skeptic F `a7c1ac35`: 441K; 33K; 149; 38.0; 06:05 to 06:43.
- Skeptic S `aecde8fd`: 259K; 28K; 96; 19.2; 06:20 to 06:40.
- Judge N `aa49dd33`: 161K; 74K, cold; 32; 5.1; 06:40 to 06:45.
- Judge T `aedde88c`: 153K; 20K; 44; 7.4; 06:44 to 06:51.
- Gather `a0864a76`: 548K; 116K, cold; 268; 64.8; 06:51 to 07:56.
- Gate `a5cf765e`: 137K; 70K, cold; 45; 25.2; 07:56 to 08:21.
- Review `ae464703`: 467K; 102K, cold; 181; 29.0; 07:56 to 08:25.
- The review's judge `a7bc1e00`: 171K; 83K, cold; 44; 6.7; 08:25 to 08:32.
- Repair `a7d73eb8`: 244K; 73K, cold; 79; 12.6; 08:32 to 08:44.
- Commit `a1b2b240`: 131K; 80K, cold; 36; 5.7; 08:44 to 08:50.

### 4. The tail

- **The judge of N** (161K, 5.1 minutes): "stands" on skeptic N's defect fix `953d050966`, a numeral at a declared return type converted there. Its ground: fork N7 names the declared return type among walk's places; `Specification/basic/conversions-coercions.tex:118-127` makes "body expressions of functionals ... where the return types are declared" a coercion context; walk's binding, parameter and assignment already refuse what does not convert. No revert.
- **The judge of T** (153K, 7.4 minutes): "stands" on skeptic T's fix `1184add1d9`, which names the library's `=/=` at a numeral as a departure of the library, with row 966 and `XXXNotEqualNumeral`. Its ground: `opr-overview.tex:272-273`, `Fortress.NegatedOperators.tex:46-47`, and row 807 as the precedent. T.judge.2: the row's second way, `=/=` on each number type, would not be chosen while `=/=` over `Any` stands.
- **The gather** (548K, 64.8 minutes, 06:51:39 to 07:56:26):
  - It applied F, N, C, S, G, T with no conflict, by `landsOnlyWith` and the shared files' lines; N and S, ordered both ways by two files, kept the manifest's order (gather.1).
  - It re-anchored N's citations in `Functionals.scala` and `Evaluator.java` and G's in `EvaluatorBase.java`, and left row 591 pinned (gather.6).
  - On the merged tree: the walk tests 'OK (58 tests)' and 'OK (3 tests)'; `NumeralFoldJUTest` 9, 0 failures; 73 compiled cases with one failure, rung C's `XXXFloatLiteralValuePrint`, whose run now dies in the component class's initializer before `run()` prints; it repaired the key to `run_out_does_not_contain=REACHED` (`8d93b7d196`); the demos 'demos: 52 run, 52 reached their end'; the specification built once, 715 pages, 0 warnings.
  - It promoted `XXXZZOneGetterWalk` on the tree of F and N, which N's upheld fix repairs.
  - It opened rows 956 to 967, closed 21, added F-339 to F-346, rewrote 16 FACTS entries, revised Appendix I's natives effect to 374 of 402 (`changes.tex:4655`, `:4676-4679`, `:4703-4704`) and three other Effects, and routed 36 items and its own six into PLAN (`PLAN.md:140`, `:711-757`).
  - It found T's text and N's walk apart on a numeral that rounds to an infinity, kept the text, and filed row 967 with a gated `XXX` test (gather.2).
- **The merged-diff review** (467K, 29.0 minutes, beside the gate): **not approved**, two blocking findings, both in rung T's Appendix I text: walk's halves of row 968 (a negative constant at a program's own type) and of row 962 (a size of 2^31 or more read as a value) were missing. Its corrections in `6a654baa13`: row 968 added; rows 961 and 962 noted; row 328 rewritten; 18 FACTS entries made true of the merged tree; `RECORD.md` re-anchored; `JUDGE.md`'s placeholder numbered; PLAN's item 75 and two routed test items (review-routed.1 and .2). Its walk probes used a private caches folder; its two compiled probes wrote into the main tree's caches at 08:15 and 08:16, while the gate ran there (process finding 5).
- **The review's judge** (171K, 6.7 minutes): "repair", text only; it found a third passage that claimed `ZZ32` on both paths, `changes.tex:2237-2238`. Its ruling is `JUDGE-review.md` (`13005a5734`).
- **The repair** (244K, 12.6 minutes): the two `.tex` files in `58860ed41c`, its record in `e82f3ef175`; the specification built once, 715 pages, 0 warnings; one compiled probe for its new clause ('bare  -3', 'bare2  -3'). It noted that row 893's citation `changes.tex:4105-4110` had moved before the repair (for the routing).
- **The gate** (137K, 25.2 minutes): green, as section 1 gives.
- **The commit** (131K, 5.7 minutes):
  - The microGPT walk check, then `7daf51fe8a`: the tables, the per-site list, F-53's title, F-240's figures by `record.py set` ('0 failures').
  - It built the specification's PDF again, since the review's repair had changed `Specification/` after the gather's build (process finding 4).
  - It checked the 14 commits since the base: each ends with the two footer lines, and each of the 9 outside `explorations/` and `.claude/` carries a `historical:` line.
  - It pushed `main`, `claude/worker-brief-fable-vnnuv8` and `blinded-fable` on its first try; it removed the six worktrees without `--force` and deleted their local `wip/` branches.

### 5. The microGPT walk check

Its verdict lines (`climb-batch-29/gate/summary.txt`, `# microgpt-walk`): "MicroGptAplQuick: VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS; rc=0" and "MicroGptFlatQuick: VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS; rc=0", started at 08:45:17 on `e82f3ef175`. So 7 of 7 on both programs. This is the first landing in which walk converts every numeral of the model where it stands, and folds the numerals alone. By the ruling of 2026-10-23 the seconds are not compared. No model line changed (`git diff --stat b430f9f428 7daf51fe8a -- explorations/run-c4/src explorations/apl/mg` prints nothing).

### 6. The natives and the code generator after phase 4's seventh batch

- **The bindings.** By the gather's count, 374 of the one library's 402 live bindings name a helper, and 28, `Reflect`'s, name a glue class (`RECORD.md`, "The count of the bindings"). N removed `IntLiteral`'s 21 and `FloatLiteral`'s 3 glue strings, and added two helpers, `numeralRR64` over `simpleDoubleArith.numeralToDouble` (`Library/FortressLibrary.fss:669-670`) and `numeralRR32` over `numeralToFloat` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:209-210`). F-32 and F-299 carry the counts; PLAN still reads 372 of 424 (for the routing).
- **The numeral types are library objects with fields**, `value object NaturalNumeral(digits, radix, digitValue)` and `RadixPointNumeral(digits, fractionDigits, radix, digitValue)` under `trait Numeral` (`Library/FortressLibrary.fsi:454-494`), beside `Ratio`, with no binding. Walk's glue classes `interpreter/glue/prim/IntLiteral.java` and `FloatLiteral.java` stay, unused (fork N11).
- **Walk now runs the fold** (`compiler/phases/PhaseOrder.java:130`), and converts a numeral at a chosen parameter, a typed binding, a field and a declared return type, by the place type's own coercion from the numeral type, one value for each site and type (`interpreter/evaluator/values/Numerals.java:36-41`, `:55-64`; `Coercions.java:96-118`).
- **The code generator** sets a static field for each numeral site at a program's type in the component class's static initializer (`compiler/codegen/CodeGen.java:7189-7234`), rounds a typed-place constant once (`roundToDouble` and `roundToFloat`, `:4251`), and converts a size read as a value to `ZZ32` (`:6460-6483`). F-34's 38 refusals in 10 kinds were measured on climb batch 26's rung L tree; its count on today's code is still not measured.

### 7. The two paths on a literal, against his aim of 15:0x

His words: "We must fix it once and for all, even before switchover, and bring the two implementations to do the same thing."

**Where the two paths now agree**, each with a test on each path: a numeral where nothing fixes a type takes its default (`x = 3` a `ZZ32`, `x SEQV z` true; `bigN = 3000000000` a `ZZ64`; `7` at `Object` a `ZZ32`); a numeral converts at a typed place of an integer type or `RR64`, with one rounding into a float; numerals alone fold exactly (`2147483647 + 1` a `ZZ64`, `-2147483648` a `ZZ32`, `0.1 + 0.2 = 0.3`, `3 CHOOSE 5` 0); a type parameter that several numerals fix takes the narrowest default; `Cell(3)` is a `Cell[\ZZ32\]`; two string literals of one text are one object, and a concatenation of literals folds; `f(3)` at `Index` takes the `ZZ32` against the one library (`changes.tex:4444-4448`).

**Where they still answer differently, planned:**
1. **The numeral types' names.** The compiled path gives a numeral the prelude's `IntLiteral` and `FloatLiteral`; walk gives the one library's `NaturalNumeral` and `RadixPointNumeral`. So a program's coercion from a numeral is spelled differently on each path, and no such program runs on both. Forks N2 and 6 (P-37); it ends with the names batch. No row.
2. **Fork F5.** On the compiled path a program's coercion receives the prelude's numeral value without its four numbers; walk passes the numeral object with them. No row; no PLAN line yet.
3. **Fork F6.** The pairs' conversion of a numeral is not folded at a compiled call. The answers agree, since the prelude declares no pair at a number type. No row; no PLAN line yet.
4. **Fork F7.** No `QQ` place on the compiled path, and the compiled `SEQV` of two numeral values is not by their reduced value. No row; no PLAN line yet.
5. **Static on one path, at run time on the other** (P-12; fork N7): an integer numeral outside its type's range, and a numeral at a program's type with no coercion from the numeral type, are static errors compiled and refused when the place runs under walk. Walk has no written-only rule, so by fork N7's reading it binds `t: NaturalNumeral = 3` where the checker refuses the type (by reading, not run). The Effect names the first (`changes.tex:5164-5167`).
6. **A program's coercion that raises** stops the compiled program before `run()` (fork F5's default), and raises under walk when the place is first evaluated (fork N7). Planned by the two forks, but the record does not name the two answers as a difference, and no row holds it.

**Where they still answer differently, not planned, each with its row:**
7. **Row 967:** a float numeral that rounds to an infinity is a static error compiled (`CoercionOracle.scala:476-483`) and `Infinity` under walk.
8. **Row 963:** `typecase 7 of ZZ32 => ...` is refused compiled as unreachable; walk takes the arm.
9. **Row 958:** `2.5 + a` for an `RR32` `a` runs `RR64`'s `+` under walk; by the Effect the compiled path runs `RR32`'s.
10. **Row 966:** `u =/= 0` for a zero `NN32` is `true` under walk and `false` compiled. After the switch-over the compiled path reads the same `=/=` over `Any`, so both would answer `true` unless the library is repaired first.
11. **Row 962 (CONTESTED):** a size of 2^31 or more read as a value raises `java.lang.Error` compiled, which no `catch` sees, and is a `ZZ64` under walk; P-173 makes it a `ZZ32` on both.
12. **Rows 961 and 968:** a negative constant at a program's own type reaches the coercion with its sign on both paths, compiled as the `IntLiteral` -3 and under walk as `NaturalNumeral(1, 10, -3)`; both against the text (`literals.tex:215-218`) and fork C6 (findings, 1).
13. **Row 957:** at a program's own generic type the compiled path calls the coercion at each evaluation; walk keeps one value for each site and type (`Numerals.java:55-64`, by reading).
14. **Row 362:** inside a program's `coerce(x: FloatLiteral)`, the compiled `"" x` throws `NullPointerException`; walk prints the numeral object as written (fork N10).
15. **Row 446:** `ee(5)` with `ee[\nat n\](x: ZZ32): ZZ32 = n` beside `ee(x: Any)` dies compiled with `NumberFormatException` and under walk with 'undefined variable [n]'. The compiled path answered 2 at the base (C.skeptic.1).

**Limits of the prelude, which retire with it (P-38), not F5 to F7:** row 965 (a `Character` value before `||` refused compiled) and row 328 (two `IntLiteral` parameters compared at `ZZ64`).

**One against the text on both paths alike, not a difference:** rows 956 and 959. Row 960 is walk's alone today, since the compiled path has no four numbers yet. And one difference after the switch-over, with no row: `10^k` for `k: ZZ32`, which the checker then refuses against the one library and walk runs (N.worker.1).

So the landing meets his aim where both paths can show it today, as the Fable review read it (`climb-batch-29-review.md`, section 1, F5 to F7). But nine differences that the record did not plan stand, each with its row: 957, 958, 961 and 968, 962, 963, 966, 967, 362, 446. Six of them were found by the skeptics, the gather or the review inside the run (finding 4).

### 8. The points the coordinator asked for

**1. The share of briefed agents that read the briefing: 15 of 15**, none in its first turn, every part read (section 3).

**2. Re-measuring: one stage built the specification again on a code state that another stage had built; the rest stayed one run per code state, beyond the manual's one exception.**
- **The commit stage built the specification at 08:47 on the text that the repair had built at 08:40** (`58860ed41c`; `e82f3ef175` changes only `explorations/`). Both PDFs are 2,479,317 bytes ('Output written on fortress.pdf (715 pages, 2479317 bytes).'). The repair's step 5 ended with `git clean -fXq -- Specification` and kept no copy, so the commit stage had none to copy (process finding 4).
- **The base's count stage ran twice in the run**, by skeptic C (04:11) and skeptic N (05:14), each by the manual's one exception ("Skeptic", `climb-batch-workflow.md`). Both workers cited the prototype's 122 s and did not run the base again, as fork 3 asked.
- **Suites on superseded states inside one agent, not repeats:** rung N ran `ant testSystem` at 02:00 and again at 02:17, after builds at 02:09 to 02:14; skeptic N ran it at 05:44 and 05:54, and skeptic C ran `ant testQuick` at 04:37 and 04:48, each after a fix. Each run was a new code state, but the first of each pair was superseded within minutes (process finding 8).
- The gather ran the batch's walk tests and compiled tests on `4978a9b16e`; the gate ran the suites that hold them on the same code (`1d50c6bbbf` differs only in `explorations/`). Both by the manual's design. The gate's build took 2 s: a no-op.
- Not repeats: rungs F and S ran the 52 demos on their trees, as the skill's `tests-running.md`, "Outside the gate", asks for a change of walk or of a shared phase; N and G did not, by their sections ("the 52 demos are the gather's", `CLIMB-BATCH-29.md:164`); the gather ran them on the merged tree. N, C, F and S each ran their own ladder subset, as the script's worker step 10 asks.

**3. The checker count's new or risen rows: none at the gate.** One rise inside the batch, on N's tree, is tied to N's edit (section 1).

**4. What the cost count could and could not see:** section 3. The coordinating session's own writes are given apart, by model.

**5. The coordinator's commits since the base:** none until `ec4fab25a2` (BOOT.md, 08:54:21), after the push. No `.claude/` path changed since the base (`git diff --name-only b430f9f428 7daf51fe8a -- .claude/` prints nothing). No agent of the coordinator's ran beside the run.

**6. The relayed request: not met.** Each agent's first message is framed "[Workflow harness — computed task]", and no agent received a relayed message of his (each transcript holds two plain user texts: the task and the skill's load).

**7. The clone: not shallow** (`git rev-parse --is-shallow-repository`: false; `a874948ac` resolves). No agent met the team's history missing.

## Part 1. Conformance

### Method

As in `reviews/batch-28-review.md`. For each rung I read its commit on `main` and its diff against the base, its section of `CLIMB-BATCH-29.md` (sections 1 and 4) and its forks (section 3), the Fable review of the record, the gather's `RECORD.md`, the two judges' rulings, the review's ruling and repair, the run's results, and the code and the specification on `main`. Three standards, kept apart:
- the specification;
- the library's own way (P-27), and for compiler and interpreter code the team's code beside it;
- the decisions on record, by `facts-extract.sh`: P-173, P-174, P-76, P-172, P-171, P-165, P-168 and P-40, with P-12, P-37, P-38, P-49, P-58, P-96, P-148, P-167 and P-169. With them, his words of 22:3x and 23:3x on 2026-11-08 (`HELD.md`, "Held in chat (2026-11-08)"), the six repairs of `reviews/literal-design-judgement-2026-11-08.md` that he took, and the forks' defaults as the record and the Fable review state them.

Where the batch's record and the tree disagree, the tree rules. I ran nothing of the tree; what is "by reading" is marked.

### The verdicts

- **Rung F, the fold (P-173, P-174, P-172): in the spirit,** with splits 3 and 13.
- **Rung N, the numeral types and walk's numerals (P-174, P-76, P-172, P-173): in the spirit,** with splits 2, 5, 6 and 14.
- **Rung C, the checker's numerals (P-173, P-174, P-40): in the spirit,** with splits 1, 4, 7 and 10.
- **Rung S, the strings (P-171): in the letter.** Its question, two character literals (S.worker.1), stands.
- **Rung G, walk's generics and messages at language types (row 364's way A): in the spirit,** with splits 11 and 12.
- **Rung T, the specification (P-173, P-174, P-172, P-171, P-96): in the spirit,** with splits 8 and 9.
- **Rulings:** the judges of N and T, "stands" on two contested fixes; the review's judge, "repair", text only, and the repair landed. Every other skeptic approved, with corrections.

### Where the text, the brief or the principles split

**1. A negative constant at a program's own type: fork C6 not built, and repair 3 broken under walk (rungs C, F and N; rows 961, 968).** C6's default makes `-3` at a program's type the prefix `-` on the coercion's result for the natural numeral, "so the program's coercion sees the four numbers of a written numeral only (the judgement's repair 3, which he took)" (`CLIMB-BATCH-29.md:369`). C could not build it: the fold makes `-3` one negative node and keeps no reference to the prefix operator (`IntegerLiteralFoldingVisitor.java:148-153`), and the fold is F's. Compiled, the prelude's `IntLiteral` carries the sign until the switch-over (row 961). Under walk, F put the fold into walk's order (`PhaseOrder.java:130`), and N's site hands the coercion `NaturalNumeral(1, 10, -3)` (`Numerals.java:160-179`; the review's probe: 't 1 -3', and 'w 7' for its `asString`; row 968). So under walk a program's coercion now sees four numbers that no program wrote. C.skeptic.3 with review.1, item 75 (`PLAN.md:140`); review-routed.1 (`:756`). Default: as landed, both halves named in the Effect (`changes.tex:5191-5207`). Findings, 1.

**2. Walk converts by the library's coercion, not by walk's Java (rung N; fork N7).** N7 named a Java conversion into the eight number types; N calls the place type's own coercion from the numeral type with the numeral object (`Coercions.java:96-118`). The value is the same by construction, and both paths will then run one library declaration. N.worker.2, `PLAN.md:734`. Default: as landed. The library's way: yes.

**3. "Once per class, when the class loads" (rung F; fork F5; row 957).** F reads the class as the component's: its static initializer sets every site's field, wherever the site is (`CodeGen.java:7189-7234`), and a coercion that raises stops the program before `run()`. At a program's own generic type F hoists nothing, so the coercion runs at each evaluation (row 957). F.worker.1 and F.skeptic.1, `PLAN.md:728`. Default: as landed.

**4. The written-only rule, broader than P-174's words (rung C; fork C2).** P-174: "A numeral type is written only as a parameter type, of a coercion or an operator". C allows a numeral type as any parameter's whole type (`TypeWellFormedChecker.scala:48-73`), and the skeptic's respelling of two library tests rests on it (`library_tests/IntLiteralArithRung7.fss:35-36`, `IntLiteralRung6.fss:41-42`). C.skeptic.5, `PLAN.md:741`. Default: as landed.

**5. P-168's one exception, built across both numeral types (rung N; fork N9).** P-168: "two values of a numeral type inside a coercion's body are strictly equivalent when their reduced values are equal". N applies it across `NaturalNumeral` and `RadixPointNumeral`, so `2` and `2.0` there are `SEQV` (`FOrdinaryObject.java:48-49`), where P-168's first rule keeps values of different types apart. N.skeptic.1, `PLAN.md:736`. Default: as landed.

**6. A numeral that rounds to an infinity (rungs N, C and T; fork C3; row 967).** T's text makes it a static error (`literals.tex:189-190`), and C's checker refuses it, by fork C3's default (P-173's "a numeral outside the type's range", read as one rounding past the largest value too). N's walk converts it to `Infinity` (`simpleDoubleArith.java:268-290`). N.skeptic.2 and gather.2, `PLAN.md:737`. Default: the text stands; walk departs, with `XXXNumeralRoundsToInfinityWalk`.

**7. A size used as a value (rung C; P-173, P-40; row 962).** Compiled, a `nat` or `int` size of 2^31 or more read as a value raises `java.lang.Error` 'Not in range for ZZ32'; walk makes it a `ZZ64` (F-140). Three passages of the text claimed `ZZ32` on both; the repair qualifies them (`58860ed41c`). Row 962 is `CONTESTED`. C.worker.2, C.skeptic.2, review.2, `PLAN.md:739`. No default on record.

**8. `Literal[\v\]`, by T's text and by P-174's words (rung T).** T writes that the explicit-radix types fold into the radix, "and `Literal` into the digit count, which tells whether a numeral has leading zeros" (`literals.tex:147-150`). P-174 says "the Draft's explicit-radix variants and `Literal[\v\]` fold into the radix field", from the judgement's section 3 (`literal-design-judgement-2026-11-08.md:27`). The Working Draft gives `Literal[\v\]` "for a numeral without leading zeros" (`literals.tex:144`). gather.5, `PLAN.md:754`. Default: T's text, as landed. Findings, 2.

**9. The library's `=/=` at a numeral (rung T; row 966).** `opr =/=(a:Any, b:Any) = NOT (a=b)` (`Library/FortressLibrary.fss:98`) takes a numeral at its default, so `u =/= 0` is `true` for a zero `NN32`, `NN64` or `RR32` under walk, against `opr-overview.tex:272-273`. The prelude declares `=/=` per integer type, so compiled it is `false`. T.worker.1, T.skeptic.1, T.judge.2, `PLAN.md:748`. Default: as landed, a departure of the library, with its `XXX` test.

**10. The checker's default at a `typecase`'s selector (rung C; row 963).** C does not apply the default at the selector (`Misc.scala:660`), since it moves `XXX5r.test`'s pinned span and makes `XXXPatternMatchingc.test` reach row 964's crash in the code generator. So `typecase 7 of ZZ32` is refused as unreachable, where walk takes the arm. C.skeptic.4, `PLAN.md:740`. Default: as landed.

**11. Rung G's readings of fork G3 and P-167.** "A type a program names, as a `typecase` arm `Int` or `BigNum`, keeps its name" is built as identity, not text, so a message about a written `Int` prints `ZZ32` (`FTraitOrObject.java:189-192`; G.worker.1, G.skeptic.1, `PLAN.md:743`). A string object's ilk stays `FlatString` (`ObjectPrims.java:64`; team test `tests/StringTests.fss:82`), against P-167's "stop being types that a program sees or prints" (G.worker.2, `:744`). `typeOf(z)` answers the value's own type (G.skeptic.2, `:746`); `Ratio` is not read at `QQ` (G.skeptic.3, `:747`). Default: each as landed.

**12. The batch's first rule for tests against G's own test list (rung G).** The rule forbids a test that asserts a static argument of a generic built from a numeral under walk (`CLIMB-BATCH-29.md:657`); G's section lists `Cell(3)`, `Just(3)` and `SUM <|1, 2, 3|>` among its tests. G wrote them, relying on N's default, and they pass on the merged tree (G.worker.3, `:745`). By the same rule the gather closed row 20 with no test (gather.4, `:753`).

**13. The fold of a comparison of numerals alone (rung F; F-339).** His default of 22:3x reads "a comparison of literals alone folds". So `1/2 = 0.5` is `true` before walk runs, and `NumeralTypesWalk.fss:41-42` no longer reach the `QQ` pairs that they name (review-routed.2, `:757`); and `0.1 = 0.1000000000000000000001` is `false`, where the base answered `true` (F.worker.2, F.skeptic.3, `:729`). Default: as landed.

**14. A library line respelled to suit the checker (rung N).** Section 1: `strToFloat`'s base typed `ZZ32` (`FortressLibrary.fss:4839-4840`), so that `10^k` does not tie once `RR32` converts from `NaturalNumeral`. A program's `10^k` meets the same tie against the one library after the switch-over (N.worker.1, `:733`).

### The rungs, briefly

**Rung F, `955cad76df`.**
- What it did: the fold in walk's phase order after `PRETYPECHECKDESUGAR` (`PhaseOrder.java:130`); numerals alone, integer and radix-point, folded exactly into fork F1's forms; the wrapping and saturating operators, the bitwise ones and a division by zero left; `CHOOSE` outside `0..n` 0 (row 954) and `BOXPLUS` left (row 955); a typed-place constant rounded once (row 862); a program's coercion once per site in the component class's initializer; two natural numerals concatenated; the harness key `run_exits_nonzero` (`tests/unit_tests/FileTests.java:595-606`); row 338 closed by the fold.
- Standard 1: the Working Draft's static expressions, exact, with one rounding (`Specification-1.0-frozen/basic/expressions/literals.tex:163-173`; `constant.tex:75-82`).
- Standard 2: the team's fold extended in place, its two defects repaired.
- Standard 3: P-173's fold, P-172's one rounding, P-174's once per class; splits 3 and 13.

**Rung N, `3de571bac7`.**
- What it did: `trait Numeral` and the two value objects with their four fields, getters, `asFloat` and `asString` (`FortressLibrary.fsi:454-494`, `.fss:669-728`); 11 coercions and their pairs both ways; `IntLiteral` and `FloatLiteral` removed with their 24 glue bindings; the two rounding helpers; the checker's names switched by library (`Types.java`) and the float tie (`Functionals.scala`, `isNumeral`, `numeralReading`); walk's numerals converted place by place, its choice for a numeral argument (`OverloadedFunction.java:2306-2342`), and `SEQV` of two numeral objects by their reduced value.
- Standard 1: the Working Draft's numeral types and four numbers (`Specification-1.0-frozen/basic/expressions/literals.tex:83-148`).
- Standard 2: `value object Ratio`'s form; P-58's helpers; the library's coercions and pairs (`FortressLibrary.fss:418`'s form).
- Standard 3: P-174, P-76, P-172 and P-173's walk half; rows 943, 944, 454, 443, 484, 361 and 578 closed; splits 2, 5, 6 and 14.

**Rung C, `53a6074ed7`.**
- What it did: the default where nothing fixes a type, also at a result with no declared return type and inside a tuple (the skeptic's `f5f4c57922`, `b212f67a0e`); the narrowest default for a type parameter (`Functionals.scala`, `numeralDefault`); the written-only rule (`TypeWellFormedChecker.scala:48-73`); the range refusal, also for rounding to an infinity (`CoercionOracle.scala:459-483`); a size read as a value a `ZZ32` (`KindEnv.scala:71-72`, `CodeGen.java:6460-6483`); fork C4's narrow step 5; nine team tests and two pinned texts respelled.
- Standard 1: the Working Draft's "library designers decide ... by defining coercion operations" (`literals.tex:141-145`).
- Standard 3: P-173, P-174, P-40 and P-49; rows 79, 946, 486 and 325 closed; P-148's runs, no slowdown; splits 1, 4, 7 and 10.

**Rung S, `e53480fc6e`.**
- What it did: walk interns each literal's text and compares flat strings' carried Java strings by `==` (`Evaluator.java:1018-1021`, `FString.java:35-39`); `equalityRule.sEquiv` compares two `FJavaString`s' carried strings by `==` (`:62-66`); `PRETYPECHECKDESUGAR` folds `||` of string and character literals (`PreTypeCheckDesugaringVisitor.java:207-245`); row 945 closed, row 965 filed.
- Standard 1: "Literals are values" (`literals.tex:25-26`); the fold of `Specification-1.0-frozen/basic/expressions/constant.tex:75-79`.
- Standard 3: P-171 as decided; P-168 stands.

**Rung G, `12292add28`.**
- What it did: `interpreter/evaluator/types/LanguageTypes.java` reads a value of the five number objects and the four string objects at its trait where walk infers a static argument (`EvaluatorBase.java:603`, `:784`, `:938`), and prints the nine by their traits (`FTraitOrObject.java:184-193`); six `XXX` tests promoted; rows 364, 432, 721 and 722 closed, 20 closed by the gather.
- Standard 1: `literals.tex:57`, "A string literal has type String"; `inference.tex:237-238`.
- Standard 3: row 364's way A, his go; P-167; splits 11 and 12.

**Rung T, `4978a9b16e`.**
- What it did: the literals chapter's numeral types, conversion, default and fold, the constant chapter's fold and both concatenations, the coercion and inference chapters, a string literal as one object, eight binary-chapter callouts and one at `nat` parameters; Appendix I's `revival-numerals` (`changes.tex:4993-5379`) and `revival-string-literals` (`:5380-5459`), four entries revised; the specification built clean.
- Standard 3: P-173, P-174, P-76, P-172, P-171, P-165, P-40, in the revision form (P-95, P-96); splits 8 and 9.

### The decisions consequential for him, and the readings he has not confirmed

The record put no question to him before the launch: his go of 23:3x, "pre-approved after the Fable review", covered it, and the Fable review's recommended defaults landed. The consequential forks, each at its default: **N1** (the numeral types as value objects with fields), **N4** (`RadixPointNumeral` declares `asFloat`, which reads P-165's list anew), **F5 to F7** (the deferrals to the switch-over), and, by the Fable review, **C4 as corrected** and **N3** (the getters' names). Every fork landed at its default, except the departures of splits 1 (C6 not built) and 2 (N7), each told by its rung.

The results that stand on a reading he has not confirmed:
- **Under walk, a program's coercion receives a numeral that no program wrote** (split 1; findings, 1).
- **P-174's words on `Literal[\v\]`** (split 8).
- **P-168's exception across both numeral types** (split 5) and **the written-only rule at any parameter** (split 4).
- **"Once per class" as the component's class**, and every evaluation at a generic type (split 3).
- **A numeral at a type that P-173's lists do not name, as `Index`, takes the default where the default is a subtype**, which T states and C built (T.worker.2, T.skeptic.2, `PLAN.md:749`). The judgement's repair 1, "every other type, and no type, takes the default" (`literal-design-judgement-2026-11-08.md:9`), supports it.
- **The library's `=/=` at a numeral**, `true` where `=` is (split 9).

### The global questions

- **Promised against landed.** All six rungs, the 24 glue bindings gone as planned, two helpers added. 21 rows closed, 19 of them planned. Beyond the plan: rows 338 and 20 closed; rows 956 to 968 filed.
- **The record's premises that failed:**
  - fork C6, buildable by rung C alone (split 1);
  - fork N7's Java conversion (split 2);
  - fork F5's once per class at a program's generic type (split 3);
  - the batch's first rule for tests against G's list (split 12);
  - the briefing keys on lines that a rung removes (section 3);
  - the gate's expected counts (section 1); the judges' cost (section 3).
- **Built twice: nothing.** The shared files composed cleanly; the review found every shared file equal to the base with both rungs' patches applied.
- **The library's way: yes for each,** as above; split 14 is a library line changed for the checker, told.
- **Together.** F and N made walk's negative constant (row 968). F and C made `XXXFloatLiteralValuePrint` die before `run()`, which the gather repaired. F and N repaired `ZZOneGetterWalk`, which the gather promoted. T's text and N's walk differ on an infinity (row 967). F's fold made two lines of N's test vacuous (review-routed.2).

### Findings

Sorted by what each needs.

**Findings that would change a decision of his, each with its options:**

1. **Under walk, the landed tree gives a program's coercion a numeral that no program wrote, against repair 3, which he took at 23:3x** (split 1; rows 968 and 961; item 75). The push was not held, since repair 3's clause ("a program's coercion sees the four numbers of a written numeral only") is in no POSITIONS entry, and the review's judge ruled a repair of the text only. Options:
   - (a) Keep repair 3, and repair walk now: walk's numeral site applies the type's prefix `-` to the coercion of the natural numeral where a negative folded constant meets a program's type, and refuses it where the type declares no `-` (`Numerals.java:160-179`), with review-routed.1's `XXXNegativeNumeralOwnTypeWalk` as its test; the compiled half goes with the names batch (row 961). This is fork C6's default on walk.
   - (b) Keep repair 3, and leave both halves to item 75's answer, as landed.
   - (c) Amend repair 3: a negative constant reaches the coercion as a natural numeral of negative value; P-174, the text (`literals.tex:215-218`) and fork C6 change. This reverses a repair he took.
   - In each case, the record writer carries repair 3's clause into P-174, so that a later departure holds a push (process finding 1).

2. **P-174's words on `Literal[\v\]` against T's text** (split 8; gather.5). Options:
   - (a) P-174 reads "the explicit-radix variants fold into the radix field, and `Literal[\v\]` into the digit count", and T's text stays. A `Literal[\v\]` has no radix of its own; it marks a numeral without leading zeros, which the digit count tells.
   - (b) T's sentence is reworded to P-174's words.

3. **Three landed readings that reword his entries if he keeps them**, each in PLAN with its ways:
   - **N4, P-165's list** gains `RadixPointNumeral` (the record writer's change, his to confirm). (a) Add it, as landed; (b) drop the method, which changes `asFloat(x)` at that type against P-165's "unchanged at every concrete type".
   - **N.skeptic.1, P-168's exception** (split 5). (a) Within one numeral type, P-168's first rule kept (a walk change at `FOrdinaryObject.java:48-49`); (b) across both, as landed, P-168's sentence widened.
   - **C.skeptic.5, the written-only rule** (split 4). (a) Keep it at any parameter, as landed, P-174's "of a coercion or an operator" read as examples; (b) narrow it, and give the two library tests another device.

4. **His aim of 15:0x is not met yet: nine differences that the record did not plan stand, each with its row** (section 7). This touches phase 4's order, which puts the natives' remainder and then the names batch next. Options:
   - (a) One small batch next, before the natives' remainder, for those testable on both paths today: rows 958, 963, 967, 968, and 966 by a library repair (T.judge.2's ways), since after the switch-over both paths would answer `true` there. Rows 957, 962, 446 and 362, whose compiled halves are in the code generator or the prelude, go with the names batch.
   - (b) All of them with the names batch, when the compiled path reads the one library.
   - (c) Each at its row, as later batches meet them.

**Corrections, reasons in the record that the landing made false** (home: the record-landing workflow, by `record.py` and `ledger.py`):

A. FACTS: **F-169**, "The revised text ... gives an integer numeral the type `IntLiteral`", which T made false, and its citation `literals.tex:154-156`; **F-173** (`inference.tex:234-296`, now 3 lines lower) and **F-272** (`conversions-coercions.tex:500-516`, now 21 lower), moved by T; **F-78** and **F-334** (`Functionals.scala:718`, `:738-742`), moved by N and C (`RECORD.md`, "Left for the coordinator"). None of these is on the gather's or the review's lists.

B. POSITIONS (his text; the record writer under his rule of 2026-10-31, named to him): **P-171**'s citation `Specification/basic/expressions/constant.tex:81-85` now points at the numeral fold; the concatenation of literals is at `:118-122`, the Working Draft's at `Specification-1.0-frozen/basic/expressions/constant.tex:75-79`. **P-76**'s "Walk gaps": rows 454 and 443 are closed; rows 395 and 511 stand. **P-172**'s "(row 862: the compiled path rounds two or three times)" is closed, and walk converts at a declared return type too. **P-165**'s list (finding 3).

C. PLAN, the review queue and the skills: Part 4 and Part 3.

**Corrections of an entry's ground that change no decision, for the entries' histories:**
- F-240's distance figure, 224 s, was taken beside `testFast` and the review's walk probe; its count figure, 125 s, against a base that this session timed at 108 s to 123 s (section 2).
- Row 893 cites `changes.tex:4105-4110`, which no longer holds its passage (the repair's note).

**Confirmations:**
- The count's table equals climb batch 28's; the distance reads 0 with no crash.
- microGPT's quick pair: 7 of 7 on both programs.
- The 52 demos reached their end on the merged tree.
- `ledger.py landing-check` and `record.py check`: no finding, 0 failures.
- The suites: 2,314 fast, 813 walk, 130 specification examples, 0 failures; 42 of 42 atomic runs.
- No prelude file changed (P-37): `git diff --stat b430f9f428 7daf51fe8a` over the seven `Compiler*` files prints nothing.
- Every commit since the base, and every `wip/` branch of the six, ends with the plain footer and names no model (`git log --format=%B`, `grep -ci 'opus\|sonnet\|fable'`: 0 on each).

## Part 2. Did the practice hold

### The skeptics' fixes

From `RECORD.md`, "Each rung", and the review's `fixesChecked`: 25 fix commits, 10 of them defects, two contested and upheld.
- N: `e3f9f07dfb` (radix-point radix), `794f7d908e` (`inRange` at `NN32`), `43d019ed3b` (a generic own type's coercion), `6408011e9b` (the dispatch caches' key), `953d050966` (a numeral at a declared return type; contested, upheld), all **defects**; `a5f3cab523`, `55de601879`, `2690c5aa15` (corrections; rows 959 and 960).
- C: `f5f4c57922` (the default at a result with no declared return type) and `b212f67a0e` (the range refusal inside a tuple), **defects**; `c4c17302e6`, `76efb477a7` (rows 963 and 964).
- F: `c68437686d` (one rounding below the least normal value), **defect**; `5fdaeab699` (row 957 and `XXXZZOneGetterWalk`), `5c68eb91ac`, `61abbd8d7f`.
- G: `8cf51d2117`, `06fcd043b6`, `703dec12d3` (corrections).
- S: `91762b1a68` (three tests that the fold made pass without checking `||`), **defect**; `a8c2d0b2a7`.
- T: `1184add1d9` (the `=/=` departure; contested, upheld), **defect**; `8a2b7ae816`, `11e753f17c`, `4fe2cb1ab3`.

The skeptics found 4 of the 13 rows (957, 960, 963, 964) and 10 defects. Against the batches before: 28 made 16 with 1 defect, 27 9 with 1, 26 2 with 0. Each code rung's test failed first through the harness, by its result's `recordedFailure` (N 'Tests run: 1,  Failures: 1'; C 'Tests run: 8,  Failures: 5'; F 'Tests run: 9,  Failures: 5'; G 'Tests run: 12,  Failures: 12'; S 'Tests run: 2,  Failures: 1'); T edits prose only.

### The merged-diff review

- **Not approved**, two blocking findings of the text, both upheld; the repair round ran once and landed.
- It found what the gather missed: walk's halves of rows 968 and 962, 18 FACTS entries false of the merged tree, and one test made vacuous (review-routed.2).
- It did not name: F-169, P-171's citation, F-173's and F-272's, `revival-changes.md:108`, the PLAN lines that F5 to F7 and N11 need, and the forks' review-queue entries (Part 4).
- It wrote nothing outside `explorations/`, and no held list or boot note.

### Builds and runs, repeated or not

Section 8, point 2. Every code rung ran its suites by fork 2 (N and F both, C `testQuick`, G and S `testSystem`, S `testQuick` too); C ran no `pass` run, since its profile put the change under 0.3 % ('Walker.walkCases*' 37 %), as `compiler.md`, "The checker's time", step 4, now allows. The specification was built six times on five texts: T twice, T's skeptic once, the gather once, the repair once, and the commit stage again on the repair's text.

### Refusals by the harness and the tools

- **One permission refusal:** the gather's `sleep 60` (call 208), 'Blocked: sleep ... use Monitor'.
- **Three structured results refused by the schema** (skeptics F, N and C, their first try): fix kinds 'test', 'report', 'record' and 'citation', where the schema takes "correction" or "defect" only (process finding 7).
- One harness refusal: rung F's write of a file not read first ('File has not been read yet').
- 41 error results in all: 10 a `wait_for` cap of 240 s, the 5 above, 5 briefing calls ending 'Exit code 1' on a key not found, and the rest a test, a probe or a tool failing as its caller expected.

### The commit stage's fold of FACTS

It changed F-53's title to climb batch 29's and kept its totals. It wrote F-240's figures: the count stage about 125 s by file times, the distance 224 s (141 s) at a start load of 0.07, against climb batch 28's 205 s (135 s) at 3.42. `record.py check --base e82f3ef175` printed '0 failures'. It warned that the start load understates the stage's load, since `testFast` ran beside it.

### The practice's measures, batches 26 to 29

(B26; B27; B28; B29.)
- Written: 2.55M; 5.17M; 6.65M; 7.54M.
- Launches lost to restarts or the disk: 0; 8 and a gate, 0.42M; 0; 0.
- Per landed rung: 0.64M; 0.65M; 0.95M; 1.26M.
- First calls: 0.62M, 6 cold; 1.29M, 10 cold; 0.98M, 8 cold; 1.12M, 10 cold.
- Cache refills: 1, 94K, 3.7 %; 0; 1, 204K, 3.1 %; 0.
- Refusal cycles: 0; 3 rungs, 231K; 1 rung, 164K, 2.5 %; 2 rungs, 314K, 4.2 %.
- Rulings and repairs on the merged tree: 0; 368K; 0; 415K, 5.5 %.
- Skeptic fix commits (defects): 2 (0); 9 (1); 16 (1); 25 (10).
- Distance: 0, 304 of 306; 0 with two crash rows, `Char` unchecked; 0, no crash, 372 of 424 helper bindings; 0, no crash, 374 of 402.
- Count stage at the gate: 180 s; 80 s; 99 s; 125 s.
- Distance stage at the gate: 246 s; 144 s; 205 s at load 3.42; 224 s at load 0.07 beside `testFast`.
- Skill's load: 13.9 %; 16.0 %; 16.5 %; 12.9 %.
- Briefing, estimated: 5.2 %; 6.2 %; 3.1 %; about 3.6 %.
- microGPT quick pair: 7 of 7 both, each time.

The figures of B26 to B28 are `reviews/batch-28-review.md`'s.

### Climb batch 28's findings, a batch later

1. The relayed request: **not met** (section 8, point 6).
2. The coordinator's JVM-running agents beside the run and the gate: **held**; no agent of the coordinator's ran in span 3. The review's own probes still ran beside the gate's timed stages (process finding 5).
3. The backup's gap: **held**; check-ins were armed every 45 minutes through the run (`batch29/checkins.txt`).
4. The shallow clone: **held**; the clone is whole.
5. A foreground call past the cache's life: **held**, no refill.
6. The cost estimate: **taken up**; the skeptics landed inside the record's 0.28M to 0.5M; the judges were not in the figure.
7. `compiler.md` past 30,000 characters: **taken up**, 29,983.
8. The shared brief's sentence on `revival-changes.md`: **half held**; the gate still read it once.
9. P-148's `pass` run: **taken up** in `compiler.md`'s step 4; C ran none.
10. `spend.py`'s folders: **not taken up**; its header still names no landing folder.
11. `File`, `Reader` and `System` outside the distance: **not taken up** (`tools/distance/run.sh`).
12. A test api's jar in the main tree's caches: **met again in a new form**; the review's compiled probes left `Row328Probe.jar` and `Row328ProbeB.jar` there beside the gate, and the repair `NegBareCompiled.jar` after it.

### Process findings

Numbered for the coordinator, who improves the batch script and the practice from them between batches.

1. **Repair 3 is in no POSITIONS entry, so the push-hold rule could not see its breach.** The batch record cites fork C6 as "the judgement's repair 3, which he took", but P-173 and P-174 hold only its first half, the signed constant. So C's skeptic, the review and its judge read C6 as a batch fork, and walk's departure landed (finding 1). Proposed (mine): the record writer carries every repair that he takes into the entry it repairs; and the planner marks a fork whose default is a decision of his as "decision on record", so that a departure from it holds the push. Home: the `coordinator` skill's record part; the manual's "Preparing a batch record".
2. **A fork that one rung cannot build alone.** C6 needed F's fold to keep the prefix operator, and the record already knew that the fold makes `-3` one node (F-262; fork C6's own text). Under walk, F with N then broke repair 3, which no rung's section foresaw. Proposed (mine): for each fork, the planner names every rung whose edit reaches the same value, and gives the fork to one rung or to a `landsOnlyWith` pair. Home: the manual's "Preparing a batch record".
3. **Briefing keys that name a line a rung removes.** `code:...FortressBuiltin.fss#value object IntLiteral extends Number` fails on N's tree, so skeptic N, judge N and the repair each got 'Exit code 1' and read again; the repair met two more such keys. Proposed (mine): the generator flags a `code:` key whose line the rung's section removes, and the brief runs those keys in the base build. Home: the generator; `facts-extract.sh`.
4. **The commit stage built the specification again on the repair's text.** Proposed (mine): a repair that builds the specification keeps its PDF under `tmp/`, as the gather does, and the commit stage copies the newest build of the landed text. Home: the script's repair and commit briefs.
5. **The review's programs beside the gate's timed stages, and in the gate's caches.** The review ran a walk probe at 08:00:44, inside the distance stage (07:57:24 to 08:01:11), and two compiled probes at 08:15 and 08:16 into `default_repository/caches`, the tree the gate ran in. F-240's 224 s was taken so. Proposed (mine): the review runs every probe with a private caches folder, and starts none while the gate's distance or count stage runs; the gate's machine block gives the load at the stage's end too. Home: the script's review and gate briefs.
6. **Agents read sibling rungs' worktrees while those ran.** Rung F made 7 calls into N's and C's worktrees, skeptic F one into N's, skeptic T 23 into all five. A rung cannot build on another of its batch (batch rule 1). For T, which describes the merged design, reading the branches may be the point. Proposed (mine): the shared brief says that a rung reads no sibling's tree, and T's section names the branches it reads and why. Home: the script's preamble; the record's T section.
7. **The skeptic's fix kinds.** Three skeptics' first results were refused by the schema. Proposed (mine): the skeptic brief names the two allowed kinds. Home: the script's skeptic brief.
8. **Whole suites on states superseded within minutes.** Rung N's first `testSystem`, skeptic N's first `testSystem` and skeptic C's first `testQuick` each ran before a later fix. Proposed (mine): a skeptic with several fixes makes them all, then runs the suite once. Home: the script's skeptic brief.
9. **The record and the skill split on the demos.** The skill asks a change of walk or of a shared phase to run them; the record gave them to the gather for G, and N did not run them; F and S did. Proposed (mine): the manual says that the gather's run stands in for the rungs', and the briefs say so. Home: the manual's "Rung worker"; `tests-running.md`, "Outside the gate", by the skill writer.
10. **A batch rule against a rung's own test list** (split 12). Proposed (mine): the planner checks each rung's test list against the batch's rules for tests. Home: the manual's "Preparing a batch record".
11. **The revival page's stage stopped again at climb batch 28's landing**, as at climb batch 27's: `update.py` exit 2 on F-299's changed form, and its brief's take-over command read 'undefined..main', since `record-landing.js:304` reads `l.mainBefore`, which the lander may leave out. The coordinator's agent finished the page by hand (144K). F-299 now reads "The other 28 name glue classes", which the pattern matches. Proposed (mine): the page stage's brief takes its range from `SBASE` (`:249`), and `update.py` reads the count from `RECORD.md`'s "The count of the bindings" rather than from FACTS' wording. Home: `tools/record-landing/record-landing.js`; `tools/revival-page/update.py`.
12. **Carried over:** climb batch 28's process findings 10 and 11.

### Misses, by kind

Numbered on from `batch-28-review.md`'s 993.

Found inside the batch:
- **The planner's text wrong, caught before landing:**
  - 994, fork C6 given to rung C, which could not build it alone (split 1);
  - 995, fork N7's Java conversion (split 2);
  - 996, fork F5's once per class at a program's generic type (split 3; row 957);
  - 997, the batch's first rule for tests against G's list (split 12);
  - 998, briefing keys on lines a rung removes (process finding 3);
  - 999, the gate's expected counts, 795 and 1,485 against 813 and 1,506;
  - 1000, the record's six errors that the Fable review corrected before the launch (C4, rows 954 and 955's places, S's two skill sentences, F1's forms, N1's ground, T's citation).
- **A defect of a change, caught before landing:** 1001, N's five; 1002, C's two; 1003, F's one; 1004, S's three vacuous tests; 1005, T's `=/=` stated as the design's answer (Part 2).
- **A defect of the merged tree, caught at the gather or the review:**
  - 1006, `XXXFloatLiteralValuePrint`'s key under F's initializer (gather, `8d93b7d196`);
  - 1007, T's text against N's walk on an infinity (gather.2, row 967);
  - 1008, F's fold with N's site (review.1, row 968);
  - 1009, three passages claiming `ZZ32` on both paths for a size used as a value (review.2 and its judge).
- **A test that reached too little:** 1010, `NumeralTypesWalk.fss:41-42`, vacuous on `main` (review-routed.2); 1011, rows 20, 578 and 955 closed with no test in the test folders.
- **A defect without its home:** 1012, rows 956 to 968 (the rungs, four skeptics, the gather and the review).
- **Sentences and citations made wrong and not listed:** 1013, 18 FACTS entries (the review, `6a654baa13`); 1014, `RECORD.md`'s citations and `JUDGE.md`'s placeholder (the review); 1015, the Effects of `revival-rr32`, `revival-index` and `revival-expected-contexts`, the `types-vals-vars.tex` and `ranges.tex` boxes and `preamble.tex`'s list (the gather).
- **Process:**
  - 1016, three schema refusals;
  - 1017, one `sleep` refused;
  - 1018, the specification built twice on one text;
  - 1019, suites on superseded states;
  - 1020, the review's compiled probes in the gate's caches;
  - 1021, sibling worktrees read;
  - 1022, `sources.md` read in 10 calls.

Found by this review:
- 1023, F-169 made false by T, on no list;
- 1024, P-171's citation made false by T, on no list;
- 1025, F-173's and F-272's citations moved by T, on no list;
- 1026, `revival-changes.md:108`'s "(rows 20, 717)" made false, not on the skill list (Part 3);
- 1027, no PLAN line for forks F5 to F7 and N11, which the record's "After the landing" and the Fable review ask (Part 4);
- 1028, no review-queue entry for the record's forks and its points for his sight, as climb batch 28's routing wrote them (items 428 to 436);
- 1029, repair 3 outside POSITIONS, so its breach landed (process finding 1);
- 1030, the count stage's rise read across sessions (section 2);
- 1031, the revival page's stage stopped at the landing before, its take-over command broken (process finding 11).

**Against the earlier notes.** 29 found inside the batch (994 to 1022), against climb batch 28's 22, for six rungs against seven. One departure from a decision he took landed and stands (row 968, finding 1); the other faults found inside the batch were cured or filed before landing.

## Part 3. For the skill writer

The sentences of the skills that the batch made false or incomplete, from `RECORD.md`'s "Left for the coordinator and the skill writer" and the rungs' reports, each with the entry or row that now grounds the true sentence. The batch wrote no skill text. I read each on `main` at `7daf51fe8a`. The proposed wording is mine; the writer keeps the skill's form.

**False, on the gather's list:**
1. **`SKILL.md:77`**, "Before the checker, it folds integer literals.", and the phase list at `:65-73`, which lacks the fold. Ground: F-339; P-173. Proposed: "Both paths fold an expression of numerals alone, integer or with a radix point, exactly, after the desugaring before the checker (`PhaseOrder.java`)."
2. **`SKILL.md:132`**, "(`nat` is an `NN32` value, `int` a `ZZ32`)". Ground: P-173, P-40; F-140; row 962. Proposed: "a `nat` holds an `NN32` value and an `int` a `ZZ32`; used as a value, either is a `ZZ32` (under walk a `ZZ64` from 2^31, row 962)".
3. **`references/interpreter.md:20-23`** (rows 943, 944, 945 and 364, all closed), **`:25`** (walk computes on numerals at `ZZ32` where the checker types `IntLiteral`; row 578), and **`:126`** (S's and G's). Ground: F-341, F-343, F-344; P-171, P-173.
4. **`references/compiler.md:106`** (row 945, closed). Ground: P-171; F-343.
5. **`references/revival-changes.md:48`**, the `Index` paragraph: "To the checker a numeral is an `IntLiteral` ... So it refuses `f(3)` ... Walk takes it (row 364)." Ground: `changes.tex:4444-4448`; P-173. Proposed: "A numeral at `Index` takes its default, `ZZ32`, which is an `Index`, on both paths against the one library."
6. **`revival-changes.md:62`**, "Walk departs from both answers (rows 943, 945), and the compiled path from the string answer (row 945)". Ground: rows closed; P-171, P-172.
7. **`revival-changes.md:89`**, the numeral paragraph (`IntLiteral`, `FloatLiteral`, row 364, rows 721, 943, 944). Ground: P-173, P-174, P-76, P-172; F-79, F-342. Its new text holds the default, the conversion where a place fixes a type, the fold, the numeral types written only as a parameter type, and walk's departures with their rows (958, 960, 962, 966, 967, 968).
8. **`revival-changes.md:95`**, "Each of the eight number types, and `IntLiteral`, declares its own `asFloat`". Ground: fork N4; P-165 as the record writer changes it.
9. **`references/tests-writing.md:34`** (row 454, closed: walk now binds a numeral at `NN32`), and the new key `run_exits_nonzero` (F.worker.4).
10. **`references/library.md:56`**, "as for `IntLiteral`'s bindings": those bindings are gone; `Reflect`'s are the example now.

**False or incomplete, not on the list:**
11. **`revival-changes.md:108`**, "a comprehension inside another clause form is built at its elements' run-time types (rows 20, 717)": row 20 is closed (gather.4), and row 717 is narrowed by G. Ground: the rows.
12. **`revival-changes.md`, "Numbers", "Arguments convert ..."**: "the checker reads the numeral as `ZZ32`, or `ZZ64` or `ZZ` where the value does not fit" lacks the float numeral, which reads `RR64` (P-173).

**Sentences that hold, met by the batch:**
- `committing.md`'s footer: held, 14 of 14.
- `compiler.md`, "about 80 to 180 seconds" for the count: 125 s at the gate, 108 s to 133 s in the rungs' runs.
- `gate.md:3`, "in about 25 minutes": 25.2.
- `session.md`'s wait cap of 240 s: held in every `wait_for`, 10 caps hit at 240 s.

## Part 4. Routing

Checked against `main` at `7daf51fe8a`: the gather's PLAN entries (`1d50c6bbbf`), the review's (`6a654baa13`), the review queue and the ledger. The push is done, so the hashes are final. POSITIONS, the review queue and INDEX are unchanged since the base (`git diff --stat`).

**Step by step** (the manual, "After the landing: the coordinator's routing"):
1. The landing report: owed now.
2. The routing: owed; the list below.
3. FACTS: the commit stage folded F-53 and F-240, the gather and the review the rest; owed: correction A.
4. The skills: the record-landing workflow's skill update, with Part 3 and `RECORD.md`'s "Revival changes, for the skill writer" (all six rungs have one). Then the orientation update on F-339 to F-346 and the 29 rewritten entries (F-32, F-53, F-55, F-57, F-73, F-74, F-79, F-84, F-118, F-123, F-131, F-137, F-138, F-140, F-151, F-228, F-229, F-240, F-249, F-253, F-262, F-263, F-278, F-285, F-299, F-304, F-326, F-328, F-331), and on what corrections A and B change.
5. The next batch, after step 4.
6. This review: committed by the coordinator as `explorations/reviews/batch-29-review.md`, with its INDEX line.

### The list for the record-landing workflow, one line each with its home

**The gather's and the review's items, all in PLAN:**
- gather.1, .3, .4, .6, told: `PLAN.md:751-755`; with the record's forks (below), to one review-queue entry.
- gather.2 with N.skeptic.2 (row 967): `:737`.
- gather.5 (`Literal[\v\]`): `:754`; finding 2.
- review.1 with C.skeptic.3 (rows 961, 968): item 75, `:140`; it needs a review-queue entry, as item 74 has item 408; finding 1.
- review.2 with C.worker.2 and C.skeptic.2 (row 962): `:739`.
- review-routed.1 (row 968's reproducer) and review-routed.2 (`NumeralTypesWalk.fss:41-42`): `:756`, `:757`; both for the next batch that edits walk's numerals or the fold.

**Rows the batch filed or rewrote, open:**
- 956: F.worker.3 (`:730`). 957: F.worker.1 (`:728`). 958: N.worker.3 (`:735`). 960: gather.5 (`:754`). 961 and 968: item 75 (`:140`), `:756`. 962: `:739`. 963 and 964: C.skeptic.4 (`:740`). 966: T.worker.1 (`:748`), `:750`. 967: `:737`.
- 959 (a `typecase` arm naming an undefined type, both paths) and 965 (the prelude's `||` with a `Character` value first): no PLAN line. 959 goes with the checker's and walk's load-check rows; 965 with the prelude (P-38).
- Rewritten: 318, 328 and 362 (the prelude, no line; they retire with it), 387 (`:86`, `:273`, `:732`), 446 (`:738`), 360, 506, 675, 390, and G's rows (`RECORD.md`, "Rows opened").

**Rows closed** (21, by `a711ca76ba`): each PLAN mention to `PLAN-history.md`, among them `PLAN.md:12` (row 364 in "Next"), `:55` and `:69` (578, the numeral bindings), `:69-:76` (the batch's own line), `:86` (443, 486 in Q-walk), `:87` (578's own line), `:106` (721 in phase 5).

**Record defaults the batch took, each to a review-queue entry** (`review-queue.md` holds none of this batch's forks yet):
- The forks at their defaults (`CLIMB-BATCH-29.md`, section 3): one entry for the whole batch (1 to 8) and one per rung, N1 to N12, C1 to C8, F1 to F8, G1 to G5, S1 and S2, T1 to T3, default as landed, with the departures named: N7 (split 2), C6 (split 1), C4 as the Fable review changed it, and N1, N4 and F5 to F7 as consequential.
- The record's points for his sight (`CLIMB-BATCH-29.md`, "Points the batch lists for him, not questions"): the team's lines changed (N: `NumberPrintTest.fss:16`, `:31`, `sequivTest.fss:58`, `:94`, `XXXextendIntLiteral.fss:15`, `XXXextendFloatLiteral.fss:15`, `Constants.fsi:16-17`, `ReflectiveQuickCheck.fss:40`; C: `Compiled5.ah`, `5.aj`, `5.ak`, `6.az`, `9.g`, `9.j`, `9.p`, `9.t`, `9.u` and the pinned texts of `XXX6at` and `XXX6bw`; F: `Compiled7.Print17.fss:20-21`, `sequivTest.fss:31`; G: `LongStringTests.fss:121`, `:141`); what walk does differently; what the compiled path does differently; the specification's two new entries and four revised.

**The review queue:**
- 438 to 447: built at their defaults; their group's line, "each is needed before its rung lands", is now false. 443 ("none on record for the inferred binding") and 447 ("none on record" for the concatenation) now carry the landed defaults C2 and F4.
- 403: "comes before climb batch 29's gate": that gate is past, with no crash; the item stays for later gates.
- 406: "the numerals' 32 left P-169 (P-174)": now built.
- 437 (`Reflect`'s 28 on glue): now the only glue bindings; it stands.

**PLAN lines the batch built or made stale:**
- "Where we stand" (`PLAN.md:9-12`): climb batch 29's gate as the last landed (`7daf51fe8a`), 374 of 402 with 28 glue (`Reflect`'s), "Landed" and "Next".
- Phase 4 has no line for climb batch 29: one line, landed at `7daf51fe8a`, with this review.
- Phase 4's natives line, "372 of the 424 live bindings name helpers and 52 still name glue classes" (`:47`), and its sub-lines N3 (`:52`, "the 17 of `IntLiteral`'s 25, which leave the library with climb batch 29's rename") and N5 (`:55`, "`IntLiteral`'s 21 ... and `FloatLiteral`'s 3 leave the library"): built; to history, or cut to their open parts.
- The line "Climb batch 29, the literals" and its sub-lines (`:68-76`): built; to history, keeping the parallelism note (P-175).
- **New lines owed for the names batch** (`CLIMB-BATCH-29.md`, section 6, "After the landing"; the Fable review, F5 to F7): the compiled four numbers at a program's coercion (F5); the pairs' compiled fold (F6); a numeral at a compiled `QQ` place and the compiled numeral `SEQV` by reduced value (F7); walk's unused glue classes `IntLiteral.java` and `FloatLiteral.java` removed (N11).
- Q-walk (`:86`): "the fit rule for a numeral too large for `ZZ32`" (row 443) and "row 486's size value" are built; walk's `ZZ64` above 2^31 is row 962.
- Row 578's line (`:87`): to history.
- Row 579's line (`:80`): "`IntLiteral` its own" now names a type the one library no longer has.
- "His answers needed before the switch-over" (`:93`): item 75's review-queue entry joins the list.

**POSITIONS** (his text; the record writer under his rule of 2026-10-31, named to him): P-165's list (N4, his to confirm); P-171's citation; P-76's walk gaps; P-172's row 862 clause (correction B); P-174's `Literal[\v\]` (finding 2) and repair 3's clause (finding 1), each only on his word.

**FACTS:** correction A.

**The skill sentences:** Part 3, through the record-landing workflow's skill update.

**The manual and the script:** process findings 1 to 12, between batches; first 1, 2 and 5.

### The steps due before the next batch

1. **His answers to findings 1 and 4**, since both bear on what the next batch is.
2. **The record-landing workflow** (`tools/record-landing/README.md`; `args: { batch: '29', base: 'b430f9f428', landing: '7daf51fe8a' }`), which routes the list above, lands, pushes, and runs the orientation update and the skill update.
3. **FACTS and POSITIONS:** corrections A and B.
4. **The script, between batches:** process findings 1 to 12.
5. **Climb batch 30,** by PLAN's phase 4, or by finding 4's option (a) if he takes it: the raise-string resolver and what the natives review leaves before the names batch, with item 74's answer before work on the compiled transaction goes on.

## What I did not do

- I built nothing and ran no Fortress program, suite, stage or JVM. I changed no file of the tree and committed nothing.
- I read the run's transcripts through scripts (`batch-measures.py`, `skill-load.py`, `spend.py`, and the scratch scripts of the header), the run's journal and climb batch 28's record-landing journal, and the coordinating session's transcript for the launch's time and its own writes by model. For the preparation I read only the transcripts' labels, times, models and writes.
- I ran `record.py check --base b430f9f428`, `ledger.py check`, `ledger.py landing-check b430f9f42800e98b0c9848edd654a78b0808dd15`, `ledger.py show`, `facts-extract.sh`, `grep`, `sed`, `diff`, `df` and `git`, which write nothing.
- Walk's one value per site and type at a generic type (section 7, 13), walk's binding of a written numeral type (section 7, 5), and the effect of the sibling-worktree reads (process finding 6) are by reading, not run.
- I did not write the review's INDEX line, which the coordinator owes with its commit.

## For the curator

Climb batch 29 ran on 9 November and was pushed at 08:49 UTC. All six tasks landed.
- A numeral now has the Working Draft's types, `NaturalNumeral` and `RadixPointNumeral`, with its four numbers as fields. Each number type converts from them: exactly into the integer types and `QQ`, with one rounding into the floats.
- Where nothing fixes a type, a numeral is a `ZZ32`, a `ZZ64` or `ZZ` by its value, or an `RR64` with a radix point, on both paths.
- An expression of numerals alone is folded exactly on both paths, so `2147483647 + 1` and `0.1 + 0.2 = 0.3` give the true answers.
- Two string literals of one text are one object on both paths.
- In the interpreter, `Cell(3)` is now a `Cell[\ZZ32\]`, and messages print `ZZ32` and `String`.
- The specification says all of this, with two new entries in its appendix of changes.
- 24 more of the library's built-in functions left the interpreter-only Java classes: 374 of 402 now call Java methods that both paths can call. Only `Reflect`'s 28 remain.
- All tests passed, the 52 team demos ran to their end, and the quick microGPT check passed 7 of 7 on both programs.

Your aim, "bring the two implementations to do the same thing", is met where both paths can show it today. Four differences wait for the switch-over by plan. Nine more differences that the plan did not foresee remain, each recorded as a gap: for example, a numeral too large for `RR32` is an error in the compiler and `Infinity` in the interpreter.

Four points need your word:
- In the interpreter, `t: Tally = -3` now hands your type's coercion a numeral with the value -3 and one digit. No program wrote that numeral. This breaks the judgement's repair 3, which you took. The batch did not stop for it, because repair 3 is not in the decisions file. I recommend that the interpreter apply your type's `-` to the coercion of 3, as you decided.
- Your decision says that the Draft's `Literal[\v\]` folds into the radix field. The new specification says that it folds into the digit count. The specification's reading looks right, so I recommend that the decision's words change.
- Three readings of your decisions landed as defaults, and each would reword a decision if you keep it. They concern `asFloat` on `RadixPointNumeral`, numeral equality across the two numeral types, and where a numeral type may be written.
- When should the nine unplanned differences be repaired? I recommend that five of them go in one small batch next, before the remaining built-in functions. Those five can be tested on both paths now.

The run wrote 7.54 million tokens in 7 h 27 min, against the plan's 6.8 million and 6 h 30 min. Most of the overrun is the extra judges: two tasks were contested, and the final review asked for a repair of the specification's text. The landing work of the last batch wrote 6.1 million. The span before this run wrote 6.3 million that the count can see, and about two thirds of it was your literals design session of 8 November. On Fable, that session wrote at least 1.3 million more. The batch's own preparation wrote 2.0 million.