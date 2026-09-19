#!/bin/bash
set -u
source /home/user/fortress/experiment/env.sh
B=/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/cold-cache
go() { # go <dir> <file> <out>
  local D=$1 F=$2 O=$3 C=$1/caches T=$1/tmp; mkdir -p "$T"
  export FORTRESS_CACHES=$C
  ( cd "$D" && timeout 600 env JAVA_FLAGS="-Xmx2g -Xss64m -Dfortress.caches=$C -Djava.io.tmpdir=$T" \
      /home/user/fortress/bin/fortress "$F" > "$O" 2>&1 ); echo "rc=$? $O"; rm -rf "${T:?}"/fortress*rats
}
rm -rf $B/p1/caches; go $B/p1 MaxProbe2.fss $B/p1/run1.txt; go $B/p1 MaxProbe2.fss $B/p1/run2.txt
rm -rf $B/p2/caches; go $B/p2 MaxUser.fss $B/p2/run1.txt
ls $B/p2/caches/interpreter_cache > $B/p2/cache-icache-after-run1.txt
ls $B/p2/caches/interpreter_parsed_cache > $B/p2/cache-parsed-after-run1.txt
go $B/p2 MaxUser.fss $B/p2/run2.txt
rm -f $B/p2/caches/interpreter_cache/MaxLib-*.tfs $B/p2/caches/interpreter_cache/MaxUser-*.tfs
go $B/p2 MaxUser.fss $B/p2/run3-icache-deleted.txt
rm -f $B/p2/caches/interpreter_parsed_cache/MaxLib* $B/p2/caches/interpreter_parsed_cache/MaxUser*
go $B/p2 MaxUser.fss $B/p2/run4-parsedcache-deleted.txt
echo done
