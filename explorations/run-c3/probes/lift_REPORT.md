# Run C3 probe: the row lift (`⍤1`) in three forms

Every file here is named `lift_*`.  Environment: `source experiment/env.sh`
(JDK 25, `-Xmx4g`), run from this directory, e.g.
`$FORTRESS_HOME/bin/fortress lift_a.fss`.

The shared header is `lift_hdr.txt` (36 lines) and is pasted verbatim into
`lift_a.fss`, `lift_b.fss`, `lift_c.fss` and `lift_h.fss`; the per-form part of
each file is kept beside it as `lift_a.body` etc. so the three can be rebuilt.
`lift_h.fss` is the header alone, smoke-tested at vector level — it runs, so
every piece of the vocabulary below is verified independently of the lift.

The vocabulary, all of it working on the first try:

```
object Row[\nat r, nat c\](base: Matrix[\RR64,r,c\], i: ZZ32) extends Vector[\RR64,c\]   (6 lines)
rowOf[\nat r, nat c\](m: Matrix[\RR64,r,c\], i: ZZ32): Vector[\RR64,c\] = Row[\r,c\](m, i)
vec(n, f) / mat(r, c, f)                             via array[\RR64\](n).fill(f)
opr /[\nat n\](v: Vector[\RR64,n\], s: RR64)         opr -[\nat n\](v, s: RR64)
opr SQRT[\nat n\](v)   opr ×[\nat n, nat m\](a, b)   exp[\nat n\](v)
rmsn(a: Array[\RR64,ZZ32\]): Array[\RR64,ZZ32\] = a / SQRT (epsRms + (a DOT a) / (1.0 |a|))
sm(z) = do e = exp(z - (BIG MAX[u <- z] u)); e / (SUM[u <- e] u) end
rmsnB(g, a) = do r = SQRT (epsRms + (a DOT a) / (1.0 |a|)); y = a / r
                 (g - ((y DOT g) / (1.0 |y|)) y) / r end
```

`BIG MAX[u <- z] u` and `SUM[u <- e] u` over a **vector generator** both work —
no index spelling needed.  `rmsn` is one line and reads as the Dyalog does.

Test data: `x = mat(64, 16, fn (i,j) => sin(1.0 i + 0.3 j))`,
`x2 = mat(64, 16, fn (i,j) => cos(0.7 i - 0.2 j))`,
`nv = vec(64, fn i => 1.0 + 0.01 i)`.

## The three forms

| form | file | works? | call | decl. lines | t1 ms (10× rmsn / sm) | t4 ms | checksum | renders |
|---|---|---|---|---|---|---|---|---|
| A stack-by-first-result | `lift_a.fss` | yes | `rows(rmsn, x)` | 8 (+2 typed readers `nth`, `lenOf`) | 524.7 / 1127.2 | 710.0 / 1790.2 | agrees | one `do`-block, an `Array⟦Any⟧` and a `mat` of `nth(rs_u, w)`; the plumbing is visible |
| B generator + list comprehension | `lift_b.fss` | yes | `rows(rmsn, x)` | 2 (+4 `rowsOf`, +2 `stack`, +2 readers) | 472.7 / 856.1 | 295.3 / 621.6 | agrees | the lift itself is one line, `stack(⟨ f(rw) \| rw ← rowsOf(m) ⟩)`, and reads closest to APL |
| C `for` into a preallocated matrix | `lift_c.fss` | yes | `rows(rmsn, x)` | 8 (uses only `rowOf` from the header) | 487.5 / 868.7 | 207.9 / 433.1 | agrees | an imperative `for … rowOf(out, i).assign(…)`; honest about the allocation, longest of the three |

Checksums, identical in all six runs (`lift_{a,b,c}.t{1,4}.out`):

```
rows(rmsn, x)           sum =  5.397680725415225   [5,7] =  1.0717557896191623
rows(sm,   x)           sum = 64.0                 [5,7] =  0.08594386678867971
rows(rmsnB, x2, x)      sum = -1.785354676662699   [5,7] = -1.113153834603927
rows(scale, nv, x)      sum =  6.646830595668098   [5,7] =  0.7654174921321698
```

