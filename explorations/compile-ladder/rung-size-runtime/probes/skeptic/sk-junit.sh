#!/bin/bash
# The skeptic's own run of the rung's gated .test files through the harness, one JVM each, and RTTIsizeJUTest,
# on the landing build in ProjectFortress/build (57dac1278); common.sh is the worker's shell setup.
source /home/user/fortress-size/explorations/compile-ladder/rung-size-runtime/probes/common.sh
machine
for t in NatRtUnbox NatRtOver NatRtExtends1 NatRtExtends2 NatRtVec NatRtGetter NatRtCase NatRtCaseGen NatRtDisp \
         NatRtDispTrait NatRtDispSize NatRtDispLit NatRtDot NatRtExtLit NatRtMethSym \
         NatExcludeOverload XXXNatExcludeChecker XXXNatAmbigChecker \
         NatDispArmChecker NatOverrideChecker XXXNatBoundDisp ; do
  junit1 $t
done
# pairs sharing a cache: link half then run half
for pr in "NatArgRungSLink NatArgRungS" "TypeBoundDispLink XXXTypeBoundDisp" "NatExtendsTwiceLink XXXNatExtendsTwice"; do
  set -- $pr
  clean $2
  for t in $1 $2; do
    echo "########## junit compiler_tests/$t.test"
    (cd $FH/ProjectFortress && timeout 500 ../bin/fortress junit compiler_tests/$t.test 2>&1 | filt; echo "exit=${PIPESTATUS[0]}")
  done
done
echo "########## RTTIsizeJUTest"
(cd $FH/ProjectFortress && java -cp "$CP" junit.textui.TestRunner com.sun.fortress.compiler.runtimeValues.RTTIsizeJUTest 2>&1 | tail -5)
