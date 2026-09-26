#!/bin/bash
# Run the compiled path's static checker over the interpreter's library, with the
# overloading check forced to run even where earlier stages reported errors, and
# list what it finds. Reads nothing under explorations/ except the checker-count
# tool's WorldFlip driver; writes only to the scratch directory and <out-file>.
#
#   explorations/reviews/overload-static-params-ways/run-overload-anyway.sh <out-file> <scratch-dir> [target]
#
# target defaults to Library/FortressLibrary.fss. Run from $FORTRESS_HOME with
# explorations/experiment/env.sh sourced.
set -u
OUT=$1 ; SCRATCH=$2 ; TARGET=${3:-Library/FortressLibrary.fss}
FH=${FORTRESS_HOME:-$PWD}
D="$FH/explorations/reviews/overload-static-params-ways"
mkdir -p "$SCRATCH/classes" "$SCRATCH/caches"
CP=$("$FH/bin/fortress_classpath" 2>/dev/null | tail -1)
javac -nowarn -cp "$CP" -d "$SCRATCH/classes" \
      "$FH/explorations/coordinator/tools/checker-count/WorldFlip.java" \
      "$D/probe-src/com/sun/fortress/compiler/StaticChecker.java" > "$SCRATCH/javac.txt" 2>&1 || { cat "$SCRATCH/javac.txt"; exit 1; }
( cd "$FH" && timeout -k 10 900 java -Xmx4g -Xss64m -Dprobe.overloadAnyway=1 \
      -Dfortress.caches="$SCRATCH/caches" -cp "$SCRATCH/classes:$CP" WorldFlip "$TARGET" ) > "$SCRATCH/run.txt" 2>&1
grep '^@@OVL' "$SCRATCH/run.txt" | sed "s|$FH/||g" > "$OUT"
echo "# $(grep -c '^@@OVL error' "$OUT") overloading errors; full output $SCRATCH/run.txt"
