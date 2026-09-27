#!/bin/bash
# walk.sh <threads> <file.fss> [cache-dir]: one walk run with a private cache
cd /home/user/fortress-flat
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME=/home/user/fortress-flat
unset JAVA_TOOL_OPTIONS
export FORTRESS_THREADS=$1
C=${3:-/home/user/fortress-flat/tmp/sk/caches}
mkdir -p "$C" /home/user/fortress-flat/tmp/sk/jtmp
[ -f "$C/global.map" ] || printf '\0\0\0\0' > "$C/global.map"
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
FORTRESS_CACHES="$C" timeout -k 10 900 java -Xmx4g -Xss64m -Djava.io.tmpdir=/home/user/fortress-flat/tmp/sk/jtmp -Dfile.encoding=UTF-8 -cp "$CP" com.sun.fortress.Shell walk "$2" < /dev/null 2>&1
echo "rc=$?"
