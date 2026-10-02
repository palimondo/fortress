<!-- The post-batch review of climb batch 8 (run wf_603242ca-111, base 493b4076f, launched 12:56 UTC and landed 20:31 UTC on 2026-10-02 at 6416d216f: rung I f3032eed8, Q 9d2e4c856, O 70d5486f9, M 0ae526b31, the merged-diff review's corrections b3c9e2dbf, its judge e1511eb5e and repair 2c697fe52), the one combined pass of POSITIONS, "One review after every batch.", in the form of reviews/batch-7b-review.md, with the coordinator's five points answered and the build and re-run measures that are batch 9's before; written by a review worker reading only, against main at 7266ed23c, the gate's landed tables as before and after, the transcripts read through bounded scripts in the session scratchpad; nothing built, no Fortress program run, no gate stage run; tokens are writes only (cache writes plus new input, one count per message id). -->

# Climb batch 8: conformance, process and routing

## What came up in this run

### 1. The Meet Rule class: 103 to 99, though the rule cleared what it was meant to

The landed per-site lists (`explorations/compile-ladder/gate/distance-sites.tsv` at `493b4076f` and at `6416d216f`), read site by site.

**What went, 119 of the 123 overloading errors (M1 103 and L1 20).**
- Rung O's rule for functional methods, 78, exactly the record's count (`coordinator/CLIMB-BATCH-8.md`, Q1): `FORWARD_CMP` 38, `IN` 29, `seq` 10, `SQCAP` 1, every one a top-level pair of two functional methods.
- Rung O's capture fix, 22: `generate` 7, the reduction pairs' `map` 9 and `ivmap` 3, and `cross` 3, which the record had given to rung M (`compile-ladder/rung-library-meets/REPORT.md` section 4).
- Rung M's declarations on the meet, 19: `Maybe`'s `map` and `ivmap` 5, `copy` 2, `lift` 6, `String`'s juxtaposition 3, the two sequential generators' `map` 2 and `nest` 1.

**What is left of the old 123: 4.** `isLeftZero` 2 and the full sequential ranges' `map` 2, which rung M left with rows 582 and 583 because each repair changes a walk value or needs a new type.

**What is new: 95, all from the per-provider check made correct.**
- The base's per-provider check kept only functional methods with a body (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:133` at `493b4076f`). An api declaration has no body, so the check read nothing in an api. In a component it skipped every declaration inherited from an api.
- The first skeptic of O refused for exactly this: the per-provider check "must judge every trait or object that provides both declarations" (`compile-ladder/rung-overloading-checker/SKEPTIC.md`, its verdict). The repair reads every functional method in an api and the api-inherited ones in a component (`OverloadingChecker.scala:138-141` on `main`), and compares the meet without the self parameter wherever it sits (`:584-586`, `withoutSelf` at `:595-603`).
- That surfaced 102 pairs no check had read: 58 in the apis, 44 in the components (`rung-overloading-checker/REPORT.md` section 10). Rung M's juxtaposition move cleared 7 of them. 95 remain:
  - `CAP` 64, all in `RangeInternals`: `BoundedRange`'s `opr INTERSECTION(self, other: Range[\I\])` (`Library/FortressLibrary.fsi:2228`) beside `ScalarRange`'s `CAP` (`Library/RangeInternals.fsi:46`, body `RangeInternals.fss:149`) in 12 scalar range types, and beside `Range2D`'s and `Range3D`'s two each (`RangeInternals.fsi:63-64`, `:94-95`) in five types each. No type declares a `CAP` on the meet.
  - `IN` 30: `Generator`'s `opr IN(x:E, self)` (`FortressLibrary.fsi:828`), `OpenRange`'s (`:2203`) or `ExtentRange`'s (`:2220`) beside `Range`'s (`:2182`) or `Range2D`'s and `Range3D`'s (`RangeInternals.fsi:65`, `:96`), in `FullRange`, `CompactFullRange`, `StridedFullRange` and the 2D and 3D range types. None declares `IN`.
  - `SQCAP` 1, on `Just`, moved from the api's top level to its provider.
- Arithmetic: 123 − 119 + 95 = 99.

**Reading.**
- The prediction held. What the record did not see is that the per-provider check it relied on read almost nothing, so a correct check would find pairs the old one never looked at. The record's Q1 described that check as working ("The one for functional methods asks it only of a type that provides both", and the checker "applies both") without reading what it read. One `sed` of `:130-135` would have shown it.
- The 95 are defects of the library by the specification's own rule (`Specification/advanced/overloading.tex`, "Meet Rule", the Meet Rule for Functional Methods): a type that provides both declarations provides none on their meet. They are not artefacts. M1 now measures the text's rule; the 103 did not.
- They are rung M's kind of work: declarations on the meet in the range types, P2's device M, or a decision on what the range types provide. Row 580 (a numeral `IN` a `#` or `:` range, refused since rung Q) is the same `IN` pair met from the call side; one declaration of `IN` on `FullRange` serves both (`PLAN.md`, the row 580 entry).

### 2. The bodies' kind, 386 to 404, and whether rung I's refusals are in the spirit

**The rise by cause** (the landed per-site lists, classified with the stage's own `explorations/coordinator/tools/distance/classify.py`, messages compared with line numbers masked):
- +29, rung I's bound (row 560). 18 where `()` is expected against the `Object` bound that climb batch 7's rung B wrote: `Library/Writer.fss` 8, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss` 3, `ProjectFortress/LibraryBuiltin/NativeArray.fss` 1 and `Library/FortressLibrary.fss` 6, all "Function body has type Object, but declared return type is ()". 11 where no expected type reaches the call: an `if` without `else`, a `typecase` branch, a block's last expression, a loose juxtaposition. The refusal is made at `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala:538-539`: the meet of the upper bounds, and no instance when it is empty.
- +6, unmasked by rung O's `Character` fix (row 477): the bodies the five crash rows hid, `Library/String.fss:331` 4 and `Library/FortressLibrary.fss:4358`, `:4374`.
- −6, rung I's bound: the class GB, a function argument inferred at `BottomType` (`SimpleFilterGenerator`, `SimpleMappedGenerator`, `SimpleMappedIndexed`, `generate`, and `FortressLibrary.fss:4137` and `:4143` at the base). The seventh GB site, `List.fss:150`, is respelled from `BottomType` to `Object`; it is item 20's.
- About −10, rungs M and Q: M's retyped bodies (`seq` twice, `relationalPredicate`, `List.fss:119-120`, `avFlat`, `RightScalarRange.every`, the unary `BIG MAX` and `BIG MINMAX`), Q's two at `FortressBuiltin.fss:474` at the base.

**The class table misleads by 16 sites.** OT reads +42, but 16 of those are the classifier's fixed line ranges meeting rung Q's and M's inserted lines (row 577): V1's −8, G1's −6 and a net 2 from I1 are the same errors filed under OT. No one of them was repaired. OT's real rise is 26: row 560's 28 in OT, the 6 unmasked and the `List.fss:150` respelling, less the 9 that M and Q repaired. FACTS already says V1's and G1's falls are such moves ("The distance to the switch-over by root cause"); the gate's `summary.txt` still prints them as class moves.

**Is it in the spirit? Yes.**
- The paper's instance rule, as decided, gives a parameter nothing fixes "the intersection of its upper bounds, its declared bound (`Any` if none) under the constraint of the call's static return type; never `Bottom`" (POSITIONS, "A type parameter the arguments do not fix takes its bound"). With a written bound `Object` and an expected `()`, that intersection is empty, since `Object` excludes `()` (`Specification/basic/types-vals-vars.tex`, "Special Types"). Refusing is the rule. Falling back to `Bottom` is what the decision forbids.
- Nothing that ran is lost. On the base the same shapes compiled and failed JVM verification at load ("VerifyError: Bad return type", `compile-ladder/rung-instance-bound/SKEPTIC.md` section 5). No program compiled against the one library runs before the switch-over.
- Rung B wrote those bounds to select the solver's `Bottom` branch (PLAN item 20; `reviews/batch-6b-7-conformance.md` finding 5). The record said that under rung I they "become unnecessary and stay" (`CLIMB-BATCH-8.md`, rung I, "What the tree already does"; the same in PLAN's batch 8 line). That reading was wrong: once the `Bottom` branch is gone a written `Object` means `Object`. Item 20 now records this ("harmful, not merely unnecessary").
- The record also made the repair impossible inside the batch: rung I's files excluded every library file, and no library rung was given the three declarations conditionally. So 18 refusals of the library's own `fail` and `builtinPrimitive` landed for one batch. Dropping the three written bounds (`Library/FortressLibrary.fss:54` with `.fsi:37`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:34` with `.fsi:30`, `Library/List.fss:177` with `.fsi:109`) gives back the team's own unbounded declarations, and under the bound `Any` the instance at `()` is `()`.

**The 11 are less of a question than item 36 says.** Item 36 asks whether those four contexts pass an expected type and says no default is on record. The text answers three of them:
- an `if` without `else`: "then every clause must have type `()`" (`Specification/basic/expressions/if.tex:67-68`);
- a block: "the value and type of this expression are the value and type of the expression block as a whole" (`Specification/basic/expressions/blocks.tex:54-57`);
- a loose juxtaposition: row 455 already reads `Specification/basic/expressions/var-ref.tex:35-40` as settling it, and gates the drop with `XXXInferContextDrops`.
- The `typecase` branch follows by reading from the union rule (`Specification/basic/expressions/typecase.tex:110`) under an enclosing expected type.
- So the 11 need two things, both on record: item 20's drop (each of the 11 calls `fail` or `builtinPrimitive`, bounded `Object`), and a checker change that passes the type the text already requires into those contexts. Only the second is new work; it is not a fork for Pavol.

### 3. The cleaning and the microGPT checks' inputs (row 576)

- `1ee3b0bc5` removed `explorations/apl/reference/dzaima/docs.txt` and `w/*.txt`. The two check programs read them by relative paths: `"../../apl/reference/dzaima/docs.txt"` at `explorations/run-c4/src/MicroGptFlat.fss:19`, `"../reference/dzaima/docs.txt"` at `explorations/apl/mg/MicroGptApl.fss:28`.
- The rule in the cleaning's own message keeps "the scripts and data a gate, the batch script, a tool or a briefing runs or reads by path". `coordinator/tools/mg-run.sh` is such a tool (the cleanup review keeps the script it calls, `coordinator/postmortem-2026-09-29/cleanup-review.md`, "Tools a script calls by path"), and it runs those programs. By the rule the ten files stay.
- So it is a defect of applying the rule, not of the rule. By reading the commit and the tree: the census classed files by kind, and the ten files are the corpus and the weights that a one-off script produced (`export_weights.py`, removed in the same commit), so by kind they look like captures. A kept program reads them, which makes them data under the rule's second clause. The goldens the same programs read (`explorations/run-c/goldens/`) were kept. Kind was read from how a file was made, not from who reads it.
- Nothing caught it for two days. The cleaning reached `main` at 08:12 on 2026-09-30 (`d2d5e83a8`), three minutes after batch 7b's commit stage had started its microGPT run; the gate never runs microGPT (POSITIONS, "Interpreter performance is irrelevant"); rung Q's run at 13:38 on 2026-10-02 was the first after it and stopped at FileNotFound.
- Cost inside the batch: small. One failed run (52 and 71 s), about two minutes of diagnosis, the files restored untracked from `1ee3b0bc5^`. Q's repair round's library changes went unchecked until the commit stage's run on the landed tree, which finished at 20:40 with both checks 40 of 40 and then removed the inputs again (`tmp/gate-batch-8/microgpt-walk/`, untracked).
- Where it belongs:
  - The tree's repair is the coordinator's (row 576; PLAN, the row 576 entry). By the rule the files are kept data, so restoring them as tracked files is the rule's own answer. Having `mg-run.sh` take them from history adds a path no manual run follows.
  - The lesson goes with the rule. Any later cleaning, and the planned cleaner pass of `main` (PLAN, "Housekeeping"), classes a file by who reads it, follows the reads of every program a kept tool runs, relative paths included, and runs each kept tool once on the cleaned tree before it lands.
  - Until the files are tracked, the main tree holds them untracked during each commit stage's run. That collides with a launch's precondition, `git status --porcelain` empty (`CLIMB-BATCH-8.md` section 6).

### 4. Builds and re-runs: the before for batch 9

Counted from the 21 transcripts: every `ant compileAll` launched, its own "Total time" line, the foreground time of the calls that start, poll and read it, and the writes of the message that takes each result in. The library-order rebuild after a build is put at about 100 s, by the gate's account ("EXIT=0 in about 105 s") and the gather's (`/home/user/fortress-gather8/tmp/build.log`: compileAll 52 s, the build 2 min 32 s). Under POSITIONS, "Nothing is built or run twice on the same code."

**Builds.**
- 35 runs of `ant compileAll`: rung I 5, Q 2, O 4, M 1; skeptics I 2, Q 2, O 4; repair round O 4; second skeptics Q 2, O 5; the gather 2; the gates 1 each. Rung Q's repair round built nothing (it changed no Java).
- About 28 minutes of compile by their own Total-time lines, and about 55 more for the library rebuilds after most of them: about 85 minutes of the machine.
- Agents waited on them about 54 minutes in the foreground. Written tokens in those calls: about 0.19M (2.5 % of the batch).
- 22 of the 35 built a code state another agent had already built:
  - 13 built the base's code (the tests-only commits change no source): the four workers, skeptics I and Q once, skeptic O twice, repair round O twice, second skeptic Q once and second skeptic O twice. One would do, so 12 were extra.
  - 9 rebuilt a head another agent had built: skeptics I and Q once, skeptic O twice, second skeptic Q once, second skeptic O three times (the pre-repair head once and the repaired head twice), repair round O once (its own head again after a base build).
  - The second gate's build.
  - Together about 55 minutes of the machine and about 0.12M.
- On the critical path, which ran through rung O's chain: skeptic O's four builds, repair round O's base rebuilds and second skeptic O's five builds, about 30 minutes. The skeptic-scope judgement measured the skeptics' rebuilds and polls at 0.15M of their growth, and 8 to 14 minutes each with their harness runs (`explorations/coordinator/skeptic-scope-judgement.md`, section 2).

**Runs repeated on the same code.**
- The whole gate, a second time, on `2c697fe52`, whose only difference from the first gate's `0ae526b31` was one sentence of `Specification/appendices/changes.tex` and records. No stage of the gate reads a `.tex` file. The tables came out identical but for timing. 24 minutes on the critical path, 0.12M (section 5).
- The distance stage, run by skeptic M on rung M's unchanged tree: "DISTANCE SAME 545", an identical per-site list, 846 s of the machine in the background, about 35K to 51K tokens (the judgement's section 2). The record asked for it: rung M's "For the skeptic" says "the after re-run by the skeptic" (`CLIMB-BATCH-8.md`, rung M), against POSITIONS, "No re-measuring what the record holds."
- The second skeptics re-did the first skeptic's whole list with the same brief, one paragraph changed. The judgement puts the avoidable part at about 0.12M and 15 to 20 minutes each, 0.24M for the two.
- Smaller:
  - rung Q started a microGPT run and then edited the library, so the run was killed and started again (about five minutes of two JVMs);
  - the gather built the merged tree and the gate built the same code again (about 2.5 minutes);
  - rungs I and O ran the ladder files (all 85 for I, about 13 minutes; 17 twice for O, once per code state), though the record said each worker's subset is empty and the gate judges (`CLIMB-BATCH-8.md` section 6).

