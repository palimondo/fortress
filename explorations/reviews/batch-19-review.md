<!-- The combined post-batch review of climb batch 19 (run wf_2408885e-820, base 612869b4a, 00:37 to 03:33 UTC on 2026-10-20, stopped by the VM restart of 00:41 and resumed at 00:43 with resumeFromRunId, landed at ebd39a6bd: rungs P 14e91723f and S 4190069c4, the closes fb1b182c9, the gather record 3dca83601, the review's corrections 25b55a1a1, the judge's ruling on the merged-diff review aa9632536 and its repair cf4ec59ea), owed at the landing, in the form of reviews/batch-18-review.md, by a review worker reading only, against main at f4c6fba1a (the coordinator's d3b5b812d and de6d5e5c8 inside the run's range left out; P-152 and P-45 narrowed by the coordinator at 53fdd6d34; the skill writer's 45a0ff799 and ea0a1f0a8). The measures are batch-measures.py's and spend.py's on batches 16 to 19 and transcript-study/skill-load.py's on 19; the per-site list was compared at e51759f57 and ebd39a6bd with git diff. Tokens are writes only (input plus cache creation, one count per message id). -->

# Climb batch 19: conformance, the count, the cost, the practice, and routing

## What came up in this run

### 1. The count 28 and the distance 31, row by row

**As the record expected them.** The record expected the distance 31 and the count 28, each rung's figure measured on the base's tree (rung S by the planner's `strings.patch`, rung P by the P-152 probe), their sum by reading, neither declared (`coordinator/CLIMB-BATCH-19.md:22-23`, P-39). The gate read `COUNT DOWN   30 -> 28, declared none` and `DISTANCE DOWN   34 -> 31 (-3)` (`compile-ladder/climb-batch-19/gate/summary.txt:118`, `:125`), on `3dca83601`. The review's repair changed only `Specification/appendices/changes.tex`, which no stage reads, so the gate did not run again (`summary.txt:136`, the `repair-ungated` line; the run's result, `repairReviewRerun.rerun` false).

**Each moved row of the gate's tables, tied to a rung edit:**
- `checker-count.txt`: `#total 30` to `28` and `#locations 29` to `27`. Every api row stays 0, and `#crash none` (`gate/checker-count.txt:1-18`). The two errors gone are `Library/FortressLibrary.fss:4393` and `:4394`, 'Any has no getter called asString': rung S's two `||` members of `trait String` over `Any`, now `("" || a) || self` and `self || cast[\Object\](b).asString`, in `4190069c4`.
- `distance.txt`: `kind typecheck 31 -> 29` and `class NM 2 -> 0` (the same two sites, the same edit); `kind export 3 -> 2`, `class X1 3 -> 2` and `unit component FlatString 1 -> 0`: `FlatString.fss:12`, the export error, gone by rung S's `FlatString.fsi` header `extends { String, DelegatedIndexed[\Char, ZZ32\] }` and the dropped `opr ||(a:FlatString, self)` (`Library/FlatString.fsi:16-21`), in `4190069c4`; `unit component FortressLibrary 32 -> 30` (`summary.txt:125-131`).
- No row moved by rung P: its own tree read `#total 30` and 'DISTANCE SAME   34', its skeptic's head equal by `diff`, and the instrumented count shows the new `emptyED` never reached on the library ('@@EXCL calls=691 subtypeED_true=691 ... emptyED_only=0', `compile-ladder/climb-batch-19/RECORD.md:154`).

**The per-site list** (`compile-ladder/gate/distance-sites.tsv`, `e51759f57` against `ebd39a6bd`):
- **Gone:** `FlatString.fss:12` (export), `FortressLibrary.fss:4393` and `:4394` ('Any has no getter called asString'), all rung S's.
- **Came:** none.
- **Moved:** none. Rung S rewrote the two lines in place, and rung P edited no library file.

So every moved row is rung S's. The 31 by class: the arrays 17 (V2), other body errors 9 (OT), the export errors 2 (X1), the big operators 2 (BR), a filter 1 (GF) (`gate/distance.txt:12-16`). By the record's grouping, each waits on a question of his or a later project: the arrays' 21 (ask 3), the integer power's 6 (item 58, now P-153), row 731's 3, item 46's 1 (`CLIMB-BATCH-19.md:24`).

**One more move, outside the two tables.** The ladder's microGPT phase run: `AplMgSyntax.fsi` and `.fss` still stop at disambiguate, but their first error is now "DelegatedIndexed is undefined." where it was "Char is undefined." (`gate/ladder/microgpt-phase.md:35-36` against `climb-batch-18/gate/ladder/microgpt-phase.md:35-36`). The cause is rung S's api header: the compile now reports `Library/FlatString.fsi:16:39-53` before `:19` (the gate's result, `ladder`). The gate compares phases only, so nothing turned red; nothing routed it (Part 4).

### 2. The stages' times against batch 18's gate

**The figures.**
- **The count stage**: 64.5 s at the gate, 03:13:00.99 to 03:14:05.45 UTC by its scratch files, after the ladder had ended and beside only the merged-diff review, which reads. At batch 18's gates, about 70 s and 68 s (`reviews/batch-18-review.md`, section 2).
- **The distance stage**: 153 s, `FortressLibrary` 111 s, at load 1.85 at start, beside the library order (started the same second, 02:56:17) and `testFast` (from about 02:57) (`gate/distance.txt:20-21`). At batch 18's gate, 173 s, `FortressLibrary` 122 s, at load 0.12, beside `testFast` (`climb-batch-18/gate/distance.txt:22-23`).
- **The suites**: `testFast` 5 min 22 s against 5 min 15 s, 2,068 tests against 2,058; `testSystem` 2 min 54 s against 2 min 46 s, 664 tests against 656; `testSpecData` 54 s against 55 s (`summary.txt:61-68` in both). `compileAll` 42 s, the caches started again; batch 18's landed summary is its second gate's, built from kept caches in 2 s.
- **The gate**: 20.4 minutes (02:54:47 to 03:15:08), against 20.6 at batch 18's first gate and 17.8 more at its second.

**How far load explains them.**
- **The count stage: all of it.** Neither rung changes what the stage spends its time on: rung P's `emptyED` has 0 of 4,852 profile samples and is never reached on the library, and rung S only removes two error reports (`compile-ladder/rung-existential-reduction/REPORT.md` section 7). The batch's own timed runs on checker code that did not change took 61.3 s to 75.4 s: P's base 67.8 s (load 0.71) and change 75.4 s (load 3.27, beside rung S), its skeptic's base 70.9 s (load 4.84) and head 61.3 s (load 5.41), S's after 62.5 s (load 3.23, beside rung P) (`RECORD.md:154`, `:167`). Batch 18's spread on unchanged code was 65.9 s to 76.4 s. The gate's 64.5 s sits inside both.
- **The distance stage: not by load.** It ran at a higher load at start and beside one more job than batch 18's, and was 20 s faster. The two rungs' own runs, on trees that differ from the merged one by the other rung only, took 134 s (P, 34 sites) and 169 s (S, 31 sites, `FortressLibrary` 123 s) (`rung-existential-reduction/REPORT.md:115`; `rung-string-conversion/REPORT.md:100`). A 35 s spread on near-equal code covers the 20 s; three fewer sites may save a little, which one run each cannot show. The machine's speed on the day differs between sessions (the `cloud-container` skill).
- **The suites**: the 7 and 8 s rises go with 10 and 8 more tests; the summary's machine line read load 1.57, 4.53, 3.46 against batch 18's 3.00, 5.37, 3.91 (`summary.txt:73` in both).

**Timed runs overlapped, as in batch 18.** Rung P's change run had rung S beside it, and its skeptic's pair rung S's skeptic. A worker beside the batch, the one writing the array sites' ways note (476K, 00:53 to 01:31 UTC), ran walk and typecheck programs at `nice -n 19` from 01:09 to 01:14 UTC, while rung S's suites ran; its headers show load 8.24 to 15.78. The curator dropped a lock for timed runs (batch 18's review, section 2), and no conclusion of the batch rests on these times.

### 3. The cost, by role, against the record and batches 16 to 18

`batch-measures.py` on the four runs, and `spend.py` on the agents beside the run. Batch 19 wrote **3.82M over 12 agents**, in 2 h 56 min (00:37:11 to 03:33 UTC), the two rung workers that the VM restart killed included. Without them, 3.47M over 10. The workflow's own figure, 3,582,714 over 10 agents (`totalTokens` in the run's result), is another count and is not used here.

| Role | B16 | B17 | B18 | B19 | B19 share |
|---|---|---|---|---|---|
| Rung workers | 2.49M (6) | 2.42M (5) | 1.65M (3) | 1.29M (4, two killed) | 33.6% |
| Skeptics | 1.61M (4) | 2.20M (5) | 1.31M (3) | 966K (2) | 25.3% |
| Judge, on a rung | 170K | 0 | 157K | 0 | 0 |
| Gather | 569K | 587K | 538K | 439K | 11.5% |
| Merged-diff review | 390K | 426K | 390K | 425K | 11.1% |
| Its judge and repair | 229K + 269K | 275K + 314K | 238K + 377K | 196K + 210K | 10.6% |
| Gate | 135K | 138K | 156K + 154K | 149K | 3.9% |
| Commit | 152K | 159K | 151K | 152K | 4.0% |
| **Total** | **6.01M** | **6.52M** | **5.13M** | **3.82M** | |
| Agents, rungs | 17, 4 | 16, 5 | 14, 3 | 12, 2 | |
| Span | 8 h 31 | 5 h 28 | 3 h 56 | 2 h 56 | |
| Per rung, all roles | 1.50M | 1.30M | 1.71M | 1.91M (1.73M without the restart) | |

**Against the record**, about 3.2M, from 2.9M with no contested fix to 3.9M with a judge and a repair round, and about 3 hours (`CLIMB-BATCH-19.md:47-52`). The run wrote 0.62M over the middle figure and stayed 0.08M under the top one:
- **The VM restart, 0.35M** (below).
- **The review's judge and repair, 0.41M**, for one sentence of Appendix I and one FACTS sentence.
- **Workers, 0.12M under** 1.05M: P 524K against 0.55M, S 410K against 0.50M (the resumed workers; the killed pair apart).
- **Skeptics, on estimate**: 966K against 0.95M (P 575K, S 391K).
- **The fixed roles, 0.04M under**: gather, review, gate and commit 1.17M against 1.2M.
- **The time**: 2 h 56 min against about 3 hours, at two agents at once. The tail from the review's judge to the push took 20 minutes (03:13 to 03:33); no second gate ran, where batch 18's tail took 51 minutes.

**Against batches 16 to 18.** Per rung, all roles, 1.91M is the highest of the four, because the fixed roles, about 1.2M a batch, fall on two rungs. Workers and skeptics together, per rung: 1.13M, or 0.95M without the killed pair, against 0.99M (B18), 0.92M (B17) and 1.03M (B16, with its restart).

**What the VM restart and the resume cost.** The VM restarted at 00:41:01 UTC (the boot note, `uptime -s`), with the disk intact. The run had launched at 00:37:11; its two rung workers had run 3.5 minutes each. The coordinator resumed it at 00:43 with `resumeFromRunId`, and the two workers started again at 00:43:52 and 00:43:57.
- **Tokens**: the two killed workers wrote 351K, 9.2 % of the run (P 212K, S 139K); of it, 90K was the skill's load (`skill-load.py`) and about 58K the briefing, both done again by the new workers.
- **Time**: 6 min 41 s from the launch to the new workers' start, 2 min 51 s of it after the restart.
- **What the resume kept.** Each new worker found its worktree seeded and its branch pushed. Rung P's read its predecessor's four briefing files from its scratch folder (calls 13 to 16) and did not run the briefing again. Rung S's read the killed agents' transcripts (calls 13 to 15), which the skill's steps after a stop do not include (`fortress-repo`'s `session.md:55-63`: read what is on disk), and then ran its briefing again, about 22K. The new workers' first calls were warm (37.8K read).

**Other measures.**
- **First calls**: 575K (15.1 %), 8 cold, against batch 18's 726K (14.2 %), 10 cold. Cold: the killed rung P worker, skeptic S, and the six agents of the tail.
- **Cache refills**: 0, as in batches 14 to 18.
- **Refusal cycles**: none.
- **The skill's load** (`skill-load.py`): 391K, 10.2 % (95K of load text and 296K over 115 part reads), against batch 18's 483K, 9.4 %. The killed pair's 90K is in it.
- **Distance sites gone**: 3. **Rows**: 3 closed (740, 741, 743), 5 opened (786 to 790).

Per agent, in order of start (UTC; ids are the transcripts' `agent-<id>.jsonl`):

| Agent | Id | Writes | First call | Messages | Minutes | UTC |
|---|---|---|---|---|---|---|
| Rung P, killed | a7a095f4 | 212K | 62K | 25 | 3.5 | 00:37-00:40 |
| Rung S, killed | aa0fa3df | 139K | 22K | 20 | 3.4 | 00:37-00:40 |
| Rung P | ae28fef1 | 524K | 24K | 180 | 59.4 | 00:43-01:43 |
| Rung S | a631280b | 410K | 22K | 133 | 52.4 | 00:43-01:36 |
| Skeptic S | a662fe47 | 391K | 65K | 111 | 24.4 | 01:36-02:00 |
| Skeptic P | a40cc14c | 575K | 28K | 166 | 52.1 | 01:43-02:35 |
| Gather | a44d88ed | 439K | 63K | 126 | 19.3 | 02:35-02:54 |
| Gate | a71cac67 | 149K | 54K | 41 | 20.4 | 02:54-03:15 |
| Review | a1c0981f | 425K | 63K | 92 | 18.6 | 02:54-03:13 |
| Judge, review | afc1e726 | 196K | 58K | 35 | 7.9 | 03:13-03:21 |
| Repair, review | a6e0e3bf | 210K | 57K | 47 | 6.0 | 03:21-03:27 |
| Commit | ac413dbd | 152K | 59K | 43 | 5.9 | 03:27-03:33 |

**Beside the run** (`spend.py` on the session's agents): the P-152 probe 449K (22:21 to 23:12 UTC on 2026-10-19), the planner 896K (23:17 to 00:12) and the review of the record before the launch 251K (00:14 to 00:34 on 2026-10-20): 1.60M, against batch 18's 1.29M. The planner's two probes of its own, row 697 and the `String` sites, account for its doubling; the first kept a rung out that was not ready, the second measured rung S whole before the launch. The array sites' ways worker (476K) ran beside the batch for ask 3, not for it. The landing's routing, the skill writer, its cold read and this review come after.

### 4. The tail

- **The gather** (439K, 19 minutes) applied P, then S, the manifest's order; no rung declared `landsOnlyWith`, the two shared no file, and both patches applied with no conflict (`RECORD.md:19-23`). On the merged tree: 30 walk programs, 'OK (30 tests)', and six compiled `.test` files, 'OK (11 tests)' (`:28-36`). Its two interaction programs show the rungs meet as planned: an object declared `extends Any` reaches rung P's readings as an `Object` (`SkMeetA`, `SkMeetB`, `:38-40`). It opened rows 786 to 790, closed three, folded F-258 and F-259, rewrote F-238, F-246 and F-252's sentences, and corrected the internal document's box in `future.tex:280-288` with a clause in Appendix I's Change (`:84`). Seven of the records' ledger notes were refused and two cut to fit (`:123-134`).
- **The merged-diff review** (425K, 19 minutes): one blocking finding, row 788 not named in Appendix I's Effect; four record corrections in `25b55a1a1`; two items routed to later batches (Part 2).
- **The gate** (149K, 20 minutes), green on `3dca83601`:
  - `testFast` 2,068 tests in 54 suites, the compiler track 1,270 to 1,280;
  - `testSystem` 656 to 664 (167, 167, 161, 169); `testSpecData` 130; the library track 86, the other-compiler track 263;
  - 42 of 42 atomic runs PASS; no ladder or microGPT phase moved; one microGPT first error moved (section 1);
  - its `# machine` line still reads `FORTRESS_THREADS=1` (`summary.txt:75`), batch 11's finding 8.
- **The review's judge and repair** (196K and 210K, 14 minutes): Part 2. The repair changed only a specification file, so the gate did not run again.
- **The commit** (152K, 6 minutes): the gate's tables landed, F-53 written, the specification's PDF built and committed, the quick microGPT walk check run (below), and the push to the three refs.

### 5. The microGPT walk check

- **Its lines**: `summary.txt:132-135`: "VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS", "rc=0 secs=44"; "VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS", "rc=0 secs=36". The first pair is `MicroGptAplQuick` and the second `MicroGptFlatQuick`, by the run's result (`microgptWalk`); the summary's lines still name no program (batch 18's finding 11).
- **Against batch 18**: 44 s and 38 s (`climb-batch-18/gate/summary.txt:129-132`). Both batches ran the two programs at once from empty caches with nothing beside them, at load 0.20 (batch 19, 03:27:48 UTC) and 0.38 (batch 18), by the runs' own headers, which are not committed. The planner's run of `strings.patch` gave 44 s and 36 s too (`CLIMB-BATCH-19.md:208`).
- **Reading**: the same and 2 s faster, one run each, not a pair. Neither program uses `||` (`grep -c '||'` prints 0 over `explorations/run-c4/src/*.fss` and `explorations/apl/mg/*.fss`), so rung S's members are off their path; rung P's reading runs at load, only where a pair fails the Meet Rule's search. Both programs stay inside P-30's minute.

## Part 1. Conformance

### Method

As in `reviews/batch-18-review.md`: each rung's commit, its `REPORT.md` and `SKEPTIC.md`; its section of the record and the record's review before the launch (`coordinator/climb-batch-19-review.md`); the gather's `RECORD.md`, `JUDGE-review.md` and `REPAIR-review.md`; the run's result; and the code and the specification on main. Three standards, kept apart:
- the specification;
- the team's built intent and the library's own way (P-27);
- the decisions on record: P-152, P-45, P-26 and P-27, F-246, P-91, P-148, and the record's sixteen forks at their defaults (`CLIMB-BATCH-19.md:54-82`).

### The verdicts

- **Rung P, exclusion over the whole parameter type on both paths: in the spirit**, with one wording beyond its brief, toward the paper. P-152 is built on both paths. The change made the two paths disagree on one pair on which they agreed before (row 787), and its skeptic found an older one (row 788) and a wrong message of the checker (row 789).
- **Rung S, the three `String` sites and row 743: in the spirit of F-246, P-27 and P-91, with two choices where the principles split** (below). The record called fork 11 settled; it is not.
- **No ruling on a rung.** Both skeptics approved, nine fixes, none contested. One ruling on the merged tree: the review's blocking finding, upheld and repaired.

### Where the text, the brief or the principles split

**1. Rung S's reading of `extends Any` beside the specification's own `trait Tuple extends Any excludes { Object }` (fork 11, gather.2).**
- What landed: a clause each of whose types is `Any` gets `{Object}`, as an empty one does, except in `Any`'s and `Object`'s own declarations (`ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreDisambiguationDesugaringVisitor.java:59-68`, `:76`, `:123-124`).
- The text it follows: "every trait except Any and Object implicitly extends the trait Object if it does not do so explicitly" (`Specification/basic/traits.tex:186-188`), said again after `Object`'s declaration (`Specification/basic-lib/objects.tex:159-160`); `Any`'s immediate subtypes are tuple types, arrow types, `()` and `Object` (`Specification/basic/types-vals-vars.tex:153`).
- The text it departs from: the same chapter declares `trait Tuple extends Any excludes { Object }` (`Specification/basic-lib/objects.tex:180-188`), and the revival's own Appendix I says "Object extends Any alone and Tuple likewise" (`Specification/appendices/changes.tex:423`). The specification's algebraic constraints declare their roots `extends Any` too: `UnaryPredicate`, `BinaryPredicate`, `UnaryOperator`, `BinaryOperator` (`Specification/advanced-lib/algebraic-constraints.tex:29-34`, `:45-50`, `:595-600`, `:611-616`). They are written so that both `Object` and `Tuple` can extend them: in the team's incomplete library, `Tuple` extends `EquivalenceRelation[\Tuple,===\]` and excludes `Object` (`Library/incomplete/basic/Fortress.Core.fsi:35-37`), and `EquivalenceRelation` reaches `BinaryPredicate`, declared `extends Any` (`Library/incomplete/advanced/Fortress.Predicates.fsi:17-18`, `:22-23`, `:42-43`). Under the rewrite, each such root becomes an `Object`, so `Tuple` would extend what it excludes.
- How the principles split. The team's text speaks both ways: its rule says `Object`; its own `Tuple` and algebraic roots use `extends Any` for a root beside `Object`. The team's code read `extends Any` as written, not as `Object`, on both paths (the base's `rewriteExtendsClause`, `:62-72` at `612869b4a`), and its 2007 test says "We ought to be able to extend the builtin type Any" (`ProjectFortress/tests/extendAny.fss:16`), which settles neither reading, since its object has its own `asString`. The live library is silent: no declaration but `Object`'s names `Any` alone. The peers split: Scala reads `trait T extends Any` as a universal trait, outside `AnyRef`, while Kotlin's `Any`, which every class extends, is the class root itself. Nothing reaches the split today: neither library declares `Tuple` or the algebraic roots (row 37).
- So fork 11's "the text settles it three times" (`CLIMB-BATCH-19.md:70`) and the record's review's "settled by the text three times" missed the text's own counter-examples. Rung S's skeptic found `Tuple` (`compile-ladder/rung-string-conversion/SKEPTIC.md:94`); the gather put it as gather.2 with no default (`PLAN.md:500`); the algebraic roots are this review's.
- **Was he told?** No. The record and its review called the fork settled; he slept from 00:48 UTC (02:48 his time) on 2026-10-20, before the batch's first result; the landing report waits for his next message, and the boot note names gather.2 among its decisions with "no default on record".

**2. Rung S's drop of `opr ||(a:FlatString, self)` from `FlatString`'s api, against climb batch 15's entry for that pair (fork 13, review.1).**
- What landed: the api states its component's header and drops the member, which the component never declared (`Library/FlatString.fsi:16-21`; `Library/FlatString.fss:34`).
- What it overrode: batch 15's entry, "Default: the rows as filed, the pair for item 38's answer" (`PLAN.md:423`), a default on the review list, not a decision of his. Neither the record nor the rungs nor the gather named it; the merged-diff review found it and added a sentence to that entry (`25b55a1a1`).
- The principles: the library splits with itself, its api against its component; walk refuses the pair at two `self` positions, so the component cannot take it (row 726's notes; `rung-string-conversion/REPORT.md` section 10, decision 4). The text has no passage on `String`. So the component's way, the built one, wins by the library's own standard, and the fork is in the spirit. What it gives up: the library's one instance of row 726, which a repair of row 584 under item 38 would have met (row 726's compiled test stays).
- **Was he told?** No. The sentence sits in batch 15's entry, not in batch 19's list, with no default of its own; the boot note names review.1 for the morning message.

**3. Rung P's specification words beyond its brief: "or their elements at one position" (`Specification/advanced/overloading.tex:584-586`).**
- What landed: "where the two parameter types, or their elements at one position, are or extend instances of one parameterized trait"; the brief and fork 7 gave "where the two parameter types are or extend instances of one parameterized trait" (`CLIMB-BATCH-19.md:66`, `:126`).
- Why: a functional has a single parameter, a tuple where there are several (`Specification/basic/overloading.tex:137-138`), and a tuple is no trait's instance; the brief's words alone would leave row 740's own pair outside the sentence, which the old "mention" covered (`rung-existential-reduction/REPORT.md` section 10, decision 3; its skeptic kept it, `SKEPTIC.md:137`). The paper reads tuples element by element (`Papers/Types/fig-exclusion.tick:55-57`), the team's later word (P-26). The gather copied the words into the internal document's box (`Specification/appendices/future.tex:280-288`).
- The departure is from the brief, toward the paper; the passage's revision box names the change from "mention" to the ancestors but not the elements (`overloading.tex:594-606`). In the spirit.
- **Was he told?** No. It is in the gather's points to report (`RECORD.md:157`) and on no review list.

**4. `tint` (fork 3, row 786): consequential in kind, not taken.** Walk loads `tint[\T extends Red\](x: Box[\T\])` beside `tint[\T extends Blue\](x: Box[\T\])`, and the checker refuses it, before and after. The record's review read the team's later word as pointing to the checker's refusal (`climb-batch-19-review.md`, section 1). On the review list with "both paths as they are" (`PLAN.md:498`). **Was he told?** Not yet: on the list since the P-152 probe, not yet asked.

**5. Row 787: the change made the paths disagree where they agreed.** Before rung P, walk and the checker both refused row 740's pair with `where { T extends Object }` on one declaration; after it, the checker accepts it, its code generator does not compile it, and walk still refuses it (`SKEPTIC.md:101`). By the text's reduction the pair is valid, so walk is the one that is wrong; but P-45 asks that the two paths accept the same pairs, and the record expected agreement "on every probed pair but one, tint" (`CLIMB-BATCH-19.md:28`). It is recorded: row 787, home 2, `XXXGenericPairWhereExcludesTogetherWalk`, Appendix I (`changes.tex:2871-2873`), F-258, P-152's "Left" (`53fdd6d34`). **Was he told?** Only through P-152's status line, which is the coordinator's record of what is built, not an item for him.

**6. Two smaller ones, each in the spirit.**
- **Fork 2**: walk's whole-type reading also for a generic declaration beside a plain one, beyond P-152's title ("two generic declarations"), by P-45 and "the case with none" (`basic/overloading.tex:108`). The record's review called it settled; on no list.
- **The skeptic's `excludesAtMeet`** reads no `comprises` clause at the forced instance over a static parameter still free there, so walk refuses such a pair, which the text's reduction may accept (`SKEPTIC.md:81-83`). F-258 says "and no `comprises` clause"; no ledger row, and the checker's side is not measured. The base refused all such pairs, so nothing that loaded stops.

### Rung P, `14e91723f`

**What landed.**
- Walk: `domainsExcludeTogether` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:920-1030` at `a93fb3bfd`), asked in the Meet branches of `genericPairValid` and of `validOnDeclaredDomains`'s generic-beside-plain reading; `meetParams` with one more parameter; the skeptic's `excludesAtMeet` (`:1041`); `ownGeneric`'s comment replaced (fork 9).
- The checker: `OverloadingOracle.excludes` is `sa.subtypeED(md, BOTTOM) || sa.emptyED(md)` (`ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala:326`), and `emptyED` is `reduceED`'s first premise through `replaceTypeParametersWithInferenceVariables`, its bounds not read (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeSchemaAnalyzer.scala:435-446`).
- The specification: the passage and its revision box (`overloading.tex:582-606`); Appendix I's "Overloading with static parameters", its Change, Rationale, Original text and Effect, with rows 759, 786, 787 and 788 named (`changes.tex:2845-2894`).
- Tests: `GenericPairExcludesTogetherWalk` and `GenericPairSharedSupertypeExclusion` promoted; `GenericPairExcludesTogether`, `GenericPairFreeArgumentWalk`, `XXXGenericPairFreeArgument` new; the skeptic's five walk files.

**Standard 1.** The passage reads exclusion by existential reduction, "each static parameter stands for any type within its bound" (`overloading.tex:582-589`). Both paths now load or compile rows 740 and 741's pairs, and refuse the free-argument guard. Departures, each named in the Effect: `tint` (row 786), the `where` clause (row 787), walk's object type over a static parameter (row 788), and row 759's checker pair, only with its bound unwritten (`b9711575b`). Row 789 is a message, not a departure, and is rightly left out (`JUDGE-review.md` section 5).

**Standard 2.** The precedents in the file: `oneInstance`'s union-find over a type and its supertypes, and `genericMeetCovered`'s use of `Apart` and `meetParams` (`REPORT.md` section 3); in the checker, the file's own helper, called nowhere before. The team's line changed is one, `OverloadingOracle.scala:326` (David Chase, 2012), plus a blank line; in walk only revival lines (`RECORD.md:156`).

**Standard 3.**
- **P-152**: built on both paths; rows 740 and 741 closed; walk loads the program it refused after climb batch 16.
- **P-45**: closer on rows 740 and 741, further on row 787 (above).
- **P-26**: the passage follows the paper's ancestors and tuples.
- **P-148**: base 67.8 s, change 75.4 s, no pass edit, since the profile shows no sample in the added code, as batch 18's rung K; the skeptic's pair 70.9 s and 61.3 s, tables and masked outputs equal (`RECORD.md:154`).
- **Forks 1 to 9**: the table below.

**Verdict: in the spirit.**

### Rung S, `4190069c4`

**What landed.**
- Row 743: `namesOnlyAny` and the trait case's skip of `Object` beside `Any` (`PreDisambiguationDesugaringVisitor.java:57-68`, `:76`, `:123-124`), told by the name's text (decision 6).
- The conversion, way C (`Library/FortressLibrary.fss:4393-4394`), and `FlatString`'s api (`Library/FlatString.fsi:16-21`).
- Tests: `ExtendsAnyIsObjectWalk`, `ExtendsAnyIsObject`, `ConcatAnyOnLeftWalk`; the skeptic's `XXXDuplicateExtendsEntry` pair (row 790).

**Standard 1.** The text's rule and its tuple rule (`objects.tex:198-222`) for the moved values: a tuple or `()` on the left of a string now concatenates; a function or a tuple of seven or more beside a string raises `CastError` where it raised `ProgramError` (rows 374 and 369 stay, home 2). No sentence of the specification was made false (`changes.tex:423` stays true, since `Object`'s own declaration is skipped). The split of fork 11 is above.

**Standard 2.** The library's way, `print(a:Any):() = print("" a)`, "because the formulation with concat also works for tuples" (`FortressLibrary.fss:4494-4495`), and `cast` at the bottom (`:33-37`), which no body called at `Object` before (deviation 1). The desugaring's own precedent: the empty clause made `{Object}` and `Any`'s own declaration skipped by name. The api now states its component's header (fork 13, above).

**Standard 3.** F-246 built with row 743 beside, so `extendAny` prints `Infinity`; P-91 holds (an object declared `extends Any` with no `asString` prints `Inf`); fork 14, no speed pass, the count stage's seconds reported, 62.5 s, not a pair.

**Verdict: in the spirit,** with fork 11's split his and fork 13 against a default on the list.

### The record's forks, against what landed

| Fork | Rung | Landed |
|---|---|---|
| 1, one rung for both paths | P | Built |
| 2, walk's reading beside a plain declaration | P | Built (`validOnDeclaredDomains`'s Meet branch) |
| 3, `tint` as it is, a row of its own | P | Built, row 786; its compiled half has no test (review-routed.2) |
| 4, the checker's change local to `excludes` | P | Built, through the file's helper |
| 5, bounds left out of the False test | P | Built |
| 6, P-148's pass where the profile shows | P | No sample, no pass edit; the skeptic timed |
| 7, `overloading.tex:585`'s word | P | Built, with "or their elements at one position" beyond it |
| 8, row 759 named in the Effect | P | Built, narrowed by the skeptic to the unwritten bound |
| 9, `ownGeneric`'s comment | P | Built |
| 10, the sites by the conversion alone | S | Built |
| 11, row 743 in the pre-disambiguation desugaring | S | Built; split with the text's `Tuple` and algebraic roots (gather.2) |
| 12, walk's moved values | S | As the conversion gives them, listed (`rung-string-conversion/REPORT.md` section 5) |
| 13, `FlatString`'s api, both lines | S | Built; against batch 15's entry (review.1) |
| 14, no speed pass for S | S | Built; 62.5 s after, not a pair |
| 15, item 185 left out | none | Kept |
| 16, the scope, P and S | both | Built |

### The global questions

- **Promised against landed.** Closed: 740, 741 (P), 743 (S). Opened: 786 by plan, 787 to 789 by P's skeptic, 790 by S's skeptic. Count 28, distance 31, as expected.
- **The record's premises that failed:**
  - "Walk and the checker then agree on every probed pair but one, `tint`" (`CLIMB-BATCH-19.md:28`): true of the probe's shapes; the skeptic's programs found rows 787 (made by the change) and 788 (older);
  - fork 11's "the text settles it three times" (above);
  - fork 13's silence on batch 15's entry (above);
  - rung S's decision 13, "the compiled path does not link the changed library": the compile of microGPT's `AplMgSyntax` reads `Library/FlatString.fsi` (section 1);
  - the cost, about 3.2M: 3.82M, 3.47M without the restart.
- **Built twice: no.** The review's check 1: no shared file or declaration, and main's code and tests are exactly the two branch tips.
- **The library's way:** yes for each, with the precedents above.
- **Together:** S's desugaring runs before P's readings, so a declaration written `extends Any` reaches them as an `Object`; the gather's two programs show walk now agrees with the compiled path on `SkMeetA` and refuses `SkMeetB` as the checker does (`RECORD.md:39-40`).

### Findings

Ranked by what they cost or risk next, each with its home.

1. **Fork 11's split is his, and gather.2 frames only half of it, with no default.** The specification's own `Tuple` and its algebraic roots `extends Any` would be made `Object`s; the record and its review called the fork settled. Nothing reaches it today. Home: gather.2's entry (`PLAN.md:500`) gains the algebraic roots and a default; a queue item. Proposed default (mine): as landed; when a library first declares `Tuple`, the rule (`traits.tex:186-188`) and the rewrite name it beside `Any` and `Object`, in a revision box; the algebraic roots are decided with row 37.
2. **The record's sixteen forks and its points for his sight have no entry** (`CLIMB-BATCH-19.md:54-82`), as batch 16's finding 4 and batch 18's finding 3 found before. The skill puts a fork settled by the principles on the review list. Home: one entry under "Climb batch 19, listed for his review", default as landed; the points (team lines changed in the checker's exclusion test, in `String`, `FlatString`'s api and the desugaring; walk's moved values) inside it.
3. **review.1 sits only in batch 15's entry, with no default line** (`PLAN.md:423`). Home: one line under batch 19's list pointing there, "Default: as landed".
4. **Rung P's words beyond the brief are on no list.** Home: an entry, default as landed.
5. **Rows 787, 788, 789 and 790 have no candidate line in PLAN.** P-152's "Left" names 786 to 788, F-258 and Appendix I 786 to 788, review-routed.1 only 789's owed test; row 790 is in the ledger and the gather's record only. Home: lines in the next batch's candidates: 787 and 788 among walk's rows, with row 697 and row 785 (788's sibling) and F-26; 789 among the checker's; 790 for the code generator, with row 414.
6. **microGPT's APL port's first compile error moved, and nothing routed it** (section 1). Rung S left the microGPT phase run out of its ladder subset on a false premise (decision 13). Home: the review list, default as landed (by the message, the compiled path's own library has no `DelegatedIndexed`; at the switch-over the one library has it). Proposed (mine): a rung that edits an api under `Library/` runs the ladder's microGPT phase step too, since the compiled path reads those apis.
7. **No review-queue item holds batch 19's entries** (batch 18's had items 175 to 188). Home: the coordinator's routing.
8. **Built or stale items still stand.** `ownGeneric`'s comment, replaced by rung P: `PLAN.md:472` (judge-review.2 of climb batch 17), `:491` (gather.2 of climb batch 18) and review-queue item 186. "Among climb batch 19's candidates", now false: `PLAN.md:482` and `review-queue.md:77`. Home: `PLAN-history.md`, and the two lines repointed to the batch after 19.
9. **Four refused notes carry facts no other home holds** (gather.1, `RECORD.md:126-132`): row 759's measured cause, the compiled path bounding an unwritten type parameter by `Object` (row 412), with `g[\T extends Object\](a: T)` beside `g(a: Object)` refused; the `KObjOne` face of row 697; row 371's walk face, `trait Tx extends Any excludes { Object }` loading as an `Object`; and row 159's old `mul` pair loading under walk. Home: review-queue item 165's command (batch 18's finding 7), or the coordinator's notes on rows with room.
10. **P-45's last sentence reads as if the paths differ only on row 759** ("The one pair on which rung G's reading makes walk and the checker disagree is row 759's", `POSITIONS.md:44`), while P-152's "Left" now names rows 786 to 788. Home: P-45's "Not built", through `record.py`.
11. **The skeptic's structured result was refused by its schema again** (skeptic P, a fix kind outside "correction" and "defect"; batch 18's skeptic K the same). Proposed (mine): the skeptic's brief names the two words where it asks for the fix list.
12. **The comprises limit at the forced instance has no row**, and the checker's side is unmeasured (Part 1, the splits, item 6). Home: a row by `ledger.py`, home 3 if no program reaches it.

## Part 2. Did the practice hold

### The skeptics' fixes

From the run's result (`result.rungs[].verdict.fixes`), each `SKEPTIC.md`, and the review's `fixesChecked`: 9 fixes in 9 commits, 2 of them defects, none contested.

| Rung | Fix commits | Defects | Test first |
|---|---|---|---|
| P | `0dad9e891` (the report from the journal), `5fa3e42c3`, `84957e6ef`, `a105556a9`, `5f06c723b`, `b9711575b` | 2 | `GenericPairObjectSupertypeOverlapWalk` red on the worker's head, ' Missing expected refusal at load', 'Tests run: 1,  Failures: 1', green on the base; then `GenericPairForcedObjectApartWalk` red on the first fix, 'FAILURES!!!'; both green after, 'OK (22 tests)' (`SKEPTIC.md` section 3; the review's `fixesChecked`) |
| S | `953e87090` (the report and record from the journal), `a7d1f5ef8`, `90a5a91bf` | 0, one new row (790) | `XXXDuplicateExtendsEntry`: 'Saw expected failure', then red with `extends { Tr }` for one run, 'Did not see expected failure', then restored (`SKEPTIC.md` section 4) |

- Every fix is sound and stays inside its rung; P's two defects are one fix and its refinement, both test first.
- Against the batches before: batch 18 made 11 fix commits with 3 defects, batch 17 18 with 1, batch 16 11 with 3.

### Workers, test first

Each worker's tests failed through the harness on the base's code before its first edit of source, as its skeptic read the transcript:
- **P**: walk 'Tests run: 2,  Failures: 1' at 00:48:03 UTC, compiled 'Tests run: 7,  Failures: 6' at 00:48:35, the guards passing; the patches applied at 00:52:43 (`rung-existential-reduction/SKEPTIC.md` section 2).
- **S**: `ExtendsAnyIsObjectWalk` 'Tests run: 3,  Failures: 1' at 00:50:21 and `ExtendsAnyIsObject` 'Tests run: 2,  Failures: 1' at 00:50:41; the library's first edit at 00:51:43 and the Java edit at 00:53:54 (`rung-string-conversion/SKEPTIC.md:18`).

One test came after its fix: S's `ConcatAnyOnLeftWalk`, written at 01:05:18 and seen red on the old code through the base build's own harness at 01:05:22, 'Non-object receiver (1,2)', as rung K's one test in batch 18. No miss of order in the first tests, as in batches 11 to 18.

### The rulings

No judge on a rung: no fix was contested, no rung refused, no worker stopped.

### The merged-diff review's blocking finding, its judge and the repair

- **The finding.** Appendix I's Effect of "Overloading with static parameters", the entry rung P revised, named no departure for row 788, which P's skeptic had filed against the same section's Meet Rule: walk loads `g[\T\](x: Box[\T\], y: ZZ32)` beside `g(x: Box[\ZZ32\], y: Any)`, and the checker refuses it. The skill asks that the Effect name each departure with its row (`fortress-repo`'s `specification.md`). The skeptic had done so for row 787 in the same Effect and not for 788; the gather checked only the sentences the rung edited (`JUDGE-review.md` section 3).
- **The judge** (196K, 8 minutes) upheld every claim and ruled a repair, adding F-258's list of differences, which named rows 786 and 787 only. It ruled from the record: the skeptic's table and the gather's merged-tree run, with no new run, since rung S's rewrite reaches neither program (`JUDGE-review.md` sections 2 and 4).
- **The repair** (210K, 6 minutes): eleven lines at `changes.tex:2874-2884`, F-258 by `record.py set`, `RECORD.md` re-anchored, the specification built ('BUILD SUCCESSFUL' twice, 681 pages), `record.py check` 0 failures (`REPAIR-review.md` section 1). Its two deviations: the strict log grep prints 41 traced definitions, not warnings, as in batches 16 to 18 and rung P; and its own record file in the commit.
- **No second gate**: the repair changed no path the gate reads (`repairRerun`), so the tail cost 0.41M and 14 minutes, against batch 18's 0.77M and 51 minutes.
- **The miss behind it**: a departure the batch itself filed, against the passage it revised, left out of the entry it revised. The skeptic's record step and the gather's check both stopped at the sentences edited.

