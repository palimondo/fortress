# Fortress microGPT, Run B

Two independent blinded runs of this experiment exist, plus an earlier open run and the reviews that compared all three. Run B is not blinded: you have all of it, and the task is the best artifact the language allows.

## Mission and standard of success

Find and justify a canonical, idiomatic Fortress expression of microGPT whose executable, typeset definitions look as close as possible to the mathematics used in transformer and ML papers. Put each mathematical formula beside its actual rendered Fortress definition: the reader must be able to judge the correspondence by eye. This visual and semantic correspondence is the forcing function. A look-alike glyph or a prettier label does not substitute for an executable definition with the intended meaning.

The main article teaches two things together, with equal weight: how a GPT works, and how to construct the Fortress building blocks that make its mathematical core expressible so concisely. Show what the language already gives, what your user-level definitions add, and where a mismatch remains.

Rendering is an early self-validation gate: render substantive candidate forms, inspect them beside the formula, and revise before selecting the design. Do not postpone visual fidelity until article production.

The prior programs' notation is a result to beat, not a starting point. For each rendered pair, derive the Fortress spelling from the formula and the mechanism inventory first, then compare with what the prior runs wrote; where you land on their spelling, say what else you considered and why it lost.

## Setup

Run `bash experiment/setup.sh` and wait for it (it is idempotent: about a minute on a warm container, 5 to 10 minutes on a fresh one; do not poll or narrate it). If its last line ends with `SETUP RESULT: PASS`, continue with the mission without stopping. If it ends with `SETUP RESULT: FAIL`, paste the summary block and `tail -40 experiment/setup.log`, then stop; the coordinator will recover the environment manually. Do not repair the environment yourself.

Then `source experiment/env.sh` in every shell that runs Fortress; run programs as `./bin/fortress PATH.fss`; the component name must match the filename without `.fss`. The env file sets single-thread mode; raise `FORTRESS_THREADS` deliberately when you test parallelism. Build facts and traps are in `CLAUDE.md`. Do not run the full test suites; the baseline is green.

## Branch, layout, and who decides

This brief supersedes the working mode in `CLAUDE.md` and `explorations/protocol.md` for this session: no one is available to answer during the run; the work branch is the branch you are checked out on; nothing is fast-forwarded to `main`; you commit your own deliverables without approval, and where a question would go to a human, decide, state the decision and its reason in the article, and continue. `CLAUDE.md`'s build facts still hold.

Commit and push to the branch you are on, and to no other, as you reach milestones. Expect a long run; commit at each milestone so nothing is lost. Everything you produce goes under `explorations/run-b/`: the program and its checks in `src/`, figure sources (`.tic`, `.svg`) in `figures/`, probes in `probes/`, the article as `article.md` and `article.html`. Keep the probes you write, including the ones that failed, each with its captured output beside it (`|& tee probes/NAME.out`), error text verbatim; those files are what the article's marks and the departures table cite. New language gaps go to `explorations/run-b/gaps.md` in the ledger's row format with the same status marks; do not edit the ledger itself. A `.gitignore` in `explorations/run-b/` excludes rendering byproducts and `reference/*.py`. No notes or decision logs are required: the session transcript is the process record.

## What is in the tree

- `explorations/microgpt-run-b-handover.md`: the state of the arc with links to everything below.

- `explorations/fortress-gap-ledger.md`: 83 rows on what Fortress does and does not do, each with a status mark and a classification, and where one exists a spec citation and a reproducer (paths relative to `explorations/`). Use its rows instead of re-deriving them; cite them by number.

- `explorations/matrix-ad-probes/REPORT.md`: probes establishing that matrix-level reverse-mode autodiff over the library's own `Vector` and `Matrix` of `RR64` works on the interpreter, and what it costs.

- `explorations/reviews/`: the four reviews. The rendered-pair judgement, the standard your renders are held to, is section A of the two Phase 2 reviews and section 3 of the two Phase 1 reviews. The adopt lists (`blinded-fable-vs-astra.md` section I, `astra-vs-ours.md` section G) are evidence, not a checklist: read the items that point at the strongest artifact (Fable ← Astra, Ours ← Astra, and the shared list) and adopt or reject each with a reason; the rest are addressed to the weaker runs, and where any item conflicts with the design decision below, the decision wins.

- The prior programs and articles: `explorations/blinded-fable/` (source, article, notes, 40 probes, goldens), `explorations/astra/`, and `explorations/microgpt2.fss` with `explorations/microgpt2-*.md`, `libvector-report.md`, `sum-experiment-report.md`.

- `explorations/navigation-retrospective.md`: the systematic errors of the earlier runs and where the quality gates below come from.

The specification is `Specification/`; its TeX sources, not the PDF, are the first authority on what the language means, and `Specification/fortress/fortress.toc` is its built table of contents. `Library/` and `ProjectFortress/` are the authority on what the implementation does; small probes settle disagreements. `explorations/repo-internals.md` explains the interpreter's mechanics when you need them.

## Design decision: matrix-level autodiff is the flagship

The project has decided that the flagship program differentiates at the matrix level, with the graph hung on the computation rather than on a custom scalar. The reasons, in the project owner's terms: it is the more canonical mathematical form, since the papers state backprop at the level of matrices; everything learned about performance points toward primitive arrays and structure-of-arrays layouts; the mutable `grad` field on every scalar in Karpathy's reference is the root problem of that design, not something to reproduce; use `value object`s and immutable data as far as the mathematics allows. The scalar, Karpathy-faithful design is the explored alternative in the article; the three prior verified scalar programs in this tree serve as that alternative, cited, rather than being rewritten.

