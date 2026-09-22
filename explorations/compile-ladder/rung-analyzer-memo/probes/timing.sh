#!/bin/bash
# The whole-library check (the gate's checker-count stage) timed with the clauses memo on and off,
# alternating, from $FORTRESS_HOME with experiment/env.sh sourced after ant compileAll.
# The switch is read through ProjectProperties' environment fallback: fortress.analyzer.clauses.cache
# is FORTRESS_ANALYZER_CLAUSES_CACHE (StringMap.java:120-125).
# usage: timing.sh <scratch-dir> [reps, default 3]
S=${1:?scratch dir}; N=${2:-3}
T=explorations/coordinator/tools/checker-count/run.sh
for i in $(seq 1 $N); do
  for mode in off on; do
    v=true; [ $mode = off ] && v=false
    load=$(cut -d' ' -f1 /proc/loadavg)
    s=$(date +%s.%N)
    FORTRESS_ANALYZER_CLAUSES_CACHE=$v $T $S/table-$mode-$i.txt $S/scratch-$mode-$i > /dev/null 2>&1; rc=$?
    e=$(date +%s.%N)
    total=$(grep '^#total' $S/table-$mode-$i.txt | cut -f2)
    same=$(cmp -s $S/table-$mode-$i.txt explorations/compile-ladder/rung-analyzer-memo/probes/checker-count-preedit.txt && echo same-as-preedit || echo DIFFERS-from-preedit)
    printf 'rep %s\tmemo %s\t%.1f s\tload1 %s\trc %s\t#total %s\t%s\n' $i $mode "$(echo "$e - $s" | bc)" $load $rc "$total" "$same"
  done
done