### The briefing in each agent's first turn

| Batch | Briefed agents | In the first turn | Run at all | At calls | Seconds after start | Its tokens (estimate) |
|---|---|---|---|---|---|---|
| 16 | 12 | 0 | 12 | 3 to 50 | | 134K, 2.2 % |
| 17 | 11 | 0 | 11 | 10 to 23 | 30 to 105 | 203K, 3.1 % |
| 18 | 8 | 0 | 8 | 3 to 25 | 17 to 85 | 140K, 2.7 % |
| 19 | 7 | 0 | 7 | 4 to 19 | 18 to 102 | 162K, 4.2 % |

- Batch 19's seven: the four rung workers (two killed by the restart), the two skeptics and the review's repair. Rung P's second worker read its predecessor's briefing files at call 13, 95 s after its start, and ran none itself.
- The figures for 16 to 18's first three columns are batch 18's review's. The calls and seconds are from the transcripts, by a script that finds each agent's first `facts-extract.sh` call with the brief's keys. The tokens are a scratch estimate: each briefing call's result at 0.40 tokens a character plus 110 a call (`process-engineering/labor.md`'s rate), over the agents' whole runs.
- **For the figure `batch.md:45` asks**, the share in the first turn is 0 % for the sixth batch, by the brief's order (the skill's load first); the share that ran it, 18 to 102 seconds after they started, is 100 %. Batch 18's proposal, that `batch.md:45` measure the second share, is not taken. The briefing's share of the writes rose to 4.2 % because the two killed workers read theirs too (58K) and the run is small.

