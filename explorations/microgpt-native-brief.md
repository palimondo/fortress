# microgpt-native: brief for the canonical-form rewrite (2026-08-24)

Handover brief for a fresh session. Everything needed to start is in
this file and the references it names; the session that wrote it carried
the full conversation and distilled it here on Pavol's request.

## Mission (Pavol's assignment)

The existing `explorations/microgpt.fss` is a **verified transliteration
of Python** — correct, but written with a Python accent throughout and
with Fortress's core feature (implicit parallelism) deliberately
disabled. Pavol's critique, in essence: *"Literally nothing in the final
solution looks like Fortress… TeX-printing Python does not make it
mathematical notation. Explore the source and the design space
thoroughly to find the canonical forms of expressing these computations;
put on your mathematician's head and evaluate every line by algorithmic
purity — is this really expressing how we compute the transformer, or is
it an accident of implementation?"*

Rules of the exploration:

- **Multiple alternatives per step; do NOT claim the canonical form
  after a first pass.** The design space must be genuinely explored.
- **Document the evolution** — why and how each version changes — in a
  running design journal (`explorations/microgpt-native.md`, to be
  created; this brief is its seed).
- **Target register: the transformer papers' own notation** (see §5) —
  each formula should correspond to one Fortress definition whose
  Fortify rendering approximates it. Steele's concise-solution style and
  the papers' Σ-notation are the same register; the monoid machinery is
  what makes the glyph executable and parallel.
- The v1 transliteration stays as the **reference implementation and
  golden anchor** (its role all along; it is not the destination).
- Accumulated context is for **taste**, not templates — synthesize
  across all the grounding materials; don't latch onto any single one.

## What exists (v1 baseline, all committed and verified)

- `explorations/microgpt.fss` — full port of Karpathy's microgpt
  (karpathy.github.io/2026/02/12/microgpt/, source recovered from the
  post): scalar autodiff object `V`, tokenizer (a–z + BOS=26 over
  `explorations/names.txt`), 1-layer/2-head transformer with KV cache,
  Adam + linear LR decay, temperature sampling. Startup `goldenCheck()`
  asserts 15 logits + loss + 5 grads against a deterministic-weights
  Python reference to 1e-9 — PASS.
- Training verified (nano config: n_embd 8, 2 heads, block 8, 2,000
  docs, 250 steps): loss 3.29 → ~2.3 band in 45.4 min (10.9 s/step;
  CPython twin 22 ms/step, same band). Name-like samples (beller,
  aleia, alalein, alana).
- `explorations/micrograd.fss` — stage-1 autodiff + XOR MLP.
  **Bit-for-bit identical loss trajectories with the Python twin** (all
  16 digits, 400 epochs) when summation order is sequential — so exact
  equality is available for +/·/relu graphs, tolerance needed only for
  exp/log/pow.
- `explorations/mgbench.fss` — interpreter costs: scalar loop ~45k
  iter/s; V-node build ~10k/s; backward walk ~2.8k/s; Array ≈ List for
  small dots. Karpathy config ≈ 20 s/step (~5–6 h/run); nano config is
  the dev loop.
- `explorations/microgpt-port.md` — the v1 plan/de-risking/results log.
- Presentation artifact "A GPT You Can Read" (v1, corrected to describe
  itself as a literal port): claude.ai/code/artifact/ec92269d-059c-4f49-933f-fd9f9d5b953d
- Fortify pipeline works: `bin/fortick x.tic` → `.tex` → `latex` →
  `dvisvgm` (recipes in `explorations/fortify/*.tic` headers). Trap
  fixed once already: when inlining several SVGs into one HTML page,
  namespace the glyph ids (dvisvgm reuses `g1-*` per file).

## Why v1 is not the destination (the indictment, from Steele's own slides)

- "**As soon as you say 'first, SUM = 0' you are hosed**" — v1 says
  `var acc: V := konst(0.0)` eleven times.
- "Don't create a null solution and successively update it — **map
  inputs independently to singleton solutions, then merge treewise**."
