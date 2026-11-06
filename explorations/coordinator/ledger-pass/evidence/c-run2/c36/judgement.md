# Judgement of c36 (run c-run2), base c124c6b65

Applied 12 (9 rewrites, 3 keeps that need no line); held 0. No closes, duplicates, pairs or silent rows (final.dups, final.closes, final.silent, final.pairs empty). `mech.py --final`: `MECH: 9 lines, 0 failing, every check passes.`

- 68: keep, applied (no line). Check passes: `Compilation.rats:45-49` holds the message.
- 112: keep, applied (no line). Check passes.
- 122: apply with the check's corrections. Class `implementation gap (walk)` -> `implementation gap (checker)` (both sites are in `IndexBuilder.scala:189`, `:349`; F-182). Notes: "Seen under walk, which runs the checker's index builder, and by reading on the compiled path (F-182)." (the check's text, shortened by me to fit 700 notes characters; verified `IndexBuilder.scala:189` and `:349` at the base).
- 124: apply as written; check passes.
- 125: apply with the check's correction of the workaround: "Workaround: none while row 122 stands; a property before the methods passes this check, then stops as row 122 records." To fit the notes limit I also shortened "that would have to be fixed too" to "that must be fixed too".
- 354: apply with the check's correction: "or a stale cache shows the `XXX` test red".
- 357: apply as written; check passes.
- 762: apply as written; check passes.
- 838: apply with the check's corrections, CONTESTED kept. Reproducer passage: "`var` on the parameter of `object OneShot( canTryIt : Boolean )` (`Library/OneShotFlag.fsi:14`) gives 'var cannot modify an object parameter, canTryIt'" (verified `OneShotFlag.fsi:14`); "(`compiler_tests/ExportVarObjectParameter.test`)" (file exists); Against sentence shortened as the check gave. The check's text overran the notes limit (762 of 700), so I also compressed the spec citations sentence to "The claim's grammar: `Specification/basic/components/apis.tex:87-88`, `basic/objects.tex:104-109`; the same in `Specification-1.0-frozen/`." (same citations; the claim already states what they say).
- 839: apply with the check's correction, a reproduce recipe in the notes: "Reproduce: `bin/fortress compile` an api's `Np(a: ZZ32)`, a component's `Np(z: ZZ32)` and a client's `Np(3).a`; `bin/fortress run` the client." (the check's recipe, compressed: as given it took the row to 1,222 characters); also "do not count in the rule; an object's do, since" -> "do not count; an object's do, as".
- 844: keep, applied (no line). Check passes; CONTESTED, question unsettled.
- 870: apply as written; check passes (re-pin at c124c6b65 right).
