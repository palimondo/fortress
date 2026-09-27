#!/bin/bash
# Row 418's walk test restated to the NN32 range at rung R's follow-up landing (POSITIONS 2026-09-27, a size's range):
# walked, compiled and run, then through SystemJUTest as the gate runs it, then a scratch copy with the size 7 (which walk
# reads right) through SystemJUTest, to show the harness path red on a passing copy; no walk edit.
# usage, from the main tree after ant compileAll and the library-order cache rebuild:
#   source explorations/experiment/env.sh; bash explorations/compile-ladder/climb-batch-6/followup-R/row418-test.sh
T=XXXNatBigSizeWalk
S="$FORTRESS_HOME/tmp/followup-R-row418"
rm -rf "$S"; mkdir -p "$S/walk-caches" "$S/junit-caches" "$S/red-caches" "$S/test" "$S/red"
echo "# machine nproc $(nproc), $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'), $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/.*: //') MHz, $(java -version 2>&1 | head -1), FORTRESS_THREADS=$FORTRESS_THREADS, load $(cut -d' ' -f1-3 /proc/loadavg), $(date -u +%FT%TZ)"
cd "$FORTRESS_HOME/ProjectFortress"
echo "########## walk tests/$T.fss (FORTRESS_CACHES=<empty private directory>)"
FORTRESS_CACHES="$S/walk-caches" timeout 300 ../bin/fortress walk tests/$T.fss 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at '
echo "exit=${PIPESTATUS[0]}"
echo "########## fortress compile tests/$T.fss"
find ../default_repository/caches -name "*$T*" -exec rm -rf {} + 2>/dev/null
timeout 300 ../bin/fortress compile tests/$T.fss 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at '
echo "exit=${PIPESTATUS[0]}"
echo "########## fortress run $T"
timeout 120 ../bin/fortress run $T 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at '
echo "exit=${PIPESTATUS[0]}"
find ../default_repository/caches -name "*$T*" -exec rm -rf {} + 2>/dev/null
CP=$(../bin/fortress_classpath 2>/dev/null | tail -1)
cp tests/$T.fss "$S/test/$T.fss"
echo "########## SystemJUTest -Dtests=<a copy of tests/$T.fss alone> (FORTRESS_JUNIT_VERBOSE=1)"
FORTRESS_CACHES="$S/junit-caches" FORTRESS_JUNIT_VERBOSE=1 "$JAVA_HOME/bin/java" $JAVA_FLAGS -Dfile.encoding=UTF-8 -Dtests="$S/test" -cp "$CP" com.sun.fortress.tests.unit_tests.SystemJUTest 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at ' | grep -v 'shuffling seed'
echo "exit=${PIPESTATUS[0]}"
sed 's/4294967295/7/g; s/3000000000/7/g' tests/$T.fss > "$S/red/$T.fss"
echo "########## the scratch copy's diff against tests/$T.fss"
diff tests/$T.fss "$S/red/$T.fss"
echo "########## SystemJUTest -Dtests=<the scratch copy> (FORTRESS_JUNIT_VERBOSE=1)"
FORTRESS_CACHES="$S/red-caches" FORTRESS_JUNIT_VERBOSE=1 "$JAVA_HOME/bin/java" $JAVA_FLAGS -Dfile.encoding=UTF-8 -Dtests="$S/red" -cp "$CP" com.sun.fortress.tests.unit_tests.SystemJUTest 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at ' | grep -v 'shuffling seed'
echo "exit=${PIPESTATUS[0]}"
