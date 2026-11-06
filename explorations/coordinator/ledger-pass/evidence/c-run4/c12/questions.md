# Questions for the prober, chunk c12

## Row 100 (walk)

Question: under walk at the base, does a carrier that mixes in `ZeroIndexed` and `DelegatedIndexed`, defines `opr[ts: Generator[\ZZ32\]]` but not the abstract `opr[r: Range[\ZZ32\]]` (now `Library/FortressLibrary.fss:2055`), still load, and does `z[0#2]` still stop with "has neither body nor def instanceof Method"? Walk's load check of an inherited abstract method left without a body (row 649, fixed) may now refuse the object at load instead.

Program (the old probe `explorations/gap-ledger-probes/g22.fss`, from `git show e879b6a44^:explorations/gap-ledger-probes/g22.fss`), saved as `G22.fss`:

```
component G22
export Executable

object Z(v: Array[\RR64,ZZ32\]) extends { ZeroIndexed[\RR64\], DelegatedIndexed[\RR64,ZZ32\] }
    getter indices(): Generator[\ZZ32\] = 0 # |v|
    opr |self|: ZZ32 = |v|
    opr [i: ZZ32]: RR64 = v[i]
    opr [ts: Generator[\ZZ32\]]: String = "user generator subscript"
end

run(): () = do
    z = Z(array[\RR64\](3).fill(fn i => 1.0 (i + 1)))
    println("z[1] = " z[1])
    println("z[0#2] = " (z[0#2]))
  end
end
```

Command, from the main tree: `bin/fortress walk G22.fss`.

Outcomes:
- `z[1] = 2.0`, then the `** bug! MethodClosure _[_](r:Range...) has neither body nor def instanceof Method` stop: the row stands; rewrite its notes to pin `Library/FortressLibrary.fss:2055` at c124c6b65 and name this run.
- Refused at load, "Object Z does not define an abstract method declared in type ZeroIndexed" (or similar): the silent failure is gone, and the row becomes a rewrite: claim "a carrier that mixes in `ZeroIndexed` and `DelegatedIndexed` must define the abstract `opr[r: Range[\ZZ32\]]`, which the mix-in's documentation does not say; walk refuses the carrier at load", status unchanged (silent cell, review-queue item 265), workaround as now.
- `z[0#2] = user generator subscript`: the defect is gone; close it with the commit that changed it and this program as a new test under `ProjectFortress/tests/`.

## Row 221 (walk)

Question: does the row's reproducer `explorations/apl/rung-1/r13_generator.fss` still show the trap when run with the APL base on the source path? Run as the evidence ran it, from its folder, it stops before running: "Could not find an implementation for API AplCore on path ..." (exit 255), since `AplCore` lives in `explorations/apl/base/`.

Program: the file `explorations/apl/rung-1/r13_generator.fss`, whole, as in the tree.

Command, from the main tree:
`cd explorations/apl/rung-1 && FORTRESS_SOURCE_PATH=../base:.:/home/user/fortress/ProjectFortress/LibraryBuiltin:/home/user/fortress/Library:/home/user/fortress/ProjectFortress/test_library /home/user/fortress/bin/fortress walk r13_generator.fss`

Outcomes:
- It prints `|v| = 5`, `SUM[u <- v] u = 14.0`, and `+/m = 6 22` beside `SUM over seq(m) = 28.0`: the row stands; rewrite its notes to give this command (the reproducer needs the APL base on `FORTRESS_SOURCE_PATH`) and pin `Array2` at `Library/FortressLibrary.fss:2653-2655` at c124c6b65.
- It runs, but a reduction over the matrix no longer sums all cells: the design limit is gone; a close needs the commit, and the row's claim is answered.
- It still fails to load, or fails elsewhere: the reproducer is broken; the row becomes a rewrite with reproducer `none` and the failure in its notes, or a new probe.

## Row 694 (compiled checker)

Question: at the base, after 21 checker commits since the row's measurement at a1a75716a, does `fortress typecheck` still refuse `B.f(3, 4)` as an ambiguous coercion where `B`'s `override f(x: Number, y: ZZ32)` overrides `A`'s `f(x: ZZ32, y: ZZ32)`?

Program, saved as `OverrideCoerceChoice.fss`:

```
component OverrideCoerceChoice
export Executable

trait A
    f(x: ZZ32, y: ZZ32): String = "A"
end

object B extends A
    override f(x: Number, y: ZZ32): String = "B"
end

run(): () = println(B.f(3, 4))
end
```

Command, from the main tree: `bin/fortress typecheck OverrideCoerceChoice.fss`; and, for the walk half, `bin/fortress walk OverrideCoerceChoice.fss`.

Outcomes:
- typecheck: "Ambiguous coercion in method invocation B.f ... (ZZ32, ZZ32)->String; (Number, ZZ32)->String", walk prints `B`: the row stands. Rewrite its notes: the measurement at c124c6b65, and the note "Row 650 stops the compile, so no compiled test can show it" is wrong, since a `typecheck` compiler test (as `XXXOverrideGenericReturnTypeNotSubtype`) needs no code generator: the reproducer becomes a new expected-failure `typecheck` test with `typecheck_err_contains=Ambiguous coercion`.
- typecheck exits 0: the defect is fixed; close the row with the commit that fixed it (bisect over a1a75716a..c124c6b65 in `scala_src/`) and this program as a `typecheck` test.
- any other message: rewrite the claim to that message.

## XXX tests believed to pass now

None. The chunk's walk `XXX` tests (`XXXAbstractMethodUndefinedGenericWalk`, `XXXOverrideObjectExpressionOverParamWalk`, `XXXAbstractMethodGenericBodyWalk`) ran green in the newest gate, which holds for the base, so each still fails as it asserts; the compiled ones (`XXXOverrideModifierCodeGeneration`, `XXXAbstractMethodCoveredPairsGeneric`) cite code unchanged at the base.
