#!/bin/bash
# walk-capture.sh <out.txt> <threads> <file.fss>...: walks each file with the given FORTRESS_THREADS,
# private caches under $TMPDIR, and appends a header, the output and the exit code of each run to <out.txt>.
# With CLASSES=<dir> set, the interpreter classes are taken from <dir> in place of ProjectFortress/build.
# Run from FORTRESS_HOME with the environment of explorations/experiment/env.sh.
set -u
OUT=${1:?out} ; TH=${2:?threads} ; shift 2
C=${TMPDIR:?}/walk-capture-caches-$TH ; mkdir -p "$C" ; [ -f "$C/global.map" ] || printf '\0\0\0\0' > "$C/global.map"
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
B=${CLASSES:-$FORTRESS_HOME/ProjectFortress/build}
CP="$B:${CP#$FORTRESS_HOME/ProjectFortress/build:}"
if [ -n "${CLASSES:-}" ] ; then WHAT="classes $CLASSES" ; else
  WHAT="$(git rev-parse --short HEAD)$( [ -n "$(git status --porcelain ProjectFortress/src)" ] && echo ' plus the working-tree edit to ProjectFortress/src')" ; fi
for f in "$@" ; do
  echo "=== \$ FORTRESS_THREADS=$TH bin/fortress walk $f   ($WHAT, $(date -u +%Y-%m-%dT%H:%M:%SZ)) ===" >> "$OUT"
  FORTRESS_THREADS=$TH FORTRESS_CACHES="$C" timeout -k 10 600 java $JAVA_FLAGS -Dfile.encoding=UTF-8 -cp "$CP" com.sun.fortress.Shell walk "$f" < /dev/null >> "$OUT" 2>&1
  echo "=== exit $? ===" >> "$OUT"
  echo >> "$OUT"
done
