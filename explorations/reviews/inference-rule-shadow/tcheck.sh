#!/bin/bash
# tcheck.sh <variant> <src-dir> <Name> <out-dir> : the compiler's type checker (TestsD, the compiler's
# own library) over one program with the trace on. <variant>: stock, instr, rule, rule-instr.
# -> <out-dir>/<Name>.<variant>.ctest.txt, in check.sh's form.
set -u
source "$(dirname "${BASH_SOURCE[0]}")/env.sh"
V=$1; SRC=$(cd "$2" && pwd); N=$3; mkdir -p "$4"; OUT=$(cd "$4" && pwd)
PD=$FORTRESS_HOME/explorations/reviews/numerics-plan-coordinator/probes-D/ctests
DRV=$X/drv; mkdir -p "$DRV"
test -f "$DRV/TestsD.class" || javac -nowarn -cp "$CP" -d "$DRV" "$PD/TestsD.java" || exit 1
SH=""; [ "$V" != stock ] && SH="$X/classes-$V:"
WD=$X/run/$N-$V-ctest; rm -rf "$WD"; mkdir -p "$WD/cache"; cp "$SRC/$N.fss" "$WD/"
cd "$WD"; B=$(date +%s); M=$(machine_line)
timeout -k 10 900 java $JAVA_FLAGS -Dfortress.caches="$WD/cache" -Djava.io.tmpdir="$WD/cache" -Dprobe.showInfer=true \
  "-Dfortress.source.path=;.;$S/LibraryBuiltin;$S/Library;$S/test_library" \
  -cp "$SH$DRV:$CP" TestsD "$N.fss" > "$WD/full.txt" 2>&1
RC=$?
{
  echo "# tcheck.sh $V $N $(date -u +%FT%TZ); tree $(git -C "$FORTRESS_HOME" rev-parse --short HEAD) (snapshot of $(sed -n 2p "$O/snapshot.txt" | cut -d' ' -f2)); $M; rc=$RC; $(( $(date +%s) - B )) s"
  echo "# the trace lines of the program's own file (@@PROBE-R):"
  grep "^@@PROBE-R" "$WD/full.txt" | grep "$N.fss" | sed "s|$WD/||g"
  echo "# the program's own error lines (with 3 lines of context each):"
  grep -n -A3 "^\($WD/\)\?$N.fss:" "$WD/full.txt" | sed "s|$WD/||g; s|$X|<X>|g; s|$FORTRESS_HOME/||g" | cut -c1-400
  echo "# tallies:"; grep -E "has [0-9]+ errors?\.|### rc=|### THROWN|Exception" "$WD/full.txt" | grep -v "^@@" | sed "s|$WD/||g" | head -8
} > "$OUT/$N.$V.ctest.txt"
rm -rf "$WD/cache"
