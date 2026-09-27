#!/bin/bash
# The four distance runs of measure-D: distance-triage/run.sh's step `stage` (DistanceMulti, the twelve
# prelude components in one JVM, every stage and declaration, overload memo off) over the unchanged
# library copy L0, under walk's setting and under the setting `any` (batch 7 Q1 (a)), with the tree's
# checker (TAG=stock) and with the shadow classes-fix ahead of it (EXTRA_CP, TAG=fix).
W=/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/coordinator-plan/probes-D/work-dist
R=/home/user/fortress/explorations/perf-probes/prelude/distance-triage/run.sh
( TAG=stock bash $R $W stage L0 walk ) > $W/launch-stock-walk.txt 2>&1 &
( TAG=stock bash $R $W stage L0 any  ) > $W/launch-stock-any.txt 2>&1 &
( TAG=fix EXTRA_CP=/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/coordinator-plan/probes-D/classes-fix bash $R $W stage L0 walk ) > $W/launch-fix-walk.txt 2>&1 &
( TAG=fix EXTRA_CP=/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/coordinator-plan/probes-D/classes-fix bash $R $W stage L0 any  ) > $W/launch-fix-any.txt 2>&1 &
wait
echo all-done
