#!/bin/bash
# The derived captures of switch-over-distance.md, made from a finished run-all.sh work dir.
#
#   explorations/perf-probes/prelude/switch-over-distance/tables.sh <work-dir>
#
# * r*.out beside this script: each run's raw output without stack-trace lines and without
#   the one-line-per-error @@SC ERR dump (those errors are in the tables below): the header,
#   the per-stage counts (@@SC STAGE), the per-declaration fates (@@TC DECL-OK/-CRASH),
#   the crashes, and code generation's lines.
# * errors-<set>.txt: errors.py's tallies over a set of runs; errors-<set>.tsv, for the sets
#   the note's numbers come from: every distinct error, one row each, classified, the message
#   cut at 160 characters (location, kind and unit are whole; the family column only for the
#   overloading, return-type and abstract-method kinds).
# * compare-*.txt: compare.py between two sets.
set -u
cd "$(dirname "$0")/../../../.."
P=explorations/perf-probes/prelude/switch-over-distance
W=${1:?usage: tables.sh <work-dir>}

for f in "$W"/r0*.out "$W"/r1-*.out "$W"/r2-*.out "$W"/r4-*.out "$W"/r5-*.out "$W"/r3-*.out; do
  [ -f "$f" ] || continue
  grep -v '^@@SC ERR\|^@@CG AT\|^@@CG PREAT\|^@@CG OVLAT\|^@@CG CAT\|^@@TC DECLAT\|^@@SC CRASHAT\|^	at \|^Caused by' "$f" > "$P/$(basename "$f")"
done

table () {   # table <set-name> <keep-tsv:0|1> <run.out>...
  local name=$1 keep=$2; shift 2
  python3 $P/errors.py "$W/errors-$name.tsv" "$@" > "$P/errors-$name.txt"
  rm -f "$P/errors-$name.tsv"
  [ "$keep" = 1 ] && awk -F'\t' 'BEGIN{OFS="\t"} { if (length($7) > 160) $7 = substr($7, 1, 160) " [...]";
      if (NR > 1 && $1 != "overloading" && $1 != "return-type" && $1 != "abstract-method") $2 = "-"; print }' \
      "$W/errors-$name.tsv" > "$P/errors-$name.tsv"
}
table walk 1          "$W"/r1-walk-*.out
table compile 1       "$W"/r1-compile-*.out
table walk-FortressLibrary 0    "$W/r1-walk-FortressLibrary.out"
table compile-FortressLibrary 0 "$W/r1-compile-FortressLibrary.out"
for v in L0-walk FLAT-walk FLAT-compile FLATN-walk FLATN-compile; do
  case $v in L0-*) k=0 ;; *) k=1 ;; esac
  [ -f "$W/r4-$v.out" ] && table $v $k "$W/r4-$v.out"
done

api () { awk -F'\t' 'NR == 1 || $4 ~ /^api /' "$W/errors-$1.tsv" > "$W/errors-$1.api.tsv"; }
for s in walk-FortressLibrary compile-FortressLibrary L0-walk FLAT-walk FLAT-compile FLATN-walk FLATN-compile; do
  [ -f "$W/errors-$s.tsv" ] && api $s
done
cmpr () { python3 $P/compare.py "$W/errors-$1.tsv" "$W/errors-$2.tsv" > "$P/compare-$3.txt"; }
# the control: the unchanged copy against the tree, same setting
cmpr walk-FortressLibrary L0-walk control-tree-L0-walk
# the api layer, flat copy against the unchanged copy
cmpr L0-walk.api FLAT-walk.api api-L0-FLAT-walk
cmpr compile-FortressLibrary.api FLAT-compile.api api-tree-FLAT-compile
# apis and FortressLibrary's component, the copy that keeps Number's declarations
[ -f "$W/errors-FLATN-walk.tsv" ] && cmpr L0-walk FLATN-walk L0-FLATN-walk
[ -f "$W/errors-FLATN-compile.tsv" ] && cmpr compile-FortressLibrary FLATN-compile tree-FLATN-compile
ls -la $P/errors-* $P/compare-* | awk '{print $5, $9}'
