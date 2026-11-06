# c32 assessment (base c124c6b65)

Marks: scope, present meaning, evidence, comprehension, ownership, consistency.

## 37: rewrite
- scope pass; present meaning FAIL: "`trait Monoid` sits inside a comment block at `Library/FortressLibrary.fss:3032` (at 052a7c3fe)" — the line moved (+188); now the block `:3218-3226`, `trait Monoid` at `:3220`. evidence FAIL: reproducer "`Library/incomplete/advanced/Fortress.Operators.fsi.INCOMPLETE`" is not a program; now `none` with the grep command and its output (run here: `grep -n 'trait Monoid\[' Library/FortressLibrary.fss` → `3220:...` only). comprehension, ownership, consistency pass.
- Read beyond evidence: FortressLibrary.fss:3216-3226; the INCOMPLETE file's `%trait` lines (775, 845, 976, 1196).
- Dropped: nothing; the INCOMPLETE path moved from the reproducer cell into the notes.

## 39: keep
- All six pass. Reproducer `none` with the probe's old path (`explorations/spec-probes/p11_bigspec.fss`, parent of e879b6a44), as the template allows; the pinned `PreTypeCheckDesugaringVisitor.java:358-373` is unchanged since its pin and holds `visitAccumulator`; no commit since touches it.

## 40: keep
- All six pass. Reproducer `none` with old probe path; the claim's mechanism (the refusal of two nullary declarations) is the specification rule cited, unchanged; siblings named as rows 39, 101, 137.

## 44: measure
- present meaning FAIL: "sealed twice over, by `[\T extends Number\]` and an `unwrap` that is `cast[\Number\]`" — at the base `opr SUM[\T extends AdditiveGroup[\T\]\]` with `BigReduction[\T,T\](SumReduction[\T\])`, no cast (`Library/FortressLibrary.fss:3455-3459`), since d846e3644 (git log -S; a commit older than the row's last rewrite); and `Vector` extends `AdditiveGroup` (`FortressLibrary.fsi:1645-1646`). evidence FAIL: the reproducer's run died on `Could not find an implementation for API AplCore` (wrong source path), so nothing shows what SUM over nested arrays does now. Health check 5.5.2 names the same suspicion.
- Not rewritten, because the change of claim rests on a run: questions.md.

## 101: rewrite
- consistency FAIL: "The same at `cdd25b95d`" — cdd25b95d is not in the base's history (only on origin/wip/rung-library-distribute); dropped the hash, kept the fact as library text (`Library/IntMap.fss:738` still declares the nullary `BIG UNION[\Val\]()`, read here). The refused batch-17 note (PrefixMap alone refused through `Library/PrefixSet.fss:425`) is now in the line. Other marks pass.
- Read beyond evidence: grep of `opr BIG UNION` in Map, Set, IntMap, PrefixMap, PrefixSet at the base; `git branch -a --contains cdd25b95d`.
- Dropped: "beside its own" wording only; the old line's text is in the history.

## 199: rewrite
- present meaning FAIL: "the APL library's flat carrier ... `AplArr`'s elements are `RR64`" reads as the current library; `explorations/apl/base/AplCore.fss` has no `AplArr` (grep: 0); the measurement was on the retired first library at `0ff5eae27~1` (the p15_box.fss header, read from `1ee3b0bc5^`). evidence FAIL (mild): `Rung2.out` with no path; now `explorations/apl/v1/rung-2/Rung2.out` at that commit. siblings 219 added. Others pass.
- Dropped: "Ex 9 frame character for character" became "Ex 9's frame exactly"; "the chapter's" dropped. Home of the exact wording: the history, row 199.

## 216: measure
- evidence FAIL: reproducer `r04_glyphs.fss` prints the half that works (the evidence's run: twenty arities, exit 0), not the claim's failing half (`,`, prefix `,`, `|`); the probes for that half (`r05a_comma.fss`, `r05e_ravel.fss`, `r05c_bar.fss`) were not run. Others pass; the `⌈ ⌊` half is row 280's, which names it, and 280's reproducer reproduces.
- Question in questions.md; a rewrite would move the reproducer to r05a_comma.fss.

## 219: measure
- evidence FAIL: the reproducer's run (`r07_edge.fss`) passes walk's load — it prints two lines — and dies elsewhere (`Unification error ... fill param 1 (v:RR64) got arg FnExpr`, `r07_edge.fss:9:54-76`), never reaching the `Char` call; so neither the claim's refusal ("is refused ... at least one pair of parameters must have excluding types") nor batch 18's refused note ("now 'fails the Meet Rule'") is what the program now shows. siblings FAIL: sibling 159 is FIXED. present meaning: the cited `Library/FortressLibrary.fsi:1530-1531` no longer holds `ReadableArray1 extends`.
- Only a run tells whether the family is still refused, and on which path: questions.md.

## 223: measure
- evidence FAIL: the reproducer's run died on the source path (`Could not find an implementation for API AplCore`), so the evidence holds no run of the claim. Others pass. `silent` beside NEGATIVE-VERIFIED: silent.txt (choice).

## 278: rewrite
- evidence FAIL: probe `explorations/apl-probes/c16_glyph_identifier.fss` with no commit (signal probe-unexplained); now "in the parent of 7c3218956", with c10_opr_iota.fss (the `opr ⍳` probe), both read there. present meaning FAIL: `Symbol.rats:175-178` resolved to the specification's grammar copy; pinned now to `ProjectFortress/src/com/sun/fortress/parser/Symbol.rats:175-178`, which holds the `singleOp` gate (read), and the `\u23xx` entries of operators.txt pinned at `:490-491`, `:522-523`.
- Dropped: "(the second prefixed `null`)" and the generator's name `unicode/OperatorStuffGenerator.java`, home: the history, row 278.

mech.py's last line: `MECH: 5 lines, 0 failing, every check passes.`

## 280: keep
- All six pass: the reproducer's run shows `Unmatched delimiter "|/"` at each declaration; the pins `Operators.java:2161`, `PrecedenceMap.java:176-179`, `MethodParam.rats:64-67` are unchanged since the row's commit; probe old paths name 7c3218956.

## 460: rewrite
- present meaning FAIL: `DelimitedExpr.rats:43` and `:237-251` resolved to the specification's 124-line grammar copy (past end); the parser's rule is `ProjectFortress/src/com/sun/fortress/parser/DelimitedExpr.rats:122`, and the clause rule `:237-251` holds there (read). evidence FAIL: probes "`TcTrait.fss`, `TcBind.fss`, gone" with no path; now `TcBind.fss`'s full path at `ab067d9b6^` (the deleting commit); `TcTrait.fss` dropped, home: the history, row 460. Others pass; FACTS.md:68 agrees.
- Dropped: "and `typecase (rp, rq) = (p, q) of`" → "its tuple form"; "judge-review.1" (a review pointer); homes: the history, row 460.

## pairs
- none: the overlaps outside the chunk (219 with 24, 53, 292 in c28; 37 with 53, 293) state different defects.
