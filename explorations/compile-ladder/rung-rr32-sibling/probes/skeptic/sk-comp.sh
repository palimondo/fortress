#!/bin/bash
# sk-comp.sh <dir> <Name>: compile <dir>/<Name>.fss with the bytecode compiler into a private cache seeded from
# tmp/sk-libcache, run it, and capture <dir>/<Name>.comp.txt.
W=/home/user/fortress-rr32
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64; export PATH="$JAVA_HOME/bin:$PATH"; unset JAVA_TOOL_OPTIONS
export FORTRESS_HOME=$W FORTRESS_THREADS=${FORTRESS_THREADS:-1}
P=$(cd "${1:?usage}" && pwd); N=${2:?usage}
L=$W/tmp/sk-libcache; C="$W/tmp/sk-cc-$N"
rm -rf "$C"; cp -r "$L" "$C"; mkdir -p "$C/tmp"
CP=$(FORTRESS_CACHES=$C "$W/bin/fortress_classpath" | tail -1)
JF="-Xmx4g -Xss64m -Dfile.encoding=UTF-8"
cd "$P"
{ echo "# sk-comp.sh $N $(date -u +%FT%TZ); worktree $(git -C $W rev-parse --short HEAD); nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/.*: //') MHz; load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | grep -m1 version); FORTRESS_THREADS=$FORTRESS_THREADS"
  echo "## compile"
  FORTRESS_CACHES=$C timeout -k 10 1800 java $JF -Dfortress.caches=$C -Djava.io.tmpdir=$C/tmp -cp "$CP" com.sun.fortress.Shell compile "$N.fss" 2>&1
  echo "compile rc=$?"
  echo "## run"
  FORTRESS_CACHES=$C timeout -k 10 600 java $JF -Dfortress.caches="$C" -cp "$C/bytecode_cache:$C/bytecode_cache/*:$C/nativewrapper_cache:$CP" com.sun.fortress.runtimeSystem.MainWrapper "$N" 2>&1
  echo "run rc=$?"; } > "$P/$N.comp.txt" 2>&1
rm -rf "$C"
cat "$P/$N.comp.txt"
