#!/bin/bash
# Runs one probe under walk and through compile/run, in a private cache outside the repository.
# Usage: run.sh <Probe>   (<Probe>.fss here; captures <Probe>.walk.txt, .compile.txt, .run.txt here)
# First use builds the compiler-path library jars into the private cache (repo-internals.md recipe).
set -u
R=/home/user/fortress-spec
H=$R/explorations/compile-ladder/rung-spec-route-a/probes/examples
S=$R/tmp/probe-cache
C=$S/caches; T=$S/tmp; W=$S/work
mkdir -p "$C" "$T" "$W"
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64
export PATH="$JAVA_HOME/bin:$PATH"
export FORTRESS_HOME=$R
unset JAVA_TOOL_OPTIONS
export FORTRESS_THREADS=1
export JAVA_FLAGS="-Xmx2g -Xss64m -Dfortress.caches=$C -Djava.io.tmpdir=$T"
F=$R/bin/fortress
lib() {
  [ -f "$S/lib.done" ] && return 0
  ( cd $R/ProjectFortress && for x in LibraryBuiltin/AnyType.fss LibraryBuiltin/CompilerBuiltin.fss \
      ../Library/CompilerLibrary.fss ../Library/CompilerAlgebra.fss ../Library/CompilerSystem.fss; do
      timeout 900 $F compile $x > "$S/lib-$(basename $x).txt" 2>&1; echo "lib $x rc=$?"; done ) && touch "$S/lib.done"
}
p=$1
lib
cp "$H/$p.fss" "$W/$p.fss"
( cd "$W" && timeout 600 $F walk $p.fss > "$H/$p.walk.txt" 2>&1; echo "rc=$?" >> "$H/$p.walk.txt" )
( cd "$W" && timeout 900 $F compile $p.fss > "$H/$p.compile.txt" 2>&1; echo "rc=$?" >> "$H/$p.compile.txt" )
if tail -1 "$H/$p.compile.txt" | grep -q "rc=0"; then
  # bin/fortress run does not read the private cache named by -Dfortress.caches, so the run goes through MainWrapper
  # with the private cache on the class path (as explorations/compiler-probes/vectors/probes/env.sh does).
  CP=$($R/bin/fortress_classpath 2>/dev/null | tail -1)
  ( cd "$W" && timeout 600 java -Xmx2g -Xss64m -Dfile.encoding=UTF-8 -Dfortress.caches=$C -cp "$C/bytecode_cache:$C/bytecode_cache/*:$C/nativewrapper_cache:$CP" com.sun.fortress.runtimeSystem.MainWrapper $p > "$H/$p.run.txt" 2>&1; echo "rc=$?" >> "$H/$p.run.txt" )
else
  rm -f "$H/$p.run.txt"
fi
rm -rf "${T:?}"/fortress*rats
for k in walk compile run; do f=$H/$p.$k.txt; [ -f "$f" ] && { echo "--- $k ($(wc -l < $f) lines)"; head -c 1500 "$f" | head -25; }; done
