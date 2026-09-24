#!/bin/bash
# Every command this probe ran, in order.  Run from $FORTRESS_HOME.
# Outputs land next to this script as NN-*.out.  Failures are kept.
set -x
source explorations/experiment/env.sh
P=explorations/perf-probes/template-check
G=explorations/perf-probes/grammar-compile/shim
CP=$($FORTRESS_HOME/bin/fortress_classpath | tail -1)
SHADOW=$FORTRESS_HOME/$P/shadow-classes
SP=/tmp/template-check-scratch; mkdir -p $SP

# 0. build the shadow: copies of the four files of the plan's section (c),
#    edited, compiled against the built tree; no tracked file is touched
javac -nowarn -cp "$CP" -d $P/shadow-classes \
      $P/shadow-src/com/sun/fortress/nodes_util/ExprFactory.java \
      $P/shadow-src/com/sun/fortress/syntax_abstractions/phases/Transform.java
java $JAVA_FLAGS -cp "$CP" scala.tools.nsc.Main -classpath "$CP" -d $P/shadow-classes \
      $P/shadow-src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala \
      $P/shadow-src/com/sun/fortress/scala_src/useful/STypesUtil.scala
for f in TypeWellFormedChecker.scala STypesUtil.scala ExprFactory.java Transform.java; do
  diff -u $(find ProjectFortress/src/com/sun/fortress -name $f) $(find $P/shadow-src -name $f) > $P/diffs/$f.diff
done

# 1. the interpreter reference for the u_* and m* programs.  The compile-path
#    matrix runs from grammar-compile/shim, whose probe-only FortressLibrary/List
#    shims the interpreter cannot use, so the same sources are copied into
#    $P/interp, where the real Library/ applies.
rm -rf default_repository/caches/analyzed_cache default_repository/caches/*parsed_cache \
       default_repository/caches/syntax_cache default_repository/caches/presyntax_cache
(cd $P/interp && for r in dblp lamp app; do $FORTRESS_HOME/bin/fortress u_$r.fss; done
                 for n in 01 02 03 04 05 06 07; do $FORTRESS_HOME/bin/fortress m$n.fss; done) \
  > $P/02-interpreter-reference.out 2>&1

# 2/3. the grammar-compile matrix, twice: the stock build, then the shadow first
#      on the classpath.  $P/matrix.sh is the body; $1 is the output label, $2
#      the classpath prefix.  It wipes the analysis caches and this probe's own
#      jars before each of its four legs, keeping the compiler library chain.
bash $P/matrix.sh base   ""          # -> 10-base-matrix.out   11-base-step4.out
                                     #    12-base-rules-split.out 13-base-vocab.out
bash $P/matrix.sh shadow "$SHADOW:"  # -> 20-shadow-matrix.out 21-shadow-step4.out
                                     #    22-shadow-rules-split.out 23-shadow-vocab.out

# 3b. the two row-270 rules again, with the grammar api analysed in the SAME
#     process as the using program, i.e. never read back from analyzed_cache
bash $P/nocache.sh "$SHADOW:"        # -> 24-shadow-dblp-uncached.out

# 3c. MEASUREMENT ONLY, not part of the plan's four edits: the same matrix with a
#     fifth shadowed file, nodes_util/NodeReflection.java, so that a template
#     gap's inherited _info survives the api cache
javac -nowarn -cp "$CP" -d $P/extra-classes $P/extra-src/com/sun/fortress/nodes_util/NodeReflection.java
diff -u ProjectFortress/src/com/sun/fortress/nodes_util/NodeReflection.java \
        $P/extra-src/com/sun/fortress/nodes_util/NodeReflection.java > $P/diffs/NodeReflection.java.diff
bash $P/extra.sh                     # -> 25-extra-nodereflection.out

# 4. the gate.  SyntaxAbstractionJUTestAll on the interpreter path before the
#    overlay; then the four shadow class files overlaid into ProjectFortress/build
#    (which is gitignored, so no tracked file changes), the same suite again, then
#    ant testFast and ant testSystem; then the originals restored byte for byte.
mkdir -p ProjectFortress/test-tmp ProjectFortress/test-caches/syntaxall
syntaxall () {   # $1 = output file
  rm -rf ProjectFortress/test-caches/syntaxall/* /tmp/fortress*rats
  FORTRESS_CACHES=$FORTRESS_HOME/ProjectFortress/test-caches/syntaxall \
  java -Xmx2g -Xss64m -Dfile.encoding=UTF-8 -Dfortress.junit.reset=false \
       -Dfortress.caches=$FORTRESS_HOME/ProjectFortress/test-caches/syntaxall \
       -Djava.io.tmpdir=$FORTRESS_HOME/ProjectFortress/test-tmp \
       -cp "$CP" junit.textui.TestRunner \
       com.sun.fortress.syntax_abstractions.SyntaxAbstractionJUTestAll > $1 2>&1
}
syntaxall $P/30-syntaxabstraction-before.out

(cd ProjectFortress/build && find . \( -path './com/sun/fortress/nodes_util/ExprFactory*' \
   -o -path './com/sun/fortress/syntax_abstractions/phases/Transform*' \
   -o -path './com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker*' \
   -o -path './com/sun/fortress/scala_src/useful/STypesUtil*' \) -name '*.class' | sort > $SP/overlay-files.txt
 tar cf $SP/build-backup.tar -T $SP/overlay-files.txt
 md5sum $(cat $SP/overlay-files.txt) | sort > $SP/before-md5.txt)
cp -r $P/shadow-classes/* ProjectFortress/build/
git status --porcelain > $P/31-git-status-overlaid.out

syntaxall $P/32-syntaxabstraction-after.out
ant testFast   > $P/33-testfast.out   2>&1
ant testSystem > $P/34-testsystem.out 2>&1

(cd ProjectFortress/build && tar xf $SP/build-backup.tar
 md5sum $(cat $SP/overlay-files.txt) | sort > $SP/after-restore-md5.txt
 diff $SP/before-md5.txt $SP/after-restore-md5.txt)   # -> 35-restore-check.out
git status --porcelain >> $P/35-restore-check.out
