# Extract: the Fortress code of "Four Solutions to a Trivial Problem"

Working notes on the code slides of Guy L. Steele Jr.'s Google TechTalk
(2015-12-01, https://www.youtube.com/watch?v=ftcIcn8AmSY, slides (c) 2015
Oracle). Transcribed by hand from screenshots of the talk video (supplied
by Pavol, 2026-08-24) back to ASCII Fortress source -- the inverse of what
bin/fortick does. Our own transcription and commentary; per repo policy no
slide images are committed. Companion to
SteeleGoogleTechTalk2015-extract.md (the captions-only content extract,
which carries the timestamps).

Purpose: best-practice grounding for the microgpt canonical-form rewrite
-- see explorations/microgpt-native-brief.md.

Transcription conventions: subscripts `left_k` are array indexing
`left[k]`, white brackets are `[\ \]`, angle lists are `<| |>`, Sigma
with a generator under it is `SUM[gen]`, oplus is `OPLUS`, parallel-bars
concatenation is `||`. Verification: feed these back through fortick and
compare the render to the screenshots.

## s1-sequential.jpg — "Sequential Code" (Solution 1)

```fortress
histogramWater(x: Array[\ZZ32,ZZ32\]): ZZ32 = do
  n = |x|
  if n = 0 then 0 else
    left = array[\ZZ32\](n)
    left[0] := x[0]
    for k <- seq(1 : n-1) do left[k] := left[k-1] MAX x[k] end
    right = array[\ZZ32\](n)
    right[n-1] := x[n-1]
    for k <- seq(n-2 : 0 : -1) do right[k] := right[k+1] MAX x[k] end
    result: ZZ32 := 0
    for k <- seq(0 : n-1) do result += ((left[k] MIN right[k]) - x[k]) end
    result
  end
end
```

Idioms: strided range `seq(n-2:0:-1)`; compound assignment `+=`;
`array[\T\](n)` allocation; `|x|` for size; if-expression returns value.

## s1-sequential-optimized.jpg — "Sequential Code (Optimized)"

```fortress
histogramWater(x: Array[\ZZ32,ZZ32\]): ZZ32 = do
  n = |x|
  if n = 0 then 0 else
    left = array[\ZZ32\](n)
    left[0] := x[0]
    for k <- seq(1 : n-1) do left[k] := left[k-1] MAX x[k] end
    right: ZZ32 := x[n-1]
    result: ZZ32 := 0
    for k <- seq(n-1 : 0 : -1) do
      right MAX= x[k]
      result += ((left[k] MIN right) - x[k])
    end
    result
  end
end
```

Idioms: compound operator assignment `MAX=` — ANY operator can compound-
assign. The two-pass fused form (the one our microgpt "would compile to").

## s2-glob-structure.jpg — "Glob Data Structure and Utility Operations"

```fortress
object Glob(left: List[\(ZZ32,ZZ32)\], ht: ZZ32, wd: ZZ32,
            right: List[\(ZZ32,ZZ32)\], water: ZZ32)
end

width(x: List[\(ZZ32,ZZ32)\]) = SUM[(p,q) <- x] q

fill(x: List[\(ZZ32,ZZ32)\], m: ZZ32) = SUM[(p,q) <- x] q (m - p)

object GlobReduction
        extends { MonoidReduction[\Glob\],
                  ReductionWithZeroes[\Glob, Glob\] }
    getter asString(): String = "GlobReduction"
    empty(): Glob = Glob(<| |>, -INFINITY, 0, <| |>, 0)
    join(a: Glob, b: Glob): Glob = a OPLUS b
end

opr BIG OPLUS(): BigReduction[\Glob, Glob\] = BigReduction[\Glob, Glob\](GlobReduction)
```

THE key slide. Idioms: `SUM[(p,q) <- x] q` — big-operator comprehension
with tuple-destructuring generator, one line per mathematical definition.
User-defined reduction: object extending MonoidReduction[\T\] with
empty()/join(); then `opr BIG OPLUS()` registers a user-defined BIG
operator usable as `BIG OPLUS [g <- gen] expr`. (Note slide shows q×(m−p)
with explicit ×; juxtaposition also fine.) `-INFINITY` as monoid identity.

