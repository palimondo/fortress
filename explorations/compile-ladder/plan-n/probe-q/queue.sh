#!/bin/bash
# queue.sh <queue-file> : every job of <queue-file>, one JVM at a time (the coordinator's word of
# 10:38 UTC: the batch's rungs have the machine, so this probe runs one JVM at a time from then on).
# A job line:  <work-dir> <variant> <timeout-secs> <program path relative to the home> [props...]
# or           dist <variant>          (dist.sh, the checker's distance stage on the variant's library)
# A program job is run-pass.sh's inner loop for one program: under walk, in the private home
# $X/home-<variant>, from the program's own directory, one core, the work directory's own cache
# (which starts empty), output to <work-dir>/log/<name>.txt with an rc= secs= trailer; a job whose log
# already has its trailer is skipped, so the queue resumes.  Variant r takes the $X/classes-r shadow.
set -u
source "$(dirname "${BASH_SOURCE[0]}")/env.sh"
Q=${1:?queue file}
FAST="-XX:+UseSerialGC -XX:TieredStopAtLevel=1 -XX:ActiveProcessorCount=1"
while read -r WD V TO F PROPS; do
  [ -z "${WD:-}" ] && continue
  case "$WD" in \#*) continue ;; esac
  if [ "$WD" = dist ]; then
    [ -f "$O/captures/distance-$V.txt" ] && continue
    echo "dist $V start $(date -u +%FT%TZ); $(machine_line)"
    SHADOW=$X/classes-r bash "$O/dist.sh" "$V" < /dev/null > "$X/runs/dist-$V.out" 2>&1
    echo "dist $V done $(date -u +%FT%TZ)"; continue
  fi
  H=$X/home-$V
  case $V in stock) RCP=$CP ;; r) RCP="$X/classes-r:$CP" ;; r1|r2) RCP="$X/classes-r2:$CP" ;; *) RCP="$X/classes:$CP" ;; esac
  mkdir -p "$WD/log" "$WD/caches" "$WD/tmp"
  [ -f "$WD/caches/global.map" ] || printf '\0\0\0\0' > "$WD/caches/global.map"
  [ -f "$WD/machine.txt" ] || echo "start $(date -u +%FT%TZ) variant: $V props: ${PROPS:-none} (queue.sh, one JVM at a time); $(machine_line)" > "$WD/machine.txt"
  t=$(basename "$F" .fss)
  grep -q '^rc=' "$WD/log/$t.txt" 2>/dev/null && continue
  start=$(date +%s)
  ( cd "$H/$(dirname "$F")" && FORTRESS_HOME=$H FORTRESS_CACHES="$WD/caches" timeout -k 10 "$TO" \
    java -Xmx4g -Xss64m -Djava.io.tmpdir="$WD/tmp" $FAST -Dfile.encoding=UTF-8 -Dfortress.autohome=$H ${PROPS:-} \
         -cp "$RCP" com.sun.fortress.Shell walk "$(basename "$F")" < /dev/null > "$WD/log/$t.txt" 2>&1 )
  rc=$?
  printf '\nrc=%s secs=%s\n' "$rc" "$(( $(date +%s) - start ))" >> "$WD/log/$t.txt"
  echo "$t $V rc=$rc secs=$(( $(date +%s) - start )) load $(cut -d' ' -f1 /proc/loadavg)" >> "$WD/loads.txt"
done < "$Q"
echo "queue done $(date -u +%FT%TZ); $(machine_line)"
