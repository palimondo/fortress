# What C4 invented, what `MAX` is, and whether the fix is a rename

Independent review, 2026-09-19, read-only in the tree. Every run below used a fresh private cache (`FORTRESS_CACHES=<probe dir>/caches`, `-Dfortress.caches` the same), so every verdict is a cold-cache verdict (ledger row 98). Probes and outputs: `explorations/run-c4/cold-cache/max-shapes/` (`probes/<name>/run1.txt`, `H1`–`H3`); the index is at the end.

## 0. The short answer

There is no "flat array" structure. `FlatArrays` is the name of a component (`explorations/run-c4/src/FlatArrays.fss:9`), named after Hsu's flat data layout, and every array in it is the shipped library's: the parameter vector is `array[\RR64\](n)` (`FlatArrays.fss:14-15`, the library factory at `Library/FortressLibrary.fss:1922`), the matrices are `array[\RR64\](r,c)` (`:1923`) or objects that `extends Matrix[\RR64,r,c\]` (`FlatArrays.fss:54`), the rank-3 values `extends Array3` (`:83`). C4's `MAX` is declared over the library's own `Array` (`FlatArrays.fss:31-32`): it is a new *operation* on a standard type, not an operation on a new structure. So Pavol's picture, "standard existing arrays, matrices, vectors from Fortress", is what C4 does; what he is missing is that the standard library has almost no operations on those arrays beyond `+`, `-`, the products and `.t()` (section 2), so the algorithm's other operations had to be declared by someone, and C4 declared them as operators.

The coordinator was missing more. The `MAX` pair is not the only illegal overloading in `FlatArrays`; it is only the first one the interpreter meets. With `MAX` repaired, the same cold run refuses `+` (`FlatArrays.fss:134` against `AdditiveGroup.+`, `FortressLibrary.fss:330`), and probing family by family shows four refused families, nine declarations: `MAX` (2), `+` (3), `-` (2), `juxtaposition` (2). The check stops at the first failing pair, and every C4 run on record was warm, so the other three never surfaced. Ledger row 341's "a rename … is the whole repair" is wrong, and so is "the fix is a rename" as told to Pavol. Section 3 has the probe matrix, section 6 the recommendation: repair all four families in one pass (a variant that does so, `H3`, is green on a cold cache and prints C4's five losses to the last digit), and neither a wholesale rename nor a wholesale rewrite into `map`/`ivmap` lambdas is the right shape.

## 1. Inventory of `FlatArrays.fsi`: 38 declarations, plus the model's two `^T`

Three kinds. **Standard as is**: an alias of a library call, no new semantics. **New operation over standard types**: a top-level function or operator whose parameters and results are the library's `Array`/`Vector`/`Matrix`/`Array3`. **New structure**: an object that `extends` a library array trait (a view) or, in `Diag`'s case, does not. "Standard equivalent" names the library operation that does the same on the library's arrays, with its line in `Library/FortressLibrary.fss` (not `ProjectFortress/Library/`, as the brief has it; that path does not exist), or says none. "Used" counts call sites in the model (M), data (D) and check (C) components (`grep -o`, 2026-09-19).

