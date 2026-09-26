#!/bin/bash
# Skeptic's runner: one probe under walk and through compile/run, reusing the rung's private cache (tmp/probe-cache).
# Usage: run.sh <Probe>   (<Probe>.fss here; captures <Probe>.walk.txt, .compile.txt, .run.txt here)
set -u
R=/home/user/fortress-spec
H=$R/explorations/compile-ladder/rung-spec-route-a/probes/skeptic
S=$R/tmp/probe-cache
C=$S/caches; T=$R/tmp/skeptic-tmp; W=$R/tmp/skeptic-work
mkdir -p "$T" "$W"
[ -f "$S/lib.done" ] || { echo "library cache missing: run probes/examples/run.sh once first"; exit 2; }
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64
export PATH="$JAVA_HOME/bin:$PATH"
export FORTRESS_HOME=$R
unset JAVA_TOOL_OPTIONS
export FORTRESS_THREADS=${FORTRESS_THREADS:-1}
export JAVA_FLAGS="-Xmx2g -Xss64m -Dfortress.caches=$C -Djava.io.tmpdir=$T"
F=$R/bin/fortress
p=$1
cp "$H/$p.fss" "$W/$p.fss"
( cd "$W" && timeout 600 $F walk $p.fss > "$H/$p.walk.txt" 2>&1; echo "rc=$?" >> "$H/$p.walk.txt" )
( cd "$W" && timeout 900 $F compile $p.fss > "$H/$p.compile.txt" 2>&1; echo "rc=$?" >> "$H/$p.compile.txt" )
if tail -1 "$H/$p.compile.txt" | grep -q "rc=0"; then
  CP=$($R/bin/fortress_classpath 2>/dev/null | tail -1)
  ( cd "$W" && timeout 600 java -Xmx2g -Xss64m -Dfile.encoding=UTF-8 -Dfortress.caches=$C -cp "$C/bytecode_cache:$C/bytecode_cache/*:$C/nativewrapper_cache:$CP" com.sun.fortress.runtimeSystem.MainWrapper $p > "$H/$p.run.txt" 2>&1; echo "rc=$?" >> "$H/$p.run.txt" )
else
  rm -f "$H/$p.run.txt"
fi
sed -i "s#$W/##g; s#$R/##g" "$H/$p".*.txt
rm -rf "${T:?}"/fortress*rats
for k in walk compile run; do f=$H/$p.$k.txt; [ -f "$f" ] && { echo "--- $p $k"; head -c 1500 "$f" | head -14; }; done
