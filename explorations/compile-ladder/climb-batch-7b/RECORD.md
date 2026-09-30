# Climb batch 7b: the gather's record

Written at the gather stage of climb batch 7b (2026-09-30), the second run of `explorations/coordinator/CLIMB-BATCH-7.md` (rungs S, C, W and L), on `main` from the base `811053f15`. `main` was at `25cba24fc` when the gather began, seventeen coordinator commits above the base (`161d15135` to `25cba24fc`: boot notes, the cleaning of the landed batches' scratch, the post-mortem's reviews and their fixes, and `POSITIONS.md`'s entry of Pavol's statement on the night's usage limit). None touches a rung's file or anything outside `explorations/`; the ledger, `FACTS.md`, `PLAN.md` and the handover are as the coordinator left them. All four rungs were approved, and each landed as one commit composed from its branch's net change; no branch is a parent of anything on `main`.

**Preconditions.** `811053f15` is an ancestor of `HEAD`, and `git status --porcelain` was empty.

**Scratch.** The gather's patches, tools and probe runs are in its scratchpad, not in the tree. To run the tests it added, the gather built one merged tree outside the main tree: a detached worktree at the base with the four patches applied (`git apply --index`, no conflict), `ant compileAll` (48 s) and the five library components compiled in library order (AnyType 16 s, CompilerBuiltin 71 s, CompilerLibrary 29 s, CompilerAlgebra 1 s, CompilerSystem 2 s). Every harness run quoted below is on that tree, with its own copy of `explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh` for `compiler_tests/` and of `explorations/compile-ladder/rung-inference-walk/harness-one.sh` for `tests/`.

## The order the rungs were applied in

C, then S, then W, then L. No path is shared by two branches (`git diff --name-only 811053f15...<branch>` for the four, compared: no path in two lists, and the four renames are each one rung's), so the rule of the lowest edited line in a shared file does not order them, and the batch record's own order stands (`coordinator/CLIMB-BATCH-7.md` section 4, "The order the gather applies them": "C, then S, then W, then L"). S follows C because it lands only with C and the gather checks S's text against C's landed tests; W follows S so that its commit carries the correction of S's interpreter callout that W's landing settles; L comes last.

Where one rung's records cite lines another rung's edit moves:
- S's edit and the gather's corrections of it move lines of the specification chapters that C's records cite; C's folded lines cite those passages by name or "at `811053f15`", so none needed re-anchoring.
- C's renamed `ComprisesMeetCompiled.fss` and W's renamed `ComprisesMeetWalk.fss` cite `Specification/advanced/overloading.tex`; they are re-anchored in S's commit (C's file) and W's commit (W's file), by the map of unchanged lines, as S's report asks (its section 5).
- No rung's record cites a line of a file that a later rung's edit moves, outside the specification.

## Final row numbers

From 534, the first free row, in manifest order S, C, W, L, each rung's own provisional rows first and then the rows the gather opened from its skeptics' recommendations. Since C lands before S, C's commit appends rows 536 to 546 after row 533 in section 10 of the ledger, and S's commit inserts rows 534 and 535 before them, so that the table stays in numeric order (the precedent is climb batch 7's gather, `compile-ladder/climb-batch-7/RECORD.md`, "Final row numbers"). No row is renumbered.
- S: its provisional 534 keeps its number (walk does not apply the naked-`Any` restriction); its skeptic's first recommended row, the checker's union reaching code generation, is 535.
- C: its provisional rows 534 to 541 are 536 to 543; its second skeptic's recommended rows are 544 (walk runs a type that provides two overlapping functional methods and no cover), 545 (a function beside functional methods, which rule governs) and 546 (the closed-trait case for a family with static parameters); the gather's finding on the skeptic's recommended pin is 547 (the checker's verdict carried between compilations).
- W and L: in their sections below.

## Rung C (`rung-return-type-rule`)

**Inherited from the branch.** Fourteen commits, `0d002d8c8` to `91c7b3083`: the tests alone (`0d002d8c8`), the edit and the positional rule's scope (`4ada6fa29`, `f065994f6`), the decision record and the record lines (`837c5bbbb`, `be547b049`, `dbdc68209`); the first skeptic's refusal on D1 (`6545e19c4`); the judge's ruling, repair (`43740c8fb`); the repair round's tests alone, its edit, `REPORT.md` and its corrections (`e2e4d2f32`, `8341b87f5`, `52706eb5b`, `c722be93f`, `e7c5dab6f`); the second skeptic's judgement, approved with three required corrections (`91c7b3083`). `REPORT.md`, `SKEPTIC.md` (both judgements, the second first), `JUDGE.md`, `decision-record.md` and `record.md` were on the branch and stand as they are, with the gather's edits below; no file was written from the journal. The decision record lands with the rung although the gather's rule names one for a specification rung only, since C's FACTS entries and the second skeptic's correction 3 cite it.

**Applied.** `git apply --3way --index` of `git diff --binary 811053f15...wip/rung-return-type-rule` applied without a conflict; its only warnings were whitespace in two captured lines. Every path of the patch matches the branch in the index (blob for blob), the two renames and the deleted `XXXInferLoneBoundUnion.fss` among them.

