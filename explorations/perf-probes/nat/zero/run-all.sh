#!/bin/bash
# Every command of the "zero" probe, in order.  Run from $FORTRESS_HOME:
#
#   ./explorations/perf-probes/nat/zero/run-all.sh <work-dir>
#
# <work-dir> is a scratch directory OUTSIDE the repository: the shadow sources and
# classes, the library copies, the private Fortress caches and the raw captures all
# live there.  Nothing tracked is modified and default_repository/ is never written
# -- every run gets its own -Dfortress.caches or its own FORTRESS_CACHES.
#
# THREE shadows stack on one classpath, all rebuilt here from committed patches:
#   ../shadow.patch            the EIGHT Scala sources of the nat shadow.  The eighth,
#                              TypeHierarchyChecker.scala, and the checkP switch in
#                              TypeAnalyzer.scala are this probe's; both are OFF by
#                              default, so REPORT.md's and followup.md's captures still
#                              reproduce from this patch.
#   ../java/java-shadow.patch  FnNameInfo.java + runtimeValues/RTTIsize.java (java.md)
#   java-shadow-add.patch      compiler/Types.java -- this probe's, piece 1
# Switches this probe adds:
#   -Dprobe.zero.dropP=true           relax checkP in the positive direction (rung P)
#   -Dprobe.zero.eligibleRelax=true   isEligibleToExtend accepts any generic subtrait
#   -Dprobe.zero.eligibleNarrow=true  ... only when every trait the table knows that
#                                     immediately extends it is below a listed type
set -u
cd "$(dirname "$0")/../../../.."                     # $FORTRESS_HOME
source experiment/env.sh
D=explorations/perf-probes/nat
J=$D/java
Z=$D/zero
P=explorations/perf-probes/prelude
DC=$P/desugar-codegen
W=${1:?usage: run-all.sh <work-dir>}
mkdir -p "$W"
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1); echo "$CP" > "$W/cp.txt"
NAT=$W/shadow-classes; JAV=$W/jshadow-classes
newcache () { local c=$1; rm -rf "$c"; mkdir -p "$c"; printf '\0\0\0\0' > "$c/global.map"; }

# ----------------------------------------------------------------- the shadows
SHADOWED="scala_src/typechecker/Formula.scala scala_src/types/TypeAnalyzer.scala
          scala_src/types/TypeSchemaAnalyzer.scala scala_src/useful/STypesUtil.scala
          scala_src/typechecker/ExportChecker.scala
          scala_src/typechecker/TypeWellFormedChecker.scala
          scala_src/typechecker/AbstractMethodChecker.scala
          scala_src/typechecker/TypeHierarchyChecker.scala"
if [ ! -d $W/shadow-src ]; then
  for rel in $SHADOWED; do
    mkdir -p "$(dirname $W/shadow-src/com/sun/fortress/$rel)"
    cp ProjectFortress/src/com/sun/fortress/$rel $W/shadow-src/com/sun/fortress/$rel
  done
  # -p7 -d aims the patch AT THE COPIES; plain `patch -p0` would resolve the ---
  # paths and edit the tracked sources, which must never happen.
  patch -p7 -d $W/shadow-src/com/sun/fortress --forward < $D/shadow.patch || exit 1
fi
rm -rf $NAT; mkdir -p $NAT
java -Xmx2g -cp "$CP" scala.tools.nsc.Main -d $NAT -classpath "$CP" -encoding UTF-8 \
     $(find $W/shadow-src -name '*.scala' | sort) || exit 1
if [ ! -d $W/jshadow-src ]; then
  mkdir -p $W/jshadow-src/com/sun/fortress/compiler/codegen
  cp ProjectFortress/src/com/sun/fortress/compiler/codegen/FnNameInfo.java \
     $W/jshadow-src/com/sun/fortress/compiler/codegen/FnNameInfo.java
  patch -p8 -d $W/jshadow-src/com/sun/fortress --forward < $J/java-shadow.patch || exit 1
  cp ProjectFortress/src/com/sun/fortress/compiler/Types.java \
     $W/jshadow-src/com/sun/fortress/compiler/Types.java
  patch -p8 -d $W/jshadow-src/com/sun/fortress --forward < $Z/java-shadow-add.patch || exit 1
fi
rm -rf $JAV; mkdir -p $JAV
javac -nowarn -encoding UTF-8 -cp "$CP" -d $JAV $(find $W/jshadow-src -name '*.java' | sort) || exit 1
if [ -n "$(git status --porcelain ProjectFortress/src)" ]; then
  echo "ABORT: a patch touched tracked sources; revert them before going on" >&2; exit 1
