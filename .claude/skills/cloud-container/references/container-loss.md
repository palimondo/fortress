# A lost container

This part is for the coordinating session. Record no gap-ledger row for a lost container: it is not a gap of the tree.

The platform can reclaim, corrupt or rebuild a container at any time. What was pushed survives, the backup's transcripts included. Everything else on its disk is lost: worktrees, uncommitted edits, unpushed commits, logs, and every running agent. A run of agents whose script and briefs are committed can run again.

## Re-provisioning

The platform rebuilds a container from the branch that the session was created from, `blinded-fable` for the coordinating session. `get_session` shows it, as `session_context.sources[].git_repository.revision`. If the branch is behind `main`, the new container starts on a stale tree. If the branch is gone, the clone fails: the platform shows "The requested branch or commit was not found in the repository", and the repository holds only an empty `.git`.

- To check the branch, run `git fetch origin && git rev-parse origin/main origin/blinded-fable`. If the two hashes differ, push as `fortress-repo`'s `references/committing.md` says, which pushes `main` to it.

A rebuilt container comes up blank: no other folder under `/home/user`, JDK 21 alone, no `ant`, no backup worktree and no `~/.claude/settings.json`. To restore it:

1. Run `git fetch origin main`, then `git checkout -b main origin/main`.
2. Run `explorations/experiment/setup.sh`. In about 4 minutes, it installs JDK 25 and `ant`, builds the tree and re-arms the backup.

If the session cannot go on, start a new session in a container that has the checkout and the toolchain. Fast-forward that checkout to `main`, re-arm the backup (below), and go on from what was pushed and from the old session's transcript (below).

- Only one container at a time may back up to a branch. While one does, the pushes of a second to the same branch are refused.
- A session resumed in a rebuilt container can start from a shortened copy of its transcript. The new container's first snapshot then commits that copy over the full transcript. The full one stays in the branch's history: copy it from the commit before that snapshot to `<session>.until-<UTC time>.jsonl.parts/` on the branch, and let the later transcript go on at the usual path.

## Re-arming the backup

    git -C /home/user/fortress fetch origin transcripts-blinded:transcripts-blinded
    git -C /home/user/fortress worktree add /home/user/fortress-transcripts-blinded transcripts-blinded
    /home/user/fortress-transcripts-blinded/scripts/backup.sh --run     # one pass, in the foreground
    tail -1 /home/user/fortress-transcripts-blinded/.backup.log         # verify

The tracked `.claude/settings.json` already registers the hook (`hooks.md`). The pass is good when the log's line reads `copier_rc=0` and either `commit=<hash>` with `push=ok`, or `commit=none ahead=0 push=none`. `--run` waits for a runner at work, then makes its pass.

Sessions created from `blinded-fable` back up to `transcripts-blinded`. Earlier coordinating sessions are on `transcripts`. If you arm a backup to `transcripts`, first copy the reference copies (`hooks.md`) into its `scripts/`. Never merge the two branches. When you search the transcripts, search both.

## Reading another session's transcript

Any session reads another's from the backup branches, with no switch or clone. `<b>` is `transcripts` or `transcripts-blinded`:

    git fetch origin transcripts transcripts-blinded
    git show origin/<b>:projects/-home-user-fortress/<session>.jsonl | head
    git grep -l 'some string' origin/transcripts origin/transcripts-blinded -- 'projects/*'

- A transcript up to 64 MiB is `<session>.jsonl`. A larger one is stored as `<session>.jsonl.parts/NNN.jsonl`, cut at line ends. Join it with `cat <session>.jsonl.parts/*.jsonl`.
- Workflow agents' transcripts and journals are under `projects/<project>/<session>/subagents/workflows/<run>/`, and the launched scripts under `projects/<project>/<session>/workflows/scripts/`.
- For a long search, check a branch out as a worktree, a second copy on disk, after you check Avail (`machine.md`): `git worktree add /home/user/fortress-transcripts transcripts`.

## Recovering the work

1. For each branch that the lost container worked on, find its last pushed commit: `git fetch origin && git log -1 --format='%h %ci' origin/<branch>`. Nothing after it is safe.
2. On the backup branch, read the tail of the lost session's transcript, its last part. Work after its last record cannot be recovered.
3. In that tail, find the edits after the last push, the `Edit`, `Write` and `Bash` calls that change files, and replay them by hand.
4. Recover Workflow scripts and briefs from the transcript: a `Workflow` `tool_use` record holds its whole script.
5. Do not try to resume a Workflow run: only the session that launched it can (the `coordinator` skill's `references/delegating.md`).
6. Before you continue, write down where the work stands, from the transcript's tail and not from memory.
