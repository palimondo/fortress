#!/bin/bash
# Run a Fortress probe and append invocation + output to the transcript.
# Usage: experiment/worker/run.sh PATH.fss [extra args]
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
source "$ROOT/experiment/env.sh"
T="$ROOT/experiment/worker/transcript.txt"
cd "$ROOT"
{
  echo "======== $(date -u +%Y-%m-%dT%H:%M:%SZ) ./bin/fortress $*"
  timeout "${PROBE_TIMEOUT:-600}" ./bin/fortress "$@" 2>&1
  echo "-------- exit: $?"
} | tee -a "$T"
