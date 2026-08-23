# microgpt.fss — feasibility map (2026-08-23)

Status: **idea on the goals list; mapping only, no code yet.** Decided
with Pavol in the post-C2 goals discussion.

Target: Karpathy's **microgpt** (published 2026-02-12,
karpathy.github.io/2026/02/12/microgpt/) — a complete GPT in 243 lines
of dependency-free Python: scalar reverse-mode autodiff (`Value`),
char-level tokenizer, a 1-layer/4-head transformer (rmsnorm, attention
with KV cache, relu MLP), Adam with bias correction and linear LR decay,
temperature sampling. Trains on makemore's `names.txt` and hallucinates
new names. Source recovered from the blog post (scratchpad copy);
`docs`/`Tokenizer`/`Value`/`gpt`/`Adam`/inference sections all in hand.

Why this target: it is the *scalar-autodiff* formulation — no tensors,
no numpy — so it exercises exactly what Fortress is good at (objects,
operator overloading, mathematical notation) and nothing we lack. The
Fortress version becomes the mathematical-notation twin: the same
program, but the forward/backward math typesets via Fortify.

Model size at Karpathy's defaults: vocab ≈ 28, n_embd 16, block 16,
1 layer ⇒ ≈ 4,200 parameters; ~10⁵ graph nodes per training step,
1,000 steps ⇒ order 10⁸ scalar graph operations for the full run.

## What it needs → what the 2012 library has

Language features — **all present**:

| microgpt needs | Fortress |
|---|---|
| class with mutable fields (`Value.data/.grad`) | `object` with `var` fields |
| operator overloading on own type (`+ * / ** neg`) | `opr` methods — core strength |
| closures, local recursive fn (`build_topo`) | `fn` lambdas, local functions |
| list comprehensions, `zip`, slicing `q[a:b]` | comprehensions `<\|...\|>`, `List.zip`, range indexing `a[lo#len]` |
| sequential loops (training is stateful) | `for i <- seq(...)` — parallel-by-default needs explicit `seq` |

Library — **present and interpreter-tested**:

| microgpt needs | Library has |
|---|---|
| growable list (`append`, `reversed`) | `List` (addRight, reverse, zip, indexOf); arrays for the buffers |
| dict `state_dict` | `Map` exists — but named fields in a model object are better Fortress anyway |
| `random.shuffle` | `Shuffle.shuffle` (list + array variants, fairness-documented) |
| uniform random | `random(a):RR64`, `randomZZ32` natives (buffons uses them) |
| `math.log/exp`, `** 0.5` | `RR64.log/exp`, `^` on RR64 (realArith-tested) |
| read `input.txt` lines | `FileReadStream.lines()` (FileSupport; FileReadWrite tests) |
| chars of a string, `uchars.index(ch)` | String is a generator of `Char`; `indexOf` |
| `print(f"...")` | `println`; `Format` library for the fancy bits |

## Gaps — all small, all writable in .fss

1. **No gaussian sampler** (`random.gauss`) → Box–Muller from
   `random()`, ~4 lines.
2. **No weighted sampling** (`random.choices`) → CDF scan over the
   probs, ~5 lines.
3. **Identity-based visited set** in `backward()`'s topo sort — Python
   uses object-identity hashing. Fortress has `opr SEQV(a:Any,b:Any)`
   (object equivalence) but no identity-hashed Set. Cleaner adaptation:
   a `var visited:Boolean` flag on the node (or an epoch counter),
   reset per backward pass. Design note, not a blocker.
4. **`names.txt` download** — the Python fetches it at first run; we
   commit-or-fetch it separately (32k one-word lines, public domain
   names corpus from makemore).
5. **Verify, not assumed:** a list/array `sort` for the unique-chars
   vocabulary (worst case: 30-element insertion sort inline), and
   `Format` for `%.4f`-style loss printing.

## Types — the direct answer

The port needs `RR64` scalars, `ZZ32` indices, `String`/`Char`,
`Boolean`, and one user object type. All exist; the numeric tower and
ZZ32→RR64 coercions are exercised by the whole test suite. No tensors
are involved anywhere — that's the point of the scalar formulation —
so the known library gaps (no ℂ, no linear algebra, incomplete/
directory) do not touch this project. The typed-tensor/shape-checking
showcase is a *separate, later* étude on top of Fortress's
dimension-typed arrays; microgpt needs none of it.

