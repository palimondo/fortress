<!-- The combined post-batch review of climb batch 16 (run wf_46ebb338-7a8, base 528438ac5, 10:02 to 18:34 UTC on 2026-10-16, stopped by a VM restart at 11:15 and resumed at 11:17, landed at f98ad813f: rungs S ee6bfcb8d, H d2fe4e1d9, K c23b85fdc, W 9879d4386, the closes 3667c3a3c, the gather record 85b1d3d85, the review's corrections 07c83a40a, the judge's ruling on the merged-diff review aa4bbb2b6 and its repair 464159846), in the form of reviews/batch-15-review.md, on the curator's standing word ("One review after every batch"), by a review worker reading only, against main at 3ddba3ae6 (one BOOT.md commit after the landing; PLAN.md, FACTS.md and the ledger as at 464159846; nothing under .claude/ changed since the base). The transcripts and the journal were read through bounded scripts; the measures are batch-measures.py's and spend.py's on batches 14 to 16 and transcript-study/skill-load.py's on 15 and 16; the per-site list was compared at 528438ac5 and f98ad813f with git show. Tokens are writes only (input plus cache creation, one count per message id). -->

# Climb batch 16: conformance, the speed, the practice, and routing

## What came up in this run

### 1. The count 39 and the distance 49, site by site

**As declared.** The record expected the distance 49, or 48 if row 488's `:130` went with H, and the count 39, or 38 likewise (`coordinator/CLIMB-BATCH-16.md:29`, `:380`). The gate read `COUNT SAME   39, declared none` and `DISTANCE SAME   49` (`compile-ladder/climb-batch-16/gate/summary.txt:118-119`), with no kind, class, unit or crash row moved (`gate/distance.txt:2-25`).

**The count.** Its table equals 15b's line for line: every api 0, `#total 39`, `#locations 38`, `#crash none` (`gate/checker-count.txt`; the gate's result, `result.gate.checkerCount`). Its whole output changed only as rung H said it would once: the apis' order and three unions' members (`compile-ladder/rung-ast-hashes/REPORT.md` section 4.1). No row of the count moved, so no row needs a rung edit to explain it.

**The distance, three lines of the per-site list** (`compile-ladder/gate/distance-sites.tsv`, 528438ac5 against f98ad813f):
- **`:1463`**, 'Function body has type OR(O0,I0)' now 'OR(I0,O0)': rung H, `d2fe4e1d9`, as its own tree read it (`rung-ast-hashes/REPORT.md` section 7). Same site, same error.
- **`:3405` to `:3422` and `:3411` to `:3424`**, row 433's `MaxSumReductionPair[\T\]` and `MinSumReductionPair[\T\]`: rung K, `c23b85fdc`, the well-formedness walk's report at the call (F-237), as the record read it (`CLIMB-BATCH-16.md:84`, call 4).
- `:3367` and `:3384` already printed `OR(IntLiteral,T)` in the distance list; since H both stages print one spelling.
- K's judge asked that any other moved site point at `491a5631a` first (`rung-checker-abstract-callsite/JUDGE.md` section 5, item 1). None moved.

**Row 488's `:130`, read four ways (items 2, 4 and 12 of `forCurator`).**
- Rung S: present in the count stage on base, change and pass; absent from its final code's distance stage (48); present in the audit copy of the same code run as the distance stage (49, 0 differences in 428M reuses); absent from two instrumented count runs, the change's audit and the base's JFR run (`rung-solver-speed/REPORT.md` sections 5, 6 and 10).
- Rung K's skeptic: absent from an instrumented count run of `491a5631a`'s code in two builds, present with the worker's file compiled the same way (`rung-checker-abstract-callsite/SKEPTIC.md` section 5.2); K's own two JFR runs also lost it (`REPORT.md` section 6).
- Rung H: absent at N = 0, present at N = 1 and 1000 (the H runs), absent from the distance stage on its tree (`rung-ast-hashes/REPORT.md` sections 4.2 and 7).
- The gate, on the merged tree: present in both stages.

These readings do not conflict. They are one mechanism, row 737, which rung H found: `ApiTypeExtractor` gives `BIG LEXICO(g)` (`Library/FortressLibrary.fss:129-130`) the return type of the first api declaration of its name, in the identity-hash order of two `DeclaredFunction`s (`ApiTypeExtractor.scala:116-122`; `DeclaredFunction.java:25`, no `hashCode`). Any run that asks the JVM for identity hashes at other moments before the index is built can flip that order: an audit copy, JFR, another stage's earlier components, a changed memo pattern. Since H the syntax tree no longer moves anything (F-232), so a lone move of `:130` is row 737's and nothing else's. Neither S's memos nor K's fix changed an answer: S's audits found 0 differences, and K's fix computes no hash of a node. Repairing row 737 by matching parameter types takes `:130` out for good. By "Type Inference for Components" `BIG LEXICO(g)` takes `TotalComparison` (`Library/FortressLibrary.fsi:98`), so the count would read 38 and the distance 48.

**The 49, by what each waits on**, as the record sorted them (`CLIMB-BATCH-16.md:23-26`): unchanged. The arrays 21, his other items 12, the `where` clauses 12, row 731's 3, row 488's 1. Since P-151 (16:42 UTC today) and the probes beside the batch (`perf-probes/integer-power/`, `where-clauses/`, `symbolic-operators/`), several of the 12 and 12 have measured library edits waiting. They are the next batch's to plan, not this review's.

### 2. The speed: 82 s and 217 s against 325 s and 1,075 s

