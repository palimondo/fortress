#!/bin/bash
# Build the compiled path's library cache once, in library order, at $SCRATCH/fqw-libcache.
D="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$D/../../experiment/env.sh"
L=${SCRATCH:-/tmp}/fqw-libcache
rm -rf "$L"; mkdir -p "$L"
cd "$FORTRESS_HOME"
for f in ProjectFortress/LibraryBuiltin/AnyType.fss ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss \
         Library/CompilerAlgebra.fss Library/CompilerLibrary.fss Library/CompilerSystem.fss ; do
    JAVA_FLAGS="$JAVA_FLAGS -Dfortress.caches=$L" timeout -k 10 900 bin/fortress compile "$f" || exit 1
done
