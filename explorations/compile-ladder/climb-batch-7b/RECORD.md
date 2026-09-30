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
