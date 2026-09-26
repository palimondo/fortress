#!/bin/bash
# Round three, one after another: the reordered walk probe of the replacement; the fixed
# cast probe; the interpreter shadow (erase to top) on the witness probe, on the
# replacement's walk probe and on three team tests, each team test also stock as control.
D="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"; export SCRATCH=${SCRATCH:?}; cd "$D"
T="$D/../../../ProjectFortress/tests"
./walk.sh SumWalk sum > /dev/null 2>&1; echo "SumWalk sum $(date -u +%T)"
./comp.sh CastComp > /dev/null 2>&1; echo "CastComp $(date -u +%T)"
./walk-shadow.sh "$D/WitnessWalk.fss" > /dev/null 2>&1; echo "WitnessWalk shadow $(date -u +%T)"
./walk-shadow.sh "$D/SumWalk.fss" sum > /dev/null 2>&1; echo "SumWalk sum shadow $(date -u +%T)"
for t in simpleSum setSum ArrayListQuick; do
  ./walk-stock.sh "$T/$t.fss" > /dev/null 2>&1; echo "$t stock $(date -u +%T)"
  ./walk-shadow.sh "$T/$t.fss" > /dev/null 2>&1; echo "$t shadow $(date -u +%T)"
done
