<!-- The post-batch review of climb batch 6.5b, the second run of climb batch 6.5 (rung V e455ccd98, rung E 413f36ac0; the gather's follow-up 19c750c4a; the merged-diff review's corrections 92c076b90, the judge's ruling b0ebf7e16 and its repair b6ee84f70; the second review's corrections 3c1687791; the gate judge's ruling ee0f277da and its records-only repair cdc2e2a0e; the landing record e3214cbf1), run wf_07b95462-a7d from the base 382b9fe7f. It is the combined pass Pavol asked for on 2026-09-28 (POSITIONS, reviews after a batch), in the form of reviews/batch-6.5-review.md and reviews/batch-N-review.md: conformance, the process measures of reviews/process-review-6b-7-7R.md, and the routing check, with a section on the four things that came up in this run (the red gate on one test key, the VM restart, the first use of the repair-rerun rule of 2026-09-29, the gate judge's wait on a permission prompt). For the coordinator, who files what it finds in PLAN.md, and for Pavol, who reads the first section. Written 2026-09-29 from 17:40 UTC by an Opus review worker, reading only, while main moved under it; the routing is checked against main at eb907bed2, where PLAN.md holds the day's routing (ae2c5ae40, 2a7c862bd). Nothing built, no Fortress program run, no gate stage run; the one comparison made here is of two committed per-site tables. Transcripts read only through bounded scripts, which are in batch-6.5b-review/ with their outputs. -->

# Climb batch 6.5b: conformance, process and routing

## For Pavol

- Both rungs are in the spirit of the designers and of your decisions. Rung V makes `RR32` a sibling of `RR64`, as the specification and the team's compiler library have it. Rung E makes both paths refuse a size beyond `NN32`, makes walk's powers, binomials and unsigned `LCM` raise `IntegerOverflow`, and repairs the range bodies with your reorder.
- The gate went red on one line of one test file. Rung V wrote its expected-failure run test with `run_out_contains=PASS`, which the harness fails outright. The rule every rung reads explains the harness without the line that decides this case. Its worker and skeptic followed that rule and never ran the file through the harness. The red cost 79 minutes and 1.2M tokens after the gate, a fifth of the run. Batch 7b launches next with four rungs, and only one of their briefings carries the fact that would have prevented it. The fix is three sentences in the shared rule.
- After the review's repair had already fixed and verified that line, the script still sent the red gate to a second judge and a second repair. That second judge waited 30 minutes on a permission prompt while the session was in manual mode. The script still does this.
- One item in the plan asks you to choose a repair you ruled out on 2026-09-21. Row 528 offers to add one declaration to the compiler's prelude now, "no default on record". Your decision then was that no declaration goes into the prelude. So the default is the switch-over.
- At 10:52 rung V stopped every process on the box running a script named `count-run.sh`. Rung E's corpus passes ran under that same name, so rung V killed them. E recorded "the cause was not found", and no check traced it.
- The VM restart at 14:35 cost 16 minutes and 0.32M tokens. The run resumed on its first attempt, with every finished stage kept.
- Your rule of 2026-09-29 against rerunning the gate after a test-only repair held on its first use. It saved one full gate, 42 minutes at this run's load.
- Process, in tokens as the harness counts them:
  - The run took 17 agents, 6.2M tokens and 7 h 43 min. The record estimated 14 to 18 agents, 5M to 8M and 5 to 8 hours.
  - Every worker, skeptic, judge and repair read its whole briefing. The map reached 3 of the 6 workers and skeptics, and INDEX none.
  - No rung re-ran the count or distance stage on its unchanged base. Rung E re-ran the 85-file ladder subset "before", 29 minutes, because the record asked for it.
- Nothing here needs a decision from you now.

## What came up in this run

### 1. The gate went red on one test key, and the whole gate ran before it was caught

