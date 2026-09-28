#!/bin/bash
# run-walk.sh <path/to/Component.fss> <capture.txt> : runs one component under walk, as ant testSpecData
# runs a SpecData example (build.xml:1139; interpreter phase order), from a copy in a private work
# directory with a private cache, so default_repository/caches is not touched. The capture is headed
# by the machine line and ends with the exit code.
set -u
R=/home/user/fortress-specranges
S=$R/tmp/walk-cache; C=$S/caches; T=$S/tmp; W=$S/work
mkdir -p "$C" "$T" "$W"
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH=/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH FORTRESS_HOME=$R FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
export JAVA_FLAGS="-Xmx2g -Xss64m -Dfortress.caches=$C -Djava.io.tmpdir=$T"
src=$1; out=$2; b=$(basename "$src")
cp "$src" "$W/$b"
{ echo "# machine: nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/.*: //') MHz; load at start $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS; tree $(git -C $R rev-parse --short HEAD)$(git -C $R diff --quiet -- SpecData || echo '+working-tree-edits')"
  echo "# walk $src"
  ( cd "$W" && timeout 600 $R/bin/fortress walk "$b" 2>&1 ); echo "rc=$?"; } > "$out"
rm -rf "${T:?}"/fortress*rats
cat "$out"