## Risks and de-risking (v2 — after adversarial pass, 2026-08-23)

Correctness:

- **Floating-point association is the top correctness trap.** Python's
  `sum()` is a sequential left fold; Fortress Σ/BIG operators reduce as
  trees and its loops are parallel by default — different summation
  order means different rounding, spuriously failing goldens and
  nondeterministic runs. Rule: **the reference port is sequential
  everywhere** (seq loops, left folds); an idiomatic-parallel variant
  is a separate later artifact. Port audit item: every loop,
  comprehension, and reduction justified as pure-or-seq.
- **Transcendental ulp drift**: Java's Math.pow/exp/log and CPython's
  libm can differ in the last ulp, and error compounds over ~10⁴-node
  graphs. Golden tolerances: relative ~1e-9 forward, ~1e-6 gradients;
  and goldens run on *short* inputs (1-position and 3-position
  sequences) where accumulation is small — full docs are covered by
  the statistical band, not goldens.
- **Golden weights carry no RNG**: both harnesses fill weights from the
  same deterministic formula, e.g. w[i][j] = ((31 i + 17 j) mod 97
  − 48)/100. Documented once, implemented twice.
- **Boundary/literal details to pin in stage 1**: relu gradient at
  exactly 0 is 0 (match Python's `float(data > 0)`); verify RR64
  scientific-notation literals (`1.0e-8`) early — fall back to written-
  out decimals if the parser objects.

Performance:

- **Interpreter throughput** is the dominant unknown. Revised workload:
  average name ≈ 7 tokens ⇒ ~40–50k graph nodes per step, ~4×10⁷
  node-ops for the full run, plus interpreter constant factors. The
  step-0 benchmark separates the costs instead of one blended number:
  (a) raw scalar-arithmetic ceiling, (b) object allocation + `opr`
  dispatch (build a Value chain), (c) forward+backward over a
  micro-graph, (d) Array vs. List dot product — the library List is a
  finger tree with O(log n) indexing, so hot buffers likely want
  arrays.
- **Memory**: interpreter values are heavyweight; 40–50k live nodes per
  step could mean hundreds of MB. The benchmark records RSS; heap flags
  via the bin/fortress JAVA_FLAGS defaults if needed.
- **Node-fusion lever** (if the raw port is too slow): a `dot(xs, ws)`
  operation as a *single* Value node with per-child local gradients —
  microgpt's Value already carries n-ary children/local-grads, Karpathy
  just never added the op. Cuts node count ~16×, mathematically
  identical. Held in reserve, not the first move.
- **Fallback config**: a nano setting (n_embd 8, block 8, ~200 steps,
  doc subset) sized from the measured ops/sec so a full training run
  lands under ~30 minutes even in the slow case.
- **Recursion depth**: `build_topo` recurses to graph depth (longest
  chain, hundreds) — fine; `-Xss` or a work-list version if the Java
  stack ever objects.

CPython reference bar (measured above): 120 s. The port target is
"within an order of magnitude"; the levers above are the path there.

## Baseline (measured 2026-08-23, this container)

Assembled the original from the blog post's code blocks (175 lines with
imports; parses and runs; kept in the session scratchpad, not committed
— the blog code's license is unstated) and ran it: CPython 3.11.15,
4-core Xeon @ 2.10 GHz, `random.seed(42)` added for reproducibility
(the original is unseeded).

- num docs 32,033 · vocab 27 · **4,192 params** (matches the estimate)
- **1000 steps + 20 samples: 120.3 s ≈ 0.12 s/step**
- per-doc loss: 3.3660 (step 1) → 2.31 (200) → 2.34 (400) → 2.49 (600)
  → 2.26 (800) → 2.65 (1000) — noisy per-document values orbiting ~2.3
- samples are convincingly name-like: kamon, karai, jaire, keylen,
  alerin, anton, …

So the CPython bar is ~2 minutes. The port needn't beat it — matching
within an order of magnitude on the interpreter would be a strong
result; the step-0 microbenchmark tells us where we start.

**Correctness anchors for the port** (the original ships no tests):

1. **Golden activations** — fixed deterministic weights (no RNG), one
   fixed token sequence; dump logits and parameter gradients from the
   Python to ~12 digits, assert the Fortress forward/backward matches.
   RNG-independent, exact.
2. **Loss-trajectory band** — under the port's own RNG, per-doc loss
   should fall from ~3.37 into the ~2.3 band by a few hundred steps;
   statistical, not exact (Python's Mersenne Twister is not ours).

**Walk vs. compile:** interpreter-only, realistically. The compiled
path links against CompilerLibrary — a 592-line skeleton (assertions,
exceptions, ZZ32Vector) vs. the interpreter's 4,518-line
FortressLibrary; no List/Map/Shuffle/file streams/Random there.
Compiling microgpt is gated on goal 4 (finish the bytecode compiler)
plus pushing the needed library surface through it — a fine stretch
target and forcing function, not the plan.

## Step-0 results (measured 2026-08-23, `explorations/mgbench.fss`)

Interpreter, JDK 25, this container; warm pass ≈ cold pass (the JIT
optimizes the interpreter, not the program — overhead dominates):

- (a) raw scalar loop: 10⁶ mul+add in ~20–25 s ⇒ **~45k iterations/s**
- (b) Value-node build (alloc + `opr` dispatch + list literals):
  40k nodes in ~3.9 s ⇒ **~10k nodes/s**
- (c) backward walk (zip + grad accumulation): 40k nodes in ~14.3 s ⇒
  **~2.8k nodes/s** — the zip-generator overhead is the suspect; an
  indexed loop is the first optimization to try in the port
- (d) 256-element dot: Array ≈ List (~11 s / 256k index-ops ⇒ ~23k
  ops/s) — interpreter overhead swamps the finger tree's O(log n), so
  buffer choice is free at this scale

**Projection, Karpathy config** (~45k nodes/step): ≈ 4.4 s forward +
16 s backward ⇒ **~20 s/step, ~5–6 h for 1000 steps** — roughly 170×
CPython. Feasible as an overnight patience piece, not for iteration.
Consequences, per the de-risking levers:

- **Nano config for development**: n_embd 8, block 8, ~300 steps ⇒
  ~5 s/step, ~25 min/run. This is the working configuration.
- **The dot-fusion lever moves from reserve to likely**: one Value node
  per dot product cuts graph nodes ~16× and shifts the inner loops to
  plain arithmetic — projected well under an hour for the full config.
  Still second move, after the faithful port is golden-verified.
- A quirk for the notebook: ZZ64 division in Fortress is *exact* (the
  first benchmark run printed its milliseconds as rationals); `DIV`
  for integer division, per the library's own tests.

## Staging

0. ~~**Microbenchmark**~~ DONE — results above.
1. ~~**micrograd.fss**~~ DONE (2026-08-23, `explorations/micrograd.fss`):
   the `Value` autodiff object (`opr +`/`DOT`/unary minus, pow, ln,
   exp, relu), visited-flag topo sort, analytic golden gradient checks
   (relu, ln∘pow, exp composites — all PASS), and a 2→4→1 relu MLP
   trained on XOR to 5.5e-11 MSE. **Headline result: the Fortress and
   Python trajectories are bit-for-bit identical** — a deterministic
   Python twin of the same graph prints the same loss to all 16 digits
   at epochs 100–400, both in a first run that collapsed (a shared
   dead-relu failure, fixed identically in both by initializing the
   hidden biases from the weight formula) and in the working config.
   Consequence for the golden strategy: for +/·/relu graphs the port
   can demand *exact* equality, not tolerances; ulp drift remains a
   concern only for exp/log/pow. Syntax learnings recorded in the file:
   no `E`-notation numerals (use `10.0^(-12)`), `log`/`exp` are
   functional (`log x`), ZZ division is exact (use `DIV`).
2. **Transformer forward pass** — one block, golden-tested against
   reference activations dumped from the Python.
3. **Full microgpt.fss** — training run on (a subset of) names.txt;
   loss curve down, sampled names out.
4. **Fortify rendering** — the listing typeset as mathematics; the
   executable-paper artifact.
