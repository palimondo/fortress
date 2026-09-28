#!/bin/bash
# walk.sh <work-dir> <label> <lib-dir> <program.fss> [shadow-classes-dir] [timeout-seconds]
# Runs one program under walk, from the program's own directory, with a library copy's
# FortressLibrary and FortressBuiltin heading FORTRESS_SOURCE_PATH (variant-walk.sh's path, rung H),
# an empty private cache, JAVA_FLAGS -Xmx4g -Xss64m, FORTRESS_THREADS=1, and an optional shadow classes
# directory ahead of the tree's classes (the launcher's command, `java ... com.sun.fortress.Shell <file>`,
# written out so that the shadow can go first). Output: <work-dir>/walk-<label>.txt, headed by the machine
# line and ended by rc= and secs=. The timeout (default 5400 s) cuts a long check short: a cut run
# says only how far it got.
set -u
cd "$(dirname "$0")/../../.."                               # $FORTRESS_HOME
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
W=${1:?usage}; LBL=${2:?usage}; L=$(cd "${3:?usage}" && pwd); P=$(cd "$(dirname "${4:?usage}")" && pwd)/$(basename "$4"); shift 4
SH=""; if [ $# -gt 0 ] && [ -d "$1" ]; then SH="$(cd "$1" && pwd):"; shift; fi
TO=${1:-5400}
mkdir -p "$W"; W=$(cd "$W" && pwd)
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
C="$W/caches-$LBL"; T="$W/tmp-$LBL"; rm -rf "$C" "$T"; mkdir -p "$C" "$T"; printf '\0\0\0\0' > "$C/global.map"
O="$W/walk-$LBL.txt"
{
  echo "--- walk $(basename "$P"), library $L, shadow ${SH:-none} $(date -u +%FT%TZ)"
  echo "nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/^[^:]*: *//'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/^[^:]*: *//') MHz; loadavg $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS"
  S=$(date +%s)
  ( cd "$(dirname "$P")" && FORTRESS_SOURCE_PATH=";$L;.;$FORTRESS_HOME/ProjectFortress/LibraryBuiltin;$FORTRESS_HOME/Library;$FORTRESS_HOME/ProjectFortress/test_library" \
    FORTRESS_CACHES="$C" timeout -k 10 "$TO" java -Xmx4g -Xss64m -Djava.io.tmpdir="$T" -Dfile.encoding=UTF-8 \
      -cp "$SH$CP" com.sun.fortress.Shell "$(basename "$P")" < /dev/null )
  echo "rc=$? secs=$(( $(date +%s) - S ))"
} > "$O" 2>&1
rm -rf "$C" "$T"
grep -c PASS "$O" | sed 's/^/PASS lines: /'; grep -m3 -i "error\|exception\|overflow" "$O" | cut -c1-240; tail -1 "$O"
