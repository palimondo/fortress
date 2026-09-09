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

## The five-step method Run B follows (from `navigation-retrospective.md`, "Process changes, adopted forthwith", applied in order)

1. **Falsification gate for negative claims.** No "impossible / sealed / unsupported / needed" enters the program's design or the article until a worker given the goal of achieving the thing (never "verify it fails") has failed with spec citations. The merged gap ledger's NEGATIVE-VERIFIED rows count as already gated; NEGATIVE-BOUNDED and CONTESTED rows do not.
2. **Mechanism inventory as the de-biasing artifact.** Before choosing representations, one pass over the specification's full table of contents produces the checklist of Fortress mechanisms, with the un-mainstream ones flagged (component algebra and `except` imports, where-clauses, functional methods, coercion, dimensions, `value` objects, `comprises` sealing, properties and tests, distributions). Every design decision is argued against the list, not against whatever came to mind.
3. **Epistemic-status marks on every fact used.** POSITIVE-VERIFIED (ran, output recorded) vs NEGATIVE-BOUNDED (mechanisms tried, listed, not exhaustive). The gap ledger supplies the marks; the article carries them.
4. **Blind replication before page claims.** Any language-capability claim that will appear in the article is first handed to a worker without the article's reasoning, with the goal of reproducing it from spec and probes.
5. **Forecasts priced from the object.** Every "this design costs N lines / this carrier is net negative" is priced by writing the skeleton, never by enumerating deletions.

Then the deliverable steps as in the blinded brief: pinned reference and derived goldens (real model, every gradient, Adam step, sampling); materially different candidate forms rendered early and judged by eye beside the formula; the chosen form justified against the alternatives; article with formula, Python and rendered Fortress adjacent; process record with failures kept; final HTML presentation.

## Design decision (Pavol, 2026-09-08)

**Matrix-level autodiff is primary.** Reasons, in Pavol's terms: it is the more canonical mathematical form (papers state backprop at the matrix level); everything learned about performance points toward primitive arrays and structure-of-arrays layouts; Karpathy's mutable `grad` field on every scalar is the root problem of the reference design, not something to reproduce; the program should use value objects and immutable data as far as the mathematics allows. The scalar Karpathy-faithful design is the explored alternative in the article, not the flagship.

Three ways to hang the graph on the computation instead of the number. Only the first is probed and finite-difference-checked in `explorations/matrix-ad-probes/` (Q3, `p08`, `p09`); the other two are plausible and unprobed, and the list is not exhaustive: (1) a tape of backward closures with a thin tensor handle; (2) an expression tree walked in reverse; (3) functional backprop, each op returning its value and a linear map from output cotangent to input cotangents, composed by the chain rule, sharing handled by summing cotangents at fan-out (Elliott, "The simple essence of automatic differentiation", 2018). The coordinator's recommendation is (3), as the most immutable and the best fit for Fortress's parallel reductions; Run B's worker is to be given the goal, not the choice, and must render and compare at least two of the three before selecting.

Known costs carried into the design (all in the gap ledger): slices and views of library vectors lose the algebra unless re-wrapped in a small user object extending `Vector`; `SUM` rejects vectors, so a user reduction or user big operator over vectors is the spec-legal route; runtime-sized shapes come from the `array` factory; a bare accumulator in a parallel `for` loses updates, so accumulation is by reduction or `atomic`; array comprehensions, `^T`, `^k`, `‖·‖` and the `matrix` factory's off-diagonal bug bite `RR64` too.

## Where it runs (decided 2026-09-09)

In the blinded run's own session and branch, `claude/worker-brief-fable-vnnuv8`, after Pavol clears that session's conversation: the coordinator merges the full work-branch tree onto that branch, adds `experiment/RUN_B_BRIEF.md` beside the reused `setup.sh` and `env.sh`, and Pavol pastes the initial prompt (pull fast-forward, read the brief, follow it). The session's transcripts keep landing on `transcripts-blinded` through the existing Stop hook. The brief was adversarially reviewed by an independent worker before launch (17 findings applied or consciously declined; review in the coordinator's scratchpad, not committed). The result is imported from that branch into `explorations/run-b/` afterwards, as the blinded run was.

## Inputs the brief must fold in

