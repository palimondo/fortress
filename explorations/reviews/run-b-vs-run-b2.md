# Phase 2 — Run B vs Run B2

Two runs ported Karpathy's microGPT to Fortress under one brief (`git show origin/claude/worker-brief-fable-vnnuv8:experiment/RUN_B_BRIEF.md`): Run B in `explorations/run-b/`, Run B2 in `explorations/run-b2/`. Their Phase 1 reviews, `explorations/reviews/run-b-phase1.md` and `run-b2-phase1.md`, are on record and are reused here rather than redone; nothing in section B was re-executed.

The conditions were not equal, and the comparison does not excuse the difference. Run B ran in a cleared session that began from the brief and the tree and read its way in: its first six minutes are a single wide read of the ledger, the four prior reviews, the retrospective, three prior programs and the blinded run's tooling (`explorations/process-records/07-run-b.md`, timeline step 1). Run B2 ran in the session that had already produced the tree's earlier ports and reviews, and opened on a compaction summary of that work (`explorations/process-records/08-run-b2.md`, timeline step 1). One consequence is visible in the artifacts: Run B declares a departure because `Specification/fortress/fortress.toc` "is not in the tree" and derives its outline from the `\chapter`/`\section` commands instead (`explorations/run-b/mechanisms.md`, header), while Run B2 reads the `.toc` directly (`08-run-b2.md:23`). The file is real but untracked — `.gitignore:45` ignores `*.toc`, and the copy in this container is dated 2026-08-23, a build byproduct of the session that had built the specification. The prepared session had a file the cleared session could not have had. Where a difference below plausibly follows from the conditions, it is named; it is never used to discount a result.

The shape and the standard are those of `explorations/reviews/blinded-fable-vs-astra.md`: section A is the rendered-pair judgement, section I the adopt lists.

## A. Rendered pairs, side by side

Method. For each named block I opened both runs' shipped figures with the Read tool, set them beside the paper's formula and the pinned Python, and judged the rendered result. Run B ships `.svg` only (`explorations/run-b/.gitignore` excludes `**/*.png`), so its figures were rasterised here with `rsvg-convert -z 2`; Run B2 ships `.png` beside every `.svg`, and the `.png` files are chromium screenshots of the SVG with the page's whitespace attached, so its figures were rasterised the same way for parity. Both runs' figures are provenance-checked in their Phase 1 reviews: all 19 of Run B's `v2_*.tic` sheets are byte-identical to a fresh extraction from `src/MicroGPT.fss` (`run-b-phase1.md:26`), and all 23 of Run B2's `def_*.tic` bodies occur verbatim in its program text (`run-b2-phase1.md`, §3, opening).

Notation used below: a rendered form is quoted as Fortify sets it, so `**Wq**_h` means the bold name **Wq** with a subscript *h*, and the ASCII actually typed for it is `_Wq[h]`; where the source spelling is the point, it is given as source and named as such.

One fairness caveat applies to both sides and cancels. Each run typeset the formulas itself, and each shaped at least one formula to its own program: Run B2's `f_embed` writes **W**_p[*positions*], the program's own variable name, as the subscript, and its `f_chain`, `f_gather_b` and `f_concat_b` state this program's rules rather than a paper's (`run-b2-phase1.md`, §3, closing observations); Run B's `math_multihead` states the head split as `head_h = Attention(Q_{:,c_h}, K_{:,c_h}, V_{:,c_h})` with `c_h = {h d_h, …, (h+1)d_h − 1}`, which is Run B's own slicing form and not Vaswani's per-head projection. On the head pair specifically the asymmetry does not cancel, and it is noted there.

### Embedding

<!--figs
title: Embedding
formula: the papers' line, as Run B sets it :: explorations/run-b/figures/math_embed.svg
formula: as Run B2 sets it :: explorations/run-b2/figures/formulas/f_embed.svg
col: Run B — `v2_model` :: explorations/run-b/figures/v2_model.svg
col: Run B2 — `def_embed` :: explorations/run-b2/figures/def_embed.svg
-->

Run B renders the embedding inside `Model.forward` (`explorations/run-b/src/MicroGPT.fss:243-247`): `var X: Mat := rmsnorm(E_tokens + P[0 # |tokens|])`, then a `seq` loop over the layers, then `X W_lm^T`. Run B2 renders it as a three-line `embed` (`explorations/run-b2/src/MicroGPT.fss:139-142`): a `positions` list, then `rmsnorm(**We**_tokens + **Wp**_positions)`.

**Run B2**, narrowly: both weights set as bold names with true subscripts, where Run B's position lookup sets as the bracketed index expression `P[0 # |tokens|]` and the line sits under a `var … :=` inside a loop. The gain is partly bought by naming a variable in the formula sheet, and the `positions` list is not forced — section E.

### RMSNorm

<!--figs
title: RMSNorm
formula: Run B's formula sheet :: explorations/run-b/figures/math_rmsnorm.svg
formula: Run B2's formula sheet :: explorations/run-b2/figures/formulas/f_rmsnorm.svg
col: Run B — `v2_rmsnorm` :: explorations/run-b/figures/v2_rmsnorm.svg
col: Run B2 — `def_rmsnorm` :: explorations/run-b2/figures/def_rmsnorm.svg
-->

Run B is two lines (`explorations/run-b/src/MicroGPT.fss:201-202`): `rmsnorm(x: Vec): Vec = x/(SQRT((x DOT x)/(|x|) + epsilon))`, which sets as the paper's fraction under a radical, and a row lift `stack(⟨rmsnorm(x) | x ← X⟩)`. Run B2 is ten lines (`explorations/run-b2/src/MicroGPT.fss:89-97`): `(n, m)`, `x = X.data`, an `r` comprehension holding the radical, a `mat(n, m, fn (i, j) ⇒ x[i,j]/r_i)`, and a pullback that runs to the width of the page.

**Run B, decisively**: one line that is the formula, against ten in which the formula's fraction never appears as a fraction. Run B2's article concedes the point for the forward pass and shows the blinded run's vector-level render beside its own (`explorations/run-b2/article.md:53-58`); what it gains is a backward rule typeset beside its formula, which Run B renders on a separate sheet with no formula beside it.

### Softmax

<!--figs
title: Softmax
formula: Run B's formula sheet :: explorations/run-b/figures/math_softmax.svg
formula: Run B2's formula sheet :: explorations/run-b2/figures/formulas/f_softmax.svg
col: Run B — `v2_softmax` :: explorations/run-b/figures/v2_softmax.svg
col: Run B2 — `def_softmax` :: explorations/run-b2/figures/def_softmax.svg
-->

Run B (`explorations/run-b/src/MicroGPT.fss:206-210`): `e = exp(z − (BIG MAX[z_i ← z] z_i))`, then `e/(SUM e)`, which sets as a stacked fraction with a bare Σ under the bar, then the row lift. Run B2 (`explorations/run-b2/src/MicroGPT.fss:99-107`): `mx`, `z` and `P` as three separate comprehensions over indices, so the denominator is bound to a name and the fraction never sets.

**Run B, decisively**, for the same reason as RMSNorm, and one more: Run B's max is a big operator over the carrier's own elements, with no `.data` or `.primal` in the line, where Run B2's `BIG MAX[j ← 0#m] s[i,j]` ranges over an index and reaches into `s = S.data`.

### Attention

<!--figs
title: Attention
formula: Run B's formula sheet, with the mask :: explorations/run-b/figures/math_attention.svg
formula: Run B2's formula sheet :: explorations/run-b2/figures/formulas/f_attention.svg
col: Run B — `v2_attention` :: explorations/run-b/figures/v2_attention.svg
col: Run B2 — `def_attention` :: explorations/run-b2/figures/def_attention.svg
-->
<!--figs
title: The causal mask
formula: Run B2's formula sheet :: explorations/run-b2/figures/formulas/f_causal.svg
col: Run B2 — `def_causal` :: explorations/run-b2/figures/def_causal.svg
note: Run B ships no separate mask figure: its `mask(n)` is the first line of the attention figure above, and it sets no formula for the cases brace.
-->

Run B (`explorations/run-b/src/MicroGPT.fss:215-220`) needs three lines: a `mask(n)` built from `array[\RR64\](n,n).fill(…)`, then `attend` opening a `do` block to bind `d_k = cols(Q)` before `softmax((Q K^T)/(SQRT d_k) + mask(|Q|)) V`. Run B2 (`explorations/run-b2/src/MicroGPT.fss:143`) needs one: `attention(Q,K,V): Node = softmax((Q K^T)/(SQRT d_k) + causal(Q.rows)) V`, with `d_k` a field of the model object (`:137`).

