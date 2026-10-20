<!-- The combined post-batch review of climb batch 20 (run wf_4cf8e3cb-bf5, base 97ccd5f1f, 07:07 to 09:17 UTC on 2026-10-20, its push held on two points and pushed at about 11:55 UTC after the curator's answers: rung I 5ad4a9957, rung A's change in the coordinator's e487cec2d with its record 444f37018, the closes 408910f26, the gather record d3a9335ef, the review's corrections 63e1a6eb1, the gate's tables 510fac459), owed at the landing, in the form of reviews/batch-19-review.md, by a review worker reading only, against main at 066725e0a. Left out of the batch's measures: the coordinator's commits in the run's range (4968ba966, 247bced1b, 253dd4e58, 56d084018, e487cec2d's boot-note line, 4324e660d, f258c3dd9), counted only in section 6. The measures are batch-measures.py's and spend.py's on batches 17 to 20, transcript-study/skill-load.py's on 20, the task-list archaeology's cost.py (its section 5) on 17 to 20, and batch 19's review's scratch scripts, adapted to batch 20's briefing keys; the per-site list was compared at ebd39a6bd and 510fac459 with perf-probes/array-sites/compare-sites.py. Tokens are writes only (input plus cache creation, one count per message id). -->

# Climb batch 20: conformance, the count, the cost, the practice, the routing and the early push

## What came up in this run

### 1. The count 3 and the distance 5, row by row

**As the record expected them.** The record expected the distance 5 and the count 3, by the planner's run of the two rungs' whole library text through both stages on the base, and declared neither (`coordinator/CLIMB-BATCH-20.md:26`, fork 20 at `:82`). The gate read `COUNT DOWN   28 -> 3, declared none` and `DISTANCE DOWN   31 -> 5 (-26)` (`compile-ladder/climb-batch-20/gate/summary.txt:118`, `:125`), on `d3a9335ef`. The launch's boot note (`d0870885a`) calls the two figures "declared"; the record and the gate say they were not. Nothing turns on it, since neither stage turns the gate red (P-39).

**Each moved row of the gate's tables, tied to a rung edit:**
- `checker-count.txt`: `#total 28` to `3` and `#locations 27` to `3`; every api row stays 0, and `#crash none` (`gate/checker-count.txt:1-17`). Rung I took 6 errors: its tree read `#total 22` (`rung-integer-power/SKEPTIC.md:20`). Rung A took 19: its tree read `#total 9` (`rung-array-sites/SKEPTIC.md:22`). 6 + 19 = 25, and 28 - 25 = 3. The three left are `Library/FortressLibrary.fss:1465` (item 46's fused arm) and `:4386`, `:4392` (row 731's two `BIG MIN` sites), by the gate's result (`checkerCount`).
- `distance.txt` (`gate/distance.txt:10-16` against `climb-batch-19/gate/distance.txt:10-18`):
  - `kind typecheck 29 -> 4`: I's 6 sites (`QQ`'s body three times at the base's `fss:642` and once at `:643`, `strToInt` at `:4540`, `strToFloat` at `:4556`), by `power.patch`'s `typecase` in `QQ`'s `^`, the typed integer powers and `fail[\ZZ32\]` in `strToInt`, in `5ad4a9957`; A's 19 (14 bodies, 3 factory arms, `Col` and `Row`), by `ways.patch`'s casts and leaf `fill` and `tabulate`, in `e487cec2d`.
  - `kind export 2 -> 1` and `class X1 2 -> 1`: the first export error, gone whole with its 17 entries, by `e3-rebased.patch` (14 entries) and `ways.patch`'s `array3(v)` and the two `immutableArray` ranks put in a comment (3 entries), in `e487cec2d`.
  - `class V2 17 -> 0`: A's 14 bodies and 3 factory arms, the classifier's "body has type Array..." rule (`coordinator/tools/distance/classify.py:372-373`).
  - `class OT 9 -> 2`: A's `Col` and `Row` and I's five sites other than the filter. `class GF 1 -> 0`: I's filter at `:642`.
  - `unit component FortressLibrary 30 -> 4`; `class BR 2` and `unit component List 1` unchanged.

**The per-site list** (`compile-ladder/gate/distance-sites.tsv`, `ebd39a6bd` against `510fac459`, `compare-sites.py`: 'landed 31 now 5'):
- **Gone:** 26, as above.
- **Came:** none.
- **Moved:** three, by line only. `BIG MIN` from `:4368` and `:4374` to `:4386` and `:4392`, eighteen lines down: rung I's `typecase` adds two lines at `:641-648` and rung A's hunks sixteen above `strToInt`. Item 46's site from `:1463` to `:1465`, by rung I's two. The gate's comparisons hide these moves; `coordinator/references/batch.md`, "The checker count and the distance", puts every hidden difference on the review list, and none is there (finding 9).
- **The second export error's entries,** 44 to 43: `MultiplicativeRing`'s entry gone, and `QQ`'s narrowed from three differences to "Asbtract method isNaN ... is not declared in the API", both by rung I's api lines (`Library/FortressLibrary.fsi:283`, `:431`).

So the 5 left by class: the second export error 1 (X1), row 731's `BIG MIN` 2 (BR), item 46's fused arm and row 731's `List.fss:146` (OT 2) (`gate/distance.txt:12-14`).

**Outside the tables.** The ladder: 85 of 85 at pass, no move; all 18 microGPT components at disambiguate, the same first errors (the gate's result, `ladder`). Both rungs edited an api that the compiled path can read, and both ran the eighteen components' phase step that batch 19's finding 6 asked for: no move (`compile-ladder/climb-batch-20/RECORD.md`, "Points to report").

### 2. The stages' times against batch 19's gate

**The figures.**
- **The count stage:** 63 s at the gate, run alone after the ladder (started 09:09:47 UTC, the review ended at 09:09:13), against 64.5 s at batch 19's gate. The rungs' own runs: I 71 s at load 6.25 beside rung A, A 67 s (`RECORD.md`, "Points to report").
- **The distance stage:** 161 s, `FortressLibrary` 116 s, load 1.29 at start, started at 08:52:26 beside the ladder's copy of the caches and `testFast` from 08:53:24 (`gate/distance.txt:18-19`). At batch 19's gate, 153 s and 111 s, load 1.85, beside the library order and `testFast`. The planner's run of the same library text on an idle machine took 139 s (`CLIMB-BATCH-20.md`, section 4); rung A's tree took 152 s.
- **The suites:** `testFast` 5 min 37 s against 5 min 22 s, 2,070 tests against 2,068; `testSystem` 3 min 11 s against 2 min 54 s, 668 against 664; `testSpecData` 59 s against 54 s, 130 both; `compileAll` 60 s against 42 s, both from emptied caches (`summary.txt:61-68` in both).
- **The gate:** 21.7 minutes (08:50:18 to 09:12:00), against 20.4.

**How far load explains them.**
- **The count stage: the same.** Neither rung changes the checker; 63 s alone sits inside batch 19's spread on unchanged checker code, 61 s to 75 s.
- **The distance stage: load, not the rungs.** The same library text took 139 s idle and 161 s beside `testFast`. 26 fewer sites saved nothing that one run can show.
- **The suites: not by their size.** Four more tests in `testSystem` and two in `testFast` do not make 17 s and 15 s. The summary's machine line, written at 09:04:07 inside the gate, reads load 2.90, 5.22, 3.53 against batch 19's 1.57, 4.53, 3.46 (`summary.txt:73` in both). `compileAll`'s 18 s more may come from rung I's seven Java files, `WellKnownNames.java` among them, which one run cannot separate from load. Nothing ran beside the gate but the review, which reads.
- **The disk:** 3.4 GB free at the gate's start (the gate's result, `summary`); the gate sweeps the parser folders only under 1 GB.

### 3. The cost, by role, against the record and batches 17 to 19

`batch-measures.py` on the four runs and `spend.py` on the run's folder. Batch 20 wrote **2.64M over 8 agents**, in 2 h 10 min (07:07:36 to 09:17:58 UTC).

| Role | B17 | B18 | B19 | B20 | B20 share |
|---|---|---|---|---|---|
| Rung workers | 2.42M (5) | 1.65M (3) | 1.29M (4, two killed) | 848K (2) | 32.1% |
| Skeptics | 2.20M (5) | 1.31M (3) | 966K (2) | 757K (2) | 28.7% |
| Judge, on a rung | 0 | 157K | 0 | 0 | 0 |
| Gather | 587K | 538K | 439K | 426K | 16.1% |
| Merged-diff review | 426K | 390K | 425K | 362K | 13.7% |
| Its judge and repair | 275K + 314K | 238K + 377K | 196K + 210K | 0 | 0 |
| Gate | 138K | 156K + 154K | 149K | 117K | 4.4% |
| Commit | 159K | 151K | 152K | 131K | 5.0% |
| **Total** | **6.52M** | **5.13M** | **3.82M** | **2.64M** | |
| Agents, rungs | 16, 5 | 14, 3 | 12, 2 | 8, 2 | |
| Span | 5 h 28 | 3 h 56 | 2 h 56 | 2 h 10 | |
| Per rung, all roles | 1.30M | 1.71M | 1.91M | 1.32M | |

**Against the record**, about 3.4M, from 3.0M with no contested fix and no blocking review to 3.9M with a judge and a repair round, and about 3 hours (`CLIMB-BATCH-20.md:50-55`). The run wrote 0.36M under the low figure and took 50 minutes less:
- **Workers, 0.10M under** 0.95M: I 454K against 0.55M, A 394K against 0.40M.
- **Skeptics, 0.09M under** 0.85M: A 397K, I 360K.
- **The fixed roles, 0.16M under** 1.2M: gather, review, gate and commit 1.04M.
- **No judge and no repair round:** no fix was contested, and the merged-diff review blocked no code; its two holds stopped only the push.

**The empty task list explains most of it.** The record's figures come from batch 19's, whose agents carried the shared task list's reminders: 718K of batch 19's writes, 18.8 %, were those reminders (below). Batch 20's carried 35K. At batch 19's rate per call, 0.70K, batch 20's 932 calls would have written about 0.65M of reminders, and the run about 3.3M, near the record's middle figure. The fixed roles show it most: the gate wrote 117K against 149K, with 2K of reminders against 30K; the commit 131K against 152K, 2K against 30K; the review 362K against 425K, 3K against 67K.

**Against batches 17 to 19.** Per rung, all roles, 1.32M is the lowest of the four. Workers and skeptics together, per rung: 0.80M, against 1.13M (B19, 0.95M without the killed pair), 0.99M (B18) and 0.92M (B17).

**The briefing's share.** Four agents were briefed: the two workers and the two skeptics. All four ran their briefing, none in its first turn, at calls 9 to 12, 48 to 78 s after start. Its results came to about 89K tokens, 3.4 % of the run's writes: I 29K, A 36K, skeptic I 13K, skeptic A 11K (results at 0.40 tokens a character plus 110 a call, `process-engineering/labor.md`'s rate). Batch 17: 203K, 3.1 %, 11 agents; batch 18: 140K, 2.7 %, 8; batch 19: 162K, 4.2 %, 7. Per briefed agent, 22K, against 23K, 18K and 18K. The two skeptics wrote their briefing to the session's scratchpad and read it back from there, so batch 19's script, which counted only a file named "briefing", missed their reads; the script here also counts the file each briefing call wrote.

**The task-list reminders' share,** by the method of `process-engineering/task-list-archaeology.md`, section 5 (its `cost.py`, 0.40 tokens a character, the reminders kept in context and re-read on every later call): **1.0 %** of the run's 240.6M input-side tokens, against 14.8 % in batch 19, 14.2 % in 18 and 11.4 % in 17. The method reproduces batch 19's 14.8 % on batch 19's folder. The reminders put 35K tokens into the agents' contexts and were read again 2.31M times; the task calls themselves 0.9K and 149K. Each agent got 5 to 19 reminders, 91 in all, each about 1K characters: the nudge and rung I's five tasks. Rung I alone used the tools: 5 creates in its first 3 minutes and 8 updates after; the other seven agents made no task call. The archaeology found that uptake follows the list an agent sees at its start (its section 1); this run started from the empty list that the coordinator moved out at 06:18 UTC.

**Other measures.**
- **First calls:** 468K (17.7 %), 7 cold, against batch 19's 575K (15.1 %), 8 cold. Only skeptic I started warm.
- **Cache refills:** 0, as in batches 14 to 19.
- **Refusal cycles:** none.
- **The skill's load** (`skill-load.py`): 258K, 9.8 % (63K of load text and 195K over 79 part reads), against batch 19's 391K, 10.2 %. Both workers read `fortress-repo`'s `sources.md`, 1K each, which the skill says not to load for a task.
- **Distance sites gone:** 26. **Rows:** 3 closed (438, 445, 678), 4 opened (791 to 794).

Per agent, in order of start (UTC; ids are the transcripts' `agent-<id>.jsonl`):

| Agent | Id | Writes | First call | Messages | Minutes | UTC |
|---|---|---|---|---|---|---|
| Rung I | a7da6b5c | 454K | 63K | 202 | 48.6 | 07:07-07:56 |
| Rung A | a2c0fe2b | 394K | 60K | 138 | 39.8 | 07:07-07:47 |
| Skeptic A | a819a523 | 397K | 66K | 134 | 29.3 | 07:47-08:16 |
| Skeptic I | a26770df | 360K | 32K | 135 | 29.0 | 07:56-08:25 |
| Gather | ab1fa80f | 426K | 67K | 139 | 24.9 | 08:25-08:50 |
| Gate | a0a2628a | 117K | 54K | 48 | 21.7 | 08:50-09:12 |
| Review | a4e8be8c | 362K | 66K | 88 | 18.9 | 08:50-09:09 |
| Commit | afe2d6df | 131K | 60K | 48 | 5.9 | 09:12-09:17 |

**Beside the run** (`spend.py` on the session's agents): the array sites' probe for ask 3, which rung A built on, 236K (03:39 to 03:58 UTC); the planner 562K (05:55 to 06:44); the record's review before the launch 344K (06:45 to 07:03). 1.14M, against batch 19's 1.60M. The review queue's sort (345K) and the task-list archaeology (244K) ran from 06:59 to 07:22, beside the launch, for the record, not for the batch. The landing's work comes after.

### 4. The tail

- **The gather** (426K, 25 minutes) applied I, then A, the manifest's order and the order of the lowest edited lines; neither declared `landsOnlyWith`, and both patches applied with no conflict (`RECORD.md:21-25`). On a seeded tree of its own, with both patches: 64 walk programs, 'OK (64 tests)', and 8 compiled tests, 'OK (8 tests)' (`:27-41`). It opened rows 791 to 794, closed 438, 445 and 678, folded F-263 and F-264, and rewrote F-35, F-53, F-54, F-58, F-84, F-158 and F-260 and three PLAN lines. Five ledger notes were refused for length and one cut to fit (`:128-137`). It found rung A's change committed outside it (section 6) and did not force-push.
- **The merged-diff review** (362K, 19 minutes): no blocking code finding; five record corrections in `63e1a6eb1`, F-241 and F-247 among them, which the gather had left false; two points that hold the push, review.1 (the third demo) and review.2 (the early push, with gather.3) (Part 2).
- **The gate** (117K, 22 minutes), green on `d3a9335ef`:
  - `testFast` 2,070 tests in 54 suites, the compiler track 1,280 to 1,282;
  - `testSystem` 664 to 668 (162, 171, 162, 173); `testSpecData` 130; the library track 86, the other-compiler track 263;
  - 42 of 42 atomic runs PASS; no ladder or microGPT phase moved;
  - its `# machine` line still reads `FORTRESS_THREADS=1` (`summary.txt:75`), batch 11's finding 8.
- **The commit** (131K, 6 minutes): the gate's tables landed, F-53 written, the specification's PDF built once (683 pages), the quick microGPT walk check run (below), and, by the script, nothing pushed: `pushHeld` true on the two points. Its commit check found `e487cec2d` without the `historical:` line that the manual asks of a commit touching the team's files (`coordinator/climb-batch-workflow.md:168`, `:251`; section 6).

### 5. The microGPT walk check

- **Its lines:** `summary.txt:133-136`: "VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS", "rc=0 secs=47"; "VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS", "rc=0 secs=41". The first pair is `MicroGptAplQuick` and the second `MicroGptFlatQuick`, by the run's result (`microgptWalk`); the lines still name no program (batch 18's finding 11).
- **Against batch 19:** 44 s and 36 s (`climb-batch-19/gate/summary.txt:133-135`). Both batches ran the two programs at once from empty caches with nothing beside them. Batch 20's started at 09:12:25 UTC at load 0.33 (five-minute load 2.06, the gate having just ended); batch 19's at 0.20, by the runs' own headers, which are not committed. Batch 17 gave 47 s and 40 s, batch 18 44 s and 38 s.
- **Reading: not shown either way, and a rung is on the path.** The Apl program's 47 s equals batch 17's; the Flat program's 41 s is the highest of the four landings. Rung I's change is off the model's path: its one integer power is `strToInt`'s, at nonnegative exponents (F-247), and `RR64`'s power over an integer, which the model's `beta1^t` uses, changed only in the api, which walk does not run. Rung A's change is on it: both programs declare views that extend `Vector` and `Matrix` (`explorations/run-c4/src/FlatArrays.fss:36`, `:55`, `:67`; `explorations/apl/mg/FlatArrays2.fss:44`, `:65`, `:128`) and add, subtract and scale them (`explorations/run-c4/src/MicroGptFlat.fss:57-79`), and each such call now passes its result through `cast`, a type test at run time. Two more facts point the same way and settle nothing: the count stage, alone three minutes before, took batch 19's time, so the machine was not slower then; and rung I's tree alone, beside rung A's work, gave 38 s and 46 s, between the two gates. One run each is not a pair. Both programs stay inside P-30's minute. A timed pair would settle it (finding 8).

### 6. The coordinator's commit of rung A's change

**How it came about.** The coordinator armed its check-ins one at a time: each check-in armed the next and rewrote the boot note's line with the new trigger's ID, then committed and pushed `explorations/coordinator/BOOT.md` in the main tree (`56d084018` at 07:54:07 UTC, `e487cec2d` at 08:41:25; their `BOOT.md` diffs change only that line). The gather had started at 08:25:21 and works in the main tree. It committed rung I as `5ad4a9957` at 08:38:35, then applied rung A's patch to the main tree's index with `git apply --3way --index`, to commit it with A's record folded. At 08:41:25 the coordinator's check-in commit took the whole index, so `e487cec2d`, titled "Boot note: the next check-in", holds rung A's library change, its three tests, its `REPORT.md`, `SKEPTIC.md` and `record.md`, and the boot note's line (`git show --stat e487cec2d`: 9 files, 700 insertions). The push sent it, with `5ad4a9957`, to `origin/main`, `origin/claude/worker-brief-fable-vnnuv8` and `origin/blinded-fable` (`git branch -r --contains e487cec2d`).

**Which rules it broke.**
- The run's own boot note: "Keep `main` free of other pushes while it gathers and commits" (`BOOT.md` at `56d084018`), and the record's launch step 5, "no other agent writing there or pushing `main` while the run gathers and commits" (`CLIMB-BATCH-20.md`, section 5).
- `fortress-repo`'s committing part, "each commit in one command that names its paths" and "If the commit edits the original tree, say so in its message" (`.claude/skills/fortress-repo/references/committing.md:20-28`). The gather's own staging broke the first as well: its patch stood staged between two commands, where its later commits staged and committed in one (`RECORD.md:19`).
- `cloud-container`'s "Arm all the check-ins of a series in one turn ... Do not chain reminders, each check-in arming the next one" (`.claude/skills/cloud-container/references/stops.md:59`), and the coordinator's "`send_later` reminders 45 minutes apart, in one turn" (`.claude/skills/coordinator/references/delegating.md:44`). The chain is what made a check-in edit and commit the boot note.

**What reached `origin/main` before the gate.** Both rungs' code: rung I's library, natives, tests, demos and specification in `5ad4a9957`, and rung A's library and tests in `e487cec2d`, with rung A's `record.md`, a rung's scratch file that does not land (the gather took it out in `444f37018`, 08:42:55). They stood there ungated for 31 minutes, from 08:41 to the gate's end at 09:12. The commit has no `historical:` line (`coordinator/climb-batch-workflow.md:168`), and its message names no edit of the original tree (the commit stage's check).

**What the gate then showed.** The gate ran on `d3a9335ef`, whose `Library/`, `ProjectFortress/`, `Specification/`, `build.xml` and `bin/` equal `e487cec2d`'s (`git diff --stat e487cec2d d3a9335ef` over them prints nothing): green, `testFast` 2,070, `testSystem` 668, `testSpecData` 130, 42 of 42 atomic runs, no ladder or microGPT phase move, the count 3 and the distance 5. So the code that went out early was the code that passed.

**What it cost.** The merged-diff review held the push on it, as a step that cannot be undone (review.2, with gather.3); rewording it needs a force-push of `main`. The push waited from 09:17 to about 11:55 UTC, 2 h 38 min, on this point and the third demo; he answered both at about 11:50 (`RECORD.md:285`): the history stays as it is. His rule of 11:50, commit only named paths, is in the coordinator skill (`1130effc7`, refined in `222c9d5fe`), with the coordinator's own rule that nothing in the main tree is edited or pushed while a batch runs, and a check-in file in the scratchpad in place of the boot note's trigger IDs (`.claude/skills/coordinator/references/batch.md`, "While it runs"). The gather's staging between commands is not yet covered (finding 14).

## Part 1. Conformance

### Method

As in `reviews/batch-19-review.md`: each rung's commit, its `REPORT.md` and `SKEPTIC.md`; its section of the record and the record's review before the launch (`coordinator/climb-batch-20-review.md`); the gather's `RECORD.md`; the run's result; and the code and the specification on main. Three standards, kept apart:
- the specification;
- the team's built intent and the library's own way (P-27);
- the decisions on record: P-153, P-40, P-26, P-27, P-80, P-79 as rewritten today, P-76 and F-262, and the record's twenty forks at their defaults (`CLIMB-BATCH-20.md:57-90`).

### The verdicts

- **Rung I, contract E: in the spirit of P-153, P-26 and P-80,** with two readings where the text splits (the exception's name, the numeral's power) and one where the specification's own examples now throw (the dimensions chapter). P-153 is built on walk and in the one library. The compiled path's own library still answers 0, as fork 13 planned.
- **Rung A, the array sites: in the spirit of P-40 and P-27,** with one choice where the library splits with itself (the `immutableArray` ranks), and one walk value that moves for a user type, which the record said would not.
- **No ruling.** Both skeptics approved, eleven fixes, none contested, none a defect of the change. The merged-diff review blocked no code.

### Where the text, the brief or the principles split

**1. `DivisionByZero` in the power's sentence, where the integer listing writes `IntegerDivisionByZero` (NEW-I-2, row 792).**
- What landed: a base of 0 at a negative exponent throws `DivisionByZero`, in walk's natives (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java:263-266`; the name a constant at `ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java:87`) and in the method entry (`Specification/basic-lib/basic-integers.tex:536`, the box at `:322`).
- The text it follows: "For integer results, division by zero throws a DivisionByZero" (`Specification/basic/operators/opr-overview.tex:165`), the completion chapter (`Specification/basic/evaluation/completion.tex:31`), P-153's own words, and both libraries, which declare only `DivisionByZero` (`Library/FortressLibrary.fsi:1114`, `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:747`).
- The text it departs from: the same chapter's listing, `throws IntegerDivisionByZero` on ÷, `REM`, `MOD`, `DIVREM` and `DIVMOD` (`basic-integers.tex:246-250`, again at `:460-464`), an exception that neither library declares. The chapter now names two exceptions for a division by zero.
- The principles agree: the later text, the built libraries and the decision all say `DivisionByZero`; only the listing differs, and it was not edited. Row 792 is `CONTESTED`, with a gated home.
- **Was he told?** Not yet. On the review list with a default, `DivisionByZero` (`PLAN.md:526`).

**2. `IntLiteral`'s `^` answers `IntLiteral` (fork 10).**
- What landed: `opr ^(self, b:AnyIntegral):IntLiteral` and `opr ^(self, b: IntLiteral): IntLiteral` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:552-554`, `.fsi:213-214`), where both answered `RR64`. The two declarations are the revival's, of 2026-10-02 (`9d2e4c856`).
- What P-153 names: "each integer type's `^`". The numeral's type is not one of the integer types: `AnyIntegral` comprises `ZZ`, `ZZ64`, `ZZ32`, `NN64` and `NN32`, and `IntLiteral` extends `Number` only (`Library/FortressLibrary.fsi:442`; `FortressBuiltin.fsi`'s `object IntLiteral extends { Number }`). So the fork applies the decision to a type it does not name.
- How the principles stand. The library's way points to `IntLiteral`: the type's other arithmetic answers `IntLiteral` (its `LSHIFT`, `RSHIFT` and `BITNOT` beside the power, `.fsi:210-212`). F-262 and P-76 leave no other way that keeps `2^3` an exact integer: no overload can see a numeral's sign, so a numeral's power has one type at every exponent. The team's later code is silent: the compiler's prelude declares no power on `IntLiteral` (`CompilerBuiltin.fsi:390-...`; its powers at `:267`, `:326`, `:385`, `:455-456`). The peers that type an integer power by its integer, Julia and Haskell, raise at a negative exponent too. The text splits: "This operation is defined in the usual way on numerals" (`opr-overview.tex:73`, left by fork 16), and the dimensions chapter's exact rational `25146/15625` from `10^{-2}` (split 3) read a numeral's negative power as a fraction, as the Working Draft did. So the fork is in the spirit, and its cost is split 3's.
- Under walk nothing moves: a numeral is a `ZZ32` value there (row 578). On the checker a numeral's power is now typed `IntLiteral`.
- **Was he told?** No. It is in the record's Fable review, section 1, which is written for him, and the boot note does not say that it was sent. On no review list; review-queue item 95 names it as needed by this batch.

**3. The dimensions chapter's unit factors now throw (gather.2).**
- What the text writes: `inch` as `2.54 \times 10^{-2}` meter, the conversion of miles as "`((2.54 \times 10^{-2})(12)(5280)/10^{3})`, or `25146/15625`", and the SI prefixes `deci` to `yocto` as `10^{-1}` to `10^{-24}` (`Specification/advanced/defining-dimensions.tex:217`, `:224-225`, `:310-319`).
- What the revised method entry gives them: an integer base other than 0, 1 and -1 at a negative exponent throws `IntegerOverflow` (`basic-integers.tex:534-537`), and a numeral follows it (split 2).
- The gather found it; rung I's report did not list it. Dimensions and units are not built, so no test or extracted example runs these lines.
- **Was he told?** Not yet. On the review list, with no default (`PLAN.md:538`).

**4. `MultiplicativeRing`'s `^` written `abstract` over any integer, with `RR64`'s api stating its own power over any integer (fork 7), and row 533.**
- What landed: `abstract opr ^(self, other:AnyIntegral): T` (`Library/FortressLibrary.fsi:283`), where the api wrote `opr ^(self, other:ZZ64): T`; and `opr ^(self, b:AnyIntegral):RR64` in `RR64`'s api (`:366`), the component's line under the team's "Shouldn't need this extra declaration." (`Library/FortressLibrary.fss:486-487`). The entry left the second export error, and nothing came (the planner's (a) brought a site in `FortressBuiltin`; `CLIMB-BATCH-20.md`, section 4).
- The library's way: the same api writes `abstract` for the trait's other bodiless members, `one` and `TIMES` (`fsi:279-280`); an api that states its component's declaration follows the export rule (`Specification/basic/components/apis.tex:249-256`). In the spirit.
- **Row 533, the model's numeral powers.** Its claim: the checker refuses `10.0^(-5)` (`explorations/run-c4/src/MicroGptFlat.fss:18`) as an ambiguous coercion between `RR64`'s `opr ^(self, b:RR64)` and `MultiplicativeRing`'s `opr ^(self, other:ZZ64)`. Fork 7 replaced the second. By reading, the refusal stays with a new partner: the numeral coerces into `RR64` (`fsi:302`) and into `AnyIntegral` (`fsi:443`), so `RR64`'s `^(self, b:RR64)` and its new `^(self, b:AnyIntegral)` each apply by a coercion, and `RR64` and `AnyIntegral` exclude each other, so neither is more specific. Not measured: the gate does not check the model against the one library, and the skeptic's note saying so was refused for length (`RECORD.md:128-137`). So the batch did not move row 533 by any measure, and its claim now names a declaration that is gone.
- **Was he told?** No. Fork 7 is in the record's Fable review, section 1. Review-queue item 29 says row 533 was needed by this batch, and the record did not name the row. On no review list.

**5. The api's two `immutableArray` ranks put in a comment (fork 5).**
- What landed: `immutableArray[\E\](x:ZZ32,y:ZZ32)` and its rank-3 twin inside `(* ... *)` in the api (`Library/FortressLibrary.fsi:1501-1504`), as the component has had them since the team's last commit (`Library/FortressLibrary.fss:2264-2271`). Part IV of the specification, the api rendered (`Specification/library/default-libraries.tex:27`), loses them at its next build.
- The text: no normative sentence names them; the only immutable array the specification mentions is a varargs parameter's (`Specification/basic/types-vals-vars.tex:363`). The library splits with itself, api against component, and the library has no `ImmutableArray2` or `ImmutableArray3`, so no program could call them. The built side wins by the library's own standard, as for `FlatString`'s pair in climb batch 19. In the spirit; removing the comment brings them back.
- **Was he told?** No. It is a point to report and in the record's Fable review, section 1; the record's "After the landing" asks that fork 5 go on his review list by name (`CLIMB-BATCH-20.md:330-332`), and the routing has not run.

**6. A `ZZ` power beyond the int's range raises `IntegerOverflow` (I.worker.3).**
- What landed: an exponent of any integer type is read by its sign and parity (`Int.java:268-282`); a `ZZ` or numeral power whose exponent is beyond `Integer.MAX_VALUE`, or whose result a `BigInteger` cannot hold, raises `IntegerOverflow` for every base but 0, 1 and -1 (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/BigNum.java:304-324`), where `(big(3))^(2^32)` answered 1.
- The text: "For integer results, overflow throws an IntegerOverflow" (`opr-overview.tex:155`), and the revival's shift entry on `ZZ`, "a result too large for the implementation to represent throws an IntegerOverflow" (`basic-integers.tex:738-739`). `ZZ` has no fixed width, so the word overflow is stretched; the skeptic reads the text as giving it.
- **Was he told?** Not yet. On the review list, default as built (`PLAN.md:528`).

**7. The third demo (fork 15), against his word at the time.**
- What landed: `alpha = 10^(-6)` became `alpha = 10.0^(-6)` at `ProjectFortress/demos/npbft.fss:130`, beside the two demos P-153 names, `BiCGSTAB.fss:211` and `BiCGSTAB2.fss:198`.
- The record's review added it as a default, "the same line in the same shape" (`coordinator/climb-batch-20-review.md:11`, `:20-21`), and the coordinator took it at the launch (`d0870885a`). His word then was "Let's not touch them", and PLAN's "Until he says, no demo is edited." (`PLAN.md:232`). By the coordinator skill, a decision that acts against his word goes to him at once as a hold. The queue's sort said so at 07:21 (review-queue item 43), and the coordinator sent the hold at about 07:40 UTC, 33 minutes after the launch; the merged-diff review held the push on it (review.1).
- No demo completes before or after: `BiCGSTAB` and `BiCGSTAB2` stop at their timing line (row 791), and `npbft` is refused at load (row 670) (`RECORD.md`, "Points to report").
- **Was he told?** Yes, by the hold. He answered at about 11:50 UTC: kept, with P-79 rewritten to keep every team demo running. The rung conforms to P-79 as it now reads.

**8. A moved walk value for a user type (A.skeptic.3).**
- What landed: `Vector`'s and `Matrix`'s `+`, `-`, unary `-`, `scale` and `pmul` return through `cast` to their declared type (`Library/FortressLibrary.fss:2536-2542`, `:2857-2861`). A user `Vector` whose `replica` answers a plain array now raises `CastError` at its `+`, where the base answered the plain array (SkOddView, `rung-array-sites/SKEPTIC.md:39`).
- The text and the library point the same way: the declared type is `Vector[\T,s0\]` (`fsi:1619`), and the base's value was not one. Fork 6 named this outcome. The record said "No value moves by A (F-260)" (`CLIMB-BATCH-20.md:87`), which held for the tree's tests and demos only. In the spirit; it is the record's premise that failed.
- **Was he told?** Not yet. On the review list, with no default (`PLAN.md:534`).

### Rung I, `5ad4a9957`

**What landed.**
- The library: `power.patch` byte for byte (`git diff 97ccd5f1f -- Library ProjectFortress/LibraryBuiltin | diff - .../power.patch` printed nothing, `rung-integer-power/SKEPTIC.md:50`): every integer `^` of `Integral`, `ZZ32`, `ZZ64`, `NN64`, `ZZ`, `NN32` and `IntLiteral` answers its base's type; `QQ`'s `^` a `typecase` over the five integer types (`fss:641-648`); `strToInt`'s `fail[\ZZ32\]` (`fss:4561` on main); fork 7's three api lines (`fsi:283`, `:366`, `:431`).
- Walk: the negative branch of the six `Pow` natives through `Int.negativePow` and `UnsignedLong.negativePow`, the exponent read by `Int.powCount`, the `ZZ` and numeral powers through `BigNum.pow`, `Int.divisionByZero()`.
- The specification: the method entry (`basic-integers.tex:534-542`), the box above the listing (`:320-324`), Appendix I's "The integer trait" and its line in "Passages not yet revised" (`Specification/appendices/changes.tex`).
- Tests: `IntegerPowerContractWalk` new; `QQPowerExponent` promoted; `realArith`, `compoundArray` and `simpleExp` respelled; the skeptic's compiled pair `XXXIntegerPowerContractCompiled` with `IntegerPowerContractCompiledLink`.

**Standard 1.** The revised entry gives contract E's three cases and the float or rational base, and the box gives the Working Draft's `2^{-1}` as `1/2` with the way back (`basic-integers.tex:316-324`, `:534-542`). Departures, each named: the compiled path's own library answers 0 and a raw exception at 0 (rows 441 and 523, home 2 now), and walk's numeral power answers a `ZZ32` value (row 578). Splits 1, 2, 3 and 6 above.

**Standard 2.** The precedents: the library's `typecase` over the comprised integer types (`fss:398-408`), `Int.overflow()` for `Int.divisionByZero()`, `Int.shiftCount` for `powCount` (`rung-integer-power/SKEPTIC.md:64-71`). The team's lines changed: every integer `^` declaration and `QQ`'s body (2008), the ring's and `QQ`'s api powers, the six natives, `strToInt`, the three team tests (2007) and three demos.

**Standard 3.**
- **P-153**: built on walk and in the one library, word for word, with a third demo. Its "Still to build" still stands in POSITIONS and still says two demos (Part 4).
- **P-26**: the team's later code types the power by its integer (`CompilerBuiltin.fsi:267`).
- **P-80**: the sign is tested at run time, in the natives.
- **P-79, as rewritten**: no demo that ran stops; the three lines keep their values (the planner's Java check, `CLIMB-BATCH-20.md`, section 4).
- **Forks 3 and 7 to 17**: the table below.

**Verdict: in the spirit.**

### Rung A, `e487cec2d` (its record `444f37018`)

**What landed.**
- The library: `ways.patch` then `e3-rebased.patch`, unchanged ("SAME-AS-PATCHES", `rung-array-sites/SKEPTIC.md:11`): `fill` and `tabulate` redeclared in `Vector` and `Matrix` at their own type; `cast` around nine bodies, three factory arms and `Col` and `Row`'s argument; `vector(v)`, `tabulatedVector`, `rmul`, `lmul` and `matrix(v)` through the leaf's own factory; the api's 17 operators without their unused sizes, its two `immutableArray` ranks in a comment, and `array3(v)` declared.
- Tests: the guard `VectorMatrixCastsWalk`, at the eight element types, with the skeptic's 2 by 3 block; `XXXArray2SliceAtNonzeroBase` (row 793) and the skeptic's `XXXArray3SliceAtNonzeroBase` (row 794).

**Standard 1.** No normative sentence names these declarations; Part IV renders the api; the arrays chapter's table of `fill` and `tabulate` and Appendix I's "Initializing an array from a function" stay true (`rung-array-sites/SKEPTIC.md:29`). The export rule (`apis.tex:249-256`) is what the first export error enforced, and it now holds for those 17 entries. Split 5 above.

**Standard 2.** The library's own devices for a result's precise type: `ImmutableArray1`'s leaf `fill` and `tabulate` (`fss:2409-2416` on main) and `array1`'s cast arms (`fss:2587-2594`), with `cast` itself (`fss:33-37`). The component already wrote the 17 operators without the sizes: F-35's 2008 fix, which E3 finishes in the api.

**Standard 3.**
- **P-40**: E3 built on the 17 operators and nothing else; the other eight unused sizes stay (F-35).
- **P-27**: the precedents above.
- **P-85**: none of the array design's three questions was needed.
- **P-87**: no model line changed.
- **Forks 2 and 4 to 6**: the table below.

**Verdict: in the spirit,** with split 8's premise.

### The record's forks, against what landed

| Fork | Rung | Landed |
|---|---|---|
| 1, the scope, I and A | both | Built |
| 2, the arrays and E3 one rung | A | Built; the first export error clears whole |
| 3, the integer power its own rung | I | Built |
| 4, the ways as `ways.patch` | A | Built, byte for byte |
| 5, the `immutableArray` ranks in a comment | A | Built (`fsi:1501-1504`); for his review by name, not yet listed |
| 6, the guard at eight element types | A | Built, with the skeptic's 2 by 3 block |
| 7, the ring's api power, text (c) | I | Built (`fsi:283`, `:366`); row 533 unmoved by reading, unmeasured |
| 8, `QQ`'s api exponent | I | Built (`fsi:431`) |
| 9, `QQ`'s `typecase` | I | Built (`fss:641-648`) |
| 10, `IntLiteral`'s `^` answers `IntLiteral` | I | Built; the text's numerals split (split 2) |
| 11, the exponent at any integer type | I | Built; beyond the int's range, `IntegerOverflow` but at 0, 1, -1 (I.worker.3) |
| 12, row 747's compiled test | I | Not statable: the compiled path refuses an `if` with a generator clause first, 'Variable __cond is not defined.'; the program is in the report, section 8 |
| 13, row 441 half fixed | I | Its note refused for length; the skeptic gave the compiled half a home 2 |
| 14, `DivisionByZero` a constant | I | Built (`WellKnownNames.java:87`) |
| 15, the tests and demos respelled | I | Built, three demos; held, then kept by P-79 |
| 16, the specification's sentences for E | I | Built; `opr-overview.tex:73` left and listed |
| 17, no speed pass | both | Built; 71 s and 67 s on the rungs' trees |
| 18, the second export error out | none | Kept; its probe for batch 21 is not in PLAN |
| 19, row 774 out | none | Kept; its probe for batch 21 is not in PLAN |
| 20, nothing declared | both | Kept |

### The global questions

- **Promised against landed.** Closed: 438, 445 (I), 678 (A). Opened: 791 and 792 by worker I, 793 by worker A, 794 by skeptic A. Count 3, distance 5, as the planner measured.
- **The record's premises that failed:**
  - fork 15 as a default, where his word made it a hold (split 7);
  - "No value moves by A (F-260)" (split 8);
  - the demos' line "run each once under walk on your final tree and say whether it completes": none completes on the base, so the check could only show that each still stops where it stopped (rows 791 and 670);
  - the cost, about 3.4M: 2.64M, because the task list was empty (section 3).
- **Built twice: no.** The review found no shared declaration, and main's code and tests are the two branch tips, rung A's modulo line offsets.
- **The library's way:** yes for each, with the precedents above.
- **Together:** no array body uses an integer power, and no power test uses an array; the gather's 64-program run held both rungs' tests and census on one tree, each as expected (`RECORD.md:41`).

### Findings

Ranked by what they cost or risk next, each with its home.

1. **Four items for him have no default, and one of them is not his.** A.worker.1 with A.skeptic.1 asks which batch fixes rows 793 and 794 (`PLAN.md:532`): by PLAN's method that is the coordinator's call, and the rows have no candidate line. A.skeptic.3 (`:534`), A.skeptic.4 (`:536`) and gather.2 (`:538`) have no default. Home: a candidate line for rows 793 and 794 under phase 3's next batch, with item 532 cut to a pointer; a default for each of the other three (proposed in "For the curator").
2. **The record's twenty forks and its points for his sight have no entry,** for the fourth time (batch 16's finding 4, 18's 3, 19's 2). Forks 5, 7 and 10 are named nowhere for him; the record asks for fork 5 by name. Home: one entry under "Climb batch 20, listed for his review", default as landed, naming forks 5, 7 and 10 and the points of section 2 (`CLIMB-BATCH-20.md:84-90`).
3. **Row 533 is unmoved by reading, unmeasured, and its claim names a declaration that is gone** (split 4). Home: review-queue item 29's text and a note that the routing writes by hand, since `ledger.py` refuses one; the measurement when the model is first checked against the one library (phase 5).
4. **His three answers of today are not yet in PLAN.** "Before climb batch 20's push" (`PLAN.md:128-132`) is answered; the demos' entry (`:232`) still says "Until he says, no demo is edited." and gives I.worker.2 the default "as they are", both replaced by P-79; items 38 and 59 (`:158-159`) are answered by P-155; item 18 says "Batch 20, not drafted" (`:58`); "Where we stand" and "Next" describe batch 19 (`:9-13`). Home: `PLAN-history.md` and one-line pointers, by the routing; review-queue item 43 and the item for item 38 likewise.
5. **P-79's "Still to build" has no PLAN line:** a measurement of which demos run, and a rung for those with a known way. Skeptic I measured one way already: `asFloat(t) / 1000000000.0` makes `BiCGSTAB` and `BiCGSTAB2` complete (`rung-integer-power/SKEPTIC.md:105`). Home: a candidate line in phase 3's next batch, with rows 791, 670 and 710.
6. **Batch 21's two probes are not in PLAN** (the record's "After the landing", `CLIMB-BATCH-20.md:332`): the second export error's check run to its end (fork 18) and row 774's walk values (fork 19). Item 18's lines name the alignment and row 774 but not the probe that comes first. Home: those two lines.
7. **Row 441's claim is false and its home 2 is not on the row.** "A negative power of an integer has no specified result" no longer holds, its reproducer cell reads "none", and `XXXIntegerPowerContractCompiled` is its compiled half's test; its notes are full. Rows 747, 523 and 465 hold one stale sentence each (`RECORD.md:196-203`). Proposed (mine): a new row for the compiled half with that test, and row 441 closed by `5ad4a9957` with `IntegerPowerContractWalk`, its close note pointing to the new row: the ledger's own `add` and `close`.
8. **microGPT's quick pair took 3 s and 5 s more, with rung A's casts on both programs' path** (section 5). Proposed (mine): one timed pair, `/home/user/fortress-base20` against the head, each program alone at load under 1, about 3 minutes of machine time and under 50K tokens, before the base build is removed.
9. **The three sites the comparisons hid as moved** (section 1) are on no review list, as `batch.md` asks. Proposed (mine): the rule exempts a move by lines alone that the batch's own hunks above the site explain, and the review names such moves as here.
10. **P-79's example misstates the batch:** "as climb batch 20's rung I wrote `10.0^(-6)` in three demos" (`POSITIONS.md:85`); two demos got `10.0^(-4)` and one `10.0^(-6)`, and the timing line it names is `BiCGSTAB`'s and `BiCGSTAB2`'s. Home: `record.py set`.
11. **The skeptic's structured result was refused by its schema again** (skeptic I, `/fixes/4/kind`; batches 18 and 19 the same), though the schema now describes the two words (`climb-batch-workflow.js:787`). Both skeptics' own tables use a third kind, "record", for the report written from the journal. Proposed (mine): add `record` to the enum.
12. **FACTS entries for the consolidation:** F-240's title is two gates behind; F-83's "the one string site left on the distance is `FlatString`'s export error" has been false since batch 19; F-263 and F-264 are 1,478 and 1,144 characters, past the record's 600; F-241 and F-247 wait to be folded into F-263 (`RECORD.md:196-203`; the commit stage's result). Home: the coordinator's consolidation.
13. **The skeptics wrote their briefing's output to the session's scratchpad,** `slice1.txt` both, over a scratch file of the coordinator's of that name, where the workers wrote theirs under the tree's `tmp/` as the skill says. The harness tells every agent to use the session's scratchpad. Proposed (mine): the script's briefing command names its own output file under the tree's `tmp/`, as the workers did by choice.
14. **The gather staged a rung's change in the main tree's index between two commands** (section 6). The coordinator's new rules keep other commits out during a run, but the gather's step is the open half. Proposed (mine): the manual's gather step applies and commits each rung in one command, as its later commits did.
15. **Rung A measured again what F-260 held:** the distance and count stages, the 40 array tests and microGPT's pair, on a library text byte-equal to the probe's and a code-equal base; its brief asked for each. Proposed (mine): where a rung lands a probe's patch byte for byte on a code-equal base, the record gives the probe's tables as the rung's, the skeptic checks the bytes, and the rung runs only what is new: its guard and the suites.

## Part 2. Did the practice hold

### The skeptics' fixes

From the run's result (each skeptic's `fixes`), each `SKEPTIC.md`, and the review's `fixesChecked`: 11 fixes in 11 commits, none a defect of the change, none contested.

| Rung | Fix commits | Defects of the change | Test first |
|---|---|---|---|
| I | `1cff513e5` (the report and record from the journal), `f39076fa8`, `4ae8b80ea`, `57142f4c9`, `2f78e98ce` | 0; one home 2 added (row 441's compiled half) | `XXXIntegerPowerContractCompiled`: on the old code 'Saw expected failure', 'OK (2 tests)'; with both assertions removed for one run 'Did not see expected failure', 'Tests run: 2,  Failures: 1'; restored, `cmp` clean (`rung-integer-power/SKEPTIC.md:159-168`) |
| A | `c258a3b5f` (the report and record from the journal), `6b1a256ab`, `fe3fc362c`, `b7b787c78`, `3baae9302`, `788107fd6` | 0; one new row (794) | `XXXArray3SliceAtNonzeroBase`: on the old code ' OK Saw expected exception'; red with `sliceAt3[\0,0,0\]()` for one run, ' Missing expected failure', 'Tests run: 1,  Failures: 1'; restored. The 2 by 3 block: a guard, 'PASS', 'OK (1 test)' on the old code (`rung-array-sites/SKEPTIC.md:64`, `:69`) |

- Every fix is sound and stays inside its rung's work; the three new compiled test files of skeptic I lie outside the files the record names for rung I, a point to report that the gather listed.
- Against the batches before: batch 19 made 9 fix commits with 2 defects, batch 18 11 with 3, batch 17 18 with 1. For the first time in batches 16 to 20 no skeptic found a fault of the change itself. Both rungs built probes' patches that had been measured whole before the launch.

### Workers, test first

Each worker's tests ran through the harness on the base's code before its first edit of source, as its skeptic read the transcript:
- **I**: the walk test written at 07:14:07 UTC and failing at 07:14:24, 'Tests run: 1,  Failures: 1'; the three team tests respelled and passing on the base at 07:14:52; `QQPowerExponent` failing on the base at 07:15:53, 'Value 3 might not fit in ZZ64.'; `power.patch` applied at 07:17:30, the first Java edit at 07:18:11 (`rung-integer-power/SKEPTIC.md:33-46`). The test was corrected after the build (07:22:43 to 07:23:06) and seen failing again on the old code at 07:23:27.
- **A**: the guard written at 07:15:49 and passing on the base at 07:16:31, 'OK (1 test)'; the expected failure on the base at 07:17:05 and red on a deliberate change at 07:17:25; the library edit at 07:19:55 (`rung-array-sites/SKEPTIC.md:23`). The rung's failing test is the distance stage, whose before is the landed list.

No miss of order, as in batches 11 to 19.

### The rulings

None: no fix was contested, no rung refused, no worker stopped.

### The merged-diff review and its two holds

- **No blocking code.** All eleven skeptic fixes checked; the two branch tips equal main's code; every curator item in PLAN (the review's result, `summary`).
- **Five corrections in `63e1a6eb1`:** F-241 and F-247, false after rung I and left by the gather; PLAN's "44 entries" without its tree; three placeholders; `RECORD.md` re-anchored.
- **Two holds on the push,** under a new PLAN group "Before climb batch 20's push" (`PLAN.md:128-132`): review.1, the third demo against his word, and review.2 with gather.3, the early push that cannot be undone. Both were right by the skill: one acted against his word, the other could not be undone. Both were answered by him at about 11:50 UTC.
- **The cost of the holds:** the push waited 2 h 38 min, and the landing's steps after it waited too, about 2 h 40 min by the coordinator's own count; `222c9d5fe` now has the landing's steps run on the local commits while only the push waits (`.claude/skills/coordinator/references/batch.md`, "The landing").

### The briefing in each agent's first turn

| Batch | Briefed agents | In the first turn | Run at all | At calls | Seconds after start | Its tokens (estimate) |
|---|---|---|---|---|---|---|
| 17 | 11 | 0 | 11 | 10 to 23 | 30 to 105 | 203K, 3.1 % |
| 18 | 8 | 0 | 8 | 3 to 25 | 17 to 85 | 140K, 2.7 % |
| 19 | 7 | 0 | 7 | 4 to 19 | 18 to 102 | 162K, 4.2 % |
| 20 | 4 | 0 | 4 | 9 to 12 | 48 to 78 | 89K, 3.4 % |

- Batch 20's four: the two workers and the two skeptics. For the share that `batch.md:45` asks at a landing, the share that read it at all: 100 %.
- The figures for 17 to 19 are batch 19's review's. The calls and seconds are from the transcripts, by a script that finds each agent's first `facts-extract.sh` call with the brief's keys; the tokens are a scratch estimate (section 3), which here also counts the file each briefing call wrote.

### Builds and runs, repeated or not

- **Builds** (`batch-measures.py`): rung I 1 (its Java natives); rung A 0 (library text only, which walk reads from source); the gather 1; the gate 1. The skeptics built nothing and ran their programs on the workers' builds.
- **Suites:** I `testSystem` and `testSpecData` once each on its final code; A the same (6 min 19 s for `testSystem`). No skeptic ran a suite, since no fix changed code.
- **Count and distance stages:** I once each, A once each, the gate once each. No skeptic ran them, since no rung changed the checker (`batch.md`, "The roles").
- **Re-measured without a code change:** rung A's distance and count stages, its 40 array tests and microGPT's pair, on the probe's byte-equal text over a code-equal base, all held by F-260 (finding 15).
- **Taken from the record, not run again:** the skeptics' tables (both read the workers' files); the planner's measurement of the two texts together, which the gather used and did not repeat; the gather ran no suite or stage.
- **Re-measured by design:** the gather's 64 walk programs and 8 compiled tests on the merged tree; the gate.
- **The PDF built once,** by the commit stage; batch 19 built it twice.

