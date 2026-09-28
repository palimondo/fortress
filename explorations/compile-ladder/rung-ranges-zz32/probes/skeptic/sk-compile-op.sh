#!/bin/bash
# sk-compile-op.sh <instrumented-classes-dir> <file.fss>: fortress compile of one component in the compiler's world
# (the compiler library, a private copy of default_repository/caches), with the instrumented Functionals class of
# sk-instrument.sh ahead of ProjectFortress/build, so that the case rule's chosen operator is printed (@@CASEOP).
set -u
cd "$(dirname "$0")/../../../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH"
export FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
X=$(cd "$1" && pwd); F=$(cd "$(dirname "$2")" && pwd)/$(basename "$2"); N=$(basename "$2" .fss)
S="$FORTRESS_HOME/tmp/sk-compile-op.$$"; rm -rf "$S"; mkdir -p "$S/tmp"; cp -a default_repository/caches "$S/caches"
export FORTRESS_CACHES="$S/caches"
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
bash explorations/compile-ladder/rung-ranges-zz32/machine.sh "sk-compile-op $2 (instrumented: $1)"
( cd "$(dirname "$F")" && timeout 900 java -Xmx2g -Xss64m -Dfile.encoding=UTF-8 -Dfortress.caches="$S/caches" -Djava.io.tmpdir="$S/tmp" \
    -cp "$X:$CP" com.sun.fortress.Shell compile "$N.fss" < /dev/null 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at '; echo "compile rc=${PIPESTATUS[0]}" )
( cd ProjectFortress && timeout 900 ../bin/fortress run "$N" < /dev/null 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at '; echo "run rc=${PIPESTATUS[0]}" )
rm -rf "$S"
