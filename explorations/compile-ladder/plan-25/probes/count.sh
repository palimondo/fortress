#!/bin/bash
# count.sh <built tree> <out-dir>: F-32's classes counted again on a tree (climb batch 25's planner), made from
# plan-24/probes/count.sh, which is unchanged but for one input: remap.py now reads climb batch 24's table of its base
# (plan-24/probes/classified-base.tsv, 1f5c49b4f), so that each of the 173 bindings that name a helper on climb batch
# 25's base (climb batch 23's 21 and climb batch 24's 152) gets the glue class it named before it moved, and the
# natives probe's classifier sorts it as there. The natives probe's count scripts are read from 4a46fb83a; the
# helpers' signatures are read again with javap from the tree's build, constructors left out; then plan-23's
# movable.py marks each A or B binding whose helper's Java signature, read as walk's world reads it, fits the
# declaration with self first, and the last step adds the column `now` to movable.tsv. Writes <out-dir>/classified.tsv,
# movable.tsv, moved.tsv and helpers-javap.txt; builds and runs no Fortress.
set -eu
T=$(cd "$1" && pwd); O=$(mkdir -p "$2" && cd "$2" && pwd)
HERE=$(cd "$(dirname "$0")" && pwd)
P23=$(cd "$HERE/../../plan-23/probes" && pwd)
P24=$(cd "$HERE/../../plan-24/probes" && pwd)
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
( cd "$O/run" && python3 -B match.py && python3 -B "$P24/remap.py" "$P24/classified-base.tsv" matched.tsv moved.tsv && python3 -B classify.py )
cp "$O/run/classified.tsv" "$O/classified.tsv"; cp "$O/run/moved.tsv" "$O/moved.tsv"
python3 -B "$P23/movable.py" "$O/classified.tsv" "$O/helpers-javap.txt" > "$O/movable.raw.tsv"
python3 -B - "$O/movable.raw.tsv" "$O/moved.tsv" > "$O/movable.tsv" <<'PY'
import csv, sys
moved = {(r['file'], r['line']) for r in csv.DictReader(open(sys.argv[2]), delimiter='\t')}
rows = list(csv.DictReader(open(sys.argv[1]), delimiter='\t'))
f = list(rows[0].keys()) + ['now']
print('\t'.join(f))
for r in rows:
    r['now'] = 'helper' if (r['file'], r['line']) in moved else 'glue'
    print('\t'.join(r[k] for k in f))
PY
rm -f "$O/movable.raw.tsv"
