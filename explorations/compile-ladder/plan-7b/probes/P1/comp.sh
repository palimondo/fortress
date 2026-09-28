#!/bin/bash
# comp.sh libcache <tag> [jvm switches]   the compiled path's library cache: the five prelude
#                                         components compiled in library order from the private home
#                                         (compile-ladder/plan-6.5/libcache.sh's list) with the P1
#                                         shadow ahead of the build and the given switches
# comp.sh cases <tag> <libtag> <dir> <Name>... [-- jvm switches]
#                                         each <dir>/<Name>.fss compiled into a private copy of that
#                                         cache and run (inference-rule-shadow/comp.sh's shape),
#                                         captured to comp/<Name>.<tag>.txt with its machine line
# The switches are the shadow's: -Dprobe.rtr=paper, -Dprobe.positional=true (make-shadow.py).
set -u
source "$(dirname "${BASH_SOURCE[0]}")/../env.sh"
STEP=$1; TAG=$2; shift 2
SH="$X/p1/classes:"
mkdir -p "$O/P1/comp"
case $STEP in
libcache)
  SW="$*"; L=$X/p1/libcache-$TAG
  rm -rf "$L"; mkdir -p "$L/tmp"
  { echo "# comp.sh libcache $TAG ($SW) $(date -u +%FT%TZ); $(machine_line)"
    for f in ProjectFortress/LibraryBuiltin/AnyType.fss ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss Library/CompilerAlgebra.fss Library/CompilerLibrary.fss Library/CompilerSystem.fss; do
      B=$(date +%s)
      ( cd "$H/$(dirname $f)" && timeout -k 10 1800 java $JAVA_FLAGS $SW -Dfile.encoding=UTF-8 -Dfortress.caches="$L" -Djava.io.tmpdir="$L/tmp" "$SP" \
          -cp "$SH$CP" com.sun.fortress.Shell compile "$(basename $f)" 2>&1 | grep -v '^\s*at ' | sed "s#$H/#<home>/#g" | head -60 )
      echo "== $f rc=${PIPESTATUS[0]} $(( $(date +%s) - B )) s"
    done; } > "$O/P1/comp/libcache-$TAG.txt" 2>&1
  grep "^==\|@@P1" "$O/P1/comp/libcache-$TAG.txt" | cut -c1-200 ;;
cases)
  LT=$1; D=$(cd "${2:?dir}" && pwd); shift 2
  NAMES=(); while [ $# -gt 0 ] && [ "$1" != -- ]; do NAMES+=("$1"); shift; done
  [ "${1:-}" = -- ] && shift; SW="$*"; L=$X/p1/libcache-$LT
  for N in "${NAMES[@]}"; do
    C=$X/p1/comp-run/$N-$TAG; rm -rf "$C"; mkdir -p "$(dirname $C)"; cp -r "$L" "$C"; mkdir -p "$C/tmp" "$C/src"; cp "$D/$N.fss" "$C/src/"
    { echo "# comp $N $TAG ($SW; library cache $LT) $(date -u +%FT%TZ); private home of $(sed -n 2p "$O/snapshot.txt" | cut -d' ' -f2); $(machine_line)"
      echo "## compile"
      ( cd "$C/src" && timeout -k 10 900 java $JAVA_FLAGS $SW -Dfile.encoding=UTF-8 -Dfortress.caches="$C" -Djava.io.tmpdir="$C/tmp" "$SP" \
          -cp "$SH$CP" com.sun.fortress.Shell compile "$N.fss" 2>&1 | grep -v '^\s*at ' | sed "s#$C/src/##g; s#$H/#<home>/#g"; echo "compile rc=${PIPESTATUS[0]}" )
      echo "## run"
      ( cd "$C/src" && timeout -k 10 300 java $JAVA_FLAGS -Dfile.encoding=UTF-8 -Dfortress.caches="$C" \
          -cp "$C/bytecode_cache:$C/bytecode_cache/*:$C/nativewrapper_cache:$CP" com.sun.fortress.runtimeSystem.MainWrapper "$N" 2>&1 \
          | grep -v '^\s*at ' | head -30; echo "run rc=${PIPESTATUS[0]}" )
    } > "$O/P1/comp/$N.$TAG.txt" 2>&1
    rm -rf "$C"
  done ;;
esac
