#!/bin/bash
# run.sh <scratch> <step>... : decision D's diff re-based on the tree of 2026-09-29 and measured again.
# The steps are those of ../run.sh (2026-09-27), with three differences:
#   - the tree is $FORTRESS_HOME (a worktree with its own copy of ProjectFortress/build), not a fixed path;
#   - the checker shadows and the one-JVM driver come from the gate's distance stage,
#     explorations/coordinator/tools/distance/ (the same scripts as the probe directories ../run.sh used,
#     byte-identical on 2026-09-29, made from the tracked sources at every build);
#   - the patch is ./decision-d.patch, the old one carried past climb batch 7's tabulate rename.
# Nothing tracked is modified; the driver's classes, the C4 copies, the library copy and every cache live
# under <scratch>. Never removes /tmp/fortress*rats (other runs use them); the JVMs' temporary directory is
# <scratch>'s own.
#
#   build            the shadows and DistanceMulti, into <scratch>/work
#   copies           <scratch>/base (run-c4/src as it is), <scratch>/d (base + decision-d.patch), the two
#                    split variants (../make-variants.py split) and d-split-e3 (d-split beside a library copy
#                    without the dead sizes, ../make-variants.py e3)
#   check <copy>...  the compiled checker over the copy's four components against the one library, setting any
#   own <copy>       the copy's own errors, one per line
#   capture <copy>   into ./measure/: <copy>.own.txt, <copy>.through.txt, <copy>.stages.txt
#   walk [threads]   MicroGptFlatCheck under walk from a copy of d laid out as run-c4/src is, private cache
set -u
H=${FORTRESS_HOME:?source an env with FORTRESS_HOME}; cd "$H"
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH=/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH
export FORTRESS_THREADS=${FORTRESS_THREADS:-1}; unset JAVA_TOOL_OPTIONS
O=$H/explorations/reviews/decision-d-diff; R=$O/rebase-2026-09-29; T=$H/explorations/coordinator/tools/distance
W=${1:?scratch}; shift; mkdir -p "$W"; W=$(cd "$W" && pwd); mkdir -p "$W/tmp"
JF="-Xmx4g -Xss64m -Djava.io.tmpdir=$W/tmp"
C4="FlatArrays FlatData MicroGptFlat MicroGptFlatCheck"
machine () { echo "nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/.*: //') MHz; load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS; tree $(git rev-parse --short HEAD)"; }
while [ $# -gt 0 ]; do step=$1; shift; case $step in
build)
  mkdir -p "$W/work/shadow-src" "$W/work/shadow-classes" "$W/work/classes"
  CP=$(./bin/fortress_classpath 2>/dev/null | tail -1 | sed 's#:[^:]*/default_repository/caches/bytecode_cache##')
  python3 "$T/shadow-patch.py" ProjectFortress/src/com/sun/fortress "$W/work/shadow-src" > "$W/work/shadows.txt" 2>&1 &&
  python3 "$T/add-patch.py" "$W/work/shadow-src" >> "$W/work/shadows.txt" 2>&1 || { echo "shadow edit did not match"; tail -3 "$W/work/shadows.txt"; exit 1; }
  S=$W/work/shadow-src/com/sun/fortress
  javac -nowarn -encoding UTF-8 -cp "$CP" -d "$W/work/shadow-classes" $S/compiler/StaticChecker.java $S/compiler/phases/TypeCheckPhase.java \
     $S/compiler/phases/DesugarPhase.java $S/compiler/phases/CodeGenerationPhase.java $S/compiler/codegen/CodeGen.java \
     $S/compiler/Desugarer.java $S/nodes_util/NodeComparator.java || exit 1
  javac -nowarn -cp "$CP" -d "$W/work/classes" "$T/DistanceMulti.java" || exit 1
  echo "build: shadows and driver in $W/work" ;;
