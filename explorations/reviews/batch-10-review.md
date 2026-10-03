<!-- The post-batch review of climb batch 10 (run wf_d5ec6194-bcc, base 9c9e823d5, launched 05:27 UTC on 2026-10-03, landed at about 11:00 UTC at ec718967a: rung N a1b5c253d, G a9b9933e6, W 833420ce4, C aa07efb31, the merged-diff review's corrections c14bbce87, gated once), the one combined pass of POSITIONS "One review after every batch." in the form of reviews/batch-9-review.md, measured against that review as its before, with two additions asked for: the cost by role as the measured figure the four batch-10 designs of coordinator/process-engineering/ are to be compared against, and the two content risks a blind designer named; written by a review worker reading only, against main at e7462efb7, the gate's landed tables as before and after, the 21 transcripts and the journal read through bounded scripts in the session scratchpad (rev10/); nothing built, no Fortress program run, no gate stage run; tokens are writes only (cache writes plus new input, one count per message id). -->

# Climb batch 10: conformance, process and routing

## What came up in this run

### 1. The count 1 to 1 and the distance 340 to 253, by class and by rung edit

The landed per-site lists (`explorations/compile-ladder/gate/distance-sites.tsv` at `cec70988b` and at `ec718967a`), read site by site. Each after-site's line was mapped back to the base `9c9e823d5` through a line diff of its library file against `aa07efb31` (whose `Library/` and `ProjectFortress/LibraryBuiltin/` are those of the landing), and both lists were classed with the stage's own `classify.py` at base lines, so that a moved line does not move a site between classes (row 577). Scripts in the scratchpad, `rev10/sites.py` and `rev10/group.py`.

**The count, 1 to 1.** The table is identical to batch 9's (`compile-ladder/climb-batch-10/gate/checker-count.txt`): `FortressLibrary 2`, the `isLeftZero` pair printed twice (row 582, Pavol's), `#crash none`, the shadow matching. No rung declared a move and none occurred.

**The distance, 340 to 253: 91 sites gone, 4 new, 32 still erring with a changed message.**
- By rung edit, on the merged tree:
  - Rung N: 44 gone, 3 new. Item 20's drop cleared all 18 of row 560's first part (`Writer.fss` 8, `FortressLibrary.fss` 6, `FortressBuiltin.fss` 3, `NativeArray.fss` 1), as the record expected. Its 25 repairs cleared OT 12, NM 7, X1 3, I2 2 and I3 1. `List.fss:150` (row 425's class) is respelled at `:146`, its comprehension's parameter now taking `Any`, one gone and one new. The two other new sites are `assert`'s and `deny`'s `if` without `else` (`FortressLibrary.fss:305`, `:323` on the landed tree), item 36's kind, which appear only on the merged tree, where N's half and C's half of the old `:306` and `:316` errors both cleared (by reading: the old sites erred inside those `if` bodies).
  - Rung G: 30 gone (OT 13, NM 9, BR 3, MB 3, GF 2), 1 new: row 632's fused arm (`:1315` at the base, `:1332` landed), uncovered by the repair of the arm's call. Its own tree measured the same 340 to 311.
  - Rung C: 17 gone, none new. Row 563's renaming cleared the four abstract-method sites (`NoReductionPair`'s `generate` and the `+` of `__DefaultVector`, `__DefaultMatrix` and `TransposedMatrix`, D1 4). Row 604's varargs cleared 13: `String.fss`'s seven `assert` and `deny` calls, `Stream`'s `print`/`println` pair (CV 2) and export (X1 1), `List.fss:176`, and the `BIG ||` halves of `:306` and `:316` (BR 2).
  - Rung W: none, and none possible; it edited only paths the stages do not read (FACTS, "The checker-count and distance stages read only the compiler's phases").
  - Row 488's family did not move on the merged tree: no BR site is new. It moved +3 on C's own tree and +3 on N's (new body sites at `FortressLibrary.fss:130`, `:1600` and others), and G's written return types on five big operators removed three of its seats (`rung-generator-slips/REPORT.md` section 9).
  - Arithmetic: 340 − 44 − 30 − 17 + 3 + 1 = 253. The rungs' own trees sum to −83 (C −14, G −29, N −40); those counts carry row 488's moves on C's and N's trees and miss the two item-36 sites, so the merged −87 is the figure.
- By class, at base lines: OT −48, NM −16, BR −5, D1 −4, X1 −4, MB −3, CV −2, GF −2, I2 −2, I3 −1. None of the 32 changed-message sites changed class; ten are row 560's second part reading `Any` where it read `Object`, the rest line numbers inside messages and the two `BIG MIN[\T\]()` calls now naming the one-argument candidate's return type as `T`.
- By kind: abstract-method 12 to 8 (C), typecheck 280 to 201, export 8 to 4 (N 3, C 1); overloading 2, return-type 2 and wellformed 36 unchanged.
- **The stage's class table misfiles five sites again (row 577).** It prints I1 5 to 3, V1 28 to 27 and OT 145 to 100; by site it is I1 5 to 5, V1 28 to 28 and OT 145 to 97. N's 17 lines and G's one above them moved four sites out of `classify.py`'s fixed ranges (base `:3955`, `:3956`, `:3966` out of `ANYINTEGRAL_FL`, `:2714` out of `VECMAT_FL`) and one in (`:3880`, now `:3898`). The stale `TUPLECMP_FL` still files the 18 tuple-comparison sites under OT, so the table shows no G1 row, as in batch 9.
- Crash rows 4 to 3: `Stream`'s variance stage is gone (row 623, fixed by C); the other three are the same declarations at moved lines (rows 620 to 622, item 47).

**What is left of the 253**, each group by its home (`rev10/group.py`; the groups sum to 253):
- The arrays: V1, V2 and Z1 71, the array support, vectors and matrices by line 22, `FortressLibrary`'s two export errors: about 95. The array questions after the switch-over (batch 8's Q4).
- The ranges' 36 under rows 599 to 601 (items 39 to 41), unchanged.
- The self-typed bodies and row 421's slip, S1 and R4 30 (the table prints S1 28 and R4 2): a list of ways and a top-tier judgement first (batch 8's Q2).
- The tuple comparisons and `LexicographicOrder`, 18 (row 634, item 43).
- Row 560's second part, 13: the 11 the record named and the two unmasked above (item 36).
- G's rows: 628 (13), 629 (9, item 45), 630 (2), 631 (1), 632 (1, item 46); and row 627's capture, 6 (G 2, N 4).
- N's rows: `QQ`'s power and `strToFloat` 5 (rows 438, 441, 445), `QQ`'s `ceiling` and `truncate` 2 (row 635, item 44), `AnyList` 4 (row 636), `List`'s export 1 (row 637).
- Row 433's six (`where` clauses), row 425's class 4, `isLeftZero` 2, `String`'s `left` and `right` 2 (row 606, item 42), `String`'s symbolic families 3 (row 585, item 38).
- The three crash rows still hide whatever lies behind `__bigOperator`'s local function and `Array2`'s and `Array3`'s `asString`.

