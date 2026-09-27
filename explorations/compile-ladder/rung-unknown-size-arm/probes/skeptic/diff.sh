#!/bin/bash
# skeptic's differential: each probe walked, compiled with the untouched checker (Functionals.scala and ApplicationError.scala of e5414f5bf compiled into tmp/sk-base/classes, first on the classpath) and run, then compiled with the rung's checker and run
# usage: bash diff.sh <probe.fss>...   (from the worktree, JAVA_HOME, FORTRESS_HOME, JAVA_FLAGS, FORTRESS_THREADS set)
cd "$FORTRESS_HOME/ProjectFortress"
CP=$(../bin/fortress_classpath 2>/dev/null | tail -1)
BASE=$FORTRESS_HOME/tmp/sk-base/classes
clean () { find ../default_repository/caches -name "*$1*" -exec rm -rf {} + 2>/dev/null; }
norm () { sed "s#$FORTRESS_HOME/##g;s#\.\./explorations/#explorations/#g" | grep -v '^\s*at ' | head -14; }
for p in "$@"; do
  c=$(basename $p .fss)
  echo "================ $c"
  echo "########## walk"
  timeout 300 ../bin/fortress walk $p 2>&1 | norm; echo "exit=${PIPESTATUS[0]}"
  for side in before after; do
    clean $c
    echo "########## compile ($side)"
    if [ $side = before ]; then
      timeout 300 "$JAVA_HOME/bin/java" $JAVA_FLAGS -Dfile.encoding=UTF-8 -cp "$BASE:$CP" com.sun.fortress.Shell compile $p 2>&1 | norm; rc=${PIPESTATUS[0]}
    else
      timeout 300 ../bin/fortress compile $p 2>&1 | norm; rc=${PIPESTATUS[0]}
    fi
    echo "exit=$rc"
    if [ "$rc" = 0 ]; then
      echo "########## run ($side)"
      timeout 120 ../bin/fortress run $c 2>&1 | norm; echo "exit=${PIPESTATUS[0]}"
    fi
  done
  clean $c
done
