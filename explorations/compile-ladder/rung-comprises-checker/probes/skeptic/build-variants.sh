source /home/user/fortress-comprises/tmp/sk/env.sh
cd $FORTRESS_HOME
CP=$(bin/fortress_classpath | tail -1)
for v in base broad noNonEmpty noForall; do
  rm -rf $SK/$v/cls; mkdir -p $SK/$v/cls
  s=$(date +%s)
  java -Xmx1g -cp "$SCP" scala.tools.nsc.Main -d $SK/$v/cls -classpath "$CP" -encoding UTF-8 $SK/$v/src/TypeHierarchyChecker.scala || echo "SCALAC FAILED $v"
  echo "$v $(( $(date +%s) - s ))s $(find $SK/$v/cls -name '*.class' | wc -l) classes"
done
