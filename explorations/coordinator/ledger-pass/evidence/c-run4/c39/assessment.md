# Chunk c39, run c-run4, base c124c6b65

Marks: scope, present meaning, evidence, comprehension, ownership, consistency. No FACTS or POSITIONS entry names any row of this chunk (evidence files list none). No row has a reproducer to run; every one is `none` with a probe path read from history. No row cites a commit since it was written that touches its defect (row 1's three Evaluator commits are on static parameters and reductions; row 1's one named commit, e5f490b3c, is a record fix).

## Row 1: rewrite
- scope pass; present meaning pass (mechanism still at the base: `Evaluator.java:1181` sends a `SubscriptingMI` to `evalAndInvokeMethod`, `:1064` calls `evalInvocationArgs`, `:1380-1381` `exprs.subList(1, exprs.size())`, read in `git show c124c6b65:.../Evaluator.java`); evidence FAIL: "`Evaluator.java:1052` ... (`Evaluator.java:1251-1252`)" now point at an unrelated unification error and math-item loop (shift +129); and "`explorations/gap-ledger-probes/g02.fss`" gave no history pin (deleted in `e879b6a44`); comprehension pass; ownership pass; consistency: "A library met it too ... which now binds" tells a repair, minor.
- New line: lines re-pinned, probe pinned to the parent of `e879b6a44`, the library workaround cited by `AplCore.fss:1859`, `siblings: 84` (row 84 already named row 1).
- Dropped: "`rs[k][j]` on an `Array[\Array[\RR64,ZZ32\],ZZ32\]`" (the site's old form): home, the history, which keeps the old line whole.

## Row 8: keep
- All six pass. Probe paths gone, each pinned "in the parent of `e879b6a44`". The note on run C's row 148 is a pointer that the template's "148 is vacant" relies on, not a repair story.

## Row 9: keep
- All six pass. `c17_bar_continuation.fss` was deleted in `ed6dafb52`, not `e879b6a44`, so the row's single pin covers only the last probe; the template's history rule (`git log -1 --diff-filter=D`) still finds it. Not worth a rewrite alone.

## Row 12: keep
- All six pass; spec line 27 unchanged, the probe pinned.

## Row 15: keep
- All six pass.

## Row 84: rewrite
- scope, present meaning, comprehension, ownership, consistency pass; evidence FAIL: "`Expression.rats:384-386`" etc. carried no path, so a reader (and the citation check) took them as `Specification/appendices/grammars/rats/Expression.rats` (233 lines, "past the end"); and "More probes: `g4a_base.fss`, ... beside it" had no history pin. At the base `ProjectFortress/src/com/sun/fortress/parser/Expression.rats` holds `PrimaryItem` at :384-386, `LeftAssociatedPrimary` from :388, `MathPrimary` at :463-465, `Exponentiation` at :651-656; no commit since the row touched the file.
- New line: the full parser path, the probes pinned to the parent of `22ea0cd90` (where `git log --diff-filter=D` shows they went), `siblings: 1` in place of "Row 1 meets the same productions through `MathPrimary`".
- Dropped: none (the probe names stay, without `.fss`).

## Row 86: keep
- All six pass.

## Row 88: keep
- All six pass. The behaviour matches the spec's fixity table, and the class is `design limit`, consistent.

## Row 91: keep
- All six pass; spec lines unchanged; probes in the parent of `22ea0cd90` (both deleted there).

## Row 262: keep
- All six pass. The citation check's "moved" is a false lead (it looked for the word `rows`); `Keyword.rats:48` still lists `wrapped` and `:30` lists `at`. Its keyword half overlaps row 8's `at`, but the row's own defect, an import's name barred as a local, is not row 8's; they already name each other as siblings.

## Row 62: keep
- All six pass; spec lines unchanged; probe pinned.

## Row 66: rewrite
- scope, present meaning, evidence, ownership pass; comprehension and consistency FAIL: "The POSITIVE-VERIFIED half:" reads as a second status in the notes, and "case (c) at `:885-894`" resolves against the spec file, not `fortify.el`. The row was at 1,193 of 1,200 characters. `Fortify/fortify.el:881-884` and `:885-894` read the same at HEAD and have no diff since the base.
- New line: `:885-894` given its file, the holding cases stated as what renders as the spec says, "the ML literature's register" cut; 1,082 characters.
- Dropped: "the ML literature's register" (a reason for the workaround's choice): home, the history.

## mech.py
Last line: `MECH: 3 lines, 0 failing, every check passes.`
