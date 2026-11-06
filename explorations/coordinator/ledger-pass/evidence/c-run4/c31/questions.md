# Questions for the prober, chunk c31

## Row 691: does the compiled path still drop a generic call's extra arguments, now that `fortress compile` bounds an unbounded type parameter by `Any`?

The row's numbers were measured on a1a75716a, under the bound `Object`. Commit 1bc0a9083 (2026-10-30) moved `fortress compile` to the bound `Any` and rewrote the row from the tuple case only (`compile-ladder/rung-bound-any/REPORT.md` row `IdTuple`); the four-argument call itself was not run again, and the row's reproducer is `none`.

Program, compiled path, `tmp/probe691/ExtraArgsGeneric.fss`:

```
component ExtraArgsGeneric
export Executable

object K(i: ZZ32) end

g[\T\](a: K, b: K, c: K): ZZ32 = 900 + 100 a.i + 10 b.i + c.i

run(): () = do
    a = K(1)
    println(g(a, a, a, a))
  end

end
```

Command, from the main tree: `cd tmp/probe691 && ../../bin/fortress compile ExtraArgsGeneric.fss && ../../bin/fortress run ExtraArgsGeneric`

Outcomes:
- compiles and prints `1011`: the row stands as written; keep its line, and give it a reproducer (an `XXX` compile test asserting the refusal, which a later change of the tree writes); the line can then name it.
- the compile refuses `g(a, a, a, a)` (not applicable / arity): the generic half is fixed by 1bc0a9083 or a later commit; rewrite the claim to the juxtaposition half alone (`a(b)(c)(d)` on a generic ternary `opr juxtaposition`), which then needs its own run, or close if it too is refused.
- anything else (crash, a different number): rewrite the claim to what it does.

## Row 751: does the compiled checker still accept `apply2(g)` after 396e4ed8d (where-clause constraints checked in a comprises clause's opening) and 372b9bf6a?

Measured on 3aea3da53 and rung A's tree (2026-10-17); the checker's opening code changed after (396e4ed8d, 372b9bf6a, 5b11849c6, 108ab82d6, 1bc0a9083), and the reproducer is `none`.

Program, checker only, `tmp/probe751/ApplyTwoOpen.fss` (shapes from `compiler_tests/NatOpenChecker.fss` and the row's claim):

```
component ApplyTwoOpen
export Executable

trait NatParamT comprises { Nt[\n\] } where [\nat n\]
end
value object Nt[\nat n\] extends NatParamT end

g(i: ZZ32): NatParamT = if i = 1 then Nt[\1\] else Nt[\2\] end
two[\nat n\](a: Nt[\n\], b: Nt[\n\]): ZZ32 = n
apply2[\nat n\](f: ZZ32 -> Nt[\n\]): ZZ32 = two(f(1), f(2))

run(): () = println(apply2(g))

end
```

Commands, from the main tree: `cd tmp/probe751 && ../../bin/fortress typecheck ApplyTwoOpen.fss`; and for walk's side, `../../bin/fortress ApplyTwoOpen.fss`.

Outcomes:
- typecheck prints no error: the row stands; keep its line (a refusal `XXX` compile test would be its reproducer, a change of the tree).
- typecheck refuses `apply2(g)` (not applicable, or 'Cannot unify'): fixed in the tree; close, naming the first commit between 24db899fa and the base at which the refusal appears, test `none` (no gated test asserts it) unless one is found.
- the program fails to parse or load for another reason: the probe's shape is wrong; report the message, and the row stays open unmeasured.

## XXX tests that may now pass

- none believed to pass. The XXX tests of rows 592 (`tests/XXXInferThroughBoundWalk.fss`), 712, 714 and 776 (`compiler_tests/XXXInferCallerTwoGroundBoundsClosedTrait.test`, `XXXInferUnfixedSelfBoundedParam.test`, `XXXStaticArgBoundNestedCall.test`) are gated; the newest gate a12ab5c60 holds for the base, so each still fails as it asserts.
