#!/bin/bash
# Run one worker probe and keep its output beside it:  probes/worker/run.sh NAME
ROOT="$(cd "$(dirname "$0")/../../../.." && pwd)"
source "$ROOT/experiment/env.sh"
export JAVA_FLAGS="${JAVA_FLAGS:--Xmx4g -Xss64m}"
cd "$(dirname "$0")"
{ echo "\$ FORTRESS_THREADS=1 ./bin/fortress explorations/run-b/probes/worker/$1.fss"
  timeout "${PROBE_TIMEOUT:-600}" "$ROOT/bin/fortress" "$1.fss" 2>&1
  echo "exit: $?"; } |& tee "$1.out"
