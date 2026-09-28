#!/bin/bash
# junit-catch-tests.sh: every gated compiled or library test whose component has a catch clause (a grep of the
# three corpora for \bcatch\b, mapped to its .test files), through the harness on the rung's build, one .test per JVM.
source /home/user/fortress-genrt/explorations/compile-ladder/rung-generic-runtime/probes/skeptic/sk.sh
machine
cd $FH/ProjectFortress
for t in compiler_tests/DefaultRenderRungS compiler_tests/IntSemanticsRungB compiler_tests/NatDispArmChecker compiler_tests/XXX9ad compiler_tests/XXX9ae compiler_tests/XXX9af compiler_tests/XXX9ag library_tests/Integer library_tests/IntegralOpsRungN library_tests/MaybeRungM library_tests/TryAtomicRungB; do
  echo "########## $t.test"
  timeout 600 ../bin/fortress junit $t.test 2>&1 | sed "s#$FH/##g" | grep -v '^\s*at ' | grep -E '^\. |OK \(|FAILURES|Tests run|expected failure|Did not see|Exception|Error' | head -20
  echo "exit=${PIPESTATUS[0]}"
done
