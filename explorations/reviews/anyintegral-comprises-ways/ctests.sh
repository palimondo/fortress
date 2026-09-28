#!/bin/bash
# ctests.sh <work-dir> <label> <shadow-classes-dir|none> [-Dname=value ...]
# The gate's compiler tests that declare a comprises clause (every .fss in ProjectFortress/compiler_tests/
# that contains the word), each type-checked in the compiler's own world by `Shell typecheck` from that
# directory, as their .test files compile them, with a private cache and an optional shadow ahead of the
# tree's classes. Writes <work-dir>/ctests-<label>/<file>.txt and prints one line per file: its closing
# "File ... has N errors." line, or "clean", with the expectation its XXX .test file pins, if any.
set -u
cd "$(dirname "$0")/../../.."                               # $FORTRESS_HOME
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
W=${1:?usage}; LBL=${2:?usage}; SH=${3:?usage}; shift 3
[ "$SH" = none ] && SH="" || SH="$(cd "$SH" && pwd):"
mkdir -p "$W/ctests-$LBL"; W=$(cd "$W" && pwd); O="$W/ctests-$LBL"
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
D=ProjectFortress/compiler_tests
C="$W/caches-ct-$LBL"; T="$W/tmp-ct-$LBL"
for f in $(grep -l comprises $D/*.fss | sort); do
  n=$(basename "$f"); rm -rf "$C" "$T"; mkdir -p "$C" "$T"
  ( cd $D && timeout -k 10 600 java -Xmx2g -Xss64m -Djava.io.tmpdir="$T" -Dfortress.caches="$C" "$@" \
      -cp "$SH$CP" com.sun.fortress.Shell typecheck "$n" ) > "$O/$n.txt" 2>&1
  r=$(grep -oE "File $n has [0-9]+ errors?\." "$O/$n.txt" | tail -1); [ -z "$r" ] && r="clean(rc=$(grep -c Exception "$O/$n.txt") exceptions)"
  x=$(grep -l "tests=${n%.fss}\s*$\|tests=$n\s*$" $D/XXX*.test 2>/dev/null | head -1)
  e=""; [ -n "$x" ] && e="  [$(basename $x): $(grep -A1 'compile_err_equals' $x | tail -1 | tr -d '\\' | sed 's/\\n//')]"
  echo "$n: $r$e"
done
rm -rf "$C" "$T"