- **What happened.**
  - Rung V measured a compiled-path defect: the prelude's `RR32` has no `=`, so `a = b` compiles and dies with `AbstractMethodError` (row 528).
  - It gated the defect as a link test and an `XXX` run test in `ProjectFortress/library_tests/`. The run test read `run_out_contains=PASS`. The program prints `REACHED`, then dies before `PASS`.
  - The harness fails a run test on an unmet `run_out_*` check before it reads the `XXX` flag (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:534-539`, `:583-585`, before `:587`). So the file could never count as an expected failure.
  - The gate's `testFast` went red on `fast-library/LibraryJUTest`, 86 tests with 1 failure (`compile-ladder/climb-batch-6.5b/gate/summary.txt:3`).
- **Why the rung and its skeptic missed it.**
  - The shared prefix's rule for home 2, which every rung reads, explains the mechanism thus: "FileTests.java:932 sets shouldFail ...; :587 and :654 make (shouldFail != failed) the failure condition" (`coordinator/climb-batch-workflow.js:1184` at `eb907bed2`).
  - It does not cite `:583-585`. It names no key an `XXX` run test needs. And it says the first `XXX` file is "shown to go red on a deliberate local fix", without saying through the harness.
  - Rung V's report cited exactly `:932`, `:587`, `:654` (`rung-rr32-sibling/REPORT.md:230` at `19c750c4a`). It showed the red on the program's output, by a direct compile and run.
  - Its skeptic did the same (`rung-rr32-sibling/SKEPTIC.md:148-153` at `19c750c4a`).
  - FACTS states the rule ("a marker the failing run does print", "The `XXX` expected-failure mechanism in `compiler_tests/` and `library_tests/` ..."). Rung E's briefing carried that entry, and E keyed all eight of its run tests right. Rung V's 41 keys and its skeptic's 15 did not carry it (`batch-6.5b-review/briefkeys.txt`).
  - It is the third `XXX` run test keyed on `PASS` in two batches. Rung I's judge and rung K caught the first two by a harness run (`compile-ladder/climb-batch-6.5b/JUDGE-review.md` section 2).
- **Why the whole gate ran first.**
  - Nothing before the gate ran the pair through the harness: not the rung, the skeptic or the gather. The gather ran none of the batch's new tests, as batch N's review had found such runs unneeded when the gate runs them.
  - The gate ran 42 minutes. `testFast` took 21 min 50 s, against batch N's 8 min 39 s, with the distance stage and the review beside it at load 7 to 8 (`climb-batch-6.5b/RECORD.md:162`).
  - A harness run of the two files at the rung takes a few minutes. Rung E made such runs for its own pairs (`rung-size-range/probes/repair/pow-pairs.txt`).
- **What it cost.**
  - From the review's block at 16:03:31 to the commit stage at 17:22:53: 79 minutes, and 1.20M tokens over five agents. The review's judge took 243K, its repair 195K, the second review 385K, the gate judge 213K and the gate's repair 164K (`batch-6.5b-review/run_agents.tsv`).
  - That is 19% of the run's 6.15M. Four agents diagnosed the same one-line cause: the gate, the review, the review's judge and the gate judge.
  - Without the miss, the commit stage would have started at about 16:03 and the batch landed at about 16:16.
- **Homes.** Finding 1 (the prefix) and finding 2 (the red gate's second judge).

### 2. The VM restart at 14:35 killed the gather, and it was resumed

- The first gather ran from 14:24:32 to 14:35:40: 49 calls and 319K tokens, lost.
- The VM got its signal at 14:35:43 and was up again at 14:36:58 (the coordinator's transcript `fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl:47153-47154`, cited below as `fe616d40…jsonl`).
- The coordinator kept the gather's partial state as `stash@{0}` (`:47158`) and relaunched the workflow with `resumeFromRunId` at 14:40:22 (`:47180`). The finished stages came back from the journal on the first attempt: the journal shows one key for both gathers (`journal.jsonl` lines 16 and 17). So the lesson of batch 6.5's item 89, identical arguments, held.
- The second gather began at 14:40:45 from a clean `HEAD`. It did not apply the stash. It reused only the first attempt's helper scripts, each checked, and one transcription, checked byte for byte against its own (`climb-batch-6.5b/RECORD.md:7`).
- Cost: about 16 minutes on the critical path (11 of lost gather work and 5 of restart), and 0.32M tokens. No finished stage was lost.
- The stash is dropped, and the boot note puts the restart into FACTS at the next consolidation.
- Home: nothing further. The resume procedure worked as written.

### 3. The repair-rerun rule of 2026-09-29, used for the first time

- **What the rule did.**
  - The review's repair changed one `.test` line and records. It ran the pair through the harness twice: placed (link `OK`, run "Saw expected failure") and on the local fix (run "Did not see expected failure"; `climb-batch-6.5b/repair-review-tests/`).
  - The gate was not run again, and its tables stand.
  - The landing wrote the runs as `# repair-tests` lines under the gate's own rows (`gate/summary.txt`, last six lines).
  - The rule saved one full gate: 42 minutes and about 0.13M tokens at this run's load.
- **What it did not save.**
  - The gate had been red, so the script took it to a gate judge. The script passes the review repair's runs as answering nothing (`answered: []`, `climb-batch-workflow.js:2700` at `eb907bed2`). The review's repair role is not given the gate's red lines (`:2683`).
  - The gate judge ruled that the repair "is already on `main`" (`JUDGE-gate.md`). Its repair ran the same pair again on `HEAD` (`gate-repair-tests/junit-placed-head.txt`).
  - That cost 42 minutes, 30 of them the prompt below, and 0.38M tokens. The gate judge ran on the top tier as a second ruling.
- **One text of the rule is wrong for this case.**
  - Step 1a defines `# repair-tests total` as "the cases these runs add, by which every count the next gate reads rises" (`climb-batch-workflow.js:2101`).
  - Here both repairs ran files the gate had already counted. A total of 4 would have told the next gate to expect a `LibraryJUTest` of 90.
  - The commit stage saw this, and wrote the line with what it counts and that the next gate rises by 0 (`climb-batch-6.5b/RECORD.md:164`).
- **Homes.** Finding 2 and the script items of Part 3.

### 4. The gate judge waited 30 minutes on a permission prompt in manual mode

- Pavol switched the session to manual approval at 16:13 for other work (`fe616d40…jsonl:47707`, `:47724`). It returned to auto at 17:14 (`:48399`).
- The gate judge started at 16:40:45. It sent five read-only calls at 16:41:54 to 16:42:06: `sed` on `FileTests.java`, `git show`, and a read of the harness's saved output under `/root/.claude/`. All five came back at 17:11:57 (`batch-6.5b-review/waits.txt`). No other agent of the run waited on a prompt: every other wait over two minutes is a build or a test pass.
- Pavol approved the prompt at about 17:11, thinking it was for the paper he had uploaded (`:48370`). The coordinator told him what it had been at 17:13 (`:48391`).
- The coordinator's check-in at 16:42:37 read the journal's tail, where the judge had just started. Nothing in the check-ins reads a running agent's last tool call. By the 45-minute cadence, the next check-in was due about 17:27.
- Cost: 30.0 minutes on the critical path.
- Home: finding 5.

## Part 1. Conformance

### Method

The method of `reviews/batch-7C-review.md`, as the last two reviews used it. For each rung:
- `git show` first;
- then its `REPORT.md`, `record.md` and `SKEPTIC.md`, with E's `JUDGE.md` and V's `decision-record.md`;
- then the batch record's second-run sections (`coordinator/CLIMB-BATCH-6.5.md` sections 1 to 6, rungs E and V);
- then the gather's `climb-batch-6.5b/RECORD.md`, with `JUDGE-review.md`, `REPAIR-review.md`, `JUDGE-gate.md` and `REPAIR-gate.md`;
- then the landed code and text on `main`, and the specification and team code the rungs touch.

Three standards, kept apart:
1. the specification (`Specification/`, with the 2012 Types chapter where it speaks);
2. the team's built intent;
3. your decisions (`POSITIONS.md`) and `PLAN.md`.

The batch's own checks were these. E's first skeptic refused, then E had a judge, a repair round, and a second skeptic that approved with three corrections. V's skeptic approved with three corrections. The review blocked on one line, then came its judge, the repair and a second review. Last came the gate judge and its repair. This review cites what they found and does not repeat it. What the record measured is cited, not measured again. Claims marked "by reading" were not run.

### The verdicts

- **Rung V, `RR32` a sibling of `RR64`: in the spirit.**
  - It follows the specification's mutual exclusion (`Specification/basic/types-vals-vars.tex:536`), the later Types chapter (`types.tick:977-978`), route A and answer 8.
  - It uses the team's devices throughout: `RR64`'s own header at `RR32`, `NN32`'s api shape, and the one library's `coerce(x: ZZ32)` form.
  - One point it put to you re-asks a closed decision (finding 3). It is the record's, not the code's.
- **Rung E, a value beyond its type's range: in the spirit.**
  - Your size's range is built on both paths, with the checker's own refusal device and walk's own negative-size check.
  - The natives raise by the specification's rule for integer results and rung O's devices. The range bodies take your reorder with the checked operators kept.
  - The owed pairs of rows 447 and 505 are written in batch N's form and decide nothing of item 18.
  - Its departures are recorded and listed for you. Its reorder of `CompactFullRange`'s `|self|` adds two distance sites, which nobody tied (finding 8).

### Rung V, `e455ccd98`

**What landed.**
- `value object RR32 extends { Number, StandardPartialOrder[\RR32\], StandardMinMax[\RR32\], AdditiveGroup[\RR32\], MultiplicativeRing[\RR32\] }` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:47-48`).
- 48 api lines declare the operators its component defines, at `RR32` (`:69-116`). Its 30 natives take `b:RR32`, the argument they read, which closes row 435.
- Its integer power is `narrow((asFloat(self))^b)` (`FortressBuiltin.fss:328`).
- `Number comprises { RR64, RR32, QQ, AnyIntegral }`. `RR64 excludes { QQ, AnyIntegral, RR32 } comprises { Float, FloatLiteral }`, with `coerce(x: RR32) = asFloat(x)`. `Number`'s `=` gains an `RR32` clause in each arm (`Library/FortressLibrary.fsi:282`, `:291-296`; `.fss:359`, `:364-373`, `:387-392`).
- The number chapter names ℝ32 in the S1 form: `Specification/basic-lib/numbers.tex:31`, `:43`, the callout at `:50-56`, and Appendix I's "The single-precision floating-point type" (`appendices/changes.tex:1714-1790`).
- Rows 435 and 530 are closed. Rows 528, 529, 531 and 532 are opened.

**Standard 1, the specification.**
- An `RR32` value is no longer an `RR64` value (`types-vals-vars.tex:536`).
- Mixed arithmetic follows the worked example: an `RR32` with an `RR64` goes through `RR64`'s declaration after the coercion, and two `RR32` values through `RR32`'s own (`conversions-coercions.tex:904-912`). The example's `widens` is deferred by answer 8, as recorded.
- The skeptic ran 11 programs of its own. Walk on the edit gives the specification's answers throughout (`rung-rr32-sibling/SKEPTIC.md` section 10).
- The divergences from the compiled path are the prelude's (rows 528 and 529), except row 387's new instance, which is walk's: an `RR32` returned where `RR64` is declared stays an `RR32` under walk and converts on the compiled run.
- Row 529, the compiled `RR32` with `RR32` answering `RR64`, is at home 3 because "the specification is silent on the declarations a library carries on ℝ32". Route A (POSITIONS 2026-09-24) says each number type carries its own algebra, so a decision covers it even where the text does not. It changes nothing: the row resolves when the prelude leaves.

**Standard 2, the team's built intent.**
- The compiler library has had the two floats as siblings since Chase's `6896886fb` (2009). It has had `RR64`'s `coerce(x: RR32)` since at least `26718e298`, which is the gather's correction V1.
- The api follows `NN32`'s shape in the same file and `RR64`'s in the library. The exponent is `RR64`'s `(asFloat(self))^b` composed with `narrow`. The `=` extension is the component's own `typecase`.
- Rung M's device, each type's own `MIN`, `MAX` and `MINMAX`, now holds for `RR32` too (`FortressBuiltin.fsi:79-81`).

**Standard 3, the decisions.**
- Route A and answer 8: built. Decision 2 of the conversion judgement: `RR32`'s own `MIN`, `MAX` and `MINMAX` at `RR32`. Decision 1: a declaration that fits runs unconverted (`SKEPTIC.md` section 13).
- Rung D's stop: the `ReflectiveQuickCheckTest` timeout kept its verdict. The row it owes was opened at the gather as row 532, on the skeptic's recommendation.
- The decision of 2026-09-21, "from now no declaration goes into the compiler's prelude" (POSITIONS 2026-09-21, the library route): V's point for you on row 528 offers exactly such a declaration as the first of two ways, with no default (finding 3).
- Row 330, decided at 15:18 after V's commit: `floor` and `ceiling` on the floats keep the float, as V's api has them (`FortressBuiltin.fsi:111`, `:113`). V's api also declares `truncate`, `round` and the two bracket operators at `ZZ64` (`:112`, `:114-116`). These are four more sites for R1's tidying rung, the ℤ result. Part 3 routes them.

**What it left, and where.**
- Row 528 is a parked line with the wrong default (finding 3). Row 531 is a parked line.
- Rows 529 and 532 have no line (Part 3).
- The re-anchoring of `numbers.tex` and `changes.tex` citations was made at the gather by a line map: 33 in the records, and six test files by the rung.

**Verdict: in the spirit.** Every device is the team's or the specification's. The one departure is in a point put to you, not in the code.

### Rung E, `413f36ac0`

**What landed.**
- The checker refuses a literal size outside its kind's range. For a trait type the kind comes from the trait index, in both passes; for a written reference, from the declared schema after type checking. The refusal sits beside the team's arithmetic refusal in `TypeWellFormedChecker.scala:49-87`, with messages that name the kind (row 307's note).
- Walk reads a size exactly, refuses it at binding where the kind is known, and refuses static arithmetic that leaves `ZZ64` (`EvalType.java:449-455`, `:258-260`, `:270-273`, `:468-480`). `BaseEnv.putNat` makes the value by the numeral's rule (`:630`).
- `^` and `CHOOSE` on the four fixed widths, and `LCM` on `NN32` and `NN64`, raise `IntegerOverflow` where the result does not fit. `CHOOSE` answers 0 for `k<0` or `k>n` (rows 519, 520, 347, 337).
- The bodies of rows 450 and 451 are reordered, and their three tests promoted.
- The owed pairs of rows 447 and 505 are written. Row 503's `XXX` walk test is written.
- Rows 521 to 527 are opened: the compiled powers, the compiled `CHOOSE`'s table, the compiled `try` as an operand, the strided span, and walk's arrays beyond 2^31-1.

**Standard 1, the specification.**
- A size's range is `trait-parameters.tex:82-90` read with your decision.
- The natives follow "For integer results, overflow throws an `IntegerOverflow`" (`opr-overview.tex:154-155`), with `basic-integers.tex:527-529` and `:596-598`. `CHOOSE`'s 0 is `:598`.
- The ranges follow `ranges.tex:61`, `:68-70`, `:78-79` and `:140-143`. The skeptic's 60 range forms show every form that answered on the base answering the same, and every form that raised now giving the specification's answer (`rung-size-range/SKEPTIC.md`, first judgement, section 13).
- Static arithmetic in a size is the language's (`Specification/basic/expressions/constant.tex:123-133`). Walk refuses it only beyond `ZZ64` or the kind, the judge's decision, listed for you.
- The compiled divergences the skeptics found are settled against the compiled path and gated at home 2: the powers (rows 523 to 525), `CHOOSE` past its table (521) and `try` as an operand (526).

**Standard 2, the team's built intent.**
- The refusal copies the team's own device and message family. Walk's refusal sits beside the team's negative-size check.
- The natives use rung O's `Math.*Exact` and its divide-back product, and `NN32$Gcd`'s own widening. The binomial divides by a gcd first, since walk has no tables; the skeptic checked that this is exact (`SKEPTIC.md`, first judgement, section 4).
- The empty range is the library's own `CompactFullParScalarRange(0,-1)` (`Library/RangeInternals.fss:1393`).
- The strided step's split test is new. The skeptic found no device for it in the library or the prelude, and verified it at both signs of the bound and the stride.
- **The batch record's two claims about the compiled helpers were false, and the rung copied them.**
  - E's section and its briefing key called `simpleIntArith.intToIntPower` "The compiled path's ZZ32 power, which raises IntegerOverflow; the team's own checked power" (`coordinator/CLIMB-BATCH-6.5.md:106`, `:559`).
  - It is bound nowhere. The bound `^` throws uncatchably, saturates, or adds (`rung-size-range/JUDGE.md` section 1.2).
  - The compiled `CHOOSE` raises only inside its tables (second judgement, section 7).
  - Both skeptics caught them, and the defects are gated (items 135 and 142).

**Standard 3, the decisions.**
- A size's range (2026-09-27): built on both paths.
- Item 25 (2026-09-28): the checker's `IntLiteral` is unchanged. Walk's size used as a value takes the numeral's rule, which is "as a numeral does" in walk's numeral model until Q-walk.
  - Where an oversized one is refused is still undecided (batch N's `JUDGE-review.md` section 2.3).
  - The quiet `ZZ64` at a `ZZ32`-declared return is row 22's mechanism. It is listed for you, and rung Q meets it.
- Row 334, row 379 and the unsigned types: built. The count of interpreter outputs the natives change is zero by value, four at frame positions only (`REPORT.md` section 11), so nothing is owed to you under row 379's condition.
- The strided distance's reorder (2026-09-26): kept with the checked operators.
- Batch N's first run (2026-09-29): the owed pairs written, the binding left open.
- The stops (2026-09-27): four met, each lifted as reversible and listed (`RECORD.md:111`).
- The one-library decision (2026-09-21): E touched no prelude file. Its compiled defects are gated, with their fixes placed in phase 4's natives half.

**What it left, and where.**
- Every parked line is in PLAN's "Climb batch 6.5b, listed for his review" (`PLAN.md:353-366` at `eb907bed2`).
- Row 503's six bodies go to batch 8's residue.
- **Walk's half of rung P's reserved stop is now built.** The overview's sentence that an unsigned `LCM` too large for its type throws is true under walk since `413f36ac0`. The parked line still says "until batch 6.5b's rung E makes it raise" (`PLAN.md:303`). Part 3.
- The record asked the gather to check P's landed integer text against E's natives (`CLIMB-BATCH-6.5.md`, section 4, "The second run"). The gather's record does not mention it. By reading they agree: P's text rests on `opr-overview.tex:154-155` for `CHOOSE` and the power, and E's natives follow that sentence.

**Verdict: in the spirit.** Each fix copies a device the tree has, or states why none exists. Every departure is recorded and listed.

### The global questions

- **Later phases.**
  - Batch 7b, next.
    - Finding 1 applies to all four rungs, S, C, W and L. Only rung C's tail and briefing carry FACTS's `XXX` entry (`CLIMB-BATCH-7.md:815`, `:905`, `:1264`, `:1282`).
    - Rung L names `RR64` and `QQ` as the partial orders that also carry `StandardMinMax` (`CLIMB-BATCH-7.md:343`). Since V, `RR32` is a third (`FortressBuiltin.fsi:47-48`, `:79-81`). The record's re-anchoring to the landed tree, the boot note's next step, should add it.
  - Batch N's second run, rung Q: it meets the quiet `ZZ64` face through row 387, and its PLAN line says so.
  - Batch 8.
    - R9 gives `RR64` a `coerce` from `NN32`. Its line names "the specification's callout on answer 8 reworded" (`PLAN.md:85`). But the passage V just revised then says two false things: that ℝ64 coerces only from ℝ32, ℤ32 and integer numerals (`numbers.tex:43`), and that a conversion into ℝ64 from ℕ32 is explicit (`:46-49`). R9's rung needs that passage in its files (finding 10).
    - R1's rung meets V's four new rounding declarations (finding 11).
    - Row 531, `avFlat`, has "batch 8's library work the nearest".
  - The switch-over.
    - Rows 528 and 529 retire with the prelude. The line "The compiler prelude's own range defects retire with it" (`PLAN.md:98`) is their natural home.
    - The same line still says row 453's compiled test "waits on row 450's fix, batch 6.5b's rung E". That fix has landed.
  - Phase 5: row 527, walk's arrays beyond 2^31-1, meets the array design's refusal where storage is made.
- **Built twice.** The size refusal is on both paths, by design, and both refuse the same programs (`SKEPTIC.md` section 13). Static arithmetic differs by design: the checker refuses all of it, and walk only the out-of-range results.
- **The library's way.** Yes in both rungs. The exception is the record's two claims about the compiled helpers, which the rung copied and the skeptics corrected.
- **What reached you.**
  - The landing message gave one line per rung and the gate (coordinator transcript `:48656`).
  - It said "the distance to the switch-over dropped by 3". By site, the batch's edits moved it by 1: V's minus 3 and E's plus 2. The other 2 are BR's, a family FACTS records as varying between setups (finding 8).
  - It carried neither rung's "What comes back to Pavol" list (Part 3).

### Findings

Ranked by what they cost or risk next. Each gives its home.

1. **The shared rule for an `XXX` test explains the harness without the line that decides a run test.** Severity: before batch 7b's launch; it cost this run 79 minutes and 1.2M tokens.
   - The prefix's home-2 paragraph (`climb-batch-workflow.js:1184` at `eb907bed2`) cites `FileTests.java:932`, `:587` and `:654`, and not `:583-585`, where an unmet `run_out_*` check fails a run test before the flag is read. It names no key for an `XXX` run test. It says the first `XXX` file is shown red "on a deliberate local fix", not through the harness.
   - Rung V and its skeptic followed it word for word (section 1 above). The plan's test-first rule gives only the plain form, `run_out_contains=PASS` (`PLAN.md:370`).
   - FACTS has the rule. Only a briefing that carries its entry sees it, and in 7b one briefing of four does, rung C's.
   - Home: the prefix's paragraph, before 7b launches. Three sentences: an `XXX` run test's key names output the failing run prints before it dies (`REACHED`), with `:583-585`; the first `XXX` file is shown red through the harness, placed and on the fix (`climb-batch-N/merged-tests/junit.sh`); and batch N's unbuilt measure 6 beside them, that a program which compiles and then fails in the JVM is settled at home 2 (`reviews/batch-N-review.md`, measure 6). Unrouted today: both judges addressed it to this review.
2. **A red gate goes to a second judge and repair after the review's repair has answered its line.** Severity: a script rule; 42 minutes here, 0.38M tokens and a top-tier ruling.
   - The review's repair role is given no gate lines (`climb-batch-workflow.js:2683`). Its runs are pushed as answering nothing (`:2700`). The red gate then goes to `judge:gate` whatever the repair did (`:2717`).
   - The six rules merged at 17:50 (`5cb418ac5`) do not change this path. Under the review judge's new `land` ruling the gate judge would still run.
   - Home: the script line (`PLAN.md:243`). When the gate that ran beside the review is red, the review's repair gets its failing lines, and `repairRerun` gets that gate. When every red line is answered by a passing run and no code path changed, no gate judge runs. A few lines, and one scenario in `checkn.js`. Unrouted.
3. **Row 528's parked line re-asks the one-library decision.** Severity: a line of the plan that asks you a settled question (protocol principle 4).
   - It offers "repair it now with the one prelude line ... or leave it to the switch-over. No default on record" (`PLAN.md:357`).
   - POSITIONS 2026-09-21: "from now no declaration goes into the compiler's prelude". The fix adds `opr =(self, other:RR32)` to `CompilerBuiltin.fss`. The nearest thing on record since then, batch 3.5's rung B, changed existing prelude bodies under your integer rules of 2026-09-22, binding four natives for them, and declared no new operator.
   - Rung V itself wrote "the prelude ... leaves at the switch-over" (`REPORT.md:223`). Its skeptic, the gather, both reviews and both judges passed the point. `JUDGE-review.md` section 5 calls it "Pavol's parked choice".
   - It is the third batch running in which an item says "no default on record" where the record gives one (batch 6.5's item 88, batch N's finding 3).
   - Home: the line's default becomes the switch-over, by the decision of 2026-09-21, with the prelude line named only as an exception you could grant. Or move it to phase 4's line on the prelude's own defects (`PLAN.md:98`), with row 529.
4. **One rung killed the other rung's corpus passes, and the two rungs measured the same base twice.** Severity: a process hazard, found by no check.
   - At 10:52:17 rung V ran `ps -eo pid,args | grep -E 'count-run.sh|mg-run.sh|p-edit|mg-edit' | awk '{print $1}' | xargs -r kill`, to stop its own edit pass (the run's `agent-a4f7586da04357839.jsonl:639`).
   - Rung E's runner was also `count-run.sh`, a copy of the same earlier runner. E's two base passes, at 368 and 96 of 444 files, "ended without an exit line ... the cause was not found" (`rung-size-range/REPORT.md:13`). E renamed its runner and resumed at 11:04 in copies of the base tree.
   - Beside that, both rungs ran a base pair of the interpreter corpus on the same base, `382b9fe7f`: four base passes where two would serve both. At times three or four corpus passes ran at once on the 4-CPU box, at load 8 to 36.
     - V's edit pass took 74.5 minutes, against 25.3 minutes for its base B at a lower load.
     - One test hit the 600 s cut (row 532), and E's count stage stopped at its 900 s limit on the first try (`rung-size-range/REPORT.md` section 11).
   - The record planned the four passes: "they share the box, not a file" (`CLIMB-BATCH-6.5.md`, section 4).
   - Home: one prefix sentence, that an agent stops only processes under its own worktree's path, never by a script's name. And in the manual's "Preparing a batch record": when two rungs of a run compare the corpus on one base, one base pair serves both, with the edit passes staggered. The plan has held "stagger the rungs' comparison passes or cap concurrent JVMs" since batch 7C (`PLAN.md:247`), unbuilt. The kill is unrouted.
5. **Nothing tells Pavol, or the coordinator, that a batch agent is waiting on a prompt.** Severity: a coordinator procedure; 30 minutes here.
   - The protocol keeps him from hearing about a running batch "unless something is wrong". A batch agent waiting on his approval is something wrong. The check-ins read the journal, which shows an agent started, not an agent waiting.
   - Home: `coordinator/climb-batch-workflow.md`, "while a batch runs", or the coordinator's README.
     - When he switches to manual approval while a batch runs, the coordinator says so in one line: the batch's agents will ask, and which stage is running.
     - A check-in reads each running agent's last tool call and tells him when one has waited over five minutes.
   - Cost: a line and a check-in step. Unrouted.
6. **A briefing's reason line asserted what its code did not do, and another named only part of what it printed.** Severity: planner-side, recurring (batch 6.5's measure 4).
   - The `intToIntPower` key's reason line asserted a checked power that nothing binds (`CLIMB-BATCH-6.5.md:559`). It produced items 135 and 142, a refusal and three new rows' worth of correction.
   - The `forIntArg` key printed `EvalType.java:431-470`, which holds `forIntBinaryOp`. Its reason line named only "the line row 418 needs fixed" (`:544`). The sibling in the printed slice was missed (item 137).
   - Batch 6.5's review measured the same shape as its items 73 and 74.
   - Home: measure 4 of batch 6.5's review on the script line (`PLAN.md:252`), with one addition: a reason line that says a function raises, or is a path's own device, names where it is bound, and the planner greps the binding.
7. **Routing gaps.** Severity: lines of the plan. The list is in Part 3.
   - Rows 529 and 532 have no line.
   - P's reserved-stop line and phase 4's row-453 line describe the past.
   - The rungs' lists for you are not filed as "on file, not sent".
   - The second run's own section-1 default, the owed tests in E, is not on the defaults line.
   - Phase 4's natives line does not name rows 521 and 523 to 525.
   - Two script texts: the `atomic_runs` grep, and the `# repair-tests total` definition.
8. **Rung E's reorder adds two distance sites, masked in the total, and no one tied the move.** Severity: a note.
   - The gate and its judge left the tie to this review ("that is for the post-batch review", `JUDGE-gate.md` section 4).
   - Comparing the two committed per-site tables by kind, unit and mapped location (`batch-6.5b-review/distance-tie.txt`) gives 9 sites gone and 6 new:
     - V removed three `FortressBuiltin` sites: `RR32`'s `MINNUM` and `MAXNUM` bodies typed `RR64` under an `RR32` return, and the mis-parsed `self^asFloat(b)`. That is `FortressBuiltin` 9 to 6.
     - E's `|self|` went from 3 sites to 5. The `ZZ32` arm's new emptiness test adds a `<` and an `if` condition over the same `I` against `ZZ32` operands the checker already refused (`Library/FortressLibrary.fss:3921`).
     - BR lost three sites and gained one (`BIG MINNUM`, `BIG AND` and `BIG ||` gone, `BIG MAXNUM` new). BR is a family FACTS records as varying between setups; whether any of it is V's is not separable by reading.
     - The class rows (I1 +4, I3 -1, OT -4) move with shifted lines, as `classify.py`'s fixed ranges do (batch N's record, `climb-batch-N/RECORD.md:228`).
   - Home: FACTS's entry on the true distance at the next consolidation, which the landing already left to it (`RECORD.md:176`).
