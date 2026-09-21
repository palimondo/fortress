#!/bin/bash
# Every command the nat shadow prototype ran, in order.  Run from $FORTRESS_HOME:
#
#   ./explorations/perf-probes/nat/run-all.sh <work-dir>
#
# <work-dir> is a scratch directory OUTSIDE the repository: the private Fortress
# caches, the desugar-codegen probe's shadow classes and the raw captures all
# live there.  default_repository/ is never written -- every run gets its own
# -Dfortress.caches (ProjectProperties.java:261-269,283) or its own
# FORTRESS_CACHES -- and no tracked file is modified.
#
# What the shadow is: copies of SEVEN tracked Scala sources with the minimal nat
# design of explorations/reviews/nat-checking-plan.md (c) applied, compiled with
# the build's own scalac entry point (build.xml:557-568) and put first on the
# classpath so the copies win.  The technique is perf-probes/prelude/run-all.sh:33-35
# and perf-probes/prelude/exclusion-trace/run-all.sh.  The diff against the tree
# is shadow.patch beside this script.
set -u
cd "$(dirname "$0")/../../.."                        # $FORTRESS_HOME
source experiment/env.sh                             # JDK 25, FORTRESS_THREADS=1, -Xmx4g -Xss64m
D=explorations/perf-probes/nat
P=explorations/perf-probes/prelude                   # WorldFlip.java + its StaticChecker shadow
DC=$P/desugar-codegen                                # the per-declaration checker shadow
W=${1:?usage: run-all.sh <work-dir>}
mkdir -p "$W"
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
echo "$CP" > "$W/cp.txt"
NAT=$D/shadow-classes

newcache () { local c=$1; rm -rf "$c"; mkdir -p "$c"; printf '\0\0\0\0' > "$c/global.map"; }

# ---------------------------------------------------------------- the shadow
# shadow.patch is committed; the copies it patches are not.  Rebuild them.
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
  # -p7 -d aims the patch AT THE COPIES: seven components strip
  # "explorations/perf-probes/nat/shadow-src/com/sun/fortress/" off the +++ paths
  # and leave "scala_src/...".  Plain `patch -p0` would resolve the --- paths
  # instead and edit the tracked sources, which must never happen.
  patch -p7 -d $D/shadow-src/com/sun/fortress --forward < $D/shadow.patch
  if [ -n "$(git status --porcelain ProjectFortress/src)" ]; then
    echo "ABORT: the patch touched tracked sources; revert them before going on" >&2
    exit 1
  fi
fi
rm -rf $NAT; mkdir -p $NAT
java -Xmx2g -cp "$CP" scala.tools.nsc.Main -d $NAT -classpath "$CP" -encoding UTF-8 \
     $(find $D/shadow-src -name '*.scala' | sort)

# --------------------------------------------- 1. the probes, compiler world
# The compiler's own prelude, compiled into a PRIVATE cache with the shadow, in
# library order (explorations/repo-internals.md).
export FORTRESS_CACHES=$W/caches
newcache "$FORTRESS_CACHES"
SH="java -Xmx4g -Xss64m -Dfortress.caches=$FORTRESS_CACHES -cp $NAT:$CP com.sun.fortress.Shell"
(cd ProjectFortress && $SH compile LibraryBuiltin/AnyType.fss)
(cd ProjectFortress && $SH compile LibraryBuiltin/CompilerBuiltin.fss)
$SH compile Library/CompilerLibrary.fss
$SH compile Library/CompilerAlgebra.fss
$SH compile Library/CompilerSystem.fss
# pNat1-3 are the prelude probe's; pNat4, pNat5, pNatVec, pNatBool are ours.
{ for spec in "$P/pNat1.fss pNat1" "$P/pNat2.fss pNat2" "$P/pNat3.fss pNat3" \
              "$D/pNat4.fss pNat4" "$D/pNat5.fss pNat5" "$D/pNat6.fss pNat6" \
              "$D/pNatVec.fss pNatVec" "$D/pNatBool.fss pNatBool"; do
    set -- $spec
    echo "########## fortress compile $1   (COMPILER world, nat shadow)"
    $SH compile $1 2>&1 | head -20; echo "exit=${PIPESTATUS[0]}"
    echo "---------- fortress run $2"
    JAVA_FLAGS="-Xmx4g -Xss64m" ./bin/fortress run $2 2>&1 | head -8
    echo
  done; } > $D/01-probes-shadow.out 2>&1
# the run-time failure of pNat1 in full (the loader asking for 3$RTTIc)
{ echo "########## fortress run pNat1, full stack"
  JAVA_FLAGS="-Xmx4g -Xss64m" ./bin/fortress run pNat1; } > $D/01b-pNat1-run-stack.out 2>&1
