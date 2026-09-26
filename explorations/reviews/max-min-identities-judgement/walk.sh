#!/bin/bash
# Run one probe on the interpreter ("walk") in a private cache, capturing to <Name>.walk.txt
# (or <Name>.<variant>.walk.txt when a library variant is named).
#   explorations/reviews/max-min-identities-judgement/walk.sh <Name> [<variant>]
# With <variant>, the interpreter reads a private COPY of Library/ and
# ProjectFortress/LibraryBuiltin/ under $SCRATCH/lib-<variant>, edited in place by
# variants/<variant>.py (the tree's own files are never touched); the copy is pointed at
# with -Dfortress.source.path, the cache with -Dfortress.caches (both from
# default_repository/configuration). The capture's first line records the machine.
D="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$D/../../experiment/env.sh"
N=$1; V=${2:-}
S=${SCRATCH:?set SCRATCH to a private directory}
C="$S/cache-walk-$N${V:+-$V}"
rm -rf "$C"; mkdir -p "$C"
SP=""
if [ -n "$V" ]; then
  "$D/make-lib.sh" "$V" || exit 1
  SP="-Dfortress.source.path=;.;$S/lib-$V/LibraryBuiltin;$S/lib-$V/Library;$FORTRESS_HOME/ProjectFortress/test_library"
fi
OUT="$D/$N${V:+.$V}.walk.txt"
cd "$D"
{
  echo "# walk.sh $N ${V:-stock} started $(date -u +%FT%TZ); tree $(git -C "$FORTRESS_HOME" rev-parse --short HEAD); nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/.*: /MHz /'); load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | grep -m1 version); FORTRESS_THREADS=$FORTRESS_THREADS"
  JAVA_FLAGS="$JAVA_FLAGS -Dfortress.caches=$C $SP" timeout -k 10 600 "$FORTRESS_HOME/bin/fortress" "$N.fss" 2>&1
  echo "rc=$?"
} > "$OUT"
cat "$OUT"