### Refusals by the harness and the tools

- **Both workers' writes of `REPORT.md` were refused,** as the script expects; each skeptic wrote the report and record from the journal.
- **One `sleep` call was blocked:** skeptic A (`sleep 60`).
- **Four `Edit` calls were refused for a file not read:** rung I 2, skeptic A 2.
- **One structured result was refused by its schema:** skeptic I, a fix kind outside the two words (finding 11).
- **Five ledger notes refused, one cut** (`RECORD.md:128-137`). Review-queue item 165 had predicted rows 523 and 441 before the batch landed.
- No refusal cost a cache refill.

### The practice's measures, batches 17 to 20

| Measure | B17 | B18 | B19 | B20 |
|---|---|---|---|---|
| Written | 6.52M | 5.13M | 3.82M | 2.64M |
| Rungs, agents | 5, 16 | 3, 14 | 2, 12 | 2, 8 |
| Per rung, all roles | 1.30M | 1.71M | 1.91M | 1.32M |
| First calls | 0.77M, 9 cold | 0.73M, 10 cold | 0.58M, 8 cold | 0.47M, 7 cold |
| Refusal cycles | 0 | 3.1% | 0 | 0 |
| Rulings and repairs on the merged tree | 9.0% | 12.0% | 10.6% | 0 |
| Skeptic fix commits (defects) | 18 (1) | 11 (3) | 9 (2) | 11 (0) |
| Distance, sites gone net | 14 | 1 | 3 | 26 |
| Count stage at the gate | 76 s | 70 s, 68 s | 64 s | 63 s |
| Distance stage at the gate | 180 s | 173 s | 153 s | 161 s |
| Skill's load | 9.5% | 9.4% | 10.2% | 9.8% |
| Briefing, estimated | 3.1% | 2.7% | 4.2% | 3.4% |
| Task-list reminders, writes | 0.97M, 14.8% | 0.93M, 18.0% | 0.72M, 18.8% | 0.04M, 1.3% |
| Task-list reminders, input side | 11.4% | 14.2% | 14.8% | 1.0% |

