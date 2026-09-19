<!-- How this work survives its container: the transcript backup mechanism, how to re-arm it in a fresh container, and how to recover a session whose container died. Written 2026-09-18 after the coordinating session of 2026-09-17 was lost mid-workflow; the incident and what it cost are recorded at the end. Specific to Claude Code running in a remote Anthropic container, not to Fortress. -->

# The container, the transcripts, and recovery

A session in this setup is a conversation in a remote container that can be
reclaimed or corrupted at any time, and is re-provisioned by cloning a branch.
Three things therefore have to be true at all times: the work is pushed, the
transcript is pushed, and the branch the infrastructure clones is current.

## What is where

| thing | where | note |
|---|---|---|
| the work | `main`, and the container's infrastructure branch | both kept at the same commit, see *The branch trap* |
| session transcripts | orphan branches `transcripts` and `transcripts-blinded` | no shared history with `main`; large blobs live only there |
| live transcripts on disk | `/root/.claude/projects/-home-user-fortress/` | `<session>.jsonl`, plus per-session directories |
| the snapshot scripts | `<worktree>/scripts/` on each orphan branch — **these are the copies that run** | reference copy in `explorations/coordinator/transcript-backup/` |

Two orphan branches exist because the blinded microGPT runs were a controlled
experiment: neither run's container was to hold the other's transcripts.
`transcripts` holds the coordinating sessions, `transcripts-blinded` the
blinded-run container's. Keep them apart; join them at analysis time, which
costs nothing — see *Reading another session's transcript*.

## How the snapshot works

A `Stop` hook in `~/.claude/settings.json` runs `<worktree>/scripts/backup.sh`
at the end of every assistant turn. That script calls
`backup_transcripts.py`, which copies the live JSONL into the worktree with two
policy redactions (deck page images, HANDOVER.md contents), then commits and
pushes, then packs loose objects. Three properties matter:

- **It fires on the main session's Stop, not on any agent's completion.** A
  session that sits inside one long turn is not being backed up, however much
  work its agents are doing. This is the single largest gap in the design.
- **It swallows every error and always exits 0**, so it can never block a
  session — and so a failing push is silent. Check
  `git -C <worktree> status -sb` if in doubt.
- **It snapshots every session in the container**, not just the current one.

## Re-arming it in a fresh container

```sh
git -C /home/user/fortress worktree add /home/user/fortress-transcripts-blinded transcripts-blinded
# then register the Stop hook in ~/.claude/settings.json:
#   {"hooks":{"Stop":[{"hooks":[{"type":"command",
#     "command":"/home/user/fortress-transcripts-blinded/scripts/backup.sh"}]}]}}
/home/user/fortress-transcripts-blinded/scripts/backup.sh   # verify: a snapshot commit appears
```

`experiment/setup.sh` does this for the blinded lineage. Substitute
`transcripts` for the coordinating lineage. The script that runs is the one in
the worktree, on the branch — if you edit the reference copy under
`explorations/`, nothing changes until it is copied into the worktree.

## Three traps, each of which has cost us work

**The workflow-transcript glob.** Agents launched by the `Workflow` tool do not
write where `Agent`-tool subagents do. Their transcripts, the run journal and
the persisted scripts live at

```
projects/<proj>/<session>/subagents/workflows/<run>/agent-*.jsonl, journal.jsonl, *.meta.json
projects/<proj>/<session>/workflows/scripts/<name>-<run>.js
```

one level below the `subagents/*.jsonl` glob that the script used until
2026-09-18. Four workflow agents' transcripts — about 798k tokens — were
therefore never captured. Fixed; the fixture test in the commit message of
`transcripts-blinded@264d19c8` states what was verified.

**The 100 MiB blob limit.** A snapshot rewrites the whole JSONL, so a long
session's transcript grows past GitHub's per-blob ceiling and the push fails —
silently, per above. A transcript over 64 MiB is now written as
`<session>.jsonl.parts/NNN.jsonl`, cut at line boundaries so that appends leave
every earlier part byte-identical. Rejoin with `cat <session>.jsonl.parts/*.jsonl`.

**The loose-object pile.** The container's clone ships `gc.auto=0`, and each
snapshot writes whole files with no delta, so the object store grows by tens of
megabytes per commit: 21.3 GiB of loose objects by 2026-09-17, which packed down
to 609 MB. `backup.sh` now ends with `git -c gc.auto=1000 gc --auto`. Unrelated
but same symptom: the Rats! temp directories in `FACTS.md` § The container.

**Worktree state that is never committed.** The first repair batch forbade its
workers to commit, so that the gather could compose one clean commit per rung;
when the container died every worktree was dirty and four agents' work went
with it. The transcript backup does not cover this: it copies JSONL, not trees,
and it fires only at the main session's Stop. The fix is in the workflow design
(`batched-climb-plan.md` §3, revised 2026-09-18): each worker's worktree is on
its own `wip/<slug>` branch, pushed at every milestone, and the gather composes
from the branch's net change instead of the dirty tree. Two rules follow for
any long run: nothing that takes hours lives only on disk, and the coordinator
takes a turn every half hour or so (`send_later`) so that the Stop hook fires
and the agents' transcripts are snapshotted while they run.

## Setting up a batch's worktrees

The workflow script cannot touch the filesystem before its first agent runs, so
the coordinator creates the worktrees and pushes the empty branches first, from
the commit `main` is at, which is then the script's `args.base`:

