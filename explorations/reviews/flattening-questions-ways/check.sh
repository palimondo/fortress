#!/bin/bash
# Run the bytecode compiler's phases through the static checker (-stop typecheck)
# over one probe with the INTERPRETER's library in scope (FortressLibrary /
# FortressBuiltin / AnyType), using the checker-count tool's driver WorldFlip.java,
# in a private cache; capture to <Name>.check.txt.
#   explorations/reviews/flattening-questions-ways/check.sh <Name>
D="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$D/../../experiment/env.sh"
N=$1
S=${SCRATCH:-/tmp}
C=$S/fqw-cache-check-$N
rm -rf "$C"; mkdir -p "$C" "$S/wf"
CP=$("$FORTRESS_HOME/bin/fortress_classpath" | tail -1)
test -f "$S/wf/WorldFlip.class" || javac -nowarn -cp "$CP" -d "$S/wf" "$FORTRESS_HOME/explorations/coordinator/tools/checker-count/WorldFlip.java" || exit 1
cd "$D"
timeout -k 10 900 java $JAVA_FLAGS -Dfortress.caches="$C" -cp "$S/wf:$CP" WorldFlip -stop typecheck "$N.fss" > "$N.check.txt" 2>&1
echo "rc=$?" >> "$N.check.txt"
cat "$N.check.txt"
