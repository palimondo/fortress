# Mechanical check of c28, the judge's files, base c124c6b65

## Row 721, rewritten (958 characters)
- lengths: row 958 of 1,200, claim 272 of 300, notes 479 of 700
- reproducer `ProjectFortress/tests/XXXArrayInferredElementVectorWalk.fss`: exists
- citations:
  - `Library/FortressLibrary.fss:2597-2608` (Library/FortressLibrary.fss): no word to check; reads: array1[\T, nat s0\]():Array1[\T,0,s0\] =
  - `Library/FortressLibrary.fss:2984-2995` (Library/FortressLibrary.fss): no word to check; reads: array2[\T, nat s0, nat s1\]():Array2[\T,0,s0,0,s1\] =
- in the old line, not in the new: `:2834`, `Library/FortressLibrary.fss:2455`, `Vector[\Int,3\]`
- every check passes

## Row 729, rewritten (1115 characters)
- lengths: row 1115 of 1,200, claim 284 of 300, notes 636 of 700
- reproducer `ProjectFortress/tests/ArrayFactoryAbstractNumber.fss`: exists
- citations:
  - `Library/FortressLibrary.fsi:1645` (Library/FortressLibrary.fsi): no word to check; reads: trait Vector[\T extends { Number, MultiplicativeRing[\T\] }, nat s0\]
  - `Library/FortressLibrary.fsi:1757` (Library/FortressLibrary.fsi): no word to check; reads: trait Matrix[\T extends { Number, MultiplicativeRing[\T\] }, nat s0, nat s1\]
  - `Library/FortressLibrary.fss:2597-2608` (Library/FortressLibrary.fss): no word to check; reads: array1[\T, nat s0\]():Array1[\T,0,s0\] =
  - `Library/FortressLibrary.fss:2984-2995` (Library/FortressLibrary.fss): no word to check; reads: array2[\T, nat s0, nat s1\]():Array2[\T,0,s0,0,s1\] =
- in the old line, not in the new: `:2953-2965`, `Library/FortressLibrary.fsi:1613`, `Library/FortressLibrary.fss:2572-2586`, `Vector[\Number,2\]`
- every check passes

## Row 674, rewritten (993 characters)
- lengths: row 993 of 1,200, claim 288 of 300, notes 551 of 700
- reproducer `ProjectFortress/tests/RangeSubscriptPositions.fss`: exists
- citations:
  - `Library/FortressLibrary.fsi:1336` (Library/FortressLibrary.fsi): holds (bounds())[r]; reads: %(bounds())[r]% in order to narrow and bounds check the range %r%
  - `Library/FortressLibrary.fss:2398` (Library/FortressLibrary.fss): words moved: SimpleIndexValuePairs at :1991,3791; reads: r' = self.bounds.narrowToRange(r) (*'*)
  - `Library/FortressLibrary.fss:2456` (Library/FortressLibrary.fss): words moved: SimpleIndexValuePairs at :1991,3791; reads: r' = self.bounds.narrowToRange(r) (*'*)
  - `Library/FortressLibrary.fss:2691` (Library/FortressLibrary.fss): words moved: SimpleIndexValuePairs at :1991,3791; reads: r' = self.bounds.narrowToRange(r)
  - `Library/FortressLibrary.fss:3117` (Library/FortressLibrary.fss): words moved: SimpleIndexValuePairs at :1991,3791; reads: r' = self.bounds.narrowToRange(r)
  - `Library/FortressLibrary.fss:3799` (Library/FortressLibrary.fss): words moved: SimpleIndexValuePairs at :1991,3791; reads: self.g.bounds.narrowToRange(r).map[\(I,E)\](fn (i:I):(I,E) => (i, self.g[i]))
  - `Library/FlatString.fss:117` (Library/FlatString.fss): no word to check; reads: rangeContains(r: Range⟦ZZ32⟧, c: Char):Boolean = self.javaIndexOf(c) ∈ self.bounds[r]
  - `Library/String.fss:309` (Library/String.fss): no word to check; reads: rr = self.bounds[r]     (* to raise a bounds error *)
- in the old line, not in the new: `.fss:1876-1885`, `:2257`, `:2537`, `:2948`, `:4211`, `Library/FortressLibrary.fsi:1292-1301`, `Library/FortressLibrary.fss:1405`, `compile-ladder/rung-generator-size/SKEPTIC.md`
- every check passes