**Corrections.** The first judgement's eight, which the repair round made, each checked in the file it names:
1. D1: `OverloadingOracle.scala:107-110` substitutes the forced solutions into a kept parameter's bound; `ProjectFortress/compiler_tests/OverloadBoundNamesForced.fss` with its `.test` (compile, link, run, `PASS`) asserts `plain` and `generic`; `REPORT.md` section 14 shows it failing on the pre-repair head ("X is not in the kind env") and passing after; `XXXOverloadReturnEveryInstance` and `XXXOverloadPermutedStaticParams` are unchanged.
2. D2: `XXXCoverageReturnMethodCall` (`compile_exception_contains=IntersectionType cannot be cast`), row 540.
3. D3: `XXXCoverageReturnInferred` (`compile_err_contains=but declared type is`), row 541.
4. D4: home 1, `ComprisesMeetFunctionalMethod` (`tag(s) = 3`) with its control `XXXComprisesMeetFunctionalMethodUncovered`; the FACTS entry, the decision record's section 3 and the report say which functional methods the check covers.
5. D5: `XXXOverloadReturnObjectDomain`, row 542; the first FACTS entry says the rule is stricter than the paper on object domains.
6. D6: `XXXCoverageReturnGenericFamily`, row 543; the second FACTS entry says which families the intersection typing covers.
7. The provenance block's precedent line cites `OverloadingOracle.scala:92-100 at 811053f15` (`REPORT.md:7`, after the gather's note line).
8. `REPORT.md` is the first pass's text with the repair round's section 14 added.

The second judgement's three, made at the gather:
1. `REPORT.md` section 14, "The sibling count (rule 2)": 12 sites and "the other ten". The structured report's summary is not in the tree; the commit stage carries none of it.
2. Row 541's specification citation is `Specification/basic/inference.tex:83-89` at `811053f15`, in the folded row.
3. The scope of the functional-method case: one sentence in the second FACTS entry, in `decision-record.md` section 3 and in `REPORT.md` sections 10 and 12 (section 12 names it as a point S's text has to match): coverage for functional methods is judged in each trait or object that provides the two declarations, over the declarations it provides, as the Meet Rule for Functional Methods is worded, so `SkFnBetween` is refused in its trait `M`, while the functions' form is accepted.

The provisional numbers are corrected to the final ones in `REPORT.md`, `SKEPTIC.md`, `JUDGE.md` and `decision-record.md` ("provisional row 540" reads "row 542", and so on); each of the three reports gains one italic note line under its title saying so, and `JUDGE.md`'s notes that its instruction 5's provisional 542, the fallback not taken, was never opened. The rung's tests cite no row number.

**Recommended rows** (the second skeptic's ten; the first judgement's rows are the provisional ones):
- The method call on an intersection-typed result: opened, row 540 (the rung's D2).
- Generic inference on an intersection-typed argument: opened, row 541 (D3).
- The closed-trait case for functional methods declared in the closed traits: refused as a row, since the repair round repaired it in the rung (D4, home 1, `ComprisesMeetFunctionalMethod`).
- The Return Type Rule on an object domain: opened, row 542 (D5).
- A family with a generic member typed by the sort's head: opened, row 543 (D6).
- Walk runs a type that provides two overlapping functional methods and no covering declaration (`SkFnObjNoClause`, `SkFnUncoveredWalk`): opened, row 544, its home the row alone, since walk's harness cannot gate an acceptance; rung L's skeptic's third recommended row, the same mechanism over open traits, is a note on it (L's section).
- A function beside functional methods over two closed traits (`SkFnMixedTop`): opened, row 545, home 3; the chapter's two rules for it stand as the Working Draft wrote them, and rung S's text does not settle which governs.
- The closed-trait case for a family with static parameters (`SkFnGenericTrait`): opened, row 546, home 3 at C's landing; S's commit makes it the text mismatch of S's section.
- A note on row 413 (`SkD1Nat`): appended, in the skeptic's words.
- A pin of `SkFnBetween`'s refusal: refused as a landed test, and row 547 opened in its place. The gather wrote the pin, `XXXComprisesMeetFunctionalMethodBetween.fss` with a `.test` pinned by `compile_err_contains=Invalid overloading of choose in trait M` (the skeptic's program with its component renamed), and ran it through `junit.sh` on the merged tree. Alone it was an expected failure in five one-test harness runs, and eight direct compiles printed the refusal; but the tree's first one-test run printed "Saw failure, but did not satisfy compile_err_contains", and a one-JVM run of the rung's 36 tests with it failed it the same way ("Tests run: 62, Failures: 1", the pin the one failure). A copy under a name that makes the harness print its output showed why: after `CoverageReturnGood.test` in the same JVM the program compiles with no message at all (`ONE_JVM=1 junit.sh` over `CoverageReturnGood.test` and the copy, twice: ". compile ProjectFortress/compiler_tests/ZzFnBetweenProbe  FAIL", no diagnostic), where alone it is refused in trait `M` (four runs). A pin would make the gate's verdict depend on its order, so the file was not landed; row 547 records the carried state, which turning off `TraitTable`'s clause memos did not change. The rung's own 36 tests kept their verdicts in the same one-JVM run.

**Folded.**
- `FACTS.md`: the two record entries after the last entry of "The checker and the one library", with the landing placeholder and final row numbers, the second with correction 3's sentence; the harness entry after the last entry of "The harness and the gate"; the three appends, to "The checker's return-type rule lets the more specific declaration choose its own instantiation", "The compiled checker does not enforce the specification's sentence that overloads may not differ in static parameters" and "A generic arm of a template dispatcher is called at the dispatcher's own static parameters"; "The ledger"'s two citations re-anchored to the worklist's and the counts by kind's headings after the rows added (they were already fifteen lines stale).
- The ledger: row 398 `FIXED` with its note; notes on rows 492, 491, 499, 496 (home 3 to home 2), 494, 516, 487 and 488, and the skeptic's on 413; rows 536 to 547 after row 533.
- The handover: one paragraph after climb batch 6.5b's.
- `PLAN.md`: a new subsection of "Off the path, parked", "Climb batch 7b, listed for his review", with eight entries, and a sentence on item 32.

