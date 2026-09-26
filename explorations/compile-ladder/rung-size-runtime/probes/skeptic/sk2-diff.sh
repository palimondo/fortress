#!/bin/bash
# The second judgement's differential: each probe compiled once (its cache entries deleted first), then the compiled run and walk,
# each at FORTRESS_THREADS=1 and =4, on the repair build (5e030a07d, rebuilt from clean caches).  usage: sk2-diff.sh "names"
source /home/user/fortress-size/explorations/compile-ladder/rung-size-runtime/probes/common.sh
D=$FH/explorations/compile-ladder/rung-size-runtime/probes/skeptic
PROGS="${1:-$(cd $D && ls Zt*.fss | sed 's/\.fss$//')}"
machine; echo "# build: $(git -C $FH log -1 --format=%h); source edits in the working tree: [$(git -C $FH status --short -- ProjectFortress/src | tr "\n" " ")]"
for c in $PROGS; do
  clean $c
  echo "################################ $c.fss"
  echo "---------- compile"
  (cd $D && timeout 300 $FH/bin/fortress compile $c.fss 2>&1 | filt | head -12; echo "exit=${PIPESTATUS[0]}")
  for th in 1 4; do
    echo "---------- compiled run, FORTRESS_THREADS=$th"
    (cd $D && FORTRESS_THREADS=$th timeout 120 $FH/bin/fortress run $c 2>&1 | filt | head -14; echo "exit=${PIPESTATUS[0]}")
  done
  for th in 1 4; do
    echo "---------- walk, FORTRESS_THREADS=$th"
    (cd $D && FORTRESS_THREADS=$th timeout 120 $FH/bin/fortress $c.fss 2>&1 | filt | head -14; echo "exit=${PIPESTATUS[0]}")
  done
  clean $c
done
