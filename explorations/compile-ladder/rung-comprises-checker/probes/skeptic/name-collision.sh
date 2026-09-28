#!/bin/bash
# name-collision.sh: the simple-name comparison in everyKnownSubtypeListed. SkNameA declares a generic G[\X\] extends
# SkNameD.Closed that nothing extends (zElig's shape) and imports SkNameB, which declares an unrelated G[\X\] and
# K extends { Listed, SkNameB.G[\ZZ32\] }. SkNameAlone is the control, the same G without SkNameB in its environment.
# Each api is compiled with the base's checker ahead of ProjectFortress/build and with the landed build.
SK=${SK:-$FORTRESS_HOME/tmp/sk}
D=$FORTRESS_HOME/explorations/compile-ladder/rung-comprises-checker/probes/skeptic
CP=$($FORTRESS_HOME/bin/fortress_classpath | tail -1)
cd $D
for v in base landed; do
  for p in SkNameD SkNameB SkNameA SkNameAlone; do find $FORTRESS_HOME/default_repository/caches -name "*$p*" -exec rm -rf {} + 2>/dev/null; done
  if [ $v = landed ]; then PRE=""; else PRE="$SK/base/cls:"; fi
  for p in SkNameD SkNameB SkNameA SkNameAlone; do
    echo "== compile $p.fsi, $v checker"
    timeout 300 java $JAVA_FLAGS -Dfile.encoding=UTF-8 -cp "$PRE$CP" com.sun.fortress.Shell compile $p.fsi 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at ' | head -12
    echo "rc=${PIPESTATUS[0]}"
  done
done
