#!/bin/bash
# the skeptic's re-run of the rung's ten tests and the size regression tests through the harness, each .test in its own JVM
cd /home/user/fortress-nat/ProjectFortress
MINE="NatInferredChecker NatWrittenChecker NatMethodChecker XXXNatDispArmChecker XXXNatOverrideChecker XXXNatDispRTRChecker XXXNatRetSizeChecker XXXNatMismatchChecker XXXNatArithChecker XXXNatBoolChecker"
REG="AfterTypeChecking XXX1p XXX5z Compiled12.invariantInference NatArgRungSLink XXXNatArgRungS"
for t in $MINE XXXNatArgRungS; do find ../default_repository/caches -name "*$t*" -exec rm -rf {} + 2>/dev/null; done
for t in $MINE $REG; do
  echo "########## fortress junit compiler_tests/$t.test"
  ../bin/fortress junit compiler_tests/$t.test 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at '
  echo "exit=${PIPESTATUS[0]}"
done
