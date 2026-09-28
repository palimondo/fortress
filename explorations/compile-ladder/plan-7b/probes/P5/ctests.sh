#!/bin/bash
# ctests.sh <tag> [jvm switches] : the compiler's type checker over the .fss files the gate's compiler
# tests compile or link (the method of reviews/numerics-plan-coordinator/probes-D/ctests/: TestsD.java,
# `fortress typecheck`'s setting, the compiler's own library, all files in one JVM with one private
# cache; the list is its gate-list.py over the private home's compiler_tests), with probe P5's shadow
# ahead of the frozen classpath.  -> ctests/typecheck-<tag>.txt.  The comparand for the stock run is
# reviews/inference-rule-shadow/ctests/typecheck-stock.txt, taken on a tree whose compiler sources,
# compiler library and compiler tests are this one's (see P5.md).
set -u
source "$(dirname "${BASH_SOURCE[0]}")/../env.sh"
TAG=$1; shift
PD=$FORTRESS_HOME/explorations/reviews/numerics-plan-coordinator/probes-D/ctests
DRV=$X/p5/drv; mkdir -p "$DRV" "$O/P5/ctests"
test -f "$DRV/TestsD.class" || javac -nowarn -cp "$CP" -d "$DRV" "$PD/TestsD.java" || exit 1
python3 "$PD/gate-list.py" "$H/ProjectFortress/compiler_tests" 2> "$O/P5/ctests/gate-list.counts.txt" > "$O/P5/ctests/gate-list.txt"
C="$X/p5/ctests-cache-$TAG"; rm -rf "$C"; mkdir -p "$C"
OUT="$O/P5/ctests/typecheck-$TAG.txt"
cd "$H/ProjectFortress/compiler_tests"
{ echo "# ctests.sh $TAG ($*) $(date -u +%FT%TZ); private home of $(sed -n 2p "$O/snapshot.txt" | cut -d' ' -f2); $(machine_line); files $(wc -l < "$O/P5/ctests/gate-list.txt")"
  B=$(date +%s)
  timeout -k 30 5400 java $JAVA_FLAGS "$@" -Dfortress.caches="$C" -Djava.io.tmpdir="$C" "$SP" \
    -cp "$X/p5/classes:$DRV:$CP" TestsD $(cat "$O/P5/ctests/gate-list.txt") 2>&1 | sed "s#$H/#<home>/#g"
  echo "exit=${PIPESTATUS[0]}"; echo "ELAPSED $(( $(date +%s) - B )) s"; } > "$OUT" 2>&1
rm -rf "$C"
echo "done $TAG: $(grep -c '^=== ' "$OUT") files, $(grep -c '^### THROWN' "$OUT") thrown, $(grep ELAPSED "$OUT")"
