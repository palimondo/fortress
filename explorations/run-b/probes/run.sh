#!/bin/bash
# Run one probe and keep its output beside it:  probes/run.sh NAME [threads]
# (NAME.fss in this directory; output to NAME.out, error text verbatim)
ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
source "$ROOT/experiment/env.sh"
export JAVA_FLAGS="${JAVA_FLAGS:--Xmx4g -Xss64m}"
export FORTRESS_THREADS="${2:-1}"
cd "$(dirname "$0")"
{ echo "\$ FORTRESS_THREADS=$FORTRESS_THREADS ./bin/fortress explorations/run-b/probes/$1.fss"
  timeout "${PROBE_TIMEOUT:-900}" "$ROOT/bin/fortress" "$1.fss" 2>&1
  echo "exit: $?"; } |& tee "$1.out"
