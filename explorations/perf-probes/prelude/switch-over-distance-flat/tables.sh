#!/bin/bash
# The derived captures of switch-over-distance-flat.md, made from a finished run-all.sh work dir.
#
#   explorations/perf-probes/prelude/switch-over-distance-flat/tables.sh <work-dir>
#
# * errors-<set>.txt: ../switch-over-distance/errors.py's tallies over a set of runs;
#   errors-<set>.tsv for the two settings: every distinct error, one row, classified, the
#   message cut at 160 characters and the family column kept only for the overloading,
#   return-type and abstract-method kinds, exactly as the 2026-09-26 tables were cut.
# * typecheck-groups.txt: the components' own type errors in section 2.5's groups, both
#   settings, from the uncut tables.
# * compare-0926-<setting>.txt, compare-sites-<setting>.txt: the 2026-09-26 table against
#   today's, error by error (compare-across.py) and site by site (compare-sites.py).
# * errors-stage-<setting>.txt, compare-stage-<setting>.txt: the one-JVM runs of step `stage`,
#   and each against the separate runs of its setting; compare-{walk,compile}-any.txt: the
#   third setting against the two.
set -u
cd "$(dirname "$0")/../../../.."
P=explorations/perf-probes/prelude/switch-over-distance-flat
O=explorations/perf-probes/prelude/switch-over-distance
W=${1:?usage: tables.sh <work-dir>}

table () {   # table <set-name> <keep-tsv:0|1> <run.out>...
  local name=$1 keep=$2; shift 2
  python3 $O/errors.py "$W/errors-$name.tsv" "$@" > "$P/errors-$name.txt"
  rm -f "$P/errors-$name.tsv"
  [ "$keep" = 1 ] && awk -F'\t' 'BEGIN{OFS="\t"} { if (length($7) > 160) $7 = substr($7, 1, 160) " [...]";
      if (NR > 1 && $1 != "overloading" && $1 != "return-type" && $1 != "abstract-method") $2 = "-"; print }' \
      "$W/errors-$name.tsv" > "$P/errors-$name.tsv"
  return 0
}
table walk 1          "$W"/r1-walk-*.out
table compile 1       "$W"/r1-compile-*.out
table walk-FortressLibrary 0    "$W/r1-walk-FortressLibrary.out"
table compile-FortressLibrary 0 "$W/r1-compile-FortressLibrary.out"
for s in compile walk any; do
  [ -f "$W/r6-stage-$s.out" ] && table stage-$s 0 "$W/r6-stage-$s.out"
done

python3 $P/typecheck-groups.py "$W/errors-walk.tsv" "$W/errors-compile.tsv" > "$P/typecheck-groups.txt"
[ -f "$W/errors-stage-any.tsv" ] && python3 $P/typecheck-groups.py "$W/errors-walk.tsv" "$W/errors-compile.tsv" \
    "$W/errors-stage-any.tsv" > "$P/typecheck-groups.txt"
for s in walk compile; do
  python3 $P/compare-across.py "$O/errors-$s.tsv" "$P/errors-$s.tsv" > "$P/compare-0926-$s.txt"
  python3 $P/compare-sites.py b628871a2 "$O/errors-$s.tsv" "$P/errors-$s.tsv" > "$P/compare-sites-$s.txt"
done
# the one-JVM runs against the separate runs of the same setting (uncut tables); the third
# setting against the other two
[ -f "$W/errors-stage-compile.tsv" ] && python3 $P/compare-across.py "$W/errors-compile.tsv" "$W/errors-stage-compile.tsv" \
    > "$P/compare-stage-compile.txt"
[ -f "$W/errors-stage-walk.tsv" ] && python3 $P/compare-across.py "$W/errors-walk.tsv" "$W/errors-stage-walk.tsv" \
    > "$P/compare-stage-walk.txt"
if [ -f "$W/errors-stage-any.tsv" ]; then
  python3 $P/compare-across.py "$W/errors-walk.tsv" "$W/errors-stage-any.tsv" > "$P/compare-walk-any.txt"
  python3 $P/compare-across.py "$W/errors-compile.tsv" "$W/errors-stage-any.tsv" > "$P/compare-compile-any.txt"
fi

# the api layer and the per-declaration fates of FortressLibrary.fss, both settings
{ for s in walk compile; do
    echo "== $s: distinct api errors (every stage)"
    awk -F'\t' 'NR > 1 && $4 ~ /^api /' "$P/errors-$s.tsv" | wc -l
    echo "== $s: FortressLibrary.fss per declaration (clean, with errors, crashed)"
    f=$W/r1-$s-FortressLibrary.out
    grep '^@@TC DECL-OK' "$f" | awk -F'\t' '{split($4,a,"="); if (a[2]+0 > 0) e++; else c++} END {print c+0, e+0}'
    grep -c '^@@TC DECL-CRASH' "$f"
    echo "== $s: per-stage error lines, as printed (not deduplicated)"
    grep -h '^@@SC STAGE' "$W"/r1-$s-*.out | awk -F'\t' '$4 != "errors=0"' | sort | uniq
  done; } > "$P/layers.txt"
# the work directory's path, where a capture or a table names it
sed -i "s#$W#<work-dir>#g" $P/compare-*.txt $P/r3-dispatch.out $P/r00-make-shadows.txt 2>/dev/null
ls -la $P/errors-* $P/compare-* $P/typecheck-groups.txt $P/layers.txt $P/r6-* | awk '{print $5, $9}'
