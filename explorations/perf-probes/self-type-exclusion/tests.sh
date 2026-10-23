#!/bin/bash
# Compiled .test files under this probe's shadows: `fortress junit` in one JVM, as
# climb-batch-N/merged-tests/junit.sh runs it with ONE_JVM=1, with the shadowed checker
# classes (shadow.py beside this script) ahead of ProjectFortress/build on the class path
# and a private copy of the tree's caches, so that default_repository/ is never written.
#
#     explorations/perf-probes/self-type-exclusion/tests.sh <scratch-dir> plain -- X.test Y.test ...
#     explorations/perf-probes/self-type-exclusion/tests.sh <scratch-dir> full [selfexc] [bounds] [global] -- X.test ...
#
# Run from $FORTRESS_HOME with the call set up as the fortress-repo skill says; the test
# files are named relative to ProjectFortress/compiler_tests. It prints JUnit's verdict and
# each test's lines, with the Java stack frames removed, to standard output. The run step
# of a test is bin/fortress run, which inherits FORTRESS_CACHES and runs no checker.
set -u
SC=${1:?usage: tests.sh <scratch-dir> plain|full [words] -- tests}
MODE=${2:?usage: tests.sh <scratch-dir> plain|full [words] -- tests}
shift 2
WORDS=()
while [ $# -gt 0 ] && [ "$1" != "--" ] ; do WORDS+=("$1") ; shift ; done
[ "${1:-}" = "--" ] && shift
case "$SC" in /*) ;; *) SC="$PWD/$SC" ;; esac
FH=${FORTRESS_HOME:-$PWD}
P="$FH/explorations/perf-probes/self-type-exclusion"
rm -rf "$SC" ; mkdir -p "$SC/ocsrc" "$SC/occlasses" "$SC/tmp" || exit 1
CP=$("$FH/bin/fortress_classpath" | tail -1)
EXTRA=
if [ "$MODE" != plain ] ; then
    python3 "$P/shadow.py" "$FH" "$SC/ocsrc" "${WORDS[@]}" > "$SC/shadow.txt" || exit 1
    java -cp "$CP" scala.tools.nsc.Main -nowarn -classpath "$CP" -d "$SC/occlasses" -encoding UTF-8 \
         "$SC"/ocsrc/*.scala || { echo "tests: scalac failed" >&2 ; exit 1 ; }
    EXTRA="$SC/occlasses:"
fi
cp -a "$FH/default_repository/caches" "$SC/caches"
export FORTRESS_CACHES="$SC/caches" FORTRESS_THREADS=4
export JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$SC/tmp"
files=() ; for t in "$@" ; do files+=("compiler_tests/$t") ; done
echo "# tests.sh $MODE ${WORDS[*]}; $(date -u +%FT%TZ); nproc $(nproc); load at start $(cut -d' ' -f1-3 /proc/loadavg); FORTRESS_THREADS=4; ${#files[@]} files"
cd "$FH/ProjectFortress"
java $JAVA_FLAGS -Dfile.encoding=UTF-8 -Dfortress.caches="$SC/caches" -cp "$EXTRA$CP" com.sun.fortress.Shell junit "${files[@]}" 2>&1 \
    | sed "s#$FH/##g" | grep -v '^\s*at ' | cut -c1-240
echo "exit=${PIPESTATUS[0]}"
