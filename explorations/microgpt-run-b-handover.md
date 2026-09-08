<!-- Handover note written by the coordinating session on 2026-09-08 so that
     the state of the microGPT arc and the pending Run B survive context
     compaction. Read this before touching Run B. Facts cite their files. -->

# microGPT arc: state and the pending Run B

## Where the arc stands

Three independent, running, golden-verified microGPTs in Fortress exist in this tree, plus the reviews that compare them:

- Ours, iterated in the open: `explorations/microgpt2.fss`, presented at https://claude.ai/code/artifact/ec92269d-059c-4f49-933f-fd9f9d5b953d (page version `three-routes`). Design journal and reports: `explorations/microgpt2-*.md`, `explorations/libvector-report.md`, `explorations/sum-experiment-report.md`, `explorations/navigation-retrospective.md`.
- The blinded Claude run (no access to our work): `explorations/blinded-fable/` (source `src/MicroGPT.fss`, article `article.html` published at https://claude.ai/code/artifact/0eee4d26-6701-4db7-a432-70218a5f022f, notes, 40 probes, gap table `notes/gaps.md`, command log). Its brief: `experiment/WORKER_BRIEF_FABLE.md` on branch `blinded-fable`.
- Astra's run (ChatGPT, same brief lineage): `explorations/astra/` (source `worker/main/MicroGPT.fss`, `ARTICLE.html`, memo, reconstructed timeline, recorded command evidence, extracted process archive). No session transcripts exist for it.
- Reviews, each a Phase 1 (one run alone) then Phase 2 (comparison): `explorations/reviews/astra-phase1.md`, `astra-vs-ours.md`, `blinded-fable-phase1.md`, `blinded-fable-vs-astra.md`; published at https://claude.ai/code/artifact/ef3c1fbc-d663-4740-87bf-a28b2c0ad9e3 (Astra) and https://claude.ai/code/artifact/f61ca5d3-157f-410e-bdef-31a4884e429b (blinded run). Verdict in short: the blinded run beat Astra 7 pairs to 2 by eye, with goldens bit-identical to upstream on the real model; Astra's two wins come from a tight `/` that Fortify sets as a stacked fraction; both runs and ours converged independently on `except { opr BIG + }` for Σ.
- The merged, re-verified gap ledger from all three: `explorations/fortress-gap-ledger.md` (83 rows, epistemic marks, reproducers in `explorations/gap-ledger-probes/`).
- The matrix-level autodiff probes (graph on the computation rather than on a custom scalar, over the library's own `Vector`/`Matrix` of `RR64`): `explorations/matrix-ad-probes/REPORT.md`. Verdict: works on the interpreter; slices are views but lose the algebra unless re-wrapped; `SUM` rejects vectors, a user reduction is the spec-legal route; bare accumulators lose updates in parallel `for`.

Performance is a separate track with its own proposal, `explorations/performance-roadmap.md`, not part of Run B.

## What Run B is

Pavol's definition: the best-possible artifact, produced after both blinded runs and their reviews landed, by a run that has everything: the five process methods from `explorations/navigation-retrospective.md` (falsification gate for negative claims, mechanism inventory from the spec's table of contents, epistemic-status marks, blind replication before page claims, forecasts priced from the object), plus every verified fact in this tree, plus the adopt lists from both reviews. Deliverables as in the blinded brief: running verified program, an educational article with formula/Python/Fortress adjacent and figures rendered from actual source, and a reviewable process record; final presentation as HTML. Same standing rules: spec first, never modify the historical language or library, classify every departure, no self-praise, no model names in committed artifacts.

## The pending decision (Pavol will come back to it)

Which design is primary:

1. Scalar autodiff, Karpathy-faithful, as all three runs did; the blinded run's sequence-level form with `Vec`/`Mat` carriers is the best specimen so far.
2. Matrix-level autodiff over the library's own `Vector`/`Matrix`, probed in `matrix-ad-probes/` but never built end to end; closer to how papers state backprop, drops the custom scalar and the Σ replacement, and is the driver the performance roadmap wants.

Coordinator's recommendation, not yet accepted: build both under the golden gate and let the by-eye comparison decide. Next step once decided: draft the Run B brief for Pavol's review before anything launches. Nothing about Run B is launched or drafted yet.

## Inputs the brief must fold in

- Adopt lists: `explorations/reviews/blinded-fable-vs-astra.md` §2.7-equivalent and `astra-vs-ours.md` §2.7 (tight `/` for stacked fractions; ASCII beside every render; Python adjacent; Adam rendered; real-model goldens of every gradient and Adam step; no fixture constants in the core; no verification plumbing in the core).
- Facts: `explorations/fortress-gap-ledger.md` (use its rows and marks rather than restating claims), `CLAUDE.md` build facts, the Fortify pipeline (`bin/fortick`, `TEXINPUTS=".:$FORTRESS_HOME/Fortify:" latex`, `dvisvgm --no-fonts --exact-bbox`, chromium screenshot; needs emacs-nox).
- Process: transcript backup via the Stop hook to the `transcripts` branch; commit-and-push-as-you-go; fast-forward `main` after every push; delegation to Opus workers with pointer briefs; Fable tokens conserved.
