#!/bin/bash
# The rung's .test files through the harness, one JVM each, on whatever build is in ProjectFortress/build:
# the fifteen run-time tests, the three row-402 tests, and the three expected failures rung N left (under their
# names of the moment).  usage: junit-tests.sh [promoted|before] [all|pair|"<names>"]
source /home/user/fortress-size/explorations/compile-ladder/rung-size-runtime/probes/common.sh
NEW="NatRtUnbox NatRtOver NatRtExtends1 NatRtExtends2 NatRtVec NatRtGetter NatRtCase NatRtCaseGen NatRtDisp NatRtDispTrait NatRtDispSize NatRtDispLit NatRtDot NatRtExtLit NatRtMethSym"
R402="XXXNatExcludeChecker NatExcludeOverload XXXNatAmbigChecker"
if [ "${1:-}" = promoted ]; then
  ARG=NatArgRungS; RUNGN="NatDispArmChecker NatOverrideChecker"
else
  ARG=XXXNatArgRungS; RUNGN="XXXNatDispArmChecker XXXNatOverrideChecker"
fi
# the link half and the run half of the written-out size share the cache, as they do in the suite
pair () {
  clean $ARG
  for t in NatArgRungSLink $ARG; do
    echo "########## junit compiler_tests/$t.test"
    (cd $FH/ProjectFortress && timeout 500 ../bin/fortress junit compiler_tests/$t.test 2>&1 | filt; echo "exit=${PIPESTATUS[0]}")
  done
}
machine
case "${2:-all}" in
  all)  for t in $NEW $R402 $RUNGN; do junit1 $t; done; pair ;;
  pair) pair ;;
  *)    for t in $2; do junit1 $t; done ;;
esac
