# An elementwise algebra for vectors and matrices: two forms

Probe set `alg_*` in `explorations/run-c3/probes/`. JDK 25, `FORTRESS_THREADS=1`,
`-Xmx4g`, walk interpreter. Every claim below is from a run whose `.out` file is
beside the source.

## 1. The operator overloads tried (form A, `alg_a.fss` / `alg_a2.fss`)

All of them were declared in **one** component, at top level, beside the library's
own `+ - / > = MAX SQRT exp log DOT` on numbers. Nothing was rejected; no ambiguity
and no "already declared" error was produced by any operator declaration.
`alg_a2.fss` then exercises each one at run time, so acceptance is not merely
"it compiled" (`alg_a2.out`).

| # | signature | accepted? | run-time evidence (`alg_a2.out`) |
|---|---|---|---|
| 1 | `opr ×[\nat s, nat t\](Vector[\RR64,s\], Vector[\RR64,t\])` | yes | `v × w = 2.0 4.0 6.0` |
| 2 | `opr ×[\nat r,c,p,q\](Matrix, Matrix)` | yes | `mx × nx = -2.0 0.0 2.0 4.0` |
| 3 | `opr /[\nat s,t\](Vector, Vector)` | yes | `v / w = 0.5 1.0 1.5` |
| 4 | `opr /[\nat r,c,p,q\](Matrix, Matrix)` | yes | `mx / nx = -0.5 0.0 0.5 1.0` |
| 5 | `opr /[\nat s\](Vector, RR64)` | yes | `v / 2.0 = 0.5 1.0 1.5` |
| 6 | `opr /[\nat r,c\](Matrix, RR64)` | yes | `mx / 2.0 = -0.5 0.0 0.5 1.0` |
| 7 | `opr /[\nat s\](RR64, Vector)` | yes | `2.0 / v = 2.0 1.0 0.666…` |
| 8 | `opr /[\nat r,c\](RR64, Matrix)` | yes | `2.0 / mx = -2.0 Infinity 2.0 1.0` |
| 9 | `opr +[\nat s\](Vector, RR64)` | yes | `v + 1.0 = 2.0 3.0 4.0` |
| 10 | `opr +[\nat s\](RR64, Vector)` | yes | `1.0 + v = 2.0 3.0 4.0` |
| 11 | `opr +[\nat r,c\](Matrix, RR64)` | yes | `mx + 1.0 = 0.0 1.0 2.0 3.0` |
| 12 | `opr +[\nat r,c\](RR64, Matrix)` | yes | `1.0 + mx = 0.0 1.0 2.0 3.0` |
| 13 | `opr -[\nat s\](Vector, RR64)` | yes | `v - 1.0 = 0.0 1.0 2.0` |
| 14 | `opr -[\nat s\](RR64, Vector)` | yes | `1.0 - v = 0.0 -1.0 -2.0` |
| 15 | `opr -[\nat r,c\](Matrix, RR64)` | yes | `mx - 1.0 = -2.0 -1.0 0.0 1.0` |
| 16 | `opr -[\nat r,c\](RR64, Matrix)` | yes | `1.0 - mx = 2.0 1.0 0.0 -1.0` |
| 17 | `opr SQRT[\nat s\](Vector)` | yes | `SQRT v = 1.0 1.41421… 1.73205…` |
| 18 | `opr SQRT[\nat r,c\](Matrix)` | yes | `SQRT nx = 1.41421… ×4` |
| 19 | `exp[\nat s\](Vector)` (plain function, not `opr`) | yes | `exp(v) = 2.71828… 7.38906… 20.0855…` |
| 20 | `exp[\nat r,c\](Matrix)` | yes | `exp(nx) = 7.38906… ×4` |
| 21 | `log[\nat s\](Vector)` | yes | `log(v) = 0.0 0.69315… 1.09861…` |
| 22 | `log[\nat r,c\](Matrix)` | yes | `log(nx) = 0.69315… ×4` |
| 23 | `opr MAX[\nat r,c\](RR64, Matrix)` | yes | `0.0 MAX mx = 0.0 0.0 1.0 2.0` |
| 24 | `opr MAX[\nat r,c\](Matrix, RR64)` | yes | `mx MAX 0.0 = 0.0 0.0 1.0 2.0` |
| 25 | `opr MAX[\nat r,c,p,q\](Matrix, Matrix)` | yes | `mx MAX nx = 2.0 ×4` |
| 26 | `opr >[\nat r,c\](Matrix, RR64) : Array[\RR64,(ZZ32,ZZ32)\]` | yes | `mx > 0.0 = 0.0 0.0 1.0 1.0` (a 0/1 matrix) |
| 27 | `opr =[\nat r,c\](Matrix, RR64) : Array[\RR64,(ZZ32,ZZ32)\]` | yes | `mx = 1.0 = 0.0 0.0 1.0 0.0` |
| 28 | `opr (m: Matrix[\RR64,r,c\])^T[\nat r, nat c\]` (gap row 149) | yes | `mx^T = -1.0 1.0 0.0 2.0` |

