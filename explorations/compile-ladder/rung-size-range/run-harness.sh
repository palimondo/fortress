#!/bin/bash
# run-harness.sh <scratch-dir> <file.fss>...: the testSystem harness (SystemJUTest) over the named files alone,
# through harness-one.sh, as rung J's run-harness.sh ran it; the machine line, the output with the worktree
# prefix removed and without Java frames, and rc=.
set -u
cd "$(dirname "$0")/../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH"
export FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
S=$1; shift
echo "# run-harness.sh $(date -u +%FT%TZ); tree $(git rev-parse --short HEAD)$(git diff --quiet HEAD -- ProjectFortress/src Library || echo ' with its working changes'); nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //') MHz; load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS"
echo "\$ harness-one.sh $S $*"
explorations/compile-ladder/rung-size-range/harness-one.sh "$FORTRESS_HOME/$S" "$@" < /dev/null 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at ' | cut -c1-300
echo "rc=${PIPESTATUS[0]}"
rm -rf "$FORTRESS_HOME/$S"
