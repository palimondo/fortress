#!/bin/bash
# scope-run.sh <work-dir>: every command behind ../scope-call-site-dispatch.md, in order.
# <work-dir> is scratch OUTSIDE the repository: shadow sources and classes, private caches,
# the library stack, raw outputs.  No tracked file is modified; default_repository/ is never
# written (every run has its own -Dfortress.caches).  Sections: SKIP_TESTS=1 re-summarises
# sections 3 and 5's saved outputs instead of re-running them (about 90 minutes together).
#
# The shadow: ../shadow/shadow.patch (rung P's -Dprobe.rungP switch and route C's sketch, as the
# dispatch probe built it) on four checker sources, then scope-shadow.patch on OverloadSet.java
# (-Dprobe.scope=off|callsite|skip) and OverloadingChecker.scala (-Dprobe.spSentence=off|own|lifted).
set -u
cd "$(dirname "$0")/../../../.."                     # $FORTRESS_HOME
source explorations/experiment/env.sh
M=explorations/reviews/mie-probes; D=$M/scope
W=${1:?usage: scope-run.sh <work-dir>}; mkdir -p "$W"; W=$(cd "$W" && pwd)
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
newcache () { rm -rf "$1"; mkdir -p "$1"; printf '\0\0\0\0' > "$1/global.map"; }

# ------------------------------------------------------------------ 0. the shadow
SS=$W/src/com/sun/fortress; rm -rf $W/src $W/classes; mkdir -p $W/classes
for rel in scala_src/types/TypeAnalyzer.scala scala_src/typechecker/TypeHierarchyChecker.scala \
           scala_src/typechecker/OverloadingChecker.scala scala_src/overloading/OverloadingOracle.scala \
           compiler/OverloadSet.java; do
  mkdir -p "$(dirname $SS/$rel)"; cp ProjectFortress/src/com/sun/fortress/$rel $SS/$rel
done
patch -p6 -d $SS --forward < $M/shadow/shadow.patch > /dev/null || exit 1
patch -p6 -d $SS --forward < $D/scope-shadow.patch || exit 1
[ -z "$(git status --porcelain ProjectFortress/src)" ] || { echo "ABORT: tracked sources touched" >&2; exit 1; }
java -Xmx2g -cp "$CP" scala.tools.nsc.Main -d $W/classes -classpath "$CP" -encoding UTF-8 $(find $W/src -name '*.scala') 2>&1 | grep -i ' error' 
javac -nowarn -encoding UTF-8 -cp "$CP" -d $W/classes $SS/compiler/OverloadSet.java 2>&1 | grep -v '^Note'

# --------------------- 1. the compiler prelude: stock (the build alone) and under the shadow
prelude () { local c=$1; shift; newcache $c
  local SH="java -Xmx4g -Xss64m $* -Dfortress.caches=$c com.sun.fortress.Shell"
  (cd ProjectFortress && $SH compile LibraryBuiltin/AnyType.fss && $SH compile LibraryBuiltin/CompilerBuiltin.fss)
  for f in CompilerLibrary CompilerAlgebra CompilerSystem; do $SH compile Library/$f.fss; done; }
prelude $W/caches -cp $CP
prelude $W/caches-cs -Dprobe.scope=callsite -cp $W/classes:$CP
cmpjar () { local a=$(mktemp -d) b=$(mktemp -d)       # class files of two jars, byte for byte
  (cd $a && unzip -qo "$1" 2>/dev/null); (cd $b && unzip -qo "$2" 2>/dev/null)
  local d=$(diff -rq $a $b | sed -e "s#$a#A#g; s#$b#B#g")
  [ -z "$d" ] && echo "identical ($(find $a -type f | wc -l) files)" || echo "DIFFERENT: $(echo "$d" | wc -l) files"
  rm -rf $a $b; }
{ echo "# the compiler prelude compiled stock and with -Dprobe.scope=callsite"
  for j in $(ls $W/caches/bytecode_cache); do echo "$j: $(cmpjar $W/caches/bytecode_cache/$j $W/caches-cs/bytecode_cache/$j)"; done
} > $D/prelude-compare.txt

