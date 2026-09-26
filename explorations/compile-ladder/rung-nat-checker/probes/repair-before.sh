#!/bin/bash
# the repair round's two new tests on the unedited checker: tmp/base-classes (the rung's eleven edited sources taken
# from 47437c65f and compiled, the before-shadow of probes/junit-before-final.txt) first on the classpath
source /home/user/fortress-nat/explorations/compile-ladder/rung-nat-checker/probes/repair-common.sh
machine
for t in NatExportChecker XXXNatLitArgChecker; do junit_with $FH/tmp/base-classes $t; done
