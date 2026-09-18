#!/bin/bash
# Snapshot session transcripts into this worktree's orphan branch and push.
# Designed to run unattended (e.g. from a Claude Code Stop hook): fast,
# silent on no-op, always exits 0 so it never blocks the session.
#
# Layout assumption: this script lives in <worktree>/scripts/ where
# <worktree> is a git worktree checked out to the orphan branch
# `transcripts`. Re-arm in a fresh container with:
#   git -C <repo> worktree add /home/user/fortress-transcripts transcripts
#   (then wire this script into a Stop hook or run it manually)

set -u
WT="$(cd "$(dirname "$0")/.." && pwd)"
LOCK="$WT/.backup.lock"

# concurrency guard: skip silently if another snapshot is in flight
exec 9>"$LOCK"
flock -n 9 || exit 0

python3 "$WT/scripts/backup_transcripts.py" --dest "$WT" >/dev/null 2>&1

cd "$WT" || exit 0
git add -A projects/ >/dev/null 2>&1
if git diff --cached --quiet; then
  exit 0
fi
git commit -q -m "Transcript snapshot $(date -u +%Y-%m-%dT%H:%M:%SZ)" \
  -m "Automated backup of live session JSONL (redactions per scripts/backup_transcripts.py)." \
  >/dev/null 2>&1

# push with retry (2s/4s/8s/16s backoff), never fail the hook
for delay in 2 4 8 16 0; do
  git push -u origin HEAD >/dev/null 2>&1 && break
  [ "$delay" = 0 ] && break
  sleep "$delay"
done

# Pack loose objects when enough have piled up.  A snapshot rewrites whole
# JSONL files, and a loose object is stored with no delta against the near-
# identical blob before it, so this branch grows the object store by tens of
# megabytes per commit: 21.3 GiB of loose objects by 2026-09-17, which packed
# down to 609 MB.  Git does this by itself at its default gc.auto of 6700, but
# the container's clone ships gc.auto=0, so -c restores a threshold here rather
# than in .git/config, which a fresh container would not carry.  Under the
# threshold this costs a directory scan; over it, git detaches and packs only
# the loose objects.  Never fails the hook.
git -c gc.auto=1000 gc --auto >/dev/null 2>&1 || true
exit 0
