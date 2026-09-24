#!/bin/bash
# Take the two microGPT programs through `fortress compile` in dependency order,
# in the same private cache as the ladder, and record the phase each component reaches.
set -u
source /home/user/fortress/explorations/experiment/env.sh
SP=/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad
export LADDER_CACHES=$SP/measure/caches
export FORTRESS_CACHES=$LADDER_CACHES
export LADDER_TMP=$SP/measure/ladder-tmp
export JAVA_FLAGS="-Xmx2g -Xss64m -Dfortress.caches=$LADDER_CACHES -Djava.io.tmpdir=$LADDER_TMP"
RAW=/home/user/fortress/explorations/compile-ladder/baseline-2026-09-19/raw/microgpt
mkdir -p "$RAW"
TSV=$SP/measure/microgpt-results.tsv
: > "$TSV"
TIMEOUT=300

one () {  # dir file
  local dir="$1" f="$2" t0 t1 rc
  cd "/home/user/fortress/$dir" || exit 1
  t0=$(date +%s)
  timeout -k 5 $TIMEOUT ../../../bin/fortress compile "$f" > "$RAW/$f.compile" 2>&1
  rc=$?
  t1=$(date +%s)
  printf '%s\t%s\t%s\t%s\n' "$dir" "$f" "$rc" "$((t1-t0))" >> "$TSV"
  echo "$dir/$f rc=$rc $((t1-t0))s"
  rm -rf "${LADDER_TMP:?}"/fortress*rats
}

for f in FlatArrays.fsi FlatArrays.fss FlatData.fsi FlatData.fss \
         MicroGptFlat.fsi MicroGptFlat.fss MicroGptFlatCheck.fss ; do
  one explorations/run-c4/src "$f"
done
for f in AplMgSyntax.fsi AplMgSyntax.fss FlatArrays2.fsi FlatArrays2.fss \
         AplMg.fsi AplMg.fss FlatData2.fsi FlatData2.fss \
         MicroGptApl.fsi MicroGptApl.fss MicroGptAplCheck.fss ; do
  one explorations/apl/mg "$f"
done
echo "=== microgpt phase run done $(date -Is) ==="
