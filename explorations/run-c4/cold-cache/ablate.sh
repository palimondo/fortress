#!/bin/bash
set -u
source /home/user/fortress/experiment/env.sh
B=/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/cold-cache
run() { local C=$1 O=$2
  export FORTRESS_CACHES=$C
  mkdir -p "$C/../tmpa"
  ( cd /home/user/fortress/explorations/run-c4/src && timeout 200 env JAVA_FLAGS="-Xmx4g -Xss64m -Dfortress.caches=$C -Djava.io.tmpdir=$C/../tmpa" \
      /home/user/fortress/bin/fortress MicroGptFlatCheck.fss > "$O" 2>&1 ); echo "rc=$? $O"
  rm -rf "$C/../tmpa"/fortress*rats; }
rm -rf $B/caches5 $B/caches6
cp -r $B/caches1 $B/caches5; rm -f $B/caches5/interpreter_cache/FlatArrays-*.tfs
run $B/caches5 $B/ablate-A-interpreter_cache-FlatArrays-deleted.txt
cp -r $B/caches1 $B/caches6; rm -f $B/caches6/interpreter_parsed_cache/FlatArrays*
run $B/caches6 $B/ablate-B-parsed_cache-FlatArrays-deleted.txt
echo ablate-done
