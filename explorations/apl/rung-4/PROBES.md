<!-- Rung 4 probes: what a dfn can expand to.  Walk interpreter, JDK 25,
     FORTRESS_THREADS=1, source path base + Library + LibraryBuiltin +
     test_library.  Nine probes, u01-u09; every .out is the recorded run, every
     .out.N a recorded failed attempt.  Line numbers quoted from a .out.N refer
     to the version of the .fss that produced it, not to the file as it now
     stands. -->

# Rung 4 probes: the shape of a dfn

The rung's problem in one line: an APL dfn `{⍺+⍵}` wants to become a Fortress
function value over `(alpha, omega)`, dfns nest, and the host refuses to let an
inner function reuse an outer's parameter names. These nine probes ask which
form the interpreter does accept, and what rank 3 gives.

## u01 — nested lambdas and the shadowing rule

**Question.** Does a lambda whose parameters are `alpha`, `omega` nested inside
a lambda with the same two parameters compile? Does a different name work? Does
a `do`-block local of the parameter's name fail the same way?

**Answer.** No, yes, and yes. The nesting is rejected, a differently named inner
parameter is fine, and a local binding of the parameter's own name is rejected
by the same check. `_` is exempt.

**Verbatim** (`u01_name.out.0`):

```
u01_name.fss:17:22-25: Variable alpha is already declared.
u01_name.fss:17:35-38: Variable omega is already declared.
u01_name.fss:31:14-17: Variable omega is already declared.
```

Lines 17 are the inner lambda's parameters, line 31 the `do`-block local. The
check is `ExprDisambiguator.checkForShadowingVar`
(`ExprDisambiguator.scala:745-764`): it errors whenever the name is already an
explicit variable or function in the environment and is not `self`, `_` or
`outcome`.

**Running output** (`u01_name.out`): (b) a lambda parameter `omega` inside a
lambda parameter `x`, (d) `_` as both parameters of the inner lambda, (e) a
lambda with fresh names inside a top-level function — all three run.

## u02 — keyword parameters

**Question.** Does the interpreter accept keyword parameters, and does the
shadowing that `basic/declarations.tex:490` grants them work between nested
object expressions?

**Answer.** Keyword parameters are declaration-only. They parse and are accepted
on a top-level function, on a dotted method and in an object expression, but a
keyword ARGUMENT does not parse when it stands alone, the evaluator ignores it
when it does parse, defaults are never applied, and the spec's keyword-parameter
shadowing is refused by the same check as u01's.

**Verbatim** (`u02_kwd.out.0`, the full probe):

```
u02_kwd.fss:32:38-41: Variable omega is not defined.        (kw(omega = 3))
u02_kwd.fss:33:49-52: Variable alpha is not defined.
u02_kwd.fss:37:44-47: Variable omega is not defined.        (Box.m(omega = 7))
u02_kwd.fss:43:36-39: Variable alpha is already declared.   (nested ap)
u02_kwd.fss:43:61-64: Variable omega is already declared.
u02_kwd.fss:49:51-54: Variable omega is not defined.        (inner.ap(omega = 3))
```

`Expression.rats:559-562` orders `ParenthesisDelimited = Parenthesized /
ArgExpr`, and `( omega = 3 )` is already a legal `Parenthesized` expression, so
the `KeywordExpr` alternative of `ArgExpr` is never reached with a lone keyword
argument. With one plain argument in front it is reached and then dropped
(`u02_kwd.out.2`), and a call relying on defaults alone fails the same way
(`u02_kwd.out.1`, and the tail of `u02_kwd.out`):

```
** bug! The number of parameters (2) does not match with the number of arguments (1).
** bug! The number of parameters (2) does not match with the number of arguments (0).
```

**Running output** (`u02_kwd.out`): (a) (b) (c) the three declaration sites are
accepted; (d) the call dies as above.

## u03 — positional method parameters and fields in nested object expressions

**Question.** The spec permits a field or dotted-method declaration in an object
expression to shadow an enclosing declaration, and does not permit an ordinary
method parameter to. Which does the interpreter implement?

**Answer.** Neither. All four nestings are refused, the spec-legal field one
included; and two SIBLING object expressions in one block cannot both have a
field of the same name.

**Verbatim** (`u03_objp.out.0`):