fi
# the probe drivers: WorldFlip (interpreter prelude + compiler phase order), the
# instrumented StaticChecker, and the per-declaration tolerant checker
javac -nowarn -cp "$CP" -d $W $P/WorldFlip.java || exit 1
rm -rf $W/pshadow-classes; mkdir -p $W/pshadow-classes
javac -nowarn -cp "$CP" -d $W/pshadow-classes \
      $P/shadow-src/com/sun/fortress/compiler/StaticChecker.java || exit 1
$DC/make-shadows.sh "$W/dc-src" "$W/dc-classes" || exit 1
javac -nowarn -cp "$CP" -d "$W/dc-classes" $DC/PhaseProbe.java || exit 1

# --------------------------------------------------------- the library variants
python3 $Z/make-lib.py $W/lib

wf () { local out=$1; shift; local tgt=$1; shift          # whole compilation units
  local c=$W/c-$out; newcache "$c"
  { echo "########## WorldFlip $tgt  ${*:-}"; S=$(date +%s)
    timeout 1800 java -Xmx4g -Xss64m -XX:-OmitStackTraceInFastThrow "$@" \
      -Dfortress.caches="$c" -cp "$JAV:$NAT:$W/pshadow-classes:$CP:$W" WorldFlip "$tgt"
    echo "exit=$?"; echo "ELAPSED $(( $(date +%s) - S )) s"; } > "$W/$out" 2>&1
  echo "$out $(grep -oE 'has [0-9]+ errors?' $W/$out | tail -1)"
}
perdecl () { local out=$1; shift; local tgt=$1; shift     # one top-level decl at a time
  local c=$W/c-$out; newcache "$c"
  { echo "########## PhaseProbe -order typecheck $tgt (tolerant, per declaration) ${*:-}"; S=$(date +%s)
    timeout 3600 java -Xmx4g -Xss64m -XX:-OmitStackTraceInFastThrow -Dprobe.tolerant=true "$@" \
      -Dfortress.caches="$c" -cp "$JAV:$NAT:$W/dc-classes:$CP" PhaseProbe -order typecheck "$tgt"
    echo "exit=$?"; echo "ELAPSED $(( $(date +%s) - S )) s"; } > "$W/$out" 2>&1
}
interp () { local v=$1 t=$2 f=${3:-}                      # interpreter, cold cache
  ( export FORTRESS_SOURCE_PATH=";$W/lib/$v;.;$PWD/ProjectFortress/LibraryBuiltin;$PWD/Library;$PWD/ProjectFortress/test_library"
    export FORTRESS_CACHES=$W/ic-$v; [ -n "$f" ] || { rm -rf $FORTRESS_CACHES; mkdir -p $FORTRESS_CACHES; }
    export JAVA_FLAGS="-Xmx4g -Xss64m -Dfortress.caches=$FORTRESS_CACHES"
    echo "########## INTERPRETER library=$v $t"; S=$(date +%s)
    timeout -s KILL 900 ./bin/fortress $t; echo "rc=$?"; echo "ELAPSED $(( $(date +%s) - S )) s" )
}

# ------------------------------------- 1. the five crashes: the shapes, in the
# compiler's OWN world, so that they are not the interpreter library's doing
{ c=$W/c-cw; newcache $c
  for n in zLocalRet zLocalNoRet zTopNoRet; do
    echo "########## COMPILER world: fortress typecheck $n.fss"
    timeout 300 java -Xmx4g -Xss64m -XX:-OmitStackTraceInFastThrow -Dfortress.caches=$c \
      -cp "$NAT:$CP" com.sun.fortress.Shell typecheck $Z/$n.fss 2>&1 | head -8; echo
  done; } > $Z/01-untyped-params.out 2>&1
# the character literal, interpreter world, per declaration, with the fix off and on
{ for mode in off on; do pre="$NAT"; [ $mode = on ] && pre="$JAV:$NAT"
    c=$W/c-char-$mode; newcache $c
    echo "########## zChar.fss per declaration, INTERPRETER world, Types.CHARACTER fix $mode"
    timeout 600 java -Xmx4g -Xss64m -Dprobe.tolerant=true -Dfortress.caches=$c \
      -cp "$pre:$W/dc-classes:$CP" PhaseProbe -order typecheck $Z/zChar.fss 2>&1 \
      | grep -E "@@TC DECL|@@TC COMPONENT|has [0-9]+ error"; echo
  done; } > $Z/02-char-ab.out 2>&1

# --------------------------- 2. the closure's accommodation, and how narrow it is
{ for f in zElig zElig2; do for m in stock relax narrow; do
    FL=""; [ $m = relax ] && FL="-Dprobe.zero.eligibleRelax=true"
    [ $m = narrow ] && FL="-Dprobe.zero.eligibleNarrow=true"
    c=$W/c-el-$f-$m; newcache $c
    echo "########## $f.fss, COMPILER world, $m"
    timeout 300 java -Xmx4g -Xss64m $FL -Dfortress.caches=$c -cp "$NAT:$CP" \
      com.sun.fortress.Shell typecheck $Z/$f.fss 2>&1 | head -6; echo
  done; done; } > $Z/03-elig-probe.out 2>&1

