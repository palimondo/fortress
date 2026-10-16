# Extract: Guy L. Steele Jr., "Fortress Features and Lessons Learned" (JuliaCon 2016)

Working notes on the recovered PDF (`research/decks/SteeleJuliaCon2016.pdf`,
49 slides, © 2016 Oracle — personal copy only, the PDF itself is gitignored and
never committed). These notes are our own summary and commentary with brief
attributed quotations, not a reproduction of the deck, except that the code of
every slide that shows code is given word for word from the deck (2026-10-16).
Source: Oracle Labs APEX DOC_ID:952, recovered via Wayback; video:
https://www.youtube.com/watch?v=EZD3Scuv02g

Extract made 2026-08-18 from a full read of all 49 slides. Slide numbers are the
printed page numbers: PDF page N is slide N, pages 4–50 printing N in the footer,
pages 2–3 (title, copyright notice) printing none and pages 1 and 51 being the
bare Oracle logo, so the 51-page PDF holds the 49 slides as pages 2–50.
Cross-references to the palimondo/fortress repo state are marked **[repo]**.

## 1–3. Front matter

Title (2): "Fortress Features and Lessons Learned", Guy L. Steele Jr., Software
Architect, Oracle Labs. Slide 3: copyright notice — personal/classroom copies
permitted, no redistribution without written permission of Oracle.

## 4–9. The toy problem: histogram water

Array of bar heights `2 6 3 5 2 8 1 4 2 2 5 3 5 7 4 1`; rain fills valleys; how
much water is retained? (Thanks to Dan Nussbaum and Steve Heller.) Key insight
(7–8): water level above each bar = `(max-to-the-left MIN max-to-the-right) − v`.

Slide 9 — the concise Fortress solution, typeset only, its `∑` (blue), generator
(yellow) and body (green) highlighted:

```
histogramWater(x: List⟦ℤ32⟧): ℤ32 =
               ∑                    ((left MIN right) − v)
                      →     ←
(v,left,right)←zip(x,MAX x,MAX x)
```

(The arrows stand over the two `MAX`es: `x` is zipped with a left-to-right
running `MAX` and a right-to-left one. The deck gives no ASCII spelling of
either operator.) Notes: purely functional; allows map-reduce parallelism.
Pointer to Google Tech Talk "Four Solutions to a Trivial Problem" on YouTube.

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
  invariants); rich library of algebraic traits (typeset only):

  ```
  trait ℤ extends { Ring⟦ℤ, +, ×⟧, PartialOrder⟦ℤ, <, ≤, ≥, >⟧ }
    …
  end
  ```

  **[repo]** Spec-fiction: no operator-parameterized `Ring` ever shipped — the
  implementation has operator-fixed `AdditiveGroup`/`MultiplicativeRing`.
- Slide 15 — Algebraic traits, with the F-bounded self-type pattern and an
  `opr` parameter `⊙` (typeset only):

  ```
  trait BinaryOperator⟦T extends BinaryOperator⟦T, ⊙⟧, opr ⊙⟧
    opr ⊙(self, other: T): T
  end

  trait Associative⟦T extends Associative⟦T, ⊙⟧, opr ⊙⟧
      extends { BinaryOperator⟦T, ⊙⟧, EquivalenceRelation⟦T, =⟧ }
    property ∀(a: T, b: T, c: T) ((a ⊙ b) ⊙ c) = (a ⊙ (b ⊙ c))
  end

  trait Commutative⟦T extends Commutative⟦T, ⊙⟧, opr ⊙⟧
      extends { BinaryOperator⟦T, ⊙⟧, EquivalenceRelation⟦T, =⟧ }
    property ∀(a: T, b: T) (a ⊙ b) = (b ⊙ a)
  end
  ```

  "Properties can be checked by unit testing. (Future work: theorem prover.)"
  **[repo]** `property` keyword never shipped.
