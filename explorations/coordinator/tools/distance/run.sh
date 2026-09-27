#!/bin/bash
# The gate's distance stage: the compiled checker over the whole interpreter library, the
# twelve prelude apis and their twelve components, every stage of every unit run whatever
# the earlier stages reported, so that nothing hides behind an early return; one table.
#
# Why it exists: Pavol's answer 11 (POSITIONS.md, 2026-09-26): the full measurement of the
# distance to the switch-over "becomes a report-only stage of phase 3's gates, whose job is
# driving it down". The checker-count stage beside it (../checker-count/run.sh) sees only
# the errors before each api's early return, 62 of about 1,740 on 2026-09-27.
#
# Run from $FORTRESS_HOME with explorations/experiment/env.sh sourced, after ant compileAll:
#
#     explorations/coordinator/tools/distance/run.sh <out-file> [scratch-dir] [setting]
#
# It writes the table to <out-file> and prints it. Nothing in the tree is touched: the
# shadow sources and classes, the driver, the checker's caches (-Dfortress.caches) and the
# JVM's temporary directory (so Rats! leaves nothing in /tmp) go to the scratch directory
# (default: $TMPDIR or /tmp), and the caches are deleted at the end. It never removes
# /tmp/fortress*rats, which other runs on the machine use. Exit 0 if the table was
# produced, 1 if it could not be. One JVM, -Xmx4g, one busy core: 789 s on the idle 4-CPU
# container on 2026-09-27, 14 to 24 minutes under load 7 to 18 (switch-over-distance-flat.md
# section 5); the table's #seconds and #machine rows say what each run took and where.
#
# The setting: "any" by default, the compiled path with the implicit bound Any
# (DistanceMulti's -setting any: the extends-Object pre-desugaring off, as walk's, and the
# compiled-expression desugaring on, as the compile path's). Answer 11 names the compile
# path's setting; batch 7's question 1, answered (a) on 2026-09-27 (POSITIONS.md, the
# numerics plans), bounds an unbounded type parameter by Any, and under it the switch-over
# takes that bound for the compiled path (CLIMB-BATCH-7.md section 1, Q1), so the 372
# "bound Object" errors of the plain compile setting are the setting's, not the library's
# (switch-over-distance-flat.md sections 2.7 and 5: "under (a) the stage runs stage-any").
# On the tree of 2026-09-27 it differs from walk's setting by the compiled-expression
# desugaring's 12 abstract-method errors on bodyless functions, one export error and the
# variance checker's crash on Stream: 1,746 to 1,747 against 1,737 to 1,738 (FACTS.md,
# "The true distance to the switch-over"). The third argument, walk or compile, runs
# another setting, for a comparison with the measurements on file; the gate never passes it.
#
# The overloading checker's memo is off (-Dfortress.analyzer.overload.cache=false), as in
# every run of the measurement: keyed on declaration pairs, it hides 27 to 35 errors
# depending on the build order (FACTS.md, "The hidden layer, classified").
#
# The sources beside this script are copies, taken 2026-09-27, so that the gate does not
# depend on a probe directory, as the checker-count stage's were: DistanceMulti.java from
# perf-probes/prelude/switch-over-distance-flat/ (35ef70584); shadow-patch.py from
# perf-probes/prelude/desugar-codegen/ (e5d8cdbd2); add-patch.py and errors.py from
# perf-probes/prelude/switch-over-distance/ (a7e3df9ad, 14d2f9839); classify.py from
# perf-probes/prelude/distance-triage/ (e17a9badc); all unchanged. table.py is new: it
# counts as those scripts count and prints the rows below. The shadow classes are not
# copies: they are made from the tracked sources at every run by text edits that must each
# match exactly once (shadow-patch.py, add-patch.py), so there is no copied checker to go
# stale silently; an edit that no longer matches stops the run before the checker starts,
# and the table then says so in its #shadow row, with no counts.
#
# The table, tab-separated, every row tagged:
#   #distance   the setting, the switches and the twelve targets
#   #total      distinct errors
#   #kind       by kind (errors.py): exclusion, comprises, overloading, return-type, ...
#   #class      by root cause (classify.py, distance-triage.md section 2), with its name
#   #unit       by the unit that printed the error first
#   #crash      each declaration, stage or target the checker crashed on
#   #seconds    the run's wall time, and FortressLibrary's, the part that takes it
#   #machine    nproc, CPU model and MHz, load at start, JDK, FORTRESS_THREADS
#   #shadow     whether every shadow edit matched the tracked sources; the last row
# ../distance/compare.sh compares two tables. The run-to-run variation is 2 to 4 errors,
# in the comparisons' and Maybe's pairs and the joins of array bodies (switch-over-
# distance-flat.md section 5).
set -u

