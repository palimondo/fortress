<!-- DRAFT FOR REVIEW. The decision record and manifest for climb batch 7C, `comprises` after the 2012 reading, prepared 2026-09-28 from 09:10 UTC by a planning worker for the coordinating session, from Pavol's answer of 08:53 UTC to the `AnyIntegral` judgement ("Option 1."; POSITIONS.md, 2026-09-28, `AnyIntegral`'s `comprises` clause). It is written on main at 1f50087e6 while climb batch 7R runs (run wf_568733d7-19c, before its gather); section 4 says what batch 7R is expected to have changed in the files this batch edits, and the one such file, `Specification/appendices/changes.tex`, is re-read on this batch's base before its launch. Sources: CLAUDE.md, protocol.md, POSITIONS.md (the entries cited), PLAN.md phase 3, climb-batch-workflow.md ("Preparing a batch record" and the stages it describes) with the script climb-batch-workflow.js at HEAD, CLIMB-BATCH-7R.md with compile-ladder/plan-7r/manifest/, CLIMB-BATCH-N.md sections 1, 4 and 6, batched-climb-plan.md section 5; the evidence read whole: reviews/anyintegral-comprises-judgement.md, reviews/anyintegral-comprises-ways.md with its shadow and captures, perf-probes/nat/zero.md section 2 with zElig.fss and zElig2.fss; ledger rows 354, 407 and 459; the FACTS entries cited; the specification, checker and test sources cited, each opened at the cited line. Nothing was built or measured for it (protocol principle 5, as rewritten in 75b87fee3): every count is on file in the ways note's captures or batch 7's gate, arithmetic from them, or a read of the tree (git, grep, sed), and says which. The only programs run were section 7's generator, its check (node over scratch copies of the script, nothing launched) and the briefing lists through facts-extract.sh --check. One line per paragraph. -->

# Climb batch 7C

## 1. For Pavol

Batch 7C is the decision you took at 08:53 UTC today on `AnyIntegral`'s `comprises` clause, option 1: the compiled checker learns the 2012 reading of `comprises`, and the specification says so. It is one run of two rungs, after batch 7R (ranges over `ZZ32`) has landed and before batch N. A rung is one fix, built test-first by one worker in its own copy of the tree and judged by a second worker, the skeptic, before the batch is merged and the whole test suite (the gate) runs once.

In plain words: `AnyIntegral` is the marker "some integer type", and its `comprises` clause says the five integer types are the only types under it. The generic `Integral[\I\]`, which each integer type implements at itself, sits between them and is not listed. The checker's 2009 rule wants every direct child listed, so it refuses the clause, and the library's api stops checking there. The designers' 2012 texts read a clause as a statement about where values come from, and `Integral` adds no values of its own. The checker learns that reading: a generic child of a closed trait is accepted when every type the checker sees under it is below a listed type.

**One question, Q1.** Where the batch runs; it changes no rung's work.

**Q1. Does 7C run alone between 7R and N, as you decided, or ride in batch N's first run?**
- You decided a small batch of its own between 7R and N. The judgement named the other way: Y and X share no source file with N's first run (rungs I, K and T).
- Riding breaks batch rule 3 as written. The rule allows one rung per run that edits Java or Scala, because each such rung rebuilds the whole compiler in its own copy of the tree (`explorations/coordinator/batched-climb-plan.md` section 5). N's first run already has two, I (Scala) and K (Java), which its record justifies by your decision of four rungs (`explorations/coordinator/CLIMB-BATCH-N.md` section 6, the batch rules); Y would be a third, which no decision covers. The rule's reason is cost, not correctness, and batch 4 ran three such rungs (C, N and O; `explorations/coordinator/climb-batch-6.5-review.md`, change 2), so the rule is not what decides it.
- What decides it is the rest of the cost. X and N's rung T each add an appendix entry at the same place, which the gather then orders by hand. The count stage's jump would be tied to Y in a review that must also account for I's checker changes. N's reviewed record and manifest would be amended and regenerated. And N's first run would grow from three rungs to five, about 8 to 12 hours in one piece by arithmetic, with a held push holding five rungs.
- Options:
  1. Alone, as decided: one more merge and gate, about 8 agents, 2M tokens and 2 hours; N launches once 7C has landed.
  2. Ride in N's first run: saves that; N's record and manifest carry Y and X, and this block is not launched.
- **Recommended: 1**, your decision as it stands. Taken at 1 unless you answer, since it reverses nothing, and listed for your review.

**The rungs.**
- **Y, the checker.** About 14 Scala lines in the checker's `comprises` rule, the ones you approved and parked on 09-21. Test first: a compiler test with the library's shape, refused today, and a guard that a false clause is still refused.
- **X, the specification.** The draft note in the traits chapter that states the 2009 rule becomes boxed normative text with the 2012 reading, and an appendix entry quotes the original. X lands only if Y lands.

**What it clears.** Measured before 7R, on the ways note's copy of the checker with the same 14 lines:
- The api's last early error goes, so its overloading and return-type checks run on the count stage for the first time: 22 to 87. The 65 more are the api's 66 errors now in view, less the clause's own. None is new: the distance stage already counts them, and batches 7b and 8 repair them, as you were told when you asked.
- On the distance stage the clause's own 2 errors go, by reading.
- Nothing under walk can change, and no library or model line moves.
- 7R rewrites the range operators under this, so Y measures the count stage again on its base and says what changed.

**Read from the record, not asked.** One word from you changes each.
- **Y declares the count it measures.** The gate prints 7R's landed total plus 65 as the prediction beside it; the count is never red.
- **The hole gets a ledger row.** A program's own integer type declared in another file is not caught, under this and every option but the 2008 clause. It is kept as the probe capture already on file, because a compiler test cannot hold a refusal the checker does not yet make without going red. A candidate for batch 8 or later.
- **Row 459 closes.** Rows 354 (the ellipsis rule) and 407 (walk on `comprises I`) stay open.

**What the batch leaves out.** The api's 66 errors (7b and 8); the hole (its row); the self-type idiom `comprises I` and walk's overflow on it; the ellipsis rule; the team's `where` spelling.

**Cost.** By arithmetic from the batch records, not measured. A rung is 3 to 5 agents and 1M to 2M tokens: Y, with a Scala rebuild, two count runs and two distance runs of 14 to 24 minutes, 1.5M to 2M; X 1M to 1.5M. The tail from the gather to the commit is about 8 agents and 2M. In all 14 to 18 agents, 4.5M to 5.5M tokens and 4 to 6 hours of the two-agent queue.

**What "go" commits you to.** Your answer of 08:53 UTC is the go, on the standing order of phase 3's batches; one word from you holds it.
- A checker rule of ours in a 2012 file, about 14 lines, reversible by deleting them.
- The traits chapter states the 2012 reading; the original is kept in the appendix.
- Two or three new compiler tests and one new ledger row.
- The count stage reads about 65 higher: errors made visible, not caused.
- Every stop the record reserves for you is reversible: it lands and is listed for your review (POSITIONS 2026-09-27, the stops).

**What "no" costs.** Nothing now. The api's 66 stay off the count stage, and the same choice comes back before the switch-over, where the api must check.

## 2. The decisions this batch carries

Cited by date and entry name in `explorations/coordinator/POSITIONS.md`.
- **The `comprises` decision**, 2026-09-28, `AnyIntegral`'s `comprises` clause: "Option 1." (08:53 UTC). "The checker learns the 2012 reading of `comprises` (the later Types chapter, `types.tick:384-389`, and Welterweight): a generic child of a closed trait is eligible when every type the checker knows under it is listed, the narrow accommodation he approved and parked on 2026-09-21 (`everyKnownSubtypeListed`, about 14 Scala lines in `TypeHierarchyChecker.scala`), with an S1 callout in `Specification/basic/traits.tex` in place of the draft note at `:234-246`; the clause and walk stay as they are. One small batch of two rungs, checker and specification, between 7R and N (batch 7C); the count stage rises 22 to 87 as the api's overloading and return-type errors reach it, declared by the rung; a ledger row for the hole every way but the 2008 clause shares (a program's own `Integral` subtype in another component is not caught)." The 66 are resolved by batch 7b (answer 9's families) and batch 8 (the meet rule and the residue), library edits already decided, not by this batch. The evidence is `explorations/reviews/anyintegral-comprises-judgement.md` sections 3 and 4 and `explorations/reviews/anyintegral-comprises-ways.md` (way 11), with its captures under `explorations/reviews/anyintegral-comprises-ways/`.
- **The library commit**, 2026-09-21: the closure `AnyIntegral comprises { ZZ }` approved as landed with a `NOT YET` comment in the team's wording, and "the checker's accommodation for the clause is parked, the flattening making it moot"; batch 7's rung H measured that it does not (`explorations/compile-ladder/rung-exclusion-remainder/REPORT.md` section 6).
- **The type group's later word**, 2026-09-23, on how the exclusion-rule fork is to be weighed: the late, implementation-informed positions of the type group outweigh the specification's earlier text where they conflict. **The lineage note**, 2026-09-26: `Specification/` stays the standard, and the Types chapter of the team's unfinished restart (`Documentation/Specification/Prose/Language/types.tick`) is cited beside it wherever it covers a topic.
- **Route A**, 2026-09-24, the exclusion route, rung P's fork: no self type enters the library, which is one reason the self-type idiom `comprises I` is not taken.
- **The library's practice**, 2026-09-19, and **the library route**, 2026-09-21: the interpreter's library is the one library, and nothing is added to the compiler library.
- **The specification's changes**: the S1 form (2026-09-26); the unrevised copy called "the Working Draft of February 2011", cited by path and line in `Specification-1.0-frozen/` (2026-09-26, the first of the batch-5 answers); no open discrepancy between the specification and the implementation, every change recorded with its reasons and the original kept (2026-09-24, the requirement on the plan).
- **The checker count**: reported, never red on its own (2026-09-26, answer 11); a rung declares the count it measured (2026-09-23, climb batch 3's checker count).
- **The measured record is cited, not measured again**, 2026-09-28, on the brief of the nine-steps worker, and protocol principle 5: this record hands the ways note's measurements over as findings, and names the one thing new to measure, the count stage on the base 7R leaves.
- **The stops**, 2026-09-27: a stop the record reserves for him is reversible, lands and is listed for his review. **Rung D's stop**, 2026-09-26: an output difference the untouched tree already shows from run to run, with the test's verdict unchanged, is a ledger row, not a stop.
- **The order and the standing go**, 2026-09-27, the numerics plans: decision 5's order, 7, 7R, N, 7b, 8, with this batch placed between 7R and N by the `comprises` decision; each batch launches when the one before it has landed and its record is ready with no question open for him, and a question a record raises takes its recommended default unless that default would reverse a decision of his.
- **Standing**: test first, the test seen failing, kept in the corpus (2026-09-17; 2026-09-19 after climb batch 1); workers commit their own files (2026-09-26); a judge's second ruling runs on Fable (2026-09-26); a brief states the problem and not the expected solution (2026-09-25); a timing names its machine (2026-09-25); the gate compares the `testSystem` shards by their sum (2026-09-26); step 1 of every rung is its mission briefing, in neutral words (2026-09-27, the knowledge base and the three questions).

## 3. The rungs

The workers get their rung's section below word for word as the tail of their brief (section 7). The skeptics do not get the tail; they read this record, so each section also says what the skeptic checks. Each section opens with the answers of section 1 that it follows. Each rung's first step is its briefing, the list of keys in its manifest entry (section 7), which its worker reads whole; the skeptic, the repair round and the judges read its `checks`, the sub-list their checks need (`explorations/coordinator/climb-batch-workflow.md`, "Preparing a batch record"). Line numbers are on `main` at `1f50087e6`. Batch 7R edits none of `TypeHierarchyChecker.scala`, `Specification/basic/traits.tex` or the two tests X re-anchors, so their line numbers hold unless its landing says otherwise; it adds entries to `Specification/appendices/changes.tex`, whose lines are re-read on the base (section 4).

### Y. The 2012 reading in the checker, `rung-comprises-checker`

**The answers this rung follows.** Q1 decides only whether this batch runs alone or inside batch N's first run; Y's work is the same either way. Y declares the count it measures on its base; the hole a program's own integer type opens is a new row whose capture is already on file; row 459 closes (section 1, read from the record).

**Its briefing.** The decisions the rung rests on (the `comprises` decision, the library commit that parked the accommodation, the type group's later word, the lineage note, route A, the library route, the library's practice, batch 3's declared count, answer 11, the nine-steps brief, the stops, rung D's stop); ledger rows 459, 354 and 407; the judgement's type question, its recommendation and what the record does not hold; the ways note's type question, ways 10 and 11 and its re-measurement against the record; the zero probe's section on the accommodation; the shadow and the captures it produced (the count summary, the switches, the guards, the user program and its capture); the checker's call site and its rule; the team's statement of the rule and its false-list test; the two eligibility probes; the library's `AnyIntegral` and `Integral`; the specification's rule, its note and the `Molecule` example; the later Types chapter's two passages and Welterweight's reading and rule; the FACTS entries on the closure, the ellipsis rule, the hidden layer, the distance, the team's latest word, the checker's scope, the `XXX` mechanism and the harness; the map's row for the checker. The keys are in section 7; `checks` is the decision, the parked approval, the stops, rows 459 and 354, the judgement's recommendation, way 11, the zero probe's section, the call site, the rule, the shadow, the team's test, the two probes, the Types chapter's `comprises` passage and the `XXX` entry.

**The problem.**
- `trait AnyIntegral extends { Number } comprises { ZZ, ZZ64, ZZ32, NN64, NN32 } end` with `trait Integral[\I extends Integral[\I\]\] extends { StandardTotalOrder[\I\], MultiplicativeRing[\I\], AnyIntegral }` (`Library/FortressLibrary.fsi:433-436`) is refused by the compiled checker: "Invalid comprises clause: FortressLibrary.AnyIntegral has a comprises clause but its immediate subtype Integral is not eligible to extend it". Each of the five implements `Integral` at itself (`trait ZZ32 extends { AnyIntegral, Integral[\ZZ32\] }`, `.fsi:510`), and only the five extend an instantiation of `Integral` anywhere in the tree (the ways note, section 1, a grep).
- The refusal is the checker's rule: a trait that extends a trait with a clause must be below a listed type, or have a clause of its own whose entries are each eligible (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala:247-266`, called at `:203-208`; the team's statement of it is `ProjectFortress/compiler_tests/Compiled10.i.fss`, "(3) Eligibility to extend"). `Integral` is generic and cannot be listed: the later Types chapter lets a clause list only types and generic types each of whose parameters is a parameter of the declaring trait (`Documentation/Specification/Prose/Language/types.tick:277-283`, `:384-390`), and the bare name is refused before the hierarchy check, "Type requires static arguments" (the ways note, way 6).
- The api's check stops there, before its overloading and return-type checks (`ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java:268-272`), so the count stage reads 22 on batch 7's landed tree and never runs them (`explorations/compile-ladder/climb-batch-7/gate/checker-count.txt`). With the error cleared it read 87 on the tree at `81f0151be`: the `FortressLibrary` row 2 to 132 (each error counted twice), `RangeInternals`' 21 unchanged, and the api's 66, 61 overloading and 5 return-type errors: `FORWARD_CMP` 19, `IN` 7, `lift` 6, `seq` 5, `juxtaposition` 4, `generate` 4, `MIN` 4, `MAX` 4, `ivmap` 3, `map` 2, and one each of `isLeftZero`, `copy` and `SQCAP` (`explorations/reviews/anyintegral-comprises-ways.md` section 2 and way 11; `explorations/reviews/anyintegral-comprises-ways/captures/count/narrow-base.txt`, `summary.txt`, and `compare.txt`, "1 gone, 66 new"). The distance stage already counts the 66 and holds the clause as class H2, 2 errors (`explorations/compile-ladder/climb-batch-7/gate/distance.txt:12`).

