#!/bin/bash
# NatExportChecker.test with ExportChecker.scala of 47437c65f first on the classpath (tmp/sk-export-base,
# built by probes/skeptic/run-export-ab.sh:8-12), then on the landed build
source /home/user/fortress-nat/explorations/compile-ladder/rung-nat-checker/probes/repair-common.sh
machine
echo "# tmp/sk-export-base holds: $(cd $FH/tmp/sk-export-base && find . -name '*.class' | sort | tr '\n' ' ')"
junit_with $FH/tmp/sk-export-base NatExportChecker
junit_with "" NatExportChecker
