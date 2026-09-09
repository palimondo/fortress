# Phase 2 — comparison: Astra's MicroGPT.fss/ARTICLE.html vs our microgpt2.fss/"A GPT You Can Read"

Written after Phase 1 was on record (phase1.md). Ours was read only now:
`explorations/microgpt2.fss`, `microgpt2-sigma.md`, `microgpt2-named-spaces.md`,
`sum-experiment-report.md`, `libvector-report.md`, and
`scratchpad/microgpt-presentation.html` (rasterized to `shots/ours-full.png`,
18.3k px tall). Our program run here: `runs/ours-microgpt2.log` —
`golden transformer forward/backward vs Python reference: PASS`, 30 steps,
4.08 s/step, 10 samples; 137 s wall.

## A. Block by block — rendered distance from the paper's formula

| block | paper | Astra (rendered) | ours (rendered) | closer | why |
|---|---|---|---|---|---|
| embedding | h⁰ = W_e[t] + W_p[i] | `gpt(M,token,t,C): Vec = M.U transformer(rmsnorm(M.E_token + M.P_t), M.B, C, t, M.H)` | `h₀ = **We**_t + **Wp**_i` | ours | Astra's line is the full `gpt` incl. cache plumbing args; ours is the paper's line with bold weights. |
| rmsnorm | x / √(x·x/d + ε) | stacked fraction: x over √( (x·x)/(x.n) + 0.00001 ) | `d = |x|` then `x/√((x·x)/d + ε)` (loose, one line, parens) | **Astra on layout, ours on symbols** | Astra's *tight* `/` yields the paper's stacked fraction and radical; ours writes loose `/` and gets an inline slash with parens. Ours has `d` and `ε` (named constant renders ε); Astra has `x.n` and `0.00001`. |
| softmax | e_i / Σ_j e_j, m = max | `MAXNUM_{i←0#x.n} (x_i).primal`; `e = exp(x − maximum(x))`; fraction `e` over `Σ_{i←0#x.n} e_i` | `m = MAX_{u←a} u`; `e = exp(a−m)`; `Z = Σ_{u←e} u`; `ProbDist((e/Z).xs)` | **split** | Astra's inline denominator is a clean stacked fraction (tight `/`), closer than our bound `Z` + the `ProbDist(….xs)` lift. Ours' `MAX` is the genuine library big operator over `Value` (no `.primal` leak) and the Σ ranges over the carrier (`u←e`), not an index range. Our page's claim that the inline form "nests three sets of auto-scaled parentheses" is true only of the loose spelling; Astra's tight spelling refutes it as a general statement (my probe `RvwNames2`: `1.0/(SUM[i <- 0#3] e[i])` parses and evaluates). |
| attention | softmax(qKᵀ/√d_k) V | `a = softmax((K q)/√(q.n))`; `Vec(W.n, fn j ⇒ Σ_{t←0#W.m} a_t W_{t,j})` (or alt. `transpose(W) a`) | `attend(q: Vec, K: Mat, V: Mat): Vec = softmax(q Kᵀ/√d_k) V` | **ours, decisively** | Ours is the paper's line verbatim. Astra lacks two mechanisms: the spec's postfix `^T` (basic/operators/intro.tex) and the second juxtaposition direction (p M) via `Rank1 excludes Rank2` + the Meet Rule (advanced/overloading.tex). Astra writes `K q` (Mat×Vec) because it has only that direction. |
| FFN / residual block | y = x + W_o concat(heads); x⁺ = y + W_out ReLU(W_in RMS(y)) | `y = x + B.W_o Vec(x.n, fn j ⇒ do v = heads[j÷s]; v[j MOD s] end)`; `y + B.W_out relu(B.W_in rmsnorm(y))` | `ffn(x) = **W2** relu(**W1** x)`; in `forward`: `x3 = **Wo** concat(heads) + x1`, `x5 = ffn(x4) + x3` | ours | Astra's MLP line is as good as ours (and its `W_in`/`W_out` letter subscripts are closer to the paper than our bold `W1`/`W2`); its concat is the worst-rendered idea in either work. Ours' `concat` is a one-line comprehension `⟨ u | h ← heads, u ← h ⟩`. |
| whole forward | — | never rendered (only its last two lines) | 12 lines, all rendered | ours | Astra's `transformer` head loop (`K = Mat(t+1,s,fn (u,j) ⇒ (head(C.keys[u],h,s))[j])`, cache writes) is the least paper-like code in either file and is absent from Astra's figures. |
| loss | L = −log p_y ; mean over T | `losses_t := −log(probabilities[tokens[t+1]])`; `loss = (Σ_{t←0#3} losses_t)/3.0` | `nll(logits, y) = do p = softmax(logits); −log(p_y) end`; `loss = (Σ_{l←losses} l)/n` | ours | `−log(p_y)` is the formula; Astra hard-codes the fixture's `3`/`3.0` into the core. |
| dot / matvec | x·y = Σ x_i y_i; (Ax)_i = Σ_j A_ij x_j | `opr ·(x,y): V = Σ_{i←0#x.n} x_i y_i`; `Vec(A.m, fn i ⇒ Σ_{j←0#A.n} A_{i,j} x_j)` | `opr ·(u,w): Value = Σ_{m←u.indices} u_m w_m`; `Vec(⟨ r·x | r ← w ⟩)`; `Vec(⟨ Σ_{j←p.indices} p_j (m_j)[c] | c ← (m₀).indices ⟩)` | tie | Both have the paper's Σ with a generator clause as subscript. Astra's `fn i ⇒` lambda wrapper vs our set-builder comprehension: comprehension reads more like mathematics, lambda reads more like code. Ours' `(m_j)[c]` is uglier than Astra's `A_{i,j}` (Astra has a 2-index `opr[i,j]`). |
| Σ machinery | — | `VSumReduction extends CommutativeMonoidReduction[V]`, `empty()=constant(0.0)`, `opr Σ(): Comprehension[V,V,V,V]` (6 lines + import) | `PlusReduction extends CommutativeMonoidReduction[Any]`, `empty()=0`, 2 identity overloads, `opr Σ[T](): BigReduction[Any,Any]` (7 lines + import) | tie | **Converged independently on `import FortressLibrary.{...} except { opr BIG + }`.** Astra's reduction is V-only with the *correct* identity `constant(0.0)`; ours is over `Any` so one Σ serves Values and numbers (used by `sample`) at the price of the empty-Σ hole and two `+(ZZ32,Value)` overloads. Both classify the same way (design limit: nullary desugaring + overloading on value params). |
| Adam | m ← β_m m + (1−β_m) g … | full 13-line routine rendered: β_m, β_v, m̂, v̂ as real hats, stacked fractions; artifacts `1.0 step`, `(g_i)^{2.0}` | **not rendered** (lives inline in `run()` with `mBuf`, `beta1`, `mHat`) | Astra | Ours claims the harness is held to notational discipline but never shows it; Astra's Adam figure is genuinely close to the paper. |
| sampling | k = min{j : u < Σ_{i≤j} p_i} | imperative loop (`cumulative`, `found`, `choice`) | `short = ⟨ j | j ← p.indices, (Σ_{i←seq(0#(j+1))} (p_i).data) < r ⟩`; `|short| MIN (|p|−1)` | ours | ours is the inverse-CDF rule as a count; Astra's is a loop. Neither is rendered as the paper's min-set. |
| weight names | W_q, W_k, W_v, W_o, W_1, W_2 | `W_q`, `W_in`, `W_out` → italic W with subscript | `_Wq[h]`, `_W1` → bold **Wq**_h, **W**₁ | Astra for letters, ours for numerals | Probe `RvwNames`: `W_1 = 2.0` is a *Syntax Error* (our ledger's claim holds); `W_q = 3.0` is fine. Ours could name the letter-subscripted weights `W_q…` and keep bold only for W1/W2. |

Common residue in both: `Vec(…)` constructor wrappers on every vector-valued formula; `MAX`/`MAXNUM` rendered as a word instead of max_i; Σ subscripts are generator clauses (`m←u.indices`, `j←0#A.n`), not the paper's bare index; carriers carry no shape types.

## B. What each had to teach the language

| layer | Astra | ours |
|---|---|---|
| scalar AD | 72 lines: `trait Parents` + 3 objects, `trait Chain` + 2 objects, `Walk`, `V`, 4 constructors, 8 mixed-`RR64` overloads, `^`, `SQRT`, `exp/log/relu`; explicit reverse chain; parameters identified by a global integer index into a flat array | ~35 lines: `object Value … extends { MultiplicativeRing[Value], StandardMax[Value] }` (binary minus, juxtaposition-as-×, zero inherited; `BIG MAX` opened), `konst`, `exp/log/relu/SQRT`, `Topo` + `backward` (Karpathy's topo-sort shape); parameters by identity via `params()` |
| containers | 17 lines: eager `Vec(n, f)`/`Mat(m,n,f)` over `Array`, `opr[i]`, `opr[i,j]`; not generators | ~30 lines: `RowLike`/`Vec`/`ProbDist`/`Mat`/`KVCache` over `List`, on the library's `Rank1`/`Rank2` (mutual exclusion → both juxtaposition directions), `ZeroIndexed`/`DelegatedIndexed` (so `|x|`, `x[i]`, `u ← x`, `BIG op[u ← x]` come free), `AdditiveGroup[Vec]`, carrier `=` |
| Σ | 6 + import | 7 + import |
| operators | 10 pointwise/vector overloads + `head`, no transpose operator, one juxtaposition direction | 12: both juxtaposition directions, `^T`, `DOT`, pointwise lifts, `concat` |
| mechanisms used | traits/objects, `CommutativeMonoidReduction`, `Comprehension`, `import … except`, generators `0#n`/`sequential`, `BIG MAXNUM`, `opr DOT`, `opr[i,j]`, tuple returns | all of those (with `BigReduction` instead of `Comprehension`, `seq` instead of `sequential`, `BIG MAX` instead of `MAXNUM`) **plus** `excludes` (inherited from `Rank1`), algebraic library traits for the scalar and the vector, abstract fields in traits, functional-method vs top-level operator coexistence, postfix `^T`, list comprehensions, `||` list concatenation |
| never used | `excludes`/Meet rule, `^T`, algebraic traits for the scalar, carrier-as-generator, comprehensions | `Comprehension`, `MAXNUM`, `Array`-backed carriers, 2-index `opr[i,j]` |

## C. Correctness anchoring

| | Astra | ours |
|---|---|---|
| reference | pinned gist rev `14fb0388…`, sha256 verified; fixture from a **re-implementation** (`generate_fixture.py`), which my `upstream_harness.py` shows is bit-identical to the real upstream text under the same conventions | "v1's hardcoded Python-reference" numbers embedded in `goldenCheck()`; **no Python generator in the tree** (`grep` finds the goldens only in `.fss`/`.md`), so a reader cannot regenerate them |
| what is checked | all 228 initial params, 9 logits, 9 probs, 12 attention weights, loss, **all 228 gradients**, **all 228 Adam-updated params**, 9 generation logits/probs, 3 sampled tokens; strict TSV→JSON converter rejects missing/duplicate cells; validator invariants (simplex sums, CDF choice); Python gradients cross-checked by central differences | 15 logits, mean loss, **5 gradients** at 1e-9 (holds at 1e-15, fails at 1e-16); no numeric check of Adam or sampling |
| beyond the fixture | one alternative full program also validated; no training | 30-step training on 2,000 real names (1,264 params), samples; separate training-dynamics study (held-out loss, seeds) |
| verdict | numeric anchoring is stronger, complete, and reproducible from files on the branch | anchoring is thinner and its Python side is not archived; the training run is real evidence Astra lacks |

## D. Line accounting (one instrument, `count_lines.py`: comments, blanks, header, verification removed)

| | Python | Astra | ours |
|---|---|---|---|
| physical / nonblank-noncomment | 243 / 160 | 262 / 252 | 541 / 264 |
| core, same rules | 152 (mission figure) | **214** (driver's 1-step train + 3-token generate kept; `emit*`/`println` stripped) — or **181** with the driver removed entirely | **216** (goldenCheck 43 lines removed; our own `strip.py` reports 221 because it keeps `component`/`import`/`export`) |
| scope vs Python | — | no dataset, tokenizer, Box–Muller init, multi-step loop, 10-sample inference (~25 Python lines absent); fixture constants (`228`, `0#3`, `3.0`, `Cache(3,2)`) inside the core | full Python scope, plus timing/`println` lines in the loop |
| AD engine | 72 | ~35 |
| notation layer (containers + Σ + operators) | ~33 | ~49 |
| model blocks | ~31 (incl. `Cache`, `Block`, `Model`, `matrixAt`/`model`) | ~37 |

Read: both land at ~1.4× Python; ours covers Python's whole scope at that size, Astra covers about 85% of it. Neither beats Python, both say so.

## E. Notation-machinery choices — converge / diverge, and who is right

1. **Σ over the tape via `except { opr BIG + }` — converge.** Both discovered it independently, both cite `reductions.tex` ("no explicit relationship between BIG Op and Op"), both hit the same collision (`fails because their parameter lists have the same types`), both note `except { opr SUM }` is a syntax error. Ours additionally pins why (nullary desugaring `PreTypeCheckDesugaringVisitor.java:358-373` + `overloading.tex:99-105`) and probes a library patch; Astra's write-up is shorter and equally correct.
2. **`extends Number` rejected — converge.** Both cite `traits.tex:231-239` and `fsi:277`; ours adds that the walk path never runs `TypeHierarchyChecker` (`Shell.java:420-424`) and a 34-probe battery showing the library `Vector`/`Matrix` would otherwise carry `Value` fully; Astra's `NotationNumberBound`/`NotationBuiltinSumD` pair shows the same unenforced bound and the `cast[\Number\]` CastError.
3. **Chained subscript `rows[i][j]` and indexed power `g[i]^2` — DIVERGE; Astra is right.** Astra: "interpreter gap relative to documented postfix precedence". Our ledger row: "`m[i][j]` → `(m[i])[j]` — grammatical by design in the spec — design limit". The spec grammar `concrete-syntax.tex:937-952` has `PrimaryItem ::= … | Primary LeftEncloser [StaticArgs] [ExprList] RightEncloser | … | Primary ^ Exponent`, `precedence.tex:45-51` says subscripting/superscripting are left-associative, and the parser's own `Expression.rats:389` has `Subscripting*` with the comment "always left-associated". Both forms are spec-grammatical; both fail at runtime with `Failed to find any matching overload, args = ()` (my `RvwChainedSubscript`, `RvwIndexedPow`). **Our ledger row must be corrected to "implementation gap"** and Astra's two minimal reproducers adopted into the worklist.
4. **Transpose — diverge; ours is right.** `opr (m: Mat)^T` per `basic/operators/intro.tex`; Astra's `transpose(W)` is a word and Astra records the departure without finding the operator.
5. **Both juxtaposition directions — diverge; ours is right.** `Rank1 excludes Rank2` inherited by carriers makes `(Mat,Vec)` and `(RowLike,Mat)` legal together under the Meet Rule; Astra never asks the question and writes the value blend as an explicit Σ, calling `x x` "visually ambiguous" (true for Vec×Vec, irrelevant to Vec×Mat).
6. **Inline Σ denominator — diverge; Astra's spelling is better.** Both must parenthesize (a reduction is a `FlowExpr`, `concrete-syntax.tex:971-974` — ours cites it correctly). But Astra's *tight* `e/(SUM[…] e[i])` renders as a stacked fraction with Σ below the bar; ours judged the inline form by its *loose* rendering and bound `Z`. Same for rmsnorm.
7. **max — diverge; ours is better.** `Value extends StandardMax[Value]` makes `BIG MAX[u ← a] u` a real reduction over the tape; Astra's `maximum` detaches to `.primal` and uses `BIG MAXNUM`, leaking the AD representation into the formula. (Both render as a word; `BIG MAX` exists on RR64 too — probe `RvwBigMax`.)
8. **Identity element of Σ — Astra's is cleaner, ours more general.** `constant(0.0)` vs numeric `0` + overloads. Neither is wrong.
9. **Constants — split.** Astra's 8 mixed overloads let the model write `x − maximum(x)`, `+ 0.00001` directly; ours needs `konst` and a few overloads, but names `epsilon` so it renders ε. Neither used `10.0^(-5)` (probe `RvwNumerals`: it runs).
10. **Parameter identity — ours matches Python.** Astra's global row-major index couples the AD to a flat array and forces `matrixAt`/`model(p)`; ours reads leaves by identity (`params()` comprehension).
11. **Verification plumbing in the core — Astra's fault.** `attention` returns `(weights, output)` and `transformer` writes `C.weights[t H + h]` only so the driver can print attention weights.

## F. Pedagogy of the two articles

| | Astra "Building the notation while building a tiny GPT" | ours "A GPT You Can Read" |
|---|---|---|
| structure | 10 sections; each = prose → [Fortify render | ASCII source] → [Python comparison] → prose; departures table; reproduction guide; full source collapsed | narrative essay; pact → engine → notation (with the Σ retraction story) → blocks as [literature line / Fortress render] pairs → named spaces → line-count invoice → training dynamics → randomness lineage → ledger → ladder (3 rungs) → verdict |
| teaches the transformer | thin: attention in four sentences, no intuition, no "why" for residuals/normalization | well: attention as soft lookup (query/key/value in words), residual stream, why normalize, why subtract the max, what the loss means, what training looks like on held-out data |
| teaches the notation construction | well and concretely (scalar → containers → Σ → linear algebra); every departure classified | well and with more depth (extension by addition vs replacement, the sealed-Number/carrier story, abstract fields, Meet Rule, `^T` found in the spec, aliases unimplemented) |
| shows what was typed | yes: ASCII beside every render, so `DOT`→`·`, `SUM`→Σ, `W_q`→W_q are visible | no: only renders; a reader cannot tell that `·` is typed `DOT`, Σ is typed `SUM`, `^T` is typed `^T` — the "where does it lean on the language" question is answered only in prose |
| Python adjacency | yes (hand-written teaching excerpts, labelled) | no |
| the paper's line | LaTeX caption at the same size as the code | small italic HTML text above a large LaTeX render — a typographic asymmetry that flatters the Fortress side in the by-eye judgement |
| honesty / provenance | verbatim slices with source hashes; departures table; no self-praise | retractions recorded (⊞, "Σ sealed"), ledger with classifications, but the closing ("it took a language built sixteen years too early to make it") and "flagship pair" register drift toward self-congratulation, which the project's own protocol forbids |
| code dumps | none (full source collapsed) | none; two large sheets (engine, notation) are exhibits with captions |
| mobile | responsive grid collapses to one column | single column, 45rem max, dark-aware |

## G. What each should adopt from the other

**Ours ← Astra**
1. Full-fixture verification: all 228 gradients, one Adam step, injected-uniform sampling, a strict converter + validator, finite-difference check — and put the Python generator in the tree (ours has none).
2. ASCII source beside each render, and a Python line where it helps.
3. Typeset the literature line at parity (MathML/LaTeX, same size), or the eye test is rigged.
4. Tight `/` in `rmsnorm` and softmax's denominator; re-test the inline Σ with the tight spelling before keeping `Z`.
5. Render Adam and sampling pairs — the harness "held to notational discipline" is currently invisible.
6. Correct the ledger row on chained subscripting to *implementation gap*, with Astra's two reproducers.
7. Letter-subscript weight names (`W_q`, `W_k`, `W_v`, `W_o`) where the paper uses letters; bold only where numerals force it.
8. Figure provenance hashes (`source-hashes.json`) and a departures table with reproducer links per row.
9. Consider Astra's `empty() = constant(0.0)` V-only reduction if the numeric Σ in `sample` can be spelled another way — it removes the two identity overloads and the empty-Σ hole.

**Astra ← ours**
1. `opr (m: Mat)^T` — spec-sanctioned; makes `q K^T` writable.
2. `Rank1 excludes Rank2` carriers → both juxtaposition directions → `softmax(q K^T/√d_k) V` verbatim.
3. Scalar joins `MultiplicativeRing`/`StandardMax`: inherited minus/juxtaposition, `BIG MAX` over the tape with no `.primal` leak; shrinks the 72-line engine.
4. Carriers as generators (`ZeroIndexed`/`DelegatedIndexed`): Σ over `u ← x`, `|x|`, `BIG MAX[u ← a]` for free.
5. Comprehension-built vectors and a one-line `concat`, instead of `fn (i,j) ⇒` lambdas and `DIV`/`MOD` index arithmetic.
6. Render the whole `transformer`; keep verification plumbing (`C.weights`, tuple-returning `attention`) and fixture constants (`3`, `3.0`, `228`) out of the core.
7. Parameter identity by object, not global index (`params()` comprehension).
8. A named `epsilon` (renders ε); `10.0^(-5)` also runs.
9. Teach the transformer, not only the notation; run a real training and show samples.
10. Execute the pinned upstream text in the validation chain (my harness), not only a re-implementation.

## H. Verdict

Astra's is the better-verified artefact and the more disciplined presentation of *what was typed*; ours is the better notation (attention, loss, embedding, concat, forward, max) and the better teacher of both the transformer and the language's algebraic machinery. On the mission's fitness function — rendered distance from the paper — ours wins most pairs and loses two (rmsnorm/softmax layout via tight fractions; Adam by default, since ours never renders it). On correctness anchoring Astra wins outright. On process record both are strong; Astra's is more mechanical (83 timestamped runs), ours more narrative (retractions, blinded workers). One factual correction lands on our side (chained subscripting is an implementation gap, not a design limit); none of Astra's spec citations were wrong, but two of its "remaining departures" (transpose as a word, no `p M` direction) are not departures at all — the spec provides both and our program uses them.
