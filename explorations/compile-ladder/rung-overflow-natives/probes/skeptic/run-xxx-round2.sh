#!/bin/bash
# run-xxx-round2.sh: the second judgement's re-run of the repair round's four expected failures on the branch's
# build: the three walk files through probes/repair/run-walk.sh (fresh private caches, one thread), then the
# compiled pair through probes/repair/run-junit.sh. Writes round2-xxx.txt beside this script.
set -u
unset JAVA_TOOL_OPTIONS
cd "$(dirname "$0")"
R=../repair
OUT=round2-xxx.txt
{
  echo "# round2-xxx, $(date -u +%FT%TZ), nproc $(nproc), $(grep -m1 'model name' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //'), $(grep -m1 'cpu MHz' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //') MHz, load $(cut -d' ' -f1-3 /proc/loadavg), $(/usr/lib/jvm/java-25-openjdk-amd64/bin/java -version 2>&1 | head -1), FORTRESS_THREADS=1, HEAD $(git rev-parse --short HEAD)"
  for f in XXXRangeBoundsRungO XXXSeqRangeTopRungO XXXRangeSizeZZ64RungO; do
    $R/run-walk.sh ProjectFortress/tests/$f.fss 1 > "../../../../../tmp/sk/r2-$f.txt" 2>&1 &
  done
  wait
  for f in XXXRangeBoundsRungO XXXSeqRangeTopRungO XXXRangeSizeZZ64RungO; do
    echo "--- $f"; grep -v '^\s*at \|^	at ' "../../../../../tmp/sk/r2-$f.txt"
  done
  echo "--- the compiled pair"
  $R/run-junit.sh SeqMidpointRungOLink XXXSeqMidpointRungO | grep -v '^\s*at \|^	at '
  echo "--- git status --short (tracked files the runs may touch)"
  git status --short -- ../../../../../default_repository ../../../../../Library ../../../../../ProjectFortress
  echo "(end)"
} > "$OUT" 2>&1
