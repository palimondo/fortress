#!/bin/bash
# Every command of switch-over-distance.md, in order.  Run from anywhere:
#
#   explorations/perf-probes/prelude/switch-over-distance/run-all.sh <work-dir> [step...]
#
# <work-dir> is a scratch directory OUTSIDE the repository: the compiled driver, the
# shadow sources and classes, the library copies and one private Fortress cache per run
# (-Dfortress.caches, ProjectProperties.java:283) live there.  Nothing is written to
# default_repository/ and no tracked file is modified.  Steps (default: all, in order):
#   build     the driver and the shadow classes
#   count     the gate's checker-count stage as it runs, overload memo on and off
#   control   the probe on the compiler's own prelude, which checks clean
#   check     every stage and every declaration, both settings, the twelve prelude components
#   codegen   desugaring and code generation per declaration, dispatch generation skipped
#   codegen2  the same with DESUGAR per declaration and BottomType comparable (add-patch.py)
#   dispatch  codegen2 with dispatch generation on, 30 min in code generation, under JFR
#   flat      FortressLibrary's checker run of `check` on keep/make-flat-lib.py's copies L0 and FLAT
# Raw output stays in <work-dir>; the captures beside this script are the raw output with
# the stack-trace lines removed (`trim`).  SKIP_DONE=1 keeps a run whose output is complete.
set -u
cd "$(dirname "$0")/../../../.."                                 # $FORTRESS_HOME
source explorations/experiment/env.sh                              # JDK 25, FORTRESS_THREADS=1, -Xmx4g -Xss64m
P=explorations/perf-probes/prelude/switch-over-distance
W=${1:?usage: run-all.sh <work-dir> [step...]}; shift
STEPS=${*:-build count control check codegen codegen2 dispatch flat}
mkdir -p "$W"
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1 | sed 's#:[^:]*/default_repository/caches/bytecode_cache##')
MEMO="-Dfortress.analyzer.overload.cache=false"       # FACTS.md:41, the memo defect
ALL="-Dprobe.tolerant=true -Dprobe.all=true $MEMO"

machine () {   # protocol.md § 6
  echo "# machine: nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/\t//g'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/\t//g')"
  echo "# load average at start: $(cut -d' ' -f1-3 /proc/loadavg); JDK: $(java -version 2>&1 | head -1); FORTRESS_THREADS=${FORTRESS_THREADS:-unset}"
}
run () {   # run <out> <timeout-s> <jvm flags> -- <Distance args...>
  local out=$1 lim=$2 fl=$3; shift 4
  if [ -n "${SKIP_DONE:-}" ] && grep -q '^ELAPSED' "$W/$out.out" 2>/dev/null; then echo "kept $out"; return; fi
  rm -rf "$W/caches-$out"; mkdir -p "$W/caches-$out"
  { echo "########## Distance $*"; echo "# jvm flags: $fl"; machine
    date -u +'# start %Y-%m-%dT%H:%M:%SZ'; S=$(date +%s)
    timeout -k 30 "$lim" java $JAVA_FLAGS -XX:-OmitStackTraceInFastThrow -Dfortress.caches="$W/caches-$out" $fl \
         -cp "$W/shadow-classes:$W/classes:$CP" Distance "$@"
    echo "exit=$?"; echo "ELAPSED $(( $(date +%s) - S )) s"; date -u +'# end %Y-%m-%dT%H:%M:%SZ'; } > "$W/$out.out" 2>&1
  rm -rf "$W/caches-$out"
  echo "ran $out: $(grep -E '^ELAPSED' "$W/$out.out")"
}
trim () {  # keep the diagnostics, drop the stack-trace lines
  grep -v '^@@CG AT\|^@@CG PREAT\|^@@CG OVLAT\|^@@CG CAT\|^@@TC DECLAT\|^@@SC CRASHAT\|^	at \|^Caused by' "$W/$1.out" > "$P/$1.out"
}
COMPONENTS="Library/FortressLibrary.fss Library/RangeInternals.fss ProjectFortress/LibraryBuiltin/FortressBuiltin.fss
 ProjectFortress/LibraryBuiltin/NativeArray.fss Library/List.fss Library/String.fss Library/FlatString.fss Library/Stream.fss
 ProjectFortress/LibraryBuiltin/NatReflect.fss Library/TypeProxy.fss Library/Writer.fss ProjectFortress/LibraryBuiltin/AnyType.fss"
short () { basename "$1" .fss; }

for step in $STEPS; do case $step in
build)
  mkdir -p "$W/classes"
  javac -nowarn -cp "$CP" -d "$W/classes" $P/Distance.java || exit 1
  $P/make-shadows.sh "$W/shadow-src" "$W/shadow-classes" > "$W/make-shadows.txt" 2>&1 || { tail "$W/make-shadows.txt"; exit 1; }
  ;;
count)
  # the gate's own stage, untouched, as it runs (memo on) and with the memo switched off by
  # its environment variable (ProjectProperties.java:122-125 reads the environment)
  explorations/coordinator/tools/checker-count/run.sh "$P/r01-count-stage.txt" "$W/count-on" > /dev/null 2>&1
  FORTRESS_ANALYZER_OVERLOAD_CACHE=false \
  explorations/coordinator/tools/checker-count/run.sh "$P/r01-count-stage-memo-off.txt" "$W/count-off" > /dev/null 2>&1
  # this probe's driver with every probe switch off reproduces the stage's total
  run r02-repro 900 "$MEMO" -- -order check -setting walk Library/FortressLibrary.fss; trim r02-repro
  ;;
