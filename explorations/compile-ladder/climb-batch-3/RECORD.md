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
