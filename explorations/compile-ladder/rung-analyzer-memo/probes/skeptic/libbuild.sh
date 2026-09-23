#!/bin/bash
# usage: libbuild.sh ; honours FORTRESS_CACHES and FORTRESS_ANALYZER_CLAUSES_CACHE
cd /home/user/fortress-memo/ProjectFortress
for f in LibraryBuiltin/AnyType.fss LibraryBuiltin/CompilerBuiltin.fss ../Library/CompilerLibrary.fss ../Library/CompilerAlgebra.fss ../Library/CompilerSystem.fss ; do
  s=$(date +%s)
  ../bin/fortress compile $f ; rc=$?
  echo "@@LIB $f rc=$rc $(( $(date +%s) - s )) s"
done
