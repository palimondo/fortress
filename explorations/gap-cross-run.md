<!-- Which ledger row each microGPT port hit. Marks are read off the ledger's
     `found by` column, explorations/blinded-fable/notes/gaps.md, Astra's table in
     explorations/astra/worker/main/ARTICLE.md, and the two runs' own tables
     (run-b/gaps.md, run-b2/gaps.md). No new claims are made here; every row is
     a row of explorations/fortress-gap-ledger.md. -->

# Which gap each port hit

Five ports of microGPT (and its neighbours) have now been made in this tree, and each
met a different subset of the same 139 language, library, interpreter and typesetter
gaps. This file is the cross-tabulation: one line per ledger row that at least one port
reached, one column per port — `ours` (this repository's own rounds, reviews and probe
arcs counted as one), `astra` (the independent Astra run), `blinded` (the blinded Fable
run), `run-b` and `run-b2` (the two most recent ports). **hit** means the port met the
gap and recorded it; **avoided (…)** means the port never met it because of a design
choice, named in the parenthesis, that its own artifacts show; **—** means not reached.
An `avoided` mark is a claim about the port's route, not about the gap: the gap is still
there. Marks come from the sources named in the comment above, not from fresh runs; the
ledger is where the evidence for each row lives.

| row | claim | ours | astra | blinded | run-b | run-b2 |
|---|---|---|---|---|---|---|
| 1 | `x[i][j]` is grammatical and left-associative, but the walk interpreter invokes the first subscript with an em … | hit | hit | hit | avoided (carrier) | avoided (carrier) |
| 2 | the same defect silently returns the wrong element when the subscript has more than one index: `m[3,7]^2` eval … | hit | — | — | — | — |
| 3 | `x[i]^2` (subscript then superscript) fails the same way | hit | hit | hit | avoided (carrier) | avoided (carrier) |
| 4 | `f()[i]` (call then subscript) is a static error by specification, not an implementation defect | — | — | hit | — | — |
| 5 | U+2211 `∑` lexes as a prefix operator, never as an accumulator; only ASCII `SUM` is a big operator | hit | — | — | — | — |
| 6 | a reduction is a `FlowExpr`: it cannot be an operand of an infix operator without parentheses | hit | — | — | — | — |
| 7 | an all-uppercase word with ≥2 distinct letters (`BOS`, `GPT`) is an operator word, not an identifier | — | — | hit | — | hit |
| 8 | `value`, `at`, `type`, `unit`, `of`, `most` … are reserved words | — | — | hit | — | — |
| 9 | a two-line `a \|\| b` does not parse, with the `\|\|` at the end of the first line or at the start of the seco … | — | — | hit | hit | — |
| 10 | `do … end` is allowed as a comprehension body | hit | — | hit | — | — |
| 11 | objects may not declare varargs constructor parameters | — | — | hit | hit | — |
| 12 | static arguments inside an array literal (`[\T\ …]`) are in the spec grammar but not parsed | hit | — | — | — | hit |
| 13 | import aliasing is unusable: the spec's `as` form is a parse error, the implementation's `=>` form parses but … | hit | — | — | — | — |
| 14 | there is no exponent notation in numerals (`1e-5`) | — | — | hit | — | — |
| 15 | `W_1` is not an identifier: `_1` is read as a radix specifier and radix 1 is a static error | hit | — | — | — | avoided (naming) |
| 16 | `10.0^(-5)`, `0.00001`, radix numerals (`7fff_16`), and letter-subscripted names (`W_q`, `w17`) all work | hit | — | — | hit | — |
| 17 | the spec's declaration-site covariance idiom `trait C[\S\] extends C[\T\] where {S extends T}` is rejected: wh … | hit | — | — | — | — |
| 18 | `type` aliases are specified and unimplemented | hit | — | — | — | hit |
| 19 | coercion declarations parse and are then ignored by both walk and typecheck | hit | — | — | — | — |
| 20 | an aggregate's element type is computed from the elements' runtime class, and `List` is invariant, so … | hit | — | hit | hit | hit |
| 21 | static arguments on a generic *method* cannot be inferred (`x.zip(y)` needs `x.zip[\V\](y)`); return types on … | hit | — | — | — | avoided (untyped closures) |
| 22 | `comprises` is never checked on the walk path, so the illegal `object Value … extends Number` is accepted and … | hit | hit | — | avoided (user carrier) | avoided (value object) |
| 23 | `T[n]` with a `nat` parameter does not unify with a runtime-built array; a literal size does | — | — | hit | avoided (runtime extents) | avoided (runtime extents) |
| 24 | `T^n` parses as a type but denotes the `Number`-only library `Vector`/`Matrix` | — | — | hit | — | — |
| 25 | a `nat` static argument can never be a value name; `NatReflect.reflect` + one hoisted generic per shape is the … | hit | — | — | avoided (runtime extents) | avoided (runtime extents) |
| 26 | dimensions and units: the type grammar and AST are implemented, nothing evaluates, and the typechecker throws … | hit | — | — | — | — |
| 27 | `dim X` without a `default` unit is unwritable — a null dereference in the error path of an *optional* clause | hit | — | — | — | — |
| 28 | a user object with a `nat` static parameter and dimension-checked `+` works today | hit | — | — | — | — |
| 29 | multifix dispatch is absent: the interpreter never looks for an *n*-argument definition, it reassociates to bi … | hit | — | — | — | — |
| 30 | a top-level `opr` declaration is component-scoped: library generic code cannot see it and silently falls back … | hit | — | — | — | — |
| 31 | a functional method does cross the component boundary: the same program with `opr +(self, other: W)` declared … | hit | — | — | — | — |
| 32 | "the library cannot call the user's `opr +` at all" | hit | — | — | — | — |
| 33 | both juxtaposition directions (`M v` and `v M`) coexist when the two carriers are unrelated object types, or a … | hit | hit | hit | — | — |
| 34 | postfix `^T` is a declarable operator and runs | hit | — | — | hit | hit |
| 35 | the library ships none of the three matrix operators the spec promises: `M^T`, `M^k`, `‖M‖` | hit | hit | hit | hit | hit |
| 36 | `AdditiveGroup` / `MultiplicativeRing` inheritance gives a user type binary `-`, unary `-`, `zero`, juxtaposit … | hit | — | — | — | — |
| 37 | the algebraic-constraints library the spec devotes 1894 lines to (`Monoid`, `Group`, `Ring`, `Field` … | hit | — | — | — | — |
| 38 | a user `opr SQRT(V)` coexists with the library's `Number.SQRT` | hit | — | — | — | — |
| 39 | the spec's single-declaration big-operator form (`opr BIG Op[\T\](g:(Reduction[\R0\],T->R0)->R0):R`) does not … | hit | — | — | hit | hit |
| 40 | consequently a big-operator name admits exactly one declaration per program: Σ is not extensible by addition | hit | hit | hit | hit | hit |
| 41 | Σ is extensible by replacement: `import FortressLibrary.{...} except { opr BIG + }` plus a reduction object an … | hit | hit | hit | hit | — |
| 42 | `except { opr SUM }` is a syntax error; `except { opr ∑ }` parses; only `opr BIG +` actually works | hit | hit | hit | — | — |
| 43 | extension by addition does work for `BIG MAX`: one trait declaration (`extends StandardMax[\V\]` + `opr MAX`) … | hit | — | — | — | — |
| 44 | the shipped `SUM` is sealed twice over — `[\T extends Number\]` and an `unwrap` that is `cast[\Number\]` — so … | hit | hit | hit | hit | avoided (own carrier) |
| 45 | `SumReduction.empty()` is the numeric `0`, monomorphic in `Number`, so an empty Σ over a user type yields … | hit | — | — | hit | — |
| 46 | a user `CommutativeMonoidReduction[\T\]` driven by `__generate`, or wrapped in a user `opr BIG OPLUS`, gives p … | hit | — | — | — | — |
| 47 | a user carrier gains the whole generator protocol (`\|x\|`, `x[i]`, `x[r]`, `u <- x`, comprehensions … | hit | avoided (explicit range) | hit | hit | — |
| 48 | multi-generator, multi-level comprehensions preserve natural order | hit | — | — | — | — |
| 49 | an array literal with no declared LHS type fails: the element-type join was intended and never written | hit | — | — | hit | hit |
| 50 | array comprehensions `[ i \|-> e \| i <- g ]` are dead at two layers and have no library big operator | hit | — | hit | — | — |
| 51 | the diagonal factory `matrix[\T,n,m\](v)` writes a literal integer `0` off the diagonal | hit | — | — | — | — |
| 52 | the library's `Vector`/`Matrix` carry a user element type in full — construction, indexing, `M v`, `v M` … | hit | — | — | avoided (user carrier) | avoided (value object) |
| 53 | the spec-legal alternative (extend the unsealed `AdditiveGroup`/`MultiplicativeRing`) gets … | hit | — | — | — | — |
| 54 | slices and views (`v[4:7]`, `m[1,:]`, `m[:,j]`, `m[(a,b)#(c,d)]`) are real zero-copy views but extend `Array1` … | hit | — | — | hit | avoided (fill) |
| 55 | a ~6-line user object extending `Vector[\RR64,k\]` keeps the view *and* the algebra, legally (`Vector` has no … | hit | — | — | — | — |
| 56 | pair-of-ranges (`m[r0,r1]`) and mixed index/range (`m[i,r]`, `m[r,j]`) subscripts are shipped commented out | hit | — | — | hit | avoided (fill) |
| 57 | runtime-sized shapes need no `nat` gymnastics: `array[\T\](n)` / `array[\T\](n,m)` yield objects that dispatch … | hit | — | — | hit | hit |
| 58 | a bare `RR64` scalar cannot scale a `Vector` of a user element type | hit | — | — | — | — |
| 59 | a bare `acc := acc + c` inside a parallel `for` silently loses updates; `atomic do … end` is correct; the spec … | hit | avoided (sequential) | — | avoided (one thread) | avoided (one thread) |
| 60 | reduction expressions and `__generate` are parallel-safe at 4 threads | hit | — | — | — | — |
| 61 | `spawn` and `.val()` work on the interpreter path | hit | — | — | — | — |
| 62 | `x_h[t]` emits `x_{\mathrm{h}}_{t}` — a LaTeX `! Double subscript` error | — | hit | hit | avoided (naming) | avoided (naming) |
| 63 | `opr ^(a: T, b: T)` swallows the whole parameter list into a superscript | — | — | hit | — | — |
| 64 | the postfix declaration `opr (m: Mat)^T` typesets correctly as `(m: Mat)^{T}` | hit | — | — | — | — |
| 65 | `SUM[m <- g] body` typesets as `\sum\limits_{m \leftarrow g}` and `DOT` as `\cdot` | hit | hit | hit | — | — |
| 66 | numeric subscripts are reachable only on a lowercase-initial name: `w17` → italic `w_{17}`, but `W1` → roman … | hit | — | — | — | hit |
| 67 | `bin/fortress` hard-codes `-Xmx256m -Xss32m` unless `JAVA_FLAGS` is set; realistic graphs exhaust it | — | — | hit | — | — |
| 68 | a component's name must equal its file name | hit | — | — | — | — |
| 69 | `fortress typecheck` is not an oracle for interpreter programs: it checks against … | hit | — | — | — | — |
| 70 | the compiled path works end to end for what `CompilerLibrary` covers, including implicit tuple parallelism and … | hit | — | — | — | — |
| 71 | G1 — `import List` is impossible: `CompilerLibrary` has no `HasRank`, `LexicographicOrder`, `Maybe` | hit | — | — | — | — |
| 72 | G2 — no generic `array[\T\](n)` | hit | — | — | — | — |
| 73 | G3 — no `exp` / `log` | hit | — | — | — | — |
| 74 | G4 — no `SUM`, no generic `BIG` operators, no user reductions (`Generator[\T\]`-driven `__bigOperator` is miss … | hit | — | — | — | — |
| 75 | G5 — `nanoTime()` has a different type on the two paths (`RR64` vs `ZZ64`) | hit | — | — | — | — |
| 76 | G6 — string juxtaposition inserts spaces on the compiled path, silently changing almost every program's output | hit | — | — | — | — |
| 77 | G7 — no dynamic dispatch to a method declared only in the subtypes of a `comprises` union | hit | — | — | — | — |
| 78 | G8 — no multimethod (argument-type) dispatch over a `comprises` union | hit | — | — | — | — |
| 79 | G9 — `typecase` gives a different, wrong answer on the compiled path, silently | hit | — | — | — | — |
| 80 | G10 — `case x of <int literal>` compiles clean and throws at run time | hit | — | — | — | — |
| 81 | G11 — `label` / `exit` is unimplemented in codegen | hit | — | — | — | — |
| 82 | G12 — `spawn` produces an unusable thread handle (`Thread[\T\]` is declared only in the interpreter builtin) | hit | — | — | — | — |
| 83 | `nat`-generic functions mis-unify on a second instantiation when called through an exported API | — | — | hit | — | — |
| 84 | a superscript or postfix operator may not follow a dotted access: `x.v^T`, `B.data^T`, `B.n^2`, `B.data^*`, an … | — | — | — | hit | hit |
| 85 | a prefix operator application as the second operand of a juxtaposition (`"text " SQRT(d)` … | — | — | — | hit | — |
| 86 | `(x DOT x)/\|x\|` does not lex: `/\|` is taken as one operator token | — | — | — | hit | — |
| 87 | "a value juxtaposed with a bar-enclosed expression (`w \|hs\|`) is a syntax error" | — | — | — | — | hit |
| 88 | the tight form `w\|hs\|`, with no space anywhere, does fail — and the fixity table says it should | — | — | — | — | hit |
| 89 | `-` and `AND` have incomparable precedence, so an expression mixing them across a comparison needs both halves … | — | — | — | — | hit |
| 90 | a postfix operator declaration whose operator is `!` needs a space before the return-type colon … | — | — | — | — | hit |
| 91 | `b.f(3)`, where `f` is a field holding a function, is a method invocation by specification, not an application … | — | — | hit | — | hit |
| 92 | a local name may not repeat a top-level function name; a *field* of an object may shadow a top-level variable | — | — | — | hit | — |
| 93 | a prime-marked identifier (`X'`) is a legal name | — | — | — | — | hit |
| 94 | the spec's constant `pi` is not in the default library: it is a `FloatLiteral` in the optional `Constants` API … | — | — | — | hit | — |
| 95 | the spec's `∞` object never shipped — no Unicode `∞`, no `INFINITY`, no `INF`, no bare `infinity` — but … | — | — | — | hit | hit |
| 96 | a map or list comprehension whose values are two `nat` instantiations of one generic object fails inside the l … | — | — | — | hit | avoided (fold of union) |
| 97 | two overloads whose parameter types are unrelated — two instantiations of the library's `Array` ( … | — | — | — | hit | hit |
| 98 | that rejection is cache-dependent: it fires only when the component has no entry in … | hit | — | — | — | — |
| 99 | overloads the Meet Rule does accept, all four verified: the library's generic `Vector[\RR64,n\]` and … | — | — | — | hit | hit |
| 100 | a carrier that mixes in `ZeroIndexed`/`DelegatedIndexed` inherits an abstract `opr[r: Range[\ZZ32\]]`, which i … | — | — | — | hit | avoided (own generate) |
| 101 | `BIG UNION` cannot be used in a component that imports both `Set.{...}` and `Map.{...}`: each declares the nul … | — | — | — | hit | — |
| 102 | the prefix form `BIG MAX g` finds no applicable overload for any `Generator[\RR64\]`, a library vector include … | — | — | — | hit | — |
| 103 | with `except { opr BIG + }`, a single user nullary `opr SUM(): BigReduction[\Any,Any\]` whose `join` dispatche … | — | — | — | hit | — |
| 104 | an array literal assigned to a variable declared with a runtime-sized type (`Array[\RR64,ZZ32\]` … | — | — | — | hit | — |
| 105 | vector pasting `[ u v ]` works, at runtime sizes too, when the left-hand type has a literal size | — | — | — | hit | — |
| 106 | a paste whose block grid has a single row or a single column of matrix elements always fails the extent check … | — | avoided (arithmetic) | — | hit | hit |
| 107 | a two-dimensional grid of square blocks pastes correctly; the same shape with non-square blocks throws an unca … | — | — | — | — | hit |
| 108 | matrix unpasting is not implemented, in either spelling | — | — | — | hit | hit |
| 109 | `Matrix` has no elementwise product, though `Vector` has `pmul` | — | — | — | hit | avoided (own ODOT) |
| 110 | a user object may declare `opr [_: TrivialOpenRange, c: Range[\ZZ32\]]` and be called as `Q[:, c]`, with … | — | — | — | hit | — |
| 111 | `for c <- s` over a `String` is a parallel, unordered generator: at one thread it silently prints the string b … | — | — | — | — | hit |
| 112 | a `value` object may declare a `var` field; the interpreter accepts it, mutates it in place, and the object th … | — | — | — | avoided (reference objects) | hit |
| 113 | `SEQV` (`===`) on two value objects compares only the fields the object *body* declares — with none, it compar … | — | — | — | hit | hit |
| 114 | the library ships that defect: `Just(1) SEQV Just(2)` is `true`, while `Just(1) = Just(2)` is `false` | — | — | — | — | hit |
| 115 | value traits work, and the one valueness rule that *is* enforced is the trait rule: a reference object extendi … | — | — | — | — | hit |
| 116 | the spec's `settable` abbreviation on a value object works: `z.im := 7.0` rebuilds the object | — | — | — | — | hit |
| 117 | a value object carrying an `Array[\RR64,(ZZ32,ZZ32)\]` field, with `opr +` and `opr juxtaposition` as function … | — | — | — | — | hit |
| 118 | function and method contracts are implemented and enforced: `requires`, `ensures … provided …` and `invariant` … | — | — | — | hit | hit |
| 119 | a bare `ensures { e }` — the `provided` subclause omitted, as the spec's own grammar allows — crashes the desu … | — | — | — | — | hit |
| 120 | `test` functions run under `fortress test`, in declaration order, and a failing `assert` aborts the run; the … | — | — | — | — | hit |
| 121 | the spec's generator form of a test declaration, `test Id[gens] = Expr`, is unimplemented, and fatal to the co … | — | — | — | — | hit |
| 122 | `property` declarations are unimplemented, at top level and inside an object | — | — | — | hit | hit |
| 123 | `TestSuite`, the library object the spec devotes a section to, does not ship | — | — | — | — | hit |
| 124 | field, getter and setter declarations must precede every method declaration in an object body | — | — | — | hit | hit |
| 125 | a `property` placed after a method is rejected by that same ordering check, although the grammar puts … | — | — | — | — | hit |
| 126 | inside an object, a getter is not reachable by its naked name from a method; `self.g` is | — | — | — | hit | — |
| 127 | the fields of an object expression are registered as top-level names, so two object expressions declaring the … | — | — | — | — | hit |
| 128 | a getter declared in an object expression that sits inside a `do` block is rejected as a local function declar … | — | — | — | — | hit |
| 129 | a lazily allocated adjoint — a `Maybe` field with a getter returning a fresh zero and a setter — lets … | — | — | — | hit | — |
| 130 | a trailing varargs parameter of a *trait* type, after a closure parameter, receives zero to n objects of diffe … | — | — | — | hit | — |
| 131 | function-expression parameters may be written without types: `fn (C_bar) => …`, including one stored in an obj … | — | — | — | — | hit |
| 132 | an API can export an object whose operators are functional methods: `opr +`, `opr juxtaposition` and … | — | — | — | — | hit |
| 133 | a postfix operator declaration cannot be written in an API at all, in either spelling | — | — | — | — | hit |
| 134 | `Map.union(f, other)` with a three-argument combining function works, including over matrix-valued maps; bare … | — | — | — | — | hit |
| 135 | `BIG UNION` over a generator of maps fails unless the static arguments are given explicitly | — | — | — | — | hit |
| 136 | a `Map` is a generator of `(key, value)` pairs in `for`, in a list comprehension and in a map comprehension, a … | — | — | — | — | hit |
| 137 | a user big operator over maps — `BIG MERGE`, reducing a generator of gradient environments by *summing* overla … | — | — | — | — | hit |
| 138 | `s.indexOf(c)` on a `String` returns a `Maybe[\ZZ32\]`, and the surrounding idioms (`.holds`, `.get` … | — | — | — | — | hit |
| 139 | the functional-backprop shape (every node carries a map from its cotangent to the parameter cotangents, sharin … | — | — | — | hit | — |

## Rows every port hit — the fix priorities

Only two rows were met by all five ports, and both are library rather than interpreter
defects:

- **35** — the library ships none of the three matrix operators the spec promises
  (`M^T`, `M^k`, `‖M‖`). Every port had to declare its own transpose or work around its
  absence; two of them (astra, blinded) recorded it as impossible rather than declarable
  (row 34).
- **40** — a big-operator name admits exactly one declaration per program, so Σ is not
  extensible by addition. Every port met the nullary-registration protocol; three of them
  found the `except { opr BIG + }` replacement independently (row 41).

Hit by four of the five: **20** (an aggregate's element type comes from the elements'
runtime class, so ascriptions are mandatory in plumbing code), **41**, **44** (the shipped
`SUM` is sealed by `[\T extends Number\]` plus a `cast[\Number\]`). Hit by three:
**1**, **3** (chained subscripting and indexed power), **33**, **34**, **39**, **42**,
**47**, **49**, **57**, **65**. Rows 35, 40, 44 and 20 are the four that would have paid
for themselves in every port so far; in the worklist they are fixes 8, 6, 3 and 2/10.

## Rows only one port hit — strategy fingerprints

- **ours, 47 rows** — most of them the compiler-path rows (70-82) and the systematic
  probe arcs no port needed: dimensions and units (26, 27), coercions (19), multifix (29),
  the algebraic-constraints library (37), views and slices (54, 55), `typecheck` as an
  oracle (69). This is the fingerprint of surveying rather than porting — plus row 98, the
  cache-dependence of overload checking, which only a merge that re-ran other runs' probes
  could see.
- **astra, 0 rows** — every gap Astra recorded was also met by someone else. Its table is
  seven entries wide and stays inside the intersection: the `Number` seal, the Σ
  collision, transpose, chained subscripting.
- **blinded, 8 rows** — 4 (`f()[i]` as a static error), 8 (reserved words), 14 (no
  exponent notation), 23 and 24 (`T[n]` and `T^n` type spellings), 63 (`opr ^(…)`
  typesetting), 67 (the 256 MB default heap), 83 (the `nat`-through-an-API claim, still
  contested). The fingerprint of writing the notation first and the program second: it met
  the type-spelling and typesetting walls the others routed around, and it was the only
  port to build a graph big enough to exhaust the heap.
- **run-b, 17 rows** — 85, 86, 92, 94, 96, 100-105, 109, 110, 126, 129, 130, 139. The
  fingerprint of a *tape* engine with user carriers and a replaced Σ: it met the reduction
  and generator protocol (100-103), the row-and-column subscripts a tape needs (110), the
  silent unbound array (104), the lazily allocated adjoint (129), and — uniquely — measured
  why the functional shape it did not choose is exponential (139).
- **run-b2, 27 rows** — 87-90, 93, 107, 111, 112, 114-117, 119-121, 123, 125, 127, 128,
  131-138. The fingerprint of a *value-object* engine written as an article with contracts
  and tests: the whole value-object group (112, 114-117), the whole test-and-property
  chapter (119-123, 125), object-expression scoping (127, 128), `Map` as the gradient
  environment (134-137), and the API rows (132, 133).

Of the 56 rows this merge added, run-b found 27 and run-b2 38; together they found 55 of
them (row 98, the cache-dependence of overload checking, came out of the merge itself),
and they overlap on only 10: 84, 95, 97, 99, 106, 108, 113, 118, 122, 124. Across the
whole ledger the two runs share 17 rows out of 43 and 49. Two ports of the same program,
run against the same interpreter, met almost disjoint halves of the language.

## Rows a port avoided by a design choice the others did not make

- **run-b and run-b2, rows 1 and 3** (chained subscripting, indexed power) — both put the
  algebra on a carrier object with a single two-index subscript `opr[i,j]`, so no
  expression ever chains two subscripts. Ours, astra and blinded all hit it.
- **run-b2, row 22 and 52** (`extends Number` and the library `Vector`/`Matrix`) — it
  wrapped an `Array` in a `value object` and declared `+` and juxtaposition as functional
  methods (row 117), so it never needed the illegal `extends Number` our arc leaned on,
  nor the library's sealed carriers. run-b avoided the same rows with a plain user carrier.
- **run-b and run-b2, rows 23 and 25** (`nat`-parameterised shapes) — both recover extents
  from the array at run time (`a.bounds.extent.get`), so neither needed a `nat` static
  parameter. Blinded, which spelled shapes as types, hit both.
- **astra, row 47** (the generator protocol from `ZeroIndexed`) — its `Vec(n, f)` carrier
  ranges over `0#x.n` explicitly, so it never asked for `u <- x`; ours, blinded and run-b
  did, and run-b then hit the abstract-subscript defect behind it (row 100).
- **astra, row 59** (updates lost in a parallel `for`) — it made the reverse pass
  deliberately sequential. run-b and run-b2 both ran at one thread, where the defect is
  invisible.
- **astra, row 106** (matrix pasting) — it built concatenation out of `DIV`/`MOD`
  arithmetic instead of an array literal, and never reached the paste. run-b and run-b2
  both hit it; run-b2 then routed around it with a `fill` over an index map.
- **run-b2, rows 54 and 56** (views and range subscripts) — it splits and concatenates by
  `fill`, so it needed neither a view that is a `Vector` nor the commented-out
  pair-of-ranges subscripts; run-b hit both, and declared `Q[:, c]` itself (row 110).
- **run-b2, row 96** (the covariant-collection join) — it builds parameter records by a
  fold of `Map.union` (row 134); run-b wrote the comprehension and hit the failure.
- **run-b, row 112** (a `value` object's mutable fields) — it used reference objects for
  graph nodes throughout, so the unenforced valueness rule never touched it, though its
  worker did hit the equality half (row 113).
- **run-b2, row 100** (the abstract `opr[Range]` on `ZeroIndexed`) — its `Mat` implements
  `Generator` directly instead of mixing in `ZeroIndexed`/`DelegatedIndexed`.
- **run-b and run-b2, row 62; run-b2, row 15** (Fortify double subscripts, `W_1`) — both
  named their variables `xh`, `w1`, `d_k`, `x17` from the start, having the earlier runs'
  ledger to read; blinded and astra found the wall.

