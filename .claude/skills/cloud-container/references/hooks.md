# The transcript backup and the git-check hook

This part is for the coordinating session. Two Stop hooks run in this container.

## The transcript backup

The backup's Stop hook runs `/home/user/fortress-transcripts-blinded/scripts/backup.sh`. The hook returns at once, and a detached runner does the work. It copies the transcripts of every session in the container, Workflow agents' included, into that worktree of the orphan branch `transcripts-blinded`. Then it commits, pushes and packs. A pass takes about 10 s and writes one line to the worktree's `.backup.log`, which keeps the last 200.

The tracked `.claude/settings.json` registers the hook, beside the compaction hook. `explorations/experiment/setup.sh` adds it to `~/.claude/settings.json` only if the tracked file does not. If both files register it, each turn's end runs two passes, about 4 s apart, which the backup's lock runs one after the other. They do no harm.

Its blind spots:

- It runs when a turn of the main session ends, not when an agent finishes. A session inside one long turn is not backed up, however much its agents do. Check-ins end turns (`stops.md`).
- It copies transcripts, not trees. Uncommitted work in a worktree is not covered.
- If the container dies within about 10 s of a turn's end, that turn's snapshot is lost. While agents run in the background, do not stop the turn in the seconds after a reply.
- It swallows every error and never holds up the session, so a failed push is silent. Read the `push=` field of the log's last line, or the branch's state:

      tail -1 /home/user/fortress-transcripts-blinded/.backup.log
      git -C /home/user/fortress-transcripts-blinded status -sb

- The runner removes only an `index.lock` that is at least 10 s old and that no process holds open. A stale `/home/user/fortress/.git/refs/heads/transcripts-blinded.lock` fails every later commit (`commit=failed` in the log). If no git process runs, remove it by hand.

The scripts that run are the copies in the worktree's `scripts/`. The reference copies in `explorations/coordinator/transcript-backup/` change nothing until you copy them into the worktree. If a pass fails in a way that this section does not name, read `explorations/coordinator/remote-container.md`, "How the snapshot works" and "Three traps".

## The platform's git-check hook

`~/.claude/stop-hook-git-check.sh` comes from the launcher (`--settings /root/.claude/launcher-settings.json`). It exits 2, which makes the session take another turn, whenever the tree has uncommitted changes, untracked files, or unpushed or unverifiable commits. Its reminders are advisory: decline one while the tree holds work that is not ready to commit or push.

To turn the hook off, give the script an empty body, which reads its input and exits 0. Keep the original in the session's scratchpad:

    cp ~/.claude/stop-hook-git-check.sh <scratchpad>/stop-hook-git-check.sh.orig
    printf '#!/bin/bash\ncat >/dev/null\nexit 0\n' > ~/.claude/stop-hook-git-check.sh

- The automatic permission check refuses this step, and also a check-in whose prompt would take it. The step runs only after the curator switches the session to manual mode.
- Every start of the process writes the original script again. So after each process stop the hook is back on: `grep -c stop_hook_active ~/.claude/stop-hook-git-check.sh` prints 1 or more. The `coordinator` skill's boot says how the curator is told.
