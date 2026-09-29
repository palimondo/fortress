#!/bin/bash
# run-pass.sh <home> <work-dir> <list-file> <timeout-secs> [shards]
# Runs every program of <list-file> (paths relative to the private home <home>, made by snapshot.sh) under
# walk, one JVM per program, from the program's own directory, one core per JVM, with a private cache per
# shard that starts empty; output to <work-dir>/log/<name>.txt with an rc= secs= trailer. Probe K's
# run-pass.sh (explorations/compile-ladder/plan-n/probe-k/) without its shadow, which is rung O's
# count-run.sh (explorations/compile-ladder/rung-walk-overflow/) moved to a private home. The worktree's
# default_repository/ is never read or written. Source explorations/experiment/env.sh first.
set -u
H=$(cd "${1:?usage}" && pwd)
W=$(mkdir -p "${2:?usage}" && cd "$2" && pwd)
L=$(cd "$(dirname "${3:?usage}")" && pwd)/$(basename "$3")
TO=${4:?usage}
N=${5:-2}
mkdir -p "$W/log"
CP="$H/ProjectFortress/build:$("$FORTRESS_HOME/bin/fortress_classpath" 2>/dev/null | tail -1 | tr ':' '\n' | grep '/third_party/' | paste -sd:)"
export FORTRESS_HOME=$H
FAST="-XX:+UseSerialGC -XX:TieredStopAtLevel=1 -XX:ActiveProcessorCount=1"
machine_line () {   # protocol.md, principle 2
  echo "nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/.*: //') MHz; load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS"
}
echo "start $(date -u +%FT%TZ) home: $H shards: $N timeout: $TO; $(machine_line)" | tee "$W/machine.txt"
head -3 "$H/snapshot.txt" >> "$W/machine.txt"
df -h "$W" | tail -1 >> "$W/machine.txt"
for i in $(seq 0 $((N-1))); do
  (
    C="$W/caches-$i"; T="$W/tmp-$i"; mkdir -p "$C" "$T"
    [ -f "$C/global.map" ] || printf '\0\0\0\0' > "$C/global.map"
    awk -v n=$N -v i=$i 'NR % n == i' "$L" | while read -r f; do
      t=$(basename "$f" .fss)
      grep -q '^rc=' "$W/log/$t.txt" 2>/dev/null && continue
      start=$(date +%s)
      ( cd "$H/$(dirname "$f")" && FORTRESS_CACHES="$C" timeout -k 10 "$TO" \
        java -Xmx4g -Xss64m -Djava.io.tmpdir="$T" $FAST -Dfile.encoding=UTF-8 \
             -cp "$CP" com.sun.fortress.Shell walk "$(basename "$f")" \
        < /dev/null > "$W/log/$t.txt" 2>&1 )
      rc=$?
      printf '\nrc=%s secs=%s\n' "$rc" "$(( $(date +%s) - start ))" >> "$W/log/$t.txt"
    done
  ) &
done
wait
echo "done $(date -u +%FT%TZ): $(grep -l '^rc=' "$W"/log/*.txt | wc -l) logs; load $(cut -d' ' -f1-3 /proc/loadavg)" | tee -a "$W/machine.txt"
