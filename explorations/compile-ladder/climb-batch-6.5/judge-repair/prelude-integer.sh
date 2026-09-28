#!/bin/bash
# The judge's repair of climb batch 6.5, step 9: three compile tests for integer rules rung P stated that the compiled
# prelude refuses (XXXNNShiftRungP, XXXNNGcdLcmRungP, XXXZZNarrowRungP). For each: the compile's own message (from
# which compile_err_contains was set), the harness from ProjectFortress/, a control in a scratch directory whose
# missing operation is replaced by a compiled-path equivalent with the same value (the same .test file must go red,
# and the control's compiled run must print PASS), and one walk run of the unmodified file.
# usage: bash explorations/compile-ladder/climb-batch-6.5/judge-repair/prelude-integer.sh
source "$(dirname "$0")/../../../experiment/env.sh"
S=$FORTRESS_HOME/tmp/judge-repair-6.5 ; mkdir -p $S
export TMPDIR=$S JAVA_FLAGS="$JAVA_FLAGS -Djava.io.tmpdir=$S"
cd "$FORTRESS_HOME/ProjectFortress"
echo "# nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //') MHz; load at start $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS; $(date -u +%FT%TZ); tree HEAD $(git rev-parse --short=9 HEAD) plus the repair's working-tree files"
filt () { sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at ' | cut -c1-200 ; }
clean () { find ../default_repository/caches -name "*$1*" -exec rm -rf {} + 2>/dev/null ; }
one () { # the harness's output, its first lines and its verdict at the end
  echo "########## [$1] ../bin/fortress junit $2" ; ../bin/fortress junit "$2" > $S/junit-out.txt 2>&1 ; local rc=$?
  filt < $S/junit-out.txt | head -${3:-24} ; echo "    [...]" ; filt < $S/junit-out.txt | tail -7 ; echo "exit=$rc" ; }
for t in XXXNNShiftRungP XXXNNGcdLcmRungP XXXZZNarrowRungP ; do
  echo "==================== $t"
  clean $t
  echo "########## the compile's message: ../bin/fortress compile compiler_tests/$t.fss"
  (cd compiler_tests && ../../bin/fortress compile $t.fss 2>&1 | filt ; echo "exit=${PIPESTATUS[0]}")
  echo "########## the .test file:" ; cat compiler_tests/$t.test
  clean $t
  one test compiler_tests/$t.test 3
  clean $t
done
control () { # control <test> then pairs of <old> <new> replacements, each old occurring once
  local t=$1 d=$S/int-control-$1 ; shift ; rm -rf $d ; mkdir -p $d
  cp compiler_tests/$t.test $d/ ; cp compiler_tests/$t.fss $d/$t.fss
  while [ $# -gt 0 ] ; do
    python3 -c 'import sys; p=sys.argv[1]; s=open(p).read(); assert s.count(sys.argv[2])==1, sys.argv[2]; open(p,"w").write(s.replace(sys.argv[2],sys.argv[3]))' $d/$t.fss "$1" "$2"
    shift 2
  done
  echo "==================== the control for $t: the same .test file over a copy; the diff:"
  diff compiler_tests/$t.fss $d/$t.fss
  clean $t
  one control $d/$t.test 3
  echo "########## the control's compiled run: ../bin/fortress run $t (from the control's directory)"
  (cd $d && $FORTRESS_HOME/bin/fortress run $t 2>&1 | filt | head -10 ; echo "exit=${PIPESTATUS[0]}")
  clean $t
}
control XXXNNShiftRungP \
  'left32: NN32 = top32 LSHIFT one' 'left32: NN32 = top32 << one' \
  'right32: NN32 = top32 RSHIFT one' 'right32: NN32 = top32 >> one' \
  'left64: NN64 = top64 LSHIFT one' 'left64: NN64 = top64 << one' \
  'right64: NN64 = top64 RSHIFT one' 'right64: NN64 = top64 >> one'
control XXXNNGcdLcmRungP \
  'g32: NN32 = a32 GCD b32' 'g32: NN32 = unsigned(twelve GCD eighteen)' \
  'l32: NN32 = a32 LCM b32' 'l32: NN32 = unsigned(twelve LCM eighteen)' \
  'g64: NN64 = a64 GCD b64' 'g64: NN64 = widen(unsigned(twelve GCD eighteen))' \
  'l64: NN64 = a64 LCM b64' 'l64: NN64 = widen(unsigned(twelve LCM eighteen))'
control XXXZZNarrowRungP \
  'z1: ZZ = one' 'z1: ZZ64 = one' \
  'zm1: ZZ = minusOne' 'zm1: ZZ64 = minusOne' \
  'zk: ZZ = k' 'zk: ZZ64 = k' \
  'zfive: ZZ = five' 'zfive: ZZ64 = five' \
  'zwide: ZZ = zk DOT zk + zfive' 'zwide: ZZ64 = zk DOT zk + zfive'
for t in XXXNNShiftRungP XXXNNGcdLcmRungP XXXZZNarrowRungP ; do
  echo "########## walk: ../bin/fortress compiler_tests/$t.fss"
  ../bin/fortress compiler_tests/$t.fss 2>&1 | filt ; echo "exit=${PIPESTATUS[0]}"
done