# ------------------------------------------ 2. the probes: link under each mode, run, capture
export FORTRESS_CACHES=$W/caches
RCP=$(./bin/run_classpath 2>/dev/null | tail -1)
probe () { local d=$1 p=$2; shift 2               # probe <dir> <name> <flag sets...>
  for fl in "$@"; do
    echo "=== fortress link $p.fss   $fl"
    rm -f $FORTRESS_CACHES/bytecode_cache/$p.jar $FORTRESS_CACHES/analyzed_cache/$p-*; touch $d/$p.fss
    (cd $d && java -Xmx4g -Xss64m $fl -Dfortress.caches=$FORTRESS_CACHES -cp $W/classes:$CP \
       com.sun.fortress.Shell link $p.fss 2>&1 | sed -e "s#$PWD/##g"; exit ${PIPESTATUS[0]}); echo "link exit=$?"
    if [ -f $FORTRESS_CACHES/bytecode_cache/$p.jar ]; then
      echo "=== fortress run $p"
      java -Xmx1g -cp "$RCP" com.sun.fortress.runtimeSystem.MainWrapper $p 2>&1 | grep -v '^\s*at \|^\s*\.\.\. [0-9]* more' \
        | sed -e 's/ @[0-9a-f]\{4,\})/)/' | cut -c1-300
      echo "run exit=${PIPESTATUS[0]}"
    fi
  done; }
MIE="-Dprobe.rungP=hier"
{ for s in off callsite skip; do
    for p in MieDispatch MieDispatchSub MieDispatchAny; do probe $M $p "$MIE -Dprobe.scope=$s"; done
    probe $M MieDispatchZZ32 "-Dprobe.scope=$s"; probe $M RouteCProbe "-Dprobe.scope=$s"
  done; } > $D/dispatch-probes.compiled.txt 2>&1
for p in ScopeArms ScopeArmsX ScopeMethod; do
  { for s in off callsite; do probe $D $p "$MIE -Dprobe.scope=$s"; done; } > $D/$p.compiled.txt 2>&1; done
for p in ScopeZZ32Sub ScopeAlpha2; do
  { for s in off callsite; do probe $D $p "-Dprobe.scope=$s"; done; } > $D/$p.compiled.txt 2>&1; done
probe $D ScopePad -Dprobe.spSentence=off -Dprobe.spSentence=own > $D/ScopePad.compiled.txt 2>&1

# ------------------------------------------------ javap: MieDispatchSub's dispatcher template
J=$W/javap; rm -rf $J; mkdir -p $J
for s in off callsite; do
  probe $M MieDispatchSub "$MIE -Dprobe.scope=$s" > /dev/null 2>&1
  mkdir -p $J/$s; (cd $J/$s && unzip -qo $FORTRESS_CACHES/bytecode_cache/MieDispatchSub.jar 2>/dev/null)
  find $J/$s -name '*.class' -path '*U2699*' -exec cp {} $J/$s.class \;
done
{ echo "# javap -c -p MieDispatchSub's dispatcher template grab⟦X⟧ (Tag arrow), stock then -Dprobe.scope=callsite."
  echo "# javap prints the non-ASCII brackets as ?: Sub?X? is Sub⟦X⟧; grab??X?? is the Tag generic's own body."
  for s in off callsite; do echo; echo "## $s"
    javap -c -p $J/$s.class | sed -n '/the_function(/,/^$/p' | grep -v '^\s*$' | cut -c1-230; done
} > $D/javap-template.txt