**Not a repeat, though it looks like one.** Rung Q's interpreter pass ran three times (13:18, 14:03 and 17:34) against the coordinator's one base pass. Each was on a new code state, the first edit, `608c4e91f` and the repair round's library. Every whole-suite run inside a rung was on a new code state, so the fix from 7b's review held for the rungs. Only the gate broke it.

**The before, in one line:** about 0.5M written (7 %: the extra builds 0.12M, the second gate 0.12M, skeptic M's distance run about 0.04M, the second skeptics' repeated list about 0.24M) and about an hour of the critical path went to building or running again what had already been built or run. In the same batch, one cache rewrite cost 0.46M more (section 6).

### 5. The review's blocking finding and the second gate

- **The finding.** Rung Q's Appendix I Effect said that a numeral beside an integer value "is converted to that type, whose own declaration of the operator is then the most specific" (`Specification/appendices/changes.tex:2573-2574` before the repair). That is false for `=` and `=/=`: with `IntLiteral` under `Number`, `Number`'s `=` applies without coercion and is taken, by the coercion chapter's order. The review was right that an Effect must be true (POSITIONS, "Every change to the specification is recorded with its reason", "The S1 form").
- **It was already known.** Rung Q's judge and skeptic had said so (`rung-numeral-library/JUDGE.md` section 6; its `SKEPTIC.md`, first judgement, "For Pavol"). The gather saw it as gather.1 and wrote "The text stands as the rung wrote it" (`climb-batch-8/RECORD.md`, "The gather's own point"). In the same pass the gather did correct rung I's Effect (its correction 2).
- **What it cost.** The review's judge 0.21M and 8 minutes, the repair 0.20M and 4 minutes, the second gate 0.12M and 24 minutes: 0.53M and 36 minutes on the critical path (19:48 to 20:24), to change 7 lines of `changes.tex` into 15. The review itself, 0.45M, would have run anyway.
- **What it protected.** One sentence of the specification, and the added case of `=/=`. Nothing in code. The second gate protected nothing: no gate stage reads the specification, and the commit stage builds the PDF once on the landed tree.
- **The cheaper routes.**
  - The gather corrects an Effect its own record shows false, as it did for rung I.
  - Or the review fixes a text-only finding in its corrections commit, as it fixed the records in `b3c9e2dbf`, instead of classing it as blocking code. The script counts every path outside `explorations/` but tests as code (`coordinator/climb-batch-workflow.js:1772`, `:1950`).
  - The gate rerun for a text-only repair is already on Pavol's list (PLAN, the last entry of "Climb batch 8, listed for his review", judge-review.1).

