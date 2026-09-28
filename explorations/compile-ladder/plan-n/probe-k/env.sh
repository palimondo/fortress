# env.sh : the settings every script of probe K sources (explorations/experiment/env.sh's settings,
# then this probe's own).  Nothing here touches the tree.
# X is the scratch directory (the private home, the shadow's sources and classes, caches, raw logs;
# never committed); O is this directory (scripts, patch and captures).  H is a private Fortress home
# made by snapshot.sh from HEAD: its own copy of ProjectFortress/build and of every source directory
# the runs read, so that batch 7R's gather or gate, which may rebuild or edit the main tree while this
# probe runs, cannot move a measurement (the technique of explorations/compile-ladder/plan-7b/probes/).
source /home/user/fortress/explorations/experiment/env.sh
X=/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/pk
O=/home/user/fortress/explorations/compile-ladder/plan-n/probe-k
H=$X/home
# The frozen classpath: the snapshot's build ahead of the tree's third-party jars.
CP="$H/ProjectFortress/build:$(cd /home/user/fortress && ./bin/fortress_classpath 2>/dev/null | tail -1 | tr ':' '\n' | grep '/third_party/' | paste -sd:)"
SHADOW=$X/classes          # the shadow's compiled classes, put ahead of $CP
machine_line () {   # protocol.md, principle 2
  echo "nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/.*: //') MHz; load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS"
}
