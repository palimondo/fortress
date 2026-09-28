#!/bin/bash
# extra-components.sh <out-file> <scratch-dir> <setting> <component.fss>...: the gate's distance stage
# (explorations/coordinator/tools/distance/run.sh, copied 2026-09-27 at ff1649cea) with its twelve targets
# replaced by the components named, for the library components outside the twelve that instantiate
# List's nullary comprehension operator (REPORT.md section 6). Same shadows, flags, table and cleanup;
# the first component named is checked with every api stage, as the stage's first target is.
set -u

OUT=${1:-}
if [ -z "$OUT" ] ; then echo "usage: $0 <out-file> [scratch-dir] [any|walk|compile]" >&2 ; exit 1 ; fi
case "$OUT" in /*) ;; *) OUT="$PWD/$OUT" ;; esac
FH=${FORTRESS_HOME:-$PWD}
D="$FH/explorations/coordinator/tools/distance"   # the stage's own helper scripts
SCRATCH=${2:-${TMPDIR:-/tmp}/distance.$$}
case "$SCRATCH" in /*) ;; *) SCRATCH="$PWD/$SCRATCH" ;; esac
SETTING=${3:-any}
shift 3 2>/dev/null || true
case "$SETTING" in any|walk|compile) ;; *) echo "distance: unknown setting $SETTING" >&2 ; exit 1 ;; esac
FLAGS="-Dprobe.tolerant=true -Dprobe.all=true -Dfortress.analyzer.overload.cache=false"
COMPONENTS="$*"

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