### 6. Tokens, counting writes only

Per message id in each of the 21 transcripts: cache writes plus new input. Cache reads and output are not counted, as in `reviews/batch-7b-review.md` section 2. The coordinator's session is not counted.

By stage:
- Rung workers, 4: 2.67M. M 0.96M, Q 0.63M, I 0.56M, O 0.52M.
- First skeptics, 4: 1.34M. I 0.36M, Q 0.34M, M 0.34M, O 0.30M.
- Judges, 2: 0.52M. Q 0.31M, O 0.21M.
- Repair rounds, 2: 0.72M. Q 0.36M, O 0.36M.
- Second skeptics, 2: 0.69M. Q 0.35M, O 0.35M.
- Gather: 0.53M.
- Gates, 2: 0.24M.
- Merged-diff review 0.45M, its judge 0.21M, its repair 0.20M.
- Commit: 0.16M.
- Total: 7.72M over 21 agents.
- By rung chain: I 0.91M, Q 1.99M, O 1.74M, M 1.30M; the tail after the rungs 1.78M.

**The one cache rewrite.**
- Rung M called `wait_for` on its distance run with a bound of 280 s, over the prefix's default of 270 (`coordinator/climb-batch-workflow.js:886-895`). Its next request came 289 s after the last and wrote 464K of context to cache again (15:41:29; 35K read).
- That is 0.46M, half of rung M's tokens and 6 % of the batch. No other agent wrote more than 60K in any message after its first.
- Gaps of 292 s and 297 s in rungs I and Q did not miss. So the cache's life is not a hard five minutes, and 270 s plus a turn's latency is a thin margin.

