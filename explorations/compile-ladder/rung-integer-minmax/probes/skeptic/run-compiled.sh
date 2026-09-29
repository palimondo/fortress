#!/bin/bash
# run-compiled.sh [name...]: compiles and runs each program of compiled/ (bin/fortress compile, then bin/fortress run),
# one at a time, against the worktree's bytecode cache (the compiler library, built in library order by the worker).
# Output: compiled-out/<Name>.txt, headed by the machine line, ending with both exit codes.
set -u
D="$(cd "$(dirname "$0")" && pwd)"
W="$(cd "$D/../../../../.." && pwd)"
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$W" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
export JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$W/tmp"
mkdir -p "$D/compiled-out"
for f in "$D"/compiled/*.fss; do
  N=$(basename "$f" .fss)
  [ $# -gt 0 ] && ! printf '%s\n' "$@" | grep -qx "$N" && continue
  {
    bash "$W/explorations/compile-ladder/rung-integer-minmax/machine.sh" "compiled $N; tree $(cd "$W" && git rev-parse --short HEAD)"
    echo "## compile"
    ( cd "$D/compiled" && timeout 600 "$W/bin/fortress" compile "$N.fss" < /dev/null 2>&1 ); echo "compile rc=$?"
    echo "## run"
    ( cd "$D/compiled" && timeout 600 "$W/bin/fortress" run "$N" < /dev/null 2>&1 ); echo "run rc=$?"
  } > "$D/compiled-out/$N.txt" 2>&1
done
