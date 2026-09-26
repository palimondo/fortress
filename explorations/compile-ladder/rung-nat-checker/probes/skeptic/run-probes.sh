#!/bin/bash
# the skeptic's differential: each probe under walk, then fortress typecheck and fortress compile on the landed edit,
# then (BASE=1) typecheck on the unedited checker as the worker's classpath shadow tmp/base-classes; the probes named in RUN also run compiled
cd /home/user/fortress-nat/explorations/compile-ladder/rung-nat-checker/probes/skeptic
FH=/home/user/fortress-nat
CP=$($FH/bin/fortress_classpath 2>/dev/null | tail -1)
clean () { find $FH/default_repository/caches -name "*$1*" -exec rm -rf {} + 2>/dev/null; }
filt () { sed "s#$FH/##g" | grep -v '^\s*at \|^java.lang.Throwable' | head -${1:-14}; }
for p in "$@"; do
  clean $p
  echo "########## walk: fortress $p.fss"
  timeout 300 $FH/bin/fortress $p.fss 2>&1 | filt; echo "exit=${PIPESTATUS[0]}"
  clean $p
  echo "########## fortress typecheck $p.fss (landed edit)"
  timeout 300 $FH/bin/fortress typecheck $p.fss 2>&1 | filt 24; echo "exit=${PIPESTATUS[0]}"
  clean $p
  echo "########## fortress compile $p.fss (landed edit)"
  timeout 300 $FH/bin/fortress compile $p.fss 2>&1 | filt 24; echo "exit=${PIPESTATUS[0]}"
  if [[ " $RUN " == *" $p "* ]]; then
    echo "########## fortress run $p (landed edit)"
    timeout 300 $FH/bin/fortress run $p 2>&1 | filt; echo "exit=${PIPESTATUS[0]}"
  fi
  if [ -n "$BASE" ]; then
    clean $p
    echo "########## fortress typecheck $p.fss (unedited checker, tmp/base-classes first on the classpath)"
    timeout 300 java -Xmx4g -Xss64m -Dfile.encoding=UTF-8 -Djava.io.tmpdir=$FH/tmp -cp "$FH/tmp/base-classes:$CP" com.sun.fortress.Shell typecheck $p.fss 2>&1 | filt 24; echo "exit=${PIPESTATUS[0]}"
  fi
  clean $p
done
