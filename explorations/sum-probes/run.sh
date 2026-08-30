#!/bin/bash
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH
unset JAVA_TOOL_OPTIONS
export FORTRESS_HOME=/home/user/fortress/.claude/worktrees/agent-a57c5c713053ca19b
export FORTRESS_THREADS=1
exec $FORTRESS_HOME/bin/fortress "$@"