### Builds and runs, repeated or not

- **Builds** (`batch-measures.py`): rung P 1 and rung S 1 (the second workers); skeptic P 2 (its fix and its refinement); the gather 1; the gate 1. Skeptic S built nothing and ran its programs on the worker's build.
- **Suites**: P `testQuick`, `testSystem` and `testSpecData` once each on `a93fb3bfd`; S the same once each on `7ba1a846d`; skeptic P `testSystem` and `testSpecData` on its walk fix.
- **Count stages**: P 2 timed (base and change) with a profile and an instrumented copy; skeptic P 2 (the reviewer's exception); S 1 after; the gate 1.
- **Re-measured without a code change:**
  - the resumed rung S worker ran its briefing again (about 22K), where its predecessor had written it to its scratch folder;
  - the commit stage built the specification's PDF on the `Specification/` tree the repair had built minutes before (the repair's build took 36 s and 42 s; the ruling's step 6 and the commit stage's rule each ask for one build);
  - rung P's base count re-timed a code state the P-152 probe had timed, by design: P-148's pair runs in one session.
- **Taken from the record, not re-run:** rung S's count "before" (F-240 and the planner's 60 s, decision 12); skeptic S's tables; the judge's evidence for the repair; the gather ran no suite or stage.
- **Re-measured by design:** the gather's 30 walk programs and six compiled tests on the merged tree, its closing tests.