## s2-threewaysplit.jpg — "Utility Operation for Splitting Sorted Lists"

```fortress
threeWaySplit(x: List[\(ZZ32,ZZ32)\], m: ZZ32): (List[\(ZZ32,ZZ32)\], Maybe[\ZZ32\], List[\(ZZ32,ZZ32)\]) =
  if |x| = 0 then (<| |>, Nothing, <| |>)
  elif |x| = 1 then
    (a, b) = x[0]
    if a < m then (x, Nothing, <| |>)
    elif a > m then (<| |>, Nothing, x)
    else (<| |>, Just b, <| |>) end
  else
    (y, z) = x.split()   (* into approximately equal nonempty pieces *)
    (n, w) = z[0]
    if m < n then
      (p, q, r) = threeWaySplit(y, m)
      (p, q, r || z)
    else
      (p, q, r) = threeWaySplit(z, m)
      (y || p, q, r)
    end
  end
```

Idioms: `x.split()` — the List's own parallel-decomposition primitive
(this is what makes List a generator that divides); tuple returns and
tuple destructuring everywhere; Maybe/Nothing/Just; `||` concatenation.

## s2-oplus-combiner.jpg — "Code for Combining Two Bitonic Globs"

```fortress
opr OPLUS(x: Glob, y: Glob): Glob =
  case (x.ht CMP y.ht) of
    LessThan =>
      (lss, eql, gtr) = threeWaySplit(y.left, x.ht)
      Glob(x.left || <| (x.ht, x.wd + width(x.right) + width(lss) + eql.getDefault(0)) |> || gtr,
           y.ht, y.wd, y.right,
           x.water + fill(x.right, x.ht) + fill(lss, x.ht) + y.water)
    GreaterThan =>
      (lss, eql, gtr) = threeWaySplit(x.right, y.ht)
      Glob(x.left, x.ht, x.wd,
           y.right || <| (y.ht, eql.getDefault(0) + width(lss) + width(y.left) + y.wd) |> || gtr,
           x.water + fill(lss, y.ht) + fill(y.left, y.ht) + y.water)
    EqualTo =>
      Glob(x.left, x.ht, x.wd + width(x.right) + width(y.left) + y.wd, y.right,
           x.water + fill(x.right, x.ht) + fill(y.left, x.ht) + y.water)
  end
```

Idioms: user `opr OPLUS` on a user object; `case (a CMP b) of LessThan/
GreaterThan/EqualTo` three-way comparison dispatch; the slide's punchline
"Is it associative?" — the operator is engineered to BE associative so
the BIG reduction may regroup freely: associativity as a designed,
load-bearing property, not an accident.


## s2-final-oneliner.jpg — "Final Divide-and-Conquer Code" (slide 59)

```fortress
histogramWater(x: List[\ZZ32\]): ZZ32 = (BIG OPLUS[v <- x] Glob(<| |>, v, 1, <| |>, 0)).water
```

The whole of Solution 2's top level: map each element into the monoid
(a singleton Glob), BIG-reduce with the user-defined ⊕, project the
answer. Generate-map-reduce as ONE expression; parallelism implicit in
the reduction tree.

## s3-cachedtree-adt.jpg — "Code to Make a MAX-cached Tree (1 of 2)" (slide 66)

```fortress
trait CachedTree comprises { NullNode, SingletonNode, PairNode }
  getter val(): ZZ32
end

object NullNode(val: ZZ32) extends CachedTree end
object SingletonNode(val: ZZ32) extends CachedTree end
object PairNode(val: ZZ32, a: CachedTree, b: CachedTree) extends CachedTree end

maxCachedTree(x: List[\ZZ32\]) =
  if |x| = 0 then NullNode(-INFINITY)
  elif |x| = 1 then SingletonNode(x[0])
  else
    (p, q) = x.split()   (* into approximately equal nonempty pieces *)
    (a, b) = (maxCachedTree p, maxCachedTree q)   (* parallel recursion here *)
    PairNode(a.val MAX b.val, a, b)
  end
```

Idioms: `comprises` — a SEALED sum type (closed algebraic data type) as
a trait; abstract getter in the trait, leaf objects supply it via
constructor params. **THE parallel idiom: `(a, b) = (f p, f q)` — tuple
component evaluation is implicitly parallel.** Steele's own comment
marks it: "parallel recursion here". No task API, no seq/par keyword —
the TUPLE is the fork.

