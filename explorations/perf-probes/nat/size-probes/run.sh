#!/bin/bash
# Every command of the size probes (../size-probes.md), in order.  Run from anywhere:
#
#   ./explorations/perf-probes/nat/size-probes/run.sh <work-dir> [step ...]
#
# <work-dir> is a scratch directory OUTSIDE the repository.  With no step named,
# every step runs (10 minutes on this container, 7.5 of them the four worlds; longer than the
# Bash tool's ten-minute ceiling, so run it in the background or step by step).
# Steps: build, worlds, s1 s2 s3 s4 s5.  Nothing tracked is modified; default_repository/ is never
# written (every run has its own -Dfortress.caches under <work-dir>).  Captures
# land beside this script as sN-*.out.
#
# The stack is ../runtime/run-all.sh's, rebuilt by the same commands from the same
# committed patches, but into <work-dir>/stack rather than beside the patches:
#   ../shadow.patch               the checker shadow (Scala)              -> scala-src
#   ../java/java-shadow.patch     FnNameInfo.java + RTTIsize.java         -> java-src
#   ../runtime/design-a.patch     design A: a size is not RTTI-bearing    -> java-src
#   ../runtime/value-position.patch  a size read as a value               -> java-src
# and then this directory's own patches, each flag-gated and off by default, so
# that the stack with every new flag off is run-all.sh's stack exactly:
#   dispatch-b.patch   OverloadSet: a size in a dispatched arm's parameter type,
#                      design B (-Dprobe.nat.dispatchB=true)
#   keep-size-params.patch  the checker: a nat parameter kept by normalizeUA
#                      (-Dprobe.nat.keepSizeParams=true)
#   extends-b.patch    CodeGen: design B's own extends-clause piece, java.md § 2
#                      (-Dprobe.nat.extendsB=true)
#   fourth-gap-a.patch MethodInstantiater + InstantiatingClassloader: design A's
#                      descriptor names its object class with the instance's
#                      sizes (-Dprobe.nat.stemFix=true)
# Flags, all read in both the compiling and the running JVM:
#   -Dprobe.nat.likeOpr=true|false   design A (default) / the tree = design B
#   -Dprobe.nat.valuePos=true|false  the value-position branch (default off)
set -u
cd "$(dirname "$0")/../../../.."                     # $FORTRESS_HOME
source explorations/experiment/env.sh
D=explorations/perf-probes/nat
J=$D/java
R=$D/runtime
S=$D/size-probes
P=explorations/perf-probes/prelude
W=${1:?usage: run.sh <work-dir> [step ...]}; shift
case "$(cd "$(dirname "$W")" 2>/dev/null && pwd)/" in
  "$PWD"/*) echo "ABORT: the work dir must be outside the repository" >&2; exit 1;;
esac
mkdir -p "$W"
STEPS=${*:-"build worlds s1 s2 s3 s4 s5"}
want () { case " $STEPS " in *" $1 "*) return 0;; esac; return 1; }
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
K=$W/stack
NAT=$K/shadow-classes                                # the Scala shadow
JAV=$K/java-classes                                  # the Java shadow
STAMP=$K/stamp-classes                               # design B's <n>$RTTIc classes
NEWSCALA="keep-size-params.patch"                  # this directory's Scala patch
NEWJAVA="dispatch-b.patch extends-b.patch fourth-gap-a.patch"   # and its Java patches
newcache () { local c=$1; rm -rf "$c"; mkdir -p "$c"; printf '\0\0\0\0' > "$c/global.map"; }

# ------------------------------------------------------------------ build
if want build; then
  rm -rf $K; mkdir -p $K
  # the Scala shadow: ../runtime/run-all.sh's commands, into $K/scala-src
  SHADOWED=$(sed -n 's#^+++ .*/com/sun/fortress/\(scala_src/[^ \t]*\).*#\1#p' $D/shadow.patch)
  for rel in $SHADOWED; do
    mkdir -p "$(dirname $K/scala-src/com/sun/fortress/$rel)"
    cp ProjectFortress/src/com/sun/fortress/$rel $K/scala-src/com/sun/fortress/$rel
  done
  # Two of shadow.patch's hunks (the parents/excludesClause memo in
  # TypeAnalyzer.scala) are rejected today, here as in run-all.sh: the tree landed
  # its own memo since (d28cf74d0).  Step s5 shows the stack still reproduces r1, r2.
  patch -s -p7 -d $K/scala-src/com/sun/fortress --forward < $D/shadow.patch
  cp -r $K/scala-src $K/scala-src.runall             # run-all.sh's stack, for the diffs
  for p in $NEWSCALA; do
    patch -s -p1 -d $K/scala-src/com/sun/fortress --forward < $S/$p
  done
  mkdir -p $NAT
  java -Xmx2g -cp "$CP" scala.tools.nsc.Main -d $NAT -classpath "$CP" -encoding UTF-8 \
       $(find $K/scala-src -name '*.scala' | sort)
  # the Java shadow: the same five copies and three patches, then ours
  mkdir -p $K/java-src/com/sun/fortress/compiler/codegen $K/java-src/com/sun/fortress/runtimeSystem
  cp ProjectFortress/src/com/sun/fortress/compiler/codegen/FnNameInfo.java \
     ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java \
     $K/java-src/com/sun/fortress/compiler/codegen/
  cp ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java \
     $K/java-src/com/sun/fortress/compiler/
  cp ProjectFortress/src/com/sun/fortress/runtimeSystem/Naming.java \
     ProjectFortress/src/com/sun/fortress/runtimeSystem/MethodInstantiater.java \
     $K/java-src/com/sun/fortress/runtimeSystem/
  patch -s -p8 -d $K/java-src/com/sun/fortress --forward < $J/java-shadow.patch
  patch -s -p8 -d $K/java-src/com/sun/fortress --forward < $R/design-a.patch
  patch -s -p8 -d $K/java-src/com/sun/fortress --forward < $R/value-position.patch
  cp -r $K/java-src $K/java-src.runall               # run-all.sh's stack, for the diffs
  # fourth-gap-a.patch also touches the loader, which run-all.sh does not shadow;
  # it enters as an unchanged copy, so with every new flag off the stack is still
  # run-all.sh's
  cp ProjectFortress/src/com/sun/fortress/runtimeSystem/InstantiatingClassloader.java \
     $K/java-src/com/sun/fortress/runtimeSystem/
  for p in $NEWJAVA; do
    patch -s -p1 -d $K/java-src/com/sun/fortress --forward < $S/$p
  done
  if [ -n "$(git status --porcelain ProjectFortress/src)" ]; then
    echo "ABORT: a patch touched tracked sources; revert them before going on" >&2
    exit 1
  fi
  mkdir -p $JAV
  javac -nowarn -encoding UTF-8 -cp "$NAT:$CP" -d $JAV \
        $(find $K/java-src -name '*.java' | sort)
  mkdir -p $K/tool-classes
  javac -nowarn -cp "$CP" -d $K/tool-classes $J/StampSizeRTTI.java
  # run-all.sh stamps 2 3 4 5; NatGetter's Arr1[\ZZ32,0,3\] needs 0 as well
  java -cp "$K/tool-classes:$JAV:$CP" StampSizeRTTI $STAMP 0 1 2 3 4 5 > /dev/null
  echo "build done"
