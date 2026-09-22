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
