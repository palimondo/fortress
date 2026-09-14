<!-- Run B2, gate 2 of experiment/RUN_B_BRIEF.md (branch claude/worker-brief-fable-vnnuv8): one pass over Specification/fortress/fortress.toc before any representation is chosen. Ledger rows are explorations/fortress-gap-ledger.md. Written 2026-09-09 by the coordinating session. -->

# Mechanism inventory for the matrix-level microGPT

This is the checklist the design is argued against. Each row names a mechanism the specification's table of contents lists, the design decision it bears on, and what is known about it in this tree: a ledger row number, a probe in another exploration, or "unprobed", which means a gate-1 worker settles it before the design may depend on a negative. Mechanisms the mainstream port would not think of are marked ★.

The decisions the inventory has to feed, in the order the program needs them:

D1. The autodiff shape: how the graph hangs on the computation (tape of closures, expression tree, functional backprop with linear maps).

D2. The carrier: the library's `Matrix`/`Vector`, the runtime-sized `array` factory, or a thin user object around either.

D3. Shapes: static `nat` parameters versus runtime `ZZ32` extents (the sequence length varies per document).

D4. Heads: how `Concat(head_1, …, head_h)` and the per-head projections are spelled.

D5. Reductions inside operations (softmax rows, RMSNorm, the mean loss) and across the graph (gradient accumulation at fan-out).

D6. Parameters and their gradients: where θ lives, how ∇θL is delivered, how Adam maps over it.

D7. Verification without plumbing in the core.

D8. The typeset form: which names, decorations and operators Fortify renders as the papers write them.

## Chapter 2 and chapter 22: components, APIs, imports

| TOC | mechanism | bears on | known |
|---|---|---|---|
| 2.2, 22.2.1 | `import Component.{...}` of a user component in the same directory | D7: the data fixture and the checks live in components the core never imports | POSITIVE: the blinded run imports `MicroGPTData` (`explorations/blinded-fable/src/`) |
| 2.2, 22.2.1 ★ | `except { opr BIG + }` on the library import, then a user redeclaration of `SUM` | D5: Σ over a user type | rows 41, 42 (only `opr BIG +` works; `except { opr SUM }` is a syntax error) |
| 22.2.2 | `export Executable` and `run()` | entry point | in every prior program |
| 22.2.3 ★ | cross-component overloading | D2: a user carrier's operators seen from library generic code | row 30 (top-level `opr` is component-scoped) and row 31 (a functional method crosses) |
| 2.3, 22.3 | APIs generated from components (`fortress api`) | not needed on the interpreter path | untried in this arc |

## Chapter 4 and appendix D: lexical structure and rendering

| TOC | mechanism | bears on | known |
|---|---|---|---|
| 4.15, D.1 | leading underscore renders bold: `_W` → **W** | D8: weight matrices in the papers' bold | row 66, `microgpt2.fss` uses it throughout |
| 4.15, D.1 ★ | `x_bar` → x̄, `x_hat` → x̂, `x_vec`, `x_dot`, primes (`rendering.tex:204-215`) | D8: the cotangent of A as `A_bar`, Adam's m̂ and v̂ as `m_hat`, `v_hat` | rendering rule verified in the spec text; render unprobed |
| 4.15, D.1 | one letter plus digits → italic letter with roman subscript (`w17`), but a capital plus digits is a type name (`W1` → roman) | D8: `W1`, `W2` of the MLP cannot carry numeric subscripts; `_w1`, `_w2` can (rule g) | rows 15, 66 |
| 4.8, 4.15 | reserved words (`value`, `at`, `type`, `of`), all-capital words are operators (`BOS`, `GPT`) | naming | rows 7, 8 |
| 4.13 | numerals: no `1e-5`; `10.0^(-5)` works | Adam's ε | rows 14, 16 |
| 4.14, E.2 | ASCII spellings of operators: `SQRT`, `DOT`, `TIMES`, `SUM`, `BIG`, `<-`, `^T` | D8: what is typed beside every render | row 5 (Unicode `∑` is not an accumulator), row 65 |
| 4.17.4, D.2 | Fortify sets a tight `/` as a stacked fraction | D8: `q DOT k / SQRT d` reads as the papers' fraction | reviews §A (Astra's two wins) |
| D.1 | `x_h[t]` is a LaTeX double subscript | D8: per-head names | row 62 |

## Chapters 5, 13.23, 13.24, 21, 23: evaluation, parallelism, memory model

