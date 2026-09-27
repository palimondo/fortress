#!/bin/bash
# the rung's two walk XXX files through SystemJUTest on a scratch copy (tmp/sk-walkxxx), then a scratch copy of XXXNatSizeExclusionWalk.fss whose pair is declared on the objects (g(b: Ob3), g(b: Ob4)), which walk accepts, to show the harness red on a passing XXX file (tmp/sk-walkxxx-red); no walk edit
cd "$FORTRESS_HOME/ProjectFortress"
CP=$(../bin/fortress_classpath 2>/dev/null | tail -1)
for d in sk-walkxxx sk-walkxxx-red; do
  echo "########## SystemJUTest -Dtests=tmp/$d"
  [ $d = sk-walkxxx-red ] && diff tests/XXXNatSizeExclusionWalk.fss $FORTRESS_HOME/tmp/$d/XXXNatSizeExclusionWalk.fss
  FORTRESS_JUNIT_VERBOSE=1 "$JAVA_HOME/bin/java" $JAVA_FLAGS -Dfile.encoding=UTF-8 -Dtests="$FORTRESS_HOME/tmp/$d" -cp "$CP" com.sun.fortress.tests.unit_tests.SystemJUTest 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at ' | grep -v 'shuffling seed'
done