### Refusals by the harness and the tools

- **Both workers' writes of `REPORT.md` were refused**, as the script expects; the skeptics wrote each from the journal (S's `record.md` too).
- **One `sleep` call was blocked**: skeptic P (`sleep 60`).
- **Three `Edit` calls were refused for a file not read**: skeptic P 1, rung S 2.
- **One structured result was refused by its schema**: skeptic P, a fix kind outside the allowed words (finding 11).
- No agent read `sources.md`. No refusal cost a cache refill.

### The practice's measures, batches 16 to 19

| Measure | B16 | B17 | B18 | B19 |
|---|---|---|---|---|
| Written | 6.01M | 6.52M | 5.13M | 3.82M |
| Rungs, agents | 4, 17 | 5, 16 | 3, 14 | 2, 12 |
| Per rung, all roles | 1.50M | 1.30M | 1.71M | 1.91M |
| First calls | 0.76M, 9 cold | 0.77M, 9 cold | 0.73M, 10 cold | 0.58M, 8 cold |
| Refusal cycles | 2.8% | 0 | 3.1% | 0 |
| Rulings and repairs on the merged tree | 8.3% | 9.0% | 12.0% | 10.6% |
| Skeptic fix commits (defects) | 11 (3) | 18 (1) | 11 (3) | 9 (2) |
| Distance, sites gone net | 0 | 14 | 1 | 3 |
| Count stage at the gate | 82 s | 76 s | 70 s, 68 s | 64 s |
| Distance stage at the gate | 217 s | 180 s | 173 s | 153 s |
| Skill's load | 9.6% | 9.5% | 9.4% | 10.2% |
| Briefing, estimated | 2.2% | 3.1% | 2.7% | 4.2% |

