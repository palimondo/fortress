# microGPT in Fortress, at the level of matrices

<p class="lede">A complete GPT, Karpathy's <em>microGPT</em>, written in Fortress so that its executable definitions typeset beside the papers' formulas: the transformer as matrix equations with a causal mask, and reverse-mode differentiation hung on those matrices rather than on a custom scalar. Every figure is the running program, typeset by the language's own tool; every number is checked against the pinned Python reference; every claim about the language carries the probe that established it.</p>

This page teaches two things at the same weight: how a GPT computes and learns, and how Fortress's own mechanisms (its library vectors and matrices, generators and reductions, operator declarations, its component algebra) are assembled into the building blocks that let the mathematical core be written as concisely as it is here. Where the language stops short, the departure is named, classified, and tied to a reproducer.

**How to read a pair.** Each block of the model appears three times: the formula from the literature (typeset with LaTeX at the same size as the code), the Python of the pinned reference (verbatim, with its line numbers), and the Fortress definition typeset from the source that the interpreter runs. Under every Fortress render, a fold-out shows the ASCII source as typed, so the reader can see what was written for `·`, `Σ`, `^T` and `⊙`. The correspondence is judged by eye; the execution is judged by the checks in §6.

**Marks.** A language fact stated here is either *verified* (a run whose output sits beside its probe under `probes/`, or a check under `checks/`) or *bounded* (the mechanisms tried are named and were not exhaustive). Rows of the project's gap ledger (`explorations/fortress-gap-ledger.md`) are cited by number; new rows are in `gaps.md` beside this page. Eighteen of the new claims were handed, goal-framed and without this run's reasoning, to an independent worker for reproduction (§7.4).

## 1. The design decision, and what it costs

The reference differentiates at the level of scalars: every number in the forward pass is a `Value` with a mutable `grad` field, and backpropagation walks 1.4 million of them for two training steps and three samples. The papers do not state backpropagation that way. They state it for matrices: for a linear layer *Y = XWᵀ* the gradient with respect to the weights is *Ȳᵀ X*, for a softmax it is a rank-one correction, and so on. The project's decision for this run was to build the flagship at that level, with the graph hung on the computation of vectors and matrices, and to keep data immutable as far as the mathematics allows. The scalar design is the explored alternative, represented by the three earlier verified programs in this tree, which are cited and compared in §4.7 rather than rewritten.

Three shapes of matrix-level autodiff were built as working skeletons before one was chosen (§4.6): a *tape* of tensor nodes with adjoint accumulators, a *functional* form in which every value carries a linear map from its cotangent to the parameter cotangents, and an *expression-tree* form, sketched and not built. Each skeleton was finite-difference checked, timed against depth, and typeset, before the decision. The tape won on cost and typing; the functional form won on immutability and lost on an exponential re-walk of shared nodes, measured, not forecast (§4.6).

What the decision costs, in one sentence: the program is 237 lines under the counting rule of §6.4 against the reference's 148, and about a hundred of those lines are the differentiation engine that Python gets for free from a class with two methods.

## 2. The reference and the goldens

The reference is Karpathy's `microgpt.py` as published with the article of 12 February 2026, pinned at sha256 `d47d88c2fd432c8ebdc1048beab7f7eb64ea7e0e664e11b812d72a6d95ebccee` (199 lines; the same revision the two earlier runs pinned). Its configuration is the one used here throughout: one layer, embedding width 16, block size 16, four heads, a 27-token vocabulary (the lowercase letters and a beginning-of-sequence token), 4,192 parameters, trained on the seeded shuffle of the `names.txt` dataset (32,032 names).

The goldens were derived by executing the pinned text: `reference/derive.py` runs the source through the model definition unchanged (seed, dataset shuffle, tokenizer, `Value`, `state_dict`, `gpt`) and then an instrumented copy of its training loop for two steps and of its inference loop for three samples, recording every logit, probability, per-position loss, the loss, all gradients, all Adam-updated parameters, the learning rates, and the uniform draws `random.choices` consumes. The result, `checks/goldens_2steps.json`, was compared entry by entry with the blinded run's independently derived `checks_2steps.json`: 21,522 floating-point scalars, all bit-identical, and the same key set. `tools/gen_data.py` turns the JSON into a Fortress data component (`src/MicroGPTData.fss`, 1,227 lines of decimal literals, since Fortress numerals have no exponent form, ledger row 14).