**The decisions.** The `comprises` decision (`explorations/coordinator/POSITIONS.md`, 2026-09-28, `AnyIntegral`'s `comprises` clause, "Option 1."): the checker learns the 2012 reading of `comprises`, the later Types chapter's and Welterweight's, by the narrow accommodation Pavol approved and parked on 2026-09-21 (`everyKnownSubtypeListed`, about 14 Scala lines in `TypeHierarchyChecker.scala`); the clause and walk stay as they are; the count stage rises as the api's overloading and return-type errors reach it, declared by the rung; a ledger row for the hole every way but the 2008 clause shares. The 66 are batch 7b's and batch 8's, not this batch's. Route A (2026-09-24): no self type enters the library. The library route (2026-09-21): nothing is added to the compiler library. Not this rung's: the specification (rung X); the ellipsis rule (row 354); walk (row 407); any library line.

**What the checker and the tree already do.** Evidence, not the brief; the rung lists every way before it chooses.
- The narrow form is on file as a shadow. `explorations/reviews/anyintegral-comprises-ways/shadow-thc.py:46-64` adds, behind a switch that is off by default, a third disjunct to `isEligibleToExtend`, `(aicwNarrow && !tt.getArgs.isEmpty && everyKnownSubtypeListed(tt, comprises, analyzer))`, and the method `everyKnownSubtypeListed`, which collects every trait in `analyzer.traits` whose `extends` clause names the generic subtrait and asks that there be at least one and that each be below a listed type (`comprisesContains`). It is verbatim from the zero probe's `explorations/perf-probes/nat/shadow.patch` (`explorations/perf-probes/nat/zero.md` section 2, "the rule to land"). The condition `!tt.getArgs.isEmpty` restricts it to a generic subtrait, the one kind the later Types chapter says cannot be listed; a plain unlisted extender is still refused, as the `Molecule` example says (`Specification/basic/traits.tex:264-290`) and `XXX10i.test` pins.
- Measured on that shadow at `81f0151be`, cited here and not to be measured again (`explorations/protocol.md`, principle 5): the count 22 to 87 with the list above (`captures/count/narrow-base.txt`); `explorations/perf-probes/nat/zero/zElig.fss` (`trait S comprises { A }`, `trait A extends S`, `trait B[\X\] extends S`, a false list) still refused, and `zElig2.fss` (a generic `C[\X\]` whose one extender, `trait D extends { A2, C[\ZZ32\] }`, is below the listed `A2`, a true list) accepted (`captures/probes/switches.txt`); `XXX3q` and `XXX10p`, the guards of the ellipsis rule, failing as pinned (`captures/probes/guards.txt`); none of the 39 compiler tests whose source has a clause changing (`captures/ctests/summary.txt`, all switches on, where only `XXX10h`, `XXX10n` and `XXX9z` move, and `switches.txt`, where those three keep their stock output under this switch alone).
- The broad form, any generic immediate subtrait accepted (5 lines, the ways note's way 10), accepts `zElig.fss` and turns the team's `Compiled9.z.fss` from 2 errors to 1, so `XXX9z` goes red (`captures/probes/switches.txt`). It is not the decision; it is the deliberate local fix on which the rung's guard is shown red.
- What the narrow form cannot see: a program's own `trait MyIntegral extends Integral[\MyIntegral\] end` with an object, in another unit, is accepted, as on the tree and under every way but the 2008 clause (`explorations/reviews/anyintegral-comprises-ways/probes/UserIntegralTrait.fss`, `captures/probes/user-integral.txt`). The checker checks a clause at the closed trait's immediate subtypes only; the sound check is at an object declaration, Welterweight's rule D-Object (the judgement, section 1, its last paragraph).
- The rule is Sukyoung Ryu's of 2009 (`360905925`; "(3) Eligibility to extend" in her proposal `3a8ad3b67`). The filter at `:262` drops a type variable from a subtrait's own clause, which is why `comprises I` passes the checker as it stands (way 3, not taken: route A).
- Walk never checks `comprises` (FACTS.md, "The tower closure of `02d09a39f` has no spelling the compiler's checker accepts"), so the edit cannot change a walk output; the tree passes both microGPT checks with the clause as written (the ways note, section 6).

**The test, first.**
- In `ProjectFortress/compiler_tests/`, written before the edit, a plain test in the step's form (a `.fss` that prints `PASS` and a `.test` that links and runs it): a closed trait listing concrete types, with a generic, F-bounded trait between them that each listed type implements at itself, the library's `AnyIntegral` and `Integral` shape in the compiler world's own names; and `zElig2`'s shape beside it. On the base the compile is refused with "... is not eligible to extend it", captured under `probes/` as the recorded failure; after the edit it prints `PASS`.
- The false-list guard: an `XXX` compiler test with `zElig`'s shape, its `.test` pinning the refusal with `compile_err_equals`, as `XXX10i.test` pins its own. Green before and after the edit; shown red on the broad form, a deliberate local fix that is not committed, and captured (`explorations/coordinator/climb-batch-workflow.md`, "Shared prefix", on a rung's first `XXX` file).
- The count stage (`explorations/coordinator/tools/checker-count/run.sh`), before and after the edit, captured as `probes/checker-count-preedit.txt` and `probes/checker-count-postedit.txt`. This is the one thing new to measure: the tree has changed under the measurement of `81f0151be`, since batch 7R's rung J rewrote the range operator block of the `FortressLibrary` api and `RangeInternals`. The report sets each of the 66 against its line of the ways note's list (`captures/count/narrow-base.txt`, positions masked as `compare.txt` masks them) and names every error that is gone, changed or new with the edit of batch 7R that did it.
- The distance stage (`explorations/coordinator/tools/distance/run.sh`), before and after, each through `run_bg` (14 to 24 minutes), captured as `probes/distance-preedit.txt` and `probes/distance-postedit.txt` and compared with `compare.sh`. Expected by reading: class H2's 2 errors go and nothing else moves (the judgement, section 4, its first gap).

**What it writes.** The disjunct and `everyKnownSubtypeListed` in `TypeHierarchyChecker.scala`, with no switch; the comment above `isEligibleToExtend`, which lists the rule's cases, kept true; the two tests; its report and record.

**What is not measured again.** The 39 compiler tests with a clause, `XXX3q` and `XXX10p`: the shadow measured them with these lines, and batch 7R keeps every compiled test's verdict (a stop of its own); the gate's compiler track runs them. Walk: the edit is in the checker alone, and the gate's `testSystem`, atomic runs and ladder run walk anyway. The hole's probe: on file under both forms of the accommodation.

**Files it may touch.** `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala`, `isEligibleToExtend` with its comment (`:247-266`) and one new private method beside it; its new tests in `ProjectFortress/compiler_tests/`; its own directory. Not: the call site and the ellipsis rule (`:185-219`) or the check of listed types (`:220-242`); any other Java or Scala file, `compiler/StaticChecker.java` among them, whose copy the count stage checks; the files the distance stage patches as it runs (`explorations/coordinator/tools/distance/shadow-patch.py`, `add-patch.py`); `Library/` and `ProjectFortress/LibraryBuiltin/`; `interpreter/`; `Specification/`, which is X's; any existing test; `explorations/run-c4/` and `explorations/apl/`.

**Java or Scala.** Scala. `ant compileAll`, `default_repository/caches/global.map` restored after it (FACTS.md, "ant compileAll deletes a tracked file").

**The checker count.** Declared: the rung's two tables are its declaration, their totals and any change of the crash row stated in REPORT.md and record.md. By arithmetic from `81f0151be` the total rises by 65 (the clause's error gone, the 66 in) and the `FortressLibrary` row by 130; the manifest's `expectedCheckerCount` is that prediction, batch 7R's landed total plus 65, printed beside the measured one and never red. On `81f0151be` the crash row read `none` under the narrow form as on the tree (`captures/count/narrow-base.txt`, `base.txt`).

**What must stay green, or keep its verdict.** Every compiled test's verdict other than the new tests'; every interpreter test's; the ladder's 85 files.

**Stops.**
- A compiled test's verdict changing, other than the rung's new tests'; a ladder file moving down.
- An edit outside `isEligibleToExtend` and the one new method, or to any other Java or Scala file; a switch or system property left in the rule.
- A line of `Library/`, `ProjectFortress/LibraryBuiltin/` or `interpreter/`; a line of `explorations/run-c4/src/` or `explorations/apl/mg/`.
- A walk output changing: by construction there is none, so one means the rung touched more than it says.
- A count-stage error on the rung's base that neither its edit nor a named edit of batch 7R accounts for; a change of the crash row that the rung does not declare.
- Not a stop: an output difference that the untouched tree already shows from run to run, with the test's verdict unchanged; it is a ledger row (POSITIONS 2026-09-26, rung D's stop).

