#!/bin/bash
# check.sh <variant: stock|instr|fix90|fix> <setting: walk|any|compile> <Name>
#   -> small/<Name>.<variant>.<setting>.txt : the probe component's own error lines and the
#      @@PROBE-D trace lines (the expected type each call was given, the static arguments inferred).
# stock = the tree's classes alone (no trace); instr = the tree plus the trace; fix90/fix = the shadows.
set -u
D="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$D/env-D.sh"
V=$1; S=$2; N=$3
CP=$("$FORTRESS_HOME/bin/fortress_classpath" 2>/dev/null | tail -1 | sed 's#:[^:]*/default_repository/caches/bytecode_cache##')
mkdir -p "$D/drv"
test -f "$D/drv/ProbeD.class" || javac -nowarn -cp "$CP" -d "$D/drv" "$D/ProbeD.java" \
   "$FORTRESS_HOME/explorations/reviews/fill-overloads-ways/shadow-src/com/sun/fortress/compiler/StaticChecker.java" || exit 1
SH=""; [ "$V" != stock ] && SH="$D/classes-$V:"
C="$D/work/cache-$N-$V-$S"; rm -rf "$C"; mkdir -p "$C"
FULL="$D/work/full-$N.$V.$S.txt"
cd "$D/small"
timeout -k 10 900 java $JAVA_FLAGS -Dfortress.caches="$C" -Dprobe.showInfer=true \
  "-Dfortress.source.path=;.;$FORTRESS_HOME/ProjectFortress/LibraryBuiltin;$FORTRESS_HOME/Library;$FORTRESS_HOME/ProjectFortress/test_library" \
  -Dprobe.dropApiErrors=1 -cp "$SH$D/drv:$CP" ProbeD -setting "$S" "$N.fss" > "$FULL" 2>&1
RC=$?
{
  echo "# check.sh $V $S $N $(date -u +%FT%TZ); tree $(git -C "$FORTRESS_HOME" rev-parse --short HEAD); nproc=$(nproc); load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | grep -m1 version); FORTRESS_THREADS=$FORTRESS_THREADS; rc=$RC"
  echo "# the probe's trace lines (@@PROBE-D, from its own file only):"
  grep "^@@PROBE-D" "$FULL" | grep "$N.fss" | sed "s|$D/small/||g"
  echo "# the probe component's own error lines (with 3 lines of context each):"
  grep -n -A3 "^$D/small/$N.fss:" "$FULL" | sed "s|$D/small/||g; s|$FORTRESS_HOME/||g" | cut -c1-400
  echo "# tallies:"; grep -E "has [0-9]+ errors?\.|### rc=|Exception|^Error" "$FULL" | grep -v "^@@" | head -8
} > "$D/small/$N.$V.$S.txt"
rm -rf "$C"
