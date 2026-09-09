#!/bin/bash
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH
unset JAVA_TOOL_OPTIONS
export FORTRESS_HOME=/home/user/fortress/.claude/worktrees/agent-a57c5c713053ca19b
export FORTRESS_THREADS=1
T=$FORTRESS_HOME/ProjectFortress/tests
for f in "$@"; do
  echo "--- $f ---"
  timeout 300 $FORTRESS_HOME/bin/fortress $T/$f.fss 2>&1 | head -8
done