### Batch 19's findings, a batch later

1. **gather.2's default and the algebraic roots:** the entry stands (`PLAN.md:506`); not asked.
2. **The record's forks without an entry:** fixed for batch 19 (the entry under its list); repeated for batch 20 (finding 2).
3. **review.1 under batch 19's list:** done (`PLAN.md:514`).
4. **Rung P's words beyond the brief:** done (`PLAN.md:516`).
5. **Rows 787 to 790 without a candidate line:** done (`PLAN.md:68`).
6. **The microGPT first error's move:** on the list; and this batch's rungs ran the eighteen components' phase step, as proposed.
7. **No queue item for batch 19:** done (items 189 to 194, by the boot note).
8. **Built or stale items:** item 186 settled; the rest by the routing of `19510fa6c`.
9. **Four refused notes with facts no home holds:** unchanged; batch 20 adds five more (gather.1).
10. **P-45's last sentence:** narrowed (`53fdd6d34`, `19510fa6c`).
11. **The skeptic's structured result refused by its schema:** the schema gained a description; refused again (finding 11).
12. **The `comprises` limit at the forced instance:** still no row (`ledger-find:comprises forced` finds none).

### Misses, by kind

Numbered on from `batch-19-review.md`'s 585.

Found inside the batch:
- **The change wrong:** none.
- **A test that reached too little:** 586, the guard's matrices were all 2 by 2, so it could not tell `Matrix[\T,s0,s1\]` from `Matrix[\T,s1,s0\]` (`3baae9302`, skeptic A).
- **A defect half measured:** 587, row 793's `Array3` face, left "not measured" (`fe3fc362c`, skeptic A; row 794).
- **A defect without its home:** 588, row 441's compiled half, measured and named in Appendix I but gated nowhere (`4ae8b80ea`, skeptic I).
- **Text claiming more than the code or the evidence:**
  - 589, I's report: 17 array sites where the count has 19, and 21 `fail(` calls where the base has 20 (`57142f4c9`);
  - 590, I's FACTS entry and report: walk's numeral power answers its own type, against row 578 (`57142f4c9`);
  - 591, I's three test messages citing an entry that does not say what they assert, and "beyond 32 bits" for `2^31` (`f39076fa8`);
  - 592, I's row 792 citing the base's line (`57142f4c9`);
  - 593, I's row 791 repair stated, not run (`2f78e98ce`);
  - 594, A's test citations naming no section, and four claiming a 0-based column (`6b1a256ab`);
  - 595, A's record: no walk value moves (`b7b787c78`; SkOddView);
  - 596, A's report: a specification grep that "prints none" prints four lines (`b7b787c78`);
  - 597, A's row 465 note: no other case met, and longer than the row allows (`b7b787c78`, `788107fd6`);
  - 598, F-241 and F-247 left false by the gather (the review, `63e1a6eb1`);
  - 599, PLAN's "44 entries" with no tree named (the review, `63e1a6eb1`);
  - 600, three placeholders left in rung A's files (the review, `63e1a6eb1`).