## 3. The model, block by block

A transformer maps a sequence of *n* tokens to a sequence of *n* predictions. Every position carries a vector of width *d*; the layer mixes those vectors across positions (attention) and then transforms each one on its own (the MLP); both are wrapped in a residual connection and preceded by a normalization. Writing the *n* vectors as the rows of an *n × d* matrix *X* is the papers' convention, and it is the convention here: every block below is a function from a matrix to a matrix, and the whole sequence is processed at once. The reference instead computes one position at a time and keeps the earlier keys and values in a cache; the numbers are the same, only their association differs (§6.2).

### 3.1 Tokens to vectors

A token is a row of the embedding table *E*; its position is a row of *P*. The model's input is their sum, normalized.

{{pair:embed|embed|v2_model}}

`E[tokens]` is a subscript of a matrix node by a list of indices, and `P[0 # |tokens|]` the same by a range: both are one operator declaration, `opr [ts: Generator[\ZZ32\]]`, because `List` and `Range` are both generators (a second overload for `Range` next to a `Generator` one is rejected by the overloading rules, gaps row 84). The layers are applied in sequence; `seq` marks the one loop in the model whose order matters. The last line, `X W_lmᵀ`, is the logits: one row of vocabulary scores per position.

### 3.2 RMS normalization

Normalizing every position's vector to unit root-mean-square keeps the scale of the residual stream in check; the reference uses RMSNorm without a learned gain.

{{pair:rmsnorm|rmsnorm|v2_rmsnorm}}

The vector formula is the paper's; the mean of squares is written as the dot product over the width, *x·x / |x|*, because a sum over the *elements* of a vector node would leave the graph (the elements are plain numbers) while `x DOT x` is one differentiable node. The second line lifts the vector function to the rows of a matrix: `x <- X` draws the rows of a matrix node as vector nodes, the comprehension applies the function to each, and `stack` makes a matrix node of the results. This lift is the whole of the "broadcasting" the program has, and it is the same two-line pattern for softmax.

### 3.3 Softmax

Softmax turns a vector of scores into a probability distribution. Subtracting the maximum first changes nothing mathematically and keeps the exponentials in range; the maximum is taken as a plain number, outside the graph, as in the reference.

{{pair:softmax|softmax|v2_softmax}}

`BIG MAX[z_i <- z] z_i` is the library's own big operator over the elements of the node (the node is a generator of its elements). `SUM e`, the prefix form, is a user declaration on vector nodes: one graph operation that sums a vector and remembers that its adjoint broadcasts (§4.3). The division `e/(SUM e)` is a vector-by-scalar node whose backward map carries the quotient rule.

### 3.4 Attention with a causal mask

Attention lets each position read from the others. For every position, a *query* is compared with every *key* by a dot product; the scores, scaled by the square root of the key width and passed through softmax, weight a sum of *values*. Causality means a position may read only itself and the positions before it: the mask adds −∞ to every score of a later position, so its weight is exactly zero.

{{pair:attention|attention|v2_attention}}

This is the formula of Vaswani et al. with the mask written in; the reference reaches the same numbers by never computing a later position's score at all (its `keys`/`values` lists hold only the past). In Fortress, `Q K^T` is the library's matrix product on the values, `^T` is the spec's postfix transpose declared on the carrier (ledger row 34), the tight `/(SQRT d_k)` is what makes Fortify set the stacked fraction, and `mask(|Q|)` is a constant matrix node. `−∞` is spelled `-infinity` with `infinity = 1.0/0.0`, since the spec's `∞` object is not in the library (gaps row 104).

### 3.5 Heads, the residual stream, and the layer

The layer computes queries, keys and values for all positions at once (*Q = XW_qᵀ* and so on), splits their columns into four heads, runs attention on each head, concatenates the results and projects them with *W_o*. The residual connections add each block's output to its input, so the layer refines a running representation rather than replacing it.

{{pair:multihead|attention|v2_layer}}

{{math:block}}

{{py:mlp}}

