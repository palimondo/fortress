# microgpt-native: design journal

The documented evolution of `microgpt.fss` from verified transliteration
to canonical Fortress. Mission, rules, and grounding:
`explorations/microgpt-native-brief.md`. Method: explore alternatives,
adjudicate by algorithmic purity (is this the computation, or an
accident of implementation?), verify each step against the v1 golden
anchors, measure everything, and never declare a form canonical after a
first pass.

Companion code: `explorations/nprobe.fss` (idiom probes),
`explorations/tparallel.fss` (parallelism characterization), and the
`microgpt_n*.fss` version ladder as it grows.

## 2026-08-24 — Probe results: the 2012 interpreter vs the 2015 idioms

The Four Solutions talk postdates our tree's freeze by three years, so
before designing anything we probed every idiom the rewrite wants
(`nprobe.fss`, run under the walk interpreter, JDK 25 container):

| # | Idiom | Verdict |
|---|-------|---------|
| P1 | `SUM[(p,q) <- pairs] q`, `SUM[v <- xs] v v`, `SUM[k <- 0#4] xs[k]` | **works** — big-operator comprehensions with tuple-destructuring generators, exactly the slides' syntax |
| P2 | user monoid: `object WSum extends CommutativeMonoidReduction[\W\]` + `opr BIG OPLUS(): BigReduction[\W,W\]` registration | **works** — `BIG OPLUS[w <- ws] w` reduces a user type through a user join |
| P3 | commandeering `SUM` itself for a user type | **impossible** — three ways (below) |
| P4 | implicit tuple parallelism `(a,b) = (f p, f q)` | **works** — and exposed the interpreter's performance law (below) |
| P5 | `trait Tree comprises {…}` + multimethod structural recursion | **works** |
| P6 | `atomic do … end` | **works** — ~16% overhead over a plain assignment in a hot loop (≈2 µs/op); cheap enough to consider for parallel gradient accumulation |
| P7 | `zip` inside a comprehension: `SUM[(a,b) <- xs.zip[\RR64\](ys)] a b` | **works** (explicit type arg needed on `zip`) |
| P8 | `xs.split()` | **works** — `(<\|1,2\|>, <\|3,4\|>)` |

So the full Steele register is available to us, with one closed door:

**P3, why `SUM` is closed.** Library `SUM` is
`opr SUM[\T extends Number\]()` and `Number comprises {RR64}` — sealed,
so an autodiff `V` can never satisfy the bound. Overloading is also out:
a nullary `opr SUM()` of our own collides ("parameter lists have the
same types" — the check ignores static params, tested with a
disjoint-bound generic too), and a generator-only overload
`opr SUM(g: Generator[\V\])` is bypassed because the comprehension
desugars through the *nullary* form, then dies casting `V` to `Number`.
Consequence: reductions over `V` use a **registered user BIG operator**.
Which glyph to use is a real design decision, deferred to the value-type
design below (Steele's own precedent for a user monoid is `BIG OPLUS`,
but ⊕ is not the papers' Σ; an n-ary sum *node* may dissolve the
question entirely).

## 2026-08-24 — The interpreter's performance law (found, not sought)

P4's numbers made no sense at first: on a 4-CPU box (interpreter pool =
`floor(cpus/2)` = 2 workers, override `FORTRESS_THREADS`), a 500k-iter
scalar loop took 12–14 s run bare, but **two** of them inside a tuple
finished in 2.6 s — an "impossible" 8× from a 2-way fork. A tuple with
only one nontrivial element stayed slow, so it wasn't a fast task path.
`tparallel.fss` isolates it:

| shape | 2 workers | 1 worker |
|-------|----------:|---------:|
| one loop, bare | 11.9–13.6 s | **2.1 s** |
| 2-tuple of loops | 2.6 s | 4.2 s |
| 4-tuple of loops | 5.4 s | 9.1 s |
| `(loop, 0)` tuple | 14.4 s | 2.2 s |

