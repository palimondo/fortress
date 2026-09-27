#!/bin/bash
# second judgement: the rung's five compiler tests through the harness, each in its own JVM with its caches removed first,
# under the rung's checker and (the two repair-round tests) under the untouched checker's shadow (tmp/sk-base/classes first on the classpath)
# usage: bash sk2-tests.sh  (from the worktree, with tmp/sh.sh's variables set)
cd "$FORTRESS_HOME/ProjectFortress"
CP=$(../bin/fortress_classpath 2>/dev/null | tail -1)
BASE=$FORTRESS_HOME/tmp/sk-base/classes
clean () { find ../default_repository/caches -name "*$1*" -exec rm -rf {} + 2>/dev/null; }
strip () { sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at '; }
echo "# machine: nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo); $(grep -m1 'cpu MHz' /proc/cpuinfo); load $(cat /proc/loadavg); $("$JAVA_HOME/bin/java" -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS"
for t in XXXNatUnknownSizeArm XXXNatUnknownSizeVal XXXNatUnknownSizeFnValue XXXOverloadedFnValue NatKnownSizeArm; do
  clean $t
  echo "########## rung's checker: $t"
  ../bin/fortress junit compiler_tests/$t.test 2>&1 | strip
done
for t in XXXNatUnknownSizeFnValue XXXOverloadedFnValue; do
  clean $t
  echo "########## untouched checker (shadow): $t"
  "$JAVA_HOME/bin/java" $JAVA_FLAGS -Dfile.encoding=UTF-8 -cp "$BASE:$CP" com.sun.fortress.Shell junit compiler_tests/$t.test 2>&1 | strip
done
for t in XXXNatUnknownSizeArm XXXNatUnknownSizeVal XXXNatUnknownSizeFnValue XXXOverloadedFnValue NatKnownSizeArm; do clean $t; done
