<!-- Run B2 design state, kept as the coordinating session's insurance against context compaction (handover condition 3). Facts cite probes under probes/ and figures under figures/. Not a required deliverable of the brief. -->

# Run B2: design state

## Autodiff shape (decided 2026-09-09, after three rendered skeletons)

Three skeletons on one finite-difference test (`L = Σ (relu(X W + X) Uᵀ)²`, X used twice so fan-out is exercised), all three agreeing with central differences to 1e-10 (`probes/skelA.out`, `skelB.out`, `skelC.out`):

- `skelA`: a tape of backward closures with a mutable gradient slot per node (the probed shape from `matrix-ad-probes`). Rendered (`figures/skelA_engine.png`), every backward rule is an assignment (`grad := grad + C.grad Bᵀ`) and the engine carries a global `tape`, `record`, and a reversed loop; nothing in it reads as a formula.

- `skelB`: functional backprop. A node is its value and its pullback, the linear map from the node's cotangent C̄ to a gradient environment (a `Map` from parameter name to cotangent); environments add with `Map.union`, so fan-out is a sum and no tape, order or mutable slot exists. Rendered (`figures/skelB_engine.png`), the product rule reads `pullback(C̄ Bᵀ) + B.pullback(Aᵀ C̄)`.

- `skelC`: skelB with the value carrier separated from the node: `Mat` is a plain immutable matrix over the library's runtime-sized array carrying the operators the papers write (juxtaposition, `+`, `-`, `^T`, scalar juxtaposition, `/` by a scalar, ⊙), and `Node(data, pullback)` with `pull` as a method. Rendered (`figures/skelC_engine.png`), the raw `Array⟦ℝ64,(ℤ32,ℤ32)⟧` type appears once, in `Mat`, and the rules read `A.pull(C̄ (B.data)ᵀ) + B.pull((A.data)ᵀ C̄)`.

Chosen: skelC. Reasons: immutable (no `var` anywhere in the engine), its backward rules are the papers' equations rather than update statements, gradients arrive as one value (∇θL as a map) that Adam maps over, and accumulation at fan-out is a monoid sum, which is the shape Fortress's reductions want. Cost, stated: at a shared node the pullback is re-entered once per use, so work is repeated along every path from the loss to a leaf; for a one-layer model that is a small constant factor, measured later on the real graph. A tape (skelA) avoids the repetition at the price of mutation and ordering; the expression tree walked in reverse is skelC with the closures replaced by an op tag and a `case`, and was not built separately.

## Spellings settled by the skeletons

- `value` is a reserved word (ledger row 8): the node's value field is `data`.
- A field holding a closure cannot be applied as `x.f(arg)`: the interpreter treats it as a getter call with one argument too many. A method that applies the field (`pull`) fixes the call site.
- Getters must precede methods in an object body (interpreter rule).
- `opr[ij: (ZZ32,ZZ32)]` and `opr[i: ZZ32, j: ZZ32]` are the same overload; keep the pair form, and `A[ij]` spreads the tuple.
- `B.data^T` is a syntax error; `(B.data)^T` works. Sent to gate-4 replication (`probes/g4a_*`).
- Object expressions with a field: the second object expression in a component with the same field name fails with `Top-level variable data is already declared`. Sent to gate-4 replication (`probes/g4b_*`).
- `ODOT` is ⊙ in the interpreter and in Fortify.

## Model form (row-vector convention, as in Vaswani et al. 2017)

The sequence is the unit of computation: X ∈ ℝ^{T×d}. Karpathy's per-token `wq @ x` becomes `X Wq` with `Wq` the transpose of his matrix; per head, `Wq_h` is the transpose of the head's row block, so `head_h = Attention(X Wq_h, X Wk_h, X Wv_h)` is the paper's formula with no view or slice. The loader that reads Karpathy's weights does the transposition and the split; the core never sees the fixture. Causality is the mask term in `softmax(Q Kᵀ / √d_k + M) V`. RMSNorm, softmax and the loss are row-wise node operations with the textbook backward rules. Parameters and gradients are maps from name to `Mat`; Adam is a map over them.

Open, pending gate-1 workers: value objects (`g1a`), contracts (`g1b`), tests and properties (`g1c`), pasting and unpasting (`g1d`), `Map` as a generator and `BIG UNION` (`g1e`), rendering of decorations (`g1f`).

## State at 2026-09-09, after the article

Built and verified: `src/MicroGPT.fss` (core, exported through `MicroGPT.fsi`), `src/MicroGPTCheck.fss` (two golden steps and three replayed samples, all within 9e-16, `checks/check_run.txt`), `src/MicroGPTDemo.fss` (twelve steps and five samples, `checks/demo_run.txt`), `src/MicroGPTRef.fss` (generated fixture), `tools/` (derive goldens, generate fixture, build article), `figures/` (per-definition renders via `make.sh`, formulas via `formulas/formulas.sh`), `article.md` and `article.html`, published at https://claude.ai/code/artifact/87d25c95-ab48-4ea9-a3ac-507b359e3050.

Decisions taken after the skeletons: value objects for `Mat`, `Node`, `Params` (declared; the interpreter enforces nothing, `probes/g1a_*`); the checker as a separate component through the API rather than `test` functions (so the core carries no fixture import); per-head projection matrices in the paper's row-vector convention, with the transposition and head split in the checker's loader; `concat` by a fill (pasting broken, `probes/g1d_*`); Σ reopened over `Any` by the `except` import; contracts not used in the definitions the reader compares.

Open: `gaps.md` in the ledger's row format, waiting on the replication of `probes/g4c_*` to `g4i_*` (juxtaposition before `|…|`, field-held closures, List/Range overloads, `-` versus `AND`, getter order, the ∞ literal, `indexOf`). Then the standard review (independent workers, never this session).