copies)
  rm -rf "$W/base" "$W/d" "$W/base-split" "$W/d-split" "$W/d-split-e3"
  mkdir -p "$W/base"; cp explorations/run-c4/src/*.fsi explorations/run-c4/src/*.fss "$W/base/"
  cp -r "$W/base" "$W/d"; (cd "$W/d" && patch -s -p4 < "$R/decision-d.patch") || exit 1
  for c in base d; do cp -r "$W/$c" "$W/$c-split"; python3 "$O/make-variants.py" "$W/$c-split" split; done
  mkdir -p "$W/d-split-e3"; cp Library/*.fsi Library/*.fss ProjectFortress/LibraryBuiltin/*.fsi ProjectFortress/LibraryBuiltin/*.fss "$W/d-split-e3/"
  python3 "$O/make-variants.py" "$W/d-split-e3" e3; cp "$W/d-split/"* "$W/d-split-e3/" ;;
check)
  L=$1; shift; D=$W/$L; OUT=$W/mg-$L-any
  CP=$(./bin/fortress_classpath 2>/dev/null | tail -1 | sed 's#:[^:]*/default_repository/caches/bytecode_cache##')
  ALL="-Dprobe.tolerant=true -Dprobe.all=true -Dfortress.analyzer.overload.cache=false"
  rm -rf "$OUT.caches"; mkdir -p "$OUT.caches/tmp"
  TG=""; for c in $C4; do TG="$TG $D/$c.fss"; done
  { echo "########## DistanceMulti microGPT label=$L setting=any dir=$D"; echo "# jvm flags: $ALL"; echo "# machine: $(machine)"
    date -u +'# start %Y-%m-%dT%H:%M:%SZ'; ST=$(date +%s)
    ( cd "$D" && timeout -k 30 5400 java -Xmx4g -Xss64m -XX:-OmitStackTraceInFastThrow -Dfortress.caches="$OUT.caches" -Djava.io.tmpdir="$OUT.caches/tmp" $ALL \
         -cp "$W/work/shadow-classes:$W/work/classes:$CP" DistanceMulti -order check -setting any $TG )
    echo "exit=$?"; echo "ELAPSED $(( $(date +%s) - ST )) s"; date -u +'# end %Y-%m-%dT%H:%M:%SZ'; } > "$OUT.out" 2>&1
  rm -rf "$OUT.caches"
  python3 "$T/errors.py" "$OUT.tsv" "$OUT.out" > "$OUT.tally.txt" 2>&1
  echo "check $L: $(grep ELAPSED "$OUT.out"); $(grep -c '^@@SC ERR' "$OUT.out") error lines, $(grep '^@@SC ERR' "$OUT.out" | grep -c "$D/") at the program's own lines" ;;
own)
  L=$1; shift; grep '^@@SC ERR' "$W/mg-$L-any.out" | grep "$W/$L/[A-Z][A-Za-z]*\.fs[is]:" | grep -v "$W/$L/\(FortressLibrary\|FortressBuiltin\|NativeArray\)" \
    | sed "s#$W/$L/##g" | awk -F'\t' '{print $4}' | sed 's/^ *//' ;;
capture)
  L=$1; shift; F=$W/mg-$L-any.out; M=$R/measure; mkdir -p "$M"
  "$0" "$W" own "$L" > "$M/$L.own.txt"
  grep '^@@SC ERR' "$F" | grep -E "	(api|component) (FlatArrays|FlatData|MicroGptFlat|MicroGptFlatCheck)	" \
    | grep -v "	$W/$L/\(FlatArrays\|FlatData\|MicroGptFlat\|MicroGptFlatCheck\)\.fs" | sed "s#$W/$L/#<copy>/#g; s#$H/##g" | awk -F'\t' '{print $2" | "$4}' > "$M/$L.through.txt"
  { grep '^#\|^###' "$F" | sed "s#$W#<scratch>#g"; grep -E '^@@SC STAGE' "$F"
    grep -E '^@@TC DECL-' "$F" | grep "$W/$L/\(FlatArrays\|FlatData\|MicroGptFlat\|MicroGptFlatCheck\)\.fs" | sed "s#$W/$L/##g"
    grep -E '^exit=|^ELAPSED' "$F"; } > "$M/$L.stages.txt"
  echo "capture $L: $(wc -l < "$M/$L.own.txt") own, $(wc -l < "$M/$L.through.txt") through the program's units, $(grep -c DECL-CRASH "$M/$L.stages.txt") crashes" ;;
walk)
  N=${1:-1}; [ $# -gt 0 ] && shift; RT=$W/walkroot; C=$W/cache-walk
  rm -rf "$RT" "$C"; mkdir -p "$RT/c4" "$C/tmp"; printf '\0\0\0\0' > "$C/global.map"
  ln -s "$H/explorations/run-c" "$RT/run-c"; ln -s "$H/explorations/apl" "$RT/apl"; cp -r "$W/d" "$RT/c4/src"
  CP=$(bin/fortress_classpath | tail -1)
  { echo "# walk MicroGptFlatCheck (decision D's copy) $(date -u +%FT%TZ); $(FORTRESS_THREADS=$N machine | sed "s/FORTRESS_THREADS=[0-9]*/FORTRESS_THREADS=$N/")"
    cd "$RT/c4/src"; S=$(date +%s)
    FORTRESS_THREADS=$N FORTRESS_CACHES="$C" timeout -k 10 3600 java $JF -Djava.io.tmpdir="$C/tmp" -cp "$CP" com.sun.fortress.Shell walk MicroGptFlatCheck.fss 2>&1 \
      | grep -v '^\s*at \|^java.lang.Throwable\|Turn on "-debug'
    echo "exit ${PIPESTATUS[0]}; elapsed $(( $(date +%s) - S )) s"; } > "$W/walk-threads$N.txt" 2>&1
  rm -rf "$C"; cp "$W/walk-threads$N.txt" "$R/walk-threads$N.txt"; tail -3 "$W/walk-threads$N.txt" ;;
*) echo "unknown step $step"; exit 1 ;;
esac; done
