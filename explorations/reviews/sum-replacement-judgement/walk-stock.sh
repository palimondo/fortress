#!/bin/bash
# walk.sh for a file anywhere in the tree (a team test), stock library, private cache;
# capture to <Name>.stock.walk.txt beside this script.  The control for walk-shadow.sh.
#   explorations/reviews/sum-replacement-judgement/walk-stock.sh <path/Name.fss>
D="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$D/../../experiment/env.sh"
F=$1; N=$(basename "$F" .fss)
S=${SCRATCH:?set SCRATCH to a private directory}
C="$S/cache-stock-$N"; rm -rf "$C"; mkdir -p "$C"
OUT="$D/$N.stock.walk.txt"
cd "$(dirname "$F")"
{
  echo "# walk-stock.sh $F started $(date -u +%FT%TZ); tree $(git -C "$FORTRESS_HOME" rev-parse --short HEAD); nproc=$(nproc); load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | grep -m1 version); FORTRESS_THREADS=$FORTRESS_THREADS"
  JAVA_FLAGS="$JAVA_FLAGS -Dfortress.caches=$C" timeout -k 10 600 "$FORTRESS_HOME/bin/fortress" "$N.fss" 2>&1
  echo "rc=$?"
} > "$OUT"
cat "$OUT"