Against 7b (6.03M of work, 7.27M with the restart and the limit; `reviews/batch-7b-review.md` section 2):
- Rung workers 2.12M against 2.67M (2.21M without the rewrite).
- Skeptics 1.95M for five against 2.03M for six.
- Judges and repairs 0.65M for one rung against 1.24M for two.
- Gather 0.60M against 0.53M. Gate 0.13M against 0.24M for two runs. The review 0.45M against 0.86M with its judge and repair. Commit 0.13M against 0.16M.
- The record estimated 6M to 8M, 15 to 20 agents and 8 to 11 hours (`CLIMB-BATCH-8.md`, "Cost"). It took 7.72M, 21 agents and 7 hours 37 minutes, with no stop.

**What the batch spent against what it changed.** 7.7M written and 7 hours 37 minutes bought:
- the compiled checker on the paper's instance rule and the decided order of attempts (rows 447, 505, 508, 512, 515, 518 and 535 fixed, 541 and 516's compiled half on the checker's side);
- functional methods judged by the specification's own Meet Rule in every type that provides both, with the capture, the memo and the two crashes gone (rows 556, 557, 477, 561, 562, 568 and 569);
- the one library's numeral as the compiler library's sibling `IntLiteral`, with each integer type's own comparisons, `CMP`, `MAXNUM` and `MINNUM` (row 517, item 33);
- the library's Meet Rule pairs inside one type and 23 slips repaired by its own devices (rows 483, 531, 356 and 472, and 473 in part);
- 45 compiled and 10 interpreter tests more; the distance 598 to 565 and the count 59 to 56.

It also cost: one decision not built (R9, item 37); one regression of runs on the compiled path (row 559); 29 library refusals that two small repairs would clear (section 2); 28 rows opened, 4 of them fixed inside the batch. About 1.4M of the 7.7M (18 %) went where a cheaper route existed:
- the cache rewrite, 0.46M;
- the review's judge, repair and second gate for one sentence already known to be wrong, 0.53M;
- the rest of section 4's repeated builds and runs, about 0.4M.

## Part 1. Conformance

### Method

The method of `reviews/batch-7b-review.md`:
- for each rung, `git show` first;
- then its `REPORT.md`, `SKEPTIC.md`, `JUDGE.md` and decision record;
- then the record's section for it (`coordinator/CLIMB-BATCH-8.md` sections 1, 3 and 5);
- then the gather's `climb-batch-8/RECORD.md` and the review's result in the journal;
- then the landed code on `main`.

Three standards, kept apart: the specification (with the 2012 Types chapter where it speaks), the team's built intent, and the decisions on record (POSITIONS, PLAN). What the skeptics, judges, gather and review found is cited, not repeated. Claims marked "by reading" were not run.

### The verdicts

- **Rung I, the instance rule and the order of attempts: in the spirit**, with one narrowing of the order, listed.
- **Rung Q, the numeral's own type in the library: in the spirit of the numeral switch.** R9, `NN32` into `RR64`, is not built: it conflicts with answer 8, and it went back to Pavol as item 37.
- **Rung O, the overloading checker: in the spirit**, made so by its first skeptic's refusal. The judge's decision 1 rests on a premise that does not hold (row 572), listed.
- **Rung M, the Meet Rule's library devices and the slips: in the spirit.** `String`'s juxtaposition became three top-level operators where the team wrote functional methods, listed.

### Rung I, `f3032eed8`

**What landed.**
- `Formula.scala`: `solveToBounds` (`:496`). A variable no lower bound fixes takes the meet of its upper bounds, and the call is refused when that meet is empty (`:538-539`). A variable left unconstrained takes `Any` (`STypesUtil.topIvars`).
- `Functionals.scala`: the attempts in the order subtyping without the expected type, subtyping with it, coercion with it, coercion without it (`:703-708`). The union candidate becomes the bound.
- `TypeAnalyzer.scala`: two lines, an intersection as a whole lower bound (row 541), as the record allowed.
- The inference chapter and its Appendix I entry; 59 files of `ProjectFortress/compiler_tests/` added, promoted, rewritten or removed.

**Standard 1.** The decision's words are built: the bound under the expected type, never `Bottom`, never the union, never the value's type. The team's draft note is answered in the S1 form. Row 559 is the rule's own cost: the specification gives an intersection instance, and the compiled run time has no class for one.

**Standard 2.** The solver's two branches by bound (row 505) are now one rule. `killIvars` stays for the other callers. The promoted expected failures and the rewritten row 535 pair use the harness's own keys.