9. **The owed-test argument, a sixth batch running.** Severity: a note; routed.
   - The gather filed row 442's new face, the prelude's missing `ZZ64` `^`, as a note without its test. It joined the face to older ones that batch 6.5's judge had parked.
   - The review listed it for you and routed it to the parked line on the older home-2 tests (`PLAN.md:306`).
   - The test would be two small files. The gather had a precedent: a judge had parked the older faces.
   - Home: as routed.
10. **Batch 8's R9 will make the passage V revised false, and its line does not name it.** Severity: a named batch (8).
    - `numbers.tex:43` lists ℝ64's coercions, and `:46-49` names ℕ32 among the explicit conversions into ℝ64.
    - Home: R9's line (`PLAN.md:85`) names `Specification/basic-lib/numbers.tex:43` and `:46-49` as rung V left them. The rung revises them in the S1 form beside V's callout at `:50-56`.
11. **R1's rung meets four rounding declarations that rung V added.** Severity: a note.
    - `RR32`'s `truncate`, `round`, `|\self/|` and `|/self\|` are declared at `ZZ64` (`FortressBuiltin.fsi:112`, `:114-116`). Row 330's decision makes them ℤ.
    - Home: a clause on R1's line (`PLAN.md:199`) or a note on row 330.

## Part 2. Process measures

