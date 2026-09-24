#!/bin/bash
# differentials.sh <work-dir>: the rung's differentials over library copies, run from $FORTRESS_HOME
# with explorations/experiment/env.sh sourced, after ant compileAll.  Nothing tracked is written: each run has its
# own -Dfortress.caches under <work-dir>.  Two checkers: the tracked one (with the count stage's
# instrumented StaticChecker, tools/checker-count/shadow-src), and rung P's measured placement,
# rebuilt from the triage's committed patches (perf-probes/nat/triage/p-only.patch and
# overloading-checker.patch, switches -Dprobe.triage.dropPHier and -Dprobe.triage.dropPOver), which
# is how perf-probes/nat/triage/run-all.sh took r17.  Variants (Library/ files copied, then edited):
#   base     the four files at the batch base d610695c0
#   mine     the four files as this rung leaves them
#   rec      mine, with QQ as the batch record wrote it: comprises { AnyIntegral }
#   broad    mine, with every remaining AnyIntegral bound in RangeInternals.fsi replaced too (the triage's ZL)
#   seqgen   mine, with Condition.map returning SequentialGenerator[\G\] (the triage's ZL)
#   zipnarrow mine, with List.zip kept and narrowed to ZeroIndexed[\(E,F)\] instead of dropped
#   strtri   mine, with String's pair resolved the triage's way (the abstract pair deleted, the other kept)
set -u
W=${1:?usage: differentials.sh <work-dir>}; mkdir -p "$W"; W=$(cd "$W" && pwd)
S=com/sun/fortress; T=explorations/perf-probes/nat/triage; C=explorations/coordinator/tools/checker-count
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
if [ ! -d "$W/tri-ponly-classes" ]; then
  rm -rf $W/ponly-src $W/tri-src; mkdir -p $W/ponly-src/$S $W/tri-src/$S
  for rel in scala_src/types/TypeAnalyzer.scala scala_src/types/TypeSchemaAnalyzer.scala scala_src/typechecker/TypeHierarchyChecker.scala; do
    mkdir -p $(dirname $W/ponly-src/$S/$rel); cp ProjectFortress/src/$S/$rel $W/ponly-src/$S/$rel; done
  mkdir -p $W/tri-src/$S/scala_src/typechecker; cp ProjectFortress/src/$S/scala_src/typechecker/OverloadingChecker.scala $W/tri-src/$S/scala_src/typechecker/
  patch -p8 -d $W/ponly-src/$S --forward < $T/p-only.patch || exit 1
  patch -p8 -d $W/tri-src/$S --forward < $T/overloading-checker.patch || exit 1
  mkdir -p $W/ponly-classes $W/tri-ponly-classes $W/stage-classes
  java -Xmx2g -cp "$CP" scala.tools.nsc.Main -d $W/ponly-classes -classpath "$CP" -encoding UTF-8 $(find $W/ponly-src -name '*.scala' | sort) || exit 1
  java -Xmx2g -cp "$CP" scala.tools.nsc.Main -d $W/tri-ponly-classes -classpath "$W/ponly-classes:$CP" -encoding UTF-8 $(find $W/tri-src -name '*.scala' | sort) || exit 1
  javac -nowarn -cp "$CP" -d $W/stage-classes $C/WorldFlip.java $C/shadow-src/$S/compiler/StaticChecker.java || exit 1
fi
FILES="Library/FortressLibrary.fss Library/FortressLibrary.fsi Library/RangeInternals.fsi Library/List.fsi"
sub () { python3 - "$@" <<'PY'
import sys, io
p, a, b = sys.argv[1], sys.argv[2], sys.argv[3]
s = io.open(p, encoding="utf-8").read(); assert s.count(a) == 1, (p, a, s.count(a))
io.open(p, "w", encoding="utf-8").write(s.replace(a, b))
PY
}
for v in base mine rec broad seqgen zipnarrow strtri; do
  rm -rf $W/lib/$v; mkdir -p $W/lib/$v
  for f in $FILES; do
    if [ $v = base ]; then git show d610695c0:$f > $W/lib/$v/$(basename $f); else cp $f $W/lib/$v/; fi
  done
done
sub $W/lib/rec/FortressLibrary.fsi 'comprises { AnyIntegral, ... }' 'comprises { AnyIntegral }'
sed -i -E 's/([IJK]) extends AnyIntegral/\1 extends Integral[\\\1\\]/g' $W/lib/broad/RangeInternals.fsi
sub $W/lib/seqgen/FortressLibrary.fsi '    map[\G\](f: E->G): Condition[\G\]' '    map[\G\](f: E->G): SequentialGenerator[\G\]'
sub $W/lib/zipnarrow/List.fsi '  split(): (List[\E\], List[\E\])
  filter' '  split(): (List[\E\], List[\E\])
  zip[\F\](other: List[\F\]): ZeroIndexed[\(E,F)\]
  filter'
sub $W/lib/strtri/FortressLibrary.fsi '    abstract splitWithOffsets(): Generator[\(ZZ32, String)\]
    abstract split(): Generator[\String\]' '    splitWithOffsets(): Generator[\(ZZ32, String)\]
    split(): Generator[\String\]'
wf () { local out=$1 pre=$2 lib=$3; shift 3
  local c=$W/c-$out; rm -rf $c; mkdir -p $c
  timeout 900 java -Xmx4g -Xss64m "$@" -Dfortress.caches=$c -cp "$pre$W/stage-classes:$CP" WorldFlip $W/lib/$lib/FortressLibrary.fss > $W/$out.run.txt 2>&1
  printf '%-22s %s\n' "$out" "$(grep -oE 'has [0-9]+ errors?' $W/$out.run.txt | tail -1)"; }
PO="$W/tri-ponly-classes:$W/ponly-classes:"; HO="-Dprobe.triage.dropPHier=true -Dprobe.triage.dropPOver=true"
for v in base mine rec broad seqgen zipnarrow strtri; do wf $v-noP "" $v; done
for v in base mine rec seqgen; do wf $v-P "$PO" $v $HO; done
