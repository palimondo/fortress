# Worker report: 18 goals against the walk interpreter (JDK 25, FORTRESS_THREADS=1)

Probes are in this directory; each `wNN_*.out` holds the verbatim run. Superseded
runs of a revised probe are kept as `wNN_*.attemptK.out`. Specification citations
are `Specification/**/*.tex` with line numbers as of this tree; library citations
are `Library/*.fsi`/`*.fss`.

## G1. Postfix `^T` on a runtime-sized vector and a runtime-sized matrix

**Goal:** declare a user postfix operator `^T` that transposes both
`array[\RR64\](n)` (static type `Array[\RR64,ZZ32\]`) and `array[\RR64\](n,m)`
(static type `Array[\RR64,(ZZ32,ZZ32)\]`), by any spec-legal route; `x^T` and
`M^T` both run.

**ACHIEVED.**

Probe: `w01_transpose.fss` (`w01_transpose.attempt1.out` is the rejected
two-overload-on-`Array` attempt).

Decisive output (`w01_transpose.out`):

```
x^T = [0#1,0#3]
[ 1.0 2.0 3.0 ]
M^T = [0#3,0#2]
[ 1.0 4.0
  2.0 5.0
  3.0 6.0 ]
```

The route that works is two postfix overloads whose parameters exclude each
other, `opr (x: Vector[\RR64,n\])^T[\nat n\]` and
`opr (m: Matrix[\RR64,n,p\])^T[\nat n, nat p\]`; the static parameters of a
postfix operator follow the operator name (`ProjectFortress/src/com/sun/fortress/parser/Parameter.rats:132-151`).
The naive pair `opr (x: Array[\RR64,ZZ32\])^T` / `opr (m: Array[\RR64,(ZZ32,ZZ32)\])^T`
is rejected: `first parameters m:[Array[\RR64,(ZZ32,ZZ32)\]] and
x:[Array[\RR64,ZZ32\]] are unrelated (neither subtype, excludes, nor equal) and
no excluding pair is present` (`w01_transpose.attempt1.out`).

Citation: `Specification/advanced/operator-definitions.tex:160-176` (postfix
operator declarations); `Specification/basic/expressions/operator-app.tex:29-40`
(`ExponentOp ::= ^T`; `Primary ::= Primary ExponentOp`);
`Specification/advanced/overloading.tex:175-220` (Incompatibility Rule — two
overloadings are valid when their parameter types exclude);
`Library/FortressLibrary.fsi:1072-1075` (`Rank1 excludes Rank2`), `:1460-1462`,
`:1578-1580` (`Vector extends Array1`, `Matrix extends Array2`).

Interpretation: the spec's postfix `^T` is fully declarable and dispatches on
runtime-sized arrays, but the two shapes must be separated by an *exclusion*
(`Rank1`/`Rank2`), because `Array[\E,ZZ32\]` and `Array[\E,(ZZ32,ZZ32)\]` are
merely unrelated and so fail the Incompatibility Rule.

## G2. Array pasting `[ A B ]`, `[ A ; B ]`, `[ u v ]`

**Goal:** concatenate two runtime-sized matrices side by side with `[ A B ]`,
stack them with `[ A ; B ]`, and paste two runtime-sized vectors `[ u v ]` into a
variable whose declared type is `Array[\RR64,ZZ32\]`; each prints the expected
array.

**NOT ACHIEVED** (all three parts fail; two for one reason, one for another).

Probes: `w02_paste.fss` (runtime-sized, all three), `w02_paste_stack.fss`,
`w02_paste_static.fss` (statically sized `Array2`), `w02_paste_vec.fss`
(+ `w02_paste_vec.attempt1.out`).

Decisive output (`w02_paste.out`, and identically `w02_paste_stack.out`,
`w02_paste_static.attempt1.out`, `w02_paste_static.out`):

```
Element at [0] has extent 2 along axis 1 but an earlier element has length 0
```

`[ u v ]` bound to `Array[\RR64,ZZ32\]` does not fail loudly — it binds nothing:
`w02_paste_vec.attempt1.out` says `undefined variable [w]` at the *use* of the
variable. With a statically sized target the vector paste works
(`w02_paste_vec.out`): `w = [0#4][ 1.0 2.0 3.0 4.0 ]` and
`s = [0#4][ 1.0 2.0 7.0 8.0 ]` (the second pastes a runtime-sized `array[\RR64\](2)`).

