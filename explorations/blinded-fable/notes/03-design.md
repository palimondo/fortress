# 03 — Design exploration: three verified expressions of the same model

All three pass the identical reference check (52 checks; outputs in `checks/`).
Figures are typeset from the actual source by `tools/figs.py` (regions marked
`(* FIG name *)` … `(* END FIG *)`).

| design | vectors / matrices | matrix–vector product | attention | model state | files |
|---|---|---|---|---|---|
| v1 | `Indexed[\Value,ZZ32\]` params, `List` results, `Array2[\Value,0,m,0,n\]` weights | `⟨ ∑_{j←0#n} W_{i,j} x_j \| i ← 0#m ⟩` | per-component `⟨ ∑_t α_t (v_t)_j \| j ⟩` | KV cache (mutable lists per layer) | `src/alt/v1_MicroGPT.fss` |
| v2 | `Vec` (DelegatedIndexed wrapper), `Mat` (list of row `Vec`s) | `⟨ w·x \| w ← W.rows ⟩` and row-vector·matrix | `α = softmax((K_cols q_cols)/√d_h); α V_cols` | KV cache | `src/alt/v2_kvcache_MicroGPT.fss` |
| v3 (primary) | as v2 | as v2 | per head: `α = softmax((Kh[0:t] Qh[t])/√d_h); α Vh[0:t]` | none: `forward(tokens)` is a pure function of the sequence | `src/MicroGPT.fss` |

## Attempt / observation / decision

**Autograd node (A1 pairs, A2 lists, A3 closures).** A1 stores
`deps: (Value, RR64)...` pairs (child, ∂v/∂child) through a varargs factory
`node(data, (self, 1), (b, 1))` — the chain rule's ingredients are visible and the
render is clean (`figures/gpt_value.svg`). A2 (the Python shape, two parallel lists)
needs `<|[\Value\] …|>` / `<|[\RR64\] …|>` static-arg clutter and a `zip[\RR64\]`
(`probes/alt_autograd_lists.fss`, `figures/alt_autograd_lists.svg`). A3 (micrograd's
original: a `propagate` closure per node) hides the derivative inside imperative code
and needs `(v.propagate)()` (`probes/alt_autograd_closure.fss`). Decision: A1.

**Vectors.** `Indexed[\Value,ZZ32\]` (v1) works and accepts lists, arrays and slices,
but every signature reads `Indexed⟦Value,ℤ32⟧`; the `T[n]`/`T^n` abbreviations of the
spec render as ℝⁿ-style types (`figures/fig01_variants.svg`) but the interpreter does
not accept `T[n]` with a `nat` parameter and the library ties `T^n` to Number-only
`Vector`/`Matrix` (notes/01, probes 08/08b). A user `Vec` extending the library's
`DelegatedIndexed[\Value,ZZ32\]` needs six one-line definitions (bounds, indices,
indexValuePairs, `|self|`, `[i]`, `[r]`) and then participates in comprehensions and
`∑` unchanged (`probes/probe18_vec.fss`). Decision: `Vec`/`Mat`.

**Matrix–vector product.** Index form `∑_j W_{i,j} x_j` (v1) vs row form
`⟨ w·x | w ← W.rows ⟩` (v2/v3); both typeset as textbook math; the row form makes the
embedding lookup `E[token]` a plain subscript and gives `α V` (row vector times matrix)
for the attention output. Decision: rows.

**Attention.** With `Mat` slices, one token's attention is literally
`softmax(K q/√d) V` (v2). The sequence-level v3 makes the model a pure function of the
token list: `Q,K,V = Mat(⟨W_q x | x ← X⟩)…`, positions are produced by a comprehension
(`⟨ attend(t) | t ← X.indices ⟩`), which Fortress may evaluate in parallel — the
KV cache of the reference is an incremental *implementation* of the same math (both
verified; the cache version stays as the inference-friendly form). Decision: v3
primary, v2 shown as the incremental form.

**∑ over user types.** The library's `∑` is Number-only and the nofix big-operator
protocol cannot be overloaded per element type; the spec-sanctioned route is
`import FortressLibrary.{...} except { opr BIG + }` plus a user `CommutativeMonoidReduction`
(`probes/probe02g_except.fss`). A single `∑` for every additive type (scalars and
vectors, with an explicit `Zero`) works in the interpreter (`probes/alt_unified_sum.fss`)
but its result has static type `Additive`; kept as a discussion item, not used.

**Head concatenation.** `BIG ||` (a user `MonoidReduction` on `Vec`) renders as a big
‖ with limits `h ← 0#n_head` (`probes/probe19_bigcat.fss`).

## Uncertainty
- Fortify renders `x_h[t]` as a LaTeX double subscript (error); names were chosen to
  avoid an identifier-subscript followed by an index subscript (Qh, Kh, Vh; E, P).
  This is a typesetter limitation, recorded in gaps.
- The parallel-evaluation claim for v3's comprehensions is by language semantics
  (generators run iterations in implicit threads); runs here use FORTRESS_THREADS=1.
