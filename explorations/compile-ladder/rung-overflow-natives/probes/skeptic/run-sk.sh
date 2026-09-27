#!/bin/bash
# run-sk.sh <walk-stock|walk-edit|compiled> <Name>: runs probes/skeptic/<Name>.fss one way and writes
# probes/skeptic/<Name>-<way>.txt. walk-stock puts tmp/sk/stock-classes (the four glue classes compiled from
# 5c368175f) ahead of ProjectFortress/build; walk-edit uses the build as it is; compiled runs `fortress compile`
# and `fortress run` against a private copy of default_repository/caches (tmp/sk/caches-compiled).
# env.sh's settings without its rm of /tmp/fortress*rats, which other agents' runs may be using.
set -u
cd "$(dirname "$0")/../../../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH"
export FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=${FORTRESS_THREADS:-1}
unset JAVA_TOOL_OPTIONS
WAY=$1; N=$2
D=explorations/compile-ladder/rung-overflow-natives/probes/skeptic
OUT="$D/$N-$WAY${OUTSUFFIX:-}.txt"
T="$FORTRESS_HOME/tmp/sk/tmp"; mkdir -p "$T"
{
  echo "# $N, $WAY, $(date -u +%FT%TZ), nproc $(nproc), $(grep -m1 'model name' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //'), $(grep -m1 'cpu MHz' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //') MHz, load $(cut -d' ' -f1-3 /proc/loadavg), $(java -version 2>&1 | head -1), FORTRESS_THREADS=$FORTRESS_THREADS, HEAD $(git rev-parse --short HEAD)"
  case $WAY in
    walk-stock|walk-edit)
      C="$FORTRESS_HOME/tmp/sk/caches-$WAY"
      CP=$(./bin/fortress_classpath | tail -1)
      [ "$WAY" = walk-stock ] && CP="$FORTRESS_HOME/tmp/sk/stock-classes:$CP"
      FORTRESS_CACHES="$C" timeout 900 java -Xmx4g -Xss64m -Djava.io.tmpdir="$T" -Dfortress.caches="$C" \
        -Dfile.encoding=UTF-8 -cp "$CP" com.sun.fortress.Shell walk "$D/$N.fss" < /dev/null 2>&1
      echo "rc=$?" ;;
    compiled)
      C="$FORTRESS_HOME/tmp/sk/caches-compiled"
      export FORTRESS_CACHES="$C" JAVA_FLAGS="-Xmx2g -Xss64m -Dfortress.caches=$C -Djava.io.tmpdir=$T"
      ( cd "$D" && timeout 600 "$FORTRESS_HOME/bin/fortress" compile "$N.fss" < /dev/null 2>&1 ; echo "compile rc=$?" )
      timeout 600 ./bin/fortress run "$N" < /dev/null 2>&1
      echo "run rc=$?" ;;
  esac
} > "$OUT" 2>&1
echo "$OUT"
