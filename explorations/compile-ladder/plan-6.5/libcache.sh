#!/bin/bash
# libcache.sh <dir>: the compiled path's library cache, built once in library order into <dir>
# (the shape of explorations/reviews/flattening-questions-ways/libcache.sh, with env-noclean.sh).
D="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$D/env-noclean.sh"
L=${1:?usage: libcache.sh <dir>}
rm -rf "$L"; mkdir -p "$L/tmp"
cd "$FORTRESS_HOME"
for f in ProjectFortress/LibraryBuiltin/AnyType.fss ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss \
         Library/CompilerAlgebra.fss Library/CompilerLibrary.fss Library/CompilerSystem.fss ; do
    echo "== $f $(date -u +%T)"
    JAVA_FLAGS="$JAVA_FLAGS -Dfortress.caches=$L -Djava.io.tmpdir=$L/tmp" timeout -k 10 1800 bin/fortress compile "$f" || exit 1
done
echo "done $(date -u +%T)"
