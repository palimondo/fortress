# Independent Fortress microGPT experiment — Fable-side blinded run

This brief parallels an independent assignment given to another model in a
separate environment. The point is a fair, comparable baseline: same mission,
same standard of success, same blinding discipline, different environment
plumbing. You are the coordinator of this run: you may delegate to worker
agents (any model, any number) as your investigation requires — every
delegated brief must carry this brief's instruction-following boundary.

## Mission and standard of success

Find and justify a canonical, idiomatic Fortress expression of microGPT whose
executable, typeset definitions look as close as possible to the mathematics
used in transformer/ML papers. Put each mathematical formula beside its actual
rendered Fortress definition: the reader must be able to judge the
correspondence **by eye**. This visual and semantic correspondence is the
forcing function.

The main article teaches two things together, with equal pedagogical weight:
how a GPT works, and how to construct the Fortress building blocks that make
its mathematical core expressible so concisely. Show what the language already
gives, what your user-level definitions add, and where a mismatch remains.

A correct Python transliteration can be an intermediate check; it is not the
destination. TeX-printing that transliteration does not establish mathematical
expressiveness. Explore materially different ways to express the computations;
do not claim a canonical result after the first working design. You choose the
investigative workflow and representations and justify the resulting form.

Rendering is an early self-validation gate: render substantive candidate
forms, inspect them beside the mathematical formula, and revise before
selecting the design. Do not postpone visual fidelity assessment until article
production.

This is also a concrete test of connecting knowledge of mathematics,
transformers and programming languages in an unfamiliar codebase, with
inspectable evidence.

## Environment setup (once)

This is a fresh checkout of the branch `blinded-fable`. Build once (~2 min):

```sh
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH
export FORTRESS_HOME=$PWD          # the repo root
unset JAVA_TOOL_OPTIONS
ant compileAll
```

Run probes as `FORTRESS_THREADS=1 ./bin/fortress PATH.fss` (the shared box
requires the single-thread setting). The Fortress component name must match
its filename (sans `.fss`). The first interpreter run generates library
caches under `default_repository/caches/` (takes a few minutes once); wipe
that cache directory if edits to `Library/` files ever seem to have no effect
— but you are not to change the shipped library (see below). Do not reinstall
Java or Ant, and do not run the full test suites as onboarding; the baseline
is known green (1,377 testFast; 382 testSystem). If an actual environment
failure occurs, report its concrete evidence rather than rebuilding the world.

Create all your work under `experiment/worker/`. Keep a command log: append
each probe invocation and its captured output to
`experiment/worker/transcript.txt` (redirect with `tee -a`).

### Rendering pipeline

To typeset actual Fortress source: write a `.tic` file containing the source
excerpt, then from its directory (with `$FORTRESS_HOME` set as above):

```sh
$FORTRESS_HOME/bin/fortick NAME.tic          # .tic -> .tex
TEXINPUTS=".:$FORTRESS_HOME/Fortify:" latex NAME.tex
dvisvgm --no-fonts --exact-bbox -o NAME.svg NAME.dvi
/opt/pw-browsers/chromium --headless --no-sandbox --disable-gpu \
  --screenshot=NAME.png NAME.svg              # rasterize to inspect
```

Inspect the PNG visually and retain the SVG and `.tic` inputs. Delete the
`.tex`/`.dvi`/`.aux`/`.log` byproducts. Do not hand-typeset a prettier
approximation of the program; render actual source. Plain ASCII alone does
not meet the deliverable.

## Instruction-following boundary

Start from this brief only. Prior experiments toward the same goal exist in
this repository's history and elsewhere; independence relies on obeying these
instructions.

This branch has been prepared: the prior work (an `explorations/` directory, a
`research/` directory, and a root `CLAUDE.md`) is absent from the checkout by
construction. It still exists in git history and on other branches, so:

- Do not use `git log`, `git show`, `git diff`, `git checkout` of other
  revisions, or any ref/branch archaeology — work with this checked-out tree
  only.