`Q[:, c]` is a subscript on the carrier by a trivial open range and a column range, the reference's `q[hs:hs+head_dim]` at the matrix level (verified: `probes/c16_model_spellings.fss`); `concat` is the paper's word (Vaswani's *Concat*); the head loop is a comprehension, so the heads are independent iterations. The MLP is one line, the block two. Nothing in the rendered layer is hidden: the head assembly is the line `concat(⟨head(h) | h ← 0#n_head⟩) W_oᵀ`.

### 3.6 Logits and the loss

Training minimizes the average, over positions, of the negative log-probability the model assigned to the token that actually came next.

{{pair:loss|logits|v2_loss}}

{{py:loop}}

`P[t, y[t]]` is an element of a matrix node as a scalar node, `log` its logarithm as a node, and the Σ is the user-declared summation over anything with a `+` (§4.4), here over scalar nodes. The reduction is parenthesized because a reduction expression is a `FlowExpr` in the grammar and cannot be an operand without parentheses (ledger row 6).

## 4. Backpropagation at the level of matrices

### 4.1 The idea

Reverse-mode differentiation assigns to every intermediate value *v* its adjoint *v̄ = ∂L/∂v* and pushes adjoints from the loss back to the parameters, one node at a time, in reverse topological order. At the matrix level the chain rule for a node *v* with child *c* reads

{{math:chain}}

and the transposed Jacobians of the matrix operations are the small table every backprop tutorial derives:

{{math:matmul}}

The program's engine is this table made executable: a node holds its value, the nodes it was computed from, and a *backward map* that states, for the node's adjoint *G*, how *G* flows into the children's adjoints. Because adjoints are carriers of the same kind as values (a matrix's adjoint is a matrix node), the backward maps are written in the same algebra as the forward pass, and read as the equations above.

### 4.2 The carriers

{{fig:v2_carriers}}

Three carriers, one per rank: `Num`, `Vec`, `Mat`. Each holds a value from the library (`RR64`, `Array[\RR64,ZZ32\]`, `Array[\RR64,(ZZ32,ZZ32)\]`; the runtime-sized array types, ledger row 57), its `children`, its `backprop` closure, and a lazily allocated adjoint: the field `adj` is a `Maybe`, the getter `grad` returns a fresh zero node until the first accumulation, the setter stores, and `x.grad += g` goes through both (verified: `probes/c14_lazy_grad_generators.fss`). The laziness is what lets an adjoint be a carrier at all: an eagerly allocated zero adjoint would itself need an adjoint, without end. `push()` runs the backward map on the node's own adjoint.

A `Vec` is a generator of its elements, so `z_i <- z`, `|z|` and `z[i]` are available from two library mix-ins (ledger row 47); a `Mat` is a generator of its *row nodes*, by a `generate` method of its own, so `x <- X` yields differentiable rows. A `Mat` also answers `X[t]` (a row node), `X[t, j]` (an element node), `X[tokens]` (a gather), and `X[:, c]` (a column block), each with its backward map. The `ZeroIndexed` mix-in was dropped from `Mat` because its abstract range subscript shadows the user's gather (gaps row 85).

{{fig:v2_factories}}

Constants are nodes with no children and a backward map that does nothing; graph nodes are made by the three-argument forms, whose trailing varargs collect the children (a factory overloaded on one child, a pair and a list is rejected by the Meet Rule, gaps row 84; varargs after the closure is the form that works, verified: `probes/c15b_factory_varargs.fss`).

### 4.3 The operator table

Each operator states its value, then its backward map, then its children.

{{pair:matmul|linear|v2_matrices}}

`A B` is the library's product on the values, and its backward map is the table's two equations. `relu` uses `positive(X)`, the indicator of the positive entries; `cols` and `stack` embed their adjoints back into the larger matrix; `concat` splits the adjoint into column blocks.

{{pair:vecrules|softmax|v2_vectors}}

{{pair:scalarrules|value|v2_scalars}}

Compare with the reference's `Value`: there the operator table is nine scalar rules with local derivatives as numbers; here it is the same table at three ranks, with the derivatives as matrix expressions. The correspondence to Karpathy's `(children), (local_grads)` is one-to-one, with the local gradient replaced by the map that applies it.

### 4.4 Σ

{{pair:sum|backward|v2_sum}}

