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
# Run from $FORTRESS_HOME with experiment/env.sh sourced, after ant compileAll:
#
#     explorations/coordinator/tools/checker-count/run.sh <out-file> [scratch-dir]
#
# It writes the table to <out-file> and prints it. Nothing in the tree is touched:
# javac output and the checker's caches go to the scratch directory (default: $TMPDIR
# or /tmp), and the caches are given to the JVM as -Dfortress.caches, honoured through
# ProjectProperties.java:261-269,283, so default_repository/ is never read or written.
# Exit 0 if the table was produced, 1 if it could not be. 20 s in the main tree,
# measured 2026-09-22; it needs no library rebuild and no warm cache.
#
# The two sources beside this script are copies, taken 2026-09-22 from
# explorations/perf-probes/prelude/, so that the gate does not depend on a probe
# directory: WorldFlip.java (Shell.useInterpreterLibraries() plus
# PhaseOrder.compilerPhaseOrder, both public, which is the world switch without an edit
# to a tracked file) and shadow-src/.../StaticChecker.java, a copy of
# ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java with three
# instrumentation points added: it names each compilation unit it checks and prints that
# unit's error count, and it catches the OverloadingChecker crash instead of dying on it.
# It is put AHEAD of ProjectFortress/build on the classpath, the technique of
# perf-probes/prelude/run-all.sh:33-35. A copy of a tracked source goes stale silently,
# so the checksum of the tracked one is recorded here and the table's "#shadow" line
# says whether it still matches.
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

# 2. run the compiler phase order over the interpreter's library under a private cache
( cd "$FH" && timeout -k 10 900 java -Xmx4g -Xss64m -Dfortress.caches="$SCRATCH/caches" \
       -cp "$SCRATCH/classes:$CP" WorldFlip "$TARGET" ) > "$SCRATCH/run.txt" 2>&1
RC=$?
if ! grep -q 'has [0-9]* errors\?\.$' "$SCRATCH/run.txt" ; then
    echo "checker-count: the run printed no error total (rc=$RC); see $SCRATCH/run.txt" >&2
    tail -20 "$SCRATCH/run.txt" >&2 ; exit 1
fi

# 3. the table. One row per api the checker named, its own error count as the
#    instrumented checker printed it; then the total, the number of distinct
#    file:line the errors were reported at, and the first crash the checker
#    survived. Rows are sorted so that two runs of the same tree are byte-equal.
{
    printf '#api\terrors\n'
    grep '^@@PROBE checkApi .* -> errors=' "$SCRATCH/run.txt" \
        | sed -E 's/^@@PROBE checkApi ([^ ]+) -> errors=([0-9]+)$/\1\t\2/' | sort -u
    printf '#total\t%s\n' "$(grep -oE 'has [0-9]+ errors?\.$' "$SCRATCH/run.txt" | tail -1 | grep -oE '[0-9]+')"
    printf '#locations\t%s\n' "$(grep -oE '^/[^ ]+:[0-9]+:' "$SCRATCH/run.txt" | sort -u | wc -l | tr -d ' ')"
    crash=$(grep -m1 '^@@PROBE OverloadingChecker CRASHED on ' "$SCRATCH/run.txt" | sed 's/^@@PROBE //')
    site=$(grep -m1 -A6 '^@@PROBE OverloadingChecker CRASHED on ' "$SCRATCH/run.txt" \
           | grep -oE '\([A-Za-z0-9_$]+\.(scala|java):[0-9]+\)' | grep -v '(NI\.java:' \
           | head -1 | tr -d '()')      # the first frame that is not the nyi helper itself
    printf '#crash\t%s\n' "${crash:-none}${site:+ at $site}"
    if [ "$(sha256sum < "$STOCK" | cut -d' ' -f1)" = "$STOCK_SHA" ] ; then
        printf '#shadow\tmatches the tracked StaticChecker\n'
    else
        printf '#shadow\tSTALE: ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java has changed since the copy was taken; refresh the copy and the checksum in run.sh\n'
    fi
} > "$OUT"

cat "$OUT"
echo "# checker-count: full output $SCRATCH/run.txt, rc=$RC"
