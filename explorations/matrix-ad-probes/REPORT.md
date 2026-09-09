<!-- Delegated probe worker, 2026-09-08. Question: do the standard library's own
     Vector/Matrix over plain RR64 support a matrix-level reverse-mode AD design?
     Probes p01-p14 + transcript.txt in this directory. Walk interpreter, JDK 25.
     Builds on explorations/libvector-report.md; its established results are not
     re-proved here. Nothing outside this directory was modified. -->

# Matrix-level AD on the library's `Vector`/`Matrix` over `RR64`

## VERDICT LINES

- **Q1 slicing — YES, but views and algebra are disjoint in the shipped library.** Sub-vectors, rows, columns and 2-D blocks all exist and are true zero-copy views; every one of them typecases *outside* `AnyVector`/`AnyMatrix`, so no vector/matrix operator applies to a view. Recover algebra with `.copy()` (a copy) — or, better, with a **6-line user object extending `Vector[\RR64,k\]`** that keeps the view *and* the algebra (`p13`). That declaration is spec-legal: `Vector` has no `comprises` clause.
- **Q1 containers — YES.** `Matrix` builds from a `List` of row `Vector`s via `matrix[\...\]().fill`; `List[\Matrix[\RR64,k,k\]\]` works and iterates. Two spelling traps: the list literal needs an explicit element static arg, and `xs[i][j]` must be written `xs[i].get(j)`.
- **Q1 gap — pair-of-ranges indexing `m[r0,r1]` and mixed `m[i,r]`/`m[r,j]` are commented out in the library source** (`FortressLibrary.fss:2340-2356, 2360-2367`). Survivors: `m[i,:]`, `m[:,j]`, `m[(a,b)#(c,d)]`, `m.subarray[\...\](m0,m1)`.
- **Q2 runtime-sized shapes — YES, one line, no `nat` gymnastics.** `array[\RR64\](n)` / `array[\RR64\](n,m)`; static type `Array[\RR64,ZZ32\]` / `Array[\RR64,(ZZ32,ZZ32)\]`, dynamic type `__DefaultVector`/`__DefaultMatrix`, and every vector/matrix operator dispatches on it.
- **Q2 caveat — `type` aliases are unimplemented** (`** bug! Not yet implemented: TypeAlias`), so `Array[\RR64,ZZ32\]` must be spelled out at every binding site.
- **Q3 closures — YES, fully.** A function returning `(Vector, Vector -> (Vector, Matrix))` whose second component captures the first works; closures compose, live in a `List`, and apply in reverse as a tape. Analytic `∂L/∂x` and `∂L/∂W` match central finite differences to ~1e-9.
- **Q4 `SUM` over vectors — NO, hard `CastError`** from `cast[\Number\]`; `opr SUM` is `[\T extends Number\]` and `Vector` extends `AdditiveGroup`, not `Number`.
- **Q4 workaround — YES, two, both spec-legal and both parallel-safe.** A user `CommutativeMonoidReduction[\Vector[\RR64,k\]\]` driven by `__generate`, or the same object wrapped in a user-declared `opr BIG OPLUS`. Identical results at `FORTRESS_THREADS=1` and `=4`.
- **Q4 mutation — `atomic` is correct; bare `acc := acc + c` in a parallel `for` silently loses updates** (5050 → 1563 / 2930 / 2338 across three runs at 4 threads). The spec's own `acc += c` reduction-variable form "is not yet supported".
- **Q5 cost — ~11.7 ms (1 thread) / ~10.2 ms (4 threads) per forward+backward at n=16** on the walk interpreter. No speedup from threads at this size. Interpreter only: the bytecode compiler path has none of these library types (`explorations/compiled-path-gaps.md`, G2/G4).

---

## Q1. Sub-ranges, views, slicing, containers

### What the spec promises
`Specification/basic/expressions/ranges.tex:17-20` gives `Range ::= [Expr]":"[Expr][":"[Expr]] | Expr"#"Expr`, and `:70-92` the *implicit* ranges (`:`, `a:`, `#s`) usable "only in certain contexts, such as array subscripts". `Specification/basic/expressions/aggregate.tex:153-167` fixes the `Number` element bound that makes an array a `Vector`/`Matrix` at all.

