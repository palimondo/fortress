<!-- Which ledger row each microGPT port hit. Marks are read off the ledger's
     `found by` column, explorations/blinded-fable/notes/gaps.md, Astra's table in
     explorations/astra/worker/main/ARTICLE.md, and the runs' own tables
     (run-b/gaps.md, run-b2/gaps.md, run-c/gaps.md, run-c/design.md,
     run-c3/gaps.md, run-c4/gaps.md with run-c4/design.md and the addendum to
     reviews/run-c2-vs-run-c3.md, and apl/gaps.md). No new claims are made here;
     every row is a row of explorations/fortress-gap-ledger.md. -->

# Which gap each port hit

Nine ports and rounds of microGPT (and its neighbours) have now been made in this tree,
beside one exploration that is not a port at all, and each met a different subset of the
same 255 language, library, interpreter and typesetter gaps. This file is the
cross-tabulation: one line per ledger row that at least
one port reached, one column per port — `ours` (this repository's own rounds, reviews and probe
arcs counted as one), `astra` (the independent Astra run), `blinded` (the blinded Fable
run), `run-b` and `run-b2` (the two array-of-nodes ports), `run-c` (the flat-array
port after Hsu), `run-c2` (that port's second round, the same program rewritten with a
rank-generic algebra and a rank-3 attention block), `run-c3` (an independent third
flat-array port), `run-c4` (the synthesis of C2 and C3, the APL round's target program)
and `apl` (the APL-in-Fortress side quest, six rungs of a sub-language rather than a
port: the column marks every row that quest contributed and every existing row its own
table cites by number). **hit** means the port met the
gap and recorded it; **avoided (…)** means the port never met it because of a design
choice, named in the parenthesis, that its own artifacts show; **—** means not reached.
An `avoided` mark is a claim about the port's route, not about the gap: the gap is still
there. Marks come from the sources named in the comment above, not from fresh runs; the
ledger is where the evidence for each row lives. The `run-c2` and `run-c3` columns are
read the same way: a `hit` is a row the ledger's `found by` credits to that run, or one
its own table records meeting again. So is `run-c4`, whose hits are its own four rows
(175-178) and the seven rows its design note names as adopted or met (21, 102, 130, 131,
133, 152, 161); rows 144 and 158 are marked *avoided* there because C4 exported a
`transpose` function from the start rather than meeting the error again. The `apl`
column is 94 hits: the 78 rows the side quest contributed (179-256) and the 16 existing
rows its notes cite or that a folded APL row was merged into (7, 23, 30, 44, 47, 54, 55,
89, 97, 98, 109, 131, 132, 145, 147, 157).

| row | claim | ours | astra | blinded | run-b | run-b2 | run-c | run-c2 | run-c3 | run-c4 | apl |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `x[i][j]` is grammatical and left-associative, but the walk interpreter invokes the first subscript with an em … | hit | hit | hit | avoided (carrier) | avoided (carrier) | — | — | — | — | — |
| 2 | the same defect silently returns the wrong element when the subscript has more than one index: `m[3,7]^2` eval … | hit | — | — | — | — | — | — | — | — | — |
| 3 | `x[i]^2` (subscript then superscript) fails the same way | hit | hit | hit | avoided (carrier) | avoided (carrier) | — | — | — | — | — |
| 4 | `f()[i]` (call then subscript) is a static error by specification, not an implementation defect | — | — | hit | — | — | hit | — | — | — | — |
| 5 | U+2211 `∑` lexes as a prefix operator, never as an accumulator; only ASCII `SUM` is a big operator | hit | — | — | — | — | — | — | — | — | — |
| 6 | a reduction is a `FlowExpr`: it cannot be an operand of an infix operator without parentheses | hit | — | — | — | — | — | — | — | — | — |
| 7 | an all-uppercase word with ≥2 distinct letters (`BOS`, `GPT`) is an operator word, not an identifier | — | — | hit | — | hit | — | — | — | — | hit |
| 8 | `value`, `at`, `type`, `unit`, `of`, `most` … are reserved words | — | — | hit | — | — | hit | — | — | — | — |
| 9 | a two-line `a \|\| b` does not parse, with the `\|\|` at the end of the first line or at the start of the seco … | — | — | hit | hit | — | — | — | — | — | — |
| 10 | `do … end` is allowed as a comprehension body | hit | — | hit | — | — | — | — | — | — | — |
| 11 | objects may not declare varargs constructor parameters | — | — | hit | hit | — | — | — | — | — | — |
| 12 | static arguments inside an array literal (`[\T\ …]`) are in the spec grammar but not parsed | hit | — | — | — | hit | — | — | — | — | — |
| 13 | import aliasing is unusable: the spec's `as` form is a parse error, the implementation's `=>` form parses but … | hit | — | — | — | — | — | — | — | — | — |
| 14 | there is no exponent notation in numerals (`1e-5`) | — | — | hit | — | — | — | — | — | — | — |
| 15 | `W_1` is not an identifier: `_1` is read as a radix specifier and radix 1 is a static error | hit | — | — | — | avoided (naming) | — | — | — | — | — |
| 16 | `10.0^(-5)`, `0.00001`, radix numerals (`7fff_16`), and letter-subscripted names (`W_q`, `w17`) all work | hit | — | — | hit | — | — | — | — | — | — |
| 17 | the spec's declaration-site covariance idiom `trait C[\S\] extends C[\T\] where {S extends T}` is rejected: wh … | hit | — | — | — | — | — | — | — | — | — |
| 18 | `type` aliases are specified and unimplemented | hit | — | — | — | hit | — | — | hit | — | — |
| 19 | coercion declarations parse and are then ignored by both walk and typecheck | hit | — | — | — | — | hit | — | — | — | — |
| 20 | an aggregate's element type is computed from the elements' runtime class, and `List` is invariant, so … | hit | — | hit | hit | hit | — | — | hit | — | — |
| 21 | static arguments on a generic *method* cannot be inferred (`x.zip(y)` needs `x.zip[\V\](y)`); return types on … | hit | — | — | — | avoided (untyped closures) | — | — | — | hit | — |
| 22 | `comprises` is never checked on the walk path, so the illegal `object Value … extends Number` is accepted and … | hit | hit | — | avoided (user carrier) | avoided (value object) | — | — | — | — | — |
| 23 | `T[n]` with a `nat` parameter does not unify with a runtime-built array; a literal size does | — | — | hit | avoided (runtime extents) | avoided (runtime extents) | — | — | — | — | hit |
| 24 | `T^n` parses as a type but denotes the `Number`-only library `Vector`/`Matrix` | — | — | hit | — | — | — | — | — | — | — |
| 25 | a `nat` static argument can never be a value name; `NatReflect.reflect` + one hoisted generic per shape is the … | hit | — | — | avoided (runtime extents) | avoided (runtime extents) | hit | — | — | — | — |
| 26 | dimensions and units: the type grammar and AST are implemented, nothing evaluates, and the typechecker throws … | hit | — | — | — | — | — | — | — | — | — |
| 27 | `dim X` without a `default` unit is unwritable — a null dereference in the error path of an *optional* clause | hit | — | — | — | — | — | — | — | — | — |
| 28 | a user object with a `nat` static parameter and dimension-checked `+` works today | hit | — | — | — | — | — | — | — | — | — |
| 29 | multifix dispatch is absent: the interpreter never looks for an *n*-argument definition, it reassociates to bi … | hit | — | — | — | — | — | — | — | — | — |
| 30 | a top-level `opr` declaration is component-scoped: library generic code cannot see it and silently falls back … | hit | — | — | — | — | — | — | — | — | hit |
| 31 | a functional method does cross the component boundary: the same program with `opr +(self, other: W)` declared … | hit | — | — | — | — | — | — | — | — | — |
| 32 | "the library cannot call the user's `opr +` at all" | hit | — | — | — | — | — | — | — | — | — |
| 33 | both juxtaposition directions (`M v` and `v M`) coexist when the two carriers are unrelated object types, or a … | hit | hit | hit | — | — | — | — | — | — | — |
| 34 | postfix `^T` is a declarable operator and runs | hit | — | — | hit | hit | hit | hit | hit | — | — |
| 35 | the library ships none of the three matrix operators the spec promises: `M^T`, `M^k`, `‖M‖` | hit | hit | hit | hit | hit | hit | hit | hit | — | — |
| 36 | `AdditiveGroup` / `MultiplicativeRing` inheritance gives a user type binary `-`, unary `-`, `zero`, juxtaposit … | hit | — | — | — | — | — | — | — | — | — |
| 37 | the algebraic-constraints library the spec devotes 1894 lines to (`Monoid`, `Group`, `Ring`, `Field` … | hit | — | — | — | — | — | — | — | — | — |
| 38 | a user `opr SQRT(V)` coexists with the library's `Number.SQRT` | hit | — | — | — | — | — | — | — | — | — |
| 39 | the spec's single-declaration big-operator form (`opr BIG Op[\T\](g:(Reduction[\R0\],T->R0)->R0):R`) does not … | hit | — | — | hit | hit | — | — | — | — | — |
| 40 | consequently a big-operator name admits exactly one declaration per program: Σ is not extensible by addition | hit | hit | hit | hit | hit | — | — | — | — | — |
| 41 | Σ is extensible by replacement: `import FortressLibrary.{...} except { opr BIG + }` plus a reduction object an … | hit | hit | hit | hit | — | — | — | — | — | — |
| 42 | `except { opr SUM }` is a syntax error; `except { opr ∑ }` parses; only `opr BIG +` actually works | hit | hit | hit | — | — | — | — | — | — | — |
| 43 | extension by addition does work for `BIG MAX`: one trait declaration (`extends StandardMax[\V\]` + `opr MAX`) … | hit | — | — | — | — | — | — | — | — | — |
| 44 | the shipped `SUM` is sealed twice over — `[\T extends Number\]` and an `unwrap` that is `cast[\Number\]` — so … | hit | hit | hit | hit | avoided (own carrier) | — | — | — | — | hit |
| 45 | `SumReduction.empty()` is the numeric `0`, monomorphic in `Number`, so an empty Σ over a user type yields … | hit | — | — | hit | — | — | — | — | — | — |
| 46 | a user `CommutativeMonoidReduction[\T\]` driven by `__generate`, or wrapped in a user `opr BIG OPLUS`, gives p … | hit | — | — | — | — | — | — | — | — | — |
| 47 | a user carrier gains the whole generator protocol (`\|x\|`, `x[i]`, `x[r]`, `u <- x`, comprehensions … | hit | avoided (explicit range) | hit | hit | — | — | — | — | — | hit |
| 48 | multi-generator, multi-level comprehensions preserve natural order | hit | — | — | — | — | — | — | — | — | — |
| 49 | an array literal with no declared LHS type fails: the element-type join was intended and never written | hit | — | — | hit | hit | — | — | hit | — | — |
| 50 | array comprehensions `[ i \|-> e \| i <- g ]` are dead at two layers and have no library big operator | hit | — | hit | — | — | — | — | hit | — | — |
| 51 | the diagonal factory `matrix[\T,n,m\](v)` writes a literal integer `0` off the diagonal | hit | — | — | — | — | — | — | — | — | — |
| 52 | the library's `Vector`/`Matrix` carry a user element type in full — construction, indexing, `M v`, `v M` … | hit | — | — | avoided (user carrier) | avoided (value object) | — | — | — | — | — |
| 53 | the spec-legal alternative (extend the unsealed `AdditiveGroup`/`MultiplicativeRing`) gets … | hit | — | — | — | — | — | — | — | — | — |
| 54 | slices and views (`v[4:7]`, `m[1,:]`, `m[:,j]`, `m[(a,b)#(c,d)]`) are real zero-copy views but extend `Array1` … | hit | — | — | hit | avoided (fill) | — | — | — | — | hit |
| 55 | a ~6-line user object extending `Vector[\RR64,k\]` keeps the view *and* the algebra, legally (`Vector` has no … | hit | — | — | — | — | hit | — | — | — | hit |
| 56 | pair-of-ranges (`m[r0,r1]`) and mixed index/range (`m[i,r]`, `m[r,j]`) subscripts are shipped commented out | hit | — | — | hit | avoided (fill) | — | — | — | — | — |
| 57 | runtime-sized shapes need no `nat` gymnastics: `array[\T\](n)` / `array[\T\](n,m)` yield objects that dispatch … | hit | — | — | hit | hit | hit | — | — | — | — |
| 58 | a bare `RR64` scalar cannot scale a `Vector` of a user element type | hit | — | — | — | — | — | — | — | — | — |
| 59 | a bare `acc := acc + c` inside a parallel `for` silently loses updates; `atomic do … end` is correct; the spec … | hit | avoided (sequential) | — | avoided (one thread) | avoided (one thread) | avoided (disjoint writes) | — | — | — | — |
| 60 | reduction expressions and `__generate` are parallel-safe at 4 threads | hit | — | — | — | — | — | — | — | — | — |
| 61 | `spawn` and `.val()` work on the interpreter path | hit | — | — | — | — | — | — | — | — | — |
| 62 | `x_h[t]` emits `x_{\mathrm{h}}_{t}` — a LaTeX `! Double subscript` error | — | hit | hit | avoided (naming) | avoided (naming) | — | — | — | — | — |
| 63 | `opr ^(a: T, b: T)` swallows the whole parameter list into a superscript | — | — | hit | — | — | — | — | — | — | — |
| 64 | the postfix declaration `opr (m: Mat)^T` typesets correctly as `(m: Mat)^{T}` | hit | — | — | — | — | — | — | — | — | — |
| 65 | `SUM[m <- g] body` typesets as `\sum\limits_{m \leftarrow g}` and `DOT` as `\cdot` | hit | hit | hit | — | — | — | — | — | — | — |
| 66 | numeric subscripts are reachable only on a lowercase-initial name: `w17` → italic `w_{17}`, but `W1` → roman … | hit | — | — | — | hit | — | — | — | — | — |
| 67 | `bin/fortress` hard-codes `-Xmx256m -Xss32m` unless `JAVA_FLAGS` is set; realistic graphs exhaust it | — | — | hit | — | — | — | — | — | — | — |
| 68 | a component's name must equal its file name | hit | — | — | — | — | — | — | — | — | — |
| 69 | `fortress typecheck` is not an oracle for interpreter programs: it checks against … | hit | — | — | — | — | — | — | — | — | — |
| 70 | the compiled path works end to end for what `CompilerLibrary` covers, including implicit tuple parallelism and … | hit | — | — | — | — | — | — | — | — | — |
| 71 | G1 — `import List` is impossible: `CompilerLibrary` has no `HasRank`, `LexicographicOrder`, `Maybe` | hit | — | — | — | — | — | — | — | — | — |
| 72 | G2 — no generic `array[\T\](n)` | hit | — | — | — | — | — | — | — | — | — |
| 73 | G3 — no `exp` / `log` | hit | — | — | — | — | — | — | — | — | — |
| 74 | G4 — no `SUM`, no generic `BIG` operators, no user reductions (`Generator[\T\]`-driven `__bigOperator` is miss … | hit | — | — | — | — | — | — | — | — | — |
| 75 | G5 — `nanoTime()` has a different type on the two paths (`RR64` vs `ZZ64`) | hit | — | — | — | — | — | — | — | — | — |
| 76 | G6 — string juxtaposition inserts spaces on the compiled path, silently changing almost every program's output | hit | — | — | — | — | — | — | — | — | — |
| 77 | G7 — no dynamic dispatch to a method declared only in the subtypes of a `comprises` union | hit | — | — | — | — | — | — | — | — | — |
| 78 | G8 — no multimethod (argument-type) dispatch over a `comprises` union | hit | — | — | — | — | — | — | — | — | — |
| 79 | G9 — `typecase` gives a different, wrong answer on the compiled path, silently | hit | — | — | — | — | — | — | — | — | — |
| 80 | G10 — `case x of <int literal>` compiles clean and throws at run time | hit | — | — | — | — | — | — | — | — | — |
| 81 | G11 — `label` / `exit` is unimplemented in codegen | hit | — | — | — | — | — | — | — | — | — |
| 82 | G12 — `spawn` produces an unusable thread handle (`Thread[\T\]` is declared only in the interpreter builtin) | hit | — | — | — | — | — | — | — | — | — |
| 83 | `nat`-generic functions mis-unify on a second instantiation when called through an exported API | — | — | hit | — | — | avoided (runtime-sized API) | — | — | — | — |
| 84 | a superscript or postfix operator may not follow a dotted access: `x.v^T`, `B.data^T`, `B.n^2`, `B.data^*`, an … | — | — | — | hit | hit | — | — | — | — | — |
| 85 | a prefix operator application as the second operand of a juxtaposition (`"text " SQRT(d)` … | — | — | — | hit | — | — | — | — | — | — |
| 86 | `(x DOT x)/\|x\|` does not lex: `/\|` is taken as one operator token | — | — | — | hit | — | — | — | — | — | — |
| 87 | "a value juxtaposed with a bar-enclosed expression (`w \|hs\|`) is a syntax error" | — | — | — | — | hit | — | — | — | — | — |
| 88 | the tight form `w\|hs\|`, with no space anywhere, does fail — and the fixity table says it should | — | — | — | — | hit | — | — | — | — | — |
| 89 | `-` and `AND` have incomparable precedence, so an expression mixing them across a comparison needs both halves … | — | — | — | — | hit | — | — | — | — | hit |
| 90 | a postfix operator declaration whose operator is `!` needs a space before the return-type colon … | — | — | — | — | hit | — | — | — | — | — |
| 91 | `b.f(3)`, where `f` is a field holding a function, is a method invocation by specification, not an application … | — | — | hit | — | hit | — | — | — | — | — |
| 92 | a local name may not repeat a top-level function name; a *field* of an object may shadow a top-level variable | — | — | — | hit | — | hit | — | hit | — | — |
| 93 | a prime-marked identifier (`X'`) is a legal name | — | — | — | — | hit | — | — | — | — | — |
| 94 | the spec's constant `pi` is not in the default library: it is a `FloatLiteral` in the optional `Constants` API … | — | — | — | hit | — | — | — | — | — | — |
| 95 | the spec's `∞` object never shipped — no Unicode `∞`, no `INFINITY`, no `INF`, no bare `infinity` — but … | — | — | — | hit | hit | — | — | — | — | — |
| 96 | a map or list comprehension whose values are two `nat` instantiations of one generic object fails inside the l … | — | — | — | hit | avoided (fold of union) | — | hit | — | — | — |
| 97 | two overloads whose parameter types are unrelated — two instantiations of the library's `Array` ( … | — | — | — | hit | hit | — | — | — | — | hit |
| 98 | that rejection is cache-dependent: it fires only when the component has no entry in … | hit | — | — | — | — | — | — | — | — | hit |
| 99 | overloads the Meet Rule does accept, all four verified: the library's generic `Vector[\RR64,n\]` and … | — | — | — | hit | hit | hit | — | — | — | — |
| 100 | a carrier that mixes in `ZeroIndexed`/`DelegatedIndexed` inherits an abstract `opr[r: Range[\ZZ32\]]`, which i … | — | — | — | hit | avoided (own generate) | — | — | — | — | — |
| 101 | `BIG UNION` cannot be used in a component that imports both `Set.{...}` and `Map.{...}`: each declares the nul … | — | — | — | hit | — | — | — | — | — | — |
| 102 | the prefix form `BIG MAX g` finds no applicable overload for any `Generator[\RR64\]`, a library vector include … | — | — | — | hit | — | — | — | hit | hit | — |
| 103 | with `except { opr BIG + }`, a single user nullary `opr SUM(): BigReduction[\Any,Any\]` whose `join` dispatche … | — | — | — | hit | — | — | — | — | — | — |
| 104 | an array literal assigned to a variable declared with a runtime-sized type (`Array[\RR64,ZZ32\]` … | — | — | — | hit | — | — | — | — | — | — |
| 105 | vector pasting `[ u v ]` works, at runtime sizes too, when the left-hand type has a literal size | — | — | — | hit | — | — | — | — | — | — |
| 106 | a paste whose block grid has a single row or a single column of matrix elements always fails the extent check … | — | avoided (arithmetic) | — | hit | hit | — | — | hit | — | — |
| 107 | a two-dimensional grid of square blocks pastes correctly; the same shape with non-square blocks throws an unca … | — | — | — | — | hit | — | — | — | — | — |
| 108 | matrix unpasting is not implemented, in either spelling | — | — | — | hit | hit | — | — | — | — | — |
| 109 | `Matrix` has no elementwise product, though `Vector` has `pmul` | — | — | — | hit | avoided (own ODOT) | — | — | — | — | hit |
| 110 | a user object may declare `opr [_: TrivialOpenRange, c: Range[\ZZ32\]]` and be called as `Q[:, c]`, with … | — | — | — | hit | — | — | — | — | — | — |
| 111 | `for c <- s` over a `String` is a parallel, unordered generator: at one thread it silently prints the string b … | — | — | — | — | hit | — | — | — | — | — |
| 112 | a `value` object may declare a `var` field; the interpreter accepts it, mutates it in place, and the object th … | — | — | — | avoided (reference objects) | hit | — | — | — | — | — |
| 113 | `SEQV` (`===`) on two value objects compares only the fields the object *body* declares — with none, it compar … | — | — | — | hit | hit | — | — | — | — | — |
| 114 | the library ships that defect: `Just(1) SEQV Just(2)` is `true`, while `Just(1) = Just(2)` is `false` | — | — | — | — | hit | — | — | — | — | — |
| 115 | value traits work, and the one valueness rule that *is* enforced is the trait rule: a reference object extendi … | — | — | — | — | hit | — | — | — | — | — |
| 116 | the spec's `settable` abbreviation on a value object works: `z.im := 7.0` rebuilds the object | — | — | — | — | hit | — | — | — | — | — |
| 117 | a value object carrying an `Array[\RR64,(ZZ32,ZZ32)\]` field, with `opr +` and `opr juxtaposition` as function … | — | — | — | — | hit | — | — | — | — | — |
| 118 | function and method contracts are implemented and enforced: `requires`, `ensures … provided …` and `invariant` … | — | — | — | hit | hit | — | — | — | — | — |
| 119 | a bare `ensures { e }` — the `provided` subclause omitted, as the spec's own grammar allows — crashes the desu … | — | — | — | — | hit | — | — | — | — | — |
| 120 | `test` functions run under `fortress test`, in declaration order, and a failing `assert` aborts the run; the … | — | — | — | — | hit | — | — | — | — | — |
| 121 | the spec's generator form of a test declaration, `test Id[gens] = Expr`, is unimplemented, and fatal to the co … | — | — | — | — | hit | — | — | — | — | — |
| 122 | `property` declarations are unimplemented, at top level and inside an object | — | — | — | hit | hit | — | — | — | — | — |
| 123 | `TestSuite`, the library object the spec devotes a section to, does not ship | — | — | — | — | hit | — | — | — | — | — |
| 124 | field, getter and setter declarations must precede every method declaration in an object body | — | — | — | hit | hit | — | — | — | — | — |
| 125 | a `property` placed after a method is rejected by that same ordering check, although the grammar puts … | — | — | — | — | hit | — | — | — | — | — |
| 126 | inside an object, a getter is not reachable by its naked name from a method; `self.g` is | — | — | — | hit | — | — | — | — | — | — |
| 127 | the fields of an object expression are registered as top-level names, so two object expressions declaring the … | — | — | — | — | hit | — | — | — | — | — |
| 128 | a getter declared in an object expression that sits inside a `do` block is rejected as a local function declar … | — | — | — | — | hit | — | — | — | — | — |
| 129 | a lazily allocated adjoint — a `Maybe` field with a getter returning a fresh zero and a setter — lets … | — | — | — | hit | — | — | — | — | — | — |
| 130 | a trailing varargs parameter of a *trait* type, after a closure parameter, receives zero to n objects of diffe … | — | — | — | hit | — | — | hit | — | hit | — |
| 131 | function-expression parameters may be written without types: `fn (C_bar) => …`, including one stored in an obj … | — | — | — | — | hit | — | — | — | hit | hit |
| 132 | an API can export an object whose operators are functional methods: `opr +`, `opr juxtaposition` and … | — | — | — | — | hit | — | — | — | — | hit |
| 133 | a postfix operator declaration cannot be written in an API at all, in either spelling | — | — | — | — | hit | — | hit | hit | hit | — |
| 134 | `Map.union(f, other)` with a three-argument combining function works, including over matrix-valued maps; bare … | — | — | — | — | hit | — | — | — | — | — |
| 135 | `BIG UNION` over a generator of maps fails unless the static arguments are given explicitly | — | — | — | — | hit | — | — | — | — | — |
| 136 | a `Map` is a generator of `(key, value)` pairs in `for`, in a list comprehension and in a map comprehension, a … | — | — | — | — | hit | — | — | — | — | — |
| 137 | a user big operator over maps — `BIG MERGE`, reducing a generator of gradient environments by *summing* overla … | — | — | — | — | hit | — | — | — | — | — |
| 138 | `s.indexOf(c)` on a `String` returns a `Maybe[\ZZ32\]`, and the surrounding idioms (`.holds`, `.get` … | — | — | — | — | hit | — | — | — | — | — |
| 139 | the functional-backprop shape (every node carries a map from its cotangent to the parameter cotangents, sharin … | — | — | — | hit | — | avoided (no graph) | — | — | — | — |
| 140 | the library's `strToFloat` mis-parses a sign and overflows on a long mantissa: `strToFloat "-1.5"` is `-28.5` … | — | — | — | — | — | hit | — | — | — | — |
| 141 | `String.split()` is not a tokenizer: on a flat string it yields no pieces; it is the rope's structural subdivision | — | — | — | — | — | hit | — | — | — | — |
| 142 | a typed array literal as a top-level declaration is bound as a tuple, while the same declaration inside a function body works | — | — | — | — | — | hit | — | — | — | — |
| 143 | the wildcard `_` is not an assignment target: `(a, _) := pair()` is a Syntax Error; the tuple binding `(a, _) = pair()` works | — | — | — | — | — | hit | — | — | — | — |
| 144 | a function call immediately followed by a postfix or superscript operator is the static error of row 4 | — | — | — | — | — | hit | hit | hit | avoided (transpose function) | — |
| 145 | `AND` and `OR` evaluate both operands; the conditional forms `AND:` and `OR:` short-circuit | — | — | — | — | — | hit | — | — | — | hit |
| 146 | a `ZZ64` variable initialised from an integer literal holds a `ZZ32` and wraps at 2^31; from a `ZZ64` expression it does not | — | — | — | — | — | hit | — | — | — | — |
| 147 | inside an object extending `Matrix`, a parameter named `t` collides with the inherited `t()`; a local `big` with `ZZ`'s `big` | — | — | — | — | — | hit | — | hit | — | hit |
| 149 | a postfix operator with static parameters places them after the operator symbol; the prefix placement is a Syntax Error | — | — | — | — | — | hit | — | — | — | — |
| 150 | a six-line object extending `Matrix[\RR64,r,c\]` over a slice of a `Vector`, its shape from `reflect`, is a full `Matrix` | — | — | — | — | — | hit | — | — | — | — |
| 151 | a component may export `Executable` and its own API on two lines, and an importer calls its runtime-typed API at two sizes | — | — | — | — | — | hit | — | — | — | — |
| 152 | top-level values are initialised at component load in declaration order, a file-reading tuple binding included | — | — | — | — | — | hit | hit | — | hit | — |
| 153 | the declared return type of a `fill` function is not enforced: an `RR64` matrix silently holds `ZZ32` values | — | — | — | — | — | hit | — | — | — | — |
| 154 | the library matrix product costs tens of microseconds per multiply-add in the walk interpreter, and hand-written products are no faster | — | — | — | — | — | hit | — | — | — | — |
| 155 | a parallel `for` whose iterations write disjoint blocks of shared matrices through views gives the same results at 4 threads as at 1 | — | — | — | — | — | hit | hit | hit | — | — |
| 156 | a `nat`-generic function is not a value: passed as an argument it fails at the call with three different … | — | — | — | — | — | — | hit | hit | — | — |
| 157 | `Any` as a parameter type or as the return type of a `nat`-generic function is `InterpreterBug: Missing … | — | — | — | — | — | — | hit | — | — | hit |
| 158 | a parenthesised call followed by `^T` — `(onehot(ks, 5))^T dx`, and `((onehot(ks, 5))^T) dx` — is still row … | — | — | — | — | — | — | hit | hit | avoided (transpose function) | — |
| 159 | two `opr` declarations of one operator that are both generic are rejected at declaration unless some … | — | — | — | — | — | — | hit | — | — | — |
| 160 | the prefix reduction `SUM v` over a library `RR64` vector works and equals `SUM[t <- v] t`, unlike the prefix … | — | — | — | — | — | — | hit | — | — | — |
| 161 | one top-level `opr` declaration generic in the index type — `opr +[\I\](a: Array[\RR64,I\], s: RR64)`, and … | — | — | — | — | — | — | hit | — | hit | — |
| 162 | `fail(msg)` ends the interpreter with exit status 1, after `FAIL: msg`, a `FailCalled` context and the usual … | — | — | — | — | — | — | hit | hit | — | — |
| 163 | the attention block written as rank-3 views with a batched product (`+.×⍤2` as one `opr juxtaposition` over … | — | — | — | — | — | — | hit | — | — | — |
| 164 | two overloads that differ only in the arrow type of a function parameter are resolved by a typed lambda but … | — | — | — | — | — | — | — | hit | — | — |
| 165 | an operator is not a function value: `applyIt(opr ×, a, b)` is `Operator declarations are not allowed in … | — | — | — | — | — | — | — | hit | — | — |
| 166 | static parameters placed after the value parameters of an ordinary function (`f(x: ZZ32)[\nat n\]`) are a … | — | — | — | — | — | — | — | hit | — | — |
| 167 | a top-level value may not share its name with a `nat` static parameter of a function declared in the same … | — | — | — | — | — | — | — | hit | — | — |
| 168 | row 92's rule holds inside api files too: an api that declares `rows(n: ZZ32): ZZ32` and `area(rows: ZZ32, … | — | — | — | — | — | — | — | hit | — | — |
| 169 | a rank-2 indexed assignment takes two scalar indices only: `out[i, 0#cols] := y`, a vector into a row, is … | — | — | — | — | — | — | — | hit | — | — |
| 170 | a vector is written into row *i* of a matrix by `Row(out, i).assign(y)`, and a matrix into a view of a flat … | — | — | — | — | — | — | — | hit | — | — |
| 171 | overload resolution does distinguish declarations that differ only in the arrow type of a function parameter … | — | — | — | — | — | — | — | hit | — | — |
| 172 | twenty-four user operator overloads declared at top level over `Vector[\RR64,n\]` and `Matrix[\RR64,r,c\]` — … | — | — | — | — | — | — | — | hit | — | — |
| 173 | an object declared in an api — constructor parameters and all its methods — is constructed in the exporting … | — | — | — | — | — | — | — | hit | — | — |
| 174 | `/` on two `ZZ32`s yields a rational: `7 / 2` prints `7/2`, so a learning-rate schedule written `s / … | — | — | — | — | — | — | — | hit | — | — |
| 175 | top-level declarations may be written untyped and several to a line, separated by semicolons: `nEmbd = 16; block … | — | — | — | — | — | — | — | — | hit | — |
| 176 | a named function may be declared with untyped parameters, at top level (`rmsn(x) = x / SQRT (…)`) and locally (` … | — | — | — | — | — | — | — | — | hit | — |
| 177 | a mutable local needs its declared type: `p := loadParams(…)` with no prior declaration is `Variable p is not de … | — | — | — | — | — | — | — | — | hit | — |
| 178 | the component need not repeat the parameter types of functions the api declares: `matName(i) = …`, `step(p, b) = … | — | — | — | — | — | — | — | — | hit | — |
| 179 | whitespace in a grammar production is optional at the use site: a literal space between symbols and an explicit … | — | — | — | — | — | — | — | — | — | hit |
| 180 | one production serves `f/` for every function glyph: a glyph-table gap followed by the reduce slash, and the sam … | — | — | — | — | — | — | — | — | — | hit |
| 181 | a backtick escape in a production — required for the macro language's own special characters, among them APL's ` … | — | — | — | — | — | — | — | — | — | hit |
| 182 | an `Id` gap cannot be spliced into an expression position, parenthesised or bare | — | — | — | — | — | — | — | — | — | hit |
| 183 | an `Expr` gap is greedy and Rats never re-enters a nonterminal for a shorter match, so an undelimited `Expr` gap … | — | — | — | — | — | — | — | — | — | hit |
| 184 | applying a host-known operator (`≡`, i.e. `EQV`) to a user object that has no such definition raises an Interpre … | — | — | — | — | — | — | — | — | — | hit |
| 185 | APL's `≡` and `≢` (U+2261, U+2262) are in the host operator table and are user-definable as ordinary infix opera … | — | — | — | — | — | — | — | — | — | hit |
| 186 | a template cannot expand to an assignment: there is no gap position on the left of `:=` | — | — | — | — | — | — | — | — | — | hit |
| 187 | a `NOT` predicate inside a group under a repetition (`{ NOT ⦈ _ }*`) does not bound the repetition: the generate … | — | — | — | — | — | — | — | — | — | hit |
| 188 | `RR64.truncate()` is declared in the library's api but has no implementation at run time | — | — | — | — | — | — | — | — | — | hit |
| 189 | integers can nevertheless be printed as integers at user level: the floor bracket's `ZZ64` stringifies without a … | — | — | — | — | — | — | — | — | — | hit |
| 190 | a grammar api and its stub component may live in a different directory from the component that uses them, but se … | — | — | — | — | — | — | — | — | — | hit |
| 191 | `fortress parse FILE` checks the preparser and parser in ~0.6 s — the only fast check for a grammar api — but it … | — | — | — | — | — | — | — | — | — | hit |
| 192 | Dyalog's matrix display falls out of the library: `BIG \|\|\|` per row, `BIG //` per matrix, each column padded … | — | — | — | — | — | — | — | — | — | hit |
| 193 | a nonterminal's name may not be a word of two or more uppercase letters: such a word is an operator, not an iden … | — | — | — | — | — | — | — | — | — | hit |
| 194 | a bare identifier can be a terminal of a sub-grammar after all — not by splicing an `Id` gap (gap row 182) but b … | — | — | — | — | — | — | — | — | — | hit |
| 195 | with the name spelled, APL's assignment arrow works at user level: `v ← 9 2 6` is the book's own line, its value … | — | — | — | — | — | — | — | — | — | hit |
| 196 | a template cannot expand to a declaration either, and the reason is sharper than gap row 186's: the template par … | — | — | — | — | — | — | — | — | — | hit |
| 197 | a `*`-repeated gap spliced with `` carries a list of arbitrary arity into the expansion, so a `;`-separated inde … | — | — | — | — | — | — | — | — | — | hit |
| 198 | an enclosure and a vector of coordinate vectors in an index position can be absorbed by the grammar, so APL's sc … | — | — | — | — | — | — | — | — | — | hit |
| 199 | the flat carrier's wall is the element type: `AplArr`'s elements are `RR64`, so no element can be an array, and … | — | — | — | — | — | — | — | — | — | hit |
| 200 | a string literal has no `\u` escape (only `\b \t \n \f \r \" \\` and the curly quotes), so a glyph has to stand … | — | — | — | — | — | — | — | — | — | hit |
| 201 | an `Id` gap does work spliced into a lambda parameter, the one binding position the design has, and the name is … | — | — | — | — | — | — | — | — | — | hit |
| 202 | a name cannot be read through a gap, in any position: sharpening gap row 182 with a third distinct failure. As t … | — | — | — | — | — | — | — | — | — | hit |
| 203 | a terminal that is a valid identifier becomes a keyword of the whole language: it is made a `KeywordSymbol` and … | — | — | — | — | — | — | — | — | — | hit |
| 204 | hygiene is implemented, and it is exactly what forbids an expander-written preamble: a binder written as a liter … | — | — | — | — | — | — | — | — | — | hit |
| 205 | a template can expand to an assignment after all, if the left of `:=` is a literal name of the template rather t … | — | — | — | — | — | — | — | — | — | hit |
| 206 | the host may declare the sub-language's variables, and then both sides see them: the sub-language reads and writ … | — | — | — | — | — | — | — | — | — | hit |
| 207 | on the lambda route a name can be bound once per block and no more, and the host may not already have it: a seco … | — | — | — | — | — | — | — | — | — | hit |
| 208 | a sub-language can have statements: `⋄` as an ordinary terminal separates them, and so does a line break in the … | — | — | — | — | — | — | — | — | — | hit |
| 209 | an extension form can be entered by a keyword and left by the end of the line, with no closing bracket: `NEWLINE … | — | — | — | — | — | — | — | — | — | hit |
| 210 | a form with no terminator at all parses, and silently runs onto the next line whenever that line can extend the … | — | — | — | — | — | — | — | — | — | hit |
| 211 | the preparser's delimiter check is dead in every grammar that splices a repeated gap: the token scan stops at th … | — | — | — | — | — | — | — | — | — | hit |
| 212 | `#` after a symbol is the deletion of the optional-whitespace nonterminal that the following space would have in … | — | — | — | — | — | — | — | — | — | hit |
| 213 | a static error inside an expansion is reported against the grammar api, at line 1 column 2, not at the use site … | — | — | — | — | — | — | — | — | — | hit |
| 214 | rank overloading does work through `Vector`/`Matrix`, and the `nat` is inferred from a runtime-built array: `f(x … | — | — | — | — | — | — | — | — | — | hit |
| 215 | a top-level `opr` declared in an api does reach an importing component | — | — | — | — | — | — | — | — | — | hit |
| 216 | the fixity inventory for APL's glyphs: `× ÷ - + * ⊖ ⊂ ⊃ ≡ ≢ ∘` each take a prefix and an infix declaration, so A … | — | — | — | — | — | — | — | — | — | hit |
| 217 | an open parenthesis immediately followed by `*` opens a comment, and Fortress comments nest, so a prefix `*` app … | — | — | — | — | — | — | — | — | — | hit |
| 218 | a comparison glyph can be redeclared with a non-Boolean result: `opr =` over two vectors returning APL's 0/1 arr … | — | — | — | — | — | — | — | — | — | hit |
| 219 | an element type outside the numeric tower cannot join a rank-overloaded family: a `Char` array parameter (`Array … | — | — | — | — | — | — | — | — | — | hit |
| 220 | a `requires` contract on a top-level generic operator fires through a macro expansion, as a catchable `CallerVio … | — | — | — | — | — | — | — | — | — | hit |
| 221 | a library array is already a full generator: `\|v\|`, `v[i]`, `u <- v`, comprehensions, `SUM`, `BIG MAX`, `PROD` … | — | — | — | — | — | — | — | — | — | hit |
| 222 | a template may expand to a host operator application, prefix or infix, with the operator characters unescaped in … | — | — | — | — | — | — | — | — | — | hit |
| 223 | dyadic `⍴` is the one APL primitive whose result rank is a run-time value (the length of its left argument); fix … | — | — | — | — | — | — | — | — | — | hit |
| 224 | an APL array is mutable through a `Vector`/`Matrix` parameter: `v.put(i,x)` and `m.put((i,j),x)` on a parameter … | — | — | — | — | — | — | — | — | — | hit |
| 225 | overloading on the INDEX's rank works: `f(v: Vector, i: RR64)` beside `f(v: Vector, i: Vector[\RR64,t\])` is acc … | — | — | — | — | — | — | — | — | — | hit |
| 226 | a row or column view with `nat`s inferred from a runtime-built matrix keeps the vector algebra that the library' … | — | — | — | — | — | — | — | — | — | hit |
| 227 | a sub-language comment may follow a non-final statement if its tail is bounded by the end of the line — `NOT ⦈# … | — | — | — | — | — | — | — | — | — | hit |
| 228 | a line break does not separate statements when the next line can extend the previous phrase: `n ← 3 3⍴4 1 6 5 2 … | — | — | — | — | — | — | — | — | — | hit |
| 229 | a use of an expander that matches no production is not reported as a syntax error at all: the bracketed text is … | — | — | — | — | — | — | — | — | — | hit |
| 230 | a missing rank overload reached through an expansion surfaces as a host *unification* error against the grammar … | — | — | — | — | — | — | — | — | — | hit |
| 231 | APL's INDEX ERROR and LENGTH ERROR are `requires` contracts on the indexing functions, firing through the expans … | — | — | — | — | — | — | — | — | — | hit |
| 232 | the chapter's remaining glyphs are all usable terminals: `~ ∊ ∪ ∩ ↑ ↓ ⍋ ⍒ ⍟ ⍪ ≠ ∧ ∨ < >` need no escape at all, … | — | — | — | — | — | — | — | — | — | hit |
| 233 | the host operator table admits the rest of APL's dyadic glyphs: `≠ < > ≥ ∧ ∨` take infix declarations that retur … | — | — | — | — | — | — | — | — | — | hit |
| 234 | an untyped host lambda is a first-class glyph value and still dispatches on rank at the call: `fn (x, y) => x × … | — | — | — | — | — | — | — | — | — | hit |
| 235 | a gap is greedy inside a delimited rule as well: `( a:AplE SPACE , SPACE b:AplE ) ⍴ r` never matches once the gr … | — | — | — | — | — | — | — | — | — | hit |
| 236 | a rule whose left argument is parenthesised must stand above the plain rule for the same glyph: below it, `AplAt … | — | — | — | — | — | — | — | — | — | hit |
| 237 | a component-level `opr` whose parameter types are exactly a library operator's but whose result type differs is … | — | — | — | — | — | — | — | — | — | hit |
| 238 | row 228 widens with the glyph set: a line break fails to separate two statements whenever the next line begins w … | — | — | — | — | — | — | — | — | — | hit |
| 239 | a use of the expander cannot be an operand of a juxtaposition: `("" apl⦇ 5 ⦈)` is `Variable apl is not defined`, … | — | — | — | — | — | — | — | — | — | hit |
| 240 | an overloaded function whose declared RESULT type is `Any` does not dispatch: every call is `Failed to find any … | — | — | — | — | — | — | — | — | — | hit |
| 241 | rows 228 and 238 widen once more: a line break does not separate two statements when the next line can continue … | — | — | — | — | — | — | — | — | — | hit |
| 242 | `_` is not accepted by an `Id` gap: `_ ← e`, APL's throw-away name, is a Syntax Error where the same line with a … | — | — | — | — | — | — | — | — | — | hit |
| 243 | a name in a template is a free Fortress identifier, and an unbound one is rejected before anything runs — a stat … | — | — | — | — | — | — | — | — | — | hit |
| 244 | a line break inside a production's symbol sequence is not optional whitespace: it is a required line break at th … | — | — | — | — | — | — | — | — | — | hit |
| 245 | every APL function value can be a zero-parameter lambda over one mutable frame stack, and that is the only shape … | — | — | — | — | — | — | — | — | — | hit |
| 246 | rank 3 is a full member of the rank dispatch family, as `Array3[\RR64,0,a,0,b,0,c\]` — there is no rank-3 analog … | — | — | — | — | — | — | — | — | — | hit |
| 247 | the library's `array3[\T,s0,s1,s2\](f)` declares its function argument as `(ZZ32,ZZ32)->T` — a two-argument func … | — | — | — | — | — | — | — | — | — | hit |
| 248 | the result rank of a rank-operator application can be read off the FIRST cell's result by overload resolution: ` … | — | — | — | — | — | — | — | — | — | hit |
| 249 | the shipped library declares no `opr ×` in any arity: APL's `×` between two scalars needs one line of its own, t … | — | — | — | — | — | — | — | — | — | hit |
| 250 | `\` and `.` are plain items of a production and REFUSE the backtick escape: neither is one of the macro language … | — | — | — | — | — | — | — | — | — | hit |
| 251 | a tuple PATTERN in a parameter list is a Syntax Error: `f(g, (a, b, c): (Any, Any, Any))` does not parse, while … | — | — | — | — | — | — | — | — | — | hit |
| 252 | tuples carry a strand of arrays: an overload family DISPATCHES on tuple arity, a tuple is a legal RESULT type of … | — | — | — | — | — | — | — | — | — | hit |
| 253 | rows 228, 238 and 241 widen once more: a line break does not separate two NAMES either, so a strand rule over ev … | — | — | — | — | — | — | — | — | — | hit |
| 254 | the shipped library's `opr DOT` IS APL's inner product and works on runtime-built arrays in all four rank pairs … | — | — | — | — | — | — | — | — | — | hit |
| 255 | row 218 reaches the assemblers: a comparison of two SCALARS is the host's `Boolean` and not APL's 0/1, so a dfn … | — | — | — | — | — | — | — | — | — | hit |
| 256 | a direct grammar rule that reaches a typed library entry costs 3.8x less than the same function through `aplCall … | — | — | — | — | — | — | — | — | — | hit |

## Rows every port hit — the fix priorities

Only one row was met by all eight ports and rounds, and two by five or more of them; all
three are library rather than interpreter defects:

- **35** — the library ships none of the three matrix operators the spec promises
  (`M^T`, `M^k`, `‖M‖`). Every port had to declare its own transpose or work around its
  absence; two of them (astra, blinded) recorded it as impossible rather than declarable
  (row 34). run-c2 and run-c3 met it again from the api side: an exponent postfix
  operator cannot even be *declared* in an api (row 133), so each carries its `^T` in the
  component that uses it.
- **40** — a big-operator name admits exactly one declaration per program, so Σ is not
  extensible by addition. Five of the first six ports met the nullary-registration protocol;
  three of them found the `except { opr BIG + }` replacement independently (row 41).
  run-c is the exception, and so are its second round and run-c3: all three used only the
  shipped `SUM` over `RR64`, so none asked for a second declaration — run-c2 established
  that the prefix form `SUM v` works there too (row 160).

Hit by five or more: **20** (an aggregate's element type comes from the elements'
runtime class, so ascriptions are mandatory in plumbing code) and **40**, five each, and
**34** (postfix `^T` is declarable), six — every port that declared a transpose. Hit by
four: **41**, **44** (the shipped `SUM` is sealed by `[\T extends Number\]` plus a
`cast[\Number\]`), **49** (an array literal with no declared type) and **57**
(runtime-sized shapes need no `nat` gymnastics). Hit by three: **1**, **3** (chained
subscripting and indexed power), **18**, **33**, **39**, **42**, **47**, **50**, **65**,
**92**, **99**, **106**, **133**, **144**, **155**. Rows 35, 40, 44 and 20 are the four that
would have paid for themselves in every port so far; in the worklist they are fixes 8, 6,
3 and 2/10.

## Rows only one port hit — strategy fingerprints

- **ours, 44 rows** — most of them the compiler-path rows (70-82) and the systematic
  probe arcs no port needed: dimensions and units (26, 27), multifix (29),
  the algebraic-constraints library (37), views and slices (54), `typecheck` as an
  oracle (69). This is the fingerprint of surveying rather than porting — plus row 98, the
  cache-dependence of overload checking, which only a merge that re-ran other runs' probes
  could see.
- **astra, 0 rows** — every gap Astra recorded was also met by someone else. Its table is
  seven entries wide and stays inside the intersection: the `Number` seal, the Σ
  collision, transpose, chained subscripting.
- **blinded, 6 rows** — 14 (no exponent notation), 23 and 24 (`T[n]` and `T^n` type
  spellings), 63 (`opr ^(…)` typesetting), 67 (the 256 MB default heap), 83 (the
  `nat`-through-an-API claim, still contested); rows 4 and 8 left this list when run-c
  met them too. The fingerprint of writing the notation first and the program second: it met
  the type-spelling and typesetting walls the others routed around, and it was the only
  port to build a graph big enough to exhaust the heap.
- **run-b, 13 rows** — 85, 86, 94, 100, 101, 103-105, 109, 110, 126, 129, 139 (row 92 left
  this list when run-c met it, rows 96 and 130 when run-c2 did, and row 102 when run-c3
  did). The
  fingerprint of a *tape* engine with user carriers and a replaced Σ: it met the reduction
  and generator protocol (100-103), the row-and-column subscripts a tape needs (110), the
  silent unbound array (104), the lazily allocated adjoint (129), and — uniquely — measured
  why the functional shape it did not choose is exponential (139).
- **run-b2, 26 rows** — 87-90, 93, 107, 111, 112, 114-117, 119-121, 123, 125, 127, 128,
  131, 132, 134-138 (row 133 left this list when run-c2 and run-c3 met it). The
  fingerprint of a *value-object* engine written as an article with contracts
  and tests: the whole value-object group (112, 114-117), the whole test-and-property
  chapter (119-123, 125), object-expression scoping (127, 128), `Map` as the gradient
  environment (134-137), and the API row (132).
- **run-c, 11 rows** — 140-143, 145, 146, 149-151, 153, 154 (rows 144, 147, 152 and 155
  left this list when the second round and run-c3 met them). The fingerprint of a *flat-array* port after
  Hsu's "Designing Your Data": one `Array[\RR64,ZZ32\]` of 4192 parameters, every matrix
  a view into it, no graph and no user carrier. It met the two library string routines a
  loader needs (140, 141), the literal and numeric-literal traps of a program whose
  constants are shapes (142, 146), the naming collisions of an object that extends a
  library trait (147), and — the half no earlier port reached — what a `Matrix` view
  actually supports (150, 155) and what it costs (154).
- **run-c2, 5 rows** — 157, 159, 160, 161, 163. The fingerprint of the *same* port
  rewritten for notational density: it asked what a generic declaration can carry and got
  four answers the first round never needed — `Any` in a generic signature is an
  interpreter bug (157), two generic `opr` declarations of one operator need an excluding
  pair (159), one declaration generic in the index type serves all three ranks (161), and
  the prefix `SUM g` works where row 102's `BIG MAX g` does not (160). Row 163 is the
  practical residue: what a rank-3 attention block costs against a loop over block views.
- **run-c3, 11 rows** — 164-174. The fingerprint of an *independent* flat-array port
  written without sight of the others: it met the same row lift from the other side (164,
  171 — untyped lambdas silently pick the wrong arrow-typed overload, typed ones do not),
  the two naming rules a component with `nat` generics and an api trips over (167, 168),
  the missing range assignment and the view `assign` that replaces it (169, 170), and the
  two rows that say what a top-level `opr` set and an api-declared object can carry (172,
  173).

Of the 56 rows the run-b/run-b2 merge added, run-b found 27 and run-b2 38; together they found 55 of
them (row 98, the cache-dependence of overload checking, came out of the merge itself),
and they overlap on only 10: 84, 95, 97, 99, 106, 108, 113, 118, 122, 124. Across the
whole ledger the two runs share 17 rows out of 43 and 49. Two ports of the same program,
run against the same interpreter, met almost disjoint halves of the language. run-c then
overlapped neither: of its 15 rows none was shared with run-b or run-b2, and the three
ports shared only the rows every port hits. The two flat-array rounds that followed are
the closest any two runs have come: of the 19 rows the run-c2/run-c3 merge added, run-c2
found 8 and run-c3 14, and they agree on 3 of them (156, 158, 162) — a generic function is
not a value, a parenthesised call may not carry a postfix operator, `fail` exits 1 — plus
row 133, which both met and neither entered. Everything else is still disjoint.

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
- **run-c, row 59** (updates lost in a parallel `for`) — its parallel loop writes disjoint
  blocks through views and accumulates nothing across iterations, so it ran at four
  threads with no `atomic` and no loss (row 155). astra went sequential instead; run-b and
  run-b2 stayed at one thread, where the defect is invisible.
- **run-c, row 83** (`nat` generics through an API) — its API signatures are all
  runtime-sized (`Array[\RR64,ZZ32\]`), with the `nat` generics behind them, so the
  contested mis-unification had no place to occur (row 151).
- **run-c, row 139** (the exponential functional-backprop shape) — `step` is a pure
  function with no graph, no tape and no cache, so neither shape exists in it; what it
  measured instead is the interpreter's own product cost (row 154).

## Run C — the flat-array port

Run C ported microGPT a third time, in native Fortress arrays with the data laid out
after Aaron Hsu: one flat parameter vector, every weight matrix a view into it, no
graph, no user element type. It wrote **16 rows**; **15 entered the ledger** as new
rows (140-147, 149-155) and **one was merged** — its row 148, `label` as a parameter
name, is row 8's claim with a new diagnostic, and is now a note on row 8. The ledger's
numbering therefore skips 148 so that `run-c/gaps.md` still resolves. Alongside them
Run C's artifacts confirm ten rows other ports had already found: 4, 8, 19, 25, 34, 35,
55, 57, 92, 99.

By class the 15 new rows are: **library bug 1** (140, `strToFloat`), **deliberate 2**
(141 `split`, 145 `AND`), **implementation gap 3** (142 top-level array literals, 146
`ZZ64` literals, 153 unenforced `fill` return types), **design limit 4** (143 the
wildcard, 144 a call before a postfix operator, 147 name collisions with inherited
methods, 154 the interpreter's product cost), and **5 capability rows** with no gap
class at all (149 postfix static parameters, 150 views, 151 APIs, 152 top-level
initialisation, 155 parallel `for`). Five rows are positive-only, five negative-only
and five carry both marks — the highest positive share of any port so far, which is
what one would expect from a run that stayed inside the library instead of extending it.

Three of them change what the next program can assume:

- **`reflect` turns a run-time size into a `nat` (rows 150, 25).** A six-line object
  extending `Matrix[\RR64,r,c\]` over a slice of a flat `Vector`, its `r` and `c`
  obtained from `reflect(rows)`/`reflect(cols)` through one hoisted generic — the
  library's own idiom at `FortressLibrary.fss:1922-1931` — is a **full `Matrix`**: the
  product in both spellings, `.t()`, `+`, scalar scaling, `map`, `ivmap`, `assign`, and
  writes that reach the underlying vector. Row 25 said a `nat` static argument can never
  be a value name and treated `reflect` as a workaround; row 150 shows it is enough to
  run an entire model whose shapes are read from a file. `import NatReflect.{...}` is
  required for `N[\n\]` even though `reflect` is already in scope.
- **A parallel `for` over disjoint views is safe (row 155).** `for d <- 0#bsz,
  h <- 0#nHead` writing disjoint blocks of shared matrices through views, while reading
  shared matrices, gives results identical to the last digit at 4 threads and at 1 —
  because nothing is accumulated across iterations. That is row 59's trap avoided by
  construction rather than by `atomic`, and it is the first parallel speed-up any port
  has measured on real work: 2.6-3.0 s per batch-1 step against 7.7-7.9, and 353 s
  against 855 s for the whole check.
- **Budget about 24 us per multiply-add (row 154).** The library's matrix product costs
  tens of microseconds per multiply-add on the walk interpreter, and no hand-written
  spelling is faster: cost tracks the multiply-add count, not the shape. Re-measured
  during this merge the same probe gave about 13 us per multiply-add — a uniform factor
  of ~1.8 on a faster host, which is also the factor between Run C's 7.9 s and this
  host's 4.0 s per training step. Either way, a model step is seconds, not milliseconds,
  and the program's size must be chosen from the multiply-add count before it is written.

A fourth is worth naming because it touches the ledger's one contested row: Run C's
`run-c/probes/api/` pair (row 151) exports `Executable` and an API on two lines and calls
runtime-typed API functions, whose bodies are `nat`-generic, at two different sizes,
correctly. Row 83's claimed mis-unification still does not reproduce; what remains
untested is a `nat` static parameter in the API's own signatures.

## Run C2 and Run C3 — the second round and the independent third port

Two more flat-array runs followed, and the 2026-09-14 merge entered **19 rows**
(156-174) from them, merging eight others into rows that already carried the claim.

**Run C2** is Run C's own second round: the same program rewritten so that the notation
carries more of it — one operator algebra generic in the index type instead of one set of
declarations per rank, and the attention block as rank-3 views with a batched product.
It wrote 11 rows; **8 entered** (156-163) and **3 were merged** (its varargs row into 130,
its top-level tuple binding into 152, its api `^T` into 133). What the round bought and
what it cost are both in the ledger: 13 generic declarations replace 40-odd per-rank ones
(row 161) and four Dyalog lines become six Fortress lines, but the rank-3 form costs about
a third more than a loop over block views (row 163) — the walk interpreter charges for
every extra view level. Three of its rows are the wall it hit on the way: a `nat`-generic
function is not a value (156), `Any` in a generic signature is an interpreter bug (157),
and two generic `opr` declarations of one operator need an excluding pair (159).

**Run C3** ported microGPT independently, without sight of the other runs, in the same
flat-array style. It wrote 17 rows; **14 entered** (156, 158, 162 shared with Run C2, and
164-174) and **3 were merged** (its array-literal row into 106 and 49, its parallel-`for`
row into 155, its api `^T` into 133). Its distinctive half is the row lift: two overloads
differing only in a function parameter's arrow type resolve correctly for a *typed* lambda
or a named function (171) and silently pick the first declared one for an *untyped* lambda
(164) — so the port's lambdas are untyped and its one scalar-result lift is typed. Around
it are the two naming rules a component full of `nat` generics trips over (167, 168), the
rank-2 range assignment the library never had and the view `assign` that replaces it (169,
170), and two capability rows: 24 user operator overloads coexisting with the library's on
numbers (172), and an object declared in an api and used through it by two components (173).

The agreement between them is worth as much as the rows. Run C2 and Run C3 met three of
the same gaps independently (156, 158, 162) and both met row 133, and every claim of both
reproduced at the merge. Where they differ is route, not verdict: Run C2 asked how much
one generic declaration can carry, Run C3 asked how much overload resolution can tell
apart.

## Run C4 and the APL side quest — the synthesis and the sub-language

**Run C4** is the merge of C2's and C3's working programs into the one target the APL
round writes against. It met no new language gap by writing the model — everything in it
was proven in C2 or C3, which is why its column is mostly the rows it *adopted*: the
tuple-bound hyperparameters (152), varargs `flat` (130), one elementwise operator generic
in the index type (161), the prefix `SUM v` (102), the `^T` that an api cannot declare
(133). Its four rows came afterwards, from questions about what the model's annotations
are for: the semicolon form of untyped top-level declarations (175), untyped parameters
on a named function (176), the one annotation the interpreter requires, a mutable local's
type (177), and the api's types not needing to be repeated in the component (178). Two
rows are marked *avoided*: C4 exported a `transpose` function from the start, so it never
met 144 or 158 again.

**The APL side quest** is not a port and its column reads differently: 94 hits, of which
78 are rows nothing else in this tree could have found. They are not about writing a
program in Fortress but about extending Fortress — the preparser's dead delimiter check
(211), the positions where a gap cannot go (182, 186, 196, 202) and the one where it can
(201), a name otherwise spelled out as a character class (194), hygiene enforced exactly
as the 2009 paper describes it (204), the errors
that point at the grammar api's line 1 instead of at the use site (213, 230, 243), and
the four rows about a line break failing to separate two statements (228, 238, 241, 253),
each widening the last. Where it does touch the language proper it lands beside the
ports: rank overloading through `Vector`/`Matrix` (214) is row 23 answered from the
library side, the shipped `DOT` as a four-rank inner product (254) is the operator row
53's user carrier could not reach, and the `Any` result that kills dispatch (240) is row
157 without a generic. The Meet Rule and its cache (97, 98) bit it as they bit the ports,
from the cold-cache side.
