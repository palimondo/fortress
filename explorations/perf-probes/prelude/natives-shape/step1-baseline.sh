#!/bin/bash
# Step 1: the two probe programs on walk, unchanged tree, private cache.
set -u
cd "$(dirname "$0")/../../../.."
source explorations/experiment/env.sh
D=explorations/perf-probes/prelude/natives-shape
export FORTRESS_CACHES=$FORTRESS_HOME/tmp/caches-walk
rm -rf "$FORTRESS_CACHES"; mkdir -p "$FORTRESS_CACHES"
{ echo "\$ git rev-parse HEAD"; git rev-parse HEAD
  echo "\$ git status --porcelain -- ProjectFortress Library"; git status --porcelain -- ProjectFortress Library
  java -version 2>&1 | head -1
  echo "nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo); $(grep -m1 'cpu MHz' /proc/cpuinfo); load: $(cut -d' ' -f1-3 /proc/loadavg)"
  echo "FORTRESS_CACHES=$FORTRESS_CACHES FORTRESS_THREADS=$FORTRESS_THREADS JAVA_FLAGS=$JAVA_FLAGS"
} > $D/00-setup.out 2>&1
for p in NativesShape NativesShapeOne; do
  { echo "\$ ./bin/fortress $D/$p.fss"; ./bin/fortress $D/$p.fss; echo "### rc=$?"; } > $D/01-$p-walk.out 2>&1
done
