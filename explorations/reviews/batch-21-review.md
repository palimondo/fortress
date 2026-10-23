<!-- The combined post-batch review of climb batch 21's first run (run wf_225c8ddd-913, base 00f2e1bdc, 13:31 to 17:57 UTC on 2026-10-23, landed and pushed at c53063bbd: rung S 557cabb04, rung X 64fa505c4, rung B 153887360, rung N ff19305cc, the closes b169d1fbd, the gather record dd60211b3, the review's corrections bdf83c1d1, the judge's ruling on the merged-diff review f3468b14c, its repair 6e8d7deab, the gate's tables c53063bbd), owed at the landing, in the form of reviews/batch-20-review.md, by a review worker reading only, against main at 66ed71f52 (the coordinator's boot note f3f5ed200 and PLAN item 61's 16ce5bf7b and 66ed71f52 after the landing). The measures are batch-measures.py's and spend.py's on batches 19 to 21, transcript-study/skill-load.py's on 21, the task-list archaeology's cost.py adapted to 19 to 21, and batch 20's review's scratch scripts adapted to batch 21's briefing keys; the per-site list was compared at 00f2e1bdc and c53063bbd. Tokens are writes only (input plus cache creation, one count per message id). Besides reading, it ran only git apply --check, patch --dry-run and lists21.py --run 2 on main, which write nothing. -->

# Climb batch 21, run 1: conformance, the count, the cost, the practice, the routing and the steps owed before run 2

## What came up in this run

### 1. The count 3, the distance 5 and the full check 191 to 5, row by row

**As the record expected them.** The record expected the stock stages to stay at 5 and 3 and the full check to go from 191 to 5 for the run together, and declared nothing (`coordinator/CLIMB-BATCH-21.md:24`, fork 28 at `:175`; the planner's run of run 1's text, section 4, held rung V's lines in X's place). The gate read `COUNT SAME   3, declared none` and `DISTANCE SAME   5` (`compile-ladder/climb-batch-21/gate/summary.txt:118-119`), on `dd60211b3`.

**The count's table** (`gate/checker-count.txt` against `climb-batch-20/gate/checker-count.txt`): `diff` prints nothing. No row is new or risen; every api 0, `#total 3`, `#locations 3`, `#crash none`. Its three errors moved by line only, to `Library/FortressLibrary.fss:1466`, `:4395` and `:4401` (the gate's result, `checkerCount`); the ties are below.

**The distance's table** (`gate/distance.txt` against batch 20's): only `#seconds` (161 to 206, `FortressLibrary` 116 to 144) and `#machine` differ. Kinds `typecheck 4`, `export 1`; classes X1 1, BR 2, OT 2; units `FortressLibrary` 4, `List` 1; `#crash none`.

**The per-site list** (`compile-ladder/gate/distance-sites.tsv`, `00f2e1bdc` against `c53063bbd`, `git diff`):
- **Gone, came:** none. The same five sites.
- **Moved, by line only,** each tied to a rung's added lines above it; N's three edits are in place and add none, X edits no library:
  - item 46's fused arm, `fss:1465` to `:1466`: rung S's `Integral`'s `opr =(self,b:I):Boolean` at `fss:702` (`557cabb04`);
  - row 731's two `BIG MIN`, `fss:4386` to `:4395` and `:4392` to `:4401`: S's three lines (`fss:702`, `Maybe`'s two meets at `:1631-1632`) and B's six lines of `Index` (`fss:1946-1951`, `153887360`; `git diff -U0 557cabb04 153887360 -- Library/FortressLibrary.fss` shows `@@ -1945,0 +1946,6 @@` as B's only hunk that adds lines).
- **The export error's entries:** 43 and 43. With the line numbers masked, one entry differs: `String`'s loses "due to different extends clauses" (twice), by rung S's api header, `trait String extends { ..., DelegatedIndexed[\Char,ZZ32\] }` (`Library/FortressLibrary.fsi:2430`). `Nothing`'s entry changed place in the list, by line.

The gate's comparisons hid these moves; `coordinator/references/batch.md`, "The checker count and the distance", puts every hidden difference on the review list, and none is there (finding 7; batch 20's finding 9 met the same).

**The full-check stage on the merged tree, from the gather's run** (`compile-ladder/climb-batch-21/RECORD.md:49-53`, its tree the four patches on `00f2e1bdc`, whose `Library/`, `ProjectFortress/`, `build.xml` and `bin/` equal `ff19305cc`'s): '#total 5', '#kind typecheck 4', '#kind export 1', '#crash none', '#seconds 212 FortressLibrary 156', '#shadow every shadow edit matched the tracked sources'; `compare-sites.py` against `plan-21/probes/full-check-base.tsv`: 'landed 191 now 5', 185 GONE lines, one counting two sites, and no COME; against the stock list, 'landed 5 now 5'. The 186 gone, by rung:
- **S, 54** (`rung-symbolic-library/SKEPTIC.md:7`): `String`'s four families 40 (`||`, `|||`, `//`, `///`, 10 each); `EmptyString`'s `(Concatenable, EmptyString)` 1; `=` 4 (`Integral` twice, `ZZ`, `BigNum`); `|_|` 3 and `Float`'s return type 1; `Maybe`'s subscript 1; the api's vector and matrix `+` and `-` 3; `Float`'s `^` 1.
- **B, 124:** 106 `_[_]` and 18 `_[_]:=`, by the `Index` bound and the tuple rule. Alone on its tree 132 went and 8 came, the 8 scalar sites whose text now shows `I extends Index` (`rung-index-bound/SKEPTIC.md:19`).
- **X, 8:** the L1 class, the api's `fsi:267-268` against `:2702-2708` and the component's `fss:361-362` against `:4906-4912` (the rung's tree), four by the bounds and four by the bounds with the self type (`rung-self-type-exclusion/SKEPTIC.md:7-13`).

54 + 124 + 8 = 186, and 191 − 186 = 5. The three caught `@@PROBE CRASH` lines of the `AnyList` crash stay for rung C. This run is also the first measurement of B's tuple rule and X's exclusion test together, which the record did not have (`CLIMB-BATCH-21.md:316`): nothing came.

**Outside the tables.** The ladder: 85 of 85 at pass, no move; all 18 microGPT components at disambiguate, the same first errors (the gate's result, `ladder`). S and B changed an api the compiled path can read, and X what the checker accepts: each rung ran its ladder subset and the eighteen components' phase step, no move (`RECORD.md`, "Points to report").

### 2. The stages' times against batch 20's gate

- **The count stage:** about 78 s at the gate, by the gate's call times (started 17:31:04 UTC, its table written 17:32:22, the review reading beside it), against 63 s alone at batch 20's. Rung X changed the checker; its skeptic timed base and head in one session, 83 s and 82 s (`rung-self-type-exclusion/SKEPTIC.md:14-19`), and B's skeptic 84 s and 79 s (`rung-index-bound/SKEPTIC.md:12-19`). So the rise is not X's or B's code.
- **The distance stage:** 206 s, `FortressLibrary` 144 s, load 1.60 at start, beside `testFast` (`gate/distance.txt:18-19`), against 161 s and 116 s at load 1.29.
- **The suites:** `testFast` 6 min 18 s against 5 min 37 s, 2,081 tests against 2,070; `testSystem` 3 min 45 s against 3 min 11 s, 677 against 668; `testSpecData` 1 min 7 s against 59 s, 130 both; `compileAll` 87 s against 60 s, both from emptied caches (`summary.txt:61-68` in both). The machine line, written at 17:25:47 UTC inside the gate, reads load 2.59, 5.48, 3.85 against batch 20's 2.90, 5.22, 3.53 (`summary.txt:73`).
- **The gate:** 23.5 minutes (17:09:59 to 17:33:27), against 21.7.
- **Reading.** The count stage's and the distance stage's rise is load: the skeptics' pairs show no change from the checker. `compileAll`'s 27 s more fit B's five Java and Scala files and X's three Scala files, which the gate's build compiled; one run cannot separate them from load. The FACTS entry for these times, F-240, still says "at the last landed gate, climb batch 20's" (finding 9).

### 3. The cost, by role, against the record and batches 19 and 20

`batch-measures.py` on the three runs and `spend.py` on the run's folder. Run 1 wrote **4.75M over 14 agents**, in 4 h 26 min (13:31:36 to 17:57:27 UTC). The boot note gives the harness's own count, 4.97M; the figures here count input and cache-creation tokens once per message id.

| Role | B19 | B20 | B21 | B21 share |
|---|---|---|---|---|
| Rung workers | 1.29M (4, two killed) | 848K (2) | 1.64M (4) | 34.6% |
| Skeptics | 966K (2) | 757K (2) | 1.52M (4) | 31.9% |
| Gather | 439K | 426K | 565K | 11.9% |
| Merged-diff review | 425K | 362K | 381K | 8.0% |
| Its judge and repair | 196K + 210K | 0 | 165K + 227K | 8.3% |
| Gate | 149K | 117K | 127K | 2.7% |
| Commit | 152K | 131K | 125K | 2.6% |
| **Total** | **3.82M** | **2.64M** | **4.75M** | |
| Agents, rungs | 12, 2 | 8, 2 | 14, 4 | |
| Span | 2 h 56 | 2 h 10 | 4 h 26 | |
| Per rung, all roles | 1.91M | 1.32M | 1.19M | |

**Against the record**, about 4.5M, "from 4.1M if no fix is contested and the review blocks nothing, to 5.4M with a judge and a repair round on a rung and on the review", and about 4 hours (`CLIMB-BATCH-21.md:62`). The run wrote 4.36M without the review's ruling, 0.26M over the low figure, and 4.75M with it, 0.25M over the middle; it took 26 minutes more.
- **Workers, 0.16M under** 1.8M: B 570K against 0.6M, X 453K against 0.6M, S 315K against 0.4M, N 304K against 0.2M. N's estimate was the one short: three new tests, a new row (808) found and measured, and the walk suites for a library change.
- **Skeptics, as estimated:** 1.52M against 1.5M (B 450K, X 410K, S 345K, N 312K). B's and X's ran the count stage twice each, as planned.
- **The fixed roles, 0.05M over** 1.15M: 1.20M. The gather wrote 565K and took 41 minutes, against 426K and 25 minutes for two rungs at batch 20: four rungs folded, a cycle in the order (gather.1), seven ledger rewrites refused for length before they fit, and a full-check stage, 16 walk programs and 18 compiled tests on its own tree.
- **The review's judge and repair, 0.39M,** and about 18 minutes of the tail after the gate's end (17:33 to 17:51): Part 2.

**Against batches 19 and 20.** Per rung, all roles, 1.19M is the lowest of the three. Workers and skeptics together per rung: 0.79M, against 0.80M (B20) and 1.13M (B19; 0.95M without the killed pair).

**The briefing's share.** Nine agents were briefed: the four workers, the four skeptics and the review's repair. All nine ran their briefing, none in its first turn, at calls 8 to 15, 24 to 97 s after start. Its results came to about 193K tokens, 4.1 % of the run's writes (results at 0.40 tokens a character plus 110 a call, counting every `--part`, the files a briefing call wrote and read back, and a persisted output read back): B 41K, the repair 38K (three of its four rungs' slices: B, X and N, the ruling naming those), X 32K, skeptic B 25K, S 19K, N 12K, skeptic X 11K, skeptic S 11K, skeptic N 3K. Batch 20: 89K, 3.4 %, 4 agents; batch 19: 162K, 4.2 %, 7. Per briefed agent 21K, against 22K and 23K.

**The task-list reminders' share** (the archaeology's `cost.py`): 62K tokens inserted, 1.3 % of writes, and 0.9 % of the run's 507M input-side tokens, against 1.0 % (B20) and 14.8 % (B19). Rungs B, the gather and the review made task calls; the list started empty.

