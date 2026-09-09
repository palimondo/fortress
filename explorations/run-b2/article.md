# microGPT in Fortress, at the matrix level

<p class="lede">A 4,192-parameter GPT, trained and sampled by a running Fortress program whose typeset definitions are meant to be read beside the formulas of the transformer papers. Differentiation happens on whole matrices, functionally: every node carries its value and its pullback, and a gradient is a sum of environments. Two training steps, every gradient, the Adam update and three replayed samples agree with Karpathy's pinned microgpt.py to the last digit.</p>

This is the second informed run (Run B2) of an experiment on Fortress's founding claim, that a program can be written in the notation of the paper it implements. The earlier runs, two blinded and one open, are in this tree beside their reviews. This run had all of them and the merged gap ledger, and the project's standing decision that the flagship differentiates at the matrix level. What it adds is the design that decision asked for, built and verified.

How to read the pairs below. Each definition of the model appears three ways: the formula as the papers write it, typeset with LaTeX; the reference Python, quoted verbatim from the pinned source; and the Fortress definition, typeset by the language's own Fortify tool from the actual program text, with the ASCII that was typed one click away. The formula and the Fortress render go through the same LaTeX and dvisvgm pipeline at the same size, so the eye compares like with like.

## The result in numbers

| what | value |
|---|---|
| reference | `microgpt.py` gist revision `14fb0388…`, sha256 `d47d88c2fd432c8ebdc1048beab7f7eb64ea7e0e664e11b812d72a6d95ebccee` |
| model | 1 layer, 4 heads, d = 16, block 16, vocabulary 27, 4,192 parameters, the reference's own initial weights and document order |
| golden steps | 2, on the documents `yuheng` (7 positions) and `diondre` (8 positions) |
| logits, per-position losses, loss | max abs diff 2.2e-16, 4.4e-16, 8.9e-16 |
| all nine gradients | max abs diff 1.1e-16 (wte, wpe, lm_head), below 2.1e-17 (attention and MLP matrices) |
| learning rate, parameters after Adam | exact; max abs diff 1.4e-16 |
| samples with the reference's uniform draws replayed | 3 of 3 identical, token for token (`org`, `stclyzqwpactmmcx`, `ku`) |
| a third step, checked once against a three-step golden | loss 3.177802125458053 against 3.177802125458052 |
| speed | about 13 s per training step on the walk interpreter: the forward pass about 1 s, forward plus backward about 10 s, the Adam sweep the rest |
| program | `src/MicroGPT.fss`, about 200 lines: carriers 38, differentiation 54, model 27, Σ 5, Adam 10, tokens, training and sampling 34, the rest comments |

The checker (`src/MicroGPTCheck.fss`) declares a tolerance of 1e-9. The measured agreement is at machine epsilon because every sum in this program runs over the same index range in the same order as the reference's sequential `sum`: the library's inner products and this program's `SUM` reductions are evaluated in index order on one thread. The tolerance is there for the day the reductions run in parallel, when the order changes and the last bits with it; nothing in the mathematics is sensitive at 1e-9.

## The reference and the goldens

The reference is Karpathy's microGPT: a dependency-free Python file with a scalar autograd (`Value`), a one-layer transformer with RMSNorm, four attention heads with a key/value history, a ReLU MLP, cross-entropy, Adam with bias correction and linear learning-rate decay, and temperature sampling. The gist revision is pinned and its hash recorded above; the goldens were derived here by executing that source verbatim up to its training loop and then running two steps of an instrumented copy of the loop (`tools/derive_goldens.py`), recording tokens, logits, per-position losses, the loss, the learning rate, every parameter gradient and every parameter after the update, then three samples with the uniform draws consumed by `random.choices`. The derivation agrees field for field with the goldens the earlier blinded run derived independently (`checks/goldens_2steps.json` against `explorations/blinded-fable/checks/checks_2steps.json`). A generator turns the JSON into a Fortress component, `src/MicroGPTRef.fss`, in the reference's own layout, so the convention bridge to this program's form is visible in the checker rather than hidden in a tool.

## What a GPT computes, definition by definition

