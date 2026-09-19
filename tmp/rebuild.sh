set -u
cd /home/user/fortress-rr64
echo "=== ant compileAll $(date -Is)"
ant compileAll > tmp/compileAll-after.log 2>&1
grep -c 'BUILD SUCCESSFUL' tmp/compileAll-after.log || { echo "ANT FAILED"; tail -30 tmp/compileAll-after.log; exit 1; }
echo "=== wipe the stale native wrapper $(date -Is)"
rm -rf default_repository/caches/nativewrapper_cache
cd ProjectFortress
for f in LibraryBuiltin/AnyType.fss LibraryBuiltin/CompilerBuiltin.fss ../Library/CompilerLibrary.fss ../Library/CompilerAlgebra.fss ../Library/CompilerSystem.fss; do
  echo "=== $f $(date -Is)"
  ../bin/fortress compile "$f" || { echo "LIBRARY FAILED on $f"; exit 1; }
done
echo "=== LIBRARY DONE $(date -Is)"
