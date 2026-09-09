# Reproduce the independent microGPT result

Use the existing checkout at `/workspace/scratch/60367cc738a0/fortress-experiment`.
Do not clone, rebuild, clean or rerun baseline suites. If transient runtime tools
are missing after an interruption, run `python experiment/resume-environment.py`
from the repository root before sourcing the environment. That prepared recovery
helper restores missing tools without rebuilding Fortress; avoid ad hoc setup.
The tested original source revision is `8332bd34faad28cac7231c4eb261827b6ce7d9f9`.
The user-level program is `experiment/worker/main/MicroGPT.fss`.

```sh
cd /workspace/scratch/60367cc738a0/fortress-experiment
source experiment/env.sh
source experiment/render-env.sh
JAVA_FLAGS='-Xmx512m -Xss32m' python experiment/record.py microgpt-reproduce 120 bin/fortress walk experiment/worker/main/MicroGPT.fss
```

The recorder prints the new timestamped output-log path. Substitute that path for
`RUN_OUTPUT` in the following command; do not copy an old expected output into it:

```sh
python experiment/worker/reference/fortress_tsv_to_json.py RUN_OUTPUT experiment/worker/main/reproduced.json
python experiment/worker/reference/validate_fixture.py experiment/worker/main/reproduced.json
```

The existing completed result can be checked without rerunning Fortress:

```sh
python experiment/worker/reference/validate_fixture.py experiment/worker/main/actual.json
python experiment/worker/reference/validate_fixture.py experiment/worker/main/alternative-actual.json
```

The selected execution is recorded in
`experiment/evidence/20260908T041738.426708Z-microgpt-integrated-06/`:
exit 0, 4.438 seconds, exact source SHA-256
`6bb32da2bddbc22a2a3019e0964a692aa04d1660697acfc80739d37873fbefce`.
The alternative execution is
`experiment/evidence/20260908T041838.775815Z-microgpt-alternatives-01/`:
exit 0, 3.935 seconds, exact source SHA-256
`5071c7b18d92193869e911afbbee0ff678e1313caeeaa04b207c5d1ac61bc592`.
The recorder saves explicitly passed source files before each run, alongside
command metadata, then saves output and completion status. Both strict complete
conversions and validations passed at atol=1e-12, rtol=1e-10. Per-field maxima are
in `validation-summary.json`.

To reproduce the substantive alternative, replace `MicroGPT.fss` with
`MicroGPTAlternatives.fss` in the first recorded run command. It changes both RMS
to inverse-power scaling and attention to transposed-matrix multiplication. These
were tested as one complete alternative; the current evidence does not isolate
runtime or numerical differences attributable to each alteration separately.

## Actual notation figures

```sh
python experiment/worker/main/make_figures.py
for panel in algebra rms softmax attention block reduction adam scalar containers embedding loss sampling; do
  python experiment/record.py "figure-$panel" 120 python experiment/render.py "experiment/worker/main/figures/$panel.tic" experiment/worker/main/figures/rendered
done
```

The extractor uses exact source substrings and stores whole-source hashes in
`figures/source-hashes.json`. The `.tic` captions are mathematical comparison
formulas; the enclosed Fortress fragments are verbatim source. Fortify generates
TeX, LaTeX produces DVI, and dvisvgm/CairoSVG produce SVG/PNG. All twelve PNGs were
visually inspected against their captions; RMS and attention alternatives were
inspected before selection. The first RMS comparison caption was too wide and
was split onto two lines before re-rendering. SVGs and intermediate rendering
files remain alongside PNGs. The earlier candidate B is retained for process
history, not the final article's source.

## Source organization and limitations

`MicroGPT.fss` is the executable assembly: AD definitions, then
`model-core.fss.inc`, then `fixture-driver.fss.inc`, then the component's closing
`end`. The include files are documentary source fragments, not Fortress imports.
Keep edits consistent with the assembled file. `SOURCE_INVENTORY.md` separates
mathematical definitions, support and driver. The article links directly to the
full executable and actual figure files.

`Model` has one `Block`; `model(p)` fixes d=4, H=2, context=3 and vocabulary=3.
Initialization is deterministic, `((i MOD 29)-14)/100`, in global row-major
parameter order. Input/target sequence is [2,0,1,2]. One optimizer step and three
inverse-CDF uniforms [0.1,0.5,0.9] are tested. No corpus loading, tokenizer,
Gaussian RNG equivalence, arbitrary model configuration, multi-block model,
long training or trained-text quality is claimed. The runtime needs an expanded
stack for this recursive educational reverse pass. Parallel construction is
allowed; concurrent reverse passes sharing nodes are not supported.

The Python reference pinned in `../reference/NOTES.md` was independently
validated, including all 228 finite-difference gradients. Do not regenerate its
fixtures merely as an onboarding exercise; use its saved verified data.

## HTML reading editions

Run `node experiment/worker/main/make_article.mjs` with the `marked` package
available (this workspace uses CODEX_PRIMARY_RUNTIME_NODE and
CODEX_PRIMARY_RUNTIME_NODE_MODULES). The tracked ARTICLE.html references the
accompanying PNGs. ARTICLE.standalone.html is a reproducible untracked export
with embedded, deduplicated original SVG glyphs. Both include twelve exact
ASCII source excerpts, corresponding actual Fortify renderings, Python
comparison blocks and the complete ASCII executable. No external scripts or
fonts are required. Inline mathematics uses native MathML.

Supplementary historical logs and original SVG/TeX outputs are published in
`experiment/archive/process-evidence.tar.xz`. Extract with `tar -xJf` from the
repository root before inspecting historical outputs or building standalone
HTML without re-rendering. The archive's INDEX.json lists all 171 members and
REVIEW.json records its reviewed hash. Coordinator-only material is excluded.
