#!/bin/bash
set -u
source /home/user/fortress/experiment/env.sh
D=/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/cold-cache/mini
C=$D/caches; TMPD=$D/tmp; mkdir -p "$TMPD"
rm -rf "$C"; mkdir -p "$C"
export FORTRESS_CACHES=$C
go() { ( cd "$D" && timeout 600 env JAVA_FLAGS="-Xmx2g -Xss64m -Dfortress.caches=$C -Djava.io.tmpdir=$TMPD" \
    /home/user/fortress/bin/fortress MaxProbe.fss > "$1" 2>&1 ); echo "rc=$? -> $1"; rm -rf "${TMPD:?}"/fortress*rats; }
go "$D/m-run1.txt"
ls "$C/interpreter_cache" > "$D/m-cache1.txt"
go "$D/m-run2.txt"
# now delete ONLY the component's own cached tree and re-run
rm -f "$C"/interpreter_cache/MaxProbe-*.tfs
go "$D/m-run3-after-deleting-MaxProbe-tfs.txt"
go "$D/m-run4.txt"
echo done
