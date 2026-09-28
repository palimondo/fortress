#!/bin/bash
# dist.sh build                            the gate's distance-stage shadows and driver
#                                          (coordinator/tools/distance/run.sh step 1) against the frozen
#                                          classpath, into $X/dist/
# dist.sh lib <variant> [edit-script]      a library copy $X/dist/libs/<variant>/: every .fsi/.fss of the
#                                          private home's Library/ and LibraryBuiltin/ (distance-triage/
#                                          run.sh's `lib` step), then `python3 <edit-script> <dir>` if named
# dist.sh stage <label> <variant> [-D switches]
#                                          the gate's distance stage (DistanceMulti, the twelve components
#                                          of that copy in one JVM, every check whatever the earlier ones
#                                          report, setting `any`, overload memo off) with probe P1's
#                                          shadow ahead of everything and the given switches.  Writes
#                                          dist/table-<label>.txt (the gate's table.py rows and the machine
#                                          line), dist/ovl-<label>.tsv (errors.py's list, the overloading
#                                          and return-type rows, and the positional ones) and
#                                          dist/p1-<label>.txt (every @@P1 line but the agreeing ones).
set -u
source "$(dirname "${BASH_SOURCE[0]}")/../env.sh"
D=$FORTRESS_HOME/explorations/coordinator/tools/distance
W=$X/dist; mkdir -p "$W" "$O/P1/dist"
STEP=${1:?step}; shift
case $STEP in
build)
  rm -rf "$W/shadow-src" "$W/shadow-classes" "$W/classes"; mkdir -p "$W/shadow-src" "$W/shadow-classes" "$W/classes"
  ( cd "$FORTRESS_HOME" && python3 "$D/shadow-patch.py" ProjectFortress/src/com/sun/fortress "$W/shadow-src" \
      && python3 "$D/add-patch.py" "$W/shadow-src" ) > "$W/shadows.txt" 2>&1 || { tail "$W/shadows.txt"; exit 1; }
  S=$W/shadow-src/com/sun/fortress
  javac -nowarn -encoding UTF-8 -cp "$CP" -d "$W/shadow-classes" $S/compiler/StaticChecker.java $S/compiler/phases/TypeCheckPhase.java \
      $S/compiler/phases/DesugarPhase.java $S/compiler/phases/CodeGenerationPhase.java $S/compiler/codegen/CodeGen.java \
      $S/compiler/Desugarer.java $S/nodes_util/NodeComparator.java >> "$W/shadows.txt" 2>&1 || { tail "$W/shadows.txt"; exit 1; }
  javac -nowarn -cp "$CP" -d "$W/classes" "$D/DistanceMulti.java" >> "$W/shadows.txt" 2>&1 || { tail "$W/shadows.txt"; exit 1; }
  echo "built: $(find "$W/shadow-classes" "$W/classes" -name '*.class' | wc -l) classes" ;;
lib)
  v=${1:?variant}; d=$W/libs/$v
  rm -rf "$d"; mkdir -p "$d"
  cp "$H"/Library/*.fsi "$H"/Library/*.fss "$H"/ProjectFortress/LibraryBuiltin/*.fsi "$H"/ProjectFortress/LibraryBuiltin/*.fss "$d/"
  if [ -n "${2:-}" ]; then python3 "$2" "$d" || exit 1; fi
  echo "library copy $v: $(ls "$d" | wc -l) files" ;;
stage)
  LBL=${1:?label}; v=${2:?variant}; shift 2
  COMPONENTS="FortressLibrary RangeInternals FortressBuiltin NativeArray List String FlatString Stream NatReflect TypeProxy Writer AnyType"
  T=""; for c in $COMPONENTS; do T="$T $W/libs/$v/$c.fss"; done
  C=$W/caches-$LBL; rm -rf "$C"; mkdir -p "$C/tmp"
  M="$(date -u +%FT%TZ) $(machine_line)"
  S=$(date +%s)
  ( cd "$H" && timeout -k 30 5400 java -Xmx4g -Xss64m -XX:-OmitStackTraceInFastThrow -Djava.io.tmpdir="$C/tmp" -Dfortress.caches="$C" \
      -Dprobe.tolerant=true -Dprobe.all=true -Dfortress.analyzer.overload.cache=false "$@" \
      -cp "${P1_CLASSES:-$X/p1/classes}:$W/shadow-classes:$W/classes:$CP" DistanceMulti -order check -setting any $T ) > "$W/run-$LBL.txt" 2>&1
  RC=$?; E=$(( $(date +%s) - S )); rm -rf "$C"
  R=$W/run-$LBL.txt
  { printf '#distance\tsetting any; overload memo off; 12 components of %s in one JVM; switches: %s\n' "$v" "${*:-none}"
    python3 -B "$D/table.py" "$R" 2>&1
    python3 "$D/errors.py" "$W/errors-$LBL.tsv" "$R" > "$W/tally-$LBL.txt" 2>&1
    printf '#errors.py\t%s\n' "$(head -1 "$W/tally-$LBL.txt")"
    printf '#positional-errors\t%s\n' "$(grep -c 'Positional rule (' "$R")"
    grep '^@@P1 ' "$R" | sed -E 's/ own=.*//; s/ name=.*//' | sort | uniq -c | sed 's/^/#p1\t/'
    printf '#seconds\t%s rc=%s\n#machine\t%s\n' "$E" "$RC" "$M"
  } > "$O/P1/dist/table-$LBL.txt"
  awk -F'\t' 'NR == 1 || $0 ~ /overloading|return-type|Positional rule/' "$W/errors-$LBL.tsv" | sed "s#$W/libs/$v/#<lib>/#g" > "$O/P1/dist/ovl-$LBL.tsv"
  awk '/^@@P1 / && !/POS agree/ {print; getline; print; getline; print}' "$R" | sed "s#$W/libs/$v/#<lib>/#g; s#$H/#<home>/#g" > "$O/P1/dist/p1-$LBL.txt"
  cat "$O/P1/dist/table-$LBL.txt" | grep -v '^#unit\|^#crash' ;;
esac
