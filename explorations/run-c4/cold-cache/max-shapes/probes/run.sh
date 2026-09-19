#!/bin/bash
# Run every probe on its own fresh, private cache (read-only in the tree).
set -u
source /home/user/fortress/experiment/env.sh
P=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
TMPD=$P/tmp; mkdir -p "$TMPD"
for d in "$@"; do
  C=$P/$d/caches; rm -rf "$C"; mkdir -p "$C"
  U=$(ls $P/$d/User*.fss | head -1); U=$(basename "$U")
  t0=$(date +%s)
  ( cd "$P/$d" && FORTRESS_CACHES=$C timeout 300 env JAVA_FLAGS="-Xmx2g -Xss64m -Dfortress.caches=$C -Djava.io.tmpdir=$TMPD" \
      /home/user/fortress/bin/fortress "$U" > "$P/$d/run1.txt" 2>&1 ); rc=$?
  echo "$d cold rc=$rc $(( $(date +%s) - t0 ))s :: $(grep -m1 -E 'have parameters|has a parameter|ProgramError|Error|mr\[0,1\]' $P/$d/run1.txt | cut -c1-160)"
  rm -rf "${TMPD:?}"/fortress*rats
done
