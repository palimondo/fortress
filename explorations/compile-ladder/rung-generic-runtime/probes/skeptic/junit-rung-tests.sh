#!/bin/bash
# junit-rung-tests.sh: every .test file the rung adds or promotes, through the harness on the rung's build, one per
# JVM; the run lines and the summary kept (the harness exits 0 on failure too).
source /home/user/fortress-genrt/explorations/compile-ladder/rung-generic-runtime/probes/skeptic/sk.sh
machine
cd $FH/ProjectFortress
for t in compiler_tests/TypecaseBindRungG compiler_tests/CastBindRungG compiler_tests/ArrowClauseBindRungG compiler_tests/WitnessIdentityRungG compiler_tests/FirstLoadThreadsRungG compiler_tests/DispatchRenamedArmRungG compiler_tests/DispatchRenamedArmRungGLink compiler_tests/DispatchSwappedArmRungG compiler_tests/DispatchSwappedArmRungGLink compiler_tests/DispatchZZ32ArmRungG compiler_tests/DispatchZZ32ArmRungGLink compiler_tests/XXXDispatchMethodArmRungG compiler_tests/DispatchMethodArmRungGLink compiler_tests/NatRtTask compiler_tests/NatRtTaskLink compiler_tests/NatRtMethBoth compiler_tests/NatRtMethBothLink library_tests/ClauseBindingRungB library_tests/ClauseBindingRungBLink; do
  echo "########## $t.test"
  timeout 600 ../bin/fortress junit $t.test 2>&1 | sed "s#$FH/##g" | grep -E '^\. |OK \(|FAILURES|Tests run|expected failure|Did not see|^Caused by' | cut -c1-220
done
