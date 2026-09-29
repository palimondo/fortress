#!/bin/bash
# walk-one.sh <file.fss> <out.txt> <label>: one program under walk, run from its own directory, with a
# private empty cache (FORTRESS_CACHES) and JVM temp directory under tmp/, bin/fortress's JVM with
# JAVA_FLAGS -Xmx4g -Xss64m, FORTRESS_THREADS=1; output headed by the machine line and ended by rc=.
set -u
cd "$(dirname "$0")/../../.."                               # $FORTRESS_HOME
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
f=${1:?usage}; out=${2:?usage}; L=${3:-walk}
t=$(basename "$f" .fss); C="$FORTRESS_HOME/tmp/walk-one-$t-$$"
rm -rf "$C"; mkdir -p "$C/caches" "$C/tmp"; printf '\0\0\0\0' > "$C/caches/global.map"
{
  bash explorations/compile-ladder/rung-integer-minmax/machine.sh "$L $t"
  start=$(date +%s)
  ( cd "$(dirname "$f")" && FORTRESS_CACHES="$C/caches" JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$C/tmp" \
      timeout -k 10 1200 "$FORTRESS_HOME/bin/fortress" "$(basename "$f")" < /dev/null )
  echo "rc=$? secs=$(( $(date +%s) - start ))"
} > "$out" 2>&1
rm -rf "$C"
