#!/bin/bash
# run-ctests.sh <stock|fix> : TestsD over gate-list.txt, from ProjectFortress/compiler_tests, private cache.
set -u
D="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
source "$D/env-D.sh"
V=$1
CP=$("$FORTRESS_HOME/bin/fortress_classpath" 2>/dev/null | tail -1 | sed 's#:[^:]*/default_repository/caches/bytecode_cache##')
mkdir -p "$D/ctests/drv"
test -f "$D/ctests/drv/TestsD.class" || javac -nowarn -cp "$CP" -d "$D/ctests/drv" "$D/ctests/TestsD.java" || exit 1
SH=""; [ "$V" != stock ] && SH="$D/classes-$V:"
C="$D/ctests/cache-$V"; rm -rf "$C"; mkdir -p "$C"
OUT="$D/ctests/typecheck-$V.txt"
cd "$FORTRESS_HOME/ProjectFortress/compiler_tests"
{ echo "# run-ctests.sh $V $(date -u +%FT%TZ); tree $(git -C "$FORTRESS_HOME" rev-parse --short HEAD); nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/\t//g'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/\t//g'); load at start $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS; files $(wc -l < "$D/ctests/gate-list.txt")"
  S=$(date +%s)
  timeout -k 30 5400 java $JAVA_FLAGS -Dfortress.caches="$C" \
    "-Dfortress.source.path=;.;$FORTRESS_HOME/ProjectFortress/LibraryBuiltin;$FORTRESS_HOME/Library;$FORTRESS_HOME/ProjectFortress/test_library" \
    -cp "$SH$D/ctests/drv:$CP" TestsD $(cat "$D/ctests/gate-list.txt") 2>&1
  echo "exit=$?"; echo "ELAPSED $(( $(date +%s) - S )) s"; } > "$OUT" 2>&1
rm -rf "$C"
echo "done $V: $(grep -c '^=== ' "$OUT") files, $(grep -c '^### THROWN' "$OUT") thrown, $(grep ELAPSED "$OUT")"
