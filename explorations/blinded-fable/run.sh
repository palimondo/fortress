#!/bin/bash
# Run a Fortress probe and append invocation + output to the transcript.
# Usage: explorations/experiment/worker/run.sh PATH.fss [extra args]
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
source "$ROOT/explorations/experiment/env.sh"
export JAVA_FLAGS="${JAVA_FLAGS:--Xmx6g -Xss64m}"
T="$ROOT/explorations/experiment/worker/transcript.txt"
cd "$ROOT"
{
  echo "======== $(date -u +%Y-%m-%dT%H:%M:%SZ) ./bin/fortress $*"
  timeout "${PROBE_TIMEOUT:-600}" ./bin/fortress "$@" 2>&1
  echo "-------- exit: $?"
} | tee -a "$T"
