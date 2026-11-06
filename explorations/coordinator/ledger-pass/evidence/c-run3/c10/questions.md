# c10: questions for the prober

## Row 135: does `BIG UNION` over a generator of maps still need its static arguments under walk?

Commit `20474c144` (in the base) makes walk instantiate an unwritten big operator by the declared type of its value, else by its elements' join. The row's failing probe has a declared type, so it may now pass; no run since says so.

Program, whole (the row's old probe, `git show 22ea0cd90^:explorations/run-b2/probes/g1e_bigunion1.fss`), with an untyped second binding added:

    component G1eBigUnion1
    import Map.{...}
    import List.{...}
    export Executable

    run(): () = do
        s1: Map[\String,ZZ32\] = {[\String,ZZ32\] "a" |-> 1, "b" |-> 2 }
        s2: Map[\String,ZZ32\] = {[\String,ZZ32\] "a" |-> 10, "c" |-> 30 }
        ss: List[\Map[\String,ZZ32\]\] = <|[\Map[\String,ZZ32\]\] s1, s2 |>
        b: Map[\String,ZZ32\] = BIG UNION[ m <- seq(ss) ] m
        println("typed = " b)
        c = BIG UNION[ m <- seq(ss) ] m
        println("untyped = " c)
      end
    end

Path: walk. Command from the main tree: `bin/fortress tmp/ledger-pass/c-run3/c10/G1eBigUnion1.fss` (the file named after its component).

Outcomes:
- Both lines print the map (`{a|->1, b|->2, c|->30}` or with `a|->10`): the row is fixed by `20474c144`. Close: `135	20474c144	none	no test asserts a map's BIG UNION without static arguments; the probe's run under walk`. (A test such as `UnwrittenMapBigUnionWalk` would be the better close; that is a tree change.)
- `typed` prints and `untyped` fails with `Failed to find any matching overload ... EmptyMap[\BOTTOM,BOTTOM\]` or another message: rewrite the claim to the untyped binding only (with no declared type the join of the elements is not reached for `Map`), quoting the message, the typed half named as working.
- Both fail with the row's message: the row stands; rewrite only to replace the gone probe with this program and its output in the notes.

## Row 747: does the compiled checker still type `fail`'s result-only `T` at `Any` in the `else` of an `if` with a generator clause inside a reduction's body?

The row's only site, `strToInt`, now writes `fail[\ZZ32\]` (`Library/FortressLibrary.fss:4597`), so the distance stage no longer shows the message, and the compiled path refuses the shape in a program first ('Variable __cond is not defined', `compiler_tests/XXXIfGeneratorClause.test`). Checker commits since the row was written (`0856f3e6a`, which retries a call written as another call's argument against each declaration's parameter type; `2b1cd8e63`) may have changed the outcome.

Program: a scratch copy of the base's `Library/FortressLibrary.fss` with line 4597's `fail[\ZZ32\](` written `fail(`, nothing else changed.

Path: compiled checker, the count stage on `FortressLibrary` (`references/compiler.md`, the count stage), in a seeded worktree, not the main tree.

Outcomes:
- The count stage reports 'ZZ32->ZZ32 is not applicable to an argument of type Any' at that site: the gap stands; rewrite with this recipe as the reproducer in the notes (reproducer `none`), the claim naming the shape, not `strToInt`, and the workaround `fail[\T\]` written.
- The count stage reports no error there: the gap is gone on this shape; close by the commit that a bisect over `0856f3e6a` and `2b1cd8e63` names, test `none` with the reason "the count stage on the edited copy", or RETIRED if no commit is found.
- Another error at that site: rewrite the claim to that message.

## `XXX` tests that I believe now pass

None. Row 49's `ProjectFortress/tests/XXXArrayLiteralArgRungC.fss` ran green as an expected failure in the newest gate, `a12ab5c60`, which holds for the base.
