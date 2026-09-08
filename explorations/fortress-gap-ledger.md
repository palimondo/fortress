<!-- Merged gap ledger. Sources: our own arc (expressiveness-review.md,
     libvector-report.md, matrix-ad-probes/REPORT.md, sum-experiment-report.md,
     aliases-units-report.md, microgpt2-sigma.md, microgpt2-named-spaces.md,
     compiled-path-gaps.md), the blinded run (blinded-fable/notes/gaps.md),
     Astra's run (astra/worker/), and the three reviews. Every row below was
     re-run here; commands and full output in
     explorations/gap-ledger-probes/transcript.txt. Walk interpreter, JDK 25,
     FORTRESS_THREADS=1 unless stated. -->

# Fortress gap ledger

One row per claim. **status** — `POSITIVE-VERIFIED` (works; ran, output recorded) ·
`NEGATIVE-VERIFIED` (spec settles it, reproducer confirms) · `NEGATIVE-BOUNDED`
(failure reproduces; the mechanisms tried are named and are not exhaustive) ·
`CONTESTED` · `RETIRED` (a source claim falsified here; kept so it is not re-derived).
**class** — `implementation gap` · `library gap vs spec` · `library bug` ·
`design limit` · `deliberate` · `typesetter` · `packaging`.
Spec citations are to `Specification/**/*.tex` (line numbers as of this tree;
the chapters cited are byte-identical in `Specification-1.0-frozen/`).
Reproducer paths are relative to `explorations/`; `gNN` means `gap-ledger-probes/gNN.fss`.

## 1. Grammar and lexing

| # | claim | status | class | spec citation | reproducer | found by | notes / workaround |
|---|---|---|---|---|---|---|---|
| 1 | `x[i][j]` is grammatical and left-associative, but the walk interpreter invokes the **first** subscript with an empty argument list (`Failed to find any matching overload, args = ()`) | NEGATIVE-VERIFIED | implementation gap | `appendices/grammars/concrete-syntax.tex:937-953`; `basic/operators/precedence.tex:44-51`; `basic/operators/juxtameaning.tex:164-168` | `g01` | astra, blinded, review | Mechanism, new here: a chained subscript parses as `MathPrimary` (not `SubscriptExpr`); `Evaluator.java:1052` routes it to `evalAndInvokeMethod`, whose `evalInvocationArgs` (`Evaluator.java:1251-1252`) does `exprs.subList(1,…)` — correct for a juxtaposition list, fatal for a subscript list. Workaround `(x[i])[j]`. One-line fix. |
| 2 | the same defect **silently returns the wrong element** when the subscript has more than one index: `m[3,7]^2` evaluates `(m[7])^2` | NEGATIVE-VERIFIED | implementation gap | as row 1 | `g02` | (this merge) | `m[3,7]=1037`, `m[7]=107`; `m[3,7]^2` prints `11449`, not `1075369`. No error, no warning. |
| 3 | `x[i]^2` (subscript then superscript) fails the same way | NEGATIVE-VERIFIED | implementation gap | as row 1; `basic/operators/juxtameaning.tex:150-151` forbids only the reverse order (`x^2[i]`) | `g02` | astra, blinded, review | Workaround `(x[i])^2`. |
| 4 | `f()[i]` (call then subscript) is a **static error by specification**, not an implementation defect | NEGATIVE-VERIFIED | design limit | `basic/operators/juxtameaning.tex:156-162` — "It is a static error if … the argument is immediately followed by a non-expression element" | `g03` | blinded | Interpreter reports that sentence verbatim. Workaround `(f())[i]`. |
| 5 | U+2211 `∑` lexes as a prefix operator, never as an accumulator; only ASCII `SUM` is a big operator | NEGATIVE-VERIFIED | implementation gap | `basic/expressions/reductions.tex:20` (`Accumulator ::= Σ ∣ Π ∣ BIG (Encloser ∣ Op)`) | `sum-probes/p13_unicode_sigma.fss` | ours | `Operator prefix SUM is not defined.` Fortify renders ASCII `SUM` as `Σ`, so the *rendered* form is unaffected. |
| 6 | a reduction is a `FlowExpr`: it cannot be an operand of an infix operator without parentheses | NEGATIVE-VERIFIED | design limit | `appendices/grammars/concrete-syntax.tex:971-974` | `g07` | ours | `2.0 / SUM[u <- e] u` → `Syntax Error`; `2.0 / (SUM[u <- e] u)` is required. |
| 7 | an all-uppercase word with ≥2 distinct letters (`BOS`, `GPT`) is an **operator word**, not an identifier | NEGATIVE-VERIFIED | design limit | `basic/lexical-structure.tex:1167-1172` | `fable-review-probes/RvwNameKeywords.fss` | blinded | `Operator prefix BOS is not defined.` Rename. |
| 8 | `value`, `at`, `type`, `unit`, `of`, `most` … are reserved words | NEGATIVE-VERIFIED | design limit | `basic/lexical-structure.tex:776-777` + `fortress/fortress-keywords.tex` (86 reserved words) | `g08` | blinded | `value = 3` → `Syntax Error`. |
| 9 | line-final `\|\|` ends a component: the lexer takes it as an encloser, not a continued infix operator | NEGATIVE-BOUNDED | design limit | `basic/lexical-structure.tex:1176-1178` (a run of ≥2 vertical lines is a base operator) | `fable-review-probes/RvwBarEnd.fss` | blinded | `Unmatched delimiter "component"`. Tried: trailing `\|\|` before a newline. Not tried: leading `\|\|` on the continuation line, or a line-continuation marker. |
| 10 | `do … end` **is** allowed as a comprehension body | RETIRED | — | — | `g11` | blinded (claimed the opposite) | `<\|[\ZZ32\] do i + 1 end \| i <- 0#3 \|>` prints `<\|1, 2, 3\|>`. Falsifies half of blinded gap #14; the `\|\|` half (row 9) stands. |
| 11 | objects may not declare varargs constructor parameters | NEGATIVE-VERIFIED | design limit | `basic/objects.tex:66` ("varargs parameters are eliminated"); `fortress/preamble.tex:63` | `fable-review-probes/RvwVarargsObj.fss` | blinded | `Varargs parameters of objects are not allowed.` Use a factory function (varargs *functions* work — `spec-probes/p12_multifix.fss`). |
| 12 | static arguments inside an array literal (`[\T\ …]`) are in the spec grammar but not parsed | NEGATIVE-VERIFIED | implementation gap | `basic/expressions/aggregate.tex:27` | `libvector-probes/p27_literal_staticargs.fss` | ours | `Unmatched delimiters "[\" and "]".` |
| 13 | import aliasing is unusable: the spec's `as` form is a parse error, the implementation's `=>` form parses but binds nothing | NEGATIVE-VERIFIED | implementation gap | `basic/components/source-code.tex:93` (`AliasedSimpleName ::= Id [as Id]`) | `alias-units-probes/p10_import_as.fss`, `p12_import_arrow.fss` | ours | `Missing comma.` / `Seq is undefined.` |

