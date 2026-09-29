#!/bin/bash
# mg-run.sh <tree> <work-dir> <label>: rung F's mg-run.sh (explorations/coordinator/tools/mg-run.sh)
# with the tree to run as its first argument, so that the base checks run a checkout of the base and the
# edit's this worktree, both on this worktree's ProjectFortress/build. The two microGPT checks under walk,
# each from an empty private cache (FORTRESS_CACHES), each run from its own directory, both at once, with
# bin/fortress's JVM (JAVA_FLAGS -Xmx4g -Xss64m) and FORTRESS_THREADS=1. Output to <work-dir>/<name>.txt,
# headed by the machine line and ended by rc= secs=. Timeout 5400 s, MG_TIMEOUT to change it: on the loaded box of
# 2026-09-27 (load 25 to 36) both base checks reached 5400 s four fifths of the way through.
set -u
R=$(cd "$(dirname "$0")/../../.." && pwd)
TREE=$(cd "${1:?usage: mg-run.sh <tree> <work-dir> <label>}" && pwd)
W=$(mkdir -p "${2:?usage}" && cd "$2" && pwd)
L=${3:?usage}
# FORTRESS_AUTOHOME names the tree whose Library/ the interpreter reads (count-run.sh says why)
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$TREE" FORTRESS_AUTOHOME="$TREE"
unset JAVA_TOOL_OPTIONS
export FORTRESS_THREADS=1
cd "$TREE"
for f in explorations/run-c4/src/MicroGptFlatCheck.fss explorations/apl/mg/MicroGptAplCheck.fss; do
  (
    t=$(basename "$f" .fss)
    C="$W/caches-$t"; T="$W/tmp-$t"; rm -rf "$C" "$T"; mkdir -p "$C" "$T"
    printf '\0\0\0\0' > "$C/global.map"
    {
      bash "$R/explorations/compile-ladder/rung-flat-tower/machine.sh" "$L $t"
      start=$(date +%s)
      ( cd "$(dirname "$f")" && FORTRESS_CACHES="$C" JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$T" \
          timeout -k 10 "${MG_TIMEOUT:-5400}" "$TREE/bin/fortress" "$(basename "$f")" < /dev/null )
      echo "rc=$? secs=$(( $(date +%s) - start ))"
    } > "$W/$t.txt" 2>&1
  ) &
done
wait