- **Sentences made false and not listed:** 601, F-84 and row 533 (skeptic I, `57142f4c9`); 602, row 782's "17 entries" (skeptic A, `b7b787c78`); 603, the dimensions chapter's numeral powers (the gather, gather.2).
- **The record's premises:**
  - 604, the third demo taken as a default where his word made it a hold (the queue's sort at 07:21 and the coordinator's hold at about 07:40; review.1);
  - 605, "No value moves by A" (skeptic A);
  - 606, the demos' check on demos that never completed on the base (worker I; rows 791, 670);
  - 607, skeptic A's count of row 465's room against 1,200 characters alone, past the notes' own 700 (the gather);
  - 608, the cost, 3.0M to 3.9M, built on figures that carried the task list's reminders (this review).
- **The team's code, found by the rungs:** 609, rows 791 and 792 (worker I), 793 (worker A), 794 (skeptic A), each on the base too.
- **Process:**
  - 610, two report writes refused (by design);
  - 611, one `sleep` blocked, four `Edit` calls refused, one structured result refused by its schema;
  - 612, five ledger notes refused and one cut to fit (the gather);
  - 613, the coordinator's commit `e487cec2d`, which took the gather's index and pushed rung A's change before the gate (section 6);
  - 614, the check-ins chained, each one editing and pushing the boot note in the main tree during the run;
  - 615, the gather's patch left staged in the main tree between two commands;
  - 616, the skeptics' scratch in the session's scratchpad, both under one name;
  - 617, both workers read `sources.md`.

