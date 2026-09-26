#!/bin/bash
# run-tests.sh <build-classes-dir> <work-dir> [shards]: walks every ProjectFortress/tests/*.fss with the given
# compiled classes first on the classpath, one JVM per test, FORTRESS_THREADS=1, and writes each test's output
# to <work-dir>/log/<test>.txt with an rc= line. The shape of explorations/reviews/mie-probes/keep/nestprobe/run-tests.sh
# without its NestProbe shadow: each shard has its own FORTRESS_CACHES, so default_repository/ is neither read nor
# written and no two JVMs share a cache. LongStringTests.fss writes ProjectFortress/tests/poem.out (gitignored),
# deleted at the end as after `ant testSystem`. Run from FORTRESS_HOME with explorations/experiment/env.sh sourced.
set -u
B=${1:?usage: run-tests.sh <build-classes-dir> <work-dir> [shards]}
W=${2:?usage: run-tests.sh <build-classes-dir> <work-dir> [shards]}
N=${3:-4}
mkdir -p "$W/log"
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
CP="$B:${CP#$FORTRESS_HOME/ProjectFortress/build:}"
FAST="-XX:+UseSerialGC -XX:TieredStopAtLevel=1 -XX:ActiveProcessorCount=1"
ls ProjectFortress/tests/*.fss | sort > "$W/all.txt"
for i in $(seq 0 $((N-1))); do
  (
    C="$W/caches-$i"; mkdir -p "$C" "$W/tmp-$i"; [ -f "$C/global.map" ] || printf '\0\0\0\0' > "$C/global.map"
    awk -v n=$N -v i=$i 'NR % n == i' "$W/all.txt" | while read -r f; do
      t=$(basename "$f" .fss)
      grep -q '^rc=' "$W/log/$t.txt" 2>/dev/null && continue
      start=$(date +%s)
      FORTRESS_THREADS=1 FORTRESS_CACHES="$C" timeout -k 10 600 \
        java $JAVA_FLAGS $FAST -Djava.io.tmpdir="$W/tmp-$i" -Dfile.encoding=UTF-8 -cp "$CP" com.sun.fortress.Shell walk "$f" \
        < /dev/null > "$W/log/$t.txt" 2>&1
      rc=$?
      printf '\nrc=%s secs=%s\n' "$rc" "$(( $(date +%s) - start ))" >> "$W/log/$t.txt"
    done
  ) &
done
wait
rm -f ProjectFortress/tests/poem.out
echo "done: $(ls "$W/log" | wc -l) logs"
