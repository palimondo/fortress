#!/bin/bash
# The guard and the team's XXX9z through the harness, each .test in its own JVM, their cache entries removed first.
# Run once on a deliberate local fix that is not committed: isEligibleToExtend's new disjunct replaced by the broad
# form (any generic immediate subtrait accepted, the ways note's way 10), ant compileAll and the library-order cache rebuilt.
cd "$FORTRESS_HOME/ProjectFortress"
MINE="XXXComprisesGenericUnlisted Compiled9.z ComprisesGenericSubtrait"
for t in $MINE; do find ../default_repository/caches -name "*$t*" -exec rm -rf {} + 2>/dev/null; done
for t in XXXComprisesGenericUnlisted XXX9z ComprisesGenericSubtrait; do
  echo "########## fortress junit compiler_tests/$t.test"
  ../bin/fortress junit compiler_tests/$t.test 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at '
  echo "exit=${PIPESTATUS[0]}"
done
