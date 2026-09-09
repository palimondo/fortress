# 04 — Final milestone: deliverables and an honest assessment

Date: 2026-09-08. Branch: `claude/worker-brief-fable-vnnuv8`.

## Delivered
1. `src/MicroGPT.fss` — running, verified microGPT (autograd, model, loss, Adam,
   sampling), sequence-level formulation; `src/alt/v2_kvcache_MicroGPT.fss` and
   `src/alt/v1_MicroGPT.fss` — two other complete, verified formulations. All three
   pass the 52-check reference comparison (`checks/check_run_v{1,2,3}_output.txt`):
   logits ≤ 3.4e-16, losses ≤ 4.5e-16, gradients ≤ 2.3e-16, Adam-updated parameters
   ≤ 3.1e-16, identical sampled tokens and texts with the recorded draws.
   `checks/train_demo_output.txt` — bounded training demo (12 steps from the
   reference's initial weights; first two losses equal the reference's; 423 s) and
   4 samples with Fortress's own random draws.
2. `article.html` — self-contained (2.7 MB, all SVG inlined, light/dark), 10 sections,
   every Fortress figure typeset from the actual source (`tools/figs.py` with
   `(* FIG *)` markers), formulas rendered by the same TeX pipeline, Python excerpts
   quoted from the pinned gist.
3. Process record: `notes/01…04`, `notes/gaps.md`, 39 probes, `transcript.txt`,
   `checks/checks_2steps.json`, tools.

## Assessment (what is and is not established)
- The correspondence claim is established by eye and by execution for every
  definition in the model: the figures are the program, and the program reproduces
  the reference. This is one specimen with one interpreter; it says nothing about
  Fortress at scale or about the compiler path (`fortress compile`), which was not
  exercised.
- Interpreter acceptance ≠ specification conformance: the one construct that relied
  on interpreter leniency (nullary `SUM` overload with different static parameters)
  was replaced by the spec's `except` mechanism; the unified-∑ variant that works only
  dynamically was declined. The typed program still depends on the interpreter's
  runtime checking; no static type checker was run (the historical `typecheck`
  command was not part of the brief's baseline and was not exercised).
- Parallelism: v3's per-position comprehension is parallel by language semantics;
  all measurements are single-threaded (FORTRESS_THREADS=1 as required). No claim
  is made about speed-ups.
- Cost: ~10k graph nodes/s; 40 s per training step; the article reports the numbers.
- Departures that remain visible in the primary form (all classified in
  `notes/gaps.md`): `Mat(⟨W_q x | x ← X⟩)` instead of `X W_qᵀ`; `.cols(c)`;
  `(heads_h)[t]` parenthesized because of an interpreter bug; static-arg
  annotations in the parameter-flattening plumbing and the generated data.

## Uncertainty / open items for review
- Fortify double-subscript failures were avoided by naming (`Qh`, `E`, `P`); a reviewer
  may prefer `Q_h`, which would need a typesetter fix.
- The `except { opr BIG + }` spelling (rather than `opr SUM`) is an interpreter
  tokenization detail; the spec's grammar suggests `opr ∑` should also work (it parses).
- The claim "positions may run in parallel" for v3 was not measured with threads.
