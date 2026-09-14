# Shipped array algebra in `Library/FortressLibrary.fss` (interpreter library)

Survey for the native-array microGPT design. All line numbers are in
`/home/user/fortress/Library/FortressLibrary.fss` unless another file is named.
Every "works" claim below is backed by a run under
`/tmp/claude-0/-home-user-fortress/bdff267d-67dc-5bb9-b970-8c3dfaa634b6/scratchpad/c3/survey/`
(`Sv*.fss` + `Sv*.out`), JDK 25, `bin/fortress` interpreter, 2026-09-14.

## 0. Orientation: the type tower

```
Generator[\E\]                       957
  Indexed[\E,I\]                    1636      opr[], indices, ivmap, map, |self|
    MutableIndexed[\E,I\]           1789      opr[]:=
    ReadableArray[\E,I\]            1802      get/put/init0/offset/toIndex, fill, copy, replica
      ImmutableArray[\E,I\]         1870
      Array[\E,I\]                  1886      assign, freeze
        ReadableArray1[\T,b0,s0\]   2013      static bounds b0#s0
          Array1[\T,b0,s0\]         2093      subarray, shift, map/ivmap with exact result type
            Vector[\T extends Number, nat s0\]   2189   + - unary- scale pmul dot
        Array2[\T,b0,s0,b1,s1\]     2289      sizes, t(), row/col extraction, subarray
          Matrix[\T extends Number, nat s0, nat s1\]  2497   + - unary- scale mul rmul lmul t
AdditiveGroup[\T\]                   328      supplies the *shape* of + - unary-
```

`Vector` and `Matrix` are **not** rings: both carry
`excludes { AnyMultiplicativeRing }` (2191, 2499). Multiplication therefore never
comes from `opr TIMES`; it comes from free `opr DOT` / `opr juxtaposition`
declarations at top level (2261–2277, 2621–2654).

Practical fact (checked, `SvG3.out`): `array[\ZZ32\](3)` and `array[\RR64\](3)`
both come back as `AnyVector` instances; `array[\String\](2)` does not. The
`typecase` in `array1` (2240–2244) routes any numeric element type to
`vector[\T,s0\]()`. So integer index vectors get the Vector algebra too.

---

## 1. What is declared

### 1a. `Vector[\T extends Number, nat s0\]` — trait at 2189

| name | signature as declared | declared in | line | computes |
|---|---|---|---|---|
| `opr +` | `opr +(self, v:Vector[\T,s0\]): Vector[\T,s0\]` | `Vector` | 2192 | elementwise sum, via `ivmap` |
| `opr -` | `opr -(self, v:Vector[\T,s0\]): Vector[\T,s0\]` | `Vector` | 2194 | elementwise difference |
| `opr -` (unary) | `opr -(self): Vector[\T,s0\]` | `Vector` | 2196 | negation, via `map` |
| `scale` | `scale(t: T): Vector[\T,s0\]` | `Vector` | 2197 | scalar multiple `t v` |
| `pmul` | `pmul(v: Vector[\T,s0\]): Vector[\T,s0\]` | `Vector` | 2198 | **Hadamard product as a method** |
| `dot` | `dot(v: Vector[\T,s0\]): T` | `Vector` | 2200 | inner product, `SUM` over `indexValuePairs` |
| `getter zero` | `getter zero(): T = self - self` | `AdditiveGroup` | 329 | zero vector |
| `get/put/init0` | `get(i:ZZ32):T` etc. | `__DefaultVector` | 2206–2208 | 0-based unchecked access over `PrimitiveArray` |
| `replica` | `replica[\U\]():Array1[\U,0,s0\] = array1[\U,s0\]()` | `__DefaultVector` | 2209 | same-shape array of a different element type |

Free functions and operators on `Vector` (all top level, outside any trait):

| name | signature as declared | line | computes |
|---|---|---|---|
| `pmul` | `pmul[\T extends Number, nat k\](a:Vector[\T,k\], b:Vector[\T,k\]):Vector[\T,k\]` | 2258 | Hadamard, function form |
| `opr DOT` | `opr DOT[\T extends Number, nat n\](me:Vector[\T,n\], other:Vector[\T,n\]):T` | 2261 | inner product |
| `opr juxtaposition` | same params, `:T` | 2264 | `a b` **is** the inner product |
| `opr DOT` | `(me:Vector[\T,n\], other:T) : Vector[\T,n\]` | 2267 | vector · scalar |
| `opr juxtaposition` | `(me:Vector[\T,n\], other:T) : Vector[\T,n\]` | 2270 | `a 2.0` |
| `opr DOT` | `(other:T, me:Vector[\T,n\]) : Vector[\T,n\]` | 2273 | scalar · vector |
| `opr juxtaposition` | `(other:T, me:Vector[\T,n\]) : Vector[\T,n\]` | 2276 | `2.0 a` |
| `squaredNorm` | `squaredNorm[\T extends Number, nat s0\](a:Vector[\T,s0\]):T` | 2279 | `a.dot(a)` |
| `opr ‖·‖` | `opr ||[\T extends Number, nat k\]me : Vector[\T,k\]|| : RR64` | 2281 | Euclidean norm (enclosing operator) |
| `vector` | `vector[\T extends Number, nat s0\]():Vector[\T,s0\]` | 2252 | empty vector = `__DefaultVector` |
| `vector` | `vector[\...\](v:T)` / `(f:ZZ32->T)` | 2253, 2255 | constant-filled / function-filled |

### 1b. `Matrix[\T extends Number, nat s0, nat s1\]` — trait at 2497

