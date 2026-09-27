#!/bin/bash
# The captures of distance-triage.md from a finished work directory of run.sh.  From anywhere:
#
#   explorations/perf-probes/prelude/distance-triage/tables.sh <work-dir>
#
# Every run <work-dir>/stage-<variant>-<setting>[-num].out is first reduced to its distinct
# errors with whole messages, <work-dir>/full-<run>.tsv (fullerrs.py; kept in the work
# directory, about 0.7 MB each).  Written here:
#   runs.txt              each run: its machine and load lines, seconds per component, its
#                         crashes, its distinct errors
#   classes.txt           the control's errors by class, both settings (classify.py)
#   classes-walk.txt, classes-compile.txt   the control's errors one per line with their class
#                         (each line cut at 220 characters)
#   variants.txt          every walk-setting run's count by class, the control first
#   compare-<run>.txt     what each variant changed against the control, by class and by site,
#                         line-mapped (compare.py --sites --map; each line cut at 220)
#   new-sites.txt         the sites that appeared since 2026-09-26, by class (new-sites.py)
set -u
cd "$(dirname "$0")/../../../.."
P=explorations/perf-probes/prelude/distance-triage
W=${1:?usage: tables.sh <work-dir>}
: > "$P/runs.txt"
for o in "$W"/stage-*.out; do
  r=$(basename "$o" .out); r=${r#stage-}
  grep -q '^exit=0' "$o" || { echo "== $r: not finished (stopped or failed), left out; see vec-thread-dump.txt" >> "$P/runs.txt"; rm -f "$W/full-$r.tsv"; continue; }
  python3 $P/fullerrs.py "$o" > "$W/full-$r.tsv"
  { echo "== $r"
    grep '^# \|^### done\|^### all\|^ELAPSED\|^exit=\|^@@SC CRASH\|^@@TC DECL-CRASH\|^### target-crash' "$o" \
      | sed -e "s#$W/libs/[^/]*/##g" -e "s#$W#<work-dir>#g" -e "s#$PWD/##g" | cut -c1-240
    echo "distinct errors: $(wc -l < "$W/full-$r.tsv")"; echo; } >> "$P/runs.txt"
done
python3 $P/classify.py "$W/full-L0-walk.tsv" "$W/full-L0-compile.tsv" > "$P/classes.txt"
python3 $P/classify.py -v "$W/full-L0-walk.tsv" | cut -c1-220 > "$P/classes-walk.txt"
python3 $P/classify.py -v "$W/full-L0-compile.tsv" | cut -c1-220 > "$P/classes-compile.txt"
V="$W/full-L0-walk.tsv"; for f in "$W"/full-*-walk*.tsv; do [ "$f" = "$W/full-L0-walk.tsv" ] || V="$V $f"; done
python3 $P/classify.py $V > "$P/variants.txt"
for f in "$W"/full-*.tsv; do
  r=$(basename "$f" .tsv); r=${r#full-}; case $r in L0-walk|L0-compile) continue ;; esac
  v=${r%-walk*}; v=${v%-compile*}; s=walk; case $r in *-compile*) s=compile ;; esac
  python3 $P/compare.py --sites -v "$W/full-L0-$s.tsv" "$f" --map "$W/libs/L0" "$W/libs/$v" | cut -c1-220 > "$P/compare-$r.txt"
done
python3 $P/new-sites.py "$W/full-L0-walk.tsv" > "$P/new-sites.txt"
ls "$P"