**Precedence verdict (rows 1-4).** Fortress does leave precedence undefined
between some operator families and then demands parentheses
(`basic/operators/precedence.tex:26-32`, the `a + b ∪ c` example), but that rule
does not reach `x[i][j]`, `x[i]^2` or `f()[i]`. Subscripting and superscripting
are one group that `precedence.tex:44-51` explicitly declares left-associative and
higher than every operator below, and `concrete-syntax.tex:937-953` is left-recursive
on `Primary` for both forms; the parser agrees (`Expression.rats:389, 516-543, 627-648`,
and the dumped AST carries both subscripts). So `x[i][j]` and `x[i]^2` are an
**implementation gap**, localised to one argument-list call in the evaluator.
`f()[i]` is the opposite verdict: the grammar admits it, but the spec's own
reassociation procedure (`juxtameaning.tex:156-162`) makes it a static error, and
the interpreter reports that sentence — a **design limit**.

## 2. Numerals and literals

| # | claim | status | class | spec citation | reproducer | found by | notes / workaround |
|---|---|---|---|---|---|---|---|
| 14 | there is no exponent notation in numerals (`1e-5`) | NEGATIVE-VERIFIED | design limit | `basic/lexical-structure.tex:1099-1100` | `g06` | blinded | Error text is the spec's own sentence: `a numeral contains letters and does not have a radix specifier`. |
| 15 | `W_1` is not an identifier: `_1` is read as a radix specifier and radix 1 is a static error | NEGATIVE-VERIFIED | design limit | `basic/lexical-structure.tex:1066-1095` (radix specifier; radix must be 2–16, `:1095`) | `g05` | ours (ledger in the page template) | `Syntax Error`. The spec's spelling for a numeric subscript is `w17` (row 66), not `w_17`. |
| 16 | `10.0^(-5)`, `0.00001`, radix numerals (`7fff_16`), and letter-subscripted names (`W_q`, `w17`) all work | POSITIVE-VERIFIED | — | `basic/lexical-structure.tex:1143` | `g04` | review | `10.0^(-5)` prints `1.0E-5`; neither the blinded run nor Astra tried it, both wrote `0.00001`. |

## 3. Type system and inference