| TOC | mechanism | bears on | known |
|---|---|---|---|
| 2.8, 13.15 | `for` is parallel by default; `seq(g)` serializes | D5, D6: the Adam sweep is an unordered `for`; the training loop is `seq` | prior programs |
| 5.4.1 ★ | reduction variables (`acc += e` inside a parallel `for`) | D5 | row 59: not implemented; bare accumulation silently loses updates at >1 thread |
| 13.23 | `atomic do … end` | D5: correct accumulation in a mutable design | row 59 |
| 13.24 | `spawn` | not needed | row 61 |
| 21.2.1 ★ | the spec's own immutability discipline | D1: the design decision asks for immutable data as far as the mathematics allows | spec text |
| 23.8 ★ | generators, `__generate`, and how comprehensions and big operators desugar | D5: user reductions over vectors and matrices | rows 46, 47, 60 |
| 23.6 | distributions | not needed at this size | untried |

## Chapters 6, 12, 20: types and static parameters

| TOC | mechanism | bears on | known |
|---|---|---|---|
| 6.11 ★ | `type Mat = …` aliases | D2: naming `Array[\RR64,(ZZ32,ZZ32)\]` once | row 18: unimplemented |
| 6.5, 6.6 | tuple and arrow types; closures capturing vectors | D1: a value paired with a backward closure or a linear map | matrix-ad-probes Q3 (`p08`, `p09`) |
| 12.2, 12.6 | `nat` parameters and where-clauses | D3: static shapes | rows 17, 23, 25, 83 |
| 12.5 ★ | operator parameters (`opr` as a static parameter) | D5: one reduction generic over the operator | untried in this arc |
| 13.31, 13.32 | type ascription and assumption | spelling static arguments where inference fails | row 20, 21 |
| 20 | type inference: static arguments on generic methods are not inferred; list literals need an element static argument | spelling | rows 20, 21, matrix-ad-probes Q1 |

## Chapters 10, 11: traits, objects, value objects

| TOC | mechanism | bears on | known |
|---|---|---|---|
| 10.5, 11.3 ★ | `value object` and value traits | D1, D2: an immutable carrier and an immutable handle | unprobed in this arc: gate-1 probe (does the walk interpreter accept `value object` and forbid `var` fields in it?) |
| 10.1 | `comprises`, `excludes` | D2: both juxtaposition directions under the Meet Rule | rows 22, 33 |
| 10.2 ★ | functional methods (`opr +(self, o)` inside the object) | D2: operators that library generic code can see | row 31 |
| 10.3 | abstract fields, getters | carrier fields | prior programs |
| 11.1 | object declarations with constructor parameters; no varargs | D4: head lists via a factory | row 11 |
| 13.9 ★ | object expressions (anonymous objects) | D1: a node that carries its own backward as an anonymous object instead of a closure | untried |
| 29.1 | `AdditiveGroup`, `MultiplicativeRing`, `StandardMax` as trait mix-ins | D2: `-`, unary `-`, `zero`, juxtaposition, `MAX` inherited | rows 36, 43 |
| 40 ★ | the algebraic-constraints library (`Monoid`, `Ring`, `Field`) | D5 | row 37: does not ship; the three traits above are what exists |

## Chapters 8, 13.29, 13.30: matrices as aggregates

| TOC | mechanism | bears on | known |
|---|---|---|---|
| 13.29.4 | array literals `[ a b ; c d ]`, element type from the declared LHS | D2 | rows 12, 49 |
| 13.29.4 ★ | array pasting: juxtaposed arrays inside `[ … ]` paste along rows and columns | D4: `Concat(head_1, …, head_h)` as pasting `[ h1 h2 h3 h4 ]` | unprobed: gate-1 probe |
| 8.3 ★ | matrix unpasting: `[ A B ] = M` splits a matrix into named blocks | D4: the per-head split of Q, K, V without views | unprobed: gate-1 probe |
| 13.30 | comprehensions, multi-generator, natural order | D4, D5 | row 48; array comprehensions are dead (row 50) |
| 29.1 | `array[\T\](n, m)` and the fill/map/ivmap/t methods on `Array2` | D2, D3: runtime-sized matrices with the full algebra | row 57, matrix-ad-probes Q2 |
| 29.1 | slices and views (`m[i,:]`, `m[:,j]`, `m[(a,b)#(c,d)]`) | D4 | rows 54, 55, 56: views lose the algebra unless re-wrapped |
| 29.1 | the diagonal factory `matrix[\T,n,m\](v)` | avoided | row 51 (bug) |

