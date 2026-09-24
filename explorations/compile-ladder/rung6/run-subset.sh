#!/bin/bash
# Re-run the compile-path ladder on the files this rung's defect blocks, the
# stubbed IntLiteral operator family that throws CompilerFailureDetectedAtRunTime.  Same
# steps and same private-cache discipline as explorations/compile-ladder/run-ladder.sh; the
# file list is read from explorations/compile-ladder/rung6/subset.txt (one
# "corpus/file" per line).
#
# $1 is the output label, "before" or "after"; $2 is an optional classpath
# prefix, kept from the rung 3 copy and unused here -- a library rung needs no
# shadow build, fortress compile reads the edited .fss directly.
set -u
source "$(dirname "${BASH_SOURCE[0]}")/../../../explorations/experiment/env.sh"

LABEL="${1:-after}"
PREFIX="${2:-}"
ROOT="${LADDER_ROOT:-/tmp/claude-0/-home-user-fortress/bdff267d-67dc-5bb9-b970-8c3dfaa634b6/scratchpad}/rung6"
export FORTRESS_CACHES="$ROOT/caches"
export JAVA_FLAGS="-Xmx2g -Xss64m -Dfortress.caches=$ROOT/caches -Djava.io.tmpdir=$ROOT/tmp"
OUT="$FORTRESS_HOME/explorations/compile-ladder/rung6"
if [ "$LABEL" = before ]; then RAW="$OUT/raw-before"; RES="$OUT/results-before.tsv"
else RAW="$OUT/raw"; RES="$OUT/results.tsv"; fi
CP=$("$FORTRESS_HOME"/bin/fortress_classpath | tail -1)
rm -rf "$ROOT"
mkdir -p "$RAW" "$ROOT/tmp" "$ROOT/caches"

fc () { timeout -k 5 200 java $JAVA_FLAGS -Dfile.encoding=UTF-8 -cp "$PREFIX$CP" com.sun.fortress.Shell compile "$@"; }
# the run step loads emitted bytecode through MainWrapper; no shadow needed there
fr () { timeout -k 5 60 "$FORTRESS_HOME"/bin/run "$@"; }

cd "$FORTRESS_HOME/ProjectFortress" || exit 1
for f in LibraryBuiltin/AnyType.fss LibraryBuiltin/CompilerBuiltin.fss \
         ../Library/CompilerLibrary.fss ../Library/CompilerAlgebra.fss \
         ../Library/CompilerSystem.fss ; do
    echo "library: $f"
    fc "$f" || { echo "LIBRARY BUILD FAILED on $f"; exit 1; }
done
fc library_tests/Integer1.fss > /dev/null 2>&1 &&
    fr Integer1 2>&1 | grep -q PASS ||
    { echo "SANITY FAILED"; exit 1; }
echo "sanity ok"

: > "$RES"
while read -r line; do
    [ -n "$line" ] || continue
    path="$line"
    base=$(basename "$path")
    comp=$(sed -n 's/^[[:space:]]*\(component\|api\)[[:space:]]\+\([A-Za-z0-9_.]\+\).*/\2/p' "$path" | head -1)
    [ -n "$comp" ] || comp="${base%.*}"
    fc "$path" > "$RAW/$base.compile" 2>&1
    crc=$?
    rrc=""
    if [ "$crc" -eq 0 ]; then
        fr "$comp" > "$RAW/$base.run" 2>&1
        rrc=$?
    fi
    printf '%s\t%s\t%s\t%s\n' "$path" "$comp" "$crc" "$rrc" >> "$RES"
    echo "$path crc=$crc rrc=$rrc"
    rm -rf "$ROOT/tmp"/fortress*rats
done < "$OUT/subset.txt"
