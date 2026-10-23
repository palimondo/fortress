#!/bin/bash
# The count stage with this probe's shadows: the gate's checker-count/run.sh, with the
# shadowed checker sources that shadow.py (beside this script) writes compiled by scalac
# and put ahead of everything on the run's class path.
#
#     explorations/perf-probes/self-type-exclusion/count.sh <out-file> <scratch-dir> plain
#     explorations/perf-probes/self-type-exclusion/count.sh <out-file> <scratch-dir> full [selfexc] [bounds] [global]
#
# Run from $FORTRESS_HOME with the call set up as the fortress-repo skill says. `plain` runs
# the stage as the gate does, with no shadow; `full` adds the full symbolic-operator check
# with crashes caught per name, and the other words the probe's shadows. The scratch
# directory gets the shadow sources and classes, the copy of run.sh (whose one changed line
# puts $EXTRA_CP first on the java class path), and the stage's own scratch under
# <scratch-dir>/d.
set -u
OUT=${1:?usage: count.sh <out-file> <scratch-dir> plain|full [selfexc] [bounds] [global]}
SC=${2:?usage: count.sh <out-file> <scratch-dir> plain|full [selfexc] [bounds] [global]}
MODE=${3:?usage: count.sh <out-file> <scratch-dir> plain|full [selfexc] [bounds] [global]}
case "$SC" in /*) ;; *) SC="$PWD/$SC" ;; esac
FH=${FORTRESS_HOME:-$PWD}
P="$FH/explorations/perf-probes/self-type-exclusion"
mkdir -p "$SC/ocsrc" "$SC/occlasses" || exit 1
rm -f "$SC"/ocsrc/*.scala
rm -rf "$SC/occlasses"/*
EXTRA=
if [ "$MODE" != plain ] ; then
    python3 "$P/shadow.py" "$FH" "$SC/ocsrc" "${@:4}" || exit 1
    CP=$("$FH/bin/fortress_classpath" | tail -1)
    java -cp "$CP" scala.tools.nsc.Main -nowarn -classpath "$CP" -d "$SC/occlasses" -encoding UTF-8 \
         "$SC"/ocsrc/*.scala || { echo "count: scalac failed" >&2 ; exit 1 ; }
    EXTRA="$SC/occlasses"
fi
sed 's#-cp "\$SCRATCH/classes:\$CP"#-cp "${EXTRA_CP:+$EXTRA_CP:}$SCRATCH/classes:$CP"#' \
    "$FH/explorations/coordinator/tools/checker-count/run.sh" > "$SC/run.sh"
grep -q 'EXTRA_CP' "$SC/run.sh" || { echo "count: run.sh's class path line moved" >&2 ; exit 1 ; }
# run.sh finds its helpers through $FORTRESS_HOME, so the copy may live anywhere
EXTRA_CP="$EXTRA" bash "$SC/run.sh" "$OUT" "$SC/d"
