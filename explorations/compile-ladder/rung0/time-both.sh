#!/bin/bash
# Rung 0 timing harness: the two runtime defects, measured on the two compiled
# benchmarks the boxing and kernel probes left behind.  Run from the repo root:
#   source explorations/experiment/env.sh && explorations/compile-ladder/rung0/time-both.sh > explorations/compile-ladder/rung0/before.out
# bench1t (perf-probes/boxing) carries the two float literals inside the loop;
# bench1h (perf-probes/kernels) hoists them and so isolates the transaction check.
# Three runs each, in a fresh JVM; the loop only is timed inside the program.
set -u
F=/home/user/fortress/bin/fortress
say() { echo "$@"; }
say "# host: $(uname -srm)  cores: $(nproc)"
say "# jdk: $(java -version 2>&1 | head -1)"
say "# FORTRESS_THREADS=${FORTRESS_THREADS:-unset}  JAVA_FLAGS=${JAVA_FLAGS:-unset}"
say "# date: $(date -Is)"
cd /home/user/fortress/explorations/perf-probes/boxing || exit 1
say "########## fortress compile bench1t.fss"
$F compile bench1t.fss 2>&1 || say "(compile failed)"
cd /home/user/fortress/explorations/perf-probes/kernels || exit 1
say "########## fortress compile bench1h.fss"
$F compile bench1h.fss 2>&1 || say "(compile failed)"
for b in bench1t bench1h; do
  for r in 1 2 3; do
    say "=== compiled run $r: $b"
    s=$(date +%s.%N); timeout 1800 $F run $b 2>&1; say "--- process wall: $(echo "$(date +%s.%N) - $s" | bc) s"
  done
done
say "# done: $(date -Is)"
