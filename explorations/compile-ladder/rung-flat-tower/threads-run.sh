#!/bin/bash
# threads-run.sh <work-dir> <list-file> <threads>: every file of <list-file> under walk, one JVM at a time,
# FORTRESS_THREADS=<threads>, one private cache for the list, the JVM's default flags beside -Xmx4g -Xss64m
# (so a four-thread pool really has four cores).  Output to <work-dir>/log/<test>.txt with an rc= trailer,
# as count-run.sh writes it, so that compare-normalised.py reads it.  For the manifest's writesState: a
# reduction's identity is joined at each split of a parallel generator, so every differential of a
# reduction runs at one thread and at four.
set -u
cd "$(dirname "$0")/../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$(pwd)"
unset JAVA_TOOL_OPTIONS
W=${1:?usage}; L=${2:?usage}; export FORTRESS_THREADS=${3:?usage}
mkdir -p "$W/log" "$W/caches" "$W/tmp"; [ -f "$W/caches/global.map" ] || printf '\0\0\0\0' > "$W/caches/global.map"
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
echo "start $(date -u +%FT%TZ) load: $(cut -d' ' -f1-3 /proc/loadavg) threads: $FORTRESS_THREADS"
while read -r f; do
  t=$(basename "$f" .fss)
  FORTRESS_CACHES="$W/caches" timeout -k 10 600 java -Xmx4g -Xss64m -Djava.io.tmpdir="$W/tmp" -Dfile.encoding=UTF-8 \
      -cp "$CP" com.sun.fortress.Shell walk "$f" < /dev/null > "$W/log/$t.txt" 2>&1
  printf '\nrc=%s secs=0\n' "$?" >> "$W/log/$t.txt"
done < "$L"
echo "done $(date -u +%FT%TZ)"
