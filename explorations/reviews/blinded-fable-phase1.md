# Phase 1 — independent review of the blinded Fable run (`explorations/blinded-fable/`), alone

Written before opening Astra's tree. Method mirrors the previous review of Astra (`astra-review/phase1.md`): run it, regenerate the goldens from the pinned upstream, verify the figures are verbatim renders, spot-check citations, reproduce claimed gaps with reviewer probes, count lines under one stripping rule. Reviewer probes live in `/home/user/fortress/explorations/fable-review-probes/` (uncommitted); logs in `fable-review/runs/`.

## 1. Does it run?

- **Composition.** There is no single runnable file: `src/MicroGPT.fss` carries the library plus a `(* TESTS *)` smoke test; `tools/build.py` splices its body (minus the test region) with `src/check_main.part` or `src/train_main.part` into a component that imports the generated data component `MicroGPTData`. I recomposed with the identical recipe into `explorations/fable-review-probes/{Check,Train,CheckV1,CheckV2}.fss` (`tools/build.py` writes into a gitignored `build/`, which I did not want to create in the repo).
- **Check (primary, v3).** `runs/Check.log`: exit 0, **53 PASS / 0 FAIL, "ALL CHECKS PASSED"**, 143 s wall (two 45 s training steps + three re-forwarded samples), JVM flags `-Xmx6g -Xss64m` as their `run.sh` sets (the shipped 256 MB default overflows; their probe06 and gap #15). The output is line-identical to the shipped `checks/check_run_v3_output.txt` except the `Operation took` timings. Node count 1,393,152 identical.
- **Train demo.** `runs/Train.log`: the 12-step demo from the reference's initial weights; steps 1–2 reproduce the reference losses 3.365966947584851 / 3.424272783871772 (the numbers the microgpt article prints as 3.3660 / 3.4243). ≈ 7 min single-threaded, bounded and documented as such. Samples use Fortress's own `random(1.0)`, so they differ run to run — the doc says so.
- **v1 / v2 alternatives.** `runs/CheckV1.log`, `runs/CheckV2.log` (see §7).
- **Smoke test** (`src/MicroGPT.fss` run directly): random-uniform weights; loss ≈ ln 27, one Adam step lowers it — a sanity run, not a check.
- Nothing under the historical tree was modified; the only environment change is the heap flag.

## 2. Goldens

- **Derivation.** `tools/derive_checks.py` `exec`s the pinned gist text up to the `# Let there be Adam` marker (seed 42, dataset shuffle, tokenizer, `Value`, `state_dict`, `gpt`, `softmax` all upstream code), then runs an *instrumented copy* of the training loop for 2 steps and of the inference loop for 3 samples, monkey-patching `random._inst.random` to record the uniform draws that `random.choices` consumes. Output: `checks/checks_2steps.json` (484 KB) → `tools/gen_data.py` → `src/MicroGPTData.fss` (1,208 lines of decimal literals; Fortress has no exponent numerals, so `repr` floats are expanded via `Decimal`, which round-trips exactly — verified for `ref_loss`).
- **Pinned source.** sha256 `d47d88c2…ccee`, 199 lines, gist revision `14fb0388…`; the dataset is makemore `names.txt@988aa59` (sha256 `0a30b555…`). Same pinned file as the previous review's `microgpt.upstream.py` (sha matches), so both runs are anchored to the same upstream text.
- **Independent regeneration** (`fable-review/upstream_harness_fable.py`, `runs/upstream_harness.log`): I executed the *actual* upstream loop text (not their instrumented copy) with the real seeded dataset, patched only to stop after 2 steps / 3 samples and to record loss, per-position logits/probs/losses, all gradients, Adam-updated parameters, draws and tokens. Result against `checks_2steps.json`: **18,216 scalars compared, every one bit-identical (max |diff| = 0.0)**; draws identical; tokens and texts identical (`org`, `stclyzqwpactmmcx`, `ku`); the 4,192 initial weights, the 64-document `docs_head`, and `uchars` identical. Their instrumented copy is therefore arithmetically faithful to upstream.
- **What the Fortress check compares** (`src/check_main.part`): per step, all 27 logits at every position, per-position losses, the loss, all 4,192 gradients (9 matrices), all 4,192 Adam-updated parameters; per sample, per-step probabilities, chosen tokens, text. Total 53 named checks, ≈ 18 k scalar comparisons. **Tolerance 10⁻¹² absolute** with a written justification (`notes/02-v1-verified.md`); observed maxima 3.3·10⁻¹⁶ (logits), 4.4·10⁻¹⁶ (loss), 2.3·10⁻¹⁶ (grads) — i.e. not bit-identical, and correctly attributed to Σ's tree order vs Python's left-fold `sum`. Tolerance is 4 orders above the observed and 4 below the smallest quantity of interest — defensible, and they say so. Sampling is anchored by replaying Python's recorded uniforms through `pick`, so identical tokens prove the cumulative-sum boundary logic, not just the probabilities.
- Not verified by them: nothing beyond 2 steps against the reference (the 12-step demo only matches steps 1–2 by construction); no finite-difference check of the Fortress autograd beyond one 3-variable probe (`probes/probe11_backward.fss`, 3·10⁻¹⁰).

## 3. Notation — are the figures the program?

- **Provenance mechanism.** `tools/figs.py` extracts `(* FIG name *) … (* END FIG *)` regions from the source and writes `figures/PREFIX_name.tic`; `render.sh` runs fortick → latex → dvisvgm → chromium. I re-ran the extraction on `src/MicroGPT.fss`, `src/train_main.part`, `src/alt/v2_…`, `src/alt/v1_…`, `probes/intro_example.fss`: **all 21 shipped `.tic` sheets that correspond to marked regions are byte-identical to the regenerated ones** (`fable-review/tic-regen/`). The three `alt_*.tic` sheets are line-for-line excerpts of their probes (every non-blank line occurs verbatim in the probe). `fig00_probe`, `fig01_variants`, `fig02_v1_all` are exploration sheets; `fig01_variants` is the only one embedded, and the article labels it "an exploration, not a running program".
- Every figure has an "ASCII source as typed" disclosure under it (`article/build_article.py` embeds the `.tic` body). No hand typesetting found.
- **Best pairs by eye** (paper formula vs `figures/gpt_*.png`):
  - `rmsnorm`: `ms = (∑_{x_i←x} x_i²)/|x|; scale = (ms + 0.00001)^(−0.5); scale x` — three lines, reads as the formula; `0.00001` instead of ε = 10⁻⁵ is a language limit (no exponent numerals, gap #10).
  - `softmax`: `m = MAX_{z_i←z} z_i.data; e = Vec(⟨exp(z_i − m) | z_i ← z⟩); total = ∑_{e_i←e} e_i; Vec(⟨e_i/total | e_i ← e⟩)` — the `Vec(…)` wrappers and `.data` are the only noise.
  - Attention core (`gpt_layer`): `α = softmax((Kh_{0:t} Qh_t)/√d_h); α Vh_{0:t}` beside the formula `α_t = softmax(K_{0:t} q_t/√d_h), y_t = α_t V_{0:t}`. Genuinely the same expression.
  - `mlp(x) = W_out relu(W_in x)`; `X' = X + attention(rmsnorm(X)); X' + ⟨mlp(x) | x ← rmsnorm(X')⟩` — the block equations.
  - `Value`'s operator table: `node(data + b.data, (self, 1), (b, 1))` beside ∂(a+b)/∂a = 1 etc.; `1/data` typesets as a fraction.
  - Adam: `m_i := β₁ m_i + (1 − β₁) p.grad; … m̂ = m_i/(1 − β₁ᵗ); p.data −= lr_t m̂/(v̂^0.5 + eps)` — Fortify supplies β, m̂, v̂.
- **Weakest pairs:**
  - `gpt_layer` head plumbing: `(Q, K, V) = (Mat(⟨W_q x | x ← X⟩), Mat(⟨W_k x | x ← X⟩), Mat(⟨W_v x | x ← X⟩))` where the paper writes Q = XW_qᵀ; `d_h = |Q₀| ÷ n_head`; `c = (h d_h) # d_h; (Qh, Kh, Vh) = (Q.cols(c), …)`; and `⟨W_o (BIG ‖[h ← 0#n_head] (heads_h)[t]) | t ← X.indices⟩` — the head-concatenation line is the least formula-like line in the program, and the `(heads_h)[t]` parenthesis is forced by an interpreter bug (gap #3, reproduced below).
  - `gpt_model`: `matrices()`/`params()` use `CONCAT⟦Mat⟧[…]`, `CONCAT⟦Value⟧[…]` with static-argument noise — optimizer plumbing, shown and labelled as such.
  - `gpt_loss`: `losses = ⟨−log((softmax(logits_t))[tokens_{t+1}]) | t ← 0#n⟩` then `(1/n)(∑_{l←losses} l)` — correct but the double parenthesisation `(softmax(logits_t))[…]` is again the gap-#3 workaround.
  - `gpt_adam`: `lr_t` typesets as `lr_t` with a literal underscore (Fortify only subscripts single-letter bases) — a small wart they did not mention.
  - `gpt_pick`: two imperative loops with `label found … exit found with i` — a faithful `random.choices` boundary rule, but no formula to compare with beyond the cumulative-probability statement (`math_sample`).
- **Look-alike glyphs / prettier-than-source:** none found. `x_i`, `alpha`, `SQRT`, `DOT`, `BIG ||`, `W_q` are identifiers/operators the spec's rendering appendix maps to x_i, α, √, ·, ‖, W_q. The one Fortify contribution the article flags itself ("the one place where Fortify adds notation on its own") is Adam's β/hat rendering. The `math_*` formulas are their own LaTeX (`article/math_table.py`); the attention formula is written per-row/causal (`K_{0:t} q_t`) to match the code rather than the paper's `softmax(QKᵀ/√d)V` with a mask — legitimate mathematics, but note the formula was shaped toward the code.
- **Hidden machinery:** none. `Vec` (six delegations + six operators), `Mat`, `SumValues`+`∑`, `CatVecs`+`BIG ‖`, `topo`, `nextId` and the `import … except { opr BIG + }` line are all shown in figures or inline code and counted in §6. The check driver and generated data are not in figures (correctly — they are not the program).

## 4. Citations and gap reproduction

Spec/library citations in `notes/gaps.md` and article §8, checked against the tree:

| claim | source checked | verdict |
|---|---|---|
| overloads must not differ in static params (gap #1, #2) | `Specification/basic/overloading.tex:102-104` "it is an error for their static parameters to differ … or for one declaration to have static parameters and another to not" | confirmed |
| `import API.{...} except { names }` is the sanctioned hiding form | `Specification/basic/components/source-code.tex:71, 234-245` | confirmed |
| `Number comprises { RR64 }` (sealed) | `Library/FortressLibrary.fss:349-352` | confirmed |
| library `opr SUM[\T extends Number\]()` nullary + prefix | `Library/FortressLibrary.fss:3041-3045` | confirmed (returns `Comprehension[\T,Number,Number,Number\]`) |
| object varargs "eliminated" (gap #8) | `Specification/basic/objects.tex:66` `\note{The transient modifier and varargs parameters are eliminated.}` | confirmed |
| array comprehensions "not yet supported" (gap #6) | `Specification/basic/expressions/comprehensions.tex:15` | confirmed |
| `DelegatedIndexed`, `MonoidReduction`, `CommutativeMonoidReduction`, `BigReduction` | `FortressLibrary.fss:1766, 2952, 2957, 2973` | confirmed |
| `at`, `value` are keywords (gap #11) | `ProjectFortress/src/com/sun/fortress/parser/Keyword.rats:30,47` | confirmed |
| `except { opr ∑ }` parses (notes/04) | `RvwExceptSigma` | confirmed |

Reviewer reproductions (`runs/Rvw*.log`, all bounded ≤ 5 s):

| gap | probe | result |
|---|---|---|
| #3 subscript then `^` | `RvwSubPow`: `(a[1])^2` = 9.0, `a[1]^2` → "Failed to find any matching overload, args = ()" | **reproduced** |
| #3 chained subscript | `RvwChainedSub`: `(m[1])[0]` ok, `m[1][0]` → same error | **reproduced** |
| #4 `T[n]` with nat parameter | `RvwNatArray`: `g(a: RR64[3])` ok; `f[\nat n\](a: RR64[n])` → "Cannot unify __DefaultVector[\RR64,3\] with ArrayType" | **reproduced** |
| #5 `T^n` denotes Number-only Matrix | `RvwTypePow`: `f(a: V^3)` → "param 1 (a:Matrix[\V\]^(3)) got arg PrimitiveArray[\V,3\]" | **reproduced** |
| #6 array comprehension | `RvwArrayCompr`: `[ i ↦ i i | i ← 0#3 ]` → "Variable i is not defined" | **reproduced** |
| #8 object varargs | `RvwVarargsObj` → "Varargs parameters of objects are not allowed" | **reproduced** |
| #12 `f()[0]` | `RvwCallSub` → "the argument should not be immediately followed by a non-expression element" | **reproduced** |
| #14 line-final `\|\|` | `RvwBarEnd` → "Unmatched delimiter component" | **reproduced** |
| #11 all-caps `BOS` | `RvwNameKeywords` → "Operator prefix BOS is not defined" | **reproduced** |
| #1 user nullary `SUM()` next to the library's | `RvwSumOverload` (only the user Σ used): **accepted, runs**; `RvwSumOverload2` (adds a numeric `∑[i←1:3] i` in the same component): "Overloading of BIG +[\T extends Number\]() … and BIG +() … fails because their parameter lists have the same types" | **refined**: the interpreter's overload check is *lazy* — the conflict is reported only when a call site resolves the name with both candidates live (their probe02 hit it at `SUM xs`). The spec rule is unconditional, so their choice of `except` is right; the gap table's "interpreter also rejects at prefix use" understates that a component that never sums numbers runs by accident. |
| #2 `opr SUM[\T extends V\]()` next to the library's | `RvwSumStatic`: accepted; the user Σ works; the library Σ on numbers in the same component then fails ("join param 1 (a:V) got arg 2: ZZ32") | **reproduced** (different failure site than theirs, same conclusion: not a usable overload set) |
| sanctioned route | `RvwSumExcept`: `except { opr BIG + }` + nofix + prefix user Σ: nofix 3, prefix 6 | **confirmed** |
| #9 nat-generic across an API | not reproduced by me; evidence is `transcript.txt` 17:29 (unification of `Array2[\Value,0,16,0,16\]` vs `Array2[\Value,0,m,0,n\]`) — that trace is present and plausible; it matters only for v1 | taken from transcript |
| #13 Fortify `x_h[t]` double subscript | `transcript.txt` has 5 `render exit: 1` entries with `.latex.err` mentions | consistent |

All citations checked are accurate; classifications (I/L/D) are sound. One misclassification risk: gap #7 calls generic invariance a language-design limit — Fortress's spec does describe invariant generics, so that is right; the *literal typing* half (`<|1.0|>` is `List[\FloatLiteral\]`) is correctly split off as interpreter behaviour.

## 5. Faults and departures from the brief

- **Verification plumbing in the core: none.** The core file has no fixture constants, no check code; the smoke test is fenced in `(* TESTS *)` and stripped by `build.py`. The one global in the core, `nodeCount`/`nextId()`, is needed for `topo`'s ordered `Set[\ZZ32\]` (Python keys `visited` by identity) and is legitimately part of the engine; the tests also print it.
- **Data path.** The Fortress program never reads `input.txt`: dataset loading, shuffle and Gaussian initialisation happen in Python and arrive as `MicroGPTData` (1,207 generated lines). `Library/` has no Gaussian generator (grep `gauss|normal(` empty), so a from-scratch Fortress training run would need a user Box–Muller; they substitute a uniform initializer in the smoke test only and say so (§5.5). The article's opening "A complete GPT — tokenizer, autograd, model, loss, Adam, sampling" is accurate as listed but the reader should know the tokenizer is 4 lines in the demo driver and the corpus is Python-exported.
- **Dead code / asymmetry.** `Adam`'s constructor parameter `lr` is never used (`step(lr_t)` takes the decayed rate; `MicroGPT.fss:202`). `opr +(c: RR64, v: Value)` and `opr -(c: RR64, v: Value)` (Python's `__radd__`/`__rsub__`) are defined but unused by the model, while `__rtruediv__` has no counterpart — harmless, but the article's "helpers become overloads that accept a plain RR64 on either side" over-promises by one operator. `Vec.indexValuePairs` is used only by the check driver.
- **Graph-identity claim slightly over-stated.** §2 says "the two programs build the same graph". True for the `Value` operators; not for `rmsnorm`, where Fortress writes `x_i^2` (one `^` node, local grad `2·x`) while Python writes `xi * xi` (one `*` node, grads `(x, x)`). Numerically equal at the 10⁻¹⁶ level (the checks prove it) and the Fortress form is the mathematics — but it is a departure the text should name rather than paper over.
- **Interpreter acceptance vs conformance.** Handled well: the lenient `SUM[\T extends V\]()` route was found, used in v1 briefly, then replaced by the spec's `except` form; the dynamically-working "one Σ for scalars and vectors" (`probes/alt_unified_sum.fss`) was declined on typing grounds. No static type checker was run and they say so.
- **Parallelism.** They kept Σ's generator order (tree) rather than forcing `seq`, and attribute the 10⁻¹⁶ residuals to it — the right call under the brief. The claim that v3's per-position comprehension "may run in parallel" is by language semantics only; they mark it unmeasured. `seq(...)` appears only where order is a true dependency (layer loop, backward, topo, cumulative sampling).
- **Line-count claim in the article is apples-to-oranges.** §8: "Total 202 lines against the reference's 199 lines of Python" compares Fortress non-blank/non-comment lines (their `tools/linecount.py`, which also miscounts the multi-line `(*** … ***)` banners as code: 202 vs 186 by a proper stripper) against Python's *physical* line count. Under one rule (§6) the honest comparison is 162 vs 160.
- **Self-praise.** Scans for elegant/beautiful/remarkable/impressive/striking/"proof that"/solved: no hits in the article, notes or README. The tone is descriptive; `notes/04-final.md` has an explicit "what is and is not established" section and lists open items for a reviewer. The article title "a transformer written as mathematics" is a claim the figures support.
- **Process record.** `transcript.txt`: 180 logged invocations, 107 interpreter runs of which 70 exited non-zero, 67 renders of which 5 failed — failures kept. 39 probes, each named for the question it asks; four milestone notes with attempt/observation/decision/uncertainty; a classified gap table with reproducer references. One recorded accidental-exposure note (a README link text) — candid. The brief's "no JSONL transcript" is respected; what is there is a command log.
- **Article beyond the brief.** The brief asked for a Markdown article with figures beside it, page production after review; they produced a 2.8 MB self-contained HTML page (light/dark via `prefers-color-scheme`). It wraps correctly at a true 390 px viewport (`shots/article-390.png`, rendered in a 390 px iframe; a naive Chromium `--window-size=390` screenshot is misleading because the headless window has a 500 px minimum — a first pass of this review was fooled by it and the claim was retracted).
- **Pedagogy balance.** Sections 2–6 interleave formula → Python excerpt → Fortress figure → prose for each block; sections 3, 4 and 8 are about constructing the notation (Σ protocol, `except`, `DelegatedIndexed`, big-operator objects). Roughly equal weight, as the brief demanded. Prose is tight; no detached code dumps except the two check outputs in §7, which are evidence.

## 6. Lines (one method: `astra-review/count_lines.py` — strip block comments and blanks)

| unit | lines |
|---|---|
| `src/MicroGPT.fss` whole (incl. smoke test) | 186 |
| smoke test region removed | 24 |
| **core** (Value 27 + topo 12 + Σ 7 + Vec/‖ 20 + Mat 9 + rmsnorm 5 + softmax 6 + layer 25 + model 9 + loss 6 + Adam 16 + pick 12 + header/ids ≈ 8) | **162** |
| of which notation machinery (Σ object+operators, Vec/Mat/CatVecs, topo, ids) | ≈ 48 |
| `src/check_main.part` (verification driver) | 90 |
| `src/train_main.part` (tokenizer + demo loop + sampling) | 40 |
| `src/MicroGPTData.fss` (generated goldens) | 1,207 |
| alternatives `v1_MicroGPT.fss` / `v2_kvcache_MicroGPT.fss` (with their smoke tests) | 182 / 189 |
| Python reference, same rule (blank and `#`-lines removed) | 160 (200 physical; the mission's figure of 152 excludes docstring/print-only lines) |

## 7. Design alternatives — are the reasons evidenced?

- Three complete programs, each verified by the same 52/53-check driver: `checks/check_run_v{1,2,3}_output.txt`, all `ALL CHECKS PASSED`, maxima ≤ 3.1·10⁻¹⁶. I re-ran v3 (§1) and v1/v2 (`runs/CheckV1.log`, `runs/CheckV2.log`).
- v1 → v2 (arrays+indices → `Vec`/`Mat`): reasons are the reproduced gaps #4/#5 (sized array types with nat parameters do not unify; `T^n` is Number-only) and the v1 figures' `Indexed⟦Value,ℤ32⟧`/`Array2⟦Value,0,m,0,n⟧` signature noise, visible in `figures/v1_layer.svg`. Evidenced.
- v2 → v3 (KV cache → whole-sequence): the stated reasons are (a) the model becomes a pure function of the token list, (b) positions become independent comprehension iterations, (c) the notation matches the papers' `Q, K, V` matrices, (d) the loss becomes one call. (a), (c), (d) are visible in the source; (b) is semantics, unmeasured. The cost they report — sequence form 2.0 s vs cache form 3.3 s vs array 4.1 s for the 5-position smoke forward — is in `transcript.txt` (17:59, 17:42 runs). They also state the cost of v3 for generation (prefix recomputed, quadratic) and keep v2 as "the inference-friendly form". Sound.
- Autograd node shape (pairs vs parallel lists vs closures): all three run (`probes/alt_autograd_*.fss`, figures embedded); the reason for pairs (no static-arg annotations in the operator table; chain-rule ingredients literal) is visible in the two alt figures. Sound.
- Unified Σ over an `Additive` trait: runs (`probes/alt_unified_sum.fss`) but static type `Additive`; declined. The right call and the only place a nicer notation was refused for typing honesty.
- Not explored: a matrix–matrix product (so `Q = X W_qᵀ` stays a comprehension) — they name it as the remaining seam rather than as a gap; the `T[n]`/`T^n` route was abandoned at the interpreter gap rather than worked around with a user `Vec` extending the library's sized `Vector` (probably impossible given `Number`-only, but not probed).

## 8. Verdict (alone)

Runs as documented, exit 0, reproduces its own 53 checks line-for-line; goldens regenerate bit-identically from the pinned upstream text with the real dataset (18,216 scalars); every article figure is a byte-verified render of the running source; all spec/library citations check out and every interpreter gap I re-probed reproduces, one with a refinement (lazy overload checking). The primary program is a 162-line core whose model half reads as the formulas with two residual seams (head assembly line; `(x)[i]` parentheses forced by an interpreter bug). Faults are small and named above: an unused `lr` parameter, two unused reverse operators, an over-stated "same graph" sentence, an apples-to-oranges line-count sentence, and a data path that leaves dataset loading and Gaussian initialisation to Python.
