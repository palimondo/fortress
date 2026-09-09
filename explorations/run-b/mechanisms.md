# Mechanism inventory (quality gate 2)

One pass over the specification's table of contents (`Specification/fortress/fortress.tex`
and the chapters it inputs; the built `.toc` is not in the tree, so the list was
derived from the `\chapter`/`\section` commands of the TeX sources). For each
mechanism: where it is specified, whether this run's design uses it, and if not,
why -- decided against this list, not against what came to mind first. Marks:
USED · CONSIDERED (tried or weighed, not adopted, reason given) · UNAVAILABLE
(the tree does not implement it; ledger row or probe cited) · N/A (no bearing on
this program). The un-mainstream mechanisms are flagged ★.

| # | mechanism | spec | mark | this run |
|---|---|---|---|---|
| 1 | components and APIs, `import ... except` ★ | basic/components/source-code.tex | USED | `import FortressLibrary.{...} except { opr BIG + }` frees Σ for a user reduction (ledger row 41). A separate API for the core was CONSIDERED and not built: the check driver needs the parameter nodes' `grad` fields and every operator; the composed component (tools/build.py) keeps the core free of plumbing (the blinded run's route; ledger row 83 is not involved). |
| 2 | cross-component overloading ★ | basic/components/source-code.tex | N/A | one component per run. |
| 3 | where-clauses ★ | basic/trait-parameters.tex, Where Clauses | UNAVAILABLE for covariance (ledger row 17); not needed here. |
| 4 | functional methods ★ | basic/functions.tex; ledger rows 30-32 | USED | `dom(m)`, and every carrier operator is a top-level `opr` visible in this component; the library-visible `+` on the carriers (needed by the `Any` reduction's `join`) works because dispatch is on the dynamic types (ledger rows 30-31 govern *library generic code* calling a user `opr`; the reduction here is the user's own object, not the library's). |
| 5 | coercion ★ | basic/conversions-coercions.tex | UNAVAILABLE (ledger row 19) | would remove the `num`/`vec`/`mat` lifts of constants and the `(child, map)` plumbing; noted in the departures table. |
| 6 | `value` objects ★ | basic/objects.tex, Value Objects | CONSIDERED | accepted by the interpreter (probes/c06, `===` compares fields); the graph nodes cannot be value objects because reverse mode accumulates adjoints per node (a `var`), and the array values they hold are the library's mutable arrays. The parameter record `Params` and the scalar/vector/matrix *values* are immutable in use. |
| 7 | `comprises` sealing ★ | basic/traits.tex:231-235 | CONSIDERED | not needed: the three carriers are unrelated objects; `Node` is open. |
| 8 | dimensions and units ★ | basic/dimensions.tex; advanced/defining-dimensions.tex | UNAVAILABLE (ledger row 26) | a `dim` for probabilities or embedding width was the one use; N/A. |
| 9 | tests and properties ★ | basic/tests.tex | UNAVAILABLE for `property` (probes/c07: `Not yet implemented: PropertyDecl`); the `test` modifier runs only under `fortress test`; contracts (below) are the substitute. |
| 10 | function contracts (`requires`/`ensures`) ★ | basic/functions.tex, Function Contracts | USED-ABLE (probes/c07: `requires` raises `CallerViolation`) | not placed in the core: a shape contract on every operator would be the right use, but each contract adds a line the rendered pair does not have in the paper; noted as an option. |
| 11 | generators and reductions ★ | basic/expressions/reductions.tex; advanced/parallelism-locality/defining-generators.tex | USED | `Mat` is a `Generator` of its row nodes (`x <- X`), `Vec` of its elements (`BIG MAX[z_i <- z] z_i`); Σ over positions is the user reduction; `stack(<| f(x) | x <- X |>)` lifts a vector function to rows. |
| 12 | big-operator declarations | advanced/subscripting.tex, Big Operator Declarations | USED | `opr SUM(): BigReduction[\Any,Any\]` (one nullary per program, ledger rows 39-40) plus a prefix `opr SUM(x: Vec): Num` node op (probes/c13). `BIG ||` for heads was CONSIDERED and dropped: Fortify sets `BIG ||` literally (probes and the blinded run's figure), while `concat` is the paper's own word. |
| 13 | reduction variables (`acc += e` in a parallel `for`) | basic/evaluation/reduction.tex | UNAVAILABLE (ledger row 59) | accumulations in backward maps are sequential `do` blocks. |
| 14 | `also do` (parallel blocks) | basic/expressions/also.tex | CONSIDERED | the two accumulations of a binary op's backward map could run `also`; two closures may target the same node (`X X^T`), so they stay sequential. |
| 15 | `atomic` | basic/expressions/atomic.tex | USED | the node id counter. |
| 16 | `spawn` | basic/expressions/spawn.tex | N/A | |
| 17 | tuple / argument parallelism | basic/expressions/tuple-expr.tex:23; operator-app.tex:59 | USED implicitly | `(Q, K, V) = (X W_q^T, X W_k^T, X W_v^T)`; the 4-thread check confirms parallel safety. |
| 18 | matrix unpasting ★ | basic/matrix-unpasting.tex | UNAVAILABLE ("not yet implemented", probes/c02) | would have split Q into heads: `[Q_1 Q_2 Q_3 Q_4] = Q`. |
| 19 | array pasting `[ A B ]` ★ | basic/expressions/aggregate.tex:175-188 | UNAVAILABLE at runtime sizes (probes/c02b-f) | would have concatenated heads; `concat` instead. |
| 20 | array comprehensions | basic/expressions/comprehensions.tex | UNAVAILABLE (ledger row 50) | `array[\RR64\](n, m).fill(fn (i, j) => ...)` instead. |
| 21 | list, set, map comprehensions | basic/expressions/comprehensions.tex | USED | rows, heads, names; the map comprehension fails on matrices of different shapes (probes/c18). |
| 22 | operator parameters (`opr OP` static params) ★ | basic/trait-parameters.tex, Operator Parameters | CONSIDERED | a reduction generic in its operator; the interpreter reports `Operator OP is not defined` for the natural spelling (probes/c08), and the spec requires the trait to declare a method for OP; not pursued. |
| 23 | `nat` static parameters, `T[n]`, `T^n` types | basic/trait-parameters.tex | CONSIDERED | shape-typed carriers were rejected: sizes are runtime here (ledger rows 23-25, 57). |
| 24 | type aliases | basic/types-vals-vars.tex, Type Aliases | UNAVAILABLE (ledger row 18) | `Array[\RR64,(ZZ32,ZZ32)\]` is spelled out in the plumbing; the carriers `Num`/`Vec`/`Mat` are the named spaces of the model. |
| 25 | getters and setters, abstract fields | basic/objects.tex; basic/traits.tex | USED | the lazily allocated adjoint (`getter grad`/`setter grad` over a `Maybe`), `+=` through the setter (probes/c14). |
| 26 | object expressions | basic/expressions/object.tex | CONSIDERED | an expression-tree engine (one object per operation with a `backprop` method) was sketched and not built: each object would repeat the adjoint field, and the closure form renders the same equations. |
| 27 | varargs functions | basic/functions.tex | USED | `vec(a, f, children...)` (objects may not: ledger row 11). |
| 28 | keyword parameters with defaults | basic/functions.tex | UNAVAILABLE (interpreter, microgpt2's note) | `Adam(beta1, beta2, epsilon)` takes them positionally. |
| 29 | extremum expressions (`case most`) | basic/expressions/case.tex | CONSIDERED | for the softmax max; `BIG MAX` is the paper's `max`. |
| 30 | `typecase`, `label`/`exit`, `while` | basic/expressions | USED | `label done` in the sampler. |
| 31 | juxtaposition as multiplication, precedence groups | basic/operators/juxtameaning.tex, precedence.tex | USED | `A B`, `c g`, `X W^T`. |
| 32 | postfix `^T`, enclosing `|x|`, `||x||`, `‖` | basic/operators/opr-overview.tex | USED | `^T` declared on the carriers (ledger row 34); `|X|` as the number of rows. |
| 33 | chained and multifix operators | basic/operators/chained-multifix.tex | N/A | (ledger row 29). |
| 34 | static expressions | basic/expressions/constant.tex | N/A | |
| 35 | intersection and union types | basic/types-vals-vars.tex:534-547 | UNAVAILABLE by design ("cannot be expressed directly in programs") | relevant to the Meet Rule below. |
| 36 | overloading: Subtype, Incompatibility and Meet rules ★ | advanced/overloading.tex | USED (as a constraint) | two overloads on unrelated, non-excluding types are rejected ("no excluding pair is present", probes/c09, c10, c15): `^T` on both library array ranks, `Node` next to `List[\Node\]`, `Range` next to `Generator`. The carriers are disjoint objects for this reason. |
| 37 | `excludes` | basic/traits.tex | CONSIDERED | would license `^T` on `AnyVector` and `AnyMatrix`; both are library traits and are not to be edited. |
| 38 | `Maybe`, `if x <- m then` binding | library | USED | the adjoint cell, `indexOf`. |
| 39 | `Map`, `Set`, `List` libraries | library/optional-libraries.tex | USED | `Params` is a `Map` (the reference's `state_dict`); `Set[\ZZ32\]` in the topological sort. |
| 40 | `Sparse`, `Heap`, `SkipList`, `PureList` | library | N/A | |
| 41 | distributions, regions, `at` ★ | advanced/parallelism-locality | UNAVAILABLE / N/A | |
| 42 | memory model, `atomic` discipline | basic/memory-model.tex | USED | adjoint accumulation runs in one thread per node in topological order; the id counter is `atomic`. |
| 43 | rendering rules (Fortify) | basic/lexical-structure.tex, Rendering; appendices/rendering.tex | USED | names chosen for the rendering: `beta1`, `eta`, `epsilon`, `theta`, `m_hat`, `W_q`, `d_k`, `n_head`. |
| 44 | ASCII to Unicode conversion | appendices/ascii-to-unicode.tex | USED | `SUM`, `DOT`, `ODOT`, `^T`, `<-`, `|>`. |
| 45 | domain-specific syntax ★ | advanced/domain-specific-languages.tex | N/A | |
| 46 | numerals (no exponent form) | basic/lexical-structure.tex:1099 | USED | `10.0^(-5)`, `10.0^(-8)` (ledger row 16). |
