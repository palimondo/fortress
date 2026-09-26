#!/bin/bash
# A/B of the ExportChecker edit alone: the landed build with only ExportChecker.scala taken back to 47437c65f
# (compiled into tmp/sk-export-base, first on the classpath), against the landed build, on the sized api probe
cd /home/user/fortress-nat/explorations/compile-ladder/rung-nat-checker/probes/skeptic/api
FH=/home/user/fortress-nat
CP=$($FH/bin/fortress_classpath 2>/dev/null | tail -1)
T=$FH/ProjectFortress/third_party/scala
if [ ! -d $FH/tmp/sk-export-base/com ]; then
  mkdir -p $FH/tmp/sk-export-base $FH/tmp/sk-export-src
  (cd $FH && git show 47437c65f:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala) > $FH/tmp/sk-export-src/ExportChecker.scala
  java -Xmx2g -cp $T/scala-compiler-2.13.18.jar:$T/scala-library-2.13.18.jar:$T/scala-reflect-2.13.18.jar scala.tools.nsc.Main -nowarn -encoding UTF-8 -classpath "$CP" -d $FH/tmp/sk-export-base $FH/tmp/sk-export-src/ExportChecker.scala
fi
clean () { find $FH/default_repository/caches -name "*SkSized*" -exec rm -rf {} + 2>/dev/null; }
filt () { sed "s#$FH/##g" | grep -v '^\s*at \|^java.lang.Throwable' | head -${1:-20}; }
clean
echo "########## fortress typecheck SkSizedApi.fss (landed build, ExportChecker.scala of 47437c65f first on the classpath)"
timeout 300 java -Xmx4g -Xss64m -Dfile.encoding=UTF-8 -Djava.io.tmpdir=$FH/tmp -cp "$FH/tmp/sk-export-base:$CP" com.sun.fortress.Shell typecheck SkSizedApi.fss 2>&1 | filt; echo "exit=${PIPESTATUS[0]}"
clean
echo "########## fortress typecheck SkSizedApi.fss (landed build)"
timeout 300 $FH/bin/fortress typecheck SkSizedApi.fss 2>&1 | filt; echo "exit=${PIPESTATUS[0]}"
clean
