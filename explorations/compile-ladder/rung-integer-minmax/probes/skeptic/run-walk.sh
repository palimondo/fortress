#!/bin/bash
# run-walk.sh <edit|base> [name...]: runs each program of walk/ under walk, three at a time, each with a private empty
# cache; "base" runs against tmp/skbase, a sandbox whose four library files are bce66f1fa's and whose every other entry
# is a symlink into this worktree; "fix" runs against tmp/skfix, the edited library plus ZZ64's own MINNUM and MAXNUM in
# Integral's body form (a deliberate local fix, never committed; its diff is in fix-diff.txt). Output: walk-<tree>/<Name>.txt, headed by the machine line, ending with rc=.
set -u
D="$(cd "$(dirname "$0")" && pwd)"
W="$(cd "$D/../../../../.." && pwd)"
T=${1:?usage}; shift
case $T in edit) H="$W" ;; base) H="$W/tmp/skbase" ;; fix) H="$W/tmp/skfix" ;; *) exit 2 ;; esac
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
mkdir -p "$D/walk-$T"
one () {
  N=$1; C="$W/tmp/skw-$T-$N"; rm -rf "$C"; mkdir -p "$C/caches" "$C/tmp"; printf '\0\0\0\0' > "$C/caches/global.map"
  {
    FORTRESS_HOME="$H" bash "$W/explorations/compile-ladder/rung-integer-minmax/machine.sh" "walk $T $N; FORTRESS_HOME=FORTRESS_AUTOHOME=$H"
    s=$(date +%s)
    ( cd "$D/walk" && FORTRESS_HOME="$H" FORTRESS_AUTOHOME="$H" FORTRESS_CACHES="$C/caches" JAVA_FLAGS="-Xmx2g -Xss64m -Djava.io.tmpdir=$C/tmp" \
        timeout -k 10 900 "$H/bin/fortress" "$N.fss" < /dev/null 2>&1 )
    echo "rc=$? secs=$(( $(date +%s) - s ))"
  } > "$D/walk-$T/$N.txt" 2>&1
  rm -rf "$C"
}
export -f one; export D W T H
if [ $# -gt 0 ]; then printf '%s\n' "$@"; else cut -f1 "$D/list.txt"; fi | xargs -P 3 -I{} bash -c 'one {}'
