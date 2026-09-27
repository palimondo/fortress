#!/bin/bash
# run-compiled.sh <dir> <Name>: `fortress compile` and `fortress run` of <dir>/<Name>.fss against a private copy of
# default_repository/caches (tmp/repair/caches-compiled, copied fresh), in the shape of probes/skeptic/run-sk.sh's
# compiled branch; prints the commands, the output with the worktree prefix removed, and each rc.
set -u
cd "$(dirname "$0")/../../../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH"
export FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=${FORTRESS_THREADS:-1}
unset JAVA_TOOL_OPTIONS
D=$1; N=$2
C="$FORTRESS_HOME/tmp/repair/caches-compiled"; rm -rf "$C"; cp -a default_repository/caches "$C"
T="$FORTRESS_HOME/tmp/repair/tmp"; mkdir -p "$T"
export FORTRESS_CACHES="$C" JAVA_FLAGS="-Xmx2g -Xss64m -Dfortress.caches=$C -Djava.io.tmpdir=$T"
echo "\$ (cd $D && fortress compile $N.fss); fortress run $N   (private copy of the caches: tmp/repair/caches-compiled)"
( cd "$D" && timeout 600 "$FORTRESS_HOME/bin/fortress" compile "$N.fss" < /dev/null 2>&1 | sed "s#$FORTRESS_HOME/##g"; echo "compile rc=${PIPESTATUS[0]}" )
timeout 600 ./bin/fortress run "$N" < /dev/null 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at java\.base'
echo "run rc=${PIPESTATUS[0]}"
