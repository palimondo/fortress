#!/bin/bash
# Compile one probe with the bytecode compiler in the COMPILER's world (CompilerLibrary,
# where ZZ32, ZZ64 and RR64 are already siblings) into a private cache and run it,
# capturing to <Name>.comp.txt. The private cache is seeded from a library cache built
# once in library order at $SCRATCH/fqw-libcache (the flattening worker's libcache.sh,
# reused as it is: AnyType, CompilerBuiltin, CompilerAlgebra, CompilerLibrary, CompilerSystem).
#   explorations/reviews/sum-replacement-judgement/comp.sh <Name>
D="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$D/../../experiment/env.sh"
N=$1
S=${SCRATCH:?set SCRATCH to a private directory}
L="$S/fqw-libcache"
C="$S/cache-comp-$N"
test -f "$L/bytecode_cache/fortress.CompilerLibrary.jar" || SCRATCH="$S" "$D/../flattening-questions-ways/libcache.sh" || exit 1
rm -rf "$C"; cp -r "$L" "$C"
CP=$("$FORTRESS_HOME/bin/fortress_classpath" | tail -1)
cd "$D"
{
  echo "# comp.sh $N started $(date -u +%FT%TZ); tree $(git -C "$FORTRESS_HOME" rev-parse --short HEAD); nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | grep -m1 version); FORTRESS_THREADS=$FORTRESS_THREADS"
  echo "## fortress compile $N.fss (private cache, compiler's world)"
  JAVA_FLAGS="$JAVA_FLAGS -Dfortress.caches=$C" timeout -k 10 900 "$FORTRESS_HOME/bin/fortress" compile "$N.fss" 2>&1
  echo "compile rc=$?"
  echo "## run"
  timeout -k 10 600 java $JAVA_FLAGS -Dfortress.caches="$C" -cp "$C/bytecode_cache:$C/bytecode_cache/*:$C/nativewrapper_cache:$CP" com.sun.fortress.runtimeSystem.MainWrapper "$N" 2>&1 | grep -v "^Picked up JAVA_TOOL"
  echo "run rc=${PIPESTATUS[0]}"
} > "$N.comp.txt" 2>&1
cat "$N.comp.txt"
