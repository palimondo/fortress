#!/bin/bash
# Every command of the nat shadow's RUN-TIME follow-up, in order.  Run from $FORTRESS_HOME:
#
#   ./explorations/perf-probes/nat/runtime/run-all.sh <work-dir>
#
# <work-dir> is a scratch directory OUTSIDE the repository.  Nothing tracked is
# modified; default_repository/ is never written (every run gets its own
# -Dfortress.caches).  Captures land beside this script as rN-*.out/.txt; the
# report that reads them is ../runtime.md.
#
# This directory rebuilds its OWN shadow, independent of ../shadow-src and
# ../java/shadow-src (another worker's).  Four committed patches stack, all
# aimed at COPIES (-p8 -d, never at the tracked sources):
#   ../shadow.patch            the 7 Scala sources of the checker shadow  -> scala-src
#   ../java/java-shadow.patch  FnNameInfo.java + the new RTTIsize.java    -> java-src
#   design-a.patch             DESIGN A: a size is not RTTI-bearing       -> java-src
#                              (Naming, MethodInstantiater, CodeGen, OverloadSet)
#   value-position.patch       the third gap: a size read as a value      -> java-src
# Both new behaviours are flag-gated, so ONE build measures both designs:
#   -Dprobe.nat.likeOpr=true|false   design A on (default) / the tree = design B
#   -Dprobe.nat.valuePos=true|false  the size-in-value-position branch (default off)
# The flag must match between the compiling JVM and the running JVM: it decides
# a class name.  The technique is perf-probes/prelude/run-all.sh:7,33-35.
set -u
cd "$(dirname "$0")/../../../.."                     # $FORTRESS_HOME
source experiment/env.sh
D=explorations/perf-probes/nat
J=$D/java
R=$D/runtime
P=explorations/perf-probes/prelude
W=${1:?usage: run-all.sh <work-dir>}
mkdir -p "$W"
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
echo "$CP" > $R/cp.txt
NAT=$R/shadow-classes                                # the Scala shadow
JAV=$R/java-classes                                  # the Java shadow (design A + value pos)
STAMP=$R/stamp-classes                               # design B's stamped <n>$RTTIc classes
newcache () { local c=$1; rm -rf "$c"; mkdir -p "$c"; printf '\0\0\0\0' > "$c/global.map"; }

# ----------------------------------------------------------- the Scala shadow
# The file list is READ OUT OF the patch's own +++ paths, so that this script
# keeps working when ../shadow.patch gains or loses a file.  As measured it was
# seven: Formula, TypeAnalyzer, TypeSchemaAnalyzer, STypesUtil, ExportChecker,
# TypeWellFormedChecker, AbstractMethodChecker.
SHADOWED=$(sed -n 's#^+++ .*/com/sun/fortress/\(scala_src/[^ \t]*\).*#\1#p' $D/shadow.patch)
if [ ! -d $R/scala-src ]; then
  for rel in $SHADOWED; do
    mkdir -p "$(dirname $R/scala-src/com/sun/fortress/$rel)"
    cp ProjectFortress/src/com/sun/fortress/$rel $R/scala-src/com/sun/fortress/$rel
  done
  patch -p7 -d $R/scala-src/com/sun/fortress --forward < $D/shadow.patch
fi
rm -rf $NAT; mkdir -p $NAT
java -Xmx2g -cp "$CP" scala.tools.nsc.Main -d $NAT -classpath "$CP" -encoding UTF-8 \
     $(find $R/scala-src -name '*.scala' | sort)

