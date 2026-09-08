# Phase 1 — independent review of Astra's microGPT-in-Fortress (branch `origin/codex/astra-microgpt`)

Written 2026-09-08 before reading any of our own microgpt2 material. All runs
in worktree `/home/user/fortress/.claude/worktrees/agent-a6ad2bea3bd03e8b7`,
JDK 25, `FORTRESS_THREADS=1`, `JAVA_FLAGS='-Xmx512m -Xss32m'` (Astra's flags).
Logs: `scratchpad/astra-review/runs/*.log`. Astra's tree extracted with
`git archive origin/codex/astra-microgpt experiment` to
`scratchpad/astra-review/astra/experiment/`.

## 1. Does it run?

**Yes.** `MicroGPT.fss` (sha256 `6bb32da2…fbefce`, identical to the hash in
`figures/source-hashes.json` and `REPRODUCE.md`) exits 0 and prints 739 TSV
lines. First run 16.4 s (library cache build), warm rerun 2.96 s; the two runs
are byte-identical. Tail of output verbatim:

```
loss	1.147958783149666
...
gentoken	0	0
...
gentoken	1	1
...
genprobability	2	2	0.5293588467559969
gentoken	2	2
```

`MicroGPTAlternatives.fss` (inverse-power RMS + `transpose(W) a` attention)
also exits 0 in 4.2 s; its output differs from the selected program only in the
last 1–2 ulps of a few logits/probabilities (e.g. `-0.4084449182522536` vs
`-0.40844491825225354`).

Own correctness checks: I converted my fresh run with Astra's
`fortress_tsv_to_json.py` and ran `validate_fixture.py` on it:
`fixture validation: PASS` (atol 1e-12, rtol 1e-10, all 228 initial /
gradient / updated cells plus logits, probabilities, 12 attention weights,
loss, generation). So the shipped goldens are reproduced here, not merely
claimed.

Every retained probe reproduces the outcome its NOTES.md describes:

| probe | expected | observed here |
|---|---|---|
| NotationExceptSum | 10.0 / 4.0 | `10.0` `4.0`, exit 0 |
| NotationDualSum | overload collision | `Overloading of BIG +[\T extends Number\]() … and BIG +():Comprehension[\D,D,D,D\] … fails because their parameter lists have the same types` |
| NotationDualSumStatic, NotationGenericBigSum | same collision | same message |
| NotationNumberBound | `Vector[D,2]` accepted despite bound | `[0#2][ D D ]`, exit 0 |
| NotationBuiltinSumD | CastError in library SUM | `FortressLibrary.fss:36:13-27: CastError` |
| NotationNamedSum | 10.0/4.0/4.0 | `10.0` `4.0` `4.0` |
| NotationDot | 25.0/6.0/3.5355… | `25.0` `6.0` `3.5355339059327378` |
| NotationDualSumGenerator, NotationGenericSum, NotationJuxt, NotationSum | run | run, exit 0 |
| AutodiffGraphProbe | value/dx/dy | `AD graph OK value=45.36440641097544 dx=50.46301869964355 dy=22.84566043345215` |
| VectorProbe | (known-failed) | `Cannot find definition for method asFloat given receiver 1: ZZ32` |
| AutodiffProbe | (retained old failure) | `Type requires static arguments: FortressLibrary.Array` ×6, exit 255 |
| AlternativesProbe | (failed) | `Precedence mismatch: juxtaposition and +.` (tight `n+j` after loose juxtaposition) |
| ForwardProbe | 9 logits + loss | matches fixture, `loss 1.147958783149666` |

Failure story of runs 04→05→06 (the Adam indexed-power bug): I re-ran the two
retained source snapshots. Both fail at `MicroGPT.fss:178:41-42` with
`Failed to find any matching overload, args = (), overload = { _[_](i:I):E …}`
— i.e. `g[i]^2` and `g[i]^2.0` alike make the interpreter call the subscript
with **zero** arguments; `(g[i])^2.0` (run 06) works. Confirmed.

## 2. Are the goldens plausibly derived from the Python reference?

Partly a weakness, which I closed. `reference/NOTES.md` pins gist revision
`14fb0388…` and `microgpt.upstream.py` hashes to the stated
`d47d88c2…ccee` (verified). **But `generate_fixture.py` never imports or
executes that file** — it is a hand re-implementation of `Value`, `linear`,
`softmax`, `rmsnorm`, `gpt`, Adam and sampling with the fixture conventions
(deterministic init `((i mod 29)-14)/100`, tokens `[2,0,1,2]`, injected
uniforms). The "independent validation" (`INDEPENDENT_VALIDATION.md`) checks
that re-implementation against finite differences, not against upstream
execution. So the chain "upstream Python → fixture" rests on a transliteration
that nobody ran side by side with upstream.

I wrote `upstream_harness.py`, which `exec`s the **actual upstream text** with
only textual patches (dataset stubbed to `docs=['ab']` so BOS=2 and tokens are
`[2,0,1,2]`; `n_embd=4, block_size=3, n_head=2, n_layer=1, num_steps=1`;
`random.gauss` replaced by the counter formula; `random.choices` replaced by
inverse-CDF over `[0.1,0.5,0.9]`). Result:

```
upstream-exec loss   = 1.147958783149666
fixture loss         = 1.147958783149666
max |grad diff|      = 0.000e+00
max |updated diff|   = 0.000e+00
upstream gen tokens  = [0, 1, 2]
fixture gen tokens   = [0, 1, 2]
max |gen logit diff| = 0.000e+00; max |gen prob diff| = 0.000e+00
UPSTREAM-VS-FIXTURE: PASS
```

The fixture is bit-identical to upstream under these conventions. Verdict:
goldens are correct; the process record should have contained this step and
did not.

## 3. Notation fidelity by eye (12 Fortify figures, all verbatim slices — verified by re-running `make_figures.py`: all 12 regenerated `.tic` sheets are byte-identical to the ones under `figures/rendered/`)

Scoring: how far the rendered Fortress is from the caption formula.

| block | formula (caption) | rendered Fortress | distance / notes |
|---|---|---|---|
| matrix-vector | y_i = Σ_j A_ij x_j | `opr juxtaposition(A:Mat,x:Vec):Vec = Vec(A.m, fn i ⇒ Σ_{j←0#A.n} A_{i,j} x_j)` | Σ with stacked bound, subscripts, juxtaposition product all real. Wrapper `Vec(A.m, fn i ⇒ …)` and `0#A.n` bound are the visible user machinery. Close. |
| dot | x·y = Σ x_i y_i | `opr ·(x:Vec,y:Vec):V = Σ_{i←0#x.n} x_i y_i` | Very close; DOT→· is genuine Fortify. |
| rmsnorm | x / sqrt((x·x)/n + 1e-5) | stacked fraction `x` over `sqrt( (x·x)/(x.n) + 0.00001 )` | Closest block in the set. Artifacts: `x.n` instead of n, `0.00001` instead of 10^-5 (my probe: `10.0^(-5)` runs and would render as a power — a missed option). |
| softmax | e_i / Σ e_j, m = max_i x_i | `e / Σ_{i←0#x.n} e_i` fraction; `maximum(x) = MAXNUM_{i←0#x.n} (x_i).primal` | Fraction and Σ close. `MAXNUM` is a word; `(x_i).primal` leaks AD. Library also ships `BIG MAX` (fss:3118) which runs on RR64 (my probe `RvwBigMax`: `MAX: 0.7`) and renders `\BIGOPR{MAX}` — slightly closer to "max", not tried. |
| attention | a = softmax(Kq/√d_h), o_j = Σ_t a_t W_tj | `a = softmax( (K q) / √(q.n) )`, `Vec(W.n, fn j ⇒ Σ_{t←0#W.m} a_t W_{t,j})` | Score line close (`q.n` for d_h). Contraction shows Σ but inside `Vec(…, fn j ⇒ …)`. Alternative `transpose(W) a` is shorter but `transpose` is a word. |
| block | y = x + W_o concat_h(o_h); x⁺ = y + W_out ReLU(W_in RMS(y)) | `y = x + B.W_o Vec(x.n, fn j ⇒ do v = heads[j ÷ s]; v[j MOD s] end)`; `y + B.W_out relu(B.W_in rmsnorm(y))` | MLP line is nearly the formula (`B.` prefixes aside). Concatenation is the worst-rendered idea in the article: `do v = heads[j÷s]; v[j MOD s] end` inside a constructor. |
| embedding | ℓ_t = U Block(RMS(E_tok + P_t)) | `M.U transformer(rmsnorm(M.E_token + M.P_t), M.B, C, t, M.H)` | Subscripted rows render nicely; the cache/position/head-count parameters `C, t, M.H` are noise relative to the formula. |
| loss | L = −(1/T) Σ log p_t[tok_{t+1}] | `losses_t := −log(probabilities[tokens[t+1]])`, `loss = (Σ_{t←0#3} losses_t) / 3.0` | Close, but `3`/`3.0` are fixture constants hard-coded into the "core"; `println` line included in the figure. |
| Adam | m ← β_m m + (1−β_m) g … | 13-line `adam` with β_m, β_v as real subscripted Greek, `m̂`, `v̂` hats, stacked fractions | Impressively close; artifacts `1.0 step`, `(g_i)^{2.0}`, `0.00000001`, `1.0 total`. |
| sampling | k = min{j : u < Σ_{i≤j} p_i} | imperative loop with `cumulative`, `found`, `choice` | Far from the formula; honest but not notation. |
| scalar AD | ∂z/∂x = y, ∂z/∂y = x | `opr juxtaposition(x:V,y:V):V = binary(x.primal y.primal, x, y.primal, y, x.primal)` | Shows machinery clearly; no pretence of formula. |
| containers | x_i = f(i) | `object Vec(n:ZZ32, f:ZZ32→V) … opr [i:ZZ32]:V = data_i` | Machinery, shown honestly. |

Where it leans on the language: Σ with stacked generator bounds (real
reduction expression through `Comprehension`/`CommutativeMonoidReduction`),
juxtaposition as multiplication and as matrix–vector product, `DOT`→·,
tight `/`→stacked fraction, `SQRT`→radical, subscript rendering of `_` names
(`W_q`, `beta_m`, `m_hat`→m̂), `[i]`→subscript. All genuine Fortify.

Where it leans on user machinery: everything vector-shaped (`Vec`, `Mat`,
pointwise overloads), the AD scalar, `VSumReduction`, the cache object, head
slicing, and explicit `(ZZ32,ZZ32)->V` constructor lambdas that leak into
every matrix formula.

Where it cheats: **it does not.** No hand-typeset Fortress, no look-alike
glyphs; captions are declared to be LaTeX mathematics, figures are verbatim
slices with hashes. The one presentational elision: the `transformer`
function's head-assembly loop (`K = Mat(t+1,s,fn (u,j) ⇒ (head(C.keys[u],h,s))[j])`,
cache writes, `heads` array) — the least paper-like 12 lines in the file — is
never rendered in any figure; `block.png` shows only its last two lines. A
reader of the article never sees the ugliest part typeset. The "Python
comparison" blocks are hand-written teaching excerpts (`const python = {…}` in
`make_article.mjs`), labelled as such, not upstream verbatim.

