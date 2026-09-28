#!/bin/bash
# The judge's repair of climb batch 6.5, step 6: the two walk expected-failure tests for row 159's alpha-renamed and
# swapped generic pairs, through the testSystem harness (rung P's harness-one.sh) in scratch directories, each shown
# red on a control: an XXX-named copy whose two arms use one parameter name, which walk accepts.
# usage: bash explorations/compile-ladder/climb-batch-6.5/judge-repair/walk-dispatch.sh
source "$(dirname "$0")/../../../experiment/env.sh"
S=$FORTRESS_HOME/tmp/judge-repair-6.5 ; mkdir -p $S
export TMPDIR=$S JAVA_FLAGS="$JAVA_FLAGS -Djava.io.tmpdir=$S"
H=$FORTRESS_HOME/explorations/compile-ladder/rung-spec-integer-rules/probes/tests/harness-one.sh
cd "$FORTRESS_HOME"
echo "# nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //') MHz; load at start $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS; $(date -u +%FT%TZ); tree HEAD $(git rev-parse --short=9 HEAD) plus the repair's working-tree files"
filt () { sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at ' | cut -c1-240 ; }
for t in XXXDispatchRenamedArmWalkRungG XXXDispatchSwappedArmWalkRungG ; do
  echo "=================== $t"
  echo "=== walk: bin/fortress ProjectFortress/tests/$t.fss"
  bin/fortress ProjectFortress/tests/$t.fss 2>&1 | filt ; echo "exit=${PIPESTATUS[0]}"
  echo "=== the testSystem harness over the test alone (harness-one.sh, fresh caches)"
  bash $H $S/h-$t ProjectFortress/tests/$t.fss 2>&1 | filt ; echo "exit=${PIPESTATUS[0]}"
  mkdir -p $S/control ; C=$S/control/$t.fss
  case $t in
    XXXDispatchRenamedArmWalkRungG) sed 's/^grab\[\\Y\\\](t: Sub\[\\Y\\\]): Marker\[\\Y\\\] = SubM\[\\Y\\\]$/grab[\\X\\](t: Sub[\\X\\]): Marker[\\X\\] = SubM[\\X\\]/' ProjectFortress/tests/$t.fss > $C ;;
    XXXDispatchSwappedArmWalkRungG) sed 's/^pair\[\\B,A\\\](t: SubTwo\[\\B,A\\\]): Marker\[\\B,A\\\] = SubM\[\\B,A\\\]$/pair[\\A,B\\](t: SubTwo[\\A,B\\]): Marker[\\A,B\\] = SubM[\\A,B\\]/' ProjectFortress/tests/$t.fss > $C ;;
  esac
  echo "=== the control, $t.fss in a scratch directory with its two arms over one parameter name; the diff:"
  diff ProjectFortress/tests/$t.fss $C
  echo "=== walk: bin/fortress <scratch>/control/$t.fss"
  (cd $S/control && $FORTRESS_HOME/bin/fortress $t.fss 2>&1 | filt ; echo "exit=${PIPESTATUS[0]}")
  echo "=== the testSystem harness over the control alone (fresh caches): the expected failure must be missing"
  bash $H $S/hc-$t $C 2>&1 | filt ; echo "exit=${PIPESTATUS[0]}"
done
