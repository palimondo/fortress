#!/bin/bash
# diag.sh <dir> <cache> <threads>: run diag_fwd.fss from <dir> under walk
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME=/home/user/fortress-flat
unset JAVA_TOOL_OPTIONS
export FORTRESS_THREADS=$3
mkdir -p $2; [ -f $2/global.map ] || printf '\0\0\0\0' > $2/global.map
cd $1 && FORTRESS_CACHES=$2 JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=/home/user/fortress-flat/tmp/sk/jtmp" timeout -k 10 1800 /home/user/fortress-flat/bin/fortress diag_fwd.fss < /dev/null 2>&1
echo "rc=$?"
