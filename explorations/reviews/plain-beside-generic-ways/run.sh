#!/bin/bash
# run.sh <cache-dir>: the probes of ../plain-beside-generic-ways.md, on rung G's build
# (/home/user/fortress-genrt), each run with the private cache <cache-dir> (outside both trees),
# FORTRESS_THREADS=1. Rung G's probes/common.sh functions, with the scope note's private cache
# (explorations/reviews/mie-probes/scope/scope-run.sh): the compiler prelude is compiled into the
# cache first, in library order. No tracked file of either tree is written.
set -u
FH=/home/user/fortress-genrt
HERE=/home/user/fortress/explorations/reviews/plain-beside-generic-ways
C=${1:?usage: run.sh <cache-dir>}
mkdir -p "$C" "$C/../tmp"; C=$(cd "$C" && pwd); T=$(cd "$C/../tmp" && pwd)
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64
export PATH="$JAVA_HOME/bin:$PATH"
export FORTRESS_HOME=$FH
unset JAVA_TOOL_OPTIONS
export FORTRESS_THREADS=1
export TMPDIR=$T
export FORTRESS_CACHES=$C
export JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$T -Dfortress.caches=$C"
machine () {
  echo "machine: nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/.*: //') MHz; load at start $(cut -d' ' -f1-3 /proc/loadavg); JDK $(java -version 2>&1 | head -1 | sed 's/.*version "\([0-9.]*\).*/\1/'); FORTRESS_THREADS=$FORTRESS_THREADS"
  echo "# build: $FH at $(git -C $FH log -1 --format=%h), source edits: $(git -C $FH status --short -- ProjectFortress/src Library | tr '\n' ' ')"
}
filt () { sed -e "s#$FH/##g" -e "s#$HERE/##g" -e "s#$C#<cache>#g" | grep -v '^\s*at \|^java.lang.Throwable\|^\s*\.\.\. [0-9]* more'; }
prelude () {
  [ -f "$C/global.map" ] || printf '\0\0\0\0' > "$C/global.map"
  echo "################ the compiler prelude into the private cache"
  (cd $FH/ProjectFortress && for f in LibraryBuiltin/AnyType LibraryBuiltin/CompilerBuiltin; do
     timeout 900 $FH/bin/fortress compile $f.fss 2>&1 | filt | tail -3; echo "compile $f exit=${PIPESTATUS[0]}"; done)
  (cd $FH && for f in CompilerLibrary CompilerAlgebra CompilerSystem; do
     timeout 900 $FH/bin/fortress compile Library/$f.fss 2>&1 | filt | tail -3; echo "compile Library/$f exit=${PIPESTATUS[0]}"; done)
}
comprun () {   # comprun <dir> <component>
  local d=$1 c=$2
  echo "################ $c compiled"
  (cd $d && timeout 300 $FH/bin/fortress compile $c.fss 2>&1 | filt | head -20; echo "compile exit=${PIPESTATUS[0]}")
  (cd $d && timeout 120 $FH/bin/fortress run $c 2>&1 | filt | head -12; echo "run exit=${PIPESTATUS[0]}")
}
walkrun () {   # walkrun <dir> <component>
  local d=$1 c=$2
  echo "################ $c walk"
  (cd $d && timeout 600 $FH/bin/fortress $c.fss 2>&1 | filt | head -30; echo "walk exit=${PIPESTATUS[0]}")
}
case "${2:-all}" in
  prelude) machine; prelude ;;
  walk) shift 2; machine; for p in "$@"; do walkrun $HERE/probes $p; done ;;
  both) shift 2; machine; for p in "$@"; do comprun $HERE/probes $p; walkrun $HERE/probes $p; done ;;
  team) machine; walkrun $FH/ProjectFortress/compiler_tests Compiled12.invariantInference;
        walkrun $FH/ProjectFortress/compiler_tests Compiled12.invariantInference2 ;;
esac
