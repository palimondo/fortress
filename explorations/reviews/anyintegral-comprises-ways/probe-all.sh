#!/bin/bash
# probe-all.sh <work-dir> <label> <lib-dir> <probe.fss> [shadow-classes-dir] [-Dname=value ...]
# Type-checks one program in the one library's world with every stage of every unit run, whatever
# the earlier stages reported: the distance stage's driver (explorations/coordinator/tools/distance/
# DistanceMulti.java, -order check -setting any, -Dprobe.tolerant=true -Dprobe.all=true, overloading memo
# off) on the one program, with its shadow classes built from the tracked sources by the stage's own
# scripts (shadow-patch.py, add-patch.py), the copy heading FORTRESS_SOURCE_PATH, and an optional shadow
# ahead. It is needed because probe.sh's driver stops at the library api's own errors before it reaches
# the program. Prints the program's own errors; the whole output is <work-dir>/all-<label>.txt.
set -u
cd "$(dirname "$0")/../../.."                               # $FORTRESS_HOME
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
W=${1:?usage}; LBL=${2:?usage}; L=$(cd "${3:?usage}" && pwd); P=$(cd "$(dirname "${4:?usage}")" && pwd)/$(basename "$4"); shift 4
SH=""; if [ $# -gt 0 ] && [ -d "$1" ]; then SH="$(cd "$1" && pwd):"; shift; fi
mkdir -p "$W"; W=$(cd "$W" && pwd); T=explorations/coordinator/tools/distance
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1 | sed 's#:[^:]*/default_repository/caches/bytecode_cache##')
if [ ! -f "$W/dm-classes/DistanceMulti.class" ]; then
  rm -rf "$W/dm-src" "$W/dm-shadow" "$W/dm-classes"; mkdir -p "$W/dm-src" "$W/dm-shadow" "$W/dm-classes"
  python3 $T/shadow-patch.py ProjectFortress/src/com/sun/fortress "$W/dm-src" > "$W/dm-build.txt" 2>&1 &&
  python3 $T/add-patch.py "$W/dm-src" >> "$W/dm-build.txt" 2>&1 &&
  javac -nowarn -encoding UTF-8 -cp "$CP" -d "$W/dm-shadow" \
    "$W/dm-src/com/sun/fortress/compiler/StaticChecker.java" "$W/dm-src/com/sun/fortress/compiler/phases/TypeCheckPhase.java" \
    "$W/dm-src/com/sun/fortress/compiler/phases/DesugarPhase.java" "$W/dm-src/com/sun/fortress/compiler/phases/CodeGenerationPhase.java" \
    "$W/dm-src/com/sun/fortress/compiler/codegen/CodeGen.java" "$W/dm-src/com/sun/fortress/compiler/Desugarer.java" \
    "$W/dm-src/com/sun/fortress/nodes_util/NodeComparator.java" >> "$W/dm-build.txt" 2>&1 &&
  javac -nowarn -cp "$CP" -d "$W/dm-classes" $T/DistanceMulti.java >> "$W/dm-build.txt" 2>&1 || { tail "$W/dm-build.txt"; exit 1; }
fi
C="$W/caches-all-$LBL"; TMP="$W/tmp-all-$LBL"; rm -rf "$C" "$TMP"; mkdir -p "$C" "$TMP"
( cd "$(dirname "$P")" && FORTRESS_SOURCE_PATH=";$L;.;$FORTRESS_HOME/ProjectFortress/LibraryBuiltin;$FORTRESS_HOME/Library;$FORTRESS_HOME/ProjectFortress/test_library" \
  timeout -k 10 3600 java -Xmx4g -Xss64m -Djava.io.tmpdir="$TMP" -Dfortress.caches="$C" \
    -Dprobe.tolerant=true -Dprobe.all=true -Dfortress.analyzer.overload.cache=false "$@" \
    -cp "$SH$W/dm-shadow:$W/dm-classes:$CP" DistanceMulti -order check -setting any "$(basename "$P")" ) > "$W/all-$LBL.txt" 2>&1
echo "rc=$?" >> "$W/all-$LBL.txt"
rm -rf "$C" "$TMP"
c=$(basename "$P" .fss)
grep -P "^@@SC ERR\tcomponent $c\t" "$W/all-$LBL.txt" | cut -f3- | sed -E "s#^([a-z0-9]+)\t[^\t]*/([^/]+\.fss:[0-9]+:[0-9]+(-[0-9]+)?):#\1 \2:#; s/ +/ /g" || true
grep -P "^@@TC COMPONENT\t$c\t" "$W/all-$LBL.txt" || echo "(the program was not reached)"
