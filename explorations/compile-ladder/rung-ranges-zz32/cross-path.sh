#!/bin/bash
# cross-path.sh <file.fss>: one component under walk (the one library, this tree) and compiled (the compiler
# library, a private copy of default_repository/caches, compiled-case.sh's shape), machine line, outputs, rc.
set -u
cd "$(dirname "$0")/../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH"
export FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
F=$(cd "$(dirname "$1")" && pwd)/$(basename "$1"); N=$(basename "$1" .fss)
S="$FORTRESS_HOME/tmp/cross-$N"; rm -rf "$S"; mkdir -p "$S/walk" "$S/tmp"
cp -a default_repository/caches "$S/caches"
bash explorations/compile-ladder/rung-ranges-zz32/machine.sh "cross-path $1"
echo "== walk"
( cd "$(dirname "$F")" && FORTRESS_CACHES="$S/walk" JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$S/tmp" timeout -k 10 900 "$FORTRESS_HOME/bin/fortress" "$N.fss" < /dev/null 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at '; echo "walk rc=${PIPESTATUS[0]}" )
echo "== compiled"
export FORTRESS_CACHES="$S/caches" JAVA_FLAGS="-Xmx2g -Xss64m -Dfortress.caches=$S/caches -Djava.io.tmpdir=$S/tmp"
( cd "$(dirname "$F")" && timeout 900 "$FORTRESS_HOME/bin/fortress" compile "$N.fss" < /dev/null 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at '; echo "compile rc=${PIPESTATUS[0]}" )
( cd ProjectFortress && timeout 900 ../bin/fortress run "$N" < /dev/null 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at '; echo "run rc=${PIPESTATUS[0]}" )
rm -rf "$S"
