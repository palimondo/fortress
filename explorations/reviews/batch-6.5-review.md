<!-- The post-batch review of climb batch 6.5's first run (rung G fd5cb4864, rung P 581356f32; the merged-diff review's corrections 80605eeda, the judge's ruling 930811df4 and its repair abc99d512, the second review's corrections 0a89433ef, the landing record d9c62446e, the landing's routing commit 6016fac3f), the second of the single passes Pavol asked for on 2026-09-28 (POSITIONS, reviews after a batch), in the form of reviews/batch-7C-review.md: conformance, process measures against reviews/process-review-6b-7-7R.md, and the routing check. Written 2026-09-28 from 22:18 UTC by an Opus review worker, reading only, on main at 6016fac3f, and checked against batch N's record at 208f36451, the FACTS consolidation 92e8789c3 and batch 7b's record at 646a9d31b, which landed beside it. Nothing built, no Fortress program run, no stage measured; transcripts read only through bounded scripts, which stay in the session's scratchpad (section "Files"). -->

# Climb batch 6.5's first run: conformance, process and routing

## For Pavol

- Both rungs are in the spirit of the designers. Rung G fixes six compiled-path defects with the team's own devices and the JDK's. Rung P writes your integer rules of 22 and 24 September into the specification in the usual form, with the originals kept.
- One of rung P's reserved stops is listed nowhere. The overview now says that a `GCD` or `LCM` too large for `NN32` or `NN64` throws. Neither path does that yet. The landing record says this stop is listed for your review in the plan; no line of the plan names it.
- Batch N's checker rung needs one fact from this batch before it launches. Over the compiled prelude, `widen(0)` took one declaration in the gate's suite and the other in a fresh compile of the same file. Batch N's record describes today's choice as "whichever declaration the list holds first", and it does not carry the test shape the plan asks for.
- Rung G's dispatch change gives a new compiled answer for two programs that the checker accepts today (row 499). The plan's parked line says answer 9's rule will refuse those programs. Batch 7b's record now doubts that, and asks you as its Q4. The parked line should point there.
- The argument "this defect's test can wait for a later rung" came back a fourth time, in four agents. The review and its judge caught it, and eight tests were written before the push. The rule sentence against it landed 9 minutes after this run launched, so batch N is its first real test.
- Your 19:06 decision already settled most of item 30. A clean worker and a Fable judgement were still briefed on it, about 0.7M tokens. You spotted it. The workflow now has the check, and it held for the batch's other new items.
- Process, in tokens as the harness counts them:
  - All four workers and skeptics read their briefing, all of it.
  - The map reached 2 of the 4, both through a briefing key; none opened a map file. INDEX reached 1 of the 4.
  - The run took 13 agents and 4.96M tokens in 5 h 4 min. The record estimated 16 to 20 agents, 5M to 8M tokens and 5 to 8 hours.
  - The platform's stop at 20:34 cost about 0.62M tokens and 18 minutes.
  - No rung re-ran a stage on its unchanged base: your 14:18 rule held.
- Routing: six rows, the judge's two older owed tests, the record's defaults and the rungs' lists for you have no line in the plan. Section 3 gives each one a home.
- Nothing here needs a decision from you now.

## Part 1. Conformance

### Method