fi

# world <cache> <flags>: the compiler's own prelude, compiled into a PRIVATE cache
# with the stack, in library order (explorations/repo-internals.md); <flags> are
# -D options, the same in every JVM that compiles or runs against that cache.
world () { local c=$1 fl=$2
  newcache "$c"
  local SH="java -Xmx4g -Xss64m -XX:-OmitStackTraceInFastThrow $fl -Dfortress.caches=$c
            -cp $JAV:$NAT:$CP com.sun.fortress.Shell"
  (cd ProjectFortress && $SH compile LibraryBuiltin/AnyType.fss)
  (cd ProjectFortress && $SH compile LibraryBuiltin/CompilerBuiltin.fss)
  $SH compile Library/CompilerLibrary.fss
  $SH compile Library/CompilerAlgebra.fss
  $SH compile Library/CompilerSystem.fss
}
fcompile () { # fcompile <cache> <flags> <file>
  java -Xmx4g -Xss64m -XX:-OmitStackTraceInFastThrow $2 -Dfortress.caches=$1 \
       -cp "$JAV:$NAT:$CP" com.sun.fortress.Shell compile "$3"
}
frun () { # frun <cache> <flags> <name> [extra-classpath]: bin/run:25-41, the stack in front
  java -Xmx4g -Xss64m -Dfile.encoding=UTF-8 $2 \
       -cp "${4:-}$JAV:$NAT:$1/bytecode_cache:$1/bytecode_cache/*:$1/nativewrapper_cache:$CP" \
       com.sun.fortress.runtimeSystem.MainWrapper "$3"
}
# probe <world> <flags> <file.fss> [extra-classpath] [lines]: one program, compiled
# and run in a FRESH copy of the world's cache.  A shared cache is not enough: a
# program already compiled into it is not compiled again, so a second flag set
# would silently run the first one's classes.
# (run-all.sh's captures print the brackets of a class name in a stack trace as
# '?'; ENC prints them as themselves.  Step s5 leaves it out, to compare.)
ENC="-Dstdout.encoding=UTF-8 -Dstderr.encoding=UTF-8"
NPROBE=0
probe () {
  local n=$(basename "$3" .fss) c
  NPROBE=$((NPROBE + 1)); c=$W/run/$NPROBE-$n
  rm -rf "$c"; mkdir -p $W/run; cp -a "$1" "$c"
  echo "########## fortress compile $3   ($2)   [$(basename $1)]"
  fcompile "$c" "$2 $ENC" "$3" 2>&1 | grep -v '^	at java.base' | head -${5:-14}; echo "exit=${PIPESTATUS[0]}"
  echo "---------- fortress run $n"
  frun "$c" "$2 $ENC" "$n" "${4:-}" 2>&1 | grep -v '^	at java.base' | head -${5:-14}
  echo
  PROBE_CACHE=$c
}
# javap_main <cache> <component> <method-regex> <label>: the disassembly of one
# method of a component's main class, out of the jar the compile left in <cache>.
javap_main () {
  echo "########## $4: javap -c of $2.$3"
  javap -J-Dstdout.encoding=UTF-8 -c -p -cp "$1/bytecode_cache/$2.jar" "$2" 2>&1 \
    | awk -v re="$3" '$0 ~ re {on=1} on {print} on && /athrow|^$/ {exit}'
  echo
}
# javap_template <cache> <component> <name-glob> <label>: the INSTANCEOF and
# CHECKCAST lines of a template class whose name holds oxfords.
javap_template () {
  local x=$W/jx; rm -rf $x; mkdir -p $x
  (cd $x && unzip -q -o "$1/bytecode_cache/$2.jar" 2>/dev/null)
  echo "########## $4: instanceof in the template $3 of $2"
  find $x -type f -name '*.class' -path "*$3*" -print0 | while IFS= read -r -d '' f; do
    cp "$f" $x/t.class; javap -J-Dstdout.encoding=UTF-8 -c -p $x/t.class | grep -E 'instanceof|checkcast'
  done
  echo
}
# javap_decl <cache> <component> <name-glob> <label>: the declaration (javap -p) of
# a template class whose name holds brackets.
javap_decl () {
  local x=$W/jx; rm -rf $x; mkdir -p $x
  (cd $x && unzip -q -o "$1/bytecode_cache/$2.jar" 2>/dev/null)
  echo "########## $4: javap -p of the template $3 of $2"
  find $x -maxdepth 1 -type f -name "$3" -print0 | while IFS= read -r -d '' f; do
    cp "$f" $x/t.class; javap -J-Dstdout.encoding=UTF-8 -p $x/t.class
  done
  echo
}
A="-Dprobe.nat.likeOpr=true -Dprobe.nat.valuePos=false"      # ../runtime/run-all.sh's cA
B="-Dprobe.nat.likeOpr=false -Dprobe.nat.valuePos=false"     # its cB (with $STAMP in front)
V="-Dprobe.nat.likeOpr=true -Dprobe.nat.valuePos=true"       # its cV
VB="-Dprobe.nat.likeOpr=false -Dprobe.nat.valuePos=true"     # its cVB

