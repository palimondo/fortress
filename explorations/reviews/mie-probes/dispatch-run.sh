#!/bin/bash
# dispatch-run.sh <work-dir>: every command behind dispatch-and-route-c.md, in order.
# <work-dir> is scratch OUTSIDE the repository (private caches, javap output, the library
# stack, library copies); the shadow's copies and classes go to shadow/src and
# shadow/classes beside this script (untracked; delete them after use).  SKIP_LIBRARY=1
# skips the three 3-minute WorldFlip runs of section 4 and re-summarises their outputs.  default_repository/ is never written: every run has its own
# -Dfortress.caches and FORTRESS_CACHES.  No tracked source is modified.
#
# The shadow is copies of four checker sources patched with shadow/shadow.patch: rung P's
# measurement switch verbatim (origin/wip/rung-exclusion-relax,
# explorations/compile-ladder/rung-exclusion-relax/probes/measurement-switch.patch:
# -Dprobe.rungP=off|hier|over|broad) plus the route C sketch in OverloadingOracle.scala
# (-Dprobe.routeC=off|all|ret).  Compiled with the build's own scalac entry point and put
# first on the classpath: the technique of explorations/perf-probes/nat/run-all.sh.
set -u
cd "$(dirname "$0")/../../.."                        # $FORTRESS_HOME
source experiment/env.sh
M=explorations/reviews/mie-probes
S=$M/shadow
W=${1:?usage: dispatch-run.sh <work-dir>}
mkdir -p "$W"
export FORTRESS_CACHES=$W/caches
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
RCP=$(./bin/run_classpath 2>/dev/null | tail -1)
SHADOWED="scala_src/types/TypeAnalyzer.scala scala_src/typechecker/TypeHierarchyChecker.scala
          scala_src/typechecker/OverloadingChecker.scala scala_src/overloading/OverloadingOracle.scala"
newcache () { local c=$1; rm -rf "$c"; mkdir -p "$c"; printf '\0\0\0\0' > "$c/global.map"; }

# ------------------------------------------------------------------ 0. the shadow
SS=$S/src/com/sun/fortress
if [ ! -d $S/src ]; then
  for rel in $SHADOWED; do
    mkdir -p "$(dirname $SS/$rel)"; cp ProjectFortress/src/com/sun/fortress/$rel $SS/$rel
  done
  # -p6 strips "a/ProjectFortress/src/com/sun/fortress/" and aims the patch at the copies
  patch -p6 -d $SS --forward < $S/shadow.patch || exit 1
  [ -z "$(git status --porcelain ProjectFortress/src)" ] || { echo "ABORT: tracked sources touched" >&2; exit 1; }
fi
SC=$PWD/$S/classes; rm -rf $SC; mkdir -p $SC
java -Xmx2g -cp "$CP" scala.tools.nsc.Main -d $SC -classpath "$CP" -encoding UTF-8 \
     $(for rel in $SHADOWED; do echo $SS/$rel; done) || exit 1

# ------------------------- 1. the compiler prelude in a private cache, stock checker
if [ ! -f "$FORTRESS_CACHES/bytecode_cache/CompilerSystem.jar" ]; then
  newcache "$FORTRESS_CACHES"
  SH="java -Xmx4g -Xss64m -Dfortress.caches=$FORTRESS_CACHES -cp $CP com.sun.fortress.Shell"
  (cd ProjectFortress && $SH compile LibraryBuiltin/AnyType.fss)
  (cd ProjectFortress && $SH compile LibraryBuiltin/CompilerBuiltin.fss)
  $SH compile Library/CompilerLibrary.fss
  $SH compile Library/CompilerAlgebra.fss
  $SH compile Library/CompilerSystem.fss
fi

