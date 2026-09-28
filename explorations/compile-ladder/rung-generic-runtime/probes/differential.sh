#!/bin/bash
# differential.sh <program-path-without-.fss>...: walk against the compiled run for each program, at
# FORTRESS_THREADS=1 and =4 (the manifest's writesState); each program compiled once, its own cache entries deleted first.
source /home/user/fortress-genrt/explorations/compile-ladder/rung-generic-runtime/probes/common.sh
machine
for f in "$@"; do
  c=$(basename $f); d=$(dirname $f)
  clean $c
  echo "################################ ${f#$FH/}.fss"
  (cd $d && timeout 300 $FH/bin/fortress compile $c.fss 2>&1 | filt | head -12; echo "compile exit=${PIPESTATUS[0]}")
  for th in 1 4; do
    echo "---------- compiled run, FORTRESS_THREADS=$th"
    (cd $d && FORTRESS_THREADS=$th timeout -k 5 120 $FH/bin/fortress run $c 2>&1 | filt | grep -v '^\s*\.\.\. [0-9]* more' | head -14; echo "exit=${PIPESTATUS[0]}")
  done
  for th in 1 4; do
    echo "---------- walk, FORTRESS_THREADS=$th"
    (cd $d && FORTRESS_THREADS=$th timeout -k 5 300 $FH/bin/fortress $c.fss 2>&1 | filt | grep -v '^\s*\.\.\. [0-9]* more' | head -14; echo "exit=${PIPESTATUS[0]}")
  done
  clean $c
done
