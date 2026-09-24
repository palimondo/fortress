#!/bin/bash
# Rung 7 mechanism probe, every command in order.  Run from $FORTRESS_HOME.
# Question: can a native helper deal in Fortress IntLiteral values, so that the
# stubbed arithmetic bodies of trait IntLiteral can be written at all?
# Answer: yes, over the interface type fortress.CompilerBuiltin.IntLiteral, with
# one else-if in NamingCzar.  No tracked file is touched; the shadow classes go
# first on the classpath, the recipe of perf-probes/template-check/run-all.sh.
set -x
source explorations/experiment/env.sh
P=explorations/compile-ladder/rung7/probes
CP=$($FORTRESS_HOME/bin/fortress_classpath | tail -1)
SHADOW=$FORTRESS_HOME/$P/shadow-classes

javac -nowarn -cp "$CP" -d $P/shadow-classes \
      $P/shadow-src/com/sun/fortress/compiler/NamingCzar.java \
      $P/shadow-src/com/sun/fortress/nativeHelpers/simpleIntLiteralArith.java
diff -u ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java \
        $P/shadow-src/com/sun/fortress/compiler/NamingCzar.java > $P/NamingCzar.java.diff

# a signature change in the helper leaves a stale generated wrapper behind
rm -f default_repository/caches/nativewrapper_cache/native/com/sun/fortress/nativeHelpers/simpleIntLiteralArith.class \
      default_repository/caches/bytecode_cache/p38.jar

# a compile whose source has not changed writes nothing and exits 0
touch $P/p38.fss
(cd $P && java $JAVA_FLAGS -cp "$SHADOW:$CP" com.sun.fortress.Shell compile p38.fss) > $P/01-compile.out 2>&1
(cd $P && MORE_PATH=$SHADOW $FORTRESS_HOME/bin/run p38)                             > $P/02-run.out 2>&1

# the test of the rung, on the tree as it stands: links, then dies in the stub
(cd ProjectFortress && ../bin/fortress junit library_tests/IntLiteralArithRung7.test) > $P/junit-before.out 2>&1
