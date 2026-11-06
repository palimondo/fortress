# Questions, chunk c2

No row of this chunk is a measure.

`XXX` tests believed to pass now: none. `XXXSeqMidpointRungO` and `XXXSeqHashBoundsRungO` (row 453) still meet the unchanged midpoint and `#` code at `Library/CompilerLibrary.fss:361-444` at c124c6b65.

Optional, for a later prober (not a disposition): row 318 now has reproducer `none`, because no test runs a stubbed operator. A compiled test such as `pick(true) DIV pick(false)` with `pick(b: Boolean): IntLiteral = if b then 4 else 9 end` (the shape of `ProjectFortress/library_tests/IntLiteralArithRung7.fss`), under `run_out_contains=REACHED` as an `XXX` pair, would give the row a reproducer.