**Items for Pavol, as `PLAN.md` holds them:**
- **C.worker.1, C.skeptic.1, C.skeptic2.2 and C.judge.1**, D5, the Return Type Rule on an object domain: the first entry of the new subsection; default, keep the refusal.
- **C.worker.2, C.skeptic.2, C.skeptic2.3 and C.judge.2**, D6, the intersection typing's scope: its second entry.
- **C.worker.3 and C.judge.3**, D4: its third entry.
- **C.worker.4, C.skeptic.3, C.skeptic2.4 and C.judge.4**, the coercion tie: its fourth entry; default, batch N's rule.
- **C.worker.5 and C.skeptic2.5**, the positional rule's scope: its fifth entry.
- **C.worker.6 and C.skeptic2.1**, the closed-trait case's reach and the per-provider reading: its sixth entry, which names row 547.
- **C.worker.7**, the dynamic-applicability annotation: its seventh entry.
- **C.worker.8**, row 499's direct call: its eighth entry.
- **C.worker.9**, walk's refusal of the paper's set (row 539): in W's section, where the walk expected failure it asks for is added.
- **C.worker.10**, evidence for the domain condition: a sentence on item 32 ("Before batch 8").

**Stops.** None met by the worker, the repair round or either skeptic. The gather's row 547 is a finding, not a stop: no test of the rung changed its verdict.

**For the gate.** The compiler track's `.test` files rise by 34: the rung adds 34 and renames 2 (`XXXComprisesMeetCompiled.test` to `XXXComprisesMeetNoCover.test`, `XXXInferLoneBoundUnion.test` to `XXXInferLoneUnbounded.test`, their programs renamed or rewritten beside them). Rung C's Scala edits need `ant compileAll`. The checker count on C's tree alone is 77 and the distance 626, both the `cond` pair rung L's api line clears.

## Rung S (`rung-spec-overloading`)

**Inherited from the branch.** Five commits, `44df8309c` to `903ec3623`: the list of passages alone (`44df8309c`), the edits and the re-anchoring (`286c44308`), the decision record and two scoping corrections (`2d56f7bdb`, `5bd998fd6`), and the skeptic's judgement, approved with seven required corrections (`903ec3623`). `SKEPTIC.md` and `decision-record.md` were on the branch and stand as they are, with the gather's edits below.

**Written at the gather.** `explorations/compile-ladder/rung-spec-overloading/REPORT.md` (25,337 bytes) and `record.md` (12,876 bytes), each by its `journal-text.py` command from the worker's `reportText` and `recordText` (the journal `wf_61521277-479/journal.jsonl`); nothing composed. Then the gather's edits below.

**Applied.** `git apply --3way --index` of `git diff --binary 811053f15...wip/rung-spec-overloading`, on top of C's commit, applied without a conflict; all 59 paths of the patch match the branch in the index. No path is shared with C's commit.

