#!/bin/bash
# run-compiled.sh <stock|rule|opt2> <Name>... : compiles each <Name>.fss of this directory with the compiled
# checker, stock, with the inference-rule shadow's rule.patch (explorations/reviews/inference-rule-shadow/),
# or with this note's opt2 variant (opt2.patch over the rule's sources, built by build-opt2.sh), and runs it.
# The shape is before-n-questions/fork/run-compiled.sh's: the shadow's frozen snapshot build and class
# directories and its compiler-library cache (the rule's cache for opt2), all in the session scratch
# directory; each case gets a private copy of the cache under this note's scratch directory ($P), deleted
# after the run unless KEEP=1. One JVM at a time. No ant; nothing tracked outside this directory.
set -u
source /home/user/fortress/explorations/reviews/inference-rule-shadow/env.sh
O=/home/user/fortress/explorations/reviews/option-2-soundness
P=/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/o2s
V=$1; shift
case $V in
  stock) SH=""; L=$X/libcache-stock ;;
  rule)  SH="$X/classes-rule:"; L=$X/libcache-rule ;;
  opt2)  SH="$P/classes-opt2:"; L=$X/libcache-rule ;;
esac
SP="-Dfortress.source.path=;.;$S/LibraryBuiltin;$S/Library;$S/test_library"
mkdir -p "$O/captures"
for N in "$@"; do
  C=$P/comp/$N-$V; rm -rf "$C"; mkdir -p "$(dirname $C)"; cp -r "$L" "$C"; mkdir -p "$C/tmp" "$C/src"; cp "$O/$N.fss" "$C/src/"
  { echo "# compiled $N $V $(date -u +%FT%TZ); tree $(git -C "$FORTRESS_HOME" rev-parse --short HEAD) (checker and compiler library of the inference-rule shadow's snapshot, $(sed -n 2p /home/user/fortress/explorations/reviews/inference-rule-shadow/snapshot.txt | cut -d' ' -f2)); $(machine_line)"
    echo "## compile"
    ( cd "$C/src" && timeout -k 10 900 java $JAVA_FLAGS -Dfile.encoding=UTF-8 -Dfortress.caches="$C" -Djava.io.tmpdir="$C/tmp" "$SP" \
        -cp "$SH$CP" com.sun.fortress.Shell compile "$N.fss" 2>&1 | grep -v '^\s*at ' | sed "s#$C/src/##g" | head -40; echo "compile rc=${PIPESTATUS[0]}" )
    echo "## run"
    ( cd "$C/src" && timeout -k 10 300 java $JAVA_FLAGS -Dfile.encoding=UTF-8 -Dfortress.caches="$C" \
        -cp "$C/bytecode_cache:$C/bytecode_cache/*:$C/nativewrapper_cache:$CP" com.sun.fortress.runtimeSystem.MainWrapper "$N" 2>&1 \
        | grep -v '^\s*at ' | head -40; echo "run rc=${PIPESTATUS[0]}" )
  } > "$O/captures/$N.$V.txt" 2>&1
  [ "${KEEP:-0}" = 1 ] || rm -rf "$C"
  cat "$O/captures/$N.$V.txt"
done
