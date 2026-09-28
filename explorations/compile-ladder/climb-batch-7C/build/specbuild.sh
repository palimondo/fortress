#!/bin/bash
# specbuild.sh : the specification rebuilt on the merged tree of climb batch 7C, ./ant genSource then ./ant tex in
# Specification/fortress, each log headed by its machine line (climb batch 7R's build/specbuild.sh, on main).
R=/home/user/fortress
cd $R && source explorations/experiment/env.sh >/dev/null 2>&1
D=$R/explorations/compile-ladder/climb-batch-7C/build
machine () { echo "# machine: nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/.*: //') MHz; load at start $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=${FORTRESS_THREADS:-unset}; tree $(git -C $R rev-parse --short HEAD) (rung Y) with rung X and the gather's edits in the working tree"; }
cd $R/Specification/fortress
{ machine; s=$(date +%s); ./ant genSource; echo "# genSource exit $? after $(( $(date +%s)-s )) s"; } > $D/gather-genSource.txt 2>&1
{ machine; s=$(date +%s); ./ant tex; echo "# tex exit $? after $(( $(date +%s)-s )) s"; } > $D/gather-tex.txt 2>&1