| # | claim | status | class | spec citation | reproducer | found by | notes / workaround |
|---|---|---|---|---|---|---|---|
| 17 | the spec's declaration-site covariance idiom `trait C[\S\] extends C[\T\] where {S extends T}` is rejected: where-clause type variables are not bound in an `extends` clause | NEGATIVE-VERIFIED | implementation gap | `basic/trait-parameters.tex:339-346` | `spec-probes/p16_covar.fss` | ours | `T is undefined.` Root cause of most static-argument ascriptions; `Library/CovariantCollection.fss` is the hand-rolled workaround. |
| 18 | `type` aliases are specified and unimplemented | NEGATIVE-VERIFIED | implementation gap | `basic/types-vals-vars.tex:597-623`; `fortress/preamble.tex:81` | `alias-units-probes/p1_alias_basic.fss` | ours | `** bug! Not yet implemented: TypeAlias`. Expansion is written (`TypeAnalyzer.scala:554`) but unreachable; the hole is `IndexBuilder`. Workaround: a carrier object (a *new* type) or a comment. |
| 19 | coercion declarations parse and are then ignored by both walk and typecheck | NEGATIVE-VERIFIED | implementation gap | `basic/conversions-coercions.tex:152-153` (906-line chapter) | `spec-probes/p15_coertc.fss` | ours | `Unification error: … got arg 3: ZZ32`. `CoercionOracle.scala` exists, unwired. Workaround: a `konst`-style shim plus per-scalar overloads. |
| 20 | an aggregate's element type is computed from the elements' **runtime class**, and `List` is invariant, so `<\|1.0,1.0\|>` is `List[\FloatLiteral\]` and explicit `[\T\]` ascriptions are mandatory in data/plumbing code | NEGATIVE-VERIFIED | implementation gap | `basic/expressions/aggregate.tex` (element type is the union of the element types); `basic/inference.tex` is a 27-line stub | `spec-probes/p2_ascribe.fss` (fails), `p1_infer.fss` (infers when the runtime class *is* the target) | ours, blinded | Same defect shows up as `ArrayList[\__DefaultVector[…]\] is not assignable to List[\Vector[…]\]` (`matrix-ad-probes/REPORT.md` Q1). |
| 21 | static arguments on a generic *method* cannot be inferred (`x.zip(y)` needs `x.zip[\V\](y)`); return types on functions/operators/methods **can** be omitted | NEGATIVE-VERIFIED + POSITIVE-VERIFIED | implementation gap (spec silent) | `basic/inference.tex` (whole chapter is a `\note` stub) | `spec-probes/p8_omit.fss` | ours | The spec never wrote down its inference rules, so this cannot be adjudicated against the spec — the implementation is the only authority. |
| 22 | `comprises` is never checked on the walk path, so the illegal `object Value … extends Number` is accepted and works | NEGATIVE-VERIFIED | implementation gap | `basic/traits.tex:231-235` (comprised traits are *exactly* the immediate subtypes) | `libvector-probes/p10_value_extends_number.fss` | ours, astra | A bug in the user's favour: `TypeHierarchyChecker.scala:206-208` would reject it, but `walk` never calls `setTypeChecking(true)` (`Shell.java:420-424`). |
| 23 | `T[n]` with a `nat` parameter does not unify with a runtime-built array; a literal size does | NEGATIVE-VERIFIED | implementation gap | `basic/trait-parameters.tex:66-94` | `fable-review-probes/RvwNatArray.fss` | blinded | `Cannot unify __DefaultVector[\RR64,3\] with ArrayType`. |
| 24 | `T^n` parses as a type but denotes the `Number`-only library `Vector`/`Matrix` | NEGATIVE-VERIFIED | library gap vs spec | `basic/expressions/aggregate.tex:152-170` | `fable-review-probes/RvwTypePow.fss` | blinded | `Closure/Constructor for f param 1 (a:Matrix [\V\]^(3))`. |
| 25 | a `nat` static argument can never be a value name; `NatReflect.reflect` + one hoisted generic per shape is the sanctioned escape | NEGATIVE-VERIFIED + POSITIVE-VERIFIED | design limit | `basic/trait-parameters.tex:68-95` (a `nat` is a *static* parameter), `:82` | `libvector-probes/p09_runtime_size.fss` (fails), `p22_runtime_sized.fss` (works) | ours | `n is undefined.` — static args resolve in the type namespace. `NatReflect.fss`'s own comment asks for this to be built into the language. |
| 26 | dimensions and units: the type grammar and AST are implemented, nothing evaluates, and the typechecker throws on the declaration | NEGATIVE-VERIFIED | design limit (spec-declared not-yet-supported) + implementation gap | `basic/dimensions.tex:15-17`; `fortress/preamble.tex:79` | `alias-units-probes/q8_dimtype_parse.fss`, `q18_in_operator.fss`, `q16_dimcheck.fss` | ours | `Can't EvalType this node type … TaggedDimType`; `Operator in is not defined.`; typecheck → `java.lang.Error: Not yet implemented: class … DimDecl`. |
| 27 | `dim X` without a `default` unit is unwritable — a null dereference in the error path of an *optional* clause | NEGATIVE-VERIFIED | implementation gap | `advanced/defining-dimensions.tex:23-25, 97-100` | `alias-units-probes/q3_bare_dim.fss` | ours | `null is not a valid unit name.` One line in `OtherDecl.rats:73-78`. |
| 28 | a user object with a `nat` static parameter and dimension-checked `+` works today | POSITIVE-VERIFIED | — | `basic/trait-parameters.tex:66-94` | `spec-probes/p9_natvec.fss` | ours | `r[2] = V(12.0)  \|r\| = 3`. The spec-shaped destination for shape-typed carriers. |

## 4. Overloading and operators

