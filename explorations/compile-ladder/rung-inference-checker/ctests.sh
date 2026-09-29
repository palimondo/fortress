#!/bin/bash
# ctests.sh <label> <build-dir> : measurement D's method (explorations/reviews/numerics-plan-coordinator/probes-D/ctests/:
# TestsD, `fortress typecheck`'s setting, the compiler's own library, typecheckPhaseOrder) over the .fss files
# the gate's compiler tests compile or link (gate-list.py over this tree's compiler_tests), all in one JVM with
# one private cache, with <build-dir> ahead of the third-party jars. -> probes/ctests/typecheck-<label>.txt
set -u
W=/home/user/fortress-infer; R=$W/explorations/compile-ladder/rung-inference-checker; PD=$W/explorations/reviews/numerics-plan-coordinator/probes-D/ctests
L=$1; B=$2; mkdir -p "$R/probes/ctests"
TP=$($W/bin/fortress_classpath 2>/dev/null | tail -1 | tr ':' '\n' | grep '/third_party/' | paste -sd:)
python3 "$PD/gate-list.py" "$W/ProjectFortress/compiler_tests" 2> "$R/probes/ctests/gate-list.counts.txt" > "$R/probes/ctests/gate-list.txt"
C=$W/tmp/ctests-cache-$L; rm -rf "$C"; mkdir -p "$C/tmp"
OUT=$R/probes/ctests/typecheck-$L.txt
cd "$W/ProjectFortress/compiler_tests"
{ echo "# ctests.sh $L $(date -u +%FT%TZ); tree $(git -C $W rev-parse --short HEAD) with its working changes; build $B; nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/.*: //') MHz; load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS; files $(wc -l < "$R/probes/ctests/gate-list.txt")"
  S=$(date +%s)
  FORTRESS_AUTOHOME=$W timeout -k 30 5400 java -Xmx4g -Xss64m -Dfortress.caches="$C" -Djava.io.tmpdir="$C/tmp" \
    "-Dfortress.source.path=;.;$W/ProjectFortress/LibraryBuiltin;$W/Library;$W/ProjectFortress/test_library" \
    -cp "$B:$W/tmp/drv:$TP" TestsD $(cat "$R/probes/ctests/gate-list.txt") 2>&1 | sed "s#$W/##g"
  echo "exit=${PIPESTATUS[0]}"; echo "ELAPSED $(( $(date +%s) - S )) s"; } > "$OUT" 2>&1
rm -rf "$C"
echo "done $L: $(grep -c '^=== ' "$OUT") files, $(grep -c '^### THROWN' "$OUT") thrown, $(grep ELAPSED "$OUT")"