### 2. The cost by role, tokens counted as writes only

**How it was counted.** As `coordinator/process-engineering/labor.md` and `reviews/batch-9-review.md` section 7 count: each of the 21 transcripts under `subagents/workflows/wf_d5ec6194-bcc/`, labelled by `journal.jsonl`; for every assistant message, `cache_creation_input_tokens` plus `input_tokens` of its usage, counted once per message id. Cache reads (570.6M) and output (0.36M) are not counted; with output the total is 6.62M, close to the harness's "about 6.7M" in the boot note. "First call" is the first message's writes, labor.md's fixed start. Agent time is the first to the last timestamp of a transcript; the span is a role's first start to its last end, in UTC. Not counted: the coordinator's session, the base build (P1's `/home/user/fortress-base10`, reused, built before the launch) and this review. Script: `rev10/cost.py`.

| Role | Agents | Writes | Share | First calls | Turns | Agent time | Span (UTC) |
|---|---|---|---|---|---|---|---|
| Worker | 4 | 2,127K | 34.0% | 194K | 889 | 319 min | 05:27-08:09 |
| First skeptic | 4 | 1,192K | 19.0% | 260K | 370 | 92 min | 08:04-08:59 |
| Judge | 3 | 623K | 9.9% | 237K | 123 | 31 min | 08:46-09:17 |
| Repair | 3 | 616K | 9.8% | 203K | 158 | 52 min | 08:59-09:40 |
| Second skeptic | 3 | 510K | 8.2% | 244K | 107 | 17 min | 09:17-09:48 |
| Gather | 1 | 490K | 7.8% | 88K | 184 | 36 min | 09:48-10:24 |
| Merged-diff review | 1 | 425K | 6.8% | 87K | 139 | 19 min | 10:24-10:43 |
| Gate | 1 | 126K | 2.0% | 74K | 42 | 30 min | 10:24-10:54 |
| Commit | 1 | 154K | 2.5% | 79K | 50 | 6 min | 10:54-11:00 |
| **Total** | **21** | **6,262K** | | **1,465K (23.4%)** | **2,062** | **602 min** | **05:27-11:00, 5 h 33 min** |

Per agent, in order of start:

| Agent | Writes | First call | Turns | Agent time | From-to (UTC) |
|---|---|---|---|---|---|
| Worker C | 665K | 77K | 300 | 111.6 min | 05:27-07:18 |
| Worker N | 526K | 39K | 236 | 91.4 min | 05:27-06:58 |
| Worker G | 464K | 37K | 179 | 70.4 min | 06:58-08:09 |
| Worker W | 471K | 41K | 174 | 46.0 min | 07:18-08:04 |
| Skeptic N | 302K | 93K | 90 | 18.0 min | 08:04-08:22 |
| Skeptic C | 318K | 59K | 111 | 24.8 min | 08:09-08:33 |
| Skeptic W | 319K | 52K | 98 | 23.5 min | 08:22-08:46 |
| Skeptic G | 253K | 56K | 71 | 25.3 min | 08:33-08:59 |
| Judge N | 223K | 106K | 39 | 8.7 min | 08:46-08:55 |
| Judge C | 234K | 66K | 49 | 13.5 min | 08:55-09:08 |
| Repair N | 208K | 98K | 44 | 11.4 min | 08:59-09:10 |
| Judge G | 166K | 65K | 35 | 8.4 min | 09:08-09:17 |
| Repair C | 244K | 55K | 86 | 29.9 min | 09:10-09:40 |
| Second skeptic N | 179K | 101K | 29 | 5.5 min | 09:17-09:22 |
| Repair G | 165K | 50K | 28 | 10.8 min | 09:22-09:33 |
| Second skeptic G | 164K | 88K | 37 | 4.1 min | 09:33-09:37 |
| Second skeptic C | 168K | 55K | 41 | 7.6 min | 09:40-09:48 |
| Gather | 490K | 88K | 184 | 35.6 min | 09:48-10:24 |
| Merged-diff review | 425K | 87K | 139 | 19.3 min | 10:24-10:43 |
| Gate | 126K | 74K | 42 | 29.9 min | 10:24-10:54 |
| Commit | 154K | 79K | 50 | 6.0 min | 10:54-11:00 |

- By chain: C 1.63M, N 1.44M, G 1.21M, W 0.79M (no refusal), the tail after the rungs 1.19M. The three refusal chains (judge, repair, second skeptic): N 0.61M, C 0.65M, G 0.49M, 1.75M together, 28% of the batch.
- Ten agents began on a cold system prompt (no cache read on the first call: worker C, skeptic N, judge N, repair N, second skeptics N and G, the gather, the review, the gate, the commit), about 36K each, 0.36M; labor.md's lever, not this batch's practice.
- No cache refill: no message after an agent's first wrote more than 35K; the longest gap between two messages of one agent was 362 s (worker G), with no refill after it.
- Against batch 9 (6.88M, 22 agents, 5 h 44 min): workers 2.69M (about 2.2M without the restart) to 2.13M; first skeptics 1.24M to 1.19M; judges, repairs and second skeptics 1.40M for two chains to 1.75M for three (0.70M to 0.58M a chain); the gather 0.47M to 0.49M; the review 0.42M to 0.42M; its judge and repair 0.39M to none; the gate 0.13M and the commit 0.15M, the same.
- The record estimated 6M to 7M, 14 to 18 agents and 6 to 9 hours (`coordinator/CLIMB-BATCH-10.md` section 1, "Cost"): 6.26M, 21 agents (three refusals), 5 h 33 min.
- The figure the study compares against (`coordinator/process-engineering/README.md`, pending item 3): the two first designs estimated about 5.2M and 4.3M, the two blind ones about 7.1M and 3.3M, each for the same four pieces.
- Two slots: 602 agent-minutes over two agents at a time is 5 h 1 min at best; the run took 5 h 33 min. The tail runs one agent at a time for about 53 minutes (the gather, the gate after the review, the commit); the queue's order otherwise cost little. C's skeptic waited 51 minutes for a slot (07:18 to 08:09) while W's and G's workers ran, and C's chain then set the landing.

### 3. Builds, suites, stages, by role, against batch 9's before

Counted from the 21 transcripts: every `ant compileAll`, whole-suite run and stage run launched, with its time and the code it ran on. Batch 9's before is `reviews/batch-9-review.md` section 2.

**Builds (`ant compileAll`): 11, one of them of code already built.**
- The base build: none. P1's `/home/user/fortress-base10`, built before the launch at `cec70988b`, whose code is the base's, seeded every worktree.
- Rung C: 4 (05:50 1 min 49 s, 05:57 2 min 18 s, 06:04 57 s, 06:43 1 min 4 s), each after a new edit. Its repair round: 1 (09:13, 24 s), on new code.
- Rung W: 4 (07:34, 07:36, 07:38, 07:48; 58 s to about 80 s), each after a new edit; the 07:36 build was a deliberate logging variant that listed every library type the new check would refuse, then was reverted. A background build W launched at 07:34:19 was refused by a safety check and never ran, so W's foreground build six seconds later built nothing twice.
- Rungs G and N: 0 (library only). Every skeptic, judge and second skeptic: 0.
- The gather: 1, the merged tree in a seeded worktree (51 s). The gate: 1 (48 s and the library order) on `aa07efb31`, the same code: the batch's one build of code already built, as in batches 8 and 9.
- About 13 minutes of compile in all, against batch 9's 20.