**Run B2**: the same expression, but as a single definition with no `do` block and no local binding, and `causal(Q.rows)` names the mask where Run B applies `mask` to a length. Run B2 also renders the mask separately, `mat(T, T, fn (i,j) ⇒ if j ≤ i then 0.0 else −infinity end)`, in the cases-brace order the formula uses; Run B's is the reverse order inside an `array…fill`.

### One head

<!--figs
title: One head
formula: Run B's formula sheet — its own slicing form :: explorations/run-b/figures/math_multihead.svg
formula: Run B2's formula sheet — Vaswani's line :: explorations/run-b2/figures/formulas/f_head.svg
col: Run B — `v2_layer`, the whole layer :: explorations/run-b/figures/v2_layer.svg
col: Run B2 — `def_head` :: explorations/run-b2/figures/def_head.svg
-->

Run B has no standalone head figure; the line is inside `v2_layer` (`explorations/run-b/src/MicroGPT.fss:228`): `head(h: ZZ32): Mat = do c = (h d_h) # d_h; attend(Q[:, c], K[:, c], V[:, c]) end`, with `(Q,K,V) = (X W_q^T, X W_k^T, X W_v^T)` and `d_h` bound on the two lines above. Run B2 (`explorations/run-b2/src/MicroGPT.fss:144`): `head(X: Node, h: ZZ32): Node = attention(X **Wq**_h, X **Wk**_h, X **Wv**_h)`.

**Run B2, decisively**: that is Vaswani's head_h = Attention(XW^Q_h, XW^K_h, XW^V_h) with the superscript folded into the bold name, in one line and with no slice. It is also the pair where the formula asymmetry bites: Run B2 is compared against the literature's line, Run B against a restatement of its own slicing form.

### Multi-head with concatenation

<!--figs
title: Multi-head assembly
formula: Run B2's formula sheet :: explorations/run-b2/figures/formulas/f_mha.svg
col: Run B2 — `def_mha` :: explorations/run-b2/figures/def_mha.svg
note: Run B ships no separate assembly figure: `concat(<|head(h) | h <- 0#n_head|>) W_o^T` is the fifth line of the layer figure above.
-->
<!--figs
title: The concatenation and its pullback
formula: Run B2's formula sheet :: explorations/run-b2/figures/formulas/f_concat_b.svg
col: Run B2 — `def_concat` :: explorations/run-b2/figures/def_concat.svg
note: Run B ships no separate `concat` figure and no formula beside it: its definition is the last block of the matrix operator sheet, the backward-rules figure below.
-->

The assembly line: Run B writes `concat(⟨head(h) | h ← 0#n_head⟩) W_o^T` (`explorations/run-b/src/MicroGPT.fss:229`), Run B2 `concat(⟨[\Node\] head(X, h) | h ← 0#nh⟩) **Wo**` (`explorations/run-b2/src/MicroGPT.fss:145`). The `concat` definition itself: Run B's is four lines of `Mat(array…fill…, children, fn G ⇒ for …)` inside the operator sheet (`:155-159`), Run B2's a five-line `do` whose pullback is Σ over the heads (`:109-114`).

**Tie**: Run B's comprehension is cleaner (no `[\Node\]` static argument, a one-argument `head`), Run B2's projection is cleaner (bold **Wo**, no transpose, as `Concat(…)W^O` is written), and neither difference dominates. Run B2 alone renders the concatenation's pullback beside a formula, ∇ = Σ_h H̄_h; Run B's `concat` backward is index arithmetic with no formula beside it, which its own Phase 1 review records (`run-b-phase1.md:44`).

### Feed-forward

<!--figs
title: Feed-forward
formula: Run B's formula sheet :: explorations/run-b/figures/math_block.svg
formula: Run B2's formula sheet :: explorations/run-b2/figures/formulas/f_ffn.svg
col: Run B2 — `def_ffn` :: explorations/run-b2/figures/def_ffn.svg
note: Run B ships no separate feed-forward figure: `mlp(X: Mat): Mat = relu(X W_in^T) W_out^T` is one line of the layer figure above.
-->

Run B: `mlp(X: Mat): Mat = relu(X W_in^T) W_out^T` (`explorations/run-b/src/MicroGPT.fss:231`). Run B2: `ffn(X: Node): Node = relu(X **W**₁) **W**₂` (`explorations/run-b2/src/MicroGPT.fss:146`).

**Run B2**, narrowly: FFN(X) = max(0, XW₁)W₂ carries no transposes and numeric subscripts, and Run B2's line matches it exactly; Run B's two `^T` are the price of keeping the reference's (out × in) storage, and `W_in`/`W_out` are Karpathy's names rather than the paper's. Both are one line.

### Residual block

<!--figs
title: Residual block
formula: Run B2's formula sheet :: explorations/run-b2/figures/formulas/f_block.svg
col: Run B2 — `def_block` :: explorations/run-b2/figures/def_block.svg
note: Run B ships no separate block figure: `forward` is the last definition of the layer figure above, and its formula is the block sheet shown with the feed-forward pair.
-->

Run B (`explorations/run-b/src/MicroGPT.fss:232-235`) and Run B2 (`explorations/run-b2/src/MicroGPT.fss:147-150`) write the same two lines, `X' = X + …(rmsnorm X)` and `X' + …(rmsnorm X')`, with X″ unnamed on both sides because it is the block's last expression.

**Tie**: Run B2 drops the parentheses on `rmsnorm X` and names the parts `mha` and `ffn` as the papers do, Run B names them `attention` and `mlp` as the reference does; the difference is a naming preference, not a distance from the formula.

### Logits and loss

<!--figs
title: Logits
formula: Run B's formula sheet :: explorations/run-b/figures/math_logits.svg
formula: Run B2's formula sheet :: explorations/run-b2/figures/formulas/f_logits.svg
col: Run B2 — `def_logits` :: explorations/run-b2/figures/def_logits.svg
note: Run B ships no separate logits figure: `X W_lm^T` is the last line of `forward` in the embedding figure above.
-->
<!--figs
title: The loss
formula: Run B's formula sheet :: explorations/run-b/figures/math_loss.svg
formula: Run B2's formula sheet, the loss and its pullback :: explorations/run-b2/figures/formulas/f_nll_b.svg
col: Run B — `v2_loss` :: explorations/run-b/figures/v2_loss.svg
col: Run B2 — `def_nll` :: explorations/run-b2/figures/def_nll.svg
-->

Run B2's logits is one line, `logits(tokens) = block(embed tokens) **Wlm**` (`explorations/run-b2/src/MicroGPT.fss:151`); Run B's is `X W_lm^T` as the last line of a `forward` whose `var X` a `for` loop rebinds. Run B's loss is one expression, `−(1/n) (SUM[t ← 0#n] log P[t, y_t])` (`explorations/run-b/src/MicroGPT.fss:258`), with the leading 1/n set as a stacked fraction and `y_t` set as a subscript; Run B2's is `L = −(SUM[t ← 0#T] log(P.data[t, ys_t])) / T` (`explorations/run-b2/src/MicroGPT.fss:119`), the fraction trailing and `.data` inside the logarithm.

**Tie**: each run has one half exactly and the other half short, and Run B2 adds a rendered pullback P̄ that Run B does not have.

### Backward rules

<!--figs
title: The backward rules
formula: Run B's formula sheet, the whole table :: explorations/run-b/figures/math_matmul.svg
formula: Run B2's formula sheet :: explorations/run-b2/figures/formulas/f_matmul_b.svg
col: Run B — `v2_matrices` :: explorations/run-b/figures/v2_matrices.svg
col: Run B2 — `def_rules` :: explorations/run-b2/figures/def_rules.svg
-->
<!--figs
title: The vector rules
formula: Run B's formula sheet :: explorations/run-b/figures/math_vecrules.svg
col: Run B — `v2_vectors` :: explorations/run-b/figures/v2_vectors.svg
note: Run B2 has one carrier and no vector or scalar rules, so this sheet has no counterpart in its article.
-->

