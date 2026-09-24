#!/bin/bash
# Every command this probe ran, in order.  Run from anywhere:
#
#   ./explorations/perf-probes/prelude/desugar-codegen/run-all.sh <work-dir>
#
# <work-dir> is a scratch directory OUTSIDE the repository: the compiled driver,
# the shadow sources and classes, and a private Fortress cache all live there.
# Nothing is written to default_repository/ and no tracked file is modified.
#
# The captures beside this script are the raw output with the stack-trace lines
# removed (`trim` below); the raw output stays in the work directory.
set -u
cd "$(dirname "$0")/../../../.."                     # $FORTRESS_HOME
source explorations/experiment/env.sh                             # JDK 25, FORTRESS_THREADS=1, -Xmx4g -Xss64m
P=explorations/perf-probes/prelude/desugar-codegen
W=${1:?usage: run-all.sh <work-dir>}
mkdir -p "$W"
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1 | sed 's#:.*/default_repository/caches/bytecode_cache##')

# 0. the driver and the shadow classes
javac -nowarn -cp "$CP" -d "$W/classes" $P/PhaseProbe.java
$P/make-shadows.sh "$W/shadow-src" "$W/shadow-classes"

run () {   # run <out> <probe args...>;  PROBE_JFLAGS carries the -Dprobe.* switches
  local out=$1; shift
  rm -rf "$W/caches"; mkdir -p "$W/caches"
  { echo "########## PhaseProbe $*"; date -u +'# start %Y-%m-%dT%H:%M:%SZ'; S=$(date +%s)
    java $JAVA_FLAGS -XX:-OmitStackTraceInFastThrow -Dfortress.caches="$W/caches" ${PROBE_JFLAGS:-} \
         -cp "$W/shadow-classes:$W/classes:$CP" PhaseProbe "$@"
    echo "exit=$?"; echo "ELAPSED $(( $(date +%s) - S )) s"; } > "$W/$out" 2>&1
  echo "ran $out"
}
trim () {  # keep the diagnostics, drop the stack-trace lines
  grep -v '^@@CG AT\|^@@CG PREAT\|^@@CG OVLAT\|^@@CG CAT\|^@@TC DECLAT' "$W/$1" > "$P/$1"
}
census () { # the header lines, the per-unit error counts, and every distinct checker
            # message with its multiplicity, spans and type arguments normalized away
  { echo "# Census of $2: the run's header lines, the per-compilation-unit error"
    echo "# counts, and every distinct checker message with its multiplicity -- source spans"
    echo "# and instantiated type arguments normalized away, each message cut to 150 columns."
    echo "# The raw dump is in the work directory."
    grep -E "^####|^# start|^### |^@@TC API\b|^@@TC API-CRASH|^@@TC COMPONENT|NOT-SUCCESSFUL|^exit=|^ELAPSED" "$W/$1"
    echo
    echo "# distinct messages, by multiplicity"
    grep -E "^@@TC (APIERR|COMPERR)" "$W/$1" \
      | sed -E 's#'"$PWD"'/[^ :]*\.fs[si]:[0-9]+:[0-9]+(-[0-9]+(:[0-9]+)?)?:?##g' \
      | sed -E 's#\[\\[^]]*\\\]#[\\..\\]#g' | sed -E 's/[[:space:]]+/ /g' | cut -c1-150 \
      | sort | uniq -c | sort -rn
  } > "$P/$2"
}

# 1. reference: the compile path as it is, on the interpreter's library.
#    Dies in the checker at STypesUtil.makeInferenceArg (the `nat` gap).
run 01-reference-full.out -order full Library/FortressLibrary.fss

# 2. method (1): the same phases with TYPECHECK left out of the order.
#    DESUGAR refuses to run at all without the checker's STypeChecker map
#    (AnalyzeResult.java:93) -- this capture is taken with the shadow DesugarPhase
#    disabled, by putting the shadow classes last instead of first.
  rm -rf "$W/caches"; mkdir -p "$W/caches"
  { echo "########## PhaseProbe -order nocheck-desugar (shadow classes NOT on the path)"
    java $JAVA_FLAGS -Dfortress.caches="$W/caches" -cp "$W/classes:$CP" \
         PhaseProbe -order nocheck-desugar Library/FortressLibrary.fss
    echo "exit=$?"; } > "$P/02-nocheck-desugar-refused.out" 2>&1

# 3. with the shadow DesugarPhase, DESUGAR and OVERLOADREWRITE pass the whole library
run 03-nocheck-through-overloadrewrite.out -order nocheck-ovld Library/FortressLibrary.fss
cp "$W/03-nocheck-through-overloadrewrite.out" "$P/"

# 4. the control that decides method (1): the COMPILER's own library, which
#    compiles green, with and without TYPECHECK, and under the tolerant checker
run 04-control-compilerlib-full.out    -order full            -compilerlib Library/CompilerLibrary.fss
trim 04-control-compilerlib-full.out
run 05-control-compilerlib-nocheck.out -order nocheck-codegen -compilerlib Library/CompilerLibrary.fss
cp "$W/05-control-compilerlib-nocheck.out" "$P/"
PROBE_JFLAGS=-Dprobe.tolerant=true \
run 06-control-compilerlib-tolerant.out -order full -compilerlib Library/CompilerLibrary.fss
trim 06-control-compilerlib-tolerant.out

# 5. method (1)'s hole list: no TYPECHECK, code generation made tolerant per declaration
PROBE_JFLAGS=-Dprobe.skipOverloads=true \
run 07-nocheck-codegen.out -order nocheck-codegen Library/FortressLibrary.fss
trim 07-nocheck-codegen.out

# 6. method (2)'s hole list: TYPECHECK in, its failures caught per declaration
PROBE_JFLAGS="-Dprobe.tolerant=true -Dprobe.skipOverloads=true" \
run 08-tolerant-codegen.out -order full Library/FortressLibrary.fss
trim 08-tolerant-codegen.out
PROBE_JFLAGS="-Dprobe.tolerant=true -Dprobe.skipOverloads=true" \
run 09-tolerant-builtin.out -order full ProjectFortress/LibraryBuiltin/FortressBuiltin.fss
trim 09-tolerant-builtin.out

# 7. what the compile path's own desugaring settings cost the checker
PROBE_JFLAGS="-Dprobe.tolerant=true -Dprobe.dumpErrors=true" \
run 10-typecheck-compilerdesugar.out -order typecheck Library/FortressLibrary.fss
census 10-typecheck-compilerdesugar.out 10-typecheck-compilerdesugar.census.txt
PROBE_JFLAGS="-Dprobe.tolerant=true -Dprobe.dumpErrors=true" \
run 11-typecheck-interpdesugar.out -order typecheck -interpdesugar Library/FortressLibrary.fss
census 11-typecheck-interpdesugar.out 11-typecheck-interpdesugar.census.txt

# 8. overload dispatch generation NOT skipped: stopped by hand, see the report
PROBE_JFLAGS=-Dprobe.tolerant=true \
run 12-overloads-not-skipped.out -order full Library/FortressLibrary.fss
trim 12-overloads-not-skipped.out

# 9. the classified tables of the report
for f in 07-nocheck-codegen 08-tolerant-codegen 09-tolerant-builtin; do
  python3 $P/classify.py "$P/$f.out" "$P/08-tolerant-codegen.out" > "$P/$f.classified.txt"
done
