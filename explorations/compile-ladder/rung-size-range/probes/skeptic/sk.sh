#!/bin/bash
# sk.sh walk|walkbase <file.fss>...: the skeptic's walk runs, one JVM per file, private caches under tmp/,
# on the rung's tree (walk) or on the base copy tmp/baseA-home with its base build (walkbase); the machine
# line first, then each file's output without Java frames and its rc.
set -u
W=/home/user/fortress-sizerange
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_THREADS=${FORTRESS_THREADS:-1}
unset JAVA_TOOL_OPTIONS
M=$1; shift
case $M in walk) H=$W ;; walkbase) H=$W/tmp/baseA-home ;; *) echo "mode?"; exit 2 ;; esac
export FORTRESS_HOME=$H
C=$W/tmp/sk-caches-$M; T=$W/tmp/sk-tmp-$M; mkdir -p $C $T
[ -f "$C/global.map" ] || printf '\0\0\0\0' > "$C/global.map"
CP=$(cd $H && ./bin/fortress_classpath 2>/dev/null | tail -1)
echo "# sk.sh $M $(date -u +%FT%TZ); home ${H#$W/}; tree $(git -C $W rev-parse --short HEAD); nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //') MHz; load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS"
for f in "$@"; do
  d=$(cd "$(dirname "$f")" && pwd); b=$(basename "$f")
  echo "#### $b ($M)"
  (cd $d && FORTRESS_CACHES=$C timeout -k 10 300 java -Xmx2g -Xss64m -Djava.io.tmpdir=$T -Dfile.encoding=UTF-8 -cp "$CP" com.sun.fortress.Shell walk "$b" < /dev/null 2>&1 | grep -v '^\s*at ' | sed "s#$W/##g" | cut -c1-300; echo "rc=${PIPESTATUS[0]}")
done
