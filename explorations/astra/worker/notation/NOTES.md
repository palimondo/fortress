# Notation investigation

## Candidate forms

1. `NotationDualSum.fss`: component-local overload of ordinary `SUM`, backed
   by a `CommutativeMonoidReduction[D]`.  Intended surface form is the canonical
   reduction expression `SUM[i <- ...] body`, rendered by Fortify as ∑ with
   generator clauses stacked underneath.
2. `NotationGenericSum.fss`: algebraically generic named `sum` over
   `AdditiveGroup[T]`.  This avoids the library's `Number` restriction but loses
   the canonical big-operator surface form and requires an explicit sample to
   obtain `zero`.
3. `NotationNumberBound.fss`: negative probe for using the shipped
   `Vector[T,n]` with a graph-building scalar that is not a `Number`.
4. `NotationDualSumGenerator.fss`: a one-argument component-local `SUM` overload
   for `Generator[D]`, used as `SUM <| D(...) | i <- ... |>`.

## Source and specification evidence

- `Specification/basic/expressions/reductions.tex:23-52` says a reduction
  expression begins with a big operator, corresponds to a call to its operator
  declaration, and combines generated body values with that declaration's
  reduction.  It explicitly says there is no required relationship between
  `BIG Op` and the infix `Op`.  This supports a user-level reduction definition;
  `SUM` is not intrinsically tied to primitive scalar addition by the syntax.
- `ProjectFortress/src/com/sun/fortress/parser/Expression.rats:685-707` parses
  `SUM` as an accumulator.  With generator clauses it builds an `Accumulator`;
  without clauses it builds an ordinary operator application.
- `ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreTypeCheckDesugaringVisitor.java:351-405`
  rewrites an accumulator using an operator expression for the parsed
  accumulator and `__bigOperator`.  It does not hard-code numeric addition at
  this stage.
- `Library/FortressLibrary.fss:2835-2983` defines reductions,
  `CommutativeMonoidReduction`, `BigOperator`, and `Comprehension` as ordinary
  library traits/objects.  `Library/FortressLibrary.fss:1114-1121` shows
  `__bigOperatorSugar` delegates to `__bigOperator`; lines 3041-3045 define the
  shipped numeric `SUM` with exactly this machinery.
- The shipped numeric overload is nevertheless restricted:
  `Library/FortressLibrary.fsi:1820-1822` accepts only `T extends Number` and
  returns `Number`.
- `Library/FortressLibrary.fsi:273-334` declares `Number comprises { RR64 }`
  and declares its addition, multiplication, division, square root, and other
  arithmetic results as `RR64`.  `Specification/basic/traits.tex:231-239`
  states that, absent an API ellipsis, the listed types are exactly the traits
  that immediately extend the comprising trait.  Treating an AD graph node as
  `Number` is therefore not an open algebraic extension point in the specified
  hierarchy; its result signatures would also erase graph construction.
- `Library/FortressLibrary.fss:2189-2281` and `2497-2653` constrain shipped
  `Vector` and `Matrix` elements to `Number`.  Their mathematical structure is
  valuable evidence: `Vector.dot` and matrix-vector `rmul`/`lmul` themselves use
  ordinary `SUM` reduction expressions.  A user-level AD-compatible vector can
  preserve that notation without inheriting the closed numeric hierarchy.

## Classification pending bounded runs

The specification and desugaring support user-defined big reductions, but the
historical implementation rejects the zero-argument local `SUM()` in
`NotationDualSum.fss`: it reports that it and the prelude's zero-argument
`SUM[T extends Number]()` have value parameter lists of the same type.  This is
an overload/implementation limit for the desired generator-clause spelling.

The materially different one-argument overload works: bounded execution of
`NotationDualSumGenerator.fss` printed value `10.0` and derivative `4.0`.
`NotationGenericSum.fss` produced the same result.  Evidence:

