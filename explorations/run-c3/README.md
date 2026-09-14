# Run C3: microGPT in native Fortress arrays, round three

The coordinating session's own attempt under the round-two brief (`experiment/RUN_C2_BRIEF.md`): the same program as `explorations/run-c/`, the compute side rebuilt on a row lift, an elementwise algebra and a per-head cell lift, so that each line reads beside its formula and its Dyalog line.

- `src/MicroGptFlat.fss` (+ `.fsi`): the model only, 91 code lines; `run()` trains five Adam steps at batch 1 and prints the losses.
- `src/FlatArrays.fss` (+ `.fsi`): the array vocabulary: views, the elementwise algebra, the row and cell lifts, keys.
- `src/FlatData.fss` (+ `.fsi`): the loaders, the float parser, the corpus object.
- `src/MicroGptFlatCheck.fss`: the standard of success, 36 checks against `explorations/run-c/goldens`, an aggregate verdict, non-zero exit on any FAIL.
- `checks/threads1.txt`, `checks/threads4.txt`: the check outputs.
- `design.md`: the components and the line budget, the survey's essentials, the alternatives and why, numerics, cost, what the language gave and refused.
- `tour.md`, `tour.html`: the guided tour, one row per Dyalog line: formula, Dyalog, Fortress, note. The HTML (self-contained, 1.7 MB) renders the formula by LaTeX and the Fortress by Fortify as inline SVG, laid out with the formula and the Fortress side by side and the Dyalog and the note beneath, since four columns would shrink the renders below legibility; the sources and the rebuild recipe are in `probes/tour/`. The APL rank glyph `⍤` needs an APL font on the viewing machine.
- `survey.md`: the library and specification survey, with its checks in `probes/survey/`.
- `gaps.md`: the run's seventeen gap rows (numbered 156 to 172 as found; the ledger merge entered eleven as rows 164 to 174 and folded six into rows 133, 156, 158, 162, 155 and 106/49, map at the top of the file), reproducers in `probes/`, replicated in `probes/REPLICATION.md`.
- `probes/`: the alternatives probes (`lift_*`, `alg_*`, `att_*`, each with a `REPORT.md`, outputs at one and four threads, `.tic`/`.svg`/`.png` renders), the gap reproducers, the tour's render sources.

## Run

```bash
source experiment/env.sh                         # JDK 25, FORTRESS_THREADS=1, -Xmx4g
cd explorations/run-c3/src
../../../bin/fortress MicroGptFlat.fss           # five steps, about 30 s
../../../bin/fortress MicroGptFlatCheck.fss > ../checks/threads1.txt 2>&1
FORTRESS_THREADS=4 ../../../bin/fortress MicroGptFlatCheck.fss > ../checks/threads4.txt 2>&1
```

The check imports the three components through the interpreter's source path, which starts at the working directory, and reads the corpus, the weights and the goldens by paths relative to `src/`, so run from `src/`. Bounded by construction: five steps, batches of at most four, no training.

Reproducers for the gap rows: `./bin/fortress <File>.fss` from the reproducer's directory (the `g156` and `g164` directories hold api/component pairs; run the `Use*.fss`).