OUT=${1:-}
if [ -z "$OUT" ] ; then echo "usage: $0 <out-file> [scratch-dir] [any|walk|compile]" >&2 ; exit 1 ; fi
case "$OUT" in /*) ;; *) OUT="$PWD/$OUT" ;; esac
FH=${FORTRESS_HOME:-$PWD}
D="$FH/explorations/coordinator/tools/distance"
SCRATCH=${2:-${TMPDIR:-/tmp}/distance.$$}
case "$SCRATCH" in /*) ;; *) SCRATCH="$PWD/$SCRATCH" ;; esac
SETTING=${3:-any}
case "$SETTING" in any|walk|compile) ;; *) echo "distance: unknown setting $SETTING" >&2 ; exit 1 ;; esac
FLAGS="-Dprobe.tolerant=true -Dprobe.all=true -Dfortress.analyzer.overload.cache=false"
COMPONENTS="Library/FortressLibrary.fss Library/RangeInternals.fss ProjectFortress/LibraryBuiltin/FortressBuiltin.fss
 ProjectFortress/LibraryBuiltin/NativeArray.fss Library/List.fss Library/String.fss Library/FlatString.fss Library/Stream.fss
 ProjectFortress/LibraryBuiltin/NatReflect.fss Library/TypeProxy.fss Library/Writer.fss ProjectFortress/LibraryBuiltin/AnyType.fss"

rm -rf "$SCRATCH/shadow-src" "$SCRATCH/shadow-classes" "$SCRATCH/classes" "$SCRATCH/caches" "$SCRATCH/tmp"
mkdir -p "$SCRATCH/shadow-src" "$SCRATCH/shadow-classes" "$SCRATCH/classes" "$SCRATCH/caches" "$SCRATCH/tmp" \
         "$(dirname "$OUT")" || exit 1
CP=$("$FH/bin/fortress_classpath" 2>/dev/null | tail -1 | sed 's#:[^:]*/default_repository/caches/bytecode_cache##')
if [ -z "$CP" ] ; then echo "distance: no classpath from bin/fortress_classpath" >&2 ; exit 1 ; fi
MACHINE="nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/^[^:]*: *//'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/^[^:]*: *//') MHz; load at start $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=${FORTRESS_THREADS:-unset}"

# 1. the shadows, from the tracked sources (perf-probes/prelude/switch-over-distance/make-shadows.sh's
#    steps), and the driver; a text edit that no longer matches is the one way this can go stale
SHADOW="every shadow edit matched the tracked sources"
if ! ( cd "$FH" && python3 "$D/shadow-patch.py" ProjectFortress/src/com/sun/fortress "$SCRATCH/shadow-src" \
                && python3 "$D/add-patch.py" "$SCRATCH/shadow-src" ) > "$SCRATCH/shadows.txt" 2>&1 ; then
    SHADOW="STALE: a shadow edit no longer matches the tracked sources: $(grep -E '^AssertionError' "$SCRATCH/shadows.txt" | tail -1 | tr -s ' ' | cut -c1-200); see $SCRATCH/shadows.txt"
