# sourced by the second skeptic's scripts: shell setup, machine line, cache cleaning, one .test in its own JVM
FH=/home/user/fortress-nat
cd $FH
source explorations/experiment/env.sh >/dev/null 2>&1
export TMPDIR=$FH/tmp
export JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$FH/tmp"
export FORTRESS_THREADS=${FORTRESS_THREADS:-1}
CP=$($FH/bin/fortress_classpath 2>/dev/null | tail -1)
machine () {
  echo "machine: nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/.*: //') MHz; load at start $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS"
}
clean () { for t in "$@"; do find $FH/default_repository/caches -name "*$t*" -exec rm -rf {} + 2>/dev/null; done; }
filt () { sed "s#$FH/##g" | grep -v '^\s*at \|^java.lang.Throwable' | head -${1:-40}; }
# jt <shadow-dir or empty> <test>: the harness on one .test in its own JVM
jt () {
  local shadow=$1 t=$2
  clean $t
  if [ -n "$shadow" ]; then
    echo "########## junit compiler_tests/$t.test, ${shadow#$FH/} first on the classpath"
    (cd $FH/ProjectFortress && timeout 500 java -Xmx4g -Xss64m -Dfile.encoding=UTF-8 -Djava.io.tmpdir=$FH/tmp -cp "$shadow:$CP" com.sun.fortress.Shell junit compiler_tests/$t.test 2>&1 | filt 60; echo "exit=${PIPESTATUS[0]}")
  else
    echo "########## junit compiler_tests/$t.test, the landed build"
    (cd $FH/ProjectFortress && timeout 500 ../bin/fortress junit compiler_tests/$t.test 2>&1 | filt 60; echo "exit=${PIPESTATUS[0]}")
  fi
  clean $t
}
