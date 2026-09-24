#!/bin/bash
# usage: runprobe.sh <probe.fss> [FORTRESS_THREADS]  -- runs from the probe's directory, saves <probe>.out beside it
source /home/user/fortress/explorations/experiment/env.sh
cd "$(dirname "$1")"
f="$(basename "$1")"; n="${f%.fss}"
[ -n "$2" ] && export FORTRESS_THREADS="$2"
start=$(date +%s.%N)
../../../bin/fortress "$f" > "$n.out" 2>&1; rc=$?
end=$(date +%s.%N)
echo "== $n: exit $rc, $(printf '%.1f' "$(echo "$end - $start" | bc)") s (threads $FORTRESS_THREADS) =="
head -c 6000 "$n.out"