## 4. Language-use quality

Mechanisms used: `trait`/`object` with dynamic dispatch (`Parents`,
`Chain`), `extends CommutativeMonoidReduction[\V\]` + `Comprehension` (library
algebraic reduction machinery), user `opr SUM()` (parsed as `BIG +`,
`Parameter.rats:129`), `import FortressLibrary.{...} except { opr BIG + }`
(component/import feature — the key discovery), generators `0#n`,
`sequential(…)`, `BIG MAXNUM`, `opr DOT`, `opr juxtaposition` overloads on
`(V,V)`, `(Mat,Vec)`, mixed `RR64` overloads, `opr[i]`/`opr[i,j]` subscript
operators, tuple return `(Vec,Vec)`, `do … end` blocks, `:=` mutable fields.
Noted correctly that a parameterless `object` is a singleton (hence
`Walk(seed)`).

Not used: `excludes`, algebraic library traits for the scalar (`V` extends
nothing — the `AdditiveGroup[\D\]` route was probed in `NotationGenericSum`
and abandoned because it loses the Σ surface), library `Vector`/`Matrix`
(rejected with two probes: bound not enforced but library `SUM` casts to
`Number` → `CastError`), static `nat` dimensions, `spawn`/explicit
parallelism.

Impossibility claims and citations — all checked at the cited lines:
- `reductions.tex:23-52` "no explicit relationship between BIG Op and Op":
  verbatim in the spec; paraphrase accurate.
