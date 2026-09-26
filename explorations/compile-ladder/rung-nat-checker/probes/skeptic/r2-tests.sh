#!/bin/bash
# second skeptic: the repair round's three gated changes through the harness on the landed build, then NatExportChecker
# with only ExportChecker.scala of 47437c65f first on the classpath (tmp/sk-export-base, built by run-export-ab.sh:8-12)
source /home/user/fortress-nat/explorations/compile-ladder/rung-nat-checker/probes/skeptic/r2-common.sh
machine
for t in NatExportChecker XXXNatArithChecker XXXNatLitArgChecker XXXNatOverrideChecker; do jt "" $t; done
jt $FH/tmp/sk-export-base NatExportChecker
