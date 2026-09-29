#!/bin/bash
# harness-one.sh <scratch-dir> <file.fss>... : rung C's harness-one.sh (explorations/compile-ladder/
# rung-interp-coercion/, itself rung I's shape): the testSystem harness (SystemJUTest, the class build.xml's
# testSystem shards run) over a directory holding only the named test files, with the JVM settings of
# build.xml's systemShard macro and a private cache. Run from FORTRESS_HOME with explorations/experiment/env.sh.
set -u
S=${1:?scratch dir} ; shift
FH=${FORTRESS_HOME:?}
rm -rf "$S" ; mkdir -p "$S/tests" "$S/caches" "$S/tmp"
printf '\0\0\0\0' > "$S/caches/global.map"
for f in "$@" ; do cp "$f" "$S/tests/" ; done
CP=$("$FH/bin/fortress_classpath" 2>/dev/null | tail -1)
echo "# harness-one $(date -u +%FT%TZ); tree $(git -C "$FH" rev-parse --short HEAD); nproc=$(nproc); load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=1"
cd "$FH/ProjectFortress" && FORTRESS_THREADS=1 FORTRESS_JUNIT_VERBOSE=1 FORTRESS_CACHES="$S/caches" \
  java -Xmx768m -Xss32m -Djava.io.tmpdir="$S/tmp" -Dfortress.caches="$S/caches" -Dtests="$S/tests" \
       -Dfile.encoding=UTF-8 -cp "$CP" com.sun.fortress.tests.unit_tests.SystemJUTest 2>&1 | grep -v '^\s*at ' | sed "s#$FH/##g"
echo "exit=${PIPESTATUS[0]}"
rm -rf "$S"
