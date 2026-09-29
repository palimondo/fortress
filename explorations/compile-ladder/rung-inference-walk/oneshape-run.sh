#!/bin/bash
# oneshape-run.sh <label>: Fable's one-shape walk programs (explorations/reviews/numerics-plan-fable/probes/
# one-shape/walk/*.fss, the cases OneShapeW.fss gathers), each under walk by walk-run.sh, one JVM at a time
# with a private cache; WALK_HOME passes through (the base home). Writes probes/oneshape-<label>.txt.
set -u
FH=${FORTRESS_HOME:?}
D="$FH/explorations/compile-ladder/rung-inference-walk"
"$D/walk-run.sh" $(ls "$FH"/explorations/reviews/numerics-plan-fable/probes/one-shape/walk/*.fss) \
  | awk -f "$D/condense.awk" | sed "s#tmp/walk-run/[A-Za-z0-9]*/##g" > "$D/probes/oneshape-${1:?label}.txt"
cat "$D/probes/oneshape-$1.txt"
