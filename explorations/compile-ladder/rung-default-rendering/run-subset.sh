#!/bin/bash
# Compile-path ladder, restricted to the files this rung can affect.
#
# A copy of ../run-ladder.sh with two changes: the ladder root and output
# directory are private to this worktree, and the two whole-corpus loops are
# replaced by one driven by subset.txt (corpus<TAB>file per line).
#
# Pushes every interpreter test program (ProjectFortress/tests/*.fss) and every
# file in ProjectFortress/not_working_library_tests/ through the compiler path
# unchanged and records how far each one gets.
#
# Reproduce:  bash explorations/compile-ladder/run-ladder.sh
# Outputs:    explorations/compile-ladder/raw/<corpus>/<name>.{compile,run}
#             explorations/compile-ladder/results.tsv
#
# The run uses a private cache tree so it never touches default_repository/caches
# (fortress.caches system property + FORTRESS_CACHES env; ProjectProperties.java:283,
# same mechanism the suite uses at build.xml:941-943), and a private java.io.tmpdir
# so the 5.8 MB Rats! temp directory of every grammar-importing run (RatsUtil.java:138-144)
# is swept per file instead of filling the disk.

set -u

source "$(dirname "${BASH_SOURCE[0]}")/../../../explorations/experiment/env.sh"

LADDER_ROOT="${LADDER_ROOT:-$FORTRESS_HOME/tmp/ladder-s}"
export LADDER_CACHES="$LADDER_ROOT/ladder-caches"
export LADDER_TMP="$LADDER_ROOT/ladder-tmp"
export FORTRESS_CACHES="$LADDER_CACHES"
export JAVA_FLAGS="-Xmx2g -Xss64m -Dfortress.caches=$LADDER_CACHES -Djava.io.tmpdir=$LADDER_TMP"

PRISTINE="$LADDER_ROOT/pristine"
OUT="$FORTRESS_HOME/explorations/compile-ladder/rung-default-rendering/${LADDER_RUN:?set LADDER_RUN to pre or post}"
RAW="$OUT/raw"
TSV="$OUT/results.tsv"

COMPILE_TIMEOUT=120
RUN_TIMEOUT=60
MIN_FREE_KB=512000

mkdir -p "$RAW/tests" "$RAW/not_working_library_tests" "$LADDER_TMP"

disk_guard () {
    local free
    free=$(df -P / | awk 'NR==2{print $4}')
    if [ "$free" -lt "$MIN_FREE_KB" ]; then
        echo "STOP: only ${free} KB free on / (floor ${MIN_FREE_KB} KB)" | tee -a "$OUT/ladder.log"
        exit 2
    fi
    echo "-- disk free ${free} KB, cache $(du -sm "$LADDER_CACHES" | cut -f1) MB"
}

# Step 1: the compiler-world library, in the order repo-internals.md gives.
build_library () {
    cd "$FORTRESS_HOME/ProjectFortress" || exit 1
    local f
    for f in LibraryBuiltin/AnyType.fss LibraryBuiltin/CompilerBuiltin.fss \
             ../Library/CompilerLibrary.fss ../Library/CompilerAlgebra.fss \
             ../Library/CompilerSystem.fss ; do
        echo "library: $f"
        timeout 600 ../bin/fortress compile "$f" || { echo "LIBRARY BUILD FAILED on $f"; exit 1; }
    done
}

# Step 2: one known-good compiled program must print PASS before the ladder starts.
sanity () {
    cd "$FORTRESS_HOME/ProjectFortress" || exit 1
    timeout 200 ../bin/fortress compile library_tests/Integer1.fss > /dev/null 2>&1 || return 1
    timeout 60 ../bin/fortress run Integer1 2>&1 | grep -q PASS
}

# Keep only the library's own cache entries; a program's entries are never reused.
prune_cache () {
    ( cd "$LADDER_CACHES" && find . -type f -print ) | sort > "$LADDER_TMP/.now"
    ( cd "$PRISTINE" && find . -type f -print ) | sort > "$LADDER_TMP/.keep"
    comm -23 "$LADDER_TMP/.now" "$LADDER_TMP/.keep" | while read -r p; do
        rm -f "$LADDER_CACHES/$p"
    done
}

component_of () {
    # component/api name as declared, which is what `fortress run` wants
    sed -n 's/^[[:space:]]*\(component\|api\)[[:space:]]\+\([A-Za-z0-9_.]\+\).*/\2/p' "$1" | head -1
}

run_one () {
    local corpus="$1" path="$2"
    local base name comp crc rrc t0 t1 ct rt
    base=$(basename "$path")
    name="${base%.*}"
    comp=$(component_of "$path")
    [ -n "$comp" ] || comp="$name"

    t0=$(date +%s)
    timeout -k 5 "$COMPILE_TIMEOUT" ../bin/fortress compile "$path" \
        > "$RAW/$corpus/$base.compile" 2>&1
    crc=$?
    t1=$(date +%s); ct=$((t1-t0))

    rrc=""
    rt=""
    if [ "$crc" -eq 0 ] && [ "${base##*.}" = "fss" ]; then
        t0=$(date +%s)
        timeout -k 5 "$RUN_TIMEOUT" ../bin/fortress run "$comp" \
            > "$RAW/$corpus/$base.run" 2>&1
        rrc=$?
        t1=$(date +%s); rt=$((t1-t0))
    fi

    printf '%s\t%s\t%s\t%s\t%s\t%s\t%s\n' \
        "$corpus" "$base" "$comp" "$crc" "$rrc" "$ct" "$rt" >> "$TSV"
    echo "$corpus/$base crc=$crc rrc=$rrc ${ct}s"
}

main () {
    echo "=== ladder start $(date -Is) ==="
    disk_guard
    if [ ! -d "$PRISTINE" ]; then
        build_library
        rm -rf "$PRISTINE"; cp -a "$LADDER_CACHES" "$PRISTINE"
    fi
    sanity || { echo "SANITY FAILED: library_tests/Integer1 did not print PASS"; exit 1; }
    echo "sanity ok: library_tests/Integer1 compiles and prints PASS"
    prune_cache

    : > "$TSV"
    cd "$FORTRESS_HOME/ProjectFortress" || exit 1

    local n=0 line corpus f
    while IFS=$'\t' read -r corpus f; do
        [ -n "$corpus" ] || continue
        run_one "$corpus" "$corpus/$f"
        n=$((n+1))
        rm -rf "${LADDER_TMP:?}"/fortress*rats
        if [ $((n % 10)) -eq 0 ]; then prune_cache; disk_guard; fi
    done < "$OUT/../subset.txt"
    prune_cache
    echo "=== ladder done $(date -Is), $n files ==="
    disk_guard
}

main "$@"
