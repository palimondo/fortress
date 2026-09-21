#!/bin/bash
# Every command of the nat-shadow followup, in order.  Run from $FORTRESS_HOME:
#
#   ./explorations/perf-probes/nat/followup/run-all.sh <work-dir>
#
# <work-dir> is a scratch directory OUTSIDE the repository.  Nothing tracked is
# modified; default_repository/ is never written (every run gets its own
# -Dfortress.caches / FORTRESS_CACHES).  The shadow is rebuilt from
# ../shadow.patch exactly as ../run-all.sh does it -- the patch now carries the
# two followup fixes, so no separate step is needed.
set -u
cd "$(dirname "$0")/../../../.."                     # $FORTRESS_HOME
source experiment/env.sh
D=explorations/perf-probes/nat
F=$D/followup
P=explorations/perf-probes/prelude
DC=$P/desugar-codegen
W=${1:?usage: run-all.sh <work-dir>}
mkdir -p "$W"
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
NAT=$D/shadow-classes
newcache () { local c=$1; rm -rf "$c"; mkdir -p "$c"; printf '\0\0\0\0' > "$c/global.map"; }

# ------------------------------------------------------------ the shadow
SHADOWED="scala_src/typechecker/Formula.scala scala_src/types/TypeAnalyzer.scala
          scala_src/types/TypeSchemaAnalyzer.scala scala_src/useful/STypesUtil.scala
          scala_src/typechecker/ExportChecker.scala
          scala_src/typechecker/TypeWellFormedChecker.scala
          scala_src/typechecker/AbstractMethodChecker.scala"
if [ ! -d $D/shadow-src ]; then
  for rel in $SHADOWED; do
    mkdir -p "$(dirname $D/shadow-src/com/sun/fortress/$rel)"
    cp ProjectFortress/src/com/sun/fortress/$rel $D/shadow-src/com/sun/fortress/$rel
  done
  patch -p7 -d $D/shadow-src/com/sun/fortress --forward < $D/shadow.patch
  if [ -n "$(git status --porcelain ProjectFortress/src)" ]; then
    echo "ABORT: the patch touched tracked sources" >&2; exit 1; fi
fi
rm -rf $NAT; mkdir -p $NAT
java -Xmx2g -cp "$CP" scala.tools.nsc.Main -d $NAT -classpath "$CP" -encoding UTF-8 \
     $(find $D/shadow-src -name '*.scala' | sort)

# --- 1. the two reproducers and the probes, in the compiler's own world
export FORTRESS_CACHES=$W/caches; newcache "$FORTRESS_CACHES"
SH="java -Xmx4g -Xss64m -Dfortress.caches=$FORTRESS_CACHES -cp $NAT:$CP com.sun.fortress.Shell"
(cd ProjectFortress && $SH compile LibraryBuiltin/AnyType.fss)
(cd ProjectFortress && $SH compile LibraryBuiltin/CompilerBuiltin.fss)
$SH compile Library/CompilerLibrary.fss
$SH compile Library/CompilerAlgebra.fss
$SH compile Library/CompilerSystem.fss
{ for spec in "$P/pNat1.fss pNat1" "$P/pNat2.fss pNat2" "$P/pNat3.fss pNat3" \
              "$D/pNat4.fss pNat4" "$D/pNat5.fss pNat5" "$D/pNat6.fss pNat6" \
              "$D/pNatVec.fss pNatVec" "$D/pNatBool.fss pNatBool"; do
    set -- $spec
    echo "########## fortress compile $1   (COMPILER world, nat shadow + followup fixes)"
    $SH compile $1 2>&1 | head -12; echo "exit=${PIPESTATUS[0]}"
  done
  echo "########## fortress typecheck subOv1.fss / subOv2.fss (the followup reproducers)"
  for t in subOv1 subOv2; do echo "---------- $t"
    java -Xmx4g -Xss64m -Dfortress.caches=$FORTRESS_CACHES -cp "$NAT:$CP" \
         com.sun.fortress.Shell typecheck $F/$t.fss 2>&1 | head -8
    echo "exit=${PIPESTATUS[0]}"; done; } > $F/f1-probes-fixed.out 2>&1
# and the same two with the fix switched off, which is where the error is
for t in subOv1 subOv2; do
  c=$W/c-strict-$t; newcache "$c"
  java -Xmx4g -Xss64m -Dprobe.nat.strictIsTrue=true -Dfortress.caches=$c -cp "$NAT:$CP" \
       com.sun.fortress.Shell typecheck $F/$t.fss
done > $W/strict-reproducers.out 2>&1

