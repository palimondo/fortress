#!/bin/bash
# two-path.sh <prog.fss>...: each program under walk (flat library, and base library via shadow copies) at
# FORTRESS_THREADS=1 and 4, and on the compiled path (compile, then run at 1 and 4)
cd /home/user/fortress-flat
bash explorations/compile-ladder/rung-flat-tower/machine.sh "skeptic two-path" 2>&1 | grep -v JAVA_TOOL
for p in "$@"; do
  n=$(basename $p .fss)
  cp $p tmp/sk/flat/$n.fss; cp $p tmp/sk/base/$n.fss
  for t in 1 4; do
    echo "=== $n walk flat library FORTRESS_THREADS=$t"; tmp/sk/walk.sh $t tmp/sk/flat/$n.fss tmp/sk/cacheF | grep -v '^Picked up\|at com.sun\|^\s*at '
    echo "=== $n walk base library (e5414f5bf shadow) FORTRESS_THREADS=$t"; tmp/sk/walk.sh $t tmp/sk/base/$n.fss tmp/sk/cacheB | grep -v '^Picked up\|^\s*at '
  done
  mkdir -p tmp/sk/comp; cp $p tmp/sk/comp/$n.fss
  for t in 1 4; do
    echo "=== $n compiled path FORTRESS_THREADS=$t"; tmp/sk/comp.sh $t tmp/sk/comp/$n.fss | grep -v '^Picked up\|^\s*at '
  done
done