# ------------------------------- 2. the probes: link under a mode, run, capture
probe () { local p=$1; shift                  # probe <name> <link-flag-sets...>; runs after the last
  for fl in "$@"; do
    echo "=== fortress link $p.fss   $fl"
    rm -f $FORTRESS_CACHES/bytecode_cache/$p.jar $FORTRESS_CACHES/analyzed_cache/$p-*; touch $M/$p.fss
    (cd $M && java -Xmx4g -Xss64m $fl -Dfortress.caches=$FORTRESS_CACHES -cp $SC:$CP \
       com.sun.fortress.Shell link $p.fss 2>&1 | sed -e "s#$PWD/##g"; exit ${PIPESTATUS[0]}); echo "link exit=$?"
  done
  if [ -f $FORTRESS_CACHES/bytecode_cache/$p.jar ]; then
    echo "=== fortress run $p"
    java -Xmx1g -cp "$RCP" com.sun.fortress.runtimeSystem.MainWrapper $p 2>&1 | grep -v '^\s*at \|^\s*\.\.\. [0-9]* more'
    echo "run exit=${PIPESTATUS[0]}"
  fi
}
for p in MieDispatch MieDispatchSub MieDispatchAny; do
  probe $p -Dprobe.rungP=off -Dprobe.rungP=hier > $M/$p.compiled.txt 2>&1
done
probe MieDispatchZZ32 -Dprobe.rungP=off > $M/MieDispatchZZ32.compiled.txt 2>&1
probe RouteCProbe -Dprobe.routeC=all -Dprobe.routeC=ret -Dprobe.routeC=off > $M/RouteCProbe.compiled.txt 2>&1

# -------------------------------------------------- 3. javap on the generated code
J=$W/javap; rm -rf $J; mkdir -p $J
for p in MieDispatch MieDispatchSub; do
  mkdir -p $J/$p; (cd $J/$p && unzip -qo $FORTRESS_CACHES/bytecode_cache/$p.jar 2>/dev/null)
  javap -c -p "$J/$p/$p.class" > $J/$p.main.txt
done
javap -c -p "$J/MieDispatch/MieDispatch\$Both\$RTTIc.class" > $J/Both-RTTIc.txt
f=$(find $J/MieDispatchSub -name '*.class' -path '*grab*' -path '*Tag*' ! -path '*♙*' | head -1)
cp "$f" $J/grabTemplate.class; javap -c -p $J/grabTemplate.class > $J/MieDispatchSub.grabTemplate.txt
{ echo "# javap -c -p excerpts, $(date -u +%F), classes from the private cache's MieDispatch.jar and MieDispatchSub.jar."
  echo "# Mangled names are printed by javap with ? for the non-ASCII brackets: Tag?X? is Tag⟦X⟧."
  echo; echo "## MieDispatch.run(): the call sites, in source order: which(z), which(s), pick(z), pick(s), grab(IntTag),"
  echo "## grab(StrTag), grab(z), grab(s), gz, gs (static argument in the class name), grab(a) (the dispatcher)"
  awk '/ run\(\);/,0' $J/MieDispatch.main.txt | grep 'getstatic.*which\|getstatic.*pick\|getstatic.*grab\|invokestatic.*grab\|invokestatic.*pick' 
  echo; echo "## MieDispatch.grab(Any): the dispatcher, reached only from grab(a) with a: Any"
  awk '/public static fortress.AnyType\$Any grab\(fortress.AnyType\$Any\);/,/areturn/' $J/MieDispatch.main.txt
  echo; echo "## MieDispatch\$Both\$RTTIc.lazyInit: the one Tag ancestor the value's RTTI records"
  grep -n 'RTTIc.ONLY\|factory\|putfield.*Tag' $J/Both-RTTIc.txt
  echo; echo "## MieDispatchSub.run(): grab(r) calls the Sub instance for X = Red; grab(b) and mb, b: Tag[Blue],"
  echo "## call the Tag instance for X = Blue"
  awk '/ run\(\);/,0' $J/MieDispatchSub.main.txt | grep 'getstatic.*grab' 
  echo; echo "## the template grab⟦X⟧ (Tag arrow) that instance comes from: its body re-dispatches, and each arm"
  echo "## takes X from the argument's RTTI, not from the template's own X"
  grep -n 'the_function\|getRTTI\|instanceof\|__1\|ldc\|loadClosureClass\|checkcast\|overloadMatchFailure' $J/MieDispatchSub.grabTemplate.txt
} > $M/javap-excerpts.txt

