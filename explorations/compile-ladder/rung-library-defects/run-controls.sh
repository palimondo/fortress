#!/bin/bash
# run-controls.sh <out-dir> [test ...]: run each ProjectFortress/tests program through the
# interpreter and write <out-dir>/<name>.txt with its combined output and exit status.
# Run from $FORTRESS_HOME with experiment/env.sh sourced.
set -u
OUT=$1 ; shift
mkdir -p "$OUT"
TESTS=${*:-"ArrayListQuick PureListQuick CovariantTest StringTests Generator2Test ArrayScalarExtension"}
for t in $TESTS ; do
    ( cd "$FORTRESS_HOME/ProjectFortress/tests" && "$FORTRESS_HOME/bin/fortress" "$t.fss" ) > "$OUT/$t.txt" 2>&1
    echo "EXIT=$?" >> "$OUT/$t.txt"
    echo "$t $(tail -1 "$OUT/$t.txt")"
done
