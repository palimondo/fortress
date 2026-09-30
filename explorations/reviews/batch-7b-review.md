<!-- The post-batch review of climb batch 7b, the second run of coordinator/CLIMB-BATCH-7.md (rung C e2f1aa7e8, rung S 576b4c287, rung W 8f7e183d4, rung L 070ef39e5, the merged-diff review's corrections 720db2671, the landing b0eb41516), run wf_61521277-479 from the base 811053f15: launched 22:52 UTC on 2026-09-29, killed in part by a VM restart at 23:57, resumed at 23:59, stopped at 02:16 by the account's weekly limit, resumed at 04:45, landed at 08:08. It is the combined pass Pavol asked for on 2026-09-28 (POSITIONS, reviews after a batch), in the form of reviews/batch-6.5b-review.md: conformance, the process measures and the routing check. Two additions, as the coordinator's brief asked: whether the practice of the post-mortem of 2026-09-29 held (postmortem-2026-09-29/synthesis.md section 1, the batch script and its manual), and the tokens counted as writes only (cache writes plus new input, never cache reads), against batch 6.5b's figures in postmortem-2026-09-29/characterization.md. For the coordinator, who routes its findings into PLAN.md, and for Pavol, who reads the first section. Written 2026-09-30 from 08:15 UTC by a review worker, reading only, against main at 8c6e858ce while another worker edits FACTS, POSITIONS, PLAN, INDEX and the handover. Nothing built, no Fortress program run, no gate stage run. The transcripts were read only through bounded scripts, which stay in the session's scratchpad and are not committed (no shared review tool exists yet; finding 10). -->

# Climb batch 7b: conformance, process and routing

## For Pavol

- All four rungs are in the spirit of your decisions and of the designers.
  - S writes answer 9's model into the specification in the S1 form, with your decisions on items 16, 23, 26 and 30 and the paper's instance rule.
  - C builds the return-type rule over every instance and the positional rule, and repairs the checker's half of row 492.
  - W makes walk choose by declared domains, and repairs walk's half of row 492.
  - L repairs the library's refused families with the library's own exclusions, and gives `TotalComparison` its `StandardMinMax` parent (item 22).
- The new practice held.
  - The batch committed 20 record files beside its Fortress change. Batch 6.5b committed 866.
  - Every rung that fixes a defect committed its test alone and saw it fail before the fix, and every skeptic saw it fail again.
  - No rung compared the interpreter corpus's output or ran microGPT. No agent waited long enough for its cache to expire.
  - New tests are named by topic, with plain messages.
- It cost 7.3M tokens written, against 6.5b's 17.1M for half as many rungs. 6.0M did the batch's work. The VM restart threw away 0.7M, and the weekly limit 0.6M.
- One script rule nearly did harm at the weekly limit. The script read each failed skeptic as a refusal and each failed judge as a drop. It marked C, S and L dropped and started the gather with W alone. The gather failed on the limit too, which is all that stopped W from landing alone.
- One landed change makes walk quieter than before. W's coverage trusts `comprises` clauses that walk never checks. A type that extends two closed traits without being listed was refused at load; it now loads and picks by declaration order (row 551). It is on your list as W's skeptic's point.
- The checker count fell from 75 to 59 and the distance from 624 to 598, all from rung L's families. The gate was green on its first run.
- Nothing here needs a decision from you now.

## What came up in this run

### 1. Did the new practice hold?

**What the batch committed beside its Fortress change.**
- The Fortress change is 169 files, +3.6K −0.4K lines:
  - 6 source files: C's three Scala files and W's three Java files, +664 −32.
  - 4 library files, +19 −16.
  - 11 specification files, +1.4K −0.1K, and the PDF rebuilt once by the commit stage (655 pages).
  - 147 test files: 53 new programs, 40 new `.test` files, 2 promotions, 2 renamed `.test` files, 2 deletions, and 48 changed messages.
- Beside it, 20 files in the batch's own folders, 3.5K lines:
  - 12 reports: four `REPORT.md`, four `SKEPTIC.md`, C's `JUDGE.md`, C's and S's `decision-record.md`, and the gather's `RECORD.md`. 2.6K lines.
  - 8 gate tables: `summary.txt`, `checker-count.txt`, `distance.txt`, the ladder's four files, and the per-site list at its new fixed path, `compile-ladder/gate/distance-sites.tsv`. 0.9K lines.
- And five live records, edited: `FACTS.md`, `FACTS-history.md`, `PLAN.md`, the ledger and the handover.
- Nothing else. No capture, log, probe, script copy or test copy is on `main` or on any of the four `wip/` branches. Every path that any branch commit touched under `explorations/` is a report, a decision record or a `record.md`. No `record.md` landed; each was folded.
- 6.5b committed 866 files and 46K lines in its own folders. 7b committed 20 files and 3.5K lines.

**Test first, read from the transcripts.**
- Rung C ran its new tests through the harness on the base at 23:10 and saw them fail. It committed them alone at 23:11:32 (`0d002d8c8`) and made its first Scala edit 20 seconds later.
- Rung W's harness run on the base at 23:06 failed 7 of its 14 new tests, and saw its expected failures. It committed them alone at 23:06:56 (`b3589652e`) and edited its first Java file at 23:09.
- Rung L's walk test failed on the base at 00:14: "Failed to find any matching overload, args = (ArrayList[\TotalComparison\])", "Tests run: 1, Failures: 1". It committed the test alone at 00:14:29 (`65eacfb77`) and edited the library at 00:18.
- C's repair round saw its two new tests fail on the pre-repair head at 05:42 ("X is not in the kind env"). It committed them alone at 05:42:48 (`e2e4d2f32`) and edited at 05:43.
- Rung S changes prose, so no test can go red. It committed its list of passages alone first (`44df8309c`), as its record asked.
- Every skeptic ran the rung's tests on the base and saw them fail:
  - W's: "Tests run: 19, Failures: 9";
  - C's first: "45, 18";
  - L's: "2, 1";
  - C's second, on the pre-repair head: "11, 6".
- Tests added after an edit are expected failures or pins of defects the rung did not fix: W's three and the gather's seven. The rule does not cover them.

**Long runs and waits.**
- No agent compared the interpreter corpus's output. No rung ran the microGPT checks.
- The commit stage started the two microGPT programs under walk in the background at 08:09, as designed. At 08:20 every check they had printed was PASS; they take about 80 minutes.
- No agent waited on one call longer than 292 seconds. Thirteen calls waited between four and five minutes, all polls of builds or test runs.
- No request came after a gap of five minutes or more. So no cache write followed an expired cache.
- No rung re-ran the count or distance stage on an unchanged base before its edit.
  - L took 6.5b's landed tables as its "before".
  - C's first run measured after its edit (count 77, distance 626). Its second run, after the restart, ran the distance stage again on the same tree, though the first run's table was complete on disk (`EXIT=0`). The script's recovery text asks for that: "re-run its checks rather than trusting its logs" (`coordinator/climb-batch-workflow.js:1239`). The repair round measured again, rightly, since it changed code.
- Two rungs ran a whole suite, pass or fail, which the practice leaves to the gate.
  - Rung C's chain ran the compiler and library tracks whole five times: the worker twice (the second on an unchanged tree, after the restart), the first skeptic, the repair round and the second skeptic. Each run takes about 8 minutes of the box. All passed every time.
  - None of the five found anything. The one regression of C's first build, in the team's `Compiled12.invariantInference`, was caught by a run of a targeted list. The skeptic's refusal ground was caught by its own program.
  - Rung W ran the interpreter suite once after its edit, in two shards, about 8 minutes. Its report says why: its record's stops (a verdict changing, a set walk loads today refused after) could not be judged without it (`rung-walk-dispatch/REPORT.md` section 11, decision 8).
  - In tokens this was cheap, since every poll returned inside five minutes. It cost about 50 minutes of the box.

**Test names and messages, against default (c).**
- All 55 new or renamed programs are named by topic. None carries a rung letter or a batch name. The suffixes `Walk` and `Link` appear where they say what the test exercises.
- Every new file has at most one comment line. Where it names a ledger row, it is the row the test reproduces.
- The 101 assertion messages in the new files are in plain words. None cites a `.tex` line, a ledger row, a POSITIONS entry, a FACTS title or a PLAN item.
- No `XXX` run test is keyed on `PASS`, the fault of 6.5b's red gate. The seven run tests key on output the failing run prints, and the fifteen refusals on `compile_err_contains`.
- Two exceptions, both promoted files.
  - `ComprisesMeetCompiled.fss` and `ComprisesMeetWalk.fss` keep their old pointer line to a batch 7C report, and a message with "row 492" and a `.tex` line.
  - Their message also still says "V is the intersection of S and T", the conclusion item 26 revised to "V covers S ∩ T" (review-routed.1).
- The old convention still costs.
  - S's commit changed 49 existing test files and W's 2, 310 lines in all. Every changed line moves a specification line number in a message, except one message S was asked to reword.
  - The synthesis set a one-time strip of those line numbers for after 7b lands (its section 2(c)). It is now due.

**The reviews inside the batch.**
- One skeptic refused: C's first, for a regression in the change (D1: a valid pair that ran on the base was refused with an internal error). The rule that a skeptic refuses only for the change or the test held.
- Every other skeptic approved with corrections, wrong citations among them.
- The merged-diff review found nothing that touches code. It fixed records in one commit (`720db2671`) and routed two items to the next batch.
- No review judge ran, no second review and no gate rerun.

**Where the practice met the harness.**
- The harness refused the worker's write of `REPORT.md` in four of the five worker passes (C's first pass, S, W and L): "Subagents should return findings as text, not write report files." W's skeptic did not try to write its `SKEPTIC.md` and returned the text instead.
- The gather wrote those files from the journal, as the script provides.
- But the script strips the report's text from the skeptic's input (`coordinator/climb-batch-workflow.js:1339`), on the premise that the file is in the worktree. It was not.
  - W's skeptic said it could not check the provenance block (its finding 6). The merged-diff review checked it instead.
  - The skeptics of C, S and L searched the run's transcripts for the worker's `reportText`.