The library's own scalar operators are untouched by all of this — the last line of
`alg_a2.out` is `3.0 / 2.0 = 1.5  SQRT 9.0 = 3.0  2.0 MAX 5.0 = 5.0  1.0 > 0.0 =
true  1.0 = 1.0 = true  exp 0.0 = 1.0  log 1.0 = 0.0`. In particular `>` and `=`
on two `RR64`s still return `Boolean`; only the (Matrix, RR64) arms return 0/1
matrices. This follows `explorations/apl/base/AplCore.fss`, which deliberately
leaves the (scalar, scalar) arm to the library.

Two failures during development, both unrelated to the algebra and both already in
the gap ledger:

- `nbig`/`big`: a local named `big` gives `alg_a.fss:139:5-6: Variable big is
  already declared.` (ledger row 147 — `big` is a functional method of `ZZ`).
- `println "m0 =" //showM(m0)` gives `alg_a.fss:123:22: Syntax Error`: `//` with
  whitespace on the left and none on the right is lopsided fixity. `("m0 =" //
  showM(m0))` works.

### scalar-times-array by juxtaposition is already the library's

Nothing needs to be declared; `2.0 v`, `v 2.0`, `2.0 m`, `m 2.0` all run
(`alg_a2.out`, lines `jux s V` … `jux M s`), from

| spelling | library declaration | line |
|---|---|---|
| `2.0 v` | `opr juxtaposition[\T extends Number, nat n\](other:T, me:Vector[\T,n\]) : Vector[\T,n\] = me.scale(other)` | `Library/FortressLibrary.fss:2276-2277` |
| `v 2.0` | `opr juxtaposition[\T extends Number, nat n\](me:Vector[\T,n\], other:T) : Vector[\T,n\] = me.scale(other)` | `Library/FortressLibrary.fss:2270-2271` |
| `2.0 m` | `opr juxtaposition[\T, nat n, nat m\](other:T, me:Matrix[\T,n,m\]) : Matrix[\T,n,m\]` | `Library/FortressLibrary.fss:2653-2654` |
| `m 2.0` | `opr juxtaposition[\T, nat n, nat m\](me:Matrix[\T,n,m\], other:T) : Matrix[\T,n,m\]` | `Library/FortressLibrary.fss:2647-2648` |

So **yes, `v 2.0` also works**, and gives the same vector as `2.0 v`. The matrix
product by juxtaposition is `FortressLibrary.fss:2625-2627`, array `+` is
`Vector.+` at `:2192-2193` and `Matrix.+` at `:2500-2501`, and `.t()` is
`Matrix.t()` at `:2559`.

### side check: `÷` (U+00F7) as an operator name

`alg_g6.fss`, one declaration `opr ÷(a: RR64, b: RR64): RR64 = a / b`, runs:
`(1) 7.0 ÷ 2.0 = 3.5`. So `÷` is a usable operator name (as `AplCore.fss:145-156`
already uses it). The forms here are built on `/` as instructed.

## 2. The two forms

