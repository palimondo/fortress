#!/bin/bash
# run-walk.sh <stock|apply> <Name>... : runs each fork/<Name>.fss under walk in probe K's private home
# (explorations/compile-ladder/plan-n/probe-k/env.sh: its frozen build of 158aa7dce and the shadow's
# classes, which survive in the session scratch directory), stock or with the shadow in apply mode
# (-Dprobe.k=apply, walk's inference rule as probe K built it), one JVM at a time, from a private work
# directory with a private cache that starts empty. The command line is probe K's run-pass.sh's.
set -u
source /home/user/fortress/explorations/compile-ladder/plan-n/probe-k/env.sh
O=/home/user/fortress/explorations/reviews/before-n-questions/fork
MODE=$1; shift
RCP=$CP; PROPS=""
[ "$MODE" = apply ] && { RCP="$SHADOW:$CP"; PROPS="-Dprobe.k=apply"; }
export FORTRESS_HOME=$H
FAST="-XX:+UseSerialGC -XX:TieredStopAtLevel=1 -XX:ActiveProcessorCount=1"
for N in "$@"; do
  W=$X/before-n-walk/$N-$MODE; rm -rf "$W"; mkdir -p "$W/caches" "$W/tmp" "$W/src"; cp "$O/$N.fss" "$W/src/"
  printf '\0\0\0\0' > "$W/caches/global.map"
  { echo "# walk $N $MODE $(date -u +%FT%TZ); tree $(git -C /home/user/fortress rev-parse --short HEAD) (probe K's private home of $BASE); $(machine_line)"
    ( cd "$W/src" && FORTRESS_CACHES="$W/caches" timeout -k 10 600 \
        java -Xmx4g -Xss64m -Djava.io.tmpdir="$W/tmp" $FAST -Dfile.encoding=UTF-8 $PROPS \
             -Dprobe.k.log="$W/probe.txt" -cp "$RCP" com.sun.fortress.Shell walk "$N.fss" < /dev/null 2>&1 \
        | grep -v '^\s*at ' | sed "s#$W/src/##g" | head -30; echo "rc=${PIPESTATUS[0]}" )
    [ -s "$W/probe.txt" ] && { echo "## the shadow's difference lines"; sed "s#$W/src/##g" "$W/probe.txt" | cut -c1-400; }
  } > "$O/$N.walk-$MODE.txt" 2>&1
  rm -rf "$W"
  cat "$O/$N.walk-$MODE.txt"
done
