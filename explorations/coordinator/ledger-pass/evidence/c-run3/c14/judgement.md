# Judgement, chunk c14 (base c124c6b65)

Applied 10, held 0. Rewrites applied: 304, 624, 701, 867, 25, 307, 764, 352, 781; keep 761 applied as the check's line; keeps 643 and 763 stand unchanged (the check passes them; no line to write).

- 304: apply. Check passes (CodeGen.java:3588-3592 holds the three messages at d96242f0a and at the base).
- 624: apply, corrected. Check fails one passage; correction made exactly from the old line (evidence/624.md) and `Library/FortressLibrary.fss:307` (`assert(x:Any, y:Any, failMsg: Any...)`, varargs): "calling `assert`, from `CodeGen.resolveMethodAndSignature`" -> "calling `assert`, 'Can't compile VarArgs yet' from `CodeGen.resolveMethodAndSignature`"; "fails to compile where walk prints `abc`" -> "fails where walk prints `abc`" (the test asserts `compile_exception_contains=OptionUnwrapException`).
- 643: keep. Check passes.
- 701: apply, corrected. "nothing is emitted for its constraints, the checker's (" -> "nothing is emitted for its constraints, which only the checker enforces (" (F-181's wording).
- 763: keep. Check passes.
- 867: apply. Check passes.
- 25: apply. Check passes.
- 307: apply. Check passes; the optional run on NatReflectTest is filed in queue.md.
- 761: keep failed by the check; applied as the check's line: "(`:78`)" -> "(`FTraitOrObjectOrGeneric.java:78`)" (verified: `git show c124c6b65:.../interpreter/evaluator/types/FTraitOrObjectOrGeneric.java` line 78 is the `filteredSortedSet` call).
- 764: apply. Check passes.
- 352: apply, corrected. "commented out since 2011 (" -> "commented out ("; "the check belongs in the checker" -> "it belongs in the checker"; "SkepThrowsClause.fss` (" -> "SkepThrowsClause.fss`, parent of `ab067d9b6` ("; "both paths print `CAUGHT`), gone." -> "both paths print `CAUGHT`)." (verified: `git log --diff-filter=D c124c6b65 -- <probe>` gives ab067d9b6).
- 781: apply. Check passes.

Duplicates, closes, pairs, silent: none (dups.txt, closes.txt, pairs.txt, silent.txt are empty; the assessment and the check find none).
