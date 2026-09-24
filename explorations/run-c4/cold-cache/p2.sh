#!/bin/bash
set -u
source /home/user/fortress/explorations/experiment/env.sh
B=/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/cold-cache
D=$B/p2; C=$D/caches; T=$D/tmp; mkdir -p "$T"
export FORTRESS_CACHES=$C
go() { ( cd "$D" && timeout 600 env JAVA_FLAGS="-Xmx2g -Xss64m -Dfortress.caches=$C -Djava.io.tmpdir=$T" \
    /home/user/fortress/bin/fortress MaxUser.fss > "$1" 2>&1 ); echo "rc=$? $1"; rm -rf "${T:?}"/fortress*rats; }
rm -rf "$C"
go $D/run1.txt
ls "$C/interpreter_cache" > $D/cache-icache-after-run1.txt
ls "$C/interpreter_parsed_cache" > $D/cache-parsed-after-run1.txt
go $D/run2.txt
rm -f "$C"/interpreter_cache/MaxLib-*.tfs "$C"/interpreter_cache/MaxUser-*.tfs
go $D/run3-icache-deleted.txt
rm -f "$C"/interpreter_parsed_cache/MaxLib* "$C"/interpreter_parsed_cache/MaxUser*
go $D/run4-parsedcache-deleted.txt
echo done
