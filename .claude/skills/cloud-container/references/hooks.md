# The transcript backup and the git-check hook

This part is for the coordinating session. Two Stop hooks run in this container.

## The transcript backup

The backup's Stop hook runs `/home/user/fortress-transcripts-blinded/scripts/backup.sh`. The hook returns at once, and a detached runner does the work. It copies the transcripts of every session in the container, Workflow agents' included, into that worktree of the orphan branch `transcripts-blinded`. Then it commits, pushes and packs. A pass takes about 10 s and writes one line to the worktree's `.backup.log`, which keeps the last 200.

The tracked `.claude/settings.json` registers the hook, beside the compaction hook. `explorations/experiment/setup.sh` adds it to `~/.claude/settings.json` only if the tracked file does not. If both files register it, each turn's end runs two passes, about 4 s apart, which the backup's lock runs one after the other. They do no harm.

Its blind spots:

- It runs when a turn of the main session ends, not when an agent finishes. A session inside one long turn is not backed up, however much its agents do. Check-ins end turns (`stops.md`).
- It copies transcripts, not trees. Uncommitted work in a worktree is not covered.
- If the container dies within about 10 s of a turn's end, that turn's snapshot is lost.
- It swallows every error and never holds up the session, so a failed push is silent. At each check-in and after each process stop, read the log's last line, or the branch's state. A good pass reads `push=ok`, or `ahead=0 push=none`.

      tail -1 /home/user/fortress-transcripts-blinded/.backup.log
      git -C /home/user/fortress-transcripts-blinded status -sb

- The runner removes only an `index.lock` that is at least 10 s old and that no process holds open. A stale `/home/user/fortress/.git/refs/heads/transcripts-blinded.lock` fails every later commit (`commit=failed` in the log). If no process holds it open, remove it by hand.

The scripts that run are the copies in the worktree's `scripts/`. The reference copies in `explorations/coordinator/transcript-backup/` change nothing until you copy them into the worktree. If a pass fails in a way that this section does not name, print `explorations/coordinator/tools/facts-extract.sh 'doc:explorations/coordinator/remote-container.md#Three traps'`, and the same for "How the snapshot works".

## The platform's git-check hook

`~/.claude/stop-hook-git-check.sh` comes from the launcher (`--settings /root/.claude/launcher-settings.json`). It exits 2, which makes the session take another turn, when the tree has uncommitted changes, untracked files, or unpushed commits. When commit signing is on, it also exits 2 for a local commit that is unsigned or whose committer is not `noreply@anthropic.com`.

Its reminders are advisory. While the tree holds work that is not ready to commit or push, decline a reminder: say in one line that the work is not ready, and end the turn. The hook does not fire again at the end of the turn that it started.

To turn the hook off, give the script an empty body, which reads its input and exits 0. Keep the original in the session's scratchpad:

    cp ~/.claude/stop-hook-git-check.sh <scratchpad>/stop-hook-git-check.sh.orig
    printf '#!/bin/bash\ncat >/dev/null\nexit 0\n' > ~/.claude/stop-hook-git-check.sh

- The automatic permission check refuses this step in auto mode, and also a check-in whose prompt would take it. The step runs only after the curator switches the session to manual approval, where each tool call waits for the curator.
- In manual approval, every command of a Workflow agent also waits for the curator's approval. So a batch runs unattended only in auto mode: after the step, ask the curator to switch back.
- Every start of the process writes the original script again. So after each process stop the hook is back on: `grep -c stop_hook_active ~/.claude/stop-hook-git-check.sh` prints 1 or more. The `coordinator` skill's `SKILL.md`, "The boot", says how the curator is told.
