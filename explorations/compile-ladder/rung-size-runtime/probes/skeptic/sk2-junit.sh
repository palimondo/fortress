#!/bin/bash
# Second judgement: the skeptic's own harness run of every .test file the rung adds or promotes, one JVM each,
# and RTTIsizeJUTest, on the repair build (5e030a07d, rebuilt from clean caches); common.sh is the worker's shell setup.
source /home/user/fortress-size/explorations/compile-ladder/rung-size-runtime/probes/common.sh
machine
echo "# build: $(git -C $FH log -1 --format=%h); source edits in the working tree: [$(git -C $FH status --short -- ProjectFortress/src | tr '\n' ' ')]"
for t in NatRtClosure NatRtBigSize \
         NatRtUnbox NatRtOver NatRtExtends1 NatRtExtends2 NatRtVec NatRtGetter NatRtCase NatRtCaseGen NatRtDisp \
         NatRtDispTrait NatRtDispSize NatRtDispLit NatRtDot NatRtExtLit NatRtMethSym \
         NatExcludeOverload XXXNatExcludeChecker XXXNatAmbigChecker \
         NatDispArmChecker NatOverrideChecker XXXNatBoundDisp ; do
  junit1 $t
done
for pr in "NatRtTaskLink XXXNatRtTask" "NatRtMethBothLink XXXNatRtMethBoth" "NatArgRungSLink NatArgRungS" "TypeBoundDispLink XXXTypeBoundDisp" "NatExtendsTwiceLink XXXNatExtendsTwice"; do
  set -- $pr
  clean $2
  for t in $1 $2; do
    echo "########## junit compiler_tests/$t.test"
    (cd $FH/ProjectFortress && timeout 500 ../bin/fortress junit compiler_tests/$t.test 2>&1 | filt; echo "exit=${PIPESTATUS[0]}")
  done
  clean $2
done
echo "########## RTTIsizeJUTest"
(cd $FH/ProjectFortress && java -cp "$CP" junit.textui.TestRunner com.sun.fortress.compiler.runtimeValues.RTTIsizeJUTest 2>&1 | tail -5)
