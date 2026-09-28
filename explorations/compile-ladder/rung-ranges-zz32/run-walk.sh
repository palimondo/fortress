#!/bin/bash
# run-walk.sh <scratch-dir> <file.fss> [threads]: one file under walk from fresh private caches, with the
# machine line, the command, the output with the worktree prefix removed and without Java frames, and rc=.
# env.sh's settings are set by hand, without its rm of /tmp/fortress*rats, which another worktree's runs use.
set -u
cd "$(dirname "$0")/../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH"
export FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=${3:-1}
unset JAVA_TOOL_OPTIONS
S="$FORTRESS_HOME/$1"; rm -rf "$S"; mkdir -p "$S/caches" "$S/tmp"; printf '\0\0\0\0' > "$S/caches/global.map"
bash explorations/compile-ladder/rung-ranges-zz32/machine.sh "walk $2"; START=$(date +%s)
echo "\$ FORTRESS_THREADS=$FORTRESS_THREADS FORTRESS_CACHES=$1/caches bin/fortress $2"
FORTRESS_CACHES="$S/caches" JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$S/tmp" timeout -k 10 900 bin/fortress "$2" < /dev/null 2>&1 \
  | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at '
echo "rc=${PIPESTATUS[0]} secs=$(( $(date +%s) - START ))"
rm -rf "$S"