- Every loop is `seq`: that bought exact-equality verification (a
  legitimate de-risking device) but it is the negation of the
  language's thesis. Karpathy's left-fold order is an accident of
  scalar CPython, not pedagogy. Sequential techniques belong *at the
  leaves* as an engineering layer (Steele's slide 90), never as the
  program's semantic shape.
- "Associativity gives implementations the wiggle room to use
  parallelism — *or not* — as resources dictate."

## Grounding materials (read in this order)

1. `research/extracts/SteeleFourSolutions2015-code-extract.md` — the
   four solutions transcribed to ASCII source with idiom notes. The
   masterclass: one problem, a spectrum from imperative sweep (≈ our
   v1) to the Σ-zip one-liner, with both efficient forms *derived* from
   the one-liner by fusion. Key idioms verified against the slides:
   - `SUM[(p,q) <- x] q` — big-operator comprehension = the papers' Σ.
   - User monoid: object extending `MonoidReduction[\T\]` +
     `ReductionWithZeroes` with `empty()`/`join()`, then
     `opr BIG OPLUS(): BigReduction[\T,T\] = ...` registers a custom
     BIG operator. **All these traits exist in our 2012
     FortressLibrary** (FortressLibrary.fsi:79-98 — MinReduction/
     MaxReduction/BIG LEXICO are in-tree worked examples).
   - `(a, b) = (f p, f q)` — the tuple IS the fork (implicit parallel
     recursion); likewise the two operands of `+`.
   - `trait X comprises {A, B, C}` — sealed ADT; structural recursion
     via multimethod dispatch (three `process` definitions), no match.
   - `x.split()` — a List's own divide-and-conquer primitive.
   - `MAX=` — any operator compound-assigns.
   - PREFIX_MAX/SUFFIX_MAX scan operators (we restored their arrow
     rendering in fortify.sty; `opr PREFIX_SUM` exists in
     FortressLibrary.fss:4480).
2. `research/extracts/SteeleGoogleTechTalk2015-extract.md` — the talk's
   argument + timestamps (video: youtube.com/watch?v=ftcIcn8AmSY).
3. Target notation (from Pavol, via a Google AI-mode summary of
   microgpt's math; caveats verified against the blog code we run):
   - h_i⁰ = Wₑ[t] + Wₚ[i]
   - RMSNorm(x) = x / √((1/d) Σⱼ xⱼ² + ε)      (no learnable γ in ours)
   - A_ij = (Σₘ Q_im K_jm) / √d_k
   - Softmax(A_i)_j = e^{A_ij} / Σ_{k≤i} e^{A_ik}   (causal by cache)
   - Output_i = Σⱼ Softmax(A_i)ⱼ · Vⱼ
   - FFN(x) = W₂ relu(W₁ x)      (blog code: plain relu, NO squaring,
     NO biases — the gist variant differs; we follow the blog code)
   - L = −log softmax(logits)_y
   - Adam: mₜ = β₁mₜ₋₁ + (1−β₁)gₜ; vₜ = β₂vₜ₋₁ + (1−β₂)gₜ²;
     m̂ = mₜ/(1−β₁ᵗ); v̂ = vₜ/(1−β₂ᵗ); w −= η m̂/(√v̂ + ε); no weight
     decay; ηₜ linear decay.
   Taste decision already made: canonical level is the **per-token
   index formulas** (what the program computes, KV cache and all), not
   whole-sequence matrix products.

## Purity ledger (accident vs. computation, as adjudicated so far)

- Fold order in Σ: **accident** (associativity is the mathematics).
- softmax max-shift: **legitimate** — softmax(x) = softmax(x−c) is an
  identity; the shifted form is the same mathematical object, state it
  honestly.
- KV cache: **memoization accident** of autoregressive evaluation —
  worth a design pass (does the canonical form mention it, or is it a
  derived optimization like Steele's fused two-pass forms?).
- Per-head slicing arithmetic (`hs = h headDim`, flat offsets):
  **packaging accident** — heads are structure, not offsets.
- `visited` flag + explicit `Topo` object: implementation of "reverse
  topological order" — explore alternatives (e.g., the graph as a
  `comprises` ADT with multimethod backward; grad accumulation as a
  commutative-monoid reduction; Fortress `atomic` for parallel
  accumulation — the STM exists and backs `atomic` blocks).
- Parallel graph *construction* is pure and safe; parallel *backward*
  races on `grad` unless made atomic or restructured. A real design
  question, not a reason for global seq.

## Empirical questions to answer FIRST (cheap probes, in a scratch .fss)

The slides are from 2015; our tree froze 2012-08. Verify in the
interpreter before designing around: (1) `SUM[(p,q) <- x] expr`
comprehension syntax; (2) user `MonoidReduction` + `opr BIG` — does the
registration work interpreted (mimic the in-tree MaxReduction/BIG MAX
first); (3) SUM over a *user type* via the numeric traits vs. only via
a custom BIG op — can `V` join a trait that makes library `SUM` accept
it? (4) tuple-parallelism observable? (nanoTime two sleeps — and note
interpreter task overhead vs. benefit at our sizes); (5) `comprises` +
multimethod dispatch interpreted; (6) `atomic` cost; (7) generator
`zip` in comprehensions; (8) `x.split()` on List.

## Verification & performance contract

- Correctness anchor: v1's `goldenCheck()` numbers (tolerance ~1e-9;
  exact equality is forfeited the moment reduction order is free — by
  design). The analytic micrograd checks port over unchanged.
- Training check: nano-config loss into the ~2.3 band; samples
  name-like. CPython bar: 22 ms/step nano; v1 Fortress: 10.9 s/step.
  A native version should not be dramatically slower than v1; measure
  each version (mgbench pattern), record in the journal.
- Interpreter parallelism note: it does fork real tasks (the 2012
  work-stealing runtime we re-based onto j.u.c.), but at nano sizes
  task overhead may swamp wins — measure, and remember Steele's leaves
  rule: dynamic seq-at-the-leaves is the engineered shape.

## Process & repo conventions

- Working branch `claude/handover-reading-vn8zgr`; commit-and-push as
  you go; **fast-forward main after every push**
  (`git push origin claude/handover-reading-vn8zgr:main` — standing
  order). Read `explorations/protocol.md` at session start. Commit
  footer exactly as in protocol §4. No self-congratulation anywhere —
  and do not praise your own output in the presentation; v1's original
  text made that mistake and was corrected.
- Build: see CLAUDE.md (JDK 25, `ant compileAll`, ~50 s in-container;
  `./bin/fortress explorations/<file>.fss`; component name must equal
  filename). Syntax traps already paid for: no `E`-notation numerals
  (`10.0^(-9)`); `log`/`exp`/`cos` are prefix functions; integer `DIV`
  (`/` on ZZ is exact rationals); `at` is a reserved word; ALL-CAPS
  identifiers are operator names (object `GPT` is illegal); mixed
  juxtaposition with `/` or `^` needs parens; `then`/`end` lowercase;
  `fill(fn (i:ZZ32) => ...)` builds arrays; lambdas may have do-blocks.
- Fortify verification loop: render candidate code via fortick and
  *look at it* — the rendering is part of the deliverable's fitness
  function (the round-trip against the slide transcriptions also
  validates our reading of the idioms).
- End state: updated presentation (same artifact URL) telling the real
  story — the spectrum from transliteration to canonical form, like the
  talk itself; and the design journal as the documented process Pavol
  asked for.

## Reference index

- Code: `explorations/{microgpt,micrograd,mgbench}.fss`,
  `explorations/names.txt`, `explorations/fortify/microgpt-*.tic|svg`
- Docs: `explorations/microgpt-port.md` (v1 log),
  `explorations/protocol.md`, `CLAUDE.md`
- Research: `research/extracts/SteeleFourSolutions2015-code-extract.md`,
  `research/extracts/SteeleGoogleTechTalk2015-extract.md`,
  `research/extracts/SteeleJuliaCon2016-extract.md`
- Library files to study: `Library/FortressLibrary.fsi` (reduction
  traits, 79–98; Generator machinery), `Library/GeneratorLibrary.fss`,
  `Library/Generator2.fss`, `Library/List.fsi` (split/zip),
  `Library/PureList.fss`
- External: Karpathy microgpt post
  (karpathy.github.io/2026/02/12/microgpt/ — assembled runnable copy
  lives only in the old session's scratchpad; re-assemble from the post
  if needed; license unstated, do not commit), makemore names.txt
  (committed), Steele talk video (see extract for timestamps).
- Artifacts: map claude.ai/code/artifact/a4f67240-d8d4-4c04-8577-cfb07a17dca0,
  presentation claude.ai/code/artifact/ec92269d-059c-4f49-933f-fd9f9d5b953d
