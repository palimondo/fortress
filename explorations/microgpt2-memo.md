# microgpt2 — implementation memo (carriers ⊕ tower merge, full model)

Deliverable: `explorations/microgpt2.fss` (component `microgpt2`), the
complete model — engine, notation layer, model level, tokenizer, training
(Adam, linear LR decay), temperature sampling — in the merged design the
judgment mandated (plan §Judgment, decision brief §4 parts list). Probe
file: `p_merge.fss` (transpose `^T`, carrier `=`, the attend one-liner
with a `d_k` field, generator flattening — all green before the full
build). Render assets: seven per-block `.tic` (embedding, rmsnorm,
softmax, attention, ffn, loss, forward) + `sheet-notation.tic` (the FULL
machinery: carriers with extends clauses, carrier `=`, every operator,
`^T`) + `sheet-engine.tic` (Value + `sum` + `backward`), each with
`-light.svg`/`-dark.svg`; `microgpt2-blocks-contact.png` is the
rasterized block contact sheet (inspected; all blocks hold against their
fitness formulas).

Environment: worktree build (`ant compileAll`, JDK 25, exit 0), all runs
`FORTRESS_THREADS=1`. No tracked files modified; no commits.

## Gates (in order, all green; runs 1–3 below are the build round —
## the post-review re-gate on the fixed file is in the Fixes section)

1. **goldenCheck at 1e-9: PASS.** Ported from `explorations/microgpt.fss`
   — 15 logits over 3 positions, mean loss 1.228662661701597, 5 gradients
   (wte[4][0], wpe[0][1], lm_head[2][3], attn_wq[0][0], mlp_fc2[1][2]),
   all |Δ| < 1e-9. Per-head weight init uses the flat-row-index mapping
   (`goldRows(mi, h·hs, hs, cols)`, the `microgpt_paper.fss` goldHeads
   pattern), so each head's slice carries exactly v1's values.
   `golden transformer forward/backward vs Python reference: PASS`.
2. **30-step nano training: declining from ~3.3.** names.txt (2000 docs,
   vocab 27, BOS 26), 1264 params, nEmbd 8, 2 heads, blockSize 8, Adam
   β₁ .85 β₂ .99 lr .01 linear decay. Kept run (the one matching the
   shipped file byte-for-byte): step 1 loss 3.3558 → step 30 loss
   3.0020, min 2.7797 (step 27); mean of steps 1–10 is 3.28, of steps
   21–30 is 3.04 — declining through the per-doc noise the
   honest-loss-curve section documents (single-document steps). Weights
   are Box–Muller random (unseeded `random()`), so per-run trajectories
   differ; the decline from ~3.3 (≈ ln 27 = 3.296) held in both full
   runs performed (the first run: 3.3560 → 2.8282, min 2.3866).
3. **s/step: 4.02** (this run; 4.05 on the first run — 30 steps, wall,
   JVM start excluded, `FORTRESS_THREADS=1`, shared box, indicative).
   Sampling: 10 strings emitted per run, BOS-terminated, all lowercase
   a–z; after only 30 nano steps they are letter-soup with name-like
   vowel structure (first run produced e.g. "ami", "asmaati").

## The merge as built (all nine judgment decisions applied)

