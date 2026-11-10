#!/bin/bash
# The plan review's probe of 2026-11-10: the compiled checker, by the distance stage's own
# driver and shadows (explorations/coordinator/tools/distance/), over components that the
# stage does not list, against the one library.  Run in a seeded worktree, never in the main
# tree or a base build, with the fortress-repo skill's setup lines in the shell:
#
#     run.sh <check|full> <out-dir> <dir to run in> <targets...>
#
# The first target should be Library/FortressLibrary.fss, by its absolute path, so that the
# library's apis are checked once with every stage; each later target is checked with its
# component only.  <out-dir>/run.txt holds the driver's whole output: one "@@SC ERR" line
# for each error, "@@TC COMPONENT name errors=N" for each target (N counts an error once for
# each stage that reports it), and with "full" one "@@CG OK|FAIL|PREFAIL" line for each
# declaration that the code generator met.  Nothing in the tree is written: the shadows, the
# caches and the JVM's temporary folder are under <tree>/tmp and <out-dir>.
set -u
ORDER=$1; OUT=$2; CWD=$3; shift 3
FH=${FORTRESS_HOME:?set FORTRESS_HOME to the worktree}
D=$FH/explorations/coordinator/tools/distance
S=$FH/tmp/model-closure-shadows
mkdir -p "$S/shadow-src" "$S/shadow-classes" "$S/classes" "$OUT/caches" "$OUT/tmp"
CP=$("$FH/bin/fortress_classpath" 2>/dev/null | tail -1 | sed 's#:[^:]*/default_repository/caches/bytecode_cache##')
if [ ! -f "$S/classes/DistanceMulti.class" ]; then
  ( cd "$FH" && python3 "$D/shadow-patch.py" ProjectFortress/src/com/sun/fortress "$S/shadow-src" \
             && python3 "$D/add-patch.py" "$S/shadow-src" ) > "$S/shadows.txt" 2>&1 || { echo "a shadow edit no longer matches; see $S/shadows.txt"; exit 1; }
  F=$S/shadow-src/com/sun/fortress
  javac -nowarn -encoding UTF-8 -cp "$CP" -d "$S/shadow-classes" "$F/compiler/StaticChecker.java" \
        "$F/compiler/phases/TypeCheckPhase.java" "$F/compiler/phases/DesugarPhase.java" \
        "$F/compiler/phases/CodeGenerationPhase.java" "$F/compiler/codegen/CodeGen.java" \
        "$F/compiler/Desugarer.java" "$F/nodes_util/NodeComparator.java" >> "$S/shadows.txt" 2>&1 || { echo "the shadows do not compile; see $S/shadows.txt"; exit 1; }
  javac -nowarn -cp "$CP" -d "$S/classes" "$D/DistanceMulti.java" >> "$S/shadows.txt" 2>&1 || { echo "the driver does not compile"; exit 1; }
fi
FLAGS="-Dprobe.tolerant=true -Dprobe.all=true -Dfortress.analyzer.overload.cache=false"
[ "$ORDER" = full ] && FLAGS="$FLAGS -Dprobe.bottomCompare=true -Dprobe.skipOverloads=true -Dprobe.dumpErrors=true"
cut -d' ' -f1-3 /proc/loadavg > "$OUT/load.txt"
( cd "$CWD" && timeout -k 30 3000 java -Xmx4g -Xss64m -XX:-OmitStackTraceInFastThrow -Djava.io.tmpdir="$OUT/tmp" \
      -Dfortress.caches="$OUT/caches" $FLAGS -cp "$S/shadow-classes:$S/classes:$CP" DistanceMulti -order "$ORDER" -setting any "$@" ) > "$OUT/run.txt" 2>&1
echo "rc=$?" >> "$OUT/run.txt"
rm -rf "$OUT/caches" "$OUT/tmp"
grep '^### \|@@TC COMPONENT' "$OUT/run.txt" | cut -c1-160