**For the skeptic.** The recorded failure, and the plain test passing; the guard green, and red on the broad form, re-run once; the two count tables re-run and set against the ways note's list, each change tied to its edit of batch 7R; the two distance tables, H2's 2 errors gone and nothing else moved; the landed code against `shadow-thc.py:46-64` line by line, the switch gone and nothing else different; the diff confined to the two methods; the hole's home as below.

**What comes back to Pavol.** The Scala edit as a diff; the count stage's move api by api, the 66 by name against the ways note's list; the new row.

**What it closes.** Row 459 (fixed: the clause checks as written). Opens and leaves open: the hole, a program's own type below an instantiation of `Integral`, declared in another unit, accepted. Its home is 3, the probe and capture already on file (`explorations/reviews/anyintegral-comprises-ways/probes/UserIntegralTrait.fss`, `captures/probes/user-integral.txt`), and the report says why it is not home 2, in place of the silence home 3 names: the specification's later word settles it, since every value of a closed trait belongs to a listed type (`types.tick:384-390`; `Papers/Welterweight/grammar.tick:21-22`), but no gated test can hold that answer today, because an `XXX` compile test demands that the compile fail, which the checker does not yet do, and a plain test would pin the wrong answer (FACTS.md, "The `XXX` expected-failure mechanism in `compiler_tests/` and `library_tests/` can express a compile-stage failure only"). The sound check is at an object declaration, Welterweight's D-Object; a candidate for batch 8 or later. Notes: row 354 (the ellipsis rule untouched, its guards unchanged); row 407 (the self-type idiom not taken, walk's overflow untouched).

### X. The 2012 reading in the specification, `rung-spec-comprises`

**The answers this rung follows.** Q1 does not change X's work. X lands only if Y lands (its manifest entry's `landsOnlyWith`).

**Its briefing.** The decisions (the `comprises` decision, the S1 form, the name of the unrevised copy, the lineage note, the type group's later word, the requirement on the plan, the stops, rung D's stop); ledger rows 459, 354 and 407; the judgement's type question and its recommendation with the specification change in the S1 form; the ways note's type question; the specification's trait declarations section whole, the frozen copy's note, and Appendix I's entry on where-clause variables and its "Passages not yet revised"; the later Types chapter's two passages, Welterweight's reading and its rule D-Trait; the library's `AnyIntegral` and `Integral`; the checker's rule and the shadow of Y's edit; the lineage note's topic list and rung S's form section; the FACTS entries on the frozen copy, the team's latest word, the refused examples and the closure; the map's row for the specification. The keys are in section 7; `checks` is the decision, the S1 form, the unrevised copy's name, the lineage note, the stops, the recommendation, the frozen note, the Types chapter's `comprises` passage, the where-clause entry and the form section.

**The problem.**
- The trait chapter's draft note says that a closed trait's listed traits "are exactly the traits that immediately extend T and they must explicitly extend T" (`Specification/basic/traits.tex:235-246`). It restates the checker's 2009 rule, is in the draft by 2009-11-06, and is a `\note`, which a release build drops (`Specification/fortress/fortress.tex:35-36`; the ways note, section 1). Once Y lands, the checker accepts `AnyIntegral`'s clause (`Library/FortressLibrary.fsi:433-436`), whose generic `Integral` extends the closed trait unlisted, and the note refuses it: the specification and the implementation would disagree openly (POSITIONS 2026-09-24, the requirement on the plan).
- The rendered text says a listed reference "is a declared trait identifier" (`traits.tex:163-165`), and Victor Luchangco's note beside it asks whether that includes "instantiations of parametric traits" (`:166-170`); the text never answers.
- The group's later texts read a clause as coverage. The Types chapter: a clause "specifies a set of types and generic types determined by the generic type of the declaration. An instantiation of the generic type defined by such a declaration is covered by the union of the types in this set and the corresponding instantiations of the generic type in this set" (`Documentation/Specification/Prose/Language/types.tick:384-390`), where `G` determines `G'` "if every parameter of `G'` is a parameter of `G`" (`:277-283`). Welterweight: "no value can belong to the trait unless it also belongs to one of the comprised types" (`Papers/Welterweight/grammar.tick:21-22`), its rule D-Trait asking nothing of the traits that extend a closed trait (`Papers/Welterweight/fig-wellformeddecls.tick:38-62`).

**The decisions.** The `comprises` decision (POSITIONS 2026-09-28, `AnyIntegral`'s `comprises` clause): an S1 callout in `Specification/basic/traits.tex` in place of the draft note at `:234-246`, adopting the later Types chapter's reading, with its Appendix I entry. The judgement's section 3, "The specification change, in the S1 form", is the content: the note's first sentence becomes rendered text in the Types chapter's words; a clause lists types, and generic types each of whose parameters is a parameter of the declaring trait; every value of the trait belongs to one of the listed types; a trait that extends a closed trait is listed in its clause, or has a clause of its own whose entries each are; a trait with static parameters the closed trait does not have cannot be listed, and it may extend the closed trait when at least one type extends it and every type that extends it is a subtype of a listed type. The note's ellipsis sentence (`:241-246`) and the `Molecule` example (`:264-290`) stay as they are, and Victor's question is answered by the new text. The type group's later word weighs more (2026-09-23), and the Types chapter is cited beside `Specification/` where it covers a topic (2026-09-26, the lineage note). The form, S1 (2026-09-26): the normative text edited in place, a `\revision` callout at the passage (`Specification/fortress/fortress.tex:87-93`), an Appendix I entry quoting the original as "the Working Draft of February 2011" with its path and line in `Specification-1.0-frozen/` (2026-09-26, the first of the batch-5 answers), and the reasons in a decision record. Not this rung's: the checker (Y); a type variable in a clause (the self-type idiom, which Welterweight's grammar drops and route A does not take); the ellipsis rule (row 354).

**What the specification and the library already say.** Evidence, not the brief.
- The revival's callout in the same section, at the draft notes on hidden type variables (`traits.tex:181-185`), with its Appendix I entry "Where-clause variables in extends clauses" (`Specification/appendices/changes.tex:119-146`), is the model: a box that answers a draft note of the team's.
- The original the entry quotes is the frozen copy's note, `Specification-1.0-frozen/basic/traits.tex:230-241`, its first sentence `:231-235`.
- The library's clause and the team's comment on it: `trait AnyIntegral extends { Number } comprises { ZZ, ZZ64, ZZ32, NN64, NN32 } end` and "not yet: `comprises Integral[\I\] where [\I\]`" (`Library/FortressLibrary.fsi:433-434`). The five are the instantiations the comment means, and the Types chapter lets `AnyIntegral` list only them.
- Karl Naden's journal text (2012) reads the same closure at the type level through the self-type idiom, "the type `Ring[\X\]` is identified as `X`" (`Papers/Types/journal/justificationOfRTR.tex:580-582`); the decision takes the coverage reading, which agrees with it on every value (the judgement, section 1).
- The rule the text states is Y's: `explorations/reviews/anyintegral-comprises-ways/shadow-thc.py:46-64` with its switch removed (Y's section). Its limit, an object declared in another unit below such a trait, is Y's new ledger row.
- Rung S's decision record, section 3.9, is the form of a revival change to the specification (`explorations/compile-ladder/rung-spec-route-a/decision-record.md`).

**What it writes.** First, before any edit, the list: every passage of `Specification/` outside `library/apis/` that says what a `comprises` clause may list or what it asks of the traits that extend a closed trait, with what the decision makes of it, whether it is revised now or left, and the source that settles it. The starting list, a grep at the drafting: `traits.tex:156-170`, `:234-246` and `:264-290`; `Specification/basic/types-vals-vars.tex:568-610`; `Specification/basic/expressions/var-ref.tex:63-70`; `Specification/basic/components/source-code.tex:372-392`; `Specification/advanced/overloading.tex:282-305`; `Specification/appendices/future.tex:269-280`. Then:
- the passage at `traits.tex:234-246`: the note's first sentence replaced by normative text stating the decision's reading, with a `\revision` callout; the ellipsis sentence kept as it is, in its note;
- the Appendix I entry, a new subsection inserted immediately before "Passages not yet revised", after the entries batch 7R's rung U adds there (re-read on the base), with its six items (Affected section, Change, Rationale, Effect, Original text, Route C): the original quoted whole from `Specification-1.0-frozen/basic/traits.tex:230-241`; the Effect saying that the one library's `AnyIntegral` checks, that no example changes, and that the compiled checker enforces the condition over the declarations it sees, an object declared elsewhere below such a trait being a row of the revival's gap ledger (the gather writes its number); Route C the same, since under route C's `comprises T` on the self-typed traits the condition is never reached;
- the decision record, `explorations/compile-ladder/rung-spec-comprises/decision-record.md`;
- every citation of a line of `traits.tex` below `:234` in the messages and comments of `ProjectFortress/tests/`, `compiler_tests/` and `library_tests/`, re-anchored by the map of unchanged lines from `git show <base>:Specification/basic/traits.tex` to its tree, never an assertion: `ProjectFortress/tests/XXXFlatStringSplitRungL.fss:11` (`:525-531`) and `ProjectFortress/compiler_tests/XXXTupleVarFieldCompiledRungC.fss:21-22` (`:446-448`) (a grep at the drafting).

**How it is checked.** No test can go red for a prose edit. The specification is built as rungs S, T and U built it (`./ant genSource`, then `./ant tex`, in `Specification/fortress/`, with `FORTRESS_HOME` the worktree), on the base and after, the logs captured; `pdftotext` of the two PDFs diffed, showing only the revised passage, the callout, the appendix entry and page shifts; `git diff --stat` showing only the listed files; every re-anchored citation opened. The rung does not commit `Specification/fortress.pdf`; the gather rebuilds it once on the merged tree.

**Files it may touch.** `Specification/basic/traits.tex`, the passage at `:234-246` only; `Specification/appendices/changes.tex`, its new subsection; the messages and comments of the two tests named; what its list finds, each named and reported; its own directory. Not: `Specification-1.0-frozen/`; `Specification/fortress.pdf`; any source, library or test assertion; Y's files.

**Java or Scala.** Neither.

**The checker count.** Unchanged: the rung edits nothing the stage reads. Not captured.

**Stops.**
- Any edit under `Specification-1.0-frozen/`.
- Normative text stating more than the decision and Y's section build: a type variable allowed in a clause, a rule about objects declared in other units, or a change to the ellipsis sentence or the `Molecule` example among it.
- A passage of the list whose new text neither the decision nor Y's section settles: the rung reports it and does not choose.
- An assertion changed in a re-anchored test; a file Y edits.
- Not a stop: an output difference that the untouched tree already shows from run to run, with the test's verdict unchanged (POSITIONS 2026-09-26, rung D's stop).

**For the skeptic.** Every sentence of the new text against the decision, the judgement's section 3 and Y's section (Y's code is not in X's tree; the gather checks the text against it once both are applied); the quoted original against the frozen copy's lines; the two builds and the `pdftotext` diff; each re-anchored citation opened; the list against the grep.

**What comes back to Pavol.** The revised page, as the `pdftotext` diff; the Appendix I entry; the list, with what was left and why.

**What it closes.** No row by number. Notes appended where the rung moved a cited line: rows 354 and 459 (their citations of `traits.tex`). The FACTS entry "The tower closure of `02d09a39f` has no spelling the compiler's checker accepts" is rewritten at the gather: the clause checks after Y, and the note it cites is revised.

## 4. Overlaps, declaration by declaration, and the order the gather applies them

The files each rung may edit, from section 3:
- **Y:** `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala`, `isEligibleToExtend` and one new private method; its new tests in `ProjectFortress/compiler_tests/`.
- **X:** `Specification/basic/traits.tex`, the passage at `:234-246`; its subsection of `Specification/appendices/changes.tex`; the messages and comments of `ProjectFortress/tests/XXXFlatStringSplitRungL.fss` and `ProjectFortress/compiler_tests/XXXTupleVarFieldCompiledRungC.fss`.

