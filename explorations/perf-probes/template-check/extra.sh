#!/bin/bash
# MEASUREMENT ONLY, not part of the plan's four edits: the four-file shadow PLUS
# a fifth shadowed file, nodes_util/NodeReflection.java, so that a template gap's
# inherited _info (hence its parenthesized flag) survives the api cache.
# Run from $FORTRESS_HOME with explorations/experiment/env.sh sourced.
P=$FORTRESS_HOME/explorations/perf-probes/template-check
G=$FORTRESS_HOME/explorations/perf-probes/grammar-compile/shim
CP=$($FORTRESS_HOME/bin/fortress_classpath | tail -1)
CACHES=$FORTRESS_HOME/default_repository/caches
PREFIX="$P/extra-classes:$P/shadow-classes:"
fc () { java $JAVA_FLAGS -Dfile.encoding=UTF-8 -cp "$PREFIX$CP" com.sun.fortress.Shell compile "$@"; }
fr () { $FORTRESS_HOME/bin/fortress run "$@"; }
wipe () {
  rm -rf $CACHES/analyzed_cache $CACHES/*parsed_cache $CACHES/syntax_cache $CACHES/presyntax_cache
  (cd $CACHES/bytecode_cache && ls | grep -v '^fortress\.' | grep -v '^Compiler' | xargs -r rm -f)
  rm -rf /tmp/fortress*rats
}
wipe
(cd $G
 for r in dblp lamp app; do
   echo "############ rule $r, api compiled first (so it is read back from analyzed_cache) ############"
   grep '|:=' G_$r.fsi
   echo "$ fortress compile G_$r.fss"; fc G_$r.fss; echo "### rc=$?"
   echo "$ fortress compile u_$r.fss"; fc u_$r.fss; echo "### rc=$?"
   echo "$ fortress run u_$r";         fr u_$r;     echo "### rc=$?"
   echo
 done
 echo "############ the m-matrix under the same fifth file ############"
 for n in 01 02 03 04 05 06 07; do
   echo "$ fortress compile m$n.fss"; fc m$n.fss; echo "### rc=$?"
   echo "$ fortress run m$n";         fr m$n;     echo "### rc=$?"
 done) > $P/25-extra-nodereflection.out 2>&1
