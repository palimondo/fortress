#!/bin/bash
# count-run.sh <work-dir> <list-file> [shadow-classes-dir] [shards]: runs every file of <list-file> under
# `walk`, one JVM per test, and writes its output to <work-dir>/log/<test>.txt with an rc= secs= trailer.
# The shape of explorations/reviews/mie-probes/keep/nestprobe/run-tests.sh without its NestProbe shadow:
# each shard has its own FORTRESS_CACHES, so default_repository/ is never read or written and no two JVMs
# share a cache.  A shadow classes directory, if given, is put ahead of ProjectFortress/build on the classpath.
set -u
cd "$(dirname "$0")/../../.."                               # $FORTRESS_HOME
source explorations/experiment/env.sh
W=${1:?usage: count-run.sh <work-dir> <list-file> [shadow-classes-dir] [shards]}
L=${2:?usage: count-run.sh <work-dir> <list-file> [shadow-classes-dir] [shards]}
SH=${3:-}
N=${4:-4}
mkdir -p "$W/log"
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
[ -n "$SH" ] && CP="$SH:$CP"
# one core per JVM, as the precedent: four run at once
FAST="-XX:+UseSerialGC -XX:TieredStopAtLevel=1 -XX:ActiveProcessorCount=1"
echo "start $(date -u +%FT%TZ) load: $(cut -d' ' -f1-3 /proc/loadavg) shadow: ${SH:-none}"
for i in $(seq 0 $((N-1))); do
  (
    C="$W/caches-$i"; T="$W/tmp-$i"; mkdir -p "$C" "$T"
    [ -f "$C/global.map" ] || printf '\0\0\0\0' > "$C/global.map"
    awk -v n=$N -v i=$i 'NR % n == i' "$L" | while read -r f; do
      t=$(basename "$f" .fss)
      grep -q '^rc=' "$W/log/$t.txt" 2>/dev/null && continue
      start=$(date +%s)
      FORTRESS_CACHES="$C" timeout -k 10 600 \
        java -Xmx4g -Xss64m -Djava.io.tmpdir="$T" $FAST -Dfile.encoding=UTF-8 -cp "$CP" com.sun.fortress.Shell walk "$f" \
        < /dev/null > "$W/log/$t.txt" 2>&1
      rc=$?
      printf '\nrc=%s secs=%s\n' "$rc" "$(( $(date +%s) - start ))" >> "$W/log/$t.txt"
    done
  ) &
done
wait
rm -f ProjectFortress/tests/poem.out
echo "done $(date -u +%FT%TZ): $(grep -l '^rc=' "$W"/log/*.txt | wc -l) logs"