| # | declaration (`FlatArrays.fss` line) | kind | standard equivalent | used |
|---|---|---|---|---|
| 1-4 | `vec`, `zeros`, `keys`, `mat` (14-17) | standard as is | `array[\E\](n).fill(f)` (`:1922-1926`, `fill` `:1852`) | M 4, D 8, C 9 |
| 5-8 | `opr +`, `opr -` with a scalar, both orders (24-27) | new op over standard | none for `RR64`: the library's scalar extension is `opr +(x: Array[\ZZ32,ZZ32\], y: ZZ32)` and `-` (`:4493-4503`), integers only; `Vector.scale` (`:2197`) and `Matrix.scale` (`:2505`) scale, they do not add | `+ epsilon_A` (M:79), `z - s`, `dy - s` (M:28, 34) |
| 9 | `opr ×` Hadamard (28) | new op over standard | `Vector.pmul` (`:2198`), vectors only; none for `Matrix` (row 109); `×` is not a library operator at all (`TIMES` is, `:343`) | M 3 |
| 10-11 | `opr /` array/array, array/scalar (29-30) | new op over standard | none | M 14 |
| 12-13 | `opr MAX` both orders (31-32) | new op over standard | `opr MAX(x: Array[\ZZ32,ZZ32\], y: ZZ32)` (`:4511`), integers only, one order | M 1 (`0.0 MAX m0`, M:60); `a MAX s` has no caller |
| 14 | `opr >` giving 0/1 (34) | new op over standard | none | M 1 |
| 15-17 | `opr SQRT`, `exp`, `log` (35-37) | new op over standard | `a.map[\RR64\](exp)` (row 300, `map` `:1842`) | M 5, 1, 1 |
| 18-19 | `object Diag`, `diag` (40-41) | new structure (a bare object, not a `Matrix`) | none: no diagonal in the library (vocabulary review, `lib-grep.txt`) | M 1 |
| 20 | `opr juxtaposition(Diag, Matrix)` (42) | new op over standard | with `Diag extends Matrix` the library product (`:2625`) does it at 13-54× the cost (row 299) | M 1 |
| 21 | `transpose(Matrix)` (49) | standard as is | `m.t()` (`:2559`) | M 4 (with 22) |
| 22 | `transpose(Array3)` (50) | new structure (`Transposed3`, 117) | none: `Array3` has no `t()` (row 246) | via `^T` |
| 23 | `view(p, off, nr, nc)` (62; `PView` 54, `viewN` 60) | new structure | none: a range subscript `p[r]` (`:2107`) is a rank-1 slice and there is no reshape (v14) | M 11 |
| 24-25 | `row`, `row3` (72, 79; `RowView` 66, `Row3View` 73) | new structure | the library's `m[i,:]` is a writable zero-copy row but not a `Vector` (row 54) and 5× slower (row 298) | none (internal to `rows`) |
| 26-28 | `heads`, `unheads`, `plane` (92, 105, 116; views 83, 96, 110) | new structure | none: no reshape, and a rank-3 subarray is rank 3 with a unit axis, not a `Matrix` (v10) | M 1, 1, 0 (internal) |
| 29 | `opr juxtaposition(Array3, Array3)` (126) | new op over standard | none: rank 3 carries no algebra (row 292); the body is the library product per plane | M 6 |
| 30 | `opr +(Matrix, Array3)` (134) | new op over standard | none | M 1 |
| 31-34 | `rows` ×4 (141-164) | new op over standard | none: no rank operator; a `for` over `m[i,:]` with `assign` (`:1993`) is the composition (v06) | M 9 |
| 35 | `gather` (168) | new op over standard | none: no index-vector subscript (v11); `array[\T\](n, c).fill(fn (i, j) => m[ks[i], j])` | M 2 |
| 36 | `onehot` (173) | new op over standard | none: no outer product; a `fill` | M 3 |
| 37 | `pick` (176) | new op over standard | none; a `fill` | M 1 |
| 38 | `flat(ms...)` (179) | new op over standard | none: no ravel or catenate (row 106); loops | M 1 |
| 39-40 | `opr (m)^T`, `opr (t)^T` in the model (`MicroGptFlat.fss:23-24`) | new op over standard | `m.t()` for 39; none for 40 | M 18 |

Counts: **5 standard as is** (rows 1-4, 21), **26 new operations over standard types** (5-17, 20, 29-40), **9 new structures** (18-19, 22-28; eight view objects and `Diag`). Every one of the nine structures is a six-line object whose `get`/`put` index some other library array; seven of them `extends Matrix`, `Vector` or `Array3`, so a `PView` *is* a `Matrix` to the library's product and `.t()` (row 150). That is the language's own idiom for a runtime-shaped view (`FortressLibrary.fss:2571-2588`, `TransposedMatrix`, is the library doing the same thing).

## 2. Why it was invented, and which reasons survive Pavol's ruling

The brief (`experiment/RUN_C_BRIEF.md`) fixed the layout, not the vocabulary: one flat `RR64` vector, the nine matrices as "zero-copy `Matrix` views over slices of that vector", the corpus as an integer matrix, one-hot products for the scatter-adds, Adam as whole-vector expressions, and "everything you need beyond [the shipped library] is user-level code in your own component". It pointed at `apl/base/AplCore.fss` for the view-object technique and at the shipped `Array3`. So views were asked for by name; the operators were the worker's answer to what the library lacks.

What the library lacks is on record and I re-read the sources it cites:

- `Vector` and `Matrix` inherit `+`, `-`, unary `-` from `AdditiveGroup` (`FortressLibrary.fss:2189-2196`, `:2497-2504`) and have the products, `scale`, `pmul` (vectors), `dot`, `t()`. Nothing else: no scalar `+`, no `×`, no `/`, no `MAX`, no comparison, no `exp`/`log`/`SQRT` (vocabulary review, `explorations/run-c4/probes/vocabulary/REPORT.md` question 1, probes v01a-v04b). The library does declare scalar extension, but only for `Array[\ZZ32,ZZ32\]` and only `+ - MIN MAX` (`:4493-4517`, under the comment "Some random stuff related to arrays and the MCKPE benchmark", `:4477`).
- `Array3` carries no algebraic trait (`:2662-2666`; row 292), so nothing elementwise exists at rank 3.
- No reshape, plane, gather, outer product, ravel, catenate or rank operator exists (`lib-grep.txt`; rows 106, 246).
- The `MultiplicativeRing` route is closed: `Vector`/`Matrix` `excludes { AnyMultiplicativeRing }` (`:2191`, `:2499`) because juxtaposition is the inner product; a carrier that extends both changes juxtaposition and breaks `+` (v02, v02b; row 293); the spec's algebraic bound `T extends AdditiveGroup[\T\]` is not met by `RR64` (v04b; row 295); the algebraic-constraints library that would carry `Ring`/`Field` never shipped (row 37).
- The libvector report (`explorations/libvector-report.md`) answered a different question: why Run B's autodiff program had its own `Vec`/`Mat`. Its verdict is that the library's `Vector`/`Matrix` can carry a user element type only through `Value extends Number`, which `comprises { RR64 }` on `trait Number` (`:352`) forbids. That reason does not apply to C4: its elements are `RR64`, and C4 uses the library's arrays throughout. The report should not be read as saying the library's arrays were unusable; it says their *element type* is sealed.

Which reasons are about expressiveness and which about speed:

| reason | kind | still holds? |
|---|---|---|
| no scalar extension, `×`, `/`, `MAX`, `>`, `SQRT`/`exp`/`log` on `RR64` arrays | expressiveness (the operation exists nowhere) | yes; the only question is what shape the user declaration takes (section 3) |
| no rank-3 algebra, no plane/heads views, no transpose of planes | expressiveness | yes |
| no rank operator (`rows`), gather, one-hot, pick, ravel | expressiveness | yes |
| `row`/`row3` as user views rather than `m[i,:]` | speed (5×, row 298) and a type fact (`m[i,:]` is not a `Vector`, row 54, so `x DOT x` inside `rmsn` needs a user `DOT` too, v12) | the speed half is ruled irrelevant; the type half stands: composing `rows` from `m[i,:]` costs a `DOT` declaration or a rewrite of `rmsn` to `SUM[t <- x] t^2` |
| `Diag` as an operator rather than a `Matrix` view | speed only (13-54× on one line, ~5% of a step, row 299) | ruled irrelevant; `H3` below takes the view |
| `transpose(Matrix)`, the four constructors | habit (vocabulary review, table rows 1-4, 21) | never held |

So of the 26 new operations, all but `transpose(Matrix)`, the constructors and the `Diag` operator are forced by absence, not by cost. Removing the speed reasons changes three declarations, not the design.

## 3. The `MAX` case: what the specification says, what the interpreter does, what passes

**The specification.** `Specification/basic/overloading.tex:100-105`: declarations of one functional name may not differ in static parameters, and one may not have static parameters while another has none; restated at `advanced/overloading.tex:95-96`. C4's `opr MAX[\I\]` has one; the library's `opr MAX(self, other: T)` (`FortressLibrary.fss:280`, in `StandardTotalOrder[\T\]`; also `StandardMax.MAX` `:247` and `StandardMinMax.MAX` `:261`) has none of its own. `advanced/overloading.tex:443-447` sends a functional-method/function pair to the Meet Rule for functions (`:247-262`), which needs either exclusion or a declaration on the meet; `RR64 × Array` neither excludes `StandardTotalOrder[\T\] × T` nor has a meet declaration. Row 341's reading of the text is right. Two consequences the record does not draw: by the same letter, the object route's `MAX[\I\](x: Sc, a: Array)` is refused too (it has a static parameter), and so is the shipped library's own `opr +(x: Array[\ZZ32,ZZ32\], y: ZZ32)` at `:4493` beside `AdditiveGroup.+` (no exclusion, no meet). Whether a trait's `T` counts as the functional method's own static parameter is not spelled out in either chapter; I flag that as unadjudicated rather than settle it. The letter, read strictly, leaves only fresh names and call-site composition; the practical standard for this project is the interpreter's cold check.