Run B's matrix sheet carries every rule of its own formula table — matmul, transpose, add, ⊙, scale, relu — with the products written bare: `fn G ⇒ do A.grad += G B^T; B.grad += A^T G end` (`explorations/run-b/src/MicroGPT.fss:141`) beside Ā = ȲB^⊤, B̄ = A^⊤Ȳ. Run B2's five-line sheet writes the same rule as one composed pullback, `A.pull(C̄ (B.data)^T) + B.pull((A.data)^T C̄)` (`explorations/run-b2/src/MicroGPT.fss:79`).

**Run B**: `G B^T` and `A^T G` are the formula's right-hand sides with nothing between the symbols, and the sheet states two equations where the table states two; Run B2 bars its cotangents correctly but threads `.data` through every product and `.pull` around every term, and its sheet drops relu and ⊙ to other figures. Against Run B: the whole sheet sits inside `mat(A.v B.v, …, A, B)`, the adjoint is `.grad` rather than a bar, and the `stack`/`concat` half of the sheet has no formula beside it at all.

### The autodiff engine and its carriers

<!--figs
title: The engine and its carriers
formula: Run B's chain rule :: explorations/run-b/figures/math_chain.svg
formula: Run B2's chain rule :: explorations/run-b2/figures/formulas/f_chain.svg
col: Run B — `v2_carriers` :: explorations/run-b/figures/v2_carriers.svg
col: Run B2 — `def_node` :: explorations/run-b2/figures/def_node.svg
-->
<!--figs
title: Topological sort and backward
col: Run B — `v2_backward` :: explorations/run-b/figures/v2_backward.svg
note: Run B2's engine has no topological sort and no identity counter, so this sheet has no counterpart: the chain rule composes by `+` on gradient environments.
-->

Run B's carrier sheet is three near-identical objects — `Num`, `Vec`, `Mat` — each with `children`, a `backprop` closure, `var adj: Maybe[\·\]`, a getter returning a fresh zero, a setter, `push()` and an `id: ZZ32 = nextId()` off a global counter, followed on a second sheet by `topo` and `backward` (`explorations/run-b/src/MicroGPT.fss:21-74, 176-191`). Run B2's is one: `value object Node(data: Mat, pullback: Mat → Params)` with two getters, `pull`, and a gather subscript whose pullback is a filtered Σ (`explorations/run-b2/src/MicroGPT.fss:64-74`).

**Run B2, decisively**: its engine renders as the sentence its article states — a node is its value and its pullback — with no mutable slot, no identity counter and no topological sort; Run B's carrier sheet is the most machine-like page in either article, and its `Maybe`-backed adjoint, ingenious as a mechanism, is three copies of the same twelve lines. Run B pays nothing for this at run time and Run B2 pays a great deal (section C's cost note), but the pair is judged as rendered.

### Σ machinery

<!--figs
title: Sigma machinery
formula: Run B's formula sheet :: explorations/run-b/figures/math_sum.svg
col: Run B — `v2_sum` :: explorations/run-b/figures/v2_sum.svg
col: Run B2 — `def_sum` :: explorations/run-b2/figures/def_sum.svg
note: Run B2 sets no formula for the reduction object; the bodies are the same text.
-->

Both declare `object PlusReduction extends CommutativeMonoidReduction[\Any\]` with `empty(): Any = 0` and `join(a,b) = a + b`, and one nullary `opr SUM()` returning `BigReduction[\Any,Any\](PlusReduction)` (`explorations/run-b/src/MicroGPT.fss:166-171`, `explorations/run-b2/src/MicroGPT.fss:15-19`).

**Tie**: the bodies are the same text. Run B carries a spare `asString` getter and a four-line comment on the sheet; Run B2 carries a spare `[\T\]` static parameter on the operator. Run B additionally declares a prefix `opr SUM(x: Vec): Num` as a graph operation (`:136`), which is what makes its softmax denominator set as `Σ e`.

### Adam

<!--figs
title: Adam
formula: Run B's formula sheet :: explorations/run-b/figures/math_adam.svg
formula: Run B2's formula sheet :: explorations/run-b2/figures/formulas/f_adam.svg
col: Run B — `v2_adam` :: explorations/run-b/figures/v2_adam.svg
col: Run B2 — `def_adam` :: explorations/run-b2/figures/def_adam.svg
-->

Run B (`explorations/run-b/src/MicroGPT.fss:295-305`) writes `m_hat = m'/(1 - beta1^t)`, `v_hat = v'/(1 - beta2^t)` and `theta - eta m_hat/(SQRT v_hat + epsilon)`, all three tight, so all three set as stacked fractions and the last carries the radical. Run B2 (`explorations/run-b2/src/MicroGPT.fss:159-165`) writes `m1 / (1 - beta1^t)` and `theta - lr (m_hat / (SQRT v_hat + epsilon_adam))`, all loose, so all three set inline inside nested parentheses.

**Run B, decisively**: it is Algorithm 1 as the paper sets it, with η for the rate; Run B2's own article calls its version "identical line by line" (`explorations/run-b2/article.md:205`) when it is not, and its Phase 1 review shows the three-character tight respelling sets them stacked and still passes every check byte-identically (`run-b2-phase1.md`, §3, `run-b2-review-probes/tightadam/`).

### Sampling

<!--figs
title: Sampling
formula: Run B's formula sheet :: explorations/run-b/figures/math_sample.svg
formula: Run B2's formula sheet :: explorations/run-b2/figures/formulas/f_sample.svg
col: Run B — `v2_sample` :: explorations/run-b/figures/v2_sample.svg
col: Run B2 — `def_sample` :: explorations/run-b2/figures/def_sample.svg
-->

Run B (`explorations/run-b/src/MicroGPT.fss:335-339`): `total` and `cumulative(j)` as two Σs, then `(|⟨j | j ← p.indices, cumulative(j) ≤ u total⟩|) MIN (|p| − 1)`. Run B2 (`explorations/run-b2/src/MicroGPT.fss:178-187`): two `var` slots and a `while` with `acc += p_k`.

**Run B, decisively**: min of the size of a filtered set is the formula min{k : Σ_{i≤k} p_i > u Σ_i p_i} as an expression, with both Σs typeset; Run B2's loop is honest code and is not the formula, which its own by-eye table silently omits — there is no sampling row in it (`explorations/run-b2/article.md:194-207`).

### Tokenizer

<!--figs
title: Tokenizer
formula: Run B2's formula sheet :: explorations/run-b2/figures/formulas/f_tokens.svg
col: Run B — `v2_tokenizer` :: explorations/run-b/figures/v2_tokenizer.svg
col: Run B2 — `def_tokenize` :: explorations/run-b2/figures/def_tokenize.svg
note: Run B sets no formula for the tokenizer.
-->

Run B has no formula figure for the tokenizer; Run B2 sets tokens = [BOS, c₁, …, cₙ, BOS]. Run B: `⟨[\ZZ32\] bos⟩ ‖ ⟨(if i ← uchars.indexOf(ch) then i else 0 end) | ch ← doc⟩ ‖ ⟨[\ZZ32\] bos⟩` (`explorations/run-b/src/MicroGPT.fss:345-346`). Run B2: `⟨[\ZZ32\] bos⟩ ‖ ⟨[\ZZ32\] uchars.indexOf(c).get | c ← doc⟩ ‖ ⟨[\ZZ32\] bos⟩` (`explorations/run-b2/src/MicroGPT.fss:168-169`).

**Run B2**, narrowly: three concatenated lists on both sides, but the middle element is `uchars.indexOf(c).get`, which reads as index(*uchars*, doc_i), against a seven-token `if … then … else … end`; Run B2 pays a third `[\ZZ32\]` static argument for it.

### The tally

| pair | Run B | Run B2 | winner |
|---|---|---|---|
| embedding | `rmsnorm(E_tokens + P[0 # \|tokens\|])` under a `var X :=` | `rmsnorm(**We**_tokens + **Wp**_positions)` | **Run B2** |
| RMSNorm | `x/(SQRT((x DOT x)/(\|x\|) + epsilon))`, 2 lines | entry by entry, 10 lines | **Run B**, decisively |
| softmax | `e/(SUM e)`, 4 lines | entry by entry, 9 lines | **Run B**, decisively |
| attention | 3 lines with a `do`-bound `d_k` | 1 line, `d_k` a field | **Run B2** |
| one head | `attend(Q[:, c], …)` with `c` on the same line | `attention(X **Wq**_h, …)` | **Run B2**, decisively |
| multi-head, concatenation | cleaner comprehension, `W_o^T` | cleaner projection, rendered pullback | tie |
| feed-forward | `relu(X W_in^T) W_out^T` | `relu(X **W**₁) **W**₂` | **Run B2** |
| residual block | same two lines, reference's names | same two lines, papers' names | tie |
| logits and loss | loss exact, logits in a loop | logits exact, loss with `.data` and a trailing `/T` | tie |
| backward rules | `A.grad += G B^T; B.grad += A^T G`, whole table | `A.pull(C̄ (B.data)^T) + …`, four rules | **Run B** |
| autodiff engine | three carriers, `Maybe` adjoint, ids, `topo` | `value object Node(data, pullback)` | **Run B2**, decisively |
| Σ machinery | identical object, spare `asString` | identical object, spare `[\T\]` | tie |
| Adam | three stacked fractions, η | three inline fractions, `lr` | **Run B**, decisively |
| sampling | min of a filtered count, two Σs | `while` over two `var` slots | **Run B**, decisively |
| tokenizer | `if i ← indexOf(ch) then i else 0 end` | `uchars.indexOf(c).get` | **Run B2** |