# --- 2. the five nat compiler tests, stock against shadow
{ for mode in stock shadow; do
    pre=""; [ $mode = shadow ] && pre="$NAT:"
    for t in Compiled1.ah Compiled1.av Compiled6.af; do
      c=$W/gt-$mode-$t; newcache "$c"
      echo "########## [$mode] fortress typecheck $t.fss   (AfterTypeChecking.test)"
      java -Xmx4g -Xss64m -Dfortress.caches=$c -cp "$pre$CP" com.sun.fortress.Shell \
           typecheck ProjectFortress/compiler_tests/$t.fss 2>&1 | head -12
      echo "exit=${PIPESTATUS[0]}"
    done
    for t in Compiled1.p Compiled5.z; do
      c=$W/gt-$mode-$t; newcache "$c"
      echo "########## [$mode] fortress compile $t.fss   (XXX*.test: compile_err_equals)"
      java -Xmx4g -Xss64m -Dfortress.caches=$c -cp "$pre$CP" com.sun.fortress.Shell \
           compile ProjectFortress/compiler_tests/$t.fss 2>&1 | head -12
      echo "exit=${PIPESTATUS[0]}"
    done
    echo
  done; } > $F/f2-compiler-tests.out 2>&1

# --- 3. the library and the two array libraries, whole units
wf () { local c=$W/c-$1; newcache "$c"
  { echo "########## WorldFlip $3 ${4:-}"; S=$(date +%s)
    timeout 1800 java -Xmx4g -Xss64m -XX:-OmitStackTraceInFastThrow ${4:-} \
         -Dfortress.caches="$c" -cp "$2$CP:$P" WorldFlip "$3"
    echo "exit=$?"; echo "ELAPSED $(( $(date +%s) - S )) s"; } > "$W/$1" 2>&1; }
wf g-lib.out  "$NAT:$P/shadow-classes:" Library/FortressLibrary.fss
wf g-strict.out "$NAT:$P/shadow-classes:" Library/FortressLibrary.fss -Dprobe.nat.strictIsTrue=true
wf g-fa1.out  "$NAT:$P/shadow-classes:" explorations/run-c4/src/FlatArrays.fss
wf g-fa2.out  "$NAT:$P/shadow-classes:" explorations/apl/mg/FlatArrays2.fss
grep -v '^@@PROBE    at \|^	at ' $W/g-lib.out > $W/g-lib.clean
norm () { sed 's#'"$PWD"'/##g' "$1" | grep -v '^ELAPSED\|^# start\|^# classpath\|^##########'; }
{ echo "# Left = nat shadow + BOTH followup fixes; Right = the committed captures."
  diff -u <(norm $W/g-lib.clean) <(norm $D/03a-lib-worldflip-after.out)
  echo; diff -u <(norm $W/g-lib.clean) <(norm $D/03c-lib-argsalwaysequal.out) && echo "(identical)"
} > $F/f5-lib-diff.txt 2>&1

# --- 4. the per-declaration run, which now finishes; and the timing A/B
$DC/make-shadows.sh "$W/dc-src" "$W/dc-classes"
javac -nowarn -cp "$CP" -d "$W/dc-classes" $DC/PhaseProbe.java
perdecl () { local c=$W/c-$1; newcache "$c"
  { echo "########## PhaseProbe -order typecheck Library/FortressLibrary.fss (tolerant, per declaration)"
    echo "# classpath prefix: $2 ${4:-}"; S=$(date +%s)
    timeout ${3:-2400} java -Xmx4g -Xss64m -XX:-OmitStackTraceInFastThrow ${4:-} \
         -Dprobe.tolerant=true -Dfortress.caches="$c" -cp "$2$W/dc-classes:$CP" \
         PhaseProbe -order typecheck Library/FortressLibrary.fss
    echo "exit=$?"; echo "ELAPSED $(( $(date +%s) - S )) s"; } > "$W/$1" 2>&1; }
# the timing A/B: 180 s each, counting declarations reached
perdecl t-stock.out   ""      180
perdecl t-memo.out    "$NAT:" 180
perdecl t-nomemo.out  "$NAT:" 180 -Dprobe.nat.noParentsMemo=true
for f in t-stock.out t-memo.out t-nomemo.out; do
  echo "$f: decls=$(grep -c '@@TC DECL-' $W/$f)"; done
# and the whole run, with the error texts
perdecl h-perdecl-final.out "$NAT:" 2400
perdecl h-perdecl-errors.out "$NAT:" 2400 -Dprobe.dumpErrors=true
{ echo "# \$W/h-perdecl-final.out with the @@TC DECLAT stack lines dropped."
  grep -vE "^@@TC DECLAT" "$W/h-perdecl-final.out"; } | sed "s#$PWD/##g" \
  > $F/f6-perdecl-after.out
python3 $D/decl-fates.py "$W/03b-lib-perdecl-before.out" "$W/h-perdecl-final.out" \
        > $F/f7-perdecl-fates.txt 2>/dev/null || true
echo "followup run-all done; captures in $F, raw output in $W"