**Other measures.**
- **First calls:** 680K (14.3 %), 8 cold, against 468K (17.7 %), 7 cold, and 575K (15.1 %), 8 cold.
- **Cache refills:** 0. **Refusal cycles:** none.
- **The skill's load** (`skill-load.py`): 492K, 10.4 % (112K of load text, 380K over 180 part reads), against 9.8 % and 10.2 %. Four agents read `fortress-repo`'s `sources.md` (rungs S and B, skeptics B and N), which the skill says not to load for a task.
- **Builds** (from the transcripts): rung B 1, rung X 2 (its change and its speed pass), skeptic B 1 (its fix), the gather 1, the gate 1; S and N none, since walk reads the library from source. `batch-measures.py` prints 0 for every rung, because its build pattern does not match `( nice -n 19 ant compileAll )` (finding 10).
- **Distance sites gone:** 0 on the stock stage, 186 on the full check. **Rows:** 5 closed (585, 784, 783, 793, 794), 6 opened (803 to 808), 7 rewritten (316, 471, 584, 611, 713, 726, 786) and 1 noted (774).

Per agent, in order of start (UTC; ids are the transcripts' `agent-<id>.jsonl`):

| Agent | Id | Writes | First call | Messages | Minutes | UTC |
|---|---|---|---|---|---|---|
| Rung B | ad336519 | 570K | 63K, cold | 253 | 79.2 | 13:31-14:50 |
| Rung X | a0c1284b | 453K | 26K | 211 | 69.7 | 13:31-14:41 |
| Rung S | a4b82531 | 315K | 23K | 132 | 31.5 | 14:41-15:12 |
| Rung N | afb9ea65 | 304K | 21K | 130 | 37.3 | 14:50-15:28 |
| Skeptic X | ac5c72a9 | 410K | 70K, cold | 137 | 27.6 | 15:12-15:40 |
| Skeptic B | ac42e211 | 450K | 32K | 160 | 40.3 | 15:28-16:08 |
| Skeptic S | a2ca7bf1 | 345K | 28K | 126 | 34.6 | 15:40-16:15 |
| Skeptic N | ac1d201b | 312K | 27K | 107 | 20.6 | 16:08-16:29 |
| Gather | a4723323 | 565K | 80K, cold | 191 | 40.7 | 16:29-17:09 |
| Gate | a34fe20d | 127K | 55K, cold | 40 | 23.5 | 17:09-17:33 |
| Review | a789e98e | 381K | 71K, cold | 127 | 22.3 | 17:09-17:32 |
| Judge, review | add69d1e | 165K | 64K, cold | 43 | 9.1 | 17:32-17:41 |
| Repair, review | aecb6ed9 | 227K | 59K, cold | 56 | 9.7 | 17:41-17:51 |
| Commit | a33ec8a3 | 125K | 62K, cold | 42 | 6.2 | 17:51-17:57 |

**Beside the run, today** (`spend.py`'s method on the session's Agent-tool transcripts): the planner 1.91M (10:09 to 13:20, rung X's section after the curator's answers included), the record's Fable review, both reads, 1.11M (11:55 to 13:30), probe A1 0.36M (11:04 to 12:03), the demos probe 0.28M (00:40 to 01:56); 3.66M, against batch 20's 1.14M. The type-decisions review that reshaped the brief, its evidence map 0.67M and its Fable judgement 0.69M, was the curator's review, not the batch's. The symbolic-operator, export and walk probes ran before today.

### 4. The tail

- **The gather** (565K, 41 minutes) composed the four rung commits in a tree of its own, `/home/user/fortress-gather21`, seeded from the base build, and fast-forwarded `main` to them, so that no staged change sat in `main`'s index while it folded records (gather.3; batch 20's finding 14 met this way). It applied S, X, B, N, breaking one pair of a cycle (gather.1, Part 1), all four with `git apply --3way --index` and no conflict. It opened rows 803 to 808, closed five, folded F-276 to F-280, rewrote F-81, F-225, F-227, F-245, F-249, F-258 and F-259, corrected the specification's main text under decisions on record (gather.2), and built the specification once ('BUILD SUCCESSFUL' twice; `RECORD.md:56`). Two notes were not written, rows 342 and 442 being at their limits (`RECORD.md`, "Ledger notes not written").
- **The merged-diff review** (381K, 22 minutes): one blocking finding, on the specification's text; five record corrections in `bdf83c1d1`; review.1 on the ledger's moved citations (Part 2).
- **The gate** (127K, 23.5 minutes), green on `dd60211b3`:
  - `testFast` 2,081 tests in 54 suites, the compiler track 1,282 to 1,293: X's nine compiled tests and the promoted `OverloadTwoBoundsClosedTraitExclusion`, whose `.test` now compiles, links and runs;
  - `testSystem` 668 to 677 (167, 173, 167, 170): S's guard, B's three, N's three, X's two;
  - `testSpecData` 130; the library track 86, the other-compiler track 263; 42 of 42 atomic runs PASS; no ladder or microGPT phase moved;
  - its `# machine` line still reads `FORTRESS_THREADS=1` (`summary.txt:75`), batch 11's finding 8.
- **The judge and the repair** (392K, 17:32 to 17:51): Part 2. The gate was not run again: the repair touched only `Specification/appendices/changes.tex` and records, recorded as a `# repair-ungated` line (`summary.txt:124`).
- **The commit** (125K, 6 minutes): the gate's tables landed, the PDF built once (687 pages), the quick microGPT walk check run, and `main` pushed to the three refs on the first try. It wrote no FACTS line: the manual names an entry "The true distance to the switch-over" that does not exist (finding 11), and F-53's figures still hold. It reported F-240 as made false (finding 9).

### 5. The microGPT walk check

