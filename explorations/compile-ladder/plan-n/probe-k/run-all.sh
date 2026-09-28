#!/bin/bash
# run-all.sh : every pass of probe K, in the order they ran, at most two JVMs at a time (the
# coordinator's cap while batch 7R ran beside the probe).  Each stage waits for the one before;
# run-pass.sh resumes a pass, skipping the programs whose log already has its rc= trailer.
#   0. the stock microGPT checks (run first, alone, two JVMs)
#   1. the shape programs under the rebuilt shadow, apply and log (one JVM each)
#   2. the tests: base A (stock) and the shadow in apply mode, one JVM each
#   3. the microGPT checks under the shadow in apply mode, two JVMs
#   4. the tests' base B (stock) and the demos under the shadow in apply mode, cut at 120 s
#   5. the demos, stock, cut at 120 s, and the tests under the shadow in log mode
#   6. (run by hand after 5, one JVM, beside nothing of this probe's) the 26 shape programs of the
#      final make-shapes.py (the range and op shapes added), stock, apply and log, into captures/shapes.txt
# Every pass writes its machine line to <work-dir>/machine.txt; df is read before each stage.
set -u
source "$(dirname "${BASH_SOURCE[0]}")/env.sh"
cd "$O"
R=$X/runs
mkdir -p "$R"
stage () { echo "== stage $1 $(date -u +%FT%TZ); $(df -h "$X" | tail -1)"; }
until grep -q '^done' "$R/mg-stock.out" 2>/dev/null; do sleep 20; done
stage 1
./run-pass.sh "$R/shapes-apply2" "$X/shapes-list.txt" 300 apply 1 > "$R/shapes-apply2.out" 2>&1 &
./run-pass.sh "$R/shapes-log2" "$X/shapes-list.txt" 300 log 1 > "$R/shapes-log2.out" 2>&1 &
wait
stage 2
./run-pass.sh "$R/tests-A" tests-list.txt 600 stock 1 > "$R/tests-A.out" 2>&1 &
./run-pass.sh "$R/tests-apply" tests-list.txt 600 apply 1 > "$R/tests-apply.out" 2>&1 &
wait
stage 3
./run-pass.sh "$R/mg-apply" mg-list.txt 5400 apply 2 > "$R/mg-apply.out" 2>&1
stage 4
./run-pass.sh "$R/tests-B" tests-list.txt 600 stock 1 > "$R/tests-B.out" 2>&1 &
./run-pass.sh "$R/demos-apply" demo-list.txt 120 apply 1 > "$R/demos-apply.out" 2>&1 &
wait
stage 5
./run-pass.sh "$R/demos-stock" demo-list.txt 120 stock 1 > "$R/demos-stock.out" 2>&1 &
./run-pass.sh "$R/tests-log" tests-list.txt 600 log 1 > "$R/tests-log.out" 2>&1 &
wait
echo "== all done $(date -u +%FT%TZ)"
# stage 6, as it was run:
#   python3 make-shapes.py $X/new-shapes && cp $X/new-shapes/*.fss $H/probek-shapes/
#   sed 's|^|probek-shapes/|' $X/new-shapes/list.txt > $X/shapes-list.txt
#   for m in stock apply log; do ./run-pass.sh $R/shapes-${m}3 $X/shapes-list.txt 300 $m 1; done
