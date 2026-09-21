#!/bin/bash
# Every command the exclusion trace ran, in order.  Run from $FORTRESS_HOME.
# PROBE is a private scratch directory outside the repository: nothing tracked is
# touched and default_repository/ is never written, because every run gets its own
# -Dfortress.caches (honoured through ProjectProperties.java:261-269,283) or its own
# FORTRESS_CACHES.  The captures in this directory have had their @@EXC lines
# stripped after the fact, to keep them small; exc-clauses.txt holds the
# deduplicated set from run 01.
set -x
source experiment/env.sh
FH=/home/user/fortress
PROBE='/tmp/<session scratchpad>'   # rewritten in the captures as <probe>
D=explorations/perf-probes/prelude/exclusion-trace
P=explorations/perf-probes/prelude          # WorldFlip.java + the StaticChecker shadow
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
BASE="-Xmx4g -Xss64m"

# --- the shadow checker ---------------------------------------------------------------
# Copies of the two tracked sources with the four exclusion clauses of
# TypeAnalyzer.scala:423-457 lifted out of pExcInner so each can be evaluated and named,
# a print at every established exclusion and at every family A/B/E error site, and three
# switches that drop a clause in the positive direction only.  Compiled with the build's
# own scalac entry point (build.xml:557-567).
java -Xmx2g -cp "$CP" scala.tools.nsc.Main -d $D/shadow-classes -classpath "$CP" \
     -encoding UTF-8 \
     $D/shadow-src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala \
     $D/shadow-src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala

# --- the library copies ---------------------------------------------------------------
# L0 the tree's library unchanged (the interpreter control, same shadowing path)
# L1b the api's "QQ comprises { ... }" -> "comprises { AnyIntegral }"      (bucket 1, free)
# L1a L1b + FortressLibrary.fsi:2526/.fss:4444 lose "excludes Condition[\()\]"
# L1  L1a + the 2026-09-19 closure dropped from AnyIntegral
# L2  every comprises clause removed, 16 in the .fss and 15 in the .fsi (bucket 3, ii)
python3 $D/make-variants.py $PROBE

# --- the checker runs -----------------------------------------------------------------
run () { # $1 capture  $2 target .fss  $3.. extra -D flags
  local out=$1; shift; local tgt=$1; shift
  local c=$PROBE/exc-caches-$out; rm -rf $c; mkdir -p $c
  timeout 900 java $BASE -Dfortress.caches=$c -Dprobe.exclusion.trace=1 "$@" \
       -cp "$D/shadow-classes:$P/shadow-classes:$CP:$P" WorldFlip $tgt > $D/$out 2>&1
  echo "$out rc=$? $(grep -o 'has [0-9]* errors\?' $D/$out | tail -1)"
}
run 01-baseline-trace.out       Library/FortressLibrary.fss                                     #  93
run 02-dropP.out                Library/FortressLibrary.fss   -Dprobe.exclusion.dropP=1         #  33
run 03-dropP-dropCC.out         Library/FortressLibrary.fss   -Dprobe.exclusion.dropP=1 -Dprobe.exclusion.dropCC=1   # 33
run 18-lib-L1b.out              $PROBE/L1b/FortressLibrary.fss                                  #  92
run 19-lib-L1b-dropP.out        $PROBE/L1b/FortressLibrary.fss -Dprobe.exclusion.dropP=1        #  32
run 04-lib-L1a.out              $PROBE/L1a/FortressLibrary.fss                                  #  91
run 05-lib-L1.out               $PROBE/L1/FortressLibrary.fss                                   #  90
run 06-lib-L1-dropP.out         $PROBE/L1/FortressLibrary.fss  -Dprobe.exclusion.dropP=1        #  30
run 07-lib-L2-nocomprises.out   $PROBE/L2/FortressLibrary.fss                                   #  91
run 08-lib-L2-dropP.out         $PROBE/L2/FortressLibrary.fss  -Dprobe.exclusion.dropP=1        #  31
# the hierarchy-only variant: its switch is dynamic, so the excludes memo must be off
run 12-hierarchyOnly.out        Library/FortressLibrary.fss \
        -Dprobe.exclusion.hierarchyOnly=1 -Dfortress.analyzer.excludes.cache=false              #  33
# the same variant on L1 did not finish inside 900 s and is not kept:
# run 13-lib-L1-hierarchyOnly.out $PROBE/L1/FortressLibrary.fss \
#        -Dprobe.exclusion.hierarchyOnly=1 -Dfortress.analyzer.excludes.cache=false

# --- the two minimal probes, in the compiler's own world ------------------------------
for f in SpecSelfInst MinP SelfInst2; do for m in stock dropP; do
  c=$PROBE/exc-c-$f-$m; rm -rf $c; mkdir -p $c
  FL=""; [ $m = dropP ] && FL="-Dprobe.exclusion.dropP=1"
  timeout 300 java $BASE -Dfortress.caches=$c -Dprobe.exclusion.trace=1 $FL \
       -cp "$D/shadow-classes:$P/shadow-classes:$CP" com.sun.fortress.Shell \
       typecheck $D/$f.fss > $D/17-$f-$m.out 2>&1
  echo "$f $m rc=$?"
done; done
# SpecSelfInst's two captures are kept under their own names (the example as the spec
# prints it, before and after the where-clause variable list the front end requires):
#   09a-spec-selfinst-asprinted.out   09-spec-self-instantiation.out

# --- the interpreter, one cold cache per run ------------------------------------------
for v in L2 L1 L1a L1b L0; do
  export FORTRESS_SOURCE_PATH=";$PROBE/$v;.;$FH/ProjectFortress/LibraryBuiltin;$FH/Library;$FH/ProjectFortress/test_library"
  for t in ArrayScalarExtension Generator2Test; do
    export FORTRESS_CACHES=$PROBE/exc-icache-$v-$t; rm -rf $FORTRESS_CACHES; mkdir -p $FORTRESS_CACHES
    export JAVA_FLAGS="-Xmx4g -Xss64m -Dfortress.caches=$FORTRESS_CACHES"
    case $v in
      L2)  O=$D/10-interp-L2-$t.out ;;
      L1)  O=$D/14-interp-L1-$t.out ;;
      L1a) O=$D/16-interp-L1a-$t.out ;;
      L1b) O=$D/20-interp-L1b-$t.out ;;
      L0)  O=$D/15-interp-L0-$t.out ;;
    esac
    timeout -s KILL 900 ./bin/fortress ProjectFortress/tests/$t.fss > $O 2>&1
    echo "interp $v $t rc=$?"
  done
done
# 10-interp-L2-ArrayScalarExtension.out is the one kept for L2; 11-interp-L0-control.out
# is the L0 ArrayScalarExtension run under its original name.

# --- the two derived files ------------------------------------------------------------
grep "^@@EXC" $D/01-baseline-trace.out | sort -u > $D/exc-clauses.txt
# sites.tsv is 01-baseline-trace.out's @@SITE lines, one row per error, with the
# witnessP field reduced to the set of generic names.