# ------------------------------------------------------------------ worlds
if want worlds; then
  world $W/cA "$A";  world $W/cB "$B";  world $W/cV "$V";  world $W/cVB "$VB"
fi

# The new flags.  The worlds above are compiled with all of them off.  A new flag
# changes the compiled prelude at most in the descriptor of its one sized
# declaration, the empty trait Matrix (Library/CompilerLibrary.fss:638), which no
# probe uses; the prelude has no opr parameter and no overloaded sized arm.
KEEP="-Dprobe.nat.keepSizeParams=true"                       # keep-size-params.patch
DISB="-Dprobe.nat.dispatchB=true"                            # dispatch-b.patch
EXTB="-Dprobe.nat.extendsB=true"                             # extends-b.patch

# --------------------------------------- s1. probe 1, a dispatched size-generic arm
if want s1; then
  { echo "==================== the checker, as the stack has it and with keep-size-params.patch"
    probe $W/cA "$A" $S/pNatDisp.fss "" 8
    probe $W/cA "$A -Dprobe.nat.argsAlwaysEqual=true" $S/pNatDisp.fss "" 8
    probe $W/cA "$A" $S/pTypeDisp.fss "" 8
    probe $W/cA "$A $KEEP" $S/pNatDispRTR.fss "" 8
    echo "==================== design A"
    probe $W/cA "$A $KEEP" $S/pNatDisp.fss
    javap_main $PROBE_CACHE pNatDisp 'String f\(fortress.AnyType.Any\)' "design A" > $S/s1b-javap.txt 2>&1
    probe $W/cA "$A $KEEP" $S/pNatDispTrait.fss
    javap_decl $PROBE_CACHE pNatDispTrait '*Arr1*RTTIi.class' "design A" >> $S/s1b-javap.txt 2>&1
    probe $W/cA "$A $KEEP" $S/pNatDispLit.fss
    javap_main $PROBE_CACHE pNatDispLit 'String h\(fortress.AnyType.Any\)' "design A" >> $S/s1b-javap.txt 2>&1
    probe $W/cV "$V $KEEP" $S/pNatDispSize.fss
    echo "==================== design B, as java.md § 2 left it"
    probe $W/cB "$B $KEEP" $S/pNatDisp.fss "$STAMP:"
    probe $W/cB "$B $KEEP" $S/pNatDispTrait.fss "$STAMP:"
    probe $W/cB "$B $KEEP" $S/pNatDispLit.fss "$STAMP:"
    echo "==================== design B with its extends-clause piece (extends-b.patch)"
    probe $W/cB "$B $KEEP $EXTB" $S/pNatDispTrait.fss "$STAMP:"
    echo "==================== design B with the dispatch fix (dispatch-b.patch)"
    probe $W/cB "$B $KEEP $DISB" $S/pNatDisp.fss "$STAMP:"
    javap_main $PROBE_CACHE pNatDisp 'String f\(fortress.AnyType.Any\)' "design B + dispatch-b.patch" >> $S/s1b-javap.txt 2>&1
    probe $W/cB "$B $KEEP $DISB $EXTB" $S/pNatDispTrait.fss "$STAMP:"
    probe $W/cB "$B $KEEP $DISB" $S/pNatDispLit.fss "$STAMP:"
    probe $W/cVB "$VB $KEEP $DISB" $S/pNatDispSize.fss "$STAMP:"
  } > $S/s1-dispatch.out 2>&1
