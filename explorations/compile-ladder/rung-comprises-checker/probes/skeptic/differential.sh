#!/bin/bash
# differential.sh <probe>...: each probe under walk (bin/fortress <probe>.fss), then compiled and run
# twice: with the base's TypeHierarchyChecker (715816bdd) put ahead of ProjectFortress/build, and with the landed build.
# The base's class is built by scalac from git show 715816bdd:<file> into $SK/base/cls (the skeptic's scratch, not committed).
# Run from $FORTRESS_HOME with FORTRESS_THREADS=1; the probe's cache entries are removed before each compile.
SK=${SK:-$FORTRESS_HOME/tmp/sk}
D=$FORTRESS_HOME/explorations/compile-ladder/rung-comprises-checker/probes/skeptic
CP=$($FORTRESS_HOME/bin/fortress_classpath | tail -1)
cd $D
for p in "$@"; do
  echo "################ $p"
  echo "== walk"
  timeout 300 $FORTRESS_HOME/bin/fortress $p.fss 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at ' | head -12
  for v in base landed; do
    find $FORTRESS_HOME/default_repository/caches -name "*$p*" -exec rm -rf {} + 2>/dev/null
    if [ $v = landed ]; then PRE=""; else PRE="$SK/base/cls:"; fi
    echo "== compile, $v checker"
    timeout 300 java $JAVA_FLAGS -Dfile.encoding=UTF-8 -cp "$PRE$CP" com.sun.fortress.Shell compile $p.fss 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at ' | head -20
    echo "rc=${PIPESTATUS[0]}"
    if ls $FORTRESS_HOME/default_repository/caches/bytecode_cache/ | grep -q "^$p.jar$"; then
      echo "== run, $v checker"
      timeout 300 $FORTRESS_HOME/bin/fortress run $p 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at ' | head -12
    fi
  done
done