**Y against X.** No file is shared. X states in the specification what Y builds, so X's standing rests on Y: X's entry carries `landsOnlyWith: ['Y']`, and the script withholds X when Y is not approved (`explorations/coordinator/climb-batch-workflow.js`, `applyLandsOnlyWith`), as batch 7R withholds U on J. After both are applied, the gather checks every rule X's text states against Y's landed code and tests; a mismatch the decision settles is fixed in X's text, any other goes to the review as blocking. X's Appendix I entry names Y's new ledger row, whose number the gather assigns and writes in.

**Against batch 7R (J and U), landed before this batch's base.** Nothing is merged against 7R; what matters is what the files hold then. By 7R's record (`explorations/coordinator/CLIMB-BATCH-7R.md` section 4):
- `TypeHierarchyChecker.scala`: J may edit only `compiler/Types.java` and the `case` site of `scala_src/typechecker/impls/Functionals.scala`, a Java or Scala edit beyond that being one of its stops. Y's lines hold.
- The `FortressLibrary` api: J rewrites its range operator block and `RangeInternals`, which is why Y measures the count stage again on its base; Y edits no library line.
- `Specification/appendices/changes.tex`: U inserts its entries immediately before "Passages not yet revised", after batch 7's rung A's, and edits that subsection's paragraph that names ranges. X inserts its subsection after U's, still before "Passages not yet revised", and edits no line U edits; X re-reads the file on its base.
- `Specification/basic/traits.tex` and X's two tests: neither rung of 7R edits them.
- `Specification/fortress.pdf`: 7R's gather rebuilds it, and this batch's gather rebuilds it once more.

**Against the batches after it.**
- Batch N (I, K, T; then Q). No rung of N edits `TypeHierarchyChecker.scala`: I edits `Functionals.scala`, `Operators.scala`, `CoercionOracle.scala` and possibly `TraitTable.scala` (`explorations/coordinator/CLIMB-BATCH-N.md` section 4). T inserts its Appendix I entry after U's; with this batch landed it comes after X's, and T re-reads the file on its base as N's record already says. Q edits the clauses of `Number` and `ZZ32`, which list what extends them; Y's disjunct reaches only a generic subtrait no clause lists, so by reading it does not meet Q's edit. N's record gains a paragraph on this batch in its section 4 before N launches (the coordinator's, at N's launch).
- Batch 7b (S, C, W, L). After this batch, the `FortressLibrary` api's 61 overloading and 5 return-type errors are on the count stage, where L's families are counted; 7b's sections are re-read on N's landed tree before 7b is briefed, as its record says.
- Batch 6.5 (E, P, G, V), in a slot a decision leaves. P and V add Appendix I entries at the same place; if 6.5's first run lands before this batch, X re-reads `changes.tex` on its base.

**No rung depends on another's names or edits (rule 2), with one exception held by the manifest.** X's text describes Y's rule; `landsOnlyWith` and the gather's check hold it.

**Behaviour, by reading.** Y changes only which programs the compiled checker accepts: a generic immediate subtrait of a closed trait whose known extenders are all below listed types. Every program it accepted before, it accepts; the programs it now accepts are of that shape. No compiled output and no walk output changes. X changes prose.

