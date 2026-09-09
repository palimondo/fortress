#!/bin/bash
# "fortress typecheck" uses useCompilerLibraries() (Shell.java:454), which has no
# Vector/Matrix at all.  "typecheck-old" uses useInterpreterLibraries()
# (Shell.java:466) -- the library the walk interpreter actually runs.
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH
unset JAVA_TOOL_OPTIONS
export FORTRESS_HOME=/home/user/fortress/.claude/worktrees/agent-a03b77f222b9f971f
export FORTRESS_THREADS=1
D=/tmp/claude-0/-home-user-fortress/bdff267d-67dc-5bb9-b970-8c3dfaa634b6/scratchpad/libvector-experiment
for f in "$@"; do
  echo "########## TYPECHECK-OLD: $f ##########"
  "$FORTRESS_HOME/bin/fortress" typecheck-old "$D/$f" 2>&1 | head -60
  echo "########## DONE ##########"
done
