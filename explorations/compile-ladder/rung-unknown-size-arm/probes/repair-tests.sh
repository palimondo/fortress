#!/bin/bash
# repair round: the new tests through the harness, each .test in its own JVM with its caches removed first (as probes/rung-tests.sh:6 does);
# XXXNatUnknownSizeFnValue and XXXOverloadedFnValue under the untouched checker (tmp/sk-base/classes first on the classpath, the compile being in-process, FileTests.java:689-691) and under the rung's;
# the rung's three earlier compiler tests re-run; and the harness path of XXXOverloadedFnValue shown red on a scratch copy whose program has no overloaded function value
# usage: bash probes/repair-tests.sh  (from the worktree, with tmp/sh.sh's variables set)
cd "$FORTRESS_HOME/ProjectFortress"
CP=$(../bin/fortress_classpath 2>/dev/null | tail -1)
BASE=$FORTRESS_HOME/tmp/sk-base/classes
clean () { find ../default_repository/caches -name "*$1*" -exec rm -rf {} + 2>/dev/null; }
strip () { sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at '; }
echo "# machine: nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo); $(grep -m1 'cpu MHz' /proc/cpuinfo); load $(cat /proc/loadavg); $("$JAVA_HOME/bin/java" -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS"
for t in XXXNatUnknownSizeFnValue XXXOverloadedFnValue; do
  clean $t
  echo "########## untouched checker: fortress junit compiler_tests/$t.test"
  "$JAVA_HOME/bin/java" $JAVA_FLAGS -Dfile.encoding=UTF-8 -cp "$BASE:$CP" com.sun.fortress.Shell junit compiler_tests/$t.test 2>&1 | strip
  echo "exit=${PIPESTATUS[0]}"
done
for t in XXXNatUnknownSizeFnValue XXXOverloadedFnValue XXXNatUnknownSizeArm XXXNatUnknownSizeVal NatKnownSizeArm; do
  clean $t
  echo "########## rung's checker: fortress junit compiler_tests/$t.test"
  ../bin/fortress junit compiler_tests/$t.test 2>&1 | strip
  echo "exit=${PIPESTATUS[0]}"
done
R="$FORTRESS_HOME/tmp/fnvalue-red"
rm -rf "$R"; mkdir -p "$R"
cp compiler_tests/XXXOverloadedFnValue.test "$R"/
sed -e 's/^hh(x: ZZ32): ZZ32 = 1$//' -e 's/assert(f(z), 1,/assert(f(z), 2,/' compiler_tests/XXXOverloadedFnValue.fss > "$R"/XXXOverloadedFnValue.fss
echo "########## scratch copy with the ZZ32 arm removed, so hh is not overloaded (tmp/fnvalue-red/XXXOverloadedFnValue.fss):"
cat "$R"/XXXOverloadedFnValue.fss
clean XXXOverloadedFnValue
echo "########## rung's checker: fortress junit tmp/fnvalue-red/XXXOverloadedFnValue.test"
../bin/fortress junit "$R"/XXXOverloadedFnValue.test 2>&1 | strip
echo "exit=${PIPESTATUS[0]}"
for t in XXXNatUnknownSizeFnValue XXXOverloadedFnValue XXXNatUnknownSizeArm XXXNatUnknownSizeVal NatKnownSizeArm; do clean $t; done
