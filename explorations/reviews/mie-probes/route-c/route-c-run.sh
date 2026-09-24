#!/bin/bash
# route-c-run.sh <work-dir>: every command behind ../route-c-experiment.md, in order.
# <work-dir> is scratch OUTSIDE the repository: the shadows' copies and classes, the private
# caches, the library copies, the zero probe's stack, the raw outputs.  default_repository/
# is never written (every run has its own -Dfortress.caches / FORTRESS_CACHES) and no
# tracked file is modified.  SECTIONS="0 1 2 3 4 5 6 7 8" (the default) selects what runs;
# section 0 (the shadows) is needed by every other, section 4 by sections 7 and 8.  Wall clock on
# this box: about 2 hours, most of it sections 4 and 5; each writes its captures when it ends.
#
# The shadows are copies of five tracked sources patched as forest-run.sh patches its three:
#   c-full.patch  the forest rule in TypeAnalyzer.checkP (forest.patch's hunk, without rung P's
#                 switch), the covariant reading of a generic that comprises exactly its
#                 parameter, the chain of a self-typed trait through a type (TypeAnalyzer,
#                 TraitTable), the return type rule over the chain (OverloadingOracle,
#                 OverloadingChecker), and scope-shadow.patch's call-site fix (OverloadSet).
#                 Switches: -Dprobe.forest=off|fbound|comprises|cov, -Dprobe.rtr=off|forest|lite,
#                 -Dprobe.scope=off|callsite|skip.
#   c-lite.patch  the same without the covariant reading and without coverage: a
#                 specialisation over a self-typed trait only at a leaf of its chain
#                 (-Dprobe.rtr=lite).
# Library copies are the tree's FortressLibrary.fs{i,s} and FortressBuiltin.fs{i,s} with
# lib-markers.diff (the DistributesOver markers dropped), then lib-seven.diff (the seven
# completing declarations), then lib-comprises.diff (comprises T on the self-typed traits),
# each on the one before; a FortressBuiltin.fsi beside the target is the one the checker reads.
set -u
cd "$(dirname "$0")/../../../.."                     # $FORTRESS_HOME
source explorations/experiment/env.sh; unset JAVA_TOOL_OPTIONS
M=explorations/reviews/mie-probes; F=$M/forest; RC=$M/route-c
W=${1:?usage: route-c-run.sh <work-dir>}; mkdir -p "$W"; W=$(cd "$W" && pwd)
SECTIONS=${SECTIONS:-"0 1 2 3 4 5 6 7 8"}
on () { case " $SECTIONS " in *" $1 "*) return 0;; esac; return 1; }
export FORTRESS_CACHES=$W/caches
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
RCP=$(./bin/run_classpath 2>/dev/null | tail -1)
SHADOWED="scala_src/types/TypeAnalyzer.scala scala_src/typechecker/TraitTable.scala
          scala_src/overloading/OverloadingOracle.scala scala_src/typechecker/OverloadingChecker.scala
          compiler/OverloadSet.java"
