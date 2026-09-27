#!/bin/bash
# the compiler tests nearest the edit: every compiler_tests/Nat*.test and XXXNat*.test (rung N's and rung Z's, their expected failures, and this rung's three), each in its own JVM through the harness, its caches removed first unless it only runs (a run-only XXX test runs what its Link twice, sorted before it, built); one summary line per test
# usage: bash probes/near-tests.sh  (from the worktree, with tmp/sh.sh's variables set)
cd "$FORTRESS_HOME/ProjectFortress"
for f in $(ls compiler_tests/ | grep -E '^(XXX)?Nat.*\.test$' | sort); do
  t=${f%.test}
  if grep -qE '^(compile|link)$' compiler_tests/$f; then
    for c in $(sed -n 's/^tests=//p' compiler_tests/$f); do find ../default_repository/caches -name "*$c*" -exec rm -rf {} + 2>/dev/null; done
  fi
  out=$(../bin/fortress junit compiler_tests/$f 2>&1)
  if echo "$out" | grep -q '^OK ('; then v="OK $(echo "$out" | grep -o '^OK ([0-9]* tests\?)')"; else v="FAILED $(echo "$out" | grep -o '^Tests run: .*')"; fi
  printf '%s\t%s\t%s\n' "$t" "$v" "$(echo "$out" | grep -E 'Saw expected|Did not see|Saw failure|Saw wrong|Passed|UNEXPECTED|FAIL' | tr '\n' ' ' | cut -c1-200)"
done
