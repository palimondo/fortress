#!/bin/bash
# The distance stage's comparison: this table (run.sh's) against the last landed one.
#
#     explorations/coordinator/tools/distance/compare.sh <last-landed-table|""> <this-table>
#
# Prints one verdict line, then every #kind and #class row whose count moved, with the
# change, and every #crash row that went or came. It is REPORTED and never red: it always
# exits 0, whatever moved, a stale shadow and a run that produced no table included (Pavol,
# answer 11, POSITIONS.md 2026-09-26: a report-only stage, whose job is driving the distance
# down). The verdicts:
#   DISTANCE DOWN|UP|SAME   <last> -> <now>
#   DISTANCE FIRST          no landed table to compare with
#   DISTANCE NO TABLE       this run produced no count, with the table's own reason
#   SETTING CHANGED         the two tables ran different settings: the counts are not like for like
#   SHADOW STALE            a shadow edit no longer matches the tracked sources
# A move of 2 to 4 errors in the components' type errors or in which pair of LEXICO, SQCAP or
# INVERSE declarations an overloading error names is the checker's run-to-run variation
# (switch-over-distance-flat.md section 5), not a change; a crash row whose line numbers
# moved because a rung edited above it prints as one gone and one new.
set -u
OLD=${1:-}; NEW=${2:?usage: compare.sh <last-landed-table> <this-table>}
field () { awk -F'\t' -v t="$1" '$1 == t { sub("^[^\t]*\t", ""); print; exit }' "$2" ; }

now=$(field '#total' "$NEW")
sh=$(field '#shadow' "$NEW")
case "$sh" in STALE*) echo "SHADOW STALE   ${sh#STALE: }" ;; esac
case "$now" in
  ''|none*) echo "DISTANCE NO TABLE   ${now:-no #total row}" ; exit 0 ;;
esac
if [ -z "$OLD" ] || [ ! -f "$OLD" ] ; then
    echo "DISTANCE FIRST   $now distinct errors, $(field '#distance' "$NEW" | cut -d';' -f1); no landed table to compare with"
    exit 0
fi
was=$(field '#total' "$OLD")
ws=$(field '#distance' "$OLD" | cut -d';' -f1); ns=$(field '#distance' "$NEW" | cut -d';' -f1)
[ "$ws" = "$ns" ] || echo "SETTING CHANGED   was $ws, now $ns: the counts below are not like for like"
case "$was" in ''|none*) echo "DISTANCE $now, the landed table has no count (${was:-no #total row})" ; exit 0 ;; esac
if   [ "$now" -lt "$was" ] ; then echo "DISTANCE DOWN   $was -> $now ($((now - was)))"
elif [ "$now" -gt "$was" ] ; then echo "DISTANCE UP   $was -> $now (+$((now - was)))"
else echo "DISTANCE SAME   $now" ; fi
awk -F'\t' '
  function key(r) { return $1 == "#kind" || $1 == "#class" || $1 == "#unit" }
  FNR == NR { if (key()) { k = substr($1, 2) " " $2 ; a[k] = $3 ; nm[k] = $4 ; ord[++n] = k }
              else if ($1 == "#crash") ca[$0] = 1 ; next }
  key() { k = substr($1, 2) " " $2 ; b[k] = $3 ; nm[k] = $4 ; if (!(k in a)) ord[++n] = k }
  $1 == "#crash" { cb[$0] = 1 }
  END {
    for (i = 1; i <= n; i++) { k = ord[i] ; if (seen[k]++) continue
      d = (b[k] + 0) - (a[k] + 0)
      if (d != 0) printf "    %-24s %6d -> %-6d (%+d)%s\n", k, a[k] + 0, b[k] + 0, d, (nm[k] != "" ? "  " nm[k] : "") }
    for (c in ca) if (!(c in cb)) { sub("^#crash\t", "", c) ; print "    crash gone   " c }
    for (c in cb) if (!(c in ca)) { sub("^#crash\t", "", c) ; print "    crash new    " c }
  }' "$OLD" "$NEW"
exit 0
