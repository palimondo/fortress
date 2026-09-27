#!/bin/bash
# run-nc.sh <edit|stock>: compiles SkNativeCheck.java against the Fortress classpath and runs it on the edited
# build (edit) or with tmp/sk/stock-classes, the four glue classes compiled from 5c368175f, ahead of it (stock).
# Writes probes/skeptic/SkNativeCheck-<way>.txt.
set -u
cd "$(dirname "$0")/../../../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$(pwd)"
unset JAVA_TOOL_OPTIONS
WAY=$1
D=explorations/compile-ladder/rung-overflow-natives/probes/skeptic
CP=$(./bin/fortress_classpath | tail -1)
mkdir -p tmp/sk/nc
javac -nowarn -d tmp/sk/nc -cp "$CP" "$D/SkNativeCheck.java" || exit 1
PRE=tmp/sk/nc
[ "$WAY" = stock ] && PRE="tmp/sk/nc:tmp/sk/stock-classes"
{
  echo "# SkNativeCheck, $WAY, $(date -u +%FT%TZ), nproc $(nproc), $(grep -m1 'model name' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //'), $(grep -m1 'cpu MHz' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //') MHz, load $(cut -d' ' -f1-3 /proc/loadavg), $(java -version 2>&1 | head -1), HEAD $(git rev-parse --short HEAD)"
  start=$(date +%s)
  timeout 1800 java -Xmx2g -cp "$PRE:$CP" com.sun.fortress.interpreter.glue.prim.SkNativeCheck
  echo "rc=$? secs=$(( $(date +%s) - start ))"
} > "$D/SkNativeCheck-$WAY.txt" 2>&1