Timing is 10 repetitions after a 5-repetition warm-up (the walk interpreter's
first passes are up to 2× slower, ledger row 154).  Form A's timed `rows` is the
sequential `while`; its parallel twin `rowsP` is lines (3)/(4) of `lift_a.out`
and gives the same checksums, so **a parallel `for i <- 0#nr do rs[i] := f(…)`
into an `array[\Any\](nr)` does work**.  Only B and C get faster at four
threads; A does not, because the timed loop is sequential by construction.

### Overloading
All four lifts are spelled `rows` in every form and **the interpreter resolves
them**, including the two two-argument overloads that differ only in the arrow
type of the function argument:

- `rows(f: Array[\RR64,ZZ32\] -> Array[\RR64,ZZ32\], m)` → matrix, and
- `rows(f: Array[\RR64,ZZ32\] -> RR64, m)` → vector.

Line (7) of every `.out` shows the scalar-result overload picked correctly
(`|sv| = 64`, `sv[5] = 3.7203411149839445` = the sum of row 5).  No `rowsS`,
`rows2` or `rows01` was needed.  The three-argument overloads separate on the
second argument (`Matrix` vs `Vector`, which exclude).

### Which spellings were tried for form B
1. **2-D array comprehension** `[ (i,j) |-> 2.0 m[i,j] | i <- 0#4, j <- 0#3 ]` —
   **fails**, `lift_b1.fss` / `lift_b1.out`: `Variable i is not defined.` and
   `Variable j is not defined.`, twice each (7:14, 7:16, 7:29, 7:31).
2. **1-D array comprehension** `[ i |-> 1.0 i | i <- 0#5 ]` — **fails**,
   `lift_b1b.fss`: `Variable i is not defined.` (5:13, 5:23).  Both confirm the
   spec's own note, `Specification/basic/expressions/comprehensions.tex:15`:
   "Array comprehensions are not yet supported."  The grammar admits the form
   (`ArrayComprehensionLeft ::= IdOrInt |-> Expr`, same file lines 37-39); the
   binder is simply never bound.
3. **List comprehension over a generator of row views** —
   `stack(<| f(rw) | rw <- rowsOf(m) |>)` — **works**; this is what `lift_b.fss`
   keeps.  `opr BIG <|[\T\] g:Generator[\T\]|>:List[\T\]`, `Library/List.fsi:111`.
4. **`map` on the range then stack** — `stack(<| y | y <- rowsOf(x).map(rmsn) |>)`
   — **works**, line (8) of `lift_b.out`; note that the plain non-generic
   top-level `rmsn` can be handed to `map` as a value.
5. **A user reduction object** — `lift_b3.fss`: an
   `object StackR extends MonoidReduction[\Array[\Any,ZZ32\]\]` driven through
   `(0#4).generate[\…\](StackR, fn i => one(…))` (the machinery a `BIG` operator
   uses; `Library/FortressLibrary.fsi:620`, `1770`) — **works**, and is the
   longest of the five.

Two traps found on the way to (3):

- `ls[i][j]` — a chained subscript on a `List` element — **fails**
  (`lift_b2a.fss`): `Failed to find any matching overload, args = (), overload =
  { _[_](n:FortressLibrary.ZZ32):E … }`.  Use a typed reader, `nth(ls[i], j)`.
- `stack(ls: List[\Array[\RR64,ZZ32\]\])` **fails**: `Unification error:
  Closure/Constructor for stack param 1 (ls:List[\Array[\RR64,ZZ32\]\]) got arg
  ArrayList[\__DefaultVector[\RR64,16\]\] of type
  ArrayList[\__DefaultVector[\RR64,16\]\]`.  `List` is invariant and the
  comprehension's element type is the runtime one, so `stack` must be
  `stack[\E\](ls: List[\E\])`.

### Which spellings were tried for form C ("write a vector into row i")
1. `Row[\4,3\](out, 1).assign(fn (j: ZZ32): RR64 => y[j])` — **works**, `lift_c1.fss`.
2. `Row[\4,3\](out, 1).assign(y)` — **works**, `lift_c2.fss`; shortest, and what
   `lift_c.fss` uses as `rowOf(out, i).assign(…)`.
