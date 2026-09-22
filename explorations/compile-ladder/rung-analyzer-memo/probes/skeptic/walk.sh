#!/bin/bash
# usage: walk.sh ; runs every skeptic probe under the interpreter at 1 and 4 threads
cd /home/user/fortress-memo/explorations/compile-ladder/rung-analyzer-memo/probes/skeptic
for p in ${PROBES:-SkMemoTower SkMemoAmbig SkMemoCycle SkMemoObjExcl SkMemoSpan} ; do
  for t in 1 4 ; do
    echo "=== walk $p FORTRESS_THREADS=$t"
    FORTRESS_THREADS=$t timeout 300 ../../../../../bin/fortress $p.fss 2>&1 | sed -E 's/[0-9]+(\.[0-9]+)? ?(ms|s|sec|seconds)\b/<t>/g'
    echo "rc=${PIPESTATUS[0]}"
  done
done
