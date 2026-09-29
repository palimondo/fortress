#!/bin/bash
# warm-time.sh <test> <n>: the wall time of one test under walk on the base home and on the edit home
# (tmp/home-base, tmp/home-edit, made by snapshot.sh), each with its own cache warmed by one untimed run,
# then n timed runs alternating base and edit, one JVM at a time, with the comparison's JVM flags
# (run-pass.sh). Source explorations/experiment/env.sh first.
set -u
FH=${FORTRESS_HOME:?}
T=${1:?test}; N=${2:-5}
TP=$("$FH/bin/fortress_classpath" 2>/dev/null | tail -1 | tr ':' '\n' | grep '/third_party/' | paste -sd:)
FAST="-XX:+UseSerialGC -XX:TieredStopAtLevel=1 -XX:ActiveProcessorCount=1"
echo "# warm-time $T $(date -u +%FT%TZ); nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/.*: //') MHz; load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=${FORTRESS_THREADS:-unset}"
one () {   # one <home-label>
  local H="$FH/tmp/home-$1" C="$FH/tmp/warm-$1"
  ( cd "$H/ProjectFortress/tests" && FORTRESS_HOME=$H FORTRESS_CACHES=$C java -Xmx4g -Xss64m -Djava.io.tmpdir="$FH/tmp" $FAST \
      -Dfile.encoding=UTF-8 -cp "$H/ProjectFortress/build:$TP" com.sun.fortress.Shell walk "$T.fss" > /dev/null 2>&1 )
}
for h in base edit; do rm -rf "$FH/tmp/warm-$h"; mkdir -p "$FH/tmp/warm-$h"; printf '\0\0\0\0' > "$FH/tmp/warm-$h/global.map"; one $h; done
for i in $(seq 1 "$N"); do
  for h in base edit; do
    s=$(date +%s%N); one $h; e=$(date +%s%N)
    echo "$h run $i: $(( (e - s) / 1000000 )) ms; load $(cut -d' ' -f1 /proc/loadavg)"
  done
done
rm -rf "$FH/tmp/warm-base" "$FH/tmp/warm-edit"
