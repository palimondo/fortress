#!/bin/bash
# The distance stage with the full overloading check and this probe's shadows: the gate's
# distance/run.sh, with the shadowed checker sources that shadow.py (beside this script)
# writes compiled by scalac and put ahead of everything on the run's class path. It is
# perf-probes/symbolic-operators-2/run-shadow.sh with that probe's shadow generator replaced
# by this one, which always applies the full check with crashes caught per name.
#
#     explorations/perf-probes/self-type-exclusion/run.sh <out-file> <scratch-dir> [selfexc] [bounds] [global]
#
# Run from $FORTRESS_HOME with the call set up as the fortress-repo skill says. With no
# word, it runs the full check alone (the earlier probe's full-catch). The scratch directory
# gets the shadow sources and classes, the copy of run.sh (whose one changed line puts
# $EXTRA_CP first on the java class path), and the run's own scratch (run.txt, errors.tsv)
# under <scratch-dir>/d.
set -u
OUT=${1:?usage: run.sh <out-file> <scratch-dir> [selfexc] [bounds] [global]}
SC=${2:?usage: run.sh <out-file> <scratch-dir> [selfexc] [bounds] [global]}
case "$SC" in /*) ;; *) SC="$PWD/$SC" ;; esac
FH=${FORTRESS_HOME:-$PWD}
P="$FH/explorations/perf-probes/self-type-exclusion"
mkdir -p "$SC/ocsrc" "$SC/occlasses" || exit 1
rm -f "$SC"/ocsrc/*.scala
rm -rf "$SC/occlasses"/*
python3 "$P/shadow.py" "$FH" "$SC/ocsrc" "${@:3}" || exit 1
CP=$("$FH/bin/fortress_classpath" | tail -1)
java -cp "$CP" scala.tools.nsc.Main -nowarn -classpath "$CP" -d "$SC/occlasses" -encoding UTF-8 \
     "$SC"/ocsrc/*.scala || { echo "run: scalac failed" >&2 ; exit 1 ; }
sed 's#-cp "\$SCRATCH/shadow-classes:#-cp "${EXTRA_CP:+$EXTRA_CP:}$SCRATCH/shadow-classes:#' \
    "$FH/explorations/coordinator/tools/distance/run.sh" > "$SC/run.sh"
grep -q 'EXTRA_CP' "$SC/run.sh" || { echo "run: run.sh's class path line moved" >&2 ; exit 1 ; }
# run.sh finds its helpers through $FORTRESS_HOME, so the copy may live anywhere
EXTRA_CP="$SC/occlasses" bash "$SC/run.sh" "$OUT" "$SC/d"
