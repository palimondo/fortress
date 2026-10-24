#!/bin/bash
# count.sh <built tree> <out-dir>: F-32's classes counted again on a tree (climb batch 23's planner).
# The count scripts of the natives probe (perf-probes/prelude/natives-shape/count/, read from 4a46fb83a, where they
# left the tree in fc89ee7a5) run unchanged on the tree's library: extract.py lists every live builtinPrimitive binding
# of the nine native files, match.py matches each against the compiler prelude's import-java bodies, classify.py sorts
# them into A (the prelude binds the same operation at the same owner and signature), B (a helper exists), C (a new
# helper needed), D1 (a native I/O object) and D2 (no compiled analogue). The helpers' signatures are read again with
# javap from the tree's build (ProjectFortress/build/com/sun/fortress/nativeHelpers/), constructors left out, in the
# probe's helpers-javap.txt form. Then movable.py, beside this script, marks each A or B binding whose helper's Java
# signature, read through the foreign-type table as walk's world reads it (int ZZ32, long ZZ64, double RR64, float
# RR32, boolean Boolean, String String, BigInteger ZZ, void (), the six special-name helpers NN32, NN64 or Char), fits
# the declaration with self first: the bindings whose string can name the helper as it stands. Writes
# <out-dir>/classified.tsv, movable.tsv and helpers-javap.txt; builds and runs no Fortress.
set -eu
T=$(cd "$1" && pwd); O=$(mkdir -p "$2" && cd "$2" && pwd)
HERE=$(cd "$(dirname "$0")" && pwd)
for f in extract.py match.py classify.py; do
  git -C "$T" show 4a46fb83a:explorations/perf-probes/prelude/natives-shape/count/$f > "$O/$f"
done
( cd "$T/ProjectFortress/build" && for c in com/sun/fortress/nativeHelpers/*.class; do
    n=$(basename "$c" .class); case $n in *'$'*) continue ;; esac
    javap -p -cp . "com.sun.fortress.nativeHelpers.$n" | grep -E '^\s+(public|private|protected|static).*\(' \
      | sed -e 's/^ *//' -e 's/com\.sun\.fortress\.nativeHelpers\.//g' | while read -r l; do printf '%s\t%s\n' "$n" "$l"; done
  done ) | awk -F'\t' '{ if ($2 ~ ("^(public|private|protected) " $1 "\\(")) next; print }' > "$O/helpers-javap.txt"
mkdir -p "$O/run"; cp "$O"/extract.py "$O"/match.py "$O"/classify.py "$O/run/"
( cd "$T" && python3 -B "$O/extract.py" "$O/run" )
( cd "$O/run" && python3 -B match.py && python3 -B classify.py )
cp "$O/run/classified.tsv" "$O/classified.tsv"
python3 -B "$HERE/movable.py" "$O/classified.tsv" "$O/helpers-javap.txt" > "$O/movable.tsv"
