#!/bin/bash
# count.sh <work-dir> <label> <lib-dir> [shadow-classes-dir] [-Dname=value ...]
# The gate's checker-count stage (explorations/coordinator/tools/checker-count/run.sh: the same
# WorldFlip driver, instrumented StaticChecker, overloading memo off and table) with a library copy's
# FortressLibrary.fss as the target, so that the copy's directory heads the source path and its
# FortressLibrary and FortressBuiltin shadow the tree's (the shape of
# compile-ladder/rung-exclusion-remainder/cc-variant.sh). An optional shadow classes directory goes
# ahead of the tree's classes, and -D switches go to the JVM. Writes <work-dir>/table-<label>.txt,
# <work-dir>/errors-<label>.txt (every error message, paths made relative, sorted) and the raw
# <work-dir>/run-<label>.txt. Private caches, deleted after; no tracked file is written.
set -u
cd "$(dirname "$0")/../../.."                               # $FORTRESS_HOME
# env.sh's exports, without its rm of /tmp/fortress*rats, which other runs on the machine may be using
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
W=${1:?usage}; LBL=${2:?usage}; L=$(cd "${3:?usage}" && pwd); shift 3
SH=""; if [ $# -gt 0 ] && [ -d "$1" ]; then SH="$(cd "$1" && pwd):"; shift; fi
T=explorations/coordinator/tools/checker-count
mkdir -p "$W"; W=$(cd "$W" && pwd)
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
if [ ! -f "$W/classes/WorldFlip.class" ]; then
  mkdir -p "$W/classes"
  javac -nowarn -cp "$CP" -d "$W/classes" "$T/WorldFlip.java" \
        "$T/shadow-src/com/sun/fortress/compiler/StaticChecker.java" > "$W/javac.txt" 2>&1 || { cat "$W/javac.txt"; exit 1; }
fi
C="$W/caches-$LBL"; TMP="$W/tmp-$LBL"; rm -rf "$C" "$TMP"; mkdir -p "$C" "$TMP"
M="$(date -u +%FT%TZ) nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/^[^:]*: *//'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/^[^:]*: *//') MHz; load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS"
S=$(date +%s)
timeout -k 10 1800 java -Xmx4g -Xss64m -Djava.io.tmpdir="$TMP" -Dfortress.caches="$C" \
     -Dfortress.analyzer.overload.cache=false "$@" \
     -cp "$W/classes:$SH$CP" WorldFlip "$L/FortressLibrary.fss" > "$W/run-$LBL.txt" 2>&1
RC=$?; E=$(( $(date +%s) - S ))
rm -rf "$C" "$TMP"
{
  printf '#variant\t%s\t%s\n' "$LBL" "$L"
  printf '#switches\t%s\t%s\n' "${SH:-no shadow}" "${*:-none}"
  printf '#api\terrors\n'
  grep '^@@PROBE checkApi .* -> errors=' "$W/run-$LBL.txt" \
      | sed -E 's/^@@PROBE checkApi ([^ ]+) -> errors=([0-9]+)$/\1\t\2/' | sort -u
  printf '#total\t%s\n' "$(grep -oE 'has [0-9]+ errors?\.$' "$W/run-$LBL.txt" | tail -1 | grep -oE '[0-9]+')"
  printf '#locations\t%s\n' "$(grep -oE '^/[^ ]+:[0-9]+:' "$W/run-$LBL.txt" | sort -u | wc -l | tr -d ' ')"
  crash=$(grep -m1 '^@@PROBE OverloadingChecker CRASHED on ' "$W/run-$LBL.txt" | sed 's/^@@PROBE //')
  printf '#crash\t%s\n' "${crash:-none}"
  printf '#rc\t%s\t%s s\n' "$RC" "$E"
  printf '#machine\t%s\n' "$M"
} > "$W/table-$LBL.txt"
# every error, one line each (errlist.py), the copy's and the tree's paths removed
python3 "$FORTRESS_HOME/explorations/reviews/anyintegral-comprises-ways/errlist.py" "$W/run-$LBL.txt" "$L" > "$W/errors-$LBL.txt"
cat "$W/table-$LBL.txt"
