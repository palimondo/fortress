<!-- The combined post-batch review of climb batch 28, the batch of coordinator/CLIMB-BATCH-28.md that is phase 4's sixth batch (seven rungs planned and landed, V, R, A, K, H, S, T; run wf_e14c1b80-a93, base 157323e51759f4a46423deab7c35990af7be5a9c; the Workflow call at 02:32:08 UTC on 2026-11-08, its first agent's first record at 02:32:12, its commit stage's last commit f56d6516 at 08:46:24 the same day; 20 agent transcripts, each with its meta file; no restart, no resume; one judge, on rung R; no repair round; landed on main as V 45868b113, R 71d1018d1, A a6c884cd8, K a3eba5067, H 70c26e3fd, S 8ff5cb7ff, T d839b7421, the closes cb51060dc, the gather's record 4347cc94, the review's corrections 5c5ec47e and the gate's tables f56d6516; pushed by the commit stage, 2b5cc182..f56d6516, to main and two refs), owed at the landing by the coordinator skill's references/batch.md, "The landing", step 3, in the form of reviews/batch-27-review.md, by a review worker reading only, against main at f56d6516 (the coordinator's b7ec9d75 and 150c2506 after it change only explorations/reviews, INDEX, HELD and BOOT). The measures are batch-measures.py's and transcript-study/skill-load.py's on this run, spend.py's over the live folders, and scratch scripts in /tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/rev28/ (tx.py, calls.py, brief.py, parts.py, runs.py, gaps.py, lastts.py, spans28.py, spansum.py), written new, since the rev27 scripts were lost with the container at 23:09 UTC on 11-07. Tokens are writes only (input plus cache creation, one count per message id). The microGPT walk check is reported by its verdict only, at the curator's ruling of 2026-10-23. Besides reading, this review ran only those scripts, record.py check, ledger.py check and landing-check, facts-extract.sh, grep, diff, df and git, which write nothing in the tree. It ran no build, suite, stage or Fortress program. -->

# Climb batch 28: seven of seven rungs, 50 bindings off glue, the checker's sort made correct and `Char` checked again, the distance at 0 with no crash; a run of 6.65M, 45 % over its estimate, after a preparation of 3.11M seen and a landing of climb batch 27 of 6.41M

## What came up in this run

### 1. The count 0, and the distance 0 with no crash, against climb batch 27's tables

**What the record expected** (`coordinator/CLIMB-BATCH-28.md`, section 6, "The gate, and what it should show"): the count 0; the distance 0 over the fourteen components with `#crash none` by rung K, `compare.sh` printing the two crash rows as gone; `testSystem` about 785; the compiler track about 1,459; `testSpecData` 130; 42 atomic runs; no ladder move; 52 demos at the gather; microGPT's quick pair 7 of 7. The gate (`a536ebbe`) ran once, on `4347cc94`, and was green. The review's `5c5ec47e` changed only `explorations/`, so the gate holds for it (the gate's result).

**The count's table** (`climb-batch-28/gate/checker-count.txt` against `climb-batch-27/gate/checker-count.txt`): `diff` prints nothing. 14 api rows, all 0, `#total 0`, `#locations 0`, `#crash none`, the shadow matching; 'COUNT SAME   0, declared none' (`summary.txt`). **No row is new and no row rose, so no row needs a rung edit to explain it** (`references/batch.md`, "The checker count and the distance").

The rungs' own tables, from `RECORD.md`, "Points to report": V, R, A, H and S read the count 0 and equal to climb batch 27's; K's three runs gave equal tables; T ran neither stage (`STAGE_BLIND`, its skeptic checked the list against the diff). On a rung's own tree, without K, the distance's two crash rows went (V, A, S) or stayed (R, H), as the record foresaw: the crash follows the hash order of declaration lines (row 929's notes).

**The distance's table** (`climb-batch-28/gate/distance.txt`): `#total 0`, every `#kind` 0, `#crash none`, the shadow matching. `compare.sh` printed:

    DISTANCE SAME   0
        crash gone   decl	ObjectDecl FortressBuiltin.fss:661:1-773:2	IllegalArgumentException	Comparison method violates its general contract!
        crash gone   stage	component FortressBuiltin leftover	InterpreterBug	** bug! ...
        crash new    none

So `value object Char` is checked to its end for the first time since climb batch 27's gate, and its 41 helper bindings with it (K's `run.txt:762`, '@@TC DECL-OK ObjectDecl .../FortressBuiltin.fss:661:1-773:2 errors=0'). The per-site list `compile-ladder/gate/distance-sites.tsv`: its header alone.

**The summary's other rows** (`diff` of the two `summary.txt`): `CompilerJUTest` 1,447 to 1,475; two new misc suites, `ArrayStoreJUTest` 6 and `PartialOrderJUTest` 4; `testFast` 2,236 to 2,274; `testSystem` 778 to 791, over shards of 205, 195, 197 and 194; `testSpecData` 130; 42 of 42 atomic runs `PASS`; no `COUNT DOWN`, no `SUITE GONE`.

**The ladder** (`climb-batch-28/gate/ladder/`): `comparison.txt` and `microgpt-comparison.txt` empty; against climb batch 27's tables only the timing columns differ (the gate's result).

### 2. The stages' times against climb batch 27's gate

