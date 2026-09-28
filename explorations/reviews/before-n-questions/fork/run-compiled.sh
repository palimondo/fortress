#!/bin/bash
# run-compiled.sh <stock|rule> <Name>...  : compiles each <Name>.fss of $DIR (default fork/) with the compiled checker,
# stock or with the inference-rule shadow's rule.patch (explorations/reviews/inference-rule-shadow/),
# and runs it. It reuses that shadow's frozen snapshot build, its class directory and its compiler-library
# cache, which survive in the session scratch directory ($X of the shadow's env.sh); each case gets a
# private copy of the cache, deleted after the run. The shape is the shadow's comp.sh "cases" step; the
# captures go to this directory instead of the shadow's. No ant; nothing tracked outside this directory.
set -u
source /home/user/fortress/explorations/reviews/inference-rule-shadow/env.sh
O=${DIR:-/home/user/fortress/explorations/reviews/before-n-questions/fork}
V=$1; shift
SH=""; [ "$V" != stock ] && SH="$X/classes-$V:"
SP="-Dfortress.source.path=;.;$S/LibraryBuiltin;$S/Library;$S/test_library"
L=$X/libcache-$V
for N in "$@"; do
  C=$X/before-n-run/$N-$V; rm -rf "$C"; mkdir -p "$(dirname $C)"; cp -r "$L" "$C"; mkdir -p "$C/tmp" "$C/src"; cp "$O/$N.fss" "$C/src/"
  { echo "# compiled $N $V $(date -u +%FT%TZ); tree $(git -C "$FORTRESS_HOME" rev-parse --short HEAD) (checker and compiler library of the shadow's snapshot, $(sed -n 2p /home/user/fortress/explorations/reviews/inference-rule-shadow/snapshot.txt | cut -d' ' -f2)); $(machine_line)"
    echo "## compile"
    ( cd "$C/src" && timeout -k 10 900 java $JAVA_FLAGS -Dfile.encoding=UTF-8 -Dfortress.caches="$C" -Djava.io.tmpdir="$C/tmp" "$SP" \
        -cp "$SH$CP" com.sun.fortress.Shell compile "$N.fss" 2>&1 | grep -v '^\s*at ' | sed "s#$C/src/##g"; echo "compile rc=${PIPESTATUS[0]}" )
    echo "## run"
    ( cd "$C/src" && timeout -k 10 300 java $JAVA_FLAGS -Dfile.encoding=UTF-8 -Dfortress.caches="$C" \
        -cp "$C/bytecode_cache:$C/bytecode_cache/*:$C/nativewrapper_cache:$CP" com.sun.fortress.runtimeSystem.MainWrapper "$N" 2>&1 \
        | grep -v '^\s*at ' | head -30; echo "run rc=${PIPESTATUS[0]}" )
  } > "$O/$N.$V.txt" 2>&1
  rm -rf "$C"
  cat "$O/$N.$V.txt"
done
