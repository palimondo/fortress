# sourced by this rung's scripts: shell setup, the machine line, cache cleaning, and a harness run of one .test in its own JVM
# (rung N's probes/repair-common.sh, pointed at this worktree; explorations/experiment/env.sh's exports without its /tmp sweep)
FH=/home/user/fortress-size
cd $FH
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64
export PATH="$JAVA_HOME/bin:$PATH"
export FORTRESS_HOME=$FH
unset JAVA_TOOL_OPTIONS
export FORTRESS_THREADS=${FORTRESS_THREADS:-1}
export TMPDIR=$FH/tmp
export JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$FH/tmp"
CP=$($FH/bin/fortress_classpath 2>/dev/null | tail -1)
machine () {
  echo "machine: nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/.*: //') MHz; load at start $(cut -d' ' -f1-3 /proc/loadavg); JDK $(java -version 2>&1 | head -1 | sed 's/.*version "\([0-9]*\).*/\1/'); FORTRESS_THREADS=$FORTRESS_THREADS"
}
clean () { for t in "$@"; do find $FH/default_repository/caches -name "*$t*" -exec rm -rf {} + 2>/dev/null; done; }
filt () { sed "s#$FH/##g" | grep -v '^\s*at \|^java.lang.Throwable'; }
# junit1 <test name>: the harness on one compiler_tests/<name>.test, its cache entries deleted before
junit1 () {
  local t=$1
  clean $t
  echo "########## junit compiler_tests/$t.test"
  (cd $FH/ProjectFortress && timeout 500 ../bin/fortress junit compiler_tests/$t.test 2>&1 | filt; echo "exit=${PIPESTATUS[0]}")
}