# ------------------- 4. route C over the interpreter's library: the zero probe's stack
# (explorations/perf-probes/nat/zero/run-all.sh, which gets the overloading check to run
# on the FortressLibrary api), with this shadow's OverloadingOracle.scala on top.
D=explorations/perf-probes/nat; Z=$D/zero; P=explorations/perf-probes/prelude
L=$W/lib-stack; mkdir -p $L
NAT=$L/shadow-classes; JAV=$L/jshadow-classes; RC=$L/rc-classes
if [ ! -d $L/shadow-src ]; then
  for rel in scala_src/typechecker/Formula.scala scala_src/types/TypeAnalyzer.scala \
             scala_src/types/TypeSchemaAnalyzer.scala scala_src/useful/STypesUtil.scala \
             scala_src/typechecker/ExportChecker.scala scala_src/typechecker/TypeWellFormedChecker.scala \
             scala_src/typechecker/AbstractMethodChecker.scala scala_src/typechecker/TypeHierarchyChecker.scala; do
    mkdir -p "$(dirname $L/shadow-src/com/sun/fortress/$rel)"
    cp ProjectFortress/src/com/sun/fortress/$rel $L/shadow-src/com/sun/fortress/$rel
  done
  patch -p7 -d $L/shadow-src/com/sun/fortress --forward < $D/shadow.patch || exit 1
  mkdir -p $L/jshadow-src/com/sun/fortress/compiler/codegen
  cp ProjectFortress/src/com/sun/fortress/compiler/codegen/FnNameInfo.java $L/jshadow-src/com/sun/fortress/compiler/codegen/
  patch -p8 -d $L/jshadow-src/com/sun/fortress --forward < $D/java/java-shadow.patch || exit 1
  cp ProjectFortress/src/com/sun/fortress/compiler/Types.java $L/jshadow-src/com/sun/fortress/compiler/
  patch -p8 -d $L/jshadow-src/com/sun/fortress --forward < $Z/java-shadow-add.patch || exit 1
  [ -z "$(git status --porcelain ProjectFortress/src)" ] || { echo "ABORT: tracked sources touched" >&2; exit 1; }
fi
rm -rf $NAT $JAV $RC; mkdir -p $NAT $JAV $RC
java -Xmx2g -cp "$CP" scala.tools.nsc.Main -d $NAT -classpath "$CP" -encoding UTF-8 \
     $(find $L/shadow-src -name '*.scala' | sort) || exit 1
javac -nowarn -encoding UTF-8 -cp "$CP" -d $JAV $(find $L/jshadow-src -name '*.java' | sort) || exit 1
java -Xmx2g -cp "$CP" scala.tools.nsc.Main -d $RC -classpath "$NAT:$CP" -encoding UTF-8 \
     $SS/scala_src/overloading/OverloadingOracle.scala || exit 1
javac -nowarn -cp "$CP" -d $L $P/WorldFlip.java || exit 1
rm -rf $L/pshadow-classes; mkdir -p $L/pshadow-classes
javac -nowarn -cp "$CP" -d $L/pshadow-classes $P/shadow-src/com/sun/fortress/compiler/StaticChecker.java || exit 1
python3 $Z/make-lib.py $L/lib
for mode in off all ret; do
  [ -n "${SKIP_LIBRARY:-}" ] && break
  c=$L/c-$mode; newcache $c
  { echo "########## WorldFlip ZALL3/FortressLibrary.fss  -Dprobe.zero.dropP=true -Dprobe.zero.eligibleNarrow=true -Dprobe.routeC=$mode"
    S0=$(date +%s)
    timeout 1800 java -Xmx4g -Xss64m -XX:-OmitStackTraceInFastThrow -Dprobe.zero.dropP=true \
      -Dprobe.zero.eligibleNarrow=true -Dprobe.routeC=$mode -Dfortress.caches=$c \
      -cp "$RC:$JAV:$NAT:$L/pshadow-classes:$CP:$L" WorldFlip $L/lib/ZALL3/FortressLibrary.fss
    echo "exit=$?"; echo "ELAPSED $(( $(date +%s) - S0 )) s"; } > $L/wf-$mode.out 2>&1
done
python3 $M/routeC-count.py $L Library/FortressLibrary.fsi > $M/routeC-library.txt
python3 $M/routeC-textcount.py Library/FortressLibrary.fsi > $M/routeC-textcount.txt
echo "dispatch-run done; captures in $M, raw output in $W"
