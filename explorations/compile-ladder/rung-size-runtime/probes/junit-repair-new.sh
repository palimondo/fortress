#!/bin/bash
# The repair round's two tests through the harness, one JVM each, on whatever build is in ProjectFortress/build.
# usage: junit-repair-new.sh <NatRtClosure|NatRtBigSize|XXXNatRtBigSize|...>
source /home/user/fortress-size/explorations/compile-ladder/rung-size-runtime/probes/common.sh
machine
echo "# build: $(git -C $FH log -1 --format=%h) plus the working tree's source edits, if any: $(git -C $FH status --short -- ProjectFortress/src | tr '\n' ' ')"
for t in "$@"; do junit1 $t; done
