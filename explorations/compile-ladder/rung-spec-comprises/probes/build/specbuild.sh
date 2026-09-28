#!/bin/bash
# specbuild.sh <tag> : genSource then tex in Specification/fortress, each log headed by the machine line
W=/home/user/fortress-speccomprises
cd $W
# env.sh is not sourced here: it removes /tmp/fortress*rats, where the other worktree's Rats! runs keep theirs
export FORTRESS_THREADS=1 JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$W/tmp"
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH=/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH FORTRESS_HOME=$W TMPDIR=$W/tmp
unset JAVA_TOOL_OPTIONS
D=$W/explorations/compile-ladder/rung-spec-comprises/probes/build
machine () { echo "# machine: nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/.*: //') MHz; load at start $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=${FORTRESS_THREADS:-unset}; tree $(git -C $W rev-parse --short HEAD)$(git -C $W diff --quiet -- Specification || echo '+working-tree-edits')"; }
cd $W/Specification/fortress
{ machine; s=$(date +%s); ./ant genSource; echo "# genSource exit $? after $(( $(date +%s)-s )) s"; } > $D/$1-genSource.txt 2>&1
{ machine; s=$(date +%s); ./ant tex; echo "# tex exit $? after $(( $(date +%s)-s )) s"; } > $D/$1-tex.txt 2>&1
