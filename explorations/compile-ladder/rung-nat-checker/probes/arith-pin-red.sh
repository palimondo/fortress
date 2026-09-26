#!/bin/bash
# XXXNatArithChecker.test (re-pinned) with two shadows of TypeWellFormedChecker.scala from HEAD first on the classpath:
# (a) lines 144-145 deleted, the use-site IntArg arm; (b) lines 107-108 deleted, the declared-type check; then the landed build.
# Nothing in the tree is edited: the shadows are compiled under tmp/.
source /home/user/fortress-nat/explorations/compile-ladder/rung-nat-checker/probes/repair-common.sh
T=$FH/ProjectFortress/third_party/scala
SRC=ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala
machine
for v in a b; do
  case $v in a) del='144,145d' ;; b) del='107,108d' ;; esac
  mkdir -p $FH/tmp/twfc-$v-src $FH/tmp/twfc-$v
  rm -rf $FH/tmp/twfc-$v/*
  git -C $FH show HEAD:$SRC | sed "$del" > $FH/tmp/twfc-$v-src/TypeWellFormedChecker.scala
  echo "########## shadow ($v): HEAD's TypeWellFormedChecker.scala with lines ${del%d} deleted; diff against HEAD:"
  git -C $FH show HEAD:$SRC | diff - $FH/tmp/twfc-$v-src/TypeWellFormedChecker.scala
  java -Xmx2g -cp $T/scala-compiler-2.13.18.jar:$T/scala-library-2.13.18.jar:$T/scala-reflect-2.13.18.jar scala.tools.nsc.Main -nowarn -encoding UTF-8 -classpath "$CP" -d $FH/tmp/twfc-$v $FH/tmp/twfc-$v-src/TypeWellFormedChecker.scala 2>&1 | filt
  echo "scalac exit=${PIPESTATUS[0]}; classes: $(cd $FH/tmp/twfc-$v && find . -name '*.class' | wc -l)"
  junit_with $FH/tmp/twfc-$v XXXNatArithChecker
done
junit_with "" XXXNatArithChecker
