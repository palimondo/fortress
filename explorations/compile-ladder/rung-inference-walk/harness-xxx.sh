#!/bin/bash
# harness-xxx.sh : row 486's expected failure through the testSystem harness itself (SystemJUTest, the class
# build.xml's testSystem shards run, over a directory holding only the file, -Dtests=<that directory>), first
# the committed file, then a scratch copy whose NN32 binding is written u: NN32 = unsigned(n), a stand-in for a
# repair of walk (the shape of rung-unknown-size-arm/probes/walk-xxx-red.sh and of rung S's
# xxx-inferred-harness.txt); no walk edit, the committed file untouched. Source explorations/experiment/env.sh.
set -u
FH=${FORTRESS_HOME:?}
T=XXXNatValueNN32RungK
CP=$("$FH/bin/fortress_classpath" 2>/dev/null | tail -1)
echo "# harness-xxx $(date -u +%FT%TZ); tree $(git -C "$FH" rev-parse --short HEAD); nproc=$(nproc); load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=1"
run () {   # run <label> <dir>
  echo "########## $1"
  ( cd "$FH/ProjectFortress" && FORTRESS_THREADS=1 FORTRESS_JUNIT_VERBOSE=1 FORTRESS_CACHES="$2/caches" \
      java -Xmx768m -Xss32m -Djava.io.tmpdir="$2/tmp" -Dfortress.caches="$2/caches" -Dtests="$2/tests" \
           -Dfile.encoding=UTF-8 -cp "$CP" com.sun.fortress.tests.unit_tests.SystemJUTest 2>&1 \
      | grep -v '^\s*at ' | sed "s#$FH/##g"; echo "exit=${PIPESTATUS[0]}" )
}
for k in committed standin ; do
  S="$FH/tmp/harness-xxx-$k"; rm -rf "$S"; mkdir -p "$S/tests" "$S/caches" "$S/tmp"
  printf '\0\0\0\0' > "$S/caches/global.map"
  if [ $k = committed ]; then
    cp "$FH/ProjectFortress/tests/$T.fss" "$S/tests/"
    cmp "$FH/ProjectFortress/tests/$T.fss" "$S/tests/$T.fss" && echo "the copy is the committed file"
  else
    sed 's/  u: NN32 = n$/  u: NN32 = unsigned(n)/' "$FH/ProjectFortress/tests/$T.fss" > "$S/tests/$T.fss"
    echo "the scratch copy's diff against the committed file:"; diff "$FH/ProjectFortress/tests/$T.fss" "$S/tests/$T.fss"
  fi
  run "$k" "$S"
  rm -rf "$S"
done
git -C "$FH" status --short ProjectFortress/tests/$T.fss
