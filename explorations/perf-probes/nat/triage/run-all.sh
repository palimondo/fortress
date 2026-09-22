#!/bin/bash
# Every command of the triage (triage.md), in order.  Run from $FORTRESS_HOME:
#
#   ./explorations/perf-probes/nat/triage/run-all.sh <work-dir>
#
# <work-dir> is a scratch directory OUTSIDE the repository.  Nothing tracked is modified and
# default_repository/ is never written: every run has its own -Dfortress.caches.  About 75 min.
#
# Class directories, each put AHEAD of ProjectFortress/build on the classpath:
#   nat0   ../shadow.patch alone -- the classes zero.md's captures were taken with
#   nat1   ../shadow.patch + shadow-add.patch (this probe's placement switch, OFF by default)
#   tri    overloading-checker.patch: the tracked OverloadingChecker with the -Dprobe.triage.dropPOver
#          placement and the -Dprobe.triage.diag lines, compiled against nat1
#   jav    ../java/java-shadow.patch + ../zero/java-shadow-add.patch (as zero/run-all.sh)
#   ponly  p-only.patch: rung P (-Dprobe.triage.dropPHier) and the closure's narrow accommodation
#          (-Dprobe.zero.eligibleNarrow) on the TRACKED checker, nothing of the nat shadow -- the
#          "current tree" of batch 3; tri-ponly is overloading-checker.patch compiled against it
# Switches: -Dprobe.zero.dropP (zero's: checkP relaxed inside pExcInner, every caller: BROAD),
#   -Dprobe.triage.dropPHier (the two TypeHierarchyChecker questions only: NARROW, batch 3's rung P),
#   -Dprobe.triage.dropPOver (the whole overloading check), -Dfortress.analyzer.overload.cache=false
#   (the tree's own switch, OverloadingChecker.scala:77: the pair memo off, see triage.md).
set -u
cd "$(dirname "$0")/../../../.."                     # $FORTRESS_HOME
source experiment/env.sh
D=explorations/perf-probes/nat; T=$D/triage; Z=$D/zero; P=explorations/perf-probes/prelude
W=${1:?usage: run-all.sh <work-dir>}; W=$(mkdir -p "$W" && cd "$W" && pwd)
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1); echo "$CP" > "$W/cp.txt"
S=com/sun/fortress
SHADOWED="scala_src/typechecker/Formula.scala scala_src/types/TypeAnalyzer.scala
          scala_src/types/TypeSchemaAnalyzer.scala scala_src/useful/STypesUtil.scala
          scala_src/typechecker/ExportChecker.scala scala_src/typechecker/TypeWellFormedChecker.scala
          scala_src/typechecker/AbstractMethodChecker.scala scala_src/typechecker/TypeHierarchyChecker.scala"
copy () { local dst=$1; shift; for rel in "$@"; do mkdir -p "$(dirname $dst/$S/$rel)"; cp ProjectFortress/src/$S/$rel $dst/$S/$rel; done; }
scalac () { local out=$1 cp=$2 src=$3; rm -rf $out; mkdir -p $out
  java -Xmx2g -cp "$CP" scala.tools.nsc.Main -d $out -classpath "$cp" -encoding UTF-8 $(find $src -name '*.scala' | sort) || exit 1; }
# -pN -d aims every patch AT THE COPIES; the --- paths name tracked sources, never patch them in place.
rm -rf $W/nat0-src $W/nat1-src $W/tri-src $W/ponly-src $W/jshadow-src
copy $W/nat0-src $SHADOWED; patch -p7 -d $W/nat0-src/$S --forward < $D/shadow.patch || exit 1
cp -r $W/nat0-src $W/nat1-src; patch -p8 -d $W/nat1-src/$S --forward < $T/shadow-add.patch || exit 1
copy $W/tri-src scala_src/typechecker/OverloadingChecker.scala
patch -p8 -d $W/tri-src/$S --forward < $T/overloading-checker.patch || exit 1
copy $W/ponly-src scala_src/types/TypeAnalyzer.scala scala_src/types/TypeSchemaAnalyzer.scala scala_src/typechecker/TypeHierarchyChecker.scala
patch -p8 -d $W/ponly-src/$S --forward < $T/p-only.patch || exit 1
copy $W/jshadow-src compiler/codegen/FnNameInfo.java
patch -p8 -d $W/jshadow-src/$S --forward < $D/java/java-shadow.patch || exit 1
copy $W/jshadow-src compiler/Types.java; patch -p8 -d $W/jshadow-src/$S --forward < $Z/java-shadow-add.patch || exit 1
if [ -n "$(git status --porcelain ProjectFortress/src)" ]; then echo "ABORT: a patch touched tracked sources" >&2; exit 1; fi
scalac $W/nat0-classes "$CP" $W/nat0-src
scalac $W/nat1-classes "$CP" $W/nat1-src
scalac $W/tri-classes "$W/nat1-classes:$CP" $W/tri-src
scalac $W/ponly-classes "$CP" $W/ponly-src
scalac $W/tri-ponly-classes "$W/ponly-classes:$CP" $W/tri-src
rm -rf $W/jshadow-classes; mkdir -p $W/jshadow-classes
javac -nowarn -encoding UTF-8 -cp "$CP" -d $W/jshadow-classes $(find $W/jshadow-src -name '*.java' | sort) || exit 1
javac -nowarn -cp "$CP" -d $W $P/WorldFlip.java || exit 1
rm -rf $W/pshadow-classes; mkdir -p $W/pshadow-classes
javac -nowarn -cp "$CP" -d $W/pshadow-classes $P/shadow-src/$S/compiler/StaticChecker.java || exit 1
python3 $Z/make-lib.py $W/lib && python3 $T/make-fixes.py $W/lib || exit 1

