# Fortress microGPT — blinded independent run (worker directory)

Deliverables of the experiment described in `../WORKER_BRIEF_FABLE.md`:

1. **Running, verified microGPT in Fortress** — `src/MicroGPT.fss` (primary, sequence
   form), `src/alt/v2_kvcache_MicroGPT.fss` (one token at a time), `src/alt/v1_MicroGPT.fss`
   (arrays and indices). Check driver fragments `src/*check_main*.part`, generated
   reference data `src/MicroGPTData.{fsi,fss}`, run outputs in `checks/`.
2. **Article** — `article.html` (self-contained; sources in `article/`, figures in
   `figures/`, all typeset from the actual source by `tools/figs.py`).
3. **Process record** — `notes/` (milestone notes, gaps), `probes/` (runnable probes
   including failures), `transcript.txt` (every interpreter/typesetter invocation).

Tools: `run.sh` (probe runner, logs to the transcript), `render.sh` (.tic → .svg/.png),
`tools/derive_checks.py` (instrumented run of the pinned reference → JSON),
`tools/gen_data.py` (JSON → Fortress data component), `tools/build.py` (compose
check/demo components), `tools/figs.py` (marked regions → figures), `tools/mathfig.sh`
(LaTeX → SVG), `tools/build_article.py`, `tools/linecount.py`.

`reference/` (article, gist source, dataset) and `build/` are gitignored.