- Slide 16 — Big example (typeset only): `BooleanAlgebra` over the curly `⋏`
  and `⋎` (not `∧` and `∨`), `∼` and `⊕`, extending Commutative/Associative/
  Idempotent (×2), HasIdentity (×2), Complements (×2), Distributive (×2),
  DeMorgan (×2), and `Ring⟦T, ⊕, IDENTITY, ⋏, zero, one⟧`; one property
  `∼(∼a)=a`; `opr ⊕` defined by default in terms of ⋏, ⋎, ∼:

  ```
  trait BooleanAlgebra⟦T extends BooleanAlgebra⟦T, ⋏, ⋎, ∼, ⊕, zero, one⟧,
                         opr ⋏, opr ⋎, opr ∼, opr ⊕, ident zero, ident one⟧
      extends { Commutative⟦T, ⋏⟧, Associative⟦T, ⋏⟧, Idempotent⟦T, ⋏⟧,
                Commutative⟦T, ⋎⟧, Associative⟦T, ⋎⟧, Idempotent⟦T, ⋎⟧,
                HasIdentity⟦T, ⋏, one⟧, HasIdentity⟦T, ⋎, zero⟧,
                Complements⟦T, ⋎, ∼, one⟧, Complements⟦T, ⋏, ∼, zero⟧,
                Distributive⟦T, ⋏, ⋎⟧, Distributive⟦T, ⋎, ⋏⟧,
                DeMorgan⟦T, ⋏, ⋎, ∼⟧, DeMorgan⟦T, ⋎, ⋏, ∼⟧,
                Ring⟦T, ⊕, IDENTITY, ⋏, zero, one⟧ }
    property ∀(a: T) (∼ (∼ a)) = a
    opr ⊕(self, other: T): T = (self ⋏ (∼ other)) ⋎ ((∼ self) ⋏ other)
  end
  ```
- Slide 17 — **Fourth principle: symmetry.** Order should not matter:
  declarations in a file, imports, declared parents, overload resolution,
  argument evaluation. Order *does* matter for: matching args to params, tuple
  construction, statement execution in a block.

## 18–21. Fortress vs Scala

- Slide 18 — histogramWater via `maxCachedTree`/`walk` over Pair/Leaf in both
  languages; the Fortress recursion is *potentially parallel*, the Scala twin
  sequential. Fortress code, typeset only on this slide (`⊛` is the typeset
  end-of-line comment mark):

  ```
  histogramWater(x: List⟦ℤ⟧): ℤ =
    walk(maxCachedTree x, 0, 0)
  walk(x: Pair, left: ℤ, right: ℤ): ℤ =     ⊛ Potentially parallel recursion
    walk(x.a, left, x.b.val MAX right) + walk(x.b, left MAX x.a.val, right)
  walk(x: Leaf, left: ℤ, right: ℤ): ℤ =
    ((left MIN right) MAX x.val) − x.val
  ```

  Scala code:

  ```
  def histogramWater(x: List[BigInt]): BigInt =
    walk(maxCachedTree x, 0, 0)

  def walk(x: Pair, left: BigInt, right: BigInt): BigInt =  // Sequential
    walk(x.a, left, x.b.val max right) + walk(x.b, left max x.a.val, right)

  def walk(x: Leaf, left: BigInt, right: BigInt): BigInt =
    ((left min right) max x.val) - x.val
  ```

- Slide 19 — Typeset vs ASCII Fortress: the typeset half is slide 18's
  Fortress code, unchanged; the ASCII half spells `ℤ` as `ZZ`, `⟦ ⟧` as
  `[\ \]`, `⊛` as `(*)` and `−` as `-`:

  ```
  histogramWater(x: List[\ZZ\]): ZZ =
    walk(maxCachedTree x, 0, 0)

  walk(x: Pair, left: ZZ, right: ZZ): ZZ =  (*) Potentially parallel recursion
    walk(x.a, left, x.b.val MAX right) + walk(x.b, left MAX x.a.val, right)

  walk(x: Leaf, left: ZZ, right: ZZ): ZZ =
    ((left MIN right) MAX x.val) - x.val
  ```
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
  assignment!). Slide 26, the last build (23, 24 and 25 show its first two,
  four and six lines), its pairs labelled "DO loop", "also a DO loop",
  "assignment", "also an assignment!":

  ```
       DO 20 I=1,125
  20   SUM = SUM + X(I)

       DO20I=1,125
  20   SUM=SUM+X(I)

       DO20I=1.125
  20   SUM=SUM+X(I)

       DO 20 I=1.125
  20   SUM = SUM + X(I)
  ```

- Slide 27 — Three uses of whitespace in Fortress: disambiguating vertical bars
  `{ |a| | a <- mylist, a | b }`; subscripting `a[i,j,k]` vs `a [i,j,k]`
  (reference then array constructor); *verifying intent of operator precedence*:
  `a+b·c+d` OK, `a + b·c + d` OK, `a+b · c+d` **rejected**. The code, ASCII:

  ```
  { |a| | a <- mylist, a | b }
  a[i,j,k]
  a [i,j,k]
  a+b·c+d                 a + b · c + d
  a + b·c + d             a+b · c+d
  ```

  The slide marks each of the last four OK except `a+b · c+d`, rejected. Its
  typeset twin of the first line reads `{ |a| | A ← mylist, a | b }`, with a
  capital `A` and the divides bar drawn taller; it renders `a[i,j,k]` as `a`
  subscripted `i,j,k` and the constructor as `[i, j, k]`.
