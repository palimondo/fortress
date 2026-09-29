#!/bin/bash
# Step 2: the control, both programs through the compiled path, after the
# compiler prelude is compiled into the same fresh private cache (the recipe
# of import-java-interpreter/run-all.sh, step 2).
set -u
cd "$(dirname "$0")/../../../.."
source explorations/experiment/env.sh
D=explorations/perf-probes/prelude/natives-shape
export FORTRESS_CACHES=$FORTRESS_HOME/tmp/caches-compiled
rm -rf "$FORTRESS_CACHES"; mkdir -p "$FORTRESS_CACHES"
{ echo "load at start: $(cut -d' ' -f1-3 /proc/loadavg)"
  for f in LibraryBuiltin/AnyType.fss LibraryBuiltin/CompilerBuiltin.fss \
           ../Library/CompilerLibrary.fss ../Library/CompilerAlgebra.fss \
           ../Library/CompilerSystem.fss; do
    echo "\$ (cd ProjectFortress && fortress compile $f)"
    ( cd ProjectFortress && "$FORTRESS_HOME"/bin/fortress compile "$f" ); echo "### rc=$?"
  done
} > $D/02-library-chain.out 2>&1
{ for p in NativesShape NativesShapeOne; do
    echo "\$ ./bin/fortress compile $D/$p.fss"; ./bin/fortress compile $D/$p.fss; echo "### compile rc=$?"
    echo "\$ ./bin/fortress run $p";            ./bin/fortress run $p;            echo "### run rc=$?"
    echo
  done
} > $D/03-compile-control.out 2>&1
