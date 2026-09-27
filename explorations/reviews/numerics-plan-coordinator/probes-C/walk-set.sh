#!/bin/bash
# walk-set.sh <lib-name> : FlatTowerRungF and the six range tests of measure-C under walk with one library copy, one after another
OUT=/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/coordinator-plan/probes-C
for t in FlatTowerRungF RangeTest subArray StringTests array3test RandomTest rangeOperators RangePrototype; do $OUT/walk.sh $1 $t; done
