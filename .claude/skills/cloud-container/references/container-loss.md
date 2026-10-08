# A lost container

A container can be reclaimed, corrupted or lost at any time. What was pushed survives, and so do the transcripts the backup pushed (`hooks.md`). Everything else on its disk goes with it: worktrees, uncommitted edits, unpushed commits, logs, and every running agent.

## Re-provisioning

The platform rebuilds a session's container from the branch that the session was created from. `get_session` shows that branch, as `session_context.sources[].git_repository.revision`. So that branch must stay on the remote, and pushing keeps it current (for this repository: the `fortress-repo` skill, committing). If the branch is behind `main`, the new container starts on a stale tree.

A rebuilt container comes up blank: an empty clone, and no toolchain. If the branch is gone, the clone fails, and the repository has only an empty `.git`. To restore the container:

1. Fetch `main` and check it out: `git fetch origin main`, then `git checkout -b main origin/main`.
2. Run `explorations/experiment/setup.sh`. In about 4 minutes, it installs JDK 25 and `ant`, builds the tree and re-arms the transcript backup.

If the session cannot go on, continue it in another container that has the checkout and the toolchain: fast-forward that checkout to `main`, re-arm the backup (below), and go on from what the work pushed.

Only one session may back up its transcripts to a branch. The pushes of a second session to the same branch are refused.

## Re-arming the backup in a fresh container

    git -C /home/user/fortress worktree add /home/user/fortress-transcripts-blinded transcripts-blinded
    # give ~/.claude/settings.json the two hooks of the tracked .claude/settings.json (a copy, if it has none)
    /home/user/fortress-transcripts-blinded/scripts/backup.sh --run          # one pass, in the foreground
    tail -1 /home/user/fortress-transcripts-blinded/.backup.log              # verify

The pass is good when the line reads `copier_rc=0` and either `commit=<hash>` with `push=ok`, or `commit=none ahead=0 push=none` when nothing changed; `git -C /home/user/fortress-transcripts-blinded status -sb` then shows the branch not ahead of its upstream. Run by hand, `--run` waits for a runner at work and then makes a pass; the hook's form, without `--run`, returns at once and its pass shows in the log about 10 s later.

This container's sessions are backed up to `transcripts-blinded`. The sessions of the first container that the coordinating session (the main session that keeps the project's records and launches its workers) ran in are on `transcripts`, whose own `scripts/` are older (re-arming that lineage, copy the reference copies from `explorations/coordinator/transcript-backup/` in first). Keep the two apart and join them only when reading.

## Reading another session's transcript

The orphan branches are in the same repository, so any session reads any other's without switching or cloning:

    git fetch origin transcripts
    git show origin/transcripts:projects/-home-user-fortress/<session>.jsonl.parts/000.jsonl | head
    git grep -l 'some string' origin/transcripts -- 'projects/*'

A transcript over 64 MiB is stored as `<session>.jsonl.parts/NNN.jsonl`, cut at line boundaries; rejoin with `cat <session>.jsonl.parts/*.jsonl`. Workflow agents' transcripts and journals are under `projects/<project>/<session>/subagents/workflows/<run>/`, the launched scripts under `projects/<project>/<session>/workflows/scripts/`. For sustained searching, materialise the branch, at the cost of a second copy on disk: `git worktree add /home/user/fortress-transcripts transcripts`.

## Recovering

1. Establish what was pushed: `git rev-list --left-right --count <branch>...origin/main`. Work pushed is safe; nothing else in the lost container is.
2. Find the transcript's last record, the tail of its last part, against the last snapshot commit's time. It bounds everything recoverable.
3. Look in that tail for edits after the last push, the mutating `Edit`, `Write` and `Bash` calls, and replay them by hand.
4. Recover Workflow scripts and briefs from the transcript: a `Workflow` `tool_use` record carries its whole script.
5. Do not expect to resume a Workflow run: a run is resumed only in the session that launched it (the `coordinator` skill, running agents).
6. Write down where the work stands, from the transcript's tail and not from memory, before continuing (the coordinator's records: the `fortress-repo` skill).