### Batch 18's findings, a batch later

1. **Its question 2** (a list of partially ordered elements has no order on the checker): still on no list as an entry; ask 4 is queued (the boot note), and row 774 was held out of batch 19 (`PLAN.md:57`).
2. **P-151's default he did not give**: still in POSITIONS ("its default taken: with the members"), to be fixed with ask 8's answer (the boot note).
3. **The record's calls without an entry**: not fixed, and batch 19 repeats it (finding 2).
4. **The judge's reading of a defect of the fix's own shape**: no manual change; no judge ran on a rung here.
5. **Rung K's unread constraint case**: still no row.
6. **The skill writer's pass for batch 18**: done (`b15c88694`, `475be9b38`).
7. **A `ledger.py` command that rewrites an open row's claim**: not built; fork 15 waits on it, and gather.1 grew again.
8. **The second gate after a repair of the checker alone**: the rule stands; batch 19's repair touched only the specification, so no gate ran again.
9. **Item 43's line names row 634 as its home** (`PLAN.md:154`): unchanged.
10. **X.skeptic.2, row 775, without a default** (`PLAN.md:487`): unchanged.
11. **The microGPT lines name no program**: unchanged (`summary.txt:132-135`; the commit stage's `grep -h`, `climb-batch-workflow.js:1312`).

### Misses, by kind

Numbered on from `batch-18-review.md`'s 553.

Found inside the batch:
- **The change wrong:**
  - 554, P's step at the meet read an object type apart from every type outside its written supertypes, so walk loaded `KObjSub`, which breaks the Meet Rule and which the base refused (`5fa3e42c3`, skeptic P);
  - 555, that fix's first version refused the valid `k` pair (`84957e6ef`, skeptic P);
  - 556, the checker's change made the paths disagree on a pair with a `where` clause, which both refused before (row 787; skeptic P, home 2).
- **A test written after its fix:** 557, S's `ConcatAnyOnLeftWalk`, seen red on the old code afterwards.
- **Text claiming more than the code does:**
  - 558, Appendix I's Effect said both paths read pairs that exclude together, false for a `where` clause (`5f06c723b`, skeptic P);
  - 559, Appendix I's row 759 sentence covered a written bound (`b9711575b`, skeptic P);
  - 560, P's report on its `try` and on the paths' agreement (skeptic P, section 6, left standing in the report);
  - 561, S's report on the moved values, the compiled moves and object expressions (`a7d1f5ef8`, skeptic S);
  - 562, S's tests' citation of a section that does not exist (`90a5a91bf`, skeptic S);
  - 563, F-238's and F-252's new sentences claimed every such pair, and a citation one line early (`25b55a1a1`, the review);
  - 564, Appendix I's Effect named no departure for row 788 (the review; `cf4ec59ea`);
  - 565, S's decision 13, "the compiled path does not link the changed library" (the gate's result; unrouted).