Mechanism (from `BaseTask.worthSpawning()` /
`TupleTask.worthSpawning()`, runtime source): everything runs inside the
fork-join pool, and the evaluator considers forking operand pairs of
ordinary expressions whenever the surplus-task count is low. With idle
workers it therefore **micro-forks constantly** — the 21 s of *kernel*
time below is that churn — and per-op cost is ~6× the inline path. Once
every worker is saturated (or with `FORTRESS_THREADS=1`, which never
spawns), evaluation goes inline and fast. Saturated 2-worker scaling is
real: 2.6 s vs 4.2 s single-worker = 1.6× on 2 workers.

Checked against real v1 code — `micrograd.fss` XOR training, results
bit-identical both ways: 45.2 s wall (21.7 s sys) default vs **19.8 s
wall (0.5 s sys)** with `FORTRESS_THREADS=1`.

Consequences for this project:

- Every mgbench/v1 number we published was measured on the pathological
  middle ground (2 workers, unsaturated): v1's 10.9 s/step is not the
  interpreter's floor. Re-baseline v1 under `FORTRESS_THREADS=1` before
  comparing native versions against it.
- The native version's parallelism must come in **coarse grains** that
  saturate the pool (Steele's "sequential at the leaves" is also the
  fast path here); fine-grained implicit forking is exactly what the
  slow path is made of.
- This is slide 91 measurable in Steele's own interpreter: "the
  overheads are real … and will shrink but not disappear."

## Design questions now open

1. **The value type.** Keep Karpathy's binary-graph `V` (children +
   local grads) vs an autodiff whose *sum is n-ary* — a `Sum` node with
   all addends as children, local grads 1 — which is arguably the Σ of
   the papers rather than a left-fold accident. Explore both.
2. **The reduction glyph for V.** `BIG OPLUS` (Steele's user-monoid
   precedent) vs dissolving V-level Σ into an n-ary node constructor.
   Fortify rendering is part of the fitness function.
3. **Backward pass.** v1's `visited` flag + explicit `Topo` object is
   one implementation of reverse-topological order. Alternatives:
   `comprises`-ADT multimethod walk (P5), commutative-monoid gradient
   accumulation, `atomic` accumulation under parallel construction (P6).
   Parallel *construction* of the graph is pure; parallel *backward*
   races on `grad` — a design question, not a reason for global `seq`.
4. **Formulation level.** Decided in the brief: per-token index
   formulas (what the program computes, KV cache included), papers'
   notation. Each formula should be one Fortress definition whose
   Fortify rendering approximates it.

Next: micrograd-scale value-type alternatives (question 1), verified
against v1's analytic derivatives and the XOR trajectory.

## 2026-08-24 — Surface notation probes (P9–P11)

Before designing the value type, three more probes (added to
`nprobe.fss`): a user type can carry **`opr juxtaposition`** (so `q k`
multiplies two autodiff values the way the papers juxtapose q_m k_m),
**`opr ^(self, n: RR64)`**, and unary `opr -`; and the library's prefix
functions **`exp`/`log` can be overloaded** for a user type (plain
function overloading — unlike `SUM`, nothing collides). All work. The
papers' surface register is therefore fully available: the only
substitution forced on us is ⊕ where a paper writes Σ over graph values
(and Σ proper still applies wherever the summands are `Number`s — which
the backward pass will exploit).

One more table fact: ∑ (U+2211) is a hard alias of `SUM`, and ∇
(U+2207) is not a Fortress operator at all, but **∂ (U+2202) is `DEL`**
— free for user definition. Both remaining alternatives below use it.

## 2026-08-24 — The value type: three alternatives, built and measured

