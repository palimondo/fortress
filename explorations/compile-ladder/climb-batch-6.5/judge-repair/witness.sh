#!/bin/bash
# The judge's repair of climb batch 6.5, step 4: WitnessIdentityRungG after its ZZ64 branches widen a typed ZZ32.
# Three junit runs, each in a fresh JVM with the test's own cache entries removed first, so that each compiles anew;
# javap of the resulting jar's zeroOf and oneOf templates and of run; one walk run of the .fss.
# usage: bash explorations/compile-ladder/climb-batch-6.5/judge-repair/witness.sh
source "$(dirname "$0")/../../../experiment/env.sh"
export TMPDIR=$FORTRESS_HOME/tmp/judge-repair-6.5 JAVA_FLAGS="$JAVA_FLAGS -Djava.io.tmpdir=$FORTRESS_HOME/tmp/judge-repair-6.5"
mkdir -p "$TMPDIR"
cd "$FORTRESS_HOME/ProjectFortress"
echo "# nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //') MHz; load at start $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS; $(date -u +%FT%TZ); tree HEAD $(git rev-parse --short=9 HEAD) plus the working-tree edit of compiler_tests/WitnessIdentityRungG.fss"
for i in 1 2 3 ; do
  find ../default_repository/caches -name "*WitnessIdentityRungG*" -exec rm -rf {} + 2>/dev/null
  echo "########## run $i: ../bin/fortress junit compiler_tests/WitnessIdentityRungG.test"
  ../bin/fortress junit compiler_tests/WitnessIdentityRungG.test 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at ' | cut -c1-240
  echo "exit=${PIPESTATUS[0]}"
done
J=../default_repository/caches/bytecode_cache/WitnessIdentityRungG.jar
D=$TMPDIR/witness-jar ; rm -rf "$D" ; mkdir -p "$D" ; (cd "$D" && unzip -q "$FORTRESS_HOME/default_repository/caches/bytecode_cache/WitnessIdentityRungG.jar")
export LC_ALL=C.UTF-8
echo "########## javap -c of the last run's jar ($J, $(stat -c %y $J)): zeroOf's template, its invoke lines and the loads before them"
for f in "$D"/*zeroOf*.class ; do javap -c -p "$f" | grep 'invoke\|load\|store\|iconst' | sed 's/^/    /' ; done
echo "########## oneOf's template"
for f in "$D"/*oneOf*.class ; do javap -c -p "$f" | grep 'invoke\|load\|store\|iconst' | sed 's/^/    /' ; done
echo "########## run: every widen call with the two instructions before it"
javap -c -p "$D/WitnessIdentityRungG.class" | awk '/ run\(/{p=1} /^  [a-z].*\(/{if(p && !/ run\(/) p=0} p' | grep -B2 'widen' | sed 's/^/    /'
echo "########## the check: a widen call whose previous instruction is a coerce_* call (must print nothing)"
for f in "$D"/*zeroOf*.class "$D"/*oneOf*.class "$D/WitnessIdentityRungG.class" ; do javap -c -p "$f" | grep 'invoke\|load' | grep -B1 'widen' | grep 'coerce_' ; done
echo "check-end"
echo "########## walk: ../bin/fortress compiler_tests/WitnessIdentityRungG.fss"
../bin/fortress compiler_tests/WitnessIdentityRungG.fss 2>&1 | sed "s#$FORTRESS_HOME/##g" | cut -c1-240
echo "exit=${PIPESTATUS[0]}"
