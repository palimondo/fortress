#!/bin/bash
# The skeptic's helpers, sourced.  env.sh's exports without its /tmp sweep; a base shadow of the three edited Java
# files (git show b797d8037:...) compiled ahead of the rung's build, so that "base" compiles and runs with the base's
# code generator and loader and "rung" with the rung's; the library cache is the rung's in both.
FH=/home/user/fortress-genrt
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64
export PATH="$JAVA_HOME/bin:$PATH"
export FORTRESS_HOME=$FH
unset JAVA_TOOL_OPTIONS
export TMPDIR=$FH/tmp
export JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$FH/tmp"
SK=$FH/explorations/compile-ladder/rung-generic-runtime/probes/skeptic
S=$FH/tmp/sk-shadow-base
CCP=$($FH/bin/fortress_classpath 2>/dev/null | tail -1)
RCP=$($FH/bin/run_classpath 2>/dev/null | tail -1)
build_shadow () {
  rm -rf $S; mkdir -p $S/src
  for f in runtimeSystem/InstantiatingClassloader.java compiler/codegen/CodeGen.java compiler/OverloadSet.java; do
    git -C $FH show b797d803710cc1860a6986fc42c9aa0b9fa0178e:ProjectFortress/src/com/sun/fortress/$f > $S/src/$(basename $f)
  done
  javac -nowarn -encoding UTF-8 -d $S -cp "$CCP" $S/src/*.java 2>&1 | grep -v '^Note'
}
machine () {
  echo "machine: nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/.*: //') MHz; load at start $(cut -d' ' -f1-3 /proc/loadavg); JDK $(java -version 2>&1 | head -1 | sed 's/.*version "\([0-9.]*\).*/\1/')"
  echo "# tree: $(git -C $FH log -1 --format=%h) with source edits: $(git -C $FH status --short -- ProjectFortress/src Library | tr '\n' ' ')"
}
clean () { for t in "$@"; do find $FH/default_repository/caches -name "*$t*" ! -name '*.jar' -exec rm -rf {} + 2>/dev/null; find $FH/default_repository/caches -name "$t*.jar" -exec rm -f {} + 2>/dev/null; done; }
filt () { sed "s#$FH/##g" | grep -v '^\s*at \|^java.lang.Throwable\|^\s*\.\.\. [0-9]* more'; }
# comp <mode base|rung> <dir> <component>
comp () {
  local m=$1 d=$2 c=$3 cp="$CCP"; [ $m = base ] && cp="$S:$CCP"
  clean $c
  (cd $d && timeout -k 5 300 java $JAVA_FLAGS -Dfile.encoding=UTF-8 -cp "$cp" com.sun.fortress.Shell compile $c.fss 2>&1 | filt | head -12; echo "compile($m) exit=${PIPESTATUS[0]}")
}
# runc <mode> <dir> <component> <threads>
runc () {
  local m=$1 d=$2 c=$3 th=$4 cp="$RCP"; [ $m = base ] && cp="$S:$RCP"
  (cd $d && FORTRESS_THREADS=$th timeout -k 5 120 java $JAVA_FLAGS -Dfile.encoding=UTF-8 -cp "$cp" com.sun.fortress.runtimeSystem.MainWrapper $c 2>&1 | filt | head -16; echo "run($m, FORTRESS_THREADS=$th) exit=${PIPESTATUS[0]}")
}
walk () {
  local d=$1 c=$2 th=$3
  (cd $d && FORTRESS_THREADS=$th timeout -k 5 300 $FH/bin/fortress $c.fss 2>&1 | filt | head -16; echo "walk(FORTRESS_THREADS=$th) exit=${PIPESTATUS[0]}")
}
# diff4 <component>...: for each program in $SK: base compiled at 1 and 4, rung compiled at 1 and 4, walk at 1 and 4
diff4 () {
  for c in "$@"; do
    echo "################################ $c"
    comp base $SK $c
    for th in 1 4; do runc base $SK $c $th; done
    comp rung $SK $c
    for th in 1 4; do runc rung $SK $c $th; done
    for th in 1 4; do walk $SK $c $th; done
    clean $c
  done
}
