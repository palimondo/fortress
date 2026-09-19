#!/bin/bash
# Cold-cache reproduction for the C4 overload finding. Read-only in the tree;
# every run uses a private, freshly created cache directory.
set -u
source /home/user/fortress/experiment/env.sh
OUT=/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/cold-cache
TMPD=$OUT/tmp; mkdir -p "$TMPD"

run() {  # run <cachedir> <workdir> <file> <outfile> <timeout>
  local C=$1 W=$2 F=$3 O=$4 T=$5
  export FORTRESS_CACHES=$C
  ( cd "$W" && timeout "$T" env JAVA_FLAGS="-Xmx4g -Xss64m -Dfortress.caches=$C -Djava.io.tmpdir=$TMPD" \
      /home/user/fortress/bin/fortress "$F" > "$O" 2>&1 )
  echo "rc=$? file=$F cache=$C out=$O $(date -Is)"
  rm -rf "${TMPD:?}"/fortress*rats
}

echo "=== EXP1 C4 check, cold cache  $(date -Is) ==="
rm -rf "$OUT/caches1"; mkdir -p "$OUT/caches1"
run "$OUT/caches1" /home/user/fortress/explorations/run-c4/src MicroGptFlatCheck.fss "$OUT/exp1-run1.txt" 900
ls -R "$OUT/caches1/interpreter_cache" > "$OUT/exp1-cache-after-run1.txt" 2>&1
run "$OUT/caches1" /home/user/fortress/explorations/run-c4/src MicroGptFlatCheck.fss "$OUT/exp1-run2.txt" 1800

echo "=== EXP2 MicroGptFlat model as component, cold cache  $(date -Is) ==="
rm -rf "$OUT/caches2"; mkdir -p "$OUT/caches2"
run "$OUT/caches2" /home/user/fortress/explorations/run-c4/src MicroGptFlat.fss "$OUT/exp2-run1.txt" 900
ls -R "$OUT/caches2/interpreter_cache" > "$OUT/exp2-cache-after-run1.txt" 2>&1
run "$OUT/caches2" /home/user/fortress/explorations/run-c4/src MicroGptFlat.fss "$OUT/exp2-run2.txt" 240

echo "=== EXP3 apl/mg check, cold cache  $(date -Is) ==="
rm -rf "$OUT/caches3"; mkdir -p "$OUT/caches3"
run "$OUT/caches3" /home/user/fortress/explorations/apl/mg MicroGptAplCheck.fss "$OUT/exp3-run1.txt" 900
ls -R "$OUT/caches3/interpreter_cache" > "$OUT/exp3-cache-after-run1.txt" 2>&1
run "$OUT/caches3" /home/user/fortress/explorations/apl/mg MicroGptAplCheck.fss "$OUT/exp3-run2.txt" 300
echo "=== done $(date -Is) ==="
