#!/bin/bash
# the harness path of a walk XXX file, shown red: a scratch copy of XXXNatBigSizeWalk.fss with the one size walk reads right (7) in place of 4294967296 and 3000000000, run through SystemJUTest -Dtests=<scratch dir>; no walk edit
cd "$FORTRESS_HOME/ProjectFortress"
W="$FORTRESS_HOME/tmp/walkxxx-red"
rm -rf "$W"; mkdir -p "$W"
sed 's/4294967296/7/g; s/3000000000/7/g' tests/XXXNatBigSizeWalk.fss > "$W/XXXNatBigSizeWalk.fss"
echo "########## the scratch copy's diff against tests/XXXNatBigSizeWalk.fss"
diff tests/XXXNatBigSizeWalk.fss "$W/XXXNatBigSizeWalk.fss" | sed "s#$FORTRESS_HOME/##g"
echo "########## SystemJUTest -Dtests=tmp/walkxxx-red (FORTRESS_JUNIT_VERBOSE=1)"
FORTRESS_JUNIT_VERBOSE=1 "$JAVA_HOME/bin/java" $JAVA_FLAGS -Dfile.encoding=UTF-8 -Dtests="$W" -cp "$(../bin/fortress_classpath)" com.sun.fortress.tests.unit_tests.SystemJUTest 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at '
echo "exit=${PIPESTATUS[0]}"