```sh
cd /home/user/fortress && BASE=$(git rev-parse --short HEAD)
for r in r1-atomic-static r2-literal-wrap; do
  git worktree add -b wip/repair-$r /home/user/fortress-${r%%-*} main
  cp -a ProjectFortress/build /home/user/fortress-${r%%-*}/ProjectFortress/   # javac incremental; scalac rebuilds anyway
  mkdir -p /home/user/fortress-${r%%-*}/tmp
  git push -u origin wip/repair-$r
done
```

Copy the build, never symlink it: a symlinked build makes `ProjectProperties`
resolve every cache path to the main tree (`batched-climb-plan.md` §4). After
the batch lands, the commit stage removes the worktrees and local branches; the
remote `wip/` branches are deleted in the GitHub UI.

## The branch trap

The infrastructure clones the branch the session was created from. If work
proceeds on `main` while that branch is left behind, a re-provision lands on a
stale tree — or fails outright if the branch was renamed or deleted, which is
what ended the 2026-09-17 session: *"The requested branch or commit was not
found in the repository."* Keep the container's own branch fast-forwarded to
`main` whenever `main` moves.

## Reading another session's transcript

The orphan branches are in the same repository, so any session can read any
other's without switching or re-cloning:

```sh
git fetch origin transcripts
git show origin/transcripts:projects/-home-user-fortress/<session>.jsonl.parts/000.jsonl | head
git grep -l 'some string' origin/transcripts -- 'projects/*'
```

That is enough for targeted extraction. For sustained searching, materialise it
— `git worktree add /home/user/fortress-transcripts transcripts` — which costs a
second on-disk copy (296 MB on 2026-09-18) and does not affect where the hook
writes.

## Recovering a session whose container died

1. **Establish what was pushed.** `git rev-list --left-right --count <branch>...origin/main`.
   Work committed before the last push is safe; nothing else in the container is.
2. **Find the transcript's last record**, which bounds everything recoverable:
   the tail of the last `.parts/` file, against the last snapshot commit's time.
3. **Look for uncommitted edits in the tail** — mutating `Edit`/`Write`/`Bash`
   tool calls after the last push. Replay them by hand if any.
4. **Recover workflow scripts and briefs from the transcript.** A `Workflow`
   `tool_use` record carries its whole script; that is how the repair batch's
   30,751-character script was recovered on 2026-09-18.
5. **Do not expect to resume a workflow run.** `resumeFromRunId` is
   same-session-only and its cached agent results live in the dead session's
   run state. A run designed to be extended by a later resume cannot be
   finished from a new session — write the whole pipeline into one script
   instead.
6. **Write the handover before continuing**, from the transcript tail rather
   than from memory, and record the switch in `FACTS.md`.

## The 2026-09-17 incident

The coordinating session (`bdff267d-…`, on `transcripts`) launched the
`fortress-repair-batch` workflow at 19:26 and never reached another Stop. Its
last record is 20:31:14; the snapshot six seconds later is the last one. It was
still alive at about 21:07 — background tasks started then — and when it froze
is not knowable from the record. Its container could not be re-provisioned
because the branch it was created from was no longer found.

Lost: the four workflow agents (`rung:R1`, `rung:R2`, `skeptic:R1`,
`skeptic:R2`, ~798k tokens), their isolated worktrees, and the 13 hours after
the last snapshot. Not lost: everything committed through `2ab1d6d8`, the
workflow script, `REPAIR-BATCH.md` — written the same afternoon *"for a session
that was not present"*, which is why the batch remains runnable — and the
conversation through 20:31.

Recovery was carried out in the blinded run's container, which already had the
checkout and the toolchain: fast-forward to `main`, fix the backup, materialise
the other lineage's transcripts, then re-run the batch from its recorded brief.

## The 2026-09-18 restart

The repair batch's re-run was launched at 22:57 UTC (run `wf_9777a563-c5e`,
session `fe616d40-…`). At about 23:22, 25 minutes in, the VM was restarted:
the two agents' last records are 23:22:20 and 23:22:23, a test's output file
was still being written at 23:22:29, and `uptime` read 0 minutes at 23:23:29
on a kernel whose build string had changed (fc-v33 to fc-v37). One JVM was
running across both worktrees at that moment, on 16 GB with no swap, so the
load was not the cause; a platform restart is the only reading the record
supports.

What it cost: the two rung agents' working context, 25 minutes of two workers.
What it did not cost: the disk survived, so the worktrees, their uncommitted
edits, their `tmp/` logs and the agents' transcripts were all there afterwards
and the transcripts were snapshotted at the next Stop; and the `wip/` branches
held every milestone pushed before the restart — R1's two failing tests with
their recorded failure (23:12) and its fix with the recorded pass (23:21), R2's
failing test with its recorded failure (23:12). The batch was relaunched at
23:28 (run `wf_aabc0cb2-d31`) from the same base, and the shared prefix gained
a clause telling a worker whose branch already carries commits to read them
and continue, verifying rather than redoing. The relaunched batch landed at 03:22, so the
restart cost 25 minutes of two workers and nothing else.

Two properties of the harness, learned here: a `Workflow` run does not survive
a VM restart even when the session does — its agents are gone, the harness
lists them as stopped, and `resumeFromRunId` holds nothing for an agent that
never finished, so the answer is a relaunch; and a `send_later` reminder is
server-side and does survive, so it is deleted or re-armed to fit the relaunch.
