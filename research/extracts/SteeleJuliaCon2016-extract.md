# Extract: Guy L. Steele Jr., "Fortress Features and Lessons Learned" (JuliaCon 2016)

Working notes on the recovered PDF (`research/decks/SteeleJuliaCon2016.pdf`,
49 slides, © 2016 Oracle — personal copy only, the PDF itself is gitignored and
never committed). These notes are our own summary and commentary with brief
attributed quotations, not a reproduction of the deck.
Source: Oracle Labs APEX DOC_ID:952, recovered via Wayback; video:
https://www.youtube.com/watch?v=EZD3Scuv02g

Extract made 2026-08-18 from a full read of all 49 slides. Slide numbers are the
printed page numbers. Cross-references to the palimondo/fortress repo state are
marked **[repo]**.

## 1–3. Front matter

Title (2): "Fortress Features and Lessons Learned", Guy L. Steele Jr., Software
Architect, Oracle Labs. Slide 3: copyright notice — personal/classroom copies
permitted, no redistribution without written permission of Oracle.

## 4–9. The toy problem: histogram water

Array of bar heights `2 6 3 5 2 8 1 4 2 2 5 3 5 7 4 1`; rain fills valleys; how
much water is retained? (Thanks to Dan Nussbaum and Steve Heller.) Key insight
(7–8): water level above each bar = `(max-to-the-left MIN max-to-the-right) − v`.

Slide 9 — the concise Fortress solution (typeset with ∑, highlighted parts):

```
histogramWater(x: List[\ZZ32\]): ZZ32 =
  SUM [(v,left,right) <- zip(x, MAX-prefix x, MAX-suffix x)]
      ((left MIN right) - v)
```

(The typeset original zips `x` with a forward running `MAX` and a backward
running `MAX`, drawn as arrows over `MAX x`.) Notes: purely functional; allows
map-reduce parallelism. Pointer to Google Tech Talk "Four Solutions to a Trivial
Problem" on YouTube.

## 10–17. Principles

- Slide 10 — **Three principles**: a growable language, a mathematical language,
  a parallel language. "We tried very hard to avoid including any language
  feature not clearly justified by one or more of these principles."
