#!/bin/bash
# run.sh <scratch> : decision A's probes (WayA*.fss beside this script) on both paths, one JVM at a time.
# The compiled path in the compiler's own world (the prelude compiled into a private cache first, in the
# order of explorations/repo-internals.md:170-179), then `fortress run`; walk with the one library, a second
# private cache.  Captures beside the probes: <p>.compile.txt, <p>.run.txt, <p>.walk.txt.
# Never removes /tmp/fortress*rats; every JVM's temporary directory is <scratch>'s own.
set -u
H=${FORTRESS_HOME:?source an env with FORTRESS_HOME}
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH=/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH
export FORTRESS_THREADS=${FORTRESS_THREADS:-1}; unset JAVA_TOOL_OPTIONS
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
W=${1:?scratch}; mkdir -p "$W"; W=$(cd "$W" && pwd); rm -rf "$W/cc" "$W/wc" "$W/tmp"; mkdir -p "$W/cc" "$W/wc" "$W/tmp"
CP=$("$H"/bin/fortress_classpath | tail -1)
PROBES=${PROBES:-"WayANoCast WayACast WayACastSized WayASpec"}
machine () { echo "# $(date -u +%FT%TZ); nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS; tree $(git -C "$H" rev-parse --short HEAD)"; }
fc () { FORTRESS_CACHES="$W/cc" timeout -k 5 600 java -Xmx2g -Xss64m -Dfortress.caches="$W/cc" -Djava.io.tmpdir="$W/tmp" -Dfile.encoding=UTF-8 -cp "$CP" com.sun.fortress.Shell compile "$@"; }
fr () { FORTRESS_CACHES="$W/cc" JAVA_FLAGS="-Xmx2g -Xss64m -Dfortress.caches=$W/cc -Djava.io.tmpdir=$W/tmp" timeout -k 5 300 "$H"/bin/run "$@"; }
fw () { FORTRESS_CACHES="$W/wc" timeout -k 5 900 java -Xmx2g -Xss64m -Dfortress.caches="$W/wc" -Djava.io.tmpdir="$W/tmp" -cp "$CP" com.sun.fortress.Shell walk "$@"; }
cd "$H/ProjectFortress" || exit 1
{ machine; for f in LibraryBuiltin/AnyType.fss LibraryBuiltin/CompilerBuiltin.fss ../Library/CompilerLibrary.fss ../Library/CompilerAlgebra.fss ../Library/CompilerSystem.fss; do
    echo "library: $f"; fc "$f" 2>&1 | tail -3; echo "exit ${PIPESTATUS[0]}"; done; } > "$W/library-order.txt" 2>&1
grep -q 'exit [1-9]' "$W/library-order.txt" && { echo "library build failed"; cat "$W/library-order.txt"; exit 1; }
cd "$HERE" || exit 1
for p in $PROBES; do
  { machine; fc "$p.fss" 2>&1 | sed "s#$HERE/##g"; echo "exit ${PIPESTATUS[0]}"; } > "$p.compile.txt"
  if grep -q '^exit 0$' "$p.compile.txt"; then { machine; fr "$p" 2>&1 | grep -v '^\s*at '; echo "exit ${PIPESTATUS[0]}"; } > "$p.run.txt"; else rm -f "$p.run.txt"; fi
  { machine; fw "$p.fss" 2>&1 | grep -v '^\s*at \|Turn on "-debug'; echo "exit ${PIPESTATUS[0]}"; } > "$p.walk.txt"
  echo "$p: compile $(tail -1 "$p.compile.txt"), run $( [ -f "$p.run.txt" ] && tail -1 "$p.run.txt" || echo -), walk $(tail -1 "$p.walk.txt")"
done
