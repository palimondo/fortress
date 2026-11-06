# Mechanical check of c35, the writer's files, base c124c6b65

## Row 35, rewritten (980 characters)
- lengths: row 980 of 1,200, claim 124 of 300, notes 630 of 700
- reproducer `none`: exists
- citations:
  - `Specification-1.0-frozen/basic/operators/opr-overview.tex:56-57` (Specification-1.0-frozen/basic/operators/opr-overview.tex): no word to check; reads: of a set or the length of a list.  Similarly, $\|\quad\|$ is used
  - `Library/FortressLibrary.fsi:1757-1770` (Library/FortressLibrary.fsi): holds scale, rmul, lmul; reads: trait Matrix[\T extends { Number, MultiplicativeRing[\T\] }, nat s0, nat s1\]
  - `Library/FortressLibrary.fsi:1706` (Library/FortressLibrary.fsi): words moved: scale at :1651,1763; rmul at :1765; lmul at :1766; reads: opr ||[\ T extends { Number, MultiplicativeRing[\T\] }, nat k \]me : Vector[\T,k\]|| : RR64
  - `explorations/libvector-probes/p25_spec_gaps.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/libvector-probes/p26_matrix_norm.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `.t()`, `p26_matrix_norm.fss`
- every check passes

## Row 50, rewritten (1029 characters)
- lengths: row 1029 of 1,200, claim 101 of 300, notes 599 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:1014-1015` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java): holds ArrayComprehension, forArrayComprehension; reads: public FValue forArrayComprehension(ArrayComprehension x) {
  - `explorations/libvector-probes/p06_rr64_arraycomp.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/fable-review-probes/RvwArrayCompr.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `Evaluator.java`, `Evaluator.java:885-887`
- every check passes

## Row 58, rewritten (549 characters)
- lengths: row 549 of 1,200, claim 67 of 300, notes 402 of 700
- reproducer `none`: exists
- citations:
  - `Library/FortressLibrary.fss:2632-2641` (Library/FortressLibrary.fss): no word to check; reads: (me : Vector[\T,n\], other : T) : Vector[\T,n\] = me.scale(other)
  - `Library/FortressLibrary.fsi:1693-1702` (Library/FortressLibrary.fsi): no word to check; reads: (me : Vector[\T,n\], other : T) : Vector[\T,n\]
  - `explorations/libvector-probes/p29_mixing.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `(T, Vector[\T,n\])`, `(Vector[\T,n\], T)`, `Library/FortressLibrary.fss:2470-2480`
- every check passes

## Row 466, rewritten (1048 characters)
- lengths: row 1048 of 1,200, claim 176 of 300, notes 675 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/LibraryBuiltin/NativeArray.fss:25-29` (ProjectFortress/LibraryBuiltin/NativeArray.fss): holds Boolean; reads: init00(i:ZZ32, v:T):Boolean =
  - `NativeArray.fss:22` (ProjectFortress/LibraryBuiltin/NativeArray.fss): holds put; reads: opr [i:ZZ32] := (v:T) : () = self.put(i,v)
  - `explorations/compile-ladder/rung-tabulate/probes/skeptic/SkTwiceInit.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `explorations/compile-ladder/rung-tabulate/probes/skeptic/old-spelling.txt`, `explorations/compile-ladder/rung-tabulate/probes/skeptic/old-spelling.txt:56-63`, `fill`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 35: row 35: rewritten (980 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 50: row 50: rewritten (1029 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 58: row 58: rewritten (549 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 466: row 466: rewritten (1048 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 4 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 4 lines, 0 failing, every check passes.
