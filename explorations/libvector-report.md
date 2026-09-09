<!-- Produced by a delegated clean-room research worker, 2026-08-30, on Pavol's
     challenge: why does microgpt2 define Vec/Mat instead of using the standard
     library's own Vector/Matrix? The worker was blinded: barred from reading
     anything in explorations/, briefed only with the goal and build environment.
     Probes: explorations/libvector-probes/ (p00-p33 with full transcript). -->

# Can the Fortress standard library's own `Vector`/`Matrix` carry a user-defined element type?

Clean-room probe, walk interpreter, JDK 25, `FORTRESS_THREADS=1`. Sources: `Specification/**/*.tex`, `Library/*.fss|.fsi`, `ProjectFortress/LibraryBuiltin/*.fss`, `ProjectFortress/src/**`, plus 34 running probes.

## 0. VERDICT

**YES — fully, for every item on the list, including runtime-chosen dimensions. But only by writing a declaration the specification forbids.**

The library's `Vector[\T,s0\]` and `Matrix[\T,s0,s1\]` serve as the working representation for a user element type — construction, indexing, `|v|`, `M v`, `v M`, `M N`, transpose, `u+v`, scaling by a `Value`, `SUM`, set/list comprehensions, in-place mutation, rectangular runtime-sized shapes — provided the program declares:

```fortress
object Value(data: RR64) extends Number
    getter asString(): String = "V(" data ")"
    opr +(self, other: Value): Value             = Value(data + other.data)
    opr -(self, other: Value): Value             = Value(data - other.data)
    opr -(self): Value                           = Value(-data)
    opr TIMES(self, other: Value): Value         = Value(data other.data)
    opr juxtaposition(self, other: Value): Value = self TIMES other
end
```

**The smallest thing standing in the way is one clause:** `comprises { RR64 }` on `trait Number` (`/home/user/fortress/Library/FortressLibrary.fss:352`, `.fsi:276`). `Value extends Number` is illegal Fortress (`/home/user/fortress/Specification/basic/traits.tex:231-235`; worked counter-example at `:265-275`). The walk interpreter never runs the check: `walk` does not call `setTypeChecking(true)` (`/home/user/fortress/ProjectFortress/src/com/sun/fortress/Shell.java:420-424`), the flag defaults false (`Shell.java:1275`), and `StaticChecker.checkCompilationUnit` returns untouched when off (`/home/user/fortress/ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java:166`). The check that *would* fire is `/home/user/fortress/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala:206-208` — `"Invalid comprises clause: … has a comprises clause but its immediate subtype … is not eligible to extend it."`

The seal is genuinely load-bearing, not decorative (§5). The spec-legal alternative — extend the *unsealed* `AdditiveGroup`/`MultiplicativeRing` — gets `+ - scale pmul t()` and stops dead at `dot`, `rmul`, `lmul`, `mul`, and every top-level operator.

Five smaller independent defects, three of which bite plain `RR64` just as hard:

| # | defect | class | bites RR64? |
|---|---|---|---|
| A | array literal needs explicit LHS type; no inference | implementation gap | yes |
| B | array comprehension `[i \|-> e \| g]` is `NI(…)` | implementation gap | yes |
| C | `m^k`, `m^T`, `\|\|m\|\|` promised by spec, absent from library | library gap vs spec | yes |
| D | `matrix[\T,n,m\](v)` fills off-diagonals with literal `0` | library bug | latent |
| E | `SumReduction.empty() = 0`, so empty `SUM` can't yield a `Value` | library-design limit | n/a |

## 1. What ships, what the spec promises

`Library/FortressLibrary.fsi:1458-1469` / `.fss:2187-2202`:

```
trait AnyVector end
trait Vector[\T extends Number, nat s0\]
        extends { AnyVector, Array1[\T,0,s0\], AdditiveGroup[\Vector[\T,s0\]\] }
        excludes { AnyMultiplicativeRing }
    opr +(self, v:Vector[\T,s0\]): Vector[\T,s0\]
    opr -(self, v:Vector[\T,s0\]): Vector[\T,s0\]
    opr -(self): Vector[\T,s0\]
    scale(t: T): Vector[\T,s0\]
    pmul(v: Vector[\T,s0\]): Vector[\T,s0\]
    dot(v: Vector[\T,s0\]): T
end
```