All three share the decisions already made: papers' surface notation;
summation as an **n-ary Sum node** whose ∂ to every addend is 1, built
by `BIG OPLUS` over a *list-concatenation* monoid (`Comprehension`'s
`body` maps each addend to a singleton, `join` concatenates — exactly
associative, so parallel construction cannot perturb anything — and
`unwrap` lifts the addend list into one node whose value is the single
sequential fold, in generator order, at the leaf: Steele's "map to
singletons, merge treewise" and "sequential at the leaves" in one
object). All three run the same harness as v1 `micrograd.fss`: analytic
gradient checks at 1e-12 plus the XOR MLP, whose network is now one
definition:

    yhat(xa, xb) = b2v + (BIG OPLUS[j <- 0#nH] w2[j] relu(xa w1[j] + xb w1[nH+j] + b1[j]))

and whose whole SGD bookkeeping is one loop over a `params` list (v1
needed ten lines of per-array bookkeeping).

**A — uniform tape** (`mgnative_a.fss`): v1's node — children plus
local-gradient lists cached at construction — under the new surface.
The chain rule doesn't care which operation made a node, only what its
∂-values are; the uniform node is that observation as a data structure
(the Wengert-tape view).

**B — sealed ADT** (`mgnative_b.fss`): `trait Ex comprises {Leaf, Plus,
Times, Neg, Pow, Exp, Log, Relu, Sum}`, the symbolic-expression view.
The derivative table becomes nine visible equations, multimethods on
the prefix operator ∂:

    opr DEL(e: Times): List[\RR64\] = <|[\RR64\] e.b.data, e.a.data|>
    opr DEL(e: Exp):   List[\RR64\] = <|[\RR64\] e.data|>

Mutation is quarantined in a `Cell` composed into each node (traits
cannot hold fields; abstract setters have no precedent in the 2012
tree — the Cell is both the workaround and arguably the cleaner
statement: nodes immutable, accumulator explicit). Subtlety recorded:
B *recomputes* ∂ from `data` at backward time, so it is only correct
while forward values are unmutated; A and C snapshot ∂ at construction
and are robust to interleaved parameter updates.

**C — adjoint recursion** (`mgnative_c.fss`): the mathematically
explicit backward. The tape stores only the *transpose* graph (each new
node registers `(node, ∂node/∂child)` with its children), and the
gradient is the memoized literal chain rule — a genuine Σ-comprehension,
since adjoints are `Number`s:

    opr DEL(v: V): RR64 =   (* memoized *)
      if |v.outs| = 0 then 1.0                        (* dL/dL = 1 *)
      else SUM[(u,d) <- seq(v.outs)] (DEL u) d end

No topological sort, no visited flags, no zero-then-accumulate sweep —
"first, SUM = 0 you are hosed" eliminated from the backward pass
itself. The SGD update reads `q.data := q.data - lr (DEL q)`.
Trade-offs: out-edge registration mutates the *children* at
construction, which is the one obstacle to parallel graph building
(atomic would fix it — P6 measured that cheap); and the recursion depth
is the graph depth.

**Results** (400 XOR epochs, `FORTRESS_THREADS=1`): every alternative
reproduces every printed loss of every other **bit-for-bit** (final
5.5178095183714354E-11), despite three different backward orders — one
arithmetic, three representations. Against v1 (5.51780951879265E-11)
they agree to ~10 significant digits; the drift is the designed
regrouping (n-ary sums, `d^2.0` as a pow node, negation as a
primitive), within the brief's 1e-9 contract. Loop times: A 17.5 s,
B 21.1 s (+20%: structural dispatch, rebuilding kids/∂ lists each
backward), C 24.4 s (+39%: recursion and transpose bookkeeping;
adjoints of interior nodes computed even where unused).

**Standing verdict (to revisit at microgpt scale):** A for the engine's
default — the tape is the honest computational object and the fastest.
B's ∂-table is the best *pedagogy* of the calculus and belongs in the
presentation regardless of which engine ships. C is the purest
statement of what backward *is*, kept as the reference formulation; its
per-node Σ is also the natural site for parallel gradient accumulation
later. The three files stay in-tree as the documented design space.

Next: Fortify-render the candidate forms (the rendering is part of the
fitness function), then scale the chosen constellation to the
transformer with the per-token formulas.

## 2026-08-24 — Rendering pass (the fitness function, applied)

`explorations/fortify/mgnative-forms.tic` typesets the money forms of
all three alternatives on one sheet (SVGs alongside). What the render
taught, and the polish it forced:

- `yhat` reads as a paper formula: big ⊕ with the generator underneath,
  `w2[j]` → w2ⱼ, juxtaposition as invisible times. But `xa`/`xb` read
  as products x·a — renamed to `x1`/`x2` (→ x₁, x₂) in all three files.
  Lesson: under Fortify, multi-letter lowercase names cost more than
  they do in ASCII; name variables the way the paper does.
- B's ∂-table renders as a calculus table — `opr ∂(e: Times) = ⟨…⟩` —
  and C's adjoint really is the chain rule under a Σ with
  `(u,d) ← seq(v.outs)` beneath it. The `seq(…)` in the generators
  stays: it is the honest marker that the fold order is pinned.
- The all-ones gradient of Sum is now a comprehension
  `<|[\RR64\] 1.0 | a <- addends|>` (⟨1.0 | a ← addends⟩) instead of
  `map(fn a => 1.0)` — same meaning, mathematical surface.
- Failed simplification, recorded: dropping the `[\RR64\]` ascriptions
  from list literals. The interpreter infers element types from
  *runtime values*, and numeric literals stay `FloatLiteral` even when
  stored in `RR64`-typed fields, so `<|1.0, 1.0|>` and even
  `<|e.b.data, e.a.data|>` produce `ArrayList[\FloatLiteral\]` where
  `List[\RR64\]` is needed. Ascriptions on value-list literals are
  load-bearing; all restored (trajectories re-verified bit-identical,
  A 18.1 s / B 22.0 s / C 23.8 s).

## 2026-08-24 — Architecture of the transformer-scale rewrite

Working mode from here (Pavol's direction): experiments and
implementation are delegated to workers; this journal carries the
design decisions and their reasons. In parallel, a worker is
characterizing which of our sources the **bytecode compiler** path
accepts — both for possible speedups and to ground a catalog of
compiler gaps in real programs.

Decisions for `microgpt_native.fss` (engine = alternative A):

1. **Vectors are `List[\V\]`, matrices lists of row-vectors, and every
   reduction is a scalar-level ⊕ comprehension.** No `Vec`/`Mat`
   objects, no vector-sum monoid. Reason: the chosen canonical level is
   the papers' per-token *index* formulas (`A_ij = (Σ_m Q_im K_jm)/√d_k`),
   which are scalar-Σ statements already; and a second `BIG OPLUS`
   registration for a vector carrier would collide with the scalar one
   (nullary big-operator registrations are one-per-name — the P3
   lesson). `(W x)_r = ⊕_m W[r][m] x[m]` is one comprehension inside a
   list comprehension.
2. **Heads are structure, not offsets** (purity ledger). `wq/wk/wv` are
   head-indexed lists of (hs × d) matrices, per-head caches of
   hs-vectors; the flat d×d matrix and its offset arithmetic
   (`h headDim + m`) disappear. Golden-check preservation constraint:
   the deterministic init formula must be evaluated at the *global* row
   index (head h, row m → row h·hs+m of v1's flat matrix) so the
   partitioned weights are value-identical to v1's — a row-block
   partition of the same matvec.
3. **There is no "cache".** In the autoregressive index formulas the
   attention at step i sums over k_j, v_j for j ≤ i; the growing lists
   `keys`/`vals` ARE those formulas' data, not a memo of something
   else. (Adjudicates the KV-cache ledger entry: at this formulation
   level it is not an optimization at all.)
4. **Division becomes a primitive**: `opr /(V,V)` with ∂ = (1/b, −a/b²)
   and `opr /(V, RR64)` for constant divisors (√d_k), replacing v1's
   pow(−1)-then-multiply — the formulas say division.
5. **Softmax keeps the max-shift** with the shift as an RR64 constant
   (softmax(x) = softmax(x−c) identity; ledger: legitimate), written
   inside one `softmax(List[\V\]): List[\V\]` definition; the loss is
   `−log softmax(logits)[y]`.
6. **Adam stays index-form RR64 arithmetic** over a flat parameter
   list with parallel m/v arrays — the optimizer's equations are
   already scalar index formulas.
7. **Verification ladder**: v1's `goldenCheck` numbers at 1e-9 (the
   reordering drift is ~1e-15 relative), then a short nano training
   run confirming the loss decline from ~3.29, then timing under
   `FORTRESS_THREADS=1` and default (2 workers), against v1
   re-baselined the same way.
8. Parallelism enters only in coarse grains and only after
   correctness: heads and matvec rows are independent (pure graph
   construction under engine A), the backward sweep stays sequential
   for now; C's per-node Σ remains the candidate for a parallel
   backward later.

## 2026-08-24 — Presentation plan: the spectrum, not the destination

The updated "A GPT You Can Read" (same artifact URL) should be
structured the way Steele structured Four Solutions: one problem,
several solutions, each teaching something — because the exploration
landed on his shape without forcing it:

- **Solution 1 — the transliteration** (v1 `microgpt.fss`): correct,
  golden-verified, sequential by design; the Python accent named
  honestly, "first, SUM = 0" eleven times. Its role: the anchor
  everything else is measured against. (Steele's imperative sweep.)
- **Solution 2 — the user monoid** (`mgnative_a.fss`): summation as an
  n-ary node built by a registered ⊕ over list concatenation; the
  network becomes one definition. (Steele's Glob: map to singletons,
  merge treewise, associativity designed in.)
- **Solution 3 — structure and dispatch** (`mgnative_b.fss`,
  `mgnative_c.fss`): the graph as a comprises-ADT with the derivative
  table as ∂-multimethods; and backward as the memoized chain rule, a
  literal Σ over consumers. (Steele's CachedTree + multimethod
  `process`.)
- **Solution 4 — the concise form** (`microgpt_native.fss`): the
  per-token index formulas of the papers, one Fortress definition per
  equation, Fortify-rendered next to the corresponding formula from
  the target-notation list in the brief.

Supporting threads to weave in, with measurements: the interpreter's
performance law (micro-forking vs saturation — Steele's "the overheads
are real" made measurable in his own interpreter), the bit-identical
trajectories across representations as the verification story, and the
compiler-gap catalog once the worker's sweep lands. Tone rule stands:
no self-praise; the artifact narrates the language and the mathematics,
not our effort.

## 2026-08-24 — Compiled path characterized: the library is the gap

The delegated sweep is in: `explorations/compiled-path-gaps.md` (12-gap
catalog G1–G12, minimal probes committed in
`explorations/compiler-probes/`). What it changes for this project:

- **None of our six programs compiles, and none of the failures is
  codegen.** The compiler path swaps the prelude to the 592-line
  monomorphic `CompilerLibrary`; `List`, `array`, `exp`/`log`, `SUM`,
  and the whole `MonoidReduction`/`Comprehension` machinery our designs
  stand on simply do not exist there. The 2012 "still `sayWhat`s"
  folklore mislabels the blocker — only `label`/`exit` actually
  `sayWhat`s (G11).
- **The prize is measured, not estimated**: 6.8× on scalar loops, 8.9×
  on autodiff-shaped object churn, ~8× on startup — with bit-identical
  numerics where the path works (`tparallel` compiles after a one-line
  `nanoTime` type accommodation, G5, and matches its checksum to the
  last digit at 5.6×).
- **Design feedback**: G8 (no multimethod dispatch on a `comprises`
  union) blocks alternative B's whole dispatch style on the compiled
  path, and G9 (`typecase` silently wrong on literals) removes the
  workaround — B stays interpreter-only until the compiler grows. G7's
  fix (declare methods abstract on the trait) is idiomatically better
  Fortress regardless and costs us nothing to adopt.
- **No compiled fast path for training exists today** — the PRNG
  experiment's chart keeps the interpreter line only, and the
  modernization goal "fix the bytecode compiler path" now has a
  prioritized worklist (report §4): the two one-line library edits
  (G5, G6) first, `exp`/`log` next, then the real project — porting
  the generic generator/reduction layer of `FortressLibrary` onto
  `CompilerLibrary` — with G9 treated as a standalone correctness bug.

## 2026-08-24 — PRNG verdict: the generator doesn't matter, the seed does

The delegated head-to-head is in: `explorations/prng-findings.md` with
the chart (`prng-chart.svg`). Summary: Fortress's `random()` is
literally `Math.random()` — one process-wide time-seeded `java.util.Random`,
unseedable from Fortress source — yet swapping it for CPython's Mersenne
Twister changes nothing observable: the two Box–Müller samplers are
statistically indistinguishable at our sizes, and the three Fortress
trajectories sit inside the 15-seed CPython envelope at exactly the rate
a 16th seed would (tail means 0.03 sd apart). The v1 loss-band anchor
stands as written.

Two consequences adopted:

- **Correction filed** in `microgpt-port.md`: its premise "Python's
  Mersenne Twister is not ours" was wrong — `Library/Random.fss` ships
  a full, tested, seedable MT19937 (reference constants, green-suite
  `RandomTest`). Verified claims only; this one slipped through.
- **Design option registered for `microgpt_native`** (post-golden):
  seed a `mersenneTwister(seed)` from `Library/Random` for
  bit-reproducible training runs — today every Fortress run is an
  unrepeatable experiment — and, if CPython's `init_by_array` seeding
  (~10 lines) is ported, the Python and Fortress programs could share
  one *stream*, upgrading the statistical band check to another exact
  golden. Caveat noted in the report: draw *order* must be pinned
  (sequential fills) for that to hold.

## 2026-08-24 — microgpt_native.fss: gates green, spec implemented as written

The delegated implementation landed (`explorations/microgpt_native.fss`,
378 lines) and passed review; independently re-verified in the main
checkout (golden PASS, 1264 params — identical count to v1, confirming
the head partition covers exactly the same weights; loss 3.26→2.51 by
step 30). Worker's full 250-step run: the ~2.0–2.5 band and name-like
samples (atalenn, arane, sara, sonna), **20.4 min vs v1's published
45.4** — and in the paired `FORTRESS_THREADS=1` comparison the native
version is ~15% *faster* than v1 (4.81 vs 5.69 s/step): the n-ary ⊕
sum nodes shrink the graph more than O(log n) `List` indexing costs.
The micro-forking law reproduced on the transformer (default 2 workers
≈1.6× slower than one).

What review noted with approval, beyond spec compliance:

- **The KV "cache" didn't just get renamed — it dissolved.** `forward`
  returns `(logits, kh2, vh2)` and the histories are threaded
  functionally through tuple destructuring; no mutable cache object
  exists (decision 3 taken further than the spec's own sketch).
- All four divisions the formulas contain are written as divisions
  (rmsnorm, softmax, attention scale, loss/temperature normalization).
- Head outputs reassemble by a two-generator comprehension
  (`h <- 0#nHead, m <- 0#headSize`); the only global row index left in
  the program is the golden-preservation init mapping.
- In-scope choices worth keeping: matvec as top-level
  `opr juxtaposition(List[\List[\V\]\], List[\V\])` so the source says
  `W x`; a vector `opr +` for the two residual connections.

New syntax traps, paid for and recorded (worker's report): chained
subscripts on nested lists mis-parse — `m[i][j]` must be `(m[i])[j]`
(v1's `(kc.get(t))[hs+j]` had silently worked around the same thing);
and a comprehension body ending in a subscript swallows the `|`
separator, so comprehension bodies are blanket-parenthesized.

Still open on this file: the Fortify render sheet (fitness pass — the
`d 1.0`-style ZZ32→RR64 coercions are known blemishes to look at), the
seeded-MT reproducibility option above, coarse-grain parallelism
(decision 8), and the presentation rebuild.

## 2026-08-24 — Course correction: the paper register, and teaching both constructions

Pavol's review of the rebuilt presentation, distilled: it explained the
project, not the transformer, and it showed one notation carried up a
ladder rather than a genuine exploration of notational alternatives.
The corrected vision, confirmed with him: the page teaches the
transformer block by block, and at each block simultaneously teaches
what Fortress must be *taught* — which types, operators, and reductions
must be built — so that the block's running definition collapses to the
formula the AI literature prints. The fitness function is the visual
distance between the Fortify render and the paper's own notation, and
the abstraction-building layer is content to teach, not scaffolding to
hide.

That verdict reopens the "canonical level" decision this journal made
earlier (per-token index formulas): the literature's register for the
model level is **vector/matrix notation** — `softmax(q·Kᵀ/√d_k)V`,
`W₂ relu(W₁ x)`, `x/√(x·x/d+ε)` — and the index formulas belong one
level down, as the *definitions* of that notation. Spec for
`explorations/microgpt_paper.fss` (next code round):

1. Vectors stay `List[\V\]`, matrices lists of rows — no wrapper
   objects, so renders carry no field noise.
2. The notation layer, each operator defined once by its index formula
   (these definitions are themselves exhibits):
   - `opr DOT(u, v)` — u·v = ⊕ₘ uₘvₘ (also gives rmsnorm its ‖x‖²).
   - `opr juxtaposition(W, x)` — matrix·vector, (W x)ᵣ = ⊕ₘ Wᵣₘxₘ
     (exists).
   - `opr juxtaposition(p, M)` — **vector·matrix**, (p M)ₘ = ⊕ⱼ pⱼMⱼₘ:
     this is the attention blend Σⱼ pⱼVⱼ in disguise, and defining it
     at index level dissolves the second-monoid problem (a `BIG OPLUS`
     over vectors would collide with the scalar registration — nullary
     big-operator registrations are one-per-name).
   - `opr juxtaposition(a: V, x: Vec)` — scalar·vector; `opr /(x, s)`
     — vector/scalar; `opr -(x, c)` if softmax wants it; elementwise
     `relu`/`exp` overloads on vectors.
   - `concat(heads)` — a named function, as the literature names it.
3. The model level then states each block in one paper-shaped line:
   `h0 = wte[t] + wpe[i]`;
   `rmsnorm(x) = x / (((x DOT x)/(d) + eps)^0.5)`;
   `attend(q, K, Vv) = softmax(<|(q DOT k)/SQRT dk | k <- K|>) Vv`;
   `ffn(x) = fc2 (relu (fc1 x))`; residuals by vector `+`.
4. Everything else (Adam, tokenizer, sampling, golden check) carries
   over from `microgpt_native.fss` unchanged — Adam's literature form
   *is* elementwise index arithmetic, so it stays index-form on
   purpose, and that contrast is itself a teaching point.
5. Gate unchanged: v1's goldenCheck at 1e-9, then a short training
   run. `microgpt_native.fss` stays in-tree as the index-form rung of
   the notation ladder: transliteration → index formulas → paper
   register.
6. Notation contests to record per block (for the journal and the
   page): index vs vector form; DOT vs juxtaposition for the inner
   product; named function vs operator for softmax/rmsnorm/concat —
   each adjudicated by the render against the paper.

## 2026-08-24 — Presentation rebuilt as the four-solutions story

"A GPT You Can Read" (same artifact URL) rewritten from scratch on the
plan above: cast introduction assuming zero prior context, Solution 1
(the literal translation, its verification, and the derivative table
carried over from the old page), the interlude on Steele's three ideas,
Solution 2 (the ⊕ design and the bit-identical three-engine result),
Solution 3 (the transformer formula sheet, with the v1 attention figure
kept as the *before* against the new one), then the three measurement
threads (micro-forking, the PRNG chart, the compiler-gap prize) and a
balanced coda ending on Karpathy's "everything else is just
efficiency". Writing rule applied throughout, per Pavol's feedback on
the session's chat summaries: every term defined before use, no
internal shorthand, honest numbers on both axes (the 15% win over the
transliteration and the ~200× loss to CPython). Design: single-column
Source Serif page, Fortify SVGs inlined once with per-figure id
namespacing and recolored for dark mode via CSS fill inheritance.

## 2026-08-26 — microgpt_paper.fss: the paper register, gates green

The delegated implementation landed (`explorations/microgpt_paper.fss`)
and passed independent re-verification: golden at 1e-9, 1264 params,
loss declining from ~3.3; the worker measured 4.62 s/step vs the
index-form rung's 4.81 — the notation layer costs nothing. The model
level now reads as the literature: `rmsnorm(x) = x / SQRT((x DOT x)/|x|
+ eps)`, `ffn(x) = fc2 relu(fc1 x)`, `h0 = wte[t] + wpe[i]`,
`attend = softmax(<|(q DOT k)/SQRT|q| | k <- K|>)` blended by
`BIG BOXPLUS[j] p[j] Vv[j]`.

Findings from the round, all recorded in
`explorations/microgpt-paper-impl-report.md`:

- **Vector-times-matrix juxtaposition is impossible**: the interpreter
  treats two instantiations of one generic trait as non-disjoint
  (`doubledOverloading3.fss` documents and doubts this in-tree), so at
  most one operator overload may exist on (List, List). The blend
  therefore wears its own big operator ⊞ — which renders as the
  brief's own target formula Output_i = Σ_j p_j V_j, so the forced
  deviation lands on the paper's other notation for the same object.
- **The one-registration-per-name rule is per-name, not per-carrier**:
  a second nullary `BIG OPLUS()` collides; `BIG BOXPLUS()` coexists.
- Render-driven polish: softmax shift without `konst`, `nll` split so
  p_y renders as a subscript, `K`/`Vv` names fixing a real LaTeX
  double-subscript error (note: the committed
  `microgpt-native-forms.tic` still carries that latent kh2/vh2
  double-subscript; benign in the current SVG, rename if regenerating),
  coercions pushed down into the notation layer so the model level
  carries no `1.0`s.
- New traps: `|w||>` and `/|` need spaces to lex; `V` cannot name a
  variable while object `V` is in scope.

The presentation was rebuilt on the confirmed braided structure —
thirteen sections teaching the transformer and the construction of its
notation together, paper formula boxes against Fortify-rendered
running definitions, the three-rung attention ladder as the visible
notation exploration — and republished at the same artifact URL. New
figure sheets: `paper-notation`, `paper-model`, `paper-attend`,
`native-attend` (all split-committed under `explorations/fortify/`).

## 2026-08-26 — The adversarial review: spec audit and process audit

Pavol's charge, verbatim in essence: you may be re-deriving what the
language provides and over-specifying what it infers, because you never
consulted the specification — review the implementation against the
spec's LaTeX source, and review the *reasoning process* in the session
transcripts. Both audits are committed:
`explorations/expressiveness-review.md` (20 findings, spec-cited, every
one probed against the interpreter; probes in `explorations/spec-probes/`)
and `explorations/process-audit.md`.

The process verdict, confirmed harder than charged: **zero spec
consultations during the entire design phase** (556 tool calls: 106
interpreter runs, 29 library reads, 0 spec reads), with structural
causes in our own docs — CLAUDE.md and the briefs present the spec as a
build artifact and contain no pointers into it. Two dead-ends had
sanctioned escapes sitting in the spec (the Meet Rule for the
vector×matrix overload; coercion never considered), one recorded "trap"
was never actually reproduced (the comprehension-body-subscript rule —
now corrected in the impl report), and the journal had mislabeled a
documented spec design (static params don't affect overload
applicability) as an implementation quirk.

The expressiveness verdict: 6 works-today findings we missed, 8
spec-only gaps now on the revival worklist (declaration-site
covariance — the root cause of ascription noise tree-wide; coercion,
906 spec lines, parses but is unwired; multifix operator dispatch,
which would give the n-ary Sum node for free; the spec's
single-declaration BIG operators vs the desugarer's nullary registry;
the 1894-line algebraic-constraints library shipping as
`Fortress.Operators.fsi.INCOMPLETE`; Vector/Matrix sealed to Number;
static-arg inference; dimensions), 6 confirmed-deliberate choices, and
3 places the spec is silent (the type-inference chapter is a 27-line
stub) where the library is the only authority. Section 7 re-adjudicates
"why Σ is closed": part library sealing, part genuine spec bar, part
desugarer artifact — three different reasons where the journal had
recorded one.

**Folded into `microgpt_paper.fss` (golden re-verified PASS, structure
intact):** the 26 redundant `[\V\]` ascriptions dropped (the RR64/List
ones stay — the interpreter types aggregates from runtime class and
`List` is invariant); `V extends MultiplicativeRing[\V\]` defining
`one`/`TIMES` and inheriting juxtaposition, binary minus and zero (the
`complex_ring.fss` precedent honored); the dead `SQRT(ZZ32)` overload
deleted; the optimizer's 13-line nested-loop parameter flattening
collapsed to the file's own nested-generator idiom; the header's false
"could not be built" claim rewritten to the corrected diagnosis.
Return-type annotations kept deliberately — they are the exhibits.
Render sheets regenerated to match. **Held for the next iteration on
Pavol's go:** excluding carrier types (Vec/Mat rank traits, as the
library's own Vector/Matrix do), which restore `p Vv` and subscripts
without field noise and dissolve `BIG BOXPLUS`.
