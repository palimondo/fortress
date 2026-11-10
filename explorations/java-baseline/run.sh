#!/bin/bash
# Compiles the pure-Java microGPT and runs it, its checks or its timings.
#   ./run.sh            the five-step run, the quick check and the full check
#   ./run.sh run | quick | check     one of them
#   ./run.sh bench [forks] [processes]   the timings of REPORT.md (10 forks, 30 processes)
#   ./run.sh variants   every check on the two variants (variants/): the Vector API, and fork/join
#   ./run.sh asm        which loops C2 vectorised, from the machine code
#   ./run.sh kernels [forks] | steps [forks] | scale [forks]   the variants' timings beside the baseline's
#   ./run.sh dot [processes]   the rehearsal's dot-product loop in plain Java (REPORT.md, "The rehearsal's loop")
#   ./run.sh parse      how many parameters FlatData's parser rounds otherwise than Double.parseDouble
#   ./run.sh axpy       whether the JIT vectorises the products' inner loop (REPORT.md, "What is not optimal")
# The classes go under /tmp (JAVA_BASELINE_OUT overrides); nothing is written
# in the tree.  The programs run from explorations/run-c4/src, as the Fortress
# programs do, so that they read the same files by the same relative paths.
set -e
here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export JAVA_HOME="${JAVA_HOME_25:-/usr/lib/jvm/java-25-openjdk-amd64}"   # the JDK of explorations/experiment/env.sh
export PATH="$JAVA_HOME/bin:$PATH"
unset JAVA_TOOL_OPTIONS                                                  # as env.sh does
out="${JAVA_BASELINE_OUT:-/tmp/java-baseline-classes}"
mkdir -p "$out"
javac -Xlint:all -d "$out" "$here"/*.java
# the two variants: the baseline's sources with FlatArrays replaced by the
# variant's, and the baseline's FlatArrays beside it under the name FlatArraysPlain
VEC="--add-modules jdk.incubator.vector"
for v in vector forkjoin; do
    mkdir -p "$out-$v/src"
    sed 's/\bFlatArrays\b/FlatArraysPlain/g' "$here/FlatArrays.java" > "$out-$v/src/FlatArraysPlain.java"
    opt=""; [ "$v" = vector ] && opt="$VEC"
    javac -Xlint:all,-incubating $opt -d "$out-$v" "$out-$v/src/FlatArraysPlain.java" "$here/variants/$v/FlatArrays.java" \
        $(ls "$here"/*.java | grep -v '/FlatArrays.java$') 2>&1 | grep -v 'incubator module' || true
done
cd "$here/../run-c4/src"
J="java -cp $out"
JV="java $VEC -cp $out-vector"
JF="java -cp $out-forkjoin"

# wall time of whole processes: n runs of one class, output discarded, ms each
processes () {   # processes <n> <class> [argument]
    local n="$1"; shift
    for _ in $(seq "$n"); do
        t0=$EPOCHREALTIME; $J "$@" > /dev/null; t1=$EPOCHREALTIME
        echo "$t0 $t1" | awk '{ printf "%.1f\n", ($2 - $1) * 1000 }'
    done
}
# the program's own "total" line (ms from its first statement to its last check) over n runs
totals () {      # totals <class> <n>
    for _ in $(seq "$2"); do $J "$1" | sed -n 's/^total \([0-9.]*\) ms$/\1/p'; done
}
# the five "(… ms)" step times of n five-step runs, as "step <s> <ms>"
steptimes () {   # steptimes <n>
    for _ in $(seq "$1"); do $J MicroGptFlat | sed -n 's/^step \([1-5]\) .*(\([0-9.]*\) ms)$/step \1 \2/p'; done
}

case "${1:-all}" in
  run)   $J MicroGptFlat ;;
  quick) $J MicroGptFlatQuick ;;
  check) $J MicroGptFlatCheck ;;
  all)   $J MicroGptFlat; $J MicroGptFlatQuick; $J MicroGptFlatCheck ;;
  bench)
    forks="${2:-10}"; n="${3:-30}"
    java -version 2>&1 | sed 's/^/# /'
    echo "# $(nproc) CPUs | $(grep -m1 'model name' /proc/cpuinfo | cut -d: -f2- | xargs) | $(grep -m1 MHz /proc/cpuinfo | cut -d: -f2 | xargs) MHz | flags: none (defaults)"
    echo "# load before: $(cat /proc/loadavg)"
    echo "## in-process, after warm-up: $forks forks, each 4 s of warm-up, then 30 samples of 20 ms per workload"
    for f in $(seq "$forks"); do echo "fork $f"; $J Bench fork 4 30 20; done
    echo "# load between: $(cat /proc/loadavg)"
    echo "## whole processes, cold: $n runs each, wall ms from before the launch to after the exit"
    echo "a JVM that does nothing:           $(processes "$n" Bench nothing | $J Bench stats)"
    echo "MicroGptFlat (the five-step run):  $(processes "$n" MicroGptFlat | $J Bench stats)"
    echo "MicroGptFlatQuick (7 checks):      $(processes "$n" MicroGptFlatQuick | $J Bench stats)"
    echo "MicroGptFlatCheck (40 checks):     $(processes "$n" MicroGptFlatCheck | $J Bench stats)"
    echo "## the checks' own work, cold: the program's total line, ms, $n runs each"
    echo "MicroGptFlatQuick total:           $(totals MicroGptFlatQuick "$n" | $J Bench stats)"
    echo "MicroGptFlatCheck total:           $(totals MicroGptFlatCheck "$n" | $J Bench stats)"
    echo "## the five-step run's own step times, cold, ms, $n runs"
    st="$(steptimes "$n")"
    for s in 1 2 3 4 5; do echo "step $s:                            $(echo "$st" | awk -v s=$s '$2 == s { print $3 }' | $J Bench stats)"; done
    echo "# load after: $(cat /proc/loadavg)"
    ;;
  variants)   # every check on each variant: the Vector API, then fork/join at 1, 2 and 4 threads and three grains
    echo "vector:"; $JV MicroGptFlatQuick 2>&1 | grep -v incubator | tail -1; $JV MicroGptFlatCheck 2>&1 | tail -1
    for t in 1 2 4; do for gr in "16 1" "16 16" "4 4"; do set -- $gr
        echo "forkjoin threads $t grain $1 mmgrain $2:"
        $JF -Dbaseline.threads=$t -Dbaseline.grain=$1 -Dbaseline.mmgrain=$2 MicroGptFlatQuick | tail -1
        $JF -Dbaseline.threads=$t -Dbaseline.grain=$1 -Dbaseline.mmgrain=$2 MicroGptFlatCheck | tail -1
    done; done ;;
  # The measurements beside the baseline (REPORT.md, "Vectorisation" and "Fork/join").  A
  # configuration is a name and a command; each mode runs the configurations in turn inside
  # each fork, so that a change in the machine's load reaches all of them.
  asm)        # which loops C2 vectorised: each method compiled alone, its machine code counted by kind
    $J -XX:+UnlockDiagnosticVMOptions -XX:CompileCommand=quiet "-XX:CompileCommand=print,FlatArrays::*" "-XX:CompileCommand=print,MicroGptFlat*::*" \
       "-XX:CompileCommand=dontinline,FlatArrays::*" "-XX:CompileCommand=dontinline,MicroGptFlat::*" Bench fork 3 2 20 2>&1 | "$here/asm-count.py" | grep -v OSR ;;
  kernels|steps|scale)
    mode="$1"; forks="${2:-3}"
    configs () {
        echo "plain|$J"
        echo "plain -XX:-UseSuperWord|$J -XX:-UseSuperWord"
        echo "vector|$JV"
        for t in 1 2 4; do for gr in "16 1" "16 16" "4 4"; do set -- $gr
            echo "forkjoin threads $t grain $1 mmgrain $2|$JF -Dbaseline.threads=$t -Dbaseline.grain=$1 -Dbaseline.mmgrain=$2"
        done; done
    }
    scaleconfigs () {
        echo "plain|$J|16 32 64 128 256 512"
        echo "vector|$JV|16 32 64 128 256 512"
        for t in 1 2 4; do
            echo "forkjoin threads $t grain 16 mmgrain 1|$JF -Dbaseline.threads=$t -Dbaseline.grain=16 -Dbaseline.mmgrain=1|16 32 64 128"
            echo "forkjoin threads $t grain 16 mmgrain 16|$JF -Dbaseline.threads=$t -Dbaseline.grain=16 -Dbaseline.mmgrain=16|16 32 64 128 256 512"
            echo "forkjoin threads $t grain 1024 mmgrain 64|$JF -Dbaseline.threads=$t -Dbaseline.grain=1024 -Dbaseline.mmgrain=64|16 32 64 128 256 512"
        done
    }
    echo "# $(nproc) CPUs | $(grep -m1 'model name' /proc/cpuinfo | cut -d: -f2- | xargs) | $(java -version 2>&1 | head -1)"
    for f in $(seq "$forks"); do
        echo "# fork $f | load: $(cat /proc/loadavg)"
        if [ "$mode" = scale ]; then
            scaleconfigs | while IFS='|' read -r name cmd sizes; do echo "== $name"; $cmd Bench scale 250 10 10 $sizes 2>&1 | grep -v incubator; done
        else
            configs | while IFS='|' read -r name cmd; do
                echo "== $name"
                if [ "$mode" = kernels ]; then $cmd Bench kernels 250 10 10 2>&1 | grep -v incubator
                else $cmd Bench fork 4 30 20 2>&1 | grep -v 'incubator\|warm-up'; fi
            done
        fi
    done
    echo "# load after: $(cat /proc/loadavg)" ;;
  dot)        # the rehearsal's DotU loop: whole processes, the loops' own time cold, and in process after warm-up
    n="${2:-30}"
    echo "# load before: $(cat /proc/loadavg)"
    $J DotU | sed 's/  (.*//'
    echo "whole process, wall ms:            $(processes "$n" DotU | $J Bench stats)"
    echo "the loops' own time, cold, ms:     $(for _ in $(seq "$n"); do $J DotU | sed -n 's/.*(\([0-9.]*\) ms)$/\1/p'; done | $J Bench stats)"
    for f in 1 2 3 4 5; do echo "fork $f, after warm-up: $($J DotU warm)"; done
    echo "# load after: $(cat /proc/loadavg)" ;;
  parse) $J Probes parse ;;
  axpy)  $J Probes axpy ;;
  *) echo "usage: run.sh [run|quick|check|variants|asm|kernels|steps|scale|dot|parse|axpy|bench [forks] [processes]]" >&2; exit 2 ;;
esac
