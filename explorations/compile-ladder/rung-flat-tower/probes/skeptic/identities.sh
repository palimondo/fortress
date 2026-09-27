#!/bin/bash
# identities.sh: the second skeptic's probe of the identity branches FlatTowerRungF's group 3 does not assert (the NN32, NN64 and RR32
# zeros; the ZZ64, NN32, NN64, ZZ, QQ and RR32 ones), under walk on the flat library and the base (e5414f5bf shadow copies), at
# FORTRESS_THREADS=1 and 4, fresh private caches.
cd /home/user/fortress-flat
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME=/home/user/fortress-flat
unset JAVA_TOOL_OPTIONS
W=/home/user/fortress-flat/tmp/sk2/id; rm -rf $W; mkdir -p $W/flat $W/base $W/jtmp
for f in $(git diff --name-only e5414f5bf -- Library ProjectFortress/LibraryBuiltin); do git show e5414f5bf:$f > $W/base/$(basename $f); done
P=explorations/compile-ladder/rung-flat-tower/probes/skeptic/r2/SkIdentities.fss; cp $P $W/flat/; cp $P $W/base/
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
bash explorations/compile-ladder/rung-flat-tower/machine.sh "skeptic 2 identities"
for l in flat base; do for t in 1 4; do
  C=$W/cache-$l-$t; mkdir -p $C; printf '\0\0\0\0' > $C/global.map
  echo "=== SkIdentities walk $l library FORTRESS_THREADS=$t"
  FORTRESS_THREADS=$t FORTRESS_CACHES=$C timeout -k 10 600 java -Xmx3g -Xss64m -Djava.io.tmpdir=$W/jtmp -Dfile.encoding=UTF-8 -cp "$CP" com.sun.fortress.Shell walk $W/$l/SkIdentities.fss < /dev/null 2>&1 | grep -v '^\s*at \|^Picked up\|^Turn on\|^java.lang.Throwable' | sed "s#$W/##g; s#/home/user/fortress-flat/##g" | head -14
  echo "rc=${PIPESTATUS[0]}"
done; done
echo "done $(date -u +%FT%TZ)"
