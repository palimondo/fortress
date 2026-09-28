#!/bin/bash
# junit.sh <variant|landed> <test-name>...: each compiler_tests/<name>.test through the harness in its own JVM,
# under the landed build or with a variant of TypeHierarchyChecker put ahead of ProjectFortress/build; the tests' cache entries removed first
source /home/user/fortress-comprises/tmp/sk/env.sh
v=$1; shift
cd $FORTRESS_HOME/ProjectFortress
CP=$(../bin/fortress_classpath | tail -1)
if [ "$v" = landed ]; then PRE=""; else PRE="$SK/$v/cls:"; fi
for t in "$@"; do
  c=$(sed -n 's/^tests=//p' compiler_tests/$t.test)
  for x in $t $c; do find ../default_repository/caches -name "*$x*" -exec rm -rf {} + 2>/dev/null; done
  echo "########## [$v] fortress junit compiler_tests/$t.test"
  java $JAVA_FLAGS -Dfile.encoding=UTF-8 -cp "$PRE$CP" com.sun.fortress.Shell junit compiler_tests/$t.test 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at '
  echo "exit=${PIPESTATUS[0]}"
done