### What runs (`p01`, `p02`, `p03`, `p04`)
```fortress
v: Vector[\RR64,8\] = [ 0.0 1.0 2.0 3.0 4.0 5.0 6.0 7.0 ]
v.subarray[\0,4,4\](1)    (* elements 4..7            *)
v[4:7]   v[4#4]   v[0:7:2]
m: Matrix[\RR64,3,4\] = [...]
m[1, :]                   (* row 1                     *)
m[:, 2]                   (* column 2                  *)
m[(1,1)#(2,2)]            (* 2x2 block                 *)
m.subarray[\0,2,0,2,1,1\](1,1)
```
All are **zero-copy views**: `p01` writes `s[0] := 99.0` and `v[4]` becomes `99.0`; `p04` writes through `m[1,:]` into `m`. Carriers: `__SimpleSubArray1` (`FortressLibrary.fss:2158`), `Col` (`:2473`), `Row` (`:2484`), `SubArray2` (`:2451`).

**The defect:** every one of those carriers `extends Array1`/`Array2`, never `Vector`/`Matrix`. So:
```
subarray is NOT an AnyVector          v[4:7] is NOT an AnyVector
row is NOT an AnyVector               block is NOT an AnyMatrix
```
`u+v`, `DOT`, `M v`, `scale`, `SUM` are all `[\T extends Number, nat n\]` on `Vector`/`Matrix` and do not apply. Classification: **library-design choice** (the view classes could have extended `Vector` when `T extends Number`, exactly as `array1`'s typecase at `fss:2239-2244` does for fresh arrays; they do not).

**Failure verbatim** — `m[1, 1:2]`, the mixed index/range form (`p03`):
```
Failed to find any matching overload, args = (1: ZZ32,CompactFullParScalarRange[\ZZ32\]), overload = {
	_[_](r:Range[\(FortressLibrary.ZZ32, FortressLibrary.ZZ32)\]):Array[\T,(...)\] ...fss:2330:3-2337:6
	_[_](i0:FortressLibrary.ZZ32,_:FortressLibrary.TrivialOpenRange):Array[\T,ZZ32\] ...fss:2363:3-2366:2
	_[_](_:FortressLibrary.TrivialOpenRange,i1:FortressLibrary.ZZ32):Array[\T,ZZ32\] ...fss:2359:3-2362:2
	_[_](i:I):E ...fss:1817:5-1822:61
	_[_](_:FortressLibrary.TrivialOpenRange):Array2[\T,0,s0,0,s1\] ...fss:2338:3-2358:34}:OverloadedMethod
```
Cause: `opr[r:Range[\ZZ32\], i1:ZZ32]`, `opr[i0:ZZ32, r:Range[\ZZ32\]]` and the whole pair-of-ranges group are inside `(* ... *)` at `FortressLibrary.fss:2340-2356` and `2360-2367`, and absent from the `.fsi`. **Implementation gap** (dead code the library shipped commented out).

### Two ways back to algebra

**(a) copy — `p05`.** `Array1.replica` → `__builtinFactory1` → `array1`'s `() -> Number` typecase re-vectorizes, so `copy()`, `map`, `ivmap` on a view all yield real `Vector`s:
```
s.copy()          IS an AnyVector       sc DOT sc= 126.0
m[1,:].copy()     IS an AnyVector       row1 DOT row1 = 126.0
m[(1,1)#(2,2)].copy() IS an AnyMatrix
```

**(b) our own view object — `p13`, the winning spelling.** `Vector` carries no `comprises` clause, so extending it is legal Fortress (contrast `Number`, `FortressLibrary.fss:352`, whose seal the earlier report had to break):
```fortress
object VecView(base: Vector[\RR64,8\], off: ZZ32) extends Vector[\RR64,4\]
    get(i: ZZ32): RR64 = base.get(i + off)
    put(i: ZZ32, v: RR64): () = base.put(i + off, v)
    init0(i: ZZ32, v: RR64): () = base.init0(i + off, v)
    replica[\U\](): Array1[\U,0,4\] = array1[\U,4\]()
end
```
```
VecView IS an AnyVector
  s + s = [0#4][ 8.0 10.0 12.0 14.0 ]     s DOT s = 126.0
  s.scale(2.0) = [0#4][ 8.0 10.0 12.0 14.0 ]   ||s|| = 11.224972160321824
  SUM s = 22.0                            A s = [0#3][ 4.0 5.0 6.0 ]
  after s[0] := 99.0, v = [0#8][ 0.0 1.0 2.0 3.0 99.0 5.0 6.0 7.0 ]  (zero-copy view: true)
RowView IS an AnyVector                   RowView(A,1) DOT s = 5.0
```
A `RowView(base: Matrix[\RR64,3,4\], r: ZZ32) extends Vector[\RR64,4\]` does the same for matrix rows, writes included. Classification: **a choice on our side** — no library, compiler or language change.

### Containers — `p06`
```fortress
rows: List[\Vector[\RR64,4\]\] = <|[\Vector[\RR64,4\]\] r0, r1, r2 |>
m = matrix[\RR64,3,4\]().fill(fn (i:ZZ32,j:ZZ32):RR64 => rows[i].get(j))
heads: List[\Matrix[\RR64,2,2\]\] = <|[\Matrix[\RR64,2,2\]\] h0, h1 |>
for h <- seq(heads) do println((h y)) end
cat = vector[\RR64,4\](fn (i:ZZ32):RR64 => (heads[i DIV 2] y).get(i MOD 2))
```
```
matrix from rows IS an AnyMatrix      m x = [0#3][ 6.0 22.0 38.0 ]
|heads| = 2   heads[1] y = [0#2][ 50.0 80.0 ]
concat of head outputs = [0#4][ 5.0 8.0 50.0 80.0 ]
```
Without the element static arg the literal fails — **implementation gap**, list-literal element inference picks the carrier and `List[\T\]` is invariant:
```
RHS expression type ArrayList[\__DefaultVector[\RR64,4\]\] is not assignable to
LHS type List[\Vector[\RR64,4\]\]
```
And chained subscript `rows[i][j]` misparses (`Failed to find any matching overload, args = ()`), so write `rows[i].get(j)`.

## Q2. Runtime-sized shapes — `p07`

**Winning spelling (route A), one line:**
```fortress
n: ZZ32 = 4 ; m: ZZ32 = 3
a = array[\RR64\](n).fill(fn (i:ZZ32):RR64 => 1.0 (i+1))       (* Array[\RR64,ZZ32\] *)
g = array[\RR64\](m,n).fill(fn (i:ZZ32,j:ZZ32):RR64 => ...)     (* Array[\RR64,(ZZ32,ZZ32)\] *)
```
Static types are those in `FortressLibrary.fsi:1345-1346`; the *dynamic* types are `__DefaultVector`/`__DefaultMatrix` (`array` → `reflect` → `array1`/`array2`, `fss:1922`), so everything dispatches:
```
A: array[RR64](n).fill(...) IS an AnyVector    a + b = [0#4][ 11.0 22.0 33.0 44.0 ]
a DOT b = 300.0                                 array[RR64](m,n) IS an AnyMatrix
g a = [0#3][ 20.0 60.0 100.0 ]                  g.t() = 4x3
```
Route B, when the true static type `Vector[\RR64,n\]` is wanted, needs one hoisted generic per shape (`import NatReflect.{...}`):
```fortress
mkVec[\nat n\](w:N[\n\], f:ZZ32->RR64): Vector[\RR64,n\] = vector[\RR64,n\](f)
mkMat[\nat n, nat m\](wn:N[\n\], wm:N[\m\], f:(ZZ32,ZZ32)->RR64): Matrix[\RR64,n,m\] =
    matrix[\RR64,n,m\]().fill(f)
...  v = mkVec(reflect(n), f)   W = mkMat(reflect(m), reflect(n), f)
```
`B: (W.t()) (W v) = [0#4][ 1040.0 1220.0 1400.0 1580.0 ]`. Both routes verified end to end.

Naming the route-A type repeatedly is unavoidable — **implementation gap the spec already flags** (`Specification/basic/declarations.tex:20`, `types-vals-vars.tex:18`; grammar at `:601`):
```
** bug! Not yet implemented: TypeAlias at .../p09.fss:14.1
```

## Q3. Closures over vectors — `p08`, `p09`

**Winning spelling:**
```fortress
linear(W: Matrix[\RR64,3,4\], x: Vector[\RR64,4\])
    : (Vector[\RR64,3\], Vector[\RR64,3\] -> (Vector[\RR64,4\], Matrix[\RR64,3,4\])) =
  (W x,
   fn (g: Vector[\RR64,3\]): (Vector[\RR64,4\], Matrix[\RR64,3,4\]) =>
       (W.t() g, matrix[\RR64,3,4\]().fill(fn (i:ZZ32,j:ZZ32):RR64 => g[i] x[j])))
```
```
y = [0#3][ 0.4 1.4 2.4 ]                L = 7.879999999999999
dL/dx (analytic) = [0#4][ 5.800000000000001 6.64 7.48 8.32 ]
dL/dx (fin.diff) = [0#4][ 5.799999998882413 6.640000000130385 7.480000000447035 8.3199999993667 ]
max |err_x| = 1.11758780008131E-9
dL/dW[0,0]  analytic=0.8   fd=0.7999999998137355   err=1.862645593320167E-10
dL/dW[2,3]  analytic=2.4   fd=2.400000000372529    err=3.725291186640334E-10
dL/dW[1,2]  analytic=-2.8  fd=-2.7999999998137355  err=1.8626433728741176E-10
```
Composition and a reverse-order tape (`p09`):
```fortress
compose(f: Vector[\RR64,4\] -> Vector[\RR64,4\], g: ...): ... = fn (v) => g(f(v))
tape: List[\Vector[\RR64,4\] -> Vector[\RR64,4\]\] = <|[\Vector[\RR64,4\] -> Vector[\RR64,4\]\] ... |>
var gv: Vector[\RR64,4\] := x
for k <- seq(0 # |tape|) do gv := tape[|tape| - 1 - k](gv) end
```
```
compose(fA,fB)(x)       = [0#4][ 8.653809523809525 6.215476190476191 ... ]
B (A x)                 = [0#4][ 8.653809523809525 6.215476190476191 ... ]
tape applied in reverse = [0#4][ 19.366666666666667 12.89 9.88 8.06047619047619 ]
expected A^T (B^T (2 x))= [0#4][ 19.366666666666667 12.89 9.88 8.06047619047619 ]
```
The same works through the runtime-sized static type: `axpy(a: RR64, u: Array[\RR64,ZZ32\], v: Array[\RR64,ZZ32\]) = u.scale(a) + v` and a closure of that arrow type both run (`runtime-sized u DOT w = 300.0`). Note `W.t()` is `TransposedMatrix` (`fss:2571`), a **view** — free.

## Q4. Parallel accumulation — `p10`, `p11`

**`SUM` over vectors fails** (`p10`), verbatim:
```
/home/user/fortress/Library/FortressLibrary.fss:36:13-27:
CastError
Context:
/home/user/fortress/Library/FortressLibrary.fss:36:13-27:      <- cast[\Number\]
/home/user/fortress/Library/FortressLibrary.fss:1120:25-34:    <- __bigOperator, r.lift
/home/user/fortress/explorations/matrix-ad-probes/p10.fss:12:30-38:
```
`opr SUM[\T extends Number\]() = Comprehension[\...\](fn x => x, SumReduction, cast[\Number\])` (`fss:3041-3042`); `SumReduction` is `CommutativeMonoidReduction[\Number\]` with `empty(): Number = 0` (`fss:3021-3029`). `Vector` extends `AdditiveGroup[\Vector[\T,s0\]\]`, not `Number` (`.fsi:1461`). **Library-design limit**, the same monomorphism the earlier report logged as defect E — here it bites plain `RR64` vectors, not only user element types.

**Smallest spec-legal spellings that do work** (`p11`), both parallel:
```fortress
object VecSum3 extends CommutativeMonoidReduction[\Vector[\RR64,3\]\]
    getter asString(): String = "VecSum3"
    empty(): Vector[\RR64,3\] = vector[\RR64,3\](0.0)
    join(a: Vector[\RR64,3\], b: Vector[\RR64,3\]): Vector[\RR64,3\] = a + b
end

(* (b) direct *)
tb = __generate[\ZZ32, Vector[\RR64,3\]\](0#n, VecSum3, contrib)

(* (c) as a real big operator -- Specification/basic/expressions/reductions.tex:28-34 *)
opr BIG OPLUS(): BigReduction[\Vector[\RR64,3\],Vector[\RR64,3\]\] =
    BigReduction[\Vector[\RR64,3\],Vector[\RR64,3\]\](VecSum3)
opr BIG OPLUS(g: Generator[\Vector[\RR64,3\]\]): Vector[\RR64,3\] =
    __bigOperatorSugar[\Vector[\RR64,3\],Vector[\RR64,3\],
                       Vector[\RR64,3\],Vector[\RR64,3\]\](BIG OPLUS(), g)
tc = BIG OPLUS [ i <- 0#n ] contrib(i)
```
`__generate` is public at `FortressLibrary.fsi:701`; `BigReduction` at `.fsi:1789`.

`n = 100`, expected `[5050.0 10100.0 15150.0]`:

| | threads 1 | threads 4 (three runs) |
|---|---|---|
| (b) `__generate` + `VecSum3` | 5050 10100 15150 | 5050 10100 15150 (×3) |
| (c) `BIG OPLUS [i<-0#n]` | 5050 10100 15150 | 5050 10100 15150 (×3) |
| (d) `atomic do acc := acc + c end` | 5050 10100 15150 | 5050 10100 15150 (×3) |
| (e) `acc := acc + c`, no `atomic` | 5050 10100 15150 | **1563 / 2930 / 2338** |

Row (e) is the point: on one thread the bug is invisible.

**Which the spec recommends:** the reduction, not the mutation. `Specification/basic/evaluation/reduction.tex:15-17` gives reductions "special treatment … to avoid the need to synchronize in the middle of relatively simple `for` loops" — and its `for`-loop-friendly `acc += e` form carries `\note{Reduction variables are not yet supported.}` (`:14`), which our (e) result is exactly the symptom of. So today the choice is *reduction expression* (b/c) or *explicit `atomic`* (d); the spec's preferred middle option does not exist yet. **Implementation gap.**

## Q5. Cost — `p12`, `p14`

Walk interpreter, JDK 25, 100 repetitions of forward+backward of the Q3 chain at n=16 (`W: 16×16`, `y = W x`, `L = Σ y_i²`, `∂L/∂x = Wᵀ(2y)`, `∂L/∂W = (2y)xᵀ`), timed with `nanoTime()` (`FortressLibrary.fsi:2388`), checksum identical across all runs:

| threads | total | per forward+backward |
|---|---|---|
| 1 | 1.199 s / 1.165 s | **11.99 / 11.65 ms** |
| 4 | 1.027 s / 1.016 s | **10.27 / 10.16 ms** |

Rough breakdown at n=16, 100 reps each, one thread (`p14`; first-measured op absorbs JIT warm-up, so read only the shape):
```
W x            ms/op = 5.64      W.t()       ms/op = 0.06   (view, as expected)
W.t() g        ms/op = 2.75      outer g x^T ms/op = 4.56
SUM x_i^2      ms/op = 0.24      W + W       ms/op = 3.30
```
Order of magnitude: ~10 µs per scalar multiply-add through the interpreter's dispatch. Threads buy nothing at n=16.

**This is the interpreter.** The bytecode compiler path cannot run any of it — `Vector`/`Matrix`/`array`/`matrix` are absent from `Library/CompilerLibrary.fsi` (gaps G2 and G4 in `explorations/compiled-path-gaps.md`; not re-verified here).

## What this means for a matrix-level AD design

1. **The value/backward-closure pair is the right shape and it works today.** `p08` is a complete, finite-difference-checked reverse-mode step over library types, in six lines, with no illegal declaration and no library edit. Composition, tapes and `List`s of closures all hold up (`p09`).
2. **Do not slice for algebra; project for algebra.** The shipped views are fast and correct but algebraically inert. Two options, and the design should pick one deliberately: `.copy()` at each slice (allocates, simple), or ~6-line `VecView`/`RowView`/`ColView` objects extending `Vector[\RR64,k\]` (zero-copy, spec-legal, `p13`). For attention heads over a concatenated activation vector, the second is what makes a head a first-class `Vector` without a per-token copy.
3. **Sizes need not be static.** `array[\RR64\](n)` / `array[\RR64\](n,m)` gives full-strength vectors and matrices from ordinary `ZZ32`. The cost is verbosity: no `type` aliases, so `Array[\RR64,ZZ32\]` gets written out everywhere, and static args must be spelled on list literals.
4. **Every accumulation over vectors needs a hand-written reduction.** `SUM` is closed to anything but `Number`. One `CommutativeMonoidReduction[\Vector[\RR64,k\]\]` per width (or one generic over `nat k`) plus a `BIG OPLUS` declaration buys parallel-safe gradient accumulation; the untyped `acc := acc + c` alternative is silently wrong the moment threads exceed one.
5. **Speed is the open risk, not expressiveness.** ~11 ms per 16×16 forward+backward means a char-level transformer of any realistic size is minutes-to-hours per step on the interpreter, and the compiler path is not an escape hatch until `Vector`/`Matrix` reach `CompilerLibrary`. A matrix-level formulation is nonetheless the right lever: it replaces per-scalar closure allocation with per-tensor closure allocation, and `W.t()` is free.