**The checker count.** Y moves it (the `FortressLibrary` api's row, as its overloading and return-type checks run); X does not. The merged-diff review ties every new or risen row to a named rung edit (its check 9). The distance stage moves with Y alone, by class H2's 2 errors.

**The order the gather applies them.** No file is shared, so the order matters only for the folds and X's check: Y, then X. New ledger rows are numbered in manifest order from `LEDGER_FROM`: Y, then X.

## 5. The design choices inside the rungs

**Decided on record.** The rule, its narrow form and its code: the `comprises` decision (2026-09-28), way 11. The clause and walk unchanged; the specification's passage and its reading; row 459 closing and a row for the hole; one batch between 7R and N: the same decision. The specification's form: S1, the unrevised copy's name, the Types chapter beside, the requirement on the plan.

**Read from the record and flagged** (section 1): the count declared as measured on the base, the prediction 7R's landed total plus 65; the hole's home, 3 and not 2, with the reason; rows 354 and 407 left open; X landing only with Y.

**Open for Pavol.** Q1, with its default (1), which is his decision as it stands; taken at (1) unless he answers, and listed for his review (POSITIONS 2026-09-27, the numerics plans, the standing reading).

**The rungs' own choices, reported as decisions, each with the alternatives considered and the evidence that settled it.**
- Y: the tests' shapes and names; the comment above `isEligibleToExtend`; the method's name, if it is not `everyKnownSubtypeListed`.
- X: the normative wording; the callout's label; how the entry is grouped; what its list leaves, with the source that leaves it.

**Not choices of this batch, named so they are not lost.** The api's 66 (batches 7b and 8). The hole's sound check at an object declaration (its new row). The self-type idiom and walk's overflow (row 407). The ellipsis rule (row 354). The team's `where` spelling (row 331). The S1 class's self types (batch 8).

## 6. How it is run

**No probe before it.** Every fork was measured before the decision (the ways note, on the tree at `81f0151be`), and the judgement names what the record does not hold, none of it a fork of this batch (its section 4). The one thing new to measure is Y's count on its base.

**What must land first.** Batch 7R, with its gate's tables, which are this batch's comparands (`explorations/compile-ladder/climb-batch-7r/gate/summary.txt`, `checker-count.txt`, `distance.txt`); the consolidation of `FACTS.md` before the launch (POSITIONS 2026-09-27, on FACTS); Q1's answer or its default. Then this record, read and fixed by the coordinator. It gets no top-tier review in place: the design was settled at the top tier by the judgement Pavol read before deciding (`explorations/reviews/anyintegral-comprises-judgement.md`), and his pre-approval of such reviews (POSITIONS 2026-09-27, the numerics plans, its last sentences: 21:08 UTC) names the records of 7R, N, 7b's second run and 8, not this one.

**Before the launch.**
- `df` read; batch 7R's worktrees removed with their local branches once pushed. Y runs two distance runs; each run's scratch directory is deleted once its table is captured.
- The `MANIFEST` block of section 7 spliced into `explorations/coordinator/climb-batch-workflow.js` in place of the block the script then holds (batch 7R's at this drafting), with `LEDGER_FROM` reset to one above the highest row of `explorations/fortress-gap-ledger.md` at the launch (476 at this drafting, row 475 the highest at `1f50087e6`; batch 7R opens rows from 476, so the number moves) and `COUNT_BASE` set to the `#total` of batch 7R's landed `checker-count.txt` (22 at this drafting, batch 7's); the two lists re-checked with `explorations/coordinator/tools/facts-extract.sh --check` on the launch tree; the line numbers of `changes.tex` re-read there, and those of `TypeHierarchyChecker.scala`, `traits.tex` and X's two tests confirmed unmoved. A changed key or line is changed in section 3 or in `lists7c.py` and the block regenerated, never edited by hand. Then `node --check`, commit and push before the worktrees are cut.
- `git status --porcelain` empty; no other worker writes in the main tree while the batch runs, and none pushes `main` while it gathers.

**Launch.** The worktrees from `<base>`, the commit `main` is at when the coordinator launches (`explorations/coordinator/remote-container.md`): `/home/user/fortress-comprises` on `wip/rung-comprises-checker` and `/home/user/fortress-speccomprises` on `wip/rung-spec-comprises`, each with `ProjectFortress/build` copied and `tmp/` made, and its branch pushed. None exists at this drafting. Then `Workflow({scriptPath: 'explorations/coordinator/climb-batch-workflow.js', args: {base: '<base>'}})`.

**The batch rules.** Rule 1, no two rungs changing one declaration: holds, no file is shared. Rule 2: holds, with X's standing on Y held by `landsOnlyWith`. Rule 3, one rung touching Java or Scala: holds, Y alone (section 1, Q1, for what riding in N does to it). Rule 4: k is 2, two agents at a time; the scatter starts the longest expected first, Y then X (`expectedMinutes` 150 and 90, guesses that set the order only).

**The gate, and what it should show.** The comparands are batch 7R's landed `summary.txt`, `checker-count.txt` and distance table. Expected, by reading:
- `testSystem`: the comparand's sum; no interpreter test is added.
- The compiler track: plus the command lines of Y's new `.test` files, which Y states. The library track and the other `testFast` suites: unchanged.
- The four-thread `atomic` runs: as the comparand.
- The ladder: no rung declares a move; any move down is red.
- The checker count: reported, never red on its own; up by about 65 against 7R's landed total, declared as Y's `expectedCheckerCount`; the crash row unchanged.
- The distance stage: reported, never red; class H2's 2 errors gone, nothing else moved by this batch.

**Provenance.** Each `REPORT.md` opens with the five-line provenance block, its `historical:` line naming every 2012-tree file the rung edits: Y `TypeHierarchyChecker.scala`; X `Specification/basic/traits.tex` and `Specification/appendices/changes.tex`. Every commit whose diff touches a path outside `explorations/` carries the same line (`explorations/protocol.md`, the hard rules).

**Ledger.** New rows are numbered provisionally from `LEDGER_FROM`; the gather assigns final numbers in manifest order, Y then X. Closed with "fixed \<commit\>": 459 (Y). Opened and left open: the hole (Y). Notes: 354 and 407 (Y); 354 and 459 (X, their `traits.tex` citations).

**The push.** Every stop this record reserves for Pavol is reversible (POSITIONS 2026-09-27, the stops): a rung that meets one finishes as its section says, lists it in `stopsMet` with `liftedBy` citing that entry, and lands; the stop is listed for his review, and neither the push nor the next batch waits. The commit stage holds the push only on a stop with no such line (`explorations/coordinator/climb-batch-workflow.md`, "Commit, and the push held on a stop").

**Timings.** Every timing anyone records carries its machine: `nproc`, the CPU model name and MHz from `/proc/cpuinfo`, the load average when the run started, the JDK and `FORTRESS_THREADS` (`explorations/protocol.md`, principle 2).

## 7. The manifest

The block below is drafted to replace the `MANIFEST` block of `explorations/coordinator/climb-batch-workflow.js`, from the rule above the `MANIFEST` comment to the line before `END MANIFEST` (`:58-374` of the script at `1f50087e6`, where it holds batch 7R's run, spliced in `26c5d3dd7`); it is not spliced in. It was generated from section 3 of this record and from the rungs' `briefing` and `checks` lists by a script, in batch 7R's form: each tail is its rung's section word for word, with the code-span backticks dropped, each line JSON-quoted, ASCII only. No tail carries an answer letter: Q1 decides whether this block is launched at all, not what a rung does. Two values are set at the launch and nowhere else: `LEDGER_FROM`, one above the highest row of `explorations/fortress-gap-ledger.md` at the launch, which holds 476 here, the value at the drafting, and is reset at the launch, since batch 7R opens its rows from 476 too; and `COUNT_BASE`, the `#total` of batch 7R's landed `checker-count.txt`, which holds 22 here, batch 7's. Y's `expectedCheckerCount` is `COUNT_BASE + 65`, the rise measured at `81f0151be`; X declares none. The coordinator fills `<base>` at launch through `args.base`.

Checked on scratch copies of the script at `HEAD`, as last committed at `26c5d3dd7` and unchanged at `1f50087e6`, and of the working copy, identical to it, the block spliced in place of `:58-374`, every line outside it byte-identical (`explorations/compile-ladder/plan-7c/manifest/check7c.txt`):
- `node --check` exits 0 on the spliced script, as on the unmodified one.
- With `LEDGER_FROM` unset, and with `COUNT_BASE` unset, the block throws with its message; with `COUNT_BASE` 22, Y's `expectedCheckerCount` is 87, and with 10 it is 75.
- The block with the script's own key validation and scatter line gives batch `7c`, the record `CLIMB-BATCH-7C.md`, the rungs Y and X with X landing only with Y, and the scatter Y, X. Each tail equals its section of section 3 with the backticks dropped; no tail, blurb, intro or overlap string holds a backtick or a non-ASCII character; each `checks` list is a sub-list of its `briefing`, as the script's own check at load requires.
- The whole spliced script, run as the body of an async function with the workflow globals stubbed (`args`, `agent`, `pipeline`, `log`) and every agent approving, calls rung Y, skeptic Y, rung X, skeptic X, the gather, the gate, the review and the commit, and lands; each worker's step 1 renders its rung's `briefing` keys in order (58 and 32), each skeptic's its `checks` (16 and 10), the gather numbers new ledger rows from 476 in the order Y, X, and the gate's prompt carries Y's declared 87. With Y stopping and its judge ruling stop, X is withheld by `applyLandsOnlyWith` ("X lands only with Y ... and Y is stopped") and nothing lands.
- Every key of the four lists matches exactly one place under `explorations/coordinator/tools/facts-extract.sh --check` on `main` at `1f50087e6` (`explorations/compile-ladder/plan-7c/manifest/lists-check.txt`). By the tool's size line, Y's briefing prints about 46K tokens in 5 parts and its `checks` 13K; X's 33K in 3 parts and 7K.
- Nothing was launched.

The generator, the lists, the check and their outputs are `explorations/compile-ladder/plan-7c/manifest/`: `python3 gen7c.py` (it writes `tmp/manifest7c.js`, or `$MANIFEST_OUT`), then `node check7c.js`, then `python3 lists7c.py`. The block is regenerated there and pasted here, never edited by hand.

```js
// ===========================================================================
// MANIFEST - the coordinator replaces everything between this line and the
// "END MANIFEST" line, and changes nothing else in this file.
//
// Concurrency, which the manifest does NOT set: at most two agents at once here
// (FACTS.md, "The Workflow harness runs two agents at once on this box"), a
// freed slot going to the next queued agent, FIFO. k is 2 in this batch (Y, X).
// Per rung: id, slug, path, branch, expectedMinutes (the scatter's start order
// only), tail (the brief), blurb (one line for the shared prefix's table),
// writesState, expectedMoves, and the checker-count fields testIsStage,
// expectedCheckerCount (a printed prediction, never red) and
// expectedCheckerCrash (compared exactly with the table's #crash field; no
// rung of this batch declares one, so any change of the crash row is red).
// Optional: landsOnlyWith, the ids of the rungs a rung lands only with; X
// names Y, and the script applies it after the scatter, so X reaches the
// gather only when Y is approved. briefing: the rung's mission briefing, which
// the planner writes from the record so that the agents learn in context what
// they were never trained on: the keys of
// explorations/coordinator/tools/facts-extract.sh for the POSITIONS.md entries
// (positions:DATE WORDS), gap-ledger rows (ledger:ROW) and earlier rulings
// (doc:PATH#HEADING) the rung rests on; the notes already written on the
// subject, found through INDEX.md (doc:); the specification's sections its
// subject touches (doc: on a .tex heading, code: on a passage); the library and
// checker code that is the precedent for the same kind of problem
// (code:PATH#FROM..TO); and the FACTS.md entries and map rows of its area; in
// reading order, decisions first. The rung worker reads it whole as its step
// 1. And checks, the sub-list of briefing that the skeptic, the repair round
// and the judges read as their step 1: the decisions and ledger rows their
// checks need, and the specification's sections and the precedent code those
// checks compare against. No key holds a double quote, backtick, dollar sign or
// backslash, since each is rendered in double quotes. Each list is checked
// with the tool's --check to match exactly one place per key (on main at the
// drafting; re-checked at the launch).
//
// Batch 7C's values are CLIMB-BATCH-7C.md, sections 3, 6 and 7. Each tail is
// that rung's section of section 3 word for word, with the record's code-span
// backticks dropped (this file carries none); ASCII only. No section carries
// an answer letter: section 1's one question, Q1, is whether this batch runs
// alone or rides in batch N's first run, and this block is launched only when
// it runs alone. Two values are set at launch and nowhere else: LEDGER_FROM,
// one above the highest row of the gap ledger at the launch, which holds the
// drafting's value, 476, and is reset at the launch, since batch 7R, which
// runs first, opens its rows from 476 too; and COUNT_BASE, the #total of
// batch 7R's landed gate/checker-count.txt, which holds the drafting tree's
// 22. Y's expectedCheckerCount is COUNT_BASE plus 65, the rise measured on
// the tree at 81f0151be (the clause's error gone, the api's 66 in), printed
// beside the measured total and never red; X changes nothing the stage reads.
// Manifest order is the ledger numbering order: Y, X. The scatter starts the
// longest expected first: Y, X. No rung declares a ladder move. The base is
// <base>, passed at launch as args.base, not written here.
// ===========================================================================

const LEDGER_FROM = 476   // SET AT LAUNCH: one above the highest row of explorations/fortress-gap-ledger.md at this run's launch (476 at the drafting, 1f50087e6; reset at the launch, since batch 7R opens rows from 476)
if (!Number.isInteger(LEDGER_FROM)) throw new Error('LEDGER_FROM is not set: the first free ledger row at this run\'s launch')
const COUNT_BASE = 22    // SET AT LAUNCH: the #total of explorations/compile-ladder/climb-batch-7r/gate/checker-count.txt, batch 7R's landed table (22 on the drafting tree)
if (!Number.isInteger(COUNT_BASE)) throw new Error('COUNT_BASE is not set: the #total of batch 7R\'s landed checker-count.txt')

const BATCH = '7c'
const BATCH_RECORD = 'explorations/coordinator/CLIMB-BATCH-7C.md'

const Y_TAIL = [
"",
"## Your rung: Y - the 2012 reading in the checker",
"",
"SLUG is rung-comprises-checker. WORKTREE is /home/user/fortress-comprises, branch wip/rung-comprises-checker.",
"",
"Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-7C.md, section 3, under \"Y. The 2012 reading in the checker\"), carried below word for word; where it says what the rung does, decides or records, that is you. The decisions it builds are quoted in section 2 of the record; read them there.",
"",
"**The answers this rung follows.** Q1 decides only whether this batch runs alone or inside batch N's first run; Y's work is the same either way. Y declares the count it measures on its base; the hole a program's own integer type opens is a new row whose capture is already on file; row 459 closes (section 1, read from the record).",
"",
"**Its briefing.** The decisions the rung rests on (the comprises decision, the library commit that parked the accommodation, the type group's later word, the lineage note, route A, the library route, the library's practice, batch 3's declared count, answer 11, the nine-steps brief, the stops, rung D's stop); ledger rows 459, 354 and 407; the judgement's type question, its recommendation and what the record does not hold; the ways note's type question, ways 10 and 11 and its re-measurement against the record; the zero probe's section on the accommodation; the shadow and the captures it produced (the count summary, the switches, the guards, the user program and its capture); the checker's call site and its rule; the team's statement of the rule and its false-list test; the two eligibility probes; the library's AnyIntegral and Integral; the specification's rule, its note and the Molecule example; the later Types chapter's two passages and Welterweight's reading and rule; the FACTS entries on the closure, the ellipsis rule, the hidden layer, the distance, the team's latest word, the checker's scope, the XXX mechanism and the harness; the map's row for the checker. The keys are in section 7; checks is the decision, the parked approval, the stops, rows 459 and 354, the judgement's recommendation, way 11, the zero probe's section, the call site, the rule, the shadow, the team's test, the two probes, the Types chapter's comprises passage and the XXX entry.",
"",
"**The problem.**",
"- trait AnyIntegral extends { Number } comprises { ZZ, ZZ64, ZZ32, NN64, NN32 } end with trait Integral[\\I extends Integral[\\I\\]\\] extends { StandardTotalOrder[\\I\\], MultiplicativeRing[\\I\\], AnyIntegral } (Library/FortressLibrary.fsi:433-436) is refused by the compiled checker: \"Invalid comprises clause: FortressLibrary.AnyIntegral has a comprises clause but its immediate subtype Integral is not eligible to extend it\". Each of the five implements Integral at itself (trait ZZ32 extends { AnyIntegral, Integral[\\ZZ32\\] }, .fsi:510), and only the five extend an instantiation of Integral anywhere in the tree (the ways note, section 1, a grep).",
"- The refusal is the checker's rule: a trait that extends a trait with a clause must be below a listed type, or have a clause of its own whose entries are each eligible (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala:247-266, called at :203-208; the team's statement of it is ProjectFortress/compiler_tests/Compiled10.i.fss, \"(3) Eligibility to extend\"). Integral is generic and cannot be listed: the later Types chapter lets a clause list only types and generic types each of whose parameters is a parameter of the declaring trait (Documentation/Specification/Prose/Language/types.tick:277-283, :384-390), and the bare name is refused before the hierarchy check, \"Type requires static arguments\" (the ways note, way 6).",
"- The api's check stops there, before its overloading and return-type checks (ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java:268-272), so the count stage reads 22 on batch 7's landed tree and never runs them (explorations/compile-ladder/climb-batch-7/gate/checker-count.txt). With the error cleared it read 87 on the tree at 81f0151be: the FortressLibrary row 2 to 132 (each error counted twice), RangeInternals' 21 unchanged, and the api's 66, 61 overloading and 5 return-type errors: FORWARD_CMP 19, IN 7, lift 6, seq 5, juxtaposition 4, generate 4, MIN 4, MAX 4, ivmap 3, map 2, and one each of isLeftZero, copy and SQCAP (explorations/reviews/anyintegral-comprises-ways.md section 2 and way 11; explorations/reviews/anyintegral-comprises-ways/captures/count/narrow-base.txt, summary.txt, and compare.txt, \"1 gone, 66 new\"). The distance stage already counts the 66 and holds the clause as class H2, 2 errors (explorations/compile-ladder/climb-batch-7/gate/distance.txt:12).",
"",
"**The decisions.** The comprises decision (explorations/coordinator/POSITIONS.md, 2026-09-28, AnyIntegral's comprises clause, \"Option 1.\"): the checker learns the 2012 reading of comprises, the later Types chapter's and Welterweight's, by the narrow accommodation Pavol approved and parked on 2026-09-21 (everyKnownSubtypeListed, about 14 Scala lines in TypeHierarchyChecker.scala); the clause and walk stay as they are; the count stage rises as the api's overloading and return-type errors reach it, declared by the rung; a ledger row for the hole every way but the 2008 clause shares. The 66 are batch 7b's and batch 8's, not this batch's. Route A (2026-09-24): no self type enters the library. The library route (2026-09-21): nothing is added to the compiler library. Not this rung's: the specification (rung X); the ellipsis rule (row 354); walk (row 407); any library line.",
"",
"**What the checker and the tree already do.** Evidence, not the brief; the rung lists every way before it chooses.",
"- The narrow form is on file as a shadow. explorations/reviews/anyintegral-comprises-ways/shadow-thc.py:46-64 adds, behind a switch that is off by default, a third disjunct to isEligibleToExtend, (aicwNarrow && !tt.getArgs.isEmpty && everyKnownSubtypeListed(tt, comprises, analyzer)), and the method everyKnownSubtypeListed, which collects every trait in analyzer.traits whose extends clause names the generic subtrait and asks that there be at least one and that each be below a listed type (comprisesContains). It is verbatim from the zero probe's explorations/perf-probes/nat/shadow.patch (explorations/perf-probes/nat/zero.md section 2, \"the rule to land\"). The condition !tt.getArgs.isEmpty restricts it to a generic subtrait, the one kind the later Types chapter says cannot be listed; a plain unlisted extender is still refused, as the Molecule example says (Specification/basic/traits.tex:264-290) and XXX10i.test pins.",
"- Measured on that shadow at 81f0151be, cited here and not to be measured again (explorations/protocol.md, principle 5): the count 22 to 87 with the list above (captures/count/narrow-base.txt); explorations/perf-probes/nat/zero/zElig.fss (trait S comprises { A }, trait A extends S, trait B[\\X\\] extends S, a false list) still refused, and zElig2.fss (a generic C[\\X\\] whose one extender, trait D extends { A2, C[\\ZZ32\\] }, is below the listed A2, a true list) accepted (captures/probes/switches.txt); XXX3q and XXX10p, the guards of the ellipsis rule, failing as pinned (captures/probes/guards.txt); none of the 39 compiler tests whose source has a clause changing (captures/ctests/summary.txt, all switches on, where only XXX10h, XXX10n and XXX9z move, and switches.txt, where those three keep their stock output under this switch alone).",
"- The broad form, any generic immediate subtrait accepted (5 lines, the ways note's way 10), accepts zElig.fss and turns the team's Compiled9.z.fss from 2 errors to 1, so XXX9z goes red (captures/probes/switches.txt). It is not the decision; it is the deliberate local fix on which the rung's guard is shown red.",
"- What the narrow form cannot see: a program's own trait MyIntegral extends Integral[\\MyIntegral\\] end with an object, in another unit, is accepted, as on the tree and under every way but the 2008 clause (explorations/reviews/anyintegral-comprises-ways/probes/UserIntegralTrait.fss, captures/probes/user-integral.txt). The checker checks a clause at the closed trait's immediate subtypes only; the sound check is at an object declaration, Welterweight's rule D-Object (the judgement, section 1, its last paragraph).",
"- The rule is Sukyoung Ryu's of 2009 (360905925; \"(3) Eligibility to extend\" in her proposal 3a8ad3b67). The filter at :262 drops a type variable from a subtrait's own clause, which is why comprises I passes the checker as it stands (way 3, not taken: route A).",
"- Walk never checks comprises (FACTS.md, \"The tower closure of 02d09a39f has no spelling the compiler's checker accepts\"), so the edit cannot change a walk output; the tree passes both microGPT checks with the clause as written (the ways note, section 6).",
"",
"**The test, first.**",
"- In ProjectFortress/compiler_tests/, written before the edit, a plain test in the step's form (a .fss that prints PASS and a .test that links and runs it): a closed trait listing concrete types, with a generic, F-bounded trait between them that each listed type implements at itself, the library's AnyIntegral and Integral shape in the compiler world's own names; and zElig2's shape beside it. On the base the compile is refused with \"... is not eligible to extend it\", captured under probes/ as the recorded failure; after the edit it prints PASS.",
"- The false-list guard: an XXX compiler test with zElig's shape, its .test pinning the refusal with compile_err_equals, as XXX10i.test pins its own. Green before and after the edit; shown red on the broad form, a deliberate local fix that is not committed, and captured (explorations/coordinator/climb-batch-workflow.md, \"Shared prefix\", on a rung's first XXX file).",
"- The count stage (explorations/coordinator/tools/checker-count/run.sh), before and after the edit, captured as probes/checker-count-preedit.txt and probes/checker-count-postedit.txt. This is the one thing new to measure: the tree has changed under the measurement of 81f0151be, since batch 7R's rung J rewrote the range operator block of the FortressLibrary api and RangeInternals. The report sets each of the 66 against its line of the ways note's list (captures/count/narrow-base.txt, positions masked as compare.txt masks them) and names every error that is gone, changed or new with the edit of batch 7R that did it.",
"- The distance stage (explorations/coordinator/tools/distance/run.sh), before and after, each through run_bg (14 to 24 minutes), captured as probes/distance-preedit.txt and probes/distance-postedit.txt and compared with compare.sh. Expected by reading: class H2's 2 errors go and nothing else moves (the judgement, section 4, its first gap).",
"",
"**What it writes.** The disjunct and everyKnownSubtypeListed in TypeHierarchyChecker.scala, with no switch; the comment above isEligibleToExtend, which lists the rule's cases, kept true; the two tests; its report and record.",
"",
"**What is not measured again.** The 39 compiler tests with a clause, XXX3q and XXX10p: the shadow measured them with these lines, and batch 7R keeps every compiled test's verdict (a stop of its own); the gate's compiler track runs them. Walk: the edit is in the checker alone, and the gate's testSystem, atomic runs and ladder run walk anyway. The hole's probe: on file under both forms of the accommodation.",
"",
"**Files it may touch.** ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala, isEligibleToExtend with its comment (:247-266) and one new private method beside it; its new tests in ProjectFortress/compiler_tests/; its own directory. Not: the call site and the ellipsis rule (:185-219) or the check of listed types (:220-242); any other Java or Scala file, compiler/StaticChecker.java among them, whose copy the count stage checks; the files the distance stage patches as it runs (explorations/coordinator/tools/distance/shadow-patch.py, add-patch.py); Library/ and ProjectFortress/LibraryBuiltin/; interpreter/; Specification/, which is X's; any existing test; explorations/run-c4/ and explorations/apl/.",
"",
"**Java or Scala.** Scala. ant compileAll, default_repository/caches/global.map restored after it (FACTS.md, \"ant compileAll deletes a tracked file\").",
"",
"**The checker count.** Declared: the rung's two tables are its declaration, their totals and any change of the crash row stated in REPORT.md and record.md. By arithmetic from 81f0151be the total rises by 65 (the clause's error gone, the 66 in) and the FortressLibrary row by 130; the manifest's expectedCheckerCount is that prediction, batch 7R's landed total plus 65, printed beside the measured one and never red. On 81f0151be the crash row read none under the narrow form as on the tree (captures/count/narrow-base.txt, base.txt).",
"",
"**What must stay green, or keep its verdict.** Every compiled test's verdict other than the new tests'; every interpreter test's; the ladder's 85 files.",
"",
"**Stops.**",
"- A compiled test's verdict changing, other than the rung's new tests'; a ladder file moving down.",
"- An edit outside isEligibleToExtend and the one new method, or to any other Java or Scala file; a switch or system property left in the rule.",
"- A line of Library/, ProjectFortress/LibraryBuiltin/ or interpreter/; a line of explorations/run-c4/src/ or explorations/apl/mg/.",
"- A walk output changing: by construction there is none, so one means the rung touched more than it says.",
"- A count-stage error on the rung's base that neither its edit nor a named edit of batch 7R accounts for; a change of the crash row that the rung does not declare.",
"- Not a stop: an output difference that the untouched tree already shows from run to run, with the test's verdict unchanged; it is a ledger row (POSITIONS 2026-09-26, rung D's stop).",
"",
"**For the skeptic.** The recorded failure, and the plain test passing; the guard green, and red on the broad form, re-run once; the two count tables re-run and set against the ways note's list, each change tied to its edit of batch 7R; the two distance tables, H2's 2 errors gone and nothing else moved; the landed code against shadow-thc.py:46-64 line by line, the switch gone and nothing else different; the diff confined to the two methods; the hole's home as below.",
"",
"**What comes back to Pavol.** The Scala edit as a diff; the count stage's move api by api, the 66 by name against the ways note's list; the new row.",
"",
"**What it closes.** Row 459 (fixed: the clause checks as written). Opens and leaves open: the hole, a program's own type below an instantiation of Integral, declared in another unit, accepted. Its home is 3, the probe and capture already on file (explorations/reviews/anyintegral-comprises-ways/probes/UserIntegralTrait.fss, captures/probes/user-integral.txt), and the report says why it is not home 2, in place of the silence home 3 names: the specification's later word settles it, since every value of a closed trait belongs to a listed type (types.tick:384-390; Papers/Welterweight/grammar.tick:21-22), but no gated test can hold that answer today, because an XXX compile test demands that the compile fail, which the checker does not yet do, and a plain test would pin the wrong answer (FACTS.md, \"The XXX expected-failure mechanism in compiler_tests/ and library_tests/ can express a compile-stage failure only\"). The sound check is at an object declaration, Welterweight's D-Object; a candidate for batch 8 or later. Notes: row 354 (the ellipsis rule untouched, its guards unchanged); row 407 (the self-type idiom not taken, walk's overflow untouched).",
"",
].join('\n')

const X_TAIL = [
"",
"## Your rung: X - the 2012 reading in the specification",
"",
"SLUG is rung-spec-comprises. WORKTREE is /home/user/fortress-speccomprises, branch wip/rung-spec-comprises.",
"",
"Your brief is this rung's section of the batch record (explorations/coordinator/CLIMB-BATCH-7C.md, section 3, under \"X. The 2012 reading in the specification\"), carried below word for word; where it says what the rung does, decides or records, that is you. The decisions it builds are quoted in section 2 of the record; read them there.",
"",
"**The answers this rung follows.** Q1 does not change X's work. X lands only if Y lands (its manifest entry's landsOnlyWith).",
"",
"**Its briefing.** The decisions (the comprises decision, the S1 form, the name of the unrevised copy, the lineage note, the type group's later word, the requirement on the plan, the stops, rung D's stop); ledger rows 459, 354 and 407; the judgement's type question and its recommendation with the specification change in the S1 form; the ways note's type question; the specification's trait declarations section whole, the frozen copy's note, and Appendix I's entry on where-clause variables and its \"Passages not yet revised\"; the later Types chapter's two passages, Welterweight's reading and its rule D-Trait; the library's AnyIntegral and Integral; the checker's rule and the shadow of Y's edit; the lineage note's topic list and rung S's form section; the FACTS entries on the frozen copy, the team's latest word, the refused examples and the closure; the map's row for the specification. The keys are in section 7; checks is the decision, the S1 form, the unrevised copy's name, the lineage note, the stops, the recommendation, the frozen note, the Types chapter's comprises passage, the where-clause entry and the form section.",
"",
"**The problem.**",
"- The trait chapter's draft note says that a closed trait's listed traits \"are exactly the traits that immediately extend T and they must explicitly extend T\" (Specification/basic/traits.tex:235-246). It restates the checker's 2009 rule, is in the draft by 2009-11-06, and is a \\note, which a release build drops (Specification/fortress/fortress.tex:35-36; the ways note, section 1). Once Y lands, the checker accepts AnyIntegral's clause (Library/FortressLibrary.fsi:433-436), whose generic Integral extends the closed trait unlisted, and the note refuses it: the specification and the implementation would disagree openly (POSITIONS 2026-09-24, the requirement on the plan).",
"- The rendered text says a listed reference \"is a declared trait identifier\" (traits.tex:163-165), and Victor Luchangco's note beside it asks whether that includes \"instantiations of parametric traits\" (:166-170); the text never answers.",
"- The group's later texts read a clause as coverage. The Types chapter: a clause \"specifies a set of types and generic types determined by the generic type of the declaration. An instantiation of the generic type defined by such a declaration is covered by the union of the types in this set and the corresponding instantiations of the generic type in this set\" (Documentation/Specification/Prose/Language/types.tick:384-390), where G determines G' \"if every parameter of G' is a parameter of G\" (:277-283). Welterweight: \"no value can belong to the trait unless it also belongs to one of the comprised types\" (Papers/Welterweight/grammar.tick:21-22), its rule D-Trait asking nothing of the traits that extend a closed trait (Papers/Welterweight/fig-wellformeddecls.tick:38-62).",
"",
"**The decisions.** The comprises decision (POSITIONS 2026-09-28, AnyIntegral's comprises clause): an S1 callout in Specification/basic/traits.tex in place of the draft note at :234-246, adopting the later Types chapter's reading, with its Appendix I entry. The judgement's section 3, \"The specification change, in the S1 form\", is the content: the note's first sentence becomes rendered text in the Types chapter's words; a clause lists types, and generic types each of whose parameters is a parameter of the declaring trait; every value of the trait belongs to one of the listed types; a trait that extends a closed trait is listed in its clause, or has a clause of its own whose entries each are; a trait with static parameters the closed trait does not have cannot be listed, and it may extend the closed trait when at least one type extends it and every type that extends it is a subtype of a listed type. The note's ellipsis sentence (:241-246) and the Molecule example (:264-290) stay as they are, and Victor's question is answered by the new text. The type group's later word weighs more (2026-09-23), and the Types chapter is cited beside Specification/ where it covers a topic (2026-09-26, the lineage note). The form, S1 (2026-09-26): the normative text edited in place, a \\revision callout at the passage (Specification/fortress/fortress.tex:87-93), an Appendix I entry quoting the original as \"the Working Draft of February 2011\" with its path and line in Specification-1.0-frozen/ (2026-09-26, the first of the batch-5 answers), and the reasons in a decision record. Not this rung's: the checker (Y); a type variable in a clause (the self-type idiom, which Welterweight's grammar drops and route A does not take); the ellipsis rule (row 354).",
"",
"**What the specification and the library already say.** Evidence, not the brief.",
"- The revival's callout in the same section, at the draft notes on hidden type variables (traits.tex:181-185), with its Appendix I entry \"Where-clause variables in extends clauses\" (Specification/appendices/changes.tex:119-146), is the model: a box that answers a draft note of the team's.",
"- The original the entry quotes is the frozen copy's note, Specification-1.0-frozen/basic/traits.tex:230-241, its first sentence :231-235.",
"- The library's clause and the team's comment on it: trait AnyIntegral extends { Number } comprises { ZZ, ZZ64, ZZ32, NN64, NN32 } end and \"not yet: comprises Integral[\\I\\] where [\\I\\]\" (Library/FortressLibrary.fsi:433-434). The five are the instantiations the comment means, and the Types chapter lets AnyIntegral list only them.",
"- Karl Naden's journal text (2012) reads the same closure at the type level through the self-type idiom, \"the type Ring[\\X\\] is identified as X\" (Papers/Types/journal/justificationOfRTR.tex:580-582); the decision takes the coverage reading, which agrees with it on every value (the judgement, section 1).",
"- The rule the text states is Y's: explorations/reviews/anyintegral-comprises-ways/shadow-thc.py:46-64 with its switch removed (Y's section). Its limit, an object declared in another unit below such a trait, is Y's new ledger row.",
"- Rung S's decision record, section 3.9, is the form of a revival change to the specification (explorations/compile-ladder/rung-spec-route-a/decision-record.md).",
"",
"**What it writes.** First, before any edit, the list: every passage of Specification/ outside library/apis/ that says what a comprises clause may list or what it asks of the traits that extend a closed trait, with what the decision makes of it, whether it is revised now or left, and the source that settles it. The starting list, a grep at the drafting: traits.tex:156-170, :234-246 and :264-290; Specification/basic/types-vals-vars.tex:568-610; Specification/basic/expressions/var-ref.tex:63-70; Specification/basic/components/source-code.tex:372-392; Specification/advanced/overloading.tex:282-305; Specification/appendices/future.tex:269-280. Then:",
"- the passage at traits.tex:234-246: the note's first sentence replaced by normative text stating the decision's reading, with a \\revision callout; the ellipsis sentence kept as it is, in its note;",
"- the Appendix I entry, a new subsection inserted immediately before \"Passages not yet revised\", after the entries batch 7R's rung U adds there (re-read on the base), with its six items (Affected section, Change, Rationale, Effect, Original text, Route C): the original quoted whole from Specification-1.0-frozen/basic/traits.tex:230-241; the Effect saying that the one library's AnyIntegral checks, that no example changes, and that the compiled checker enforces the condition over the declarations it sees, an object declared elsewhere below such a trait being a row of the revival's gap ledger (the gather writes its number); Route C the same, since under route C's comprises T on the self-typed traits the condition is never reached;",
"- the decision record, explorations/compile-ladder/rung-spec-comprises/decision-record.md;",
"- every citation of a line of traits.tex below :234 in the messages and comments of ProjectFortress/tests/, compiler_tests/ and library_tests/, re-anchored by the map of unchanged lines from git show <base>:Specification/basic/traits.tex to its tree, never an assertion: ProjectFortress/tests/XXXFlatStringSplitRungL.fss:11 (:525-531) and ProjectFortress/compiler_tests/XXXTupleVarFieldCompiledRungC.fss:21-22 (:446-448) (a grep at the drafting).",
"",
"**How it is checked.** No test can go red for a prose edit. The specification is built as rungs S, T and U built it (./ant genSource, then ./ant tex, in Specification/fortress/, with FORTRESS_HOME the worktree), on the base and after, the logs captured; pdftotext of the two PDFs diffed, showing only the revised passage, the callout, the appendix entry and page shifts; git diff --stat showing only the listed files; every re-anchored citation opened. The rung does not commit Specification/fortress.pdf; the gather rebuilds it once on the merged tree.",
"",
"**Files it may touch.** Specification/basic/traits.tex, the passage at :234-246 only; Specification/appendices/changes.tex, its new subsection; the messages and comments of the two tests named; what its list finds, each named and reported; its own directory. Not: Specification-1.0-frozen/; Specification/fortress.pdf; any source, library or test assertion; Y's files.",
"",
"**Java or Scala.** Neither.",
"",
"**The checker count.** Unchanged: the rung edits nothing the stage reads. Not captured.",
"",
"**Stops.**",
"- Any edit under Specification-1.0-frozen/.",
"- Normative text stating more than the decision and Y's section build: a type variable allowed in a clause, a rule about objects declared in other units, or a change to the ellipsis sentence or the Molecule example among it.",
"- A passage of the list whose new text neither the decision nor Y's section settles: the rung reports it and does not choose.",
"- An assertion changed in a re-anchored test; a file Y edits.",
"- Not a stop: an output difference that the untouched tree already shows from run to run, with the test's verdict unchanged (POSITIONS 2026-09-26, rung D's stop).",
"",
"**For the skeptic.** Every sentence of the new text against the decision, the judgement's section 3 and Y's section (Y's code is not in X's tree; the gather checks the text against it once both are applied); the quoted original against the frozen copy's lines; the two builds and the pdftotext diff; each re-anchored citation opened; the list against the grep.",
"",
"**What comes back to Pavol.** The revised page, as the pdftotext diff; the Appendix I entry; the list, with what was left and why.",
"",
"**What it closes.** No row by number. Notes appended where the rung moved a cited line: rows 354 and 459 (their citations of traits.tex). The FACTS entry \"The tower closure of 02d09a39f has no spelling the compiler's checker accepts\" is rewritten at the gather: the clause checks after Y, and the note it cites is revised.",
"",
].join('\n')

const Y_ENTRY = { id: 'Y', slug: 'rung-comprises-checker', path: '/home/user/fortress-comprises', branch: 'wip/rung-comprises-checker', tail: Y_TAIL, expectedMinutes: 150, writesState: false, testIsStage: false, expectedCheckerCount: COUNT_BASE + 65,
    blurb: "the compiled checker learns the 2012 reading of comprises: a generic subtrait of a closed trait is eligible when every trait the checker knows below it is below a listed type (everyKnownSubtypeListed, about 14 Scala lines in TypeHierarchyChecker.scala), so that AnyIntegral's clause checks as written; a compiler test and a false-list guard; the count stage declared.",
    briefing: [
      "positions:2026-09-28 comprises clause four options", "positions:2026-09-21 library commit", "positions:2026-09-23 exclusion-rule fork",
      "positions:2026-09-26 lineage note", "positions:2026-09-24 exclusion route rung P's fork", "positions:2026-09-21 library route",
      "positions:2026-09-19 answering the open question", "positions:2026-09-23 checker count", "positions:2026-09-26 answer 11",
      "positions:2026-09-28 nine-steps worker", "positions:2026-09-27 stops a batch record reserves", "positions:2026-09-26 rung D's stop", "ledger:459",
      "ledger:354", "ledger:407", "doc:explorations/reviews/anyintegral-comprises-judgement.md#1. The type question, in plain words",
      "doc:explorations/reviews/anyintegral-comprises-judgement.md#3. The recommendation",
      "doc:explorations/reviews/anyintegral-comprises-judgement.md#4. What the record does not hold",
      "doc:explorations/reviews/anyintegral-comprises-ways.md#1. The type question",
      "doc:explorations/reviews/anyintegral-comprises-ways.md#Way 10. The parked accommodation, broad form",
      "doc:explorations/reviews/anyintegral-comprises-ways.md#Way 11. The parked accommodation, narrow form",
      "doc:explorations/reviews/anyintegral-comprises-ways.md#6. Re-measured against the record",
      "doc:explorations/perf-probes/nat/zero.md#2. The closure's accommodation", "doc:explorations/reviews/anyintegral-comprises-ways/shadow-thc.py",
      "doc:explorations/reviews/anyintegral-comprises-ways/captures/count/summary.txt",
      "doc:explorations/reviews/anyintegral-comprises-ways/captures/probes/switches.txt",
      "doc:explorations/reviews/anyintegral-comprises-ways/captures/probes/guards.txt",
      "doc:explorations/reviews/anyintegral-comprises-ways/captures/probes/user-integral.txt",
      "doc:explorations/reviews/anyintegral-comprises-ways/probes/UserIntegralTrait.fss",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala#val comprises = toSet(si.comprisesTypes)..should not be extended",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala#S does not have any comprises clause, or (already checked)..private def comprisesContains",
      "doc:ProjectFortress/compiler_tests/Compiled10.i.fss", "doc:ProjectFortress/compiler_tests/XXX10i.test",
      "doc:ProjectFortress/compiler_tests/Compiled9.z.fss", "doc:ProjectFortress/compiler_tests/XXX9z.test",
      "doc:explorations/perf-probes/nat/zero/zElig.fss", "doc:explorations/perf-probes/nat/zero/zElig2.fss",
      "code:Library/FortressLibrary.fsi#trait AnyIntegral extends { Number } comprises..MultiplicativeRing[",
      "code:Specification/basic/traits.tex#A trait reference listed in the..instantiations of parametric traits",
      "code:Specification/basic/traits.tex#If a trait declaration of..(see",
      "code:Specification/basic/traits.tex#The following example trait:..though only",
      "code:Documentation/Specification/Prose/Language/types.tick#We say that one generic type..with the corresponding arguments of",
      "code:Documentation/Specification/Prose/Language/types.tick#comprises} clause,..corresponding instantiations of the generic type in this set",
      "code:Papers/Welterweight/grammar.tick#the comprises clause, if present..to one of the comprised types",
      "code:Papers/Welterweight/fig-wellformeddecls.tick#[D-Trait]", "The tower closure of",
      "The compiled checker refuses every api-declared trait that extends a trait whose", "Crashes reach zero in the shadow",
      "The hidden layer, classified", "The true distance to the switch-over", "The distance to the switch-over by root cause",
      "The team's latest word on types", "The static type checker (Scala, scala_src/typechecker/) runs only on the compile path",
      "The XXX expected-failure mechanism in compiler_tests", "An XXX compile test pinned by compile_err_contains",
      "ant compileAll deletes a tracked file", "The checker-count stage's table", "map:README.md#Touch this@scala_src/typechecker"],
    checks: [
      "positions:2026-09-28 comprises clause four options", "positions:2026-09-21 library commit", "positions:2026-09-27 stops a batch record reserves",
      "ledger:459", "ledger:354", "doc:explorations/reviews/anyintegral-comprises-judgement.md#3. The recommendation",
      "doc:explorations/reviews/anyintegral-comprises-ways.md#Way 11. The parked accommodation, narrow form",
      "doc:explorations/perf-probes/nat/zero.md#2. The closure's accommodation",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala#val comprises = toSet(si.comprisesTypes)..should not be extended",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala#S does not have any comprises clause, or (already checked)..private def comprisesContains",
      "doc:explorations/reviews/anyintegral-comprises-ways/shadow-thc.py", "doc:ProjectFortress/compiler_tests/Compiled10.i.fss",
      "doc:explorations/perf-probes/nat/zero/zElig.fss", "doc:explorations/perf-probes/nat/zero/zElig2.fss",
      "code:Documentation/Specification/Prose/Language/types.tick#comprises} clause,..corresponding instantiations of the generic type in this set",
      "The XXX expected-failure mechanism in compiler_tests"],
    expectedMoves: [] }

const X_ENTRY = { id: 'X', slug: 'rung-spec-comprises', path: '/home/user/fortress-speccomprises', branch: 'wip/rung-spec-comprises', tail: X_TAIL, expectedMinutes: 90, writesState: false, testIsStage: false, landsOnlyWith: ["Y"],
    blurb: "the specification's draft note on comprises clauses (Specification/basic/traits.tex:234-246) replaced by rendered text in the later Types chapter's reading, with a revival callout and an Appendix I entry, in the S1 form; lands only with Y; no source and no test assertion.",
    briefing: [
      "positions:2026-09-28 comprises clause four options", "positions:2026-09-26 S1", "positions:2026-09-26 first of the batch-5 answers",
      "positions:2026-09-26 lineage note", "positions:2026-09-23 exclusion-rule fork", "positions:2026-09-24 requirement on the plan",
      "positions:2026-09-27 stops a batch record reserves", "positions:2026-09-26 rung D's stop", "ledger:459", "ledger:354", "ledger:407",
      "doc:explorations/reviews/anyintegral-comprises-judgement.md#1. The type question, in plain words",
      "doc:explorations/reviews/anyintegral-comprises-judgement.md#3. The recommendation",
      "doc:explorations/reviews/anyintegral-comprises-ways.md#1. The type question", "doc:Specification/basic/traits.tex#Trait Declarations",
      "code:Specification-1.0-frozen/basic/traits.tex#If a trait declaration of..(see",
      "doc:Specification/appendices/changes.tex#Where-clause variables in extends clauses",
      "doc:Specification/appendices/changes.tex#Passages not yet revised",
      "code:Documentation/Specification/Prose/Language/types.tick#We say that one generic type..with the corresponding arguments of",
      "code:Documentation/Specification/Prose/Language/types.tick#comprises} clause,..corresponding instantiations of the generic type in this set",
      "code:Papers/Welterweight/grammar.tick#the comprises clause, if present..to one of the comprised types",
      "code:Papers/Welterweight/fig-wellformeddecls.tick#[D-Trait]",
      "code:Library/FortressLibrary.fsi#trait AnyIntegral extends { Number } comprises..MultiplicativeRing[",
      "code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala#S does not have any comprises clause, or (already checked)..private def comprisesContains",
      "doc:explorations/reviews/anyintegral-comprises-ways/shadow-thc.py", "doc:explorations/coordinator/spec-lineage.md#6. The consequence",
      "doc:explorations/compile-ladder/rung-spec-route-a/decision-record.md#3.9 The form", "Specification-1.0-frozen/ is byte for byte",
      "The team's latest word on types", "The specification states instantiation exclusion, and its refused examples", "The tower closure of",
      "map:README.md#Touch this@Specification/ (the standard)"],
    checks: [
      "positions:2026-09-28 comprises clause four options", "positions:2026-09-26 S1", "positions:2026-09-26 first of the batch-5 answers",
      "positions:2026-09-26 lineage note", "positions:2026-09-27 stops a batch record reserves",
      "doc:explorations/reviews/anyintegral-comprises-judgement.md#3. The recommendation",
      "code:Specification-1.0-frozen/basic/traits.tex#If a trait declaration of..(see",
      "code:Documentation/Specification/Prose/Language/types.tick#comprises} clause,..corresponding instantiations of the generic type in this set",
      "doc:Specification/appendices/changes.tex#Where-clause variables in extends clauses",
      "doc:explorations/compile-ladder/rung-spec-route-a/decision-record.md#3.9 The form"],
    expectedMoves: [] }

const RUNGS = [Y_ENTRY, X_ENTRY]
const HAS_RUNG = (id) => RUNGS.some(r => r.id === id)

const INTRO_RUNG = {
  Y: "Y teaches the compiled checker the 2012 reading of a comprises clause, the later Types chapter's and Welterweight's: a generic immediate subtrait of a closed trait is eligible to extend it when at least one trait the checker knows extends it and every such trait is below a listed type (the narrow accommodation, everyKnownSubtypeListed, approved and parked on 2026-09-21), so that the one library's AnyIntegral clause checks as written and the FortressLibrary api's overloading and return-type checks run on the count stage.",
  X: "X revises the specification to match, in the S1 form: the draft note at Specification/basic/traits.tex:234-246 becomes rendered text in the later Types chapter's reading (Documentation/Specification/Prose/Language/types.tick:384-390), with a revival callout and its Appendix I entry.",
}
const INTRO_STOPS = {
  Y: "for Y, a compiled test's verdict changing other than its new tests', or a ladder file moving down; an edit outside isEligibleToExtend and the one new method beside it, or to any other Java or Scala file; a switch or system property left in the rule; a line of Library/, ProjectFortress/LibraryBuiltin/ or interpreter/; a walk output changing; a count-stage error on its base that neither its edit nor a named edit of batch 7R accounts for, or a crash row it does not declare; and a line of explorations/run-c4/src/ or explorations/apl/mg/",
  X: "for X, any edit under Specification-1.0-frozen/; normative text stating more than the decision and Y's section build, a type variable allowed in a comprises clause, a rule about objects declared in other units, or a change to the ellipsis sentence or the Molecule example among it; a passage of its list whose new text neither the decision nor Y's section settles (reported, not chosen); and an assertion changed in a re-anchored test",
}
const INTRO_LIFTED = {
  Y: "Y makes the compiled checker accept a generic immediate subtrait of a closed trait when every trait it knows below that subtrait is below a listed type, against the draft note at Specification/basic/traits.tex:235-246, which rung X revises (the comprises decision, POSITIONS.md 2026-09-28, AnyIntegral's comprises clause)",
  X: "X replaces the draft note's first sentence with rendered normative text in the later Types chapter's reading (the same decision)",
}
const OVERLAP_RUNG = {
  Y: "Y edits isEligibleToExtend in ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala and adds one private method beside it, and adds its tests to ProjectFortress/compiler_tests/.",
  X: "X edits the passage at Specification/basic/traits.tex:234-246, adds its subsection to Specification/appendices/changes.tex, and re-anchors the traits.tex citations in the messages and comments of two tests (ProjectFortress/tests/XXXFlatStringSplitRungL.fss and ProjectFortress/compiler_tests/XXXTupleVarFieldCompiledRungC.fss); never Specification-1.0-frozen/ or Specification/fortress.pdf.",
}

const BATCH_INTRO = [
  "This batch is climb batch 7C, comprises after the 2012 reading, as Pavol decided it on 2026-09-28 (POSITIONS.md, AnyIntegral's comprises clause, \"Option 1.\"): the compiled checker learns the later Types chapter's reading of a comprises clause, the clause itself and walk staying as they are, and the specification says so. It runs after climb batch 7R (ranges over ZZ32) has landed, and before batch N, the inference rule with the numeral switch.",
  RUNGS.map(r => INTRO_RUNG[r.id]).join(' '),
  "Each rung's section of the record opens with the answers of its section 1 that it follows; section 1's one question, whether the batch runs alone or in batch N's first run, changes no rung's work.",
  'The stops reserved for Pavol in this run, on top of the standing ones: ' + RUNGS.map(r => INTRO_STOPS[r.id]).join('; ') + '; and any rung editing a file the other rung owns (the record\'s section 4).',
  RUNGS.some(r => INTRO_LIFTED[r.id]) ? 'Standing stops lifted by his decisions and by nothing else, none of them deleting a test: ' + RUNGS.filter(r => INTRO_LIFTED[r.id]).map(r => INTRO_LIFTED[r.id]).join('; ') + '.' : '',
  "Every stop reserved for Pavol in this run is reversible (POSITIONS.md, 2026-09-27, on the stops a batch record reserves for him: \"These don't need me now. They are reversible things I can review later. Don't block start of next batches on these.\"): a rung that meets one finishes as its section says, lists it in stopsMet with liftedBy citing that entry, POSITIONS.md 2026-09-27, the stops, and lands; the stop is listed for his review, and neither the push nor the next batch waits for it. A stop the record does not reserve, or one that cannot be undone, holds the commit stage's push as before.",
  "An output difference that the untouched tree already shows from run to run, with the test's verdict unchanged, is a ledger row and not a stop (POSITIONS.md, 2026-09-26, rung D's stop).",
  "What the record has measured is handed over as findings to cite, with their sources, and is not measured again unless the tree has changed under it (explorations/protocol.md, principle 5; POSITIONS.md, 2026-09-28, the nine-steps worker's brief): each rung's section names what is new to measure.",
  "A rung that edits a chapter of Specification/ re-anchors, in its own commit, every citation of a line of that chapter that its edit moves in the messages and comments of ProjectFortress/tests/, compiler_tests/ and library_tests/, by the map of unchanged lines from git show <base>:<chapter> to its tree, and never changes an assertion (explorations/compile-ladder/climb-batch-6/JUDGE-review.md, finding 1).",
  "The gather's rules: X lands only if Y lands, whatever the approved list says (X's landsOnlyWith); after both are applied, the gather checks every rule X's text states against Y's landed code and tests, fixes X's text where the decision settles a mismatch, and reports any other to the review as blocking; and it writes the final number of Y's new ledger row into X's Appendix I entry, where X names that row.",
  "No rung commits Specification/fortress.pdf: after both rungs are applied, the gather rebuilds the specification on the merged tree (./ant genSource, then ./ant tex, in Specification/fortress, the PDF copied to Specification/fortress.pdf), since X edits the specification, and removes the build's ignored products.",
  "Two worktrees share one disk: Y runs two distance runs, deletes each run's scratch directory once its table is captured, and reads df before each.",
  "If the harness refuses an agent's write of REPORT.md, record.md or SKEPTIC.md, the agent says so and carries the text in its structured result as fully as the fields allow, and every list a rung hands Pavol is also a capture under probes/; the gather composes the file from them, as in batches 3.5 to 7R.",
  "Cite a FACTS.md entry by its bold title beside its line, and a POSITIONS.md decision by its date and entry name, since both files' line numbers move.",
  "Any timing anyone records carries its machine: nproc, the CPU model name and MHz from /proc/cpuinfo, the load average when the run started, the JDK and FORTRESS_THREADS (protocol.md, principle 2).",
].filter(Boolean).join(' ')
const BATCH_OVERLAPS = RUNGS.map(r => OVERLAP_RUNG[r.id]).join(' ') + ' ' + "No file is shared. X's text states Y's rule and lands only with it. Batch 7R (J and U) has landed in the base: Y edits no file J edits (J's Scala edit, if it made one, is at the case site of Functionals.scala), and no library line; X inserts its Appendix I subsection after U's, before Passages not yet revised, and edits no line U edits. The checker count reads Y's change: the FortressLibrary api, which stops at its hierarchy pass on AnyIntegral's clause since batch 7, reaches its overloading and return-type checks; X changes nothing the stage reads. The files both rungs reach are the three record files, folded centrally by the gather."
```

## 8. Script readiness

Read against `explorations/coordinator/climb-batch-workflow.js` as committed at `1f50087e6`, unchanged since `26c5d3dd7`, which spliced batch 7R's manifest into it. What this batch needs is in it and serves unchanged:
- every agent call retried through `callAgent`; the report texts carried in structured results; the push held only on a stop that no `POSITIONS.md` line lifts (`pushHeldBy`);
- `landsOnlyWith`, which withholds X when Y is not approved (seen in the stubbed run of section 7);
- each rung's `briefing` and `checks`, rendered as every role's step 1;
- for a rung that does not set `testIsStage`, the worker's test-first step with a compiler test that prints `PASS`, and the skeptic's check 10, which reads the count table the rung's tail names (`:786-790`); Y's tail names both of its tables;
- `expectedCheckerCount`, printed by the gate beside the measured total as a declaration, never red (`:1839-1840`);
- the distance stage: the gate starts it after `compileAll` and reads it as step 9, reported and never red, against `last_landed_distance`; Y's tail asks for its own two runs;
- the checker count with the overloading memo off, so that the `FortressLibrary` api's overloading rows, which this batch brings onto the stage, read the same on every build.

Two things are needed, both at the launch, neither a change to the script's code:
1. **The manifest.** Section 7's block replaces the block the script then holds, with `LEDGER_FROM` reset and `COUNT_BASE` set as section 6 says, the four lists re-checked with `facts-extract.sh --check` on the launch tree (batch 7R's gather folds and retitles `FACTS.md` entries, and the consolidation before the launch may too), and the line numbers of `changes.tex` re-read; a changed key or line is changed in section 3 or in `lists7c.py`, and the block regenerated, never edited by hand. Then `node --check`, commit and push before the worktrees are cut.
2. **The comparands.** Batch 7R's commit stage lands its gate's `summary.txt`, `checker-count.txt` and `distance.txt` under `explorations/compile-ladder/climb-batch-7r/gate/`; the gate's `last_landed_summary`, `last_landed_checker_count` and `last_landed_distance` take the newest commit touching `climb-batch-*/gate/`, so this batch compares against 7R with nothing to set. `BATCH` is `7c`, which names `explorations/compile-ladder/climb-batch-7c/` and `tmp/gate-batch-7c/`.

Nothing else is needed. The intro tells a rung that meets a reserved stop to cite `POSITIONS.md`, 2026-09-27, the stops, in `liftedBy`, and `pushHeldBy` counts such an entry as lifted. The re-anchoring rule, the gather's check of X against Y and the ledger number it writes into X's entry are carried in the intro, as batch 7R carried its rules, so they need no change to the shared prefix or the gather's role.
