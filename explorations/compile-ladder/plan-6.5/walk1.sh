#!/bin/bash
# walk1.sh <dir> <Name> [shadow-dir]: one program under walk from an empty private cache, with an optional
# classpath shadow, captured to <dir>/<Name>.<label>.txt where label is $LABEL (default walk).
D="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$D/env-noclean.sh"
P=$(cd "${1:?usage}" && pwd); N=${2:?usage}; SH=${3:-}; LB=${LABEL:-walk}
C="$FORTRESS_HOME/tmp/c-walk1-$N-$LB"; T="$FORTRESS_HOME/tmp/t-walk1-$N-$LB"
rm -rf "$C" "$T"; mkdir -p "$C" "$T"; printf '\0\0\0\0' > "$C/global.map"
CP=$("$FORTRESS_HOME/bin/fortress_classpath" | tail -1); [ -n "$SH" ] && CP="$SH:$CP"
cd "$P"
{ echo "# walk1.sh $N $LB $(date -u +%FT%TZ); tree $(git -C "$FORTRESS_HOME" rev-parse --short HEAD) + $(git -C "$FORTRESS_HOME" diff --stat | tail -1); nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/.*: //') MHz; load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | grep -m1 version); FORTRESS_THREADS=$FORTRESS_THREADS; shadow ${SH:-none}"
  FORTRESS_CACHES="$C" timeout -k 10 900 java $JAVA_FLAGS -Djava.io.tmpdir="$T" -cp "$CP" com.sun.fortress.Shell walk "$N.fss" 2>&1
  echo "rc=$?"; } > "$P/$N.$LB.txt" 2>&1
rm -rf "$C" "$T"
cat "$P/$N.$LB.txt"
