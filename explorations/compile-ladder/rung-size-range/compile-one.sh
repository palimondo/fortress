#!/bin/bash
# compile-one.sh <label> <dir> <Component>...: fortress compile, then fortress run if it compiled, of each named
# component from a scratch copy in tmp/, with the machine line first; the output without Java frames, and rc=.
set -u
cd "$(dirname "$0")/../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=${FORTRESS_THREADS:-1}
unset JAVA_TOOL_OPTIONS
export JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$(pwd)/tmp"
L=$1; D=$2; shift 2
S=$FORTRESS_HOME/tmp/comp-$L-$$; mkdir -p $S
echo "# compile-one.sh $L $(date -u +%FT%TZ); tree $(git rev-parse --short HEAD)$(git diff --quiet HEAD -- ProjectFortress/src Library || echo ' with its working changes'); build ${BUILD_NOTE:-ProjectFortress/build}; nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //') MHz; load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS"
for n in "$@"; do
  cp "$D/$n.fss" $S/
  echo "#### $n compile"
  (cd $S && timeout 600 $FORTRESS_HOME/bin/fortress compile $n.fss 2>&1 | grep -v '^\s*at \|^,' | sed "s#$S/##g; s#$FORTRESS_HOME/##g" | cut -c1-300; echo "compile rc=${PIPESTATUS[0]}") | tee $S/c.txt
  if grep -q '^compile rc=0' $S/c.txt; then
    echo "#### $n run"
    (cd $S && timeout 300 $FORTRESS_HOME/bin/fortress run $n 2>&1 | grep -v '^\s*at ' | sed "s#$S/##g; s#$FORTRESS_HOME/##g" | cut -c1-300; echo "run rc=${PIPESTATUS[0]}")
  fi
  find default_repository/caches -name "*$n*" -exec rm -rf {} + 2>/dev/null
done
rm -rf $S
