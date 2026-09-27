#!/bin/bash
# tables.sh : measure-D's captures from the finished distance runs (work-dist/stage-L0-<setting>-<stock|fix>.out)
# with distance-triage's own tools: fullerrs.py (every distinct error, whole message), classify.py
# (the classes of distance-triage.md section 2), compare.py (by site with --sites, and by whole message).
set -u
D="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
W=$D/work-dist
P=/home/user/fortress/explorations/perf-probes/prelude/distance-triage
O=$D/dist; mkdir -p $O
for s in walk any; do for v in stock fix; do
  o=$W/stage-L0-$s-$v.out
  grep -q '^exit=0' "$o" || { echo "$o not finished"; continue; }
  python3 $P/fullerrs.py "$o" > $O/full-$s-$v.tsv
  { grep -P '^# |^### done|^### all|^ELAPSED|^exit=|^@@SC CRASH\t|^@@TC DECL-CRASH|^### target-crash' "$o" \
      | sed -e "s#$W/libs/[^/]*/##g" -e "s#$W#<work-dir>#g" | cut -c1-240
    echo "distinct errors: $(wc -l < $O/full-$s-$v.tsv)"; } > $O/run-$s-$v.txt
done; done
python3 $P/classify.py $O/full-walk-stock.tsv $O/full-walk-fix.tsv $O/full-any-stock.tsv $O/full-any-fix.tsv > $O/classes.txt
for s in walk any; do
  python3 $P/compare.py --sites -v $O/full-$s-stock.tsv $O/full-$s-fix.tsv | cut -c1-400 > $O/compare-sites-$s.txt
  python3 $P/compare.py -v $O/full-$s-stock.tsv $O/full-$s-fix.tsv | cut -c1-400 > $O/compare-msgs-$s.txt
  python3 $P/classify.py -v $O/full-$s-fix.tsv | cut -c1-400 > $O/classes-$s-fix.txt
  python3 $P/classify.py -v $O/full-$s-stock.tsv | cut -c1-400 > $O/classes-$s-stock.txt
done
cat $O/classes.txt