**The interpreter.** `OverloadedFunction.OverloadComparisonResult` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:434-470`): for every parameter position it first asks `p1.excludesOther(p2)`, and exclusion makes the pair `distinct` whatever the position; otherwise it asks subtyping; a position that is neither, outside the self position, with either side symbolic, sets `sawSymbolic`, and `overloadOk()` (`:493-500`) then refuses with the "at least one pair of parameters must have excluding types" message (`:520-528`). The library's `self` sits at position 0, so the position that decides is the second: `Array[\RR64,I\]` against `T`, neither excluding nor ordered. An object type in the second position does exclude `T` (that is what makes the `Diag` route work, row 99's `:466` note aside); a trait type does not, and `RR64` is a trait (`FortressLibrary.fss:422`), as is `ZZ32` (`:642`).

**What passes and what does not, each on its own empty cache** (`probes/<name>/run1.txt`; a user component imports an api declaring the candidates and calls `0.0 MAX m` on a runtime-built 3×2 matrix, then multiplies and adds the result to show it is still a `Matrix`):

| probe | declarations in the imported api | cold |
|---|---|---|
| A | C4's pair, `MAX[\I\](s, a)` and `MAX[\I\](a, s)` (`FlatArrays.fss:31-32`) | refused, `FortressLibrary.fss:280` named, as row 341 |
| B | one declaration, `MAX[\I\](s, a)` (the unused `(a, s)` dropped) | green |
| C1 | a function, `maxWith[\I\]` both orders | green |
| C2 | a fresh operator name, `opr MAXEACH[\I\]` both orders | green |
| D1 | ground, no static parameters, one order: `opr MAX(s: RR64, a: Array[\RR64,(ZZ32,ZZ32)\])` (the library's own shape at `:4511`, for `RR64`) | green |
| D2 | D1 in both orders | refused: the library's `:280` "has a parameter with generic type" |
| D3 | D1 at two ranks (`(ZZ32,ZZ32)` and `ZZ32`) | refused, the same |
| D4 | the library's own `+` shape (`:4493`) written for `RR64` in both orders | refused, `AdditiveGroup.+` `:330` named |
| E1 | `opr MAX[\nat r, nat c\](s: RR64, m: Matrix[\RR64,r,c\])`, one | green |
| E2 | E1 plus the `Vector[\RR64,n\]` form (row 172's shape, imported) | refused, `StandardMax.MAX` `:247` named |
| F1 | the object route, `object Sc(s: RR64)`, `MAX[\I\](x: Sc, a)` and `(a, x: Sc)` | green, both orders |
| F2 | F1, one order | green |
| G | no declaration: `m.map[\RR64\](fn (e: RR64): RR64 => 0.0 MAX e)`, and the untyped `fn e => 0.0 MAX e` | green, result multiplies and adds as a `Matrix` |

The rule the matrix gives: in an imported vocabulary, an operator name that the library declares as a trait functional method with a generic `other: T` (`+ - MAX MIN juxtaposition DOT`, `FortressLibrary.fss:330-331, 247, 280, 344`) may carry **one** user declaration of any shape, or **any number** whose non-self position is an object type, or a fresh name; two or more with a trait-typed operand (`RR64`, `Array`, `Matrix`, `Array3`) are refused. The single-declaration case is an accident of the merge, not the specification (row 341 already says a single imported declaration "is not merged" with the library's functional method), so it is not a shape to build on; but it is what C4's `-` and half of its `+` have been running on.

**The same check applied to every family in `FlatArrays`** (`probes/P*`, each family alone in an imported api, called once per shape):

| family | C4's declarations | cold |
|---|---|---|
| `+` | `(a, s)`, `(s, a)` (24-25), `(Matrix, Array3)` (134) | refused (Pplus3); the scalar pair alone refused (Pplus2); `(a, s)` with the plane-wise form refused (PplusN2); each alone green (Pplus1, PplusN1) |
| `-` | `(a, s)`, `(s, a)` (26-27) | refused (Pminus2), against the library's *ground* `opr -(Array[\ZZ32,ZZ32\], ZZ32)` at `:4499`, two instantiations of `Array` neither excluding nor ordered (row 97 with a symbolic side); alone green (Pminus1) |
| `MAX` | (31-32) | refused (A); alone green (B) |
| `juxtaposition` | `(Diag, Matrix)` (42), `(Array3, Array3)` (126) | refused (Pjuxt2), `MultiplicativeRing.juxtaposition` `:344` against the `Array3` pair |
| `/` | `(a, b)`, `(a, s)` (29-30) | green (Pdiv2): the library's `/` partners are ground (`Number./(self, b: Number)`, `:382`) |
| `×`, `>`, `SQRT`, `exp`, `log`, `transpose`, `rows`, `gather`, `onehot`, `pick`, `flat`, the views | one declaration, or a name the library has no functional method for | green by row 341's single-declaration finding; `H3` below confirms the whole file |

And the sequence a repair meets in place: `H1` (the rename `maxWith`, the model's line 60 changed) and `H2` (no declaration, `m0.map[\RR64\](fn … => 0.0 MAX e)` at line 60) both die cold on the *next* family, `+` at `FlatArrays.fss:134` against `AdditiveGroup.+` `:330`, before the first step runs (`H1/run1.txt`, `H2/run1.txt`, 20 s each). `MicroGptFlatCheck` from a clean cache would do the same after the `MAX` rename. So "the fix is a rename" was wrong twice: the rename is one of three legal shapes, and `MAX` is one of four families.

`explorations/apl/mg/FlatArrays2.fsi` has the same four families (`+` 3 declarations plus `AplMg.fsi`'s integer `+`, checked as one family with it per `coordinator/FACTS.md:131`; `-` 2; `MAX` 2 at `:71-72`; `juxtaposition` 2) and the record's exp3 (`run-c4/cold-cache/exp3-run1.txt`) shows it dying on `MAX` at `FlatArrays2.fss:40`; the other three are behind it.

## 4. Pavol's proposal: compose the algorithm from the standard operations

What that means at each site, given section 1's "standard equivalent" column:

| in C4's model | the standard composition | what it costs |
|---|---|---|
| `0.0 MAX m0` (`:60`) | `m0.map[\RR64\](fn e => 0.0 MAX e)` (`map` `:1842`; probe G) | one lambda |
| `z - (BIG MAX[t <- z] t)`, `dy - (p DOT dy)`, `x / r`, `e / (SUM e)`, `… + epsilon_A` (`:28-34, :79`) | `z.map[\RR64\](fn e => e - s)` etc., 14 `/` sites and 4 `+`/`-` sites | a lambda per site |
| `p × (dy - …)`, `g × g`, `(dX4 f2) × (m0 > 0.0)` | `a.ivmap[\RR64\](fn (i, e) => e b[i])` (`:1841`); for two vectors `a.pmul(b)` (`:2198`) | a lambda per site; the comparison `m0 > 0.0` is another `map` |
| `SQRT (…)`, `exp(…)`, `log(…)` on arrays | `a.map[\RR64\](exp)` (row 300), `a.map[\RR64\](fn e => SQRT e)` | one `map` each |
| `diag(vm / nv) (pr - onehot(…))` (`:63`) | `Diag extends Matrix` and the library product (`H3`), or `m.ivmap[\RR64\](fn (ij, e) => do (i, j) = ij; v[i] e end)` | the view, or a lambda |
| `x1 wq^T`, `dL^T x4`, … (18 `^T`) | `x1 wq.t()` (`.t()` `:2559`; row 301: a dotted call may follow a call where `^T` may not) | `^T` becomes `.t()`; the rank-3 `^T` has no library form and stays a view |
| `qh kh^T`, `a vh`, `a^T dh`, `dh vh^T`, `dS kh`, `dS^T qh` (6 batched products) | no library form: a `for p <- 0#np` loop over plane views with the library product per plane, which is `FlatArrays.fss:126-131` verbatim, or the loop inlined six times | the operator becomes a named function or a loop at every site |
| `mask + t` (`:59`) | `t.ivmap[\RR64\](fn (ix, e) => do (p, i, j) = ix; mask[i,j] + e end)` | a lambda |
| `rows(rmsn, x)` and the other 8 lifts | `for i <- 0#n do (out[i,:]).assign(rmsn(m[i,:])) end` over the library row (v06) | a loop per site, and `m[i,:]` is not a `Vector` (row 54), so `x DOT x` in `rmsn` needs a user `opr DOT` over `Array[\RR64,ZZ32\]` (v12), a declaration again, or `rmsn` rewritten as `SUM[t <- x] t^2` |
| `gather`, `onehot`, `pick`, `flat`, `heads`, `unheads`, `view` | `array[\T\](…).fill(fn (i, j) => …)` for the first three; loops for `flat`; there is no composition for the views (no reshape), only the objects C4 has | the functions stay, under whatever name |