### Method

- The run is `wf_07b95462-a7d`. Its directory holds 17 transcripts (`batch-6.5b-review/run_agents.tsv`):
  - the two rung workers;
  - E's first skeptic, judge, repair round and second skeptic, and V's skeptic;
  - two gathers, the first killed at 14:35;
  - the gate and the review;
  - the review's judge and repair, and the second review;
  - the gate judge and its repair;
  - the commit.
- The like-for-like group is the two rung workers, E's repair round and the three skeptics: 6 agents.
- `process-review-6b-7-7R/measure.py` ran unchanged on these agents, through copies of `batch-N-review/`'s scripts with the run changed. `agents.py` gives the gate's repair its own kind.
- Batches 6b to 7R, 7C and N are read from their notes' committed `agents.csv`. Batch 6.5's review committed none, so its figures are cited from its text.
- The unit is tokens as the harness counts them: each agent's context at its last turn, summed. No agent compacted.
- Misses are numbered on from `batch-N-review.md`'s 133. "In the briefing" means printed by that agent's own briefing keys (`batch-6.5b-review/briefkeys.txt`).
- Two limits of the measure, checked by hand:
  - It counts a briefing part only when `facts-extract.sh` is called directly. Rung E ran its eight parts through a helper script, and rung V its last two in one loop. Both read every part (their calls 6 to 16 and 7 to 13).
  - Its briefing token figure for rung E (12K) is therefore low. The announced sizes are used below.