The method is `reviews/batch-7C-review.md`'s, after `batch-7R-conformance.md`. For each rung:
- `git show` first, then its `REPORT.md`, `record.md` and `SKEPTIC.md` (and rung P's `decision-record.md`);
- then the batch record `coordinator/CLIMB-BATCH-6.5.md`, the gather's `compile-ladder/climb-batch-6.5/RECORD.md` with `JUDGE-review.md` and `REPAIR-review.md`, and ledger rows 493 to 502;
- then the landed code and text on `main`, and the specification and team code the rungs touch.

Three standards, kept apart:
1. the specification (`Specification/`, the Types chapter beside it where it speaks);
2. the team's built intent (the code generator, run time and library as the team left them);
3. the decisions on record (`POSITIONS.md`) and `PLAN.md`.

Then batch 5's four global questions. The batch's own checks closed twelve corrections at the gather, five blocking findings of the merged-diff review (repaired under the judge's ruling), and the second review's record fixes. This review cites them and does not repeat them. What the record measured is cited, not measured again; claims marked "by reading" were not run.

### The verdicts

- **Rung G, the compiled run's generics: in the spirit.** Five of its six fixes copy a device the tree or the JDK already has. The sixth is the measured dispatch shadow, landed as the record told it to. That shadow reaches further than it was measured (row 499), and rows 495 to 499 record what the rung left.
- **Rung P, the integer rules in the specification: in the spirit.** Each stated rule is one of your decisions, written in the S1 form with the Working Draft quoted. Its one reserved stop applies the specification's own general rule, which walk and the compiled prelude do not follow yet for the unsigned types.

### Rung G, `fd5cb4864`

**What landed.**
- The loader takes, on every load, the lock the JDK's own `loadClass` takes, `getClassLoadingLock`, which for this loader is its own monitor (`ProjectFortress/src/com/sun/fortress/runtimeSystem/InstantiatingClassloader.java:178-185`).
- A task is generic over its free static parameters (`CodeGen.java:4785-4817`).
- A `typecase` or `catch` clause's name is bound as a local (`CodeGen.java:2059-2061`, `:2131-2137`, `:2156-2164`).
- A generic arm of a template dispatcher is called at the dispatcher's own static parameters (`OverloadSet.java:1338-1370`).
- Answer 7's two identity functions take a typed binding in their `ZZ32` and `RR64` branches (`Library/FortressLibrary.fss:3126-3156`).
- Rows 351, 417, 419, 420, 426, 493 and 494 are closed, and rows 495 to 499 are opened.
- The gate after the repair: `CompilerJUTest` 822, 42 of 42 four-thread runs with `FirstLoadThreadsRungG` three of them, the count 75, the distance 626 (`climb-batch-6.5/RECORD.md:248-255`).

**Standard 1, the specification.**
- Each fix gives the answer the text gives:
  - a task sees the static parameters of the declaration it is in (`Specification/basic/trait-parameters.tex:19-24`, `expressions/also.tex:17-21`);
  - a clause's name is bound (`expressions/try.tex:56-60`, `expressions/typecase.tex:88-99`), so the compiled `cast` of `casting.tex:15-34` now matches;
  - the three dispatch programs are α-equivalent pairs, legal under `overloading.tex:100-107` and answer 9, and they now print the most specific arm (`:262-276`).
- The dispatch change also moves the answer for arms that are not the dispatcher's by position, `box` to `any` and `fixed` to `tag` (`probes/skeptic/dispatch-pos.txt:6`, `:17`, `:38`, `:45`). The chapter gives both answers (`:100-107` with `:136-138`, against `:173-175`), so the skeptic homed it as row 499.

**Standard 2, the team's built intent.**
- The loader's lock is the one the JDK's own `loadClass` takes, which the override had dropped. It is the check-again-under-a-lock pattern of the team's `RttiTupleMap.putIfNewHelper` (`RttiTupleMap.java:148-157`).
- The task fix is `forFnExpr`'s closure device (`CodeGen.java:3479-3489`). The clause binding is `forLocalVarDecl`'s local in a nested scope (`:3959-3962`, `:4018-4027`).
- The identity functions use the library's own coercion at a typed binding (FACTS, "Under walk, the interpreter converts by coercion"). Their walk values are unchanged at every leaf (`probes/skeptic/identity-walk.txt:3-14`).
- In two places G took only the part of a precedent its briefing's reason line named. `forFnExpr`'s `apply` also reserves slot 0 for `this` (`CodeGen.java:3509`), and the task's `compute` does not, so a local in a `do … also` arm overwrites `this` (row 497). The shadow's guard checks counts and kinds, not position (`OverloadSet.java:1342-1353`), which is row 499. The skeptic found both on its first pass (`SKEPTIC.md:140-160`).

**Standard 3, the decisions.**
- Phase 2b's rows 417, 419 and 420 are repaired before the switch-over. Row 417 is gated in the four-thread stage, as `PLAN.md` asked.
- Answer 7: the identity values stay what they were. Design B: the 20 sized compiled tests are unchanged (`probes/compare-sized.txt`). Answer 9: the three programs it makes legal now run.
- Your decision of 19:06 was taken after G's code. It takes applicability on declared, quantified domains, a generic declaration fitting when some instance fits, and the converted call dispatches to the most specific declaration applicable to the values. Item 30's recommended option follows it: the declaration runs at the instance the values fix. Under that option row 499's two programs answer the base's `box` and `fixed`, not G's `any` and `tag` (7b's record's reading, `CLIMB-BATCH-7.md:36`). The same record asks whether answer 9's rule will refuse those programs at all (`:27-38`, Q4). So the answer G landed is interim, and it is not the one the later words give (finding 3).
- The typed bindings are the rung's own choice between two ways on file. The judge kept the library as it is and repaired the test, citing your numeral default of 19:06 (`JUDGE-review.md` section 2). That holds.

**What it left, and where.**
- Row 495 (generic dotted methods, home 2) and the code generation of row 496 are routed to phase 5 by batch 7b's record (`CLIMB-BATCH-7.md:117`). `PLAN.md`'s phase 5 line names neither.
- Row 496's run-time answer is item 30.
- Row 497 (a local in a task body takes slot 0) has its home-2 pair, which the gather wrote. By grep, C4 and the APL sources hold no `also`. By reading, the one library's three `also` arms in `Library/RangeInternals.fss` (`:1016`, `:1212`, `:1236`) declare no local. It has no line in the plan.
- Row 498 (pattern-bound names, home 3) has no line. Row 499 has a parked line, `PLAN.md:230`.
- A compiled `SUM`'s identity end to end waits for the switch-over (FACTS, "The compile ladder loses one file").

**Verdict: in the spirit.** Every fix uses a device the tree or the JDK already has. The one departure, row 499, came from a shadow the record told the rung to land as measured, and it is recorded.

### Rung P, `581356f32`

**What landed.**
- `narrow`, `LSHIFT`, `RSHIFT`, the exact `shift`, and `GCD`/`LCM` nonnegative with their overflow (`Specification/basic-lib/basic-integers.tex:39-66`, `:541-568`, `:725-730`; `basic/operators/opr-overview.tex:262-270`, `:341-344`).
- Row 394's example with the exclusions its definition needs (`basic/conversions-coercions.tex:556-597`).
- `QQ`'s listing with the library's four traits (`basic-lib/numbers.tex:92-94`, `:145-147`, `:217-224`).
- Seven callouts and four Appendix I entries (`appendices/changes.tex:1340-1545`).
- 132 test citations re-anchored, the scalar block's comment reworded, and two owed walk tests.

**Standard 1, the specification.**
- The skeptic ran 36 cases of its own on `ZZ32` and `ZZ64` on both paths, and all matched the text. Under walk, 25 of 27 cases on `NN32`, `NN64` and `ZZ` matched (`SKEPTIC.md:5`).
- The two exceptions are the rung's reserved stop: `LCM` on the unsigned types wraps under walk, and the compiled prelude declares no `GCD` or `LCM` on them. The overview's sentence is the specification's own rule for integer results (`opr-overview.tex:154-155`), as the gather's RC7 wording now says.
- Row 394's revised example runs as printed on both paths, and each clause is shown to be needed (`probes/skeptic/SkCoerceNo32x64`, `SkCoerceNo32x128`).
- Its skeptic found two passages the rung's list had cleared: the `shift` properties (row 500) and `GCD` and `LCM` named idempotent (row 501).

**Standard 2, the team's built intent.**
- The S1 form is written as rungs S, T and X wrote it. Row 394's exclusions are spelled the way the library spells its own integer exclusions (`Library/FortressLibrary.fsi:510-511`). The listing copies `.fsi:387-388` trait for trait.
- `narrow` on `ZZ` is stated because the library declares it and walk truncates it (`BigNum.java:286-290`). The compiled prelude has no `narrow` on `ZZ`, so the text and `XXXZZNarrowRungP` go together if you reverse it (P.worker.2, `PLAN.md:234`).

**Standard 3, the decisions.**
- Rows 335, 334, 333 and 346 of 2026-09-22, batch 3.5's rider on the signed `narrow`, and rows 380 and 381 are each stated as decided (`decision-record.md` section 2).
- The rest follows the decisions on the specification: the name "the Working Draft of February 2011", the Types chapter cited beside (`types.tick:344-351`), and the chapters describing the library (answer 6).
- `QQ`'s listing undoes rung T's decision 2 on the batch record's reading of answer 6. It is parked for your review (`PLAN.md:233`), and your parked question on 0/0 is untouched.

**What it left, and where.**
- Row 500 has a parked line. Row 501 has none. Row 502 is item 31, before the switch-over.
- Walk's half of the unsigned overflow is batch 6.5b's rung E. The compiled half comes at the switch-over, gated in range only by `XXXNNGcdLcmRungP`.
- Appendix I's opening sentence is item 23.
- The misspelling "argments" at `booleans.tex:308-309` lies outside the rung's chapters and was left, rightly.

**Verdict: in the spirit.** It states your decisions in your form, and its own choices are listed for you. One of them, the reserved stop, has no line in the plan (finding 1).

### The global questions

- **Later phases.**
  - Batch N: rung I builds the numeral default where the `widen(0)` pick varied (finding 2). Item 25 meets rung E's restated `NatRtBigSize` in batch 6.5b (finding 7).
  - Batch 7b: row 499 is its Q4. Rung W promotes the two walk tests the repair wrote, which its record carries (`CLIMB-BATCH-7.md:257`). Item 30's default is option 1.
  - Phase 4: rows 442 and 349's three prelude tests are promoted at the switch-over, and item 31 comes before it.
  - Phase 5: rows 495, 496, 497 and row 340's shapes are code-generation holes.
  - Phase 6: the lock's cost was not measurable. The median differences were -42 to +62 ms on runs of 270 to 1,400 ms, which varied by 100 to 500 ms within one loader (`rung-generic-runtime/REPORT.md` section 11). That was at load 4.2 to 5.1, with the other rung and row 488's probe on the box.
- **Built twice.** No. Row 499's two programs are decided by two pieces of code, G's code generator and 7b's checker rule, and Q4 makes that choice explicit.
- **The library's way.** Yes in both rungs, except that G landed the measured shadow as its brief said.
- **What reached you.** Part 3.

### Findings

1. **Rung P's reserved stop is listed nowhere.** Severity: a route to you that does not exist, against the protocol's first hard rule.
   - "Normative text for a rule neither path runs", for the overview's overflow sentence on `NN32` and `NN64` (`opr-overview.tex:264-268`), was met, lifted as reversible and "listed for his review in `coordinator/PLAN.md`" (`climb-batch-6.5/RECORD.md:271`).
   - No line of `PLAN.md` names it. P's other stop is the parked line P.worker.1 (`:233`).
   - Home: one parked line. The text states the specification's own rule; walk wraps until batch 6.5b's rung E; the compiled prelude declares neither operator until the switch-over. The default is the text as landed.
2. **Batch N's rung I describes the numeral tie wrongly and leaves out the shape the plan asks for.** Severity: a named batch (N), before its launch.
   - `PLAN.md:67`, since the judge's repair, asks that one of rung I's compiled tests be `cast[\ZZ64\](widen(0))` over the compiled prelude, "whose pick varied between the gate's suite and a fresh compile".
   - N's record at `208f36451` has `pickn(3)` instead. It says "today the call takes whichever declaration the list holds first" (`CLIMB-BATCH-N.md:122`), and it cites neither row 391 nor the 6.5 captures.
   - The captures show the same kind of call taking `NN32`'s `widen` in the suite and in the gate's rerun with the same seed, and `ZZ32`'s in a fresh compile (`REPAIR-review.md` section 2, deviation 1; row 391's note). `ZZ32`'s is declared first (`CompilerBuiltin.fsi:269` against `:328`).
   - So a base failure captured once may not be what the suite does.
   - Home: rung I's section, before N's Fable review. Cite row 391 and `merged-review/witness-identity-gate.txt`. Capture the base in a suite-shaped run as well as alone, and have the skeptic run the tie tests in the suite's order.
3. **Row 499's parked line rests on a claim now in doubt.** Severity: a line of the plan.
   - `PLAN.md:230` says "answer 9's narrow rule will refuse them" and takes the landed code as the default.
   - 7b's record reads that the return-type condition alone will not refuse them, and that item 30's option 1, which follows your 19:06 decision, gives the base's answers. It puts this to you as Q4 (`CLIMB-BATCH-7.md:27-38`).
   - Home: the parked line points to 7b's Q4. Nothing new is needed in 7b's record.
4. **The rows and items the batch opened are routed only in part.** Severity: lines of the plan. The list is in Part 3.
5. **The deferral argument recurred in four agents.** Severity: a note; it was repaired before the push.
   - The rule sentence landed at 17:17 (`f5d7b8feb`), 9 minutes after this run launched at 17:08.
   - The review that asked for it "before the next launch" was committed at 17:16 (`008b354bf`).
   - Home: none. Batch N is the first run that carries the sentence. Part 2, measure 2, gives the sequencing.
6. **Item 30 was briefed twice after your 19:06 decision had settled most of it.** Severity: a note. It was corrected at the landing (`6016fac3f`), and the check is now workflow text (`climb-batch-workflow.md`, "After the landing"). Part 3 applies that check to the batch's other items; they pass.
7. **Batch 6.5b's half of the record predates item 25.** Severity: a note.
   - Section 1 still calls item 25 open (`CLIMB-BATCH-6.5.md:25`). By reading, rung E's "the type of a size read as a value … stays" agrees with "converts to `ZZ32` as a numeral does".
   - Rung E restates `NatRtBigSize` so that sizes from 2^31 to 2^32-1 read back as values into `ZZ64`. Item 25's words refuse "a larger size used as a value … as an oversized numeral". Whether those reads survive is not settled by reading.
   - Batch N's rung I builds item 25, and neither record names the other.
   - Home: section 1 and rung E of `CLIMB-BATCH-6.5.md` before 6.5b, and rung I of `CLIMB-BATCH-N.md`; whichever runs second names the other's test.

## Part 2. Process measures

### Method

- The run is `wf_fa14416d-889`. Its directory holds 17 transcripts:
  - the 13 agents of the run: two rung workers, two skeptics, the gather, two gates, two reviews, two judges (the first killed at 20:34), the review repair and the commit;
  - four agents that two resume attempts started under new journal keys and stopped within a minute.
- The workers and skeptics are the four agents a like-for-like comparison uses. There was no first skeptic round and no rung repair.
- `process-review-6b-7-7R/measure.py` ran unchanged on these agents, through copies of `batch-7C-review/`'s scripts with the run ID changed.
- Batches 6b to 7R and 7C are read from those notes' committed `agents.csv` files, not measured again.
- The unit is tokens as the harness counts them: each agent's context at its last turn, summed. For the five agents the resumed task ran live, the sum is 1.44M, which matches the harness's notice for that task (1,436,730). No agent compacted.
- Misses are numbered on from `batch-7C-review.md`'s 72. "In the briefing" means printed by that agent's own briefing keys.

### What the agents read

- **The briefing.**
  - All 4 workers and skeptics ran it and read every part the tool announced.
  - Three of them ran it as their first or second call. Rung P ran it at its fifth call, after the batch record.
  - Both judges ran it as their first or second call, and the review repair at its fifth, after the ruling and the review's evidence.
- **The map.**
  - 2 of 4 workers and skeptics, against 3 of 4 in 7C and 11 of 17 in 6b to 7R.
  - Both are the rung workers, through map keys. None of the four opened a map file, and neither skeptic's slice had a map key.
  - Over all 13 agents the figure is 6. The gather's map reads were for editing the map's `runtimeSystem/` row and re-anchoring citations, not for learning from it.
- **INDEX.** 1 of 4, rung P's `index:` key (0 of 4 in 7C, 5 of 17 in 6b to 7R). Over all 13 agents, 1.
- The landing report did not give the share of agents that ran the briefing, which POSITIONS 2026-09-27 (the knowledge base) asks for with each landing. The figures above are that share.

### What reading cost

Means per agent.
- **Rung workers, 2.**
  - Their context at the end was 615K, against 422K in 7C and 497K in 6b to 7R.
  - The briefing was 62K (10%). The plan was 48K for G and 68K for P, and the actual 51K and 72K (`CLIMB-BATCH-6.5.md:303`).
  - Searching was 169K (27%).
- **Skeptics, 2.** The context was 407K. The checks slice was 18K (5%), against 20K and 17K planned. Searching was 91K (22%).
- **Per turn**, workers and skeptics made 0.53 searching calls and read 672 tokens, against 0.55 and 750 in 7C. 25% of their searching calls came before the first edit or probe, against 43% in 7C.
- **Briefing against searching.** 30% of their searching calls opened a file their briefing had printed from, against 28% in 7C. The measure is a proxy by file name.
- **The run.**
  - 13 agents and 4.96M tokens. The workers and skeptics were 2.04M of it (41%), and the briefing was 292K in all contexts (6%).
  - The wall time was 5 h 4 min, from launch at 17:08 to the landing at 22:12. The rungs took 77 and 55 minutes.
  - The record estimated 16 to 20 agents, 5M to 8M tokens and 5 to 8 hours (`CLIMB-BATCH-6.5.md`, section 1, "Cost").

### Misses, by kind

Kind, who caught it, whether it was in the briefing, and whether it landed.
- **Rung G:**
  - 73. The record said the dispatch change "renames an arm whose static parameters match … up to renaming". The guard reads every arm by position (`SKEPTIC.md:142-155`). Row 499.
    - *The measured shadow's reach; in the briefing* (the patch, the scope note's sections 2 to 4). The batch record called it "as measured" (`CLIMB-BATCH-6.5.md:30`).
    - Skeptic. Landed by design, and parked.
  - 74. Row 351's fix does not reach a `do … also` arm, because the task's `compute` never reserves slot 0 where `forFnExpr`'s `apply` does. Row 497.
    - *A sibling site; in the briefing* (the `forFnExpr` key, whose reason line reads "The closure device row 419's fix copies").
    - Skeptic. Its home-2 pair was written at the gather.
  - 75. The rung wrote that a pattern-bound name is made "only" by the coercion desugarer. The team's `patternMatching1.fss:37-43` writes one.
    - *The team's own code; not in the briefing.*
    - Skeptic. Corrected, and row 498 opened.
  - 76. Row 460 was left saying the compiled run cannot read a clause binding.
    - *The ledger; not in the briefing.*
    - Skeptic. Corrected.
  - 77. The rung chose home 3 over the record's home 2 (`CLIMB-BATCH-6.5.md:188`) and did not list the choice as a decision.
    - *A decision inside the rung, not reported.* The home 2 was in the rung's brief.
    - Skeptic. Corrected.
  - 78. `WitnessIdentityRungG` passed a numeral to `widen` over the compiled prelude, where the checker's choice between two coercions varies (row 391). The report said the branches "already have values of their type on both paths" (`REPORT.md:166`).
    - *The record; not in the briefing.*
    - It passed in the rung's and the skeptic's runs, one file per JVM. The gate went red, the review diagnosed it, and it was repaired before the push.
  - 79. The rung deferred row 159's walk test to 7b's rung W, because `ProjectFortress/tests/` was not among its files (`REPORT.md:118`).
    - *A ruling on record not used; the home rule was in the briefing* (POSITIONS 2026-09-19).
    - The review and the judge. Repaired before the push.