| | file | all five formulas run? | declaration lines | wraps needed in the formulas | Adam, 4192-vector × 100 | how the render reads |
|---|---|---|---|---|---|---|
| A | `alg_a.fss` (+ `alg_a2.fss`) | yes, all five | **43** (24 of them `opr` lines; the rest are `vecOf`/`matOf`/`zipV`/`zipM` and five scalar kernels) | **none** — values are the library's own arrays throughout | **41 323 ms** (413 ms per update) | Adam is three lines of ordinary display mathematics: `m' = β₁ m + (1−β₁) g`, `v' = β₂ v + (1−β₂)(g × g)`, `p' = p − lr (m'/(1−β₁ᵗ)) / (√(v'/(1−β₂ᵗ)) + epsAdam)`, with a real radical over the second moment; softmax is `e = exp(z − (MAX_{t←z} t))` and `sm = e/(Σ_{t←e} t)`, the reduction set as a big Σ with its generator underneath. |
| B | `alg_b.fss` | yes, all five | **70** (35 `opr` lines; 63 net of the four display/reduction helpers `show`, `sum`, `max`) | **two**, both in softmax: `BIG MAX[t <- z.a] t` and `SUM[t <- e.a] t` — plus `Arr(…)`/`Mat(…)` at every construction site, `.show()` at every print, `pb.a[0]` to read one element, and one `Arr(…)`/`Mat(…)` rewrap inside each of the 35 operator bodies | **51 875 ms** (519 ms per update, 1.26× A) | identical to A except the two softmax generators, which read `t ← z.a` and `t ← e.a`: the wrapper's field name is visible in the typeset formula. |

Both forms print the same numbers entry by entry (`alg_a.out` against
`alg_b.out`): `m'`, `v'`, `p'` on the vectors of 6, the softmax, the rmsnorm, `m0`,
`mr`, `dM0`, `x2`, and the three scalar-scaling lines all agree to the last digit,
and both timing loops end at `pb[0] = -1.1509842865167395`.

Both counts are for the **full** requested overload set. The five formulas alone
need only a subset: in form A that is 24 lines (14 of helpers — `vecOf`, `matOf`,
`zipV`, `zipM` and four scalar kernels — and 10 operator lines: `×` on (V,V) and
(M,M), `/` on (V,V) and (V,RR64), `+` on (V,RR64), `SQRT` on V, `exp` on V, `MAX`
on (RR64,M), `>` on (M,RR64), and `^T`). The ratio between the forms is the same
either way, because form B needs every one of those plus a constructor call around
each body and the two bridging helpers.

### what form B costs beyond the line count

- **The wrapper hides the library.** `Arr`'s field has static type
  `Array[\RR64,ZZ32\]` and `Mat`'s `Array[\RR64,(ZZ32,ZZ32)\]`; neither has the
  `Vector`/`Matrix` operations. The library's matrix product and `.t()` are
  reachable again only through hoisted `nat`-generic helpers —
  `matMul[\nat r, nat c, nat p\](a: Matrix[\RR64,r,c\], b: Matrix[\RR64,c,p\]) = a b`
  and `trOf[\nat r, nat c\](m: Matrix[\RR64,r,c\]) = m.t()` — which then work: the
  `nat`s are inferred from the runtime-built arrays (ledger rows 150, 151), so
  `dX4 f2` and `wo^T` read exactly as in form A and give the same 4×3 result.
  Form A needs no such bridge because its operands never leave the shipped family.
- **Reductions do not see the wrapper.** `Arr` is not a `Generator[\RR64\]`, so
  `BIG MAX[t <- z] t` and `SUM[t <- e] t` must unwrap to `z.a` / `e.a`. That is the
  only place a `.a` appears in a formula, and it is the only visible difference
  between the two renders.
- **Method-declaration trap.** A method written `show(self): String` is a
  *functional* method and `x.show()` then fails at run time with
  `alg_b.fss:112:21-28: Cannot find definition for method show given receiver Arr`.
  The dotted form is `show(): String` with `self` used in the body. `exp(self)` is
  deliberately functional, so that `exp(z)` reads as a function.
