#!/bin/bash
# run.sh : runs every program of list.txt under walk with the main tree's build (bin/fortress from
# /home/user/fortress, as the brief allows; ant is not run and the build is not touched), one JVM at a
# time, with a private cache and temporary directory under the session scratch directory that the
# first run fills and the rest reuse (the programs share only the library). Captures go to
# captures/<Name>.txt, headed by the machine line and ending with the exit code; summarize.py then
# writes summary.txt, one line per call.
set -u
D=/home/user/fortress/explorations/reviews/before-n-questions/walk-max
S=/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/before-n-walk
mkdir -p "$S/caches" "$S/tmp" "$D/captures"
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH=/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH
export FORTRESS_HOME=/home/user/fortress FORTRESS_THREADS=1 FORTRESS_CACHES="$S/caches"
unset JAVA_TOOL_OPTIONS
export JAVA_FLAGS="-Xmx2g -Xss64m -Djava.io.tmpdir=$S/tmp"
machine () { echo "nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/.*: //') MHz; load at start $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS; tree $(git -C $FORTRESS_HOME rev-parse --short HEAD)"; }
# with names as arguments, only those programs are run
cut -f1,2 "$D/list.txt" | while IFS=$'\t' read -r N CALL; do
  [ $# -gt 0 ] && ! printf '%s\n' "$@" | grep -qx "$N" && continue
  B=$(date +%s)
  { echo "# machine: $(machine)"
    echo "# walk $N: $CALL"
    cd "$FORTRESS_HOME"; timeout 600 ./bin/fortress walk "explorations/reviews/before-n-questions/walk-max/$N.fss" < /dev/null > "$S/out.txt" 2>&1
    RC=$?; grep -v '^\s*at ' "$S/out.txt" | sed "s#$FORTRESS_HOME/##g"; echo "rc=$RC secs=$(( $(date +%s) - B ))"
  } > "$D/captures/$N.txt"
  echo "$N $(tail -1 "$D/captures/$N.txt")"
done
rm -rf "${S:?}/tmp/"*
python3 "$D/summarize.py" > /dev/null
