#!/bin/bash
# The compiled path's static checker (-stop typecheck) over one probe component with the
# ONE library (the interpreter's FortressLibrary/FortressBuiltin/AnyType) in scope, by the
# driver of explorations/reviews/sum-replacement-judgement/check.sh (CheckDriver.java, the
# checker-count tool's WorldFlip plus -stop) with the fill worker's shadow StaticChecker
# (-Dprobe.dropApiErrors: the library api's own errors are dropped so the probe is checked).
# Both sources are compiled from the tree read-only into work/checkdrv. Private cache.
#   check.sh <Name>   -> <Name>.check.txt (the probe's own lines and the tallies)
D="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source /home/user/fortress/explorations/experiment/env.sh
N=$1
R=$FORTRESS_HOME/explorations/reviews
C="$D/work/cache-check-$N"
rm -rf "$C"; mkdir -p "$C" "$D/work/checkdrv"
CP=$("$FORTRESS_HOME/bin/fortress_classpath" | tail -1)
test -f "$D/work/checkdrv/CheckDriver.class" || javac -nowarn -cp "$CP" -d "$D/work/checkdrv" \
   "$R/sum-replacement-judgement/CheckDriver.java" \
   "$R/fill-overloads-ways/shadow-src/com/sun/fortress/compiler/StaticChecker.java" || exit 1
LIB="$FORTRESS_HOME/Library"; LB="$FORTRESS_HOME/ProjectFortress/LibraryBuiltin"
FULL="$D/work/check-$N.full.txt"
cd "$D"
timeout -k 10 900 java $JAVA_FLAGS -Dfortress.caches="$C" \
  "-Dfortress.source.path=;.;$LB;$LIB;$FORTRESS_HOME/ProjectFortress/test_library" \
  -Dprobe.dropApiErrors=1 -cp "$D/work/checkdrv:$CP" CheckDriver -stop typecheck "$N.fss" > "$FULL" 2>&1
RC=$?
{
  echo "# check.sh $N $(date -u +%FT%TZ); tree $(git -C "$FORTRESS_HOME" rev-parse --short HEAD); nproc=$(nproc); load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | grep -m1 version); rc=$RC"
  echo "# api errors dropped (probe.dropApiErrors): $(grep '^@@PROBE checkApi .* -> errors=' "$FULL" | sed -E 's/^@@PROBE checkApi ([^ ]+) -> errors=([0-9]+)$/\1=\2/' | sort -u | tr '\n' ' ')"
  echo "# the probe component's own error lines (with 4 lines of context each):"
  grep -n -A4 "^$D/$N.fss:" "$FULL" | sed "s|$D/||g; s|$FORTRESS_HOME/||g" | cut -c1-600
  echo "# tallies:"; grep -E "has [0-9]+ errors?\.|### rc=|Exception|^Error" "$FULL" | grep -v "^@@" | head -8
} > "$N.check.txt"
rm -rf "$C"
cat "$N.check.txt"
