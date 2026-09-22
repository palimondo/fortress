#!/bin/bash
# controls.sh <home> <out-dir>: run the 13 walk controls with FORTRESS_HOME=FORTRESS_AUTOHOME=<home>
# Pre-edit: controls.sh <prehome> <out>; post-edit: controls.sh <worktree> <out>. Captures are committed with absolute paths replaced by FH / FH-pre.
H=$1; OUT=$2; mkdir -p $OUT
export FORTRESS_HOME=$H FORTRESS_AUTOHOME=$H
for t in ArrayListQuick PureListQuick CovariantTest StringTests Generator2Test ArrayScalarExtension RationalTest RangeTest rangeOperators OpenRangeCase maybeTest conditionalGenerator LongStringTests; do
  ( cd /home/user/fortress-defects/ProjectFortress/tests && timeout 600 $H/bin/fortress $t.fss ) > $OUT/$t.txt 2>&1
  echo "EXIT=$?" >> $OUT/$t.txt
done
