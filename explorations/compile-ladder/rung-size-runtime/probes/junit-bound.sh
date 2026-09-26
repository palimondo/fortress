#!/bin/bash
# The expected failures this rung adds: a dispatched arm whose static parameter has a generic bound
# (sized: XXXNatBoundDisp; type: TypeBoundDispLink + XXXTypeBoundDisp, sharing the cache as in the suite),
# and a sized object extending a size symbol's and a literal's instantiation of one generic
# (NatExtendsTwiceLink + XXXNatExtendsTwice, sharing the cache as in the suite).
source /home/user/fortress-size/explorations/compile-ladder/rung-size-runtime/probes/common.sh
machine
junit1 XXXNatBoundDisp
pair2 () {
  clean $2
  for t in $1 $2; do
    echo "########## junit compiler_tests/$t.test"
    (cd $FH/ProjectFortress && timeout 500 ../bin/fortress junit compiler_tests/$t.test 2>&1 | filt; echo "exit=${PIPESTATUS[0]}")
  done
  clean $2
}
pair2 TypeBoundDispLink XXXTypeBoundDisp
pair2 NatExtendsTwiceLink XXXNatExtendsTwice