- **Skeptic G:**
  - 80. It called the task-arm and code-generator shapes settled by the specification, then homed them in notes, rows 322 and 340 (`SKEPTIC.md:138`, `:225-234`).
    - *A ruling not used; the rule was in the prefix, not the slice.*
    - The review and the judge. Repaired.
  - 81. It claimed "without a coercion" for the task-operand shape with no control; both probes end in row 340's own numeral `else`.
    - *Other: a claim without its control.*
    - The judge. The repair's split showed the shape compiles without the numeral.
- **Rung P** (its skeptic caught 82, 83 and 85):
  - 82. Appendix I said the rule applies "as the team's compiled library already did". The compiled `GCD` and `LCM` are the revival's rung N.
    - *Provenance, the record; not in the briefing.* Corrected (RC1).
  - 83. The laws sentence excluded the infinities, which the chapter itself orders (`numbers.tex:370-371`). Its rationale misstated rung T's reason, and a cross-reference pointed to the wrong section.
    - *The specification elsewhere, in the chapter the rung edited.* Corrected (RC2). The gather's wording is itself listed for you.
  - 84. The rung wrote "as for its other operators" against its own text.
    - *Other: internal.* RC7.
  - 85. The rung's list called `GCD` and `LCM` idempotent in the text, which is false on negative numbers.
    - *The specification elsewhere; not in the briefing.* Row 501.
  - 86. The worker and the skeptic homed the prelude's gaps under the new text to the switch-over, with no test: "the prelude leaves", which batch 6b's judge had rejected.
    - *A ruling not used; the rule was in the prefix.*
    - The review and the judge. Repaired: three `XXX` compile tests.
