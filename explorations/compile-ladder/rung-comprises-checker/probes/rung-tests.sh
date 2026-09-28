#!/bin/bash
# rung Y's two compiler tests through the harness, each .test in its own JVM, the tests' own cache entries removed first
# usage: bash explorations/compile-ladder/rung-comprises-checker/probes/rung-tests.sh  (from the worktree, the library cache built)
cd "$FORTRESS_HOME/ProjectFortress"
MINE="ComprisesGenericSubtrait XXXComprisesGenericUnlisted"
for t in $MINE; do find ../default_repository/caches -name "*$t*" -exec rm -rf {} + 2>/dev/null; done
for t in $MINE; do
  echo "########## fortress junit compiler_tests/$t.test"
  ../bin/fortress junit compiler_tests/$t.test 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at '
  echo "exit=${PIPESTATUS[0]}"
done
