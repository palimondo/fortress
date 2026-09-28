#!/bin/bash
# probe.sh <work-dir> <label> <lib-dir|compiler> <probe.fss> [shadow-classes-dir] [-Dname=value ...]
# Type-checks one probe program with the compiled checker. With a library directory, in the one
# library's world: WorldFlip (the checker-count stage's driver) on a copy of the probe placed beside a
# copy of that directory's FortressLibrary and FortressBuiltin, so that they head the source path.
# With "compiler", in the compiler's own world: `Shell typecheck` from the probe's own directory.
# Prints the probe's own errors (every error whose location is in the probe file) and its error count
# line; the whole output is kept in <work-dir>/probe-<label>.txt. Private caches, deleted after.
set -u
cd "$(dirname "$0")/../../.."                               # $FORTRESS_HOME
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
W=${1:?usage}; LBL=${2:?usage}; L=${3:?usage}; P=$(cd "$(dirname "${4:?usage}")" && pwd)/$(basename "$4"); shift 4
SH=""; if [ $# -gt 0 ] && [ -d "$1" ]; then SH="$(cd "$1" && pwd):"; shift; fi
mkdir -p "$W"; W=$(cd "$W" && pwd)
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
T=explorations/coordinator/tools/checker-count
if [ ! -f "$W/classes/WorldFlip.class" ]; then
  mkdir -p "$W/classes"
  javac -nowarn -cp "$CP" -d "$W/classes" "$T/WorldFlip.java" \
        "$T/shadow-src/com/sun/fortress/compiler/StaticChecker.java" > "$W/javac.txt" 2>&1 || { cat "$W/javac.txt"; exit 1; }
fi
C="$W/caches-$LBL"; TMP="$W/tmp-$LBL"; rm -rf "$C" "$TMP"; mkdir -p "$C" "$TMP"
name=$(basename "$P")
if [ "$L" = compiler ]; then
  ( cd "$(dirname "$P")" && timeout -k 10 900 java -Xmx4g -Xss64m -Djava.io.tmpdir="$TMP" -Dfortress.caches="$C" "$@" \
      -cp "$SH$CP" com.sun.fortress.Shell typecheck "$name" ) > "$W/probe-$LBL.txt" 2>&1
else
  L=$(cd "$L" && pwd); D="$W/pdir-$LBL"; rm -rf "$D"; mkdir -p "$D"
  cp "$L"/Fortress*.fs? "$P" "$D"/
  timeout -k 10 1800 java -Xmx4g -Xss64m -Djava.io.tmpdir="$TMP" -Dfortress.caches="$C" \
      -Dfortress.analyzer.overload.cache=false "$@" \
      -cp "$W/classes:$SH$CP" WorldFlip "$D/$name" > "$W/probe-$LBL.txt" 2>&1
fi
echo "rc=$?" >> "$W/probe-$LBL.txt"
rm -rf "$C" "$TMP"
python3 explorations/reviews/anyintegral-comprises-ways/errlist.py "$W/probe-$LBL.txt" "${D:-$(dirname "$P")}" | grep -F "$name:" || echo "(no error in $name)"
grep -E "File $name has [0-9]+ errors?\.|^rc=" "$W/probe-$LBL.txt" | tr '\n' ' '; echo
