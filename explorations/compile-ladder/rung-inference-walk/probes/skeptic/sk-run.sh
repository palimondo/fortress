#!/bin/bash
# sk-run.sh <progs-dir> <mode> : runs every program of <progs-dir>/list.txt one JVM each and prints its first
# output lines with its exit code.  mode walk-base: walk on the base build (the private home tmp/home-base
# that the rung's snapshot.sh made from bce66f1fa); walk-edit: walk on the worktree's build; compiled:
# bin/fortress compile then bin/fortress run on the worktree (the rung edits nothing of the compiled path,
# so this is the base's compiler, without rung I).  Walk runs share one private cache per mode.  First line:
# the machine line (protocol.md, principle 2).  Source explorations/experiment/env.sh first.
set -u
FH=${FORTRESS_HOME:?}
P=$(cd "${1:?progs}" && pwd); M=${2:?mode}
TP=$("$FH/bin/fortress_classpath" 2>/dev/null | tail -1 | tr ':' '\n' | grep '/third_party/' | paste -sd:)
case $M in
  walk-base) WH=$FH/tmp/home-base ;;
  walk-edit) WH=$FH ;;
  compiled) WH=$FH ;;
esac
echo "# sk-run $M $(date -u +%FT%TZ); tree $(git -C "$FH" rev-parse --short HEAD); home $WH; nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //') MHz; load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=${FORTRESS_THREADS:-unset}"
W=$FH/tmp/sk/run-$M; mkdir -p "$W/caches" "$W/tmp"; [ -f "$W/caches/global.map" ] || printf '\0\0\0\0' > "$W/caches/global.map"
while IFS='|' read -r n label why; do
  echo "== $n  $label   [$why]"
  if [ "$M" = compiled ]; then
    ( cd "$P" && "$FH/bin/fortress" compile "$n.fss" < /dev/null 2>&1 | grep -v '^\s*at ' | sed "s#$FH/##g" | head -8; echo "compile rc=${PIPESTATUS[0]}"
      "$FH/bin/fortress" run "$n" < /dev/null 2>&1 | grep -v '^\s*at ' | sed "s#$FH/##g" | head -6; echo "run rc=${PIPESTATUS[0]}" )
  else
    cp "$P/$n.fss" "$W/"
    ( cd "$W" && FORTRESS_HOME="$WH" FORTRESS_CACHES="$W/caches" java $JAVA_FLAGS -Dfile.encoding=UTF-8 \
        -cp "$WH/ProjectFortress/build:$TP" com.sun.fortress.Shell "$n.fss" < /dev/null 2>&1 \
      | grep -v '^\s*at ' | sed "s#$FH/##g" | grep -v '^Context:\|^toplevel:\|^Turn on\|^java.lang.Throwable\|^$' | head -5 ; echo "rc=${PIPESTATUS[0]}" )
    rm -f "$W/$n.fss"
  fi
done < "$P/list.txt"