# ---------- 3. the compiler's tests that declare generic overloads: stock, callsite, skip
LIST=$W/testlist.txt
(cd ProjectFortress/compiler_tests && { grep -l -i "overload" *.fss; ls | grep -i -E "overload|generic" | grep '\.fss$'
  python3 - <<'PY'
import re, glob, collections      # files where a name has two declarations and one of them is generic
for f in sorted(glob.glob('*.fss')):
    src = re.sub(r'\(\*.*?\*\)', '', open(f, encoding='utf-8', errors='replace').read(), flags=re.S)
    decls = collections.defaultdict(list)
    for m in re.finditer(r'^[ \t]*(?:private\s+|getter\s+|setter\s+)?([a-z_][A-Za-z0-9_]*|[A-Z][A-Z_]+|opr\s+\S+)\s*(\[\\[^\]]*\\\])?\s*\(', src, re.M):
        n = m.group(1)
        if n in ('if','while','for','println','print','do','case','typecase','assert','fail','label','exit','throw','atomic','spawn','run','end'): continue
        decls[n].append(bool(m.group(2)))
    if any(len(g) >= 2 and any(g) for g in decls.values()): print(f)
PY
  } | sort -u | sed 's/\.fss$//') > $LIST
tests () { local mode=$1 C=$W/caches-t-$1 O=$W/tests-$1 CLS FL
  if [ $mode = stock ]; then CLS=; FL=; newcache $C; cp -a $W/caches/. $C/; else CLS=$W/classes:; FL=-Dprobe.scope=$mode; newcache $C; cp -a $W/caches-cs/. $C/; fi
  rm -f $C/bytecode_cache/Mie* $C/bytecode_cache/Route* $C/bytecode_cache/Scope*; rm -rf $O; mkdir -p $O
  local R=$(FORTRESS_CACHES=$C ./bin/run_classpath 2>/dev/null | tail -1)
  for p in $(cat $LIST); do
    { echo "=== link $p"
      (cd ProjectFortress/compiler_tests && java -Xmx4g -Xss64m $FL -Dfortress.caches=$C -cp $CLS$CP \
         com.sun.fortress.Shell link $p.fss 2>&1 | sed -e "s#$PWD/##g" | head -40; exit ${PIPESTATUS[0]}); echo "link exit=$?"
      if [ -f $C/bytecode_cache/$p.jar ]; then cp $C/bytecode_cache/$p.jar $O/$p.jar; echo "=== run $p"
        (cd ProjectFortress/compiler_tests && java -Xmx1g -cp "$R" com.sun.fortress.runtimeSystem.MainWrapper $p 2>&1 \
           | grep -v '^\s*at \|^\s*\.\.\. [0-9]* more' | cut -c1-300 | head -30; echo "run exit=${PIPESTATUS[0]}"); fi; } > $O/$p.txt 2>&1
  done; }
[ -n "${SKIP_TESTS:-}" ] || { tests stock; tests callsite; tests skip; }
{ echo "# compiler_tests declaring a generic overload, or matching 'overload' or Generic/Overload in the name: $(wc -l < $LIST)"
  echo "# test | stock link/run exits | callsite: output, classes | skip: output"
  for p in $(cat $LIST); do
    o=$(cmp -s $W/tests-stock/$p.txt $W/tests-callsite/$p.txt && echo same || echo DIFF)
    k=$(cmp -s $W/tests-stock/$p.txt $W/tests-skip/$p.txt && echo same || echo DIFF)
    if [ -f $W/tests-stock/$p.jar ]; then j=$(cmpjar $W/tests-stock/$p.jar $W/tests-callsite/$p.jar); else j="no jar"; fi
    echo "$p | $(grep -h 'exit=' $W/tests-stock/$p.txt | tr '\n' ' ')| callsite: output $o, classes $j | skip: output $k"
  done
  echo; echo "# skip's differing output"; for p in $(cat $LIST); do cmp -s $W/tests-stock/$p.txt $W/tests-skip/$p.txt || diff $W/tests-stock/$p.txt $W/tests-skip/$p.txt | head -8; done
} > $D/compiler-tests.txt

