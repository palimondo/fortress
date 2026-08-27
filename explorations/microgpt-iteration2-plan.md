# microgpt iteration 2: plan for the from-scratch notation exploration

Approved by Pavol 2026-08-26. This file is the complete context for every
worker in the run. Read it fully before doing anything.

## Mission (approved verbatim in essence)

Test Fortress's founding claim on the best possible specimen. The claim:
the gap between how ML literature states a transformer's mathematics and
how programs implement it is a language defect that Fortress was built
to close. The specimen: Karpathy's microgpt, the smallest complete GPT.
The test: construct, in running and verified Fortress, the notation that
lets each building block of the model be stated so that its typeset form
and the literature's own formula sit side by side and the reader can
judge the distance **by eye**. The deliverable teaches two things at
once and inseparably: how a GPT works (a reader starting from zero
leaves understanding it) and how the notation is constructed (what the
language gives, what it must be taught, and what it cannot yet say).
Where the correspondence fails, the failure is shown and classified —
implementation gap (revival worklist) versus design limit. Everything
shown runs; correctness is anchored to the Python reference; the
process is documented.

**Not the mission** (named local minima — do not fall into them):
fidelity to Steele's 2015 slide idioms; preservation of any prior
rung's code structure (this iteration starts FROM SCRATCH); the golden
check as an aesthetic constraint (it is a correctness instrument only);
interpreter speed (measured, reported, never steering notation).

## Standing design rules (from Pavol, binding)

1. **No custom BIG operators** (`BIG OPLUS`, `BIG BOXPLUS`, any new
   glyph) unless the form is (a) genuinely the prevalent way ML
   literature writes that mathematics, or (b) provably the only working
   way in current Fortress, with the spec-vs-implementation gap
   documented. The ML literature writes Σ, Π, 𝔼, max — never custom big
   operators. Glyph imitation of Σ is not Σ. Default: named functions
   (`sum(...)`) over comprehensions; the genuine library `SUM` where
   summands are `Number`s (e.g. over `.data` inside a sum-node
   constructor).
2. **The specification is the first authority** for any language
   question: `Specification/` LaTeX sources (byte-identical to
   1.0-frozen in all chapters audited so far). Order of authority:
   spec → `explorations/expressiveness-review.md` (audited findings
   with probes) → library sources → fresh empirical probe. Never end a
   design path at the first interpreter error: check what the spec
   sanctions (the vector×matrix "impossibility" had a documented
   escape, the Meet Rule / `excludes`), then record divergence.
3. **No single-data-point rules.** Any claimed constraint ("always
   parenthesize X", "Y is impossible") requires either a spec citation
   or two independent probes, recorded.

## Verified facts (do not re-derive; probes in `explorations/spec-probes/`)

- List/comprehension element-type ascriptions `[\T\]` are needed ONLY
  when elements' runtime class differs from the target (numeric
  literals → `FloatLiteral`; nested `ArrayList[\…\]` under invariant
  `List`). For concrete object element types (like an autodiff node)
  they are redundant. Return types on definitions are optional
  (inference chapter in the spec is a stub; the implementation infers).
  The `zip` static argument is mandatory.
- The algebraic tower that exists: `AdditiveGroup[\T\]` and
  `MultiplicativeRing[\T\]` only (`FortressLibrary.fss:328,340`).
  Extending `MultiplicativeRing[\V\]` with `one`/`TIMES` inherits
  juxtaposition, binary minus, `zero` (precedent:
  `explorations/complex_ring.fss`). The spec's full
  `Monoid…Field` chapter ships only as commented-out
  `Library/incomplete/…INCOMPLETE`.
- Two juxtaposition (or any operator) overloads on `(List,List)` shapes
  are illegal — but **mutually excluding carrier traits make both
  directions legal** (library's own Vector/Matrix at
  `FortressLibrary.fss:2634,2641` via `Rank1 excludes Rank2`; probes
  `p7_excludes.fss`, `p14_genwrap.fss` — a six-line carrier object also
  buys `|x|`, `x[i]`, `x[r]`, generator integration, `.map`, clean
  renders).
- `SUM` is closed to user types three ways (library `Number` seal,
  spec's no-static-param-overloading rule, desugarer's one-nullary-
  registration-per-name). Coercion parses but is unwired. Multifix
  dispatch is unimplemented. `Number` already has `SQRT`.
