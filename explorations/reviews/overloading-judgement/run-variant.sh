#!/bin/bash
# The judgement's measurement driver: the compiled path's static checker over a
# private COPY of the interpreter's library, edited by one variant script, with the
# overloading check forced past the api's early return (the fill worker's shadow
# StaticChecker, explorations/reviews/fill-overloads-ways/shadow-src/). It is that
# worker's run-checker.sh with three changes: the variant scripts live here, the
# copy and its caches go under the judgement's scratch directory, and the capture
# adds a count per overloaded name for the families the judgement names.
#
#   explorations/reviews/overloading-judgement/run-variant.sh <variant> [memo-off]
#
# <variant> is "baseline" or the name of variants/<variant>.py here. With memo-off
# the overloading checker's per-pair memo is switched off
# (-Dfortress.analyzer.overload.cache=false, the tree's own switch), which the
# triage of 2026-09-22 found necessary for counts that do not move with build
# order; the capture is then named <variant>-memo-off.txt. Run from
# $FORTRESS_HOME with explorations/experiment/env.sh sourced. Writes
# captures/<variant>.txt here; the full checker output stays in the scratch copy.
set -u
V=${1:?variant}
MEMO=${2:-}
MEMOFLAG=""; SUFFIX=""
if [ "$MEMO" = memo-off ] ; then MEMOFLAG="-Dfortress.analyzer.overload.cache=false"; SUFFIX="-memo-off"; fi
FH=${FORTRESS_HOME:-$PWD}
J="$FH/explorations/reviews/overloading-judgement"
F="$FH/explorations/reviews/fill-overloads-ways"
SCRATCH=${SCRATCH:?set SCRATCH to a private directory}
W="$SCRATCH/$V$SUFFIX"
rm -rf "$W"; mkdir -p "$W/src" "$W/classes" "$W/caches"
cp -r "$FH/Library" "$W/src/Library"
cp -r "$FH/ProjectFortress/LibraryBuiltin" "$W/src/LibraryBuiltin"
if [ "$V" != baseline ] ; then python3 "$J/variants/$V.py" "$W/src" || exit 1 ; fi

CP=$("$FH/bin/fortress_classpath" 2>/dev/null | tail -1)
javac -nowarn -cp "$CP" -d "$W/classes" "$F/WorldFlipFill.java" \
      "$F/shadow-src/com/sun/fortress/compiler/StaticChecker.java" > "$W/javac.txt" 2>&1 \
  || { cat "$W/javac.txt"; exit 1; }

START=$(date -u +%FT%TZ)
( cd "$W/src" && timeout -k 10 900 java -Xmx4g -Xss64m \
    -Dfortress.caches="$W/caches" \
    -Dfortress.source.path=";.;$W/src/LibraryBuiltin;$W/src/Library;$FH/ProjectFortress/test_library" \
    -Dprobe.overloadAnyway=1 $MEMOFLAG \
    -cp "$W/classes:$CP" WorldFlipFill "$W/src/Library/FortressLibrary.fss" ) > "$W/run.txt" 2>&1
RC=$?
R="$W/run.txt"
OUT="$J/captures/$V$SUFFIX.txt"
{
  echo "# run-variant.sh $V $MEMO, started $START, rc=$RC; tree $(git -C "$FH" rev-parse --short HEAD)"
  echo "# nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo); $(grep -m1 'cpu MHz' /proc/cpuinfo); load at start $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=${FORTRESS_THREADS:-unset}"
  echo "# 'printed' = errors the checker prints; 'hidden' = @@HIDDEN lines, the overloading errors the stock checker never reaches (StaticChecker.java:268-272)."
  grep '^@@PROBE checkApi .* -> errors=' "$R" | sed -E 's/^@@PROBE checkApi ([^ ]+) -> errors=([0-9]+)$/  api \1\t\2/' | sort -u
  printf '  total\t%s\n' "$(grep -oE 'has [0-9]+ errors?\.$' "$R" | tail -1 | grep -oE '[0-9]+')"
  printf '  hidden overloading errors, all names\t%s\n' "$(grep -c '^@@HIDDEN .*Invalid overloading' "$R")"
  python3 "$F/summarise.py" "$R" | sed 's/^/  /'
  echo "  per family (printed + hidden), 'Invalid overloading of <name>' / 'For <name>, the return type':"
  for n in CAP MIN MAX MINMAX juxtaposition seq openRangeHelper combine2D combine3D FORWARD_CMP IN fill; do
    printf '    %-16s invalid %3s   return-type %3s\n' "$n" \
      "$(grep -c "Invalid overloading of $n " "$R")" \
      "$(grep -c "For $n, the return type" "$R")"
  done
  grep -m3 '@@PROBE OverloadingChecker CRASHED\|@@HIDDEN OverloadingChecker CRASHED' "$R"
  echo "  the family lines themselves:"
  grep -E "Invalid overloading of (CAP|MIN|MAX|MINMAX|juxtaposition|seq|openRangeHelper) |For (CAP|MIN|MAX|MINMAX|juxtaposition|seq|openRangeHelper), the return type" "$R" | sed "s|$W/src/||g; s|$FH/||g" | cut -c1-400 | sed 's/^/    /'
} > "$OUT"
echo "variant=$V rc=$RC capture=$OUT full=$R"
