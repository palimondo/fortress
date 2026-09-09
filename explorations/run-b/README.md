# Run B: microGPT in Fortress at the level of matrices

The deliverables of `experiment/RUN_B_BRIEF.md`.

- `article.md`, `article.html` — the article (Markdown source; self-contained HTML built by `tools/build_article.py`).
- `src/MicroGPT.fss` — the program: the autodiff engine over the library's vectors and matrices, the model, loss, parameter record, Adam, sampling, tokenizer, initialization; a smoke test in its `(* TESTS *)` region. `src/check_main.part` and `src/train_main.part` are the drivers spliced onto the core by `tools/build.py` (into the untracked `build/`). `src/MicroGPTData.{fsi,fss}` is generated from the goldens by `tools/gen_data.py`.
- `checks/` — `goldens_2steps.json` (derived from the pinned reference by `reference/derive.py`; the reference itself is not committed), `check_run_output.txt` and `check_run_threads4_output.txt` (ALL CHECKS PASSED at one and four threads), `train_demo_output.txt`.
- `figures/` — `.tic` sources and `.svg` renders: `v2_*` the program's figure regions, `d_*` the demo driver's, `s01_*`/`s02_*` the two autodiff skeletons, `x00`–`x02` the exploration sheets, `math_*` the formulas, `prior_*` the earlier runs' figures reproduced for comparison; `render.sh` is the pipeline.
- `probes/` — every probe with its output beside it (`cNN_*` capability probes, `sNN_*` skeletons and their depth measurement, `worker/` the independent reproduction); `probes/run.sh` runs one.
- `gaps.md` — new rows for `explorations/fortress-gap-ledger.md`; `mechanisms.md` — the inventory against the specification's table of contents.
- `tools/` — `build.py`, `gen_data.py`, `figs.py`, `mathfig.sh`, `build_article.py`, `linecount.py`.
- `article/` — the formula table, the page head, and the verbatim Python excerpts of the pinned reference.