`.fsi:1576-1589` / `.fss:2495-2560` gives `Matrix[\T extends Number, nat s0, nat s1\]` with `scale`, `mul[\nat s2\]`, `rmul`, `lmul`, `t()`. Carriers: `__DefaultVector` (`fss:2204`), `__DefaultMatrix` (`fss:2563`), `TransposedMatrix` (`fss:2571`). Factories: `vector` (`fss:2252-2256`), `matrix` (`fss:2613-2616`). Sparse siblings `SparseVector`, `Csr`, `Csc` (`Library/Sparse.fsi:19-36`) carry the identical `nat` + `Number` shape. Top-level operators at `fss:2258-2281` and `2618-2655`.

Two constraints are baked in: **`T extends Number`** and **`nat` dimensions**.

Spec:
- `Specification/basic/expressions/aggregate.tex:153-156` — "An array of two dimensions **whose elements are a subtype of `Number`** is a matrix." `:165-167` — same for one-dimensional/vector. So the `Number` bound is the spec's own design, not a library accident.
- `Specification/basic/trait-parameters.tex:66-94`; the chapter's canonical example is literally `makeVector[\T extends Number, nat s0\]() : Vector[\T,s0\]` (`basic/examples/StatParam.Nat.tex`). Line 80: "These parameters are **instantiated at runtime** with numeric values."
- `Specification/basic/traits.tex:231-235` — a `comprises` clause makes its listed traits "**exactly** the traits that immediately extend `T`"; `:265-275` shows `trait ExclusiveMolecule extends Molecule` labelled `(* Not allowed! *)`.
- `Specification/basic/operators/opr-overview.tex:56-57, 75-81, 86-90` — norm of "a vector **or matrix**", `e^k` for vectors and square matrices, superscript transpose `^T`.
- `Specification/appendices/future.tex:243-246` records the *wish* that `array1[\T extends Number, nat s0\]()` return `Vector[\T,s0\]` by overloading — matching the `(* TODO: fix when Number is covariant. *)` hack actually shipped at `fss:2239-2244`.

## 2. Baseline: plain `RR64`

### 2.1 Construction — partly broken, not the user type's fault

`p01`, `a = [1.0 2.0 3.0 4.0]`:

```
com.sun.fortress.exceptions.ProgramError: …p01_rr64_vec_construct.fss:7:5:
Can't infer element type for array construction
```

`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/LHSEvaluator.java:117-140`: with no declared LHS type the code does not compute the join of element types — it goes straight to `outerType = error(x, evaluator.e, "Can't infer element type for array construction")` (line 140). The comment at `:136-138` shows the join was intended and never written. **Implementation gap.**

Sanctioned alternatives work (`p02`):
```
a: RR64[4]          = [1.0 2.0 3.0 4.0]  -> [0#4][ 1.0 2.0 3.0 4.0 ]   a IS an AnyVector
b: Vector[\RR64,4\] = [1.0 2.0 3.0 4.0]  -> [0#4][ 1.0 2.0 3.0 4.0 ]   b IS an AnyVector
```

The grammar's other escape, static args inside the literal (`ArrayExpr ::= "[" [StaticArgs] RectElements "]"`, `aggregate.tex:28`), is **not implemented** (`p27`):
```
…p27_literal_staticargs.fss:18:9-50:
    Unmatched delimiters "[\" and "]".
```

Factories (`p03`):
```
|vector[RR64,4]()| = 4
after manual zero fill: [0#4][ 0.0 0.0 0.0 0.0 ]
w = vector[RR64,4](2.5)   -> [0#4][ 2.5 2.5 2.5 2.5 ]
u = vector[RR64,4](fn i)  -> [0#4][ 10.0 20.0 30.0 40.0 ]
u IS an AnyVector
```
The 0-arg factory does **not** zero-fill: printing it first threw `Access to uninitialized element 3 of array PrimitiveArray[\RR64,4\]` (`FortressLibrary.fss:2206`).

Why a literal becomes a `Vector` — `array1` (`fss:2239-2244`):
```fortress
array1[\T, nat s0\]():Array1[\T,0,s0\] =
     typecase __thrower[\T\] of
         () -> Number => vector[\T,s0\]()
         else => PrimitiveArray[\T,s0\]()
     end
```
*Element-is-a-`Number`* is what turns an array into a vector. This single typecase is the hinge.

### 2.2 Indexing/size — works
`a[2] = 3.0`, `|a| = 4`, `m[0,1] = 2.0`, `|m| = 4`, `m.sizes = (2,2)` (`p02`, `p08`).

