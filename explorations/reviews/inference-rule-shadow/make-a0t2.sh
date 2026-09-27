#!/bin/bash
# make-a0t2.sh : the library copy A0T2, the library batch N would land on: today's library (L0),
# measurement C's tree 1 (the cheap fixes) and tree 2 (scalar ranges over ZZ32 alone, decision 1),
# numerics-plan-coordinator/probes-C/tree1.patch and tree2.patch, then the numeral switch's A0
# (distance-triage/variants.py A0, compile-ladder/plan-6.5/probes/numeral/numeral-lib-A0.patch).
# All three apply cleanly to L0 (2026-09-27, the snapshot of 59a84a385).
set -eu
source "$(dirname "${BASH_SOURCE[0]}")/env.sh"
W=$X/work-dist; C=$FORTRESS_HOME/explorations/reviews/numerics-plan-coordinator/probes-C
rm -rf "$W/libs/A0T2"; cp -r "$W/libs/L0" "$W/libs/A0T2"
patch -p1 -d "$W/libs/A0T2" --no-backup-if-mismatch -s < "$C/tree1.patch"
patch -p1 -d "$W/libs/A0T2" --no-backup-if-mismatch -s < "$C/tree2.patch"
python3 "$FORTRESS_HOME/explorations/perf-probes/prelude/distance-triage/variants.py" "$W/libs/A0T2" A0
