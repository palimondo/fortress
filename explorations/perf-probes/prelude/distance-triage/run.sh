#!/bin/bash
# The runs of distance-triage.md.  From anywhere:
#
#   explorations/perf-probes/prelude/distance-triage/run.sh <work-dir> build
#   explorations/perf-probes/prelude/distance-triage/run.sh <work-dir> lib <variant>
#   explorations/perf-probes/prelude/distance-triage/run.sh <work-dir> stage <variant> <walk|compile|any>
#
# The measurement of ../switch-over-distance-flat.md (its step `stage`: DistanceMulti, the
# twelve prelude components in one JVM, every stage and declaration, overload memo off), with
# one difference: the twelve targets are read from a library copy, <work-dir>/libs/<variant>/,
# which holds every .fsi/.fss of Library/ and ProjectFortress/LibraryBuiltin/ and so shadows
# the tree's through Shell.sourcePath (as switch-over-distance/run-all.sh's step `flat` did).
# Variant L0 is the unchanged copy, the control; the others are made by variants.py.
# Nothing tracked is modified; nothing is written to default_repository/.
#
# Unlike explorations/experiment/env.sh and the earlier run-all.sh, this script does NOT remove
# /tmp/fortress*rats: other runs on the machine use those directories.
set -u
cd "$(dirname "$0")/../../../.."                                  # $FORTRESS_HOME
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH=/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH
export FORTRESS_HOME=$PWD FORTRESS_THREADS=1 JAVA_FLAGS="-Xmx4g -Xss64m"
unset JAVA_TOOL_OPTIONS
P=explorations/perf-probes/prelude/distance-triage
O=explorations/perf-probes/prelude/switch-over-distance            # driver, shadows, errors.py
F=explorations/perf-probes/prelude/switch-over-distance-flat       # DistanceMulti.java
W=${1:?usage: run.sh <work-dir> build|lib|stage ...}; STEP=${2:?step}; shift 2
mkdir -p "$W"
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1 | sed 's#:[^:]*/default_repository/caches/bytecode_cache##')
ALL="-Dprobe.tolerant=true -Dprobe.all=true -Dfortress.analyzer.overload.cache=false"
COMPONENTS="FortressLibrary RangeInternals FortressBuiltin NativeArray List String FlatString Stream NatReflect TypeProxy Writer AnyType"

machine () {   # protocol.md, principle 2
  echo "# machine: nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/\t//g'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/\t//g')"
  echo "# load average at start: $(cut -d' ' -f1-3 /proc/loadavg); JDK: $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS"
  echo "# disk: $(df -h /home/user | tail -1 | awk '{print $4 " free of " $2}')"
}
case $STEP in
build)
  mkdir -p "$W/classes"
  javac -nowarn -cp "$CP" -d "$W/classes" $O/Distance.java $F/DistanceMulti.java || exit 1
  $O/make-shadows.sh "$W/shadow-src" "$W/shadow-classes" > "$W/make-shadows.txt" 2>&1 || { tail "$W/make-shadows.txt"; exit 1; }
  # this note's one shadow of its own, inert unless -Dprobe.boundAny=true (bound-any-shadow.py)
  rm -rf "$W/any-src" "$W/any-classes"; mkdir -p "$W/any-classes"
  python3 $P/bound-any-shadow.py ProjectFortress/src "$W/any-src" &&
  javac -nowarn -encoding UTF-8 -cp "$CP" -d "$W/any-classes" \
        "$W/any-src/com/sun/fortress/compiler/desugarer/PreDisambiguationDesugaringVisitor.java" || exit 1
  ;;
lib)
  v=${1:?variant}; d=$W/libs/$v
  rm -rf "$d"; mkdir -p "$d"
  cp Library/*.fsi Library/*.fss ProjectFortress/LibraryBuiltin/*.fsi ProjectFortress/LibraryBuiltin/*.fss "$d/"
  [ "$v" = L0 ] || python3 $P/variants.py "$d" "$v" || exit 1
  ;;
stage)
  # <setting>: walk, compile or any (DistanceMulti's), or compile-any: the compile path's
  # setting with the pre-desugared bound Any instead of Object (-Dprobe.boundAny, type parameters only)
  v=${1:?variant}; s=${2:?setting}; out=$W/stage-$v-$s${TAG:+-$TAG}
  X=""; ds=$s; SH=""; [ "$s" = compile-any ] && { X="-Dprobe.boundAny=true"; ds=compile; SH="$W/any-classes:"; }
  [ -n "${EXTRA_CP:-}" ] && SH="$EXTRA_CP:$SH"; X="$X ${EXTRA_FLAGS:-}"   # a checker shadow (numeral-shadow.py) and its switch
  [ -d "$W/libs/$v" ] || { echo "no library copy $v"; exit 1; }
  T=""; for c in $COMPONENTS; do T="$T $W/libs/$v/$c.fss"; done
  rm -rf "$out.caches"; mkdir -p "$out.caches"
  { echo "########## DistanceMulti variant=$v setting=$s"; echo "# jvm flags: $ALL $X"; machine
    date -u +'# start %Y-%m-%dT%H:%M:%SZ'; S=$(date +%s)
    timeout -k 30 5400 java $JAVA_FLAGS -XX:-OmitStackTraceInFastThrow -Dfortress.caches="$out.caches" $ALL $X \
         -cp "$SH$W/shadow-classes:$W/classes:$CP" DistanceMulti -order check -setting $ds $T
    echo "exit=$?"; echo "ELAPSED $(( $(date +%s) - S )) s"; date -u +'# end %Y-%m-%dT%H:%M:%SZ'; } > "$out.out" 2>&1
  rm -rf "$out.caches"
  python3 $O/errors.py "$out.tsv" "$out.out" > "$out.tally.txt"
  echo "ran $v $s: $(grep -E '^ELAPSED' "$out.out"); $(wc -l < "$out.tsv") lines in $out.tsv"
  ;;
*) echo "unknown step $STEP"; exit 1 ;;
esac
