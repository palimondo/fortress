#!/bin/bash
# The regression set the batch record names for this rung ("What must stay green, or keep its verdict"),
# each .test through the harness in its own JVM; the operator-parameter pair shares its cache as in the suite.
source /home/user/fortress-size/explorations/compile-ladder/rung-size-runtime/probes/common.sh
REG="AfterTypeChecking XXX1p XXX5z Compiled12.invariantInference NatInferredChecker NatWrittenChecker NatMethodChecker NatExportChecker XXXNatMismatchChecker XXXNatArithChecker XXXNatBoolChecker XXXNatLitArgChecker XXXNatRetSizeChecker XXXNatDispRTRChecker"
machine
clean Compiled1 Compiled5 Compiled6 Compiled12
for t in $REG; do junit1 $t; done
clean XXXOprParamRungS
for t in OprParamRungSLink XXXOprParamRungS; do
  echo "########## junit compiler_tests/$t.test"
  (cd $FH/ProjectFortress && timeout 500 ../bin/fortress junit compiler_tests/$t.test 2>&1 | filt; echo "exit=${PIPESTATUS[0]}")
done
