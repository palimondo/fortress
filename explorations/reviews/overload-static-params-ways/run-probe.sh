#!/bin/bash
# Run one probe on both paths, each in a private cache.
#   run-probe.sh <probe-dir> <Name> <scratch> <libcache>
# walk:     bin/fortress <Name>.fss, caches in <scratch>/<Name>/walk
# compiled: bin/fortress compile <Name>.fss into a copy of <libcache> (the compiler's
#           library components already compiled there), then MainWrapper <Name>.
# Prints the two transcripts, bounded, with their exit codes.
set -u
PD=$1 ; N=$2 ; S=$3 ; L=$4
FH=${FORTRESS_HOME:?}
W=$S/$N/walk ; C=$S/$N/comp
rm -rf "$S/$N" ; mkdir -p "$W" ; cp -r "$L" "$C"
CP=$("$FH/bin/fortress_classpath")
cd "$PD"
echo "### walk: bin/fortress $N.fss"
JAVA_FLAGS="$JAVA_FLAGS -Dfortress.caches=$W" timeout 600 "$FH/bin/fortress" "$N.fss" > "$S/$N/walk.txt" 2>&1 ; echo "### walk rc=$?"
head -c 3000 "$S/$N/walk.txt" | sed "s|$FH/||g; s|$PD/||g"
echo "### compile: bin/fortress compile $N.fss"
JAVA_FLAGS="$JAVA_FLAGS -Dfortress.caches=$C" timeout 600 "$FH/bin/fortress" compile "$N.fss" > "$S/$N/compile.txt" 2>&1 ; echo "### compile rc=$?"
head -c 3000 "$S/$N/compile.txt" | sed "s|$FH/||g; s|$PD/||g"
if [ -f "$C/bytecode_cache/$N.jar" ] ; then
  echo "### run: MainWrapper $N"
  timeout 600 java -Xss64m -cp "$C/bytecode_cache:$C/bytecode_cache/*:$C/nativewrapper_cache:$CP" com.sun.fortress.runtimeSystem.MainWrapper "$N" > "$S/$N/run.txt" 2>&1 ; echo "### run rc=$?"
  head -c 3000 "$S/$N/run.txt" | sed "s|$FH/||g; s|$PD/||g"
else
  echo "### run: no $N.jar produced"
fi