**Standard 3.**
- The order has a middle attempt the decision did not name, subtyping with the expected type, for a lambda argument whose instance only the expected type fixes and which the coercion attempt cannot check (`rung-instance-bound/decision-record.md`, D4). By reading it keeps the decision's point, that a declaration that fits as the arguments are is not passed over for one reached by coercion. It is on Pavol's list.
- Row 425 is not closed. The bound is built, but a reduction's element type needs the desugaring (PLAN entry).
- Row 512's expected failure turned green and was promoted, a stop met and lifted.

**Verdict: in the spirit.** The 29 refusals are the rule meeting rung B's device and the checker's dropped expected types (section 2).

### Rung Q, `9d2e4c856`

**What landed.**
- `IntLiteral` an object under `Number`, coerced from by each integer type, `QQ`, `RR64` and `AnyIntegral`, with the team's arithmetic block enabled and its warning quoted whole.
- Each integer type's own comparisons, `CMP`, `MAXNUM`, `MINNUM` and `^(self, b: IntLiteral)`; `exactValue`'s numeral case; five natives in `IntLiteral.java`.
- The literals passage and a new Appendix I entry in the S1 form.

**Standard 1.** `literals.tex` and the entry say what the library now does. The entry's claim about `=` was false and was repaired by the review (section 5). The specification's explicit `NN32` to `RR64` conversion stays, since R9 is not built.

**Standard 2.**
- The compiler library's model is followed declaration by declaration. `IntLiteral` stays an object, because the team's native constructor is one (`IntLiteral.java:34-37`).
- It declares `zero`, `one`, `even`, `odd`, `floor`, `ceiling`, `truncate`, `DIVIDES`, `TIMES` and its own `^`, beyond the compiler library's `even` and `odd`. That was the judge's ruling under the coercion chapter's applicability rule, after the first skeptic's refusal: eight numeral-only calls the base accepted were refused. On Pavol's list.

**Standard 3.**
- The numeral switch is built as its judgement lists it. The one named measurement was taken, on each of three code states.
- `unsigned`'s stop was met (two api lines where the record allowed one) and lifted, listed.
- `ReflectiveQuickCheck.fss`, outside the record's files, is listed.
- R9 is not built. With `RR64`'s `coerce(x: NN32)`, a `ZZ32` with an `NN32` is ambiguous between `RR64`'s and `ZZ64`'s operators on both paths, against answer 8's `ZZ64` (`rung-numeral-library/REPORT.md` section 8; row 575). The worker found it in its first quarter hour with a probe. Returning it as a fork rather than choosing is what POSITIONS asks ("A decision made inside a worker's report ... is a decision not made").
- The conflict was knowable before the batch, and "Forks are probed before a batch is briefed" (POSITIONS). The record wrote R9 as "One api line, one body line, a test" and ran no probe.

**Verdict: in the spirit**, with one of the decisions it carried returned to Pavol.

### Rung O, `70d5486f9`

**What landed.**
- `OverloadingChecker.scala`: two functional methods at one self position are valid among the top-level functionals (`:534`, `:563-567`). The per-provider check reads every declaration in an api and, in a component, those with bodies and every one inherited from an api (`:135-158`). The meet is compared without self wherever it sits (`:584-586`).
- An inherited method's own static parameters are renamed apart with the checker's own `SNodeUtil.alphaRename` (`:184` on). The memo is keyed on the instantiated signatures and the scope (`:496-515`).
- `TypeAnalyzer.scala`: the reciprocal excludes entry read with its parameters in scope (row 557). `Types.java`: the character type re-pointed by the world switch's own pattern (row 477).

**Standard 1.** The Meet Rule for Functional Methods, per providing type, is the text's. The mixed family is left as the text leaves it (row 545). Object expressions are not visited per provider (row 570), a stop met and lifted.

**Standard 2.** Every device is the tree's own: `alphaRename`, the world switch, the top-level set's convention for what a component reads.

**Standard 3.** Q1 = (a) is built. The capture is fixed in the checker, not by renaming the library's `R`. The judge's decision 1 leaves a component's own abstract functional methods unread "as 2012 did", on a premise the second skeptic disproved (`SkAbsConc`, row 572). The three ways are on Pavol's list.

**Verdict: in the spirit.** The first pass checked fewer providers than the text asks, and the skeptic's refusal made it whole. That is the reason M1 reads 99 (section 1).

### Rung M, `0ae526b31`

**What landed.**
- Declarations on the meet: `Maybe`'s `map` and `ivmap`; `StandardMutableArrayType`'s `abstract copy():T`, its `abstract` added at the gather; the two sequential generators' `map` and `nest`.
- `String`'s juxtaposition as three top-level operators.
- 23 declared types set to what their bodies answer; row 483 by `FullRange[\T\]`; row 531 by `narrow`.

**Standard 1.** Each device answers the Meet Rule or the Subtype Rule as the text words them. The juxtaposition pair's self positions differ, which the text refuses outright, and as top-level functions the Meet Rule for functions is met.

**Standard 2.** `SimpleSeqFilterGenerator`'s `seq`, `SimpleMappedIndexed`'s `map` and the array diamond's `fill` and `tabulate` are the precedents. P2's devices are taken where P2 measured them.