| # | claim | status | class | spec citation | reproducer | found by | notes / workaround |
|---|---|---|---|---|---|---|---|
| 29 | multifix dispatch is absent: the interpreter never looks for an *n*-argument definition, it reassociates to binary | NEGATIVE-VERIFIED | implementation gap | `basic/operators/chained-multifix.tex:42-48`; `fortress/preamble.tex:59` | `spec-probes/p13_multifix2.fss` | ours | `a OTIMES b OTIMES c = V(24.0, n=2)` — right value, 2 children, i.e. two binary calls. Workaround: a reduction over a concatenation monoid. |
| 30 | a **top-level** `opr` declaration is component-scoped: library generic code cannot see it and silently falls back to a library overload | NEGATIVE-VERIFIED | design limit (silent fallback: library bug) | `basic/components/source-code.tex` (import/export of operator names) | `g10` | ours (sharpened here) | `SUM` over a user `Number` whose `+` is top-level prints `6.0` (an `RR64`), not `W(6.0)`. No diagnostic. |
| 31 | a **functional method** does cross the component boundary: the same program with `opr +(self, other: W)` declared inside the object works | POSITIVE-VERIFIED | — | `basic/functions.tex` (functional methods) | `g09` | (this merge) | `SUM over W (method opr +) = W(6.0)`. This is why the library's own `AdditiveGroup` defaults work for user types. |
| 32 | "the library cannot call the user's `opr +` at all" | RETIRED | — | — | `g09` vs `g10` | ours (`sum-experiment-report.md`) | Over-broad. It cannot call a *top-level* one (row 30); it calls a functional method fine (row 31). The report's patch had to route through a dotted method for exactly this reason. |
| 33 | both juxtaposition directions (`M v` and `v M`) coexist when the two carriers are unrelated object types, or are made mutually `excludes` | POSITIVE-VERIFIED | — | `basic/overloading.tex` (Meet Rule); `basic/trait-parameters.tex:339` | `spec-probes/p7_excludes.fss`, `p14_genwrap.fss` | ours, blinded, review | Falsifies the claim that two instantiations of one generic trait are disjoint; the library's own `Rank1 excludes Rank2` is the shipped idiom. |
| 34 | postfix `^T` is a declarable operator and runs | POSITIVE-VERIFIED | — | `basic/operators/opr-overview.tex:87-91` | `g17` | ours, review | `opr (m: Mat)^T: Mat` → `m^T = Mat(3,2)`. Astra and the blinded run both recorded transpose as a departure without finding it. |
| 35 | the library ships **none** of the three matrix operators the spec promises: `M^T`, `M^k`, `‖M‖` | NEGATIVE-VERIFIED | library gap vs spec | `basic/operators/opr-overview.tex:56-57, 75-81, 87-91` | `libvector-probes/p25_spec_gaps.fss`, `p26_matrix_norm.fss` | ours | `Operator postfix ^T is not defined.`; `Failed to find any matching overload … (__DefaultMatrix,2)`; `Cannot unify __DefaultMatrix with Vector[\T,k\]`. Transpose ships only as the method `.t()`. |
| 36 | `AdditiveGroup` / `MultiplicativeRing` inheritance gives a user type binary `-`, unary `-`, `zero`, juxtaposition-as-`TIMES`, `^` for free, and coexists with the user's own scalar overloads | POSITIVE-VERIFIED | — | `advanced-lib/algebraic-constraints.tex` | `spec-probes/p4_addgroup.fss`, `p5_ring.fss` | ours | These two traits are the *whole* of what trait compliance buys today (row 37). |
| 37 | the algebraic-constraints library the spec devotes 1894 lines to (`Monoid`, `Group`, `Ring`, `Field`, `Lattice`, …) does not ship | NEGATIVE-VERIFIED | library gap vs spec | `advanced-lib/algebraic-constraints.tex` (1894 lines) | `spec-probes/p5_ring.fss` (what exists) + `Library/incomplete/advanced/Fortress.Operators.fsi.INCOMPLETE` (every trait present, every line commented out); `Library/FortressLibrary.fss:2823` has `trait Monoid` inside a comment block | ours | Natural companion to the complex-numbers goal. |
| 38 | a user `opr SQRT(V)` coexists with the library's `Number.SQRT` | POSITIVE-VERIFIED | — | — | `spec-probes/p10_sqrt.fss` | ours | `SQRT \|q\| = 2.0` and `SQRT V(9.0) = V(3.0)` in one program. |

## 5. Big operators, generators, reductions

| # | claim | status | class | spec citation | reproducer | found by | notes / workaround |
|---|---|---|---|---|---|---|---|
| 39 | the spec's single-declaration big-operator form (`opr BIG Op[\T\](g:(Reduction[\R0\],T->R0)->R0):R`) does not work: the desugarer emits a **nullary** operator reference | NEGATIVE-VERIFIED | implementation gap | `basic/expressions/reductions.tex:27-34`; `advanced/subscripting.tex:115-118` ("declared as a usual operator declaration") | `spec-probes/p11_bigspec.fss` | ours | `got arg (): () of type ()`. `PreTypeCheckDesugaringVisitor.java:358-373`. The nullary + `BigOperator` + `__bigOperatorSugar` protocol is the library's invention; the spec never describes it. |
| 40 | consequently a big-operator name admits **exactly one** declaration per program: Σ is not extensible by addition | NEGATIVE-VERIFIED | design limit | `basic/overloading.tex:99-105` (static parameters must agree; overloading is decided on value parameter lists) | `spec-probes/p6_sum.fss` | ours, astra, blinded | `fails because their parameter lists have the same types`. |
| 41 | Σ **is** extensible by replacement: `import FortressLibrary.{...} except { opr BIG + }` plus a reduction object and two `opr SUM` declarations | POSITIVE-VERIFIED | — | `basic/components/source-code.tex:75` (`except`); `basic/expressions/reductions.tex:27` | `sum-probes/p15_full_sum.fss` | ours, astra, blinded (independently) | 12/12 cases pass, including numeric `SUM` in the same component. |
| 42 | `except { opr SUM }` is a syntax error; `except { opr ∑ }` parses; only `opr BIG +` actually works | NEGATIVE-VERIFIED | implementation gap (import grammar has no `SUM` alias, though `Parameter.rats:129` provides one for declarations) | `basic/components/source-code.tex:90-95` | `sum-probes/p20_except_spelling_sum.fss`, `fable-review-probes/RvwExceptSigma.fss` | ours, astra, blinded, review | |
| 43 | extension by **addition** does work for `BIG MAX`: one trait declaration (`extends StandardMax[\V\]` + `opr MAX`) opens the library's own big operator to a user type | POSITIVE-VERIFIED | — | `basic/expressions/reductions.tex:27` | `g12` | review | `BIG MAX over a user type = V(9.0)`. The asymmetry with Σ is entirely the nullary-registration protocol (rows 39-40). |
| 44 | the shipped `SUM` is sealed twice over — `[\T extends Number\]` and an `unwrap` that is `cast[\Number\]` — so it cannot reduce anything but a `Number`, including plain `RR64` **vectors** | NEGATIVE-VERIFIED | library gap vs spec | `basic/expressions/reductions.tex:27-34` places no bound on `T` | `matrix-ad-probes/p10.fss` | ours | `CastError` at `FortressLibrary.fss:36` via `:1120` (`r.lift`) from `:3041-3042`. |
| 45 | `SumReduction.empty()` is the numeric `0`, monomorphic in `Number`, so an empty Σ over a user type yields `ZZ32 0` | NEGATIVE-VERIFIED | design limit (library) | — (`FortressLibrary.fss:3029`) | `libvector-probes/p29_mixing.fss`, `sum-probes/p15_full_sum.fss` case 8 | ours | Unfiltered reductions never call `empty()`; only filtering or an empty generator does. |
| 46 | a user `CommutativeMonoidReduction[\T\]` driven by `__generate`, or wrapped in a user `opr BIG OPLUS`, gives parallel-safe accumulation over any type | POSITIVE-VERIFIED | — | `advanced/parallelism-locality/defining-generators.tex` | `matrix-ad-probes/p11.fss` (1 and 4 threads) | ours | Identical results at 1 and 4 threads, three runs each. |
| 47 | a user carrier gains the whole generator protocol (`\|x\|`, `x[i]`, `x[r]`, `u <- x`, comprehensions, `BIG op[u <- x]`) from `ZeroIndexed` + `DelegatedIndexed` in about six lines | POSITIVE-VERIFIED | — | `advanced/parallelism-locality/defining-generators.tex` | `spec-probes/p14_genwrap.fss` | ours, blinded | Astra's `Vec(n, f)` never asked; its Σ ranges over `0#x.n` as a result. |
| 48 | multi-generator, multi-level comprehensions preserve natural order | POSITIVE-VERIFIED | — | `basic/expressions/comprehensions.tex`; `advanced/parallelism-locality/defining-generators.tex` | `spec-probes/p17_nested.fss` | ours | `flat = <\|1, 2, 3, 4, 5, 6\|>` from a 3-level nesting. |