- **The gather:**
  - 87. It applied `f5d7b8feb`'s rule only to row 497, the row its skeptic had recommended as home 2 (`RECORD.md:42`). It carried 79, 80 and 86 into the plan as defaults, and 81's claim into its rows.
    - *A batch rule, which it cited.*
    - The review and the judge. Repaired.
  - 88. It wrote item 30 as "No default on record" (`RECORD.md:56`). Your 19:06 decision, committed at 19:07 in the plan the gather read, settles which declaration runs.
    - *A decision on record not used.*
    - Caught by you, at 19:54. The clean list (0.40M, from 19:27) and the Fable judgement (0.30M, from 19:53) had already started. Corrected at the landing.
- **The coordinator:**
  - 89. The first resume passed the base as the short hash. FACTS said the journal keys match only on identical arguments. The second attempt met the call order, which was new.
    - Four agents started anew and read files for a minute, 0.32M tokens.
    - Both lessons are now in FACTS (`92e8789c3`).
- **Found by this review:**
  - 90. Row 499's parked line rests on a claim 7b's planner doubts, and it does not name your decision of 19:06 (finding 3).
  - 91. Rung P's reserved stop is listed nowhere (finding 1). A route to you that does not exist.
  - 92. Batch N's rung I leaves out the varying pick and the shape the plan asks for (finding 2). Between batches.
  - 93. Six rows, two older owed tests, the record's defaults and the rungs' lists have no line (Part 3). Routing.
  - 94. Batch 6.5b's record against item 25 (finding 7). Between batches.
  - 95. Measures 2 to 4 of the 7C review have no line (Part 3), and all three recurred here. Routing.
