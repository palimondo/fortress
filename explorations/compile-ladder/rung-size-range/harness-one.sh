#!/bin/bash
# The shape of explorations/compile-ladder/rung-int-semantics-walk/probes/harness-one.sh, with one addition:
# CLASSES=<dir>, when set, is put ahead of the classpath (a class overlay for a deliberate local fix).
# Runs the testSystem harness (SystemJUTest, the class build.xml's testSystem shards run) over a directory
# holding only the named test files, with the JVM settings of build.xml's systemShard macro. Usage, from
# FORTRESS_HOME with the environment of explorations/experiment/env.sh: harness-one.sh <scratch-dir> <file.fss>...
set -u
S=${1:?scratch dir} ; shift
FH=${FORTRESS_HOME:?}
rm -rf "$S" ; mkdir -p "$S/tests" "$S/caches" "$S/tmp"
for f in "$@" ; do cp "$f" "$S/tests/" ; done
CP=$("$FH/bin/fortress_classpath" 2>/dev/null | tail -1)
[ -n "${CLASSES:-}" ] && CP="$CLASSES:$CP"
cd "$FH/ProjectFortress" && FORTRESS_THREADS=1 FORTRESS_CACHES="$S/caches" \
  java -Xmx768m -Xss32m -Djava.io.tmpdir="$S/tmp" -Dfortress.caches="$S/caches" -Dtests="$S/tests" \
       -cp "$CP" com.sun.fortress.tests.unit_tests.SystemJUTest
