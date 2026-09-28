source /home/user/fortress-comprises/tmp/sk/env.sh
cd $FORTRESS_HOME/ProjectFortress
CP=$(../bin/fortress_classpath | tail -1)
T=../explorations/compile-ladder/rung-comprises-checker/probes/skeptic/candidate/XXXComprisesGenericRenamed.test
for v in landed substFix base; do
  if [ "$v" = landed ]; then PRE=""; else PRE="$SK/$v/cls:"; fi
  find ../default_repository/caches -name "*XXXComprisesGenericRenamed*" -exec rm -rf {} + 2>/dev/null
  echo "########## [$v] fortress junit $T"
  java $JAVA_FLAGS -Dfile.encoding=UTF-8 -cp "$PRE$CP" com.sun.fortress.Shell junit $T 2>&1 | sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at '
  echo "exit=${PIPESTATUS[0]}"
done
