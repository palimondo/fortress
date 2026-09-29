#!/bin/bash
# run-pass.sh <work-dir> <list-file> <timeout-secs> <variant> [shards]
#   variant: stock (home-stock, the build alone) or a switch variant (home-<variant>, the switch's
#   Java shadow ahead of the build); PROPS in the environment adds -D properties (the row-486 toggle).
# Runs every program of <list-file> (paths relative to the home) under walk, one JVM per program, from
# the program's own directory, one core per JVM, with a private cache per shard that starts empty;
# output to <work-dir>/log/<name>.txt with an rc= secs= trailer.  Probe K's run-pass.sh, with the
# home pinned by -Dfortress.autohome (the build is a symlink, which the classpath probe resolves to
# the worktree).  default_repository/ of the tree is never read or written.
set -u
source "$(dirname "${BASH_SOURCE[0]}")/env.sh"
WD=$(mkdir -p "${1:?usage}" && cd "$1" && pwd)
L=$(cd "$(dirname "${2:?usage}")" && pwd)/$(basename "$2")
TO=${3:?usage}
V=${4:?usage}
N=${5:-1}
H=$X/home-$V
[ -d "$H" ] || { echo "no home $H"; exit 2; }
mkdir -p "$WD/log"
RCP=$CP; [ "$V" = stock ] || RCP="$SHADOW:$CP"
FAST="-XX:+UseSerialGC -XX:TieredStopAtLevel=1 -XX:ActiveProcessorCount=1"
echo "start $(date -u +%FT%TZ) variant: $V props: ${PROPS:-none} shards: $N timeout: $TO; $(machine_line)" | tee "$WD/machine.txt"
df -h "$X" | tail -1 >> "$WD/machine.txt"
for i in $(seq 0 $((N-1))); do
  (
    C="$WD/caches-$i"; T="$WD/tmp-$i"; mkdir -p "$C" "$T"
    [ -f "$C/global.map" ] || printf '\0\0\0\0' > "$C/global.map"
    awk -v n=$N -v i=$i 'NR % n == i' "$L" | while read -r f; do
      t=$(basename "$f" .fss)
      grep -q '^rc=' "$WD/log/$t.txt" 2>/dev/null && continue
      start=$(date +%s)
      ( cd "$H/$(dirname "$f")" && FORTRESS_HOME=$H FORTRESS_CACHES="$C" timeout -k 10 "$TO" \
        java -Xmx4g -Xss64m -Djava.io.tmpdir="$T" $FAST -Dfile.encoding=UTF-8 -Dfortress.autohome=$H ${PROPS:-} \
             -cp "$RCP" com.sun.fortress.Shell walk "$(basename "$f")" \
        < /dev/null > "$WD/log/$t.txt" 2>&1 )
      rc=$?
      printf '\nrc=%s secs=%s\n' "$rc" "$(( $(date +%s) - start ))" >> "$WD/log/$t.txt"
    done
  ) &
done
wait
echo "done $(date -u +%FT%TZ): $(grep -l '^rc=' "$WD"/log/*.txt | wc -l) logs; load $(cut -d' ' -f1-3 /proc/loadavg)" | tee -a "$WD/machine.txt"