- **Its lines:** `summary.txt:120-123`: "VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS", "rc=0 secs=56"; "VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS", "rc=0 secs=47". The first pair is `MicroGptAplQuick` and the second `MicroGptFlatQuick`, by the run's result (`microgptWalk`); the lines still name no program.
- **Against the batches before:** 47 s and 41 s at batch 20, 44 s and 36 s at batch 19, 44 s and 38 s at batch 18. This run's pair started at 17:51:31 UTC at load 0.12, against 0.33 at batch 20, from empty private caches, the two programs at once as before; the commit stage's PDF build started at 17:53:06, after both had ended (the commit's call times). So nothing ran beside them but each other.
- **Reading: a rise of 9 s and 6 s that load does not explain, and rung B is on both programs' path.** Both programs index an `Array[\RR64,(ZZ32,ZZ32)\]` (`explorations/apl/mg/FlatArrays2.fss:15`; the flat program's helpers likewise, `explorations/run-c4/src/FlatArrays.fsi:15-21`), whose index type now meets the bound `I extends Index`, which walk tests through `FTypeTuple.subtypeOf` and its library lookup (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTypeTuple.java:71-79`, `:132`). S's top-level `||` is reached only by the programs' few printed lines; X changes the checker only; N's lines are off the path. Rung B's own tree gave 73 s and 62 s, beside other agents (`rung-index-bound/REPORT.md:120-125`). One run each is not a pair. The Apl program, at 56 s, is 4 s under P-30's minute, and has risen 12 s in two batches. Batch 20's proposed timed pair was never run (`PLAN.md:189`). It is owed now, before the base build `/home/user/fortress-base21` is removed (finding 1).

## Part 1. Conformance

### Method

As in `reviews/batch-20-review.md`: each rung's commit, its `REPORT.md` and `SKEPTIC.md`; its section of the record and the record's review before the launch (`coordinator/climb-batch-21-review.md`, both reads); the gather's `RECORD.md`, the judge's `JUDGE-review.md` and `REPAIR-review.md`; the run's results in its journal; and the code and the specification on main. Three standards, kept apart:
- the specification;
- the team's built intent and the library's own way (P-27);
- the decisions on record: P-155, P-156 with the curator's two answers of today (question 1, option 1, `Index` outside `Object`; question 2, option 2, `atMost` under its method condition), P-157 as rewritten today to the checker branch, P-146, P-152, and the record's forks at their defaults (`CLIMB-BATCH-21.md:66-181`).

### The verdicts

- **Rung S, the symbolic operators' library fixes: in the spirit of P-155 and item 59's answer,** by the library's own device for the shape (juxtaposition's three top-level operators). One reading where walk splits with the rules: fork 5's refusal depends on walk's cache (split 4).
- **Rung X, the self type and the bounds in the exclusion test: in the spirit of P-157 as rewritten, P-146 and P-152,** in the exclusion test only (fork 30). One move beyond the record's expected ones: row 713's pair, whose recorded default was the refusal, now compiles (split 2).
- **Rung B, the index bound with the tuple rule: in the spirit of P-156 and both answers,** with two readings no decision covers (a type extending only `Index` is an `Object`; walk's exclusion as the dual), and one sentence of P-156 that its own Appendix I entry contradicts by the brief's order (split 1). Its specification work needed the merged-diff review's repair.
- **Rung N, the slices and a list's equality: in the spirit of P-27 and P-154,** the library's own way at each site (`Array1.subarray`'s offset; the maps' `Equality` entry).
- **No ruling on a rung.** Four skeptics approved, thirteen fix commits, none contested, one a defect of the change (B's void type). The merged-diff review blocked on one specification-text finding; its judge ruled repair, and the repair landed.

### Where the text, the brief or the principles split

**1. P-156's reason against rung B's Appendix I entry: the team's own fix, or the revival's departure.**
- What P-156 says: "Why: it is the team's own fix for this pair (`Specification/appendices/future.tex:186-207`), its "magic" read as subtyping" (`POSITIONS.md:67`).
- What landed, by the brief's fork 9 and the type-decisions judgement's V2: Appendix I's "The index type of a subscript" says "The tuple rule is the revival's departure from the designers' text on tuple types" and quotes the team's "we need a magic to convert that tuple argument expression" (`Specification/appendices/changes.tex:4184-4189`), and does not call the rule the team's fix (`CLIMB-BATCH-21.md:156`).
- The principles: the Working Draft and the 2012 Types chapter both make every trait type exclude every tuple type (quoted in the entry); the team asked for a conversion, not a subtype. The landed text is the better reading of the team's sources; the decision's sentence is his.
- **Was he told?** Not yet. The gather left it as his text (`RECORD.md`, "FACTS and POSITIONS left for the coordinator"); the boot note lists it among the judgement's items for him, one per message. On no review list.

**2. Row 713: the checker now accepts a pair whose recorded default was the refusal (X.worker.1, X.worker.2, X.skeptic.1, X.skeptic.2).**
- What landed: with the bounds read, the checker reads `f[\T extends { K, R[\T\] }\](x: T)` beside `f(x: Z)` as excluding and runs the program; the pin `XXXOverloadTwoBoundsClosedTraitExclusion` was promoted (`ProjectFortress/compiler_tests/OverloadTwoBoundsClosedTraitExclusion.test:1-5`); walk still refuses it at load, pinned by `ProjectFortress/tests/OverloadTwoBoundsClosedTraitExclusionWalk.test`; row 713 is rewritten to walk's half, `CONTESTED`.
- The text: the overloading chapter reads each static parameter "for any type within its bound" (`Specification/advanced/overloading.tex:582-588`), the 2011 reduction solves with the bounds (`Papers/Types/exc-reduction.tick:40-46`), and Appendix I lists the case as not settled ("Passages not yet revised", `changes.tex:4329-4336`, rewritten by the gather to what the checker now does).
- The record did not expect it: probe A1's scope (`SelfType*`, `XXXSelfType*`, `OverloadGeneric*`, `GenericPair*`, `*Comprises*`) did not hold the pin, so "52 tests with the same output" said nothing of it (`CLIMB-BATCH-21.md:311`). The rung reported it as a point, as the record asks of any compiled verdict that moves (`:188`).
- The record's own sentence (`RECORD.md:82`) calls the checker's half "repaired", while PLAN asks whether the refusal is restored (`PLAN.md:423`). If he restores it, the row is rewritten again.
- **Was he told?** On the review list, `PLAN.md:423`, with both questions; defaults: as landed, walk's refusal `CONTESTED`.

**3. Walk's half of the vector pairs (row 804, X.skeptic.3).**
- P-157 decides that the arrays' scalar `+` and `-` "stand beside the vectors' own" and changes the checker; P-146 says walk is unchanged; P-152 has both paths read exclusion by existential reduction. Walk refuses a program's own generic array-and-number operators beside a self-typed additive group's operator, 'at least one pair of parameters must have excluding types' (`XXXExclusionVectorScalarWalk.fss`). The library's own pairs pass walk only because walk's meet check skips symbolic operators (row 611).
- The skeptic filed it `NEGATIVE-VERIFIED`, a walk gap; the alternative is `CONTESTED`, as row 713. **Was he told?** On the review list, `PLAN.md:543`, default as filed.

**4. Fork 5's refusal under walk depends on the cache (row 342).**
- The rule the record states: a program's own trait with a functional `||`, `|||`, `//` or `///` that can meet `String` now needs to exclude `String`, as the Meet Rule asks (`CLIMB-BATCH-21.md:152`).
- What walk does: it refuses such a trait only where it analyses the library afresh, and runs it on a caches folder that holds the library's analysis (`rung-symbolic-library/SKEPTIC.md`, section 3), the mechanism of row 342. So a verdict at load depends on the cache.
- Row 342 holds the mechanism; the instance has no ledger note, the row being at its 700-character notes limit (`RECORD.md`, "Ledger notes not written"). Its only home is `SKEPTIC.md`, section 3.

**5. The record's overlap and order: "X ... in files no other rung of this run edits; the gather applies S, B, X, then N" (gather.1).**
- Every agent's intro carried it (`CLIMB-BATCH-21.md:721`), and the record's overlap list says "X shares no file" (`:453`), though its own sections send B, X and N to `Specification/appendices/changes.tex` (`:257`, `:305`, `:351`). Neither the planner nor the record's Fable review listed that file (`climb-batch-21-review.md:98`).
- The manual's rule ordered the pairs in a cycle (B before N by the manifest, N before X and X before B by `changes.tex`). The manual says what to do where two files order one pair both ways, not where three pairs make a cycle (`coordinator/climb-batch-workflow.md:158`). The gather broke N before X, the pair whose break moved the fewest lines, and re-anchored the folded record (`RECORD.md:19-35`).
- **Was he told?** `PLAN.md:550`, told; nothing waits.

**6. The gather corrected main-text sentences under a decision, without the entry's Change and Original text (gather.2 and the review's blocking finding).**
- The manual's gather corrects "each sentence of the specification a rung lists as made false and did not edit" (`climb-batch-workflow.md:161`). The gather did so for B's three passages (`objects.tex:21-26`, `:163-164`, `overview.tex:1061-1065`) and for X's two (`var-ref.tex:77-81`, `traits.tex:610-615`), each settled by P-146, P-156 or P-157, and widened B's entry's Affected sections. It did not write the entry's Change or quote the Working Draft's originals, which the revision form asks (`.claude/skills/fortress-repo/references/specification.md:21-23`). The review blocked, the judge upheld it, and the repair wrote both (`6e8d7deab`).
- **Was he told?** gather.2 at `PLAN.md:551`, default as landed. The cost is in Part 2.

**7. Fork 7's "as walk's half already has it" against the probe's walk patch (B.worker.4).**
- Fork 7 builds the checker's exclusion side as the dual of the subtype rule, "as walk's half already has it" (`CLIMB-BATCH-21.md:154`). The probe's `walk-tupleindex.patch`, which B's section names for walk, had "excludes unless a subtype". B built walk's side as the dual, which agrees with the checker and the new text, and `TupleIndexExclusionWalk` pins it. **Was he told?** `PLAN.md:547`, default as built.

**8. A type that extends only `Index` is an `Object` (B.worker.2).**
- Question 1's answer keeps `Index` outside `Object` and names it in the traits chapter's rule beside `Any` and `Object`. Neither the answer nor P-156 says what a trait or object extending only `Index` is. The desugarer makes it extend `Object` beside `Index` (`ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreDisambiguationDesugaringVisitor.java:91-123`), and the traits chapter now says so (`Specification/basic/traits.tex:186-210`). **Was he told?** `PLAN.md:546`, default as built.

### Rung S, `557cabb04`

