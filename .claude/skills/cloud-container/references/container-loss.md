# A lost container

This part is for the coordinating session. A lost container is a lesson about the platform, kept here, and not a gap of the tree: it gets no ledger row.

The platform can reclaim, corrupt or rebuild a container at any time. What was pushed survives, the backup's transcripts included. Everything else on its disk is lost: worktrees, uncommitted edits, unpushed commits, logs, and every running agent. A batch whose record is committed can run again.

## Re-provisioning

The platform rebuilds a container from the branch that the session was created from, `blinded-fable` for the coordinating session. `get_session` shows it, as `session_context.sources[].git_repository.revision`. `fortress-repo`'s committing part pushes `main` to it after every commit. If the branch is behind `main`, the new container starts on a stale tree. If the branch is gone, the clone fails: the platform shows "The requested branch or commit was not found in the repository", and the repository holds only an empty `.git`.

A rebuilt container comes up blank: no other folder under `/home/user`, JDK 21 alone, no `ant`, no backup worktree and no `~/.claude/settings.json`. To restore it:

1. Run `git fetch origin main`, then `git checkout -b main origin/main`.
2. Run `explorations/experiment/setup.sh`. In about 4 minutes, it installs JDK 25 and `ant`, builds the tree and re-arms the backup.

If the session cannot go on, continue it in another container that has the checkout and the toolchain. Fast-forward that checkout to `main`, re-arm the backup (below), and go on from what was pushed.

- Only one session may back up its transcripts to a branch. The pushes of a second session to the same branch are refused.
- A resumed session can start from a short copy of its transcript. The new container's first snapshot then commits that copy over the full transcript. Keep the full transcript at a path of its own on the branch, `<session>.until-<UTC time>.jsonl.parts/`, and let the later transcript go on at the usual path.

## Re-arming the backup

    git -C /home/user/fortress worktree add /home/user/fortress-transcripts-blinded transcripts-blinded
    /home/user/fortress-transcripts-blinded/scripts/backup.sh --run     # one pass, in the foreground
    tail -1 /home/user/fortress-transcripts-blinded/.backup.log         # verify

The tracked `.claude/settings.json` already registers the hook (`hooks.md`). The pass is good when the log's line reads `copier_rc=0` and either `commit=<hash>` with `push=ok`, or `commit=none ahead=0 push=none`. `--run` waits for a runner at work, then makes its pass.

This container's sessions are backed up to `transcripts-blinded`. The first container's coordinating sessions are on `transcripts`, whose `scripts/` are older: to re-arm it, first copy in the reference copies (`hooks.md`). Join the two branches only when you read them.

## Reading another session's transcript

Any session reads another's from the backup branches, with no switch or clone:

    git fetch origin transcripts
    git show origin/transcripts:projects/-home-user-fortress/<session>.jsonl.parts/000.jsonl | head
    git grep -l 'some string' origin/transcripts -- 'projects/*'

- A transcript over 64 MiB is stored as `<session>.jsonl.parts/NNN.jsonl`, cut at line ends. Join it with `cat <session>.jsonl.parts/*.jsonl`.
- Workflow agents' transcripts and journals are under `projects/<project>/<session>/subagents/workflows/<run>/`, and the launched scripts under `projects/<project>/<session>/workflows/scripts/`.
- For a long search, check the branch out as a worktree, a second copy on disk: `git worktree add /home/user/fortress-transcripts transcripts`.

## Recovering the work

1. Find what was pushed: `git rev-list --left-right --count <branch>...origin/main`. Nothing else of the lost container is safe.
2. Find the transcript's last record, the tail of its last part, and compare it with the time of the last snapshot commit. It bounds what can be recovered.
3. In that tail, find the edits after the last push, the `Edit`, `Write` and `Bash` calls that change files, and replay them by hand.
4. Recover Workflow scripts and briefs from the transcript: a `Workflow` `tool_use` record holds its whole script.
5. Do not try to resume a Workflow run: only the session that launched it can (the `coordinator` skill's delegating part).
6. Before you continue, write down where the work stands, from the transcript's tail and not from memory.
