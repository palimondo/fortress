#!/bin/bash
# Repair R2 probes.  Usage: run-probes.sh <suffix>      (suffix: before | after | codegen-only)
# Runs each probe through the interpreter (walk) and through the compiler path
# (compile + run) and keeps both outputs beside the probe.
SUF="${1:?suffix required}"
source /home/user/fortress-r2/tmp/r2env.sh
P="$FORTRESS_HOME/explorations/compile-ladder/repair-r2-literal-wrap/probes"
cd "$P" || exit 1
for p in r2a r2b r2c r2e ; do
    echo "=== $p walk ==="
    "$FORTRESS_HOME"/bin/fortress walk "$p.fss" > "$p.walk.$SUF" 2>&1
    echo "exit $?"
    echo "=== $p compile+run ==="
    "$FORTRESS_HOME"/bin/fortress compile "$p.fss" > "$p.compile.$SUF" 2>&1
    echo "compile exit $?"
    "$FORTRESS_HOME"/bin/fortress run "$p" > "$p.compiled.$SUF" 2>&1
    echo "run exit $?"
done
echo "=== p39 (rung 7's probe, re-run) ==="
cd "$FORTRESS_HOME/explorations/compile-ladder/rung7/probes" || exit 1
"$FORTRESS_HOME"/bin/fortress walk p39.fss > "$P/p39.walk.$SUF" 2>&1
"$FORTRESS_HOME"/bin/fortress compile p39.fss > "$P/p39.compile.$SUF" 2>&1
"$FORTRESS_HOME"/bin/fortress run p39 > "$P/p39.compiled.$SUF" 2>&1
echo "=== probes done $(date +%T) ==="
