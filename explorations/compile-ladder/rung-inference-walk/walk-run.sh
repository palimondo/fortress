#!/bin/bash
# walk-run.sh <file.fss>... : runs each file under walk (bin/fortress), one JVM each, from a scratch copy
# in tmp/walk-run/<name> with a private cache that starts empty, and prints its output with its exit code.
# With WALK_HOME=<a private home made by snapshot.sh>, the run uses that home's build and library instead of
# the worktree's (the base, while the worktree holds the edit). The first line is the machine line
# (protocol.md, principle 2). Source explorations/experiment/env.sh first.
set -u
FH=${FORTRESS_HOME:?}
TP=$("$FH/bin/fortress_classpath" 2>/dev/null | tail -1 | tr ':' '\n' | grep '/third_party/' | paste -sd:)
if [ -n "${WALK_HOME:-}" ]; then
  WH=$(cd "$WALK_HOME" && pwd); WHAT="home $(head -1 "$WH/snapshot.txt" | sed 's/^# snapshot.sh //')"
else
  WH=$FH; WHAT="tree $(git -C "$FH" rev-parse --short HEAD)$(git -C "$FH" diff --quiet HEAD -- ProjectFortress/src || echo ' +uncommitted src edits')"
fi
echo "# walk-run $(date -u +%FT%TZ); $WHAT; nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //') MHz; load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=${FORTRESS_THREADS:-unset}; JAVA_FLAGS=${JAVA_FLAGS:-unset}"
for f in "$@" ; do
  n=$(basename "$f" .fss)
  W="$FH/tmp/walk-run/$n"
  rm -rf "$W" ; mkdir -p "$W/caches" "$W/tmp" ; printf '\0\0\0\0' > "$W/caches/global.map"
  cp "$f" "$W/"
  echo "== $n"
  ( cd "$W" && FORTRESS_HOME="$WH" FORTRESS_CACHES="$W/caches" java $JAVA_FLAGS -Dfile.encoding=UTF-8 \
        -cp "$WH/ProjectFortress/build:$TP" com.sun.fortress.Shell "$n.fss" < /dev/null 2>&1 \
      | grep -v '^\s*at ' | sed "s#$FH/##g" ; echo "rc=${PIPESTATUS[0]}" )
  rm -rf "$W"
done