- **Other findings**, record slips such as the dispatch guard's kind test, a "byte-identical" claim, stale comments and counts: about 11 across the gather's twelve corrections and the two reviews' fixes.

### Against the earlier notes

- **Found inside the batch, like for like** (without 81, 84 and 89): 14 in 2 rungs, 7 a rung. That compares with 3.5 in 7C and 2.8 in 6b to 7R.
  - Four of the 14 (79, 80, 86 and 87) are one argument in four agents, so there are 11 distinct causes, 5.5 a rung.
  - By kind:
    - the team's or the shadow's own way: 2 (73, 75);
    - sibling sites: 1 (74);
    - the record or ledger not searched: 3 (76, 78, 82);
    - a decision or ruling not used: 5 (79, 80, 86, 87, 88);
    - the specification elsewhere: 2 (83, 85);
    - a decision inside a rung not reported: 1 (77).
- **In the agent's own briefing: 3 of 14** (73, 74, 79), against 3 of 7 in 7C and 5 of 17 in 6b to 7R. Four more were in the brief or the prefix every agent reads (77, 80, 86, 87).
  - In 73 and 74 the briefing entry's reason line named only the part to take ("remove the switch when you apply it"; "The closure device row 419's fix copies"), and the rest of the entry held the miss.
- **Who caught them.**
  - The skeptics caught 8, every rung-level miss except the deferrals and the witness test.
  - The review and its judge caught 4, and the gate with the review 1 (78).
  - You caught 1 (88).
  - The gather added 2 of its own (87, 88), against 3 in 7C.
