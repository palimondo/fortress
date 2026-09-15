#!/bin/bash
# Timing harness for the microGPT-shaped kernel probe.  Run from this directory:
#   source /home/user/fortress/experiment/env.sh && ./run-all.sh
# Three runs of every form, each in its own fresh JVM.  The loop only is timed
# inside each program with nanoTime / System.nanoTime; the process wall is
# recorded alongside.  The Java forms do one untimed warm-up pass and then MULT
# timed passes of exactly the work one Fortress run of the loop does, and print
# the mean -- otherwise the kernels finish inside JIT warm-up.
set -u
F=/home/user/fortress/bin/fortress
say() { echo "$@"; }
say "# host: $(uname -srm)  cores: $(nproc)"
say "# jdk: $(java -version 2>&1 | head -1)"
say "# FORTRESS_THREADS=${FORTRESS_THREADS:-unset}  JAVA_FLAGS=${JAVA_FLAGS:-unset}"
say "# date: $(date -Is)"

for b in bench1h bench1r kdot kmat krows; do
  for r in 1 2 3; do
    say "=== interpreter run $r: $b"
    s=$(date +%s.%N); timeout 1800 $F $b.fss 2>&1; say "--- process wall: $(echo "$(date +%s.%N) - $s" | bc) s"
  done
done

for b in bench1h bench1r; do
  for r in 1 2 3; do
    say "=== compiled run $r: $b"
    s=$(date +%s.%N); timeout 1800 $F run $b 2>&1; say "--- process wall: $(echo "$(date +%s.%N) - $s" | bc) s"
  done
done

for c in Bench1HPrim Bench1HBoxed Bench1HBoxedSink \
         KDotPrim KDotBoxed KDotGen KMatPrim KMatBoxed KMatGen \
         KRowsPrim KRowsBoxed KRowsGen; do
  for r in 1 2 3; do
    say "=== java run $r: $c"
    s=$(date +%s.%N); java -Xmx4g -Xss64m -cp java/classes $c 2>&1; say "--- process wall: $(echo "$(date +%s.%N) - $s" | bc) s"
  done
done
say "# done: $(date -Is)"
