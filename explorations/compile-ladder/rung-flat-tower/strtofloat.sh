#!/bin/bash
# strtofloat.sh <library-dir-or-"tree"> <work-dir> <label>: probes/StrToFloatProbe.fss under walk, the library's
# strToFloat on four strings.  With a directory holding a git-show copy of the base library, the probe is
# copied there and run from it, so that the copy shadows the tree's library (Shell.sourcePath).
set -u
cd "$(dirname "$0")/../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
LIB=$1; W=$(mkdir -p "$2" && cd "$2" && pwd); L=$3
rm -rf "$W/caches"; mkdir -p "$W/caches" "$W/tmp"; printf '\0\0\0\0' > "$W/caches/global.map"
F=explorations/compile-ladder/rung-flat-tower/probes/StrToFloatProbe.fss
if [ "$LIB" != tree ]; then cp "$F" "$LIB/"; F="$LIB/StrToFloatProbe.fss"; fi
bash explorations/compile-ladder/rung-flat-tower/machine.sh "$L"
FORTRESS_CACHES="$W/caches" JAVA_FLAGS="-Xmx2g -Xss64m -Djava.io.tmpdir=$W/tmp" timeout 300 ./bin/fortress "$F" < /dev/null 2>&1 | grep -v '^	at \|^	[A-Za-z]' | head -12
echo "rc=${PIPESTATUS[0]}"