# ----------------- 4. the sentence over the interpreter's library: the zero probe's stack
N=explorations/perf-probes/nat; Z=$N/zero; P=explorations/perf-probes/prelude; L=$W/lib-stack; mkdir -p $L
rm -rf $L/shadow-src $L/jshadow-src $L/oc-src; R=com/sun/fortress
for rel in scala_src/typechecker/Formula.scala scala_src/types/TypeAnalyzer.scala scala_src/types/TypeSchemaAnalyzer.scala \
           scala_src/useful/STypesUtil.scala scala_src/typechecker/ExportChecker.scala scala_src/typechecker/TypeWellFormedChecker.scala \
           scala_src/typechecker/AbstractMethodChecker.scala scala_src/typechecker/TypeHierarchyChecker.scala; do
  mkdir -p "$(dirname $L/shadow-src/$R/$rel)"; cp ProjectFortress/src/$R/$rel $L/shadow-src/$R/$rel; done
patch -p7 -d $L/shadow-src/$R --forward < $N/shadow.patch > $L/nat-patch.out
# two hunks are rejected: the patch's memo on parents and excludesClause, which the tree has had
# in its own form since d28cf74d0; anything else rejected stops the run
[ "$(find $L/shadow-src -name '*.rej' | wc -l)" = 1 ] && \
[ "$(grep -o '^-  def [a-zA-Z]*' $L/shadow-src/$R/scala_src/types/TypeAnalyzer.scala.rej | tr '\n' ' ')" = "-  def parents -  def excludesClause " ] \
  || { cat $L/nat-patch.out; exit 1; }
find $L/shadow-src -name '*.rej' -delete; find $L/shadow-src -name '*.orig' -delete
mkdir -p $L/jshadow-src/$R/compiler/codegen $L/oc-src/$R/scala_src/typechecker
cp ProjectFortress/src/$R/compiler/codegen/FnNameInfo.java $L/jshadow-src/$R/compiler/codegen/
patch -p8 -d $L/jshadow-src/$R --forward < $N/java/java-shadow.patch > /dev/null || exit 1
cp ProjectFortress/src/$R/compiler/Types.java $L/jshadow-src/$R/compiler/
patch -p8 -d $L/jshadow-src/$R --forward < $Z/java-shadow-add.patch > /dev/null || exit 1
mkdir -p $L/oc-src/$R/compiler          # the sentence check on the tree's checker (rung P's switch is not in this stack)
cp ProjectFortress/src/$R/scala_src/typechecker/OverloadingChecker.scala $L/oc-src/$R/scala_src/typechecker/
cp ProjectFortress/src/$R/compiler/OverloadSet.java $L/oc-src/$R/compiler/
patch -p6 -d $L/oc-src/$R --forward < $D/scope-shadow.patch > /dev/null || exit 1
[ -z "$(git status --porcelain ProjectFortress/src)" ] || { echo "ABORT: tracked sources touched" >&2; exit 1; }
rm -rf $L/shadow-classes $L/jshadow-classes $L/oc-classes $L/pshadow-classes; mkdir -p $L/shadow-classes $L/jshadow-classes $L/oc-classes $L/pshadow-classes
java -Xmx2g -cp "$CP" scala.tools.nsc.Main -d $L/shadow-classes -classpath "$CP" -encoding UTF-8 $(find $L/shadow-src -name '*.scala' | sort) > /dev/null 2>&1
javac -nowarn -encoding UTF-8 -cp "$CP" -d $L/jshadow-classes $(find $L/jshadow-src -name '*.java' | sort) 2>&1 | grep -v '^Note'
java -Xmx2g -cp "$CP" scala.tools.nsc.Main -d $L/oc-classes -classpath "$L/shadow-classes:$CP" -encoding UTF-8 $L/oc-src/$R/scala_src/typechecker/OverloadingChecker.scala > /dev/null 2>&1
javac -nowarn -cp "$CP" -d $L $P/WorldFlip.java; javac -nowarn -cp "$CP" -d $L/pshadow-classes $P/shadow-src/$R/compiler/StaticChecker.java
# make-lib.py's copies, less the five api defects the tree has repaired its own way since (a7ced6764),
# plus the zero stack's QQ comprises, without which an early error stops the api's overloading check
python3 - $Z/make-lib.py $W/make-lib-now.py <<'PY'
import sys
s = open(sys.argv[1], encoding='utf-8').read()
old = '''        edit(fsi, L_FSI)
        edit(f"{S}/{v}/List.fsi", L_LIST)
        k = rangeinternals(f"{S}/{v}/RangeInternals.fsi")
        print(f"{v}: {k} AnyIntegral bounds replaced in RangeInternals.fsi")'''
