# c34 judgement (run c-run4, base c124c6b65)

Applied 12, held 0.

- 255, rewrite: apply, with the check's three corrections: "`opr <` on `Number` returns `Boolean`" became "`RR64`'s `opr <` (`Library/FortressLibrary.fsi:180`) returns `Boolean`" (checked at the base: `:180` is `opr <(self, other:T): Boolean` in `StandardPartialOrder`, which `RR64` extends at `:298`); "so APL primitives return 0/1 on arrays but not scalar against scalar. Before the workaround, the first run" shortened to "so only scalar against scalar is not 0/1. The first run"; "`w02_lib.fss` (b)" became "case (b) of `w02_lib.fss`". silent: choice.
- 430, keep: apply (the line stays); the check passes it. silent: defect.
- 806, keep: apply (the line stays); the check passes it.
- 102, close: apply; d846e3644 makes `RR64` extend `StandardMinMax[\RR64\]`, and `ProjectFortress/tests/FlatTowerRungF.fss:182` asserts `BIG MAX` over an `RR64` array.
- 436, rewrite: apply as written; the check passes it.
- 479, keep: apply (the line stays). FACTS.md:189's "`=` always `false`" is owed a FACTS correction (row 481), not a row change.
- 481, rewrite: apply as written; the check passes it.
- 603, rewrite: apply, with the check's two corrections: "the api does not export it," became "the api does not export `MappedGenerator`,"; "Its parallel twin ... (`Library/FortressLibrary.fss:3771-3772`) prints" gained "extends it and" before "prints". silent: defect.
- 609, rewrite: apply, with the check's correction to the claim: "is completed anchored at the subscripted axis's right end" became "is completed by counting back from `b` in steps of `c`" (per `Library/RangeInternals.fss:872-873`, `atMost`).
- 659, rewrite: apply as written. silent: defect.
- 661, rewrite: apply, with the check's correction: "Workaround: `seq((0 # n).reverse)`." became "Workaround, for stride -1: `seq((0 # n).reverse)`."
- 799, rewrite: apply as written; CONTESTED stays, the question is review-queue item 188.

No duplicates, no pairs (the check upholds none), no question to measure, no `XXX` test believed to pass.
