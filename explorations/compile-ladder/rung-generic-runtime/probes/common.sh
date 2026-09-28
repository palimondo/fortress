# sourced by this rung's scripts: shell setup, the machine line, cache cleaning, and a harness run of one .test
# (rung Z's probes/common.sh, pointed at this worktree; explorations/experiment/env.sh's exports without its /tmp sweep)
FH=/home/user/fortress-genrt
cd $FH
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64
export PATH="$JAVA_HOME/bin:$PATH"
export FORTRESS_HOME=$FH
unset JAVA_TOOL_OPTIONS
export FORTRESS_THREADS=${FORTRESS_THREADS:-1}
export TMPDIR=$FH/tmp
export JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$FH/tmp"
P=$FH/explorations/compile-ladder/rung-generic-runtime/probes
machine () {
  echo "machine: nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/.*: //') MHz; load at start $(cut -d' ' -f1-3 /proc/loadavg); JDK $(java -version 2>&1 | head -1 | sed 's/.*version "\([0-9]*\).*/\1/'); FORTRESS_THREADS=$FORTRESS_THREADS"
  echo "# tree: $(git -C $FH log -1 --format=%h) with source edits: $(git -C $FH status --short -- ProjectFortress/src Library | tr '\n' ' ')"
}
# clean <component>...: delete a program's own cache entries (never a library's)
clean () { for t in "$@"; do find $FH/default_repository/caches -name "*$t*" ! -name '*.jar' -exec rm -rf {} + 2>/dev/null; find $FH/default_repository/caches -name "$t*.jar" -exec rm -f {} + 2>/dev/null; done; }
filt () { sed "s#$FH/##g" | grep -v '^\s*at \|^java.lang.Throwable'; }
# junit1 <corpus> <test name>: the harness on one <corpus>/<name>.test
junit1 () {
  local d=$1 t=$2
  echo "########## junit $d/$t.test"
  (cd $FH/ProjectFortress && timeout 500 ../bin/fortress junit $d/$t.test 2>&1 | filt; echo "exit=${PIPESTATUS[0]}")
}
# comprun <dir> <component> [threads]: compile then run one program compiled
comprun () {
  local d=$1 c=$2 th=${3:-1}
  clean $c
  echo "################ $c compiled, FORTRESS_THREADS=$th"
  (cd $d && timeout 300 $FH/bin/fortress compile $c.fss 2>&1 | filt | head -20; echo "compile exit=${PIPESTATUS[0]}")
  (cd $d && FORTRESS_THREADS=$th timeout 120 $FH/bin/fortress run $c 2>&1 | filt | head -30; echo "run exit=${PIPESTATUS[0]}")
}
# walkrun <dir> <component> [threads]
walkrun () {
  local d=$1 c=$2 th=${3:-1}
  echo "################ $c walk, FORTRESS_THREADS=$th"
  (cd $d && FORTRESS_THREADS=$th timeout 300 $FH/bin/fortress $c.fss 2>&1 | filt | head -30; echo "walk exit=${PIPESTATUS[0]}")
}
