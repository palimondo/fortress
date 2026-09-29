# env.sh : the settings every script of probe Q sources.  explorations/experiment/env.sh's settings
# without its removal of /tmp/fortress*rats, which the batch rungs running beside this probe use
# (the plan-6.5 probe's env-noclean.sh); then this probe's own.  Nothing here touches the tree.
# W is this probe's worktree (wip/probe-q, cut from main at fe918ba5d, the tree after climb batch N's
# first run); X the scratch directory (the private homes, the shadow's sources and classes, caches,
# raw logs; never committed); O this directory (scripts, patches, captures).
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64
export PATH="$JAVA_HOME/bin:$PATH"
unset JAVA_TOOL_OPTIONS
export FORTRESS_THREADS=1
export JAVA_FLAGS="-Xmx4g -Xss64m"
W=/home/user/fortress-probeq
export FORTRESS_HOME=$W
X=/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/pq
O=$W/explorations/compile-ladder/plan-n/probe-q
BASE=fe918ba5d
# The private homes: $X/home-<variant>, each a git archive of $BASE with the variant's library patch
# applied, sharing the worktree's build (a copy of the main tree's, made at 08:46 UTC from the landed
# sources) and its third-party jars and sources by symlink (see homes.sh).
CP="$W/ProjectFortress/build:$(cd $W && ./bin/fortress_classpath 2>/dev/null | tail -1 | tr ':' '\n' | grep '/third_party/' | paste -sd:)"
SHADOW=${SHADOW:-$X/classes}   # the switch's Java shadow, compiled classes, put ahead of $CP
machine_line () {   # protocol.md, principle 2
  echo "nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/.*: //') MHz; load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS"
}
