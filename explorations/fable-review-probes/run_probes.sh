#!/bin/bash
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64; export PATH=$JAVA_HOME/bin:$PATH
export FORTRESS_HOME=/home/user/fortress; unset JAVA_TOOL_OPTIONS; export JAVA_FLAGS="-Xmx2g -Xss64m"
R=/tmp/claude-0/-home-user-fortress/bdff267d-67dc-5bb9-b970-8c3dfaa634b6/scratchpad/fable-review/runs
cd /home/user/fortress
for f in "$@"; do
  n=$(basename $f .fss)
  { echo "== $f"; timeout 120 env FORTRESS_THREADS=1 ./bin/fortress explorations/fable-review-probes/$n.fss 2>&1 | grep -v '^\s*at \|^java.lang.Throwable\|Turn on'; echo "-- exit ${PIPESTATUS[0]}"; } > $R/$n.log 2>&1
  echo "$n: exit $(tail -1 $R/$n.log)"
done
