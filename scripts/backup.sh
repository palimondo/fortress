#!/bin/bash
# Snapshot session transcripts into this worktree's orphan branch and push.
# Runs unattended from a Claude Code Stop hook, so it must never hold up or
# fail the session:
#
#   backup.sh        (the hook) records a request and, unless a runner is
#                    already at work, starts one in the background; returns at
#                    once, always with status 0.
#   backup.sh --run  (the runner) makes one pass per request until none is
#                    left: backup_transcripts.py, commit, push, gc. Silent;
#                    one line per pass in .backup.log. Run by hand, it waits
#                    for any runner at work, then makes a pass.
#
# Layout assumption: this script lives in <worktree>/scripts/ where
# <worktree> is a git worktree checked out to the orphan branch
# `transcripts`. Re-arm in a fresh container with:
#   git -C <repo> worktree add /home/user/fortress-transcripts transcripts
#   (then wire this script into a Stop hook or run it manually)
#
# Local files in <worktree>, never committed (the branch's .gitignore):
#   .backup.lock     flock(1) lock, held by the runner for as long as it runs
#   .backup.pending  a request that no pass has taken up yet
#   .backup.state    backup_transcripts.py's record of what it last read/wrote
#   .backup.log      one line per pass; the last 200 are kept
#
# No request is lost: the hook creates .backup.pending before it tries the
# lock; a pass removes it before it starts; and a runner looks for it once
# more after letting the lock go, taking the lock back for it unless a newer
# runner already has. The runner inherits the lock from the hook that starts
# it (fd 9), so no second runner can start in between. Every command a pass
# runs gets fd 9 closed: until 2026-09-29 the detached `git gc --auto`
# inherited it and held the lock for as long as it ran, and every snapshot
# requested meanwhile was silently skipped.
#
# BACKUP_PROJECTS_DIR, if set, replaces /root/.claude/projects (for tests).

set -u
WT="$(cd "$(dirname "$0")/.." && pwd)" || exit 0
LOCK="$WT/.backup.lock"
PENDING="$WT/.backup.pending"
LOG="$WT/.backup.log"
exec </dev/null >/dev/null 2>&1

if [ "${1:-}" != --run ]; then
  touch "$PENDING"
  exec 9>>"$LOCK" || exit 0
  flock -n 9 || exit 0  # a runner holds the lock and will see the request
  setsid nohup "$WT/scripts/backup.sh" --run &
  exit 0
fi

cd "$WT" || exit 0

now_ms() { local t=${EPOCHREALTIME//[!0-9]/}; echo $((t / 1000)); }

log() {
  printf '%s %s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$*" >>"$LOG"
  if [ "$(wc -l <"$LOG")" -gt 400 ]; then
    tail -n 200 "$LOG" >"$LOG.tmp" && mv -f "$LOG.tmp" "$LOG"
  fi
}

# A git process killed mid-command (with its container, say) leaves
# index.lock behind, and every later `git add` fails on it. Remove one that
# is at least 10 s old and that no process has open; wait out a younger one,
# since git keeps its lock open only while it writes.
clear_stale_index_lock() {
  local lk f pid mtime age tries=0
  lk=$(git rev-parse --path-format=absolute --git-path index.lock) || return
  while [ -e "$lk" ] && [ "$tries" -lt 3 ]; do
    tries=$((tries + 1))
    for f in /proc/[0-9]*/fd/*; do
      if [ "$f" -ef "$lk" ]; then
        pid=${f#/proc/}
        log "index.lock is open in pid ${pid%%/*}; left in place"
        return
      fi
    done
    mtime=$(stat -c %Y "$lk") || return
    age=$(($(date +%s) - mtime))
    if [ "$age" -ge 10 ]; then
      rm -f "$lk" && log "removed stale index.lock (${age}s old)"
      return
    fi
    sleep $((10 - age))
  done
}

pass() {
  local t0 c0 c1 rc commit=none push=none ahead
  t0=$(now_ms)
  clear_stale_index_lock
  c0=$(now_ms)
  python3 "$WT/scripts/backup_transcripts.py" --dest "$WT" \
    ${BACKUP_PROJECTS_DIR:+--projects-dir "$BACKUP_PROJECTS_DIR"}
  rc=$?
  c1=$(now_ms)
  git add -A projects/
  if ! git diff --cached --quiet; then
    commit=failed
    git commit -q -m "Transcript snapshot $(date -u +%Y-%m-%dT%H:%M:%SZ)" \
      -m "Automated backup of live session JSONL (redactions per scripts/backup_transcripts.py)." \
      && commit=$(git rev-parse --short HEAD)
  fi
  # Push whenever the branch is ahead of its upstream (or has none yet), not
  # only after this pass's own commit: a pass cut off between its commit and
  # its push leaves the push to the next. Retry with 2/4/8/16 s backoff.
  ahead=$(git rev-list --count '@{u}..HEAD') || ahead=no-upstream
  if [ "$ahead" != 0 ]; then
    push=failed
    for delay in 2 4 8 16 0; do
      git push -u origin HEAD && { push=ok; break; }
      [ "$delay" = 0 ] && break
      sleep "$delay"
    done
  fi
  # Pack loose objects when enough have piled up. A snapshot rewrites whole
  # JSONL files, and a loose object is stored with no delta against the near-
  # identical blob before it, so this branch grows the object store by tens of
  # megabytes per commit: 21.3 GiB of loose objects by 2026-09-17, which packed
  # down to 609 MB. Git does this by itself at its default gc.auto of 6700, but
  # the container's clone ships gc.auto=0, so -c restores a threshold here
  # rather than in .git/config, which a fresh container would not carry. Under
  # the threshold this costs a directory scan; over it, git detaches and packs
  # only the loose objects -- with fd 9 closed, so the lock is not held by it.
  git -c gc.auto=1000 gc --auto 9>&-
  log "pass pid=$$ t0=$t0 ms=$(($(now_ms) - t0)) copier_ms=$((c1 - c0))" \
    "copier_rc=$rc commit=$commit ahead=$ahead push=$push"
}

# Hold the lock: inherited from the hook that started this runner, or, run
# by hand, taken here once any runner at work has finished.
if ! [ /proc/$$/fd/9 -ef "$LOCK" ]; then
  touch "$PENDING"
  exec 9>>"$LOCK" || exit 0
fi
flock -w 600 9 || exit 0
while :; do
  while [ -e "$PENDING" ]; do
    rm -f "$PENDING"
    pass 9>&-
  done
  flock -u 9
  # A hook that found the lock held left its request for this runner.
  [ -e "$PENDING" ] && flock -n 9 || break
done
exit 0
