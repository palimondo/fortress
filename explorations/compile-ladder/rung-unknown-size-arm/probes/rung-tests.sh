#!/bin/bash
# rung R's own tests through the harness, each .test in its own JVM, with its caches removed first; then the two walk XXX files through SystemJUTest (-Dtests on a scratch copy) and walked directly
# usage: bash probes/rung-tests.sh  (from the worktree, with tmp/sh.sh's variables set)
cd "$FORTRESS_HOME/ProjectFortress"
MINE="XXXNatUnknownSizeArm XXXNatUnknownSizeVal NatKnownSizeArm"
for t in $MINE; do find ../default_repository/caches -name "*$t*" -exec rm -rf {} + 2>/dev/null; done
for t in $MINE; do
  echo "########## fortress junit compiler_tests/$t.test"
  ../bin/fortress junit compiler_tests/$t.test 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at '
  echo "exit=${PIPESTATUS[0]}"
done
W="$FORTRESS_HOME/tmp/walkxxx"
rm -rf "$W"; mkdir -p "$W"
cp tests/XXXNatSizeExclusionWalk.fss tests/XXXNatBigSizeWalk.fss "$W"/
echo "########## SystemJUTest -Dtests=<scratch copy of the two walk XXX files> (FORTRESS_JUNIT_VERBOSE=1)"
FORTRESS_JUNIT_VERBOSE=1 "$JAVA_HOME/bin/java" $JAVA_FLAGS -Dfile.encoding=UTF-8 -Dtests="$W" -cp "$(../bin/fortress_classpath)" com.sun.fortress.tests.unit_tests.SystemJUTest 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at '
echo "exit=${PIPESTATUS[0]}"
for t in XXXNatSizeExclusionWalk XXXNatBigSizeWalk; do
  echo "########## walk tests/$t.fss"
  ../bin/fortress walk tests/$t.fss 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at '
  echo "exit=${PIPESTATUS[0]}"
done
