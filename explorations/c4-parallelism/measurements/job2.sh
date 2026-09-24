#!/bin/bash
# Job 2: the parallelism measurements of explorations/c4-parallelism.md section 10,
# measurements 1, 2, 3 and 5. Commands as given there, adapted only for the private
# cache directory (FORTRESS_CACHES + -Dfortress.caches) and a private java.io.tmpdir.
set -u
source /home/user/fortress/explorations/experiment/env.sh
SP=/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad
CACHES=$SP/measure/caches
export FORTRESS_CACHES=$CACHES
TMPD=$SP/measure/ladder-tmp
mkdir -p "$TMPD"
CACHEOPT="-Dfortress.caches=$CACHES -Djava.io.tmpdir=$TMPD"
M=/home/user/fortress/explorations/c4-parallelism/measurements
mkdir -p "$M"
JFR=$SP/measure/t4.jfr

cd /home/user/fortress/explorations/run-c4/src || exit 1

echo "=== measurement 1: JFR at 4 threads  $(date -Is) ==="
env FORTRESS_THREADS=4 JAVA_FLAGS="-Xmx4g -Xss64m $CACHEOPT \
  -XX:StartFlightRecording=settings=profile,filename=$JFR,duration=300s" \
  ../../../bin/fortress MicroGptFlatCheck.fss > "$M/check_jfr.txt" 2>&1
echo "rc=$?"
rm -rf "${TMPD:?}"/fortress*rats
ls -l "$JFR"
jfr summary "$JFR" > "$M/jfr-summary.txt" 2>&1
jfr print --events jdk.ObjectAllocationSample "$JFR" > "$SP/measure/alloc.txt" 2>&1
grep -c "ValueNode\|ReadSet\|CopyOnWriteArrayList" "$SP/measure/alloc.txt" > "$M/jfr-alloc-grepcount.txt"
jfr print --events jdk.JavaMonitorEnter,jdk.JavaMonitorWait "$JFR" > "$SP/measure/monitor.txt" 2>&1
head -80 "$SP/measure/monitor.txt" > "$M/jfr-monitor-head80.txt"

echo "=== measurement 2: scaling curve 1..4 threads  $(date -Is) ==="
for t in 1 2 3 4; do
  echo "-- threads=$t $(date -Is)"
  env JAVA_FLAGS="-Xmx4g -Xss64m $CACHEOPT" /usr/bin/time -f "threads=$t wall=%e maxrssKB=%M" \
    env FORTRESS_THREADS=$t ../../../bin/fortress MicroGptFlatCheck.fss \
    > "$M/check_t$t.txt" 2>"$M/check_t$t.time.txt"
  rm -rf "${TMPD:?}"/fortress*rats
  tail -2 "$M/check_t$t.txt"; cat "$M/check_t$t.time.txt" | tail -1
done
grep -H "^total" "$M"/check_t*.txt > "$M/totals.txt"
cat "$M"/check_t*.time.txt | grep -h '^threads=' > "$M/times.txt"
grep -H "batch 1 step" "$M"/check_t*.txt > "$M/per-step.txt"

echo "=== measurement 5: tuple-split variant at 4 threads  $(date -Is) ==="
cd $SP/measure/ts/explorations/run-c4/src || exit 1
env JAVA_FLAGS="-Xmx4g -Xss64m $CACHEOPT" /usr/bin/time -f "threads=4 variant=tuple-split wall=%e maxrssKB=%M" \
  env FORTRESS_THREADS=4 /home/user/fortress/bin/fortress MicroGptFlatCheck.fss \
  > "$M/check_tuplesplit_t4.txt" 2>"$M/check_tuplesplit_t4.time.txt"
rm -rf "${TMPD:?}"/fortress*rats
tail -2 "$M/check_tuplesplit_t4.txt"; tail -1 "$M/check_tuplesplit_t4.time.txt"
echo "=== job 2 done $(date -Is) ==="