**Run B 5, Run B2 6, ties 4.** Run B's five are the four places where a tight `/` or a set-builder makes a formula out of an expression, plus the backward table; Run B2's six are the places where a definition is one line because the model object holds `d_k`, the head weights and the block, and its engine is one value object.

### Two defects found here

Run B2's `figures/def_mat.tic` is not the `Mat` carrier: its awk range never closes, so the file runs from `value object Mat` to the last `end` of the program, 189 lines. The built page embeds it — the largest inlined SVG in `explorations/run-b2/article.html` is 604 KB against 201 KB for the next — so the article's "The carriers" section shows the whole program under a sentence about naming the array type once. Neither Phase 1 review caught this; `run-b2-phase1.md` §3 records four stale `.tic` leftovers that are *not* embedded, which is a different fault.

Run B's `explorations/run-b/mechanisms.md:19` still records `===` on a value object as comparing fields — the reading its own delegated worker falsified and which `gaps.md` row 105 and `article.md` §7.4 both correct. The correction reached the article and the gap table and not the gate-2 document, so one of Run B's four deliverables carries a claim the run itself retired.

### Form differences, judged separately from the renders

Both runs took the papers' whole-sequence matrix form over the reference's per-token computation with a key/value history, and both say so (`explorations/run-b/article.md:27`, `explorations/run-b2/article.md:32`); on that axis they do not differ. Four real differences of form sit under the pair judgements above and are not the same thing as rendered distance.

Head split. Run B computes Q, K, V for all positions at once and slices their columns per head, which is the reference's own `q[hs:hs+head_dim]` at the matrix level and needs a `Q[:, c]` subscript operator; Run B2 gives each head its own projection matrices, `_Wq[h]`, which is the papers' form and needs a list of parameter nodes. Run B's departures table rules the per-head form out on the ground that `W_q[h]` typesets as a double subscript (`explorations/run-b/article.md:285`, departure 7) — true of that spelling, and Run B2's `_Wq[h]` shows the bold-name spelling renders (section E).

Carriers and ranks. Run B has three carriers, `Num`, `Vec` and `Mat`, so a vector function like `rmsnorm` is a differentiable node and a matrix generates its rows as nodes; Run B2 has one, `Mat`, so every row-wise operation is written entry by entry with an index function. This is the single decision behind Run B's wins at RMSNorm and softmax and behind Run B2's win at the engine.

Convention. Run B keeps the reference's (out × in) storage and writes the transposes in the model, `X W_q^T`; Run B2 transposes at the fixture boundary in its checker (`explorations/run-b2/src/MicroGPTCheck.fss:13-41`) and writes `X **Wq**_h`. Run B2's choice removes seven `^T` from the rendered model and moves the convention into the harness where a reader can see it; Run B's keeps the core untouched by the fixture's layout.

Generality. Run B's model takes `layers: List[\Layer\]` and an `n_layer`, so the reference's single layer is a case of it; Run B2's `Transformer` has one `block` and no layer list.

## B. Correctness anchoring

Both runs pass their checks, and both Phase 1 reviews reproduced them from the shipped recipes without re-deriving the goldens.

| | Run B | Run B2 |
|---|---|---|
| reference | pinned `microgpt.py`, sha256 `d47d88c2…ccee`, verified against the surviving copy `explorations/astra/worker/reference/microgpt.upstream.py` (`run-b-phase1.md:17`) | same sha256, printed by the checker itself as its first line (`run-b2-phase1.md`, §2) |
| goldens | derived by executing the pinned text (`reference/derive.py`, uncommitted as the brief requires); cross-checked against the blinded run's independent derivation — 22,585 keys, identical key set, 21,522 float scalars, max diff 0.0 (`run-b-phase1.md:18`) | derived by executing the pinned text (`tools/derive_goldens.py`); agrees field for field with the blinded run's (`run-b2-phase1.md`, §2) |
| configuration | the reference's own: 1 layer, d 16, block 16, 4 heads, vocab 27, 4,192 parameters, real documents | the same |
| what is compared | every logit at every position, every probability, per-position losses, the loss, all nine gradients, the learning rate, all Adam-updated parameters, three samples with the reference's uniform draws replayed; 54 `PASS` lines, ≈18,000 scalars (`checks/check_run_output.txt`) | the same coverage; 47 `PASS` lines (`checks/check_run.txt`) |
| steps | 2 | 2, plus one third-step loss checked once (`article.md:20`) |
| tolerance | 1e-12 absolute, justified in writing against the observed maxima and the smallest quantity compared (`run-b-phase1.md:20`) | 1e-9 declared; the justification names a parallel-order effect four threads do not produce, which the Phase 1 review measured (`run-b2-phase1.md`, §1) |
| observed maxima | 3.3e-16 logits, 4.4e-16 losses, 2.1e-17 gradients, 1.9e-16 parameters after Adam | 2.2e-16 logits, 4.4e-16 per-position losses, 8.9e-16 loss, ≤1.1e-16 gradients, 1.4e-16 parameters after Adam |
| threads | 54/54 identical at 1 and at 4 threads, 73.8 s and 53.9 s (`run-b-phase1.md:9`) | every PASS line and every diff byte-identical at 1 and at 4 threads, 47.8 s and 32.6 s (`run-b2-phase1.md`, §1) |
| finite differences on the shipped program | yes — the `(* TESTS *)` region, max \|analytic − finite difference\| 3.8e-10 over three parameter entries (`run-b-phase1.md:11`) | no — finite differences were run on the three skeletons only, so a shared convention error between program and reference would not be caught (`run-b2-phase1.md`, §2) |
| bounded demo | 12 steps, all twelve loss lines byte-identical to the shipped log (`run-b-phase1.md:10`) | 12 steps, losses reproduce to the last digit (`run-b2-phase1.md`, §1) |
| fixture constants in the core | none; goldens in `MicroGPTData`, comparisons in `check_main.part` (`run-b-phase1.md:107`) | none; the convention bridge lives in the checker, `grep` for `ref_` in the core returns nothing (`run-b2-phase1.md`, §2) |

Run B's anchoring is stronger by one item that matters: a finite-difference check of the engine that ships, not only of the skeletons. Run B2's is stronger by one that does not affect the verdict: its checker prints the reference's hash itself, so the pin is checked at every run. Run B's tolerance is three orders tighter and reasoned from the observed data; Run B2's is looser and reasoned from an effect it never observed.

## C. Lines

One rule, applied identically by `explorations/reviews/tools/strip_count.py`: Fortress block comments `(* … *)` removed, including multi-line ones and the text on the lines they open and close; then blank and whitespace-only lines removed; everything else counted, component headers, imports and exports included. Harness and fixture files are excluded by not being counted as core: for Run B that is `check_main.part`, `train_main.part`, the `(* TESTS *)` region of `src/MicroGPT.fss` and `MicroGPTData.fss`; for Run B2 it is `MicroGPTCheck.fss`, `MicroGPTDemo.fss` and `MicroGPTRef.fss`.

| | Run B | Run B2 |
|---|---|---|
| **core** | **244** (`src/MicroGPT.fss` lines 1-365 plus its closing `end`) | **169** (`src/MicroGPT.fss`) |
| API needed to run it | none (one component) | 72 (`src/MicroGPT.fsi`) |
| harness | 97 + 44 (`check_main.part`, `train_main.part`) plus a 24-line Python splicer (`tools/build.py`) | 82 + 40 (`MicroGPTCheck.fss`, `MicroGPTDemo.fss`) |
| smoke test inside the core file | 27 (the `(* TESTS *)` region) | — |
| generated fixture | 1,227 lines of `MicroGPTData.fss` | `MicroGPTRef.fss`, 519 KB |

