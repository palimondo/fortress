#!/bin/bash
# The rung's tests through the harness as the suite runs them (one .test file per JVM), on the build in ProjectFortress/build.
source /home/user/fortress-genrt/explorations/compile-ladder/rung-generic-runtime/probes/common.sh
machine
for t in "$@"; do
  d=${t%%/*}; n=${t#*/}
  junit1 $d $n
done
