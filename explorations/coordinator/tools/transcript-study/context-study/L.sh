#!/bin/bash
# L.sh PATTERN [maxlines] : grep the base record (FACTS, POSITIONS, INDEX, ledger, maps) for an extended regex
B=base/explorations
P="$1"; N=${2:-3}
for f in coordinator/FACTS.md coordinator/POSITIONS.md coordinator/INDEX.md fortress-gap-ledger.md; do
  c=$(grep -c -i -E -- "$P" $B/$f)
  echo "[$f: $c]"
  grep -n -i -E -- "$P" $B/$f | head -$N | cut -c1-230
done
m=$(grep -r -c -i -E -- "$P" $B/coordinator/map 2>/dev/null | awk -F: '{s+=$2} END{print s}')
echo "[maps: $m]"