N0="$W/jshadow-classes:$W/nat0-classes"; N1n="$W/jshadow-classes:$W/nat1-classes"
N1="$W/jshadow-classes:$W/tri-classes:$W/nat1-classes"; PO="$W/tri-ponly-classes:$W/ponly-classes"
dP="-Dprobe.zero.dropP=true"; eN="-Dprobe.zero.eligibleNarrow=true"; H="-Dprobe.triage.dropPHier=true"
O="-Dprobe.triage.dropPOver=true"; M="-Dfortress.analyzer.overload.cache=false"; DG="-Dprobe.triage.diag=true"
wf () { local out=$1 pre=$2 lib=$3; shift 3                # one whole compilation unit, private cache
  local c=$W/c-$out; rm -rf $c; mkdir -p $c; printf '\0\0\0\0' > $c/global.map
  { echo "########## WorldFlip $lib  ${*:-}"; local s=$(date +%s)
    timeout 3000 java -Xmx4g -Xss64m -XX:-OmitStackTraceInFastThrow "$@" -Dfortress.caches=$c \
      -cp "$pre:$W/pshadow-classes:$CP:$W" WorldFlip $W/lib/$lib/FortressLibrary.fss
    echo "exit=$?"; echo "ELAPSED $(( $(date +%s) - s )) s"; } > $W/$out.out 2>&1
  echo "$out $(grep -oE 'has [0-9]+ errors?' $W/$out.out | tail -1)"; }
# 1. the two copies of the brief, in zero's own classes
wf r01-ZALL3-dP-eN             "$N0"  ZALL3 $dP $eN          # everything applied: 173
wf r06-ZALL3-dP-eN-again       "$N0"  ZALL3 $dP $eN
wf r02-ZL-dP                   "$N0"  ZL    $dP              # batch 3 as written, zero's (broad) switch
# 2. the placements, and the pair memo that makes the fill count depend on the build
wf r26-ZALL3-dP-eN-nat1-notri  "$N1n" ZALL3 $dP $eN
wf r03-ZALL3-dP-eN-nat1        "$N1"  ZALL3 $dP $eN
wf r16-ZALL3-dP-eN-nat1-again  "$N1"  ZALL3 $dP $eN
wf r05-ZALL3-HO-eN             "$N1"  ZALL3 $H $O $eN
wf r04-ZALL3-H-eN              "$N1"  ZALL3 $H $eN
wf r09-ZL-H                    "$N1"  ZL    $H
wf r07-ZALL3-dP-eN-diag        "$N1"  ZALL3 $dP $eN $DG
wf r15-ZALL3-HO-eN-diag        "$N1"  ZALL3 $H $O $eN $DG
wf r20-ZALL3-dP-eN-nat0-nomemo "$N0"  ZALL3 $dP $eN $M
wf r21-ZALL3-dP-eN-nat1-nomemo "$N1"  ZALL3 $dP $eN $M
wf r25-ZALL3-HO-eN-nomemo      "$N1"  ZALL3 $H $O $eN $M
wf r24-ZALL3-H-eN-nomemo       "$N1"  ZALL3 $H $eN $M
# 3. the fixes, cumulative, memo off
for v in T1 T2 T3; do wf r3$v-dP-eN-nomemo "$N0" $v $dP $eN $M; done
# 4. batch 3 on the current tree
wf r13-cur-L0-H        "$PO" L0 $H                          # rung P alone
wf r27-cur-ZL-noP      "$PO" ZL                             # rung L alone
wf r11-cur-ZL-H        "$PO" ZL $H                          # the batch
wf r19-cur-ZL-H-again  "$PO" ZL $H
wf r22-cur-ZL-H-nomemo "$PO" ZL $H $M
wf r12-cur-ZL-H-eN     "$PO" ZL $H $eN                      # + the closure's narrow accommodation
wf r17-cur-ZL-HO       "$PO" ZL $H $O
wf r18-cur-ZL-HO-eN    "$PO" ZL $H $O $eN
python3 $T/captures.py $W $T