| name | signature as declared | declared in | line | computes |
|---|---|---|---|---|
| `opr +` | `opr +(self, v:Matrix[\T,s0,s1\]): Matrix[\T,s0,s1\]` | `Matrix` | 2500 | elementwise sum |
| `opr -` | `opr -(self, v:Matrix[\T,s0,s1\]): Matrix[\T,s0,s1\]` | `Matrix` | 2502 | elementwise difference |
| `opr -` (unary) | `opr -(self): Matrix[\T,s0,s1\]` | `Matrix` | 2504 | negation |
| `scale` | `scale(t1: T): Matrix[\T,s0,s1\]` | `Matrix` | 2505 | scalar multiple |
| `mul` | `mul[\nat s2\](other: Matrix[\T,s1,s2\]): Matrix[\T,s0,s2\]` | `Matrix` | 2506 | matrix product; recursive cache-oblivious `mm`/`mma` split via `partition` (2004) |
| `rmul` | `rmul(v: Vector[\T,s1\]): Vector[\T,s0\]` | `Matrix` | 2549 | `M v` — per-row `SUM` |
| `lmul` | `lmul(v: Vector[\T,s0\]): Vector[\T,s1\]` | `Matrix` | 2554 | `v M` — per-column `SUM` |
| `t` | `t(): Matrix[\T,s1,s0\]` | `Matrix` | 2559 | transpose **view** (`TransposedMatrix`, 2571) — no copy |
| `t` | `t():Array2[\T,b1,s1,b0,s0\]` | `Array2` | 2395 | same, for plain 2-D arrays (`TransposedArray2`, 2425) |
| overrides | `scale`/`rmul`/`lmul`/`t`/`replica` on the transpose view | `TransposedMatrix` | 2573–2584 | delegate to the underlying matrix with indices swapped |

Free operators on `Matrix` (top level):

| name | signature as declared | line |
|---|---|---|
| `opr DOT` | `[\T extends Number, nat n, nat m, nat p\](me:Matrix[\T,n,m\], other:Matrix[\T,m,p\]): Matrix[\T,n,p\]` | 2621 |
| `opr juxtaposition` | same | 2625 |
| `opr DOT` | `[\T,nat n,nat m\](me:Matrix[\T,n,m\], v:Vector[\T,m\]):Vector[\T,n\]` | 2631 |
| `opr juxtaposition` | same — this is what makes `m v` work | 2634 |
| `opr DOT` | `[\T,nat n,nat m\](v:Vector[\T,n\], me:Matrix[\T,n,m\]):Vector[\T,m\]` | 2638 |
| `opr juxtaposition` | same | 2641 |
| `opr DOT` / `opr juxtaposition` | `(me:Matrix[\T,n,m\], other:T)` → scale | 2644, 2647 |
| `opr DOT` / `opr juxtaposition` | `(other:T, me:Matrix[\T,n,m\])` → scale | 2650, 2653 |
| `matrix` | `matrix[\T extends Number, nat s0, nat s1\]():Matrix[\T,s0,s1\]` | 2613 |
| `matrix` | `matrix[\...\](v:T)` — **builds `v·I`, not a constant matrix** (2616) | 2615 |

### 1c. Generic array machinery inherited by both

