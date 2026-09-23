#!/bin/bash
# usage: libbuild.sh ; honours FORTRESS_CACHES and FORTRESS_ANALYZER_CLAUSES_CACHE from the environment
cd /home/user/fortress-memo/ProjectFortress
for f in LibraryBuiltin/AnyType.fss LibraryBuiltin/CompilerBuiltin.fss ../Library/CompilerLibrary.fss ../Library/CompilerAlgebra.fss ../Library/CompilerSystem.fss ; do
  s=$(date +%s.%N)
  ../bin/fortress compile $f ; rc=$?
  e=$(date +%s.%N)
  printf '@@TIME %s rc=%s %.1f s\n' "$f" "$rc" "$(echo "$e - $s" | bc)"
done