- **Landed: 2** (73 by design; 88 until the landing). The rest were corrected before the push.
- **Escaped every check in the batch: 6** (90 to 95), all between batches or in routing, as in the earlier notes.
- **Severity.** Nothing touches a line of the model or blocks the switch-over. The worst is 91, a reserved stop you were told is listed and is not. Next is 92, because batch N launches next.

### Re-measuring what the record held

- **The rungs followed your rule of 14:18.** Rung G took batch 7C's table as its "before", since nothing under `Library/` or `ProjectFortress/` had changed (`REPORT.md` section 11). Rung P captured the count after its edit only.
  - The skeptics re-ran neither stage; they read the committed tables.
  - In 6b to 7R, four rungs spent 87 minutes on such base runs. Here there were none.
- **Rung G ran the distance stage after its edit** (786 s), which its brief did not ask for. It measured the rung's own tree, not a landed table. It explained the class moves the gate then showed (`RECORD.md:66`), so it was useful.
- **The gate after the repair re-ran the count (116 s, on the critical path) and the distance (786 s, beside the other stages).** The repair changed test files only (`RECORD.md:216`). This is the 7C review's measure 2 again, and it is held only in the boot note.
- **Row 488's probe** ran its distance stages in the main tree while the rungs, the gather and the first gate ran there. Its sixth run was stopped when the gather's commit changed the library and the gate rebuilt the tree (`reviews/row-488-probe.md`, "Where I departed"). Its runs added load during rung G's lock-cost timings (load 4.2 to 5.1).

