#!/bin/bash
# sk-walk.sh <library-tree> <cache-dir> <file.fss>: run one program under walk on this worktree's build,
# with the interpreter reading Library/ from <library-tree> (FORTRESS_AUTOHOME) and a private cache.
# The skeptic's base runs use an extract of ff1649cea's Library/ and LibraryBuiltin/ (git archive).
set -u
R=$(cd "$(dirname "$0")/../../../../.." && pwd)
TREE=$(cd "$1" && pwd); C=$(mkdir -p "$2" && cd "$2" && pwd); F=$(cd "$(dirname "$3")" && pwd)/$(basename "$3")
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH"
unset JAVA_TOOL_OPTIONS
[ -f "$C/global.map" ] || printf '\0\0\0\0' > "$C/global.map"
CP=$(cd "$R" && FORTRESS_HOME="$R" ./bin/fortress_classpath 2>/dev/null | tail -1)
mkdir -p "$C/tmp"
cd "$(dirname "$F")"
FORTRESS_AUTOHOME="$TREE" FORTRESS_HOME="$R" FORTRESS_CACHES="$C" FORTRESS_THREADS=${FORTRESS_THREADS:-1} \
  timeout -k 10 1200 java -Xmx4g -Xss64m -Djava.io.tmpdir="$C/tmp" -Dfile.encoding=UTF-8 -cp "$CP" \
  com.sun.fortress.Shell walk "$(basename "$F")" < /dev/null
echo "rc=$?"
