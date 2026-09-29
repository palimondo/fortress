#!/bin/bash
# expr-run.sh <label> [jobs]: runs every probes/expr/X*.fss under walk (walk1.sh, a private cache each),
# <jobs> at a time (default 2), each captured to probes/expr/X<Name>.<label>.txt; then one line per probe,
# the program's last printed line or its first error line, into probes/expr/summary.<label>.txt.
D="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
L=${1:?usage}; J=${2:-2}
ls "$D"/probes/expr/X*.fss | xargs -n1 basename | sed 's/\.fss$//' | \
  xargs -P "$J" -I{} env LABEL="$L" bash "$D/walk1.sh" "$D/probes/expr" {} > /dev/null 2>&1
for f in "$D"/probes/expr/X*."$L".txt; do
  n=$(basename "$f" ".$L.txt")
  r=$(grep -m1 "^${n#X}: " "$f" || grep -m1 -i 'error\|exception\|bug\|ambiguous\|no applicable\|not implemented' "$f" | head -c 200)
  echo "$n	$(grep -m1 '^rc=' "$f")	$r"
done > "$D/probes/expr/summary.$L.txt"
