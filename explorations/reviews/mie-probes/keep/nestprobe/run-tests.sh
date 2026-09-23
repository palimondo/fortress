#!/bin/bash
# run-tests.sh <work-dir> [shards]: runs every ProjectFortress/tests/*.fss under `walk` with the
# NestProbe shadow ahead of ProjectFortress/build on the classpath, one JVM per test, and writes
# one count file per test to <work-dir>/out/<test>.tsv and its output to <work-dir>/log/<test>.txt.
# <work-dir> is scratch OUTSIDE the repository.  Each shard has its own warmed FORTRESS_CACHES, so
# default_repository/ is never read or written and no two JVMs share a cache.  No tracked file
# is modified (LongStringTests.fss writes ProjectFortress/tests/poem.out, which is gitignored
# and deleted at the end, as after `ant testSystem`).
set -u
cd "$(dirname "$0")/../../../../.."                      # $FORTRESS_HOME
source experiment/env.sh
K=explorations/reviews/mie-probes/keep/nestprobe
W=${1:?usage: run-tests.sh <work-dir> [shards]}
N=${2:-4}
mkdir -p "$W/out" "$W/log"
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
if [ ! -d "$W/classes" ]; then
  python3 $K/make-shadow.py "$W" || exit 1
  mkdir -p "$W/classes"
  javac -nowarn -encoding UTF-8 -cp "$CP" -d "$W/classes" $(find "$W/src" -name '*.java') || exit 1
fi
[ -z "$(git status --porcelain ProjectFortress/src)" ] || { echo "ABORT: tracked sources touched" >&2; exit 1; }
# one core per JVM: halves a single test's wall time (6.9 s -> 3.4 s on BigNum.fss) when four run at once
FAST="-XX:+UseSerialGC -XX:TieredStopAtLevel=1 -XX:ActiveProcessorCount=1"
ls ProjectFortress/tests/*.fss | sort > "$W/all.txt"
for i in $(seq 0 $((N-1))); do
  (
    C="$W/caches-$i"; mkdir -p "$C"; [ -f "$C/global.map" ] || printf '\0\0\0\0' > "$C/global.map"
    awk -v n=$N -v i=$i 'NR % n == i' "$W/all.txt" | while read -r f; do
      t=$(basename "$f" .fss)
      grep -q '^rc=' "$W/log/$t.txt" 2>/dev/null && continue
      start=$(date +%s)
      FORTRESS_CACHES="$C" NESTPROBE_OUT="$W/out/$t.tsv" timeout -k 10 600 \
        java $JAVA_FLAGS $FAST -Dfile.encoding=UTF-8 -cp "$W/classes:$CP" com.sun.fortress.Shell walk "$f" \
        < /dev/null > "$W/log/$t.txt" 2>&1
      rc=$?
      printf '\nrc=%s secs=%s\n' "$rc" "$(( $(date +%s) - start ))" >> "$W/log/$t.txt"
      [ -f "$W/out/$t.tsv" ] || : > "$W/out/$t.tsv"
    done
  ) &
done
wait
rm -f ProjectFortress/tests/poem.out
echo "done: $(ls "$W/out" | wc -l) count files"
