#!/bin/bash
# Phase A: the code generator repaired, FIntLiteral left as it was.  Measures the
# coupling REPAIR-BATCH.md asserts: asNN64 begins throwing once a numeral of bit
# length 64 keeps its decimal string.
source /home/user/fortress-r2/tmp/r2env.sh
cd /home/user/fortress-r2 || exit 1
P=explorations/compile-ladder/repair-r2-literal-wrap/probes
cp ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FIntLiteral.java /home/user/fortress-r2/tmp/FIntLiteral.java.repaired
git checkout -- ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FIntLiteral.java || exit 1
echo "=== FIntLiteral reverted; asNN32/asNN64 as the team left them ==="
ant compileAll > /home/user/fortress-r2/tmp/compileAll-phaseA.log 2>&1 || { echo "BUILD FAILED"; tail -30 /home/user/fortress-r2/tmp/compileAll-phaseA.log; exit 1; }
tail -3 /home/user/fortress-r2/tmp/compileAll-phaseA.log
# a compile whose source has not changed writes nothing, so the cached jar of
# every component this phase measures is removed and its source touched
rm -f default_repository/caches/bytecode_cache/{r2a,r2b,r2c,r2e,IntLiteralWrapRepairR2}.jar
touch $P/r2a.fss $P/r2b.fss $P/r2c.fss $P/r2e.fss ProjectFortress/compiler_tests/IntLiteralWrapRepairR2.fss
cd ProjectFortress || exit 1
../bin/fortress junit compiler_tests/IntLiteralWrapRepairR2.test > "../$P/junit-codegen-only.out" 2>&1
echo "junit done"
cd /home/user/fortress-r2/$P || exit 1
for p in r2a r2b r2c r2e ; do
    "$FORTRESS_HOME"/bin/fortress compile "$p.fss" > "$p.compile.codegen-only" 2>&1
    "$FORTRESS_HOME"/bin/fortress run "$p" > "$p.compiled.codegen-only" 2>&1
done
echo "=== phase A done $(date +%T) ==="