```
u03_objp.fss:27:36-39: Variable alpha is already declared.          (a) nested ap params
u03_objp.fss:27:48-51: Variable omega is already declared.
u03_objp.fss:40:27-30: Top-level variable alpha is already declared. (b) nested fields
u03_objp.fss:41:27-30: Top-level variable omega is already declared.
u03_objp.fss:52:25-28: Variable alpha is already declared.          (c) ap param over a lambda param
u03_objp.fss:52:37-40: Variable omega is already declared.
u03_objp.fss:61:22-25: Top-level variable alpha is already declared. (d) field over a lambda param
u03_objp.fss:62:22-25: Top-level variable omega is already declared.
```

and (`u03_objp.out.1`), two object expressions side by side, neither inside the
other, the first's fields on line 51 and the second's on line 60:

```
u03_objp.fss:60:14-17: Top-level variable alpha is already declared.
u03_objp.fss:61:14-17: Top-level variable omega is already declared.
```

(a) and (c) are `checkForShadowingVar`; (b) and (d) are
`checkForShadowingTopVariable` (`ExprDisambiguator.scala:794-798`).

**Running output** (`u03_objp.out`): (e) nested object expressions with distinct
method parameter names, (f) one object expression with fields `alpha`, `omega`,
(g) nested object expressions with distinct field names.

## u04 — the frame stack

**Question.** If a dfn becomes a zero-parameter lambda and `⍺`/`⍵` are reads of
the top frame of a mutable stack that the caller pushes, does everything u01
refuses become possible, and what does it cost?

**Answer.** Yes to all of it, at about 3.6x-4.1x the cost of a two-parameter
lambda call in the walk interpreter (two runs of the probe, 3.63 and 4.10).

**Running output** (`u04_frame.out`): (a) a one-level call; (b) a dfn nested in
a dfn, both reading `⍺` and `⍵`, and the frame depth back to 0 afterwards;
(c) `⍺` present and absent distinguished by `typecase`; (d) factorial by
recursion through a `var` holding the function; (e) the timing —

```
  two-parameter lambda: 0.360703719 s, sum 400000
  through aplCall:      1.478968035 s, sum 400000
  ratio aplCall / lambda = 4.100229515515475
```

100 000 calls each, `nanoTime()`, one run, so the ratio is indicative and not a
benchmark. One false start (`u04_frame.out.0`): the frame object's readers were
first named `a()` and `o()`, which collide with its own `push(a, o)` —

```
u04_frame.fss:21:10: Variable a is already declared.
u04_frame.fss:21:18: Variable o is already declared.
```

so a dotted method's parameter may not take the name of a method of the same
object either.

## u05 — `⍺` and `⍵` as names and as terminals

**Question.** Are `⍺` (U+237A) and `⍵` (U+2375) legal Fortress identifiers? Can
they be sub-grammar terminals?

**Answer.** Not identifiers; yes terminals.

**Verbatim** (`u05_glyphid.out.0`), for the local binding `⍵ = 3` on line 6,
with `omega = 3` on line 5 accepted:

```
null/home/user/fortress/explorations/apl/rung-4/u05_glyphid.fss:6:5:
    Syntax Error
```

`⍺ = 3` fails identically at its own line. Both characters are Unicode category
So and the host's `Id` lexer takes letters and digits.

