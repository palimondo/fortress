#!/bin/bash
# Every command of switch-over-distance-flat.md, in order.  Run from anywhere:
#
#   explorations/perf-probes/prelude/switch-over-distance-flat/run-all.sh <work-dir> [step...]
#
# The 2026-09-26 measurement (../switch-over-distance/run-all.sh), repeated on the flat
# library with the same driver, shadows and classifier, which are used from that directory
# unchanged: Distance.java, make-shadows.sh, add-patch.py, errors.py, watch-dispatch.sh,
# jfr-stacks.py, and ../desugar-codegen/classify.py.  One addition: DistanceMulti.java
# beside this script, the same run over every component in one JVM (step `stage`).
#
# <work-dir> is a scratch directory OUTSIDE the repository: the compiled drivers, the
# shadow sources and classes and one private Fortress cache per run (-Dfortress.caches)
# live there.  Nothing is written to default_repository/ and no tracked file is modified.
# Steps (default: all, in order):
#   build     the drivers and the shadow classes
#   count     the gate's checker-count stage as it runs, overload memo on and off; the
#             driver with every probe switch off, both settings
#   control   the probe on the compiler's own prelude, which checks clean
#   check     every stage and every declaration, both settings, the twelve prelude components
#             (check-walk, check-compile: one setting)
#   codegen   desugar-codegen's method as it ran on 2026-09-20 (r2-*)
#   codegen2  the same with DESUGAR per declaration and BottomType comparable (r5-*)
#   dispatch  codegen2 with dispatch generation on, 30 min cap in code generation, under JFR
#   stage     the twelve components in one JVM under the compile path's setting (DistanceMulti)
#   stage-walk  the same under walk's setting
#   stage-any   the same under the third setting: bound Any, compiled-expression desugaring on
# Every step can be given alone; SKIP_DONE=1 keeps a run whose output is complete.
set -u
cd "$(dirname "$0")/../../../.."                                 # $FORTRESS_HOME
source explorations/experiment/env.sh                              # JDK 25, FORTRESS_THREADS=1, -Xmx4g -Xss64m
P=explorations/perf-probes/prelude/switch-over-distance-flat
O=explorations/perf-probes/prelude/switch-over-distance            # the 2026-09-26 probe's scripts
W=${1:?usage: run-all.sh <work-dir> [step...]}; shift
STEPS=${*:-build count control check codegen codegen2 dispatch stage}
mkdir -p "$W"
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1 | sed 's#:[^:]*/default_repository/caches/bytecode_cache##')
MEMO="-Dfortress.analyzer.overload.cache=false"
ALL="-Dprobe.tolerant=true -Dprobe.all=true $MEMO"

machine () {   # protocol.md, principle 2
  echo "# machine: nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/\t//g'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/\t//g')"
  echo "# load average at start: $(cut -d' ' -f1-3 /proc/loadavg); JDK: $(java -version 2>&1 | head -1); FORTRESS_THREADS=${FORTRESS_THREADS:-unset}"
  echo "# disk: $(df -h /home/user | tail -1 | awk '{print $4 " free of " $2}')"
}
run () {   # run <out> <timeout-s> <jvm flags> <main class> -- <args...>
  local out=$1 lim=$2 fl=$3 main=$4; shift 5
  if [ -n "${SKIP_DONE:-}" ] && grep -q '^ELAPSED' "$W/$out.out" 2>/dev/null; then echo "kept $out"; return; fi
  rm -rf /tmp/fortress*rats 2>/dev/null
  rm -rf "$W/caches-$out"; mkdir -p "$W/caches-$out"
  { echo "########## $main $*"; echo "# jvm flags: $fl"; machine
    date -u +'# start %Y-%m-%dT%H:%M:%SZ'; S=$(date +%s)
    timeout -k 30 "$lim" java $JAVA_FLAGS -XX:-OmitStackTraceInFastThrow -Dfortress.caches="$W/caches-$out" $fl \
         -cp "$W/shadow-classes:$W/classes:$CP" $main "$@"
    echo "exit=$?"; echo "ELAPSED $(( $(date +%s) - S )) s"; date -u +'# end %Y-%m-%dT%H:%M:%SZ'; } > "$W/$out.out" 2>&1
  rm -rf "$W/caches-$out"
  echo "ran $out: $(grep -E '^ELAPSED' "$W/$out.out")"
}
trim () {  # keep the diagnostics, drop the stack-trace lines and the one-line-per-error dump
  grep -v '^@@SC ERR\|^@@CG AT\|^@@CG PREAT\|^@@CG OVLAT\|^@@CG CAT\|^@@TC DECLAT\|^@@SC CRASHAT\|^	at \|^Caused by' "$W/$1.out" \
    | sed -e "s#$W#<work-dir>#g" -e "s#$PWD/##g" > "$P/$1.out"
}
COMPONENTS="Library/FortressLibrary.fss Library/RangeInternals.fss ProjectFortress/LibraryBuiltin/FortressBuiltin.fss
 ProjectFortress/LibraryBuiltin/NativeArray.fss Library/List.fss Library/String.fss Library/FlatString.fss Library/Stream.fss
 ProjectFortress/LibraryBuiltin/NatReflect.fss Library/TypeProxy.fss Library/Writer.fss ProjectFortress/LibraryBuiltin/AnyType.fss"
short () { basename "$1" .fss; }