1. Fidelity + machinery-as-content: model level is paper-shaped lines;
   the two sheets exhibit the full machinery bill (nothing curated away:
   extends clauses, carrier `=`, lifts, `sum`'s body).
2. **Bold weights**: `_We _Wp _Wlm _Wq _Wk _Wv _Wo _W1 _W2` typeset
   𝐖te, 𝐖₁, … (spec leading-underscore convention). Italic capital W₁
   stays unreachable (radix-numeral rule + Fortify roman rule) — stated
   under deviations.
3. **`^T` adopted**: `opr (m: Mat)^T : Mat` (2 lines), and attention is
   the literature's own line:
   `attend(q: Vec, K: Mat, V: Mat): Vec = softmax(q K^T / SQRT d_k) V`.
4. **Visible max-shift, tower form**: `Value extends StandardMax` (one
   `opr MAX` line) opens the genuine library `BIG MAX`;
   `m = BIG MAX[u <- a] u` — no `.data` leak; the shift rides Value's
   inherited minus.
5. **`d` bound, `d_k` a field**: `rmsnorm` binds `d = |x|` (one line, so
   the paper's symbol survives and `|·|` is never misread as a norm);
   `d_k` is a Model field, so attend is a one-liner.
6. Spartan's price list + falsified-trap hygiene: no comprehension body
   is parenthesized "for safety" anywhere in this file (the falsified
   trap is not propagated — the review round found ~15 stylistic outer
   body parens contradicting this claim and stripped them; see Fixes);
   the only parens inside comprehension bodies are the genuinely
   required ones: chained subscripts `(m[j])[c]` and
   subscript-then-method `(kh[h]).addRight(...)`. Page content for
   spartan lives outside this memo.
7. **Per-head plumbing = three comprehensions** in `forward` (K, V,
   heads) — the literature's head₁…head_h ellipsis made precise.
8. Render sheets show the machinery: `sheet-notation` carries both
   carrier objects WITH their extends clauses (the inheritance ledger)
   and every operator; `sheet-engine` carries `sum`'s body — the
   autodiff-sees-Σ lesson (Σ appears exactly once in the program, as the
   genuine library SUM over the addends' RR64 data, inside the one
   n-ary Sum node whose local gradients are all 1).
9. Mandated cleanups: **carrier `=` defined** on Vec and Mat (elementwise
   data equality; probe asserts `x = x` now true, value equality and
   inequality both checked — the HasRank reflexive-false landmine is
   defused); engine node named **`Value`**, freeing `V` for the value
   matrix (attend's third parameter IS `V`; forward's local `V` is the
   per-head value history); loose-vs-tight-slash footnote below; every
   claim in this memo comes from the golden-gated file.

## Notation-layer line count (physical code lines, comments excluded), and what each buys

Carriers — 24 lines:
- `Vec` 13 (2 header/extends, `asString` 1, `indices` 1, `|self|` 1,
  `[i]` 1, `[r]` 1, `+` 1, unary `-` 1, `=` 2, `end` 1, constructor
  line is the header). Extends buys: `Rank1` → excludes `Rank2` (both
  juxtaposition directions legal under the Meet Rule) + free `rank()`;
  `ZeroIndexed`/`DelegatedIndexed` → generators (`u <- x`,
  `BIG MAX[u <- a]`, flat-param iteration `p <- row`), `zip`;
  `AdditiveGroup` → inherited binary minus and `zero` (h⁰ and both
  residual adds ride the one defined `+`).
- `Mat` 11 (2 header/extends, `asString`, `indices`, `|self|`, `[i]`,
  `[r]`, `addRight` — the KV-history extension, `=` 2, `end`).

Operators — 12 lines:
- `DOT` 1 → x·x in rmsnorm, and the definition renders as its own index
  formula (the DOT line IS Σ uₘwₘ).
- `Mat Vec` juxtaposition 1 → every linear layer (7 model-level uses).
- `Vec Mat` juxtaposition 2 → the attention blend `p V` and `q K^T`.
- `^T` 2 → the paper-verbatim attention line.
- `-(Vec,Value)` 1 → softmax shift; `/(Vec,Value)` 1 → softmax
  normalize + rmsnorm; `/(Vec,RR64)` 1 → temperature `logits / temp`;
  `relu` 1, `exp` 1 → pointwise lifts; `concat` 1 → head concatenation.

`sum` — 3 lines (List overload 2, Vec overload 1): Σ as the named
function (standing rule 1); one tape node per Σ.

Total notation layer: **39 lines**. Engine below it (any design pays
this): `Value` object 23, `konst`/`exp`/`log`/`relu`/`SQRT` 7,
`Topo`+`backward` 20 = 50 lines. Model level (blocks + Model object) is
then paper-shaped: rmsnorm 4, softmax 5, nll 4, attend 1, ffn 1,
forward 13.

## Deviations, classified (fitness function; classes: implementation gap / design limit / deliberate-with-reason)

- **D1 `(x DOT x) / d` parens** — loose `DOT` and `/` have incomparable
  precedence (spec `basic/operators/precedence.tex`: precedence is
  deliberately a partial order; mult/div have no mixing relation in
  `appendices/operators.tex`). **Design limit** (deliberate language
  design). Carried finding; not re-probed (two probes + spec citation on
  record from iteration-2 candidates).
- **D2 `d = |x|` binding line in rmsnorm** — **deliberate** (judgment
  decision 5): one line so the literature's `d` survives and `|x|` is
  not misread as a norm in the headline formula. At attention level the
  question dissolves: `d_k` is a Model field.
- **D3 `sum(...)` named function for Σ** — the library `SUM` is sealed
  to `Number` three ways (expressiveness-review finding 7).
  **Implementation/library gap** (revival worklist) AND the standing
  rules' preferred default; the genuine `SUM` still folds each Sum
  node's forward value (the addends' data are Numbers).
- **D4 visible max-shift in softmax** — **deliberate-with-reason**
  (judgment decision 4): honest numerics, Karpathy's reference does the
  same, softmax(a) = softmax(a−m) is an identity, and the shift is the
  *genuine* library `BIG MAX` in the big-operator register the
  literature uses for max — the counterpoint to sealed Σ.
- **D5 bold 𝐖 instead of italic W₁** — `W_1` lexes as a numeral with
  radix specifier `_1` (spec `basic/lexical-structure.tex` §Numerals;
  radix 1 is a static error), so italic-capital-subscript is a **design
  limit** of the lexical spec; capital+digit (`W1`) renders roman — a
  **toolchain (Fortify) limit**. Bold `_W1` → 𝐖₁ is the spec's own
  boldface convention and a genuine, prevalent ML register (papers bold
  their matrices). Judgment decision 2.
- **D6 per-head comprehensions at model level** (K, V, heads in
  `forward`) — **deliberate** (judgment decision 7): the literature's
  "head₁ … head_h" ellipsis made precise, not hidden behind a `Heads`
  carrier.
- **D7 chained subscripts `(m[j])[c]`** in the Vec–Mat juxtaposition and
  `^T` definitions — grammatical by design
  (`concrete-syntax.tex:921`). **Design limit (known)**; notation layer
  only, model level never shows it.
- **D8 `h0` renders h₀, literature writes h⁰** — the layer superscript
  is not reachable as an identifier form (letter+digit is the spec's
  *subscript* idiom). **Design limit (lexical convention)**, accepted;
  same choice as every prior rung.
- **D9 `opr ^ (self, n: RR64)` — the space is load-bearing in Fortify**
  (new finding this session): `opr ^(self, …)` typesets as
  `opr` with the whole parameter list superscripted; `opr ^ (self, …)`
  typesets correctly, and the interpreter accepts both spellings
  (verified: p_merge green, full model golden-green with the spaced
  form). **Toolchain (Fortify) wart**, recorded; the .fss and the render
  sheet now use the identical spaced spelling.
- **D10 Adam stays index-form RR64** — **deliberate**: the literature's
  Adam IS elementwise index arithmetic; the contrast with the model
  level is a teaching point (unchanged from v1/paper).
- **Footnote (mandated): loose vs tight slash.** `q K^T / SQRT d_k`
  parses as `(q K^T) / (SQRT d_k)` because juxtaposition binds above the
  *loose* slash (`precedence.tex`); a *tight* slash (`a/b`, no spaces)
  inverts this relation. The model level uses loose slashes throughout.
- **Note: `seq` asymmetry** — `sum` keeps `seq(addends)` (FP addition is
  not associative; the sequential fold is the reproducibility contract);
  `BIG MAX` takes the Vec directly (max is exactly associative, parallel
  reduction cannot perturb it). A feature of the exhibit, per tower.

## Render fitness (judged on microgpt2-blocks-contact.png)

| block | literature | rendered as |
|---|---|---|
| embedding | h⁰ = Wₑ[t] + Wₚ[i] | h₀ = 𝐖te_t + 𝐖pe_i |
| rmsnorm | x/√(x·x/d + ε) | d = \|x\|;  x/√((x·x)/d + ε) |
| softmax | e^{aⱼ}/Σₖe^{aₖ} | m = MAX[u←a] u; e = exp(a−m); e/sum(e) |
| attention | softmax(qKᵀ/√d_k)V | softmax(q Kᵀ/√d_k) V — verbatim |
| ffn | W₂ relu(W₁x) | 𝐖₂ relu(𝐖₁ x) — verbatim (bold) |
| loss | −log softmax(logits)_y | p = softmax(logits); − log(p_y) — verbatim |
| forward | residual stream | x₄ = 𝐖o concat(heads) + x₁; x₆ = ffn(x₅) + x₄ |

All seven hold against the fitness function by eye; the attention and
ffn lines are the paper's own.

## Fixes (review round, 2026-08-27)

Three verified review findings, all applied; full gate re-run green on
the fixed file (fresh worktree build, `ant compileAll` exit 0, JDK 25,
`FORTRESS_THREADS=1`):

- **F1 — redundant comprehension-body parens stripped.** The review
  falsified memo claim 6 as shipped: ~15 comprehension bodies carried
  stylistic outer parens, including the exact shape of the falsified
  trap (`<| ((m[j])[c]) | … |>` in `^T`), and the double parens leaked
  into the forward and notation renders. All redundant outer body
  parens removed (Vec `+`/unary `-`, both juxtapositions, `^T`, the
  five pointwise lifts, K/V/heads in `forward`, `emptyHist`,
  `goldRow(s)`/`goldHeads`, `gaussRow`/`gaussMat`/`gaussHeads`). The
  parens that remain inside bodies are the genuinely required ones:
  chained subscripts `(m[j])[c]` (D7) and subscript-then-method
  `(kh[h]).addRight(…)`. Claim 6 amended above to record the episode.
- **F2 — loss line made paper-verbatim.** `-(log (p[y]))` →
  `- log(p[y])` in `nll` (and the header sketch); the block now renders
  `− log(p_y)`, matching the literature exactly, so the previously
  unclassified departure disappears instead of needing a D-entry.
- **F3 — `sum`'s Vec overload put on a render sheet.**
  `sum(x: Vec): Value = sum(x.xs)` (the line softmax's `sum(e)`
  resolves through, counted in the 39-line bill) added to
  `sheet-engine.tic` directly under the List body; a sheet auditor can
  now see every line the bill counts.

Re-gate on the fixed file: goldenCheck PASS at 1e-9; 30-step training
(unseeded weights, so a new trajectory): step 1 loss 3.2860 → step 30
loss 2.8601, min 2.6228 (step 19), first-10 mean 3.234 vs last-10 mean
3.074 — declining from ~3.3 as before; s/step 4.06; 10 samples emitted
(letter-soup with vowel structure, e.g. "ilcoec", "amoy"). Regenerated
renders: `block-loss`, `block-forward`, `sheet-notation`,
`sheet-engine` (each `-light.svg`/`-dark.svg`, fortick → latex →
dvisvgm, dark via the sed fill), and the block contact sheet
(rasterized via `rsvg-convert` + PIL this round — chromium was absent
on the fix box; same 7 blocks, inspected by eye: loss shows
`− log(p_y)`, forward shows single parens only). The other five block
renders are byte-identical inputs and were not touched.

## Regeneration

- Run: `FORTRESS_THREADS=1 ./bin/fortress explorations/microgpt2.fss`
  (worktree build; JDK 25 env per CLAUDE.md).
- Renders: recipe in each `.tic` header (fortick → latex → dvisvgm;
  dark = `sed "s/<svg /<svg fill='#e6edf3' /"`); latex byproducts
  deleted after rendering.
