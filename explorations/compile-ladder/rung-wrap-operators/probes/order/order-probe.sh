#!/bin/bash
# order-probe.sh <library-commit> <k-max>: runs ProjectFortress/tests/XXXInheritedOverload.fss under walk with
# Library/FortressLibrary.fss taken from <library-commit> plus k unrelated private declarations
# (trait OrderProbeDummy<i> end, or with MODE=fn orderProbeDummy<i>(x: ZZ32): ZZ32 = x, inserted before the
# component's closing end), for k = 0..<k-max>, and prints
# which of the test's two overloads the ambiguity message names first.  One JVM per k, private empty caches,
# the classes of tmp/build-stock first on the classpath, and the JVM flags of $JFLAGS (empty by default).
# The library file is restored from <library-commit>
# at the end.  Run from $FORTRESS_HOME.
set -u
C=${1:?usage}; K=${2:?usage}
L=Library/FortressLibrary.fss
W=tmp/order-probe; mkdir -p "$W"
CP="$(pwd)/tmp/build-stock:$(./bin/fortress_classpath 2>/dev/null | tail -1)"
for k in $(seq 0 "$K"); do
  git show "$C:$L" > "$W/lib.fss"
  n=$(grep -n '^end$' "$W/lib.fss" | tail -1 | cut -d: -f1)
  { head -n $((n-1)) "$W/lib.fss"; for i in $(seq 1 "$k"); do if [ "${MODE:-trait}" = fn ]; then echo "orderProbeDummy$i(x: ZZ32): ZZ32 = x"; else echo "trait OrderProbeDummy$i end"; fi; done; tail -n +"$n" "$W/lib.fss"; } > "$L"
  rm -rf "$W/caches-$k"; mkdir -p "$W/caches-$k"; printf '\0\0\0\0' > "$W/caches-$k/global.map"
  FORTRESS_CACHES="$W/caches-$k" java -Xmx4g -Xss64m -Djava.io.tmpdir=tmp ${JFLAGS:-} -Dfile.encoding=UTF-8 -cp "$CP" \
      com.sun.fortress.Shell walk ProjectFortress/tests/XXXInheritedOverload.fss > "$W/out-$k.txt" 2>&1
  rc=$?
  first=$(grep -m1 '(first) a(' "$W/out-$k.txt" | sed 's/.*(first) \(a([^)]*)\).*XXXInheritedOverload.fss:\([0-9]*\):.*/\1 :\2/')
  echo "k=$k rc=$rc first: $first"
done
git show "$C:$L" > "$L"
