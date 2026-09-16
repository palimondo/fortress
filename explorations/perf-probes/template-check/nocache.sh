#!/bin/bash
# The two row-270 rules with the grammar api analysed IN THE SAME PROCESS as the
# using program, i.e. never read back from analyzed_cache.  Run from $FORTRESS_HOME
# with experiment/env.sh sourced.  $1 is the classpath prefix.
PREFIX=$1
P=$FORTRESS_HOME/explorations/perf-probes/template-check
G=$FORTRESS_HOME/explorations/perf-probes/grammar-compile/shim
CP=$($FORTRESS_HOME/bin/fortress_classpath | tail -1)
CACHES=$FORTRESS_HOME/default_repository/caches
fc () { java $JAVA_FLAGS -Dfile.encoding=UTF-8 -cp "$PREFIX$CP" com.sun.fortress.Shell compile "$@"; }
fr () { $FORTRESS_HOME/bin/fortress run "$@"; }
wipe () {
  rm -rf $CACHES/analyzed_cache $CACHES/*parsed_cache $CACHES/syntax_cache $CACHES/presyntax_cache
  (cd $CACHES/bytecode_cache && ls | grep -v '^fortress\.' | grep -v '^Compiler' | xargs -r rm -f)
  rm -rf /tmp/fortress*rats
}
(cd $G
 for r in dblp dblq; do
   echo "############ rule $r, api analysed in-process ############"
   grep '|:=' G_$r.fsi
   wipe
   if [ $r = dblq ]; then echo "$ fortress compile VocabC.fss"; fc VocabC.fss; echo "### rc=$?"; fi
   echo "$ fortress compile u_$r.fss   # the api is analysed in this same process"
   fc u_$r.fss; echo "### rc=$?"
   echo "$ fortress compile G_$r.fss   # the stub, for the runtime"
   fc G_$r.fss; echo "### rc=$?"
   echo "$ fortress run u_$r"; fr u_$r; echo "### rc=$?"
   echo
 done) > $P/24-shadow-dblp-uncached.out 2>&1