### What the agents read

From `batch-6.5b-review/summary.txt` and the transcripts.
- **The briefing.**
  - All 6 workers and skeptics ran it and read every part. So did the 5 judges and repairs.
  - Rung V read the batch record first and ran the briefing at its 7th call. Rung E ran it at its 6th, after writing its helper. The skeptics ran it at their 2nd to 4th call, and the judges at their 1st or 2nd.
- **The planner's sizes.**
  - Rung E's briefing printed about 82.5K tokens and rung V's 42.5K, against the record's 64K and 39K (`CLIMB-BATCH-6.5.md:347`). E's grew with the second run's additions (item 25, the owed tests), and the size line was not updated.
  - The `checks` slices printed 33.6K for E and 13.6K for V, against 25K and 13K.
- **The map.**
  - 3 of 6: rung E through three map keys, rung V through one, and V's skeptic by opening a map file. No rung worker opened a map file.
  - That compares with 6 of 11 in N, 2 of 4 in 6.5 and 3 of 4 in 7C.
  - Over all 17 agents, 3.
- **INDEX.** 0 of 6. No briefing carried an `index:` key. Over the run, 1: the review opened it once.

### What reading cost

Means per agent, from `summary.txt`.
- **Rung workers, 2.**
  - Context at the end: 692K, against 564K in N, 615K in 6.5 and 422K in 7C.
  - Briefing, announced: 62.5K (9%).
  - Searching: 157K (23%), against 26% in N and 27% in 6.5.