Found by this review: 618 to 632, findings 1 to 15 above.

**Against the earlier notes.** 32 found inside the batch (586 to 617), 16 a rung, against batch 19's 10. Most are small text claims that the skeptics caught; none is a fault of the code, and none landed uncaught but the premises and the process. The worst two are process, and the coordinator's: the early push (613, 614) and the third demo taken as a default (604). Landed: no wrong value is known. The known costs are rows 791 to 794, the specification's two names for a division by zero, the dimensions chapter's throwing examples, row 533's stale claim, and the 2 h 38 min the push waited.

## Part 3. Skill sentences the batch made false

For the skill writer. The gather's record gives the revival changes of both rungs and finds no skill sentence false by either (`RECORD.md`, "Revival changes, for the skill writer"); the writer's task 20 and its cold read took them (`0cf48c7b2`, `df58b05b8`), and the coordinator's two commit rules with the check-in file and the landing's sweep (`1130effc7`, `222c9d5fe`). Lines below are of `.claude/skills/` at `066725e0a`.

**Made false by batch 20, beyond those:** none found. I read the parts that the two rungs' subjects reach: `fortress-repo`'s `SKILL.md` on numbers, `library.md`, `interpreter.md`, `compiler.md`, `gate.md`, `committing.md`, `records.md`, `tests-writing.md` and `revival-changes.md` whole on numbers, arrays, sizes and abstract methods; `coordinator`'s `SKILL.md`, `batch.md` and `delegating.md` on check-ins, commits and the landing; `cloud-container`'s `stops.md`.

