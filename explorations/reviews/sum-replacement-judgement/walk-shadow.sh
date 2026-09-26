#!/bin/bash
# walk.sh with one interpreter class shadowed: EvaluatorBase (the interpreter's static
# parameter inference) with its two "erase to bottom" lines changed to erase to the top
# type (EvaluatorBase.java:226, 245: BottomType.ONLY -> FTypeTop.ONLY), compiled with javac
# into $SCRATCH/walk-shadow and put first on the classpath. Nothing in the tree is built
# or changed. Captures to <Name>[.<variant>].shadow.walk.txt.
#   explorations/reviews/sum-replacement-judgement/walk-shadow.sh <Name.fss path> [<variant>]
D="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$D/../../experiment/env.sh"
F=$1; V=${2:-}
N=$(basename "$F" .fss)
S=${SCRATCH:?set SCRATCH to a private directory}
SH="$S/walk-shadow"
CP=$("$FORTRESS_HOME/bin/fortress_classpath" | tail -1)
if [ ! -f "$SH/com/sun/fortress/interpreter/evaluator/EvaluatorBase.class" ]; then
  mkdir -p "$SH/src"
  sed -e '226s/BottomType.ONLY/FTypeTop.ONLY/' -e '245s/BottomType.ONLY/FTypeTop.ONLY/' \
      "$FORTRESS_HOME/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java" > "$SH/src/EvaluatorBase.java"
  diff "$FORTRESS_HOME/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java" "$SH/src/EvaluatorBase.java" > "$SH/shadow.diff"
  javac -nowarn -cp "$CP" -d "$SH" "$SH/src/EvaluatorBase.java" || exit 1
fi
C="$S/cache-shadow-$N${V:+-$V}"
rm -rf "$C"; mkdir -p "$C"
SP=""
if [ -n "$V" ]; then
  "$D/make-lib.sh" "$V" || exit 1
  SP="-Dfortress.source.path=;.;$S/lib-$V/LibraryBuiltin;$S/lib-$V/Library;$FORTRESS_HOME/ProjectFortress/test_library"
fi
OUT="$D/$N${V:+.$V}.shadow.walk.txt"
cd "$(dirname "$F")"
{
  echo "# walk-shadow.sh $F ${V:-stock} started $(date -u +%FT%TZ); tree $(git -C "$FORTRESS_HOME" rev-parse --short HEAD); nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | grep -m1 version); FORTRESS_THREADS=$FORTRESS_THREADS"
  echo "# shadow: $(tr '\n' ' ' < "$SH/shadow.diff")"
  timeout -k 10 600 java $JAVA_FLAGS -Dfile.encoding=UTF-8 -Dfortress.caches="$C" $SP -cp "$SH:$CP" com.sun.fortress.Shell "$N.fss" 2>&1 | grep -v "^Picked up JAVA_TOOL"
  echo "rc=${PIPESTATUS[0]}"
} > "$OUT"
cat "$OUT"
