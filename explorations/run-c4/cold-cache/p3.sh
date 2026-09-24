#!/bin/bash
set -u
source /home/user/fortress/explorations/experiment/env.sh
B=/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/cold-cache
D=$B/p3; C=$D/caches; T=$D/tmp; mkdir -p "$T"; rm -rf "$C"
export FORTRESS_CACHES=$C
go() { ( cd "$D" && timeout 600 env JAVA_FLAGS="-Xmx2g -Xss64m -Dfortress.caches=$C -Djava.io.tmpdir=$T" \
    /home/user/fortress/bin/fortress MaxUser3.fss > "$1" 2>&1 ); echo "rc=$? $1"; rm -rf "${T:?}"/fortress*rats; }
go $D/run1.txt
go $D/run2.txt
echo done
