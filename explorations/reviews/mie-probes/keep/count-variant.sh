#!/bin/bash
# count-variant.sh <work-dir> <variant>...: the gate's checker count
# (explorations/coordinator/tools/checker-count/run.sh, same driver, same instrumented
# StaticChecker, same table) run on library copies made by make-flat-lib.py instead of on
# Library/FortressLibrary.fss.  The copy's directory is prepended to the source path by
# Shell.sourcePath (Shell.java:1175-1188), so its FortressLibrary.{fsi,fss} and
# FortressBuiltin.{fsi,fss} shadow the tree's; every other api comes from the tree.
# Each variant gets its own fresh -Dfortress.caches under <work-dir>; nothing tracked is written.
# Then count-diff.py <work-dir> L0 FLAT compares the error sets.  The committed captures
# (keep/count/) are the tables of L0, FLAT and FLATN, that comparison, and FLAT's 22 errors.
set -u
cd "$(dirname "$0")/../../../.."                          # $FORTRESS_HOME
source explorations/experiment/env.sh
T=explorations/coordinator/tools/checker-count
K=explorations/reviews/mie-probes/keep
W=${1:?usage: count-variant.sh <work-dir> <variant>...}; shift
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
mkdir -p "$W/classes"
[ -d "$W/libs/L0" ] || python3 $K/make-flat-lib.py "$W/libs" || exit 1
javac -nowarn -cp "$CP" -d "$W/classes" "$T/WorldFlip.java" \
      "$T/shadow-src/com/sun/fortress/compiler/StaticChecker.java" > "$W/javac.txt" 2>&1 || { cat "$W/javac.txt"; exit 1; }
for v in "$@"; do
  C="$W/caches-$v"; rm -rf "$C"; mkdir -p "$C"
  timeout -k 10 900 java -Xmx4g -Xss64m -Dfortress.caches="$C" -cp "$W/classes:$CP" \
       WorldFlip "$W/libs/$v/FortressLibrary.fss" > "$W/run-$v.txt" 2>&1
  {
    printf '#variant\t%s\n#api\terrors\n' "$v"
    grep '^@@PROBE checkApi .* -> errors=' "$W/run-$v.txt" \
        | sed -E 's/^@@PROBE checkApi ([^ ]+) -> errors=([0-9]+)$/\1\t\2/' | sort -u
    printf '#total\t%s\n' "$(grep -oE 'has [0-9]+ errors?\.$' "$W/run-$v.txt" | tail -1 | grep -oE '[0-9]+')"
    printf '#locations\t%s\n' "$(grep -oE '^/[^ ]+:[0-9]+:' "$W/run-$v.txt" | sort -u | wc -l | tr -d ' ')"
    crash=$(grep -m1 '^@@PROBE OverloadingChecker CRASHED on ' "$W/run-$v.txt" | sed 's/^@@PROBE //')
    printf '#crash\t%s\n' "${crash:-none}"
  } > "$W/table-$v.txt"
  cat "$W/table-$v.txt"
done
