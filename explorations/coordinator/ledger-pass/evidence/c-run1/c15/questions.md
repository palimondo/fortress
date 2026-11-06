# c15 questions

No row of this chunk is given the disposition measure.

## XXX tests believed to pass now

None. Each of this chunk's walk `XXX` reproducers (rows 364, 395, 511, 611, 722, 774, 807) was run green, still failing as it asserts, by the newest gate a12ab5c60, which holds for the base (evidence). The compiled `XXXTupleVarFieldCompiledRungC.test` (row 397) was not run; nothing since the row touches the forwarding code's `arity` (`CodeGen.java:791`).

## For the prober, optional

- Row 342: the row's reproducer is now `none`. A cold-cache run of `explorations/apl/rung-5/v04_lib.fss` (walk, fresh private caches folder, then the same command again warm) would tell whether it can serve as the row's probe again: refused cold and run warm gives that probe path as the reproducer; run on both gives `none` as written.
