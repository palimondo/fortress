# Run C4: microGPT in native Fortress arrays, the synthesis

The merge of rounds two (`explorations/run-c/`) and three (`explorations/run-c3/`) decided in Phase 2 (`explorations/reviews/run-c2-vs-run-c3.md`, section H): C2's model with its rank-3 attention block, tuple-bound constants, varargs `flat`, index-generic operators, `transpose` beside `^T` and `diag`; C3's data side with the corpus object and `x DOT x` in the norms. The target program of the APL side quest.

- `src/MicroGptFlat.fss` (+ `.fsi`): the model only, 71 code lines; `run()` trains five Adam steps at batch 1 and prints the losses.
- `src/FlatArrays.fss` (+ `.fsi`): the array vocabulary: the elementwise algebra as operators generic in the index type, views (a matrix over a slice of the flat vector, a row, the per-head planes and back, a plane, the plane-wise transpose), the batched product, the row lift, keys, `flat`.
- `src/FlatData.fss` (+ `.fsi`): the loaders, the float parser, the corpus object (round three's).
- `src/MicroGptFlatCheck.fss`: the standard of success, 40 checks against `explorations/run-c/goldens`, an aggregate verdict, non-zero exit on any FAIL.
- `checks/threads1.txt`, `checks/threads4.txt`: the check outputs at pool sizes 1 and 4.
- `design.md`: what was merged from where and why, the line budget, the check, the cost, the map onto the Dyalog for the APL round.
- `tour.md`, `tour.html`, `tour/`: the guided tour, one row per Dyalog line (formula, Dyalog, Fortress set by Fortify, note), built by `tour/mktour.py`, which checks every snippet verbatim against the source; `python3 tour/mktour.py --render` rebuilds the SVGs and both files.

## Run

```bash
source experiment/env.sh                         # JDK 25, FORTRESS_THREADS=1, -Xmx4g
cd explorations/run-c4/src
../../../bin/fortress MicroGptFlat.fss           # five steps
../../../bin/fortress MicroGptFlatCheck.fss > ../checks/threads1.txt 2>&1
FORTRESS_THREADS=4 ../../../bin/fortress MicroGptFlatCheck.fss > ../checks/threads4.txt 2>&1
```

The check imports the three components through the interpreter's source path, which starts at the working directory, and reads the corpus, the weights and the goldens by paths relative to `src/`, so run from `src/`. Bounded by construction: five steps, batches of at most four, no training.