fi

# ----------------------------- s2. probe 2, a size read inside a sized object's method
STEM="-Dprobe.nat.stemFix=true"                             # fourth-gap-a.patch
if want s2; then
  { echo "==================== design A with the value-position piece (run-all.sh's cV)"
    probe $W/cV "$V" $D/NatExtends1.fss "" 30
    probe $W/cV "$V" $S/NatGetter.fss "" 30
    echo "==================== the same, with fourth-gap-a.patch"
    probe $W/cV "$V $STEM" $D/NatExtends1.fss
    probe $W/cV "$V $STEM" $S/NatGetter.fss
    echo "==================== design B with the value-position piece (run-all.sh's cVB)"
    probe $W/cVB "$VB" $D/NatExtends1.fss "$STAMP:"
    probe $W/cVB "$VB" $S/NatGetter.fss "$STAMP:"
    echo "==================== design B with its extends-clause piece (extends-b.patch)"
    probe $W/cVB "$VB $EXTB" $D/NatExtends1.fss "$STAMP:"
    probe $W/cVB "$VB $EXTB" $S/NatGetter.fss "$STAMP:"
    echo "==================== design B with extends-b.patch and fourth-gap-a.patch"
    probe $W/cVB "$VB $EXTB $STEM" $D/NatExtends1.fss "$STAMP:"
    probe $W/cVB "$VB $EXTB $STEM" $S/NatGetter.fss "$STAMP:"
    echo "==================== the cause without a size read: a sized type argument through dispatch"
    probe $W/cA "$A" $S/pNatJavaRep.fss
    probe $W/cA "$A $STEM" $S/pNatJavaRep.fss
    probe $W/cB "$B" $S/pNatJavaRep.fss "$STAMP:"
  } > $S/s2-fourth-gap.out 2>&1
  # the object classes a sized descriptor makes the loader load: -verbose:class
  { for fix in "" "$STEM"; do
      probe $W/cA "$A $fix" $P/pNat1.fss > /dev/null 2>&1
      echo "########## [$A $fix] pNat1: the classes loaded whose name holds Box with its size"
      frun $PROBE_CACHE "$A $fix -verbose:class" pNat1 2>&1 | grep -E 'class,load.*Box(⟦|❮)' \
        | sed 's/.*\[class,load\] //;s/ source:.*//'
      probe $W/cV "$V $fix" $D/pNatVec.fss > /dev/null 2>&1
      echo "########## [$V $fix] pNatVec: the classes loaded whose name holds Vec with its size"
      frun $PROBE_CACHE "$V $fix -verbose:class" pNatVec 2>&1 | grep -E 'class,load.*Vec(⟦|❮)' \
        | sed 's/.*\[class,load\] //;s/ source:.*//'
      echo "---------- pNatVec's own output"
      frun $PROBE_CACHE "$V $fix" pNatVec 2>&1 | head -3
      echo
    done; } > $S/s2b-loaded-classes.txt 2>&1
