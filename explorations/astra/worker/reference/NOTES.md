# microGPT reference fixture

## Pinned primary source

- Article: <https://karpathy.github.io/2026/02/12/microgpt/>
- Gist: <https://gist.github.com/karpathy/8627fe009c40f57531cb18360106ce95>
- Selected current revision: `14fb038816c7aae0bb9342c2dbf1a51dd134a5ff`
- Revision-qualified raw URL: <https://gist.githubusercontent.com/karpathy/8627fe009c40f57531cb18360106ce95/raw/14fb038816c7aae0bb9342c2dbf1a51dd134a5ff/microgpt.py>
- Local exact source: `microgpt.upstream.py`
- SHA-256: `d47d88c2fd432c8ebdc1048beab7f7eb64ea7e0e664e11b812d72a6d95ebccee`

The February 12 article code and current gist have the same architecture and
core equations. The current gist has later editorial changes, pins the names
dataset revision, and prints training progress with carriage return. The fixture
selects the current gist and does not use the dataset, shuffle, Gaussian
initialization, or long training loop.

## Fixture convention

Dimensions are `d=4`, `nhead=2`, `nlayer=1`, `vocab=3`, and `context=3`.
The complete token sequence is `[2, 0, 1, 2]`, giving inputs `[2, 0, 1]` and
targets `[0, 1, 2]`. Token 2 doubles as BOS for generation.

Matrices retain the upstream insertion order (`wte`, `wpe`, `lm_head`, then
the layer's `attn_wq`, `attn_wk`, `attn_wv`, `attn_wo`, `mlp_fc1`, and
`mlp_fc2`) and are flattened row-major. For zero-based global flattened index
`i`, the deterministic initial value is:

```text
((i mod 29) - 14) / 100
```

This replaces Python's version-dependent Gaussian RNG while preserving the
upstream computations. `fixture.json` contains every initial parameter, logits,
probabilities, per-head attention weights, scalar mean loss, every gradient,
and every parameter after the first upstream Adam step (`lr=0.01`, `beta1=.85`,
`beta2=.99`, `eps=1e-8`). Generation uses the updated model, temperature `0.5`,
a fresh cache, and inverse-CDF categorical sampling with injected uniforms
`[0.1, 0.5, 0.9]`. This is the semantics of upstream `random.choices` without
depending on Python RNG state.

Expected headline results: loss `1.147958783149666`; updated-model injected-uniform
categorical sequence `[0, 1, 2]` (the final token is BOS). This is not a greedy
decode: uniforms `[0.1, 0.5, 0.9]` select from the temperature-scaled CDF.

## Reproduction and validation

Run from this directory:

```sh
python3 generate_fixture.py
python3 validate_fixture.py
python3 finite_difference_check.py
sha256sum microgpt.upstream.py generate_fixture.py fixture.json validate_fixture.py finite_difference_check.py
```

`validate_fixture.py optional-actual.json` recursively compares another JSON
result using `atol=1e-12`, `rtol=1e-10` by default; both tolerances are CLI
options. The finite-difference script checks all 228 parameters with central
differences and a maximum allowed absolute discrepancy of `2e-8`. The validator
also checks all tensor shapes, probability and attention normalization,
deterministic initialization, all first-step Adam updates, and the
injected-uniform CDF choices.

For a Fortress result, emit the same complete JSON schema as `fixture.json`,
with row-major matrices and zero-based token ids. Compare it with
`python3 validate_fixture.py actual.json`. Generation should expose raw logits,
temperature-scaled probabilities, and sampled tokens; reset the KV cache before
generation and stop after emitting BOS or after three positions.

Fortress may emit tab-separated events instead of constructing JSON. Convert
them with `python3 fortress_tsv_to_json.py actual.tsv actual.json`. Blank lines
and lines beginning with `#` are ignored; all indices are zero-based. The exact
event forms are:

```text
initial<TAB>matrix_name<TAB>row<TAB>column<TAB>value
gradient<TAB>matrix_name<TAB>row<TAB>column<TAB>value
updated<TAB>matrix_name<TAB>row<TAB>column<TAB>value
logits<TAB>position<TAB>vocab_index<TAB>value
probability<TAB>position<TAB>vocab_index<TAB>value
attention<TAB>position<TAB>head<TAB>time<TAB>value
loss<TAB>value
uniform<TAB>position<TAB>value
genlogits<TAB>position<TAB>vocab_index<TAB>value
genprobability<TAB>position<TAB>vocab_index<TAB>value
gentoken<TAB>position<TAB>token_id
```

The converter requires exactly one event for every expected numeric cell and
rejects duplicates, missing cells, extra/out-of-range indices, non-finite
numbers, unknown event names, and generated events following an early BOS. It
adds only the static fixture metadata.
