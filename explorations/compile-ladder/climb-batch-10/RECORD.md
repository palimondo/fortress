# Climb batch 10: the gather's record

Written at the gather stage of climb batch 10 (2026-10-03), the run of `explorations/coordinator/CLIMB-BATCH-10.md` (rungs W, C, G and N), on `main` from the base `9c9e823d5`. `main` was at `f628d8263` when the gather began, 29 coordinator commits above the base, none of them touching `Library/`, `ProjectFortress/` or `Specification/`. All four rungs were approved, and each landed as one commit composed from its branch's net change; no branch is a parent of anything on `main`.

**Preconditions.** `git status --porcelain` was empty, and `9c9e823d5` is an ancestor of `HEAD`.

**Scratch.** The gather's patches and folding helpers are in its scratchpad, not in the tree. To run the tests it added, the gather built one merged tree outside the main tree, as climb batch 9's gather did: a detached worktree at `f628d8263` (`/home/user/fortress-gather10`), seeded from the batch's base build with `seed-worktree.sh`, the four patches applied by `git apply --3way --index` in the order below (no conflict), `ant compileAll` (51 s), `default_repository/caches/global.map` restored, and the library order (`AnyType` to `CompilerSystem`). Each interpreter test the gather added or changed was run there through `explorations/compile-ladder/rung-inference-walk/harness-one.sh`, each compiled test through `explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh`, and each expected failure also on a stand-in that turns it red. No suite, stage or ladder file was run.

## The order the rungs were applied in

N, then G, then W, then C: the ascending order of each rung's lowest edited line in the files two or more rungs share.
- `Library/FortressLibrary.fsi` and `.fss`, G's and N's: N at `.fsi:37` and `.fss:54` (`fail`), G at `.fsi:888` and `.fss:1238` (`__singleton`, `__cond`). So N goes before G.
- `Specification/appendices/changes.tex`, W's and C's: W at `:1016` (the entry "Reductions whose element type nothing fixes"), C at `:1318` (the entry "The traits that extend a closed trait"). So W goes before C.
- Across the two pairs no file is shared, so their relative order moves no line; the gather took the plain ascending order of the four lowest lines, 37, 888, 1016 and 1318.

Every patch applied cleanly; there was no conflict. The two pairs' hunks interleave, so a later rung moved lines that an earlier rung's folded records cite; each was re-anchored by symbol in the later rung's commit, as climb batch 9's gather did in its last commit:
- G's two one-line insertions in `Library/FortressLibrary.fss` (at `:1378` and `:4633` on G's tree) move two lines N's folded records cite: `MatchFailure` (row 590's note) from `:1719` to `:1720`, and `__thrower` (row 638) from `:2439` to `:2440`. N's 17 lines inserted around `assert`, `deny` and `shouldRaise` move every line of G's region by 17: G's folded lines are cited at the merged tree's lines (row 488's eight big operators at `:1617`, `:1632`, `:3295`, `:3325`, `:3332`, `:3432`, `:3507`, `:3527`; row 632's fused arm at `:1332`, `:1342`, `:1338-1341`; `MIMapReduceReduction` at `:3542`), and its base lines stay pinned to `9c9e823d5`.
- C's hunks move lines that W's and N's folded records cite: `OverloadingChecker.scala` by 3 below `:423` (row 617's `:615` and `:584-586` are `:618` and `:587-589`; row 619's `checkBoundAny` `:484-490` is `:487-493`), `STypesUtil.scala` by 7 below `:169` (row 610's `gatherMethods` `:1595-1613` is `:1602-1620`, in the row and in its `PLAN.md` entry), and `ExportChecker.scala` by 2 below `:655` (row 637's `allAbstractsMadePublic` `:744-756` is `:746-758`). C's own records cite the base's `Library/FortressLibrary.fss`, which N and G then moved; they are cited at the merged tree's lines (`__bigOperator`'s `body(i)` `:1304`, `Array2`'s `row(i)` `:2501`, `Array3`'s `:2884-2891`, the `+` sites `:2407`, `:2766`, `:2774`).
- Not re-anchored: citations landed by earlier batches that C's edits move, among them item 38's and row 584's `OverloadingChecker.scala:647-651` (now `:650-654`) and `NodeUtil.java:1460-1477`; each rung's `REPORT.md`, `SKEPTIC.md` and `JUDGE.md` cite its own tree.

## Final row numbers

From 610, in manifest order W, C, G, N, each rung's own provisional rows first and then the rows the gather opened from its skeptics' recommendations. Rows are inserted into section 10 of the ledger in numeric order, so a later commit places its rows above an earlier commit's higher-numbered ones; no row is renumbered or moved.
- W: its provisional W-a to W-e are 610 to 614; the gather's rows from its skeptic are 615 to 619.
- C: its provisional 610 to 616 are 620 to 626.
- G: its provisional 610 to 616 are 627 to 633.
- N: its provisional 610 is G's 610, the same defect (the compiled checker's capture of a method's own static parameter at a method invocation), so both are row 627, opened in N's commit, which landed first, with G's sites appended in G's commit; its 611 to 616 are 634 to 639.

Each rung's `REPORT.md`, `SKEPTIC.md` and `JUDGE.md` (and W's `decision-record.md`) carry the final numbers, with one italic note line under the title saying so; the specification's `row~616` (W's text, added at the gather) is final. No test cites a provisional number.

