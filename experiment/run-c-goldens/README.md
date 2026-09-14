# Goldens for Run C

Produced on 2026-09-14 by `make_goldens.py` in this directory over `explorations/apl/reference/hsu-flat/microgpt_flat.py`, unmodified, sha256 `c57d651bdb391b08c68b599639a18d725ecd1c077dd2ce82148787090dcd7f0c`.

The driver execs the reference's definitions (everything above its self-test section) with the config `check=5 steps=1000` (batch 1, float64, schedule length 1000), takes the initial parameter vector and the `step` function from that namespace, and computes the goldens with them. It then runs the unmodified script as a subprocess with the same config and asserts that the five losses it prints are the same values. Python 3.11.15, numpy 2.4.6. The reference downloads Karpathy's `names.txt` (makemore revision 988aa59) into the working directory at run time; its sha256 is recorded in the JSON.

`goldens.json` holds:

- `batch1_five_steps`: the five losses of five Adam steps at batch 1 on documents 0..4, schedule length 1000, and the lines the unmodified script printed.
- `batch4_first_batch`: the loss on documents 0..3 at the initial weights, the four single-document losses, their lengths (number of input-target pairs), the token-weighted mean and its difference from the batched loss (0.0).
- `batch1_step0`: the initial loss on document 0, the full flat gradient (4192 values), the parameter vector after the first Adam step (4192 values), the count of zero gradient entries (464).
- `finite_differences`: central differences with eps 1e-6 at the reference's eleven indices, for document 0 alone and for the batch of four, each with the backprop value and the absolute difference (worst 3.7e-10).
- `initial_parameters`: the full initial vector `P0` (4192 values) and the sha256 of the nine weight files under `explorations/apl/reference/dzaima/w/`; the driver checked that the files, parsed in layout order, equal the reference's own random draw exactly.
- `layout`: matrix names, shapes, element counts, offsets into the flat vector; `config`: every hyperparameter; `vocabulary`: the 26 characters and the BOS id 26.
- `corpus`: the document order (names.txt shuffled with seed 42; the first 2000 equal `explorations/apl/reference/dzaima/docs.txt`, checked), the first 16 documents with their lengths and their 17-token rows.

All floats are written by Python's shortest round-trip repr, so they reload exactly.

Omitted: the gradient of the batch of four (only its loss and the lemma are kept), the parameter vectors after steps 2 to 5, and any logits or activations. The reference's self-test was not run as such; its two checks are reproduced by the driver.

To regenerate: `cd` to a scratch directory and run `python3 <repo>/experiment/run-c-goldens/make_goldens.py <repo> <repo>/experiment/run-c-goldens`.
