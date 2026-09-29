#!/bin/bash
# both.sh <label> <program.fss>... : the gather of climb batch N runs each program under walk and on the compiled
# path (fortress compile, then fortress run, against the compiler library) in the main tree, as rung T's
# run-both.sh does in its worktree. Each program is copied into a scratch directory under tmp/gather-N/, and
# its compiled cache entries are removed after the run. First line: the machine line (protocol.md, principle 2).
source "$(dirname "$0")/../../../experiment/env.sh"
FH=$FORTRESS_HOME; L=${1:?label}; shift
D=$FH/tmp/gather-N/progs-$L; rm -rf "$D"; mkdir -p "$D"
echo "# both.sh $L $(date -u +%FT%TZ); nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //') MHz; load at start $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS; tree $(git -C $FH rev-parse --short HEAD)$(git -C $FH diff --quiet HEAD -- ProjectFortress Library || echo ' with the next rung applied, not yet committed')"
for p in "$@"; do
  f=$(basename "$p"); n=${f%.fss}; cp "$p" "$D/"
  echo "=== $f walk"
  ( cd "$D" && timeout 600 "$FH/bin/fortress" "$f" < /dev/null 2>&1 | grep -v '^\s*at ' | sed "s#$FH/##g" | head -30 ; echo "rc=${PIPESTATUS[0]}" )
  echo "=== $f compile"
  ( cd "$D" && timeout 600 "$FH/bin/fortress" compile "$f" < /dev/null 2>&1 | sed "s#$FH/##g" | head -30 ; echo "rc=${PIPESTATUS[0]}" )
  echo "=== $f compiled run"
  ( cd "$D" && timeout 600 "$FH/bin/fortress" run "$n" < /dev/null 2>&1 | grep -v '^\s*at ' | sed "s#$FH/##g" | head -30 ; echo "rc=${PIPESTATUS[0]}" )
  find "$FH/default_repository/caches" -name "*$n*" -exec rm -rf {} + 2>/dev/null
done
rm -rf "$D"