## The tests the gather added

Each was written in the merged tree, run there, and copied byte for byte into its rung's commit.
- `ProjectFortress/tests/OverloadSingleParamUnbounded.fss`, rewritten (W's correction 1): `OK (time = 330ms)`, `PASS`.
- `ProjectFortress/tests/XXXFunctionalMethodMeetOperator.fss` and `.test` (row 611): 'Vo || 3 = 1' / ' Saw expected failure: loaded and ran, not refused at load'; on a stand-in naming the method `tie`, ' Refused at load as its keys name', red.
- `ProjectFortress/tests/XXXInferAboveTwoBoundsWalk.fss` (row 616): 'Unification error ... Cannot unify Round->ZZ32 ... with T->FortressLibrary.ZZ32 ... abm=T=(BOTTOM,Red)' / ' OK Saw expected exception'; on a stand-in with `both[\Apple\]` written, 'Missing expected failure', red.
- `ProjectFortress/tests/XXXFunctionalMethodMeetObjectExpressionWalk.fss` and `.test` (row 618): 'A' / ' Saw expected failure: loaded and ran, not refused at load'; on a stand-in with a named `object Zo extends { A, B }`, 'Invalid overloading of pick in Zo ...' / ' Refused at load as its keys name', red.
- `ProjectFortress/tests/FunctionalMethodOverrideOtherPathWalk.fss` and `.test` (row 615, home 3): ' OK Saw expected refusal at load'.
- The five interpreter files together: `harness-one.sh $PWD/tmp/gather/h1 <the five, with their .test files>`, `OK (5 tests)`; the three stand-ins, `Tests run: 3,  Failures: 3`.
- `ProjectFortress/compiler_tests/XXXOverrideFunctionalMethodWiden` (row 610): 'Invalid overloading of f in trait B: (A, ZZ32)->String ... and (B, Number)->String' and the same for `g` / ' Saw expected failure'; on a stand-in whose `A` declares no `f`, 'Saw wrong failure', red.
- `ProjectFortress/compiler_tests/XXXFunctionalMethodMeetCoverWithoutSelf` (row 617): 'Invalid overloading of mark in trait Pq: (P, A)->ZZ32 ... and (Q, B)->ZZ32' / ' Saw expected failure'; on a stand-in whose `Pq` extends `P` alone, 'Saw wrong failure', red.
- `ProjectFortress/compiler_tests/OverloadDottedSingleParamBoundAnyLink.test` and `XXXOverloadDottedSingleParamBoundAny` (row 619, the two-file form): the link 'OK (1 test)'; the run 'Ob.m(3) =  1', 'REACHED', 'java.lang.ClassCastException' / 'Saw expected failure (Exit code != 0)'; on a stand-in whose generic method is named `m1`, 'Did not see expected failure', red.
- `ProjectFortress/compiler_tests/XXXMethodStaticArgReceiverSameName` (row 627, rung G's text): 'Could not check method invocation Gen[\G\].mp - [\P[\T,G\]\]P[\T,G\]->P[\T,G\]->Gen[\P[\T,G\]\] is not applicable to an argument of type G->P[\T,G\].' / ' Saw expected failure'; on a stand-in with `pair`'s parameter named `F`, 'Saw wrong failure', red. The merged checker, with rung C's edit, still refuses the program, so the test is an expected failure and not promoted.
- `ProjectFortress/compiler_tests/XXXExportPrivateAbstractMember` with `XXXExportPrivateAbstractMemberApi.fsi` and `.fss` (row 637, rung N's text): 'due to Asbtract method scaled @ .../XXXExportPrivateAbstractMemberApi.fss:7:5-8:1 is not declared in the API' / ' Saw expected failure'; on a stand-in with no private member, 'Saw wrong failure', red.

## Rung N (`rung-number-order-slips`), landed first

**Inherited from the branch.** Eight commits, `4ddd54070` (the first promoted test alone) to `d3c34c40d` (the repair round's library edit). The branch carries none of the rung's files.

**Applied.** No conflict; every path matches the branch.

**Written from the journal.** `REPORT.md` and `record.md` (`reportText` and `recordText` of `rung:N resume:N repair:N`), `SKEPTIC.md` (the "SKEPTIC.md" command, `skepticText` of `skeptic2:N` with `skeptic:N` under "## First round"; the branch does not carry the file, so the command for a carried one was not run), and `JUDGE.md`, from the `ruling` field of `judge:N`, whose text says it is "the ruling's full text, for the gather to write" as `JUDGE.md`; no command in the brief names it, and the gather ran `journal-text.py` on that field the same way. `record.md` was folded and is not landed.

**Corrections.** All seven were made by the repair round and confirmed by the second judgement; the gather checked each in its file: the two test messages of `NumberOrderListDeclarations.fss` (no citation for `simplestRationalBetween` or the pairs; `subsection "Comparisons Operators"` for the lists); the provenance line citing `distance-sites.tsv:253` for `Writer.fss:34` and the record's list for the 60 sites; "seven times in `Library/`" with the three live test sites (section 3, row 638); the stop listed as met for the three repairs, the other reading withdrawn, and `catch e CheckedException` named (sections 7 and 9); rows 561 and 563 named beside row 627 (section 5); the `ForbiddenException` decision rewritten (section 9).

**Recommended rows.**
- Row 610 (the method-invocation capture): opened as row 627, the row rung G's 610 shares, with rung G's expected-failure test (above); rung N's own test text, `XXXMethodStaticParamCallerSameName`, is refused as a duplicate of one defect, rung G's key having been shown both ways by its skeptic.
- Row 615 (the bare `throw ForbiddenException`): refused as a new row, since the record opens it, row 638.
- The test-machinery row: refused as a new row, since the record opens it, row 639.

**Folded.** One FACTS entry under "The checker and the one library", and a sentence on the entry "The written bound `Object` on the three result-only parameters ..." saying that it no longer holds and where the present is. Ledger: rows 590, 602, 345, 439 and 469 FIXED; row 560's first part FIXED in its status; notes on 560, 590, 602, 345, 439, 469, 425, 438, 445, 577, 488, 604, 605; rows 627 and 634 to 639. The handover paragraph. `PLAN.md`: items 43 and 44 under a new group "Before the switch-over, raised by climb batch 10"; a new section "Climb batch 10, listed for his review" under "Off the path, parked", with five entries.

**Items for Pavol.** N.worker.4: item 43. N.worker.5: item 44. N.worker.1, N.judge.1: the entry on the stop met by three repairs. N.worker.2, N.judge.2: the `shouldRaise` entry. N.worker.3, N.judge.3: the entry on no stage rerun. N.worker.6: the existing entry "Raised by climb batch 6's rung T, the number chapters" (the negative power, row 441), not written again. N.worker.7: the entry on the expected-failure tests placed at the gather. N.worker.8: the Part IV entry.

## Rung G (`rung-generator-slips`)

**Inherited from the branch.** Seven commits, `bb9e71cda` (the test alone) to `ba6448520` (the second judgement). The branch carries `record.md`, `SKEPTIC.md` (both rounds) and `JUDGE.md`.

**Applied.** No conflict; the two shared library files hold N's lines and G's.

**Written from the journal.** `REPORT.md` (`reportText` of `rung:G resume:G repair:G`). `record.md` was folded and is not landed.

**Corrections.** All three were made by the repair round and confirmed by the second judgement; the gather checked each in `REPORT.md`: six walk stops, `FilterGenerator2.theorems` with its base error and the new assertion's passing harness run (sections 4, 7, 10, 12); `MIMapReduceReduction`'s changed value named under the stop and the withdrawn sentence gone (section 7); the getter sibling count, none in the rung's sections and three outside (section 5).

**Recommended rows.**
- Row 610's expected-failure test: placed, `ProjectFortress/compiler_tests/XXXMethodStaticArgReceiverSameName`, with row 627 in N's commit (the row N's commit opened); shown through `junit.sh` on the merged tree with rung C's checker, which still refuses the program.
- The getter invoked with `()`: refused as a new row, since the record opens it, row 633.
- Row 433's note on walk's desugaring and `__bigOperator2`: appended, in the record's words with the skeptic's two emitting lines (`PreTypeCheckDesugaringVisitor.java:181`, `:392`).
- `__whileCond` missing from the compiled prelude: refused as a new row; it is row 463's `while` form, appended to row 463 as the record asks.

**Folded.** One FACTS entry under "The checker and the one library", and an italic sentence appended to "The true distance to the switch-over". Ledger: notes on 488, 424, 433, 463, 577 and 627; rows 628 to 633. The handover paragraph. `PLAN.md`: items 45 and 46; six entries in the batch's section.

**Items for Pavol.** G.worker.4: item 45. G.worker.7, G.skeptic.2, G.skeptic2.2, G.judge.2: item 46. G.worker.1, G.skeptic.1, G.skeptic2.1, G.judge.1: the entry on the walk-value stop. G.worker.2: the entry on the tests placed at the gather. G.worker.3: the row 628 entry. G.worker.5: row 630. G.worker.6: row 631. G.worker.8: row 633. G.worker.9: the row 488 entry.

## Rung W (`rung-walk-meet`)

**Inherited from the branch.** Five commits, `d365bbd06` (the tests alone) to `52228e181` (the skeptic's judgement). The branch carries `record.md`, `SKEPTIC.md` and `decision-record.md`; the skeptic approved with six required corrections, and there was no repair round.

**Applied.** No conflict; `Specification/appendices/changes.tex` takes C's hunks after.

**Written from the journal.** `REPORT.md` (`reportText` of `rung:W resume:W repair:W`). `record.md` was folded and is not landed.

**Corrections** (the skeptic's six, all made at the gather):
1. `ProjectFortress/tests/OverloadSingleParamUnbounded.fss`: the two-argument calls take `a: ZZ32 = 3` and `b: ZZ32 = 4`, `f(a, b)` and `g(a, b)`, each message citing `basic/overloading.tex`, section "Overloading Resolution"; walk, the compiled path and the coercion order agree on 2 and 4. Run on the merged tree, `PASS`.
2. `Specification/appendices/changes.tex`, "Passages not yet revised": the sentence "The box of \secref{reduction-expr} still says that the compiled type checker takes BottomType ..." is removed, the reductions callout having been revised.
3. `REPORT.md` section 2 cites the team's object-level check, `Constructor.java:358-367` in `Constructor.finishInitializing`, says what it refuses and misses, and says that the rung gave no reason for not extending it, with the gather's reading of why it could not serve; marked as corrected at the gather.
4. `Specification/basic/inference.tex` (the interpreter's box) and the entry "The inference of a call's static arguments" in `changes.tex`, its change paragraph and its Effect: a call whose arguments place two upper bounds walk cannot meet on a type parameter bounded only from above fails with an error of unification (row 616).
5. `REPORT.md` sections 5.2, 6 and 11 name the compiled checker's refusal of `FunctionalMethodMeetProvided` at `Pq` and its cause, the cover counting self (`OverloadingChecker.scala:615` against `:584-586` on the rung's tree), beside row 610; row 617.
6. `REPORT.md` section 7 and the folded row give row 611 home 2, `tests/XXXFunctionalMethodMeetOperator.fss`.

The record's row W-a asked for a compiled expected failure in `compiler_tests/` as a link test with `run_out_contains=f PASS`; `disp0`'s program does not compile today, so a link test would be red, and the gather keyed it on the refusal instead, `XXXOverrideFunctionalMethodWiden` (a decision: the refusal is what holds until the checker reads provides by the chapter, and the test goes red the day it does). The run showed that the checker also refuses the dotted override `g`, which row 610 now says.

**Recommended rows.**
- The diamond override (`SkDiamondOverride`): opened, row 615, home 3, `tests/FunctionalMethodOverrideOtherPathWalk.fss`.
- Row W-b at home 2: not a new row; row 611 gets its test, `tests/XXXFunctionalMethodMeetOperator.fss`.
- Two upper bounds walk cannot meet (`SkAbove`): opened, row 616, home 2, `tests/XXXInferAboveTwoBoundsWalk.fss`.
- The compiled cover counting self: opened, row 617, home 2, `compiler_tests/XXXFunctionalMethodMeetCoverWithoutSelf`.
- Walk's object expression: opened, row 618, home 2, `tests/XXXFunctionalMethodMeetObjectExpressionWalk.fss`; walk's half of row 570.
- The dotted method with `Any` written (`SkAnyDotted`): opened, row 619, home 2 in the two-file form.

**Folded.** One FACTS entry under "Landed semantics". Ledger: rows 544, 534 and 588 FIXED; notes on 544, 534, 588, 425, 591 and 584; rows 610 to 619. The handover paragraph. `PLAN.md`: a sentence on item 38 and one on the existing D5 entry; six entries in the batch's section. The pipes in rows 611, 628 and 636 are escaped for the table.

**Items for Pavol.** W.worker.1: item 38 (with row 611 appended). W.worker.2: the entry on the checker's per-provider rule (rows 610 and 617). W.worker.3: row 614. W.worker.4: the existing entry "D5's reach, climb batch 9's rung W" (row 613 appended). W.worker.5: decision W2. W.worker.6: what walk's check does not reach (row 618). W.skeptic.1: the reading of "overridden" (row 615). W.skeptic.2: the numeral departure and the rewritten test.

## Rung C (`rung-checker-defects`), landed last

**Inherited from the branch.** Thirteen commits, `4d8cc0c7a` (the tests alone) to `3f014eb43` (the second judgement): the first pass to `4d19d17a1`, the first skeptic's refusal (`730a8ccf1`), the judge's ruling (`8b1daf2f9`), the repair round (`76dda233a` to `f300bf7e1`). The branch carries `record.md`, `SKEPTIC.md` (both rounds) and `JUDGE.md`.

**Applied.** No conflict; `Specification/appendices/changes.tex` holds W's entries and C's.

**Written from the journal.** `REPORT.md` (`reportText` of `rung:C resume:C repair:C`). `record.md` was folded and is not landed.

**Corrections.** The first seven were the first judgement's, made by the repair round and checked by the gather: the provenance line's `XXXInferDependentBound.fss:20`; `XXXVarargsBodyIterates` named as added with `eb9161c30` and never run on the base (section 3); the binding held by the refusal tests, since the refusal's condition is the binding's type (section 3); row 625 with `XXXInheritedAbstractMethodBoundSameName`; row 624's method case with `XXXVarargsMethodCodeGeneration`; rows 620 to 622 citing row 405 and quoting the third form; the box and the Effect saying "every use ... in a body, a contract or a function expression", which the `VarRef` rule makes true. The second judgement's two: the REPORT's section 9 already cites `TypeDisambiguator.java:376-380`; the binding is cited at `STypeEnv.scala:184-186` in `REPORT.md` and in row 604's note (the `filesChanged` field is not landed).

**Recommended rows.** All four were opened by the repair round, so none is a new row: row 563's bound sibling is row 625; row 614's method case is in row 624; the typecase crash is row 626; the third crash form is in row 620.

**Also corrected.** The two lines of `explorations/coordinator/map/spec-to-implementation.md` that the REPORT names as stale (`:212`, `:446`): the compiled checker's varargs handling is now read and repaired, and code generation is row 624.

**Folded.** One FACTS entry under "The checker and the one library", and sentences appended to "The compiled checker instantiates a type parameter that nothing at a call fixes ..." and "The true distance to the switch-over". Ledger: rows 563, 593, 604, 605 and 574 FIXED; notes on 563, 561, 593, 604, 605, 574, 597 and 405; rows 620 to 626. The handover paragraph. `PLAN.md`: item 47; six entries in the batch's section and a sentence on the row 488 entry.

**Items for Pavol.** C.worker.4, C.skeptic.1, C.judge.4: item 47. C.worker.1, C.worker.2, C.skeptic.2, C.judge.1, C.judge.2: the entry on the varargs refusal under the compiled library. C.worker.6: the varargs type entry. C.worker.3, C.judge.3: row 625. C.worker.5, C.judge.5: row 597's checker half. C.worker.7: the files beyond the list. C.worker.8, C.judge.6: the row 488 entry. C.worker.9: row 626.

## Text mismatches between rungs

None found. W's reductions callout says the compiled checker takes the bound of a big operator's static parameter and finds no applicable instance for an F-bounded one; C's solver change takes a bound that mentions another variable at that variable's solution and still leaves a self-mentioning bound out (`Formula.scala:561-583`), so the callout holds. C's box on varargs and its two Appendix I entries describe the compiled checker and say the interpreter is unchanged, which W's walk edit leaves true. G's and N's edits are library declarations with no normative text beyond Part IV, which the commit stage renders.

## The rungs that did not land

None.