**Standard 3.** "The library's own practice is the standard" is followed. Where a repair would change a walk value (`isLeftZero`) or needs a new type (the full sequential ranges' `map`), the slip is left with a row. The walk values that did change are repairs the record named, listed as a stop met and lifted. P2's `lift` device leaves the api disagreeing with the component, which the export list shows (on Pavol's list).

**Verdict: in the spirit.**

### The global questions

- **What "go" promised, against what landed** (`CLIMB-BATCH-8.md` section 1, "What 'go' commits you to"):
  - Rows 447, 505, 508, 515, 518 and 535 close: held. 541 closes for the checker; 425 does not.
  - Row 556's rule: held. Rows 557 and 477: held.
  - Row 517 and item 33: held.
  - "`NN32` converts into `RR64`, and the specification says so in three passages": not held, item 37.
  - Rows 483 and 531: held.
  - "No walk answer, model line or team test line changes": no model line and no team test line changed. Walk answers changed in rung M's repairs and in rung Q's per-type `MAXNUM`, `MINNUM` and `CMP`, each listed as a stop met and lifted or in rung Q's measurement.
- **Built twice.** Rungs I and O are the checker's alone. Walk's halves are the walk rung's (rows 424, 516) and Q-walk's (rows 454 and 578).
- **The library's way.** Yes in M and Q. O and I use the tree's own devices.

### Findings

Ranked by what they cost or risk next. Each gives its home.

1. **The next record must take M1's 95 per-provider pairs as library work, with row 580's `IN` on `FullRange`.** Severity: the largest class the batch left, and the switch-over meets the `IN` case in interpreter tests (`ProjectFortress/tests/RangeZZ32RungJ.fss:71`). Home: the next batch's line in PLAN's phase 3, which is not yet written; today only the "listed for his review" entry holds them.
2. **Item 20 is now one way, and item 36 is mostly settled by the text.** Severity: 29 refusals of the library's own `fail` and `builtinPrimitive`, all on the switch-over's path. Home: item 20 re-put to Pavol with its default changed to dropping the three written bounds (the evidence is the rung's and its skeptic's); item 36 narrowed to the `typecase` face at most, the rest a checker rung that passes the type the text requires (section 2).
3. **One decision of Pavol's was not probed against another before the brief.** R9 against answer 8. Severity: a promised change did not land; caught inside the rung at little cost. Home: the manual's "Preparing a batch record" — a decision that adds a coercion or a declaration to a shared type gets a probe of what it makes ambiguous before it is briefed.
4. **The class table's line ranges misfile 16 sites** (row 577). Severity: the next record is to be drafted "class by class from this batch's landed table" (`CLIMB-BATCH-8.md` section 1). FACTS guards V1 and G1 but not OT's +42. Home: the tools line; `classify.py`'s site ranges read by declaration rather than by line, before the next record is drafted.
5. **The wait bound and the cache.** Severity: 0.46M in one call. Home: the script line. `wait_for` caps its bound at 270 whatever the caller passes, or the default comes down to 240.
6. **Spec-text findings take the expensive route.** Severity: 0.53M and 36 minutes for one sentence. Home: the script and the manual. The gather corrects an Effect its own record shows false; the review fixes a text-only finding in its corrections commit; the gate rerun is judge-review.1 on Pavol's list.
7. **The cleaning took data a kept program reads for captures** (row 576). Severity: the microGPT checks could not run on any tree for two days. Home: the coordinator restores the ten files as tracked data; the cleaner pass of `main` (PLAN, "Housekeeping") carries the run-each-kept-tool check.
8. **The record asked a skeptic to re-measure, and the skeptics still lack the worker's record text.** Severity: a 14-minute stage run that gained nothing; skeptics I and O skipped check 8 ("record.md is not on the branch, and recordText was not in my brief"). Home: the script line and the manual, folded into the skeptic changes Pavol has taken (`coordinator/skeptic-scope-judgement.md` section 5, items 2 and 5).
9. **Open rows without a line.** Part 3.

## Part 2. Process measures

### What a batch commits

- The Fortress change: 7 source files (Scala and Java), 11 library files, 4 specification files and the rebuilt PDF (660 pages), and about 120 test files.
- Beside it, 21 files in the batch's own folders: 11 reports (four `REPORT.md`, four `SKEPTIC.md`, two `JUDGE.md`, rung I's decision record), the gather's `RECORD.md`, the review's `JUDGE-review.md`, seven gate tables and the per-site list at its fixed path.
- Five live records edited: FACTS, PLAN, the ledger, the handover and `map/dormant-code.md`.
- Nothing else: no capture, log or probe. The practice of 7b held.

### Test first, read from the transcripts

- **Rung Q:** the tests failed on the base at 13:14:10 ("Tests run: 2, Failures: 2"), were committed alone at 13:14:35, and the first edit came at 13:15:16. An earlier library edit at 13:03:45 was a probe of R9, reverted at 13:10:42 before any test was written.
- **Rung O:** failed at 14:30 ("Tests run: 3, Failures: 3" for each), committed at 14:35:25, first edit at 14:46:22.
- **Rung M:** failed at 14:57:51 ("Tests run: 4, Failures: 3"), committed at 14:58:18, first edit at 14:58:32. Its `BigMinMax` rewrite was run on a `git archive` of the base library and committed at 15:01:57.
- **Rung I:** started its base harness run at 13:10:07 on the base build. It wrote its Scala edit between 13:11:34 and 13:12:51, while that run was going. It read the failures at 13:13:02 ("F. compile ... InferLoneUnbounded"), committed the tests alone at 13:13:16, and first built the edit at 13:13:23. The failure was seen on the base's code before the edit was built, but the edit was written before the failure was read.
- **The repair rounds:** Q failed at 17:15:35, committed at 17:16:08, edited at 17:17:02; O failed at 17:12:49 and 17:16:58, committed at 17:17:31, edited at 17:18:11.
- New tests are named by topic: none of the 46 new or renamed programs carries a rung letter or a batch name. Eight messages that cited a section not saying what they said were corrected by the skeptics.

### What the agents read

- **The briefing.** 16 of the 21 agents were given one, and all 16 ran it, at their first to fifth call. The review, the gather, the gates and the commit stage are given none.
- Workers read every part. Rung I took 7 parts, about 71K tokens by the extract tool's own size line; Q 5 parts, 47K; M 4, 39K; O 4, 35K. That is about 5 % under the record's prediction (75.0K, 50.2K, 41.3K, 36.6K; `CLIMB-BATCH-8.md` section 7) and about 0.19M of the workers' 2.67M.
- The skeptics' slices are measured in the skeptic-scope judgement: 108K over six, skeptic I's 39K the largest.
- **The map.** Seven agents named map files in their calls: rungs Q, O and M, skeptic M, repair round O, second skeptic Q, and the gather, which edited `map/dormant-code.md`. No agent opened `INDEX.md`.
- **The batch record.** No agent read it whole; each read its section by headings and line ranges. The skeptics read it because their brief says it carries their section and does not (the judgement, section 2).

### Misses, by kind

Numbered on from `batch-7b-review.md`'s 189. "Found by" names the first to catch it.

Found inside the batch:
- **The change wrong.** 190, Q's eight numeral-only refusals (skeptic Q); 191, O's per-provider check skipping api-inherited declarations (row 568, skeptic O); 192, O's meet compared without the first element (row 569, skeptic O); 193, M's `copy` without `abstract` (skeptic M). All repaired before landing.
- **A new rule's effect on a sibling path.** 194, intersection instances: programs that ran now die (row 559, skeptic I); 195, a numeral `IN` a range (row 580, second skeptic Q); 196, `(3).minimum` (row 581, second skeptic Q); 197, a meet with self not first written twice (row 571, second skeptic O); 198, object expressions unchecked per provider (row 570, worker O); 199, row 546's expected failure now accepted and dying (row 566, worker O).
- **A premise of a decision or the record that does not hold.** 200, the judge's decision 1 on abstract functional methods (row 572, second skeptic O); 201, "rung B's written bounds become unnecessary" (row 560, worker I); 202, R9 against answer 8 (row 575, worker Q); 203, the numeral-switch judgement's premise that `i = 0` converts the numeral (worker Q, judge Q); 204, the record's `cross` and `MINMAX` body given to M (worker M).
- **The team's own code, found by the rungs' probes.** 205, symbolic operators never checked (row 584, skeptic M); 206, `String`'s four families (row 585, skeptic M); 207, `UniformDistribution` over a strided range (row 586, skeptic M); 208, a self-last cast (row 573, second skeptic O); 209, the duplicate-declaration message (row 574, second skeptic O); 210, the abstract-method checker's capture (row 563, worker O); 211, generic functional methods of generic traits (rows 564, 565 and 567, worker O).
- **Text or a record claiming more than the paths do.** 212, I's Effect silent on programs that now die (skeptic I); 213, Q's Effect "reach the declarations they reached before" (skeptic Q); 214, Q's Effect on `=` (judge Q; blocked by the review); 215, `InferCoercionShapes.fss:79` (skeptic I); 216, "no walk call reaches the block" (skeptic Q); 217, three sentences of O's report (skeptic O).
- **Provenance and citations.** 218, three cited lines off by a few (skeptics I, Q and O); 219, eight test messages citing sections that do not say it (skeptic Q, second skeptic O).
- **Process.** 220, row 576 (worker Q); 221, row 577 (workers M and Q); 222, no `recordText` for the skeptic (skeptics I and O); 223, the harness refusing report writes again (workers, skeptic M, repair round Q).
- **Other, record.** The reports left on their rungs' trees, row 314 as `assert`'s home (the review); the stale dormant-code line (second skeptic Q); M's slip count (skeptic M).

Found by this review:
- 224, the per-provider check read nothing in an api before; the record's M1 forecast did not look (section 1).
- 225, 16 class-table sites misfiled; OT's real rise 26 (section 2).
- 226, item 36's faces settled by the text (section 2).
- 227, rung I could not touch the library, so item 20's drop waited a batch (section 2).
- 228, the cleaning took data a kept program reads for captures (section 3).
- 229, a 280 s wait bound and a 0.46M rewrite (section 6).
- 230, the gather left a known-false Effect, and the review routed a text fix through a judge and a gate (section 5).
- 231, the record's own text asked skeptic M to re-run the stages (section 4).
- 232, open rows without a line (Part 3).

### Against the earlier notes

- **Found inside the batch, like for like** (190 to 219): 30 in 4 rungs, 7.5 a rung, against 7b's 19 (about 5). That compares with 7 in 6.5b, 5.5 in N, 7 in 6.5, 3.5 in 7C and 2.8 in 6b to 7R. Two refused rungs, each with a second skeptic, account for much of the rise.
- **By kind:** the team's own code 7, a new rule on a sibling path 6, text or record 6, a premise 5, the change wrong 4, provenance 2.
- **Who caught them:** first skeptics 15, second skeptics 6, workers 8 (their own premises and side effects, a new pattern), the judge 1. The gather found nothing new; the review found one already caught (214).
- **Landed.** No defect of a change. Known costs landed as rows: 559 (compiled runs that ran before now die), 560 (29 library refusals, nothing that ran), 570 (object expressions unchecked).
- **Escaped every check in the batch:** 224 to 232, in the record, the tools, the script and the routing.
- **Severity.** Nothing touches a line of the model or blocks the switch-over. The worst for Pavol is 202, a decision of his that did not land. The worst in the tree is 194, a compiled regression outside microGPT's path.

### Re-measuring what the record held

- No rung ran the count or distance stage on the unchanged base. Each took 7b's landed tables as its before. Pavol's rule held for the rungs.
- Every whole-suite run inside a rung was on a new code state.
- The repeats were elsewhere: skeptic M's distance run, which the record asked for; the gate's second run; and the builds of section 4.

### Measures the evidence supports, each with its cost

1. **The next record takes M1's 95 and row 580 as library work.** Evidence: section 1. Cost: a library rung.
2. **Item 20 re-put with "drop" as its default, and item 36 narrowed.** Evidence: section 2. Cost: three declarations, and one checker change for the contexts.
3. **A probe for any decision that adds a coercion or declaration to a shared type, before the brief.** Evidence: 202. Cost: about one probe per such decision.
4. **`classify.py` reads its site ranges by declaration.** Evidence: 225. Cost: a tool change, before the next record.
5. **`wait_for` capped at 270, or defaulted to 240.** Evidence: 229. Cost: one line of the prefix. Saves about 0.3M to 0.5M on any batch where it would have missed.
6. **The gather and the review fix text-only findings themselves.** Evidence: 230. Cost: two sentences of the manual. Saves about 0.4M and 12 minutes per such finding, and the gate rerun's 24 minutes once judge-review.1 is taken.
7. **The microGPT inputs restored as tracked data.** Evidence: 228. Cost: one commit.
8. **The skeptic changes Pavol has taken**, and the shared base build of "Nothing is built or run twice on the same code." Evidence: section 4. Cost: script work measured first (`coordinator/build-cache-exploration.md`, named in POSITIONS, not yet on file). Batch 9's before is section 4's line.

## Part 3. Routing

Checked against `main` at `7266ed23c`.

**Items for Pavol.** The review mapped 55 ids to PLAN entries (the journal's `pavolItems`). I read each named entry in "Climb batch 8, listed for his review" (`PLAN.md:437-472`) and items 20, 36, 37 and 38; every one is there, judge-review.1 at the end. Two entries now need changes: item 20's default and item 36's scope (finding 2).

**Rows the batch opened, 559 to 586.**
- Fixed inside the batch: 561, 562, 568, 569.
- In PLAN's entries or items: 559, 560, 566 (inside a stop entry), 570, 572, 575, 576, 577, 580, 581, 582, 583, 584, 585.
- Open, with a home in the row and no line of PLAN:
  - code generation and the run time on the compiled path, phase 5's line: 559's repair (the run time has no class for an intersection; it is listed for Pavol, but phase 5's code-generation line names it nowhere), 564, 565, 566, 571 and 573;
  - the walk rung after batch 8 (`PLAN.md`, phase 3, the walk lines): 567, walk refusing a generic functional method of a trait with static parameters, and 586, `UniformDistribution` over a strided range;
  - Q-walk's line (phase 4): 578, the object `IntLiteral`'s arithmetic answering a `ZZ32` under walk;
  - a later checker rung: 563, the abstract-method checker's capture, and 574, the duplicate-declaration message;
  - the switch-over's library work: 579, the floor brackets of an integer refused over the one library.

**Lines the batch made stale.**
- Phase 3's batch 8 line still says rung B's bounds "become unnecessary and may stay (item 20)" (`PLAN.md:85`). Item 20 itself is corrected.
- The batch 8 line's list of what it leaves for the next record names the residue classes. It does not name M1's 95, and the next record's line is not yet written.

**Script and procedure items.** Findings 3, 5, 6 and 8 and measures 3, 5, 6 and 8: the script line and the manual. Finding 4: the tools. Finding 7: the coordinator's commit. None has a line today but judge-review.1.

**The checker-count check.** Every new or risen row of `compile-ladder/climb-batch-8/gate/checker-count.txt` against 7b's.
- No row is new: the same twelve apis.
- One row rose: `RangeInternals`, 12 to 102. The stage prints each api's own count, which counts each error twice; 6 errors to 51 (`tmp/gate-batch-8/checker-count/run.txt`, "checkApi RangeInternals -> errors=102").
  - `CAP` 32 and `IN` 17: rung O, `70d5486f9`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:138-141`, the per-provider check reading every functional method in an api, where at `493b4076f` it kept only those with a body (`:133`) and so read none. The pairs are those of section 1: `Library/FortressLibrary.fsi:2228` against `Library/RangeInternals.fsi:46`, `:63-64`, `:94-95`; `FortressLibrary.fsi:828`, `:2203`, `:2220` against `:2182` and `RangeInternals.fsi:65`, `:96`.
  - `map` 2, unchanged: row 583.
  - Gone from the row: the top-level `IN` (rung O's rule, `OverloadingChecker.scala:534`, `:563-567`), and `atMost` 2 and `every` 1 (rung M, its `RangeInternals.fsi` retypings).
- The other rows fell. `FortressLibrary` 106 to 10, 53 errors to 5: the 3 per-provider `IN`s on `FullRange`, `CompactFullRange` and `StridedFullRange` and `SQCAP` on `Just` are new by the same edit, and `isLeftZero` stays (row 582). `#total` 59 to 56 and `#locations` 48 to 18. `#crash none` unchanged.
- The distance's risen units, for completeness:
  - `api RangeInternals` 6 to 51 and `component RangeInternals` 73 to 112: rung O's per-provider check, as above.
  - `component Writer` 1 to 9 and `NativeArray` 0 to 1: rung I's bound, row 560, `Formula.scala:538-539`. `FortressBuiltin` 6 to 8: +4 by the same edit, less rung Q's two at the base's `:474`.
  - `component String` 67 to 69: +4 unmasked by rung O's `Types.java` edit (row 477) at `Library/String.fss:331`, +1 row 560 at `:426`, −3 by rung M.

## What I did not do

- I built nothing, ran no Fortress program and no gate stage, and edited no file but this one. I read the main tree's untracked logs under `tmp/gate-batch-8/` and touched nothing there.
- The build times rest on the agents' own Total-time lines and an estimate of 100 s for each library rebuild. The token shares of builds rest on the writes of the message after each build call. Both are approximations.
- The settled reading of item 36's faces (section 2) is by reading the text. No checker change was tried.
- The commit stage's microGPT run had finished when I looked (both checks 40 of 40); I read its output and nothing else of it.
- I did not measure this review's own cost.

## For Pavol

- All four rungs follow your decisions and the designers' text.
- One decision did not land: `NN32` into `RR64`. Built, it makes `ZZ32` plus `NN32` ambiguous, against answer 8. It is item 37, default "not built"; a probe before the batch would have caught it.
- The Meet Rule count moved only 103 to 99, but the rule worked:
  - it cleared the 78 expected, the other fixes 41 more;
  - the corrected checker now sees 95 real library gaps, the range types' `CAP` (64) and `IN` (30) above all: next batch's library work.
- The 29 new body errors are the paper's rule meeting the `Object` bounds batch 7 wrote to get `Bottom`. Nothing that ran is lost:
  - dropping those bounds (item 20) clears 18;
  - the other 11 also need `()` passed into an `if` without `else`, as the specification already requires, so item 36 is mostly settled.
- The cleaning deleted the microGPT checks' input files, taking them for captures. Restore them.
- The before for batch 9:
  - 35 builds, about 85 minutes of machine time; 22 rebuilt code another agent had built;
  - the gate ran twice; the second skeptics redid their whole list;
  - about 0.5M and an hour of waiting.
- The review's one blocking finding cost 0.53M and 36 minutes, to fix one sentence the gather already knew was wrong.
- Cost: 7.7M written, 21 agents, 7 h 37 min; the record said 6M to 8M. One cache miss took 0.46M.