## Row 54, rewritten (762 characters)
- lengths: row 762 of 1,200, claim 188 of 300, notes 422 of 700
- reproducer `none`: exists
- citations:
  - `Specification-1.0-frozen/basic/expressions/ranges.tex:18-19` (Specification-1.0-frozen/basic/expressions/ranges.tex): no word to check; reads: \emph{Range} &::=& \option{\emph{Expr}}\EXP{:}\option{\emph{Expr}}\options{\EXP{:}\option{\emph{Expr}}}\\
  - `Library/FortressLibrary.fss:2506` (Library/FortressLibrary.fss): words moved: SubArray2 at :2744,2811,2829; Col at :1883,2719,2721; Row at :2718,2723,2725; reads: object __SimpleSubArray1[\T, nat b0, nat s0, nat b_a, nat s_a\]
  - `Library/FortressLibrary.fss:2811` (Library/FortressLibrary.fss): words moved: __SimpleSubArray1 at :2470,2506,2516; Col at :1883,2719,2721; Row at :2718,2723,2725; reads: object SubArray2[\T, nat b0, nat s0, nat b1, nat s1,
  - `Library/FortressLibrary.fss:2833` (Library/FortressLibrary.fss): words moved: __SimpleSubArray1 at :2470,2506,2516; SubArray2 at :2744,2811,2829; Row at :2718,2723,2725; reads: object Col[\T, nat b0, nat s0\](mem: Array2[\T,b0,s0,0,1\])
  - `Library/FortressLibrary.fss:2844` (Library/FortressLibrary.fss): words moved: __SimpleSubArray1 at :2470,2506,2516; SubArray2 at :2744,2811,2829; Col at :1883,2719,2721; reads: object Row[\T, nat b1, nat s1\](mem: Array2[\T,0,1,b1,s1\])
  - `explorations/matrix-ad-probes/p03.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: nothing
- every check passes

## Row 56, rewritten (874 characters)
- lengths: row 874 of 1,200, claim 153 of 300, notes 570 of 700
- reproducer `none`: exists
- citations:
  - `Specification-1.0-frozen/basic/expressions/ranges.tex:18-19` (Specification-1.0-frozen/basic/expressions/ranges.tex): no word to check; reads: \emph{Range} &::=& \option{\emph{Expr}}\EXP{:}\option{\emph{Expr}}\options{\EXP{:}\option{\emph{Expr}}}\\
  - `Library/FortressLibrary.fss:2653` (Library/FortressLibrary.fss): no word to check; reads: trait Array2[\T, nat b0, nat s0, nat b1, nat s1\]
  - `Library/FortressLibrary.fss:2701-2717` (Library/FortressLibrary.fss): no word to check; reads: (*
  - `Library/FortressLibrary.fss:2720-2722` (Library/FortressLibrary.fss): no word to check; reads: (*
  - `Library/FortressLibrary.fss:2724-2726` (Library/FortressLibrary.fss): no word to check; reads: (*
  - `Library/FortressLibrary.fss:2719` (Library/FortressLibrary.fss): no word to check; reads: opr[_:TrivialOpenRange, i1:ZZ32]: Array[\T,ZZ32\] = Col(cast[\Array2[\T,0,s0,0,1\]\](self[(b0,i1)#(s0,1)]))
  - `Library/FortressLibrary.fss:2723` (Library/FortressLibrary.fss): no word to check; reads: opr[i0:ZZ32, _:TrivialOpenRange]: Array[\T,ZZ32\] = Row(cast[\Array2[\T,0,1,0,s1\]\](self[(i0,b1)#(1,s1)]))
  - `explorations/matrix-ad-probes/p03.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `:2563-2569`, `Library/FortressLibrary.fss:2544-2560`
- every check passes

## Row 169, rewritten (901 characters)
- lengths: row 901 of 1,200, claim 230 of 300, notes 533 of 700
- reproducer `none`: exists
- citations:
  - `Library/FortressLibrary.fss:2127` (Library/FortressLibrary.fss): no word to check; reads: opr[i:I]:=(v:E) : ()
  - `Library/FortressLibrary.fss:2226` (Library/FortressLibrary.fss): no word to check; reads: opr[i:I]:=(v:E):() = put(offset(i),v)
  - `Library/FortressLibrary.fss:2228` (Library/FortressLibrary.fss): no word to check; reads: opr[r:Range[\I\]]:=(a:Indexed[\E,I\]):() = do
  - `Library/FortressLibrary.fss:2689` (Library/FortressLibrary.fss): no word to check; reads: opr[x:ZZ32,y:ZZ32]:=(v:T):() = do self[ (x,y) ] := v end
  - `Library/FortressLibrary.fss:2701-2717` (Library/FortressLibrary.fss): no word to check; reads: (*
  - `Library/FortressLibrary.fss:2720-2722` (Library/FortressLibrary.fss): no word to check; reads: (*
  - `Library/FortressLibrary.fss:2724-2726` (Library/FortressLibrary.fss): no word to check; reads: (*
  - `explorations/run-c3/probes/lift_c3.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `:2081`, `:2083`, `:2532`, `:2544-2560`, `:2563-2569`, `Library/FortressLibrary.fss:1983`
- every check passes

## Row 109, rewritten (846 characters)
- lengths: row 846 of 1,200, claim 63 of 300, notes 694 of 700
- reproducer `none`: exists
- citations:
  - `Library/FortressLibrary.fsi:1757-1770` (Library/FortressLibrary.fsi): words moved: pmul at :1652,1683; reads: trait Matrix[\T extends { Number, MultiplicativeRing[\T\] }, nat s0, nat s1\]
  - `Library/FortressLibrary.fsi:1652` (Library/FortressLibrary.fsi): holds pmul; reads: pmul(v: Vector[\T,s0\]): Vector[\T,s0\]
  - `Library/FortressLibrary.fsi:1683` (Library/FortressLibrary.fsi): holds pmul; reads: pmul[\ T extends { Number, MultiplicativeRing[\T\] }, nat k \]
  - `explorations/gap-ledger-probes/g23.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `:1609`, `Library/FortressLibrary.fsi:1720-1731`, `Vector.pmul`
- every check passes

## Row 292, rewritten (1095 characters)
- lengths: row 1095 of 1,200, claim 217 of 300, notes 696 of 700
- reproducer `none`: exists
- citations:
  - `Specification-1.0-frozen/basic/expressions/aggregate.tex:152-170` (Specification-1.0-frozen/basic/expressions/aggregate.tex): no word to check; reads: An array of two
  - `Library/FortressLibrary.fsi:1824-1834` (Library/FortressLibrary.fsi): words moved: AnyVector at :1643,1646; AnyMatrix at :1755,1758; reads: trait Array3[\T, nat b0, nat s0, nat b1, nat s1, nat b2, nat s2\]
  - `aggregate.tex:153` (Specification/basic/expressions/aggregate.tex): words moved: Number at :154,165; reads: \marginnote{two or more -- Jan: I continue to disbelieve.}
  - `aggregate.tex:158-161` (Specification/basic/expressions/aggregate.tex): words moved: Number at :154,165; reads: Matrix types are written
  - `explorations/run-c4/probes/vocabulary/v01b_rank3plus.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/run-c4/probes/vocabulary/v01a_libfree.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `Library/FortressLibrary.fsi:1794-1804`, `two or more -- Jan: I continue to disbelieve`, `v01a_libfree.fss`
- every check passes

## Row 293, rewritten (1003 characters)
- lengths: row 1003 of 1,200, claim 163 of 300, notes 698 of 700
- reproducer `none`: exists
- citations:
  - `Library/FortressLibrary.fsi:1647` (Library/FortressLibrary.fsi): no word to check; reads: excludes { AnyMultiplicativeRing }
  - `Library/FortressLibrary.fsi:1759` (Library/FortressLibrary.fsi): no word to check; reads: excludes { AnyMultiplicativeRing }
  - `explorations/run-c4/probes/vocabulary/v01c_matrix_times.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/run-c4/probes/vocabulary/v02_ring_excluded.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/run-c4/probes/vocabulary/v02b_ring_juxt.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `:1720-1722`, `Library/FortressLibrary.fsi:1602-1604`, `v02_ring_excluded.fss`, `v02b_ring_juxt.fss`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 721: row 721: rewritten (958 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 729: row 729: rewritten (1115 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 674: row 674: rewritten (993 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 54: row 54: rewritten (762 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 56: row 56: rewritten (874 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 169: row 169: rewritten (901 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 109: row 109: rewritten (846 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 292: row 292: rewritten (1095 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 293: row 293: rewritten (1003 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 9 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 9 lines, 0 failing, every check passes.
