#!/bin/bash
# The judge's repair of climb batch 6.5, step 7: the compiled pair for a try ... catch in a do ... also arm (rows 322
# and 497), TryInArmRungGLink.test (link) and XXXTryInArmRungG.test (run, run_out_contains=REACHED), through the
# harness from ProjectFortress/; then the same two .test files over a control copy in a scratch directory whose try
# is outside the do ... also, which must pass, so that the XXX run test goes red. The test's cache entries are removed
# before each pair; the library cache is the main tree's. Then walk on the test.
# usage: bash explorations/compile-ladder/climb-batch-6.5/judge-repair/try-in-arm.sh
source "$(dirname "$0")/../../../experiment/env.sh"
S=$FORTRESS_HOME/tmp/judge-repair-6.5 ; mkdir -p $S
export TMPDIR=$S JAVA_FLAGS="$JAVA_FLAGS -Djava.io.tmpdir=$S"
cd "$FORTRESS_HOME/ProjectFortress"
echo "# nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //') MHz; load at start $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS; $(date -u +%FT%TZ); tree HEAD $(git rev-parse --short=9 HEAD) plus the repair's working-tree files"
filt () { sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at ' | cut -c1-240 ; }
clean () { find ../default_repository/caches -name "*XXXTryInArmRungG*" -exec rm -rf {} + 2>/dev/null ; }
one () { echo "########## [$1] ../bin/fortress junit $2" ; ../bin/fortress junit "$2" 2>&1 | filt | head -40 ; echo "exit=${PIPESTATUS[0]}" ; }
clean
one test compiler_tests/TryInArmRungGLink.test
one test compiler_tests/XXXTryInArmRungG.test
C=$S/try-control ; rm -rf $C ; mkdir -p $C
cp compiler_tests/TryInArmRungGLink.test compiler_tests/XXXTryInArmRungG.test $C/
python3 - compiler_tests/XXXTryInArmRungG.fss $C/XXXTryInArmRungG.fss <<'PY'
import sys
s=open(sys.argv[1]).read()
old="""tryInArm(k: ZZ32): () = do
  do
    note(1)
  also do
    try boomU(k) catch e Oops => note(e.code) end
  end
end"""
new="""tryInArm(k: ZZ32): () = do
  try boomU(k) catch e Oops => note(e.code) end
  do
    note(1)
  also do
    note(0)
  end
end"""
assert s.count(old)==1
open(sys.argv[2],'w').write(s.replace(old,new))
PY
echo "########## the control: the same two .test files over a copy whose try is outside the do ... also; the diff:"
diff compiler_tests/XXXTryInArmRungG.fss $C/XXXTryInArmRungG.fss
clean
one control $C/TryInArmRungGLink.test
one control $C/XXXTryInArmRungG.test
clean
echo "########## walk: ../bin/fortress compiler_tests/XXXTryInArmRungG.fss"
../bin/fortress compiler_tests/XXXTryInArmRungG.fss 2>&1 | filt ; echo "exit=${PIPESTATUS[0]}"
