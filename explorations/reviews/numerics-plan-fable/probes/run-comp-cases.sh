#!/bin/bash
# run-comp-cases.sh <dir>: every <dir>/*.fss compiled in the compiler's world into a private cache seeded
# from tmp/fable/libcache (the five prelude components compiled in library order), then run; captured to
# <Name>.comp.txt with its machine line.  The shape of compile-ladder/plan-6.5/comp.sh.
cd "$(dirname "$0")/../../../.."; source explorations/experiment/env.sh; export JAVA_FLAGS="-Xmx4g -Xss64m"
D=$(cd "${1:?dir}" && pwd); L=$PWD/tmp/fable/libcache; CP=$(bin/fortress_classpath | tail -1); cd "$D"
for f in *.fss; do N=${f%.fss}; C=/home/user/fortress/tmp/fable/cache-comp-$N; rm -rf "$C"; cp -r "$L" "$C"; mkdir -p "$C/tmp"
  { echo "# comp $N $(date -u +%FT%TZ); tree $(git -C /home/user/fortress rev-parse --short HEAD); nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/.*: //') MHz; load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | grep -m1 version); FORTRESS_THREADS=$FORTRESS_THREADS"
    echo "## compile"; timeout -k 10 900 java $JAVA_FLAGS -Dfortress.caches="$C" -Djava.io.tmpdir="$C/tmp" -cp "$CP" com.sun.fortress.Shell compile "$f" 2>&1 | grep -v '^\s*at '; echo "compile rc=${PIPESTATUS[0]}"
    echo "## run"; timeout -k 10 300 java $JAVA_FLAGS -Dfortress.caches="$C" -cp "$C/bytecode_cache:$C/bytecode_cache/*:$C/nativewrapper_cache:$CP" com.sun.fortress.runtimeSystem.MainWrapper "$N" 2>&1 | grep -v '^\s*at ' | head -30; echo "run rc=${PIPESTATUS[0]}"; } > "$N.comp.txt" 2>&1
  rm -rf "$C"
done
echo "comp cases done"