**Corrections.** The skeptic's seven, made at the gather:
1. The typing of a call between two closed traits scoped to Astra's boundary, "where they, and every declaration more specific than them that the call may run, have no static parameters": `Specification/advanced/overloading.tex:85-87` and `:678-683`; in `revival-meet`'s Change and Effect (`Specification/appendices/changes.tex`, the entry at `:2281`); in "Passages not yet revised"'s sentence on the case it leaves; and in the second FACTS entry as folded.
2. The sentence that a bound ruling out the only meeting point is not exclusion removed from the new section (the base of rung S's `:583-586`), from the `revival-overloading` box of `Specification/appendices/future.tex` (which now says the question is not settled) and from `decision-record.md` section 3; "Passages not yet revised" gains the question with the checker's two answers (`changes.tex:2524-2529`); the question is in `PLAN.md` (S.skeptic.1).
3. The new section's callout says that neither implementation runs the Return Type Rule's repair: walk refuses it at load (row 159), the code generator fails on it (row 537) (`advanced/overloading.tex:617-620`).
4. The covering entry's Effect and `Specification/basic/functions.tex:428-431` say what `AbstractMethodChecker` does: at each object declaration, the concrete methods cover the inherited abstract ones, no `comprises` clause read.
5. The POPL recheck's item 1.4 sentence: the 2019 proof "excludes an upper bound that names a type parameter, its own included, and closed types" (`changes.tex:1925-1926`).
6. The inference entry's Change states the rule as it now is, "and otherwise, since 29~September 2026, its bound (below)" (`changes.tex:1570-1571`), and says that the first box points to the entry's list of departures (`:1607-1608`).
7. `REPORT.md` and `record.md` written from the worker's result; corrections 1 and 2 carried into `REPORT.md` (sections 2 and 9) and into the folded FACTS lines, and the stop the skeptic found listed as met in `REPORT.md` section 12, lifted by POSITIONS 2026-09-27, the stops. `REPORT.md`, `SKEPTIC.md` and `decision-record.md` gain an italic note line under their titles; `REPORT.md`'s gives the line shifts the corrections make, since the three files keep the rung's tree's line numbers.

**The check of S's text against C's landed tests.** Each rule the text states, against the program and refusal that pins it:
- The Return Type Rule over every instance: `XXXOverloadReturnEveryInstance` refuses the example's shape. Matches.
- The positional restriction: the text's callout said the compiled implementation asks two declarations in the more-specific relation for the same number and kinds of static parameters; the checker compares two declarations only when they declare as many of their own (`OverloadingOracle.scala:161-175`), and a first build that compared every pair refused the team's `Compiled12.invariantInference`. The callout describes the implementation (the recheck's item 1.3), so the decisions settle the mismatch on the text's side: the gather narrowed the callout (`advanced/overloading.tex:623-627`), the Change of `revival-overloading` and the decision record to that scope. C.worker.5 carries the scope to Pavol.
- A generic declaration beside a plain one, `GenPlainSub`'s shape: `OverloadGenericBesidePlain`. Matches.
- The Meet Rule's closed-trait case for functions: `ComprisesMeetCompiled`, `ComprisesBetweenTwoClosed`, `CoverageReturnGood` in both orders, with the refusals of `XXXComprisesMeetNoCover`, `XXXComprisesMeetUncovered`, `XXXComprisesMeetUnexcluded` and `XXXCoverageReturnBad` (on the Return Type Rule). Matches. For functional methods the text's case is "declarations provided by C", per provider, as the checker's `coverageRule`; the checker's verdict on `SkFnBetween` carried between compilations is row 547, which the entry names.
- The case for declarations with static parameters: the text states it (`advanced/overloading.tex:567-571`); the checker refuses it (`SkFnGenericTrait`, row 546). The decisions do not settle it: item 26 gives the Meet Rule the case with no scope of its own, and the proof addendum leaves generic coverage to later work. By the rule for such a mismatch it lands as a reserved stop met does, with its three records in this commit: the text stands; row 546 gains its note and a gated home-2 test, `ProjectFortress/compiler_tests/XXXComprisesMeetGenericTrait.fss` with its `.test` (compile, `compile_err_contains=Invalid overloading of tag`), the skeptic's program with its component renamed and one comment line; and the Effect of `revival-meet` names row 546 among the checker's departures. Through `junit.sh` on the merged tree: alone, twice, "Invalid overloading of tag in component XXXComprisesMeetGenericTrait:" and "Saw expected failure"; after `CoverageReturnGood.test`, `ComprisesMeetFunctionalMethod.test` and `ComprisesMeetCompiled.test` in one JVM, "Saw expected failure", "OK (10 tests)"; and on a stand-in with the static parameters struck out, "Saw failure, but did not satisfy compile_err_contains" and "Tests run: 1, Failures: 1". gather.1 in `PLAN.md`.
- The typing of a call between two closed traits: the text, after correction 1, types by the intersection within Astra's boundary; the checker only in a family none of whose declarations has static parameters (row 543, `XXXCoverageReturnGenericFamily`, the judge's D6). Settled on the text's side by item 26's decision with Astra's boundary; the checker's narrower condition is the judge's decision, on record for Pavol. The Effect of `revival-meet` names row 543, with row 540 (the code generator's crash on a method call on the intersection-typed result).
- The Return Type Rule on an object domain: the text states the paper's rule; the checker refuses more (row 542, `XXXOverloadReturnObjectDomain`, D5). Settled on the text's side by answer 9; the construction's strictness is on record for Pavol. The Effect of `revival-overloading` names row 542, with row 537 (code generation fails on the repair and on the 2019 paper's set) and rows 159 and 539 (walk refuses both at load).
- The inference chapter's rule for a whole-type parameter against an intersection-typed argument: row 541 (`XXXCoverageReturnInferred`) is the checker's fifth departure, added to the inference entry's list (`changes.tex:1684-1696`).
- The paper's instance rule: `row~NNN` is row 538 (`XXXGenericInstanceUnfixed`), in the dispatch callout (`Specification/basic/overloading.tex:347`) and the Effect of `revival-dispatch`.
- The 2019 paper's `ArrayList`/`List` set: the checker accepts it, and its run fails with defect 3 (row 537), so the sentence rung S's report offered for the case where the checker refuses it ("The compiled type checker refuses the example ...") was not added; the Effect names row 537 for code generation instead.
- `SkBetweenAssign` (covering is not subtyping): refused, as C's report measured. Matches.
Every piece of P2 lands, since C landed with row 492's expected failure renamed.

**Re-anchored.** The gather's corrections move lines of `advanced/overloading.tex`: `ProjectFortress/tests/CoercionRedispatchRungC.fss:36-42`'s citations of the "Moreover" sentence go from `:672-676` to `:673-677`, by the map of unchanged lines from the branch's chapter to the tree's. The three files rung S left for the gather (its report's section 5, the table): `ProjectFortress/compiler_tests/ComprisesMeetCompiled.fss:18` (rung C's rename) from the base's `:282-307` to `:346-372`, the example and its conclusion without the callout, as rung S mapped it on its tree (`:345-371`) and moved one line by correction 1; `ProjectFortress/tests/XXXDispatchRenamedArmWalkRungG.fss:29`, `:31` and `XXXDispatchSwappedArmWalkRungG.fss:27`, `:29`, which rung W did not rename, from `basic/overloading.tex:100-107, :262-276` to `:100-110, :297-311`. No assertion changed. `XXXInferLoneBoundUnion.fss` is gone with C's rewrite, and `XXXComprisesMeetWalk.fss` and `XXXInferLoneUnionWalk.fss` are W's, re-anchored or gone in W's commit. The lines folded into `FACTS.md` and the ledger are the tree's, mapped by the same map from the rung's numbering.

**Recommended rows.**
- The checker's union reaching code generation (`SkUnionClosed`): opened, row 535, home 2, with the expected-failure pair the skeptic asks for: `ProjectFortress/compiler_tests/XXXInferLoneUnionClosedTrait.fss` (the skeptic's program with its component renamed and one comment line), `InferLoneUnionClosedTraitLink.test` (link) and `XXXInferLoneUnionClosedTrait.test` (run, `run_out_does_not_contain=REACHED`, since the run dies before any output). Through `junit.sh` on the merged tree: the link test "OK", the run "java.lang.VerifyError: Bad type on operand stack", "Saw expected failure (Exit code != 0)"; both again in the one-JVM runs.
- A note on row 412, the `Object` bound's observable effects: appended, and the home-2 test it names added, `ProjectFortress/compiler_tests/XXXImplicitBoundAny.fss` with its `.test` (compile, `compile_err_contains=does not satisfy the corresponding bound Object`): "Ill-formed type: Seal[\Any\] The static argument Any does not satisfy the corresponding bound Object.", "Saw expected failure".
- Notes on rows 159, 341 and 475: appended, citing the replacing section at the tree's lines.

