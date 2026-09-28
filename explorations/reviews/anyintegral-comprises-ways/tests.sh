#!/bin/bash
# tests.sh <work-dir> <label> <lib-dir> [shadow-classes-dir] [shards]
# Every file of ProjectFortress/tests/ under walk, one JVM per test, through rung H's runner
# (compile-ladder/rung-exclusion-remainder/count-run.sh: private caches per shard, one core per JVM,
# a 600 s timeout per test), with a library copy's FortressLibrary and FortressBuiltin heading
# FORTRESS_SOURCE_PATH and an optional shadow ahead of the classpath. Logs: <work-dir>/<label>/log/<test>.txt.
set -u
D=$(cd "$(dirname "$0")" && pwd); FH=$(cd "$D/../../.." && pwd)
W=${1:?usage}; LBL=${2:?usage}; L=$(cd "${3:?usage}" && pwd); shift 3
SH=""; if [ $# -gt 0 ] && [ -d "$1" ]; then SH="$(cd "$1" && pwd)"; shift; fi
N=${1:-3}
mkdir -p "$W/$LBL"; W=$(cd "$W/$LBL" && pwd)
ls "$FH"/ProjectFortress/tests/*.fss | sed "s#^$FH/##" | sort > "$W/list.txt"
{
  echo "--- tests $LBL, library $L, shadow ${SH:-none}, $N shards, $(date -u +%FT%TZ)"
  echo "nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/^[^:]*: *//'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/^[^:]*: *//') MHz; loadavg $(cut -d' ' -f1-3 /proc/loadavg); FORTRESS_THREADS=1"
} > "$W/machine.txt"
export FORTRESS_SOURCE_PATH=";$L;.;$FH/ProjectFortress/LibraryBuiltin;$FH/Library;$FH/ProjectFortress/test_library"
bash "$FH/explorations/compile-ladder/rung-exclusion-remainder/count-run.sh" "$W" "$W/list.txt" "$SH" "$N" >> "$W/machine.txt" 2>&1
rm -rf "$W"/caches-* "$W"/tmp-*
tail -2 "$W/machine.txt"
