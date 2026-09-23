#!/bin/bash
# run-probes.sh <label>: link and run each probe (and the rung's test program) against the
# current build; each source is touched first so that link re-checks it instead of reusing
# a cached compile, and its jar and analysed-cache entry are removed so that a failed link
# cannot leave an earlier run's classes behind for the run step.  JAVA_FLAGS is passed
# through bin/fortress; the measurement build reads -Dprobe.rungP=off|hier|over|broad.
cd "$(dirname "$0")"
T=.
for p in ${PROBES:-$T/ExclusionRelaxRungP ProbeMIEPickCtl ProbeMIEPick ProbeTypecaseMIE}; do
  n=$(basename $p)
  echo "=== $n ($1)"
  touch $p.fss
  rm -f ../../../../default_repository/caches/bytecode_cache/$n.jar ../../../../default_repository/caches/analyzed_cache/$n-*.tfs
  ../../../../bin/fortress link $p.fss 2>&1 | sed -e 's#^/.*/\([A-Za-z]*\.fss\)#\1#'; echo "link exit=${PIPESTATUS[0]}"
  ../../../../bin/fortress run $n 2>&1 | grep -v '^\s*at \|^\s*\.\.\. [0-9]* more'; echo "run exit=${PIPESTATUS[0]}"
done