newcache () { local c=$1; rm -rf "$c"; mkdir -p "$c"; printf '\0\0\0\0' > "$c/global.map"; }
stamp () { echo "($(date -u +%F), JDK $(java -version 2>&1 | head -1 | cut -d'"' -f2), main $(git rev-parse --short HEAD))"; }
FULL=$W/full/classes; LITE=$W/lite/classes; NONE=$W/none; mkdir -p $NONE   # NONE: stock, no shadow

# ------------------------------------------------------------------ 0. the two shadows
if on 0; then
  for v in full lite; do
    SS=$W/$v/src/com/sun/fortress; rm -rf $W/$v; mkdir -p $W/$v/classes
    for rel in $SHADOWED; do mkdir -p "$(dirname $SS/$rel)"; cp ProjectFortress/src/com/sun/fortress/$rel $SS/$rel; done
    patch -p6 -d $SS --forward < $RC/c-$v.patch || exit 1
    [ -z "$(git status --porcelain ProjectFortress/src)" ] || { echo "ABORT: tracked sources touched" >&2; exit 1; }
    java -Xmx2g -cp "$CP" scala.tools.nsc.Main -nowarn -d $W/$v/classes -classpath "$CP" -encoding UTF-8 \
         $(find $SS -name '*.scala') || exit 1
    javac -nowarn -encoding UTF-8 -cp "$W/$v/classes:$CP" -d $W/$v/classes $SS/compiler/OverloadSet.java 2>&1 | grep -v '^Note'
  done
fi

# ------------------------- 1. the compiler prelude in a private cache, stock checker
if on 1 && [ ! -f "$FORTRESS_CACHES/bytecode_cache/CompilerSystem.jar" ]; then
  newcache "$FORTRESS_CACHES"
  SH="java -Xmx4g -Xss64m -Dfortress.caches=$FORTRESS_CACHES -cp $CP com.sun.fortress.Shell"
  (cd ProjectFortress && $SH compile LibraryBuiltin/AnyType.fss && $SH compile LibraryBuiltin/CompilerBuiltin.fss)
  for f in CompilerLibrary CompilerAlgebra CompilerSystem; do $SH compile Library/$f.fss; done
fi > $W/prelude.txt 2>&1

# ------------------------------- 2. the probes: walk, then linked and run under four modes
MODE_stock=""; MODE_forest="-Dprobe.forest=fbound"
MODE_cfull="-Dprobe.forest=cov -Dprobe.rtr=forest -Dprobe.scope=callsite"
MODE_clite="-Dprobe.forest=fbound -Dprobe.rtr=lite -Dprobe.scope=callsite"
probe () { local d=$1 p=$2 mode=$3; local fl; eval fl=\$MODE_$mode
  local sc=$FULL; [ $mode = clite ] && sc=$LITE; [ $mode = stock ] && sc=$NONE
  echo "=== $mode: fortress link $p.fss   ${fl:-(no switch)}"
  rm -f $FORTRESS_CACHES/bytecode_cache/$p.jar $FORTRESS_CACHES/analyzed_cache/$p-*; touch $d/$p.fss
  (cd $d && java -Xmx4g -Xss64m $fl -Dfortress.caches=$FORTRESS_CACHES -cp $sc:$CP \
     com.sun.fortress.Shell link $p.fss 2>&1 | sed -e "s#$PWD/##g; s#$W/##g"; exit ${PIPESTATUS[0]}); echo "link exit=$?"
  if [ -f $FORTRESS_CACHES/bytecode_cache/$p.jar ]; then
    echo "=== $mode: fortress run $p"
    java -Xmx1g -cp "$RCP" com.sun.fortress.runtimeSystem.MainWrapper $p 2>&1 | grep -v '^\s*at \|^\s*\.\.\. [0-9]* more' \
      | sed -e 's/ @[0-9a-f]\{4,\})/)/' | cut -c1-240 | head -30
    echo "run exit=${PIPESTATUS[0]}"
  fi; }
walkit () { local d=$1 p=$2
  echo "=== walk: FORTRESS_THREADS=1 FORTRESS_CACHES=<private> bin/fortress walk $p.fss   $(stamp)"
  (cd $d && FORTRESS_CACHES=$W/walk-caches timeout 600 $FORTRESS_HOME/bin/fortress walk $p.fss 2>&1 \
     | grep -v '^\s*at \|^java.lang.Throwable' | sed -e "s#$PWD/##g" | cut -c1-240 | head -30; echo "walk exit=${PIPESTATUS[0]}"); }
if on 2; then
  R=$W/rung; mkdir -p $R $W/walk-caches $RC/probes
  for p in ProbeMIEPickCtl ProbeTypecaseMIE ProbeMIEOverload; do
    git show origin/wip/rung-exclusion-relax:explorations/compile-ladder/rung-exclusion-relax/probes/$p.fss > $R/$p.fss
  done
  set -- \
    $F:ForestInfer $F:ForestTower $F:ForestTowerC $F:ForestTowerCNoSpec $F:ForestGeneric $F:ForestGenericLeaf \
    $RC:ForestTowerCLeaf $RC:ForestLeafInv $RC:ForestDispatch \
    $M:MieDecl $M:MieDispatch $M:MieDispatchAny $M:MieDispatchSub $M:MieDispatchZZ32 $M:MieHeadOrId \
    $M:MieInfer $M:MieInferRet $M:MieInferSwap $M:MieTower $M:ProbeMIEPick $M:RouteCProbe \
    $R:ProbeMIEPickCtl $R:ProbeTypecaseMIE $R:ProbeMIEOverload
  for dp in "$@"; do d=${dp%%:*}; p=${dp##*:}
    { walkit $d $p; for mode in stock forest cfull clite; do probe $d $p $mode; done; } > $RC/probes/$p.txt 2>&1
  done
  # one line per probe and mode: how the link and the run ended, and the run's first failure
  python3 - $RC/probes <<'PY' > $RC/probes-summary.txt
import sys, os, re
d = sys.argv[1]
print("# probe\twalk\tstock\tforest (fbound)\tC-full\tC-lite   (link/run exits; E = an exception's class)")
for f in sorted(os.listdir(d)):
    s = open(os.path.join(d, f), encoding="utf-8", errors="replace").read()
    parts = re.split(r"^=== (walk|stock|forest|cfull|clite)", s, flags=re.M)
    res = {}
    for i in range(1, len(parts), 2):
        k, body = parts[i], parts[i + 1]
        ex = [m for m in re.findall(r"(?:Caused by: |^)(java\.lang\.\w+|com\.sun\.fortress\.exceptions\.\w+)", body, re.M)]
        ex = ex[0].split(".")[-1] if ex else ""
        code = ",".join(re.findall(r"(?:link|run|walk) exit=(\d+)", body))
        res[k] = res.get(k, "") + code + (" E=" + ex if ex else "")
    print(f[:-4] + "\t" + "\t".join(res.get(k, "-") for k in ("walk", "stock", "forest", "cfull", "clite")))
PY
fi

# ---------------------------------------------- the library copies (sections 3 and 4)
# libcopies <base dir with FortressLibrary.fs{i,s}> <out dir>: out/tree (the base), out/markers,
# out/seven, out/comprises, each one diff further, each keeping the base's other files
libcopies () { local B=$1 O=$2; rm -rf $O; mkdir -p $O/tree; cp $B/* $O/tree/
  local prev=tree; for v in markers seven comprises; do
    mkdir -p $O/$v; cp $O/$prev/* $O/$v/; patch -s -d $O/$v -p1 < $RC/lib-$v.diff || { echo "lib-$v.diff failed on $B" >&2; exit 1; }
    prev=$v; done; }

# ---------------------- 3. the gate's checker count on the interpreter's library, per mode
# The checker-count stage (coordinator/tools/checker-count/run.sh: its WorldFlip driver and
# instrumented StaticChecker) run on each library copy, a shadow ahead of the build.
ccount () { local O=$1 S=$2 T=$3; shift 3; local D=explorations/coordinator/tools/checker-count
  rm -rf $O; mkdir -p $O/classes $O/caches; cp -r $S/. $O/classes/
  javac -nowarn -cp "$CP" -d $O/classes $D/WorldFlip.java $D/shadow-src/com/sun/fortress/compiler/StaticChecker.java > $O/javac.txt 2>&1 || exit 1
  timeout -k 10 900 java -Xmx4g -Xss64m "$@" -Dfortress.caches=$O/caches -cp "$O/classes:$CP" WorldFlip "$T" > $O/run.txt 2>&1
  python3 $F/errs.py $O/run.txt | sed -e "s#$W/##g" | sort > $O.errs
  echo "$(grep -oE 'has [0-9]+ errors?\.$' $O/run.txt | tail -1 | grep -oE '[0-9]+')"; }
if on 3; then
  mkdir -p $W/gsrc; cp Library/FortressLibrary.fs[is] ProjectFortress/LibraryBuiltin/FortressBuiltin.fs[is] $W/gsrc/; libcopies $W/gsrc $W/glib
  { echo "# the gate's checker-count stage over each library copy (rows) under each mode (columns)  $(stamp)"
    echo "# modes: stock = no switch; forest = -Dprobe.forest=fbound; C-full = $MODE_cfull;"
    echo "#        C-lite = $MODE_clite (c-lite.patch's shadow)"
    printf 'library\tstock\tforest\tC-full\tC-lite\n'
    for lib in tree markers seven comprises; do T=$W/glib/$lib/FortressLibrary.fss
      printf '%s\t%s\t%s\t%s\t%s\n' $lib "$(ccount $W/g-$lib-stock $NONE $T)" "$(ccount $W/g-$lib-forest $FULL $T $MODE_forest)" \
        "$(ccount $W/g-$lib-cfull $FULL $T $MODE_cfull)" "$(ccount $W/g-$lib-clite $LITE $T $MODE_clite)"
    done
    for lib in tree markers seven comprises; do
      echo; echo "# $lib: per api, C-full"; grep '^@@PROBE checkApi .* -> errors=' $W/g-$lib-cfull/run.txt | sed 's/^@@PROBE checkApi //' | sort -u
      for m in cfull clite; do echo "# $lib: errors under $m and not under forest"; comm -13 $W/g-$lib-forest.errs $W/g-$lib-$m.errs
        echo "# $lib: errors under forest and not under $m"; comm -23 $W/g-$lib-forest.errs $W/g-$lib-$m.errs; done
    done
    echo; echo "# tree: the errors under stock and not under forest are forest/checker-count.txt's"
    echo "# markers: the errors left under C-full, where the FortressLibrary api stops before its overloading check"
    cat $W/g-markers-cfull.errs
  } > $RC/checker-count.txt
fi

# ------------- 4. the deep instrument: the zero probe's stack with the route C shadow on top
# explorations/perf-probes/nat/zero, rebuilt on today's tree as scope/scope-run.sh section 4
# rebuilds it (its make-lib.py's ZALL3 copy less the five api edits the tree has repaired its
# own way, QQ's comprises written { AnyIntegral }); it gets the overloading check to run on
# the FortressLibrary api.  Here its checkP is the forest (no -Dprobe.zero.dropP), so the
# markers are dropped from its copies (lib-markers.diff), and c-full.patch's TypeAnalyzer
# hunks go on its nat-patched TypeAnalyzer; each shadow's OverloadingOracle and
# OverloadingChecker, and c-full's TraitTable, go ahead of it.
if on 4; then
  N=explorations/perf-probes/nat; Z=$N/zero; P=explorations/perf-probes/prelude; L=$W/zs; R=com/sun/fortress
  rm -rf $L; mkdir -p $L
  for rel in scala_src/typechecker/Formula.scala scala_src/types/TypeAnalyzer.scala scala_src/types/TypeSchemaAnalyzer.scala \
             scala_src/useful/STypesUtil.scala scala_src/typechecker/ExportChecker.scala scala_src/typechecker/TypeWellFormedChecker.scala \
             scala_src/typechecker/AbstractMethodChecker.scala scala_src/typechecker/TypeHierarchyChecker.scala; do
    mkdir -p "$(dirname $L/shadow-src/$R/$rel)"; cp ProjectFortress/src/$R/$rel $L/shadow-src/$R/$rel; done
  patch -p7 -d $L/shadow-src/$R --forward < $N/shadow.patch > $L/nat-patch.out
  # two hunks are rejected, the memo on parents and excludesClause the tree has had since d28cf74d0
  [ "$(grep -o '^-  def [a-zA-Z]*' $L/shadow-src/$R/scala_src/types/TypeAnalyzer.scala.rej | tr '\n' ' ')" = "-  def parents -  def excludesClause " ] \
    || { cat $L/nat-patch.out; exit 1; }
  find $L/shadow-src -name '*.rej' -delete; find $L/shadow-src -name '*.orig' -delete
  python3 - $RC/c-full.patch $L/ta.patch <<'PY'
import sys
p = open(sys.argv[1]).read().split('--- a/')
open(sys.argv[2], 'w').write(''.join('--- a/' + x for x in p[1:] if x.startswith('ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala')))
PY
  patch -p6 -d $L/shadow-src/$R --forward < $L/ta.patch > $L/ta-patch.out
  # the last hunk (the switches in object TypeAnalyzer) meets the nat shadow's memo fields there;
  # its added lines go in after `def make`, and nothing else may be rejected
  python3 - $L/shadow-src/$R/scala_src/types/TypeAnalyzer.scala <<'PY' || exit 1
import sys, re
p = sys.argv[1]; rej = open(p + '.rej').read()
assert rej.count('@@') == 2 and 'object TypeAnalyzer {' in rej, rej
add = ''.join(l[1:] + '\n' for l in rej.split('\n') if l.startswith('+') and not l.startswith('+++'))
s = open(p).read(); a = "  def make(traits: TraitTable) = new TypeAnalyzer(traits, KindEnv.makeFresh)\n"
assert s.count(a) == 1; open(p, 'w').write(s.replace(a, a + add))
PY
  rm -f $L/shadow-src/$R/scala_src/types/TypeAnalyzer.scala.rej $L/shadow-src/$R/scala_src/types/TypeAnalyzer.scala.orig
  mkdir -p $L/jshadow-src/$R/compiler/codegen
  cp ProjectFortress/src/$R/compiler/codegen/FnNameInfo.java $L/jshadow-src/$R/compiler/codegen/
  patch -p8 -d $L/jshadow-src/$R --forward < $N/java/java-shadow.patch > /dev/null || exit 1
  cp ProjectFortress/src/$R/compiler/Types.java $L/jshadow-src/$R/compiler/
  patch -p8 -d $L/jshadow-src/$R --forward < $Z/java-shadow-add.patch > /dev/null || exit 1
  [ -z "$(git status --porcelain ProjectFortress/src)" ] || { echo "ABORT: tracked sources touched" >&2; exit 1; }
  mkdir -p $L/shadow-classes $L/jshadow-classes $L/oc-full $L/oc-lite $L/pshadow-classes
  java -Xmx2g -cp "$CP" scala.tools.nsc.Main -nowarn -d $L/shadow-classes -classpath "$CP" -encoding UTF-8 \
       $(find $L/shadow-src -name '*.scala' | sort) $W/full/src/$R/scala_src/typechecker/TraitTable.scala || exit 1
  javac -nowarn -encoding UTF-8 -cp "$CP" -d $L/jshadow-classes $(find $L/jshadow-src -name '*.java' | sort) 2>&1 | grep -v '^Note'
  for v in full lite; do
    java -Xmx2g -cp "$CP" scala.tools.nsc.Main -nowarn -d $L/oc-$v -classpath "$L/shadow-classes:$CP" -encoding UTF-8 \
         $W/$v/src/$R/scala_src/typechecker/OverloadingChecker.scala $W/$v/src/$R/scala_src/overloading/OverloadingOracle.scala || exit 1
  done
  javac -nowarn -cp "$CP" -d $L $P/WorldFlip.java; javac -nowarn -cp "$CP" -d $L/pshadow-classes $P/shadow-src/$R/compiler/StaticChecker.java
  python3 - $Z/make-lib.py $L/make-lib-now.py <<'PY'
import sys
s = open(sys.argv[1], encoding='utf-8').read()
old = '''        edit(fsi, L_FSI)
        edit(f"{S}/{v}/List.fsi", L_LIST)
        k = rangeinternals(f"{S}/{v}/RangeInternals.fsi")
        print(f"{v}: {k} AnyIntegral bounds replaced in RangeInternals.fsi")'''
assert s.count(old) == 1
open(sys.argv[2], 'w', encoding='utf-8').write(s.replace(old, "        pass"))
PY
  python3 $L/make-lib-now.py $L/zero-lib > /dev/null
  sed -i 's/comprises { AnyIntegral, \.\.\. }/comprises { AnyIntegral }/' $L/zero-lib/ZALL3/FortressLibrary.fsi
  cp ProjectFortress/LibraryBuiltin/FortressBuiltin.fs[is] $L/zero-lib/ZALL3/   # a copy beside the target is the one used
  libcopies $L/zero-lib/ZALL3 $L/lib
  zrun () { local tag=$1 lib=$2 v=$3; shift 3; local c=$L/c-$tag; newcache $c
    { echo "########## WorldFlip $lib/FortressLibrary.fss, the $v shadow, $*"; local S0=$(date +%s)
      timeout 1500 java -Xmx4g -Xss64m -XX:-OmitStackTraceInFastThrow -Dprobe.zero.eligibleNarrow=true \
        -Dfortress.analyzer.overload.cache=false "$@" -Dfortress.caches=$c \
        -cp "$L/oc-$v:$L/jshadow-classes:$L/shadow-classes:$L/pshadow-classes:$CP:$L" WorldFlip $L/lib/$lib/FortressLibrary.fss
      echo "exit=$?"; echo "ELAPSED $(( $(date +%s) - S0 )) s"; } > $L/wf-$tag.out 2>&1; }
  zrun markers-forest markers full $MODE_forest
  zrun markers-cfull markers full $MODE_cfull
  zrun markers-cfull-id markers full $MODE_cfull -Dprobe.identify=true
  zrun markers-clite markers lite $MODE_clite
  zrun seven-cfull seven full $MODE_cfull
  zrun seven-cfull-id seven full $MODE_cfull -Dprobe.identify=true
  zrun comprises-cfull comprises full $MODE_cfull
  zrun comprises-dropP comprises full -Dprobe.zero.dropP=true
  python3 - $L $W <<'PY' > $RC/deep-count.txt
import sys, re, collections
L, W = sys.argv[1], sys.argv[2]
runs = ["markers-forest", "markers-cfull", "markers-cfull-id", "markers-clite", "seven-cfull", "seven-cfull-id", "comprises-cfull", "comprises-dropP"]
print("# the zero probe's stack (deep instrument: the FortressLibrary api reaches its overloading check), per library copy and mode")
print("# run\twhole-unit errors\tFortressLibrary api errors\tpairs refused by the forest rule\tspecialisations refused\tcrash\telapsed")
rtr = {}
for r in runs:
    s = open(f"{L}/wf-{r}.out", encoding="utf-8", errors="replace").read().replace(f"{L}/lib/", "")
    tot = re.findall(r"has (\d+) errors?\.$", s, re.M); api = re.findall(r"checkApi FortressLibrary -> errors=(\d+)", s)
    lines = [l.split("\t") for l in s.split("\n") if l.startswith("@@RTR\t")]
    lines = [[re.sub(r"^[a-z]+/", "", x) for x in l] for l in lines]
    ref = collections.OrderedDict()
    for l in lines:
        if l[9] == "REFUSED": ref.setdefault((l[2], l[3], l[4]), []).append(f"{l[6]} {l[7]} {l[8]}")
    rtr[r] = (lines, ref)
    el = re.findall(r"ELAPSED (\d+) s", s)
    cr = re.findall(r"^@@PROBE OverloadingChecker CRASHED on (\S+) : (\S+)", s, re.M)
    cr = ", ".join(f"{a} {b.split('.')[-1]}" for a, b in cr) or "none"
    print(f"{r}\t{tot[-1] if tot else '?'}\t{api[-1] if api else '?'}\t{len(ref)}\t{len(set((k[0], k[1]) for k in ref))}\t{cr}\t{el[-1] if el else '?'} s")
for r in runs:
    lines, ref = rtr[r]
    if not lines: continue
    print(f"\n## {r}: every level checked (@@RTR: name, specialisation, generic, solved M, level L, L below the specialisation?, return type at L, verdict)")
    verdicts = collections.Counter((l[7], l[8], l[9]) for l in lines)
    print("# levels by (position, return type, verdict): " + ", ".join(f"{k[0]}/{k[1]}/{k[2]} {v}" for k, v in sorted(verdicts.items())))
    print(f"# refused pairs: {len(ref)}")
    for (n, f, g), ls in ref.items(): print(f"{n}\t{f}\tbeside {g}\t" + "; ".join(ls))
PY
fi

# ------------- 5. the compiler's tests that declare generic overloads: stock, C-full, C-lite
# scope/scope-run.sh section 3's list and method; the compiler prelude is compiled under each
# shadow and mode first and compared class by class with the stock one.
cmpjar () { local a=$(mktemp -d) b=$(mktemp -d)
  (cd $a && unzip -qo "$1" 2>/dev/null); (cd $b && unzip -qo "$2" 2>/dev/null)
  local d=$(diff -rq $a $b | sed -e "s#$a#A#g; s#$b#B#g")
  [ -z "$d" ] && echo "identical ($(find $a -type f | wc -l) files)" || echo "DIFFERENT: $(echo "$d" | wc -l) files"
  rm -rf $a $b; }
if on 5; then
  prelude () { local c=$1 sc=$2; shift 2; newcache $c
    local SH="java -Xmx4g -Xss64m $* -Dfortress.caches=$c -cp $sc:$CP com.sun.fortress.Shell"
    (cd ProjectFortress && $SH compile LibraryBuiltin/AnyType.fss && $SH compile LibraryBuiltin/CompilerBuiltin.fss)
    for f in CompilerLibrary CompilerAlgebra CompilerSystem; do $SH compile Library/$f.fss; done; }
  prelude $W/pc-stock $NONE > $W/pc-stock.txt 2>&1
  prelude $W/pc-cfull $FULL $MODE_cfull > $W/pc-cfull.txt 2>&1
  prelude $W/pc-clite $LITE $MODE_clite > $W/pc-clite.txt 2>&1
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
  tests () { local mode=$1 sc=$2 fl=$3 C=$W/caches-t-$1 O=$W/tests-$1
    newcache $C; cp -a $W/pc-$4/. $C/; rm -rf $O; mkdir -p $O
    local R=$(FORTRESS_CACHES=$C ./bin/run_classpath 2>/dev/null | tail -1)
    for p in $(cat $LIST); do
      { echo "=== link $p"
        (cd ProjectFortress/compiler_tests && java -Xmx4g -Xss64m $fl -Dfortress.caches=$C -cp $sc:$CP \
           com.sun.fortress.Shell link $p.fss 2>&1 | sed -e "s#$PWD/##g" | grep -v '^@@RTR' | head -40; exit ${PIPESTATUS[0]}); echo "link exit=$?"
        if [ -f $C/bytecode_cache/$p.jar ]; then cp $C/bytecode_cache/$p.jar $O/$p.jar; echo "=== run $p"
          (cd ProjectFortress/compiler_tests && java -Xmx1g -cp "$R" com.sun.fortress.runtimeSystem.MainWrapper $p 2>&1 \
             | grep -v '^\s*at \|^\s*\.\.\. [0-9]* more' | cut -c1-300 | head -30; echo "run exit=${PIPESTATUS[0]}"); fi; } > $O/$p.txt 2>&1
    done; }
  tests stock $NONE "" stock
  tests cfull $FULL "$MODE_cfull" cfull
  tests clite $LITE "$MODE_clite" clite
  { echo "# the compiler prelude compiled under each mode, class by class against stock  $(stamp)"
    for j in $(ls $W/pc-stock/bytecode_cache); do
      echo "$j: C-full $(cmpjar $W/pc-stock/bytecode_cache/$j $W/pc-cfull/bytecode_cache/$j); C-lite $(cmpjar $W/pc-stock/bytecode_cache/$j $W/pc-clite/bytecode_cache/$j)"; done
    echo; echo "# compiler_tests declaring a generic overload, or matching 'overload' or Generic/Overload in the name: $(wc -l < $LIST)"
    echo "# test | stock link/run exits | C-full: output, classes | C-lite: output, classes"
    for p in $(cat $LIST); do
      row="$p | $(grep -h 'exit=' $W/tests-stock/$p.txt | tr '\n' ' ')"
      for m in cfull clite; do
        o=$(cmp -s $W/tests-stock/$p.txt $W/tests-$m/$p.txt && echo same || echo DIFF)
        if [ -f $W/tests-stock/$p.jar ] && [ -f $W/tests-$m/$p.jar ]; then j=$(cmpjar $W/tests-stock/$p.jar $W/tests-$m/$p.jar); else j="no jar"; fi
        row="$row| $m: output $o, classes $j "
      done; echo "$row"
    done
    for m in cfull clite; do echo; echo "# $m's differing output"
      for p in $(cat $LIST); do cmp -s $W/tests-stock/$p.txt $W/tests-$m/$p.txt || { echo "## $p"; diff $W/tests-stock/$p.txt $W/tests-$m/$p.txt | head -12; }; done; done
  } > $RC/compiler-tests.txt
fi

# ------------------------------------------------------------ 6. the size of the shadows
if on 6; then
  python3 - $RC/c-full.patch $RC/c-lite.patch $M/scope/scope-shadow.patch <<'PY' > $RC/size.txt
import sys, re
def count(path):
    files, cur = {}, None
    for l in open(path, encoding="utf-8"):
        if l.startswith("+++ "): cur = l.split("/")[-1].strip(); files[cur] = [0, 0, 0, 0]; continue
        if l.startswith("--- ") or cur is None: continue
        if l.startswith("+") or l.startswith("-"):
            body = l[1:].strip(); i = 0 if l[0] == "+" else 2
            probe = "probe." in body or "PROBE" in body
            comment = body.startswith(("//", "/*", "*")) or body == ""
            files[cur][i] += 1
            if not comment and not probe: files[cur][i + 1] += 1
    return files
print("# lines added and removed per file: all, then code lines (no comment, blank or switch line)")
for p in sys.argv[1:3]:
    fs = count(p); tot = [sum(v[i] for v in fs.values()) for i in range(4)]
    print(f"\n## {p.split('/')[-1]}: {len(fs)} files, +{tot[0]} -{tot[2]} lines, code +{tot[1]} -{tot[3]}")
    for f, v in fs.items(): print(f"{f}\t+{v[0]} -{v[2]}\tcode +{v[1]} -{v[3]}")
PY
fi
# ------------- 7. three checks behind the note's claims (needs sections 0 and 4's work dir)
# (a) route A's flat library (keep/make-flat-lib.py's FLAT) under the gate's count, stock and
#     both shadows; (b) the compiler prelude compiled twice stock, with the C-full shadow and
#     no switch, and with -Dprobe.forest=fbound alone, compared class by class, and the
#     differing classes sorted into those that differ only in instruction order; (c) the stack
#     of the overflow on the comprises copy, a StaticChecker copy that prints it whole.
if on 7; then
  python3 $M/keep/make-flat-lib.py $W/flat > /dev/null
  { echo "# route A's flat library (keep/make-flat-lib.py FLAT) under the gate's count  $(stamp)"
    printf 'stock\t%s\n' "$(ccount $W/g-flat-stock $NONE $W/flat/FLAT/FortressLibrary.fss)"
    printf 'C-full\t%s\n' "$(ccount $W/g-flat-cfull $FULL $W/flat/FLAT/FortressLibrary.fss $MODE_cfull)"
    printf 'C-lite\t%s\n' "$(ccount $W/g-flat-clite $LITE $W/flat/FLAT/FortressLibrary.fss $MODE_clite)"
    for m in cfull clite; do cmp -s $W/g-flat-stock.errs $W/g-flat-$m.errs && echo "$m: the same errors as stock" || diff $W/g-flat-stock.errs $W/g-flat-$m.errs; done
  } > $RC/flat-count.txt
  prelude () { local c=$1 sc=$2; shift 2; newcache $c
    local SH="java -Xmx4g -Xss64m $* -Dfortress.caches=$c -cp $sc:$CP com.sun.fortress.Shell"
    (cd ProjectFortress && $SH compile LibraryBuiltin/AnyType.fss && $SH compile LibraryBuiltin/CompilerBuiltin.fss)
    for f in CompilerLibrary CompilerAlgebra CompilerSystem; do $SH compile Library/$f.fss; done; }
  prelude $W/p7-stock $NONE > $W/p7-stock.txt 2>&1
  prelude $W/p7-stock2 $NONE > $W/p7-stock2.txt 2>&1
  prelude $W/p7-off $FULL > $W/p7-off.txt 2>&1
  prelude $W/p7-fbound $FULL $MODE_forest > $W/p7-fbound.txt 2>&1
  prelude $W/p7-cfull $FULL $MODE_cfull > $W/p7-cfull.txt 2>&1
  norm () { JAVA_TOOL_OPTIONS= javap -c -p "$1" 2>/dev/null | sed -E 's/#[0-9]+/#/g; s/^ *[0-9]+: //; s/^((goto|if[a-z_]*|jsr)[ ]+)[0-9]+/\1N/' | sort | md5sum; }
  { echo "# the compiler prelude, class by class against a stock compile  $(stamp)"
    for t in stock2 off fbound cfull; do
      tot=0; ord=0
      for j in $(ls $W/p7-stock/bytecode_cache); do
        a=$W/x-a; b=$W/x-b; rm -rf $a $b; mkdir -p $a $b
        (cd $a && unzip -qo $W/p7-stock/bytecode_cache/$j 2>/dev/null); (cd $b && unzip -qo $W/p7-$t/bytecode_cache/$j 2>/dev/null)
        d=$(diff -rq $a $b | sed -n 's/^Files \(.*\) and .* differ$/\1/p')
        [ -n "$d" ] && echo "$t $j: $(echo "$d" | wc -l) classes differ"
        while IFS= read -r f; do [ -z "$f" ] && continue; tot=$((tot+1)); g=$b${f#$a}
          [ "$(norm "$f")" = "$(norm "$g")" ] && ord=$((ord+1)) || echo "  $t: more than order: ${f#$a/}"; done <<< "$d"
      done
      echo "$t: $tot classes differ from stock, $ord of them only in the order of their instructions"
    done
  } > $RC/prelude-compare.txt
  L=$W/zs; mkdir -p $L/pdebug; cp explorations/perf-probes/prelude/shadow-src/com/sun/fortress/compiler/StaticChecker.java $L/pdebug/
  sed -i 's/Math.min(6, probeSt.length)/probeSt.length/' $L/pdebug/StaticChecker.java
  rm -rf $L/pdebug-classes; mkdir -p $L/pdebug-classes; javac -nowarn -cp "$CP" -d $L/pdebug-classes $L/pdebug/StaticChecker.java
  c=$L/c-overflow; newcache $c
  timeout 1500 java -Xmx4g -Xss64m -XX:MaxJavaStackTraceDepth=200000 -XX:-OmitStackTraceInFastThrow \
    -Dprobe.zero.eligibleNarrow=true -Dfortress.analyzer.overload.cache=false $MODE_forest -Dfortress.caches=$c \
    -cp "$L/oc-full:$L/jshadow-classes:$L/shadow-classes:$L/pdebug-classes:$CP:$L" WorldFlip $L/lib/comprises/FortressLibrary.fss > $L/wf-overflow.out 2>&1
  { echo "# the comprises copy under $MODE_forest: the crash, then the frames of its stack by count  $(stamp)"
    grep -m1 'CRASHED' $L/wf-overflow.out
    grep '^@@PROBE    at ' $L/wf-overflow.out | sed 's/^@@PROBE    at //' | sort | uniq -c | sort -rn | head -20
    echo "# the frames outside Formula's recursion and Scala's collections, top of the stack first"
    grep '^@@PROBE    at ' $L/wf-overflow.out | sed 's/^@@PROBE    at //' | grep -v 'scala\.collection\|Formula\$' | head -40
  } > $RC/overflow-stack.txt
fi
# ------------- 8. the deep instrument's error lists compared (needs section 4's work dir)
if on 8; then
  L=$W/zs
  for r in markers-forest markers-cfull markers-cfull-id markers-clite seven-cfull seven-cfull-id; do
    python3 $F/errs.py $L/wf-$r.out | sed -e "s#$L/lib/[a-z]*/##g" | sort > $L/$r.errs; done
  { echo "# the deep instrument's errors, by first message line, against the forest alone on the markers copy  $(stamp)"
    for r in markers-cfull markers-cfull-id markers-clite seven-cfull seven-cfull-id; do
      echo; echo "## $r: messages added (+) and gone (-)"
      diff <(cut -f2 $L/markers-forest.errs | sort) <(cut -f2 $L/$r.errs | sort) | grep '^[<>]' | sed 's/^</-/; s/^>/+/' | sort | uniq -c
    done
    echo; echo "## markers-cfull: the instantiation the stock rule solves for (M), per specialisation and generic"
    grep '^@@RTR' $L/wf-markers-cfull.out | sed -e "s#$L/lib/[a-z]*/##g" | awk -F'\t' '{print $3 "\t" $4 "\tbeside " $5 "\tM = " $6}' | sort -u
    echo; echo "## seven-cfull-id: the stock rule's errors that name the seven's new declarations"
    grep -B3 -A2 'should be a subtype' $L/wf-seven-cfull-id.out | sed -e "s#$L/lib/seven/##g" | grep -A5 'FortressLibrary.fsi:42[12]:' | head -20
    echo; echo "## the gate's instrument (section 3): errors under the forest on the seven copy and not on the comprises copy, and back"
    comm -3 $W/g-seven-forest.errs $W/g-comprises-forest.errs
  } > $RC/deep-errors.txt
fi
echo "route-c-run done; captures in $RC, raw output in $W"
