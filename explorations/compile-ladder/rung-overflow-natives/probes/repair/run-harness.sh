#!/bin/bash
# run-harness.sh <scratch-dir> <file.fss>: the testSystem harness over one file, through
# explorations/compile-ladder/rung-interp-coercion/harness-one.sh, with env.sh's settings set by hand
# (without its rm of /tmp/fortress*rats); prints the command, the output with the worktree prefix removed, and rc=.
set -u
cd "$(dirname "$0")/../../../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH"
export FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
echo "\$ explorations/compile-ladder/rung-interp-coercion/harness-one.sh $1 $2"
explorations/compile-ladder/rung-interp-coercion/harness-one.sh "$FORTRESS_HOME/$1" "$2" < /dev/null 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at '
echo "rc=${PIPESTATUS[0]}"
