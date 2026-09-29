#!/bin/bash
# sk-libcache.sh: the compiled path's library cache, built in the brief's library order into tmp/sk-libcache
# on this worktree (the compiler's world reads none of the rung's files).
W=/home/user/fortress-rr32
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64; export PATH="$JAVA_HOME/bin:$PATH"; unset JAVA_TOOL_OPTIONS
export FORTRESS_HOME=$W FORTRESS_THREADS=${FORTRESS_THREADS:-1}
L=$W/tmp/sk-libcache
rm -rf "$L"; mkdir -p "$L/tmp"; printf '\0\0\0\0' > "$L/global.map"
cd "$W/ProjectFortress"
for f in LibraryBuiltin/AnyType.fss LibraryBuiltin/CompilerBuiltin.fss ../Library/CompilerLibrary.fss \
         ../Library/CompilerAlgebra.fss ../Library/CompilerSystem.fss ; do
    echo "== $f $(date -u +%T)"
    FORTRESS_CACHES=$L JAVA_FLAGS="-Xmx4g -Xss64m -Dfile.encoding=UTF-8 -Dfortress.caches=$L -Djava.io.tmpdir=$L/tmp" timeout -k 10 1800 ../bin/fortress compile "$f" || exit 1
done
echo "done $(date -u +%T)"
