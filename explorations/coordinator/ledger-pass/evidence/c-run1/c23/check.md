# Check of chunk c23 (base c124c6b65)

mech.py: "MECH: 5 lines, 0 failing, every check passes." Read at the base: `OverloadingOracle.scala:83`, `:190`; `Papers/Types/overloading-check.tick:176-184`; `OverloadedFunction.java:1006-1016`, `:1225-1240`; `compiler_tests/XXXOverloadReturnObjectDomain.test`, `XXXComprisesMeetGenericTrait.fss` and its two `.test` files, `XXXFunctionalMethodOverloadSelfLast.fss` and its two `.test` files; `tests/XXXGenericPairWhereExcludesTogetherWalk.fss`; `explorations/compile-ladder/rung-overloading-checker/SKEPTIC.md` sections 2 and 5; `explorations/compile-ladder/rung-codegen-where/SKEPTIC.md` section 6; rows 537, 565, 677, 740 of the ledger; POSITIONS P-151.

## 413 (keep): pass
`OverloadSet.java:1873` and `:1850-1851` hold their words (mech evidence); the one commit since, 1bc0a9083, changes one line elsewhere.

## 537 (keep): pass
No commit since the row touches the overload code generation; its siblings and tests exist.

## 542 (rewrite): pass
- Fidelity: `satisfiesReturnTypeRule` is at `OverloadingOracle.scala:83`; `overloading-check.tick:180` reads "for every instance U->V of σ∧ with U ≢ Bottom"; the test is `compile`, `compile_err_contains=the return type of Circle->Circle @`.
- Nothing lost: `overloading-check.tick:176-178` false (the words are at :180, now cited); the long `OverloadingOracle.scala` path kept in short form, resolving to the same file; `VerifyError: Bad return type`, `e2f1aa7e8` and walk's run on that base have their home in the history (the earlier line is kept whole). `siblings: 853` is right: 853 names 542.
- Present, Status, Form: pass. The cold read's points (853's relation, walk unstated, the truncated message) do not block a worker: the reproducer holds the message, and walk is not claimed.

## 546 (keep): pass
`:190` holds; the record-says-fixed signal is F-175 stating the refusal, as the row does.

## 564 (keep): pass

## 566 (rewrite): pass
- Fidelity: `XXXComprisesMeetGenericTrait.fss` declares `tag(self)` in `S[\X\]`, `T[\X\]`, `V[\X\]` and `object Vo extends V[\ZZ32\]`; `ComprisesMeetGenericTraitLink.test` is `link`; the run test is `run_out_does_not_contain=PASS`. Nothing lost; batch story gone.
- Cold read: "Row 546's family" leans on row 546, but the named reproducer holds the program. Optional, not a failure: "Row 546's family as functional methods (`tag(self)` in `S[\X\]` and `T[\X\]`, closed by `comprises`, and in their meet `V[\X\]`; `object Vo extends V[\ZZ32\]`)".

## 571 (keep): pass
The refused note (climb-batch-11 RECORD.md:143) is in the line in substance ("A cover through `comprises` clauses with self second stops so too, 'mark?1'").

## 573 (rewrite): FAIL (cold read)
- Fidelity holds: SKEPTIC.md section 5 gives `SkNarrowLastOld`'s output as written, and the program is `C extends A` with `A`'s `pick(n: N0, s: S1, self)` beside `C`'s `pick(n: N1, s: S0, self)` and `pick(n: N1, s: S1, self)`. Nothing lost: the SKEPTIC path is kept in full; "older than climb batch 8" goes to the history.
- Failure: the notes describe the skeptic's program `SkNarrowLastOld` and its labels `C0`, `C1`, `C`, `N1` without its declarations, and do not say that the reproducer `XXXFunctionalMethodOverloadSelfLast.fss` is that program (its `pick(N1o, S1o, C)` and `pick(N1o, S0o, C)` asserted, `REACHED` printed first); the cold read could not resolve which declarations are own and inherited, nor whether self first also fails. A worker meets both. Source: `compiler_tests/XXXFunctionalMethodOverloadSelfLast.fss` at c124c6b65; SKEPTIC.md section 5 ("The self-first copy (`r2/jt2fix/`) prints 'REACHED' and 'PASS'").
- Correction, the whole notes cell (533 characters; row 987 of 1,200):
  `It links (`FunctionalMethodOverloadSelfLastLink`). Object `C extends A` declares `pick(n: N1, s: S0, self)` (`C0`) and `pick(n: N1, s: S1, self)` (`C1`) beside `A`'s `pick(n: N0, s: S1, self)`. The run prints `REACHED`, then dies on `pick(N1o, S0o, C)`, whose one applicable declaration is `C0`: 'ClassCastException: class ...$C cannot be cast to class ...$N1'; walk runs `C1`, `C0`. With self first the same program passes (`explorations/compile-ladder/rung-overloading-checker/SKEPTIC.md` section 5). Not traced. full text: history, row 573`

