#!/bin/bash
# count.sh <label> <lib-dir|home> [-Dname=value ...]
# The gate's checker-count stage (coordinator/tools/checker-count/run.sh: its WorldFlip driver,
# instrumented StaticChecker, overloading memo off, and table) on the private home's frozen classes
# with probe P1's shadow ahead of them.  <lib-dir> is a directory of library copies (make-libs.py's
# shape, as reviews/anyintegral-comprises-ways/count.sh uses them): the run starts in it, and "." heads
# the source path, so its files shadow the home's; "home" runs the home's own library.  The -D
# switches go to the JVM (make-shadow.py's: -Dprobe.rtr=..., -Dprobe.positional=true).  With NO_P1_SHADOW
# set, the stock classes alone (probe P2's runs).  Writes
# count/table-<label>.txt (the table, the switches, the machine line and the @@P1 tallies) and
# count/p1-<label>.txt (every @@P1 line with its two declarations), under $COUNT_OUT if set; the raw run
# stays in $X/p1/count/.
set -u
source "$(dirname "${BASH_SOURCE[0]}")/../env.sh"
LBL=${1:?label}; L=${2:?lib-dir}; shift 2
[ "$L" = home ] && L=$H/Library
L=$(cd "$L" && pwd)
T=$FORTRESS_HOME/explorations/coordinator/tools/checker-count
W=$X/p1/count; mkdir -p "$W" "${COUNT_OUT:-$O/P1/count}"
if [ ! -f "$W/classes/WorldFlip.class" ]; then
  mkdir -p "$W/classes"
  javac -nowarn -cp "$CP" -d "$W/classes" "$T/WorldFlip.java" \
        "$T/shadow-src/com/sun/fortress/compiler/StaticChecker.java" > "$W/javac.txt" 2>&1 || { cat "$W/javac.txt"; exit 1; }
fi
C="$W/caches-$LBL"; TMP="$W/tmp-$LBL"; rm -rf "$C" "$TMP"; mkdir -p "$C" "$TMP"
M="$(date -u +%FT%TZ) $(machine_line)"
S=$(date +%s)
( cd "$L" && timeout -k 10 1800 java -Xmx4g -Xss64m -Djava.io.tmpdir="$TMP" -Dfortress.caches="$C" "$SP" \
     -Dfortress.analyzer.overload.cache=false "$@" \
     -cp "$W/classes:${NO_P1_SHADOW:+/nonexistent}${NO_P1_SHADOW:-$X/p1/classes}:$CP" WorldFlip "$L/FortressLibrary.fss" ) > "$W/run-$LBL.txt" 2>&1
RC=$?; E=$(( $(date +%s) - S ))
rm -rf "$C" "$TMP"
R=$W/run-$LBL.txt
{
  printf '#variant\t%s\t%s\n' "$LBL" "$(echo "$L" | sed "s#$X/#<X>/#")"
  printf '#switches\t%s\n' "${*:-none}"
  printf '#api\terrors\n'
  grep '^@@PROBE checkApi .* -> errors=' "$R" | sed -E 's/^@@PROBE checkApi ([^ ]+) -> errors=([0-9]+)$/\1\t\2/' | sort -u
  printf '#total\t%s\n' "$(grep -oE 'has [0-9]+ errors?\.$' "$R" | tail -1 | grep -oE '[0-9]+')"
  printf '#locations\t%s\n' "$(grep -oE '^/[^ ]+:[0-9]+:' "$R" | sort -u | wc -l | tr -d ' ')"
  printf '#crash\t%s\n' "$(grep -m1 '^@@PROBE OverloadingChecker CRASHED on ' "$R" | sed 's/^@@PROBE //' || true)"
  printf '#positional-errors\t%s\n' "$(grep -c 'Positional rule (' "$R")"
  printf '#p1-lines\t%s\n' "$(grep -c '^@@P1 ' "$R")"
  grep '^@@P1 ' "$R" | sed -E 's/ own=.*//; s/ name=.*//' | sort | uniq -c | sed 's/^/#p1\t/'
  printf '#seconds\t%s rc=%s\n#machine\t%s\n' "$E" "$RC" "$M"
} > "${COUNT_OUT:-$O/P1/count}/table-$LBL.txt"
# every error, one line each (reviews/anyintegral-comprises-ways/errlist.py), the copy's and the tree's paths removed
python3 "$FORTRESS_HOME/explorations/reviews/anyintegral-comprises-ways/errlist.py" "$R" "$L" | sed "s#$H/##g" > "${COUNT_OUT:-$O/P1/count}/errors-$LBL.txt"
awk '/^@@P1 /{print; getline; print; getline; print}' "$R" | sed "s#$L/#<lib>/#g; s#$H/#<home>/#g" > "${COUNT_OUT:-$O/P1/count}/p1-$LBL.txt"
cat "${COUNT_OUT:-$O/P1/count}/table-$LBL.txt"