- Slide 28 — **Juxtaposition is a user-defined overloaded operator** (function
  application and multiplication): `3 sin pi x - log x + 5 z^2 - 7 z + 2`;
  smart string concatenation `"I found" (n+1) "errors in" j "files"`; tight
  juxtaposition binds tighter than loose: `"I generated" n(n-1) "ordered
  pairs"`. Downside: operators must be distinguishable tokens (`MAX`, `MIN`
  uppercase). Scala contrast: any name infix/postfix, but no prefix operators
  beyond `+ - ! ~`. The code, ASCII (the first line Scala, the rest Fortress;
  the third is the "Compare:" line):

  ```
  x = (item.x max item.y max item.z) min upperBound
  3 sin pi x - log x + 5 z^2 - 7 z + 2
  "I found " + (n+1) + " errors in " + j + " files"
  "I found" (n+1) "errors in" j "files"
  "I generated" n(n-1) "ordered pairs"
  x = (item.x MAX item.y MAX item.z) MIN upperBound
  ```

  The polynomial's typeset twin, `3 sin π x − log x + 5 z² − 7 z + 2`, differs
  only in spelling. **[repo]** Verified empirically in the chat session:
  `opr juxtaposition` is real; `MultiplicativeRing` default wires jux→TIMES.
- Slide 29 — **Nontransitive operator precedence**: `a+b > c+d` OK; `p<0 ∨ p>9`
  OK; `a+b ∨ c+d` NOT OK — no precedence defined between + and ∨. "We use only
  the most obvious and familiar rules"; matters with hundreds of operator
  symbols; just parenthesize. The displayed lines, typeset only (the symbols,
  then the parenthesized forms):

  ```
  ∪ ∩ ⊏ ÷ ⊕ ≼ ⊞ ⊗ ⋏ ⊚ ∈ ⋄ ⋆ ⋐ ⋖ ≈ ∥ ⊘ .
  (a + b) ∨ (c + d)    or    a + (b ∨ c) + d
  ```

- Slide 30 — Binding `x = h+1` ("we see this on whiteboards!") vs mutable
  declaration `y:ZZ := h+1` (type required); assignment is `:=`; compound
  `y += 1`; goal: "mostly pure, SSA" style with a one-character tax. The code,
  typeset only:

  ```
  x = h + 1
  y: ℤ := h + 1
  y := y + 1
  y += 1
  ```