# ------------------------------------------------------------ the Java shadow
if [ ! -d $R/java-src ]; then
  mkdir -p $R/java-src/com/sun/fortress/compiler/codegen $R/java-src/com/sun/fortress/runtimeSystem
  cp ProjectFortress/src/com/sun/fortress/compiler/codegen/FnNameInfo.java \
     ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java \
     $R/java-src/com/sun/fortress/compiler/codegen/
  cp ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java \
     $R/java-src/com/sun/fortress/compiler/
  cp ProjectFortress/src/com/sun/fortress/runtimeSystem/Naming.java \
     ProjectFortress/src/com/sun/fortress/runtimeSystem/MethodInstantiater.java \
     $R/java-src/com/sun/fortress/runtimeSystem/
  patch -p8 -d $R/java-src/com/sun/fortress --forward < $J/java-shadow.patch
  patch -p8 -d $R/java-src/com/sun/fortress --forward < $R/design-a.patch
  patch -p8 -d $R/java-src/com/sun/fortress --forward < $R/value-position.patch
fi
if [ -n "$(git status --porcelain ProjectFortress/src)" ]; then
  echo "ABORT: a patch touched tracked sources; revert them before going on" >&2
  exit 1
fi
rm -rf $JAV; mkdir -p $JAV
javac -nowarn -encoding UTF-8 -cp "$NAT:$CP" -d $JAV \
      $(find $R/java-src -name '*.java' | sort)
# design B's side needs one stamped class per literal size; the ASM tool is the
# committed $J/StampSizeRTTI.java (read, not modified; its output lands here).
rm -rf $STAMP $W/tool-classes
javac -nowarn -cp "$CP" -d $W/tool-classes $J/StampSizeRTTI.java
java -cp "$W/tool-classes:$JAV:$CP" StampSizeRTTI $STAMP 2 3 4 5

PROBES="$P/pNat1.fss:pNat1 $P/pNat2.fss:pNat2 $P/pNat3.fss:pNat3
        $D/pNat4.fss:pNat4 $D/pNat5.fss:pNat5 $D/pNat6.fss:pNat6
        $D/pNatVec.fss:pNatVec $D/pNatBool.fss:pNatBool
        $J/pNatMeth.fss:pNatMeth $J/pNatGenMeth.fss:pNatGenMeth
        $R/pNatOver.fss:pNatOver $R/pNatCase.fss:pNatCase $R/pTypeCase.fss:pTypeCase"

