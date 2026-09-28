#!/bin/bash
# run-diff.sh <probe.fss>... : each probe under walk and compiled, at FORTRESS_THREADS=1 and 4, on this worktree
W=/home/user/fortress-specranges
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH=/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH FORTRESS_HOME=$W TMPDIR=$W/tmp
export JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$W/tmp"
unset JAVA_TOOL_OPTIONS
echo "machine: nproc $(nproc), $(grep -m1 'model name' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //'), $(grep -m1 'cpu MHz' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //') MHz, load $(cut -d' ' -f1-3 /proc/loadavg), $(java -version 2>&1 | head -1), base $(git -C $W rev-parse --short HEAD)"
for p in "$@"; do
  d=$(dirname $p); f=$(basename $p)
  for t in 1 4; do
    echo "=== $f walk FORTRESS_THREADS=$t"
    ( cd $d && FORTRESS_THREADS=$t timeout 300 $W/bin/fortress $f 2>&1 | grep -v '^\s*at ' | head -12 ; echo "rc=${PIPESTATUS[0]}" )
  done
  echo "=== $f compile"
  ( cd $d && timeout 300 $W/bin/fortress compile $f 2>&1 | head -12 ; echo "rc=${PIPESTATUS[0]}" )
  for t in 1 4; do
    echo "=== $f compiled run FORTRESS_THREADS=$t"
    ( cd $d && FORTRESS_THREADS=$t timeout 300 $W/bin/fortress run ${f%.fss} 2>&1 | grep -v '^\s*at ' | head -12 ; echo "rc=${PIPESTATUS[0]}" )
  done
done
