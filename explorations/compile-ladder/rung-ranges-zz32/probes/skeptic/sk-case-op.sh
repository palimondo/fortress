#!/bin/bash
# sk-case-op.sh <distance-scratch-dir> <instrumented-classes-dir|none> <file.fss>: the rung's case-probe.sh, with one change:
# a directory of instrumented classes (a copy of Functionals.scala that prints the operator the case rule chooses,
# "@@CASEOP", compiled alone against ProjectFortress/build) put ahead of the distance stage's shadow classes.
# The compiled checker in the one-library world, setting any, the component as the only target, a private cache.
set -u
cd "$(dirname "$0")/../../../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH"
export FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
D=$(cd "$1" && pwd); X=$2; F=$3
PRE=""; [ "$X" != none ] && PRE="$(cd "$X" && pwd):"
S="$FORTRESS_HOME/tmp/sk-case-op.$$"; rm -rf "$S"; mkdir -p "$S/caches" "$S/tmp"
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1 | sed 's#:[^:]*/default_repository/caches/bytecode_cache##')
bash explorations/compile-ladder/rung-ranges-zz32/machine.sh "sk-case-op $F (shadow classes of $1, instrumented: $X)"
echo "\$ java ... DistanceMulti -order check -setting any $F"
timeout -k 30 1800 java -Xmx4g -Xss64m -XX:-OmitStackTraceInFastThrow -Djava.io.tmpdir="$S/tmp" -Dfortress.caches="$S/caches" \
  -Dprobe.tolerant=true -Dprobe.all=true -Dfortress.analyzer.overload.cache=false \
  -cp "$PRE$D/shadow-classes:$D/classes:$CP" DistanceMulti -order check -setting any "$F" < /dev/null > "$S/run.txt" 2>&1
echo "rc=$?"
echo "--- the probe's own lines (its errors, crashes and chosen operators), and the run's summary"
grep -n "$(basename "$F")\|DECL-CRASH\|### " "$S/run.txt" | sed "s#$FORTRESS_HOME/##g" | grep -v "^\s*at \|DECLAT" | head -80
rm -rf "$S"
