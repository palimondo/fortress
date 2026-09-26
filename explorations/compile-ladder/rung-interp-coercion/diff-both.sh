#!/bin/bash
# diff-both.sh <out.txt> <file.fss>...: the skeptic's differential runner (its tmp/sk-diff.sh) kept with the rung: for each probe, walk at
# FORTRESS_THREADS=1 and =4, then fortress compile and fortress run at 1 and 4. Run from FORTRESS_HOME with explorations/experiment/env.sh sourced
# and the compiled library cache built in library order.
set -u
OUT=$1 ; shift
cd "$FORTRESS_HOME"
for f in "$@" ; do
  c=$(basename "$f" .fss) ; d=$(dirname "$f")
  for th in 1 4 ; do
    echo "=== walk FORTRESS_THREADS=$th $c   ($(git rev-parse --short HEAD), $(date -u +%H:%M:%SZ), load $(cut -d' ' -f1 /proc/loadavg)) ===" >> "$OUT"
    ( cd "$d" && FORTRESS_THREADS=$th timeout -k 10 300 "$FORTRESS_HOME/bin/fortress" "$c.fss" < /dev/null ) >> "$OUT" 2>&1
    echo "=== exit $? ===" >> "$OUT"
  done
  echo "=== compile $c ===" >> "$OUT"
  ( cd "$d" && timeout -k 10 300 "$FORTRESS_HOME/bin/fortress" compile "$c.fss" < /dev/null ) >> "$OUT" 2>&1
  rc=$?
  echo "=== exit $rc ===" >> "$OUT"
  if [ $rc = 0 ] ; then
    for th in 1 4 ; do
      echo "=== run FORTRESS_THREADS=$th $c ===" >> "$OUT"
      ( cd "$d" && FORTRESS_THREADS=$th timeout -k 10 300 "$FORTRESS_HOME/bin/fortress" run "$c" < /dev/null ) >> "$OUT" 2>&1
      echo "=== exit $? ===" >> "$OUT"
    done
  fi
  echo >> "$OUT"
done
