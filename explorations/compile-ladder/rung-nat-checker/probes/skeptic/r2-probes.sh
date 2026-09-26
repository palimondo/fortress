#!/bin/bash
# second skeptic's differential: each probe under walk, then fortress typecheck, compile and run on the landed build,
# then typecheck on the unedited checker (tmp/base-classes first) and, for the api probes, with only
# ExportChecker.scala of 47437c65f first (tmp/sk-export-base). Usage: r2-probes.sh <dir> <probe>...
source /home/user/fortress-nat/explorations/compile-ladder/rung-nat-checker/probes/skeptic/r2-common.sh
D=$FH/explorations/compile-ladder/rung-nat-checker/probes/skeptic/$1; shift
cd $D
machine
for p in "$@"; do
  clean $p
  echo "########## walk: fortress $p.fss"
  timeout 300 $FH/bin/fortress $p.fss 2>&1 | filt 16; echo "exit=${PIPESTATUS[0]}"
  clean $p
  echo "########## fortress typecheck $p.fss (landed build)"
  timeout 300 $FH/bin/fortress typecheck $p.fss 2>&1 | filt 30; echo "exit=${PIPESTATUS[0]}"
  clean $p
  echo "########## fortress compile $p.fss (landed build)"
  timeout 300 $FH/bin/fortress compile $p.fss 2>&1 | filt 30; echo "exit=${PIPESTATUS[0]}"
  echo "########## fortress run $p (landed build)"
  timeout 300 $FH/bin/fortress run $p 2>&1 | filt 12; echo "exit=${PIPESTATUS[0]}"
  clean $p
  echo "########## fortress typecheck $p.fss (unedited checker, tmp/base-classes first)"
  timeout 300 java -Xmx4g -Xss64m -Dfile.encoding=UTF-8 -Djava.io.tmpdir=$FH/tmp -cp "$FH/tmp/base-classes:$CP" com.sun.fortress.Shell typecheck $p.fss 2>&1 | filt 12; echo "exit=${PIPESTATUS[0]}"
  if [ -f $p.fsi ]; then
    clean $p
    echo "########## fortress typecheck $p.fss (landed build, only ExportChecker.scala of 47437c65f first: tmp/sk-export-base)"
    timeout 300 java -Xmx4g -Xss64m -Dfile.encoding=UTF-8 -Djava.io.tmpdir=$FH/tmp -cp "$FH/tmp/sk-export-base:$CP" com.sun.fortress.Shell typecheck $p.fss 2>&1 | filt 30; echo "exit=${PIPESTATUS[0]}"
  fi
  clean $p
done