**Not false, but incomplete or stale, each met by this batch:**
- **`fortress-repo/references/records.md:56`**, "A row at its 1,200-character limit takes no further note.": `ledger.py` also refuses a note that takes a row's notes past 700 characters (`explorations/coordinator/tools/ledger.py:22-23`, `:115`). Row 441 stood at 702 of 700 and row 465 at 673; skeptic A counted row 465's room against 1,200 alone, and five notes were refused (`RECORD.md:128-137`). Add the notes' limit to the sentence.
- **`fortress-repo/references/interpreter.md:84`**, the quick pair "in about 56 s for both": at batches 19 and 20 the pair took 44 s and 47 s at once. Approximate, not false.
- **`fortress-repo/references/gate.md:3`**, "in about 25 minutes": 20.4 and 21.7 minutes at the last two gates. Approximate, not false.
- **P-79 has no worker-facing sentence.** A rung that breaks a team demo now rewrites it in the same batch where the way is known (`POSITIONS.md:85`), but no part of `fortress-repo` says that no suite runs the demos or how a rung checks one; `tests-running.md`, "Outside the gate" (`:54-57`), names `not_passing_yet/` and seven unrun folders, and not `ProjectFortress/demos/`. Briefs quote POSITIONS, so nothing is false; a line there would let a rung find the demos it touches.

