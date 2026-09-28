#!/bin/bash
# compare-mg.sh <reference-capture> <capture>...: compares microGPT check outputs line by line with the
# timings masked ("(1234 ms)", "total 556 s", secs=), over the lines both runs printed (a load test cut at
# 600 s prints fewer), and prints for each capture how many check lines it has, how many of them the
# reference also has, whether those are identical, and its verdict line if it printed one.
R=${1:?usage}; shift
norm() { grep -E 'PASS|FAIL|VERDICT' "$1" | sed -E 's/\([0-9]+ ms\)//g; s/total [0-9]+ s//'; }
for f in "$@"; do
  a=$(norm "$R" | wc -l); b=$(norm "$f" | wc -l); k=$(( a < b ? a : b ))
  if diff <(norm "$R" | head -$k) <(norm "$f" | head -$k) > /dev/null; then s="identical"; else s="DIFFER"; fi
  echo "$(basename "$f"): $b check lines, the first $k $s to $(basename "$R")'s; $(grep -m1 VERDICT "$f" || echo 'no verdict (cut or failed)')"
done