## 6. Arrays, vectors, matrices, slicing

| # | claim | status | class | spec citation | reproducer | found by | notes / workaround |
|---|---|---|---|---|---|---|---|
| 49 | an array literal with no declared LHS type fails: the element-type join was intended and never written | NEGATIVE-VERIFIED | implementation gap | `basic/expressions/aggregate.tex:27` | `libvector-probes/p01_rr64_vec_construct.fss` | ours | `Can't infer element type for array construction` (`LHSEvaluator.java:117-140`, comment at `:136-138`). Bites `RR64` as hard as a user type. |
| 50 | array comprehensions `[ i \|-> e \| i <- g ]` are dead at two layers and have no library big operator | NEGATIVE-VERIFIED | implementation gap | `appendices/grammars/concrete-syntax.tex:1081-1096`; `preliminaries/overview.tex:985-999`; `fortress/preamble.tex:70` | `libvector-probes/p06_rr64_arraycomp.fss`, `fable-review-probes/RvwArrayCompr.fss` | ours, blinded | `Variable i is not defined.` — `ExprDisambiguator.scala` has no case, `Evaluator.java:881-887` is `NI(…)`, and `grep 'BIG \[' Library/` is empty. |
| 51 | the diagonal factory `matrix[\T,n,m\](v)` writes a literal integer `0` off the diagonal | NEGATIVE-VERIFIED | library bug | — (`FortressLibrary.fss:2615-2616`) | `libvector-probes/p14_value_matrix.fss` | ours | Fatal for a user element type; latent for `RR64` (`ZZ32` zeros inside an `RR64` matrix). Workaround `matrix[…]().fill(…)`. |
| 52 | the library's `Vector`/`Matrix` carry a user element type **in full** — construction, indexing, `M v`, `v M`, `M N`, `.t()`, `+`, `scale`, `pmul`, `SUM`, comprehensions, mutation, runtime sizes — but only under the illegal `extends Number` | POSITIVE-VERIFIED (with the caveat of row 22) | — | `basic/expressions/aggregate.tex:152-170` (the `Number` bound is the spec's own) | `libvector-probes/p30_capstone.fss` | ours | A runtime-sized 3→4→2 forward pass over `Vector`/`Matrix` of a user `Value`, with ordinary `RR64` arithmetic still working alongside. |
| 53 | the spec-legal alternative (extend the unsealed `AdditiveGroup`/`MultiplicativeRing`) gets `+ - scale pmul .t()` and stops dead at `DOT`, `rmul`, `lmul`, `mul` and every top-level operator | NEGATIVE-VERIFIED | library gap vs spec | `basic/traits.tex:231-235` (the seal is legal); `basic/expressions/aggregate.tex:152-170` | `libvector-probes/p32_ring_route.fss` | ours | Top-level operators carry `[\T extends Number\]`; `Vector.dot` is a `SUM` and dies at `cast[\Number\]`. Smallest principled fix: `comprises { RR64, ... }` in `FortressLibrary.fsi:276` (`basic/traits.tex:236-241` provides the ellipsis form). |
| 54 | slices and views (`v[4:7]`, `m[1,:]`, `m[:,j]`, `m[(a,b)#(c,d)]`) are real zero-copy views but extend `Array1`/`Array2`, never `Vector`/`Matrix`, so no vector or matrix operator applies | NEGATIVE-VERIFIED | design limit (library) | `basic/expressions/ranges.tex:18-19, 76-80` | `matrix-ad-probes/p03.fss` | ours | `row is NOT an AnyVector`. Workarounds: `.copy()` (allocates) or row 55. |
| 55 | a ~6-line user object extending `Vector[\RR64,k\]` keeps the view *and* the algebra, legally (`Vector` has no `comprises` clause) | POSITIVE-VERIFIED | — | `basic/traits.tex:231-235` | `matrix-ad-probes/p13.fss` | ours | `VecView IS an AnyVector`; `s DOT s = 126.0`; writes through to the base. |
| 56 | pair-of-ranges (`m[r0,r1]`) and mixed index/range (`m[i,r]`, `m[r,j]`) subscripts are shipped **commented out** | NEGATIVE-VERIFIED | implementation gap | `basic/expressions/ranges.tex:18-19` | `matrix-ad-probes/p03.fss` | ours | `Failed to find any matching overload, args = (1: ZZ32, CompactFullParScalarRange…)`; the dead code is `FortressLibrary.fss:2340-2356, 2360-2367`. |
| 57 | runtime-sized shapes need no `nat` gymnastics: `array[\T\](n)` / `array[\T\](n,m)` yield objects that dispatch as `Vector`/`Matrix` | POSITIVE-VERIFIED | — | `basic/trait-parameters.tex:82` | `matrix-ad-probes/p07.fss`, `libvector-probes/p22_runtime_sized.fss` | ours | Cost: the static type is `Array[\RR64,ZZ32\]` and must be spelled out everywhere, because row 18. |
| 58 | a bare `RR64` scalar cannot scale a `Vector` of a user element type | NEGATIVE-VERIFIED | design limit (library) | — (`FortressLibrary.fss:2258-2281`, overloads typed `(T, Vector[\T,n\])`) | `libvector-probes/p29_mixing.fss` | ours | `Value(2.0) u` works. |

