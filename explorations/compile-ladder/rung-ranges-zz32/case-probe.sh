#!/bin/bash
# case-probe.sh <distance-scratch-dir> <file.fss>: the compiled checker in the one-library world (the interpreter's
# prelude in scope) over one component, through the distance stage's own driver and shadow classes, which
# explorations/coordinator/tools/distance/run.sh built in <distance-scratch-dir> (shadow-classes/, classes/): the
# same flags and setting (any) as that stage, the component as the only target, a private cache. The probe is
# the only way to reach a component's case today: the type-check phase checks no component while an api has
# errors (ProjectFortress/src/com/sun/fortress/compiler/phases/TypeCheckPhase.java:45-46), which the shadow lifts.
set -u
cd "$(dirname "$0")/../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH"
export FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
D=$(cd "$1" && pwd); F=$2
S="$FORTRESS_HOME/tmp/case-probe.$$"; rm -rf "$S"; mkdir -p "$S/caches" "$S/tmp"
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1 | sed 's#:[^:]*/default_repository/caches/bytecode_cache##')
bash explorations/compile-ladder/rung-ranges-zz32/machine.sh "case-probe $F (shadow classes of $1)"
echo "\$ java ... DistanceMulti -order check -setting any $F"
timeout -k 30 1800 java -Xmx4g -Xss64m -XX:-OmitStackTraceInFastThrow -Djava.io.tmpdir="$S/tmp" -Dfortress.caches="$S/caches" \
  -Dprobe.tolerant=true -Dprobe.all=true -Dfortress.analyzer.overload.cache=false \
  -cp "$D/shadow-classes:$D/classes:$CP" DistanceMulti -order check -setting any "$F" < /dev/null > "$S/run.txt" 2>&1
echo "rc=$?"
echo "--- the probe's own lines (its errors and crashes), and the run's summary"
grep -n "$(basename "$F")\|DECL-CRASH\|### " "$S/run.txt" | sed "s#$FORTRESS_HOME/##g" | grep -v "^\s*at " | head -60
rm -rf "$S"
