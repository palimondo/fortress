#!/bin/bash
# walk-probe.sh <lib-name> : probe/WideRangesC.fss under walk with one library copy (as walk.sh, run from probe/)
set -u
OUT=/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/coordinator-plan/probes-C
W=$OUT/work; R=/home/user/fortress
source $R/explorations/experiment/env.sh
lib=$1; L=$W/libs/$lib; C=$W/wcache/$lib-probe; rm -rf "$C"; mkdir -p "$C/tmp"
CP=$("$R/bin/fortress_classpath" | tail -1)
o=$OUT/walk/WideRangesC.$lib.txt
cd $OUT/probe
{ echo "# walk-probe.sh $lib $(date -u +%FT%TZ); nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS"
  timeout -k 10 600 java $JAVA_FLAGS -Dfile.encoding=UTF-8 -Dfortress.caches="$C" -Djava.io.tmpdir="$C/tmp" "-Dfortress.source.path=;.;$L;$R/ProjectFortress/test_library" -cp "$CP" com.sun.fortress.Shell WideRangesC.fss 2>&1
  echo "rc=$?"; } > "$o"
rm -rf "$C"; cat "$o" | sed 's#/tmp/claude-0/[^ ]*/libs/#<lib>/#g' | cut -c1-250
