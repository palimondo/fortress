#!/bin/bash
# collect.sh <scratch-dir>: copies the runs' captures from the scratch directory into captures/, with the
# scratch path replaced by <scratch>; the table and error lists of the count stage (captures/count/) are
# written by hand from count.sh's outputs, the rest here: walk and microGPT runs (captures/walk/), the
# single-program probes (captures/probes/), the interpreter test comparisons (captures/tests/) and the
# distance tables (captures/distance/). A walk capture is cut at 150 lines (a stack overflow repeats). Caches
# and raw logs stay in the scratch directory.
set -u
S=$(cd "${1:?usage}" && pwd); D=$(cd "$(dirname "$0")" && pwd)/captures
m() { sed "s#$S/#<scratch>/#g; s#/home/user/fortress/#<tree>/#g" "$1"; }
mkdir -p "$D/walk" "$D/probes" "$D/tests" "$D/distance"
for f in "$S"/wk/walk-*.txt "$S"/mg/walk-*.txt; do [ -f "$f" ] && m "$f" | head -150 > "$D/walk/$(basename "$f" .txt | sed 's/^walk-//').txt"; done
[ -f "$S/pu.txt" ] && m "$S/pu.txt" > "$D/probes/user-integral.txt"
for t in "$S"/tp/*/machine.txt; do [ -f "$t" ] && m "$t" > "$D/tests/$(basename "$(dirname "$t")")-machine.txt"; done
for f in "$S"/ds/distance-*.txt; do [ -f "$f" ] && m "$f" > "$D/distance/$(basename "$f" .txt | sed 's/^distance-//').txt"; done
ls "$D"/*
