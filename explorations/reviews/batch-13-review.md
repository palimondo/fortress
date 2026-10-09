<!-- The combined post-batch review of climb batch 13 (run wf_33c4de68-284, base a1a75716a, launched 16:40 UTC on 2026-10-09, stopped by a VM restart at 20:46 and resumed at 20:47 with resumeFromRunId, landed at 23:04 UTC at 738904f9a: rungs O 9ba86f7da, G 8f90e1e8c, N 7fd8fddc8, V 7207e2719, W efd6bb2f2, the closes a6ed1fff2, the gather record f1a1033fb, the review's corrections 510e80b8f, the cold read 29e4b4bd8 and the gate's tables), the third run of the redesigned practice of coordinator/process-engineering/batch-redesign.md, in the form of reviews/batch-12-review.md, judging conformance, whether the practice held, the skill sentences the batch made false and the routing, written on the curator's standing word ("One review after every batch", POSITIONS) by a review worker reading only, against main at d5c6167ab (738904f9a and four coordinator commits after it: item 35's write-up, Q48(b) in POSITIONS, row 695, two boot notes), with the 20 transcripts and the journal read through bounded scripts under tmp/rev13/, the run's measures as the brief cites them from tools/batch-measures.py (7.22M written) and a per-agent script of this review's own that agrees to the thousand, the per-site lists of batch 12 (git show 32b88cd3b:explorations/compile-ladder/gate/distance-sites.tsv) and batch 13 compared site by site through the batch's own diff, nothing built, no Fortress program, suite or stage run (one `git apply --check` of rung V's held library half against main, which writes nothing), and tokens counted as writes only (input plus cache creation, one count per message id). -->

# Climb batch 13: conformance, the practice, and routing

## What came up in this run

### 1. The distance 153 to 105 and the count 1 to 1, by rung

**The distance, 153 to 105 (−48).** I mapped each of batch 12's 153 sites through `git diff -U0 a1a75716a 738904f9a` and matched them against the 105 (`tmp/rev13/sitemap.py`, after `rev12/sitemap.py`). 51 sites are gone and 3 came; every other site only moved with the hunks above it. One export site, `FortressLibrary.fss:12`, kept its 44 unmatched declarations in another order. So 153 − 51 + 3 = 105.

