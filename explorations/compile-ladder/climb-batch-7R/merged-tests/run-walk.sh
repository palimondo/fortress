#!/bin/bash
# run-walk.sh <path/to/Component.fss> <capture.txt> [threads] : runs one component under walk on the main
# tree, from a copy in a private work directory with a private cache (so default_repository/caches is
# not touched), as ant testSpecData runs a SpecData example (build.xml:1139). The capture is headed by
# the machine line and ends with the exit code. Adapted from rung U's probes/examples/run-walk.sh.
set -u
R=/home/user/fortress
cd $R && source explorations/experiment/env.sh >/dev/null 2>&1
W0=${GATHER_SCRATCH:?}; C=$W0/walk-cache; W=$W0/work
mkdir -p "$C" "$W"
export FORTRESS_THREADS=${3:-1}
src=$1; out=$2; b=$(basename "$src")
cp "$src" "$W/$b"
{ echo "# machine: nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/.*: //') MHz; load at start $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS; tree $(git -C $R rev-parse --short HEAD) with climb batch 7R's rung U applied in the index and the gather's edits"
  echo "# walk $src"
  s=$(date +%s)
  ( cd "$W" && JAVA_FLAGS="$JAVA_FLAGS -Dfortress.caches=$C" timeout 900 $R/bin/fortress walk "$b" 2>&1 ); rc=$?
  echo "rc=$rc"; echo "# $(( $(date +%s)-s )) s"; } > "$out"
