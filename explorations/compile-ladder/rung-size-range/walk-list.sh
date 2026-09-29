#!/bin/bash
# walk-list.sh <label> <dir> <name>...: runs each <dir>/<name>.fss under walk in turn, one JVM each, from a
# scratch copy in tmp/ with private caches, and prints a machine line, then each output with its rc.
# CLASSES=<dir>, when set, is put ahead of the classpath (the base build for base passes).
set -u
cd "${RUN_HOME:-$(dirname "$0")/../../..}"
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=${FORTRESS_THREADS:-1}
unset JAVA_TOOL_OPTIONS
L=$1; D=$2; shift 2
S=$FORTRESS_HOME/tmp/walk-$L-$$; mkdir -p $S/caches $S/tmp; printf '\0\0\0\0' > $S/caches/global.map
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1); [ -n "${CLASSES:-}" ] && CP="$CLASSES:$CP"
echo "# walk-list.sh $L $(date -u +%FT%TZ); tree $(git rev-parse --short HEAD)$(git diff --quiet HEAD -- ProjectFortress/src Library || echo ' with its working changes'); classes ${CLASSES:-ProjectFortress/build}; nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //') MHz; load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS"
for n in "$@"; do
  cp "$D/$n.fss" $S/
  echo "#### $n"
  (cd $S && FORTRESS_CACHES=$S/caches java -Xmx2g -Xss64m -Djava.io.tmpdir=$S/tmp -Dfile.encoding=UTF-8 -cp "$CP" com.sun.fortress.Shell walk $n.fss < /dev/null 2>&1 | grep -v '^\s*at ' | sed "s#$S/##g; s#$FORTRESS_HOME/##g" | cut -c1-300; echo "rc=${PIPESTATUS[0]}")
done
rm -rf $S
