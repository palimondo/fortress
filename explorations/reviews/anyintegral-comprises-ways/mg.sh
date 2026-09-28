#!/bin/bash
# mg.sh <work-dir> <label> <lib-dir> [shadow-classes-dir] [timeout-seconds]
# The two microGPT checks (explorations/run-c4/src/MicroGptFlatCheck.fss and
# explorations/apl/mg/MicroGptAplCheck.fss) under walk on a library copy, both at once, each through
# walk.sh (an empty private cache, FORTRESS_THREADS=1, the copy heading FORTRESS_SOURCE_PATH): the shape of
# compile-ladder/rung-exclusion-remainder/mg-run.sh. Outputs <work-dir>/walk-<label>-MicroGptFlatCheck.txt
# and -MicroGptAplCheck.txt. The timeout defaults to 5400 s per program.
set -u
D=$(cd "$(dirname "$0")" && pwd)
W=${1:?usage}; LBL=${2:?usage}; L=${3:?usage}; shift 3
SH=""; if [ $# -gt 0 ] && [ -d "$1" ]; then SH="$1"; shift; fi
TO=${1:-5400}
FH=$(cd "$D/../../.." && pwd)
bash "$D/walk.sh" "$W" "$LBL-MicroGptFlatCheck" "$L" "$FH/explorations/run-c4/src/MicroGptFlatCheck.fss" $SH "$TO" > /dev/null 2>&1 &
bash "$D/walk.sh" "$W" "$LBL-MicroGptAplCheck" "$L" "$FH/explorations/apl/mg/MicroGptAplCheck.fss" $SH "$TO" > /dev/null 2>&1 &
wait
for p in MicroGptFlatCheck MicroGptAplCheck; do
  f="$W/walk-$LBL-$p.txt"; echo "$LBL $p: $(grep -c PASS "$f") PASS lines, $(grep -c FAIL "$f") FAIL lines, $(tail -1 "$f")"
done
