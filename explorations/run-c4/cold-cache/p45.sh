#!/bin/bash
set -u
source /home/user/fortress/experiment/env.sh
B=/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/cold-cache
for n in 4 5; do
  D=$B/p$n; C=$D/caches; T=$D/tmp; mkdir -p "$T"; rm -rf "$C"
  export FORTRESS_CACHES=$C
  ( cd "$D" && timeout 600 env JAVA_FLAGS="-Xmx2g -Xss64m -Dfortress.caches=$C -Djava.io.tmpdir=$T" \
      /home/user/fortress/bin/fortress MaxUser$n.fss > $D/run1.txt 2>&1 ); echo "p$n run1 rc=$?"
  rm -rf "${T:?}"/fortress*rats
done
echo done
