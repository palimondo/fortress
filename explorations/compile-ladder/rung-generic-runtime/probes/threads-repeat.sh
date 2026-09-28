#!/bin/bash
# threads-repeat.sh <dir> <component> [runs]: compile once, then <runs> compiled runs at FORTRESS_THREADS=1 and at 4,
# one line per run: exit code and the output's lines joined by '|' (stack frames dropped).
source /home/user/fortress-genrt/explorations/compile-ladder/rung-generic-runtime/probes/common.sh
d=$1; c=$2; n=${3:-5}
machine
clean $c
echo "################################ $c.fss, $n compiled runs at each thread count"
(cd $d && timeout 300 $FH/bin/fortress compile $c.fss > /dev/null 2>&1; echo "compile exit=$?")
for th in 1 4; do
  for i in $(seq 1 $n); do
    out=$(cd $d && FORTRESS_THREADS=$th timeout -k 5 120 $FH/bin/fortress run $c 2>&1); rc=$?
    echo "FORTRESS_THREADS=$th run $i exit=$rc: $(echo "$out" | filt | grep -v '^\s*\.\.\.' | head -4 | tr '\n' '|' | cut -c1-400)"
  done
done
clean $c
