#!/bin/bash
set -u
cd /home/user/fortress-ints
source experiment/env.sh >/dev/null 2>&1
export TMPDIR=/home/user/fortress-ints/tmp
export JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=/home/user/fortress-ints/tmp"
cd /home/user/fortress-ints/ProjectFortress
for f in LibraryBuiltin/CompilerBuiltin.fss ../Library/CompilerLibrary.fss \
         ../Library/CompilerAlgebra.fss ../Library/CompilerSystem.fss ; do
    echo "=== library: $f $(date -Is)"
    timeout 600 ../bin/fortress compile "$f" || { echo "LIBRARY BUILD FAILED on $f"; exit 1; }
done
echo "=== library rebuild done $(date -Is)"
