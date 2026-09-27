#!/bin/bash
# Compiles and runs a copy of ProjectFortress/tests/FixedWidthOverflowRungB.fss (tmp/sk/ctest/) on the compiled path,
# against the private cache copy tmp/sk/caches-compiled; writes probes/skeptic/FixedWidthOverflowRungB-compiled.txt.
set -u
cd "$(dirname "$0")/../../../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
C="$FORTRESS_HOME/tmp/sk/caches-compiled"; T="$FORTRESS_HOME/tmp/sk/tmp"
export FORTRESS_CACHES="$C" JAVA_FLAGS="-Xmx2g -Xss64m -Dfortress.caches=$C -Djava.io.tmpdir=$T"
O=explorations/compile-ladder/rung-overflow-natives/probes/skeptic/FixedWidthOverflowRungB-compiled.txt
{
  echo "# FixedWidthOverflowRungB (a copy of the branch's file) on the compiled path, $(date -u +%FT%TZ), nproc $(nproc), $(grep -m1 'model name' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //'), load $(cut -d' ' -f1-3 /proc/loadavg), $(java -version 2>&1 | head -1), HEAD $(git rev-parse --short HEAD)"
  cmp tmp/sk/ctest/FixedWidthOverflowRungB.fss ProjectFortress/tests/FixedWidthOverflowRungB.fss && echo "copy identical to the branch's file"
  ( cd tmp/sk/ctest && timeout 600 "$FORTRESS_HOME/bin/fortress" compile FixedWidthOverflowRungB.fss < /dev/null 2>&1; echo "compile rc=$?" )
  timeout 600 ./bin/fortress run FixedWidthOverflowRungB < /dev/null 2>&1
  echo "run rc=$?"
} > "$O" 2>&1
