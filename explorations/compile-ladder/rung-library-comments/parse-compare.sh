#!/bin/bash
# Rung C: parse Library/FortressLibrary.fss and .fsi as they are at <base-commit> and as they are in
# the working tree, with the tree's own parser (bin/fortress parse -out), and compare the two parse
# trees with every source position mapped back to the base numbering (ast-compare.py); see REPORT.md.
# usage, from $FORTRESS_HOME after ant compileAll: parse-compare.sh <base-commit> <scratch-dir>
set -u
BASE=$1 ; S=$2
D=$(cd "$(dirname "$0")" && pwd)
mkdir -p "$S/base/Library"
for f in fss fsi ; do
    git show "$BASE:Library/FortressLibrary.$f" > "$S/base/Library/FortressLibrary.$f"
    ( cd "$S/base" && "$FORTRESS_HOME/bin/fortress" parse -out "$S/pre-$f.tfs" "Library/FortressLibrary.$f" ) | head -1 | sed "s/^/base $f: /"
    "$FORTRESS_HOME/bin/fortress" parse -out "$S/post-$f.tfs" "Library/FortressLibrary.$f" | head -1 | sed "s/^/tree $f: /"
    python3 "$D/ast-compare.py" "$BASE" "Library/FortressLibrary.$f" "$S/pre-$f.tfs" "$S/post-$f.tfs"
    echo "ast-compare exit=$? (0 identical, 2 only span ends moved onto inserted lines, 1 anything else)"
done