One way to hang the graph on the computation is probed and finite-difference-checked on the interpreter (`matrix-ad-probes/REPORT.md`, Q3, `p08` and `p09`): each operation returns its value paired with a backward closure, and the closures compose into a tape. Two more are plausible and unprobed: an expression tree walked in reverse, and functional backprop, where each operation returns its value together with a linear map from output cotangent to input cotangents, composed by the chain rule, with sharing handled by summing cotangents at fan-out (Elliott, "The simple essence of automatic differentiation", ICFP 2018). The list is not exhaustive. You are given the goal, not the choice: build and render at least two materially different shapes as working skeletons before selecting, and let immutability, fit with Fortress's reductions, and how the typeset definitions read beside the formulas decide.

The decision fixes the flagship for this run: build it at the matrix level regardless. Where a rendered pair reads better in the scalar form, show both renders in the article and say so; that evidence is part of the result, not a reason to change course.

## Quality gates

These are the process corrections the earlier runs paid for. They are gates, not extra work products.

1. No negative claim ("impossible", "sealed", "unsupported", "needed") enters the design or the article on the strength of a first error. It is gated either by a NEGATIVE-VERIFIED ledger row, or by an attempt whose goal was to achieve the thing (never "confirm it fails") that failed with spec citations. NEGATIVE-BOUNDED and CONTESTED rows are open.

2. Before committing to representations, take one pass over the specification's table of contents and list the mechanisms you could be using, especially the un-mainstream ones: component algebra and `except` imports, where-clauses, functional methods, coercion, `value` objects, `comprises`, dimensions, properties and tests, generators and reductions. Decide against that list, not against what came to mind first.

3. Every language fact the article states carries its mark: verified by a run whose output exists in `probes/`, or bounded by the mechanisms tried. A spelling inherited from a prior run without the comparison asked for in the mission is an unmarked claim.

4. A language-capability claim that is new (not a ledger row) is reproduced from the specification and a probe by someone who has not seen your reasoning, before it goes into the article. This, and gate 1, are the two places where a worker agent is the right tool. Whether and how to delegate anything else, and which model, is your call; the previous run did its context gathering and implementation itself, and that worked.

5. Cost forecasts ("this design costs N lines", "this carrier is net negative") are priced by writing the skeleton, never by counting deletions.

## Standards the result is judged by

Verification: the reference's actual configuration (the 4,192-parameter model on the real data) over at least two training steps, every gradient, the Adam step, and sampling with the reference's random stream replayed, against goldens you derive from the pinned Python, with a written tolerance justification (a matrix-level design will not be bit-identical, since reduction order differs). The reference is Karpathy's microGPT article and source, https://karpathy.github.io/2026/02/12/microgpt/ ; pin the revision and record its sha256 (both prior runs pinned `d47d88c2fd432c8ebdc1048beab7f7eb64ea7e0e664e11b812d72a6d95ebccee`). Run the Python locally under `explorations/run-b/reference/` and do not commit it; its license is unstated. The blinded run's goldens (`explorations/blinded-fable/checks/checks_2steps.json`) are a cross-check on your derivation, not a substitute; its data fixture (`explorations/blinded-fable/src/MicroGPTData.fss`, verified identical to upstream) may be reused with a citation. No fixture constants and no verification plumbing in the core.

The by-eye test must be fair: the formula typeset at parity with the Fortress render (same size, MathML or LaTeX); Python quoted verbatim from the pinned source beside it; the ASCII source beside every render, so the reader sees what was typed for `·`, Σ, `^T`. The whole layer is rendered, including the head assembly, Adam and sampling. A departures table classifies every remaining notational departure (implementation gap, library gap versus spec, library bug, design limit, justified choice) with a reproducer and the ledger row where one exists.

The article's source is Markdown (`article.md`); the deliverable is the self-contained HTML built from it, figures inlined or committed beside it, legible in light and dark, wide content in scrollable containers, teaching the transformer at the same weight as the notation, with a bounded training demo and samples shown.

## Standing rules

- Do not modify the historical language, compiler, runtime or shipped library to make the program work. Nothing gets unsealed. User-level types, operators and library modules are welcome.

- Neither a first interpreter error nor a self-imposed representation proves impossibility; interpreter acceptance alone does not establish conformance.

- No invented big-operator glyph the ML literature never writes (the retired ⊕). A user-defined reduction behind a notation the literature does use, Σ or concatenation, is exactly right. No rule from a single data point.

- Do not suppress the language's parallelism merely to reproduce Python's evaluation order; distinguish true dependencies, numerical effects and implementation choices. The interpreter is two to three orders of magnitude slower than CPython on this workload (`explorations/performance-roadmap.md`): keep executions bounded, no long training, and do not let speed dictate notation.

- Rendering pipeline, from the figure's directory with `experiment/env.sh` sourced: `$FORTRESS_HOME/bin/fortick NAME.tic`, then `TEXINPUTS=".:$FORTRESS_HOME/Fortify:" latex -interaction=nonstopmode NAME.tex`, then `dvisvgm --no-fonts --exact-bbox -o NAME.svg NAME.dvi`, then `/opt/pw-browsers/chromium --headless --no-sandbox --disable-gpu --screenshot=NAME.png NAME.svg` to inspect. Render actual source, never a hand-typeset approximation.

- No self-praise, no claim that one specimen proves anything about coding in general, no model names in committed artifacts. No pull requests.

When you finish, the last message lists the commit that holds the deliverables, the check results, and the paths of the program and the article. The coordinator handles review and comparison with the prior runs.