for step in $STEPS; do case $step in
build)
  mkdir -p "$W/classes"
  javac -nowarn -cp "$CP" -d "$W/classes" $O/Distance.java $P/DistanceMulti.java || exit 1
  $O/make-shadows.sh "$W/shadow-src" "$W/shadow-classes" > "$W/make-shadows.txt" 2>&1 || { tail "$W/make-shadows.txt"; exit 1; }
  sed "s#$W#<work-dir>#g" "$W/make-shadows.txt" > "$P/r00-make-shadows.txt"
  ;;
count)
  explorations/coordinator/tools/checker-count/run.sh "$P/r01-count-stage.txt" "$W/count-on" > /dev/null 2>&1
  FORTRESS_ANALYZER_OVERLOAD_CACHE=false \
  explorations/coordinator/tools/checker-count/run.sh "$P/r01-count-stage-memo-off.txt" "$W/count-off" > /dev/null 2>&1
  run r02-repro 900 "$MEMO" Distance -- -order check -setting walk Library/FortressLibrary.fss; trim r02-repro
  run r02-repro-compile 900 "$MEMO" Distance -- -order check -setting compile Library/FortressLibrary.fss; trim r02-repro-compile
  ;;
control)
  run r03-control-compilerlib 900 "$ALL" Distance -- -order check -setting compile -compilerlib Library/CompilerLibrary.fss
  trim r03-control-compilerlib
  ;;
check|check-walk|check-compile)
  case $step in check) SS="compile walk" ;; *) SS=${step#check-} ;; esac
  for s in $SS; do
    for c in $COMPONENTS; do
      case $c in */FortressLibrary.fss) fl="$ALL" ;; *) fl="$ALL -Dprobe.componentOnly=true" ;; esac
      run r1-$s-$(short $c) 2400 "$fl" Distance -- -order check -setting $s $c; trim r1-$s-$(short $c)
    done
  done
  ;;
codegen)
  for c in Library/FortressLibrary.fss ProjectFortress/LibraryBuiltin/FortressBuiltin.fss Library/RangeInternals.fss; do
    run r2-codegen-$(short $c) 2400 "-Dprobe.tolerant=true -Dprobe.skipOverloads=true $MEMO" Distance -- -order full -setting compile $c
    trim r2-codegen-$(short $c)
    python3 explorations/perf-probes/prelude/desugar-codegen/classify.py "$P/r2-codegen-$(short $c).out" \
        > "$P/r2-codegen-$(short $c).classified.txt"
  done
  ;;
codegen2)
  for c in Library/FortressLibrary.fss Library/RangeInternals.fss; do
    run r5-codegen-$(short $c) 2400 "-Dprobe.tolerant=true -Dprobe.skipOverloads=true -Dprobe.bottomCompare=true $MEMO" \
        Distance -- -order full -setting compile $c
    trim r5-codegen-$(short $c)
    python3 explorations/perf-probes/prelude/desugar-codegen/classify.py "$P/r5-codegen-$(short $c).out" \
        > "$P/r5-codegen-$(short $c).classified.txt"
  done
  ;;
dispatch)
  rm -f "$W/r3-dispatch.watch.txt" "$W/r3-dispatch.jfr" "$W/r3-dispatch.dump.jfr"
  $O/watch-dispatch.sh caches-r3-dispatch "$W/r3-dispatch.watch.txt" 1800 "$W/r3-dispatch.dump.jfr" &
  run r3-dispatch 3600 "-Dprobe.tolerant=true -Dprobe.bottomCompare=true $MEMO -XX:StartFlightRecording=filename=$W/r3-dispatch.jfr,settings=profile,dumponexit=true" \
      Distance -- -order full -setting compile Library/FortressLibrary.fss
  wait
  trim r3-dispatch
  cp "$W/r3-dispatch.watch.txt" "$P/r3-dispatch.watch.txt"
  J=$W/r3-dispatch.jfr; [ -s "$J" ] || J=$W/r3-dispatch.dump.jfr
  jfr view --width 200 hot-methods "$J" > "$P/r3-dispatch.hot-methods.txt" 2>&1
  python3 $O/jfr-stacks.py "$J" > "$P/r3-dispatch.jfr-frames.txt" 2>&1
  t0=$(sed -n 's/^# code generation entered at \([0-9:]*\).*/\1/p' "$W/r3-dispatch.watch.txt")
  t1=$(sed -n 's/^# end ....-..-..T\([0-9:]*\)Z/\1/p' "$W/r3-dispatch.out")
  [ -n "$t0" ] && python3 $O/jfr-stacks.py "$J" "$t0" "$t1" > "$P/r3-dispatch.jfr-codegen.txt" 2>&1
  python3 explorations/perf-probes/prelude/desugar-codegen/classify.py "$P/r3-dispatch.out" > "$P/r3-dispatch.classified.txt"
  ;;
stage|stage-walk|stage-any)
  # the smallest run that reports the whole distance: one JVM, one cache, the twelve
  # components, FortressLibrary first so that its run checks the apis with every stage
  case $step in stage) s=compile ;; stage-any) s=any ;; *) s=walk ;; esac
  run r6-stage-$s 5400 "$ALL" DistanceMulti -- -order check -setting $s $COMPONENTS; trim r6-stage-$s
  ;;
*) echo "unknown step $step"; exit 1 ;;
esac; done
