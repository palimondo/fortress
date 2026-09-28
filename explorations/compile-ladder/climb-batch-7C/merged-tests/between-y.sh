#!/bin/bash
# The gather of climb batch 7C: rung X's two probes of the passages left (probes/between/) and its skeptic's two
# (probes/skeptic/SkBetweenAssign.fss, SkMeetSingle.fss), compiled in the main tree with rung Y's landed
# TypeHierarchyChecker.scala ([Y], compiled by scalac into $YCLS and put ahead of the build) and with the build as
# it is ([base], the base's checker). Each file is copied into a scratch directory, since a component's name must be
# its file's; each run's own cache entries are removed before and after.
# usage: YCLS=<class dir> WORK=<scratch dir> bash explorations/compile-ladder/climb-batch-7C/merged-tests/between-y.sh
source "$(dirname "$0")/../../../experiment/env.sh"
X=$FORTRESS_HOME/explorations/compile-ladder/rung-spec-comprises/probes
CP=$($FORTRESS_HOME/bin/fortress_classpath | tail -1)
mkdir -p "$WORK"; cp $X/between/BetweenTwoClosed.fss $X/between/MeetExample.fss $X/skeptic/SkBetweenAssign.fss $X/skeptic/SkMeetSingle.fss "$WORK"/
echo "# nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //') MHz; $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS; load at start $(cut -d' ' -f1-3 /proc/loadavg); $(date -u +%FT%TZ); tree $(git -C $FORTRESS_HOME rev-parse --short HEAD) with rung X's change applied"
clean () { rm -rf $FORTRESS_HOME/default_repository/caches/bytecode_cache/$1* $FORTRESS_HOME/default_repository/caches/analyzed_cache/$1-* 2>/dev/null; find $FORTRESS_HOME/default_repository/caches -name "*$1*" -exec rm -rf {} + 2>/dev/null; }
cd "$WORK"
for n in BetweenTwoClosed MeetExample SkBetweenAssign SkMeetSingle; do
  for v in base Y; do
    if [ $v = Y ]; then PRE="$YCLS:"; else PRE=""; fi
    clean $n
    echo "== $n, [$v] Shell compile"
    java $JAVA_FLAGS -Dfile.encoding=UTF-8 -cp "$PRE$CP" com.sun.fortress.Shell compile $n.fss 2>&1 | sed "s#$WORK/##g; s#$FORTRESS_HOME/##g" | grep -v '^\s*at '
    echo "rc=${PIPESTATUS[0]}"
    clean $n
  done
done