# what the INTERPRETER does with the same two arithmetic shapes (its own cache)
( export FORTRESS_CACHES=$W/icaches; newcache "$FORTRESS_CACHES"
  echo "########## INTERPRETER (./bin/fortress <file>)"
  for t in pNat5 pNat6; do echo "---------- $t"
    JAVA_FLAGS="-Xmx4g -Xss64m" timeout 300 ./bin/fortress $D/$t.fss 2>&1 | head -8; done
) > $D/07-interpreter-arithmetic.out 2>&1
export FORTRESS_CACHES=$W/caches

# ------------------------------------- 2. the five nat compiler tests, A/B
# Compiled1.ah/.av/Compiled6.af are `typecheck` tests (AfterTypeChecking.test);
# Compiled1.p and Compiled5.z are `compile` tests with an exact expected error
# (XXX1p.test, XXX5z.test).
{ for mode in stock shadow; do
    pre=""; [ $mode = shadow ] && pre="$NAT:"
    for t in Compiled1.ah Compiled1.av Compiled6.af; do
      c=$W/c-$mode-$t; newcache "$c"
      echo "########## [$mode] fortress typecheck $t.fss   (AfterTypeChecking.test)"
      java -Xmx4g -Xss64m -Dfortress.caches=$c -cp "$pre$CP" com.sun.fortress.Shell \
           typecheck ProjectFortress/compiler_tests/$t.fss 2>&1 | head -12
      echo "exit=${PIPESTATUS[0]}"
    done
    for t in Compiled1.p Compiled5.z; do
      c=$W/c-$mode-$t; newcache "$c"
      echo "########## [$mode] fortress compile $t.fss   (XXX*.test: compile_err_equals)"
      java -Xmx4g -Xss64m -Dfortress.caches=$c -cp "$pre$CP" com.sun.fortress.Shell \
           compile ProjectFortress/compiler_tests/$t.fss 2>&1 | head -12
      echo "exit=${PIPESTATUS[0]}"
    done
    echo
  done; } > $D/02-compiler-tests.out 2>&1

# --------------- 3 and 4. the interpreter's library and the array libraries
$DC/make-shadows.sh "$W/dc-src" "$W/dc-classes"
javac -nowarn -cp "$CP" -d "$W/dc-classes" $DC/PhaseProbe.java
wf () { # wf <out> <classpath-prefix> <target>
  local c=$W/c-$1; newcache "$c"
  { echo "########## WorldFlip $3"; echo "# classpath prefix: $2"; S=$(date +%s)
    timeout 1800 java -Xmx4g -Xss64m -XX:-OmitStackTraceInFastThrow \
         -Dfortress.caches="$c" -cp "$2$CP:$P" WorldFlip "$3"
    echo "exit=$?"; echo "ELAPSED $(( $(date +%s) - S )) s"; } > "$W/$1" 2>&1
}
perdecl () { # perdecl <out> <classpath-prefix>
  local c=$W/c-$1; newcache "$c"
  { echo "########## PhaseProbe -order typecheck Library/FortressLibrary.fss (tolerant, per declaration)"
    echo "# classpath prefix: $2"; S=$(date +%s)
    timeout 1800 java -Xmx4g -Xss64m -XX:-OmitStackTraceInFastThrow -Dprobe.tolerant=true \
         -Dfortress.caches="$c" -cp "$2$W/dc-classes:$CP" PhaseProbe -order typecheck Library/FortressLibrary.fss
    echo "exit=$?"; echo "ELAPSED $(( $(date +%s) - S )) s"; } > "$W/$1" 2>&1
}
wf 03a-lib-worldflip-before.out  "$P/shadow-classes:"      Library/FortressLibrary.fss
wf 03a-lib-worldflip-after.out   "$NAT:$P/shadow-classes:" Library/FortressLibrary.fss
perdecl 03b-lib-perdecl-before.out ""
# NOTE: as recorded, the after run did NOT finish -- stopped by hand after 767 s
# with 46 of the 446 declarations done (REPORT.md 5b).  shadow.patch has since
# gained followup 2's memo (followup.md 2), which was the cause; the run now
# finishes in 307 s, so this line completes.  followup/run-all.sh re-measures it.
perdecl 03b-lib-perdecl-after.out  "$NAT:"
wf 04-flatarrays-before.out  "$P/shadow-classes:"      explorations/run-c4/src/FlatArrays.fss
wf 04-flatarrays-after.out   "$NAT:$P/shadow-classes:" explorations/run-c4/src/FlatArrays.fss
wf 04-flatarrays2-before.out "$P/shadow-classes:"      explorations/apl/mg/FlatArrays2.fss
wf 04-flatarrays2-after.out  "$NAT:$P/shadow-classes:" explorations/apl/mg/FlatArrays2.fss
# the same after-run with the tree's "any two IntArgs are equal" put back, so that
# an error the new rule CAUSES can be told from one it merely makes reachable
wfx () { local c=$W/c-$1; newcache "$c"
  { echo "########## WorldFlip $2 (nat shadow, -Dprobe.nat.argsAlwaysEqual=true)"; S=$(date +%s)
    timeout 1800 java -Xmx4g -Xss64m -XX:-OmitStackTraceInFastThrow -Dprobe.nat.argsAlwaysEqual=true \
         -Dfortress.caches="$c" -cp "$NAT:$P/shadow-classes:$CP:$P" WorldFlip "$2"
    echo "exit=$?"; echo "ELAPSED $(( $(date +%s) - S )) s"; } > "$W/$1" 2>&1
}
wfx 03c-lib-argsalwaysequal.out Library/FortressLibrary.fss
wfx 04c-flatarrays-argsalwaysequal.out explorations/run-c4/src/FlatArrays.fss
# and the refuted guess about the two subarray errors (REPORT.md 5c): the same run
# with imp's nat conjunct dropped, and its control
wfy () { local c=$W/c-$1; newcache "$c"
  { echo "########## WorldFlip $3 (nat shadow${2:+, $2})"; S=$(date +%s)
    timeout 900 java -Xmx4g -Xss64m -XX:-OmitStackTraceInFastThrow $2 \
         -Dfortress.caches="$c" -cp "$NAT:$P/shadow-classes:$CP:$P" WorldFlip "$3"
    echo "exit=$?"; echo "ELAPSED $(( $(date +%s) - S )) s"; } > "$W/$1" 2>&1
}
wfy 03f-imp-on.out  -Dprobe.nat.impliesIgnoresNats=true Library/FortressLibrary.fss
wfy 03f-imp-off.out ""                                  Library/FortressLibrary.fss
# the kept captures are these runs with the stack-trace lines dropped, plus the
# per-declaration tables of decl-fates.py
for f in 03a-lib-worldflip-before.out 03a-lib-worldflip-after.out \
         03c-lib-argsalwaysequal.out 04c-flatarrays-argsalwaysequal.out \
         03f-imp-on.out 03f-imp-off.out \
         04-flatarrays-before.out 04-flatarrays-after.out \
         04-flatarrays2-before.out 04-flatarrays2-after.out; do
  grep -v '^@@PROBE    at \|^	at ' "$W/$f" > $D/$f