Citation: `Specification/basic/expressions/aggregate.tex:117-128` (rows separated
by whitespace, `;` separates rows) and `:180-188` ("If an element is an array
expression, it is `flattened' (pasted) into the enclosing expression").

Interpretation: matrix pasting of rank-2 elements is dead in the interpreter
(`ProjectFortress/.../values/IUOTuple.java:111-113` allocates `extentSums` and never
seeds it with the "no constraint" value `-1`, so the first rank-2 element is
compared against `0`), and the vector paste is reachable only with a
statically sized left-hand type, so all three parts of the goal fail.

## G3. Postfix `^T` directly after a dotted field access

**Goal:** write `x.v^T` where `x` is an object with a matrix field `v`, so that it
parses and runs.

**NOT ACHIEVED.**

Probes: `w03_dotpostfix.fss` and `w03_dotpostfix.attempt1.out`,
`.attempt2.out`, `.attempt3.out`.

Decisive output (`w03_dotpostfix.attempt2.out`, on the line `a = x.v^T`):

```
/home/user/fortress/explorations/run-b/probes/worker/w03_dotpostfix.fss:24:12:
    Syntax Error
```

`.attempt3.out` shows the same error for the getter spelling `x.w^T`;
`w03_dotpostfix.out` shows the parenthesized form running:
`paren (x.v)^T = [0#3,0#2]` followed by the transposed matrix.

Citation: `Specification/appendices/grammars/concrete-syntax.tex:934-951`
(`PrimaryItem ::= Primary . Id` and `PrimaryItem ::= Primary ExponentOp`, both
left-recursive on `Primary`); `Specification/basic/expressions/operator-app.tex:29-40`.

Interpretation: the spec's grammar makes `x.v^T` a `Primary` followed by an
`ExponentOp` and therefore legal, but the implementation's parser rejects it —
an implementation gap whose workaround is `(x.v)^T`.

## G4. `BIG MAX g` (prefix, no generator clause) over a user `Generator[\RR64\]`

**Goal:** apply the library's `BIG MAX` in prefix form to a user object that is a
`Generator[\RR64\]` (extending `ZeroIndexed[\RR64\]` and
`DelegatedIndexed[\RR64,ZZ32\]`); it returns the maximum element.

**NOT ACHIEVED** for element type `RR64`; achieved for element type `Number`.

Probes: `w04_bigmax.fss` (+ `.attempt1.out`), `w04_bigmax_lib.fss`,
`w04_bigmax_number.fss`.

Decisive output (`w04_bigmax.out`): the generator-clause form works,
`generator clause : 9.5`, while the prefix form with an explicit static argument
fails:

```
Failed to find any matching overload, args = (Vec), overload = {
	BIG MAX[\T extends StandardMax[\T\]\](g:Generator[\T\]):(T, T)[\Number\] Generator[\Number\]->(Number,Number) ...}
```

The same failure occurs for a *library* array of `RR64` (`w04_bigmax_lib.out`,
`args = (__DefaultVector[\RR64,4\])`), and the identical carrier declared over
`Number` succeeds (`w04_bigmax_number.out`):
`Generator[Number], prefix BIG MAX = 9.5`.

Citation: `Specification/basic/expressions/reductions.tex:53-56` and `:82-91`
(`BIG MAX g` is equivalent to `BIG MAX [x <- g] x`);
`Library/FortressLibrary.fsi:1874-1876` (`opr BIG MAX[\T extends StandardMax[\T\]\](g: Generator[\T\])`);
`Library/FortressLibrary.fsi:195-196, 273-275` (`Number extends StandardMinMax[\Number\]`,
so `RR64` satisfies `StandardMax[\Number\]`, never `StandardMax[\RR64\]`).

Interpretation: the prefix reduction form is implemented, but the library's own
bound `T extends StandardMax[\T\]` plus the invariance of `Generator` makes
`BIG MAX g` unreachable for any `Generator[\RR64\]` — a library-vs-spec gap, not
a missing desugaring.

## G5. Map comprehension over matrices of different shapes

**Goal:** build a `Map[\String, Array[\RR64,(ZZ32,ZZ32)\]\]` whose values are
2x3, 4x3 and 3x5 matrices with `{ k |-> f(k) | k <- keys }` (with or without
static arguments); the comprehension evaluates and the map prints its three keys.

**NOT ACHIEVED.**

Probes: `w05_mapcompr.fss` (+ `.attempt1.out`), `w05_mapcompr_same.fss`
(+ `.attempt1.out`, `.attempt2.out`, `.attempt3.out`).

Decisive output (`w05_mapcompr.out`, with static arguments; `.attempt1.out`
without them is identical):

```
FAIL: Singleton[\(FlatString,__DefaultMatrix[\RR64,2,3\])\] APPCOV Singleton[\(FlatString,__DefaultMatrix[\RR64,4,3\])\] have no common supertype!
```

The control (`w05_mapcompr_same.out`) shows the comprehension is fine when the
shapes agree and static arguments are supplied
(`uniform shapes + static args: |m1| = 3`, keys `a`, `b`, `c`), and that the same
three differing shapes go in without complaint when the map is built by
`update` (`different shapes by update: |m2| = 3` with sizes 6, 12, 15).
Without static arguments even the uniform case fails
(`w05_mapcompr_same.attempt1.out`: `RHS expression type
NodeMap[\FlatString,__DefaultMatrix[\RR64,2,3\]\] is not assignable to LHS type
Map[\String,Array[\RR64,(ZZ32,ZZ32)\]\]`).

Citation: `Specification/basic/expressions/comprehensions.tex:21-31` (map
comprehension grammar with optional `StaticArgs`) and `:75-80`;
`Library/CovariantCollection.fss:27-37` and `:39-40` (`opr APPCOV[\T, A extends T, B extends T\]`
and its `fail` fallback).

Interpretation: the comprehension's join is `APPCOV`, whose common supertype `T`
is inferred from the *runtime* classes of the two singletons, and two
`__DefaultMatrix` instantiations of different `nat` shapes have no such inferred
supertype, so any comprehension whose elements differ in shape dies inside the
library.

## G6. The constant pi

**Goal:** use the specification's constant pi in an expression, by any spelling
the specification or the library provides.

**ACHIEVED.**

Probes: `w06_pi.fss`, `w06_pi_bare.fss`, `w06_pi_unicode.fss`.

Decisive output (`w06_pi.out`):

```
pi        = 3.141592653589793
pi r^2    = 12.566370614359172
```

`w06_pi_bare.out` shows `Variable pi is not defined.` without
`import Constants.{...}`, and `w06_pi_unicode.out` shows `Variable ? is not
defined.` for the Unicode spelling.

Citation: `Specification/basic/expressions/literals.tex:214-223` ("The object
named pi ... has type `RationalValueTimesPi[\false,1,1\]`");
`Library/Constants.fss:15` (`pi : FloatLiteral = 3.141592653589793`),
`Library/Constants.fsi:16`.

Interpretation: pi is reachable, but only as an ordinary `FloatLiteral` constant
in the separately imported `Constants` API — not as the spec's
`RationalValueTimesPi` object and not under the Unicode name.

## G7. Two subscript methods on one object

**Goal:** declare `opr [ts: List[\ZZ32\]]` and `opr [r: Range[\ZZ32\]]` (or
`Generator[\ZZ32\]` for one of them) on one object; `x[<|1,2|>]` and `x[0#2]`
both dispatch.

**ACHIEVED** (with `Generator[\ZZ32\]` in place of `Range[\ZZ32\]`, the
alternative the goal allows).

Probe: `w07_subscripts.fss` (+ `w07_subscripts.attempt1.out`).

Decisive output (`w07_subscripts.out`):

```
x[<|1,2|>] = list of 2 indices
x[0#2]     = generator, sum 1
```

The literal pairing `List[\ZZ32\]` + `Range[\ZZ32\]` is rejected
(`w07_subscripts.attempt1.out`): `first parameters r:[Range[\ZZ32\]] and
ts:[List[\ZZ32\]] are unrelated (neither subtype, excludes, nor equal)`.

Citation: `Specification/advanced/subscripting.tex:12-38` (subscripting operator
method declarations, resolved "according to the usual overloading rules");
`Specification/advanced/overloading.tex:149-174` (Subtype Rule) and `:175-220`
(Incompatibility Rule); `Library/FortressLibrary.fsi:2046-2047` (`trait Range[\I\]`
does *not* extend `Generator`) and `:2140-2153` (`FullRange` extends `Indexed`).

Interpretation: two subscript overloads coexist only when one parameter type is a
supertype of the other, and since `Range[\I\]` is not a `Generator[\I\]`, the
usable pair is `List[\ZZ32\]` (specific) plus `Generator[\ZZ32\]` (general),
which catches `0#2` because `CompactFullRange` is a `Generator`.

## G8. `a || b` spanning two source lines

**Goal:** write a list concatenation `a || b` across two lines; find every
arrangement that parses and report which do not.

**ACHIEVED** (the goal is to find them).

Probes: `w08_cat1.fss` … `w08_cat6.fss`.

Decisive output, one line per arrangement:

* `a || b` on one line — `w08_cat1.out`: `cat1 = <|1, 2, 3, 4|>`
* `a ||` newline `b` — `w08_cat2.out`: `w08_cat2.fss:8:27:` / `Syntax Error`
* `a` newline `|| b` — `w08_cat3.out`: `w08_cat3.fss:9:12:` / `Syntax Error`
* `(a ||` newline `b)` — `w08_cat4.out`: `cat4 = <|1, 2, 3, 4|>`
* `(a` newline `|| b)` — `w08_cat5.out`: `cat5 = <|1, 2, 3, 4|>`
* `a||` newline `b` (no space) — `w08_cat6.out`:
  `Right encloser without left encloser.`

Citation: `Specification/basic/operators/enclosingops.tex:23-45` — the row at
`:31` says that a run of vertical lines after a *primary tail*, with whitespace
before it and a *line break* after it, is an **infix** operator (and with no
whitespace, a right encloser); `:68-72`;
`Specification/basic/operators/opr-fixity.tex:34-45, 95-105`.

Interpretation: only the parenthesized splits parse, in either arrangement; the
bare line-final `a ||` that the spec's own fixity table classifies as infix is a
syntax error in the implementation, and the bare leading `|| b` fails too, while
`a||` at end of line is diagnosed exactly as the table's "right encloser" case.

## G9. `value object` with an array field and a closure field, compared with `===`

**Goal:** declare a `value object` with an array field and a closure field,
construct two instances from equal arguments, and report what `===` returns for
the two instances and for an instance against itself.

**ACHIEVED** (the goal is to report), with a result that contradicts the spec.

Probes: `w09_valueobj.fss`, `w09_valueobj_fields.fss`, `w09_valueobj_scalar.fss`.

Decisive output (`w09_valueobj.out`):

```
p === p (same instance)          : true
q === p (same field values)      : true
r === p (equal but distinct array): true
```

`w09_valueobj_fields.out` shows the array fields themselves are *not* equivalent
(`d === e (distinct, equal contents)   : false`) and that reference objects
behave correctly (`RBox(d) === RBox(d): false`, `rp === rp : true`).
`w09_valueobj_scalar.out` is decisive: `P(1.0) === P(2.0) : true` while
`1.0 === 2.0 : false`.

Citation: `Specification/basic/objects.tex:347-368` (Value Objects);
`Specification/basic/objects.tex:424-445` (Object Equivalence — "If both
arguments are value objects with the same type, then the result is true if and
only if corresponding fields of the objects are themselves equivalent").

Interpretation: `===` on a user `value object` compares only the dynamic type in
this implementation — it returns `true` for two instances with demonstrably
inequivalent fields — so the answer to the goal is "true in every case",
and that is a silent violation of `objects.tex:432-437`.

## G10. Violated `requires` contract, and a top-level `property`

**Goal:** declare a function with a `requires` contract on its arguments' lengths
and call it with arguments that violate it; declare a top-level `property` and
run the program; report what the interpreter does with each.

**ACHIEVED** (the goal is to report).

Probes: `w10_contract.fss` (+ `w10_contract.attempt1.out`, which contains the
`property` declaration).

Decisive output — `requires` (`w10_contract.out`):

```
ok call  = 6.0
/home/user/fortress/explorations/run-b/probes/worker/w10_contract.fss:5:20-28:
CallerViolation
```

Decisive output — `property` (`w10_contract.attempt1.out`):

```
** bug! Not yet implemented: PropertyDecl at .../w10_contract.fss:8.1
```

Citation: `Specification/basic/functions.tex:426-427, 459-466` ("If any expression
in a `requires` clause does not evaluate to true, a `CallerViolation` exception is
thrown"); `Specification/basic/tests.tex:15-17` ("Tests and properties are not yet
supported") and `:236-238` (`PropertyDecl` grammar).

Interpretation: contracts are implemented and throw exactly the exception the
spec names, while `property` parses and then aborts the whole program with an
interpreter `bug!` — which the specification itself flags as unsupported.

## G11. `w: Array[\RR64,ZZ32\] = [ 1.0 2.0 ]`

**Goal:** declare an array literal with the runtime-sized array type on the left
and then print `w`.

**NOT ACHIEVED.**

Probes: `w11_arraylit.fss`, `w11_arraylit_variants.fss`.

Decisive output (`w11_arraylit.out`):

```
/home/user/fortress/explorations/run-b/probes/worker/w11_arraylit.fss:6:20:
undefined variable [w]
```

The same literal binds fine under a statically sized type
(`w11_arraylit_variants.out`):

```
a = [0#2][ 1.0 2.0 ]
b = [0#2][ 3.0 4.0 ]
c = [0#2][ 5.0 6.0 ]
```

for `Array1[\RR64,0,2\]`, `RR64[2]` and `Vector[\RR64,2\]` respectively.

Citation: `Specification/basic/expressions/aggregate.tex:117-137` (the type of a
$k$-dimensional array expression, abbreviated `T[n_0,...,n_{k-1}]`).

Interpretation: with `Array[\E,I\]` on the left the interpreter's
`LHSEvaluator.forLValue` (`ProjectFortress/.../evaluator/LHSEvaluator.java:113-200`)
finds neither a generic `ArrayK` supertype nor an `FTypeArray`/`FTypeMatrix`/
`FTypeVector`, falls off the end of the `if`-chain and stores nothing, so the
declaration is a silent no-op and the variable is simply undefined afterwards.

## G12. Overloading a nullary big operator

**Goal:** after `import FortressLibrary.{...} except { opr BIG + }`, declare
`opr SUM(): BigReduction[\Any,Any\]` over a reduction whose `join(a,b) = a + b`
and also a prefix `opr SUM(x: T): U`; `SUM[i <- 1:4] i`,
`SUM[t <- 0#3] nodes[t]` over user objects with `+`, and prefix `SUM x` all work
in one component.

**ACHIEVED.**

Probe: `w12_sum.fss`.

Decisive output (`w12_sum.out`):

```
SUM[i <- 1:4] i        = 10
SUM[t <- 0#3] nodes[t] = Node(7.0)
prefix SUM nodes[0]    = 1.0
```

Citation: `Specification/basic/expressions/reductions.tex:23-34` (a reduction
expression is a call to the `BIG Op` operator);
`Specification/basic/components/source-code.tex:234-252` (the
`import A.{...} except { name }` form);
`Library/FortressLibrary.fsi:1783-1794` (`BigOperator`, `BigReduction`),
`:1770-1776` (`CommutativeMonoidReduction`).

Interpretation: the big-operator name `SUM` (= `opr BIG +`) is extensible by
*replacement* — one `except` clause, one user reduction over `Any`, and a
nofix/prefix pair of the same name coexist, covering integers, user objects with
their own `+`, and a prefix application in a single component.

## G13. `Maybe`-backed `grad` getter/setter accumulated with `+=`

**Goal:** give an object a field `var adj: Maybe[\T\] := Nothing[\T\]`, a
`getter grad(): T` returning a fresh zero when `adj` is `Nothing`, and a
`setter grad(x: T)`; write `obj.grad += y` twice; the second read returns the
accumulated value.

**ACHIEVED.**

Probe: `w13_gradaccum.fss`.

Decisive output (`w13_gradaccum.out`):

```
initial       : 0.0
after first  += 1.5 : 1.5
after second += 2.25: 3.75
```

Citation: `Specification/basic/expressions/bindings.tex:66-81` (compound
assignment: the first phase invokes the getter, the second the operator, the
third the setter, and the subexpressions are evaluated exactly once);
`Specification/basic/objects.tex:336-345` (a dotted access, not a naked
identifier, invokes the getter/setter);
`Library/FortressLibrary.fsi:829-871` (`Maybe`, `Just`, `Nothing`, `getDefault`).

Interpretation: the getter/setter protocol and compound assignment work exactly
as specified, so the `Nothing`-to-zero adjoint idiom accumulates correctly across
repeated `+=`.

## G14. Trailing varargs of a trait type, with a closure parameter

**Goal:** declare `f(v: RR64, k: RR64 -> (), cs: Node...)` and call it with zero,
one, two and three objects of different types extending `Node`, each also passing
a closure; all four calls run and the varargs arrive as a generator of `Node`.

**ACHIEVED.**

Probe: `w14_varargs.fss` (+ `w14_varargs.attempt1.out`).

Decisive output (`w14_varargs.out`):

```
  arity = 0, is a Generator[Node] = yes
  arity = 1, is a Generator[Node] = yes
  arity = 2, is a Generator[Node] = yes
  arity = 3, is a Generator[Node] = yes
```

with the children printed as `A`, `A B`, `A B C` and the closure firing on every
call (`closure saw 1.0` … `closure saw 4.0`).

Citation: `Specification/basic/functions.tex:74-81` (`Params ::= (Param,)*
Varargs`), `:138-152` (at most one varargs binding, which may not precede a plain
binding) and `:174-186` (a varargs parameter has type `HeapSequence[\T\]`).

Interpretation: trailing varargs over a trait type work at every arity including
zero, arrive as a `Generator` of the declared element type (the runtime class is
`PrimImmutableArray[\Node,0\]`, per `w14_varargs.attempt1.out`), and coexist with
an earlier arrow-typed parameter.

## G15. `opr [_: TrivialOpenRange, c: Range[\ZZ32\]]` called as `q[:, 1#2]`

**Goal:** on a user object with a matrix field, declare that subscript operator
and call it as `q[:, 1#2]`; the call dispatches and `c.lower` and `|c|` are
readable.

**ACHIEVED.**

Probe: `w15_openrange.fss`.

Decisive output (`w15_openrange.out`):

```
q[:, 1#2] = column slice: lower = 1 width = 2
```

Citation: `Specification/advanced/subscripting.tex:12-38` (a subscripting
operator method declaration may have any number of value parameters);
`Specification/basic/expressions/ranges.tex:17-21, 76-95` (the implicit range `:`);
`Library/FortressLibrary.fsi:2148-2153` (`CompactFullRange` supplies `lower` and
`opr |self|`), `:2195-2196` (`opr :(): TrivialOpenRange`).

Interpretation: mixed open-range/range subscripts are declarable and dispatch on
a user object, and the walk interpreter's dynamic method lookup makes
`c.lower` readable even though the *declared* parameter type `Range[\ZZ32\]` does
not itself provide `lower`.

## G16. Two shadowings

**Goal:** declare a top-level `epsilon: RR64 = 10.0^(-5)` and an object with a
field named `epsilon`; and separately a top-level function `rows(x)` and a
function whose parameter is named `rows`; report which the interpreter accepts.

**ACHIEVED** (the goal is to report); the field shadowing is accepted, the
parameter shadowing is rejected.

Probes: `w16_shadow_field.fss`, `w16_shadow_param.fss`.

Decisive output (`w16_shadow_field.out`):

```
top-level epsilon = 1.0E-5
field epsilon = 0.25
```

Decisive output (`w16_shadow_param.out`):

```
/home/user/fortress/explorations/run-b/probes/worker/w16_shadow_param.fss:9:7-9:
    Variable rows is already declared.
```

Citation: `Specification/basic/declarations.tex:476-533` — a declaration shadows
another only in the enumerated cases, the first of which is "The first
declaration is a field or dotted method declaration in a trait declaration,
object declaration or object expression contained strictly within the reach of
the second declaration"; `:533` "No other shadowing is permitted in a Fortress
program."

Interpretation: the implementation follows the spec exactly — an object field may
shadow a top-level name, a parameter may not shadow a top-level function, and the
diagnostic (`Variable rows is already declared.`) is the "no other shadowing"
clause enforced.

## G17. `BIG UNION` with both `Set.{...}` and `Map.{...}` imported

**Goal:** import both `Set.{...}` and `Map.{...}` into one component and evaluate
`BIG UNION[\String, RR64\][k <- keys] {[\String, RR64\] k |-> 1.0 }`.

**NOT ACHIEVED** with two plain on-demand imports; achieved with one
`except` clause or one selective import.

Probes: `w17_bigunion.fss`, `w17_bigunion_except.fss`, `w17_bigunion_sel.fss`.

Decisive output (`w17_bigunion.out`):

```
Overloading of BIG CUP[\Key,Val\]():Comprehension[...]/Library/Map.fss:197 and
BIG CUP[\R extends StandardTotalOrder[\R\]\]():BigReduction[...]/Library/Set.fss:115
fails because their parameter lists have the same types
```

Both workarounds evaluate and print the three keys
(`w17_bigunion_except.out` with `import Set.{...} except { opr BIG CUP }`, and
`w17_bigunion_sel.out` with `import Set.{Set}`):

```
|m| = 3
  a -> 1.0
  b -> 1.0
  c -> 1.0
```

Citation: `Specification/basic/overloading.tex:99-105` ("it is an error for their
static parameters to differ (up to alpha-equivalence) ... static parameters do not
enter into the determination of which declarations are applicable");
`Specification/basic/components/source-code.tex:234-252` (the `except` clause);
`Library/Set.fsi:59-60`, `Library/Map.fsi:108-110`.

Interpretation: because the nullary registration form of a big operator carries
its whole signature in *static* parameters, which the spec explicitly excludes
from overloading resolution, `Set`'s and `Map`'s `BIG UNION` collide on import,
and the only way to use either is to keep the other out of the namespace.

## G18. Prefix operator inside a juxtaposition

**Goal:** apply a prefix operator inside a juxtaposition, `"text " SQRT(d)` and
`a SQRT(b) c` (as in `std SQRT(-2 log u) cos(2 pi u2)`); find the spellings that
parse.

**ACHIEVED** (the goal is to find them).

Probes: `w18_a.fss` … `w18_g.fss`.

Decisive output, one line per spelling:

* `"text " SQRT(d)` — `w18_a.out`: `w18_a.fss:15:25:` / `Syntax Error`
* `a SQRT(b) c` — `w18_b.out`: `w18_b.fss:15:15:` / `Syntax Error`
* `std SQRT(-2.0 log u) cosine(2.0 3.14159 u2)` — `w18_c.out`:
  `w18_c.fss:15:17:` / `Syntax Error`
* `"text " (SQRT d)` — `w18_d.out`: `text 3.0`
* `a (SQRT b) c` — `w18_e.out`: `a (SQRT b) c = 24.0`
* `"text " (SQRT(d))` — `w18_f.out`: `text 3.0`
* outside a juxtaposition — `w18_g.out`: `SQRT(d) = 3.0 ; SQRT d = 3.0`

Citation: `Specification/basic/operators/juxtameaning.tex:145-178` (a tight
juxtaposition without dots is a front expression plus math items; "It is a static
error if either the argument is not parenthesized, or the argument is immediately
followed by a non-expression element");
`Specification/basic/operators/opr-fixity.tex:34-45`.

Interpretation: a prefix operator application is legal on its own in either
spelling, but inside a juxtaposition it must itself be parenthesized —
`(SQRT d)` or `(SQRT(d))` — because the bare operator token in the middle of a
juxtaposition is a non-expression element the reassociation procedure cannot
place.

## Summary

**Achieved (12):** G1 (postfix `^T` on both shapes, via `Rank1`/`Rank2`
exclusion), G6 (pi, via `Constants`), G7 (two subscript methods, with
`Generator[\ZZ32\]` for one), G8 (which line-spanning `||` arrangements parse),
G9 (what `===` returns for value objects), G10 (what `requires` and `property`
do), G12 (nullary big-operator replacement plus a prefix `SUM`), G13
(`obj.grad += y` accumulation), G14 (trait varargs at arities 0-3), G15
(`q[:, 1#2]`), G16 (which shadowing is accepted), G18 (which juxtaposed prefix
spellings parse).

**Not achieved (6):** G2 (matrix pasting `[ A B ]` / `[ A ; B ]` fails; the
vector paste binds nothing under `Array[\RR64,ZZ32\]`), G3 (`x.v^T` is a syntax
error; `(x.v)^T` works), G4 (`BIG MAX g` is unreachable for a
`Generator[\RR64\]`; works for `Generator[\Number\]`), G5 (a map comprehension
whose values have different shapes dies in `APPCOV`), G11
(`w: Array[\RR64,ZZ32\] = [ 1.0 2.0 ]` silently binds nothing), G17 (`Set.{...}`
and `Map.{...}` together make `BIG UNION` an invalid overloading).
