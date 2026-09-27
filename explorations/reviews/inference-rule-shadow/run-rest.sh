#!/bin/bash
# run-rest.sh : the long runs in the order of what the brief asks first, one at a time (the machine,
# shared with other workers and a batch, stood at a load of 30 on 4 CPUs, so a microGPT run took
# 10 minutes instead of 3): microGPT's A0 pairs, the distance's rule and A0 runs, the rest of
# microGPT, then today's library's stock distances (measurement D ran the same sources and build).
# A job whose capture exists is skipped.
set -u
D="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$D/env.sh"
while read -r kind a b c; do
  [ -z "$kind" ] && continue
  case $kind in
    mg)   [ -s "$D/mg/$b-$a-$c.run.txt" ] && continue; bash "$D/mg.sh" $a $b $c ;;
    dist) [ -s "$D/dist/run-$a-$b-$c.txt" ] && continue; bash "$D/dist.sh" $a $b $c ;;
  esac
done <<'JOBS'
mg A0 c4 stock
mg A0 c4 rule
mg A0 apl stock
mg A0 apl rule
mg L0 apl stock
mg L0 apl rule
dist L0 walk rule
dist A0 walk stock
dist A0 walk rule
dist L0 any rule
dist A0 any stock
dist A0 any rule
mg A0T2 c4 stock
mg A0T2 c4 rule
mg A0T2 apl stock
mg A0T2 apl rule
dist L0 walk stock
dist L0 any stock
JOBS
echo "run-rest done $(date -u +%FT%TZ)"