- **Skeptics, 3.** Context 390K. Briefing 25K (6%). Searching 64K (16%), against 17% in N.
- **Repair round, 1.** Context 524K. Searching 49K (9%).
- **Per turn.** Workers, skeptics and the repair made 0.41 searching calls and read 504 tokens, against 0.43 and 613 in N and 0.55 and 750 in 7C. 27% of their searching calls came before the first edit or probe, against 38% in N.
- **Briefing against searching.** 33% of their searching calls opened a file their briefing had printed from: 148 of 455 calls, 160K of 554K tokens (`overlap.txt`). That is against 32% in N, 30% in 6.5 and 28% in 7C. A proxy by file name.
- **The run.**
  - 17 agents and 6.15M tokens, 588M read across all turns.
  - 7 h 43 min from the launch at 09:52 to the landing at 17:35.
  - The rungs took 161 minutes (E) and 181 minutes (V).
  - E's refusal chain took 112 minutes and 1.61M tokens (skeptic, judge, repair round, second skeptic, 12:32 to 14:24), and was the critical path to the gather.
  - The gather with its restart took 56 minutes, the gate and review 43, the red chain 79, and the commit 12.
- **Against the record's estimate** of 14 to 18 agents, 5M to 8M tokens and 5 to 8 hours (`CLIMB-BATCH-6.5.md:40`): inside on all three. Without the red chain it would have been 12 agents, 4.95M and about 6 h 25 min.

### Misses, by kind

