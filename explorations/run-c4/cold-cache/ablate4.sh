#!/bin/bash
set -u
source /home/user/fortress/explorations/experiment/env.sh
B=/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/cold-cache
D=$B/p4
go() { local C=$1 O=$2; export FORTRESS_CACHES=$C; mkdir -p $D/tmp
  ( cd "$D" && timeout 300 env JAVA_FLAGS="-Xmx2g -Xss64m -Dfortress.caches=$C -Djava.io.tmpdir=$D/tmp" \
      /home/user/fortress/bin/fortress MaxUser4.fss > "$O" 2>&1 ); echo "rc=$? $O"; rm -rf $D/tmp/fortress*rats; }
rm -rf $D/cA $D/cB
cp -r $D/caches $D/cA; rm -f $D/cA/interpreter_cache/MaxLib4-*.tfs $D/cA/interpreter_cache/MaxUser4-*.tfs
go $D/cA $D/ablate-A-interpreter_cache-deleted.txt
cp -r $D/caches $D/cB; rm -f $D/cB/interpreter_parsed_cache/MaxLib4* $D/cB/interpreter_parsed_cache/MaxUser4*
go $D/cB $D/ablate-B-parsed_cache-deleted.txt
echo ablate4-done