- Adopt lists: `explorations/reviews/blinded-fable-vs-astra.md` §2.7-equivalent and `astra-vs-ours.md` §2.7 (tight `/` for stacked fractions; ASCII beside every render; Python adjacent; Adam rendered; real-model goldens of every gradient and Adam step; no fixture constants in the core; no verification plumbing in the core).
- Facts: `explorations/fortress-gap-ledger.md` (use its rows and marks rather than restating claims), `CLAUDE.md` build facts, the Fortify pipeline (`bin/fortick`, `TEXINPUTS=".:$FORTRESS_HOME/Fortify:" latex`, `dvisvgm --no-fonts --exact-bbox`, chromium screenshot; needs emacs-nox).
- Process: transcript backup via the Stop hook to the `transcripts` branch; commit-and-push-as-you-go; fast-forward `main` after every push; delegation to Opus workers with pointer briefs; Fable tokens conserved.

## Run B launched (2026-09-09), and the coordinator's own attempt

Run B is running in the cleared blinded session on `claude/worker-brief-fable-vnnuv8` from commit 848dfd9f2 (merge of the work branch at 056743f7a onto the blinded run's last commit, plus `experiment/RUN_B_BRIEF.md`). Its transcripts land on `transcripts-blinded`. This session cannot be woken by it: Pavol reports when it finishes, and the result is then imported from that branch into `explorations/run-b/` exactly as the blinded run was, followed by a Phase 1 review of it alone and a Phase 2 comparison, both by independent workers.

Pavol asked whether this coordinator session should make its own attempt under the same brief, and the answer was yes, as a second sample of the informed run at the opposite extreme of anchoring (this session carries every prior design, the reviews and the ledger). Conditions agreed:

1. Work goes in `explorations/run-b2/` on the work branch `claude/handover-reading-vn8zgr`, never in `explorations/run-b/`, which is reserved for the import of the other session's result.

2. This session does not review its own run. Phase 1 reviews of both runs and the Phase 2 comparison go to independent workers, briefed with no favour to either.

3. Exploration and probes go to Opus workers to conserve Fable tokens; context gathering, design and implementation happen in this thread, as the strongest prior run did. Because compaction is the real risk here, design state is committed as it is reached (commit-and-push-as-you-go, `main` fast-forwarded), which is this session's mitigation rather than a process duty.

The brief this attempt follows is `experiment/RUN_B_BRIEF.md` on branch `claude/worker-brief-fable-vnnuv8` (also in the coordinator scratchpad as `run-b/RUN_B_BRIEF.md`, beside the adversarial review `run-b/REVIEW.md` whose 17 findings shaped it). Where the brief says "the branch you are on", read the work branch; where it says `explorations/run-b/`, read `explorations/run-b2/`; the setup section does not apply, this container is already built.

### What to do after compaction

1. Re-read this file, `explorations/protocol.md`, and `experiment/RUN_B_BRIEF.md` (from the branch above, or the scratchpad copy). Check `git status` and `git log --oneline -3`; whatever is in `explorations/run-b2/` is the state of the attempt.

2. If `explorations/run-b2/` does not exist, the attempt has not started. Start with the brief's gate 2, the mechanism inventory from `Specification/fortress/fortress.toc`, committed as `explorations/run-b2/inventory.md`, then the two autodiff skeletons (value-plus-backward-closure tape, and functional backprop with linear maps; the expression tree if time allows), rendered with Fortify and judged beside the formulas before choosing. Report to Pavol when the first rendered pairs exist, with the artifact link on the first line.

3. If it exists, continue from its latest committed state; the design decisions so far are in the committed files, not in memory.

4. Do not touch `explorations/run-b/`, the ledger, or anything under the historical tree. The delegation process agreed with Pavol (condition 3, restated by him after compaction on 2026-09-09): every probe, exploration, replication and compilation task (gate-1 attempts, gate-4 replications, gap tables, review harnesses, reviews) goes to an Opus worker with a pointer brief carrying the brief's standing rules verbatim; this thread keeps only context gathering, design, implementation and the article. Do not run probes here that a worker could run.

5. When Pavol says the other session has finished: import its `explorations/run-b/` from `claude/worker-brief-fable-vnnuv8` verbatim, then commission the reviews (condition 2). Pavol decides the order if both are in flight.

### Run B2 state (2026-09-09)

The coordinator's attempt is built, verified and written up: `explorations/run-b2/` (design state in `design.md`, article published at https://claude.ai/code/artifact/87d25c95-ab48-4ea9-a3ac-507b359e3050). Checks pass to 9e-16 on two golden steps with three replayed samples. What remains for Run B2 is `gaps.md` from the pending replication probes `probes/g4c_*` to `g4i_*`, and possibly a tightening pass on the article after Pavol reads it. Then, when the other session finishes, step 5 above.