## 7. Parallelism and mutation

| # | claim | status | class | spec citation | reproducer | found by | notes / workaround |
|---|---|---|---|---|---|---|---|
| 59 | a bare `acc := acc + c` inside a parallel `for` **silently loses updates**; `atomic do … end` is correct; the spec's own `acc += e` reduction-variable form is unimplemented | NEGATIVE-VERIFIED | implementation gap | `basic/evaluation/reduction.tex:14-17`; `fortress/preamble.tex:71` | `matrix-ad-probes/p11.fss` at `FORTRESS_THREADS=4` | ours | Expected `5050 10100 15150`; three runs gave `2968 …`, `1505 …`, `3213 …`. Invisible at one thread. |
| 60 | reduction expressions and `__generate` are parallel-safe at 4 threads | POSITIVE-VERIFIED | — | `basic/evaluation/reduction.tex:15-17` | `matrix-ad-probes/p11.fss` at 4 threads | ours | Rows (b), (c), (d) identical across three runs. |
| 61 | `spawn` and `.val()` work on the interpreter path | POSITIVE-VERIFIED | — | `appendices/grammars/concrete-syntax.tex:982` | `compiler-probes/p32.fss` run interpreted | ours | `p32 42`. Contrast row 74. |

## 8. Fortify typesetter

| # | claim | status | class | spec citation | reproducer | found by | notes / workaround |
|---|---|---|---|---|---|---|---|
| 62 | `x_h[t]` emits `x_{\mathrm{h}}_{t}` — a LaTeX `! Double subscript` error | NEGATIVE-VERIFIED | typesetter | `basic/lexical-structure.tex:1506-1516` (underscore = subscript) | `g14` → `g14.tex`; `latex` on the fragment | blinded, astra | Rename to `xh` or bind the row first. |
| 63 | `opr ^(a: T, b: T)` swallows the whole parameter list into a superscript | NEGATIVE-VERIFIED | typesetter | `basic/operators/opr-overview.tex:87-91` | `g14` → `\KWD{opr} ^{m\COLON \mathbb{Z}32, …}` | blinded | Workaround: `opr ^ (a: T, b: T)` (spaced), or use the postfix form (row 64). |
| 64 | the postfix declaration `opr (m: Mat)^T` typesets correctly as `(m: Mat)^{T}` | POSITIVE-VERIFIED | — | `basic/operators/opr-overview.tex:87-91` | `g14` | ours | |
| 65 | `SUM[m <- g] body` typesets as `\sum\limits_{m \leftarrow g}` and `DOT` as `\cdot` | POSITIVE-VERIFIED | — | `basic/lexical-structure.tex:1466-1476` | `g14` | ours, astra, blinded | This is why row 5 (no Unicode `∑`) does not affect the rendered result. |
| 66 | numeric subscripts are reachable only on a lowercase-initial name: `w17` → italic `w_{17}`, but `W1` → roman `\TYP{W1}` with no subscript, and `_Wq` → bold | NEGATIVE-VERIFIED + POSITIVE-VERIFIED | typesetter (by design) | `basic/lexical-structure.tex:1520-1530` | `g13` → `g13.tex` | ours (page-template ledger) | Corrects that ledger row: it is not that italic `W₁` is unreachable in general — a *capital-initial* name is rendered as a type name. Bold `_W1` is the register the ML literature uses anyway. |

## 9. Packaging and runtime

| # | claim | status | class | spec citation | reproducer | found by | notes / workaround |
|---|---|---|---|---|---|---|---|
| 67 | `bin/fortress` hard-codes `-Xmx256m -Xss32m` unless `JAVA_FLAGS` is set; realistic graphs exhaust it | NEGATIVE-VERIFIED | packaging | — (`bin/fortress:28-29`) | `g15` | blinded | 2M-element array → `OutOfMemoryError`; `JAVA_FLAGS="-Xmx2g -Xss32m"` → succeeds. Nothing in the tree needs changing. |
| 68 | a component's name must equal its file name | NEGATIVE-VERIFIED | design limit | `basic/components/intro.tex:20` | `g16_misnamed` | ours | `Component/API names must match their enclosing file names.` |
| 69 | `fortress typecheck` is not an oracle for interpreter programs: it checks against `Library/CompilerLibrary.fsi` | NEGATIVE-VERIFIED | packaging | — (`Shell.java:453-457`) | `libvector-probes/p30_capstone.fss` under `fortress typecheck` | ours | `Vector is undefined.` on a program that runs. `typecheck-old` uses the interpreter library but cannot typecheck that library itself. |

