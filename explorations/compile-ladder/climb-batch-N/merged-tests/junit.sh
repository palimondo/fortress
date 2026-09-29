#!/bin/bash
# junit.sh <label> <dir-of-tests> <Name.test>... : the gather of climb batch N runs each .test through the
# harness in the main tree (fortress junit, the compiled test harness, as climb batch 6.5's gather ran its pair),
# in the order given, so that a link test runs before its XXX run test. Each named component's cache entries are
# removed before the list and after it. First line: the machine line (protocol.md, principle 2).
# ONE_JVM=1 (added 2026-09-29 for the repair on the merged tree, coordinator/climb-batch-workflow.md, "A repair
# of tests and records only"): the whole list in one fortress junit run, one JVM, as the gate's track runs them
# together; Shell junit hands the list to FileTests.suiteFromListOfFiles (Shell.java:1086), which puts its
# compile and link tests before its run tests (FileTests.java:997-1004), so a link test still runs first.
source "$(dirname "$0")/../../../experiment/env.sh"
FH=$FORTRESS_HOME; L=${1:?label}; D=$(cd "${2:?dir}" && pwd); shift 2
cd "$FH/ProjectFortress"
CP=$(../bin/fortress_classpath | tail -1)
echo "# junit.sh $L $(date -u +%FT%TZ); nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //') MHz; load at start $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS; tree $(git -C $FH rev-parse --short HEAD)$(git -C $FH diff --quiet HEAD -- ProjectFortress Library || echo ' with the next rung applied, not yet committed'); tests from $D"
clean () { for t in "$@"; do n=$(sed -n 's/^tests=//p' "$D/$t" | head -1); [ -n "$n" ] && find ../default_repository/caches -name "*$n*" -exec rm -rf {} + 2>/dev/null; done; }
clean "$@"
if [ -n "${ONE_JVM:-}" ]; then
  files=(); for t in "$@"; do files+=("$D/$t"); done
  echo "########## [$L] fortress junit, one JVM: $*"
  java $JAVA_FLAGS -Dfile.encoding=UTF-8 -cp "$CP" com.sun.fortress.Shell junit "${files[@]}" 2>&1 | sed "s#$FH/##g" | grep -v '^\s*at ' | cut -c1-240
  echo "exit=${PIPESTATUS[0]}"
else
for t in "$@"; do
  echo "########## [$L] fortress junit $t"
  java $JAVA_FLAGS -Dfile.encoding=UTF-8 -cp "$CP" com.sun.fortress.Shell junit "$D/$t" 2>&1 | sed "s#$FH/##g" | grep -v '^\s*at ' | cut -c1-240
  echo "exit=${PIPESTATUS[0]}"
done
fi
clean "$@"