assert s.count(old) == 1
open(sys.argv[2], 'w', encoding='utf-8').write(s.replace(old, "        pass"))
PY
rm -rf $L/lib; python3 $W/make-lib-now.py $L/lib > /dev/null
sed -i 's/comprises { AnyIntegral, \.\.\. }/comprises { AnyIntegral }/' $L/lib/ZALL3/FortressLibrary.fsi
for mode in off own lifted; do
  [ -n "${SKIP_TESTS:-}" ] && break
  c=$L/c-$mode; newcache $c
  { echo "########## WorldFlip ZALL3/FortressLibrary.fss -Dprobe.zero.dropP=true -Dprobe.zero.eligibleNarrow=true -Dfortress.analyzer.overload.cache=false -Dprobe.spSentence=$mode"
    S0=$(date +%s)
    java -Xmx4g -Xss64m -XX:-OmitStackTraceInFastThrow -Dprobe.zero.dropP=true -Dprobe.zero.eligibleNarrow=true \
      -Dfortress.analyzer.overload.cache=false -Dprobe.spSentence=$mode -Dfortress.caches=$c \
      -cp "$L/oc-classes:$L/jshadow-classes:$L/shadow-classes:$L/pshadow-classes:$CP:$L" WorldFlip $L/lib/ZALL3/FortressLibrary.fss
    echo "exit=$?"; echo "ELAPSED $(( $(date +%s) - S0 )) s"; } > $L/wf-$mode.out 2>&1
done
python3 $D/sentence-count.py $L Library/FortressLibrary.fsi > $D/sentence-library.txt

