#!/bin/bash
# extra-run.sh <work-dir> <list-file> <timeout-secs> [shadow-classes-dir] [shards]: count-run.sh for programs
# outside ProjectFortress/tests/.  Each list line is a path from $FORTRESS_HOME; the program is walked from its
# own directory (the microGPT checks import their components from there), with the same private caches,
# one core per JVM, and a timeout of <timeout-secs>.  Output to <work-dir>/log/<name>.txt with an rc= secs= trailer.
set -u
cd "$(dirname "$0")/../../.."                               # $FORTRESS_HOME
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
W=$(mkdir -p "${1:?usage}" && cd "$1" && pwd)
L=$(cd "$(dirname "${2:?usage}")" && pwd)/$(basename "$2")
TO=${3:?usage}
SH=${4:-}
N=${5:-4}
mkdir -p "$W/log"
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
[ -n "$SH" ] && CP="$(cd "$SH" && pwd):$CP"
FAST="-XX:+UseSerialGC -XX:TieredStopAtLevel=1 -XX:ActiveProcessorCount=1"
echo "start $(date -u +%FT%TZ) load: $(cut -d' ' -f1-3 /proc/loadavg) shadow: ${SH:-none} timeout: $TO"
for i in $(seq 0 $((N-1))); do
  (
    C="$W/caches-$i"; T="$W/tmp-$i"; mkdir -p "$C" "$T"
    [ -f "$C/global.map" ] || printf '\0\0\0\0' > "$C/global.map"
    awk -v n=$N -v i=$i 'NR % n == i' "$L" | while read -r f; do
      t=$(basename "$f" .fss)
      grep -q '^rc=' "$W/log/$t.txt" 2>/dev/null && continue
      start=$(date +%s)
      ( cd "$FORTRESS_HOME/$(dirname "$f")" && FORTRESS_CACHES="$C" timeout -k 10 "$TO" \
        java -Xmx4g -Xss64m -Djava.io.tmpdir="$T" $FAST -Dfile.encoding=UTF-8 -cp "$CP" com.sun.fortress.Shell walk "$(basename "$f")" \
        < /dev/null > "$W/log/$t.txt" 2>&1 )
      rc=$?
      printf '\nrc=%s secs=%s\n' "$rc" "$(( $(date +%s) - start ))" >> "$W/log/$t.txt"
    done
  ) &
done
wait
echo "done $(date -u +%FT%TZ): $(grep -l '^rc=' "$W"/log/*.txt | wc -l) logs"
