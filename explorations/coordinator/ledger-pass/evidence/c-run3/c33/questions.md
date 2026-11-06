# c33 questions for the prober (c-run3, base c124c6b65, gate a12ab5c60 holds)

Save each program under `tmp/ledger-pass/c-run3/probe/` and run it from there under walk, with the main tree's build, on a fresh private caches folder (row 342: a warm cache skips walk's overload check, so a load refusal shows only cold). Each command is `cd /home/user/fortress/tmp/ledger-pass/c-run3/probe && /home/user/fortress/bin/fortress FILE.fss; echo "exit $?"` unless it says otherwise.

## Row 30: does `SUM` over a user `Number` whose `+` is top-level still fall back silently to a library overload?

Since the row's run, the number tower became flat and `Number` has no catch-all operators (P-43), so the library overload the old `6.0` came from may be gone; the outcome may now be a dispatch error, a load refusal (an object that extends `Number` directly), or `W(6.0)`.

Program `G10.fss` (the row's probe, from `git show e879b6a44^:explorations/gap-ledger-probes/g10.fss`, renamed):

```
component G10
import List.{...}
export Executable
object W(d: RR64) extends Number
  getter asString(): String = "W(" d ")"
  asFloat(self): RR64 = d
end
opr +(a: W, b: W): W = W(a.d + b.d)
run(): () = do
  xs = <|[\W\] W(1.0), W(2.0), W(3.0)|>
  println("user top-level +: " (W(1.0) + W(2.0)))
  println("SUM over W (top-level opr +) = " (SUM[x <- xs] x))
end
end
```

Outcomes:
- `SUM ... = 6.0`: the row stands; rewrite it with this program as its probe and pin the library `+` that `SUM` reached.
- `SUM ... = W(6.0)`: the library's reduction now sees the user's top-level `+`; close is owed (find the commit), or rewrite to POSITIVE-VERIFIED beside rows 31 and 215.
- a dispatch error (`Failed to find any matching overload`) at the `SUM`: the fallback is no longer silent; rewrite the claim to "library generic code cannot see a top-level `opr` and the reduction fails to dispatch", dropping "silently falls back" and "the silent fallback is a library bug".
- a refusal at load naming `W` or `Number`: the probe no longer reaches the claim; rewrite the probe with `W` extending an algebraic trait the library's `SUM` uses (`AdditiveMonoid`-like) and ask again.

## Row 145: does a bare `false AND bump()` still run `bump` once under walk, and `false AND (fn () => bump())` zero times?

The row's reproducer exits 255 as the evidence ran it, because `AplCore` is not on the default source path. The program is the tree's `explorations/apl/rung-3/t03_and.fss`, unchanged. Command (from `explorations/apl/rung-3/REPORT.md`, "How to run"):

```
export FORTRESS_HOME=/home/user/fortress; export FORTRESS_THREADS=1
export FORTRESS_SOURCE_PATH=".:$FORTRESS_HOME/explorations/apl/base:$FORTRESS_HOME/ProjectFortress/LibraryBuiltin:$FORTRESS_HOME/Library:$FORTRESS_HOME/ProjectFortress/test_library"
cd $FORTRESS_HOME/explorations/apl/rung-3 && $FORTRESS_HOME/bin/fortress t03_and.fss; echo "exit $?"
```

Outcomes:
- `false AND bump() = false, bump ran 1 time(s)` and the thunk form `0 time(s)`: the row stands; rewrite it with the reproducer cell kept and the command's `FORTRESS_SOURCE_PATH` in its notes, the declarations pinned at `Library/FortressLibrary.fsi:2649` and `:2651`, and the APL `⍋` story cut to one clause.
- `bump ran 0 time(s)` for the bare form: walk now takes the thunk overload for a bare right operand, against the row; rewrite to the measured behaviour and check it against `conditionalops.tex:13-27`.
- any other failure: say which; the reproducer needs replacing by a program free of `AplCore` (the row needs no APL: `false AND bump()` on a `var count`).

## Row 164: does an untyped lambda still take the first declared of two overloads that differ only in a function parameter's arrow type?

Walk's dispatch has changed much since run-c3's run (`a0a0c7c99`'s parent). Program `G158.fss` (from `git show a0a0c7c99^:explorations/run-c3/probes/g158_untyped_overload/G158.fss`):

```
component G158
export Executable
vec(n: ZZ32, f: ZZ32 -> RR64): Array[\RR64,ZZ32\] = array[\RR64\](n).fill(f)
apply(f: Array[\RR64,ZZ32\] -> Array[\RR64,ZZ32\], v: Array[\RR64,ZZ32\]): String = "vector-result overload: " f(v)
apply(f: Array[\RR64,ZZ32\] -> RR64, v: Array[\RR64,ZZ32\]): String = "scalar-result overload: " f(v)
run(): () = do
    v = vec(3, fn (i: ZZ32): RR64 => 1.0 i)
    println "(1) typed scalar lambda   -> " apply(fn (x: Array[\RR64,ZZ32\]): RR64 => SUM x, v)
    println "(2) typed vector lambda   -> " apply(fn (x: Array[\RR64,ZZ32\]): Array[\RR64,ZZ32\] => x, v)
    println "(3) untyped scalar lambda -> " apply(fn (x) => SUM x, v)
    println "(4) untyped vector lambda -> " apply(fn (x) => x, v)
  end
end
```

Outcomes:
- `(3) untyped scalar lambda -> vector-result overload: 3.0`: the row stands; rewrite with this program as its probe (or an `XXX` test asserting `scalar-result overload` for line 3) and a pinned site in walk's dispatch of a `FnExpr` argument.
- `(3) ... scalar-result overload: 3.0`: the gap is gone on this shape; find the commit and close, or rewrite to POSITIVE-VERIFIED beside row 171.
- a load refusal of the pair (two overloads that differ only in an arrow's result type): the claim changes to that refusal; rewrite.
- a dispatch error at (3): the failure is no longer silent; rewrite the claim to it.

## Row 240: does an overloaded function whose declared result is `Any` still fail every call with `Failed to find any matching overload` under walk?

Row 157 (`Any` as a parameter or a `nat`-generic function's result) is fixed, and walk's overload code changed since. Program `A01AnyResult.fss` (from `git show e879b6a44^:explorations/gap-ledger-probes/apl-merge/a01_any_result.fss`):

```
component A01AnyResult
export Executable

anyres[\nat s\](f: ()->Any, v: Vector[\RR64,s\]): Any = 1.5
anyres[\nat r, nat c\](f: ()->Any, m: Matrix[\RR64,r,c\]): Any = 2.5

objres[\nat s\](f: ()->Any, v: Vector[\RR64,s\]): Object = 1.5
objres[\nat r, nat c\](f: ()->Any, m: Matrix[\RR64,r,c\]): Object = 2.5

run(): () = do
    v: Vector[\RR64,2\] = array[\RR64\](2).fill(fn (i: ZZ32): RR64 => 1.0 i)
    m: Matrix[\RR64,2,2\] = array[\RR64\](2,2).fill(fn (i: ZZ32, j: ZZ32): RR64 => 1.0 ((2 i) + j))
    f = fn (): Any => 1.0
    println("(a) the same two members with an Object result:")
    println(("  objres(f, v) = " objres(f, v) "   objres(f, m) = " objres(f, m)))
    println("(b) the two members with an Any result:")
    println(("  anyres(f, v) = " anyres(f, v)))
  end
end
```

Outcomes:
- (a) prints `1.5` and `2.5`, (b) fails `Failed to find any matching overload`: the row stands; rewrite with this program as its probe and the site pinned (the candidate list prints `Any` unqualified).
- (b) prints `1.5`: fixed; find the commit and close, naming this program or a test; then row 258's sentence "`Any` as the result kills the family's dispatch (row 240), so `Object` is the only declarable type" is false and row 258 needs a rewrite (which is in this chunk).
- (a) fails too: the failure is not about `Any`; rewrite the claim to the `nat`-generic family.

## Row 297: is the `^T` pair over `Matrix[\RR64,r,c\]` and the plain `Array[\RR64,(ZZ32,ZZ32,ZZ32)\]` still refused at load?

Walk's load check of generic pairs was rewritten after the row's run (`6d187d069`, `14e91723f`, `c41c3d2b0`). The refusal's text still exists (`OverloadedFunction.java:585`). The row's probes import a gone library (`FlatArrays2`); this program needs none. Program `V18Pair.fss`:

```
component V18Pair
export Executable

opr (m: Matrix[\RR64,r,c\])^T[\nat r, nat c\]: Matrix[\RR64,c,r\] = m.t()
opr (t: Array[\RR64,(ZZ32,ZZ32,ZZ32)\])^T: Array[\RR64,(ZZ32,ZZ32,ZZ32)\] = t

run(): () = do
    m = array[\RR64\](2, 3).fill(fn (i: ZZ32, j: ZZ32): RR64 => 1.0 (3 i + j))
    t = array[\RR64\](2, 2, 3).fill(fn (p: ZZ32, i: ZZ32, j: ZZ32): RR64 => 1.0 (6 p + 3 i + j))
    println "(1) m^T = " (m^T)
    println "(2) t^T = " (t^T)
  end
end
```

Outcomes:
- refused at load, `has a parameter with generic type, at least one pair of parameters must have excluding types` (or another overloading refusal): the row stands; rewrite with this program as its probe and pin `OverloadedFunction.java:585`. Its diagnosis "because `Array[\E,I\]` carries no `Rank`" should then name instantiation exclusion too: `Matrix` extends a rank-2 instantiation of `Array`, which excludes the rank-3 one (row 416, pairs.txt).
- runs and prints both: closed by a later walk change; find the commit and close, or keep as POSITIVE-VERIFIED; row 97's `siblings: 297` then goes.
- a different error: say which.

## Row 444: does walk still accept and dispatch a dotted method's overloading across inheritance that the Meet Rule refuses?

Walk's load check changed after the row was written (`6d187d069`, `14e91723f`, `c41c3d2b0`); the size-arm variant is generic and may now be refused. Two programs, from `git show ab067d9b6^:explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/Sk2InheritedPlain.fss` and `Sk2Inherited.fss`:

```
component Sk2InheritedPlain
export Executable

trait Tm
    m(x: ZZ32): ZZ32 = 1
end
object Om extends Tm
    m(x: Any): ZZ32 = 2
end

run(): () = do
    z: ZZ32 = 5
    println(Om.m(z))
    println(Om.m("s"))
  end

end
```

```
component Sk2Inherited
export Executable

trait Tm
    m[\nat n\](x: ZZ32): ZZ32 = 1
end
object Om extends Tm
    m(x: Any): ZZ32 = 2
end

run(): () = do
    z: ZZ32 = 5
    println(Om.m(z))
    println(Om.m("s"))
  end

end
```

Outcomes:
- both print `1` and `2`: the row stands; rewrite it with an `XXX` test under `ProjectFortress/tests/` (`load_exception_contains=Invalid overloading of m`) as reproducer, and drop its sentence "Diamond: `XXXDottedMethodMeetInheritedWalk` (batch 12 W's skeptic)": that test is row 735's shape (sibling traits, abstract beside a body) and is now row 735's reproducer.
- the plain one runs, the size one is refused: rewrite, dropping the claim's size variant.
- both are refused with an overloading error: fixed; find the commit and close.

## XXX tests believed to pass now

None. `XXXDottedMethodMeetInheritedWalk` is green as an expected failure under gate `a12ab5c60`, so it still fails as it asserts.