**Folded.**
- `FACTS.md`: the record's two entries after the last entry of "The specification and the repository's lineage", with the landing placeholder, the tree's line numbers, corrections 1 and 2, the positional scope, and the departures the entries name; "The ledger"'s two citations re-anchored.
- The ledger: rows 534 and 535 inserted after row 533, before C's 536; row 491 `FIXED`; the record's notes on rows 19, 364, 398, 412, 478, 487, 496, 499, 508, 515, 516 and 518; the gather's notes on rows 159, 537, 538, 539, 540, 541, 542, 543 and 547 (named among the departures in Appendix I), on 546 (the text mismatch), and the skeptic's on 412, 159, 341 and 475.
- The handover: one paragraph after C's.
- `PLAN.md`: seven entries in "Climb batch 7b, listed for his review", and gather.1.

**Items for Pavol, as `PLAN.md` holds them:**
- **S.skeptic.1**, whether a bound that rules out the only meeting point makes two parameter types exclude: the entry "Whether two parameter types exclude each other ...".
- **S.worker.1 and S.skeptic.3**, the dotted-method Meet Rule: the entry "The Meet Rule for dotted methods keeps its exact-meet form ...".
- **S.worker.2 and S.skeptic.4**, the `makeSet` example: its entry.
- **S.worker.3**, the Return Type Rule's repair that neither path runs: its entry.
- **S.worker.4 and S.skeptic.5**, the three passages beyond the brief: its entry.
- **S.worker.5**, row 534: its entry.
- **S.skeptic.6**, the recheck's five defaults as written: its entry.
- **S.skeptic.2**, the dispatch sentence keeping the inferred instance for the declaration the static call selected: already in `PLAN.md`, "Pavol's answers", "For his review", the entry "Item 30's clause that a declaration the static call selected keeps its inferred instantiation departs from the paper ..."; not written again.
- **gather.1**, the Meet Rule's closed-trait case for declarations with static parameters: its entry.

**Stops.** The skeptic's one (its section 13, normative text for a rule neither path runs, in two places), met by the worker's text and removed by corrections 1 and 2; reversible and lifted by POSITIONS 2026-09-27, the stops. The gather's text mismatch (gather.1) lands the same way, as a reserved stop met: reversible, listed for Pavol, lifted by POSITIONS 2026-09-27, the stops, and 2026-09-29 on weighing cost against what a rule protects. No file under `Specification-1.0-frozen/` changed.

**For the gate.** The compiler track gains 4 `.test` files (the gather's `InferLoneUnionClosedTraitLink`, `XXXInferLoneUnionClosedTrait`, `XXXImplicitBoundAny` and `XXXComprisesMeetGenericTrait`, and none of the rung's, which only changes messages). No source changed; the checker count and the distance are unchanged by S. The specification is rebuilt by the commit stage; on the merged tree with the gather's corrections, `./ant genSource` and `./ant tex` in `Specification/fortress/` wrote "Output written on fortress.pdf (655 pages, 2230334 bytes)", its final pass with no undefined reference (rung S's tree built at 654).

## Rung W (`rung-walk-dispatch`)

**Inherited from the branch.** Six commits, `b3589652e` to `1d78d7828`: the tests alone, before the edit (`b3589652e`); the edit (`adc6505c1`); two expected failures and a pin added during the work (`9b1dece71`, `ba9959f31`); the record lines (`a50c7e78f`); one more expected failure with its provisional row (`1d78d7828`). `record.md` was on the branch and is folded.

**Written at the gather.** `explorations/compile-ladder/rung-walk-dispatch/REPORT.md` (39,998 bytes) from the worker's `reportText` and `SKEPTIC.md` (14,250 bytes) from the skeptic's `skepticText`, each by its `journal-text.py` command; nothing composed. Then the gather's edits below, and an italic note line under each title.

**Applied.** `git apply --3way --index` of `git diff --binary 811053f15...wip/rung-walk-dispatch`, on top of S's commit, applied without a conflict; every path matches the branch in the index, the rename of `XXXComprisesMeetWalk.fss` and the deletion of `XXXInferLoneUnionWalk.fss` among them. No path is shared with C's or S's commit.

**Final row numbers.** W's provisional rows 534 to 536 are 548 to 550; its skeptic's two recommended rows are 551 (walk's unchecked closure) and 552 (the lift's overlap reading). They follow row 547. W's record asked for its rows in section 4 of the ledger; the gather's rule puts every new row in the ledger's last table, after row 547, as the batches before did. The provisional numbers are corrected in `REPORT.md` and `SKEPTIC.md` (the one range "534-536" by hand); the rung's tests cite no row number.

