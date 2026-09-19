#!/bin/bash
# usage: run1.sh <probefile.fss>
set -u
OUT=/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/maybe-probe
source "$OUT/env.sh"
f="$1"
base=$(basename "$f" .fss)
comp=$(sed -n 's/^[[:space:]]*component[[:space:]]\+\([A-Za-z0-9_.]\+\).*/\1/p' "$f" | head -1)
log="$OUT/captures/$base.txt"
mkdir -p "$OUT/captures"
{
echo "=== fortress walk ==="
cd /home/user/fortress/ProjectFortress
timeout -k 5 120 ../bin/fortress "$f" 2>&1
echo "walk-rc=$?"
echo "=== fortress compile ==="
timeout -k 5 200 ../bin/fortress compile "$f" 2>&1
crc=$?
echo "compile-rc=$crc"
if [ "$crc" -eq 0 ]; then
  echo "=== fortress run ==="
  timeout -k 5 60 ../bin/fortress run "$comp" 2>&1
  echo "run-rc=$?"
fi
} > "$log" 2>&1
echo "--- $base ---"
cat "$log"
