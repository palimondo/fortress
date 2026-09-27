#!/bin/bash
# walk-xxx.sh <lib-name> : the three interpreter tests whose ranges are over ZZ64 or NN32 (question 3), under walk with one copy
OUT=/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/coordinator-plan/probes-C
for t in XXXRangeBoundsRungO XXXRangeSizeZZ64RungO XXXSeqRangeTopRungO; do $OUT/walk.sh $1 $t; done
