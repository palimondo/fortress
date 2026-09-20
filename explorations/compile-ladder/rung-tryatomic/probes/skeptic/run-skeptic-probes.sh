#!/bin/bash
# Skeptic differentials for rung B. For each probe: compile, run (compiled path,
# by component name, which is what `fortress run` wants) and walk (interpreter),
# at FORTRESS_THREADS=1 and =4, capturing everything.
# Usage: bash run-skeptic-probes.sh <Component> [more...]
set -u
source "$(dirname "${BASH_SOURCE[0]}")/../../../../../experiment/env.sh" >/dev/null 2>&1
export TMPDIR="$FORTRESS_HOME/tmp"
export JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$FORTRESS_HOME/tmp"
D="$FORTRESS_HOME/explorations/compile-ladder/rung-tryatomic/probes/skeptic"
cd "$FORTRESS_HOME" || exit 1
for n in "$@" ; do
    F="$D/$n.fss"
    OUT="$D/$(echo "$n" | tr 'A-Z' 'a-z').txt"
    {
        echo "=== $n.fss ==="
        echo "--- compile (compiled path) ---"
        timeout 240 ./bin/fortress compile "$F" 2>&1
        echo "compile exit=$?"
        for t in 1 4 ; do
            echo "--- run (compiled path), FORTRESS_THREADS=$t ---"
            FORTRESS_THREADS=$t timeout 120 ./bin/fortress run "$n" 2>&1 | grep -v '^	at java.base/java.util.concurrent\|^	at java.base/jdk.internal\|^	at java.base/java.lang.reflect'
            echo "run exit=${PIPESTATUS[0]}"
        done
        for t in 1 4 ; do
            echo "--- walk (interpreter), FORTRESS_THREADS=$t ---"
            FORTRESS_THREADS=$t timeout 120 ./bin/fortress "$F" 2>&1 | grep -v '^	at com.sun.fortress\|^	at java.base'
            echo "walk exit=${PIPESTATUS[0]}"
        done
    } > "$OUT" 2>&1
    echo "wrote $OUT"
done
