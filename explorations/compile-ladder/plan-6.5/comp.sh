#!/bin/bash
# comp.sh <dir-of-probe> <Name> [shadow-classes-dir]: compile <dir>/<Name>.fss with the bytecode compiler in the
# compiler's world into a private cache seeded from tmp/libcache, run it, and capture <dir>/<Name>.comp.txt
# (the shape of explorations/reviews/sum-replacement-judgement/comp.sh, with env-noclean.sh and a shadow).
D="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$D/env-noclean.sh"
JAVA_FLAGS="$JAVA_FLAGS ${EXTRA_FLAGS:-}"
P=$(cd "${1:?usage}" && pwd); N=${2:?usage}; SH=${3:-}
L="$FORTRESS_HOME/tmp/libcache"
C="$FORTRESS_HOME/tmp/cache-comp-$N"
rm -rf "$C"; cp -r "$L" "$C"; mkdir -p "$C/tmp"
CP=$("$FORTRESS_HOME/bin/fortress_classpath" | tail -1)
[ -n "$SH" ] && CP="$SH:$CP"
cd "$P"
{
  echo "# comp.sh $N $(date -u +%FT%TZ); tree $(git -C "$FORTRESS_HOME" rev-parse --short HEAD); nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/.*: //') MHz; load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | grep -m1 version); FORTRESS_THREADS=$FORTRESS_THREADS; shadow ${SH:-none}"
  echo "## fortress compile $N.fss (private cache, compiler's world)"
  timeout -k 10 1800 java $JAVA_FLAGS -Dfortress.caches=$C -Djava.io.tmpdir=$C/tmp -cp "$CP" com.sun.fortress.Shell compile "$N.fss" 2>&1
  echo "compile rc=$?"
  echo "## run"
  timeout -k 10 600 java $JAVA_FLAGS -Dfortress.caches="$C" -cp "$C/bytecode_cache:$C/bytecode_cache/*:$C/nativewrapper_cache:$CP" com.sun.fortress.runtimeSystem.MainWrapper "$N" 2>&1
  echo "run rc=$?"
} > "$P/$N.comp.txt" 2>&1
cat "$P/$N.comp.txt"
