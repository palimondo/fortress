#!/bin/bash
# count-run.sh <tree> <work-dir> <list-file> [shards]: rung O's runner
# (explorations/compile-ladder/rung-walk-overflow/count-run.sh) with the tree to run as its first argument,
# so that the base passes run a checkout of the base (its Library/ and its tests) and the edit pass this
# worktree, both on this worktree's ProjectFortress/build (no Java differs). Every file of <list-file>
# (paths relative to <tree>) runs under walk, one JVM per test, <shards> at a time (default 4), each shard
# with its own FORTRESS_CACHES and java.io.tmpdir, one core per JVM, -Xmx4g -Xss64m, FORTRESS_THREADS=1,
# timeout 600 s (COUNT_TIMEOUT to change it, for re-running the tests a loaded machine timed out); output to <work-dir>/log/<test>.txt with an rc= secs= trailer. It sources no env.sh, so
# it never removes another run's /tmp/fortress*rats.
set -u
R=$(cd "$(dirname "$0")/../../.." && pwd)                    # this worktree, whose build is used
TREE=$(cd "${1:?usage: count-run.sh <tree> <work-dir> <list-file> [shards]}" && pwd)
W=$(mkdir -p "${2:?usage}" && cd "$2" && pwd)
L=$(cd "$(dirname "${3:?usage}")" && pwd)/$(basename "$3")
N=${4:-4}
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH"
unset JAVA_TOOL_OPTIONS
mkdir -p "$W/log"
CP=$(cd "$R" && FORTRESS_HOME="$R" ./bin/fortress_classpath 2>/dev/null | tail -1)
[ -n "$CP" ] || { echo "count-run: no classpath" ; exit 1 ; }
# FORTRESS_AUTOHOME names the tree whose Library/ the interpreter reads; without it the interpreter derives
# its home from the classpath (ProjectProperties.fortressAutoHome, canonical path), i.e. from this worktree's build.
export FORTRESS_HOME="$TREE" FORTRESS_AUTOHOME="$TREE" FORTRESS_THREADS=1
FAST="-XX:+UseSerialGC -XX:TieredStopAtLevel=1 -XX:ActiveProcessorCount=1"
cd "$TREE"
echo "start $(date -u +%FT%TZ) load: $(cut -d' ' -f1-3 /proc/loadavg) tree: $TREE shards: $N"
for i in $(seq 0 $((N-1))); do
  (
    C="$W/caches-$i"; T="$W/tmp-$i"; mkdir -p "$C" "$T"
    [ -f "$C/global.map" ] || printf '\0\0\0\0' > "$C/global.map"
    awk -v n=$N -v i=$i 'NR % n == i' "$L" | while read -r f; do
      t=$(basename "$f" .fss)
      grep -q '^rc=' "$W/log/$t.txt" 2>/dev/null && continue
      start=$(date +%s)
      FORTRESS_CACHES="$C" timeout -k 10 "${COUNT_TIMEOUT:-600}" \
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