- **The record's premises:**
  - 566, "agree on every probed pair but one" (skeptic P);
  - 567, fork 11's "the text settles it three times" (skeptic S for `Tuple`; this review for the algebraic roots);
  - 568, fork 13 silent on batch 15's entry (the review, review.1).
- **The team's code, found by the rungs:** 569, rows 788 and 789 (skeptic P) and 790 (skeptic S), each on the base too.
- **Process:**
  - 570, two report writes refused (by design);
  - 571, one `sleep` blocked, three `Edit` calls refused, and one structured result refused by its schema, as in batch 18;
  - 572, seven ledger notes refused, two cut to fit (the gather);
  - 573, the VM restart's two killed workers (351K).

Found by this review: 574 to 585, findings 1 to 12 above.

**Against the earlier notes.** 20 found inside the batch (554 to 573), 10 a rung, against batch 18's 5.7; the two-rung batch and the platform's restart raise the rate. The skeptics found the three faults of the change; the review found one text miss of the batch's own filing; no test-first miss of order but 557. Landed: no wrong value is known. The known costs are rows 786 to 790, fork 11's split, the unread `comprises` case at the meet, and the false sentences.

## Part 3. Skill sentences the batch made false

For the skill writer. The gather's record names three, `revival-changes.md:56`, `:58` and `:61` at `ebd39a6bd` (`RECORD.md:202-207`), which `45a0ff799` rewrote. Lines below are of `.claude/skills/` at `f4c6fba1a`; `fortress-repo` has not changed since `45a0ff799`.

