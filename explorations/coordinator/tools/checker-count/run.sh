#!/bin/bash
# The gate's checker-count stage: run the bytecode compiler's static checker over the
# INTERPRETER's library, with the interpreter's prelude in scope, and print the per-api
# error table, the total and the crash line that follows it.
#
# Why it exists: POSITIONS.md, 2026-09-21, "the library route" - one library, the
# interpreter's, becomes the library the compiler checks - and step 1 of
# coordinator/library-route-judgement.md, which makes the distance to that goal a
# permanent gate stage rather than a one-off script. A change in the count is reported, not red (checker-gate-review.md).
#
# Run from $FORTRESS_HOME with explorations/experiment/env.sh sourced, after ant compileAll:
#
#     explorations/coordinator/tools/checker-count/run.sh <out-file> [scratch-dir]
#
# It writes the table to <out-file> and prints it. Nothing in the tree is touched:
# javac output and the checker's caches go to the scratch directory (default: $TMPDIR
# or /tmp), and the caches are given to the JVM as -Dfortress.caches, honoured through
# ProjectProperties.java:261-269,283, so default_repository/ is never read or written.
# Exit 0 if the table holds a total; 1 if no table could be produced, or if the table holds
# no total because the run's errors are not the checker's (#stopped, below). 20 s in the
# main tree, measured 2026-09-22; it needs no library rebuild and no warm cache.
#
# The run stops after the type checker (WorldFlip -stop check), since 2026-10-24 (climb batch
# 22): the compiler's own phase order up to and including TYPECHECK, integer literal folding
# included, as the distance stage's DistanceMulti -order check. Past the checker, the code
# generator's refusals are not the checker's errors (FACTS F-34 counts them), and its first
# one throws, so a run on a library the checker passes went on into the code generator and
# printed no total. A run the checker stops runs the same phases as before; a clean check,
# a run that reached the component's check and ended rc 0 with no error line, reads as 0.
#
# The two sources beside this script are copies, taken 2026-09-22 from
# explorations/perf-probes/prelude/, so that the gate does not depend on a probe
# directory: WorldFlip.java (Shell.useInterpreterLibraries() plus
# PhaseOrder.compilerPhaseOrder, both public, which is the world switch without an edit
# to a tracked file; its -stop check added 2026-10-24) and shadow-src/.../StaticChecker.java, a copy of
# ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java with three
# instrumentation points added: it names each compilation unit it checks and prints that
# unit's error count, and it catches the OverloadingChecker crash instead of dying on it.
# It is put AHEAD of ProjectFortress/build on the classpath, the technique of
# perf-probes/prelude/run-all.sh:33-35. A copy of a tracked source goes stale silently,
# so the checksum of the tracked one is recorded here and the table's "#shadow" line
# says whether it still matches.
#
# The overloading checker's memo is off (-Dfortress.analyzer.overload.cache=false, read
# at OverloadingChecker.scala:77), since 2026-09-27 (climb batch 7). The memo is keyed on
# declaration pairs and hides 27 to 35 errors depending on the build order once an api's
# overloading check runs (perf-probes/nat/triage.md section 1; FACTS.md, "The hidden
# layer, classified"); with it off every build gives one count. The table's "#cache"
# row says so. On the tree of 2026-09-27 the count is 62 with the memo on and off,
# because the FortressLibrary api stops before its overloading check.
#
# The table, tab-separated, every row tagged:
#   #api        one row per api the checker checked, with that api's error count
#   #total      the errors that the run's last "File X has N errors." line counts, or 0 for
#               a clean check (above)
#   #locations  the distinct file:line those errors were reported at
#   #stopped    in place of #total and #locations, when that line counts errors that the
#               checker did not report: no api's check reported an error and the checker
#               never reached the component, so the library stopped at parse or name
#               binding, before the apis' check or between it and the component's. It names
#               the target, that line and the files the errors were reported in. The gate's
#               checker_compare reads a table with no #total row as NO TOTAL, red.
#   #crash      the first OverloadingChecker crash the checker survived, or none
#   #cache      whether the overloading checker's memo is on (it is off: above)
#   #shadow     whether the instrumented copy still matches the tracked StaticChecker
# test_run.py beside this script tests these readings on canned run outputs.
set -u

STOCK_SHA=16e6e11df9341a67038b7d7cc9f0d7bb5e5a6149019f09e92545a8b646363a0b   # ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java, 2026-09-22