**What landed.** The seven generators' text exactly, but for doc comments (`known-fixes.py` on the base's files diffed with the head prints only comment lines, `rung-symbolic-library/SKEPTIC.md:9`):
- `String`'s four families out of its trait, each three top-level operators at `(Any, String)`, `(String, String)` and `(String, Any)` with today's bodies (`Library/FortressLibrary.fsi:2507-2528`, `.fss:4464-4494`), the `(String, String)` `||` choosing `FlatString`'s or `Concatenable`'s own `||` by `typecase`;
- `EmptyString`'s meet and `Concatenable`'s three `||` in `String`'s api (`Library/String.fss:318`, `String.fsi:17-19`, `:29-31`);
- `Integral`'s abstract `=` (`fsi:452`, `fss:702`) and `ZZ`'s api `=` (`fsi:655`);
- `String`'s api header with `DelegatedIndexed[\Char,ZZ32\]` (`fsi:2430`), `Maybe`'s `|self|` and subscript meets (`fsi:981-982`, `fss:1631-1632`);
- the api's six vector and matrix `+` and `-` out, which the component never defined;
- `Float`'s `|self|` answering `RR64`, and its `^(self, b:RR64)` on `Float$Pow` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:79`, `:158`).
- Tests: the guard `StringConcatenationFamiliesWalk`, with the skeptic's five assertions through `Concatenable`; `XXXFunctionalMethodMeetOperator`'s traits exclude `String` (fork 5).

