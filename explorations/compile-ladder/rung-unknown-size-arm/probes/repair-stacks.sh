#!/bin/bash
# repair round: one unfiltered stack trace for each Java-level failure of probes/repair-diff.txt (no grep -v of the "at" lines, no head)
# usage: bash probes/repair-stacks.sh  (from the worktree, with tmp/sh.sh's variables set)
cd "$FORTRESS_HOME/ProjectFortress"
CP=$(../bin/fortress_classpath 2>/dev/null | tail -1)
BASE=$FORTRESS_HOME/tmp/sk-base/classes
P=../explorations/compile-ladder/rung-unknown-size-arm/probes
clean () { find ../default_repository/caches -name "*$1*" -exec rm -rf {} + 2>/dev/null; }
strip () { sed "s#$FORTRESS_HOME/##g;s#\.\./explorations/#explorations/#g"; }
echo "# machine: nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo); $(grep -m1 'cpu MHz' /proc/cpuinfo); load $(cat /proc/loadavg); $("$JAVA_HOME/bin/java" -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS"
shadow_compile () {
  clean $(basename $1 .fss)
  echo "################ compile with the untouched checker (tmp/sk-base/classes first on the classpath): $1"
  timeout 300 "$JAVA_HOME/bin/java" $JAVA_FLAGS -Dfile.encoding=UTF-8 -cp "$BASE:$CP" com.sun.fortress.Shell compile $1 2>&1 | strip; echo "exit=${PIPESTATUS[0]}"
}
rung_compile () {
  clean $(basename $1 .fss)
  echo "################ compile with the rung's checker: $1"
  timeout 300 ../bin/fortress compile $1 2>&1 | strip; echo "exit=${PIPESTATUS[0]}"
}
rung_run () {
  echo "################ run: $1"
  timeout 120 ../bin/fortress run $1 2>&1 | strip; echo "exit=${PIPESTATUS[0]}"
}
shadow_compile compiler_tests/XXXNatUnknownSizeFnValue.fss
rung_compile $P/diff/UkFnDead.fss
rung_compile $P/diff/UkFnPlain.fss
rung_compile $P/skeptic/SkDynZZ32Val.fss
rung_run SkDynZZ32Val
rung_compile $P/skeptic/SkTypeRangeSingle.fss
rung_run SkTypeRangeSingle
for c in XXXNatUnknownSizeFnValue UkFnDead UkFnPlain SkDynZZ32Val SkTypeRangeSingle; do clean $c; done
