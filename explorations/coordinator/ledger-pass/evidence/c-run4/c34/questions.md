# c34: questions for the prober

No row of this chunk is given to measure.

## XXX tests believed to pass now

None. The chunk's walk `XXX` tests (`XXXInheritedOverload`, `XXXIndexBesideTupleOverloadWalk`, `XXXEmptyGroupSumRungF`, `XXXSubscriptImplicitStridedRange`) ran green as expected failures at the newest gate a12ab5c60, which holds for the base. The compiled ones (`compiler_tests/XXXRangeInRungJ.fss`, `XXXRangeEqRungJ.fss`) were not run here; their cited compiler-library lines (`CompilerLibrary.fss:311`, `CompilerLibrary.fsi:111`, `CompilerAlgebra.fss:26`) still hold at c124c6b65, so no reason to think they pass.

## For the prober, optional

Row 255's reproducer was run without `explorations/apl/base` on the source path ("Could not find an implementation for API AplCore"), so the evidence's run says nothing about the row. If a run is wanted: from `explorations/apl/rung-6`, with `FORTRESS_SOURCE_PATH=".:$FORTRESS_HOME/explorations/apl/base:$FORTRESS_HOME/ProjectFortress/LibraryBuiltin:$FORTRESS_HOME/Library:$FORTRESS_HOME/ProjectFortress/test_library"`, `bin/fortress w02_lib.fss`. Expected: case (b) passes, with the workaround in place; that is why the rewrite makes the reproducer `none`.
