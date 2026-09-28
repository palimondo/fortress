#!/bin/bash
# run-harness.sh <scratch-dir> <file.fss>...: the testSystem harness (SystemJUTest) over the named files alone,
# through explorations/compile-ladder/rung-interp-coercion/harness-one.sh, as rung O's run-harness.sh ran it;
# the machine line, the output with the worktree prefix removed and without Java frames, and rc=.
set -u
cd "$(dirname "$0")/../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH"
export FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
S=$1; shift
bash explorations/compile-ladder/rung-ranges-zz32/machine.sh "harness $*"
echo "\$ explorations/compile-ladder/rung-interp-coercion/harness-one.sh $S $*"
explorations/compile-ladder/rung-interp-coercion/harness-one.sh "$FORTRESS_HOME/$S" "$@" < /dev/null 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at '
echo "rc=${PIPESTATUS[0]}"
rm -rf "$FORTRESS_HOME/$S"