### The 20:34 stop

- The platform's stop was predicted in the boot note.
- It killed the first judge 14 minutes in (301K tokens), and the judge was run again from the start (331K).
- The two resume attempts cost 317K tokens and about a minute (item 89). The ruling ended about 18 minutes later than it would have.
- Everything that had finished came back from the journal.

### Measures the evidence supports, each with its cost

1. **A rung's new compiled tests also run in a suite-shaped run**: several `.test` files in one JVM under a seed, as the gate runs them, beside the one-file runs. The skeptic does the same.
   - Evidence: item 78 passed alone in two agents' runs and failed under the gate's seed.
   - Cost: a few minutes per rung.
2. **A review's "before the next launch" item has a real chance to land before that launch.**
   - Either the next launch waits for the review, about 25 minutes, or the review addresses such items to the batch after next.
   - Evidence: 7C's review landed 8 minutes after this launch, and its measure 1 then missed this run by 9 minutes. That is item 5 of the findings.
3. **File the 7C review's measures 2 to 4.**
   - Measure 2, reusing the first gate's tables after a repair that changes no source, is a script change. It saves about 2 minutes on the critical path and 13 minutes of one core per repaired batch.
   - Measure 3, probing an approved or measured shadow's reach before it lands verbatim, recurred as item 73. Its cost is one skeptic pass per shadow.
   - Measure 4, a parked line saying whether a list was sent, recurred as the missing lines of Part 3.
4. **A reason line names what to take from an entry and what to check in the rest of it.** Evidence: items 73 and 74. It costs a few words per key and is untested.
5. **A probe that reads `ProjectFortress/build` or `Library/` runs in its own worktree while a batch gathers or gates.** It costs one build, about 80 seconds plus the library rebuild.

## Part 3. Routing

Each item the batch opened, left or listed, with its home on `main` at `6016fac3f`. Every item the batch added to `PLAN.md` was checked against `POSITIONS.md` and the notes `INDEX.md` lists, by the rule now in `climb-batch-workflow.md` ("After the landing").

**Rows the batch opened.**
- 493 and 494 are closed.
- 495 (generic dotted methods, home 2) and 496's code generation are routed to phase 5 by 7b's record (`CLIMB-BATCH-7.md:117`). They have **no line in `PLAN.md`**. Home: phase 5's code-generation line (`PLAN.md:96`).
- 496's run-time answer is item 30. It has a home.
- 497 (slot 0 in a task body, home 2 pair written) has **no line**. Home: phase 5's code-generation line, with row 322's task-arm shape and `XXXTryInArmRungG`.
- 498 (pattern-bound names, home 3) has **no line**. Home: a parked line, off the path.
- 499 has a parked line (`:230`). **The line needs changing**: it should point to 7b's Q4 and name your 19:06 decision (finding 3).
- 500 has a parked line (`:235`). It has a home.
- 501 (`GCD` and `LCM` called idempotent) has **no line**. Home: a parked line, or the next specification rung that edits `advanced-lib/algebraic-constraints.tex`.
- 502 is item 31. It has a home.