- Slide 11 — Growability: modular libraries (components and APIs, separate
  compilation, multiple co-existing implementations of one interface); break
  with Fortran's array emphasis — objects with *multiple inheritance* of traits
  ("Why inheritance? Sharing of code. Why multiple? Even more sharing of
  code."); distributed/hierarchical arrays; therefore *multimethods*
  (type-directed dispatch on multiple arguments).
- Slide 12 — Paradigmatic examples: extensible numeric hierarchy — multiple-size
  ints/floats incl. big, **"Rational, complex, and quaternion"**, interval
  arithmetic; vectors/matrices/tensors (matrix-vector both ways); collections;
  arrays (multidimensional, distributed, sparse). Goal: multiple implementations
  of the same interface coexisting in one program. **[repo]** Only rational
  shipped; this is the never-kept promise behind the §4d complex-numbers roadmap
  (seed: `complex_ring.fss` runs on the interpreter).
- Slide 13 — Operator overloading included: mathematical tradition; bad
  experience with Java's BigInteger/BigDecimal; contrast Gosling's C++ trauma.
- Slide 14 — Growability requires reliability: strong types; type AND method
  parameters may be types, operator names, integers, booleans, physical
  dimensions/units; design-by-contract (pre/post-conditions, inheritable
  invariants); rich library of algebraic traits:
  `trait ZZ extends { Ring[\ZZ,+,x\], PartialOrder[\ZZ,<,<=,>=,>\] } ... end`
  **[repo]** Spec-fiction: no operator-parameterized `Ring` ever shipped — the
  implementation has operator-fixed `AdditiveGroup`/`MultiplicativeRing`.
- Slide 15 — Algebraic traits (with the F-bounded self-type pattern and `opr ⊙`
  operator parameters):
  `trait BinaryOperator[\T extends BinaryOperator[\T,⊙\], opr ⊙\]`
  with `opr ⊙(self, other:T):T`; `Associative` and `Commutative` extend
  {BinaryOperator, EquivalenceRelation} and carry `property ∀(a,b,c:T)`
  associativity/commutativity laws. "Properties can be checked by unit testing.
  (Future work: theorem prover.)" **[repo]** `property` keyword never shipped.
- Slide 16 — Big example: `trait BooleanAlgebra[\T ..., opr ∧, opr ∨, opr ∼,
  opr ⊕, ident zero, ident one\]` extending Commutative/Associative/Idempotent
  (×2), HasIdentity (×2), Complements (×2), Distributive (×2), DeMorgan (×2),
  and `Ring[\T,⊕,IDENTITY,∧,zero,one\]`; one property `∼(∼a)=a`; `opr ⊕`
  defined by default in terms of ∧, ∨, ∼.
- Slide 17 — **Fourth principle: symmetry.** Order should not matter:
  declarations in a file, imports, declared parents, overload resolution,
  argument evaluation. Order *does* matter for: matching args to params, tuple
  construction, statement execution in a block.

## 18–21. Fortress vs Scala

- Slide 18 — histogramWater via `maxCachedTree`/`walk` over Pair/Leaf in both
  languages; Fortress `walk(x.a, left, x.b.val MAX right) + walk(x.b, left MAX
  x.a.val, right)` is *potentially parallel recursion*; the Scala twin is
  sequential.
- Slide 19 — Typeset vs ASCII Fortress: same walk code as
  `histogramWater(x: List[\ZZ\]): ZZ`, `(*) comment`, `[\ \]` white brackets.
- Slide 20 — Similarities: traits + multiple inheritance, overloading,
  parametric polymorphism, expression-based, tuples, functional collections
  (map/fold/reduce/filter/sorted/zip), growability, Unicode operators ("But
  Fortress actually uses them!"), strong Haskell influence.
- Slide 21 — Differences: **types are never erased**; fully symmetric dynamic
  overload dispatch (type parameters sometimes inferred at run time); implicit
  as well as explicit parallelism (tuples, binary operands, call arguments);
  whiteboard-driven syntax (∪ ∩ ⊆ ∈, |a|, ⌊x⌋, ⌈x⌉, p∧q...; multiplication as
  `a·b`, `a×b`, or juxtaposition `a b`).

## 22–33. Syntax: whitespace, juxtaposition, precedence, comprehensions

- Slides 23–26 — FORTRAN whitespace cautionary tale: `DO 20 I=1,125` (loop) vs
  `DO20I=1.125` (assignment to variable DO20I) vs `DO 20 I=1.125` (also an
  assignment!).
- Slide 27 — Three uses of whitespace in Fortress: disambiguating vertical bars
  `{ |a| | a <- mylist, a | b }`; subscripting `a[i,j,k]` vs `a [i,j,k]`
  (reference then array constructor); *verifying intent of operator precedence*:
  `a+b·c+d` OK, `a + b·c + d` OK, `a+b · c+d` **rejected**.
- Slide 28 — **Juxtaposition is a user-defined overloaded operator** (function
  application and multiplication): `3 sin pi x - log x + 5 z^2 - 7 z + 2`;
  smart string concatenation `"I found" (n+1) "errors in" j "files"`; tight
  juxtaposition binds tighter than loose: `"I generated" n(n-1) "ordered
  pairs"`. Downside: operators must be distinguishable tokens (`MAX`, `MIN`
  uppercase). Scala contrast: any name infix/postfix, but no prefix operators
  beyond `+ - ! ~`. **[repo]** Verified empirically in the chat session:
  `opr juxtaposition` is real; `MultiplicativeRing` default wires jux→TIMES.
- Slide 29 — **Nontransitive operator precedence**: `a+b > c+d` OK; `p<0 ∨ p>9`
  OK; `a+b ∨ c+d` NOT OK — no precedence defined between + and ∨. "We use only
  the most obvious and familiar rules"; matters with hundreds of operator
  symbols; just parenthesize.
- Slide 30 — Binding `x = h+1` ("we see this on whiteboards!") vs mutable
  declaration `y:ZZ := h+1` (type required); assignment is `:=`; compound
  `y += 1`; goal: "mostly pure, SSA" style with a one-character tax.
- Slide 31 — Comments support wiki syntax (superset of Wiki Creole 1.0);
  single backquotes embed Fortress code, rendered typeset.
- Slide 32 — Comprehensions (Haskell notation) for arrays `[...]`, lists
  `<|...|>`, sets `{...}`, multisets `{|...|}` — with typeset equivalents.
- Slide 33 — **Big reduction operators** = fold × comprehension:
  `BIG SUM [p <- mylist, prime p] p+1`, `BIG MAX [k <- 1:n] a[k]`,
  `BIG OPLUS [j <- 1:n, k <- j:n] f(j,k)`. "Reduction operators are exactly
  like comprehensions... Implementationally they are identical."
  **[repo]** `BIG //` / `BIG ||` used in mandelbrot_canonical.fss.

## 34–37. Parallelism machinery

- Slide 34 — The ∑ desugaring, all in library code:
  `∑[i<-0:9] a_i x^i` desugars to `∑(0:9, fn i => a_i x^i)`;
  `opr ∑[\E, T extends Monoid[\T,+\]\](g: Generator[\E\], body: E->T): T =
  g.generate(SumReduction[\T\], body)`;
  `object SumReduction[\T extends Monoid[\T,+\]\] extends Reduction[\T\]` with
  `empty(): T = cast[\T\] 0` and `join(a:T,b:T): T = a+b`. ∑ can be overloaded.
  **[repo]** `Monoid[\T,opr\]` DID ship — exactly enough for ∑ (chat-session
  audit).
- Slide 35 — Generators/reducers generic in element type; lazily composable
  (cross product, catenation); algebraic properties encoded in the type system;
  generator controls sequential/parallel strategy; overload dispatch selects
  best reducer per generator; **all defined by library code, not the compiler**.
- Slide 36 — Low-level cooperative parallelism: tuples, arguments, binary
  operators are the real basis; compiler decides which subexpressions become
  microtasks (research area); work-stealing load balancing; "Goal: do for
  processors what GC does for memory."
- Slide 37 — Competitive parallelism: global shared memory; `atomic do ... end`
  appears to execute all at once, implemented with transactional memory;
  nesting with exceptions is "interesting".

## 38–44. The type system, and where it broke

- Slide 38 — Hand-drawn hierarchy: Any → {String, Boolean, Number}; Number →
  {Integral → ZZ32, ZZ64, ZZ; Float → RR32, RR64}. Will overloading work with
  `print(x: ...)` for each?
- Slide 39 — How to say you DON'T want sharing (needed for the meet rule /
  overload safety): `excludes` clauses — `trait Boolean extends {Any} excludes
  {String}`, `trait Number ... excludes {String, Boolean}` — **quadratic
  blow-up!**
- Slide 40 — Fix: `partitioned trait Primitive extends {Any}` — children of a
  partitioned trait are pairwise disjoint; hierarchy becomes Any → Primitive →
  {String, Boolean, Number(partitioned)}. **[repo]** `partitioned` never
  shipped; the implementation uses `comprises` + `excludes` (numeric lattice
  ZZ32 <: ZZ64 <: ZZ <: QQ <: RR64 extracted from source in the chat session;
  `Number comprises {RR64}` seals the tower).
- Slide 41 — Fully symmetric dynamic multimethod dispatch on run-time types of
  ALL arguments (no visitor pattern); types never erased: dispatch can tell
  `List[\Boolean\]` from `List[\String\]`, both more specific than `List[\T\]`.
- Slide 42 — Run-time type inference: `crunch(myList)` where
  `myList: List[\Object\] =` a list of threads must infer `T = Thread` at run
  time.
- Slide 43 — Static parameters with interdependent bounds:
  `mangle[\M extends {PartialOrder[\M\], Group[\M,+\]}, F extends M->N,
  N extends List[\M\]\](x:M, f:F): N` — "In general, this requires solving a
  system of type inequalities at run time."
- Slide 44 — **Where We Got Stuck**: generic methods × symmetry requirement →
  parametric meet rule and return type rule → nontrivial run-time constraint
  solving — "'Non-trivial' is a euphemism for 'exponential cost'";
  "Contravariance and union types interact badly"; mitigated by imposing a
  lexical asymmetry on method type parameters; "another nasty case popped up:
  the return type rule has nontrivial consequences." **"So we had a grand
  vision, but could not quite pull it off."**
  **[repo]** This is precisely the subject of the trunk's final commits —
  karl.naden's `Papers/RuntimeInstantiation/` (incl. "rtr algorithm",
  "using constraints", RTRinstantionTheory.tex) and
  `Papers/Types/journal/justificationOfRTR.tex`, preserved in the graft.