# ------------------------------------------- 3. the whole-unit counts, in order
wf 20-wf-base.out                Library/FortressLibrary.fss
wf 21-wf-dropP.out               Library/FortressLibrary.fss -Dprobe.zero.dropP=true
wf 22-wf-dropP-elig.out          Library/FortressLibrary.fss -Dprobe.zero.dropP=true -Dprobe.zero.eligibleRelax=true
wf 23-wf-elig.out                Library/FortressLibrary.fss -Dprobe.zero.eligibleRelax=true
wf 25-wf-eligNarrow.out          Library/FortressLibrary.fss -Dprobe.zero.eligibleNarrow=true
wf 26-wf-dropP-eligNarrow.out    Library/FortressLibrary.fss -Dprobe.zero.dropP=true -Dprobe.zero.eligibleNarrow=true
for v in P3a P3d ZP ZL ZALL; do wf 3x-wf-$v.out $W/lib/$v/FortressLibrary.fss; done
for v in ZALL ZL ZLP ZALL3; do
  wf 4x-wf-$v-relaxed.out $W/lib/$v/FortressLibrary.fss -Dprobe.zero.dropP=true -Dprobe.zero.eligibleNarrow=true
done
# the error sets, for the diffs quoted in zero.md
norm () { grep -v '^@@PROBE    at \|^	at \|^###\|^##########\|^exit=\|^ELAPSED' "$1" | sed "s#$W/lib/[A-Za-z0-9]*/#Library/#;s#$PWD/##"; }
for f in 20-wf-base 21-wf-dropP 22-wf-dropP-elig 23-wf-elig 25-wf-eligNarrow 26-wf-dropP-eligNarrow; do
  norm $W/$f.out > $W/e-$f.txt; done
# 04-wf-counts.txt is the table of every count above, the per-api rows and the per-kind tallies
{ echo "# base vs eligibleRelax (piece 2: exactly the FortressLibrary.fsi:411 error goes)"
  diff $W/e-20-wf-base.txt $W/e-23-wf-elig.txt
  echo; echo "# dropP vs dropP+eligibleRelax"
  diff $W/e-21-wf-dropP.txt $W/e-22-wf-dropP-elig.txt
  echo; echo "# dropP+eligibleRelax vs dropP+eligibleNarrow (byte-identical)"
  diff $W/e-22-wf-dropP-elig.txt $W/e-26-wf-dropP-eligNarrow.txt && echo "(identical)"; } > $Z/04b-elig-diff.txt

# ------------------------------------- 4. the interpreter, on each piece-3 variant
{ for v in L0 P3a P3b P3c P3d; do
    for t in ProjectFortress/tests/Generator2Test.fss ProjectFortress/tests/ArrayScalarExtension.fss; do
      interp $v $t | tail -8; echo; done
    for f in zFilter zRel; do interp $v $Z/$f.fss warm | tail -6; echo; done
  done
  echo "########## P3dx: P3d with a println in each branch of andCondCombine"
  interp P3dx ProjectFortress/tests/Generator2Test.fss | grep -E "@@ANDCOMBINE|res = |rc="
} > $Z/05-interp-piece3.out 2>&1

# -------------------- 5. the per-declaration fates: crashes after, errors after
# the Character fix alone on the tracked library (5 crashes -> 3), then the four written
# parameter types (ZALL, 1 left), plane left untyped (ZALL2, still 1: the crash is not
# plane's), and the declared () return types as well (ZALL3, 0)
perdecl 50-perdecl-charfix.out Library/FortressLibrary.fss
for v in ZALL ZLP ZALL2 ZALL3; do
  perdecl 5x-perdecl-$v.out $W/lib/$v/FortressLibrary.fss \
          -Dprobe.zero.dropP=true -Dprobe.zero.eligibleNarrow=true
done
for m in 50-perdecl-charfix 5x-perdecl-ZALL 5x-perdecl-ZLP 5x-perdecl-ZALL2 5x-perdecl-ZALL3; do
  python3 $D/decl-fates.py $D/java/j4-lib-perdecl.out <(sed "s#$W/lib/[A-Za-z0-9]*/#Library/#;s#$PWD/##" $W/$m.out) \
    > $Z/07-fates-$m.txt
  { echo "# \$W/$m.out with the @@TC DECLAT stack lines dropped."
    grep -vE "^@@TC DECLAT" $W/$m.out; } | sed "s#$W/lib/[A-Za-z0-9]*/#Library/#;s#$PWD/##" > $Z/07-$m.out
done
echo "run-all done; captures in $Z, raw output in $W"
