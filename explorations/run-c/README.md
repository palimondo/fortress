# Run C: microGPT in native Fortress arrays, data designed after Hsu

Round two (the tree): the model as three components, the compute side as
Fortress, line for line against the Dyalog and the formulas.

- `src/MicroGptFlat.fss` (+ `.fsi`): the model only — hyperparameters, the
  layout table, `rmsn`/`sm` and their backward at vector level, `step`, `adam`,
  the training loop; its `run()` trains five Adam steps at batch 1 from the
  committed weights and prints the losses.
- `src/FlatArrays.fss` (+ `.fsi`): the array vocabulary — the elementwise
  algebra with scalar extension as operators over the library's own arrays,
  the views (a matrix over a slice of a flat vector, a block, a row, a ravel,
  the per-head planes of an activation and back), the row lift, a batched
  product, and the key operations (`gather`, `onehot`, `valid`, `pick`,
  `flat`).
- `src/FlatData.fss` (+ `.fsi`): the loaders — a float parser, a whitespace
  tokenizer, text files as lines, vectors and matrices, the corpus as one
  padded integer matrix.
- `src/MicroGptFlatCheck.fss`: the standard of success; one line per check
  with the measured difference and PASS or FAIL, a verdict line, and a
  non-zero exit on any FAIL.
- `goldens/`: the parts of `experiment/run-c-goldens/goldens.json` the check
  reads, as text, written by `goldens/extract_goldens.py`. Unchanged.
- `checks/round2_threads1.txt`, `checks/round2_threads4.txt`: round two's
  check outputs; `checks/threads1.txt`, `threads4.txt` are round one's.
- `tour.md`, `tour.html`, `tour/`: the guided tour — for every line of the
  Dyalog, the formula, the Dyalog line, the Fortress line rendered by Fortify,
  and a note where they differ.
- `design.md`: round one's design notes and the "Round two" section — the
  survey of the shipped array algebra, the alternatives tried and rejected,
  the line budget, the subscript count, what the language gave and what had
  to be built, blinding.
- `gaps.md`: new ledger rows (156 onward), with the reproducers and their
  saved outputs in `probes/` (`q*.fss`, `q*.out`; renders in
  `probes/render/`). Round one's rows 140–155 are merged into the ledger.

## Run

The program and the check read the corpus and weights by paths relative to
`src/`, and the check imports the three components through the interpreter's
source path, which starts at the working directory, so run from `src/`:

```bash
source experiment/env.sh                         # JDK 25, FORTRESS_THREADS=1, -Xmx4g
cd explorations/run-c/src
../../../bin/fortress MicroGptFlat.fss           # five steps, ~40 s
../../../bin/fortress MicroGptFlatCheck.fss > ../checks/round2_threads1.txt 2>&1
FORTRESS_THREADS=4 ../../../bin/fortress MicroGptFlatCheck.fss > ../checks/round2_threads4.txt 2>&1
```

The check's exit status is 0 only when every line is PASS. Its timings are in
its output. Bounded by construction: five steps, batches of at most four, no
training.

To regenerate the text goldens:
`python3 explorations/run-c/goldens/extract_goldens.py <repo root>`.

Reproducers for the gap rows: `./bin/fortress explorations/run-c/probes/<name>.fss`
from the repository root (the API probes run from `probes/api/` and
`probes/api2/`); each probe's output is committed beside it as `.out`.
