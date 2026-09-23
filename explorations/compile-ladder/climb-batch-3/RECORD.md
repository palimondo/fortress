# Climb batch 3: the gather's record

Written at the gather stage of climb batch 3 (2026-09-22), on `main` from the base `d610695c0`. Five rungs landed as one composed commit each, none of whose branches is a parent of anything on `main`; rung P stopped and lands no source (section "Not landed").

## The order the rungs were applied in

L, C, R, S, M. The rule is ascending order of each rung's lowest edited line in the files two or more landing rungs share. With P not landing, M no longer shares `TypeAnalyzer.scala` with anyone, and the one shared file is `Library/FortressLibrary.fsi`: L's lowest hunk there is `:373` (`trait QQ`'s `comprises`, edited in place), C's is its insertion after `:409` (the closure's comment), so L goes first. R, S and M share no file with any landing rung, and follow in manifest order. The two rungs' hunks interleave (C also inserts after `.fsi:1659`, `:2539` and `:2542`, and edits `FortressLibrary.fss`, which L's record cites), so no order leaves both records' line numbers in place: C's commit re-anchors, by symbol, every citation of L's landed record that C's insertions moved, and C's own `.fsi` citations below L's four-line deletion at base `:2311-2314`.

## Rung L (`rung-library-defects`)

**The gate declaration, a decision for Pavol.** L's branch reads 103 on the checker-count stage; the manifest declares 102 (`explorations/coordinator/CLIMB-BATCH-3.md:61`, and the `MANIFEST` block of `explorations/coordinator/climb-batch-workflow.js`). The difference is `trait QQ … comprises { AnyIntegral, ... }`, which `Specification/basic/components/source-code.tex:372-392` and the export check (`ExportChecker.scala:721-735`) require, against the record's `comprises { AnyIntegral }`. The gather does not edit the running manifest, so the gate's checker stage will compare 103 against the declared 102 and print red on this rung's own count; nothing else about the count moved (rung P stopped, rung M changes no count). Pavol's choice: declare 103 and keep the specification's clause, or take the record's clause and 102.

**`REPORT.md` is not written.** The worker and the skeptic returned their reports as structured results because the harness refuses a report file from a subagent, and it refuses the gather the same file name. `record.md` was composed at the gather with the skeptic's corrections applied and opens with the five-line provenance block; the report is owed to the coordinator, from run `wf_776d7c2c-6c3`'s `rung:L` and `skeptic:L` results.

**Recommended rows, each opened or refused:**
- `FlatString`'s and `EmptyString`'s `split`/`splitWithOffsets` return types: opened as row 356, with `explorations/compile-ladder/rung-library-defects/probes/skeptic/SkepticLsplit.fss` and its two walk captures.
- `IntMap.fsi`'s free `comprises` extended by `NonEmptyIntMap` in the same api: opened as its own row, 357, rather than appended to row 354, because the defect is the library's and row 354 is the checker's; the row cites 354 as what then refuses the repaired form. The skeptic's `IntMap.fsi:18-20` is `:19-21` in the tree and is cited so.
- `RangeInternals.fss`'s eleven declarations and the public factories keeping the old bounds: opened as row 358, with `explorations/compile-ladder/rung-library-defects/probes/skeptic/bound-mismatch/`.

## Rung C (`rung-library-comments`)

**Line numbers.** C's insertions moved lines L's landed record cites; they were re-anchored by symbol in C's commit: `Condition.map` in the component `Library/FortressLibrary.fss:1227` → `:1228` and `ivmap` `:1229` → `:1230`, `ZeroIndexed.zip` `:1721-1722` → `:1722-1723`, `trait String` `:3958-4103` → `:3965-4110`, the public range factories `:3816-3874` → `:3823-3881`; in the `.fsi`, `Condition.map` `:789` → `:790`, `ivmap` `:790` → `:791`, `String`'s abstract pair `:2323-2324` → `:2330-2331` (L's `record.md` and ledger rows 356 and 358). L's four-line deletion moved C's `.fsi` scalar-block citations down four (`:2547-2552` → `:2543-2548`, `:2556-2558` → `:2552-2554`), re-anchored in C's `REPORT.md` and `record.md`.

**Corrections.** The first judgement's six were made by the repair round and are verified in the tree: comment 2 no longer says "a number or" (in neither library file), the report gives the measured cold rejection and warm mask of row 341's check and says the gated run met a warm cache, the provenance lines cite `opr-overview.tex:143-147` and option B at `library-findings-explained.md:193`, D1 shows its grep, and the record's first FACTS line follows the new text and names the suite rule. At the gather: the provenance spec line and section 4 item 1 of `REPORT.md` cite `Specification/basic/traits.tex:259-275` and `types-vals-vars.tex:549-570`, with `traits.tex:231-235` named as a `\note` a release build suppresses (`Specification/fortress/fortress.tex:35-37`); `ProjectFortress/library_tests/TryAtomicRungB.fss:42` now cites `Library/FortressLibrary.fss:1571`, `TryAtomicFailure`'s `asString` getter; and row 49's argument-position form has its home 2, `ProjectFortress/tests/XXXArrayLiteralArgRungC.fss`, an expected failure today that reports `Missing expected failure` once the literal is bound to a declared type (`explorations/compile-ladder/rung-library-comments/probes/gather/row49-xxx-harness.txt`). It adds one file to `testSystem`; an interpreter test has no `.test` file.

**Provisional row 354 is row 359.** Renumbered in C's `record.md` and `REPORT.md`; `SKEPTIC.md` and `JUDGE.md` keep their text and carry a one-line note of the renumbering.

**Recommended rows, each opened or refused:**
- The warm-cache mask hiding the removal of `Array3`'s `AnyAdditiveGroup` exclusion from `ArrayOperatorsBesideLibrary`: opened as an append to row 341, the repair round's first note there.
- The generic scalar block holding the (number, `Array3`) slot against a user pair: opened as an append to row 341, the repair round's second note there.
- The unchecked exclusion against the library's own `excludes` clauses, which the compile path's checker does refuse: opened as an append to row 293.

## Rung R (`rung-round-half-even`)

**Corrections.** The first skeptic's four were made by the repair round and are verified in the tree: the row-329 note's evidence paths are written in full, the FACTS line's saturation wording is the corrected one, `REPORT.md`'s specification section gives the split by operand (a numeral settled by `literals.tex:162-163` with `numbers.tex:470-472`, a `Float` or `RR32` value by the decision at `POSITIONS.md:49`) with `literals.tex:162-163` in the provenance block, and the precedent section cites `b70ed4590` on `main`. The second skeptic's one, made at the gather in `record.md`'s row 360 and in `REPORT.md`'s fork: the four measured values candidate (a) does not reach (`round(-2.50000000000000001)`, `round(-0.50000000000000001)`, `round(2.5 + 0.00000000000000001)`, the binary near tie; `probes/skeptic/Sk2NegNumeral.txt`, `probes/skeptic/Sk2Radix.txt`), the sentence under (a) that its gate would flip without the row closing, the two further `walk` answers rung R moved away from the specification, and "prints its own digits" narrowed to a radix-ten numeral.

**Provisional row 354 is row 360.** R's `REPORT.md` never used the number; `record.md` is renumbered, and `SKEPTIC.md` and `JUDGE.md` carry a one-line note.

**Suite arithmetic.** R's two test files plus the radix-ten gate placed at the gather, S's `XXXInferredStaticArgRungS.fss` and C's row-49 test take `testSystem` from 384 to 389.

**Recommended rows, each opened or refused:**
- The first skeptic's near-tie numeral row: opened as row 360, the rung's own record row (with the second skeptic's correction applied).
- A, `walk`'s `NumberFormatException` on `2.5_10`: opened as row 361, and its proposed gate placed as `ProjectFortress/tests/XXXRadixTenPointNumeral.fss` with the comment line pointed at R's `REPORT.md`; it is an expected failure today and goes red when the numerals are written without `_10` (`explorations/compile-ladder/rung-round-half-even/probes/gather/radix-ten-xxx-harness.txt`).
- B, the compiled path's `NullPointerException` rendering a floating-point numeral: opened as row 362, home 3 because the prose is silent on a numeral's rendering.

## Rung S (`rung-default-rendering`)

**Corrections.** The first skeptic's five were made by the repair round and are verified in the tree: `defaultAsString` keeps the Java rendering of `FRR32` and `FStringVector` and `DefaultRenderRungS.fss:37,41` assert `1.5` and `[a b ]`; the "identical to walk" claim is narrowed to static arguments written out; the reverse count (2 of 17 value classes) is in the precedent search; the provenance block has one deviation line; `asExprString` is measured and recorded with row 363. The second skeptic's two, at the gather: its proposed pair is landed byte-identical as `ProjectFortress/compiler_tests/XXXFortToStringRungS.fss`, `XXXFortToStringRungS.test` and `FortToStringRungSLink.test`, and run from `ProjectFortress/` on the merged tree after `ant compileAll` and a library-order rebuild of the prelude: link `OK`, run `Saw expected failure`, and `DefaultRenderRungS` still `OK (2 tests)` (`explorations/compile-ladder/rung-default-rendering/probes/gather/fort-tostring-xxx.txt`); the gate expectation in `REPORT.md` and `record.md` is `testFast` +13 junit tests from 12 `.test` files. Row 321's open case is written into the FACTS line's headline, the row-321 note ("Repaired … except for one case"), the handover line and `REPORT.md` (the premise of "Unchanged on purpose" restricted to the Java descriptor `()Ljava/lang/String;` with the reason, a home-2 item 13 in "Defects and their homes", its repair in "What is not done").

**Provisional rows 354-359 are rows 363-368**, in order; renumbered in `record.md` and `REPORT.md`, noted in `SKEPTIC.md` and `JUDGE.md`. No test cites them.

**R's citations moved by S.** S adds one import line at `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:283`, so R's landed `CompilerBuiltin.fss` citations were re-anchored in S's commit (`:455` → `:456`, `:927` → `:928`, `:982` → `:983`, `:988` → `:989`, `:991` → `:992`, `:991-994` → `:992-995`; R's `REPORT.md`, `record.md` and ledger rows 360 and 362). Row 362's open question — whether S's new default reaches a numeral's null `asString` — was measured on the merged tree after S: it does not, `println(2.5)` throws the same `NullPointerException` (`explorations/compile-ladder/rung-round-half-even/probes/gather/numeral-print-after-S.txt`), and the row now says so.

**Recommended rows, each opened or refused:**
- First skeptic, `asExprString`'s divergence: opened, in row 363 (the rung's record carries it as part of the `asDebugString` row).
- First skeptic, walk's inferred static argument from the run-time class: opened as row 364, gated by `tests/XXXInferredStaticArgRungS.fss`.
- First skeptic, the `VerifyError` of a union-typed return: opened as row 365, gated by `compiler_tests/XXXUnionReturnRungS`.
- First skeptic, an `opr` static parameter that cannot be instantiated: opened as row 366, gated by `compiler_tests/XXXOprParamRungS`.
- First skeptic, a written-out `nat` argument failing at run time: opened as an append to row 307, gated by `compiler_tests/XXXNatArgRungS`.
- Second skeptic, the `toString`-member overflow ("provisional row 360, or an addition to row 321"): opened as the addition to row 321, because its correction 2 already makes row 321 name the case and the gated test's messages cite row 321.
- Second skeptic, walk's tuple separator: opened as row 369. The specification settles it (`basic-lib/objects.tex:161-188`), so home 2 is owed; no gate was proposed with the recommendation, and the gather did not author one (below).

## Rung M (`rung-analyzer-memo`)

**Corrections.** The first skeptic's three were made by the repair round and are verified in the tree: the provenance problem line cites the lambda at `:756`; the prelude count reads "462 class files (556 files with the 94 `.xlation` files)" in `REPORT.md`, `record.md`'s FACTS line and an annotation at `probes/differential.txt:55`, with the analyzed cache restated as the 15 files the skeptic's rebuild enumerated; the "Names added" paragraph cites the field at `IntNat.java:57` and the fourteen files. The second skeptic's one, at the gather: `REPORT.md`'s soundness paragraph ("Nothing else can differ") and row 370's note now name the parenthesized flag beside the span, since `TypeInfo.equals` and `generateHashCode` (`ProjectFortress/src/com/sun/fortress/nodes/TypeInfo.java:58-72`, `:81-87`) leave out the `_parenthesized` field inherited from `ParenthesizedInfo` (`nodes/ParenthesizedInfo.java:24`), and state the conclusion for both.

**Provisional rows 354-357 are rows 370-373**; renumbered in `record.md` and `REPORT.md`, noted in `SKEPTIC.md` and `JUDGE.md`. Row 370's placeholder `<commit>` is written as `<short hash>`, the commit stage's.

**Recommended rows, each opened or refused:**
- A, `excludes` never checked against an `extends` clause under walk: opened as row 371 (a new row, as the rung's record chose, rather than an append to row 22, which is about `comprises`), with a cross-reference to row 293's note from rung C's second skeptic, which measured the same unchecked exclusion against the library's own clauses.
- B, a cyclic trait hierarchy overflowing walk's stack: opened as row 372.
- The second skeptic's generic-overloading row (its provisional 357): opened as row 373, appended to the ledger's last table with the batch's other rows rather than placed beside row 159 in section 4.

## Rows owed a gated test and not given one here

The shared prefix's second home asks a gated expected-failure test of every deferred defect the specification settles. The gather placed the three whose test was required by a correction or proposed and verified by a skeptic (`tests/XXXArrayLiteralArgRungC.fss` for row 49, `tests/XXXRadixTenPointNumeral.fss` for row 361, `compiler_tests/XXXFortToStringRungS` for row 321's open case). It authored none for rows 356 (`split`'s return types), 369 (walk's tuple separator) and the specification-settled rows whose skeptics proposed no test; each such row says its home 2 is owed. That is a decision: the alternative was to write and verify new tests at the gather, which would put unreviewed tests in front of the gate.

## Not landed

### Rung P (`rung-exclusion-relax`): stopped

**Why it did not land.** The worker stopped and the judge on the session's model ruled stop (`explorations/compile-ladder/rung-exclusion-relax/JUDGE.md`, commit `ce08cbad6` on `wip/rung-exclusion-relax`). Relaxing `checkP` in any placement lets `explorations/compile-ladder/rung-exclusion-relax/probes/ProbeMIEPick.fss` type-check and die with `IncompatibleClassChangeError` (`explorations/compile-ladder/rung-exclusion-relax/probes/probe-matrix.txt:67`, `:89`, `:111`), because the Return Type Rule check trusts the one instantiation that multiple instantiation exclusion guaranteed (`OverloadingOracle.scala:88-95`; `Papers/Types/journal/justificationOfRTR.tex:457-459`). The specification is not silent: it allows multiple instantiation inheritance (`Specification/basic/types-vals-vars.tex:184-189`; `Specification/basic/trait-parameters.tex:359-367`, `:383-397`) and forbids overloads with differing static parameters (`Specification/basic/overloading.tex:100-108`). The closure the compiled path needs is that sentence or a sub-rule of it, and the sentence is triage decision (b), reserved to Pavol by the batch record (`explorations/coordinator/CLIMB-BATCH-3.md:18`). The judge corrected the worker's framing: "keep the rule" is not a live candidate (against the specification and `POSITIONS.md:45`), and "enforce the sentence" over-states what soundness needs; the fork put to Pavol has four candidates with costs and a recommendation (the hole's exact sub-rule, after one codegen probe on where generic overloads are instantiated). Batch consequence: no checker change lands, and the merged checker count is L's, not 23.

**What reached `main` already.** The coordinator landed the fork's ground before this gather: `7f9ad71e6` (the FACTS line on multiple instantiation exclusion, citing P's report on its branch), `b0789fc43` (`explorations/reviews/multiple-instantiation-exclusion.md`) and `5c1defe40` (the dispatch and route-C measurements, `explorations/reviews/mie-probes/`).

**Its skeptic.** None: the rung went from the worker's stop to the judge, so there is no `SKEPTIC.md` and no skeptic finding.

**Recommended rows.** None were made.

**Taken from its branch, one path at a time:** `REPORT.md`, `record.md`, `JUDGE.md` (the reason names it), and the two probes the reason cites, `probes/ProbeMIEPick.fss` and `probes/probe-matrix.txt`. Not taken: its source, `ProjectFortress/compiler_tests/XXXExclusionRelaxRungP.fss` and `.test`, which the judge ruled "stays on the branch"; the rest of its probes, which its report cites and which stay on `wip/rung-exclusion-relax`.

**Not folded, and why.** P's `record.md` proposes two FACTS lines, a new ledger row on the multiple-instantiation trade-off and a note to row 97. They are not folded: the rung did not land, the coordinator's FACTS line `7f9ad71e6` already carries the finding with the later dispatch measurements, and the row's content is the fork now before Pavol, which the coordinator opens with his decision.
