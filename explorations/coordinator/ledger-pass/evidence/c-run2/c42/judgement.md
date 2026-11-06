# Judgement of c42, run c-run2, base c124c6b65

- Row 59: apply (rewrite, corrected). The check failed it on the cold read only (claim names no path while the notes show both losing updates). Correction made as the check gives it: in the claim, ", on walk and on the compiled path," inserted after "above one thread"; class kept.
- Row 79: apply (rewrite). Check passes: P-76 is `POSITIONS.md:84` and names row 79; `p33.fss` is in `c69cb2064^`.
- Row 82: apply (rewrite). Check passes: pins `FortressBuiltin.fsi:287`, `FortressBuiltin.fss:725` hold `object Thread`.
- Row 111: keep, unchanged. Check passes.
- Row 319: apply (rewrite). Check passes: `CodeGen.java:4620-4636` holds the TODO and `new VarCodeGen.MutableFieldVar`.
- Row 463: apply (keep turned rewrite, corrected). The check failed the keep: the pin `FortressLibrary.fss:1269-1273` no longer covers `__whileCond`. Correction made exactly from the check and read at c124c6b65 (`__cond` at :1270-1271, `__whileCond` at :1274-1275): "(`Library/FortressLibrary.fss:1269-1273`)" becomes "(`Library/FortressLibrary.fss:1270-1275`, at c124c6b65)"; nothing else changes.
- Row 480: apply (rewrite). Check passes.
- Row 482: apply (rewrite). Check passes; `XXXExtremumRungJ` stays an expected failure.
- Row 640: keep, unchanged. Check passes (not a silent row: NEGATIVE-BOUNDED).
- Row 746: apply (rewrite, corrected). Two corrections from the check's sources: "the chapter has no revision box for this reading" becomes "`if.tex` has no `\revision` box for this reading" (`Specification/fortress/fortress.tex:86-92` defines `\revision`); the Specification cell gets its prefix, "`Specification/basic/expressions/if.tex`, \"If Expressions\"".

No closes, duplicates, pairs or silent rows (the check and assessment found none). No question to measure; no `XXX` test believed to pass (questions.md, confirmed by the check).
