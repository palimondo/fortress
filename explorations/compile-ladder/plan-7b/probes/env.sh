# env.sh : the settings every script of batch 7b's probes sources (explorations/experiment/env.sh's
# settings, then this probe set's own).  Nothing here touches the tree.
# X is the scratch directory (the private home, class directories, caches, library copies, work
# files; never committed); O is this directory (scripts and captures).  H is a private Fortress
# home made by snapshot.sh from HEAD: its own copy of ProjectFortress/build and of every source
# directory the runs read, so that batch 7R's gather or gate, which may rebuild or edit the main
# tree while these probes run, cannot move a measurement.
source /home/user/fortress/explorations/experiment/env.sh
export FORTRESS_HOME=/home/user/fortress
X=/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/p7b
O=/home/user/fortress/explorations/compile-ladder/plan-7b/probes
H=$X/home
# The frozen classpath: the snapshot's build ahead of the tree's third-party jars.
CP="$H/ProjectFortress/build:$(cd $FORTRESS_HOME && ./bin/fortress_classpath 2>/dev/null | tail -1 | tr ':' '\n' | grep '/third_party/' | paste -sd:)"
SP="-Dfortress.source.path=;.;$H/ProjectFortress/LibraryBuiltin;$H/Library;$H/ProjectFortress/test_library"
machine_line () {   # protocol.md, principle 2
  echo "nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/.*: //') MHz; load at start $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS"
}
