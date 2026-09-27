#!/bin/bash
# run-walk-cases.sh <dir>: every <dir>/*.fss under walk, one private cache kept across the runs
# (the library's cache built by the first), each captured to <Name>.walk.txt with its machine line.
cd "$(dirname "$0")/../../../.."; source explorations/experiment/env.sh; export JAVA_FLAGS="-Xmx4g -Xss64m"
D=$(cd "${1:?dir}" && pwd); C=$PWD/tmp/fable/c-walk-cases; rm -rf "$C"; mkdir -p "$C/tmp"; printf '\0\0\0\0' > "$C/global.map"
CP=$(bin/fortress_classpath | tail -1); cd "$D"
for f in *.fss; do N=${f%.fss}
  { echo "# walk $N $(date -u +%FT%TZ); tree $(git -C /home/user/fortress rev-parse --short HEAD); nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/.*: //') MHz; load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | grep -m1 version); FORTRESS_THREADS=$FORTRESS_THREADS"
    FORTRESS_CACHES="$C" timeout -k 10 600 java $JAVA_FLAGS -Djava.io.tmpdir="$C/tmp" -cp "$CP" com.sun.fortress.Shell walk "$f" 2>&1 | grep -v '^\s*at \|^java.lang.Throwable\|Turn on "-debug'
    echo "rc=${PIPESTATUS[0]}"; } > "$N.walk.txt" 2>&1
done
rm -rf "$C"; echo "walk cases done"