- Everything else is symmetric: `opr +(s: RR64, self)` and
  `opr juxtaposition(s: RR64, self)` (self in second position, the library's own
  idiom at `FortressLibrary.fss:4048`) give scalar extension in both orders, and
  `opr |self| : ZZ32` (idiom at `FortressLibrary.fss:356`) gives `|x|`.

A single object over both ranks was not probed; the field would have to be
`Array[\RR64,I\]` for an index type `I`, and the elementwise bodies cannot index
such a value. Form B therefore uses two objects.

## 3. Gates

| gate | question | result | citation |
|---|---|---|---|
| g1 | does `x DOT x` work on a runtime vector? | **yes**, `alg_g1.out`: `(1) x DOT x = 19.0`, `(2) squaredNorm(x) = 19.0`, `(3) x.dot(x) = 19.0`, `(4) \|x\| (length) = 6` | `opr DOT[\T extends Number, nat n\](me:Vector[\T,n\], other:Vector[\T,n\]):T = me.dot(other)` — `Library/FortressLibrary.fss:2261-2262`; `Vector.dot` at `:2200-2202`; `squaredNorm` at `:2279`. Note `\|x\|` is the **length** (6); the Euclidean norm is the *double*-bar `opr \|\|me\|\|` at `:2281`. |
| g2 | `SUM[t <- v] t` and `BIG MAX[t <- v] t` with a vector as the generator | **both work**, `alg_g2.out`: `15.0` and `5.0`; the index spellings `SUM[i <- 0#\|v\|] v[i]` and `BIG MAX[i <- 0#\|v\|] v[i]` give the same. Prefix `SUM v` also works (`alg_g2b.out`: `15.0`), but prefix `BIG MAX v` does **not**: `alg_g2d.out` — `Failed to find any matching overload, args = (__DefaultVector[\RR64,6\]), overload = { BIG MAX[\T extends StandardMax[\T\]\]()… /home/user/fortress/Library/FortressLibrary.fss:3118:1-3119:49, BIG MAX[\T extends StandardMax[\T\]\](g:Generator[\T\]):(T, T) …:3120:1-3121:60}`. `v.sum()` does not exist: `alg_g2c.out` — `Cannot find definition for method sum given receiver __DefaultVector[\RR64,6\]` | `basic/expressions/reductions.tex:80-88` (`Σ g` ≡ `Σ[x <- g] x`); the prefix-`BIG MAX` failure is gap-ledger row 102, the bound being `T extends StandardMax[\T\]` (`Library/FortressLibrary.fsi:1874-1876`) |
| g3 | does a user `opr /[\nat n\](Vector, RR64)` coexist with the library's `/` on numbers in `x / SQRT (eps + (x DOT x) / \|x\|)`? does `RR64 / ZZ32` need `1.0 \|x\|`? | **yes, and no widening is needed.** `alg_g3.out`: `(2) (x DOT x) / \|x\| = 3.1666666666666665` and `(3) with 1.0 \|x\|: 3.1666666666666665` — identical; `(4) rmsnorm = -1.1239… …` (the whole line runs); `(5) 7.0 / 2.0 = 3.5` — the scalar `/` is unchanged. Side finding: `7 / 2` on two `ZZ32`s prints `7/2`, a rational | `RR64 / ZZ32` goes through the `Number` arm `opr /(self,b:Number):RR64 = asFloat(self) / asFloat(b)`, `Library/FortressLibrary.fss:382`; integer `/` is `opr /(self,other:ZZ):QQ` at `:851` |
| g4 | is `-m` / `-v` the library's? | **yes**, `alg_g4.out`: `(1) -v = 1.0 -0.0 -1.0 -2.0`, `(2) -m = 1.0 -0.0 -1.0 -0.0 -1.0 -2.0`. Nothing was declared in that probe; the `-0.0` shows the elementwise `- e` | `opr -(self): Vector[\T,s0\] = map[\T\](fn (e:T):T => - e)` — `Library/FortressLibrary.fss:2196`; `opr -(self): Matrix[\T,s0,s1\]` — `:2504` |
| g5 | does juxtaposition bind tighter than `/` in `p - lr (m' / (1 - beta1^t)) / (SQRT (v' / (1 - beta2^t)) + epsAdam)`, and do the numbers match numpy? | **yes and yes.** `alg_g5.out`: `(a) fully parenthesised: 0.09368733645498745 0.19425237939895237 0.29493857838002596` and `(b) as wanted: 0.09368733645498745 0.19425237939895237 0.29493857838002596` — bit-identical, so the extra parentheses of `run-c/src/MicroGptFlat.fss` are unnecessary. numpy on the same data (`p=[.1,.2,.3] m=[.01,.02,.03] v=[.001,.002,.003] g=[.5,.4,.3] t=3 lr=.01 b1=.85 b2=.99 eps=1e-8`) gives `p - lr*(m1/(1-b1**t))/(np.sqrt(v1/(1-b2**t))+eps) = [0.09368733645498745, 0.19425237939895237, 0.2949385783800259]` — the same three doubles. The control lines `(c) (SQRT d) + eps = 0.3427892471840969 …` and `(d) SQRT (d + eps) = 0.3427892517703189 …` differ, so `(b)` really did take the `(SQRT d) + eps` reading | `Specification/basic/operators/precedence.tex:181-184`: "juxtaposition *does* bind more tightly than a loose (whitespace-surrounded) division slash, so one is allowed to write `a b / c d`, and this means the same as `(a b)/(c d)`." And `:77`: "Prefix operators have higher precedence than any operator listed below" — which is why `SQRT (…) + epsAdam` is `(SQRT (…)) + epsAdam`. The precedence order itself is `:45-79` (subscript/superscript/postfix, tight juxtaposition, tight fraction, loose juxtaposition, prefix, then the infix levels) |

