#!/bin/bash
# junit-new.sh <out-file>: compiler_tests/RangeEqRungJLink.test, XXXRangeEqRungJ.test and XXXExtremumRungJ.test through
# the junit harness (fortress junit), against a private copy of default_repository/caches (compiled-case.sh's shape),
# adapted from explorations/compile-ladder/rung-ranges-zz32/xxx-in-red.sh: as the tree stands; with a deliberate local
# fix of the compiler library's = on two ranges (Library/CompilerLibrary.fss:314 given a body that compares the two
# ranges' elements, CompilerLibrary, CompilerAlgebra and CompilerSystem recompiled into the private cache), where the
# XXX file of row 481 must go red; and with the fix undone (git checkout of the file, the three recompiled again),
# where it must be an expected failure again.
set -u
cd "$(dirname "$0")/../../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH"
export FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
OUT=$1
J=explorations/compile-ladder/rung-ranges-zz32
S="$FORTRESS_HOME/tmp/xxx-repair-7r"; rm -rf "$S"; mkdir -p "$S/tmp"
cp -a default_repository/caches "$S/caches"
export FORTRESS_CACHES="$S/caches" JAVA_FLAGS="-Xmx2g -Xss64m -Dfortress.caches=$S/caches -Djava.io.tmpdir=$S/tmp"
junit () {
  ( cd ProjectFortress && for t in "$@"; do
      echo "\$ fortress junit compiler_tests/$t.test"
      timeout 900 ../bin/fortress junit compiler_tests/$t.test < /dev/null 2>&1 | sed "s#$FORTRESS_HOME/##g" \
        | grep -v '^\s*at java\.base\|^\s*at junit\.\|^\s*at org\.junit\|^\s*at jdk\.internal\|^\s*at com\.sun\.fortress\.\(tests\|repository\|compiler\|Shell\)'
      echo "junit rc=${PIPESTATUS[0]}"
    done )
}
relib () {
  ( cd ProjectFortress && for f in ../Library/CompilerLibrary.fss ../Library/CompilerAlgebra.fss ../Library/CompilerSystem.fss; do
      timeout 900 ../bin/fortress compile "$f" < /dev/null > "$S/relib.txt" 2>&1; rc=$?; echo "compile $(basename $f) rc=$rc"
      [ "$rc" -ne 0 ] && sed "s#$FORTRESS_HOME/##g" "$S/relib.txt" | grep -v '^\s*at '
    done )
}
{
bash $J/machine.sh "junit-new: 1. the tree as it stands"
junit RangeEqRungJLink XXXRangeEqRungJ XXXExtremumRungJ
bash $J/machine.sh "junit-new: 2. a deliberate local fix of = in the compiler library"
python3 - <<'PY'
p = "Library/CompilerLibrary.fss"
s = open(p, encoding="utf-8").read()
a = "opr =(left:GeneratorZZ32, right:GeneratorZZ32): Boolean = false\n"
assert s.count(a) == 1
s = s.replace(a, "opr =(left:GeneratorZZ32, right:GeneratorZZ32): Boolean =\n"
                 "    left.seqgenerate(StringConcatenation, fn (i:ZZ32) => i.asString || \",\") =\n"
                 "      right.seqgenerate(StringConcatenation, fn (i:ZZ32) => i.asString || \",\")\n")
open(p, "w", encoding="utf-8").write(s)
PY
git diff --stat -- Library/CompilerLibrary.fss
relib
junit RangeEqRungJLink XXXRangeEqRungJ
bash $J/machine.sh "junit-new: 3. the fix undone"
git checkout -- Library/CompilerLibrary.fss
git diff --stat -- Library/CompilerLibrary.fss
relib
junit RangeEqRungJLink XXXRangeEqRungJ
} > "$OUT" 2>&1
git checkout -- Library/CompilerLibrary.fss
rm -rf "$S"