**The figures.**
- The count stage took 82 s at this gate ('real 1m22.416s', the gate's result; its transcript `af0bc529`, calls 41 to 43, 18:07:50 to 18:09:14 UTC). It ran after the suites and the ladder, with one other JVM beside it: the `String` probe's distance run at `nice -n 19` (the gate's summary, `result.gate.summary`).
- At 15b's gate it took 325 s "beside other stages"; idle, 333 s and 352 s (`CLIMB-BATCH-16.md:22`).
- The distance stage took 217 s, `FortressLibrary` 154 s, at load 3.32 at its start, beside the library order and `testFast`'s four tracks (`gate/distance.txt:26-27`; `af0bc529`, calls 11 to 17).
- At 15b's gate it took 1,075 s, `FortressLibrary` 628 s, beside the suites; idle, 931 s (F-231). That is load lengthening it by 15 %, the coordinator's measure of 10:39 UTC (`BOOT.md`).
- The ratios: 3.96 for the count, 4.95 for the distance.

**How far load explains the difference.**
- **The count: none of it.** 15b's 325 s was at or under its idle runs. This gate's 82 s ran beside one niced JVM. Rung S's own pairs give the same factor: the worker's 437 s to 97 s (4.5 times, loads 5.60 and 3.59), and the skeptic's 392 s to 83 s (4.7 times, loads 0.85 and 3.58; `rung-solver-speed/SKEPTIC.md` section 1). The skeptic's 83 s equals the gate's 82 s. The base's own runs in this batch spread from 302 s (load 0.43, 10:04 UTC) to 437 s (load 5.60, 12:14 UTC), so the base code under the gate's conditions sits near 330 s. The factor is S's memos.
- **The distance: little of it.** Both gates ran it beside the suites, so like for like the factor is 4.95. Set against 15b's idle 931 s it is still 4.3.
- **Inside the batch, load did far more.** The merged code's stage took 217 s at the gate. Rung S's tree, nearly the same code, took 574 s (`FortressLibrary` 474 s; `rung-solver-speed/REPORT.md` section 10). It ran at load 4.6 to 5.3, beside its own `testQuick` and rung H's runs; H's X1 run started at load 10.46 at 12:34 (H's transcript). That is 2.6 times the gate's time.
- **The JVM uses more than one core.** The gate's count stage used 2 min 6.6 s of CPU in 1 min 22.4 s, so other JVMs slow it even when the load average looks modest.
- **Niced and un-niced neighbours.** The probes ran at `nice -n 19`, which yields the CPU to work at normal priority, so they cost a timed run less than the load average they add. The rungs' and skeptics' own JVMs were not niced, and they ran beside each other's timed runs (below).

**Were P-148's 6 % comparisons sound?**
- **A correction to this review's brief.** Rung S's decisions give load 2.3 to 3.8 for its prototypes, one run each. Its timed pair ran at load 5.60 (base) and 6.55 (change), with three other trees' JVMs, and its pass at 3.59 (`rung-solver-speed/REPORT.md` section 7, decision 2).
- **S: sound for its claim.** A gain of 66 to 79 % stands far above the 45 % spread of the base's own runs, and the skeptic's pair and the gate agree. What no run shows is the pass's own share, 149 s to 97 s: the worker says part of it is load. No reviewer timed the change commit `615ecff76`, as `compiler.md:157` asks ("Run the worker's commit of step 3 and its head"). The prototypes rank the ways (125 s, 106 s, 89 s, 78 s, one run each) and measure nothing finer. F-235's "437 s to 97 s in one session" is true as stated.
- **H: the conclusion sound, the measurement weak.**
  - The worker: change +3.4 % (395 s against 382 s), pass −1.6 % (376 s). Its base and change ran 82 minutes apart, with different neighbours; during the base the load rose to 6.23.
  - The skeptic: −1.1 % (371 s against 375 s).
  - What carries the conclusion is the profile: the hash code is under 1 % of the samples (`rung-ast-hashes/REPORT.md` section 4.1).
- **K: the conclusion sound, at the noise floor.**
  - The worker: +2.6 %, and +1.1 % like for like (the pass against the base run again, both beside one distance stage).
  - Runs of one code differed by 5.9 % (393 s against 371 s), and the base across agents by 6.4 % (360 s against 383 s).
  - The skeptic: +3.1 %.
  - What carries it is the profile: the walk is 0.7 % of the samples. The contested fix `491a5631a` was never timed. The gate's 82 s includes it.
- **The timed runs raced.**
  - Rung S's skeptic started its base at 15:19:20 UTC, and rung K started its change run at 15:19:19, both at load 0.85. Their next runs overlapped too: S's skeptic's head at 15:25:52 and K's pass at 15:27:26.
  - H's skeptic started its head at 15:55:35, and K's skeptic started its head at 15:56:20 beside it. K's skeptic says `ps` showed that run, and it did not wait (`rung-checker-abstract-callsite/SKEPTIC.md` section 2), against `compiler.md` step 1.
  - Each agent waited for quiet, and two of them started when the same quiet came.
- **Verdict.** No conclusion of the batch rests on a timing that the noise could flip. But under this load the 6 % rule could not have caught a slowdown of 5 to 10 %. No pair met the rule's "idle machine" premise, as S's decision 9 and its skeptic's section 10 say.
- **Proposed (mine).** Now that the count stage takes about 1.5 minutes, a check that resolves 6 % is cheap:
  - every timed count-stage run of the session takes one lock (`flock` on a shared file), so that two timed runs never overlap;
  - a pair is three alternations of base and change in one call, about 10 minutes, compared by the median with its spread.

**Do F-231's timings need rewriting? Yes.** F-231 says "the count stage with row 680's repair takes about 340 s on an idle machine instead of 911 s, and the distance stage 931 s instead of 2,375 s". That is the walker split's effect on 15b's code, written in the present tense. The tree now takes 82 s and 217 s at its gate. The fix:
- F-231 states the split's effect in the past tense and points to F-235 for today's times.
- F-235 adds the gate's 82 s and 217 s, and says that no idle run of the merged tree exists.
- F-53 drops "a rise from 1 that is no regression" (15b's). Its "An edit can move 2 to 4 errors that it does not touch (row 488; F-232)" becomes one error, `:130`, through row 737.
- The skill's `compiler.md:125` changes too (Part 3).

### 3. The cost, against the record and batches 14 and 15

`batch-measures.py` and `spend.py` on the three runs. Batch 16 wrote 6.01M over 17 agents. The harness counts 5.19M over 15 (`totalTokens`): it leaves out the two agents that the restart stopped.

| Role | B14 | B15 | B16 | B16 share |
|---|---|---|---|---|
| Rung workers | 1.99M (5) | 1.81M (4) | 2.49M (6 agents, 4 rungs) | 41.3% |
| Skeptics | 1.71M (5) | 1.49M (4) | 1.61M (4) | 26.9% |
| Judge, on a rung | 0 | 0 | 170K (K) | 2.8% |
| Gather | 460K | 469K | 569K | 9.5% |
| Merged-diff review | 399K | 408K | 390K | 6.5% |
| Its judge and repair | 0 | 0 | 229K + 269K | 8.3% |
| Gate | 131K | 130K | 135K | 2.3% |
| Commit | 128K | 133K | 152K | 2.5% |
| **Total** | **4.82M** | **4.44M** | **6.01M** | |
| Agents, rungs | 14, 5 | 12, 4 | 17, 4 | |
| Span | 4 h 43 | 5 h 03 | 8 h 31 | |
| Per rung, all roles | 0.96M | 1.11M | 1.50M | |

**Against the record**, about 4.4M (4.2M to 5.2M; a red gate about 0.5M more; `CLIMB-BATCH-16.md:51-55`). The run wrote 6.01M, 1.66M over the parts' 4.35M:
- **The VM restart, 0.51M.** Rung S's first agent wrote 396K in 72 minutes, and rung H's first agent 118K in 4 minutes. S's second agent read its predecessor's transcript and reused its earlier base run (302 s), its prototypes and the change's audit, so not all of the 396K was lost.
- **The merged-diff review's judge and repair, 0.50M.** The estimate did not include them. They cost about what a red gate would.
- **The ruling on rung K, 0.17M**, inside the record's top figure.
- **Workers, +0.27M** over 1.7M, on the agents that finished:
  - W 544K against 0.3M (+81 %): 533 lines of walk for row 373 (`git show --numstat 9879d4386`), 47 library api probes on two trees, and `testSystem` twice.
  - K 524K against 0.45M: three versions of its placement.
  - S 472K against 0.5M, and H 430K against 0.45M.
- **Skeptics, +0.11M** over 1.5M: W 431K against 0.3M, K 487K against 0.4M, S 352K, H 345K.
- **The fixed roles, +0.10M** over 1.15M. The gather wrote 569K against batch 15's 469K: 14 refused notes, 5 FACTS entries added and 6 rewritten, and W's five sentences corrected.
- **The time.** 8 h 31 against about 7 hours. K, the last worker, started at 13:08 when S ended. K's skeptic, the longest at 84 minutes, set the critical path. One slot stood idle from 16:16 to 17:08 while K's skeptic ran alone.

**Against batch 15** (4.44M, four rungs): 1.57M more. The restart, the review's judge and repair and K's ruling account for 1.18M of it. The rest is workers +0.16M, skeptics +0.12M and the fixed roles +0.11M. Without the restart and the three rulings and repairs, the batch wrote 4.84M, or 1.21M a rung.

**Other measures.**
- **First calls**: 761K (12.6 %), 9 cold, against 547K (12.3 %), 6 cold. Cold: rung S's first agent, skeptic W, the four tail roles, and the three agents of the rulings (K's judge, the review's judge and its repair).
- **Cache refills**: 0. **Refusal cycles**: one rung, K's judge, 170K (2.8 %).
- **The skill's load** (`skill-load.py`): 579K, 9.6 % (133K of load text and 446K over 189 part reads), against 434K, 9.8 %.
- **Distance sites gone**: none, by design (`CLIMB-BATCH-16.md:27`).
- **Rows**: 7 closed (727, 572, 734, 720, 373, 673, 718), 736 added fixed, 6 opened (737 to 742).

Per agent, in order of start (UTC; ids are the transcripts' `agent-<id>.jsonl`):

| Agent | Id | Writes | First call | Turns | Minutes | UTC |
|---|---|---|---|---|---|---|
| Rung S, stopped | af23b3d3 | 396K | 60K | 128 | 72.1 | 10:02-11:14 |
| Rung W | ad396a1d | 544K | 23K | 198 | 68.4 | 10:02-11:11 |
| Rung H, stopped | ac93e1bd | 118K | 22K | 28 | 3.6 | 11:11-11:14 |
| Rung S | a1786245 | 472K | 23K | 156 | 111.5 | 11:17-13:08 |
| Rung H | aeaf1365 | 430K | 22K | 249 | 161.6 | 11:17-13:58 |
| Rung K | a2e6db75 | 524K | 23K | 252 | 155.3 | 13:08-15:43 |
| Skeptic W | a81d3949 | 431K | 65K | 128 | 46.7 | 13:58-14:45 |
| Skeptic S | a1eeab23 | 352K | 29K | 136 | 50.6 | 14:45-15:36 |
| Skeptic H | a4f9c392 | 345K | 28K | 163 | 40.0 | 15:36-16:16 |
| Skeptic K | a7c5c70c | 487K | 29K | 189 | 84.3 | 15:43-17:08 |
| Judge K | ab69ee78 | 170K | 57K | 29 | 7.2 | 17:08-17:15 |
| Gather | a4d616ab | 569K | 74K | 181 | 30.6 | 17:15-17:46 |
| Review | abdf982e | 390K | 70K | 113 | 16.9 | 17:46-18:02 |
| Gate | af0bc529 | 135K | 54K | 47 | 23.8 | 17:46-18:09 |
| Judge, review | a903dc01 | 229K | 61K | 47 | 13.6 | 18:02-18:16 |
| Repair, review | ab3c44ee | 269K | 58K | 79 | 11.1 | 18:16-18:27 |
| Commit | a1720096 | 152K | 62K | 47 | 6.3 | 18:27-18:34 |

**Beside the run, what preparing it cost** (`BOOT.md`): the planner 0.48M, the Fable review 0.42M of Fable, the Q1 probe 0.56M; 1.46M. The coordinator's probes during the batch (the integer power, the `where` clauses, `String`'s pairs, the generic `distribute`) and the asks and profile workers are not the batch's cost, but they shared its machine.

### 4. The tail

- **The gather** (569K, 31 minutes) applied S, H, K and W in that order, with no conflict. It placed W's specification corrections after K's hunk, as the record asked (`compile-ladder/climb-batch-16/RECORD.md:19-32`). The merged tree's tests: 'OK (50 tests)' compiled, 'OK (32 tests)' under walk, and the four rungs' unit classes green (`:34-56`). It opened rows 736 to 741 and closed 7 (`:58-79`). All 14 of the records' notes were refused (gather.1, `:150-168`). It folded F-235 to F-239 and rewrote F-80, F-223, F-228, F-231 and F-232.
- **The merged-diff review** (390K, 17 minutes) found two blocking findings, both in the gather's rewording of W's sentences. Its own corrections, F-232's and F-238's wording, are in `07c83a40a`.
- **Its judge and repair** (229K and 269K, 25 minutes): Part 2.
- **The gate** (135K, 24 minutes, against batch 15's 38) was green, once:
  - `testFast`: 2,012 tests in 54 suites. The compiler track went from 1,212 to 1,224 (K 10, H 1, W's skeptic 1), with five new misc classes.
  - `testSystem`: 621 to 629. `testSpecData`: 130.
  - All 42 `atomic` runs passed, and no ladder or microGPT phase moved.
  - Its `# machine` line still reads `FORTRESS_THREADS=1` (`summary.txt:75`), batch 11's finding 8.
- **The commit** (152K, 6 minutes): microGPT's quick walk check passed 7 of 7 each, in 65 s and 58 s (`summary.txt:120-123`). It built the specification's PDF (678 pages), checked all 62 commits' footers and `.claude/` unchanged, and pushed.

## Part 1. Conformance

### Method

As in `reviews/batch-15-review.md`: each rung's commit, its `REPORT.md`, `SKEPTIC.md` and, for K, `JUDGE.md`; its section of the record, with `coordinator/climb-batch-16-review.md` and the decisions it builds; the gather's `RECORD.md`, the journal and the code on main. Three standards, kept apart:
- the specification;
- the team's built intent and the library's own way;
- the decisions on record: P-148, P-149, Q1's answer, and the coordinator's calls 1 to 6 (`CLIMB-BATCH-16.md:81-86`).

### The verdicts

- **Rung S, the solver's memos and the long-method guard: in the spirit.** P-148 is built as written: correct, then faster, and audited.
- **Rung H, the syntax tree's hashes: in the spirit.** It stopped at the next source outside the syntax tree, as its section said, and recorded it as row 737.
- **Rung K, abstract functional methods and the error's place: in the spirit.** P-149 is built. Call 4 is built and extended twice, once by its skeptic and once by its own reach.
- **Rung W, walk's generic pairs, `if` and a user big operator: in the spirit.** It departs three times from its section's letter, none of them before him.
- **One ruling**, on K's contested fix, upheld. No rung was refused, and none stopped.

### Rung S, `ee6bfcb8d`

**What landed.** Three memos:
- each analyzer's reductions, keyed by the formula (`scala_src/types/TypeAnalyzer.scala:589-609`; `scala_src/typechecker/Formula.scala:358-363`);
- exclusions, keyed by the question with its inference variables renamed apart, from an empty history, and shared through the trait table where the answer read no context (`TypeAnalyzer.scala:408-439`, `:985-1015`; `TraitTable.scala:150-156`);
- the table's two lookups by name (`TraitTable.scala:34-68`).

Each memo has a switch, default on. `MethodSizeJUTest` guards the build's methods against HotSpot's 8,000-byte limit, with twelve listed (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/MethodSizeJUTest.java:35-58`). Three memo test classes.

**Standard 1.** The specification names no time. No sentence is made false (`REPORT.md` section 9).

**Standard 2.** The tree's own memo devices are followed: the normalize memos' context marks, the ground memo's sharing rule (row 688) and the clause memos' `putIfAbsent` (`SKEPTIC.md` section 4). Renaming apart is new: the checker's one renaming device gives fresh names, the opposite. Its soundness rests on the Boolean answer comparing variables only by equality, and on the audits.

**Standard 3.**
- **P-148**, step by step:
  - a profile first;
  - the change, then a pass;
  - tables and whole outputs equal, 178 lines, not even an order moved;
  - audits on one full run: 0 differences in 7.15M reductions, 153,930 exclusions and 156M lookups on the count stage, and in 428M reuses on the distance stage;
  - the skeptic's own pair.
- **Call 1** left the way to the profile, "one of the probe's two, both, or one you find" (`CLIMB-BATCH-16.md:108`). The probe's first way, a shared memo of normalized meets, measured 0.21 s. The rung found reductions asked again, 34.4M of 35.1M, and took those. That fits the call's words, and it means the probe's lead was wrong.
- **Call 2** is built with twelve entries, not the probe's six or seven. Five of them run on no checked path (S.worker.1).
- **Not done:** no profile of the final code. F-231 says so, as corrected by the skeptic (`ffc295e6b`). The record kept `Formula.isNatTerm` out of the rung (row 681), and the rung left it alone (`git show ee6bfcb8d`).

**Verdict: in the spirit.**

### Rung H, `d2fe4e1d9`

**What landed.**
- Two `replaceregexp` rewrites in the makeAST target (`build.xml:679-697`): a node's hash starts from its class's name, and an `Option` field is hashed by `NodeHash.of` (`nodes_util/NodeHash.java`).
- The 936 generated nodes, checked in as the build writes them.
- The three in-repo generators.
- 21 hand-written classes: the 18 of `precedence_opexpr`, `Cons`, `Empty` and `_WrappedFValue`.
- `NodeHashJUTest`, extended by its skeptic. Row 737, with `XXXOmittedReturnTypeFromApi`.

**Standard 1.** The specification speaks of no hash of the implementation.

**Standard 2.** The precedents:
- the build's own post-processing, the timestamp's normalization (`3c4dcdabc`);
- the team's "more deterministic replay than Object.hashCode()" (`nodes_util/UIDObject.java:28-29`);
- the PLT `Wrapper`'s own formula for `NodeHash.of`.

The javadoc above 936 `generateHashCode`s still says "the hashcode of the class object". The skeptic calls it false now, and not worth 936 changed lines (`SKEPTIC.md` section 6).

**Standard 3.**
- **Call 3** is built, and its cost is as the call named it: the apis' order and three unions, once.
- The section said "if it lies outside the AST, report it and stop there" (`CLIMB-BATCH-16.md:149`). The rung did: row 737 is recorded, not repaired.
- The inference variables were measured to reach no output, and left (`REPORT.md` section 4.4). The build writes the nodes byte for byte, twice on its tree and once on the merged tree.
- **One point is answered in part:** walk's printed orders were not compared test by test (the worker's `notDone`; `SKEPTIC.md` section 6).

**Verdict: in the spirit.**

### Rung K, `c23b85fdc`

**What landed.**
- `toFunctionalMethodArrows` reads every functional method a type provides, and keeps the `implemented` filter (`scala_src/typechecker/OverloadingChecker.scala:131-153`). The revival's `declaredInUnit` is removed.
- The well-formedness walk's report of an ill-formed type met outside its expression at that expression, once for each call (`TypeWellFormedChecker.scala:37-114`, `:284-287`).
- Appendix I's Effect of "Overloading with static parameters" (`Specification/appendices/changes.tex:2625-2632`).
- Ten compile tests.

**Standard 1.** The No Duplicates Rule (`advanced/overloading.tex:548-549`), the Meet Rule over what a type provides (`basic/traits.tex:580-581`) and an object's duty to define what it inherits abstract (`traits.tex:628-633`): built. Where an error is reported, the text is silent.

**Standard 2.** The team's dotted check reads abstract dotted methods with no body filter (`OverloadingChecker.scala:170-172`): the precedent. The placement is new machinery. javac and scalac report at the use (call 4).

**Standard 3.**
- **P-149** is built: rows 727, 572 and 734 are closed. Both libraries compile, and no site comes.
- **The refusals reach beyond the named rows** (`SKEPTIC.md` section 6). Each one is the Meet or Return Type Rule, applied as it was to the dotted twin:
  - row 734's swapped face;
  - a trait that inherits both;
  - a trait that redeclares at an unrelated return type, which failed verification on the base;
  - an abstract pair at two `self` positions over `ZZ32`, which walk runs (row 698's mechanism).
- **Call 4**, "reported at the call", is built and extended twice:
  - once for each call: the skeptic's contested fix, upheld by the judge (`JUDGE.md` section 3);
  - for every well-formedness error on a type met outside its expression, not only a broken bound: an unbound type, an arity, a size, and errors the base printed at 'Type checker generated.:0:0' (`REPORT.md` section 9). `GenTest5`, outside the suites, went from 32 errors to 36.

  The second reach is not before him.
- **Call 5** is built: operators stay unread, and row 726 is still the code generator's.
- **Found, and not P-149's case:** row 739, the top-level set, which reads only declarations with a body.

**Verdict: in the spirit.** The placement's reach goes on his list.

### Rung W, `9879d4386`

**What landed.**
- Row 373: two generic declarations, each read over its own instances (`interpreter/evaluator/values/OverloadedFunction.java:424-535`, `:760-1187`), with the skeptic's size unification (`interpreter/evaluator/types/SymbolicNat.java:29-46`).
- `forIf`: a `Boolean` by its value, a `Just` true and a `Nothing` false, every other value refused (`Evaluator.java:582-621`).
- `resultArgOf` through the declared result's `BigOperator` supertype (`EvaluatorBase.java:281-336`).
- Four promotions and the new tests.
- The gather's five corrected sentences, two of them repaired after the review.

**Standard 1.**
- Row 373 is built by `advanced/overloading.tex:546-559` and `:582-592`, within row 159's limit. Its departures are filed: row 740 (walk now refuses a pair that the base ran, as the checker does), row 741 (the checker refuses two pairs that walk loads) and row 742 (walk loads two generic declarations with equal domains; found by the repair).
- `if.tex:54` says a clause must be a `Boolean`. Walk keeps a `Maybe` by call 6, a departure with no row and no box (gather.2).
- Row 718 is built by `defining-generators.tex:200-225`.

**Standard 2.**
- Its precedents: `validOnDeclaredDomains` (`8f7e183d4`), `createSymbolicInstantiation`, `forWhile`'s refusal, `Glue.extendsGenericTrait`, and `IntNat`'s `unifyStaticArg` for the size unification.
- New: `EvaluatorBase.java:14` is the first import of `compiler/typechecker/` under `interpreter/` (`SKEPTIC.md` section 1, item 4). Walk now runs a class of the compiled checker, `StaticTypeReplacer`.
- Row 373's repair is a second implementation of the checker's rules for generic overloads, inside walk.

**Standard 3.** It builds P-26, P-45, call 6, P-48 and F-228's open item. It departs from its section's letter three times, and none of the three is before him:
1. The section put the object shortcut out of reach as row 697's: "not the object-type shortcut at :432-433 and :486" (`CLIMB-BATCH-16.md:222`). The rung changed those lines, narrowly: two own generics' instances of one generic object whose arguments may coincide no longer count as object types (`OverloadedFunction.java:440-445`; decision 2). `XXXReturnRuleObjectParamWalk`, row 697's expected failure, keeps its verdict.
2. A fourth walk file, the skeptic's `SymbolicNat.java`. A point to report, not a contest.
3. `maybeType` tests names. Any trait named `Maybe`, beside an object named `Just` or `Nothing`, counts (`Evaluator.java:617-621`; `SKEPTIC.md` section 7), where F-239 says "the library's `Maybe`".

**Verdict: in the spirit.**

### The coordinator's calls, against what landed

| Call or answer | Rung | Landed |
|---|---|---|
| Q1, refuse (P-149) | K | Built: 727, 572 and 734 closed; more refusals of the same rules (above) |
| 1, Q2 as rung S | S | Built: reductions asked again, not the probe's shared meets (0.21 s); count stage 82 s at the gate |
| 2, the long-method guard | S | Built, 12 entries, 5 of them on no checked path (S.worker.1) |
| 3, hashes from the class name | H | Built; `:130` still moves, through row 737 |
| 4, a broken bound at the call | K | Built, once for each call (judge), and for every ill-formed type met outside its expression |
| 5, operators unread | K | Built: row 726 unchanged; item 38's line still names row 727 (PLAN.md:140) |
| 6, walk's `if` keeps `Maybe` | W | Built, by name; no ledger row for the departure (gather.2) |

### The global questions

- **Promised against landed.** Closed: K 727, 572, 734, 720; W 373, 673, 718. Row 736 was added fixed (S). Row 488 stays open, with row 737 as its cause. Count 39 and distance 49, as declared.
- **The record's premises that failed:**
  - the probe's first way, worth 0.21 s;
  - "about 20 count stages" (`CLIMB-BATCH-16.md:55`): 38 launch commands, some running two or three runs;
  - `:130` "then stays put": it still moves, through row 737;
  - W at 0.3M: it wrote 0.54M;
  - about 7 hours: it took 8 h 31.
- **Built twice: no.** The merged-diff review's check 1.
- **The library's way:** yes for each, with the precedents above.
- **Together:**
  - S's memos and K's placement: K tells nodes apart by identity, and S's memos hand back no shared call-type node. `XXXStaticArgBoundAtEachCall` still gives 2 errors on the merged tree.
  - H's fixed orders moved none of K's and W's pinned messages.
  - S's guard holds on each rung's build (`rung-solver-speed/SKEPTIC.md` section 7).

### Findings

Ranked by what they cost or risk next, each with its home.

1. **Timed runs raced, and none met the idle premise** (section 2). Three pairs overlapped another agent's timed run, and one skeptic took its run beside another's on purpose. Home: `compiler.md` step 1 and the manual. Proposed (mine): one lock for timed runs, and alternated triples.
2. **The gather's rewording of a rung's specification sentences failed twice.** It took a judge and a repair, 0.50M and 25 minutes. W's skeptic had already named the first failing wording (`354c002fa`), and the gather kept it. Batches 8 and 9 met the same weakness (the manual, "Gather", corrections still owed). Home: the manual. Proposed (mine): the gather takes the rung's or skeptic's corrected text word for word. A change of wording needs a run behind it. Otherwise the rung edits its own sentence, and the gather only merges adjacent hunks.
3. **Row 737 is one small checker repair** that takes `:130` out for good (count 38, distance 48) and ends the last measured identity-hash move in the stages. Home: a PLAN line for batch 17's checker rung, with 681 and 739 (Part 4).
4. **Choices not yet before him:** K's placement reach; W's three departures from its section's letter; walk's import of a checker class; walk refusing a program the base ran (row 740); the team lines changed. Home: one entry, "Points of climb batch 16, for his sight", default as landed. This is batch 15's finding 1 again.
5. **FACTS to rewrite**: F-231, F-235 and F-53 (section 2); F-239's "the library's `Maybe`", which is a test by name. Home: the coordinator's consolidation.
6. **P-30's minute.** The quick walk check took 65 s and 58 s, against 59 s and 49 s at batch 15 and 50 s and 42 s at 15b, which the coordinator ran after its gate (`climb-batch-15b/RECORD.md:89`). One of the two programs is now past the minute that P-30 sets. These are not pairs, and the load at the commit stage is not recorded. W's heavier check at load is one candidate. Home: one idle pair of `mg-run.sh`'s quick programs, the base build against main.
7. **Notes that cannot be written** (Part 4): review-queue item 165 in its fifth batch.
8. **Skill sentences** (Part 3), with batch 15's `library.md:16` still false.
9. **The VM restart** cost 0.51M of two agents. The resume worked as designed: W's result was kept, and S and H restarted.

## Part 2. Did the practice hold

### The skeptics' 11 fixes

From the journal's `fixes`, each `SKEPTIC.md`, and the review's `fixesChecked`.

| Rung | Fixes | Defects | Contested | Test first |
|---|---|---|---|---|
| S | `924d62cf7` (the report), `498f79454` (tests' comment lines), `ffc295e6b` (the record) | 0 | none | no assertion changed; guard red with an entry dropped (`SKEPTIC.md` section 5) |
| H | `1038ac9a6` (the test covered only ASTGen's template nodes), `ddabcbf40` (the record) | 0, one test gap | none | red on the base's class path, green after (`fixesChecked`) |
| K | `03003f2a7`, `f7d2cd80b`, `491a5631a`, `f586e4798` | 2 | `491a5631a`, upheld | `f7d2cd80b` red on the worker's head, 'Tests run: 2, Failures: 2', then green; `491a5631a` red on `a79a51661` and `f7d2cd80b`, then 'OK (47 tests)' |
| W | `aa4b46d6e`, `354c002fa` | 1 | none | red 14:21:50 UTC on the head's build, 'OK (25 tests)' 14:25:00 |

- Every fix is sound and stays inside its rung, but W's skeptic's fourth walk file.
- The batch made 11 fixes with 3 defects. Batch 15 made 17 fixes with 1 defect, and batch 14 made 19 with 2.

### Workers, test first

Each worker's first test failed through the harness on the base's code before its first edit of source, as its skeptic read the transcript:
- **S**: `ReductionMemoJUTest` red from 10:50:51 to 10:51:31 UTC; the change written at 10:53:12, by the first agent. The pass's two tests were red on the change's code at 11:41:50 to 11:42:55, and red on the base's classes in the skeptic's own run (`SKEPTIC.md` section 2).
- **H**: red 11:22:46 to 11:24:15; first edit 11:26:05. The test did not cover the generators' nodes or the hand-written classes until the skeptic's extension.
- **K**: red at 13:14:30, 'Tests run: 5, Failures: 4'; first edit 13:17:48.
- **W**: red 10:17:40 to 10:17:52, 'Tests run: 8, Failures: 7'; first edit 10:22:01.

No miss of order, as in batches 11 to 15. One test did not cover its edit (H).

### The one ruling, rung K

K's worker argued for one error per message and place (decision 5), so its skeptic marked its own fix contested. The judge upheld the fix by call 4's words, "reported at the call" (`JUDGE.md` section 3). It cost 170K and 7 minutes on the critical path. The fix landed unmeasured, as the judge noted (K.judge.2). The gate measured it: no site moved beyond the declared ones, so that item is answered.

### The merged-diff review: two blocking findings and the repair

- **The findings.** Both were in the gather's corrections of W's sentences in the Effect of "Overloading with static parameters":
  - "both declarations were read at one instantiation" misdescribes pairs with different lists of static parameters (`changes.tex:2614-2617`);
  - "such a pair" named two generic declarations where row 549's pair is a generic declaration beside a plain one (`:2633-2636`).
- **The judge** upheld both, the second in its conclusion only. The review's reason was wrong: walk loads the two-generic form too, by its parameter check (`JUDGE-review.md`). It ruled a repair that started with a probe.
- **The repair.** Two scratch programs loaded and printed `generic`. So the six-line text went in, with row 742 and `XXXGenericBesideGenericSameDomain`, and F-223 was corrected (`REPAIR-review.md`).
- **The gate was not run again.** The repair changed the specification and one test file, which is right by the manual. The `# repair-ungated` and `# repair-tests` lines record it (`summary.txt:124-127`). The next gate's `testSystem` should read 630.
- **The cost**: 0.50M and 25 minutes. The batch's one real finding there is row 742.

### The briefing in each agent's first turn

- **In the first turn: 0 of 12**, against batch 15's 0 of 8. Every first turn is one call, the skill's load, which the brief puts first.
- **Run at all: 12 of 12** that have a briefing or a checks slice:
  - workers: S at call 10 (first agent), W at 18, H at 9 and 16, K at 16;
  - skeptics: W 9, S 9, H 19, K 12;
  - K's judge 3, and the review's repair 7.
- **The outlier**: S's resumed agent ran it at call 50, 13 minutes in, after reading its predecessor's transcript to recover the work.
- **For P-109's figure**, the share that read it at the start of their work is 100 %, as in batches 14 and 15.

### Builds and runs, repeated or not

- **Builds** (`batch-measures.py`). Workers:
  - S: one in each of its two agents;
  - H: two, as its brief asked, to show the nodes come out byte for byte;
  - K: five, for three versions of its placement;
  - W: three.

  Skeptics: S 1, H a library order, K 3, W 2, each after a fix or for its own programs. The gather built once, and the gate once.
- **K ran `testQuick` three times**, once per code state (15, 12 and 11 minutes). It also ran a distance stage on its superseded second version. The auto-mode check refused to let it kill that run.
- **Count stages.** 38 launch commands, some running two or three runs. S's two agents made 17 of them (prototypes, audits, JFR), and H 9 (the H, E and audit runs). The restart made S time the base again (decision 8).

### Refusals by the harness and the tools

- **All four workers' writes of `REPORT.md` were refused**, as the script expects. The skeptics wrote each report from the journal.
- **Eight `sleep` calls were blocked**: S's worker twice, S's skeptic, K's worker, H's worker, H's skeptic twice, and the gather.
- **Nine `Edit` or `Write` calls were refused for a file not read**: W 2, K 2, H 1; skeptics W 2, H 1, K 1.
- **Three `rm` calls were refused by the built-in safety check**: S's first agent, and the skeptics of H and K.
- **One `kill` was refused by the auto-mode classifier**: K's worker, on its own superseded distance run.
- **Four agents read `sources.md`**, which the skill says not to load for a task: rung S, the gather, and rung H and its skeptic, by another path. Batch 15 had two. No refusal cost a cache refill.

### The practice's measures, batches 14 to 16

| Measure | B14 | B15 | B16 |
|---|---|---|---|
| Written | 4.82M | 4.44M | 6.01M |
| Rungs, agents | 5, 14 | 4, 12 | 4, 17 |
| Per rung, all roles | 0.96M | 1.11M | 1.50M |
| First calls | 0.60M, 6 cold | 0.55M, 6 cold | 0.76M, 9 cold |
| Refusal cycles | 0 | 0 | 2.8% |
| Skeptic fixes (defects) | 19 (2) | 17 (1) | 11 (3) |
| Rulings, repairs | 0, 0 | 0, 0 | 2, 1 |
| Distance, sites gone net | 31 | 5 | 0 (by design) |
| Distance stage at the gate | 1,714 s | 2,087 s | 217 s |
| Skill's load | 10.3% | 9.8% | 9.6% |

### Batch 15's measures, a batch later

1. **Choices not before him** (its finding 1): met for batch 15, at `PLAN.md:398-424`. For batch 16, see finding 4 above.
2. **Its thirteen rows without a PLAN line**: met, in phase 3 item 14's lines (`PLAN.md:59-64`).
3. **Item 54**: built in 15b.
4. **The count stage's margin**: the stage now takes 82 s, against 569 s to the crash at batch 15's gate.
5. **Row 726 against `FlatString`'s api**: it has a line (`PLAN.md:411`).
6. **Built items left open in PLAN**: cleared by the consolidation of 2026-10-15.
7. **`library.md:16`, false since 2012**: still in the skill (Part 3).
8. **A second pair of stages after a message edit**: the manual's rule 5 still does not cover it (`climb-batch-workflow.md:265`). No rung met the case here.
9. **Batch 11's finding 8**: still open.

### Misses, by kind

Numbered on from `batch-15-review.md`'s 499.

Found inside the batch:
- **The change wrong:**
  - 500, K's placement reported nothing for a second call of one callee (`491a5631a`, skeptic K);
  - 501, it reported a call held by a variable at a later use (`f7d2cd80b`, skeptic K);
  - 502, W's repair refused a valid nested pair over sizes (`aa4b46d6e`, skeptic W).

  K's own two earlier versions are the worker's finds, each with a guard test.
- **A test that does not cover its edit:** 503, H's `NodeHashJUTest` (skeptic H).
- **Text claiming more than the code does:**
  - 504, the gather's two sentences of Appendix I (the review; judge; repair);
  - 505, F-232's order sentence and F-238's title (the review);
  - 506, H's FACTS entry (skeptic H);
  - 507, S's record: the distance time against the wrong base, a profile claimed for the final code, "the same errors at the same places" (skeptic S);
  - 508, K's report on the error's place, and F-223 (skeptic K);
  - 509, W's proposed text "read at one instantiation of both" (skeptic W).
- **A new rule's effect elsewhere:**
  - 510, K's refusals beyond its rows, and every ill-formed type moved (worker and skeptic K);
  - 511, W's refusal of a program the base ran, row 740 (skeptic W).
- **The team's code, found by the rungs:** 512, rows 737 (H), 738 (K), 739 (skeptic K), 740 and 741 (skeptic W), 742 (the repair).
- **Form:** 513, S's tests' comment lines (skeptic S).
- **Process:**
  - 514, four report writes refused (by design);
  - 515, fourteen ledger notes refused (the gather);
  - 516, the restart's two agents.

Found by this review: 517 to 525, findings 1 to 9 above.

**Against the earlier notes.** 17 found inside the batch (500 to 516), 4.3 a rung, against batch 15's 3.5. The skeptics found all three defects and four of the six text corrections. No test-first miss. Landed: no wrong value is known. The known costs are rows, the review's repair and the false sentences.

## Part 3. Skill sentences the batch made false

For the skill writer, with the record's revival-change material (`compile-ladder/climb-batch-16/RECORD.md`, "Revival changes, for the skill writer"):

1. **`.claude/skills/fortress-repo/references/compiler.md:125`** (rung S): "The count stage takes `<out-file> <scratch>` and about 6 minutes on an idle machine." It now takes about 1.5 minutes: 82 s at the gate, and 83 s to 97 s in rung S's pairs.
2. **`compiler.md:132`** (rung H): "Each node's hash starts from its class's identity hash. If any code asks for an identity hash at another moment, hash maps and sets of nodes iterate in another order." A node's hash now starts from its class's name, and its `Option` fields go through `NodeHash.of` (F-232). The sentence before them, "The order can move because the checker's output depends on the JVM's identity-hash sequence", stays true only through row 737. The orders that `:130` names (the apis', a union's members) no longer move by identity hash. The allowance itself is not false (H.worker.2).
3. **`references/revival-changes.md:146`** with its third bullet, **`:149`** (rung W): "Walk still differs from the specification in three cases: ... a user big operator declared to return a trait of its own, such as `opr BIG CATOP[\T\](): CatOperator[\T\]`, takes its bound (ledger row 718)." Two cases remain.
4. **`references/interpreter.md:38`** (rung W): "two declarations of one name that its parameter-by-parameter check cannot order. It accepts them if their declared domains order a generic declaration and a plain one, or if `comprises` clauses cover the overlap." This is incomplete now:
   - walk reads two generic declarations whose exclusion came only from its shared symbolic instance on their declared domains, each over its own instances;
   - it accepts them where one domain holds the other with its return type below, or where a third declaration below both holds the overlap, and refuses them where each holds the other;
   - rows 740 and 742 are its departures.

Not false, but now incomplete:
- **`compiler.md:134`** names `WalkerJUTest` as the guard of a long method. `MethodSizeJUTest` now guards every method of the build, and `:153`'s "a scan of the build for methods over 8,000 bytes" is that test (S's skeptic reads `:134` as true as written; `SKEPTIC.md` section 8).
- **Walk's `if`**: no sentence of the skill says it keeps a `Maybe` clause. The record's revival change for W is the material.

Checked and not false:
- `coordinator/references/batch.md:61` (the gate's comparisons hide identity hashes) and `fortress-repo/references/gate.md:104`;
- for K, a grep of the skill for rows 727, 572 and 720, abstract functional methods and an error's place finds no sentence.

Still false from batch 15: **`references/library.md:16`**, "A big operator inside another becomes one call of `__bigOperator2`."

Outside the skills: `explorations/coordinator/tools/distance/compare.sh:16-17` ("2 to 4" errors as variation); F-53, F-231, F-235 and F-239 (section 2 and finding 5).

## Part 4. Routing

Checked against main at `3ddba3ae6`, where PLAN, FACTS and the ledger are as at `464159846`, and against POSITIONS and INDEX. The coordinator's routing has not started (`BOOT.md`).

### The 20 items of `forCurator`

All but K.judge.4 are in PLAN: 18 ids at `PLAN.md:438-448`, under "Climb batch 16, listed for his review", and gather.1 in batch 15's entry at `:414`. Where each belongs:

- **S.worker.1 and S.skeptic.1** (the guard keeps five methods that no checked path runs): stays on the review list, default the list keeps them. The record already maps both as dormant (`coordinator/map/dormant-code.md:232`, `map/test-coverage.md:72`).
- **S.worker.2 and S.skeptic.2, with H.worker.1 and H.skeptic.1** (`:130`): answered in part by the gate, which read 49 with `:130`. The entry's default, "49, or 48 with `:130` gone" (`PLAN.md:439`), is now 49. What remains:
  - a PLAN line, row 737 first in batch 17's checker rung (mine; the specification settles the repair, so the coordinator schedules it);
  - for his sight, how a gate reads a lone move of `:130`: as row 737's, tied by the review. Default: so.
- **H.worker.2 and H.skeptic.2** (the order-only allowance): settled by the coordinator's own ruling on the cold read of P-148's skill text (`b875d2de7`, `11fb10c64`; `BOOT.md`). It is not his decision and nothing changes. Off the review list. The skill writer notes at `compiler.md:130-132` that since H only an edit itself, or row 737, moves an order.
- **K.skeptic.1 and K.judge.1** (once for each call): stays on the review list, merged with call 4. Default: as landed.
- **K.skeptic.2** (row 739, the top-level set): the three principles agree. The Meet Rule for functions judges a functional method beside a function ("Meet Rule", `advanced/overloading.tex`), the type group's rules (P-26) do the same, and walk refuses the shape at load, so neither library holds it. P-149's reasons reach it. Proposed (mine): a PLAN line for batch 17's checker rung, with the review list entry's default changed to that.
- **K.judge.2** (the fix lands unmeasured): answered by the gate. Move it to `PLAN-history.md`.
- **K.judge.3** (the nested call, found by reading): a PLAN line. The next rung that edits `TypeWellFormedChecker.scala` reproduces `next[\T\](next[\T\](x))` first, and opens a row if it fails. It asks him nothing: off the review list.
- **K.judge.4**: settled by the gather's correction of K's handover line (`RECORD.md`, "Handover lines", K).
- **W.worker.1 and W.skeptic.1** (row 159's limit): stays on the review list. Default: the limit kept. It is his because row 159 came from microGPT's own `opr ×` pair (the row's reproducer and "found by run-c2"), so lifting the limit touches the model program's readability.
- **W.skeptic.2** (rows 740 and 741): stays on the review list. Default: both rows open with their expected failures. Add that walk now refuses a program the base ran.
- **gather.1** (14 notes refused): review-queue item 165, default the coordinator's hand edit. Note by note, below.
- **gather.2** (walk's `Maybe` clause): stays on the review list, merged with call 6. Default: as built. Since call 6 settles the side, the manual's rule 4 also asks for a ledger row now: walk departs from `if.tex:54`, with `tests/maybeTest.fss` as its reproducer. The chapter's revision box waits for the next rung that edits `if.tex`, as a PLAN line.
- **judge-review.1** (two source comments): a PLAN line in the next walk rung's list. It asks him nothing: off the review list.

### The gather's 14 notes not written, and rows 697 and 444

Each text is in `RECORD.md:152-166`. None needs a hand edit except row 488's move:
- **688 and 730** (S, closed): settled by F-235 and F-236.
- **488**, three notes (S, H, K): settled by row 737's own note ("Row 488's `:130` is this case") and F-232. Proposed ledger move: `ledger.py duplicate 488 --of 737`. Row 488's node-hash half is fixed by `d2fe4e1d9`, and the rest is row 737; this closes a row whose notes are full.
- **577**, two notes (S, H): no library line moved. Drop.
- **430** (H): settled by F-232, which names `_WrappedFValue` and row 430.
- **730** (H, closed): settled by H's report, section 4.5.
- **433** (K): its reproducer is the per-site list, which carries `:3422` and `:3424`, and F-237. Drop.
- **707** (K, closed): settled by row 727's close and `XXXNoDuplicatesRuleAbstractSelfPositions`.
- **726 and 584** (K): nothing changed. Item 38's line is updated instead (below).
- **159** (W): settled by F-238 ("keeps its refusal (row 159)") and W.worker.1's entry.

**Rows 697 and 444**: W's record has no note for either; their notes cells hold 681 and 683 of 700 characters (`RECORD.md:168`). The Fable review asked for these notes (`coordinator/climb-batch-16-review.md`, section 3). Texts for the coordinator's hand edit:
- **697**: "Climb batch 16 rung W (`9879d4386`) narrowed the shortcut only for two own generics' instances of one generic object whose arguments may coincide (`OverloadedFunction.java:440-445`); `XXXReturnRuleObjectParamWalk` keeps its verdict; the repair still waits on row 433's `distribute` pair (`coordinator/CLIMB-BATCH-16.md` section 4)."
- **444**: "Site, by reading (climb batch 16 rung W, its `REPORT.md` section 11): `Constructor` builds one `OverloadedMethod` of an object's inherited and declared methods of one name (`values/Constructor.java:383-388`), which adds each as a plain `Overload` (`OverloadedFunction.java:1761-1773`), so the pair check compares parameter lists without the receiver."

Until the hand edit, the next walk rung's PLAN line cites W's `REPORT.md` section 11 for both.

### New rows

- **736**, `FIXED`: settled by F-235.
- **737**: no line of its own. Proposed: batch 17's checker rung, first.
- **738**, the per-provider message calls an object 'trait' (`OverloadingChecker.scala:338`, pinned by `XXXDottedMethodMeetAbstractSibling`): no PLAN line. Proposed: batch 17's checker rung.
- **739**: the review list (K.skeptic.2). Proposed: batch 17's checker rung.
- **740 and 741**: the review list (W.skeptic.2). No rung until he answers.
- **742**, walk loads two generic declarations with equal domains: no PLAN line. Proposed: the next walk rung, beside rows 549 and 159.

### What the record listed for him, and PLAN lacks

- **Q1's answer** is settled by P-149. P-149's "Still to build: climb batch 16's rung K, rows 572 and 727" is built: cut it with `record.py`. Review-queue item 62 and its line at `PLAN.md:269` are answered: move them.
- **The coordinator's calls 1 to 6** (`CLIMB-BATCH-16.md:81-86`, routed by its own `:389`) have no entry. Calls 1 to 3 stand at `PLAN.md:430-432` as 15b's Q2, Q3 and the guard, all now built. Proposed: one entry, "Calls 1 to 6 of climb batch 16, as built", default as built. Calls 1, 2, 3 and 5 are for his sight; call 4 goes with K.judge.1's entry, and call 6 with gather.2's.
- **"Points the batch lists for you, not questions"** (`CLIMB-BATCH-16.md:88-93`) have no entry. Proposed: one entry, "Points of climb batch 16, for his sight", default as landed:
  - team lines changed: H's 936 and 21 hash lines; W's `forIf` and its lines in `OverloadedFunction.java`, the shortcut among them; K's functional set, the team's line 133 of 2012;
  - messages changed: the apis' order and the unions, once; K's two sites; row 727's refusal;
  - walk now refuses row 740's pair, which the base ran;
  - K's placement reaches every ill-formed type in an expression's type;
  - W's three departures from its section's letter, and walk's import of `StaticTypeReplacer`;
  - the quick check's 65 s against P-30's minute (finding 6).
- **Item 38's line** (`PLAN.md:140`): "the duplicate pairs the checker skips, rows 726 and 727 of climb batch 15" now means row 726 alone.

### Answered or built items still open in PLAN

- **"Where we stand"** (`PLAN.md:7-13`) gives 15b's gate as the last landed, and "Next. Climb batch 16 ..., its record not yet drafted".
- **Phase 3 item 14** (`PLAN.md:52-64`) is built. It becomes one line with `f98ad813f` and this review. Its candidate lines:
  - Q2, Q3 and the guard: built.
  - The checker rows 720 and 727, and the walk rows 718, 373 and 673: closed.
  - The Scala walker in the shape of the update visitor waits on "rung S's profile". S took none of its final code, so that candidate still needs one.
  - Batch 17's lists, from the record's section 4: on the checker's side, row 681 first (`CLIMB-BATCH-16.md:389`), then 737, 739, 738, 714, 725 and 691. On walk's side, 697, 444, 742, row 665's half with 723 and 728, 717 and 719, 721 and 722, and judge-review.1's comments. Then row 695, and row 700.
- **"Climb batch 15b, listed for his review"** (`PLAN.md:430-432`): Q2, Q3 and the guard are built. Move them to `PLAN-history.md`, and keep Q1.
- **K.judge.2** (`PLAN.md:443`): answered. **S.worker.2's default** (`:439`): answered.
- **P-149's "Still to build"**; **review-queue item 62**; **item 38's mention of row 727** (above).

## What I did not do

- I built nothing and ran no Fortress program, suite or stage. I ran read-only scripts over the transcripts, the journal, the run's result and git: `batch-measures.py`, `spend.py`, `skill-load.py`, and my own counts of calls, refusals and stage launches.
- The gate's count time is from its result and its transcript, since its table prints none. I read the gate's uncommitted outputs to confirm the apis' order and `:130`, and cite none of them.
- The transcripts keep no reasoning, so Part 2 reads what agents ran and when.
- I did not judge the new specification passages beyond the review's, the judge's and the repair's checks.
- The INDEX line for this review is the coordinator's.

## For Pavol

In the order they need you, each with its default:

1. **Walk's `if` takes a `Maybe` as true or false (call 6, gather.2)**, where the `if` chapter says a clause must be a `Boolean`. Default: as built, with a ledger row for walk's departure.
2. **Row 159's limit (W.worker.1).** Walk still refuses two generic declarations like microGPT's two `opr ×`, unless one parameter pair excludes. Default: the limit kept.
3. **Rows 740 and 741 (W.skeptic.2).** Should both paths read exclusion over the whole parameter type, as the specification's existential reduction does? Walk now refuses one program that it ran before. Default: both rows open.
4. **A broken bound is reported once at each call (call 4, K.judge.1).** Default: as landed.
5. **The checker's top-level overload check reads abstract functional methods too (row 739, K.skeptic.2).** Default, my proposal: built in batch 17's checker rung.
6. **Row 488's last moving error is row 737 (S.worker.2, H.worker.1).** Default, my proposal: repair row 737 in batch 17; the count goes to 38 and the distance to 48 for good.
7. **The long-method guard lists five methods that nothing checked runs (S.worker.1).** Default: the list keeps them.
8. **Calls 1, 2, 3 and 5 as built, and the batch's points for your sight:** team lines changed, the messages, K's placement covering every ill-formed type in an expression, W's three departures from its brief, and walk using a class of the checker. Default: as landed.
9. **The quick microGPT walk check took 65 s and 58 s**, past P-30's minute for the first program. Default: one idle pair to find the cause before anything changes.

Information:
- The count is 39 and the distance 49, as declared. Only row 433's two sites moved, to their calls, and one union's spelling.
- The count stage takes 82 s and the distance stage 217 s, against 325 s and 1,075 s. Rung S's memos did it, not load.
- The batch wrote 6.01M over 17 agents in 8 h 31, against the record's 4.4M and 7 hours. The restart cost 0.51M, and the review's judge and repair 0.50M. Preparation cost about 1.46M more.
