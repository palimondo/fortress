#!/bin/bash
# count-run.sh <work-dir> [list-file] [shadow-classes-dir] [shards]: runs every file of [list-file] under
# `walk`, one JVM per test, and writes its output to <work-dir>/log/<test>.txt with an rc= secs= trailer.
# Without a list file (or with -), the list is every ProjectFortress/tests/*.fss of the tree the script sits
# in, generated at run time.  The list run goes to <work-dir>/list.txt and the pass's tree, commit and times
# to <work-dir>/pass.txt, which compare-normalised.py beside this script reads.
# The named one-time count of a batch record (climb-batch-workflow.md, "Preparing a batch record"): one base
# pass, started by the coordinator on the batch's base before the launch, and one edit pass, started by the
# rung worker after its last edit, compared by compare-normalised.py with the tests that vary from run to
# run listed in unstable.txt beside it (postmortem-2026-09-29/synthesis.md, section 2(a);
# postmortem-2026-09-29/measures-6.5b.md, "The interpreter tests that vary from run to run").
# Batch N's rung M's copy (git show 9269f7bd2^:explorations/compile-ladder/rung-integer-minmax/count-run.sh),
# rung F's runner, moved here four directories below the tree, its list generated when none is given.
# The shape of explorations/reviews/mie-probes/keep/nestprobe/run-tests.sh without its NestProbe shadow:
# each shard has its own FORTRESS_CACHES, so default_repository/ is never read or written and no two JVMs
# share a cache.  A shadow classes directory, if given, is put ahead of ProjectFortress/build on the classpath.
# A relative <work-dir> or list file is taken from the tree's root; a pass resumed in the same <work-dir>
# skips every test whose log has its trailer and appends to pass.txt.  Stop a pass only by its own path,
# never by this script's name across the box (climb-batch-workflow.md, "Shared prefix").
set -u
cd "$(dirname "$0")/../../../.."                            # $FORTRESS_HOME
# env.sh without its rm of /tmp/fortress*rats, which a parallel agent's runs may be using
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
U='usage: count-run.sh <work-dir> [list-file|-] [shadow-classes-dir] [shards]'
W=$(mkdir -p "${1:?$U}" && cd "$1" && pwd)
L=${2:--}
SH=${3:-}
N=${4:-4}
mkdir -p "$W/log"
if [ "$L" = - ]; then
  LC_ALL=C ls ProjectFortress/tests/*.fss > "$W/list.txt"
else
  [ "$L" -ef "$W/list.txt" ] || cp "$L" "$W/list.txt"
fi
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
[ -n "$SH" ] && CP="$SH:$CP"
# one core per JVM, as the precedent: four run at once
FAST="-XX:+UseSerialGC -XX:TieredStopAtLevel=1 -XX:ActiveProcessorCount=1"
{
  echo "root=$FORTRESS_HOME"
  echo "work=$W"
  echo "commit=$(git rev-parse HEAD)"
  echo "changed=$(git status --porcelain --untracked-files=no | wc -l) tracked files differ from the commit"
  echo "tests=$(grep -c . "$W/list.txt")"
  echo "shadow=${SH:-none} shards=$N"
  echo "start=$(date -u +%FT%TZ) load: $(cut -d' ' -f1-3 /proc/loadavg)"
} | tee -a "$W/pass.txt"
for i in $(seq 0 $((N-1))); do
  (
    C="$W/caches-$i"; T="$W/tmp-$i"; mkdir -p "$C" "$T"
    [ -f "$C/global.map" ] || printf '\0\0\0\0' > "$C/global.map"
    awk -v n=$N -v i=$i 'NR % n == i' "$W/list.txt" | while read -r f; do
      t=$(basename "$f" .fss)
      grep -q '^rc=' "$W/log/$t.txt" 2>/dev/null && continue
      start=$(date +%s)
      FORTRESS_CACHES="$C" timeout -k 10 600 \
        java -Xmx4g -Xss64m -Djava.io.tmpdir="$T" $FAST -Dfile.encoding=UTF-8 -cp "$CP" com.sun.fortress.Shell walk "$f" \
        < /dev/null > "$W/log/$t.txt" 2>&1
      rc=$?
      printf '\nrc=%s secs=%s\n' "$rc" "$(( $(date +%s) - start ))" >> "$W/log/$t.txt"
    done
  ) &
done
wait
rm -f ProjectFortress/tests/poem.out
echo "done=$(date -u +%FT%TZ) logs: $(grep -l '^rc=' "$W"/log/*.txt | wc -l)" | tee -a "$W/pass.txt"
