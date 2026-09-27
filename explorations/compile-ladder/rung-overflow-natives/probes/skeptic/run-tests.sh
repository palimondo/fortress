#!/bin/bash
set -u
cd /home/user/fortress-overflow
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME=/home/user/fortress-overflow FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
D=explorations/compile-ladder/rung-overflow-natives/probes/skeptic
C=$FORTRESS_HOME/tmp/sk/caches-walk-edit; T=$FORTRESS_HOME/tmp/sk/tmp
CP=$(./bin/fortress_classpath | tail -1)
echo "# the rung's three tests and the three that must stay green, under walk on the edited build, run by the skeptic, $(date -u +%FT%TZ), nproc $(nproc), $(grep -m1 'model name' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //'), $(grep -m1 'cpu MHz' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //') MHz, load $(cut -d' ' -f1-3 /proc/loadavg), $(java -version 2>&1 | head -1), FORTRESS_THREADS=1, HEAD $(git rev-parse --short HEAD)"
for t in FixedWidthOverflowRungB intPrim longPrim WrapOperatorsRungD IntSemanticsRungI UnsignedTest; do
  echo "== walk ProjectFortress/tests/$t.fss"
  FORTRESS_CACHES="$C" timeout 600 java -Xmx4g -Xss64m -Djava.io.tmpdir="$T" -Dfortress.caches="$C" -Dfile.encoding=UTF-8 -cp "$CP" com.sun.fortress.Shell walk ProjectFortress/tests/$t.fss < /dev/null 2>&1 | grep -E -v '^[[:space:]]+at |^java.lang.Throwable|^Turn on|^$'
  echo "rc=${PIPESTATUS[0]}"
done