## 45–49. Lessons and reflections

- Slide 45 — **We learned some good things**: generic types with multiple
  inheritance of generic methods and symmetric dispatch; parallelism with
  automatic work-stealing; factoring parallelism on collections via generators
  and reducers; parsing AND pretty-printing mathematical syntax; nontransitive
  precedence; physical dimensions/units inside a generic type system. "My
  current thinking is to back off and try to exploit a subset of these ideas
  using a less complex type system."
- Slide 46 — Syntax tradeoffs: math notation designed for concision, not
  robustness; juxtaposition made programmable — "sometimes this worked
  beautifully, sometimes it required some weird contortions"; Haskell and Scala
  each capture a PART of mathematical tradition more consistently.
- Slide 47 — Reflections: **"I knew when I started the Fortress project in
  2003..."** (confirms the 2003 start; git history begins 2007-01-04,
  mid-project). Long shot vs Fortran/Java; "we are too often fearful of
  correcting mistakes"; JavaScript aside ("maybe Worse Is Better").
- Slide 48 — Language life cycles: good ideas survive by hopping between
  languages; "the language that develops an idea may not be the one that
  survives"; "I believe in studying history." Fortress → **Swift optional
  binding**: `if x <- z then f(x) else y end` where `z: Maybe[\T\]`.
- Slide 49 — Closer: Greenspun's Tenth Rule.

## Recovery provenance (for re-download)

- Wayback direct (id_ = raw bytes), identical digest across ~100 captures
  2021–2026:
  `https://web.archive.org/web/20260416152624id_/https://labs.oracle.com/pls/apex/f?p=LABS:0:100315543614648:APPLICATION_PROCESS=GETDOC_INLINE:::DOC_ID:952`
- Fallback (earliest capture, 2021-12-09):
  `https://web.archive.org/web/20211209023131id_/https://labs.oracle.com/pls/apex/f?p=LABS:0:101713034580486:APPLICATION_PROCESS=GETDOC_INLINE:::DOC_ID:952`
- Claude Code cloud containers (2026-08-18): network policy blocks
  web.archive.org (curl AND WebFetch) and labs.oracle.com does not resolve —
  the PDF must be dropped into the session by Pavol.
- Lead (unverified): a 2026 web search surfaced
  `https://labs.oracle.com/pls/apex/f?p=94065:10:2849938467431:5316` titled
  "Fortress Features and Lessons Learned" — the APEX host may be back online;
  check from an unrestricted machine. If live, CDX-free DOC_ID enumeration
  (Archivist 2012-0104, 2012-0284) becomes possible again.
