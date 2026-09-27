#!/bin/bash
# tables-dist.sh : the distance captures, compared (distance-triage's tools): per library and setting,
# classify.py over stock and rule (dist/classes-<lib>.txt, four columns: walk stock, walk rule, any
# stock, any rule), compare.py by site and by whole message (dist/compare-{sites,msgs}-<lib>-<setting>.txt),
# each run's classes with every error (dist/classes-<lib>-<setting>-<variant>.txt), and today's
# library's rule runs against measurement D's stock and expected-type-only runs.
set -u
D="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"; O=$D/dist
P=/home/user/fortress/explorations/perf-probes/prelude/distance-triage
for lib in L0 A0; do
  F=""; for s in walk any; do for v in stock rule; do [ -s $O/full-$lib-$s-$v.tsv ] && F="$F $O/full-$lib-$s-$v.tsv"; done; done
  [ -n "$F" ] && python3 $P/classify.py $F > $O/classes-$lib.txt
  for s in walk any; do
    for v in stock rule; do [ -s $O/full-$lib-$s-$v.tsv ] && python3 $P/classify.py -v $O/full-$lib-$s-$v.tsv | cut -c1-400 > $O/classes-$lib-$s-$v.txt; done
    if [ -s $O/full-$lib-$s-stock.tsv ] && [ -s $O/full-$lib-$s-rule.tsv ]; then
      python3 $P/compare.py --sites -v $O/full-$lib-$s-stock.tsv $O/full-$lib-$s-rule.tsv | cut -c1-400 > $O/compare-sites-$lib-$s.txt
      python3 $P/compare.py -v $O/full-$lib-$s-stock.tsv $O/full-$lib-$s-rule.tsv | cut -c1-400 > $O/compare-msgs-$lib-$s.txt
    fi
  done
done
# today's library against measurement D's runs of the same sources: its stock checker and its shadow
# (the expected type alone), numerics-plan-coordinator/probes-D/dist/full-<setting>-{stock,fix}.tsv
PDD=/home/user/fortress/explorations/reviews/numerics-plan-coordinator/probes-D/dist
for s in walk any; do
  [ -s $O/full-L0-$s-rule.tsv ] || continue
  for v in stock fix; do
    python3 $P/compare.py --sites -v $PDD/full-$s-$v.tsv $O/full-L0-$s-rule.tsv | cut -c1-400 > $O/compare-sites-L0-$s-D$v-vs-rule.txt
  done
done
ls $O
