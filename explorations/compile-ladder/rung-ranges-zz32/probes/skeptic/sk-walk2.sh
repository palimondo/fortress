#!/bin/bash
# sk-walk2.sh <file.fss> [threads]: one file under walk on the base library and on the tree's library, side by side,
# private caches, from the file's own directory. The base library is a copy made by git show of the base commit
# 26c5d3dd7 of every .fsi/.fss of Library/ and ProjectFortress/LibraryBuiltin/ (tmp/sk-baselib), put in front of the
# tree's library through -Dfortress.source.path, as the rung's walk-copy.sh does; the thread count is passed through.
set -u
cd "$(dirname "$0")/../../../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH"
export FORTRESS_HOME="$(pwd)"; unset JAVA_TOOL_OPTIONS
export FORTRESS_THREADS=${2:-1}
F=$(cd "$(dirname "$1")" && pwd)/$(basename "$1"); N=$(basename "$1"); L=$FORTRESS_HOME/tmp/sk-baselib
S="$FORTRESS_HOME/tmp/sk-walk2.$$"; rm -rf "$S"; mkdir -p "$S/b" "$S/t" "$S/tmp"
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
bash explorations/compile-ladder/rung-ranges-zz32/machine.sh "sk-walk2 $N"
echo "== base library"
( cd "$(dirname "$F")" && timeout -k 10 900 java -Xmx4g -Xss64m -Dfile.encoding=UTF-8 -Dfortress.caches="$S/b" -Djava.io.tmpdir="$S/tmp" \
  "-Dfortress.source.path=;.;$L;$FORTRESS_HOME/ProjectFortress/test_library" -cp "$CP" com.sun.fortress.Shell "$N" < /dev/null 2>&1 \
  | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at '; echo "rc=${PIPESTATUS[0]}" )
echo "== tree library"
( cd "$(dirname "$F")" && FORTRESS_CACHES="$S/t" JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$S/tmp" timeout -k 10 900 "$FORTRESS_HOME/bin/fortress" "$N" < /dev/null 2>&1 \
  | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at '; echo "rc=${PIPESTATUS[0]}" )
rm -rf "$S"
