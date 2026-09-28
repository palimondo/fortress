#!/bin/bash
# walkbound.sh <out.txt>: runs WalkBound.fss under walk, then three copies of it in tmp/ each ending in one of
# its three inferred instantiations of k[\T extends Object\] at a tuple, (), and an arrow, since walk stops at
# the first; each run by ../../walk-one.sh (private cache, machine line, rc=).
set -u
cd "$(dirname "$0")/../../../../.."                          # $FORTRESS_HOME
P=explorations/compile-ladder/rung-result-bounds/probes/walkbound
OUT=${1:?usage}; : > "$OUT"
bash explorations/compile-ladder/rung-result-bounds/walk-one.sh $P/WalkBound.fss tmp/wb.txt "WalkBound as written"
cat tmp/wb.txt >> "$OUT"
for c in tuple unit arrow; do
  case $c in
    tuple) e='println("k at a tuple: " k((1, 2)))' ;;
    unit)  e='println("k at (): " k(()))' ;;
    arrow) e='println("k at an arrow: " (k(fn (y: ZZ32) => y + 1))(1))' ;;
  esac
  d=tmp/wb-$c; rm -rf $d; mkdir -p $d
  awk -v e="    $e" '/^    println\("k at/ { if (!done) { print e; done = 1 } ; next } { print }' $P/WalkBound.fss > $d/WalkBound.fss
  bash explorations/compile-ladder/rung-result-bounds/walk-one.sh $d/WalkBound.fss tmp/wb.txt "WalkBound, last line: k at $c"
  { echo "== the copy's last line: $e" ; cat tmp/wb.txt ; } >> "$OUT"
  rm -rf $d
done
sed -i "s#$(pwd)/##g" "$OUT"
