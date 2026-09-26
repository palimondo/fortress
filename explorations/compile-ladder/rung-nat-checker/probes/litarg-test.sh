#!/bin/bash
# XXXNatLitArgChecker.test through the harness on the landed build, then the same component's errors
# by fortress typecheck (to name each error), then the component under walk
source /home/user/fortress-nat/explorations/compile-ladder/rung-nat-checker/probes/repair-common.sh
machine
junit_with "" XXXNatLitArgChecker
clean XXXNatLitArgChecker
echo "########## fortress typecheck compiler_tests/XXXNatLitArgChecker.fss, the landed build"
(cd $FH/ProjectFortress/compiler_tests && timeout 500 ../../bin/fortress typecheck XXXNatLitArgChecker.fss 2>&1 | filt; echo "exit=${PIPESTATUS[0]}")
clean XXXNatLitArgChecker
echo "########## walk: fortress compiler_tests/XXXNatLitArgChecker.fss"
(cd $FH/ProjectFortress/compiler_tests && timeout 500 ../../bin/fortress XXXNatLitArgChecker.fss 2>&1 | filt; echo "exit=${PIPESTATUS[0]}")
clean XXXNatLitArgChecker