- `traits.tex:231-239` comprises-clause note: accurate; `Number comprises { RR64 }`
  with no ellipsis at `FortressLibrary.fsi:277`: accurate → sealed.
- `fsi:1459` `Vector[\T extends Number, nat s0\]`, `fsi:1820-1822` `opr SUM[\T extends Number\]()`,
  `fss:3041-3045`, `fss:3144-3149` (`BIG MAXNUM` via `MapReduceReduction`, NaN empty),
  `fss:1114-1121` (`__bigOperatorSugar`), `Expression.rats:685-707`
  (Accumulator → `makeAccumulator`), `PreTypeCheckDesugaringVisitor.java:351-405`:
  all exist and say what Astra says.
- `precedence.tex:45-51`: "Subscripting … superscripting … left-associative
  (performed left-to-right)" — supports classifying `g[i]^2` and `rows[i][j]`
  failures as interpreter gaps. My reproducers `RvwIndexedPow.fss` and
  `RvwChainedSubscript.fss` fail exactly as claimed with `args = ()`.
- Astra never claims a language-level impossibility; every departure is
  classified (library restriction / namespace / interpreter gap / design
  choice) with a reproducer. That discipline is the strongest part.

Quality faults in the code itself:
- `K = Mat(t+1,s,fn (u,j) ⇒ (head(C.keys[u],h,s))[j])` allocates a fresh
  `head` Vec for every (u,j) cell — O(s²) per cached row. Harmless at s=2,
  clumsy as a "canonical" form.