- Do not fetch other branches of this repository, its GitHub web views, pull
  requests, or issues.
- Do not retrieve prior published artifacts or pages about Fortress microGPT
  work, and do not use conversation/memory retrieval of prior sessions.
- Report any accidental exposure.

Every worker you delegate to must receive these same restrictions verbatim in
its brief.

Freely explore this checkout's `Specification/` (TeX sources; no PDFs),
`Library/`, `ProjectFortress/`, `Fortify/`, `bin/` and other original source
materials. The exclusions restrict contamination, not investigation of
Fortress's capabilities. General web research on transformers, ML notation,
and Fortress's public history is allowed; prior microGPT-in-Fortress material
is not.

## Design and validation

Use Karpathy's original microGPT article and Python source as the behavioral
reference: https://karpathy.github.io/2026/02/12/microgpt/ . Pin the actual
source revision. If article and gist differ, identify and consistently select
a variant. You may download and run the Python locally under
`experiment/worker/` to derive deterministic checks (logits/loss/gradients
under fixed weights, with justified tolerances); do not commit the Python
source (its license is unstated).

For each building block, distinguish the mathematical computation from
accidents of the Python implementation. Investigate the language's
facilities, including reuse, algebraic structure and inference where useful.
Do not preselect an operator, type representation, evaluation order or
approach from an example. Target recognizable ML notation: where the formula
uses ordinary summation, seek that notation. A look-alike glyph or a prettier
label in the article does not substitute for an executable definition with
the intended meaning.

User-level types, operations and library modules are welcome. Do not change
the historical language, compiler, runtime or shipped library to make the
demo pass. Consult the specification's TeX sources for semantics,
source/library for actual behavior, and small probes for evidence. Neither a
first interpreter error nor a self-imposed representation proves
impossibility; investigate alternatives. Conversely, interpreter acceptance
alone does not establish specification conformance. Classify surviving
notational departures as an implementation/library gap, language-design
limit, or justified design choice, with reproducers and source citations.
Retain actionable gaps for a revival worklist without changing the historical
system during this experiment.

Do not suppress language parallelism merely to reproduce Python's exact
order. Distinguish true dependencies, numerical effects and implementation
choices. Measure cost honestly, but do not let interpreter speed dictate
notation. Keep executions small and bounded; no long training runs.

## Deliverables

All under `experiment/worker/`, committed and pushed to this branch
(`blinded-fable`) as you reach milestones — commit-as-you-go so nothing is
lost; push only to this branch.

1. **Running, verified microGPT in Fortress**, including the model,
   differentiation, training update and generation path for the pinned
   reference, with deterministic logits/loss/gradient checks derived from the
   Python reference (never from any prior Fortress solution) and bounded
   checks of remaining paths, with justified numerical tolerances.

2. **The main educational article and reproducible notation figures.** For
   each concept, interleave concise explanation, mathematical formula,
   Python, and actual rendered Fortress definition immediately adjacent.
   Teach both the transformer and the construction of its notation. Show
   supporting definitions and inherited behavior; do not hide machinery to
   manufacture apparent brevity. Compare the mathematical core and required
   support separately from tests, benchmarks and comments. Explain
   substantive alternatives explored and why the chosen form is preferable.
   Avoid large code dumps with detached prose. The article is a Markdown
   document with the rendered figures beside it; page production happens
   after review.

3. **A reviewable process record:** meaningful runnable probes including
   failures, source versions, command logs, validation data and brief
   milestone notes (attempt, observation, decision, uncertainty, evidence
   links). These are partial work artifacts, not a full session transcript.
   Do not log credentials or dump environment variables.

Preserve the independent design and evidence before any comparison with prior
work. Subsequent independent review may challenge the solution and
investigative claims. The coordinator of the overall experiment handles
review and eventual comparison. Evaluate results without self-praise or
treating this single specimen as proof that coding is solved.
