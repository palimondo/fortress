#!/bin/bash
# tas-repeat.sh <work-dir> <library-dir-or-"tree"> <n>: TransactionalArrayShakedown under walk n times at
# FORTRESS_THREADS=4, printing its two "pre and post" lines per run.  With "tree" the tree's test and library;
# with a directory holding a git-show copy of the base library, the base's test is copied there and run from
# there, so that the copy shadows the tree's library (Shell.sourcePath), as bare-sum.sh does.
set -u
cd "$(dirname "$0")/../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=4
unset JAVA_TOOL_OPTIONS
W=$(mkdir -p "$1" && cd "$1" && pwd); LIB=$2; N=$3
rm -rf "$W/caches"; mkdir -p "$W/caches" "$W/tmp"; printf '\0\0\0\0' > "$W/caches/global.map"
if [ "$LIB" = tree ]; then F=ProjectFortress/tests/TransactionalArrayShakedown.fss
else git show e5414f5bf:ProjectFortress/tests/TransactionalArrayShakedown.fss > "$LIB/TransactionalArrayShakedown.fss"; F="$LIB/TransactionalArrayShakedown.fss"; fi
bash explorations/compile-ladder/rung-flat-tower/machine.sh "TransactionalArrayShakedown x$N at four threads, library: $LIB"
for i in $(seq 1 "$N"); do
  out=$(FORTRESS_CACHES="$W/caches" JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$W/tmp" timeout 300 ./bin/fortress "$F" 2>&1 < /dev/null)
  echo "run $i rc=$?: $(printf '%s\n' "$out" | grep ' pre and ' | tr '\n' '|')"
done
