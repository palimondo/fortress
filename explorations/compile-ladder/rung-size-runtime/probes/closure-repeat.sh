#!/bin/bash
# NatRtClosure compiled once, then run compiled N times at FORTRESS_THREADS=4 and =1: does the first load of its
# instantiated closure classes race (F3)?  usage: closure-repeat.sh [N]
source /home/user/fortress-size/explorations/compile-ladder/rung-size-runtime/probes/common.sh
N=${1:-10}
CT=$FH/ProjectFortress/compiler_tests
machine
clean NatRtClosure
(cd $CT && timeout 300 $FH/bin/fortress compile NatRtClosure.fss 2>&1 | filt | head; echo "compile exit=${PIPESTATUS[0]}")
for th in 4 1; do
  pass=0
  for i in $(seq 1 $N); do
    out=$(cd $CT && FORTRESS_THREADS=$th timeout 120 $FH/bin/fortress run NatRtClosure 2>&1 | filt)
    if [ "$out" = "PASS" ]; then pass=$((pass+1)); else echo "run $i at FORTRESS_THREADS=$th:"; echo "$out" | head -6; fi
  done
  echo "FORTRESS_THREADS=$th: $pass of $N runs print exactly PASS"
done
clean NatRtClosure
