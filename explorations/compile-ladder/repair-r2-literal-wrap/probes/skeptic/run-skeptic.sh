#!/bin/bash
# Skeptic's probes for repair R2.  Each probe is run under the interpreter and
# through the compiler path, and both outputs are kept beside it.
source /home/user/fortress-r2/tmp/skeptic/env.sh
P=/home/user/fortress-r2/explorations/compile-ladder/repair-r2-literal-wrap/probes/skeptic
cd "$P" || exit 1
for p in "$@" ; do
    [ -f "$p.fss" ] || { echo "no $p.fss"; continue; }
    echo "--- $p walk $(date +%T)"
    "$FORTRESS_HOME"/bin/fortress walk "$p.fss" > "$p.walk" 2>&1
    echo "walk exit $?"
    rm -f "$FORTRESS_HOME"/default_repository/caches/bytecode_cache/$p.jar
    touch "$p.fss"
    echo "--- $p compile $(date +%T)"
    "$FORTRESS_HOME"/bin/fortress compile "$p.fss" > "$p.compile" 2>&1
    echo "compile exit $?"
    "$FORTRESS_HOME"/bin/fortress run "$p" > "$p.compiled" 2>&1
    echo "run exit $?"
done
echo "=== done $(date +%T)"
