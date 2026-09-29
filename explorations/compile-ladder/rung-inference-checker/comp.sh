#!/bin/bash
# comp.sh <libcache> <outdir> <tag> <file.fss>...   each program compiled into a private copy of <libcache>
#   with the tree's build (fortress compile), then run (fortress run); captured to <outdir>/<Name>.<tag>.txt
#   with its machine line. Run from the worktree root with tmp/h.sh sourced. With BUILD=<dir> set, the
#   compile runs on that build's classes (the base's snapshot) ahead of the third-party jars; the run
#   always uses the tree's run-time classes, which this rung does not change.
set -u
W=/home/user/fortress-infer
machine_line () { echo "nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/.*: //') MHz; load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS"; }
LIB=$1; OUT=$2; TAG=$3; shift 3; mkdir -p "$OUT"
for F in "$@"; do
  N=$(basename "$F" .fss); C=$W/tmp/cp-cache-$N; rm -rf "$C"; cp -a "$LIB" "$C"; mkdir -p "$C/tmp" "$C/src"; cp "$F" "$C/src/"
  { echo "# comp.sh $N $TAG $(date -u +%FT%TZ); tree $(git -C $W rev-parse --short HEAD) with its working changes; source $F; $(machine_line)"
    echo "## compile"
    if [ -n "${BUILD:-}" ]; then
      TP=$($W/bin/fortress_classpath 2>/dev/null | tail -1 | tr ':' '\n' | grep '/third_party/' | paste -sd:)
      ( cd "$C/src" && FORTRESS_CACHES="$C" FORTRESS_AUTOHOME=$W timeout -k 10 900 java -Xmx4g -Xss64m -Dfile.encoding=UTF-8 -Djava.io.tmpdir=$C/tmp -Dfortress.caches=$C -cp "$BUILD:$TP" com.sun.fortress.Shell compile "$N.fss" 2>&1 | grep -v '^\s*at ' | sed "s#$C/src/##g"; echo "compile rc=${PIPESTATUS[0]} (build $BUILD)" )
    else
    ( cd "$C/src" && FORTRESS_CACHES="$C" JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$C/tmp -Dfortress.caches=$C" timeout -k 10 900 $W/bin/fortress compile "$N.fss" 2>&1 | grep -v '^\s*at ' | sed "s#$C/src/##g"; echo "compile rc=${PIPESTATUS[0]}" )
    fi
    echo "## run"
    ( cd "$C/src" && FORTRESS_CACHES="$C" JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$C/tmp" timeout -k 10 300 $W/bin/fortress run "$N" 2>&1 | grep -v '^\s*at ' | head -40; echo "run rc=${PIPESTATUS[0]}" )
  } > "$OUT/$N.$TAG.txt" 2>&1
  rm -rf "$C"
  echo "$N: $(grep 'rc=' "$OUT/$N.$TAG.txt" | tr '\n' ' ')"
done
