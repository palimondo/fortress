#!/bin/bash
# run-junit.sh <Name>...: from ProjectFortress, removes *<Name>* from ../default_repository/caches (as
# rung-unknown-size-arm/probes/rung-tests.sh:5-6 does), then runs `fortress junit compiler_tests/<Name>.test`
# for each name; prints the commands, the output with the worktree prefix removed and without Java frames, and each rc.
set -u
cd "$(dirname "$0")/../../../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH"
export FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
export JAVA_FLAGS="-Xmx2g -Xss64m -Djava.io.tmpdir=$FORTRESS_HOME/tmp/repair/tmp"
cd ProjectFortress
echo "\$ find ../default_repository/caches -name '*SeqMidpointRungO*' -exec rm -rf {} +"
find ../default_repository/caches -name '*SeqMidpointRungO*' -exec rm -rf {} + 2>/dev/null
for t in "$@"; do
  echo "\$ ../bin/fortress junit compiler_tests/$t.test"
  FORTRESS_JUNIT_VERBOSE=1 ../bin/fortress junit compiler_tests/$t.test < /dev/null 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at java\.base\|^\s*at junit\.\|^\s*at org\.junit\|^\s*at jdk\.internal'
  echo "rc=${PIPESTATUS[0]}"
done