### 2.3 Products and transpose — works (`p08`)
```
m n     = [ 70.0 100.0 / 150.0 220.0 ]      (juxtaposition = matrix product)
m DOT n = same         m.mul(n)= same
m.t()   = [ 1.0 3.0 / 2.0 4.0 ]
m v     = [0#2][ 3.0 7.0 ]     m.rmul(v) = same
v m     = [0#2][ 4.0 6.0 ]     m.lmul(v) = same
```

### 2.4 Elementwise + and scaling — works (`p04`)
```
u + v = [ 11.0 22.0 33.0 ]   u - v = [ -9.0 -18.0 -27.0 ]   -u = [ -1.0 -2.0 -3.0 ]
2.0 u = u 2.0 = u.scale(2.0) = [ 2.0 4.0 6.0 ]
u DOT v = u v = u.dot(v) = 140.0    pmul = [ 10.0 40.0 90.0 ]
||u|| = 3.7416573867739413           squaredNorm(u) = 14.0
```

### 2.5 Generators — work, except the array comprehension (`p05`–`p07`)
```
SUM over elements       = 10.0        SUM of squares = 30.0
SUM over indexValuePairs= 10.0        PROD = 24.0     BIG MAX = 4.0
set comprehension       = {1.0,4.0,9.0,16.0}      (needs  import Set.{...})
list comprehension      = <|1.0, 4.0, 9.0, 16.0|> (needs  import List.{...})
for x <- seq(u) …   for (i,x) <- seq(u.indexValuePairs) …   both fine
```

The spec's **array comprehension** — `Comprehension ::= [BIG] "[" [StaticArgs] ArrayComprehensionClause+ "]"`, `ArrayComprehensionLeft ::= IdOrInt |-> Expr` (`Specification/appendices/grammars/concrete-syntax.tex:1081-1096`; prose + identity-matrix example at `Specification/preliminaries/overview.tex:974-999`) — is dead:
```
p06: [ i |-> 1.0 (i+1) | i <- 0#4 ]
  …p06_rr64_arraycomp.fss:11:20:  Variable i is not defined.
  …p06_rr64_arraycomp.fss:11:31:  Variable i is not defined.
p07: [ (x,y) |-> 0.0 | x <- 0:2, y <- 0:2
       (x,x) |-> 1.0 | x <- 0:2 ]
  …:6:23: Variable x is not defined.   (and three more)
```
It parses (`ExprFactory.makeArrayComprehension`, `parser/Fortress.java:37006`) but no later phase knows the node: `ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/ExprDisambiguator.scala` has **no** case for `ArrayComprehension`/`ArrayComprehensionClause`, so the index variables are never bound and it errors at `ExprDisambiguator.scala:450`. Had it got past that, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:881-887` is:
```java
public FValue forArrayCompClause(ArrayComprehensionClause x) { return NI("forArrayCompClause"); }
public FValue forArrayComprehension(ArrayComprehension x)    { return NI("forArrayComprehension"); }
```
And there is **no `opr BIG [ ]` anywhere in `Library/`** (`grep 'BIG \[' Library/` → 0 hits against 189 `opr BIG` declarations). **Implementation gap, two layers.**

### 2.6 Runtime-sized dimensions — direct route closed (`p09`)
```
n: ZZ32 = 8
v = vector[\RR64,n\](1.0)
  …p09_runtime_size.fss:9:22:  n is undefined.