The terminal question cost more than the two attempts budgeted. Four
hand-written minimal grammars failed at the USE site
(`u05_glyphid.out.4`, `.out.7`, `.out.8`, `.out.9`, each
`Error occurred while instantiating and executing a temporary parser ... Syntax
Error` at the glyph's column). The control settles it: `u05_glyphid.out.6` fails
in exactly the same way for `⍳`, a glyph rungs 1-3 use daily, so those failures
were the throw-away grammar's shape and said nothing about `⍺` and `⍵`. Copying
rung 3's working `T02Syn.fsi` and adding two alternatives to `TExp` works on the
first try; that copy is `U05Syn.fsi`.

**Running output** (`u05_glyphid.out`):

```
(n) a number, no glyph  = 3
(a) alpha as a terminal = 300
(b) omega as a terminal = 600
(c) both in one phrase  = 60000
```

## u06 — a `:` guard in a production

**Question.** Can the dfn guard's colon be written in a sub-grammar rule?

**Answer.** Yes, with the backtick escape, and `::` works too. `U06Syn.fsi` is
the same copy of `T02Syn.fsi` with two top-level alternatives,
`` a:TExp SPACE `: SPACE b:TExp `` and the doubled one.

**Running output** (`u06_guard.out`):

```
(a) guard taken,     1 : 5  = 5
(b) guard not taken, 0 : 5  = 0
(c) a computed condition    = 7
(d) the :: spelling, 1 :: 5 = 5
(d2) the :: spelling, 0 :: 5 = 1
(e) no guard, plain 5       = 5
```

(d2) is the discriminator: the `::` rule yields 1 on a false condition and the
`:` rule yields 0, so the `::` rule is the one that fired.

## u07 — rank 3

**Question.** Does `array3` work with literal nats, is there a runtime-sized
rank-3 constructor, and does an `Array3` parameter join the
`RR64` / `Vector` / `Matrix` overload family?

**Answer.** Yes, yes (`array[\RR64\](x,y,z)`, `FortressLibrary.fss:1925`), and
yes — a runtime-built rank-3 array picks the rank-3 overload.

**Running output** (`u07_rank3.out`):

```
  t0.sizes = (2,3,4), |t0| = 24
  t.sizes = (2,3,4)
  t[1,2,3] = 23.0
  f(3.0)                 -> rank 0
  f(aplVec(5,...))       -> rank 1, 5 elements
  f(aplMat(2,3,...))     -> rank 2, 2x3
  f(array[\RR64\](2,3,4)) -> rank 3, 2x3x4
  f(array3 literal nats) -> rank 3, 2x3x4
  it is a Rank3
  it is neither AnyVector nor AnyMatrix
  t2[1,1,1] = 7.0, f(t2) -> rank 3, 2x2x2
```

Two facts behind that. There is no rank-3 analogue of `Vector`/`Matrix`:
`array1` and `array2` route numeric element types to `vector[]` and `matrix[]`
(`FortressLibrary.fss:2240-2246`, `2599-2603`), `array3` does not
(`2814-2819`), so the dispatch type is `Array3[\RR64,0,a,0,b,0,c\]` itself,
which reaches `Rank3` and so excludes `Rank1`, `Rank2`, `Number` and `String`
(`1592-1606`). And the library's `array3[\T,s0,s1,s2\](f)` overload
(`FortressLibrary.fss:2818`) declares its argument as `(ZZ32,ZZ32)->T`, a
two-argument function, which `Array3.fill` cannot want; `.fill` with a
three-argument function is the working route.

## u08 — planes and a permuted view

**Question.** Does the library give a plane of a rank-3 array as something a
`Matrix`-typed function accepts, or an axis permutation as a view? If not, does
a hand-written view work, and can a matrix be reshaped to rank 3 and back?

**Answer.** The library gives neither. `t.plane(k)` does not exist; `t.shift`
moves the origin, not an axis; the bracket subarray keeps rank 3 even one deep.
A six-line view object gives both, the plane one being a real `Matrix` that the
rank-2 overload accepts and that writes through. Reshape both ways is a loop
over the flat row-major order.

**Running output** (`u08_plane.out`):

```
  t.shift((1,0,0)) moves the ORIGIN: s[1,0,0] = 0.0
  t[(0,0,1)#(2,3,1)] = [0#2,0#3,0#1] ...
  the one-deep slice is STILL Rank3, not a matrix
  f(plane) -> rank 2, 2x3
  after plane[0,0] := ¯1, t[0,0,1] = -1.0 (it writes through)
  q.sizes = (3,2,4)
  t[1,2,3] = 123.0, q[2,1,3] = 123.0
  f(q) -> rank 3, 3x2x4
  c3[1,2,3] = 27.0, m[1,11] = 27.0
  f(c3) -> rank 3, 2x4x4
  back[1,11] = 27.0, f(back) -> rank 2, 2x16
```

and, as the last line, label (e):

```
com.sun.fortress.exceptions.ProgramError: u08_plane.fss:96:32-40:
Cannot find definition for method plane given receiver __DefaultArray3[\RR64,0,2,0,3,0,4\]
```

One false start (`u08_plane.out.0`): the view objects' `get`/`put`/`init0` first
named their index parameter `t`, which collides with `Matrix`'s own transpose
method `t()` —

```
u08_plane.fss:12:9: Variable t is already declared.
u08_plane.fss:13:9: Variable t is already declared.
u08_plane.fss:14:11: Variable t is already declared.
```

The reach of a dotted method declaration includes every object that extends the
trait (`basic/declarations.tex:441-452`), so a view object may not use any of
its supertrait's method names as a parameter name.

## u09 — dispatch on a function's result

**Question.** With `f` an untyped lambda, does `assemble(f(row0), f, m)` pick
the `RR64` overload or the `Vector` overload by the runtime rank of `f`'s
result? This is the planned mechanism for `f⍤1`.

**Answer.** Yes.

**Running output** (`u09_result.out`):

```
(a) f returns a scalar, +/ on the row:
  vector: 6 22 38
(b) f returns a vector, ⌽ on the row:
  matrix:  3  2 1 0
 7  6 5 4
11 10 9 8
(c) f is a lambda that itself dispatches on rank, ×2:
  matrix:  0  2  4  6
 8 10 12 14
16 18 20 22
```

Two false starts, both in the assembling code and not in the dispatch:
`u09_result.out.0` subscripted an `asif`-ascribed vector —

```
Unexpected method value {...}:OverloadedFunction when invoking method _[_]
given receiver (__DefaultVector[\RR64,4\] asif Vector[\RR64,4\])
```

and `u09_result.out.1` called `.get` on the same thing —

```
** bug! MethodClosure get(i:I):E ... has neither body nor def instanceof Method
```

Both disappear when the ascription is replaced by a call to a typed helper
(`aplNth`), which is the same rank dispatch again. So `asif` is a worse way to
reach a value's rank than an overload is.

## u10 — a value whose static type is `Any`

**Question.** The frame stack stores ⍺ and ⍵ as `Any`, so every dfn body and
every glyph lambda applies a library function to an `Any`. u09 showed that a
function's RESULT dispatches; does a declared `Any`?

**Answer.** Yes, everywhere it was asked: `aplShow`, `aplSumLast`, `aplRev`, the
operators `÷` and `+` over mixed ranks, a zero-parameter lambda held as `Any`
and called, a `requires` contract on a zero-argument reader (APL's VALUE ERROR
as a `CallerViolation`), and `(fn _ => r)(e)` where `e` is a call returning `()`
— the shape the default-⍺ rule wants.

**Running output** (`u10_any.out`): all seven parts. `fail[\T\](s)` also works
but PRINTS `FAIL: <message>` before it throws, so the library uses contracts and
not `fail`.

## u11 — the rung-4 library, called directly

The library half with no grammar in the way: the frame stack, ⍺ ⍵ ∇, the default
⍺, `aplBindLeft`, `aplTruthy`, the rank-3 carrier (build, show, `≢ ⍴ , ⊃`,
reshape in and out, `1 0 2⍉`), elementwise arithmetic on rank 3, the rank
operator in both valences over a matrix and over a rank-3 array, and a LENGTH
ERROR from cells of different shapes.

**Running output** (`u11_lib.out`) — everything passes, `sum ⍳10` = 45,
`100 sum ⍳10` = 145, frame depth back to 0, `0∘⌈` over `¯2 ¯1 0 1 2` = `0 0 0 1 2`.
Three recorded failures on the way: `.out.0` is the first run of the rank
operator, `.out.1` the same after the function parameter was given an arrow
type, `.out.2` after the dyadic overloads were given their own name — the same
"Failed to find any matching overload" each time, which is what sent the hunt to
u12–u16.

## u12 — `Any`, arrows, and the position of the function parameter

**Question.** u11's failure was `aplRank1(f, m)` with `f` a zero-parameter
lambda. u09 had passed a lambda to an `f: Any` parameter of an overloaded
function and it dispatched. Which of the three differences — zero parameters,
first position, or a discriminating SECOND parameter — is the obstacle?

**Answer.** None of them. A local family `g(f: Any, x: RR64) / (f: Any, v: Vector)
/ (f: Any, m: Matrix)` dispatches on a zero-parameter lambda in first position,
and so does the arrow-typed spelling, the one-parameter lambda, the
lambda-second spelling, and a mixed-arity family whose `r` is a nat parameter
above and a value parameter below (`u12_disp.out`).

## u13 — the same eleven signatures, local and imported

**Question.** Then is it the family itself?

**Answer.** The eleven signatures of `aplRank1` declared LOCALLY dispatch; the
same eleven imported from `AplCore` do not (`u13_rank.out.0`). The candidate
list the interpreter prints has one tell: every type is printed qualified
(`FortressLibrary.RR64`, `Vector[\FortressLibrary.RR64,s\]`) except `Any`,
which is printed bare. `u13_rank.out` is the same file against the fixed library.

## u14 — which spelling of a function parameter crosses an api

**Question.** Does a function parameter have to be `Any`?

**Answer.** No: an arrow type works. Three temporary families in `base/AplCore`
(quoted in the probe's header) asked it; `()->Any` dispatches, `Object` does not
— a closure is not an `Object` —

```
Failed to find any matching overload, args = (FnExpr … ()->Any …,
__DefaultMatrix[\RR64,2,2\]), overload = {
  aplTstC[\nat s\](f:FortressBuiltin.Object,v:Vector[\FortressLibrary.RR64,s\])…
```

(`u14_api.out.0`). The `Any` family of that probe was never reached in the run:
what pinned the cause was u15.

## u15 — `Any` as a RESULT type

**Question.** With an arrow-typed parameter the rank operator still would not
dispatch. Two suspects were left: the size of the family, and `Any` as the
declared RESULT.

**Answer.** The result. Four members with a `String` result dispatch over all
four ranks; two members with an `Any` result do not (`u15_any.out.0`):

```
Failed to find any matching overload, args = (FnExpr … ()->Any …,
__DefaultMatrix[\RR64,2,2\]), overload = {
  aplTstD[\nat s\](f:()->Any,v:Vector[\FortressLibrary.RR64,s\]):Any …
  aplTstD[\nat r,nat c\](f:()->Any,m:Matrix[\FortressLibrary.RR64,r,c\]):Any …}
```

## u16 — is it the api boundary, and what serves instead

**Answer.** It is not the api boundary: a LOCAL family with an `Any` result
fails in exactly the same way (`u16_res.out.0`). `Object` as the result type
dispatches and carries both an `RR64` and an array (`u16_res.out`), so
`aplRank1`, `aplRank2`, `aplRankD1`, `aplRankD2`, `aplAsm1` and `aplAsm2` are
declared `: Object`. Gap row 67.

## u17 — the rung-4 grammar, one line per rule

Dfns as values and as calls, ⍺ ⍵ in operand positions, a dfn inside a dfn, the
default ⍺, guards, ∇ recursion, a named function, the rank operator in both
spellings and both valences, `∘`, `⊢`, `⊣`, `(a,b,c)⍴x`, `2 3 4⍴x`, `1 0 2⍉t`,
dyadic `⊃`, and a multi-line dfn opening with a comment line — all pass
(`u17_gram.out`).

Two findings on the way, both about LINE BREAKS in a production.

`u17_gram.out.0`/`.1`: `(a,b,c)⍴x` written as a rule that breaks between `)` and
`SPACE ⍴` never matches, and `u17_gram.out.4`: the `MyFirstFunction` alternative
of `AplFnName` written with its `NOT [A:Za:z0:9]` on the next line never matches
either. Both work on one line. A line break inside a production's symbol
sequence is therefore not optional whitespace — it is a required line break at
the use site, which is exactly what rung 2's two spellings of every statement
rule (one with `⋄`, one with a line break) were written for. Gap row 71.

`u17_gram.out.3`: a dfn bound on one line and applied on the next swallows the
next line — the monadic call rule reads `{…}` as the function and the whole
following line as its argument. Gap row 68.

## u18 — the constructs the chapter's later examples need

`_ ← {…}⍬`, the chapter's throw-away name, is a **Syntax Error**: the `Id` gap
of the binding rule does not accept the underscore (`u18_gram.out.1`,
`u18_gram.fss:27:34: Syntax Error`, where the same line with `x` in place of `_`
runs). The reported column is the reshape three tokens earlier — the
furthest-failure position is not the offending one. Gap row 69.

Everything else passes (`u18_gram.out`): an inner dfn that mutates an array
bound in the enclosing dfn, an inner dfn with a guard applied to a name, `i⊃v`,
a guard chain, `softmax` as two statements, `rmsnorm` through `⍤1`, `,⍤2⊢t`,
`⍉⍤2⊢t`, `(a,b)⍴t` from rank 3, `÷` on rank 3, and a dfn whose body calls a dfn
with its own `⍵`.

## u19 — which statement separators work inside a dfn

**Question.** The chapter's `sum` parses with the book's trailing comments on
every body line (Ex 9) and fails without them (`Rung4.out.0`,
`Rung4.fss:117:47: Syntax Error`). Which rule is at fault?

**Answer.** None: the trap is gap row 52's, one construct further. The gap
before a line break is greedy across it, so a statement followed by a line whose
first token can continue it is swallowed. `{⍵>2: 42 ⟨break⟩ ¯99}` reads `42 ¯99`
as one strand and then has no statement left (`u19_break.out.0`,
`u19_break.fss:31:24: Syntax Error`); `⍺ ← 0 ⟨break⟩ 0=≢⍵:⍺` reads `0 0=≢⍵` as
one expression and then fails at the colon. A body line separated by `⋄`, or by
the book's own trailing comment, parses, and so does a line break above a line
that begins with a NAME (`u19_break.out`).

## u20 — a function name that is never bound

**Question.** The chapter's Ex 14 assigns `foo ← {47>flerp ⍵: 92+flumm ⍵ ⋄ 57+8}`
over two names it never defines. A name in a template is a free Fortress
identifier; is an unbound one a run-time or a compile-time failure?

**Answer.** Compile-time, and reported against the GRAMMAR api rather than the
use site (`u20_free.out.0`):

```
/home/user/fortress/explorations/apl/base/AplSyntax.fsi:1:2:
    Variable g is not defined.
```

Nothing runs. With `g` bound first, the same line runs and prints 92
(`u20_free.out`). So Ex 14 is out of scope for the rung. Gap row 70.

## u21 — what a dfn call costs

**Question.** u04 measured the frame stack against a two-parameter host lambda
(about 4×). What does the shipped expansion cost against the same primitive
written directly?

**Answer** (`u21_cost.out`), `nanoTime()`, one run each:

```
scalars, 100000 calls each:
  1+2      : 0.569982363 s
  1 {⍺+⍵} 2: 2.009266533 s
  ratio    : 3.5251380804567107
100-element vectors, 10000 calls each:
  v+v      : 16.35753919 s
  v {⍺+⍵} v: 16.260407055 s
  ratio    : 0.9940619347524241
```

3.5× on scalars, nothing measurable on 100-element vectors: the array work
swamps the closure and the frame push, which is the case the program is made of.

## Files

| probe | question | sources | outputs |
|---|---|---|---|
| u01 | nested lambda parameter names | `u01_name.fss` | `u01_name.out`, `.out.0` |
| u02 | keyword parameters | `u02_kwd.fss` | `u02_kwd.out`, `.out.0`-`.out.2` |
| u03 | object-expression parameters and fields | `u03_objp.fss` | `u03_objp.out`, `.out.0`, `.out.1` |
| u04 | the frame stack | `u04_frame.fss` | `u04_frame.out`, `.out.0` |
| u05 | `⍺` `⍵` as names and terminals | `u05_glyphid.fss`, `U05Syn.fsi`, `U05Syn.fss` | `u05_glyphid.out`, `.out.0`-`.out.9` |
| u06 | the `:` guard | `u06_guard.fss`, `U06Syn.fsi`, `U06Syn.fss` | `u06_guard.out` |
| u07 | rank 3 | `u07_rank3.fss` | `u07_rank3.out` |
| u08 | planes and a permuted view | `u08_plane.fss` | `u08_plane.out`, `.out.0` |
| u09 | dispatch on a result | `u09_result.fss` | `u09_result.out`, `.out.0`, `.out.1` |
| u10 | a value of static type `Any` | `u10_any.fss` | `u10_any.out` |
| u11 | the rung-4 library, called directly | `u11_lib.fss` | `u11_lib.out`, `.out.0`-`.out.2` |
| u12 | `Any`, arrows, parameter position | `u12_disp.fss` | `u12_disp.out`, `.out.0` |
| u13 | the same family local and imported | `u13_rank.fss` | `u13_rank.out`, `.out.0` |
| u14 | which function parameter crosses an api | `u14_api.fss` | `u14_api.out.0` |
| u15 | `Any` as a result type | `u15_any.fss` | `u15_any.out`, `.out.0` |
| u16 | local `Any` result; `Object` instead | `u16_res.fss` | `u16_res.out`, `.out.0` |
| u17 | the rung-4 grammar | `u17_gram.fss` | `u17_gram.out`, `.out.0`-`.out.4` |
| u18 | the later chapter constructs | `u18_gram.fss` | `u18_gram.out`, `.out.0`, `.out.1` |
| u19 | statement separators inside a dfn | `u19_break.fss` | `u19_break.out`, `.out.0` |
| u20 | an unbound function name | `u20_free.fss` | `u20_free.out`, `.out.0` |
| u21 | the cost of a dfn call | `u21_cost.fss` | `u21_cost.out` |