## 4. The render

`alg_a.tic` → `alg_a.png`, `alg_b.tic` → `alg_b.png` (LaTeX exited 0 for both; no
line failed to render). The `.svg` and `.png` are kept in place.

Form A's Adam reads as three lines of display mathematics with nothing left over
from the programming language: `m' = β₁ m + (1 − β₁) g`, `v' = β₂ v + (1 − β₂)(g × g)`,
`p' = p − lr (m'/(1 − β₁ᵗ)) / (√(v'/(1 − β₂ᵗ)) + epsAdam)` — the `beta1`/`beta2`
become Greek with a subscript, `^t` a superscript, `SQRT` a radical over its whole
operand, and `×` the multiplication cross; the softmax reads
`e = exp(z − (MAX_{t ← z} t))` and `sm = e/(Σ_{t ← e} t)`, the two reductions set
as a tall `MAX` and a big Σ with the generator clause underneath.

Form B's render is character-for-character the same except in softmax, where the
generators read `t ← z.a` and `t ← e.a` — the wrapper's field selector survives
into the typeset formula, which is exactly the cost the wrapper adds to the page.

## 5. Recommendation

Take form A: it declares the algebra directly on `Vector`/`Matrix` with `nat`
generics, and because the values never stop being the library's own arrays, the
matrix product, `.t()`, `DOT`, `|v|`, `SUM`, `BIG MAX`, `+` and unary `-` all keep
working with no bridge and no wrap, so all five formulas are written exactly as the
coordinator wanted them and the renders carry no wrapper syntax. It costs 43
declaration lines against form B's 70 (63 net of display helpers), runs the Adam
update 1.26× faster (41.3 s against 51.9 s for 100 updates of a 4192-vector), and
its 28 overloads sit beside the library's own `+ - / > = MAX SQRT exp log` without
one ambiguity or "already declared" error. Form B's only advantage would be a type
that forbids mixing ranks, and the probe shows it does not even buy that — the
wrapper pushes `nat`-generic bridging into helper functions that are exactly form
A's declarations with a constructor call wrapped around each, and it puts a `.a`
into the softmax formula and into its picture.