The 244 reconciles with Run B's own instrument: `tools/linecount.py` reports 236 because it strips the seven-line component header, and the article says 237 (`run-b-phase1.md:112` records the same one-line drift). The 169 matches Run B2's own figure exactly (`run-b2-phase1.md`, §2). Both articles quote 148 for the pinned Python under Run B's rule.

Run B's core is 44% larger. About half of the difference is the engine — three ranks of carrier with adjoint slots, ids and a topological sort, 103 lines by the article's own breakdown, against Run B2's 54 — and much of the rest is that Run B spells `Array[\RR64,(ZZ32,ZZ32)\]` out wherever a matrix appears, its own departure 13, where Run B2's `Mat` names it once. Against that, Run B's core covers more (section D), and Run B2's 169 needs a 72-line `.fsi` before the checker can import it, so at the level of "what must exist to run the verification" the gap is 244 + 24 lines of Python against 241.

Cost, for the record and not for the line count: Run B's check runs in 63.9 s and its training step in about 9 s at one thread; Run B2's check runs in 47.8 s but its forward-plus-backward is about 10 s against a 1 s forward, because a shared node's pullback is re-entered once per use (`explorations/run-b2/article.md:136`). Run B measured that shape as exponential in fan-out depth before rejecting it — 6,950 ms against 198 ms at depth 10 (`explorations/run-b/probes/s03_functional_depth.fss`, `gaps.md` row 108) — and Run B2 shipped it with the cost stated.

## D. Scope against the Python

| reference feature | Run B | Run B2 |
|---|---|---|
| dataset read and seeded shuffle | in Python, exported to `MicroGPTData` | in Python, exported to `MicroGPTRef` |
| tokenizer | `object Tokenizer` with `encode` and `decode` in the core (`src/MicroGPT.fss:343-348`) | `tokenize` in the core (`:168-169`); `decode` is in the demo (`MicroGPTDemo.fss:24`) |
| Gaussian initialisation (Box–Muller) | yes, `gauss`/`init` in the core (`:353-363`), exercised only by the smoke test | **absent** — `grep` for `random`, `gauss` or `init` in `run-b2/src/MicroGPT.fss` returns nothing; the program starts only from the reference's weights |
| scalar/vector/matrix autodiff | matrix level, three ranks | matrix level, one rank |
| forward, causal attention, heads | yes | yes |
| multi-layer | yes, `layers: List[\Layer\]`, `n_layer` (`:241-249`) | no, one `block` |
| loss over a document | yes | yes |
| Adam with bias correction | yes, an `Adam` object (`:295-305`) | yes, an `adam` function (`:159-165`) |
| linear learning-rate decay | in the driver (`train_main.part:29`) | in the demo (`MicroGPTDemo.fss`) |
| one training step as a definition | in the driver | **in the core**, `trainStep` (`:171-176`) |
| multi-step training loop | driver, 12 steps | demo, 12 steps |
| sampling with temperature and BOS stop | `pick` in the core, the loop in the driver | `choose` and `sample` both in the core (`:178-200`) |
| goldens derivation script in the tree | `reference/derive.py`, deliberately gitignored (the brief forbids committing the reference) | `tools/derive_goldens.py` and `tools/gen_fixture.py`, committed |

Run B covers the reference's initialiser and generalises past its single layer; Run B2 covers neither, and its program cannot produce a model that was not handed to it. Run B2 puts the training step and the whole sampling loop inside the core where a reader compares definitions; Run B leaves both in drivers the article does not render as pairs. The two omissions are of different kinds: Run B's is presentational, Run B2's is a missing piece of the reference.

## E. Machinery rulings

Where the two runs disagree about what Fortress can do, settled from `Specification/**/*.tex` and the existing probes, with one probe of my own where neither run's settled it.

**1. Row-wise operations at the matrix level.** Run B2 states as a departure that "the row-wise operations are written entry by entry because the library has no row broadcasting" (`explorations/run-b2/article.md:168`, table row at `:231`). The library half is true and its Phase 1 review reproduced it (`run-b2-review-probes/RvwBroadcast.out`: no `Array2 + Vector` overload). The argument is false: Run B's shipped, verified program makes `Mat` a `Generator[\Vec\]` whose rows are differentiable nodes (`explorations/run-b/src/MicroGPT.fss:60-63`) and lifts a vector function with `stack(⟨rmsnorm(x) | x ← X⟩)` (`:202, 210`), and that program passes 54 checks at machine epsilon. **Ruling: Run B is right.** The entry-by-entry form is a consequence of Run B2's one-rank carrier, not of the library, and it is what costs Run B2 the RMSNorm and softmax pairs. Run B2's Phase 1 review found a second counterexample, `diag(1/r) X`, on Run B2's own `Mat`; Run B's is stronger because it is a running program rather than a probe.

**2. One subscript overload for a list and a range.** Run B2's `gaps.md` row 112 records that `List[\ZZ32\]` and `Range[\ZZ32\]` overloads are rejected under the Meet Rule (`advanced/overloading.tex:224-272`) and offers three workarounds — an `excludes` trait, an object wrapper, a `typecase`; its program therefore builds a `positions` list and its departures table calls `_Wp[0 # T]` a design limit (`explorations/run-b2/article.md:221`). Run B declares one overload on the single supertype, `opr [ts: Generator[\ZZ32\]]` (`explorations/run-b/src/MicroGPT.fss:67`), and subscripts by a list *and* by `0 # |tokens|` on every check step. Neither run's probes state this cleanly as a positive, so I probed it: `explorations/run-b-vs-run-b2-probes/RvwGenSubscript.fss` declares that one overload and calls it three ways —

```
by a List  : 20.0 21.0 0.0 1.0 20.0 21.0
by 0 # n   : 0.0 1.0 10.0 11.0
by a Range : 10.0 11.0 20.0 21.0
```

