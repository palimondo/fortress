#!/bin/bash
# variant-walk.sh <lib-dir> <work-dir> <program.fss>: runs one program under walk with a library copy's
# FortressLibrary.{fsi,fss} heading the source path (FORTRESS_SOURCE_PATH, the interpreter half of
# perf-probes/nat/zero/run-all.sh), from the program's own directory, under an empty private cache.
set -u
cd "$(dirname "$0")/../../.."                               # $FORTRESS_HOME
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
L=$(cd "${1:?usage}" && pwd); W=$(mkdir -p "${2:?usage}" && cd "$2" && pwd); P=${3:?usage}
t=$(basename "$P" .fss); C="$W/caches-$t"; T="$W/tmp-$t"; rm -rf "$C" "$T"; mkdir -p "$C" "$T"
printf '\0\0\0\0' > "$C/global.map"
bash explorations/compile-ladder/rung-exclusion-remainder/machine.sh "walk $t, library $L"
start=$(date +%s)
( cd "$(dirname "$P")" && FORTRESS_SOURCE_PATH=";$L;.;$FORTRESS_HOME/ProjectFortress/LibraryBuiltin;$FORTRESS_HOME/Library;$FORTRESS_HOME/ProjectFortress/test_library" \
  FORTRESS_CACHES="$C" JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$T" \
  timeout -k 10 5400 "$FORTRESS_HOME/bin/fortress" "$(basename "$P")" < /dev/null )
echo "rc=$? secs=$(( $(date +%s) - start ))"
rm -rf "$C" "$T"