### 2. Tokens, counting writes only

How they are counted:
- Per message id in each transcript: cache writes plus new input. New input is 5K of the total, so the figures are cache writes in practice. Cache reads are not counted.
- The transcripts' output token counts are left out. A transcript records only a partial output count per message; rung C's first run shows 3.2K over 215 messages. They are unreliable.
- The coordinator's own session is not counted.

The work that landed, by stage:
- Rung workers, 4: 2.12M. S 0.68M, W 0.54M, C 0.47M, L 0.43M.
- Skeptics, 5: 1.95M. S 0.44M, W 0.42M, C's first 0.41M, C's second 0.34M, L 0.34M.
- Judges and repairs, 2: 0.65M. C's judge 0.26M, C's repair round 0.39M.
- Gather: 0.60M.
- Gate: 0.13M.
- Merged-diff review: 0.45M.
- Commit: 0.13M.
- Total: 6.03M, over 15 agents.
- By rung chain: W 0.95M, S 1.12M, L 0.77M, C 1.88M (its two skeptics, judge and repair round 1.41M of it).

The work thrown away:
- The VM restart at 23:57: 0.67M.
  - Rung C's first run, 0.55M over 65 minutes. It had committed its tests and its edit, and its second run built on them. What was lost was its context, not its work.
  - Rung L's first run, 0.11M over 2 minutes.
