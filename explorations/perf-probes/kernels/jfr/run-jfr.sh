#!/bin/bash
# Java Flight Recorder on the real Fortress runs.  bin/fortress and bin/run
# both pass $JAVA_FLAGS through to the java command line unchanged
# (bin/fortress:27-32, bin/run:27-40), so the recording is started by adding
# -XX:StartFlightRecording to JAVA_FLAGS -- no wrapper and no edit to the
# scripts.  Sampling period forced to 1 ms because bench1r's loop is only half
# a second long at the profile setting's default 10 ms.
# Run from this directory with explorations/experiment/env.sh already sourced.
set -u
F=/home/user/fortress/bin/fortress
BASE="-Xmx4g -Xss64m"
cd /home/user/fortress/explorations/perf-probes/kernels

for b in bench1h bench1r; do
  echo "=== JFR, compiled: $b"
  JAVA_FLAGS="$BASE -XX:StartFlightRecording=settings=profile,jdk.ExecutionSample#period=1ms,filename=jfr/compiled-$b.jfr,dumponexit=true" \
    $F run $b 2>&1
done

# No kernel compiles (compile-kernels.out), so the only Fortress run of a
# microGPT-shaped kernel that exists is the interpreter's.  Profiled here as
# an extra, clearly labelled: it attributes the walk interpreter's time, not
# the compiled path's.
echo "=== JFR, interpreter: krows"
JAVA_FLAGS="$BASE -XX:StartFlightRecording=settings=profile,jdk.ExecutionSample#period=1ms,filename=jfr/interp-krows.jfr,dumponexit=true" \
  $F krows.fss 2>&1
