#!/bin/bash
# The first run wrote the ruling's one-line typecase, which the parser refuses (codegen-crash-oneline.txt); the test now writes its clauses on lines of their own.
# The judge's repair of climb batch 6.5, step 8's tests: XXXTypecaseBodyCoerceRungG (row 340's own shape) and
# XXXTupleClauseSpreadRungG (the skeptic's tuple shape), each a compile test expecting the code generator's crash,
# through the harness from ProjectFortress/; each shown red on a control that compiles, the same .test file over an
# XXX-named copy in a scratch directory (the typecase wrapped in do ... end; SkTupleSpread.fss's plain local spread),
# whose compiled run is also shown; then walk on each test.
# usage: bash explorations/compile-ladder/climb-batch-6.5/judge-repair/codegen-crash.sh
source "$(dirname "$0")/../../../experiment/env.sh"
S=$FORTRESS_HOME/tmp/judge-repair-6.5 ; mkdir -p $S
export TMPDIR=$S JAVA_FLAGS="$JAVA_FLAGS -Djava.io.tmpdir=$S"
cd "$FORTRESS_HOME/ProjectFortress"
echo "# nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //') MHz; load at start $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS; $(date -u +%FT%TZ); tree HEAD $(git rev-parse --short=9 HEAD) plus the repair's working-tree files"
filt () { sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at ' | cut -c1-200 ; }
clean () { find ../default_repository/caches -name "*$1*" -exec rm -rf {} + 2>/dev/null ; }
one () { echo "########## [$1] ../bin/fortress junit $2" ; ../bin/fortress junit "$2" 2>&1 | filt | head -${3:-30} ; echo "exit=${PIPESTATUS[0]}" ; }
control () { # control <test> <python replacement old> <new>
  local t=$1 d=$S/crash-control-$1 ; rm -rf $d ; mkdir -p $d
  cp compiler_tests/$t.test $d/
  python3 -c 'import sys; s=open(sys.argv[1]).read(); assert s.count(sys.argv[3])==1; open(sys.argv[2],"w").write(s.replace(sys.argv[3],sys.argv[4]))' compiler_tests/$t.fss $d/$t.fss "$2" "$3"
  echo "########## the control for $t: the same .test file over a copy; the diff:"
  diff compiler_tests/$t.fss $d/$t.fss
  clean $t
  one control $d/$t.test 20
  echo "########## the control's compiled run: ../bin/fortress run $t (from the control's directory)"
  (cd $d && $FORTRESS_HOME/bin/fortress run $t 2>&1 | filt | head -10 ; echo "exit=${PIPESTATUS[0]}")
  clean $t
}
for t in XXXTypecaseBodyCoerceRungG XXXTupleClauseSpreadRungG ; do
  echo "==================== $t"
  clean $t
  one test compiler_tests/$t.test 12
  clean $t
done
control XXXTypecaseBodyCoerceRungG 'f(o: S): ZZ32 =
  typecase o of
      A => 1
      else => 0
    end' 'f(o: S): ZZ32 = do
  typecase o of
      A => 1
      else => 0
    end
end'
control XXXTupleClauseSpreadRungG '  t: (ZZ32, String) = (z, "s")
  typecase t of
      p: (ZZ32, String) => second(p)
      else => "other"
    end' '  p: (ZZ32, String) = (z, "s")
  second(p)'
for t in XXXTypecaseBodyCoerceRungG XXXTupleClauseSpreadRungG ; do
  echo "########## walk: ../bin/fortress compiler_tests/$t.fss"
  ../bin/fortress compiler_tests/$t.fss 2>&1 | filt ; echo "exit=${PIPESTATUS[0]}"
done
for t in XXXTypecaseBodyCoerceRungG XXXTupleClauseSpreadRungG ; do
  echo "########## the crash's own text: ../bin/fortress compile compiler_tests/$t.fss, its first lines, and the cause the dump ends with"
  clean $t
  (cd compiler_tests && ../../bin/fortress compile $t.fss > $S/crash-$t.txt 2>&1 ; echo "exit=$?" >> $S/crash-$t.txt)
  head -4 $S/crash-$t.txt | filt
  grep -m3 'Caused by\|ArrayIndexOutOfBounds\|Frame.merge' $S/crash-$t.txt | filt
  tail -1 $S/crash-$t.txt
  clean $t
done
