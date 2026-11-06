# Chunk c35 (run c-run2), at base c124c6b65

Marks: scope / present meaning / evidence / comprehension / ownership / consistency. No FACTS or POSITIONS line names any of the four rows; no overlaps among open rows.

## 35: rewrite
- scope pass; present meaning pass (the `Matrix` trait at `Library/FortressLibrary.fsi:1757-1770` still declares no `^` and no norm; the only norm is Vector's at `:1706`); evidence FAIL: "Probes `explorations/libvector-probes/p25_spec_gaps.fss` and `p26_matrix_norm.fss`" gives the second probe by bare name; no mechanism pinned; comprehension FAIL (small): no workaround stated beyond "Transpose ships only as the method `.t()`"; ownership pass; consistency pass.
- Read beyond: `Library/FortressLibrary.fsi:1700-1830`, `Library/Sparse.fsi`; `git log --diff-filter=D` for both probes (e879b6a44).
- Change: mechanism pinned to the `Matrix` trait; workaround (`M.t()`, `M M`); second probe's full old path. Claim unchanged (static reading, no run needed for an absence). Dropped: "Transpose ships only as the method `.t()`" folded into the mechanism and workaround; no fact lost.

## 50: rewrite
- scope pass; present meaning pass (`Evaluator.java:1014-1015` is still `NI("forArrayComprehension")`; `ExprDisambiguator.scala` has no `ArrayComprehension` case; no `BIG [` in `Library/`); evidence FAIL: "`Evaluator.java:885-887` is `NI(…)`" now points at commented-out lines (shifted +129); comprehension FAIL: no workaround; ownership pass; consistency pass.
- Read beyond: `Evaluator.java:1008-1016`, grep of `ExprDisambiguator.scala`, `Specification/fortress/preamble.tex:69-83` (lists "array comprehensions" as not yet supported), `Library/FortressLibrary.fsi:1513` (`tabulate`), `ProjectFortress/tests/ArrayElementAlgebra.fss:40` (the `tabulate(fn ...)` form).
- Change: Evaluator pin re-pointed with full path; the disambiguator's missing case stated as the cause of the message; the preamble's listing stated; workaround `tabulate`. Dropped: "Second probe:" wording only.
- Not settled here: whether the compiled path refuses the same program the same way; the row says walk only.

## 58: rewrite
- scope pass; present meaning pass (overloads at `Library/FortressLibrary.fss:2632-2641`, `.fsi:1693-1702`, still typed on `T`); evidence FAIL: "`Library/FortressLibrary.fss:2470-2480`" now shows Array1's `replica`/`copy`, not the scaling overloads; comprehension pass; ownership pass; consistency pass.
- Change: pin re-pointed, its `.fsi` declaration added; workaround phrased as a rule with the probe's example. No fact dropped.
- NEGATIVE-VERIFIED beside `silent`: status kept (review-queue item 265); `silent.txt` says choice.

## 466: rewrite
- scope pass; present meaning pass (`NativeArray.fss:25-29` unchanged since the row; the capture shows `3 3` after the second fill, on both trees); evidence FAIL: the capture `explorations/compile-ladder/rung-tabulate/probes/skeptic/old-spelling.txt:56-63` is gone and the row does not say where it was (signal probe-unexplained); the spec cell carries prose ("puts the duty on the programmer; silent on what an implementation does") beyond file and heading; comprehension FAIL: "It predates rung A: `fill` behaves the same on both trees" is a batch story; no workaround; ownership pass; consistency pass.
- Read beyond: `git show ab067d9b6^:` of `SkTwiceInit.fss` and of `old-spelling.txt` (lines 56-63: `a after a second fill: 3 3` on base and edit); `arrays-distributed.tex:12,71`; `NativeArray.fss:15-30`; `PrimitiveArray.java:90-94` (`init0` returns `v.init(i, x)`).
- Change: probe named by its old path and deletion commit; spec cell trimmed to file and heading (its prose was already in the notes); batch sentence cut; workaround `a[i] := v` (routes to `put`, `NativeArray.fss:22`; read, not run). Dropped: "It predates rung A: `fill` behaves the same on both trees" and the old line's "Fix: validate outside a transaction, or revise the footnote in the S1 form": home is history, row 466, which keeps the old line whole and is named by the row's marker. The capture's path is dropped for the probe's path: same deletion commit, file beside the probe.
