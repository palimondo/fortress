# Fortress independent experiment setup

Base: `palimondo/fortress`, `clean-ladder`,
`8332bd34faad28cac7231c4eb261827b6ce7d9f9`.
Astra progress branch: `codex/astra-microgpt`.

## Current result

The [HTML comparison article](worker/main/ARTICLE.html) ([Markdown](worker/main/ARTICLE.md)) and [executable](worker/main/MicroGPT.fss) are complete for the tiny deterministic fixture. Both selected and alternative formulations pass all logits, probabilities, 228 gradients, Adam updates and generated tokens. Twelve actual Fortify panels accompany the article. See [reproduction](worker/main/REPRODUCE.md), [current checkpoint](worker/main/RESUME.md), and [recovery instructions](RESUMING.md).

## The experiment's goal

Find and justify a canonical Fortress expression of microGPT whose executable,
typeset definitions expose the mathematics as it appears in ML papers. The
central test is whether the reader recognizes the correspondence **by eye**.
Correctness alone, or a Python transliteration printed through TeX, does not
meet this goal.

The main article teaches both how a GPT works and how its concise mathematical
notation is constructed in Fortress. Interleave mathematics, Python and actual
Fortify-rendered Fortress definitions. Show the supporting machinery, explore
substantive alternatives, justify remaining gaps, and retain process evidence.
The full assignment is in `WORKER_BRIEF_DRAFT.md`.

## Worker quick start — reuse the existing environment

Use this repository and its already compiled interpreter directly:

```sh
cd /workspace/scratch/60367cc738a0/fortress-experiment
source experiment/env.sh
```

Begin the notation experiment under `experiment/worker/`. **Do not repeat setup,
create another checkout/worktree, or rerun the baseline build/tests.** Build
repair is the coordinator's responsibility if a concrete failure occurs.
The procedure below is a recovery recipe, not the worker's onboarding task.

Blinding is an instruction-following test in the shared environment. Workers
must not read `/workspace/scratch/60367cc738a0/fortress/`,
`/workspace/scratch/60367cc738a0/fortress-transcripts/`, or
`/workspace/scratch/60367cc738a0/fortress-experiment/experiment/coordinator/`.
The brief gives the full boundary, including indirect retrieval of those files.

## Reproduce the environment only if recovery is needed

From the repository root, with Python 3.11+, curl, and GNU tar available:

```sh
python experiment/prepare.py
source experiment/env.sh
python experiment/record.py build 600 ant clean compileAll
python experiment/record.py interpreter-smoke 120 bin/fortress walk experiment/smoke.fss
python experiment/record.py testFast 900 ant testFast
python experiment/record.py testSystem 600 ant testSystem
```

The smoke program must print `42`; check its output as well as its exit code.
Toolchain download URLs and expected checksums are pinned in `toolchains.json`.
The selected tools are Temurin JDK 25.0.4.1+1 and Apache Ant 1.10.18.
The original build selects its bundled Scala 2.13.18 and ASM 9.10.1.
No Fortress source or build configuration changes were needed for setup.

Verified baseline: clean build passed (61 seconds); interpreter printed `42`;
`testFast` passed 1,377 tests (47 suites, 468 seconds); `testSystem` passed
382 tests (four shards, 130 seconds). All test failures/errors/skips were zero.

Rendering is now verified end to end on the original Buffon excerpt:
Fortify → TeX → DVI → SVG → visually inspected PNG. From the repository root:

```sh
source experiment/render-env.sh
python experiment/render.py YOUR_SOURCE.fss YOUR_OUTPUT_DIRECTORY
```

The helper also accepts `.tic` sheets. Render and inspect competing notation
candidates beside their mathematical formulas before selecting a design;
this is a central self-validation loop, not an article finishing step.
Original Fortify sources remain unchanged. Packages/checksums and Python
dependencies are recorded in `render-toolchains.json` and
`render-requirements.txt`. If transient dependencies are cleared, the coordinator
can restore them with `prepare-render.py`, without rebuilding Fortress.

The JDK is extracted under `/tmp/fortress-toolchains`. During setup its module
file repeatedly shrank from 146,008,035 to 68,550,656 bytes between workspace
command calls, despite a verified archive and successful extraction. Extracting
outside the workspace preserved its size and made javac work. The underlying
cause is unconfirmed. `FORTRESS_EXPERIMENT_JDK` can override the JDK location.

Run the regression targets sequentially: both delete their shared test-cache
root. Their internal parallelism already uses separate cache directories.

## Evidence and limitations

`evidence/` holds actual commands, UTC start times, base commits, elapsed times,
exit codes, and combined stdout/stderr. The recorder does not automatically
capture unrelated shell calls, file reads, edits, conversation, or model internals.
It does not redact credentials. Only use it for commands with non-secret
arguments and output; never use it for environment or credential dumps.
Keep source/probes alongside logs and add short milestone notes as work proceeds.
Live logs now stay under `/tmp` until completion. The initial system-test console
log lost its tail; its retained JUnit reports provide complete result counts.

Setup findings, including failed attempts, are recorded in `SETUP_NOTES.md`.
`WORKER_BRIEF_DRAFT.md` is the maintained worker assignment; completed work and
its limitations are recorded under `worker/`. Procedural blinding is not
filesystem isolation: agents share the filesystem and must follow the boundary.

The public checkpoint branch is `codex/astra-microgpt`. It preserves the
article, executable, rendered figures, fixtures, worker notes, command metadata,
and final numerical run logs. It is not a complete session transcript.
Coordinator-only and transcript-derived material stays local. Toolchains and
compiled build caches are excluded.

## Supplementary process archive

Supplementary historical logs, failed-source snapshots and rendering
intermediates have been retained locally in a lossless archive. Automatic
approval review blocked its publication; it is not included in this branch.
The original workspace retains its archive index and restoration command.
The directly browsable checkpoint includes the completed implementation,
its actual final numerical evidence and the worker's research notes.

To regenerate SVG/TeX figures, use the rendering commands in the reproduction
guide. The repository HTML edition uses the included PNG figures.
