#!/bin/bash
# the repair round's re-run: the rung's twelve .test files through the harness, each in its own JVM with its cache
# entries deleted before and after (probes/skeptic/junit-rerun.sh:4 with NatExportChecker and XXXNatLitArgChecker added);
# then the size regression tests of probes/skeptic/junit-rerun.sh:5, in that order, NatArgRungSLink's link feeding XXXNatArgRungS's run
source /home/user/fortress-nat/explorations/compile-ladder/rung-nat-checker/probes/repair-common.sh
MINE="NatInferredChecker NatWrittenChecker NatMethodChecker NatExportChecker XXXNatDispArmChecker XXXNatOverrideChecker XXXNatDispRTRChecker XXXNatRetSizeChecker XXXNatMismatchChecker XXXNatArithChecker XXXNatBoolChecker XXXNatLitArgChecker"
REG="AfterTypeChecking XXX1p XXX5z Compiled12.invariantInference NatArgRungSLink XXXNatArgRungS"
machine
for t in $MINE; do junit_with "" $t; done
clean XXXNatArgRungS NatArgRungS
for t in $REG; do
  echo "########## junit compiler_tests/$t.test, the landed build (regression)"
  (cd $FH/ProjectFortress && timeout 500 ../bin/fortress junit compiler_tests/$t.test 2>&1 | filt; echo "exit=${PIPESTATUS[0]}")
done
clean XXXNatArgRungS NatArgRungS