## 10. Bytecode-compiler path (a different execution path)

Verified by `fortress compile` (+ `fortress run` where the failure is at run time),
each against the same source run through the interpreter.

| # | claim | status | class | spec citation | reproducer | found by | notes / workaround |
|---|---|---|---|---|---|---|---|
| 70 | the compiled path works end to end for what `CompilerLibrary` covers, including implicit tuple parallelism and `atomic` | POSITIVE-VERIFIED | — | — | `compiler-probes/p12.fss`, `p13.fss` | ours | `p12 200.0`, `p13 10.0`. |
| 71 | G1 — `import List` is impossible: `CompilerLibrary` has no `HasRank`, `LexicographicOrder`, `Maybe` | NEGATIVE-VERIFIED | library gap vs spec | — | `compiler-probes/p15.fss` | ours | Errors are raised inside `Library/List.fsi` itself. |
| 72 | G2 — no generic `array[\T\](n)` | NEGATIVE-VERIFIED | library gap vs spec | — | `compiler-probes/p05.fss` | ours | `Function array is not defined.` Only `ZZ32Vector` ships. |
| 73 | G3 — no `exp` / `log` | NEGATIVE-VERIFIED | library gap vs spec | — | `compiler-probes/p09.fss` | ours | `Variable exp is not defined.` |
| 74 | G4 — no `SUM`, no generic `BIG` operators, no user reductions (`Generator[\T\]`-driven `__bigOperator` is missing at library level) | NEGATIVE-VERIFIED | library gap vs spec | `basic/expressions/reductions.tex` | `compiler-probes/p11.fss` | ours | `Operator BIG + is not defined.` |
| 75 | G5 — `nanoTime()` has a different type on the two paths (`RR64` vs `ZZ64`) | NEGATIVE-VERIFIED | library gap vs spec | — | `explorations/tparallel.fss` compiled | ours | `(ZZ64, ZZ64)->ZZ64 is not applicable to an argument of type (RR64, RR64)`. |
| 76 | G6 — string juxtaposition inserts spaces on the compiled path, silently changing almost every program's output | NEGATIVE-VERIFIED | library bug | — | `compiler-probes/ctrl1.fss` both ways | ours | interpreter `[15.0]` vs compiled `[ 15.0 ]`. One token: `CompilerBuiltin.fss:384` uses `\|\|\|`, `FortressLibrary.fss:4050` uses `\|\|`. |
| 77 | G7 — no dynamic dispatch to a method declared only in the subtypes of a `comprises` union | NEGATIVE-VERIFIED | implementation gap | `basic/traits.tex:231-235` | `compiler-probes/p20.fss` | ours | `No such method Tree.tsum.` |
| 78 | G8 — no multimethod (argument-type) dispatch over a `comprises` union | NEGATIVE-VERIFIED | implementation gap | `basic/overloading.tex` | `compiler-probes/p10.fss` | ours | `Leaf->RR64 is not applicable to an argument of type Tree.` |
| 79 | G9 — `typecase` gives a **different, wrong** answer on the compiled path, silently | NEGATIVE-VERIFIED | implementation gap | — | `compiler-probes/p33.fss` both ways | ours | interpreter `p33 1`, compiled `p33  0`: an integer literal is carried as `IntLiteral`, not `ZZ32`. The most dangerous item here. |
| 80 | G10 — `case x of <int literal>` compiles clean and throws at run time | NEGATIVE-VERIFIED | implementation gap | — | `compiler-probes/p36.fss` | ours | `CompilerFailureDetectedAtRunTime` from the stubbed `IntLiteral` comparison family (`CompilerBuiltin.fss:833-838`). Workaround: annotate the scrutinee. |
| 81 | G11 — `label` / `exit` is unimplemented in codegen | NEGATIVE-VERIFIED | implementation gap | `appendices/grammars/concrete-syntax.tex:972` | `compiler-probes/p31.fss` | ours | `Can't compile Label` (`CodeGen.sayWhat`). The canonical `sayWhat`; bounds how far codegen gets. |
| 82 | G12 — `spawn` produces an unusable thread handle (`Thread[\T\]` is declared only in the interpreter builtin) | NEGATIVE-VERIFIED | library gap vs spec | — | `compiler-probes/p32.fss` compiled vs interpreted | ours | `No such method Thread[\IntLiteral\].val.` |

## Contested / unsettled

| # | claim | status | class | reproducer | found by | why unsettled |
|---|---|---|---|---|---|---|
| 83 | `nat`-generic functions mis-unify on a second instantiation when called through an exported API | CONTESTED | implementation gap (claimed) | none saved — blinded's evidence is a transcript timestamp (`17:29`, the `src/MicroGPT.fsi` attempt) | blinded | No minimal reproducer survives, and building an API + component pair here did not isolate it. Kept so it is not re-derived from scratch; needs a fresh `.fsi`/`.fss` pair before it can be classified. |

## Disagreements resolved

