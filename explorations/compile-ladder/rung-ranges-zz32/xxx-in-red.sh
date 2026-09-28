#!/bin/bash
# xxx-in-red.sh <out-file>: compiler_tests/RangeInRungJLink.test and XXXRangeInRungJ.test through the junit harness
# (fortress junit), against a private copy of default_repository/caches (compiled-case.sh's shape), three times: as the
# tree stands; with a deliberate local fix of the compiler library's IN on a range (FilteredRange given
# opr IN(x, self) = lo <= x AND x <= hi AND p(x), Library/CompilerLibrary.fss, CompilerLibrary, CompilerAlgebra and
# CompilerSystem recompiled into the private cache), where the XXX file must go red; and with the fix undone
# (git checkout of the file, the three recompiled again), where it must be an expected failure again.
set -u
cd "$(dirname "$0")/../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH"
export FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
OUT=$1
S="$FORTRESS_HOME/tmp/xxx-in"; rm -rf "$S"; mkdir -p "$S/tmp"
cp -a default_repository/caches "$S/caches"
export FORTRESS_CACHES="$S/caches" JAVA_FLAGS="-Xmx2g -Xss64m -Dfortress.caches=$S/caches -Djava.io.tmpdir=$S/tmp"
junit () {
  ( cd ProjectFortress && for t in RangeInRungJLink XXXRangeInRungJ; do
      echo "\$ fortress junit compiler_tests/$t.test"
      timeout 900 ../bin/fortress junit compiler_tests/$t.test < /dev/null 2>&1 | sed "s#$FORTRESS_HOME/##g" \
        | grep -v '^\s*at java\.base\|^\s*at junit\.\|^\s*at org\.junit\|^\s*at jdk\.internal\|^\s*at com\.sun\.fortress\.\(tests\|repository\|compiler\|Shell\)'
      echo "junit rc=${PIPESTATUS[0]}"
    done )
}
relib () {
  ( cd ProjectFortress && for f in ../Library/CompilerLibrary.fss ../Library/CompilerAlgebra.fss ../Library/CompilerSystem.fss; do
      timeout 900 ../bin/fortress compile "$f" < /dev/null > "$S/relib.txt" 2>&1; echo "compile $(basename $f) rc=$?"
    done )
}
{
bash explorations/compile-ladder/rung-ranges-zz32/machine.sh "xxx-in-red: 1. the tree as it stands"
junit
bash explorations/compile-ladder/rung-ranges-zz32/machine.sh "xxx-in-red: 2. a deliberate local fix of IN in the compiler library"
python3 - <<'PY'
p = "Library/CompilerLibrary.fss"
s = open(p, encoding="utf-8").read()
a = "    getter asString(): String = \"filtered(\" lo.asString \":\" hi.asString \")\"\n"
assert s.count(a) == 1
s = s.replace(a, a + "    opr IN(x:ZZ32, self): Boolean = lo <= x AND x <= hi AND p(x)\n")
open(p, "w", encoding="utf-8").write(s)
PY
git diff --stat -- Library/CompilerLibrary.fss
relib
junit
bash explorations/compile-ladder/rung-ranges-zz32/machine.sh "xxx-in-red: 3. the fix undone"
git checkout -- Library/CompilerLibrary.fss
git diff --stat -- Library/CompilerLibrary.fss
relib
junit
} > "$OUT" 2>&1
git checkout -- Library/CompilerLibrary.fss
rm -rf "$S"
