#!/bin/bash
# Run one probe component under walk (bin/fortress), private cache, capture <Name>.walk.txt.
#   walk.sh <Name>        (run from anywhere; the probe is <Name>.fss beside this script)
D="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source /home/user/fortress/explorations/experiment/env.sh
N=$1
C="$D/work/cache-walk-$N"
rm -rf "$C"; mkdir -p "$C"
cd "$D"
{
  echo "# walk.sh $N $(date -u +%FT%TZ); tree $(git -C "$FORTRESS_HOME" rev-parse --short HEAD); nproc=$(nproc); load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | grep -m1 version); FORTRESS_THREADS=$FORTRESS_THREADS"
  JAVA_FLAGS="$JAVA_FLAGS -Dfortress.caches=$C" timeout -k 10 600 "$FORTRESS_HOME/bin/fortress" "$N.fss" 2>&1 | grep -v "^Picked up JAVA_TOOL" | cut -c1-600
  echo "rc=${PIPESTATUS[0]}"
} > "$N.walk.txt"
rm -rf "$C"
cat "$N.walk.txt"
