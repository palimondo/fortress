#!/bin/bash
# Every command of the nat shadow's JAVA follow-up, in order.  Run from $FORTRESS_HOME:
#
#   ./explorations/perf-probes/nat/java/run-all.sh <work-dir>
#
# <work-dir> is a scratch directory OUTSIDE the repository.  Nothing tracked is
# modified; default_repository/ is never written (every run gets its own
# -Dfortress.caches / FORTRESS_CACHES).  Captures land beside this script as
# jN-*.out / .txt; the report that reads them is ../java.md.
#
# Two shadows stack on one classpath, both rebuilt here from committed patches:
#   ../shadow-classes      the SEVEN Scala sources of ../shadow.patch (REPORT.md 1,
#                          followup.md; rebuilt exactly as ../run-all.sh does it)
#   java/shadow-classes    the ONE Java source of java-shadow.patch --
#                          compiler/codegen/FnNameInfo.java -- plus the one new
#                          file that patch adds, runtimeValues/RTTIsize.java,
#                          which only the run-time experiment of step 5 uses.
# The Java technique is perf-probes/prelude/run-all.sh:7,33-35: a copied class
# compiled with javac against the build's own classpath and put first on it.
set -u
cd "$(dirname "$0")/../../../.."                     # $FORTRESS_HOME
source experiment/env.sh
D=explorations/perf-probes/nat
J=$D/java
P=explorations/perf-probes/prelude
DC=$P/desugar-codegen
W=${1:?usage: run-all.sh <work-dir>}
mkdir -p "$W"
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
NAT=$D/shadow-classes
JAV=$J/shadow-classes
STAMP=$J/stamp-classes
newcache () { local c=$1; rm -rf "$c"; mkdir -p "$c"; printf '\0\0\0\0' > "$c/global.map"; }

# ------------------------------------------------- the Scala shadow (as before)
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
fi
rm -rf $NAT; mkdir -p $NAT
java -Xmx2g -cp "$CP" scala.tools.nsc.Main -d $NAT -classpath "$CP" -encoding UTF-8 \
     $(find $D/shadow-src -name '*.scala' | sort)

# -------------------------------------------------------------- the Java shadow
# java-shadow.patch edits one tracked file and adds one new one.  -p8 -d aims it
# AT THE COPIES: eight components strip
# "explorations/perf-probes/nat/java/shadow-src/com/sun/fortress/" off the +++
# paths and leave "compiler/codegen/FnNameInfo.java".  Plain `patch -p0` would
# resolve the --- paths and edit the tracked source, which must never happen.
if [ ! -d $J/shadow-src ]; then
  mkdir -p $J/shadow-src/com/sun/fortress/compiler/codegen
  cp ProjectFortress/src/com/sun/fortress/compiler/codegen/FnNameInfo.java \
     $J/shadow-src/com/sun/fortress/compiler/codegen/FnNameInfo.java
  patch -p8 -d $J/shadow-src/com/sun/fortress --forward < $J/java-shadow.patch
fi
if [ -n "$(git status --porcelain ProjectFortress/src)" ]; then
  echo "ABORT: a patch touched tracked sources; revert them before going on" >&2
  exit 1
fi
rm -rf $JAV; mkdir -p $JAV
javac -nowarn -encoding UTF-8 -cp "$CP" -d $JAV \
      $(find $J/shadow-src -name '*.java' | sort)
# the stamped RTTI class of one literal size, for step 5 only (see StampSizeRTTI.java)
rm -rf $STAMP $W/tool-classes
javac -nowarn -cp "$CP" -d $W/tool-classes $J/StampSizeRTTI.java
java -cp "$W/tool-classes:$CP" StampSizeRTTI $STAMP 3 2 5   # the sizes pNat1/pNatGenMeth/pNatVec use

