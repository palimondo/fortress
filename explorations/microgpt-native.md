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
