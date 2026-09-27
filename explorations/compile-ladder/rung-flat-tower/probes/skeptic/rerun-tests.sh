#!/bin/bash
# rerun-tests.sh: the second skeptic's re-run of the rung's four gated interpreter tests under walk on the
# worktree's library, each at FORTRESS_THREADS=1 and 4, one JVM per run, a fresh private cache per run;
# then the testSystem harness over the three XXX files (harness-one.sh, FORTRESS_THREADS=1, absolute scratch dir).
cd /home/user/fortress-flat
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME=/home/user/fortress-flat
unset JAVA_TOOL_OPTIONS
W=/home/user/fortress-flat/tmp/sk2; mkdir -p $W/jtmp
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
bash explorations/compile-ladder/rung-flat-tower/machine.sh "skeptic 2 rerun-tests"
git log -1 --format='tree at %h %s'
git status --short Library ProjectFortress/LibraryBuiltin ProjectFortress/tests | sed 's/^/status: /'
for t in FlatTowerRungF XXXUnwrittenSumRungF XXXRR32MixedRungF XXXEmptyGroupSumRungF; do
  for n in 1 4; do
    C=$W/cache-$t-$n; rm -rf $C; mkdir -p $C; printf '\0\0\0\0' > $C/global.map
    echo "=== $t walk FORTRESS_THREADS=$n"
    FORTRESS_THREADS=$n FORTRESS_CACHES=$C timeout -k 10 600 java -Xmx4g -Xss64m -Djava.io.tmpdir=$W/jtmp -Dfile.encoding=UTF-8 -cp "$CP" com.sun.fortress.Shell walk ProjectFortress/tests/$t.fss < /dev/null 2>&1 | grep -v '^\s*at \|^Picked up' | sed 's#/home/user/fortress-flat/##g' | head -12
    echo "rc=${PIPESTATUS[0]}"
  done
done
echo "=== harness-one.sh over the three XXX files"
bash explorations/compile-ladder/rung-interp-coercion/harness-one.sh $W/harness ProjectFortress/tests/XXXUnwrittenSumRungF.fss ProjectFortress/tests/XXXRR32MixedRungF.fss ProjectFortress/tests/XXXEmptyGroupSumRungF.fss 2>&1 | grep -v '^\s*at \|^Picked up' | sed 's#/home/user/fortress-flat/##g' | grep -i 'expected\|Tests run\|^OK\|FAIL\|XXX' | head -30
echo "done $(date -u +%FT%TZ)"
