#!/bin/bash
# The count and distance tables rungs of batches 7 and 7R ran on their base before their edit,
# against the tables the landed gate (or the distance baseline) had measured on the same library.
# Reads committed files and git only. bash reruns.sh > reruns.txt  (from this directory)
cd /home/user/fortress || exit 1
L=explorations/compile-ladder
echo "Library/ and ProjectFortress/ unchanged between the landed table and each base (empty stat = unchanged):"
echo "  distance baseline 091b9b104 -> batch 7 base ff1649cea: [$(git diff --stat 091b9b104 ff1649cea -- Library ProjectFortress | tail -1)]"
echo "  batch 6b landing 533f6524f -> batch 7 base ff1649cea:  [$(git diff --stat 533f6524f ff1649cea -- Library ProjectFortress | tail -1)]"
echo "  batch 7 gate deadeba01 -> batch 7R base 26c5d3dd7:     [$(git diff --stat deadeba01 26c5d3dd7 -- Library ProjectFortress | tail -1)]"
echo
cmp_tab () {  # $1 landed table, $2 rung's pre-edit table
  if diff -q <(grep -v '^#machine\|^#seconds' "$1") <(grep -v '^#machine\|^#seconds' "$2") >/dev/null; then s=identical; else s=DIFFERS; fi
  printf '  %-62s total %-5s %-9s %s s\n' "$2" "$(grep '^#total' "$2" | cut -f2)" "$s" "$(grep '^#seconds' "$2" | cut -f2)"
}
echo "Pre-edit tables against the landed ones (machine and seconds lines left out):"
cmp_tab $L/gate-baseline/distance.txt            $L/rung-tabulate/probes/distance-preedit.txt
cmp_tab $L/gate-baseline/distance.txt            $L/rung-tabulate/probes/distance-preedit-2.txt
cmp_tab $L/gate-baseline/distance.txt            $L/rung-exclusion-remainder/probes/distance-preedit.txt
cmp_tab $L/gate-baseline/distance.txt            $L/rung-result-bounds/probes/distance-preedit.txt
cmp_tab $L/climb-batch-7/gate/distance.txt       $L/rung-ranges-zz32/probes/distance-preedit.txt
cmp_tab $L/climb-batch-6b/gate/checker-count.txt $L/rung-exclusion-remainder/probes/checker-count-preedit.txt
cmp_tab $L/climb-batch-7/gate/checker-count.txt  $L/rung-ranges-zz32/probes/checker-count-preedit.txt
echo
echo "Load at the start of each distance run (1-minute average):"
for f in $L/rung-tabulate/probes/distance-preedit.txt $L/rung-tabulate/probes/distance-preedit-2.txt $L/rung-exclusion-remainder/probes/distance-preedit.txt $L/rung-result-bounds/probes/distance-preedit.txt $L/rung-ranges-zz32/probes/distance-preedit.txt; do
  printf '  %-62s %s\n' "$f" "$(grep '^#machine' $f | grep -o 'load at start [0-9.]*')"
done
echo
echo "The per-site list a rung needs to call a new site unmasked or caused is not committed by the gate:"
echo "  committed gate table: $(wc -l < $L/climb-batch-7/gate/distance.txt) lines; a rung's committed per-site list: $(wc -c < $L/rung-ranges-zz32/probes/distance/errors-preedit.txt) bytes ($L/rung-ranges-zz32/probes/distance/errors-preedit.txt)"
echo
echo "The two DIFFERS lines, read:"
echo "  rung H's count: the same totals; it adds the #cache line, the stage's new setting at batch 7's launch (a changed setting, so a run it needed):"
diff <(grep -v '^#machine\|^#seconds' $L/climb-batch-6b/gate/checker-count.txt) <(grep -v '^#machine\|^#seconds' $L/rung-exclusion-remainder/probes/checker-count-preedit.txt) | sed 's/^/    /'
echo "  rung A's second base run is its own measurement of run-to-run variation (1,745 against 1,747, at load 15), not a repeat."