## 787 (rewrite): pass
- Fidelity: `OverloadedFunction.java:1013` is the `where` test in `domainsExcludeTogether` (:1006) and `:1238` the same in `genericMeetCovered` (:1234), both `return false`; the refusal 'fails the Meet Rule' is at :901. Row 740 is FIXED (14e91723f).
- Nothing lost: `:943` and `:1158` false (moved, now :1013 and :1238); the bad pin 84957e6ef replaced by the base; "refused on 612869b4a" and the codegen stop go to the history, the stop being stale after c324b841c.
- Cold read: `P`, `Q`, `Box` are in the reproducer. Optional, not a failure: after the claim's example in the notes, "(`trait P[\T\] excludes { Q[\T\] }`, `object Box[\T\]`: `Box` fixes one `T` for both)".

## 853 (measure): pass
The question is narrow (one program, one compile), runs from the main tree, and each outcome maps to a line (NEGATIVE-VERIFIED with an `XXX` compiled test) or a close (RETIRED, a status the template defines), or a rewrite.

## 871 (rewrite): FAIL (reproducer, cold read)
- Fidelity holds against `rung-codegen-where/SKEPTIC.md` section 6: `SkWhereOverloadPlain` new compiled 'named cat', 'int', 'named cat', walk the same; `SkWhereOverloadPlainBound` 'Invalid overloading of pick …'; `SkWhereOverload` 'There are multiple declarations of h with the same parameter type: U', walk refused at load; `SkWhereOverloadBound` 'java.util.zip.ZipException: duplicate entry …' (row 537). Row 677 is FIXED (2b1cd8e63). Nothing lost; "since rung G" gone.
- Failure 1 (Reproducer): the cell is `none` and the notes give `bin/fortress compile` with no program: the programs live only in the skeptic's scratch, and the line names neither them nor their record. Source: SKEPTIC.md section 6's table.
- Failure 2 (cold read): the claim's "which it refuses" reads as refusing `pick(z: ZZ32)`; the notes do not say what the fix should give (each `where` pair its header twin's answer); "(then row 537)" and "the same reading in a body" are unresolved. A worker meets each.
- Correction, the claim (291 characters):
  `the compiled overloading check reads no `where` constraint on a function's own static parameter as a bound: it accepts `pick[\U\](u: U): String where { U extends Named }` beside `pick(z: ZZ32): String`, but refuses the pair with `U extends Named` in the header, 'Invalid overloading of pick'`
- Correction, the notes (691 characters; row 1155 of 1,200):
  `siblings: 787, 537. By P-151 a `where` condition on a function's own static parameters bounds them, so each `where` pair should get its header twin's answer. Programs `SkWhereOverload*` (`explorations/compile-ladder/rung-codegen-where/SKEPTIC.md` section 6). `bin/fortress compile` accepts the `where` pick pair, whose run prints 'named cat', 'int', as walk's does; the header pair: 'Invalid overloading of pick … [\U extends Named\]U->String'. The `h` pair, `A excludes { B }`, is refused with `where`, 'There are multiple declarations of h …', as walk refuses it; with header bounds the checker accepts it, then row 537's 'duplicate entry'. Row 677, fixed: the clause as a bound in a body.`

## 879 (keep): pass
CONTESTED kept with its open question; cited lines unchanged since c08ea88d8.

## Files
closes, dups, pairs, silent empty: right; no NEGATIVE-VERIFIED row of the chunk cites `silent`, and the sibling links (546/566/571, 787/871) are related defects at different sites or paths, not one defect.

Counts: 10 pass, 2 fail (573, 871).
