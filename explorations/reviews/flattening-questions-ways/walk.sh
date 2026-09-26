#!/bin/bash
# Run one probe on the interpreter ("walk") in a private cache, capturing to <Name>.walk.txt.
#   explorations/reviews/flattening-questions-ways/walk.sh <Name>
# From any directory; the probe is <Name>.fss beside this script.
D="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$D/../../experiment/env.sh"
N=$1
C=${SCRATCH:-/tmp}/fqw-cache-walk-$N
rm -rf "$C"; mkdir -p "$C"
cd "$D"
JAVA_FLAGS="$JAVA_FLAGS -Dfortress.caches=$C" timeout -k 10 600 "$FORTRESS_HOME/bin/fortress" "$N.fss" > "$N.walk.txt" 2>&1
echo "rc=$?" >> "$N.walk.txt"
cat "$N.walk.txt"
