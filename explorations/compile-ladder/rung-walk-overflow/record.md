# Rung O (rung-walk-overflow): record lines for the gather

At the gather of climb batch 4 the judge's two changes "for the fold" were made here (`JUDGE.md` section 6): the wraparound multiplication is written ⨰ (`DOTTIMES`), and row 379's note says that keeping `walk` wrapping postpones the library's repair. The library's reliance on wrapping is opened as its own row, 403, on the judge's recommendation (`explorations/compile-ladder/climb-batch-4/RECORD.md`, "Not landed").

The rung stopped on its count (11, not zero). Pavol decides whether and how row 379's walk half goes ahead (`explorations/coordinator/POSITIONS.md:88`). Nothing here closes a row.

## FACTS.md

One line, for the section on the checker and the one library, after the interpreter's integer rules:

- **Under `walk`, the library and five of the team's tests rely on fixed-width wrapping, so the ten natives' overflow check of row 379 cannot land alone.** With the ten natives raising `IntegerOverflow` (`compile-ladder/rung-walk-overflow/natives.patch`, batch 3.5's deliberate fix, applied only in a shadow), 11 of the 393 files of `ProjectFortress/tests/` go from exit 0 to an uncaught `IntegerOverflow`. They are `HeapTest`, `IntMapTest`, `QuickCheckTest`, `RandomTest`, `RangePrototype`, `ReflectiveQuickCheckTest`, `intPrim`, `longPrim`, `setSum`, `simpleSum` and `zeno`. A logging pass shows these same 11, and no other file, meet an overflow at all. The library sites measured:
  - the parallel range split `split-1` when a `ZZ32` range straddles zero (`Library/RangeInternals.fss:1031`, `:1201`; three more by reading at `:1046`, `:1221`, `:1242`);
  - `LinearCongruential`'s `mult widen(state)` under `QuickCheck` (`Library/Random.fss:235`);
  - `ChunkedSparseArray`'s `mask-1` at bit 63 (`Library/ChunkedSparseArray.fss:76`);
  - `IntMap`'s `keySplit` `(-p)` (`Library/IntMap.fss:676`).

  `intPrim.fss:21-22` and `longPrim.fss:21-22` assert the wrap itself, and `HeapTest.fss:95-99`, `QuickCheckTest.fss:89-90` and `ReflectiveQuickCheckTest.fss:16-17` depend on it. Row 146's shape reaches one of the eleven, `longPrim` (`a: ZZ64 = 0` holds an `Int`). The specification's spellings for code that means to wrap (∔, ∸, ⨰ (`DOTTIMES`), `Specification/basic/operators/opr-overview.tex:172-176`, `:205-209`) are not declared in the interpreter's library (row 348) (`compile-ladder/rung-walk-overflow/REPORT.md`, `count-compare.txt`, `probes/overflow-probe-summary.txt`).

## Ledger

**Row 379: append to its notes** (do not close):

> Batch 4's rung O measured the count first and stopped on it, 2026-09-26 (`compile-ladder/rung-walk-overflow/REPORT.md`). With the ten natives raising `IntegerOverflow` (`natives.patch`, in a shadow; the source is unchanged), 11 of the 393 files of `ProjectFortress/tests/` change, each from exit 0 to an uncaught `IntegerOverflow` that neither of two base runs shows: `HeapTest`, `IntMapTest`, `QuickCheckTest`, `RandomTest`, `RangePrototype`, `ReflectiveQuickCheckTest`, `intPrim`, `longPrim`, `setSum`, `simpleSum`, `zeno` (`count-compare.txt`; outputs in `probes/count/`). A pass with natives that log each overflow and still wrap finds these 11 and no other (`probes/overflow-probe-summary.txt`).
>
> The cause is code that relies on wrapping. In the library, the range split `split-1` when bounds straddle zero (`Library/RangeInternals.fss:1031`, `:1201` measured; `:1046`, `:1221`, `:1242` by reading, and each `(lo BITXOR hi)+1` at the maximum), `LinearCongruential` (`Library/Random.fss:235`, and `:241` by reading), `ChunkedSparseArray.secondaryIndex` (`Library/ChunkedSparseArray.fss:76`) and `IntMap.keySplit` (`Library/IntMap.fss:676`). In the tests, `intPrim.fss:21-22` and `longPrim.fss:21-22` assert the wrap, and `HeapTest.fss:95-99`, `QuickCheckTest.fss:89-90` and `ReflectiveQuickCheckTest.fss:16-17` depend on it.
>
> So the repair is the natives plus four library files plus five tests, all in the 2012 tree, and the decision is Pavol's. The candidates, with costs, are in the report's section 8: the specification's wraparound operators declared under `walk` for the bodies that mean to wrap, the bodies rewritten not to overflow, or `walk` kept wrapping. Keeping `walk` wrapping only postpones the library's repair: the compiled path already throws on these operations, and at the switch-over it compiles this same library, where these bodies then raise `IntegerOverflow` (`compile-ladder/rung-walk-overflow/JUDGE.md` section 3, point 1). The expected failure `ProjectFortress/tests/XXXFixedWidthOverflowRungB.fss` is unchanged and stays this row's gated check. With the patch, all twelve of its cases raise the catchable `IntegerOverflow`, and `IntSemanticsRungI.fss` still passes (`probes/renamed-test-with-edit.txt`).
>
> By reading, four more sites in the same two files leave the width without a catchable `IntegerOverflow`: `Int$Pow` and `Int$Choose` through `Int.rc` (row 347), and `Long$Pow` and `Long$Choose`, which wrap silently (`Int.java:150-154`, `:218-228`; `Long.java:162-166`, `:230-240`).

**Row 146: append to its notes:**

> After row 379's walk fix, a `ZZ64` variable set from a small numeral overflows at 32 bits instead of wrapping there: `x: ZZ64 = 2147483647` holds an `Int`, and `x + 1` and `x DOT x` become `IntegerOverflow`, while `widen(2147483647)` answers `2147483648` (`compile-ladder/rung-walk-overflow/probes/Row146Width.txt`, run with the patch in a shadow). In the interpreter tests the shape reaches `longPrim.fss:20-21`. It also explains `ZZ64 3 LSHIFT 63` = `0` in row 379's probe table, whose `threeL: ZZ64 = 3` holds an `Int` (`probes/differential-intsemtable.txt`).

**New rows:** none. The library's reliance on wrapping is recorded in row 379's note instead of a new provisional row 387, because its repair depends on Pavol's choice among the candidates. That is a decision, and the report says so (section 9).

## Handover state line

- Rung O (row 379, walk overflow) stopped on its count and landed nothing outside its directory. 11 interpreter tests change, all through code that relies on wrapping: `RangeInternals`' range split, `Random`'s `LinearCongruential`, `ChunkedSparseArray`, `IntMap`, and five of the team's tests. Row 379 stays open with its expected failure. The list, the row 146 effect and the candidates wait on Pavol (`compile-ladder/rung-walk-overflow/REPORT.md` sections 1, 5 and 8).

## Checker count

103, unchanged: no source file differs from `47437c65f`.
