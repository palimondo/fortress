#!/bin/bash
# Timing harness for the boxing probe.  Run from this directory with
#   source /home/user/fortress/experiment/env.sh && ./run-all.sh
# Three runs of each form; the loop only is timed inside each program with
# nanoTime / System.nanoTime, and the process wall is recorded alongside.
set -u
F=/home/user/fortress/bin/fortress
say() { echo "$@"; }
say "# host: $(uname -srm)"
say "# jdk: $(java -version 2>&1 | head -1)"
say "# FORTRESS_THREADS=${FORTRESS_THREADS:-unset}  JAVA_FLAGS=${JAVA_FLAGS:-unset}"
say "# date: $(date -Is)"
for b in bench1t bench2t bench1a bench1b bench1c; do
  for r in 1 2 3; do
    say "=== compiled fortress run $r: fortress run $b"
    s=$(date +%s.%N); $F run $b 2>&1; say "--- process wall: $(echo "$(date +%s.%N) - $s" | bc) s"
  done
done
for b in bench1 bench2; do
  for r in 1 2 3; do
    say "=== compiled fortress (untimed source) run $r: fortress run $b"
    s=$(date +%s.%N); $F run $b 2>&1; say "--- process wall: $(echo "$(date +%s.%N) - $s" | bc) s"
  done
done
for c in Bench1Prim Bench1Boxed Bench1BoxedLit Bench1Full Bench2Prim Bench2Obj Bench2Boxed Bench2BoxedLit; do
  for r in 1 2 3; do
    say "=== java run $r: $c"
    s=$(date +%s.%N); java -Xmx4g -Xss64m -cp java/classes $c 2>&1; say "--- process wall: $(echo "$(date +%s.%N) - $s" | bc) s"
  done
done
say "# done: $(date -Is)"
