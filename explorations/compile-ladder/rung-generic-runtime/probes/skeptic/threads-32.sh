#!/bin/bash
# threads-32.sh: SkFirstLoad32 (32 instantiations, three first-load routes), compiled once on the rung's tree, run
# 5 times at FORTRESS_THREADS=4 with the rung's loader and 5 with the base's loader alone (a loader-only shadow),
# then twice at FORTRESS_THREADS=1 with each; the elapsed wall-clock milliseconds on each line.
source /home/user/fortress-genrt/explorations/compile-ladder/rung-generic-runtime/probes/skeptic/sk.sh
L=$FH/tmp/sk-shadow-loader
machine
comp rung $SK SkFirstLoad32
for th in 4 1; do
  n=5; [ $th = 1 ] && n=2
  for mode in rung base; do
    cp="$RCP"; [ $mode = base ] && cp="$L:$RCP"
    for i in $(seq 1 $n); do
      t0=$(date +%s%N)
      out=$(cd $SK && FORTRESS_THREADS=$th timeout -k 5 120 java $JAVA_FLAGS -Dfile.encoding=UTF-8 -cp "$cp" com.sun.fortress.runtimeSystem.MainWrapper SkFirstLoad32 2>&1); rc=$?
      ms=$(( ($(date +%s%N) - t0) / 1000000 ))
      echo "loader=$mode FORTRESS_THREADS=$th run $i exit=$rc ${ms}ms: $(echo "$out" | grep -m1 -o 'PASS\|FAIL.*\|Exception[^ ]*\|Error[^ ]*\|"cl" is null' | head -1)$(echo "$out" | grep -m1 -o '"cl" is null\|duplicate class definition[^)]*' )"
    done
  done
done
clean SkFirstLoad32
echo "# load at end $(cut -d' ' -f1-3 /proc/loadavg)"
