# Judgement, reconcile chunk r2 (base aa6e4ebee)

Applied 8 (6 rewrites, 2 keeps); held 0. No closes, duplicates, pairs or silent lines in this chunk (`closes.txt`, `dups.txt`, `pairs.txt`, `silent.txt` empty), so `final.dups`, `final.closes`, `final.silent`, `final.pairs` are empty.

- **414: apply** as written. Check passes (`TypeHierarchyChecker.scala:297` holds; `079f54ea9` holds `Odd[\T\]` accepted, `Odd[\V\]` refused).
- **416: apply, corrected.** Check failed two passages; both corrections made exactly from the check's sources: "and overloads on two traits" -> "and refuses overloads on two traits" (history line 2497: "it refuses ... and overloads on two traits that extend"); the `checkSelection` sentence now gives its reason, the refusal over `Range[\ZZ32\]` and `Range[\(ZZ32,ZZ32)\]` (F-91, FACTS.md:88). Row 1177 characters, notes 700.
- **510: apply** as written. Check passes (sibling 706 added; F-228, P-12 consistent).
- **489: apply, corrected.** Check failed the direction of the verdicts; three corrections from `compiler_tests/XXXComprisesGenericRenamed.fss:7` (`Marked[\T, U\] extends Crate[\T\]`) and `079f54ea9`'s skeptic: `Paired[\S\]` is "wrongly refused"; the cause names `Paired` and `Marked`; "The same capture wrongly accepts row 414's `Odd[\T\]`". Row 1146 characters, notes 694.
- **371: apply, corrected.** Check failed the subject of "refusing"; restored the old line's "which refuses with" and "whose object is an `Object`". Carrier form holds (`v02_ring_excluded.fss` at `11bf69c39^`; F-152, FACTS.md:230). Row 1145 characters.
- **293: apply** as written. Check passes (`FortressLibrary.fsi:1647`, `:1759`; carrier failure moved to row 371).
- **97: keep, applied** (line unchanged). Check passes (`OverloadedFunction.java:603`; `r01_native.fss` tracked).
- **706: keep, applied** (line unchanged). Check passes (`overloading.tex:333-349` names only rows 538 and 496).
