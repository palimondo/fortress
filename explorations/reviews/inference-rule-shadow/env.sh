# env.sh : the settings every script of this probe sources.  Nothing here touches the tree.
# X is the scratch directory (snapshot, class directories, caches, library copies, work files; never
# committed); O is this directory (patch, scripts, probes, captures).
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64
export PATH="$JAVA_HOME/bin:$PATH"
export FORTRESS_HOME=/home/user/fortress
# the snapshot's build is not under $FORTRESS_HOME, so Fortress cannot find its home by probing the classpath
export FORTRESS_AUTOHOME=$FORTRESS_HOME
unset JAVA_TOOL_OPTIONS
export FORTRESS_THREADS=1
export JAVA_FLAGS="-Xmx4g -Xss64m"
X=/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/irs
O=/home/user/fortress/explorations/reviews/inference-rule-shadow
S=$X/snap
# The frozen classpath: the snapshot of ProjectFortress/build (snapshot.sh) ahead of the tree's
# third-party jars, so that a rebuild of the tree by another run cannot change a measurement.
CP="$S/build:$(cd $FORTRESS_HOME && ./bin/fortress_classpath 2>/dev/null | tail -1 | tr ':' '\n' | grep '/third_party/' | paste -sd:)"
machine_line () {   # protocol.md, principle 2
  echo "nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/.*: //') MHz; load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS"
}
