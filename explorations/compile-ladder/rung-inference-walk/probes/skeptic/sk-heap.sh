#!/bin/bash
# sk-heap.sh <mode> <shard> : the testSystem harness (SystemJUTest, as build.xml's systemShard macro runs it: one
# JVM, -Xmx768m, FORTRESS_THREADS=1) over one shard of the base's ProjectFortress/tests (tmp/home-base's copy, the
# same 429 files for both builds), with a G1 log of every collection, to read whether a build keeps more live heap
# from test to test.  mode base: tmp/home-base's build; edit: the worktree's build.  Verdicts are not the point
# (the edit build meets the base's two XXX files it repairs).  Prints the machine line, the suite's summary and the
# live heap after the collections.  mode overlay: the worktree's build with tmp/sk/ovcls first on the class path, a
# scratch Coercions.class whose only change clears coercionTypesByEnv when the library environment changes
# (the attribution probe; the source it was built from is probes/skeptic/overlay-Coercions.diff).  Source explorations/experiment/env.sh first.
set -u
FH=${FORTRESS_HOME:?}
M=${1:?mode}; SH=${2:?shard}
OV=""
case $M in base) WH=$FH/tmp/home-base ;; edit) WH=$FH ;; overlay) WH=$FH ; OV="$FH/tmp/sk/ovcls:" ;; esac
S=$FH/tmp/sk/heap-$M; rm -rf "$S"; mkdir -p "$S/caches" "$S/tmp"; printf '\0\0\0\0' > "$S/caches/global.map"
TP=$("$FH/bin/fortress_classpath" 2>/dev/null | tail -1 | tr ':' '\n' | grep '/third_party/' | paste -sd:)
echo "# sk-heap $M shard $SH $(date -u +%FT%TZ); home $WH; nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //') MHz; load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=1"
cd "$WH/ProjectFortress" && FORTRESS_HOME="$WH" FORTRESS_THREADS=1 FORTRESS_CACHES="$S/caches" \
  java -Xmx768m -Xss32m -Xlog:gc:file="$S/gc.txt" -Djava.io.tmpdir="$S/tmp" -Dfortress.caches="$S/caches" \
       -Dfortress.suite.shard="$SH" -Dtests="$FH/tmp/home-base/ProjectFortress/tests" -Dfile.encoding=UTF-8 \
       -cp "$OV$WH/ProjectFortress/build:$TP" com.sun.fortress.tests.unit_tests.SystemJUTest > "$S/out.txt" 2>&1
echo "exit=$?"
grep -E '^OK \(|^Tests run|^Time:' "$S/out.txt"
grep -c '' "$S/gc.txt" | sed 's/^/gc log lines: /'
echo "-- live heap after each Full or Remark-cleanup collection, and the last 12 young collections:"
grep -E 'Pause Full|Pause Remark|Pause Cleanup' "$S/gc.txt" | sed -E 's/^\[[^]]*\]\[[^]]*\]\[[^]]*\] //' | tail -20
grep -E 'Pause Young' "$S/gc.txt" | sed -E 's/^\[[^]]*\]\[[^]]*\]\[[^]]*\] //' | tail -12
cp "$S/gc.txt" "$FH/tmp/sk/gc-$M.txt"; rm -rf "$S"
