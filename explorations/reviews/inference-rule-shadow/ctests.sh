#!/bin/bash
# ctests.sh <stock|rule> : the compiler's type checker over the .fss files the gate's compiler tests
# compile or link (measure-D's method: probes-D/ctests/TestsD.java, `fortress typecheck`'s setting,
# the compiler's own library, typecheckPhaseOrder, all files in one JVM with one private cache),
# run from the snapshot's compiler_tests. The list is gate-list.py's over the snapshot, with the one
# path that leaves ProjectFortress/ (../../Library/CompilerLibrary.fss) respelled for the snapshot's
# layout (../Library/). -> ctests/typecheck-<variant>.txt
set -u
source "$(dirname "${BASH_SOURCE[0]}")/env.sh"
V=$1; PD=$FORTRESS_HOME/explorations/reviews/numerics-plan-coordinator/probes-D/ctests
DRV=$X/drv; mkdir -p "$DRV" "$O/ctests"
test -f "$DRV/TestsD.class" || javac -nowarn -cp "$CP" -d "$DRV" "$PD/TestsD.java" || exit 1
python3 "$PD/gate-list.py" "$S/compiler_tests" 2> "$O/ctests/gate-list.counts.txt" | sed 's#^\.\./\.\./Library/#../Library/#' > "$O/ctests/gate-list.txt"
SH=""; [ "$V" != stock ] && SH="$X/classes-$V:"
C="$X/ctests-cache-$V"; rm -rf "$C"; mkdir -p "$C"
OUT="$O/ctests/typecheck-$V.txt"
cd "$S/compiler_tests"
{ echo "# ctests.sh $V $(date -u +%FT%TZ); tree $(git -C "$FORTRESS_HOME" rev-parse --short HEAD) (snapshot of $(sed -n 2p "$O/snapshot.txt" | cut -d' ' -f2)); $(machine_line); files $(wc -l < "$O/ctests/gate-list.txt")"
  B=$(date +%s)
  timeout -k 30 5400 java $JAVA_FLAGS -Dfortress.caches="$C" -Djava.io.tmpdir="$C" \
    "-Dfortress.source.path=;.;$S/LibraryBuiltin;$S/Library;$S/test_library" \
    -cp "$SH$DRV:$CP" TestsD $(cat "$O/ctests/gate-list.txt") 2>&1 | sed "s#$S/#<snap>/#g"
  echo "exit=${PIPESTATUS[0]}"; echo "ELAPSED $(( $(date +%s) - B )) s"; } > "$OUT" 2>&1
rm -rf "$C"
echo "done $V: $(grep -c '^=== ' "$OUT") files, $(grep -c '^### THROWN' "$OUT") thrown, $(grep ELAPSED "$OUT")"