The reference processes one token at a time and keeps the keys and values of earlier positions in a list. The papers state the same computation for the whole sequence at once: the input is a matrix X with one row per position, and attention over the history is a matrix product with a causal mask. This program takes the papers' form. It also takes their row-vector convention: a linear map is written X W, so each of the reference's (out × in) matrices, which it applies as W x to a column vector, enters this program transposed, and a head's projection is the transpose of its row block of the reference's wq, wk, wv. The mathematics is identical; the checker undoes the transposition before comparing.

### Tokens and embeddings

{{math:f_tokens}}
{{math:f_embed}}
{{py:155-158}}
{{py:108-112}}
{{fig:def_tokenize}}
{{fig:def_embed}}

The subscript on a bold matrix is a gather of rows: `_We[tokens]` is a node whose value is the rows of the embedding matrix at the token ids and whose pullback scatters the cotangent rows back, summing where a token repeats (the Σ with the filter `ts[t] = v` in the `Node` definition further down). The leading underscore is Fortress's own spelling for a boldface identifier, so `_We` is **We** as the papers set their weight matrices. The reference applies RMSNorm to the embedding once before the layer; the program does the same.

The tokenizer's `uchars.indexOf(c).get` is the library's own `Indexed.indexOf`, which returns a `Maybe`; the reference calls `uchars.index(ch)`. The comprehension keeps the document's order (a parallel `for` over a string would not, `probes/g4i_order.out`).

### RMSNorm

{{math:f_rmsnorm}}
{{py:103-106}}
{{fig:def_rmsnorm}}

The row-wise normalisation is the first place where the matrix-level form costs notation. The formula is stated per vector; at the matrix level every row has its own r, and the program writes the matrix entry by entry with an index function. The scalar programs in this tree read closer to the formula here, because a vector is the unit and Σ runs over it directly. The blinded run's definition, typeset from its source:

{{svg:blinded-fable/figures/gpt_rmsnorm.svg}}
{{tic:blinded-fable/figures/gpt_rmsnorm.tic}}

That is the evidence the project asked for and it stands: for a per-vector formula, the vector-level program is the closer read. What the matrix-level definition buys is in the second half of its own figure: the backward rule, which the scalar programs never write because their tape derives it. Here it is one equation, X̄(Ȳ) = …, beside the formula it implements:

{{math:f_rmsnorm_b}}

### Attention

{{math:f_attention}}
{{math:f_causal}}
{{py:129-131}}
{{fig:def_attention}}
{{fig:def_causal}}

This is the pair the design was aimed at. Q Kᵀ is a juxtaposition and a user postfix operator `^T`; the fraction is Fortify's own rendering of a tight `/`; the mask M is the −∞ upper triangle the papers describe in words. The reference has no mask because it never forms the matrix: it loops over the history and only sees keys up to the current position. The two are the same computation, and the goldens confirm it row by row.

### Heads and their concatenation

{{math:f_head}}
{{math:f_mha}}
{{py:123-134}}
{{fig:def_head}}
{{fig:def_mha}}
{{fig:def_concat}}

The reference slices the query, key and value vectors into head-sized pieces. The papers instead give each head its own projection matrices, and this program follows the papers: `_Wq[h]` is head h's projection, so `head(X, h)` is the formula with no slice or view. The concatenation is a user function that fills the wide matrix from the heads' columns, because the specification's array pasting `[ h1 h2 h3 h4 ]` and its matrix unpasting are not available on this interpreter (a rank-one paste fails on an extent check, non-square blocks are read transposed, unpasting reports "not yet implemented"; `probes/g1d_*`). Its pullback is Σ over heads of each head's pullback on its column block, which is the first Σ over gradient environments in the program.

### The feed-forward network

{{math:f_ffn}}
{{py:136-141}}
{{fig:def_ffn}}
{{fig:def_relu}}

### The block and the residual stream

{{math:f_block}}
{{py:114-117}}
{{fig:def_block}}

The residual stream is named X′ (the prime is part of the identifier). The reference's `x_residual` variable and re-assignments are the same two additions.

### Logits, softmax and the loss

{{math:f_logits}}
{{math:f_softmax}}
{{py:143-144}}
{{py:97-101}}
{{py:163-169}}
{{fig:def_logits}}
{{fig:def_softmax}}
{{fig:def_nll}}