- Verification concerns leak into the model core: `attention` returns
  `(weights, output)` and `transformer` writes `C.weights[t H + h]` purely so
  the driver can print attention weights; `transformer` takes `C, t, H`.
- Fixture constants inside "core": `0#3`, `/3.0`, `Cache(3,2)`, `model(p)`
  hard-wires 3×4/4×4/16×4 shapes; `gradient(loss,228)`.
- Parameters are identified by a global integer index (`variable(i,x)`),
  not by node identity — a design decision (stated) that couples the AD to a
  flat parameter array and makes `matrixAt(p,m,n,offset)` necessary.
- The AD graph's reverse pass is a recursive DFS on a linked `Chain`, needs
  `-Xss32m`; acknowledged.

## 5. Pedagogy

Structure: 10 numbered sections, each = prose → (Fortify 2D | ASCII source)
panel → Python comparison panel → prose. No detached code dumps (full source
is in a collapsed `<details>`). Inline math is MathML; renders in Chromium.

Teaches the notation construction well (sections 1–4: scalar graph → eager
containers → teaching Σ to the scalar → linear algebra from Σ); the
`except { opr BIG + }` story and the departures table at the end are
genuinely instructive. Teaches the transformer thinly: attention gets four
sentences and no intuition (no "queries look up keys", no worked numbers, no
picture of the causal cache), residuals/RMSnorm/why-ReLU get one sentence
each, nothing on what a language model is doing, nothing on why heads. The
brief asked for equal weight; the article is ~70/30 notation-and-verification
vs transformer. Sampling and Adam sections are the best-taught model pieces.
The prose is dense, declarative, sometimes reads like a compliance memo
("It is educational machinery, not an industrial autodiff engine").