- `experiment/evidence/20260907T055823.426904Z-notation-dual-sum/`
- `experiment/evidence/20260907T055856.947811Z-notation-dual-sum-generator/`
- `experiment/evidence/20260907T055910.159333Z-notation-generic-sum/`

The interpreter unexpectedly accepted `Vector[D,2]` construction and printed
`[0#2][ D D ]`, despite the declared `T extends Number` bound.  This does not
make `D` a usable `Number`: the built-in `SUM` likewise passes typechecking on
`D` but fails at runtime with `CastError` at the library `cast[Number]` in its
comprehension body.  Classify this as missing/unsound bound enforcement in the
historical implementation, not as support for an open numeric abstraction.
Evidence:

- `experiment/evidence/20260907T055922.439724Z-notation-number-bound/`
- `experiment/evidence/20260907T055953.298778Z-notation-builtin-sum-d/`

Render the executable candidates with Fortify before selecting article notation.

## Resumed 2026-09-07: ordinary SUM solved

The earlier overload failure is avoidable using the canonical big-operator name
in the import exclusion:

```fortress
import FortressLibrary.{...} except { opr BIG + }
```

`NotationExceptSum.fss` defines a local zero-argument `opr SUM()` with an AD
`Comprehension` and executes `SUM[i <- 1#4] D(1.0 i, 1.0)`, printing `10.0`
and `4.0`. Excluding `{ opr SUM }` or `{ SUM }` instead is a parser error.
The accepted canonical spelling resolves the imported zero-argument collision.
This is a successful user-library definition of ordinary AD-compatible sum,
not a numeric-hierarchy extension or interpreter-bound-enforcement loophole.
The ordinary SUM is now local to D; numeric reductions should use explicit
separate helpers/operators where needed.

Actual Fortify PNG `render-except/NotationExceptSum.png` was viewed by eye:
it shows a proper summation glyph with generator clauses stacked below.
`except-run.log` stores the successful execution output. The full original
source is the reproducible artifact, and rendering used the unmodified helper
`experiment/render.py` with `env.sh` and `render-env.sh` sourced.

Two other successful alternatives were executed/rendered and viewed by eye:
- `NotationNamedSum.fss` uses `opr BIG DSUM()` and `BIG DSUM[i <- ...]`.
  Fortify shows upright DSUM with bounds below, not a summation glyph.
- `NotationDualSumGenerator.fss` uses a one-argument SUM overload on a
  generator. Fortify shows a summation glyph but an angle-bracket generator
  to the right, not bounds below. This is now an unnecessary fallback.

Numeric maximum is directly available as:

```fortress
m:RR64 = BIG MAXNUM[i <- 1#4] (1.0 i)
```

This prints `4.0` in `NotationNamedSum.fss`. Its definition is shipped in
`Library/FortressLibrary.fss:3144-3149`, implemented using a `BigReduction`
with `MapReduceReduction[RR64]`, binary MAXNUM, and NaN as empty value.
`render-named/NotationNamedSum.png` was viewed by eye and displays MAXNUM
with the generator stacked underneath. This avoids an explicit map/reduce
spelling in a numerical model's max-shift computation.

## Vector DOT follow-up

`NotationDot.fss` declares `opr DOT(x:Vec,y:Vec):D`, with a two-entry dual
vector. `q:D = x DOT x` runs and returns value 25.0 and derivative 6.0
for x = (D(3,1),D(4,0)); numeric `SQRT(q.v / 2.0)` prints
3.5355339059327378. `dot-run.log` stores output. Actual Fortify
`render-dot/NotationDot.png` inspected BY EYE: `x DOT x` renders central-dot
`x · x`, and SQRT renders radical correctly. This keeps vector inner product
visibly distinct from matrix-vector/scalar juxtaposition. Main's general
implementation can use local AD SUM over component products; probe uses
explicit two-entry expansion solely to isolate operator resolution/rendering.
No norm-delimiter alternative was necessary after DOT succeeded.
