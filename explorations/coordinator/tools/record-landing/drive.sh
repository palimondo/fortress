#!/usr/bin/env bash
# drive.sh RUN ROUND [--dry-run]: one write round of the record-landing workflow, which its Sonnet driver
# runs in the background.
#
# Starts the two writer streams side by side, each a headless Opus session that the worktree's own copy of
# ../record-clarity/writer-stream.sh starts or resumes, so that it works in the worktree: the entries writer
# (stream STREAM_ENTRIES, brief entries.md) and the routing writer (STREAM_ROUTING, routing.md). Each brief is
# copied once into the run's folder, as brief-entries.md and brief-routing.md, so that the stream reads it
# inside the worktree and a resumed run reads the same text. Each task is two lines: the brief's path, then
# the batch, the run's folder and the worktree; round 2, the fix round, adds the three reports to fix from. Waits for both, prints each one's exit and the end of its log
# (RUN/entries-ROUND.log, RUN/routing-ROUND.log), then runs checks.sh RUN ROUND, which writes mech-ROUND.md.
# Each writer's exit goes to its marker, WT/tmp/record-landing/WRITER-ROUND.done, under the worktree's tmp/,
# which git ignores, so that the markers leave the worktree clean. A writer whose marker holds 0 finished
# before and is not run again. --dry-run prints the commands that it would run and starts nothing.
set -uo pipefail
here=$(cd "$(dirname "$(readlink -f "$0")")" && pwd)
RUN=${1:?usage: drive.sh RUN ROUND [--dry-run]}; ROUND=${2:?round: 1 or 2}; DRY=${3:-}
# shellcheck disable=SC1091
. "$RUN/run.env"
ws="$WT/explorations/coordinator/tools/record-clarity/writer-stream.sh"
marks="$WT/tmp/record-landing"
[ "$DRY" = --dry-run ] || mkdir -p "$marks"
[ -x "$ws" ] || { echo "drive.sh: no writer stream in the worktree: $ws" >&2; exit 1; }
case "$ROUND" in
  1) extra='' ;;
  2) extra=" This is your fix round: read $RUN/check.md, $RUN/cold-read.md and $RUN/mech-1.md, and fix what they find in your own homes, as your brief's part on the fix round says." ;;
  *) echo "drive.sh: the round is 1 or 2" >&2; exit 2 ;;
esac
task() { printf 'Read your brief and follow it: %s/brief-%s.md.\nYour batch: %s. Your folder: %s/. Your worktree: %s.%s' "$RUN" "$1" "$N" "$RUN" "$WT" "$extra"; }
for w in entries routing; do
  # The stream reads its brief in the worktree, where it runs: a copy, made once, so that a resumed run reads the same text.
  if [ ! -f "$RUN/brief-$w.md" ]; then
    if [ "$DRY" = --dry-run ]; then echo "== would copy $here/$w.md to $RUN/brief-$w.md"; else cp "$here/$w.md" "$RUN/brief-$w.md"; fi
  fi
  if [ "$w" = entries ]; then stream=$STREAM_ENTRIES; else stream=$STREAM_ROUTING; fi
  done_file="$marks/$w-$ROUND.done"; log="$RUN/$w-$ROUND.log"
  if [ "$(cat "$done_file" 2>/dev/null)" = 0 ]; then echo "== the $w writer, round $ROUND: finished before"; continue; fi
  if [ "$DRY" = --dry-run ]; then
    printf '== the %s writer, round %s, would run:\n%q %q %q > %q 2>&1; echo $? > %q\n' "$w" "$ROUND" "$ws" "$stream" "$(task "$w")" "$log" "$done_file"
    continue
  fi
  ( "$ws" "$stream" "$(task "$w")" > "$log" 2>&1; echo $? > "$done_file" ) &
done
wait
if [ "$DRY" = --dry-run ]; then echo "== then it would run: $here/checks.sh $RUN $ROUND"; exit 0; fi
for w in entries routing; do
  echo "== the $w writer, round $ROUND: exit $(cat "$marks/$w-$ROUND.done" 2>/dev/null || echo none)"
  tail -n 30 "$RUN/$w-$ROUND.log" 2>/dev/null
done
"$here/checks.sh" "$RUN" "$ROUND"