- Real parse traps (verified): chained subscripts need `(m[i])[j]`
  (grammatical by design, `concrete-syntax.tex:921`); `^` after a call
  or dotted field needs parens; `|w||>` and `/|` need a space; `V`
  cannot name a variable while object `V` is in scope. FALSIFIED trap,
  do not propagate: "comprehension bodies ending in a subscript need
  parens" — they don't.
- Interpreter performance law: run everything `FORTRESS_THREADS=1`
  (idle-worker micro-forking makes 2 workers slower than 1).
- `nat`-parameterized user vectors with dimension-checked ops run
  (`p9_natvec.fss`) — available as a design ingredient, not a mandate.

## Correctness anchors

- The golden check: deterministic-weight config in
  `explorations/microgpt.fss` `goldenCheck()` — 15 logits + mean loss
  1.228662661701597 + 5 gradients at 1e-9. Any complete candidate must
  pass it (values are architecture-level truths, independent of
  notation). Nucleus-stage candidates use the lighter analytic checks
  (style of `explorations/mgnative_a.fss` run()) or hand-computed
  attention values.
- Reference implementations for BEHAVIOR only (not style):
  `explorations/microgpt.fss` (v1), `microgpt_native.fss`,
  `microgpt_paper.fss`. Architecture facts: 1 layer, heads structural,
  rmsnorm without gain, no biases, plain relu, causal by history,
  Adam β₁ .85 β₂ .99 lr .01 linear decay, BOS=26 vocab 27.

## Fitness function

For each building block, typeset the Fortress definition with Fortify
(recipe in any `explorations/fortify/*.tic` header: fortick → latex →
dvisvgm; rasterize with chromium `--headless --no-sandbox --screenshot`)
and hold it against the literature's formula for that block:

- h⁰ = Wₑ[t] + Wₚ[i]
- RMSNorm(x) = x / √(x·x/d + ε)
- A(q,kⱼ) = q·kⱼ/√d_k ; weights = softmax over j≤i ; out = Σⱼ pⱼvⱼ
  (vector form: softmax(qKᵀ/√d_k)V)
- FFN(x) = W₂ relu(W₁ x)
- L = −log softmax(logits)_y
- Adam: element-wise update equations (index form IS the literature here)

Judged by eye: would a reader of the paper recognize the line? Every
departure needs a reason from the classification {implementation gap,
design limit, deliberate-with-reason}.

## Deliverables ladder (this workflow: nucleus stage)

Each design candidate delivers a NUCLEUS, not the full model: the
notation layer it proposes plus running, checked implementations of
rmsnorm, softmax, one-head attention (score+weights+blend over a
history), and ffn, over the candidate's own autodiff value type (a
minimal tape engine is fine; reuse of engine A's *concepts* is allowed,
code written fresh). Plus: its Fortify render sheet, a rasterized PNG,
and a design memo (what the language gave / had to be taught / can't
say; every deviation classified; what the full model would look like —
sketch the forward pass in the candidate's notation).

Full-model implementation, presentation build, and integration happen
AFTER Pavol-side judgment of the candidates — not in this workflow.

## Presentation (context for memos; built after judgment)

The rebuilt page interleaves tightly: short concept prose per block,
then immediately the paired lines — the literature's formula and the
Fortress definition's render, adjacent, no repetition of the formula in
prose, no tan "the paper writes" echo boxes, never a big code block
followed by explanation. New content queued: the honest-loss-curve
section (explorations/training-dynamics.md + chart) and the
PRNG/SplitMix lineage note (Fortress's parallelism → Steele's 2014
splittable PRNGs; explorations/prng-findings.md). The three prior rungs
(transliteration → index → carriers) remain the notation-ladder
exhibit.

## Worker discipline

Worktree only; `ant compileAll` once (env per CLAUDE.md: JDK 25
exports, unset JAVA_TOOL_OPTIONS, FORTRESS_HOME=$PWD); no commits, no
pushes, no tracked-file modifications; deliverables copied to the
session scratchpad under your candidate's name; timings indicative
(shared box). Report every dead end with the error verbatim and the
spec section consulted.
