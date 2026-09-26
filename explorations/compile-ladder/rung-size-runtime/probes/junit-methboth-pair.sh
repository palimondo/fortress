#!/bin/bash
# The generic-method expected failure through the harness as the suite runs it: the link half, then the run half, sharing the cache.
source /home/user/fortress-size/explorations/compile-ladder/rung-size-runtime/probes/common.sh
machine
echo "# build: $(git -C $FH log -1 --format=%h) plus the working tree's source edits, if any: $(git -C $FH status --short -- ProjectFortress/src | tr '\n' ' ')"
clean XXXNatRtMethBoth
for t in NatRtMethBothLink XXXNatRtMethBoth; do
  echo "########## junit compiler_tests/$t.test"
  (cd $FH/ProjectFortress && timeout 500 ../bin/fortress junit compiler_tests/$t.test 2>&1 | filt; echo "exit=${PIPESTATUS[0]}")
done
clean XXXNatRtMethBoth
