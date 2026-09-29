#!/bin/bash
# tests-walk.sh : the five re-anchored interpreter tests under walk, one run each, on this worktree
W=/home/user/fortress-specinfer
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH=/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH FORTRESS_HOME=$W TMPDIR=$W/tmp FORTRESS_THREADS=1
export JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$W/tmp"
unset JAVA_TOOL_OPTIONS
echo "# machine: nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //') MHz; load at start $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=1; tree $(git -C $W rev-parse --short HEAD)"
cd $W/ProjectFortress/tests
for f in RangeSizeRungO RangeZZ32RungJ XXXRangeBoundsRungO XXXRangeEmptyHashRungO XXXSeqRangeTopRungO; do
  echo "=== $f.fss walk"
  timeout 300 $W/bin/fortress $f.fss 2>&1 | grep -v '^\s*at ' | head -8
  echo "rc=${PIPESTATUS[0]}"
done