## 6. Process record

Strong: 83 timestamped `evidence/*/command.json` records with exit codes and
(from 2026-09-08 on) source snapshots and hashes; failures retained
(`VectorProbe`, `AutodiffProbe`, `NotationDualSum*`, `AlternativesProbe`,
integrated-03/04/05); `MILESTONES.md`, `RECOVERY_HISTORY.md`, `RESUME.md`
give attempt/observation/decision; two substantively different full programs
(quotient vs inverse-power RMS; direct Σ vs `transpose(W) a`) both validated;
`SOURCE_INVENTORY.md` refuses to claim a line-count win; the article's
closing table names every departure; tone is non-self-congratulatory.

Weak: (a) earlier failure logs (integrated-01…03, the notation-dual-sum
overload error) are not on the branch — only `command.json` with exit code;
the quoted error text lives only in memos. (b) The fixture-provenance gap in
§2. (c) Independence of the "independent validator" is nominal — same model,
same session tree. (d) A worker `rg --files experiment` listed excluded paths
(self-reported; no contents read). (e) `SOURCE_INVENTORY.md` counts include
Cache/Block declarations and the fixture mapping under "mathematical core".

## 7. Line accounting (stripping rules: comments, blanks, verification/driver removed)

`count_lines.py` on `MicroGPT.fss`: 262 physical, 252 nonblank-noncomment.
Removed: header (`component`/`import`/`export`, 3), stress helpers
`tree`/`diamond` (2), driver `emitMatrix`…`run()` (66). **Core = 181.**
Of those, 6 are the fixture-specific `matrixAt`/`model(p)` mapping and 5 are
`Cache` + `Block` declarations. Python pinned file: 160 nonblank-noncomment
lines total (mission's "152" core figure taken as given). Astra's core is
~181 vs 152, with the caveat that Astra has no tokenizer/dataset/training
loop and Python has no explicit `Vec`/`Mat`/reduction machinery.

## 8. Verdict

**Runs, verified, honest.** Every numeric claim reproduces here; the goldens
are bit-identical to real upstream execution (my harness), and every
spec/library citation is accurate at the cited line. The `except { opr BIG + }`
discovery that unlocks a user-level Σ over a non-`Number` scalar is a real,
reusable finding for the revival, as are the two minimal interpreter
reproducers (`g[i]^2`, `rows[i][j]`).

Specific praise: verbatim-slice figure pipeline with hashes; departures
table with classification per item; two full alternative programs actually
validated rather than argued; `DOT`→· choice over `x x`; Adam and rmsnorm
renderings that genuinely read as the formula; refusal to inflate line counts.

Specific faults: fixture derived from a re-implementation with no
upstream-execution cross-check in the record; the ugliest core code (head
assembly, cache plumbing) is never typeset for the reader; verification
plumbing (`C.weights`, tuple-returning `attention`) and fixture constants
(`0#3`, `3.0`, `228`) contaminate the "canonical" core; the transformer side
of the pedagogy is thin relative to the brief's equal-weight demand; missed
small notational wins (`10.0^(-5)`, `BIG MAX`); `Vec(x.n, fn j ⇒ …)` wrapper
remains visible in every vector-valued formula, and the article does not
explore whether a comprehension-style or library-`Vector`-style spelling
could remove it; evidence logs for the early failures not on the branch.
