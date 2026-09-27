#!/bin/bash
# run-walk.sh <file.fss> [threads]: walks one file on the branch's build with a fresh private cache directory,
# in the shape of probes/skeptic/run-sk.sh's walk-edit branch (env.sh's settings without its rm of
# /tmp/fortress*rats); prints the command, the output with the worktree prefix removed, and rc=.
set -u
cd "$(dirname "$0")/../../../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH"
export FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=${2:-1}
unset JAVA_TOOL_OPTIONS
F=$1
C="$FORTRESS_HOME/tmp/repair/caches-walk-$(basename "$F" .fss)-t$FORTRESS_THREADS"; rm -rf "$C"; mkdir -p "$C"
T="$FORTRESS_HOME/tmp/repair/tmp"; mkdir -p "$T"
CP=$(./bin/fortress_classpath | tail -1)
echo "\$ FORTRESS_THREADS=$FORTRESS_THREADS walk $F   (fresh private caches: tmp/repair/caches-walk-$(basename "$F" .fss)-t$FORTRESS_THREADS)"
FORTRESS_CACHES="$C" timeout 900 java -Xmx4g -Xss64m -Djava.io.tmpdir="$T" -Dfortress.caches="$C" \
  -Dfile.encoding=UTF-8 -cp "$CP" com.sun.fortress.Shell walk "$F" < /dev/null 2>&1 | sed "s#$FORTRESS_HOME/##g"
echo "rc=${PIPESTATUS[0]}"
