#!/bin/bash
# check.sh <variant> <setting> <lib> <src-dir> <Name> <out-dir>
#   The compiled checker over one small program against the one library (the interpreter's prelude),
#   measure-D's driver ProbeD (probes-D/ProbeD.java: CheckDriver's world switch, DistanceMulti's
#   -setting, the fill worker's shadow StaticChecker so that -Dprobe.dropApiErrors keeps the library
#   api's own errors out), with the trace on.
#   <variant>  stock (the snapshot's classes), instr, rule, rule-instr ($X/classes-<variant> ahead)
#   <setting>  walk | any | compile (DistanceMulti's)
#   <lib>      L0 (the snapshot's Library and LibraryBuiltin) | A0 (the numeral switch's copy,
#              $X/work-dist/libs/A0, distance-triage/run.sh lib A0)
#   -> <out-dir>/<Name>.<variant>.<setting>.<lib>.txt: its machine line, the trace lines of the
#      program's own file, the program's own error lines with 3 lines of context, the tallies.
set -u
source "$(dirname "${BASH_SOURCE[0]}")/env.sh"
V=$1; SET=$2; LIB=$3; SRC=$(cd "$4" && pwd); N=$5; mkdir -p "$6"; OUT=$(cd "$6" && pwd)
DRV=$X/drv; mkdir -p "$DRV"
test -f "$DRV/ProbeD.class" || javac -nowarn -cp "$CP" -d "$DRV" "$FORTRESS_HOME/explorations/reviews/numerics-plan-coordinator/probes-D/ProbeD.java" \
   "$FORTRESS_HOME/explorations/reviews/fill-overloads-ways/shadow-src/com/sun/fortress/compiler/StaticChecker.java" || exit 1
SH=""; [ "$V" != stock ] && SH="$X/classes-$V:"
case $LIB in L0) LP="$S/LibraryBuiltin;$S/Library";; A0) LP="$X/work-dist/libs/A0";; *) echo "lib?"; exit 1;; esac
WD=$X/run/$N-$V-$SET-$LIB; rm -rf "$WD"; mkdir -p "$WD/cache"; cp "$SRC/$N.fss" "$WD/"
FULL=$WD/full.txt
cd "$WD"; B=$(date +%s); M=$(machine_line)
timeout -k 10 900 java $JAVA_FLAGS -Dfortress.caches="$WD/cache" -Djava.io.tmpdir="$WD/cache" -Dprobe.showInfer=true \
  "-Dfortress.source.path=;.;$LP;$S/test_library" \
  -Dprobe.dropApiErrors=1 -cp "$SH$DRV:$CP" ProbeD -setting "$SET" "$N.fss" > "$FULL" 2>&1
RC=$?
{
  echo "# check.sh $V $SET $LIB $N $(date -u +%FT%TZ); tree $(git -C "$FORTRESS_HOME" rev-parse --short HEAD) (snapshot of $(sed -n 2p "$O/snapshot.txt" | cut -d' ' -f2)); $M; rc=$RC; $(( $(date +%s) - B )) s"
  echo "# the trace lines of the program's own file (@@PROBE-R):"
  grep "^@@PROBE-R" "$FULL" | grep "$N.fss" | sed "s|$WD/||g"
  echo "# the program's own error lines (with 3 lines of context each):"
  grep -n -A3 "^$WD/$N.fss:" "$FULL" | sed "s|$WD/||g; s|$X|<X>|g; s|$FORTRESS_HOME/||g" | cut -c1-400
  echo "# tallies:"; grep -E "has [0-9]+ errors?\.|### rc=|Exception|^Error" "$FULL" | grep -v "^@@" | sed "s|$WD/||g" | head -8
} > "$OUT/$N.$V.$SET.$LIB.txt"
rm -rf "$WD/cache"
