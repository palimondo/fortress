#!/bin/bash
# run-sk.sh <Name> : one skeptic probe, <Name>.fss beside this script, four ways, into <Name>.txt:
#   walk (bin/fortress <Name>.fss);
#   the compiled checker as the tree has it (stock) and with rung Y's rule (narrow), each a `Shell typecheck`
#   by the ways note's probe.sh in the compiler's world with the shadow of Y's edit ahead
#   (explorations/reviews/anyintegral-comprises-ways/shadow-thc.py, built into $SHADOW; stock = no switch,
#   narrow = -Dprobe.aicw.eligibleNarrow=true, the 14 lines rung Y lands, behind the shadow's switch);
#   the compiled run under the narrow rule (Shell compile with the shadow ahead, then bin/fortress run).
# Sets its environment itself; does not source env.sh (its rm of /tmp/fortress*rats would reach the other worktree's runs).
set -u
W=/home/user/fortress-speccomprises
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH=/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH FORTRESS_HOME=$W TMPDIR=$W/tmp FORTRESS_THREADS=1
export JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$W/tmp"
unset JAVA_TOOL_OPTIONS
SHADOW=$W/tmp/sk/shadow-classes; PW=$W/tmp/sk/pw
D=$W/explorations/compile-ladder/rung-spec-comprises/probes/skeptic
N=${1:?usage}; cd $D
CP=$($W/bin/fortress_classpath 2>/dev/null | tail -1)
strip () { sed "s#$D/##g; s#$W/##g"; }
{
echo "# $N.fss, tree $(git -C $W rev-parse --short HEAD) (the base's checker and interpreter; no Java or Scala edit in this tree); machine: nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/.*: //') MHz; load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS"
echo "== walk: fortress $N.fss"
timeout 600 $W/bin/fortress $N.fss 2>&1 | strip; echo "exit ${PIPESTATUS[0]}"
echo "== compiled checker, stock (the tree's rule)"
bash $W/explorations/reviews/anyintegral-comprises-ways/probe.sh $PW stock-$N compiler $D/$N.fss $SHADOW 2>&1 | strip
echo "== compiled checker, narrow (rung Y's rule, the shadow's switch on)"
bash $W/explorations/reviews/anyintegral-comprises-ways/probe.sh $PW narrow-$N compiler $D/$N.fss $SHADOW -Dprobe.aicw.eligibleNarrow=true 2>&1 | strip
echo "== compiled run under the narrow rule: Shell compile, then fortress run"
rm -rf $W/default_repository/caches/bytecode_cache/$N* $W/default_repository/caches/analyzed_cache/$N-* 2>/dev/null
( java $JAVA_FLAGS -Dfile.encoding=UTF-8 -Dprobe.aicw.eligibleNarrow=true -cp "$SHADOW:$CP" com.sun.fortress.Shell compile $N.fss 2>&1; echo "compile exit $?" ) | strip
( timeout 600 $W/bin/fortress run $N 2>&1; echo "run exit $?" ) | strip | head -20
} > $D/$N.txt 2>&1
cat $D/$N.txt