**Rules the batch broke that stay true:** `cloud-container/references/stops.md:59` and `coordinator/references/delegating.md:44` on arming check-ins in one turn; `fortress-repo/references/committing.md:20-28` on one command per commit and on saying that a commit edits the original tree (section 6). No sentence needs a change for them; the coordinator's new rules cover the half that let them collide.

**Checked and not false:** `revival-changes.md`'s new sections "An integer power", "The rational power over any integer" and "The result types of vectors and matrices, and the api's array declarations"; its "Arithmetic in a size" (a size's power at a negative exponent stays refused), "Overflow", "`fill` and `tabulate`" and "Vectors and matrices at an element type that is not a number type"; `library.md:23` and `:26`; `compiler.md:125`'s "about a minute" (63 s); `batch.md:45` (4 of 4 briefed agents read it, none in the first turn).

## Part 4. Routing

Checked against main at `066725e0a`: the gather's PLAN entries (`d3a9335ef`) and the review's corrections (`63e1a6eb1`), the commit stage's `510fac459`, the coordinator's `f258c3dd9` and `f502f5563` (P-79 and P-155), and the boot notes to `066725e0a`. PLAN has not changed since the review's `63e1a6eb1`; its routing step runs after this review, by the boot note.

### The 19 items of `forCurator`