**Corrections.** The skeptic's seven, made at the gather:
1. The unlisted extender (`SkUnlistedExtender`): row 551, its home the row alone on the rung's decision-6 reasoning, and row 492's note gains the sentence that the closure the coverage assumes is unenforced under walk within a component too, not only across components (row 487).
2. The lift's overlap reading: `ProjectFortress/tests/XXXGenericBesidePlainTwoBounds.fss`, in `SkGenTwoBounds`'s shape with a `ZZ32` variable, asserting `meet`, `generic` and `bothAny`. Through `harness-one.sh` on the merged tree: "OK Saw expected exception"; on a stand-in with the one bound `Aa`, "PASS", "Missing expected failure", "Tests run: 2, Failures: 1". Row 552, beside row 550, names the reading's limits: two bounds, a type parameter inside another type, a bound naming a static parameter, a non-type static parameter (`OverloadedFunction.java:736-757`).
3. The visitor lacks 11 of the AST's 18 concrete type classes, `_InferenceVarType` the eleventh (`ProjectFortress/astgen/Fortress.ast:1015-1168`, read): in the third FACTS entry and `REPORT.md` section 3.
4. Rung S's interpreter callout (`Specification/basic/inference.tex:164-167` on the landed tree): it no longer says that walk does not compare declarations with static parameters on their declared types nor dispatch a converted call again; it says walk does both, except generic dotted methods (row 21) and a call of an overloaded method. The edit moves two citations of `inference.tex:198-203` to `:199-204` (`ProjectFortress/compiler_tests/XXXInferResultOnlyAny.fss:13`, `XXXInferResultOnlyCoerced.fss:34`), re-anchored by the map of unchanged lines from S's commit.
5. Row 157's note says that the row's run-c reproducers now stop earlier, at the library's `fill`, on the base and after, so the row closes on `GenericReturningAny.fss`, the `nat` form fixed as well.
6. `REPORT.md` written from `reportText`; the gather opened each file:line of its provenance block. The problem lines hold what they say (`GenPlainSub.fss:10-11` the two declarations, its capture `generic` three times, `O2Z64.walk-stock.txt:2-6` and `BoundBoundedFirstSameName.txt:3-7` the load refusals, `both-paths.txt:38-41` "Missing visitor for class ... AnyType", the base's `XXXComprisesMeetWalk.fss:13-20` the example), the specification lines are the base's (the Overloading Resolution section, the Subtype Rule, the Meet Rule and its example; the base's `basic/overloading.tex:292-295` is the sentence rung S replaced), the precedent lines hold `P4Probe`'s type-only values, the base's `bestMatchWithCoercion`, `FType`'s transitive `comprises` exclusion and the base's no-op `forTraitType`, and the historical line names `OverloadedFunction.java`, `GenericFunctionOrMethod.java` and `MakeInferenceSpecific.java`. The note under the title says so.
7. `SkPosBox`'s compiled column in `REPORT.md` section 7: `box` for the direct call and `any` for the three `viaT` calls.

**Re-anchored.** `ProjectFortress/tests/ComprisesMeetWalk.fss:18`, the renamed file, from the base's `advanced/overloading.tex:282-307` to `:346-372`, as `ComprisesMeetCompiled.fss` in S's commit. The rewritten `InferLoneBoundWalk.fss` and `XXXInferLoneUnboundedWalk.fss` cite no specification line.

**Recommended rows.**
- The unlisted extender: opened, row 551 (correction 1).
- The lift's overlap reading: opened, row 552 beside row 550, with the test of correction 2.
- A note on row 390 (`SkGenMeetCover`, `SkGenMeetCoverTyped`): appended, in the skeptic's words.
- A note on row 499 (`SkPosBox` after rung W): appended.

**Rung C's walk test owed here.** Rung C's report (section 12) and row 539 ask for a walk expected failure of the POPL 2019 paper's set if rung W's tree still refuses it. It does: under walk on the merged tree, "m[\Q extends Num\](y:Seq[\Q\]) ... and m[\P\](x:ArraySeq[\P\]) ... have parameters with generic type, at least one pair of parameters must have excluding types". `ProjectFortress/tests/XXXOverloadExistentialMeetWalk.fss` is rung C's program with the answers the rules give: "OK Saw expected exception" through `harness-one.sh`, and on a stand-in of two plain declarations on the two objects, "PASS", "Missing expected failure". A first stand-in over `ArraySeq[\String\]` and `ArraySeq[\One\]` was refused at load, "first parameters ... are unrelated": walk applies no instantiation exclusion, row 416, already on the ledger.

**On the merged tree.** Rung W's 16 files in `ProjectFortress/tests/` (its renamed and rewritten ones among them), rung L's two and the gather's three walk tests (W's two above and L's `XXXTypecaseNoMatchWalk.fss`, below), 21 files through `harness-one.sh` in one run on the merged tree of the four rungs, rung L's library included: 11 " OK (time = ...)", 10 "OK Saw expected exception", "OK (21 tests)".

**Folded.**
- `FACTS.md`: the record's three entries after the last entry of "Execution model", with the landing placeholder, the second naming the gather's two expected failures and row 551, the third the eleven classes; the entry "Walk's overload check reads one bound for two generic overloads whose static parameters share a name", which the record replaces (row 478 fixed), moved verbatim to `FACTS-history.md` under "Replaced 2026-09-30, at climb batch 7b's gather (rung W's record)"; "The ledger"'s two citations re-anchored.
- The ledger: rows 478 and 157 `FIXED` with their notes; row 492 `FIXED`, both halves landed (C's `e2f1aa7e8`, W's placeholder), with W's note and correction 1's sentence; notes on rows 491, 159, 516, 496, 499, 504, 21 and 430, the skeptic's on 390 and 499, the gather's on 539; rows 548 to 552 after row 547.
- The handover: one paragraph after S's.
- `PLAN.md`: a sentence on item 32 and five entries in "Climb batch 7b, listed for his review", with gather.2.

**Items for Pavol, as `PLAN.md` holds them:**
- **W.worker.1**, row 159's pairs and the positional keying: a sentence on item 32 ("Before batch 8"), the domain condition that Q4 = (2) names.
- **W.worker.2**, a written static argument on a generic beside a plain declaration: its entry.
- **W.worker.3**, row 549's home the row alone: its entry.
- **W.worker.4**, row 550, the lifted return rule: its entry.
- **W.skeptic.1**, the closure walk trusts and the fallback not taken: its entry, with row 551.
- **C.worker.9**, walk's refusal of the paper's set: its entry, with the gather's test.
- **gather.2**, the checker's verdict carried between compilations (row 547, found at C's fold): its entry.

**Stops.** None met by the worker or the skeptic. The load-time verdicts that moved are the shapes the section names (`O2Z64`, `O2Meet`, rows 478 and 492, `BetweenTwoClosed`), none the other way; the gather's edits change no interpreter source.

**For the gate.** `testSystem`'s file count rises by 16 with W: the rung adds 15 files and deletes 1, and the gather adds 2. Added: `ComprisesCoverReturn`, `ComprisesMeetViaExclusion`, `DispatchConvertedAgain`, `DispatchDeclaredDomain`, `DispatchMeetBesideGeneric`, `DispatchWrittenStaticArgWalk`, `GenericOverloadBoundsApart`, `GenericReturningAny`, `InferLoneBoundWalk`, `XXXComprisesCoverReturnWrong`, `XXXComprisesMeetUncovered`, `XXXDispatchGenericMethodBesidePlain`, `XXXGenericBesidePlainReturnParam`, `XXXGenericBesidePlainReturnRule`, `XXXInferLoneUnboundedWalk`, and the gather's `XXXGenericBesidePlainTwoBounds` and `XXXOverloadExistentialMeetWalk`; `XXXComprisesMeetWalk.fss` is renamed `ComprisesMeetWalk.fss`, and `XXXInferLoneUnionWalk.fss` is deleted, rewritten as `InferLoneBoundWalk.fss` with `XXXInferLoneUnboundedWalk.fss`. Rung W's Java edits need `ant compileAll`.

## Rung L (`rung-overload-families`)

**Inherited from the branch.** Three commits, `65eacfb77` to `4752c2bac`: the walk test alone, failing on the base at `BIG MAX` over total comparisons (`65eacfb77`); the edit (`f6a6fff7a`); the skeptic's judgement, approved with eight required corrections, the stage tables reproduced (`4752c2bac`). `SKEPTIC.md` was on the branch and stands, with the gather's edits below.

**Written at the gather.** `explorations/compile-ladder/rung-overload-families/REPORT.md` (29,628 bytes) and `record.md` (12,168 bytes), each by its `journal-text.py` command; nothing composed. Then the gather's edits below, and an italic note line under the titles of `REPORT.md` and `SKEPTIC.md`.

**Applied.** `git apply --3way --index` of `git diff --binary 811053f15...wip/rung-overload-families`, on top of W's commit, applied without a conflict (one whitespace warning in a captured line of `SKEPTIC.md`); every path matches the branch in the index. No path is shared with an earlier commit.

**Final row numbers.** L's provisional rows 534 to 537 are 553 to 556; its skeptic's first two recommended rows are 557 (the checker's kind-environment crash) and 558 (walk's typecase failure); its third is a note on row 544. They follow row 552. The provisional numbers are corrected in `REPORT.md` and `SKEPTIC.md`; the rung's tests cite no row number.

**Corrections.** The skeptic's eight, made at the gather:
1. Row 555 and `REPORT.md` section 9: the library reaches the join failure today, on the base as on the edit, "Join(__DefaultVector[\ZZ32,2\], __DefaultMatrix[\ZZ32,2,2\]) not a singleton: [AnyAdditiveGroup, Generator[\ZZ32\], Indexed1[\2\]]"; the markers would widen it to every ordered type.
2. D4, the provenance block's deviation line and row 553's note: under walk `openRange` at another index type ends the run with the `ProgramError` "typecase match failure given ()->ZZ64", which `catch e MatchFailure` does not catch, and the compiled path throws `MatchFailure`. The way not taken, `else => throw MatchFailure`, is named with a reason the gather states as its own, since the rung weighed only "something else": written out at this one typecase it would hide row 558 at the one library call that reaches it and leave every other typecase to it, whose repair is the throw at walk's own site (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:1441-1442`).
3. `ProjectFortress/tests/XXXTypecaseNoMatchWalk.fss`, the skeptic's program byte for byte from its candidate directory; row 558 opened. On the merged tree it is an expected failure in the 21-file `harness-one.sh` run of W's section ("OK Saw expected exception").
4. `ProjectFortress/compiler_tests/XXXGenericTraitExcludesKindEnv.fss` with its `.test` on the merged tree: the skeptic's `SkRangeLikeKind` with its component renamed and one comment line, the `.test` a compile the program should pass, pinned by `compile_err_contains=is not in the kind env` (the gather's choice over a bare compile step, so that another failure does not pass for this one). Through `junit.sh`: "I is not in the kind env [][][]", "Saw expected failure"; on a stand-in without the top-level `opr IN`, "Saw failure, but did not satisfy compile_err_contains", "Tests run: 1, Failures: 1". Row 557 opened.
5. `REPORT.md` section 13 carries the record's "What comes back to Pavol" list (each family's device with the way not taken, the `seq` pairs' devices, the two api lines, the counts 75 -> 59 and 624 -> 598, `BIG MIN` and `BIG MAX` restored), and item 22 in plain words: generic code bounded by `StandardMin` or `StandardMax` now takes total comparisons.
6. Row 554's note lists every api header the export message still names as differing, each after the edit: `Condition` (`Library/FortressLibrary.fsi:854` against `.fss:1330`), `Maybe` (`.fsi:916-917` against `.fss:1437-1438`), `ReductionPair`, `ActualReduction.distribute`, `String`'s `extends` clause (`.fsi:2348` against `.fss:4084`), and `List`'s `AnyList` and `List` clauses (`Library/List.fsi:55`, `:67-68` against `Library/List.fss:86`, `:112-113`), each opened on the tree.
7. `REPORT.md` section 7 marks the lines of `compare.sh`'s output it leaves out of the quote: the class rows I1 and G1, the unit rows, the crash rows gone and new, each given in the bullets below it.
8. Row 554 anchors each citation to one tree: `.fsi:1828` and `.fss:3017` at `811053f15` (`PossibleReductionPair`'s headers), `.fsi:1831`, `.fsi:1847`, `.fss:3036`, `.fsi:1828` and `.fss:3013` after the edit (opened: `.fsi:1828` holds `distribute` after the edit).

**Row 556's home, against S's landed text.** The row asks the gather to set its home by rung S's text. S keeps the Meet Rule for Functional Methods, which asks a meet only of a type that provides both declarations, and gives it the covering case per provider (`Specification/advanced/overloading.tex:450-523`). So the checker, which applies the function rule to functional methods, is wrong, and the row's home is 2: `ProjectFortress/compiler_tests/XXXFunctionalMethodMeetPerProvider.fss` with its `.test` (compile, `compile_err_contains=Invalid overloading of toSeq`), the rung's `FnMethodMeet` with its component renamed. Through `junit.sh` on the merged tree, alone and after rung C's coverage tests in one JVM: "Invalid overloading of toSeq in component XXXFunctionalMethodMeetPerProvider", "Saw expected failure"; on a stand-in with one trait, "Saw failure, but did not satisfy compile_err_contains". This is the specification settling a checker defect, not a mismatch between S's text and C's landed tests, since the refusal is the base checker's.

**Recommended rows.**
- The kind-environment crash: opened, row 557, with correction 4's test.
- Walk's typecase failure: opened, row 558, with correction 3's test.
- An object inheriting two functional methods from two open traits with no meet, which walk runs (`SkFnMethodMeet3`): refused as a row of its own, since row 544, opened in C's commit, is the same mechanism (walk does not apply the Meet Rule for Functional Methods in a type that provides both); appended to row 544 as a note, with the skeptic's output and its reason that the expected-failure test is due with the fix.

**Folded.**
- `FACTS.md`: the record's entry after the last entry of "The checker and the one library", its sub-bullets joined into its one line, with the landing placeholder and final row numbers; "The ledger"'s two citations re-anchored.
- The ledger: row 461 `FIXED` with its note; the note on row 478; rows 553 to 558 after row 552, the gather's corrections in rows 553, 554, 555 and 556; the note on row 544.
- The handover: one paragraph after W's.
- `PLAN.md`: two entries in "Climb batch 7b, listed for his review", and a sentence on the "For his review" entry on item 22.

**Items for Pavol, as `PLAN.md` holds them:**
- **L.worker.1 and L.skeptic.1**, the rest of `seq` (row 556): the entry "The rest of the one library's `seq` family"; default the first way, for the checker phase.
- **L.worker.2**, `DelegatedIndexed`'s header: its entry.
- **L.skeptic.2**, `TotalComparison`'s `StandardMinMax` parent: already in `PLAN.md`, "Pavol's answers", "For his review", the entry "Item 22, `TotalComparison` extending `StandardMinMax`, explained in more detail when he has the energy"; a sentence with the plain explanation and its evidence added there, not a new entry.

**Stops.** One, met by the worker and confirmed by the skeptic: "a family whose only repair is a checker change", on `seq`'s `SequentialGenerator`/`FilterGenerator` pair and the component's `MappedGenerator`/`SequentialGenerator` pair; reversible and lifted by POSITIONS 2026-09-27, the stops. The gather's additions meet none.

**For the gate.** `testSystem` gains 3 files for L (the rung's `LibraryOverloadFamilies` and `XXXInferTwoCommonParentsWalk`, and the gather's `XXXTypecaseNoMatchWalk`); the compiler track gains 2 `.test` files (the gather's `XXXFunctionalMethodMeetPerProvider` and `XXXGenericTraitExcludesKindEnv`). On L's tree alone the count stage reads 59 and the distance 598; on the merged tree rung C's two `cond` errors are cleared by L's `PossibleReductionPair` line, and the gate measures the combined total.

## The gather's own points for Pavol

- **gather.1**, the one text mismatch the decisions do not settle: the Meet Rule's closed-trait case for declarations with static parameters, stated by S and refused by C's checker (row 546, `XXXComprisesMeetGenericTrait`, Appendix I's `revival-meet` Effect). S's section.
- **gather.2**, the compiled checker's verdict carried between compilations in one JVM (row 547), which may make a verdict in the gate's one-JVM compiler track depend on its order. C's section.

## For the gate: the run's totals

- `testSystem`: 20 files added and 1 deleted over the four rungs and the gather (W 17 added, its rung's 15 and the gather's 2, and 1 deleted; L 3 added, its rung's 2 and the gather's 1; S none; W's rename keeps its count), so its file count rises by 19; the shards are compared by their sum.
- The compiler track: C's 34 added `.test` files (2 renamed besides), S's gather additions 4, L's gather additions 2: 40 more `.test` files.
- Sources that need `ant compileAll`: C's three Scala files and W's three Java files. The library files (L) are read by the count and distance stages and by walk.
- The specification changed (S's eleven files, the gather's corrections, W's callout correction): the commit stage rebuilds `Specification/fortress.pdf`; the gather's build of the merged tree's text wrote 655 pages with no undefined reference.

## Other writers in the tree during the gather

None seen: `git status --porcelain` was empty at the start and showed only the gather's own untracked rung folders between commits, and no other Fortress process ran on the box during the gather's harness runs (the one unexplained first run of C's pin aside, C's section).