By rung:
- **N, −23 +3.** Gone: item 15's 13 (the six storage sites, two each at `:2626`, `:2790` and `:3013` on the merged tree, `NativeArray.fsi:12` twice, `NatReflect.fss:45` and `:47` twice, the two `typecase` arms) and fork 3's 10 (the six run-time factories, the four rank-1 subarrays, row 664). Came: `Array2`'s three, once N typed `row(i)` (`FortressLibrary.fss:2568`, `:2572`, row 678; `:2525`, row 679). The record's "4 hidden calls": `Array2`'s two (`:2544`, `:2581`) are cleared by N's rule (row 664's close); `Array3`'s two (`:2955`, `:2966`) stay hidden, since `Array3` now crashes at `plane(k)`'s loop instead ("TryChecker returned an untyped expr", row 680; `climb-batch-13/gate/distance.txt:29`).
- **O, −19.** Row 634's 17 tuple sites and row 582's 2 `isLeftZero` sites.
- **G, −9.** Row 629's 9.
- **V, 0.** Its checker half moves no site. Its library half, fork 2's 23 and row 437's 1, was built and held (below). So `:2399` did not come either.
- **W, 0**, as the record expected.

**Against the record's 79** (`coordinator/CLIMB-BATCH-13.md:36`): 105 − 79 = 26 = V's 24 not reached, less `:2399` not come (1), plus `Array2`'s 3. Nothing else differs. Row 488's `BIG LEXICO` site at `:130`, which three rung runs lost, is on the gate's list (`gate/distance-sites.tsv`, the `:130` row), as row 488 says it varies.

**The 105 by what each waits on** (batch 12's groups less what landed, plus the new): the arrays 47 (fork 2's 25 held, row 437's 1, 13 bodies typed by their parent trait, 3 sizes tested in a branch, 2 export errors, `Array2`'s 3); the self-typed bodies 30; his other items 12 (the integer power 6, row 585's 3, row 634's list half 1, rows 632 and 631); the `where` clauses 12; row 425's 3; row 488's 1. They sum to 105.

**What was held in rung V, who decided, and whether within the rules.**
- **What.** Rung V's library half, `d3d31b5b2`: `T extends { Number, MultiplicativeRing[\T\] }` on 29 lines of `Library/FortressLibrary.fss` and 32 of `.fsi`, a bound per operator on the scalar block (8 and 8 lines), and `matrix(v)`'s `v.zero` (row 437). It was taken back by `816251130` at 18:08:39 UTC; `git diff a1a75716a 816251130 -- Library` is empty (`rung-array-bound/SKEPTIC.md:22`). What landed is the checker half: the `boundsSubstitution` crash fixed (row 684) and row 660.
- **Why.** With the crash fixed, the api's overloading check runs, and under the bound it takes about 17 minutes of a core: `checkApi FortressLibrary` 17:47 to 18:04 and 18:45 to 19:02, memo off as the stage runs it, against the count stage's `timeout -k 10 900` (`rung-array-bound/REPORT.md:155-161`; `tools/checker-count/run.sh:69`). Thread dumps put the time in `TypeAnalyzer.pSubInner`, which expands `Number`'s `comprises` clause at every query on such a variable (row 688). The fork 2 judgement had read that the crash fix would remove the 09-29 cost, and said it was "measured only after it" (`reviews/array-fork2-judgement.md:141`, `:155`). The record turned that into a point to report, "Read the stage's `FortressLibrary` time against 739 s and report it" (`CLIMB-BATCH-13.md:205`), with no fallback.
- **Who, and where.** Rung V's worker alone, decision 5 (`rung-array-bound/REPORT.md:206-211`), committed as `816251130`. Its skeptic weighed it and did not contest (`SKEPTIC.md:96-99`). No judge ruled: the workflow sends a judge a contested fix, a refusal or a stop, and the worker declared none (POSITIONS, "The judge's rulings."). The gather landed V as approved and listed the hold as a point (`climb-batch-13/RECORD.md:205`). The gather wrote it into PLAN as item 52, under "Pavol's answers" (`PLAN.md:283-285`; `RECORD.md:232`). The merged-diff review added that the merged tree's time is unmeasured (review.3). The coordinator told him at about 23:06 UTC (the boot note, `d5c6167ab`).
- **Within the rules: yes.** Landing the half would have left the count stage with no total. `run.sh:72-76` then exits 1, and `checker_compare` is red on "a table with no total" (`climb-batch-workflow.md:226`). A red gate after its repair stops a batch (POSITIONS, "A blocking second review does not hold a green batch."). So landing the half would have held the whole batch on a reversible change, against "Reversible stops do not hold a batch." Raising the stage's limit is a tool edit outside every rung's files. The hold chooses among ways the record does not settle, so it is consequential (POSITIONS, "Which decisions taken inside the work reach Pavol, and how."). It took that entry's second way: landed reversible, named at the landing, listed in PLAN with the default that landed, "(1) ... the half is held" (`PLAN.md:285`).
- **One wording to correct.** The skeptic did not contest because "the record leaves the choice to the curator" (`SKEPTIC.md:98`). The record did not leave it: Q13.2 gave a default, the two-trait bound (`CLIMB-BATCH-13.md:91`). The skeptic's other reason is the sound one: landing the half "would leave the batch's gate without a count" (`:97`).
- **What now blocks the 23 and row 437.** Item 52's answer, default (1): first a checker rung on `TypeAnalyzer.scala`'s normalization (row 688), timed on the merged tree (review.3: N's opening code now runs on the same path, `TypeAnalyzer.scala:114`, `:742-749`, `:770-786`), then `d3d31b5b2`'s library diff unchanged. That diff applies to main today: `git apply --check` passes, all 13 hunks with offsets of 7, 8 or 40 lines. Behind the bound, V's tests hold four checker defects that the library's api check did not meet under the held half (`SKEPTIC.md:83`): row 686 (the norm's call at `:2490`, refused in its test form, so by reading one site would come), 687 and 689 (crashes in `Formula.slv`) and 690 (a false Return Type Rule error). The two factory sites (row 685) are not fork 2's to clear.

### 2. The count, 1 to 1

- **What it is now.** Every api row of the count is 0 (`climb-batch-13/gate/checker-count.txt:2-13`): rung O removed `isLeftZero`'s Meet Rule pair. With the api clean, the run goes on to check the component, and its first error stops it: "Missing parameter type for i" at `__bigOperator`'s local `body(i)` (`FortressLibrary.fss:1311`; `rung-tuple-orders/REPORT.md:142-148`). The table's `#total` is the run's last "has N errors" line (`run.sh:86`). So `#total` stays 1, `#crash none`, and the gate prints `COUNT SAME 1, declared O: 0`.
- **The record's expectation was wrong; the batch did not fall short.** The record said "This batch takes it to 0" and "the count 0" (`CLIMB-BATCH-13.md:12`, `:36`, `:496`). It read the count as the api's errors. It named `body(i)` itself, as "routed by no line" (`:343`), and gave no rung that line. Fable's review of the record checked only that O's declared 0 cannot make the gate red (`climb-batch-13-review.md:48`). Rung O did all the record asked: every api row is 0.
- **What he should know.** Once `body(i)` is typed, a one-line library slip under item 47's refusal, the count will show the component's own errors. The distance counts 99 in component `FortressLibrary` on the merged tree (`distance.txt`, `#unit component FortressLibrary 99`). So the count will jump from 1 to tens before it falls. PLAN's entry says this with O's tree's figure, 124 (`PLAN.md:689`).

### 3. The cost, against the record's estimate and batch 12

**How it was counted.** The brief cites `tools/batch-measures.py`: 20 agents, 7.22M written. My per-agent script (`tmp/rev13/agents.py`) agrees to the thousand. The span is 16:40 to 23:04 UTC, 6 h 24 min, one minute of it down at the restart. All agents ran on Opus, two at a time.

| Role | Batch 12 | Batch 13 | Per rung, 12 to 13 |
|---|---|---|---|
| Rung workers | 2.05M (5) | 2.64M (5) | 410K to 527K |
| Skeptics | 1.67M (5) | 2.59M (7 runs) | 333K to 518K; 397K without the two stopped runs |
| Judges | 0.30M (2) | 0.455M (3) | |
| Repair, second skeptic | 0 | 0 | |
| Gather | 0.53M | 0.59M | |
| Merged-diff review | 0.47M | 0.48M | |
| Gate | 0.13M | 0.14M | |
| Cold read | 0.16M | 0.17M | |
| Commit | 0.14M | 0.15M | |
| **Total** | **5.43M** | **7.22M** | |

- **Against the record** (`CLIMB-BATCH-13.md:65`): about 5.8M, from 5.5M to 6.4M with two judges and a repair. The run wrote 1.43M (25%) over the central figure and 0.82M over the top. By the record's own parts: workers +0.38M, skeptics +0.77M, judges +0.16M, the fixed roles +0.11M.
- **Why it cost more than batch 12 (+1.79M, +33%):**
  - The restart: two skeptic runs stopped at 20:45, 607K (8.4% of the batch). Batch 12 had none.
  - Rung V: 804K, 394K over batch 12's mean worker. It built fork 2's half, timed the count stage under it twice for 17 minutes, and refilled its cache once, 309K at 17:20:49 after a 606 s gap (section 4).
  - Rung N with its skeptic: 1.14M for two judgements' rungs, against batch 12's 0.74M a rung. The record priced N at one and a half rungs, about 1.11M: N cost what was planned.
  - A third ruling: 455K against two rulings' 300K.
  - The fixed roles: 1.53M against 1.42M, the gather's 592K the largest.
  - The rest, 0.12M, is the other three rungs' workers and skeptics.
- **First calls** 891K (12.3%), 10 of 20 above 40K, against batch 12's 719K (13.2%).
- **Refusal cycles** three rungs, each a judge alone, no repair: W 207K, N 142K, G 106K, 455K (6.3%), against batch 12's 295K (5.4%).
- **Sites per million tokens:** 48 net for 7.22M (6.6 a million), against batch 12's 54 for 5.43M (9.9). As before, this measures what the record gave the batch.

Per agent, in order of start:

| Agent | Writes | First call | Turns | Minutes | UTC |
|---|---|---|---|---|---|
| Rung N | 656K | 63K | 310 | 102.8 | 16:40-18:23 |
| Rung V | 804K | 24K | 245 | 146.3 | 16:40-19:06 |
| Rung O | 415K | 22K | 176 | 46.8 | 18:23-19:10 |
| Rung G | 433K | 21K | 166 | 52.4 | 19:06-19:59 |
| Rung W | 329K | 22K | 136 | 43.4 | 19:10-19:53 |
| Skeptic N | 480K | 70K | 154 | 35.7 | 19:53-20:29 |
| Skeptic V | 379K | 29K | 123 | 25.6 | 19:59-20:24 |
| Skeptic O, stopped | 316K | 29K | 95 | 21.0 | 20:24-20:45 |
| Skeptic W, stopped | 291K | 27K | 93 | 16.4 | 20:29-20:45 |
| Skeptic O | 372K | 66K | 100 | 19.7 | 20:47-21:06 |
| Skeptic G | 351K | 26K | 138 | 31.2 | 20:47-21:18 |
| Skeptic W | 405K | 27K | 136 | 35.1 | 21:06-21:42 |
| Judge N | 142K | 59K | 23 | 3.5 | 21:18-21:21 |
| Judge G | 106K | 19K | 27 | 4.1 | 21:22-21:26 |
| Judge W | 207K | 57K | 45 | 7.6 | 21:42-21:49 |
| Gather | 592K | 82K | 242 | 36.6 | 21:49-22:26 |
| Gate | 142K | 56K | 49 | 29.5 | 22:26-22:55 |
| Review | 482K | 82K | 137 | 20.7 | 22:26-22:47 |
| Cold read | 168K | 47K | 50 | 7.0 | 22:47-22:54 |
| Commit | 149K | 63K | 48 | 8.7 | 22:55-23:04 |

Against the manifest's minutes: N 103 of 150, V 146 of 110, O 47 of 90, G 52 of 85, W 43 of 80. With two slots the workers came first, so each skeptic waited: N's 90 minutes after its worker ended, O's 74, V's 53, G's 48, W's 36 before its first run. The workers ran from 16:40 to 19:59, the skeptics and judges to 21:49, the tail to 23:04. The restart cost skeptic W its first 16 minutes and its slot: its second run started at 21:06.

### 4. The restart, the resume, and the long waits

- **Two agents ran twice: skeptic O and skeptic W.** Both were mid-run when the VM restarted at 20:46; the resume at 20:47 started them again from their start, with briefs byte for byte the first runs' (48,444 and 45,802 characters). No worker, judge or tail agent ran twice; skeptics N and V had returned and kept their results, as `.claude/skills/coordinator/references/agents.md:62` says. The workflow's own result counts 18 agents (`wk5aos83j.output`, `agentCount`); the folder holds 20 transcripts.
- **Skeptic O's second run built on its first.** The first had committed three corrections (`9322ecb28`, `782c547c1`, `f7e3f3ca4`, 20:43 to 20:44) and left a 225-line `SKEPTIC.md` uncommitted. The second found them, read the tail of the first's transcript (20:47:52, 20:48:03) and went on to `4eaf4530f`, `dc97a82f5`, `99b8bbc3c` and its verdict.
- **Skeptic W's second run redid the work.** The first had committed only the journal-written report (`5568364cc`, 20:29:43). The second read the first's command list (21:07:25-30) and made all five fixes itself (21:30 to 21:37). So most of the first W run's 291K was lost.
- **The resume did not name the leftovers.** `agents.md:73` asks the coordinator to name a killed agent's uncommitted edits in its prompt, or to stash them. The resume came one minute after the stop, with the same briefs. O's second run found the leftovers on its own; W's first run had committed nothing but the report.
- **Rung V's 10-minute foreground wait.** At 17:10:45 V ran the count stage in the foreground under `timeout 600`, expecting the stage's usual 20 s (`climb-batch-workflow.md:226`). It ran out at 17:20:46 (`rc=124`), and the next call refilled 309K of cache. The skill asks for a long command in the background with a log (`SKILL.md`, "Rules for every task"). The stage's 20 s no longer holds under the bound, so V could not know; the refill is the batch's one.
- **Stages.** N ran the distance stage twice, on two code states (decision 12). V ran the count stage on its final code and two 17-minute timing runs of the held half, each a measurement item 52 needs. O and G ran both stages once on their final code. W ran none: its edits are walk's, and the record told it the stages do not read them (`CLIMB-BATCH-13.md:296`).

### 5. The tail: gather, review, gate, cold read, commit

- **The gather** (592K, 37 min) applied O, G, N, V, W. The lowest-line rule disagrees between `changes.tex` and `BuildEnvironments.java`, so it took `changes.tex`'s order and said why (`climb-batch-13/RECORD.md:20-37`). No conflict. It opened rows 671 to 694, closed 7 (582, 667, 629, 664, 660, 684, 692; 437 stays open with the held half), ran the closing tests on a merged tree (`OK (30 tests)` twice), rewrote two team `\note` boxes the N report listed as made false (`RECORD.md:124`), and routed 43 items; the review routed four more. `ledger.py` refused 21 of 23 notes again (gather.1).
- **The merged-diff review** (482K, 21 min) found no blocking code, read every skeptic's defect fix in its maker's transcript, corrected nine places in `510e80b8f`, and added review.1 to .3 and review-routed.1. Review.3, that the 17 minutes were measured on V's tree and N edits the same path, is the batch's best catch at the merged tree.
- **The gate** ran once, green: `testFast` 1,886 (compiler 1,086 to 1,114, library 86), `testSystem` 580, `testSpecData` 130, 42 of 42 `atomic` runs, no ladder move, count `SAME 1`, distance `DOWN 153 -> 105`. Its `# machine` line still records `FORTRESS_THREADS=1` (batch 11's finding 8).
- **The cold read** (168K, 7 min) flagged 29 passages of the five entries, fixed 23 in `29e4b4bd8`, and returned six, coldread.1 to .6 (Part 3).
- **The commit** (149K, 9 min) ran both microGPT walk quick checks, 7 of 7 PASS each (58 s, 50 s), rebuilt the PDF, wrote FACTS' figures, pushed to the three branches, removed the five worktrees, and listed ten FACTS sentences the new figures made false.

## Part 1. Conformance

### Method

As in `reviews/batch-12-review.md`: for each rung, `git show --stat` first; then its `REPORT.md`, `SKEPTIC.md` and, for N, G and W, `JUDGE.md`; then the record's section for it (`coordinator/CLIMB-BATCH-13.md` sections 2 and 3, with `climb-batch-13-review.md`) and the judgement it builds; then the gather's `RECORD.md` and the journal's results. Three standards, kept apart: the specification, the team's built intent, and the decisions on record. For the library rungs, the library rule as the curator reads it: each extension shown to him with its precedent line (`process-engineering/library-extension-rule-archaeology.md` §5 point 4, §7). The skeptics', the review's and the cold read's findings are cited, not repeated.

### The verdicts

- **Rung N, arithmetic in a size and fork 3: in the spirit**, with one edit outside its section that no one reported.
- **Rung V, the bound list's crash and row 660: in the spirit for what landed.** Fork 2's library half was built at its default and held, a departure argued with measurements and routed as item 52.
- **Rung O, the orders: in the spirit.** Two costs of item 43's default that the judgement did not weigh are listed. Its extension did not reach him as one.
- **Rung G, the generators: in the spirit.** Two walk answers changed where the record said none would, each listed.
- **Rung W, walk's strict `override`: in the spirit.** Two edits outside its file list, each listed.
- **The three rulings (N, G, W): all right.** One correction inside W's ruling is wrong (row 407's line).

### Rung N, `7fd8fddc8`

**What landed.** The checker folds an operation on numerals with the run time's `Naming.sizeOp` and compares sizes by written form (`Formula.scala:101-139`); a name or an operation beside a numeral is not known to differ from it (`TypeAnalyzer.scala:368-378`); the mangler and the class loader compute a size (`NamingCzar.java:1904-1905`, `InstantiationMap.java:393-394`, `Naming.java:1220-1253`). `NatReflect`'s 2007 clause is restored; `KindEnv` takes a `nat` or `int` where binding; a `NatParam` argument opens to its own size for the call (`TypeAnalyzer.scala:266-278`, `:754-787`); walk's loader binds the where size. `Array2`'s `row(i)` and `Array3`'s `row(i,k)` and `plane(k)` typed `ZZ32`. The skeptic's `7dd0adf0c`: a power of numerals above exponent 4096 is refused as out of range, and 0, 1 and −1 are computed at any exponent.

**Standard 1.** `types-vals-vars.tex:51-52` revised in the S1 form; `traits.tex:238-246`, the revival's proviso, widened; one sentence in `trait-parameters.tex`, "Nat and Int Parameters"; `internal-document.tex:167-198` for part (b); `constant.tex:20-23` for the range check the skeptic completed.

**Standard 2.** The team's comment on `NatParam` (`da43f8872`; `NatReflect.fss:19-21`) and its "to be simplified at instantiation" (`Naming.java:186-189`); the union case's use of listed types (`TypeAnalyzer.scala:154-159`); walk's own exact size arithmetic (`EvalType.java:468-479`).

**Standard 3.**
- Item 15, 15a with its part (b) (POSITIONS, "Arithmetic in a size ..."): built. Part (b) and 15a landed on the branch before the clause, `f623ce187` at 16:58:33 before `4db778294` at 17:12:20, as the fork 3 judgement requires, and `NatOpenChecker` shows the `N[\0\]` arm reachable.
- Fork 3 at 4a (Q13.3): built. The reading of "Sizes" (an opened size is bound) is asked of him at item 13's fork 3 line (`PLAN.md:323`); the widened proviso at `PLAN.md:697`.
- Departures, each with a row and listed: two different size parameters still differ (row 683, `CONTESTED`); the loader does not check a computed size's kind (row 675); no size inference to an expression (row 681); only `nat` and `int` where variables open (row 636).
- **An edit outside its section, reported by no one.** N edited `scala_src/typechecker/impls/Functionals.scala:324-389`, the coercion path, so that an opened argument is opened once per call (`REPORT.md:28`, decision 4). The section's file list does not name the file (`CLIMB-BATCH-13.md:155-160`). N's points to report have no line for a checker file outside the section, and the skeptic, the gather and the review did not flag it. It touches no declaration of another rung's, and it fits the rung's purpose. But V's section names the file as the Q48(b) probe's (`CLIMB-BATCH-13.md:200`), the record says "no rung edits" it (`:341`), and the Q48(b) wide rung, now a batch 14 candidate, adds 94 lines there (`reviews/argument-context-probe.md:11`). By reading, the probe's hunks (at `:644`, `:706`, `:801` of its tree) do not overlap N's.

**The judge's ruling, `c74c35617`: right.** The fix is settled by POSITIONS, "Sizes." and "Arithmetic in a size ..." (the checker "range-checks what it folds"), and the refusal is exact because the size grammar's exponent is a numeral or a name (`JUDGE.md:13-15`). The skeptic contested it only as "beyond-the-rung" (the journal), having cited the same sentences itself (`SKEPTIC.md:33`).

**Verdict: in the spirit.**

### Rung V, `7207e2719`

**What landed.** `boundsSubstitution` keeps a bound list as the list it is and checks it bound by bound (`TypeSchemaAnalyzer.scala:471-495`); the tight juxtaposition's `SMathPrimary` case gives the expected type to the multifix or the outermost binary application (`impls/Operators.scala:362-386`); Appendix I's entry "The contexts that give a call an expected type" amended (`changes.tex:2077-2088`). The skeptic's `5773dbfbd`: two more `XXX` tests and rows 689 to 691.

**Standard 1.** `trait-parameters.tex:44-50` and `advanced/overloading.tex:531-559` (the overloading must be decided, not crash on); `inference.tex:149-151` and `juxtameaning.tex:145-175` (row 660).

**Standard 2.** The loose juxtaposition and the repeated operator in the same file (`Operators.scala:176-197`, `:390-403`); bound lists kept element by element in `OverloadingChecker.scala:212` and `AbstractMethodChecker.scala:143`.

**Standard 3.**
- The crash first, test first: `OverloadTwoBoundsClosedTrait` red at 16:49:41, the edit at 16:50:33. The brief's own test shapes did not reproduce what the record said: `K comprises { A, B }` does not crash (decision 1, Q-V2, `PLAN.md:701`), and its second form crashes rather than being refused (`SKEPTIC.md:75`, row 689).
- Row 660: closed; Appendix I's sentence amended.
- **Q13.2's default not landed.** Section 1 above. With the half held, the letter of POSITIONS, "The integration review's checks", is no longer bent on `main`.
- No walk, library or N-file edit lands.

**Verdict: in the spirit for what landed; fork 2's half held, within the rules and routed (item 52).**

### Rung O, `9ba86f7da`

**What landed.** The ten tuple order operators bound each element by `StandardPartialOrder`; `Comparison` gains the lazy `LEXICO`, with `TotalComparison`'s and `EqualTo`'s arms; each `typecase` answers `Unordered => false`; `isLeftZero(_:TotalComparison)`; `genComb` in `IntMap`'s three objects; `Reflect`'s `members` a list.

**Standard 1.** The specification is silent on tuple comparisons (`opr-overview.tex:276-295`); the `LEXICO` table (`advanced-lib/comparison.tex:168-169`); `isLeftZero`'s answers (`comparison.tex`, `TotalComparison`).

**Standard 2.** `PCMP` bounded per element by the team (`0948c2b1c`); the strict and lazy arms at `:177`, `:211`; the team's prelude `LEXICO` on `Comparison` (`CompilerBuiltin.fsi:704`); `Map`'s `combine` and `IntMap`'s own `union` for `genComb` (`RECORD.md:215`).

**Standard 3.**
- Row 582 as he decided: built; the pin `LibraryMeetDeclarations.fss:33` `false` to `true`.
- Q43 at 1b: built. Two costs the judgement did not weigh, both listed in item 43 (`PLAN.md:261`): a pair with `()` or a pair as a later element is now refused where an earlier element decided, and a position holding numbers of two run-time types is refused (row 511).
- **Outside its files:** `Library/Reflect.fss`, which the bound required (`ReflectTest`); listed (`PLAN.md:691`).
- **The extension**, `Comparison`'s lazy `LEXICO` (three api lines): a point to report (`RECORD.md:216`), but no PLAN entry presents it as an extension for him to judge with its precedent; item 43's sentence names it only as built (Part 4).
- No team test line changed; the two pins changed are the revival's.

**Verdict: in the spirit.**

### Rung G, `8f90e1e8c`

**What landed.** `Generator`'s counted `opr |self|`; the relational predicate's `cond` as one reduction in the natural order; `SimpleIndexValuePairs` for `Indexed`'s default pairs. The skeptic's `a61ecbc55`: the pairs' range subscript narrows by index.

**Standard 1.** `defining-generators.tex:22-25` stays true with a default; `ranges.tex:115-128` for the range subscript (the judge).

**Standard 2.** `opr IN`'s naive default (`:1238` at the base); `Generator2.fss:207-229`; `SimpleMappedIndexed` (`:3600`); every range subscript of the library narrows with `narrowToRange`.

**Standard 3.**
- Q45, ways 1, 3 and 6: built. The `|self|` extension is in item 45 with its precedent line (`PLAN.md:265`).
- The pairs' slice keeps each pair's index, against the judgement's `SimpleIndexValuePairs(g[r])` (decision 1): listed (`PLAN.md:692`).
- **The record said "No value walk prints today changes"** (`CLIMB-BATCH-13.md:106`). Two answers changed: `cond` on a reversed indexed value, and the pairs of a value indexed from 5, whose range subscript the skeptic's fix moved further. Each listed (`PLAN.md:693`, `:695`).
- The pairs object is not in the api, but the record named it among the "three extensions for you to judge" (`CLIMB-BATCH-13.md:125`). No PLAN entry presents it so (Part 4).

**The judge's ruling, `a979e6b0d`: right.** It rests on the specification's reading of a range subscript in the value's own index space, the api's contract relative to `bounds()`, and the library's practice; the object must agree with its own bounds (`JUDGE.md:14-35`). Contested only as "beyond-the-rung" for reaching a point to report (`SKEPTIC.md:84`).

**Verdict: in the spirit.**

### Rung W, `efd6bb2f2`

**What landed.** `Constructor.checkOverrides` reads the strict subtype; `BuildEnvironments.checkGenericOverrides` checks a generic trait, object or object expression once at its declaration through the stand-in; the revival-covering callout and its Effect corrected (`functions.tex`, `changes.tex`); the two owed tests (`ReductionSimpleJoinAtAnyWalk`, `PairsRunRangesWalk`). The skeptic's `7b625cdf9` (a `where` bound no longer written into `FTypeTop`'s shared extends list) and `e8d377669` with `02f94f4a5` (no refusal where walk has lost the bounds; the residue row 693).

**Standard 1.** `traits.tex:585-595` ("a strict subtype", the static error), now `:598`, `:603-604`; `overloading.tex:539-541` for fix 1; `trait-parameters.tex:316-317` for fix 2.

**Standard 2.** `walk-load-readings-check.md` §3.6-3.7: the strict relation in `checkOverrides` alone, `providedByTrait` and `FunctionalMethodMeets.inherited` untouched; batch 12's stand-in.

**Standard 3.**
- QW2 at its strict default: built, and the batch-12 Q2 entry now says so (review.2, `PLAN.md:674`).
- Row 665's override half: fixed; its abstract half held for item 51.
- **Outside its file list:** `interpreter/env/ComponentWrapper.java:186` (the worker's call of the new check; a point, `RECORD.md:223`, no PLAN line) and `interpreter/evaluator/types/SymbolicType.java:46-63` (the skeptic's fix; `PLAN.md:705`).
- QW-a, QW-b, QW-c and fix 2's lenience, each a decision where nothing on record settles it: listed with defaults as landed (`PLAN.md:702-706`).
- No demo refused (`REPORT.md:249`).

**The judge's ruling, `12dff57cf`: right on both fixes.** Fix 1: the aliasing is real by reading (`FTraitOrObject.java:78-80`, `FTypeTop.java:26`), it made the rung's own check depend on unrelated declarations, and the dispatch it changes moves toward `overloading.tex:539-541`. Fix 2, contested by clause (a) because the worker's decision 5 argued against a skip: the lenience is confined to `boundsUnread` and `symbolicDomain`, and equal types stay refused (`Constructor.java:598-600`). **One slip:** the ruling corrects row 407's citation `SymbolicType.java:74` to `:65` (`JUDGE.md:137`). `:65` is where the method starts; the line the row cites, `if (t1.excludesOther(other))`, is `:80` on the merged tree, as the skeptic said. The gather kept `:80`, rightly (`RECORD.md:189`).

**Verdict: in the spirit.**

### The global questions

- **What "go" promised, against what landed** (`CLIMB-BATCH-13.md` sections 1 and 5):
  - N: 23 sites and row 664: held. `Array2` unhidden (+3, rows 678 and 679); `Array3` still hidden (row 680).
  - V: the crash (row 684) and row 660: held. Fork 2's 23 and row 437: held back (item 52).
  - O: 19 sites, rows 582 and 667: held. The count to 0: not met; the expectation was wrong (section 2).
  - G: 9 sites, row 629: held.
  - W: QW2, row 665's override half, the callout, two tests: held.
  - The distance about 79: 105. The count 0: 1.
- **Four premises of the record or its judgements did not hold**, each found by the rung that met it: the count reaching 0 (O); fork 2's cost removed with the crash (V); "No value walk prints today changes" for Q45 (G); the brief's crash-test shapes (V). Fable's review of the record checked the first two and passed them (`climb-batch-13-review.md:45`, `:48`).
- **Built twice.** No. No two rungs changed one declaration (the review's cross-rung check); N's `Functionals.scala` hunk is no other rung's.
- **The library's way.** Yes, in O, G and N, each body with its precedent. Of the record's three extensions, one reached him as an extension (G's `|self|`), two did not (O's `LEXICO`, G's pairs object).
- **What they do together.** N and V on `TypeAnalyzer.scala`'s normalization path (review.3); O and G interleaved in `FortressLibrary.fss` (the gather re-anchored O's lines in G's commit); N and W in `BuildEnvironments.java`, ordered by `changes.tex`; V's held half and O's, G's and N's hunks (`git apply --check` passes on main).

### Findings

Ranked by what they cost or risk next. Each gives its home.

1. **Fork 2's library half is held, and the 23 sites with it** (section 1). Within the rules and routed; it waits on a checker rung on `TypeAnalyzer.scala` (row 688) timed on the merged tree. Home: item 52 (`PLAN.md:285`), and batch 14's lists. Item 13's fork 2 line (`PLAN.md:322`) has no pointer to it and still says "It holds 36 of the distance stage's errors".
2. **The count's meaning has changed** (section 2): its 1 is now the component check's first error, and typing `body(i)` will raise it to the component's errors. Home: the entry at `PLAN.md:689`, whose "124" is O's tree's (99 on the merged tree), and the record of batch 14.
3. **Fourteen of the 22 open new rows have no PLAN line; two extensions and two pins never reached him as items; the cold read's six items have no home** (Part 4). Home: the coordinator's routing, and batch 12's measures 2 to 4, measure 2 unbuilt for the fourth batch running, measures 3 and 4 for the second.
4. **Clause (c) contested three fixes that sentences on record settled** (Part 2): 0.25M at least, no revert. Home: POSITIONS, "The judge's rulings.", his word, now three batches of evidence.
5. **N's edit of `Functionals.scala`, unreported**, in the file the Q48(b) wide rung edits next. Home: batch 14's record, in that rung's "Overlaps by file"; and a point-to-report line that every rung's manifest carries.
6. **Four skill sentences are false or misleading** (Part 3). Home: the skill writer, with review.1.
7. **The restart cost 0.61M**, recovered without a loss of work. Home: none needed; the resume held as the skill says.
8. **W's judge's row-407 correction is wrong; V's foreground stage cost a refill.** Low. Home: none; the gather already kept `:80`.

## Part 2. Did the redesigned practice hold

### The skeptics' 23 fixes

From the journal's `fixes`, each `SKEPTIC.md`, the judges' files and, for test first, the times in the transcripts. The kinds as in batch 12's review.

| Rung | Fixes | Defects | Contested, and why | Test first |
|---|---|---|---|---|
| N | `7dd0adf0c`, `1360a90b5` | 1 | `7dd0adf0c`, beyond the rung (it reaches a point to report); upheld | red on the head 20:12:50, fix and build, green 20:16:49, `testQuick` after (`SKEPTIC.md:34-40`); rows 681 to 683's `XXX` tests red with the defect masked 20:13:26 |
| V | `5773dbfbd` (four corrections) | 0 | none | `XXXCallerParamTwoBoundsClosedTrait` red with `h[\T\](x)` written (`SKEPTIC.md:116`) |
| O | `9322ecb28`, `782c547c1`, `f7e3f3ca4`, `4eaf4530f`, `dc97a82f5`, `99b8bbc3c` | 0 | none | `TupleOrderMixedRefused` and `ComparisonLazyLexico` red on the old code (`SKEPTIC.md:201`, `:238`) |
| G | `889c4a9a8`, `a61ecbc55`, `218048958`, `8e5ee323f`, `fc4e8e6ad`, `a5fcb174a` | 1 | `a61ecbc55`, beyond the rung (it changes a walk answer); upheld | red on the worker's code 21:05:14, green 21:07:09 (`JUDGE.md:30-35`) |
| W | `7b625cdf9`, `e8d377669`, `02f94f4a5`, `7737ff90d`, `ecda9d812` | 2 | `7b625cdf9`, beyond the rung; `e8d377669`, the worker argued; both upheld | red on the worker's head 21:25:18, `testSystem` 21:30 on the fixed code (`SKEPTIC.md:118-129`, `:170-176`) |

Every fix is sound and inside its rung, and every added test was written test first. Each skeptic again wrote its worker's `REPORT.md` from the journal: the harness refused all five workers' writes, as in batches 11 and 12, and the script's step held (`RECORD.md:148`).

### The four contested fixes and clause (c)

- **Three were contested by clause (c) alone**: N's and G's because they reach a point to report, W's fix 1 because its file is outside the list. Each skeptic cited the sentence that settles its fix: POSITIONS "Sizes." (N), the library's own range subscripts, which narrow with `narrowToRange` (G, `SKEPTIC.md:27`), the overloading chapter (W, `SKEPTIC.md:134`). The rule's clause (c), "it touches a path the section does not give the rung, or reaches a point to report" (`climb-batch-workflow.js:910`), made each one contested anyway.
- **One was contested on its merits**, W's fix 2, clause (a): the worker's decision 5 had argued against a skip. Its ruling was worth having.
- **Three batches running.** Batch 11, one ruling, 0.14M; batch 12, two, 0.30M; batch 13, three, 0.455M; no revert in six rulings. Batch 12's measure 1, clause (c) narrowed, awaits his word (POSITIONS, "The judge's rulings.").

### Workers, test first

Each worker's tests failed through the harness on the base's code before its first source edit: V 16:48:32 to 16:49:40 (4 of 6, 1 of 2, 3 of 3), first edit 16:50:33; N 16:48:57 (9 of 9), 16:51:53; O 18:30:12 (5 of 6), 18:31:50; G before 19:21:40 (3 of 3, `REPORT.md:69-75`); W 19:17:10 (4 of 7), 19:19:17. No test-first miss, as in batches 11 and 12.

### The practice's measures, against batches 8 to 12

| Measure | B8 | B9 | B10 | B11 | B12 | B13 |
|---|---|---|---|---|---|---|
| Written | 7.72M | 6.88M | 6.26M | 5.03M | 5.43M | 7.22M |
| Rungs, agents | 4, 21 | 4, 22 | 4, 21 | 4, 14 | 5, 17 | 5, 20 |
| Per rung, all roles | 1.93M | 1.72M | 1.57M | 1.26M | 1.09M | 1.44M |
| First calls | 1.44M | 1.40M | 1.47M | 0.62M | 0.72M | 0.89M |
| Refusal cycles | 25% | 20% | 28% | 2.7% | 5.4% | 6.3% |
| Skeptic fixes (defects) | | | | 19 (3) | 15 (2) | 23 (4) |
| Rulings, repairs | | | | 1, 0 | 2, 0 | 3, 0 |

Without the two stopped skeptic runs, batch 13 wrote 6.61M, 1.32M a rung.

### Batch 12's measures, a batch later

- Measure 1, clause (c) narrowed: not built; three more rulings, two of them by "reaches a point to report".
- Measure 2, a PLAN line for every row the gather opens: not built; 14 open rows without one.
- Measure 3, the points a decision reserves for him routed as items: partly. G's `|self|` reached item 45; O's `LEXICO`, G's pairs object, the two pins and W's `ComponentWrapper.java` edit did not.
- Measure 4, the cold read's items to PLAN: not built; the script logged "Items for the curator not in PLAN.md, for the coordinator: coldread.1, ..., coldread.6" (`wk5aos83j.output`, `logs`).
- Measure 5, `STAGE_BLIND` and `interpreter/env/`: untested; W ran no stage.
- Batch 11's measure 7, `ledger.py`'s routes: met again, 21 notes refused and row 665's claim not narrowable (gather.1). Finding 8, the `# machine` line's `FORTRESS_THREADS=1`: still in `summary.txt`.

### Misses, by kind

Numbered on from `batch-12-review.md`'s 398. "Found by" names the first to catch it.

Found inside the batch:
- **The change wrong.** 399, N's power above 4096 unchecked (skeptic N); 400, G's pairs' range subscript read as positions (skeptic G); 401, the shared extends list making W's check depend on unrelated declarations (skeptic W); 402, W's generic check refusing programs the base loads where walk loses bounds (skeptic W).
- **A new rule's effect elsewhere.** 403, O's bound refusing `Reflect`'s set of triples (worker O); 404, O's bound refusing unit and mixed-number pairs (worker O, extended by skeptic O); 405, `isLeftZero(Unordered)` now refused (skeptic O); 406, N's `KindEnv` change moving `GenericFnWithExcludes`'s first error (worker N, row 677); 407, G's two changed walk answers (worker G, one by skeptic G's fix).
- **A premise of the record or a judgement that does not hold.** 408, fork 2's cost after the crash fix (worker V); 409, the count to 0 (worker O); 410, V's brief's two test shapes (worker V, skeptic V); 411, Q45's "No value walk prints today changes" (worker G); 412, `Array3` still hidden after the typed parameters (worker N, row 680).
- **The team's code, found by the rungs' probes.** 413 to 436, rows 671 to 694: by workers 671, 672 (O), 673 (G), 675 to 680 (N), 684 to 688 (V); by skeptics 674 (G), 681 to 683 (N), 689 to 691 (V), 692 to 694 (W).
- **Text or a record claiming more than the paths do.** 437, the skeptics' corrections (V's memo condition, N's Effects, O's citations and value changes, G's report, W's records); 438, nine places the review corrected (`510e80b8f`); 439, 23 wordings the cold read fixed (`29e4b4bd8`); 440, ten FACTS sentences the commit listed.
- **Process.** 441, every worker's report write refused, five of five (the skeptics, by the script's step); 442, `ledger.py`'s refusals (the gather); 443, two skeptic runs stopped by the VM restart (the resume).

Found by this review:
- 444, 14 open new rows without a PLAN line (Part 4).
- 445, O's `LEXICO` and G's pairs object not put to him as extensions; the two pins and W's `ComponentWrapper.java` edit without a PLAN line (Part 4).
- 446, coldread.1 to .6 with no home (Part 4).
- 447, N's `Functionals.scala` edit outside its section, reported by no one (Part 1).
- 448, clause (c) contesting three fixes that cited sentences settle (above).
- 449, four skill sentences false or misleading (Part 3).
- 450, W's judge's row-407 correction (Part 1).
- 451, V's 600 s foreground stage and its 309K refill (section 4).
- 452, PLAN's count entry giving O's tree's 124 for the merged tree's 99, and stale lines (Part 4).

**Against the earlier notes.** 45 found inside the batch (399 to 443), 9 a rung, against batch 12's 6. By whom: workers 23, skeptics 16, the gather, the review, the cold read and the commit one each, process two. No test-first miss. Landed: no wrong value known; the known costs are rows, listed points, and fork 2's sites still open.

### Measures the evidence supports, each with its cost

1. **Clause (c) without "or reaches a point to report"**, and a fix whose settling sentence the skeptic cites counted as settled. POSITIONS, "Reversible stops do not hold a batch.", already lands points to report. Evidence: three batches, six rulings, 0.90M, no revert; here N and G alone 0.25M. His word (POSITIONS, "The judge's rulings.").
2. **A record that builds a judgement's default whose cost is unmeasured names its fallback.** Fork 2's judgement said its time was "measured only after it"; the record asked only for the time as a point. One sentence in the record's form ("if a stage cannot finish under the change, hold that half, list it, land the rest") would have made V's decision 5 the record's, not the worker's. The record writer's.
3. **The gather lists, as a point to report, every rung file outside its section's file list**, from `git diff --name-only` against the section. Evidence: N's `Functionals.scala`, missed by four agents. One step of the gather.
4. **Batch 12's measures 2 to 4 again**: a PLAN line per opened row, the reserved points as items, the cold read's items to PLAN. Each one step of the gather or the script.
5. **The count stage's limit and a stage without a total.** A count stage that runs out is red today (`run.sh:72-76`, `climb-batch-workflow.md:226`), though POSITIONS says the count is "never red". Whether a timeout should report "no total" and stay green is his to say; it bears on item 52's way (2).

## Part 3. Skill sentences the batch made false

The gather folded five entries into the part on the revival's changes and amended `interpreter.md`'s `override` bullet; the review corrected one entry and the cold read 23 wordings. What is still false or misleading on `main` at `d5c6167ab`:

| File:line | The sentence | What is true now |
|---|---|---|
| `.claude/skills/fortress-repo/references/interpreter.md:43` | Walk refuses an `override` that overrides nothing "in a trait, object or object expression", and "does not refuse an `override` in an object expression over a declaration at a static parameter of the function around it." | Since `e8d377669`, walk also does not refuse one in a generic trait or object that extends a type under an `extends` clause's `where` clause, where the inherited parameter types mention a static parameter and differ from the override's (`Constructor.java:598-600`, `:641-666`). The review probed `object H[\T\](y: T) extends A[\T\] where { T extends ZZ32 }` loading (review.1, `PLAN.md:707`). And at an instance of a generic trait above a declared object, equal parameter types count as overridden (`Constructor.java:599`; QW-a, `PLAN.md:702`), which the bullet's "own parameter types" sentence does not say. |
| `.claude/skills/fortress-repo/references/revival-changes.md:66` | "There it does not refuse an `override` of an inherited declaration whose parameter types mention a static parameter with bounds that walk does not read" | It still refuses one at the inherited declaration's own parameter types: the lenience needs `!sameParameterTypes(m, o)` (`Constructor.java:600`; `rung-walk-override/JUDGE.md:82`). coldread.4; no PLAN line. |
| `.claude/skills/fortress-repo/references/revival-changes.md:120` | "two values passed in one call have two sizes, and the size does not reach a type that names another size" | That is the compiled checker. Walk binds each size at dispatch and runs such a call (skeptic N's `SkReflectWalk`, "two values in one call", the same on the old and new code, `rung-size-expressions/SKEPTIC.md:25`). coldread.3; no PLAN line. |
| `.claude/skills/fortress-repo/references/revival-changes.md:146` ("Mixed number types in a generic call") | "if the arguments of one type parameter mix number types, it takes the narrowest type into which all of them convert" | Not for an element of a tuple argument: walk takes their join and, since rung O, refuses `(1,2) < (1,2.5)` (row 511; the entry beside it at `:126`). The gap is older than the batch; the batch made it a refusal. coldread.2; no PLAN line. |

Not false, but each leaves out what a later rung needs:
- coldread.1: the "Comparing pairs and triples" entry's `Reflect` sentence gives no reason (the set compared triples the bound refuses, `9ba86f7da`).
- coldread.5: "Arithmetic in a size" leaves out that a power of a base other than 0, 1 and −1 above exponent 4096 is refused as outside every kind.
- coldread.6 asks whether the generator entry or the record holds: the entry does. The record's "No value walk prints today changes" (`CLIMB-BATCH-13.md:106`) was a prediction the rung disproved (`rung-generator-size/REPORT.md:214`; the skeptic's fix). Nothing to change in the skill.
- The coordinator skill's resume sentences held (`.claude/skills/coordinator/references/agents.md:62`, `:73`).

One writer task covers the four rows and the two omissions; none blocks batch 14.

## Part 4. Routing

Checked against `main` at `d5c6167ab`. The coordinator's landing routing, which the record's "After the landing" names (`CLIMB-BATCH-13.md:505`), was not yet done there; its boot note says it waits for this review.

### The script's 53 items

The result's `forCurator` holds 53 items: 47 marked in PLAN, six not (`wk5aos83j.output`). I found each of the 47 at the entry the gather or the review named:
- **"Pavol's answers"**: item 13's fork 3 line (N.worker.1, N.skeptic.1; `PLAN.md:323`); item 43 (O.worker.4, O.skeptic.4, .5; `:261`); item 45 (G.worker.1, G.skeptic.1; `:265`); item 52, new (V.worker.1, V.skeptic.1, review.3; `:283-285`).
- **Earlier lists**: row 488's entry (N.worker.5; `:626`, no sentence added, rightly: the site is on the gate's list); batch 12's gather.2 (gather.1; `:676`); batch 12's Q2 (review.2; `:674`).
- **"Climb batch 13, listed for his review"** (`:685-708`): the other 33, one entry each or shared.

