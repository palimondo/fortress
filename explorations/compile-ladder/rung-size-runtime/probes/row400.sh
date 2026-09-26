#!/bin/bash
# Row 400 re-measured on the final build: rung N's skeptic's SkDeadTop and SkDeadVal and its repair round's
# DeadValWritten, compiled and run (stack frames outside java.base kept), then walk.
source /home/user/fortress-size/explorations/compile-ladder/rung-size-runtime/probes/common.sh
N=$FH/explorations/compile-ladder/rung-nat-checker/probes
machine
for f in $N/skeptic/SkDeadTop $N/skeptic/SkDeadVal $N/DeadValWritten; do
  c=$(basename $f); clean $c
  echo "########## fortress compile ${f#$FH/}.fss"
  (cd $(dirname $f) && timeout 300 $FH/bin/fortress compile $f.fss 2>&1 | sed "s#$FH/##g" | head -12; echo "exit=${PIPESTATUS[0]}")
  echo "########## fortress run $c"
  (cd $(dirname $f) && timeout 120 $FH/bin/fortress run $c 2>&1 | sed "s#$FH/##g" | grep -v 'java\.base' | head -24; echo "exit=${PIPESTATUS[0]}")
  echo "########## walk ${f#$FH/}.fss"
  (cd $(dirname $f) && timeout 120 $FH/bin/fortress $f.fss 2>&1 | sed "s#$FH/##g" | grep -v '^\s*at ' | head -8; echo "exit=${PIPESTATUS[0]}")
  clean $c
done
