#!/bin/bash
# Walk against the compiled run for every program of the rung, at FORTRESS_THREADS=1 and =4
# (the manifest's writesState), on the build in ProjectFortress/build.  Each program is compiled once
# (its cache entries deleted first) and run at both thread counts; walk runs it at both.
source /home/user/fortress-size/explorations/compile-ladder/rung-size-runtime/probes/common.sh
CT=$FH/ProjectFortress/compiler_tests
P=$FH/explorations/compile-ladder/rung-size-runtime/probes
N=$FH/explorations/compile-ladder/rung-nat-checker/probes
PROGS="$CT/NatRtUnbox $CT/NatRtOver $CT/NatRtExtends1 $CT/NatRtExtends2 $CT/NatRtVec $CT/NatRtGetter
       $CT/NatRtCase $CT/NatRtCaseGen $CT/NatRtDisp $CT/NatRtDispTrait $CT/NatRtDispSize $CT/NatRtDispLit
       $CT/NatRtDot $CT/NatRtExtLit $CT/NatArgRungS $CT/NatDispArmChecker $CT/NatOverrideChecker
       $CT/NatExcludeOverload $CT/XXXNatExcludeChecker $P/JTypeDouble $P/SzTwoThreads $P/SzIntNeg
       $N/skeptic/SkDeadTop $N/skeptic/SkDeadVal $N/DeadValWritten"
[ -n "${1:-}" ] && PROGS="$1"
machine
for f in $PROGS; do
  c=$(basename $f)
  rel=${f#$FH/}
  clean $c
  echo "################################ $rel.fss"
  echo "---------- compile"
  (cd $(dirname $f) && timeout 300 $FH/bin/fortress compile $f.fss 2>&1 | filt | head -12; echo "exit=${PIPESTATUS[0]}")
  for th in 1 4; do
    echo "---------- compiled run, FORTRESS_THREADS=$th"
    (cd $(dirname $f) && FORTRESS_THREADS=$th timeout 120 $FH/bin/fortress run $c 2>&1 | filt | head -14; echo "exit=${PIPESTATUS[0]}")
  done
  for th in 1 4; do
    echo "---------- walk, FORTRESS_THREADS=$th"
    (cd $(dirname $f) && FORTRESS_THREADS=$th timeout 120 $FH/bin/fortress $f.fss 2>&1 | filt | head -14; echo "exit=${PIPESTATUS[0]}")
  done
  clean $c
done
