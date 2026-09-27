#!/bin/bash
# comp.sh libcache <stock|rule>        the compiled path's library cache, the five prelude components
#                                      compiled in library order from the snapshot
#                                      (compile-ladder/plan-6.5/libcache.sh's list), with that checker
# comp.sh cases <stock|rule> <dir> <Name>...
#                                      each <dir>/<Name>.fss compiled into a private copy of that cache
#                                      and run (numerics-plan-fable/probes/run-comp-cases.sh's shape),
#                                      captured to comp/<Name>.<variant>.comp.txt with its machine line
set -u
source "$(dirname "${BASH_SOURCE[0]}")/env.sh"
STEP=$1; V=$2; shift 2
SH=""; [ "$V" != stock ] && SH="$X/classes-$V:"
SP="-Dfortress.source.path=;.;$S/LibraryBuiltin;$S/Library;$S/test_library"
L=$X/libcache-$V
case $STEP in
libcache)
  rm -rf "$L"; mkdir -p "$L/tmp"
  { echo "# comp.sh libcache $V $(date -u +%FT%TZ); $(machine_line)"
    for f in LibraryBuiltin/AnyType.fss LibraryBuiltin/CompilerBuiltin.fss Library/CompilerAlgebra.fss Library/CompilerLibrary.fss Library/CompilerSystem.fss; do
      B=$(date +%s)
      ( cd "$S/$(dirname $f)" && timeout -k 10 1800 java $JAVA_FLAGS -Dfile.encoding=UTF-8 -Dfortress.caches="$L" -Djava.io.tmpdir="$L/tmp" "$SP" \
          -cp "$SH$CP" com.sun.fortress.Shell compile "$(basename $f)" 2>&1 | grep -v '^\s*at ' | sed "s#$S/#<snap>/#g" | head -40 )
      echo "== $f rc=${PIPESTATUS[0]} $(( $(date +%s) - B )) s"
    done; } > "$O/comp/libcache-$V.txt" 2>&1
  grep "^==" "$O/comp/libcache-$V.txt" ;;
cases)
  D=$(cd "${1:?dir}" && pwd); shift
  for N in "$@"; do
    C=$X/comp-run/$N-$V; rm -rf "$C"; mkdir -p "$(dirname $C)"; cp -r "$L" "$C"; mkdir -p "$C/tmp" "$C/src"; cp "$D/$N.fss" "$C/src/"
    { echo "# comp $N $V $(date -u +%FT%TZ); tree $(git -C "$FORTRESS_HOME" rev-parse --short HEAD) (snapshot of $(sed -n 2p "$O/snapshot.txt" | cut -d' ' -f2)); $(machine_line)"
      echo "## compile"
      ( cd "$C/src" && timeout -k 10 900 java $JAVA_FLAGS -Dfile.encoding=UTF-8 -Dfortress.caches="$C" -Djava.io.tmpdir="$C/tmp" "$SP" \
          -cp "$SH$CP" com.sun.fortress.Shell compile "$N.fss" 2>&1 | grep -v '^\s*at ' | sed "s#$C/src/##g"; echo "compile rc=${PIPESTATUS[0]}" )
      echo "## run"
      ( cd "$C/src" && timeout -k 10 300 java $JAVA_FLAGS -Dfile.encoding=UTF-8 -Dfortress.caches="$C" \
          -cp "$C/bytecode_cache:$C/bytecode_cache/*:$C/nativewrapper_cache:$CP" com.sun.fortress.runtimeSystem.MainWrapper "$N" 2>&1 \
          | grep -v '^\s*at ' | head -30; echo "run rc=${PIPESTATUS[0]}" )
    } > "$O/comp/$N.$V.comp.txt" 2>&1
    rm -rf "$C"
  done ;;
esac