- The weekly limit at 02:16: 0.57M.
  - C's and L's first skeptics, 0.31M and 0.26M, cut partway. Their successors at 04:45 reused some of their files under `tmp/`.
  - Nineteen more launches in the next 25 seconds were refused at once and wrote nothing.
- Total with the losses: 7.27M.

Against 6.5b (`postmortem-2026-09-29/characterization.md`, "Climb batch 6.5b"; its figures are cache writes, 17.15M in all):
- Rung workers: 11.15M for two rungs, against 2.12M for four.
- Skeptics: 1.14M, against 1.95M. Per skeptic about the same, 0.38M against 0.39M.
- Judges and repairs (the rung's, the review's and the gate's): 1.73M, against 0.65M.
- Gather: 0.87M (two gathers, one killed by that run's VM restart), against 0.60M.
- Gate: 0.29M, against 0.13M.
- Review, with the second review: 1.75M, against 0.45M.
- Commit: 0.22M, against 0.13M.
- Per rung: 8.6M in 6.5b, 1.5M here (1.8M with the losses).
- The difference is where the synthesis put it. In 6.5b, 11.1M of the 17.1M followed a wait of five minutes or more. Here none did.
- Rungs differ in size, so a per-rung figure is not a controlled comparison.

What the batch spent against what it changed:
- 6.0M bought: answer 9 built on both paths and stated in the text; rows 157, 398, 461, 478, 491 and 492 closed; four more defects the record named, opened as rows and fixed in the same batch (536, 548, 553 and 554); 95 new test files; the checker count down 16 and the distance down 26, toward phase 3's true zero.
- Time: 6 h 47 min of running, 9 h 18 min from launch to landing with the two stops. The record estimated 8 to 11 hours and 16 to 22 agents. Fifteen agents did the work.
- The record's token estimate was in the harness's old unit, which counts reads, so it is not compared.

### 3. The VM restart and the weekly limit

**The restart at 23:57.**
- W had finished at 23:54, and its result was in the journal. C and L were killed.
- The run was resumed at 23:59; the first new agent started at 00:00:12. W's result came back from the journal.
- C's second run read its branch (three commits) and its `tmp/` logs and went on. L started again.
- Cost: 0.67M, about five minutes on the critical path, and C's second reading of its briefing.

**The weekly limit at 02:16.**
- S and W's skeptic had finished. C's and L's skeptics were cut partway.
- The script then tried each remaining role three times, each attempt within a second of the last. Each was refused with "You've hit your weekly limit" and wrote nothing.
- The path it then took is the danger.
  - `callAgent` returns null after three empty attempts (`coordinator/climb-batch-workflow.js:2303-2322`).
  - The rung stage reads a null skeptic verdict as a refusal and calls the judge (`:2496-2505`). A null judge drops the rung (`:2507`). S lands only with C.
  - So the script logged "Approved: W (approved). Not landed, findings folded anyway: S (dropped), C (dropped), L (dropped). Gathering onto main." and started the gather (`:2606`) with W alone (the run's result as the session saved it, `tasks/wq3g4dbqd.output`).
  - The gather failed on the limit too, and the run ended "gather unresolved".
  - Had the limit lifted before the gather, W would have landed alone, and three finished rungs would have been recorded as not landed.
- The resume at 04:45 worked, because the journal records a failed attempt as failed, never as a result.
- The retry was built for one agent killed by a false positive of the safety filter (the manual, "An agent that comes back with nothing"). A usage limit stops every agent at once. It needs the opposite: no immediate retry, and no dead-agent path.

## Part 1. Conformance

### Method

The method of `reviews/batch-6.5b-review.md`. For each rung:
- `git show` first;
- then its `REPORT.md`, `SKEPTIC.md`, and C's `JUDGE.md` and the two decision records;
- then the batch record's sections for S, C, W and L (`coordinator/CLIMB-BATCH-7.md` sections 1 to 3);
- then the gather's `climb-batch-7b/RECORD.md` and the merged-diff review's result in the journal;
- then the landed code and text on `main`.

Three standards, kept apart:
1. the specification (`Specification/`, with the 2012 Types chapter where it speaks);
2. the team's built intent;
3. your decisions (`POSITIONS.md`) and `PLAN.md`.

What the skeptics, the judge, the gather and the review found is cited, not repeated. What the record measured is cited, not measured again. Claims marked "by reading" were not run.

### The verdicts

- **Rung S, the overloading chapters: in the spirit.**
- **Rung C, the return-type rule and the positional rule: in the spirit.**
- **Rung W, walk's choice of declaration: in the spirit**, with one place where walk now says less than it did (row 551, finding 2).
- **Rung L, the overload families: in the spirit.**

### Rung S, `576b4c287`

**What landed.** Line numbers as S's report gives them, on the rung's tree; the gather's corrections move some lines of `advanced/overloading.tex` by one to three.
- The sentence that overloads may not differ in static parameters, and its echo, are replaced by the 2011 model (`Specification/basic/overloading.tex:100-120`, `Specification/advanced/overloading.tex:108-122`).
- A new section, "Declarations with Static Parameters" (`advanced/overloading.tex:530-650`): the three rules, the Return Type Rule over every instance, exclusion by the paper's reduction.
- The positional rule as a callout: a restriction of the compiled implementation (the recheck's item 1.3), narrowed at the gather to C's scope.
- The dispatch paragraph with the paper's instance rule and its callout (`basic/overloading.tex:312-349`).
- The inference chapter's union sentence replaced by the bound (`basic/inference.tex:89-98`).
- The implicit bound `Any` with its callout (`basic/trait-parameters.tex:49-62`), and item 16's callout (`basic/conversions-coercions.tex:663-675`).
- Item 26: covering defined, P1, P3 and P4, and P2 written apart; the proof appendix revised, with its scope and row 487 marked.
- Appendix I: the introduction reworded for item 23, and seven new entries.
- No file under `Specification-1.0-frozen/` changed.

**Standard 1, the specification.**
- Every change quotes the Working Draft from the frozen copy, with the paper and the 2012 Types chapter cited beside.
- The skeptic found two places where the text stated more than either path runs: the sentence on a bound that rules out the only meeting point, and the typing of a call between two closed traits beyond Astra's boundary. That is a stop the record reserves; the gather's corrections 1 and 2 removed both.

**Standard 2, the team's built intent.**
- The gather checked the text against C's landed tests rule by rule (`climb-batch-7b/RECORD.md`, rung S).
- One mismatch the decisions do not settle: the Meet Rule's closed-trait case for declarations with static parameters, which S states and C's checker refuses (row 546, gather.1, gated by `XXXComprisesMeetGenericTrait`).

**Standard 3, the decisions.**
- Answer 9, the conversion decision, Q1, items 16, 23, 26 and 30, the paper's instance rule and the recheck's five defaults: each built as recorded.
- Three passages beyond the brief's named list were revised, as the decisions settle them; listed for you (S.worker.4).
- The dispatch sentence keeps the inferred instance for a declaration the static call selected, where the paper's dispatcher would solve it again. That is item 30's judgement's wording, and the difference is named for your review (S.skeptic.2).

**What it left.** "Passages not yet revised" names each: the inference chapter's "not described" item and its `Bottom` callout (batch 8), row 446's size, item 14's sentence, the Meet Rule for dotted methods, and the call between closed traits whose candidates have static parameters.

**Verdict: in the spirit.** The S1 form throughout, and each entry names its decision.

### Rung C, `e2f1aa7e8`

**What landed.**
- `OverloadingOracle.scala`:
  - `satisfiesReturnTypeRule` keeps a static parameter quantified unless the domains force it (`:83-127`), and since the repair reads a kept parameter's bound with the forced solutions (`:107-110`);
  - `satisfiesPositionalRule` (`:161-175`);
  - `coversOverlap`, the Meet Rule's closed-trait case (`:177-239`).
- `OverloadingChecker.scala`: `coverageRule` (`:527-538`), and the positional refusal in `returnTypeCheck` (`:540-556`).
- `Functionals.scala`: `typedApplication` types a tie of unconverted candidates by the meet of their return types (`:632-794`).
- 34 new `.test` files and 2 renamed.

**Standard 1, the specification.**
- The paper's rule over every instance (`Papers/Types/rules.tick:174-180`) refuses its own counterexample. Row 398's reordering override is refused. The Meet Rule's example is accepted by coverage, and the call between is typed by the intersection (item 26).
- The rule as built refuses some pairs the paper accepts, where the more specific domain is an object type (D5, row 542). Those programs compiled and then died with `VerifyError` on the base, so nothing that ran is lost. Listed for you.

**Standard 2, the team's built intent.**
- Rung N's `escaped` device is generalised. The normalizer's one-clause cut is reused locally, not widened (Astra's second point).
- The positional rule's scope follows the compiled dispatcher's own: it reads an arm by position only at the template's count (`ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:1344-1346`). The broad form refused the team's `Compiled12.invariantInference`.

**Standard 3, the decisions.**
- Answer 9's positional rule is narrowed to two declarations with as many static parameters of their own. That is a decision taken inside the rung, reported (C.worker.5). It fits the recheck's item 1.3, which reads the rule as the compiled implementation's restriction.
- The typing stays narrower than Astra's boundary, to families with no static parameters (D6, the judge's decision, row 543).
- The fallback was not needed: no change to the shared subtyping, meet, normalizer or closure.

**What the gather found beside it.** The checker's verdict on an overload set can depend on what the same JVM compiled before (row 547). The gate compiles `compiler_tests/` in one JVM (finding 3).

**Verdict: in the spirit.** Every narrowing is the team's own scope or a judge's recorded decision, and each is on your list.

### Rung W, `8f7e183d4`

**What landed.**
- `OverloadedFunction.java`, +436 lines:
  - the comparison on declared domains (`:1248-1361`), copied from probe P4's shape;
  - a converted call dispatched again (`convertedCall`, `:1222-1239`);
  - the load check's lift for a generic declaration beside a plain one;
  - a coverage search through `comprises` clauses, local to the load check (`overlapPieces`, `:901-945`), bounded at 10,000 steps.
- `GenericFunctionOrMethod.java`: the symbolic instantiation's key holds the bounds (row 478).
- `MakeInferenceSpecific.java`: an `AnyType` case (row 157).

**Standard 1, the specification.** Which declaration runs is read on declared domains (answer 9; the conversion decision). The Meet Rule's example loads (item 26). The lone-parameter tests are turned to the bound.

**Standard 2, the team's built intent.** P4's shadow, `bestMatchWithCoercion`'s `CoercedCall`, and `FType`'s transitive reading of `comprises` are the precedents. The team's TODO at the cache is what row 478 fixes.

**Standard 3, the decisions.** Q4 = (1): row 159's pairs stay refused. The lift runs only where today's check refuses, so no set walk loads today is refused after, which is W's stop.

**The loss (row 551).**
- W's coverage trusts `comprises` clauses that walk records and never checks (`BuildEnvironments.java:892-895`).
- So an object that extends two closed traits without being listed was refused at load, and now loads and dispatches by declaration order: `f(Z) = f(S), g(Z) = g(T)`. The checker refuses it ("Invalid comprises clause").
- The text makes such a program invalid (`Specification/basic/traits.tex:239-247`).
- Item 26's proof rests on closed families being closed. Astra's third point named the gap across components (row 487). Under walk the gap is inside one component too.
- The record's fallback for W was for a half that needs more than the load check's clause-reading meet. The skeptic and the gather chose to land and list it (W.skeptic.1).
- By reading, a walk check that every type extending a closed trait is listed, as the checker checks, would restore the refusal. It is small and on walk's side only.

**Verdict: in the spirit**, with row 551 the one place where walk now says less.

### Rung L, `070ef39e5`

**What landed.**
- `StandardMin`, `StandardMax`, `SequentialGenerator` and `FilterGenerator` exclude `HasRank`.
- The api's `String` excludes `AnyMultiplicativeRing`, as its component already did.
- `openRangeHelper` is replaced by a typecase on the `__thrower` witness, each branch cast, as `array1` and `additiveIdentity` do.
- The api's `PossibleReductionPair` and `Range` headers say what their components say.
- `TotalComparison` extends `StandardMinMax[\TotalComparison\]` (item 22 (b)); row 461 closes.

**Standard 1, the specification.** Exclusion by `excludes` clauses (`Specification/basic/traits.tex:223-233`). `openRangeHelper`'s three arms were ambiguous by the language's own rule on arrow types (`basic/types-vals-vars.tex:434-437`).

**Standard 2, the team's built intent.** Every device is the library's own, listed before choosing (`rung-overload-families/REPORT.md` section 3). The judgement's marker traits were not taken, because they stop walk (decision D1).

**Standard 3, the decisions.**
- Your rule of 2026-09-19 that the library's practice is the standard, item 22, and Q2 (the device chosen per pair).
- One stop met: the remaining `seq` pairs need a checker change (row 556). Reversible, listed.
- `openRange` has no `else` branch. A fourth index type ends a walk run with a `ProgramError` that `catch e MatchFailure` does not catch (row 558). The skeptic corrected the report's claim.

**Verdict: in the spirit.**

### The global questions

- **Later phases.**
  - Batch 8 meets rows 535, 541, 546, 547, 556 and 557 on the checker's side.
  - The later walk rung meets rows 544, 551, 552, 555 and 558.
  - Phase 5 meets rows 537, 538 and 540, with rows 496 and 499.
- **Built twice.** Row 492 is repaired on both paths, and both accept the example and the acceptance pair. They still differ in three places:
  - the Meet Rule's case with static parameters: the checker refuses it, walk runs it (row 546);
  - an unlisted extender: the checker refuses it, walk loads it (row 551);
  - functional methods: the checker judges coverage per provider, and walk does not apply the Meet Rule for functional methods (row 544).
- **The library's way.** Yes in L. C and W reuse the tree's own devices.
- **What reached you.** The landing message is the coordinator's and is not on file to check. S's "What comes back to Pavol" names a word diff of the PDF under its worktree's `tmp/`, which the commit stage removed with the worktree.

### Findings

Ranked by what they cost or risk next. Each gives its home.

1. **The script turns a usage limit into dropped rungs.** Severity: before the next batch; it nearly landed W alone.
   - A null result after three attempts takes the dead-agent path: a null skeptic becomes a refusal, a null judge a drop, and the gather starts with what is left (section 3).
   - Home: the script line (`PLAN.md:243`). `callAgent` recognises a usage-limit or rate-limit error and stops the run instead of retrying at once. A skeptic or judge that returns nothing after its attempts stops the run too, so that the resume redoes it. One `checkn.js` scenario. Unrouted.
2. **Walk now loads an invalid program it refused before (row 551).** Severity: a load-time diagnosis lost on walk; landed and listed.
   - Home: a walk rung that checks a closed trait's extenders at load, as the checker does, on the line for the walk rung after batch 8 (`PLAN.md:87`). Unrouted as a repair; W.skeptic.1 is on your list.
3. **The checker's verdict can carry between compilations in one JVM (row 547).** Severity: the gate's reliability.
   - The gate compiles `compiler_tests/` in one JVM, so a verdict there may depend on its order. The gather measured it on one pin and did not land the pin.
   - Home: batch 8's line, with the checker's overloading cache and capture defects (FACTS, "The hidden layer, classified"). Today it is only gather.2 on your list.
4. **The skeptic gets no report when the harness refuses the worker's write.** Severity: every rung of this batch.
   - Home: the script line. At `climb-batch-workflow.js:1339`, pass `reportText` when the branch has no `REPORT.md`. One expression. Unrouted.
5. **Whole suites run inside rungs.** Severity: about 50 minutes of the box, few tokens.
   - C's chain ran the compiler and library tracks five times, found nothing, and ran twice on an unchanged tree. W ran the interpreter suite because its record's stops asked for what only a suite run shows.
   - C's second run repeated the tracks and the distance stage on an unchanged tree because the recovery text tells a resumed worker to "re-run its checks rather than trusting its logs" (`climb-batch-workflow.js:1239`).
   - Home: the script line and the manual's "Preparing a batch record". At most one whole-suite run per code state in a rung's chain, for a checker or walk rung, its result in the report and read by the skeptic; or a record's verdict stops left to the gate, as the synthesis meant. The recovery text re-runs a check only where its log is cut off or the tree changed since. Unrouted.
6. **The `.tex` line numbers in old test messages.** Severity: 51 files and 310 lines re-anchored in this batch.
   - Home: the one gated commit the synthesis set for after 7b (section 2(c)), about 0.3M. Now due.
7. **Walk's harness cannot gate an expected load-time refusal.** Severity: four rows of this batch have only the row as their home (534, 544, 549 and 551).
   - An `XXX` program walk wrongly loads fails on its call today and would still fail once walk refuses it, so it can never go red.
   - Home: a candidate harness rung, a key for `tests/` that names the refusal's message, as `compile_err_contains` does for the compiled path. For the plan; not built.
8. **Routing gaps.** Part 3.
9. **The worktrees were not made at the launch.** Severity: a few calls per worker.
   - W and S report that no worktree or branch existed, and made their own; L's first run searched the tree for how. The script's header says it launches "after the worktrees exist".
   - Home: the launch step in the manual, or the header changed to say that the worker makes its worktree.
10. **The post-batch review's shared tool does not exist.** Severity: each review writes its scripts again.
   - The synthesis puts it under `coordinator/tools/` (section 1). This review's scripts (the agents' writes by stage, the waits, the command search) are in the session's scratchpad.
   - Home: the script line, one commit of three small scripts.

## Part 2. Process measures

### What the agents read

- **The briefing.** Every worker, skeptic, judge and repair ran it. Workers ran it at their 2nd to 11th call, skeptics and the judge at their 2nd to 4th.
- **The map.** Every worker's briefing carried three map keys. W, C and L also opened map files. The skeptics' `checks` slices carry none.
- **INDEX.** Every worker's briefing carried `index:overloading`. No agent opened `INDEX.md` itself.
- **The batch record.** No agent read it whole. Workers read their tail, grepped its headings and read sections by line range. The synthesis's change to the shared prefix held.
- The per-agent shares of context and searching were not measured, since the 6.5b scripts are not a shared tool yet (finding 10).

### Misses, by kind

Numbered on from `batch-6.5b-review.md`'s 162. "Found by" names the first to catch it.

Found inside the batch:
- **The change wrong.** 163, C's kept parameter whose bound names a forced one: a valid pair refused (D1). C's first skeptic; repaired.
- **A record's claim the code did not do.** 164, C's functional methods claimed covered and not covered (D4). C's first skeptic; repaired.
- **A new rule's effect on a sibling path.**
  - 165, a method call on the intersection-typed result crashes code generation (D2, row 540).
  - 166, inference on an intersection-typed argument keeps one conjunct (D3, row 541).
  - 167, W's lift refuses a set whose parameter has two bounds (row 552).
  - 168, L's `excludes` clause meets a kind-environment crash in the checker (row 557).
  - Skeptics; each gated as an expected failure.
- **A premise the path does not enforce.** 169, W's unlisted extender (row 551). W's skeptic; landed as a row.
- **The rule as built against the paper or a decision.** 170, C's rule on object domains (D5, row 542); 171, C's typing scope (D6, row 543). C's first skeptic; for you.
- **Text beyond what the paths run, a reserved stop.** 172, S's bound-exclusion sentence; 173, S's typing beyond Astra's boundary; 174, S's Return Type Rule repair given as allowed with no callout. S's skeptic; corrected.
- **The team's own code, by reading.** 175, S's account of the abstract-method check; 176, walk's typecase failure is a `ProgramError`, not `MatchFailure` (row 558). Skeptics; corrected.
- **Provenance.** 177, S's sentence on the 2019 proof misstates its restriction 2. S's skeptic.
- **Between rungs.**
  - 178, S's interpreter callout made false by W. W's skeptic; corrected at the gather.
  - 179, the Meet Rule's case with static parameters, stated by S and refused by C (row 546). The gather.
  - 180, the promoted tests' message states the old conclusion. The review.
  - 181, one component name in both corpora. The review.
- **Found while pinning a skeptic's program.** 182, the checker's verdict carried in one JVM (row 547). The gather.
- **Other, record.** C's provenance line and sibling count; W's visitor count, 11 not 10, and its `SkPosBox` column; L's row 554 anchors and quoted lines; S's inference entry in the wrong tense; six FACTS entries the batch made false and row 461's note the gather left out (the review).

Found by this review:
- 183, the usage limit taken as dropped rungs (finding 1).
- 184, the skeptic without the worker's report (finding 4).
- 185, the whole-suite runs inside rungs (finding 5).
- 186, open rows without a line and three stale lines (Part 3).
- 187, S's list for you names a removed file.
- 188, the worktrees not made at the launch (finding 9).
- 189, the shared review tool not built (finding 10).

### Against the earlier notes

- **Found inside the batch, like for like** (163 to 181, the "other" items left out): 19 in 4 rungs, about 5 a rung. That compares with 7 in 6.5b, 5.5 in N, 7 in 6.5, 3.5 in 7C and 2.8 in 6b to 7R.
- **By kind:** a new rule's effect on a sibling path 4; text beyond what the paths run 3; between rungs 4; the rule against the paper or a decision 2; the team's own code 2; the change wrong 1; a record's claim 1; a premise 1; provenance 1.
- **Who caught them.** The skeptics 16 of 19, every miss inside a rung. The gather 1, and the review 2. Row 547 was the gather's own find.
- **Landed.** No defect of a change. Row 551 landed as a known loss. The expected failures landed as designed.
- **Escaped every check in the batch:** 183 to 189, all in the script, the launch or the routing.
- **Severity.** Nothing touches a line of the model or blocks the switch-over. The worst on the record is 183, which could have landed one rung of four. The worst in the tree is 169, a diagnosis walk no longer gives.

### Re-measuring what the record held

- No rung re-ran the count or distance stage on its unchanged base. Your rule of 2026-09-28 held.
- No rung ran a ladder subset "before". C ran its subset after its edit only. L read the baseline's committed outputs.
- C's second run, after the restart, ran the compiler and library tracks and the distance stage again on a tree whose results were complete on disk, about 25 minutes of the box. The script's recovery text asks a resumed worker to "re-run its checks rather than trusting its logs" (`coordinator/climb-batch-workflow.js:1239`). A check whose log is complete on an unchanged tree needs reading, not running (finding 5).
- The specification was built four times: S's base and edit (its check), the gather's merged tree, and the commit stage. The first two are S's test.

### Measures the evidence supports, each with its cost

1. **A usage limit stops the run.** No immediate retry on a limit error, and a null skeptic or judge stops the run instead of dropping the rung. Evidence: section 3, item 183. Cost: a few script lines and a `checkn.js` scenario.
2. **The skeptic gets the report's text when the branch lacks the file.** Evidence: items 184 and W's finding 6. Cost: one expression.
3. **One whole-suite run per code state per rung chain**, only for a checker or walk rung, read by its skeptic; or a record's verdict stops left to the gate. Evidence: finding 5. Saves about 30 minutes of the box per such chain.
4. **The one-time strip of `.tex` line numbers from old test messages.** Evidence: 51 files and 310 lines in this batch. Cost: about 0.3M, gated once.
5. **A walk harness key for an expected load-time refusal.** Evidence: four rows at "the row alone". Cost: a small harness rung.
6. **The worktrees made at the launch**, or the script's header changed. Evidence: finding 9. Cost: nothing.
7. **The review's measuring scripts made the shared tool.** Evidence: finding 10. Cost: one commit.

## Part 3. Routing

Checked against `main` at `8c6e858ce`; `PLAN.md` is the same at `d11dfaf43`, the record rewrite merged while this review was written, and its line numbers hold there. Another worker is editing it, so some of what follows may already be in hand.

**Rows the batch opened, 534 to 558.**
- Fixed inside the batch: 536 (C), 548 (W), 553 and 554 (L).
- In "Climb batch 7b, listed for his review" or named in its entries: 534, 537, 538, 539, 540, 542, 543, 546, 547, 549, 550, 551 and 556.
- Open, with a home in the row but no line of `PLAN.md`:
  - 535, the checker's union reaching code generation, which fails verification: batch 8's checker rung that binds the bound (`PLAN.md:83`), beside rows 515, 516 and 518.
  - 541, inference keeping one conjunct: the row names batch 8's checker rung; its line does not.
  - 557, the kind-environment crash under an `excludes` clause: batch 8.
  - 544, 552, 555 and 558, walk's: the walk rung after batch 8 (`PLAN.md:87`).
  - 545, a function beside functional methods over two closed traits, where the text does not say which rule governs: a question of the text, for your list or a later specification rung.

**Rows the batch closed.** 157, 398, 461, 478, 491 and 492.

**Lines the batch made stale.**
- Batch 8's line still says "row 492's repair only under item 26's fallback (7b's line)" (`PLAN.md:82`). The fallback was not taken, and row 492 is fixed on both paths.
- Phase 3's item 5 still describes batch 7b as to come (`PLAN.md:70`).
- Phase 5's code-generation line names defect 3 without its row, 537, and does not name row 540.

**Items for Pavol.**
- The merged-diff review counted 44 ids, each in `PLAN.md` in its section. I read the section's entries and did not recheck the ids one by one.
- S's "What comes back to Pavol" points at `tmp/rung-spec-overloading/pdf-worddiff-text.txt`, removed with the worktree. The rebuilt PDF and the Appendix I entries on `main` stand in for it.

**Script and procedure items.** Findings 1, 4, 5, 9 and 10, and measures 1 to 3, 6 and 7: the script line (`PLAN.md:243`). Measure 4 has its date in the synthesis. Measure 5 is a candidate for the plan. None has a line today.

## What I did not do

- I built nothing, ran no Fortress program and no gate stage, and edited no source, test, ledger, plan or record file.
- I did not measure the agents' shares of context and searching, or which miss each briefing carried, as the 6.5b review did.
- I did not wait for the two microGPT programs to finish.
- Row 551's small walk check, S's text against the paper, and the batch's other claims marked "by reading" were not run.
- I read the transcripts only through bounded scripts and greps, and did not measure this review's own cost.