# ---------------------------------------- 1. the eight probes, compiler's world
# The compiler's own prelude, compiled into a PRIVATE cache with both shadows, in
# library order (explorations/repo-internals.md).
export FORTRESS_CACHES=$W/caches
newcache "$FORTRESS_CACHES"
SH="java -Xmx4g -Xss64m -XX:-OmitStackTraceInFastThrow -Dfortress.caches=$FORTRESS_CACHES -cp $JAV:$NAT:$CP com.sun.fortress.Shell"
(cd ProjectFortress && $SH compile LibraryBuiltin/AnyType.fss)
(cd ProjectFortress && $SH compile LibraryBuiltin/CompilerBuiltin.fss)
$SH compile Library/CompilerLibrary.fss
$SH compile Library/CompilerAlgebra.fss
$SH compile Library/CompilerSystem.fss
# pNat1-3 are the prelude probe's; pNat4-6, pNatVec, pNatBool the nat shadow's;
# pNatMeth and pNatGenMeth are this step's (a method, and a generic method, on a
# nat-parameterized receiver -- the two shapes the Java site is reached by).
PROBES="$P/pNat1.fss:pNat1 $P/pNat2.fss:pNat2 $P/pNat3.fss:pNat3
        $D/pNat4.fss:pNat4 $D/pNat5.fss:pNat5 $D/pNat6.fss:pNat6
        $D/pNatVec.fss:pNatVec $D/pNatBool.fss:pNatBool
        $J/pNatMeth.fss:pNatMeth $J/pNatGenMeth.fss:pNatGenMeth"
{ for spec in $PROBES; do
    f=${spec%%:*}; n=${spec##*:}
    echo "########## fortress compile $f   (COMPILER world, Scala + Java shadow)"
    $SH compile $f 2>&1 | head -20; echo "exit=${PIPESTATUS[0]}"
    echo "---------- fortress run $n   (no stamped size RTTI)"
    JAVA_FLAGS="-Xmx4g -Xss64m" ./bin/fortress run $n 2>&1 | grep -v '^	at java.base' | head -8
    echo
  done; } > $J/j1-probes.out 2>&1
# the same two nat-in-extends probes that stopped at the checker before
{ for n in NatExtends1 NatExtends2; do
    echo "########## fortress compile $n.fss   (Scala + Java shadow)"
    $SH compile $D/$n.fss 2>&1 | grep -v '^	at java.base' | head -14
    echo "exit=${PIPESTATUS[0]}"
    echo "---------- the same with the JAVA shadow off, for the A/B"
    java -Xmx4g -Xss64m -XX:-OmitStackTraceInFastThrow -Dfortress.caches=$FORTRESS_CACHES \
         -cp "$NAT:$CP" com.sun.fortress.Shell compile $D/$n.fss 2>&1 | head -8
    echo
  done; } > $J/j1b-natextends.out 2>&1

# ------------------------ 2. the five nat compiler tests, stock against shadowed
# Compiled1.ah/.av/Compiled6.af are `typecheck` tests (AfterTypeChecking.test);
# Compiled1.p and Compiled5.z are `compile` tests with an exact expected error
# (XXX1p.test, XXX5z.test).
{ for mode in stock shadow; do
    pre=""; [ $mode = shadow ] && pre="$JAV:$NAT:"
    for t in Compiled1.ah Compiled1.av Compiled6.af; do
      c=$W/jt-$mode-$t; newcache "$c"
      echo "########## [$mode] fortress typecheck $t.fss   (AfterTypeChecking.test)"
      java -Xmx4g -Xss64m -Dfortress.caches=$c -cp "$pre$CP" com.sun.fortress.Shell \
           typecheck ProjectFortress/compiler_tests/$t.fss 2>&1 | head -12
      echo "exit=${PIPESTATUS[0]}"
    done
    for t in Compiled1.p Compiled5.z; do
      c=$W/jt-$mode-$t; newcache "$c"
      echo "########## [$mode] fortress compile $t.fss   (XXX*.test: compile_err_equals)"
      java -Xmx4g -Xss64m -Dfortress.caches=$c -cp "$pre$CP" com.sun.fortress.Shell \
           compile ProjectFortress/compiler_tests/$t.fss 2>&1 | head -12
      echo "exit=${PIPESTATUS[0]}"
    done
    echo
  done; } > $J/j2-compiler-tests.out 2>&1
# and the regression test that exercises the shared inference machinery.  It runs
# in the step-1 cache, which already holds the compiler's prelude: a private cache
# of its own compiles but cannot link (fortress/CompilerBuiltin$Object$RTTIi).
{ for t in Compiled12.invariantInference2 Compiled12.invariantInference; do
    echo "########## fortress compile $t.fss"
    $SH compile ProjectFortress/compiler_tests/$t.fss 2>&1 | head -8
    echo "exit=${PIPESTATUS[0]}"
  done
  echo "---------- fortress run Compiled12.invariantInference"
  JAVA_FLAGS="-Xmx4g -Xss64m" ./bin/fortress run Compiled12.invariantInference 2>&1 | head -16
} > $J/j2b-inference-regression.out 2>&1

# ------------------------- 3. the interpreter's library, whole compilation units
$DC/make-shadows.sh "$W/dc-src" "$W/dc-classes"
javac -nowarn -cp "$CP" -d "$W/dc-classes" $DC/PhaseProbe.java
javac -nowarn -cp "$CP" -d $P $P/WorldFlip.java
javac -nowarn -cp "$CP" -d $P/shadow-classes \
      $P/shadow-src/com/sun/fortress/compiler/StaticChecker.java
wf () { # wf <out> <classpath-prefix> <target>
  local c=$W/c-$1; newcache "$c"
  { echo "########## WorldFlip $3"; echo "# classpath prefix: $2"; S=$(date +%s)
    timeout 1800 java -Xmx4g -Xss64m -XX:-OmitStackTraceInFastThrow \
         -Dfortress.caches="$c" -cp "$2$CP:$P" WorldFlip "$3"
    echo "exit=$?"; echo "ELAPSED $(( $(date +%s) - S )) s"; } > "$W/$1" 2>&1
  grep -v '^@@PROBE    at \|^	at ' "$W/$1" > $J/$1
}
wf j3-lib-worldflip.out "$JAV:$NAT:$P/shadow-classes:" Library/FortressLibrary.fss

# ------------------------------- 4. the same, per top-level declaration (the run
# whose 263/142/41 is the number this step moves; the BEFORE side is the tree's
# committed capture, ../03b-lib-perdecl-before.out)
perdecl () { # perdecl <out> <classpath-prefix>
  local c=$W/c-$1; newcache "$c"
  { echo "########## PhaseProbe -order typecheck Library/FortressLibrary.fss (tolerant, per declaration)"
    echo "# classpath prefix: $2"; S=$(date +%s)
    timeout 3600 java -Xmx4g -Xss64m -XX:-OmitStackTraceInFastThrow -Dprobe.tolerant=true \
         -Dfortress.caches="$c" -cp "$2$W/dc-classes:$CP" PhaseProbe -order typecheck Library/FortressLibrary.fss
    echo "exit=$?"; echo "ELAPSED $(( $(date +%s) - S )) s"; } > "$W/$1" 2>&1
}
perdecl j4-lib-perdecl.out "$JAV:$NAT:"
{ echo "# \$W/j4-lib-perdecl.out with the @@TC DECLAT stack lines dropped."
  grep -vE "^@@TC DECLAT" "$W/j4-lib-perdecl.out"; } | sed "s#$PWD/##g" > $J/j4-lib-perdecl.out
python3 $D/decl-fates.py $D/03b-lib-perdecl-before.out $J/j4-lib-perdecl.out \
        > $J/j4-lib-perdecl-fates.txt
# and the Scala-shadow-only side of the same run, so the 41 -> N move is attributable
python3 $D/decl-fates.py $D/followup/f6-perdecl-after.out $J/j4-lib-perdecl.out \
        > $J/j4b-vs-scala-only-fates.txt

# --------------------- 5. the run-time experiment: one stamped size RTTI class
# MORE_PATH is appended to the run classpath by bin/run_classpath:27-31.  The two
# classes it adds are NEW names, so nothing is shadowed at run time.
{ echo "########## the load failure, WITHOUT the stamp (the recorded stop condition)"
  for n in pNat1 pNatVec pNatMeth pNatGenMeth; do echo "---------- fortress run $n"
    JAVA_FLAGS="-Xmx4g -Xss64m" ./bin/fortress run $n 2>&1 | grep -v '^	at java.base' | head -8
  done
  echo
  echo "########## the same WITH the stamped 3\$RTTIc / 2\$RTTIc and RTTIsize"
  echo "# MORE_PATH=$STAMP:$JAV"
  for n in pNat1 pNat2 pNat3 pNatVec pNatMeth pNatGenMeth; do echo "---------- fortress run $n"
    MORE_PATH="$PWD/$STAMP:$PWD/$JAV" JAVA_FLAGS="-Xmx4g -Xss64m" \
      ./bin/fortress run $n 2>&1 | grep -v '^	at java.base' | head -8
  done; } > $J/j5-runtime-stamp.out 2>&1

# ------------- 6. the mangled names, read off the generated classes themselves
# normalizedSchema's output reaches a JVM name only for a GENERIC method, through
# NamingCzar.genericMethodName (NamingCzar.java:811-833).  pNatGenMeth has one on
# a nat receiver and one on a type receiver, so the two manglings sit side by side.
python3 - "$FORTRESS_CACHES/bytecode_cache/pNatGenMeth.jar" > $J/j6-mangled-names.txt <<'PYEOF'
import sys, zipfile, struct
def utf8_constants(data):
    n = struct.unpack('>H', data[8:10])[0]; i = 10; out = []; k = 1
    while k < n:
        tag = data[i]
        if tag == 1:
            l = struct.unpack('>H', data[i+1:i+3])[0]
            out.append(data[i+3:i+3+l].decode('utf-8', 'replace')); i += 3+l
        elif tag in (7, 8, 16, 19, 20): i += 3
        elif tag == 15: i += 4
        elif tag in (3, 4, 9, 10, 11, 12, 17, 18): i += 5
        elif tag in (5, 6): i += 9; k += 1
        else: raise Exception("constant pool tag %d" % tag)
        k += 1
    return out
z = zipfile.ZipFile(sys.argv[1])
print("# The JVM names pNatGenMeth.fss produces, read out of its own class files.")
print("# Entries of %s:" % sys.argv[1].split('/')[-1])
for e in z.namelist(): print("#   " + e)
print()
for e in z.namelist():
    if not e.endswith(".class"): continue
    hits = sorted(set(s for s in utf8_constants(z.read(e)) if "idx" in s))
    if hits:
        print("== " + e)
        for h in hits: print("     " + h)
PYEOF

echo "run-all done; captures in $J, raw output in $W"
