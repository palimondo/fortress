#!/bin/bash
# The two expected failures this rung adds for a dispatched arm whose static parameter has a generic bound
# (sized: XXXNatBoundDisp; type: TypeBoundDispLink + XXXTypeBoundDisp, sharing the cache as in the suite).
source /home/user/fortress-size/explorations/compile-ladder/rung-size-runtime/probes/common.sh
machine
junit1 XXXNatBoundDisp
clean XXXTypeBoundDisp
for t in TypeBoundDispLink XXXTypeBoundDisp; do
  echo "########## junit compiler_tests/$t.test"
  (cd $FH/ProjectFortress && timeout 500 ../bin/fortress junit compiler_tests/$t.test 2>&1 | filt; echo "exit=${PIPESTATUS[0]}")
done
clean XXXTypeBoundDisp
