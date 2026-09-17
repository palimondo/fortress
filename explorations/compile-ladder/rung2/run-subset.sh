#!/bin/bash
# Re-run the compile-path ladder on the files whose first error was the rung's
# missing name.  Same steps and same private-cache discipline as
# explorations/compile-ladder/run-ladder.sh; the file list is read from
# explorations/compile-ladder/rung2/subset.txt (one "corpus/file" per line).
set -u
source "$(dirname "${BASH_SOURCE[0]}")/../../../experiment/env.sh"

ROOT="${LADDER_ROOT:-/tmp/claude-0/-home-user-fortress/bdff267d-67dc-5bb9-b970-8c3dfaa634b6/scratchpad}/rung2"
export FORTRESS_CACHES="$ROOT/caches"
export JAVA_FLAGS="-Xmx2g -Xss64m -Dfortress.caches=$ROOT/caches -Djava.io.tmpdir=$ROOT/tmp"
OUT="$FORTRESS_HOME/explorations/compile-ladder/rung2"
RAW="$OUT/raw"
mkdir -p "$RAW" "$ROOT/tmp" "$ROOT/caches"

cd "$FORTRESS_HOME/ProjectFortress" || exit 1
for f in LibraryBuiltin/AnyType.fss LibraryBuiltin/CompilerBuiltin.fss \
         ../Library/CompilerLibrary.fss ../Library/CompilerAlgebra.fss \
         ../Library/CompilerSystem.fss ; do
    echo "library: $f"
    timeout 600 ../bin/fortress compile "$f" || { echo "LIBRARY BUILD FAILED on $f"; exit 1; }
done
timeout 200 ../bin/fortress compile library_tests/Integer1.fss > /dev/null 2>&1 &&
    timeout 60 ../bin/fortress run Integer1 2>&1 | grep -q PASS ||
    { echo "SANITY FAILED"; exit 1; }
echo "sanity ok"

: > "$OUT/results.tsv"
while read -r line; do
    [ -n "$line" ] || continue
    path="$line"
    base=$(basename "$path")
    comp=$(sed -n 's/^[[:space:]]*\(component\|api\)[[:space:]]\+\([A-Za-z0-9_.]\+\).*/\2/p' "$path" | head -1)
    [ -n "$comp" ] || comp="${base%.*}"
    timeout -k 5 120 ../bin/fortress compile "$path" > "$RAW/$base.compile" 2>&1
    crc=$?
    rrc=""
    if [ "$crc" -eq 0 ]; then
        timeout -k 5 60 ../bin/fortress run "$comp" > "$RAW/$base.run" 2>&1
        rrc=$?
    fi
    printf '%s\t%s\t%s\t%s\n' "$path" "$comp" "$crc" "$rrc" >> "$OUT/results.tsv"
    echo "$path crc=$crc rrc=$rrc"
    rm -rf "$ROOT/tmp"/fortress*rats
done < "$OUT/subset.txt"
