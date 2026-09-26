#!/bin/bash
# Round two of the probes, run one after another (the box is shared with climb batch 5).
D="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export SCRATCH=${SCRATCH:?}
cd "$D"
./comp.sh CastComp > /dev/null 2>&1; echo "CastComp done $(date -u +%T)"
./check.sh ShapesCheck2 flat > /dev/null 2>&1; echo "ShapesCheck2 flat done $(date -u +%T)"
./walk.sh SumWalk sum > /dev/null 2>&1; echo "SumWalk sum done $(date -u +%T)"
./check.sh SumCheck flat-sum > /dev/null 2>&1; echo "SumCheck flat-sum done $(date -u +%T)"