# ------------- 5. the sentence over the compiler prelude, compiler_tests/, and by text elsewhere
{ for mode in own lifted; do
    prelude $W/caches-prel-$mode -Dprobe.spSentence=$mode -cp $W/classes:$CP > $W/prelude-$mode.out 2>&1
    echo "compiler prelude, $mode: $(grep -c '^@@SPSENTENCE' $W/prelude-$mode.out) pairs refused"; done
  # the programs the checker is run on: every file under FULL_SWEEP=1 (about 3 a minute under load),
  # else section 3's list, the text scan's hits under either reading, and every program declaring
  # at top level a name the compiler prelude declares (an overload across the implicit import)
  CAND=$W/candidates.txt
  if [ -n "${FULL_SWEEP:-}" ]; then ls ProjectFortress/compiler_tests/*.fss | xargs -n1 basename | sed 's/\.fss$//' > $CAND
  else { cat $LIST; for m in own lifted; do python3 $D/sentence-scan.py $m ProjectFortress/compiler_tests/*.fss | cut -d: -f1 | xargs -n1 basename | sed 's/\.fss$//'; done
         python3 - <<'PY'
import re, glob
pre = set()
for f in ['ProjectFortress/LibraryBuiltin/AnyType.fsi', 'ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi'] + glob.glob('Library/Compiler*.fsi'):
    for l in open(f, encoding='utf-8', errors='replace'):
        m = re.match(r'(?:opr\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*(\[\\.*?\\\])?\s*\(', l)
        if m: pre.add(m.group(1))
for f in sorted(glob.glob('ProjectFortress/compiler_tests/*.fss')):
    for l in open(f, encoding='utf-8', errors='replace'):
        m = re.match(r'(?:opr\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*(\[\\.*?\\\])?\s*\(.*\)\s*(:|=)', l)
        if m and m.group(1) in pre and m.group(1) not in ('run', 'main'): print(f.split('/')[-1][:-4]); break
PY
       } | sort -u > $CAND; fi
  for mode in own lifted; do
    O=$W/sweep-$mode
    if [ -z "${SKIP_TESTS:-}" ]; then C=$W/caches-sw-$mode; newcache $C; cp -a $W/caches/. $C/; rm -rf $O; mkdir -p $O
      for p in $(cat $CAND); do
        (cd ProjectFortress/compiler_tests && java -Xmx4g -Xss64m -Dprobe.spSentence=$mode -Dfortress.caches=$C \
           -cp $W/classes:$CP com.sun.fortress.Shell link $p.fss > $O/$p.out 2>&1; echo "exit=$?" >> $O/$p.out)
        rm -f $C/bytecode_cache/$p.jar; done; fi
    echo; echo "## compiler_tests: $(ls $O | wc -l) programs linked with -Dprobe.spSentence=$mode; the refused pairs"
    echo "# the programs: $(tr '\n' ' ' < $CAND)"
    grep -h '^@@SPSENTENCE' $O/*.out | sed -e "s#$PWD/##g" | awk -F'\t' '{print $3 "\t" $4 "\t" $2}' | sort -u
    echo "## the same programs by the text scan"
    python3 $D/sentence-scan.py $mode ProjectFortress/compiler_tests/*.fss ProjectFortress/compiler_tests/*.fsi | sed -e "s#^ProjectFortress/##"
  done
  for mode in own lifted; do
    echo; echo "## by the text scan (calibrated above), $mode: tests/, library_tests/, Library/, LibraryBuiltin/"
    python3 $D/sentence-scan.py $mode ProjectFortress/tests/*.fss ProjectFortress/tests/*.fsi ProjectFortress/library_tests/*.fss \
      ProjectFortress/library_tests/*.fsi Library/*.fss Library/*.fsi ProjectFortress/LibraryBuiltin/*.fss ProjectFortress/LibraryBuiltin/*.fsi \
      | sed -e "s#^ProjectFortress/##" | python3 -c '
import sys, collections      # FortressLibrary and RangeInternals by name (their pairs: sentence-library.txt)
big = collections.Counter()
for l in sys.stdin:
    f, rest = l.split(":")[0], l.rstrip("\n").split("\t")[1]
    if f.split("/")[-1].split(".")[0] in ("FortressLibrary", "RangeInternals"): big[(f, rest)] += 1
    else: print(l, end="")
for (f, n), c in sorted(big.items()): print(f"{f}\t{n}\t{c} pairs")'
  done; } > $D/sentence-corpora.txt

# ------------------------------------------------------- 6. the interpreter on the same probes
{ export FORTRESS_CACHES=$W/walk-caches; mkdir -p $FORTRESS_CACHES
  for f in $M/MieDispatchSub $D/ScopeArms $D/ScopeArmsX $D/ScopeAlpha2 $D/ScopeZZ32Sub $D/ScopePad; do
    echo "=== fortress walk $(basename $f).fss"
    (cd $(dirname $f) && $FORTRESS_HOME/bin/fortress walk $(basename $f).fss 2>&1 | sed -e "s#$FORTRESS_HOME/$(dirname $f)/##g" | head -12; exit ${PIPESTATUS[0]})
    echo "walk exit=$?"
  done; } > $D/walk.txt 2>&1

echo "scope-run done; captures in $D, raw output in $W"
