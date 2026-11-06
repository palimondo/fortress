# c34 check (run c-run4, base c124c6b65)

`mech.py`: 9 lines, 0 failing; applied on copies, `ledger.py check` and `check --base` exit 0. Every citation below was opened with `git show c124c6b65:<path>`.

Totals: 8 pass, 4 fail (255, 603, 609, 661).

## 255, rewrite: FAIL

1. **Fidelity.** Passage: "`opr <` on `Number` returns `Boolean`". Source: at the base `trait Number` (`Library/FortressLibrary.fsi:288-296`) declares only `opr =`; `RR64`'s `<` comes from `StandardPartialOrder[\RR64\]` (`:298`), whose `opr <(self, other:T): Boolean` is at `:180`. The old line's citation `Library/FortressLibrary.fsi` was dropped, and the claim it carried no longer holds after d846e3644. Correction: replace "`opr <` on `Number` returns `Boolean`" with "`RR64`'s `opr <` (`Library/FortressLibrary.fsi:180`) returns `Boolean`".
2. **Length, for the correction above.** Replace "so APL primitives return 0/1 on arrays but not scalar against scalar. Before the workaround, the first run" with "so only scalar against scalar is not 0/1. The first run".
3. **Cold read.** "`w02_lib.fss` (b)" (the reader could not tell what "(b)" is; a worker running the file would not know what to look for). Source: `rung-6/PROBES.md` "w02" and the old line, "case (b) of `w02_lib`". Correction: replace "with it `w02_lib.fss` (b) and" with "with it case (b) of `w02_lib.fss` and".
With 1-3 the notes are 678 of 700, the row 956 of 1,200.
Otherwise holds: `AplCore.fss:1698` holds `aplAsmV`'s `requires { aplAllScalar(rs) }`, `:1685-1688` the workaround; PROBES.md "w02" gives the `CallerViolation` and the fix. Dropped tokens: `AplCore.fss` (kept, full path), `AplCore.fss:1674:20-34: CallerViolation` (history; the error is kept without its stale position), `w02_lib` (kept as `w02_lib.fss`), `Library/FortressLibrary.fsi` (restored by 1). Status NEGATIVE-VERIFIED beside `silent` keeps (item 265). Reproducer `none` with the run and its source path in the notes: pass.

## 430, keep: pass

Pins are "By reading (d4d454f9d)"; at the base `FType.java` still has `private static int counter` (`:56`, `serial = ++counter` at `:99`) and `FunctionClosure`'s `identityHashCode(getEnv())` is at `:143`. The commits since (9f65d60e2, 153887360) do not remove either cause; the batch-16 refused note says the same causes remain.

## 806, keep: pass

`OverloadedFunction.java` at the base still returns at `if (l1 != l2) return;` in the "neither" branch (`:383`); c41c3d2b0 added lines above, not a check before it. Sibling 783 FIXED stays a related row.

## 102, close: pass

d846e3644 is in the base's history; at the base `trait RR64 extends { Number, StandardPartialOrder[\RR64\], StandardMinMax[\RR64\], ... }` (`Library/FortressLibrary.fsi:298`), and `StandardMinMax` extends `StandardMax[\T\]` (`:218-219`), so `BIG MAX`'s bound `T extends StandardMax[\T\]` (`:2018`) holds at `T = RR64` for every `Generator[\RR64\]`. `ProjectFortress/tests/FlatTowerRungF.fss:182`, added in d846e3644, asserts `BIG MAX z` over an `Array[\RR64,ZZ32\]` is `2.25 : Float` under walk. The row's vector instance is not asserted separately; the cause the row names is gone for it too.

## 436, rewrite: pass

`:3447` `empty(): T = additiveIdentity[\T\]()`, `:3408` `else => cast[\T\](0)`, `:3425` `else => cast[\T\](1)` hold at the base. Dropped tokens: `:3394`, `:3411`, `:3433` (repinned), `compile-ladder/rung-library-distribute/REPORT.md` and "its `where` a `coerces` constraint" (history, row 436; B.4 pointer kept). F-243's "clears 2" is about distance sites, not the bug: the writer's reading holds. Cold read's "why filtered" item: a worker fixing the fallback fixes both cases; not a failure.

## 479, keep: pass

`Library/CompilerLibrary.fss:311` still `opr IN(x:ZZ32, self): Boolean = false`; `FilteredRange` at `:424` declares no `IN` (it has `filter` at `:440`). 108ab82d6 did not touch these. FACTS.md:189's "`=` always `false`" is the FACTS correction the writer names, not a row change.

## 481, rewrite: pass