(`RvwGenSubscript.out`; the first attempt, kept in `failed/RvwGenSubscript.attempt1.out`, reproduces both runs' getter-ordering row — Run B's 93 and Run B2's 114 — on the way). **Ruling: Run B is right.** Run B2's row 112 is correct about the two-overload question it asks and wrong as a reason for `positions`: the single-supertype declaration was never tried. The caveat is Run B's own `gaps.md` row 84 — `Range[\I\]` does not declare `Generator` as a supertrait (`FortressLibrary.fsi:2046`) — so this is a positive on the walk interpreter, which runs no static typecheck (ledger row 69), not a conformance result.

**3. A map comprehension over matrices of different shapes.** Run B's `gaps.md` row 87 records that it fails inside the library's covariant collection ("`Singleton[(FlatString,__DefaultMatrix[RR64,16,16])] APPCOV Singleton[(…[RR64,64,16])] have no common supertype`") and builds its parameter record by a fold (`explorations/run-b/src/MicroGPT.fss:279-283`). Run B2 writes exactly that comprehension, `{[\String, Mat\] k |-> f(v) | (k, v) <- m }` (`explorations/run-b2/src/MicroGPT.fss:55-56`), and it runs on every Adam step. **Ruling: both are right about their own reproducers, and Run B2's is the better route.** Run B's values are raw `Array[\RR64,(ZZ32,ZZ32)\]`, whose runtime classes differ by `nat` instantiation; Run B2's are all `Mat`, a monomorphic user value object that hides the extents. A user carrier over the array removes the join problem, and with it Run B's `record`-by-fold, its `each`/`zip` pair and its spelled-out array types: Run B2's `Params` is 11 lines where Run B's is 24.

**4. Per-head weight names.** Run B's departure 7 says per-head weight matrices "would render `(W_q)[h]` because `W_q[h]` typesets as a double subscript (ledger row 62)". Run B2 ships `_Wq[h]`, which sets as **Wq**_h (`explorations/run-b2/figures/def_head.svg`), and Run B2's Phase 1 review confirms the letter-subscripted `_W_q[h]` is the spelling that fails, with `! Double subscript.` (`run-b2-review-probes/regen/rvw_names2`). **Ruling: both halves hold and Run B's negative is bounded, not verified.** `W_q[h]` does not render; folding the letter into the bold name does, at the price of losing the subscript that marks q as a role rather than a name. Run B's departure states the blocked spelling as though it were the only one.

**5. Value objects.** Run B's `gaps.md` row 105 finds `===` on a `value object` compares only the dynamic type (`P(1.0) === P(2.0)` is `true`), against `basic/objects.tex:432-437`, and declines value objects for graph nodes; Run B2's rows 84–86 find the same defect family through `SEQV`, locate it in `FTypeObject.java:53-63` (constructor parameters are added to `fields` only inside the `VarDecl` branch, so a body with no field declaration compares nothing), show it reaches the shipped `Maybe` — `Just(1) SEQV Just(2)` is `true` — and build the whole engine on `value object Node` anyway. **No disagreement; convergent findings, and Run B2's is the deeper one.** Run B's reason for declining value objects is independent and sound: reverse mode on a tape accumulates into a mutable slot, and `basic/objects.tex:33-34` forbids a mutable field on a value object — a rule Run B2's row 84 shows the interpreter does not enforce.

**6. Postfix `^T` after a dotted field access.** Run B's row 89 and Run B2's row 105 are the same NEGATIVE-VERIFIED finding with the same workaround. **Converged.** Run B2's row is the better one: it names the parser rule (`Expression.rats:384-434`: a dotted primary is a `LeftAssociatedPrimary`, and exponentiation is a `MathItem` that attaches only to a `MathPrimary`) and bounds it — a subscript, a `†` and a `!` all work after a dot, so the fault is specific to `^`.

**7. Array pasting for the head assembly.** Run B's row 96 (matrix pasting fails; vector pasting works at runtime sizes with a literal-sized left-hand type) and Run B2's rows 97–98 (rank-one pasting of matrices always fails an extent check; rank-two works for square blocks and dies on non-square) are about different constructs and do not conflict. Both located the defect: Run B's worker in `IUOTuple.java:111-113` (`extentSums` never seeded with `-1`), Run B2's in the same file at `:112` plus `IndexedArrayWrapper`'s index swap. Both wrote a `concat` by fill. **Converged, independently, to the same line of Java.**

**8. Σ across a component boundary.** Run B2's redeclared Σ works inside its core and not in a client that imports it — a client gets `CastError` on a `Params` sum, and `except { opr BIG + }` on the import gives `Operator BIG + is not defined.` because a top-level `opr` is component-scoped, ledger row 30 (`run-b2-phase1.md`, §5). Run B never meets it: `tools/build.py` splices the core and the driver into one component. **Not a disagreement, but a real cost of Run B2's two-component layout that its article does not state, and a real cost of Run B's splice — its deliverable has no single runnable file (`run-b-phase1.md:7`).**

**9. Postfix operators in an API.** Run B2's row 120 (NEGATIVE-BOUNDED) finds a postfix declaration cannot be written in an `.fsi` and locates it as a missing `/` in `Parameter.rats:172-175`; its Phase 1 review widened the bound with a second spelling. Run B has no equivalent row because it has no API. **Run B2's finding stands, uncontested, and belongs on the worklist.**

Score on the rulings: Run B is right on 1 and 2, Run B2 on 3 and on the depth of 5, 6 and 9; 7 is a convergence and 8 a cost on both sides. Run B's two wins are both places where Run B2 wrote a negative into its article that a spelling it did not try refutes — the shape quality gate 1 exists to prevent.

## F. Process and the brief

| | Run B | Run B2 |
|---|---|---|
| condition | cleared session, started from the brief and the tree | the session that produced the tree's earlier ports and reviews, resumed from a compaction summary |
| wall time | 1 h 31 min, one human sentence of input (`07-run-b.md`, header) | 59 min 41 s, one mid-run human correction at 01:51 (`08-run-b2.md`, header and timeline 11) |
| main-thread tokens | output 1.8e6; context processed 1.6e8 | output 7.7e5; context processed 6.7e7 |
| worker tokens | output 3.6e4; context 3.9e7 (one worker) | output 1.1e5; context 5.5e7 (five workers) |
| delegations | 1, late (01:54), and only for gate 4 | 5, from minute 6, for every probe, replication and the gap table |
| **gate 1** no negative on a first error | met for the rows it wrote; weakest where the reproducer is a transcript line rather than a probe, rows 85 and 92 (`run-b-phase1.md:102`) | met for the five mechanisms the inventory flagged, by two workers briefed to achieve rather than confirm; **not applied** to the row-broadcasting claim, which entered the departures table with no attempt behind it (`run-b2-phase1.md`, §6) |
| **gate 2** a spec pass before representations | `mechanisms.md`, 46 mechanisms marked USED (21) / CONSIDERED (11) / UNAVAILABLE (13) / N/A (9); the reading pass at 01:01–01:03, before the skeletons, the file written at 01:55 | `inventory.md`, one pass over the built `.toc`, every mechanism tied to one of eight design decisions and to a ledger row, a prior probe or "unprobed"; committed at 735de61ed **before any Fortress file was written** |
| **gate 3** every language fact marked | applied in form — a Marks paragraph, a 24-row departures table, status marks in `gaps.md` — and undercut in fact: all 115 probe outputs were lost to the root `*.out` rule and reconstructed from transcripts afterwards, 74 partial, including the sole reproducer for row 88 (`probes/RECOVERED-OUTPUTS.md`; `run-b-phase1.md:98`) | applied as a marks section, one bullet per fact; 102 `.out` files on the branch, kept by `!probes/*.out` in `run-b2/.gitignore`; two exceptions, the row-broadcasting row and two departure classes the brief does not list |
| **gate 4** independent replication | 18 goals to one worker with the specification and its own probes and none of the run's reasoning; 45 probes, a 636-line report, 12 goals achieved; **2 corrections landed in the program and the article** (`pi` in `Constants`, `===` on value objects), 3 rows sharpened | 9 claims to two workers on the same terms; one claim retired (`w \|hs\|` is not a syntax error) and the workaround removed from the program; **the article was published twice before its own replications came back** (transcript records 20395, 20460, 20513), a departure neither the article nor `design.md` declares (`run-b2-phase1.md`, §6) |
| **gate 5** cost priced by a skeleton | 2 skeletons built and finite-difference-checked, then measured against residual depth: tape 53/32/46/75/68/198 ms, functional 45/45/135/481/1872/6950 ms; the third shape declared sketched-not-built | 3 skeletons built, finite-difference-checked and **rendered** before the choice (`figures/skel{A,B,C}_engine.svg`); the brief's third candidate recorded as not built separately |
| the mission's comparison duty | discharged for 6 of 15 pairs (`article.md` §4.7 plus the `x00`–`x02` spelling sheets); for the layer, Adam and sampling the article compares against the prior runs without naming a spelling it tried and discarded (`run-b-phase1.md:108`) | discharged for 2 of 14 pairs, RMSNorm and softmax; `figures/variants.tic` is the only surviving trace of alternatives and covers one line of one definition (`run-b2-phase1.md`, §6) |
| declared departures | one, in `mechanisms.md`'s header: the built `.toc` is not in the tree, so the outline came from the TeX sources | none of process; `design.md` declares itself "not a required deliverable of the brief" |
| undeclared departures found in review | the lost probe outputs (candidly recorded, in `probes/RECOVERED-OUTPUTS.md`, but a gate-3 failure on the branch as delivered); four article numbers that drift from its own artifacts — 237 lines against 236, 307 nodes against 305, 53 checks against 54, a Reproduce block advertising 46 s and 75 s where the shipped logs say 64 s and 113 s; the `opr SQRT(a: Num)` radical-over-type-ascription fault with no departures row; the stale `===` row in `mechanisms.md` (found here) | the gate-4 ordering inversion; no adopt-or-reject record anywhere for the 18 items the brief pointed it at; the row-broadcasting negative; "Adam identical line by line" when its fractions set inline; a tolerance justified by a parallel-order effect four threads do not produce; `def_mat` embedding the whole program (found here) |
| adopt-list tally | **13 adopted** (one in substance, one minus a step the brief forbids), **2 rejected with a stated reason**, **2 missed**, **1 not applicable** (`run-b-phase1.md:80`) | **8 adopted, 3 partial, 5 missed, 2 not applicable, 0 rejected with a stated reason** (`run-b2-phase1.md`, §4) |
| gap rows | 25, numbered 84–108, 16 carrying the independent worker's verdict | 39, numbered 84–122, each with a saved reproducer, and most negatives located in the interpreter's own source |

Read across the row, the two runs failed at opposite ends. Run B's process is the more complete on judgement — it worked every adopt-list item and said why for each, it rejected two with evidence, and its worker corrected the program and not only the prose — and the weakest on evidence, because the files its marks point at were not on the branch it delivered. Run B2's is the more complete on evidence — 102 probe outputs, five workers, negatives traced to `FTypeObject.java`, `IUOTuple.java`, `ExprDisambiguator.scala`, `Parameter.rats` — and the weakest on judgement, because it left no record of working the lists it was pointed at, discharged the comparison duty for two pairs in fourteen, and published ahead of its own replications.

The conditions show through in both directions and account for part, not all, of this. Run B's cleared session spent its first six minutes reading and its gate-2 pass on a table of contents it had to reconstruct; Run B2's prepared session had the `.toc`, the earlier reviews already in its own working memory, and a delegation discipline it recovered from its own pre-compaction transcript rather than from the brief (`08-run-b2.md`, timeline 11). Run B2 finished in two thirds of the wall time on 44% of the main-thread output and 61% of the context, which is what the prepared condition buys. What it does not explain is the direction of the failures: reading the adopt lists item by item is the cheapest of the brief's duties, and the prepared run — the one that had itself written those lists — is the one that left no record of doing it.

## G. Against the field

For each pair, the winner above set beside the best prior render recorded in `blinded-fable-vs-astra.md` §A and `astra-vs-ours.md` §A. Prior figures opened: `explorations/blinded-fable/figures/gpt_{rmsnorm,softmax,layer,model,adam,loss,pick,value,sum,topo}.svg` and `demo_tokenize.svg`, `explorations/astra/worker/main/figures/rendered/{rms,softmax,adam}.png`, `explorations/fortify/block-{rmsnorm,softmax,attention,loss,ffn}-light.svg` and `microgpt-{attn,model}-light.svg`.

| pair | best prior render | this comparison's winner | verdict |
|---|---|---|---|
| embedding | ours: `h₀ = **We**_t + **Wp**_i` (`astra-vs-ours.md:15`) | Run B2 | **falls short** — ours' per-position line has two clean single-letter subscripts; Run B2's gather subscripts a variable named *positions*. It beats the blinded run's `⟨rmsnorm(E_{tokens_t} + P_t) | t ← tokens.indices⟩`. |
| RMSNorm | Astra: `x` over `√((x·x)/x.n + 0.00001)`, stacked (`blinded-fable-vs-astra.md:10`) | Run B | **beats** — the same shape with `|x|` where Astra writes `x.n` and a named ε rendering ϵ where Astra writes `0.00001`, which were the two things the prior review docked Astra for. |
| softmax | Astra: `e = exp(x − maximum(x))`; `e/(Σ_{i←0#x.n} e_i)` (`blinded-fable-vs-astra.md:11`) | Run B | **beats** — the denominator is a bare `Σ e`, and the max is a big operator over the carrier with no `.primal`/`.data` leak, which no prior run managed in the same line. |
| attention | ours: `softmax(q K^T/√d_k) V` (`astra-vs-ours.md:18`) | Run B2 | **beats** — the same line lifted to the papers' own whole-sequence level with the causal mask written in, which no prior run rendered at all. |
| one head | the blinded run: `c = (h d_h) # d_h; (Qh,Kh,Vh) = (Q.cols(c),…)`, called its weakest code; Astra's never rendered (`blinded-fable-vs-astra.md:12`) | Run B2 | **beats, decisively** — `attention(X **Wq**_h, X **Wk**_h, X **Wv**_h)` is one line with no slice, against three lines of column plumbing. |
| multi-head, concatenation | the blinded run: `BIG ‖[h ← 0#n_head] (heads_h)[t]`, a user monoid reduction (`blinded-fable-vs-astra.md:14`) | tie | **ties** — both informed runs trade the big-operator glyph for `concat`, the paper's own word, over a comprehension; neither is nearer the ellipsis list than the other. |
| feed-forward | ours: `ffn(x) = **W2** relu(**W1** x)` (`astra-vs-ours.md:19`) | Run B2 | **beats**, narrowly — `relu(X **W**₁) **W**₂` is the row-vector order FFN(X) = max(0, XW₁)W₂ is written in; the prior runs use the transposed column form. |
| residual block | the blinded run: `X' = X + attention(rmsnorm(X)); X' + ⟨mlp(x) | x ← rmsnorm(X')⟩` (`blinded-fable-vs-astra.md:13`) | tie | **beats** — the comprehension lift on the second line is gone on both sides. |
| logits and loss | the blinded run: `losses = ⟨−log((softmax(logits_t))[tokens_{t+1}]) | t ← 0#n⟩; (1/n)(Σ_{l←losses} l)` (`blinded-fable-vs-astra.md:15`) | tie | **beats** on Run B's half — `−(1/n)(Σ_{t←0#n} log P[t, y_t])` is one expression where the prior needs a named `losses` list; Run B2's `.data` and trailing `/T` are a step back from it. |
| backward rules | no prior render: the field states backpropagation at the scalar level only, `node(data b.data, (self, b.data), (b, data))` (`blinded-fable-vs-astra.md:19`) | Run B | **beats by establishing the pair** — `A.grad += G B^T; B.grad += A^T G` is the matrix-calculus table typeset as itself, and nothing in the field is at that level. |
| autodiff engine | the blinded run: `object Value(var data, deps: Generator[\(Value,RR64)\])` plus `topo` and `backward`, 39 lines (`blinded-fable-vs-astra.md:19`) | Run B2 | **beats** — `value object Node(data: Mat, pullback: Mat → Params)` drops the mutable slot, the id counter and the topological sort the field's best still carries. |
| Σ machinery | tie in the field: `SumValues`/`BigReduction` and `VSumReduction`/`Comprehension`, both with a correct empty element, `node(0)` and `constant(0.0)` (`blinded-fable-vs-astra.md:16`) | tie | **ties on the render, falls short on the identity** — both informed runs write `empty(): Any = 0`, rebuilding ledger row 45's hazard at user level where both prior runs had it right; Run B declares the price (departure 19), Run B2 does not mention it. |
| Adam | Astra: 13 lines with stacked fractions but `1.0 step`, `(g_i)^{2.0}`, `0.00000001` and an index loop (`astra-vs-ours.md:24`) | Run B | **beats, decisively** — five lines over the whole parameter record with β₁, β₂, m̂, v̂, η, ϵ and `g ⊙ g`, and no loop. |
| sampling | ours: `short = ⟨j | j ← p.indices, (Σ_{i←seq(0#(j+1))} (p_i).data) < r⟩; |short| MIN (|p|−1)` (`astra-vs-ours.md:25`) | Run B | **beats**, narrowly — the same count form with the two Σs named and the `.data` leak gone. |
| tokenizer | the blinded run: `ids = ⟨(if i ← ref_uchars.indexOf(ch) then i else 0 end) | ch ← doc⟩; (⟨ref_bos⟩ ‖ ids).addRight(ref_bos)` (`blinded-fable-vs-astra.md:59`) | Run B2 | **beats** — one line of three concatenations with `.get` in place of the `if`-binding, and no `addRight`. |

<!--figs
title: The field's typographic wins, which Run B now holds
col: Astra — `rms` :: explorations/astra/worker/main/figures/rendered/rms.svg
col: Astra — `softmax` :: explorations/astra/worker/main/figures/rendered/softmax.svg
col: Astra — `adam` :: explorations/astra/worker/main/figures/rendered/adam.svg
note: The tight `/` that won Astra two pairs in the earlier comparison, and the Adam the earlier comparison called the field's best. Run B's renders of all three are in section A.
-->

<!--figs
title: The blinded run's best renders
col: `gpt_model` — embedding and forward :: explorations/blinded-fable/figures/gpt_model.svg
col: `gpt_layer` — heads and the block :: explorations/blinded-fable/figures/gpt_layer.svg
col: `gpt_loss` :: explorations/blinded-fable/figures/gpt_loss.svg
col: `gpt_pick` — sampling :: explorations/blinded-fable/figures/gpt_pick.svg
col: `gpt_value` — the scalar engine :: explorations/blinded-fable/figures/gpt_value.svg
col: `gpt_sum` — the reduction object :: explorations/blinded-fable/figures/gpt_sum.svg
col: `demo_tokenize` :: explorations/blinded-fable/figures/demo_tokenize.svg
col: `gpt_topo` — the topological sort :: explorations/blinded-fable/figures/gpt_topo.svg
note: The field's best on embedding, the head assembly, the loss, sampling, the autodiff engine and the tokenizer, and the `empty(): Value = node(0)` identity both informed runs regressed on.
-->

<!--figs
title: The open run's best renders
col: `block-embedding` :: explorations/fortify/block-embedding-light.svg
col: `block-attention` :: explorations/fortify/block-attention-light.svg
col: `block-ffn` :: explorations/fortify/block-ffn-light.svg
col: `block-rmsnorm` :: explorations/fortify/block-rmsnorm-light.svg
col: `block-softmax` :: explorations/fortify/block-softmax-light.svg
col: `block-loss` :: explorations/fortify/block-loss-light.svg
note: The renders `astra-vs-ours.md` section A judged closest on embedding, attention, the feed-forward and the loss.
-->

**Beats 12, ties 2, falls short 1.** The informed runs beat the field on every pair where the mission's forcing function bites, and the one place they fall short — the embedding's subscripts — costs the least. The two ties are the concatenation, where the field's `BIG ‖` and the informed runs' `concat` are different readings of *Concat*, and the Σ object, where both informed runs regressed on an identity element two prior runs got right.

## H. Adopt lists

**Run B ← Run B2**

1. A monomorphic matrix carrier, `value object Mat(a: Array[\RR64,(ZZ32,ZZ32)\])` with `dims`, the operators and `map`/`ivmap` (`explorations/run-b2/src/MicroGPT.fss:22-44`). It names the array type once and thereby removes Run B's departure 13, the spelled-out `Array[\RR64,(ZZ32,ZZ32)\]` in `Params`, in `record`, in `grads` and in every plumbing helper.
2. With it, the parameter record as a map comprehension: `map(f) = Params({[\String, Mat\] k |-> f(v) | (k, v) <- m })` and `zipWith` (`explorations/run-b2/src/MicroGPT.fss:55-56`), replacing `record`-by-fold, `each`, `zip` and the workaround `gaps.md` row 87 documents — section E.3.
3. Per-head projection nodes, `_Wq: List[\Node\]` with `head(X, h) = attention(X **Wq**_h, …)` (`explorations/run-b2/src/MicroGPT.fss:130-132, 144`), which renders Vaswani's head line and retires Run B's departure 7 as stated.
4. `d_k` as a field of the model object (`explorations/run-b2/src/MicroGPT.fss:137`), so attention is one definition instead of a `do` block with a local binding.
5. A two-component layout with a real `.fsi` and a two-line run recipe (`explorations/run-b2/article.md:283-289`), against `tools/build.py` splicing `.part` files into a `build/` that no `.fss` in the tree corresponds to — knowing the cost section E.8 names.
6. Locate every negative in the implementation, not only in the specification: `FTypeObject.java:53-63`, `IUOTuple.java:112`, `IndexedArrayWrapper.java:74-87`, `ExprDisambiguator.scala:308-313`, `DesugarerVisitor.java:1565-1569`, `Parameter.rats:172-175` (`explorations/run-b2/gaps.md`, rows 85, 91, 97, 98, 105, 107, 120). Run B's rows cite the spec and stop.
7. `!probes/*.out` in the run's own `.gitignore` from the first commit (`explorations/run-b2/.gitignore`), so gate 3's marks point at files that exist rather than at reconstructions.

**Run B2 ← Run B**

1. Make the matrix carrier a generator of differentiable row nodes and lift a vector function over it: `generate` on `Mat`, `opr [t: ZZ32]: Vec` with a row scatter, and `stack(⟨rmsnorm(x) | x ← X⟩)` (`explorations/run-b/src/MicroGPT.fss:60-63, 151-153, 202, 210`). This is the item that wins RMSNorm and softmax and refutes the departure at `explorations/run-b2/article.md:231`.
2. Tight fractions throughout Adam: `m'/(1 - beta1^t)`, `v'/(1 - beta2^t)`, `theta - eta m_hat/(SQRT v_hat + epsilon)` (`explorations/run-b/src/MicroGPT.fss:301-303`), and `eta` rather than `lr`. Run B2's own Phase 1 review confirms the respelling passes every check unchanged.
3. `pick` as a count of prefix sums: `total = SUM[p_i ← p] p_i`, `cumulative(j) = SUM[i ← 0:j] p[i]`, `(|⟨j | j ← p.indices, cumulative(j) ≤ u total⟩|) MIN (|p| − 1)` (`explorations/run-b/src/MicroGPT.fss:335-339`), in place of `choose`'s `while` over two `var` slots.
4. One subscript overload on `Generator[\ZZ32\]` (`explorations/run-b/src/MicroGPT.fss:67`; my probe `explorations/run-b-vs-run-b2-probes/RvwGenSubscript.out`), which serves both a token list and `0 # T` and removes `positions` and the departure row that calls it a design limit.
5. The reference's Gaussian initialiser and a general layer count, `gauss`/`init` and `layers: List[\Layer\]` (`explorations/run-b/src/MicroGPT.fss:241-249, 353-363`), so the program can build a model it was not handed and the reference's one layer is a case of it.
6. A finite-difference check of the engine that ships, in the program file and stripped by the build (`explorations/run-b/src/MicroGPT.fss:366-395`, `checks/smoke_output.txt`), not only of the skeletons.
7. Work the adopt lists item by item and record adopted-or-rejected with a reason for each, including the two rejections Run B states with evidence (`explorations/run-b/article.md` §4.4 and departure 19 for the reduction identity; `gaps.md` row 88 for the `StandardMax` bound) — the duty `run-b2-phase1.md` §4 found no trace of.
8. `mechanisms.md`'s CONSIDERED column: every mechanism that lost carries the reason it lost, in one row (`explorations/run-b/mechanisms.md`, rows 1, 5-7, 10, 12). `inventory.md` records what each mechanism bears on and what is known about it, which is the better *input* to a design; it does not record what was tried and dropped, which is what the brief's comparison duty asks for.
9. Render the alternative where it reads better and say so line by line, with the prior runs' own figures reproduced unchanged (`explorations/run-b/article.md` §4.7, `figures/prior_*.svg`, byte-identical to the blinded run's originals per `run-b-phase1.md:28`). Run B2 does this for two pairs; Run B does it for six and names what each level buys.

