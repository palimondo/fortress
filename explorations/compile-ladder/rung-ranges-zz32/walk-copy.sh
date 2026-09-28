#!/bin/bash
# walk-copy.sh <library-copy-dir> <file.fss> [extra java flags...]: one file under walk with a library copy put in
# front of the tree's library through -Dfortress.source.path (measurement C's walk.sh, explorations/reviews/
# numerics-plan-coordinator/probes-C/walk.sh), run from the file's own directory, a private cache; machine line,
# output with the worktree prefix removed, rc=. For probing a library edit before it is in the tree.
set -u
cd "$(dirname "$0")/../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH"
export FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
LN=$1; L=$(cd "$1" && pwd); F=$(cd "$(dirname "$2")" && pwd)/$(basename "$2"); shift 2
C="$FORTRESS_HOME/tmp/walk-copy.$$"; rm -rf "$C"; mkdir -p "$C/tmp"
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
bash explorations/compile-ladder/rung-ranges-zz32/machine.sh "walk-copy $LN $(basename "$F")"
cd "$(dirname "$F")"; START=$(date +%s)
timeout -k 10 ${WALK_TIMEOUT:-900} java -Xmx4g -Xss64m -Dfile.encoding=UTF-8 -Dfortress.caches="$C" -Djava.io.tmpdir="$C/tmp" \
  "-Dfortress.source.path=;.;$L;$FORTRESS_HOME/ProjectFortress/test_library" "$@" -cp "$CP" com.sun.fortress.Shell "$(basename "$F")" < /dev/null 2>&1 \
  | sed "s#$FORTRESS_HOME/##g"
echo "rc=${PIPESTATUS[0]} secs=$(( $(date +%s) - START ))"
rm -rf "$C"
