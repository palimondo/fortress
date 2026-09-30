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
