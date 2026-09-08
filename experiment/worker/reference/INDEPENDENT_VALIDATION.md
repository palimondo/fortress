# Independent reference validation — 2026-09-07

The revision-qualified upstream URL returned 9,319 bytes exactly equal to
`microgpt.upstream.py`; both hash to
`d47d88c2fd432c8ebdc1048beab7f7eb64ea7e0e664e11b812d72a6d95ebccee`.
The pinned source implements the same parameter order, RMSNorm epsilon, scaled
multi-head causal attention, ReLU MLP, residuals, mean cross-entropy, first Adam
step, temperature scaling, and categorical generation used by the fixture.

Fresh validation found one stale artifact: `fixture.json` lacked
`generation_uniforms` and `generation_probabilities`, so its validator failed.
Regenerating it repaired the schema. The prior note also incorrectly described
generation as greedy `[2]`; the specified inverse-CDF draws produce `[0, 1, 2]`.

Validation now passes for the complete `d=4`, `nhead=2`, `nlayer=1`, `vocab=3`,
`context=3` case:

- all 228 initial parameters follow the global row-major formula;
- every forward logit/probability and both heads' attention weights are retained;
- all 228 autograd gradients pass central differences at `h=1e-6`; worst absolute
  error is `3.649e-10`, below the `2e-8` limit;
- all 228 first-step Adam values satisfy
  `new = old - 0.01*g/(abs(g)+1e-8)`, including zero-gradient entries;
- generation starts with BOS token 2 and a fresh KV cache, uses temperature 0.5,
  applies uniforms `[0.1, 0.5, 0.9]` with half-open CDF intervals, emits
  `[0, 1, 2]`, and stops on the final BOS.

The best exchange format is the complete nested JSON structure in `fixture.json`.
It preserves named matrix shapes and intermediate traces and is accepted directly
by `validate_fixture.py actual.json`. A compact output with only loss and tokens
would be insufficient to establish the forward pass, both attention heads, all
gradients, and every Adam update independently.

Commands run:

```sh
python3 generate_fixture.py
python3 validate_fixture.py
python3 finite_difference_check.py
```

All passed. During initial file discovery, a mistakenly broad `rg --files
experiment` listed filenames under excluded coordinator and other worker paths.
No excluded file contents were opened or used. Subsequent access remained scoped
to the approved brief, README, upstream source, and reference directory.

`fortress_tsv_to_json.py` provides a strict line-oriented interchange path for
Fortress output. A round trip generated from every fixture numeric cell converted
back to JSON and passed `validate_fixture.py`; deliberately incomplete input was
rejected. The converter supplies static metadata only and never substitutes
expected numeric results.