- Slide 31 — Comments support wiki syntax (superset of Wiki Creole 1.0);
  single backquotes embed Fortress code, rendered typeset. The code, ASCII
  (the slide's typewriter font draws the backquote as ‘):

  ```
  //italic//  **boldface**  [[link]]  {{image}}
  (*) The **best** way to swap `x` and `y` is `(x,y) := (y,x)`
  ```

  Rendered below it: "⊛ The best way to swap x and y is (x, y) := (y, x)",
  with "best" in bold and `x`, `y` and the swap in math type.
- Slide 32 — Comprehensions (Haskell notation) for arrays `[...]`, lists
  `<|...|>`, sets `{...}`, multisets `{|...|}` — with typeset equivalents.
  The code, ASCII:

  ```
  [1,2,3]       [ |a| | a <- mylist, a | b ]
  <|1,2,3|>     <| |a| | a <- mylist, a | b |>
  {1,2,3}       { |a| | a <- mylist, a | b }
  {|1,2,3|}     {| |a| | a <- mylist, a | b |}
  ```

  The typeset half has five rows, not four: `[1, 2, 3]`, `⟨1, 2, 3⟩`,
  `{1, 2, 3}`, `⦃1, 2, 3⦄` and also `⟅1, 2, 3⟆`, a second form for multisets,
  each beside its comprehension `|a| | a ← mylist, a | b` in the same brackets.
- Slide 33 — **Big reduction operators** = fold × comprehension. The code,
  ASCII:

  ```
  BIG SUM [p <- mylist, prime p] p+1
  BIG MAX [k <- 1:n] a[k]
  BIG OPLUS [j <- 1:n, k <- j:n] f(j,k)
  ```

  The typeset row below differs only in spelling: `∑`, `MAX` and `⨁` with
  their generators stacked beneath, `a[k]` as `a` subscripted `k`.
  "Reduction operators are exactly like comprehensions... Implementationally
  they are identical."
  **[repo]** `BIG //` / `BIG ||` used in mandelbrot_canonical.fss.

## 34–37. Parallelism machinery

- Slide 34 — The ∑ desugaring, all in library code (typeset only; a
  generator under a big operator is set on the line below it):

  ```
   ∑   aᵢ xⁱ      MAX (aᵢ + bᵢ)     { (m, n) | m ← A, prime m, n ← B, m | n }
  i←0:9          i←0:9

   ∑   aᵢ xⁱ  desugars to  ∑(0 : 9, fn i ⇒ aᵢ xⁱ)
  i←0:9

  opr ∑⟦E, T extends Monoid⟦T, +⟧⟧(g: Generator⟦E⟧, body: E → T): T =
      g.generate(SumReduction⟦T⟧, body)

  object SumReduction⟦T extends Monoid⟦T, +⟧⟧ extends Reduction⟦T⟧
      empty(): T = cast⟦T⟧ 0
      join(a: T, b: T): T = a + b
  end
  ```

  "Definition of ∑ can be overloaded."
  **[repo]** The operator-parameterized `trait Monoid[\ T, opr OPLUS \]` stands
  only inside a comment (`Library/FortressLibrary.fss:3188-3196`, unchanged
  since `5a68404fd`, the tree's oldest commit); what shipped is the reduction
  trait `MonoidReduction[\R\]` (`Library/FortressLibrary.fsi:1930`).
- Slide 35 — Generators/reducers generic in element type; lazily composable
  (cross product, catenation); algebraic properties encoded in the type system;
  generator controls sequential/parallel strategy; overload dispatch selects
  best reducer per generator; **all defined by library code, not the compiler**.
- Slide 36 — Low-level cooperative parallelism: tuples, arguments, binary
  operators are the real basis, shown by slide 18's recursive line (typeset):

  ```
  walk(x.a, left, x.b.val MAX right) + walk(x.b, left MAX x.a.val, right)
  ```

  The compiler decides which subexpressions become microtasks (research area);
  work-stealing load balancing; "Goal: do for processors what GC does for
  memory."
- Slide 37 — Competitive parallelism: global shared memory; `atomic do ... end`
  appears to execute all at once, implemented with transactional memory;
  nesting with exceptions is "interesting".

## 38–44. The type system, and where it broke

- Slide 38 — Hand-drawn hierarchy: Any → {String, Boolean, Number}; Number →
  {Integral → ZZ32, ZZ64, ZZ; Float → RR32, RR64}. Will overloading work with
  `print(x: ...)` for each? The code, typeset only:

  ```
  print(x: String) = …                 print(x: ℤ) = …
  print(x: Boolean) = …                print(x: ℝ32) = …
  print(x: ℤ32) = …                    print(x: ℝ64) = …
  print(x: ℤ64) = …
  ```

- Slide 39 — How to say you DON'T want sharing (needed for the meet rule /
  overload safety): `excludes` clauses — **quadratic blow-up!** The code,
  typeset only:

  ```
  trait String extends { Any } … end
  trait Boolean extends { Any } excludes { String } … end
  trait Number extends { Any } excludes { String, Boolean } … end
  ```

- Slide 40 — Fix: `partitioned trait Primitive extends {Any}` — children of a
  partitioned trait are pairwise disjoint; hierarchy becomes Any → Primitive →
  {String, Boolean, Number(partitioned)}. The code, typeset only:

  ```
  partitioned trait Primitive extends { Any } end
  trait String extends { Primitive } … end
  trait Boolean extends { Primitive } … end
  partitioned trait Number extends { Primitive } … end
  ```

  **[repo]** `partitioned` never shipped; the implementation uses
  `comprises` + `excludes` (numeric lattice
  ZZ32 <: ZZ64 <: ZZ <: QQ <: RR64 extracted from source in the chat session;
  `Number comprises {RR64}` seals the tower).
- Slide 41 — Fully symmetric dynamic multimethod dispatch on run-time types of
  ALL arguments (no visitor pattern); types never erased: dispatch can tell
  `List[\Boolean\]` from `List[\String\]`, both more specific than `List[\T\]`.
  The code, typeset only:

  ```
  crunch(x: List⟦Boolean⟧) = …
  crunch(x: List⟦String⟧) = …
  crunch⟦T⟧(x: List⟦T⟧) = …
  myList: List⟦Object⟧ = …
  crunch(myList)
  ```

  "… could end up invoking any of the three definitions".
- Slide 42 — Run-time type inference: `crunch(myList)` where
  `myList: List[\Object\] =` a list of threads must infer `T = Thread` at run
  time. The code, typeset only:

  ```
  crunch(x: List⟦Boolean⟧) = …
  crunch(x: List⟦String⟧) = …
  crunch⟦T⟧(x: List⟦T⟧) = …
  myList: List⟦Object⟧ = a list of threads
  crunch(myList)
  ```

  "needs to infer at run time that T = Thread".
- Slide 43 — Static parameters with interdependent bounds (typeset only):

  ```
  mangle⟦M extends { PartialOrder⟦M⟧, Group⟦M, +⟧ },
         F extends M → N,
         N extends List⟦M⟧⟧
       (x: M, f: F): N = …
  ```

  "In general, this requires solving a system of type inequalities at run
  time."
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
  [Correction 2026-09-23: these files are in the java.net trunk tip `a874948ac` itself (`justificationOfRTR.tex` from `8015b17f4`, 2012-08-31), not preserved by the graft; see `explorations/coordinator/lineage.md`.]

## 45–50. Lessons and reflections

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
  binding**. The code, typeset only:

  ```
  if x ← z then f(x) else y end
  ```

  "where the type of z is Maybe⟦T⟧".
- Slides 49–50 — Closer: Greenspun's Tenth Rule; slide 50 adds "a modern
  variation": any sufficiently complicated parallel program contains "an ad
  hoc, informally-specified, bug-ridden, slow implementation of . . . what?";
  "We need to figure out what 'what' is."

## Code for a histogram-water demo

The deck gives two of the four solutions of the talk "Four Solutions to a
Trivial Problem", described from its captions in
`research/extracts/SteeleGoogleTechTalk2015-extract.md` (line numbers below
are of that file). The input is slides 4–8's `2 6 3 5 2 8 1 4 2 2 5 3 5 7 4 1`;
the deck states no answer, the captions extract gives 35 (line 74).

- **Slide 9 — the big-operator one-liner**: the talk's Solution 4, parallel
  prefix (lines 157–176; lines 166–167 identify it with slide 9). Beyond the
  deck it needs:
  - the two arrowed `MAX` operators over a `List⟦ℤ32⟧`, a left-to-right and a
    right-to-left running `MAX`, which the talk puts in the library as
    operators whose implementation it leaves open (lines 159–163); the deck
    gives neither a definition nor an ASCII spelling. **[repo]** The library
    has no running `MAX`; the nearest are `PREFIX_SUM` and `SUFFIX_SUM`, on
    `Array[\ZZ32,ZZ32\]` only (`Library/FortressLibrary.fsi:2686–2687`);
  - a three-argument `zip(x, y, z)` that generates triples. **[repo]** The
    library's `zip` takes one other list, as a dotted method, `l.zip(other)`
    (`Library/PureList.fsi:75`, `Library/FortressLibrary.fsi:1332`).
- **Slides 18–19 — the recursive walk over a tree**: the talk's Solution 3, the
  monoid-cached tree (lines 135–155), as one downward pass carrying both the
  maximum to the left and the maximum to the right, the "careful coding [that]
  computes both at once" (lines 149–152); slide 36 repeats its recursive line.
  The talk's code names this sweep `process`, not `walk` (lines 342–343).
  Beyond the deck it needs:
  - `maxCachedTree`, which builds the tree from the list, each node caching the
    `MAX` of its leaves (lines 137–144);
  - `Pair`, with children `a` and `b` and the cached maximum `val`, and `Leaf`,
    with the bar height `val`;
  - a type that holds both `Pair` and `Leaf`, for `maxCachedTree`'s result and
    for `a` and `b`, so that `walk`'s two overloads cover it; in the talk this
    is `trait CachedTree comprises {NullNode, SingletonNode, PairNode}` (lines
    140–141);
  - a case for the empty list, which `walk` lacks; the talk's `NullNode` holds
    `MAX`'s identity, −∞ (lines 141–142).

  These slides type the list `List⟦ℤ⟧` (`List[\ZZ\]`), slide 9 `List⟦ℤ32⟧`.
- Solutions 1 (three sequential sweeps, lines 80–96) and 2 (bitonic globs,
  lines 98–133) are on no slide of this deck; their code is still an open item
  of the captions extract (lines 341–345).
- What the ICFP 2009 deck gives each item above, and what is still missing: `SteeleICFP2009-extract.md`, "What this deck gives the histogram-water demo".

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