control)
  # the compiler's own prelude, whose compile is green: every stage run must still give 0
  run r03-control-compilerlib 900 "$ALL" -- -order check -setting compile -compilerlib Library/CompilerLibrary.fss
  trim r03-control-compilerlib
  ;;
check)
  # FortressLibrary's run checks the twelve prelude apis with every stage too; the other
  # components' runs check the apis as the tracked method does (-Dprobe.componentOnly)
  for s in walk compile; do
    for c in $COMPONENTS; do
      case $c in */FortressLibrary.fss) fl="$ALL" ;; *) fl="$ALL -Dprobe.componentOnly=true" ;; esac
      run r1-$s-$(short $c) 1800 "$fl" -- -order check -setting $s $c; trim r1-$s-$(short $c)
    done
  done
  ;;
codegen)
  # desugar-codegen.md's method (2) as it ran on 2026-09-20: compile-path setting, the
  # checker caught per declaration with its early returns kept, dispatch generation skipped.
  # r2-*: exactly that; on today's tree FortressLibrary stops after TYPECHECK and
  # RangeInternals dies in DESUGAR.  r5-*: the same with the two further probe switches of
  # add-patch.py (DESUGAR per declaration on failure; BottomType comparable), which is what
  # gets code generation reached.
  for c in Library/FortressLibrary.fss ProjectFortress/LibraryBuiltin/FortressBuiltin.fss Library/RangeInternals.fss; do
    run r2-codegen-$(short $c) 1800 "-Dprobe.tolerant=true -Dprobe.skipOverloads=true $MEMO" -- -order full -setting compile $c
    trim r2-codegen-$(short $c)
    python3 explorations/perf-probes/prelude/desugar-codegen/classify.py "$P/r2-codegen-$(short $c).out" \
        > "$P/r2-codegen-$(short $c).classified.txt"
  done
  ;;
codegen2)
  for c in Library/FortressLibrary.fss Library/RangeInternals.fss; do
    run r5-codegen-$(short $c) 1800 "-Dprobe.tolerant=true -Dprobe.skipOverloads=true -Dprobe.bottomCompare=true $MEMO" \
        -- -order full -setting compile $c
    trim r5-codegen-$(short $c)
    python3 explorations/perf-probes/prelude/desugar-codegen/classify.py "$P/r5-codegen-$(short $c).out" \
        > "$P/r5-codegen-$(short $c).classified.txt"
  done
  ;;
dispatch)
  # overload dispatch generation left on (no probe.skipOverloads), otherwise as codegen2;
  # JFR throughout; watch-dispatch.sh samples the main thread every 30 s and stops the JVM
  # 30 minutes after it enters code generation (the checker and desugaring come first)
  rm -f "$W/r3-dispatch.watch.txt" "$W/r3-dispatch.jfr" "$W/r3-dispatch.dump.jfr"
  $P/watch-dispatch.sh caches-r3-dispatch "$W/r3-dispatch.watch.txt" 1800 "$W/r3-dispatch.dump.jfr" &
  run r3-dispatch 3600 "-Dprobe.tolerant=true -Dprobe.bottomCompare=true $MEMO -XX:StartFlightRecording=filename=$W/r3-dispatch.jfr,settings=profile,dumponexit=true" \
      -- -order full -setting compile Library/FortressLibrary.fss
  wait
  trim r3-dispatch
  cp "$W/r3-dispatch.watch.txt" "$P/r3-dispatch.watch.txt"
  J=$W/r3-dispatch.jfr; [ -s "$J" ] || J=$W/r3-dispatch.dump.jfr
  jfr view --width 200 hot-methods "$J" > "$P/r3-dispatch.hot-methods.txt" 2>&1
  python3 $P/jfr-stacks.py "$J" > "$P/r3-dispatch.jfr-frames.txt" 2>&1
  ;;
flat)
  # price-keep-the-rule.md § 5's copies, made again from today's tree; the copy's directory
  # shadows the tree's FortressLibrary and FortressBuiltin through Shell.sourcePath
  rm -rf "$W/libs"; python3 explorations/reviews/mie-probes/keep/make-flat-lib.py "$W/libs" || exit 1
  # L0 (the unchanged copy) under walk's setting is the control: it must give the tree's
  # r1-walk-FortressLibrary error for error, paths aside
  # FLAT's component stops at name resolution (Number's operators are gone); FLATN, the
  # copy that keeps them, is the one whose component can be checked
  for vs in L0-walk FLAT-walk FLAT-compile FLATN-walk FLATN-compile; do
    v=${vs%-*}; s=${vs#*-}
    run r4-$vs 1800 "$ALL" -- -order check -setting $s "$W/libs/$v/FortressLibrary.fss"; trim r4-$vs
  done
  # and the gate's own count on the copies, by the script that measured them first
  FORTRESS_ANALYZER_OVERLOAD_CACHE=false explorations/reviews/mie-probes/keep/count-variant.sh "$W/keepcount" L0 FLAT FLATN \
      > "$P/r4-count-stage-on-copies.txt" 2>&1
  ;;
*) echo "unknown step $step"; exit 1 ;;
esac; done