Two summations are needed: Σ over a generator (positions, prefix sums, parameter counts) and Σ over the elements of a vector node as one graph operation. The library's `SUM` is sealed to `Number` (ledger row 44), and a big operator's name admits exactly one nullary declaration per program (rows 39–40); the spec's `except` import frees the name, and the one declaration is a reduction whose `join` dispatches on the dynamic types of its arguments (the route the open run took), so `SUM[i <- 1:4] i`, `SUM[t <- 0#n] nodes[t]` and the prefix `SUM e` on a vector node coexist in one component (verified: `probes/c13_sum_protocol.fss`; the Num-only first attempt broke the numeric Σ inside the vector one, `c13_sum_protocol.first.out`). The price is the identity of the empty Σ, the numeric `0` (ledger row 45), never joined in here since no summed generator is empty, and a static type of `Any` on the reduction's result, which the interpreter does not check.

### 4.5 Backward

{{pair:chain|backward|v2_backward}}

The topological sort is Karpathy's, over nodes instead of scalars; the ids come from an `atomic` counter because Fortress has object identity (`===`, verified: `probes/c03_closures.fss`) but no identity-keyed set. For the 5-token smoke test the graph has 307 nodes. Two training steps and three samples create 12,813 nodes in the check; the scalar design creates 1,393,152 for the same work (the blinded run's count of its own check).

### 4.6 The shapes that were built, and the one chosen

The brief required at least two materially different shapes as working skeletons before a choice. Both are under `probes/`, both are finite-difference checked on the same small model with a shared parameter and a residual fan-out.

**The tape** (`probes/s01_tape.fss`, max |analytic − finite difference| = 4.7·10⁻¹⁰). Nodes with a mutable adjoint, `(child, transposed Jacobian)` pairs, Karpathy's backward. Its first skeleton kept adjoints as raw library arrays, and paid for it in notation: a user `^T` cannot be declared for both a runtime vector and a runtime matrix (gaps row 84), so the backward maps read `outer(g, x.v)` and `W.v.t() g`. It also needed one dependency object per (parent kind, child kind) pair, because the accumulation `c.grad += f(g)` must be typed by the child.

{{fig:s01_ops}}

**The functional form** (`probes/s02_functional.fss`, 1.8·10⁻¹⁰). Every value carries a linear map from its own cotangent to the cotangent of the loss with respect to all parameters, a `Grad` record keyed by parameter name; composition is the chain rule, sharing is handled by summing records at fan-out, nothing is mutated, and the backward maps are written in the carrier algebra:

{{fig:s02_ops}}

It types cleanly (every `back` returns the same `Grad`), it is immutable, and its two accumulations at a fan-out are independent function calls that Fortress evaluates in parallel (operands of an operator are evaluated in separate implicit threads, `basic/expressions/operator-app.tex:59`). It is also exponential: a value used twice has its `back` called twice, and each call re-walks everything upstream. Measured on a residual chain of depth *k* (`probes/s03_*`), forward and backward, milliseconds per pass:

| depth k | 1 | 2 | 4 | 6 | 8 | 10 |
|---|---|---|---|---|---|---|
| tape | 53 | 32 | 46 | 75 | 68 | 198 |
| functional | 45 | 45 | 135 | 481 | 1872 | 6950 |

