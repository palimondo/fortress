#!/bin/bash
# compcheck.sh <Name> <lib-root> <label>: the compiled path's static checker (-stop typecheck) over one probe
# component with the ONE library in scope, under walk's setting (Shell.useInterpreterLibraries: no
# extends-Object pre-desugaring), the library read from <lib-root>/Library and <lib-root>/LibraryBuiltin.
# A copy of explorations/reviews/numerics-plan-coordinator/probes-B/check.sh (CheckDriver.java with the fill
# worker's shadow StaticChecker, -Dprobe.dropApiErrors, private cache) with FORTRESS_HOME this worktree and the
# library root a parameter, so that a copy of the base library can be checked beside the edited tree.
#   -> <Name>.<label>.check.txt
set -u
D="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$D/../../../../.."; FH=$(pwd)
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME=$FH FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
N=${1:?name}; L=${2:?lib-root}; T=${3:?label}
R=$FH/explorations/reviews
W=$FH/tmp/compcheck; C="$W/cache-$N-$T"
rm -rf "$C"; mkdir -p "$C" "$W/checkdrv" "$W/jtmp"
CP=$("$FH/bin/fortress_classpath" | tail -1)
test -f "$W/checkdrv/CheckDriver.class" || javac -nowarn -cp "$CP" -d "$W/checkdrv" \
   "$R/sum-replacement-judgement/CheckDriver.java" \
   "$R/fill-overloads-ways/shadow-src/com/sun/fortress/compiler/StaticChecker.java" || exit 1
FULL="$W/check-$N-$T.full.txt"
cd "$D"
timeout -k 10 1800 java -Xmx4g -Xss64m -Djava.io.tmpdir="$W/jtmp" -Dfortress.caches="$C" \
  "-Dfortress.source.path=;.;$L/LibraryBuiltin;$L/Library;$FH/ProjectFortress/test_library" \
  -Dprobe.dropApiErrors=1 -cp "$W/checkdrv:$CP" CheckDriver -stop typecheck "$N.fss" > "$FULL" 2>&1
RC=$?
{
  echo "# compcheck.sh $N $T $(date -u +%FT%TZ); tree $(git -C "$FH" rev-parse --short HEAD); library from ${L#$FH/}; nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/^[^:]*: *//'); load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | grep -m1 version); FORTRESS_THREADS=1; rc=$RC"
  echo "# api errors dropped (probe.dropApiErrors): $(grep '^@@PROBE checkApi .* -> errors=' "$FULL" | sed -E 's/^@@PROBE checkApi ([^ ]+) -> errors=([0-9]+)$/\1=\2/' | sort -u | tr '\n' ' ')"
  echo "# the probe component's own error lines (with 4 lines of context each):"
  grep -n -A4 "^$D/$N.fss:" "$FULL" | sed "s|$D/||g; s|$FH/||g" | cut -c1-600
  echo "# tallies:"; grep -E "has [0-9]+ errors?\.|### rc=|Exception|^Error" "$FULL" | grep -v "^@@" | head -8
} > "$N.$T.check.txt"
rm -rf "$C"
cat "$N.$T.check.txt"