Each states a default, or says it is for information or holds nothing, but one: the count's zero (`:689`) says "No default on record" under a preamble that says "the default is what landed", batch 12's finding 4 again. It has a natural default: as landed, the count read as it is.

**Not in PLAN: coldread.1 to .6** (Part 3). Proposed: one entry under the batch-13 list for the skill writer, beside review.1.

### What the record listed for him, and PLAN lacks

The record's "Points the batch lists for you" (`CLIMB-BATCH-13.md:123-128`) and the gather's points (`RECORD.md:191-224`) against PLAN:
- **`Comparison`'s lazy `LEXICO`**, an extension under the library rule (three api lines; precedents `:177`, `:211`, `CompilerBuiltin.fsi:704`): item 43 names it only as built.
- **`SimpleIndexValuePairs`**, the third extension the record named (not in the api): no entry as an extension.
- **The pin `LibraryMeetDeclarations.fss:33`**, `isLeftZero(LessThan)` `false` to `true`, "listed for you" (`:121`): no line. Row 582's own entry (`PLAN.md:567`) still ends "Left with the row for his choice" and does not say he decided it or that it landed.
- **The pin `NumberOrderListDeclarations.fss:41`**, `((1,2),3) < ((1,3),0)` from `true` to a refusal: no line.
- **W's `ComponentWrapper.java` edit** outside its file list (`RECORD.md:223`): no line. (The skeptic's `SymbolicType.java` has one.)
- **`isLeftZero(Unordered)`**, now refused where the team's overload answered `true` (`RECORD.md:209`): no line; it follows his row 582 decision.
- Proposed: one entry under the batch-13 list, "Extensions and pins of climb batch 13", default as landed.

