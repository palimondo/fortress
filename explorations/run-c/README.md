# Run C: microGPT in native Fortress arrays, data designed after Hsu

- `src/MicroGptFlat.fss` (+ `.fsi`): the program; its `run()` trains five
  Adam steps at batch 1 from the committed weights and prints the losses.
- `src/MicroGptFlatCheck.fss`: the standard of success; one line per check
  with the measured difference and PASS or FAIL.
- `goldens/`: the parts of `experiment/run-c-goldens/goldens.json` the check
  reads, as text, written by `goldens/extract_goldens.py`.
- `checks/threads1.txt`, `checks/threads4.txt`: the check outputs.
- `design.md`: the layout, the line-for-line table, the rank-4 decision.
- `gaps.md`: new ledger rows, with the reproducers in `probes/`.

## Run

The program and the check read the corpus and weights by paths relative to
`src/`, and the check imports the program's API through the interpreter's
source path, which starts at the working directory, so run from `src/`:

```bash
source experiment/env.sh                         # JDK 25, FORTRESS_THREADS=1, -Xmx4g
cd explorations/run-c/src
../../../bin/fortress MicroGptFlat.fss           # five steps, ~1 min
../../../bin/fortress MicroGptFlatCheck.fss > ../checks/threads1.txt 2>&1
FORTRESS_THREADS=4 ../../../bin/fortress MicroGptFlatCheck.fss > ../checks/threads4.txt 2>&1
```

The check takes 855 s at one thread (55 steps: every finite difference is
two full steps); the timings are in its output.
Bounded by construction: five steps, batches of at most four, no training.

To regenerate the text goldens:
`python3 explorations/run-c/goldens/extract_goldens.py <repo root>`.

Reproducers for the gap rows: `./bin/fortress explorations/run-c/probes/<name>.fss`
from the repository root (the API probe runs from `probes/api/`).