# world <cache> <likeOpr> <valuePos>: the compiler's own prelude, compiled into a
# PRIVATE cache with both shadows, in library order (explorations/repo-internals.md)
world () { local c=$1 lo=$2 vp=$3
  newcache "$c"
  local SH="java -Xmx4g -Xss64m -XX:-OmitStackTraceInFastThrow -Dprobe.nat.likeOpr=$lo
            -Dprobe.nat.valuePos=$vp -Dfortress.caches=$c -cp $JAV:$NAT:$CP com.sun.fortress.Shell"
  (cd ProjectFortress && $SH compile LibraryBuiltin/AnyType.fss)
  (cd ProjectFortress && $SH compile LibraryBuiltin/CompilerBuiltin.fss)
  $SH compile Library/CompilerLibrary.fss
  $SH compile Library/CompilerAlgebra.fss
  $SH compile Library/CompilerSystem.fss
}
# fcompile/frun: one probe, with the flags and cache of the world it belongs to.
# MORE is prepended to the RUN classpath (bin/run_classpath:27 appends, which is
# too late to shadow Naming), so the run command is spelled out here; it is
# bin/run:25-41 with the shadow in front.
fcompile () { # fcompile <cache> <likeOpr> <valuePos> <file>
  java -Xmx4g -Xss64m -XX:-OmitStackTraceInFastThrow -Dprobe.nat.likeOpr=$2 \
       -Dprobe.nat.valuePos=$3 -Dfortress.caches=$1 -cp "$JAV:$NAT:$CP" \
       com.sun.fortress.Shell compile "$4"
}
frun () { # frun <cache> <likeOpr> <valuePos> <name> [extra-classpath]
  java -Xmx4g -Xss64m -Dfile.encoding=UTF-8 -Dprobe.nat.likeOpr=$2 -Dprobe.nat.valuePos=$3 \
       -cp "${5:-}$JAV:$NAT:$1/bytecode_cache:$1/bytecode_cache/*:$1/nativewrapper_cache:$CP" \
       com.sun.fortress.runtimeSystem.MainWrapper "$4"
}
probes () { # probes <cache> <likeOpr> <valuePos> <extra-run-classpath>
  for spec in $PROBES; do
    f=${spec%%:*}; n=${spec##*:}
    echo "########## fortress compile $f   (likeOpr=$2 valuePos=$3)"
    fcompile "$1" "$2" "$3" "$f" 2>&1 | head -12; echo "exit=${PIPESTATUS[0]}"
    echo "---------- fortress run $n"
    frun "$1" "$2" "$3" "$n" "${4:-}" 2>&1 | grep -v '^	at java.base' | head -8
    echo
  done
}

# ------------------------------------------- 1. DESIGN A, the whole probe set
world $W/cA true false
probes $W/cA true false > $R/r1-probes-A.out 2>&1

# -------------------- 2. DESIGN B, the same set: the tree's kind dispatch, with
# RTTIsize and the stamped <n>$RTTIc classes in front (java.md  2's experiment)
world $W/cB false false
probes $W/cB false false "$PWD/$STAMP:" > $R/r2-probes-B.out 2>&1

# ------------------- 3. DESIGN A plus the value-position branch (the third gap)
world $W/cV true true
{ for spec in $D/pNatVec.fss:pNatVec $R/pNatOver.fss:pNatOver $P/pNat1.fss:pNat1; do
    f=${spec%%:*}; n=${spec##*:}
    echo "########## fortress compile $f   (likeOpr=true valuePos=true)"
    fcompile $W/cV true true $f 2>&1 | head -8; echo "exit=${PIPESTATUS[0]}"
    echo "---------- fortress run $n"
    frun $W/cV true true $n 2>&1 | grep -v '^	at java.base' | head -8
  done; } > $R/r3-valuepos-A.out 2>&1
# and design B with the same branch, to show what still stops it
world $W/cVB false true
{ for n in pNatVec; do
    echo "########## fortress compile $D/$n.fss   (likeOpr=false valuePos=true)"
    fcompile $W/cVB false true $D/$n.fss 2>&1 | head -8; echo "exit=${PIPESTATUS[0]}"
    echo "---------- fortress run $n (with the stamped sizes in front)"
    frun $W/cVB false true $n "$PWD/$STAMP:" 2>&1 | grep -v '^	at java.base' | head -8
  done; } > $R/r4-valuepos-B.out 2>&1

# ------------------------ 4. the five nat compiler tests, stock against design A
# Compiled1.ah/.av/Compiled6.af are `typecheck` tests (AfterTypeChecking.test);
# Compiled1.p and Compiled5.z are `compile` tests with an exact expected error.
{ for mode in stock shadowA; do
    pre=""; fl=""
    [ $mode = shadowA ] && { pre="$JAV:$NAT:"; fl="-Dprobe.nat.likeOpr=true"; }
    for t in Compiled1.ah Compiled1.av Compiled6.af; do
      c=$W/t-$mode-$t; newcache "$c"
      echo "########## [$mode] fortress typecheck $t.fss"
      java -Xmx4g -Xss64m $fl -Dfortress.caches=$c -cp "$pre$CP" com.sun.fortress.Shell \
           typecheck ProjectFortress/compiler_tests/$t.fss 2>&1 | head -12
      echo "exit=${PIPESTATUS[0]}"
    done
    for t in Compiled1.p Compiled5.z; do
      c=$W/t-$mode-$t; newcache "$c"
      echo "########## [$mode] fortress compile $t.fss   (compile_err_equals)"
      java -Xmx4g -Xss64m $fl -Dfortress.caches=$c -cp "$pre$CP" com.sun.fortress.Shell \
           compile ProjectFortress/compiler_tests/$t.fss 2>&1 | head -12
      echo "exit=${PIPESTATUS[0]}"
    done
    echo
  done; } > $R/r5-compiler-tests.out 2>&1

# ------------------------------------- 5. what each design makes the loader do
# -verbose:class names every class the JVM loads, so the RTTI classes each design
# needs can be counted, and three timed runs give the start-up cost.
{ for spec in "A $W/cA true " "B $W/cB false $PWD/$STAMP:"; do
    set -- $spec; d=$1; c=$2; lo=$3; extra=${4:-}
    for n in pNat1 pNatGenMeth; do
      echo "########## [design $d] -verbose:class $n, the RTTI classes"
      java -Xmx4g -Xss64m -verbose:class -Dfile.encoding=UTF-8 -Dprobe.nat.likeOpr=$lo \
        -cp "$extra$JAV:$NAT:$c/bytecode_cache:$c/bytecode_cache/*:$c/nativewrapper_cache:$CP" \
        com.sun.fortress.runtimeSystem.MainWrapper $n 2>&1 \
        | grep -E "RTTIc|RTTIi" | sed 's/\[class,load\] //;s/ source:.*//' | sort | uniq -c
      echo "---------- three timed runs, ms"
      for i in 1 2 3; do
        S=$(date +%s%N)
        frun "$c" $lo false $n "$extra" > /dev/null 2>&1
        echo "  $(( ($(date +%s%N) - S) / 1000000 ))"
      done
    done
  done; } > $R/r6-startup.out 2>&1

# ----------- 6. the literals design B would stamp a class for, in the library
python3 - > $R/r7-lib-literals.txt <<'PYEOF'
import re
from collections import Counter
print("# Integer literals written as STATIC ARGUMENTS in Library/FortressLibrary.fss:")
print("# one line per distinct literal -- design B stamps one <n>$RTTIc class for each.")
lines=open('Library/FortressLibrary.fss',encoding='utf-8').read().split('\n')
c=Counter(); ex={}
for i,l in enumerate(lines,1):
    for m in re.finditer(r'\[\\([^\\\[\]]*?)\\\]', l):     # one [\ ... \] on one line
        for t in re.findall(r'(?<![A-Za-z0-9_$])(\d+)(?![A-Za-z0-9_])', m.group(1)):
            c[t]+=1; ex.setdefault(t,(i,l.strip()[:88]))
print("distinct literals: %d   occurrences: %d" % (len(c), sum(c.values())))
for k in sorted(c, key=int):
    print("  %-3s x%-4d first at FortressLibrary.fss:%d  %s" % (k, c[k], ex[k][0], ex[k][1]))
src='\n'.join(lines)
print("for scale: 'nat' static parameters declared: %d; [\\ ... \\] brackets: %d"
      % (len(re.findall(r'\bnat\s+[A-Za-z]', src)),
         len(re.findall(r'\[\\([^\\\[\]]*?)\\\]', src))))
PYEOF

# --------- 7. the two nat-in-extends-clause probes, under A and under B, and
# then NatExtends1 again with the value-position branch on (its Buf has
# len(): ZZ32 = s.asZZ32, so it needs A and 3 together).  As recorded this step
# was run separately, after steps 1-6, with exactly these commands.
{ for spec in "A $W/cA true " "B $W/cB false $PWD/$STAMP:" "A+3 $W/cV true "; do
    set -- $spec; d=$1; c=$2; lo=$3; extra=${4:-}
    vp=false; [ $d = "A+3" ] && vp=true
    for n in NatExtends1 NatExtends2; do
      echo "########## [design $d] fortress compile $n.fss"
      fcompile "$c" $lo $vp $D/$n.fss 2>&1 | grep -v '^	at java.base' | head -10
      echo "exit=${PIPESTATUS[0]}"
      echo "---------- fortress run $n"
      frun "$c" $lo $vp "$n" "$extra" 2>&1 | grep -v '^	at java.base' | head -8
      echo
    done
  done; } > $R/r8-natextends.out 2>&1

echo "run-all done; captures in $R, raw output in $W"