Two lines side by side, the ReLU and the attention scores:

```
C4          mr = 0.0 MAX m0
composed    mr = m0.map[\RR64\](fn e => 0.0 MAX e)

C4          a = rows(sm, mask + (qh kh^T) / SQRT (1.0 headDim))
composed    s = batched(qh, kh^T)                                  (* or the loop *)
            a = rows(sm, s.ivmap[\RR64\](fn (ix, e) => do (p, i, j) = ix; mask[i,j] + e / SQRT (1.0 headDim) end))
```

**What it costs the 40 checks.** Nothing numerically, provided each composition is the body of the declaration it replaces: C4's operators are already `map`/`ivmap` over the library's arrays (`FlatArrays.fss:24-37`), so inlining them at the call site executes the same library code on the same values in the same order. `H3` (section 6), which removes five declarations and makes `diag(v) m` the library product, prints the five batch-1 losses identical to C4's committed output to the last digit (`H3/run1.txt` against `explorations/run-c4/checks/threads1.txt:` "batch 1 step" lines; step 1 `3.3659669475848513` in both, the 4.4e-16 against the golden being C4's own). The one composition that changes arithmetic is the `Diag` product, and it does not change the digits, since the library product adds exact zeros (`0.0 x` and `0.0 + y` are exact for finite `x`, `y`; v07 reported identical numbers). The full 40 checks were not run here (a worker-session unit, 9-15 minutes at pool size 4; another gate was running on this box); the five losses are the batch-1 half of them.