**Whole-suite runs: 7, none on a code state already run.**
- Rung W: the interpreter corpus twice, four shards: on `f0cef8d83` (one failure, the team's `disp0`, which led to the inheritance reading) and on `c3d077fa9` (509 tests, green). The record allowed one.
- Rung C: the compiler and library tracks three times: on `eb9161c30` (1,027 and 86), on `4d19d17a1` after its export edit (1,031 and 86), and in the repair round on `08cd4b4d0` (1,037 and 86). The record allowed one per pass; the skeptic noted the second.
- The gate: `testFast` (11 min 11 s) and `testSystem` (3 min 46 s), once.

**Stage runs.**
- Full runs (count and distance together), each on its own code state: C twice (`eb9161c30`, distance 1,387 s, 327; `4d19d17a1`, 1,517 s, 326), N twice (`cf5ba000f`, 1,316 s, 314, which found two defects; `7f2495cc2`, 1,410 s, 300), G once (`acb36225c`, 1,228 s), the gate once (1,252 s). W none. No repair round ran a stage (both judges' decisions), and no skeptic did.
- **One partial run repeated measurement, against the prefix line built for it.** G ran its own copy of the distance driver on `FortressLibrary.fss` alone (734 s, 07:24) on the code the full stage measured at 07:41; its report says so. `climb-batch-workflow.js:1039`, added at `2360baf6c` from batch 9's finding 4, forbids exactly this. In the two-slot schedule G's 12 minutes delayed C's skeptic, the head of the chain that set the landing, by about 5 minutes: had G ended at 07:57, N's skeptic would have taken that slot and C's would have started at 08:04 when W's worker ended.
- In all about 147 minutes of the machine in distance runs: the rungs' five full runs 114 minutes, G's partial 12, the gate 21; C's and N's first full runs (45 minutes) were development runs on code that then changed, which the prefix allows.

**The skeptics built nothing and checked out nothing.** Each ran its own programs in the rung's worktree for the new code and in the rung's private copy of the base for the old; N's and G's skeptics seeded theirs (2 s each), W's and C's used the copies their workers seeded. C's and W's skeptics compiled their own programs on the compiled path, which the rule allows. Each read the worker's order of work in its transcript with `jq`.

**Long log reads: none.** No agent read a whole build, suite or stage log; the largest tool results were briefings, reports, diffs and the ledger's new rows (up to 45K characters).

**Against batch 9's before, in one list.**
- Builds 16 to 11; of code already built 1 to 1; no base build (P1's reused).
- The gate once, both batches; no second gate, no review repair.
- Partial stage runs on final code: two rungs, about 20 minutes, to one rung, 12 minutes, now against a written rule.
- Refusals 2 to 3; second skeptics 0.19M and 0.20M to 0.16M to 0.18M, 4 to 8 minutes each.
- The review's judge and repair, 0.39M, to none: the review found nothing blocking and fixed its six record findings itself (`c14bbce87`, explorations only, so the running gate stood).
- No restart, no cache refill.

### 4. The three refusals

**Rung N: a real defect of the rung's change.**
- The first pass moved `shouldRaise`'s "nothing raised" signal to `throw ForbiddenException(TestFailure)` inside the `try` whose `catch` takes `Ex`. So `shouldRaise[\Exception\]`, `[\UncheckedException\]` and `[\ForbiddenException\]` of an expression that raises nothing caught their own signal and returned normally: a test helper that should fail passed. On the base the same calls stopped with a `ClassCastException`. The skeptic measured it (`SkShouldExc.fss`), and the judge found the precedent the rung missed, the specification's own `ensureApplicationFails`, which decides after the `try` (`Specification/basic/tests.tex`, section "Other Test Constructs").
- The repair decides by the `try`'s value and throws after it (`Library/FortressLibrary.fss:336-345`); `ShouldRaiseNoExceptionWalk.fss` gained three assertions, failing first at 09:00:43 and committed alone (`af05bdf69`).
- Cost: judge 0.22M, repair 0.21M, second skeptic 0.18M, 0.61M, 36 minutes. It kept a silent pass out of the library's test helper.

**Rung C: a real defect of the rung's change.**
- The first pass bound a varargs parameter to the team's `ImmutableArray[\T, ZZ32\]` and guarded only a declared function's body. Under the compiled library, which declares no `ImmutableArray`, a contract or a function expression that used the parameter crashed the checker, "Not in the trait table: CompilerLibrary.ImmutableArray", where the base gave an error; against the record's "A crash is never the checker's answer" (`CLIMB-BATCH-10.md:144`).
- The judge moved the refusal into the `VarRef` rule, the one place a variable's type is read (`impls/Misc.scala:628-639`), which covers every binding site and makes the four refusal tests depend on the binding (J1). The repair also opened the skeptic's four measured defects with home-2 tests (rows 624 to 626 and 620's third form).
- Cost: judge 0.23M, repair 0.24M, second skeptic 0.17M, 0.65M, 53 minutes (08:55 to 09:48), the last 11 of them after every other chain had ended (09:37). It is content risk (a) below.

**Rung G: real, and no code.**
- The edit repaired six declarations that stopped walk on the base; the gated test asserted five. The sixth, `FilterGenerator2.theorems`, stopped with "Generic instantiation (size) mismatch" on the base and answered `1` on the head. The skeptic also found a false sentence ("no value walk prints for a completing run changes": `MIMapReduceReduction` on an ill-typed program) and the getter sibling count.
- The repair added one assertion (`GeneratorDeclarations.fss:93`), ran the harness once and corrected the report; it changed no library line.
- The script made it a refusal: "the test does not test it" is a refusal ground (`climb-batch-workflow.js:1268`), and the prefix's first home asks the assertion before the second skeptic (`JUDGE.md` section 1). The skeptic had already measured the program both ways, failing on the base and answering on the head, which is what the gather does for each test it places (it placed ten this batch, each run on the merged tree and on a stand-in).
- Cost: judge 0.17M, repair 0.16M, second skeptic 0.16M, 0.49M; about 2 minutes of the critical path (repair C waited 2 minutes for a slot G's judge held). As a required correction the gather would have spent, by this review's estimate, under 0.1M.

### 5. The two content risks the blind designer named

The blind design with six implementers (`coordinator/process-engineering/design-batch10-blind-*.md`, committed at `f7d66bcd4` at 08:26, from the content brief alone; no agent of the run saw it) named two risks for the post-batch review (`process-engineering/README.md`, pending item 1). Both held, and both were met by the way the designer proposed.

**(a) Row 604's positive compiled varargs test needs `ImmutableArray`, which the compiler's prelude does not declare.**
- The landed positive tests do not run compiled, and none uses the parameter. `VarargsNoTrailingArgument`, `VarargsArgumentCounts` (none to six varargs arguments), `VarargsNumeralArguments`, `VarargsMethodCall`, `VarargsExportMethod` and `VarianceVarargsMethod` are `typecheck` tests: the harness runs `fortress typecheck` only (`FileTests.java:1161-1176`), so they assert applicability and stop before code generation.
- Code generation refuses every varargs function: "Can't compile VarArgs yet" for a function (`XXXVarargsCodeGeneration`) and an `OptionUnwrapException` for a trait method (`XXXVarargsMethodCodeGeneration`); row 624.
- A program that uses the parameter is refused under the compiled library with a message naming the type, "The varargs parameter rest is used, whose type ImmutableArray[\ZZ32,ZZ32\] the libraries do not declare." (`impls/Misc.scala:628-639`), in a body, a contract or a function expression: four expected failures keyed on that message (`XXXVarargsBodyIterates`, the specification's own kind of program; `XXXVarargsParamNotItsElement`; `XXXVarargsContractUse`; `XXXVarargsFunctionExpressionUse`). Because the refusal's condition is the binding's type, these four hold the binding, by reading (JUDGE J1).
- The body typed as the sequence is shown only under the one library, which declares `ImmutableArray` (`Library/FortressLibrary.fsi:1548-1550`): by the distance, whose 13 varargs sites cleared. No passing test holds it.
- So the compiled path refuses programs the text allows, until the switch-over; the specification's box says so (`Specification/basic/functions.tex:183-195`), row 604's status names the open part (`c14bbce87`), and it is on Pavol's list ("Under the compiled library, which declares no `ImmutableArray` ..."). The designer's proposal was the same: hold the third face by a `compile_err_contains` test of `k(rest: String...): String = rest` and report the blocker.
- The record did not see it. It named the team's `ImmutableArray` for the parameter and asked C for "a varargs parameter used as a sequence in its body, the program the specification's examples allow" as a passing test (`CLIMB-BATCH-10.md`, rung C, "The test, first"), without checking that the compiler's library declares the type. C's worker met the wall on its first test run on the edit (about 05:55); its partial guard is what the refusal was about.

**(b) W's new load check has the shape of `String`'s `||`, `|||`, `//` and `///` families, which must keep loading.**
- They keep loading. W's check reads only the names the compiled checker reads, `checkedName` beside `isDeclaredName` (`interpreter/evaluator/values/OverloadedFunction.java:1176`, `:1237-1241`; `OverloadingChecker.scala:650-653`). `NodeUtil.validOp` admits a name of capitals and underscores and eight words (`NodeUtil.java:1463-1483`): `||` and `//` fail its doubled-character test, `|||` and `///` its character test. So every symbolic operator is skipped, as the checker skips it (row 584).
- Measured, not only read: W's suite run on its final code had 509 tests green and no library type or team test refused at load (`rung-walk-meet/REPORT.md` section 5.2); the gate's `testSystem` is green at 516.
- Without the skip the check would still not pair the four families' own `(a:Any, self)` and `(self, b:Any)` declarations, which sit in one type with self at different positions; the check pairs declarations of different providers with self at one position. W's logging build at 07:36, which read every name over the whole library (`bin/fortress Hello.fss`), listed five refusals and none of those pairs.
- **W's provisional row on the five library symbolic-operator sites** was W-b, now **row 611**: walk's and the checker's Meet Rule checks skip symbolic operators, and over them the rule breaks at five library sites, `EmptyString`'s own `opr ||(self, String)` beside `Concatenable`'s `opr ||(self, EmptyString)` with no declaration on their meet (`Library/String.fss:275-325`, `:33-37`), and `|self|` in `CompactFullRange2D` and `CompactFullRange3D`, each provided from `CompactFullRange` and from `FullRange2D`/`FullRange3D` and `DelegatedIndexed` with none of their own (`Library/RangeInternals.fss:1130-1156`, `:1161-1190`; the logged list has four lines for these two objects). The rung gave it home 3, the row alone; its skeptic showed a user-level program can hold it, and the gather placed `tests/XXXFunctionalMethodMeetOperator.fss` (`load_exception_contains=Invalid overloading of ||`, red on a stand-in). Its repair waits on item 38 (row 585), whose PLAN entry now names all five sites.
- The record anticipated this one (its W section: the checker "has never judged `String`'s four symbolic families ... by this rule", and a library type refused at load is a stop); the designer proposed the same skip.

### 6. The tail: gather, review, gate, commit

- **The gather** (0.49M, 36 minutes) applied N, G, W, C with no conflict, re-anchored the citations later rungs moved, made W's six required corrections itself, placed ten tests (rows 610, 611, 615 to 619, 627, 637), each run on the merged tree and on a stand-in, and mapped 51 item ids to PLAN entries with none unrouted.
- **The merged-diff review** (0.42M, 19 minutes) found no blocking code, fixed six record findings in `c14bbce87` (ledger pipes, row 604's status, row 488's note, two FACTS sentences, a PLAN entry), and routed one item (row 463's owed compiled test, PLAN review-routed.1). Batch 9's 0.39M judge-and-repair loop did not recur; no specification sentence was wrong this time, so batch 9's measure 2 was not exercised.
- **The gate** ran once, green, and its tables are the "after" above.
- **The commit** (0.15M) filled 26 hash placeholders, copied the gate's outputs, wrote FACTS' landed figures (batch 9's finding 6, now built: FACTS' "The true distance to the switch-over" reads 253), rebuilt the specification and pushed.
- **The two microGPT programs under walk were never run.** The commit role's step 4 (`climb-batch-workflow.js:2161`) starts `explorations/coordinator/tools/mg-run.sh` in the background for "the landing report or the post-batch review" to read; a safety check refused the command because the script runs `rm -rf` on its private cache directories (`mg-run.sh:16`). The commit agent said so in its result and did not route around it. `tmp/gate-batch-10/microgpt-walk.txt` does not exist, and the boot note written after the landing (`e7462efb7`) does not carry it. Batch 9's commit stage ran both, 40 of 40. Batch 10's library edits (N's numbers, orderings and `List`; G's generators and reductions) are the kind the model's walk run is there to catch, so this is the one check of the landed tree still owed. This review was told to run no stage and did not run it.

## Part 1. Conformance

### Method

As in `reviews/batch-9-review.md`: for each rung, `git show` first; then its `REPORT.md`, `SKEPTIC.md`, `JUDGE.md` (W's decision record); then the record's section for it (`coordinator/CLIMB-BATCH-10.md` sections 1 and 3); then the gather's `climb-batch-10/RECORD.md` and the journal's results; then the landed code on `main`. Three standards, kept apart: the specification (with the 2012 Types chapter where it speaks), the team's built intent, and the decisions on record (POSITIONS, PLAN). What the skeptics, judges, gather and review found is cited, not repeated. Claims marked "by reading" were not run.

### The verdicts

- **Rung W, walk's Meet Rule for functional methods, the naked `Any` and a parameter bounded from above: in the spirit**, with its scope narrowed as the checker's (symbolic operators, generic providers, object expressions), one stop met (row 612) that is not on Pavol's list, and its "provides" read by the traits chapter where the checker reads every supertype.
- **Rung C, the compiled checker's defects: in the spirit after its refusal.** The varargs type is the team's, and under the compiled library every use is refused with a message, listed; three crash rows traced and left for item 47.
- **Rung G, the generators, `Maybe` and the reductions: in the spirit.** Six walk stops now answer, one ill-typed program now refused, both listed.
- **Rung N, the numbers, orderings, `List` and natives, with item 20's drop: in the spirit, made so by its refusal.** The drop is the team's text byte for byte; three walk values changed by repairs of named sites, listed.

### Rung W, `833420ce4`

**What landed.**
- `OverloadedFunction.FunctionalMethodMeets` (`interpreter/evaluator/values/OverloadedFunction.java:1144` on) run from `BuildEnvironments.checkComprisesClauses` (`BuildEnvironments.java:1071`, `:1206`) over every trait and object without static parameters of every component: two functional methods of one name from different providers, self at one position, neither below the other nor excluding, need a provided declaration on the meet or provided declarations that cover it. "Provides" is the traits chapter's inheritance, an `override` overriding what is below it.
- `finishInitializingSecondPart` refuses an overloaded single parameter written bounded by `Any`, in the checker's words (`OverloadedFunction.java:257`).
- `EvaluatorBase.boundedOnlyAbove` (`:202`, called at `:450`, `:783`): a type parameter the declared parameter types mention only in arrow domains an odd number deep takes its interval's upper end where the lower is `BottomType`.
- The D5 pin (`tests/InferLoneBoundMentionsParamWalk.fss`, row 613); the inference box, the reductions callout and two Appendix I entries in the S1 form; 13 interpreter and 7 compiled test files added and three expected failures promoted, the gather's among them.

**Standard 1.** The Meet Rule for Functional Methods per providing type and its covering declarations follow `Specification/advanced/overloading.tex`, section "Meet Rule"; "provides" follows `basic/traits.tex`, section "Method Declarations", which makes walk accept the team's `disp0`, where the checker refuses it (row 610). The naked `Any` is a written `Any` only, as the callout states. Row 588 takes the intersection of the upper bounds, the chapter's and the paper's rule. Where walk still departs, each case has a row and a gated test: a bound mentioning another parameter keeps `BottomType` (row 612), two upper bounds walk cannot meet fail with a unification error (row 616, a pre-existing sibling the skeptic measured), object expressions are not checked (row 618), symbolic operators are skipped (row 611).

**Standard 2.** The devices are the team's: `overlapPieces` and `someBelow` for the cover, `checkBoundAny`'s condition, `isDeclaredName`'s names, the bounding interval's upper end as `MakeInferenceSpecific` clamps a contravariant parameter. The team's object-level check in `Constructor.finishInitializing` was not extended; the gather's reading says why it could not serve (self dropped, no trait).

**Standard 3.**
- "Conversions never change which declaration runs": no set walk loads today runs another declaration. The rung's own test asserted walk's numeral departure as the text's answer; corrected at the gather and listed (the numeral entry).
- The stop "a parameter nothing fixes bound to anything but its declared bound" was met on part of the work (row 612, and row 591's form `co2B`), reversible, in the review's `stopsMet`, and not in "Climb batch 10, listed for his review" (Part 3). N's and G's stops met are there.
- Decision W2 (the equal-parameter clause read at self's position) and the reading of "overridden" (row 615, a diamond walk now refuses, as the checker does) are listed.
- No library type and no team test refused at load: held (section 5).
- P1 was not answered before the launch, and its half was not built, as the answers line said.

**Verdict: in the spirit.** The rule is built where the text is clear and the checker's scope is shared on purpose; one stop met needs its line on Pavol's list.

### Rung C, `aa07efb31`

**What landed.**
- Row 563: the abstract-method checker renames an inherited method's own static parameters apart (`AbstractMethodChecker.scala`), rung O's device.
- Row 593: the solver takes a bound mentioning another variable at that variable's solution (`Formula.scala:561-583`), a self-mentioning bound still left out.
- Row 604: applicability by the expansion rule, the varargs slot in the arrow's domain (`STypesUtil.scala`), the binding `ImmutableArray[\T, ZZ32\]` (`STypeEnv.scala:184-186`), the refusal in the `VarRef` rule, the export check's varargs slots, a dotted varargs call in `FnNameInfo.java`.
- Row 605: fields bound over inherited methods in object declarations and expressions. Row 574: the message without self at its position (the overloading checker's only change). Row 597's checker half: object expressions read against every closed trait above them (`TypeHierarchyChecker.scala:62`, `:66-99`). Crash 4: the variance stage reads a varargs parameter (row 623).
- `Specification/basic/functions.tex`'s box and Appendix I's "The type of a varargs parameter"; the closed-trait Effect extended; 47 compiled test files added and four expected failures promoted.

**Standard 1.** Each row follows its section: `traits.tex` "Method Declarations" (563), `inference.tex` "The Static Arguments of a Call" (593), `functions.tex` "Function Applications" and `overloading.tex`'s varargs expansion (604), `objects.tex` "Field Declarations" (605), `traits.tex` "Trait Declarations" (597). The text's `HeapSequence[\T\]` is kept with a box; both implementations give `ImmutableArray`, which no compiler library declares, so the compiled path refuses programs the text allows (section 5). The three local-function crashes stay crashes: the text leaves the inference of omitted types undescribed, and giving them row 405's refusal is the record's reserved stop, now item 47.

**Standard 2.** The team's own `makeVarargsParamType` and its TODO, `signal` then `return expr` as the function-expression rule refuses, `everyKnownSubtypeListed`'s reading for object expressions, rung O's renaming.

**Standard 3.**
- "The type group's late positions outweigh the early text" for the type; "The library route.": nothing added to the compiler's prelude.
- No overloading rule, positional rule or coverage check changed: `OverloadingChecker.scala`'s diff is row 574's message alone.
- Nine files beyond the section's list, each where its defect sits (listed; the judge did not read them as a stop).
- Row 625, row 563's dependent-bound sibling, left by the judge's decision J2 for a rung that may edit the overloading checker, listed.

**Verdict: in the spirit after its refusal.**

### Rung G, `a9b9933e6`

**What landed.** 30 one-off slips of the generator support, `Maybe`, the reductions and the generators of generators repaired in the library's spelling (`__whileCond`, `__cond`, `Condition`'s defaults, the eight unary big operators' api return types, `MIMapReduceReduction`'s `z:R`, `SimpleMappedIndexed.ivmap`, `NestedGenerator.reverse`, `FilterGenerator2.theorems`, `relationalPredicate` among them); `GeneratorDeclarations.fss` asserts today's values and the six repaired stops.

**Standard 1.** Each slip is a declared type, static argument or getter call that the text and the api settle: getters by field access (`traits.tex`, "Method Declarations"), a function applying only to arguments of its parameter types (`functions.tex`, "Function Applications") for `MIMapReduceReduction`.

**Standard 2.** Each repair names its library precedent (`REPORT.md` section 5). The five big operators' return types were taken from the api.

**Standard 3.**
- "The library's own practice", "`Maybe`'s empty case" (row 433's six left for `where` clauses), answer 7 (the identities' fallback left, row 630): held.
- The stop on walk's values met by six stops now answering and one ill-typed program now refused; the judge kept both, listed.
- Two sites left because only the checker can repair them (row 627), listed; `__bigOperator2`'s fused arm left for Pavol (item 46).

**Verdict: in the spirit.**

### Rung N, `a1b5c253d`

**What landed.** Item 20's three bounds back to the text before `de22fd928` (`fail`, `builtinPrimitive`, `List`'s nullary comprehension); `MatchFailure` unchecked (row 590); `StridedFullRange3D`'s shifts (row 602); 25 slips: `assert` and `deny` reading an `Any` by a named `typecase`, `shouldRaise` deciding after its `try`, `simplestRationalBetween`, `Integral.even`, `NN64.signed`, `partition` over `ZZ32`, `__thrower`, `List`'s api and bodies, `FortressBuiltin`'s and `Writer`'s exports.

**Standard 1.** Row 590 follows `typecase.tex` and the compiler library; row 602 `objects.tex`; `shouldRaise`, which no section names, follows the specification's `ensureApplicationFails` after the refusal.

**Standard 2.** The drop is the team's text byte for byte; `typecase` reading an `Any` as `cast` does; `ForbiddenException` with a chain as `throw.tex` requires.

**Standard 3.**
- Pavol's answer on item 20, built; the 18 sites cleared as expected; row 560's second part now reads `Any` and grew to 13 on the merged tree (section 1).
- "The implicit bound of an unbounded type parameter is `Any`": `assert` and `deny` keep `x: Any`.
- "Scalar ranges are over `ZZ32` only" makes `partition` at a `ZZ64` refused where it answered.
- The stop on walk's values met three times (`shouldRaise` with nothing raised, `assert` and `deny` on non-objects, `partition` at `ZZ64`), kept by the judge on a tension inside the record (`CLIMB-BATCH-10.md:244` against `:230`, `:232`), listed.
- The tuples' comparisons left rather than bounded, since a bound refuses what walk compares today (item 43).

**Verdict: in the spirit, made so by its refusal.**

### The global questions

- **What "go" promised, against what landed** (`CLIMB-BATCH-10.md` section 1, "What 'go' commits you to"):
  - Rows 544, 534 and 588 close: held. Row 424 under P1: not built, as P1 did not land in time.
  - Rows 563, 593, 604, 605 and 574 close, 597 half, four crash rows get rows: held; row 604 with its open part under the compiled library; the crashes are rows 620 to 623, one fixed.
  - Rows 560 (first part), 590 and 602 close: held, and 345, 439 and 469 with them.
  - No model line, team test line or rule of the specification changes: held. Every test file changed is the revival's (76 added, nine promoted, one link test re-keyed); the specification changed in the named boxes, the callout and Appendix I.
- **Built twice.** No: W is walk's, C the checker's, G and N the library's disjoint sections; the review confirmed no declaration shared.
- **The library's way.** Yes in G and N; the team's own devices in W and C.

### Findings

Ranked by what they cost or risk next. Each gives its home.

1. **The two microGPT walk runs did not run, and nothing carries them.** Severity: the landed library edits have no model check (section 6). Home: the coordinator runs them now on `ec718967a`; the commit role's step 4 (`climb-batch-workflow.js:2161`) gives `mg-run.sh` a form the safety check allows (its `rm -rf "$C" "$T"` at `:16` on fixed paths it creates, or no removal), and a step the commit agent cannot run becomes a held item the landing report names.
2. **A skeptic refuses for a test-only finding the gather could close.** G's refusal cost 0.49M for one assertion and text (section 4). Severity: about 0.4M per such refusal. Home: the skeptic's refusal grounds (`climb-batch-workflow.js:1268`): an assertion missing from the rung's test for a repair the skeptic itself measured both ways (stopping on the base, answering on the head) is a required correction, written by the gather on the merged tree and shown red on a stand-in, as it did for ten tests here. It moves an assertion past the second skeptic, so it is Pavol's to allow (POSITIONS, "Test first, the test kept.").
3. **The record named a type for the compiled path without checking the compiler's library.** Severity: C's refusal, 0.65M, and the record's rung C test list asked for a passing test that cannot pass. Home: the manual's "Preparing a batch record": every type the record names for the compiled path is grepped in `Library/Compiler*.fs?` and `ProjectFortress/LibraryBuiltin/Compiler*.fs?`. The blind designer found it from the content brief.
4. **A partial stage run on final code, against the written rule.** G, 734 s, about 5 minutes of the critical path (section 3). Home: the prefix's line (`climb-batch-workflow.js:1039`), narrowed for a library rung whose test is the stage (`testIsStage`): no development run of the driver at all; the full stage once after the last edit.
5. **A stop met is missing from Pavol's list, and six new rows have no PLAN line.** Part 3. Home: PLAN, "Climb batch 10, listed for his review", and the checker and library lines; the gather's step that maps items to entries reads `stopsMet` too.
6. **Row 560's second part is 13 sites on the landed list, not the 11 its note says** (section 1). Home: row 560's note and item 36's text.
7. **The class table misfiles five sites and hides G1** (row 577, batch 9's measure 5, unbuilt). Home: the tools line on row 577, before batch 11's record is drafted class by class.
8. **Phase 3's lines and the handover are stale.** Part 3. Home: PLAN phase 3 and the handover's first section.

## Part 2. Process measures

### What a batch commits

- The Fortress change: 17 source files (3 of walk, 11 of the checker's Scala, `Types.java`, `NodeUtil.java`, `FnNameInfo.java`), 8 library files, 4 specification files and the rebuilt PDF, and 76 test files added (16 in `tests/`, 60 in `compiler_tests/`; 44 of them `XXX`), nine expected failures promoted to plain names, one link test re-keyed.
- Beside it: 12 reports (four `REPORT.md`, four `SKEPTIC.md`, three `JUDGE.md`, W's decision record), the gather's `RECORD.md`, the gate's tables and the per-site list.
- Four live records edited: FACTS, PLAN, the ledger (rows 610 to 639 opened, 13 rows closed and row 623 opened fixed) and the handover's batch paragraphs.
- Nothing else: no capture, log or probe. Tests are named by topic.

### Test first, read from the transcripts (the skeptics' checks, confirmed)

- Rung W: the three promoted tests and three new ones failing on the base at 07:30, committed alone (`d365bbd06`, 07:31:08), the first edit at 07:32:45.
- Rung C: 16 tests failing on the base at 05:43:56, committed alone at 05:44:20, the first edit at 05:44:49. `XXXVarargsBodyIterates` came with the edit commit and never ran on the base; `InheritedAbstractOperatorTraitParamSameName` was written after its fix and seen failing in the base copy first; both corrected in the report.
- Rung G: the test failing on the base library at 07:21:55, committed alone (`bb9e71cda`, 07:22:21), the edit after.
- Rung N: the two promoted tests failing at 05:28:47 and the `shouldRaise` test at 05:47:07, each committed alone.
- The repairs: C's four tests failing at 09:12:37, committed alone (`76dda233a`) before the edit; N's three assertions failing at 09:00:43, committed alone (`af05bdf69`) before the library edit; G's assertion committed alone (`afaa4afb6`), its failing run the skeptic's.

### Misses, by kind

Numbered on from `batch-9-review.md`'s 271. "Found by" names the first to catch it.

Found inside the batch:
- **The change wrong.** 272, N's `shouldRaise` passing silently (skeptic N); 273, C's binding crashing the checker in contracts and function expressions (skeptic C). Repaired before landing.
- **A new rule's effect on a sibling path.** 274, W's first reading of "provides" refusing the team's `disp0` (worker W, its suite run); 275, W's check over symbolic operators refusing five library sites (worker W, row 611); 276, W refusing a diamond override (skeptic W, row 615); 277, C's row 604 unmasking a varargs trait method's code-generation crash (skeptic C, row 624); 278, G's `z:R` refusing an ill-typed program walk ran (skeptic G); 279, N's three walk value changes (skeptic N); 280, C's renaming leaving a dependent bound captured (skeptic C, row 625).
- **The team's own code, found by the rungs' probes.** 281, the checker's "provides" (row 610, worker W); 282, its cover counting self (row 617, skeptic W); 283, its dotted naked `Any` (row 619, skeptic W); 284, walk's object expressions (row 618, skeptic W); 285, walk's two upper bounds (row 616, skeptic W); 286, walk's override in a trait (row 614, worker W); 287, the method-invocation capture (row 627, workers N and G); 288, the export check's private abstract member (row 637, worker N); 289, a typecase arm naming an undeclared type (row 626, skeptic C); 290, the third local-function crash (row 620, skeptic C); 291, getters invoked with `()` (row 633, skeptic G); 292, `__whileCond` missing from the compiled prelude (row 463, skeptic G); 293, the bare `throw ForbiddenException` (row 638, worker N); 294, `AnyList`'s readings (row 636, worker N); 295, the tuples and `QQ` (rows 634, 635, worker N); 296, the reductions' devices and the `Generator`'s size (rows 628 to 632, worker G).
- **A premise of the record that does not hold.** 297, the compiled library declares no `ImmutableArray` (worker C); 298, the record's stop on walk values in tension with its own directions (judge N) and silent on ill-typed programs (judge G); 299, the record's list of text made false missing Appendix I's "Passages not yet revised" sentence (skeptic W); 300, row 433's note that `Generator2Test` takes the fused path (skeptic G).
- **Text or a record claiming more than the paths do.** 301, W's box and Effect on two upper bounds, its "no code implemented the object level", its numeral test (skeptic W); 302, G's "no value changes" and "five stops" (skeptic G); 303, C's body-type test asserting the guard (skeptic C); 304, FACTS' crash count, row 604's status, row 488's note and FACTS' residue list (the review).
- **Test first.** 305, C's two tests above (skeptic C).
- **Provenance and citations.** 306, N's `:253` line and two test messages, C's `:19`, `:184-186` and `TypeDisambiguator` lines (skeptics N and C, second skeptic C).
- **Process.** 307, G's partial stage run (skeptic G); 308, C's tracks and stages twice (skeptic C); 309, the harness refusing report writes again (N's worker, skeptic and judge; the repairs' reports); 310, unescaped pipes in three ledger rows (the review).

Found by this review:
- 311, the microGPT walk runs not run and carried nowhere (section 6).
- 312, G's refusal for a test-only finding (section 4).
- 313, W's stop met missing from Pavol's list; rows 612, 616, 619, 624, 636 and 638 without a PLAN line (Part 3).
- 314, row 560's second part at 13 sites, not 11 (section 1).
- 315, the class table's five misfiled sites and hidden G1 (section 1).
- 316, PLAN phase 3's stale lines and the handover's first section (Part 3).

### Against the earlier notes

- **Found inside the batch** (272 to 310): 39 in 4 rungs, 9.75 a rung, against batch 9's 31 (7.75) and batch 8's 30.
- **By kind:** the team's own code 16, a new rule on a sibling path 7, text or record 4, a premise 4, process 4, the change wrong 2, test first 1, provenance 1.
- **Who caught them:** first skeptics 24, workers 12, the review 2, judges 1. The second skeptics, confined to the repair, found nothing new but two citations.
- **Landed.** No wrong value. Known costs landed as rows and listed: the compiled refusal of every varargs use, the skipped symbolic operators (row 611), walk's departures (rows 612, 616, 618), N's three and G's seven walk value changes.
- **Severity.** Nothing touches a line of the model or blocks the switch-over. The worst caught in the tree were 272 and 273. The worst still open is the model run not made on the landed tree (311).

### Re-measuring what the record held

- No rung ran a stage on the unchanged base; C, G and N took batch 9's landed tables as their before; W ran none.
- Every whole-suite run was on a new code state; two rungs ran their one allowed run twice by editing after it.
- The repeats were G's partial run and the gate's build of the gather's code.

### Measures the evidence supports, each with its cost

1. **The commit stage's model check made runnable, and a refused step named in the landing report.** Evidence: section 6. Cost: one script line and one line of the commit role.
2. **An assertion the skeptic measured both ways becomes a required correction the gather writes.** Evidence: section 4. Cost: a sentence of the skeptic's role; Pavol's word, since the assertion lands after the second skeptic. Saves about 0.4M per such refusal.
3. **A record greps the compiler's library for every type it names for the compiled path.** Evidence: section 5 (a). Cost: one grep per rung while the record is prepared.
4. **A library rung whose test is the stage runs no development driver.** Evidence: section 3. Cost: one sentence of the prefix. Saves about 12 minutes of the machine.
5. **The gather lists every `stopsMet` entry for Pavol and opens a PLAN line for every row it opens.** Evidence: Part 3, as in batch 9's Part 3. Cost: one step of the gather.
6. **`classify.py` by declaration** (row 577). Evidence: section 1, twice now. Cost: a tool change, before the next record.

Batch 9's measures, as this run shows them: 1 (narrowed refusal grounds) worked for W, approved with six corrections the gather made, where batch 9's W was refused for the same kind of findings (about 0.7M then, none now), and not for G (measure 2 above); 3 (the text a change makes false) caught most and missed one sentence, which W's skeptic found and the gather fixed without a loop; 4 (no partial run) was broken once; 6 (FACTS' figures) worked; 2 and 7 were not exercised; 5 is unbuilt.

**What the batch spent against what it changed.** 6.26M written and 5 h 33 min bought walk's Meet Rule for functional methods per providing type and the naked-`Any` restriction at load (rows 544, 534), a parameter bounded from above at its bound (row 588), the compiled checker's six defects of batches 8 and 9 (rows 563, 593, 604, 605, 574, 597's half) and `Stream`'s variance crash, item 20's drop (row 560's first part), rows 590, 602, 345, 439 and 469, 55 library slips repaired in the library's own spelling, eight declarations that stopped walk now answering (G's six, row 602's two shifts), 76 new test files, and the distance 340 to 253, with no model line, team test line or overloading rule changed. It also opened 30 rows (610 to 639), left the compiled path refusing every use of a varargs parameter until the switch-over, and changed ten walk values, all listed. About 0.4M (6%) went where a cheaper route existed by this batch's own rules, G's refusal, against batch 9's 1.3M (19%); C's 0.65M followed from a premise the record did not check, and how much of it a grep would have saved is not measurable. The repeated machine time fell from about 23 minutes to about 13 (G's partial run and the gate's build).

## Part 3. Routing

Checked against `main` at `e7462efb7`, whose `PLAN.md` and ledger are those of the landing.

**Items for Pavol.** The gather mapped 51 item ids to PLAN entries (the journal's `pavolItems`; with the review's, 34 entry names, a few naming one entry two ways), `pavolUnrouted` empty; the review added review-routed.1. I read each named entry: items 43 to 47 (`PLAN.md:242-252`), item 38's sentence on row 611 (`:230`), the D5 entry with row 613 (`:536`), the rung T entry with N's two sites (`:342`), and the 24 entries of "Climb batch 10, listed for his review" (`:563-590`). Every one is there. Missing:
- **W's stop met**, "a parameter nothing fixes bound to anything but its declared bound", on row 612 (and row 591's form): in the review's `stopsMet`, lifted by POSITIONS, and on no list for Pavol, where N's and G's stops met each have an entry. W's report put it under "Stops" and not under "For Pavol", and the gather mapped only the report's own items.

**Rows the batch opened, 610 to 639.**
- In PLAN's entries or items: 610, 611, 613, 614, 615, 617, 618, 620, 621 and 622 (item 47), 625, 626, 627, 628, 629, 630, 631, 632, 633, 634, 635, 637, 639; 623 is fixed.
- No line in PLAN:
  - 612, a parameter bounded only from above whose bound mentions another static parameter keeps `BottomType` under walk (W's stop met): beside the D5 entry, as Pavol's;
  - 616, walk failing on two upper bounds it cannot meet: beside row 591's entry, its sibling;
  - 619, the compiled checker accepting an overloaded dotted method written bounded by `Any`, the run then dying: the next checker rung, with rows 610 and 617;
  - 624, code generation refusing every varargs function and crashing on a varargs trait method: phase 5's code-generation list, with rows 559, 564, 565 and 594;
  - 636, `AnyList`'s readings of an unknown element type, "a checker and language change": the `where`-clause line, with row 433 and `Maybe`'s empty case;
  - 638, the bare `throw ForbiddenException` at five library sites and three tests: the next library rung's slips.

**Lines the batch made stale.**
- Phase 3 has no line for batch 10 and none for batch 11 (`PLAN.md:61-111`).
- Item 6's walk-rung line for row 544 still says "the repair is not built and goes to batch 10's record" (`:95`); its checker-rung lines for rows 563, 574, 593 and 605 (`:102-105`) carry no "fixed by climb batch 10's rung C".
- Item 7's P1 line says "being probed now ... for batch 10's record" (`:107`); P1 landed (`fd2c6ea10`) and its judgement waits for batch 11's record. Its row 602 line says "for the next library rung" (`:108`); N fixed it.
- The handover's first section still says the last landing is climb batch 7b and the checker reports 59 errors (`microgpt-run-c-handover.md:15` and its opening paragraph), stale since batch 8, as batch 9's review noted.
- Row 560's note says 11 sites remain in its second part; the landed list has 13.

**Script, manual and tool items.** Measures 1, 2, 4 and 5: the script. Measure 3: the manual's "Preparing a batch record". Measure 6: the tools line, already PLAN's (row 577). None has a PLAN line yet but measure 6.

**The checker-count check.** Every new or risen row of `compile-ladder/climb-batch-10/gate/checker-count.txt` against batch 9's:
- No row is new and none rose: the same twelve apis, the table byte for byte the same. `#total 1`, `#locations 2`, `#crash none`.
- The distance's units: none rose. `component FortressLibrary` 264 to 215 (C, G, N), `List` 22 to 10 (N, C), `Writer` 9 to 0, `FortressBuiltin` 8 to 2, `NativeArray` 1 to 0 (N), `String` 8 to 1 and `Stream` 3 to 0 (C). No kind rose; the crash rows fell from four to three.

## What I did not do

- I built nothing, ran no Fortress program, no suite and no stage, and edited no file but this one. I did not run the microGPT walk check the commit stage skipped.
- The site mapping uses a line diff of each library file; 32 sites matched by position with a changed message, none changing class. My classification of the after list differs from the stage's by one site between S1 and R4 on both lists, unchanged by the batch.
- The groups of "What is left" are a script of mine by file, line and message (`rev10/group.py`), not the stage's tool; a few borders between groups (the array support's 22, the ranges' 36) are by line range.
- I did not measure the briefings' sizes against the record's predictions (section 7 of the record), nor this review's own cost.
- The two-slot arithmetic of section 3 is a reading of the journal's start order, not a simulation.

## For Pavol

- All four rungs follow your decisions and the specification. Every departure is a ledger row; one stop rung W met is missing from your list.
- Cost: 6.3M written, 21 agents, 5 h 33 min (batch 9: 6.9M, 22 agents, 5 h 44 min):
  - workers 2.1M, first skeptics 1.2M;
  - three refusal rounds 1.7M;
  - gather 0.5M, review 0.4M, gate and commit 0.3M.
- The three refusals:
  - N: the test helper `shouldRaise` passed when it should fail. Real bug.
  - C: its own varargs change crashed the checker. Real bug.
  - G: one missing test line. Real, but the gather could have added it for under 0.1M instead of 0.5M.
- Practice: 11 builds, one repeated (the gate); no skeptic built; one rung measured part of the library, then all of it, on the same code (12 min), which the script forbids.
- Not run: the two microGPT checks under walk on the landed tree. A safety check refused the script; nobody has run them since.
- Count stays 1 (`isLeftZero`, yours). Distance 340 to 253: N 41, G 29, C 17.
- Left: arrays about 95, ranges 36, self-typed bodies 30, tuple comparisons 18 (item 43), 13 waiting on item 36, about 60 one-offs with rows.
- The blind designer's two risks:
  - compiled varargs programs that use the parameter are refused with a message until the switch-over;
  - `String`'s four operator families still load: walk skips symbolic operators, as the checker does (row 611).