A transformer layer has about thirty fan-outs on the path from the loss to the embedding (the residual stream, the three uses of the normalized input, the four head slices of each of *Q*, *K*, *V*, the two uses inside each normalization and softmax). The functional shape is the right mathematics (it is Elliott's *simple essence of automatic differentiation* written with closures) and the wrong data structure for a shared graph; the fix, memoizing the cotangent at each node, is the tape.

**The expression tree** (one object type per operation with a `backprop` method) was sketched and not built: it renders the same equations as the tape's closures and repeats the adjoint field in every object.

**The decision.** The flagship engine is the tape, with two changes taken from the functional skeleton: adjoints are carriers, so the backward maps are written in the forward algebra (`G Bᵀ`, `Aᵀ G`), and the maps are closures on the parent's adjoint, `fn G => do A.grad += G B^T; B.grad += A^T G end`, which removes the dependency-object zoo. Mutation is confined to the adjoint accumulators of the nodes of one step's graph: the parameter record, the moment estimates and every value are immutable, and a training step is a pure function from `(θ, m, v)` to `(θ, m, v)` (§5).

### 4.7 Where the scalar form reads better

The brief asks that pairs which read better in the scalar form be shown in both. The blinded run's figures (`explorations/blinded-fable/figures/`) and the open run's (`explorations/fortify/`) are reproduced here unchanged, with their sources in those directories.

*RMSNorm.* The scalar program iterates the elements, `∑_{x_i ← x} x_i²`, which is the paper's Σ; the matrix program writes `x·x`. The scalar Σ is closer to the paper's glyphs; the matrix form is closer to the paper's *shape* (one stacked fraction under a radical) and is the one that differentiates as a single node.

{{svg:prior_blinded_rmsnorm}}

*Softmax.* The two are the same formula; the scalar version needs a `Vec(⟨…⟩)` constructor around each comprehension, the matrix version needs none. The open run's bound `Z` reads well too.

{{svg:prior_blinded_softmax}}

*Attention.* The scalar programs write attention per position, `α = softmax((K_{0:t} q_t)/√d_h); α V_{0:t}` (blinded) or `softmax(q Kᵀ/√d_k) V` (open run): the per-token line of the reference. The matrix program writes the paper's `softmax(QKᵀ/√d_k + M) V`. Both are literature lines; they are different lines of the literature, and the reader should see both.

{{svg:prior_ours_attention}}

*The layer.* The scalar layer needs `Mat(⟨W_q x | x ← X⟩)` where the matrix layer writes `X W_qᵀ`, and `(heads_h)[t]` where the matrix layer writes `Q[:, c]`; the matrix layer is shorter and closer to the paper at every line. The scalar figure is reproduced for the comparison.

{{svg:prior_blinded_layer}}

*Autodiff.* The scalar `Value` table is the reference's own table and reads as such; the matrix table is a different, larger set of rules. Neither is "closer": they are the two levels at which the literature states backpropagation.

{{svg:prior_blinded_value}}

*Adam.* The scalar Adam is an index loop over parameters, the matrix Adam is the paper's five lines over the whole parameter record (§5.2). This pair reads better at the matrix level.

## 5. Training and sampling

### 5.1 Parameters as a record

{{fig:v2_params}}

The parameters are the reference's `state_dict`: a map from a name to a matrix. The elementwise algebra Adam needs is declared once over the record (a `+`, scalar multiples, `⊙`, division, `√`, `+ ε`), so the optimizer is written over θ as a whole. The record is immutable; `each` and `zip` build new ones. Building it by a map comprehension fails on matrices of different shapes (gaps row 87), so `record` folds.

{{fig:v2_build}}

`build` makes one step's parameter nodes from the record, `names` fixes the order the reference's `state_dict` uses, and `grads` reads the accumulated adjoints back into a record after `backward`.

### 5.2 Adam

{{pair:adam|adam|v2_adam}}

This is Algorithm 1 of Kingma & Ba, line for line, over the whole record: *g ⊙ g* is the paper's own footnote for *g²*, the hats are Fortify's rendering of `m_hat`, `v_hat`, and the update is a pure function returning the new triple. The reference's `eps_adam = 1e-8` is the `epsilon` field (an object field may shadow the top-level `epsilon` of RMSNorm; the spec permits exactly this shadowing, gaps row 92). The learning rate decays linearly:

{{math:eta}}

### 5.3 The training loop

{{fig:d_train}}

Each step tokenizes one document, builds the graph, runs the loss and `backward`, and replaces `(θ, m, v)` by Adam's result. The bounded demo (`checks/train_demo_output.txt`) trains from the reference's initial weights on the first documents of the shuffled dataset for twelve steps, single-threaded; the first two losses are the reference's own (3.3660, 3.4243), and the run took 60 seconds:

{{pre:checks/train_demo_output.txt}}

The four names at the end are sampled with Fortress's own uniform draws, so they differ from run to run; the three samples checked against the reference are in §6.

### 5.4 Sampling, the tokenizer, and initialization

{{pair:sample|inference|v2_sample}}

{{fig:d_sample}}

Inference feeds the model its own output: each new token is drawn from the softmax of the last position's logits divided by a temperature. The reference's `random.choices` picks by bisecting the cumulative weights, normalized by their total; `pick` states the same rule as a count, the number of prefix sums not exceeding the draw times the total, capped at the last index. Replaying the reference's recorded draws through `pick` reproduces its tokens exactly (§6).

{{fig:v2_tokenizer}}

{{py:tokenizer}}

{{fig:v2_init}}

{{py:params}}

The Gaussian initializer is Box–Muller over the library's uniform `random`; the spec's constant `pi` is not defined in the library (gaps row 98), so the numeral stands in. The verified runs start from the reference's own initial weights (imported through the data component), so the initializer is exercised only by the smoke test.

## 6. Verification

### 6.1 What is compared

`build/Check.fss` (composed by `tools/build.py` from the core without its test region, and `src/check_main.part`) runs the reference's configuration on the reference's data for two training steps and three samples and compares, per step: every logit at every position (27 × 7 and 27 × 8), every probability, every per-position loss, the loss, every gradient of the nine parameter matrices (4,192 values), every Adam-updated parameter (4,192 values); and per sample: the probabilities at every step, the chosen tokens with the reference's uniform draws replayed, and the text. Fifty-three named checks, about 18,000 scalar comparisons.

### 6.2 Tolerance

The tolerance is 10⁻¹² absolute. A matrix-level program cannot be bit-identical to the reference: the reference sums with Python's left fold, Fortress's Σ combines in the generator's tree order (`basic/expressions/reductions.tex`); the library's matrix product partitions its loops recursively (`FortressLibrary.fss`, `Matrix.mul`), which associates the same products differently from `sum(wi * xi for ...)`; RMSNorm divides by a square root where the reference multiplies by a reciprocal power; the attention scores are one matrix product and one scaling where the reference computes a per-position sum and divides. Each of these moves the last bit or two of a double. The observed maxima are 3.3·10⁻¹⁶ (logits), 4.4·10⁻¹⁶ (loss and per-position losses), 2.1·10⁻¹⁷ (gradients) and 1.9·10⁻¹⁶ (parameters after Adam): four orders of magnitude under the tolerance, which is itself well under the smallest quantities compared (the smallest nonzero gradient entry in the goldens is 2.9e-07, the smallest probability 1.3e-02). The three samples' probabilities agree to 8.3·10⁻¹⁷ and the tokens are identical, which exercises the cumulative-sum boundary of `pick`, not only the probabilities.

### 6.3 Results

{{pre:checks/check_run_output.txt}}

The same component with `FORTRESS_THREADS=4` (`checks/check_run_threads4_output.txt`) gives the same verdict on every check, 27 s wall against 46 s: the head comprehension, the row lifts and the operands of every product run as implicit threads, and no accumulation is shared between them (the backward maps of one node run in one thread; the id counter is `atomic`). The finite-difference checks of the engine are in the core's smoke test (`src/MicroGPT.fss`, `(* TESTS *)`: 1.6·10⁻¹⁰ on three parameter entries at the reference's configuration) and in the two skeletons (§4.6).

