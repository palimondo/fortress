#!/bin/bash
# The repair after climb batch 7C's merged-diff review: row 492's two XXX tests and their variants without
# f(t: T), on the main tree's build as the gate left it (no class overlay; the shape of
# climb-batch-7C/merged-tests/junit-y.sh). Writes walk.txt, walk-harness.txt, compiled-junit.txt and red.txt
# beside this script, each headed by its machine line. Each test's own cache entries are removed before each run.
# usage: bash explorations/compile-ladder/climb-batch-7C/repair/run-tests.sh
source "$(dirname "$0")/../../../experiment/env.sh"
export TMPDIR="$FORTRESS_HOME/tmp"
export JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$TMPDIR"
D="$FORTRESS_HOME/explorations/compile-ladder/climb-batch-7C/repair"
R=explorations/compile-ladder/climb-batch-7C/repair
cd "$FORTRESS_HOME/ProjectFortress"
CP=$(../bin/fortress_classpath | tail -1)
machine () { echo "# nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //') MHz; load at start $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS; tree $(git -C "$FORTRESS_HOME" rev-parse --short HEAD) with the repair's files in the working tree; $(date -u +%FT%TZ)"; }
clean () { find ../default_repository/caches -name "*$1*" -exec rm -rf {} + 2>/dev/null; }
walk () { # walk <file.fss>, from FORTRESS_HOME
  clean "$(basename "$1" .fss)"
  echo "########## FORTRESS_THREADS=1 bin/fortress $1"
  ( cd "$FORTRESS_HOME" && FORTRESS_THREADS=1 bin/fortress "$1" 2>&1 ) | sed "s#$FORTRESS_HOME/##g"
  echo "exit=${PIPESTATUS[0]}"
}
harness () { # harness <scratch> <file.fss>, the testSystem harness over the one file
  clean "$(basename "$2" .fss)"
  echo "########## explorations/compile-ladder/rung-interp-coercion/harness-one.sh $2"
  ( cd "$FORTRESS_HOME" && explorations/compile-ladder/rung-interp-coercion/harness-one.sh "$1" "$2" 2>&1 ) \
    | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at '
  echo "exit=${PIPESTATUS[0]}"
}
junit () { # junit <test>, from ProjectFortress
  clean "$(basename "$1" .test)"
  echo "########## fortress junit $1"
  java $JAVA_FLAGS -Dfile.encoding=UTF-8 -cp "$CP" com.sun.fortress.Shell junit "$1" 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at '
  echo "exit=${PIPESTATUS[0]}"
  echo "# the component's cache entries after the run (a jar in bytecode_cache: the program compiled):"
  find ../default_repository/caches -name "*$(basename "$1" .test)*" | sed 's#^\.\./#  #' | sort
}
{ machine; walk ProjectFortress/tests/XXXComprisesMeetWalk.fss; } > "$D/walk.txt"
{ machine; harness "$TMPDIR/h-meet" ProjectFortress/tests/XXXComprisesMeetWalk.fss; } > "$D/walk-harness.txt"
{ machine; junit compiler_tests/XXXComprisesMeetCompiled.test; } > "$D/compiled-junit.txt"
{ machine
  echo "# the variants without f(t: T), where f(V) is more specific than f(S) and the overloading is valid on both paths"
  walk $R/XXXComprisesMeetWalkNoT.fss
  harness "$TMPDIR/h-meet-noT" $R/XXXComprisesMeetWalkNoT.fss
  junit ../$R/XXXComprisesMeetCompiledNoT.test
} > "$D/red.txt"
clean XXXComprisesMeetCompiledNoT; clean XXXComprisesMeetWalkNoT
