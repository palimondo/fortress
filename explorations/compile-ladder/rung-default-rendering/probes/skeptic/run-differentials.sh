#!/bin/bash
# The skeptic's differentials for rung S: each probe under walk, then fortress compile + fortress run.
# MODE=both (default), compiled or walk; run from anywhere.
cd "$(dirname "$0")"
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH=/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH
export FORTRESS_HOME="$(cd ../../../../.. && pwd)" TMPDIR="$(cd ../../../../.. && pwd)/tmp" FORTRESS_THREADS=1
export JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$TMPDIR"
unset JAVA_TOOL_OPTIONS
F=$FORTRESS_HOME/bin/fortress
echo "### rev=$(git -C $FORTRESS_HOME rev-parse --short HEAD) $(date -Is) FORTRESS_THREADS=$FORTRESS_THREADS MODE=${MODE:-both}"
for p in "$@"; do
  echo "################ $p.fss"
  if [ "${MODE:-both}" != compiled ]; then
    echo "--- walk: bin/fortress $p.fss"
    $F $p.fss 2>&1 | grep -v '^\s*at ' | head -30; echo "walk rc=${PIPESTATUS[0]}"
  fi
  if [ "${MODE:-both}" != walk ]; then
    echo "--- compiled: bin/fortress compile $p.fss && bin/fortress run $p"
    $F compile $p.fss 2>&1 | grep -v '^\s*at ' | head -30; echo "compile rc=${PIPESTATUS[0]}"
    $F run $p 2>&1 | grep -v '^\s*at ' | head -30; echo "run rc=${PIPESTATUS[0]}"
  fi
done
