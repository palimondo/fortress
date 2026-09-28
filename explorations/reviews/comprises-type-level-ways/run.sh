#!/bin/bash
# run.sh [Name ...] : each probe of probes/ (default: all eight), and the team's untested
# ProjectFortress/compiler_tests/Compiled240.fss, on both paths of the landed climb-batch-7C build in
# /home/user/fortress-intprose (FORTRESS_HOME; its tree changed only specification text and two library
# comments since 7C's landing cd9305c2d): walk (bin/fortress <Name>.fss), then the compiled path
# (Shell compile <Name>.fss, then bin/fortress run <Name>). Private caches: a copy of that tree's
# default_repository/caches under $SCRATCH, passed by -Dfortress.caches and FORTRESS_CACHES; the tree's own caches are not touched.
# Each program is copied into $SCRATCH/work, since a component's name must be its file's.
# Writes captures/<Name>.txt beside this script, headed by its machine line.
# usage: SCRATCH=<dir> bash explorations/reviews/comprises-type-level-ways/run.sh [Name ...]
set -u
B=/home/user/fortress-intprose
D="$(cd "$(dirname "$0")" && pwd)"
SCRATCH=${SCRATCH:?set SCRATCH}
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH=/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH FORTRESS_HOME=$B FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
mkdir -p "$SCRATCH/tmp" "$SCRATCH/work" "$D/captures"
[ -d "$SCRATCH/caches" ] || cp -a "$B/default_repository/caches" "$SCRATCH/caches"
export JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$SCRATCH/tmp -Dfortress.caches=$SCRATCH/caches"
export FORTRESS_CACHES=$SCRATCH/caches   # bin/run_classpath reads this, not the property
CP=$($B/bin/fortress_classpath 2>/dev/null | tail -1)
clean () { find "$SCRATCH/caches" -name "*$1*" -exec rm -rf {} + 2>/dev/null; }
strip () { sed "s#$SCRATCH/work/##g; s#$SCRATCH/##g; s#$B/##g" | grep -v '^\s*at '; }
names=("$@"); [ ${#names[@]} -eq 0 ] && names=(OwnClauseBetween OneClosedBetween AbsFnBetween AbsFnMissing AbsFnGeneric AbsMethodBetween AbsMethodMissing AbsMethodGeneric Compiled240)
for N in "${names[@]}"; do
  if [ "$N" = Compiled240 ]; then cp "$B/ProjectFortress/compiler_tests/Compiled240.fss" "$SCRATCH/work/"; else cp "$D/probes/$N.fss" "$SCRATCH/work/"; fi
  cd "$SCRATCH/work"
  {
  echo "# $N.fss; build $B at $(git -C $B rev-parse --short HEAD) (climb batch 7C's checker and interpreter); machine: nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/.*: //') MHz; load at start $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS; $(date -u +%FT%TZ)"
  clean "$N"
  echo "== walk: fortress $N.fss"
  timeout 900 $B/bin/fortress $N.fss 2>&1 | strip; echo "exit ${PIPESTATUS[0]}"
  clean "$N"
  echo "== compiled: Shell compile $N.fss"
  timeout 900 java $JAVA_FLAGS -Dfile.encoding=UTF-8 -cp "$CP" com.sun.fortress.Shell compile $N.fss 2>&1 | strip; echo "compile exit ${PIPESTATUS[0]}"
  echo "== compiled: fortress run $N"
  timeout 600 $B/bin/fortress run $N 2>&1 | strip | head -20; echo "run exit ${PIPESTATUS[0]}"
  clean "$N"
  } > "$D/captures/$N.txt" 2>&1
  cat "$D/captures/$N.txt"
done