### 6.4 Cost and size

One training step of the check takes about 9 s at one thread and 6 s at four on the walk interpreter (the reference's scalar design took about 40 s per step in the blinded run's measurement, on the same interpreter). The interpreter is two to three orders of magnitude slower than CPython on this workload (`explorations/performance-roadmap.md`); speed dictated no spelling here.

Lines, under one rule (`tools/linecount.py`: block comments and blank lines removed; the component header and the test region removed from the Fortress core; docstrings, comments and print-only lines removed from the Python):

| program | lines |
|---|---|
| reference `microgpt.py` | 148 |
| this run's core, `src/MicroGPT.fss` | 237, of which engine 103, model 40, training 67, helpers 27 |
| check driver / demo driver | 97 / 44 |
| blinded run's core (scalar) | 156 |
| Astra's core (scalar) | 248 |
| open run's core (scalar) | 258 |

The model itself is 40 lines; the differentiation engine at three ranks is what the matrix level costs, and the parameter record is what a functional optimizer costs.

## 7. What the language gives, what the definitions add, what remains

### 7.1 The mechanism inventory

Before the representations were fixed, one pass over the specification's table of contents produced `mechanisms.md`: 46 mechanisms, each marked used, considered (with the reason it lost), unavailable in this tree (with the ledger row or probe), or not applicable. The ones this program stands on: the component algebra's `except` import (Σ), generators and reductions (rows of a matrix as a generator, Σ over positions), big-operator declarations (the one nullary Σ and the prefix Σ on vectors), getters and setters (the lazily allocated adjoint), varargs functions (the factories), postfix operator declarations (`^T`), subscript operator methods (`X[tokens]`, `X[:, c]`, `X[t, j]`), the overloading rules as a constraint (the carriers are disjoint objects because two overloads on unrelated library traits are rejected), tuple parallelism, and the rendering rules (every Greek letter and hat on this page is a name chosen for Fortify). The ones that would have served and are not available: matrix unpasting (`[Q_1 Q_2 Q_3 Q_4] = Q` for the heads), array pasting at runtime sizes (`[head_1 head_2 …]`), coercion (the constant lifts), type aliases (the array types in the plumbing), reduction variables, properties, and the `pi` and `∞` objects.

