#!/bin/bash
# run-both.sh <probe.fss>... : each probe under walk and compiled (against the compiler library), at FORTRESS_THREADS=1, on this worktree (rung U's skeptic's run-diff.sh, one thread count)
W=/home/user/fortress-specinfer
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH=/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH FORTRESS_HOME=$W TMPDIR=$W/tmp FORTRESS_THREADS=1
export JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$W/tmp"
unset JAVA_TOOL_OPTIONS
echo "# machine: nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //') MHz; load at start $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=1; tree $(git -C $W rev-parse --short HEAD)$(git -C $W diff --quiet -- ProjectFortress Library || echo '+working-tree-edits')"
for p in "$@"; do
  d=$(dirname $p); f=$(basename $p)
  echo "=== $f walk"
  ( cd $d && timeout 300 $W/bin/fortress $f 2>&1 | grep -v '^\s*at ' | head -20 ; echo "rc=${PIPESTATUS[0]}" )
  echo "=== $f compile"
  ( cd $d && timeout 300 $W/bin/fortress compile $f 2>&1 | head -20 ; echo "rc=${PIPESTATUS[0]}" )
  echo "=== $f compiled run"
  ( cd $d && timeout 300 $W/bin/fortress run ${f%.fss} 2>&1 | grep -v '^\s*at ' | head -20 ; echo "rc=${PIPESTATUS[0]}" )
done
