# Mechanical check of c32, the judge's files, base c124c6b65

## Row 37, rewritten (806 characters)
- lengths: row 806 of 1,200, claim 144 of 300, notes 502 of 700
- reproducer `none`: exists
- citations:
  - `Library/FortressLibrary.fss:3218-3226` (Library/FortressLibrary.fss): holds trait Monoid; reads: (*************
  - `explorations/spec-probes/p5_ring.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `Library/FortressLibrary.fss:3032`
- every check passes

## Row 101, rewritten (1031 characters)
- lengths: row 1031 of 1,200, claim 186 of 300, notes 686 of 700
- reproducer `none`: exists
- citations:
  - `Specification-1.0-frozen/basic/overloading.tex:99-105` (Specification-1.0-frozen/basic/overloading.tex): no word to check; reads: 
  - `Library/IntMap.fss:738` (Library/IntMap.fss): no word to check; reads: opr BIG UNION[\Val\]() : BigReduction[\IntMap[\Val\],IntMap[\Val\]\] =
  - `Library/PrefixMap.fss:32` (Library/PrefixMap.fss): holds PrefixSet.{...}; reads: import PrefixSet.{...}
  - `Library/PrefixMap.fss:419` (Library/PrefixMap.fss): no word to check; reads: opr BIG UNION[\E extends StandardTotalOrder[\E\], F extends List[\E\],V\]():BigReduction[\PrefixMap[\E,F,V\],PrefixMap[\E,F,V\]\] =
  - `Library/PrefixSet.fss:425` (Library/PrefixSet.fss): no word to check; reads: opr BIG UNION[\E extends StandardTotalOrder[\E\], F extends List[\E\]\](): BigReduction[\PrefixSet[\E,F\],PrefixSet[\E,F\]\] =
  - `explorations/run-b/probes/c19_bigunion_collision.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/run-b/probes/worker/w17_bigunion_except.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `3aea3da53`, `Overloading of BIG CUP[\Key,Val\]():…/Library/Map.fss:197 and BIG CUP[\R extends StandardTotalOrder[\R\]\]():…/Library/Set.fss:115 fails because…`, `cdd25b95d`
- every check passes

## Row 199, rewritten (986 characters)
- lengths: row 986 of 1,200, claim 225 of 300, notes 675 of 700
- reproducer `none`: exists
- citations:
  - `explorations/apl/v1/rung-2/Rung2.out`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/apl/v1-probes/p15_box.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `.out`, `Rung2.out`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 37: row 37: rewritten (806 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 101: row 101: rewritten (1031 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 199: row 199: rewritten (986 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 3 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 3 lines, 0 failing, every check passes.