**What it does for the compiled path: nothing, by itself.** All eighteen components of both programs stop at `disambiguate` on `Array`, `Vector`, `ImmutableArray` or `Char` (`explorations/compile-ladder/baseline-2026-09-19/microgpt-phase.md`). `map`, `ivmap`, `fill`, `.t()` and the products are methods of those same absent traits, so a program composed from them stops on the same names at the same phase. The compiler world has its own vocabulary of exactly C4's shape: `opr MAX(x: ZZ32Vector, y: ZZ32)` at `Library/CompilerLibrary.fss:515`, `+ - MIN` at `:497-509`, over a monomorphic `int[]`-backed `ZZ32Vector` (`coordinator/next-climb.md` §3a, shape 2). What moves C4 toward compiling is PLAN step 5, the array representation decision (`coordinator/PLAN.md:41`), and then step 6's construct inventory; whether the target program is written with operators or with lambdas over `map` is a question that decision does not turn on, except in one respect: the compiler's scalar-extension operators are declared as top-level operators over a vector type with no static parameters, which is the shape D1 has and C4's `[\I\]` families do not.

## 5. The APL grammar's target

`AplMgSyntax.fsi` does not name a vocabulary. Its templates write host text with free names, and a free identifier in a `<[ … ]>` template resolves at the use site (row 270), in the component that imports the grammar. The rule for ReLU is `0 ⌈ SPACE r:AplE => <[ 0.0 MAX (r) ]>` (`explorations/apl/mg/AplMgSyntax.fsi:224-225`, commented "FlatArrays.fss:31, MicroGptFlat.fss:60"); `⍉` is `<[ transpose((r)) ]>`, `+.×⍤2⊢` the batched juxtaposition, `+/l×r` `<[ (l) DOT (r) ]>` (`:200-260`). The component that imports it, `MicroGptApl.fss`, imports `FlatArrays2` and `FlatData2` (after the swap of 2026-09-15, `apl/mg/NOTES-swap.md`), so today the macros expand into `FlatArrays2`'s operators and `AplMg`'s ten glue functions, and the APL text of the step (`MicroGptApl.fss:74-88`) is C4's formulas glyph for glyph.

