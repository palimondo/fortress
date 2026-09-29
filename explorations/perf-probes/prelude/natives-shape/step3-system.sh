#!/bin/bash
# step3-system.sh LABEL [SHADOWDIR] -- the interpreter suite (SystemJUTest, what
# `ant testSystem` runs) in two shards side by side, private caches, with
# SHADOWDIR first on the classpath when given.  No ant; nothing in the tree changes.
set -u
cd "$(dirname "$0")/../../../.."
source explorations/experiment/env.sh
D=explorations/perf-probes/prelude/natives-shape
L=$1; SH=${2:-}
CP="$(bin/fortress_classpath)"; [ -n "$SH" ] && CP="$SH:$CP"
echo "label $L shadow '${SH}' load at start: $(cut -d' ' -f1-3 /proc/loadavg) $(date -u +%H:%M:%S)" > $D/09-system-$L.out
for i in 0 1; do
  C=$FORTRESS_HOME/tmp/caches-sys-$L-$i; rm -rf $C; mkdir -p $C $FORTRESS_HOME/tmp/test-tmp-$L-$i
  ( cd ProjectFortress && FORTRESS_CACHES=$C FORTRESS_THREADS=1 java -Xmx768m -Xss32m \
      -Djava.io.tmpdir=$FORTRESS_HOME/tmp/test-tmp-$L-$i -Dfortress.suite.shard=$i/2 -Dfortress.caches=$C \
      -cp "$CP" com.sun.fortress.tests.unit_tests.SystemJUTest > $FORTRESS_HOME/tmp/system-$L-$i.log 2>&1 ) &
done
wait
for i in 0 1; do
  echo "--- shard $i/2"; grep -E "^Shard |^OK \(|^Tests run|^FAILURES|^There w" $FORTRESS_HOME/tmp/system-$L-$i.log
done >> $D/09-system-$L.out
echo "end $(date -u +%H:%M:%S)" >> $D/09-system-$L.out