**Made false by batch 19, beyond those three:**
1. **`fortress-repo/references/interpreter.md:38`**: "For every pair of functions of which at least one is generic, it loads the pair only if the No Duplicates Rule, the Meet Rule and the return-type rule hold on their declared domains." Walk loads `g[\T\](x: Box[\T\], y: ZZ32)` beside `g(x: Box[\ZZ32\], y: Any)`, which breaks the Meet Rule (row 788; `XXXGenericObjectInstanceBesidePlainWalk`, 'Saw expected failure: loaded and ran, not refused at load', `RECORD.md:30`). It was false on the base too; this batch measured and filed it. The sentence ends with a pointer to the departures; "except in the cases that it lists" makes it true.
2. **`fortress-repo/references/revival-changes.md:57`**: "In seven cases, walk or the checker departs from these rules:". Row 787 is an eighth, made by rung P: walk refuses a pair whose parameter types exclude only together where one declaration has a `where` clause of its own, and the checker accepts it (F-258; `XXXGenericPairWhereExcludesTogetherWalk`). The writer put it at `:73`, under the new section's limits, not in this list. The boot note already gives it to the writer's next task.

**Not false, but now incomplete:**
- **`revival-changes.md:61`** (row 759): the checker accepts `g[\T\](a: T)` beside `g(a: Any)` only with the bound unwritten; with `T extends Any` written it refuses the pair (`K759A`, `rung-existential-reduction/SKEPTIC.md:106`; `changes.tex:2845-2851` since `b9711575b`). The measured cause: the compiled path bounds an unwritten type parameter by `Object` (row 412; `compiler.md:69`), so on that path the two domains are not equal.
- **`revival-changes.md:130-134`** ("An object or trait declared `extends Any`"): true as built; its reason cites the text's rule only, and it says nothing of the specification's own `Tuple` and algebraic roots (Part 1, split 1). It changes with gather.2's answer.
- **`fortress-repo/references/compiler.md:125`**, "about 1.5 minutes": the count stage took 61 to 75 s in this batch and 64 s at the gate (batch 18's review said the same).
- **`coordinator/references/batch.md:45`**: the first-turn share is 0 by the brief's order in batches 14 to 19; "it fell to 25 to 35" describes the batches before.

**Checked and not false:** `SKILL.md:123` and `:126`; `compiler.md:39` (a declaration with a `where` clause of its own refused by the code generator, which row 787's pair meets) and `:69`; `interpreter.md:84`; `gate.md:70` (the microGPT phases only are compared, which is why section 1's message move raised nothing); `session.md:55-63`; `coordinator`'s `delegating.md:53` (an unfinished agent runs from its start on its worktree's leftovers, as both resumed workers did); `cloud-container`'s `stops.md` on a VM restart with the disk intact; the writer's new sections on exclusion (`revival-changes.md:67-75`), on `||` (`:136-140`) and row 788's case (`:64`).

