#!/bin/bash
# demo-run.sh <tree> <out-file> <demo>...: each demo of ProjectFortress/demos under walk, run from a scratch copy of
# <tree>'s ProjectFortress/demos (so relative input paths hold), one JVM at a time, private cache, FORTRESS_THREADS=1,
# timeout 900 s, FORTRESS_AUTOHOME set to <tree> (count-run.sh says why), on this worktree's build. Output appended
# to <out-file>: a machine line, then per demo its first error lines (prefixed first:, if any; added after the base
# run of 2026-09-27), its last 12 lines (stack frames dropped) and rc= secs=.
set -u
R=$(cd "$(dirname "$0")/../../.." && pwd)
TREE=$(cd "${1:?usage: demo-run.sh <tree> <out-file> <demo>...}" && pwd)
OUT=${2:?usage}; shift 2
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH"
unset JAVA_TOOL_OPTIONS
CP=$(cd "$R" && FORTRESS_HOME="$R" ./bin/fortress_classpath 2>/dev/null | tail -1)
export FORTRESS_HOME="$TREE" FORTRESS_AUTOHOME="$TREE" FORTRESS_THREADS=1
W=$(mktemp -d "$R/tmp/demo.XXXX"); cp -r "$TREE/ProjectFortress/demos" "$W/src"; mkdir -p "$W/caches" "$W/jtmp"
echo "# demos under walk, tree $TREE; nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | cut -d: -f2); MHz $(grep -m1 'cpu MHz' /proc/cpuinfo | cut -d: -f2); load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=1" >> "$OUT"
for d in "$@"; do
  C="$W/caches/$d"; mkdir -p "$C"; printf '\0\0\0\0' > "$C/global.map"
  s=$(date +%s)
  ( cd "$W/src" && FORTRESS_CACHES="$C" timeout -k 10 900 java -Xmx2g -Xss64m -Djava.io.tmpdir="$W/jtmp" -Dfile.encoding=UTF-8 \
      -cp "$CP" com.sun.fortress.Shell walk "$d.fss" < /dev/null > "$W/$d.log" 2>&1 )
  rc=$?
  { echo "== $d"; grep -v '^\s*at ' "$W/$d.log" | sed "s|$W/src/||g; s|$TREE/||g" | grep -m2 -A1 'Error\|Exception' | sed 's/^/first: /'; grep -v '^\s*at ' "$W/$d.log" | sed "s|$W/src/||g; s|$TREE/||g" | tail -12; echo "rc=$rc secs=$(( $(date +%s) - s ))"; } >> "$OUT"
done
rm -rf "$W"
