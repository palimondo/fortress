#!/bin/bash
# Run the bytecode compiler's phases through the static checker (-stop typecheck) over
# one probe component with the INTERPRETER's library in scope (FortressLibrary /
# FortressBuiltin / AnyType), the checker-count tool's switch (WorldFlip.java), with the
# library api's own errors dropped so that the pipeline goes on to check the probe
# component (the fill worker's shadow StaticChecker, -Dprobe.dropApiErrors). The capture
# keeps only the lines about the probe and the tallies: <Name>[.<variant>].check.txt.
#   explorations/reviews/sum-replacement-judgement/check.sh <Name> [<variant>]
# With <variant>, the library is the private copy $SCRATCH/lib-<variant> (make-lib.sh).
D="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$D/../../experiment/env.sh"
N=$1; V=${2:-}
S=${SCRATCH:?set SCRATCH to a private directory}
C="$S/cache-check-$N${V:+-$V}"
rm -rf "$C"; mkdir -p "$C" "$S/checkdrv"
CP=$("$FORTRESS_HOME/bin/fortress_classpath" | tail -1)
SHADOW="$FORTRESS_HOME/explorations/reviews/fill-overloads-ways/shadow-src/com/sun/fortress/compiler/StaticChecker.java"
test -f "$S/checkdrv/CheckDriver.class" || javac -nowarn -cp "$CP" -d "$S/checkdrv" "$D/CheckDriver.java" "$SHADOW" || exit 1
LIB="$FORTRESS_HOME/Library"; LB="$FORTRESS_HOME/ProjectFortress/LibraryBuiltin"
if [ -n "$V" ]; then "$D/make-lib.sh" "$V" || exit 1; LIB="$S/lib-$V/Library"; LB="$S/lib-$V/LibraryBuiltin"; fi
OUT="$D/$N${V:+.$V}.check.txt"
FULL="$S/check-$N${V:+-$V}.full.txt"
cd "$D"
timeout -k 10 900 java $JAVA_FLAGS -Dfortress.caches="$C" \
  "-Dfortress.source.path=;.;$LB;$LIB;$FORTRESS_HOME/ProjectFortress/test_library" \
  -Dprobe.dropApiErrors=1 -cp "$S/checkdrv:$CP" CheckDriver -stop typecheck "$N.fss" > "$FULL" 2>&1
RC=$?
{
  echo "# check.sh $N ${V:-stock} started $(date -u +%FT%TZ); tree $(git -C "$FORTRESS_HOME" rev-parse --short HEAD); nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | grep -m1 version); rc=$RC"
  echo "# api errors dropped (probe.dropApiErrors): $(grep '^@@PROBE checkApi .* -> errors=' "$FULL" | sed -E 's/^@@PROBE checkApi ([^ ]+) -> errors=([0-9]+)$/\1=\2/' | sort -u | tr '\n' ' ')"
  echo "# the probe component's own lines (with 6 lines of context each), then the tallies:"
  grep -n -A6 "^$D/$N.fss:" "$FULL" | sed "s|$D/||g; s|$FORTRESS_HOME/||g" | cut -c1-500
  echo "# tallies:"; grep -E "has [0-9]+ errors?\.|### rc=|Exception|Error:" "$FULL" | grep -v "^@@" | head -8
} > "$OUT"
cat "$OUT"