## Part 4. Routing

Checked against main at `f4c6fba1a`: the gather's PLAN entries and the review's corrections (`3dca83601`, `25b55a1a1`), the coordinator's POSITIONS commit `53fdd6d34`, the skill writer's `45a0ff799` and `ea0a1f0a8`, and the boot notes `50c7e6fba` and `f4c6fba1a`. PLAN's routing step (the boot note's step 4) has not run yet, so the batch's own line, item 17 (`PLAN.md:57`), and "Next" (`:13`) still describe the batch as to come.

### The 7 items of `forCurator`

- **P.worker.1 and P.skeptic.1** (`tint`, row 786): one entry, `PLAN.md:498`, "Default: both paths as they are, row 786 `CONTESTED`". Sound. No queue item.
- **gather.1** (seven notes refused, two cut): a sentence in batch 15's gather.1 entry (`PLAN.md:426`), queue item 165. **Its default cannot be carried out** (batch 18's finding 7), and four of the texts hold facts no other home holds (finding 9).
- **gather.2** (`Tuple`): `PLAN.md:500`, "No default on record". **Missing: a default, and the algebraic roots** (finding 1).
- **review.1** (`FlatString`'s pair): a sentence in batch 15's entry (`PLAN.md:423`). **Missing: a line under batch 19's list, with its default** (finding 3).
- **review-routed.1** (row 789's owed test): `PLAN.md:502`, a step for the next batch that edits the checker's overloading code. Sound as a step; the row itself has no candidate line (finding 5).
- **review-routed.2** (`tint`'s compiled half): `PLAN.md:504`. Sound.

### New rows

- **785** (the planner's, filed before the batch at `52f8bdffb`): `PLAN.md:57` and the record's "After the landing" (batch 20's lists, with row 697). The line must survive item 17's move to `PLAN-history.md`.
- **786**: on the review list (above). Sound.
- **787**: P-152's "Left", F-258, Appendix I (`changes.tex:2871-2873`), `revival-changes.md:73`. **Missing: a PLAN line** among walk's rows.
- **788**: P-152's "Left", F-258, Appendix I (`:2874-2884`), `revival-changes.md:64`. **Missing: a PLAN line**, beside row 697, its sibling.
- **789**: review-routed.1 only. **Missing: a candidate line** among the checker's rows.
- **790**: the ledger and `RECORD.md:56` only. **Missing: any home in PLAN** (finding 5).
- **The three closed rows**: settled by F-258 and P-152 (740, 741) and F-259 (743).

### What the record listed for him, and PLAN lacks

- **The sixteen forks and the points for his sight** (`CLIMB-BATCH-19.md:54-82`): no entry (finding 2). Of them, fork 3 is on the list (`tint`), fork 11 in part (gather.2), fork 13 only inside batch 15's entry; forks 1, 2, 4 to 10, 12 and 14 to 16 and the points have none.
- **Rung P's words beyond the brief**: no entry (finding 4).
- **The microGPT first error's move**: no entry (finding 6).
- **The record's "After the landing"** (`:322`): P-152 and P-45 narrowed (`53fdd6d34`); the skill writer's task done (`45a0ff799`); FACTS' consolidation of F-238 and F-252 with F-258 owed; this review; batch 20's lists not yet in PLAN.

### Answered, stale or overlong in the record

- **Built by rung P, still open**: `PLAN.md:472`, `:491`, queue item 186 (`ownGeneric`'s comment) (finding 8).
- **"Among climb batch 19's candidates"**, false now: `PLAN.md:482`, `review-queue.md:77` (finding 8).
- **P-45's last sentence** (finding 10); **P-151's "its default taken"** (batch 18's finding 2).
- **F-258 and F-259** are 2,387 and 1,078 characters, past the record's 600 (`RECORD.md:187`). Home: the coordinator's consolidation, with F-238 and F-252.

## What I did not do

- I built nothing and ran no Fortress program, suite or stage. I changed no file but this one, and committed nothing.
- I read the run's transcripts through `batch-measures.py`, `spend.py` and `skill-load.py`, and through five small read-only scripts of mine in the session's scratchpad: each agent's times, writes, first call and messages; each agent's first turn and briefing call; its refused calls and its build, suite and stage launches; the briefing results' sizes; and the first 40 calls of the two resumed and the two killed workers, to see what the resume kept. The named scripts give none of these, and batch 18's review counted them the same way. I read bounded extracts of the array sites' ways worker's transcript, outside the run, to see whether it ran programs beside the rungs. I read no message of the coordinator's session; what he was told comes from the boot note and PLAN.
- The loads of the microGPT runs, the gate's count stage times and the ways worker's loads come from files under `tmp/`, which are not committed; I cite no file under `tmp/` as a source.
- I did not judge the new specification passages beyond the skeptics', the review's, the judge's and the repair's checks.
- The INDEX line for this review is the coordinator's.

## For the curator

In the order they need you, each with its default:

1. **An object or trait declared `extends Any` is now an `Object`, but the specification's own `Tuple`, and its algebraic roots such as `BinaryPredicate`, are declared `extends Any` to stand beside `Object`, so the text contradicts itself (gather.2).** Default (mine, none on record): as landed; name `Tuple` beside `Any` and `Object` when a library first declares it, and decide the algebraic roots with row 37.
2. **`tint` (row 786): walk loads two declarations whose type parameters' bounds exclude, and the checker refuses them.** Default: both paths as they are.
3. **`FlatString`'s api no longer declares `opr ||(a:FlatString, self)`, where climb batch 15's default kept it for your item 38 (review.1).** Default: as landed.
4. **Rung P's sentence in `overloading.tex` adds "or their elements at one position" to the words the record gave it, toward the type group's paper.** Default: as landed.
5. **The record's sixteen forks, taken at their defaults, and its points for your sight** (team lines changed in the checker's exclusion test, in `String`, in `FlatString`'s api and in the desugaring; walk's moved values for tuples and functions beside a string). Default: as landed.
6. **microGPT's APL port now stops at the same compile phase with a different first error, "DelegatedIndexed is undefined.", from rung S's `FlatString` api.** Default: as landed.

Information:
- The count is 28 and the distance 31, as expected; every moved site is rung S's.
- Rung P made the checker accept one kind of pair that walk still refuses, a declaration with a `where` clause (row 787); both refused it before. The text says the pair is valid, so the fix is walk's, for a later walk batch.
- The count stage took 64 s and the distance stage 153 s at the gate. Load explains the count's change; the distance's 20 s is inside the spread of same-code runs, not explained by load.
- The batch wrote 3.82M over 12 agents in 2 h 56 min, against the record's 3.2M and 3 hours. The VM restart cost 0.35M of it, and the review's judge and repair 0.41M. Preparation cost 1.60M more.
- microGPT's quick walk check passed 7 of 7 in both programs, in 44 s and 36 s.
- Beyond the three sentences the skill writer has fixed, one more sentence of the skill is false (`interpreter.md:38`), and one count is one short (`revival-changes.md:57`, row 787).