## s3-process-multimethod.jpg — "Efficient Parallel Solution (Two Passes)"

```fortress
histogramWater(x: List[\ZZ32\]): ZZ32 = process(maxCachedTree x, -INFINITY, -INFINITY)

process(x: PairNode, left: ZZ32, right: ZZ32): ZZ32 =
  (* parallel recursion here *)
  process(x.a, left, x.b.val MAX right) + process(x.b, left MAX x.a.val, right)

process(x: SingletonNode, left: ZZ32, right: ZZ32): ZZ32 =
  ((left MIN right) MAX x.val) - x.val

process(x: NullNode, left: ZZ32, right: ZZ32): ZZ32 = 0
```

Idioms: structural recursion by MULTIMETHOD DISPATCH — three `process`
definitions selected by node type; no case/match on the sum type at
all. And again implicit parallelism: the two operands of `+` evaluate
in parallel ("parallel recursion here"). Slide's own footer: "Two pages
of code total, and no need to operate on a special 'glob' data
structure."

## s4-concise-final.jpg — "Concise Solution (6 of 6)" (slide 83)

```fortress
histogramWater(x: List[\ZZ32\]): ZZ32 =
  SUM[(v, left, right) <- zip(x, PREFIX_MAX x, SUFFIX_MAX x)] ((left MIN right) - v)
```

(Typeset: Σ under-annotated with the 3-tuple generator; MAX with over-
arrows = the prefix/suffix scan operators — our arrow-notation fix
renders exactly these.) Slide text: "Inlining and loop fusion transform
this into the efficient two-pass sequential solution. Inlining and
deforestation ('loop fusion on trees') transform this into the
efficient two-pass parallel solution." The one-liner is the SOURCE of
both efficient forms — fold order and pass structure are derived, not
specified.

## philosophy-algebraic-properties.jpg — "Algebraic Properties Are Important!" (slide 87)

- Associative: grouping doesn't matter!
- Commutative: order doesn't matter!
- Idempotent: duplicates don't matter!
- Identity: this value doesn't matter!
- Zero: other values don't matter!

"Invariants give the implementation *wiggle room* — the freedom to
exploit alternate representations and implementations. In particular,
*associativity* gives implementations the necessary wiggle room to use
parallelism — *or not* — as resources dictate."

The design brief for the microgpt rewrite in five bullets.

## Philosophy slides (88–91) — the mindset

**"We Need a New Mindset" (88):** DO loops are so 1950s; so are linear
linked lists; Java-style iterators are so last millennium. **"As soon
as you say 'first, SUM = 0' you are hosed."** "If you say 'process
subproblems in order,' you lose." "A for(;;) loop is the *worst
possible way* to say map." The great tricks of the sequential past
WON'T WORK — but our languages still encourage them.

**"The Parallel Future" (89):** Top-down: don't split into "the first"
and "the rest" — split into roughly equal pieces, recursively solve,
combine subsolutions. Bottom-up: **don't create a null solution and
successively update it — map inputs independently to singleton
solutions, then merge treewise.** Combining subsolutions is usually
trickier than incremental update (that's where the design work lives —
cf. "Is it associative?").

**"The Fully Engineered Story" (90):** in practice: optimized singleton
representations; branching factors > 2 (Clojure's 64-ary trees cited);
self-balancing trees (2-3, red-black, finger trees); **use sequential
techniques near the leaves; arrays at the leaves; decide dynamically
whether to process sequentially or by parallel subdivision.** ⇒
Sequential execution belongs at the LEAVES as an engineering layer —
never as the program's semantic shape.

**"Conclusion" (91):** linear problem decomposition is hard to
parallelize; independence + divide-and-conquer runs parallel OR
sequential as resources dictate; the overheads are real and will
shrink but not disappear (the GC analogy); in a world of parallel
computers of wildly varying sizes *including 1*, this is the only hope
for portability; better language design encourages "independent
thinking."

(Also replaced s2-threewaysplit.jpg with the full-resolution capture;
transcription re-verified against it — matches.)