```
Static args resolve in the *type* namespace (`ProjectFortress/src/com/sun/fortress/compiler/disambiguator/TypeDisambiguator.java:363,380`), so a value binding named `n` is not in scope. **Spec-design limit** (`trait-parameters.tex:69-72`).

The library's escape hatch is `array[\E\](x:ZZ32):Array[\E,ZZ32\]` — *"Factory for arrays that returns an empty 0-indexed array of a given run-time-determined size"* (`Library/FortressLibrary.fsi:1343-1347`), implemented at `fss:1922` as `__arr1(__thrower[\E\], reflect(x))`. `reflect` lives in `/home/user/fortress/ProjectFortress/LibraryBuiltin/NatReflect.fss`:
```fortress
trait NatParam            getter toZZ() : ZZ32 end
value object N[\nat n\] extends { NatParam } … end
__refl'[\nat r, nat b\](x:ZZ32):NatParam = …    (* binary decomposition *)
reflect(z:ZZ32):NatParam = … __refl'[\0,1\](z) …
```
with its own comment: *"Really this just proves that it can be done without extending the language. Having proven that, we ought to build it in and document it in the spec."* That is `trait-parameters.tex:80` realised as a library trick — and it works for user code (§4.4).

## 3. The seal: is `Value extends Number` accepted?

`p10` — accepted, silently:
```
a + b = V(5.0)
a b   = V(6.0)
```

Notes:
- Getters must precede methods, else `Field/getter/setter declarations should come before method declarations.`
- `fortress typecheck` is useless as an oracle: it calls `useCompilerLibraries()` (`Shell.java:453-457`), checking against `Library/CompilerLibrary.fsi`, which has no `Vector`/`Matrix`/`vector`. On the seal probe: `Function vector is not defined.` On the plain `RR64` baseline: `Variable pmul is not defined.`, `Operator ||_|| is not defined.`, `Variable squaredNorm is not defined.`
- `fortress typecheck-old` does use the interpreter library (`Shell.java:465-471`) but **cannot typecheck the library itself** — dozens of errors on `FortressLibrary.fsi` before reaching user code (`Type QQ excludes FortressLibrary.RR64 but it extends FortressLibrary.RR64.`, `Invalid comprises clause: a trait with a comprises …, such as FortressLibrary.QQ, should not be extended.`). Abandoned code.

Nothing enforces `comprises` on the walk path today. **Library-design choice, unenforced by an implementation gap.**

## 4. The full battery with `Value` elements

### 4.1 Construction — all four forms work
```
p11: vector[\Value,3\](Value(1.0))               -> [0#3][ V(1.0) V(1.0) V(1.0) ]
p11: vector[\Value,3\](fn (i)=>Value(1.0 (i+1))) -> [0#3][ V(1.0) V(2.0) V(3.0) ]  u IS an AnyVector
p13: a: Value[3]         = [Value(1.0) …]        -> a IS an AnyVector
p13: b: Vector[\Value,3\]= [Value(1.0) …]        -> b IS an AnyVector
p13: m: Value[2,2] = [V(1.0) V(2.0); V(3.0) V(4.0)] -> m IS an AnyMatrix
```
The literal route works *because* `Value extends Number` satisfies `fss:2242`'s `() -> Number` typecase. Drop `extends Number` and the same literal yields a plain array (`p18`: `a is NOT an AnyVector`).

### 4.2 The one construction that fails: `matrix[\T,n,m\](v)`

`p14`:
```
com.sun.fortress.exceptions.ProgramError: …/Library/FortressLibrary.fss:1975:35-55:
Unification error: Closure/Constructor for init0 param 2 (v:Value) got arg 0: ZZ32 of type Int
…
    …/Library/FortressLibrary.fss:2616:3-74:
    …p14_value_matrix.fss:48:9-38:
```
Cause, `Library/FortressLibrary.fss:2615-2616`:
```fortress
matrix[\T extends Number, nat s0, nat s1\](v:T):Matrix[\T,s0,s1\] =
  array2[\T,s0,s1\]().fill(fn (x:ZZ32,y:ZZ32):T => if x=y then v else 0 end)
```
The `else 0` is an integer literal, not `v.zero`. For `T = RR64` this is latent — `p08` prints `matrix[RR64,2,2](3.0)` as
```
[ 3.0 0
  0 3.0 ]
```
i.e. `ZZ32` zeros sitting inside an `RR64` matrix. For a user element type it is a hard error. **Library bug.**

Sanctioned workaround, verified (`p15`):
```
matrix[Value,2,2]().fill(f)      -> [ V(3.0) V(0.0) / V(0.0) V(3.0) ]   k IS an AnyMatrix
matrix[Value,2,2]().fill(V(7.0)) -> all V(7.0)
array2[Value,2,2](f)             -> array2 result IS an AnyMatrix
k k = [ V(9.0) V(0.0) / V(0.0) V(9.0) ]     k v = [0#2][ V(3.0) V(6.0) ]
```

### 4.3 Indexing, algebra, transpose, generators — all green
`p12`, `p14`, `p16`, verbatim:
```
u + v = [ V(11.0) V(22.0) V(33.0) ]      u - v = [ V(-9.0) V(-18.0) V(-27.0) ]
-u    = [ V(-1.0) V(-2.0) V(-3.0) ]
u.scale(V(2.0)) = Value(2.0) u = u Value(2.0) = [ V(2.0) V(4.0) V(6.0) ]
u.dot(v) = u DOT v = u v = V(140.0)      pmul(u,v) = [ V(10.0) V(40.0) V(90.0) ]
squaredNorm(u) = V(14.0)

m[0,1] = V(2.0)    |m| = 4    m.sizes = (2,2)
m + n / m - n / -m / m.scale(V(2.0)) / Value(2.0) m / m Value(2.0)   all elementwise V(...)
m n = m DOT n = m.mul(n) = [ V(70.0) V(100.0) / V(150.0) V(220.0) ]
m v = m.rmul(v) = [ V(3.0) V(7.0) ]      v m = m.lmul(v) = [ V(4.0) V(6.0) ]
m.t() = [ V(1.0) V(3.0) / V(2.0) V(4.0) ]      m.t() v = [ V(4.0) V(6.0) ]

SUM over vector elements = V(10.0)   SUM of squares = V(30.0)
SUM over matrix elements = V(10.0)   SUM over indexValuePairs = V(10.0)
PROD over vector elements= V(24.0)
list comprehension       = <|V(1.0), V(4.0), V(9.0), V(16.0)|>
u.map(x=>x x)            = [ V(1.0) V(4.0) V(9.0) V(16.0) ]   map result IS an AnyVector
u.ivmap                  = [ V(1.0) V(3.0) V(5.0) V(7.0) ]
```
Mutation works (`p28`): `u[0] := Value(99.0)` → `[ V(99.0) V(2.0) V(3.0) ]`.

### 4.4 Runtime-sized with `Value` — works two ways

**(a) via the library's own `array[\E\](n)`** (`p22`, `n: ZZ32 = 8`):
```
array[Value](n).fill(f) = [0#8][ V(1.0) … V(8.0) ]     b IS an AnyVector
|b| = 8, b[3] = V(4.0)      SUM over b = V(36.0)
array[Value](2,3).fill(f)   c IS an AnyMatrix
b + d = [0#8][ V(2.0) … V(9.0) ]
```

**(b) via `NatReflect.reflect` in user code** (`p23`, `sz: ZZ32 = 5`) — one hoisted generic per shape, since a `nat` can only be bound by a top-level generic taking `N[\n\]`:
```fortress
mkVec[\nat n\](w:N[\n\], f:ZZ32->Value): Vector[\Value,n\] = vector[\Value,n\](f)
mkSquare[\nat n\](w:N[\n\], f:(ZZ32,ZZ32)->Value): Matrix[\Value,n,n\] =
    matrix[\Value,n,n\]().fill(f)
```
```
mkVec(reflect(5))    = [0#5][ V(1.0) V(2.0) V(3.0) V(4.0) V(5.0) ]   v IS an AnyVector
mkSquare(reflect(5)) = 5x5 diag V(2.0)
m v = [ V(2.0) V(4.0) V(6.0) V(8.0) V(10.0) ]   v m = same
m.t() = …   v DOT v = V(55.0)   v + v = …   SUM = V(15.0)
```
Rectangular and *computed* sizes too (`p24`, `rows = 2+1`, `cols = rows+1`):
```
W (3x4) = [ V(0.0) V(1.0) V(2.0) V(3.0) / V(4.0) … / V(8.0) … V(11.0) ]
W x  = [0#3][ V(6.0) V(22.0) V(38.0) ]
y W  = [0#4][ V(12.0) V(15.0) V(18.0) V(21.0) ]
W^T  = 4x3    W^T y = [0#4][ V(12.0) V(15.0) V(18.0) V(21.0) ]
||x|| = 2.0
```
So "dimensions must be static `nat`" is true of the *type* but is **not** a practical barrier.

Capstone (`p30`) — a runtime-sized two-layer forward pass whose only containers are library `Vector`/`Matrix` of `Value`, sizes `3→4→2` from ordinary `ZZ32` variables:
```
x  = [0#3][ V(1.0) V(2.0) V(3.0) ]
W1 x + b1  = [0#4][ V(0.30000000000000004) V(0.9000000000000001) V(1.5) V(2.1) ]
relu(...)  = same
W2 h + b2  = [0#2][ V(2.2) V(3.4000000000000004) ]
loss (SUM y_i^2) = V(16.400000000000002)
transpose round-trip w1.t().t()[0,2] = w1[0,2]?  true
sanity: 2.0 + 3.0 = 5.0, SQRT 2.0 = 1.4142135623730951
sanity: RR64 vector still works: [0#3][ 2.0 4.0 6.0 ], r DOT r = 14.0
```
The last line matters: `Value extends Number` does **not** disturb ordinary `RR64` arithmetic in the same program.

## 5. What the element type must provide — and why the seal is load-bearing

### 5.1 Requirement ladder (bisected)

| `Value` declares | result |
|---|---|
| `+`, `TIMES` only, `extends Number` (`p19`) | **fails**: `** bug! MethodClosure asFloat(self:(FortressLibrary.Number & {FortressLibrary.RR64})):FortressLibrary.RR64 …FortressLibrary.fss:355:5-23 has neither body nor def instanceof Method`, raised from `FortressLibrary.fss:381` |
| `+`, `TIMES`, **`juxtaposition`**, `extends Number` (`p20`) | **everything works**: `u DOT v = V(140.0)`, `SUM = V(6.0)`, `m w`, `w m`, `m.t()`, `m m`, `m + m`, `scale`, `pmul` |
| `+`, `TIMES`, `asFloat`, **no** `juxtaposition` (`p21`) | **silently wrong**: `u DOT v = 140.0`, typecase reports `… u DOT v SILENTLY became an RR64`; then `u.scale(Value(2.0))` dies with `Unification error: … init0 param 2 (v:Value) got arg 2.0:RR64 of type Float` |
| no `opr -`, program uses `u - v` (`p28`) | `** bug! MethodClosure asFloat … has neither body nor def` from `FortressLibrary.fss:377` |

Why: `Vector`'s methods use `juxtaposition`, not `TIMES` — `fss:2197` `scale = map(fn (v) => t v)`, `:2199` `pmul`, `:2201` `dot(v) = SUM [(i,me_i)<-self.indexValuePairs] me_i v.get(i)`. Without an override, the inherited `Number.opr juxtaposition(self,b:Number):RR64 = asFloat(self) asFloat(b)` (`fss:380-381`) applies — and `asFloat` is *abstract* at `fss:355`.

**Minimum viable element type: `extends Number` + `opr +` + `opr TIMES` + `opr juxtaposition`; add `opr -` (binary and unary) if the program uses vector subtraction/negation. `asFloat`, `zero`, `one`, `^` optional — and supplying `asFloat` *without* `juxtaposition` is actively dangerous.**

### 5.2 Why the seal cannot be sidestepped

`p18` shows the `T extends Number` bound is **not** checked when instantiating `vector[\Value,3\]`: a non-`Number` `Value` yields an object that typecases as `IS an AnyVector`. But `p31` shows the algebra then collapses:
```
u + v -> Failed to find any matching overload, args = (Value,Value), overload = { … }
   raised inside  Library/FortressLibrary.fss:2193  (Vector.opr + 's  e + v.get(i))
```
The reason is dispatch, not bounds. Inside the library's generic code, `e + v.get(i)` resolves against the *global* overload table; the user's `opr +(self, other: Value)` is a method on a type the library never heard of. The only table entry that can route `(Value,Value)` back to the user's method is an inherited one — `AdditiveGroup[\T\].+(self:AdditiveGroup[\T\],other:T):T` (`fss:330`).

So the spec-legal move is to extend the **unsealed** traits `AdditiveGroup[\T extends AdditiveGroup[\T\]\]` (`fss:328`) and `MultiplicativeRing[\T extends MultiplicativeRing[\T\]\]` (`fss:340`) — neither has a `comprises` clause. `p32`/`p33`:

**Works** (`p33`):
```
u + v      = [0#3][ V(11.0) V(22.0) V(33.0) ]
u.scale(V) = [0#3][ V(2.0) V(4.0) V(6.0) ]
u.pmul(v)  = [0#3][ V(10.0) V(40.0) V(90.0) ]
m.t()      = 3x3 diag V(2.0)
m + m      = 3x3 diag V(4.0)
m.scale(V) = 3x3 diag V(4.0)
u - v, -u  (p32)                                   also fine
```

**Fails, two distinct ways:**

1. **Top-level operators enforce the bound.** `p32`, `u DOT v`:
```
Failed to find any matching overload,
args = (__DefaultVector[\Value,3\],__DefaultVector[\Value,3\]), overload = {
        …
        DOT[\T extends FortressLibrary.Number,nat n\](me:Vector[\T,n\],other:Vector[\T,n\]):T
           …/Library/FortressLibrary.fss:2261:1-2262:69
        …
```
The candidate is listed and rejected. Same for `M v`, `v M`, `M N`, `t u`, `u t` — every `opr juxtaposition`/`opr DOT` at `fss:2261-2277` and `2621-2655` carries `[\T extends Number, …\]`.

2. **`SUM` casts to `Number`.** `p33`, `u.dot(v)` / `m.rmul(u)` / `m.lmul(u)` / `m.mul(m)`:
```
…/Library/FortressLibrary.fss:36:13-27:
CastError
Context: …fss:36:13-27  ->  fss:1120:25-34  ->  fss:2201:46-57  …
```
`Vector.dot` (`fss:2201`) is a `SUM`; `opr SUM[\T extends Number\]()` is `Comprehension[\T,Number,Number,Number\](fn x => x, SumReduction, cast[\Number\])` (`fss:3041-3042`); `__bigOperator` applies `o.unwrap` at `fss:1121`; `cast[\T\]` throws `CastError` at `fss:36`.

**Therefore the seal is exactly the obstacle.** `Value extends Number` is the only declaration that simultaneously (a) satisfies the `T extends Number` bound on top-level operators, (b) survives `SUM`'s `cast[\Number\]`, and (c) makes an array literal become a `Vector` via `array1`'s `() -> Number` typecase.

## 6. Spec-promised operators the library lacks (all fail on `RR64` too)

`p25`, `p26`:
```
||v||  = 5.0                                     (vector norm: fine)
m^T  ->  Operator postfix ^T is not defined.     (opr-overview.tex:86-90)
v^T  ->  Operator postfix ^T is not defined.
m^2  ->  Failed to find any matching overload, args = (__DefaultMatrix[\RR64,2,2\],2: ZZ32) …
                                                 (opr-overview.tex:79-81)
||m|| -> Unification error: …fss:2281:41-51: Cannot unify
         __DefaultMatrix[\RR64,2,2\] with Vector[\T,k\] abm=T=(BOTTOM,Number)
                                                 (opr-overview.tex:56-57)
```
`grep 'opr \^' Library/FortressLibrary.fsi` returns only scalar/`String` cases — never `Vector` or `Matrix`. `opr ||…||` is declared only for `Vector` (`.fsi:1528`). Transpose is a method, never the superscript operator. **Library gap vs spec, three items.** For user types: `w.t()` works for `Value` (`p24`), `m^k` does not, and `||v||` returns `RR64` by signature — it flattens the user element type by design.

## 7. Two further sharp edges

**`SUM` over an empty `Value` vector (`p29`):**
```
SUM over empty = 0
  ... it is NOT a Value (SumReduction.empty() = 0)
```
`object SumReduction … empty(): Number = 0` (`fss:3029`), `join(a:Number,b:Number)` (`fss:3030`). Monomorphic in `Number`, so the identity can never be the user type's `zero`. Non-empty reductions are fine only because the identity is never combined in. **Library-design limit.**

**Bare `RR64` scalar × `Vector[\Value\]` (`p29`):**
```
2.0 u -> Failed to find any matching overload, args = (2.0,__DefaultVector[\Value,3\]) …
```
Expected — scaling overloads are `(other:T, me:Vector[\T,n\])` with `T=Value`. `Value(2.0) u` works. **Library-design choice.**

## 8. Item-by-item scorecard

OK = works; OK\* = works with named workaround; NO = does not work.

| # | item | `RR64` | `Value extends Number` | `Value` spec-legal ring route |
|---|---|---|---|---|
| 1a | literal, no LHS type | NO (`LHSEvaluator.java:140`) | NO | NO |
| 1b | literal, typed LHS `T[n]` / `Vector[\T,n\]` | OK | OK | NO — plain array (`array1` typecase) |
| 1c | literal with static args `[\T\ …]` | NO (parser) | NO | NO |
| 1d | `vector[\T,n\]()` / `(v)` / `(f)` | OK | OK | OK |
| 1e | `matrix[\T,n,m\](v)` | OK (latent bug) | NO (`fss:2616` `else 0`) | NO |
| 1f | `matrix[…]().fill(…)`, `array2[…](f)` | OK | OK\* | OK |
| 1g | array comprehension `[i \|-> e \| g]` | NO (`Evaluator.java:885`) | NO | NO |
| 1h | runtime size via `array[\E\](n)` | OK | OK | n/a |
| 1i | runtime size via `reflect` + hoisted generic | OK | OK | partial |
| 2 | `v[i]`, `m[i,j]`, `\|v\|`, `.sizes`, `v[i] := x` | OK | OK | OK |
| 3a | `M v`, `v M`, `M N` (juxtaposition) | OK | OK | NO (bound enforced) |
| 3b | `.rmul` `.lmul` `.mul` | OK | OK | NO (`cast[\Number\]`) |
| 3c | transpose `.t()` | OK | OK | OK |
| 3d | transpose `M^T` | NO | NO | NO |
| 4a | `u + v`, `u - v`, `-u` | OK | OK | OK |
| 4b | scaling by an element | OK | OK | OK (`.scale`) / NO (operator) |
| 4c | `u DOT v`, `.dot`, `pmul` | OK | OK | NO |
| 5a | `SUM`/`PROD`/`BIG MAX` over elements | OK | OK | NO |
| 5b | `SUM` over `indexValuePairs` | OK | OK | NO |
| 5c | set / list comprehension over a vector | OK | OK | OK |
| 5d | `for x <- seq(v)`, `.map`, `.ivmap` | OK | OK | OK |
| — | `\|\|v\|\|` | OK | OK but returns `RR64` | NO |
| — | `\|\|m\|\|`, `m^k` | NO | NO | NO |

## 9. Failure classification

**Library-design choice**
- `Vector`/`Matrix` bound to `T extends Number` with `Number comprises { RR64 }` — the spec makes the same choice (`aggregate.tex:153-167`), so it is deliberate. It is the single obstacle.
- `SumReduction` monomorphic in `Number` with `empty() = 0` (`fss:3029`).
- Scaling overloads typed `(T, Vector[\T,n\])`, so no `RR64 × Vector[\Value\]`.

**Library bug**
- `matrix[\T,n,m\](v)` off-diagonal integer `0` (`fss:2616`).
- `Vector`/`Matrix` methods written with `juxtaposition` while the inherited `Number.juxtaposition` (`fss:380-381`) silently degrades a user element type to `RR64` — `p21` gives a wrong-typed answer with no diagnostic.
- No `opr ^` for `Vector`/`Matrix`, no `opr ||…||` for `Matrix`, no `^T` operator — all promised by `opr-overview.tex`.

**Implementation gap**
- No element-type inference for array literals (`LHSEvaluator.java:117-140`).
- `[\StaticArgs\ …]` inside an array literal not parsed (`aggregate.tex:28`).
- Array comprehensions unimplemented at two layers (`ExprDisambiguator.scala` has no case; `Evaluator.java:881-887` is `NI`), and no `opr BIG [ ]` in `Library/`.
- `comprises` never checked on the walk path (`Shell.java:420-424` + `1275`, `StaticChecker.java:166`); the only checker that would check it (`TypeHierarchyChecker.scala:206-208`) is reachable only via phases that cannot handle this library (`typecheck` → `CompilerLibrary`; `typecheck-old` → errors on `FortressLibrary.fsi` itself).

**Spec-design limit**
- `nat` dimensions are static parameters (`trait-parameters.tex:69-72`), so a value name can never be a static argument. Mitigated by `NatReflect.reflect`, which the spec anticipates at `trait-parameters.tex:80` and which `NatReflect.fss`'s own comment says "we ought to build in and document in the spec".

## 10. Smallest thing standing in the way

**One `comprises` clause** — `/home/user/fortress/Library/FortressLibrary.fss:352` (and `.fsi:276`):
```fortress
trait Number
        extends { StandardPartialOrder[\Number\], StandardMinMax[\Number\],
                  AdditiveGroup[\Number\], MultiplicativeRing[\Number\] }
        comprises { RR64 }
```
Today a user program can just declare `Value extends Number` and get everything, because the walk interpreter never checks the clause. That is a *bug working in the user's favour*: the program is illegal Fortress (`Specification/basic/traits.tex:265-275`) and would be rejected the moment the type hierarchy checker were enabled on the interpreter path.

Principled fixes, smallest first:
1. **`comprises { RR64, ... }`** — the spec already provides the ellipsis form for exactly this (`traits.tex:236-238`; legal only in an API). One token in `FortressLibrary.fsi:276` makes every result in §4 legal.
2. Failing that, **relax the three bounds that actually bite**: change `[\T extends Number\]` to `[\T extends MultiplicativeRing[\T\]\]` on the top-level `DOT`/`juxtaposition` operators (`fss:2258-2281`, `2618-2655`), and make `SUM`'s unwrap not `cast[\Number\]` (`fss:3042`). Then the spec-legal `extends { AdditiveGroup[\Value\], MultiplicativeRing[\Value\] }` route in `p32`/`p33` becomes complete — and `array1`'s `() -> Number` typecase (`fss:2242`) needs a companion test so literals still become vectors.
3. Independently and cheaply: `fss:2616` `else 0` → `else v.zero`.