### 7.2 The departures

Every place where the rendered Fortress still differs from the formula beside it, classified. *IG* implementation gap · *LG* library gap versus the spec · *LB* library bug · *DL* design limit (the spec's) · *JC* justified choice · *TS* typesetter.

| # | departure | class | reproducer / row |
|---|---|---|---|
| 1 | `A.v B.v`: the forward value of an operator is computed on the nodes' `.v` fields, not on the nodes | JC | a node is not its value: the library's `Vector`/`Matrix` are sealed to `Number` (ledger rows 22, 52–53), so a carrier cannot extend them and must hold an array |
| 2 | `mat(value, fn G => …, A, B)`: the children after the backward map | DL (Meet Rule) | gaps row 84; `probes/c15_factory_overloads.fss` vs `c15b` |
| 3 | `SUM[t <- 0#n]`, `BIG MAX[z_i <- z] z_i`: bounds as generator clauses, `MAX` set as a word | DL / TS | Fortress's Σ syntax (ledger row 65); the prefix `BIG MAX z` finds no overload (gaps row 88) |
| 4 | `e/(SUM e)`, `(Q K^T)/(SQRT d_k)`: the reduction and the divisor parenthesized | DL / TS | ledger row 6; the tight `/(` is what sets the fraction (adopted from Astra's render) |
| 5 | `(x DOT x)/(|x|)` for (1/d)Σx_i² | DL + JC | `/|` lexes as one token (gaps row 91); the dot product is the differentiable node, the elementwise Σ is not |
| 6 | `stack(⟨rmsnorm(x) | x <- X⟩)`: an explicit row lift instead of broadcasting | JC | the library has no broadcasting; the lift is the paper's "applied to each position" |
| 7 | `Q[:, c]` with `c = (h d_h) # d_h` instead of `Q_h`, `W_q^{(h)}` | JC | the reference slices columns; per-head weight matrices would render `(W_q)[h]` because `W_q[h]` typesets as a double subscript (ledger row 62) |
| 8 | `concat(⟨head(h) | h <- 0#n_head⟩)` instead of `Concat(head_1, …, head_H)` or `[head_1 … head_H]` | TS / IG | `BIG ||` typesets literally (this run's and the blinded run's figures); matrix pasting fails (gaps row 96) |
| 9 | `mask(|Q|)` as a function of the length | JC | the mask depends on *n* |
| 10 | `-(1/n) (SUM …)` and `P[t, y[t]]` in brackets | DL / TS | ledger row 6; a subscript with a subscripted index is not set as a subscript |
| 11 | `10.0^(-5)`, `10.0^(-8)` | DL | no exponent numerals (ledger rows 14, 16) |
| 12 | `beta1`, `beta2`, not `beta_1` | TS | `beta_1` sets literally; a numeral suffix subscripts (ledger row 66) |
| 13 | `Array[\RR64,(ZZ32,ZZ32)\]` spelled out in the carriers and the record | IG | type aliases unimplemented (ledger row 18) |
| 14 | `<|[\Node\] c | c <- cs|>`, `{[\String, …\] }`: static arguments on aggregates | IG | ledger row 20 |
| 15 | `.grad` accessor and `self.grad` inside the objects | JC / DL | Karpathy's name; a getter is not a naked name (gaps row 94) |
| 16 | `record` by a fold; `grads` by a loop | IG | the map comprehension over matrices of different shapes (gaps row 87) |
| 17 | `(g ODOT g)` for g² | JC | `M^2` is a matrix power in the spec (`opr-overview.tex`); Kingma & Ba define g² as elementwise |
| 18 | `pick` as a count with `MIN` | JC | the reference's bisection stated as arithmetic |
| 19 | the Σ reduction typed over `Any` | JC | ledger rows 40, 45; one nullary declaration per program |
| 20 | `3.141592653589793` | LG | gaps row 98 |
| 21 | `hadamard`, `positive`, `rowInto`, `entryInto`, `colsInto`, `scatter` helpers on raw arrays | LG | no elementwise product on `Matrix` (gaps row 99), no scatter |
| 22 | `x <- X` allocates a row node per row | JC | the differentiable rows are the point |
| 23 | no `requires` shape contracts on the operators | JC | contracts work (gaps row 106) and would add a line to every rendered pair |
| 24 | `d_k = cols(Q)` bound in a `do` block | JC | the paper's *d_k* is a symbol, here a size read from the argument |

### 7.3 New rows for the ledger

`gaps.md` records 25 rows in the ledger's format: the overloading rule that shapes the design (row 84), the silent unbound array literal (row 95, a defect that produces no error), matrix pasting and unpasting (96–97), the map comprehension over shapes (87), the `BIG UNION` collision between `Set` and `Map` (86), the `pi` object (98), and the positive rows the engine stands on (100–107). Ledger row 9 is sharpened: the leading `||` on a continuation line fails as the trailing one does, and the parenthesized expression is the form that works.

### 7.4 Independent reproduction

Eighteen of these claims were handed to a worker as goals to achieve, with the specification, the library and its own probes, and without this run's probes, source or reasoning (`probes/worker/BRIEF.md`). Its report is `probes/worker/REPORT.md`; the last column of `gaps.md` records, per row, whether the worker's finding agreed. (The worker was still running when this page was first built; its verdicts are filled in below.)

### 7.5 For the revival worklist

In the order of rows closed: the join of two `nat` instantiations of one generic object (row 87, which would also let list literals of mixed-shape matrices type); the silent unbound literal (row 95); an elementwise product and a `pi` and `∞` object in the library (rows 98–99, 104); matrix pasting at runtime sizes (row 96); the prefix big-operator inference (row 88); the `ZeroIndexed` abstract subscript (row 85).

## 8. Process and standards

Everything under `explorations/run-b/` is the process record: 30 probes with their outputs (`probes/`, failures kept, error text verbatim), the two skeletons and their depth measurement, three rendered sheets of candidate spellings (`figures/x00`–`x02`) that were inspected before the design was fixed, the worker's directory, the composed check and demo (`build/` is regenerated by `tools/build.py`), and the goldens with the script that derived them. The session transcript is the decision log.

What is established: the correspondence, by eye, for every definition of the model and of the optimizer, since the figures are the program and the program reproduces the reference to the last few bits; the parallel safety of the program at four threads, on one machine. What is not: anything about Fortress at scale or on its bytecode compiler (which has none of the library types used here, ledger rows 71–74); conformance of the program to the static type system, which the interpreter does not run (ledger row 69), and against which the `Any`-typed Σ and the untyped closure parameters are the known holes; and any claim beyond this one specimen.

### Reproduce

```
bash experiment/setup.sh && source experiment/env.sh
cd explorations/run-b
python3 reference/derive.py 2 3          # needs reference/microgpt.py (pinned) and reference/input.txt
python3 tools/gen_data.py                # -> src/MicroGPTData.{fsi,fss}
python3 tools/build.py check_main.part Check && python3 tools/build.py train_main.part Train
cp src/MicroGPTData.fs? build/ && cd build
JAVA_FLAGS="-Xmx4g -Xss64m" $FORTRESS_HOME/bin/fortress Check.fss     # 46 s, ALL CHECKS PASSED
JAVA_FLAGS="-Xmx4g -Xss64m" $FORTRESS_HOME/bin/fortress Train.fss     # 75 s, 12 steps and 4 samples
cd .. && python3 tools/figs.py src/MicroGPT.fss v2 && python3 tools/build_article.py
```
