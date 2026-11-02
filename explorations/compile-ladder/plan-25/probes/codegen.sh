#!/bin/bash
# codegen.sh <out-dir>: the code generator over the one library's components, declaration by declaration, on the
# tree at $FORTRESS_HOME (climb batch 25's planner), made from the probe of 2026-10-23
# (perf-probes/codegen-distance/REPORT.md, sections 1 and 3, whose run.sh and classify2.py were not kept): the
# distance stage's own shadows, made from the tracked sources at this run (tools/distance/shadow-patch.py and
# add-patch.py), and its driver, DistanceMulti, run with -order full (every compiler phase, code generation among
# them) and -setting compile, the compile command's own setting, which the distance stage runs (its run.sh), over
# the stage's fourteen components in its order. The report's flags: -Dprobe.tolerant=true (the checker checks each
# declaration apart and its errors stop nothing; code generation catches each declaration's failure),
# -Dprobe.bottomCompare=true, -Dprobe.skipOverloads=true (no dispatch methods), the overloading memo off.
# Writes <out-dir>/run.txt and prints the classified table (cgkinds.py). One JVM, -Xmx4g; about 200 s on an idle box.
set -u
O=$(mkdir -p "$1" && cd "$1" && pwd)
FH=${FORTRESS_HOME:-$PWD}
D="$FH/explorations/coordinator/tools/distance"
HERE=$(cd "$(dirname "$0")" && pwd)
COMPONENTS="Library/FortressLibrary.fss Library/RangeInternals.fss ProjectFortress/LibraryBuiltin/FortressBuiltin.fss
 ProjectFortress/LibraryBuiltin/NativeArray.fss Library/List.fss Library/String.fss Library/FlatString.fss Library/Stream.fss
 ProjectFortress/LibraryBuiltin/NatReflect.fss Library/TypeProxy.fss Library/Writer.fss ProjectFortress/LibraryBuiltin/AnyType.fss
 Library/CovariantCollection.fss Library/OneShotFlag.fss"
rm -rf "$O/shadow-src" "$O/shadow-classes" "$O/classes" "$O/caches" "$O/tmp"
mkdir -p "$O/shadow-src" "$O/shadow-classes" "$O/classes" "$O/caches" "$O/tmp"
CP=$("$FH/bin/fortress_classpath" 2>/dev/null | tail -1 | sed 's#:[^:]*/default_repository/caches/bytecode_cache##')
( cd "$FH" && python3 "$D/shadow-patch.py" ProjectFortress/src/com/sun/fortress "$O/shadow-src" \
           && python3 "$D/add-patch.py" "$O/shadow-src" ) > "$O/shadows.txt" 2>&1 || { echo "shadows stale"; exit 1; }
javac -nowarn -encoding UTF-8 -cp "$CP" -d "$O/shadow-classes" \
    "$O/shadow-src/com/sun/fortress/compiler/StaticChecker.java" \
    "$O/shadow-src/com/sun/fortress/compiler/phases/TypeCheckPhase.java" \
    "$O/shadow-src/com/sun/fortress/compiler/phases/DesugarPhase.java" \
    "$O/shadow-src/com/sun/fortress/compiler/phases/CodeGenerationPhase.java" \
    "$O/shadow-src/com/sun/fortress/compiler/codegen/CodeGen.java" \
    "$O/shadow-src/com/sun/fortress/compiler/Desugarer.java" \
    "$O/shadow-src/com/sun/fortress/nodes_util/NodeComparator.java" >> "$O/shadows.txt" 2>&1 || { echo "shadows do not compile"; exit 1; }
javac -nowarn -cp "$CP" -d "$O/classes" "$D/DistanceMulti.java" >> "$O/shadows.txt" 2>&1 || exit 1
S=$(date +%s)
( cd "$FH" && timeout -k 30 5400 java -Xmx4g -Xss64m -XX:-OmitStackTraceInFastThrow \
      -Djava.io.tmpdir="$O/tmp" -Dfortress.caches="$O/caches" \
      -Dprobe.tolerant=true -Dprobe.bottomCompare=true -Dprobe.skipOverloads=true -Dfortress.analyzer.overload.cache=false \
      -cp "$O/shadow-classes:$O/classes:$CP" DistanceMulti -order full -setting compile $COMPONENTS ) > "$O/run.txt" 2>&1
echo "rc=$? seconds=$(( $(date +%s) - S ))" >> "$O/run.txt"
rm -rf "$O/caches" "$O/tmp"
python3 -B "$HERE/cgkinds.py" "$O/run.txt"