| name | signature as declared | declared in | line | computes |
|---|---|---|---|---|
| `opr[i:I]` | `opr[i:I] : E` (abstract); `opr[i:I]:E = get(offset(i))` | `Indexed` / `ReadableArray` | 1675 / 1817 | bounds-checked read; `m[i,j]` is one tuple index |
| `opr[i:I]:=` | `opr[i:I]:=(v:E) : ()` ; `= put(offset(i),v)` | `MutableIndexed` / `Array` | 1791 / 1889 | element write |
| `opr[x,y]:=` | `opr[x:ZZ32,y:ZZ32]:=(v:T):()` | `Array2` | 2329 | 2-D element write |
| `opr[r:Range[\I\]]` | `opr[r:Range[\I\]] : Indexed[\E,I\]` (abstract) | `Indexed` | 1690 | **slice**; 0-based result |
| `opr[r:Range]` | `opr[r: Range[\ZZ32\]] : Array[\T,ZZ32\]` | `Array1` | 2107 | `a[0#2]`, strided, via `__SimpleSubArray1` (2158) |
| `opr[r]` 2-D | `opr[r:Range[\(ZZ32,ZZ32)\]]: Array[\T,(ZZ32,ZZ32)\]` | `Array2` | 2330 | 2-D block slice |
| `opr[r]:=` | `opr[r:Range[\I\]]:=(a:Indexed[\E,I\]):()` | `Array` | 1891 | bulk range assignment, extents must match |
| `opr[_:TrivialOpenRange]` | `opr[_:TrivialOpenRange] : Array1[\T,0,s0\]` | `Array1` / `Array2` | 2114 / 2338 | `a[:]`, rebase to 0 |
| **row extraction** | `opr[i0:ZZ32, _:TrivialOpenRange]: Array[\T,ZZ32\] = Row(self[(i0,b1)#(1,s1)])` | `Array2` | 2363 | `m[0,:]` → a `Row` view (object at 2484) |
| **column extraction** | `opr[_:TrivialOpenRange, i1:ZZ32]: Array[\T,ZZ32\] = Col(self[(b0,i1)#(s0,1)])` | `Array2` | 2359 | `m[:,0]` → a `Col` view (object at 2473) |
| (range × index forms) | `opr[r:Range[\ZZ32\], i1:ZZ32]` etc. | `Array2` | 2341–2357, 2361, 2365 | **commented out** in the source |
| `subarray` | `subarray[\nat b, nat s, nat o\](m:ZZ32):Array1[\T,b,s\]` | `Array1` | 2120 | static-parameter slice (offset `o`, stride `m`) |
| `subarray` 2-D | `subarray[\nat bo0,nat so0,nat bo1,nat so1,nat o0,nat o1\](m0:ZZ32,m1:ZZ32)` | `Array2` | 2381 | static 2-D block |
| `shift` | `shift(o:ZZ32): Array[\T,ZZ32\]` / `shift(t1:(ZZ32,ZZ32))` | `Array1` / `Array2` | 2100 / 2367 | re-origin view |
| `map` | `map[\R\](f:T->R): Array1[\R,b0,s0\]` | `Array1` | 2135 | `replica[\R\]().fill(...)` — **eager copy** |
| `map` 2-D | `map[\R\](f:T->R): Array2[\R,b0,s0,b1,s1\]` | `Array2` | 2397 | eager copy |
| `ivmap` | `ivmap[\R\](f:(ZZ32,T)->R): Array1[\R,b0,s0\]` | `Array1` | 2137 | index-and-value map (eager) |
| `ivmap` 2-D | `ivmap[\R\](f:((ZZ32,ZZ32),T)->R): Array2[\R,...\]` | `Array2` | 2399 | index-and-value map |
| `ivmap` (lazy) | `ivmap[\R\](f:(I,E)->R): Indexed[\R, I\]` | `Indexed` | 1702 | generic fallback |
| `fill` | `fill(f:I->E):T` and `fill(v:E):T` | `StandardImmutableArrayType` | 1974, 1978 | initialise every slot, returns `self` |
| `assign` | `assign(f:I->E):T` and `assign(v:T):T` | `StandardMutableArrayType` | 1993, 1989 | overwrite every slot (uses `put`, not `init0`) |
| `copy` | `copy():Array1[\T,b0,s0\]` / `copy():Array2[\...\]` | `Array1` / `Array2` | 2129 / 2391 | deep copy through `replica` |
| `replica` | `replica[\U\]():Array1[\U,b0,s0\]` / 2-D | `Array1` / `Array2` | 2127 / 2389 | same shape, new element type |
| `freeze` / `thaw` | `freeze():ImmutableArray1[\T,b0,s0\]` / `thaw():Array1[...]` | `Array1` / `ImmutableArray1` | 2132 / 2082 | (2-D `freeze` is `fail(...)`, 2402) |
| `getter indices` | `getter indices(): Generator[\I\] = self.bounds` | `ReadableArray` | 1807 | index generator |
| `getter indexValuePairs` | `getter indexValuePairs(): Indexed[\(I,E),I\]` | `Indexed`/`ReadableArray` | 1655 / 1808 | `(i,v)` generator |
| `getter generator` | `getter generator(): Indexed[\E,I\]` | `ReadableArray` | 1810 | element generator (what `x <- a` uses) |
| `getter bounds` | `getter bounds():CompactFullRange[\ZZ32\]` / `CompactFullRange2D` | `ReadableArray1` / `Array2` | 2017 / 2295 | index range |
| `getter size` | `getter size():ZZ32 = s0` / `= s0 s1` | `ReadableArray1` / `Array2` | 2016 / 2293 | element count |
| `getter sizes` | `getter sizes():(ZZ32,ZZ32) = (s0, s1)` | `Array2` | 2294 | shape pair (inherited by `Matrix`) |
| `opr \|self\|` | `opr |self| : ZZ32 = s0` / `= s0 s1` | `ReadableArray1` / `Array2` | 2030 / 2314 | **element count, not a norm** |
| `opr =` | `opr =(self, other:HasRank): Boolean` | `ReadableArray` | 1861 | elementwise equality reduced with `AndReduction` |
| `indexOf` | `indexOf(e:E): Maybe[\I\]` | `Indexed` | 1707 | first index holding `e` |
| `getter reverse` | `getter reverse():Indexed[\E,I\]` | `Indexed` | 1660 | reversed view |
| `toArray` | `toArray[\E\](g:Indexed[\E,ZZ32\]): Array[\E,ZZ32\]` | top level | 1749 | materialise any 1-D Indexed |

### 1d. Constructors / factories

| name | signature | line | notes |
|---|---|---|---|
| `array` | `array[\E\](x:ZZ32):Array[\E,ZZ32\]` | 1922 | runtime size, via `reflect` → `__arr1` (1930) |
| `array` | `array[\E\](x:ZZ32,y:ZZ32):Array[\E,(ZZ32,ZZ32)\]` | 1923 | 2-D |
| `array` | `array[\E\](x,y,z)` | 1925 | 3-D |
| `array1` | `array1[\T, nat s0\]():Array1[\T,0,s0\]` + `(v:T)` + `(f:ZZ32->T)` | 2240, 2245, 2246 | `typecase` routes numeric `T` to `vector` |
| `array2` | `array2[\T, nat s0, nat s1\]()` + `(v:T)` + `(f:(ZZ32,ZZ32)->T)` | 2600, 2605, 2607 | routes numeric `T` to `matrix` |
| `array3` | `array3[\T,nat s0,nat s1,nat s2\]()` … | 2814–2818 | |
| `vector` | see 1a | 2252–2256 | |
| `matrix` | see 1b | 2613–2616 | `matrix[\T,n,n\](v)` = `v·I` (confirmed, `SvG2.out`) |
| `__builtinFactory1` | `__builtinFactory1[\T, nat b0, nat s0\]():Array1[\T,b0,s0\]` | 2218 | **name enshrined in `WellKnownNames.java`**; `LHSEvaluator.java`/`NonPrimitive.java` know the type parameters (comment at 2212–2217) |
| `__builtinFactory2` | `__builtinFactory2[\T,nat b0,nat s0,nat b1,nat s1\]()` | 2591 | ditto |
| `__immutableFactory1` | `…():ReadableArray1[\T,b0,s0\]` | 2229 | also in `WellKnownNames`; used for varargs storage |
| `immutableArray` / `primitiveArray` | 1939 / 1959 | | |
| `__DefaultVector` | `object __DefaultVector[\T, nat s0\]() extends Vector[\T,s0\]` | 2204 | storage = `PrimitiveArray[\T,s0\]` |
| `__DefaultMatrix` | `object __DefaultMatrix[\T, nat s0, nat s1\]() extends Matrix[\T,s0,s1\]` | 2563 | row-major flat `PrimitiveArray[\T,(s0 s1)\]`, index `i s1 + j` |
| `__DefaultArray2` | 2415 | | same layout, non-numeric elements |
| `Row` / `Col` | `object Row[\T, nat b1, nat s1\](mem: Array2[\T,0,1,b1,s1\]) extends Array1[\T,b1,s1\]` | 2484 / 2473 | **views, extend `Array1` not `Vector`** |

