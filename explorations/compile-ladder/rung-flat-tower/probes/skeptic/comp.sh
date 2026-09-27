#!/bin/bash
# comp.sh <threads> <file.fss>: compile then run on the compiled path with a private copy of the compiler prelude's cache
cd "$(dirname "$2")"
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME=/home/user/fortress-flat
unset JAVA_TOOL_OPTIONS
C=/home/user/fortress-flat/tmp/sk/ccache
export FORTRESS_CACHES=$C
export JAVA_FLAGS="-Xmx2g -Xss64m -Dfortress.caches=$C -Djava.io.tmpdir=/home/user/fortress-flat/tmp/sk/jtmp"
f=$(basename "$2" .fss)
echo "## compile"
timeout 300 /home/user/fortress-flat/bin/fortress compile "$f.fss" 2>&1 < /dev/null; echo "compile rc=$?"
echo "## run FORTRESS_THREADS=$1"
FORTRESS_THREADS=$1 timeout 300 /home/user/fortress-flat/bin/fortress run "$f" 2>&1 < /dev/null; echo "run rc=$?"
