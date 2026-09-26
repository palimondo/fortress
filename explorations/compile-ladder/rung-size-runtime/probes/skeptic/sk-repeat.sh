#!/bin/bash
# sk-repeat.sh <name> <runs>: compile once, then run compiled <runs> times at FORTRESS_THREADS=1 and at 4, printing the
# first line of each run's output and its exit code.
source /home/user/fortress-size/explorations/compile-ladder/rung-size-runtime/probes/common.sh
D=$FH/explorations/compile-ladder/rung-size-runtime/probes/skeptic
c=$1; n=${2:-5}
machine
clean $c
echo "################################ $c.fss, $n compiled runs at each thread count"
(cd $D && timeout 300 $FH/bin/fortress compile $c.fss 2>&1 | filt | head -12; echo "compile exit=${PIPESTATUS[0]}")
for th in 1 4; do
  for i in $(seq 1 $n); do
    out=$(cd $D && FORTRESS_THREADS=$th timeout 120 $FH/bin/fortress run $c 2>&1); rc=$?
    echo "FORTRESS_THREADS=$th run $i exit=$rc: $(echo "$out" | grep -v '^\s*at ' | grep -m3 . | cut -c1-220 | tr '\n' '|')"
  done
done
clean $c