Changing the target means one of two things. If the vocabulary is repaired in place (fresh names or single declarations), the grammar changes only where a name changes: the `0⌈` rule writes the new spelling, and the `m+⍤2⊢t` and product rules likewise, one line each. If the target becomes call-site composition, each affected rule writes the lambda instead (`<[ (r).map[\RR64\](fn e => 0.0 MAX e) ]>`); a template that writes a whole lambda is a shape that works (rows 285, 96 of `apl/gaps.md`), though a template with a static argument `[\RR64\]` inside has not been probed and would need one. Either way the APL text is untouched: the sub-language is exactly the layer at which Pavol's "same algorithm, written in Fortress" is insulated from how the Fortress is spelled. What is not insulated is the *tour*, whose Fortress column is the hand-written C4.

## 6. Recommendation

**What Pavol is missing.** C4 already stands on the standard arrays; "FlatArrays" is a component name, not a type. The standard library has no operations on those arrays for most of what the algorithm needs (section 2), so "compose from the standard operations" can only mean writing `map`/`ivmap`/`fill` lambdas and `for` loops at every one of about seventy sites in the step (section 4's table), which is the bodies of C4's declarations pasted into the model. It is legal, it is bit-identical, it would make the cold-cache problem vanish (no declarations, nothing to check), and it costs the readable step that C4 exists to show and that the APL rules expand into. It also does not move the compiled path (section 4, last paragraph). One piece of it is right and cheap: `diag(v) m` as a `Matrix` view and `transpose(m)` as `m.t()` are compositions that keep the model's text.

**What the coordinator was missing.** Four refused families, not one; the check stops at the first; every C4 and APL number on record is warm. A rename of `MAX` alone leaves `MicroGptFlatCheck` dead on a clean checkout, at `+`.

**The options**, in the project's units (a check run is two runs of the 40 checks, pool sizes 1 and 4, about 25 minutes; a worker session is one focused context):

1. *Repair the four families in place, minimally.* Drop the three declarations no caller uses (`MAX (a, s)`, `- (s, a)`, `+ (s, a)`), give the plane-wise sum its own name, make `Diag` a `Matrix` view so its product is the library's. That is `H3`: five declarations fewer, one model line changed (`mask + …` becomes `planeSum(mask, …)`), green cold, losses identical. It leaves `+`, `-` and `MAX` as single `[\I\]` declarations that pass by the interpreter's accident and not by the specification's letter; honest, but it should be said in the file header. Cost: one worker session for `FlatArrays` and `FlatArrays2` together, the grammar's two rules, and two check runs (C4 and `apl/mg`), each from an empty cache this time. Ledger rows 341-342 amended, row 296 retired.
2. *Fresh names for the whole scalar-extension family* (`maxWith`, `plusS`, …). Legal by the letter, green cold, and the model reads like a library of function calls; the APL rules absorb it, the tour does not. Same cost as 1 plus the tour regeneration. I would not take it.
3. *Composition at the call sites throughout.* Pavol's proposal as stated. Legal, identical, and the longest step of the three; the `rows` lift needs a `DOT` declaration or a rewritten `rmsn` on top. Two worker sessions (model and tour), two check runs. I would not take it either, for the reason in the first paragraph of this section.
4. *Make the sub-language the only readable layer* and let the Fortress target be whatever is legal (option 2 or 3 underneath). This is what DESIGN.md already argues ("the diamond, if there is one, is the pair: the 25-line Dyalog program and C4's vocabulary"); it is a decision for Pavol, not a repair.

I would take 1 now, and record the remaining single-declaration accident as the open item it is (ledger worklist item 24, the check on a cache hit, is the interpreter-side fix; the language-side fix, a scalar-extension trait or the library's own `:4493-4517` block extended to `RR64`, is a library edit under the sealed tree and belongs with PLAN step 5, where the compiled world's `ZZ32Vector` precedent already has this exact shape).

## Corrections to the record

- `ProjectFortress/Library/FortressLibrary.fss` in the brief is `Library/FortressLibrary.fss`; the line numbers cited (247, 270-280) are right in that file.
- The vocabulary review is `explorations/run-c4/probes/vocabulary/REPORT.md`, not under `explorations/apl/mg/`; `apl/mg/` holds the swap notes and `FlatArrays2` that were derived from it.
- Ledger row 341's "a rename … is the whole repair" and "`FlatArrays.fss:31` and `:32` are the only two declarations involved": false; `+` (`:24-25, :134`), `-` (`:26-27`) and `juxtaposition` (`:42, :126`) are refused by the same check on the same cold cache (`H1`, `H2`, `probes/Pplus3`, `Pminus2`, `Pjuxt2`).
- Row 341's finding that the trigger is "two generic declarations" is narrower than the truth: two *ground* declarations are refused too (D2, D3, D4), and the second one need not be generic (PplusN2's partner is the `nat` form; D4's are both ground). The trigger is two or more declarations with a trait-typed operand in the non-self position.
- Row 296 ("a user declaration against an imported one is not checked and works") was already corrected by 341 and is contradicted again here.

## Index of the evidence

All under `explorations/run-c4/cold-cache/max-shapes/`. `probes/run.sh <name>…` re-runs any probe on a fresh cache (sources `experiment/env.sh`, sets `FORTRESS_CACHES` and `-Dfortress.caches` to `probes/<name>/caches`, 18-19 s each on this box).

- `probes/A B C1 C2 D1 D2 D3 D4 E1 E2 F1 F2 G`: the `MAX` shapes (section 3, first table); each directory has the api, the component, the user program and `run1.txt`.
- `probes/Pplus1 Pplus2 Pplus3 PplusN1 PplusN2 Pminus1 Pminus2 Pdiv2 Pjuxt2`: the families (section 3, second table).
- `H1/`, `H2/`: C4's three components with the `MAX` rename and with the call-site `map`, cold runs dying on `+` (`run1.txt`).
- `H3/`: the repaired vocabulary (`diff` against `explorations/run-c4/src/` shows the five removed declarations, `planeSum`, `Diag extends Matrix`, and the one model line), `run1.txt` with the five losses, 69 s cold including the library warm-up, 8.0 s per step as C4.
- Nothing in the repository was modified; the copies carry absolute paths to `explorations/apl/reference/dzaima/` in place of C4's relative ones. One slip: a mistyped path put source-only copies of `Pminus1`, `Pplus1` and `PplusN1` at the repository root for about twenty minutes; they were moved, not deleted, to `probes/stray-root-copies/` (identical to the scratchpad sources, no outputs), and `git status` at the root is empty.

## Files proposed for the tree, as an explicit list

Destination `explorations/run-c4/cold-cache/max-shapes/` (probes and outputs only; no `caches/` directory, no `tmp/`), each probe as its three sources plus `run1.txt`:

- `probes/run.sh`
- `probes/A/{MaxLibA.fsi,MaxLibA.fss,UserMaxLibA.fss,run1.txt}` and the same four files for `B`, `C1`, `C2`, `D1`, `D2`, `D3`, `E1`, `E2`, `F1`, `F2`, `G` (the library names follow the directory: `MaxLibB`, `MaxLibC1`, …; `D4` is `PlusLibD4`)
- `probes/D4/{PlusLibD4.fsi,PlusLibD4.fss,UserPlusLibD4.fss,run1.txt}`
- `probes/Pplus1/{PlusLib1.fsi,PlusLib1.fss,UserPlusLib1.fss,run1.txt}`, `Pplus2/{PlusLib2.*,UserPlusLib2.fss,run1.txt}`, `Pplus3/{PlusLib3.*,UserPlusLib3.fss,run1.txt}`, `PplusN1/{PlusLibN1.*,UserPlusLibN1.fss,run1.txt}`, `PplusN2/{PlusLibN2.*,UserPlusLibN2.fss,run1.txt}`, `Pminus1/{MinusLib1.*,UserMinusLib1.fss,run1.txt}`, `Pminus2/{MinusLib2.*,UserMinusLib2.fss,run1.txt}`, `Pdiv2/{DivLib2.*,UserDivLib2.fss,run1.txt}`, `Pjuxt2/{JuxtLib2.*,UserJuxtLib2.fss,run1.txt}`
- `H1/run1.txt`, `H2/run1.txt` (the two dead cold runs; their sources are C4's with the one-line edits shown in section 3 and need not be committed)
- `H3/{FlatArrays.fss,FlatArrays.fsi,MicroGptFlat.fss,run1.txt}` (the repaired vocabulary and the one changed model line; `FlatData.*` and `MicroGptFlat.fsi` are C4's unchanged and need not be committed)
- this file, `review.md`, wherever the coordinator files reviews

Not for the tree: every `caches/` directory, `probes/tmp/`, `probes/stray-root-copies/`.