1. **Chained subscripting / indexed power** — ours classified `m[i][j] → (m[i])[j]` as a *design limit* ("grammatical by design in the spec"); Astra and the blinded run called it an *interpreter gap*. **Astra and blinded are right** (rows 1-3): `concrete-syntax.tex:944-950` is left-recursive on `Primary`, `precedence.tex:44-51` puts subscripting and superscripting in one left-associative group, and `Expression.rats` parses both. The failure is `Evaluator.java:1251-1252`. Row 2 adds that it can also be silently wrong, which no source had.
2. **`f()[i]`** — blinded called it a grammar/design limit, and the review's correction of row 1 risked sweeping it in. **Blinded is right** (row 4): `juxtameaning.tex:157-161` makes it a static error and the interpreter quotes that sentence. Rows 1-3 and row 4 are different verdicts about neighbouring syntax.
3. **"The library cannot call the user's `opr +`"** — our sum experiment stated it unconditionally. **Falsified as stated** (rows 30-32): it holds for top-level `opr` declarations, not for functional methods. The important half is that the fallback is *silent*.
4. **`do … end` as a comprehension body** — blinded listed it as unavailable. **Falsified** (row 10).
5. **Transpose** — Astra recorded `transpose(W)` as a word and a remaining departure; the blinded run avoided needing it. **Ours is right** (row 34): the spec's postfix `^T` is declarable and runs.
6. **Both juxtaposition directions** — Astra judged `v M` unavailable; ours reached it via `Rank1 excludes Rank2`; blinded reached it with two plain overloads on unrelated object types. **Blinded's route is the simpler correct one** (row 33); `excludes` is needed only when the carriers share a supertype.
7. **`extends Number`** — Astra and ours agree it is illegal per `traits.tex:228-235`; ours adds that the walk path never enforces it and that the library types then work in full (rows 22, 52). Not a disagreement, a merge: the row needs both halves or it misleads.
8. **`W_1` / italic `W₁`** — the page-template ledger said italic `W₁` is unreachable. **Sharpened** (rows 15, 66): `W_1` is a lexical error, but `w17` renders `w₁₇`; what is unreachable is a *capital-initial* italic subscripted name, because capital-initial names render as type names.
9. **Σ over a user type** — the earliest of our notes recorded "Σ is sealed, impossible". **Retired by all three runs independently** (rows 40-41): impossible by *addition*, routine by *replacement*.

## Revival worklist, ordered by rows closed

| fix | rows closed | evidence |
|---|---|---|
| 1. `Evaluator.mathItemApplication` must not strip the first subscript argument (`Evaluator.java:1052` + `1251-1252`) | 1, 2, 3 | `g01`, `g02` — a one-line fix that also removes a silent wrong answer |
| 2. Make the shipped big operators element-driven instead of `Number`-sealed (relax `[\T extends Number\]`, drop `cast[\Number\]`, give `empty()` a type-directed identity) | 44, 45, 40 (partly), and 53 in combination with fix 3 | `matrix-ad-probes/p10`, `libvector-probes/p29`, `spec-probes/p6_sum` |
| 3. Unseal the linear-algebra layer: `comprises { RR64, ... }` in `FortressLibrary.fsi:276`, or relax the `[\T extends Number\]` bounds on the top-level `DOT`/`juxtaposition` operators | 22, 24, 52, 53, 58 | `libvector-probes/p10`, `p30`, `p32`; `RvwTypePow` |
| 4. Implement declaration-site covariance (bind where-clause variables in `extends`) | 17, 20, and most of 21's symptom load | `spec-probes/p16_covar`, `p2_ascribe`, `p8_omit` |
| 5. Big operators as plain declarations (spec form), which also lifts one-per-name | 39, 40, and the `except` workaround behind 41-42 | `spec-probes/p11_bigspec`, `p6_sum` |
| 6. Array construction and comprehension: element-type join in `LHSEvaluator`, an `ArrayComprehension` case in the disambiguator and evaluator, `opr BIG [ ]` in the library, static args in array literals | 49, 50, 12 | `libvector-probes/p01`, `p06`, `p27` |
| 7. Reduction variables (`acc += e`) — or, failing that, a diagnostic for unsynchronised mutation in a parallel `for` | 59 | `matrix-ad-probes/p11` at 4 threads |
| 8. Type aliases (`IndexBuilder.buildTypeAlias` + interpreter binding; the expansion already exists) and import aliasing | 18, 13 | `alias-units-probes/p1`, `p10`, `p12` |
| 9. Restore the commented-out range subscripts and make views extend `Vector`/`Matrix` when `T extends Number` | 54, 56 | `matrix-ad-probes/p03`, `p13` |
| 10. Coercion declarations: wire `CoercionOracle` into both paths | 19 | `spec-probes/p15_coertc` |
| 11. Compiler-path library parity — `CompilerLibrary` needs `List`, `array`, `exp`/`log`, generic reductions; plus the `\|\|\|` token, `IntLiteral` comparisons, `typecase` literal typing, `Label` codegen | 71-82 | `compiler-probes/*` |
| 12. Fortify: guard nested subscripts, and parse `opr ^(…)` as a declaration rather than a superscript | 62, 63 | `g13`, `g14` |
| 13. Multifix dispatch | 29 | `spec-probes/p13_multifix2` |
| 14. Dimensions and units (parser bugs first, then `TaggedDimType` evaluation) | 26, 27 | `alias-units-probes/q3`, `q8`, `q16`, `q18` |

## Counts by status

| status | rows |
|---|---|
| POSITIVE-VERIFIED | 20 (+3 rows that carry both marks) |
| NEGATIVE-VERIFIED | 56 (+3 rows that carry both marks) |
| NEGATIVE-BOUNDED | 1 (row 9) |
| CONTESTED | 1 (row 83) |
| RETIRED | 2 (rows 10, 32) |
| **total rows** | **83** |

Rows 21, 25 and 66 record a paired positive and negative verdict about the same
construct and are listed once; row 52 is positive with a standing caveat (row 22).

By class (rows 26 and 30 carry two classes, so these sum to more than 83):
implementation gap 27 · design limit 15 (four of them library-design choices) ·
library gap vs spec 11 · library bug 2 · typesetter 3 · packaging 2 ·
no gap class, i.e. capability rows 22 · retired/contested 3.
