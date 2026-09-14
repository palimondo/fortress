# Handover — microgpt with the data designed after Hsu

For a Claude Code session. Builds on `apl-handover.zip` (Nydhal's Dyalog port + our dzaima port); this package carries the *redesign* of the data layout and the material it was checked against.

## Contents

| path | what |
|---|---|
| `slides/Designing_Your_Data_APL_Hsu_FnConf2025.yaml` | Aaron Hsu, "Designing Your Data: The Bread & Butter of APL", Functional Conf 2025 — 67 slides with presenter narration and key takeaways (the source used for the review) |
| `slides/…md` | same content, markdown |
| `apl/microgpt_flat.apl` | the Hsu layout in dzaima/APL — **verified** (details below) |
| `apl/flat_test.apl` | lemma 4 (batched == per-doc weighted mean) and finite differences on the flat parameter vector |
| `apl/microgpt_concise.dyalog` | the same layout in Dyalog, 25 lines — **unverified**, derived line by line from the dzaima file; first task in any Dyalog session is the oracle check |
| `apl/README.md` | dzaima dialect notes, the before/after table, verification record |
| `apl/w/`, `apl/docs.txt`, `apl/export_weights.py`, `apl/nsteps_flat.txt` | seed-42 weights and document order from Karpathy's microgpt; run config `<steps> <schedule length> <batch>` |
| `microgpt_flat.py` | the same layout in numpy with the APL's explicit backward (no autograd); 2× faster than the autograd numpy rung |

## Hsu's tactics and where they landed

| tactic / lesson | in the code |
|---|---|
| 1 slicing (inherent dimensionality) | activations are (doc·pos × 16) matrices; heads a rank-4 `(B,NH,16,4)` cell array (Dyalog) or lists paired with `¨` (dzaima) |
| 2 aggregation | nine weight matrices, nine gradients, eighteen Adam buffers → one parameter vector, one gradient vector, two moment vectors |
| 3 inverted table | the corpus is one integer matrix (docs × 17) plus a length vector; built once; a batch is a row selection |
| 5 symbol tables | characters interned to small integers at load time; no strings afterwards |
| 8 views | the nine matrices are reshaped slices of the parameter vector, made when needed, never stored |
| 9 Boolean masks | causal mask as an additive array; validity mask multiplied into the loss; ReLU backward `×M0>0`; the finite-difference perturbation `eps×i=⍳NP` |
| 10 keys | token ids *and* position ids as key vectors; scatter-add into `wte` and `wpe` by the same one-hot product |
| lesson 7 lifetimes | `STEP` is one pure function (keys → loss, gradient); no activation cache |
| lesson 8 functional state | the only state is `P M V`, replaced each step by whole-vector expressions |
| lesson 1 data hiding is a myth | the offset/shape tables and the corpus build are visible code (4 → 13 declaration lines) |

Not applied: tactic 4 (implicit type packing — the interpreter's job), 6 (pointer vectors — no graph here), 7 (enum columns — one entity type), 11 (total array ordering — no sorting needed).

## Verification record (dzaima/APL, `microgpt_flat.apl`)

- batch 1, 5 steps from seed-42 weights = oracle to 15 digits: `3.36596694758485 3.42427278387177 3.17780212545805 3.0663556842242 3.22088308975062` (padding to 16 positions is invisible, as the causal mask predicts)
- batch 4: loss `3.28664155669517` = token-weighted mean of the four single-document losses, |Δ| 0; max |Δ gradient| 5.6e-17
- finite differences at 11 indices across all nine matrices: |Δ| ≤ 7e-10
- `+/0=G` = 320 = 10 unseen letters × 16 columns × 2 matrices (wte, lm_head)
- speed: linear in batch size (12 ms → 190 ms/step from batch 1 to 16). dzaima is a tree-walking Java interpreter with a per-element inner product; the layout is what Dyalog's C primitives or numpy would reward, this interpreter cannot

`microgpt_flat.py` (numpy, fp64, batch 1) = oracle to 8.9e-16; same self-tests pass; fp32 throughput 16–19k names/s vs 7–11k for the autograd rung in the same session. The 2× is the absent autograd graph, which the layout made natural.

## Line counts

| | lines | statements |
|---|---|---|
| dzaima object layout, no batch, no sampler | 82 | 130 |
| dzaima Hsu layout, batched | 83 | 142 |
| Dyalog concise sketch, Hsu layout, batched | 25 | — |

Hsu's tactics moved lines (Adam 7→4, declarations 4→13) without changing the total; the Dyalog primitives (`⍤`, `+.×`, `[i;]`) removed the 14 helper lines. Floor: forward ~9 + backward ~11 (one per forward line; the price of no autograd) + data/views ~5.

## Next steps

1. Dyalog session: run `microgpt_concise.dyalog` against the oracle; fix; then `test_gradcheck`-style finite differences over all of `P`.
2. Try `{+⌿⍵}⌸` for the two scatter-adds in place of the one-hot products, and measure.
3. The rank-4 attention form in the concise file is the shape the C kernel wants: fixed shapes, one batched matmul per line. That is the port after numpy.
4. Multi-layer: a leading layer axis on the weight vector (a second offset table), `¨` or `⍤` over layers, per-layer caching of `X2 X3 M0 Mr` for the backward.
