#!/bin/bash
# variant-compile.sh <variant> <probe>...: compile each probe with a variant of TypeHierarchyChecker put ahead of
# ProjectFortress/build ("landed" for the build as it is), and run it when it compiles. The variants are built by scalac
# into $SK/<variant>/cls from sources in the skeptic's scratch (not committed); SKEPTIC.md gives each one's diff.
SK=${SK:-$FORTRESS_HOME/tmp/sk}
D=$FORTRESS_HOME/explorations/compile-ladder/rung-comprises-checker/probes/skeptic
CP=$($FORTRESS_HOME/bin/fortress_classpath | tail -1)
v=$1; shift
if [ $v = landed ]; then PRE=""; else PRE="$SK/$v/cls:"; fi
cd $D
for p in "$@"; do
  find $FORTRESS_HOME/default_repository/caches -name "*$p*" -exec rm -rf {} + 2>/dev/null
  echo "== compile $p, $v checker"
  timeout 300 java $JAVA_FLAGS -Dfile.encoding=UTF-8 -cp "$PRE$CP" com.sun.fortress.Shell compile $p.fss 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at ' | head -12
  echo "rc=${PIPESTATUS[0]}"
  if ls $FORTRESS_HOME/default_repository/caches/bytecode_cache/ | grep -q "^$p.jar$"; then
    echo "== run $p"
    timeout 300 $FORTRESS_HOME/bin/fortress run $p 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at ' | head -6
  fi
done