**Rows the batch touched or left open.**
- 159: the walk tests are gated, and rung W promotes them (`:231`; `CLIMB-BATCH-7.md:257`). It has a home.
- 391: a parked line (`:232`) and batch N's line (`:67`). **Not carried into N's record** (finding 2).
- 442 and 349: their prelude tests are promoted at the switch-over, and item 31 sits there. They have a home.
- The judge's older owed tests, row 322's own `atomic`-arm shape and row 442's batch-6 faces (`JUDGE-review.md` section 5), have **no line**. Home: one parked line naming the owed home-2 tests, row 442's for phase 4.
- The tuple shifts of `Library/RangeInternals.fss` have no row since the batch 3.5 and 4 review (`batch-3.5-4-conformance.md:295`). This record left them out (`CLIMB-BATCH-6.5.md:35`), and there is **no line**. Home: batch 6.5b's rung E, which edits the neighbouring range bodies, opens the row with a probe. Its citations predate batch 7R's respelling, so they must be re-read.

**The record's defaults and lists.**
- Section 1's "Read from the record, not asked" and "What the batch leaves out" (`CLIMB-BATCH-6.5.md:19-38`) have **no line**. Batches 7R and 7C have one each (`PLAN.md:224`, `:227`).
- The rungs' "What comes back to Pavol" lists were **not sent**, and **no line says so**:
  - G's: which of the six are fixed, and the lock's shape and measured cost;
  - P's: the revised pages as the `pdftotext` diff, the Appendix I entries, and the list.
  - The landing message gave the fixes in one line and nothing of the lock's cost or P's pages.
- Home: one parked line in the form of `:227`, "on file, not sent". It names section 1's defaults and lists the item 25 default as superseded by your decision of 19:17.

**Items for Pavol, as the gather and repair filed them.**
- G.worker.1 and G.skeptic.2 are item 30. G.skeptic.1 is `:230`. G.worker.2 and G.skeptic.3 are `:231`. judge-review.1 is `:232`. P.skeptic.1 is item 31. P.worker.5 is item 23's sentence. P.worker.1 is `:233`, P.worker.2 and 3 are `:234`, P.worker.4 is `:235`, and P.worker.6 is `:236`. All filed.
- P's first reserved stop has **no line** (finding 1).

**Items the batch added to `PLAN.md`, checked against `POSITIONS.md` and INDEX.**
- Item 30: before its rewrite it failed the check (item 88). As rewritten in `6016fac3f`, it cites decision 1 and names only the instance as new. It passes.
- Item 31: no entry decides `widen` on `ZZ`. The nearest are row 346's `narrow` and batch 3.5's rider, both truncating, and the JVM principle of 2026-09-22; the item gives the `narrow` analogy and walk's behaviour. No note in INDEX is on `widen`. It passes. It could name row 346's entry as the nearest decision.
- `:230` (row 499): it does not name your decision of 19:06. It fails (finding 3).
- `:231` to `:236`: each agrees with answer 9, answer 6, the numeral default of 19:06, and rows 346 and 440. They pass.
- Batch N's line (`:67`): it agrees with decision 1. It passes, but it is not carried (finding 2).

**The 7C review's measures** (`batch-7C-review.md:199-202`).
- Measure 1 is built (`climb-batch-workflow.md:35`).
- Measure 2 is only in the boot note ("For the batch script, after the queue allows").
- Measures 3 and 4 have no home.
- Home: parked lines, or the script's next change, with Part 2's measure 3.

**For the records re-anchored beside this review.**
- `CLIMB-BATCH-N.md` (`208f36451`): findings 2 and 7.
- `CLIMB-BATCH-7.md` (`646a9d31b`): nothing new. It carries row 499 as Q4, the promotion of the two walk tests, rows 495 and 496 to phase 5, and item 30's default.

## What I did not do

- I built nothing, ran no Fortress program and no gate stage, and edited no source, test, ledger, plan or record file.
- I did not measure finding 2's order dependence, finding 7's `NatRtBigSize` reads under item 25, or row 497's reach into the library; each is by reading.
- I did not hand-label the agents' searching. The overlap figure is a proxy by file name.
- I read the transcripts only through the scripts below and bounded greps. I did not measure this review's own cost.

## Files

The scripts ran from the session's scratchpad (`b65review/`) and are not committed, since this review commits one path. To reproduce, copy `batch-7C-review/`'s `agents.py`, `measure.py`, `briefkeys.py` and `overlap.py`, and make two changes:
- in `agents.py`, `RUNS = [('wf_fa14416d-889', '6.5')]`;
- in `measure.py`, the earlier note's `measure.py` path made absolute.

Run `measure.py`, `briefkeys.py` and `overlap.py`. The aggregate is `batch-7C-review/aggregate.py`'s sections with three changes: the three groups 6b to 7R, 7C and 6.5; the four resume-miss agents (`a2d9dd5531f7e3c34`, `af265c233d597c454`, `aa6d790d80dd267e5`, `ab89b8223bdc431e0`) left out of the comparisons; and the killed judge (`a438568fef7fd46b8`) kept in the run's total.