Softmax is row-wise with the stabilising shift, exactly the reference's three lines lifted to a matrix. Like RMSNorm it is written entry by entry, and again the scalar form reads closer for the forward pass; the blinded run's version:

{{svg:blinded-fable/figures/gpt_softmax.svg}}
{{tic:blinded-fable/figures/gpt_softmax.tic}}

The loss is the negative mean log-probability of the targets, written once as the formula and once as its own pullback P̄. Keeping softmax and the loss as two nodes, rather than fusing them into a cross-entropy with the textbook P − Y gradient, keeps each definition beside one formula; the chain rule composes the fused gradient by itself.

## Differentiation at the matrix level

The reference hangs the graph on the number: every scalar is a `Value` with a mutable `grad` slot and a list of children, and `backward` walks a topological order. The project decided that the flagship hangs the graph on the computation instead, over whole matrices, with immutable data as far as the mathematics allows. Three shapes were built as skeletons on one finite-difference test (a loss over `relu(X W + X) Uᵀ`, with X used twice so that fan-out is exercised), all three agreeing with central differences to 1e-10 (`probes/skelA.out`, `skelB.out`, `skelC.out`), and rendered before choosing.

### Shape A: a tape of backward closures

{{fig:skelA_engine}}

This is the shape the earlier probes had established. Every rule is an assignment into a gradient slot, and the engine needs a global tape, a recorder and a reversed loop. Nothing in it reads as a formula.

### Shape B: functional backprop

{{fig:skelB_engine}}

Each node is its value and its pullback: the linear map from the node's cotangent C̄ to a gradient environment, a map from parameter name to cotangent. Environments add, so a value used twice contributes twice by a sum and nothing is mutated or ordered. The product rule is now the chain rule as the papers state it. What remains noisy is the raw array type everywhere and the library's method names for transpose and scaling.

### Shape C: the value carrier separated from the node

{{fig:skelC_engine}}

Shape B with a plain `Mat` that owns the papers' operators, so the raw array type appears once. This is the shape the program uses. Its cost is stated plainly: at a node that is used twice, the pullback is entered twice, so work repeats along every path from the loss to a leaf. In this one-layer model the checker measures the forward pass at about 1 s and forward plus backward at about 10 s (`checks/check_run.txt`). A tape's backward costs about twice its forward, so most of the difference is the price of this shape: the repeated pullbacks at the shared nodes, and the backward rules written entry by entry with a Σ inside each entry. A tape avoids the repetition at the price of mutation and ordering; memoising the pullbacks would recover it without either, and was not built. An expression tree walked in reverse is shape C with the closures replaced by a tag and a `case`, and was not built separately.

### The node and its rules

{{math:f_chain}}
{{fig:def_node}}
{{math:f_matmul_b}}
{{math:f_add_b}}
{{fig:def_rules}}
{{math:f_relu_b}}
{{math:f_softmax_b}}
{{math:f_nll_b}}
{{math:f_gather_b}}
{{math:f_concat_b}}

The rules for the row-wise operations are in their definitions above (`rmsnorm`, `softmax`, `nll`, `concat`): each binds its value, then states its pullback as a local function named for the cotangent it produces, X̄(Ȳ) = …, and returns the node. In the binary rules the cotangent flows through `A.pull` and `B.pull`, which are the upstream pullbacks; the sum of two environments is `Map.union` with `+` on the overlapping keys.

### Σ over anything

{{fig:def_sum}}

The library's `SUM` is sealed to `Number` (ledger rows 44 and 45). The specification's `except` clause on the library import hides its `BIG +`, and one five-line reduction object reopens Σ to matrices and to gradient environments (rows 41 and 46). Every Σ in the program, over scalars in RMSNorm and softmax, over positions in the loss, over heads in the concatenation's pullback, is that one operator.

## The carriers

{{fig:def_mat}}
{{fig:def_params}}

What the language gives: a runtime-sized matrix from `array[\RR64\](n, m)` that dispatches as the library's `Matrix`, with `+`, `-`, juxtaposition as the product, `scale`, `t()`, `map` and `ivmap` (ledger rows 52 and 57); generators, comprehensions and big operators; closures; `value object`; operator declarations including postfix, prefix and enclosing forms; a `Map` with a combining union; and rendering rules that set `_W` bold, `x_bar` as x̄, `m_hat` as m̂, `d_k` with its subscript, `SUM` as Σ and `ODOT` as ⊙.

