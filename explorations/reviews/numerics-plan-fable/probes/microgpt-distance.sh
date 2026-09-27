#!/bin/bash
# microgpt-distance.sh <work-dir> <label> <setting> <dir-of-programs> <component>...
# The compiled checker over microGPT's own components against the one library (the interpreter's
# prelude), every stage and every declaration, the overloading memo off: the distance measurement's
# one-JVM driver (perf-probes/prelude/switch-over-distance-flat/DistanceMulti.java) pointed at the
# programs instead of the prelude components.  <work-dir> is a directory prepared by
# perf-probes/prelude/distance-triage/run.sh <work-dir> build (the driver classes and the checker
# shadows).  Nothing tracked is modified; a private cache under <work-dir>.
set -u
cd "$(dirname "$0")/../../../.."                                  # $FORTRESS_HOME
source explorations/experiment/env.sh
export JAVA_FLAGS="-Xmx4g -Xss64m"
W=${1:?work-dir}; LB=${2:?label}; S=${3:?setting}; D=${4:?dir}; shift 4
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1 | sed 's#:[^:]*/default_repository/caches/bytecode_cache##')
ALL="-Dprobe.tolerant=true -Dprobe.all=true -Dfortress.analyzer.overload.cache=false"
OUT=$W/mg-$LB-$S; rm -rf "$OUT.caches"; mkdir -p "$OUT.caches/tmp"
T=""; for c in "$@"; do T="$T $(cd "$D" && pwd)/$c.fss"; done
{ echo "########## DistanceMulti microGPT label=$LB setting=$S dir=$D"; echo "# jvm flags: $ALL"
  echo "# machine: nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/\t//g'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/\t//g')"
  echo "# load average at start: $(cut -d' ' -f1-3 /proc/loadavg); JDK: $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS; tree $(git rev-parse --short HEAD)"
  date -u +'# start %Y-%m-%dT%H:%M:%SZ'; ST=$(date +%s)
  ( cd "$D" && timeout -k 30 5400 java $JAVA_FLAGS -XX:-OmitStackTraceInFastThrow -Dfortress.caches="$OUT.caches" -Djava.io.tmpdir="$OUT.caches/tmp" $ALL \
       -cp "$W/shadow-classes:$W/classes:$CP" DistanceMulti -order check -setting $S $T )
  echo "exit=$?"; echo "ELAPSED $(( $(date +%s) - ST )) s"; date -u +'# end %Y-%m-%dT%H:%M:%SZ'; } > "$OUT.out" 2>&1
rm -rf "$OUT.caches"
python3 explorations/perf-probes/prelude/switch-over-distance/errors.py "$OUT.tsv" "$OUT.out" > "$OUT.tally.txt" 2>&1
echo "ran $LB $S: $(grep -E '^ELAPSED' "$OUT.out"); $(wc -l < "$OUT.tsv") lines in $OUT.tsv"
