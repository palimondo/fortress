#!/bin/bash
# The distance stage's checker (explorations/coordinator/tools/distance/run.sh, setting
# "any") over small components that import the interpreter library, in seconds to a few
# minutes instead of the stage's half hour: the apis are not checked with every stage
# (probe.componentOnly), so only the named components' bodies are. It shows a crash or an
# error of a library body copied into a component of its own, as Array3AsStringProbe.fss
# shows row 680. Run from the tree's root, after ant compileAll:
#
#     explorations/perf-probes/checker-bound-defects/mini-distance.sh <scratch-dir> <file.fss>...
#
# The first call builds the stage's shadow classes into <scratch-dir> (run.sh's step 1);
# later calls reuse them, so remove <scratch-dir> after an edit of the checker. Each
# component's result is a line per declaration: @@TC DECL-OK, DECL-ERR or DECL-CRASH.
set -u
S=${1:?usage: mini-distance.sh <scratch-dir> <file.fss>...}; shift
case "$S" in /*) ;; *) S="$PWD/$S" ;; esac
FH=${FORTRESS_HOME:-$PWD}
D="$FH/explorations/coordinator/tools/distance"
CP=$("$FH/bin/fortress_classpath" 2>/dev/null | tail -1 | sed 's#:[^:]*/default_repository/caches/bytecode_cache##')
if [ ! -f "$S/classes/DistanceMulti.class" ] ; then
    rm -rf "$S/shadow-src" "$S/shadow-classes" "$S/classes"
    mkdir -p "$S/shadow-src" "$S/shadow-classes" "$S/classes"
    ( cd "$FH" && python3 "$D/shadow-patch.py" ProjectFortress/src/com/sun/fortress "$S/shadow-src" \
               && python3 "$D/add-patch.py" "$S/shadow-src" ) > "$S/shadows.txt" 2>&1 || { echo "shadow edits stale: $S/shadows.txt" ; exit 1 ; }
    javac -nowarn -encoding UTF-8 -cp "$CP" -d "$S/shadow-classes" \
        "$S/shadow-src/com/sun/fortress/compiler/StaticChecker.java" \
        "$S/shadow-src/com/sun/fortress/compiler/phases/TypeCheckPhase.java" \
        "$S/shadow-src/com/sun/fortress/compiler/phases/DesugarPhase.java" \
        "$S/shadow-src/com/sun/fortress/compiler/phases/CodeGenerationPhase.java" \
        "$S/shadow-src/com/sun/fortress/compiler/codegen/CodeGen.java" \
        "$S/shadow-src/com/sun/fortress/compiler/Desugarer.java" \
        "$S/shadow-src/com/sun/fortress/nodes_util/NodeComparator.java" >> "$S/shadows.txt" 2>&1 \
      && javac -nowarn -cp "$CP" -d "$S/classes" "$D/DistanceMulti.java" >> "$S/shadows.txt" 2>&1 \
      || { echo "shadow classes did not compile: $S/shadows.txt" ; exit 1 ; }
fi
rm -rf "$S/caches" "$S/tmp" ; mkdir -p "$S/caches" "$S/tmp"
( cd "$FH" && timeout -k 30 3600 java -Xmx4g -Xss64m -XX:-OmitStackTraceInFastThrow \
      -Djava.io.tmpdir="$S/tmp" -Dfortress.caches="$S/caches" \
      -Dprobe.tolerant=true -Dprobe.all=true -Dprobe.componentOnly=true -Dfortress.analyzer.overload.cache=false \
      -cp "$S/shadow-classes:$S/classes:$CP" DistanceMulti -order check -setting any "$@" )