What the user level adds, and why: `Mat` exists to name the array type once, since `type` aliases are specified but unimplemented (row 18), and to spell the library's `t()` and `scale` as `^T` and juxtaposition and add ⊙, elementwise `/` and √. `Params` exists so that θ, ∇θL and Adam's moments are one kind of thing with `+`, `-`, ⊙, `/` and √ over the whole family, which is what makes Adam four lines. `Node` and its rules are the differentiation engine, 54 lines. The Σ object is five.

Where a mismatch remains: the node's value is reached as `.data` and its pullback as `.pull`, so the backward rules carry those two words the formulas do not; a superscript cannot follow a dotted field directly (`(B.data)^T`, a parser gap, `probes/g4a_*`); a list element cannot be followed by a field or a superscript without parentheses (`(hs[h])`, rows 1 to 3); a reduction cannot be an infix operand without parentheses (row 6); and the row-wise operations are written entry by entry because the library has no row broadcasting.

## Adam, training and sampling

{{math:f_adam}}
{{math:f_lr}}
{{py:174-182}}
{{fig:def_adam}}
{{fig:def_train}}

Adam is the formula on whole parameter families; m̂ and v̂ are the identifiers `m_hat` and `v_hat`. The reference loops over a flat list of scalars and clears each gradient; here the gradient is a value returned by the loss, so there is nothing to clear.

{{math:f_sample}}
{{py:186-200}}
{{fig:def_sample}}

Sampling replays the reference's random stream: `random.choices` draws one uniform number per token and picks the first index whose cumulative weight exceeds it, and `choose` does the same with the recorded draw, which is how the three samples come out identical. The demo below draws from the library's own generator instead.

### A bounded training run

Twelve steps from the reference's initial weights on its shuffled documents, then five samples (`src/MicroGPTDemo.fss`, output in `checks/demo_run.txt`). The first two losses are the golden ones; the third was checked once against a three-step derivation. The interpreter is two to three orders of magnitude slower than CPython on this workload, so the run is short and the samples are what twelve steps buy.

{{txt:checks/demo_run.txt:19}}

## The by-eye judgement, pair by pair

| pair | reads as the formula? | what differs, and why |
|---|---|---|
| attention | yes | `causal(Q.rows)` names the mask instead of a free M; the mask depends on T |
| head | yes | `_Wq[h]` for W^Q_h: an identifier cannot carry a superscript, and the bold subscripted form is what the rendering rules give |
| multi-head | yes | `concat(⟨…⟩) _Wo` for Concat(head₁, …) W^O |
| feed-forward | yes | `relu(X _W1) _W2` for max(0, X W₁) W₂ |
| block | yes | X′ is an identifier; the papers leave the intermediate unnamed |
| embedding | yes | `_Wp[positions]` spells the position ids as a list |
| logits and loss | close | the loss is `nll(softmax(…), targets)`; the formula's −(1/T)Σ log is inside `nll` |
| softmax | close | entry by entry with an index function; the scalar programs read closer for the forward pass |
| RMSNorm | close | as softmax; the backward rule is one equation beside its formula |
| Adam | yes | identical line by line |
| backward rules | yes | Ā = C̄ Bᵀ, B̄ = Aᵀ C̄ as `A.pull(C_bar (B.data)^T) + B.pull((A.data)^T C_bar)`; `.data`, `.pull` and two pairs of parentheses are the noise |
| tokenizer | yes | `uchars.indexOf(c).get` for `uchars.index(ch)` |

## Departures from the papers' notation

Every notational departure that remains, classified. Reproducers are under `probes/`; ledger rows are in `explorations/fortress-gap-ledger.md`; new rows are in `gaps.md` beside this article.

