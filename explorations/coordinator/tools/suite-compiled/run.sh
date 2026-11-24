#!/bin/bash
# run.sh <list> <base|-> <work-dir> <out-dir> [declared ...]: the interpreter's suite on the compiled path, the
# gate's step 7 (POSITIONS.md, P-103, "The suite's verdict is the check."; the batch script's gateRole).
#
# <list> holds, below its "#" lines, one "program<TAB>library" line per program of ProjectFortress/tests/ that
# passes compiled by its own verdict: the program as a path under ProjectFortress/, the library "one"
# (FORTRESS_LIBRARY=one) or "prelude" (the compiler's own). The gate's list is
# explorations/compile-ladder/gate/suite-compiled.tsv. Each listed program whose file exists is compiled and run
# under its library. Each program of ProjectFortress/tests/ that git diff --diff-filter=AM <base> HEAD names and
# the list does not hold, a candidate, is tried under both libraries; with "-" for <base> there is none.
# judge.py beside this script judges each by its own verdict, as the suite's harness judges it under walk, never
# against an earlier run, writes <out-dir>/verdicts.tsv and <out-dir>/list.tsv (the list after this run, which
# the gate's commit stage lands in the list's place) and prints its lines (its header). Exit 1 when a listed
# program fails and no [declared] argument names it: a program that a rung declared leaving the list.
#
# The two libraries run at once, each in <work-dir>/<library>/ by a copy of the compile ladder's driver,
# explorations/compile-ladder/repair-r1-atomic-static/run-subset.sh: a private caches folder, pruned here to its
# pristine copy after every file, 120 s for a compile and 60 s for a run, FORTRESS_THREADS=1. Each program then
# compiles from the same caches, whatever ran before it: under the driver's own prune of every ten files,
# tests/OverloadSingleParamUnbounded.fss passed where an earlier compile had left the api Executable's analyzed
# entry in the caches and failed where none had (2026-11-24; ledger row 1130). The prelude's
# caches are <work-dir>/prelude/root/ladder-caches and pristine where the gate's step 3 copied the tree's caches
# there; without them the driver compiles the prelude itself (about 145 s). The one library's are filled here,
# once, by one_library_tests/OneLibraryComponents.test in one JVM (about 170 s). It needs ProjectFortress/build
# and build-one, which ant compileAll makes. It runs the tree it sits in, from any directory; relative paths are
# taken from that tree's root. Its log lines are the judge's, and a line for a one library that did not build.
# Check the judge with: python3 -B explorations/coordinator/tools/suite-compiled/test_judge.py
set -u
U='usage: run.sh <list> <base|-> <work-dir> <out-dir> [declared ...]'
[ $# -ge 4 ] || { echo "$U" >&2 ; exit 2 ; }
HERE=$(cd "$(dirname "$0")" && pwd)
ROOT=$(cd "$HERE/../../../.." && pwd)
abs () { case "$1" in /*) echo "$1" ;; *) echo "$ROOT/$1" ;; esac ; }
LIST=$(abs "$1") BASE=$2 W=$(abs "$3") O=$(abs "$4")
shift 4
cd "$ROOT" || exit 2
[ -f "$LIST" ] || { echo "no list: $LIST" >&2 ; exit 2 ; }
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$ROOT"
unset JAVA_TOOL_OPTIONS FORTRESS_LIBRARY FORTRESS_CACHES
mkdir -p "$W/prelude/root" "$W/one/root" "$O"

# The candidates: the programs of ProjectFortress/tests/ added or changed since <base> that the list does not
# hold, less the files the harness does not run as tests (FileTests.interpreterSuite).
{ [ "$BASE" = - ] || git diff --name-only --diff-filter=AM "$BASE" HEAD -- ProjectFortress/tests ; } \
    | sed -n 's|^ProjectFortress/\(tests/[^/]*\.fss\)$|\1|p' \
    | grep -v -E '(Syntax|DynamicSemantics|Satisfiability)\.fss$|GenomeUtil' \
    | grep -v -x -F -f <(grep -v '^#' "$LIST" | cut -f1) > "$W/candidates.txt"

# Each library's subset, its listed programs whose file exists and then the candidates, and its driver.
for lib in prelude one ; do
    { grep -v '^#' "$LIST" | awk -F'\t' -v l=$lib 'NF >= 2 && $2 == l { print $1 }' ; cat "$W/candidates.txt" ; } \
        | while read -r p ; do [ -f "ProjectFortress/$p" ] && printf '%s\t%s\n' "${p%%/*}" "${p#*/}" ; done > "$W/$lib/subset.txt"
    : > "$W/$lib/results.tsv"           # an earlier run's results never stand for this one's
    cp explorations/compile-ladder/repair-r1-atomic-static/run-subset.sh "$W/$lib/"
    sed -i -e "s|^OUT=.*|OUT=$W/$lib|" -e "s|^LADDER_ROOT=.*|LADDER_ROOT=$W/$lib/root|" \
           -e "s|^source .*/explorations/experiment/env.sh\"\$|source \"$ROOT/explorations/experiment/env.sh\"|" \
           -e 's/\$((n % 10))/$((n % 1))/' "$W/$lib/run-subset.sh"
    grep -q 'n % 1))' "$W/$lib/run-subset.sh" || { echo "run.sh: the driver's prune line has moved" >&2 ; exit 2 ; }
done

# The one library's fourteen components, once, into the one root's caches and its pristine copy.
one_library () {
    local R="$W/one/root"
    [ -f "$R/pristine/bytecode_cache/fortress.FortressLibrary.jar" ] && return 0
    rm -rf "$R/ladder-caches" "$R/pristine" ; mkdir -p "$R/ladder-caches" "$R/ladder-tmp"
    ( cd ProjectFortress && FORTRESS_LIBRARY=one FORTRESS_CACHES="$R/ladder-caches" FORTRESS_THREADS=1 \
          JAVA_FLAGS="-Xmx4g -Xss64m -Dfortress.caches=$R/ladder-caches -Djava.io.tmpdir=$R/ladder-tmp" \
          timeout -k 5 900 ../bin/fortress junit one_library_tests/OneLibraryComponents.test ) > "$W/one/library.txt" 2>&1
    grep -q '^OK (' "$W/one/library.txt" || { echo "ONE-LIBRARY-NOT-BUILT	$W/one/library.txt" ; return 1 ; }
    cp -a "$R/ladder-caches" "$R/pristine"
}

( one_library && FORTRESS_LIBRARY=one bash "$W/one/run-subset.sh" > "$W/one/driver.txt" 2>&1 ) &
bash "$W/prelude/run-subset.sh" > "$W/prelude/driver.txt" 2>&1
wait
python3 -B "$HERE/judge.py" "$LIST" "$W" "$O" "$@"
