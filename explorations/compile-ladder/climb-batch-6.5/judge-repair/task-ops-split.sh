#!/bin/bash
# The judge's repair of climb batch 6.5, step 8's split: rung G's skeptic's two task-operand probes compiled as they
# are and each with its 'else => 0' replaced so that no clause answers a numeral ('else => g(y)' in SkTypecaseTaskOps,
# 'else => g(Wrap(0))' in SkClauseTaskOps). Each variant is compiled from its own scratch directory under the probe's
# own name, its cache entries removed first; each that compiles is also run.
# usage: bash explorations/compile-ladder/climb-batch-6.5/judge-repair/task-ops-split.sh
source "$(dirname "$0")/../../../experiment/env.sh"
S=$FORTRESS_HOME/tmp/judge-repair-6.5 ; mkdir -p $S
export TMPDIR=$S JAVA_FLAGS="$JAVA_FLAGS -Djava.io.tmpdir=$S"
SK=$FORTRESS_HOME/explorations/compile-ladder/rung-generic-runtime/probes/skeptic
echo "# nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //') MHz; load at start $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS; $(date -u +%FT%TZ); tree HEAD $(git -C $FORTRESS_HOME rev-parse --short=9 HEAD) (no source edit)"
filt () { sed "s#$FORTRESS_HOME/##g" | grep -v '^\s*at ' | cut -c1-200 ; }
clean () { find $FORTRESS_HOME/default_repository/caches -name "*$1*" -exec rm -rf {} + 2>/dev/null ; }
one () { # one <label> <component> <sed expression or empty>
  local d=$S/split-$1 ; rm -rf $d ; mkdir -p $d
  if [ -n "$3" ] ; then sed "$3" $SK/$2.fss > $d/$2.fss ; else cp $SK/$2.fss $d/$2.fss ; fi
  echo "==================== [$1] $2.fss; diff against the probe:"
  diff $SK/$2.fss $d/$2.fss
  clean $2
  (cd $d && $FORTRESS_HOME/bin/fortress compile $2.fss 2>&1 | filt | head -14 ; echo "compile exit=${PIPESTATUS[0]}")
  if [ -f $FORTRESS_HOME/default_repository/caches/bytecode_cache/$2.jar ] ; then
    (cd $d && $FORTRESS_HOME/bin/fortress run $2 2>&1 | filt | head -14 ; echo "run exit=${PIPESTATUS[0]}")
  fi
  clean $2
}
one typecase-as-is SkTypecaseTaskOps ""
one typecase-no-numeral SkTypecaseTaskOps 's/^      else => 0$/      else => g(y)/'
one clause-as-is SkClauseTaskOps ""
one clause-no-numeral SkClauseTaskOps 's/^      else => 0$/      else => g(Wrap(0))/'
