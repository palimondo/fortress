#!/bin/bash
# the checker regression tests rung N's skeptic re-ran beside its own (probes/skeptic/junit-rerun.sh of rung-nat-checker), after the edit: AfterTypeChecking (the type checker over the 97 compiled programs its tests= line names, the sized Compiled1.ah, Compiled1.av and Compiled6.af among them), XXX1p and XXX5z (sized static errors pinned by compile_err_equals), Compiled12.invariantInference
cd "$FORTRESS_HOME/ProjectFortress"
for t in AfterTypeChecking XXX1p XXX5z Compiled12.invariantInference; do
  echo "########## fortress junit compiler_tests/$t.test"
  ../bin/fortress junit compiler_tests/$t.test 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at ' | grep -E '^(OK|Tests run|FAILURES|There w|[0-9]+\))|Saw|Did not|UNEXPECTED'
  echo "exit=${PIPESTATUS[0]}"
done
