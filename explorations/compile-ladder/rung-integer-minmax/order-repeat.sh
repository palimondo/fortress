#!/bin/bash
# order-repeat.sh <test-name> <runs> <out.txt> <label>: runs ProjectFortress/tests/<test-name>.fss under walk <runs> times
# with bin/fortress's own JVM flags (JAVA_FLAGS -Xmx4g -Xss64m, no pinned processor count), as testSystem and
# bin/fortress run it, one private cache warmed by the first run, and prints per run the order in which the
# ambiguity message names its two declarations (the first line naming a declaration after "Overloading of" or
# the member listing), then the tally; row 430's check (rung H's order-repeat, rung D's order-repeat-base).
set -u
cd "$(dirname "$0")/../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
t=${1:?usage}; n=${2:?usage}; out=${3:?usage}; L=${4:-}
C="$FORTRESS_HOME/tmp/order-$t-$$"; rm -rf "$C"; mkdir -p "$C/caches" "$C/tmp"; printf '\0\0\0\0' > "$C/caches/global.map"
{
  bash explorations/compile-ladder/rung-integer-minmax/machine.sh "$L $t x$n"
  for i in $(seq 1 "$n"); do
    ( cd ProjectFortress/tests && FORTRESS_CACHES="$C/caches" JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$C/tmp" \
        timeout -k 10 600 "$FORTRESS_HOME/bin/fortress" "$t.fss" < /dev/null > "$C/run.txt" 2>&1 )
    rc=$?
    first=$(grep -m1 -E '^\s+\(first\) |^\s+[a-z][A-Za-z_]*\(.*\):.* /' "$C/run.txt" | sed -E 's#/[^ ]*/ProjectFortress/tests/##; s/^\s+//' | cut -c1-90)
    echo "run $i rc=$rc first: $first"
  done
} > "$out" 2>&1
grep '^run ' "$out" | sed 's/^run [0-9]* //' | sort | uniq -c >> "$out"
rm -rf "$C"