OUT=${1:-}
if [ -z "$OUT" ] ; then echo "usage: $0 <out-file> [scratch-dir]" >&2 ; exit 1 ; fi
case "$OUT" in /*) ;; *) OUT="$PWD/$OUT" ;; esac
FH=${FORTRESS_HOME:-$PWD}
D="$FH/explorations/coordinator/tools/checker-count"
TARGET=Library/FortressLibrary.fss
SCRATCH=${2:-${TMPDIR:-/tmp}/checker-count.$$}
STOCK=$FH/ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java
OVERLOAD_CACHE=false     # the overloading checker's memo, off: see the header

mkdir -p "$SCRATCH/classes" "$SCRATCH/caches" "$(dirname "$OUT")" || exit 1
CP=$("$FH/bin/fortress_classpath" 2>/dev/null | tail -1)
if [ -z "$CP" ] ; then echo "checker-count: no classpath from bin/fortress_classpath" >&2 ; exit 1 ; fi

# 1. build the driver and the instrumented checker against the tree's own classpath
javac -nowarn -cp "$CP" -d "$SCRATCH/classes" \
      "$D/WorldFlip.java" "$D/shadow-src/com/sun/fortress/compiler/StaticChecker.java" \
      > "$SCRATCH/javac.txt" 2>&1
if [ $? -ne 0 ] ; then
    echo "checker-count: javac failed; see $SCRATCH/javac.txt" >&2 ; tail -20 "$SCRATCH/javac.txt" >&2 ; exit 1
fi

# 2. run the compiler phase order through the checker over the interpreter's library under a
#    private cache
( cd "$FH" && timeout -k 10 900 java -Xmx4g -Xss64m -Dfortress.caches="$SCRATCH/caches" \
       -Dfortress.analyzer.overload.cache=$OVERLOAD_CACHE \
       -cp "$SCRATCH/classes:$CP" WorldFlip -stop check "$TARGET" ) > "$SCRATCH/run.txt" 2>&1
RC=$?
# A clean check: the checker reached the component, and the run ended rc 0 with no error line.
CLEAN=
if [ "$RC" = 0 ] && grep -q '^@@PROBE checkComponent ' "$SCRATCH/run.txt" && grep -q '^### rc=0$' "$SCRATCH/run.txt" \
   && ! grep -q 'has [0-9]* errors\?\.$' "$SCRATCH/run.txt" ; then
    CLEAN=yes
fi
if [ -z "$CLEAN" ] && ! grep -q 'has [0-9]* errors\?\.$' "$SCRATCH/run.txt" ; then
    echo "checker-count: the run printed no error total (rc=$RC); see $SCRATCH/run.txt" >&2
    tail -20 "$SCRATCH/run.txt" >&2 ; exit 1
fi

# 3. the table. One row per api the checker named, its own error count as the
#    instrumented checker printed it; then the total, the number of distinct
#    file:line the errors were reported at, and the first crash the checker
#    survived. Rows are sorted so that two runs of the same tree are byte-equal.
#    A clean check's total and locations are 0.
#    The errors are the checker's when an api's check reported one or the checker
#    reached the component (TypeCheckPhase runs checkComponents only after checkApis
#    succeeds); otherwise they are a phase's before it, and #stopped takes the total's place.
APIS_CHECKED=$(grep -c '^@@PROBE checkApi .* -> errors=' "$SCRATCH/run.txt")
API_ERRORS=$(sed -n 's/^@@PROBE checkApi .* -> errors=\([0-9]*\)$/\1/p' "$SCRATCH/run.txt" | awk '{ n += $1 } END { print n + 0 }')
STOPPED=
if [ "$API_ERRORS" = 0 ] && ! grep -q '^@@PROBE checkComponent ' "$SCRATCH/run.txt" ; then
    AT=$(grep -oE '^/[^ ]+:[0-9]+:' "$SCRATCH/run.txt" | sed -E "s#^$FH/##; s#:[0-9].*##" | sort -u | paste -sd, - | sed 's/,/, /g')
    STOPPED="$TARGET stopped with errors that the checker did not report, from a phase before it such as parse, so the run measured no total: \"$(grep -E '^File .* has [0-9]+ errors?\.$' "$SCRATCH/run.txt" | tail -1)\", at ${AT:-no location}; the checker checked $APIS_CHECKED apis$( [ "$APIS_CHECKED" = 0 ] || echo ', with no error,') and no component"
fi
{
    printf '#api\terrors\n'
    grep '^@@PROBE checkApi .* -> errors=' "$SCRATCH/run.txt" \
        | sed -E 's/^@@PROBE checkApi ([^ ]+) -> errors=([0-9]+)$/\1\t\2/' | sort -u
    if [ -n "$CLEAN" ] ; then
        printf '#total\t0\n#locations\t0\n'
    elif [ -z "$STOPPED" ] ; then
        printf '#total\t%s\n' "$(grep -oE 'has [0-9]+ errors?\.$' "$SCRATCH/run.txt" | tail -1 | grep -oE '[0-9]+')"
        printf '#locations\t%s\n' "$(grep -oE '^/[^ ]+:[0-9]+:' "$SCRATCH/run.txt" | sort -u | wc -l | tr -d ' ')"
    else
        printf '#stopped\t%s\n' "$STOPPED"
    fi
    crash=$(grep -m1 '^@@PROBE OverloadingChecker CRASHED on ' "$SCRATCH/run.txt" | sed 's/^@@PROBE //')
    site=$(grep -m1 -A6 '^@@PROBE OverloadingChecker CRASHED on ' "$SCRATCH/run.txt" \
           | grep -oE '\([A-Za-z0-9_$]+\.(scala|java):[0-9]+\)' | grep -v '(NI\.java:' \
           | head -1 | tr -d '()')      # the first frame that is not the nyi helper itself
    printf '#crash\t%s\n' "${crash:-none}${site:+ at $site}"
    printf '#cache\toverloading memo %s (-Dfortress.analyzer.overload.cache=%s)\n' \
           "$( [ "$OVERLOAD_CACHE" = false ] && echo off || echo on )" "$OVERLOAD_CACHE"
    if [ "$(sha256sum < "$STOCK" | cut -d' ' -f1)" = "$STOCK_SHA" ] ; then
        printf '#shadow\tmatches the tracked StaticChecker\n'
    else
        printf '#shadow\tSTALE: ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java has changed since the copy was taken; refresh the copy and the checksum in run.sh\n'
    fi
} > "$OUT"

cat "$OUT"
echo "# checker-count: full output $SCRATCH/run.txt, rc=$RC"
[ -z "$STOPPED" ]
