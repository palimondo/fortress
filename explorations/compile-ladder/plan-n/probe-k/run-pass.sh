#!/bin/bash
# run-pass.sh <work-dir> <list-file> <timeout-secs> <mode> [shards]
#   mode: stock (the snapshot's build alone), log (the shadow, -Dprobe.k=log: computes today's
#   inference and the rule's, writes each difference, keeps today's) or apply (the shadow,
#   -Dprobe.k=apply: writes each difference and takes the rule's).
# Runs every program of <list-file> (paths relative to the private home $H) under walk, one JVM per
# program, from the program's own directory, one core per JVM, with a private cache per shard that
# starts empty; output to <work-dir>/log/<name>.txt with an rc= secs= trailer, and the shadow's
# difference lines to <work-dir>/probe/<name>.txt.  The shape of rung O's count-run.sh and
# extra-run.sh (explorations/compile-ladder/rung-walk-overflow/, rung-overflow-natives/), moved to
# the private home.  default_repository/ of the tree is never read or written.
set -u
source "$(dirname "${BASH_SOURCE[0]}")/env.sh"
W=$(mkdir -p "${1:?usage}" && cd "$1" && pwd)
L=$(cd "$(dirname "${2:?usage}")" && pwd)/$(basename "$2")
TO=${3:?usage}
MODE=${4:?usage}
N=${5:-2}
mkdir -p "$W/log" "$W/probe"
RCP=$CP
PROPS=""
case $MODE in
  stock) ;;
  log|apply) RCP="$SHADOW:$CP"; PROPS="-Dprobe.k=$MODE" ;;
  *) echo "bad mode $MODE"; exit 2 ;;
esac
export FORTRESS_HOME=$H
FAST="-XX:+UseSerialGC -XX:TieredStopAtLevel=1 -XX:ActiveProcessorCount=1"
echo "start $(date -u +%FT%TZ) mode: $MODE shards: $N timeout: $TO; $(machine_line)" | tee "$W/machine.txt"
df -h "$X" | tail -1 >> "$W/machine.txt"
for i in $(seq 0 $((N-1))); do
  (
    C="$W/caches-$i"; T="$W/tmp-$i"; mkdir -p "$C" "$T"
    [ -f "$C/global.map" ] || printf '\0\0\0\0' > "$C/global.map"
    awk -v n=$N -v i=$i 'NR % n == i' "$L" | while read -r f; do
      t=$(basename "$f" .fss)
      grep -q '^rc=' "$W/log/$t.txt" 2>/dev/null && continue
      rm -f "$W/probe/$t.txt"
      start=$(date +%s)
      ( cd "$H/$(dirname "$f")" && FORTRESS_CACHES="$C" timeout -k 10 "$TO" \
        java -Xmx4g -Xss64m -Djava.io.tmpdir="$T" $FAST -Dfile.encoding=UTF-8 $PROPS \
             -Dprobe.k.log="$W/probe/$t.txt" -cp "$RCP" com.sun.fortress.Shell walk "$(basename "$f")" \
        < /dev/null > "$W/log/$t.txt" 2>&1 )
      rc=$?
      printf '\nrc=%s secs=%s\n' "$rc" "$(( $(date +%s) - start ))" >> "$W/log/$t.txt"
    done
  ) &
done
wait
echo "done $(date -u +%FT%TZ): $(grep -l '^rc=' "$W"/log/*.txt | wc -l) logs; load $(cut -d' ' -f1-3 /proc/loadavg)" | tee -a "$W/machine.txt"
