#!/bin/bash
# compare.sh <label> <list> <K-baseA> <K-baseB> <run-dir>... : probe P4's log-mode pass against
# probe K's two stock passes on the same library (compile-ladder/plan-n/probe-k/PROBE-K.md section 3;
# its private home was archived from 158aa7dce, whose Library/ and LibraryBuiltin/ are this home's),
# with probe K's compare.py.  The runs' logs are merged into one directory with this home's path
# written as probe K's, so that a path in an error message compares equal.  -> compare-<label>.txt
set -u
source "$(dirname "${BASH_SOURCE[0]}")/../env.sh"
LBL=$1; L=$2; A=$3; B=$4; shift 4
K=/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/pk
M=$X/p4/merged-$LBL; rm -rf "$M"; mkdir -p "$M/log"
for d in "$@"; do
  for f in "$d"/log/*.txt; do sed "s#$H#$K/home#g; s#$d#$M#g" "$f" > "$M/log/$(basename "$f")"; done
done
python3 "$FORTRESS_HOME/explorations/compile-ladder/plan-n/probe-k/compare.py" "$L" "$A" "$B" "$M" --xxx \
  | sed "s#$K/#<K>/#g; s#$X/#<X>/#g" > "$O/P4/compare-$LBL.txt"
tail -12 "$O/P4/compare-$LBL.txt"
