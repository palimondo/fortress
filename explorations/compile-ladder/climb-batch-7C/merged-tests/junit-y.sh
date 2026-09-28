#!/bin/bash
# The gather of climb batch 7C: rung Y's compiler tests and the skeptic's XXXComprisesGenericRenamed, copied into
# compiler_tests/, through the harness in the main tree. [Y] puts rung Y's TypeHierarchyChecker.scala, compiled by
# scalac into $YCLS, ahead of the main tree's build (the base's classes, 11:29 UTC, after 3be1fecd7); [base] runs the
# build as it is. Each test's own cache entries are removed before each run; the library cache is the main tree's.
# usage: YCLS=<class dir> bash explorations/compile-ladder/climb-batch-7C/merged-tests/junit-y.sh
source "$(dirname "$0")/../../../experiment/env.sh"
cd "$FORTRESS_HOME/ProjectFortress"
CP=$(../bin/fortress_classpath | tail -1)
echo "# nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //') MHz; $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS; load at start $(cut -d' ' -f1-3 /proc/loadavg); $(date -u +%FT%TZ)"
run () { # run <label> <prefix> <test>
  local t=$(basename "$3" .test)
  find ../default_repository/caches -name "*$t*" -exec rm -rf {} + 2>/dev/null
  echo "########## [$1] fortress junit $3"
  java $JAVA_FLAGS -Dfile.encoding=UTF-8 -cp "$2$CP" com.sun.fortress.Shell junit "$3" 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at '
  echo "exit=${PIPESTATUS[0]}"
}
for t in XXXComprisesGenericRenamed ComprisesGenericSubtrait XXXComprisesGenericUnlisted; do run Y "$YCLS:" compiler_tests/$t.test; done
run base "" compiler_tests/XXXComprisesGenericRenamed.test
