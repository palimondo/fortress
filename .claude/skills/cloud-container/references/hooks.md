# The transcript backup and the git-check hook

This part is for the coordinating session. The tracked `.claude/settings.json` runs three Stop hooks: the transcript backup, the `coordinator` skill's model check and the git-check switch. The launcher adds the git-check hook.

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

Its reminders are advisory. Answer one as the `coordinator` skill's `SKILL.md`, "Quiet times", says. The hook does not fire again at the end of the turn that it started.

Every start of the process writes the launcher's script again. The git-check switch, the repository's `.claude/hooks/git-check-off.sh`, then turns the hook off: the tracked `.claude/settings.json` runs it at every SessionStart and at every turn's end. It replaces the script's body with two commands that read the input and exit 0. It keeps the launcher's script as `~/.claude/stop-hook-git-check.sh.orig`. Since the switch runs at every turn's end, a copy of the `.orig` file back is undone at the next one. Turn the hook back on only when the curator asks for it.

- After a git-check reminder, run `grep -c stop_hook_active ~/.claude/stop-hook-git-check.sh`. If it prints 1 or more, run `.claude/hooks/git-check-off.sh </dev/null`.
- Claude Code runs the Stop hooks at the same time, so on a turn after a start the git check can run before the switch empties it.