Kind, who caught it, whether it was in the briefing, and whether it landed.
- **Rung E, first pass:**
  - 134. Four anchors off by a line, or base lines unmarked (`RangeInternals.fss:1394`, `:1375`, row 450's ranges, `NN32.java:231`). *Other: record.* First skeptic and judge; an anchor check over 181 citations corrected them.
  - 135. The precedent called `intToIntPower` the compiled path's checked power, and the divergence said the compiled power raises `IntegerOverflow`. Nothing binds it, and the bound `^` throws uncatchably, saturates or adds. *The team's own code, by reading; in the briefing,* where the planner's key and reason line said so. First skeptic. Corrected; rows 523 to 525 and three pairs.
  - 136. Provisional row 521 was the ledger's row 337, fix and all. *The ledger not searched; not in the briefing* (its ledger keys: 307, 334, 347, 418, 438, 441, 447, 450, 451, 503, 505). First skeptic. Row 337 closed.
  - 137. `EvalType.forIntBinaryOp` wraps sizes written as arithmetic, three lines from the edit. *A sibling site; in the briefing* (the printed slice `:431-470`; the reason line named only row 418's line). First skeptic. Repaired at home 1 in the repair round.
  - 138. The three array glue sites that read a size as an `int`, made live for 2^31 to 2^32-1 by the rung's `putNat`. *Sibling sites; not in the briefing.* First skeptic. Row 527, home 3.
  - 139. Row 522's third site, `ScalarRange.check()`. *A sibling site; not in the briefing.* First skeptic. The row and its test extended.
  - 140. The quiet `ZZ64` at a `ZZ32`-declared return was missing from the met stop's evidence. *A reserved stop's report.* First skeptic. Corrected.
- **Rung E, repair round:**
  - 141. It listed "a size inside `NN32` or `ZZ32` that stops reading back" as not met, though the judge's chosen candidate meets it. *A reserved stop's report.* Second skeptic. Corrected at the gather.
- **Rung E, second pass over the record's claim:**
  - 142. The compiled `CHOOSE` raises `IntegerOverflow` only inside its tables, and dies with a raw `ArrayIndexOutOfBoundsException` past them. *The team's own code, by reading; in the briefing* (the `intOverflowingChoose` key and the record's `:106`). Second skeptic. Row 521; its pair placed at the gather.
- **Rung E's skeptic and judge:**
  - 143. The first skeptic called the place of walk's array refusal "silent". Your decision on a size's range places it where storage is made. *A decision not used; in the skeptic's slice* (`positions:2026-09-27 size's range`). The judge. The home stayed 3, for other reasons.
  - 144. The judge's spelling `unsigned(2)^unsigned(31)` does not parse, and the skeptic's reason for the `|0:MIN:MIN|` assertion does not hold by reading. *Other.* The repair round and the judge.
- **Rung V:**
  - 145. The `XXX` run test keyed on `PASS`, the harness model taken from the prefix, and the red shown on the program's output. *A rule on record (FACTS) not in the briefing, and the prefix incomplete.* The gate, with the review beside it. Repaired before the push.
  - 146. Its skeptic, the same. *Not in its slice either.* The gate and the review.
  - 147. The compiler library's coercion was dated to Chase's 2009 commit, which added none. *Provenance; the two facts were in the brief, fused.* Skeptic (V1).
  - 148. The timeout, a run-to-run difference with its verdict kept, owed a ledger row by rung D's rule, and none was opened. *A ruling; in the briefing* (`positions:2026-09-26 rung D's stop`). Skeptic. Row 532.
  - 149. The fold's re-anchoring list named one of three FACTS entries, and a base line was cited under the tree's rule. *Other.* Skeptic (V2, V3).
- **The gather:**
  - 150. It filed row 442's new face as a note without its test. *The owed-test rule, in the prefix.* The review, as an item for you. Landed without its test, on the parked line.
  - 151. A FACTS entry left saying the range bodies raise, two provenance lines not ending on `file:line`, and the handover's paragraph for the review. *Other.* The two reviews.
  - 152. The record's check of P's integer text against E's natives is not recorded. *A step of the record not done.* This review, which finds by reading that they agree.
- **The reviews, judges and commit stage:**
  - 153. "Saw expected failure" cited at `:589` (it is `:591`), and 36 run tests counted with one twice. *Other.* The repairs and the gate judge.
- **The batch record:**
  - 154. It asked rung E for the ladder subset "before and after" (`CLIMB-BATCH-6.5.md:114`), where the landed gate's ladder stage had compared the same 85 files against the baseline's committed outputs on the unchanged base. *A re-measure asked.* Not caught; it ran, 29 minutes.
  - Items 135 and 142 also began here.
- **Found by this review:**
  - 155. The prefix's home-2 paragraph, the source of 145 and 146 (finding 1). *A rule, between batches.*
  - 156. The red gate's second judge and repair (finding 2). *A rule of the script.*
  - 157. Row 528's point re-asks the decision of 2026-09-21; it escaped the skeptic, the gather, both reviews and both judges (finding 3). *A decision on record not used; not in V's briefing.*
  - 158. V's kill of E's passes, recorded by E as "cause not found" (finding 4). *Other: a hazard across worktrees.*
  - 159. The wait on a prompt, invisible to the check-ins (finding 5). *A procedure.*
  - 160. Rows 529 and 532 without a line, two plan lines describing the past, the lists not filed, and two script texts (Part 3). *Routing.*
  - 161. E's two distance sites, untied (finding 8). *Between batches.*
  - 162. 7b's rung L, and batch 8's R9 and R1, meeting what V landed (the global questions; findings 10 and 11). *Between batches.*

### Against the earlier notes

- **Found inside the batch, like for like.** That is the earlier notes' kinds, without the "other" items 134, 144, 149, 151 and 153 and the record's 152 and 154: 14 in 2 rungs (135 to 143, 145 to 148, 150), 7 a rung.
  - That compares with 5.5 in N, 7 in 6.5, 3.5 in 7C and 2.8 in 6b to 7R.
  - Three pairs share a cause (135 and 142, 140 and 141, 145 and 146), so there are 11 distinct, 5.5 a rung.
- **By kind:**
  - the team's own code, by reading: 2 (135, 142), both from the planner's line;
  - sibling sites: 3 (137, 138, 139);
  - the record or ledger not searched: 3 (136, 145, 146);
  - a decision or ruling not used: 3 (143, 148, 150);
  - a reserved stop's report: 2 (140, 141);
  - provenance: 1 (147).
- **In the agent's own briefing: 6 of 14** (135, 137, 142, 143, 147, 148), against 7 of 22 in N, 3 of 14 in 6.5 and 3 of 7 in 7C. Three more were in the prefix every agent reads (145, 146, 150), and there the prefix itself was incomplete for 145 and 146.
  - In 135 and 142 the briefing's reason line was the error. In 137 it named only part of what it printed.
- **Who caught them.**
  - E's first skeptic 6, its second 2, V's skeptic 2, E's judge 1, the gate with the review 2, and the review 1.
  - The skeptics caught 10 of 14: every rung-level miss except V's test key (145, 146), which needed a harness run no one before the gate made.
- **Landed: 1** (150, routed without its test). The defects of 135 and 142 landed gated by design. The rest were corrected before the push.
- **Escaped every check in the batch: 8** (155 to 162). One of them, 157, is a point put to you, and one, 158, cost a rung its passes. The rest are between batches, in routing or in rules, as in the earlier notes.
- **Severity.** Nothing touches a line of the model or blocks the switch-over. The costliest is 145 with its source 155: 79 minutes, 1.2M tokens and the one gate red of the run. The worst on the record is 157, a settled question put back to you.

### Re-measuring what the record held

- **No rung re-ran the count or distance stage on its unchanged base.**
  - Both took batch N's landed table as their "before", after checking with `git log 3fb0cd8c1..382b9fe7f -- Library/ ProjectFortress/` that nothing had changed under it (`rung-rr32-sibling/REPORT.md` section 9, `rung-size-range/REPORT.md` section 11).
  - Rung V also declined to repeat its two-file ladder subset on the base, "the same by construction".
  - Your rule of 2026-09-28, 14:18 UTC, held (`POSITIONS.md:125`).
- **Rung E re-ran the 85-file ladder subset on the unchanged base** (`probes/ladder-before/`, 10:25 to 10:54, 29 minutes at load 9 to 33).
  - The landed gate's ladder stage had compared the same files, phase and stdout, against the baseline's committed outputs (`climb-batch-N/gate/ladder/`; `baseline-2026-09-19/raw/`).
  - The record asked for "before and after" (item 154). The rule names the count and distance stages; the ladder stage has the same shape.
- **Both rungs ran a base pair of the interpreter corpus on the same base** (finding 4). That is two passes of about 25 to 50 minutes each beyond what the run needed. It is not a re-run of a gate stage, since the gate does not compare the corpus's outputs, but it is the same measurement taken twice in one run.
- **The skeptics** ran their own programs on the edit, and read the rungs' committed tables.
- **The gate was not run a second time** (section 3 above).

### Measures the evidence supports, each with its cost

1. **The prefix's home-2 paragraph gains three sentences.**
   - An `XXX` run test's key names output the failing run prints before it dies (`REACHED`), with `FileTests.java:583-585`.
   - The first `XXX` file is shown red through the harness, placed and on the fix (`junit.sh placed`).
   - Batch N's measure 6: a program that compiles and then fails in the JVM is settled at home 2.
   - Evidence: items 145, 146 and 155; the two earlier catches in batch N.
   - Cost: three sentences, and a few minutes per rung that adds an `XXX` run test. Before 7b launches.
2. **The review's repair answers the gate's red lines when the gate beside it is red, and then no gate judge runs.**
   - Evidence: section 3; item 156.
   - Saves 12 minutes of agents and 0.38M tokens per such batch, plus any wait. Cost: a few script lines and a `checkn.js` scenario.
3. **An agent stops only processes under its own worktree's path.** One prefix sentence. Evidence: item 158.
4. **One base pair per run when two rungs compare the corpus on one base; the edit passes staggered.**
   - Evidence: finding 4.
   - Saves a base pair, about 70 minutes of four JVMs here, and the faults that the load caused.
   - Cost: a line in the manual's "Preparing a batch record" and the planner's generator; the plan's held "stagger" line.
5. **Manual mode during a batch.**
   - When Pavol switches to manual while a batch runs, the coordinator says in one line that the batch's agents will ask.
   - The check-in reads each running agent's last tool call and tells him of a wait over five minutes.
   - Evidence: section 4. Saves up to a check-in interval, 30 minutes here.
6. **The ladder stage joins the rule of 2026-09-28.** The landed gate's ladder comparison is a rung's "before", and the generator stops asking for a ladder "before". Evidence: item 154. Saves about 30 minutes per rung that measures the ladder.
7. **A reason line that says a function raises, or is a path's device, names where it is bound.** It goes with batch 6.5's measure 4. Evidence: items 135, 137 and 142. A few words per key.

## Part 3. Routing

Each item with its home on `main` at `eb907bed2`. PLAN.md line numbers are at that commit.

**Rows the batch opened, 519 to 532.**
- 519 and 520 (walk's `NN32` `LCM` and the nine natives) and 530 (`RR32`'s integer power) opened and closed.
- 521, 523, 524 and 525, the compiled `CHOOSE` table and powers: "Compiled defects that land gated and unrepaired" (`PLAN.md:360`), no batch named. The gather reads them as phase 4's natives half, but that half's line (`:93`) does not name them. The natives work binds the one library's natives to compiled helpers, and could bind the same `intExp`, `unsignedIntExp`, `unsignedLongExp` and table-bounded `CHOOSE` these rows gate. Home: a clause on `:93` naming the four rows and their pairs.
- 522: its parked line (`:365`). 526: the `try` line (`:361`). 527: the "Loud to loud" line (`:363`). Each has a home, with no batch named.
- 528: its parked line (`:357`). **The line needs changing** (finding 3).
- 529, the compiled `RR32` with `RR32` answering `RR64`: **no line.** Home: phase 4's line on the prelude's own defects (`:98`), beside rows 453, 479 and 481, with 528.
- 531: its parked line (`:358`). It has a home.
- 532, `ReflectiveQuickCheckTest`'s run time against the runners' 600 s cut: **no line.** E's note says E's three passes cut both QuickCheck tests. Home: the script line (`:243`), with the "stagger" item (`:247`). The runner's cut belongs with the load it measures.

**Rows the batch touched or left open.**
- 418, 450, 451, 347, 337 and 435 closed.
- 447 and 505: their owed pairs written; item 18 (`:182`).
- 325: the notes on the quiet `ZZ64` return and the compiled numeral; the item 25 line (`:362`).
- 442: the parked line on the older home-2 tests (`:306`).
- 503: batch 8's residue from the distance table (`:79`), by the row's own note.
- 453: phase 4 (`:98`). **The line describes the past** ("waits on row 450's fix, batch 6.5b's rung E"); the fix has landed.
- 387's new instance and 441's clause: filed.

**Lines the batch made stale.**
- P's reserved stop (`:303`): walk's half is built by `413f36ac0`, and only the compiled half at the switch-over remains.
- Phase 4's row-453 line (`:98`), as above.

**The record's defaults and lists.**
- Section 1's second-run default, "The tests batch N's first run owes go to E", is **not on the defaults line** (`:307`), which lists the first run's. The rest of section 1 is there.
- The rungs' "What comes back to Pavol" lists were **not sent**, and **no line says so**. The landing message gave one line each (`fe616d40…jsonl:48656`).
  - E's list: the refusal's message on each path; `NatRtBigSize`'s restated lines; the interpreter outputs the natives and bodies change (none by value); the owed pairs with their runs; walk's answer on row 325's `nat` face.
  - V's list: the six changed outputs with their causes; no team test line restated.
  - Home: two lines of the form batch N's took (`:348-351`), "on file, not sent", citing `rung-size-range/probes/lists-for-pavol.txt` and `rung-rr32-sibling/probes/for-pavol.txt`. This is batch 7C's measure 4, still unbuilt (`:246`), missed a fourth time.

**Items for Pavol, as the gather and review filed them.**
- The rungs' 22 ids are in the ten parked lines and the row-441 clause (`:353-366`, `:259`). The review's review.1 is on `:306`. All are filed.
- Checked against POSITIONS and INDEX by the rule in "After the landing":
  - Row 528's line **fails**: it re-asks the decision of 2026-09-21 (finding 3).
  - The item 25 line passes: batch N's judge ruled its place undecided, so "no default" is the record's.
  - The static-arithmetic line passes: a judge's decision under a silent point, with its default.
  - The rest pass.

**Between batches.**
- 7b, next: finding 1, the prefix, before its launch; and `RR32` in rung L's list at the re-anchoring (the global questions).
- Batch 8: R9's line gains `numbers.tex:43` and `:46-49` (finding 10), and R1's line gains `RR32`'s four rounding declarations (finding 11).
- FACTS at the next consolidation: E's two distance sites and the tie (finding 8), beside the restart the boot note already lists.

**Script and procedure items.**
- Findings 1, 2 and 4 to 6, and measures 1 to 7 above. None has a line today. Home: the script line (`:243`), and for finding 5 the manual.
- The `atomic_runs` closing grep reads the whole summary. So a red `testFast` line, `# testFast: BUILD FAILED`, makes the four-thread stage exit 1 with all 42 runs `PASS` (`climb-batch-workflow.js:1892`; `JUDGE-gate.md` section 4). Two agents checked the 42 lines by hand. Home: the script line, anchoring the grep to `^# atomic ` lines. **Unrouted.**
- Step 1a's definition of `# repair-tests total` (`climb-batch-workflow.js:2101`) is wrong when a repair changes a file the gate already counted (section 3 above). Home: the script line, one sentence. **Unrouted.**
- Batch 6.5's review measures 2, 4 and 5 still stand on the script line (`:249-253`). Measure 1 is built for repairs (`ONE_JVM`), not for rungs. This run gives measure 4 its third instance (finding 6).

## What I did not do

- I built nothing, ran no Fortress program and no gate stage, and edited no source, test, ledger, plan or record file.
- The distance tie compares two committed tables. It measures nothing new, and it does not run `classify.py`.
- I did not measure how long rung E lost to the kill. Its two base passes stopped at 10:52 and resumed at 11:04, and they then ran beside its edit pass until 11:59. The delay to the rung's end is not separable from the load.
- I did not hand-label the agents' searching. The overlap figure is a proxy by file name.
- Batch 7b's meeting with `RR32`, R9's passage, and P's text against E's natives are by reading.
- I read the transcripts only through the scripts below and bounded greps. I did not measure this review's own cost.

## Files

`batch-6.5b-review/`:
- `agents.py`, `measure.py`, `briefkeys.py`, `overlap.py`: `batch-N-review/`'s scripts with the run set to `wf_07b95462-a7d`, the gate's repair given its own kind, and `briefkeys.py` and `overlap.py` widened to the repair round and the two gather-side repairs. `measure.py` writes `agents.csv` (committed, without the tier column) and `calls.csv` (not committed, 0.5 MB; `measure.py` writes it again), which `overlap.py` reads.
- `aggregate_65b.py` → `summary.txt`: the reading figures beside N's, 7C's and 6b-7R's committed `agents.csv`.
- `briefkeys.txt`, `overlap.txt`: the keys each agent's briefing ran, and searching into briefed files.
- `run_agents.py` → `run_agents.tsv`: every agent's start, end, calls, context at its last turn, and tokens read.
- `waits.py` → `waits.txt`: every wait over two minutes between a tool call and its result, with the command.
- `distance_tie.py` → `distance-tie.txt`: batch N's and 6.5b's per-site distance tables compared by kind, unit and mapped location.

Run from the directory, in this order, with `PYTHONDONTWRITEBYTECODE=1`: `python3 measure.py; python3 aggregate_65b.py > summary.txt; python3 briefkeys.py > briefkeys.txt; python3 overlap.py > overlap.txt; python3 run_agents.py; python3 waits.py > waits.txt; python3 distance_tie.py > distance-tie.txt`.
