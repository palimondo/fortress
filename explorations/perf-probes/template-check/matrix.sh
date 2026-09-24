#!/bin/bash
# The grammar-compile matrix, run once per classpath.  $1 is the output label
# ("base" or "shadow"), $2 the classpath prefix ("" or "<shadow-classes>:").
# Run from $FORTRESS_HOME with explorations/experiment/env.sh sourced.
LABEL=$1
PREFIX=$2
P=$FORTRESS_HOME/explorations/perf-probes/template-check
G=$FORTRESS_HOME/explorations/perf-probes/grammar-compile/shim
CP=$($FORTRESS_HOME/bin/fortress_classpath | tail -1)
CACHES=$FORTRESS_HOME/default_repository/caches

if [ "$LABEL" = base ]; then N0=10; else N0=20; fi

# `fortress compile` with the chosen classpath; `fortress run` needs no shadow.
fc () { java $JAVA_FLAGS -Dfile.encoding=UTF-8 -cp "$PREFIX$CP" com.sun.fortress.Shell compile "$@"; }
fr () { $FORTRESS_HOME/bin/fortress run "$@"; }
say () { echo "$ fortress $*"; }

# analysis caches wiped, and the probe's own jars dropped, before each leg:
# the compiler library chain (AnyType, CompilerBuiltin, CompilerLibrary,
# CompilerAlgebra, CompilerSystem) is kept, everything this probe compiles is not.
wipe () {
  rm -rf $CACHES/analyzed_cache $CACHES/*parsed_cache $CACHES/syntax_cache $CACHES/presyntax_cache
  (cd $CACHES/bytecode_cache && ls | grep -v '^fortress\.' | grep -v '^Compiler' | xargs -r rm -f)
  rm -rf /tmp/fortress*rats
}

run () { echo "### rc=$?"; }

# --- the parenthesization matrix: m01-m07 -----------------------------------
wipe
(cd $G
 say compile MatrixC.fss; fc MatrixC.fss; echo "### rc=$?"
 for n in 01 02 03 04 05 06 07; do
   echo
   say compile m$n.fss; fc m$n.fss; echo "### rc=$?"
   say run m$n;         fr m$n;     echo "### rc=$?"
 done) > $P/$N0-$LABEL-matrix.out 2>&1

# --- the one that already compiled, and the two mechanisms together ---------
wipe
(cd $G
 say compile TwiceP.fss;     fc TwiceP.fss;     echo "### rc=$?"
 say compile a02p_twice.fss; fc a02p_twice.fss; echo "### rc=$?"
 say run a02p_twice;         fr a02p_twice;     echo "### rc=$?"
 echo
 say compile UseFnP.fss;     fc UseFnP.fss;     echo "### rc=$?"
 say compile a03p_usefn.fss; fc a03p_usefn.fss; echo "### rc=$?"
 say run a03p_usefn;         fr a03p_usefn;     echo "### rc=$?"
) > $P/$((N0+1))-$LABEL-step4.out 2>&1

# --- rows 270 and 285, one rule per grammar ---------------------------------
wipe
(cd $G
 for r in dblp lamp app; do
   echo "############ rule $r ############"
   grep '|:=' G_$r.fsi
   say compile G_$r.fss; fc G_$r.fss; echo "### rc=$?"
   say compile u_$r.fss; fc u_$r.fss; echo "### rc=$?"
   say run u_$r;         fr u_$r;     echo "### rc=$?"
   echo
 done) > $P/$((N0+2))-$LABEL-rules-split.out 2>&1

# --- the same with the vocabulary in an api the grammar api imports ---------
wipe
(cd $G
 say compile VocabC.fss; fc VocabC.fss; echo "### rc=$?"
 for r in dblq lamq appq; do
   echo
   echo "############ rule $r (grammar api imports VocabC) ############"
   grep '|:=' G_$r.fsi
   say compile G_$r.fss; fc G_$r.fss; echo "### rc=$?"
   say compile u_$r.fss; fc u_$r.fss; echo "### rc=$?"
   say run u_$r;         fr u_$r;     echo "### rc=$?"
 done) > $P/$((N0+3))-$LABEL-vocab.out 2>&1
