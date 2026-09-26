#!/bin/bash
# Compile one probe with the bytecode compiler (CompilerLibrary) into a private
# cache and run it, capturing to <Name>.comp.txt.
#   explorations/reviews/flattening-questions-ways/comp.sh <Name>
# The private cache is seeded from a library cache built once, in order:
#   bin/fortress compile ProjectFortress/LibraryBuiltin/AnyType.fss
#   bin/fortress compile ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss
#   bin/fortress compile Library/CompilerAlgebra.fss
#   bin/fortress compile Library/CompilerLibrary.fss
#   bin/fortress compile Library/CompilerSystem.fss
# each with -Dfortress.caches=$SCRATCH/fqw-libcache (see libcache.sh).
D="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$D/../../experiment/env.sh"
N=$1
L=${SCRATCH:-/tmp}/fqw-libcache
C=${SCRATCH:-/tmp}/fqw-cache-comp-$N
test -f "$L/bytecode_cache/fortress.CompilerLibrary.jar" || "$D/libcache.sh" || exit 1
rm -rf "$C"; cp -r "$L" "$C"
CP=$("$FORTRESS_HOME/bin/fortress_classpath" | tail -1)
cd "$D"
{
  echo "## fortress compile $N.fss (private cache)"
  JAVA_FLAGS="$JAVA_FLAGS -Dfortress.caches=$C" timeout -k 10 900 "$FORTRESS_HOME/bin/fortress" compile "$N.fss" 2>&1
  echo "compile rc=$?"
  echo "## run"
  timeout -k 10 600 java $JAVA_FLAGS -Dfortress.caches="$C" -cp "$C/bytecode_cache:$C/bytecode_cache/*:$C/nativewrapper_cache:$CP" com.sun.fortress.runtimeSystem.MainWrapper "$N" 2>&1
  echo "run rc=$?"
} > "$N.comp.txt" 2>&1
cat "$N.comp.txt"