| departure | class | evidence |
|---|---|---|
| `(Q K^T)/(SQRT d_k)` needs its parentheses to set as a stacked fraction; the loose `/` sets inline | typesetter | `figures/variants.png` |
| `(B.data)^T`: a superscript cannot follow a dotted field access | implementation gap (parser) | `probes/g4a_*`; spec grammar admits it |
| `(hs[h]).pull`, `(hs[0]).rows`: a list element cannot be followed by a field | implementation gap | ledger rows 1 to 3 |
| `transpose(mat(…))` in the checker: a superscript cannot follow a call's argument list | design limit | ledger row 4 (the spec's own static error) |
| `_Wq[h]` for W^Q_h | typesetter | rendering rules, appendix D.1 |
| `X'` for the residual stream: `X1` sets in roman | typesetter | `probes/../figures/g1f_render.png`; Fortify deviates from the spec's rule (c) |
| `positions` as a list rather than `_Wp[0 # T]` | design limit | two subscript overloads on `List` and `Range` need an `excludes` pair (Meet Rule, `advanced/overloading.tex:224-272`, ledger row 33); a user trait with `excludes` or a `typecase` would admit both, `probes/g4e_*` |
| `concat` by a fill instead of `[ h1 h2 h3 h4 ]` | implementation gap | `probes/g1d_*`: rank-one pasting and non-square blocks fail; unpasting unimplemented |
| `SUM` redeclared over `Any`; Unicode ∑ is not an accumulator | library gap vs spec; implementation gap | ledger rows 41, 44, 5 |
| `(SUM[…])` inside an infix expression | design limit | ledger row 6 |
| `pull` as a method over the `pullback` field: `A.pullback(x)` is a method invocation by the spec's dotted-chain rule, so a field holding a function needs `(A.pullback)(x)`, `A.pullback (x)` or a method | design limit | `probes/g4d_*`; `basic/operators/juxtameaning.tex` |
| `-infinity` from `import Constants.{...}` rather than the spec's `∞` object, which never shipped | library gap vs spec | `probes/g4h_*`; `basic/expressions/literals.tex:225-228`; `Library/Constants.fss:17` |
| `10.0^(-5)` for 1e-5 | design limit | ledger rows 14 and 16 |
| `Transformer` rather than `GPT` | design limit | ledger row 7: an all-capital word is an operator |
| `data` for the node's value: `value` is reserved | design limit | ledger row 8 |
| `epsilon_adam` beside `epsilon` | naming | two constants named ε in the reference |
| entry-by-entry row operations | design limit (library) | no row broadcasting in the shipped `Matrix` |
| `value object` declared, not enforced | implementation gap | `probes/g1a_varfield.out`: a `var` field in a value object is accepted; `probes/g1a_equality2.out`: value equality degenerates |
| the checker's postfix `^T` declared locally: an API cannot declare a superscripted postfix operator | NEGATIVE-BOUNDED | `probes/apix/`: one spelling has a recorded failure; the API grammar (`Parameter.rats:172-175`, a missing `/` beside `ExponentOp`) predicts both, see `gaps.md` |

## Language facts the program relies on, with their marks

<span class="mark">POSITIVE-VERIFIED</span> means a run whose output is in `checks/` or `probes/`; <span class="mark">NEGATIVE-VERIFIED</span> means the specification settles it and a reproducer confirms; <span class="mark">NEGATIVE-BOUNDED</span> means the spellings tried are listed and are not exhaustive.

- <span class="mark">POSITIVE-VERIFIED</span> A runtime-sized `array[\RR64\](n, m)` carries the full matrix algebra, and closures over it compose (`checks/check_run.txt`; `explorations/matrix-ad-probes`, ledger rows 52, 57).

- <span class="mark">POSITIVE-VERIFIED</span> A functional-method operator inside a user object is visible to library generic code, so `PlusReduction.join` reaches `Mat.+` and `Params.+` (`checks/check_run.txt`; ledger row 31).

- <span class="mark">POSITIVE-VERIFIED</span> `Map.union` with a combining function, map comprehensions with explicit static arguments, and `for (k, v) <- seq(m)` (`probes/g1e_*`).

- <span class="mark">POSITIVE-VERIFIED</span> Value objects and value traits are accepted; the interpreter enforces only that a non-value type cannot extend a value type, does not reject a `var` field, and compares fieldwise only when the body declares a field (`probes/g1a_*`).

- <span class="mark">POSITIVE-VERIFIED</span> Function and method contracts are checked and throw `CallerViolation` and `CalleeViolation`; a bare `ensures` without `provided` crashes the desugarer (`probes/g1b_*`). Not used in the program, so as not to add clauses to the definitions the reader compares.

