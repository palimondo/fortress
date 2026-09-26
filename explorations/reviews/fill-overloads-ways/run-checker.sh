#!/bin/bash
# Run the compiled path's static checker over a private COPY of the interpreter's
# library, optionally edited by a variant script, and summarise the overloading
# errors about fill and the array factories.
#
#   explorations/reviews/fill-overloads-ways/run-checker.sh <variant> [-objectBound]
#
# <variant> is "baseline" or the name of variants/<variant>.py, a Python script that
# edits the copy in place (it is given the copy's root, holding Library/ and
# LibraryBuiltin/). Nothing in the tree is edited: Library/ and
# ProjectFortress/LibraryBuiltin/ are copied to $SCRATCH/<variant>/src, the checker is
# pointed at the copy with -Dfortress.source.path (ProjectProperties.java:301), and
# its caches go to -Dfortress.caches (ProjectProperties.java:261).
#
# The checker is the checker-count stage's (explorations/coordinator/tools/checker-count/,
# WorldFlip + its instrumented StaticChecker), with one more probe point: under
# -Dprobe.overloadAnyway the OverloadingChecker also runs on a unit that already has
# errors, and prints what it finds as "@@HIDDEN" lines (StaticChecker.java:268-275 in the
# stock checker returns before it).
#
# Run from $FORTRESS_HOME with explorations/experiment/env.sh sourced.
set -u
V=${1:?variant}; shift
FLAGS="$*"
FH=${FORTRESS_HOME:-$PWD}
D="$FH/explorations/reviews/fill-overloads-ways"
SCRATCH=${SCRATCH:-${TMPDIR:-/tmp}/fill-overloads-ways}
W="$SCRATCH/$V${FLAGS:+-objbound}"
rm -rf "$W"; mkdir -p "$W/src" "$W/classes" "$W/caches"
cp -r "$FH/Library" "$W/src/Library"
cp -r "$FH/ProjectFortress/LibraryBuiltin" "$W/src/LibraryBuiltin"
if [ "$V" != baseline ] ; then python3 "$D/variants/$V.py" "$W/src" || exit 1 ; fi

CP=$("$FH/bin/fortress_classpath" 2>/dev/null | tail -1)
javac -nowarn -cp "$CP" -d "$W/classes" "$D/WorldFlipFill.java" \
      "$D/shadow-src/com/sun/fortress/compiler/StaticChecker.java" > "$W/javac.txt" 2>&1 \
  || { cat "$W/javac.txt"; exit 1; }

( cd "$W/src" && timeout -k 10 900 java -Xmx4g -Xss64m \
    -Dfortress.caches="$W/caches" \
    -Dfortress.source.path=";.;$W/src/LibraryBuiltin;$W/src/Library;$FH/ProjectFortress/test_library" \
    -Dprobe.overloadAnyway=1 \
    -cp "$W/classes:$CP" WorldFlipFill $FLAGS "$W/src/Library/FortressLibrary.fss" ) > "$W/run.txt" 2>&1
echo "variant=$V flags=[$FLAGS] rc=$? output=$W/run.txt"
R="$W/run.txt"
grep '^@@PROBE checkApi .* -> errors=' "$R" | sed -E 's/^@@PROBE checkApi ([^ ]+) -> errors=([0-9]+)$/  api \1\t\2/' | sort -u
printf '  total\t%s\n' "$(grep -oE 'has [0-9]+ errors?\.$' "$R" | tail -1 | grep -oE '[0-9]+')"
printf '  hidden overloading errors, all names\t%s\n' "$(grep -c '^@@HIDDEN .*Invalid overloading' "$R")"
python3 "$D/summarise.py" "$R" | sed 's/^/  /'
grep -m3 '@@PROBE OverloadingChecker CRASHED\|@@HIDDEN OverloadingChecker CRASHED' "$R"
exit 0
