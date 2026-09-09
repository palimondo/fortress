#!/bin/sh
# usage: ./run.sh pNN [threads]
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH
export FORTRESS_HOME=/home/user/fortress
unset JAVA_TOOL_OPTIONS
T=${2:-1}
cd /home/user/fortress
echo "=== \$ FORTRESS_THREADS=$T ./bin/fortress explorations/matrix-ad-probes/$1.fss"
FORTRESS_THREADS=$T ./bin/fortress explorations/matrix-ad-probes/$1.fss 2>&1
echo "=== exit: $?"
