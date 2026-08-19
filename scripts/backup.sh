#!/bin/bash
# Snapshot session transcripts into the `transcripts` branch and push.
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
  git push -u origin transcripts >/dev/null 2>&1 && break
  [ "$delay" = 0 ] && break
  sleep "$delay"
done
exit 0
