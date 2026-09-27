#!/bin/bash
# distance.sh <work-dir> <out-name> <FortressLibrary.fss path>: the switch-over distance driver's check of
# the one library's component and apis under walk's setting, every stage, one declaration at a time
# (explorations/perf-probes/prelude/switch-over-distance/run-all.sh, step check, its run() and trim()),
# on the tree's library or on a copy whose directory shadows it (Shell.sourcePath).  <work-dir> must hold
# the driver and shadow classes built by that script's step build.  The environment is set here without
# sourcing explorations/experiment/env.sh, whose rm of /tmp/fortress*rats a parallel agent may not want.
set -u
cd "$(dirname "$0")/../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
W=$(cd "$1" && pwd); OUT=$2; LIB=$3
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1 | sed 's#:[^:]*/default_repository/caches/bytecode_cache##')
FL="-Dprobe.tolerant=true -Dprobe.all=true -Dfortress.analyzer.overload.cache=false"
rm -rf "$W/caches-$OUT"; mkdir -p "$W/caches-$OUT" "$W/tmp"
{ echo "########## Distance -order check -setting walk $LIB"; echo "# jvm flags: $FL"
  bash explorations/compile-ladder/rung-flat-tower/machine.sh "$OUT"
  S=$(date +%s)
  timeout -k 30 3600 java -Xmx4g -Xss64m -Djava.io.tmpdir="$W/tmp" -XX:-OmitStackTraceInFastThrow -Dfortress.caches="$W/caches-$OUT" $FL \
       -cp "$W/shadow-classes:$W/classes:$CP" Distance -order check -setting walk "$LIB"
  echo "exit=$?"; echo "ELAPSED $(( $(date +%s) - S )) s"; } > "$W/$OUT.out" 2>&1
rm -rf "$W/caches-$OUT"
grep -v '^@@CG AT\|^@@CG PREAT\|^@@CG OVLAT\|^@@CG CAT\|^@@TC DECLAT\|^@@SC CRASHAT\|^	at \|^Caused by' "$W/$OUT.out"
