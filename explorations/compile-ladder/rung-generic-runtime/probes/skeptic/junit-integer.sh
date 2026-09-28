#!/bin/bash
# junit-integer.sh: library_tests/Integer.test (Integer3, Integer4, IntegerChoose1 and 2 have catch clauses) on the
# rung's build, its run lines and its summary line kept (the harness exits 0 on failure too).
source /home/user/fortress-genrt/explorations/compile-ladder/rung-generic-runtime/probes/skeptic/sk.sh
machine
cd $FH/ProjectFortress
timeout 900 ../bin/fortress junit library_tests/Integer.test 2>&1 | sed "s#$FH/##g" | grep -E '^\. run|OK \(|FAILURES|Tests run|^[0-9]+\) '
