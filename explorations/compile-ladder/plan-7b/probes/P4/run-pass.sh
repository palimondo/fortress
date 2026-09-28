#!/bin/bash
# run-pass.sh <work-dir> <list-file> <timeout-secs> [shards]
# Probe P4's one pass: every program of <list-file> (paths relative to the private home $H, or
# absolute) under walk with the logging shadow ahead of the frozen classpath and -Dprobe.p4 set, one
# JVM per program, from the program's own directory, one core per JVM, a private cache per shard that
# starts empty; output to <work-dir>/log/<name>.txt with an rc= secs= trailer, the shadow's lines to
# <work-dir>/probe/<name>.txt.  Probe K's run-pass.sh (compile-ladder/plan-n/probe-k/) in log mode,
# with this probe's shadow; default_repository/ of the tree is never read or written.
set -u
source "$(dirname "${BASH_SOURCE[0]}")/../env.sh"
W=$(mkdir -p "${1:?usage}" && cd "$1" && pwd)
L=$(cd "$(dirname "${2:?usage}")" && pwd)/$(basename "$2")
TO=${3:?usage}
N=${4:-2}
mkdir -p "$W/log" "$W/probe"
RCP="$X/p4/classes:$CP"
export FORTRESS_HOME=$H
FAST="-XX:+UseSerialGC -XX:TieredStopAtLevel=1 -XX:ActiveProcessorCount=1"
echo "start $(date -u +%FT%TZ) shards: $N timeout: $TO; $(machine_line)" | tee "$W/machine.txt"
for i in $(seq 0 $((N-1))); do
  (
    C="$W/caches-$i"; T="$W/tmp-$i"; mkdir -p "$C" "$T"
    [ -f "$C/global.map" ] || printf '\0\0\0\0' > "$C/global.map"
    awk -v n=$N -v i=$i 'NR % n == i' "$L" | while read -r f; do
      case "$f" in /*) p=$f ;; *) p=$H/$f ;; esac
      t=$(basename "$f" .fss)
      grep -q '^rc=' "$W/log/$t.txt" 2>/dev/null && continue
      rm -f "$W/probe/$t.txt"
      start=$(date +%s)
      ( cd "$(dirname "$p")" && FORTRESS_CACHES="$C" timeout -k 10 "$TO" \
        java -Xmx4g -Xss64m -Djava.io.tmpdir="$T" $FAST -Dfile.encoding=UTF-8 -Dprobe.p4=log \
             -Dprobe.p4.log="$W/probe/$t.txt" -cp "$RCP" com.sun.fortress.Shell walk "$(basename "$p")" \
        < /dev/null > "$W/log/$t.txt" 2>&1 )
      rc=$?
      printf '\nrc=%s secs=%s\n' "$rc" "$(( $(date +%s) - start ))" >> "$W/log/$t.txt"
    done
    rm -rf "$C" "$T"
  ) &
done
wait
echo "done $(date -u +%FT%TZ): $(grep -l '^rc=' "$W"/log/*.txt | wc -l) logs; load $(cut -d' ' -f1-3 /proc/loadavg)" | tee -a "$W/machine.txt"