### New rows

Rows 671 to 694, 24, each by `ledger.py add` in apply order. Closed: 684, 692. With a PLAN line: 672 (`:690`), 673 (`:696`), 674 (`:694`), 675 (`:699`), 682 (`:700`), 683 (`:698`), 688 (`:285`), 693 (`:706-708`). Without one, 14, with the line each needs:
- 671, `IntMap`'s `SYMDIFF` of a many-entry and a one-entry map: the next library rung's slips, beside 668 and 669.
- 676, walk stops on a power in a size: the next walk rung.
- 677, the checker reads no `where` constraint as a bound: the `where`-clause line, beside rows 433, 636 and 436.
- 678 and 679, `Array2`'s three sites now on the distance: batch 14's array lists, as the record placed them (`CLIMB-BATCH-13.md:333`).
- 680, `Array3`'s crash at `plane(k)`'s loop, hiding its two run-time-size calls: beside the third crash row, `body(i)`, in batch 14's lists.
- 681, no size inference to an expression: the next sizes checker rung, beside 683.
- 685, the two factory sites: a checker rung once traced (`CLIMB-BATCH-13.md:329`).
- 686, 687, 689, 690, the two-bound defects behind fork 2's half: item 52's checker rung.
- 691, a generic call with extra arguments accepted: the next checker rung.
- 694, the checker keeps an overridden declaration for a numeral call: row 653's compiled half, his entry on the code generator's `override`.