elif ! javac -nowarn -encoding UTF-8 -cp "$CP" -d "$SCRATCH/shadow-classes" \
        "$SCRATCH/shadow-src/com/sun/fortress/compiler/StaticChecker.java" \
        "$SCRATCH/shadow-src/com/sun/fortress/compiler/phases/TypeCheckPhase.java" \
        "$SCRATCH/shadow-src/com/sun/fortress/compiler/phases/DesugarPhase.java" \
        "$SCRATCH/shadow-src/com/sun/fortress/compiler/phases/CodeGenerationPhase.java" \
        "$SCRATCH/shadow-src/com/sun/fortress/compiler/codegen/CodeGen.java" \
        "$SCRATCH/shadow-src/com/sun/fortress/compiler/Desugarer.java" \
        "$SCRATCH/shadow-src/com/sun/fortress/nodes_util/NodeComparator.java" >> "$SCRATCH/shadows.txt" 2>&1 ; then
    SHADOW="STALE: the shadow sources no longer compile against the tree; see $SCRATCH/shadows.txt"
elif ! javac -nowarn -cp "$CP" -d "$SCRATCH/classes" "$D/DistanceMulti.java" >> "$SCRATCH/shadows.txt" 2>&1 ; then
    SHADOW="STALE: DistanceMulti.java no longer compiles against the tree; see $SCRATCH/shadows.txt"
fi

# 2. the run: one JVM, the twelve components, FortressLibrary first so that its run checks
#    the twelve apis with every stage (DistanceMulti.java's header)
RC=
case "$SHADOW" in
  STALE*) : > "$SCRATCH/run.txt" ;;
  *) S=$(date +%s)
     ( cd "$FH" && timeout -k 30 5400 java -Xmx4g -Xss64m -XX:-OmitStackTraceInFastThrow \
           -Djava.io.tmpdir="$SCRATCH/tmp" -Dfortress.caches="$SCRATCH/caches" $FLAGS \
           -cp "$SCRATCH/shadow-classes:$SCRATCH/classes:$CP" DistanceMulti -order check -setting "$SETTING" $COMPONENTS
     ) > "$SCRATCH/run.txt" 2>&1
     RC=$? ; ELAPSED=$(( $(date +%s) - S ))
     rm -rf "$SCRATCH/caches" "$SCRATCH/tmp" ;;
esac

# 3. the table. errors.py's tally and its one-row-per-error list stay in the scratch
#    directory for whoever needs the sites (compare-sites, the review); table.py's rows go
#    into the table, and their total is checked against errors.py's own count.
{
    printf '#distance\tsetting %s; %s; %s\n' "$SETTING" "$FLAGS" "$(echo $COMPONENTS | wc -w) components in one JVM (DistanceMulti -order check)"
    if grep -q '^### all seconds=' "$SCRATCH/run.txt" ; then
        python3 -B "$D/table.py" "$SCRATCH/run.txt" > "$SCRATCH/rows.txt" 2>&1
        cat "$SCRATCH/rows.txt"
        python3 "$D/errors.py" "$SCRATCH/errors.tsv" "$SCRATCH/run.txt" > "$SCRATCH/tally.txt" 2>&1
        E=$(sed -n 's/^# \([0-9]*\) distinct errors.*/\1/p' "$SCRATCH/tally.txt")
        T=$(awk -F'\t' '$1 == "#total" { print $2 }' "$SCRATCH/rows.txt")
        [ "$E" = "$T" ] || printf '#check\terrors.py counts %s, table.py %s: the two normalisations differ on this run; see %s\n' "$E" "$T" "$SCRATCH/tally.txt"
        printf '#seconds\t%s\tFortressLibrary %s\n' "${ELAPSED:-?}" "$(sed -n 's/^### done Library\/FortressLibrary.fss rc=[0-9]* seconds=\([0-9]*\)$/\1/p' "$SCRATCH/run.txt")"
    else
        case "$SHADOW" in
          STALE*) printf '#total\tnone: the checker did not run\n' ;;
          *) printf '#total\tnone: the run ended without its last line (rc=%s); see %s\n' "${RC:-?}" "$SCRATCH/run.txt" ;;
        esac
    fi
    printf '#machine\t%s\n' "$MACHINE"
    printf '#shadow\t%s\n' "$SHADOW"
} > "$OUT"

cat "$OUT"
echo "# distance: full output $SCRATCH/run.txt, rc=${RC:-not run}; errors.py's tally $SCRATCH/tally.txt"
grep -q '^#total	[0-9]' "$OUT"
