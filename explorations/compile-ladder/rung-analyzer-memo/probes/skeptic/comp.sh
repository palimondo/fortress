#!/bin/bash
# usage: comp.sh <on|off> ; compiles every skeptic probe with the clauses memo on or off into caches-<mode>, then runs each at 1 and 4 threads
mode=$1; v=true; [ $mode = off ] && v=false
export FORTRESS_CACHES=/home/user/fortress-memo/tmp/sk/caches-$mode
export FORTRESS_ANALYZER_CLAUSES_CACHE=$v
cd /home/user/fortress-memo/explorations/compile-ladder/rung-analyzer-memo/probes/skeptic
for p in ${PROBES:-SkMemoTower SkMemoAmbig SkMemoCycle SkMemoObjExcl SkMemoSpan} ; do
  echo "=== compile $p memo=$mode"
  timeout 300 ../../../../../bin/fortress compile $p.fss 2>&1
  echo "rc=$?"
  for t in 1 4 ; do
    echo "=== run $p memo=$mode FORTRESS_THREADS=$t"
    FORTRESS_THREADS=$t timeout 300 ../../../../../bin/fortress run $p 2>&1
    echo "rc=$?"
  done
done