### Answered or decided items still open in PLAN

- Item 15 (`PLAN.md:198`): "One checker rung ... in batch 13": built by `7fd8fddc8`, not marked.
- Row 582's entry (`:567`): decided by him and built by `9ba86f7da`, not marked.
- Item 13's fork 2 line (`:322`): no pointer to item 52; its "36 of the distance stage's errors" is two batches old.
- Phase 3's item 11 (`:122`): "Batch 13, its record not yet drafted"; batch 13 has landed. The lines under item 10 for rows 660, 665 and 667 (`:119-121`) are fixed or half-fixed by this batch, not marked.
- The count's entry (`:689`): "124" is O's tree's; the merged tree's component count is 99.
- FACTS, as the commit listed (`FACTS.md:56`, `:57`, `:66`, `:78`, `:120`, `:149`): the coordinator's consolidation, which the record's "After the landing" names.

### Notes not written

21 of the records' 23 notes, refused by `ledger.py` (gather.1); their texts are in `climb-batch-13/RECORD.md`, "Ledger notes not written". Row 665's claim, which rung W asks to narrow to its abstract half, has no route. Home: the coordinator's hand edit or the tool, batch 11's measure 7.

## What I did not do

- I built nothing and ran no Fortress program, suite or stage. I ran my own read-only scripts under `tmp/rev13/`, `ledger.py heads`, and one `git apply --check` of `d3d31b5b2`'s library diff, which writes nothing.
- I cite `batch-measures.py`'s figures from the brief and did not run it; my per-agent script agrees with them.
- The site-by-site count maps lines through the batch's diff; a site whose line a hunk changed counts as gone unless the new list has it at the new line. The 102 matched sites keep their messages, digits aside, but the export site's reordering.
- I did not measure the skill's load per agent, as batch 12's review did.
- I did not judge the new specification passages line by line beyond what the skeptics, the review and the gather's build checked.
- The transcripts keep no reasoning, so Part 2 reads what agents ran and when.
- The INDEX line for this note is the coordinator's.

