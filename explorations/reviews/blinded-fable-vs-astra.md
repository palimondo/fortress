# Phase 2 — the blinded Fable run vs Astra

Written after `fable-review/phase1.md` was on record. Astra's material: `astra-review/astra/experiment/worker/` (source `main/MicroGPT.fss`, figures `main/figures/rendered/*.png`, `ARTICLE.md`, `SOURCE_INVENTORY.md`, `reference/`), and the previous review's findings in `astra-review/phase1.md`, reused rather than redone. Both runs pin the same upstream text (sha256 `d47d88c2…ccee`). Pair images: Astra's shipped renders (their pipeline rasterises at scale 2 with `\small` type in a 19 cm minipage); the blinded Fable run's SVGs re-rasterised here by headless Chromium at device scale 2 and cropped (`fable-review/crop.py`), which brings both sides to the same pixels-per-point (line pitch ≈ 33–36 px on both).

## A. Rendered pairs, judged against the paper's formula

| block | paper | Astra (rendered) | blinded Fable run (rendered) | winner | why |
|---|---|---|---|---|---|
| embedding / whole forward | h⁰ = E[tok_t] + P[t]; ℓ = W_lm Block(…) | `gpt(M,token,t,C): Vec = M.U transformer(rmsnorm(M.E_token + M.P_t), M.B, C, t, M.H)` | `X := ⟨rmsnorm(E_{tokens_t} + P_t) \| t ← tokens.indices⟩; for l ← seq(layers) do X := l.forward(X) end; ⟨W_lm x \| x ← X⟩` | **Fable** | Same lookup line; Fable has no cache/position/head-count arguments and is multi-layer; the residual noise is `List⟦Vec⟧` and the comprehension brackets. |
| rmsnorm | x / √(1/n Σ x_i² + ε) | stacked fraction `x` over `√((x·x)/(x.n) + 0.00001)` — one line | `ms = (∑_{x_i←x} x_i²)/\|x\|; scale = (ms + 0.00001)^{−0.5}; scale x` — three lines | **Astra** | Astra's tight `/` gives the paper's fraction-and-radical shape; Fable typesets Python's three steps (with a real Σ over elements, and `\|x\|` for n) but the eye has to assemble them. Both write `0.00001`. |
| softmax | e_i = exp(x_i − m), p_i = e_i / Σ_j e_j | `e = exp(x − maximum(x)); e/(∑_{i←0#x.n} e_i)` stacked fraction; `maximum` = `MAXNUM_{i←0#x.n} (x_i).primal` | `m = MAX_{z_i←z} z_i.data; e = Vec(⟨exp(z_i − m) \| z_i ← z⟩); total = ∑_{e_i←e} e_i; Vec(⟨e_i/total \| e_i ← e⟩)` | **Astra** | Two lines with the fraction vs four lines with `Vec(⟨…⟩)` wrappers. Both detach the max from the graph (`.primal` / `.data`) and both render max as a word; Fable's Σ ranges over the carrier (`e_i ← e`), Astra's over an index range. |
| attention | α_t = softmax(K_{0:t} q_t/√d_h); y_t = α_t V_{0:t} | `a = softmax((K q)/√(q.n)); (a, Vec(W.n, fn j ⇒ ∑_{t←0#W.m} a_t W_{t,j}))` | `α = softmax((Kh_{0:t} Qh_t)/√d_h); α Vh_{0:t}` | **Fable, decisively** | Fable has the row-vector×matrix direction as a second juxtaposition overload, so the value blend is `α V` as on paper; Astra writes the contraction as a Σ inside a `Vec(…, fn j ⇒ …)` constructor and returns a `(weights, output)` tuple for the test driver. Fable's `√d_h` vs Astra's `√(q.n)`. Fable's surrounding head plumbing (`Q.cols(c)`, `(heads_h)[t]`, `BIG ‖`) is its weakest code, but Astra's equivalent (`Mat(t+1, s, fn (u,j) ⇒ (head(C.keys[u],h,s))[j])`) is never rendered at all. |
| FFN / residual block | x' = x + Attn(RMS(x)); x⁺ = x' + W_out ReLU(W_in RMS(x')) | `y = x + B.W_o Vec(x.n, fn j ⇒ do v = heads[j÷s]; v[j MOD s] end); y + B.W_out relu(B.W_in rmsnorm(y))` | `mlp(x) = W_out relu(W_in x)`; `X' = X + attention(rmsnorm(X)); X' + ⟨mlp(x) \| x ← rmsnorm(X')⟩` | **Fable** | The MLP line is equally good on both sides; Astra's residual line carries the DIV/MOD head concatenation, Fable's carries only the per-position comprehension lift. |
| head concatenation | concat_h(o_h) | `Vec(x.n, fn j ⇒ do v = heads[j÷s]; v[j MOD s] end)` | `BIG ‖[h ← 0#n_head] (heads_h)[t]` | **Fable** | A user big operator (`CatVecs extends MonoidReduction`) vs index arithmetic. Fable's line still needs the `(heads_h)[t]` parenthesis (interpreter gap, both classify it identically). |
| loss | L = −(1/n) Σ_t log p_t[tok_{t+1}] | `losses_t := −log(probabilities[tokens[t+1]])`; `loss = (∑_{t←0#3} losses_t)/3.0` | `losses = ⟨−log((softmax(logits_t))[tokens_{t+1}]) \| t ← 0#n⟩; (1/n)(∑_{l←losses} l)` | **Fable** | Same shape; Astra hard-codes the fixture's `3`/`3.0` into the core and the figure includes a `println`; Fable's `n = \|tokens\| − 1` is general. Astra's stacked `Σ/3.0` fraction reads slightly better than Fable's `(1/n)(Σ)`. |
| Σ machinery | — | `VSumReduction extends CommutativeMonoidReduction⟦V⟧` (empty `constant(0.0)`, join `+`) + `opr ∑(): Comprehension⟦V,V,V,V⟧` (6 lines) | `SumValues extends CommutativeMonoidReduction⟦Value⟧` (empty `node(0)`, join `+`) + `opr ∑(): BigReduction⟦Value,Value⟧` + prefix `opr ∑(g: Generator⟦Value⟧)` (7 lines) | tie | Converged on `import FortressLibrary.{...} except { opr BIG + }` and a monoid reduction object; two different library entry points (`Comprehension` vs `BigReduction`), both valid. Fable adds the prefix `∑ xs` form and a second big operator (`BIG ‖`). |
| Adam | m ← β₁m + (1−β₁)g; v ← …; p ← p − α m̂/(√v̂ + ε) | 13-line procedure over arrays `p, g, m, v`; β_m, β_v, m̂, v̂ real; `α = 0.01(1.0 − (step−1)/(1.0 total))` inside; artifacts `1.0 step`, `(g_i)^{2.0}`, `0.00000001` | `Adam` object holding `m, v, t`; `m_i := β₁ m_i + (1 − β₁) p.grad; … p.data −= lr_t m̂/(v̂^{0.5} + eps)` | tie (slight Fable) | Both genuinely read as the update. Astra's `√v̂` beats Fable's `v̂^{0.5}` (Python's `** 0.5`); Fable's `β₁, β₂, eps` beat Astra's `1.0 step`/`0.00000001`; Fable's `lr_t` typesets with a literal underscore and its constructor carries an unused `lr`. |
| generation / sampling | k = min{j : u < Σ_{i≤j} p_i}; loop until BOS | `categorical(p, u)`: loop with `cumulative`, `found`, `choice`, no early exit; driver samples 3 tokens on a 3-token vocabulary with injected uniforms | `pick(probs, u)`: normalises by the total (as `random.choices` does), `label found … exit found with i`; demo loop `for j ← seq(0#block_size)` with temperature, BOS stop, `text := text ‖ uchars_token` | tie on notation, **Fable on scope** | Neither is the min-set formula; both are honest loops. Fable's generation is the reference's actual inference loop (16-token block, temperature 0.5, real vocabulary, 3 samples replayed from recorded Python draws plus 4 free samples). |
| scalar AD | ∂(a+b)/∂a = 1, ∂(ab)/∂a = b, … | 72 lines: `Parents`/`Chain` trait hierarchy, `Walk`, `V(primal, index, parents)`, parameters by global index; `binary(x.primal y.primal, x, y.primal, y, x.primal)` | 39 lines: `object Value(var data, deps: Generator⟦(Value, ℝ64)⟧)` with the operator table `node(data b.data, (self, b.data), (b, data))`; `topo` + `backward` in Python's shape | **Fable** | The chain-rule ingredients are the literal arguments on both sides; Fable's is half the length, needs no index bookkeeping, and its `backward` is three lines beside Python's. |
| containers | x_i, A_ij | `Vec(n, f: ℤ32→V)` / `Mat(m, n, f)` eager arrays (17 lines); every use writes `0#x.n` | `Vec(x: List⟦Value⟧) extends DelegatedIndexed` (six delegations, six operators) + `Mat(rows)` (29 lines) | **Fable** | Fable's carriers are generators, so Σ and comprehensions range over `x_i ← x` and `\|x\|` is free; Astra's lambdas (`fn i ⇒ …`) appear in every vector-valued formula. Astra's is a third shorter. |

Common residue on both sides: `Vec(…)` wrappers around every comprehension-built vector; max as a word; Σ bounds as generator clauses; `0.00001` instead of ε (neither tried `10.0^(-5)`, which the previous review showed runs); no shape types on the carriers.

Tally on the mission's fitness function (rendered distance from the paper): Fable 7, Astra 2, ties 3. Astra's two wins are the same trick — a *tight* `/` that Fortify sets as a stacked fraction — which Fable never used.

## B. Correctness anchoring

| | Astra | blinded Fable run |
|---|---|---|
| model checked | synthetic fixture: vocab 3 (`a`,`b`,BOS), n_embd 4, block 3, 2 heads, 228 params, tokens `[2,0,1,2]` | the reference configuration: vocab 27, n_embd 16, block 16, 4 heads, 4,192 params, real seeded dataset (`yuheng`, `diondre`) |
| goldens | `generate_fixture.py`, a re-implementation of upstream; shown bit-identical to upstream execution only by the previous review's harness | `derive_checks.py` executes the pinned text for everything up to the optimizer and an instrumented copy of the loops; my harness (`upstream_harness_fable.py`) executing the real loop text reproduces all 18,216 scalars bit-identically — and their record already contained the derivation step Astra's lacked |
| quantities | 228 init, 9 logits, 9 probs, 12 attention weights, loss, 228 grads, 228 updated params, 3 generation steps (1 training step) | per step: 27 logits × 7–8 positions, per-position losses, loss, 4,192 grads, 4,192 updated params; 2 training steps; 3 samples × 2–16 steps of probabilities, tokens, texts — 53 named checks, ≈ 18 k scalars |
| tolerance | atol 1e-12, rtol 1e-10 (validator) | 1e-12 absolute, justified in writing; observed ≤ 4.4e-16 |
| sampling | inverse-CDF over injected uniforms `[0.1, 0.5, 0.9]` | replay of the uniforms `random.choices` actually consumed (patched `random._inst.random`) |
| beyond the fixture | `MicroGPTAlternatives.fss` also validated; finite-difference check of the Python side | v1 and v2 alternative programs pass the same 53 checks (`runs/CheckV1.log`, `runs/CheckV2.log`); 12-step training demo whose first two losses are the reference's (`runs/Train.log`, 499 s); one 3-variable finite-difference probe of the Fortress autograd |
| reproduced here | previous review: PASS on a fresh run | this review: 53/53, output line-identical (§1 of phase1) |

Fable's anchoring is stronger on every axis: full-size model, real data, two steps instead of one, sampling driven by the real RNG stream, and the derivation from upstream is in the record. Astra's fixture is tiny by design (3-token vocabulary), which made its one-step check fast (3 s) where Fable's costs 143 s.

## C. Lines (one instrument: `count_lines.py`, comments and blanks stripped, verification/driver removed)

| | Python | Astra | blinded Fable run |
|---|---|---|---|
| physical / nonblank-noncomment | 200 / 160 | 262 / 252 | 267 / 186 (primary file) |
| **core** | 160 (152 by the mission's count) | **181** (driver, stress helpers, header removed; still contains `matrixAt`/`model(p)` fixture mapping, `Cache`, tuple-returning `attention`) | **162** (smoke test removed; no fixture constants, no verification plumbing) |
| of which AD engine | — | 72 | 39 |
| of which containers + Σ + operators | — | ≈ 33 | ≈ 48 |
| of which model + loss + optimizer + sampler | — | ≈ 76 | ≈ 75 |
| drivers outside the core | — | 66 (fixture emit) | 90 (check) + 40 (tokenizer, demo loop, sampling) |
| generated data | — | none (fixture computed in the driver) | 1,207 |

Both are ≈ 1.0–1.1× Python's core. Fable's smaller core covers more of Python's scope (multi-layer forward, general-length loss, an optimizer object with state, a sampler with normalisation and early exit); Astra's larger core covers less (one layer hard-wired, fixture shapes, no tokenizer). Neither claims a line-count win; Fable's article makes one apples-to-oranges sentence (202 vs 199, see phase1 §5) that this table corrects.

## D. Scope vs the Python

| Python feature | Astra | blinded Fable run |
|---|---|---|
| dataset download/read/shuffle | absent (synthetic 2-doc vocabulary) | done in Python; 64 shuffled docs exported to the data component |
| tokenizer (`uchars.index`) | absent | 4 lines in `train_main.part` (`if i ← ref_uchars.indexOf(ch) then i else 0 end`) |
| Gaussian init | absent (deterministic counter) | absent (reference weights imported; uniform substitute in the smoke test) |
| forward with KV cache | yes (single-layer, fixture shapes) | v2 (`alt/v2_kvcache_MicroGPT.fss`), verified; primary is the stateless sequence form |
| multi-layer | no | yes (`layers: List⟦Layer⟧`) |
| loss over a document | 3 fixed positions | general `n = \|tokens\| − 1`, block-size truncation in the demo |
| Adam with lr decay | one step, decay formula inside `adam` | object with `t`; decay computed by the caller as in Python (`0.01 (1 − step/num_steps)`) |
| multi-step training | no | 12 steps (bounded demo) |
| inference loop (temperature, BOS stop, block size) | 3 steps on a 3-token vocabulary | full loop, 3 replayed + 4 free samples |

## E. Machinery rulings — where the two runs disagree about what Fortress can do

1. **Both juxtaposition directions (Mat·Vec and Vec·Mat).** Astra has only `(Mat, Vec)` and writes the value blend as an explicit Σ, calling the reverse product ambiguous. Fable declares `opr juxtaposition(W: Mat, x: Vec)` and `opr juxtaposition(a: Vec, M: Mat)` as two top-level overloads on unrelated object types and the program runs and verifies. **Ruling: Fable is right**; no `excludes` clause or Meet-rule reasoning is needed when the two carriers are distinct objects — the overloads are disjoint by type. (The previous review reached the same conclusion via `Rank1 excludes Rank2`; Fable shows the simpler route.)
2. **Concatenation.** Astra: "deliberate representation choice", DIV/MOD in a constructor. Fable: a user `MonoidReduction` gives `BIG ‖[h ← …] …`. **Fable is right** that the language offers a concatenation big operator at user level (`probes/probe19_bigcat.fss`; the primary program).
3. **Carriers as generators.** Astra's `Vec` is an eager array with `opr[i]`; Σ and max must range over `0#x.n`. Fable's `Vec extends DelegatedIndexed⟦Value,ℤ32⟧` with six delegations makes `x_i ← x`, `\|x\|`, `x[r]` slices and `indexValuePairs` available. **Fable is right** that the library trait supplies the generator protocol; Astra never asked.
4. **Σ entry point.** `Comprehension⟦V,V,V,V⟧` (Astra) vs `BigReduction⟦Value,Value⟧` (Fable). Both are library-sanctioned constructors of a big operator; both run. Tie. Fable's extra prefix overload `opr ∑(g: Generator⟦Value⟧)` is what the library itself does for numbers.
5. **`except { opr BIG + }`.** Converged independently; both note `except { opr SUM }` is a syntax error; Fable additionally shows `except { opr ∑ }` parses (`RvwExceptSigma`) and that the interpreter's overload check is lazy (phase1 §4).
6. **Chained subscripting / indexed power.** Both classify as an interpreter gap against the spec's left-associative postfix rule, both with minimal reproducers. Converged.
7. **Sized array types `T[n]`, `T^n`.** Only Fable probed them (gaps #4, #5, reproduced by `RvwNatArray`, `RvwTypePow`): `T[n]` with a nat parameter does not unify with runtime arrays; `T^n` is the Number-only `Matrix`. Astra did not go there. Fable's finding stands and belongs on the revival worklist.
8. **Transpose.** Astra's alternative uses a `transpose(W)` function and records the word as a departure. Fable never needs a transpose because the second juxtaposition direction covers `α V`; it does not define `^T` either (its `Q = Mat(⟨W_q x \| x ← X⟩)` is the remaining seam where a paper writes `X W_qᵀ`). Neither found the spec's postfix operator; the previous review did.
9. **max over the graph.** Both detach (`.primal` / `.data`) and both render a word (`MAXNUM` / `MAX`). Tie; neither made the scalar join `StandardMax`.
10. **Parameter identity.** Astra: global row-major index baked into `V`; Fable: by object, `params()` flattens matrices, `p.grad`/`p.data` fields as in Python. Fable matches the reference's design and needs no `matrixAt` mapping.
11. **Object varargs.** Fable found `objects.tex:66` ("varargs parameters are eliminated") and uses a factory; Astra has no varargs need. Fable's citation is correct.

## F. Pedagogy

| | Astra | blinded Fable run |
|---|---|---|
| structure | 10 sections; prose → [render \| ASCII] → hand-written Python comparison → prose; departures table; full source collapsed | 10 sections; formula (LaTeX render, same pipeline) → verbatim Python excerpt from the gist → Fortify render with "ASCII source as typed" disclosure → prose; alternatives section with three verified programs; language section with a gap table and a revival worklist |
| teaches the transformer | thin (previous review: ≈ 70/30 notation vs model; attention in four sentences) | adequate and balanced: what attention does in words, causal restriction, heads, residual stream, why subtract the max, what the loss means, what the training demo shows, generation as feeding the model its own output; each block has formula + Python + Fortress |
| teaches the notation | well: scalar → containers → Σ → algebra; departures table | well: Σ protocol and `except`, `DelegatedIndexed`, big-operator objects, three autograd shapes, three model designs with the reasons; gap table with I/L/D classes |
| shows what was typed | yes, beside every render | yes, collapsible under every figure |
| Python adjacency | hand-written teaching excerpts, labelled as such | verbatim from the pinned gist |
| formula at parity with the render | LaTeX caption inside the same sheet (`\small`) | separate LaTeX render, same size as the code figure |
| shows the ugliest core code | no (head assembly never rendered) | yes (`gpt_layer` renders the whole layer, including the `BIG ‖` line) |
| tone | declarative, no self-praise | descriptive, no self-praise; explicit "what is and is not established" |
| page | responsive HTML + Markdown | responsive HTML (verified at a true 390 px); the brief asked for Markdown, not a page |

## G. Process record

| | Astra | blinded Fable run |
|---|---|---|
| command log | 83 timestamped `evidence/*/command.json` with exit codes; source snapshots and hashes from 2026-09-08 on; early failure *outputs* not on the branch | `transcript.txt`: 180 invocations with full stdout/stderr inline, 70 non-zero exits kept, 5 render failures kept |
| probes | 12 notation probes + AD probes, failures retained | 39 probes, failures retained, each named for its question |
| milestones | `MILESTONES.md`, `RECOVERY_HISTORY.md`, `RESUME.md` | `notes/01…04` (attempt / observation / decision / uncertainty) + `gaps.md` |
| goldens derivation in record | re-implementation only | instrumented execution of the pinned text; JSON committed |
| source versions | snapshots per run (late) | final v1/v2/v3 kept; intermediate iterations of `MicroGPT.fss` visible only through the transcript's error lines, not as files |
| self-reported exposure | one `rg --files` over excluded paths | one README link text |

Both are reviewable. Astra's is more mechanical (per-run JSON, hashes); Fable's is more complete on outputs (every error text is in the transcript) but thinner on intermediate source snapshots.

## H. Adherence to the brief

| requirement | Astra | blinded Fable run |
|---|---|---|
| canonical form justified against alternatives | one alternative program (RMS spelling, transpose) | three complete verified designs + three autograd shapes + unified-Σ variant declined on typing grounds |
| render early, revise before choosing | yes (two comparison figures before selection) | yes (fig00/fig01 exploration sheets at 17:07/17:10, v1 figures at 17:37 before v2/v3 existed) |
| no hidden machinery | head assembly and cache never rendered | everything in the model rendered; drivers not (correctly) |
| deterministic checks from Python, justified tolerances | yes; tiny fixture; derivation by re-implementation | yes; real configuration; derivation by execution; tolerance justified in writing |
| bounded runs, no long training | yes (3 s) | yes (2 min check, 7–8 min demo) |
| do not let speed dictate notation | yes | yes; cost table reported separately |
| Markdown article with figures beside it | Markdown + HTML | HTML only (sections are HTML fragments) — a departure |
| core vs support vs tests counted separately | `SOURCE_INVENTORY.md` | `linecount.py` per region; one apples-to-oranges sentence |
| classify departures with reproducers and citations | yes | yes, with I/L/D classes and a revival worklist |
| no self-praise | yes | yes |
| fixture constants / verification plumbing out of the core | violated (`3`, `3.0`, `228`, `C.weights`, tuple return) | respected (drivers composed from `.part` files) |

## I. Adopt list

**Astra ← Fable**
1. Carriers that are generators (`DelegatedIndexed`): Σ over `x_i ← x`, `\|x\|`, slices — removes `0#x.n` from every formula.
2. A second juxtaposition overload `(Vec, Mat)` — the value blend becomes `α V`; no tuple return, no Σ-in-constructor.
3. A user `MonoidReduction` for head concatenation (`BIG ‖`) instead of DIV/MOD.
4. Python-shaped autograd (`Value` with `(child, ∂)` pairs, `topo`, `backward`) — half the engine, parameters by identity, no `matrixAt`.
5. Keep fixture constants and verification plumbing out of the core; compose drivers from parts.
6. Verify at the reference's real configuration over ≥ 2 steps, with the real RNG stream replayed for sampling, and put the derivation-from-upstream step in the record.
7. Render the whole layer, including the head assembly.
8. Teach the transformer at the same weight as the notation; run a bounded training demo and show samples.
9. Quote the Python verbatim from the pinned source.

**Fable ← Astra**
1. Tight `/` for rmsnorm and the softmax denominator — `x/(SQRT((x·x)/|x| + 0.00001))` and `e/(∑ e_i)` render as the paper's stacked fraction and radical; Fable's `x_i` names the elements well but three lines lose the shape.
2. `SQRT(v̂)` in Adam instead of `v̂^0.5`, and drop the unused `lr` constructor parameter.
3. Per-run source snapshots with hashes (`source-hashes.json`) so the intermediate iterations are files, not transcript fragments.
4. A Markdown source for the article, as the brief asked (Astra ships `ARTICLE.md` beside its HTML).
5. Astra's 3-second synthetic fixture as a *fast* pre-check beside the 2-minute full one.

**Both**: `10.0^(-5)` for ε; a scalar that joins the library's `StandardMax` so max needs no `.data`/`.primal`; the spec's postfix `^T` so `Q = X W_qᵀ` can be written; named ε.

## J. Overall judgment

The blinded Fable run is the better program and the better article; Astra's is the tidier evidence trail. On the mission's forcing function — the executable definition beside the paper's formula, judged by eye — Fable wins seven of twelve pairs and loses two, both to a single typographic device (Astra's tight fraction) that Fable could adopt in an afternoon. Fable's correctness anchoring is the stronger by a wide margin: the reference's actual 4,192-parameter model on real data for two steps and three replayed samples, bit-identical goldens regenerated here from the upstream text, and two alternative complete programs plus a 12-step training demo verified against the same checks; Astra's is a one-step 228-parameter synthetic fixture whose derivation from upstream was established only by the previous review. Fable's core is smaller (162 vs 181 lines) while covering more of the Python (multi-layer, general-length loss, tokenizer, training loop, full inference), and it keeps fixture constants and verification plumbing out of the core where Astra does not. Astra's advantages are real but narrower: the fraction-shaped rmsnorm/softmax, per-run snapshots with hashes, a Markdown article source, and a 3-second check. Where the two disagree about the language — reverse juxtaposition, concatenation as a big operator, carriers as generators — the running, verified Fable program settles each in Fable's favour; where they agree (`except { opr BIG + }`, the chained-subscript interpreter bug) both are right. Fable's faults are an over-stated "same graph" sentence, an apples-to-oranges line count, an unused parameter, and an HTML deliverable where Markdown was asked for.