### 1e. Reductions usable over arrays

`Generator[\E\]` (957) gives `generate` (980), `map` (987), `seq` (990), `nest`
(1002), `filter` (1008), `mapReduce` (1043), `reduce` (1047, 1048). An array is a
`Generator` of its elements, so `SUM[x <- a] x`, `SUM[x <- m] x`,
`BIG MAX[x <- a] x` all work out of the box.
Reduction operators: `opr SUM` 3041/3044, `opr PROD` 3058/3061,
`opr BIG MAXN` 3071, `opr BIG MINN` 3081, `opr BIG MIN` 3109, `opr BIG MAX` 3118,
`opr BIG MINMAX` 3131, `opr BIG MAXNUM` 3144, `opr BIG AND` 3245, `opr BIG OR` 3260.
Note `opr SUM[\T extends Number\]` is sealed to `Number`
(`trait Number … comprises { RR64 }`, 349–352) — it cannot be commandeered for a
user scalar type (that was established earlier in `explorations/nprobe.fss`).

---

## 2. What is ABSENT

| wanted | status | nearest thing that exists |
|---|---|---|
| Hadamard `a × b` / `a .* b` as an **operator** | **absent** — checked: `a TIMES b` fails (`SvD6.out`) | `pmul` as method (2198) and free function (2258); `ivmap` (2137). A user `opr ×` works — §3/§5b |
| elementwise divide of two arrays | **absent**; `a / 2.0` also fails (`SvD3.out`) — `Vector` has no `opr /` at all | `a.pmul(b.map(fn e => 1.0/e))`, or `a.scale(1.0/s)` for the scalar case |
| scalar **add**/**subtract** extension (`a + 1.0`, `1.0 + a`) | **absent** both orders (`SvE1.out`, `SvE2.out`) | only multiplication is extended (2267–2277, 2644–2654). Write `a.map[\RR64\](fn e => e + s)` or declare `opr +` — works, `SvF4.out` |
| scalar **multiply** extension | **present** in both orders and both shapes | 2267–2277 (vector), 2644–2654 (matrix); `scale` 2197/2505 |
| elementwise `SQRT` on an array | **absent** (`SvD4.out`); `opr SQRT` is only on `Number` (383) | `a.map[\RR64\](fn e => SQRT e)`; a user prefix `opr SQRT` over `Vector` works (`SvF5.out`) |
| elementwise `exp` / `log` on an array | **absent** (no array overload anywhere) | `a.map`; user overload `exp[\nat n\](x:Vector[\RR64,n\])` works (`SvF5.out`) |
| elementwise `MAX`/`MIN` of two arrays | **absent** (`SvD9.out`) | `a.ivmap[\T\](fn (i,e) => e MAX b.get(i))` |
| comparisons returning 0/1 arrays | **absent** — `opr <` etc. exist only on `Number` (359–362) and as `LexicographicOrder` (1735) | `opr =` on arrays returns a single `Boolean` (1861). A user `opr >` over `Vector` overloads cleanly (`SvC1.out`) |
| row-wise reductions (sum/max of each row) | **absent as a method** | compose: `SUM[x <- m[i,:]] x` per row — works (`SvD8.out`), uses the row view at 2363 |
| **row slice / row view** of a matrix | **present**: `m[0,:]` (2363) | but it returns `Row` (2484) which extends `Array1`, **not** `Vector` — `m[0,:] + a` fails (`SvD1.out`). Copy into a vector to get the algebra back (`SvE5.out`) |
| **column** of a matrix | **present**: `m[:,0]` (2359 → `Col` 2473) | same caveat: `Col` is an `Array1`, not a `Vector` |
| row-range slices `m[0#2, :]`, `m[i, 0#3]` | **commented out** in the source (2341–2357, 2361, 2365) | 2-D block slice by a single `Range[\(ZZ32,ZZ32)\]` (2330), e.g. `m[(0,0)#(2,3)]`; static `subarray` (2381) |
| **row assignment** `m[0,:] := a` | **absent** (`SvE3.out` — no `:=` overload for `(ZZ32, TrivialOpenRange)`) | element loop, or `opr[r:Range]:=` (1891) with a 2-D range |
| **outer product** `a ⊗ b` | **absent** | `matrix[\RR64,m,n\]().fill(fn (i,j) => a[i] b[j])` |
| **gather by index vector** `a[idx]` | **absent** (`opr[]` takes an index or a `Range`, never an `Indexed`) | `idx.map[\RR64\](fn i => a[i])`, or `vector[\RR64,k\](fn j => a[idx[j]])` |
| **stacking rows into a matrix** | **absent** | `array2[\T,r,c\]().fill(fn (i,j) => rows[i][j])` |
| transpose as an operator (`m^T`) | **absent** as `opr ^`; the method exists | `t()` at 2559 (Matrix) / 2395 (Array2) — a view, not a copy |
| matrix inverse / solve / determinant | **absent** | — |
| `Vector`/`Matrix` of a user scalar type | **absent**: both require `T extends Number`, and `Number comprises { RR64 }` (352) | a user autodiff scalar cannot be a `Vector` element; use `Array1`/`Array2` of the user type and write the algebra, or keep `RR64` arrays and a separate tape |

---

## 3. How the library declares these, i.e. the pattern to copy

**Inside the trait, as ordinary `opr` methods on `self`** (`Vector`, 2192–2196):

```fortress
trait Vector[\T extends Number, nat s0\]
        extends { AnyVector, Array1[\T,0,s0\], AdditiveGroup[\Vector[\T,s0\]\] }
        excludes { AnyMultiplicativeRing }
    opr +(self, v:Vector[\T,s0\]): Vector[\T,s0\] =
        ivmap[\T\](fn (i:ZZ32, e: T):T => e + v.get(i))
    opr -(self): Vector[\T,s0\] = map[\T\](fn (e: T):T => - e)
    scale(t: T): Vector[\T,s0\] = map[\T\](fn (v) => t v)
    pmul(v: Vector[\T,s0\]): Vector[\T,s0\] =
        ivmap[\T\](fn (i:ZZ32, e: T):T => e v.get(i))
    dot(v: Vector[\T,s0\]): T =
        SUM [(i,me_i)<-self.indexValuePairs] me_i v.get(i)
end
```

Points to note: the operator methods carry **no static parameters of their own** —
`T` and `s0` come from the trait header; the result type is the *precise*
`Vector[\T,s0\]`, not `Array[\T,ZZ32\]`; `opr -` (unary) and `opr -` (binary)
are distinguished by arity alone; the `AdditiveGroup[\Vector[\T,s0\]\]`
supertype (declared at 328–333) is what makes `+`/`-`/`zero` coherent, and
`AdditiveGroup` gives defaults `opr -(self,other) = self + (-other)` (331) and
`getter zero() = self - self` (329), so a new group type only has to supply `+`
and unary `-`.

**At top level, as free operator declarations with their own static parameters**
(2261–2277):

```fortress
opr DOT[\ T extends Number, nat n \]
       (me : Vector[\T,n\], other : Vector[\T,n\]):T = me.dot(other)

opr juxtaposition[\ T extends Number, nat n \]
     (me : Vector[\T,n\], other : Vector[\T,n\]):T = me.dot(other)

opr juxtaposition[\ T extends Number, nat n \]
     (other : T, me : Vector[\T,n\]) : Vector[\T,n\] = me.scale(other)
```

and for matrices (2621–2635):

```fortress
opr DOT[\ T extends Number, nat n, nat m, nat p\]
       (me:Matrix[\T,n,m\], other:Matrix[\T,m,p\]): Matrix[\T,n,p\] =
        me.mul[\p\](other)

opr juxtaposition[\ T extends Number, nat n, nat m \]
     (me:Matrix[\T,n,m\], v:Vector[\T,m\]):Vector[\T,n\] = me.rmul(v)
```

Observations for a user writing their own:

- Static parameters sit **between the operator name and the parameter list**:
  `opr DOT[\ T extends Number, nat n \](…)`. `nat` parameters are the size
  variables; matching sizes are expressed by **repeating the same nat variable**
  (`Matrix[\T,n,m\] × Matrix[\T,m,p\]`), not by a `requires`/`where` clause.
- **No `requires` or `where` clause appears on any array operator in the
  library.** Bounds are written directly in the static parameter list
  (`T extends Number`). A `where` clause is nevertheless accepted by the
  interpreter — verified, `SvF3.out` used
  `opr ⊕[\T extends Number, nat n\](…): Vector[\T,n\] where { T extends Number } = …`.
- Results are typed **precisely** (`Vector[\T,n\]`, `Matrix[\T,n,p\]`, `T`),
  never `Array[\T,ZZ32\]`. Declaring the loose type also works (`SvB1.out`) but
  throws away the size, which blocks the next operator in a chain from unifying
  its nats. **Prefer the precise return type.**
- `opr juxtaposition` is the multiplication notation: every product in the
  library has a `DOT` form *and* a `juxtaposition` form with identical bodies.
  A user Hadamard should follow the same two-declaration habit if it is to be
  written both ways.
- The elementwise bodies are always `map` / `ivmap` (eager, via `replica().fill`),
  so every operator allocates a fresh array; `t()` is the one view-returning
  operation.

---

## 4. Specification sections that govern this

All paths relative to `/home/user/fortress/Specification/`.

**`advanced/operator-definitions.tex` — chapter "Operators" (`\chaplabel{operatordefs}`), §"Infix Operator Declarations" (line 115), §"Prefix Operator Declarations" (140), §"Multifix Operator Declarations" (86).**
"An operator declaration may appear anywhere a top-level function or method
declaration may appear… operator declarations are like other function or method
declarations in all respects except that an operator declaration has `opr` and
has an operator name instead of an identifier." An infix declaration takes
exactly two value parameters, neither varargs nor keyword, with static
parameters placed between the operator and the parameter list — exactly the
form the library uses at 2261. A **multifix** declaration is the same but must
accept at least two arguments and is best written with varargs; the note at the
head of the chapter says *multifix operators are not yet supported* by the
implementation, and the chapter's multifix example is commented out. Crucially:
"An operator method declaration must be a functional method declaration, a
subscripting operator method declaration, or a subscripted assignment operator
method declaration" — so an `opr` you want to attach to a trait you do **not**
own cannot be added as a method; declare it at top level instead, which is what
the library itself does for `DOT`/`juxtaposition` on `Vector`.

**`basic/operators/operator-app.tex` — §"Operator Names" (12).** "Fortress allows
most Unicode characters that are specified to be mathematical operators to be
used as operators," plus a listed ASCII set (`! @ # $ % * + - = | : < > / ? ^ ~`
and the arrow/comparison digraphs). Additionally "a token that is made up of a
mixture of uppercase letters and underscores (but no digits), does not begin or
end with an underscore, and contains at least two different letters is also
considered to be an operator" — that is the rule that makes `DOT`, `MAX`, `SUM`
operator names. So `×` (U+00D7), `÷` (U+00F7), `⊙` (U+2299), `⊕` (U+2295) are
all legal user operator names; §5b confirms the first four empirically.

**`basic/operators/opr-fixity.tex` — §"Operator Fixity" (12).** Fixity is decided
by *context*, not by declaration: any operator can be prefix, postfix, infix or
nofix. The practical rules: "An infix operator can be *loose* (whitespace on
both sides) or *tight* (whitespace on neither side), but it mustn't be
*lopsided*." That is the whitespace discipline to obey when writing `a × b`
versus `a×b`, and the reason `-a` parses as prefix negation.

**`basic/operators/chained-multifix.tex` — §"Chained and Multifix Operators" (12).**
Relational operators chain (`a ≤ b < c` means the conjunction); "Fortress
restricts such chaining to a mixture of equivalence operators and ordering
operators." *This matters for a user `opr >` returning a 0/1 vector*: `>` is a
chaining operator, so `a > s > t` would desugar into a conjunction, not a
pipeline. For non-chaining infix operators, "if n−1 occurrences of the same
operator separate n operands where n ≥ 3, the compiler first checks whether
there is a definition that will accept n arguments. If so, that definition is
used; if not, the operator is treated as left-associative" — the cartesian
product `S₁ × S₂ × ⋯ × Sₙ` is the spec's own example. So a binary `opr ×`
automatically gives left-associative chains (verified, `SvF1.out`).

**`basic/operators/juxtameaning.tex` — §"Juxtaposition" (12).** "If the
left-hand-side expression is a function, juxtaposition performs function
application; otherwise, juxtaposition performs the `juxtaposition` operator
application." Multi-element juxtapositions are reassociated using type
information: chunks are split wherever a non-function element is followed by a
function element, non-functions within a chunk group **left-associatively**, and
chunks then group right-associatively. Consequence for array code: `a b c` with
three vectors is `(a b) c`, i.e. a scalar times a vector, and mixing an
identifier that names a functional method into a juxtaposition is a static
error. Also: "if any element that remains has type String, then it is a static
error if there is any pair of adjacent elements … such that neither is String" —
which is why `println("x: " (a + b))` needs the parentheses.

**`basic/overloading.tex` — chapter "Overloading and Multiple Dispatch" (12),
§"Principles of Overloading" (55), §"Applicability to Named Functional Calls"
(117), §"Overloading Resolution" (256).** "For an overloaded functional call, the
most specific applicable declaration is chosen." Formally, "a declaration
`f(P)` is *more specific* than `f(Q)` if `P ≺ Q`" (strict subtype on the whole
parameter tuple). Static parameters "are inferred as described in
\chapref{type-inference} before comparing their parameter types." Applied to the
question "how is `(Vector, RR64)` picked over `(Vector, Vector)`": the two
parameter tuples are *incomparable* (neither `RR64 ≺ Vector` nor the converse),
so both declarations can coexist and exactly one is applicable at any call —
this is why the library can carry `opr DOT(Vector,Vector)`, `opr DOT(Vector,T)`
and `opr DOT(T,Vector)` simultaneously (2261–2277) without ambiguity. The
matching restrictions that guarantee no ambiguity are in
`advanced/overloading.tex`: §"Subtype Rule" (149), §"Incompatibility Rule" (175),
§"Meet Rule" (224), §"Coercion and Overloading Resolution" (449).

**`basic/expressions/reductions.tex` — §"Summations and Other Reduction
Expressions" (12).** A reduction expression is `Accumulator [StaticArgs]
[GeneratorClauseList] Expr`, where `Accumulator ::= Σ | Π | BIG (Encloser | Op)`.
"There is no explicit relationship between `BIG Op` and `Op`. Instead, a
reduction expression corresponds to a call to the `BIG Op` operator, which has
the header `opr BIG Op[\T\](g:(Reduction[\R0\],T→R0)→R0):R`." With no generator
clause list the body is itself taken to be a `Generator`, so `SUM a` ≡
`SUM[x ← a] x`. Each iteration of the body is an implicit parallel thread.
`advanced/subscripting.tex` §"Big Operator Declarations" (114) adds only that a
big operator "is declared as a usual operator declaration"; the worked example
is in `advanced/parallelism-locality/defining-generators.tex`.

**`basic/expressions/generators.tex` — §"Generators" (12)**, with
`basic/expressions/comprehensions.tex` §"Comprehensions" (12). A generator clause
list must begin with a generator binding `id ← expr`; the generator expression
must evaluate to a `Generator`. "By default, the programmer must assume that
generator iterations are run in parallel in separate implicit threads unless the
generators are instances of `SequentialGenerator`; the actual behavior of
generators is dictated by library code." A clause of type `Generator[\()\]`
(including `Boolean`) acts as a filter. This is what licenses `SUM[x <- a] x`
and `SUM[(i,v) <- a.indexValuePairs] …` over any array, and what makes `seq(…)`
necessary whenever an accumulation must be ordered.

**`basic/operators/opr-overview.tex` — §"Multiplication, Division, Modulo, and
Remainder Operators" (113), §"Comparisons Operators" (266).** The library-wide
conventions for which glyphs are in which precedence group; consult before
picking a glyph for a new array operator so it lands in the intended precedence
class.

**`advanced/subscripting.tex` — §"Subscripting Operator Method Declarations" (12),
§"Subscripted Assignment Operator Method Declarations" (42).** Governs
`opr[…]` and `opr[…]:=`, i.e. any new slicing syntax; these *must* be method
declarations on the type being subscripted, so new slice forms on `Matrix`
cannot be added from outside the library — the commented-out 2-D range forms at
2341–2357 would have to be re-enabled in `FortressLibrary.fss` itself.

---

## 5. Runnable checks

Directory: `/tmp/claude-0/-home-user-fortress/bdff267d-67dc-5bb9-b970-8c3dfaa634b6/scratchpad/c3/survey/`.
Every component is its own file (component name == filename) and every run's
stdout is saved next to it as `<name>.out`. Values built as the brief asked:
`a = array[\RR64\](3).fill(fn (i:ZZ32):RR64 => 1.0 + i)`,
`b = … 10.0 + i`,
`m = array[\RR64\](2,3).fill(fn (t:(ZZ32,ZZ32)):RR64 => do (i,j) = t; 1.0 + 3 i + j end)`,
`m2 = array[\RR64\](3,2).fill(…)`. Each run is ~14 s.

Note the two-argument `fill` lambda must be written as a **one-parameter tuple
lambda with a destructuring `do … end`** — `fn (t:(ZZ32,ZZ32)):RR64 => do (i,j) = t; … end` —
because `fill(f:I->E)` has `I = (ZZ32,ZZ32)`.

### (a) What compiles and runs today

| expression | result | file |
|---|---|---|
| construction, `\|a\|`, `a[0]`, `m[1,2]`, `a.copy()` | OK — `[0#3][ 1.0 2.0 3.0 ]`, `3`, `1.0`, `6.0` | `SvA1` |
| `a + b` | OK `[ 11.0 13.0 15.0 ]` | `SvA2` |
| `a - b`, `-a` | OK `[ -9.0 -9.0 -9.0 ]`, `[ -1.0 -2.0 -3.0 ]` | `SvA3` |
| `2.0 a` | OK `[ 2.0 4.0 6.0 ]` | `SvA4` |
| `a 2.0` | OK `[ 2.0 4.0 6.0 ]` | `SvA5` |
| `a.pmul(b)` | OK `[ 10.0 22.0 36.0 ]` | `SvA6` |
| `a.scale(2.0)` | OK `[ 2.0 4.0 6.0 ]` | `SvA7` |
| `a DOT b` | OK `68.0` | `SvA8` |
| `m.t()` | OK 3×2 | `SvA9` |
| `m a` (matrix·vector, juxtaposition) | OK `[ 14.0 32.0 ]` | `SvA10` |
| `m m2` (matrix product) | OK `[[22 28],[49 64]]` | `SvA11` |
| `m DOT m2` | OK, same | `SvA12` |
| `SUM[x <- a] x` | OK `6.0` | `SvA13` |
| `a.map[\RR64\](fn (x:RR64):RR64 => 2.0 x)` | OK `[ 2.0 4.0 6.0 ]` | `SvA14` |
| `m.sizes` | OK `(2,3)` | `SvA15` |
| `a[0#2]` (subarray slice) | OK `[0#2][ 1.0 2.0 ]` | `SvA16` |
| `m[0,:]` (row slice) | OK `[0#3][ 1.0 2.0 3.0 ]` | `SvA17` |
| `m[:,0]` (column slice) | OK `[0#2][ 1.0 4.0 ]` | `SvA18` |
| `a.indices`, `a.ivmap[\RR64\](fn (i,x) => i x)` | OK `012`, `[ 0.0 2.0 6.0 ]` | `SvA19` |
| `a.replica[\ZZ32\]().fill(0)` | OK `[0#3][ 0 0 0 ]` | `SvA20` |
| `a b` (bare juxtaposition of two vectors) | OK `68.0` — **it is the dot product** | `SvD2` |
| `SUM[x <- m] x`, `BIG MAX[x <- a] x` | OK `21.0`, `3.0` | `SvD5` |
| per-row sums `SUM[x <- m[i,:]] x` for `i <- 0#2` | OK `6.0 15.0` | `SvD8` |
| `a = b`, `a = a.copy()` | OK `false`, `true` | `SvD10` |
| `m + m`, `m.map`, `-m` | OK | `SvE4` |
| `m DOT a`, `a (m.t())` | OK `[ 14.0 32.0 ]` both | `SvE6` |
| **fails**: `m[0,:] + a` | no matching overload — `Row[\RR64,0,3\]` is not a `Vector` | `SvD1` |
| **fails**: `a / 2.0` | no `opr /` on `Vector` | `SvD3` |
| **fails**: `SQRT a` | `opr SQRT` is `Number`-only | `SvD4` |
| **fails**: `a TIMES b` | no `opr TIMES` on `Vector` | `SvD6` |
| **fails**: `a MAX b` | `MAX` is `StandardMinMax`-only | `SvD9` |
| **fails**: `a + 1.0`, `1.0 + a` | no scalar-extension for `+` | `SvE1`, `SvE2` |
| **fails**: `m[0,:] := a` | no `:=` overload for `(ZZ32, TrivialOpenRange)` | `SvE3` |
| works: copy a row into a vector, then use the algebra | `v2 = vector[\RR64,3\](fn (i:ZZ32):RR64 => r[i])`; `v2 + a` OK | `SvE5` |
| `array[\ZZ32\](3)` is a `Vector`; `z + z` OK; `array[\String\](2)` is not | OK | `SvG1`, `SvG3` |
| `matrix[\RR64,3,3\](2.0)` builds `2·I`, not a constant matrix | OK | `SvG2` |

### (b) User-declared `opr ×` / `÷` at top level

`SvB1.fss` (exact text of the declaration, verbatim from the file):

```fortress
opr ×[\nat n\](x: Vector[\RR64,n\], y: Vector[\RR64,n\]): Array[\RR64,ZZ32\] =
  x.ivmap[\RR64\](fn (i:ZZ32, e:RR64):RR64 => e y.get(i))
```

- **Works.** `v × w` → `[ 10.0 22.0 36.0 ]` for both a `Vector[\RR64,3\]`-typed
  binding and an `array[\RR64\](3)`-typed binding (`SvB1.out`). The loose
  `Array[\RR64,ZZ32\]` return type is accepted.
- `÷` (U+00F7) is accepted as an operator name: `SvB2.out` → `v ÷ w` =
  `[ 0.1 0.1818… 0.25 ]`.
- The same shape works on matrices: `opr ×[\nat r, nat c\](x: Matrix[\RR64,r,c\],
  y: Matrix[\RR64,r,c\]): Array2[\RR64,0,r,0,c\]` — `SvB3.out`.
- `⊙` (U+2299) and `⊕` (U+2295) also work (`SvF2.out`, `SvF3.out`); `SvF3` also
  demonstrates a `where { T extends Number }` clause on an `opr` with a `nat`
  static parameter — **accepted**.
- A binary `opr ×` chains left-associatively with no extra declaration:
  `v × v × v` → `[ 1.0 8.0 27.0 ]` (`SvF1.out`), matching the multifix rule in
  `chained-multifix.tex`.
- Prefix operator and plain-function overloads over `Vector` also work:
  `opr SQRT[\nat n\](x: Vector[\RR64,n\])` and
  `exp[\nat n\](x: Vector[\RR64,n\])`, with the scalar `SQRT 4.0` still
  resolving to the library's `Number` version (`SvF5.out`).
- Scalar extension of `+` in both argument orders can be added by the user and
  coexists with the library's vector `+` and scalar `+`:
  `SvF4.out` shows `v + 1.0`, `1.0 + v`, `v + v`, `1.0 + 2.0` all correct from
  one component.

### (c) User-declared `opr >` returning a 0/1 vector

`SvC1.fss`:

```fortress
opr >[\nat n\](x: Vector[\RR64,n\], s: RR64): Vector[\RR64,n\] =
  x.map[\RR64\](fn (e:RR64):RR64 => if e > s then 1.0 else 0.0 end)
```

**Overloads cleanly** (`SvC1.out`):

```
v > 2.0: OK [0#3][ 0.0 0.0 1.0 ]
scalar 3.0 > 2.0: OK true
ZZ32 3 > 2: OK true
```

The library's `opr >(self, b:Number):Boolean` (361) and the user's
`(Vector, RR64)` declaration are incomparable parameter tuples, so the Subtype
and Incompatibility rules of `advanced/overloading.tex` are satisfied and
dispatch is unambiguous at both call shapes. Caveat from
`chained-multifix.tex`: `>` is a chaining operator, so `a > s > t` becomes a
conjunction of two calls rather than a pipeline — do not chain a
vector-returning `>`.

---

## 6. Design consequences for a native-array microGPT

1. Elementwise `+ -`, unary `-`, scalar `×`, `DOT`, matrix product and
   matrix·vector all ship and work. The gaps are exactly: Hadamard as an
   operator, any `÷`, scalar `+`/`-`, and all elementwise transcendentals and
   comparisons. Every one of those is fillable by a top-level `opr` or plain
   function declaration in the user's own component — all five forms verified.
2. Row and column views exist (`m[i,:]`, `m[:,j]`) but come back as `Row`/`Col`
   over `Array1`, outside the `Vector` algebra. Either copy a row into a vector
   (`SvE5`) or write the new operators against `Array1`/`Indexed` rather than
   `Vector`, which would then also cover rows for free.
3. `Vector`/`Matrix` require `T extends Number`, and `Number comprises { RR64 }`.
   A user autodiff scalar cannot be a `Vector` element. The native-array route
   therefore means `RR64` arrays with a separate gradient representation, not
   arrays of tape nodes with the shipped algebra.
4. `map`/`ivmap` allocate (`replica().fill`), so every elementwise operator
   allocates a fresh array; `t()` is the one non-allocating view. Budget
   accordingly, or write fused loops with `assign` (1993).
5. `matrix[\T,r,c\](v)` is `v·I`, not a constant fill (2616) — use
   `array2[\T,r,c\]().fill(v)` for a constant matrix.

*(`SvD7` is a void probe — a typo made it test an undefined variable; the
row-assignment question is answered by `SvE3`.)*
