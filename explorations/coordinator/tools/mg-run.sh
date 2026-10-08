#!/bin/bash
# mg-run.sh <work-dir> <label> [threads] [full]: the two microGPT checks under walk, each from an empty
# private cache (FORTRESS_CACHES) in a fresh folder under <work-dir> (old runs' folders stay; clear them by hand), each run from its own directory as its header says, both at once,
# with bin/fortress's own JVM (JAVA_FLAGS -Xmx4g -Xss64m) and FORTRESS_THREADS=<threads> (default 1).
# By default the quick pair, MicroGptFlatQuick and MicroGptAplQuick: two forward-and-backward passes each, 7 checks against the goldens,
# timeout 600 s.  With the word full in any position, the full pair, MicroGptFlatCheck and MicroGptAplCheck: 40 checks each, timeout 5400 s.
# Output to <work-dir>/<name>.txt, headed by the machine line (machine.sh) and ended by rc=.
set -u
PROGS="explorations/run-c4/src/MicroGptFlatQuick.fss explorations/apl/mg/MicroGptAplQuick.fss"; LIMIT=600; A=()
for a in "$@"; do
  if [ "$a" = full ]; then PROGS="explorations/run-c4/src/MicroGptFlatCheck.fss explorations/apl/mg/MicroGptAplCheck.fss"; LIMIT=5400
  else A+=("$a"); fi
done
set -- "${A[@]}"
cd "$(dirname "$0")/../../.."                               # $FORTRESS_HOME
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$(pwd)"
unset JAVA_TOOL_OPTIONS
export FORTRESS_THREADS=${3:-1}
W=$(mkdir -p "${1:?usage}" && cd "$1" && pwd)
L=${2:?usage}
for f in $PROGS; do
  (
    t=$(basename "$f" .fss)
    R=$(mktemp -d "$W/run-$t-XXXX"); C="$R/caches"; T="$R/tmp"; mkdir -p "$C" "$T"   # a fresh folder per run; nothing is deleted
    printf '\0\0\0\0' > "$C/global.map"
    {
      bash explorations/compile-ladder/rung-flat-tower/machine.sh "$L $t"
      start=$(date +%s)
      ( cd "$(dirname "$f")" && FORTRESS_CACHES="$C" JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$T" \
          timeout -k 10 $LIMIT "$FORTRESS_HOME/bin/fortress" "$(basename "$f")" < /dev/null )
      echo "rc=$? secs=$(( $(date +%s) - start ))"
    } > "$W/$t.txt" 2>&1
  ) &
done
wait