## For Pavol

- All five rungs follow your decisions and the specification. Every fix by a skeptic was sound and test first. The three rulings were right.
- Distance 153 to 105, not the 79 the record expected:
  - N 23 gone and 3 come, O 19, G 9, V 0, W 0.
  - The 26 difference is rung V's held half (fork 2's 23 sites and row 437) and `Array2`'s 3 new sites, now visible.
- Rung V held fork 2's library half (the two-trait bound on `Vector` and `Matrix`):
  - With the bound, the checker's overloading check of the library takes about 17 minutes. The count stage stops at 15 minutes, so the gate would have gone red and stopped the batch.
  - The worker decided it, measured. The skeptic agreed. It landed reversible, as your rules ask, and is item 52.
  - It now waits for a checker fix of that slowness, timed on today's tree. The held patch still applies to main as it is.
- The count stays 1, and the record was wrong to expect 0:
  - Every api error is gone. The 1 is now the first error of the library's component check, an untyped `body(i)`.
  - When that one line is typed, the count will jump to the component's errors, about 99 by the distance, before it falls.
- Cost 7.22M, 20 agents, 6 h 24 min (batch 12: 5.43M; the record said about 5.8M). The extra comes from:
  - 0.61M of two skeptics stopped by the VM restart and started again;
  - 0.39M of rung V measuring the held half;
  - a third ruling, 0.16M.
  - Rung N cost what was planned for two rungs in one.
- Three rulings again upheld the skeptic and changed nothing. Two of the three judges ran only because a fix reached a point to report, which the rule sends to a judge. That rule waits for your word.
- Things you should hear that are not in your list:
  - Rung O added `Comparison`'s lazy `LEXICO` (three api lines) and rung G a small pairs object. Your library rule says you judge these; neither reached you as such.
  - Rung N edited `Functionals.scala`, outside its files, unreported. The Q48(b) wide rung edits that file next.
- Four skill sentences are false or misleading; 14 new rows need PLAN lines.
