#!/bin/bash
# The compile-path probes for array-design-review.md, under a private cache
# (nothing under default_repository/ touched), library order first as in
# explorations/repo-internals.md:170-179, one thread.  Captures land beside
# the probes: <p>.compile.out (+ exit), <p>.run.out when it compiled, and
# p3's interpreter run under a second private cache, <p>.interp.out.
set -u
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$HERE/../../../experiment/env.sh"
ROOT="${1:-/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad}/adr"
export FORTRESS_CACHES="$ROOT/caches"
export JAVA_FLAGS="-Xmx2g -Xss64m -Dfortress.caches=$ROOT/caches -Djava.io.tmpdir=$ROOT/tmp"
CP=$("$FORTRESS_HOME"/bin/fortress_classpath | tail -1)
rm -rf "$ROOT"; mkdir -p "$ROOT/tmp" "$ROOT/caches" "$ROOT/icaches"
fc () { timeout -k 5 300 java $JAVA_FLAGS -Dfile.encoding=UTF-8 -cp "$CP" com.sun.fortress.Shell compile "$@"; }
fr () { timeout -k 5 120 "$FORTRESS_HOME"/bin/run "$@"; }
cd "$FORTRESS_HOME/ProjectFortress" || exit 1
: > "$HERE/library-order.out"
for f in LibraryBuiltin/AnyType.fss LibraryBuiltin/CompilerBuiltin.fss \
         ../Library/CompilerLibrary.fss ../Library/CompilerAlgebra.fss \
         ../Library/CompilerSystem.fss ; do
    echo "library: $f" >> "$HERE/library-order.out"
    fc "$f" >> "$HERE/library-order.out" 2>&1 || { echo "LIBRARY BUILD FAILED on $f" >> "$HERE/library-order.out"; exit 1; }
done
echo "library order done $(date -u +%T)" >> "$HERE/library-order.out"
cd "$HERE"
for p in p1_monostore p1b_typecase p2_nongeneric p3_static_dispatch p3b_static_dispatch_opr; do
  fc "$p.fss" > "$p.compile.out" 2>&1; rc=$?; echo "exit $rc" >> "$p.compile.out"
  if [ $rc -eq 0 ]; then fr "$p" > "$p.run.out" 2>&1; echo "exit $?" >> "$p.run.out"; fi
done
# the interpreter, same program, its own private cache
export FORTRESS_CACHES="$ROOT/icaches"
export JAVA_FLAGS="-Xmx2g -Xss64m -Dfortress.caches=$ROOT/icaches -Djava.io.tmpdir=$ROOT/tmp"
timeout -k 5 900 "$FORTRESS_HOME"/bin/fortress p3_static_dispatch.fss > p3_static_dispatch.interp.out 2>&1; echo "exit $?" >> p3_static_dispatch.interp.out
echo "all done $(date -u +%T)" >> "$HERE/library-order.out"
