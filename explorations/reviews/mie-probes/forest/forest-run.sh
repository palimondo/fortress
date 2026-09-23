#!/bin/bash
# forest-run.sh <work-dir>: every command behind ../patents-forest-rule.md, in order.
# <work-dir> is scratch OUTSIDE the repository: the shadow's copies and classes, the private
# caches, the rung P probe programs taken from their branch.  default_repository/ is never
# written (every run has its own -Dfortress.caches / FORTRESS_CACHES) and no tracked source
# is modified.  The shadow is copies of three checker sources patched with forest.patch:
# rung P's measurement switch verbatim (origin/wip/rung-exclusion-relax,
# explorations/compile-ladder/rung-exclusion-relax/probes/measurement-switch.patch,
# -Dprobe.rungP=off|hier|over|broad) plus the forest mode in TypeAnalyzer.checkP
# (-Dprobe.forest=off|fbound|comprises).  Compiled with the build's own scalac entry point
# and put first on the classpath, the technique of ../dispatch-run.sh.
set -u
cd "$(dirname "$0")/../../../.."                     # $FORTRESS_HOME
source experiment/env.sh; unset JAVA_TOOL_OPTIONS
F=explorations/reviews/mie-probes/forest
W=${1:?usage: forest-run.sh <work-dir>}; mkdir -p "$W"; W=$(cd "$W" && pwd)
export FORTRESS_CACHES=$W/caches
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
RCP=$(./bin/run_classpath 2>/dev/null | tail -1)
SHADOWED="scala_src/types/TypeAnalyzer.scala scala_src/typechecker/TypeHierarchyChecker.scala
          scala_src/typechecker/OverloadingChecker.scala"
newcache () { local c=$1; rm -rf "$c"; mkdir -p "$c"; printf '\0\0\0\0' > "$c/global.map"; }

# ------------------------------------------------------------------ 0. the shadow
SS=$W/shadow/src/com/sun/fortress; SC=$W/shadow/classes
rm -rf $W/shadow; mkdir -p $SC
for rel in $SHADOWED; do mkdir -p "$(dirname $SS/$rel)"; cp ProjectFortress/src/com/sun/fortress/$rel $SS/$rel; done
patch -p6 -d $SS --forward < $F/forest.patch || exit 1
[ -z "$(git status --porcelain ProjectFortress/src)" ] || { echo "ABORT: tracked sources touched" >&2; exit 1; }
java -Xmx2g -cp "$CP" scala.tools.nsc.Main -nowarn -d $SC -classpath "$CP" -encoding UTF-8 \
     $(for rel in $SHADOWED; do echo $SS/$rel; done) || exit 1

# ------------------------------------------------ 1. the interpreter (walk) captures
for p in ForestInfer ForestTower ForestTowerC; do
  { echo "\$ FORTRESS_THREADS=1 FORTRESS_CACHES=<private> bin/fortress walk $p.fss   ($(date -u +%F), JDK $(java -version 2>&1 | head -1 | cut -d'"' -f2), main $(git rev-parse --short HEAD))"
    (cd $F && FORTRESS_THREADS=1 timeout 600 ../../../../bin/fortress walk $p.fss 2>&1 \
       | grep -v '^\s*at \|^java.lang.Throwable' | sed -e "s#$PWD/##g"; echo "exit=${PIPESTATUS[0]}")
  } > $F/$p.walk.txt 2>&1
done

# ------------------------- 2. the compiler prelude in a private cache, stock checker
if [ ! -f "$FORTRESS_CACHES/bytecode_cache/CompilerSystem.jar" ]; then
  newcache "$FORTRESS_CACHES"
  SH="java -Xmx4g -Xss64m -Dfortress.caches=$FORTRESS_CACHES -cp $CP com.sun.fortress.Shell"
  (cd ProjectFortress && $SH compile LibraryBuiltin/AnyType.fss)
  (cd ProjectFortress && $SH compile LibraryBuiltin/CompilerBuiltin.fss)
  $SH compile Library/CompilerLibrary.fss
  $SH compile Library/CompilerAlgebra.fss
  $SH compile Library/CompilerSystem.fss
fi > $W/prelude.txt 2>&1

# ------------------------------- 3. the probes: link under a mode, run, capture
probe () { local d=$1 p=$2; shift 2           # probe <dir> <name> <flag-sets...>; each linked then run
  for fl in "$@"; do
    echo "=== fortress link $p.fss   $fl"
    rm -f $FORTRESS_CACHES/bytecode_cache/$p.jar $FORTRESS_CACHES/analyzed_cache/$p-*; touch $d/$p.fss
    (cd $d && java -Xmx4g -Xss64m $fl -Dfortress.caches=$FORTRESS_CACHES -cp $SC:$CP \
       com.sun.fortress.Shell link $p.fss 2>&1 | sed -e "s#$PWD/##g; s#$W/##g"; exit ${PIPESTATUS[0]}); echo "link exit=$?"
    if [ -f $FORTRESS_CACHES/bytecode_cache/$p.jar ]; then
      echo "=== fortress run $p"
      java -Xmx1g -cp "$RCP" com.sun.fortress.runtimeSystem.MainWrapper $p 2>&1 | grep -v '^\s*at \|^\s*\.\.\. [0-9]* more'
      echo "run exit=${PIPESTATUS[0]}"
    fi
  done
}
MODES="-Dprobe.rungP=off -Dprobe.rungP=hier -Dprobe.forest=fbound"
for p in ForestInfer ForestTower ForestTowerC; do
  probe $F $p $MODES > $F/$p.compiled.txt 2>&1
done
R=$W/rung; mkdir -p $R
for p in ProbeMIEPick ProbeMIEPickCtl ProbeTypecaseMIE ProbeMIEOverload; do
  git show origin/wip/rung-exclusion-relax:explorations/compile-ladder/rung-exclusion-relax/probes/$p.fss > $R/$p.fss
done
for p in ProbeMIEPick ProbeMIEPickCtl ProbeTypecaseMIE ProbeMIEOverload; do
  probe $R $p "-Dprobe.forest=fbound"
done > $F/rung-probes.forest.txt 2>&1

# ---------------------- 4. the checker count on the interpreter's library, per mode
: > $F/checker-count.txt
for opt in "" "-Dprobe.rungP=hier" "-Dprobe.rungP=broad" "-Dprobe.forest=fbound" "-Dprobe.forest=comprises"; do
  tag=${opt:-stock}; tag=${tag#-Dprobe.}; C=$W/cc-$tag; rm -rf $C; mkdir -p $C/classes
  [ -n "$opt" ] && cp -r $SC/. $C/classes/            # the shadow ahead of the build
  JAVA_TOOL_OPTIONS="$opt" explorations/coordinator/tools/checker-count/run.sh $C.txt $C > /dev/null 2>&1
  python3 $F/errs.py $C/run.txt | sort > $C.errs
  echo "$tag	$(grep '^#total' $C.txt | cut -f2)" >> $F/checker-count.txt
done
{ echo "# errors in stock and not under forest=fbound"; comm -23 $W/cc-stock.errs $W/cc-forest=fbound.errs
  echo "# errors under forest=fbound and not in stock"; comm -13 $W/cc-stock.errs $W/cc-forest=fbound.errs
  echo "# errors under forest=fbound and not under rungP=broad"; comm -23 $W/cc-forest=fbound.errs $W/cc-rungP=broad.errs
  echo "# errors under rungP=broad and not under forest=fbound"; comm -13 $W/cc-forest=fbound.errs $W/cc-rungP=broad.errs
} >> $F/checker-count.txt
