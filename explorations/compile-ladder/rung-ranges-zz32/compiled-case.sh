#!/bin/bash
# compiled-case.sh <tag>: the compiled path's tests of a case without a comparison operator (the rung's grep of
# compiler_tests/: Compiled140, Compiled280, Compiled5.at, Compiled9.ah, Compiled9.ai), in the compiler's world,
# against a private copy of default_repository/caches (rung O's run-compiled.sh shape). Compiled140 and
# Compiled280 are named by no .test file, so each is compiled and run; Compiled9.ah and Compiled9.ai are run
# with the command AfterTypeChecking.test gives them (typecheck); XXX5at.test through the junit harness.
set -u
cd "$(dirname "$0")/../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH"
export FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
T=$1
C="$FORTRESS_HOME/tmp/cc-$T/caches"; J="$FORTRESS_HOME/tmp/cc-$T/tmp"; rm -rf "$FORTRESS_HOME/tmp/cc-$T"; mkdir -p "$J"
cp -a default_repository/caches "$C"
export FORTRESS_CACHES="$C" JAVA_FLAGS="-Xmx2g -Xss64m -Dfortress.caches=$C -Djava.io.tmpdir=$J"
bash explorations/compile-ladder/rung-ranges-zz32/machine.sh "compiled-case $T"
cd ProjectFortress
for n in Compiled140 Compiled280; do
  echo "\$ (cd compiler_tests && fortress compile $n.fss); fortress run $n"
  ( cd compiler_tests && timeout 600 ../../bin/fortress compile "$n.fss" < /dev/null 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at '; echo "compile rc=${PIPESTATUS[0]}" )
  timeout 600 ../bin/fortress run "$n" < /dev/null 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at '
  echo "run rc=${PIPESTATUS[0]}"
done
for n in Compiled9.ah Compiled9.ai; do
  echo "\$ fortress typecheck compiler_tests/$n.fss"
  timeout 600 ../bin/fortress typecheck "compiler_tests/$n.fss" < /dev/null 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at '
  echo "typecheck rc=${PIPESTATUS[0]}"
done
echo "\$ fortress junit compiler_tests/XXX5at.test"
timeout 900 ../bin/fortress junit compiler_tests/XXX5at.test < /dev/null 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at java\.base\|^\s*at junit\.\|^\s*at org\.junit\|^\s*at jdk\.internal'
echo "junit rc=${PIPESTATUS[0]}"
rm -rf "$FORTRESS_HOME/tmp/cc-$T"
