Reference copy of the transcript-snapshot scripts, for review in normal history
and so a fresh container finds them by cloning `main`. **These copies do not
run.** The copies that run live in `scripts/` on the orphan branches
`transcripts` and `transcripts-blinded`, which is where the `Stop` hook points;
`backup.sh` pushes whatever branch its worktree is on. Mechanism, re-arming
recipe and the traps: `../remote-container.md`.

Synced from `transcripts-blinded@974d9be7` on 2026-09-29: the hook returns at
once and a background runner copies, commits and pushes; the copier is
incremental. The branch's `.gitignore` there ignores `/.backup.*`, the
runner's local files (lock, request flag, copier state, log), which is not
copied here. `transcripts` still carries the scripts of 2026-09-17; the hook in this
container points at `transcripts-blinded`.
