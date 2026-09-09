# Independent Fortress microGPT experiment — assignment, not yet launched

## Mission and standard of success

Find and justify a canonical, idiomatic Fortress expression of microGPT whose
executable, typeset definitions look as close as possible to the mathematics
used in transformer/ML papers. Put each mathematical formula beside its actual
rendered Fortress definition: the reader must be able to judge the correspondence
**by eye**. This visual and semantic correspondence is the forcing function.

The main article teaches two things together, with equal pedagogical weight:
how a GPT works, and how to construct the Fortress building blocks that make its
mathematical core expressible so concisely. Show what the language already gives,
what your user-level definitions add, and where a mismatch remains.

A correct Python transliteration can be an intermediate check; it is not the
destination. TeX-printing that transliteration does not establish mathematical
expressiveness. Explore materially different ways to express the computations;
do not claim a canonical result after the first working design. You choose the
investigative workflow and representations and justify the resulting form.

Rendering is an early self-validation gate: render substantive candidate forms,
inspect them beside the mathematical formula, and revise before selecting the
design. Do not postpone visual fidelity assessment until article production.

This is also a concrete test of connecting knowledge of mathematics, transformers
and programming languages in an unfamiliar codebase, with inspectable evidence.

## Work here, using the already running build

Use this existing checkout and compiled interpreter directly:

```sh
cd /workspace/scratch/60367cc738a0/fortress-experiment
source experiment/env.sh
```

Create your work under `experiment/worker/`. Run your small probes from the repo
root with `python experiment/record.py LABEL 120 bin/fortress walk PATH.fss`.
Choose a descriptive LABEL and your actual source PATH; the Fortress component
name must match its filename. The interpreter subcommand is `walk`.

**Do not clone, create another checkout/worktree, reinstall Java/Ant, run
prepare.py, clean/rebuild Fortress, or rerun baseline suites as onboarding.**
This is a notation experiment, not a build-revival assignment. The baseline
already passed: clean build; interpreter printing `42`; 1,377 testFast tests;
382 testSystem tests. If an actual environment failure occurs, give its concrete
evidence to the coordinator for repair. The existing source base is
8332bd34faad28cac7231c4eb261827b6ce7d9f9.

## Instruction-following boundary

Start in a fresh context with no inherited coordinator conversation. Agents
share the filesystem; independence relies on obeying these instructions, not
on branch/worktree isolation or access restrictions.

On a resumed attempt, first read `experiment/RESUMING.md` and the permitted
worker RESUME notes; inspect newer completed run logs before repeating work.
This attempt's own saved files are permitted recovery context. Preserve a short
checkpoint before reporting each meaningful milestone. Do not assume the prior
agent or its delegates remain live after an interruption.

Do not read, search, recursively list, or otherwise retrieve content from:

- `/workspace/scratch/60367cc738a0/fortress/` — prior experiment checkout.
- `/workspace/scratch/60367cc738a0/fortress-transcripts/` — prior session archive.
- `/workspace/scratch/60367cc738a0/fortress-experiment/experiment/coordinator/`
  — notes containing prior research and solution details.

Do not retrieve the same material through Git history/refs, GitHub, prior
published artifacts, conversation retrieval, or another agent. Scope searches
to permitted directories; do not recursively search the workspace parent or
all of `experiment/`, which includes the excluded coordinator folder. Report
any accidental exposure. Other workers' findings remain unread until review.

Freely explore this checkout's `Specification/`, `Library/`, `ProjectFortress/`,
`Fortify/`, `Papers/`, `bin/` and other original source materials. You may read
the experiment README, setup notes, environment/recording scripts and baseline
evidence, and your own worker files. The exclusions restrict contamination,
not investigation of Fortress's capabilities.

## Design and validation

Use Karpathy's original microGPT article and Python source as the behavioral
reference: https://karpathy.github.io/2026/02/12/microgpt/ . Pin the actual source
revision. If article and gist differ, identify and consistently select a variant.

For each building block, distinguish the mathematical computation from accidents
of the Python implementation. Investigate the language's facilities, including
reuse, algebraic structure and inference where useful. Do not preselect an
operator, type representation, evaluation order or approach from an example.
Target recognizable ML notation: where the formula uses ordinary summation,
seek that notation. A look-alike glyph or a prettier label in the article does
not substitute for an executable definition with the intended meaning.

User-level types, operations and library modules are welcome. Do not change
the historical language, compiler, runtime or shipped library to make the demo
pass. Consult the specification's TeX sources for semantics, source/library for
actual behavior, and small probes for evidence. Neither a first interpreter
error nor a self-imposed representation proves impossibility; investigate
alternatives. Conversely, interpreter acceptance alone does not establish
specification conformance. Classify surviving notational departures as an
implementation/library gap, language-design limit, or justified design choice,
with reproducers and source citations. Retain actionable gaps for the revival
worklist without changing the historical system during this experiment.

Do not suppress language parallelism merely to reproduce Python's exact order.
Distinguish true dependencies, numerical effects and implementation choices.
Measure cost honestly, but do not let interpreter speed dictate notation.
Keep executions small and bounded; no long training runs.

## Deliverables

1. **Running, verified microGPT in Fortress**, including the model,
   differentiation, training update and generation path for the pinned reference.
   Use deterministic logits/loss/gradient checks and bounded checks of remaining
   paths, with justified numerical tolerances. A separate fresh-context validator
   derives checks from Python; do not read prior Fortress solutions for goldens.

2. **The main educational article and reproducible notation figures.** For each
   concept, interleave concise explanation, mathematical formula, Python, and
   actual rendered Fortress definition immediately adjacent. Teach both the
   transformer and the construction of its notation. Show supporting definitions
   and inherited behavior; do not hide machinery to manufacture apparent brevity.
   Compare the mathematical core and required support separately from tests,
   benchmarks and comments. Explain substantive alternatives explored and why
   the chosen form is preferable. Avoid large code dumps with detached prose.

   Render actual source through the repository's Fortify toolchain, retain inputs
   and figures, and inspect them visually. Do not hand-typeset a prettier
   approximation of the program. The rendering pipeline is now prepared and
   verified: source `experiment/render-env.sh` after `experiment/env.sh`, then
   `python experiment/render.py SOURCE.fss OUTPUT_DIRECTORY` (or use a `.tic`
   sheet containing actual source excerpts). Inspect its PNG and retain the SVG.
   The render helper, render environment/tools/checks and dependency manifests
   under `experiment/` are permitted reads. Do not repeat dependency setup.
   Plain ASCII alone does not meet the deliverable.

3. **A reviewable process record:** meaningful runnable probes including failures,
   source versions, command logs, validation data and brief milestone notes
   (attempt, observation, decision, uncertainty, evidence links). No narration
   quota or exhaustive internal-reasoning request. These are partial work
   artifacts, not a full session transcript. The recorder does not redact secrets;
   do not log credentials or dump environment variables.

Preserve the independent design and evidence before comparison with prior work.
Subsequent independent review may challenge the solution and investigative
claims. The coordinator handles review and eventual comparison. Evaluate results
without self-praise or treating this single specimen as proof that coding is solved.