done
python3 $D/decl-fates.py "$W/03b-lib-perdecl-before.out" "$W/03b-lib-perdecl-after.out" \
        > $D/03b-lib-perdecl-fates.txt
for m in before after; do
  { echo "# \$W/03b-lib-perdecl-$m.out with the @@TC DECLAT stack lines dropped."
    grep -vE "^@@TC DECLAT" "$W/03b-lib-perdecl-$m.out"; } | sed "s#$PWD/##g" \
    > $D/03b-lib-perdecl-$m.out
done

# ------------------------------------------------- 5. the export checker, A/B
{ for mode in astree structural; do
    c=$W/c-exp-$mode; newcache "$c"
    FL=""; [ $mode = astree ] && FL="-Dprobe.nat.exportAsTree=true"
    echo "########## nat shadow, equalIntExprs = $([ $mode = astree ] && echo 'false (the tree)' || echo 'structural')"
    java -Xmx4g -Xss64m $FL -Dfortress.caches=$c -cp "$NAT:$CP" com.sun.fortress.Shell \
         compile $D/pNatExp.fsi 2>&1 | head -4
    java -Xmx4g -Xss64m $FL -Dfortress.caches=$c -cp "$NAT:$CP" com.sun.fortress.Shell \
         compile $D/pNatExp.fss 2>&1 | head -20
    echo "exit=${PIPESTATUS[0]}"; echo
  done; } > $D/05-exportchecker.out 2>&1

# ------------------------------- 6. NatExtends1 through compile and run
export FORTRESS_CACHES=$W/caches
{ echo "########## fortress compile NatExtends1.fss   (COMPILER world, nat shadow)"
  java -Xmx4g -Xss64m -Dfortress.caches=$FORTRESS_CACHES -cp "$NAT:$CP" \
       com.sun.fortress.Shell compile $D/NatExtends1.fss 2>&1 | head -30
  echo "---------- fortress run NatExtends1"
  JAVA_FLAGS="-Xmx4g -Xss64m" ./bin/fortress run NatExtends1 2>&1 | head -30
} > $D/06-natextends1.out 2>&1
# the same object without a declared method, so the checker's Java bug is not in
# the way and the question reaches code generation
{ echo "########## fortress compile NatExtends2.fss   (no declared method)"
  java -Xmx4g -Xss64m -Dfortress.caches=$FORTRESS_CACHES -cp "$NAT:$CP" \
       com.sun.fortress.Shell compile $D/NatExtends2.fss 2>&1 | head -20
  echo "---------- fortress run NatExtends2"
  JAVA_FLAGS="-Xmx4g -Xss64m" ./bin/fortress run NatExtends2 2>&1 | head -20
} > $D/06b-natextends2.out 2>&1
echo "run-all done; captures in $D, raw output in $W"
