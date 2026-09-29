#!/bin/bash
# xxx-compiled.sh: rung M's home-2 test ProjectFortress/compiler_tests/XXXMaxNN32IntoZZ64RungM, in the shape of the
# judge's repair of climb batch 6.5 (explorations/compile-ladder/climb-batch-6.5/judge-repair/prelude-integer.sh):
# the compiled run of the unmodified file (its failing assertion), the harness over its two .test files (the link
# companion MaxNN32IntoZZ64RungMLink.test, then the XXX file: an expected failure), a control in a scratch directory whose four expected types are the compiler prelude's answer "ZZ" (the
# same .test file over it must go red, "Did not see expected failure", and its compiled run must print PASS), and
# one walk run of the unmodified file on this tree's one library.
# usage: bash explorations/compile-ladder/rung-integer-minmax/xxx-compiled.sh > <capture>.txt 2>&1
set -u
cd "$(dirname "$0")/../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
S=$FORTRESS_HOME/tmp/xxx-compiled ; rm -rf $S ; mkdir -p $S
export TMPDIR=$S JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$S"
t=XXXMaxNN32IntoZZ64RungM
cd "$FORTRESS_HOME/ProjectFortress"
echo "# nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //') MHz; load at start $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS; $(date -u +%FT%TZ); tree $(git rev-parse --short HEAD) plus the working-tree files"
filt () { sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at ' | cut -c1-220 ; }
clean () { find ../default_repository/caches -name "*$1*" -exec rm -rf {} + 2>/dev/null ; }
one () { echo "########## [$1] ../bin/fortress junit $2" ; ../bin/fortress junit "$2" > $S/junit-out.txt 2>&1 ; local rc=$?
  filt < $S/junit-out.txt | head -${3:-24} ; echo "    [...]" ; filt < $S/junit-out.txt | tail -7 ; echo "exit=$rc" ; }
echo "==================== $t"
clean $t
echo "########## the compiled run: ../bin/fortress compile, then run, from compiler_tests/"
(cd compiler_tests && ../../bin/fortress compile $t.fss 2>&1 | filt ; echo "compile exit=${PIPESTATUS[0]}" ; ../../bin/fortress run $t 2>&1 | filt | head -12 ; echo "run exit=${PIPESTATUS[0]}")
echo "########## the two .test files, the link companion first as the suite sorts them:" ; cat compiler_tests/${t#XXX}Link.test ; echo "--" ; cat compiler_tests/$t.test
clean $t
one link compiler_tests/${t#XXX}Link.test 6
one test compiler_tests/$t.test 6
clean $t
d=$S/control ; mkdir -p $d ; cp compiler_tests/$t.test compiler_tests/${t#XXX}Link.test $d/ ; sed 's/, "ZZ64", /, "ZZ", /' compiler_tests/$t.fss > $d/$t.fss
echo "==================== the control: the same .test file over a copy whose four expected types are ZZ; the diff:"
diff compiler_tests/$t.fss $d/$t.fss
one control-link $d/${t#XXX}Link.test 6
one control $d/$t.test 6
echo "########## the control's compiled run: ../bin/fortress run $t (from the control's directory)"
(cd $d && $FORTRESS_HOME/bin/fortress run $t 2>&1 | filt | head -10 ; echo "exit=${PIPESTATUS[0]}")
clean $t
echo "########## walk: ../bin/fortress compiler_tests/$t.fss (the one library of this tree)"
mkdir -p $S/walk-caches ; printf '\0\0\0\0' > $S/walk-caches/global.map
(cd compiler_tests && FORTRESS_CACHES=$S/walk-caches ../../bin/fortress $t.fss 2>&1 | filt | head -12 ; echo "exit=${PIPESTATUS[0]}")
rm -rf $S