- **The count stage: about 99 s** (`tmp/gate-batch-28/checker-count/javac.txt` at 08:40:55 to `run.txt` at 08:42:34), against about 80 s. Rung K's own runs: base 92.5 s, change 99.6 s, pass 103.6 s; its skeptic's base 92.2 s, head 96.9 s. So K's linear extension costs about 5 to 12 %, a small difference by P-148's smoke test.
- **The distance stage: 205 s (`FortressLibrary` 135 s) at a start load of 3.42**, against 144 s (90 s) at 0.28. It started at 08:21:47, 16 s before `testFast`, as at climb batch 27's gate, and beside the coordinator's literals study (`a899d418`, 39 calls that ran a JVM from 08:06:25 to 08:39:05 in `/home/user/fortress-literals`; the gate's result names "another agent's JVM"). So the two figures do not compare (F-240's own caveat on load; process finding 2).
- **The suites:** `testFast` 8 min 54 s against 5 min 27 s, with 38 more tests; `testSystem` 3 min 29 s against 2 min 54 s, with 13 more; `testSpecData` 48 s against 44 s. The machine block reads 'loadavg 3.11 6.32 5.29' at 08:35:58.
- **The gate:** 22.6 minutes (08:20:55 to 08:43:31), against 17.8.
- **F-240** now gives this gate's figures (the commit stage, `f56d6516`). Its comparison clause covers the distance stage only, so climb batch 27's count-stage figure left the entry (`FACTS-history.md` keeps it; the commit stage's result).

### 3. The cost, by role, against the record and the batches before, and in three spans

**The run wrote 6.65M over 20 transcripts for 20 launches, in 6 h 16 min** (02:32:12 to 08:47:43 UTC; `tx.py`; `batch-measures.py` gives the same 6.65M). No agent was retried or killed. Two agents ran at a time.

By role (writes, then share):
- Rung workers (7): 2.77M, 41.7 %.
- Skeptics (7): 2.50M, 37.6 %.
- The judge of R: 164K, 2.5 %.
- The disk check, new: 63K, 0.9 %.
- Gather: 444K, 6.7 %.
- Merged-diff review: 401K, 6.0 %.
- Gate: 149K, 2.2 %.
- Commit: 158K, 2.4 %.
- Per landed rung, all roles: 0.95M.

Against the batches before (B25, B26, B27, B28):
- Rung workers: 2.93M (7, and 219K killed); 990K (4); 2.26M (10); 2.77M (7).
- Skeptics: 1.15M (7, and 229K killed); 707K (4); 1.33M (9); 2.50M (7).
- Judges and repairs on a rung: 0; 0; 231K; 164K.
- Gather: 1.07M; 333K; 390K; 444K.
- Review: 238K; 204K; 271K; 401K. Its judge and repair: 0; 0; 368K; 0.
- Gate: 99K; 204K; 213K; 149K. Commit: 96K; 113K; 118K; 158K.
- Total: 6.03M; 2.55M; 5.17M; 6.65M.
- Rungs landed, agents: 7, 20; 4, 12; 8 of 10, 30 and one empty; 7 of 7, 20.
- Span: 4 h 47; 2 h 27; 5 h 22; 6 h 16.
- Per landed rung: 0.86M; 0.64M; 0.65M; 0.95M.

**Against the record:** "About 4.6M tokens written for the seven rungs ... From 4.1M if the workers write as climb batch 27's did, to 5.5M with a judge and a repair round on one rung" and "About 5 hours 15 minutes, at two agents at a time" (`CLIMB-BATCH-28.md`, section 2, "Cost").
- **6.65M, 45 % over the estimate and 21 % over its high end.**
- The workers wrote 2.77M against 2.25M: V 550K against 0.45M, R 420K against 0.35M, A 463K against 0.45M, K 315K against 0.3M, H 375K against 0.3M, S 307K against 0.2M, T 341K against 0.2M.
- **The skeptics wrote 2.50M against 1.3M**, the most of the overrun: V 396K, A 392K, R 303K, K 326K (estimated 0.22M), T 302K, H 499K (204K of it one cache refill, below), S 279K; mean 357K, against 164K to 181K in climb batches 25 to 27 and 321K in 24. They made 16 fix commits and filed 7 rows (climb batch 27: 9 and 3). The estimate took climb batch 27's skeptics, 157K to 225K, who worked on a full disk (`reviews/batch-27-review.md`, section 7, point 2).
- The fixed roles wrote 1.15M against 1.05M: the gather 444K against 0.45M, the review 401K against 0.28M, the gate 149K against 0.2M, the commit 158K against 0.12M. The disk check (63K) and the judge (164K) were in no figure.
- **The time:** 6 h 16 min against about 5 h 15 min. The workers ran 411 minutes in all against the record's 325: V 52.8, A 88.9, R 75.3, K 45.9, H 68.6, T 38.5, S 41.2.

**The order of the run.** The disk check at 02:32:12. V and A at 02:32; R at 03:25 when V returned; K at 04:01 (A); H at 04:40 (R); T at 04:47 (K); S at 05:25 (T). The skeptics: V's at 05:49 (H returned), A's 06:07, R's 06:10, K's and T's 06:34, H's 06:56, S's 07:05. R's skeptic returned "contested" at 06:34; its judge ran after the last skeptic, 07:23 to 07:27. The gather at 07:27:42, the gate and the review at 08:20:55, the commit at 08:43:33.

**The cost in three spans, each on its own** (the `coordinator` skill's `references/batch.md`, "The landing", step 3). Each span is `spend.py <start>` less `spend.py <end>`, over the same folders: the session's agents (`…/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/`), the workflow folders under it, the project folder of headless sessions (`/root/.claude/projects/-home-user-fortress/`), and, new, the landing worktree's project folder (`-home-user-fortress-landing-27`). The coordinating session's own transcript is left out, as `spend.py` does. A transcript counts in the span where it last changed.

- **Span 1, the landing work of climb batch 27:** from `29e52a3dc` (11:56:19 on 11-07) to `2c3c669f8` (16:51:28). The record-landing run `wf_7c0f91a7-62c` ended earlier: its last agent, the revival-page stage, last wrote at 16:39:52, with 'exit': '2', "update.py stops"; the journal holds no times. **6.41M over 37 transcripts.**
- **Span 2, the preparation of climb batch 28:** from 16:51:28 on 11-07 to the run's first record, 02:32:12 on 11-08 (the Workflow call at 02:32:08.6; the first agent's first record at 02:32:12.247). **3.11M over 15 transcripts seen.**
- **Span 3, the run:** from 02:32:12 to `f56d6516` (08:46:24). **8.01M over 22 transcripts.**

`spend.py` over the live folders printed 10.97M from 11:56:19, 10.97M from 16:51:28, 8.59M from 02:32:12 and 0.58M from 08:46:24. Each total holds this review's transcript and the commit agent's (158K, last changed 08:47:43), which last changed after the run's end, so the differences leave them out. The live folders hold nothing written before the rebuild at 23:09. The rest comes from the backup (below, "What the count could and could not see").

- **Span 1, 6.41M:**
  - The record-landing run, 25 agents, 3.69M: sort 372K, check 369K, judge 312K, quiz reader 274K, admission 238K, page 238K, quiz author 218K, the orientation judge 178K, preserve 151K, a second quiz reader 137K, two cold reads 125K and 94K, the skill cold read 108K, the rest under 90K each. Its two headless skill-writer sessions in `/home/user/fortress-landing-27`, 14:23 to 14:59, 0.63M. Together 4.33M, against climb batch 26's 1.85M.
  - Climb batch 27's post-batch review, 497K.
  - The natives judgement worded as a review, 569K (11:21 to 12:19; it began before the span).
  - The probe of the distance's new crashes, 240K (12:36 to 13:14).
  - The batch script's push-hold fix, 277K (`3ef9a5fc`); his words on the footer fetched, 65K; the footer rule's cold read, 67K.
  - Three headless skill-writer sessions on `main`, 252K (15:23 to 15:56, 16:15 to 16:28, 16:42 to 16:48).
  - Climb batch 27's commit agent, 118K, which last changed at 11:57:11, 52 s after the span's start, so by the rule it counts here.
- **Span 2, 3.11M seen.** Each of its commits is the coordinator's, not the batch's.
  - Climb batch 27's landing tail, last changed after 16:51:28: the revival page's update, 177K (its own commit `2c3c669f8` is the span's start); P-169's record and PLAN fixes, 208K (`51c30d26`, `5d5c95df`); both skill pages, 164K. Together 0.55M.
  - **Climb batch 28's own preparation, 1.75M:**
    - the first planner, 184.5K over 43 messages, seen only to 16:55:14;
    - the planner relaunched after the rebuild, 587K (the record's commits `dadbcc51` to `d71d8124`);
    - the generator, 237K (`ef450502`; the coordinator's `a58b6e09`);
    - the Fable review, 357K (`7934836e`, `104be0b6`);
    - P-84 and P-85 widened and his answers to Q2 and Q3 recorded, 381K (`bd1174a2`, `7ba33066`; the coordinator's `945db520`).
  - **The `fortress-repo` skill's fixes from his page threads, 0.59M:** the headless writer, 59K (`e9f828f3`, `4ccaeaaf`); their cold read, 184K; the spellings fetched at their source, 83K; change 37 against POPL 2019, 259K (`5619e4ad`).
  - The `coordinator` skill's drafts 32 and 33 and the drafts page, 0.23M (two agents, 72K and 115K, and the writer's 45K, `c6122149`).
- **Span 3, 8.01M:**
  - The run's 19 transcripts that last changed by 08:46:24, 6.49M (its commit agent counts after).
  - **1.52M of the coordinator's own agents beside it**: the `fortress-repo` page's publisher, 758K (02:20 to 07:47); the row 364 probe, 327K (07:21 to 07:45, at his question of 07:20); the literals study, 438K (08:04 to 08:39, at his request of 07:5x).

So the landing of climb batch 27 wrote about as much as the run of climb batch 28, and the preparation that the count could see wrote about half of it. The spans of climb batch 27's review were 2.80M, 29.54M and 5.97M. Its first span missed 0.60M: the two headless writer sessions of climb batch 26's record-landing in `-home-user-fortress-landing-26` (23:38 to 00:06 on 11-06), a folder its list did not hold (process finding 10).

**What the count could and could not see.**
- It saw the live container's transcripts since the rebuild at 23:09, by their mtimes. It saw the transcripts that only the backup holds (`/home/user/fortress-transcripts-blinded/projects/`), by their last record's time, since a backup copy's mtime is its checkout's. On the 35 live transcripts the two times differ by 0.1 s at most.
- **It could not see the old container's writes from its last backup snapshot to the loss.** The backup's last pass before the loss is at 16:55:16 on 11-07 (`git log` of `transcripts-blinded`; the next is 23:19:27). The first planner's transcript there ends at 16:55:14; what it wrote after that, up to 6 h 14 min, is lost with the container, and it committed nothing (`c0caaf48`, the boot note).
- No other work fell in that gap: the coordinating session has no message between 16:55:15 and 23:10 in either copy of its transcript, and no commit falls between 16:53:15 and 23:21:41.
- The gap's cause is the backup's known blind spot. It runs when a turn of the main session ends (`cloud-container`, `references/hooks.md`), and no turn ended while the first planner ran with no check-in armed (process finding 3).
- **The coordinating session's own writes**, which `spend.py` leaves out by design, from its live transcript, which since the rebuild holds 11-07 from 06:47 on: 0.30M in span 1, 1.15M in span 2, 0.12M in span 3. The pre-loss copy in `fe616d40-a9c6-56d7-9da1-7168a172765d.until-2026-11-07T23-09.jsonl.parts/` ends at 16:55:13 and agrees for span 1.
- Reads from the cache are not counted.

**The briefing's use and cost:**
- **15 of 15 briefed agents read their briefing, 100 %: the seven workers, the seven skeptics and the judge of R. None read it in its first turn.**
  - The first briefing call came at calls 3 to 21 and messages 3 to 19, 14 to 95 s after each agent's start (`brief.py`).
  - Workers: V call 21, 95 s; A 19, 87 s; R 18, 86 s; H 19, 85 s; K 17, 75 s; T 15, 66 s; S 6, 27 s.
  - Skeptics: R 3, 14 s; V 6, 25 s; H 11, 38 s; T 13, 42 s; S 18, 62 s; K 15, 63 s; A 19, 68 s. The judge of R: call 6, 21 s.
  - The disk check, the gather, the review, the gate and the commit stage have no briefing by design.
- **Each agent read every part, each part in a call of its own** (`parts.py`: every briefing ends 'end of part N of N, the last'). Rung A saved its command to a script and ran parts 2 and 3 from it, one call each. Climb batch 26's process finding 4 held.
- **Its results came to about 204K tokens, 3.1 % of writes**, at 0.40 tokens a character plus 110 a call. Workers 129K: A 30.1K, V 24.7K, R 23.8K, H 17.5K, S 13.4K, T 10.8K, K 8.8K. Skeptics 64K: A 18.9K, V 11.7K, R 10.3K, H 7.1K, S 6.8K, T 4.9K, K 4.7K. The judge 10.3K. About 14K a launch.
- Against the batches before (briefed, read, at calls, seconds, share):
  - B24: 14, 14, 11 to 19, 48 to 92, 4.2 %.
  - B25: 16, 16, 3 to 18, 15 to 132, 4.4 %.
  - B26: 8, 8, 5 to 13, 21 to 89, 5.2 %.
  - B27: 15 of 19 launched, 15, 4 to 16, 16 to 78, 6.2 %.
  - B28: 15, 15, 3 to 21, 14 to 95, 3.1 %.

**Other measures.**
- **First calls:** 982K (14.8 %), 8 cold (`batch-measures.py`): the disk check, rung V (the run's first full prefix), skeptic V (the first skeptic), the judge, the gather, the gate, the review, the commit. Every later worker and skeptic read a warm prefix of about 52K. At climb batch 27, 1.29M and 10 cold.
- **Cache refills: 1, 204K (3.1 %)**, skeptic H at 07:11:28. Its call 58 ran four `timeout 120` runs of a program that hangs (row 938) in the foreground, 490 s in one call. That is past the prompt cache's five minutes, so its next message wrote 203,710 tokens (`gaps.py`; process finding 5).
- **Refusal cycles: 1 rung, 164K (2.5 %):** R's skeptic contested its own defect fix `c00f51c2d`, and the judge ruled "stands".
- **The skill's load** (`skill-load.py`, 20 agents): 1.10M, 16.5 %. Load text 161K (2.4 %) and 940K over 262 part reads (14.1 %), against 16.0 % at climb batch 27. 19 agents loaded `fortress-repo`; the disk check did not.
  - `revival-changes.md` was read 21 times (186K), by the gate and the commit stage too, which `SKILL.md` exempts (process finding 8).
  - `compiler.md` is now 30,491 characters. So rung A's and skeptic A's `cat` of it was saved to a file and read again, two calls each (process finding 7).
- **Builds** (`batch-measures.py`; `runs.py`): one per code state. Rungs S and K each built twice, each time after a change of code. S dropped a first design's static at 05:3x and rebuilt at 05:39:31. K added `PartialOrderJUTest` and rebuilt at 04:18. V and H each ran one library order. The gather built the merged tree once (39 s). The gate's build took 4 s with the caches kept.
- **Rows:** 13 opened (930 to 942), 939 made a duplicate of 932. 12 closed in `cb51060dc`: 858, 859, 502, 856, 900, 901, 902, 926, 929, 930, 895, 733. Rewritten: 349 (narrowed), 431, 928, 466, 527, 324, 896. Noted: 927, 82.
  - `ledger.py landing-check 157323e51759f4a46423deab7c35990af7be5a9c`: '157323e51..HEAD: no finding'.
  - `ledger.py check`: '941 rows, 0 fail the template'.
  - `record.py check --base 157323e51`: '0 failures', with 228 FACTS entries over 600 characters (220 at climb batch 27's review).
- **The disk:** 22.7G free at the launch (the disk check, `df -P`, 23,761,488 KB, against the script's floor of 14.5G), and 15G at its lowest, at the gather and the gate. So about 1.1G a rung, with `ant testQuick` in six of seven. The commit stage removed the seven worktrees (22.9G free at this review). Climb batch 27's process finding 2 held.

Per agent, in order of start (UTC; ids are the transcripts' `agent-<id>.jsonl`; messages are distinct message ids):
- Disk `a06a2d9d`: 63K; first call 61K, cold; 2 messages; 0.1 min; 02:32.
- Rung V `acf34c6b`: 550K; 78K, cold; 196; 52.8; 02:32 to 03:25.
- Rung A `ac0ffd44`: 463K; 26K; 212; 88.9; 02:32 to 04:01.
- Rung R `a240e081`: 420K; 25K; 225; 75.3; 03:25 to 04:40.
- Rung K `ac3d4025`: 315K; 24K; 162; 45.9; 04:01 to 04:47.
- Rung H `a7d289e0`: 375K; 24K; 194; 68.6; 04:40 to 05:49.
- Rung T `a21fccba`: 341K; 23K; 161; 38.5; 04:47 to 05:25.
- Rung S `a1950f39`: 307K; 24K; 172; 41.2; 05:25 to 06:07.
- Skeptic V `ab3507a3`: 396K; 82K, cold; 122; 21.1; 05:49 to 06:10.
- Skeptic A `ac846a97`: 392K; 33K; 149; 27.1; 06:07 to 06:34.
- Skeptic R `ad74e62e`: 303K; 31K; 119; 24.1; 06:10 to 06:34.
- Skeptic K `a7329d0d`: 326K; 29K; 147; 31.3; 06:34 to 07:05.
- Skeptic T `abf05837`: 302K; 28K; 106; 21.8; 06:34 to 06:56.
- Skeptic H `acf3bf12`: 499K; 29K; 105; 29.4; 06:56 to 07:25.
- Skeptic S `ade3fcce`: 279K; 30K; 115; 17.9; 07:05 to 07:23.
- Judge R `a84ef1be`: 164K; 72K, cold; 33; 4.0; 07:23 to 07:27.
- Gather `a4548ea8`: 444K; 109K, cold; 201; 53.2; 07:27 to 08:20.
- Gate `a536ebbe`: 149K; 70K, cold; 51; 22.6; 08:20 to 08:43.
- Review `af4d48a5`: 401K; 100K, cold; 145; 20.8; 08:20 to 08:41.
- Commit `a7fe1e28`: 158K; 83K, cold; 39; 4.2; 08:43 to 08:47.

### 4. The tail

- **The judge of R** (164K, 4.0 minutes): "stands" on skeptic R's defect fix `c00f51c2d`, `FileWriteStream`'s `write(x:String) = under.write(x)` (`Library/File.fss:57`). The fix keeps a rope from parallel tasks in one Java write. The skeptic's harness run showed the fault first: 'FAIL: a ZZ32: 432 =/= a ZZ32: 600; lines written by write from parallel tasks', then 'OK (8 tests)' (the review's `fixesChecked`). No revert. R.judge.1: no flush after it, where `Writer`'s flushes (`Library/Writer.fss:32-35`).
- **The gather** (444K, 53.2 minutes, 07:27:42 to 08:20:53):
  - It applied V, R, A, K, H, S, T, the manifest's order, with no conflict. Four pairs that two shared files ordered both ways kept the manifest's order (gather.1).
  - On `d839b742` it built and ran the library order. Its runs: the 14 walk files, 'OK (14 tests)'; 17 compiled `.test` files in one JVM, 'OK (31 tests)'; the specification once, 'BUILD SUCCESSFUL' twice and 0 warnings; the 52 demos, 'demos: 52 run, 52 reached their end', 07:50 to about 08:18.
  - H's repair at `Utility.java:30` turned R's `XXX` pair red on the merged tree. The gather promoted it to `FileOpsRaiseCaughtCompiled`, saw it fail on the old code ('FortressImplementationError: fortress.CompilerBuiltin$IOFailure.<init>(java.lang.Strin…', 'Tests run: 3,  Failures: 1') and pass on the merged tree, and closed row 930 by H's commit.
  - It opened rows 930 to 942, closed 12, added F-331 to F-338, rewrote F-332 and F-321, and revised Appendix I's natives effect to 372 of 424 (`changes.tex:4627-4674`). It routed 30 items and its own four into PLAN (`PLAN.md:140`, `:691-709`). The landing check found nothing on its first run. Its note to row 934 was refused for length at 07:38:56 ('-55 characters left of 700'). Its "None holds the push" was true.
- **The merged-diff review** (401K, 20.8 minutes, beside the gate): **approved**, no blocking finding. Its corrections in `5c5ec47e`:
  - F-331 stated rung V's branch totals as the count, and now gives a delta;
  - F-321, rows 928 and 324 and `PLAN.md:695` and `:707` re-anchored below other rungs' hunks;
  - three lines of `RECORD.md`.
  - It recounted the bindings (341 and 102 of 443 at the base, 372 and 52 of 424 at the head), merged the seven tips with `git merge-file` against `main`'s shared files, and filed review.1: 22 FACTS entries and about 90 rows that cite lines the landing moved (`PLAN.md:710`).
- **The gate** (149K, 22.6 minutes): green, as section 1 gives. It saw `TraitTableApiTraitApi.jar` in the caches it copied for the ladder, compiled at 07:47:41 by the gather's run of T's test (process finding 12).
- **The commit** (158K, 4.2 minutes):
  - The microGPT walk check, then `f56d6516`: the tables, the per-site list, the gather's PDF copied with its `historical:` line, F-53's title and F-240's figures by `record.py set` ('0 failures').
  - It checked the 13 commits since the base: each ends with the two footer lines, and each of the 8 outside `explorations/` and `.claude/` carries a `historical:` line.
  - It pushed `main`, `claude/worker-brief-fable-vnnuv8` and `blinded-fable`, each `2b5cc182..f56d6516` on its first try.
  - It removed the seven worktrees without `--force` and deleted their local `wip/` branches; the remote ones and `fortress-base28` stay.
  - It named F-53's sentence on `Char` as now false.

### 5. The microGPT walk check

Its verdict lines (`climb-batch-28/gate/summary.txt`, `# microgpt-walk`): "VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS" for `MicroGptAplQuick` and for `MicroGptFlatQuick`, each run ending `rc=0`. So 7 of 7 on both programs. This is the first landing with the arrays over a store in a field, the reader objects in Fortress and the checked integer getters. By the ruling of 2026-10-23 the seconds are not compared (`PLAN.md:9`). No model line changed (`git diff 157323e5 f56d6516 -- explorations/run-c4/src explorations/apl/mg` prints nothing).

### 6. The natives and the code generator after phase 4's sixth batch

- **The bindings.** By the gather's count, 372 of the one library's 424 live bindings name a helper and 52 a glue class (`RECORD.md`, "The count of the bindings"). The 52: `IntLiteral`'s 21 and `FloatLiteral`'s 3 (N5, the names batch, P-169) and `Reflect`'s 28 (Q4).
  - The moves: V −5 bindings, +6 helpers, −11 glue; R −15, +10, −25; A +7, −7; H +6, −6; S +1, +2, −1.
  - The record planned 422 and 370 with fork V1's three helper getters. V bound five, two on new helpers (V.worker.2).
  - F-32 and F-299 still read 102 and 341 of 443 on `main` (for the routing).
- **Walk answers 15 names itself:** eight in `OWN_OPERATIONS` (`interpreter/glue/NativeApp.java:47-65`, H's six beside P-167's two) and the seven of `arrayOps` by one rule (`:200`). Walk loads no helper for these names.
- **The compiled transaction tracks array slots** (A; P-169, shape (ii); `runtimeSystem/Transaction.java:25-79`, `:203-231`). Its known gaps: row 933, a livelock on the base already that slots share; rows 934 and 937, the code generator's handler order for a nested `atomic`, on the base already; A.skeptic.3, an unrecorded empty read in `init`, by reading.
- **The checker sorts by a linear extension** (K; F-334). `Char` is checked to its end; the distance has no crash.
- **`System` is read whole by the checker** (S's probe on S's tree: '@@PROBE checkApi System -> errors=0'). But `System`, `File` and `Reader` are not among the distance's fourteen components (`tools/distance/run.sh:87-90`). So no gate stage checks S's four `System` bindings on the merged tree, or R's rewritten `File` and `Reader`. F-290's "`System` 2, `File` 4" dates from climb batch 22's code (for the routing).
- **Compiled helper raises with a message reach a `catch`** (H; F-336; row 930 closed). Walk's raise carries no message (item 384).
- **The code generator:** row 733 closed (T; F-338). The same root stands at `methodsNamed` (row 940) and at the dispatch generator (row 942). F-34's 38 in 10 kinds was measured on climb batch 26's rung L tree, and its count on today's code is not measured.

### 7. The points the coordinator asked for

**1. The share of briefed agents that read the briefing: 15 of 15**, none in its first turn, every part in its own call (section 3).

**2. Re-measuring: no stage ran a build, a suite or a measurement again on a code state that another stage ran, beyond the manual's one exception and the stages' designed overlap.**
- Skeptic K ran the count stage on the base build and on the worker's head: the manual's exception ("Skeptic", `climb-batch-workflow.md`). Worker K had timed the base build at 04:14 for P-148. So the base's count stage ran twice in the run, and once before it in the planner's probe 2.
- Worker K's `pass` run (04:29:39) ran on the same commit as its `change` run (04:20:09), `9dc409c3`, since its second pass changed nothing ('the second pass taking nothing'). The skill's step 4 asks for it all the same (`compiler.md`, "The checker's time"; process finding 9). This was one stage on one code state twice, inside one agent.
- The gather ran the rungs' 14 walk files and 17 compiled files on `d839b742`. The gate ran the suites that hold them on the same code (`4347cc94` differs only in `explorations/`). Both are by the manual's design.
- The gate's build ran after the gather's on the same code. It took 4 s with the caches kept: a no-op.
- Not repeats, but runs beyond the briefs: rungs R and H ran the 52 demos on their own trees (R from 03:46, H at 05:18), which their sections do not ask; the gather ran them on the merged tree. Rungs A and R ran microGPT's quick pair on their trees, and the commit stage on the merged tree. Rung A ran the four-thread atomic runs, and the gate again on the merged tree. Each was a different code state.
- No other skeptic ran a stage or a whole suite, and no skeptic built.

**3. The checker count's new or risen rows: none.** The table equals climb batch 27's byte for byte (section 1).

**4. What the cost count could and could not see:** section 3. The first planner's writes after 16:55:14 on 11-07 are lost. The coordinator's own transcript is left out by the method and given apart.

**5. The coordinator's commits since the base,** not rung work and not judged as such: `043f3175` (07:16:47, `HELD.md`) and `2b5cc182` (07:22:05, `BOOT.md`). Both come before the gather's start at 07:27:42, which the rule allows, and both were pushed: the commit stage pushed `2b5cc182..f56d6516`. No `.claude/` path changed since the base (the commit stage's `skillTouched` is empty). The coordinator's three agents beside the run (section 3, span 3) committed nothing in the main tree before `b7ec9d75` at 08:50:37, after the push.

**6. The relayed request, again.** Every agent of the run opens with the harness's relay of "Boot light.". That is the curator's message from iOS at 02:27:29, dequeued at 02:29:48 after a compaction; the coordinator launched the Workflow in that same turn at 02:32:08 (the session's transcript, lines 2050, 2176, 2250). It cost little:
- no agent searched for it;
- the gather and the commit stage each wrote "did not conflict with this step";
- rung R wrote a section "## The relayed request" into its `REPORT.md`, which landed (`explorations/compile-ladder/rung-io-reader/REPORT.md:223-225`).

Climb batch 27's process finding 1 was not taken up: no text of the skill, the manual or the script names the relay (`grep -rni relay`). Process finding 1.

**7. The shallow clone.** The container rebuilt at 23:09 holds a shallow clone (`git rev-parse --is-shallow-repository`: true; 100 commits reachable from `HEAD`). So `a874948ac`, `75cca6683` and `sealed-tree` do not resolve, and `records.md`'s history commands fail. Eight agents met this: rungs V, R, A, K, S and T, the judge of R and skeptic S. Rung S tried GitHub's API (404); rungs fell back on copyright headers or on their sections' lists. The agents spent about 25 calls on it, and no misattribution reached a landed file. This review judged the team's files by their headers: `sudoku.fss`, `Format.fss` and `QuickCheck.fss` are the team's; the three test files the batch modified are the revival's. Process finding 4.

## Part 1. Conformance

### Method

As in `reviews/batch-27-review.md`. For each rung I read its commit on `main` and its diff against the base, its `REPORT.md` and `SKEPTIC.md` where they bear, its section of `CLIMB-BATCH-28.md` (sections 1 and 4) and its forks (section 3), the gather's `RECORD.md`, the judge's file, the run's journal results, and the code and the specification on `main`. Three standards, kept apart:
- the specification;
- the library's own way (P-27), and for compiler and interpreter code the team's code beside it;
- the decisions on record, by `facts-extract.sh`: P-161, P-162, P-164, P-167, P-169, P-170, P-148, P-58, P-37, P-39, P-79, P-33, P-84 and P-85. With them, his answers to Q2 ((ii), the slot API) and Q3 (option 1) and his word on the array goal (`HELD.md`, "Held in chat (2026-11-08)", 02:1x and 02:2x), and the forks' defaults as the record states them.

Where the batch's record and the tree disagree, the tree rules. I ran nothing of the tree; what is "by reading" is marked.

### The verdicts

- **Rung V, the integer conversions (P-161; P-169's `IntLiteral` 8; P-162's `big`): in the spirit,** with splits 1 and 2.
- **Rung R, N4's reader rung with `FileWriteStream` (P-164; item 373): in the spirit,** with splits 3 and 4.
- **Rung A, the arrays' store (P-169, Q2 (ii)): in the spirit,** with splits 5 to 7.
- **Rung K, the checker's partial order (row 929; P-148): in the spirit,** with split 8.
- **Rung H, the run time's threads (P-169): in the spirit,** with splits 4 and 9.
- **Rung S, `System`'s natives (item 355 option 1; P-170): in the spirit,** with split 10.
- **Rung T, the trait table (row 733): in the spirit,** with split 11.
- **Rulings:** the judge of R, "stands" on a contested fix. Every other skeptic approved, with corrections; one defect fix (R).

### Where the text, the brief or the principles split

**1. Two new helpers for `ZZ`'s `asZZ64` and `asNN64` (rung V; fork V1).** V1's default added no Java beyond its three pairs. But `ZZ` has no low-bits form left to wrap once its `narrow` and `widen` go, so V wrote `bigOverflowingToLong` and `bigOverflowingToUnsignedLong` (`simpleArbitraryPrecisionArith.java:146-157`) and bound them (`Library/FortressLibrary.fss:1097-1101`). P-162 has new helpers where no bare one fits. The other getters are Fortress bodies, a range test and `throw IntegerOverflow` around the low-bits form (`:771-776`), as `QQ`'s `truncate` throws `DivisionByZero`: the library's way. V.worker.2, `PLAN.md:692`. Default: as landed.

**2. `genZZ.perturb` beyond `ZZ64` (rung V; P-161).** P-161 moves the callers of `ZZ`'s `narrow` and `widen` onto `.asZZ32` or `.asZZ64` "with their values unchanged". `Library/QuickCheck.fss:322` now raises `IntegerOverflow` for a `ZZ` beyond `ZZ64`, where the old line kept 64 bits (old 'perturb 2^70+7: 1001751898', new 'perturb 2^70+7: IntegerOverflow'). The integer-conversions review's option 6 names `.asZZ64` for this line (`reviews/integer-conversions-2026-11-06.md:615`). Under walk the line is unreachable (row 387). The other moved lines (`Format.fss:70`, `:117`, `:122`; `sudoku.fss:42-43`) keep every value that fits. V.worker.1 and V.skeptic.1, `PLAN.md:691`. Default: as landed.

**3. `FileWriteStream`'s write of a rope does not flush (rung R; fork R2).** R2's default reads "its writes, flush and close over `under`, as `Writer`'s are". `Writer`'s `write(s: String)` flushes after the write (`Library/Writer.fss:32-35`). `FileWriteStream`'s does not (`Library/File.fss:57`), and that keeps the file stream's buffering. R.judge.1, `PLAN.md:694`. Default: as landed, no flush.

**4. Item 384, the exceptions' message, now differs between the paths (rungs R and H).** Fork R6 kept item 384 at its default, "they carry none". H's repair (`compiler/runtimeValues/Utility.java:30` looks up the prelude's `String` constructor) makes a compiled helper's raise carry the Java message: 'IOFailure [I/O failure:  Stream closed ]'. Walk's carries none (`interpreter/glue/StaticNativeApp.java:277-282`). The repair edits a run-time class that R's brief reserved, and H made it as a point to report (R.worker.1, R.skeptic.1, H.skeptic.1, `PLAN.md:693`; H.worker.2 points at item 384's line, `PLAN.md:674`). Item 384's text still describes the state before H (for the routing).

**5. Walk's immutable arrays: one rule for a second initialisation (rung A; fork A7; row 466).** A7 reads "the store keeps today's rule that a second initialisation of an element is ignored". That was the mutable array's rule. The base's immutable glue overwrote (`interpreter/glue/prim/PrimImmutableArray.java:73-82` at the base). With one store for both, `immutableArray[\ZZ32\](2).fill(3).fill(4)` now holds `3 3`, not `4 4` (`tests/ArrayInitOnceWalk.fss`). The two RR64 stores still write a second initialisation and answer `true` (`FortressRR64ArrayStore.java:24-27`; `ArrayOps.java:68-73`; skeptic A's correction 3), as `PrimImmutableRR64Array`'s glue did. So row 466's claim, "the compiled store's `init` keeps the first value as well", holds for the `Object[]` store only. A.worker.2 and A.skeptic.5, `PLAN.md:696`. Default: as landed.

**6. Walk's array subscript out of bounds (rung A; row 932; the record's "walk's arrays ... do not change").** The immutable array's glue gave 'Array index 7 out of bounds, length=3' at the subscript (`PrimImmutableArray.java:64-70` at the base). Both arrays now end with a raw `ArrayIndexOutOfBoundsException`, since `opr [ ]` calls `get`, not `offset` (`ProjectFortress/LibraryBuiltin/NativeArray.fss:17`, `:19`, `:29`). The brief kept `opr [ ]` as written. A.worker.5 and A.skeptic.2, `PLAN.md:699`; row 939, S's, is its duplicate (gather.3). Default: as landed.

**7. The compiled store inside a transaction (rung A; by reading).** `TXReadLocation` answers `null` for an empty slot and records no read (`runtimeSystem/Transaction.java:227`). So two transactions that `init` one element at once can both answer `true` (A.skeptic.3, `PLAN.md:700`). No row records it; by default it is left under row 466. Row 933, the livelock of a block that reads its own write across a nested commit, exits 124 on the base too ('exit 124 at 157323e5 and fe19fdad'). So it is not A's defect, but the slot path shares it. Item 74 asks which rung repairs it before the switch-over (`PLAN.md:140`).

**8. A tie among the most specific candidates (rung K; fork K2; row 935).** A tie now types by the first minimal candidate in the call's order of overloadings. `compiler_tests/TieAmongMostSpecificCompiled` dies on the base and passes on the head: a change of what the checker accepts, which K reported. That order follows the build's path as well as the program (row 935). On the one library every result is the base's (tables and `run.txt` equal; '@@AUDIT PartialOrder reads=54648 reuses=16119 differences=0'). The specification lets the run time choose among such candidates (`Specification/basic/overloading.tex:309-311`). P-148: base 92.5 s, change 99.6 s, pass 103.6 s; no slowdown of several times. K.worker.1 and K.skeptic.1, `PLAN.md:701`. Default: as landed.

**9. `printTaskTrace` reads a package-private field by reflection (rung H).** The brief kept `runtimeSystem/` out of the rung, so `nativeHelpers/runtime.java:71-90` reads `BaseTask.parent` through `setAccessible`. H.worker.1, `PLAN.md:703`. Compiled `abort` in a nested block reruns the outer block (row 937, the same mechanism as row 934, gather.2). By the specification the innermost block is the one that aborts (`Specification/advanced/parallelism-locality/transactions.tex:15-21`); the rows record the departure. Default: as landed.

**10. `args`' static (rung S; fork S3 against P-170).** S3 named "one static `String[]`" that both paths set. A static of `programArgs`' own is another copy under the compiled class loader, which loads each helper class itself (F-337). So the helpers read `MainWrapper.cachedArgs`, which the compiled main and walk's driver fill (`runtimeSystem/MainWrapper.java:67`; `interpreter/glue/prim/StringPrim.java:125`). P-170's letter, "one static that walk's driver and the compiled path's `MainWrapper` both fill", holds. No default departs.

**11. The same root at two more sites (rung T; rows 940 and 942).** T fixed `dumpMethodChaining` (fork T1). `methodsNamed` and the dispatch generator meet the api trait's name at other sites. T.worker.2 asks whether the fix moves into `STypesUtil.gatherMethods`, the checker's code, which would take P-148's measure (`PLAN.md:705`). Row 732 is not reached (T2).

### The rungs, briefly

**Rung V, `45868b113`.**
- What it did: the 25 checked getters, the four `bitsAs…` getters, the nine missing low-bits names, `ZZ`'s `narrow` and `widen` deleted with their 12 callers moved, `ZZ32`'s `big` on `makeZZfromZZ32`, `IntLiteral`'s 8 as Fortress over `asZZ` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:552-582`), and `basic-integers.tex:39-98` with the entry `revival-int-conversions`.
- Standard 1: "For integer results, overflow throws an `IntegerOverflow`." (`Specification/basic/operators/opr-overview.tex:155`).
- Standard 2: Steele's prelude, `asZZ32` on the raising native (`CompilerBuiltin.fss:581`), and `QQ`'s `truncate`.
- Standard 3: P-161 whole, P-169's 8, P-162's `big`; rows 858, 859, 502 and 856 closed, 349 narrowed; splits 1 and 2.

**Rung R, `71d1018d1`.**
- What it did: `JavaBufferedReader`'s eight methods and two factories on `fileOps` (`jbrStdIn` new); walk's carrier `JavaBufferedReaderObject`; `FileReadStream`, `Reader`, `stdIn` and `FileWriteStream` plain objects over a field, and `File` and `Reader` plain components (`Library/File.fss:18-71`, `Library/Reader.fss:17-45`).
- Standard 2: the team's `BirdyLib` `FileReadStream` (`ProjectFortress/BirdyLib/File.fss:20-34`) and rung W's `Writer`.
- Standard 3: P-164's reader side, item 373; rows 900, 901, 902 and 926 closed; splits 3 and 4.

**Rung A, `a6c884cd8`.**
- What it did: `JavaArrayStore` and `JavaRR64ArrayStore` in `FortressLibrary` (`:2438-2453`); `NativeArray` a plain component reading `cast[\T\](mem.get(i))`; walk's `ArrayOps` over an `AtomicArray` by one loader rule; the compiled `FortressArrayStore` over an `Object[]` with `TXReadSlot` and `TXWriteSlot`; `ArrayStoreJUTest` with four tasks adding into one element inside `atomic`, exact.
- Standard 2: the library's `cast` reads (F-264); Flood's 2011 store in a run-time class.
- Standard 3: P-169 at Q2's (ii), the mechanism his word on the array goal asks for, with the unboxed stores waiting for decision A (P-84, P-85); splits 5 to 7.

**Rung K, `a3eba5067`.**
- What it did: `scala_src/useful/PartialOrder.scala`, `minimal` and `linear`, at `Functionals.scala:718`, `:728-733`, `:764-783`, `CoercionOracle.scala:240-259` and `Formula.scala:610`.
- Standard 3: row 929 closed with '#crash none'; P-148's three runs and its audit; split 8.

**Rung H, `70c26e3fd`.**
- What it did: six helpers in the team's `nativeHelpers/runtime.java`; six table entries; `val` as P-162's pair; `Thread`'s four raising `FailCalled` "spawn is not compiled yet"; the `Utility` repair.
- Standard 3: P-169's threads, `abort` and trace; row 930 closed by the gather's promotion; splits 4 and 9.

**Rung S, `8ff5cb7ff`.**
- What it did: `getEnvironment` and `getProperty` on `stringOps`; `args` by `immutableArray` and `tabulate` over `programArgs.count` and `at` (`Library/System.fss:29-33`); `systemOps` kept for `CompilerSystem`.
- Standard 2: the library's own immutable-array factory, the api unchanged.
- Standard 3: item 355 option 1, P-170; row 895 closed `--test none` with its note; split 10.

**Rung T, `d839b7421`.**
- What it did: `CodeGen.firstSupertraitMethods` names the first supertrait's own declarations, so an object whose first supertrait is an api's trait compiles; `RangeInternals`' 2-D and 3-D ranges emit.
- Standard 1: `Specification/basic/traits.tex`, "Method Declarations".
- Standard 3: row 733 closed; split 11.

**The specification's revisions:** V's sentences and entry, and the natives effect revised to the merged count by the gather, each in the revision form (P-95, P-96), built once on the last text.

### The decisions consequential for him, and the readings he has not confirmed

The record put two questions to him before the launch, and he answered both: Q2 (ii), against the record's and the Fable review's recommendation of (i), on P-84 as he widened it; and Q3 (1). His standing go of 00:13 covered the launch. Every fork landed at its default, except the departures of splits 1, 3, 5 and 10, each told by its rung.

The results that stand on a reading he has not confirmed:
- **P-169 is built by V, H and A before his detailed review** (review-queue item 406, default "as decided"; the record's "point for his sight"). Item 406's own cost line now applies: "a reversal after one lands costs that rung again".
- **Item 384's default now holds under walk only** (split 4).
- **Walk's immutable arrays** keep a first initialisation and lose their located error (splits 5 and 6).
- **`genZZ.perturb`** raises beyond `ZZ64` (split 2).
- **A tie's arrow** is the first minimal candidate, in an order that is not a property of the program (split 8).

### The global questions

- **Promised against landed.** All seven rungs, 50 bindings off glue as planned, with two more helper bindings than planned. 12 rows closed. Beyond the plan: rows 930 to 942 and H's repair of row 930.
- **The record's premises that failed:**
  - the cost and the time (section 3);
  - fork V1's three helpers (split 1);
  - fork R2's "as Writer's are" (split 3);
  - fork S3's own static (split 10);
  - fork A7's "today's rule" and the blurb's "walk's arrays ... do not change" (splits 5 and 6);
  - R's brief, which reserved the run-time class whose repair its own XXX pair needed.
- **Built twice: nothing.** Five files are shared by two or more rungs, each rung at its own declarations; no conflict (`RECORD.md`, "Conflicts").
- **The library's way: yes for each,** as above.
- **Together.** H's repair turned R's expected failure into a pass, which the gather caught and promoted. Rows 934 and 937 are one mechanism, found by two skeptics (gather.2). Rows 932 and 939 are one defect (gather.3).

### Findings

Sorted by what each needs.

**Findings that would change a decision of his: none.** The landing acts against no decision on record, and every step can be undone. The items that read one of his decisions anew were raised by the rungs and are routed with their defaults: V.worker.1 on P-161's "values unchanged" (split 2), item 406 on P-169's review, item 74 on row 933. None of these needs an option of mine.

**Corrections, reasons in the record that the landing made false** (home: the record-landing workflow, by `record.py` and `ledger.py`):

A. F-32 and F-299 at 372 of 424 (52 on glue), with their lists by type, gather.4's list: F-34 (row 733), F-53 and F-54 (`Char`'s crash), F-172 (`narrow` of a `ZZ`), F-281, F-288, F-327 ("read by `ZZ`'s `narrow`"), F-328 ("the two names"), F-330 ("`FileWriteStream` stays on its glue", and its citations `Library/FortressLibrary.fss:1948-1967` and `NamingCzar.java:490-491`, now `:1983` and `:492-493`), and P-164's steps to come.

B. Beyond gather.4: F-290's "`System` 2" (S's probe reads 0, while `File` is unmeasured since R); P-167's "holds a table of the two names" (now eight and a rule); row 466's claim about "the compiled store" (split 5); item 384's text (split 4); item 406's "no rung has built it".

C. review.1: 22 FACTS entries and about 90 open rows cite lines that the landing moved, without the commit they were true at (F-35, F-44, F-63, F-78, F-85, F-175, F-180, F-255, F-268, F-276, F-279, F-285, F-286, F-302 to F-307, F-310, F-312, F-315).

D. PLAN's "Where we stand" and phase 4's lines (Part 4).

**Corrections of an entry's ground that change no decision, for the entries' histories:**
- F-240's distance figure, 205 s, was taken beside another agent's JVM as well as `testFast` (section 2).
- Climb batch 27's review counted 2.80M for climb batch 26's landing work; with `-home-user-fortress-landing-26` it is 3.40M (section 3).

**Confirmations:**
- The count's table equals climb batch 27's; the distance reads 0 with no crash, and `Char` is checked.
- microGPT's quick pair: 7 of 7 on both programs.
- The 52 demos reached their end on the merged tree.
- `ledger.py landing-check` and `record.py check`: no finding, 0 failures.
- The suites: 2,274 fast, 791 walk, 130 specification examples, 0 failures; 42 of 42 atomic runs.
- Every commit since the base, and every `wip/` branch, ends with the plain footer, with no model named (`git log --format=%B`, `grep -ci 'opus\|sonnet'`: 0 on each).

## Part 2. Did the practice hold

### The skeptics' fixes

From `RECORD.md`, "Each rung", and the review's `fixesChecked`: 16 fix commits, one a defect, one contested and upheld.
- V: `616d1a23`, `b9ef9982` (corrections).
- R: `c00f51c2d` (**defect**, contested, upheld) and `c7d72a1a9` (row 931, citations).
- A: `9dce37e3`, `c85e31f1` (corrections, row 934).
- K: `09d8b374` (the tie test), `23555a60`, `05c4c881` (row 936).
- H: `3bbb7163` (rows 937 and 938, the "innermost" sentences).
- S: `3932dee8` (two arguments passed), `045d2a5b` (row 939).
- T: `c6d6f51f` (a trait too), `a3a1f5c2`, `ee2eb5fd` (row 942), `b6edfa4d`.

The skeptics found 7 of the 13 rows (931, 934, 936, 937, 938, 939, 942) and R's defect. Against the batches before: 27 made 9 with 1 defect, 26 2 with 0, 25 7 with 0. Each worker's test failed first through the harness, by its report (V 'Tests run: 3,  Failures: 2'; R 'Tests run: 2,  Failures: 2'; A, K, T 'Tests run: 3,  Failures: 3'; H 'Tests run: 2,  Failures: 2'; S 'Tests run: 4,  Failures: 4').

### The merged-diff review

- **Approved**, seven corrections, one item (review.1).
- It did not name what lay outside its brief: the shared brief's sentences, the cost, the load beside the gate, and the absence of `File`, `Reader` and `System` from the distance's components.
- It wrote nothing outside `explorations/`, and no held list or boot note (climb batch 27's process finding 6, held).

### Builds and runs, repeated or not

Section 7, point 2. Every rung but T ran `ant testSystem` once, and every rung but K and T ran `ant testQuick` once, after its last code change (fork 2). K ran `ant testQuick` once after its pass; T ran neither and left the tracks to the gate. Every rung but T ran both stages once on its final tree, and K three count runs by P-148. The specification was built by V in its tree and by the gather once.

### Refusals by the harness and the tools

- **No permission refusal.** `sleep` was refused twice: rung K at 04:04:06 and skeptic T at 06:41:29, each 'Blocked: sleep … To wait for a condition, use Monitor'.
- **Rows refused for length:** the gather's note to row 934 (section 4).
- 34 error results in all: 6 a `wait_for` cap of 240 s, 2 the `sleep` refusals, and the rest a test, a probe or a tool failing as its caller expected, among them `ledger.py check` on placeholder rows and the shallow clone's 'Not a valid object name a874948ac'.

### The commit stage's fold of FACTS

It changed F-53's title to climb batch 28's and kept its totals. It wrote F-240's figures: the count stage 99 s by file times, the distance 205 s (135 s) at load 3.42. `record.py check --base 5c5ec47e` printed '0 failures'. It named F-53's sentence on `Char` as false and left it, as its brief asks.

### The practice's measures, batches 25 to 28

(B25; B26; B27; B28.)
- Written: 6.03M (5.58M finished); 2.55M; 5.17M; 6.65M.
- Launches lost to restarts or the disk: 2, 0.45M; 0; 8 and a gate, 0.42M; 0.
- Per landed rung: 0.86M; 0.64M; 0.65M; 0.95M.
- First calls: 0.83M, 8 cold; 0.62M, 6 cold; 1.29M, 10 cold; 0.98M, 8 cold.
- Cache refills: 3, 1.07M, 17.7 %; 1, 94K, 3.7 %; 0; 1, 204K, 3.1 %.
- Refusal cycles: 0; 0; 3 rungs, 231K; 1 rung, 164K, 2.5 %.
- Rulings and repairs on the merged tree: 0; 0; 368K; 0.
- Skeptic fix commits (defects): 7 (0); 2 (0); 9 (1); 16 (1).
- Distance: 0, 288 checked; 0, 304 of 306; 0 with two crash rows, `Char` unchecked; 0, no crash, 372 of 424 helper bindings, `Char` checked.
- Count stage at the gate: about 160 s; 180 s; 80 s; 99 s.
- Distance stage at the gate: 271 s; 246 s; 144 s; 205 s at load 3.42.
- Skill's load: 11.4 %; 13.9 %; 16.0 %; 16.5 %.
- Briefing, estimated: 4.4 %; 5.2 %; 6.2 %; 3.1 %.
- microGPT quick pair: 7 of 7 both, each time.

The figures of B25 to B27 are `reviews/batch-27-review.md`'s.

### Climb batch 27's findings, a batch later

1. The relayed request: **met again** ("Boot light."; section 7, point 6).
2. The disk: **held.** The script's check read 22.7G at the launch; no write failed.
3. The journal: **held.** All 41 lines parse.
4. A new crash in the distance turning nothing red: not met; K removed the crash, and item 403 stays his.
5. A footer that names a model: **held**, on `main` and on every `wip/` branch.
6. The review editing the held list: **held.**
7. The coordinator's commits in the batch's window: **held.** Both came before the gather's start, and both were pushed.
8. A rung landing with no skeptic: **held.**
9. The gather's "None holds the push" against a stopped demo: **held**, 52 of 52.

### Process findings

Numbered for the coordinator, who improves the batch script and the practice from them between batches.

1. **The relayed request again.** The coordinator launched in the turn of his message "Boot light.", and every agent read it as "the only user voice in this task … this request wins". Proposed (mine), as at climb batch 27: call `Workflow` only from a `send_later` check-in turn, or in a turn whose latest human message is the go itself; and have the shared brief say that a relayed text that names no part of the batch is out of its scope. Home: the `coordinator` skill's `references/batch.md`, "The go"; the script's shared brief.
2. **The coordinator's JVM-running agents beside the run and the gate.** The literals study (08:04 to 08:39) ran 39 JVM calls beside the gate's distance stage and suites, so F-240's distance figure was taken at load 3.42. The row 364 probe (07:21 to 07:45) ran 35 beside skeptics S and H, the judge and the gather's start. Both were his requests, and each could have waited for the push at 08:46. Proposed (mine): from the gather's start to the commit stage's end, the coordinator starts no agent that runs a JVM; and the gate's machine block names the JVMs that run when a timed stage starts. Home: `references/batch.md`, "While it runs"; the script's gate brief.
3. **The backup's six-hour gap, and the first planner lost.** No turn of the main session ended from 16:55 to the loss, since no check-in was armed while the first planner ran. So the backup took no snapshot, and the planner's work after 16:55:14 was lost uncommitted. The relaunch armed one and committed as it went. Proposed (mine): arm a check-in whenever an agent runs with no turn of the session's due (`cloud-container`, `references/hooks.md`, already says that check-ins end turns). Home: `references/batch.md` or `delegating.md`, before a planner's launch.
4. **The shallow clone after a rebuild.** Eight agents could not reach the team's history (section 7, point 7). Proposed (mine): after a rebuild, unshallow the main clone (`git fetch --unshallow origin`, not tried here) and check `git rev-parse --verify a874948ac`; until then, `records.md` names the fallback, the file's copyright header. Home: `cloud-container`'s `references/container-loss.md`; `fortress-repo`'s `records.md`, "The repository's history".
5. **A foreground call past the cache's life.** Skeptic H's four `timeout 120` runs of a hanging program in one call took 490 s and cost a refill of 204K. Proposed (mine): the skeptic brief has a program that may hang run in the background with one `timeout`, its wait alone. Home: the script's skeptic brief.
6. **The cost estimate.** 6.65M against 4.6M. The skeptics' base was climb batch 27's, taken on a full disk; this batch's skeptics averaged 357K. Proposed (mine): about 0.35M a skeptic where the rung edits Java and the library, and about 0.9 hours a rung at two agents at a time. Home: the manual's "Preparing a batch record".
7. **`compiler.md` past 30,000 characters** (30,491). Two agents' `cat` was saved to a file and read again (about 25K together). Proposed (mine): trim it below 30,000, or split "The checker's time" off. Home: the skill writer.
8. **The shared brief misstates the skill on `revival-changes.md`.** It says to read it whole "which its SKILL.md says every task needs"; `SKILL.md` exempts a task that only runs a build, a suite, a stage of the gate or a commit. The gate and the commit stage read it (about 19K). Proposed (mine): the preamble names the roles that read it. Home: the script.
9. **P-148's `pass` run when the second pass changes nothing.** It measures the change's commit again (section 7, point 2). Proposed (mine): step 4 runs `pass` only where the second pass changed code, and otherwise cites `change`. Home: `fortress-repo`'s `compiler.md`, "The checker's time", step 4.
10. **`spend.py`'s folders.** A record-landing's headless writer sessions live in the landing worktree's project folder, which climb batch 27's review left out. Proposed (mine): `spend.py`'s header names `-home-user-fortress-landing-*`; and for a span before a rebuild, the review reads the backup by each transcript's last record, as this one did. Home: `tools/spend.py`.
11. **`File`, `Reader` and `System` are outside the distance's fourteen.** S's moved bindings and R's rewritten components are checked by no gate stage on the merged tree. P-58 holds for the bindings in `FortressLibrary`, and S ran its own probe. Proposed (mine): the distance's list gains `System`, `File` and `Reader`, microGPT's imports (F-290), or the gate runs S's `checkApi` probe. Home: `tools/distance/run.sh` and the manual's "Gate"; this is the coordinator's call, since P-39 keeps the stage report-only either way.
12. **A test api's jar in the main tree's caches.** The gather's compiled test runs left `TraitTableApiTraitApi.jar` in `default_repository/caches/`, which the gate copied for the ladder; nothing compared differently. Proposed (mine): the gather's `junit.sh` runs use a private caches folder. Home: the script's gather brief.

### Misses, by kind

Numbered on from `batch-27-review.md`'s 961.

Found inside the batch:
- **The planner's text wrong, caught before landing:**
  - 962, fork V1's three helper bindings, five landed (split 1);
  - 963, fork R2's "as Writer's are" (split 3);
  - 964, fork S3's own static, another copy under the class loader (split 10; F-337);
  - 965, fork A7's "today's rule", the immutable glue's being the other (split 5);
  - 966, the blurb's "walk's arrays ... do not change" (split 6);
  - 967, R's brief reserving the run-time class that its own XXX pair needed (split 4).
- **A defect of a change, caught before landing:**
  - 968, R's rope written one leaf a Java write, lines from parallel tasks interleaved (skeptic R, `c00f51c2d`);
  - 969, H's repair turning R's XXX pair red, caught and promoted by the gather.
- **A test that reached too little:** 970, K's without a tie, T's without a trait, S's without arguments (`09d8b374`, `c6d6f51f`, `3932dee8`).
- **A defect without its home:** 971, rows 931, 934, 936, 937, 938, 939 and 942 (the skeptics).
- **A defect left without a row:** 972, A.skeptic.3's empty read in `init` (split 7).
- **Sentences and citations made wrong and not listed:**
  - 973, V's test comments and F-32 (`616d1a23`, `b9ef9982`);
  - 974, citations and sentences of K, A, H, T, S and R (`23555a60`, `9dce37e3`, `3bbb7163`, `b6edfa4d`, `045d2a5b`, `c7d72a1a9`);
  - 975, F-331's branch totals, F-321's, rows 928's and 324's and two PLAN lines' citations, and three lines of `RECORD.md` (the review, `5c5ec47e`).
- **One mechanism filed twice:** 976, rows 934 and 937, and rows 932 and 939 (gather.2, gather.3).
- **Process:**
  - 977, the relayed request;
  - 978, the gather's note to row 934 refused for length;
  - 979, skeptic H's 490 s call and its refill;
  - 980, the shallow clone;
  - 981, `compiler.md` saved to a file twice;
  - 982, the cost estimate;
  - 983, two `sleep` calls refused.

Found by this review:
- 984, the coordinator's JVMs beside the gate's timings (process finding 2);
- 985, the backup's gap and the first planner lost (process finding 3);
- 986, climb batch 27's review missing 0.60M in its first span (process finding 10);
- 987, the shared brief's sentence on `revival-changes.md` (process finding 8);
- 988, P-167's "two names" and F-290's `System` made false, outside gather.4's list (finding B);
- 989, row 466's claim, false of the RR64 stores (split 5);
- 990, item 384's and item 406's texts made false (splits 4, and "The readings");
- 991, the batch record's forks and points for his sight missing from PLAN (Part 4);
- 992, `File`, `Reader` and `System` outside the distance (process finding 11);
- 993, `interpreter.md:128` incomplete, outside the gather's list (Part 3).

**Against the earlier notes.** 22 found inside the batch (962 to 983), against climb batch 27's 20, for seven rungs against eight. One fault of a change landed and was cured inside the batch (969). None is known to stand in the landed tree but the rows the batch filed.

## Part 3. For the skill writer

The sentences of the skills that the batch made false or incomplete, from `RECORD.md`'s "Left for the coordinator and the skill writer" and the rungs' reports, each with the entry or row that now grounds the true sentence. The batch wrote no skill text (`git diff --name-only 157323e5 f56d6516 -- .claude/` prints nothing). I read each on `main` at `f56d6516`. The proposed wording is mine; the writer keeps the skill's form.

**False, on the gather's list:**
1. **`fortress-repo`, `references/interpreter.md:98`**, the carriers' list, which lacks the reader trait. Ground: F-332; P-164. Proposed, beside the writer's item: "`JavaBufferedReader`, the library's reader trait, in `compiler/runtimeValues/FortressBufferedReader`, through a private native object below it;".
2. **`references/compiler.md:76`**, "So the transaction tracks the variables that the block touches.", which lacks the array slots. Ground: F-333; P-169. Proposed: "So the transaction tracks the variables that the block touches, and, through `TXReadSlot` and `TXWriteSlot`, each element of the one library's compiled array store by its array and index."
3. **`SKILL.md:123`**, "Inside an `atomic` block, the compiled code tracks each mutable variable that the block reads or writes". The same addition holds, once the compiled path reads the one library (until the switch-over, compiled programs use the prelude's arrays). Ground: F-333.

**Incomplete, made so by the batch, not on the list:**
4. **`references/interpreter.md:128`**, "So raise from a helper only an exception that both libraries declare as an object, as `DivisionByZero` and `IntegerOverflow`." Since H, `Utility.makeFortressException(name, msg)` raises the exception with the message on the compiled path, and walk raises the library's object without it. Ground: F-336; row 930 closed; item 384. Proposed, after the sentence: "With a message, `makeFortressException(name, msg)`: the compiled path's exception carries it; walk's carries none (review-queue item 384)."
5. **`references/compiler.md`, its size**, 30,491 characters, past the tool's 30,000 (process finding 7).
6. **`references/revival-changes.md`, "Numbers"**, which has no sentence for P-161's checked getters: `ZZ` converts out only by its five getters, each `as…` raises `IntegerOverflow`, the `bitsAs…` keep the bits, and the low-bits names are on every type where they apply. For the orientation update; F-331 brings it.
7. **`references/records.md`, "The repository's history"**, whose `git diff a874948ac -- FILE` fails in a shallow clone (process finding 4); and **`cloud-container`, `references/container-loss.md`**, which does not name the shallow clone. The second goes to the coordinator's own skill writer, since the record-landing workflow's writer brings `fortress-repo` alone.
8. **`references/compiler.md`, "The checker's time", step 4** (process finding 9).

**Sentences that hold, met by the batch:**
- `committing.md`, "End every commit message with this footer, exactly": held, 13 of 13.
- `compiler.md:178`, "about 80 to 180 seconds": 99 s at the gate, 92 s to 104 s in K's runs.
- `gate.md:3`, "in about 25 minutes": 22.6.
- `session.md`'s wait cap of 240 s: held in every `wait_for`. One foreground run went to 490 s (process finding 5).
- `SKILL.md`, "Numbers are siblings ... A wider type declares a `coerce` from each narrower one": true; the getters do not nest the types.

## Part 4. Routing

Checked against `main` at `f56d6516`: the gather's PLAN entries (`4347cc94`), the review's (`5c5ec47e`), the review queue and the ledger. The push is done, so the hashes are final.

**Step by step** (the manual, "After the landing: the coordinator's routing"):
1. The landing report: owed now.
2. The routing: owed; the list below.
3. FACTS: the commit stage folded F-53 and F-240, the gather the new entries; owed: findings A to C.
4. The skills: the record-landing workflow's skill update, with Part 3 and `RECORD.md`'s "Revival changes, for the skill writer" (V, R, A and H; K, S and T none). Then the orientation update on F-331 to F-338, F-321, F-332, F-53 and F-240, and on what findings A and B change (`git diff 157323e5 f56d6516 -- explorations/coordinator/FACTS.md`; POSITIONS unchanged in the batch).
5. The next batch, after step 4.
6. This review: committed by the coordinator as `explorations/reviews/batch-28-review.md`, with its INDEX line.

### The list for the record-landing workflow, one line each with its home

**Rows the batch filed or rewrote, open:**
- Row 931 (R's skeptic; a character past U+FFFF in a file reads as two `Char`s): no PLAN line; with rows 872, 915 and 927, the U+FFFF family.
- Row 932 (A): A.worker.5 (`PLAN.md:699`); row 939 its duplicate.
- Row 933 (A): item 74 (`PLAN.md:140`).
- Rows 934 and 937 (the skeptics of A and H): A.skeptic.1 (`PLAN.md:695`), gather.2 (`:707`).
- Row 935 (K): K.worker.1 (`PLAN.md:701`).
- Row 936 (K's skeptic; walk's load check refuses an overlap covered through a further `comprises`): no PLAN line; with walk's load-check rows.
- Row 938 (H's skeptic; a spawned thread that ends abruptly never becomes ready): no PLAN line; beside row 82.
- Rows 940 and 942 (T): T.worker.2 (`PLAN.md:705`). Row 941 (T): T.worker.1 (`:704`).
- Rewritten: 349 (V, narrowed; the prelude's half goes with the prelude, P-38), 431 (`PLAN.md:691`), 928 (item 385, `:675`), 466 (`:696`, `:700`; its claim, finding B), 527 (`:284`), 324 (`:710`), 896 (`:66`). Noted: 927 (`:51`), 82 (no line by `grep 'row 82'`).

**Rows closed** (858, 859, 502, 856, 900, 901, 902, 926, 929, 930, 895 and 733 by `cb51060dc`): each PLAN mention to `PLAN-history.md`: `PLAN.md:75` (858, 859, 502), `:54` and `:130` (926), `:10`, `:63`, `:685`, `:709` (929), `:693` (930), `:10` and `:66` (895), `:58` (733).

**Record defaults the batch took, each to a review-queue entry** (`review-queue.md` holds none of this batch's yet):
- The forks at their defaults (`CLIMB-BATCH-28.md`, section 3): one entry for the whole batch (1 to 6) and one per rung, default as landed, with the departures V1, R2, A7 and S3 named (splits 1, 3, 5, 10).
- The points the record lists for him (`CLIMB-BATCH-28.md:450-456`) and its point for his sight, P-169 built by V, H and A (item 406): one line each.

**Items for the curator:**
- In PLAN: item 74, and the lines under "Climb batch 28, listed for his review" (`PLAN.md:691-710`), as `RECORD.md` gives them.
- Missing from PLAN: the two lines above, for the record's forks and points, as climb batch 27's routing wrote them (`PLAN.md:683-684`).
- Item 68 (S and T, landed) and item 69 (`FileWriteStream`, moved with the reader rung): answered, to history.

**The review queue:**
- 373 and 377: built, to (a).
- 380: the natives effect revised again, 372 of 424.
- 384: its text after H (split 4).
- 403: K removed the crash; the item stays his for later gates.
- 406: "no rung has built it" now false.
- 319: stays; `systemOps` kept for `CompilerSystem`.
- 335: S's static is `MainWrapper`'s; the default stands.

**PLAN lines the batch built or made stale:**
- "Where we stand" (`PLAN.md:9-12`): climb batch 28's gate as the last landed, 372 of 424, the distance with no crash, "Landed" and "Next".
- Phase 4 has no line for climb batch 28: one line, landed at `f56d6516`, with this review.
- Phase 4's lines built: `:47` (the counts), `:49` (`big`), `:54` (N4's reader rung), `:56` (`NativeArray`, `Thread` and `printTaskTrace`), `:63` (row 929), `:66` (`System`'s rung), `:67`'s half on `getProgramArgsPrim` (item 319 stays), `:75` (P-161), `:96`'s last sentence (rung A). Each to history, or cut to its open part.
- `:58` (the code generator): row 733 closed, rows 940 and 942 beside, the count unmeasured.

**POSITIONS** (his text; the record writer under his rule of 2026-10-31, named to him):
- P-164's "The writer side, with `stdOut`, moves before the reader side": both sides built.
- P-167's "holds a table of the two names": now eight and one rule.
- P-169, P-170 and P-161 state as to come what the batch built.
- P-33's "`System` by the switch-over": read whole on S's tree.

**FACTS:** findings A to C; F-290 (finding B).

**The skill sentences:** Part 3, through the record-landing workflow's skill update; the `cloud-container` sentence by the coordinator's own writer.

**The manual and the script:** process findings 1 to 12, between batches; first 1, 2 and 3.

### The steps due before the next batch

1. **The record-landing workflow** (`tools/record-landing/README.md`; `args: { batch: '28', base: '157323e51', landing: 'f56d6516' }`), which routes the list above, lands, pushes, and runs the orientation update and the skill update.
2. **FACTS and the ledger:** findings A to C.
3. **The script, between batches:** process findings 1 to 12.
4. **Climb batch 29,** by the record's "After the landing": the raise-string resolver, and what the natives review's order of work leaves before the names batch, with item 74's answer before work on the compiled transaction goes on.

## What I did not do

- I built nothing and ran no Fortress program, suite, stage or JVM. I changed no file of the tree and committed nothing.
- I read the run's transcripts through scripts (`batch-measures.py`, `skill-load.py`, `spend.py`, and the scratch scripts of the header), the coordinating session's records around the launch, the journals of this run and of climb batch 27's record-landing run, and the backup's copies for the first two spans. For the preparation I read only the transcripts' labels, times and writes.
- I ran `record.py check --base 157323e51`, `ledger.py check`, `ledger.py landing-check 157323e51759f4a46423deab7c35990af7be5a9c`, `facts-extract.sh`, `grep`, `diff`, `df` and `git`, which write nothing.
- Split 7's empty read in `init`, the cause of the count stage's rise from 80 s to 99 s, and `System`'s check on the merged tree are by reading, not run.
- The team's authorship of a file is judged by its header, since the clone is shallow.
- I did not write the review's INDEX line, which the coordinator owes with its commit.

## For the curator

Climb batch 28 ran on 8 November and was pushed at 08:46 UTC. All seven tasks landed, and nothing holds.
- The integer types now convert by checked getters such as `asZZ32`, which raise on overflow; `ZZ`'s lossy `narrow` and `widen` are gone.
- File reading is plain Fortress over a Java reader, as the team's later library had it.
- The library's arrays keep their elements in a store in a field. On the compiled path this is a plain array that the transaction tracks by slot, as you chose.
- The compiler's type checker no longer crashes on calls with many candidates, so it again checks the library's `Char` type in full, and it still finds no error.
- `System` and the run time's threads and `abort` are bound for both paths.
- 50 more of the library's built-in functions now call Java methods that both paths can call: 372 of 424.
- All tests passed, the 52 team demos ran to their end, and the quick microGPT check passed 7 of 7 on both programs.

Nothing in the landing acts against a decision of yours, and every change can be undone. Five readings wait for your review, each on your list with its default:
- P-169 is now built, before your detailed review of it.
- On the compiled path a library exception now carries its message, while the interpreter's does not.
- The interpreter's immutable arrays keep a first value given twice, and lose their located error on a bad index.
- One QuickCheck line now raises on a huge integer where it used to wrap.
- A tie between equally specific overloads goes to the first in an order that the build can change.

The run wrote 6.65 million tokens in 6 h 16 min, against the plan's 4.6 million and 5 h 15 min. Most of the overrun is the checking agents, who did twice the planned work: they fixed 16 things, one a real defect, and filed 7 new gaps.

The landing work of the last batch wrote 6.4 million, about as much as this run. The preparation wrote 3.1 million that the count can see. The first planner was lost with the container on 7 November, and its work after 16:55 left no record. Three points for the coordinator:
- your message "Boot light." again reached every agent as "the user request", because the run was launched in that turn;
- two studies you asked for ran beside the run, one during the final check, so its timings were taken on a loaded machine;
- the rebuilt container has only recent git history, so agents could not read the team's original history.
