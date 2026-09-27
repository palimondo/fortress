#!/bin/bash
# the two expected-failure walk tests on both paths: compiled (compile, run) and walked; the specification's answer is PASS, which the compiled run gives and walk does not (rows 416, 418)
# usage: bash probes/walkxxx-paths.sh  (from the worktree, with tmp/sh.sh's variables set)
cd "$FORTRESS_HOME/ProjectFortress"
for t in XXXNatSizeExclusionWalk XXXNatBigSizeWalk; do
  find ../default_repository/caches -name "*$t*" -exec rm -rf {} + 2>/dev/null
  echo "########## fortress compile tests/$t.fss"
  timeout 300 ../bin/fortress compile tests/$t.fss 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at ' | head -8
  rc=${PIPESTATUS[0]}; echo "exit=$rc"
  if [ "$rc" = 0 ]; then
    echo "########## fortress run $t"
    timeout 120 ../bin/fortress run $t 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at ' | head -8
    echo "exit=${PIPESTATUS[0]}"
  fi
  echo "########## walk tests/$t.fss"
  timeout 300 ../bin/fortress walk tests/$t.fss 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at ' | head -8
  echo "exit=${PIPESTATUS[0]}"
done
