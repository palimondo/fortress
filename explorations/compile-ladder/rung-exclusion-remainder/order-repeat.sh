#!/bin/bash
# order-repeat.sh <lib-dir> <label> <n-default> <n-pinned>: runs ProjectFortress/tests/XXXCoercionTupleOverloadRungC.fss
# under walk with the given library copy heading FORTRESS_SOURCE_PATH, n times with the JVM's default flags (as
# bin/fortress and testSystem run it) and n times with the comparison passes' pinned flags (count-run.sh), each
# from an empty private cache, and prints which of the two ambiguous declarations the message names first
# (rung D's order-repeat probe, compile-ladder/rung-wrap-operators/probes/order/, for this file).
set -u
cd "$(dirname "$0")/../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
L=$(cd "${1:?usage}" && pwd); LABEL=${2:?usage}; ND=${3:-6}; NP=${4:-2}
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
W=$FORTRESS_HOME/tmp/order; mkdir -p "$W"
bash explorations/compile-ladder/rung-exclusion-remainder/machine.sh "XXXCoercionTupleOverloadRungC, $LABEL, library $L"
one () {
  local flags="$1" k="$2" C="$W/c" T="$W/t"; rm -rf "$C" "$T"; mkdir -p "$C" "$T"; printf '\0\0\0\0' > "$C/global.map"
  FORTRESS_SOURCE_PATH=";$L;.;$FORTRESS_HOME/ProjectFortress/LibraryBuiltin;$FORTRESS_HOME/Library;$FORTRESS_HOME/ProjectFortress/test_library" \
  FORTRESS_CACHES="$C" timeout -k 10 900 java -Xmx4g -Xss64m -Djava.io.tmpdir="$T" $flags -Dfile.encoding=UTF-8 -cp "$CP" \
      com.sun.fortress.Shell walk ProjectFortress/tests/XXXCoercionTupleOverloadRungC.fss < /dev/null > "$W/out.txt" 2>&1
  local rc=$? first=$(grep -m1 -o 'pair([^)]*)[^ ]*' "$W/out.txt")
  echo "flags=[$flags] run $k rc=$rc first: $first"
}
for k in $(seq 1 $ND); do one "" $k; done
for k in $(seq 1 $NP); do one "-XX:+UseSerialGC -XX:TieredStopAtLevel=1 -XX:ActiveProcessorCount=1" $k; done
rm -rf "$W"
