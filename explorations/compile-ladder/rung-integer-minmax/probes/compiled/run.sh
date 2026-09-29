#!/bin/bash
# run.sh [name...]: compiles and runs each program of list.txt on the compile path (bin/fortress compile, then
# bin/fortress run), from this directory, with the worktree's bytecode cache built in library order first
# (CLAUDE.md); one at a time. Output to captures/<Name>.txt, headed by the machine line and ending with both exit codes.
set -u
D="$(cd "$(dirname "$0")" && pwd)"
cd "$D/../../../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
export JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$FORTRESS_HOME/tmp"
mkdir -p "$D/captures"
cut -f1,2 "$D/list.txt" | while IFS=$'\t' read -r N CALL; do
  [ $# -gt 0 ] && ! printf '%s\n' "$@" | grep -qx "$N" && continue
  {
    bash explorations/compile-ladder/rung-integer-minmax/machine.sh "compiled $N: $CALL; tree $(git rev-parse --short HEAD)"
    echo "## compile"
    ( cd "$D" && timeout 600 "$FORTRESS_HOME/bin/fortress" compile "$N.fss" < /dev/null 2>&1 ); echo "compile rc=$?"
    echo "## run"
    ( cd "$D" && timeout 600 "$FORTRESS_HOME/bin/fortress" run "$N" < /dev/null 2>&1 ); echo "run rc=$?"
  } > "$D/captures/$N.txt" 2>&1
  echo "$N $(grep -E ' = .* : |rc=' "$D/captures/$N.txt" | tr '\n' ' ')"
done
