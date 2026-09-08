# Resume the independent Astra experiment

## Coordinator

Check live agents first. A usage-limit error means the turn stopped; a saved
"started" command is not a live-process indicator. If the prior handle exists,
resume it; otherwise launch a fresh Astra lead with the approved brief and the
saved work below. Never describe last reported activity as current without a
live check. No automatic wake-up on credit reset has been established here.

Run `python experiment/resume-environment.py` from the existing repository root.
It restores only missing transient dependencies and does not rebuild Fortress.
Then source `experiment/env.sh` and `experiment/render-env.sh` as usual.

Pass the exclusions before any worker search. Use the same working checkout.
The worker must not read the sibling `fortress/`, `fortress-transcripts/`, or
`experiment/coordinator/`, including indirect retrieval. Only this independent
attempt's saved worker research is permitted for recovery.

## Worker recovery order

1. Approved `WORKER_BRIEF_DRAFT.md`: mathematical fidelity and early actual
   Fortify visual comparison remain central, even after context loss.
2. `worker/main/RESUME.md`, then the relevant subworker RESUME/NOTES files.
3. Inspect completed command metadata/logs newer than the prose checkpoint.
   They may contain progress or failures the stopped worker did not summarize.
4. Inspect current source and resume the next unresolved gate. Do not repeat
   completed exploration or baseline build/tests to reconstruct confidence.

Before each meaningful run, use `record.py`: it now records intent and copies
explicit `.fss`/`.tic` inputs under `worker/` with hashes before execution.
After completion it records actual output and exit status. Work interrupted
before completion may still lose live output; do not label that run passed.

At meaningful milestones keep a short RESUME update: verified results and log
paths, selected versus provisional decisions, unresolved failure, next action,
and delegated tasks that are complete. Save this before returning a milestone
report. No lengthy narration or full internal-reasoning record is requested.

The user authorized GitHub checkpoints on `palimondo/fortress`, branch
`codex/astra-microgpt`. Commit and push reviewed milestone files there, excluding
credentials, downloaded toolchains and build caches, and verify the remote SHA.
The branch preserves code, evidence and handoffs; it does not preserve live
worker context or the full conversation. A stopped worker may still require a
new explicit turn to resume. Restore only missing dependencies in this workspace;
a genuinely new machine also needs the baseline build described in README.md.

## Published experiment and local supplementary evidence

Resume from the public `codex/astra-microgpt` branch for the completed article,
source, figures, fixture and final validation logs. The shell has no GitHub write
credential; publication uses the connected GitHub app. Coordinator-only material
and the supplementary historical archive were withheld after automatic approval
review objections. They remain in the original workspace. Do not claim that
this public checkpoint is a full transcript or that the withheld archive has
been published. Re-render figures when SVG intermediates are unavailable.
