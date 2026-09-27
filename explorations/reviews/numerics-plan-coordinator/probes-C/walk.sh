#!/bin/bash
# walk.sh <lib-name> <Test> : run ProjectFortress/tests/<Test>.fss under walk (the interpreter)
# with the library copy $W/libs/<lib-name> put in front of the tree's library through
# -Dfortress.source.path (the way explorations/reviews/sum-replacement-judgement/walk-shadow.sh
# and perf-probes/nat/zero/run-all.sh do it), a private cache per run and a private temp
# directory.  Capture: $OUT/walk/<Test>.<lib-name>.txt (machine line, output, rc).
set -u
OUT=/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/coordinator-plan/probes-C
W=$OUT/work; R=/home/user/fortress
source $R/explorations/experiment/env.sh
lib=$1; t=$2
L=$W/libs/$lib; [ -d "$L" ] || { echo "no copy $L"; exit 1; }
C=$W/wcache/$lib-$t; rm -rf "$C"; mkdir -p "$C/tmp" "$OUT/walk"
CP=$("$R/bin/fortress_classpath" | tail -1)
SP="-Dfortress.source.path=;.;$L;$R/ProjectFortress/test_library"
o=$OUT/walk/$t.$lib.txt
cd $R/ProjectFortress/tests
{ echo "# walk.sh $lib $t $(date -u +%FT%TZ); nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/.*: //') MHz; load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS"
  S=$(date +%s)
  timeout -k 10 1200 java $JAVA_FLAGS -Dfile.encoding=UTF-8 -Dfortress.caches="$C" -Djava.io.tmpdir="$C/tmp" $SP -cp "$CP" com.sun.fortress.Shell "$t.fss" 2>&1
  echo "rc=$?"; echo "ELAPSED $(( $(date +%s) - S )) s"; } > "$o"
rm -rf "$C"
tail -2 "$o" | tr '\n' ' '; echo " $o"