**Standard 1.** "Two declarations which differ in the position of the self parameter must satisfy either the Subtype Rule or the Incompatibility Rule" (`Specification/advanced/overloading.tex:518-523`): the team's `(a:Any, self)` beside `(self, b:Any)` broke it at 40 sites. No sentence outside Part IV makes the families `String`'s methods (the rung's grep; mine of `Specification/` for `opr ||(a` finds none). Part IV renders the moved declarations. Split 4.

**Standard 2.** Juxtaposition's three top-level operators are the library's device for the same shape (`fss:4497-4499` on main); `MATCH` and `IN` keep `self` second throughout, so no sibling site is left (`SKEPTIC.md:10`). Team lines changed: the four families (2008), `Float`'s `|self|`, the api's six operators, `String`'s api header.

**Standard 3.** P-155's library half for the 54 known fixes, at the probe's defaults (item 59); forks 3 to 5 and the review list's items 1 and 3, as the table below gives.

**Verdict: in the spirit.**

### Rung X, `64fa505c4`

**What landed.**
- Shadow (i) in substance: `toFunctionArrows` and `toFunctionalMethodArrows` keep, beside the plain arrow of a functional method whose self type comes from its F-bound, a second arrow from the declaration's own parameters; only `validOverloadingInner`'s exclusion test reads it (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:552-573`, `:614`).
- Shadow (ii) in substance: `meetEmptyWithBounds`, a third way to be valid in `OverloadingOracle.excludes` (`ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala:326-327`), reading each static parameter at the top of the meet as its bounds alone, never beside the parameter (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeSchemaAnalyzer.scala:448-543`), with a memo as the speed pass.
- Tests: nine compiled tests, five accepted and four `XXX` refusals (among them `tint`, `XXXExclusionExcludingBoundsBox`); the promotion of row 713's pin; two walk tests, the worker's `OverloadTwoBoundsClosedTraitExclusionWalk` and the skeptic's `XXXExclusionVectorScalarWalk`.
- The specification: Appendix I's self-type entry and "Overloading with static parameters", with walk's departure by row 804 (`changes.tex:2947-2951`); the gather's main-text corrections (split 6).

**Standard 1.** The overloading chapter's "for any type within its bound" (`overloading.tex:582-588`) and the extender rule (`Specification/basic/traits.tex:296-313` on main) give both readings. Splits 2 and 3.

**Standard 2.** The precedents are P-152's `emptyED` beside `subtypeED` for the place, and `subtypeEDMemo` for the memo (`rung-self-type-exclusion/SKEPTIC.md:25`). The team's `reduceED` conjoined the bounds, "even if we can't use them very well yet" (`TypeSchemaAnalyzer.scala:382-389` before the change). No library line changed.

**Standard 3.**
- **P-157:** in its two clauses and no more. Specificity, the Meet Rule, the coverage rule, the duplicate check and the Return Type Rule read the plain arrows (`coordinator/climb-batch-21-review.md:94`; `OverloadingChecker.scala:614`).
- **P-146:** only the exclusion test reads `self` as `C[\X\] & X`.
- **P-148:** the count stage 95 s, 108 s and 85 s on the worker's runs under load, 83 s and 82 s in the skeptic's pair: no slowdown.
- **Forks 30 to 33:** built (table below).

**Verdict: in the spirit,** with split 2's move.

### Rung B, `153887360`

**What landed.**
- The library: the probe's patch plus three changes (`Index`'s own doc comment, `atMost` under its condition, `UniformDistribution`'s bound). So `trait Index extends Any end` (`Library/FortressLibrary.fsi:1249`), `ZZ32` an `Index` (`:534`), `Range` excluding it (`:2175`), every index parameter of the generic indexed types bounded (`:1270` and the rest; `Library/Random.fsi:260`), and `atMost(n: I): FullRange[\I\] where { I extends Index }` (`fsi:2243`, `fss:4108`).
- The checker: the tuple rule on both sides by the qualified name `FortressLibrary.Index`, with `Index` excepted from the `Object` shortcut and the empty tuple left out (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:261-262`, `:331-333`, `:565-567`, `:853-862`).
- The desugarer: `Index` kept as written, and a clause naming only `Index` (and `Any`) given `Object` beside it (`PreDisambiguationDesugaringVisitor.java:91-130`, `:169-171`).
- Walk: `FTypeTuple`'s `subtypeOf`, `meet`, `join` and `excludesOther`, and `FType.java:205`, the skeptic's void guard among them (`FTypeTuple.java:71-79`, `:83`, `:132`, `:202-203`, `:221-222`, `:414-424`).
- The specification: "Tuple Types" and "Trait Types" (`Specification/basic/types-vals-vars.tex:238-246`, `:335-351`), the traits chapter (`traits.tex:186-210`), the box in the proposed features, and Appendix I's "The index type of a subscript" (`changes.tex:4123`), with the gather's corrections and the repair's Change and Original text.
- Tests: `TupleIndexBoundWalk`; the skeptic's `TupleIndexExclusionWalk` and `XXXIndexBesideTupleOverloadWalk` (row 806).

**Standard 1.** The rule departs from the Working Draft's and the 2012 chapter's tuple text, and Appendix I says so (split 1). The traits chapter names `Index` beside `Any` and `Object`. The empty tuple is no tuple type ("two or more types", `types-vals-vars.tex`, "Tuple Types"), which the skeptic's fix enforces. Splits 7 and 8.

**Standard 2.** `WellKnownNames` names the library's other traits, and the rule names `Index` there (`ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java:25-26`). `SumReduction`'s two `distribute`s are the library's form for a member that applies at some instances (`fss:3444-3446` on main). The team's lines changed are the index parameters of the indexed types (2008) and `BoundedRange`'s `atMost`.

**Standard 3.**
- **P-156:** each sentence built, both answers as answered; split 1 is the decision's own reason.
- **P-42 and P-56:** a tuple of indices is no `Object`, and `Range` stays unbounded.
- **P-148:** the count stage 99 s and 90 s on the worker's runs, 84 s and 79 s in the skeptic's pair. No speed pass was owed, since the change was not slower.
- **Forks 6 to 9:** built (table below).

**Verdict: in the spirit,** with the repair of its Appendix I entry.

### Rung N, `ff19305cc`

**What landed.**
- `Array2.subarray` and `Array3.subarray` hand their views the offset less the base, and `Array3`'s `[:]` passes its base (`Library/FortressLibrary.fss:2741`, `:3143`, `:3122` on main), as `Array1.subarray` does (`:2467`).
- `List extends Equality[\List[\E\]\]` beside its conditional order (`Library/List.fsi:67`, `Library/List.fss:106`).
- Tests: the two promotions; `ListEqualityElementwise`; `XXXNotEqualOwnEquality` (row 807); `XXXArray2ShiftedSlice` (row 808).
- The specification: callouts at the two passages that order lists (`Specification/basic/operators/opr-overview.tex:296-301`, `Specification/advanced-lib/algebraic-constraints.tex:523-528`), and Appendix I's conditional-extension entry (`changes.tex:160-161` and after).

**Standard 1.** "The implicit range : is treated as l:u" (`Specification/basic/expressions/ranges.tex:119`); `e =/= e'` means `NOT (e = e')` (`opr-overview.tex:272-273`), which row 807 records as broken under walk.

**Standard 2.** The precedents are `Array1.subarray`, `ImmutableArray1.subarray` and the rank-1 views for the offset, and `Map`, `IntMap` and `PrefixMap` for the `Equality` entry (`rung-slices-list-equality/SKEPTIC.md:14`). The sibling site, `SubArray2.subarray` (`fss:2825`), is row 808, outside the rung by its section ("every other array body"). The three array lines are the team's.

**Standard 3.**
- **P-154:** a list's `=` stays element by element, and the order stays conditional.
- **P-27:** the precedents above.
- **Forks 10 to 12:** built (table below).

**Verdict: in the spirit.**

### The record's forks and defaults for run 1, against what landed

| Fork or item | Rung | Landed |
|---|---|---|
| Question 1, option 1 (`Index` outside `Object`) | B | Built; a type extending only `Index` is an `Object` (split 8) |
| Question 2, option 2 (`atMost` under its condition) | B | Built (`fsi:2243`, `fss:4108`) |
| 1, two runs; 2, X in V's place | all | Built |
| 3, S's and X's test the full-check stage | S, X | Built; before the planner's table, after on each tree |
| 4, the four families as top-level operators | S | Built, the generators' code |
| 5, `XXXFunctionalMethodMeetOperator`'s traits exclude `String` | S | Built; walk's refusal is cache-dependent (split 4) |
| 6, `Index` by its qualified name | B | Built in the checker, walk and the desugarer |
| 7, the checker's exclusion side as the dual | B | Built; walk's side built as the dual too (split 7) |
| 8, only `ZZ32` extends `Index` | B | Built; `UniformDistribution`'s parameter bounded |
| 9, the tuple rule recorded as the revival's departure | B | Built; against P-156's reason (split 1) |
| 10, the `=/=` defect filed with its `XXX` test | N | Built, row 807 |
| 11, revision notes at the two list-order sentences | N | Built, as callouts |
| 12, N one rung | N | Built |
| 21, the count stage's blind spot, the coordinator's between the runs | none | Owed before run 2 (Part 4) |
| 28, nothing declared | all | Kept; nothing came |
| 29, speed passes for B and X | B, X | X's memo; B's change not slower |
| 30, the bounds in the exclusion test only | X | Built |
| 31, the solver's recursion filed | X | Row 803, `NEGATIVE-BOUNDED` |
| 32, `tint` stays refused, row 786 `CONTESTED` | X | Built, `XXXExclusionExcludingBoundsBox` |
| 33, refusals as `XXX` compile tests | X | Built, four |
| Review list 1, `|_|` by `String`'s api header | S | Built (`fsi:2430`) |
| Review list 3, `Float`'s `^` meet | S | Built (`FortressBuiltin.fss:158`) |
| Review list 6, row 774 out, the `Equality` line in | N | Built; row 774 noted |
| Review list 2, 4, 5 | C, E | Run 2's |

Forks 13 to 20 and 22 to 27 are run 2's.

### The global questions

- **Promised against landed.** Closed: 585 and 784 (S), 783 (B), 793 and 794 (N). Opened: 803 (X, by plan), 804 (skeptic X), 805 (B), 806 (skeptic B), 807 (N, by plan), 808 (N). The count 3 and the distance 5; the full check 5, as planned.
- **The record's premises that failed:**
  - "X shares no file with S, B or N", and the order S, B, X, N (split 5);
  - A1's 52 tests as the reach of X's change, which missed row 713's pin (split 2);
  - fork 7's "as walk's half already has it" (split 7);
  - N's cost, 0.2M against 0.30M;
  - the gather's specification corrections as one step, without the entry's fields (split 6).
- **Built twice: no.** No declaration is changed by two rungs; `main`'s code is the four patches on the base (`RECORD.md:7`).
- **The library's way:** yes for each, with the precedents above.
- **Together:** S, B and N meet in `FortressLibrary.fss`, S and B in its api, B, X and N in `changes.tex`, at least 19 lines apart. The gather's merged run held every rung's tests and the full check at 5 with nothing come. B's and X's checker changes are in different files, though X's exclusion test runs through B's `pExcInner` cases; that path is now measured together for the first time.

### Findings

Ranked by what they cost or risk next, each with its home.

1. **microGPT's quick walk check rose to 56 s and 47 s, 4 s under P-30's minute, and rung B is on both programs' path** (section 5). The Apl program has risen 12 s in two batches, and batch 20's proposed timed pair never ran. Proposed (mine): before run 2's base build removes `/home/user/fortress-base21`, one timed pair, that build against the head, each program alone at a load under 1, about 4 minutes of the machine and under 50K tokens; if B's rule accounts for it, a look at walk's `Index` test (`FTypeTuple.isLibraryIndex`, a library lookup at each test against `Index`) before run 2's rungs add more library text. Home: PLAN, "Work that can start now", in place of batch 20's finding 8 (`PLAN.md:189`).
2. **The record's overlap claim was false, every agent read it, and the manual has no rule for a cycle** (split 5). Proposed (mine): the planner's overlap list names every file the rung sections send a rung to, `Specification/appendices/changes.tex` among them, and `check21.js`'s successor checks the sections' file lists against the overlap paragraph; the manual's gather step adds the cycle rule the gather used (keep each pair that a single file orders outright and the manifest's order elsewhere, and break the pair whose break moves the fewest lines). Home: the manual, "Preparing a batch record" and "Gather".
3. **The gather's specification corrections stopped short of the entry, and the review's ruling cost 0.39M and about 18 minutes of the tail** (split 6; Part 2). The fourth review ruling on an Appendix I entry the gather left short, after batches 8, 9 and 19 (0.53M, 0.39M, 0.41M). Proposed (mine): the manual's "Corrections still owed" asks, of each main-text sentence the gather corrects under an Appendix I entry, the entry's Change sentence and its Working Draft quotation in the same commit, by the revision form (`specification.md:21-23`). Home: the manual, "Gather".
4. **Rows 585, 784 and 783 are closed on a stage no gate runs** (fork 3, by plan): their 178 sites are held only by `run-shadow.sh catch`, until rung C turns the full check on in the distance stage. A library change before then could bring them back unseen. Proposed (mine): none if run 2's C lands; if it does not, the gate gains the full-check stage beside the distance stage, reported and never red, about 3.5 minutes. Home: run 2's record, rung C's section.
5. **Row 713's checker half moved against its recorded default, outside the record's expectations** (split 2). Home: `PLAN.md:423`, his; the ledger rewritten again if he restores the refusal.
6. **Routing gaps** (Part 4): the record's run-1 forks, its six review-list defaults and its points for his sight have no entry, for the fifth time (batch 16's finding 4, 18's 3, 19's 2, 20's 2); rows 806 and 808 have no candidate line; N.worker.1, N.worker.2 and B.worker.1 have no default; rows 342's and 442's instances have no home but the rungs' files; PLAN's item 59 still names A2 for P-157; item 61 sits under "Before the switch-over" while its default is after it. Home: the routing, by the lines of Part 4.
7. **The three sites the comparisons hid as moved** (section 1) are on no review list, as at batch 20, whose proposal to exempt such moves is not adopted (`PLAN.md:190`). Home: that proposal, or one entry under "Climb batch 21, listed for his review".
8. **P-156's reason contradicts its own Appendix I entry** (split 1). Home: his, one message; the boot note has it.
9. **FACTS:** F-240 is false ("the last landed gate, climb batch 20's"; batch 21's distance stage took 206 s and its count stage about 78 s); F-245 is 2,258 characters, F-276 1,467, F-277 1,320 and F-278 1,531, past the record's 600 (`RECORD.md`, "FACTS and POSITIONS left for the coordinator"); F-259 now carries the `Index` exception, material for the consolidation. Home: the coordinator's consolidation.
10. **`batch-measures.py` counts no build where the command runs under `nice`:** its `BUILD_SEG` (`explorations/coordinator/tools/batch-measures.py:49`) needs `ant` at the head of the segment, so `( nice -n 19 ant compileAll )` counts 0, and the tool reported 0 builds for B and X, which built once and twice. Proposed (mine): accept `nice -n N` before `ant`. Home: PLAN, "Work that can start now".
11. **The manual and the script name a FACTS entry that does not exist:** "The true distance to the switch-over" and "The checker-count stage's table" (`climb-batch-workflow.md:249`, `climb-batch-workflow.js:1501`); the commit stage spent four calls finding F-53. Proposed (mine): name F-53 and F-66 by number. Home: PLAN, "Work that can start now".
12. **Skeptic B wrote its briefing to the session's scratchpad again** (`slice1.txt`, `slice2.txt`), batch 20's finding 13, which is not built (`PLAN.md:192`). Home: that line.
13. **Run 2's patch no longer applies, and run 2's sections cite moved lines** (Part 4, "Between the runs"). Home: the planner's re-read before run 2.

## Part 2. Did the practice hold

### The skeptics' fixes

From the run's journal (each skeptic's `fixes`), each `SKEPTIC.md`, and the review's `fixesChecked`: 13 fix commits, one a defect of the change, none contested.

| Rung | Fix commits | Defects of the change | Test first |
|---|---|---|---|
| S | `fc34c9375` (report and record from the journal), `bdead0cee`, `510f94d0b` | 0 | `bdead0cee` adds five guard assertions, green on base and head |
| X | `45a07c191` (from the journal), `c360464e8`, `820d7c893`, `4aa105c03` | 0; one new row (804) | `XXXExclusionVectorScalarWalk`: ' OK Saw expected exception' on head and base; red with `AddG`'s operator removed for one run, 'Expected failure or exception, saw none.', 'Tests run: 1,  Failures: 1'; restored, `cmp` clean (`rung-self-type-exclusion/SKEPTIC.md:91-93`) |
| B | `4058fe4d3` (from the journal), `e39d5b08d`, `e935a793f`, `08de58899` | 1, `e39d5b08d`: walk took `()` and a tuple holding `()` as `Index` types | On the worker's head at 15:48:50 UTC, 'FAIL: a Boolean: true =/= a Boolean: false; () is no tuple type and no Index', 'Tests run: 1,  Failures: 1'; after the fix and `ant compileAll`, at 15:50:28, 'OK (2 tests)'. `TupleIndexExclusionWalk` red on the old code, green on the head; `XXXIndexBesideTupleOverloadWalk` red when changed for one run (`rung-index-bound/SKEPTIC.md:67-83`) |
| N | `944901606`, `3063446e1` | 0 | messages and the record only |

- Every fix is sound and stays inside its rung's work. The three walk tests the skeptics added lie outside their rungs' named files, points to report that the gather listed.
- Against the batches before: batch 20 made 11 fix commits with 0 defects, batch 19 9 with 2, batch 18 11 with 3. The one defect, a quiet value under walk (`ident(())` answering `()` where the checker refuses it), is the kind the failure-mode check looks for.

### Workers, test first

Each worker's test came first, as its skeptic read the transcript:
- **X:** the nine compiled tests written at 13:38:10 to 13:38:42 UTC and run on the base's build at 13:38:58, 'Tests run: 9,  Failures: 4' with the four `XXX` tests 'Saw expected failure'; the patches applied at 13:39:56; the first build at 13:42:28 (`rung-self-type-exclusion/SKEPTIC.md:20`).
- **B:** `TupleIndexBoundWalk` written at 13:41:48 and failing on the base at 13:42:21, 'Index is undefined.', 'Tests run: 1,  Failures: 1'; the library patch at 13:44:54, the first Java edit at 13:45:34 (`rung-index-bound/SKEPTIC.md:20-24`).
- **N:** the promotions at 14:56:37 and the harness on the base at 14:57:21, 'FAIL: a Int: 22 =/= a Int: 11', 'FAIL: a Int: 222 =/= a Int: 111', 'Tests run: 4,  Failures: 2'; the `XXX` test red on a deliberate change at 14:57:34; the library first edited at 14:58:57 (`rung-slices-list-equality/SKEPTIC.md:12`).
- **S:** its test is the full-check stage, whose before is the planner's table (fork 3), so no failing harness run on the base is owed. The guard was green on the base at 14:47:14 UTC, red with one expected value changed at 14:47:27, and green after the edit at 14:50:15; the expected failure went red under the edit and green respelled (`rung-symbolic-library/SKEPTIC.md:8`).

No miss of order, as in batches 11 to 20.

### The rulings

None on a rung: no fix was contested, no rung refused, no worker stopped.

### The merged-diff review, its judge and its repair

- **The blocking finding.** Appendix I's "The index type of a subscript" named in its Affected sections the three passages the gather revised, but its Change described none and its Original text quoted neither Working Draft sentence (the review's result, `blockingCode`). The judge upheld every claim, added part 4 of the revision form (rung B's decision record, sections 4.7 to 4.9), and ruled `repair`, not `land`: the repair edits a specification file, which `land` excludes (`JUDGE-review.md:9-17`).
- **The repair** carried out the eight steps with two deviations: it re-anchored `RECORD.md:137` as well, which the ruling's lines moved, and it committed its own `REPAIR-review.md` (`REPAIR-review.md`, section 2). It built the specification ('BUILD SUCCESSFUL' twice, 687 pages, the strict grep 0) and committed `6e8d7deab`. No path the gate reads changed, so the gate stood.
- **The review's own corrections**, `bdf83c1d1`: F-276 and F-258 made true on main, seven older FACTS entries re-anchored, rows 316, 726 and 803 rewritten, `RECORD.md`'s line moves corrected, and review.1 entered (`PLAN.md:553`). `landing-check` 'no finding' before and after.
- **The cost:** 392K, 8.3 % of the run, and the commit waited from the gate's end at 17:33 to 17:51. Batch 19's ruling and repair, on a missing sentence of an Appendix I Effect, cost 406K. Finding 3 proposes the gather step that would have made it unneeded.

### The briefing in each agent's first turn

| Batch | Briefed agents | In the first turn | Run at all | At calls | Seconds after start | Its tokens (estimate) |
|---|---|---|---|---|---|---|
| 19 | 7 | 0 | 7 | 4 to 19 | 18 to 102 | 162K, 4.2 % |
| 20 | 4 | 0 | 4 | 9 to 12 | 48 to 78 | 89K, 3.4 % |
| 21 | 9 | 0 | 9 | 8 to 15 | 24 to 97 | 193K, 4.1 % |

- Batch 21's nine: four workers, four skeptics and the review's repair. For the share that `batch.md:45` asks at a landing, the share that read it at all: 100 %. The repair read three of its four rungs' slices, those the ruling named.
- The figures for 19 and 20 are batch 20's review's. The calls and seconds come from the transcripts, by a script that finds each agent's first `facts-extract.sh` call with five or more quoted keys. The tokens are a scratch estimate (section 3).

### Builds and runs, repeated or not

- **Builds:** B 1; X 2, its change and its speed pass; skeptic B 1, for its fix; the gather 1; the gate 1. The other skeptics built nothing and ran their programs on the workers' builds.
- **Suites:** B ran `testSystem`, `testSpecData` and `testQuick` once each on its final code; X `testQuick`; S and N `testSystem` and `testSpecData`; skeptic B `testSystem` after its fix. Each is what the record's sections ask.
- **Count and distance stages:** each rung once each on its final tree; B and X also timed the count stage on the base build, as the skill's "The checker's time" asks; skeptics B and X ran the count stage on base and head, the one exception the manual makes. S and X ran the full-check stage once each, B once, the gather once on the merged tree.
- **Re-measured without a code change:** none found.
- **Taken from the record, not run again:** the planner's base full-check table as every rung's before; probe A1's measurements as X's expectations; climb batch 20's tables as the stock stages' before.
- **Re-measured by design:** the gather's merged runs; the gate. The gather's full-check run stands for the record's "Between the runs" step (Part 4).
- **The PDF built once,** by the commit stage. The gather and the repair built the specification to check it and removed the build.

### Refusals by the harness and the tools

- **All four workers' writes of `REPORT.md` were refused,** as the script expects; each skeptic wrote the report and record from the journal.
- **Three `sleep` calls were blocked:** rung B (`sleep 120`), skeptic B (`sleep 60`), the gather (`sleep 120`).
- **Two `Edit` calls were refused for a file not read** (rung B, skeptic B), and one for a string not found (the review).
- **One removal was stopped by the harness's safety check** (skeptic S).
- **Seven ledger rewrites were refused for length** before the gather fitted rows 584 and 471, and two notes were not written, rows 342 and 442 (`RECORD.md`, "Ledger notes not written").
- **No structured result was refused**, unlike batches 18 to 20; the schema's `kind` enum is unchanged (`climb-batch-workflow.js:954`), and the skeptics used its two words.
- No refusal cost a cache refill.

### The practice's measures, batches 19 to 21

| Measure | B19 | B20 | B21 |
|---|---|---|---|
| Written | 3.82M | 2.64M | 4.75M |
| Rungs, agents | 2, 12 | 2, 8 | 4, 14 |
| Per rung, all roles | 1.91M | 1.32M | 1.19M |
| First calls | 0.58M, 8 cold | 0.47M, 7 cold | 0.68M, 8 cold |
| Refusal cycles | 0 | 0 | 0 |
| Rulings and repairs on the merged tree | 10.6% | 0 | 8.3% |
| Skeptic fix commits (defects) | 9 (2) | 11 (0) | 13 (1) |
| Distance sites gone net | 3 | 26 | 0 (full check 186) |
| Count stage at the gate | 64 s | 63 s | about 78 s |
| Distance stage at the gate | 153 s | 161 s | 206 s |
| Skill's load | 10.2% | 9.8% | 10.4% |
| Briefing, estimated | 4.2% | 3.4% | 4.1% |
| Task-list reminders, input side | 14.8% | 1.0% | 0.9% |
| microGPT quick pair (Apl, Flat) | 44 s, 36 s | 47 s, 41 s | 56 s, 47 s |

### Batch 20's findings, a batch later

1. **Four items without default:** rows 793 and 794 built by rung N; A.skeptic.4 is run 2's fork 22; A.skeptic.3 and gather.2 unchanged.
2. **The record's forks without an entry:** fixed for batch 20 (`PLAN.md:535`); repeated for batch 21 (finding 6).
3. **Row 533:** not reached by this batch.
4. **His answers in PLAN:** done by the routing of batch 20.
5. **P-79's rung:** rung D of run 2.
6. **Batch 21's two probes:** done (`perf-probes/export-check-full/`, `perf-probes/walk-conditional-extension/`).
7. **Row 441:** not reached.
8. **The microGPT timed pair:** not run; the rise is larger now (finding 1).
9. **The hidden moved sites:** listed for batch 20, its proposal not adopted; repeated (finding 7).
10. **P-79's example:** fixed (`POSITIONS.md:85`).
11. **The skeptic's schema:** no refusal this batch, enum unchanged.
12. **FACTS consolidation:** F-240 two gates behind again (finding 9).
13. **The skeptics' scratch in the session's scratchpad:** repeated by skeptic B (finding 12).
14. **The gather's staging between commands:** answered by gather.3's tree of its own.
15. **A rung re-measuring a probe's patch:** X ran the full-check stage as its test, by the record; nothing else re-measured.

### Misses, by kind

Numbered on from `batch-20-review.md`'s 632.

Found inside the batch:
- **The change wrong:** 633, walk took `()` and a tuple holding `()` as `Index` types (`e39d5b08d`, skeptic B).
- **A test that reached too little:** 634, S's guard reached only `FlatString`'s arm of the new `||` (`bdead0cee`, skeptic S); 635, B's test reached neither walk's tuple exclusion nor `FType.java:205` (`e935a793f`, skeptic B).
- **A defect without its home:** 636, walk's half of the vector pairs, row 804 (`820d7c893`, skeptic X); 637, walk's load of `Index` beside a pair, row 806 (`e935a793f`, skeptic B); 638, row 808's shift faces (`3063446e1`, skeptic N).
- **Text claiming more than the code or the evidence:**
  - 639, S's report: fork 5's rule without walk's cache condition, and a citation one line off (`510f94d0b`);
  - 640, X's test citations naming a chapter as a section (`c360464e8`);
  - 641, X's report: the first build's time (`4aa105c03`);
  - 642, B's Appendix I Effect without row 806 or the reserved name, and its report's `FTypeTuple.java` lines (`08de58899`);
  - 643, N's test citations naming no section (`944901606`);
  - 644, F-276 citing S's tree, and F-258's line (the review, `bdf83c1d1`);
  - 645, `RECORD.md`'s "X's Scala lines stand" for `TypeAnalyzer.scala` (the review, `bdf83c1d1`).
- **Sentences made false and not listed:** 646, rows 726 and 316 (skeptic S); 647, F-258 and `PLAN.md:419` (skeptic X); 648, F-81 and F-259 (the gather); 649, Appendix I's Change and Original text for the gather's own corrections (the review's blocking finding, `6e8d7deab`).
- **The record's premises:**
  - 650, "X shares no file", and the order S, B, X, N (the gather, gather.1);
  - 651, A1's scope as X's reach, which missed row 713's pin (worker X);
  - 652, fork 7's "as walk's half already has it" (worker B);
  - 653, N's cost, 0.2M (this review).
- **The team's code, found by the rungs:** 654, rows 805 (worker B), 807 and 808 (worker N), each on the base too; row 803 is the team's solver, met by the probe.
- **Process:**
  - 655, four report writes refused (by design);
  - 656, three `sleep` calls blocked, two `Edit` calls refused, one removal stopped;
  - 657, seven ledger rewrites refused and two notes not written (the gather);
  - 658, skeptic B's briefing in the session's scratchpad;
  - 659, four agents read `sources.md`;
  - 660, the commit stage's search for a FACTS entry that the manual names and the record lacks.

Found by this review: 661 to 673, findings 1 to 13 above.

**Against the earlier notes.** 28 found inside the batch (633 to 660), 7 a rung, against batch 20's 32. One was a fault of the code (633), caught by its skeptic; the rest are text claims, homes and premises that the skeptics, the gather and the review caught. Landed with no known wrong value. The known costs are the review's ruling (0.39M, 18 minutes), the six new rows, row 713's open question, and microGPT's 9 s.

## Part 3. Skill sentences the batch made false

For the skill writer. Lines are of `.claude/skills/` at `66ed71f52`. The gather's record lists the revival changes of the four rungs and two sentences made false (`RECORD.md`, "Revival changes, for the skill writer").

**Made false by batch 21:**
- **`fortress-repo/references/compiler.md:77`** (the gather names it), "the checker reads no bounds of static parameters when it reads exclusion over the whole tuple of parameter types. So it refuses `tint[\T extends Red\](x: Box[\T\])` beside `tint[\T extends Blue\](x: Box[\T\])` ...": the exclusion test now reads each static parameter at the top of the meet as its bounds (`TypeSchemaAnalyzer.scala:448-543`). It still refuses `tint`, because `Box[\Bottom\]` is an instance of both domains (row 786; `XXXExclusionExcludingBoundsBox`). The sentence's mechanism is false, its example true for another reason.
- **`fortress-repo/references/revival-changes.md:40`** (the gather names it), "In `T`'s bodies, `self` has the intersection type of `T[\X\]` and `X`; signatures keep `T[\X\]`.": true of every rule but one. The overloading check's exclusion test reads `self` in a signature as `T[\X\] & X` (P-146, P-157; `OverloadingChecker.scala:552-573`, `:614`), and with its bounds reading accepts pairs that walk refuses (rows 713 and 804).
- **`fortress-repo/references/interpreter.md:44-50`**, "Walk departs from the rules in these cases:", a list that `revival-changes.md:17` sends a worker to before changing code to pass walk's check. Three cases are now missing:
  - walk refuses a program's generic operators between an array of a number type and a number beside a self-typed additive group's own operator, which the checker accepts (row 804);
  - it loads a function over `Index` beside one over a tuple type whose element types neither lie below nor exclude `Index`, which the Meet Rule refuses (row 806);
  - it refuses row 713's pair, which the checker now accepts (`CONTESTED`).

**Not false, but incomplete or stale, each met by this batch:**
- **The skill has no sentence on `Index`.** Missing: the tuple rule, `Index` outside `Object`, a type extending only `Index` an `Object`, walk's refusal of a program's own type named `Index`, and the bound a program's generic over an indexed type now needs on the checker. The revival-change material carries them (`RECORD.md`, rung B).
- **`fortress-repo/references/interpreter.md:62-67`**, "So a library edit can stop every program at load, if it does one of these: adds an overload ...": true. But rung S's top-level families met it in a form no part names: walk's load check runs only where it analyses afresh (row 342), so the same program is refused on a fresh cache and runs on a filled one (`rung-symbolic-library/SKEPTIC.md`, section 3). A clause there would let a worker read a refusal that comes and goes.
- **`fortress-repo/references/records.md:105`**, "A row at its 1,200-character limit takes no note.": `ledger.py` also refuses a row whose notes pass 700 characters, which the gather met six times and which kept rows 342's and 442's notes out. Batch 20's review asked the same (`PLAN.md:195`); still not written.
- **`fortress-repo/references/tests-running.md:14`**, "`ant testFast` runs about 1,800 tests ... in about 9 to 11 minutes": 2,081 tests in 6 min 18 s at this gate. **`:23`**, `testSpecData` "in under a minute": 1 min 7 s at this gate, 59 s at batch 20's, under load. Approximate, stale.
- **`fortress-repo/references/compiler.md:137`**, the count stage "about a minute": about 78 s at this gate and 79 s to 108 s on the rungs, all under load; 82 s to 84 s in the skeptics' pairs. Approximate.

**Rules the batch met that stay true:** `SKILL.md:132` (an unbounded parameter's bound `Any` holds tuples, as `Object` does not; rung B's report checked it), `revival-changes.md:13` (`XXXGenericPairFreeArgument` still sees its failure), `:42` and `:54` (a list's `=` element by element; `List`'s conditional order), `interpreter.md:98` (the quick pair "in about 56 s for both": 56 s).

**Checked and not false:** `coordinator/references/batch.md:45` (9 of 9 briefed agents read it, none in the first turn), `:58-61` (every hidden difference on the review list: true as a rule, not kept, finding 7). Outside the skills, the manual's sentences this batch met are findings 2, 3 and 11.

## Part 4. Routing

Checked against main at `66ed71f52`: the gather's PLAN entries (`64fa505c4`, `153887360`, `ff19305cc`, `dd60211b3`), the review's (`bdf83c1d1`), the coordinator's item 61 (`16ce5bf7b`, `66ed71f52`), and the boot note `f3f5ed200`. PLAN's routing step runs after this review, by the boot note.

### The items of `forCurator` and the gather's

- **B.worker.3, B.skeptic.3** (microGPT's helpers need `I extends Index`): item 61, `PLAN.md:163`, default after his word of 18:07 UTC: the first batch in which the checker reads microGPT. Sound, but it stands under "Before the switch-over" while its default is after it: its home is "Before microGPT compiles".
- **X.worker.1 and 2, X.skeptic.1 and 2** (row 713): `PLAN.md:423`, two questions, defaults stated. Sound.
- **X.skeptic.3** (row 804): `PLAN.md:543`, default as filed. Sound.
- **X.worker.3, X.skeptic.4** (row 584's room): `:544`, told. Sound.
- **B.worker.1, B.skeptic.1** (row 805): `:545`, "No default on record beyond the row". **Missing: a default** (proposed in "For the curator").
- **B.worker.2, B.skeptic.2** (`Index`-only types are `Object`s): `:546`, as built. Sound.
- **B.worker.4, B.skeptic.4** (walk's dual): `:547`, as built. Sound.
- **N.worker.1, N.skeptic.1** (row 808's repair): `:548`, "No default on record". **Missing: a default, and the question is the coordinator's**, which batch fixes a one-line defect, so its home is a candidate line, as batch 20's finding 1 found for rows 793 and 794.
- **N.worker.2, N.skeptic.2** (row 807's repair): `:549`, "No default on record". **Missing: a default.**
- **gather.1, gather.3:** `:550`, `:552`, told. **gather.2:** `:551`, as landed. **review.1:** `:553`, left for the ledger's full pass. Sound.

### New rows

- **803** (the solver's recursion): the row is its own home, `NEGATIVE-BOUNDED`, off the path while X's form never meets it. Sound.
- **804, 805, 807:** on the review list (above).
- **806** (walk loads `Index` beside a pair): **no PLAN line.** Its family is the walk rung on the load check's refusals and loads (review-queue item 260; phase 3's item 19, P-45's rows). Home: one line there.
- **808** (a shifted `Array2`): **no candidate line** (above).
- **The closed rows** 585, 784, 783, 793, 794: settled by F-276, F-278 and F-279. 585, 784 and 783 are held by no gated stage until rung C (finding 4).
- **Notes not written:** rows 342 and 442, at their limits; their instances live in `rung-symbolic-library/SKEPTIC.md`, section 3, and `REPORT.md`, section 9. **No PLAN home.** Home: the refused-notes line (batch 15's gather.1 entry, `PLAN.md:431`; the boot note's "the 40 refused notes first").

### What the record listed for him, and PLAN lacks

- **The record's run-1 forks taken at their defaults** (1 to 12, 21, 28 to 33; `CLIMB-BATCH-21.md:144-181`), **its six "defaults already taken, on your review list"** (`:135-142`), which the record told him "are on your review list (section 2)" (`:57`), **and its points for his sight** (`:182-188`; the team lines S, B and N changed). No entry under "Climb batch 21, listed for his review" (finding 6). The export probe's two questions stand only in the boot note.
- **The three moved sites** (finding 7).
- **The record's "After the landing" for run 1** (`CLIMB-BATCH-21.md:781`):
  - the routing of questions 1's and 2's answers and P-157's rewrite: items 38 and 59 are answered and still in "Pavol's answers" (`PLAN.md:151-152`). Item 59's text still says "the arrays' scalar `+` and `-` by A2, `Vector` and `Matrix` no longer additive groups (P-157)", which P-157's rewrite reversed;
  - P-155's, P-156's and P-157's "Still to build": none holds one (`RECORD.md`, "FACTS and POSITIONS left for the coordinator"); nothing to narrow;
  - row 774's wait written into P-154: not yet. P-154 still reads "Row 774: walk's half, since walk still gives every list an order." (`POSITIONS.md:65`), without the wait for P-12 or row 364;
  - FACTS consolidated (F-245 by S, B and X; F-225 by X): owed (finding 9);
  - the skill writer's task and the post-batch review: running.

### Answered, stale or overlong in the record

- **PLAN's "Where we stand" and "Next"** describe batch 20 as the last landing and batch 21 as waiting on probes (`PLAN.md:9-13`); **phase 3's item 19** reads "Batch 21, not drafted" (`:59`); the microGPT line ends at batch 20 (`:9`).
- **Review queue:** "The next batch: none until climb batch 21's record is drafted" (`review-queue.md:8`, `:15`); items 11 and 191 (the symbolic-operator probe, now built for run 1 and run 2's C to come) and items 76, 153, 224 and 246 (row 774's walk rung, which waits for P-12 or row 364).
- **F-240** (finding 9).

### Between the runs: the steps for run 2 that are now due

The record's own list (`CLIMB-BATCH-21.md:563`, `:737`), against main at `66ed71f52`:
1. **The full-check stage on run 1's landed tree:** done by the gather, on a tree whose code is `main`'s: '#total 5', 'landed 191 now 5', nothing come (`RECORD.md:49-53`). By the skill's rule on reuse, it is not run again; the boot note agrees. C's before under the full check is that table, with its three caught crash lines.
2. **C's, E's and D's sections against the landed tree.**
   - **Lines moved:** rung X moved `OverloadingChecker.scala`, which C's section cites. `isDeclaredName`'s loops `:255`, `:402`, `:411` are now `:261`, `:408`, `:417`; the import-star loops `:273-284`, `:307-318` are `:279-290`, `:313-324`; `isDeclaredName`'s definition `:742-746` is `:771-775`.
   - Rung B moved `TypeAnalyzer.scala`: `checkCC` `:522-527` is `:527-532`, `removeSelf` `:567-580` is `:575-588`, `openWhereSizes` `:908-924` is `:928-944`, and the crash's `bug` `:1039` is `:1059`.
   - Rungs S and B moved E's `Library/FortressLibrary.fss:2707`, `:2711` (`Array2`'s subscripts) nine lines down. `ExportChecker.scala`, `CompilerLibrary` and the demos are unmoved.
   - **Their before** is run 1's tables, `compile-ladder/climb-batch-21/gate/` and the per-site list at `c53063bbd`.
3. **`plan-21/probes/run2-api.patch` no longer applies.** `git apply --check` on main: 'error: patch failed: Library/FortressLibrary.fsi:1236'. `patch -p1 --dry-run`: 27 of 28 hunks apply, one with fuzz 2 at `fsi:1254` and the rest at offsets of 3 to 9 lines; hunk 24 fails at `fsi:2257`, `BoundedRange`'s narrowed `atMost`, which rung B kept under its condition. It is to be written again on the landed api, as the record allows. `prelude-full-check.patch`, the symbolic-operator probe's `checker-full-check.patch` and `team-demos/demos-repairs.patch` apply as they stand (`git apply --check`, no error).
4. **The briefing keys:** `lists21.py --run 2` on main: 'C ... problems 0', 'E ... problems 0', 'D ... problems 0', 'bad lists 0'. Done; the keys hold.
5. **Still to do:**
   - `gen21.py --run 2`, `check21.js --run 2` and `workflow-scenarios.js` on the splice;
   - fork 21, the count stage's reading of a library that does not parse, fixed on `main` with its test;
   - a base build at run 2's base, `/home/user/fortress-base21b`;
   - the skill writer's commits and their cold read before the launch (the manual's routing, step 5);
   - and, by finding 1, the microGPT timed pair before `/home/user/fortress-base21` is removed.
6. **Review-queue item 247** (does P-79's "running" mean walk only, or the checker too) is needed by rung D (`review-queue.md:486`). Its default on record is "every listed failure is owed, on walk and on the compiled checker". Rung D's section follows it except row 731's demo half, which it leaves for a probe of the checker over the demos (`CLIMB-BATCH-21.md:49`). So D can launch on the default.

## What I did not do

- I built nothing and ran no Fortress program, suite, stage or JVM. I changed no file but this one, and committed nothing. On main I ran only `git apply --check`, `patch -p1 --dry-run` and `lists21.py --run 2`, which writes nothing (it runs `facts-extract.sh --check`).
- I read the run's transcripts only through scripts: `batch-measures.py`, `spend.py`, `transcript-study/skill-load.py`, the task-list archaeology's `cost.py` adapted to batches 19 to 21, and batch 20's review's scratch scripts (`res.py`, `calls.py`) with a briefing script adapted to batch 21's keys. They are in the session's scratchpad, `rev21/`. The gate's count-stage time and the microGPT runs' loads come from the transcripts' call times and the runs' own headers; I cite no file under `tmp/` as a source.
- I measured nothing about microGPT's time or walk's `Index` test; section 5 is a reading.
- I did not read the coordinator's session; what he was told comes from the boot note, PLAN and `RECORD.md`. The INDEX line for this review is the coordinator's.

## For the curator

In order of consequence, each with its default, and when it is needed:

1. **microGPT's quick walk check took 56 s and 47 s, 4 s under your minute, against 47 s and 41 s at batch 20, with nothing else running; the index bound's new test in walk is on both programs' path.** Default (mine): one timed pair against the old build before run 2, about 4 minutes, and a speed fix in walk if the bound explains it. **Before run 2**, while the old build exists (the coordinator's step; told to you because the minute is yours).
2. **Row 713: the checker now accepts a pair of overloads it refused before, `f[\T extends { K, R[\T\] }\](x: T)` beside `f(x: Z)`, since it reads the type parameter's bounds when it asks whether two declarations exclude; walk still refuses it.** Default: as landed, walk's refusal recorded as an open question. Not needed before run 2; needed before walk runs the checker (P-12).
3. **P-156's reason says the tuple rule is "the team's own fix"; the specification's appendix, by the batch's brief, calls it the revival's departure from the team's text on tuple types.** Default: P-156's reason reworded to the appendix's reading. Not blocking.
4. **The run-1 choices the record made at its defaults (33 forks, of which run 1 used 18), its six defaults on your review list, and the team lines it changed** (`String`'s concatenation operators made top-level operators, `Float`'s `|self|` answering `RR64`, six vector and matrix operators out of the api, the index parameters bounded, `BoundedRange`'s `atMost` under a condition, three array lines, `List`'s header). Default: as landed. Not blocking.
5. **Walk refuses a program's own generic operators between an array and a number beside a vector's own `+`, which the checker now accepts (row 804).** Default: recorded as a walk gap that should follow the checker. Not blocking.
6. **A type that extends only `Index` is made an `Object`.** Default: as built. Not blocking.
7. **Walk's rule for when a tuple excludes `Index` was built as the checker's: only where one of its elements does.** Default: as built. Not blocking.
8. **The checker refuses a tuple of indices passed to a function whose parameter's type is `Index` (row 805).** Default (mine): recorded, not repaired, until a library or model line makes such a call. Not blocking.
9. **The library's `=/=` and `assert` compare by identity a user's value that defines its own `=` without the library's `Equality` (row 807).** Default (mine): recorded; the way chosen when walk gets static types after the switch-over. Not blocking.
10. **The export probe's two questions: the return types of `RR64`'s rounding operators, and which of `Condition` and `Maybe` extends `ZeroIndexed`.** No default on record; run 2's rung E leaves them in the export error. **Before the switch-over**, since the export error cannot reach zero without them.
11. **Item 247: does P-79's "running" mean under walk only, or accepted by the checker too?** Default on record: both; rung D builds that, but for one repair that needs a probe first. **Before run 2's rung D**, or the default stands.
12. **The gather's corrections of the specification's main text under your decisions, its order of the rungs, its own work tree, and the review's note on the ledger's moved line citations.** Default: as landed. Not blocking.

Information:
- The count stays 3 and the distance 5. With every symbolic operator checked, the library's 191 errors fall to 5 on the merged tree, each of the 186 tied to a rung: 54, 124 and 8.
- Run 1 wrote 4.75M over 14 agents in 4 h 26 min, against about 4.5M and 4 hours; the one extra was the review's ruling and repair on a sentence of the specification, 0.39M.
- Every worker wrote its test first; the skeptics found one fault of the code, `()` taken as an index type under walk, and fixed it test first.
- The rows of a slice of a shifted `Array2` (row 808) and of the library's `=/=` (row 807) are new; the first has a known one-line fix, which goes to a later batch's candidates.
