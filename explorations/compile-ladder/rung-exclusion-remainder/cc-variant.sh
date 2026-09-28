#!/bin/bash
# cc-variant.sh <work-dir> <lib-dir>...: the gate's checker-count stage (tools/checker-count/run.sh:
# the same WorldFlip driver, instrumented StaticChecker, memo off and table) run with a library copy's
# FortressLibrary.fss as the target, so that the copy's directory heads the source path (Shell.sourcePath)
# and its FortressLibrary.{fsi,fss} shadow the tree's; the shape of reviews/mie-probes/keep/count-variant.sh.
set -u
cd "$(dirname "$0")/../../.."                               # $FORTRESS_HOME
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$(pwd)"
unset JAVA_TOOL_OPTIONS
T=explorations/coordinator/tools/checker-count
W=${1:?usage: cc-variant.sh <work-dir> <lib-dir>...}; shift
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
mkdir -p "$W/classes"
javac -nowarn -cp "$CP" -d "$W/classes" "$T/WorldFlip.java" \
      "$T/shadow-src/com/sun/fortress/compiler/StaticChecker.java" > "$W/javac.txt" 2>&1 || { cat "$W/javac.txt"; exit 1; }
for L in "$@"; do
  v=$(basename "$L"); C="$W/caches-$v"; rm -rf "$C"; mkdir -p "$C"
  timeout -k 10 900 java -Xmx4g -Xss64m -Dfortress.caches="$C" -Dfortress.analyzer.overload.cache=false \
       -cp "$W/classes:$CP" WorldFlip "$L/FortressLibrary.fss" > "$W/run-$v.txt" 2>&1
  {
    printf '#variant\t%s\n#api\terrors\n' "$v"
    grep '^@@PROBE checkApi .* -> errors=' "$W/run-$v.txt" \
        | sed -E 's/^@@PROBE checkApi ([^ ]+) -> errors=([0-9]+)$/\1\t\2/' | sort -u
    printf '#total\t%s\n' "$(grep -oE 'has [0-9]+ errors?\.$' "$W/run-$v.txt" | tail -1 | grep -oE '[0-9]+')"
    printf '#locations\t%s\n' "$(grep -oE '^/[^ ]+:[0-9]+:' "$W/run-$v.txt" | sort -u | wc -l | tr -d ' ')"
    crash=$(grep -m1 '^@@PROBE OverloadingChecker CRASHED on ' "$W/run-$v.txt" | sed 's/^@@PROBE //')
    printf '#crash\t%s\n' "${crash:-none}"
  } > "$W/table-$v.txt"
  rm -rf "$C"
  cat "$W/table-$v.txt"
done
