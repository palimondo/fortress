#!/bin/bash
# Every command probe 1 ran, in order.  Run from $FORTRESS_HOME.
# PROBE is a private scratch directory outside the repository; nothing tracked is touched.
# Captures in this directory rewrite $PROBE as <probe>.
set -x
source experiment/env.sh
PROBE=/tmp/<session scratchpad>/tower
FH=/home/user/fortress
P=explorations/perf-probes/prelude          # WorldFlip.java + the instrumented StaticChecker copy

# --- the three library variants, as copies -------------------------------------------
for v in a b c; do mkdir -p $PROBE/$v; cp Library/FortressLibrary.fss Library/FortressLibrary.fsi $PROBE/$v/; done
# (b) the tree before 02d09a39f: drop the comprises clause from AnyIntegral
sed -i 's|^trait AnyIntegral extends { QQ } comprises { ZZ } end$|trait AnyIntegral extends { QQ } end|' \
    $PROBE/b/FortressLibrary.fss $PROBE/b/FortressLibrary.fsi
# (c) as committed + the team's repair on the generic trait beside it
sed -i 's|\(^trait Integral\[.I extends Integral\[.I.\].\] extends { StandardTotalOrder\[.I.\], AnyIntegral }$\)|\1 comprises { ZZ }|' \
    $PROBE/c/FortressLibrary.fss $PROBE/c/FortressLibrary.fsi

# --- probe 1a: the compile path's checker over each variant ---------------------------
# The variant's own directory is prepended to the source path by Shell.sourcePath(file,name)
# (Shell.java:1175-1188), so the copy shadows Library/FortressLibrary.{fss,fsi}; every other
# api (RangeInternals, List, FortressBuiltin, ...) still comes from the tree.
for v in a b c; do
  export FORTRESS_CACHES=$PROBE/caches-$v ; mkdir -p $FORTRESS_CACHES
  CP=$(./bin/fortress_classpath | tail -1)
  timeout 900 java $JAVA_FLAGS -Dfortress.caches=$FORTRESS_CACHES \
       -cp "$P/shadow-classes:$CP:$P" WorldFlip $PROBE/$v/FortressLibrary.fss \
       > $PROBE/wf-$v.out 2>&1
done

# --- probe 1b: the interpreter, variants (a) and (c), each from an empty cache ---------
for v in a c; do
  export FORTRESS_SOURCE_PATH=";$PROBE/$v;.;$FH/ProjectFortress/LibraryBuiltin;$FH/Library;$FH/ProjectFortress/test_library"
  export FORTRESS_CACHES=$PROBE/icache-$v ; rm -rf $FORTRESS_CACHES ; mkdir -p $FORTRESS_CACHES
  export JAVA_FLAGS="-Xmx4g -Xss64m -Dfortress.caches=$FORTRESS_CACHES"
  ./bin/fortress ProjectFortress/tests/ArrayScalarExtension.fss
  ./bin/fortress ProjectFortress/tests/ArrayOperatorsBesideLibrary.fss
  export FORTRESS_CACHES=$PROBE/c4cache-$v ; rm -rf $FORTRESS_CACHES ; mkdir -p $FORTRESS_CACHES
  export JAVA_FLAGS="-Xmx4g -Xss64m -Dfortress.caches=$FORTRESS_CACHES"
  ( cd explorations/run-c4/src && timeout -s KILL 60 ../../../bin/fortress MicroGptFlatCheck.fss )
done