fi

# ------------------ s4. ledger row 366's program (the brief's reading: A's ONLY lines fix it)
if want s4; then
  { probe $W/cB "$B" explorations/compile-ladder/rung-default-rendering/probes/skeptic/SkOprParam.fss
    probe $W/cA "$A" explorations/compile-ladder/rung-default-rendering/probes/skeptic/SkOprParam.fss
    probe $W/cA "$A $STEM" explorations/compile-ladder/rung-default-rendering/probes/skeptic/SkOprParam.fss
  } > $S/s4-row366.out 2>&1
fi

# ------ s5. with every new flag off the stack is run-all.sh's: its r1 and r2, again
# The probe set and the format are ../runtime/run-all.sh's, all compiled into one
# copy of the world as there; the fresh output stays in <work-dir> and only its
# difference from the committed capture lands here.
if want s5; then
  RPROBES="$P/pNat1.fss:pNat1 $P/pNat2.fss:pNat2 $P/pNat3.fss:pNat3
          $D/pNat4.fss:pNat4 $D/pNat5.fss:pNat5 $D/pNat6.fss:pNat6
          $D/pNatVec.fss:pNatVec $D/pNatBool.fss:pNatBool
          $J/pNatMeth.fss:pNatMeth $J/pNatGenMeth.fss:pNatGenMeth
          $R/pNatOver.fss:pNatOver $R/pNatCase.fss:pNatCase $R/pTypeCase.fss:pTypeCase"
  runall_probes () { # <cache> <likeOpr> <valuePos> <extra> [more flags]: run-all.sh's probes()
    for spec in $RPROBES; do
      f=${spec%%:*}; n=${spec##*:}
      echo "########## fortress compile $f   (likeOpr=$2 valuePos=$3)"
      fcompile "$1" "-Dprobe.nat.likeOpr=$2 -Dprobe.nat.valuePos=$3 ${5:-}" "$f" 2>&1 | head -12; echo "exit=${PIPESTATUS[0]}"
      echo "---------- fortress run $n"
      frun "$1" "-Dprobe.nat.likeOpr=$2 -Dprobe.nat.valuePos=$3 ${5:-}" "$n" "${4:-}" 2>&1 | grep -v '^	at java.base' | head -8
      echo
    done
  }
  rm -rf $W/r5A $W/r5B; cp -a $W/cA $W/r5A; cp -a $W/cB $W/r5B
  runall_probes $W/r5A true false > $W/r1-probes-A.out 2>&1
  runall_probes $W/r5B false false "$STAMP:" > $W/r2-probes-B.out 2>&1
  # and the same set under A with fourth-gap-a.patch on, against r1
  rm -rf $W/r5S; cp -a $W/cA $W/r5S
  runall_probes $W/r5S true false "" "$STEM" > $W/r1-probes-A-stemfix.out 2>&1
  { for r in r1-probes-A r2-probes-B; do
      echo "########## diff $R/$r.out  <this stack>/$r.out"
      diff $R/$r.out $W/$r.out; echo "diff exit=$?"
    done
    echo "########## diff $R/r1-probes-A.out  <this stack, $STEM>/r1-probes-A-stemfix.out"
    diff $R/r1-probes-A.out $W/r1-probes-A-stemfix.out; echo "diff exit=$?"
  } > $S/s5-runall-check.txt 2>&1
fi

# ------------------------------------------------ s3. probe 3, a type test on a size
if want s3; then
  { echo "==================== design A"
    probe $W/cA "$A" $S/pTypeCase2.fss
    probe $W/cA "$A" $S/pNatCase2.fss
    C2=$PROBE_CACHE
    probe $W/cA "$A" $S/pNatCaseGen.fss
    { javap_main $C2 pNatCase2 'String which\(' "design A"
      javap_template $PROBE_CACHE pNatCaseGen 'isOfSize' "design A"; } > $S/s3b-javap.txt 2>&1
    echo "==================== design B"
    probe $W/cB "$B" $S/pTypeCase2.fss "$STAMP:"
    probe $W/cB "$B" $S/pNatCase2.fss "$STAMP:"
    probe $W/cB "$B" $S/pNatCaseGen.fss "$STAMP:"
  } > $S/s3-typecase.out 2>&1
fi