`CompilerLibrary.fsi:111` and `.fss:301` hold `GeneratorZZ32 extends Equality[\GeneratorZZ32\]`; `CompilerAlgebra.fss:26` holds `self === other`; no range object in `CompilerLibrary.fss`/`.fsi` declares `opr =`. `compiler_tests/XXXRangeEqRungJ.fss` asserts the three cases named. Batch story removed; "owed ... measured but not gated" kept in substance. Mech lists no dropped token. Owed elsewhere: FACTS.md:189 (writer's note).

## 603, rewrite: FAIL

1. **Fidelity.** Passage: "the api does not export it," where "it" reads as the object just named. Source: the api does export `SimpleMappedSeqIndexed` (`Library/FortressLibrary.fsi:2428`); it is `MappedGenerator` that no `.fsi` line names (`git grep MappedGenerator c124c6b65 -- Library/FortressLibrary.fsi`: none). The old line said "does not export `MappedGenerator`". Correction: replace "the api does not export it," with "the api does not export `MappedGenerator`,".
2. **Nothing lost.** Passage: "Its parallel twin `SimpleMappedIndexed` (`Library/FortressLibrary.fss:3771-3772`) prints". Source: the old line's "extends it and prints"; at the base `:3771-3772` reads `extends { MappedGenerator[\E,F\], Indexed[\F,I\] }`, which is the row's whole contrast. Correction: replace with "Its parallel twin `SimpleMappedIndexed` (`Library/FortressLibrary.fss:3771-3772`) extends it and prints" (keep the full path: a bare `:3771` would read against `ExportChecker.scala`).
With 1-2 the notes are 697 of 700, the row 1,100 of 1,200.
Otherwise holds: `:4319-4320`, `:3751-3762`, `ExportChecker.scala:733-734` ("different extends clauses"), `RangeDeclarations.fss:58` pins `SimpleReversedIndexed(mapped(seq(0,2,4,6)))`. Dropped tokens: `:3565-3577`, `:3585-3586`, `:58`, `:4155-4156` (repinned), the full ExportChecker path (shortened to its file name, unique), "or accept the string" (history).

## 609, rewrite: FAIL

1. **Cold read / fidelity of the claim.** Passage: "is completed anchored at the subscripted axis's right end". Source: `Library/RangeInternals.fss:872-873`, `atMost(n) = fullScalarRange(r - (|n| - 1) str, r, str)`: the completion counts back from the range's own `b` (`r`), not from the axis's right end; on `0#6` with `:3:2` both readings happen to give 1 and 3, and the cold reader found the claim reading two ways. Correction: in the claim replace "is completed anchored at the subscripted axis's right end, not as `l:b:c`" with "is completed by counting back from `b` in steps of `c`, not as `l:b:c`" (claim 206 of 300).
Otherwise holds: `RangeInternals.fss:873-877` (`atMost`, `opr IN` with `stride DIVIDES (r-n)`), `FortressLibrary.fss:4383` (`self.bounds.narrowToRange(r0)`). Workaround `[0:3:2]`: the test's stand-in with `0:3:2` was red as expected in the earlier line. Dropped tokens `:715-719`, `:687-722`, `:4214-4221`: repinned.

## 659, rewrite: pass

`RangeInternals.fss:639-640` and `:207-208` hold both `combine2D` `fail("shouldn't happen: combine2D of non-uniform ranges ...")` bodies; abe8b0342 is in the base's history and no commit since touches `RangeInternals.fss`. Reproducer `none` with command and output in the notes. Dropped tokens `:217`, `:590-591`, the parameter-type spellings (repinned, spelled with names) and the pre-batch-11 error (history). Batch story removed. Status NEGATIVE-VERIFIED beside `silent` keeps.

## 661, rewrite: FAIL

1. **Cold read.** Passage: "Workaround: `seq((0 # n).reverse)`." Source: the claim is about any `a:b:c`; the workaround spells only stride -1 (as `SUFFIX_SUM` at `FortressLibrary.fss:4944` and `Shuffle.fss:23`'s `:-1:-1` do), and the cold reader could not tell what to write for another stride. Correction: replace with "Workaround, for stride -1: `seq((0 # n).reverse)`." (notes 666 of 700).
Otherwise holds: `.fsi:2421` (`opr :` returning `Range[\I\]`, under "doesn't obey the subtyping rule"), `:2189` (`Range` extends `StandardPartialOrder`, `Contains`, no `Generator`), `.fss:4944`, `Shuffle.fss:23`; `RangeInternals` gives strided full ranges `seq` (`:1489`, `:1590`). Dropped tokens: `:2163`, `:2391`, `:4686` (repinned), "`(0 # n).reverse`" (kept as the workaround). Batch story removed.

## 799, rewrite: pass

`List.fsi:57-61` and `List.fss:89-90` hold; review-queue item 188 (`review-queue.md:90`, `:374`) is open, in section (b); P-151 (POSITIONS.md:63) moves them into `List`. CONTESTED keeps. `AnyListElementTypeWalk.fss` calls `addLeft`/`addRight`. Dropped token `sed -n 55,60p Library/List.fsi` (history; replaced by the pinned citation).

## questions.md, pairs.txt, dups.txt, silent.txt

No question to measure; no pair; no duplicate. silent.txt choices (255 choice; 430, 603, 659 defect) match the rows.