- <span class="mark">POSITIVE-VERIFIED</span> `test` functions run under `fortress test` and not under `fortress`; generator test declarations, `property` declarations and `TestSuite` are unimplemented (`probes/g1c_*`). The checker is a separate component importing the core through its API instead.

- <span class="mark">POSITIVE-VERIFIED</span> A component exports an object with operators through an API and another component imports it (`probes/apix/`).

- <span class="mark">POSITIVE-VERIFIED</span> Untyped closure parameters (`fn (i, j) => …`) are accepted where an arrow type is expected (`checks/check_run.txt`).

- <span class="mark">POSITIVE-VERIFIED</span> The rendering rules for `_W`, `x_bar`, `m_hat`, `d_k`, `x17`, `^T`, `SUM`, `ODOT`, `SQRT` and a tight `/` (`figures/g1f_render.png`, `figures/variants.png`).

- <span class="mark">NEGATIVE-VERIFIED</span> Pasting of a single row of blocks, pasting of non-square blocks, and unpasting (`probes/g1d_*`; spec `basic/matrix-unpasting.tex:15`, `basic/expressions/aggregate.tex:15`).

- <span class="mark">NEGATIVE-VERIFIED</span> A superscript after a dotted field access is grammatical and unparsed (`probes/g4a_*`; `concrete-syntax.tex:948-953`, `juxtameaning.tex:139-141`; parser `Expression.rats:384-433`).

- <span class="mark">NEGATIVE-VERIFIED</span> Fields of object expressions leak into the component's top-level scope (`probes/g4b_*`; spec `basic/expressions/object.tex:68-73`; `ExprDisambiguator.scala:308`).

- <span class="mark">NEGATIVE-VERIFIED</span> `BIG UNION` and a map literal need explicit static arguments; `dom` is a functional method (`probes/g1e_*`).

- <span class="mark">RETIRED</span> "`w |hs|` is a syntax error": it is not; with a space before the bar it is a left encloser and runs, only the tight form fails (`probes/g4c_*`; `basic/operators/enclosingops.tex`). The program's `concat` uses it. This run's own first reading was wrong and the replication caught it.

- <span class="mark">NEGATIVE-VERIFIED</span> `b.f(3)` on a field holding a function is a method invocation by spec (`probes/g4d_*`; `juxtameaning.tex`); `b.f (3)` and `(b.f)(3)` work.

- <span class="mark">NEGATIVE-VERIFIED</span> Two overloads on unrelated `List` and `Range` parameters need an excludes pair (`probes/g4e_*`; Meet Rule, `advanced/overloading.tex:224-272`).

- <span class="mark">NEGATIVE-VERIFIED</span> `-` and `AND` have incomparable precedence, and both pairs of parentheses are needed (`probes/g4f_*`; `precedence.tex:158-166`).

- <span class="mark">NEGATIVE-VERIFIED</span> Fields and getters precede methods in an object body, a spec rule; a `property` after a method is rejected against the spec (`probes/g4g_*`; `concrete-syntax.tex:268-285`, `objects.tex:172-181`).

- <span class="mark">NEGATIVE-VERIFIED</span> The spec's `∞` object never shipped; `Constants.infinity` is the library's spelling (`probes/g4h_*`).

- <span class="mark">POSITIVE-VERIFIED</span> `indexOf` on a string, and the order of a parallel `for` over a string is not the string order (`probes/g4i_*`).

The rows in the ledger's format are in `gaps.md`.

## Reproducing

```
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64; export PATH=$JAVA_HOME/bin:$PATH
export FORTRESS_HOME=/path/to/fortress; unset JAVA_TOOL_OPTIONS; export FORTRESS_THREADS=1
cd explorations/run-b2/src
$FORTRESS_HOME/bin/fortress MicroGPTCheck.fss     # two golden steps and three samples, about a minute
$FORTRESS_HOME/bin/fortress MicroGPTDemo.fss      # twelve steps and five samples, about three minutes
cd ../figures && ./make.sh && cd formulas && ./formulas.sh && cd ../.. && python3 tools/build_article.py
```

The goldens are regenerated with `python3 tools/derive_goldens.py 2 && python3 tools/gen_fixture.py` after placing the pinned `microgpt.py` under `reference/` (its licence is unstated, so it is not committed).
