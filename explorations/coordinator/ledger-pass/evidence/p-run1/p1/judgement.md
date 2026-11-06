# Judgement of p1, run p-run1, base de6d905f5

Applied 12 (10 rewrites, 2 keeps), held 0. The check's sources were spot-read at de6d905f5: `FortressBuiltin.fss:462-463` (`NN32$Pow`), `FortressLibrary.fss:978-979` (`UnsignedLong$Pow`), `UnsignedLong.java:234`, `:327` (`powExact`), `git grep simpleIntArith.intExp` (only `CompilerBuiltin.fss:75`), P-38 and P-161 in POSITIONS.

- 349: apply, the check's exact line: input 43 named in the claim; "P-161, not landed at de6d905f5"; the `widen` half's probe `SK3Tower.fss` restored; the quoted "Could not check call to function widen" and "moves `XXXZZNarrowRungP` onto `.asZZ32`" dropped (homes: history, P-161).
- 381: apply, the check's exact notes: "as P-69 rules" on walk's width-32 answer; probe paths made unambiguous. My correction, for mech.py (a `.fss` name or a bare `skeptic/` reads as a citation at base) and the 700 limit: "Probes `SkCountType` in `explorations/compile-ladder/rung-shift-count/probes/` and `SkShiftCountZZK` in its subfolder skeptic", which places both files as at `ab067d9b6^`.
- 383: apply with the check's correction: "`shift` becomes a reserved name, so the compiler tests that bind it are renamed (P-38)".
- 441: apply, the check's exact line: route "Closes at the switch-over (P-38): the one library binds no `intExp`"; "where P-153 raises ..." for the ambiguous "it"; `REPORT.md` §7 citation dropped (home: row 523, history).
- 502: apply with the check's correction ("P-161, not landed at de6d905f5, ... its landing closes this row"). My correction for length: the notes came to 730 of 700, so I dropped "The compiled prelude has no `widen` on `ZZ` (row 349)." (home: row 349, a sibling, which states it).
- 523: apply with the check's three corrections: "Closes at the switch-over (P-38): the one library binds no `intExp`."; "plain" dropped; ", as P-153 asks" dropped. 1199 characters.
- 524: apply with the check's correction: the route names walk's `NN32$Pow` (`FortressBuiltin.fss:463`); "The value is wrong, not its rendering (row 326)." dropped (row 326 FIXED; home: history).
- 525: apply with the check's correction: the route names walk's `UnsignedLong$Pow` (`Library/FortressLibrary.fss:979`) and `powExact`.
- 581: apply, the writer's line (check passes).
- 856: apply, the check's exact line: "on both paths", class `deliberate (library)` by P-161's ruling, the remaining work (the checked getters not on `NN32`/`NN64` at base), "full text: history, row 856" added.
- 858: keep (check passes); no line to apply.
- 859: keep (check passes); no line to apply.

Other files: no closes, no duplicates (`final.closes`, `final.dups` empty); `final.silent` = `silent.txt` as written (the check passes it, consistent with P-161); `final.pairs` = the 349/442 pair (the check passes it). Questions: none to measure; no `XXX` test believed to pass.