## Chapters 13.17, 13.18, 16.7, 25.10: reductions and big operators

| TOC | mechanism | bears on | known |
|---|---|---|---|
| 13.17 | `SUM[i <- g] e`, `PROD`, `BIG MAX` | D5: Σ inside softmax, RMSNorm, the loss | rows 39-46; `SUM` rejects vectors (row 44) |
| 25.10 ★ | user `opr BIG OP` declarations | D5: a user reduction behind Σ or behind concatenation | rows 39, 40, 41, 46 |
| 13.18 ★ | parallel prefix and suffix | not needed by this model | untried |
| 13.21 | `MAX`/`MIN` extremum expressions | softmax's stabilizing shift | row 43 |

## Chapters 9, 15, 16, 24, 25: functions, overloading, operators

| TOC | mechanism | bears on | known |
|---|---|---|---|
| 9.1, 13.6 | juxtaposition application `f x` | D8: `softmax S` without parentheses | prior programs |
| 9.4 ★ | function contracts `requires` / `ensures` | D7: shape contracts on the operations, outside the definitions' bodies | unprobed: gate-1 probe (does the interpreter check them?) |
| 2.6.2 | keyword parameters | Adam's hyperparameters | untried |
| 15, 24 | overloading by parameter type; the Meet Rule | D2: `M N`, `M v`, `s M` coexisting | rows 33, 36 |
| 16.8 ★ | juxtaposition as multiplication: `opr juxtaposition` | D8: `Q K^T` typed as `Q K^T` | prior programs, row 33 |
| 16.9.5, 25.4 ★ | superscript and postfix operators: `opr (m: Mat)^T` | D8 | rows 34, 64 |
| 16.5, 25.6 ★ | enclosing operators: `‖x‖`, `⌈x⌉`, `\|x\|` | D8: the norm in RMSNorm | row 35 (library ships none); user declaration untried for matrices |
| 25.7 | subscripting operator methods `opr[i]` | D2: `M[i,j]` on a user carrier | prior programs |
| 16.9.7, D.2 | `/` renders as a fraction when tight | D8 | reviews §A |
| 17 ★ | coercion declarations | D2: an `RR64` scalar where a `Mat` is expected | row 19: parsed and ignored |

## Chapter 19: tests and properties

| TOC | mechanism | bears on | known |
|---|---|---|---|
| 19.2, 19.6 ★ | `test` and `property` declarations, `fortress test` | D7: the golden check as tests beside the core, not in it | unprobed: gate-1 probe |

## Chapters 18, 26, 27: dimensions, units, syntax extension

| TOC | mechanism | bears on | known |
|---|---|---|---|
| 18, 26 ★ | dimensions and units | not usable | rows 26, 27: nothing evaluates |
| 27 ★ | domain-specific syntax (`grammar`) | not used: the mission is the language's own notation | untried |

## Chapters 29, 30: the library

| TOC | mechanism | bears on | known |
|---|---|---|---|
| 29.1 | `RR64`: `exp`, `log`, `SQRT`, `^` | elementwise operations | prior programs |
| 30.2 | `List`: literals need an element static argument; `xs[i][j]` misparses | D4: lists of heads | row 1, matrix-ad-probes Q1 |
| 30.6 ★ | `Map` with `union(f, other)` combining values under a key | D6: a gradient environment summed at fan-out, θ as a map | `Library/Map.fsi:66`; untried in this arc |
| 30.3 | `PureList` | immutable sequences | untried |
| 30.4 | `File` | data loading | prior programs |
| 29.1 | `nanoTime()` | timing only | row 75 |

## What the inventory says before any skeleton is written

1. The un-mainstream mechanisms that could change the program's face, and that no prior run used, are five: value objects (D1, D2), matrix pasting and unpasting for the heads (D4), `Map.union` with a combining function for a pure gradient environment (D6), tests and properties for verification outside the core (D7), and function contracts for shapes (D7). All five are unprobed and go to gate-1 workers before the design may assume either way.

2. The mechanisms the design cannot use are settled by ledger rows and need no new probe: type aliases (18), coercions (19), reduction variables (59), dimensions (26), the library `SUM` over anything but `Number` (44), views with algebra (54), `nat` shapes at runtime extent (23, 25).

3. The rendering rules give the papers' decorations without any custom glyph: bold weights by leading underscore, x̄ for cotangents by `_bar`, m̂ and v̂ by `_hat`, `^T` by a postfix operator, Σ by `SUM`, and the fraction by a tight `/`.
