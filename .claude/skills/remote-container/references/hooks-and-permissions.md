# The hooks and the permission check

## The transcript backup

A `Stop` hook in `~/.claude/settings.json` runs `/home/user/fortress-transcripts-blinded/scripts/backup.sh` at the end of every turn of the main session. It returns at once and leaves the work to a detached runner, which copies the transcripts of every session in the container, Workflow agents' included, into that worktree of the orphan branch `transcripts-blinded`, commits, pushes and packs. A pass takes about 10 s and writes one line to the worktree's `.backup.log`.

Its blind spots:

- It fires on the main session's Stop, not when an agent finishes. A session inside one long turn is not being backed up, however much its agents do; check-ins end turns (`stops-and-resume.md`).
- It copies transcripts, not trees: uncommitted work in a worktree is not covered.
- A container that dies within about 10 s of a turn's end loses that turn's snapshot.
- It swallows every error and never holds up the session, so a failed push is silent. Read the `push=` field of the log's last line, or the branch's state:

      tail -1 /home/user/fortress-transcripts-blinded/.backup.log
      git -C /home/user/fortress-transcripts-blinded status -sb

- Only an `index.lock` at least 10 s old that no process has open is cleaned. A stale `/home/user/fortress/.git/refs/heads/transcripts-blinded.lock` fails every later commit (`commit=failed` in the log) until it is removed by hand, after checking that no git process runs.

The scripts that run are the copies in the worktree's `scripts/`, on the branch. Editing the reference copies in `explorations/coordinator/transcript-backup/` changes nothing until they are copied into the worktree.

## The platform's git-check Stop hook

`~/.claude/stop-hook-git-check.sh` comes from the launcher (`--settings /root/.claude/launcher-settings.json`) and is rewritten at every start of the session's process. It exits 2, which makes the session take another turn, whenever the tree has uncommitted changes, untracked files, or unpushed or unverifiable commits.

- Every start of the session's process turns it on. The curator may make it a no-op, in manual mode, since the automatic permission check refuses that step; the original is then kept in the session scratchpad as `stop-hook-git-check.sh.orig` until the next start brings the hook back.
- While it is back, its reminders are advisory. While the tree holds work that is not to be committed or pushed yet, a reminder is declined, never answered by committing or pushing that work.

## The compaction hook

A `SessionStart` hook with matcher `compact`, in the tracked `.claude/settings.json` and in `~/.claude/settings.json`, tells the session after every compaction to boot by `explorations/coordinator/README.md` before anything else. That boot is the coordinator's. A worker whose context is compacted re-reads its brief from the first message of its own transcript instead.

## The automatic permission check

- In auto mode a check refuses some steps even after the curator's go in chat: for example moving an earlier run's outputs back over a later run's, or a trigger whose prompt would turn the git-check Stop hook off again. A refused outcome is not pursued by another tool, another route or a later turn.
- The way through is the curator's: a switch of the session to manual approval, or a `/permissions` allow rule for the command.
- In manual mode every agent's commands wait for the curator's approval, so nothing runs unattended; auto mode lets a run go on alone.
