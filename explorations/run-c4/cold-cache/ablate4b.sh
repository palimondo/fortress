#!/bin/bash
set -u
source /home/user/fortress/experiment/env.sh
B=/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/cold-cache
D=$B/p4
go() { local C=$1 O=$2; export FORTRESS_CACHES=$C; mkdir -p $D/tmp
  ( cd "$D" && timeout 400 env JAVA_FLAGS="-Xmx2g -Xss64m -Dfortress.caches=$C -Djava.io.tmpdir=$D/tmp" \
      /home/user/fortress/bin/fortress MaxUser4.fss > "$O" 2>&1 ); echo "rc=$? $O"; rm -rf $D/tmp/fortress*rats; }
rm -rf $D/cC $D/cD
cp -r $D/caches $D/cC; rm -f $D/cC/interpreter_cache/FortressLibrary* $D/cC/interpreter_parsed_cache/FortressLibrary*
go $D/cC $D/ablate-C-FortressLibrary-entries-deleted.txt
cp -r $D/caches $D/cD; rm -f $D/cD/interpreter_cache/*.tfs
go $D/cD $D/ablate-D-whole-interpreter_cache-deleted.txt
echo ablate4b-done
