#!/bin/bash
# walk.sh <Name>... : each compiler_tests/<Name>.fss run by the interpreter (walk), private cache; the
# walk side of the compiled tests' shapes. -> probes/walk/<Name>.walk.txt with the machine line.
set -u
W=/home/user/fortress-infer; R=$W/explorations/compile-ladder/rung-inference-checker
for N in "$@"; do
  C=$W/tmp/walk-cache-$N; rm -rf "$C"; mkdir -p "$C/tmp" "$C/src"; cp "$W/ProjectFortress/compiler_tests/$N.fss" "$C/src/"
  { echo "# walk.sh $N $(date -u +%FT%TZ); tree $(git -C $W rev-parse --short HEAD); nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/.*: //') MHz; load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS"
    ( cd "$C/src" && FORTRESS_CACHES="$C" JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$C/tmp -Dfortress.caches=$C" timeout -k 10 600 $W/bin/fortress "$N.fss" 2>&1 | grep -v '^\s*at ' | head -30; echo "rc=${PIPESTATUS[0]}" )
  } > "$R/probes/walk/$N.walk.txt" 2>&1
  rm -rf "$C"
  echo "$N: $(tail -1 "$R/probes/walk/$N.walk.txt") $(grep -c PASS "$R/probes/walk/$N.walk.txt") PASS"
done
