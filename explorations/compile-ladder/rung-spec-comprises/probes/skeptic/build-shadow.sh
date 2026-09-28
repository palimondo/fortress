#!/bin/bash
# build-shadow.sh : the shadow of rung Y's edit that run-sk.sh puts ahead of ProjectFortress/build.
# explorations/reviews/anyintegral-comprises-ways/shadow-thc.py copies the tracked TypeHierarchyChecker.scala
# with three switches, each off by default; -Dprobe.aicw.eligibleNarrow=true turns on the 14 lines of
# everyKnownSubtypeListed that rung Y lands without a switch. Compiled with the build's own scalac entry point
# (scala.tools.nsc.Main) against bin/fortress_classpath into tmp/sk/shadow-classes (ignored). No tracked file is written.
set -u
W=/home/user/fortress-speccomprises
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH=/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH FORTRESS_HOME=$W
unset JAVA_TOOL_OPTIONS
cd $W
python3 explorations/reviews/anyintegral-comprises-ways/shadow-thc.py tmp/sk/shadow-src
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1 | sed 's#:[^:]*/default_repository/caches/bytecode_cache##')
rm -rf tmp/sk/shadow-classes; mkdir -p tmp/sk/shadow-classes
java -Xmx2g -cp "$CP" scala.tools.nsc.Main -nowarn -d tmp/sk/shadow-classes -classpath "$CP" -encoding UTF-8 \
     tmp/sk/shadow-src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala
echo "scalac exit $?; $(find tmp/sk/shadow-classes -name '*.class' | wc -l) class files"
