#!/bin/bash
# watch-dispatch.sh <caches-dir-substring> <log> <cap-seconds> <jfr-dump-file>
#
# Beside the dispatch run of run-all.sh: finds the JVM by its private cache directory,
# and every 30 s writes the time and the top frames of its main thread (jcmd Thread.print)
# to <log>.  The clock of the cap starts when the main thread is first seen in code
# generation (CodeGenerationPhase); <cap-seconds> after that the recording is dumped
# (jcmd JFR.dump) and the JVM is stopped (SIGTERM; the recording is also dumped on exit).
# Exits when the JVM is gone.
set -u
PAT=$1; LOG=$2; CAP=$3; DUMP=$4
pid=""
for i in $(seq 1 120); do
  pid=$(pgrep -f -- "^java .*-Dfortress.caches=[^ ]*$PAT" | head -1)
  [ -n "$pid" ] && break; sleep 1
done
[ -z "$pid" ] && { echo "no JVM for $PAT" >> "$LOG"; exit 1; }
start=$(date +%s); cg=""
echo "# pid $pid, watching from $(date -u +%H:%M:%S)" >> "$LOG"
while kill -0 "$pid" 2>/dev/null; do
  now=$(date +%s)
  full=$(jcmd "$pid" Thread.print 2>/dev/null | awk '/^"main"/{f=1;next} f&&/^$/{exit} f' | grep -E '^\s+at ')
  st=$(echo "$full" | head -25)
  if [ -z "$cg" ] && echo "$full" | grep -q 'CodeGenerationPhase'; then
    cg=$now; echo "# code generation entered at $(date -u +%H:%M:%S), $((now-start)) s after the JVM was found" >> "$LOG"
  fi
  { echo "## $(date -u +%H:%M:%S) +$((now-start)) s${cg:+, +$((now-cg)) s in code generation}"; echo "$st" | sed 's/^\s*at /  /'; } >> "$LOG"
  if [ -n "$cg" ] && [ $((now-cg)) -ge "$CAP" ]; then
    echo "# cap of $CAP s in code generation reached at $(date -u +%H:%M:%S); dumping the recording and stopping the JVM" >> "$LOG"
    jcmd "$pid" JFR.dump filename="$DUMP" >> "$LOG" 2>&1
    kill -TERM "$pid"; sleep 20; kill -KILL "$pid" 2>/dev/null
    break
  fi
  sleep 30
done
echo "# JVM gone at $(date -u +%H:%M:%S)" >> "$LOG"
