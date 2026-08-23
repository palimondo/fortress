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

## Risks

- **Interpreter throughput** is the only real unknown: at 10⁵–10⁶
  scalar graph ops/sec the full 1,000-step run is minutes-to-hours; an
  order slower and it needs patience or a smaller config. Step 0
  below measures before anything is built.
- **Recursion depth**: `build_topo` recurses to graph *depth* (longest
  dependency chain, not node count) — hundreds here; the interpreter
  runs on the Java stack, so if it ever overflows, `-Xss` or an
  explicit work-list version fixes it.
- **List performance**: the library `List` is a functional deque;
  fine at this scale. Arrays are the fallback for the hot buffers.

## Staging

0. **Microbenchmark**: build ~10⁵ `Value` nodes in a chain, run
   backward, time it. Decides the feasible config before any porting.
1. **micrograd.fss** — `Value` + `backward()` + a tiny MLP on a toy
   task. Settles the object-model and notation questions cheaply.
2. **Transformer forward pass** — one block, golden-tested against
   reference activations dumped from the Python.
3. **Full microgpt.fss** — training run on (a subset of) names.txt;
   loss curve down, sampled names out.
4. **Fortify rendering** — the listing typeset as mathematics; the
   executable-paper artifact.