## I. Overall judgement

Run B is the stronger artifact on both counts. Its program covers more of the reference — the Gaussian initialiser, a general layer count, a decoder — verifies more of itself, with a finite-difference check of the engine that ships and a tolerance three orders tighter and reasoned from its own measurements, and wins the five rendered pairs where the mission's forcing function actually bites: RMSNorm, softmax, the backward table, Adam and sampling are the places where a stacked fraction, a bare Σ, a bare `G B^T` or a min-of-a-count turns an expression into a formula, and Run B has all five while Run B2 has none of them. Its article is the stronger for the same reason its process record is: it works the prior lists item by item with a stated verdict and two evidence-backed rejections, it shows the scalar alternative for six pairs and says what each level buys, and its departures table classifies twenty-four remaining differences against a reproducer apiece. Run B2's wins are real and not small — one line of attention, Vaswani's head, a feed-forward in the paper's own order, and an engine that is `value object Node(data, pullback)` and nothing else, which is the best rendered autodiff engine in this tree — and its evidence base is the better one, 102 committed probe outputs against 115 reconstructed from transcripts, with its negatives traced into the interpreter's own Java, Scala and Rats sources. But three of its faults are of one kind, and it is the kind the brief's first quality gate names: a negative written into the article that a spelling it did not try refutes. Row broadcasting is not forced, `_Wp[0 # T]` is not blocked, and Adam is not identical line by line; the first two cost it the two pairs it lost most heavily, and the third cost it a pair it could have won for three characters.

What the pair of runs shows about the two conditions is narrower than the artifacts' gap. The prepared session was faster and cheaper — 60 minutes against 91, 44% of the main-thread output, 61% of the context — and it started its gate-2 pass on a built table of contents the cleared session had to reconstruct from `\input` commands, which is exactly the kind of small advantage a warm context confers. It also delegated from minute six rather than minute fifty-nine, and got a denser evidence trail for it. None of that produced the better artifact, and the duties it skipped were the cheap ones: reading eighteen adopt-list items and recording a verdict for each costs minutes, and the run that had itself written those lists is the run with no record of having worked them. The cleared session, having had to read the arc from nothing, arrived with the arc's judgements in hand and applied them; the prepared session, having them already, did not write them down and did not check them. Two specimens settle nothing about the conditions in general, but on this pair the advantage of the prepared condition is visible in cost and invisible in quality.
