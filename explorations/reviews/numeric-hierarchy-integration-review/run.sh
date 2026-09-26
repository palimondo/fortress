#!/bin/bash
# Run each named probe on both paths, one after another, each in a fresh private cache.
#   run.sh <libcache> <scratch> <Name>...
# walk:     bin/fortress <Name>.fss                      -> <Name>.walk.txt
# compiled: bin/fortress compile <Name>.fss into a copy of <libcache>, whose library
#           components (AnyType, CompilerBuiltin, CompilerAlgebra, CompilerLibrary,
#           CompilerSystem) were compiled there first, in that order; then
#           MainWrapper <Name> on that cache                -> <Name>.comp.txt
# PATHS="comp" runs the compiled path only (default "walk comp").
set -u
PATHS=${PATHS:-walk comp}
D="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$D/../../experiment/env.sh"
L=$1 ; S=$2 ; shift 2
FH=$FORTRESS_HOME
CP=$("$FH/bin/fortress_classpath" | tail -1)
stamp() { echo "($(git -C "$FH" rev-parse --short HEAD), $(date -u +%FT%TZ), load $(cut -d' ' -f1 /proc/loadavg), FORTRESS_THREADS=$FORTRESS_THREADS)"; }
clean() { sed "s|$FH/||g"; }
cd "$D"
for N in "$@" ; do
  W=$S/$N/walk ; C=$S/$N/comp ; T=$S/$N/tmp
  rm -rf "${S:?}/$N" ; mkdir -p "$W" "$T" ; cp -r "$L" "$C"
  case " $PATHS " in *" walk "*)
  {
    echo "=== \$ bin/fortress $N.fss   $(stamp) ==="
    JAVA_FLAGS="$JAVA_FLAGS -Dfortress.caches=$W -Djava.io.tmpdir=$T" timeout -k 10 600 "$FH/bin/fortress" "$N.fss" 2>&1
    echo "=== exit $? ==="
  } 2>&1 | clean > "$N.walk.txt" ;;
  esac
  {
    echo "=== \$ bin/fortress compile $N.fss   (private cache seeded with the compiled library)   $(stamp) ==="
    JAVA_FLAGS="$JAVA_FLAGS -Dfortress.caches=$C -Djava.io.tmpdir=$T" timeout -k 10 900 "$FH/bin/fortress" compile "$N.fss" 2>&1
    echo "=== exit $? ==="
    if [ -f "$C/bytecode_cache/$N.jar" ] ; then
      echo "=== \$ java ... MainWrapper $N   (same private cache) ==="
      timeout -k 10 600 java $JAVA_FLAGS -cp "$C/bytecode_cache:$C/bytecode_cache/*:$C/nativewrapper_cache:$CP" com.sun.fortress.runtimeSystem.MainWrapper "$N" 2>&1
      echo "=== exit $? ==="
    else
      echo "=== no $N.jar produced; nothing to run ==="
    fi
  } 2>&1 | clean > "$N.comp.txt"
  rm -rf "${T:?}"
  echo "$N: walk $(tail -1 "$N.walk.txt" 2>/dev/null) / compiled $(tail -1 "$N.comp.txt")"
done
