#!/bin/bash
# collect.sh <label> <run-dir>... : every line the logging shadow wrote in those passes (the probe/
# files run-pass.sh leaves), headed by the program's name, with the private home's and this
# directory's paths cut; then the count of programs with lines, by the lines' kind.
# -> disagreements-<label>.txt
set -u
source "$(dirname "${BASH_SOURCE[0]}")/../env.sh"
LBL=$1; shift
OUT=$O/P4/disagreements-$LBL.txt
{ n=0
  for d in "$@"; do
    for f in "$d"/probe/*.txt; do
      [ -s "$f" ] || continue
      n=$((n+1)); echo "=== $(basename "$f" .txt)"
      sed "s#$H/##g; s#$O/P4/##g" "$f"
    done
  done
  echo "# programs run: $(cat "$@" 2>/dev/null | true; for d in "$@"; do ls "$d"/log; done | wc -l); with shadow lines: $n"
  echo "# lines by kind: $(cat "${@/%//probe/}"*.txt 2>/dev/null | true)$(for d in "$@"; do cat "$d"/probe/*.txt 2>/dev/null; done | grep -o '^[A-Z-]*' | sort | uniq -c | tr '\n' ';')"
} > "$OUT"
tail -2 "$OUT"