- **I.worker.1 and I.skeptic.1** (`IntegerDivisionByZero`, row 792): `PLAN.md:526`, "Default: `DivisionByZero`". Sound.
- **I.worker.2 and I.skeptic.2** (the demos' timing line, row 791): a sentence in the demos' entry (`PLAN.md:232`), "Default: as they are". **Settled by P-79** since about 11:50 UTC: "`BiCGSTAB`'s timing line (row 791)" is among the demos to respell. The entry's default and its "Until he says, no demo is edited." are stale (finding 4); the respelling has no candidate line (finding 5).
- **I.worker.3 and I.skeptic.3** (a `ZZ` power beyond the int's range): `PLAN.md:528`, "Default: as built". Sound.
- **I.worker.4 and I.skeptic.4** (no decision record): `PLAN.md:530`, "Default: none". Sound.
- **A.worker.1 and A.skeptic.1** (which batch fixes rows 793 and 794): `PLAN.md:532`, "No default on record". **Missing: a default; and the question is the coordinator's,** so its home is a candidate line (finding 1).
- **A.worker.2 and A.skeptic.2** (item 112's wording): a sentence in item 112's entry (`PLAN.md:204`), which restates it. Sound; review-queue item 112 says it is needed by this batch.
- **A.skeptic.3** (the casts rely on `replica`): `PLAN.md:534`, "No default on record". **Missing: a default.**
- **A.skeptic.4** (`Array2`'s column and row subscripts in the api): `PLAN.md:536`, "No default on record". **Missing: a default.**
- **gather.1** (five notes refused, one cut): a sentence in batch 15's gather.1 entry (`PLAN.md:434`), review-queue item 165. Its default still cannot be carried out (batch 18's finding 7), and row 533's refused note is the only home of split 4's fact (finding 3).
- **gather.2** (the dimensions chapter): `PLAN.md:538`, "No default on record". **Missing: a default.**
- **gather.3, review.2** (the early push): `PLAN.md:132`. **Answered** at about 11:50 UTC, the history kept (`RECORD.md:285`); to `PLAN-history.md` (finding 4).
- **review.1** (the third demo): `PLAN.md:130`. **Answered** at about 11:50 UTC, kept, P-79; to `PLAN-history.md` (finding 4).

### New rows

- **791** (the demos' timing line): the demos' entry (`PLAN.md:232`) and P-79. **Missing: a candidate line** for P-79's rung (finding 5).
- **792** (`IntegerDivisionByZero`): on the review list with its default. Sound.
- **793 and 794** (slices at a base above zero): `PLAN.md:532` only, with no default. **Missing: a candidate line** in the next batch's list (finding 1).
- **The three closed rows:** settled by F-263 (438, 445) and F-264 (678).
- **Rows the batch touched and left stale:** 441, 747, 523, 533 and 465 (findings 3 and 7).

### What the record listed for him, and PLAN lacks

- **The twenty forks and the points for his sight** (`CLIMB-BATCH-20.md:57-90`): no entry; forks 5, 7 and 10 named nowhere for him (finding 2).
- **Row 533 under fork 7:** review-queue item 29 only (finding 3).
- **Batch 21's lists:** the two probes (finding 6).
- **The record's "After the landing"** (`:330-332`): P-153's "Still to build", built and naming two demos, stands in POSITIONS (`POSITIONS.md:87`); P-40's "is built with the array sites' other fixes" reads as still to come (`POSITIONS.md:39`); FACTS' consolidation of F-241 and F-247 with F-263, and of F-35 and F-260 with F-264, owed (finding 12); the skill writer's task done.

### Answered, stale or overlong in the record

- **His answers of today, still open in PLAN:** "Before climb batch 20's push", the demos' entry, items 38 and 59, review-queue item 43 and the item for item 38 (finding 4).
- **Item 18 and "Where we stand"** describe batch 20 as to come (finding 4).
- **P-79's example** of three demos at `10.0^(-6)` (finding 10).
- **F-240, F-83, F-263, F-264** (finding 12).
- **Review-queue items needed "by batch 20"** (29, 31, 43, 95, 112, 113, 165, by the sort of `4968ba966`): the coordinator proposed at about 07:40 UTC to put them to him at this landing, one a message, and the boot note shows no answer. Of them, 43 is answered by P-79; 29 and 95 are forks 7 and 10; 165's prediction came true.

## What I did not do

- I built nothing and ran no Fortress program, suite or stage. I changed no file but this one, and committed nothing.
- I read the run's transcripts only through scripts: `batch-measures.py`, `spend.py`, `transcript-study/skill-load.py`, the task-list archaeology's `cost.py` adapted to batches 17 to 20, and batch 19's review's scratch scripts (`agents.py`, `brief.py`, `briefsize.py`, `calls.py`) adapted to batch 20's briefing keys, with three small ones of mine for the briefing files, a call's result and the commit stage's call times. They are in the session's scratchpad, `rev20/`. The batch-19 review counted the same way. I read no message of the coordinator's session; what he was told comes from the boot notes, PLAN and `RECORD.md`.
- The loads of the microGPT runs and the gate's stage times come from files under `tmp/` and from the transcripts' call times; I cite no file under `tmp/` as a source.
- I did not judge the new specification passages beyond the skeptics' and the review's checks, and I measured nothing about row 533 or the microGPT times; both are readings.
- The INDEX line for this review is the coordinator's.

## For the curator

In the order they need you, each with its default:

1. **The specification's integer listing says that division by zero throws `IntegerDivisionByZero`, which no library has; the rest of the text, both libraries and the new power sentence say `DivisionByZero` (row 792).** Default: `DivisionByZero`, written into the listing by the next rung that edits that chapter.
2. **The specification's chapter on units writes factors such as `10^{-2}`, and an integer to a negative power now throws (gather.2).** Default (mine, none on record): leave the chapter as the team wrote it, with a revision box that names the new rule, until a batch builds units.
3. **A numeral raised to a power now gives a numeral, so `2^(-1)` throws, as for every integer type (fork 10).** Default: as landed.
4. **In the api, the power of `MultiplicativeRing` (the trait of types with a product) is now abstract over any integer, and `RR64`'s api states its own power over any integer (fork 7); by reading, the checker still refuses the model's `10.0^(-5)` (row 533), not measured.** Default: as landed; measure row 533 when the model is first checked against the one library.
5. **A `ZZ` power whose exponent is beyond the 32-bit range now throws `IntegerOverflow` under walk, except at the bases 0, 1 and -1.** Default: as built.
6. **The api's `immutableArray` of rank 2 and 3 is now a comment, as in the component, so the library chapter loses them (fork 5).** Default: as landed.
7. **Vector and matrix operations now check that their result is a vector or a matrix; a user's vector type whose `replica`, the copy that these operations fill, is a plain array now gets a `CastError`.** Default (mine): as landed, with no new statement in the library.
8. **The api lacks `Array2`'s column and row subscripts, which walk runs.** Default (mine): add them with the second export error's work, which aligns the api with the component trait by trait.
9. **No separate decision record was written for the integer power; Appendix I cites the Fable judgement and the probe.** Default: none.
10. **The record's twenty forks, taken at their defaults, and its points for your sight** (the team lines changed in the integer powers, `QQ`'s body, walk's six power natives, three tests and three demos; the vector and matrix bodies, factories and api lines). Default: as landed.

Information:
- The count is 3 and the distance 5, as the planner measured. Every moved site is tied to a rung.
- The batch wrote 2.64M over 8 agents in 2 h 10 min, 0.36M under the record's low figure. The empty task list saved about 0.6M: its reminders took 1 % of the agents' input, against 15 % in batch 19.
- microGPT's quick walk check passed 7 of 7 in both programs, in 47 s and 41 s, 3 s and 5 s over batch 19. Rung A's new type checks are on both programs' path; one run each cannot tell. A timed pair would cost about 3 minutes and under 50K tokens.
- The coordinator's check-in commit at 08:41 UTC took the gather's staged index and pushed rung A's code before the gate; the gate then passed on that same code. Your rule on named paths is now in the coordinator skill.
- Array slices of a 2- or 3-dimensional array whose index starts above zero read the wrong elements under walk (rows 793 and 794). The fix is one line each; it goes to the next batch's candidates.
