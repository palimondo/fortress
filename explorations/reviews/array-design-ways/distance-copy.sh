#!/bin/bash
# distance-copy.sh <scratch> <variant> : the gate's distance stage (explorations/coordinator/tools/distance/run.sh,
# setting any, one JVM) over a copy of the library made by lib-variants.py, the twelve targets read from the copy
# so that it shadows the tree's (perf-probes/prelude/distance-triage/run.sh's step `lib`/`stage`).  Writes
# <scratch>/<variant>.table (the gate's table: kinds, classes, units, crashes) and <scratch>/<variant>.errors.tsv,
# and copies the table and the classified list of the array classes (V1, V2, Z1) beside this script under
# captures/.  Variant L0 is the unchanged copy.  Never removes /tmp/fortress*rats.
set -u
H=${FORTRESS_HOME:?source an env with FORTRESS_HOME}; cd "$H"
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH=/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH
export FORTRESS_THREADS=${FORTRESS_THREADS:-1}; unset JAVA_TOOL_OPTIONS
HERE=$H/explorations/reviews/array-design-ways; T=$H/explorations/coordinator/tools/distance
W=${1:?scratch}; V=${2:?variant}; mkdir -p "$W"; W=$(cd "$W" && pwd)
L=$W/libs/$V; S=$W/run-$V
rm -rf "$L" "$S"; mkdir -p "$L" "$S/shadow-src" "$S/shadow-classes" "$S/classes" "$S/caches" "$S/tmp" "$HERE/captures"
cp Library/*.fsi Library/*.fss ProjectFortress/LibraryBuiltin/*.fsi ProjectFortress/LibraryBuiltin/*.fss "$L/"
[ "$V" = L0 ] || python3 "$HERE/lib-variants.py" "$L" "$V" || exit 1
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1 | sed 's#:[^:]*/default_repository/caches/bytecode_cache##')
python3 "$T/shadow-patch.py" ProjectFortress/src/com/sun/fortress "$S/shadow-src" > "$S/shadows.txt" 2>&1 &&
python3 "$T/add-patch.py" "$S/shadow-src" >> "$S/shadows.txt" 2>&1 || { echo "shadow edit did not match"; exit 1; }
X=$S/shadow-src/com/sun/fortress
javac -nowarn -encoding UTF-8 -cp "$CP" -d "$S/shadow-classes" $X/compiler/StaticChecker.java $X/compiler/phases/TypeCheckPhase.java \
   $X/compiler/phases/DesugarPhase.java $X/compiler/phases/CodeGenerationPhase.java $X/compiler/codegen/CodeGen.java \
   $X/compiler/Desugarer.java $X/nodes_util/NodeComparator.java >> "$S/shadows.txt" 2>&1 || exit 1
javac -nowarn -cp "$CP" -d "$S/classes" "$T/DistanceMulti.java" >> "$S/shadows.txt" 2>&1 || exit 1
C=""; for c in FortressLibrary RangeInternals FortressBuiltin NativeArray List String FlatString Stream NatReflect TypeProxy Writer AnyType; do C="$C $L/$c.fss"; done
MACHINE="nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/^[^:]*: *//'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/^[^:]*: *//') MHz; load at start $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS; tree $(git rev-parse --short HEAD)"
ST=$(date +%s)
timeout -k 30 5400 java -Xmx4g -Xss64m -XX:-OmitStackTraceInFastThrow -Djava.io.tmpdir="$S/tmp" -Dfortress.caches="$S/caches" \
   -Dprobe.tolerant=true -Dprobe.all=true -Dfortress.analyzer.overload.cache=false \
   -cp "$S/shadow-classes:$S/classes:$CP" DistanceMulti -order check -setting any $C > "$S/run.txt" 2>&1
RC=$?; EL=$(( $(date +%s) - ST )); rm -rf "$S/caches" "$S/tmp"
{ printf '#distance\tvariant %s; setting any; library copy read as the twelve targets\n' "$V"
  if grep -q '^### all seconds=' "$S/run.txt"; then python3 -B "$T/table.py" "$S/run.txt"; else printf '#total\tnone: rc=%s, the run did not end\n' "$RC"; fi
  printf '#seconds\t%s\n#machine\t%s\n' "$EL" "$MACHINE"; } > "$W/$V.table"
python3 "$T/errors.py" "$W/$V.errors.tsv" "$S/run.txt" > "$W/$V.tally.txt" 2>&1
cp "$W/$V.table" "$HERE/captures/distance-$V.table"
# the classified list, the array classes only (classify.py -v over errors.py's list)
tail -n +2 "$W/$V.errors.tsv" | cut -f1,2,5,6,7 > "$W/$V.full.tsv"
python3 "$T/classify.py" -v "$W/$V.full.tsv" 2>/dev/null | awk -F'\t' '$1=="V1"||$1=="V2"||$1=="Z1"' | cut -c1-400 > "$HERE/captures/distance-$V.arrays.txt"
grep -E '^#(total|class	(V1|V2|Z1))|^#seconds' "$W/$V.table"
