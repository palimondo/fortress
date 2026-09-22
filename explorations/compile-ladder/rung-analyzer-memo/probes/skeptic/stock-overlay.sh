#!/bin/bash
# Build the batch base's TypeAnalyzer.scala and TraitTable.scala into a scratch classes dir, then run the checker-count stage over it.
# usage: stock-overlay.sh <scratch-dir> <table-out> ; from /home/user/fortress-memo after ant compileAll
S=$1; T=$2; B=d610695c0c014001687e528fa9fd99078db6ea76; SC=ProjectFortress/third_party/scala
mkdir -p $S/src $S/classes
git show $B:ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala > $S/src/TypeAnalyzer.scala
git show $B:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TraitTable.scala > $S/src/TraitTable.scala
CP=$(bin/fortress_classpath 2>/dev/null | tail -1)
java -cp $SC/scala-compiler-2.13.18.jar:$SC/scala-library-2.13.18.jar:$SC/scala-reflect-2.13.18.jar scala.tools.nsc.Main \
     -d $S/classes -classpath "$CP" -encoding UTF-8 -nowarn $S/src/TypeAnalyzer.scala $S/src/TraitTable.scala
explorations/coordinator/tools/checker-count/run.sh $T $S
