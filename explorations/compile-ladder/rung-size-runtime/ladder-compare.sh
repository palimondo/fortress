#!/bin/bash
# usage: ladder-compare.sh <ladder-out-dir>
# Each file of explorations/compile-ladder/baseline-2026-09-19/pass-list.txt: its phase in <dir>/results.tsv
# (compile and run exit codes) and its stdout against the 2026-09-19 capture, with the
# nondeterministic "Operation took N ms" timing lines of the nestedTransactions tests left out.
cd "$(dirname "${BASH_SOURCE[0]}")/../../.."
OUT=$1
n=0; same=0; moved=0
norm () { grep -v '^Operation took [0-9.]*ms$' "$1" 2>/dev/null; }
while IFS=$'\t' read -r f ref; do
  case "$f" in \#*|"") continue;; esac
  n=$((n+1))
  corpus=${f%%/*}; base=${f#*/}
  row=$(awk -F'\t' -v c="$corpus" -v b="$base" '$1==c && $2==b' "$OUT/results.tsv")
  crc=$(echo "$row" | cut -f4); rrc=$(echo "$row" | cut -f5)
  if [ "$crc" = "0" ] && [ "$rrc" = "0" ] && diff -q <(norm "$ref") <(norm "$OUT/raw/$corpus/$base.run") >/dev/null; then
    same=$((same+1))
  else
    moved=$((moved+1)); echo "MOVED $f crc=$crc rrc=$rrc"
  fi
done < explorations/compile-ladder/baseline-2026-09-19/pass-list.txt
echo "files=$n pass-and-same-stdout=$same moved=$moved (timing lines left out: $(grep -l '^Operation took' $OUT/raw/tests/*.run 2>/dev/null | wc -l) files carry one)"
