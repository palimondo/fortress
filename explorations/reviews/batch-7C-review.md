<!-- The post-batch review of climb batch 7C (rung Y 079f54ea9, rung X d8e0cd28e; the merged-diff review's corrections d357c9cc4, the judge's ruling 18e4ffabe and its repair f052e82f5, the second review's section 0f00db11a, the landing record cd9305c2d), the first of the single passes Pavol asked for on 2026-09-28 (POSITIONS, reviews after a batch): conformance in the form of reviews/batch-7R-conformance.md, process measures in the form of reviews/process-review-6b-7-7R.md, and the routing check. Written 2026-09-28 from 16:51 UTC by an Opus review worker, reading only, on main at 88ccf8217: the routing commit, which filed 7C's rows in PLAN.md at 17:01 UTC while this review ran, is the plan checked here; committed on 26aaf98d9, where every PLAN.md line cited still holds and FACTS.md:69 is as the consolidation 4a403cdb7 left it. Nothing built, no Fortress program run; transcripts read only through bounded scripts. Scripts and captures in batch-7C-review/. -->

# Climb batch 7C: conformance, process and routing

## For Pavol

- Both rungs are in the spirit of the designers. Rung Y lands the checker rule you approved, as approved. Rung X writes it into the traits chapter in the usual form, with the Working Draft's note kept in the appendix.
- The batch's own checks worked. The skeptics found every miss inside the two rungs, two of them in the approved code itself: row 489 (the verdict depends on how a type variable is spelled) and row 490 (extenders found by name). The merged-diff review and its judge found the gather's three misses and had them repaired before the push.
- One question is filed too late. Item 26 asks about the passages that read a `comprises` clause at the level of types, and it is filed before batch 8. One of those passages is the Meet Rule's example, in the overloading chapter that batch 7b's rung S rewrites. So it belongs before batch 7b.
- Row 492's repair is filed to batch 8's meet-rule rung. Probe P2 made that rung a library rung, with no checker step. The two places the repair touches are in the files batch 7b's rungs C and W edit. Batch 7b's record should name the row and its two expected-failure tests.
- One measurement problem needs a probe before batch N, not in batch 8. Row 488: the checker's errors on the library move with what it checked earlier in the same run, and the gate reads such moves as noise. The suspected cause is the checker cache the revival added in batch 3, and FACTS still says that cache changed no answer. Batch N's checker rung may edit the file the cache lives in.
- The rule the specification now states is stricter than the 2012 Types chapter in two cases: a generic subtrait that nothing extends, and a chain of two generic subtraits whose values are all listed. Both are the checker's limits written into the text, while the appendix presents the rule as the Types chapter's reading. The second case has no ledger row. This is a note; it can join the parked line on X's wording, with the text as landed as the default.
- Process, in tokens as the harness counts them (each agent's context at its last turn):
  - All four workers and skeptics read their briefing first, and read all of it. The map reached three of them and INDEX none: no briefing carried an INDEX key.
  - A rung worker's briefing was 41K tokens, as the planner predicted, against 54K in batches 6b to 7R. Searching stayed about a quarter of an agent's context.
  - The run took 12 agents and 3.7M tokens; its record estimated 4.5M to 5.5M.
  - The same rejected argument came back a third time: a settled defect's test left for "a later rung" (batch 6b, batch 7R, now 7C's gather). The fix proposed this morning, one sentence in the workflow's rule text, is not in place.
  - Two runs reproduced tables already on file. Rung Y's before-tables took about 14 minutes; its record asked for them before your decision of 14:18. The gate after the repair re-ran the count and distance stages, though the repair changed no library or checker file.
  - A review like this one costs about a seventh of a batch run in these tokens (the 7R review 0.46M against the run's 3.15M), not the 4% the earlier note gave in its weighted unit.
- Routing: after the routing commit every row, default and list has a line. Besides the three placements above, row 22 (walk never checks a clause) has none, and batch 8's line does not name the self-type way for `Integral`'s bodies that the judgement left to it. The parked line says the rungs' lists "came with the landing"; the landing message carried the counts, not Y's diff or X's revised page.
- Nothing here needs a decision from you now. Moving item 26 earlier changes only when you are asked.

## Part 1. Conformance

### Method

The method is `reviews/batch-7R-conformance.md`'s, which follows `batch-6-conformance.md` and `batch-5-conformance.md`. For each rung:
- `git show` first, then its `REPORT.md`, `record.md` and `SKEPTIC.md` (and rung X's `decision-record.md`), the batch record `coordinator/CLIMB-BATCH-7C.md`, the gather's `compile-ladder/climb-batch-7C/RECORD.md` with `JUDGE-review.md` and `REPAIR-review.md`, ledger rows 487 to 492, the judgement `reviews/anyintegral-comprises-judgement.md` and the ways note `reviews/anyintegral-comprises-ways.md`;
- then the landed code and text on `main`;
- then the specification, the Types chapter and the team's code the rungs touch.

Three standards, kept apart: the specification (`Specification/`, with `Documentation/Specification/Prose/Language/types.tick` beside it where it speaks, which 7C adopts for `comprises`); the team's built intent (the checker and the library as the team left them, their tests); the decisions on record (POSITIONS 2026-09-28, `AnyIntegral`'s clause, "Option 1.") and `PLAN.md`. Then batch 5's four global questions.

The batch's own checks closed twelve corrections at the gather (Y five, X seven), two findings of the merged-diff review (the Effect's sentence on row 490; row 492's owed tests) with the judge's repair, and the record fixes of both reviews. This review does not repeat them and cites them where a finding builds on them. What the record measured is cited, not measured again. Claims marked "by reading" were not run.

### The verdicts

- **Rung Y, the checker: in the spirit.** It is the approved code without its switch, and it makes the library's clause check as the team meant it (their "not yet" comment, `Library/FortressLibrary.fsi:434`). Where it departs from the checker's own devices, rows 489 and 490, its skeptic found it and the record parked it for you.
- **Rung X, the specification: in the spirit.** The S1 form, the Types chapter's words where they reach, the original kept whole. The rule it renders is stricter than the Types chapter in two shapes, and its rationale does not say so (finding 3).

### Rung Y, `079f54ea9`

**What landed.** A fourth case in `isEligibleToExtend` and the method `everyKnownSubtypeListed` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala:252-287`), three compiler tests, rows 487 to 490. The count stage 10 to 75, the distance 627 to 626 (the landing, `climb-batch-7C/RECORD.md:301-302`).

**Standard 1, the specification.**
- The Working Draft's draft note refused the clause (`Specification-1.0-frozen/basic/traits.tex:231-235`). The Types chapter reads a clause as coverage (`types.tick:384-390`) and "states no rule about extenders" (the judgement, section 1, item 5). Welterweight's D-Trait asks nothing of the traits that extend a closed trait (`Papers/Welterweight/fig-wellformeddecls.tick:38-62`). The rule is a check that coverage holds over the declarations in view, and it accepts `AnyIntegral`'s clause, which the Types chapter allows.
- It is stricter than coverage in two shapes:
  - "At least one" extender. Under coverage a generic subtrait that nothing extends has no values and is covered. The rule refuses it (`XXXComprisesGenericUnlisted`'s first arm).
  - Immediate extenders only. `SkTwoLevel` (`trait Sized2[\X\] extends Sized[\X\]`, one object below the listed `Round`) has every value listed. The base's and the landed checker both refuse it; walk prints `round` (`compile-ladder/rung-comprises-checker/probes/skeptic/SkTwoLevel.fss`, `differential.txt:106-120`). The skeptic called it "narrower than the coverage reading" (`SKEPTIC.md:123`).
- It is weaker in the other direction: another unit's extender (row 487), and the name capture that accepts a false clause (the note on row 414, `SkCrossedSameName`).

**Standard 2, the team's built intent.**
- The rule extends Sukyoung Ryu's `isEligibleToExtend` of 2009 (`360905925`) with a fourth case, keeping the team's numbering (`REPORT.md` section 12, decision 1).
- "At least one" keeps the team's pinned behaviour, by reading: `Compiled9.z`'s second error, which the broad form loses and a rule without "at least one" would lose too (`ProjectFortress/compiler_tests/XXX9z.test`; the ways note, way 10). So that condition has a source in the team's tests, not in the 2012 texts.
- The checker's own devices, beside the new lines: the call site puts the closed trait's clause into the subtrait's variables (`subst_comprises`, `:199-202`), and case 3 resolves a name to its declaration (`getTypes`, `:263`). The new method uses neither. It matches extenders by the simple text of a name (`:279`) and compares without putting the extender's own arguments in (`:283-284`). Those are rows 490 and 489. Both devices were printed in the rung's and the skeptic's briefing (`batch-7C-review/briefkeys.txt`, the two `TypeHierarchyChecker.scala` keys). The rung was told to land the shadow as it was (`CLIMB-BATCH-7C.md:96`), so the miss is the shadow's, approved on 2026-09-21 and put to you again on 09-28 (process item 62).
- The team's own statement of the rule, `Compiled10.i.fss:15-21`, and the header of `checkDeclComprises` (`:143-147`) still list three cases. Parked (`PLAN.md:216`).

**Standard 3, the decisions.**
- The decision's words are "a generic child of a closed trait is eligible when every type the checker knows under it is listed". The code reads "under it" as the immediate extenders, so `SkTwoLevel` is refused. That is a fourth corner beside the skeptic's three (`SKEPTIC.md:199-204`), and it is the judgement's own text too ("every type that extends it is a subtype of a listed type", the judgement's section 3). Decided, not the rung's.
- Route A holds: no self type entered. The library route holds: nothing was added to the compiler library. The count was declared as measured, 75, the prediction 10 plus 65. Row 459 closed with its gated test, and the hole got its row.

**Verdict: in the spirit.** It is your option 1 as written. Its departures from the decision's words (rows 489 and 490) come from the approved lines, and they are gated or rowed and parked.

### Rung X, `d8e0cd28e`

**What landed.** The draft note's first sentence replaced by rendered text (`Specification/basic/traits.tex:235-252`), a callout (`:253-267`), the note's second sentence and the `Molecule` example unchanged; Appendix I's I.1.20 (`Specification/appendices/changes.tex:1246-1338`); two test citations re-anchored; rows 491 and 492. The gather's corrections made the proviso speak of static variables, and the repair made the Effect's sentence on row 490 exact.

**Standard 1, the specification.**
- The coverage sentence ("every value of type T is a value of one of the listed types") and the proviso on listed instantiations render the Types chapter's "determined by" (`types.tick:277-283`, `:384-390`) in the specification's terms. Victor Luchangco's third question is answered (`traits.tex:166-170`, `:266-267`).
- The eligibility rule is the checker's, with Y's two strict shapes. The callout says "The revival states the reading of the team's later Types chapter ... and of the type group's calculus Welterweight Fortress", and the Rationale quotes both (`traits.tex:257-259`; `changes.tex:1270-1285`). Neither text states "at least one" or a rule about extenders. The Effect lists where the checker departs from the text (rows 487, 489, 490) and does not say where the text asks more than the reading it names. The conditions are decided: the judgement's Change text, which option 1 adopted, holds both. What is missing is the provenance and a row for `SkTwoLevel` (finding 3).

**Standard 2, the team's built intent.**
- The S1 form as rung S built it, with the model callout and entry in the same section (`traits.tex:181-185`; `changes.tex:119-146`), and rung U's "does not follow from route A" sentence. Decision 11, re-anchoring from the text each citation was written against, is right, and its skeptic checked it by content.
- Correction 1 makes the team's own "not yet" spelling, `comprises Integral[\I\] where [\I\]`, no valid clause. That comment is Ryu's of 2009 (`3d2849cef`). The Types chapter of 2012 excludes it by "determined by", and under your weighting of 2026-09-23 the later word governs. So the correction is in the spirit. It is parked with the text as default (`PLAN.md:218`).

**Standard 3, the decisions.**
- The decision put the S1 callout in place of the draft note. The judgement's Change says the note's first sentence "becomes rendered text", and X did that.
- Decision 2 applies the third case to every trait with static parameters, following the decision's "a generic child" and Y's code over the judgement's narrower words. Its skeptic measured the case (`SkGenSameParams`).
- The four passages that read a clause at the level of types were reported and not chosen, as the batch record's stop requires. Where they are filed is finding 1.

**Verdict: in the spirit.** It writes your decision in the team's layered form, the originals kept. Its rationale overstates how much of the rule is the 2012 reading.

### The global questions

- **Later phases.**
  - Batch N. Rung I may edit `TraitTable.scala` (`CLIMB-BATCH-N.md:125`), where row 488's suspected cause lives, and its inference will add subtype queries of its own (finding 4). Rung T's Appendix I entry now follows I.1.20; that is routed (`PLAN.md:66`).
  - Batch 7b. Rung S rewrites `Specification/advanced/overloading.tex` to the 2011 paper's rules, the Meet rule among them (`CLIMB-BATCH-7.md:102-112`, `:117`). The Meet Rule's example, item 26's second passage, is in that chapter (finding 1). Rung C edits the checker's overloading files (`CLIMB-BATCH-7.md:150`; P1's shadow is of `OverloadingChecker.scala`, `compile-ladder/plan-7b/probes/P1.md:41`), where the compiled refusal of row 492 is (`:418`). Rung W rewrites walk's overloading in `OverloadedFunction.java` (`CLIMB-BATCH-7.md:182`). Under item 28's recommendation it also lifts walk's load check for the sets the checker accepts, a meet case among them (`reviews/conversion-overloading-judgement.md:151`, `O2Meet`). Walk's refusal of row 492 is that load check (`OverloadedFunction.java:439-472`, the row's note). See finding 2.
  - Batch 8. For the self-typed `Integral` bodies (28 errors), the judgement left its alternative there unmeasured: way 3, `Integral ... comprises I` with row 407's six-line walk edit, "a reason to revisit in batch 8" (the judgement, sections 3 and 4). X's text leaves a bare type variable in a clause open (`decision-record.md` section 2), so it forecloses nothing. Batch 8's line does not name it (routing).
  - Phase 4. The api now reaches its overloading and return-type checks, which it must for the switch-over. The 66 errors that came into view have homes, checked name by name: rung L's families (`CLIMB-BATCH-7.md:43`, `seq` and `String`'s juxtaposition against the ring), the Meet Rule class (`:55`; the fourth juxtaposition is `String`'s own pair, `plan-7b/probes/P1.md:122`) and the return-type slips (`:63`; `unsigned` among them, `plan-7b/probes/P2.md:76`). Rows 487, 489 and 490 touch no library declaration (the count stage has no `comprises` error) and no microGPT file (no `comprises` in `explorations/run-c4/src/` or `explorations/apl/mg/`).
  - Phases 5 and 6. Nothing.
- **Built twice.** No. The rule is now stated in four places: the code's comment (four cases), `checkDeclComprises`'s header and `Compiled10.i.fss` (three, parked), and the specification. The specification states it in terms of types, so row 489's repair would not change the text.
- **The library's way.** Rung Y: the checker's own substitution and name resolution were not used (rows 489 and 490, from the approved shadow). Rung X: yes.
- **What reached you.** See Part 3.

### Findings

1. **Item 26 belongs before batch 7b, not batch 8.** Severity: a named batch (7b).
   - Item 26's second passage is the Meet Rule's example (`Specification/advanced/overloading.tex:275-307`, `PLAN.md:157`). Batch 7b's rung S rewrites that chapter to the paper's three rules, Meet among them, with a list of every passage it touches (`CLIMB-BATCH-7.md:102-112`, `:117`). Batch 7b runs before batch 8 (`PLAN.md:70`, `:74`).
   - The placement "before batch 8, whose meet rule reads the intersection of two traits" is X's (`decision-record.md` section 4, P2: "batch 8 holds the meet rule's library work"), and the gather, the judge and the routing kept it.
   - Home: item 26 under "Before batch 7b"; 7b's rung S section names row 491 among the passages it leaves unless you have answered.
2. **Row 492's repair is in batch 7b's files, not in batch 8's library rung.** Severity: a named batch (7b's record).
   - The judge ruled that batch 8's meet-rule work is "a library rung of devices, with no checker step" and that row 492's fix sites "no planned rung touches" (`climb-batch-7C/JUDGE-review.md:63`). The first half is P2's (`plan-7b/probes/P2.md:18`). The second is not so: rung C edits the checker's overloading files and rung W walk's `OverloadedFunction.java`, including, under item 28, its load check (global questions above).
   - The routing then filed "row 492's fix in the meet-rule rung" (`PLAN.md:76`), which is that library rung.
   - Row 492's two gated tests, `ProjectFortress/tests/XXXComprisesMeetWalk.fss` and `ProjectFortress/compiler_tests/XXXComprisesMeetCompiled.test`, are verdicts rungs C and W can flip.
   - Home: batch 7b's record names row 492 in C's and W's sections: its two `XXX` files are verdicts to keep, or to flip on purpose with the row closed. Batch 8's line keeps it only if 7b leaves it, and then as a walk and checker rung.
3. **The rendered rule is stricter than the reading it names, and one of the two shapes has no row.** Severity: a note.
   - The two shapes and their sources: Rung Y, standards 1 and 2. The callout and Rationale: Rung X, standard 1.
   - Home: a ledger row for `SkTwoLevel` (a program whose clause is true by the Types chapter, refused by the text and the checker, accepted by walk) at the next gather, or a note on row 491; one sentence in the parked line on X's wording (`PLAN.md:219`), with the text as landed as the default; the next rung that edits Appendix I adds to I.1.20's Effect that the extender requirement is the compiled checker's, and stricter than the coverage reading in these two shapes.
4. **Row 488 needs a probe before batch N.** Severity: a named batch (N).
   - What it is: the landed checker adds one error to the body check and changes three others, deterministically, because the new rule's subtype queries ran first (`rung-comprises-checker/probes/skeptic/distance-attribution.txt`; row 488).
   - Why before N. The gate's comparison reads such moves as variation (`coordinator/tools/distance/compare.sh:16-18`). The stop "a new checker error the distance stage shows as caused rather than unmasked" rests on telling the two apart; rung H met it in these same families of moving errors (`PLAN.md`, the parked line on rung H's stop). Batch N's rung I may edit `TraitTable.scala` and adds inference queries.
   - What the record says against it. FACTS says of the cache that "no answer of the checker changed" (`coordinator/FACTS.md:69`), measured on the count stage and the compiler tests (`d28cf74d0`), not on the distance stage. Row 488 names that cache as the suspected cause, keyed by `TraitType` alone (`TraitTable.scala:81-97`).
   - The settling run was tried at the wrong size: the skeptic ran the whole distance stage with the cache off, twice, and stopped each after 30 minutes and 50 declarations (`SKEPTIC.md:154`).
   - Home: a probe under "Work that can start now": the three sites' declarations checked with the cache on and off, in one run each way, on the landed tree. The FACTS line on the cache qualified by row 488 (the FACTS consolidation's). Batch N's line names row 488 for rung I. The repair stays on batch 8's line.

## Part 2. Process measures

### Method

- The run is `wf_5c4d7157-2e7`: 12 agents, all on the same Opus tier. Workers and skeptics are rung Y, rung X and their two skeptics: four agents. There was no first skeptic round and no repair round. The judge, the review repair, the two reviews, the gather, the two gates and the commit are reported apart.
- The earlier note's `measure.py` runs unchanged on these agents (`batch-7C-review/measure.py`). Batches 6b, 7 and 7R are read from its committed `agents.csv`, not measured again.
- **The unit.** Tokens as the harness counts them: each agent's context at its last turn, summed over the agents. For 7C this equals the workflow notice's 3,707,091 (`summary.txt` section 1). A tool result counts once, at its size, if it is still in context at the end; no agent compacted. The earlier note's ITE figures are not used.
- Findings use the earlier note's kinds and numbering, which continue from its 59. "In hand" means printed in that agent's own briefing (`briefkeys.txt`).

### What the agents read

From `batch-7C-review/summary.txt`, sections 2 to 4.
- **The briefing.** All 4 workers and skeptics ran it as their first or second tool call and read every part the tool announced. Against 17 of 17, 11 of them first, in batches 6b to 7R. The judge and the review repair did too.
- **The map.** 3 of 4 (75%), against 11 of 17 (65%). Rungs Y and X had a map key and also opened the map. Skeptic X opened it only to check a citation.
- **INDEX.** 0 of 4, against 5 of 17. No briefing carried an `index:` key, and no agent opened it.
- The landing message said the map reached 5 of 12. By tool calls it is 4 of 12. The gather's two mentions are in report text it wrote, not reads.

### What reading cost

Means per agent, from `summary.txt` sections 5 to 7.
- **Rung workers, 2.** Context 422K at the end, against 497K in 6b to 7R. The briefing was 41K (10%), against 54K (11%). Searching was 118K (28%), against 146K (29%).
- **Skeptics, 2.** Context 369K, against 362K. The briefing slice was 11K (3%), against 16K (4%). Searching was 84K (23%), against 68K (19%).
- **The planner's sizes held.** Rung Y's briefing was 48K, predicted 46K. Rung X's was 35K, predicted 33K. The skeptics' slices were 14K and 7K, predicted 13K and 7K (`CLIMB-BATCH-7C.md:252`). The earlier note found 54K against 29K planned.
- **Per turn**, workers and skeptics searched more: 0.55 calls and 750 tokens, against 0.45 and 606. 43% of their searching calls came before the first edit or probe, against 30%.
- **Briefing against searching.** About a quarter of the workers' and skeptics' searching opened a file their briefing had printed from: 83 of 294 calls, 116K of 404K tokens (`overlap.txt`). Most of it is rung X reading the chapter it was editing, which is the work, not waste. It is a proxy by file name, not a label.
- **The run.** 12 agents, 3.71M tokens, 4.5 hours of the workflow. Workers and skeptics were 1.58M of it (43%). The briefing was 146K across all contexts (4%).
- **Against the record's estimate.** It said 14 to 18 agents, 4.5M to 5.5M tokens and 4 to 6 hours for the batch, and 8 agents and 2M for the tail (`CLIMB-BATCH-7C.md:18`, `:39`). Actual: 12 agents, 3.7M, 4.5 hours; the tail 8 agents and 2.1M.

### Misses, by kind

Numbered on from the earlier note's 59. Kind, who caught it, whether it was in hand, and whether it landed.

- **Rung Y:**
  - 60. The worker read the distance stage's extra BR error as variation between setups, following the FACTS reading of those families, where a pair of runs in one setup settles it. *Other: a claim by reading; the FACTS entry was in hand and did not apply here. Skeptic.* `rung-comprises-checker/SKEPTIC.md:140-158`. Corrected at the gather; row 488 rewritten.
  - 61. "Which can only refuse more", said of the name match; it can also accept. *Other: a claim by reading. Skeptic.* `SKEPTIC.md:108-116`. Corrected.
  - 62. Row 489: the approved code compares an extender without putting in the extender's own arguments, where the call site already has the substitution. *The checker's own device, in hand (the call-site key). Skeptic.* `SKEPTIC.md:84-99`. Landed as approved, gated, and parked for you.
  - 63. Row 490: extenders found by the simple text of a name, where case 3 resolves the name with `getTypes`. *The checker's own device, in hand (the rule's key). Skeptic.* `SKEPTIC.md:108-116`. Landed as approved, home 3, parked.
  - Items 62 and 63 predate the batch. The code is the shadow of 2026-09-21, which the ways note and the judgement measured on the library's shape, `zElig` and `zElig2`, the guards, the 39 compiler tests with a clause and the user-integral probe. They did not try a generic closed trait, or a trait of the same name in another api. The judgement's "What the record does not hold" does not name those shapes (its section 4). The batch's first skeptic found both within its first pass.
- **Rung X:**
  - 64. The proviso said "static parameter", so it admitted a `where`-clause variable. The Appendix I entry that defines the term and the judgement's "each of whose parameters is a parameter of the declaring trait" were in its briefing. *Specification elsewhere, in hand. Skeptic.* `rung-spec-comprises/SKEPTIC.md:33`. Corrected at the gather.
  - 65. The Rationale's "cannot be listed" contradicted the text and the callout. *Other: internal. Skeptic.* `:46`. Corrected.
- **The gather:**
  - 66. It wrote the Effect's sentence on row 490 from the row's title, not its capture, so the specification said the same-named trait counts, where its extenders do. *The record's own measurement not read. The merged-diff review; the judge.* `climb-batch-7C/JUDGE-review.md` section 1. Repaired before the push, after the first gate. Three sibling record sites were fixed with it.
  - 67. It left row 492, home 2, without its gated tests and asked you which rung writes them. *A ruling on record not used: batch 7R's judge (rows 481 and 482) and batch 6b's before it; the rule itself was in the gather's prompt. The review; the judge.* `JUDGE-review.md` section 2. Repaired before the push.
  - 68. It named batch 8's meet-rule rung as the tests' owner, against probe P2, which makes that rung a library rung. *The record not searched. The judge.* `JUDGE-review.md:63`. Settled by 67's repair.
- **The batch record:**
  - 69. Rung Y's file list left out the header of `checkDeclComprises`, the sibling of the comment it asked to keep true. *Sibling site, planner-side. The worker itself reported it.* `rung-comprises-checker/REPORT.md` section 12, decision 7. Landed, parked (`PLAN.md:216`).
- **Found by this review:**
  - 70. Item 26's passage and row 492's repair sites lie in batch 7b's chapter and files; every agent that placed them said batch 8. *The record not searched, between batches.* Findings 1 and 2.
  - 71. Row 488 is filed to batch 8, where it bears on every distance reading before it, and FACTS keeps a line it contradicts. *The record contradicted, between batches.* Finding 4.
  - 72. The parked line says the rungs' lists "came with the landing". *A route to you that does not exist.* Part 3.
- **Other findings**, record slips such as line numbers, counts and provenance glosses: about 20 across the gather's twelve corrections and the two reviews' record fixes.

### Against the earlier note

- **Found inside the batch, like for like** (the earlier note's kinds, without 60, 61 and 65): 7 in 2 rungs, 3.5 a rung (62, 63, 64, 66, 67, 68, 69). Against 17 in 6 rungs, 2.8 a rung.
  - The checker's own way: 2 (62, 63).
  - The record not searched or not read: 2 (66, 68).
  - A decision or ruling not used: 1 (67).
  - Sibling sites: 1 (69).
  - Specification elsewhere: 1 (64).
- **In hand and missed: 3 of 7** (62, 63, 64), against 5 of 17. The two in the approved code were printed in the briefing as the rule's own lines; seeing the device in the lines is what the skeptic did.
- **Who caught them.** Skeptics 3; the review 2; the judge 1; the worker 1. The skeptics caught every miss of the two rungs. The gather made 3 of the 7; in 6b to 7R gathers shared 2 of 17, each after its skeptic. The review and its judge caught all three before the push.
- **The repeat.** 67 is the earlier note's 41 and 55 again: the argument that a settled defect's test can wait for a later rung, rejected by 6b's judge on 09-27 and by 7R's on 09-28, made a third time by 7C's gather. The earlier note's measure 3 put the ruling into the rule's own text (`process-review-6b-7-7R.md` section 9). `coordinator/climb-batch-workflow.md` has no such sentence, and POSITIONS 2026-09-28 took that note's measure 4 and the single review, not measure 3.
- **Landed: 3 of 7** (62, 63, 69), each by design and parked. The rest were corrected before the push.
- **Escaped every check in the batch: 2** (70, 71), both between batches, as in the earlier note, which had 10 of that kind in three batches. 72 is a route, as its two were.
- **Severity.** Nothing touches a line of the model or blocks the switch-over. The worst is 71: a measurement the next three batches read, filed to the batch after them.

### Re-measuring what the record held

- **Rung Y's before-tables.** Its count table "equals batch 7R's landed one row for row", and its distance run, 815 s, read "DISTANCE SAME" against 7R's landed table (`rung-comprises-checker/REPORT.md` sections 7 and 8). Nothing the stages read had changed since 7R's gate. The batch record asked for both (`CLIMB-BATCH-7C.md:93-94`), before your decision of 14:18 UTC that such a rung takes the landed gate's tables as its before (POSITIONS 2026-09-28). The decision removes this case from now on.
- **The skeptic's run on the base's checker**, 893 s, read the same tree a third time. It was one of three runs in one setup (landed, base, broad), the pair that principle 2 asks for, and it found row 488's cause. Justified.
- **The gate after the repair.** The repair changed no `.fsi`, Java or Scala file (`climb-batch-7C/RECORD.md:273`). The second gate still re-ran the count and distance stages, 800 s for the distance, and both tables came out the same as the first gate's but for their seconds and machine lines (`RECORD.md:304`). This is new: the script runs the full gate after any repair (`climb-batch-workflow.js:1894-1907`).
- **The cache-off runs.** Two whole-stage runs, stopped after 30 minutes each (finding 4).

### What the reviews cost, in these tokens

- From `summary.txt` section 8, each review agent's context at its last turn: the conformance review of 6b and 7, 539K; of 7R, 461K; the process review of the three, 454K.
- Against the runs: 7R's review is 15% of 7R's 3.15M. This single review ended at about 0.5M, 14% of 7C's 3.71M. The earlier note's 4% was in ITE, which weights re-reads by the cache price; in the harness's count a review is about a seventh of a batch.
- Yield here: findings 1, 2 and 4 are placements that would have reached batch 7b's and N's planners wrong. Finding 3 and 72 are notes.

### Measures the evidence supports, each with its cost

1. **Put the ruling into the rule** (the earlier note's measure 3, now a third repeat). One sentence in `climb-batch-workflow.md`'s rule text, which the prefix repeats: a settled defect gets its gated test in the batch that measures it; "the prelude leaves", "a later rung writes it" and "the rung's files exclude a test" do not defer it; the repair round writes it (6b's, 7R's and 7C's judges). Cost: one sentence, before the next launch.
2. **Reuse the first gate's count and distance tables after a repair** that touches no library, checker or interpreter source, as the decision of 14:18 does for a rung's before. Saves about 15 minutes of machine time per repaired batch. It is a change to the script's gate step.
3. **Probe a shadow adversarially before its code is put to you.** A judgement that puts code up for approval has the skeptic's probes run on the shadow first, or names the shapes it did not try. Here two defects of the approved lines were found in the first hours after launch. Cost: one skeptic pass per shadow, about 0.4M tokens.
4. **A parked line says only what was sent.** Where a rung's "What comes back to Pavol" list is filed, the line says whether the landing message carried it or it is on file only.

## Part 3. Routing

Each item the batch opened, left or listed, with its home on `main` at `88ccf8217`. The routing commit filed most of them; this checks each.

**Rows the batch opened.**
- 487 (another unit's type below a generic subtrait, not caught): batch 8's line (`PLAN.md:76`). Has a home. Its repair is a new checker rule at object declarations, derived from the value reading and not copied from Welterweight's D-Object (row 487's note); batch 8's planner should read it as a checker rung.
- 488 (the checker's errors move with its earlier queries): batch 8's line. **Misplaced**: a probe before batch N, and N's line names it for rung I (finding 4).
- 489 and 490 (verdict by spelling; extenders by name): the parked line on the approved code (`PLAN.md:217`). Has a home.
- 491 (the passages that read a clause at the level of types): item 26, before batch 8 (`PLAN.md:157`). **Misplaced**: before batch 7b (finding 1).
- 492 (both paths refuse the Meet Rule's example): tests written; its repair on batch 8's line. **Misplaced**: batch 7b's record, rungs C and W (finding 2).
- `SkTwoLevel` (a true clause refused by the text and the checker): **no row, no line**. A row at the next gather, and a sentence in the parked line on X's wording (finding 3).

**Rows the batch left open or touched.**
- 354 (the ellipsis rule) and 407 (walk overflows on `comprises I`): named open in the parked line of 7C's defaults (`PLAN.md:225`). Row 354 is off the path: no count-stage error of that kind, and batch 7b's record names it as not its own (`CLIMB-BATCH-7.md:405`). **Row 407 lacks its use**: batch 8's line should name the judgement's way 3 for the self-typed `Integral` bodies, with row 407's six-line walk edit, as a measured candidate still to measure (the judgement, sections 3 and 4).
- 414 (the declaration rule with a static-parameter argument): its new note ties it to row 489's false acceptance, and the parked line on the approved code names it. Has a line.
- 22 (walk never checks a `comprises` clause): **no line**. Since X's text, the four programs of X's skeptic that walk accepts are static errors in the rendered specification (`rung-spec-comprises/SKEPTIC.md:95-104`). Home: a parked line, off the path, with walk left as it is as the default.
- 486 (the owed walk test the repair flagged for batch N): batch N's line (`PLAN.md:69`). Has a home.

**Defaults of the batch record's section 1** (`CLIMB-BATCH-7C.md:13-37`).
- Q1 (alone between 7R and N), the declared count, row 459 closing, rows 354 and 407 open, the hole's row: the parked line of 7C's defaults (`PLAN.md:225`). Filed.
- "What the batch leaves out": the api's 66, each family homed in 7b or 8 (Part 1, the global questions); the self-type idiom (row 407, above); the ellipsis rule (row 354, above); the team's `where` spelling (parked, `PLAN.md:218`).

**Lists for Pavol.**
- Y.worker.1 (`PLAN.md:216`), Y.skeptic.1 with review.1 (`:217`), X.skeptic.1 (`:218`), X.worker.2 to 4 (`:219`), X.worker.5 (`:220`), review.2 (item 23): filed.
- X.worker.1 with X.skeptic.3: item 26, misplaced (finding 1). X.worker.6 with X.skeptic.2: item 27, settled by the judge.
- X's point 3, seven stale citations in five tests: batch 6.5's rung P (`CLIMB-BATCH-6.5.md:111`, `:123`). Filed.
- **The rungs' "What comes back to Pavol" lists.** Y's: the Scala edit as a diff, the count's move api by api, the 66 by name, the new rows (`rung-comprises-checker/probes/lists-for-pavol.txt`). X's: the revised page as the `pdftotext` diff, the Appendix I entry, the list (`rung-spec-comprises/probes/for-pavol.txt`). The parked line says they "came with the landing" (`PLAN.md:225`). The landing message of 16:52 UTC gave the gate, the count 10 to 75, the distance, the rows, the cost and the map's reach; it gave neither the diff nor the 66 by name, the revised page or the entry. **Not sent.** Home: one rendered page with Y's diff and X's revised page 98 and entry, sent with the parked lines (protocol principle 3), or the parked line corrected to "on file, not sent".

## What I did not do

- Built nothing, ran no Fortress program, edited no source, library, test, ledger, plan or record file.
- Did not measure finding 4's probe, finding 2's reading of rungs C and W against row 492, or finding 1's reading of rung S's list against the Meet Rule's example. Each is by reading of the records.
- Did not hand-label the agents' searching as held or new. The overlap figure is a proxy by file name.
- Read the transcripts only through the scripts below and bounded greps.

## Files

`batch-7C-review/`:
- `agents.py`: the run and its 12 agents, from the journal.
- `measure.py`: runs `../process-review-6b-7-7R/measure.py` unchanged on them, writing `calls.csv` and `agents.csv` here.
- `aggregate.py` → `summary.txt`: every figure of Part 2 in the harness's tokens, beside 6b to 7R read from the earlier note's `agents.csv`, and the reviews' cost.
- `briefkeys.py` → `briefkeys.txt`: the keys each worker, skeptic, judge and review repair ran.
- `overlap.py` → `overlap.txt`: searching into files the briefing had printed from.

Run from the directory, in this order, with `PYTHONDONTWRITEBYTECODE=1`: `python3 measure.py; python3 aggregate.py > summary.txt; python3 briefkeys.py > briefkeys.txt; python3 overlap.py > overlap.txt`.