3. `out[1, 0#3] := y` — **fails**, `lift_c3.fss`: `Failed to find any matching
   overload, args = (__DefaultVector[\RR64,3\],1: ZZ32,CompactFullParScalarRange[\ZZ32\]),
   overload = { _[_]:=(a:Indexed[\E,I\],r:Range[\I\]):() … _[_]:=(v:T,x:ZZ32,y:ZZ32):() }`.
   The rank-2 indexed assignment takes two scalars only; there is no
   `(ZZ32, Range)` overload.  `Specification/basic/expressions/ranges.tex:15`
   notes "some range operations are not yet supported".

## Gates

| gate | question | result | evidence |
|---|---|---|---|
| g1 | lambda without parameter types, `fn (w, r) => w r` | **works** | `lift_g1a.out`: `(a) untyped lambda: [0#3][ 2.0 4.0 6.0 ]` |
| g1 | typed parameters, no return type | **works** | `lift_g1b.out`: `(b) typed params, no return type: [0#3][ 3.0 6.0 9.0 ]` |
| g2 | pass a top-level `nat`-generic function as an `Array[\RR64,ZZ32\] -> Array[\RR64,ZZ32\]` argument | **fails** — `f` must be declared non-generic over `Array[\RR64,ZZ32\]` | `lift_g2.out`: the non-generic `dblC` prints; then `Unification error: Closure/Constructor for applyIt param 1 (f:Array[\RR64,ZZ32\]->Array[\RR64,ZZ32\]) got arg dblG[\nat n\](v:Vector[\FortressLibrary.RR64,n\]):Array[\…\]…:6:1-97 **of type null**`.  A generic function has no arrow type to unify with.  This is why every `f` in the header is non-generic. |
| g3 | operator `×` passed as a function value | **fails**, three spellings | `applyIt(opr ×, a, b)` → `Operator declarations are not allowed in block expressions.` (`lift_g3.out`, 13:46); `applyIt((×), a, b)` → `InterpreterBug: ** bug! The number of parameters (2) does not match with the number of arguments (0).` (`lift_g3b.out`, 13:45); `applyIt(×, a, b)` → the same InterpreterBug (`lift_g3d.out`, 13:47).  Eta-expansion works: `applyIt(fn (p: Array[\RR64,ZZ32\], q: Array[\RR64,ZZ32\]) => p × q, a, b)` (`lift_g3c.out`).  The grammar has no production for an operator name as an expression (`appendices/grammars/concrete-syntax.tex`, `OpExpr`). |
| g4 | `(onehot(idx, 5))^T` — a **parenthesised** call followed by a user postfix `^T` | **fails**, exactly as the unparenthesised form of ledger row 144 | `lift_g4.out`: `Syntax Error: a function argument should not be immediately followed by a non-expression element.` at 11:11-22 (the call, inside its own parentheses).  `basic/operators/juxtameaning.tex:156-162`.  Workaround confirmed in `lift_g4b.out`: `oh = onehot(idx, 5)` then `oh^T` → `sizes = (5,3)`. |
| g5 | nine-tuple binding `(a,…,i) = nine()` from a function returning nine matrices | **works** | `lift_g5.out`: `a[0,0] = 1.0  e[0,0] = 5.0  i[1,1] = 9.11`.  Note there are **no type aliases**: `M = Array[\RR64,(ZZ32,ZZ32)\]` gives `M is undefined.`, so the nine-tuple return type must be written out nine times. |
| g6 | array literal of **matrices** inside a function body, `ms = [a b c]`, then `ms[1]` as a matrix | **fails** — by design, this is matrix *pasting* | untyped (`lift_g6.out`) and `Array[\Any,ZZ32\]`-typed (`lift_g6b.out`) both give `Element at [0] has extent 2 along axis 1 but an earlier element has length 0`.  `basic/expressions/aggregate.tex:180-183`: "If an element is an array expression, it is 'flattened' (pasted) … array expressions never contain other arrays as elements."  Working spelling in `lift_g6c.out`: `ms = array[\Any\](3)` then `ms[0] := k(1)` …, and `nth2(ms[2], 1, 1) = 3.11`.  Row 142's positive half also needs care: in a body, `sc = [1.0 2.0 3.0]` gives `Can't infer element type for array construction`, `sc: Array[\RR64,ZZ32\] = [1.0 2.0 3.0]` gives `undefined variable [sc]`, and only `sc: Vector[\RR64,3\] = [1.0 2.0 3.0]` works. |
| g7 | several declarations on one line separated by `;` | **works**, both at top level and in a `do` block | `lift_g7.out`: `(g7 top level) 16 16 4`, `(g7 in a block) 1 2 3.0`, from `nEmbd: ZZ32 = 16; blockSize: ZZ32 = 16; nHead: ZZ32 = 4` and `a: ZZ32 = 1; b: ZZ32 = 2; c = 3.0` |
| g8 | user `exp`/`log` on `Vector[\RR64,n\]` beside the library's scalar `exp`/`log` in one component | **works**; the user overload's own body calls the scalar one | `lift_g8.out`: `exp(2.0) = 7.38905609893065`, `log(2.0) = 0.6931471805599453`, `exp(v) = [0#3][ 2.718… 7.389… 20.085… ]`, `log(v) = [0#3][ 0.0 0.693… 1.098… ]` |

Two further name collisions of the row-92/147 family, both hit while writing
these probes and both fatal at compile time:

- A **parameter** named `x` collides with a top-level `x`:
  `rmsn(x: Array[\RR64,ZZ32\])` beside `x: Array[\RR64,(ZZ32,ZZ32)\] = mat(…)`
  gives `Variable x is already declared.` three times.  The header's parameters
  are therefore `a`, `g`, `z`.
- A **comprehension binder** collides with an enclosing `nat` static parameter:
  inside `rows[\nat r, nat c\]`, `<| f(r) | r <- rowsOf(m) |>` gives
  `Variable r is already declared.`  Hence `rw`.

## Rendering

`lift_a.tic` / `lift_b.tic` / `lift_c.tic` → `.svg` → `.png`, via `bin/fortick`,
`latex`, `dvisvgm`, headless chromium.  Every line rendered; nothing had to be
left as ASCII.  `a DOT a` sets as `a · a`, `SQRT (…)` as a radical over the whole
argument, `BIG MAX[u <- z]` and `SUM[u <- e]` as big operators with the
generator under them, `<| … | … |>` as `⟨ … | … ⟩`, and `[\…\]` as the double
brackets.  One sentence each:

- **A** (`lift_a.png`) reads as a small machine: two lines of signature, then the
  `Array⟦Any⟧`, the loop and the re-assembly are all on the page, so the reader
  sees the plumbing rather than the idea.
- **B** (`lift_b.png`) reads closest to the Dyalog: once `rowsOf` and `stack` are
  out of the way, the lift is the single line
  `rows(f, m) = stack(⟨ f(rw) | rw ← rowsOf(m) ⟩)`, and the generator arrow
  carries the "for every row" that `⍤1` carries.
- **C** (`lift_c.png`) reads as an imperative kernel: `y₀`, `out`, a `for`, a
  `.assign`, and a bare `out` at the end — the clearest about cost and the least
  like the APL.

## Recommendation

Take form **B** for the model-level code: the lift is one line, it is the only
form whose call site reads like `rmsn⍤1⊢X`, and it is 1.6-2× faster than A at
four threads because the library's generator supplies the parallelism for free.
Keep form **C** in reserve for the inner loops that dominate a step — it is the
fastest at four threads (208 ms against B's 295 ms for ten `rows(rmsn, x)`) and
it allocates exactly one result matrix, which matters when the same lift runs
inside the attention loops; the two are interchangeable because their checksums
agree to the last digit.  Form **A** earns its keep only where the row function's
result rank is not known statically — it is AplCore's `aplAsm1` and it is the
right answer there, but for microGPT every row function's result shape is known,
so the `Array⟦Any⟧` round-trip is cost without benefit.
