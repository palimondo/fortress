#!/bin/bash
# cap.sh <capture.txt> <label> <threads> <command...>: appends to the capture machine.sh's header, the HEAD and
# git status of Library/, the command line and the command's output (the repair round's captures).
set -u
cd "$(dirname "$0")/../../../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH"
export FORTRESS_HOME="$(pwd)"
unset JAVA_TOOL_OPTIONS
OUT=$1 LABEL=$2 TH=$3; shift 3
{ FORTRESS_THREADS=$TH bash explorations/compile-ladder/rung-overflow-natives/machine.sh "$LABEL"
  echo "HEAD $(git rev-parse --short HEAD); git status --short Library: [$(git status --short Library)]"
  "$@"
  echo; } >> "$OUT" 2>&1
